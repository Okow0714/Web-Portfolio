// Word Match, the memory board: the gate opens a tier, a hand deals face up and turns over, a
// wrong guess costs a miss, a cleared hand opens the bonus, and a perfect level lands exactly on
// its derived click count.
//
// Three of these assertions pin bugs that were real on the day the board was rebuilt, and each
// of them is the kind that looks fine in a screenshot:
//   * the chosen tier node stayed on screen over its own levels, because `display: flex`
//     outranks the UA stylesheet's [hidden];
//   * a face-down tile kept the aria-label naming its word, handing the whole board to anyone
//     playing with a screen reader;
//   * the board photograph sat at full opacity, because `opacity: light-dark(a, b)` is invalid
//     — light-dark() is a <color> function — so the declaration dropped and opacity fell back
//     to 1.
//
// The board is driven through `tiles`, the top-level `let` in game-core.js: these are classic
// scripts sharing one global scope, so every binding is reachable by name from page.evaluate.
// Reading the pairs that way is not cheating the test — it is the only way to play a memory
// game deterministically, and it is exactly what a player does with their eyes during the
// preview phase, when every tile is face up.

async function dismissTour(page) {
    for (let i = 0; i < 3; i++) {
        const skip = page.locator('.tut-skip, [data-tour-skip], .tutorial-skip').first();
        if (await skip.count() && await skip.isVisible().catch(() => false)) {
            await skip.click();
            await page.waitForTimeout(200);
            continue;
        }
        // The coach mark's buttons carry no stable hook in every build, so fall back to text.
        const byText = page.locator('button', { hasText: /^(Алгасах|Skip)$/ }).first();
        if (await byText.count() && await byText.isVisible().catch(() => false)) {
            await byText.click();
            await page.waitForTimeout(200);
        } else {
            break;
        }
    }
}

// Clear the hand on the board in the fewest possible clicks: two per pair.
async function playHandPerfectly(page) {
    await page.evaluate(async () => {
        const wait = ms => new Promise(r => setTimeout(r, ms));
        const byPair = {};
        tiles.forEach((t, i) => { (byPair[t.pair] = byPair[t.pair] || []).push(i); });
        for (const [a, b] of Object.values(byPair)) {
            tiles[a].el.click(); await wait(200);
            tiles[b].el.click(); await wait(640);
        }
    });
}

module.exports = async function (page, assert, baseUrl) {
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));

    // ---------------------------------------------------------------- gate
    await page.goto(baseUrl + '/game.html', { waitUntil: 'networkidle' });
    await dismissTour(page);

    const tierCount = await page.locator('#gate-tiers .hexnode').count();
    assert.strictEqual(tierCount, 5, 'the gate should show five JLPT tier nodes');

    await page.locator('.hexnode[data-tier="N5"]').click();
    // The chosen node travels and swells for 920ms before the field is built; waiting less than
    // that races the gate and reads the dial while it is still on screen.
    await page.waitForTimeout(1500);

    const dialDisplay = await page.evaluate(
        () => getComputedStyle(document.getElementById('gate-tiers')).display);
    assert.strictEqual(dialDisplay, 'none',
        'the tier dial must answer [hidden] — a display rule outranks the UA stylesheet');

    const levelCount = await page.locator('#gate-field .hexnode').count();
    assert.strictEqual(levelCount, 12, 'a tier should burst into twelve level nodes');

    // ---------------------------------------------------------------- a hand
    await page.locator('#gate-field .hexnode').first().click();
    await page.waitForTimeout(400);
    await dismissTour(page);

    assert.strictEqual(await page.locator('#mem-board .mem-tile').count(), 12,
        'a hand is six pairs, so twelve tiles');
    assert.ok(await page.locator('#mem-preview').isVisible(),
        'the twelve tiles stay face up until Start is pressed');

    const faceUpLabel = await page.locator('#mem-board .mem-tile').first().getAttribute('aria-label');
    assert.ok(faceUpLabel && faceUpLabel.length > 1, 'a face-up tile names its word');

    await page.locator('#mem-start-btn').click();
    await page.waitForTimeout(1000);

    const leaked = await page.evaluate(() => {
        const hidden = window.t('game.mem.faceDown');
        return tiles.filter(t => t.el.getAttribute('aria-label') !== hidden).length;
    });
    assert.strictEqual(leaked, 0,
        'a face-down tile must not announce its word to a screen reader');
    assert.strictEqual(await page.locator('#mem-board .mem-tile.down').count(), 12,
        'every tile turns over when the hand starts');

    // ---------------------------------------------------------------- a miss
    const missed = await page.evaluate(async () => {
        const wait = ms => new Promise(r => setTimeout(r, ms));
        const a = 0;
        const b = tiles.findIndex(t => t.pair !== tiles[a].pair);
        tiles[a].el.click(); await wait(230);
        tiles[b].el.click(); await wait(1500);
        return {
            misses: +document.getElementById('st-miss').textContent,
            clicks: +document.getElementById('st-clicks').textContent,
            bothBack: tiles[a].state === 'down' && tiles[b].state === 'down',
        };
    });
    assert.strictEqual(missed.misses, 1, 'a wrong guess counts one miss, not two');
    assert.strictEqual(missed.clicks, 2, 'both tiles of a wrong guess still cost a click each');
    assert.ok(missed.bothBack, 'a wrong guess turns both tiles back over');

    // ---------------------------------------------------------------- the bonus
    await playHandPerfectly(page);
    await page.waitForTimeout(1400);

    const bonus = await page.evaluate(() => {
        window.clearTimeout(bonusTimer);      // hold the four seconds open to look at the round
        const jp = tiles.filter(t => t.side === 'jp');
        const mn = tiles.filter(t => t.side === 'mn');
        const lined = jp.some((t, i) => mn[i] && mn[i].pair === t.pair);
        return {
            phase,
            tiles: tiles.length,
            columns: new Set(tiles.map(t => parseFloat(t.el.style.left) < 40 ? 'L' : 'R')).size,
            jpAllLeft: jp.every(t => parseFloat(t.el.style.left) < 40),
            mnAllRight: mn.every(t => parseFloat(t.el.style.left) >= 40),
            lined,
            halos: document.querySelectorAll('#mem-board .mem-halo').length,
            sparks: document.querySelectorAll('#mem-board .mem-sparks i').length,
        };
    });
    assert.strictEqual(bonus.phase, 'bonus', 'clearing a hand opens the bonus round');
    assert.strictEqual(bonus.tiles, 8, 'the bonus deals four pairs');
    assert.strictEqual(bonus.columns, 2, 'the bonus is laid out in two columns');
    assert.ok(bonus.jpAllLeft && bonus.mnAllRight, 'Japanese left, meanings right');
    assert.ok(!bonus.lined, 'no bonus row may hold a word beside its own translation');
    assert.strictEqual(bonus.halos, 8, 'every bonus tile radiates a halo');
    assert.ok(bonus.sparks >= 24, `bonus sparks were ${bonus.sparks}`);

    // Every tile must carry real type. A board dealt into a hidden section measures zero wide,
    // and every label comes out 0px -- twelve blank hexagons that look like a rendering failure.
    const fonts = await page.evaluate(() => tiles.map(t => parseFloat(t.el.style.fontSize) || 0));
    assert.ok(Math.min(...fonts) > 6, `smallest tile font was ${Math.min(...fonts)}px`);

    // The rail belongs beside the board, not pinned to the far edge of a wide column.
    const railGap = await page.evaluate(() => {
        const b = document.getElementById('mem-board').getBoundingClientRect();
        const s = document.querySelector('.board-side').getBoundingClientRect();
        return Math.round(s.left - b.right);
    });
    assert.ok(railGap >= 0 && railGap < 80, `board-to-rail gap was ${railGap}px`);

    // Four hands to a level is the thing a player has to understand on arrival, and the only
    // place that says so is this track. It has to be ABOVE the board -- in the toolbar's corner
    // it read as decoration -- and its connecting rule has to be on the list, since a step is
    // clipped to a hexagon and a clip-path takes the element's own ::before with it.
    const track = await page.evaluate(() => {
        const t = document.querySelector('.hand-track');
        const steps = [...document.querySelectorAll('#hand-dots .hand-step')];
        const board = document.getElementById('mem-board').getBoundingClientRect();
        return {
            steps: steps.length,
            now: steps.filter(s => s.classList.contains('now')).length,
            aboveBoard: t.getBoundingClientRect().bottom <= board.top,
            count: document.getElementById('hand-count').textContent.replace(/\s/g, ''),
            preview: document.getElementById('preview-hint').textContent,
        };
    });
    assert.strictEqual(track.steps, 4, 'the hand track shows one step per hand');
    assert.strictEqual(track.now, 1, 'exactly one hand is marked current');
    assert.ok(track.aboveBoard, 'the hand track sits above the board it describes');
    assert.strictEqual(track.count, '1/4', `hand count read "${track.count}"`);
    assert.ok(/4/.test(track.preview),
        `the preview line should name the hand out of four, got "${track.preview}"`);

    // ---------------------------------------------------------------- a whole level
    // The photo sits behind everything on the board, so a dropped opacity declaration is a
    // full-strength photograph under every tile. Checked here rather than by eye.
    const photoOpacity = await page.evaluate(
        () => parseFloat(getComputedStyle(document.querySelector('.game-main'), '::before').opacity));
    assert.ok(photoOpacity > 0 && photoOpacity < 0.25,
        `the board photo should be a wash, not a picture — opacity was ${photoOpacity}`);

    await page.goto(baseUrl + '/game.html?level=1', { waitUntil: 'networkidle' });
    await dismissTour(page);

    const perfect = await page.evaluate(() => MAIN_PAIRS * HANDS_PER_LEVEL * 2);
    for (let hand = 0; hand < 4; hand++) {
        await dismissTour(page);
        await page.locator('#mem-start-btn').click();
        await page.waitForTimeout(950);
        await playHandPerfectly(page);
        await page.waitForTimeout(1300);
        await page.evaluate(() => { endBonus(); });   // skip the four seconds, not the round
        await page.waitForTimeout(1300);
    }

    const done = await page.evaluate(() => ({
        popup: !document.getElementById('result-modal').classList.contains('hidden'),
        clicks: +document.getElementById('pop-clicks').textContent,
        misses: +document.getElementById('pop-misses').textContent,
        grade: document.getElementById('pop-grade').textContent,
        seal: document.getElementById('pop-seal').textContent,
    }));
    assert.ok(done.popup, 'finishing the fourth hand opens the level-complete pop-up');
    assert.strictEqual(done.clicks, perfect,
        `perfect play is ${perfect} clicks, got ${done.clicks}`);
    assert.strictEqual(done.misses, 0, 'perfect play records no misses');
    assert.strictEqual(done.seal, '皆', 'a flawless level gets the 皆 seal');
    assert.ok(done.grade.length > 0, 'the pop-up names a grade');

    assert.strictEqual(errs.length, 0, `page errors: ${JSON.stringify(errs)}`);
};
