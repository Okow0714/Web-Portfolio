// Dictionary page: MN<->JP search works and is fast even at thousands of entries, the word
// detail opens in the panel beside the list and the panel is right in all three of its
// states, the Kango<->Wago tab lazy-loads its data on first switch (not eagerly),
// and Word Match's Wakan winged-tile feature still finds kango/wago pairs independently of any
// of this -- the one hard invariant from the dictionary rework: dictionary-data.js itself must
// stay untouched and load-order-independent of the dictionary page.
module.exports = async function run(page, assert, baseUrl) {
    await page.goto(baseUrl + '/dictionary.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const initial = await page.evaluate(() => ({
        mnjpLoaded: typeof MNJP_ENTRIES !== 'undefined' && MNJP_ENTRIES.length > 0,
        wakanNotYetLoaded: typeof DICTIONARY_ENTRIES === 'undefined',
    }));
    assert.ok(initial.mnjpLoaded, 'MNJP_ENTRIES should be loaded and non-empty on page load');
    assert.ok(initial.wakanNotYetLoaded, 'DICTIONARY_ENTRIES should NOT be loaded until the Wakan tab is opened');

    // Exact-match search ranking: 人 should come back as the FIRST result, not buried under
    // compounds like 外国人/殺人 that merely contain it.
    await page.fill('#mnjp-search', '人');
    await page.waitForTimeout(250);
    const firstResult = await page.locator('#mnjp-list .mnjp-side.jp .term').first().textContent();
    assert.ok(firstResult.startsWith('人'), `expected the exact match 人 first, got "${firstResult}"`);

    // The detail panel beside the list, in all three of its states. It replaced the inline
    // expansion on 2026-11-01: the row PICKS a word now, it does not open one underneath
    // itself. Nothing picked yet, so the panel is a prompt, not a word and not blank.
    const atRest = await page.evaluate(() => {
        const d = document.getElementById('mnjp-detail');
        return { hidden: d.hidden, prompt: d.querySelectorAll('.dict-detail-prompt').length,
                 picked: document.querySelectorAll('.mnjp-entry.is-picked').length };
    });
    assert.ok(!atRest.hidden, 'with results on screen the detail panel should be visible');
    assert.strictEqual(atRest.prompt, 1, 'an unpicked panel should carry its prompt');
    assert.strictEqual(atRest.picked, 0, 'nothing should be marked picked before a click');

    await page.locator('#mnjp-list .mnjp-entry-main').first().click();
    await page.waitForTimeout(200);
    const picked = await page.evaluate(() => {
        const d = document.getElementById('mnjp-detail');
        return { tags: d.querySelectorAll('.mnjp-source-tag').length,
                 kanji: d.querySelectorAll('.kj-card').length,
                 meanings: [...d.querySelectorAll('.kj-mean')].map(e => e.textContent.trim()),
                 readings: d.querySelectorAll('.kj-read').length,
                 prompt: d.querySelectorAll('.dict-detail-prompt').length,
                 picked: document.querySelectorAll('.mnjp-entry.is-picked').length,
                 current: document.querySelectorAll('.mnjp-entry-main[aria-current="true"]').length };
    });
    assert.ok(picked.tags > 0, 'a picked word should show at least one source tag');
    assert.strictEqual(picked.prompt, 0, 'the prompt should be replaced by the word');
    assert.strictEqual(picked.picked, 1, 'exactly one row should be marked picked');
    assert.strictEqual(picked.current, 1, 'exactly one row should carry aria-current');
    // 人 is one kanji, and it must come with a meaning -- an empty meaning line is what a
    // missing kanji-index.js looks like, and the panel would still render around it.
    assert.strictEqual(picked.kanji, 1, `人 should break into 1 kanji card, got ${picked.kanji}`);
    assert.ok(picked.meanings[0] && picked.meanings[0].length > 0,
        'the kanji card should carry a meaning, not an empty line');
    assert.ok(picked.readings > 0, 'the kanji card should carry at least one reading line');

    // A search that matches nothing takes the panel away entirely: there is no list for it to
    // be the detail OF, so a prompt there would be pointing at an empty page.
    await page.fill('#mnjp-search', 'zzzzqqqq');
    await page.waitForTimeout(300);
    assert.ok(await page.evaluate(() => document.getElementById('mnjp-detail').hidden),
        'the detail panel should be hidden when the search matches nothing');
    await page.fill('#mnjp-search', '人');
    await page.waitForTimeout(300);

    // Switching to the Kango<->Wago tab triggers the lazy load exactly once.
    await page.click('#dict-tab-wakan');
    await page.waitForTimeout(600);
    const wakanState = await page.evaluate(() => ({
        loaded: typeof DICTIONARY_ENTRIES !== 'undefined',
        cardCount: document.querySelectorAll('#dict-list .dict-entry').length,
        idleShown: !!document.querySelector('#dict-idle:not(.hidden)'),
    }));
    assert.ok(wakanState.loaded, 'DICTIONARY_ENTRIES should be loaded after switching to the Wakan tab');
    // A loaded tab renders NOTHING until it is asked to. This used to assert cardCount > 0 on
    // arrival, which was really a proxy for "the lazy load worked" -- but it also pinned the
    // behaviour of answering a search nobody had performed with every entry in the file. The
    // load is now proved by DICTIONARY_ENTRIES above, and the rendering by the search below.
    assert.strictEqual(wakanState.cardCount, 0,
        `Wakan tab should render no cards before a search or filter, got ${wakanState.cardCount}`);
    assert.ok(wakanState.idleShown, 'Wakan tab should show its prompt instead of a list');

    await page.fill('#dict-search', 'use');
    await page.waitForTimeout(250);
    const searched = await page.evaluate(() => ({
        cardCount: document.querySelectorAll('#dict-list .dict-entry').length,
        idleShown: !!document.querySelector('#dict-idle:not(.hidden)'),
    }));
    assert.ok(searched.cardCount > 0, 'searching the Wakan tab should render cards');
    assert.ok(!searched.idleShown, 'the prompt should go away once there are results');
};
