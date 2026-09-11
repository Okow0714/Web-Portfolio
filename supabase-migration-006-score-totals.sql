-- Run once in the Supabase SQL Editor, after supabase-dashboard.sql.
--
-- get_dashboard_stats divided by totals typed into the SQL: 50 Word Match levels, 40 Grammar levels,
-- 60 Dokkai texts. Word Match has had 60 levels since migration 003 and Dokkai 72 texts since
-- levels 11-12 were added, so a learner who finished Word Match scored 1,200 of its "1,000" points
-- and Dokkai was under-weighted. The same totals also lived in dashboard.js and hub-home.js, and
-- drifted separately.
--
-- The function now takes the totals as arguments. The site passes them from progress-shared.js,
-- the one place they are written down, which CI checks against the data files -- so the score and
-- the progress bars can no longer divide by different numbers.
--
-- Safe to accept from the caller: the totals only scale the result, the average is computed with
-- the same totals as the caller's own score, and the function still returns nothing but two
-- aggregates and a count. Each tool's count is capped at its total, so no argument can push a
-- tool past 1,000, and totals are clamped to a sane range.
--
-- The old no-argument version is dropped: keeping both would make a call with no arguments
-- ambiguous. progress-shared.js falls back to the old call if this migration has not been run.

drop function if exists public.get_dashboard_stats();

create or replace function public.get_dashboard_stats(
    p_word_levels int default 60,
    p_grammar_levels int default 40,
    p_reading_texts int default 72
)
returns table (my_score numeric, average_score numeric, users_counted bigint)
language sql
security definer
set search_path = public
as $$
    with totals as (
        select
            greatest(1, least(p_word_levels, 10000))::numeric as w,
            greatest(1, least(p_grammar_levels, 10000))::numeric as g,
            greatest(1, least(p_reading_texts, 10000))::numeric as r
    ),
    per_user as (
        select
            p.id as user_id,
            (
                least(coalesce((select count(*) from public.game_progress x where x.user_id = p.id and x.completed), 0), t.w) / t.w * 1000
                + least(coalesce((select count(*) from public.grammar_progress x where x.user_id = p.id and x.completed), 0), t.g) / t.g * 1000
                + least(coalesce((select count(*) from public.reading_progress x where x.user_id = p.id), 0), t.r) / t.r * 1000
            ) as score
        from public.profiles p, totals t
    )
    select
        coalesce((select score from per_user where user_id = auth.uid()), 0) as my_score,
        coalesce((select avg(score) from per_user), 0) as average_score,
        (select count(*) from per_user) as users_counted;
$$;

grant execute on function public.get_dashboard_stats(int, int, int) to authenticated;
