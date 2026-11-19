// audio-prefs.js -- every sound setting on the site, in one place (2026-11-19).
//
// Until now one key, khanjp-volume (0 muted .. 3 full), was shared by every tool, and each tool's
// speaker button changed it for all of them. The Settings page now gives each tool its own music
// level and its own sounds level, plus two music choices and the two devices. Everything that makes
// a sound reads from here, so a tool never needs to know which other tools exist.
//
//   KhanAudio.level('game', 'music')      0..3   Word Match's music
//   KhanAudio.level('grammar', 'sfx')     0..3   Grammar Connect's desk sounds
//   KhanAudio.setLevel(tool, kind, n)     stores it and fires 'audioprefchange'
//   KhanAudio.gain(n)                     the 0..1 gain for a step (not linear: 0 / .3 / .6 / 1)
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
    const key = (tool, kind) => 'khanjp-vol-' + tool + '-' + kind;

    function asStep(v) { const n = parseInt(v, 10); return n >= 0 && n <= 3 ? n : null; }

    window.KhanAudio = {
        TOOLS,
        keys: () => Object.values(K).concat(...Object.keys(TOOLS).map(t => TOOLS[t].map(k => key(t, k)))),
        level(tool, kind) {
            const own = asStep(read(key(tool, kind)));
            if (own !== null) return own;
            const old = asStep(read(LEGACY));
            return old !== null ? old : 3;
        },
        setLevel(tool, kind, n) {
            const v = Math.max(0, Math.min(3, n | 0));
            write(key(tool, kind), v);
            announce({ tool, kind, level: v });
            return v;
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
            const p = target.setSinkId(id || '');
            if (p && p.catch) p.catch(() => { try { target.setSinkId(''); } catch (e) { /* stay on default */ } });
        },
    };
})();
