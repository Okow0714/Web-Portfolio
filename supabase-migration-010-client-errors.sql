-- Run once in the Supabase SQL Editor.
--
-- Until now nothing anywhere reported a JavaScript error. A visitor on an older Android whose
-- board fails to build closes the tab, and the only trace is a session that did nothing. That is
-- the gap this closes, and it closes it without handing a third party anything: the reports land
-- in this project, next to everything else, rather than at an error-monitoring vendor who would
-- also learn every visitor's IP -- the same reason the fonts and the Supabase client are vendored
-- instead of fetched from a CDN.
--
-- WHAT IS DELIBERATELY NOT STORED. There is no user_id and no IP. A stack trace plus the page it
-- happened on is enough to fix a bug; knowing which of twelve testers hit it is not, and a table
-- that holds no personal data needs no deletion path, no export path and no cascade. Keep it that
-- way -- adding user_id here would make this a second place account data lives, and privacy.html
-- would have to grow a section.

create table if not exists public.client_errors (
    id bigint generated always as identity primary key,
    created_at timestamptz not null default now(),
    -- pathname + search only; error-report.js strips the hash, which on this site is only ever
    -- an in-page anchor and is the one part of a URL a user could have typed something into.
    page text not null check (length(page) <= 200),
    message text not null check (length(message) <= 500),
    source text check (length(source) <= 300),
    stack text check (length(stack) <= 4000),
    user_agent text check (length(user_agent) <= 300),
    -- sw.js's CACHE_VERSION, so a report can be tied to a build. A returning PWA user can be one
    -- version behind (fetch is stale-while-revalidate), which is exactly when this matters.
    app_version text check (length(app_version) <= 40)
);

alter table public.client_errors enable row level security;

-- Insert only, and anonymously: most visitors never sign in, and the tools deliberately work
-- without an account, so the errors worth seeing are mostly anonymous ones.
drop policy if exists "anyone may report an error" on public.client_errors;
create policy "anyone may report an error" on public.client_errors
    for insert with check (true);

-- There is NO select policy on purpose, so the table is unreadable through the API by anon and
-- authenticated alike. It is read in the SQL editor, with the service role. Without this a public
-- insert target would also be a public log of every broken page on the site.
revoke all on public.client_errors from anon, authenticated;
grant insert (page, message, source, stack, user_agent, app_version) on public.client_errors to anon, authenticated;

create index if not exists client_errors_created_at_idx on public.client_errors (created_at desc);

-- Retention. Nothing schedules this (pg_cron is not enabled), so it is a line to run by hand every
-- so often. These are debugging crumbs, not records; ninety days is already generous.
--     delete from public.client_errors where created_at < now() - interval '90 days';

-- Reading them: the grouped view is the one worth having, since one broken selector produces one
-- row per visitor rather than one bug.
--     select message, page, count(*), max(created_at) as last_seen
--       from public.client_errors
--      where created_at > now() - interval '7 days'
--      group by message, page
--      order by count(*) desc;
