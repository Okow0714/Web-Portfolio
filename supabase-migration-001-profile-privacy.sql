-- Migration 001 — profile privacy and write limits
--
-- Run once in the Supabase SQL Editor against an existing project. supabase-schema.sql
-- already contains all of this, so a project created fresh from that file does NOT need
-- this migration; it exists for projects that were set up before these fixes.
--
-- What it addresses:
--
--   1. handle_new_user() defaulted display_name to split_part(email, '@', 1), and the
--      profiles SELECT policy is `using (true)` because the comment list needs author
--      names. Together those published every user's email local-part to anyone holding
--      the anon key -- which is public by design, so this was readable by anonymous
--      callers. For the common providers it makes the full address a trivial guess.
--
--   2. The profiles UPDATE policy had USING but no WITH CHECK, so nothing re-validated
--      the row actually written.
--
--   3. display_name, comments.content and contact_messages.message were unbounded. The
--      insert policies prove who you are, not how much you may write.
--
-- Safe to re-run: every statement is guarded or idempotent.

begin;

-- ---------------------------------------------------------------------------
-- 1. Stop deriving the display name from the email address
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, display_name)
    values (new.id, 'Reader ' || lpad((abs(hashtext(new.id::text)) % 10000)::text, 4, '0'));
    return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Rewrite names that were generated from an email address. Anything a user has since
-- set for themselves is left alone: only rows still matching their own email's local
-- part are touched, so a chosen name is never overwritten.
update public.profiles p
set display_name = 'Reader ' || lpad((abs(hashtext(p.id::text)) % 10000)::text, 4, '0')
from auth.users u
where u.id = p.id
  and p.display_name = split_part(u.email, '@', 1);

-- ---------------------------------------------------------------------------
-- 2. Re-validate the row an update actually writes
-- ---------------------------------------------------------------------------
drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
    on public.profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- Expose only what the comment author embed needs. created_at is nobody else's
-- business, and only the name may be written back.
revoke select on public.profiles from anon, authenticated;
grant select (id, display_name) on public.profiles to anon, authenticated;
grant update (display_name) on public.profiles to authenticated;

-- ---------------------------------------------------------------------------
-- 3. Bound the free-text columns
-- ---------------------------------------------------------------------------
-- Added NOT VALID then validated separately so an over-long row already present
-- surfaces as a clear error here rather than aborting the whole migration silently.
alter table public.profiles
    drop constraint if exists profiles_display_name_length;
alter table public.profiles
    add constraint profiles_display_name_length
    check (char_length(display_name) between 1 and 40) not valid;
alter table public.profiles validate constraint profiles_display_name_length;

alter table public.comments
    drop constraint if exists comments_content_length;
alter table public.comments
    add constraint comments_content_length
    check (char_length(content) between 1 and 2000) not valid;
alter table public.comments validate constraint comments_content_length;

alter table public.comments
    drop constraint if exists comments_project_id_length;
alter table public.comments
    add constraint comments_project_id_length
    check (char_length(project_id) between 1 and 100) not valid;
alter table public.comments validate constraint comments_project_id_length;

alter table public.contact_messages
    drop constraint if exists contact_messages_message_length;
alter table public.contact_messages
    add constraint contact_messages_message_length
    check (char_length(message) between 1 and 5000) not valid;
alter table public.contact_messages validate constraint contact_messages_message_length;

commit;

-- Check afterwards that nothing is still named after an email address:
--
--   select count(*) from public.profiles p join auth.users u on u.id = p.id
--   where p.display_name = split_part(u.email, '@', 1);
--
-- Expected: 0.
