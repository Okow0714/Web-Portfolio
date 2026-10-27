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

const MATCH_DURATION = 120;          // 2-minute clock, in seconds
const TIME_BONUS_PER_SENTENCE = 10;  // seconds added when a sentence is solved correctly
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

// The level select is four bands of ten, not two tracks of twenty and not the five JLPT levels
// this was first drawn as. Both of those were checked against the content and failed:
//
//   * Banding by what each level actually drills is wildly lopsided -- N5 would hold ONE level
//     and N4 fourteen, against N3 7, N2 10, N1 8. (226 grammar points classified against standard
//     JLPT lists, 500 of 521 slots; the other 21 are paraphrase fragments, not grammar points.)
//   * The levels are not ordered by difficulty inside a track, so no contiguous cut can mean what
//     it claims. Advanced runs N2 N2 N1 N2 N2 N1 N1 N3 N2 N3 N2 N1 N1 N2 N2 N2 N1 N1 N2 N1 --
//     level 3 is harder than level 19 and level 8 drops to N3.
//
// Halving each track gives four bands of ten that are equal AND whose dominant level climbs:
//   foundation 1-10   N4 57%, N5 22%     foundation 11-20  N4 46%, N2 31%
//   advanced 1-10     N2 39%, N1 33%     advanced 11-20    N1 57%, N2 36%
//
// `note` therefore says what a band is MOSTLY. No band is purely one JLPT level and saying
// otherwise would be the overreach this replaced. `track`/`from` keep the real level underneath,
// so progress keys never move.
// Each band used to carry a `trail` as well -- a walk through a triangular lattice that laid its
// ten tiles out as a chain joined along shared sides. The tiles sit in a plain row now, so those
// walks, the corner matching that verified them and the SVG they were drawn on are all gone.
// `hue` is the band's JLPT colour -- the level its note names, drawn from the same --jlpt-*
// hues Word Match's gate uses. It only has to name the class; grammar.css owns the values,
// because a custom-property name cannot be built out of a variable.
const BANDS = [
    { key: '1', name: 'grammar.band1', note: 'grammar.band1n', track: 'foundation', from: 1,  hue: 'n4' },
    { key: '2', name: 'grammar.band2', note: 'grammar.band2n', track: 'foundation', from: 11, hue: 'n3' },
    { key: '3', name: 'grammar.band3', note: 'grammar.band3n', track: 'advanced',   from: 1,  hue: 'n2' },
    { key: '4', name: 'grammar.band4', note: 'grammar.band4n', track: 'advanced',   from: 11, hue: 'n1' },
];
const BAND_SIZE = 10;

// ---------------------------------------------------------------------------
// "Cleared with no mistakes"
// ---------------------------------------------------------------------------
// Kept here as well as in grammar_progress.flawless so a signed-out player still sees the mark,
// and so it survives migration 012 not having been applied. Only ever SET -- a later sloppy
// replay never takes it away, which is the whole reason it is not derived from best_mistakes
// (saveProgress keeps whichever run was faster, not whichever was cleanest).
const GC_FLAWLESS_KEY = 'khanjp-gc-flawless';
let gcFlawless = {};
try { gcFlawless = JSON.parse(localStorage.getItem(GC_FLAWLESS_KEY) || '{}') || {}; }
catch (e) { gcFlawless = {}; }

// Which levels this DEVICE has cleared. Completion used to live only in grammar_progress, so a
// signed-out player's tiles were all blank and neither mark could ever appear for them -- the
// flawless flag alone would have been a mark with nothing to sit on. This is read-only comfort:
// the account's rows still win where both exist, and nothing here is sent anywhere.
const GC_CLEARED_KEY = 'khanjp-gc-cleared';
let gcCleared = {};
try { gcCleared = JSON.parse(localStorage.getItem(GC_CLEARED_KEY) || '{}') || {}; }
catch (e) { gcCleared = {}; }

function rememberCleared(track, levelNum) {
    gcCleared[`${track}:${levelNum}`] = true;
    try { localStorage.setItem(GC_CLEARED_KEY, JSON.stringify(gcCleared)); } catch (e) {}
}

function isFlawless(track, levelNum) {
    return !!gcFlawless[`${track}:${levelNum}`];
}
function rememberFlawless(track, levelNum) {
    gcFlawless[`${track}:${levelNum}`] = true;
    try { localStorage.setItem(GC_FLAWLESS_KEY, JSON.stringify(gcFlawless)); } catch (e) {}
}
// Set false by a failed upsert, and then never tried again this session.
let gcFlawlessColumn = true;
let activeBand = 0;          // which of the four is open
let focusedLevel = null;     // the real 1-20 level whose record the side panel shows

// Which band a real (track, level) belongs to -- used by the ?track= deep link and after a win.
function bandOf(track, levelNum) {
    for (let i = 0; i < BANDS.length; i++) {
        const b = BANDS[i];
        if (b.track === track && levelNum >= b.from && levelNum < b.from + BAND_SIZE) return i;
    }
    return 0;
}
function bandLabel(i) { return window.t(BANDS[i].name); }
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
    // 0 muted … 3 full, shared with Word Match through khanjp-volume.
    const VOLUME_STEPS = [0, 0.30, 0.60, 1];
    const VOLUME_KEY = 'khanjp-volume';
    function storedLevel() {
        try {
            const v = parseInt(localStorage.getItem(VOLUME_KEY), 10);
            return (v >= 0 && v <= 3) ? v : 3;
        } catch (e) { return 3; }
    }
    let level = storedLevel();
    let enabled = level > 0;
    let musicEl = null;
    let musicFadeTimer = null;
    const MUSIC_VOLUME = 0.35;   // ceiling at level 3
    function musicTarget() { return MUSIC_VOLUME * VOLUME_STEPS[level]; }

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
            fadeMusicTo(musicTarget(), 900);
        }
    }

    function startAmbient() {
        if (!musicEl || !musicEl.src) return;
        musicEl.play().catch(() => {});
        fadeMusicTo(musicTarget(), 900);
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

    function setLevel(next) {
        level = Math.max(0, Math.min(VOLUME_STEPS.length - 1, next | 0));
        enabled = level > 0;
        try { localStorage.setItem(VOLUME_KEY, String(level)); } catch (e) { /* private mode */ }
        if (enabled) startAmbient(); else stopAmbient();   // startAmbient re-fades to the new target
        return level;
    }
    function cycleLevel() { return setLevel(level <= 0 ? VOLUME_STEPS.length - 1 : level - 1); }
    function setEnabled(next) {
        setLevel(next ? (level || VOLUME_STEPS.length - 1) : 0);
        return enabled;
    }

    return {
        toggle: () => setEnabled(!enabled),
        isEnabled: () => enabled,
        setLevel: setLevel,
        cycleLevel: cycleLevel,
        getLevel: () => level,
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
// THE GATE: one equilateral triangle halved on each side, which leaves exactly four of half the
// side -- three standing in the corners and one inverted between them, each sharing a whole edge
// with its neighbours. No rotation: the corner pieces are the same up-triangle the trail below is
// built from and the middle one the same down-triangle, so the gate and the field are cut from one
// shape. The apex is the last band, so it reads as a climb.
// It keeps the id #gc-diff-tabs because tutorial.js points a tour step at it.
const GATE_S = 300;
const GATE_SH = Math.round(GATE_S * Math.sqrt(3) / 2);
// The slots -- [left, top, inverted] -- are computed per render from the gate's actual width:
// bottom row reads 1 2 3 left to right, 4 sits at the apex. GATE_S is only the cap.

// How much of the window is left below an element's top edge. The level select is meant to fit
// a screen, so the gate and the trail are sized from what is actually free rather than from a
// constant -- the same measurement phonetics.html's field makes.
function roomBelow(el, floor) {
    // Measured from the ROW's top, never from the element being sized: an element's own top moves
    // the moment the row wraps, and sizing from it is a feedback loop that settles on the wrong
    // answer. The row's top is fixed by the content above it.
    const row = el.closest ? el.closest('.gc-select-row') : null;
    const top = (row || el).getBoundingClientRect().top;
    return Math.max(floor || 180, window.innerHeight - top - 26);
}

// What the record panel will not go below, matching .gc-level-record's flex-basis.
const RECORD_MIN = 250;

function renderDiffTabs() {
    const container = document.getElementById('gc-diff-tabs');
    container.innerHTML = '';
    // Sized to the room it has, not to a constant: at 390px a fixed 330 leaves nothing either
    // side, and the page clips rather than scrolls, so anything past the edge is simply gone.
    // Height matters as much as width now that the gate shares a row with the trail.
    const avail = (container.parentElement && container.parentElement.clientWidth) || GATE_S;
    const byH = roomBelow(container, 180) / (Math.sqrt(3) / 2);
    const S = Math.max(190, Math.min(GATE_S, avail - 4, byH));
    const SH = Math.round(S * Math.sqrt(3) / 2);
    const SLOT = [[0, SH / 2, false], [S / 4, SH / 2, true], [S / 2, SH / 2, false], [S / 4, 0, false]];
    container.style.width = S + 'px';
    container.style.height = SH + 'px';

    BANDS.forEach((band, i) => {
        const slot = SLOT[i];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gc-gate-tri gc-band-' + band.hue
            + (slot[2] ? ' is-inverted' : '') + (i === activeBand ? ' active' : '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', String(i === activeBand));
        btn.style.left = slot[0] + 'px';
        btn.style.top = slot[1] + 'px';
        btn.style.width = (S / 2) + 'px';
        btn.style.height = (SH / 2) + 'px';
        btn.setAttribute('aria-label', bandLabel(i) + ', '
            + window.tf('grammar.levelsCount', { n: BAND_SIZE }) + ', ' + window.t(band.note));
        btn.innerHTML = `<span class="gt-lab"><span class="gt-n">${escapeHtml(band.key)}</span>`
            + `<span class="gt-name">${escapeHtml(bandLabel(i))}</span>`
            + `<span class="gt-note">${escapeHtml(window.t(band.note))}</span></span>`;
        btn.addEventListener('click', () => {
            if (activeBand === i) return;
            activeBand = i;
            activeTrack = band.track;
            focusedLevel = band.from;
            renderLevelSelect();
        });
        container.appendChild(btn);
    });
}

// The two marks. Filled outlines rather than stroked lines, which is what lets a stroke
// thicken at the root and run dry at the tip the way a loaded brush does -- a stroke-width is
// uniform by definition and cannot. Each is outlined in the PAGE colour so it reads both on the
// tile it starts from and on the ground it grows onto.
// The art is written ONCE and worn twice: large on the tile, small inside the tooltip that
// compares the two states. Two copies of these paths would drift the moment one is redrawn.
const SPROUT_ART =
    '<g><path d="M25 54 C 29 48, 33 42, 38 34 C 36 43, 31 49, 27 56 Z"></path>'
    + '<path d="M0 0 C -5 -5.5, -12.5 -5.5, -16 1 C -10.5 5.5, -3 5, 0 0 Z" transform="translate(29,43) rotate(-14)"></path>'
    + '<path d="M0 0 C 5 -5.5, 12.5 -5.5, 16 1 C 10.5 5.5, 3 5, 0 0 Z" transform="translate(35,35) rotate(12)"></path>'
    + '</g>';

const BLOOM_ART =
    '<g><path d="M22 52 C 28 45, 34 37, 41 27 C 38 38, 31 46, 24 54 Z"></path>'
    + '<path d="M34 37 C 36 33, 39 31, 43 31 C 40 34, 37 36, 35 39 Z"></path>'
    + '<circle cx="46" cy="13.4" r="4.7"></circle><circle cx="52.3" cy="17.9" r="4.7"></circle>'
    + '<circle cx="49.9" cy="25.3" r="4.7"></circle><circle cx="42.1" cy="25.3" r="4.7"></circle>'
    + '<circle cx="39.7" cy="17.9" r="4.7"></circle><circle cx="36.6" cy="30.2" r="3.4"></circle>'
    + '</g><circle class="gc-mark-eye" cx="46" cy="20" r="2.4"></circle>';

function markSvg(kind, cls) {
    return '<svg class="' + cls + '" viewBox="0 0 64 64" aria-hidden="true">'
        + (kind === 'bloom' ? BLOOM_ART : SPROUT_ART) + '</svg>';
}

// The tooltip is a two-step indicator, not a sentence: the sprout and the flower side by side,
// with the one you have marked and the one you do not left plain. A drawing of the next state
// says "this is what you would get" without a line of prose having to explain the mechanic.
function markTip(bloomed) {
    const step = (kind, label, got) =>
        '<span class="gc-tip-step' + (got ? ' is-got' : '') + '">'
        + markSvg(kind, 'gc-tipmark gc-tipmark-' + kind)
        + '<span class="gc-tip-label">' + escapeHtml(label) + '</span></span>';
    return step('sprout', window.t('grammar.cleared'), true)
        + '<span class="gc-tip-arrow" aria-hidden="true">&rsaquo;</span>'
        + step('bloom', window.t('grammar.markFlawless'), bloomed);
}

// THE LEVELS: the band's ten, all facing right like a play button and sitting next to each other
// in a row that wraps. Their size is CSS's business, not this function's.
function renderLevelGrid() {
    const container = document.getElementById('gc-level-grid');
    container.innerHTML = '';
    const band = BANDS[activeBand];

    // A plain row. The tiles all face right, sit next to each other and wrap, so there is no
    // path to walk, no shared edges to match and nothing to position: the flex container does
    // the layout and CSS owns the size. The lattice this replaces needed all three.
    for (let k = 0; k < BAND_SIZE; k++) {
        const levelNum = band.from + k;
        const levelObj = getLevelData(band.track, levelNum);
        const progress = progressCache[`${band.track}:${levelNum}`];
        const done = !!(progress && progress.completed);

        const bloomed = done && isFlawless(band.track, levelNum);

        // A wrapper, because the mark grows PAST the tile's top-right edge and a clip-path
        // clips its own descendants -- the 済 stamp it replaces could live inside the button,
        // this cannot. The wrapper is the flex item and carries the tile's size.
        const slot = document.createElement('div');
        slot.className = 'gc-tri-slot';

        const tile = document.createElement('button');
        tile.type = 'button';
        // The label is the level's place in its own band; the real 1-20 level stays in the data
        // attribute and in openLevel, or band 2's "01" would start foundation level 1.
        const shown = String(k + 1).padStart(2, '0');
        tile.className = 'gc-tri gc-band-' + band.hue
            + (done ? ' done' : '') + (levelObj ? '' : ' locked');
        tile.dataset.level = String(levelNum);
        const state = bloomed ? window.t('grammar.clearedFlawless')
            : done ? window.t('grammar.cleared') : '';
        tile.setAttribute('aria-label', (state ? state + ', ' : '')
            + window.tf('grammar.bandLevel', { band: bandLabel(activeBand), n: k + 1 }));
        tile.innerHTML = `<span class="gc-tri-n">${shown}</span>`;

        if (levelObj) {
            tile.addEventListener('click', () => {
                if (focusedLevel === levelNum) { openLevel(band.track, levelNum); return; }
                focusedLevel = levelNum;
                renderLevelGrid();
                renderLevelRecord();
            });
        } else {
            tile.disabled = true;
        }
        if (levelNum === focusedLevel) tile.classList.add('focus');
        slot.appendChild(tile);
        // aria-hidden: the tile's own label already says which state it is in, so the drawing
        // would only repeat it.
        if (done) {
            slot.insertAdjacentHTML('beforeend',
                markSvg(bloomed ? 'bloom' : 'sprout', 'gc-mark gc-mark-' + (bloomed ? 'bloom' : 'sprout')));
            // aria-hidden: the tile's own label already names its state, and this only draws it.
            const tip = document.createElement('span');
            tip.className = 'gc-mark-tip';
            tip.setAttribute('aria-hidden', 'true');
            tip.innerHTML = markTip(bloomed);
            slot.appendChild(tip);
        }
        container.appendChild(slot);
    }
}

function renderLevelRecord() {
    const host = document.getElementById('gc-level-record');
    if (!host) return;
    const band = BANDS[activeBand];
    if (focusedLevel === null) focusedLevel = band.from;
    const k = focusedLevel - band.from;
    const progress = progressCache[`${band.track}:${focusedLevel}`];
    const done = !!(progress && progress.completed);
    const dash = '&mdash;';
    host.innerHTML = `
        <p class="gc-rec-band">${escapeHtml(bandLabel(activeBand))} &middot; ${escapeHtml(window.t(band.note))}</p>
        <p class="gc-rec-head"><span class="gc-rec-n">${String(k + 1).padStart(2, '0')}</span>
            <span class="gc-rec-of">${escapeHtml(window.tf('grammar.levelsCount', { n: BAND_SIZE }))}</span></p>
        <div class="gc-rec-stats">
            <span class="gc-rec-stat"><span class="k">${escapeHtml(window.t('stat.bestTime'))}</span>
                <span class="v">${done && progress.best_time_seconds != null ? formatTime(progress.best_time_seconds) : dash}</span></span>
            <span class="gc-rec-stat"><span class="k">${escapeHtml(window.t('stat.mistakes'))}</span>
                <span class="v">${done && progress.best_mistakes != null ? String(progress.best_mistakes) : dash}</span></span>
        </div>
        <p class="gc-rec-note">${escapeHtml(window.t(done ? 'grammar.recDone' : 'grammar.recNew'))}</p>
    `;
    const cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'auth-btn gc-rec-cta';
    cta.textContent = window.t('game.startMatch');
    cta.addEventListener('click', () => openLevel(band.track, focusedLevel));
    host.appendChild(cta);
}

function renderLevelSelect() {
    if (focusedLevel === null
        || bandOf(BANDS[activeBand].track, focusedLevel) !== activeBand) {
        focusedLevel = BANDS[activeBand].from;
    }
    renderDiffTabs();
    renderLevelGrid();
    renderLevelRecord();
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
    document.getElementById('gc-level-label').textContent = window.tf('grammar.bandLevel',
        { band: bandLabel(bandOf(track, levelNum)), n: levelNum - BANDS[bandOf(track, levelNum)].from + 1 });
    updateTopStats();
    renderTimerDisplay();
    renderSentence(0);

    hideEl(document.getElementById('gc-select-section'));
    showEl(document.getElementById('gc-match-section'));

    document.getElementById('gc-start-modal-title').textContent = window.tf('grammar.bandLevel',
        { band: bandLabel(bandOf(track, levelNum)), n: levelNum - BANDS[bandOf(track, levelNum)].from + 1 });
    showEl(document.getElementById('gc-start-modal'));
}

// ---------------------------------------------------------------------------
// Weak-point review: grammar.html?review=1
//
// Builds a level out of the grammar points this learner actually gets wrong, instead of a fixed
// one. word_stats files every Grammar Connect attempt under the sentence's `newCore` -- the grammar
// point it teaches -- so one row covers every sentence drilling that point (ざるをえない is 13 of
// them), which is what makes "the points you miss" a meaningful list rather than a pile of
// individual sentences. Due words lead, then the most-missed, the same order Word Match's review
// uses; one sentence per point first, so a ten-sentence review covers ten weaknesses rather than
// ten sentences of the same one.
const GRAMMAR_REVIEW_MIN = 4;

function sentencesByCore() {
    const byCore = new Map();
    TRACKS.forEach(track => (GRAMMAR_LEVELS[track] || []).forEach(lv => lv.sentences.forEach(s => {
        if (!s.newCore) return;
        if (!byCore.has(s.newCore)) byCore.set(s.newCore, []);
        byCore.get(s.newCore).push(s);
    })));
    return byCore;
}

async function startGrammarReview(session) {
    const now = new Date().toISOString();
    const base = () => sb.from('word_stats').select('word, misses, due_at')
        .eq('user_id', session.user.id).eq('source', 'grammar').gt('misses', 0);
    const [dueRes, missedRes] = await Promise.all([
        base().lte('due_at', now).order('due_at', { ascending: true }).limit(40),
        base().order('misses', { ascending: false }).limit(40),
    ]);
    if (missedRes.error || !missedRes.data) return false;

    const byCore = sentencesByCore();
    const cores = [];
    for (const row of (dueRes.error ? [] : dueRes.data || []).concat(missedRes.data)) {
        if (!cores.includes(row.word) && byCore.has(row.word)) cores.push(row.word);
    }
    if (!cores.length) return false;

    // one per point first, then round again to fill the level
    const picked = [];
    const used = new Set();
    for (let pass = 0; picked.length < SENTENCES_PER_LEVEL && pass < 4; pass++) {
        for (const core of cores) {
            if (picked.length >= SENTENCES_PER_LEVEL) break;
            const next = byCore.get(core).find(s => !used.has(s));
            if (next) { used.add(next); picked.push(next); }
        }
    }
    if (picked.length < GRAMMAR_REVIEW_MIN) return false;

    openReviewLevel(shuffleArray(picked));
    return true;
}

// Mirrors openLevel for a level that exists only in memory. currentLevel.review is what keeps it
// out of grammar_progress: that table's level column is constrained to 1-20 and a review belongs to
// no level, so finishing one shows the result without recording a completion.
function openReviewLevel(sentences) {
    currentTrack = 'advanced';          // tile colouring only; a review belongs to no track
    currentLevel = { level: 0, review: true, sentences };
    currentSentenceIndex = 0;
    matchStarted = false;
    tileLocked = false;
    mistakeCount = 0;
    clearedCount = 0;
    timeRemaining = MATCH_DURATION;

    GrammarAudio.setLevelTrack(LEVEL_SELECT_TRACK);
    document.getElementById('gc-cleared-list').innerHTML = `<p class="gc-cleared-empty">${escapeHtml(window.t('grammar.clearedEmptyHint'))}</p>`;
    document.getElementById('gc-level-label').textContent = window.t('grammar.reviewTitle');
    updateTopStats();
    renderTimerDisplay();
    renderSentence(0);

    hideEl(document.getElementById('gc-select-section'));
    showEl(document.getElementById('gc-match-section'));
    document.getElementById('gc-start-modal-title').textContent = window.t('grammar.reviewTitle');
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

// Distractors used to come from GRAMMAR_POOLS -- bare grammar points like そう and から. But 55%
// of the answers are inflected surface forms carrying kanji (話せます, 吸わないでください), and not one
// of the 132 pool entries has a kanji in it. That made the answer the only tile that could even
// grammatically follow the sentence: on 日本語を[話すことができます]。you were choosing between 話せます
// and そう/よう/みたい/らしい, so picking the one with a kanji won without reading the question.
//
// Distractors are drawn from other sentences' surface forms instead, so every tile is a phrase of
// the same kind, and scored to match the answer's shape. GRAMMAR_POOLS is left in grammar-data.js
// as the top-up when a track runs short, and because it is the right source if the tiles are ever
// flipped to bare grammar points.
const SURFACE_FORMS = {};
const KANJI_RE = /[一-龯]/;

// Rendered length, ignoring the furigana markup: <ruby>話<rt>はな</rt></ruby>せます is 3 characters
// on screen, not 30.
function plainLength(text) {
    return text.replace(/<rp>.*?<\/rp>/g, '').replace(/<rt>.*?<\/rt>/g, '').replace(/<[^>]*>/g, '').length;
}

function buildSurfaceIndex() {
    Object.keys(GRAMMAR_LEVELS).forEach(track => {
        const seen = new Set();
        SURFACE_FORMS[track] = [];
        GRAMMAR_LEVELS[track].forEach(lv => lv.sentences.forEach(sn => {
            // `old` counts too: it is the phrase the sentence is being changed *from*, so it is
            // just as real a surface form as the answer.
            [[sn.new, sn.newCore], [sn.old, sn.oldCore]].forEach(([text, core]) => {
                if (!text || seen.has(text)) return;
                seen.add(text);
                SURFACE_FORMS[track].push({ text, core: core || null, kanji: KANJI_RE.test(text), len: plainLength(text) });
            });
        }));
    });
}
buildSurfaceIndex();

function buildTileOptions(s) {
    const exclude = new Set([s.new, s.newCore, s.old, s.oldCore].filter(Boolean));
    // A distractor expressing the same grammar point as the answer is not a wrong answer, it is
    // an unfair one, so same-core candidates are dropped rather than scored down.
    const sameCore = new Set([s.newCore, s.oldCore].filter(Boolean));
    const wantKanji = KANJI_RE.test(s.new);
    const wantLen = plainLength(s.new);

    const candidates = (SURFACE_FORMS[currentTrack] || []).filter(c =>
        !exclude.has(c.text) && !(c.core && sameCore.has(c.core)));

    // Shape first, then similar length, plus enough noise that a sentence does not always show
    // the same three tiles.
    const distractors = candidates
        .map(c => ({ text: c.text, score: (c.kanji === wantKanji ? 3 : 0) - Math.abs(c.len - wantLen) * 0.25 + Math.random() * 1.5 }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(c => c.text);

    // Top up from the bare pool only if a track somehow cannot field three, so a question never
    // renders with fewer tiles than the player expects.
    if (distractors.length < 3) {
        const spare = shuffleArray(GRAMMAR_POOLS[currentTrack].filter(g => !exclude.has(g) && !distractors.includes(g)));
        distractors.push(...spare.slice(0, 3 - distractors.length));
    }
    return shuffleArray([s.new, ...distractors]);
}

function renderTileBank(s) {
    const bank = document.getElementById('gc-tile-bank');
    bank.innerHTML = '';
    tileLocked = false;
    buildTileOptions(s).forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gc-tile';
        // innerHTML, not textContent: GRAMMAR_POOLS distractors are always plain kana (safe either
        // way), but a sentence's own `new` answer can be a full kanji phrase with <ruby> furigana
        // markup (e.g. 断罪することなくして...) that needs to render, not show as literal tags.
        // The A-E key is aria-hidden so the button's accessible name stays the answer alone --
        // it is a position marker for the eye, not part of what is being chosen.
        btn.innerHTML = '<span class="gc-tile-key" aria-hidden="true">'
            + String.fromCharCode(65 + i) + '</span><span class="gc-tile-text">' + opt + '</span>';
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

        if (window.recordWordAttempt) {
            window.recordWordAttempt({ source: 'grammar', word: s.newCore || s.new, correct: true });
        }
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
        // The grammar point is the item being learned; the tile tapped is what it was confused
        // with. Cores where they exist, since 「そう」 is a more useful thing to count than
        // 「降るそうです」.
        if (window.recordWordAttempt) {
            window.recordWordAttempt({ source: 'grammar', word: s.newCore || s.new, correct: false, confusedWith: opt });
        }
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
    // The translation is a BUTTON, not a <p>: pressing it opens the explanation, so it has to
    // be reachable by keyboard and say whether it is open. The explanation starts hidden -- it
    // is the reason behind an answer you have already got right, which is worth reading when
    // you choose to rather than every time.
    item.innerHTML = `
        <div class="swap-line"><span class="old">${s.old}</span><span class="arrow">&rarr;</span><span class="new">${s.new}</span></div>
        <button class="en" type="button" aria-expanded="false">&ldquo;${escapeHtml(translationText)}&rdquo;</button>
        <p class="why" hidden>${escapeHtml(explanationText)}</p>
    `;
    const toggle = item.querySelector('.en');
    const why = item.querySelector('.why');
    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        why.hidden = open;
    });
    // Newest first: prepend and scroll back to the top, or the row just added sits off-screen
    // under everything that came before it.
    list.prepend(item);
    list.scrollTop = 0;
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
    // Only on a real finish -- running the clock out takes the other path and earns nothing.
    rememberCleared(currentTrack, currentLevel.level);
    if (mistakeCount === 0) rememberFlawless(currentTrack, currentLevel.level);
    showResultModal(result, true);

    // A review is not a level: grammar_progress.level is constrained to 1-20, and there is no
    // completion to record. The attempts themselves were already filed by word-stats.js, which is
    // what moves each point along its review schedule.
    if (currentLevel.review) return;

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
            data.forEach(row => {
                progressCache[`${row.track}:${row.level}`] = row;
                // A union, never a subtraction: the account can only ever ADD a mark to this
                // device, exactly as user_settings does with the tours.
                if (row.flawless) rememberFlawless(row.track, row.level);
                if (row.completed) rememberCleared(row.track, row.level);
            });
        }
    }

    // Then this device's own clears, for any level the account did not already answer for --
    // which is every level when nobody is signed in. A local row carries NO TIMES, and the
    // record panel has to answer for that: `done` alone used to be enough to print the stats,
    // which rendered a literal "null" under Mistakes and 00:00 under Best time. Both cells now
    // fall back to the dash, which is the honest reading of "cleared, nothing recorded".
    Object.keys(gcCleared).forEach(key => {
        if (progressCache[key]) return;
        const [track, lvl] = key.split(':');
        progressCache[key] = { track: track, level: Number(lvl), completed: true,
                               best_time_seconds: null, best_mistakes: null, local: true };
    });

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

    // Only ever true. `||` not `=`, so a sloppy replay cannot clear a mark already earned.
    if (gcFlawlessColumn) row.flawless = isFlawless(result.track, result.level);

    let { error } = await sb.from('grammar_progress').upsert(row, { onConflict: 'user_id,track,level' });
    if (error && gcFlawlessColumn && /flawless|column/i.test(error.message || '')) {
        // Migration 012 has not been applied to this project. An upsert naming a column
        // PostgREST does not know fails the WHOLE row, so a cosmetic flower would otherwise
        // take the player's level progress with it. Drop it, retry, stop trying this session --
        // the mark still lives in localStorage.
        gcFlawlessColumn = false;
        delete row.flawless;
        ({ error } = await sb.from('grammar_progress').upsert(row, { onConflict: 'user_id,track,level' }));
    }
    if (!error) {
        progressCache[key] = row;
        statusEl.textContent = isBetter ? window.t('game.newBestSaved') : window.t('game.resultSaved');
        showEl(statusEl);
    }
}

// (The decorative star field and the moon were removed with the night-sky photograph they sat
// over. They were drawn elements rather than images, so nothing about them showed up in a check
// for photo requests -- the moon in particular read as a sun behind the volume toggle.)

// Music credits for this page live on credits.html (#grammar-connect-music), linked from every
// page's footer -- no longer rendered in-page here. The background photographs, and their credit
// section, were removed on 2026-10-24 when the page's ground became a plain wash.

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
// See game.js's identical comment: data-i18n only covers text set once at parse time, so a
// language switch needs these re-run to refresh JS-rendered dynamic text immediately.
document.addEventListener('sitelangchange', () => {
    if (!document.getElementById('gc-select-section').classList.contains('hidden')) renderLevelSelect();
});

// The gate and the trail are sized from the window, so they have to be re-sized when it changes.
// Only while the level select is actually up: re-rendering it mid-match would be wasted work, and
// rotating a phone during a match must not disturb the board.
let gcSelectResize = null;
window.addEventListener('resize', () => {
    if (document.getElementById('gc-select-section').classList.contains('hidden')) return;
    window.clearTimeout(gcSelectResize);
    gcSelectResize = window.setTimeout(renderLevelSelect, 120);
});

document.getElementById('gc-back-btn').addEventListener('click', backToLevels);

const GC_VOL_LABELS = ['grammar.volMute', 'grammar.volLow', 'grammar.volMedium', 'grammar.volFull'];
function syncSoundButtons(level) {
    [
        document.getElementById('gc-sound-toggle'),
        document.getElementById('gc-board-sound-toggle'),
    ].forEach((btn) => {
        if (!btn) return;
        btn.dataset.vol = String(level);
        btn.classList.toggle('on', level > 0);
        const label = window.t(GC_VOL_LABELS[level]);
        btn.title = label;
        btn.setAttribute('aria-label', label);
    });
}
document.getElementById('gc-sound-toggle').addEventListener('click', () => syncSoundButtons(GrammarAudio.cycleLevel()));
document.getElementById('gc-board-sound-toggle').addEventListener('click', () => syncSoundButtons(GrammarAudio.cycleLevel()));
syncSoundButtons(GrammarAudio.getLevel());

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
    if (currentLevel && currentLevel.review) {
        const session = window.getCurrentSession();
        if (session) startGrammarReview(session); else backToLevels();
    } else if (resultPrimaryTarget) {
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
const gcParams = new URLSearchParams(window.location.search);
const requestedTrack = gcParams.get('track');
if (requestedTrack === 'foundation' || requestedTrack === 'advanced') {
    activeTrack = requestedTrack;
    // A track is now two bands; the link lands on the first of them.
    activeBand = bandOf(requestedTrack, 1);
    focusedLevel = BANDS[activeBand].from;
}
// grammar.html?review=1 -- needs a session and a round trip, so the level select stays up until the
// board is ready; with nothing to review the learner simply lands on the level select.
if (gcParams.get('review') === '1') {
    let started = false;
    window.onAuthChange((session) => {
        if (!session || started) return;
        started = true;
        startGrammarReview(session);
    });
}
GrammarAudio.setLevelTrack(LEVEL_SELECT_TRACK); // level-select screen's own ambient track

// Opening a level swaps a long level list for a short board, and the browser keeps the scroll
// offset -- on a phone that leaves you staring at the footer, which is exactly what was reported.
// Any *-section shown from here starts at the top. showEl is a function declaration in
// auth-shared.js, so it is a property of the global object and wrapping it catches the bare
// showEl(...) calls in this file too.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
(function keepSectionSwitchesAtTop() {
    var inner = window.showEl;
    if (typeof inner !== 'function') return;
    window.showEl = function (el) {
        var out = inner.apply(this, arguments);
        if (el && el.id && el.id.slice(-8) === '-section') window.scrollTo(0, 0);
        return out;
    };
})();
