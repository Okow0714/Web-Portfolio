// audio-prefs.js -- every sound setting on the site, in one place (2026-11-19).
//
// Until now one key, khanjp-volume (0 muted .. 3 full), was shared by every tool, and each tool's
// speaker button changed it for all of them. The Settings page now gives each tool its own music
// level and its own sounds level, plus two music choices and the two devices. Everything that makes
// a sound reads from here, so a tool never needs to know which other tools exist.
//
//   KhanAudio.volume('game', 'music')     0..100  Word Match's music, a percentage (Settings' slider)
//   KhanAudio.setVolume(tool, kind, pct)  stores it and fires 'audioprefchange'
//   KhanAudio.level(tool, kind)           0..3    the same, as the toolbar speaker's four steps
//   KhanAudio.setLevel(tool, kind, n)     a step: 0 / 30 / 60 / 100 %
//   KhanAudio.gain(n)                     the 0..1 gain for a step
//   KhanAudio.selectMusic()               'play' | 'mute'   music while choosing a level
//   KhanAudio.flow()                      'loop' | 'sparse' music during a level
//   KhanAudio.speaker() / mic()           a deviceId, or '' for the device's default
//   KhanAudio.useSpeaker(audioCtxOrEl)    routes a context or an <audio> to the chosen speaker
//   KhanAudio.ttsRate()                   multiplier for Dokkai Reader's read-aloud voice
//
// THE OLD KEY IS THE STARTING POINT, NOT THROWN AWAY: a visitor who had turned the site down to 1
// keeps 1 on every new control until they change one. Classic script, loaded before every page
// script that makes a sound; plain localStorage like display-prefs.js, synced by auth-shared.js.
(function () {
    'use strict';

    const STEPS = [0, 0.30, 0.60, 1];
    const STEP_PCT = [0, 30, 60, 100];
    const LEGACY = 'khanjp-volume';
    const K = {
        select: 'khanjp-music-select',   // 'mute' or absent
        flow: 'khanjp-music-flow',       // 'sparse' or absent
        speaker: 'khanjp-speaker',
        mic: 'khanjp-mic',
        tts: 'khanjp-tts-rate',          // 'slow' | 'fast' | absent
    };
    const TOOLS = { game: ['music', 'sfx'], grammar: ['music', 'sfx'], phonetics: ['sfx'] };

    const read = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
    const write = (k, v) => { try { if (v === null || v === '') localStorage.removeItem(k); else localStorage.setItem(k, String(v)); } catch (e) { /* private mode */ } };
    const announce = detail => document.dispatchEvent(new CustomEvent('audioprefchange', { detail }));
    // 'khanjp-vol-*' held a step (0..3) for one day; 'khanjp-volp-*' holds the percentage.
    const key = (tool, kind) => 'khanjp-vol-' + tool + '-' + kind;
    const pkey = (tool, kind) => 'khanjp-volp-' + tool + '-' + kind;

    function asStep(v) { const n = parseInt(v, 10); return n >= 0 && n <= 3 ? n : null; }

    window.KhanAudio = {
        TOOLS,
        keys: () => Object.values(K).concat(...Object.keys(TOOLS).map(t => TOOLS[t].map(k => pkey(t, k)))),
        // a percentage; older stores (a step on the day-old key, or the site-wide step) are read
        // through STEP_PCT, so nobody's level changes when they first open the slider
        volume(tool, kind) {
            const p = parseInt(read(pkey(tool, kind)), 10);
            if (p >= 0 && p <= 100) return p;
            const own = asStep(read(key(tool, kind)));
            if (own !== null) return STEP_PCT[own];
            const old = asStep(read(LEGACY));
            return old !== null ? STEP_PCT[old] : 100;
        },
        setVolume(tool, kind, pct) {
            const v = Math.max(0, Math.min(100, Math.round(+pct || 0)));
            write(pkey(tool, kind), v);
            write(key(tool, kind), null);
            announce({ tool, kind, volume: v, level: this.level(tool, kind) });
            return v;
        },
        level(tool, kind) {
            const v = this.volume(tool, kind);
            return v === 0 ? 0 : v <= 40 ? 1 : v <= 75 ? 2 : 3;
        },
        setLevel(tool, kind, n) {
            const step = Math.max(0, Math.min(3, n | 0));
            this.setVolume(tool, kind, STEP_PCT[step]);
            return step;
        },
        gain: n => STEPS[Math.max(0, Math.min(3, n | 0))],
        selectMusic: () => read(K.select) === 'mute' ? 'mute' : 'play',
        setSelectMusic(v) { write(K.select, v === 'mute' ? 'mute' : null); announce({ select: v }); },
        flow: () => read(K.flow) === 'sparse' ? 'sparse' : 'loop',
        setFlow(v) { write(K.flow, v === 'sparse' ? 'sparse' : null); announce({ flow: v }); },
        speaker: () => read(K.speaker) || '',
        setSpeaker(id) { write(K.speaker, id || null); announce({ speaker: id || '' }); },
        mic: () => read(K.mic) || '',
        setMic(id) { write(K.mic, id || null); announce({ mic: id || '' }); },
        ttsRate() { const v = read(K.tts); return v === 'slow' ? 0.8 : v === 'fast' ? 1.2 : 1; },
        ttsSpeed: () => read(K.tts) || 'normal',
        setTtsSpeed(v) { write(K.tts, v === 'slow' || v === 'fast' ? v : null); announce({ tts: v }); },
        // Chrome and Edge route an AudioContext; Chrome, Edge and Firefox route an <audio>. Where
        // the browser cannot, or the device has gone, it quietly stays on the default speaker:
        // a sound on the wrong speaker is better than no sound at all.
        useSpeaker(target) {
            const id = this.speaker();
            if (!target || typeof target.setSinkId !== 'function') return;
            // Nothing chosen and nothing routed yet: leave it alone. Calling setSinkId('') anyway
            // made Chrome log an audio-device error on a machine with no speaker (CI, every load).
            if (!id && !target.sinkId) return;
            const p = target.setSinkId(id || '');
            if (p && p.catch) p.catch(() => { try { target.setSinkId(''); } catch (e) { /* stay on default */ } });
        },
    };
})();
