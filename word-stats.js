// word-stats.js — records what a learner actually got wrong, and what they picked instead.
//
// Every tool throws its failures away today: a mismatched pair in Word Match, a wrong tile in
// Grammar Connect, a word skipped in Dokkai Reader. Those are the only moments the site learns
// anything about a particular learner, and they are the raw material for both the review queue
// and "your most-missed words". This is the capture half; the reading half is a screen that does
// not exist yet, which is fine — an empty table is the reason to start recording now rather than
// when the screen is ready.
//
// Signed out, attempts buffer in localStorage and no review UI is offered. On the first sign-in
// the buffer is flushed to the server and deleted. That is a one-way flush, not a sync: the
// server is the only source of truth once you have an account, so there is never a merge to
// resolve. Two-way sync is the expensive half of that design and buys nothing here.
//
// Depends on auth-shared.js (window.supabaseClient / supabaseReady / onAuthChange).

(function () {
    'use strict';

    const BUFFER_KEY = 'khanjp-word-buffer';
    // A signed-out learner who never signs up would otherwise grow this forever. 400 attempts is
    // several sessions' worth; past that the oldest fall off, which is the right thing to lose.
    const BUFFER_MAX = 400;

    let session = null;

    function readBuffer() {
        try {
            const raw = localStorage.getItem(BUFFER_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function writeBuffer(rows) {
        try {
            localStorage.setItem(BUFFER_KEY, JSON.stringify(rows.slice(-BUFFER_MAX)));
        } catch (e) {
            /* private mode, or full — losing study statistics is not worth throwing over */
        }
    }

    function send(row) {
        return window.supabaseClient.rpc('record_word_attempt', {
            p_source: row.source,
            p_word: row.word,
            p_correct: row.correct,
            p_confused_with: row.confusedWith || null,
        });
    }

    // Marks today as a day this learner studied (daily_activity, migration 008), for the streak on
    // the dashboard. Called from every attempt but sent at most once per day per device: a flag in
    // localStorage keyed by the date does the deduplicating, so a level of twenty pairs is one
    // round trip rather than twenty. The date is the DEVICE's, so the streak follows the learner's
    // own midnight instead of UTC -- the server only checks it is within a day either way.
    const ACTIVE_KEY = 'khanjp-active-day';
    // Set the instant the first call goes out, not when it comes back: attempts arrive in bursts
    // (a level is twenty pairs) and they all passed the localStorage check before the first
    // response landed, so a single level sent twenty identical writes. Cleared again if the call
    // fails, so a later attempt retries.
    let activeDayInFlight = null;
    function localDay() {
        const d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }
    function markActiveToday() {
        if (!window.supabaseReady || !session) return;   // guests have no streak to keep
        const today = localDay();
        if (activeDayInFlight === today) return;
        try { if (localStorage.getItem(ACTIVE_KEY) === today) return; } catch (e) { /* private mode: send anyway */ }
        activeDayInFlight = today;
        window.supabaseClient.rpc('record_activity', { p_day: today })
            .then(({ error }) => {
                if (error) { activeDayInFlight = null; return; }
                try { localStorage.setItem(ACTIVE_KEY, today); } catch (e) {}
            })
            .catch(() => { activeDayInFlight = null; /* offline; a later attempt tries again */ });
    }

    // The one call the tools make. Fire-and-forget on purpose: a learner mid-level must never
    // wait on, or be interrupted by, a statistics write.
    window.recordWordAttempt = function (row) {
        if (!row || !row.word || !row.source) return;
        const clean = {
            source: row.source,
            word: String(row.word).slice(0, 120),
            correct: !!row.correct,
            confusedWith: row.confusedWith ? String(row.confusedWith).slice(0, 120) : null,
        };
        if (!window.supabaseReady || !session) {
            const buf = readBuffer();
            buf.push(clean);
            writeBuffer(buf);
            return;
        }
        markActiveToday();
        send(clean).then(({ error }) => {
            // A failed write buffers instead of vanishing, and goes up with the next flush.
            if (error) {
                const buf = readBuffer();
                buf.push(clean);
                writeBuffer(buf);
            }
        }).catch(() => { /* offline; the buffer above is the fallback */ });
    };

    async function flushBuffer() {
        const rows = readBuffer();
        if (!rows.length || !session || !window.supabaseReady) return;
        // Clear first: a flush that fails halfway would otherwise double-count everything before
        // the failure on the next attempt. Losing a few counters beats inflating them.
        writeBuffer([]);
        // In chunks rather than one at a time: a learner who played several sessions signed out
        // can arrive with hundreds of buffered attempts, and a sequential await over all of them
        // is minutes of round trips on their first sign-in.
        const CHUNK = 12;
        for (let i = 0; i < rows.length; i += CHUNK) {
            try {
                await Promise.all(rows.slice(i, i + CHUNK).map(send));
            } catch (e) {
                break;
            }
        }
    }

    if (window.onAuthChange) {
        window.onAuthChange((s) => {
            const wasSignedOut = !session;
            session = s;
            if (s && wasSignedOut) flushBuffer();
        });
    }
})();
