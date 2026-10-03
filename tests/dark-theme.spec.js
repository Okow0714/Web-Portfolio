// Contrast in both themes, with the modals OPEN.
//
// This exists because of a bug that shipped and sat there: in dark mode the login and sign-up
// fields painted dark text on a dark field, 1.60:1. You could not read your own email or password
// while typing it. .modal-card is light in both themes, but html[data-theme="dark"] sets
// color-scheme: dark, so the BROWSER themed the controls inside it while #auth-form input pinned
// the text to the light --text-primary.
//
// No automated check caught it. A sitewide contrast sweep had run and passed, because a modal is
// display:none until opened, so every element inside all three was skipped. The fix is not a
// better sweep -- it is opening the things before measuring them, which is what this does.
//
// Inputs get text TYPED into them. The placeholder and the typed value are styled separately, and
// it was the typed value that was invisible.
//
// Any element whose backdrop involves a gradient or an image is reported as unmeasurable rather
// than guessed at: light-dark() cannot wrap a gradient, several pages paint their ground with one,
// and a probe that reads background-color alone calls those white and invents failures. That
// happened during the original investigation and produced 27 findings, all of them the probe's.
const THEMES = ['light', 'dark'];

// Opened by clicking a path of selectors in order. Signed-out state, so these are the three
// surfaces a visitor can actually reach without an account.
const SURFACES = [
    { name: 'auth modal', open: ['#account-menu-trigger', '#auth-login-btn'], sel: '#auth-modal', type: true },
    { name: 'settings modal', open: ['#account-menu-trigger', '#account-settings-btn-anon'], sel: '#account-settings-modal' },
    { name: 'account panel', open: ['#account-menu-trigger'], sel: '#account-menu-panel' },
];

function auditFn() {
    const parse = c => {
        const m = String(c).match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const p = m[1].split(',').map(Number);
        return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    };
    const lum = c => {
        const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
    };
    const over = (fg, bg) => fg.a >= 1 ? fg : {
        r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a),
        b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1
    };
    const ratio = (a, b) => {
        const l1 = lum(a), l2 = lum(b);
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    };
    // The real painted backdrop, or a flag saying no single colour describes it.
    const backdrop = el => {
        let acc = null;
        for (let n = el; n; n = n.parentElement) {
            const s = getComputedStyle(n);
            if (s.backgroundImage && s.backgroundImage !== 'none') return { image: true };
            const c = parse(s.backgroundColor);
            if (c && c.a > 0) { acc = acc ? over(acc, c) : c; if (acc.a >= 1) return { bg: acc }; }
        }
        return acc ? { bg: acc } : { image: true };
    };

    return function audit(rootSel) {
        const root = document.querySelector(rootSel);
        if (!root) return { missing: true };
        const fails = [];
        let checked = 0, skipped = 0;
        for (const el of root.querySelectorAll('*')) {
            const b = el.getBoundingClientRect();
            if (b.width < 4 || b.height < 4) continue;
            const st = getComputedStyle(el);
            if (st.visibility === 'hidden' || st.display === 'none' || parseFloat(st.opacity) < 0.15) continue;

            const own = [...el.childNodes]
                .filter(n => n.nodeType === 3 && n.textContent.trim())
                .map(n => n.textContent.trim()).join(' ');
            const typed = el.tagName === 'INPUT' && el.value ? el.value : '';
            if (!own && !typed) continue;

            const fg = parse(st.color);
            if (!fg || fg.a === 0) continue;
            const bd = backdrop(el);
            if (bd.image) { skipped++; continue; }

            checked++;
            const r = ratio(over(fg, bd.bg), bd.bg);
            const size = parseFloat(st.fontSize);
            const large = size >= 24 || (size >= 18.66 && parseInt(st.fontWeight, 10) >= 700);
            const floor = large ? 3 : 4.5;
            if (r < floor) fails.push({
                sel: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '.' + (String(el.className).split(' ')[0] || '?')),
                text: (own || typed).slice(0, 28),
                ratio: Math.round(r * 100) / 100, need: floor,
                fg: st.color, bg: 'rgb(' + [bd.bg.r, bd.bg.g, bd.bg.b].map(Math.round).join(',') + ')'
            });
        }
        return { fails, checked, skipped };
    };
}

module.exports = async function run(page, assert, BASE_URL) {
    const problems = [];
    let totalChecked = 0;

    for (const theme of THEMES) {
        for (const s of SURFACES) {
            await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'load' });
            // Set the theme the way the masthead switch does; style.css turns data-theme into
            // color-scheme, which is what the light-dark() tokens resolve against.
            await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
            await page.waitForTimeout(1200);

            for (const step of s.open) {
                await page.click(step);
                await page.waitForTimeout(350);
            }

            if (s.type) {
                // The typed value, not the placeholder -- that is what was invisible.
                for (const input of await page.$$(`${s.sel} input:not([type=checkbox]):not([type=hidden])`)) {
                    try { await input.fill('Test1234'); } catch (e) { /* not fillable, fine */ }
                }
                await page.waitForTimeout(200);
            }

            const res = await page.evaluate(
                ([fnSrc, sel]) => (new Function('return ' + fnSrc)())()(sel),
                [auditFn.toString(), s.sel]
            );

            assert.ok(!res.missing, `${s.name} not found in the DOM (${theme})`);
            totalChecked += res.checked;
            assert.ok(res.checked > 0, `${s.name} (${theme}): nothing measurable — the surface probably never opened`);

            for (const f of res.fails) {
                problems.push(`${theme} / ${s.name}: ${f.sel} "${f.text}" ${f.ratio}:1 ` +
                    `(needs ${f.need}) fg=${f.fg} on ${f.bg}`);
            }
        }
    }

    assert.strictEqual(problems.length, 0,
        'contrast failures with modals open:\n    ' + problems.join('\n    '));
    assert.ok(totalChecked > 40,
        `only ${totalChecked} elements measured across both themes — the surfaces are probably not opening`);
};
