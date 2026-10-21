// Word Match — a memory game of hexagonal cards, played over four hands per level.
//
// Click a face-down tile to turn it, find its partner, and clear the pair. Your score is the
// number of clicks you spend: forty-eight is a perfect level, because twenty-four pairs cannot
// be cleared in fewer than forty-eight clicks even if you remember every one. There is no clock
// in the main round — the only clock in the game is the four seconds of the bonus.
//
// Depends on auth-shared.js (window.supabaseClient, window.getCurrentSession(), the
// 'wp:authchange' event and the global showEl/hideEl helpers) and game-words.js (WORD_LEVELS).
//
// Word Match is split across game-core.js, game-fx.js, game-gate.js, game-memory.js and
// game.js, loaded in that order by game.html. They are classic scripts sharing one global
// scope. The one rule is load order: code that runs while a file is loading may only use what
// an EARLIER file defined. Listeners and animation-frame callbacks run later, so they are free
// to reach forward — which is why every function here can call into game-memory.js and back.
//
// This file: the level, progress, the level-complete pop-up, wiring and start-up.

let currentLevel = null;
let activeTier = 'N5';       // which tier the gate is showing; read by game-gate.js
let progressCache = {};      // level number -> game_progress row
let lastResult = null;       // result earned as a guest, pending save once they log in
let boardBgDayPath = null;   // day-theme path of the photo behind the board; see applyBoardBg()
let stopwatch = null;

// ---------------------------------------------------------------------------
// Opening and leaving a level
// ---------------------------------------------------------------------------
function startLevel(level) {
    currentLevel = level;
    if (!level.review) activeTier = level.jlpt;

    // The level's words, shuffled once and then dealt six at a time, so a hand is a slice rather
    // than a fresh draw — no word can turn up in two hands of the same playthrough.
    levelDeck = shuffleArray(level.sets[0].slice())
        .slice(0, MAIN_PAIRS * HANDS_PER_LEVEL);

    handIndex = 0;
    clicks = 0;
    misses = 0;
    bonusPairs = 0;
    hints = 0;
    pairsThisHand = 0;
    elapsedSeconds = 0;
    window.clearTimeout(bonusTimer);

    // A review board has no level number to cycle from, and (0 - 1) % n is -1 in JavaScript,
    // not n-1 — which indexed past the start of both the photo array and the music pool and
    // asked the server for a file literally named "undefined".
    const cycleIndex = level.review ? 0 : level.level - 1;
    boardBgDayPath = BOARD_BG_IMAGES[cycleIndex % BOARD_BG_IMAGES.length];
    applyBoardBg();

    // Music is per JLPT tier (N4/N5 share one pool); cycle by position WITHIN the tier so N4
    // and N5 each start their own pass through the shared pool rather than picking up wherever
    // the other left off.
    const pool = MUSIC_POOLS[level.jlpt];
    GameAudio.setLevelTrack(pool[(cycleIndex % levelsPerTier()) % pool.length]);

    document.getElementById('board-level-label').textContent = levelTitle(level);
    resetLastPair();
    dealHand();

    hideEl(document.getElementById('level-select-section'));
    showEl(document.getElementById('board-section'));
    // Full-screen "playing" mode: the shared masthead hides and .game-main breaks out of
    // .container's cap, so the board fills the viewport instead of sitting in a boxed column.
    document.body.classList.add('game-playing');
    resizeCanvases();
    startStopwatch();
}

function backToLevels() {
    stopStopwatch();
    window.clearTimeout(bonusTimer);
    phase = 'gate';
    hideEl(document.getElementById('board-section'));
    showEl(document.getElementById('level-select-section'));
    document.body.classList.remove('game-playing');
    GameAudio.setLevelTrack(LEVEL_SELECT_TRACK);
    renderGate();
    resizeCanvases();
}

// A stopwatch, not a clock. Nothing runs out, but the time is still worth keeping: it is half of
// what game_progress stores and what the dashboard shows, and it is the tiebreak between two
// runs that spent the same number of clicks.
function startStopwatch() {
    stopStopwatch();
    stopwatch = window.setInterval(() => {
        if (phase === 'play' || phase === 'bonus') elapsedSeconds++;
    }, 1000);
}
function stopStopwatch() {
    if (stopwatch) window.clearInterval(stopwatch);
    stopwatch = null;
}

// The board photo has a night counterpart per level under images/game-bg/night/. Not a CSS
// light-dark() token like the rest of the theming — that only takes colours, never url() — so
// the path is chosen here and re-chosen if the theme changes while a board is open.
function applyBoardBg() {
    if (!boardBgDayPath) return;
    const dark = window.getEffectiveTheme ? window.getEffectiveTheme() === 'dark' : false;
    const path = dark ? boardBgDayPath.replace('images/game-bg/', 'images/game-bg/night/') : boardBgDayPath;
    gameMain.style.setProperty('--board-bg-image', `url(${path})`);
}
document.addEventListener('themechange', applyBoardBg);

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------
// The schema is unchanged by the rebuild: best_moves now holds clicks and best_time_seconds a
// stopwatch rather than a countdown. Both still mean "lower is better", which is all the
// dashboard and the score SQL ever assumed, so no migration was needed.
async function loadProgress() {
    const session = window.getCurrentSession();
    progressCache = {};
    if (session) {
        const { data, error } = await sb.from('game_progress').select('*')
            .eq('user_id', session.user.id);
        if (!error && data) data.forEach(row => { progressCache[row.level] = row; });
    }
    renderGate();
}

async function saveProgress(session, result) {
    const statusEl = document.getElementById('pop-save');
    const existing = progressCache[result.level];
    const isBetter = !existing || !existing.completed ||
        result.moves < existing.best_moves ||
        (result.moves === existing.best_moves && result.timeSeconds < existing.best_time_seconds);

    const row = {
        user_id: session.user.id,
        level: result.level,
        completed: true,
        best_time_seconds: isBetter ? result.timeSeconds : existing.best_time_seconds,
        best_moves: isBetter ? result.moves : existing.best_moves,
        updated_at: new Date().toISOString(),
    };

    const { error } = await sb.from('game_progress').upsert(row, { onConflict: 'user_id,level' });
    if (!error) {
        progressCache[result.level] = row;
        statusEl.textContent = isBetter ? window.t('game.newBestSaved') : window.t('game.resultSaved');
    } else {
        statusEl.textContent = window.t('game.saveResultFailed');
    }
    statusEl.classList.remove('hidden');
}

// ---------------------------------------------------------------------------
// Level complete
// ---------------------------------------------------------------------------
// A perfect level is MAIN_PAIRS * HANDS_PER_LEVEL * 2 clicks: every pair found on its first
// try. Derived, not written down, so changing the shape of a level cannot leave this claiming
// a number the board no longer supports.
function perfectClicks() {
    return levelDeck.length * 2;
}

function gradeKey(result) {
    if (result.misses === 0 && result.moves <= perfectClicks()) return 'game.grade.perfect';
    if (result.misses <= 4) return 'game.grade.sharp';
    if (result.misses <= 12) return 'game.grade.steady';
    return 'game.grade.through';
}

function finishLevel() {
    stopStopwatch();
    const result = {
        level: currentLevel.level,
        timeSeconds: elapsedSeconds,
        moves: clicks,
        misses,
        bonus: bonusPairs,
    };

    const c = centerOf(boardWrapEl);
    fxField.spawnBurst(c.x, c.y, {
        count: 90, speed: 320, life: 1.3,
        colors: ['212,166,75', '244,206,122', '255,255,255', '192,67,90'],
    });
    GameAudio.win();
    CardSfx.gather();

    showResultPop(result);

    const session = window.getCurrentSession();
    if (currentLevel.review) {
        // Nothing to save: word_stats already recorded every pair as it was played, and a
        // synthetic board has no level number to claim.
        lastResult = null;
    } else if (session) {
        lastResult = null;
        saveProgress(session, result);
    } else {
        lastResult = result;
        showEl(document.getElementById('pop-login-btn'));
    }
}

let resultNextLevel = null;
function showResultPop(result) {
    document.getElementById('pop-grade').textContent = window.t(gradeKey(result));
    document.getElementById('pop-seal').textContent =
        gradeKey(result) === 'game.grade.perfect' ? '皆' : '合';
    document.getElementById('pop-clicks').textContent = result.moves;
    document.getElementById('pop-misses').textContent = result.misses;
    document.getElementById('pop-bonus').textContent = result.bonus;
    document.getElementById('pop-time').textContent = formatTime(result.timeSeconds);

    const prev = progressCache[result.level];
    document.getElementById('pop-note').textContent = (prev && prev.completed)
        ? window.tf('game.previousBestClicks',
            { moves: prev.best_moves, time: formatTime(prev.best_time_seconds) })
        : window.tf('game.perfectIs', { n: perfectClicks() });

    // Offer the next level rather than a replay of the one just cleared — there is no "next"
    // after the last level, so that case falls back to Play Again.
    resultNextLevel = currentLevel.review
        ? null
        : WORD_LEVELS.find(l => l.level === result.level + 1) || null;
    document.getElementById('pop-next-btn').textContent =
        resultNextLevel ? window.t('game.nextLevel') : window.t('game.playAgain');

    hideEl(document.getElementById('pop-login-btn'));
    document.getElementById('pop-save').classList.add('hidden');
    showEl(document.getElementById('result-modal'));
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
document.getElementById('mem-board').addEventListener('click', onTile);
document.getElementById('mem-start-btn').addEventListener('click', startHand);
document.getElementById('hint-btn').addEventListener('click', useHint);
document.getElementById('board-back-btn').addEventListener('click', backToLevels);
document.getElementById('gate-back-btn').addEventListener('click', backToTiers);

document.getElementById('pop-next-btn').addEventListener('click', () => {
    hideEl(document.getElementById('result-modal'));
    startLevel(resultNextLevel || currentLevel);
});
document.getElementById('pop-levels-btn').addEventListener('click', () => {
    hideEl(document.getElementById('result-modal'));
    backToLevels();
});
document.getElementById('pop-login-btn').addEventListener('click', () => window.openAuthModal());
document.getElementById('result-modal-close').addEventListener('click',
    () => hideEl(document.getElementById('result-modal')));

// Re-laying the board out is only needed when the text has to be re-measured, which the type
// sizing does per tile from the board's own width — so a resize just re-runs that, not a deal.
window.addEventListener('resize', () => {
    if (tiles.length) tiles.forEach(t => sizeTile(t.el, t));
});

// data-i18n only covers text set once at parse time. Everything rendered by JS has to re-run
// its own render on a language switch, or the board keeps the old language until a reload.
document.addEventListener('sitelangchange', () => {
    if (!document.getElementById('level-select-section').classList.contains('hidden')) renderGate();
    if (currentLevel && tiles.length) updateStats();
});

window.onAuthChange(async (session) => {
    await loadProgress();
    if (session && lastResult) {
        await saveProgress(session, lastResult);
        lastResult = null;
        hideEl(document.getElementById('pop-login-btn'));
    }
});

// ---------------------------------------------------------------------------
// Review mode: game.html?review=1
// ---------------------------------------------------------------------------
// A board built from the words this learner has actually missed (word_stats, written by
// word-stats.js) instead of a fixed level. It reuses the whole level machinery by handing
// startLevel a synthetic level object — nothing downstream asks where a set came from.
const REVIEW_MIN_WORDS = MAIN_PAIRS;

function buildWordIndex() {
    const idx = new Map();
    WORD_LEVELS.forEach(l => l.sets.forEach(set => set.forEach(w => {
        if (!idx.has(w.jp)) idx.set(w.jp, w);
    })));
    return idx;
}

async function startReviewRun(session) {
    const now = new Date().toISOString();
    const base = () => sb.from('word_stats').select('word, misses, due_at')
        .eq('user_id', session.user.id).gt('misses', 0);
    const [dueRes, missedRes] = await Promise.all([
        base().lte('due_at', now).order('due_at', { ascending: true }).limit(80),
        base().order('misses', { ascending: false }).limit(80),
    ]);
    if (missedRes.error || !missedRes.data) return false;
    const rows = (dueRes.error ? [] : dueRes.data || []).concat(missedRes.data);
    if (!rows.length) return false;

    const idx = buildWordIndex();
    const words = [];
    const seen = new Set();
    for (const row of rows) {
        const w = idx.get(row.word);
        if (!w || seen.has(w.jp)) continue;
        seen.add(w.jp);
        words.push(w);
        if (words.length >= MAIN_PAIRS * HANDS_PER_LEVEL) break;
    }
    if (words.length < REVIEW_MIN_WORDS) return false;

    startLevel({
        level: 0,
        jlpt: WORD_LEVELS[0].jlpt,   // only used to pick a music pool; a review belongs to no tier
        review: true,
        sets: [words],
    });
    return true;
}

// ---------------------------------------------------------------------------
// Start-up
// ---------------------------------------------------------------------------
renderGate();

// Deep link: game.html?level=3 opens that level's board directly, used by links elsewhere on
// the site. Runs independently of auth so the board appears without waiting on a round trip.
const params = new URLSearchParams(window.location.search);
const requestedLevel = WORD_LEVELS.find(l => l.level === parseInt(params.get('level'), 10));
if (params.get('review') === '1') {
    GameAudio.setLevelTrack(LEVEL_SELECT_TRACK);
    let started = false;
    window.onAuthChange((session) => {
        if (!session || started) return;
        started = true;
        startReviewRun(session);
    });
} else if (requestedLevel) {
    startLevel(requestedLevel);
} else {
    GameAudio.setLevelTrack(LEVEL_SELECT_TRACK);
}

// Opening a level swaps a long gate for a short board and the browser keeps the scroll offset —
// on a phone that leaves you staring at the footer. Any *-section shown from here starts at the
// top. showEl is a function declaration in auth-shared.js, so it is a property of the global
// object and wrapping it catches the bare showEl(...) calls in this file too.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
(function keepSectionSwitchesAtTop() {
    const inner = window.showEl;
    if (typeof inner !== 'function') return;
    window.showEl = function (el) {
        const out = inner.apply(this, arguments);
        if (el && el.id && el.id.slice(-8) === '-section') window.scrollTo(0, 0);
        return out;
    };
})();
