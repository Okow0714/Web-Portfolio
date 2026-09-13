// Facebook post image: "Чингис хаан ба япон хэл" -- why Japanese writes Chinggis Khaan as 成吉思汗, and how
// the sounds of those four characters add up to the name.
// Run by hand: python -m http.server 8123 (repo root), then node make-fact-han.js
//
// 1080x1350 (4:5), the tallest shape Facebook shows uncropped in the feed.
// Background: the site's logo -- the square-ended K mark, master copy in
// _marketing/brand/khan-japanese-logo-master.png -- at 50% opacity, not mentioned in the text.
//
// What the text says, and why it holds up:
//  - Japan had no writing of its own, took up Chinese characters and borrowed a great deal of Chinese
//    vocabulary; foreign names were taken as Chinese books wrote them.
//  - Chinese has no alphabet, so foreign names are written with characters picked mainly for sound.
//  - The sound row uses YUAN-ERA values, because that is when 成吉思 was written down: 成 ~ chin(g),
//    吉 ~ gi (velar -- 吉 only palatalised to "ji" centuries later), 思 ~ sy, 汗 ~ han. That is why it matches
//    Чингис хаан so closely. Modern Mandarin (chéng jí sī hán, "чэн-жи-сы хань") is given as a small note
//    so a reader who checks a dictionary is not thrown.
//  - Japan reads 成吉思汗 as ジンギスカン; today チンギス・ハン in katakana, closer to the Mongolian, is common.
//    It does NOT claim ジンギスカン is the on'yomi of those characters -- it isn't.
//
// Wording rules from the user's reviews: no "хятадууд" (name the language, not the people); no
// "汗 means sweat" angle; no logo sentence; short, but not bare.
// Cyrillic in IBM Plex Sans (Fraunces has no Cyrillic); kanji and kana in Noto Serif JP (SIL OFL).
// The page is served over http, not file://, or Chromium blocks the vendored webfonts.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const W = 1080, H = 1350;
const JP = "'Noto Serif JP', 'Yu Mincho', serif";
const LOGO = 'http://localhost:8123/_marketing/brand/khan-japanese-logo-master.png';

// character -> its sound when the name was transcribed
const SOUNDS = [['成', 'чин'], ['吉', 'ги'], ['思', 'сы'], ['汗', 'хан']];

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
  h1{margin-top:54px;font-size:66px;line-height:1.1;font-weight:700;letter-spacing:-0.015em}

  /* the four characters, each with the sound it stood for */
  .sounds{margin-top:34px}
  .row{display:flex;align-items:center;gap:14px}
  .cell{display:flex;flex-direction:column;align-items:center;min-width:118px}
  .cell .k{font-family:${JP};font-weight:700;font-size:104px;line-height:1;color:#000}
  .cell .s{margin-top:10px;font-size:34px;font-weight:700;line-height:1}
  .row .eq{font-size:52px;font-weight:500;margin:0 6px 44px}
  .row .result{font-size:46px;font-weight:700;margin-bottom:44px;white-space:nowrap}
  .era{margin-top:18px;font-size:24px;font-weight:500;line-height:1.4;text-wrap:balance}
  .era .nw{white-space:nowrap}

  .body{margin-top:40px;display:flex;flex-direction:column;gap:24px;font-size:32px;line-height:1.46;font-weight:500}
  .body .jp{font-family:${JP};font-weight:500;white-space:nowrap}
  .body p{text-wrap:pretty}
  .foot{margin-top:auto;display:flex;justify-content:space-between;align-items:baseline;font-size:26px;font-weight:700}
</style></head><body>
<img class="logo" src="${LOGO}" alt="">
<div class="page">
  <div class="top"><span>ТА МЭДЭХ ҮҮ?</span><span class="brand">Khan Japanese</span></div>
  <h1>Чингис хаан ба япон хэл</h1>
  <div class="sounds">
    <div class="row">
      ${SOUNDS.map(([k, s]) => `<div class="cell"><span class="k">${k}</span><span class="s">${s}</span></div>`).join('\n      ')}
      <span class="eq">≈</span><span class="result">Чингис хаан</span>
    </div>
    <div class="era">Юань гүрний үеийн хятад дуудлагаар. Өнөөдөр <span class="nw">«чэн-жи-сы хань»</span> гэж дууддаг.</div>
  </div>
  <div class="body">
    <p>Эрт үед Японд өөрийн бичиг үсэг байгаагүй тул хятад ханзыг авч хэрэглэж, хятад хэлнээс олон үг зээлж авчээ. Гадаадын нэрийг&nbsp;ч хятад номонд хэрхэн бичсэнээр нь авдаг байжээ.</p>
    <p>Хятад хэлэнд цагаан толгой байдаггүй тул гадаад нэрийг дуудлага нь ойролцоо ханзуудаар буулгаж бичдэг. Дээрх дөрвөн ханз Юань гүрний үед нийлээд Чингис хаан гэдэгтэй бараг адилхан сонсогддог байжээ.</p>
    <p>Японд энэ нэрийг <span class="jp">ジンギスカン</span> гэж уншдаг болсон&nbsp;ч өнөөдөр монгол дуудлагад нь ойртуулж, катаканагаар <span class="jp">チンギス・ハン</span> гэж бичих нь түгээмэл.</p>
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
        const row = document.querySelector('.row');
        const rowRight = Math.max(...[...row.children].map(c => c.getBoundingClientRect().right));
        const h1 = document.querySelector('h1');
        return { noto: loaded('Noto Serif JP'), plex: loaded('IBM Plex Sans'), logo: img.complete && img.naturalWidth,
                 h1Lines: Math.round(h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight)),
                 rowRight, footBottom: foot.bottom, bodyBottom: body.bottom, footTop: foot.top };
    });
    if (!check.noto || !check.plex) throw new Error('a font did not load: ' + JSON.stringify(check));
    if (!check.logo) throw new Error('the logo image did not load -- is the local server running from the repo root?');
    if (check.h1Lines !== 1) throw new Error('the title wraps to ' + check.h1Lines + ' lines');
    if (check.rowRight > W - 80) throw new Error('the sound row runs past the margin: right edge ' + Math.round(check.rowRight));
    if (check.bodyBottom > check.footTop - 20 || check.footBottom > H) throw new Error('text overflows the card: ' + JSON.stringify(check));
    await page.screenshot({ path: path.join(__dirname, 'fact-han.png') });
    fs.unlinkSync(tmp);
    console.log('fact-han.png ' + W + 'x' + H + '  fonts ok, title on one line, sound row ends at ' + Math.round(check.rowRight)
        + 'px, body ends ' + Math.round(check.bodyBottom) + 'px, footer at ' + Math.round(check.footTop) + 'px');
    await browser.close();
})();
