// Shared by dashboard.js and hub-home.js: how much content each tool has, the score call, and the
// spaced-review queue. One copy, because the two pages used to hardcode their own totals and drifted:
// both said Word Match had 50 levels long after it had 60, and the score SQL divided Dokkai by 60
// texts after it had 72.
//
// The totals are checked against the data files by tests/progress-totals.spec.js, so changing how
// many levels or texts a tool has without updating them here fails CI instead of quietly skewing
// every learner's progress bar and score.
(function () {
    const TOTALS = {
        wordMatchLevels: 60,   // WORD_LEVELS in game-words.js
        grammarLevels: 40,     // GRAMMAR_LEVELS in grammar-data.js, both tracks
        readingTexts: 72,      // READING_TRACKS in reading-texts.js, both tracks
    };

    // get_dashboard_stats takes the totals as arguments (supabase-migration-006) so the score and
    // the bars always divide by the same numbers. A project that has not run 006 yet still has the
    // old no-argument version -- fall back to it rather than showing no score at all.
    async function fetchScore(sb) {
        let res = await sb.rpc('get_dashboard_stats', {
            p_word_levels: TOTALS.wordMatchLevels,
            p_grammar_levels: TOTALS.grammarLevels,
            p_reading_texts: TOTALS.readingTexts,
        }).single();
        if (res.error) res = await sb.rpc('get_dashboard_stats').single();
        return res.error ? null : res.data;
    }

    // The review queue. record_word_attempt (supabase-migration-004) schedules every word a learner
    // meets on a Leitner ladder -- box 0 comes back at once, then 1, 3, 7, 16, 35, 90 days -- and
    // stores the date in due_at. Nothing read it until now.
    //
    // Two deliberate limits:
    //   * only words missed at least once. A correct first attempt is scheduled too (box 1, due
    //     tomorrow), so counting everything would put every word of every level played into
    //     tomorrow's queue, mostly words the learner already knows.
    //   * only Word Match's own words (source 'game'). Review runs on a Word Match board, which can
    //     only play words that exist in WORD_LEVELS; every 'game' row is one by construction, so the
    //     number shown is always a number the review can actually deliver.
    async function fetchDue(sb, userId) {
        const now = new Date().toISOString();
        const [dueRes, nextRes] = await Promise.all([
            sb.from('word_stats').select('word', { count: 'exact', head: true })
                .eq('user_id', userId).eq('source', 'game').gt('misses', 0).lte('due_at', now),
            sb.from('word_stats').select('due_at')
                .eq('user_id', userId).eq('source', 'game').gt('misses', 0).gt('due_at', now)
                .order('due_at', { ascending: true }).limit(1),
        ]);
        if (dueRes.error) return null;
        const next = !nextRes.error && nextRes.data && nextRes.data[0] ? new Date(nextRes.data[0].due_at) : null;
        return { due: dueRes.count || 0, next };
    }

    // "tomorrow" / "in 5 days" for the next word coming due -- whole calendar days, so a word due at
    // 03:00 tomorrow reads as tomorrow rather than "in 0 days".
    function daysUntil(date) {
        if (!date) return null;
        const a = new Date(); a.setHours(0, 0, 0, 0);
        const b = new Date(date); b.setHours(0, 0, 0, 0);
        return Math.max(0, Math.round((b - a) / 86400000));
    }

    window.KhanProgress = { TOTALS, fetchScore, fetchDue, daysUntil };
})();
