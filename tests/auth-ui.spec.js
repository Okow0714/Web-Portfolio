// The account menu and auth modals: the contract, the signed-out state, and the open/close paths.
//
// NOTHING HERE SUBMITS A FORM. supabase-config.js points at the live project, so a spec that
// clicked "Log in" with a made-up address would be issuing real auth requests against production
// on every CI run, and a sign-up would create real rows in a real database. Everything below stops
// at the UI, which is where the bugs have actually been.
//
// Why these assertions: auth-shared.js wires a fixed set of ids and relies on their nesting --
// #auth-anon and #auth-authed inside #account-menu-panel in particular. CLAUDE.md calls them
// load-bearing and asks that they not be renamed or re-nested without updating that file, and
// until now nothing enforced it. A rename would break sign-in on thirteen pages silently, because
// auth-shared.js guards its lookups and degrades rather than throwing.
//
// about.html is included on purpose: it carries no shared chrome and mirrors this same contract by
// hand, so it is the copy most likely to drift.

// Every id auth-shared.js depends on, per the account-menu section of CLAUDE.md.
const CONTRACT = [
    'account-menu', 'account-menu-trigger', 'account-menu-panel',
    'auth-anon', 'auth-authed', 'account-menu-profile-avatar',
    'auth-login-btn', 'auth-logout-btn', 'auth-user-email',
    'account-details-btn', 'account-settings-btn',
    'auth-modal', 'account-details-modal', 'account-settings-modal',
];

// Deliberately NOT in CONTRACT. auth-shared.js reaches the scrim through optional chaining --
//   document.getElementById('account-menu-scrim')?.addEventListener(...)
// -- which is the code saying out loud that it may be absent. about.html is the case that proves
// it: its account menu is a compact popover in the index rail, not a full-height drawer, so there
// is no backdrop for a scrim to be, and the outside-click handler closes it instead.
// Listing it as required failed about.html on the first run, which was this spec being wrong
// rather than the page.
const OPTIONAL = ['account-menu-scrim'];

module.exports = async function run(page, assert, BASE_URL) {

    // ---------------------------------------------------------------- the id contract
    for (const pageName of ['index.html', 'about.html']) {
        await page.goto(`${BASE_URL}/${pageName}`, { waitUntil: 'load' });
        await page.waitForTimeout(1200);

        const found = await page.evaluate(ids => {
            const out = {};
            for (const id of ids) out[id] = !!document.getElementById(id);
            // the nesting auth-shared.js assumes
            const panel = document.getElementById('account-menu-panel');
            out.__anonInPanel = !!(panel && panel.querySelector('#auth-anon'));
            out.__authedInPanel = !!(panel && panel.querySelector('#auth-authed'));
            return out;
        }, CONTRACT);

        const missing = CONTRACT.filter(id => !found[id]);
        assert.strictEqual(missing.length, 0,
            `${pageName}: auth-shared.js depends on these ids and they are gone: ${missing.join(', ')}`);
        assert.ok(found.__anonInPanel, `${pageName}: #auth-anon must be inside #account-menu-panel`);
        assert.ok(found.__authedInPanel, `${pageName}: #auth-authed must be inside #account-menu-panel`);

        // The scrim is optional in auth-shared.js, but it is not optional on a page that uses the
        // full-height drawer -- without a backdrop the drawer opens over the page with nothing to
        // dim or click away. So it is required everywhere EXCEPT about.html's compact popover.
        const scrim = await page.evaluate(() => !!document.getElementById('account-menu-scrim'));
        if (pageName === 'about.html') {
            assert.ok(!scrim, 'about.html uses a popover, not a drawer — a scrim there would be dead markup');
        } else {
            assert.ok(scrim, `${pageName}: the drawer needs #account-menu-scrim as its backdrop`);
        }
    }

    // ---------------------------------------------------------------- signed-out state
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(1400);

    const state = await page.evaluate(() => {
        const vis = el => !!el && !el.classList.contains('hidden') && el.getBoundingClientRect().height > 0;
        return {
            anon: vis(document.getElementById('auth-anon')),
            authed: vis(document.getElementById('auth-authed')),
            supabaseReady: window.supabaseReady,
        };
    });
    // A fresh context has no session, so the anonymous half is the one that should show. If both
    // showed, or the signed-in half did, the panel is lying about who you are.
    assert.ok(state.anon, 'signed out: #auth-anon should be visible before the panel even opens');
    assert.ok(!state.authed, 'signed out: #auth-authed must not be visible');

    // ---------------------------------------------------------------- panel opens
    await page.click('#account-menu-trigger');
    await page.waitForTimeout(500);
    const panelOpen = await page.evaluate(() => {
        const p = document.getElementById('account-menu-panel');
        const r = p.getBoundingClientRect();
        // the panel is parked off the right edge when closed
        return r.left < window.innerWidth - 1 && r.width > 0;
    });
    assert.ok(panelOpen, 'clicking #account-menu-trigger should slide the account panel into view');

    // ---------------------------------------------------------------- auth modal
    await page.click('#auth-login-btn');
    await page.waitForTimeout(500);

    const modal = await page.evaluate(() => {
        const m = document.getElementById('auth-modal');
        const open = !m.classList.contains('hidden');
        const email = m.querySelector('input[type=email]');
        const pass = m.querySelector('input[type=password]');
        return {
            open,
            hasEmail: !!email, hasPassword: !!pass,
            emailFocusable: !!email && !email.disabled && !email.readOnly,
            submitCount: m.querySelectorAll('button[type=submit], .auth-btn').length,
        };
    });
    assert.ok(modal.open, '#auth-modal should open from #auth-login-btn');
    assert.ok(modal.hasEmail, 'auth modal needs an email input');
    assert.ok(modal.hasPassword, 'auth modal needs a password input');
    assert.ok(modal.emailFocusable, 'the email input should be editable');
    assert.ok(modal.submitCount > 0, 'auth modal needs a submit control');

    // Typing must work and the value must be readable back -- never submitted.
    await page.fill('#auth-modal input[type=email]', 'spec@example.invalid');
    await page.fill('#auth-modal input[type=password]', 'not-a-real-password');
    const typed = await page.evaluate(() => ({
        email: document.querySelector('#auth-modal input[type=email]').value,
        pass: document.querySelector('#auth-modal input[type=password]').value,
    }));
    assert.strictEqual(typed.email, 'spec@example.invalid', 'email input should accept typing');
    assert.strictEqual(typed.pass, 'not-a-real-password', 'password input should accept typing');

    // ---------------------------------------------------------------- login <-> sign-up toggle
    const toggle = await page.$('#auth-mode-toggle');
    if (toggle) {
        const before = await page.evaluate(() => document.querySelector('#auth-modal h2, #auth-modal h3').textContent.trim());
        await toggle.click();
        await page.waitForTimeout(400);
        const after = await page.evaluate(() => document.querySelector('#auth-modal h2, #auth-modal h3').textContent.trim());
        assert.notStrictEqual(after, before,
            'the auth mode toggle should switch the modal between logging in and signing up');
    }

    // ---------------------------------------------------------------- it closes
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    let closed = await page.evaluate(() => document.getElementById('auth-modal').classList.contains('hidden'));
    if (!closed) {
        const x = await page.$('#auth-modal .modal-close');
        if (x) { await x.click(); await page.waitForTimeout(400); }
        closed = await page.evaluate(() => document.getElementById('auth-modal').classList.contains('hidden'));
    }
    assert.ok(closed, 'the auth modal should close by Escape or its close button — otherwise it traps the page');

    // ---------------------------------------------------------------- settings, signed out
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(1200);
    await page.click('#account-menu-trigger');
    await page.waitForTimeout(400);
    await page.click('#account-settings-btn-anon');
    await page.waitForTimeout(500);

    const settings = await page.evaluate(() => {
        const m = document.getElementById('account-settings-modal');
        return {
            open: !m.classList.contains('hidden'),
            controls: m.querySelectorAll('button, input, select').length,
        };
    });
    // Settings is offered signed out on purpose -- it holds the tutorial reset, and the language
    // switch lives in the masthead precisely so it is reachable without an account.
    assert.ok(settings.open, 'the settings modal should open for a signed-out visitor');
    assert.ok(settings.controls > 0, 'the settings modal should contain controls, not just a heading');
};
