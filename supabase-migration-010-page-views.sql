-- Run once in the Supabase SQL Editor.
--
-- GitHub Pages gives the site's owner no server logs, so "how many visits am I getting" was
-- unanswerable. Every off-the-shelf analytics service would tell a third party each visitor's IP on
-- every page load -- the exact thing the vendored fonts and Supabase library were adopted to avoid
-- (see CLAUDE.md), and the thing privacy.html promises does not happen. So the count lives here.
--
-- What a row is: a date, a page name, and a number. No IP address, no user agent, no visitor or
-- session id, no referrer, no timestamps beyond the date, and no link to an account -- signed in or
-- not, the same row is incremented. There is deliberately nothing here to identify anyone with, so
-- the privacy policy can keep saying that visitors are not tracked.
--
-- What it therefore CANNOT answer: unique visitors, returning visitors, where people came from, or
-- what anyone did. Those all need something that follows a person around, which is the trade made
-- on purpose. It counts page loads.

create table if not exists public.page_views (
    day date not null default current_date,
    path text not null,
    views integer not null default 0 check (views >= 0),
    primary key (day, path)
);

alter table public.page_views enable row level security;

-- No policies, on purpose. RLS with no policy denies everything, so nobody holding the publishable
-- key can read the counts or write a row directly; the only way in is the function below, which can
-- only ever increment. The owner reads the numbers in the SQL Editor:
--
--   select day, sum(views) as views from public.page_views group by day order by day desc limit 30;
--   select path, sum(views) as views from public.page_views group by path order by views desc;
--   select sum(views) from public.page_views where day >= current_date - 6;   -- last 7 days

-- SECURITY DEFINER because the table denies everyone; the function is the only door.
-- The path is checked against a fixed list so a caller cannot invent rows, and an unknown path is
-- ignored rather than raised: a visitor should never see an error because a page was renamed.
create or replace function public.record_page_view(p_path text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
    known text[] := array[
        'index.html', 'game.html', 'grammar.html', 'reading.html', 'phonetics.html',
        'dictionary.html', 'origins.html', 'path.html', 'dashboard.html',
        'credits.html', 'privacy.html', 'terms.html', 'about.html'
    ];
begin
    if p_path is null or not (p_path = any (known)) then
        return;
    end if;

    insert into public.page_views as v (day, path, views)
    values (current_date, p_path, 1)
    on conflict (day, path) do update set views = v.views + 1;
end;
$$;

-- This is the one RPC anon may call, and it is a deliberate exception to migration 007's rule that
-- every function is revoked from anon: a visit counter that only signed-in people trigger would
-- count almost nothing. It takes no personal data, returns nothing, and can only add 1 to a counter.
-- The cost of that openness: anyone who finds it can inflate the numbers by calling it in a loop.
-- Treat these as a rough signal, not a metric to defend.
revoke execute on function public.record_page_view(text) from public;
grant execute on function public.record_page_view(text) to anon, authenticated;
