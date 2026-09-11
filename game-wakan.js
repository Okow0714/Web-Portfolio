// Word Match — the Wakan "winged tile" bonus event.
//
//
// Word Match is split across game-core.js, game-fx.js, game-board.js, game-play.js,
// game-wakan.js and game.js, loaded in that order by game.html. They are classic scripts
// sharing one global scope, so each can read and assign the others’ top-level `let`s and
// call their functions. The one rule is load order: code that runs while a file is loading
// may only use what an EARLIER file defined. Listeners and requestAnimationFrame callbacks run
// later, so they are free to reach forward.

// ---------------------------------------------------------------------------
// Wakan "winged tile" bonus event.
//
// A Sino-Japanese/native-Japanese partner (see dictionary-data.js -- the same kango/wago pairs
// behind the Kango<->Wago tab on dictionary.html) of a word currently dealt on the board flies
// across it.
// Click it to catch it -- it comes off the board onto the pointer -- then drop it on its
// partner within WAKAN_CATCH_MS. A correct drop blast-clears that pair plus up to
// WAKAN_BLAST_EXTRA neighbouring pairs (and, always, THEIR partners too -- a neighbour is never
// cleared without its own match, or a tile would be stranded with nothing left to pair with,
// breaking the board's "always a legal move" guarantee the same way a naive positional clear
// would). A miss -- wrong tile, or the window running out -- shatters the tile with no penalty;
// it was a free bonus, not a trap.
// ---------------------------------------------------------------------------

// Built once, lazily, from DICTIONARY_ENTRIES (dictionary-data.js, loaded before this file --
// see game.html) -- word text -> its Wakan partner. Looked up by either side (kango or wago),
// since a word dealt on the board could be either half of a pair.
function buildWakanMap() {
    if (wakanMap) return wakanMap;
    wakanMap = new Map();
    const add = (key, info) => { if (!wakanMap.has(key)) wakanMap.set(key, info); };
    DICTIONARY_ENTRIES.forEach(p => {
        const kInfo = { partner: p.wago.text, partnerReading: p.wago.reading, meaning: p.meaning, meaningMn: p.meaningMn };
        const wInfo = { partner: p.kango.text, partnerReading: p.kango.reading, meaning: p.meaning, meaningMn: p.meaningMn };
        add(p.kango.text, kInfo);
        add(p.wago.text, wInfo);
        // dictionary-data.js cites a suru-verb in full dictionary form ("終了する") and every
        // na-adjective with its trailing な ("綺麗な"), but game-words.js often deals the same
        // word bare ("終了", "綺麗") -- the two datasets were built independently and never
        // reconciled on this. Indexing the stripped form too means the board word still links;
        // the flyer itself always shows wk.partner/partnerReading, unaffected either way and
        // always the correct full form.
        [[p.kango.text, kInfo], [p.wago.text, wInfo]].forEach(([text, info]) => {
            if (text.endsWith('する')) add(text.slice(0, -2), info);
            else if (p.pos === 'adjective' && text.endsWith('な')) add(text.slice(0, -1), info);
        });
    });
    return wakanMap;
}

// Checked after every clear (a match, a lightning chain, or a refill uncovering a new word).
// Fires at most once per level: no earlier than WAKAN_TRIGGER_FRACTION cleared, and only once
// at least one currently-active (dealt, uncleared) word actually has a Wakan partner -- so the
// event can never target something that isn't on screen. If the fraction is already past but
// nothing eligible is active yet, this just tries again on the next clear/refill; it does not
// wait or poll on its own.
function maybeArmFlyer() {
    if (flyerFiredThisLevel || flyerEl) return;
    if (matchedCount < Math.floor(totalPairs * WAKAN_TRIGGER_FRACTION)) return;
    const map = buildWakanMap();
    const candidates = tiles.filter(t => t.kind === 'jp' && !t.cleared && map.has(t.text));
    if (!candidates.length) return;
    flyerFiredThisLevel = true;
    spawnFlyer(candidates[Math.floor(Math.random() * candidates.length)]);
}

function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function spawnFlyer(targetTile) {
    const wk = wakanMap.get(targetTile.text);
    flyerTargetPairId = targetTile.pairId;

    const el = document.createElement('div');
    el.className = 'flyer';
    el.innerHTML = '<div class="flyer-clock"></div>' +
        '<div class="flyer-wing l"></div><div class="flyer-wing r"></div>' +
        `<div class="flyer-body"><span class="flyer-reading">${escapeHtml(wk.partnerReading)}</span>` +
        `<span class="flyer-text">${escapeHtml(wk.partner)}</span></div>`;
    el.addEventListener('click', catchFlyer);
    boardWrapEl.appendChild(el);
    flyerEl = el;

    const reduced = prefersReducedMotion();
    const topPct = 18 + Math.random() * 55;
    if (reduced) {
        el.style.top = topPct + '%';
        el.style.left = '50%';
        el.style.transform = 'translateX(-50%)';
    } else {
        el.style.top = topPct + '%';
        const wrapWidth = boardWrapEl.clientWidth;
        el.style.left = '-140px';
        tween(-140, wrapWidth + 140, 7000, v => {
            // flyerEl !== el: shattered, or the level moved on mid-flight. flyerHeld: THIS tile
            // was caught -- catchFlyer() has already taken over positioning it (position:fixed,
            // following the pointer), and tween's own rAF loop runs for the full 7000ms
            // regardless of being caught, so without this check it would keep overwriting
            // el.style.left with the flight path's position on every subsequent frame, right on
            // top of wherever the pointer actually is.
            if (flyerEl !== el || flyerHeld) return;
            el.style.left = v + 'px';
        });
    }

    window.setTimeout(() => {
        if (flyerEl !== el || flyerHeld) return; // already caught (or already gone)
        killFlyer(); // flew across untouched -- not a miss worth a shatter, just gone
    }, 7000);
}

function catchFlyer(e) {
    if (!flyerEl || flyerHeld) return;
    e.stopPropagation();
    flyerHeld = true;
    GameAudio.flyerCatch();

    const el = flyerEl;
    el.classList.add('held');
    // Clear the top/left the flight phase set inline (a random top%, and left tweened from
    // -140px across the board) -- .flyer.held's own top:0/left:0 in CSS can't override an
    // inline style, so without this the translate() below stacked on top of wherever the
    // flight happened to leave it, and the tile snapped further from the cursor the later into
    // the flight it was caught.
    el.style.top = '0px';
    el.style.left = '0px';
    el.style.transform = '';
    moveFlyerTo(e.clientX, e.clientY);
    flyerPointerMoveHandler = ev => moveFlyerTo(ev.clientX, ev.clientY);
    window.addEventListener('pointermove', flyerPointerMoveHandler, { passive: true });
    boardWrapEl.classList.add('carrying-flyer');

    const t0 = performance.now();
    const clock = el.querySelector('.flyer-clock');
    const tick = () => {
        if (flyerEl !== el || !flyerHeld) return;
        const left = WAKAN_CATCH_MS - (performance.now() - t0);
        if (left <= 0) { shatterFlyer(); return; }
        if (clock) clock.textContent = (left / 1000).toFixed(1) + window.t('game.secAbbr');
        const gone = 1 - left / WAKAN_CATCH_MS; // 0 at catch -> 1 at timeout
        el.style.setProperty('--shake-dur', (0.44 - 0.3 * gone).toFixed(3) + 's');
        el.style.setProperty('--shake-amp', (1.5 + 5.5 * gone).toFixed(2) + 'px');
        el.style.setProperty('--shake-rot', (0.6 + 3.4 * gone).toFixed(2) + 'deg');
        flyerTimerRAF = requestAnimationFrame(tick);
    };
    flyerTimerRAF = requestAnimationFrame(tick);
}

function moveFlyerTo(x, y) {
    if (flyerEl) flyerEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
}

// Tears down the winged-tile DOM/listeners with no visual "failure" effect -- used both when a
// flyer crosses the board unclicked (nothing was attempted, nothing to punish) and when a
// level ends with one in flight.
function killFlyer() {
    if (flyerTimerRAF) cancelAnimationFrame(flyerTimerRAF);
    flyerTimerRAF = null;
    if (flyerPointerMoveHandler) window.removeEventListener('pointermove', flyerPointerMoveHandler);
    flyerPointerMoveHandler = null;
    boardWrapEl.classList.remove('carrying-flyer');
    if (flyerEl) flyerEl.remove();
    flyerEl = null;
    flyerHeld = false;
    flyerTargetPairId = null;
}

// A caught tile broke apart -- either the 4s window ran out, or it was dropped on the wrong
// tile (see handleFlyerDrop). No score/time/streak penalty either way: it was a free bonus
// opportunity, not a trap, so failing it should only cost the bonus itself.
function shatterFlyer() {
    if (!flyerEl) return;
    const rect = flyerEl.getBoundingClientRect();
    spawnShards(rect);
    GameAudio.shatter();
    killFlyer();
}

function spawnShards(rect) {
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    const cuts = [
        ['polygon(50% 0,100% 25%,50% 50%)', 55, -64, -30],
        ['polygon(100% 25%,100% 75%,50% 50%)', 85, 18, 40],
        ['polygon(100% 75%,50% 100%,50% 50%)', 32, 80, 110],
        ['polygon(50% 100%,0 75%,50% 50%)', -50, 72, 170],
        ['polygon(0 75%,0 25%,50% 50%)', -86, 9, -160],
        ['polygon(0 25%,50% 0,50% 50%)', -40, -68, -100],
    ];
    cuts.forEach(([clip, dx, dy, rot]) => {
        const s = document.createElement('div');
        s.className = 'flyer-shard';
        s.style.left = (cx - rect.width / 2) + 'px';
        s.style.top = (cy - rect.height / 2) + 'px';
        s.style.width = rect.width + 'px';
        s.style.height = rect.height + 'px';
        s.style.clipPath = clip;
        s.style.setProperty('--dx', dx + 'px');
        s.style.setProperty('--dy', dy + 'px');
        s.style.setProperty('--rot', rot + 'deg');
        document.body.appendChild(s);
        window.setTimeout(() => s.remove(), 750);
    });
}

// A tile was dropped while a flyer was being carried -- routed here from onTileClick, which
// suspends ordinary selection entirely for the duration of the catch window (see flyerHeld).
function handleFlyerDrop(tile) {
    if (tile.kind !== 'jp' || tile.cleared || tile.pairId !== flyerTargetPairId) {
        shatterFlyer();
        return;
    }
    const pairIds = computeBlastPairIds(tile);
    killFlyer();
    // Every other clear path (handleMatch, handleLightningChain) is only ever entered with
    // the board already locked -- they're reached through onTileClick's normal two-tile-click
    // flow, which sets `locked = true` before the resolve delay even starts, and each one resets
    // it at the end of its own animation. The blast is reached through the separate flyerHeld
    // branch instead, which never locked anything, so without this the board stayed fully
    // clickable for the whole pending-clear window -- long enough to start a second, overlapping
    // clear on one of the very tiles already mid-blast, corrupting matchedCount and leaving that
    // tile in a state neither clear path expected.
    locked = true;
    resolveWakanBlast(pairIds, tile.pairId);
}

// The dropped-on pair, plus up to WAKAN_BLAST_EXTRA more pairs physically touching it on the
// honeycomb (nearest first) -- and, for every one of those, its partner too, whether or not the
// partner itself was within reach. Clearing a neighbour without its partner would strand a tile
// with no match left on the board, so partners are never optional.
function computeBlastPairIds(dropTile) {
    const homeRect = dropTile.el.getBoundingClientRect();
    const home = { x: homeRect.left + homeRect.width / 2, y: homeRect.top + homeRect.height / 2 };
    const reach = homeRect.width * 1.35; // one ring of neighbouring hexes
    const others = tiles
        .filter(t => !t.cleared && t.pairId !== dropTile.pairId)
        .map(t => {
            const r = t.el.getBoundingClientRect();
            const c = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
            return { t, d: Math.hypot(c.x - home.x, c.y - home.y) };
        })
        .filter(o => o.d <= reach)
        .sort((a, b) => a.d - b.d);

    const pairIds = new Set([dropTile.pairId]);
    for (const o of others) {
        if (pairIds.size > WAKAN_BLAST_EXTRA) break;
        pairIds.add(o.t.pairId);
    }
    return pairIds;
}

function resolveWakanBlast(pairIds, targetPairId) {
    const clearTiles = [];
    pairIds.forEach(pairId => {
        const pt = tilesByPairId[pairId];
        if (pt.jp && !pt.jp.cleared) clearTiles.push(pt.jp);
        if (pt.en && !pt.en.cleared) clearTiles.push(pt.en);
    });

    GameAudio.wakanBlast(pairIds.size);

    let gainedTotal = 0;
    const tierHits = [];
    pairIds.forEach(() => {
        streak += 1;
        gainedTotal += 10 * (1 + Math.floor(streak / STREAK_TIER));
        if (streak % STREAK_TIER === 0) tierHits.push(streak);
    });
    setScore(score + gainedTotal);
    updateStreakMeter(tierHits.length > 0);
    tierHits.forEach((s, idx) => window.setTimeout(() => GameAudio.streak(), 180 + idx * 140));

    const centers = clearTiles.map(t => centerOf(t.el));
    const midPt = centers.reduce((acc, c) => ({ x: acc.x + c.x, y: acc.y + c.y }), { x: 0, y: 0 });
    midPt.x /= centers.length; midPt.y /= centers.length;

    // A honeycomb ring is the Wakan blast's own signature -- echoes the board's own hex tiles
    // rather than a generic circle, distinct from match's round ripple and lightning's bolts.
    // Two nested rings at slightly different rotations/timing read as a "linking" pulse rather
    // than a single flat pop.
    fxField.spawnRing(midPt.x, midPt.y, { shape: 'hex', r0: 12, r1: 130, width: 3, color: '138,131,190', life: 0.68 });
    fxField.spawnRing(midPt.x, midPt.y, { shape: 'hex', r0: 6, r1: 90, width: 2, color: '244,206,122', life: 0.5, rotation: Math.PI / 6 });
    clearTiles.forEach(t => {
        t.el.classList.add('wakan-pop');
        const c = centerOf(t.el);
        fxField.spawnBurst(c.x, c.y, { count: 12, colors: ['138,131,190', '244,206,122', '255,255,255'], speed: 190, life: 0.8 });
    });

    floatText(midPt.x, midPt.y, window.tf('game.wakanFloat', { n: pairIds.size }), true, false, 'wakan-text');
    addTimeBonus(pairIds.size, midPt.x, midPt.y + 30);
    if (tierHits.length) {
        window.setTimeout(() => floatText(midPt.x, midPt.y - 44, window.tf('game.streakFloat', { n: streak }), true), 220);
    }

    showExample(targetPairId);

    window.setTimeout(() => {
        clearTiles.forEach(t => { t.el.classList.remove('wakan-pop', 'selected'); t.el.classList.add('cleared'); t.cleared = true; });
        matchedCount += pairIds.size;
        selected = [];
        locked = false;
        updateStats();
        if (matchedCount === totalPairs) { finishLevel(); return; }
        maybeRefill();
        maybeGrantPowerup();
    }, 620);
}

