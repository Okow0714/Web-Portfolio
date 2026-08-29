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
-- completed -- Word Match (50 levels), Grammar Connect (40 levels across its two tracks),
-- Dokkai Reader (60 texts across its two tracks) -- summed to a 0-3000 total. Deliberately NOT
-- based on best_time_seconds/best_moves/best_mistakes: those are recorded against each level's
-- pair/sentence count at the time it was played, which can change later (e.g. Word Match went
-- from 10 to 25 pairs per level in August 2026) -- a completion-fraction score stays correct
-- without needing to renormalize old rows when content size changes.
-- ---------------------------------------------------------------------------
create or replace function public.get_dashboard_stats()
returns table (my_score numeric, average_score numeric, users_counted bigint)
language sql
security definer
set search_path = public
as $$
    with per_user as (
        select
            p.id as user_id,
            (
                coalesce((select count(*) from public.game_progress g where g.user_id = p.id and g.completed), 0)::numeric / 50 * 1000
                + coalesce((select count(*) from public.grammar_progress gr where gr.user_id = p.id and gr.completed), 0)::numeric / 40 * 1000
                + coalesce((select count(*) from public.reading_progress r where r.user_id = p.id), 0)::numeric / 60 * 1000
            ) as score
        from public.profiles p
    )
    select
        coalesce((select score from per_user where user_id = auth.uid()), 0) as my_score,
        coalesce((select avg(score) from per_user), 0) as average_score,
        (select count(*) from per_user) as users_counted;
$$;

grant execute on function public.get_dashboard_stats() to authenticated;
