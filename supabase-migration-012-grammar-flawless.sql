-- Migration 012 — a level cleared with no mistakes at all
--
-- Grammar Connect's level tiles grow a sprout when a level is cleared and a flowering branch
-- when it is cleared without a single mistake. `best_mistakes` already exists and cannot carry
-- that: saveProgress() keeps whichever run was FASTER, so a flawless slow clear is overwritten
-- the moment someone replays quicker and sloppier, and the flower would un-bloom. Taking back a
-- mark somebody earned is worse than never giving it.
--
-- So this is a separate flag with one rule: it is only ever written true. The same rule
-- migration 011 gives Word Match's time_attack / perfectionist marks, for the same reason.
--
-- Safe to run twice. Existing rows default to false rather than guessing from best_mistakes:
-- a 0 there means "no mistakes on the fastest run so far", which is not the same claim.

alter table public.grammar_progress
    add column if not exists flawless boolean not null default false;

-- The client tolerates this migration NOT having been applied: the first upsert naming the
-- column fails, grammar.js drops it and retries, and stops naming it for the rest of the
-- session. An upsert naming a column PostgREST does not know fails the WHOLE row, so without
-- that retry a cosmetic flower would take a player's level progress down with it. The mark also
-- lives in localStorage, so a signed-out player still sees it.
