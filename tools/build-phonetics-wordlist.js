// Lists the board kanji that still have no example word, with the reading each one needs and a
// link to look it up. Writes tools/phonetics-words-todo.md (the worklist) and refreshes the empty
// rows of tools/phonetics-words-manual.json (what the generator reads back).
//
// Run: node tools/build-phonetics-wordlist.js
//
// Why by hand at all: every word in phonetics-quiz-data.js is derived from data already in this
// repo, and the repo is out of vocabulary for these kanji -- most appear in no word here at all.
// The Japanese half is easy to look up; the MONGOLIAN is the part no file has and no machine
// should guess, which is the same reason tools/jlpt-levels-manual.json exists.
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MANUAL = path.join(__dirname, 'phonetics-words-manual.json');
const TODO = path.join(__dirname, 'phonetics-words-todo.md');

function slurp(file, marker, end) {
    const t = fs.readFileSync(path.join(REPO, file), 'utf8');
    const a = t.indexOf(marker) + marker.length;
    const b = end ? t.indexOf(end) : t.length;
    return JSON.parse(t.slice(a, b).replace(/;\s*$/, '').trim());
}

const QUIZ = slurp('phonetics-quiz-data.js', 'const PHONETICS_QUIZ = ', '\n\nconst PHONETICS_EX');
const EX = slurp('phonetics-quiz-data.js', 'const PHONETICS_EX = ', '\n\n// How many checkpoints');
const toHira = s => (s || '').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));

const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const need = new Map();
for (const lv of LEVELS) {
    for (const fam of QUIZ[lv]) {
        for (const m of fam.m) {
            if (EX[m.k]) continue;
            if (!need.has(m.k)) {
                need.set(m.k, { lv: m.lv, mn: m.mn, on: new Set(), want: new Set(), fam: new Set() });
            }
            const n = need.get(m.k);
            m.on.forEach(o => n.on.add(toHira(o)));
            fam.s.forEach(s => n.want.add(toHira(s)));
            n.fam.add(fam.c);
        }
    }
}

const rows = [...need.entries()].sort((a, b) =>
    LEVELS.indexOf(a[1].lv) - LEVELS.indexOf(b[1].lv) || a[0].localeCompare(b[0]));

// --- the worklist ---------------------------------------------------------------------------
let md = `# Example words still needed

${rows.length} of the 684 kanji on the Phonetics board have no example word. Every word in
\`phonetics-quiz-data.js\` is derived from data already in this repo, and the repo has run out of
vocabulary for these: most of them appear in no word in any file here.

**What each row needs:** one word that contains the kanji and reads it as the sound in the
"needs" column, plus that word's reading in hiragana and a Mongolian translation. A two-kanji
compound is ideal. The Japanese is quick to look up; the Mongolian is the part no file here has.

**Where to look:** the jisho.org link opens that kanji's page, which lists its readings and, under
each one, the compounds that use it. Pick one from the row for the reading you need.

**Where to put it:** \`tools/phonetics-words-manual.json\`, which has a blank row waiting for each
of these. Fill in \`w\` (the word), \`r\` (its reading in hiragana) and \`mn\` (the Mongolian). Rows
left blank are ignored, so it can be done a handful at a time. Then run
\`node tools/build-phonetics-quiz.js\` and the board picks them up.

A row is checked the same way every other word is: the reading has to show the kanji's sound
*where the kanji sits*, so 甲虫 does not count as 虫 reading こう. A row that fails that check
fails the build rather than reaching the page.

| # | kanji | JLPT | meaning | needs | its readings | shape | look up |
|---|---|---|---|---|---|---|---|
`;
rows.forEach(([k, n], i) => {
    const url = 'https://jisho.org/search/' + encodeURIComponent(k) + '%20%23kanji';
    md += `| ${i + 1} | ${k} | ${n.lv} | ${n.mn || ''} | ${[...n.want].join(' / ')} `
        + `| ${[...n.on].join(' / ')} | ${[...n.fam].join(' ')} | [jisho](${url}) |\n`;
});
fs.writeFileSync(TODO, md);

// --- the file the generator reads back --------------------------------------------------------
let manual = {};
if (fs.existsSync(MANUAL)) manual = JSON.parse(fs.readFileSync(MANUAL, 'utf8'));
let added = 0, filled = 0;
for (const [k, n] of rows) {
    if (manual[k]) { if (manual[k].w) filled++; continue; }
    manual[k] = { w: '', r: '', mn: '', _needs: [...n.want].join('/'), _reads: [...n.on].join('/') };
    added++;
}
// keep it readable: the person editing this is reading it, not a parser
const ordered = {};
for (const [k] of rows) if (manual[k]) ordered[k] = manual[k];
for (const k of Object.keys(manual)) if (!ordered[k]) ordered[k] = manual[k];
fs.writeFileSync(MANUAL, JSON.stringify(ordered, null, 2) + '\n');

console.log(`  ${rows.length} kanji still need a word`);
console.log(`  tools/phonetics-words-todo.md     worklist, with a jisho link each`);
console.log(`  tools/phonetics-words-manual.json ${added} blank rows added, ${filled} already filled`);
