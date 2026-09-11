-- Run this once in your Supabase project's SQL Editor, after supabase-schema.sql.
-- Adds the aggregate function behind the new Dashboard page's "your score vs. the average"
-- comparison, plus a column for the dashboard-editable display name (profiles.display_name
-- already exists and is already updatable per its RLS policy in supabase-schema.sql -- no
-- change needed there, this file is additive only).

-- ---------------------------------------------------------------------------
-- get_dashboard_stats: the ONLY way the client computes "average score across all users".
-- Runs as SECURITY DEFINER so it can read every user's progress rows (which individual users'
-- own RLS policies would otherwise block), but it returns nothing except two aggregate numbers
-- and a user count -- never any other user's individual rows, id, or email. Safe to expose to
-- any authenticated caller.
--
-- Score formula (documented here since it's not derived from anything self-evident): each of
-- the three tools contributes up to 1000 points, scaled by fraction of that tool's content
-- completed, summed to a 0-3000 total. The totals are arguments, passed by the site from
-- progress-shared.js (see supabase-migration-006-score-totals.sql for why). Deliberately NOT
-- based on best_time_seconds/best_moves/best_mistakes: those are recorded against each level's
-- pair/sentence count at the time it was played, which can change later (e.g. Word Match went
-- from 10 to 25 pairs per level in August 2026) -- a completion-fraction score stays correct
-- without needing to renormalize old rows when content size changes.
-- ---------------------------------------------------------------------------
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
