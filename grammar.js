// Grammar Connect — shown a sentence with one grammar point underlined, the player taps the
// tile (out of a ~10-tile bank) that swaps in without changing the sentence's meaning. A
// correct tap morphs the underlined text in place, then the sentence drops into a "cleared"
// side rail (translation + a short explanation revealed there for the first time — nothing
// English-language is ever shown before a sentence is solved) and the next sentence appears.
// Two difficulty tracks (foundation = N5-N3, advanced = N2-N1), 20 levels each, 10 sentences
// per level, mirroring Word Match's timed-match structure: a countdown clock, a time bonus per
// correct answer, a time penalty per mistake instead of Word Match's "pair returns" penalty
// (re-queuing a solved sentence would mean hiding its translation again, which conflicts with
// "revealed once you solve it, permanently" — a flat time cost keeps the same "mistakes cost
// you" spirit without that conflict).
//
// Depends on auth-shared.js (window.supabaseClient, window.getCurrentSession(), the
// global showEl/hideEl helpers it defines) and grammar-data.js (GRAMMAR_POOLS, GRAMMAR_LEVELS)
// having already run.

const sb = window.supabaseClient;

const MATCH_DURATION = 180;          // 3-minute clock, in seconds
const TIME_BONUS_PER_SENTENCE = 15;  // seconds added when a sentence is solved correctly
const TIME_PENALTY_PER_MISTAKE = 10; // seconds removed for a wrong tile tap
const LOW_TIME_THRESHOLD = 30;
const SENTENCES_PER_LEVEL = 10;
const TRACKS = ['foundation', 'advanced'];
const TRACK_LABEL_KEY = { foundation: 'grammar.foundation', advanced: 'grammar.advanced' };
function trackLabel(track) { return window.t(TRACK_LABEL_KEY[track]); }
const TRACK_RANGE = { foundation: 'N5 – N3', advanced: 'N2 – N1' };

// Grammar Connect's tracks span a JLPT *range* (foundation = N5-N3, advanced = N2-N1) rather
// than one tier per track the way Word Match's WORD_LEVELS does, so there's no per-level tier
// tag in grammar-data.js to key music off of. Splitting each 20-level track into thirds (or
// halves) reproduces that same five-tier structure for music purposes only -- it doesn't
// change anything about how levels/tracks are actually played.
const JLPT_TIER_BOUNDARIES = {
    foundation: [{ tier: 'N5', max: 7 }, { tier: 'N4', max: 14 }, { tier: 'N3', max: 20 }],
    advanced: [{ tier: 'N2', max: 10 }, { tier: 'N1', max: 20 }],
};
function levelToJlptTier(track, levelNum) {
    const bounds = JLPT_TIER_BOUNDARIES[track];
    return (bounds.find(b => levelNum <= b.max) || bounds[bounds.length - 1]).tier;
}
// Position within that tier's own level range (0-indexed), so each tier cycles through its
// 3-track music pool starting from track 0 rather than picking up wherever the level number
// happens to land -- e.g. foundation's N4 tier (levels 8-14) starts its own pass at level 8.
function withinTierIndex(track, levelNum) {
    const bounds = JLPT_TIER_BOUNDARIES[track];
    let prevMax = 0;
    for (const b of bounds) {
        if (levelNum <= b.max) return levelNum - prevMax - 1;
        prevMax = b.max;
    }
    return 0;
}

let activeTrack = 'foundation'; // level-select screen: which track's 20 levels are shown
let currentTrack = null;
let currentLevel = null;        // the level object currently being played
let currentSentenceIndex = 0;
let matchStarted = false;
let tileLocked = false;         // guards against double-taps while the correct-answer animation runs
let mistakeCount = 0;
let clearedCount = 0;
let timeRemaining = MATCH_DURATION;
let timerInterval = null;
let startTime = null;
let elapsedSeconds = 0;
let progressCache = {};         // "track:level" -> grammar_progress row
let lastResult = null;          // result earned as a guest, pending save once they log in
let resultPrimaryTarget = null; // { track, levelObj } the result modal's primary button opens

// Background music: real licensed Japanese lofi tracks from Pixabay Music (same source/license
// as Word Match's jazz playlist -- see game.js's GameAudio for the identical reasoning), three
// per JLPT tier plus one ambient track for the level-select screen. Roughly graded lighter/
// cozier for N5 through moodier/nighttime for N1, same gradient idea as Word Match's jazz
// subgenre-per-tier pool. Full attribution in the level-select credits block.
const MUSIC_POOLS = {
    N5: [
        'sound/grammar-music/n5-cozy-vlog-chill.mp3',
        'sound/grammar-music/n5-ancient-garden-zen.mp3',
        'sound/grammar-music/n5-zen-drift.mp3',
    ],
    N4: [
        'sound/grammar-music/n4-japanese-lofi-vlog.mp3',
        'sound/grammar-music/n4-lofimercurius.mp3',
        'sound/grammar-music/n4-lost-train.mp3',
    ],
    N3: [
        'sound/grammar-music/n3-slowburn-relaxing.mp3',
        'sound/grammar-music/n3-japanese-lofi-jazz-piano.mp3',
        'sound/grammar-music/n3-japan-japanese-music.mp3',
    ],
    N2: [
        'sound/grammar-music/n2-asian-lofi-hiphop-04.mp3',
        'sound/grammar-music/n2-asian-lofi-hiphop-08.mp3',
        'sound/grammar-music/n2-asian-lofi-hiphop-10.mp3',
    ],
    N1: [
        'sound/grammar-music/n1-fireflies-in-the-city.mp3',
        'sound/grammar-music/n1-petals-on-the-water.mp3',
        'sound/grammar-music/n1-tokyo-bridge-dream.mp3',
    ],
};
const LEVEL_SELECT_TRACK = 'sound/grammar-music/all-levels-zen-garden-beats.mp3';

// Music-only subset of game.js's GameAudio module (Grammar Connect has no synthesized sound
// effects to carry alongside it, just the background track) -- same fade-in/out-via-plain-
// HTMLAudioElement approach, same reasoning throughout.
const GrammarAudio = (function () {
    let enabled = true;
    let musicEl = null;
    let musicFadeTimer = null;
    const MUSIC_VOLUME = 0.35;

    function ensureMusicEl() {
        if (musicEl) return musicEl;
        musicEl = new Audio();
        musicEl.loop = true;
        musicEl.volume = 0;
        musicEl.preload = 'none';
        return musicEl;
    }

    function fadeMusicTo(target, ms) {
        if (musicFadeTimer) { window.clearInterval(musicFadeTimer); musicFadeTimer = null; }
        const el = ensureMusicEl();
        const start = el.volume;
        const steps = Math.max(1, Math.round(ms / 50));
        let i = 0;
        musicFadeTimer = window.setInterval(() => {
            i++;
            el.volume = start + (target - start) * (i / steps);
            if (i >= steps) {
                el.volume = target;
                window.clearInterval(musicFadeTimer);
                musicFadeTimer = null;
                if (target === 0) el.pause();
            }
        }, 50);
    }

    function setTrack(src) {
        const el = ensureMusicEl();
        const absoluteSrc = new URL(src, window.location.href).href;
        if (el.src === absoluteSrc && !el.paused) return;
        el.src = src;
        el.currentTime = 0;
        if (enabled) {
            el.volume = 0;
            el.play().catch(() => {});
            fadeMusicTo(MUSIC_VOLUME, 900);
        }
    }

    function startAmbient() {
        if (!musicEl || !musicEl.src) return;
        musicEl.play().catch(() => {});
        fadeMusicTo(MUSIC_VOLUME, 900);
    }

    function stopAmbient() {
        if (!musicEl) return;
        fadeMusicTo(0, 400);
    }

    // Same first-gesture retry as GameAudio -- browsers block the level-select track's very
    // first play() call since it fires before any click has happened.
    (function retryOnFirstGesture() {
        const kick = () => {
            if (enabled && musicEl && musicEl.paused && musicEl.src) {
                musicEl.play().catch(() => {});
            }
            document.removeEventListener('pointerdown', kick);
            document.removeEventListener('keydown', kick);
        };
        document.addEventListener('pointerdown', kick, { once: true });
        document.addEventListener('keydown', kick, { once: true });
    })();

    function setEnabled(next) {
        enabled = next;
        if (enabled) startAmbient(); else stopAmbient();
        return enabled;
    }

    return {
        toggle: () => setEnabled(!enabled),
        isEnabled: () => enabled,
        setLevelTrack: setTrack,
    };
})();

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getLevelData(track, levelNum) {
    return (GRAMMAR_LEVELS[track] || []).find(l => l.level === levelNum) || null;
}

// ---------------------------------------------------------------------------
// Level select
// ---------------------------------------------------------------------------
function renderDiffTabs() {
    const container = document.getElementById('gc-diff-tabs');
    container.innerHTML = '';
    TRACKS.forEach(track => {
        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'gc-diff-swatch';
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', String(track === activeTrack));
        if (track === activeTrack) tab.classList.add('active');
        tab.innerHTML = `<span class="dname">${escapeHtml(trackLabel(track))}</span><span class="drange">${TRACK_RANGE[track]} · ${escapeHtml(window.tf('grammar.levelsCount', { n: 20 }))}</span>`;
        tab.addEventListener('click', () => {
            if (activeTrack === track) return;
            activeTrack = track;
            renderDiffTabs();
            renderLevelGrid();
        });
        container.appendChild(tab);
    });
}

function renderLevelGrid() {
    const container = document.getElementById('gc-level-grid');
    container.innerHTML = '';
    for (let levelNum = 1; levelNum <= 20; levelNum++) {
        const levelObj = getLevelData(activeTrack, levelNum);
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'gc-level-card';
        if (!levelObj) card.classList.add('locked');

        const progress = progressCache[`${activeTrack}:${levelNum}`];
        let stamp = '';
        if (progress && progress.completed) stamp = '<span class="lstamp">済</span>';

        card.innerHTML = `
            <span class="lnum">${String(levelNum).padStart(2, '0')}</span>
            <span class="lname">${escapeHtml(levelObj ? window.tf('game.levelN', { n: levelNum }) : window.t('grammar.comingSoon'))}</span>
            ${stamp}
        `;
        if (levelObj) {
            card.addEventListener('click', () => openLevel(activeTrack, levelNum));
        } else {
            card.disabled = true;
        }
        container.appendChild(card);
    }
}

function renderLevelSelect() {
    renderDiffTabs();
    renderLevelGrid();
    const guestHint = document.getElementById('gc-guest-hint');
    if (window.getCurrentSession()) hideEl(guestHint); else showEl(guestHint);
}

// ---------------------------------------------------------------------------
// Match flow
// ---------------------------------------------------------------------------
function openLevel(track, levelNum) {
    const levelObj = getLevelData(track, levelNum);
    if (!levelObj) return;
    currentTrack = track;
    currentLevel = levelObj;
    currentSentenceIndex = 0;
    matchStarted = false;
    tileLocked = false;
    mistakeCount = 0;
    clearedCount = 0;
    timeRemaining = MATCH_DURATION;

    const jlptTier = levelToJlptTier(track, levelNum);
    const musicPool = MUSIC_POOLS[jlptTier];
    GrammarAudio.setLevelTrack(musicPool[withinTierIndex(track, levelNum) % musicPool.length]);

    document.getElementById('gc-cleared-list').innerHTML = `<p class="gc-cleared-empty">${escapeHtml(window.t('grammar.clearedEmptyHint'))}</p>`;
    document.getElementById('gc-level-label').textContent = window.tf('grammar.trackLevel', { track: trackLabel(track), n: levelNum });
    updateTopStats();
    renderTimerDisplay();
    renderSentence(0);

    hideEl(document.getElementById('gc-select-section'));
    showEl(document.getElementById('gc-match-section'));

    document.getElementById('gc-start-modal-title').textContent = window.tf('grammar.trackLevel', { track: trackLabel(track), n: levelNum });
    showEl(document.getElementById('gc-start-modal'));
}

function backToLevels() {
    stopTimer();
    hideEl(document.getElementById('gc-match-section'));
    showEl(document.getElementById('gc-select-section'));
    GrammarAudio.setLevelTrack(LEVEL_SELECT_TRACK);
    renderLevelSelect();
}

function startTimer() {
    stopTimer();
    startTime = Date.now();
    timerInterval = window.setInterval(tick, 1000);
}

function stopTimer() {
    if (timerInterval) { window.clearInterval(timerInterval); timerInterval = null; }
}

function tick() {
    elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    timeRemaining -= 1;
    if (timeRemaining <= 0) {
        timeRemaining = 0;
        renderTimerDisplay();
        timeUp();
        return;
    }
    renderTimerDisplay();
}

function renderTimerDisplay() {
    const el = document.getElementById('gc-timer');
    el.textContent = formatTime(timeRemaining);
    el.closest('.gc-stat-timer').classList.toggle('low-time', timeRemaining <= LOW_TIME_THRESHOLD);
}

function updateTopStats() {
    document.getElementById('gc-cleared-count').textContent = `${clearedCount}/${SENTENCES_PER_LEVEL}`;
    document.getElementById('gc-mistake-count').textContent = mistakeCount;
}

function renderProgressDots() {
    const wrap = document.getElementById('gc-progress-dots');
    wrap.innerHTML = '';
    for (let i = 0; i < SENTENCES_PER_LEVEL; i++) {
        const span = document.createElement('span');
        if (i < currentSentenceIndex) span.className = 'done';
        else if (i === currentSentenceIndex) span.className = 'now';
        wrap.appendChild(span);
    }
}

function renderSentence(index) {
    const s = currentLevel.sentences[index];
    document.getElementById('gc-sentence-jp').innerHTML =
        s.prefix + `<span class="gc-old-grammar" id="gc-old-grammar">${s.old}</span>` + s.suffix;
    document.getElementById('gc-tile-hint').textContent = window.t('grammar.tileHint');
    renderProgressDots();
    renderTileBank(s);
}

function buildTileOptions(s) {
    const pool = GRAMMAR_POOLS[currentTrack];
    const exclude = new Set([s.new, s.newCore, s.old, s.oldCore].filter(Boolean));
    const filtered = pool.filter(g => !exclude.has(g));
    const distractors = shuffleArray(filtered).slice(0, 9);
    return shuffleArray([s.new, ...distractors]);
}

function renderTileBank(s) {
    const bank = document.getElementById('gc-tile-bank');
    bank.innerHTML = '';
    tileLocked = false;
    buildTileOptions(s).forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gc-tile';
        // innerHTML, not textContent: GRAMMAR_POOLS distractors are always plain kana (safe either
        // way), but a sentence's own `new` answer can be a full kanji phrase with <ruby> furigana
        // markup (e.g. 断罪することなくして...) that needs to render, not show as literal tags.
        btn.innerHTML = opt;
        btn.addEventListener('click', () => onTileClick(btn, opt, s));
        bank.appendChild(btn);
    });
}

function onTileClick(btn, opt, s) {
    if (tileLocked) return;
    if (opt === s.new) {
        tileLocked = true;
        btn.classList.add('gc-tile-correct');
        document.querySelectorAll('#gc-tile-bank .gc-tile').forEach(t => {
            if (t !== btn) t.classList.add('gc-tile-disabled');
        });

        const og = document.getElementById('gc-old-grammar');
        og.classList.add('swapping');
        window.setTimeout(() => { og.innerHTML = s.new; }, 180);

        clearedCount++;
        timeRemaining += TIME_BONUS_PER_SENTENCE;
        renderTimerDisplay();
        updateTopStats();
        addClearedItem(s);

        window.setTimeout(() => advanceSentence(), 900);
    } else {
        mistakeCount++;
        timeRemaining = Math.max(0, timeRemaining - TIME_PENALTY_PER_MISTAKE);
        renderTimerDisplay();
        updateTopStats();

        btn.classList.add('gc-tile-wrong');
        window.setTimeout(() => {
            btn.classList.remove('gc-tile-wrong');
            btn.classList.add('gc-tile-disabled');
        }, 350);

        if (timeRemaining <= 0) window.setTimeout(() => timeUp(), 400);
    }
}

function addClearedItem(s) {
    const list = document.getElementById('gc-cleared-list');
    const empty = list.querySelector('.gc-cleared-empty');
    if (empty) empty.remove();
    const item = document.createElement('div');
    item.className = 'gc-cleared-item';
    const translationText = (window.siteLang() === 'mn' && s.translationMn) ? s.translationMn : s.translation;
    const explanationText = (window.siteLang() === 'mn' && s.explanationMn) ? s.explanationMn : s.explanation;
    item.innerHTML = `
        <div class="swap-line"><span class="old">${s.old}</span><span class="arrow">&rarr;</span><span class="new">${s.new}</span></div>
        <p class="en">&ldquo;${escapeHtml(translationText)}&rdquo;</p>
        <p class="why">${escapeHtml(explanationText)}</p>
    `;
    list.appendChild(item);
    list.scrollTop = list.scrollHeight;
}

function advanceSentence() {
    currentSentenceIndex++;
    if (currentSentenceIndex >= currentLevel.sentences.length) {
        finishLevel();
    } else {
        renderSentence(currentSentenceIndex);
    }
}

function finishLevel() {
    stopTimer();
    const result = { track: currentTrack, level: currentLevel.level, timeSeconds: elapsedSeconds, mistakes: mistakeCount };
    showResultModal(result, true);

    const session = window.getCurrentSession();
    if (session) {
        lastResult = null;
        saveProgress(session, result);
    } else {
        lastResult = result;
        showEl(document.getElementById('gc-result-login-btn'));
    }
}

function timeUp() {
    stopTimer();
    const result = { track: currentTrack, level: currentLevel.level, timeSeconds: elapsedSeconds, mistakes: mistakeCount };
    showResultModal(result, false);
}

// won=true: cleared all 10 sentences. won=false: the clock ran out first -- an honest failure
// state. No progress is ever saved on a timeout, matching Word Match's rule that best_time/
// best_mistakes are only meaningful for an actual clear.
function showResultModal(result, won) {
    document.getElementById('gc-result-title').textContent = won ? window.t('game.levelComplete') : window.t('game.timesUp');
    document.getElementById('gc-result-time').textContent = formatTime(result.timeSeconds);
    document.getElementById('gc-result-mistakes').textContent = result.mistakes;

    const prevBest = progressCache[`${result.track}:${result.level}`];
    if (won) {
        document.getElementById('gc-result-best').textContent = (prevBest && prevBest.completed)
            ? window.tf('grammar.previousBestMistakes', { time: formatTime(prevBest.best_time_seconds), mistakes: prevBest.best_mistakes })
            : window.t('game.firstClear');
    } else {
        document.getElementById('gc-result-best').textContent =
            window.tf('grammar.clearedBeforeTimeOut', { n: clearedCount, total: SENTENCES_PER_LEVEL });
    }

    const nextLevelObj = won ? getLevelData(result.track, result.level + 1) : null;
    resultPrimaryTarget = nextLevelObj ? { track: result.track, levelObj: nextLevelObj } : null;
    document.getElementById('gc-result-replay-btn').textContent = resultPrimaryTarget ? window.t('game.nextLevel') : window.t('game.playAgain');

    hideEl(document.getElementById('gc-result-login-btn'));
    hideEl(document.getElementById('gc-result-save-status'));
    showEl(document.getElementById('gc-result-modal'));
}

// ---------------------------------------------------------------------------
// Progress: load on auth change, save on level completion
// ---------------------------------------------------------------------------
async function loadProgress() {
    const session = window.getCurrentSession();
    progressCache = {};
    if (session) {
        const { data, error } = await sb.from('grammar_progress').select('*').eq('user_id', session.user.id);
        if (!error && data) {
            data.forEach(row => { progressCache[`${row.track}:${row.level}`] = row; });
        }
    }
    renderLevelSelect();
}

async function saveProgress(session, result) {
    const statusEl = document.getElementById('gc-result-save-status');
    const key = `${result.track}:${result.level}`;
    const existing = progressCache[key];
    const isBetter = !existing || !existing.completed || result.timeSeconds < existing.best_time_seconds;

    const row = {
        user_id: session.user.id,
        track: result.track,
        level: result.level,
        completed: true,
        best_time_seconds: isBetter ? result.timeSeconds : existing.best_time_seconds,
        best_mistakes: isBetter ? result.mistakes : existing.best_mistakes,
        updated_at: new Date().toISOString(),
    };

    const { error } = await sb.from('grammar_progress').upsert(row, { onConflict: 'user_id,track,level' });
    if (!error) {
        progressCache[key] = row;
        statusEl.textContent = isBetter ? window.t('game.newBestSaved') : window.t('game.resultSaved');
        showEl(statusEl);
    }
}

// ---------------------------------------------------------------------------
// Decorative star field over the night-sky photo's upper (mostly-empty) region
// ---------------------------------------------------------------------------
(function renderStars() {
    const wrap = document.getElementById('gc-stars');
    for (let i = 0; i < 40; i++) {
        const s = document.createElement('span');
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 30 + '%';
        s.style.opacity = (0.15 + Math.random() * 0.6).toFixed(2);
        wrap.appendChild(s);
    }
})();

// Photo & music credits for this page live on credits.html (#grammar-connect-photos /
// #grammar-connect-music), linked from every page's footer -- no longer rendered in-page here.

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
// See game.js's identical comment: data-i18n only covers text set once at parse time, so a
// language switch needs these re-run to refresh JS-rendered dynamic text immediately.
document.addEventListener('sitelangchange', () => {
    if (!document.getElementById('gc-select-section').classList.contains('hidden')) renderLevelSelect();
});

document.getElementById('gc-back-btn').addEventListener('click', backToLevels);

function syncSoundButtons(on) {
    [
        [document.getElementById('gc-sound-toggle'), document.getElementById('gc-sound-icon')],
        [document.getElementById('gc-board-sound-toggle'), document.getElementById('gc-board-sound-icon')],
    ].forEach(([btn, icon]) => {
        btn.classList.toggle('on', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.title = on ? window.t('grammar.soundOff') : window.t('grammar.soundOn');
        icon.textContent = on ? '\u{1F50A}' : '\u{1F507}';
    });
}
document.getElementById('gc-sound-toggle').addEventListener('click', () => syncSoundButtons(GrammarAudio.toggle()));
document.getElementById('gc-board-sound-toggle').addEventListener('click', () => syncSoundButtons(GrammarAudio.toggle()));

document.getElementById('gc-start-modal-btn').addEventListener('click', () => {
    hideEl(document.getElementById('gc-start-modal'));
    matchStarted = true;
    startTimer();
});
document.getElementById('gc-start-modal-back-btn').addEventListener('click', () => {
    hideEl(document.getElementById('gc-start-modal'));
    backToLevels();
});

document.getElementById('gc-result-modal-close').addEventListener('click', () => hideEl(document.getElementById('gc-result-modal')));
document.getElementById('gc-result-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hideEl(document.getElementById('gc-result-modal'));
});
document.getElementById('gc-result-replay-btn').addEventListener('click', () => {
    hideEl(document.getElementById('gc-result-modal'));
    if (resultPrimaryTarget) {
        openLevel(resultPrimaryTarget.track, resultPrimaryTarget.levelObj.level);
    } else {
        openLevel(currentTrack, currentLevel.level);
    }
});
document.getElementById('gc-result-levels-btn').addEventListener('click', () => {
    hideEl(document.getElementById('gc-result-modal'));
    backToLevels();
});
document.getElementById('gc-result-login-btn').addEventListener('click', () => window.openAuthModal());

window.onAuthChange(async (session) => {
    await loadProgress();
    if (session && lastResult) {
        await saveProgress(session, lastResult);
        lastResult = null;
        hideEl(document.getElementById('gc-result-login-btn'));
    }
});

// Deep link support: grammar.html?track=foundation / ?track=advanced pre-selects that track's
// tab on the level-select screen.
const requestedTrack = new URLSearchParams(window.location.search).get('track');
if (requestedTrack === 'foundation' || requestedTrack === 'advanced') {
    activeTrack = requestedTrack;
}
GrammarAudio.setLevelTrack(LEVEL_SELECT_TRACK); // level-select screen's own ambient track
