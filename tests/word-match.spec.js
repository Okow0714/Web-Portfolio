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
    await page.locator('button', { hasText: /Start Match|Тоглоом эхлүүлэх/ }).click();
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
    const b = await page.evaluate(x => tiles.find(t => t.kind === 'jp' && !t.cleared && t.pairId !== x).pairId, a);
    await clickTile(page, a, 'jp');
    await page.waitForTimeout(150);
    await clickTile(page, b, 'en');
    await page.waitForTimeout(300); // onTileClick's own resolveSelection() delay is 200ms
    const midMismatch = await page.evaluate(() => document.querySelectorAll('.tile.mismatch').length);
    assert.strictEqual(midMismatch, 2, 'a genuine mismatch should flag exactly the 2 clicked tiles');
    await page.waitForTimeout(600);
    const afterMismatch = await page.evaluate(() => streak);
    assert.strictEqual(afterMismatch, 0, 'a mismatch should reset the streak to 0');
};
