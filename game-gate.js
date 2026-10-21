// Word Match — the gate: five hexagonal JLPT nodes, each bursting into its twelve levels.
//
// Hexagons rather than the discs Phonetics Family's gate uses, because this game is played on
// hexagons: the gate shows the shape of the thing it opens. The twelve levels then land in the
// board's own 3/4/3/2 silhouette, so the level select is literally a picture of the board.
//
// Loaded after game-core.js and game-fx.js, before game.js. Reads progressCache, which game.js
// declares — safe because nothing here runs at load time; the first call comes from game.js's
// own start-up, by which point that binding is initialised.

const JLPT_TIERS = ['N5', 'N4', 'N3', 'N2', 'N1'];

// How many levels a tier holds, derived rather than written down: the tier size changed from 10
// to 12 when the September 2026 expansion landed, and a literal here is exactly the kind of
// thing that silently mislabels every level above the first tier.
function levelsPerTier() {
    return WORD_LEVELS.filter(l => l.jlpt === WORD_LEVELS[0].jlpt).length;
}

function levelsOfTier(jlpt) {
    return WORD_LEVELS.filter(l => l.jlpt === jlpt);
}

function levelNumberInTier(level) {
    return ((level.level - 1) % levelsPerTier()) + 1;
}

function levelTitle(level) {
    return `${level.jlpt} · ${window.tf('game.levelN', { n: levelNumberInTier(level) })}`;
}

function tierDone(jlpt) {
    return levelsOfTier(jlpt).filter(l => {
        const p = progressCache[l.level];
        return p && p.completed;
    }).length;
}

// --------------------------------------------------------------------- tiers
// The five tiers sit on a circle, not in a row: a dial you turn, the way Phonetics Family's
// gate reads, but in hexagons because this game is played on hexagons. N5 is at the top and the
// tiers run clockwise, so the easiest is where the eye lands first.
//
// The dial is square (see .gate-tiers), which is what lets one radius serve both axes -- on a
// rectangle the same percentage is a different distance across than down, and the circle comes
// out an ellipse.
const DIAL_R = 33;        // % of the dial, centre to node centre
const DIAL_NODE = 27;     // node width as % of the dial

function dialSlot(i, n) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const h = DIAL_NODE * 1.1547;
    return {
        left: 50 + DIAL_R * Math.cos(angle) - DIAL_NODE / 2,
        top: 50 + DIAL_R * Math.sin(angle) - h / 2,
        w: DIAL_NODE,
        h,
    };
}

function renderTierDial() {
    const wrap = document.getElementById('gate-tiers');
    wrap.innerHTML = '';
    JLPT_TIERS.forEach((jlpt, i) => {
        const node = document.createElement('button');
        node.type = 'button';
        node.className = 'hexnode';
        node.dataset.tier = jlpt;
        // The JLPT spectrum is declared once, in style.css, and used wherever a level badge or
        // dropdown link appears. Reusing it here means a tier is the same colour on this page
        // as it is in the nav and on the dashboard.
        node.style.setProperty('--node-fill', `var(--jlpt-${jlpt.toLowerCase()})`);
        const s = dialSlot(i, JLPT_TIERS.length);
        node.style.left = s.left.toFixed(3) + '%';
        node.style.top = s.top.toFixed(3) + '%';
        node.style.width = s.w.toFixed(3) + '%';
        node.style.height = s.h.toFixed(3) + '%';
        node.style.animationDelay = (i * 0.07).toFixed(2) + 's';
        const done = tierDone(jlpt);
        node.innerHTML = `
            <span class="hexnode-tier">${escapeHtml(jlpt)}</span>
            <span class="hexnode-sub">${escapeHtml(window.t('game.tier.' + jlpt))}</span>
            <span class="hexnode-count">${done} / ${levelsPerTier()}</span>
        `;
        node.setAttribute('aria-label',
            `${jlpt} — ${window.t('game.tier.' + jlpt)}, ${done}/${levelsPerTier()}`);
        node.addEventListener('click', () => chooseTier(jlpt, node));
        wrap.appendChild(node);
    });
}

// The chosen node travels to the middle of the dial, swells, and bursts into the tier's levels.
// The distance is measured at click time rather than written into the CSS, because where a node
// has to travel depends on where it happened to wrap to at this viewport width.
let gateBusy = false;
function chooseTier(jlpt, node) {
    if (gateBusy) return;
    gateBusy = true;
    activeTier = jlpt;

    const dial = document.getElementById('gate-tiers');
    const dialBox = dial.getBoundingClientRect();
    const cx = dialBox.left + dialBox.width / 2;
    const cy = dialBox.top + dialBox.height / 2;
    const nodeBox = node.getBoundingClientRect();
    node.style.setProperty('--fly-x', (cx - (nodeBox.left + nodeBox.width / 2)) + 'px');
    node.style.setProperty('--fly-y', (cy - (nodeBox.top + nodeBox.height / 2)) + 'px');
    node.classList.add('is-flying');

    // The others fall away ALONG THEIR OWN SPOKE rather than just fading: on a dial, out is the
    // direction that reads as "not this one", and a straight fade makes five nodes vanish like a
    // light switch.
    Array.prototype.forEach.call(dial.children, el => {
        if (el === node) return;
        const b = el.getBoundingClientRect();
        const dx = b.left + b.width / 2 - cx;
        const dy = b.top + b.height / 2 - cy;
        const len = Math.hypot(dx, dy) || 1;
        el.style.setProperty('--out-x', (dx / len * 90).toFixed(1) + 'px');
        el.style.setProperty('--out-y', (dy / len * 90).toFixed(1) + 'px');
        el.classList.add('is-fading');
    });
    GameAudio.select();

    // Long enough for the travel and the swell to finish, since the burst is the pay-off and
    // cutting it short is what made the first version feel like a jump cut.
    window.setTimeout(() => {
        dial.hidden = true;
        showLevelField(jlpt);
        gateBusy = false;
    }, 980);
}

// --------------------------------------------------------------------- levels
// One honeycomb, laid out from a list of row lengths. Centring each row is what makes the shape
// mirror down the middle, which is the whole reason for 3/4/3/2.
function honeycomb(rows, cols) {
    const w = 100 / (cols + 0.5);
    const h = w * 1.1547;
    const vStep = h * 0.76;
    const slots = [];
    rows.forEach((count, r) => {
        const x0 = (100 - count * w) / 2;
        for (let c = 0; c < count; c++) slots.push({ x: x0 + c * w, y: r * vStep, w, h });
    });
    return { slots, totalH: (rows.length - 1) * vStep + h };
}

function showLevelField(jlpt) {
    const panel = document.getElementById('gate-levels');
    const field = document.getElementById('gate-field');
    document.getElementById('gate-tier-name').textContent =
        `${jlpt} · ${window.t('game.tier.' + jlpt)}`;

    const levels = levelsOfTier(jlpt);
    const { slots, totalH } = honeycomb(MAIN_ROWS, MAIN_COLS);
    field.style.aspectRatio = `100 / ${totalH.toFixed(2)}`;
    field.innerHTML = '';

    // Each level flies out from the middle of the honeycomb, so the twelve read as one node
    // bursting rather than twelve appearing. The offset is per node, in its own units, so the
    // burst stays true at any width.
    const cxPct = 50, cyPct = 50;

    levels.forEach((level, i) => {
        const s = slots[i];
        if (!s) return;                       // a tier longer than the honeycomb: ignore the rest
        const progress = progressCache[level.level];
        const done = !!(progress && progress.completed);

        const node = document.createElement('button');
        node.type = 'button';
        node.className = 'hexnode' + (done ? ' level-done' : '');
        node.style.left = s.x.toFixed(3) + '%';
        node.style.top = (s.y / totalH * 100).toFixed(3) + '%';
        node.style.width = s.w.toFixed(3) + '%';
        node.style.height = (s.h / totalH * 100).toFixed(3) + '%';
        node.style.animationDelay = (0.04 + i * 0.045).toFixed(3) + 's';
        if (!done) node.style.setProperty('--node-fill', `var(--jlpt-${jlpt.toLowerCase()})`);

        const theme = level.themeKey ? window.t(level.themeKey) : '';
        node.innerHTML = `
            ${done ? '<span class="hexnode-check" aria-hidden="true">&#10003;</span>' : ''}
            <span class="hexnode-num">${String(levelNumberInTier(level)).padStart(2, '0')}</span>
            ${theme ? `<span class="hexnode-theme">${escapeHtml(theme)}</span>` : ''}
            ${done ? `<span class="hexnode-best">${escapeHtml(String(progress.best_moves))} ${escapeHtml(window.t('game.clicksShort'))}</span>` : ''}
        `;
        node.style.setProperty('--burst-x', ((cxPct - (s.x + s.w / 2)) * 1.6).toFixed(2) + '%');
        node.style.setProperty('--burst-y',
            ((cyPct - (s.y + s.h / 2) / totalH * 100) * 1.6).toFixed(2) + '%');
        node.setAttribute('aria-label', levelTitle(level) + (theme ? ' — ' + theme : ''));
        node.addEventListener('click', () => startLevel(level));
        field.appendChild(node);
    });

    panel.hidden = false;
}

function backToTiers() {
    document.getElementById('gate-levels').hidden = true;
    const dial = document.getElementById('gate-tiers');
    dial.hidden = false;
    renderTierDial();
}

// Re-render whatever the gate is currently showing: used on an auth change (progress arrives
// and the checks and best-click counts appear) and on a language switch.
function renderGate() {
    const field = document.getElementById('gate-levels');
    if (!field.hidden && activeTier) showLevelField(activeTier);
    else renderTierDial();

    const guestHint = document.getElementById('game-guest-hint');
    if (window.getCurrentSession()) hideEl(guestHint); else showEl(guestHint);
}
