// Dashboard (dashboard.html) — profile summary, per-tool progress, score vs. average, and a
// display-name editor. Password/session/account-deletion stays in the existing account modal
// (auth-shared.js) rather than being rebuilt here; the "Open Account Menu" button just triggers
// that modal's existing open path (clicking #auth-user-email) instead of duplicating it.
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

    async function refreshDashboard(session) {
        renderStaticStrings();
        await Promise.all([
            loadProfile(session.user.id, session.user.email),
            loadToolProgress(session.user.id),
            loadScore(),
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
        } else {
            nameStatusEl.textContent = window.t('dash.nameSaved');
            nameDisplayEl.textContent = newName;
            avatarEl.textContent = initials(newName);
            showEl(nameDisplayEl.closest('.dash-profile-name-row'));
            hideEl(nameFormEl);
        }
        showEl(nameStatusEl);
    });

    document.getElementById('dash-open-account-btn').addEventListener('click', () => {
        document.getElementById('auth-user-email').click();
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
