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

// Aliased as `sb`, not `supabaseClient` — see the note in supabase-app.js about why
// reusing that identifier across <script> tags would throw a SyntaxError.
const sb = window.supabaseClient;

// Decorative board backgrounds: real castle/mountain photography, cycled per level so
// adjacent levels don't repeat the same scene, rendered at low opacity behind the tiles (see
// .board-bg-photo in game.css). All sourced from Wikimedia Commons; full attribution in the
// "Photo credits" details block on the level-select screen and in the shared site footer.
// Licenses are a mix of CC0, public domain, and CC BY / CC BY-SA 2.5-4.0 -- never CC BY-NC or
// anything requiring share-alike on the whole site, consistent with this project's existing
// data-licensing discipline (see the Kanjium/Tatoeba notes elsewhere in this codebase).
const BOARD_BG_IMAGES = [
    'images/game-bg/himeji.jpg',
    'images/game-bg/mount-tate.jpg',
    'images/game-bg/matsumoto.jpg',
    'images/game-bg/kawaguchiko-fuji.jpg',
    'images/game-bg/osaka.jpg',
    'images/game-bg/shirouma.jpg',
    'images/game-bg/kumamoto.jpg',
    'images/game-bg/fuji-unsplash.jpg',
    'images/game-bg/nagoya.jpg',
    'images/game-bg/hikone.jpg',
];

// Background music, one pool per JLPT tier (N4 and N5 share the lofi pool) -- real licensed
// tracks, not synthesized, per the site owner's explicit direction. All from the "alex-morgan"
// modern-jazz collection on Pixabay Music, under Pixabay's site-wide Content License (verified:
// permits commercial/game use, no attribution required; only forbids reselling the bare audio
// file standalone, which doesn't apply to embedding it as game background music). Re-encoded
// from the 256kbps originals down to 112kbps to cut ~159MB of source audio to a fraction of
// that -- background music doesn't need studio-grade fidelity. Full credits in the "Photo
// credits" details block (renamed in spirit, not name, to cover both images and music) on the
// level-select screen and in the shared site footer.
const LOFI_JAZZ_POOL = [
    'sound/game-music/lofi-jazz-trio-sunny-cafe.mp3',
    'sound/game-music/lofi-jazz-study.mp3',
    'sound/game-music/lofi-jazz-retro-coffee-shop.mp3',
    'sound/game-music/lofi-jazz-melody-restaurant.mp3',
    'sound/game-music/lofi-jazz-soulful-midnight-club.mp3',
    'sound/game-music/lofi-jazz-swing-cocktail-bar.mp3',
    'sound/game-music/lofi-jazz-smooth-study-session.mp3',
];
const MUSIC_POOLS = {
    N1: [
        'sound/game-music/n1-soul-jazz-restaurant.mp3',
        'sound/game-music/n1-soul-jazz-coffee-shop.mp3',
        'sound/game-music/n1-soul-jazz-study-session.mp3',
        'sound/game-music/n1-soul-jazz-rainy-night.mp3',
        'sound/game-music/n1-soul-jazz-midnight-club.mp3',
        'sound/game-music/n1-soul-jazz-sunny-cafe.mp3',
        'sound/game-music/n1-soul-jazz-cocktail-bar.mp3',
    ],
    N2: [
        'sound/game-music/n2-jazz-study-1.mp3',
        'sound/game-music/n2-jazz-study-2.mp3',
        'sound/game-music/n2-jazz-study-3.mp3',
        'sound/game-music/n2-saxophone-jazz-study.mp3',
        'sound/game-music/n2-samba-jazz-study.mp3',
        'sound/game-music/n2-jazz-study-session.mp3',
        'sound/game-music/n2-jazz-lounge-study.mp3',
        'sound/game-music/n2-swing-jazz-study.mp3',
    ],
    N3: [
        'sound/game-music/n3-smooth-jazz-restaurant.mp3',
        'sound/game-music/n3-smooth-jazz-coffee-shop-1.mp3',
        'sound/game-music/n3-smooth-jazz-lounge-evening.mp3',
        'sound/game-music/n3-smooth-jazz-midnight-club.mp3',
        'sound/game-music/n3-smooth-jazz-coffee-shop-2.mp3',
        'sound/game-music/n3-smooth-jazz-rainy-night.mp3',
        'sound/game-music/n3-smooth-jazz-study-session.mp3',
        'sound/game-music/n3-smooth-jazz-cocktail-bar.mp3',
    ],
    N4: LOFI_JAZZ_POOL,
    N5: LOFI_JAZZ_POOL,
};
// Plays on the level-select screen (all tiers, before a level is chosen) -- separate from any
// tier's in-level pool above.
const LEVEL_SELECT_TRACK = 'sound/game-music/all-levels-jazzy-pop-piano.mp3';

const PER_ROW = 5; // 20 tiles / 5 = 4 clean honeycomb rows, no partial last row. Penalties
                    // restore an already-existing pair rather than adding new tiles, so the
                    // board's total tile count never changes mid-level -- PER_ROW can stay a
                    // fixed, clean divisor of 20 rather than needing to handle a partial row.
const STREAK_TIER = 3;
const SUIT_COLORS = ['#c0435a', '#3d7a5c', '#5b57a6', '#d97a3f']; // hanafuda-suit accents, cycled per pair

const MATCH_DURATION = 300;   // 5-minute clock, in seconds
const TIME_BONUS_PER_PAIR = 20; // seconds added per pair cleared (lightning chains add this once per pair in the chain)
const LOW_TIME_THRESHOLD = 30;  // seconds remaining at which the timer gets a warning treatment
const MISTAKES_PER_PENALTY = 2; // consecutive-since-last-penalty mismatches before a cleared pair returns

let currentLevel = null;
let matchStarted = false; // gates tile clicks/timer until the start modal's "Start Match" is clicked
let matchedCount = 0;
let totalPairs = 0;
let moves = 0;
let timerInterval = null;
let startTime = null;
let elapsedSeconds = 0;   // real seconds played -- still tracked for best-time comparisons,
                          // independent of the on-screen countdown display below
let bonusSeconds = 0;     // accumulated +20s-per-pair bonuses, extends the 5-minute clock
let timeRemaining = MATCH_DURATION; // what's actually shown on #board-timer
let mismatchStreak = 0;  // mismatches since the last penalty (or level start); see applyPenalty()
let lastResult = null;    // result earned as a guest, pending save once they log in
let progressCache = {};   // level number -> game_progress row
let currentSet = [];      // this play's chosen 10-pair word set, indexed by pairId
let activeJlptTab = 'N5'; // level-select screen: which JLPT tier's 10 levels are shown
let familiesFound = new Set(); // phonetic components ("lightning connect" families) chained
                                // this round -- rendered as chips in the side panel, wide
                                // layout only (see renderFamiliesFound())

let tiles = [];           // all 20 tile objects for the current board
let tilesByPairId = {};   // pairId -> { jp: tileObj, en: tileObj }
let selected = [];        // up to 2 currently-selected tile objects
let locked = false;

let score = 0;
let streak = 0;

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
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255].join(',');
}

function midpoint(p1, p2) { return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }; }

// ---------------------------------------------------------------------------
// Particle system — one canvas per layer (ambient drift + finite-life bursts/bolts), scoped
// to the .game-main container's own box (not the viewport) so the effects stay inside the
// dark game area and never bleed over the light site header/footer.
// ---------------------------------------------------------------------------
function ParticleField(canvas, container) {
    this.canvas = canvas;
    this.container = container;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.bolts = [];
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();
}

ParticleField.prototype.resize = function () {
    const rect = this.container.getBoundingClientRect();
    this.w = Math.max(rect.width, 1);
    this.h = Math.max(rect.height, 1);
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
};

ParticleField.prototype.spawnAmbient = function (n) {
    for (let i = 0; i < n; i++) {
        this.particles.push({
            kind: 'ambient',
            x: Math.random() * this.w,
            y: Math.random() * this.h,
            vx: (Math.random() - 0.5) * 6,
            vy: -6 - Math.random() * 10,
            r: 0.6 + Math.random() * 1.6,
            color: Math.random() < 0.7 ? '212,166,75' : '244,206,122',
            alpha: 0.12 + Math.random() * 0.22,
            drift: Math.random() * Math.PI * 2,
        });
    }
};

ParticleField.prototype.spawnBurst = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 26;
    const colors = opts.colors || ['212,166,75', '244,206,122'];
    const speed = opts.speed || 180;
    const life = opts.life || 0.9;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const v = speed * (0.35 + Math.random() * 0.75);
        this.particles.push({
            kind: 'burst',
            x, y,
            vx: Math.cos(angle) * v,
            vy: Math.sin(angle) * v - 60,
            gravity: 420,
            r: 1.4 + Math.random() * 2.6,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: life * (0.7 + Math.random() * 0.6),
            age: 0,
        });
    }
};

// Jagged animated connector line between two points, for the phonetic-chain "lightning
// connect" move — a distinct visual from the round particle bursts used elsewhere.
ParticleField.prototype.spawnBolt = function (p1, p2, opts) {
    opts = opts || {};
    const segments = 7;
    const points = [];
    const dx = p2.x - p1.x, dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const jitter = (i === 0 || i === segments) ? 0 : (Math.random() - 0.5) * 24;
        points.push({ x: p1.x + dx * t + nx * jitter, y: p1.y + dy * t + ny * jitter });
    }
    this.bolts.push({ points, life: opts.life || 0.5, age: 0, color: opts.color || '127,224,255' });
};

ParticleField.prototype.update = function (dt) {
    const next = [];
    for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (p.kind === 'ambient') {
            p.drift += dt * 0.6;
            p.x += (p.vx + Math.sin(p.drift) * 6) * dt * 0.1;
            p.y += p.vy * dt * 0.1;
            if (p.y < -20) { p.y = this.h + 20; p.x = Math.random() * this.w; }
            if (p.x < -20) p.x = this.w + 20;
            if (p.x > this.w + 20) p.x = -20;
            next.push(p);
        } else {
            p.age += dt;
            if (p.age >= p.life) continue;
            p.vy += p.gravity * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            next.push(p);
        }
    }
    this.particles = next;
    this.bolts = this.bolts.filter(b => { b.age += dt; return b.age < b.life; });
};

ParticleField.prototype.draw = function () {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        let alpha, r;
        if (p.kind === 'ambient') { alpha = p.alpha; r = p.r; }
        else { const t = p.age / p.life; alpha = 1 - t; r = p.r * (1 - t * 0.4); }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${Math.max(alpha, 0)})`;
        ctx.arc(p.x, p.y, Math.max(r, 0), 0, Math.PI * 2);
        ctx.fill();
    }
    this.bolts.forEach(b => {
        const t = b.age / b.life;
        const alpha = Math.max(1 - t, 0);
        ctx.save();
        ctx.strokeStyle = `rgba(${b.color},${alpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = `rgba(${b.color},${Math.min(alpha + 0.3, 1)})`;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        b.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.stroke();
        ctx.restore();
    });
};

const gameMain = document.querySelector('.game-main');
const boardWrapEl = document.getElementById('board-wrap');
const fxTextLayer = document.getElementById('fx-text-layer');
const ambientField = new ParticleField(document.getElementById('ambient-canvas'), gameMain);
const fxField = new ParticleField(document.getElementById('fx-canvas'), gameMain);
ambientField.spawnAmbient(50);

function resizeCanvases() { ambientField.resize(); fxField.resize(); }
window.addEventListener('resize', resizeCanvases);
if (window.ResizeObserver) {
    new ResizeObserver(() => resizeCanvases()).observe(gameMain);
}

let lastFrameT = performance.now();
function fxLoop(t) {
    const dt = Math.min((t - lastFrameT) / 1000, 0.05);
    lastFrameT = t;
    ambientField.update(dt); ambientField.draw();
    fxField.update(dt); fxField.draw();
    requestAnimationFrame(fxLoop);
}
requestAnimationFrame(fxLoop);

function centerOf(el) {
    const r = el.getBoundingClientRect();
    const mainRect = gameMain.getBoundingClientRect();
    return { x: r.left + r.width / 2 - mainRect.left, y: r.top + r.height / 2 - mainRect.top };
}

function tween(from, to, duration, onUpdate) {
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    function step(now) {
        const t = Math.min((now - start) / duration, 1);
        onUpdate(from + (to - from) * ease(t));
        if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function floatText(x, y, text, big, lightning, extraClass) {
    const el = document.createElement('div');
    el.className = 'float-text' + (big ? ' streak-text' : '') + (lightning ? ' lightning-text' : '') + (extraClass ? ' ' + extraClass : '');
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.fontSize = big ? '1.5rem' : '1.05rem';
    el.textContent = text;
    fxTextLayer.appendChild(el);
    window.setTimeout(() => el.remove(), 1150);
}

// ---------------------------------------------------------------------------
// Audio — synthesized at runtime with the Web Audio API (no sourced audio files), built
// around the Japanese "in" (陰) pentatonic scale (semitone offsets 0,1,5,7,8 from the root).
// Sound starts off; the speaker toggle is the explicit opt-in.
// ---------------------------------------------------------------------------
const GameAudio = (function () {
    let ctx = null;
    let masterGain = null;
    let sfxGain = null;
    let enabled = true; // music/sound on by default; browsers still block the very first
                         // play() until a user gesture happens, see the document-level
                         // fallback listener near setLevelTrack's call site below
    let noiseBuffer = null;

    const ROOT = 220; // A3
    const IN_SCALE = [0, 1, 5, 7, 8]; // semitone offsets, Japanese "in" mode

    function noteFreq(degree, octave) {
        octave = octave || 0;
        const len = IN_SCALE.length;
        const idx = ((degree % len) + len) % len;
        const octShift = Math.floor(degree / len) + octave;
        const semitone = IN_SCALE[idx] + octShift * 12;
        return ROOT * Math.pow(2, semitone / 12);
    }

    function ensureContext() {
        if (ctx) return;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        masterGain = ctx.createGain();
        masterGain.gain.value = 1;
        masterGain.connect(ctx.destination);
        sfxGain = ctx.createGain();
        sfxGain.gain.value = 0.5;
        sfxGain.connect(masterGain);
    }
    // Sound defaults to on (see `enabled` above), so the audio graph needs to exist from the
    // start rather than waiting for a toggle-button click to call ensureContext() -- otherwise
    // every sfx function below would dereference a still-null `ctx` on first use. The context
    // itself can be constructed without a user gesture; it just starts 'suspended' until one
    // arrives, which retryOnFirstGesture() below resumes.
    ensureContext();

    function getNoiseBuffer() {
        if (noiseBuffer) return noiseBuffer;
        const len = Math.floor(ctx.sampleRate * 0.5);
        noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
        return noiseBuffer;
    }

    // One synthesized tone with a fast exponential attack/release envelope — the shared
    // building block behind every chime, blip, and thud below.
    function tone(freq, opts) {
        opts = opts || {};
        const type = opts.type || 'sine';
        const dur = opts.duration || 0.25;
        const peak = opts.gain != null ? opts.gain : 0.2;
        const delay = opts.delay || 0;
        const t0 = ctx.currentTime + delay;

        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t0);
        if (opts.glideTo) osc.frequency.exponentialRampToValueAtTime(opts.glideTo, t0 + dur);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(peak, t0 + (opts.attack || 0.008));
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

        if (opts.filterFreq) {
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = opts.filterFreq;
            osc.connect(filter);
            filter.connect(g);
        } else {
            osc.connect(g);
        }
        g.connect(sfxGain);

        osc.start(t0);
        osc.stop(t0 + dur + 0.05);
    }

    function sfxSelect() {
        if (!enabled) return;
        tone(noteFreq(3, 1), { type: 'sine', duration: 0.09, gain: 0.14, attack: 0.004 });
    }

    function sfxMatch(tier) {
        if (!enabled) return;
        const base = 5 + Math.min(tier, 3) * 2;
        tone(noteFreq(base, 0), { type: 'triangle', duration: 0.16, gain: 0.16 });
        tone(noteFreq(base + 2, 1), { type: 'sine', duration: 0.22, gain: 0.14, delay: 0.05 });
    }

    function sfxStreak() {
        if (!enabled) return;
        [0, 2, 4, 7].forEach((d, i) => {
            tone(noteFreq(d, 1), { type: 'triangle', duration: 0.3, gain: 0.15, delay: i * 0.08, attack: 0.006 });
            tone(noteFreq(d, 2), { type: 'sine', duration: 0.35, gain: 0.08, delay: i * 0.08 + 0.02 });
        });
    }

    function sfxMismatch() {
        if (!enabled) return;
        const f = noteFreq(0, -1);
        tone(f, { type: 'sawtooth', duration: 0.18, gain: 0.1, glideTo: f * 0.7, filterFreq: 900 });
    }

    // Lightning connect: a fast noise crackle swept through a rising bandpass filter, plus a
    // short ascending pentatonic sparkle (one note per chained pair) — distinct in timbre from
    // the plain triangle/sine match chime, but still built from oscillators/noise and still on
    // the same "in" scale.
    function sfxLightning(chainSize) {
        if (!enabled) return;
        const t0 = ctx.currentTime;
        const src = ctx.createBufferSource();
        src.buffer = getNoiseBuffer();
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(1600, t0);
        bp.frequency.exponentialRampToValueAtTime(5200, t0 + 0.17);
        bp.Q.value = 7;
        const ng = ctx.createGain();
        ng.gain.setValueAtTime(0.0001, t0);
        ng.gain.exponentialRampToValueAtTime(0.24, t0 + 0.012);
        ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.24);
        src.connect(bp); bp.connect(ng); ng.connect(sfxGain);
        src.start(t0);
        src.stop(t0 + 0.26);

        const count = Math.max(2, Math.min(chainSize || 2, 6));
        for (let i = 0; i < count; i++) {
            tone(noteFreq(7 + i * 2, 1), { type: 'square', duration: 0.13, gain: 0.09, delay: 0.03 + i * 0.055, attack: 0.002, filterFreq: 4200 });
        }
    }

    function sfxWin() {
        if (!enabled) return;
        [0, 2, 4, 7, 9, 12].forEach((d, i) => {
            tone(noteFreq(d, 0), { type: 'triangle', duration: 0.4, gain: 0.15, delay: i * 0.1 });
        });
        tone(noteFreq(12, 0), { type: 'sine', duration: 1.4, gain: 0.1, delay: 0.65 });
        tone(noteFreq(7, 1), { type: 'sine', duration: 1.4, gain: 0.08, delay: 0.68 });
    }

    // Descending run in the low register -- the inverse shape of sfxWin's rising, bright one,
    // so a timeout reads as a distinct outcome rather than a quieter win.
    function sfxTimeUp() {
        if (!enabled) return;
        [12, 9, 7, 4, 2, 0].forEach((d, i) => {
            tone(noteFreq(d, -1), { type: 'triangle', duration: 0.45, gain: 0.14, delay: i * 0.12 });
        });
        tone(noteFreq(0, -2), { type: 'sine', duration: 1.6, gain: 0.12, delay: 0.75 });
    }

    // Penalty ("a cleared pair returns"): a falling noise sweep -- the same bandpass-swept
    // noise burst sfxLightning uses, but ramped DOWN instead of up, so it reads as the
    // rewind/undo counterpart to that rising "connect" sound -- plus a low descending blip,
    // distinct from both sfxMismatch's quick sawtooth blip and sfxLightning's rising sparkle.
    function sfxPenalty() {
        if (!enabled) return;
        const t0 = ctx.currentTime;
        const src = ctx.createBufferSource();
        src.buffer = getNoiseBuffer();
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(4200, t0);
        bp.frequency.exponentialRampToValueAtTime(700, t0 + 0.3);
        bp.Q.value = 6;
        const ng = ctx.createGain();
        ng.gain.setValueAtTime(0.0001, t0);
        ng.gain.exponentialRampToValueAtTime(0.22, t0 + 0.015);
        ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.34);
        src.connect(bp); bp.connect(ng); ng.connect(sfxGain);
        src.start(t0);
        src.stop(t0 + 0.36);

        tone(noteFreq(0, -1), { type: 'sawtooth', duration: 0.3, gain: 0.13, delay: 0.05, glideTo: noteFreq(0, -1) * 0.6, filterFreq: 700 });
    }

    // Background music: real licensed jazz tracks (soul jazz / jazz-study / smooth jazz / lofi
    // jazz per JLPT tier -- see MUSIC_POOLS below), not synthesized. Replaces the earlier
    // pre-composed-phrase scheme entirely, per the site owner's explicit direction to use real
    // music instead. Plays via a plain HTMLAudioElement (a second, independent audio pipeline
    // from the Web Audio API graph every sfx above uses) -- the two mix fine at the OS level,
    // no need to route the file through ctx at all. A fade in .volume gives toggling sound the
    // same fade-not-a-hard-cut feel the old synthesized ambient pad had.
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

    // Called once per level start (see startLevel() / setLevelTrack below) -- always resets
    // playback to the start of the chosen track for that level, rather than continuing
    // wherever the previous level's track left off.
    function setTrack(src) {
        const el = ensureMusicEl();
        const absoluteSrc = new URL(src, window.location.href).href;
        if (el.src === absoluteSrc && !el.paused) return; // same track already playing, leave it
        el.src = src;
        el.currentTime = 0;
        if (enabled) {
            el.volume = 0;
            el.play().catch(() => {});
            fadeMusicTo(MUSIC_VOLUME, 900);
        }
    }

    function startAmbient() {
        if (!musicEl || !musicEl.src) return; // no level track chosen yet (e.g. level-select screen)
        musicEl.play().catch(() => {});
        fadeMusicTo(MUSIC_VOLUME, 900);
    }

    function stopAmbient() {
        if (!musicEl) return;
        fadeMusicTo(0, 400);
    }

    // Music defaults to on, but browsers block the very first play() call without a user
    // gesture -- so the level-select track's initial play() attempt (fired from setTrack()
    // at page load, before any click has happened) can get silently rejected. Retry once on
    // the page's first real interaction so it isn't stuck silent all session.
    (function retryOnFirstGesture() {
        const kick = () => {
            if (ctx && ctx.state === 'suspended') ctx.resume();
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
        ensureContext();
        if (!ctx) return false;
        enabled = next;
        if (enabled) {
            if (ctx.state === 'suspended') ctx.resume();
            startAmbient();
        } else {
            stopAmbient();
        }
        return enabled;
    }

    return {
        toggle: () => setEnabled(!enabled),
        isEnabled: () => enabled,
        setLevelTrack: setTrack,
        select: sfxSelect,
        match: sfxMatch,
        streak: sfxStreak,
        mismatch: sfxMismatch,
        lightning: sfxLightning,
        win: sfxWin,
        timeUp: sfxTimeUp,
        penalty: sfxPenalty,
    };
})();

function syncSoundButtons(on) {
    [
        [document.getElementById('sound-toggle'), document.getElementById('sound-icon')],
        [document.getElementById('board-sound-toggle'), document.getElementById('board-sound-icon')],
    ].forEach(([btn, icon]) => {
        btn.classList.toggle('on', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.title = on ? 'Turn sound off' : 'Turn sound on';
        icon.textContent = on ? '\u{1F50A}' : '\u{1F507}';
    });
}
document.getElementById('sound-toggle').addEventListener('click', () => syncSoundButtons(GameAudio.toggle()));
document.getElementById('board-sound-toggle').addEventListener('click', () => syncSoundButtons(GameAudio.toggle()));

// ---------------------------------------------------------------------------
// Board construction — a honeycomb of hexagon tiles, no grid/pathfinding: any two tiles can
// be clicked regardless of position, so the board can never get "stuck".
// ---------------------------------------------------------------------------
function buildTiles(level) {
    // Each level has several word sets; picking one at random each play means replaying a
    // level doesn't always show the same 20 pairs.
    const set = level.sets[Math.floor(Math.random() * level.sets.length)];
    currentSet = set;
    const list = [];
    set.forEach((p, i) => {
        list.push({ pairId: i, kind: 'jp', text: p.jp, sub: p.reading, phonetic: p.phonetic || null, cleared: false });
        list.push({ pairId: i, kind: 'en', text: p.en, sub: '', phonetic: null, cleared: false });
    });
    shuffleArray(list);
    return list;
}

function layoutTiles(tileList) {
    const grid = document.getElementById('tile-grid');
    grid.innerHTML = '';
    let rowEl = null;
    let rowIndex = -1;
    tileList.forEach((t, i) => {
        if (i % PER_ROW === 0) {
            rowIndex++;
            rowEl = document.createElement('div');
            rowEl.className = 'hex-row' + (rowIndex % 2 === 1 ? ' offset' : '');
            grid.appendChild(rowEl);
        }
        rowEl.appendChild(t.el);
    });
}

function renderBoard() {
    tiles = buildTiles(currentLevel);
    tilesByPairId = {};
    tiles.forEach(t => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `tile tile-${t.kind}`;
        btn.style.setProperty('--suit-color', SUIT_COLORS[t.pairId % SUIT_COLORS.length]);
        if (t.kind === 'jp') {
            btn.innerHTML = `<span class="tile-jp">${escapeHtml(t.text)}</span>` +
                `<span class="tile-reading">${escapeHtml(t.sub)}</span>`;
        } else {
            btn.innerHTML = `<span class="tile-en-text">${escapeHtml(t.text)}</span>`;
        }
        const dot = document.createElement('span');
        dot.className = 'tile-dot';
        btn.appendChild(dot);
        btn.addEventListener('click', () => onTileClick(t));
        t.el = btn;

        if (!tilesByPairId[t.pairId]) tilesByPairId[t.pairId] = {};
        tilesByPairId[t.pairId][t.kind] = t;
    });
    layoutTiles(tiles);
    resizeCanvases();
}

// Cosmetic reshuffle of the remaining (uncleared) tiles' honeycomb positions — reuses the
// existing tile elements (and their listeners), just re-lays them out in a new random order.
function shuffleRemaining() {
    const remaining = tiles.filter(t => !t.cleared);
    if (!remaining.length) return;
    selected.forEach(t => t.el.classList.remove('selected'));
    selected = [];
    locked = false;
    shuffleArray(remaining);
    layoutTiles(remaining);
}

// ---------------------------------------------------------------------------
// Timer & stats
// ---------------------------------------------------------------------------
function renderTimer() {
    const el = document.getElementById('board-timer');
    el.textContent = formatTime(timeRemaining);
    el.classList.toggle('low-time', timeRemaining <= LOW_TIME_THRESHOLD && timeRemaining > 0);
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        timeRemaining = Math.max(0, MATCH_DURATION + bonusSeconds - elapsedSeconds);
        renderTimer();
        if (timeRemaining <= 0) timeUp();
    }, 250);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Called once per pair cleared (handleMatch, or once per member of a lightning chain) --
// extends the 5-minute clock rather than just cosmetically ticking a bonus number, so a chain
// of N pairs is worth N x TIME_BONUS_PER_PAIR seconds of real breathing room.
function addTimeBonus(pairCount, atX, atY) {
    bonusSeconds += TIME_BONUS_PER_PAIR * pairCount;
    timeRemaining = Math.max(0, MATCH_DURATION + bonusSeconds - elapsedSeconds);
    renderTimer();
    if (atX != null) floatText(atX, atY, '+' + (TIME_BONUS_PER_PAIR * pairCount) + 's', false, false, 'time-text');
}

// Time ran out before the level was cleared -- a distinct, honest failure path from
// finishLevel()'s success path: no win fanfare, no progress save (best_time_seconds is only
// ever meant to record an actual clear, not an incomplete attempt).
function timeUp() {
    stopTimer();
    matchStarted = false;
    locked = true;
    selected.forEach(t => t.el.classList.remove('selected'));
    selected = [];
    GameAudio.timeUp();
    showResultModal({ level: currentLevel.level, timeSeconds: elapsedSeconds, moves }, false);
}

function updateStats() {
    const pairsText = `${matchedCount} / ${totalPairs} pairs`;
    document.getElementById('board-pairs').textContent = pairsText;
    document.getElementById('board-moves').textContent = `${moves} moves`;
    // Side-panel mirror (wide layout only, see .panel-wide-only) -- same values, same format
    // as #board-pairs above, just rendered a second time next to the board. Guarded since the
    // element is always in the DOM (mobile just hides it via CSS) but doesn't hurt to check.
    const panelPairsMirror = document.getElementById('panel-pairs-mirror');
    if (panelPairsMirror) panelPairsMirror.textContent = pairsText;
}

function setScore(newScore) {
    const scoreEl = document.getElementById('score-value');
    tween(score, newScore, 380, v => { scoreEl.textContent = Math.round(v).toString(); });
    score = newScore;
}

function updateStreakMeter(tierHit) {
    const streakFill = document.getElementById('streak-fill');
    let pct = ((streak % STREAK_TIER) / STREAK_TIER) * 100;
    if (tierHit) pct = 100;
    streakFill.style.width = pct + '%';
    if (tierHit) {
        streakFill.classList.remove('tier-flash');
        void streakFill.offsetWidth;
        streakFill.classList.add('tier-flash');
        window.setTimeout(() => { streakFill.style.width = '0%'; }, 260);
    }

    // Side-panel mirror (wide layout only) -- reuses the same .streak-meter/.streak-fill
    // classes as the toolbar original so it gets identical track/fill/flash styling for free;
    // just re-applies the same width/flash sequence to the second element.
    const panelStreakFill = document.getElementById('panel-streak-fill');
    if (panelStreakFill) {
        panelStreakFill.style.width = pct + '%';
        if (tierHit) {
            panelStreakFill.classList.remove('tier-flash');
            void panelStreakFill.offsetWidth;
            panelStreakFill.classList.add('tier-flash');
            window.setTimeout(() => { panelStreakFill.style.width = '0%'; }, 260);
        }
    }
}

// ---------------------------------------------------------------------------
// Families-found chips (side panel, wide layout only) — tracks which phonetic "lightning
// connect" families have been chained this round, distinct from the ordinary pairs counter:
// the point is celebrating the phonetic-family mechanic specifically, not re-showing
// matchedCount under a different label.
// ---------------------------------------------------------------------------
function renderFamiliesFound() {
    const listEl = document.getElementById('families-found-list');
    const emptyEl = document.getElementById('families-empty');
    if (!listEl || !emptyEl) return;

    listEl.innerHTML = '';
    if (familiesFound.size === 0) {
        showEl(emptyEl);
        return;
    }
    hideEl(emptyEl);

    familiesFound.forEach(phonetic => {
        const pair = currentSet.find(p => p.phonetic === phonetic);
        const reading = pair ? pair.phoneticReading : '';
        const chip = document.createElement('span');
        chip.className = 'family-chip';
        chip.innerHTML = `<span class="family-chip-kanji">${escapeHtml(phonetic)}</span>` +
            (reading ? `<span class="family-chip-reading">${escapeHtml(reading)}</span>` : '') +
            `<span class="family-chip-label">found</span>`;
        listEl.appendChild(chip);
    });
}

// ---------------------------------------------------------------------------
// Example sentence panel — updates whenever a pair is matched, for memorization
// ---------------------------------------------------------------------------
function resetExamplePanel() {
    hideEl(document.getElementById('example-content'));
    showEl(document.getElementById('example-empty'));
}

function showExample(pairId) {
    const pair = currentSet[pairId];
    if (!pair) return;

    document.getElementById('example-jp').textContent = pair.jp;
    document.getElementById('example-reading').textContent = pair.reading;
    const meanings = pair.meanings && pair.meanings.length ? pair.meanings : [pair.en];
    document.getElementById('example-meanings').textContent = meanings.join(', ');

    const sentenceBlock = document.getElementById('example-sentence-block');
    const noneEl = document.getElementById('example-none');
    if (pair.example) {
        const jpEl = document.getElementById('example-sentence-jp');
        if (pair.example.furigana) {
            jpEl.innerHTML = pair.example.furigana;
        } else {
            jpEl.textContent = pair.example.jp;
        }
        document.getElementById('example-sentence-en').textContent = pair.example.en;
        showEl(sentenceBlock);
        hideEl(noneEl);
    } else {
        hideEl(sentenceBlock);
        showEl(noneEl);
    }

    hideEl(document.getElementById('example-empty'));
    showEl(document.getElementById('example-content'));
}

// ---------------------------------------------------------------------------
// Gameplay
// ---------------------------------------------------------------------------
function onTileClick(tile) {
    if (!matchStarted || locked) return;
    if (tile.cleared) return;

    if (selected.includes(tile)) {
        tile.el.classList.remove('selected');
        selected = selected.filter(t => t !== tile);
        return;
    }
    if (selected.length >= 2) return;

    tile.el.classList.add('selected');
    selected.push(tile);
    GameAudio.select();

    if (selected.length === 2) {
        locked = true;
        moves++;
        updateStats();
        const [a, b] = selected;
        window.setTimeout(() => resolveSelection(a, b), 200);
    }
}

function resolveSelection(a, b) {
    if (a.pairId === b.pairId && a.kind !== b.kind) {
        handleMatch(a, b);
        return;
    }
    if (a.kind === 'jp' && b.kind === 'jp' && a.phonetic && a.phonetic === b.phonetic) {
        handleLightningChain(a.phonetic);
        return;
    }
    handleMismatch(a, b);
}

function handleMatch(a, b) {
    streak += 1;
    const gained = 10 * (1 + Math.floor(streak / STREAK_TIER));
    setScore(score + gained);
    GameAudio.match(Math.floor(streak / STREAK_TIER));

    [a, b].forEach(t => {
        t.el.classList.add('match-pop');
        const c = centerOf(t.el);
        const rgb = hexToRgb(SUIT_COLORS[a.pairId % SUIT_COLORS.length]);
        fxField.spawnBurst(c.x, c.y, { count: 22, colors: ['212,166,75', '244,206,122', rgb], speed: 190, life: 0.85 });
    });

    const mid = midpoint(centerOf(a.el), centerOf(b.el));
    floatText(mid.x, mid.y, '+' + gained);
    addTimeBonus(1, mid.x, mid.y + 24);

    const tierHit = streak % STREAK_TIER === 0;
    updateStreakMeter(tierHit);
    if (tierHit) {
        window.setTimeout(() => {
            floatText(mid.x, mid.y - 40, 'STREAK x' + streak, true);
            fxField.spawnBurst(mid.x, mid.y, { count: 60, speed: 260, life: 1.1, colors: ['212,166,75', '244,206,122', '255,255,255'] });
            GameAudio.streak();
        }, 200);
    }

    showExample(a.pairId);

    window.setTimeout(() => {
        [a, b].forEach(t => { t.el.classList.remove('match-pop', 'selected'); t.el.classList.add('cleared'); t.cleared = true; });
        matchedCount++;
        selected = [];
        locked = false;
        updateStats();
        if (matchedCount === totalPairs) finishLevel();
    }, 520);
}

// Phonetic-chain "lightning connect": every still-on-board word sharing this phonetic value
// (both its jp tile AND its en tile) clears together in one combo, each pair counting toward
// the streak — a 3-pair chain can trigger a tier bonus mid-chain just like 3 separate matches.
function handleLightningChain(phonetic) {
    const memberPairIds = [];
    currentSet.forEach((p, pairId) => {
        if (p.phonetic !== phonetic) return;
        const pt = tilesByPairId[pairId];
        if (pt && pt.jp && !pt.jp.cleared) memberPairIds.push(pairId);
    });
    if (memberPairIds.length < 2) { handleMismatch(selected[0], selected[1]); return; }

    // Chain confirmed (past the early-return above, so this is never recorded for a false
    // attempt) -- track it for the side panel's "families found" chip list.
    familiesFound.add(phonetic);
    renderFamiliesFound();

    const chainTiles = [];
    memberPairIds.forEach(pairId => {
        const pt = tilesByPairId[pairId];
        if (pt.jp && !pt.jp.cleared) chainTiles.push(pt.jp);
        if (pt.en && !pt.en.cleared) chainTiles.push(pt.en);
    });

    GameAudio.lightning(memberPairIds.length);

    const centers = chainTiles.map(t => centerOf(t.el));
    for (let i = 0; i < centers.length - 1; i++) fxField.spawnBolt(centers[i], centers[i + 1], { color: '127,224,255' });
    if (centers.length > 2) fxField.spawnBolt(centers[centers.length - 1], centers[0], { color: '127,224,255', life: 0.4 });

    let gainedTotal = 0;
    const tierHits = [];
    memberPairIds.forEach(pairId => {
        streak += 1;
        gainedTotal += 10 * (1 + Math.floor(streak / STREAK_TIER));
        if (streak % STREAK_TIER === 0) tierHits.push(streak);
    });
    setScore(score + gainedTotal);
    updateStreakMeter(tierHits.length > 0);
    tierHits.forEach((s, idx) => {
        window.setTimeout(() => GameAudio.streak(), 180 + idx * 140);
    });

    chainTiles.forEach(t => {
        t.el.classList.add('lightning-pop');
        const c = centerOf(t.el);
        fxField.spawnBurst(c.x, c.y, { count: 24, colors: ['127,224,255', '244,206,122', '255,255,255'], speed: 210, life: 0.9 });
    });

    const midPt = centers.reduce((acc, c) => ({ x: acc.x + c.x, y: acc.y + c.y }), { x: 0, y: 0 });
    midPt.x /= centers.length; midPt.y /= centers.length;
    floatText(midPt.x, midPt.y, `LIGHTNING x${memberPairIds.length}`, true, true);
    addTimeBonus(memberPairIds.length, midPt.x, midPt.y + 30);
    if (tierHits.length) {
        window.setTimeout(() => floatText(midPt.x, midPt.y - 44, 'STREAK x' + streak, true), 220);
    }

    showExample(memberPairIds[0]);

    window.setTimeout(() => {
        chainTiles.forEach(t => { t.el.classList.remove('lightning-pop', 'selected'); t.el.classList.add('cleared'); t.cleared = true; });
        matchedCount += memberPairIds.length;
        selected = [];
        locked = false;
        updateStats();
        if (matchedCount === totalPairs) finishLevel();
    }, 580);
}

function handleMismatch(a, b) {
    streak = 0;
    updateStreakMeter(false);
    GameAudio.mismatch();
    boardWrapEl.classList.remove('board-shake');
    void boardWrapEl.offsetWidth;
    boardWrapEl.classList.add('board-shake');
    [a, b].forEach(t => t.el.classList.add('mismatch'));

    mismatchStreak++;

    window.setTimeout(() => {
        [a, b].forEach(t => {
            t.el.classList.remove('mismatch', 'selected');
            t.el.style.backgroundImage = '';
        });
        selected = [];
        locked = false;

        if (mismatchStreak >= MISTAKES_PER_PENALTY) {
            mismatchStreak = 0;
            applyPenalty();
        }
    }, 430);
}

// Every MISTAKES_PER_PENALTY mismatches, a previously-cleared pair reappears on the board --
// a real setback (matchedCount drops, the pair has to be re-cleared), not just a cosmetic
// scold. Picks a random cleared pair rather than "the most recent" since tiles only track a
// cleared boolean, not a clear-order log, and which specific pair returns doesn't materially
// change the mechanic. No-op if nothing's been cleared yet (can't penalize progress that
// doesn't exist) -- the two mistakes are simply forgiven in that case.
function applyPenalty() {
    const clearedPairIds = Object.keys(tilesByPairId)
        .map(Number)
        .filter(pairId => {
            const pt = tilesByPairId[pairId];
            return pt.jp && pt.jp.cleared && pt.en && pt.en.cleared;
        });
    if (!clearedPairIds.length) return;

    const pairId = clearedPairIds[Math.floor(Math.random() * clearedPairIds.length)];
    const pt = tilesByPairId[pairId];
    pt.jp.cleared = false;
    pt.en.cleared = false;
    pt.jp.el.classList.remove('cleared');
    pt.en.el.classList.remove('cleared');
    matchedCount--;
    updateStats();

    // layoutTiles rebuilds the honeycomb from whichever tiles are currently uncleared, which
    // is also how the Shuffle button repositions tiles -- reusing it here is what makes
    // reinserting a pair that may have been detached from #tile-grid (by an earlier shuffle)
    // possible at all, at the cost of the rest of the board's tiles visually reshuffling too.
    // The penalty float-text below is what tells the player that's a consequence of the
    // penalty, not an unrelated glitch.
    layoutTiles(tiles.filter(t => !t.cleared));
    resizeCanvases();

    [pt.jp, pt.en].forEach(t => {
        t.el.classList.add('penalty-return');
        window.setTimeout(() => t.el.classList.remove('penalty-return'), 700);
    });

    const c = centerOf(boardWrapEl);
    floatText(c.x, c.y, 'PENALTY — pair returned', true);
    GameAudio.penalty();
}

// ---------------------------------------------------------------------------
// Level select <-> board screens
// ---------------------------------------------------------------------------
function startLevel(level) {
    currentLevel = level;
    activeJlptTab = level.jlpt; // so "back to levels" lands on the tier just played
    matchStarted = false;
    matchedCount = 0;
    moves = 0;
    selected = [];
    locked = false;
    score = 0;
    streak = 0;
    mismatchStreak = 0;
    elapsedSeconds = 0;
    bonusSeconds = 0;
    timeRemaining = MATCH_DURATION;
    familiesFound.clear(); // fresh-level reset, not shuffleRemaining() -- that keeps the round
    totalPairs = 10; // every level is exactly 10 pairs now (see game-words.js header)
    stopTimer();

    const bgImage = BOARD_BG_IMAGES[(level.level - 1) % BOARD_BG_IMAGES.length];
    gameMain.style.setProperty('--board-bg-image', `url(${bgImage})`);

    // Music pool is per JLPT tier (N4/N5 share one); cycle by position WITHIN that tier
    // (0-9), not the global level number, so N4 and N5 each start their own pass through the
    // shared lofi pool from track 0 rather than picking up wherever the other tier left off.
    const musicPool = MUSIC_POOLS[level.jlpt];
    const withinTierIndex = (level.level - 1) % 10;
    GameAudio.setLevelTrack(musicPool[withinTierIndex % musicPool.length]);

    renderBoard();
    resetExamplePanel();
    renderFamiliesFound();

    document.getElementById('score-value').textContent = '0';
    document.getElementById('streak-fill').style.width = '0%';
    const panelStreakFill = document.getElementById('panel-streak-fill');
    if (panelStreakFill) panelStreakFill.style.width = '0%';
    renderTimer();
    document.getElementById('board-level-label').textContent = level.title;
    updateStats();

    hideEl(document.getElementById('level-select-section'));
    showEl(document.getElementById('board-section'));
    // Full-screen "playing" mode: hides the shared site header and lets .game-main break out
    // of .container's max-width, so the board fills the whole viewport instead of sitting in
    // a boxed page column — only while a board is actually up, not on level-select.
    document.body.classList.add('game-playing');
    resizeCanvases();

    document.getElementById('start-modal-title').textContent = level.title;
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

        const progress = progressCache[level.level];
        let metaHtml = '<span>Not played yet</span>';
        if (progress && progress.completed) {
            metaHtml = `<span class="completed">&#10003; Completed</span>` +
                `<span>Best: ${formatTime(progress.best_time_seconds)} &middot; ${progress.best_moves} moves</span>`;
        }

        card.innerHTML = `
            <span class="level-badge">${escapeHtml(level.jlpt)}</span>
            <h3>${escapeHtml(level.title)}</h3>
            <div class="level-meta">${metaHtml}</div>
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
        const { data, error } = await sb.from('game_progress').select('*').eq('user_id', session.user.id);
        if (!error && data) {
            data.forEach(row => { progressCache[row.level] = row; });
        }
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
        statusEl.textContent = isBetter ? 'New best saved!' : 'Result saved.';
    } else {
        statusEl.textContent = "Couldn't save your result — try again later.";
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
    if (session) {
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
    document.getElementById('result-title').textContent = won ? 'Level Complete!' : "Time's Up!";
    document.getElementById('result-time').textContent = formatTime(result.timeSeconds);
    document.getElementById('result-moves').textContent = result.moves;

    const prevBest = progressCache[result.level];
    if (won) {
        document.getElementById('result-best').textContent = (prevBest && prevBest.completed)
            ? `Previous best: ${formatTime(prevBest.best_time_seconds)} · ${prevBest.best_moves} moves`
            : 'First clear on this level!';
    } else {
        document.getElementById('result-best').textContent =
            `Matched ${matchedCount} / ${totalPairs} pairs before time ran out.`;
    }

    // On a win, offer the next level in sequence instead of replaying the one just cleared --
    // there's no "next" after the last level (50), so that case falls back to Play Again.
    resultPrimaryTarget = won ? WORD_LEVELS.find(l => l.level === result.level + 1) || null : null;
    document.getElementById('result-replay-btn').textContent = resultPrimaryTarget ? 'Next Level' : 'Play Again';

    hideEl(document.getElementById('result-login-btn'));
    hideEl(document.getElementById('result-save-status'));
    showEl(document.getElementById('result-modal'));
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
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

// Deep link support: game.html?level=3 jumps straight into that level's board instead of
// showing the level-select screen first — used by the header dropdown's per-level links.
// Runs independently of auth/progress loading so the board appears immediately.
const requestedLevelNum = parseInt(new URLSearchParams(window.location.search).get('level'), 10);
const requestedLevel = WORD_LEVELS.find(l => l.level === requestedLevelNum);
if (requestedLevel) {
    startLevel(requestedLevel);
} else {
    GameAudio.setLevelTrack(LEVEL_SELECT_TRACK); // level-select screen's own ambient track
}
