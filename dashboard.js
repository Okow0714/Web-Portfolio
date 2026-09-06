// Dashboard (dashboard.html) — profile summary, per-tool progress, score vs. average, and a
// display-name editor. Password/session/account-deletion stays in the existing Settings modal
// (auth-shared.js) rather than being rebuilt here; the "Open Account Menu" button just triggers
// that modal's existing open path (clicking #account-settings-btn) instead of duplicating it.
(function () {
    const sb = window.supabaseClient;

    const GAME_LEVELS_TOTAL = 50;
    const GRAMMAR_LEVELS_TOTAL = 40;
    const READING_TEXTS_TOTAL = 60;

    const guestEl = document.getElementById('dash-guest');
    const contentEl = document.getElementById('dash-content');
    const avatarEl = document.getElementById('dash-avatar');
    const nameDisplayEl = document.getElementById('dash-profile-name');
    const nameFormEl = document.getElementById('dash-name-form');
    const nameInputEl = document.getElementById('dash-name-input');
    const nameStatusEl = document.getElementById('dash-name-status');
    const emailEl = document.getElementById('dash-profile-email');

    function initials(text) {
        return (text || '?').trim().charAt(0).toUpperCase();
    }

    function setBar(fillEl, numEl, value, max) {
        const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
        fillEl.style.width = pct + '%';
        if (numEl) numEl.textContent = Math.round(value);
    }

    async function loadProfile(userId, email) {
        const { data } = await sb.from('profiles').select('display_name').eq('id', userId).single();
        const displayName = data ? data.display_name : email.split('@')[0];
        nameDisplayEl.textContent = displayName;
        avatarEl.textContent = initials(displayName);
        emailEl.textContent = email;
        nameInputEl.value = displayName;
    }

    async function loadToolProgress(userId) {
        const [gameRes, grammarRes, readingRes] = await Promise.all([
            sb.from('game_progress').select('level', { count: 'exact', head: true }).eq('user_id', userId).eq('completed', true),
            sb.from('grammar_progress').select('level', { count: 'exact', head: true }).eq('user_id', userId).eq('completed', true),
            sb.from('reading_progress').select('text_id', { count: 'exact', head: true }).eq('user_id', userId),
        ]);
        const gameDone = gameRes.count || 0;
        const grammarDone = grammarRes.count || 0;
        const readingDone = readingRes.count || 0;

        setBar(document.getElementById('dash-game-fill'), null, gameDone, GAME_LEVELS_TOTAL);
        document.getElementById('dash-game-fraction').textContent = window.tf('dash.levelsDone', { done: gameDone, total: GAME_LEVELS_TOTAL });
        setBar(document.getElementById('dash-grammar-fill'), null, grammarDone, GRAMMAR_LEVELS_TOTAL);
        document.getElementById('dash-grammar-fraction').textContent = window.tf('dash.levelsDone', { done: grammarDone, total: GRAMMAR_LEVELS_TOTAL });
        setBar(document.getElementById('dash-reading-fill'), null, readingDone, READING_TEXTS_TOTAL);
        document.getElementById('dash-reading-fraction').textContent = window.tf('dash.textsDone', { done: readingDone, total: READING_TEXTS_TOTAL });
    }

    async function loadScore() {
        const { data, error } = await sb.rpc('get_dashboard_stats').single();
        if (error || !data) return;
        const my = Number(data.my_score) || 0;
        const avg = Number(data.average_score) || 0;
        document.getElementById('dash-score-total').textContent = Math.round(my);
        setBar(document.getElementById('dash-score-mine-fill'), document.getElementById('dash-score-mine-num'), my, 3000);
        setBar(document.getElementById('dash-score-avg-fill'), document.getElementById('dash-score-avg-num'), avg, 3000);
        document.getElementById('dash-users-counted').textContent = window.tf('dash.usersCounted', { n: data.users_counted || 0 });
    }

    function renderStaticStrings() {
        document.getElementById('dash-score-formula-note').textContent = window.tf('dash.scoreNote', { n: '1,000' });
    }

    // The tools record a row per word met (see word-stats.js); this is the first place any of
    // it is read back. Ordered by misses rather than recency, because the point is what keeps
    // catching you out, not what caught you out last.
    const MISSED_LIMIT = 8;
    const SOURCE_KEY = { game: 'nav.wordGame', grammar: 'nav.grammarConnect', reading: 'nav.dokkaiReader' };

    async function loadMissedWords(userId) {
        const listEl = document.getElementById('dash-missed-list');
        const emptyEl = document.getElementById('dash-missed-empty');
        const { data, error } = await sb.from('word_stats')
            .select('word, source, misses, confused_with')
            .eq('user_id', userId)
            .gt('misses', 0)
            .order('misses', { ascending: false })
            .limit(MISSED_LIMIT);

        const practiseEl = document.getElementById('dash-missed-practise');
        listEl.innerHTML = '';
        if (error || !data || !data.length) {
            showEl(emptyEl);
            hideEl(practiseEl);
            return;
        }
        hideEl(emptyEl);
        // Only Word Match words can be played on a Word Match board. A learner whose misses are
        // all grammar points or skipped reading words would otherwise follow this link and land
        // on the level select with no explanation of why.
        if (data.some(row => row.source === 'game')) showEl(practiseEl);
        else hideEl(practiseEl);
        data.forEach(row => {
            const li = document.createElement('li');
            li.className = 'dash-missed-row';
            const times = window.tf('dash.missed.times', { n: row.misses });
            const picked = row.confused_with
                ? '<span class="dash-missed-confused">' + window.tf('dash.missed.picked', { word: escapeHtml(row.confused_with) }) + '</span>'
                : '';
            li.innerHTML =
                '<span class="dash-missed-word" lang="ja">' + escapeHtml(row.word) + '</span>' +
                '<span class="dash-missed-meta"><span class="dash-missed-source">' +
                    escapeHtml(window.t(SOURCE_KEY[row.source] || row.source)) + '</span>' + picked + '</span>' +
                '<span class="dash-missed-count">' + escapeHtml(times) + '</span>';
            listEl.appendChild(li);
        });
    }

    function escapeHtml(str) {
        const d = document.createElement('div');
        d.textContent = str == null ? '' : String(str);
        return d.innerHTML;
    }

    async function refreshDashboard(session) {
        renderStaticStrings();
        await Promise.all([
            loadProfile(session.user.id, session.user.email),
            loadToolProgress(session.user.id),
            loadScore(),
            loadMissedWords(session.user.id),
        ]);
    }

    // re-render the tf()-templated strings (score formula note, users-counted) on a language
    // switch -- data-i18n handles everything else automatically, but these two substitute a
    // {n} value so they need their own re-render rather than a plain textContent swap.
    document.addEventListener('sitelangchange', () => {
        const session = window.getCurrentSession();
        if (session) refreshDashboard(session);
    });

    // --- display name editing ---
    document.getElementById('dash-name-edit-btn').addEventListener('click', () => {
        hideEl(nameDisplayEl.closest('.dash-profile-name-row'));
        showEl(nameFormEl);
        nameInputEl.focus();
        nameInputEl.select();
    });
    document.getElementById('dash-name-cancel-btn').addEventListener('click', () => {
        showEl(nameDisplayEl.closest('.dash-profile-name-row'));
        hideEl(nameFormEl);
        hideEl(nameStatusEl);
    });
    document.getElementById('dash-name-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const session = window.getCurrentSession();
        if (!session) return;
        const newName = nameInputEl.value.trim();
        if (!newName) return;
        const { error } = await sb.from('profiles').update({ display_name: newName }).eq('id', session.user.id);
        if (error) {
            nameStatusEl.textContent = window.t('dash.nameSaveFailed');
            nameStatusEl.classList.remove('warn');
        } else {
            // Display names are world-readable -- the comment list embeds them -- so a name
            // that is also the email's local part hands out the address to anyone who asks,
            // and for the common providers the rest is a guess. The signup default was changed
            // away from the email for exactly this reason, so it would be odd to say nothing
            // when someone types it back in. Said, not enforced: it is their name to choose.
            const localPart = (session.user.email || '').split('@')[0];
            const looksLikeEmail = !!localPart && newName.toLowerCase() === localPart.toLowerCase();
            nameStatusEl.textContent = window.t(looksLikeEmail ? 'dash.namePublicWarning' : 'dash.nameSaved');
            nameStatusEl.classList.toggle('warn', looksLikeEmail);
            nameDisplayEl.textContent = newName;
            avatarEl.textContent = initials(newName);
            showEl(nameDisplayEl.closest('.dash-profile-name-row'));
            hideEl(nameFormEl);
        }
        showEl(nameStatusEl);
    });

    document.getElementById('dash-open-account-btn').addEventListener('click', () => {
        document.getElementById('account-settings-btn').click();
    });

    window.onAuthChange((session) => {
        if (session) {
            hideEl(guestEl);
            showEl(contentEl);
            refreshDashboard(session);
        } else {
            showEl(guestEl);
            hideEl(contentEl);
        }
    });
})();
