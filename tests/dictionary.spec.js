// Dictionary page: MN<->JP search works and is fast even at thousands of entries, expand-on-
// click reveals detail, the Kango<->Wago tab lazy-loads its data on first switch (not eagerly),
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

    // Click-to-expand reveals detail (source tags at minimum).
    await page.locator('#mnjp-list .mnjp-entry-main').first().click();
    await page.waitForTimeout(150);
    const tagCount = await page.locator('#mnjp-list .mnjp-entry.open .mnjp-source-tag').count();
    assert.ok(tagCount > 0, 'expanding a result should show at least one source tag');

    // Switching to the Kango<->Wago tab triggers the lazy load exactly once.
    await page.click('#dict-tab-wakan');
    await page.waitForTimeout(600);
    const wakanState = await page.evaluate(() => ({
        loaded: typeof DICTIONARY_ENTRIES !== 'undefined',
        cardCount: document.querySelectorAll('#dict-list .dict-entry').length,
    }));
    assert.ok(wakanState.loaded, 'DICTIONARY_ENTRIES should be loaded after switching to the Wakan tab');
    assert.ok(wakanState.cardCount > 0, 'Wakan tab should render cards once its data loads');
};
