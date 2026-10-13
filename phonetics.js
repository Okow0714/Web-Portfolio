// Kanji Phonetics ("Phonetics Family") — browse kanji grouped by shared phonetic component
// ("sound family"), split by JLPT level and ranked by real usage frequency within each level.
// Pure browsing/reference tool: no auth-gated save-progress requirement, so this only uses
// auth-shared.js for the shared header login bar.
//
// Depends on phonetics-data.js (PHONETICS_DATA — already ranked, do not re-sort) having run
// first. Layout: a persistent sidebar (JLPT level nav, always visible) drives a content pane
// that swaps between two views per the level currently picked — a ranked family list, or (once
// a family's picked) that family's radial tree view.

// title reuses the exact same JLPT-tier labels already translated for the header nav dropdown
// (nav.n5Beginner etc, in i18n-strings-shared.js) -- a getter, not a static string, so it stays
// in sync with the active language on every render rather than only at file-load time.
const LEVEL_META = [
    { key: 'N5', get title() { return window.t('nav.n5Beginner'); } },
    { key: 'N4', get title() { return window.t('nav.n4Elementary'); } },
    { key: 'N3', get title() { return window.t('nav.n3Intermediate'); } },
    { key: 'N2', get title() { return window.t('nav.n2UpperIntermediate'); } },
    { key: 'N1', get title() { return window.t('nav.n1Advanced'); } },
];

const SCREEN_TRANSITION_MS = 280;

let currentLevelKey = null;
let currentFamily = null;
let treeResizeHandler = null;
let activeChipEl = null;

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ---------------------------------------------------------------------------
// Screen switching with a smooth fade + slide/scale transition, instead of an
// instant `.hidden` toggle. `.hidden` (display:none) still happens — just after
// the leave transition finishes — so off-screen sections stay out of layout/
// a11y trees exactly like before.
// ---------------------------------------------------------------------------
function switchScreen(hideIds, showId) {
    hideIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el || el.classList.contains('hidden')) return;
        el.classList.add('phonetics-section-leave');
        window.setTimeout(() => {
            el.classList.add('hidden');
            el.classList.remove('phonetics-section-leave');
        }, SCREEN_TRANSITION_MS);
    });

    const showEl_ = document.getElementById(showId);
    showEl_.classList.remove('hidden');
    showEl_.classList.add('phonetics-section-enter');
    // Force a reflow so the browser registers the "enter" (offset/faded) state
    // before we remove it — otherwise the transition to the resting state never runs.
    void showEl_.offsetWidth;
    requestAnimationFrame(() => {
        showEl_.classList.remove('phonetics-section-enter');
    });
}

// ---------------------------------------------------------------------------
// The board: pick a level, pick a shape, guess its reading
//
// This whole screen runs on phonetics-quiz-data.js (~100KB), not phonetics-data.js (~2.8MB).
// A guess needs a component, the sound it predicts, and its members with their own readings --
// nothing else. The big file is still loaded for the dictionary's ?kanji= lookup at the bottom
// of this file, which shows example sentences the board has no room for.
//
// The point of the screen is the prediction, not the index. A member starts as a "?": you say
// what you think it reads, then click to check, and the spoke turns jade if the component's
// sound really is in that kanji's set and copper if it is not. Both outcomes teach -- the
// exceptions are the reason the rule is worth knowing.
// ---------------------------------------------------------------------------
const QUIZ = (typeof PHONETICS_QUIZ !== 'undefined') ? PHONETICS_QUIZ : {};

// Read from the data file rather than kept as a second copy here. An earlier draft declared
// these again in this file, which meant the board's stage 2 and the drill's stage 2 could drift
// apart silently; now there is one list and nothing to compare.
const CHECKPOINTS = (typeof PHONETICS_CHECKPOINTS !== 'undefined') ? PHONETICS_CHECKPOINTS : {};

let chunks = [];            // this level's shapes, cut into stages
let currentCheckpoint = 0;
let curIndex = 0;           // which shape the board is showing
// Whether the visitor has actually answered the gate's question. Not the same as having a
// currentLevelKey: the dictionary's ?kanji= link sets one too, picked as 'the first level this
// family appears under', which nobody chose. Back from that lookup must not strand them on a
// level they never asked for.
let levelChosen = false;
let shown = [];             // which of its members you have turned over

function levelChunks(levelKey) {
    const all = (QUIZ[levelKey] || []).slice();
    const n = CHECKPOINTS[levelKey] || 1;
    const per = Math.ceil(all.length / n);
    const out = [];
    for (let i = 0; i < n; i++) out.push(all.slice(i * per, (i + 1) * per));
    return out;
}

function stageList() { return chunks[currentCheckpoint] || []; }

// The JLPT hues are declared on :root in style.css, so the one place they are written stays the
// one place. Reading them here keeps a level's colour the same on the dial, the chip and the
// level dot on every member.
function hueFor(levelKey) {
    const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--jlpt-' + levelKey.toLowerCase()).trim();
    return v || 'var(--border-strong)';
}

// ---------------------------------------------------------------------------
// The arrival gate, and the chip it shrinks to
// ---------------------------------------------------------------------------
// A dial rather than a list, because the five levels are a choice and not a sequence. The spokes
// are an SVG with preserveAspectRatio:none over a 0 0 100 100 viewBox and the buttons are placed
// in percent, so both live in one coordinate space and stay joined at any size.
function renderGateDial() {
    const dial = document.getElementById('phonetics-gate-dial');
    if (!dial) return;
    dial.innerHTML = '';
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    dial.appendChild(svg);

    const hub = document.createElement('span');
    hub.className = 'dial-hub';
    hub.textContent = 'JLPT';
    dial.appendChild(hub);

    LEVEL_META.forEach((level, i) => {
        const a = -Math.PI / 2 + i * 2 * Math.PI / LEVEL_META.length;
        const x = 50 + 34 * Math.cos(a), y = 50 + 34 * Math.sin(a);
        const line = document.createElementNS(NS, 'line');
        line.setAttribute('x1', '50');
        line.setAttribute('y1', '50');
        line.setAttribute('x2', x.toFixed(2));
        line.setAttribute('y2', y.toFixed(2));
        line.setAttribute('class', 'dial-spoke');
        svg.appendChild(line);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lv';
        btn.dataset.level = level.key;
        btn.style.setProperty('--hue', hueFor(level.key));
        btn.style.left = x.toFixed(2) + '%';
        btn.style.top = y.toFixed(2) + '%';
        // nav.n5Beginner already reads "N5 · Beginner", and the big line prints the key, so the
        // card takes only the description half.
        const desc = level.title.replace(/^\s*N\d\s*(?:·|&middot;|-)\s*/, '');
        btn.innerHTML = '<span class="lv-n">' + escapeHtml(level.key) + '</span>'
            + '<span class="lv-t">' + escapeHtml(desc) + '</span>';
        btn.setAttribute('aria-label', window.tf('phonetics.gateAria',
            { level: level.key, n: (QUIZ[level.key] || []).length }));
        btn.addEventListener('click', () => enterLevel(level.key, 0));
        dial.appendChild(btn);
    });
}

function showGate() {
    levelChosen = false;
    stopTreeResize();
    document.getElementById('phonetics-app').hidden = true;
    document.getElementById('family-tree-section').classList.add('hidden');
    document.getElementById('phonetics-gate').hidden = false;
    document.getElementById('phonetics-chip').hidden = true;
    currentLevelKey = null;
    window.scrollTo(0, 0);
}

function enterLevel(levelKey, checkpoint) {
    levelChosen = true;
    currentLevelKey = levelKey;
    chunks = levelChunks(levelKey);
    currentCheckpoint = Math.min(Math.max(checkpoint || 0, 0), Math.max(chunks.length - 1, 0));
    curIndex = 0;
    shown = [];

    document.getElementById('phonetics-gate').hidden = true;
    document.getElementById('family-tree-section').classList.add('hidden');
    document.getElementById('phonetics-app').hidden = false;

    const chip = document.getElementById('phonetics-chip');
    chip.hidden = false;
    chip.style.setProperty('--hue', hueFor(levelKey));
    document.getElementById('phonetics-chip-dot').textContent = levelKey;

    drawTimeline();
    drawPicker();
    drawBoard();
    drawDrillPanel();
    window.scrollTo(0, 0);
}

// ---------------------------------------------------------------------------
// The stage timeline
// ---------------------------------------------------------------------------
// Only where there is a journey. One stage is not one, so N5 and N4 show no rail at all.
function drawTimeline() {
    const rail = document.getElementById('phonetics-timeline');
    rail.innerHTML = '';
    if (chunks.length < 2) { rail.hidden = true; return; }
    rail.hidden = false;
    rail.setAttribute('aria-label', window.t('phonetics.stagesLabel'));
    chunks.forEach((chunk, i) => {
        const done = chunk.filter(f => quizStatus(currentLevelKey, f.c) === 'hit').length;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cp';
        btn.setAttribute('aria-pressed', String(i === currentCheckpoint));
        btn.setAttribute('aria-label', window.tf('phonetics.cpAria',
            { n: i + 1, total: chunks.length, count: chunk.length, done }));
        btn.innerHTML = `
            <span class="cp-dot">${i + 1}</span>
            <span class="cp-bar"><i style="width:${chunk.length ? Math.round(100 * done / chunk.length) : 0}%"></i></span>
            <span class="cp-l"><b>${escapeHtml(window.tf('phonetics.cpShapes', { n: chunk.length }))}</b>${escapeHtml(window.tf('phonetics.cpDone', { n: done }))}</span>
        `;
        btn.addEventListener('click', () => {
            currentCheckpoint = i;
            curIndex = 0;
            shown = [];
            drawTimeline(); drawPicker(); drawBoard(); drawDrillPanel();
        });
        rail.appendChild(btn);
    });
}

// ---------------------------------------------------------------------------
// The picker: every shape at this stage, coloured by what the drill last asked
// ---------------------------------------------------------------------------
// A grid of bare glyphs rather than the ranked rows this page used to show. The row carried a
// rank, the shape, its reading and a member count; three of those four are answers to the
// question the board is about to ask, which made the index a spoiler for the lesson.
function drawPicker() {
    const picker = document.getElementById('phonetics-picker');
    picker.innerHTML = '';
    stageList().forEach((family, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pick';
        btn.textContent = family.c;
        btn.dataset.s = quizStatus(currentLevelKey, family.c);
        btn.setAttribute('aria-pressed', String(i === curIndex));
        btn.title = family.c + ' · ' + window.tf('phonetics.kanjiInFamily', { n: family.m.length });
        btn.addEventListener('click', () => {
            curIndex = i;
            shown = [];
            drawPicker(); drawBoard();
        });
        picker.appendChild(btn);
    });
}

// ---------------------------------------------------------------------------
// The prediction board
// ---------------------------------------------------------------------------
function drawBoard() {
    const box = document.getElementById('phonetics-board');
    box.innerHTML = '';
    const family = stageList()[curIndex];
    if (!family) return;

    // The component predicts ONE reading to try. Which of its sounds is "the" prediction is the
    // first, because the generator orders them by how many members take them.
    const want = family.s[0];
    const n = family.m.length;
    const R = n <= 6 ? 36 : (n <= 9 ? 38 : 39);
    const NS = 'http://www.w3.org/2000/svg';

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'spokes');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    box.appendChild(svg);

    const core = document.createElement('div');
    core.className = 'core';
    core.innerHTML = '<span class="core-k">' + escapeHtml(family.c) + '</span>'
        + '<span class="core-r">' + escapeHtml(want) + '</span>'
        + '<span class="core-cap">' + escapeHtml(window.t('phonetics.tryThis')) + '</span>';
    box.appendChild(core);

    family.m.forEach((member, j) => {
        const a = -Math.PI / 2 + j * 2 * Math.PI / n;
        const x = 50 + R * Math.cos(a), y = 50 + R * Math.sin(a);
        const hit = member.on.indexOf(want) >= 0;

        const line = document.createElementNS(NS, 'line');
        line.setAttribute('x1', '50');
        line.setAttribute('y1', '50');
        line.setAttribute('x2', x.toFixed(2));
        line.setAttribute('y2', y.toFixed(2));
        line.setAttribute('class', 'spoke' + (shown[j] ? (hit ? ' done' : ' miss') : ''));
        svg.appendChild(line);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'node';
        btn.style.left = x.toFixed(2) + '%';
        btn.style.top = y.toFixed(2) + '%';
        if (shown[j]) btn.dataset.state = hit ? 'hit' : 'miss';

        let readings;
        if (shown[j]) {
            readings = member.on.map(o =>
                '<span class="' + (o === want ? 'y' : 'n') + '">' + escapeHtml(o) + '</span>'
            ).join('・');
        } else {
            readings = '<span class="q">?</span>';
        }
        // metClass() tints a kanji you have already handled in the tools; it is about you, the
        // level dot is about the kanji, and they sit on different parts of the node.
        btn.innerHTML = '<span class="node-face ' + metClass(member.k) + '">'
            + '<span class="node-k">' + escapeHtml(member.k) + '</span>'
            + '<span class="dot" style="--lv:' + hueFor(member.lv) + '" title="' + escapeHtml(member.lv) + '"></span>'
            + '</span>'
            + '<span class="node-mn">' + escapeHtml(member.mn || '') + '</span>'
            + '<span class="node-on">' + readings + '</span>';
        btn.setAttribute('aria-label', member.k + ' — ' + (member.mn || '')
            + (shown[j] ? ' — ' + member.on.join('・') : ' — ' + window.t('phonetics.tapToCheck')));
        btn.addEventListener('click', () => { shown[j] = !shown[j]; drawBoard(); });
        box.appendChild(btn);
    });

    // Opening a family is still "seeing" it, exactly as it was from the old list.
    markFamilySeen(family.c);

    let hits = 0, misses = 0;
    family.m.forEach((m, j) => { if (shown[j]) { (m.on.indexOf(want) >= 0) ? hits++ : misses++; } });
    const score = document.getElementById('phonetics-score');
    score.innerHTML = escapeHtml(window.tf('phonetics.checked', { n: hits + misses, total: n }))
        + ' · <b>' + escapeHtml(window.tf('phonetics.matched', { n: hits })) + '</b>'
        + ' · <i>' + escapeHtml(window.tf('phonetics.unmatched', { n: misses })) + '</i>';
}

// ---------------------------------------------------------------------------
// The drill's entry panel
// ---------------------------------------------------------------------------
// The panel only chooses a deck and starts. The round itself happens on phonetics-drill.html,
// full screen: the board sitting beside a question is both a distraction and, since the picker
// prints every shape being asked about, the answer key.
const DECKS = [['new', 'drill.deckNew'], ['miss', 'drill.deckMiss'],
               ['hit', 'drill.deckHit'], ['all', 'drill.deckAll']];
let drillDeck = 'new';

function deckCounts() {
    const out = { 'new': 0, miss: 0, hit: 0, all: stageList().length };
    stageList().forEach(f => { out[quizStatus(currentLevelKey, f.c)]++; });
    return out;
}

function drawDrillPanel() {
    const host = document.getElementById('phonetics-drill-panel');
    host.innerHTML = '';
    const counts = deckCounts();
    if (!counts.all) {
        host.innerHTML = '<p class="drill-panel-sub">'
            + escapeHtml(window.t('phonetics.noShapes')) + '</p>';
        return;
    }
    // A deck with nothing in it cannot start a round, and "miss" is empty until you have missed
    // something, so the first visit offers exactly one real choice.
    if (!counts[drillDeck]) drillDeck = counts['new'] ? 'new' : 'all';

    const grid = document.createElement('div');
    grid.className = 'decks';
    DECKS.forEach(([key, strKey]) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'deck';
        btn.disabled = !counts[key];
        btn.setAttribute('aria-pressed', String(key === drillDeck));
        btn.innerHTML = '<span class="deck-n">' + counts[key] + '</span>'
            + '<span class="deck-l">' + escapeHtml(window.t(strKey)) + '</span>';
        btn.addEventListener('click', () => { drillDeck = key; drawDrillPanel(); });
        grid.appendChild(btn);
    });
    host.appendChild(grid);

    const go = document.createElement('a');
    go.className = 'drill-go';
    go.id = 'phonetics-drill-cta';
    go.href = 'phonetics-drill.html?level=' + encodeURIComponent(currentLevelKey)
        + '&cp=' + (currentCheckpoint + 1) + '&deck=' + drillDeck + '&start=1';
    go.textContent = window.tf('phonetics.startRound', { n: Math.min(10, counts[drillDeck]) });
    host.appendChild(go);
}

// ---------------------------------------------------------------------------
// Family tree — a radial diagram: the root phonetic sits in the center, member
// kanji are compact circular chips arranged around it (one ring, or two
// concentric rings for larger families), joined to the center by straight SVG
// spoke lines. Clicking a chip opens a detail panel below the diagram instead
// of every member always being fully expanded.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Kanji you have already met
// ---------------------------------------------------------------------------
// word_stats records the words a signed-in learner has attempted in the tools; a kanji counts
// as met if it appears in any of them. This page is a map of the writing system, and until now
// it showed every visitor the identical map — marking what you have already handled turns it
// into a map of your own progress through it.
//
// "Solid" means you have got that word right more often than wrong. Meeting a kanji once and
// missing it every time is not the same as knowing it, and the map should not claim otherwise.
const metKanji = new Set();
const solidKanji = new Set();

// ---------------------------------------------------------------------------
// Which families this learner has opened. Weaker than the met/solid tinting above and
// deliberately so: there is nothing to complete in a map you browse, so this records attention,
// not achievement, and the marker reads "seen".
//
// Keyed on the phonetic alone. A family is re-listed under every level one of its members
// belongs to, with an identical member array each time (see the deep-link note at the bottom of
// this file), so opening it from N5 and from N4 is the same act.
//
// localStorage holds it whether or not anyone is signed in, because every tool on this site works
// without an account. Signing in merges the local set UP into phonetics_progress and never
// subtracts -- a second device must not erase the first one's history.
// ---------------------------------------------------------------------------
// What the drill has asked, written by phonetics-drill.js and only read here. It sits
// ALONGSIDE the seen set rather than replacing it: "seen" means you opened a family and syncs
// to phonetics_progress, while hit/miss means you were tested. Two different facts.
const QUIZ_KEY = 'khanjp-phon-quiz-v1';

function quizStatus(levelKey, phonetic) {
    try {
        const all = JSON.parse(localStorage.getItem(QUIZ_KEY) || '{}');
        const e = (all[levelKey] || {})[phonetic];
        return e && e.last ? e.last : 'new';
    } catch (e) { return 'new'; }
}

const SEEN_KEY = 'khanjp-phonetics-seen';
const seenFamilies = new Set();

function readSeenLocal() {
    try {
        const raw = localStorage.getItem(SEEN_KEY);
        return Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    } catch (e) {
        return [];   // private mode, or someone edited it by hand
    }
}

function writeSeenLocal() {
    try {
        localStorage.setItem(SEEN_KEY, JSON.stringify([...seenFamilies]));
    } catch (e) {
        /* private mode or full -- losing a browse history is not worth throwing over */
    }
}

async function loadSeenFamilies() {
    seenFamilies.clear();
    readSeenLocal().forEach(p => seenFamilies.add(p));

    const session = window.getCurrentSession && window.getCurrentSession();
    if (!session || !window.supabaseReady) return;

    const sb = window.supabaseClient;
    const { data, error } = await sb.from('phonetics_progress')
        .select('phonetic').eq('user_id', session.user.id).limit(1000);
    if (error || !data) return;                       // offline or table missing: keep the local set
    const remote = new Set(data.map(r => r.phonetic));
    const onlyLocal = [...seenFamilies].filter(p => !remote.has(p));
    remote.forEach(p => seenFamilies.add(p));
    writeSeenLocal();

    if (onlyLocal.length) {
        await sb.from('phonetics_progress').upsert(
            onlyLocal.map(p => ({ user_id: session.user.id, phonetic: p })),
            { onConflict: 'user_id,phonetic' });
    }
}

function markFamilySeen(phonetic) {
    if (!phonetic || seenFamilies.has(phonetic)) return false;
    seenFamilies.add(phonetic);
    writeSeenLocal();

    const session = window.getCurrentSession && window.getCurrentSession();
    if (session && window.supabaseReady) {
        // fire and forget: a failed write costs a mark, not the page
        window.supabaseClient.from('phonetics_progress')
            .upsert({ user_id: session.user.id, phonetic }, { onConflict: 'user_id,phonetic' })
            .then(() => {}, () => {});
    }
    return true;
}

async function loadMetKanji() {
    const session = window.getCurrentSession && window.getCurrentSession();
    metKanji.clear();
    solidKanji.clear();
    if (!session || !window.supabaseReady) return;
    const { data, error } = await window.supabaseClient
        .from('word_stats').select('word, attempts, misses')
        .eq('user_id', session.user.id).limit(1000);
    if (error || !data) return;
    data.forEach(row => {
        const solid = (row.attempts - row.misses) > row.misses;
        for (const ch of row.word) {
            if (!/[一-龯]/.test(ch)) continue;
            metKanji.add(ch);
            if (solid) solidKanji.add(ch);
        }
    });
}

function metClass(kanji) {
    if (solidKanji.has(kanji)) return ' is-solid';
    if (metKanji.has(kanji)) return ' is-met';
    return '';
}

function chipHtml(member, index, isRootLevel) {
    return `
        <button type="button" class="tree-chip${isRootLevel ? ' tree-chip-current-level' : ''}${metClass(member.kanji)}"
                data-index="${index}" data-kanji="${escapeHtml(member.kanji)}"
                aria-label="${escapeHtml(member.kanji)} (${escapeHtml(member.level || '')})">
            ${escapeHtml(member.kanji)}
            <span class="tree-chip-dot" data-level="${escapeHtml(member.level || '')}"></span>
        </button>
    `;
}

function detailHtml(member) {
    const useMn = window.siteLang() === 'mn' && member.meaningsMn && member.meaningsMn.length;
    const meaningsList = useMn ? member.meaningsMn : member.meanings;
    const meanings = meaningsList && meaningsList.length ? meaningsList.join(', ') : '';
    const exampleEn = (useMn && member.example && member.example.enMn) ? member.example.enMn : (member.example ? member.example.en : '');
    const exampleHtml = member.example
        ? `<div class="tree-example">
               <p class="tree-example-jp">${member.example.furigana || escapeHtml(member.example.jp)}</p>
               <p class="tree-example-en">${escapeHtml(exampleEn)}</p>
           </div>`
        : `<p class="tree-example-none">${escapeHtml(window.t('phonetics.noExampleForKanji'))}</p>`;

    return `
        <div class="tree-detail-head">
            <span class="tree-detail-kanji">${escapeHtml(member.kanji)}</span>
            <span class="tree-detail-level" data-level="${escapeHtml(member.level || '')}">${member.level ? escapeHtml(member.level) : '?'}</span>
        </div>
        <div class="tree-detail-readings">
            ${member.onyomi ? `<span class="tree-reading-on">${escapeHtml(member.onyomi)}</span>` : ''}
            ${member.kunyomi ? `<span class="tree-reading-kun">${escapeHtml(member.kunyomi)}</span>` : ''}
        </div>
        <p class="tree-detail-meaning">${escapeHtml(meanings)}</p>
        ${exampleHtml}
    `;
}

function showFamilyTree(levelKey, family) {
    currentLevelKey = levelKey;
    currentFamily = family;
    markFamilySeen(family.phonetic);
    activeChipEl = null;
    const level = LEVEL_META.find(l => l.key === levelKey);

    const wrap = document.getElementById('tree-wrap');
    wrap.innerHTML = `
        <div class="tree-header">
            <h2 class="phonetics-title tree-title">${escapeHtml(family.phonetic)} <span class="tree-title-reading">${family.reading ? escapeHtml(family.reading) : ''}</span></h2>
            <p class="phonetics-subtitle">${escapeHtml(window.tf('phonetics.familyForLevelHint', { level: level.title, n: family.members.length }))}</p>
        </div>
        <div class="tree-canvas" id="tree-canvas">
            <svg id="tree-lines" class="tree-lines"></svg>
            <div class="tree-root-node" id="tree-root-node">
                <span class="tree-root-kanji">${escapeHtml(family.phonetic)}</span>
                <span class="tree-root-reading">${family.reading ? escapeHtml(family.reading) : escapeHtml(window.t('phonetics.shared'))}</span>
            </div>
            ${family.members.map((m, i) => chipHtml(m, i, m.level === levelKey)).join('')}
            <div class="tree-popover" id="tree-popover"></div>
        </div>
    `;

    switchScreen([], 'family-tree-section');

    wrap.querySelectorAll('.tree-chip').forEach(chip => {
        chip.addEventListener('click', () => onChipClick(chip, family));
    });

    // Layout must exist (and be laid out at final size) before measuring positions.
    requestAnimationFrame(() => {
        layoutRadialTree();
        drawTreeLines();
        // A page-load deep link (phonetics.html?kanji=...) auto-opens its target kanji's detail
        // popover once positions are final -- tied to this render completing rather than a fixed
        // delay, since i18n.js's sitelangchange fires once on every load (even without a real
        // language switch, see i18n.js's applyLang) and re-runs showFamilyTree (see the
        // sitelangchange listener below) shortly after this same initial render, tearing down
        // and rebuilding the exact chips/popover just clicked. Deliberately never cleared to a
        // one-shot flag: since that second render is guaranteed to be the last one for a given
        // load, only re-applying unconditionally on every render (rather than once and hoping
        // it "wins") reliably survives it, regardless of which render finishes first.
        if (deepLinkKanji && family.members.some(m => m.kanji === deepLinkKanji)) {
            const chip = wrap.querySelector(`.tree-chip[data-kanji="${CSS.escape(deepLinkKanji)}"]`);
            if (chip) chip.click();
        }
    });
    startTreeResize();
}

function onChipClick(chip, family) {
    const popover = document.getElementById('tree-popover');

    if (activeChipEl === chip) {
        // Same chip clicked again: collapse back into it.
        chip.classList.remove('active');
        activeChipEl = null;
        popover.classList.remove('open');
        return;
    }

    if (activeChipEl) activeChipEl.classList.remove('active');
    chip.classList.add('active');
    activeChipEl = chip;

    const index = Number(chip.dataset.index);
    const member = family.members[index];
    popover.innerHTML = detailHtml(member);

    // Position (and re-measure, since content just changed its height) before
    // revealing, so it opens exactly in place at the chip rather than flashing
    // at a stale position first — this also handles switching directly from one
    // open chip to another, sliding smoothly to the new spot.
    positionPopoverAt(chip);
    popover.classList.add('open');
}

// ---------------------------------------------------------------------------
// Positions the popover so it opens in place at the clicked chip instead of a
// separate panel elsewhere: anchored to the chip's own --tx/--ty circle
// position, pushed further outward along the same angle from the root so it
// reads as that chip expanding outward rather than sitting on top of it, then
// clamped to the viewport so chips near the edge of the circle never produce
// a popover that clips off-screen.
// ---------------------------------------------------------------------------
function positionPopoverAt(chip) {
    const canvas = document.getElementById('tree-canvas');
    const popover = document.getElementById('tree-popover');
    if (!canvas || !popover) return;

    const canvasRect = canvas.getBoundingClientRect();
    const chipStyle = getComputedStyle(chip);
    const tx = parseFloat(chipStyle.getPropertyValue('--tx')) || 0;
    const ty = parseFloat(chipStyle.getPropertyValue('--ty')) || 0;
    const chipCenterX = canvasRect.width / 2 + tx;
    const chipCenterY = canvasRect.height / 2 + ty;
    const angle = Math.atan2(ty, tx);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const pw = popover.offsetWidth;
    const ph = popover.offsetHeight;
    const chipRadius = chip.offsetWidth / 2;
    const gap = 14;
    const margin = 12;

    // Distance from the popover's own center to its nearest edge along a given
    // push direction (ray-vs-rectangle), so the push clears the box regardless
    // of the direction — a fixed push distance overlapped the anchor chip
    // whenever the popover was taller/wider than that fixed value in that
    // direction, which made that chip unclickable (couldn't re-click it to
    // collapse).
    function pushedPosition(cosDir, sinDir) {
        const halfExtent = Math.min(
            cosDir !== 0 ? (pw / 2) / Math.abs(cosDir) : Infinity,
            sinDir !== 0 ? (ph / 2) / Math.abs(sinDir) : Infinity
        );
        const push = chipRadius + gap + halfExtent;
        return {
            left: chipCenterX + cosDir * push - pw / 2,
            top: chipCenterY + sinDir * push - ph / 2,
        };
    }

    // Usable bounds, converted into canvas-local coordinates: never above the
    // canvas's own top (the heading/subtitle sits just above it) horizontally/
    // below/right bounded by the viewport itself.
    const localMinX = margin - canvasRect.left;
    const localMaxX = window.innerWidth - margin - canvasRect.left;
    const localMinY = Math.max(margin - canvasRect.top, 0);
    const localMaxY = window.innerHeight - margin - canvasRect.top;

    // Pick which side of the chip to push toward per axis based on which side
    // actually has more room, rather than blindly trusting the chip's own
    // outward angle — a chip near the top/bottom/left/right of the viewport
    // can have its "natural" outward direction run out of room, and simply
    // clamping the final box back into bounds (without re-choosing direction)
    // can leave it overlapping the very chip it's meant to clear.
    const roomRight = localMaxX - chipCenterX;
    const roomLeft = chipCenterX - localMinX;
    const roomBelow = localMaxY - chipCenterY;
    const roomAbove = chipCenterY - localMinY;
    const signX = roomRight >= roomLeft ? 1 : -1;
    const signY = roomBelow >= roomAbove ? 1 : -1;

    const effCos = cos === 0 ? 0 : (Math.sign(cos) === signX ? cos : -cos);
    const effSin = sin === 0 ? 0 : (Math.sign(sin) === signY ? sin : -sin);

    let { left, top } = pushedPosition(effCos, effSin);

    // Final safety-net clamp for anything still outside the usable bounds
    // (e.g. a popover simply too large for a very narrow viewport).
    const viewportLeft = canvasRect.left + left;
    const viewportTop = canvasRect.top + top;
    const clampedViewportLeft = Math.min(Math.max(viewportLeft, margin), window.innerWidth - pw - margin);
    const clampedViewportTop = Math.min(Math.max(viewportTop, Math.max(margin, canvasRect.top)), window.innerHeight - ph - margin);
    left += clampedViewportLeft - viewportLeft;
    top += clampedViewportTop - viewportTop;

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;

    // Keep the scale-in transform-origin pointed at the chip's own center
    // (not the popover's own center) so it still visibly emerges from the
    // chip even after edge-clamping shifts the box.
    const originX = pw ? ((chipCenterX - left) / pw) * 100 : 50;
    const originY = ph ? ((chipCenterY - top) / ph) * 100 : 50;
    popover.style.setProperty('--pop-origin-x', `${Math.max(0, Math.min(100, originX))}%`);
    popover.style.setProperty('--pop-origin-y', `${Math.max(0, Math.min(100, originY))}%`);
}

// ---------------------------------------------------------------------------
// Radial layout — positions each chip via trigonometry (angle = 360deg/n * i)
// around the canvas center. Families over 6 members split into two concentric
// rings so chips never overlap; radius scales with the canvas's own measured
// size so this stays responsive without hardcoding pixel breakpoints.
// ---------------------------------------------------------------------------
function layoutRadialTree() {
    const canvas = document.getElementById('tree-canvas');
    if (!canvas) return;
    const chips = Array.from(canvas.querySelectorAll('.tree-chip'));
    if (!chips.length) return;

    const n = chips.length;
    canvas.dataset.tier = n > 8 ? 'dense' : n > 5 ? 'cozy' : 'sparse';

    const rect = canvas.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);
    if (!size) return;

    const chipSize = chips[0].getBoundingClientRect().width || 44;
    const half = size / 2;
    const maxRadius = Math.max(half - chipSize / 2 - 6, chipSize);

    let rings;
    if (n <= 6) {
        rings = [{ items: chips, radius: maxRadius }];
    } else {
        const innerCount = Math.ceil(n / 2);
        rings = [
            { items: chips.slice(0, innerCount), radius: maxRadius * 0.55 },
            { items: chips.slice(innerCount), radius: maxRadius },
        ];
    }

    rings.forEach((ring, ringIndex) => {
        const count = ring.items.length;
        ring.items.forEach((chip, i) => {
            const angle = (-90 + (360 / count) * i) * (Math.PI / 180);
            const tx = Math.cos(angle) * ring.radius;
            const ty = Math.sin(angle) * ring.radius;
            chip.style.setProperty('--tx', `${tx}px`);
            chip.style.setProperty('--ty', `${ty}px`);

            // Stagger the arrival by ring, then around each ring, so the family opens outward from
            // the phonetic component at its centre -- which is the thing the page is teaching:
            // these kanji share that part, so learning it once buys you all of them.
            chip.style.setProperty('--arrive', `${ringIndex * 85 + i * 20}ms`);
        });
    });

    // Start the animation only now. The chips are in the DOM before this function runs, so
    // animating on insert would have them flying toward a --tx/--ty that is still unset, i.e.
    // toward the centre they are already at.
    requestAnimationFrame(() => {
        rings.forEach(ring => ring.items.forEach(chip => chip.classList.add('is-placed')));
    });
}

// ---------------------------------------------------------------------------
// Tree spoke lines — same getBoundingClientRect-based approach as game.js's
// board-lines SVG connector, adapted to draw a straight root->chip line per
// member instead of the old top-down elbow-connector path.
// ---------------------------------------------------------------------------
function drawTreeLines() {
    const canvas = document.getElementById('tree-canvas');
    const svg = document.getElementById('tree-lines');
    if (!canvas || !svg) return;

    const rootEl = canvas.querySelector('#tree-root-node');
    const chipEls = canvas.querySelectorAll('.tree-chip');
    if (!rootEl || !chipEls.length) return;

    const canvasRect = canvas.getBoundingClientRect();
    svg.setAttribute('width', canvasRect.width);
    svg.setAttribute('height', canvasRect.height);
    svg.innerHTML = '';

    // Root sits dead-center of the canvas by CSS (top/left: 50%), so its
    // on-screen center is just the canvas center — stable regardless of the
    // chips' own transform transition.
    const rootX = canvasRect.width / 2;
    const rootY = canvasRect.height / 2;

    // Read the --tx/--ty custom properties layoutRadialTree() just set,
    // rather than measuring the chip's live getBoundingClientRect(): the
    // chip has a CSS transition on `transform`, so measuring immediately
    // after changing --tx/--ty would catch it mid-transition (collapsed
    // back toward the root) instead of at its final resting position.
    chipEls.forEach(chipEl => {
        const style = getComputedStyle(chipEl);
        const tx = parseFloat(style.getPropertyValue('--tx')) || 0;
        const ty = parseFloat(style.getPropertyValue('--ty')) || 0;
        const chipX = rootX + tx;
        const chipY = rootY + ty;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', rootX);
        line.setAttribute('y1', rootY);
        line.setAttribute('x2', chipX);
        line.setAttribute('y2', chipY);
        line.setAttribute('class', 'tree-line');
        svg.appendChild(line);
    });
}

function startTreeResize() {
    stopTreeResize();
    treeResizeHandler = () => {
        layoutRadialTree();
        drawTreeLines();
        if (activeChipEl) positionPopoverAt(activeChipEl);
    };
    window.addEventListener('resize', treeResizeHandler);
}

function stopTreeResize() {
    if (treeResizeHandler) {
        window.removeEventListener('resize', treeResizeHandler);
        treeResizeHandler = null;
    }
}

// ---------------------------------------------------------------------------
// "What's a phonetic component?" explainer modal — component -> phonetic ->
// kanji -> combination auto-cycling morph demo. Entry points are ONLY the
// page's own H1 trigger and the dedicated info button on the level-select
// screen; nothing about picking a family or a member chip opens this.
// ---------------------------------------------------------------------------
const MORPH_STAGES = ['component', 'phonetic', 'kanji', 'combination'];
const MORPH_STAGE_MS = 3200;
let morphIndex = 0;
let morphTimer = null;

function setMorphStage(index) {
    morphIndex = ((index % MORPH_STAGES.length) + MORPH_STAGES.length) % MORPH_STAGES.length;
    const activeStage = MORPH_STAGES[morphIndex];
    document.querySelectorAll('.morph-stage').forEach(el => {
        el.classList.toggle('active', el.dataset.stage === activeStage);
    });
    document.querySelectorAll('.morph-dot').forEach((el, i) => {
        el.classList.toggle('active', i === morphIndex);
    });
}

function startMorphCycle() {
    stopMorphCycle();
    setMorphStage(0);
    morphTimer = window.setInterval(() => setMorphStage(morphIndex + 1), MORPH_STAGE_MS);
}

function stopMorphCycle() {
    if (morphTimer) {
        window.clearInterval(morphTimer);
        morphTimer = null;
    }
}

function openInfoModal() {
    showEl(document.getElementById('phonetics-info-modal'));
    startMorphCycle();
}

function closeInfoModal() {
    hideEl(document.getElementById('phonetics-info-modal'));
    stopMorphCycle();
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
// See game.js's identical comment: data-i18n only covers text set once at parse time, so a
// language switch needs the currently-visible dynamic panes re-rendered to pick up the change.
document.addEventListener('sitelangchange', () => {
    renderGateDial();
    if (!currentLevelKey) return;   // still on the gate; nothing else on screen is dynamic
    if (!document.getElementById('family-tree-section').classList.contains('hidden')) {
        showFamilyTree(currentLevelKey, currentFamily);
        return;
    }
    drawTimeline(); drawPicker(); drawBoard(); drawDrillPanel();
});

// Back from the dictionary's lookup view: to the board if a level was ever chosen, to the gate
// if the visitor arrived straight on a ?kanji= link and has never answered that question.
document.getElementById('family-tree-back-btn').addEventListener('click', () => {
    stopTreeResize();
    document.getElementById('family-tree-section').classList.add('hidden');
    if (levelChosen) enterLevel(currentLevelKey, currentCheckpoint); else showGate();
});

// Signing in mid-visit should light the map up without a reload; signing out should clear it.
if (window.onAuthChange) {
    window.onAuthChange(async () => {
        await loadMetKanji();
        await loadSeenFamilies();
        // onAuthChange replays a known session the moment a listener registers, which is before
        // the page's own init below has chosen a level, when there is no board to redraw yet. Init renders it anyway.
        if (!currentLevelKey) return;
        if (!document.getElementById('family-tree-section').classList.contains('hidden')) {
            showFamilyTree(currentLevelKey, currentFamily);
        } else {
            drawPicker(); drawBoard();
        }
    });
}

document.getElementById('phonetics-title-trigger').addEventListener('click', openInfoModal);
document.getElementById('phonetics-info-btn').addEventListener('click', openInfoModal);
document.getElementById('phonetics-info-close').addEventListener('click', closeInfoModal);
document.getElementById('phonetics-info-modal').addEventListener('click', (e) => {
    if (e.target.id === 'phonetics-info-modal') closeInfoModal();
});

// ---------------------------------------------------------------------------
// Deep link from the dictionary's phonetic-family chips: phonetics.html?kanji=<kanji> jumps
// straight to that kanji's family and opens its detail popover, instead of landing on the
// default N5 family list. A family is re-listed under every level one of its members belongs
// to (see phonetics-data.js's own header comment) with an identical member array each time, so
// the first level found (N5 first, per LEVEL_META's order) is as good as any other -- there's
// no "more correct" level to prefer.
// ---------------------------------------------------------------------------
function findFamilyForKanji(kanji) {
    for (const level of LEVEL_META) {
        const family = (PHONETICS_DATA[level.key] || []).find(f => f.members.some(m => m.kanji === kanji));
        if (family) return { levelKey: level.key, family };
    }
    return null;
}

const deepLinkKanji = new URLSearchParams(window.location.search).get('kanji');
const deepLinkTarget = deepLinkKanji ? findFamilyForKanji(deepLinkKanji) : null;

readSeenLocal().forEach(p => seenFamilies.add(p));

renderGateDial();
document.getElementById('phonetics-chip').addEventListener('click', showGate);
document.getElementById('phonetics-reveal').addEventListener('click', () => {
    const f = stageList()[curIndex];
    if (!f) return;
    shown = f.m.map(() => true);
    drawBoard();
});
document.getElementById('phonetics-again').addEventListener('click', () => { shown = []; drawBoard(); });

// phonetics.html?level=N3&cp=2 is how the drill page sends you back to the stage you drilled.
const params = new URLSearchParams(window.location.search);
const askedLevel = params.get('level');
const askedCp = parseInt(params.get('cp'), 10);

if (deepLinkTarget) {
    // Arriving from the dictionary is a lookup, not a question about where you are, so the gate
    // is skipped and the family opens in the reference view.
    document.getElementById('phonetics-gate').hidden = true;
    showFamilyTree(deepLinkTarget.levelKey, deepLinkTarget.family);
} else if (LEVEL_META.some(l => l.key === askedLevel)) {
    enterLevel(askedLevel, Number.isNaN(askedCp) ? 0 : askedCp - 1);
}
// Otherwise the gate stays up. It is the page's resting state: a grid of shapes means nothing
// until a visitor has said which level they are at, and the old default to N5 answered that
// question on their behalf.
