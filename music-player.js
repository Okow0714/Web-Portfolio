// The background track and its four-step volume, for Word Match and Grammar Connect.
//
// Both tools play a licensed track under the level select and the board. This used to be written
// out twice, once inside game-audio.js and once inside grammar.js, line for line. It is one factory
// now; each page makes its own player from it.
//
// A plain HTMLAudioElement, not the Web Audio graph the synthesised effects use: the two mix at the
// OS level, so the file never needs routing through an AudioContext, and fading .volume gives a
// fade rather than a hard cut when the sound is switched.
//
//   const music = createMusicPlayer({ tool: 'game' });
//   music.setTrack('sound/x.mp3', 'select');   // or 'level'
//   music.setLevel(2);   music.cycleLevel();   music.getLevel();
//
// SINCE 2026-11-19 each tool has its OWN music level (audio-prefs.js), and two choices from the
// Settings page shape when it plays:
//   * 'select' music can be muted, so the level select is quiet and the music starts with a level;
//   * 'level' music can play "now and then": the track once, then a quiet spell of one to four
//     minutes chosen at random, then again -- music that arrives and leaves rather than looping
//     under every minute of practice.
window.createMusicPlayer = function (options) {
    const tool = (options && options.tool) || 'game';
    const MUSIC_VOLUME = 0.35;            // the element's volume at level 3
    const QUIET_MIN = 60 * 1000, QUIET_MAX = 240 * 1000;
    const A = window.KhanAudio;           // audio-prefs.js, loaded first on every page that plays

    let level = A ? A.level(tool, 'music') : 3;
    let context = 'select';
    let el = null;
    let fadeTimer = null;
    let quietTimer = null;

    const gain = n => A ? A.gain(n) : [0, 0.30, 0.60, 1][n];
    function target() { return MUSIC_VOLUME * (A ? A.volume(tool, 'music') / 100 : gain(level)); }
    function wanted() { return level > 0 && !(context === 'select' && A && A.selectMusic() === 'mute'); }
    function sparse() { return context === 'level' && A && A.flow() === 'sparse'; }

    function element() {
        if (el) return el;
        el = new Audio();
        el.volume = 0;
        el.preload = 'none';
        if (A) A.useSpeaker(el);
        // "Now and then": when a track ends in a level, wait a random while and play it again.
        el.addEventListener('ended', () => {
            if (!sparse()) return;
            clearTimeout(quietTimer);
            quietTimer = setTimeout(() => {
                quietTimer = null;
                if (!sparse() || !wanted()) return;
                el.currentTime = 0; el.volume = 0; play(); fadeTo(target(), 2500);
            }, QUIET_MIN + Math.random() * (QUIET_MAX - QUIET_MIN));
        });
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
        // Rejected until the visitor has interacted with the page; the gesture retry below covers
        // that, so the rejection itself is not an error.
        element().play().catch(() => {});
    }

    // Starts the chosen track from its beginning, unless that very track is already playing in the
    // same place -- re-entering the level select must not restart its music.
    function setTrack(src, where) {
        const a = element();
        const nextContext = where === 'level' ? 'level' : 'select';
        const same = a.src === new URL(src, window.location.href).href && !a.paused && nextContext === context;
        context = nextContext;
        a.loop = !sparse();
        clearTimeout(quietTimer);
        quietTimer = null;
        if (same) return;
        a.src = src;
        a.currentTime = 0;
        if (wanted()) { a.volume = 0; play(); fadeTo(target(), 900); }
        else if (!a.paused) fadeTo(0, 400);
    }

    // The single entry point for volume, so the stored preference and the fade cannot drift apart.
    function setLevel(next) {
        level = Math.max(0, Math.min(3, next | 0));
        if (A) A.setLevel(tool, 'music', level);
        refresh();
        return level;
    }

    // Re-reads every choice and brings the playing track into line: called after the level
    // changes and whenever the Settings page (or another control) changes a sound preference.
    function refresh() {
        if (A) level = A.level(tool, 'music');
        if (!el || !el.src) return;
        el.loop = !sparse();
        if (wanted()) { if (el.paused && !quietTimer) play(); fadeTo(target(), 900); }
        else fadeTo(0, 400);
    }
    document.addEventListener('audioprefchange', e => {
        const d = e.detail || {};
        if (d.speaker !== undefined && el && A) A.useSpeaker(el);
        if (d.tool === undefined || d.tool === tool) refresh();
    });

    // Browsers block the very first play() without a user gesture, and the level select asks for
    // its track at page load, before any click. Retry once on the first real interaction so the
    // page is not stuck silent all session.
    const kick = () => {
        document.removeEventListener('pointerdown', kick);
        document.removeEventListener('keydown', kick);
        if (wanted() && el && el.paused && el.src) play();
    };
    document.addEventListener('pointerdown', kick);
    document.addEventListener('keydown', kick);

    return {
        setTrack: setTrack,
        setLevel: setLevel,
        getLevel: () => level,
        gain: () => gain(level),
        // Down first, because someone reaching for the speaker mid-level almost always wants it
        // quieter.
        cycleLevel: () => setLevel(level <= 0 ? 3 : level - 1),
    };
};
