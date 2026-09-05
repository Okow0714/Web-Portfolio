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
--
-- The shift cannot be done in place. Every tier's new range overlaps its old one -- N1 moves
-- from 41-50 into 49-58, so the row moving 41 -> 49 lands on the row still sitting at 49 --
-- and the primary key (user_id, level) is checked per row as the update runs, not at the end
-- of the statement. Ordering the tiers does not help, because the overlap is *within* each
-- tier. So every row is parked at +1000 first, where nothing can collide, and brought back
-- into its new home from there.

begin;

-- The parking range is outside any sensible level number, so the check has to stand aside for
-- the duration. It is restored at the end with the new upper bound.
alter table public.game_progress drop constraint if exists game_progress_level_check;

-- 1. Park every row out of the way. A uniform shift, so it cannot collide with itself.
update public.game_progress set level = level + 1000;

-- 2. Bring each tier back to where it now belongs. The five target ranges are disjoint, and
--    each shift is uniform within its tier, so there is nothing left to collide with.
update public.game_progress set level = level - 1000 + 8 where level between 1041 and 1050;  -- N1 -> 49-58
update public.game_progress set level = level - 1000 + 6 where level between 1031 and 1040;  -- N2 -> 37-46
update public.game_progress set level = level - 1000 + 4 where level between 1021 and 1030;  -- N3 -> 25-34
update public.game_progress set level = level - 1000 + 2 where level between 1011 and 1020;  -- N4 -> 13-22
update public.game_progress set level = level - 1000     where level between 1001 and 1010;  -- N5 -> 1-10

-- 3. Anything still parked means a row existed outside the old 1-50 range, which should be
--    impossible under the old constraint. Fail loudly rather than leave it at 1000-odd.
do $$
declare stranded int;
begin
    select count(*) into stranded from public.game_progress where level > 60;
    if stranded > 0 then
        raise exception 'migration 003: % row(s) left outside 1-60; aborting', stranded;
    end if;
end $$;

alter table public.game_progress add constraint game_progress_level_check
    check (level between 1 and 60);

commit;

-- Check afterwards. Every row should sit inside its tier's new range, and the two new levels
-- in each tier (11-12, 23-24, 35-36, 47-48, 59-60) will have no rows until someone plays them:
--
--   select level, count(*) from public.game_progress group by level order by level;
