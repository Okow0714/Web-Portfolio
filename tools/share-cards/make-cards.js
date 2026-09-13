// Generates the 1200x630 Open Graph cards, one per promoted page, into images/share/.
//
// Why generated rather than reusing images/hub/*.jpg: those are English (the dictionary one is of
// the secondary Kango-Wago tab, not the Mongolian<->Japanese tab the card sells), they run from
// 1.00 to 3.11 aspect, and one is under Facebook's 600px floor for a large card. These are laid
// out at exactly 1200x630 (1.91:1) with the tool name in Mongolian, because the whole point is a
// preview that reads as Mongolian in a Mongolian feed.
//
// The screenshot runs along the full width of the card rather than sitting in a side panel: the
// captures are 1280 wide, so at 1200 that is a 0.94 downscale and the interface stays legible
// instead of being shrunk to a thumbnail nobody can read.
//
// Name and stat line come from hub-i18n-strings.js rather than being retyped, so a card cannot
// drift from the copy the hub already shows.
//
// Typeface note: Fraunces, the site's display face, ships no Cyrillic subset -- Mongolian set in it
// falls back silently to a system serif. So Cyrillic here is IBM Plex Sans (which does carry
// cyrillic + cyrillic-ext) and Fraunces is used only for the Latin wordmark.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const ROOT = 'd:/Okow0714/Web-Portfolio/';
const OUT = ROOT + 'images/share/';

global.window = { I18N_STRINGS: {} };
require(ROOT + 'i18n-strings-shared.js');
require(ROOT + 'hub-i18n-strings.js');
const S = global.window.I18N_STRINGS;
const mn = key => {
    const e = S[key];
    if (!e || !e.mn) throw new Error('missing mn string: ' + key);
    return e.mn;
};

const CARDS = [
    { out: 'home', title: mn('hub.heroTitle'), stat: '6 ХЭРЭГСЭЛ · БҮРТГҮҮЛЭХ ШААРДЛАГАГҮЙ' },
    { out: 'dictionary', title: mn('hub.dictionary.name'), stat: mn('hub.dictionary.stat'), shot: 'dictionary' },
    { out: 'game', title: mn('hub.game.name'), stat: mn('hub.game.stat'), shot: 'game' },
    { out: 'grammar', title: mn('hub.grammar.name'), stat: mn('hub.grammar.stat'), shot: 'grammar' },
    { out: 'reading', title: mn('hub.reading.name'), stat: mn('hub.reading.stat'), shot: 'reading' },
    { out: 'phonetics', title: mn('hub.phonetics.name'), stat: mn('hub.phonetics.stat'), shot: 'phonetics' },
    { out: 'origins', title: mn('hub.origins.name'), stat: mn('hub.origins.stat'), shot: 'origins' },
    { out: 'path', title: mn('hub.path.name'), stat: '6 ҮЕ ШАТ · ТЭГЭЭС N1 ХҮРТЭЛ' },
];

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(card) {
    const hasShot = !!card.shot;
    // With a shot the text block owns the top 375px, so the title steps down a size sooner.
    const len = card.title.length;
    const size = hasShot ? (len > 22 ? 60 : len > 15 ? 68 : 76)
        : (len > 22 ? 76 : 86);
    const shotBand = hasShot
        ? `<div class="band"><img src="file:///${__dirname.split('\\').join('/')}/shot-${card.shot}.png"></div>`
        : '<div class="seal-wash">言</div>';
    return `<!doctype html><html lang="mn"><head><meta charset="utf-8">
<link rel="stylesheet" href="http://localhost:8123/fonts/fonts.css">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;position:relative;
       background:linear-gradient(135deg,#563345 0%,#4a2c3a 46%,#351f28 100%);
       font-family:'IBM Plex Sans',system-ui,sans-serif;color:#f9efe3;}
  .frame{position:absolute;inset:20px;border:1px solid rgba(232,189,109,0.34);border-radius:4px;z-index:5;pointer-events:none}
  .top{position:absolute;left:0;right:0;top:0;height:${hasShot ? 378 : 630}px;
       display:flex;flex-direction:column;justify-content:center;padding:0 70px;z-index:3}
  .brand{display:flex;align-items:center;gap:14px;margin-bottom:26px}
  .seal{width:48px;height:48px;border-radius:50%;background:#e8bd6d;color:#3b2230;
        display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;
        font-family:'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif;flex:none}
  .word{font-family:'Fraunces',Georgia,serif;font-size:26px;font-weight:700}
  h1{font-size:${size}px;line-height:1.08;font-weight:700;letter-spacing:-0.015em;
     max-width:${hasShot ? 1000 : 820}px;text-wrap:balance}
  .stat{margin-top:22px;font-size:19px;font-weight:600;letter-spacing:0.07em;color:#e8bd6d}
  .url{position:absolute;right:70px;bottom:${hasShot ? 296 : 64}px;font-size:19px;color:#d3b9ab;z-index:4}
  /* the interface itself, full width, with its top edge dissolved into the wine so it reads as
     part of the card rather than a pasted rectangle */
  .band{position:absolute;left:0;right:0;bottom:0;height:253px;overflow:hidden;z-index:2}
  .band img{width:1200px;display:block}
  .band::before{content:'';position:absolute;inset:0 0 auto 0;height:56px;z-index:3;
                background:linear-gradient(to bottom,#3d2531 0%,rgba(61,37,49,0) 100%)}
  .seal-wash{position:absolute;right:54px;bottom:-34px;font-size:330px;line-height:1;z-index:1;
             color:rgba(232,189,109,0.14);
             font-family:'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif}
</style></head><body>
<div class="frame"></div>
${shotBand}
<div class="top">
  <div class="brand"><div class="seal">言</div><div class="word">Khan Japanese</div></div>
  <h1>${esc(card.title)}</h1>
  <div class="stat">${esc(card.stat)}</div>
</div>
<div class="url">khan-japanese.org</div>
</body></html>`;
}

(async () => {
    fs.mkdirSync(OUT, { recursive: true });
    const browser = await chromium.launch({ executablePath: EXE });
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    for (const card of CARDS) {
        const tmp = path.join(__dirname, 'card-' + card.out + '.html');
        fs.writeFileSync(tmp, html(card));
        await page.goto('file:///' + tmp.split('\\').join('/'));
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(350);
        // Nothing may overflow, and the title must not collide with the screenshot band -- either
        // would ship as a broken preview and only show up once it was posted.
        const check = await page.evaluate(() => {
            const b = document.body, h1 = document.querySelector('h1'), band = document.querySelector('.band');
            const stat = document.querySelector('.stat').getBoundingClientRect();
            // NOT scrollHeight: .seal-wash is decorative and deliberately bleeds off the
            // bottom edge under overflow:hidden, which inflates it. Measure the things that must
            // actually fit instead.
            const must = ['.brand', 'h1', '.stat', '.url'].map(sel => {
                const r = document.querySelector(sel).getBoundingClientRect();
                return { sel, top: r.top, bottom: r.bottom, left: r.left, right: r.right };
            });
            return {
                w: b.getBoundingClientRect().width, h: b.getBoundingClientRect().height,
                outside: must.filter(m => m.top < 0 || m.bottom > 630 || m.left < 0 || m.right > 1200).map(m => m.sel),
                statBottom: stat.bottom,
                bandTop: band ? band.getBoundingClientRect().top : 630,
                h1Lines: Math.round(h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight)),
            };
        });
        if (check.w !== 1200 || check.h !== 630) throw new Error(card.out + ' is ' + check.w + 'x' + check.h + ', not 1200x630');
        if (check.outside.length) throw new Error(card.out + ' has content outside the card: ' + check.outside.join(', '));
        if (check.statBottom > check.bandTop) throw new Error(card.out + ' text collides with the screenshot band');
        await page.screenshot({ path: OUT + card.out + '.jpg', type: 'jpeg', quality: 88 });
        const kb = Math.round(fs.statSync(OUT + card.out + '.jpg').size / 1024);
        console.log(card.out.padEnd(12) + '1200x630  ' + String(kb).padStart(3) + 'kB  '
            + check.h1Lines + ' title line(s)  "' + card.title + '"');
    }
    await browser.close();
})();
