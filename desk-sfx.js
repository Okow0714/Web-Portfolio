// desk-sfx.js — the sound of a desk, for the tools that are not a card game.
//
// Word Match has CardSfx (game-memory.js): every cue there is a card being handled, because
// that is what the player is looking at. Phonetics Family and Grammar Connect are not card
// games -- they are a board of tiles and a sheet of sentences -- so they get the other half of
// the same world: a keyswitch, paper moving, a pencil, a rubber stamp. Nothing bounces and
// nothing is pitched. There is not a single oscillator in this file.
//
// WHY SYNTHESISED, not loaded. The same reason CardSfx is: a click IS a shaped transient and a
// sheet of paper IS band-limited noise with a moving filter, so modelling one costs a filter and
// an envelope. Recordings would be another megabyte in APP_SHELL for sounds lasting 20ms, and
// APP_SHELL is precached atomically -- every byte in it is downloaded before the PWA installs.
//
// WHY A SEPARATE FILE rather than reusing CardSfx. Word Match's five scripts share one global
// scope and a load order that breaks if a name is declared twice or a load-time call moves into
// a later file (see CLAUDE.md). Reaching into that chain from two other pages to borrow ~25
// lines of buffer-and-envelope would put the game's startup at risk for no gain a listener can
// hear -- and the shaping genuinely differs, since a card snap and a pencil scrape want
// opposite filters. This file is loaded by phonetics.html and grammar.html and by nothing else.
//
// VOLUME IS SITEWIDE. khanjp-volume (0 muted .. 3 full) is already shared by Word Match and
// Grammar Connect, so this reads the same key rather than inventing a fourth control. It is
// re-read on every cue, which costs nothing and means a page needs no event plumbing to follow
// a change made by another control on the same page.
(function () {
    'use strict';

    const VOLUME_KEY = 'khanjp-volume';
    const VOLUME_STEPS = [0, 0.30, 0.60, 1];

    let ctx = null, master = null, noiseBuf = null;

    function storedLevel() {
        try {
            const v = parseInt(localStorage.getItem(VOLUME_KEY), 10);
            return (v >= 0 && v <= 3) ? v : 3;
        } catch (e) { return 3; }
    }

    // An AudioContext constructed at load comes back SUSPENDED in every browser that enforces
    // autoplay, and then the page is silent for the whole session. Only ever reached from a
    // gesture; wake() is the hook a page calls on its first pointerdown.
    function boot() {
        if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return ctx; }
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        try { ctx = new AC(); } catch (e) { return null; }
        master = ctx.createGain();
        master.connect(ctx.destination);
        return ctx;
    }

    function live() {
        const lvl = storedLevel();
        if (!lvl || !boot()) return false;
        // 0.17 rather than CardSfx's 0.2: these pages have no music under them on Phonetics and
        // a quiet ambient track on Grammar, so the same peak reads louder than it does on the
        // game's board.
        master.gain.value = 0.17 * VOLUME_STEPS[lvl];
        return true;
    }

    function buffer() {
        if (!noiseBuf) {
            noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.6), ctx.sampleRate);
            const d = noiseBuf.getChannelData(0);
            for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        }
        return noiseBuf;
    }

    // One shaped burst. Read from a RANDOM offset at a randomised rate every time: identical
    // repeats are exactly what makes synthetic clicking sound synthetic, and a tile board fires
    // this far more often than a card table does.
    function nz(at, dur, peak, type, hz, q) {
        const t = ctx.currentTime + at;
        const src = ctx.createBufferSource();
        src.buffer = buffer();
        src.playbackRate.value = 0.84 + Math.random() * 0.4;
        const f = ctx.createBiquadFilter();
        f.type = type; f.frequency.value = hz; f.Q.value = q || 0.8;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + Math.min(0.004, dur * 0.3));
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(f); f.connect(g); g.connect(master);
        src.start(t, Math.random() * 0.35);
        src.stop(t + dur + 0.03);
    }

    // A travelling band: what every sliding thing on a desk has in common. A fixed filter can
    // make a hiss but never a movement.
    //
    // PEAKS HERE ARE NOT COMPARABLE TO nz()'s. A bandpass passes one narrow slice of white
    // noise where a lowpass or highpass passes half the spectrum, so the same number comes out
    // three to four times quieter. Written with matching numbers first, and Chromium's own
    // OfflineAudioContext measured the paper sweep at 0.010 peak against the keyswitch's 0.027
    // -- the desk sounds were there and nearly inaudible under them. Q is low for the same
    // reason: paper and graphite are broadband, and a tight Q both thins the sound and throws
    // away the level.
    function sweep(at, dur, peak, from, to, q) {
        const t = ctx.currentTime + at;
        const src = ctx.createBufferSource();
        src.buffer = buffer();
        src.playbackRate.value = 0.9 + Math.random() * 0.25;
        const f = ctx.createBiquadFilter();
        f.type = 'bandpass'; f.Q.value = q || 1.1;
        f.frequency.setValueAtTime(from, t);
        f.frequency.exponentialRampToValueAtTime(to, t + dur);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + dur * 0.22);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(f); f.connect(g); g.connect(master);
        src.start(t, Math.random() * 0.2);
        src.stop(t + dur + 0.03);
    }

    // A scrape: narrow band whose centre WOBBLES and whose level is rough. Graphite on paper is
    // not a steady hiss -- it is a hiss that keeps catching, and the catching is the whole
    // character. Stepped with setValueAtTime rather than an LFO, which keeps it to one node.
    function scrape(at, dur, peak, lo, hi) {
        const t = ctx.currentTime + at;
        const src = ctx.createBufferSource();
        src.buffer = buffer();
        src.playbackRate.value = 0.7 + Math.random() * 0.3;
        const f = ctx.createBiquadFilter();
        f.type = 'bandpass'; f.Q.value = 1.3;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + 0.02);
        const steps = Math.max(4, Math.round(dur / 0.022));
        for (let i = 0; i <= steps; i++) {
            const k = t + (dur * i) / steps;
            f.frequency.setValueAtTime(lo + Math.random() * (hi - lo), k);
            // the roughness: level jitters as the point catches and releases
            if (i && i < steps) g.gain.setValueAtTime(peak * (0.45 + Math.random() * 0.75), k);
        }
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(f); f.connect(g); g.connect(master);
        src.start(t, Math.random() * 0.25);
        src.stop(t + dur + 0.03);
    }

    // A mechanical switch is TWO contacts, not one: the stem bottoming out, then the lighter
    // release as the finger lifts. One transient on its own is a blip; the pair is a button.
    //
    // The release is 0.42 of the press, which is about where a real keyboard sits. It was
    // briefly 0.6 because a probe reported only one transient here -- that was the probe: its
    // peak-finder started at the SECOND envelope window, so it never saw the attack and was
    // reporting the release alone. Measured properly in Chromium the release lands at 52% of
    // the press at 0.42, which is plainly a second event. Do not raise it again without
    // looking at the actual envelope.
    function clickPair(at, peak, hz, gap) {
        nz(at, 0.007, peak, 'highpass', hz, 1.0);
        nz(at + 0.0015, 0.018, peak * 0.45, 'lowpass', 1500, 0.9);
        nz(at + gap, 0.006, peak * 0.42, 'highpass', hz * 1.15, 1.0);
    }

    window.DeskSfx = {
        // Called from a page's first pointerdown so the context is running before the first cue
        // that matters. Costs nothing if already booted.
        wake() { boot(); },
        isMuted() { return storedLevel() === 0; },

        // --- the keyboard / switch family -------------------------------------------------
        // The smallest thing here, for anything tapped that is not a commitment: a chip, a tab,
        // a nav control. Short enough to fire repeatedly without being in the way.
        tap() { if (live()) clickPair(0, 0.26, 3800, 0.038); },
        // A deliberate press with a stem behind it -- picking a level, opening a view.
        press() {
            if (!live()) return;
            clickPair(0, 0.26, 3100, 0.052);
            nz(0.002, 0.055, 0.13, 'lowpass', 420, 1.0);
        },
        // A heavier switch thrown: the gate committing to a level.
        chunk() {
            if (!live()) return;
            nz(0, 0.012, 0.3, 'highpass', 2400, 0.9);
            nz(0.003, 0.085, 0.24, 'lowpass', 300, 1.1);
            nz(0.072, 0.01, 0.12, 'highpass', 3000, 0.9);
        },

        // --- the paper family ---------------------------------------------------------------
        // A sheet moved across the desk. The band travels upward because the contact patch
        // shrinks as the sheet lifts away.
        paper() { if (live()) sweep(0, 0.17, 0.46, 900, 4200, 0.7); },
        // A page turned over: the sweep plus the soft low flap of the sheet settling.
        page() {
            if (!live()) return;
            sweep(0, 0.2, 0.5, 1100, 4800, 0.7);
            nz(0.16, 0.08, 0.12, 'lowpass', 340, 1.0);
        },
        // A stack of sheets riffled -- a longer, rougher version, for a view that swaps wholesale.
        riffle() {
            if (!live()) return;
            for (let i = 0; i < 7; i++) {
                sweep(i * 0.035 + Math.random() * 0.012, 0.09,
                      0.26 + Math.random() * 0.16, 1400, 3600 + Math.random() * 1200, 1.0);
            }
        },

        // --- the pencil family ----------------------------------------------------------------
        // A short stroke drawn: the default "something was written down" cue.
        pencil() { if (live()) scrape(0, 0.16, 0.42, 900, 2300); },
        // A longer line, for a bigger commitment than a single mark.
        pencilLong() { if (live()) scrape(0, 0.33, 0.38, 700, 2100); },
        // Rubbed out. Lower, broader and without the catching, which is what a rubber does that
        // a point does not.
        erase() {
            if (!live()) return;
            sweep(0, 0.13, 0.42, 1800, 700, 0.7);
            sweep(0.09, 0.12, 0.32, 1600, 650, 0.7);
        },

        // --- the verdict family -----------------------------------------------------------------
        // Right: a rubber stamp. Ink on paper is a firm low thud with one bright tick on top of
        // it, and nothing else on a desk sounds like approval.
        stamp() {
            if (!live()) return;
            nz(0, 0.016, 0.3, 'highpass', 2600, 0.8);
            nz(0.004, 0.1, 0.3, 'lowpass', 260, 1.2);
            nz(0.012, 0.05, 0.12, 'lowpass', 900, 0.9);
        },
        // Wrong: the blunt end of a pencil tapped twice on the desk. Dull, no tick, no pitch --
        // it reads as "no" without reading as a buzzer.
        //
        // The levels are three times the stamp's for the same loudness. A lowpass at 190-620Hz
        // passes a sliver of a white-noise burst where the stamp's 2600Hz highpass passes half
        // the spectrum, so matching numbers made the miss a quarter the volume of the hit --
        // the one cue a learner most needs to notice, and the quietest on the page.
        tapTwice() {
            if (!live()) return;
            nz(0, 0.045, 0.95, 'lowpass', 620, 1.0);
            nz(0.006, 0.075, 0.7, 'lowpass', 200, 1.1);
            nz(0.115, 0.04, 0.72, 'lowpass', 560, 1.0);
            nz(0.12, 0.065, 0.5, 'lowpass', 190, 1.1);
        },
        // A drawer pushed shut: the end of something, for finishing a round.
        drawer() {
            if (!live()) return;
            sweep(0, 0.26, 0.44, 1700, 420, 0.7);
            nz(0.25, 0.06, 0.22, 'lowpass', 300, 1.1);
            nz(0.253, 0.016, 0.1, 'highpass', 2200, 0.9);
        },
    };
})();
