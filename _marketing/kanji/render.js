// Renders the kanji 汗 as 1024x1024 transparent PNGs from two openly licensed sources.
// Run by hand:  node render.js   (needs network for the Google Fonts request)
//
//   han-kanjivg.png      KanjiVG 06c57.svg -- the stroke data, drawn as even brush-less strokes.
//                        CC BY-SA 3.0: attribution required, adaptations share alike (see LICENSES.md).
//   han-noto-serif.png   Noto Serif JP Bold, a printed Mincho form. The font is SIL OFL 1.1; a picture
//                        of a glyph set in it is not the font software, so the image carries no
//                        attribution requirement.
// _marketing/ is not published by GitHub Pages (Jekyll skips underscore directories).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const SIZE = 1024;

(async () => {
    const svg = fs.readFileSync(path.join(__dirname, 'kanjivg-06c57.svg'), 'utf8');
    // Only the stroke paths are needed. KanjiVG also ships stroke-order numbers in a second group
    // (kvg:StrokeNumbers), which would print digits across the character.
    const strokes = svg.match(/<g id="kvg:StrokePaths_06c57"[\s\S]*?<\/g>\s*<\/g>\s*<\/g>/);
    if (!strokes) throw new Error('stroke group not found in the KanjiVG file');
    const paths = (strokes[0].match(/<path[^>]*\sd="[^"]+"/g) || []).map(p => p.match(/\sd="([^"]+)"/)[1]);
    if (paths.length !== 6) throw new Error('expected 6 strokes for 汗, found ' + paths.length);

    const pages = {
        'han-kanjivg.png': `<!doctype html><html><head><style>html,body{margin:0;background:transparent}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 109 109">
  <g fill="none" stroke="#1a1a1a" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round">
    ${paths.map(d => `<path d="${d}"/>`).join('\n    ')}
  </g>
</svg></body></html>`,
        'han-noto-serif.png': `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&text=%E6%B1%97">
<style>html,body{margin:0;background:transparent;width:${SIZE}px;height:${SIZE}px}
body{display:flex;align-items:center;justify-content:center}
span{font-family:'Noto Serif JP';font-weight:700;font-size:${Math.round(SIZE * 0.86)}px;line-height:1;color:#1a1a1a}</style>
</head><body><span>汗</span></body></html>`,
    };

    const browser = await chromium.launch({ executablePath: EXE });
    const page = await (await browser.newContext({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 1 })).newPage();
    for (const [out, html] of Object.entries(pages)) {
        await page.setContent(html, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        if (out === 'han-noto-serif.png') {
            // refuse to save a system-font fallback under the Noto name
            const ok = await page.evaluate(() => document.fonts.check("700 100px 'Noto Serif JP'", '汗'));
            const loaded = await page.evaluate(() => [...document.fonts].some(f => f.family.includes('Noto Serif JP') && f.status === 'loaded'));
            if (!ok || !loaded) throw new Error('Noto Serif JP did not load; not writing a fallback glyph');
        }
        await page.screenshot({ path: path.join(__dirname, out), omitBackground: true, clip: { x: 0, y: 0, width: SIZE, height: SIZE } });
        console.log(out + '  ' + SIZE + 'x' + SIZE + '  transparent  ' + Math.round(fs.statSync(path.join(__dirname, out)).size / 1024) + 'kB');
    }
    await browser.close();
})();
