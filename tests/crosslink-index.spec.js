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

    // The JLPT tier is a label, not a link, so nothing above would notice it vanishing. It is
    // derived from the `jlpt` field on each Word Match level, so it exists for exactly the words
    // Word Match carries -- if those two counts ever diverge, a level lost its tier.
    const withJ = keys.filter(k => data[k].j).length;
    const TIER_ORDER = ['N5', 'N4', 'N3', 'N2', 'N1'];
    for (const k of keys) {
        if (!data[k].j) continue;
        const tiers = data[k].j.split('-');
        for (const t of tiers) assert.ok(TIER_ORDER.includes(t),
            `${k} has JLPT tier "${t}", which is not one of ${TIER_ORDER.join('/')}`);
        // Easiest first, and no tier twice: the chip colours itself from tiers[0] and prints the
        // rest as a range, so an unsorted value would both mis-colour and misread.
        const idx = tiers.map(t => TIER_ORDER.indexOf(t));
        assert.deepStrictEqual(idx, [...idx].sort((x, y) => x - y),
            `${k}'s JLPT tiers "${data[k].j}" are not in easiest-first order`);
        assert.strictEqual(new Set(tiers).size, tiers.length,
            `${k}'s JLPT tiers "${data[k].j}" repeat a tier`);
        assert.ok(data[k].w, `${k} has a JLPT tier but no Word Match level — the tier comes from `
            + 'the level, so one cannot exist without the other');
    }

    const withW = keys.filter(k => data[k].w).length;
    const withP = keys.filter(k => data[k].p).length;
    const withR = keys.filter(k => data[k].r).length;
    for (const [name, n, floor] of [['JLPT tier', withJ, 1000], ['Word Match', withW, 1000],
                                    ['phonetics', withP, 1500], ['reader', withR, 300]]) {
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
        + `${withJ} JLPT tier / ${withW} Word Match / ${withP} phonetics / ${withR} reader, `
        + 'every target resolves');
};
