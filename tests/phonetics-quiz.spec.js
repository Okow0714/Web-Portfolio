// phonetics-quiz-data.js is generated from phonetics-data.js. Nothing at runtime notices when
// the two fall out of step -- the drill simply asks about shapes the board no longer has, or
// misses shapes it does. This is the same silent drift tests/crosslink-index.spec.js exists for.
//
// It also re-checks the answer matcher against every answer in the committed file: a drill that
// rejects a correct answer is worse than no drill, and that is a property of the pair, not of
// either file alone.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { execFileSync } = require('child_process');

module.exports = async function () {
    const REPO = path.join(__dirname, '..');
    const OUT = path.join(REPO, 'phonetics-quiz-data.js');
    const committed = fs.readFileSync(OUT, 'utf8');

    // Regenerate over a backup: a test must leave the tree as it found it, pass or fail.
    let regenerated;
    try {
        execFileSync(process.execPath, [path.join(REPO, 'tools', 'build-phonetics-quiz.js')],
            { cwd: REPO, stdio: 'pipe' });
        regenerated = fs.readFileSync(OUT, 'utf8');
    } finally {
        fs.writeFileSync(OUT, committed);
    }
    assert.strictEqual(regenerated, committed,
        'phonetics-quiz-data.js is out of date with phonetics-data.js — run '
        + '`node tools/build-phonetics-quiz.js` and commit the result');

    const marker = 'const PHONETICS_QUIZ = ';
    const end = committed.indexOf('\n\n// How many checkpoints');
    const QUIZ = JSON.parse(committed.slice(committed.indexOf(marker) + marker.length, end)
        .replace(/;\s*$/, '').trim());
    const cpMarker = 'const PHONETICS_CHECKPOINTS = ';
    const CP = JSON.parse(committed.slice(committed.indexOf(cpMarker) + cpMarker.length)
        .replace(/;\s*$/, '').trim());

    const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
    let families = 0, sounds = 0;
    for (const lv of LEVELS) {
        assert.ok(Array.isArray(QUIZ[lv]) && QUIZ[lv].length, `${lv} has no families`);
        assert.ok(CP[lv] >= 1, `${lv} has no checkpoint count`);
        for (const f of QUIZ[lv]) {
            families++;
            sounds += f.s.length;
            // a board wants three spokes, and a question wants an answer more than one kanji shares
            assert.ok(f.m.length >= 3, `${lv} ${f.c} has only ${f.m.length} members`);
            assert.ok(f.s.length >= 1, `${lv} ${f.c} has no shared sound`);
            for (const s of f.s) {
                const holders = f.m.filter(m => m.on.indexOf(s) >= 0).length;
                assert.ok(holders >= 2,
                    `${lv} ${f.c}: "${s}" is an answer but only ${holders} member takes it`);
            }
            for (const m of f.m) {
                assert.ok(m.k && m.lv && Array.isArray(m.on),
                    `${lv} ${f.c}: malformed member ${JSON.stringify(m)}`);
            }
        }
    }

    // The matcher is only useful if it accepts what a learner actually types. Every answer must
    // match itself in katakana and in hiragana; the romaji paths are covered by hand cases here.
    const KANA = (function () {
        const src = fs.readFileSync(path.join(REPO, 'kana-match.js'), 'utf8');
        const sandbox = {};
        new Function('globalThis', src + '\nglobalThis.__K = KANA;')(sandbox);
        return sandbox.__K;
    })();

    const toHira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
    let checked = 0;
    for (const lv of LEVELS) {
        for (const f of QUIZ[lv]) {
            for (const s of f.s) {
                checked++;
                assert.ok(KANA.matches(s, [s]), `${s} does not match itself in katakana`);
                assert.ok(KANA.matches(toHira(s), [s]), `${s} does not match when typed in hiragana`);
            }
        }
    }

    for (const [input, answers, want] of [
        ['chuu', ['チュウ'], true], ['chū', ['チュウ'], true], ['tyuu', ['チュウ'], true],
        ['shou', ['ショウ'], true], ['syou', ['ショウ'], true],
        ['ji', ['ジ'], true], ['zi', ['ジ'], true],
        ['fun', ['フン'], true], ['hun', ['フン'], true],
        ['kann', ['カン'], true], ['sei', ['セイ'], true],
        ['chu', ['チュウ'], false], ['ka', ['カン'], false], ['', ['ジ'], false],
    ]) {
        assert.strictEqual(!!KANA.matches(input, answers), want,
            `matcher: "${input}" against ${answers.join('/')} should be ${want}`);
    }

    // The board carries its own copy of the stage counts (phonetics.js's CHECKPOINTS), because
    // phonetics.html does not load this file. Two copies of five integers drift silently: the
    // board would offer a stage the drill's link cannot mean.
    const boardSrc = fs.readFileSync(path.join(REPO, 'phonetics.js'), 'utf8');
    const boardLine = boardSrc.match(/const CHECKPOINTS = (\{[^}]*\});/);
    assert.ok(boardLine, 'phonetics.js no longer declares CHECKPOINTS — did it move?');
    const BOARD = JSON.parse(boardLine[1].replace(/([A-Z0-9]+):/g, '"$1":'));
    for (const lv of LEVELS) {
        assert.strictEqual(BOARD[lv], CP[lv],
            `${lv}: the board cuts it into ${BOARD[lv]} stages but the drill into ${CP[lv]}`);
    }

    console.log(`      phonetics quiz data current — ${families} families, ${sounds} answers, `
        + `${checked} matched in both kana; checkpoints `
        + LEVELS.map(l => l + ':' + CP[l]).join(' '));
};
