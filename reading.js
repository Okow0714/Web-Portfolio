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
// How many words a single finalized transcript may carry the cursor through. This used to be
// 3, chosen when matching was a bare substring test and a wide window was genuinely dangerous.
// Matching is positional now -- every word has to be found in order, each one after the last --
// so the window is bounded by what the transcript actually contains, and 3 was simply too few:
// one ordinary breath is 「とても忙しかったです」, four tokens, which left the cursor a word
// behind however well the reader was doing.
const READ_AHEAD_WORDS = 40;
const MAX_ALTERNATIVES = 5;      // ASR's runner-up transcripts get checked too, not just its top guess
const MIN_JUMP_TOKEN_LEN = 2;    // see the note on `distinctive` in onresult
const MAX_RESTART_ATTEMPTS = 4;  // consecutive rapid onend restarts before we stop and say so
const RESTART_STREAK_WINDOW_MS = 2000; // restarts further apart than this are silence gaps, not a failure loop

// Voice gate. Chrome's recognizer will turn room noise -- a fan, a keyboard, a cough, a chair
// -- into a short plausible utterance, and short is all it takes to do damage here: the word
// under the cursor matches at any length (only read-ahead *jump* targets have to be
// distinctive), so a hallucinated 「はい」 while the cursor sits on は advances it. A few of
// those and the reader has silently lost a line without having said a word. So we listen to
// the microphone ourselves, alongside the recognizer, and refuse to act on a transcript that
// didn't arrive with real speech behind it.
const VOICE_GRACE_MS = 2000;      // a result may lag the speech that produced it by this much
const VOICE_CALIBRATION_MS = 700; // sampled at startup to learn the room's noise floor
const VOICE_MARGIN = 2.5;         // speech has to beat the noise floor by this multiple
const VOICE_FLOOR_MIN = 0.008;    // ...and this absolute RMS, so a silent room can't set a hair trigger
const VOICE_FLOOR_CAP = 0.02;     // ...and the floor itself is capped, so calibrating while someone
                                  //    is already talking can't ratchet the gate shut
const VOICE_LEVEL_POLL_MS = 50;
const VOICE_MAX_REJECTS = 5;      // consecutive rejections before the gate assumes it is the broken one
const MIN_CONFIDENCE = 0.3;       // Chrome scores finals (interim are 0); a very low one is usually noise
const ANCHOR_WORDS = 2;           // words behind the cursor consumed before matching; see matchTranscript()
// How many breaks -- a word missing from the transcript, or one found but not where the phrase
// left off -- a single match may absorb before it decides the spoken phrase has ended. Two
// keeps the reader moving past the odd word the recognizer mangles; a third means we are no
// longer following anything the reader actually said, and continuing would let a common word
// turning up somewhere unrelated ("です" in any polite sentence at all) carry the cursor away.
const MAX_CHAIN_GAPS = 2;

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

let audioCtx = null;
let micStream = null;
let analyser = null;
let levelTimer = null;
let voiceGateReady = false;   // false until calibration finishes -- until then nothing is gated
let voiceGateDisabled = false; // latched on if the gate looks wrong; see noteGateReject()
let lastVoiceAt = 0;
let noiseFloor = 0;
let consecutiveGateRejects = 0;
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

// Earliest occurrence of a word in `text` at or after `from`, by surface or by reading,
// whichever comes first. Returns null when the word isn't in the remaining text.
function findWord(w, text, from) {
    const surface = normalizeForMatch(w.surface);
    const reading = normalizeForMatch(w.reading || '');
    let at = -1, len = 0;
    if (surface) {
        const i = text.indexOf(surface, from);
        if (i !== -1) { at = i; len = surface.length; }
    }
    if (reading) {
        const i = text.indexOf(reading, from);
        if (i !== -1 && (at === -1 || i < at)) { at = i; len = reading.length; }
    }
    return at === -1 ? null : { at, end: at + len };
}

// The last few speakable words the cursor has already passed, oldest first.
function anchorIndices() {
    const out = [];
    let i = currentIdx - 1;
    while (i >= 0 && out.length < ANCHOR_WORDS) {
        if (!words[i].sym) out.unshift(i);
        i--;
    }
    return out;
}

// How far through the passage one candidate transcript gets us.
//
// The search is positional, not a bare substring test, and it starts by consuming the words
// already read. That is what stops a reader who repeats themselves from being carried forward:
// the recognizer hands back the whole utterance again on every update, and a plain
// `includes` has no way to tell "you said this" from "you said this, again". Say 「楽しかっ」
// while the cursor is on it and the cursor moves to 「た」; say 「楽しかっ」 again because
// nothing seemed to happen, and 「た」 is sitting right there inside it, so the old matcher
// counted the repeat as progress and the reader lost a word without noticing. One in a
// hundred positions in this corpus is that shape (友達→と, 日曜日→に, 電車→で). Consuming
// 「楽しかっ」 first means the search for 「た」 begins after it, where it isn't.
//
// The same consumption applies within the window, so no stretch of transcript can satisfy two
// cursor positions, however many times the recognizer re-delivers it.
function matchTranscript(text, positions, allowJumps) {
    if (!text) return -1;
    // Consume any already-read words the transcript *opens* with. That is what a reader
    // repeating themselves sounds like, and skipping past it is what stops the repeat being
    // counted as progress. Each anchor has to sit exactly where the previous one left off,
    // starting at the very beginning: an anchor allowed to match anywhere would hunt down a
    // stray kana further along and skip the real content in front of it -- 「た」 finding
    // itself inside 「たくさん」 pushed the search past 「仕事」 and stalled the reader for the
    // rest of the passage.
    let searchFrom = 0;
    for (const idx of anchorIndices()) {
        const hit = findWord(words[idx], text, searchFrom);
        if (!hit || hit.at !== searchFrom) break;
        searchFrom = hit.end;
    }

    let best = -1;
    let gaps = 0;
    for (let ordinal = 0; ordinal < positions.length; ordinal++) {
        const pos = positions[ordinal];
        const from = searchFrom;
        const hit = findWord(words[pos], text, from);

        // Word isn't in what's left of the transcript. A couple of those are tolerable -- the
        // recognizer mangles the odd word, and stalling the reader on it forever is the worse
        // failure -- but a run of them means the spoken phrase has simply ended here.
        if (!hit) {
            if (++gaps > MAX_CHAIN_GAPS) break;
            continue;
        }

        // A token starting exactly where the previous one ended is the rest of the same spoken
        // word, not a stray kana from elsewhere in the sentence.
        //
        // This matters more than it sounds. The corpus is tokenized by morpheme -- 今週 + は,
        // 忙しかっ + た, 会お + う -- but the recognizer returns natural orthography, 「今週は」,
        // one string holding both tokens, and 27.5% of adjacent positions here are that shape.
        // With single kana barred from being jump targets, one utterance could only ever move
        // the cursor one step, so saying 「今週は」 left the highlight on 「は」 -- a word
        // already spoken. The reader ends up permanently ahead of the cursor; then repeating a
        // word to see whether it registered matches the kana the cursor is stuck on and it
        // lurches forward, which is what "it registers my repeat as the next word" looks like
        // from the outside. Contiguity separates that from the stray case: 「は」 immediately
        // after the 「今週」 just matched is the same breath; 「は」 further along is not.
        const contiguous = hit.at === from;
        if (!contiguous && ++gaps > MAX_CHAIN_GAPS) break;
        searchFrom = hit.end;

        // Nearly half of this corpus's speakable tokens are single characters, and the
        // commonest are particles and inflection tails -- almost any Japanese transcript
        // contains one. Letting those be reached across a gap meant one phrase read aloud
        // could carry the cursor several words on and file words you had just read correctly
        // under "Skipped Words". So across a gap a token has to be distinctive; contiguous, it
        // doesn't need to be, because its position already vouches for it.
        const w = words[pos];
        const distinctive = Math.max(normalizeForMatch(w.surface).length,
            normalizeForMatch(w.reading || '').length) >= MIN_JUMP_TOKEN_LEN;
        if (pos === positions[0]) best = pos;
        else if (allowJumps && (contiguous || distinctive)) best = pos;
    }
    return best;
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
// Voice gate — our own read of the microphone, used to vet the recognizer's output
// ---------------------------------------------------------------------------
function voiceThreshold() {
    return Math.max(Math.min(noiseFloor, VOICE_FLOOR_CAP) * VOICE_MARGIN, VOICE_FLOOR_MIN);
}

function voiceGateActive() {
    return voiceGateReady && !voiceGateDisabled;
}

// The gate can only ever be a filter on top of recognition, never a prerequisite for it: if our
// analyser reads silence while Chrome is plainly transcribing speech, the analyser is the thing
// that's wrong (a different input device, a mic quieter than the threshold), and a reader who
// can't advance at all is far worse off than one who occasionally skips a word. So after a run
// of rejections it stands down for the session and says so.
function noteGateReject() {
    consecutiveGateRejects++;
    if (consecutiveGateRejects < VOICE_MAX_REJECTS) return;
    voiceGateDisabled = true;
    document.getElementById('reader-status').textContent = window.t('reading.gateOff');
}

function renderLevel(rms) {
    const fill = document.getElementById('reader-level-fill');
    if (!fill) return;
    const threshold = voiceThreshold();
    // Scaled so the threshold sits at a third of the track: the bar is there to answer "is it
    // hearing me, and is that enough?", which needs the threshold visible, not just the level.
    const pct = Math.max(0, Math.min(1, rms / (threshold * 3))) * 100;
    fill.style.width = pct.toFixed(1) + '%';
    fill.classList.toggle('over', rms >= threshold);
}

async function startVoiceGate() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    const generation = recognitionGeneration;
    let stream;
    try {
        // autoGainControl off deliberately: it pulls quiet noise up toward speech level, which
        // is the exact distinction this gate exists to make.
        stream = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: false },
        });
    } catch (e) {
        return; // no gate, and recognition carries on exactly as it did before
    }
    if (generation !== recognitionGeneration || !listening) {
        stream.getTracks().forEach(t => t.stop()); // stopped while we were awaiting permission
        return;
    }
    micStream = stream;
    audioCtx = new Ctx();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.1;
    audioCtx.createMediaStreamSource(micStream).connect(analyser);

    const buf = new Float32Array(analyser.fftSize);
    noiseFloor = 0;
    voiceGateReady = false;
    consecutiveGateRejects = 0;
    const calibrationEndsAt = Date.now() + VOICE_CALIBRATION_MS;
    document.getElementById('reader-level').classList.add('active');

    levelTimer = setInterval(() => {
        analyser.getFloatTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
        const rms = Math.sqrt(sum / buf.length);
        const now = Date.now();
        if (now < calibrationEndsAt) {
            noiseFloor = Math.max(noiseFloor, rms);
            return;
        }
        voiceGateReady = true;
        if (rms >= voiceThreshold()) lastVoiceAt = now;
        renderLevel(rms);
    }, VOICE_LEVEL_POLL_MS);
}

function stopVoiceGate() {
    clearInterval(levelTimer);
    levelTimer = null;
    if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
    if (audioCtx) { audioCtx.close().catch(() => {}); audioCtx = null; }
    analyser = null;
    voiceGateReady = false;
    voiceGateDisabled = false;
    consecutiveGateRejects = 0;
    const level = document.getElementById('reader-level');
    if (level) level.classList.remove('active');
    const fill = document.getElementById('reader-level-fill');
    if (fill) { fill.style.width = '0%'; fill.classList.remove('over'); }
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

        // Nothing was actually said recently enough to explain this transcript, so it is the
        // room, not the reader. Drop it rather than walk the cursor forward on a cough.
        if (voiceGateActive() && Date.now() - lastVoiceAt > VOICE_GRACE_MS) {
            noteGateReject();
            return;
        }
        consecutiveGateRejects = 0;

        let primary = '';
        const alternates = [];
        let isFinal = false;
        let confidence = 0;
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            isFinal = result.isFinal;
            confidence = Math.max(confidence, result[0].confidence || 0);
            primary += result[0].transcript;
            for (let a = 1; a < result.length; a++) alternates.push(normalizeForMatch(result[a].transcript));
        }
        // Chrome scores finals and leaves interim at 0, so this only ever judges a committed
        // transcript -- and only a badly unsure one, which is the shape noise takes.
        if (isFinal && confidence > 0 && confidence < MIN_CONFIDENCE) return;
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
        let matchPos = matchTranscript(chunks[0], positions, isFinal);
        // The runner-up transcripts are a rescue for a script mismatch (コーヒー heard for a
        // passage's こうひい), so they are only consulted when the recognizer's own best guess
        // matched nothing, and they are never allowed to drive a multi-word jump.
        if (matchPos === -1) {
            for (let i = 1; i < chunks.length && matchPos === -1; i++) {
                matchPos = matchTranscript(chunks[i], positions, false);
            }
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
        return;
    }
    startVoiceGate(); // async, deliberately not awaited: recognition must not wait on it
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
    stopVoiceGate();
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
    const level = document.getElementById('reader-level');
    if (level) level.title = window.t('reading.micLevel');
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
