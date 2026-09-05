-- Migration 003 — Word Match grows from 50 levels to 60
--
-- Run once in the Supabase SQL Editor. supabase-schema.sql already matches, so a project
-- created fresh from that file does not need this.
--
-- Two levels were added to each JLPT tier, so the tiers are 12 long instead of 10 and the
-- level numbers renumber:
--
--     N5  1-10  ->   1-12
--     N4 11-20  ->  13-24
--     N3 21-30  ->  25-36
--     N2 31-40  ->  37-48
--     N1 41-50  ->  49-60
--
-- game_progress rows are keyed by that number, so existing rows have to move with it or a
-- player's N4 progress would reappear against N5 levels.

begin;

-- ---------------------------------------------------------------------------
-- 1. Let the new range through first, or the UPDATE below fails its own check
-- ---------------------------------------------------------------------------
alter table public.game_progress drop constraint if exists game_progress_level_check;
alter table public.game_progress add constraint game_progress_level_check
    check (level between 1 and 60);

-- ---------------------------------------------------------------------------
-- 2. Move existing progress to the new numbering
-- ---------------------------------------------------------------------------
-- Descending order matters: N1 has to move to 49-60 before N2 moves into 37-48, or the
-- primary key (user_id, level) would collide with rows that have not moved yet.
update public.game_progress set level = level + 8 where level between 41 and 50;  -- N1
update public.game_progress set level = level + 6 where level between 31 and 40;  -- N2
update public.game_progress set level = level + 4 where level between 21 and 30;  -- N3
update public.game_progress set level = level + 2 where level between 11 and 20;  -- N4
-- N5 (1-10) keeps its numbers.

commit;

-- Check afterwards. Every row should sit inside its tier's new range, and the two new levels
-- in each tier (11-12, 23-24, 35-36, 47-48, 59-60) should have no rows yet:
--
--   select level, count(*) from public.game_progress group by level order by level;
