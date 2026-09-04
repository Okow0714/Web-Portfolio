-- Migration 002 — remove comments, and close the profile read that existed for them
--
-- Run once in the Supabase SQL Editor, after migration 001. supabase-schema.sql has been
-- updated to match, so a project created fresh from that file does not need this.
--
-- Why: the comments feature was removed from the site. It was the only user-generated content
-- on it, and Google Play's UGC policy would have required reporting and moderation for a
-- feature nobody had used. Removing it is cheaper than moderating it.
--
-- The interesting consequence is the profiles table. It was world-readable -- `using (true)` --
-- for exactly one reason: the comment list embedded each author's display name, so anonymous
-- visitors had to be able to read profiles. Migration 001 made that safe by taking the email
-- address out of the default display name. With comments gone, the read itself is no longer
-- needed by anything: every remaining query on profiles is a user reading or writing their own
-- row. So the policy closes completely, and the table stops being enumerable at all.

begin;

-- ---------------------------------------------------------------------------
-- 1. profiles: readable only by their owner
-- ---------------------------------------------------------------------------
drop policy if exists "Profiles are viewable by everyone" on public.profiles;

create policy "Users can view their own profile"
    on public.profiles for select
    using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- 2. comments: gone from the site, so gone from the database
-- ---------------------------------------------------------------------------
-- Left as a separate, final statement on purpose: everything above is reversible, this is not.
-- Check it is empty first if you want to be certain --
--
--     select count(*) from public.comments;
--
-- and skip this statement if that returns anything you would rather keep. Leaving the table in
-- place is not harmless, though: its insert policy stays live, so the REST API would still
-- accept new comments that nothing on the site can display or moderate.
drop table if exists public.comments;

commit;

-- Afterwards, this should return 0 rows for a signed-out caller and exactly one (your own) for
-- a signed-in one:
--
--     select * from public.profiles;
