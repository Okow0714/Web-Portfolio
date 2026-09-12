-- ---------------------------------------------------------------------------
-- 004 — word_stats: one row per word a signed-in learner has actually met.
--
-- Feeds three things off a single table rather than three:
--   * the review queue          — `box` and `due_at` (Leitner)
--   * "your most-missed words"  — `misses`, `last_miss_at`
--   * what a mistake actually was — `confused_with`, the thing that makes the
--     other two worth reading. "You got 暑い wrong" is much less use than
--     "you picked 熱い for it".
--
-- Counters are upserted rather than appended. An attempt log would become by
-- far the largest table here — twenty pairs a level, every replay — for data
-- only ever read back as a sum.
--
-- Run this in the Supabase SQL editor. supabase-schema.sql carries the same
-- definitions for a project created fresh.
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

-- Postgres grants EXECUTE to PUBLIC on a new function, so the grant below is not the whole
-- picture without this revoke (see supabase-migration-007-lock-function-grants.sql).
revoke execute on function public.record_word_attempt(text, text, boolean, text) from public, anon;
grant execute on function public.record_word_attempt(text, text, boolean, text) to authenticated;
