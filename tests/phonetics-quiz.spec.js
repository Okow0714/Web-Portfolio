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

    const sandbox = {};
    new Function('g', committed + '\ng.QUIZ = PHONETICS_QUIZ; g.EX = PHONETICS_EX;'
        + ' g.CP = PHONETICS_CHECKPOINTS;')(sandbox);
    const { QUIZ, EX, CP } = sandbox;

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

    // Every stored word must really read its kanji with the sound it claims, and position is the
    // evidence: a kanji's reading sits where the kanji sits, so a sound that merely appears
    // somewhere in the reading does not count. This is the whole reason the generator does any
    // work, and the one thing most worth holding still -- a wrong example argues against the
    // pattern the page exists to teach.
    const toHira = s2 => s2.replace(/[\u30a1-\u30f6]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
    const KANJI = /[\u4e00-\u9faf]/;
    let words = 0, glossed = 0, changed = 0;

    for (const [kanji, ex] of Object.entries(EX)) {
        words++;
        if (ex.mn) glossed++;
        assert.ok(ex.w && ex.r && ex.s, `${kanji}: incomplete example ${JSON.stringify(ex)}`);
        assert.ok(ex.w.indexOf(kanji) >= 0, `${kanji}: its example word ${ex.w} does not contain it`);
        assert.strictEqual(toHira(ex.r), ex.r, `${kanji}: reading ${ex.r} is not hiragana`);

        // a changed sound has to say so, and say what it changed to
        if (ex.k) {
            changed++;
            assert.ok(['voiced', 'clipped'].indexOf(ex.k) >= 0, `${kanji}: unknown change "${ex.k}"`);
            assert.ok(ex.f, `${kanji}: marked ${ex.k} but carries no changed form`);
            assert.notStrictEqual(ex.f, ex.s, `${kanji}: marked ${ex.k} but the form is unchanged`);
        } else {
            assert.ok(!ex.f, `${kanji}: carries a changed form but is not marked as changed`);
        }

        const form = ex.k ? ex.f : ex.s;
        const chars = [...ex.w];
        const i = chars.indexOf(kanji);
        const kanjiCount = chars.filter(c => KANJI.test(c)).length;
        let placed;
        if (i === 0) {
            placed = ex.r.startsWith(form);
        } else if (!chars.slice(i + 1).some(c => KANJI.test(c))) {
            const tail = chars.slice(i + 1).join('');
            placed = ex.r.endsWith(tail)
                && ex.r.slice(0, ex.r.length - tail.length).endsWith(form);
        } else {
            placed = kanjiCount <= 3 && ex.r.indexOf(form) > 0;
        }
        assert.ok(placed,
            `${kanji}: ${ex.w} (${ex.r}) does not read it as ${form} where the kanji sits`);
    }

    // An example that IS the headword demonstrates nothing -- the node already prints that kanji
    // and its meaning. A handful are unavoidable (no compound in the pool reads them with the
    // family's sound at all); a regression in the generator's preference would send this up.
    const selfRef = Object.entries(EX).filter(([k, ex]) => ex.w === k).length;
    assert.ok(selfRef <= 25,
        `${selfRef} examples are just the headword again — the compound preference has slipped`);

    // The sound a word shows must be one its family actually shares, or the page would be
    // teaching a reading the board never predicted.
    const famSounds = new Map();
    for (const lv of LEVELS) {
        for (const f of QUIZ[lv]) {
            for (const m2 of f.m) {
                if (!famSounds.has(m2.k)) famSounds.set(m2.k, new Set());
                f.s.forEach(x => famSounds.get(m2.k).add(toHira(x)));
            }
        }
    }
    for (const [kanji, ex] of Object.entries(EX)) {
        const sounds = famSounds.get(kanji);
        assert.ok(sounds, `${kanji} has an example but belongs to no family in the quiz set`);
        assert.ok(sounds.has(ex.s),
            `${kanji}: word shows ${ex.s}, which none of its families share`);
    }

    // The matcher is only useful if it accepts what a learner actually types. Every answer must
    // match itself in katakana and in hiragana; the romaji paths are covered by hand cases here.
    const KANA = (function () {
        const src = fs.readFileSync(path.join(REPO, 'kana-match.js'), 'utf8');
        const sandbox = {};
        new Function('globalThis', src + '\nglobalThis.__K = KANA;')(sandbox);
        return sandbox.__K;
    })();

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

    // The board and the drill both read PHONETICS_CHECKPOINTS straight out of this file now, so
    // there is no second copy of these five integers left to drift. What does still need saying
    // is that the board page loads the file at all: without it the gate renders five levels with
    // nothing behind them, and nothing else on the page would complain.
    const boardHtml = fs.readFileSync(path.join(REPO, 'phonetics.html'), 'utf8');
    assert.ok(boardHtml.includes('phonetics-quiz-data.js'),
        'phonetics.html no longer loads phonetics-quiz-data.js — the board would have no data');
    const boardSrc = fs.readFileSync(path.join(REPO, 'phonetics.js'), 'utf8');
    assert.ok(/PHONETICS_CHECKPOINTS/.test(boardSrc),
        'phonetics.js no longer reads PHONETICS_CHECKPOINTS — has a second copy crept back?');

    console.log(`      phonetics quiz data current — ${families} families, ${sounds} answers, `
        + `${checked} matched in both kana; ${words} checked words (${glossed} glossed, `
        + `${changed} with a sound change); checkpoints `
        + LEVELS.map(l => l + ':' + CP[l]).join(' '));
};
