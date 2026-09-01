// Home page (index.html) additions: the dictionary search bar and the progress widget pulled
// from Dashboard. Depends on auth-shared.js (window.onAuthChange, window.supabaseClient) having
// already run. The Supabase queries here mirror dashboard.js's exactly -- same tables, same RPC
// -- since this widget is showing that same data, just condensed, on the front door instead of
// making a visitor go find it.
(function () {
    const sb = window.supabaseClient;

    const GAME_LEVELS_TOTAL = 50;
    const GRAMMAR_LEVELS_TOTAL = 40;
    const READING_TEXTS_TOTAL = 60;

    // ---------------------------------------------------------------------------
    // Search bar -- submits to the dictionary's primary Монгол⇄日本語 tab.
    // ---------------------------------------------------------------------------
    document.getElementById('hub-search').addEventListener('submit', (e) => {
        e.preventDefault();
        const q = document.getElementById('hub-search-input').value.trim();
        if (!q) return;
        window.location.href = 'dictionary.html?q=' + encodeURIComponent(q);
    });

    // ---------------------------------------------------------------------------
    // Progress widget
    // ---------------------------------------------------------------------------
    function initials(text) {
        return (text || '?').trim().charAt(0).toUpperCase();
    }

    function setBar(fillEl, value, max) {
        const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
        fillEl.style.width = pct + '%';
    }

    async function loadProfileName(userId, email) {
        const { data } = await sb.from('profiles').select('display_name').eq('id', userId).single();
        const displayName = data ? data.display_name : email.split('@')[0];
        document.getElementById('hub-progress-name').textContent = displayName;
        document.getElementById('hub-progress-avatar').textContent = initials(displayName);
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

        setBar(document.getElementById('hub-progress-game-fill'), gameDone, GAME_LEVELS_TOTAL);
        document.getElementById('hub-progress-game-frac').textContent = window.tf('hub.progress.levelsDone', { done: gameDone, total: GAME_LEVELS_TOTAL });
        setBar(document.getElementById('hub-progress-grammar-fill'), grammarDone, GRAMMAR_LEVELS_TOTAL);
        document.getElementById('hub-progress-grammar-frac').textContent = window.tf('hub.progress.levelsDone', { done: grammarDone, total: GRAMMAR_LEVELS_TOTAL });
        setBar(document.getElementById('hub-progress-reading-fill'), readingDone, READING_TEXTS_TOTAL);
        document.getElementById('hub-progress-reading-frac').textContent = window.tf('hub.progress.textsDone', { done: readingDone, total: READING_TEXTS_TOTAL });
    }

    async function loadScore() {
        const { data, error } = await sb.rpc('get_dashboard_stats').single();
        if (error || !data) return;
        document.getElementById('hub-progress-score').textContent = Math.round(Number(data.my_score) || 0);
    }

    async function refreshProgress(session) {
        await Promise.all([
            loadProfileName(session.user.id, session.user.email),
            loadToolProgress(session.user.id),
            loadScore(),
        ]);
    }

    document.addEventListener('sitelangchange', () => {
        const session = window.getCurrentSession();
        if (session) refreshProgress(session);
    });

    window.onAuthChange((session) => {
        const authedEl = document.getElementById('hub-progress-authed');
        const guestEl = document.getElementById('hub-progress-guest');
        if (session) {
            authedEl.classList.remove('hidden');
            guestEl.classList.add('hidden');
            refreshProgress(session);
        } else {
            authedEl.classList.add('hidden');
            guestEl.classList.remove('hidden');
        }
    });
})();
