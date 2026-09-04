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
// .board-bg-photo in game.css). All sourced from Wikimedia Commons; full attribution on
// credits.html (#word-game-photos), linked from every page's footer.
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
// that -- background music doesn't need studio-grade fidelity. Full credits on credits.html
// (#word-game-music), linked from every page's footer.
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

const PER_ROW = 5; // a full 10-pair board (20 tiles) is 4 clean rows. A penalty can push the
                    // board to 11+ pairs (see applyPenalty) -- the resulting partial last row
                    // is accepted, not avoided (VISIBLE_TARGET/REFILL_BATCH below only manage
                    // the *base* count, not what mistakes add back on top of it).
const STREAK_TIER = 3;

// Only VISIBLE_TARGET pairs of the level's full set are ever dealt onto the board at once --
// the rest sit in a shuffled reserve and get dealt in batches once enough gaps open up. This
// keeps the board at its designed size (see PER_ROW/--hex-w in game.css, both tuned for a
// ~20-tile board) instead of the 50-tile, 10-row wall a full 25-pair level would otherwise be,
// while never risking a deadlock: pairs are always dealt whole, so every visible tile's partner
// is always visible too -- there is no state where a legal move doesn't exist.
const VISIBLE_TARGET = 10;
const REFILL_BATCH = 5;

// The bonus "winged tile" event: a Sino-Japanese/native-Japanese (Wakan) partner of a word
// currently on the board flies across it. Catch it and you're carrying it on your pointer;
// drop it on its partner within WAKAN_CATCH_MS and the pair -- plus every tile touching it,
// and THEIR partners -- blast-clears together. Miss the window, or drop it on the wrong tile,
// and it shatters with no penalty; it was a free bonus, not a trap.
// Fires at most once per level, no earlier than the 50% mark, and only once a Wakan-linked
// word is actually dealt onto the board -- so it can never target something the player can't
// see (see maybeArmFlyer).
const WAKAN_TRIGGER_FRACTION = 0.5;
const WAKAN_CATCH_MS = 5500; // 4s base + a 1.5s extension (was too tight to react to the shake)
const WAKAN_BLAST_EXTRA = 3; // neighbour pairs pulled in alongside the one dropped on
const SUIT_COLORS = ['#c0435a', '#3d7a5c', '#5b57a6', '#d97a3f']; // hanafuda-suit accents, cycled per pair

// A level's data file entry (game-words.js) still holds all 25 words per level -- only
// LEVEL_PAIR_COUNT of them are actually put in play for a given round (see pickWordSet), chosen
// fresh each playthrough for replay variety. The rest aren't wasted: they're held aside as
// POWERUP_SWAP_FUEL, the only source the "swap 3" powerup below draws its replacements from.
// 25 - 20 = 5, which happens to be exactly one POWERUP_SWAP_COUNT batch -- the powerup can only
// ever be used once per level before that fuel runs out, which is fine; see maybeGrantPowerup.
const LEVEL_PAIR_COUNT = 20;

const MATCH_DURATION_SECONDS = 240; // flat 4-minute clock, not scaled by pair count
const TIME_BONUS_PER_PAIR = 20; // seconds added per pair cleared (lightning chains add this once per pair in the chain)
const LOW_TIME_THRESHOLD = 30;  // seconds remaining at which the timer gets a warning treatment
const MISTAKES_PER_PENALTY = 2; // consecutive-since-last-penalty mismatches before a cleared pair returns

// Powerups: every time the streak reaches a multiple of STREAK_POWERUP_INTERVAL, one of the two
// effects below fires automatically (no menu, no banking a charge for later -- consistent with
// how lightning-connect and the Wakan event are both immediate, reactive bonuses rather than an
// inventory system). Which of the two fires is random each time; see maybeGrantPowerup.
const STREAK_POWERUP_INTERVAL = 4;
const POWERUP_SWAP_COUNT = 3;

let currentLevel = null;
let matchStarted = false; // gates tile clicks/timer until the start modal's "Start Match" is clicked
let matchedCount = 0;
let totalPairs = 0;
let moves = 0;
let timerInterval = null;
let startTime = null;
let elapsedSeconds = 0;   // real seconds played -- still tracked for best-time comparisons,
                          // independent of the on-screen countdown display below
let bonusSeconds = 0;     // accumulated +20s-per-pair bonuses, extends the base 4-minute clock
let matchDuration = 0;   // this level's clock length (MATCH_DURATION_SECONDS), set in startLevel()
let timeRemaining = 0;   // what's actually shown on #board-timer
let mismatchStreak = 0;  // mismatches since the last penalty (or level start); see applyPenalty()
let lastResult = null;    // result earned as a guest, pending save once they log in
let progressCache = {};   // level number -> game_progress row
let currentSet = [];      // this play's chosen 10-pair word set, indexed by pairId
let activeJlptTab = 'N5'; // level-select screen: which JLPT tier's 10 levels are shown
let familiesFound = new Set(); // phonetic components ("lightning connect" families) chained
                                // this round -- rendered as chips in the side panel, wide
                                // layout only (see renderFamiliesFound())

let tiles = [];           // every tile object DEALT so far this level (active or cleared) --
                          // NOT the full level set; undealt pairs live only in reserveQueue
let tilesByPairId = {};   // pairId -> { jp: tileObj, en: tileObj }, only for dealt pairs
let selected = [];        // up to 2 currently-selected tile objects
let locked = false;

let reserveQueue = [];    // pairIds not yet dealt this level (within the LEVEL_PAIR_COUNT in
                           // play), shuffled
let dealtCount = 0;       // pairs dealt so far (VISIBLE_TARGET, then +REFILL_BATCH at a time)
let powerupFuel = [];     // pairIds excluded from this round's LEVEL_PAIR_COUNT -- untouched by
                           // normal dealing, the "swap 3" powerup's only supply (see startLevel)

let score = 0;
let streak = 0;
let lastPowerupStreak = 0; // highest streak value a charge has already been granted at this
                            // level, so a streak sitting AT a multiple of 4 (e.g. after a
                            // penalty rolls it back down to exactly 4) can't re-grant on every
                            // subsequent clear
let powerupCharges = 0;    // banked, spendable on either effect via the toolbar buttons -- see
                            // maybeGrantPowerup/updatePowerupUI. Not two separate pools: earning
                            // a charge is automatic, spending it (and choosing which effect) is
                            // always the player's call.

// Wakan "winged tile" bonus event state -- see the constants block above for the rules.
let wakanMap = null;         // built once from DICTIONARY_ENTRIES on first use, see buildWakanMap()
let flyerFiredThisLevel = false;
let flyerEl = null;          // the winged-tile DOM element, while one is on screen (any phase)
let flyerHeld = false;       // true once caught -- gates onTileClick to route into handleFlyerDrop
let flyerTargetPairId = null;
let flyerTimerRAF = null;
let flyerPointerMoveHandler = null;

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
    this.rings = [];
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

// A plain expanding ring for an ordinary match's "confirmed" ripple, or (shape:'hex') a
// six-sided ring echoing the board's own honeycomb tiles for the Wakan blast -- visually
// distinct from the round burst/jagged bolt used elsewhere, and from each other.
ParticleField.prototype.spawnRing = function (x, y, opts) {
    opts = opts || {};
    this.rings.push({
        x, y,
        shape: opts.shape || 'circle',
        r0: opts.r0 != null ? opts.r0 : 6,
        r1: opts.r1 != null ? opts.r1 : 70,
        width: opts.width || 3,
        rotation: opts.rotation || 0,
        color: opts.color || '212,166,75',
        life: opts.life || 0.5,
        age: 0,
    });
};

// Four-point glints (a magic-sparkle silhouette, not a circle) scattered around a point --
// the powerup family's signature, distinct from every tile-clear burst.
ParticleField.prototype.spawnSparkle = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 10;
    const spread = opts.spread || 46;
    const size = opts.size || 10;
    const color = opts.color || '255,255,255';
    const life = opts.life || 0.6;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * spread;
        this.particles.push({
            kind: 'sparkle',
            x: x + Math.cos(angle) * dist,
            y: y + Math.sin(angle) * dist,
            vx: 0, vy: 0, gravity: 0,
            size: size * (0.6 + Math.random() * 0.8),
            rot: Math.random() * Math.PI,
            spin: (Math.random() - 0.5) * 5,
            color,
            life: life * (0.75 + Math.random() * 0.5),
            age: 0,
        });
    }
};

// Heavier, desaturated motes drifting mostly DOWNWARD instead of the upward "reward" arc every
// other burst uses -- the mismatch/penalty family's signature: a setback should read as things
// falling, not popping.
ParticleField.prototype.spawnDust = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 14;
    const colors = opts.colors || ['138,74,64'];
    const spread = opts.spread || 30;
    const speed = opts.speed || 55;
    const life = opts.life || 0.7;
    const size = opts.size || 3;
    for (let i = 0; i < count; i++) {
        const angle = Math.PI * 0.5 + (Math.random() - 0.5) * 1.5; // a downward-biased cone
        const v = speed * (0.4 + Math.random() * 0.9);
        this.particles.push({
            kind: 'burst',
            x: x + (Math.random() - 0.5) * spread,
            y,
            vx: Math.cos(angle) * v * 0.4,
            vy: Math.sin(angle) * v,
            gravity: opts.gravity != null ? opts.gravity : 220,
            r: size * (0.55 + Math.random() * 0.7),
            color: colors[Math.floor(Math.random() * colors.length)],
            life: life * (0.7 + Math.random() * 0.5),
            age: 0,
        });
    }
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
    this.rings = this.rings.filter(r => { r.age += dt; return r.age < r.life; });
};

ParticleField.prototype.draw = function () {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (p.kind === 'sparkle') {
            const t = p.age / p.life;
            const alpha = 1 - t;
            // quick pop to full size, then a gentle shrink -- distinct silhouette AND motion
            // from the round burst dots (which only ever shrink).
            const scale = Math.sin(Math.min(t * 3, 1) * Math.PI / 2) * (1 - t * 0.25);
            const s = p.size;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot + p.spin * p.age);
            ctx.scale(scale, scale);
            ctx.fillStyle = `rgba(${p.color},${Math.max(alpha, 0)})`;
            ctx.beginPath();
            ctx.moveTo(0, -s); ctx.lineTo(s * 0.28, -s * 0.28); ctx.lineTo(s, 0); ctx.lineTo(s * 0.28, s * 0.28);
            ctx.lineTo(0, s); ctx.lineTo(-s * 0.28, s * 0.28); ctx.lineTo(-s, 0); ctx.lineTo(-s * 0.28, -s * 0.28);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            continue;
        }
        let alpha, r;
        if (p.kind === 'ambient') { alpha = p.alpha; r = p.r; }
        else { const t = p.age / p.life; alpha = 1 - t; r = p.r * (1 - t * 0.4); }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${Math.max(alpha, 0)})`;
        ctx.arc(p.x, p.y, Math.max(r, 0), 0, Math.PI * 2);
        ctx.fill();
    }
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
        if (r.shape === 'hex') {
            for (let i = 0; i < 6; i++) {
                const ang = (Math.PI / 3) * i - Math.PI / 2 + r.rotation;
                const px = r.x + Math.cos(ang) * rad;
                const py = r.y + Math.sin(ang) * rad;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
        } else {
            ctx.arc(r.x, r.y, Math.max(rad, 0), 0, Math.PI * 2);
        }
        ctx.stroke();
        ctx.restore();
    });
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
        // A bright pulse riding the bolt from end to end over its lifetime -- real traveling
        // current, not just a static jagged line.
        const segT = Math.min(t, 1) * (b.points.length - 1);
        const i0 = Math.min(Math.floor(segT), b.points.length - 2);
        const localT = segT - i0;
        const pA = b.points[i0], pB = b.points[i0 + 1];
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.shadowColor = `rgba(${b.color},1)`;
        ctx.shadowBlur = 18;
        ctx.arc(pA.x + (pB.x - pA.x) * localT, pA.y + (pB.y - pA.y) * localT, 3.5, 0, Math.PI * 2);
        ctx.fill();
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

    // Winged-tile "catch": a quick two-note upward chirp, brighter and quicker than sfxSelect
    // (which is what an ordinary tile pick sounds like) -- this is a reflex event, not a
    // deliberate choice, so the sound reads as "got it" rather than "selected".
    function sfxFlyerCatch() {
        if (!enabled) return;
        tone(noteFreq(6, 1), { type: 'square', duration: 0.07, gain: 0.13, attack: 0.002, filterFreq: 5000 });
        tone(noteFreq(9, 1), { type: 'square', duration: 0.1, gain: 0.12, delay: 0.05, attack: 0.002, filterFreq: 5000 });
    }

    // Shatter (missed the 4s window, or dropped on the wrong tile): a harsh, fast noise crack
    // with no tonal component at all -- deliberately the most "broken"-sounding effect in the
    // game, distinct from sfxMismatch's plain sawtooth blip (that's an ordinary wrong guess;
    // this is a bonus opportunity breaking apart).
    function sfxShatter() {
        if (!enabled) return;
        const t0 = ctx.currentTime;
        const src = ctx.createBufferSource();
        src.buffer = getNoiseBuffer();
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.setValueAtTime(300, t0);
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(2400, t0);
        bp.frequency.exponentialRampToValueAtTime(300, t0 + 0.16);
        bp.Q.value = 3;
        const ng = ctx.createGain();
        ng.gain.setValueAtTime(0.0001, t0);
        ng.gain.exponentialRampToValueAtTime(0.26, t0 + 0.006);
        ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
        src.connect(hp); hp.connect(bp); bp.connect(ng); ng.connect(sfxGain);
        src.start(t0);
        src.stop(t0 + 0.22);
    }

    // Wakan blast: sfxLightning's rising noise-crackle shape, but wider (more Q, more spread)
    // and paired with a falling-then-rising sparkle instead of a plain ascending one -- reads as
    // a bigger, more chaotic hit than a lightning chain, matching that it can clear several
    // pairs from a single catch rather than one shared phonetic family.
    function sfxWakanBlast(pairCount) {
        if (!enabled) return;
        const t0 = ctx.currentTime;
        const src = ctx.createBufferSource();
        src.buffer = getNoiseBuffer();
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(900, t0);
        bp.frequency.exponentialRampToValueAtTime(6000, t0 + 0.22);
        bp.Q.value = 3.5;
        const ng = ctx.createGain();
        ng.gain.setValueAtTime(0.0001, t0);
        ng.gain.exponentialRampToValueAtTime(0.28, t0 + 0.015);
        ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.32);
        src.connect(bp); bp.connect(ng); ng.connect(sfxGain);
        src.start(t0);
        src.stop(t0 + 0.34);

        const count = Math.max(2, Math.min(pairCount || 2, 8));
        const shape = [4, 1, 6, 3, 8, 5, 10, 7]; // falling-then-rising, distinct from lightning's plain ascent
        for (let i = 0; i < count; i++) {
            tone(noteFreq(shape[i % shape.length], 1), { type: 'triangle', duration: 0.16, gain: 0.12, delay: 0.04 + i * 0.05, attack: 0.003, filterFreq: 4600 });
        }
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

    // Streak-4 powerup grant: a bright rising major-feel arpeggio (outside the "in" scale on
    // purpose) so it reads as a distinct reward chime, not another variant of the match/streak
    // sounds it's layered right after.
    function sfxPowerup() {
        if (!enabled) return;
        const t0 = ctx.currentTime;
        [261.6, 329.6, 392.0, 523.3].forEach((f, i) => {
            tone(f, { type: 'square', duration: 0.22, gain: 0.09, delay: i * 0.055, attack: 0.005, filterFreq: 3200 });
        });
    }

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
        flyerCatch: sfxFlyerCatch,
        shatter: sfxShatter,
        wakanBlast: sfxWakanBlast,
        powerup: sfxPowerup,
    };
})();

function syncSoundButtons(on) {
    [
        [document.getElementById('sound-toggle'), document.getElementById('sound-icon')],
        [document.getElementById('board-sound-toggle'), document.getElementById('board-sound-icon')],
    ].forEach(([btn, icon]) => {
        btn.classList.toggle('on', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.title = on ? window.t('game.soundOff') : window.t('game.soundOn');
        icon.textContent = on ? '\u{1F50A}' : '\u{1F507}';
    });
}
document.getElementById('sound-toggle').addEventListener('click', () => syncSoundButtons(GameAudio.toggle()));
document.getElementById('board-sound-toggle').addEventListener('click', () => syncSoundButtons(GameAudio.toggle()));

// ---------------------------------------------------------------------------
// Board construction — a honeycomb of hexagon tiles, no grid/pathfinding: any two tiles can
// be clicked regardless of position, so the board can never get "stuck".
// ---------------------------------------------------------------------------
// Picks this playthrough's word set (levels hold several; replaying doesn't always show the
// same words) and splits its pairIds into two pools: `dealOrder`, shuffled and truncated to
// LEVEL_PAIR_COUNT -- the pairs actually in play, dealt VISIBLE_TARGET at a time via
// dealPairs() below -- and `fuel`, everything left over (25 - 20 = 5 pairs), which normal
// dealing never touches and only the "swap 3" powerup can draw from (see maybeGrantPowerup).
function pickWordSet(level) {
    currentSet = level.sets[Math.floor(Math.random() * level.sets.length)];
    const order = currentSet.map((_, i) => i);
    shuffleArray(order);
    return { dealOrder: order.slice(0, LEVEL_PAIR_COUNT), fuel: order.slice(LEVEL_PAIR_COUNT) };
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

// Materializes DOM tile objects for the given pairIds (from currentSet) and adds them to the
// board -- used both for the initial deal and for every later refill. `fresh` marks the newly
// dealt tiles with an entrance pop (see .tile.dealt-in in game.css) so a refill visibly reads
// as new cards arriving, not just a silent relayout -- `entranceClass` swaps in a different
// entrance (e.g. 'swap-in', a card-flip, for the swap-3 powerup's incoming tiles) instead of
// the default scale pop; ignored when `fresh` is false. `countsTowardDeal` (default true) gates
// whether this batch advances dealtCount -- the swap-3 powerup deals pairs pulled from
// powerupFuel, outside reserveQueue entirely, and must pass false so maybeRefill's "how much
// of reserveQueue is left" bookkeeping doesn't think reserveQueue is emptier than it is.
function dealPairs(pairIds, fresh, countsTowardDeal, entranceClass) {
    if (countsTowardDeal === undefined) countsTowardDeal = true;
    const useMn = window.siteLang() === 'mn';
    pairIds.forEach(pairId => {
        const p = currentSet[pairId];
        [
            { kind: 'jp', text: p.jp, sub: p.reading, phonetic: p.phonetic || null },
            { kind: 'en', text: (useMn && p.enMn) ? p.enMn : p.en, sub: '', phonetic: null },
        ].forEach(spec => {
            const t = { pairId, kind: spec.kind, text: spec.text, sub: spec.sub, phonetic: spec.phonetic, cleared: false };
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `tile tile-${t.kind}` + (fresh ? ' ' + (entranceClass || 'dealt-in') : '');
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

            tiles.push(t);
            if (!tilesByPairId[pairId]) tilesByPairId[pairId] = {};
            tilesByPairId[pairId][t.kind] = t;
        });
    });
    if (countsTowardDeal) dealtCount += pairIds.length;
    layoutTiles(tiles.filter(t => !t.cleared));
    resizeCanvases();
}

// Tops the board back up to VISIBLE_TARGET whenever REFILL_BATCH-or-more spots have opened up
// (recomputed fresh from `tiles` each time rather than hand-tracked, so it can't drift out of
// sync with what a blast/penalty/lightning-chain actually did to the board). Looped so a single
// big clear -- a lightning chain, or a Wakan blast -- can trigger more than one batch at once.
function maybeRefill() {
    let dealtAny = false;
    for (; ;) {
        const activePairs = new Set(tiles.filter(t => !t.cleared).map(t => t.pairId)).size;
        const gap = VISIBLE_TARGET - activePairs;
        const room = totalPairs - dealtCount;
        if (gap < REFILL_BATCH || room <= 0) break;
        const n = Math.min(REFILL_BATCH, room);
        dealPairs(reserveQueue.splice(0, n), true);
        dealtAny = true;
    }
    return dealtAny;
}

function renderBoard() {
    tiles = [];
    tilesByPairId = {};
    dealtCount = 0;
    const picked = pickWordSet(currentLevel);
    reserveQueue = picked.dealOrder;
    powerupFuel = picked.fuel;
    dealPairs(reserveQueue.splice(0, Math.min(VISIBLE_TARGET, totalPairs)), false);
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
        timeRemaining = Math.max(0, matchDuration + bonusSeconds - elapsedSeconds);
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
    timeRemaining = Math.max(0, matchDuration + bonusSeconds - elapsedSeconds);
    renderTimer();
    if (atX != null) floatText(atX, atY, '+' + (TIME_BONUS_PER_PAIR * pairCount) + window.t('game.secAbbr'), false, false, 'time-text');
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
    const pairsText = window.tf('game.pairsCount', { n: matchedCount, total: totalPairs });
    document.getElementById('board-pairs').textContent = pairsText;
    document.getElementById('board-moves').textContent = window.tf('game.movesCount', { n: moves });
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
            `<span class="family-chip-label">${escapeHtml(window.t('game.foundChipLabel'))}</span>`;
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
    const useMn = window.siteLang() === 'mn';
    let meanings;
    if (useMn && pair.meaningsMn && pair.meaningsMn.length) {
        meanings = pair.meaningsMn;
    } else if (pair.meanings && pair.meanings.length) {
        meanings = pair.meanings;
    } else {
        meanings = [(useMn && pair.enMn) ? pair.enMn : pair.en];
    }
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
        const exampleEnText = (window.siteLang() === 'mn' && pair.example.enMn) ? pair.example.enMn : pair.example.en;
        document.getElementById('example-sentence-en').textContent = exampleEnText;
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
    // While a caught winged tile is being carried, every board click is a drop attempt on it,
    // regardless of matchStarted/locked -- see handleFlyerDrop. Ordinary tile selection is
    // fully suspended for the four seconds the catch window lasts.
    if (flyerHeld) { handleFlyerDrop(tile); return; }
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

    const mid = midpoint(centerOf(a.el), centerOf(b.el));
    // A single gold ripple ring expanding from the midpoint between the two tiles is the
    // ordinary match's own signature -- reads as "these two just connected" as one event,
    // distinct from lightning's traveling bolts and Wakan's hex ring. The per-tile burst stays,
    // just smaller, as texture rather than the whole effect.
    fxField.spawnRing(mid.x, mid.y, { r0: 8, r1: 62, width: 3, color: '244,206,122', life: 0.42 });
    [a, b].forEach(t => {
        t.el.classList.add('match-pop');
        const c = centerOf(t.el);
        const rgb = hexToRgb(SUIT_COLORS[a.pairId % SUIT_COLORS.length]);
        fxField.spawnBurst(c.x, c.y, { count: 12, colors: ['212,166,75', '244,206,122', rgb], speed: 170, life: 0.75 });
    });

    floatText(mid.x, mid.y, '+' + gained);
    addTimeBonus(1, mid.x, mid.y + 24);

    const tierHit = streak % STREAK_TIER === 0;
    updateStreakMeter(tierHit);
    if (tierHit) {
        window.setTimeout(() => {
            floatText(mid.x, mid.y - 40, window.tf('game.streakFloat', { n: streak }), true);
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
        if (matchedCount === totalPairs) { finishLevel(); return; }
        maybeRefill();
        maybeArmFlyer();
        maybeGrantPowerup();
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

    // A 3+ pair chain is a bigger event than an ordinary match -- a brief cyan flash across the
    // whole board (see .board-wrap.lightning-flash in game.css) makes that difference felt
    // structurally, not just via a bigger number, the same way a penalty touches the whole
    // board rather than one tile.
    if (memberPairIds.length >= 3) {
        boardWrapEl.classList.remove('lightning-flash');
        void boardWrapEl.offsetWidth;
        boardWrapEl.classList.add('lightning-flash');
    }

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
    floatText(midPt.x, midPt.y, window.tf('game.lightningFloat', { n: memberPairIds.length }), true, true);
    addTimeBonus(memberPairIds.length, midPt.x, midPt.y + 30);
    if (tierHits.length) {
        window.setTimeout(() => floatText(midPt.x, midPt.y - 44, window.tf('game.streakFloat', { n: streak }), true), 220);
    }

    showExample(memberPairIds[0]);

    window.setTimeout(() => {
        chainTiles.forEach(t => { t.el.classList.remove('lightning-pop', 'selected'); t.el.classList.add('cleared'); t.cleared = true; });
        matchedCount += memberPairIds.length;
        selected = [];
        locked = false;
        updateStats();
        if (matchedCount === totalPairs) { finishLevel(); return; }
        maybeRefill();
        maybeArmFlyer();
        maybeGrantPowerup();
    }, 580);
}

function handleMismatch(a, b) {
    streak = 0;
    lastPowerupStreak = 0; // a fresh streak run starting over should be able to re-trigger a
    // powerup at the same tier number (e.g. 4) it already fired at earlier this level
    updateStreakMeter(false);
    GameAudio.mismatch();
    boardWrapEl.classList.remove('board-shake');
    void boardWrapEl.offsetWidth;
    boardWrapEl.classList.add('board-shake');
    [a, b].forEach(t => {
        t.el.classList.add('mismatch');
        // A mismatch had no particle effect at all before -- a few motes falling FROM the tile
        // (the burst/ring family everywhere else arcs upward) is a cheap but real "this failed"
        // signature, distinct in motion, not just color, from every reward effect.
        const c = centerOf(t.el);
        fxField.spawnDust(c.x, c.y - 14, { count: 14, colors: ['214,104,86', '150,66,58'], spread: 30, speed: 60, life: 0.65, size: 4.5 });
    });

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

    // Reshuffle the whole board on a penalty, not just reinsert the returned pair where it used
    // to sit -- makes the setback register as touching the whole board, not one tile quietly
    // reappearing. The penalty float-text below is what tells the player that's a consequence
    // of the penalty, not an unrelated glitch.
    const activeNow = tiles.filter(t => !t.cleared);
    shuffleArray(activeNow);
    layoutTiles(activeNow);
    resizeCanvases();

    [pt.jp, pt.en].forEach(t => {
        t.el.classList.add('penalty-return');
        window.setTimeout(() => t.el.classList.remove('penalty-return'), 700);
    });

    const c = centerOf(boardWrapEl);
    floatText(c.x, c.y, window.t('game.penaltyFloat'), true);
    GameAudio.penalty();

    // Dust falling across the whole board width (not just the returned pair) -- the shuffle
    // already makes the setback touch every tile; this makes it READ as a board-wide event
    // from the first frame, in the same falling-motes language as an ordinary mismatch but
    // wider and heavier, rather than reusing a reward-shaped burst for a punishment.
    const wrapRect = boardWrapEl.getBoundingClientRect();
    const mainRect = gameMain.getBoundingClientRect();
    const topY = wrapRect.top - mainRect.top + 10;
    for (let i = 0; i < 5; i++) {
        const x = wrapRect.left - mainRect.left + (wrapRect.width * (i + 0.5)) / 5;
        fxField.spawnDust(x, topY, { count: 14, colors: ['224,130,70', '196,90,74'], spread: wrapRect.width / 5, speed: 65, life: 0.95, gravity: 260, size: 4.5 });
    }
}

// ---------------------------------------------------------------------------
// Streak powerups. Every STREAK_POWERUP_INTERVAL (4) consecutive pairs cleared without a
// mismatch in between banks one charge, spendable at any later moment on whichever of the two
// toolbar buttons the player picks -- a free pair-clear, or a swap of 3 active pairs for 3
// fresh ones drawn from this round's unused fuel (see LEVEL_PAIR_COUNT/powerupFuel). Earning is
// automatic; spending, and which effect to spend it on, is always the player's call (see
// #powerup-clear-btn/#powerup-swap-btn's click handlers below). `lastPowerupStreak` guards
// against banking a second charge on every subsequent clear once the streak is sitting AT a
// multiple of 4 -- it only grants the instant the streak first REACHES that multiple, and
// resets to 0 on any mismatch (see handleMismatch) so a later run can grant at the same tier
// again.
// ---------------------------------------------------------------------------

function maybeGrantPowerup() {
    if (streak < STREAK_POWERUP_INTERVAL) return;
    if (streak % STREAK_POWERUP_INTERVAL !== 0) return;
    if (streak <= lastPowerupStreak) return;
    lastPowerupStreak = streak;
    powerupCharges++;
    updatePowerupUI();
    GameAudio.powerup();
    const c = centerOf(boardWrapEl);
    floatText(c.x, c.y - 40, window.t('game.powerupReadyFloat'), true);
}

// Reflects powerupCharges (and whether powerupFuel can still fund a swap) onto the two toolbar
// buttons -- called whenever either changes: a new charge banked, a charge spent, or a level
// start/restart. Doesn't gate on `locked`/flyerHeld -- a charge stays visibly available through
// a brief clear animation, the click handlers below are what actually reject a click mid-lock.
function updatePowerupUI() {
    const clearBtn = document.getElementById('powerup-clear-btn');
    const swapBtn = document.getElementById('powerup-swap-btn');
    const canUseAny = powerupCharges > 0;
    const canSwap = canUseAny && powerupFuel.length > 0;
    document.getElementById('powerup-clear-badge').textContent = String(powerupCharges);
    document.getElementById('powerup-swap-badge').textContent = String(powerupCharges);
    clearBtn.disabled = !canUseAny;
    swapBtn.disabled = !canSwap;
    clearBtn.classList.toggle('ready', canUseAny);
    swapBtn.classList.toggle('ready', canSwap);
    clearBtn.title = canUseAny ? window.t('game.powerupClearTitle') : window.t('game.powerupNoChargeTitle');
    swapBtn.title = canSwap ? window.t('game.powerupSwapTitle')
        : (canUseAny ? window.t('game.powerupSwapNoFuelTitle') : window.t('game.powerupNoChargeTitle'));
}

// Spends one charge to clear a random still-active pair, same as landing a real match -- counts
// toward matchedCount and can finish the level. Never targets the current Wakan flyer's pair:
// that tile's board copy needs to stay put for the flyer event still in flight/held above it.
function grantFreeClearPowerup() {
    const activePairIds = [...new Set(tiles.filter(t => !t.cleared && t.pairId !== flyerTargetPairId).map(t => t.pairId))];
    if (!activePairIds.length) return;
    const pairId = activePairIds[Math.floor(Math.random() * activePairIds.length)];
    const pt = tilesByPairId[pairId];
    if (!pt || !pt.jp || !pt.en) return;

    locked = true;
    GameAudio.powerup();
    const mid = midpoint(centerOf(pt.jp.el), centerOf(pt.en.el));
    floatText(mid.x, mid.y - 30, window.t('game.powerupFreeFloat'), true);
    // Star-shaped sparkle glints, not round burst dots -- the powerup family's own silhouette,
    // shared with (but colored apart from) the swap effect below, distinct from every tile-clear
    // burst/ring used elsewhere.
    fxField.spawnRing(mid.x, mid.y, { r0: 4, r1: 46, width: 2, color: '110,224,165', life: 0.35 });
    [pt.jp, pt.en].forEach(t => {
        t.el.classList.add('powerup-pop');
        const c = centerOf(t.el);
        fxField.spawnSparkle(c.x, c.y, { count: 14, color: '110,224,165', size: 11, spread: 34, life: 0.65 });
    });

    window.setTimeout(() => {
        [pt.jp, pt.en].forEach(t => { t.el.classList.remove('powerup-pop'); t.el.classList.add('cleared'); t.cleared = true; });
        matchedCount++;
        locked = false;
        updateStats();
        if (matchedCount === totalPairs) { finishLevel(); return; }
        maybeRefill();
        maybeArmFlyer();
    }, 520);
}

// Spends one charge to swap POWERUP_SWAP_COUNT random active pairs for the same number of fresh
// ones drawn from powerupFuel (this round's un-dealt leftovers -- see pickWordSet). Neither side
// counts toward matchedCount: the outgoing pairs aren't matched, they're discarded, and
// totalPairs doesn't change -- 3 of the 20 words in play just became 3 different words. The
// swap button is disabled once powerupFuel runs dry (see updatePowerupUI), so the `n <= 0`
// bail below is only a defensive backstop, not a normal path.
function grantSwapPowerup() {
    const activePairIds = [...new Set(tiles.filter(t => !t.cleared && t.pairId !== flyerTargetPairId).map(t => t.pairId))];
    const n = Math.min(POWERUP_SWAP_COUNT, activePairIds.length, powerupFuel.length);
    if (n <= 0) return;

    locked = true;
    shuffleArray(activePairIds);
    const outgoing = activePairIds.slice(0, n);
    const incoming = powerupFuel.splice(0, n);

    GameAudio.powerup();
    const outTiles = [];
    outgoing.forEach(pairId => {
        const pt = tilesByPairId[pairId];
        if (pt.jp) outTiles.push(pt.jp);
        if (pt.en) outTiles.push(pt.en);
    });
    // Outgoing tiles get a 3D card-flip away (see .tile.powerup-swap-out in game.css) instead of
    // a plain shrink/fade -- reads literally as "this card is being swapped out", and the
    // pink sparkle (vs. the clear powerup's mint) keeps the two effects tellable apart at a
    // glance despite sharing the same star silhouette as one "powerup family".
    outTiles.forEach(t => {
        t.el.classList.add('powerup-swap-out');
        const c = centerOf(t.el);
        fxField.spawnSparkle(c.x, c.y, { count: 10, color: '224,110,190', size: 9, spread: 26, life: 0.5 });
    });
    const mid = centerOf(boardWrapEl);
    floatText(mid.x, mid.y, window.t('game.powerupSwapFloat'), true);

    window.setTimeout(() => {
        outTiles.forEach(t => t.el.remove());
        tiles = tiles.filter(t => !outgoing.includes(t.pairId));
        outgoing.forEach(pairId => { delete tilesByPairId[pairId]; });
        // 'swap-in' flips the new cards in from the opposite face instead of the ordinary
        // scale-pop deal -- reads as the other half of the same flip the outgoing tiles just did.
        dealPairs(incoming, true, false, 'swap-in');
        locked = false;
        updatePowerupUI(); // powerupFuel just shrank -- the swap button may need to disable
        maybeArmFlyer();
    }, 420);
}

document.getElementById('powerup-clear-btn').addEventListener('click', () => {
    if (powerupCharges <= 0 || locked || flyerHeld) return;
    powerupCharges--;
    updatePowerupUI();
    grantFreeClearPowerup();
});
document.getElementById('powerup-swap-btn').addEventListener('click', () => {
    if (powerupCharges <= 0 || powerupFuel.length <= 0 || locked || flyerHeld) return;
    powerupCharges--;
    updatePowerupUI();
    grantSwapPowerup();
});

// ---------------------------------------------------------------------------
// Wakan "winged tile" bonus event.
//
// A Sino-Japanese/native-Japanese partner (see dictionary-data.js -- the same kango/wago pairs
// behind the Kango<->Wago tab on dictionary.html) of a word currently dealt on the board flies
// across it.
// Click it to catch it -- it comes off the board onto the pointer -- then drop it on its
// partner within WAKAN_CATCH_MS. A correct drop blast-clears that pair plus up to
// WAKAN_BLAST_EXTRA neighbouring pairs (and, always, THEIR partners too -- a neighbour is never
// cleared without its own match, or a tile would be stranded with nothing left to pair with,
// breaking the board's "always a legal move" guarantee the same way a naive positional clear
// would). A miss -- wrong tile, or the window running out -- shatters the tile with no penalty;
// it was a free bonus, not a trap.
// ---------------------------------------------------------------------------

// Built once, lazily, from DICTIONARY_ENTRIES (dictionary-data.js, loaded before this file --
// see game.html) -- word text -> its Wakan partner. Looked up by either side (kango or wago),
// since a word dealt on the board could be either half of a pair.
function buildWakanMap() {
    if (wakanMap) return wakanMap;
    wakanMap = new Map();
    const add = (key, info) => { if (!wakanMap.has(key)) wakanMap.set(key, info); };
    DICTIONARY_ENTRIES.forEach(p => {
        const kInfo = { partner: p.wago.text, partnerReading: p.wago.reading, meaning: p.meaning, meaningMn: p.meaningMn };
        const wInfo = { partner: p.kango.text, partnerReading: p.kango.reading, meaning: p.meaning, meaningMn: p.meaningMn };
        add(p.kango.text, kInfo);
        add(p.wago.text, wInfo);
        // dictionary-data.js cites a suru-verb in full dictionary form ("終了する") and every
        // na-adjective with its trailing な ("綺麗な"), but game-words.js often deals the same
        // word bare ("終了", "綺麗") -- the two datasets were built independently and never
        // reconciled on this. Indexing the stripped form too means the board word still links;
        // the flyer itself always shows wk.partner/partnerReading, unaffected either way and
        // always the correct full form.
        [[p.kango.text, kInfo], [p.wago.text, wInfo]].forEach(([text, info]) => {
            if (text.endsWith('する')) add(text.slice(0, -2), info);
            else if (p.pos === 'adjective' && text.endsWith('な')) add(text.slice(0, -1), info);
        });
    });
    return wakanMap;
}

// Checked after every clear (a match, a lightning chain, or a refill uncovering a new word).
// Fires at most once per level: no earlier than WAKAN_TRIGGER_FRACTION cleared, and only once
// at least one currently-active (dealt, uncleared) word actually has a Wakan partner -- so the
// event can never target something that isn't on screen. If the fraction is already past but
// nothing eligible is active yet, this just tries again on the next clear/refill; it does not
// wait or poll on its own.
function maybeArmFlyer() {
    if (flyerFiredThisLevel || flyerEl) return;
    if (matchedCount < Math.floor(totalPairs * WAKAN_TRIGGER_FRACTION)) return;
    const map = buildWakanMap();
    const candidates = tiles.filter(t => t.kind === 'jp' && !t.cleared && map.has(t.text));
    if (!candidates.length) return;
    flyerFiredThisLevel = true;
    spawnFlyer(candidates[Math.floor(Math.random() * candidates.length)]);
}

function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function spawnFlyer(targetTile) {
    const wk = wakanMap.get(targetTile.text);
    flyerTargetPairId = targetTile.pairId;

    const el = document.createElement('div');
    el.className = 'flyer';
    el.innerHTML = '<div class="flyer-clock"></div>' +
        '<div class="flyer-wing l"></div><div class="flyer-wing r"></div>' +
        `<div class="flyer-body"><span class="flyer-reading">${escapeHtml(wk.partnerReading)}</span>` +
        `<span class="flyer-text">${escapeHtml(wk.partner)}</span></div>`;
    el.addEventListener('click', catchFlyer);
    boardWrapEl.appendChild(el);
    flyerEl = el;

    const reduced = prefersReducedMotion();
    const topPct = 18 + Math.random() * 55;
    if (reduced) {
        el.style.top = topPct + '%';
        el.style.left = '50%';
        el.style.transform = 'translateX(-50%)';
    } else {
        el.style.top = topPct + '%';
        const wrapWidth = boardWrapEl.clientWidth;
        el.style.left = '-140px';
        tween(-140, wrapWidth + 140, 7000, v => {
            // flyerEl !== el: shattered, or the level moved on mid-flight. flyerHeld: THIS tile
            // was caught -- catchFlyer() has already taken over positioning it (position:fixed,
            // following the pointer), and tween's own rAF loop runs for the full 7000ms
            // regardless of being caught, so without this check it would keep overwriting
            // el.style.left with the flight path's position on every subsequent frame, right on
            // top of wherever the pointer actually is.
            if (flyerEl !== el || flyerHeld) return;
            el.style.left = v + 'px';
        });
    }

    window.setTimeout(() => {
        if (flyerEl !== el || flyerHeld) return; // already caught (or already gone)
        killFlyer(); // flew across untouched -- not a miss worth a shatter, just gone
    }, 7000);
}

function catchFlyer(e) {
    if (!flyerEl || flyerHeld) return;
    e.stopPropagation();
    flyerHeld = true;
    GameAudio.flyerCatch();

    const el = flyerEl;
    el.classList.add('held');
    // Clear the top/left the flight phase set inline (a random top%, and left tweened from
    // -140px across the board) -- .flyer.held's own top:0/left:0 in CSS can't override an
    // inline style, so without this the translate() below stacked on top of wherever the
    // flight happened to leave it, and the tile snapped further from the cursor the later into
    // the flight it was caught.
    el.style.top = '0px';
    el.style.left = '0px';
    el.style.transform = '';
    moveFlyerTo(e.clientX, e.clientY);
    flyerPointerMoveHandler = ev => moveFlyerTo(ev.clientX, ev.clientY);
    window.addEventListener('pointermove', flyerPointerMoveHandler, { passive: true });
    boardWrapEl.classList.add('carrying-flyer');

    const t0 = performance.now();
    const clock = el.querySelector('.flyer-clock');
    const tick = () => {
        if (flyerEl !== el || !flyerHeld) return;
        const left = WAKAN_CATCH_MS - (performance.now() - t0);
        if (left <= 0) { shatterFlyer(); return; }
        if (clock) clock.textContent = (left / 1000).toFixed(1) + window.t('game.secAbbr');
        const gone = 1 - left / WAKAN_CATCH_MS; // 0 at catch -> 1 at timeout
        el.style.setProperty('--shake-dur', (0.44 - 0.3 * gone).toFixed(3) + 's');
        el.style.setProperty('--shake-amp', (1.5 + 5.5 * gone).toFixed(2) + 'px');
        el.style.setProperty('--shake-rot', (0.6 + 3.4 * gone).toFixed(2) + 'deg');
        flyerTimerRAF = requestAnimationFrame(tick);
    };
    flyerTimerRAF = requestAnimationFrame(tick);
}

function moveFlyerTo(x, y) {
    if (flyerEl) flyerEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
}

// Tears down the winged-tile DOM/listeners with no visual "failure" effect -- used both when a
// flyer crosses the board unclicked (nothing was attempted, nothing to punish) and when a
// level ends with one in flight.
function killFlyer() {
    if (flyerTimerRAF) cancelAnimationFrame(flyerTimerRAF);
    flyerTimerRAF = null;
    if (flyerPointerMoveHandler) window.removeEventListener('pointermove', flyerPointerMoveHandler);
    flyerPointerMoveHandler = null;
    boardWrapEl.classList.remove('carrying-flyer');
    if (flyerEl) flyerEl.remove();
    flyerEl = null;
    flyerHeld = false;
    flyerTargetPairId = null;
}

// A caught tile broke apart -- either the 4s window ran out, or it was dropped on the wrong
// tile (see handleFlyerDrop). No score/time/streak penalty either way: it was a free bonus
// opportunity, not a trap, so failing it should only cost the bonus itself.
function shatterFlyer() {
    if (!flyerEl) return;
    const rect = flyerEl.getBoundingClientRect();
    spawnShards(rect);
    GameAudio.shatter();
    killFlyer();
}

function spawnShards(rect) {
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    const cuts = [
        ['polygon(50% 0,100% 25%,50% 50%)', 55, -64, -30],
        ['polygon(100% 25%,100% 75%,50% 50%)', 85, 18, 40],
        ['polygon(100% 75%,50% 100%,50% 50%)', 32, 80, 110],
        ['polygon(50% 100%,0 75%,50% 50%)', -50, 72, 170],
        ['polygon(0 75%,0 25%,50% 50%)', -86, 9, -160],
        ['polygon(0 25%,50% 0,50% 50%)', -40, -68, -100],
    ];
    cuts.forEach(([clip, dx, dy, rot]) => {
        const s = document.createElement('div');
        s.className = 'flyer-shard';
        s.style.left = (cx - rect.width / 2) + 'px';
        s.style.top = (cy - rect.height / 2) + 'px';
        s.style.width = rect.width + 'px';
        s.style.height = rect.height + 'px';
        s.style.clipPath = clip;
        s.style.setProperty('--dx', dx + 'px');
        s.style.setProperty('--dy', dy + 'px');
        s.style.setProperty('--rot', rot + 'deg');
        document.body.appendChild(s);
        window.setTimeout(() => s.remove(), 750);
    });
}

// A tile was dropped while a flyer was being carried -- routed here from onTileClick, which
// suspends ordinary selection entirely for the duration of the catch window (see flyerHeld).
function handleFlyerDrop(tile) {
    if (tile.kind !== 'jp' || tile.cleared || tile.pairId !== flyerTargetPairId) {
        shatterFlyer();
        return;
    }
    const pairIds = computeBlastPairIds(tile);
    killFlyer();
    // Every other clear path (handleMatch, handleLightningChain) is only ever entered with
    // the board already locked -- they're reached through onTileClick's normal two-tile-click
    // flow, which sets `locked = true` before the resolve delay even starts, and each one resets
    // it at the end of its own animation. The blast is reached through the separate flyerHeld
    // branch instead, which never locked anything, so without this the board stayed fully
    // clickable for the whole pending-clear window -- long enough to start a second, overlapping
    // clear on one of the very tiles already mid-blast, corrupting matchedCount and leaving that
    // tile in a state neither clear path expected.
    locked = true;
    resolveWakanBlast(pairIds, tile.pairId);
}

// The dropped-on pair, plus up to WAKAN_BLAST_EXTRA more pairs physically touching it on the
// honeycomb (nearest first) -- and, for every one of those, its partner too, whether or not the
// partner itself was within reach. Clearing a neighbour without its partner would strand a tile
// with no match left on the board, so partners are never optional.
function computeBlastPairIds(dropTile) {
    const homeRect = dropTile.el.getBoundingClientRect();
    const home = { x: homeRect.left + homeRect.width / 2, y: homeRect.top + homeRect.height / 2 };
    const reach = homeRect.width * 1.35; // one ring of neighbouring hexes
    const others = tiles
        .filter(t => !t.cleared && t.pairId !== dropTile.pairId)
        .map(t => {
            const r = t.el.getBoundingClientRect();
            const c = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
            return { t, d: Math.hypot(c.x - home.x, c.y - home.y) };
        })
        .filter(o => o.d <= reach)
        .sort((a, b) => a.d - b.d);

    const pairIds = new Set([dropTile.pairId]);
    for (const o of others) {
        if (pairIds.size > WAKAN_BLAST_EXTRA) break;
        pairIds.add(o.t.pairId);
    }
    return pairIds;
}

function resolveWakanBlast(pairIds, targetPairId) {
    const clearTiles = [];
    pairIds.forEach(pairId => {
        const pt = tilesByPairId[pairId];
        if (pt.jp && !pt.jp.cleared) clearTiles.push(pt.jp);
        if (pt.en && !pt.en.cleared) clearTiles.push(pt.en);
    });

    GameAudio.wakanBlast(pairIds.size);

    let gainedTotal = 0;
    const tierHits = [];
    pairIds.forEach(() => {
        streak += 1;
        gainedTotal += 10 * (1 + Math.floor(streak / STREAK_TIER));
        if (streak % STREAK_TIER === 0) tierHits.push(streak);
    });
    setScore(score + gainedTotal);
    updateStreakMeter(tierHits.length > 0);
    tierHits.forEach((s, idx) => window.setTimeout(() => GameAudio.streak(), 180 + idx * 140));

    const centers = clearTiles.map(t => centerOf(t.el));
    const midPt = centers.reduce((acc, c) => ({ x: acc.x + c.x, y: acc.y + c.y }), { x: 0, y: 0 });
    midPt.x /= centers.length; midPt.y /= centers.length;

    // A honeycomb ring is the Wakan blast's own signature -- echoes the board's own hex tiles
    // rather than a generic circle, distinct from match's round ripple and lightning's bolts.
    // Two nested rings at slightly different rotations/timing read as a "linking" pulse rather
    // than a single flat pop.
    fxField.spawnRing(midPt.x, midPt.y, { shape: 'hex', r0: 12, r1: 130, width: 3, color: '138,131,190', life: 0.68 });
    fxField.spawnRing(midPt.x, midPt.y, { shape: 'hex', r0: 6, r1: 90, width: 2, color: '244,206,122', life: 0.5, rotation: Math.PI / 6 });
    clearTiles.forEach(t => {
        t.el.classList.add('wakan-pop');
        const c = centerOf(t.el);
        fxField.spawnBurst(c.x, c.y, { count: 12, colors: ['138,131,190', '244,206,122', '255,255,255'], speed: 190, life: 0.8 });
    });

    floatText(midPt.x, midPt.y, window.tf('game.wakanFloat', { n: pairIds.size }), true, false, 'wakan-text');
    addTimeBonus(pairIds.size, midPt.x, midPt.y + 30);
    if (tierHits.length) {
        window.setTimeout(() => floatText(midPt.x, midPt.y - 44, window.tf('game.streakFloat', { n: streak }), true), 220);
    }

    showExample(targetPairId);

    window.setTimeout(() => {
        clearTiles.forEach(t => { t.el.classList.remove('wakan-pop', 'selected'); t.el.classList.add('cleared'); t.cleared = true; });
        matchedCount += pairIds.size;
        selected = [];
        locked = false;
        updateStats();
        if (matchedCount === totalPairs) { finishLevel(); return; }
        maybeRefill();
        maybeGrantPowerup();
    }, 620);
}

// ---------------------------------------------------------------------------
// Level select <-> board screens
// ---------------------------------------------------------------------------
// level.title (from game-words.js) is English-only, e.g. "N5 · Level 1" — built here from
// i18n instead, the same way grammar.js/reading.js build their level titles, rather than
// reading the raw data-file field directly.
function levelTitle(level) {
    const withinTier = ((level.level - 1) % 10) + 1;
    return `${level.jlpt} · ${window.tf('game.levelN', { n: withinTier })}`;
}

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

        const progress = progressCache[level.level];
        let metaHtml = `<span>${escapeHtml(window.t('game.notPlayedYet'))}</span>`;
        if (progress && progress.completed) {
            metaHtml = `<span class="completed">&#10003; ${escapeHtml(window.t('game.completed'))}</span>` +
                `<span>${escapeHtml(window.tf('game.bestTimeMoves', { time: formatTime(progress.best_time_seconds), moves: progress.best_moves }))}</span>`;
        }

        card.innerHTML = `
            <span class="level-badge">${escapeHtml(level.jlpt)}</span>
            <h2>${escapeHtml(levelTitle(level))}</h2>
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
    // there's no "next" after the last level (50), so that case falls back to Play Again.
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
