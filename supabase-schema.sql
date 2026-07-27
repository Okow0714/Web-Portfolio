-- Run this once in your Supabase project's SQL Editor (Project > SQL Editor > New query).
-- Creates the tables and Row Level Security policies used by supabase-app.js.

-- ---------------------------------------------------------------------------
-- profiles: public-safe display info for each signed-up user
-- ---------------------------------------------------------------------------
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    display_name text not null,
    created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
    on public.profiles for select
    using (true);

create policy "Users can update their own profile"
    on public.profiles for update
    using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up.
create function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, display_name)
    values (new.id, split_part(new.email, '@', 1));
    return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- comments: visitor comments on a project, identified by a text slug
-- ---------------------------------------------------------------------------
-- user_id references profiles (not auth.users directly) so PostgREST can resolve
-- the comments -> profiles embed used to show each comment's author display name.
create table public.comments (
    id uuid primary key default gen_random_uuid(),
    project_id text not null,
    user_id uuid not null references public.profiles(id) on delete cascade,
    content text not null,
    created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
    on public.comments for select
    using (true);

create policy "Authenticated users can add their own comments"
    on public.comments for insert
    with check (auth.uid() = user_id);

create policy "Users can delete their own comments"
    on public.comments for delete
    using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- bookmarks: a user's saved projects (private to that user)
-- ---------------------------------------------------------------------------
create table public.bookmarks (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users on delete cascade,
    project_id text not null,
    created_at timestamptz not null default now(),
    unique (user_id, project_id)
);

alter table public.bookmarks enable row level security;

create policy "Users manage their own bookmarks"
    on public.bookmarks for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- contact_messages: messages sent through the "Send a Message" form
-- ---------------------------------------------------------------------------
create table public.contact_messages (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users on delete cascade,
    message text not null,
    created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Authenticated users can send messages"
    on public.contact_messages for insert
    with check (auth.uid() = user_id);

create policy "Users can view their own sent messages"
    on public.contact_messages for select
    using (auth.uid() = user_id);

-- Note: as the project owner you can read every row in the Supabase dashboard's
-- Table Editor regardless of these policies (RLS only restricts the anon/client API).
