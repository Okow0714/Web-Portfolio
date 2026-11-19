// Audio for Word Match: the background track, and the two synthesised phrases that end a
// level -- a rising run when it is cleared and a falling one when the clock or the lives run
// out. Both phrases are built on the Japanese "in" (陰) pentatonic scale (semitone offsets
// 0,1,5,7,8 from the root) with the Web Audio API, so there are no effect files to ship.
//
// The card-handling sounds are not here: they are CardSfx in game-memory.js. Since 2026-11-19
// Word Match has its own music level and its own sounds level (audio-prefs.js): the phrases here
// and CardSfx follow the sounds level, the track follows the music level, and the toolbar's
// speaker button steps the two together.
// This file once also carried ten effects for the pre-2026-10-21 board (tile select, match,
// streak, lightning chain, powerups, the Wakan flyer); that board is gone and nothing called
// them, so they went too.
//
// The music itself is music-player.js, shared with Grammar Connect and loaded before this.
//
// `window.GameAudio`, not `const`: a const at the top level of a classic script is not a
// property of window, and game-memory.js checks for window.GameAudio.
window.GameAudio = (function () {
    let ctx = null;
    let masterGain = null;
    let sfxGain = null;

    const music = window.createMusicPlayer({ tool: 'game' });
    const sfxLevel = () => window.KhanAudio ? KhanAudio.level('game', 'sfx') : music.getLevel();
    function applySfxLevel() {
        ensureContext();
        if (!ctx) return;
        masterGain.gain.value = window.KhanAudio ? KhanAudio.gain(sfxLevel()) : music.gain();
        if (sfxLevel() > 0 && ctx.state === 'suspended') ctx.resume();
    }
    document.addEventListener('audioprefchange', e => {
        const d = e.detail || {};
        if (d.speaker !== undefined && ctx && window.KhanAudio) KhanAudio.useSpeaker(ctx);
        if (d.tool === 'game' && d.kind === 'sfx') applySfxLevel();
    });

    // The context can be constructed without a user gesture; it just starts 'suspended' until
    // one arrives, which the listener below resumes.
    function ensureContext() {
        if (ctx) return;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        if (window.KhanAudio) KhanAudio.useSpeaker(ctx);
        masterGain = ctx.createGain();
        masterGain.gain.value = window.KhanAudio ? KhanAudio.gain(sfxLevel()) : music.gain();
        masterGain.connect(ctx.destination);
        sfxGain = ctx.createGain();
        sfxGain.gain.value = 0.5;
        sfxGain.connect(masterGain);
    }
    ensureContext();
    document.addEventListener('pointerdown', () => {
        if (ctx && ctx.state === 'suspended') ctx.resume();
    }, { once: true });

    const ROOT = 220; // A3
    const IN_SCALE = [0, 1, 5, 7, 8]; // semitone offsets, Japanese "in" mode

    function noteFreq(degree, octave) {
        const len = IN_SCALE.length;
        const idx = ((degree % len) + len) % len;
        const semitone = IN_SCALE[idx] + (Math.floor(degree / len) + (octave || 0)) * 12;
        return ROOT * Math.pow(2, semitone / 12);
    }

    // One synthesised tone with a fast exponential attack and release.
    function tone(freq, opts) {
        const dur = opts.duration;
        const t0 = ctx.currentTime + (opts.delay || 0);

        const osc = ctx.createOscillator();
        osc.type = opts.type;
        osc.frequency.setValueAtTime(freq, t0);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(opts.gain, t0 + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

        osc.connect(g);
        g.connect(sfxGain);
        osc.start(t0);
        osc.stop(t0 + dur + 0.05);
    }

    // Silent when muted, and on a browser with no Web Audio at all.
    function audible() { return ctx && sfxLevel() > 0; }

    function sfxWin() {
        if (!audible()) return;
        [0, 2, 4, 7, 9, 12].forEach((d, i) => {
            tone(noteFreq(d, 0), { type: 'triangle', duration: 0.4, gain: 0.15, delay: i * 0.1 });
        });
        tone(noteFreq(12, 0), { type: 'sine', duration: 1.4, gain: 0.1, delay: 0.65 });
        tone(noteFreq(7, 1), { type: 'sine', duration: 1.4, gain: 0.08, delay: 0.68 });
    }

    // Descending run in the low register -- the inverse shape of sfxWin's rising, bright one,
    // so a lost run reads as a distinct outcome rather than a quieter win.
    function sfxTimeUp() {
        if (!audible()) return;
        [12, 9, 7, 4, 2, 0].forEach((d, i) => {
            tone(noteFreq(d, -1), { type: 'triangle', duration: 0.45, gain: 0.14, delay: i * 0.12 });
        });
        tone(noteFreq(0, -2), { type: 'sine', duration: 1.6, gain: 0.12, delay: 0.75 });
    }

    return {
        // What the toolbar's speaker shows: the louder of the two, since it steps both.
        getLevel: () => Math.max(music.getLevel(), sfxLevel()),
        getSfxLevel: sfxLevel,
        cycleLevel() {
            const now = Math.max(music.getLevel(), sfxLevel());
            const next = now <= 0 ? 3 : now - 1;
            music.setLevel(next);
            if (window.KhanAudio) KhanAudio.setLevel('game', 'sfx', next);
            applySfxLevel();
            return next;
        },
        setLevelTrack: music.setTrack,
        win: sfxWin,
        timeUp: sfxTimeUp,
    };
})();
