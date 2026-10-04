// The Word Match mechanics that word-match.spec.js does not reach: the lightning chain, the
// mismatch penalty, and the reserve refill.
//
// These are characterization tests -- they pin what the code does TODAY, not what anyone decided
// it should do. That is the point. game-core.js holds 40 mutable bindings and five files write to
// them; 37 of those are written from a file other than the one that declares them. Any attempt to
// give that state a real owner has to prove it changed nothing, and right now there is nothing to
// prove it against for these three paths.
//
// They drive the functions directly through page.evaluate rather than through the UI. These are
// classic scripts sharing one scope, so every one of them is reachable by name -- which is the one
// genuine convenience of the architecture being criticised, and it is what makes pinning its
// behaviour cheap before changing it.
const assertLib = require('assert');

module.exports = async function run(page, assert, baseUrl) {
    await page.goto(baseUrl + '/game.html', { waitUntil: 'networkidle' });
    await page.locator('.level-card').first().click();
    await page.waitForTimeout(400);
    await page.locator('button', { hasText: /Start Match|Дасгал эхлүүлэх/ }).click();
    await page.waitForTimeout(700);

    // ------------------------------------------------------------------ lightning chain
    // handleLightningChain(phonetic) clears every uncleared pair on the board sharing that
    // phonetic -- but only when at least two qualify. With fewer it must fall through to
    // handleMismatch, which is the branch that stops a single-member "family" counting as a find.
    const chain = await page.evaluate(() => {
        // group the board's uncleared pairs by phonetic
        const byPhonetic = {};
        currentSet.forEach((p, pairId) => {
            const pt = tilesByPairId[pairId];
            if (!p.phonetic || !pt || !pt.jp || pt.jp.cleared) return;
            (byPhonetic[p.phonetic] = byPhonetic[p.phonetic] || []).push(pairId);
        });
        const shared = Object.keys(byPhonetic).filter(k => byPhonetic[k].length >= 2);
        const single = Object.keys(byPhonetic).filter(k => byPhonetic[k].length === 1);
        return {
            sharedPhonetic: shared[0] || null,
            sharedCount: shared.length ? byPhonetic[shared[0]].length : 0,
            singlePhonetic: single[0] || null,
            matchedBefore: matchedCount,
        };
    });

    if (chain.sharedPhonetic) {
        // The clear is DEFERRED: handleLightningChain fires the lightning animation and only then,
        // inside a setTimeout, marks the tiles cleared and adds to matchedCount. Reading the count
        // straight after the call sees zero -- which is how this test first failed, asserting
        // 0 !== 4 against code that was working correctly. Trigger, then wait for the count to
        // settle rather than guessing a delay.
        const start = await page.evaluate(ph => {
            const members = [];
            currentSet.forEach((p, pairId) => {
                const pt = tilesByPairId[pairId];
                if (p.phonetic === ph && pt && pt.jp && !pt.jp.cleared) members.push(pairId);
            });
            const before = matchedCount;
            // the chain is entered holding a selection, exactly as onTileClick leaves it
            selected = [tilesByPairId[members[0]].jp, tilesByPairId[members[0]].en];
            handleLightningChain(ph);
            return { before, members: members.length };
        }, chain.sharedPhonetic);

        await page.waitForFunction(
            ([before, n]) => matchedCount >= before + n,
            [start.before, start.members],
            { timeout: 6000 }
        ).catch(() => { });

        const after = await page.evaluate(() => ({ matched: matchedCount, families: familiesFound.size }));

        assert.strictEqual(after.matched - start.before, start.members,
            `a chain on a phonetic shared by ${start.members} board pairs should clear all of them`);
        assert.ok(after.families > 0, 'a confirmed chain should be recorded in familiesFound');
        console.log(`      chain cleared ${start.members} pairs sharing one phonetic`);
    } else {
        console.log('      (no phonetic shared by 2+ pairs on this board — chain path not exercised)');
    }

    // The negative branch: a phonetic with fewer than two board members must NOT be recorded as a
    // family, and must not clear anything.
    if (chain.singlePhonetic) {
        const neg = await page.evaluate(ph => {
            const members = [];
            currentSet.forEach((p, pairId) => {
                const pt = tilesByPairId[pairId];
                if (p.phonetic === ph && pt && pt.jp && !pt.jp.cleared) members.push(pairId);
            });
            const familiesBefore = familiesFound.size;
            const matchedBefore = matchedCount;
            selected = [tilesByPairId[members[0]].jp, tilesByPairId[members[0]].en];
            handleLightningChain(ph);
            return { familiesBefore, familiesAfter: familiesFound.size, matchedBefore, matchedAfter: matchedCount };
        }, chain.singlePhonetic);

        assert.strictEqual(neg.familiesAfter, neg.familiesBefore,
            'a phonetic with only one board member must not be recorded as a family found');
        assert.strictEqual(neg.matchedAfter, neg.matchedBefore,
            'a one-member phonetic must not clear pairs — it is a mismatch, not a chain');
    }

    // ------------------------------------------------------------------ penalty
    // applyPenalty returns one already-cleared pair to the board and decrements matchedCount. The
    // comment in game-core.js notes this can push the board past VISIBLE_TARGET, and that the
    // resulting partial last row is accepted rather than avoided -- so the test asserts the count
    // moves, not that the board stays a particular size.
    const penalty = await page.evaluate(() => {
        const clearedPairs = Object.keys(tilesByPairId).map(Number).filter(id => {
            const pt = tilesByPairId[id];
            return pt.jp && pt.jp.cleared && pt.en && pt.en.cleared;
        });
        if (!clearedPairs.length) return { skipped: true };
        const before = matchedCount;
        const tilesBefore = tiles.filter(t => !t.cleared).length;
        applyPenalty();
        return {
            skipped: false, before, after: matchedCount,
            tilesBefore, tilesAfter: tiles.filter(t => !t.cleared).length,
        };
    });

    if (penalty.skipped) {
        console.log('      (no cleared pair to return — penalty path not exercised)');
    } else {
        assert.strictEqual(penalty.after, penalty.before - 1,
            'a penalty should decrement matchedCount by exactly one');
        assert.strictEqual(penalty.tilesAfter, penalty.tilesBefore + 2,
            'the returned pair should put both of its tiles back in play');
    }

    // ------------------------------------------------------------------ reserve refill
    // Only VISIBLE_TARGET pairs are dealt at once; the rest wait in reserveQueue and arrive in
    // batches as gaps open. maybeRefill once looped forever when the queue ran dry, so the thing
    // worth pinning is that it terminates and never deals more than the reserve holds.
    const refill = await page.evaluate(() => {
        const queueBefore = reserveQueue.length;
        const visibleBefore = tiles.filter(t => !t.cleared).length;
        // clear enough pairs to open a batch's worth of gaps
        let cleared = 0;
        for (const t of tiles) {
            if (cleared >= REFILL_BATCH) break;
            if (t.kind !== 'jp' || t.cleared) continue;
            const pt = tilesByPairId[t.pairId];
            if (!pt.en || pt.en.cleared) continue;
            pt.jp.cleared = true; pt.en.cleared = true;
            cleared++;
        }
        const started = Date.now();
        maybeRefill();
        return {
            tookMs: Date.now() - started,
            queueBefore, queueAfter: reserveQueue.length,
            visibleBefore, cleared,
            visibleAfter: tiles.filter(t => !t.cleared).length,
        };
    });

    assert.ok(refill.tookMs < 2000,
        `maybeRefill should terminate promptly; took ${refill.tookMs}ms (it once looped forever on an empty reserve)`);
    assert.ok(refill.queueAfter <= refill.queueBefore,
        'refilling must only ever take from the reserve, never add to it');
    console.log(`      refill: reserve ${refill.queueBefore} -> ${refill.queueAfter}, ` +
        `${refill.cleared} pairs cleared, ${refill.visibleAfter} tiles in play`);
};
