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

const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;

let currentTrack = null;
let currentLevel = null;
let currentTextIndex = 0;
let words = [];
let wordEls = [];
let currentIdx = 0;
let stallTimer = null;
let recognition = null;
let listening = false;
let autoAdvanceTimer = null;

let progressCache = new Set();   // "trackId:textId" of completed texts (from the server, if logged in)
let pendingGuestCompletions = []; // [{trackId, textId}] earned as a guest, saved once they log in

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
            <h3>${escapeHtml(track.title)}</h3>
            <div class="track-meta">${done} / ${total} texts complete</div>
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
    document.getElementById('level-select-title').textContent = track.title;
    const container = document.getElementById('reading-level-grid');
    container.innerHTML = '';
    track.levels.forEach((level, position) => {
        const unlocked = isLevelUnlocked(track, position);
        const { done, total } = levelCompletion(track, level);
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'level-card' + (unlocked ? '' : ' locked');
        card.innerHTML = `
            <span class="level-badge">~${level.hint}</span>
            <h3>Level ${level.levelNum}</h3>
            <div class="level-meta">${done} / ${total} texts complete</div>
            ${unlocked ? '' : '<div class="level-lock-note">&#128274; Finish the previous level to unlock</div>'}
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
    document.getElementById('text-list-title').textContent = `${track.title.split('·')[0].trim()} — Level ${level.levelNum} (~${level.hint})`;
    const list = document.getElementById('text-list');
    list.innerHTML = '';
    level.texts.forEach((text, i) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'text-item';
        const charCount = text.words.reduce((sum, w) => sum + w.surface.length, 0);
        const done = progressCache.has(progressKey(track.id, text.id));
        item.innerHTML = `<span>${done ? '<span class="text-item-check">&#10003;</span>' : ''}${escapeHtml(text.title)}</span><span class="text-item-len">~${charCount} chars</span>`;
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

    document.getElementById('reader-title').textContent = `Level ${level.levelNum} — ${text.title}`;
    renderPassage();
    updateProgress();
    hideEl(document.getElementById('hint-popup'));

    const micBtn = document.getElementById('reader-mic-btn');
    if (!SpeechRecognitionCtor) {
        micBtn.disabled = true;
        document.getElementById('reader-status').textContent =
            "Speech recognition isn't supported in this browser — try Chrome or Edge.";
    } else {
        micBtn.disabled = false;
        micBtn.innerHTML = '&#127908; Start Reading';
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
    wordEls = words.map((w) => {
        const span = document.createElement('span');
        span.className = 'reader-word' + (w.sym ? ' sym' : '');
        span.textContent = w.surface;
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
    document.getElementById('reader-progress').textContent = `${doneCount} / ${speakable} words`;
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
    document.getElementById('hint-reading').textContent = w.reading;
    document.getElementById('hint-en').textContent = w.en ? `— ${w.en}` : '';
    showEl(document.getElementById('hint-popup'));
}

function advanceWord() {
    currentIdx = firstNonSymbolIndex(words, currentIdx + 1);
    updateHighlight();
    updateProgress();
    if (currentIdx >= words.length) {
        onTextComplete();
        return;
    }
    resetStallTimer();
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

    document.getElementById('complete-title').textContent = 'Text Complete!';
    if (moreTextsInLevel) {
        document.getElementById('complete-desc').textContent = 'Nice reading. Moving on to the next text…';
        document.getElementById('complete-next-btn').textContent = 'Continue Now';
    } else if (moreLevelsInTrack) {
        const nextLevel = currentTrack.levels[position + 1];
        document.getElementById('complete-desc').textContent =
            `Level complete! Level ${nextLevel.levelNum} is now unlocked.`;
        document.getElementById('complete-next-btn').textContent = 'View Levels';
    } else {
        document.getElementById('complete-desc').textContent =
            `You've completed the entire ${currentTrack.title} track!`;
        document.getElementById('complete-next-btn').textContent = 'View Levels';
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
    recognition = new SpeechRecognitionCtor();
    recognition.lang = 'ja-JP';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        let chunk = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            chunk += event.results[i][0].transcript;
        }
        // A single utterance can cover several words at once — keep advancing while the
        // recognized chunk still contains the (new) current word, capped to avoid runaway.
        let guard = 0;
        while (currentIdx < words.length && guard < 8) {
            const w = words[currentIdx];
            if (chunk.includes(w.surface) || (w.reading && chunk.includes(w.reading))) {
                advanceWord();
                guard++;
                if (currentIdx >= words.length) break;
            } else {
                break;
            }
        }
    };

    recognition.onend = () => {
        if (listening) {
            // Chrome stops continuous recognition after a silence gap; restart to keep going.
            try { recognition.start(); } catch (e) { /* already starting */ }
        }
    };

    recognition.onerror = (event) => {
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            listening = false;
            document.getElementById('reader-status').textContent = 'Microphone access was denied.';
            updateMicButton();
        }
    };

    recognition.start();
}

function stopRecognition() {
    listening = false;
    if (recognition) {
        recognition.onend = null;
        recognition.stop();
        recognition = null;
    }
    clearTimeout(stallTimer);
    updateMicButton();
}

function updateMicButton() {
    const btn = document.getElementById('reader-mic-btn');
    btn.innerHTML = listening ? '&#9724; Stop' : '&#127908; Start Reading';
}

document.getElementById('reader-mic-btn').addEventListener('click', () => {
    if (!SpeechRecognitionCtor) return;
    if (listening) {
        stopRecognition();
        document.getElementById('reader-status').textContent = '';
    } else {
        listening = true;
        updateMicButton();
        document.getElementById('reader-status').textContent = 'Listening…';
        startRecognition();
        resetStallTimer();
    }
});

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
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
