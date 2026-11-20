-- Migration 014: fix migration 013's two-step policy, which locked every signed-in visitor out.
--
-- Run once in the Supabase SQL editor, after 013. Safe to run again.
--
-- WHAT WENT WRONG. 013's restrictive "two-step when enrolled" policy read auth.mfa_factors
-- directly, as Supabase's MFA guide shows. In this project the `authenticated` role has no
-- SELECT on that table, so the policy itself raised "42501: permission denied for table
-- mfa_factors" -- and since a restrictive policy applies to every query, every signed-in read and
-- write on all ten tables failed (found 2026-11-20 when a profile picture would not save).
--
-- THE FIX. One SECURITY DEFINER function answers "which assurance levels may this session use",
-- reading auth.mfa_factors with its owner's rights, so the visitor never needs access to that
-- table. It returns only an array of levels for the CALLER (auth.uid()), never anyone else's
-- factors. The policies call it instead of reading the table.
--
-- IF EVEN THE OWNER CANNOT READ auth.mfa_factors, the block below does not leave the site
-- broken: it removes the policies instead and says so in a NOTICE. Two-step sign-in then works as
-- a screen only (the code is asked for, but the database does not insist on it) until that is
-- sorted out -- which is the state the site was in before 013, and far better than nobody being
-- able to use their account.

create or replace function public.allowed_aal()
returns text[]
language sql
stable
security definer
set search_path = ''
as $$
    select case
        when exists (select 1 from auth.mfa_factors f
                     where f.user_id = auth.uid() and f.status = 'verified')
        then array['aal2']
        else array['aal1', 'aal2']
    end
$$;

-- Postgres grants EXECUTE to PUBLIC on every new function (see migration 007): take it back,
-- then give it only to signed-in sessions, which are the only ones the policies apply to.
revoke execute on function public.allowed_aal() from public, anon;
grant execute on function public.allowed_aal() to authenticated;

do $$
declare
    t text;
    works boolean := true;
    tables constant text[] := array['profiles', 'bookmarks', 'contact_messages', 'game_progress',
        'reading_progress', 'grammar_progress', 'word_stats', 'daily_activity',
        'phonetics_progress', 'user_settings'];
    expr constant text := 'array[(select auth.jwt()->>''aal'')] <@ (select public.allowed_aal())';
begin
    begin
        perform public.allowed_aal();
    exception when insufficient_privilege then
        works := false;
    end;

    foreach t in array tables loop
        if to_regclass('public.' || t) is not null then
            execute format('drop policy if exists "two-step when enrolled" on public.%I', t);
            if works then
                execute format('create policy "two-step when enrolled" on public.%I as restrictive to authenticated using (%s) with check (%s)',
                    t, expr, expr);
            end if;
        end if;
    end loop;

    if works then
        raise notice 'Two-step policies recreated through public.allowed_aal(). Signed-in access is restored.';
    else
        raise notice 'The function owner cannot read auth.mfa_factors either. The two-step policies were REMOVED so signed-in access works; two-step is a screen only for now.';
    end if;
end $$;
