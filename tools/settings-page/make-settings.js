// node tools/settings-page/make-settings.js  -- then node build-chrome.js, which puts the chrome back in.
//
// Fills settings.template.html's {{key}} placeholders with the Mongolian from the strings files, and
// {{STEPS tool kind}} with a four-step volume group. Writes settings.html (CRLF, like every page).
const fs = require('fs'); const vm = require('vm'); const path = require('path'); const R = path.join(__dirname, '..', '..') + path.sep;
const ctx = { window: { I18N_STRINGS: {} } }; vm.createContext(ctx);
for (const f of ['i18n-strings-shared.js', 'dashboard-i18n-strings.js', 'settings-i18n-strings.js']) vm.runInContext(fs.readFileSync(R + f, 'utf8'), ctx);
const S = ctx.window.I18N_STRINGS;
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
let html = fs.readFileSync(__dirname + '/settings.template.html', 'utf8');
// a volume is a slider, 0-100% in steps of 5, with its value printed beside it; settings.js also
// lets the mouse wheel move it
html = html.replace(/\{\{STEPS (\w+) (\w+)\}\}/g, (_, tool, kind) =>
  `<span class="set-vol"><input type="range" min="0" max="100" step="5" value="100" data-vol="${tool}:${kind}" aria-label="${esc(S[tool === 'game' ? 'nav.wordGame' : tool === 'grammar' ? 'nav.grammarConnect' : 'nav.phoneticsFamily'].mn)}: ${esc(S[kind === 'music' ? 'set.music' : 'set.sounds'].mn)}"><output>100%</output></span>`);
const missing = new Set();
// a spoken name carries its key too, so settings.js can swap it when the language changes
html = html.replace(/aria-label="\{\{([\w.]+)\}\}"/g, (_, k) => { if (!S[k]) { missing.add(k); return ''; } return `aria-label="${esc(S[k].mn)}" data-aria="${k}"`; });
html = html.replace(/\{\{([\w.]+)\}\}/g, (_, k) => { if (!S[k]) { missing.add(k); return k; } return esc(S[k].mn); });
if (missing.size) throw new Error('missing strings: ' + [...missing].join(', '));
fs.writeFileSync(R + 'settings.html', html.replace(/\r?\n/g, '\r\n'));
console.log('settings.html written,', html.length, 'chars');
