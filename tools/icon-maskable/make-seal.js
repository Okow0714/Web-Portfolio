// Writes icons/icon-512.png, icons/icon-192.png and icons/icon-512-monochrome.png from
// make-seal.html. Needs the repo served on :8123 (python -m http.server 8123 from the root),
// because a canvas drawn from file:// is tainted and cannot be read back.
//
//   node tools/icon-maskable/make-seal.js
//
// It then checks what it wrote, since an icon is exactly the kind of file that looks fine in
// the repo and wrong on a phone: the seal's corners must be transparent, every pixel of the
// monochrome icon must be white-or-nothing, and its ink must sit inside the 80% safe circle.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..', '..');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8123/tools/icon-maskable/make-seal.html');
    const files = await page.evaluate(() => window.build());
    for (const [name, dataUrl] of Object.entries(files)) {
        fs.writeFileSync(path.join(ROOT, 'icons', name), Buffer.from(dataUrl.split(',')[1], 'base64'));
        console.log('wrote icons/' + name);
    }

    const report = await page.evaluate(async () => {
        const px = async (src) => {
            const img = new Image();
            await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = src + '?t=' + Date.now(); });
            const c = document.createElement('canvas');
            c.width = img.naturalWidth; c.height = img.naturalHeight;
            const x = c.getContext('2d');
            x.drawImage(img, 0, 0);
            return { w: c.width, d: x.getImageData(0, 0, c.width, c.height).data };
        };
        const seal = await px('/icons/icon-512.png');
        const mono = await px('/icons/icon-512-monochrome.png');
        const a = (im, x, y) => im.d[(y * im.w + x) * 4 + 3];
        let notWhite = 0, far = 0, inkPx = 0;
        for (let y = 0; y < 512; y++) {
            for (let x = 0; x < 512; x++) {
                const i = (y * 512 + x) * 4;
                if (mono.d[i + 3] < 16) continue;
                inkPx++;
                if (mono.d[i] < 250 || mono.d[i + 1] < 250 || mono.d[i + 2] < 250) notWhite++;
                far = Math.max(far, Math.hypot(x - 255.5, y - 255.5));
            }
        }
        return {
            sealCornerAlpha: [a(seal, 2, 2), a(seal, 509, 2), a(seal, 2, 509), a(seal, 509, 509)],
            sealCentreAlpha: a(seal, 256, 20),
            monoInkPixels: inkPx,
            monoNotWhite: notWhite,
            monoFurthestInk: +far.toFixed(1),
            safeRadius: 512 * 0.4,
        };
    });
    await browser.close();

    console.log(report);
    const bad = [];
    if (report.sealCornerAlpha.some(v => v !== 0)) bad.push('the seal has opaque corners');
    if (report.sealCentreAlpha !== 255) bad.push('the seal is not solid inside its edge');
    if (!report.monoInkPixels) bad.push('the monochrome icon is empty');
    if (report.monoNotWhite) bad.push('the monochrome icon has coloured pixels');
    if (report.monoFurthestInk > report.safeRadius) bad.push('monochrome ink leaves the safe circle');
    if (bad.length) { console.error('FAILED: ' + bad.join('; ')); process.exit(1); }
    console.log('icons check out');
})();
