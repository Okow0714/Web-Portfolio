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
        card.dataset.level = level.key;
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
    // Rank gradation: fades linearly from full intensity at #1 down to a
    // 0.12 floor by RANK_FADE_STEPS, then stays flat — a list of 300+
    // families shouldn't stretch the gradient to invisible by the bottom.
    const RANK_FADE_STEPS = 18;
    families.forEach((family, i) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'family-item';
        const intensity = Math.max(1 - i / RANK_FADE_STEPS, 0.12);
        item.style.setProperty('--rank-intensity', intensity.toFixed(2));
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
            <div class="tree-popover" id="tree-popover"></div>
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
document.getElementById('family-list-back-btn').addEventListener('click', backToLevelSelect);
document.getElementById('family-tree-back-btn').addEventListener('click', backToFamilyList);

document.getElementById('phonetics-title-trigger').addEventListener('click', openInfoModal);
document.getElementById('phonetics-info-btn').addEventListener('click', openInfoModal);
document.getElementById('phonetics-info-close').addEventListener('click', closeInfoModal);
document.getElementById('phonetics-info-modal').addEventListener('click', (e) => {
    if (e.target.id === 'phonetics-info-modal') closeInfoModal();
});

renderLevelSelect();

// Show the "what's a phonetic component?" explainer automatically on entering
// this page, in addition to it staying reachable later via the H1/info-button
// triggers above — it's a one-time-per-load primer, not tied to browsing.
openInfoModal();
