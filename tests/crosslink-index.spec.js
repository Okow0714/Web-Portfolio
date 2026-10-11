// dictionary-crosslink.js is generated from three other data files. Nothing at runtime notices
// when it falls out of step with them -- the badges simply describe a Word Match that no longer
// exists, which is the same silent drift that had the site advertising 50 levels long after it
// had 60 (see tests/progress-totals.spec.js, which exists for that reason).
//
// This regenerates the index in memory and compares it with the committed file. If they differ,
// someone changed game-words.js, reading-texts.js or phonetics-kanji-index.js without re-running
// tools/build-crosslink-index.js.
//
// No browser needed: this is a pure data check, so it runs in milliseconds.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { execFileSync } = require('child_process');

module.exports = async function () {
    const REPO = path.join(__dirname, '..');
    const OUT = path.join(REPO, 'dictionary-crosslink.js');

    const committed = fs.readFileSync(OUT, 'utf8');

    // Regenerate into a temp copy rather than over the real file: a test must not leave the
    // working tree different from how it found it, pass or fail.
    const backup = committed;
    let regenerated;
    try {
        execFileSync(process.execPath, [path.join(REPO, 'tools', 'build-crosslink-index.js')],
            { cwd: REPO, stdio: 'pipe' });
        regenerated = fs.readFileSync(OUT, 'utf8');
    } finally {
        fs.writeFileSync(OUT, backup);
    }

    assert.strictEqual(regenerated, committed,
        'dictionary-crosslink.js is out of date with game-words.js / reading-texts.js / '
        + 'phonetics-kanji-index.js — run `node tools/build-crosslink-index.js` and commit the result');

    // The index is only worth shipping if it still joins to things. A silent collapse to near
    // zero (a renamed field, a changed id scheme) would otherwise pass the equality check above,
    // since the generator and the check read the same sources.
    const marker = 'const DICTIONARY_CROSSLINK = ';
    const data = JSON.parse(committed.slice(committed.indexOf(marker) + marker.length)
        .replace(/;\s*$/, '').trim());
    const keys = Object.keys(data);
    assert.ok(keys.length > 2000,
        `only ${keys.length} dictionary entries cross-link to anything — expected well over 2,000`);

    const withW = keys.filter(k => data[k].w).length;
    const withP = keys.filter(k => data[k].p).length;
    const withR = keys.filter(k => data[k].r).length;
    for (const [name, n, floor] of [['Word Match', withW, 1000], ['phonetics', withP, 1500],
                                    ['reader', withR, 300]]) {
        assert.ok(n > floor, `${name} links collapsed to ${n}, expected more than ${floor}`);
    }

    // Every href the dictionary builds from this must be openable: a Word Match level number has
    // to be a real level, and a reader text id a real text.
    const levels = new Set();
    const wl = fs.readFileSync(path.join(REPO, 'game-words.js'), 'utf8');
    const WORD = JSON.parse(wl.slice(wl.indexOf('const WORD_LEVELS = ') + 20).replace(/;\s*$/, '').trim());
    for (const lv of Object.values(WORD)) levels.add(lv.level);

    const textIds = new Set();
    const rt = fs.readFileSync(path.join(REPO, 'reading-texts.js'), 'utf8');
    const READ = JSON.parse(rt.slice(rt.indexOf('const READING_TRACKS = ') + 23).replace(/;\s*$/, '').trim());
    for (const tr of READ) for (const lv of tr.levels) for (const tx of lv.texts) textIds.add(tx.id);

    for (const [word, rec] of Object.entries(data)) {
        for (const lvl of (rec.w || [])) assert.ok(levels.has(lvl),
            `${word} points at Word Match level ${lvl}, which does not exist`);
        for (const [id] of (rec.r || [])) assert.ok(textIds.has(id),
            `${word} points at reader text "${id}", which does not exist`);
    }

    console.log(`      crosslink index current — ${keys.length} entries, `
        + `${withW} Word Match / ${withP} phonetics / ${withR} reader, every target resolves`);
};
