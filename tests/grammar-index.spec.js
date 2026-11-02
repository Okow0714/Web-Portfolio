// grammar-index.js is generated from grammar-data.js, and nothing at runtime notices when the
// two fall out of step -- the dictionary's grammar tab would simply explain a drill that no
// longer says that, which is the same silent drift tests/crosslink-index.spec.js and
// tests/progress-totals.spec.js already exist for.
//
// It also guards the one property this feature rests on: EVERY string the tab shows was written
// by the site's author inside grammar-data.js. If a future grammar point ships without
// `explanationMn`, the generator must fail rather than fill the gap from the English -- so the
// shipped file must never contain an entry with an empty Mongolian explanation.
//
// No browser needed: a pure data check, so it runs in milliseconds.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { execFileSync } = require('child_process');

module.exports = async function () {
    const REPO = path.join(__dirname, '..');
    const OUT = path.join(REPO, 'grammar-index.js');

    const committed = fs.readFileSync(OUT, 'utf8');

    // Regenerate into the real path but restore it afterwards: a test must not leave the working
    // tree different from how it found it, pass or fail.
    let regenerated;
    try {
        execFileSync(process.execPath, [path.join(REPO, 'tools', 'build-grammar-index.js')],
            { cwd: REPO, stdio: 'pipe' });
        regenerated = fs.readFileSync(OUT, 'utf8');
    } finally {
        fs.writeFileSync(OUT, committed);
    }

    assert.strictEqual(regenerated, committed,
        'grammar-index.js is out of date with grammar-data.js — run '
        + '`node tools/build-grammar-index.js` and commit the result');

    const marker = 'const GRAMMAR_INDEX = ';
    const data = JSON.parse(committed.slice(committed.indexOf(marker) + marker.length)
        .replace(/;\s*$/, '').trim());

    // A silent collapse (a renamed field, a changed pool) would pass the equality check above,
    // since the generator and the check read the same source.
    assert.ok(data.length > 100,
        `grammar-index.js has only ${data.length} points — expected the full pool (113)`);

    for (const e of data) {
        assert.ok(e.g, 'an entry has no grammar point');
        // The feature's whole premise. An entry without this would be a card with nothing on it,
        // or an invitation to machine-translate the English into it.
        assert.ok(e.m && e.m.trim(),
            `"${e.g}" has no Mongolian explanation — the tab must never show text the site's `
            + 'author did not write');
        assert.ok(e.e && e.e.trim(), `"${e.g}" has no English explanation`);
        assert.ok(e.v.length > 0, `"${e.g}" has no example sentences`);
        for (const v of e.v) {
            assert.ok(v.j && v.j.trim(), `"${e.g}" has an example with no Japanese`);
            assert.ok(v.m && v.m.trim(),
                `"${e.g}" has an example with no Mongolian translation`);
        }
        // The level link has to point at a real track and a level that exists.
        assert.ok(e.t === 'foundation' || e.t === 'advanced', `"${e.g}" has track "${e.t}"`);
        assert.ok(Number.isInteger(e.l) && e.l >= 1 && e.l <= 20,
            `"${e.g}" points at level ${e.l}, which is outside 1-20`);
        // A JLPT level is optional -- a point this repo does not file shows no chip -- but when
        // present it must be one of the five, since dictionary.css keys the colour off it and an
        // unknown value renders an unstyled chip rather than an error.
        if (e.j) {
            assert.ok(['N5', 'N4', 'N3', 'N2', 'N1'].includes(e.j),
                `"${e.g}" has JLPT level "${e.j}"`);
        }
    }

    // The per-point JLPT filing is a separate build-time input, and the generator reads it by
    // name. If it is deleted or renamed the build throws, but a stale one that classifies
    // nothing would quietly ship a tab with no level chips at all.
    const filed = data.filter((e) => e.j).length;
    assert.ok(filed > 80,
        `only ${filed} of ${data.length} points carry a JLPT level — tools/grammar-jlpt.json `
        + 'looks stale or empty');

    return `grammar-index.js matches grammar-data.js: ${data.length} points, `
        + `${filed} with a JLPT level, `
        + `${data.reduce((n, e) => n + e.v.length, 0)} examples, all with MN`;
};
