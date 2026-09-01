// The Wakan winged-tile bonus event -- catch it on the cursor, drop it on its kango/wago
// partner, confirm the blast actually clears tiles and doesn't leave the cursor-offset or
// board-lock races this project hit twice in real development (see game.js's history on the
// flyer subsystem). Forces the event via matchedCount rather than playing to the real 50%
// threshold, to keep this test fast.
module.exports = async function run(page, assert, baseUrl) {
    await page.goto(baseUrl + '/game.html', { waitUntil: 'networkidle' });
    await page.locator('.level-card').nth(1).click();
    await page.waitForTimeout(400);
    await page.locator('button', { hasText: /Start Match|Тоглоом эхлүүлэх/ }).click();
    await page.waitForTimeout(700);

    await page.evaluate(() => { matchedCount = 13; maybeArmFlyer(); });
    await page.waitForTimeout(2500);
    const flyBox = await page.locator('.flyer').boundingBox();
    assert.ok(flyBox, 'flyer element should be visible on screen');

    await page.mouse.move(flyBox.x + flyBox.width / 2, flyBox.y + flyBox.height / 2);
    await page.mouse.down();
    await page.mouse.up();
    await page.waitForTimeout(150);
    const caught = await page.evaluate(() => flyerHeld);
    assert.ok(caught, 'clicking the flyer should catch it (flyerHeld=true)');

    // Cursor-follow regression check: move the pointer, confirm the flyer tracks within a few
    // pixels rather than snapping far away (the original bug measured ~975px of drift).
    const targetPairId = await page.evaluate(() => flyerTargetPairId);
    const targetBox = await page.evaluate(pid => {
        const r = tilesByPairId[pid].jp.el.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }, targetPairId);
    await page.mouse.move(targetBox.x, targetBox.y, { steps: 8 });
    await page.waitForTimeout(80);
    const flyerPos = await page.evaluate(() => {
        const r = document.querySelector('.flyer').getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    const drift = Math.hypot(flyerPos.x - targetBox.x, flyerPos.y - targetBox.y);
    assert.ok(drift < 40, `flyer should track the cursor closely, drifted ${drift.toFixed(0)}px`);

    // Drop on the partner tile -- should blast-clear tiles and settle cleanly with no leftover
    // race: locking the board during the pending window is what the second real bug was about.
    const matchedBefore = await page.evaluate(() => matchedCount);
    await page.mouse.down();
    await page.mouse.up();
    const lockedRightAfterDrop = await page.evaluate(() => locked);
    assert.ok(lockedRightAfterDrop, 'board should be locked immediately on drop, before the blast settles');

    await page.waitForTimeout(1200);
    const settled = await page.evaluate(() => ({
        matched: matchedCount,
        locked,
        allClearedFaded: Array.from(document.querySelectorAll('.tile.cleared')).every(el => getComputedStyle(el).opacity === '0'),
    }));
    assert.ok(settled.matched > matchedBefore, 'a successful drop should clear at least the target pair');
    assert.strictEqual(settled.locked, false, 'board should unlock once the blast settles');
    assert.ok(settled.allClearedFaded, 'every tile still attached and marked cleared should have fully faded');
};
