-- Migration 013: account settings -- profile picture, phone number, and two-step verification.
--
-- Run once in the Supabase SQL editor. Safe to run again: every statement checks before it acts.
--
-- 1. PROFILE PICTURE and PHONE NUMBER live on user_settings, the table that already holds this
--    account's own preferences and that only its owner can read or write (migration 009's three
--    policies). Not on profiles: nothing on profiles is needed by anyone else any more, but it
--    has been reachable by others in the past, and a phone number must never be one grant away
--    from public.
--    The picture is stored as a small data URL (the page resizes it to 160x160 JPEG first, about
--    8-15 KB), so no storage bucket, no bucket policies and no signed URLs are needed.
--
-- 2. TWO-STEP VERIFICATION is Supabase's built-in TOTP (an authenticator app). Supabase does the
--    enrolment and the code check; what it does NOT do on its own is refuse data to a session
--    that has signed in with the password but not yet entered the code (assurance level aal1).
--    Without that, the second step would only be a screen. So every table holding a person's
--    own data gets one RESTRICTIVE policy: an account with a verified factor must present an
--    aal2 session; an account without one is unaffected. This is the pattern in Supabase's own
--    MFA guide. Restrictive policies are ANDed with the existing permissive ones, so nothing
--    that was allowed before becomes allowed now -- they can only take away.
--    Check in the dashboard (Authentication > Multi-Factor) that TOTP is enabled; it is on by
--    default for new projects.

-- ---------------------------------------------------------------- 1. picture and phone
alter table public.user_settings add column if not exists avatar text;
alter table public.user_settings add column if not exists phone text;

do $$ begin
    if not exists (select 1 from pg_constraint where conname = 'user_settings_avatar_size') then
        alter table public.user_settings add constraint user_settings_avatar_size
            check (avatar is null or (length(avatar) < 60000 and avatar like 'data:image/%'));
    end if;
    if not exists (select 1 from pg_constraint where conname = 'user_settings_phone_shape') then
        alter table public.user_settings add constraint user_settings_phone_shape
            check (phone is null or phone ~ '^\+?[0-9 ()-]{6,24}$');
    end if;
end $$;

-- ---------------------------------------------------------------- 2. two-step enforcement
do $$
declare
    t text;
    using_expr constant text :=
        'array[(select auth.jwt()->>''aal'')] <@ ('
        || ' select case when count(id) > 0 then array[''aal2''] else array[''aal1'', ''aal2''] end'
        || ' from auth.mfa_factors where (select auth.uid()) = user_id and status = ''verified'')';
begin
    foreach t in array array['profiles', 'bookmarks', 'contact_messages', 'game_progress',
        'reading_progress', 'grammar_progress', 'word_stats', 'daily_activity',
        'phonetics_progress', 'user_settings']
    loop
        if to_regclass('public.' || t) is not null then
            execute format('drop policy if exists "two-step when enrolled" on public.%I', t);
            execute format('create policy "two-step when enrolled" on public.%I as restrictive to authenticated using (%s) with check (%s)',
                t, using_expr, using_expr);
        end if;
    end loop;
end $$;
