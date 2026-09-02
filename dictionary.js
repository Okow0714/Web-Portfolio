// Dictionary (dictionary.html) — two tabs sharing one page. The primary "Монгол ⇄ 日本語" tab
// is a Mongolian<->Japanese lookup built from mnjp-data.js (MNJP_ENTRIES, 3,427 words merged
// from four sources -- see that file's header comment). The secondary "漢語 ⇄ 和語" tab is the
// original Kango<->Wago dictionary, depending on dictionary-data.js (DICTIONARY_ENTRIES) exactly
// as before -- that file is untouched by this rework, since Word Match's Wakan winged-tile bonus
// event still reads kango/wago pairs directly from it, independent of this page.
// No Supabase progress tracking on either tab -- this is a static reference tool, not a game.

function isKana(ch) {
    return /[぀-ゟ゠-ヿ]/.test(ch);
}

// Generates furigana by stripping shared leading/trailing kana between `text` and `reading`,
// wrapping whatever kanji remains in the middle in <ruby>. Works for the common "kanji stem +
// okurigana" shape every dictionary entry here has; a word with an internal kana gap between
// two kanji (e.g. 召し上がる) gets one combined ruby span rather than one per kanji -- a
// known, acceptable simplification (the reading shown is still correct, just grouped at
// word-chunk granularity). Shared by both tabs.
function furigana(text, reading) {
    let start = 0;
    while (start < text.length && start < reading.length && text[start] === reading[start] && isKana(text[start])) start++;
    let endText = text.length, endReading = reading.length;
    while (endText > start && endReading > start && text[endText - 1] === reading[endReading - 1] && isKana(text[endText - 1])) {
        endText--; endReading--;
    }
    const prefix = text.slice(0, start);
    const kanjiPart = text.slice(start, endText);
    const suffix = text.slice(endText);
    const readingPart = reading.slice(start, endReading);
    if (!kanjiPart) return escapeHtml(text);
    return escapeHtml(prefix) + `<ruby>${escapeHtml(kanjiPart)}<rp>(</rp><rt>${escapeHtml(readingPart)}</rt><rp>)</rp></ruby>` + escapeHtml(suffix);
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ---------------------------------------------------------------------------
// Tab switching
// ---------------------------------------------------------------------------
let activeTab = 'mnjp';

// dictionary-data.js (183KB) is only needed for the secondary Kango<->Wago tab -- most visits
// only ever touch the primary MN<->JP tab, so it's not loaded until the Wakan tab is actually
// opened, instead of eagerly on every page load. wakanDataPromise memoizes the fetch so
// switching tabs back and forth doesn't re-inject the script.
let wakanDataPromise = null;
function loadWakanData() {
    if (wakanDataPromise) return wakanDataPromise;
    wakanDataPromise = new Promise((resolve, reject) => {
        if (typeof DICTIONARY_ENTRIES !== 'undefined') { resolve(); return; }
        const script = document.createElement('script');
        script.src = 'dictionary-data.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('dictionary-data.js failed to load'));
        document.body.appendChild(script);
    });
    return wakanDataPromise;
}

function switchTab(tab) {
    activeTab = tab;
    const mnjpBtn = document.getElementById('dict-tab-mnjp');
    const wakanBtn = document.getElementById('dict-tab-wakan');
    mnjpBtn.classList.toggle('active', tab === 'mnjp');
    mnjpBtn.setAttribute('aria-selected', tab === 'mnjp' ? 'true' : 'false');
    wakanBtn.classList.toggle('active', tab === 'wakan');
    wakanBtn.setAttribute('aria-selected', tab === 'wakan' ? 'true' : 'false');
    document.getElementById('dict-panel-mnjp').classList.toggle('hidden', tab !== 'mnjp');
    document.getElementById('dict-panel-wakan').classList.toggle('hidden', tab !== 'wakan');

    if (tab === 'wakan' && !wakanDataPromise) {
        const list = document.getElementById('dict-list');
        list.innerHTML = '';
        showEl(document.getElementById('dict-empty'));
        document.getElementById('dict-empty').textContent = window.t('dict.loadingWakan');
        loadWakanData().then(() => {
            hideEl(document.getElementById('dict-empty'));
            document.getElementById('dict-empty').textContent = window.t('dict.noMatches');
            renderFilters();
            renderList();
        });
    }
}

document.getElementById('dict-tab-mnjp').addEventListener('click', () => switchTab('mnjp'));
document.getElementById('dict-tab-wakan').addEventListener('click', () => switchTab('wakan'));

// ---------------------------------------------------------------------------
// Монгол ⇄ 日本語 tab (mnjp-data.js)
// ---------------------------------------------------------------------------
let mnjpQuery = '';
const SOURCE_LABEL_KEY = { gamewords: 'dict.sourceGamewords', bridge: 'dict.sourceBridge', kangowago: 'dict.sourceKangowago', core: 'dict.sourceCore' };

function matchesMnjpSearch(entry, q) {
    if (!q) return true;
    q = q.toLowerCase();
    return entry.mn.toLowerCase().includes(q) || entry.jp.includes(q) || entry.reading.includes(q) ||
        (entry.glosses && entry.glosses.toLowerCase().includes(q));
}

// ---------------------------------------------------------------------------
// Phonetic family cross-links -- for any kanji in an entry that Phonetics Family covers, a
// small chip linking to that kanji's family on phonetics.html (see phonetics-kanji-index.js,
// a lightweight {kanji: {phonetic, reading, count}} derived from phonetics-data.js, cheap
// enough to load eagerly here unlike the ~2.8MB full file). Scans one or more source strings --
// a dictionary entry may split its kanji text across separate fields (kango.text/wago.text) --
// and dedupes by kanji so a repeated character only gets one chip.
// ---------------------------------------------------------------------------
function phoneticChipsHtml(...texts) {
    if (typeof PHONETICS_KANJI_INDEX === 'undefined') return '';
    const seen = new Set();
    const chips = [];
    texts.forEach(text => {
        if (!text) return;
        for (const ch of text) {
            if (seen.has(ch) || !PHONETICS_KANJI_INDEX[ch]) continue;
            seen.add(ch);
            const info = PHONETICS_KANJI_INDEX[ch];
            chips.push(`<a class="phonetic-chip" href="phonetics.html?kanji=${encodeURIComponent(ch)}">
                <span class="kanji">${escapeHtml(ch)}</span><span class="reading">${escapeHtml(info.reading)}</span>
            </a>`);
        }
    });
    if (!chips.length) return '';
    return `<div class="phonetic-chip-row">
        <span class="phonetic-chip-label">${escapeHtml(window.t('dict.phoneticFamily'))}</span>
        ${chips.join('')}
    </div>`;
}

// Builds the expanded detail (source tags, extra glosses, example sentence, kango/wago
// cross-link) -- called lazily on first expand rather than for every one of the 3,427 rows up
// front, since most of them are never opened in a given visit.
function buildMnjpDetail(entry) {
    const sourceTags = entry.sources
        .map(s => `<span class="mnjp-source-tag${entry.sources.length > 1 ? ' confirmed' : ''}">${escapeHtml(window.t(SOURCE_LABEL_KEY[s]))}</span>`)
        .join('');
    const glossesHtml = entry.glosses ? `<p class="mnjp-glosses">${escapeHtml(entry.glosses)}</p>` : '';
    let exampleHtml = '';
    if (entry.example) {
        const mnText = (window.siteLang() === 'mn') ? entry.example.enMn : entry.example.en;
        exampleHtml = `<div class="mnjp-example"><p class="ex-jp">${entry.example.furigana}</p><p class="ex-mn">${escapeHtml(mnText)}</p></div>`;
    }
    let kangowagoHtml = '';
    if (entry.kangowago) {
        const partner = `${entry.kangowago.text} (${escapeHtml(window.t(entry.kangowago.role === 'kango' ? 'dict.kango' : 'dict.wago'))})`;
        kangowagoHtml = `<p class="mnjp-kango-link">${window.tf('dict.alsoInKangowago', { word: partner })}</p>`;
    }
    return `<div class="mnjp-source-tags">${sourceTags}</div>${glossesHtml}${exampleHtml}${kangowagoHtml}${phoneticChipsHtml(entry.jp)}`;
}

function renderMnjpEntry(entry) {
    const card = document.createElement('div');
    card.className = 'mnjp-entry';
    card.innerHTML = `
        <button type="button" class="mnjp-entry-main" aria-expanded="false">
            <span class="mnjp-side mn">
                <span class="label">Монгол</span>
                <span class="term">${escapeHtml(entry.mn)}</span>
            </span>
            <span class="mnjp-bridge" aria-hidden="true">=</span>
            <span class="mnjp-side jp">
                <span class="label">日本語</span>
                <span class="term">${furigana(entry.jp, entry.reading)}</span>
            </span>
            <span class="mnjp-expand-hint" aria-hidden="true">&#9662;</span>
        </button>
        <div class="mnjp-detail"></div>
    `;
    const btn = card.querySelector('.mnjp-entry-main');
    const detail = card.querySelector('.mnjp-detail');
    let built = false;
    btn.addEventListener('click', () => {
        if (!built) { built = true; detail.innerHTML = buildMnjpDetail(entry); }
        const open = card.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    return card;
}

// At 3,427 entries, building every matching card on every keystroke got visibly laggy
// (~500ms measured for a broad query) -- nobody scans a list that long anyway, so results
// beyond this cap just don't render; the count line says so and asks for a narrower search.
const MNJP_RENDER_CAP = 150;

function renderMnjpList() {
    const list = document.getElementById('mnjp-list');
    const empty = document.getElementById('mnjp-empty');
    const countEl = document.getElementById('mnjp-count');
    list.innerHTML = '';

    const filtered = MNJP_ENTRIES.filter(e => matchesMnjpSearch(e, mnjpQuery));
    // Without this, searching a common single kanji like 人 buries the exact word under 30+
    // compounds that merely contain it (人生, 外国人, 殺人...), sorted alphabetically -- rank
    // an exact jp/mn match to the top first, matching the render cap's "top 150" being the
    // ones actually worth showing, not just whichever sorted first.
    const q = mnjpQuery.toLowerCase();
    const rank = e => (e.jp === mnjpQuery || e.mn.toLowerCase() === q) ? 0 : 1;
    const ranked = mnjpQuery ? filtered.slice().sort((a, b) => rank(a) - rank(b)) : filtered;
    const shown = ranked.slice(0, MNJP_RENDER_CAP);
    countEl.textContent = filtered.length > shown.length
        ? window.tf('dict.mnjpTruncated', { shown: shown.length, total: filtered.length })
        : `${filtered.length} / ${MNJP_ENTRIES.length}`;

    if (filtered.length === 0) {
        showEl(empty);
        return;
    }
    hideEl(empty);

    const frag = document.createDocumentFragment();
    shown.forEach(entry => frag.appendChild(renderMnjpEntry(entry)));
    list.appendChild(frag);
}

let mnjpSearchDebounce = null;
document.getElementById('mnjp-search').addEventListener('input', (e) => {
    const value = e.target.value;
    clearTimeout(mnjpSearchDebounce);
    mnjpSearchDebounce = window.setTimeout(() => {
        mnjpQuery = value.trim();
        renderMnjpList();
    }, 120);
});

// ---------------------------------------------------------------------------
// 漢語 ⇄ 和語 tab (dictionary-data.js) -- unchanged from the original single-tab page.
// ---------------------------------------------------------------------------

// POS_KEY_ORDER fixes the filter tab order (Object.keys order on an i18n-populated map isn't
// guaranteed to match insertion order across the two languages' string tables); POS_LABEL_KEY
// maps each filter to its i18n key, resolved fresh on every render so a language switch updates
// the tab labels without needing its own sitelangchange handler.
const POS_KEY_ORDER = ['all', 'verb', 'noun', 'adjective', 'honorific'];
const POS_LABEL_KEY = { all: 'dict.posAll', verb: 'dict.posVerb', noun: 'dict.posNoun', adjective: 'dict.posAdjective', honorific: 'dict.posHonorific' };
let activeFilter = 'all';
let searchQuery = '';

function renderFilters() {
    const container = document.getElementById('dict-filters');
    container.innerHTML = '';
    POS_KEY_ORDER.forEach(key => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'dict-filter' + (key === activeFilter ? ' active' : '');
        btn.textContent = window.t(POS_LABEL_KEY[key]);
        btn.addEventListener('click', () => {
            activeFilter = key;
            renderFilters();
            renderList();
        });
        container.appendChild(btn);
    });
}

function matchesSearch(entry, q) {
    if (!q) return true;
    q = q.toLowerCase();
    return entry.kango.text.includes(q) || entry.kango.reading.includes(q) ||
        entry.wago.text.includes(q) || entry.wago.reading.includes(q) ||
        entry.meaning.toLowerCase().includes(q) ||
        (entry.meaningMn && entry.meaningMn.toLowerCase().includes(q));
}

function matchesFilter(entry) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'honorific') return !!entry.honorific;
    return entry.pos === activeFilter;
}

function renderEntry(entry) {
    const card = document.createElement('div');
    card.className = 'dict-entry';

    let honorificsHtml = '';
    if (entry.honorific) {
        const chips = [];
        if (entry.honorific.sonkeigo) {
            chips.push(`<span class="dict-hon-chip sonkeigo"><span class="hon-badge">尊敬語</span><span class="term">${furigana(entry.honorific.sonkeigo.text, entry.honorific.sonkeigo.reading)}</span></span>`);
        }
        if (entry.honorific.kenjougo) {
            chips.push(`<span class="dict-hon-chip kenjougo"><span class="hon-badge">謙譲語</span><span class="term">${furigana(entry.honorific.kenjougo.text, entry.honorific.kenjougo.reading)}</span></span>`);
        }
        honorificsHtml = `<div class="dict-honorifics">${chips.join('')}</div>`;
    }

    card.innerHTML = `
        <div class="dict-entry-main">
            <div class="dict-side kango">
                <span class="label">漢語 ${escapeHtml(window.t('dict.kango'))}</span>
                <span class="term">${furigana(entry.kango.text, entry.kango.reading)}</span>
            </div>
            <div class="dict-bridge" aria-hidden="true">=</div>
            <div class="dict-side wago">
                <span class="label">和語 ${escapeHtml(window.t('dict.wago'))}</span>
                <span class="term">${furigana(entry.wago.text, entry.wago.reading)}</span>
            </div>
        </div>
        <div class="dict-meaning-row">
            <span class="dict-meaning">${escapeHtml((window.siteLang() === 'mn' && entry.meaningMn) ? entry.meaningMn : entry.meaning)}</span>
            <span class="dict-pos">${escapeHtml(window.t(POS_LABEL_KEY[entry.pos] || 'dict.posAll'))}</span>
        </div>
        ${honorificsHtml}
        ${phoneticChipsHtml(entry.kango.text, entry.wago.text)}
    `;
    return card;
}

function renderList() {
    const list = document.getElementById('dict-list');
    const empty = document.getElementById('dict-empty');
    const countEl = document.getElementById('dict-count');
    list.innerHTML = '';

    const filtered = DICTIONARY_ENTRIES.filter(e => matchesSearch(e, searchQuery) && matchesFilter(e));
    countEl.textContent = `${filtered.length} / ${DICTIONARY_ENTRIES.length}`;

    if (filtered.length === 0) {
        showEl(empty);
        return;
    }
    hideEl(empty);

    const frag = document.createDocumentFragment();
    filtered.forEach(entry => frag.appendChild(renderEntry(entry)));
    list.appendChild(frag);
}

document.getElementById('dict-search').addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderList();
});

document.addEventListener('sitelangchange', () => {
    if (typeof DICTIONARY_ENTRIES !== 'undefined') {
        renderFilters();
        renderList();
    }
    renderMnjpList();
});

renderMnjpList();

// The home page's search bar links here as dictionary.html?q=<word> -- pre-fill and filter the
// primary MN<->JP tab (the one that search bar searches) with whatever was typed there.
const initialQuery = new URLSearchParams(window.location.search).get('q');
if (initialQuery) {
    document.getElementById('mnjp-search').value = initialQuery;
    mnjpQuery = initialQuery.trim();
    renderMnjpList();
}
