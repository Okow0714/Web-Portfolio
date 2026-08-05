// Wakan Dictionary — a searchable/filterable list pairing kango (Sino-Japanese) and wago
// (native Japanese) vocabulary. Depends on dictionary-data.js (DICTIONARY_ENTRIES) having
// already run. No Supabase progress tracking -- this is a static reference tool, not a game.

function isKana(ch) {
    return /[぀-ゟ゠-ヿ]/.test(ch);
}

// Generates furigana by stripping shared leading/trailing kana between `text` and `reading`,
// wrapping whatever kanji remains in the middle in <ruby>. Works for the common "kanji stem +
// okurigana" shape every dictionary entry here has; a word with an internal kana gap between
// two kanji (e.g. 召し上がる) gets one combined ruby span rather than one per kanji -- a
// known, acceptable simplification (the reading shown is still correct, just grouped at
// word-chunk granularity).
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

const POS_LABELS = { all: 'All', verb: 'Verbs', noun: 'Nouns', adjective: 'Adjectives', honorific: 'Has honorific form' };
let activeFilter = 'all';
let searchQuery = '';

function renderFilters() {
    const container = document.getElementById('dict-filters');
    container.innerHTML = '';
    Object.keys(POS_LABELS).forEach(key => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'dict-filter' + (key === activeFilter ? ' active' : '');
        btn.textContent = POS_LABELS[key];
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
        entry.meaning.toLowerCase().includes(q);
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
                <span class="label">漢語 Kango</span>
                <span class="term">${furigana(entry.kango.text, entry.kango.reading)}</span>
            </div>
            <div class="dict-bridge" aria-hidden="true">=</div>
            <div class="dict-side wago">
                <span class="label">和語 Wago</span>
                <span class="term">${furigana(entry.wago.text, entry.wago.reading)}</span>
            </div>
        </div>
        <div class="dict-meaning-row">
            <span class="dict-meaning">${escapeHtml(entry.meaning)}</span>
            <span class="dict-pos">${escapeHtml(entry.pos)}</span>
        </div>
        ${honorificsHtml}
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

renderFilters();
renderList();
