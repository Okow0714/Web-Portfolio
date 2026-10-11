// Generates dictionary-crosslink.js — the index that lets dictionary.html say which other tools
// a word appears in, without loading those tools' data.
//
// Run: node tools/build-crosslink-index.js
// Re-run whenever game-words.js, reading-texts.js or phonetics-kanji-index.js changes.
// tests/crosslink-index.spec.js fails CI if the committed output no longer matches the sources,
// which is the guard this needs: Word Match was shown as 50 levels long after it had 60, and an
// index like this drifts the same silent way.
//
// Why an index at all: the three source files come to ~2.9MB, and dictionary.html already ships
// 1.4MB of its own. The index is a fraction of that and carries only what a badge needs.
//
// Shape, kept terse because every byte is multiplied by 2,676 entries:
//   { "会う": { j:"N4", w:[7], p:[["会","会",2]], r:[["foundation-l9-3","駅で待ち合わせ",9]] } }
//     j  JLPT tier(s), hyphen-joined     -> just a label, no link
//
// The tier comes from three sources, in this order of preference:
//   1. game-words.js      -- the level a word sits at in Word Match, for the 1,500 it carries.
//                            Preferred so the dictionary never disagrees with the game.
//   2. tools/jlpt-levels.json        -- the full elzup/jlpt-word-list (MIT), 7,836 words.
//   3. tools/jlpt-levels-manual.json -- the 801 entries on no JLPT list at any level, levelled
//                            by hand. Ranked by usage INCLUDING the kana spelling, not by kanji
//                            difficulty: 挨拶 and 嬉しい are everyday words whose kanji are rare,
//                            and 硝子 is normally written ガラス, so a kanji-led ranking would
//                            have put all three at N1.
// Keeping them in separate files IS the provenance record -- that is why the shipped index
// carries no "which source" flag, and why a hand-assigned level is not visually distinct.
//     w  Word Match level numbers        -> game.html?level=N
//     p  [kanji, family, memberCount]    -> phonetics.html?kanji=K
//     r  [textId, title, levelNum]       -> reading.html?text=ID
// Titles are carried so the popover can name a destination without loading reading-texts.js.
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const OUT = path.join(REPO, 'dictionary-crosslink.js');

function load(file, name) {
    const text = fs.readFileSync(path.join(REPO, file), 'utf8');
    const marker = 'const ' + name + ' = ';
    const i = text.indexOf(marker);
    if (i < 0) throw new Error(`${file} no longer declares "const ${name} = " — did it get renamed?`);
    return JSON.parse(text.slice(i + marker.length).replace(/;\s*$/, '').trim());
}

const readJson = f => JSON.parse(fs.readFileSync(path.join(REPO, 'tools', f), 'utf8'));
// Committed rather than re-downloaded: tests/crosslink-index.spec.js regenerates this index to
// detect drift, and must not need the network to do it.
const JLPT_LISTED = readJson('jlpt-levels.json');
const JLPT_MANUAL = readJson('jlpt-levels-manual.json');

const MNJP = load('mnjp-data.js', 'MNJP_ENTRIES');
const WORD = load('game-words.js', 'WORD_LEVELS');
const PHON = load('phonetics-kanji-index.js', 'PHONETICS_KANJI_INDEX');
const READ = load('reading-texts.js', 'READING_TRACKS');

// jp -> [level, ...]. Measured: always exactly one, but the array costs nothing and a future
// level that reuses a word should not silently overwrite the first.
//
// jp -> Set of JLPT tiers, from the same walk. A Word Match level declares its own tier and its
// words are the curated elzup/jlpt-word-list, so the tier of the level a word sits in is that
// word's JLPT level -- there is no separate per-word field to read. Measured: every one of the
// 1,500 matched words is in exactly one tier, so this is a set only to keep a future overlap
// honest rather than because one exists today.
const wm = new Map();
const tier = new Map();
for (const lv of Object.values(WORD)) {
    for (const set of lv.sets) for (const w of set) {
        if (!wm.has(w.jp)) wm.set(w.jp, []);
        if (!wm.get(w.jp).includes(lv.level)) wm.get(w.jp).push(lv.level);
        if (lv.jlpt) {
            if (!tier.has(w.jp)) tier.set(w.jp, new Set());
            tier.get(w.jp).add(lv.jlpt);
        }
    }
}

// Easiest first, so a range reads in the order a learner would meet it.
const TIER_ORDER = ['N5', 'N4', 'N3', 'N2', 'N1'];

// The dictionary stores 質問する and 頑固な where a word list stores 質問 and 頑固, so a direct
// lookup misses them. Measured: this normalisation alone lifts list coverage 69.4% -> 77.4%.
// Matching on READING instead was tried and rejected -- it paired 錨 (anchor) with 怒り (anger).
function surfaceVariants(s) {
    const v = [s];
    if (s.endsWith('する')) v.push(s.slice(0, -2));
    if (s.endsWith('な') || s.endsWith('の') || s.endsWith('だ')) v.push(s.slice(0, -1));
    return v;
}

// Returns the tier string for a word, or '' when nothing knows it. Word Match first so the
// dictionary and the game never disagree on a word they both carry.
function levelFor(jp) {
    if (tier.has(jp)) return TIER_ORDER.filter(x => tier.get(jp).has(x)).join('-');
    for (const v of surfaceVariants(jp)) {
        if (JLPT_LISTED[v]) return JLPT_LISTED[v];
    }
    if (JLPT_MANUAL[jp]) return JLPT_MANUAL[jp];
    return '';
}

// surface -> [[textId, title, levelNum], ...]. Half of matched words are in several texts, and
// も is in 45, so this one genuinely has to be a list.
const rd = new Map();
for (const track of READ) {
    for (const lv of track.levels) for (const tx of lv.texts) {
        for (const w of tx.words || []) {
            if (!w.surface) continue;
            if (!rd.has(w.surface)) rd.set(w.surface, []);
            const list = rd.get(w.surface);
            if (!list.some(e => e[0] === tx.id)) list.push([tx.id, tx.title || tx.id, lv.levelNum]);
        }
    }
}

const KANJI = /[一-龯]/g;
const index = {};
let counts = { j: 0, w: 0, p: 0, r: 0, any: 0 };
for (const e of MNJP) {
    const rec = {};
    const lvl = levelFor(e.jp);
    if (lvl) { rec.j = lvl; counts.j++; }
    if (wm.has(e.jp)) { rec.w = wm.get(e.jp); counts.w++; }

    const fams = [];
    const seen = new Set();
    for (const ch of (e.jp.match(KANJI) || [])) {
        const p = PHON[ch];
        if (!p || seen.has(p.phonetic)) continue;
        seen.add(p.phonetic);
        fams.push([ch, p.phonetic, p.count]);
    }
    if (fams.length) { rec.p = fams; counts.p++; }

    if (rd.has(e.jp)) { rec.r = rd.get(e.jp); counts.r++; }

    if (Object.keys(rec).length) { index[e.jp] = rec; counts.any++; }
}

const body = JSON.stringify(index);
const out = `// GENERATED by tools/build-crosslink-index.js — do not edit by hand.
//
// Which other tools each dictionary word appears in, so dictionary.html can show cross-tool
// badges without loading game-words.js, reading-texts.js and phonetics-kanji-index.js (~2.9MB
// between them). Regenerate after changing any of those three; tests/crosslink-index.spec.js
// fails if this file and they disagree.
//
//   j  JLPT tier(s), hyphen-joined      -> a label only, not a link
//   w  Word Match level numbers         -> game.html?level=N
//   p  [kanji, family, memberCount]     -> phonetics.html?kanji=K
//   r  [textId, title, levelNum]        -> reading.html?text=ID
//
// ${counts.j} of ${MNJP.length} entries carry a JLPT tier; ${counts.any} appear in at
// least one tool or carry a tier.
const DICTIONARY_CROSSLINK = ${body};
`;
fs.writeFileSync(OUT, out);

const kb = n => (n / 1024).toFixed(0) + ' KB';
const gz = require('zlib').gzipSync(Buffer.from(out)).length;
console.log(`  dictionary-crosslink.js  ${kb(out.length)} raw, ${kb(gz)} gzipped`);
console.log(`  ${counts.any} entries indexed — JLPT tier ${counts.j}, Word Match ${counts.w}, `
    + `phonetics ${counts.p}, reader ${counts.r}`);
