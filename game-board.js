// Word Match — building and dealing the honeycomb board, the timer and score HUD,
//
// the families-found chips and the example-sentence panel.
//
// Word Match is split across game-core.js, game-fx.js, game-board.js, game-play.js,
// game-wakan.js and game.js, loaded in that order by game.html. They are classic scripts
// sharing one global scope, so each can read and assign the others’ top-level `let`s and
// call their functions. The one rule is load order: code that runs while a file is loading
// may only use what an EARLIER file defined. Listeners and requestAnimationFrame callbacks run
// later, so they are free to reach forward.

// ---------------------------------------------------------------------------
// Board construction — a honeycomb of hexagon tiles, no grid/pathfinding: any two tiles can
// be clicked regardless of position, so the board can never get "stuck".
// ---------------------------------------------------------------------------
// Picks this playthrough's word set (levels hold several; replaying doesn't always show the
// same words) and splits its pairIds into two pools: `dealOrder`, shuffled and truncated to
// LEVEL_PAIR_COUNT -- the pairs actually in play, dealt VISIBLE_TARGET at a time via
// dealPairs() below -- and `fuel`, everything left over (25 - 20 = 5 pairs), which normal
// dealing never touches and only the "swap 3" powerup can draw from (see maybeGrantPowerup).
// A level's hardest words are the ones you can mix up, and a set usually contains a few: 暑い,
// 熱い and 厚い are all あつい, 赤 and 赤い are both "red". They only teach anything when they are
// on the board at the same time -- meet 暑い alone and you match the one tile saying "hot"
// without ever reading the kanji. A plain shuffle leaves that to chance.
//
// This reorders the deal so one confusable partner follows its twin, which puts them in the same
// batch since dealing takes the next N in order. It is a permutation and nothing else: the same
// pairs, still dealt whole, so the no-deadlock guarantee above is untouched. Capped at one pull
// per REFILL_BATCH-sized stretch, or a board of nothing but near-misses stops being a game.
function clusterConfusables(ids) {
    const keysOf = (w) => [w.reading, (w.en || '').toLowerCase()];
    const out = [];
    const taken = new Set();
    let lastPull = -REFILL_BATCH;
    ids.forEach(id => {
        if (taken.has(id)) return;
        out.push(id);
        taken.add(id);
        if (out.length - lastPull < REFILL_BATCH) return;
        const mine = keysOf(currentSet[id]);
        const partner = ids.find(other => !taken.has(other) &&
            keysOf(currentSet[other]).some((k, n) => k && k === mine[n]));
        if (partner === undefined) return;
        out.push(partner);
        taken.add(partner);
        lastPull = out.length;
    });
    return out;
}

// A level holds 25 pairs and deals 20 of them, so five are dropped at random every time. If
// some of those 25 are words this learner has already got wrong, dropping them is the worst
// possible choice -- and a plain shuffle does it one time in five. This floats up to
// MISSED_PRIORITY of them to the front, which both guarantees they are dealt and puts them in
// the first batch. Everything else stays shuffled, so a board is still different every visit
// and a learner with no history sees no change at all.
const MISSED_PRIORITY = 6;

function prioritiseMissed(order) {
    if (!missedWords.size) return order;
    const wanted = [];
    const rest = [];
    order.forEach(id => {
        const w = currentSet[id];
        if (wanted.length < MISSED_PRIORITY && w && missedWords.has(w.jp)) wanted.push(id);
        else rest.push(id);
    });
    return wanted.concat(rest);
}

function pickWordSet(level) {
    currentSet = level.sets[Math.floor(Math.random() * level.sets.length)];
    const order = currentSet.map((_, i) => i);
    shuffleArray(order);
    const weighted = prioritiseMissed(order);
    return { dealOrder: clusterConfusables(weighted.slice(0, LEVEL_PAIR_COUNT)), fuel: weighted.slice(LEVEL_PAIR_COUNT) };
}

function layoutTiles(tileList) {
    const grid = document.getElementById('tile-grid');
    grid.innerHTML = '';
    let rowEl = null;
    let rowIndex = -1;
    tileList.forEach((t, i) => {
        if (i % PER_ROW === 0) {
            rowIndex++;
            rowEl = document.createElement('div');
            rowEl.className = 'hex-row' + (rowIndex % 2 === 1 ? ' offset' : '');
            grid.appendChild(rowEl);
        }
        rowEl.appendChild(t.el);
    });
}

// Materializes DOM tile objects for the given pairIds (from currentSet) and adds them to the
// board -- used both for the initial deal and for every later refill. `fresh` marks the newly
// dealt tiles with an entrance pop (see .tile.dealt-in in game.css) so a refill visibly reads
// as new cards arriving, not just a silent relayout -- `entranceClass` swaps in a different
// entrance (e.g. 'swap-in', a card-flip, for the swap-3 powerup's incoming tiles) instead of
// the default scale pop; ignored when `fresh` is false. `countsTowardDeal` (default true) gates
// whether this batch advances dealtCount -- the swap-3 powerup deals pairs pulled from
// powerupFuel, outside reserveQueue entirely, and must pass false so maybeRefill's "how much
// of reserveQueue is left" bookkeeping doesn't think reserveQueue is emptier than it is.
function dealPairs(pairIds, fresh, countsTowardDeal, entranceClass) {
    if (countsTowardDeal === undefined) countsTowardDeal = true;
    const useMn = window.siteLang() === 'mn';
    pairIds.forEach(pairId => {
        const p = currentSet[pairId];
        [
            { kind: 'jp', text: p.jp, sub: p.reading, phonetic: p.phonetic || null },
            { kind: 'en', text: (useMn && p.enMn) ? p.enMn : p.en, sub: '', phonetic: null },
        ].forEach(spec => {
            const t = { pairId, kind: spec.kind, text: spec.text, sub: spec.sub, phonetic: spec.phonetic, cleared: false };
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `tile tile-${t.kind}` + (fresh ? ' ' + (entranceClass || 'dealt-in') : '');
            btn.style.setProperty('--suit-color', SUIT_COLORS[t.pairId % SUIT_COLORS.length]);
            if (t.kind === 'jp') {
                btn.innerHTML = `<span class="tile-jp">${escapeHtml(t.text)}</span>` +
                    `<span class="tile-reading">${escapeHtml(t.sub)}</span>`;
            } else {
                btn.innerHTML = `<span class="tile-en-text">${escapeHtml(t.text)}</span>`;
            }
            const dot = document.createElement('span');
            dot.className = 'tile-dot';
            btn.appendChild(dot);
            btn.addEventListener('click', () => onTileClick(t));
            t.el = btn;

            tiles.push(t);
            if (!tilesByPairId[pairId]) tilesByPairId[pairId] = {};
            tilesByPairId[pairId][t.kind] = t;
        });
    });
    if (countsTowardDeal) dealtCount += pairIds.length;
    layoutTiles(tiles.filter(t => !t.cleared));
    resizeCanvases();
}

// Tops the board back up to VISIBLE_TARGET whenever REFILL_BATCH-or-more spots have opened up
// (recomputed fresh from `tiles` each time rather than hand-tracked, so it can't drift out of
// sync with what a blast/penalty/lightning-chain actually did to the board). Looped so a single
// big clear -- a lightning chain, or a Wakan blast -- can trigger more than one batch at once.
function maybeRefill() {
    let dealtAny = false;
    for (; ;) {
        const activePairs = new Set(tiles.filter(t => !t.cleared).map(t => t.pairId)).size;
        const gap = VISIBLE_TARGET - activePairs;
        const room = totalPairs - dealtCount;
        if (gap < REFILL_BATCH || room <= 0) break;
        const n = Math.min(REFILL_BATCH, room);
        dealPairs(reserveQueue.splice(0, n), true);
        dealtAny = true;
    }
    return dealtAny;
}

function renderBoard() {
    tiles = [];
    tilesByPairId = {};
    dealtCount = 0;
    const picked = pickWordSet(currentLevel);
    reserveQueue = picked.dealOrder;
    powerupFuel = picked.fuel;
    dealPairs(reserveQueue.splice(0, Math.min(VISIBLE_TARGET, totalPairs)), false);
}

// Cosmetic reshuffle of the remaining (uncleared) tiles' honeycomb positions — reuses the
// existing tile elements (and their listeners), just re-lays them out in a new random order.
function shuffleRemaining() {
    const remaining = tiles.filter(t => !t.cleared);
    if (!remaining.length) return;
    selected.forEach(t => t.el.classList.remove('selected'));
    selected = [];
    locked = false;
    shuffleArray(remaining);
    layoutTiles(remaining);
}

// ---------------------------------------------------------------------------
// Timer & stats
// ---------------------------------------------------------------------------
function renderTimer() {
    const el = document.getElementById('board-timer');
    el.textContent = formatTime(timeRemaining);
    el.classList.toggle('low-time', timeRemaining <= LOW_TIME_THRESHOLD && timeRemaining > 0);
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        timeRemaining = Math.max(0, matchDuration + bonusSeconds - elapsedSeconds);
        renderTimer();
        if (timeRemaining <= 0) timeUp();
    }, 250);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Called once per pair cleared (handleMatch, or once per member of a lightning chain) --
// extends the 5-minute clock rather than just cosmetically ticking a bonus number, so a chain
// of N pairs is worth N x TIME_BONUS_PER_PAIR seconds of real breathing room.
function addTimeBonus(pairCount, atX, atY) {
    bonusSeconds += TIME_BONUS_PER_PAIR * pairCount;
    timeRemaining = Math.max(0, matchDuration + bonusSeconds - elapsedSeconds);
    renderTimer();
    if (atX != null) floatText(atX, atY, '+' + (TIME_BONUS_PER_PAIR * pairCount) + window.t('game.secAbbr'), false, false, 'time-text');
}

// Time ran out before the level was cleared -- a distinct, honest failure path from
// finishLevel()'s success path: no win fanfare, no progress save (best_time_seconds is only
// ever meant to record an actual clear, not an incomplete attempt).
function timeUp() {
    stopTimer();
    matchStarted = false;
    locked = true;
    selected.forEach(t => t.el.classList.remove('selected'));
    selected = [];
    GameAudio.timeUp();
    showResultModal({ level: currentLevel.level, timeSeconds: elapsedSeconds, moves }, false);
}

function updateStats() {
    const pairsText = window.tf('game.pairsCount', { n: matchedCount, total: totalPairs });
    document.getElementById('board-pairs').textContent = pairsText;
    document.getElementById('board-moves').textContent = window.tf('game.movesCount', { n: moves });
}

function setScore(newScore) {
    const scoreEl = document.getElementById('score-value');
    tween(score, newScore, 380, v => { scoreEl.textContent = Math.round(v).toString(); });
    score = newScore;
}

// Shows the multiplier only while one is being carried -- an always-visible "x1" would read as
// a stat rather than as something at stake.
function updateChainCombo(lost) {
    const el = document.getElementById('chain-combo');
    if (!el) return;
    if (chainCombo > 1) {
        el.textContent = window.tf('game.chainCombo', { n: chainCombo });
        el.classList.remove('hidden', 'is-lost');
        void el.offsetWidth;
        el.classList.add('is-live');
    } else if (lost && !el.classList.contains('hidden')) {
        el.classList.remove('is-live');
        el.classList.add('is-lost');
        window.setTimeout(() => el.classList.add('hidden'), 420);
    } else {
        el.classList.add('hidden');
    }
}

function updateStreakMeter(tierHit) {
    const streakFill = document.getElementById('streak-fill');
    let pct = ((streak % STREAK_TIER) / STREAK_TIER) * 100;
    if (tierHit) pct = 100;
    streakFill.style.width = pct + '%';
    if (tierHit) {
        streakFill.classList.remove('tier-flash');
        void streakFill.offsetWidth;
        streakFill.classList.add('tier-flash');
        window.setTimeout(() => { streakFill.style.width = '0%'; }, 260);
    }

}

// ---------------------------------------------------------------------------
// Families-found chips (side panel, wide layout only) — tracks which phonetic "lightning
// connect" families have been chained this round, distinct from the ordinary pairs counter:
// the point is celebrating the phonetic-family mechanic specifically, not re-showing
// matchedCount under a different label.
// ---------------------------------------------------------------------------
function renderFamiliesFound() {
    const listEl = document.getElementById('families-found-list');
    const emptyEl = document.getElementById('families-empty');
    if (!listEl || !emptyEl) return;

    listEl.innerHTML = '';
    if (familiesFound.size === 0) {
        showEl(emptyEl);
        return;
    }
    hideEl(emptyEl);

    familiesFound.forEach(phonetic => {
        const pair = currentSet.find(p => p.phonetic === phonetic);
        const reading = pair ? pair.phoneticReading : '';
        const chip = document.createElement('span');
        chip.className = 'family-chip';
        chip.innerHTML = `<span class="family-chip-kanji">${escapeHtml(phonetic)}</span>` +
            (reading ? `<span class="family-chip-reading">${escapeHtml(reading)}</span>` : '') +
            `<span class="family-chip-label">${escapeHtml(window.t('game.foundChipLabel'))}</span>`;
        listEl.appendChild(chip);
    });
}

// ---------------------------------------------------------------------------
// Example sentence panel — updates whenever a pair is matched, for memorization
// ---------------------------------------------------------------------------
function resetExamplePanel() {
    hideEl(document.getElementById('example-content'));
    showEl(document.getElementById('example-empty'));
}

function showExample(pairId) {
    const pair = currentSet[pairId];
    if (!pair) return;

    document.getElementById('example-jp').textContent = pair.jp;
    document.getElementById('example-reading').textContent = pair.reading;
    const useMn = window.siteLang() === 'mn';
    let meanings;
    if (useMn && pair.meaningsMn && pair.meaningsMn.length) {
        meanings = pair.meaningsMn;
    } else if (pair.meanings && pair.meanings.length) {
        meanings = pair.meanings;
    } else {
        meanings = [(useMn && pair.enMn) ? pair.enMn : pair.en];
    }
    document.getElementById('example-meanings').textContent = meanings.join(', ');

    const sentenceBlock = document.getElementById('example-sentence-block');
    const noneEl = document.getElementById('example-none');
    if (pair.example) {
        const jpEl = document.getElementById('example-sentence-jp');
        if (pair.example.furigana) {
            jpEl.innerHTML = pair.example.furigana;
        } else {
            jpEl.textContent = pair.example.jp;
        }
        const exampleEnText = (window.siteLang() === 'mn' && pair.example.enMn) ? pair.example.enMn : pair.example.en;
        document.getElementById('example-sentence-en').textContent = exampleEnText;
        showEl(sentenceBlock);
        hideEl(noneEl);
    } else {
        hideEl(sentenceBlock);
        showEl(noneEl);
    }

    hideEl(document.getElementById('example-empty'));
    showEl(document.getElementById('example-content'));
}

