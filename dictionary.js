// Dictionary (dictionary.html) — two tabs sharing one page. The primary "Монгол ⇄ 日本語" tab
// is a Mongolian<->Japanese lookup built from mnjp-data.js (MNJP_ENTRIES, 3,537 words merged
// from five sources -- see that file's header comment). The secondary "漢語 ⇄ 和語" tab is the
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
const SOURCE_LABEL_KEY = { gamewords: 'dict.sourceGamewords', bridge: 'dict.sourceBridge', kangowago: 'dict.sourceKangowago', core: 'dict.sourceCore', everyday: 'dict.sourceEveryday' };

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
// cross-link) -- called lazily on first expand rather than for every one of the 3,537 rows up
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

// ---------------------------------------------------------------------------
// Cross-tool badges
//
// Which other tools a word turns up in, from dictionary-crosslink.js (generated by
// tools/build-crosslink-index.js). A badge carries a COUNT and opens a list of every
// destination, rather than linking to one of them: measured over the whole dictionary, a Word
// Match word is always in exactly one level, but 22.7% of words touch more than one phonetic
// family and 52% of reader matches are in more than one text -- も is in 45. A single link would
// be a guess on half of them.
//
// Progress makes the list worth opening: finished levels, read texts and opened families are
// ticked, which one link could never show.
// ---------------------------------------------------------------------------
const XL_TOOLS = {
    // the i-* sprite, not t-*: dictionary.html carries the nav-size simplified icons, which
    // are the right ones at 15px anyway -- the drawn set stops being readable under about 40px
    w: { cls: 'wordmatch', icon: 'i-wordmatch', nameKey: 'nav.wordGame' },
    p: { cls: 'phonetics', icon: 'i-phonetics', nameKey: 'nav.phoneticsFamily' },
    r: { cls: 'reader', icon: 'i-reader', nameKey: 'nav.dokkaiReader' },
};

// Filled in from Supabase for a signed-in visitor; phonetics also reads the local set that
// phonetics.html keeps, so a signed-out learner still sees which families they have opened.
const xlDone = { w: new Set(), p: new Set(), r: new Set() };

function xlLoadLocalPhonetics() {
    try {
        const raw = JSON.parse(localStorage.getItem('khanjp-phonetics-seen'));
        if (Array.isArray(raw)) raw.forEach(p => xlDone.p.add(p));
    } catch (e) { /* private mode */ }
}

async function xlLoadProgress() {
    xlDone.w.clear(); xlDone.p.clear(); xlDone.r.clear();
    xlLoadLocalPhonetics();
    const session = window.getCurrentSession && window.getCurrentSession();
    if (!session || !window.supabaseReady) return;
    const sb = window.supabaseClient, uid = session.user.id;
    // Three small reads, in parallel, once per auth change -- not per keystroke.
    const [g, r, p] = await Promise.all([
        sb.from('game_progress').select('level').eq('user_id', uid).eq('completed', true),
        sb.from('reading_progress').select('text_id').eq('user_id', uid),
        sb.from('phonetics_progress').select('phonetic').eq('user_id', uid),
    ]);
    (g.data || []).forEach(x => xlDone.w.add(x.level));
    (r.data || []).forEach(x => xlDone.r.add(x.text_id));
    (p.data || []).forEach(x => xlDone.p.add(x.phonetic));
}

// one destination -> { href, line, sub, done }
function xlDestinations(rec) {
    const out = { w: [], p: [], r: [] };
    for (const lvl of (rec.w || [])) out.w.push({
        href: 'game.html?level=' + lvl,
        line: window.tf('xlink.level', { n: lvl }),
        sub: '', done: xlDone.w.has(lvl),
    });
    for (const [kanji, fam, count] of (rec.p || [])) out.p.push({
        href: 'phonetics.html?kanji=' + encodeURIComponent(kanji),
        line: fam,
        sub: window.tf('xlink.familyKanji', { n: count }), done: xlDone.p.has(fam),
    });
    for (const [id, title, lvl] of (rec.r || [])) out.r.push({
        href: 'reading.html?text=' + encodeURIComponent(id),
        line: title,
        // The track has to be here: two texts can share a title across tracks (明るい lists
        // 親友の結婚 as both foundation-l9-3 and advanced-l4-3), and a level number alone makes
        // them look like one text at two levels. The id's prefix already carries it.
        sub: window.tf('xlink.readerWhere', {
            track: window.t(id.startsWith('advanced') ? 'xlink.trackAdvanced' : 'xlink.trackFoundation'),
            n: lvl,
        }),
        done: xlDone.r.has(id),
    });
    return out;
}

// The JLPT level, as a label rather than a link: unlike the badges beside it there is no
// single page a tier maps to. Only the 42.4% of entries that are in Word Match have a tier at
// all (see tools/build-crosslink-index.js for why the rest are left blank rather than guessed),
// so most rows render nothing here and the row must not reserve space for it.
function jlptChipHtml(entry) {
    if (typeof DICTIONARY_CROSSLINK === 'undefined') return '';
    const rec = DICTIONARY_CROSSLINK[entry.jp];
    if (!rec || !rec.j) return '';
    const tiers = rec.j.split('-');
    // Colour follows the easiest tier -- the level where the word is first taught. The text can
    // name a range; the hue can only be one, and an en dash reads better than the stored hyphen.
    const label = tiers.join('–');
    // Guarded because this runs during the first render, unlike the popover's own tf() calls
    // which only run on a click: if i18n.js has not evaluated yet, a chip with a plainer
    // tooltip is the right failure, not an exception that costs the whole list its rows.
    const title = window.tf ? window.tf('xlink.jlptLevel', { lv: label }) : 'JLPT ' + label;
    return `<span class="jlpt-chip" data-level="${tiers[0]}" title="${title}">${label}</span>`;
}

function xlBadgesHtml(entry) {
    if (typeof DICTIONARY_CROSSLINK === 'undefined') return '';
    const rec = DICTIONARY_CROSSLINK[entry.jp];
    if (!rec) return '';
    const d = xlDestinations(rec);
    let html = '';
    for (const key of ['w', 'p', 'r']) {
        const list = d[key];
        if (!list.length) continue;
        const t = XL_TOOLS[key];
        const anyDone = list.some(x => x.done);
        const name = window.t(t.nameKey);
        // the tool class goes on the WRAPPER, not the button: the popover is the button's
        // sibling, so a --xl-c defined on the button would never reach it
        html += `<span class="xl-wrap xl-${t.cls}">
            <button type="button" class="xl-badge xl-${t.cls}${anyDone ? ' is-done' : ''}"
                    aria-expanded="false"
                    aria-label="${escapeHtml(name)} — ${list.length}">
              <svg class="xl-ico" aria-hidden="true"><use href="#${t.icon}"/></svg>
              <span class="xl-n">${list.length}</span>
            </button>
            <span class="xl-pop" hidden>
              <span class="xl-pop-head">${escapeHtml(name)}</span>
              ${list.map(x => `<a class="xl-item${x.done ? ' is-done' : ''}" href="${escapeHtml(x.href)}">
                   <span class="xl-item-line">${escapeHtml(x.line)}</span>
                   ${x.sub ? `<span class="xl-item-sub">${escapeHtml(x.sub)}</span>` : ''}
                 </a>`).join('')}
            </span></span>`;
    }
    return html ? `<span class="xl-badges">${html}</span>` : '';
}

function xlCloseAll(except) {
    document.querySelectorAll('.xl-pop').forEach(p => {
        if (p === except) return;
        p.hidden = true;
        p.parentElement.querySelector('.xl-badge').setAttribute('aria-expanded', 'false');
    });
}
document.addEventListener('click', () => xlCloseAll(null));
document.addEventListener('keydown', e => { if (e.key === 'Escape') xlCloseAll(null); });

function renderMnjpEntry(entry) {
    const card = document.createElement('div');
    card.className = 'mnjp-entry';
    // The badges are a sibling of the row button, never inside it: a link cannot live in a
    // button. The chevron comes out with them, so the button's grid is three columns now.
    card.innerHTML = `
        <div class="mnjp-entry-head">
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
            </button>
            ${jlptChipHtml(entry)}
            ${xlBadgesHtml(entry)}
            <span class="mnjp-expand-hint" aria-hidden="true">&#9662;</span>
        </div>
        <div class="mnjp-detail"></div>
    `;
    const btn = card.querySelector('.mnjp-entry-main');
    const detail = card.querySelector('.mnjp-detail');
    let built = false;
    const toggle = () => {
        if (!built) { built = true; detail.innerHTML = buildMnjpDetail(entry); }
        const open = card.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    btn.addEventListener('click', toggle);
    // The chevron is decorative for assistive tech -- the row button above is the real control --
    // but it still looks clickable, so it stays one for a mouse.
    card.querySelector('.mnjp-expand-hint').addEventListener('click', toggle);

    card.querySelectorAll('.xl-badge').forEach(b => {
        b.addEventListener('click', e => {
            e.stopPropagation();           // or the document handler closes it again immediately
            const pop = b.parentElement.querySelector('.xl-pop');
            const opening = pop.hidden;
            xlCloseAll(opening ? pop : null);
            pop.hidden = !opening;
            b.setAttribute('aria-expanded', String(opening));
        });
    });
    return card;
}

// At 3,537 entries, building every matching card on every keystroke got visibly laggy
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

// ---------------------------------------------------------------------------
// Recently searched
//
// localStorage, not the account: this is a per-device convenience, it is of no use to anyone
// else, and a reading history is the kind of thing that should not quietly follow a login.
// Every read and write is guarded -- a private window can throw on access, and the dictionary
// has to keep working when it does.
// ---------------------------------------------------------------------------
const RECENT_KEY = 'khanjp-dict-recent';
const RECENT_MAX = 12;

function recentLoad() {
    try {
        const raw = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
        return Array.isArray(raw) ? raw.filter(x => typeof x === 'string').slice(0, RECENT_MAX) : [];
    } catch (e) { return []; }
}

function recentSave(list) {
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, RECENT_MAX))); } catch (e) {}
}

function recentRender() {
    const ul = document.getElementById('mnjp-recent-list');
    const empty = document.getElementById('mnjp-recent-empty');
    const clear = document.getElementById('mnjp-recent-clear');
    if (!ul) return;
    const list = recentLoad();
    ul.textContent = '';
    list.forEach(term => {
        const li = document.createElement('li');
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'dict-recent-item';
        b.textContent = term;
        // the full term in a tooltip, since a long one is ellipsised in a 268px column
        b.title = term;
        b.addEventListener('click', () => {
            const input = document.getElementById('mnjp-search');
            input.value = term;
            mnjpQuery = term;
            renderMnjpList();
            recentAdd(term);          // re-picking it moves it back to the top
            input.focus();
        });
        li.appendChild(b);
        ul.appendChild(li);
    });
    empty.classList.toggle('hidden', list.length > 0);
    clear.classList.toggle('hidden', list.length === 0);
}

function recentAdd(term) {
    const t = (term || '').trim();
    // A one-character Latin or Cyrillic query matches most of the dictionary, so remembering it
    // teaches nothing. A one-character JAPANESE query is the opposite: 水 is a whole word, and
    // も is an entry in its own right -- so length alone is the wrong test, and a "min 2 chars"
    // rule silently dropped every single-kanji search.
    const ONE_CHAR_OK = /^[一-龯㐀-䶿ぁ-ゖァ-ヺ]$/;
    if (t.length < 2 && !ONE_CHAR_OK.test(t)) return;
    if (!MNJP_ENTRIES.some(e => matchesMnjpSearch(e, t))) return;
    const lower = t.toLowerCase();
    const list = recentLoad().filter(x => x.toLowerCase() !== lower);
    list.unshift(t);
    recentSave(list);
    recentRender();
}

let mnjpSearchDebounce = null;
let mnjpRecentDebounce = null;
document.getElementById('mnjp-search').addEventListener('input', (e) => {
    const value = e.target.value;
    clearTimeout(mnjpSearchDebounce);
    mnjpSearchDebounce = window.setTimeout(() => {
        mnjpQuery = value.trim();
        renderMnjpList();
    }, 120);
    // Remembered only once typing settles, or every keystroke of "толь" would leave four
    // entries behind. Enter and the magnifier skip the wait.
    clearTimeout(mnjpRecentDebounce);
    mnjpRecentDebounce = window.setTimeout(() => recentAdd(value), 1100);
});

document.getElementById('mnjp-search').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    clearTimeout(mnjpRecentDebounce);
    recentAdd(e.target.value);
});

// The list already filters as you type, so the magnifier does not "run" the search -- it commits
// the term and drops the phone keyboard, which is what tapping it is actually for.
document.getElementById('mnjp-search-btn').addEventListener('click', () => {
    const input = document.getElementById('mnjp-search');
    clearTimeout(mnjpRecentDebounce);
    recentAdd(input.value);
    input.blur();
});

document.getElementById('mnjp-recent-clear').addEventListener('click', () => {
    recentSave([]);
    recentRender();
    document.getElementById('mnjp-search').focus();
});

// The secondary tab's magnifier has no list to feed; it just dismisses the keyboard.
document.getElementById('dict-search-btn').addEventListener('click', () => {
    document.getElementById('dict-search').blur();
});

// i18n.js translates data-i18n / -html / -placeholder only, so an aria-label has to be set
// here, and again whenever the visitor switches language.
function syncSearchLabels() {
    if (!window.t) return;
    const label = window.t('a11y.searchBtn');
    ['mnjp-search-btn', 'dict-search-btn'].forEach(id => {
        const b = document.getElementById(id);
        if (b) { b.setAttribute('aria-label', label); b.title = label; }
    });
}
document.addEventListener('sitelangchange', syncSearchLabels);
syncSearchLabels();

recentRender();

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

// Cross-tool badges need three small reads to know what is finished. Once per auth change, never
// per keystroke -- then re-render so the badges pick up their done state. onAuthChange replays a
// known session as soon as a listener registers, so this covers the first paint too.
if (window.onAuthChange) {
    window.onAuthChange(async () => {
        await xlLoadProgress();
        renderMnjpList();
    });
} else {
    // no Supabase on this load: still pick up the local phonetics set
    xlLoadProgress().then(() => renderMnjpList());
}
