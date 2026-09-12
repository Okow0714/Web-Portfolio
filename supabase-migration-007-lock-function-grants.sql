-- Run once in the Supabase SQL Editor. SQL only -- no site change goes with it.
--
-- Every function here was created with `grant execute ... to authenticated`, which reads like the
-- grant list, but Postgres ALSO grants EXECUTE to PUBLIC on a newly created function, and nothing
-- ever revoked it. So all of them were callable by anyone holding the publishable key -- which is
-- in supabase-config.js and is meant to be public.
--
-- Checked against the live project before writing this, with the publishable key and no session:
--   get_dashboard_stats  -> HTTP 200, {"my_score":0,"average_score":63.09,"users_counted":7}
--   reset_own_progress   -> HTTP 400 P0001 "requires an authenticated caller"
-- The second is the function's own guard, not a permission check: the call reached the body.
--
-- What that was actually exposing:
--   * get_dashboard_stats leaked two aggregates -- how many people have registered, and their
--     average score -- to anonymous callers. Its own comment says "safe to expose to any
--     authenticated caller", which is the intent this restores. No individual row, id or email was
--     reachable through it.
--   * reset_own_progress and delete_own_account were inert: both key off auth.uid(), which is null
--     without a session, so they raise or match no rows. Revoked anyway -- they are one careless
--     edit (a user_id argument "for admin use") away from being dangerous, and defence should not
--     rest on the body alone.
--   * record_word_attempt is SECURITY INVOKER, so RLS already blocked an anonymous write. Revoked
--     for the same reason.
--
-- handle_new_user is deliberately not touched: it is a trigger function that runs as the trigger's
-- owner regardless of who inserts, and revoking PUBLIC there does not change who can sign up.

revoke execute on function public.get_dashboard_stats(int, int, int) from public, anon;
revoke execute on function public.record_word_attempt(text, text, boolean, text) from public, anon;
revoke execute on function public.reset_own_progress() from public, anon;
revoke execute on function public.delete_own_account() from public, anon;

-- the intended callers, restated so this file is the whole story
grant execute on function public.get_dashboard_stats(int, int, int) to authenticated;
grant execute on function public.record_word_attempt(text, text, boolean, text) to authenticated;
grant execute on function public.reset_own_progress() to authenticated;
grant execute on function public.delete_own_account() to authenticated;

-- delete_own_account relied on `id = auth.uid()` matching no rows when called without a session.
-- That is true, but it is an accident of NULL comparison rather than a decision. Say it out loud,
-- the way reset_own_progress already does.
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    if auth.uid() is null then
        raise exception 'delete_own_account requires an authenticated caller';
    end if;

    delete from auth.users where id = auth.uid();
end;
$$;

revoke execute on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
