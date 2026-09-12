-- ---------------------------------------------------------------------------
-- Migration 005 — let a learner clear their study progress without deleting
-- their account.
--
-- Run this once in the Supabase SQL editor. Until it is run, the "Reset study
-- progress" button in Settings will report an error and change nothing —
-- there is no client-side fallback, and that is deliberate: a reset that
-- half-works is worse than one that plainly says it could not run.
--
-- Why a function rather than delete policies on the four tables: this is one
-- transaction, so it cannot leave someone with their Word Match times cleared
-- and their word_stats intact. It is also single-purpose — adding "for delete"
-- policies would let any client delete individual progress rows at will, which
-- is a bigger permission than the feature needs.
--
-- SECURITY DEFINER with an auth.uid() filter on every statement, the same
-- shape as delete_own_account() above it in supabase-schema.sql: elevated
-- privileges, but it can only ever touch the caller's own rows. The
-- `where user_id = auth.uid()` clauses are what make that true, so do not
-- remove them.
--
-- What this does NOT touch: profiles (display name), bookmarks, and
-- contact_messages. Clearing progress is not the same as erasing the account,
-- and someone resetting their study history has not asked to be forgotten —
-- delete_own_account() is the call for that.
--
-- Note that clearing word_stats also resets Phonetics Family's "kanji you have
-- already met" map, which is derived from it rather than stored separately.
-- That is correct: the map is a view of those attempts, and leaving it lit
-- after a reset would be claiming knowledge the learner just asked us to
-- forget.
-- ---------------------------------------------------------------------------

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
end;
$$;

-- Postgres grants EXECUTE to PUBLIC on a new function, so the grant below is not the whole
-- picture without this revoke (see supabase-migration-007-lock-function-grants.sql).
revoke execute on function public.reset_own_progress() from public, anon;
grant execute on function public.reset_own_progress() to authenticated;
