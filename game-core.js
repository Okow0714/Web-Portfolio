// Word Match — constants, all mutable game state, and small helpers.
//
// Every top-level `let` the game reads or writes lives here, so there is one place to see
// what state a level carries. Loaded first of the game files.
//
// Word Match is split across game-core.js, game-fx.js, game-board.js, game-play.js,
// game-wakan.js and game.js, loaded in that order by game.html. They are classic scripts
// sharing one global scope, so each can read and assign the others’ top-level `let`s and
// call their functions. The one rule is load order: code that runs while a file is loading
// may only use what an EARLIER file defined. Listeners and requestAnimationFrame callbacks run
// later, so they are free to reach forward.

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
// Must stay equal to STREAK_POWERUP_INTERVAL below. This drives the streak meter, the score
// multiplier step and the audio tier -- everything the player can see or hear about a streak --
// while the powerup is granted on its own interval. At 3 against a powerup interval of 4 the bar
// filled up and flashed with no reward, then the reward arrived mid-way through the next fill,
// which reads as a broken meter. One rhythm, and 4 is the number every string on the site
// already quotes.
const STREAK_TIER = 4;

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
const STREAK_POWERUP_INTERVAL = 4; // keep STREAK_TIER above equal to this
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
let activeJlptTab = 'N5'; // level-select screen: which JLPT tier's levels are shown
// Consecutive lightning chains, without a mismatch in between. Each one is worth more than the
// last, which turns the chain from a bonus you take when you spot one into a stake you are
// carrying: with a x3 running, attempting a family you are only half sure of costs you the
// multiplier as well as the usual penalty. That is the decision the board was missing -- play
// safe pairs and keep it, or back your reading of the kanji and go again.
let chainCombo = 0;
const CHAIN_COMBO_MAX = 5;
// Words this learner has actually got wrong (word_stats, written by word-stats.js). Used to
// weight the deal, not to change what a level contains: a level's set is fixed, this only
// decides which of it reaches the board first.
let missedWords = new Set();
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

