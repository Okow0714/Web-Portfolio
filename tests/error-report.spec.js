// error-report.js: a thrown error and an unhandled rejection both reach the backend, carrying
// enough to debug with and nothing that identifies a person.
//
// Nothing here reaches the real project -- the POST is intercepted. The guard that matters most is
// the last one: the file is only useful if every page actually loads it, and loads it early, and a
// page added later that forgets the tag would otherwise report nothing while everything still
// looks fine. That is the same failure mode as the APP_SHELL omissions in CLAUDE.md.
//
// The spec sets `khanjp-error-report-debug`, because error-report.js deliberately sends nothing
// from localhost -- otherwise every local test run and every `python -m http.server` session would
// file reports from this machine.
module.exports = async function run(page, assert, baseUrl) {
    const bodies = [];
    const headers = [];
    await page.route('**/rest/v1/client_errors*', r => {
        bodies.push(r.request().postDataJSON());
        headers.push(r.request().headers());
        r.fulfill({ status: 201, body: '' });
    });

    // The runner's own addInitScript already shims getItem for tour keys; this one is additive.
    await page.addInitScript(() => {
        try { localStorage.setItem('khanjp-error-report-debug', '1'); } catch (e) { /* blocked */ }
    });

    await page.goto(baseUrl + '/game.html?level=3#anchor', { waitUntil: 'load' });

    // A real synchronous throw, the way a page script fails -- not a hand-made call into the
    // reporter, which would prove only that the reporter can be called.
    await page.evaluate(() => { setTimeout(() => { null.boom(); }, 0); });
    await page.waitForTimeout(700);

    assert.strictEqual(bodies.length, 1, `expected one report, got ${bodies.length}`);
    const b = bodies[0];
    assert.ok(b.message && b.message.length > 5, `report should carry a message, got ${JSON.stringify(b.message)}`);
    assert.ok(b.stack && b.stack.length > 10, 'report should carry a stack');
    assert.strictEqual(b.page, '/game.html?level=3', `page should keep its query, got ${JSON.stringify(b.page)}`);
    assert.ok(!String(b.page).includes('#'), 'the hash must be stripped -- it is the one part a user could type into');
    assert.ok(b.user_agent, 'report should carry a user agent');
    // The privacy claim in privacy.html is that a report cannot be traced to a person. That is only
    // true while nothing identifying is in the payload, so assert the shape, not just the absence
    // of user_id -- a field added later would fail here before it reached anyone's phone.
    assert.deepStrictEqual(
        Object.keys(b).sort(),
        ['app_version', 'message', 'page', 'source', 'stack', 'user_agent'],
        'the report payload gained or lost a field; privacy.html describes exactly these'
    );
    assert.ok(headers[0].apikey, 'the POST needs the publishable key');
    assert.strictEqual(headers[0].prefer, 'return=minimal', 'the table has no select policy, so ask for nothing back');

    // An unhandled promise rejection is the other half -- most of this codebase is async.
    await page.evaluate(() => { Promise.reject(new TypeError('rejected on purpose')); });
    await page.waitForTimeout(500);
    const rej = bodies.find(x => String(x.message).includes('rejected on purpose'));
    assert.ok(rej, 'an unhandled rejection should be reported');
    assert.ok(rej.message.startsWith('TypeError:'), `the rejection should name its type, got ${rej.message}`);

    // One broken selector in a render loop would otherwise file a report per frame.
    const before = bodies.length;
    await page.evaluate(() => { setTimeout(() => { throw new Error('dupe'); }, 0); });
    await page.waitForTimeout(400);
    await page.evaluate(() => { setTimeout(() => { throw new Error('dupe'); }, 0); });
    await page.waitForTimeout(400);
    assert.strictEqual(bodies.length, before + 1, 'the same error twice should be sent once');

    for (let i = 0; i < 8; i++) {
        await page.evaluate(n => { setTimeout(() => { throw new Error('flood ' + n); }, 0); }, i);
    }
    await page.waitForTimeout(900);
    assert.strictEqual(bodies.length, 5, `the per-page cap is 5, got ${bodies.length}`);

    // A failed report must never become a second error.
    const own = [];
    page.on('pageerror', e => { if (!String(e).includes('send will fail')) own.push(String(e)); });
    await page.unroute('**/rest/v1/client_errors*');
    await page.route('**/rest/v1/client_errors*', r => r.abort());
    await page.goto(baseUrl + '/index.html', { waitUntil: 'load' });
    await page.evaluate(() => { setTimeout(() => { throw new Error('send will fail'); }, 0); });
    await page.waitForTimeout(800);
    assert.strictEqual(own.length, 0, `an aborted send raised its own error: ${own.join(' | ')}`);

    // Every page must load it, and in second position -- display-prefs.js stays first because it
    // sets the ground colour before the first paint.
    const pages = ['index.html', 'game.html', 'reading.html', 'grammar.html', 'dictionary.html',
        'phonetics.html', 'origins.html', 'path.html', 'freetime.html', 'dashboard.html',
        'credits.html', 'privacy.html', 'terms.html', 'about.html', 'reset-password.html'];
    const bad = [];
    for (const name of pages) {
        await page.goto(baseUrl + '/' + name, { waitUntil: 'domcontentloaded' });
        const r = await page.evaluate(() => {
            const srcs = [...document.querySelectorAll('script[src]')].map(s => s.getAttribute('src'));
            return { installed: typeof window.__khanjpErrorReport === 'function', idx: srcs.indexOf('error-report.js') };
        });
        if (!r.installed || r.idx !== 1) bad.push(`${name} (installed=${r.installed} position=${r.idx})`);
    }
    assert.strictEqual(bad.length, 0, `pages not reporting errors: ${bad.join(', ')}`);
    console.log(`      error reporting live on all ${pages.length} pages`);
};
