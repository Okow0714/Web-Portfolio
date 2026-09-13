// Facebook post image: "Чингис хаан ба япон хэл" -- why Japanese writes Chinggis Khaan as 成吉思汗.
// Run by hand: python -m http.server 8123 (repo root), then node make-fact-han.js
//
// 1080x1350 (4:5), the tallest shape Facebook shows uncropped in the feed.
// Background: the site's logo -- the square-ended K mark, master copy in
// _marketing/brand/khan-japanese-logo-master.png -- at 50% opacity, not mentioned in the text.
//
// What the text says, and why it holds up:
//  - Japan had no writing of its own, took up Chinese characters and borrowed a great deal of Chinese
//    vocabulary; foreign names also came in through Chinese written sources.
//  - Chinese has no alphabet, so foreign names are written with characters picked for their sound:
//    Chinggis -> 成吉思, the title khan -> 汗.
//  - In Japan the name is written 成吉思汗 and read ジンギスカン; today it is often written in katakana
//    as チンギス・ハン, closer to the original. It does NOT claim ジンギスカン is the on'yomi of those
//    characters -- it isn't (成 is セイ/ジョウ), so the text only says that is how it is read.
//
// Wording rules from the user's reviews: no "хятадууд" (sounds racist -- name the language, not the
// people); no "汗 means sweat" angle (off-putting); no logo sentence; short, but not bare.
// Cyrillic in IBM Plex Sans (Fraunces has no Cyrillic); kanji and kana in Noto Serif JP (SIL OFL).
// The page is served over http, not file://, or Chromium blocks the vendored webfonts.
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
  h1{margin-top:58px;font-size:66px;line-height:1.1;font-weight:700;letter-spacing:-0.015em}
  .name{margin-top:22px;display:flex;align-items:baseline;gap:28px}
  .name .kanji{font-family:${JP};font-weight:700;font-size:132px;line-height:1;color:#000;letter-spacing:0.02em}
  .name .kana{font-family:${JP};font-weight:500;font-size:38px;color:#1b1216}
  .body{margin-top:46px;display:flex;flex-direction:column;gap:28px;font-size:33px;line-height:1.46;font-weight:500}
  .body .jp{font-family:${JP};font-weight:500;white-space:nowrap}
  .body b{font-weight:700}
  /* no single word stranded on a paragraph's last line */
  .body p{text-wrap:pretty}
  .foot{margin-top:auto;display:flex;justify-content:space-between;align-items:baseline;font-size:26px;font-weight:700}
</style></head><body>
<img class="logo" src="${LOGO}" alt="">
<div class="page">
  <div class="top"><span>ТА МЭДЭХ ҮҮ?</span><span class="brand">Khan Japanese</span></div>
  <h1>Чингис хаан ба япон хэл</h1>
  <div class="name"><span class="kanji">成吉思汗</span><span class="kana">ジンギスカン</span></div>
  <div class="body">
    <p>Японд эрт үед өөрийн гэсэн бичиг байгаагүй тул хятад ханзыг авч хэрэглэж, хятад хэлнээс олон үг зээлжээ. Гадаадын нэрсийг&nbsp;ч хятад бичгийн сурвалжаас тэр чигээр нь авдаг байв.</p>
    <p>Хятад хэлэнд цагаан толгой байдаггүй тул гадаад нэрийг <b>утгаар нь биш, дуудлагаар нь</b> ойролцоо ханзаар бичдэг. Чингис гэдгийг <span class="jp">成吉思</span>, хан цолыг <span class="jp">汗</span> гэж бичсэн нь ийм учиртай.</p>
    <p>Японд энэ нэрийг ханзаар нь <span class="jp">成吉思汗</span> гэж бичээд <span class="jp">ジンギスカン</span> гэж уншдаг болсон. Харин орчин үед эх дуудлагад нь ойртуулж, катаканагаар <span class="jp">チンギス・ハン</span> гэж бичих нь элбэг.</p>
  </div>
  <div class="foot"><span>khan-japanese.org</span><span>Япон хэлтэй найзалцгаая</span></div>
</div>
</body></html>`;

(async () => {
    const browser = await chromium.launch({ executablePath: EXE });
    const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
    const tmp = path.join(__dirname, '.tmp-fact-han.html');
    fs.writeFileSync(tmp, html);
    await page.goto('http://localhost:8123/_marketing/facebook/' + path.basename(tmp), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    const check = await page.evaluate(() => {
        const loaded = fam => [...document.fonts].some(f => f.family.replace(/"/g, '').includes(fam) && f.status === 'loaded');
        const img = document.querySelector('.logo');
        const foot = document.querySelector('.foot').getBoundingClientRect();
        const body = document.querySelector('.body').getBoundingClientRect();
        const h1 = document.querySelector('h1');
        return { noto: loaded('Noto Serif JP'), plex: loaded('IBM Plex Sans'), logo: img.complete && img.naturalWidth,
                 h1Lines: Math.round(h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight)),
                 footBottom: foot.bottom, bodyBottom: body.bottom, footTop: foot.top };
    });
    if (!check.noto || !check.plex) throw new Error('a font did not load: ' + JSON.stringify(check));
    if (!check.logo) throw new Error('the logo image did not load -- is the local server running from the repo root?');
    if (check.h1Lines !== 1) throw new Error('the title wraps to ' + check.h1Lines + ' lines');
    if (check.bodyBottom > check.footTop - 20 || check.footBottom > H) throw new Error('text overflows the card: ' + JSON.stringify(check));
    await page.screenshot({ path: path.join(__dirname, 'fact-han.png') });
    fs.unlinkSync(tmp);
    console.log('fact-han.png ' + W + 'x' + H + '  fonts ok, title on one line, body ends ' + Math.round(check.bodyBottom) + 'px, footer at ' + Math.round(check.footTop) + 'px');
    await browser.close();
})();
