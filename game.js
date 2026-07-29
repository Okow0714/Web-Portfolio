// Japanese Word Match — a Connect-2 style tile game. Two tiles can be cleared when they
// share a pairId (one Japanese word tile + its English translation tile) AND a straight
// path with at most 2 turns connects them through empty cells (classic "Lianliankan" rule).
//
// Depends on auth-shared.js (window.supabaseClient, window.getCurrentSession(), the
// 'wp:authchange' event, and the global showEl/hideEl helpers it defines) and
// game-words.js (WORD_LEVELS) having already run.

// Aliased as `sb`, not `supabaseClient` — see the note in supabase-app.js about why
// reusing that identifier across <script> tags would throw a SyntaxError.
const sb = window.supabaseClient;

// The 40 tiles live on an 8x10 inner grid (80 cells, 50% filled) with the 40 empty
// gaps scattered randomly throughout — not just packed edge-to-edge — plus a 1-cell
// empty border for routing around the outside. Packing 40 tiles into an exactly-40-cell
// grid leaves almost no room for a <=2-turn connect path, so most pairs would be
// unsolvable at any given moment; scattering real gaps through the interior (as real
// Mahjong/Lianliankan boards do) keeps the board reliably clearable in one pass.
const INNER_ROWS = 8;
const INNER_COLS = 10;
const PAD = 1;
const GRID_COLS = INNER_COLS + PAD * 2;
const GRID_ROWS = INNER_ROWS + PAD * 2;

let grid = [];      // GRID_ROWS x GRID_COLS, each cell null or a tile object
let cellEls = [];   // GRID_ROWS x GRID_COLS, each cell's wrapper <div>
let selected = null;
let currentLevel = null;
let matchedCount = 0;
let totalPairs = 0;
let moves = 0;
let timerInterval = null;
let startTime = null;
let elapsedSeconds = 0;
let lastResult = null;    // result earned as a guest, pending save once they log in
let progressCache = {};   // level number -> game_progress row

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// ---------------------------------------------------------------------------
// Board construction
// ---------------------------------------------------------------------------
function buildBoard(level) {
    const tiles = [];
    level.pairs.forEach((p, i) => {
        tiles.push({ pairId: i, kind: 'jp', text: p.jp, sub: p.reading });
        tiles.push({ pairId: i, kind: 'en', text: p.en, sub: '' });
    });

    // 40 tiles + (INNER_ROWS*INNER_COLS - 40) empty gaps, shuffled together so the
    // gaps land scattered throughout the inner grid rather than at one end.
    const slots = tiles.map(t => t);
    while (slots.length < INNER_ROWS * INNER_COLS) slots.push(null);
    shuffleArray(slots);

    grid = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null));
    let idx = 0;
    for (let r = 0; r < INNER_ROWS; r++) {
        for (let c = 0; c < INNER_COLS; c++) {
            const tile = slots[idx++];
            if (!tile) continue;
            tile.row = r + PAD;
            tile.col = c + PAD;
            grid[tile.row][tile.col] = tile;
        }
    }
}

function renderBoard() {
    const boardGrid = document.getElementById('board-grid');
    boardGrid.innerHTML = '';
    boardGrid.style.gridTemplateColumns = `repeat(${GRID_COLS}, 1fr)`;
    boardGrid.style.gridTemplateRows = `repeat(${GRID_ROWS}, 1fr)`;

    cellEls = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null));

    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'grid-cell';

            const tile = grid[r][c];
            if (tile) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `tile tile-${tile.kind}`;
                if (tile.kind === 'jp') {
                    btn.innerHTML = `<span class="tile-jp">${escapeHtml(tile.text)}</span>` +
                        `<span class="tile-reading">${escapeHtml(tile.sub)}</span>`;
                } else {
                    btn.innerHTML = `<span class="tile-en-text">${escapeHtml(tile.text)}</span>`;
                }
                btn.addEventListener('click', () => onTileClick(tile));
                tile.el = btn;
                cellDiv.appendChild(btn);
            }

            boardGrid.appendChild(cellDiv);
            cellEls[r][c] = cellDiv;
        }
    }

    clearPathLine();
}

// ---------------------------------------------------------------------------
// Connect-2 pathfinding: straight line with at most 2 turns, through empty cells only.
// ---------------------------------------------------------------------------
function isClearHorizontal(row, c1, c2) {
    const lo = Math.min(c1, c2), hi = Math.max(c1, c2);
    for (let c = lo + 1; c < hi; c++) {
        if (grid[row][c] !== null) return false;
    }
    return true;
}

function isClearVertical(col, r1, r2) {
    const lo = Math.min(r1, r2), hi = Math.max(r1, r2);
    for (let r = lo + 1; r < hi; r++) {
        if (grid[r][col] !== null) return false;
    }
    return true;
}

function findPath(a, b) {
    // 0 turns
    if (a.row === b.row && isClearHorizontal(a.row, a.col, b.col)) {
        return [{ row: a.row, col: a.col }, { row: b.row, col: b.col }];
    }
    if (a.col === b.col && isClearVertical(a.col, a.row, b.row)) {
        return [{ row: a.row, col: a.col }, { row: b.row, col: b.col }];
    }

    // 1 turn: corner at (a.row, b.col) or (b.row, a.col)
    const corner1 = { row: a.row, col: b.col };
    if (grid[corner1.row][corner1.col] === null &&
        isClearHorizontal(a.row, a.col, corner1.col) &&
        isClearVertical(corner1.col, corner1.row, b.row)) {
        return [{ row: a.row, col: a.col }, corner1, { row: b.row, col: b.col }];
    }
    const corner2 = { row: b.row, col: a.col };
    if (grid[corner2.row][corner2.col] === null &&
        isClearVertical(corner2.col, a.row, corner2.row) &&
        isClearHorizontal(b.row, corner2.col, b.col)) {
        return [{ row: a.row, col: a.col }, corner2, { row: b.row, col: b.col }];
    }

    // 2 turns: try every empty cell in a's row, then every empty cell in a's column
    for (let c = 0; c < GRID_COLS; c++) {
        if (c === a.col || grid[a.row][c] !== null) continue;
        if (!isClearHorizontal(a.row, a.col, c)) continue;
        const mid = { row: a.row, col: c };
        const corner = { row: b.row, col: c };
        if (grid[corner.row][corner.col] === null &&
            isClearVertical(corner.col, mid.row, corner.row) &&
            isClearHorizontal(b.row, corner.col, b.col)) {
            return [{ row: a.row, col: a.col }, mid, corner, { row: b.row, col: b.col }];
        }
    }
    for (let r = 0; r < GRID_ROWS; r++) {
        if (r === a.row || grid[r][a.col] !== null) continue;
        if (!isClearVertical(a.col, a.row, r)) continue;
        const mid = { row: r, col: a.col };
        const corner = { row: r, col: b.col };
        if (grid[corner.row][corner.col] === null &&
            isClearHorizontal(corner.row, mid.col, corner.col) &&
            isClearVertical(corner.col, corner.row, b.row)) {
            return [{ row: a.row, col: a.col }, mid, corner, { row: b.row, col: b.col }];
        }
    }

    return null;
}

// ---------------------------------------------------------------------------
// Connector line drawing
// ---------------------------------------------------------------------------
function drawPathLine(path) {
    const svg = document.getElementById('board-lines');
    const svgRect = svg.getBoundingClientRect();
    const points = path.map(p => {
        const rect = cellEls[p.row][p.col].getBoundingClientRect();
        const x = rect.left + rect.width / 2 - svgRect.left;
        const y = rect.top + rect.height / 2 - svgRect.top;
        return `${x},${y}`;
    }).join(' L ');

    clearPathLine();
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('id', 'active-connect-line');
    pathEl.setAttribute('d', `M ${points}`);
    svg.appendChild(pathEl);
}

function clearPathLine() {
    const el = document.getElementById('active-connect-line');
    if (el) el.remove();
}

// ---------------------------------------------------------------------------
// Gameplay
// ---------------------------------------------------------------------------
function onTileClick(tile) {
    if (!grid[tile.row][tile.col]) return; // already matched/removed

    if (!startTime) startTimer();

    if (selected === tile) {
        selected.el.classList.remove('selected');
        selected = null;
        return;
    }

    if (!selected) {
        selected = tile;
        tile.el.classList.add('selected');
        return;
    }

    const prev = selected;
    selected = null;
    prev.el.classList.remove('selected');
    moves++;
    updateStats();

    if (prev.pairId === tile.pairId) {
        const path = findPath(prev, tile);
        if (path) {
            drawPathLine(path);
            setTimeout(() => {
                removeTile(prev);
                removeTile(tile);
                clearPathLine();
                matchedCount++;
                updateStats();
                if (matchedCount === totalPairs) finishLevel();
            }, 260);
            return;
        }
    }

    prev.el.classList.add('shake');
    tile.el.classList.add('shake');
    setTimeout(() => {
        prev.el.classList.remove('shake');
        tile.el.classList.remove('shake');
    }, 350);
}

function removeTile(tile) {
    grid[tile.row][tile.col] = null;
    tile.el.classList.add('matched');
    setTimeout(() => {
        if (tile.el && tile.el.parentNode) tile.el.remove();
    }, 260);
}

function shuffleRemaining() {
    const remaining = [];
    for (let r = PAD; r < PAD + INNER_ROWS; r++) {
        for (let c = PAD; c < PAD + INNER_COLS; c++) {
            if (grid[r][c]) remaining.push(grid[r][c]);
        }
    }
    if (remaining.length === 0) return;

    const positions = [];
    for (let r = PAD; r < PAD + INNER_ROWS; r++) {
        for (let c = PAD; c < PAD + INNER_COLS; c++) {
            positions.push({ row: r, col: c });
        }
    }
    shuffleArray(positions);

    for (let r = PAD; r < PAD + INNER_ROWS; r++) {
        for (let c = PAD; c < PAD + INNER_COLS; c++) {
            grid[r][c] = null;
        }
    }
    remaining.forEach((tile, i) => {
        const pos = positions[i];
        tile.row = pos.row;
        tile.col = pos.col;
        grid[pos.row][pos.col] = tile;
    });

    selected = null;
    renderBoard();
}

// ---------------------------------------------------------------------------
// Timer & stats
// ---------------------------------------------------------------------------
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('board-timer').textContent = formatTime(elapsedSeconds);
    }, 250);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function updateStats() {
    document.getElementById('board-pairs').textContent = `${matchedCount} / ${totalPairs} pairs`;
    document.getElementById('board-moves').textContent = `${moves} moves`;
}

// ---------------------------------------------------------------------------
// Level select <-> board screens
// ---------------------------------------------------------------------------
function startLevel(level) {
    currentLevel = level;
    matchedCount = 0;
    moves = 0;
    elapsedSeconds = 0;
    startTime = null;
    selected = null;
    totalPairs = level.pairs.length;
    stopTimer();

    buildBoard(level);
    renderBoard();

    document.getElementById('board-timer').textContent = '00:00';
    document.getElementById('board-level-label').textContent = level.title;
    updateStats();

    hideEl(document.getElementById('level-select-section'));
    showEl(document.getElementById('board-section'));
}

function backToLevels() {
    stopTimer();
    hideEl(document.getElementById('board-section'));
    showEl(document.getElementById('level-select-section'));
    renderLevelSelect();
}

function renderLevelSelect() {
    const container = document.getElementById('level-grid');
    container.innerHTML = '';

    WORD_LEVELS.forEach(level => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'level-card';

        const progress = progressCache[level.level];
        let metaHtml = '<span>Not played yet</span>';
        if (progress && progress.completed) {
            metaHtml = `<span class="completed">&#10003; Completed</span>` +
                `<span>Best: ${formatTime(progress.best_time_seconds)} &middot; ${progress.best_moves} moves</span>`;
        }

        card.innerHTML = `
            <span class="level-badge">${escapeHtml(level.jlpt)}</span>
            <h3>${escapeHtml(level.title)}</h3>
            <div class="level-meta">${metaHtml}</div>
        `;
        card.addEventListener('click', () => startLevel(level));
        container.appendChild(card);
    });

    const guestHint = document.getElementById('game-guest-hint');
    if (window.getCurrentSession()) hideEl(guestHint); else showEl(guestHint);
}

// ---------------------------------------------------------------------------
// Progress: load on auth change, save on level completion
// ---------------------------------------------------------------------------
async function loadProgress() {
    const session = window.getCurrentSession();
    progressCache = {};
    if (session) {
        const { data, error } = await sb.from('game_progress').select('*').eq('user_id', session.user.id);
        if (!error && data) {
            data.forEach(row => { progressCache[row.level] = row; });
        }
    }
    renderLevelSelect();
}

async function saveProgress(session, result) {
    const statusEl = document.getElementById('result-save-status');
    const existing = progressCache[result.level];
    const isBetter = !existing || !existing.completed ||
        result.timeSeconds < existing.best_time_seconds ||
        (result.timeSeconds === existing.best_time_seconds && result.moves < existing.best_moves);

    const row = {
        user_id: session.user.id,
        level: result.level,
        completed: true,
        best_time_seconds: isBetter ? result.timeSeconds : existing.best_time_seconds,
        best_moves: isBetter ? result.moves : existing.best_moves,
        updated_at: new Date().toISOString(),
    };

    const { error } = await sb.from('game_progress').upsert(row, { onConflict: 'user_id,level' });
    if (!error) {
        progressCache[result.level] = row;
        statusEl.textContent = isBetter ? 'New best saved!' : 'Result saved.';
    } else {
        statusEl.textContent = "Couldn't save your result — try again later.";
    }
    showEl(statusEl);
}

function finishLevel() {
    stopTimer();
    const result = { level: currentLevel.level, timeSeconds: elapsedSeconds, moves };
    showResultModal(result);

    const session = window.getCurrentSession();
    if (session) {
        lastResult = null;
        saveProgress(session, result);
    } else {
        lastResult = result;
        showEl(document.getElementById('result-login-btn'));
    }
}

function showResultModal(result) {
    document.getElementById('result-time').textContent = formatTime(result.timeSeconds);
    document.getElementById('result-moves').textContent = result.moves;

    const prevBest = progressCache[result.level];
    document.getElementById('result-best').textContent = (prevBest && prevBest.completed)
        ? `Previous best: ${formatTime(prevBest.best_time_seconds)} · ${prevBest.best_moves} moves`
        : 'First clear on this level!';

    hideEl(document.getElementById('result-login-btn'));
    hideEl(document.getElementById('result-save-status'));
    showEl(document.getElementById('result-modal'));
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
document.getElementById('board-back-btn').addEventListener('click', backToLevels);
document.getElementById('board-shuffle-btn').addEventListener('click', shuffleRemaining);

document.getElementById('result-modal-close').addEventListener('click', () => hideEl(document.getElementById('result-modal')));
document.getElementById('result-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hideEl(document.getElementById('result-modal'));
});
document.getElementById('result-replay-btn').addEventListener('click', () => {
    hideEl(document.getElementById('result-modal'));
    startLevel(currentLevel);
});
document.getElementById('result-levels-btn').addEventListener('click', () => {
    hideEl(document.getElementById('result-modal'));
    backToLevels();
});
document.getElementById('result-login-btn').addEventListener('click', () => window.openAuthModal());

window.onAuthChange(async (session) => {
    await loadProgress();
    if (session && lastResult) {
        await saveProgress(session, lastResult);
        lastResult = null;
        hideEl(document.getElementById('result-login-btn'));
    }
});
