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
    assert.ok(data.length > 250,
        `grammar-index.js has only ${data.length} points — expected 264. ~218 means the `
        + 'hand-authored foundation has stopped merging; ~113 means the generator has also '
        + 'stopped resolving through tools/grammar-extra.json and is filing GRAMMAR_POOLS '
        + 'members only again.');

    // The foundation exists because the drill cannot produce these. If を is missing the tab is
    // back to being an index of confusable pairs while calling itself a grammar dictionary.
    const heads0 = new Set(data.map((e) => e.g));
    for (const core of ['を', 'は', 'に', 'で', 'も', 'へ', 'の', 'か', 'まで', 'より']) {
        assert.ok(heads0.has(core), `the core particle ${core} has no entry`);
    }
    const n5 = data.filter((e) => e.j === 'N5').length;
    assert.ok(n5 > 30, `only ${n5} N5 points — the foundation layer is not merging`);

    // No point is its own near-synonym. The two sides of a swap can resolve to the SAME headword
    // (つづける / つづけている both file under つづける), and a row listing itself as the thing it
    // is confused with reads as a rendering fault.
    for (const e of data) {
        assert.ok(!e.a.includes(e.g), `"${e.g}" lists itself as a near-synonym`);
    }

    // Every string tested on a sentence is classified exactly once. A key in both lists would
    // resolve by whichever the generator checks first, which is not a decision anyone made.
    const extra = JSON.parse(fs.readFileSync(
        path.join(REPO, 'tools', 'grammar-extra.json'), 'utf8'));
    const both = Object.keys(extra.points).filter((k) => k in extra.notGrammar);
    assert.strictEqual(both.length, 0,
        `tools/grammar-extra.json files ${both.join(', ')} as both a point and not grammar`);
    // A rejection without a reason is the half that cannot be rederived later.
    for (const [k, why] of Object.entries(extra.notGrammar)) {
        assert.ok(why && why.trim().length > 10,
            `tools/grammar-extra.json rejects "${k}" without saying why`);
    }
    // Every headword is either a real entry or merged into one.
    const heads = new Set(data.map((e) => e.g));
    const orphans = [...new Set(Object.values(extra.points))].filter((h) => !heads.has(h));
    assert.strictEqual(orphans.length, 0,
        `tools/grammar-extra.json files ${orphans.join(', ')} under a headword that has no entry`);

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
        // A derived point links into the drill, so its track and level have to be real. A
        // hand-authored foundation point carries NEITHER, on purpose: no level of the drill
        // teaches it, so the panel prints no practise link. Half a pair would build
        // `?track=undefined`, so they are required to be absent together.
        if (e.t === undefined && e.l === undefined) {
            assert.ok(e.j, `"${e.g}" is a foundation point with no JLPT level — these are `
                + 'classified as they are written, so one is always expected');
        } else {
            assert.ok(e.t === 'foundation' || e.t === 'advanced', `"${e.g}" has track "${e.t}"`);
            assert.ok(Number.isInteger(e.l) && e.l >= 1 && e.l <= 20,
                `"${e.g}" points at level ${e.l}, which is outside 1-20`);
        }
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
    assert.ok(filed > 250,
        `only ${filed} of ${data.length} points carry a JLPT level — tools/grammar-jlpt.json `
        + 'looks stale or empty');

    // Every example must carry real furigana markup, not the 漢字[かんじ] shorthand the
    // foundation file is authored in -- an unexpanded one would print the brackets literally
    // and would not be searchable by reading, since grReadings only reads <rt>.
    for (const e of data) {
        for (const v of e.v) {
            assert.ok(!/[一-鿿][[［]/.test(v.j),
                `"${e.g}" has an example with unexpanded furigana shorthand: ${v.j}`);
        }
    }

    const authored = data.filter((e) => e.t === undefined).length;
    return `grammar-index.js matches grammar-data.js: ${data.length} points `
        + `(${authored} hand-authored, ${data.length - authored} derived), `
        + `${filed} with a JLPT level, `
        + `${data.reduce((n, e) => n + e.v.length, 0)} examples, all with MN`;
};
