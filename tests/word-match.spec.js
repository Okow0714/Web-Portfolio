// Word Match core loop: board loads at the right size/timer, a real match clears a pair and
// scores, a mismatch triggers the shake/penalty path, and a streak-4 banks a spendable powerup
// charge that the Clear button can actually spend. Doesn't play a full level (slow, and the
// smoke test already covers "loads without erroring") -- just exercises the mechanics that have
// broken in real regressions this project has hit before (see game.js's history).
const assertLib = require('assert');

async function clickTile(page, pairId, kind) {
    const box = await page.evaluate(({ pairId, kind }) => {
        const t = tilesByPairId[pairId][kind];
        const r = t.el.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }, { pairId, kind });
    await page.mouse.move(box.x, box.y);
    await page.mouse.down();
    await page.mouse.up();
}

module.exports = async function run(page, assert, baseUrl) {
    await page.goto(baseUrl + '/game.html', { waitUntil: 'networkidle' });
    await page.locator('.level-card').first().click();
    await page.waitForTimeout(400);
    await page.locator('button', { hasText: /Start Match|Дасгал эхлүүлэх/ }).click();
    await page.waitForTimeout(700);

    const initial = await page.evaluate(() => ({ totalPairs, matchDuration, tileCount: document.querySelectorAll('.tile').length }));
    assert.strictEqual(initial.totalPairs, 20, 'level should put 20 pairs in play');
    assert.strictEqual(initial.matchDuration, 240, 'clock should be a flat 4 minutes');
    assert.strictEqual(initial.tileCount, 20, 'board should show VISIBLE_TARGET=10 pairs (20 tiles) at start');

    // A real match: click a pair's two tiles, confirm matchedCount/score move.
    const pid = await page.evaluate(() => tiles.find(t => t.kind === 'jp' && !t.cleared).pairId);
    await clickTile(page, pid, 'jp');
    await page.waitForTimeout(150);
    await clickTile(page, pid, 'en');
    await page.waitForTimeout(800);
    const afterMatch = await page.evaluate(() => ({ matched: matchedCount, score }));
    assert.strictEqual(afterMatch.matched, 1, 'matching a real pair should increment matchedCount');
    assert.ok(afterMatch.score > 0, 'a match should award score');

    // 4 real matches in a row should bank exactly one powerup charge, and NOT auto-apply it.
    for (let i = 0; i < 3; i++) {
        const p = await page.evaluate(() => tiles.find(t => t.kind === 'jp' && !t.cleared && t.pairId !== flyerTargetPairId).pairId);
        await clickTile(page, p, 'jp');
        await page.waitForTimeout(150);
        await clickTile(page, p, 'en');
        await page.waitForTimeout(950);
    }
    const afterStreak4 = await page.evaluate(() => ({ matched: matchedCount, charges: powerupCharges }));
    assert.strictEqual(afterStreak4.matched, 4, 'should have 4 real matches banked');
    assert.strictEqual(afterStreak4.charges, 1, 'streak of 4 should bank exactly 1 powerup charge, auto-fired nothing');

    // Spending the charge via the Clear button should clear one more pair and consume the charge.
    await page.locator('#powerup-clear-btn').click();
    await page.waitForTimeout(700);
    const afterSpend = await page.evaluate(() => ({ matched: matchedCount, charges: powerupCharges }));
    assert.strictEqual(afterSpend.matched, 5, 'spending the Clear charge should clear one more pair');
    assert.strictEqual(afterSpend.charges, 0, 'charge should be consumed after spending');

    // A mismatch: click two tiles from different pairs, confirm streak resets and the mismatch
    // animation class gets applied (proxy for the shake/penalty path actually running).
    const a = await page.evaluate(() => tiles.find(t => t.kind === 'jp' && !t.cleared).pairId);
    // ...whose meaning tile reads something DIFFERENT: two tiles saying the same thing are a
    // match now, on purpose (see the synonym case below).
    const b = await page.evaluate(x => {
        const mine = tilesByPairId[x].en.text;
        return tiles.find(t => t.kind === 'jp' && !t.cleared && t.pairId !== x
            && tilesByPairId[t.pairId].en.text !== mine).pairId;
    }, a);
    await clickTile(page, a, 'jp');
    await page.waitForTimeout(150);
    await clickTile(page, b, 'en');
    await page.waitForTimeout(300); // onTileClick's own resolveSelection() delay is 200ms
    const midMismatch = await page.evaluate(() => document.querySelectorAll('.tile.mismatch').length);
    assert.strictEqual(midMismatch, 2, 'a genuine mismatch should flag exactly the 2 clicked tiles');
    await page.waitForTimeout(600);
    const afterMismatch = await page.evaluate(() => streak);
    assert.strictEqual(afterMismatch, 0, 'a mismatch should reset the streak to 0');

    // Synonyms: 辞書 and 字引 are both "dictionary", so level 6 puts two identical meaning tiles
    // on the board. Either one is a right answer for either word -- picking the crossed one has
    // to count as a match, and must leave the two tiles behind it as a pair of their own.
    // Built rather than waited for: a random deal shows both twins at once about one time in six.
    await page.goto(baseUrl + '/game.html?level=6', { waitUntil: 'networkidle' });
    await page.locator('button', { hasText: /Start Match|Дасгал эхлүүлэх/ }).click();
    await page.waitForTimeout(700);
    const twins = await page.evaluate(() => {
        const byGloss = {};
        currentSet.forEach((w, i) => { (byGloss[w.en] = byGloss[w.en] || []).push(i); });
        const both = Object.values(byGloss).find(v => v.length > 1);
        if (!both) return null;
        tiles = [];
        tilesByPairId = {};
        dealtCount = 0;
        reserveQueue = [];                    // no refill behind our backs, re-dealing these two
        dealPairs(both.slice(0, 2), false);   // just the two of them, so the click is unambiguous
        return both.slice(0, 2);
    });
    assert.ok(twins, 'level 6 should still hold two words sharing one meaning');
    await clickTile(page, twins[0], 'jp');
    await page.waitForTimeout(150);
    await clickTile(page, twins[1], 'en');    // the OTHER word's meaning tile
    await page.waitForTimeout(900);
    const crossed = await page.evaluate(([i, j]) => ({
        matched: matchedCount,
        clickedGone: tilesByPairId[i].jp.cleared && tilesByPairId[i].en.cleared,
        leftPaired: !tilesByPairId[j].jp.cleared && !tilesByPairId[j].en.cleared
            && tilesByPairId[j].jp.pairId === tilesByPairId[j].en.pairId,
    }), twins);
    assert.strictEqual(crossed.matched, 1, 'either identical meaning tile should count as a match');
    assert.ok(crossed.clickedGone, 'the two tiles actually clicked should be the ones cleared');
    assert.ok(crossed.leftPaired, 'the two left behind should now be a pair themselves');

    // ...and that leftover pair still matches normally.
    await clickTile(page, twins[1], 'jp');
    await page.waitForTimeout(150);
    await clickTile(page, twins[1], 'en');
    await page.waitForTimeout(900);
    const afterLeftover = await page.evaluate(() => matchedCount);
    assert.strictEqual(afterLeftover, 2, 'the re-paired leftovers should match like any other pair');
};
