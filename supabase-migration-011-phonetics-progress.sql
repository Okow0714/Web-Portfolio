-- Migration 011 — Phonetics Family remembers which groups you have opened.
--
-- Phonetics Family was the one tool with no per-user state at all. Every other tool has a
-- progress table, which is why the dictionary's planned cross-tool badges could say "in Word
-- Match, level 7, finished" but only ever "in a phonetic family" with no second half.
--
-- What counts as progress here is deliberately weak: a family is "seen" once you have opened its
-- tree. There is nothing to complete — the tool is a map you browse, not a set of levels — so
-- this records attention, not achievement, and the UI says "үзсэн" / "seen" rather than "done".
--
-- Keyed on the phonetic alone, NOT on (level, phonetic). phonetics-data.js re-lists a family
-- under every JLPT level one of its members belongs to, and phonetics.js's own deep-link comment
-- records that the member array is identical each time. Opening 会 from the N5 list and from the
-- N4 list therefore shows exactly the same tree, and storing both would be storing the same fact
-- twice under two names.
--
-- Retention: this is the user's own study history and is deleted with the account
-- (on delete cascade), or on demand through reset_own_progress() below.

create table if not exists public.phonetics_progress (
    user_id uuid not null references auth.users on delete cascade,
    -- a phonetic component is one kanji in practice; the bound is for the insert policy's sake,
    -- which proves who you are and not how much you may write
    phonetic text not null check (char_length(phonetic) between 1 and 8),
    viewed_at timestamptz not null default now(),
    primary key (user_id, phonetic)
);

alter table public.phonetics_progress enable row level security;

-- Same shape as game_progress and reading_progress: a row is yours or it is not yours.
drop policy if exists "Users manage their own phonetics progress" on public.phonetics_progress;
create policy "Users manage their own phonetics progress"
    on public.phonetics_progress for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------------------------
-- reset_own_progress() has to learn about the new table, or "reset my progress" would leave every
-- phonetic family still marked as seen. Redefined in full because that is how 005 and 008 did it;
-- the body below is 008's plus one delete.
--
-- Postgres grants EXECUTE to PUBLIC on a newly created function, so the revoke is not optional —
-- see supabase-migration-007-lock-function-grants.sql.
-- ---------------------------------------------------------------------------------------------
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

    delete from public.game_progress       where user_id = auth.uid();
    delete from public.grammar_progress    where user_id = auth.uid();
    delete from public.reading_progress    where user_id = auth.uid();
    delete from public.word_stats          where user_id = auth.uid();
    delete from public.daily_activity      where user_id = auth.uid();
    delete from public.phonetics_progress  where user_id = auth.uid();
end;
$$;

revoke execute on function public.reset_own_progress() from public, anon;
grant execute on function public.reset_own_progress() to authenticated;
