// Word Match — the rules: tile clicks, matches, lightning chains, mismatches and
//
// penalties, and the streak powerups.
//
// Word Match is split across game-core.js, game-fx.js, game-board.js, game-play.js,
// game-wakan.js and game.js, loaded in that order by game.html. They are classic scripts
// sharing one global scope, so each can read and assign the others’ top-level `let`s and
// call their functions. The one rule is load order: code that runs while a file is loading
// may only use what an EARLIER file defined. Listeners and requestAnimationFrame callbacks run
// later, so they are free to reach forward.

// ---------------------------------------------------------------------------
// Gameplay
// ---------------------------------------------------------------------------
function onTileClick(tile) {
    // While a caught winged tile is being carried, every board click is a drop attempt on it,
    // regardless of matchStarted/locked -- see handleFlyerDrop. Ordinary tile selection is
    // fully suspended for the four seconds the catch window lasts.
    if (flyerHeld) { handleFlyerDrop(tile); return; }
    if (!matchStarted || locked) return;
    if (tile.cleared) return;

    if (selected.includes(tile)) {
        tile.el.classList.remove('selected');
        selected = selected.filter(t => t !== tile);
        return;
    }
    if (selected.length >= 2) return;

    tile.el.classList.add('selected');
    selected.push(tile);
    GameAudio.select();

    if (selected.length === 2) {
        locked = true;
        moves++;
        updateStats();
        const [a, b] = selected;
        window.setTimeout(() => resolveSelection(a, b), 200);
    }
}

function resolveSelection(a, b) {
    if (a.pairId === b.pairId && a.kind !== b.kind) {
        handleMatch(a, b);
        return;
    }
    if (a.kind === 'jp' && b.kind === 'jp' && a.phonetic && a.phonetic === b.phonetic) {
        handleLightningChain(a.phonetic);
        return;
    }
    handleMismatch(a, b);
}

function handleMatch(a, b) {
    const jp = a.kind === 'jp' ? a : b;
    if (window.recordWordAttempt) window.recordWordAttempt({ source: 'game', word: jp.text, correct: true });
    streak += 1;
    const gained = 10 * (1 + Math.floor(streak / STREAK_TIER));
    setScore(score + gained);
    GameAudio.match(Math.floor(streak / STREAK_TIER));

    const mid = midpoint(centerOf(a.el), centerOf(b.el));
    // A single gold ripple ring expanding from the midpoint between the two tiles is the
    // ordinary match's own signature -- reads as "these two just connected" as one event,
    // distinct from lightning's traveling bolts and Wakan's hex ring. The per-tile burst stays,
    // just smaller, as texture rather than the whole effect.
    fxField.spawnRing(mid.x, mid.y, { r0: 8, r1: 62, width: 3, color: '244,206,122', life: 0.42 });
    [a, b].forEach(t => {
        t.el.classList.add('match-pop');
        const c = centerOf(t.el);
        const rgb = hexToRgb(SUIT_COLORS[a.pairId % SUIT_COLORS.length]);
        fxField.spawnBurst(c.x, c.y, { count: 12, colors: ['212,166,75', '244,206,122', rgb], speed: 170, life: 0.75 });
    });

    floatText(mid.x, mid.y, '+' + gained);
    addTimeBonus(1, mid.x, mid.y + 24);

    const tierHit = streak % STREAK_TIER === 0;
    updateStreakMeter(tierHit);
    if (tierHit) {
        window.setTimeout(() => {
            floatText(mid.x, mid.y - 40, window.tf('game.streakFloat', { n: streak }), true);
            fxField.spawnBurst(mid.x, mid.y, { count: 60, speed: 260, life: 1.1, colors: ['212,166,75', '244,206,122', '255,255,255'] });
            GameAudio.streak();
        }, 200);
    }

    showExample(a.pairId);

    window.setTimeout(() => {
        [a, b].forEach(t => { t.el.classList.remove('match-pop', 'selected'); t.el.classList.add('cleared'); t.cleared = true; });
        matchedCount++;
        selected = [];
        locked = false;
        updateStats();
        if (matchedCount === totalPairs) { finishLevel(); return; }
        maybeRefill();
        maybeArmFlyer();
        maybeGrantPowerup();
    }, 520);
}

// Phonetic-chain "lightning connect": every still-on-board word sharing this phonetic value
// (both its jp tile AND its en tile) clears together in one combo, each pair counting toward
// the streak — a 3-pair chain can trigger a tier bonus mid-chain just like 3 separate matches.
function handleLightningChain(phonetic) {
    const memberPairIds = [];
    currentSet.forEach((p, pairId) => {
        if (p.phonetic !== phonetic) return;
        const pt = tilesByPairId[pairId];
        if (pt && pt.jp && !pt.jp.cleared) memberPairIds.push(pairId);
    });
    if (memberPairIds.length < 2) { handleMismatch(selected[0], selected[1]); return; }

    // Chain confirmed (past the early-return above, so this is never recorded for a false
    // attempt) -- track it for the side panel's "families found" chip list.
    familiesFound.add(phonetic);
    renderFamiliesFound();

    const chainTiles = [];
    memberPairIds.forEach(pairId => {
        const pt = tilesByPairId[pairId];
        if (pt.jp && !pt.jp.cleared) chainTiles.push(pt.jp);
        if (pt.en && !pt.en.cleared) chainTiles.push(pt.en);
    });

    GameAudio.lightning(memberPairIds.length);

    const centers = chainTiles.map(t => centerOf(t.el));
    for (let i = 0; i < centers.length - 1; i++) fxField.spawnBolt(centers[i], centers[i + 1], { color: '127,224,255' });
    if (centers.length > 2) fxField.spawnBolt(centers[centers.length - 1], centers[0], { color: '127,224,255', life: 0.4 });

    // A 3+ pair chain is a bigger event than an ordinary match -- a brief cyan flash across the
    // whole board (see .board-wrap.lightning-flash in game.css) makes that difference felt
    // structurally, not just via a bigger number, the same way a penalty touches the whole
    // board rather than one tile.
    if (memberPairIds.length >= 3) {
        boardWrapEl.classList.remove('lightning-flash');
        void boardWrapEl.offsetWidth;
        boardWrapEl.classList.add('lightning-flash');
    }

    chainCombo = Math.min(chainCombo + 1, CHAIN_COMBO_MAX);
    updateChainCombo(false);

    let gainedTotal = 0;
    const tierHits = [];
    memberPairIds.forEach(pairId => {
        streak += 1;
        gainedTotal += 10 * (1 + Math.floor(streak / STREAK_TIER));
        if (streak % STREAK_TIER === 0) tierHits.push(streak);
    });
    // The multiplier rides on the chain's own score, not on ordinary matches: it is payment for
    // the risk of attempting a chain, so taking safe pairs neither earns nor spends it.
    gainedTotal *= chainCombo;
    setScore(score + gainedTotal);
    if (chainCombo > 1) {
        const c0 = centerOf(chainTiles[0].el);
        floatText(c0.x, c0.y - 60, window.tf('game.chainCombo', { n: chainCombo }), true, true);
    }
    updateStreakMeter(tierHits.length > 0);
    tierHits.forEach((s, idx) => {
        window.setTimeout(() => GameAudio.streak(), 180 + idx * 140);
    });

    chainTiles.forEach(t => {
        t.el.classList.add('lightning-pop');
        const c = centerOf(t.el);
        fxField.spawnBurst(c.x, c.y, { count: 24, colors: ['127,224,255', '244,206,122', '255,255,255'], speed: 210, life: 0.9 });
    });

    const midPt = centers.reduce((acc, c) => ({ x: acc.x + c.x, y: acc.y + c.y }), { x: 0, y: 0 });
    midPt.x /= centers.length; midPt.y /= centers.length;
    floatText(midPt.x, midPt.y, window.tf('game.lightningFloat', { n: memberPairIds.length }), true, true);
    addTimeBonus(memberPairIds.length, midPt.x, midPt.y + 30);
    if (tierHits.length) {
        window.setTimeout(() => floatText(midPt.x, midPt.y - 44, window.tf('game.streakFloat', { n: streak }), true), 220);
    }

    showExample(memberPairIds[0]);

    window.setTimeout(() => {
        chainTiles.forEach(t => { t.el.classList.remove('lightning-pop', 'selected'); t.el.classList.add('cleared'); t.cleared = true; });
        matchedCount += memberPairIds.length;
        selected = [];
        locked = false;
        updateStats();
        if (matchedCount === totalPairs) { finishLevel(); return; }
        maybeRefill();
        maybeArmFlyer();
        maybeGrantPowerup();
    }, 580);
}

function handleMismatch(a, b) {
    // The one moment this tool learns something about a particular learner. `a` and `b` are the
    // two tiles that did not go together, so the Japanese side of each is both the word missed
    // and the thing it was confused with -- which is the fact worth keeping.
    const jpA = a.kind === 'jp' ? a : (currentSet[a.pairId] && { text: currentSet[a.pairId].jp });
    const jpB = b.kind === 'jp' ? b : (currentSet[b.pairId] && { text: currentSet[b.pairId].jp });
    if (window.recordWordAttempt && jpA && jpB) {
        window.recordWordAttempt({ source: 'game', word: jpA.text, correct: false, confusedWith: jpB.text });
    }
    if (chainCombo > 0) {
        chainCombo = 0;
        updateChainCombo(true);
    }
    streak = 0;
    lastPowerupStreak = 0; // a fresh streak run starting over should be able to re-trigger a
    // powerup at the same tier number (e.g. 4) it already fired at earlier this level
    updateStreakMeter(false);
    GameAudio.mismatch();
    boardWrapEl.classList.remove('board-shake');
    void boardWrapEl.offsetWidth;
    boardWrapEl.classList.add('board-shake');
    [a, b].forEach(t => {
        t.el.classList.add('mismatch');
        // A mismatch had no particle effect at all before -- a few motes falling FROM the tile
        // (the burst/ring family everywhere else arcs upward) is a cheap but real "this failed"
        // signature, distinct in motion, not just color, from every reward effect.
        const c = centerOf(t.el);
        fxField.spawnDust(c.x, c.y - 14, { count: 14, colors: ['214,104,86', '150,66,58'], spread: 30, speed: 60, life: 0.65, size: 4.5 });
    });

    mismatchStreak++;

    window.setTimeout(() => {
        [a, b].forEach(t => {
            t.el.classList.remove('mismatch', 'selected');
            t.el.style.backgroundImage = '';
        });
        selected = [];
        locked = false;

        if (mismatchStreak >= MISTAKES_PER_PENALTY) {
            mismatchStreak = 0;
            applyPenalty();
        }
    }, 430);
}

// Every MISTAKES_PER_PENALTY mismatches, a previously-cleared pair reappears on the board --
// a real setback (matchedCount drops, the pair has to be re-cleared), not just a cosmetic
// scold. Picks a random cleared pair rather than "the most recent" since tiles only track a
// cleared boolean, not a clear-order log, and which specific pair returns doesn't materially
// change the mechanic. No-op if nothing's been cleared yet (can't penalize progress that
// doesn't exist) -- the two mistakes are simply forgiven in that case.
function applyPenalty() {
    const clearedPairIds = Object.keys(tilesByPairId)
        .map(Number)
        .filter(pairId => {
            const pt = tilesByPairId[pairId];
            return pt.jp && pt.jp.cleared && pt.en && pt.en.cleared;
        });
    if (!clearedPairIds.length) return;

    const pairId = clearedPairIds[Math.floor(Math.random() * clearedPairIds.length)];
    const pt = tilesByPairId[pairId];
    pt.jp.cleared = false;
    pt.en.cleared = false;
    pt.jp.el.classList.remove('cleared');
    pt.en.el.classList.remove('cleared');
    matchedCount--;
    updateStats();

    // Reshuffle the whole board on a penalty, not just reinsert the returned pair where it used
    // to sit -- makes the setback register as touching the whole board, not one tile quietly
    // reappearing. The penalty float-text below is what tells the player that's a consequence
    // of the penalty, not an unrelated glitch.
    const activeNow = tiles.filter(t => !t.cleared);
    shuffleArray(activeNow);
    layoutTiles(activeNow);
    resizeCanvases();

    [pt.jp, pt.en].forEach(t => {
        t.el.classList.add('penalty-return');
        window.setTimeout(() => t.el.classList.remove('penalty-return'), 700);
    });

    const c = centerOf(boardWrapEl);
    floatText(c.x, c.y, window.t('game.penaltyFloat'), true);
    GameAudio.penalty();

    // Dust falling across the whole board width (not just the returned pair) -- the shuffle
    // already makes the setback touch every tile; this makes it READ as a board-wide event
    // from the first frame, in the same falling-motes language as an ordinary mismatch but
    // wider and heavier, rather than reusing a reward-shaped burst for a punishment.
    const wrapRect = boardWrapEl.getBoundingClientRect();
    const mainRect = gameMain.getBoundingClientRect();
    const topY = wrapRect.top - mainRect.top + 10;
    for (let i = 0; i < 5; i++) {
        const x = wrapRect.left - mainRect.left + (wrapRect.width * (i + 0.5)) / 5;
        fxField.spawnDust(x, topY, { count: 14, colors: ['224,130,70', '196,90,74'], spread: wrapRect.width / 5, speed: 65, life: 0.95, gravity: 260, size: 4.5 });
    }
}

// ---------------------------------------------------------------------------
// Streak powerups. Every STREAK_POWERUP_INTERVAL (4) consecutive pairs cleared without a
// mismatch in between banks one charge, spendable at any later moment on whichever of the two
// toolbar buttons the player picks -- a free pair-clear, or a swap of 3 active pairs for 3
// fresh ones drawn from this round's unused fuel (see LEVEL_PAIR_COUNT/powerupFuel). Earning is
// automatic; spending, and which effect to spend it on, is always the player's call (see
// #powerup-clear-btn/#powerup-swap-btn's click handlers below). `lastPowerupStreak` guards
// against banking a second charge on every subsequent clear once the streak is sitting AT a
// multiple of 4 -- it only grants the instant the streak first REACHES that multiple, and
// resets to 0 on any mismatch (see handleMismatch) so a later run can grant at the same tier
// again.
// ---------------------------------------------------------------------------

function maybeGrantPowerup() {
    if (streak < STREAK_POWERUP_INTERVAL) return;
    if (streak % STREAK_POWERUP_INTERVAL !== 0) return;
    if (streak <= lastPowerupStreak) return;
    lastPowerupStreak = streak;
    powerupCharges++;
    updatePowerupUI();
    GameAudio.powerup();
    const c = centerOf(boardWrapEl);
    floatText(c.x, c.y - 40, window.t('game.powerupReadyFloat'), true);
}

// Reflects powerupCharges (and whether powerupFuel can still fund a swap) onto the two toolbar
// buttons -- called whenever either changes: a new charge banked, a charge spent, or a level
// start/restart. Doesn't gate on `locked`/flyerHeld -- a charge stays visibly available through
// a brief clear animation, the click handlers below are what actually reject a click mid-lock.
function updatePowerupUI() {
    const clearBtn = document.getElementById('powerup-clear-btn');
    const swapBtn = document.getElementById('powerup-swap-btn');
    const canUseAny = powerupCharges > 0;
    const canSwap = canUseAny && powerupFuel.length > 0;
    document.getElementById('powerup-clear-badge').textContent = String(powerupCharges);
    document.getElementById('powerup-swap-badge').textContent = String(powerupCharges);
    clearBtn.disabled = !canUseAny;
    swapBtn.disabled = !canSwap;
    clearBtn.classList.toggle('ready', canUseAny);
    swapBtn.classList.toggle('ready', canSwap);
    clearBtn.title = canUseAny ? window.t('game.powerupClearTitle') : window.t('game.powerupNoChargeTitle');
    swapBtn.title = canSwap ? window.t('game.powerupSwapTitle')
        : (canUseAny ? window.t('game.powerupSwapNoFuelTitle') : window.t('game.powerupNoChargeTitle'));
}

// Spends one charge to clear a random still-active pair, same as landing a real match -- counts
// toward matchedCount and can finish the level. Never targets the current Wakan flyer's pair:
// that tile's board copy needs to stay put for the flyer event still in flight/held above it.
function grantFreeClearPowerup() {
    const activePairIds = [...new Set(tiles.filter(t => !t.cleared && t.pairId !== flyerTargetPairId).map(t => t.pairId))];
    if (!activePairIds.length) return;
    const pairId = activePairIds[Math.floor(Math.random() * activePairIds.length)];
    const pt = tilesByPairId[pairId];
    if (!pt || !pt.jp || !pt.en) return;

    locked = true;
    GameAudio.powerup();
    const mid = midpoint(centerOf(pt.jp.el), centerOf(pt.en.el));
    floatText(mid.x, mid.y - 30, window.t('game.powerupFreeFloat'), true);
    // Star-shaped sparkle glints, not round burst dots -- the powerup family's own silhouette,
    // shared with (but colored apart from) the swap effect below, distinct from every tile-clear
    // burst/ring used elsewhere.
    fxField.spawnRing(mid.x, mid.y, { r0: 4, r1: 46, width: 2, color: '110,224,165', life: 0.35 });
    [pt.jp, pt.en].forEach(t => {
        t.el.classList.add('powerup-pop');
        const c = centerOf(t.el);
        fxField.spawnSparkle(c.x, c.y, { count: 14, color: '110,224,165', size: 11, spread: 34, life: 0.65 });
    });

    window.setTimeout(() => {
        [pt.jp, pt.en].forEach(t => { t.el.classList.remove('powerup-pop'); t.el.classList.add('cleared'); t.cleared = true; });
        matchedCount++;
        locked = false;
        updateStats();
        if (matchedCount === totalPairs) { finishLevel(); return; }
        maybeRefill();
        maybeArmFlyer();
    }, 520);
}

// Spends one charge to swap POWERUP_SWAP_COUNT random active pairs for the same number of fresh
// ones drawn from powerupFuel (this round's un-dealt leftovers -- see pickWordSet). Neither side
// counts toward matchedCount: the outgoing pairs aren't matched, they're discarded, and
// totalPairs doesn't change -- 3 of the 20 words in play just became 3 different words. The
// swap button is disabled once powerupFuel runs dry (see updatePowerupUI), so the `n <= 0`
// bail below is only a defensive backstop, not a normal path.
function grantSwapPowerup() {
    const activePairIds = [...new Set(tiles.filter(t => !t.cleared && t.pairId !== flyerTargetPairId).map(t => t.pairId))];
    const n = Math.min(POWERUP_SWAP_COUNT, activePairIds.length, powerupFuel.length);
    if (n <= 0) return;

    locked = true;
    shuffleArray(activePairIds);
    const outgoing = activePairIds.slice(0, n);
    const incoming = powerupFuel.splice(0, n);

    GameAudio.powerup();
    const outTiles = [];
    outgoing.forEach(pairId => {
        const pt = tilesByPairId[pairId];
        if (pt.jp) outTiles.push(pt.jp);
        if (pt.en) outTiles.push(pt.en);
    });
    // Outgoing tiles get a 3D card-flip away (see .tile.powerup-swap-out in game.css) instead of
    // a plain shrink/fade -- reads literally as "this card is being swapped out", and the
    // pink sparkle (vs. the clear powerup's mint) keeps the two effects tellable apart at a
    // glance despite sharing the same star silhouette as one "powerup family".
    outTiles.forEach(t => {
        t.el.classList.add('powerup-swap-out');
        const c = centerOf(t.el);
        fxField.spawnSparkle(c.x, c.y, { count: 10, color: '224,110,190', size: 9, spread: 26, life: 0.5 });
    });
    const mid = centerOf(boardWrapEl);
    floatText(mid.x, mid.y, window.t('game.powerupSwapFloat'), true);

    window.setTimeout(() => {
        outTiles.forEach(t => t.el.remove());
        tiles = tiles.filter(t => !outgoing.includes(t.pairId));
        outgoing.forEach(pairId => { delete tilesByPairId[pairId]; });
        // 'swap-in' flips the new cards in from the opposite face instead of the ordinary
        // scale-pop deal -- reads as the other half of the same flip the outgoing tiles just did.
        dealPairs(incoming, true, false, 'swap-in');
        locked = false;
        updatePowerupUI(); // powerupFuel just shrank -- the swap button may need to disable
        maybeArmFlyer();
    }, 420);
}

document.getElementById('powerup-clear-btn').addEventListener('click', () => {
    if (powerupCharges <= 0 || locked || flyerHeld) return;
    powerupCharges--;
    updatePowerupUI();
    grantFreeClearPowerup();
});
document.getElementById('powerup-swap-btn').addEventListener('click', () => {
    if (powerupCharges <= 0 || powerupFuel.length <= 0 || locked || flyerHeld) return;
    powerupCharges--;
    updatePowerupUI();
    grantSwapPowerup();
});

