// Japanese Word Match — click a Japanese-word tile and its English-meaning tile to clear a
// pair, laid out as an interlocking honeycomb of hexagon tiles. A second move is also valid:
// click any two Japanese-word tiles whose representative kanji share a phonetic component
// ("lightning connect") to chain-clear every tile on the board belonging to that phonetic
// family in one go. Consecutive clears build a combo streak; every 3rd clear is a bigger,
// score-multiplying "tier hit".
//
// Depends on auth-shared.js (window.supabaseClient, window.getCurrentSession(), the
// 'wp:authchange' event, and the global showEl/hideEl helpers it defines) and game-words.js
// (WORD_LEVELS, each word annotated with `phonetic`/`phoneticReading` from the Kanjium data
// also used by the Phonetics Family page) having already run.

// Word Match is split across game-core.js, game-fx.js, game-board.js, game-play.js,
// game-wakan.js and game.js, loaded in that order by game.html. They are classic scripts
// sharing one global scope, so each can read and assign the others’ top-level `let`s and
// call their functions. The one rule is load order: code that runs while a file is loading
// may only use what an EARLIER file defined. Listeners and requestAnimationFrame callbacks run
// later, so they are free to reach forward.
// This file: level select, saving progress, results, wiring, review mode, and start-up.

// ---------------------------------------------------------------------------
// Level select <-> board screens
// ---------------------------------------------------------------------------
// level.title (from game-words.js) is English-only, e.g. "N5 · Level 1" — built here from
// i18n instead, the same way grammar.js/reading.js build their level titles, rather than
// reading the raw data-file field directly.
// Derived from the data rather than hardcoded: the tier size changed from 10 to 12 when
// the September 2026 expansion added two levels per tier, and a literal here is exactly the
// kind of thing that silently mislabels every level above the first tier.
function levelsPerTier() {
    return WORD_LEVELS.filter(l => l.jlpt === WORD_LEVELS[0].jlpt).length;
}

function levelTitle(level) {
    if (level.review) return window.t('game.reviewTitle');
    const withinTier = ((level.level - 1) % levelsPerTier()) + 1;
    return `${level.jlpt} · ${window.tf('game.levelN', { n: withinTier })}`;
}

// The card title. Each level now holds one topic, so the card names the topic instead of its
// number -- "Food & the kitchen" tells you what you are about to practise in a way "Level 3"
// cannot. Tiers still being themed fall back to the number.
//
// The tier is not repeated here: on a card it is already on the badge, inside a grid filtered to
// that tier, so "N5 · Level 1" under an "N5" chip says it three times. The board label and the
// start modal keep the long numbered form, where you are no longer inside a filtered grid.
function levelCardTitle(level) {
    if (level.review) return window.t('game.reviewTitle');
    if (level.themeKey) return window.t(level.themeKey);
    const withinTier = ((level.level - 1) % levelsPerTier()) + 1;
    return window.tf('game.levelN', { n: withinTier });
}

// The number still has to be visible somewhere on a themed card, so the grid stays countable and
// a learner can say which level they are on.
function levelCardNumber(level) {
    if (level.review) return '';
    return String(((level.level - 1) % levelsPerTier()) + 1).padStart(2, '0');
}

function startLevel(level) {
    currentLevel = level;
    // so "back to levels" lands on the tier just played -- a review run belongs to no tier, so
    // it leaves the tab where the learner last had it
    if (!level.review) activeJlptTab = level.jlpt;
    matchStarted = false;
    matchedCount = 0;
    moves = 0;
    selected = [];
    locked = false;
    score = 0;
    streak = 0;
    lastPowerupStreak = 0;
    powerupCharges = 0;
    updatePowerupUI();
    mismatchStreak = 0;
    elapsedSeconds = 0;
    bonusSeconds = 0;
    killFlyer(); // discard any in-progress winged-tile event from the level just left
    flyerFiredThisLevel = false;
    familiesFound.clear(); // fresh-level reset, not shuffleRemaining() -- that keeps the round
    // Levels hold up to 25 words but only LEVEL_PAIR_COUNT (20) go into play per round -- the
    // rest become powerupFuel (see pickWordSet). A handful of levels are still short of 25
    // (mid-expansion data), so this floors at whatever the data actually has.
    totalPairs = Math.min(LEVEL_PAIR_COUNT, level.sets[0].length);
    matchDuration = MATCH_DURATION_SECONDS;
    timeRemaining = matchDuration;
    stopTimer();

    // A review board has no level number to cycle from, and (0 - 1) % n is -1 in JavaScript,
    // not n-1 -- which indexed past the start of both this array and the music pool below and
    // asked the server for a file literally named "undefined".
    const cycleIndex = level.review ? 0 : level.level - 1;
    const bgImage = BOARD_BG_IMAGES[cycleIndex % BOARD_BG_IMAGES.length];
    gameMain.style.setProperty('--board-bg-image', `url(${bgImage})`);

    // Music pool is per JLPT tier (N4/N5 share one); cycle by position WITHIN that tier
    // (0-based within the tier), not the global level number, so N4 and N5 each start their own pass through the
    // shared lofi pool from track 0 rather than picking up wherever the other tier left off.
    const musicPool = MUSIC_POOLS[level.jlpt];
    const withinTierIndex = cycleIndex % levelsPerTier();
    GameAudio.setLevelTrack(musicPool[withinTierIndex % musicPool.length]);

    renderBoard();
    resetExamplePanel();
    renderFamiliesFound();

    document.getElementById('score-value').textContent = '0';
    chainCombo = 0;
    updateChainCombo(false);
    document.getElementById('streak-fill').style.width = '0%';
    renderTimer();
    document.getElementById('board-level-label').textContent = levelTitle(level);
    updateStats();

    hideEl(document.getElementById('level-select-section'));
    showEl(document.getElementById('board-section'));
    // Full-screen "playing" mode: hides the shared site header and lets .game-main break out
    // of .container's max-width, so the board fills the whole viewport instead of sitting in
    // a boxed page column — only while a board is actually up, not on level-select.
    document.body.classList.add('game-playing');
    resizeCanvases();

    document.getElementById('start-modal-title').textContent = levelTitle(level);
    showEl(document.getElementById('start-modal'));
}

function backToLevels() {
    stopTimer();
    hideEl(document.getElementById('board-section'));
    showEl(document.getElementById('level-select-section'));
    document.body.classList.remove('game-playing');
    GameAudio.setLevelTrack(LEVEL_SELECT_TRACK);
    renderLevelSelect();
    resizeCanvases();
}

const JLPT_TABS = ['N5', 'N4', 'N3', 'N2', 'N1'];

function renderJlptTabs() {
    const container = document.getElementById('jlpt-tabs');
    container.innerHTML = '';
    JLPT_TABS.forEach(jlpt => {
        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'jlpt-tab';
        tab.dataset.level = jlpt;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', String(jlpt === activeJlptTab));
        tab.textContent = jlpt;
        if (jlpt === activeJlptTab) tab.classList.add('active');
        tab.addEventListener('click', () => {
            if (activeJlptTab === jlpt) return;
            activeJlptTab = jlpt;
            renderJlptTabs();
            renderLevelGrid();
        });
        container.appendChild(tab);
    });
}

function renderLevelGrid() {
    const container = document.getElementById('level-grid');
    container.innerHTML = '';

    WORD_LEVELS.filter(level => level.jlpt === activeJlptTab).forEach(level => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'level-card';
        card.dataset.level = level.jlpt;

        // Best time and moves as two labelled figures rather than one sentence. The rail is
        // always drawn, showing an em dash where there is no result yet: a played card used to
        // be taller than an unplayed one, which left a half-finished tier with a ragged grid.
        const progress = progressCache[level.level];
        const done = !!(progress && progress.completed);
        const timeText = done ? formatTime(progress.best_time_seconds) : '&mdash;';
        const movesText = done ? String(progress.best_moves) : '&mdash;';
        const emptyClass = done ? '' : ' is-empty';

        card.innerHTML = `
            <span class="level-card-top">
                <span class="level-badge">${escapeHtml(level.jlpt)}</span>
                <span class="level-num">${escapeHtml(levelCardNumber(level))}</span>
                ${done ? `<span class="level-done" title="${escapeHtml(window.t('game.completed'))}">&#10003;</span>` : ''}
            </span>
            <h2>${escapeHtml(levelCardTitle(level))}</h2>
            <div class="level-rail">
                <span class="level-stat">
                    <span class="level-stat-k">${escapeHtml(window.t('stat.bestTime'))}</span>
                    <span class="level-stat-v${emptyClass}">${timeText}</span>
                </span>
                <span class="level-stat">
                    <span class="level-stat-k">${escapeHtml(window.t('stat.moves'))}</span>
                    <span class="level-stat-v${emptyClass}">${movesText}</span>
                </span>
            </div>
        `;
        card.addEventListener('click', () => startLevel(level));
        container.appendChild(card);
    });
}

function renderLevelSelect() {
    renderJlptTabs();
    renderLevelGrid();

    const guestHint = document.getElementById('game-guest-hint');
    if (window.getCurrentSession()) hideEl(guestHint); else showEl(guestHint);
}

// ---------------------------------------------------------------------------
// Progress: load on auth change, save on level completion
// ---------------------------------------------------------------------------
async function loadProgress() {
    const session = window.getCurrentSession();
    progressCache = {};
    if (session) {
        const [progressRes, missedRes] = await Promise.all([
            sb.from('game_progress').select('*').eq('user_id', session.user.id),
            sb.from('word_stats').select('word').eq('user_id', session.user.id)
                .eq('source', 'game').gt('misses', 0).limit(400),
        ]);
        if (!progressRes.error && progressRes.data) {
            progressRes.data.forEach(row => { progressCache[row.level] = row; });
        }
        missedWords = new Set((!missedRes.error && missedRes.data ? missedRes.data : []).map(r => r.word));
    } else {
        missedWords = new Set();
    }
    renderLevelSelect();
}

async function saveProgress(session, result) {
    const statusEl = document.getElementById('result-save-status');
    const existing = progressCache[result.level];
    const isBetter = !existing || !existing.completed ||
        result.timeSeconds < existing.best_time_seconds ||
        (result.timeSeconds === existing.best_time_seconds && result.moves < existing.best_moves);

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
    showEl(statusEl);
}

function finishLevel() {
    stopTimer();
    matchStarted = false;
    const result = { level: currentLevel.level, timeSeconds: elapsedSeconds, moves };

    const c = centerOf(boardWrapEl);
    fxField.spawnBurst(c.x, c.y, { count: 90, speed: 320, life: 1.3, colors: ['212,166,75', '244,206,122', '255,255,255', '192,67,90'] });
    GameAudio.win();

    showResultModal(result, true);

    const session = window.getCurrentSession();
    if (currentLevel && currentLevel.review) {
        // Nothing to save: word_stats already recorded every pair as it was played, and there is
        // no level number for a synthetic board to claim.
        lastResult = null;
    } else if (session) {
        lastResult = null;
        saveProgress(session, result);
    } else {
        lastResult = result;
        showEl(document.getElementById('result-login-btn'));
    }
}

// won=true: cleared the level (existing behaviour). won=false: the 5-minute clock ran out --
// an honest failure state, not just a quieter version of winning. No progress is ever saved
// for a timeout since best_time_seconds/best_moves are only meaningful for an actual clear.
let resultPrimaryTarget = null; // level object the result modal's primary button should open;
                                 // null means "replay the level just played" (result-replay-btn's
                                 // click handler falls back to currentLevel in that case)
function showResultModal(result, won) {
    document.getElementById('result-title').textContent = won ? window.t('game.levelComplete') : window.t('game.timesUp');
    document.getElementById('result-time').textContent = formatTime(result.timeSeconds);
    document.getElementById('result-moves').textContent = result.moves;

    const prevBest = progressCache[result.level];
    if (won) {
        document.getElementById('result-best').textContent = (prevBest && prevBest.completed)
            ? window.tf('game.previousBest', { time: formatTime(prevBest.best_time_seconds), moves: prevBest.best_moves })
            : window.t('game.firstClear');
    } else {
        document.getElementById('result-best').textContent =
            window.tf('game.matchedBeforeTimeOut', { n: matchedCount, total: totalPairs });
    }

    // On a win, offer the next level in sequence instead of replaying the one just cleared --
    // there's no "next" after the last level, so that case falls back to Play Again.
    resultPrimaryTarget = won ? WORD_LEVELS.find(l => l.level === result.level + 1) || null : null;
    document.getElementById('result-replay-btn').textContent = resultPrimaryTarget ? window.t('game.nextLevel') : window.t('game.playAgain');

    hideEl(document.getElementById('result-login-btn'));
    hideEl(document.getElementById('result-save-status'));
    showEl(document.getElementById('result-modal'));
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
// i18n.js's data-i18n attributes only cover text set once at parse time -- these are
// re-rendered by JS on every state change, so a language switch mid-game needs to re-run the
// same render functions to pick up the new strings immediately, not just on next page load.
document.addEventListener('sitelangchange', () => {
    if (currentLevel) updateStats();
    if (!document.getElementById('level-select-section').classList.contains('hidden')) renderLevelGrid();
});

document.getElementById('board-back-btn').addEventListener('click', backToLevels);
document.getElementById('board-shuffle-btn').addEventListener('click', shuffleRemaining);

document.getElementById('start-modal-btn').addEventListener('click', () => {
    hideEl(document.getElementById('start-modal'));
    matchStarted = true;
    startTimer();
});
document.getElementById('start-modal-back-btn').addEventListener('click', () => {
    hideEl(document.getElementById('start-modal'));
    backToLevels();
});

document.getElementById('result-modal-close').addEventListener('click', () => hideEl(document.getElementById('result-modal')));
document.getElementById('result-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hideEl(document.getElementById('result-modal'));
});
document.getElementById('result-replay-btn').addEventListener('click', () => {
    hideEl(document.getElementById('result-modal'));
    startLevel(resultPrimaryTarget || currentLevel);
});
document.getElementById('result-levels-btn').addEventListener('click', () => {
    hideEl(document.getElementById('result-modal'));
    backToLevels();
});
document.getElementById('result-login-btn').addEventListener('click', () => window.openAuthModal());

window.onAuthChange(async (session) => {
    await loadProgress();
    if (session && lastResult) {
        await saveProgress(session, lastResult);
        lastResult = null;
        hideEl(document.getElementById('result-login-btn'));
    }
});

// ---------------------------------------------------------------------------
// Review mode: game.html?review=1
// ---------------------------------------------------------------------------
// Builds a board out of the words this learner has actually missed (word_stats, written by
// word-stats.js) instead of a fixed level. It reuses the entire level machinery by handing
// startLevel a synthetic level object -- the engine never asks where a set came from.
//
// Only words that exist in WORD_LEVELS can be used, since a board needs a meaning tile to pair
// against: a grammar point or a skipped reading word has no such partner. Those still count on
// the dashboard, they just cannot be played here.
const REVIEW_MIN_WORDS = 4;

function buildWordIndex() {
    const idx = new Map();
    WORD_LEVELS.forEach(l => l.sets.forEach(set => set.forEach(w => {
        if (!idx.has(w.jp)) idx.set(w.jp, w);
    })));
    return idx;
}

// Due words first: record_word_attempt schedules every word on a Leitner ladder and stores when it
// is next due (see progress-shared.js), and the dashboard's "N words due" promises exactly those --
// so they lead, most overdue first. If fewer than a board's worth are due, the board is topped up
// with the most-missed words, which is what review mode did before due dates were read at all, so
// a review still has something to play on a day with nothing due.
async function startReviewRun(session) {
    const now = new Date().toISOString();
    const base = () => window.supabaseClient.from('word_stats').select('word, misses, due_at')
        .eq('user_id', session.user.id).gt('misses', 0);
    const [dueRes, missedRes] = await Promise.all([
        base().lte('due_at', now).order('due_at', { ascending: true }).limit(80),
        base().order('misses', { ascending: false }).limit(80),
    ]);
    if (missedRes.error || !missedRes.data) return false;
    const data = (dueRes.error ? [] : dueRes.data || []).concat(missedRes.data);
    if (!data.length) return false;

    const idx = buildWordIndex();
    const words = [];
    const seen = new Set();
    for (const row of data) {
        const w = idx.get(row.word);
        if (!w || seen.has(w.jp)) continue;
        seen.add(w.jp);
        words.push(w);
        if (words.length >= LEVEL_PAIR_COUNT) break;
    }
    if (words.length < REVIEW_MIN_WORDS) return false;

    startLevel({
        level: 0,
        jlpt: WORD_LEVELS[0].jlpt,   // only used for tile colouring; a review belongs to no tier
        review: true,
        title: window.t('game.reviewTitle'),
        sets: [words],
    });
    return true;
}

// Deep link support: game.html?level=3 jumps straight into that level's board instead of
// showing the level-select screen first — used by the header dropdown's per-level links.
// Runs independently of auth/progress loading so the board appears immediately.
const params = new URLSearchParams(window.location.search);
const requestedLevelNum = parseInt(params.get('level'), 10);
const requestedLevel = WORD_LEVELS.find(l => l.level === requestedLevelNum);
if (params.get('review') === '1') {
    // Needs a session and a round trip, so the level-select screen stays up until the board is
    // ready. If there is nothing to review, the learner simply lands on the level select.
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
    GameAudio.setLevelTrack(LEVEL_SELECT_TRACK); // level-select screen's own ambient track
}
