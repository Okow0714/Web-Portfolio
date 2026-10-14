// Generates phonetics-quiz-data.js -- the small derivative the Phonetics board, its tree and its
// drill all run on.
//
// Run: node tools/build-phonetics-quiz.js
// Re-run whenever phonetics-data.js changes; tests/phonetics-quiz.spec.js fails CI if the
// committed output no longer matches the source.
//
// Why a derivative at all: phonetics-data.js is ~2.8MB because it carries onyomi, kunyomi,
// meanings and a full example sentence for all 2,429 member rows, most of which the page never
// shows. Everything phonetics.html needs is here instead, so the big file is not loaded at all.
//
// Shape:
//   { "N5": [ { c: "生", s: ["セイ","ショウ"], m: [ {k,lv,on:[...],kun,mn} ] } ] }
//     c  the phonetic component
//     s  the sounds TWO OR MORE of its members take, most common first. Two or more, because a
//        reading only one member has is that kanji's business, not the shape's, and would make
//        an unfair quiz answer.
//     m  the members, each with every onyomi it has -- the component predicts a reading to TRY,
//        and the win condition is that the reading appears in the member's set at all.
//
// Plus PHONETICS_EX, one example sentence per kanji, keyed by the kanji. See the long comment
// above buildExamples() for why most of this file's work is deciding which sentence that is.
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const OUT = path.join(REPO, 'phonetics-quiz-data.js');
const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

// How many checkpoints each level is cut into. phonetics-data.js is already ordered by real
// usage, so checkpoint 1 is a level's most common shapes rather than an arbitrary slice.
const CHECKPOINTS = { N5: 1, N4: 1, N3: 2, N2: 3, N1: 4 };

// A board wants at least three spokes: two is a thin pattern and one is none at all.
const MIN_MEMBERS = 3;

function slurp(file, marker, end) {
    const t = fs.readFileSync(path.join(REPO, file), 'utf8');
    const i = t.indexOf(marker);
    if (i < 0) throw new Error(file + ' no longer declares "' + marker.trim() + '"');
    const a = i + marker.length;
    const b = end ? t.indexOf(end) : t.length;
    return JSON.parse(t.slice(a, b).replace(/;\s*$/, '').trim());
}

const DATA = slurp('phonetics-data.js', 'const PHONETICS_DATA = ');
const WORDS = slurp('game-words.js', 'const WORD_LEVELS = ');
const MNJP = slurp('mnjp-data.js', 'const MNJP_ENTRIES = ');

// "セイ(漢)、ショウ(呉)" -> ["セイ","ショウ"], dropping the wave tag
function onyomi(s) {
    return (s || '').split(/[、,]/)
        .map(x => (/^([^（(]+)/.exec(x.trim()) || [])[1])
        .filter(Boolean)
        .map(x => x.trim());
}
const toHira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));

// =================================================================================================
// Example sentences
//
// A sentence under a node is only worth printing if it DEMONSTRATES the reading the component
// predicts. Measured over the whole set, the member's own sentence does that barely half the time
// -- the rest show a kun'yomi (虫 as むし, 寺 as てら), which teaches the opposite of the lesson
// the board is making. So every candidate is checked rather than trusted.
//
// The check is possible because every sentence carries furigana: pull the <rt> of the ruby group
// holding the kanji and ask whether the target sound is inside it. A jukugo's reading is a
// concatenation (構成 -> こうせい), so containment is the test.
//
// Three files carry sentences with furigana AND a Mongolian translation, so all three are pooled:
// phonetics-data.js, game-words.js and mnjp-data.js. Borrowing from the other two rescues about
// 6% of nodes whose own sentence shows the wrong reading.
//
// Where nothing in 28,000 sentences demonstrates any of the family's sounds -- about a quarter of
// nodes -- the node gets NO sentence. A wrong example is worse than none on a page whose whole
// argument is that the component predicts the sound.
// =================================================================================================
function buildExamples(quiz) {
    const pool = new Map();            // kanji -> [{jp, fg, mn}]
    const seenSentence = new Set();

    function add(ex) {
        if (!ex || !ex.jp || !ex.furigana || !ex.enMn) return;
        if (seenSentence.has(ex.jp)) return;
        seenSentence.add(ex.jp);
        const row = { jp: ex.jp, fg: ex.furigana, mn: ex.enMn };
        for (const k of new Set(ex.jp.match(/[一-龯]/g) || [])) {
            if (!pool.has(k)) pool.set(k, []);
            pool.get(k).push(row);
        }
    }
    for (const lv of LEVELS) for (const f of (DATA[lv] || [])) for (const m of f.members) add(m.example);
    for (const L of WORDS) for (const s of L.sets) for (const p of s) add(p.example);
    for (const e of MNJP) add(e.example);

    function readingOf(fg, kanji) {
        const re = /<ruby>([^<]*)<rp>\(<\/rp><rt>([^<]*)<\/rt><rp>\)<\/rp><\/ruby>/g;
        let m;
        while ((m = re.exec(fg))) if (m[1].indexOf(kanji) >= 0) return m[2];
        return null;
    }

    // Which sounds matter for a kanji is a question about the families it belongs to, not about
    // the kanji alone, so collect them first. A kanji in two families wants a sentence that works
    // for both where possible, which is why the preferred sounds are tallied rather than taken
    // from whichever family happened to come first.
    const want = new Map();            // kanji -> { first: Map(sound->count), all: Set(sound) }
    for (const lv of LEVELS) {
        for (const fam of quiz[lv]) {
            for (const m of fam.m) {
                if (!want.has(m.k)) want.set(m.k, { first: new Map(), all: new Set() });
                const w = want.get(m.k);
                const f0 = toHira(fam.s[0]);
                w.first.set(f0, (w.first.get(f0) || 0) + 1);
                fam.s.forEach(s => w.all.add(toHira(s)));
            }
        }
    }

    const out = {};
    const stats = { first: 0, other: 0, none: 0 };
    for (const [kanji, w] of want) {
        const candidates = pool.get(kanji) || [];
        const ranked = [...w.first.entries()].sort((a, b) => b[1] - a[1]).map(e => e[0]);

        let picked = null, shows = null;
        // the predicted reading first, in the order the families prefer it
        for (const sound of ranked) {
            picked = candidates.find(c => (readingOf(c.fg, kanji) || '').indexOf(sound) >= 0);
            if (picked) { shows = sound; break; }
        }
        // failing that, any other sound the family shares -- still the family's pattern, just not
        // the headline one, and the page says which sound it is showing
        if (!picked) {
            for (const sound of w.all) {
                if (ranked.indexOf(sound) >= 0) continue;
                picked = candidates.find(c => (readingOf(c.fg, kanji) || '').indexOf(sound) >= 0);
                if (picked) { shows = sound; break; }
            }
        }
        if (!picked) { stats.none++; continue; }
        ranked.indexOf(shows) === 0 ? stats.first++ : stats.other++;
        out[kanji] = { jp: picked.jp, fg: picked.fg, mn: picked.mn, s: shows };
    }
    return { out, stats, kanjiWanted: want.size, pooled: seenSentence.size };
}

// =================================================================================================
const quiz = {};
let families = 0, members = 0;
for (const lv of LEVELS) {
    quiz[lv] = (DATA[lv] || []).map(f => {
        const ms = f.members || [];
        if (ms.length < MIN_MEMBERS) return null;
        const tally = {};
        ms.forEach(m => onyomi(m.onyomi).forEach(r => { tally[r] = (tally[r] || 0) + 1; }));
        const sounds = Object.keys(tally).filter(k => tally[k] >= 2).sort((a, b) => tally[b] - tally[a]);
        if (!sounds.length) return null;
        families++;
        members += ms.length;
        return {
            c: f.phonetic,
            s: sounds,
            m: ms.map(m => ({
                k: m.kanji,
                lv: m.level,
                on: onyomi(m.onyomi),
                kun: (m.kunyomi || '').split(/[、,]/)[0].trim(),
                mn: (m.meaningsMn && m.meaningsMn[0]) || (m.meanings && m.meanings[0]) || '',
            })),
        };
    }).filter(Boolean);
}

const ex = buildExamples(quiz);
const covered = ex.stats.first + ex.stats.other;
const pct = n => (100 * n / ex.kanjiWanted).toFixed(1) + '%';

const file = `// GENERATED by tools/build-phonetics-quiz.js — do not edit by hand.
//
// Everything phonetics.html needs: the board, the family tree and the drill all read this, and
// the page does not load phonetics-data.js (~2.8MB of readings, meanings and sentences, most of
// which never reach the screen). Regenerate after changing phonetics-data.js;
// tests/phonetics-quiz.spec.js fails if the two disagree.
//
// PHONETICS_QUIZ
//   c  the phonetic component
//   s  the sounds two or more of its members take, most common first
//   m  members: kanji, JLPT level, every onyomi it has, first kunyomi, one Mongolian gloss
//
// Only families with ${MIN_MEMBERS}+ members and at least one shared sound are kept: fewer than
// that is not a pattern, and makes an unfair question.
//
// PHONETICS_EX — one example sentence per kanji: {jp, fg (furigana), mn, s (the sound it shows)}
//
// Every sentence here has been CHECKED to demonstrate one of its family's sounds, by reading the
// furigana of the group holding the kanji. That check matters: left unchecked, nearly half the
// sentences in phonetics-data.js show a kun'yomi (虫 as むし, 寺 as てら) and would argue against
// the very pattern the board is teaching. Candidates are pooled from phonetics-data.js,
// game-words.js and mnjp-data.js — ${ex.pooled} distinct sentences.
//
// \`s\` is the sound the sentence actually demonstrates, which is not always the family's first:
// where it differs, the page says so rather than letting the reader assume.
//
// ${covered} of ${ex.kanjiWanted} kanji have one (${pct(covered)}): ${ex.stats.first} showing the
// family's main sound, ${ex.stats.other} another of its sounds. The remaining ${ex.stats.none}
// get no sentence at all — nothing in the pool demonstrates any of their family's sounds, and a
// wrong example is worse than none here.
//
// ${families} families, ${members} member rows.
const PHONETICS_QUIZ = ${JSON.stringify(quiz)};

const PHONETICS_EX = ${JSON.stringify(ex.out)};

// How many checkpoints each level is cut into, so a learner meeting N1's ${quiz.N1.length}
// shapes has a near edge to aim at instead of the whole level. The source is in usage order,
// so checkpoint 1 is always the most common shapes.
const PHONETICS_CHECKPOINTS = ${JSON.stringify(CHECKPOINTS)};
`;
fs.writeFileSync(OUT, file);

const kb = n => (n / 1024).toFixed(0) + ' KB';
console.log(`  phonetics-quiz-data.js  ${kb(file.length)}`);
console.log(`    sentences: ${covered}/${ex.kanjiWanted} kanji (${pct(covered)}) — `
    + `${ex.stats.first} main sound, ${ex.stats.other} another, ${ex.stats.none} none`);
for (const lv of LEVELS) {
    const n = quiz[lv].length, c = CHECKPOINTS[lv];
    console.log(`    ${lv}: ${String(n).padStart(3)} families, ${c} checkpoint(s) of ~${Math.ceil(n / c)}`);
}
