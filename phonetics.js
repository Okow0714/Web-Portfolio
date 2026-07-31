// Kanji Phonetics ("Phonetics Family") — browse kanji grouped by shared phonetic component
// ("sound family"), split by JLPT level and ranked by real usage frequency within each level.
// Pure browsing/reference tool: no auth-gated save-progress requirement, so this only uses
// auth-shared.js for the shared header login bar.
//
// Depends on phonetics-data.js (PHONETICS_DATA — already ranked, do not re-sort) having run
// first. Flow mirrors reading.js's track->level->text drill-down structurally: level select ->
// ranked family list -> a family's radial tree view.

const LEVEL_META = [
    { key: 'N5', title: 'N5 · Beginner' },
    { key: 'N4', title: 'N4 · Elementary' },
    { key: 'N3', title: 'N3 · Intermediate' },
    { key: 'N2', title: 'N2 · Upper Intermediate' },
    { key: 'N1', title: 'N1 · Advanced' },
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

    switchScreen(['level-select-section', 'family-tree-section'], 'family-list-section');
}

function backToLevelSelect() {
    stopTreeResize();
    switchScreen(['family-list-section', 'family-tree-section'], 'level-select-section');
}

function backToFamilyList() {
    stopTreeResize();
    switchScreen(['family-tree-section'], 'family-list-section');
}

// ---------------------------------------------------------------------------
// Family tree — a radial diagram: the root phonetic sits in the center, member
// kanji are compact circular chips arranged around it (one ring, or two
// concentric rings for larger families), joined to the center by straight SVG
// spoke lines. Clicking a chip opens a detail panel below the diagram instead
// of every member always being fully expanded.
// ---------------------------------------------------------------------------
function chipHtml(member, index, isRootLevel) {
    return `
        <button type="button" class="tree-chip${isRootLevel ? ' tree-chip-current-level' : ''}"
                data-index="${index}" data-kanji="${escapeHtml(member.kanji)}"
                aria-label="${escapeHtml(member.kanji)} (${escapeHtml(member.level || '')})">
            ${escapeHtml(member.kanji)}
            <span class="tree-chip-dot" data-level="${escapeHtml(member.level || '')}"></span>
        </button>
    `;
}

function detailHtml(member) {
    const meanings = member.meanings && member.meanings.length ? member.meanings.join(', ') : '';
    const exampleHtml = member.example
        ? `<div class="tree-example">
               <p class="tree-example-jp">${escapeHtml(member.example.jp)}</p>
               <p class="tree-example-en">${escapeHtml(member.example.en)}</p>
           </div>`
        : `<p class="tree-example-none">No example sentence found for this kanji in the source data.</p>`;

    return `
        <div class="tree-detail-head">
            <span class="tree-detail-kanji">${escapeHtml(member.kanji)}</span>
            <span class="tree-detail-level">${member.level ? escapeHtml(member.level) : '?'}</span>
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
    activeChipEl = null;
    const level = LEVEL_META.find(l => l.key === levelKey);

    const wrap = document.getElementById('tree-wrap');
    wrap.innerHTML = `
        <div class="tree-header">
            <h2 class="phonetics-title tree-title">${escapeHtml(family.phonetic)} <span class="tree-title-reading">${family.reading ? escapeHtml(family.reading) : ''}</span></h2>
            <p class="phonetics-subtitle">Phonetic family for ${escapeHtml(level.title)} &middot; ${family.members.length} kanji share this component dictionary-wide. Tap a kanji to see its details.</p>
        </div>
        <div class="tree-canvas" id="tree-canvas">
            <svg id="tree-lines" class="tree-lines"></svg>
            <div class="tree-root-node" id="tree-root-node">
                <span class="tree-root-kanji">${escapeHtml(family.phonetic)}</span>
                <span class="tree-root-reading">${family.reading ? escapeHtml(family.reading) : 'shared'}</span>
            </div>
            ${family.members.map((m, i) => chipHtml(m, i, m.level === levelKey)).join('')}
        </div>
        <div class="tree-detail-wrap" id="tree-detail-wrap">
            <div class="tree-detail-inner">
                <div class="tree-detail" id="tree-detail"></div>
            </div>
        </div>
    `;

    switchScreen(['level-select-section', 'family-list-section'], 'family-tree-section');

    wrap.querySelectorAll('.tree-chip').forEach(chip => {
        chip.addEventListener('click', () => onChipClick(chip, family));
    });

    // Layout must exist (and be laid out at final size) before measuring positions.
    requestAnimationFrame(() => {
        layoutRadialTree();
        drawTreeLines();
    });
    startTreeResize();
}

function onChipClick(chip, family) {
    const wrapEl = document.getElementById('tree-detail-wrap');
    const detailEl = document.getElementById('tree-detail');

    if (activeChipEl === chip) {
        // Same chip clicked again: collapse.
        chip.classList.remove('active');
        activeChipEl = null;
        wrapEl.classList.remove('open');
        return;
    }

    if (activeChipEl) activeChipEl.classList.remove('active');
    chip.classList.add('active');
    activeChipEl = chip;

    const index = Number(chip.dataset.index);
    const member = family.members[index];

    // Re-trigger the fade-in animation even when switching directly between two
    // already-open chips: strip the animation class, force a reflow, then add it
    // back with the new content so treeDetailIn plays again.
    detailEl.classList.remove('tree-detail-fade');
    void detailEl.offsetWidth;
    detailEl.innerHTML = detailHtml(member);
    detailEl.classList.add('tree-detail-fade');
    wrapEl.classList.add('open');
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

    rings.forEach(ring => {
        const count = ring.items.length;
        ring.items.forEach((chip, i) => {
            const angle = (-90 + (360 / count) * i) * (Math.PI / 180);
            const tx = Math.cos(angle) * ring.radius;
            const ty = Math.sin(angle) * ring.radius;
            chip.style.setProperty('--tx', `${tx}px`);
            chip.style.setProperty('--ty', `${ty}px`);
        });
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
document.getElementById('family-list-back-btn').addEventListener('click', backToLevelSelect);
document.getElementById('family-tree-back-btn').addEventListener('click', backToFamilyList);

document.getElementById('phonetics-title-trigger').addEventListener('click', openInfoModal);
document.getElementById('phonetics-info-btn').addEventListener('click', openInfoModal);
document.getElementById('phonetics-info-close').addEventListener('click', closeInfoModal);
document.getElementById('phonetics-info-modal').addEventListener('click', (e) => {
    if (e.target.id === 'phonetics-info-modal') closeInfoModal();
});

renderLevelSelect();
