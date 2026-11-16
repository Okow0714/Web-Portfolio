// Every page loads cleanly (no console errors, no uncaught exceptions) and the shared nav
// resolves consistently. Cheap, broad coverage -- the first thing to fail if a shared file
// (style.css, i18n-strings-shared.js, auth-shared.js...) breaks in a way that affects all pages.
const PAGES = ['index.html', 'game.html', 'phonetics.html', 'reading.html', 'grammar.html', 'dictionary.html', 'dashboard.html', 'about.html', 'privacy.html', 'terms.html'];

module.exports = async function run(page, assert, baseUrl) {
    for (const path of PAGES) {
        const errs = [];
        const onPageError = e => errs.push('pageerror: ' + e.message);
        const onConsole = m => { if (m.type() === 'error') errs.push('console: ' + m.text()); };
        page.on('pageerror', onPageError);
        page.on('console', onConsole);

        await page.goto(baseUrl + '/' + path, { waitUntil: 'networkidle' });
        await page.waitForTimeout(300);

        assert.strictEqual(errs.length, 0, `${path} had console/page errors: ${JSON.stringify(errs)}`);

        // The dictionary has its own tool tab (2026-11-16, replacing the Dictionary menu, inside
        // which it read "Vocabulary"); it reads "Dictionary" / "Толь бичиг" everywhere -- catches
        // a stale or renamed nav label regressing silently.
        const navLabel = await page.locator('.header-nav a[href="dictionary.html"]').first().textContent().catch(() => null);
        if (navLabel !== null) {
            assert.ok(
                navLabel.trim() === 'Dictionary' || navLabel.trim() === 'Толь бичиг',
                `${path} nav Dictionary label was "${navLabel.trim()}"`
            );
        }

        page.off('pageerror', onPageError);
        page.off('console', onConsole);
    }
};
