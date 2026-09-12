-- Run once in the Supabase SQL Editor.
--
-- Language, the darker-theme toggle, the reading-style choice and which page tours you have seen
-- all live in localStorage, so signing in on a phone after setting everything up on a laptop gives
-- you an English site, kana readings and every coach mark again. This stores them on the account.
--
-- One jsonb column rather than a column per setting: these are display preferences that come and go
-- with the UI, and adding a migration every time a toggle appears is not worth it. They are also
-- deliberately NOT on `profiles` -- that table is readable by other people in places (see
-- CLAUDE.md), and a settings blob has no business being reachable from there.

create table if not exists public.user_settings (
    user_id uuid primary key references auth.users on delete cascade,
    settings jsonb not null default '{}'::jsonb,
    updated_at timestamptz not null default now(),
    -- a preferences blob should stay small; this is a guard against a client looping and growing it
    constraint user_settings_size check (pg_column_size(settings) < 8192)
);

alter table public.user_settings enable row level security;

drop policy if exists "own settings readable" on public.user_settings;
create policy "own settings readable" on public.user_settings
    for select using (auth.uid() = user_id);

drop policy if exists "own settings writable" on public.user_settings;
create policy "own settings writable" on public.user_settings
    for insert with check (auth.uid() = user_id);

drop policy if exists "own settings updatable" on public.user_settings;
create policy "own settings updatable" on public.user_settings
    for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Settings are not study progress: "reset my progress" should not also reset your language, so
-- reset_own_progress (migrations 005/008) is deliberately left alone. Deleting the account still
-- takes them, through the cascade on user_id.
