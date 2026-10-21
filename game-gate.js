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
function renderTierDial() {
    const wrap = document.getElementById('gate-tiers');
    wrap.innerHTML = '';
    JLPT_TIERS.forEach(jlpt => {
        const node = document.createElement('button');
        node.type = 'button';
        node.className = 'hexnode';
        node.dataset.tier = jlpt;
        // The JLPT spectrum is declared once, in style.css, and used wherever a level badge or
        // dropdown link appears. Reusing it here means a tier is the same colour on this page
        // as it is in the nav and on the dashboard.
        node.style.setProperty('--node-fill', `var(--jlpt-${jlpt.toLowerCase()})`);
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
    const nodeBox = node.getBoundingClientRect();
    node.style.setProperty('--fly-x',
        (dialBox.left + dialBox.width / 2 - (nodeBox.left + nodeBox.width / 2)) + 'px');
    node.style.setProperty('--fly-y',
        (dialBox.top + dialBox.height / 2 - (nodeBox.top + nodeBox.height / 2)) + 'px');
    node.classList.add('is-flying');
    Array.prototype.forEach.call(dial.children, el => {
        if (el !== node) el.classList.add('is-fading');
    });
    GameAudio.select();

    window.setTimeout(() => {
        dial.hidden = true;
        showLevelField(jlpt);
        gateBusy = false;
    }, 620);
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
        node.style.animationDelay = (i * 0.035).toFixed(3) + 's';
        if (!done) node.style.setProperty('--node-fill', `var(--jlpt-${jlpt.toLowerCase()})`);

        const theme = level.themeKey ? window.t(level.themeKey) : '';
        node.innerHTML = `
            ${done ? '<span class="hexnode-check" aria-hidden="true">&#10003;</span>' : ''}
            <span class="hexnode-num">${String(levelNumberInTier(level)).padStart(2, '0')}</span>
            ${theme ? `<span class="hexnode-theme">${escapeHtml(theme)}</span>` : ''}
            ${done ? `<span class="hexnode-best">${escapeHtml(String(progress.best_moves))} ${escapeHtml(window.t('game.clicksShort'))}</span>` : ''}
        `;
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
