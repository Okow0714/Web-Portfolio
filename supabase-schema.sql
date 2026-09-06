-- Run this once in your Supabase project's SQL Editor (Project > SQL Editor > New query).
-- Creates the tables and Row Level Security policies used by supabase-app.js.

-- ---------------------------------------------------------------------------
-- profiles: public-safe display info for each signed-up user
-- ---------------------------------------------------------------------------
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    display_name text not null check (char_length(display_name) between 1 and 40),
    created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Own-row only. This was once "viewable by everyone" because the comment list embedded each
-- author's display name, which meant anonymous callers had to be able to read the table. The
-- comments feature is gone, and nothing else reads another user's profile, so the read closes.
create policy "Users can view their own profile"
    on public.profiles for select
    using (auth.uid() = id);

-- WITH CHECK as well as USING: USING decides which rows may be updated, WITH CHECK
-- validates the row that gets written. Without it nothing re-examines the new row,
-- which is a hole waiting for the next column added to this table.
create policy "Users can update their own profile"
    on public.profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- created_at is nobody else's business; the comment author embed only needs the name.
revoke select on public.profiles from anon, authenticated;
grant select (id, display_name) on public.profiles to anon, authenticated;
grant update (display_name) on public.profiles to authenticated;

-- Auto-create a profile row whenever someone signs up.
--
-- The display name is deliberately NOT derived from the email. It used to be
-- split_part(new.email, '@', 1), and since profiles are world-readable (the comment
-- list needs author names), that published every user's email local-part to anyone
-- holding the anon key -- which is public by design. For the common providers that
-- makes the full address a trivial guess. A neutral default costs nothing; people who
-- want to be recognisable can set a real name from the dashboard.
create function public.handle_new_user()
returns trigger as $
begin
    insert into public.profiles (id, display_name)
    values (new.id, 'Reader ' || lpad((abs(hashtext(new.id::text)) % 10000)::text, 4, '0'));
    return new;
end;
$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

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
    message text not null check (char_length(message) between 1 and 5000),
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
-- game_progress: per-user best result for each Word Match level. 60 discrete levels,
-- 12 per JLPT tier (N5 1-12, N4 13-24, N3 25-36, N2 37-48, N1 49-60). Was 50 levels of 10
-- per tier until the September 2026 expansion, and 1-5 (one per tier) before the overhaul
-- that split each tier into sub-levels. Renumbering a tier means migrating this column --
-- see supabase-migration-003.
-- ---------------------------------------------------------------------------
create table public.game_progress (
    user_id uuid not null references auth.users on delete cascade,
    level smallint not null check (level between 1 and 60),
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
-- grammar_progress: per-user best result for each Grammar Connect level. Two tracks
-- (foundation = N5-N3, advanced = N2-N1), 20 levels each, same track vocabulary as
-- reading_progress above but its own table since level numbering restarts per track
-- (1-20 on each) rather than sharing one global range like game_progress's 1-50.
-- ---------------------------------------------------------------------------
create table public.grammar_progress (
    user_id uuid not null references auth.users on delete cascade,
    track text not null check (track in ('foundation', 'advanced')),
    level smallint not null check (level between 1 and 20),
    completed boolean not null default false,
    best_time_seconds integer,
    best_mistakes integer,
    updated_at timestamptz not null default now(),
    primary key (user_id, track, level)
);

alter table public.grammar_progress enable row level security;

create policy "Users manage their own grammar progress"
    on public.grammar_progress for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
create table if not exists public.word_stats (
    user_id uuid not null references auth.users on delete cascade,
    -- which tool the word was met in; a word can legitimately exist in several
    source text not null check (source in ('game', 'grammar', 'reading')),
    -- the word itself. Bounded like every other free-text column here: an insert
    -- policy proves who you are, not how much you may write.
    word text not null check (char_length(word) between 1 and 120),
    attempts integer not null default 0 check (attempts >= 0),
    misses integer not null default 0 check (misses >= 0),
    -- what was picked instead, last time it was missed
    confused_with text check (char_length(confused_with) <= 120),
    last_miss_at timestamptz,
    -- Leitner box: 0 = newly missed, climbing on each correct answer. Capped at
    -- 6, which is already a months-long interval.
    box smallint not null default 0 check (box between 0 and 6),
    due_at timestamptz,
    updated_at timestamptz not null default now(),
    primary key (user_id, source, word)
);

alter table public.word_stats enable row level security;

create policy "Users manage their own word stats"
    on public.word_stats for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- The review queue's only query: my rows, due before now, soonest first.
create index if not exists word_stats_due_idx
    on public.word_stats (user_id, due_at)
    where due_at is not null;

-- ---------------------------------------------------------------------------
-- record_word_attempt: increment-in-place, because the client cannot express
-- `attempts = attempts + 1` through a plain upsert without first reading the
-- row (a round trip, and a race between two tabs).
--
-- Not SECURITY DEFINER: this runs as the caller, so RLS applies and the
-- auth.uid() default means a caller can only ever write their own row.
-- ---------------------------------------------------------------------------
create or replace function public.record_word_attempt(
    p_source text,
    p_word text,
    p_correct boolean,
    p_confused_with text default null
)
returns void
language plpgsql
as $$
declare
    -- Leitner intervals in days, indexed by the new box. Box 0 comes back in the
    -- same session; the rest space out.
    intervals constant integer[] := array[0, 1, 3, 7, 16, 35, 90];
    new_box smallint;
begin
    insert into public.word_stats as w (user_id, source, word, attempts, misses,
                                        confused_with, last_miss_at, box, due_at)
    values (
        auth.uid(), p_source, p_word, 1,
        case when p_correct then 0 else 1 end,
        case when p_correct then null else p_confused_with end,
        case when p_correct then null else now() end,
        case when p_correct then 1 else 0 end,
        now() + (intervals[case when p_correct then 2 else 1 end] || ' days')::interval
    )
    on conflict (user_id, source, word) do update set
        attempts = w.attempts + 1,
        misses = w.misses + case when p_correct then 0 else 1 end,
        -- a correct answer does not erase what you last confused it with; being
        -- right once does not mean the confusion is gone
        confused_with = case when p_correct then w.confused_with
                             else coalesce(p_confused_with, w.confused_with) end,
        last_miss_at = case when p_correct then w.last_miss_at else now() end,
        box = case when p_correct then least(w.box + 1, 6) else 0 end,
        due_at = now() + (intervals[
            case when p_correct then least(w.box + 1, 6) + 1 else 1 end
        ] || ' days')::interval,
        updated_at = now();
end;
$$;

grant execute on function public.record_word_attempt(text, text, boolean, text) to authenticated;

-- delete_own_account: lets a logged-in user permanently delete their own
-- account. Runs as SECURITY DEFINER (elevated privileges) because the
-- anon/authenticated roles can't delete from auth.users directly — but the
-- auth.uid() check means it only ever touches the caller's own row. Deleting
-- from auth.users cascades to profiles/comments/bookmarks/contact_messages/
-- game_progress/reading_progress/grammar_progress/word_stats via the "on delete cascade" foreign
-- keys already on those tables, so this one call removes everything.
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
