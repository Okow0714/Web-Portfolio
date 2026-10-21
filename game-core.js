// Word Match — constants, shared mutable state, and small helpers.
//
// Every top-level binding more than one game file reads or writes lives here, so there is one
// place to see what a level carries. Loaded first of the game files.
//
// Word Match is split across game-core.js, game-fx.js, game-gate.js, game-memory.js and
// game.js, loaded in that order by game.html. They are classic scripts sharing one global
// scope, so each can read and assign the others' top-level `let`s and call their functions.
// The one rule is load order: code that runs while a file is loading may only use what an
// EARLIER file defined. Listeners and animation-frame callbacks run later, so they are free to
// reach forward.
//
// The game became a memory game on 2026-10-21. game-board.js, game-play.js and game-wakan.js
// were retired with the honeycomb-matching board, along with the clock, the streak meter, the
// powerups, the lightning chain and the Wakan flyer: all of them were rules about a board where
// every tile is face up, and none of them survive a board where none of them are.

// Aliased as `sb`, not `supabaseClient` — see the note in supabase-app.js about why reusing
// that identifier across <script> tags would throw a SyntaxError.
const sb = window.supabaseClient;

// Decorative board backgrounds: real castle/mountain photography, cycled per level so adjacent
// levels don't repeat the same scene, rendered at low opacity behind the board (see
// .game-main::before in game.css). All sourced from Wikimedia Commons; full attribution on
// credits.html (#word-game-photos), linked from every page's footer. Licenses are a mix of CC0,
// public domain, and CC BY / CC BY-SA 2.5-4.0 — never CC BY-NC or anything requiring share-alike
// on the whole site.
// Each has a night counterpart of the same name under images/game-bg/night/, shown in dark mode
// (see applyBoardBg in game.js). Same landmark in both, except the hikone slot: no night
// photograph of Hikone Castle exists on Commons, so it shows Hirosaki Castle's keep instead —
// credited as such on credits.html.
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

// Background music, one pool per JLPT tier (N4 and N5 share the lofi pool) — real licensed
// tracks, not synthesized, per the site owner's explicit direction. All from the "alex-morgan"
// modern-jazz collection on Pixabay Music, under Pixabay's site-wide Content License (verified:
// permits commercial/game use, no attribution required; only forbids reselling the bare audio
// file standalone, which doesn't apply to embedding it as background music). Re-encoded from the
// 256kbps originals down to 112kbps. Full credits on credits.html (#word-game-music).
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
// Plays on the gate (all tiers, before a level is chosen) — separate from any tier's pool.
const LEVEL_SELECT_TRACK = 'sound/game-music/all-levels-jazzy-pop-piano.mp3';

// ---------------------------------------------------------------------------
// The shape of a level
// ---------------------------------------------------------------------------
// A level's entry in game-words.js holds 25 words. A memory board of 25 pairs would be 50
// face-down tiles, which is not a memory test so much as a punishment, so a level is dealt as
// four consecutive HANDS of 6 pairs — 24 of the 25 — each with its own bonus round. Clearing
// all four completes the level, so a level still teaches its whole word set.
//
// MAIN_PAIRS * HANDS_PER_LEVEL must stay at or under the smallest level's word count. A few
// levels are still short of 25 from the mid-expansion data, so dealHand() floors at what the
// level actually has rather than trusting this arithmetic.
const MAIN_PAIRS = 6;
const HANDS_PER_LEVEL = 4;
const BONUS_PAIRS = 4;

// The row lengths of the main board: 12 tiles, each row centred, so the silhouette mirrors down
// the middle. The gate lays its twelve levels out in the same shape, which is the point — the
// level select is a picture of the board it opens.
const MAIN_ROWS = [3, 4, 3, 2];
const MAIN_COLS = 4;

// Four seconds of bonus, face up. Long enough to clear two pairs if you read fast, never long
// enough to clear four by reading alone — it has to be partly memory of the hand just played.
const BONUS_MS = 4000;
// A hint turns two tiles over and costs clicks. Three is the price of guessing the same pair
// wrong once and a half, which is about what a hint is worth.
const HINT_COST = 3;

// ---------------------------------------------------------------------------
// Mutable state shared across the game files
// ---------------------------------------------------------------------------
let tiles = [];            // the tiles currently dealt (one hand, or one bonus round)
let phase = 'gate';        // gate | preview | play | between | bonus | done
let handIndex = 0;         // 0-based hand within the level
let clicks = 0;            // the score: every tile click, plus HINT_COST per hint
let misses = 0;            // wrong guesses, level-wide, main round and bonus alike
let pairsThisHand = 0;
let bonusPairs = 0;        // bonus pairs cleared across the whole level
let hints = 0;
let elapsedSeconds = 0;    // a stopwatch, not a clock: nothing runs out

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
    return arr;
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255].join(',');
}
