// Audio for Word Match — synthesized at runtime with the Web Audio API (no sourced audio
// files), built around the Japanese "in" (陰) pentatonic scale (semitone offsets 0,1,5,7,8 from
// the root). Sound is on by default (`enabled = true` below, and the speaker button ships with
// class "on"); what actually delays the first note is the browser, which blocks audio until a
// user gesture. The banner this replaced said "sound starts off", which the line four below it
// has contradicted for as long as both have existed.
//
// Split out of game.js because it references nothing else in it: only the DOM and window. Note
// the declaration is `window.GameAudio`, not `const` — a const at the top level of a classic
// script is script-scoped, so game.js would not be able to see it from another file.
window.GameAudio = (function () {
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
