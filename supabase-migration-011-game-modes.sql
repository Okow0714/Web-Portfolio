-- Migration 011: remember which game modes a Word Match level was beaten under.
--
-- Word Match became a memory game on 2026-10-21 and gained two optional modes a level can be
-- played under: Time Attack (three minutes for the whole level, ten seconds back per pair) and
-- Perfectionist (three lives). Finishing a level under a mode earns a mark on the level select —
-- sparks inside the node for Time Attack, a gold face for Perfectionist — and these two columns
-- are where that is remembered so the marks follow the account rather than the device.
--
-- Until this is applied, game.js keeps the marks in localStorage only. That is deliberate and
-- the code handles both: an upsert naming a column PostgREST does not know about fails the WHOLE
-- row, so the first save tries the columns, and on a "column does not exist" error drops them,
-- retries, and stops trying for the rest of the session. Losing every player's progress to a
-- cosmetic badge would be a poor trade. Applying this migration simply makes the marks sync;
-- nothing breaks either way.
--
-- A mark is never taken away: once a level has been beaten under a mode, a later plain run
-- leaves the column alone (game.js only ever writes true). Both default false, so every existing
-- row is correct the moment this runs.

alter table public.game_progress
    add column if not exists time_attack   boolean not null default false,
    add column if not exists perfectionist boolean not null default false;

comment on column public.game_progress.time_attack is
    'Level has been completed at least once under Time Attack. Never reset to false.';
comment on column public.game_progress.perfectionist is
    'Level has been completed at least once under Perfectionist. Never reset to false.';

-- No policy changes: game_progress already restricts every row to its own user, and these two
-- columns are covered by the existing select/insert/update policies. No new grants either --
-- the table's column grants are not enumerated, so added columns inherit the table's.
