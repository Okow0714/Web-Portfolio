// Facebook Page images for Khan Japanese: a profile picture and a cover photo.
// Run by hand:  python -m http.server 8123  (repo root, for the vendored fonts), then  node make-images.js
//
// _marketing/ is underscore-prefixed on purpose: GitHub Pages runs Jekyll, which does not publish
// underscore directories, so these drafts live in the repo without appearing on the site.
//
// Sizes. Facebook changes how it crops these, so both are designed with a safe zone, not edge to edge:
//  - profile.png 720x720. Shown as a circle, so the seal sits well inside the inscribed circle.
//  - cover.png 1640x856. Desktop shows a wide centre band and mobile a taller, narrower one; the text
//    stays in the middle 1100x460. The bottom-left corner stays empty because the round profile
//    picture overlaps it on desktop. The script refuses to write a cover whose headline wraps or
//    whose text block leaves that zone.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const FONTS = 'http://localhost:8123/fonts/fonts.css';
const JP = "'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif";

const GROUND = 'background:linear-gradient(135deg,#563345 0%,#4a2c3a 46%,#351f28 100%);';

const profile = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}">
<style>*{margin:0;box-sizing:border-box}
body{width:720px;height:720px;overflow:hidden;${GROUND}display:flex;align-items:center;justify-content:center}
.ring{width:500px;height:500px;border-radius:50%;background:#e8bd6d;display:flex;align-items:center;justify-content:center;
      box-shadow:0 0 0 14px rgba(232,189,109,0.22)}
.ring span{font-family:${JP};font-size:300px;font-weight:700;color:#3b2230;line-height:1;transform:translateY(-6px)}
</style></head><body><div class="ring"><span>言</span></div></body></html>`;

// Mongolian set in IBM Plex Sans: Fraunces has no Cyrillic. Fraunces only for the Latin wordmark.
const cover = `<!doctype html><html lang="mn"><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}">
<style>*{margin:0;box-sizing:border-box}
body{width:1640px;height:856px;overflow:hidden;position:relative;${GROUND}color:#f9efe3;font-family:'IBM Plex Sans',system-ui,sans-serif}
.wash{position:absolute;right:120px;top:50%;transform:translateY(-50%);font-family:${JP};font-size:560px;line-height:1;
      color:rgba(232,189,109,0.10)}
.kana{position:absolute;left:0;right:0;top:156px;text-align:center;font-family:${JP};font-size:30px;letter-spacing:0.5em;
      color:rgba(232,189,109,0.55)}
.mid{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:1100px;text-align:center}
.word{font-family:'Fraunces',Georgia,serif;font-size:40px;font-weight:700;color:#e8bd6d;letter-spacing:0.01em}
h1{margin-top:18px;font-size:88px;line-height:1.05;font-weight:700;letter-spacing:-0.015em}
.tools{margin-top:30px;font-size:30px;font-weight:600;color:#e7d3c6}
.tools b{color:#e8bd6d;font-weight:600;padding:0 14px}
.url{position:absolute;left:0;right:0;bottom:156px;text-align:center;font-size:28px;color:#d3b9ab;letter-spacing:0.02em}
</style></head><body>
<div class="wash">言</div>
<div class="kana">漢字 ひらがな カタカナ</div>
<div class="mid">
  <div class="word">Khan Japanese</div>
  <h1>Япон хэлтэй найзалцгаая</h1>
  <div class="tools">Толь бичиг<b>·</b>Үг холбох тоглоом<b>·</b>Дүрэм<b>·</b>Уншлага</div>
</div>
<div class="url">khan-japanese.org · үнэгүй</div>
</body></html>`;

(async () => {
    const browser = await chromium.launch({ executablePath: EXE });
    for (const [name, html, w, h] of [['profile', profile, 720, 720], ['cover', cover, 1640, 856]]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
        const page = await ctx.newPage();
        const tmp = path.join(__dirname, '.tmp-' + name + '.html');
        fs.writeFileSync(tmp, html);
        await page.goto('file:///' + tmp.split('\\').join('/'));
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(300);
        // the headline must fit on one line inside the cover's safe zone, or a crop will cut it
        if (name === 'cover') {
            const r = await page.evaluate(() => {
                const b = document.querySelector('h1').getBoundingClientRect();
                const lh = parseFloat(getComputedStyle(document.querySelector('h1')).lineHeight);
                const m = document.querySelector('.mid').getBoundingClientRect();
                return { lines: Math.round(b.height / lh), left: m.left, right: m.right, top: m.top, bottom: m.bottom };
            });
            if (r.lines !== 1) throw new Error('cover headline wraps to ' + r.lines + ' lines');
            if (r.left < 270 || r.right > 1370 || r.top < 198 || r.bottom > 658) throw new Error('cover text leaves the safe zone: ' + JSON.stringify(r));
        }
        await page.screenshot({ path: path.join(__dirname, name + '.png') });
        fs.unlinkSync(tmp);
        console.log(name + '.png ' + w + 'x' + h + '  ' + Math.round(fs.statSync(path.join(__dirname, name + '.png')).size / 1024) + 'kB');
        await ctx.close();
    }
    await browser.close();
})();
