// Dokkai Reader — karaoke-style read-along across two overlapping difficulty tracks
// (Foundation N5->N3, Advanced N3->N1). Live speech recognition (Web Speech API,
// continuous + interim results) advances a highlight cursor through the passage whenever
// the recognized speech contains the current word's written form or reading. Any reasonable
// pronunciation is accepted since we're matching against ASR's own best-guess transcript,
// not scoring pronunciation quality. Pausing 3s on a word shows its reading + meaning.
// Completing a text advances to the next; completing every text in a level unlocks the
// next level in that track. Progress is saved per (track, text) so N3 — shared content
// between both tracks — unlocks independently on each.
//
// Depends on auth-shared.js (window.supabaseClient, window.getCurrentSession(),
// window.onAuthChange, the global showEl/hideEl helpers) and reading-texts.js
// (READING_TRACKS — each track owns its own 10 score-ranked levels; there's no shared
// level lookup anymore, though N3-range texts are duplicated with track-scoped ids into
// both tracks' pools) having already run.

// Aliased as `sb`, not `supabaseClient` — see the note in supabase-app.js about why
// reusing that identifier across <script> tags would throw a SyntaxError.
const sb = window.supabaseClient;

// Track titles live in i18n (keyed by track.id) rather than reading-texts.js, matching how
// other page chrome is translated. The data file's own `title` field stays English-only and
// is used only as a fallback if a track.id somehow has no matching i18n key.
const TRACK_TITLE_KEY = { foundation: 'reading.trackFoundation', advanced: 'reading.trackAdvanced' };
const TRACK_TITLE_SHORT_KEY = { foundation: 'reading.trackFoundationShort', advanced: 'reading.trackAdvancedShort' };
function trackTitle(track) { return window.t(TRACK_TITLE_KEY[track.id]) || track.title; }
function trackTitleShort(track) { return window.t(TRACK_TITLE_SHORT_KEY[track.id]) || track.title.split('·')[0].trim(); }

const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
const READ_AHEAD_WORDS = 3; // window checked on a finalized result: current word + up to 2 ahead
const MAX_ALTERNATIVES = 5;      // ASR's runner-up transcripts get checked too, not just its top guess
const MIN_JUMP_TOKEN_LEN = 2;    // see the note on `distinctive` in onresult
const MAX_RESTART_ATTEMPTS = 4;  // consecutive rapid onend restarts before we stop and say so
const RESTART_STREAK_WINDOW_MS = 2000; // restarts further apart than this are silence gaps, not a failure loop

// ASR returns whatever script it feels like -- katakana for a passage written in kanji, kana
// where the text has kanji, a long-vowel mark the reading doesn't carry. Folding both sides
// down to bare hiragana lets those still line up instead of stalling the cursor.
function toHiragana(str) {
    return str.replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}
// Strips what neither side should be compared on: the long-vowel mark (a reading spells it out,
// katakana marks it), whitespace (ASR sprinkles it between phrases), and punctuation of both
// widths. \s already covers the ideographic space.
function normalizeForMatch(str) {
    return toHiragana(str).replace(/[ー\s。、，．！？!?.,・「」『』（）()~〜]/g, '');
}

let currentTrack = null;
let currentLevel = null;
let currentTextIndex = 0;
let words = [];
let wordEls = [];
let currentIdx = 0;
let stallTimer = null;
let recognition = null;
let listening = false;
// Bumped on every teardown so a callback from an instance we've already stopped -- Chrome can
// still flush a final result after stop() -- can tell it's stale and bow out instead of moving
// the cursor on a text the reader has already left.
let recognitionGeneration = 0;
let restartAttempts = 0;
let lastRestartAt = 0;
let autoAdvanceTimer = null;

let progressCache = new Set();   // "trackId:textId" of completed texts (from the server, if logged in)
let pendingGuestCompletions = []; // [{trackId, textId}] earned as a guest, saved once they log in

let skippedWords = []; // words this text's cursor passed without the ASR chunk matching them directly

function progressKey(trackId, textId) { return `${trackId}:${textId}`; }

function firstNonSymbolIndex(list, from) {
    let i = from;
    while (i < list.length && list[i].sym) i++;
    return i;
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ---------------------------------------------------------------------------
// Progress: load on auth change, save on text completion
// ---------------------------------------------------------------------------
async function loadProgress() {
    const session = window.getCurrentSession();
    progressCache = new Set();
    if (session) {
        const { data, error } = await sb.from('reading_progress').select('track, text_id').eq('user_id', session.user.id);
        if (!error && data) {
            data.forEach(row => progressCache.add(progressKey(row.track, row.text_id)));
        }
    }
    renderTrackSelect();
}

async function saveCompletion(trackId, textId) {
    progressCache.add(progressKey(trackId, textId));
    const session = window.getCurrentSession();
    if (!session) {
        pendingGuestCompletions.push({ trackId, textId });
        return;
    }
    await sb.from('reading_progress').upsert(
        { user_id: session.user.id, track: trackId, text_id: textId },
        { onConflict: 'user_id,track,text_id' }
    );
}

// ---------------------------------------------------------------------------
// Unlock logic
// ---------------------------------------------------------------------------
function isLevelUnlocked(track, position) {
    if (position === 0) return true;
    const prevLevel = track.levels[position - 1];
    return prevLevel.texts.every(t => progressCache.has(progressKey(track.id, t.id)));
}

function levelCompletion(track, level) {
    const done = level.texts.filter(t => progressCache.has(progressKey(track.id, t.id))).length;
    return { done, total: level.texts.length };
}

function trackCompletion(track) {
    let done = 0, total = 0;
    track.levels.forEach(level => {
        total += level.texts.length;
        done += level.texts.filter(t => progressCache.has(progressKey(track.id, t.id))).length;
    });
    return { done, total };
}

// ---------------------------------------------------------------------------
// Track select -> level select -> text list
// ---------------------------------------------------------------------------
function renderTrackSelect() {
    const container = document.getElementById('track-grid');
    container.innerHTML = '';
    READING_TRACKS.forEach(track => {
        const { done, total } = trackCompletion(track);
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'track-card';
        card.innerHTML = `
            <h3>${escapeHtml(trackTitle(track))}</h3>
            <div class="track-meta">${escapeHtml(window.tf('reading.textsComplete', { done, total }))}</div>
        `;
        card.addEventListener('click', () => showLevelSelect(track));
        container.appendChild(card);
    });

    const guestHint = document.getElementById('reading-guest-hint');
    if (window.getCurrentSession()) hideEl(guestHint); else showEl(guestHint);
}

function backToTrackSelect() {
    stopRecognition();
    hideEl(document.getElementById('level-select-section'));
    hideEl(document.getElementById('text-list-section'));
    hideEl(document.getElementById('reader-section'));
    showEl(document.getElementById('track-select-section'));
    renderTrackSelect();
}

function showLevelSelect(track) {
    currentTrack = track;
    document.getElementById('level-select-title').textContent = trackTitle(track);
    const container = document.getElementById('reading-level-grid');
    container.innerHTML = '';
    track.levels.forEach((level, position) => {
        const unlocked = isLevelUnlocked(track, position);
        const { done, total } = levelCompletion(track, level);
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'level-card' + (unlocked ? '' : ' locked');
        card.innerHTML = `
            <span class="level-badge">~${escapeHtml(level.hint)}</span>
            <h3>${escapeHtml(window.tf('game.levelN', { n: level.levelNum }))}</h3>
            <div class="level-meta">${escapeHtml(window.tf('reading.textsComplete', { done, total }))}</div>
            ${unlocked ? '' : `<div class="level-lock-note">&#128274; ${escapeHtml(window.t('reading.finishPreviousToUnlock'))}</div>`}
        `;
        if (unlocked) card.addEventListener('click', () => showTextList(track, level));
        else card.disabled = true;
        container.appendChild(card);
    });

    hideEl(document.getElementById('track-select-section'));
    hideEl(document.getElementById('text-list-section'));
    hideEl(document.getElementById('reader-section'));
    showEl(document.getElementById('level-select-section'));
}

function backToLevelSelect() {
    stopRecognition();
    hideEl(document.getElementById('text-list-section'));
    hideEl(document.getElementById('reader-section'));
    showEl(document.getElementById('level-select-section'));
    showLevelSelect(currentTrack);
}

function showTextList(track, level) {
    currentTrack = track;
    currentLevel = level;
    document.getElementById('text-list-title').textContent = window.tf('reading.trackLevelHint', { track: trackTitleShort(track), n: level.levelNum, hint: level.hint });
    const list = document.getElementById('text-list');
    list.innerHTML = '';
    level.texts.forEach((text, i) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'text-item';
        const charCount = text.words.reduce((sum, w) => sum + w.surface.length, 0);
        const done = progressCache.has(progressKey(track.id, text.id));
        item.innerHTML = `<span>${done ? '<span class="text-item-check">&#10003;</span>' : ''}${escapeHtml(text.title)}</span><span class="text-item-len">${escapeHtml(window.tf('reading.charsCount', { n: charCount }))}</span>`;
        item.addEventListener('click', () => startText(track, level, i));
        list.appendChild(item);
    });
    hideEl(document.getElementById('level-select-section'));
    hideEl(document.getElementById('reader-section'));
    showEl(document.getElementById('text-list-section'));
}

// ---------------------------------------------------------------------------
// Reader
// ---------------------------------------------------------------------------
function startText(track, level, textIndex) {
    currentTrack = track;
    currentLevel = level;
    currentTextIndex = textIndex;
    const text = level.texts[textIndex];
    words = text.words;
    currentIdx = firstNonSymbolIndex(words, 0);
    listening = false;
    clearTimeout(autoAdvanceTimer);
    skippedWords = [];
    renderSkippedList();

    document.getElementById('reader-title').textContent = window.tf('reading.levelDashTitle', { n: level.levelNum, title: text.title });
    renderPassage();
    updateProgress();
    hideEl(document.getElementById('hint-popup'));

    const micBtn = document.getElementById('reader-mic-btn');
    if (!SpeechRecognitionCtor) {
        micBtn.disabled = true;
        document.getElementById('reader-status').textContent = window.t('reading.speechNotSupported');
    } else {
        micBtn.disabled = false;
        micBtn.innerHTML = `&#127908; ${escapeHtml(window.t('reading.startReading'))}`;
        document.getElementById('reader-status').textContent = '';
    }

    hideEl(document.getElementById('track-select-section'));
    hideEl(document.getElementById('level-select-section'));
    hideEl(document.getElementById('text-list-section'));
    showEl(document.getElementById('reader-section'));
}

function renderPassage() {
    const passageEl = document.getElementById('reader-passage');
    passageEl.innerHTML = '';
    wordEls = words.map((w, i) => {
        const span = document.createElement('span');
        span.className = 'reader-word' + (w.sym ? ' sym' : '');
        span.textContent = w.surface;
        if (!w.sym) {
            span.tabIndex = 0;
            span.setAttribute('role', 'button');
            span.addEventListener('click', () => jumpToWord(i));
            span.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jumpToWord(i); }
            });
        }
        passageEl.appendChild(span);
        return span;
    });
    updateHighlight();
}

function updateHighlight() {
    wordEls.forEach((el, i) => {
        el.classList.toggle('read', i < currentIdx);
        el.classList.toggle('current', i === currentIdx);
    });
}

function updateProgress() {
    const speakable = words.filter(w => !w.sym).length;
    const doneCount = words.slice(0, currentIdx).filter(w => !w.sym).length;
    document.getElementById('reader-progress').textContent = window.tf('reading.wordsCount', { n: doneCount, total: speakable });
}

function recordSkipped(word) {
    skippedWords.push(word);
    renderSkippedList();
}

function renderSkippedList() {
    const list = document.getElementById('skipped-list');
    const empty = document.getElementById('skipped-empty');
    list.innerHTML = '';
    skippedWords.forEach(w => {
        const gloss = (window.siteLang() === 'mn' && w.enMn) ? w.enMn : w.en;
        const li = document.createElement('li');
        li.innerHTML = `<span class="skipped-word-surface">${escapeHtml(w.surface)}</span>` +
            `<span class="skipped-word-reading">${escapeHtml(w.reading)}</span>` +
            (gloss ? `<span class="skipped-word-en">${escapeHtml(gloss)}</span>` : '');
        list.appendChild(li);
    });
    if (skippedWords.length) hideEl(empty); else showEl(empty);
}

function resetStallTimer() {
    clearTimeout(stallTimer);
    hideEl(document.getElementById('hint-popup'));
    if (!listening) return;
    stallTimer = setTimeout(showHint, 3000);
}

function showHint() {
    if (currentIdx >= words.length) return;
    const w = words[currentIdx];
    const gloss = (window.siteLang() === 'mn' && w.enMn) ? w.enMn : w.en;
    document.getElementById('hint-reading').textContent = w.reading;
    document.getElementById('hint-en').textContent = gloss ? `— ${gloss}` : '';
    showEl(document.getElementById('hint-popup'));
}

// Jumps the cursor to word index `idx` (rounding forward past any symbol), marking
// everything before it as read. Used both for a normal single-word advance and for
// catching up several words at once when speech recognition confirms a later word.
function advanceTo(idx) {
    currentIdx = firstNonSymbolIndex(words, idx);
    updateHighlight();
    updateProgress();
    if (currentIdx >= words.length) {
        onTextComplete();
        return;
    }
    resetStallTimer();
}

function advanceWord() {
    advanceTo(currentIdx + 1);
}

// Tapping a word moves the cursor to it. The matcher can desync in both directions -- a word
// ASR keeps mishearing, a reader who skips a line or wants to re-read one -- and until now the
// only way out was Skip Word, one word at a time and forwards only, which made a cursor that
// had run ahead impossible to recover from without restarting the whole text. Jumping forward
// still books the words passed over as skipped, exactly as Skip Word does; jumping back just
// moves the cursor, since re-reading isn't a skip.
function jumpToWord(idx) {
    const target = firstNonSymbolIndex(words, idx);
    if (target >= words.length || target === currentIdx) return;
    if (target > currentIdx) {
        let i = currentIdx;
        while (i < target) {
            if (!words[i].sym) skippedWords.push(words[i]);
            i = firstNonSymbolIndex(words, i + 1);
        }
        renderSkippedList();
    }
    advanceTo(target);
}

// Positions (indices into `words`, skipping symbols) of the next `count` speakable words
// starting at `fromIdx`, inclusive.
function nextWordPositions(fromIdx, count) {
    const positions = [];
    let idx = firstNonSymbolIndex(words, fromIdx);
    while (idx < words.length && positions.length < count) {
        positions.push(idx);
        idx = firstNonSymbolIndex(words, idx + 1);
    }
    return positions;
}

function onTextComplete() {
    stopRecognition();
    clearTimeout(stallTimer);
    hideEl(document.getElementById('hint-popup'));

    const text = currentLevel.texts[currentTextIndex];
    saveCompletion(currentTrack.id, text.id);

    const moreTextsInLevel = currentTextIndex < currentLevel.texts.length - 1;
    const position = currentTrack.levels.indexOf(currentLevel);
    const moreLevelsInTrack = position < currentTrack.levels.length - 1;

    document.getElementById('complete-title').textContent = window.t('reading.textComplete');
    if (moreTextsInLevel) {
        document.getElementById('complete-desc').textContent = window.t('reading.textCompleteDesc');
        document.getElementById('complete-next-btn').textContent = window.t('reading.continueNow');
    } else if (moreLevelsInTrack) {
        const nextLevel = currentTrack.levels[position + 1];
        document.getElementById('complete-desc').textContent =
            window.tf('reading.levelCompleteUnlocked', { n: nextLevel.levelNum });
        document.getElementById('complete-next-btn').textContent = window.t('reading.viewLevels');
    } else {
        document.getElementById('complete-desc').textContent =
            window.tf('reading.trackComplete', { track: trackTitle(currentTrack) });
        document.getElementById('complete-next-btn').textContent = window.t('reading.viewLevels');
    }
    showEl(document.getElementById('complete-modal'));

    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = setTimeout(goToNextText, 2500);
}

function goToNextText() {
    clearTimeout(autoAdvanceTimer);
    hideEl(document.getElementById('complete-modal'));
    if (currentTextIndex < currentLevel.texts.length - 1) {
        startText(currentTrack, currentLevel, currentTextIndex + 1);
    } else {
        showLevelSelect(currentTrack);
    }
}

// ---------------------------------------------------------------------------
// Speech recognition
// ---------------------------------------------------------------------------
function startRecognition() {
    if (!SpeechRecognitionCtor) return;
    // SpeechRecognition needs a secure origin. Served over plain http on a LAN address the
    // constructor still exists and start() fails as 'not-allowed' -- which reads as "you denied
    // the microphone" and sends people into their browser settings for a permission that was
    // never the problem. Checking up front lets us name the actual cause.
    if (!window.isSecureContext) {
        failListening(window.t('reading.insecureOrigin'));
        return;
    }
    // Chrome streams the audio out to a remote service, so offline there is nothing to
    // recognize -- and the PWA means this page opens offline perfectly happily.
    if (navigator.onLine === false) {
        failListening(window.t('reading.speechOffline'));
        return;
    }

    const generation = ++recognitionGeneration;
    recognition = new SpeechRecognitionCtor();
    recognition.lang = 'ja-JP';
    recognition.continuous = true;
    recognition.interimResults = true;
    // ASR's second and third guesses are often the one that matches the passage -- it hears a
    // reading correctly but writes it in the wrong script, or picks the commoner homophone.
    recognition.maxAlternatives = MAX_ALTERNATIVES;

    recognition.onresult = (event) => {
        if (generation !== recognitionGeneration) return;
        restartAttempts = 0; // audio is flowing, so the restart budget is not being spent

        let primary = '';
        const alternates = [];
        let isFinal = false;
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            isFinal = result.isFinal;
            primary += result[0].transcript;
            for (let a = 1; a < result.length; a++) alternates.push(normalizeForMatch(result[a].transcript));
        }
        const chunks = [normalizeForMatch(primary), ...alternates];

        // Interim results are the recognizer's still-changing, speculative guess about an
        // utterance in progress -- it can predict text ahead of what's actually been said yet.
        // Searching several words ahead against THAT was causing the cursor to fast-forward
        // mid-word, before the reader had even finished speaking. So: while a result is still
        // interim, only match the exact current word (the original, conservative behavior).
        // Only once the recognizer commits to a final transcript for a phrase do we widen the
        // search and catch up on anything genuinely missed within it -- a single word ASR
        // misheard (an unusual kanji reading, an okurigana form it didn't expect) would
        // otherwise stall the reader forever even after reading straight past it out loud.
        const windowSize = isFinal ? READ_AHEAD_WORDS : 1;
        const positions = nextWordPositions(currentIdx, windowSize);
        let matchPos = -1;
        for (const pos of positions) {
            const w = words[pos];
            const surface = normalizeForMatch(w.surface);
            const reading = normalizeForMatch(w.reading || '');
            // Nearly half of this corpus's speakable tokens are single characters, and the
            // commonest of them are the particles and inflection tails -- almost any Japanese
            // transcript contains one. Letting those serve as a *jump* target meant reading one
            // phrase aloud could carry the cursor several words forward and file the words you
            // had just read correctly under "Skipped Words". (Measured on the very first
            // passage: saying it correctly filed its first two words as skipped.) So a token
            // only earns a jump if it is long enough to mean something on its own; the word
            // directly under the cursor still matches at any length, which is what keeps
            // particles flowing.
            const distinctive = Math.max(surface.length, reading.length) >= MIN_JUMP_TOKEN_LEN;
            if (pos !== positions[0] && !distinctive) continue;
            const hit = chunks.some(c => (surface && c.includes(surface)) || (reading && c.includes(reading)));
            if (hit) matchPos = pos; // keep the furthest (last) match in the window, not the first
        }
        if (matchPos !== -1) {
            // Only file a passed-over word as skipped if this transcript doesn't contain it
            // either. Jumping to the furthest match is right, but the words between the cursor
            // and that match were usually spoken in the very same breath -- the panel is
            // headed "words the voice matcher jumps past without hearing directly", and
            // recording ones it demonstrably did hear made it useless: reading the opening
            // line of the first passage perfectly filed its first two words as skipped.
            let idx = currentIdx;
            while (idx < matchPos) {
                const w = words[idx];
                if (!w.sym) {
                    const surface = normalizeForMatch(w.surface);
                    const reading = normalizeForMatch(w.reading || '');
                    const heard = chunks.some(c => (surface && c.includes(surface)) || (reading && c.includes(reading)));
                    if (!heard) skippedWords.push(w);
                }
                idx = firstNonSymbolIndex(words, idx + 1);
            }
            renderSkippedList();
            advanceTo(matchPos + 1);
        }
    };

    recognition.onend = () => {
        if (generation !== recognitionGeneration || !listening) return;
        // Chrome ends continuous recognition after a silence gap, so restarting is normal and
        // is what keeps a session alive. It used to be unconditional, which turned any
        // permanently failing service (offline, no input device) into a silent infinite restart
        // loop with the button still cheerfully reading "Listening...". Only *rapid* restarts
        // count against the budget -- a reader pausing to work out a kanji leaves seconds
        // between them, a failure loop leaves milliseconds.
        const now = Date.now();
        if (now - lastRestartAt > RESTART_STREAK_WINDOW_MS) restartAttempts = 0;
        lastRestartAt = now;
        if (restartAttempts >= MAX_RESTART_ATTEMPTS) {
            failListening(window.t('reading.speechStalled'));
            return;
        }
        restartAttempts++;
        try {
            recognition.start();
        } catch (e) {
            failListening(window.t('reading.speechStalled'));
        }
    };

    recognition.onerror = (event) => {
        if (generation !== recognitionGeneration) return;
        switch (event.error) {
            case 'aborted':
                break; // our own stop(), or a navigation -- nothing worth reporting
            case 'no-speech':
                // Not fatal (onend restarts us), but worth saying: a muted mic, or one pointed
                // at the wrong input device, looks exactly like "listening" otherwise.
                document.getElementById('reader-status').textContent = window.t('reading.noSpeech');
                break;
            case 'not-allowed':
            case 'service-not-allowed':
                failListening(window.t('reading.micDenied'));
                break;
            case 'audio-capture':
                failListening(window.t('reading.noMic'));
                break;
            case 'network':
                failListening(window.t('reading.speechOffline'));
                break;
            default:
                failListening(window.tf('reading.speechError', { error: event.error }));
        }
    };

    try {
        recognition.start();
    } catch (e) {
        failListening(window.t('reading.speechStalled'));
    }
}

function stopRecognition() {
    listening = false;
    recognitionGeneration++;
    restartAttempts = 0;
    if (recognition) {
        // Every handler is detached, not just onend: a late onresult from a stopped instance
        // was still able to advance the cursor after the reader hit Stop or backed out.
        recognition.onend = null;
        recognition.onresult = null;
        recognition.onerror = null;
        try { recognition.stop(); } catch (e) { /* never successfully started */ }
        recognition = null;
    }
    clearTimeout(stallTimer);
    hideEl(document.getElementById('hint-popup'));
    updateMicButton();
}

// Stop listening and say why. Every dead end below routes through here so the mic button and
// the status line can never disagree about whether we're still listening.
function failListening(message) {
    stopRecognition();
    document.getElementById('reader-status').textContent = message;
}

function updateMicButton() {
    const btn = document.getElementById('reader-mic-btn');
    btn.innerHTML = listening
        ? `&#9724; ${escapeHtml(window.t('reading.stop'))}`
        : `&#127908; ${escapeHtml(window.t('reading.startReading'))}`;
}

document.getElementById('reader-mic-btn').addEventListener('click', () => {
    if (!SpeechRecognitionCtor) return;
    if (listening) {
        stopRecognition();
        document.getElementById('reader-status').textContent = '';
    } else {
        listening = true;
        updateMicButton();
        document.getElementById('reader-status').textContent = window.t('reading.listening');
        startRecognition();
        resetStallTimer();
    }
});

// Manual escape hatch: if ASR just won't catch a word (rare vocabulary, background noise,
// an accent it struggles with), the reader shouldn't be a dead end.
document.getElementById('reader-skip-btn').addEventListener('click', () => {
    if (currentIdx >= words.length) return;
    recordSkipped(words[currentIdx]);
    advanceWord();
});

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
// See game.js's identical comment: data-i18n only covers text set once at parse time, so a
// language switch needs the currently-visible dynamic pane re-rendered to pick up the change.
document.addEventListener('sitelangchange', () => {
    if (!document.getElementById('track-select-section').classList.contains('hidden')) renderTrackSelect();
    else if (!document.getElementById('level-select-section').classList.contains('hidden')) showLevelSelect(currentTrack);
    else if (!document.getElementById('text-list-section').classList.contains('hidden')) showTextList(currentTrack, currentLevel);
    else if (!document.getElementById('reader-section').classList.contains('hidden')) {
        document.getElementById('reader-progress').textContent = window.tf('reading.wordsCount', {
            n: words.slice(0, currentIdx).filter(w => !w.sym).length,
            total: words.filter(w => !w.sym).length,
        });
        updateMicButton();
        renderSkippedList();
    }
});

document.getElementById('level-select-back-btn').addEventListener('click', backToTrackSelect);
document.getElementById('text-list-back-btn').addEventListener('click', backToLevelSelect);
document.getElementById('reader-back-btn').addEventListener('click', () => {
    stopRecognition();
    showTextList(currentTrack, currentLevel);
});
document.getElementById('complete-next-btn').addEventListener('click', goToNextText);
document.getElementById('complete-levels-btn').addEventListener('click', () => {
    clearTimeout(autoAdvanceTimer);
    hideEl(document.getElementById('complete-modal'));
    showLevelSelect(currentTrack);
});

window.onAuthChange(async (session) => {
    await loadProgress();
    if (session && pendingGuestCompletions.length) {
        const toSave = pendingGuestCompletions;
        pendingGuestCompletions = [];
        for (const { trackId, textId } of toSave) {
            await saveCompletion(trackId, textId);
        }
    }
});
