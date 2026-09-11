// The dashboard and home page divide each learner's progress by how much content every tool has.
// Those totals are written down once, in progress-shared.js, and passed to the score function --
// but nothing tied them to the content itself, and they drifted twice: both pages said Word Match
// had 50 levels after it had 60, and the score SQL divided Dokkai by 60 texts after it had 72.
//
// This counts the real content from the data files and fails if progress-shared.js disagrees, or if
// the "0 / N" placeholder text shown before the numbers load disagrees. Runs in Node against the
// files on disk; it does not need the page.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const load = (file, name) => new Function(read(file) + '; return ' + name + ';')();

module.exports = async function run(page, assert) {
    const words = load('game-words.js', 'WORD_LEVELS');
    const grammar = load('grammar-data.js', 'GRAMMAR_LEVELS');
    const reading = load('reading-texts.js', 'READING_TRACKS');

    const actual = {
        wordMatchLevels: words.length,
        grammarLevels: Object.values(grammar).reduce((n, track) => n + track.length, 0),
        readingTexts: reading.reduce((n, tr) => n + tr.levels.reduce((m, lv) => m + lv.texts.length, 0), 0),
    };

    const sandbox = {};
    new Function('window', read('progress-shared.js'))(sandbox);
    const written = sandbox.KhanProgress.TOTALS;

    for (const k of Object.keys(actual)) {
        assert.strictEqual(written[k], actual[k],
            `progress-shared.js says ${k} = ${written[k]}, but the data files have ${actual[k]}`);
    }

    // the placeholder text each page shows before its numbers load
    const placeholders = [
        ['dashboard.html', 'dash-game-fraction', `0 / ${actual.wordMatchLevels} levels`],
        ['dashboard.html', 'dash-grammar-fraction', `0 / ${actual.grammarLevels} levels`],
        ['dashboard.html', 'dash-reading-fraction', `0 / ${actual.readingTexts} texts`],
        ['index.html', 'hub-progress-game-frac', `0 / ${actual.wordMatchLevels} levels`],
        ['index.html', 'hub-progress-grammar-frac', `0 / ${actual.grammarLevels} levels`],
        ['index.html', 'hub-progress-reading-frac', `0 / ${actual.readingTexts} texts`],
    ];
    for (const [file, id, want] of placeholders) {
        const m = read(file).match(new RegExp('id="' + id + '">([^<]*)<'));
        assert.ok(m, `${file}: #${id} not found`);
        assert.strictEqual(m[1], want, `${file}: #${id} reads "${m[1]}", expected "${want}"`);
    }
};
