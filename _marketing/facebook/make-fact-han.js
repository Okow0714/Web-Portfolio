// "Interesting fact" image for Facebook: why Chinggis Khaan is written 成吉思汗, 汗 means sweat, and our logo
// is built on that character.
// Run by hand: python -m http.server 8123 (repo root, for the vendored fonts), then node make-fact-han.js
//
// 1080x1350 (4:5), the tallest shape Facebook shows uncropped in the feed.
// Background: the site's actual logo -- the square-ended K mark in icons/, master copy in
// _marketing/brand/khan-japanese-logo-master.png -- at 50% opacity, as asked. (Not the old 言 seal,
// which the K mark replaced on 2026-08-18.)
//
// Claims kept to what holds up:
//  - Chinese transcribed foreign names and titles by SOUND: "khan" -> 汗 (hán in this use, as in 可汗),
//    "Chinggis" -> 成吉思. The meaning "sweat" plays no part.
//  - Japanese took the spelling over from Chinese.
//  - Hokkaido's grilled-mutton dish is called ジンギスカン.
//  - The background is our logo (stated, not explained -- the user found the explanation too much).
// Deliberately NOT claimed: which chronicle first wrote 成吉思汗 -- the Yuan Shi records the title as
// 成吉思皇帝, so a "first written in the Yuan Shi" line would be wrong.
//
// Cyrillic in IBM Plex Sans (Fraunces has no Cyrillic); kanji and kana in Noto Serif JP (SIL OFL).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const W = 1080, H = 1350;
const JP = "'Noto Serif JP', 'Yu Mincho', serif";
const LOGO = 'http://localhost:8123/_marketing/brand/khan-japanese-logo-master.png';

const html = `<!doctype html><html lang="mn"><head><meta charset="utf-8">
<link rel="stylesheet" href="http://localhost:8123/fonts/fonts.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500;700&display=block">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;overflow:hidden;position:relative;background:#fff;color:#1b1216;
       font-family:'IBM Plex Sans',system-ui,sans-serif}
  /* the logo picture itself, covering the card, at 50% */
  .logo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0.5}
  .page{position:absolute;inset:0;padding:72px 80px 64px;display:flex;flex-direction:column}
  .top{display:flex;justify-content:space-between;align-items:center;font-size:24px;font-weight:700;letter-spacing:0.12em;color:#1b1216}
  .top .brand{font-family:'Fraunces',Georgia,serif;letter-spacing:0.01em;font-size:30px}
  .hero{margin-top:52px;display:flex;align-items:center;gap:36px}
  .kanji{font-family:${JP};font-weight:700;font-size:200px;line-height:1;color:#000}
  .hero h1{font-size:52px;line-height:1.16;font-weight:700;letter-spacing:-0.01em}
  .hero h1 .jp{font-family:${JP};font-weight:700}
  .sweat{margin-top:16px;font-size:36px;font-weight:700;text-wrap:balance}
  .body{margin-top:56px;display:flex;flex-direction:column;gap:30px;font-size:36px;line-height:1.45;font-weight:500}
  /* a Japanese word must not break mid-word (チンギス・ / ハン) */
  .body .jp{font-family:${JP};font-weight:500;white-space:nowrap}
  .hero h1 .jp{white-space:nowrap}
  .body b{font-weight:700}
  .logo-note{font-weight:600}
  .foot{margin-top:auto;display:flex;justify-content:space-between;align-items:baseline;font-size:26px;font-weight:700}
</style></head><body>
<img class="logo" src="${LOGO}" alt="">
<div class="page">
  <div class="top"><span>ТА МЭДЭХ ҮҮ?</span><span class="brand">Khan Japanese</span></div>
  <div class="hero">
    <div class="kanji">汗</div>
    <div>
      <h1>Японоор Чингис хааныг <span class="jp">成吉思汗</span> гэж бичдэг</h1>
      <div class="sweat">Гэтэл <span class="jp">汗</span> гэдэг ханз «хөлс» гэсэн утгатай.</div>
    </div>
  </div>
  <div class="body">
    <p>Хятадууд гадаад нэрийг <b>утгаар нь биш, дуудлагаар нь</b> ханзаар бичдэг. Хан гэдэг цолыг дуудлага нь ойролцоо <span class="jp">汗</span> ханзаар бичсэн болохоос хөлстэй ямар&nbsp;ч хамаагүй. Япончууд үүнийг хятадаас авсан.</p>
    <p>Хоккайдогийн алдартай шарсан хонины махыг&nbsp;ч <span class="jp">ジンギスカン</span> гэдэг.</p>
    <p class="logo-note">Ард харагдаж байгаа нь манай лого.</p>
  </div>
  <div class="foot"><span>khan-japanese.org</span><span>Япон хэлтэй найзалцгаая</span></div>
</div>
</body></html>`;

(async () => {
    const browser = await chromium.launch({ executablePath: EXE });
    const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
    const tmp = path.join(__dirname, '.tmp-fact-han.html');
    fs.writeFileSync(tmp, html);
    // Loaded through the local server, not file://: a file:// page counts as a different origin from
    // localhost, and the browser refuses cross-origin webfonts, so the Mongolian silently fell back.
    await page.goto('http://localhost:8123/_marketing/facebook/' + path.basename(tmp), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    const check = await page.evaluate(() => {
        const loaded = fam => [...document.fonts].some(f => f.family.replace(/"/g, '').includes(fam) && f.status === 'loaded');
        const img = document.querySelector('.logo');
        const foot = document.querySelector('.foot').getBoundingClientRect();
        const body = document.querySelector('.body').getBoundingClientRect();
        return { noto: loaded('Noto Serif JP'), plex: loaded('IBM Plex Sans'), logo: img.complete && img.naturalWidth,
                 footBottom: foot.bottom, bodyBottom: body.bottom, footTop: foot.top };
    });
    if (!check.noto || !check.plex) throw new Error('a font did not load: ' + JSON.stringify(check));
    if (!check.logo) throw new Error('the logo image did not load -- is the local server running from the repo root?');
    if (check.bodyBottom > check.footTop - 20 || check.footBottom > H) throw new Error('text overflows the card: ' + JSON.stringify(check));
    await page.screenshot({ path: path.join(__dirname, 'fact-han.png') });
    fs.unlinkSync(tmp);
    console.log('fact-han.png ' + W + 'x' + H + '  logo ' + check.logo + 'px wide, fonts ok, body ends ' + Math.round(check.bodyBottom) + 'px, footer at ' + Math.round(check.footTop) + 'px');
    await browser.close();
})();
