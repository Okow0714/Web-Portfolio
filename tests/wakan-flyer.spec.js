// The Wakan winged-tile bonus event -- catch it on the cursor, drop it on its kango/wago
// partner, confirm the blast actually clears tiles and doesn't leave the cursor-offset or
// board-lock races this project hit twice in real development (see game.js's history on the
// flyer subsystem). Forces the event via matchedCount rather than playing to the real 50%
// threshold, to keep this test fast.
module.exports = async function run(page, assert, baseUrl) {
    // The flyer's flight is a 7-second JS tween across the board (~200px a second), and a click
    // has to be aimed from Node: sample the position, round-trip, move, press. On a loaded CI
    // runner that gap can outlast the tile, which is what made this spec fail on unchanged code
    // -- twice on 2026-09-17 alone. Reduced motion is a real setting the game already honours by
    // parking the flyer instead of flying it (see spawnFlyer), so asking for it removes the race
    // rather than papering over it, and leaves the part this spec exists for -- the catch, the
    // cursor offset, the drop and the board lock -- exercised exactly as before.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(baseUrl + '/game.html', { waitUntil: 'networkidle' });
    await page.locator('.level-card').nth(1).click();
    await page.waitForTimeout(400);
    await page.locator('button', { hasText: /Start Match|Дасгал эхлүүлэх/ }).click();
    await page.waitForTimeout(700);

    // A level deals a random one of its word sets, and the flyer can only appear if the dealt words
    // include one with a Kango/Wago partner -- so on some deals there is no candidate and no flyer
    // is armed. That made this spec fail roughly one CI run in ten on code that was fine (confirmed
    // by re-running an unchanged commit: 4/5, then 5/5). Re-deal until the board can actually host
    // the event, then force it.
    const dealt = await page.evaluate(async () => {
        const hasCandidate = () => {
            const map = buildWakanMap();
            return tiles.some(t => t.kind === 'jp' && !t.cleared && map.has(t.text));
        };
        for (let tries = 0; tries < 25; tries++) {
            if (hasCandidate()) return tries;
            startLevel(currentLevel);            // re-picks one of the level's sets at random
            await new Promise(r => setTimeout(r, 60));
        }
        return -1;
    });
    assert.ok(dealt >= 0, 'no deal in 25 tries contained a word with a Kango/Wago partner');

    await page.evaluate(() => { matchedCount = 13; maybeArmFlyer(); });
    await page.waitForTimeout(2500);
    const flyBox = await page.locator('.flyer').boundingBox();
    assert.ok(flyBox, 'flyer element should be visible on screen');

    // The flyer is animating, so a position sampled now is stale by the time the click lands --
    // a few pixels on a fast machine, enough to miss entirely on a slow CI runner. That was this
    // spec's long-running intermittent failure (it failed twice on a tree differing from a passing
    // one only in sw.js's version string). Re-read where it IS immediately before each click, and
    // give it a few attempts.
    let caught = false;
    for (let attempt = 0; attempt < 8 && !caught; attempt++) {
        const at = await page.evaluate(() => {
            const el = document.querySelector('.flyer');
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
        });
        assert.ok(at, 'flyer element should still be on screen while trying to catch it');
        await page.mouse.move(at.x, at.y);
        await page.mouse.down();
        await page.mouse.up();
        await page.waitForTimeout(120);
        caught = await page.evaluate(() => flyerHeld);
    }
    // This has failed intermittently for a long time, and each explanation so far has only
    // narrowed it: parking the flyer with reduced motion took out the moving-target race (it now
    // catches 5 times out of 5 in isolation) and the runner already answers the tour's localStorage
    // so no coach mark is over the board. Something still eats the click occasionally, so when it
    // does, say what -- an assertion that only reports false is an assertion that has to be
    // reproduced by hand.
    if (!caught) {
        const blame = await page.evaluate(() => {
            const el = document.querySelector('.flyer');
            if (!el) return 'the flyer is gone from the DOM';
            const r = el.getBoundingClientRect();
            const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
            return 'flyer at ' + [r.x, r.y, r.width, r.height].map(Math.round).join(',') +
                '; centre hits ' + (hit ? (hit.className || hit.tagName) : 'nothing') +
                '; held=' + flyerHeld + ' locked=' + locked + ' el===flyerEl=' + (flyerEl === el);
        });
        assert.fail('clicking the flyer should catch it (flyerHeld=true) -- ' + blame);
    }

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
