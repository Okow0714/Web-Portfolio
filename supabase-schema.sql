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

-- ---------------------------------------------------------------------------
-- game_progress: per-user best result for each Word Match level (1-5, N5-N1)
-- ---------------------------------------------------------------------------
create table public.game_progress (
    user_id uuid not null references auth.users on delete cascade,
    level smallint not null check (level between 1 and 5),
    completed boolean not null default false,
    best_time_seconds integer,
    best_moves integer,
    updated_at timestamptz not null default now(),
    primary key (user_id, level)
);

alter table public.game_progress enable row level security;

create policy "Users manage their own game progress"
    on public.game_progress for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- reading_progress: per-user completed texts in the Dokkai Reader.
--
-- Keyed by (track, text_id) rather than just text_id: N3 content is shared between
-- the two tracks (Foundation N5->N3 and Advanced N3->N1), but each track unlocks
-- independently, so completing N3 while going up the Foundation track shouldn't
-- retroactively unlock N2 on the Advanced track (which starts at N3 anyway) or vice
-- versa. text_id matches the ids in reading-texts.js (e.g. 'n3-1').
-- ---------------------------------------------------------------------------
create table public.reading_progress (
    user_id uuid not null references auth.users on delete cascade,
    track text not null check (track in ('foundation', 'advanced')),
    text_id text not null,
    completed_at timestamptz not null default now(),
    primary key (user_id, track, text_id)
);

alter table public.reading_progress enable row level security;

create policy "Users manage their own reading progress"
    on public.reading_progress for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- delete_own_account: lets a logged-in user permanently delete their own
-- account. Runs as SECURITY DEFINER (elevated privileges) because the
-- anon/authenticated roles can't delete from auth.users directly — but the
-- auth.uid() check means it only ever touches the caller's own row. Deleting
-- from auth.users cascades to profiles/comments/bookmarks/contact_messages/
-- game_progress/reading_progress via the "on delete cascade" foreign keys
-- already on those tables, so this one call removes everything.
-- ---------------------------------------------------------------------------
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    delete from auth.users where id = auth.uid();
end;
$$;

grant execute on function public.delete_own_account() to authenticated;
