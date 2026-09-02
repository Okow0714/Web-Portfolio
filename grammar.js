// Grammar Connect — shown a sentence with one grammar point underlined, the player taps the
// tile (out of a 5-tile bank) that swaps in without changing the sentence's meaning. A
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
const TIME_BONUS_PER_SENTENCE = 30;  // seconds added when a sentence is solved correctly
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
// subgenre-per-tier pool. Full attribution on credits.html (#grammar-connect-music).
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
// Effects — a small canvas particle field plus floating text, scoped to #gc-match-section
// (see .gc-fx-canvas/.gc-fx-text-layer in grammar.css). Mirrors the shape of Word Match's own
// particle system (game.js's ParticleField -- rings/bursts/sparkles/dust) since that's a proven
// pattern for "each event gets its own readable silhouette, not just a different color," but
// this is its own smaller, independent copy rather than a shared import: Grammar Connect only
// ever needs two event families (a correct tap, a wrong tap), not Word Match's whole roster
// (lightning chains, powerups, a Wakan blast), so reusing the bigger engine as-is would carry
// a lot of unused surface area for what this page actually does.
function GcParticleField(canvas, container) {
    this.canvas = canvas;
    this.container = container;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.rings = [];
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();
}

GcParticleField.prototype.resize = function () {
    const rect = this.container.getBoundingClientRect();
    this.w = Math.max(rect.width, 1);
    this.h = Math.max(rect.height, 1);
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
};

// A correct tap's "hanko stamp" -- an expanding ring echoing the page's own "ink on dyed
// cloth" identity (see grammar.css's header comment), distinct from Word Match's plain gold
// ripple by being square-ish/stamped rather than a perfect circle when opts.shape is 'stamp'.
GcParticleField.prototype.spawnRing = function (x, y, opts) {
    opts = opts || {};
    this.rings.push({
        x, y,
        shape: opts.shape || 'circle',
        r0: opts.r0 != null ? opts.r0 : 6,
        r1: opts.r1 != null ? opts.r1 : 70,
        width: opts.width || 3,
        color: opts.color || '127,191,158',
        life: opts.life || 0.5,
        age: 0,
    });
};

GcParticleField.prototype.spawnBurst = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 20;
    const colors = opts.colors || ['127,191,158'];
    const speed = opts.speed || 160;
    const life = opts.life || 0.8;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const v = speed * (0.35 + Math.random() * 0.75);
        this.particles.push({
            kind: 'burst',
            x, y,
            vx: Math.cos(angle) * v,
            vy: Math.sin(angle) * v - 40,
            gravity: 380,
            r: 1.4 + Math.random() * 2.4,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: life * (0.7 + Math.random() * 0.6),
            age: 0,
        });
    }
};

// Four-point glints (a star/spark silhouette) for the underlined text's own "the answer just
// landed" moment -- distinct from the round tap-point burst above.
GcParticleField.prototype.spawnSparkle = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 10;
    const spread = opts.spread || 40;
    const size = opts.size || 9;
    const color = opts.color || '236,229,211';
    const life = opts.life || 0.6;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * spread;
        this.particles.push({
            kind: 'sparkle',
            x: x + Math.cos(angle) * dist,
            y: y + Math.sin(angle) * dist,
            rot: Math.random() * Math.PI,
            spin: (Math.random() - 0.5) * 5,
            size: size * (0.6 + Math.random() * 0.8),
            color,
            life: life * (0.75 + Math.random() * 0.5),
            age: 0,
        });
    }
};

// Heavier motes falling mostly downward -- the wrong-tap family's signature (a setback reads
// as things falling, not popping), recolored to embers/ash instead of Word Match's dust.
GcParticleField.prototype.spawnDust = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 12;
    const colors = opts.colors || ['188,68,48'];
    const spread = opts.spread || 26;
    const speed = opts.speed || 50;
    const life = opts.life || 0.6;
    for (let i = 0; i < count; i++) {
        const angle = Math.PI * 0.5 + (Math.random() - 0.5) * 1.4;
        const v = speed * (0.4 + Math.random() * 0.9);
        this.particles.push({
            kind: 'burst',
            x: x + (Math.random() - 0.5) * spread,
            y,
            vx: Math.cos(angle) * v * 0.4,
            vy: Math.sin(angle) * v,
            gravity: 200,
            r: 1.6 + Math.random() * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: life * (0.7 + Math.random() * 0.5),
            age: 0,
        });
    }
};

GcParticleField.prototype.update = function (dt) {
    const next = [];
    for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.age += dt;
        if (p.age >= p.life) continue;
        if (p.kind !== 'sparkle') {
            p.vy += p.gravity * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
        }
        next.push(p);
    }
    this.particles = next;
    this.rings = this.rings.filter(r => { r.age += dt; return r.age < r.life; });
};

GcParticleField.prototype.draw = function () {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    this.particles.forEach(p => {
        const t = p.age / p.life;
        const alpha = Math.max(1 - t, 0);
        if (p.kind === 'sparkle') {
            const scale = Math.sin(Math.min(t * 3, 1) * Math.PI / 2) * (1 - t * 0.25);
            const s = p.size;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot + p.spin * p.age);
            ctx.scale(scale, scale);
            ctx.fillStyle = `rgba(${p.color},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(0, -s); ctx.lineTo(s * 0.28, -s * 0.28); ctx.lineTo(s, 0); ctx.lineTo(s * 0.28, s * 0.28);
            ctx.lineTo(0, s); ctx.lineTo(-s * 0.28, s * 0.28); ctx.lineTo(-s, 0); ctx.lineTo(-s * 0.28, -s * 0.28);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            return;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${alpha})`;
        ctx.arc(p.x, p.y, Math.max(p.r * (1 - t * 0.4), 0), 0, Math.PI * 2);
        ctx.fill();
    });
    this.rings.forEach(r => {
        const t = r.age / r.life;
        const rad = r.r0 + (r.r1 - r.r0) * t;
        const alpha = Math.max(1 - t, 0);
        ctx.save();
        ctx.strokeStyle = `rgba(${r.color},${alpha})`;
        ctx.lineWidth = r.width;
        ctx.shadowColor = `rgba(${r.color},${Math.min(alpha + 0.3, 1)})`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        if (r.shape === 'stamp') {
            // A slightly squared-off ring, like a hanko seal's rounded-square outline, instead
            // of a perfect circle -- the correct-answer family's own silhouette.
            const k = rad * 0.78;
            ctx.moveTo(r.x - k, r.y - rad);
            ctx.quadraticCurveTo(r.x + rad, r.y - rad, r.x + rad, r.y - k);
            ctx.quadraticCurveTo(r.x + rad, r.y + rad, r.x + k, r.y + rad);
            ctx.quadraticCurveTo(r.x - rad, r.y + rad, r.x - rad, r.y + k);
            ctx.quadraticCurveTo(r.x - rad, r.y - rad, r.x - k, r.y - rad);
            ctx.closePath();
        } else {
            ctx.arc(r.x, r.y, Math.max(rad, 0), 0, Math.PI * 2);
        }
        ctx.stroke();
        ctx.restore();
    });
};

const gcMatchSection = document.getElementById('gc-match-section');
const gcFxTextLayer = document.getElementById('gc-fx-text-layer');
const gcFx = new GcParticleField(document.getElementById('gc-fx-canvas'), gcMatchSection);

function gcResizeCanvas() { gcFx.resize(); }
window.addEventListener('resize', gcResizeCanvas);
if (window.ResizeObserver) new ResizeObserver(() => gcResizeCanvas()).observe(gcMatchSection);

let gcLastFrameT = performance.now();
function gcFxLoop(t) {
    const dt = Math.min((t - gcLastFrameT) / 1000, 0.05);
    gcLastFrameT = t;
    gcFx.update(dt);
    gcFx.draw();
    requestAnimationFrame(gcFxLoop);
}
requestAnimationFrame(gcFxLoop);

function gcCenterOf(el) {
    const r = el.getBoundingClientRect();
    const sectionRect = gcMatchSection.getBoundingClientRect();
    return { x: r.left + r.width / 2 - sectionRect.left, y: r.top + r.height / 2 - sectionRect.top };
}

function gcFloatText(x, y, text, penalty) {
    const el = document.createElement('div');
    el.className = 'gc-float-text' + (penalty ? ' penalty' : '');
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.textContent = text;
    gcFxTextLayer.appendChild(el);
    window.setTimeout(() => el.remove(), 1150);
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
    const distractors = shuffleArray(filtered).slice(0, 4);
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

        // Hanko-stamp ring right at the tapped tile -- "your answer just got stamped approved" --
        // then, once the underlined text actually morphs, a sparkle burst there too, so the
        // effect visibly travels from where you tapped to where the sentence actually changed.
        const tileC = gcCenterOf(btn);
        gcFx.spawnRing(tileC.x, tileC.y, { shape: 'stamp', r0: 4, r1: 46, width: 3, color: '127,191,158', life: 0.45 });
        gcFloatText(tileC.x, tileC.y - 20, '+' + TIME_BONUS_PER_SENTENCE + 's');

        const og = document.getElementById('gc-old-grammar');
        og.classList.add('swapping');
        window.setTimeout(() => {
            og.innerHTML = s.new;
            const wordC = gcCenterOf(og);
            gcFx.spawnSparkle(wordC.x, wordC.y, { count: 12, color: '236,229,211', size: 10, spread: 36, life: 0.6 });
        }, 180);

        clearedCount++;
        timeRemaining += TIME_BONUS_PER_SENTENCE;
        renderTimerDisplay();
        updateTopStats();
        addClearedItem(s);

        // The level's last sentence gets a bigger multi-color finale burst on top of its
        // ordinary stamp+sparkle, timed to actually be visible during the 900ms pause below --
        // finishLevel() itself shows the result modal immediately, which would cover the match
        // section before a burst spawned there ever got to play.
        if (currentSentenceIndex >= currentLevel.sentences.length - 1) {
            const cardC = gcCenterOf(document.querySelector('.gc-sentence-card'));
            gcFx.spawnBurst(cardC.x, cardC.y, { count: 50, speed: 240, life: 1.1, colors: ['127,191,158', '224,112,90', '236,229,211'] });
        }

        window.setTimeout(() => advanceSentence(), 900);
    } else {
        mistakeCount++;
        timeRemaining = Math.max(0, timeRemaining - TIME_PENALTY_PER_MISTAKE);
        renderTimerDisplay();
        updateTopStats();

        // Embers falling from the tapped tile -- the wrong-tap family's own signature, distinct
        // from the correct tap's upward stamp+sparkle by falling instead of rising.
        const tileC = gcCenterOf(btn);
        gcFx.spawnDust(tileC.x, tileC.y - 10, { count: 12, colors: ['188,68,48', '150,66,58'], spread: 28, speed: 55, life: 0.6 });
        gcFloatText(tileC.x, tileC.y - 20, '-' + TIME_PENALTY_PER_MISTAKE + 's', true);

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
