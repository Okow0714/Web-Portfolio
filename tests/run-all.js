// Test runner: starts a local static server, launches one browser, runs every tests/*.spec.js
// in its own page/context, and reports a pass/fail summary. Exits non-zero if anything failed,
// so CI (see .github/workflows/tests.yml) fails the run. No test framework dependency --
// plain node:assert per spec keeps this runnable via `node tests/run-all.js` with nothing
// beyond `npx playwright install` first (see tests/README.md).
const path = require('path');
const fs = require('fs');
const assert = require('assert');
const { spawn } = require('child_process');
const { chromium } = require('playwright');

const PORT = 8123;
const ROOT = path.join(__dirname, '..');
const BASE_URL = `http://localhost:${PORT}`;

function startServer() {
    return new Promise((resolve, reject) => {
        const proc = spawn('python', ['-m', 'http.server', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
        proc.on('error', reject);
        // Poll until the server actually answers instead of a fixed sleep.
        const deadline = Date.now() + 15000;
        const tryConnect = () => {
            const http = require('http');
            const req = http.get(`${BASE_URL}/index.html`, res => { res.resume(); resolve(proc); });
            req.on('error', () => {
                if (Date.now() > deadline) reject(new Error('local server did not start in time'));
                else setTimeout(tryConnect, 250);
            });
        };
        tryConnect();
    });
}

async function main() {
    const specFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.spec.js')).sort();
    if (specFiles.length === 0) {
        console.log('No tests/*.spec.js files found.');
        process.exit(0);
    }

    console.log(`Starting local server on :${PORT}...`);
    const server = await startServer();

    const browser = await chromium.launch();
    const results = [];

    for (const file of specFiles) {
        const spec = require(path.join(__dirname, file));
        const context = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
        const page = await context.newPage();
        const t0 = Date.now();
        try {
            await spec(page, assert, BASE_URL);
            results.push({ file, ok: true, ms: Date.now() - t0 });
            console.log(`  PASS  ${file}  (${Date.now() - t0}ms)`);
        } catch (err) {
            results.push({ file, ok: false, ms: Date.now() - t0, error: err.message });
            console.log(`  FAIL  ${file}  (${Date.now() - t0}ms)`);
            console.log(`        ${err.message}`);
        } finally {
            await context.close();
        }
    }

    await browser.close();
    server.kill();

    const failed = results.filter(r => !r.ok);
    console.log(`\n${results.length - failed.length}/${results.length} passed.`);
    if (failed.length > 0) {
        console.log('Failed:', failed.map(f => f.file).join(', '));
        process.exit(1);
    }
}

main().catch(err => {
    console.error('Test runner crashed:', err);
    process.exit(1);
});
