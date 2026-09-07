// build-chrome.js — writes the shared page chrome into every page that carries it.
//
// Run it after editing _chrome.html:
//
//     node build-chrome.js
//
// It is a developer tool, not part of the site: the output is ordinary static HTML committed to
// the repo exactly as before, so GitHub Pages, the service worker and the PWA are all unaffected,
// and neither this file nor _chrome.html belongs in sw.js's APP_SHELL.
//
// The leading underscore on _chrome.html is load-bearing: GitHub Pages runs Jekyll by default
// (this repo has no .nojekyll and no _config.yml), and Jekyll does not publish underscore-
// prefixed files. Adding a .nojekyll later would start serving that fragment at /_chrome.html —
// harmless, since it is the same markup every page already carries, but no longer private.
//
// Why it exists: the masthead, the account modals and the footer were copy-pasted into eleven
// pages, ~160 lines each. Every change to the frame meant eleven find-and-replaces, and on
// 2026-09-08 one of them left an unbalanced </div> in all eleven at once, which pushed <main>
// out of .container and left a fixed background layer swallowing every click on four pages.
// One source, one edit, one place to get it wrong.
//
// The per-page difference is which nav item is marked as current, and that is applied here from
// the filename rather than stored eleven times.
//
// about.html and reset-password.html are deliberately standalone — they carry no shared chrome
// and are not listed below.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CHROME = path.join(ROOT, '_chrome.html');

const PAGES = [
    'index.html', 'origins.html', 'game.html', 'reading.html', 'phonetics.html',
    'grammar.html', 'dictionary.html', 'dashboard.html', 'credits.html',
    'privacy.html', 'terms.html',
];

const MARKS = {
    header: ['<!-- chrome:header -->', '<!-- /chrome:header -->'],
    footer: ['<!-- chrome:footer -->', '<!-- /chrome:footer -->'],
};

// The pages are CRLF and _chrome.html is LF, so everything is compared and assembled in LF and
// converted back to whatever the page itself uses on the way out. Getting this wrong rewrites
// every line of every page as a one-character diff, which is how a real change would hide.
function toLF(s) { return s.split('\r\n').join('\n'); }

function section(text, name) {
    const [open, close] = MARKS[name];
    const i = text.indexOf(open);
    const j = text.indexOf(close, i);
    if (i < 0 || j < 0) throw new Error('_chrome.html is missing its ' + name + ' markers');
    return toLF(text.slice(i + open.length, j)).replace(/^\n/, '').replace(/\s+$/, '');
}

// Marks the nav entry for the page being written. The canonical copy carries no nav-current at
// all, so this is the only place the class is ever added. index.html and the legal pages have no
// nav entry of their own and correctly come out with none.
function withCurrent(header, page) {
    const needle = 'href="' + page + '" class="nav-trigger"';
    if (!header.includes(needle)) return header;
    return header.replace(needle, 'href="' + page + '" class="nav-trigger nav-current"');
}

function divBalance(html) {
    const open = (html.match(/<div\b/g) || []).length;
    const close = (html.match(/<\/div>/g) || []).length;
    return open - close;
}

function build() {
    const chrome = fs.readFileSync(CHROME, 'utf8');
    const header = section(chrome, 'header');
    const footer = section(chrome, 'footer');

    if (divBalance(header) !== 0) throw new Error('the header block in _chrome.html has unbalanced divs');
    if (divBalance(footer) !== 0) throw new Error('the footer block in _chrome.html has unbalanced divs');

    let changed = 0, skipped = 0;
    for (const page of PAGES) {
        const file = path.join(ROOT, page);
        const raw = fs.readFileSync(file, 'utf8');
        const nl = raw.includes('\r\n') ? '\r\n' : '\n';
        const before = toLF(raw);
        let out = before;

        for (const name of ['header', 'footer']) {
            const [open, close] = MARKS[name];
            const i = out.indexOf(open);
            const j = out.indexOf(close, i);
            if (i < 0 || j < 0) {
                throw new Error(page + ' has no ' + name + ' markers — add them once, then this script owns the block');
            }
            // Reuse the opening marker's own indentation for the closing one, so the generated
            // block sits at the depth the page already had it at.
            const indent = out.slice(out.lastIndexOf('\n', i) + 1, i);
            const body = name === 'header' ? withCurrent(header, page) : footer;
            out = out.slice(0, i + open.length) + '\n' + body + '\n' + indent + out.slice(j);
        }

        // Structural guard. Everything written here is markup, and the failure that prompted this
        // script was an unbalanced tag. The test is that the write does not *change* the balance:
        // demanding an absolute zero would let one page's unrelated quirk block the whole build,
        // and would not catch a page that was already off by one before and after.
        const wasBalance = divBalance(before);
        const nowBalance = divBalance(out);
        if (wasBalance !== nowBalance) {
            throw new Error(page + ': writing the chrome would change the <div> balance from '
                + wasBalance + ' to ' + nowBalance + ' — refusing');
        }
        if (nowBalance !== 0) {
            console.warn('  ! ' + page + ' has ' + nowBalance + ' unbalanced <div> (pre-existing, not from the chrome)');
        }

        if (out === before) { skipped++; continue; }
        fs.writeFileSync(file, nl === '\n' ? out : out.split('\n').join('\r\n'));
        changed++;
        console.log('  updated ' + page);
    }
    console.log(changed + ' page(s) rewritten, ' + skipped + ' already current');
}

build();
