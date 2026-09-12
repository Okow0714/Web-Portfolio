// Fresh screenshots of each tool WITH THE SITE IN MONGOLIAN, for the share cards.
//
// The existing images/hub/*.jpg are English, and the dictionary one is of the secondary Kango-Wago
// tab rather than the Mongolian<->Japanese tab the card is selling. A preview aimed at a Mongolian
// feed has to show the Mongolian interface.
//
// Each capture is a 1280x270 strip of the most characteristic part of the page, because the card
// lays the shot along its full width rather than in a side panel -- at 1200px that is a 0.94
// downscale, so the interface stays legible instead of being shrunk into a thumbnail.
const { chromium } = require('playwright');
const EXE = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const OUT = __dirname + '/shot-';
const STRIP = { width: 1280, height: 270 };

const SHOTS = [
    // ?q=ном -> real Mongolian results (ном = book), not the English Kango-Wago tab
    { out: 'dictionary', url: 'dictionary.html?q=%D0%BD%D0%BE%D0%BC', y: 552 },
    { out: 'game', url: 'game.html', y: 505 },
    { out: 'grammar', url: 'grammar.html', y: 408 },
    { out: 'phonetics', url: 'phonetics.html', y: 215 },
    { out: 'origins', url: 'origins.html', y: 468 },
    // the reader's landing is two track cards and a lot of cream, so open a text: the highlighted
    // Japanese IS the tool, and it is what someone scrolling would recognise
    {
        out: 'reading', url: 'reading.html', y: 200,
        enter: async page => {
            await page.locator('.track-card').first().click();      // Суурь
            await page.waitForTimeout(700);
            await page.locator('.level-card:not(.locked)').first().click();
            await page.waitForTimeout(700);
            await page.locator('.text-item').first().click();
            await page.waitForTimeout(1600);
        },
    },
];

(async () => {
    const browser = await chromium.launch({ executablePath: EXE });
    for (const s of SHOTS) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 950 }, colorScheme: 'light' });
        await ctx.addInitScript(() => {
            try {
                localStorage.setItem('site-lang', 'mn');
            } catch (e) { /* private mode */ }
            const g = Storage.prototype.getItem;
            Storage.prototype.getItem = function (k) {
                if (typeof k === 'string' && k.indexOf('khanjp-tour-') === 0) return '1';
                return g.call(this, k);
            };
        });
        const page = await ctx.newPage();
        await page.goto('http://localhost:8123/' + s.url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1200);
        if (s.enter) { try { await s.enter(page); } catch (e) { console.log('  (' + s.out + ' enter step: ' + e.message.split('\n')[0] + ')'); } }
        await page.evaluate(() => {
            document.querySelectorAll('.tour-scrim, .tour-tip, .tour-overlay').forEach(e => e.remove());
            document.querySelectorAll('.site-header-wrap').forEach(e => e.remove());
        });
        await page.waitForTimeout(400);
        const lang = await page.evaluate(() => document.documentElement.lang);
        await page.screenshot({ path: OUT + s.out + '.png', clip: { x: 0, y: s.y, ...STRIP } });
        console.log(s.out.padEnd(12) + 'lang=' + lang + '  strip at y=' + s.y);
        await ctx.close();
    }
    await browser.close();
})();
