// Kanji Phonetics — browse kanji grouped by shared phonetic component ("sound family"),
// split by JLPT level and ranked by real usage frequency within each level. Pure browsing/
// reference tool: no auth-gated save-progress requirement, so this only uses auth-shared.js
// for the shared header login bar.
//
// Depends on phonetics-data.js (PHONETICS_DATA — already ranked, do not re-sort) having run
// first. Flow mirrors reading.js's track->level->text drill-down structurally: level select ->
// ranked family list -> a family's branching tree view.

const LEVEL_META = [
    { key: 'N5', title: 'N5 · Beginner' },
    { key: 'N4', title: 'N4 · Elementary' },
    { key: 'N3', title: 'N3 · Intermediate' },
    { key: 'N2', title: 'N2 · Upper Intermediate' },
    { key: 'N1', title: 'N1 · Advanced' },
];

let currentLevelKey = null;
let currentFamily = null;
let treeResizeHandler = null;

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ---------------------------------------------------------------------------
// Level select -> family list -> family tree
// ---------------------------------------------------------------------------
function renderLevelSelect() {
    const container = document.getElementById('phonetics-level-grid');
    container.innerHTML = '';
    LEVEL_META.forEach(level => {
        const families = PHONETICS_DATA[level.key] || [];
        const memberKanjiCount = new Set(families.flatMap(f => f.members.map(m => m.kanji))).size;
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'level-card';
        card.innerHTML = `
            <span class="level-badge">${escapeHtml(level.key)}</span>
            <h3>${escapeHtml(level.title)}</h3>
            <div class="level-meta">${families.length} phonetic families &middot; ${memberKanjiCount} related kanji</div>
        `;
        card.addEventListener('click', () => showFamilyList(level.key));
        container.appendChild(card);
    });
}

function showFamilyList(levelKey) {
    currentLevelKey = levelKey;
    const level = LEVEL_META.find(l => l.key === levelKey);
    const families = PHONETICS_DATA[levelKey] || [];

    document.getElementById('family-list-title').textContent = `${level.title} — Phonetic Families`;
    document.getElementById('family-list-subtitle').textContent = families.length
        ? `${families.length} families, ranked by how often their most-used ${levelKey} member appears in real Japanese text.`
        : "No phonetic-bearing kanji are tagged at this level in the source data.";

    const list = document.getElementById('family-list');
    list.innerHTML = '';
    families.forEach((family, i) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'family-item';
        item.innerHTML = `
            <span class="family-rank">#${i + 1}</span>
            <span class="family-phonetic">${escapeHtml(family.phonetic)}</span>
            <span class="family-info">
                <span class="family-reading">${family.reading ? escapeHtml(family.reading) : '&mdash;'}</span>
                <span class="family-count">${family.members.length} kanji in this family</span>
            </span>
        `;
        item.addEventListener('click', () => showFamilyTree(levelKey, family));
        list.appendChild(item);
    });

    hideEl(document.getElementById('level-select-section'));
    hideEl(document.getElementById('family-tree-section'));
    showEl(document.getElementById('family-list-section'));
}

function backToLevelSelect() {
    stopTreeResize();
    hideEl(document.getElementById('family-list-section'));
    hideEl(document.getElementById('family-tree-section'));
    showEl(document.getElementById('level-select-section'));
}

function backToFamilyList() {
    stopTreeResize();
    hideEl(document.getElementById('family-tree-section'));
    showEl(document.getElementById('family-list-section'));
}

// ---------------------------------------------------------------------------
// Family tree
// ---------------------------------------------------------------------------
function memberCardHtml(member, isRootLevel) {
    const meanings = member.meanings && member.meanings.length ? member.meanings.join(', ') : '';
    const exampleHtml = member.example
        ? `<div class="tree-example">
               <p class="tree-example-jp">${escapeHtml(member.example.jp)}</p>
               <p class="tree-example-en">${escapeHtml(member.example.en)}</p>
           </div>`
        : `<p class="tree-example-none">No example sentence found for this kanji in the source data.</p>`;

    return `
        <div class="tree-card${isRootLevel ? ' tree-card-current-level' : ''}" data-kanji="${escapeHtml(member.kanji)}">
            <div class="tree-card-head">
                <span class="tree-card-kanji">${escapeHtml(member.kanji)}</span>
                <span class="tree-card-level">${member.level ? escapeHtml(member.level) : '?'}</span>
            </div>
            <div class="tree-card-readings">
                ${member.onyomi ? `<span class="tree-reading-on">${escapeHtml(member.onyomi)}</span>` : ''}
                ${member.kunyomi ? `<span class="tree-reading-kun">${escapeHtml(member.kunyomi)}</span>` : ''}
            </div>
            <p class="tree-card-meaning">${escapeHtml(meanings)}</p>
            ${exampleHtml}
        </div>
    `;
}

function showFamilyTree(levelKey, family) {
    currentLevelKey = levelKey;
    currentFamily = family;
    const level = LEVEL_META.find(l => l.key === levelKey);

    const wrap = document.getElementById('tree-wrap');
    wrap.innerHTML = `
        <div class="tree-header">
            <h2 class="phonetics-title tree-title">${escapeHtml(family.phonetic)} <span class="tree-title-reading">${family.reading ? escapeHtml(family.reading) : ''}</span></h2>
            <p class="phonetics-subtitle">Phonetic family for ${escapeHtml(level.title)} &middot; ${family.members.length} kanji share this component dictionary-wide.</p>
        </div>
        <div class="tree-canvas" id="tree-canvas">
            <svg id="tree-lines" class="tree-lines"></svg>
            <div class="tree-root-row">
                <div class="tree-card tree-root" data-kanji="${escapeHtml(family.phonetic)}">
                    <div class="tree-card-head">
                        <span class="tree-card-kanji">${escapeHtml(family.phonetic)}</span>
                    </div>
                    <div class="tree-card-readings">
                        <span class="tree-reading-on">${family.reading ? escapeHtml(family.reading) : 'shared component'}</span>
                    </div>
                    <p class="tree-card-meaning">Shared phonetic component</p>
                </div>
            </div>
            <div class="tree-members-row" id="tree-members-row">
                ${family.members.map(m => memberCardHtml(m, m.level === levelKey)).join('')}
            </div>
        </div>
    `;

    hideEl(document.getElementById('level-select-section'));
    hideEl(document.getElementById('family-list-section'));
    showEl(document.getElementById('family-tree-section'));

    // Layout must exist before measuring positions for the connecting lines.
    requestAnimationFrame(drawTreeLines);
    startTreeResize();
}

// ---------------------------------------------------------------------------
// Tree connector lines — same getBoundingClientRect-based approach as game.js's
// board-lines SVG connector, adapted to draw a fixed set of root->member elbow
// lines instead of one path that changes on every click.
// ---------------------------------------------------------------------------
function drawTreeLines() {
    const canvas = document.getElementById('tree-canvas');
    const svg = document.getElementById('tree-lines');
    if (!canvas || !svg) return;

    const rootEl = canvas.querySelector('.tree-root');
    const memberEls = canvas.querySelectorAll('.tree-members-row .tree-card');
    if (!rootEl || !memberEls.length) return;

    const canvasRect = canvas.getBoundingClientRect();
    svg.setAttribute('width', canvasRect.width);
    svg.setAttribute('height', canvasRect.height);
    svg.innerHTML = '';

    const rootRect = rootEl.getBoundingClientRect();
    const rootX = rootRect.left + rootRect.width / 2 - canvasRect.left;
    const rootY = rootRect.bottom - canvasRect.top;

    memberEls.forEach(memberEl => {
        const memberRect = memberEl.getBoundingClientRect();
        const memberX = memberRect.left + memberRect.width / 2 - canvasRect.left;
        const memberY = memberRect.top - canvasRect.top;
        const midY = rootY + (memberY - rootY) / 2;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${rootX},${rootY} L ${rootX},${midY} L ${memberX},${midY} L ${memberX},${memberY}`);
        path.setAttribute('class', 'tree-line');
        svg.appendChild(path);
    });
}

function startTreeResize() {
    stopTreeResize();
    treeResizeHandler = () => drawTreeLines();
    window.addEventListener('resize', treeResizeHandler);
}

function stopTreeResize() {
    if (treeResizeHandler) {
        window.removeEventListener('resize', treeResizeHandler);
        treeResizeHandler = null;
    }
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
document.getElementById('family-list-back-btn').addEventListener('click', backToLevelSelect);
document.getElementById('family-tree-back-btn').addEventListener('click', backToFamilyList);

renderLevelSelect();
