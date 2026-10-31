// Build kanji-index.js: one compact record per kanji that the dictionary's own words use.
//
// Why a new file at all: the repo already carries per-kanji readings and meanings, but only for
// kanji that sit in a phonetic family of three or more (phonetics-data.js, 1,128; the generated
// phonetics-quiz-data.js, 684). Measured against the words dictionary.html actually lists, that
// is 60.3% of distinct kanji and 47.9% of kanji-bearing entries -- and the missing ones are the
// COMMONEST characters (出 大 学 合 入 食 行 見 言 書 ...), because a frequent kanji is no more
// likely to have phonetic siblings than a rare one. A breakdown that is absent on 人 and 学 is
// worse than none at all, so the readings and English meanings come from KANJIDIC2 instead,
// which covers every kanji in the file.
//
// LICENSING: KANJIDIC2 is EDRDG, CC BY-SA 4.0 -- the same ShareAlike terms Kanjium already puts
// on game-words.js, phonetics-data.js and phonetics-kanji-index.js. So kanji-index.js joins
// that list in LICENSE and gets its own credit on credits.html. It is derived data (readings and
// glosses for a bounded set of kanji), not a republication of the dictionary.
//
// MONGOLIAN: KANJIDIC2 has no Mongolian, and this is a Mongolian-first site. Two sources in the
// repo are already hand-reviewed and are preferred over anything generated:
//   1. phonetics-quiz-data.js's per-member `mn` gloss (684 kanji)
//   2. mnjp-data.js entries whose whole headword IS one kanji (339) -- the site owner's own
//      Mongolian for that character, reviewed as dictionary copy
// tools/kanji-gloss-manual.json is the third, and wins over both, exactly as
// tools/phonetics-words-manual.json wins in the phonetics build.
//
// DRAFTS. Those two repo sources between them reach 677 of the 1,550 kanji, which left 32.5%
// of entries able to show an all-Mongolian breakdown. The remaining 873 were drafted in one
// pass and carry `"draft": true` in the manual file. A draft reaches the page exactly like a
// reviewed gloss -- it has to, or the feature stays two-thirds English -- so the flag is a
// WORKLIST, not a switch: tools/kanji-gloss-todo.md lists every one still carrying it, in the
// order that clears the most entries first. Drop the flag as each is confirmed; the count in
// this build's output is the progress bar. Nothing else in the repo reads `draft`.
//
// Usage: node build-kanji-index.js <path to kanjidic2.xml> <repo root> [--write]
const fs = require('fs');
const path = require('path');

const XML = process.argv[2];
const ROOT = process.argv[3];
const WRITE = process.argv.includes('--write');
if (!XML || !ROOT) { console.error('usage: node build-kanji-index.js <kanjidic2.xml> <repo> [--write]'); process.exit(2); }

const R = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
function slab(file, name, endMark) {
    const t = R(file);
    const head = 'const ' + name + ' = ';
    const a = t.indexOf(head) + head.length;
    const b = endMark ? t.lastIndexOf(';', t.indexOf(endMark)) : -1;
    return JSON.parse((b > 0 ? t.slice(a, b) : t.slice(a).replace(/;\s*$/, '')).trim());
}

// ---------------------------------------------------------------------------
// 1. which kanji do we actually need?
// ---------------------------------------------------------------------------
const MNJP = slab('mnjp-data.js', 'MNJP_ENTRIES');
const KANGO = slab('dictionary-data.js', 'DICTIONARY_ENTRIES');
const KAN = /[㐀-䶿一-鿿豈-﫿]/;

const want = new Set();
const useCount = new Map();
const note = ch => { want.add(ch); useCount.set(ch, (useCount.get(ch) || 0) + 1); };
for (const e of MNJP) for (const ch of e.jp) if (KAN.test(ch)) note(ch);
for (const e of KANGO) {
    for (const side of ['kango', 'wago']) {
        const v = e[side];
        const txt = typeof v === 'string' ? v : (v && v.text) || '';
        for (const ch of txt) if (KAN.test(ch)) note(ch);
    }
    for (const k of ['honorific', 'kenjougo', 'sonkeigo', 'text']) {
        if (typeof e[k] === 'string') for (const ch of e[k]) if (KAN.test(ch)) note(ch);
    }
}
console.log('kanji used by the two dictionary data files: ' + want.size);

// ---------------------------------------------------------------------------
// 2. hand-reviewed Mongolian already in the repo
// ---------------------------------------------------------------------------
const mnGloss = new Map();
const mnFrom = new Map();
const QUIZ = slab('phonetics-quiz-data.js', 'PHONETICS_QUIZ', 'const PHONETICS_EX');
for (const lv in QUIZ) for (const f of QUIZ[lv]) for (const m of f.m) {
    if (m.mn && !mnGloss.has(m.k)) { mnGloss.set(m.k, m.mn); mnFrom.set(m.k, 'phonetics'); }
}
const quizCount = mnGloss.size;
// a single-kanji headword in the MN-JP dictionary is the owner's own Mongolian for it, and
// beats the phonetics gloss: it was reviewed as dictionary copy rather than as a quiz label
let singles = 0;
for (const e of MNJP) {
    if ([...e.jp].length === 1 && KAN.test(e.jp) && e.mn) {
        mnGloss.set(e.jp, e.mn); mnFrom.set(e.jp, 'mnjp'); singles++;
    }
}
// the manual file wins over both, like tools/phonetics-words-manual.json in the phonetics build
let manual = {};
const drafts = new Set();
const MANUAL_PATH = path.join(ROOT, 'tools/kanji-gloss-manual.json');
if (fs.existsSync(MANUAL_PATH)) {
    manual = JSON.parse(fs.readFileSync(MANUAL_PATH, 'utf8'));
    for (const k in manual) {
        const row = manual[k];
        const v = typeof row === 'string' ? row : row.mn;
        if (!v) continue;
        mnGloss.set(k, v); mnFrom.set(k, 'manual');
        if (row && row.draft) drafts.add(k);
    }
}
const reviewed = Object.keys(manual).length - drafts.size;
console.log('  Mongolian from phonetics-quiz-data: ' + quizCount);
console.log('  Mongolian from single-kanji MN-JP headwords: ' + singles);
console.log('  Mongolian from tools/kanji-gloss-manual.json: ' + Object.keys(manual).length +
            '  (' + reviewed + ' confirmed, ' + drafts.size + ' still drafts)');

// ---------------------------------------------------------------------------
// 3. per-kanji JLPT, from the repo's own filing -- never KANJIDIC2's `jlpt`
//
// KANJIDIC2's jlpt field is the PRE-2010 four-level scale (1..4), the same trap
// elzup/jlpt-word-list set: its 1..4 are not N1..N4 and mapping them across would misfile
// most of the file. phonetics-data.js carries real N5..N1 tags per kanji, so that is the
// source, and a kanji it does not know simply has no level shown.
// ---------------------------------------------------------------------------
const PD = slab('phonetics-data.js', 'PHONETICS_DATA');
const lvl = new Map();
for (const lv in PD) for (const f of PD[lv]) for (const m of f.members) {
    if (m.level && !lvl.has(m.kanji)) lvl.set(m.kanji, m.level);
}
for (const lv in QUIZ) for (const f of QUIZ[lv]) for (const m of f.m) {
    if (m.lv && !lvl.has(m.k)) lvl.set(m.k, m.lv);
}
console.log('  JLPT level known for ' + [...want].filter(k => lvl.has(k)).length + ' of ' + want.size);

// ---------------------------------------------------------------------------
// 4. parse KANJIDIC2
//
// Read character by character with a streaming split rather than a DOM parse: the file is
// 15.6MB and only five fields per entry are wanted.
// ---------------------------------------------------------------------------
const xml = fs.readFileSync(XML, 'utf8');
const chars = xml.split('<character>');
console.log('KANJIDIC2 entries: ' + (chars.length - 1));

const pick = (blob, re) => { const out = []; let m; const r = new RegExp(re, 'g'); while ((m = r.exec(blob))) out.push(m[1]); return out; };
const unesc = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

const out = {};
let seen = 0;
for (let i = 1; i < chars.length; i++) {
    const blob = chars[i];
    const lit = (blob.match(/^\s*<literal>(.*?)<\/literal>/) || [])[1];
    if (!lit || !want.has(lit)) continue;
    seen++;
    // r_type is an attribute, so each reading tag has to be matched with its type
    const on = pick(blob, '<reading r_type="ja_on">([^<]*)</reading>');
    const kun = pick(blob, '<reading r_type="ja_kun">([^<]*)</reading>');
    // m_lang marks a translated meaning; an unqualified <meaning> is the English one
    const me = pick(blob, '<meaning>([^<]*)</meaning>').map(unesc);
    const st = (blob.match(/<stroke_count>(\d+)<\/stroke_count>/) || [])[1];
    const rec = {};
    if (on.length) rec.on = on.slice(0, 4);
    if (kun.length) rec.kun = kun.slice(0, 4);
    if (me.length) rec.me = me.slice(0, 4);
    if (st) rec.st = Number(st);
    if (mnGloss.has(lit)) rec.mn = mnGloss.get(lit);
    if (lvl.has(lit)) rec.lv = lvl.get(lit);
    out[lit] = rec;
}

const missing = [...want].filter(k => !out[k]);
console.log('matched in KANJIDIC2: ' + seen + (missing.length ? '   NOT FOUND: ' + missing.join(' ') : '   (every kanji found)'));

// ---------------------------------------------------------------------------
// 5. report coverage the way it will actually be experienced: per ENTRY, not per kanji
// ---------------------------------------------------------------------------
const kanjiOf = s => [...s].filter(c => KAN.test(c));
const withK = MNJP.filter(e => kanjiOf(e.jp).length);
const complete = f => withK.filter(e => kanjiOf(e.jp).every(f)).length;
const anyGloss = k => out[k] && (out[k].mn || (out[k].me && out[k].me.length));
const mnOnly = k => out[k] && out[k].mn;
const pc = (n, d) => (100 * n / d).toFixed(1) + '%';
console.log('');
console.log('  entries with kanji: ' + withK.length + ' of ' + MNJP.length);
console.log('  every kanji glossed at all:        ' + complete(anyGloss) + '  ' + pc(complete(anyGloss), withK.length));
console.log('  every kanji glossed in Mongolian:  ' + complete(mnOnly) + '  ' + pc(complete(mnOnly), withK.length));
console.log('  distinct kanji with a Mongolian gloss: ' + [...want].filter(mnOnly).length + ' of ' + want.size);

// The worklist, ranked by how many entries each kanji appears in -- reviewing the top of the
// list is worth more than reviewing the bottom, because those glosses are read far more often.
// A kanji with NO Mongolian at all is listed first, since it costs the page an English line.
const reach = new Map();
for (const e of withK) for (const k of kanjiOf(e.jp)) reach.set(k, (reach.get(k) || 0) + 1);

const noGloss = [...want].filter(k => !mnOnly(k));
const draftList = [...drafts].filter(k => out[k])
    .sort((a, b) => (reach.get(b) || 0) - (reach.get(a) || 0));
console.log('  kanji with NO Mongolian at all: ' + noGloss.length);
console.log('  Mongolian still unreviewed (drafts): ' + draftList.length);
if (draftList.length) {
    console.log('  most-read drafts:');
    for (let i = 0; i < Math.min(30, draftList.length); i += 10) {
        console.log('      ' + draftList.slice(i, i + 10).map(k => k + '(' + (reach.get(k) || 0) + ')').join(' '));
    }
}

if (!WRITE) { console.log('\n  dry run -- pass --write to emit kanji-index.js and the worklist'); process.exit(0); }

// ---------------------------------------------------------------------------
// 6. emit
// ---------------------------------------------------------------------------
const HEADER = `// GENERATED by tools/build-kanji-index.js -- do not edit by hand.
// Hand-written Mongolian glosses go in tools/kanji-gloss-manual.json, which this build reads
// back and which wins over every derived source.
//
// One record per kanji that dictionary.html's own words use (mnjp-data.js + dictionary-data.js),
// so the search result can break a word into its characters. Nothing else on the site loads it.
//
//   on  onyomi, カタカナ, at most 4        kun  kunyomi, ひらがな, at most 4
//   me  English meanings, at most 4        mn   one Mongolian gloss, where the repo has a
//                                               hand-reviewed one
//   st  stroke count                       lv   JLPT level, N5..N1, where this repo files one
//
// SOURCES, and why they are split:
//   * readings, English meanings and stroke counts: KANJIDIC2 (EDRDG, CC BY-SA 4.0). It is the
//     only source here that covers every kanji in the dictionary -- the repo's own per-kanji
//     data only reaches kanji sitting in a phonetic family of 3+, which is 60% of these and
//     misses 人 大 学 食 行 見 言 書, the ones a beginner looks up first.
//     KANJIDIC2 also carries a 'jlpt' field, which is NOT used: it is the pre-2010 four-level
//     scale, the same trap elzup/jlpt-word-list sets, so 'lv' comes from this repo's own N5..N1
//     filing in phonetics-data.js and is simply absent for a kanji that repo does not file.
//   * Mongolian: phonetics-quiz-data.js's member glosses, then any single-kanji MN-JP headword
//     (the owner's own dictionary copy, which wins), then tools/kanji-gloss-manual.json (which
//     wins over both). Those first two are reviewed copy and cover 677 kanji. The other 873 in
//     the manual file are marked "draft": true -- drafted in one pass and NOT yet reviewed by a
//     native speaker. They are live, because the alternative was two thirds of this feature in
//     English; tools/kanji-gloss-todo.md lists every one still unconfirmed, most-read first.
//     The distinction is not visible on the page and is not meant to be: a gloss is either good
//     enough to show or it should be corrected, not hedged at the reader.
//
// THIS FILE IS CC BY-SA 4.0, not MIT, like game-words.js and phonetics-data.js -- KANJIDIC2 is
// ShareAlike and that is inherited by adaptations. See LICENSE section 2 and credits.html.
const KANJI_INDEX = `;

// one line per kanji: dense, but diffable -- a changed gloss is one changed line
const keys = Object.keys(out).sort();
const body = '{\n' + keys.map(k => '    ' + JSON.stringify(k) + ': ' + JSON.stringify(out[k])).join(',\n') + '\n}';
const text = HEADER + body + ';\n';
fs.writeFileSync(path.join(ROOT, 'kanji-index.js'), text.replace(/\n/g, '\r\n'));
console.log('\n  wrote kanji-index.js  ' + (text.length / 1024).toFixed(0) + ' KB, ' + keys.length + ' kanji');

// the worklist, in the shape tools/phonetics-words-todo.md already uses
let md = '# Kanji glosses awaiting review\n\n';
md += 'Generated by `tools/build-kanji-index.js`; do not edit by hand -- it is rewritten on\n';
md += 'every build. The glosses themselves live in `tools/kanji-gloss-manual.json`.\n\n';
md += 'Every row below is a Mongolian gloss that was **drafted in one pass, not reviewed**. It is\n';
md += 'already live on `dictionary.html` -- the alternative was leaving two thirds of the kanji\n';
md += 'breakdown in English -- so this list is a worklist, not a queue of things waiting to ship.\n\n';
md += 'To confirm one, delete its `, "draft": true` in `tools/kanji-gloss-manual.json`. To correct\n';
md += 'one, change its `mn` and delete the flag in the same edit. Re-run the build either way; the\n';
md += 'count it prints is the progress bar.\n\n';
md += 'Ordered by how many of the dictionary\'s ' + withK.length + ' kanji-bearing entries each character appears\n';
md += 'in, so the top of the list is what gets read most.\n\n';
md += '| kanji | entries | drafted gloss | English | on | kun |\n|---|---|---|---|---|---|\n';
for (const k of draftList) {
    const r = out[k] || {};
    md += '| [' + k + '](https://jisho.org/search/' + encodeURIComponent(k) + '%23kanji) | ' +
          (reach.get(k) || 0) + ' | **' + (r.mn || '') + '** | ' +
          ((r.me || []).join(', ') || '-') + ' | ' + ((r.on || []).join(' ') || '-') + ' | ' +
          ((r.kun || []).join(' ') || '-') + ' |\n';
}
fs.writeFileSync(path.join(ROOT, 'tools/kanji-gloss-todo.md'), md.replace(/\n/g, '\r\n'));
console.log('  wrote tools/kanji-gloss-todo.md  ' + draftList.length + ' rows');
