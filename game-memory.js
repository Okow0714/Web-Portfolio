// Word Match — the memory board: four hands of six pairs, each followed by a bonus round.
//
// Loaded after game-core.js/game-fx.js/game-gate.js and before game.js. The level machinery
// (which level is open, saving, the result pop-up) lives in game.js; everything here is about
// what happens on the board itself.

// ---------------------------------------------------------------------------
// Sound: cards, not notes
// ---------------------------------------------------------------------------
// Every cue is a handling sound — a card turned, two lifted off the table, a deck riffled — and
// there is not a pitched tone anywhere in it. It is synthesised rather than loaded because a
// card snap IS a shaped burst of noise, so modelling one costs a filter and an envelope, where
// a library of recordings would be another megabyte in APP_SHELL for sounds that last 30ms.
//
// Three details do the work. The noise buffer is read from a RANDOM offset every time and played
// at a randomised rate, so no two snaps are the same sound — identical clicks are what make
// synthetic card noise read as synthetic. The riffle's gaps are random inside a decaying span,
// because a real riffle is never metronomic. And every burst is brief: 20-40ms for a snap, which
// is what separates a card from a hiss.
//
// Volume is GameAudio's, not its own: the speaker button in the toolbar is a four-step control
// and the player should not have to find a second one. Level 0 is silence.
const CardSfx = (function () {
    let ctx = null, master = null, noiseBuf = null;

    function boot() {
        if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return ctx; }
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        // A page that constructs an AudioContext at load gets a suspended one in every browser
        // that enforces autoplay, and then stays silent for the whole session. This is only ever
        // reached from a click.
        try { ctx = new AC(); } catch (e) { return null; }
        master = ctx.createGain();
        master.connect(ctx.destination);
        return ctx;
    }

    function live() {
        const lvl = window.GameAudio ? GameAudio.getLevel() : 3;
        if (!lvl || !boot()) return false;
        master.gain.value = 0.2 * (lvl / 3);
        return true;
    }

    function buffer() {
        if (!noiseBuf) {
            noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.5), ctx.sampleRate);
            const d = noiseBuf.getChannelData(0);
            for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        }
        return noiseBuf;
    }

    // One shaped burst of noise: the whole vocabulary. highpass is the dry snap of a card's
    // edge, lowpass the body of one landing flat.
    function nz(at, dur, peak, type, hz, q) {
        const t = ctx.currentTime + at;
        const src = ctx.createBufferSource();
        src.buffer = buffer();
        src.playbackRate.value = 0.82 + Math.random() * 0.46;
        const f = ctx.createBiquadFilter();
        f.type = type; f.frequency.value = hz; f.Q.value = q || 0.8;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + Math.min(0.005, dur * 0.3));
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(f); f.connect(g); g.connect(master);
        src.start(t, Math.random() * 0.3);
        src.stop(t + dur + 0.03);
    }

    // A card sliding across another: the same noise, but the band travels, which is what a slide
    // sounds like and a fixed filter never does.
    function slide(at, dur, peak, from, to) {
        const t = ctx.currentTime + at;
        const src = ctx.createBufferSource();
        src.buffer = buffer();
        src.playbackRate.value = 0.9 + Math.random() * 0.3;
        const f = ctx.createBiquadFilter();
        f.type = 'bandpass'; f.Q.value = 1.1;
        f.frequency.setValueAtTime(from, t);
        f.frequency.exponentialRampToValueAtTime(to, t + dur);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + dur * 0.3);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(f); f.connect(g); g.connect(master);
        src.start(t, Math.random() * 0.2);
        src.stop(t + dur + 0.03);
    }

    // n snaps whose gaps are random inside a shrinking span, loud in the middle and thinning at
    // both ends. Even spacing is the one thing that would give it away.
    function riffleRun(n, span, peak) {
        let t = 0;
        for (let i = 0; i < n; i++) {
            const frac = i / (n - 1);
            const loud = peak * (0.35 + 0.9 * Math.sin(Math.PI * frac)) * (0.7 + Math.random() * 0.6);
            nz(t, 0.014 + Math.random() * 0.012, loud, 'highpass', 2000 + Math.random() * 1800, 0.7);
            t += (span / n) * (0.5 + Math.random() * 1.1);
        }
        return t;
    }

    // The deck squared up on the table: the full stop at the end of a shuffle.
    function square(at) {
        nz(at, 0.07, 0.26, 'lowpass', 520, 0.9);
        nz(at + 0.085, 0.09, 0.22, 'lowpass', 400, 0.9);
    }

    return {
        wake() { boot(); },
        flip() { if (live()) nz(0, 0.035, 0.3, 'highpass', 2100, 0.7); },
        pick() { if (live()) nz(0, 0.018, 0.22, 'highpass', 3200, 0.8); },
        match() {
            if (!live()) return;
            nz(0, 0.03, 0.32, 'highpass', 2300, 0.7);
            nz(0.055, 0.032, 0.28, 'highpass', 2600, 0.7);
            slide(0.02, 0.17, 0.14, 850, 3400);
        },
        miss() {
            if (!live()) return;
            nz(0, 0.085, 0.34, 'lowpass', 780, 0.8);
            nz(0.008, 0.13, 0.2, 'lowpass', 230, 1.0);
        },
        hint() {
            if (!live()) return;
            [0, 0.052, 0.098].forEach(d => nz(d, 0.022, 0.18, 'highpass', 2800, 0.7));
        },
        shuffle() { if (live()) square(riffleRun(24, 0.42, 0.26) + 0.06); },
        bonusMatch(n) {
            if (!live()) return;
            const hz = 2100 + Math.min(n, 3) * 520;
            nz(0, 0.028, 0.32, 'highpass', hz, 0.7);
            nz(0.048, 0.03, 0.28, 'highpass', hz + 400, 0.7);
            slide(0.015, 0.14, 0.12, 1000, 3800);
        },
        gather() { if (live()) square(riffleRun(30, 0.52, 0.3) + 0.07); },
    };
})();

// ---------------------------------------------------------------------------
// Board state
// ---------------------------------------------------------------------------
let levelDeck = [];        // the level's 25 words, shuffled once, dealt six at a time
let handWords = [];        // the six pairs of the hand on the board
let firstPick = -1;
let boardBusy = false;
let bonusTimer = null;
let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const boardEl = () => document.getElementById('mem-board');

function wordFront(w) { return w.enMn || w.en; }

function clearBoard() {
    const board = boardEl();
    Array.prototype.slice.call(
        board.querySelectorAll('.mem-tile, .mem-sparks, .mem-halo, .mem-colhead')
    ).forEach(el => el.remove());
}

// One honeycomb from a list of row lengths — the same function the gate lays its levels out
// with, so the board and the level select really are the same shape.
function memLayout(rows, cols) {
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

// A hex tile is only full width across the middle half of its height, so whether a label fits is
// a question about fractions of the tile — a rem size cannot answer it. Every size here is a
// fraction of the tile's own width, which makes the arithmetic scale-invariant: one answer per
// word is right at every viewport, with no resize handler measuring live DOM.
// Every label is a fraction of the tile's own width, which makes the arithmetic scale-invariant
// -- one answer per word is right at every viewport. The price is that it needs a board with a
// real width: measure a hidden one and every size comes out 0.
function sizeAllTiles() {
    tiles.forEach(t => sizeTile(t.el, t));
}

function sizeTile(el, t) {
    const board = boardEl().getBoundingClientRect();
    if (!board.width) {
        // Nothing can be sized against a board that has not been laid out yet. Rather than
        // writing 0px into every label, come back on the next frame.
        requestAnimationFrame(sizeAllTiles);
        return;
    }
    const cell = board.width * (t.cw || (100 / (MAIN_COLS + 0.5))) / 100;
    const txt = t.side === 'jp' ? t.word.jp : wordFront(t.word);

    // Size from how many lines the word will WRAP onto, not from its raw length. Length buckets
    // bottomed out at a tenth of the tile, which on a 390px phone is an 8px label -- measured,
    // and the reason the first build read as blank tiles even once they had a size at all. A
    // word that wraps to two lines only has to fit half its characters across, so it can be
    // twice the size; letting it wrap is what buys the type back.
    //
    // The two sides need different arithmetic because their glyphs are different widths: a
    // kanji is full-width, Cyrillic is a little over half an em.
    const em = t.side === 'jp' ? 1.0 : 0.55;
    const n = Math.max(1, txt.length);
    const width = n * em;
    const lines = width <= 3.2 ? 1 : width <= 7 ? 2 : 3;
    const perLine = Math.ceil(n / lines);
    // 0.82 of the tile is what is left inside the 7% padding either side, with a little margin
    // for the hexagon's slanted shoulders.
    let size = (cell * 0.82) / (perLine * em);
    if (lines === 3) size *= 0.88;            // three lines need the height back
    size = Math.min(size, cell * 0.26);

    // A Mongolian word has nowhere to break. Whatever the line estimate says, the type also has
    // to be small enough that the longest unbreakable token fits across the tile on one line --
    // otherwise it breaks mid-word, and "өчигдөр" is dealt as "өчигдө" over "р", which reads as
    // a broken tile rather than a small one. Spaces are the only place a label may wrap.
    const longest = Math.max.apply(null, txt.split(/\s+/).map(w => w.length));
    // 0.94 is slack, and it is needed: 0.55em is an average Cyrillic advance, so a word whose
    // letters run wide lands just over a fit computed exactly. маргааш was the one that did.
    size = Math.min(size, (cell * 0.82 * 0.94) / (longest * em));

    size = Math.max(size, cell * 0.115);
    el.style.fontSize = size.toFixed(2) + 'px';
    // The 0.82 above is the width left inside this inset, so the two have to be set together or
    // the type is solving for a box it does not actually get.
    el.style.paddingLeft = el.style.paddingRight = (cell * 0.09).toFixed(2) + 'px';
    const rd = el.querySelector('.t-read');
    if (rd) rd.style.fontSize = (cell * 0.085).toFixed(2) + 'px';
    const mk = el.querySelector('.t-mark');
    if (mk) mk.style.fontSize = (cell * 0.26).toFixed(2) + 'px';
}

// What a screen reader should hear. A face-down tile must NOT announce its word: the label is
// part of the board state, and leaving the real one on a turned-over tile hands the whole game
// to anyone reading the page with assistive tech — the one player who cannot see the faces.
function labelFor(t) {
    if (t.state === 'down') return window.t('game.mem.faceDown');
    return t.side === 'jp' ? `${t.word.jp} ${t.word.reading}` : wordFront(t.word);
}

function faceTile(el, t) {
    if (t.side === 'jp') {
        el.innerHTML = '<span class="t-word"></span><span class="t-read"></span>';
        el.querySelector('.t-word').textContent = t.word.jp;
        el.querySelector('.t-read').textContent = t.word.reading;
    } else {
        el.innerHTML = '<span class="t-mn"></span>';
        el.querySelector('.t-mn').textContent = wordFront(t.word);
    }
    const mark = document.createElement('span');
    mark.className = 't-mark';
    mark.textContent = '花';
    el.appendChild(mark);
    sizeTile(el, t);
}

// ---------------------------------------------------------------------------
// The main hand
// ---------------------------------------------------------------------------
function dealHand() {
    const board = boardEl();
    clearBoard();
    const start = handIndex * MAIN_PAIRS;
    handWords = levelDeck.slice(start, start + MAIN_PAIRS);

    const cards = [];
    handWords.forEach((w, i) => {
        cards.push({ pair: i, side: 'jp', word: w });
        cards.push({ pair: i, side: 'mn', word: w });
    });
    shuffleArray(cards);

    const { slots, totalH } = memLayout(MAIN_ROWS, MAIN_COLS);
    board.style.aspectRatio = `100 / ${totalH.toFixed(2)}`;
    tiles = [];
    cards.forEach((c, i) => {
        const s = slots[i];
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'mem-tile up';
        el.dataset.i = String(i);
        el.style.left = s.x.toFixed(3) + '%';
        el.style.top = (s.y / totalH * 100).toFixed(3) + '%';
        el.style.width = s.w.toFixed(3) + '%';
        el.style.height = (s.h / totalH * 100).toFixed(3) + '%';
        board.appendChild(el);
        const t = { el, pair: c.pair, side: c.side, word: c.word, state: 'up' };
        tiles.push(t);
        faceTile(el, t);
        el.setAttribute('aria-label', labelFor(t));
    });

    phase = 'preview';
    firstPick = -1;
    boardBusy = false;
    pairsThisHand = 0;
    document.getElementById('mem-preview').hidden = false;
    document.getElementById('bonus-head').hidden = true;
    document.getElementById('bonus-timer').hidden = true;
    document.getElementById('hint-btn').disabled = true;
    updateStats();
    renderPreviewHint();
    say(window.tf('game.mem.readThem', { n: MAIN_PAIRS * 2 }));
}

function startHand() {
    CardSfx.wake();
    document.getElementById('mem-preview').hidden = true;
    phase = 'play';
    document.getElementById('hint-btn').disabled = false;
    tiles.forEach((t, i) => window.setTimeout(() => turn(t, 'down'), i * 45));
    say(window.t('game.mem.turned'));
}

// Turn a tile, with the squash that stands in for a flip.
function turn(t, to, after) {
    const done = () => {
        t.state = to;
        t.el.classList.toggle('down', to === 'down');
        t.el.classList.toggle('up', to !== 'down');
        if (after) after();
    };
    CardSfx.flip();
    const relabel = () => t.el.setAttribute('aria-label', labelFor(t));
    const doneAndLabel = () => { done(); relabel(); };
    if (reducedMotion) { doneAndLabel(); return; }
    t.el.classList.add('flip');
    window.setTimeout(() => { doneAndLabel(); t.el.classList.remove('flip'); }, 170);
}

// Two tiles can read exactly the same thing. A hand of six words can hold 辞書 and 字引 — both
// "толь бичиг" — and a player who picks "the wrong one" has not made a mistake: the two tiles
// are identical on screen. So the crossed pick is accepted, and the two pairs trade meaning
// tiles so the two left over are a real pair too.
//
// It is done by trading rather than by clearing one tile of each pair because everything else
// on the board assumes a pair owns exactly two tiles; a half-matched pair would have to be
// taught to the bonus round, the hand counter and the deal.
function sameAnswer(a, b) {
    if (a.side === b.side) return false;
    const jp = a.side === 'jp' ? a : b;
    const mn = a.side === 'jp' ? b : a;
    return wordFront(jp.word) === wordFront(mn.word);
}

function relinkSameAnswer(a, b) {
    const jp = a.side === 'jp' ? a : b;
    const mn = a.side === 'jp' ? b : a;
    const p1 = jp.pair, p2 = mn.pair;
    const strandedMn = tiles.find(t => t.side === 'mn' && t.pair === p1 && t !== mn);
    if (!strandedMn) return false;          // nothing to trade with: leave the miss standing
    mn.pair = p1;
    strandedMn.pair = p2;                   // its new partner is the jp tile already holding p2
    return true;
}

function onTile(e) {
    const el = e.target.closest ? e.target.closest('.mem-tile') : null;
    if (!el || boardBusy) return;
    const t = tiles[+el.dataset.i];
    if (!t || t.state === 'gone') return;

    if (phase === 'play') {
        if (t.state === 'up') return;                   // already looking at it
        clicks++; updateStats();
        turn(t, 'up');
        if (firstPick < 0) {
            firstPick = +el.dataset.i;
            CardSfx.pick();
            say(window.t('game.mem.findPartner'));
            return;
        }
        const a = tiles[firstPick], b = t;
        firstPick = -1;
        if (a === b) return;
        boardBusy = true;
        if (a.pair !== b.pair && sameAnswer(a, b)) relinkSameAnswer(a, b);
        if (a.pair === b.pair) {
            CardSfx.match();
            recordHit(a.word);
            showLastPair(a.word);
            window.setTimeout(() => {
                a.el.classList.add('hit'); b.el.classList.add('hit');
                window.setTimeout(() => {
                    a.el.classList.add('gone'); b.el.classList.add('gone');
                    a.state = b.state = 'gone';
                    pairsThisHand++;
                    boardBusy = false;
                    updateStats();
                    if (pairsThisHand === handWords.length) finishHand();
                    else say(window.tf('game.mem.pairOf',
                        { n: pairsThisHand, total: handWords.length }), 'good');
                }, 420);
            }, 170);
        } else {
            misses++; updateStats(); CardSfx.miss();
            recordMiss(a.word, b.word); recordMiss(b.word, a.word);
            window.setTimeout(() => {
                a.el.classList.add('miss'); b.el.classList.add('miss');
                window.setTimeout(() => {
                    a.el.classList.remove('miss'); b.el.classList.remove('miss');
                    turn(a, 'down'); turn(b, 'down');
                    boardBusy = false;
                    say(window.tf('game.mem.notAPair', { n: misses }), 'bad');
                }, 620);
            }, 170);
        }
    } else if (phase === 'bonus') {
        if (t.state === 'gone' || t.picked) return;
        if (firstPick < 0) {
            firstPick = +el.dataset.i;
            t.picked = true;
            t.el.classList.add('peek');
            CardSfx.pick();
            return;
        }
        const x = tiles[firstPick], y = t;
        firstPick = -1;
        x.picked = false; x.el.classList.remove('peek');
        if (x === y) return;
        if (x.pair !== y.pair && sameAnswer(x, y)) relinkSameAnswer(x, y);
        if (x.pair === y.pair) {
            CardSfx.bonusMatch(bonusPairs);
            x.el.classList.add('hit'); y.el.classList.add('hit');
            window.setTimeout(() => {
                x.el.classList.add('gone'); y.el.classList.add('gone');
                x.state = y.state = 'gone';
            }, 260);
            bonusPairs++;
            updateStats();
            const cleared = tiles.filter(t2 => t2.state === 'gone').length / 2;
            say(window.tf('game.mem.bonusPair', { n: bonusPairs }), 'good');
            if (cleared >= BONUS_PAIRS) window.setTimeout(endBonus, 320);
        } else {
            misses++; updateStats(); CardSfx.miss();
            y.el.classList.add('miss');
            window.setTimeout(() => y.el.classList.remove('miss'), 300);
        }
    }
}

// ---------------------------------------------------------------------------
// The bonus round
// ---------------------------------------------------------------------------
// Four of the six pairs just cleared, face up, in two zig-zag columns against a four-second
// clock. It is a recall sprint over the hand you have only this second finished, which is why
// it reuses those words rather than introducing new ones: a level holds 25 words and four hands
// already spend 24 of them, so there is no spare vocabulary to draw a bonus from — and testing
// what was just learned is the better round anyway.
function finishHand() {
    phase = 'between';
    document.getElementById('hint-btn').disabled = true;
    say(window.tf('game.mem.handCleared', { n: BONUS_PAIRS }), 'win');
    window.setTimeout(startBonus, 900);
}

function startBonus() {
    phase = 'bonus';
    firstPick = -1;
    boardBusy = false;
    dealBonus();
    tiles.forEach(t => { t.picked = false; });
    document.getElementById('bonus-head').hidden = false;
    document.getElementById('bonus-timer').hidden = false;
    const fill = document.getElementById('bonus-fill');
    fill.classList.remove('run');
    fill.style.width = '100%';
    void fill.offsetWidth;        // force a reflow so the transition starts from 100%
    fill.classList.add('run');
    fill.style.width = '0%';
    CardSfx.shuffle();
    say(window.t('game.mem.bonusGo'));
    bonusTimer = window.setTimeout(endBonus, BONUS_MS);
}

// Japanese down one zig-zag, Mongolian down the other, each shuffled on its own. Every other
// tile steps half a width across, which is the same interlock the main field uses, so the four
// read as one folded chain of hexagons rather than four loose counters.
function dealBonus() {
    const board = boardEl();
    clearBoard();

    const pool = shuffleArray(handWords.slice()).slice(0, BONUS_PAIRS);
    const jp = pool.map((w, i) => ({ pair: i, side: 'jp', word: w }));
    const mn = pool.map((w, i) => ({ pair: i, side: 'mn', word: w }));
    shuffleArray(jp);
    // Shuffling the two columns independently is not quite enough: chance can still stand a
    // word beside its own translation, which hands the round away. Reshuffle until no row is
    // a pair.
    for (let guard = 0; guard < 60; guard++) {
        shuffleArray(mn);
        if (!mn.some((c, i) => c.pair === jp[i].pair)) break;
    }

    const rows = pool.length;
    const tw = 18, th = tw * 1.1547, vStep = th * 0.76;
    const headH = th * 0.34;
    const totalH = headH + (rows - 1) * vStep + th;
    board.style.aspectRatio = `100 / ${totalH.toFixed(2)}`;
    // Each zig-zag is 1.5 tiles wide: 22 + 27 + 2 + 27 + 22 is the whole width, so the two
    // chains sit with equal margins.
    const colW = tw * 1.5, colX = [22, 51];

    tiles = [];
    [jp, mn].forEach((col, ci) => {
        const head = document.createElement('span');
        head.className = 'mem-colhead';
        head.style.left = colX[ci] + '%';
        head.style.width = colW + '%';
        head.style.height = (headH / totalH * 100).toFixed(3) + '%';
        head.textContent = ci === 0 ? '日本語' : window.t('game.mem.meaning');
        board.appendChild(head);

        col.forEach((c, ri) => {
            const x = colX[ci] + (ri % 2 ? tw / 2 : 0);
            const y = headH + ri * vStep;
            const el = document.createElement('button');
            el.type = 'button';
            el.className = 'mem-tile up bonus';
            el.dataset.i = String(tiles.length);
            el.style.left = x + '%';
            el.style.top = (y / totalH * 100).toFixed(3) + '%';
            el.style.width = tw + '%';
            el.style.height = (th / totalH * 100).toFixed(3) + '%';
            el.style.animationDelay =
                `${(ci * 0.25 + ri * 0.17).toFixed(2)}s, ${(ci * 0.31 + ri * 0.13).toFixed(2)}s`;
            board.appendChild(el);

            const t = { el, pair: c.pair, side: c.side, word: c.word, state: 'up', cw: tw };
            tiles.push(t);
            faceTile(el, t);
            el.setAttribute('aria-label', labelFor(t));

            // The halo, exactly on the tile's own box so the ring that swells out of it is the
            // same hexagon. Appended after the tile and painted below it (see .mem-halo).
            const halo = document.createElement('b');
            halo.className = 'mem-halo';
            halo.style.left = x + '%';
            halo.style.top = (y / totalH * 100).toFixed(3) + '%';
            halo.style.width = tw + '%';
            halo.style.height = (th / totalH * 100).toFixed(3) + '%';
            halo.style.animationDelay = (ci * 0.4 + ri * 0.23).toFixed(2) + 's';
            board.appendChild(halo);

            // Six sparks over a box half again the tile's size, so they land on the ground as
            // well as the lacquer, at mixed sizes because identical ones read as a pattern.
            const sp = document.createElement('span');
            sp.className = 'mem-sparks';
            sp.style.left = (x - tw * 0.22) + '%';
            sp.style.top = ((y - th * 0.2) / totalH * 100).toFixed(3) + '%';
            sp.style.width = (tw * 1.44) + '%';
            sp.style.height = (th * 1.4 / totalH * 100).toFixed(3) + '%';
            for (let k = 0; k < 6; k++) {
                const dot = document.createElement('i');
                const size = (9 + Math.random() * 7).toFixed(1);
                dot.style.width = size + 'px';
                dot.style.height = size + 'px';
                dot.style.left = (Math.random() * 92).toFixed(0) + '%';
                dot.style.top = (Math.random() * 90).toFixed(0) + '%';
                dot.style.animationDelay = (Math.random() * 1.5).toFixed(2) + 's';
                sp.appendChild(dot);
            }
            board.appendChild(sp);
        });
    });
}

function endBonus() {
    if (phase !== 'bonus') return;
    window.clearTimeout(bonusTimer);
    tiles.forEach(t => {
        if (t.state !== 'gone') { t.el.classList.add('gone'); t.state = 'gone'; }
    });
    Array.prototype.slice.call(boardEl().querySelectorAll('.mem-sparks, .mem-halo'))
        .forEach(el => el.remove());
    document.getElementById('bonus-timer').hidden = true;

    if (handIndex + 1 < HANDS_PER_LEVEL && (handIndex + 1) * MAIN_PAIRS < levelDeck.length) {
        phase = 'between';
        handIndex++;
        const c = centerOf(boardEl());
        floatText(c.x, c.y, window.tf('game.mem.handN',
            { n: handIndex + 1, total: HANDS_PER_LEVEL }), true);
        window.setTimeout(dealHand, 1100);
    } else {
        phase = 'done';
        finishLevel();
    }
}

// ---------------------------------------------------------------------------
// Hint
// ---------------------------------------------------------------------------
function useHint() {
    if (phase !== 'play' || boardBusy) return;
    const hidden = tiles.filter(t => t.state === 'down');
    if (hidden.length < 2) return;
    shuffleArray(hidden);
    const pick = hidden.slice(0, 2);
    clicks += HINT_COST;
    hints++;
    updateStats();
    CardSfx.hint();
    boardBusy = true;
    pick.forEach(t => turn(t, 'up', () => t.el.classList.add('peek')));
    say(window.tf('game.mem.hintSpent', { n: HINT_COST }), 'bad');
    window.setTimeout(() => {
        pick.forEach(t => {
            t.el.classList.remove('peek');
            if (t.state !== 'gone') turn(t, 'down');
        });
        boardBusy = false;
    }, 1300);
}

// ---------------------------------------------------------------------------
// The side rail
// ---------------------------------------------------------------------------
function updateStats() {
    document.getElementById('st-clicks').textContent = clicks;
    document.getElementById('st-pairs').textContent =
        `${pairsThisHand}/${handWords.length || MAIN_PAIRS}`;
    document.getElementById('st-miss').textContent = misses;
    document.getElementById('st-bonus').textContent = bonusPairs;

    renderHandTrack();
}

// Numbered steps, not anonymous dots: a cleared hand shows a tick, the one being played is gold
// and a size larger, and the ones to come carry their own number so the shape of the level is
// visible before any of it is done.
function renderHandTrack() {
    const steps = document.getElementById('hand-dots');
    steps.innerHTML = '';
    for (let i = 0; i < HANDS_PER_LEVEL; i++) {
        const li = document.createElement('li');
        li.className = 'hand-step' + (i < handIndex ? ' done' : i === handIndex ? ' now' : '');
        li.textContent = i < handIndex ? '✓' : String(i + 1);
        li.setAttribute('aria-label', window.tf('game.mem.handN',
            { n: i + 1, total: HANDS_PER_LEVEL }));
        steps.appendChild(li);
    }
    // How far the pine rule runs: centre of the first step to centre of the current one.
    steps.style.setProperty('--hand-progress',
        String(handIndex / Math.max(1, HANDS_PER_LEVEL - 1)));
    document.getElementById('hand-count').textContent =
        `${Math.min(handIndex + 1, HANDS_PER_LEVEL)} / ${HANDS_PER_LEVEL}`;
}

// The preview line names the hand, because this is the moment a player is deciding what they
// are looking at. It is built here rather than carrying data-i18n, since i18n.js would write
// the static string back over it on a language switch.
function renderPreviewHint() {
    document.getElementById('preview-hint').textContent = window.tf('game.previewHandHint',
        { n: handIndex + 1, total: HANDS_PER_LEVEL, cards: MAIN_PAIRS * 2 });
}

function say(text, cls) {
    const el = document.getElementById('board-say');
    el.className = 'say' + (cls ? ' ' + cls : '');
    el.textContent = text;
}

// The pair just matched, with its example sentence — the one place a matched word gets to teach
// something beyond "those two went together".
function showLastPair(w) {
    const box = document.getElementById('last-pair');
    box.hidden = false;
    document.getElementById('lp-jp').textContent = w.jp;
    document.getElementById('lp-read').textContent = w.reading;
    document.getElementById('lp-mn').textContent = wordFront(w);
    const ex = document.getElementById('lp-ex');
    if (w.example && (w.example.furigana || w.example.jp)) {
        // The furigana field is site-generated ruby markup, not user input.
        ex.innerHTML = w.example.furigana || escapeHtml(w.example.jp);
        ex.hidden = false;
    } else {
        ex.hidden = true;
    }
}

function resetLastPair() {
    document.getElementById('last-pair').hidden = true;
}

// Words this learner got wrong, for the dashboard's review run. word-stats.js owns the table;
// this only reports, and only when it is actually loaded and the learner is signed in.
function recordMiss(w, confusedWith) {
    if (window.recordWordAttempt) {
        window.recordWordAttempt({
            word: w.jp, correct: false, source: 'game',
            confusedWith: confusedWith ? confusedWith.jp : null,
        });
    }
}

function recordHit(w) {
    if (window.recordWordAttempt) {
        window.recordWordAttempt({ word: w.jp, correct: true, source: 'game' });
    }
}
