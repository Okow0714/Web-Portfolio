// The background track and the four-step volume, for Word Match and Grammar Connect.
//
// Both tools play a looping licensed track under the level select and the board, and both
// drive it from one speaker button that steps 3 -> 2 -> 1 -> 0. This used to be written out
// twice, once inside game-audio.js and once inside grammar.js, line for line. It is one
// factory now; each page makes its own player from it.
//
// A plain HTMLAudioElement, not the Web Audio graph the synthesised effects use: the two mix
// at the OS level, so the file never needs routing through an AudioContext, and fading
// .volume gives a fade rather than a hard cut when the sound is switched.
//
//   const music = createMusicPlayer({ onLevel(level, gain) { ... } });
//   music.setTrack('sound/x.mp3');   music.cycleLevel();   music.getLevel();
//
// onLevel is optional and is called with the new step and its gain (0..1) whenever the level
// changes -- Word Match uses it to move its effects' master gain in step with the music.
window.createMusicPlayer = function (options) {
    const onLevel = (options && options.onLevel) || function () {};

    // Four levels, not a flag: 0 muted, 3 full. Not evenly spaced because loudness is not
    // linear -- 0.30 / 0.60 / 1.00 reads as three even steps.
    const VOLUME_STEPS = [0, 0.30, 0.60, 1];
    const MAX_LEVEL = VOLUME_STEPS.length - 1;
    // Shared by every tool that makes a sound (desk-sfx.js reads it too) and synced to the
    // account by auth-shared.js.
    const VOLUME_KEY = 'khanjp-volume';
    const MUSIC_VOLUME = 0.35;   // the element's volume at level 3

    function storedLevel() {
        try {
            const v = parseInt(localStorage.getItem(VOLUME_KEY), 10);
            return (v >= 0 && v <= MAX_LEVEL) ? v : MAX_LEVEL;
        } catch (e) { return MAX_LEVEL; }   // private mode
    }

    let level = storedLevel();
    let el = null;
    let fadeTimer = null;

    function target() { return MUSIC_VOLUME * VOLUME_STEPS[level]; }

    function element() {
        if (el) return el;
        el = new Audio();
        el.loop = true;
        el.volume = 0;
        el.preload = 'none';
        return el;
    }

    function fadeTo(to, ms) {
        if (fadeTimer) { window.clearInterval(fadeTimer); fadeTimer = null; }
        const a = element();
        const from = a.volume;
        const steps = Math.max(1, Math.round(ms / 50));
        let i = 0;
        fadeTimer = window.setInterval(() => {
            i++;
            a.volume = from + (to - from) * (i / steps);
            if (i >= steps) {
                a.volume = to;
                window.clearInterval(fadeTimer);
                fadeTimer = null;
                if (to === 0) a.pause();
            }
        }, 50);
    }

    function play() {
        // Rejected until the visitor has interacted with the page; the gesture retry below
        // covers that, so the rejection itself is not an error.
        element().play().catch(() => {});
    }

    // Always restarts the chosen track from its beginning, unless that very track is already
    // playing -- re-entering the level select must not restart its music.
    function setTrack(src) {
        const a = element();
        if (a.src === new URL(src, window.location.href).href && !a.paused) return;
        a.src = src;
        a.currentTime = 0;
        if (level > 0) {
            a.volume = 0;
            play();
            fadeTo(target(), 900);
        }
    }

    // The single entry point for volume, so the stored preference, the fade and whatever the
    // page hangs on onLevel can never drift apart.
    function setLevel(next) {
        level = Math.max(0, Math.min(MAX_LEVEL, next | 0));
        try { localStorage.setItem(VOLUME_KEY, String(level)); } catch (e) { /* private mode */ }
        onLevel(level, VOLUME_STEPS[level]);
        if (level > 0) {
            // Re-fades to the new target even when already playing. Nothing to start before a
            // track has been chosen.
            if (el && el.src) { play(); fadeTo(target(), 900); }
        } else if (el) {
            fadeTo(0, 400);
        }
        return level;
    }

    // Browsers block the very first play() without a user gesture, and the level select asks
    // for its track at page load, before any click. Retry once on the first real interaction
    // so the page is not stuck silent all session.
    const kick = () => {
        document.removeEventListener('pointerdown', kick);
        document.removeEventListener('keydown', kick);
        if (level > 0 && el && el.paused && el.src) play();
    };
    document.addEventListener('pointerdown', kick);
    document.addEventListener('keydown', kick);

    return {
        setTrack: setTrack,
        setLevel: setLevel,
        getLevel: () => level,
        gain: () => VOLUME_STEPS[level],
        // Down first, because someone reaching for the speaker mid-level almost always wants
        // it quieter.
        cycleLevel: () => setLevel(level <= 0 ? MAX_LEVEL : level - 1),
    };
};
