-- Run once in the Supabase SQL Editor.
--
-- Nothing in the database recorded WHEN a learner studied. Every table keeps only a best result or
-- a last-updated stamp (game_progress.updated_at is overwritten on each replay), so "you have
-- studied 5 days in a row" was not answerable from the data -- the one fact a daily-practice habit
-- is built on.
--
-- One row per learner per day. No tool breakdown and no timestamps: a streak needs "did you study
-- on this date", and the smaller the row the less there is to leak or to reason about later.

create table if not exists public.daily_activity (
    user_id uuid not null references auth.users on delete cascade,
    day date not null,
    attempts integer not null default 0 check (attempts >= 0),
    primary key (user_id, day)
);

alter table public.daily_activity enable row level security;

-- Same shape as every other progress table: a learner reads and writes only their own rows.
drop policy if exists "own activity readable" on public.daily_activity;
create policy "own activity readable" on public.daily_activity
    for select using (auth.uid() = user_id);

drop policy if exists "own activity writable" on public.daily_activity;
create policy "own activity writable" on public.daily_activity
    for insert with check (auth.uid() = user_id);

drop policy if exists "own activity updatable" on public.daily_activity;
create policy "own activity updatable" on public.daily_activity
    for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- The day comes from the caller, because a streak is about the learner's own midnight: computing it
-- from now() would break the streak of anyone far from UTC at the wrong hour. It is clamped to a
-- day either side of the server's date, so a client cannot backfill a month and invent a streak --
-- the range still covers every real timezone offset.
--
-- SECURITY INVOKER: RLS applies, and the auth.uid() default means a caller can only write their own
-- row, exactly like record_word_attempt.
create or replace function public.record_activity(p_day date)
returns void
language plpgsql
as $$
begin
    if auth.uid() is null then
        raise exception 'record_activity requires an authenticated caller';
    end if;
    if p_day < current_date - 1 or p_day > current_date + 1 then
        raise exception 'record_activity: day out of range';
    end if;

    insert into public.daily_activity as d (user_id, day, attempts)
    values (auth.uid(), p_day, 1)
    on conflict (user_id, day) do update set attempts = d.attempts + 1;
end;
$$;

-- Postgres grants EXECUTE to PUBLIC on a new function; see migration 007.
revoke execute on function public.record_activity(date) from public, anon;
grant execute on function public.record_activity(date) to authenticated;

-- reset_own_progress (migration 005) clears everything the dashboard shows. Activity is progress
-- too, so "reset my progress" has to take the streak with it, or the dashboard would keep claiming
-- a streak built on deleted work.
create or replace function public.reset_own_progress()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    if auth.uid() is null then
        raise exception 'reset_own_progress requires an authenticated caller';
    end if;

    delete from public.game_progress    where user_id = auth.uid();
    delete from public.grammar_progress where user_id = auth.uid();
    delete from public.reading_progress where user_id = auth.uid();
    delete from public.word_stats       where user_id = auth.uid();
    delete from public.daily_activity   where user_id = auth.uid();
end;
$$;

revoke execute on function public.reset_own_progress() from public, anon;
grant execute on function public.reset_own_progress() to authenticated;
