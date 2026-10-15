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
// Plus PHONETICS_EX, one example WORD per kanji. See the long comment above buildWords() for
// why picking that word is most of this file's work.
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
const DICT = slurp('dictionary-data.js', 'const DICTIONARY_ENTRIES = ');
// The Dokkai Reader's passages are tokenised word by word, each token carrying its reading AND a
// Mongolian gloss -- 854 distinct written forms, most of them already translated. That is exactly
// the shape this file needs, and it was sitting in the repo unmined.
const READ = slurp('reading-texts.js', 'const READING_TRACKS = ');

// Hand-written rows for the kanji the repo has no vocabulary for. Build-time only, same as
// tools/jlpt-levels-manual.json: keeping it separate from the derived data IS the provenance
// record, and a blank row is simply skipped, so it can be filled a few at a time.
// tools/build-phonetics-wordlist.js keeps it in step with what is still missing.
const MANUAL_PATH = path.join(__dirname, 'phonetics-words-manual.json');
const MANUAL = fs.existsSync(MANUAL_PATH) ? JSON.parse(fs.readFileSync(MANUAL_PATH, 'utf8')) : {};

// "セイ(漢)、ショウ(呉)" -> ["セイ","ショウ"], dropping the wave tag
function onyomi(s) {
    return (s || '').split(/[、,]/)
        .map(x => (/^([^（(]+)/.exec(x.trim()) || [])[1])
        .filter(Boolean)
        .map(x => x.trim());
}
const toHira = s => (s || '').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
const KANJI = /[一-龯]/;

// =================================================================================================
// Example words
//
// A word under a node has one job: show the component's predicted reading being used. That makes
// it a claim that can be wrong, so every candidate is checked rather than trusted.
//
// Two traps the obvious check falls into:
//
//   1. "the word contains the kanji and its reading contains the sound" is not enough -- the
//      sound could belong to one of the word's OTHER kanji. Position settles it: a kanji's
//      reading sits where the kanji sits, so the sound must start the reading when the kanji is
//      first and end it (before any okurigana) when the kanji is last.
//   2. a compound regularly CHANGES the sound it borrows: ふん becomes ぶん in 塩分 and ぷん in
//      三分, はつ becomes はっ in 発表. Those are the same morpheme and a learner has to meet
//      them, so they count -- but they are recorded as such, because "the component predicts
//      ふん" and "you will read ぶん here" are different statements and the page makes both.
//
// Where the words come from: the three vocabulary lists carry a reading AND a Mongolian gloss,
// which is everything a node wants. They only reach about half the kanji, so compounds are also
// mined out of every furigana-annotated sentence on the site -- each <ruby> group is a word
// paired with the reading it was really given. Mined words come with no gloss, so a translated
// word always wins over an untranslated one; an untranslated word is still printed, because
// showing 忠実(ちゅうじつ) under 忠 demonstrates the reading, which is the lesson, even when the
// meaning has to wait.
// =================================================================================================
const VOICED = { か: 'が', き: 'ぎ', く: 'ぐ', け: 'げ', こ: 'ご', さ: 'ざ', し: 'じ', す: 'ず',
    せ: 'ぜ', そ: 'ぞ', た: 'だ', ち: 'ぢ', つ: 'づ', て: 'で', と: 'ど',
    は: 'ば', ひ: 'び', ふ: 'ぶ', へ: 'べ', ほ: 'ぼ' };
const PLOSIVE = { は: 'ぱ', ひ: 'ぴ', ふ: 'ぷ', へ: 'ぺ', ほ: 'ぽ' };

function soundForms(sound) {
    const out = [[sound, 'plain']];
    const head = sound[0];
    if (VOICED[head]) out.push([VOICED[head] + sound.slice(1), 'voiced']);
    if (PLOSIVE[head]) out.push([PLOSIVE[head] + sound.slice(1), 'voiced']);
    if (/[つちく]$/.test(sound)) out.push([sound.slice(0, -1) + 'っ', 'clipped']);
    return out;
}

function buildWords(quiz) {
    // --- glosses, keyed by the written form ---
    const gloss = new Map();
    const setGloss = (jp, mn) => {
        if (!jp || !mn) return;
        const k = String(jp).trim();
        if (k && !gloss.has(k)) gloss.set(k, String(mn).trim());
    };
    for (const e of MNJP) setGloss(e.jp, e.mn);
    for (const tr of READ) for (const L of tr.levels) for (const t of L.texts) for (const w of t.words) {
        setGloss(w.surface, w.enMn);
    }
    for (const L of WORDS) for (const s of L.sets) for (const p of s) {
        setGloss(p.jp, p.enMn || (p.meaningsMn && p.meaningsMn[0]));
    }
    for (const e of DICT) {
        if (e.kango) setGloss(e.kango.text, e.meaningMn);
        if (e.wago) setGloss(e.wago.text, e.meaningMn);
    }

    // --- every word form we know of ---
    const pool = [];
    const seen = new Set();
    const addWord = (jp, reading) => {
        if (!jp || !reading) return;
        jp = String(jp).trim();
        reading = toHira(String(reading).trim());
        if (!jp || !reading || !KANJI.test(jp)) return;       // kana alone demonstrates nothing
        const key = jp + '|' + reading;
        if (seen.has(key)) return;
        seen.add(key);
        pool.push({ jp, reading });
    };
    for (const e of MNJP) addWord(e.jp, e.reading);
    for (const tr of READ) for (const L of tr.levels) for (const t of L.texts) for (const w of t.words) {
        addWord(w.surface, w.reading);
    }
    for (const L of WORDS) for (const s of L.sets) for (const p of s) addWord(p.jp, p.reading);
    for (const e of DICT) {
        if (e.kango) addWord(e.kango.text, e.kango.reading);
        if (e.wago) addWord(e.wago.text, e.wago.reading);
    }

    const RUBY = /<ruby>([^<]*)<rp>\(<\/rp><rt>([^<]*)<\/rt><rp>\)<\/rp><\/ruby>/g;
    const mine = (fg) => {
        if (!fg) return;
        RUBY.lastIndex = 0;
        let m;
        while ((m = RUBY.exec(fg))) addWord(m[1], m[2]);
    };
    for (const lv of LEVELS) for (const f of (DATA[lv] || [])) for (const m of f.members) {
        if (m.example) mine(m.example.furigana);
    }
    for (const L of WORDS) for (const s of L.sets) for (const p of s) if (p.example) mine(p.example.furigana);
    for (const e of MNJP) if (e.example) mine(e.example.furigana);

    const byKanji = new Map();
    for (const w of pool) {
        for (const k of new Set(w.jp.match(/[一-龯]/g) || [])) {
            if (!byKanji.has(k)) byKanji.set(k, []);
            byKanji.get(k).push(w);
        }
    }

    // Does this word read `kanji` as `sound`, and with what change to it?
    // Returns {kind, form} -- form being the exact run of kana this kanji contributes, which the
    // page highlights inside the reading. Handing it over saves the page from re-deriving the
    // sound changes, which is a second copy of soundForms() waiting to drift.
    function demonstrates(w, kanji, sound) {
        const chars = [...w.jp];
        const i = chars.indexOf(kanji);
        if (i < 0) return null;
        const kanjiCount = chars.filter(c => KANJI.test(c)).length;
        for (const [form, kind] of soundForms(sound)) {
            if (i === 0) {
                if (w.reading.startsWith(form)) return { kind, form };
                continue;
            }
            const after = chars.slice(i + 1);
            if (!after.some(c => KANJI.test(c))) {       // last kanji, okurigana may follow
                const tail = after.join('');
                if (w.reading.endsWith(tail)
                    && w.reading.slice(0, w.reading.length - tail.length).endsWith(form)) return { kind, form };
                continue;
            }
            // somewhere in the middle: only trust it in a short compound
            if (kanjiCount <= 3 && w.reading.indexOf(form) > 0) return { kind, form };
        }
        return null;
    }

    // Which sounds matter for a kanji is a question about the families it belongs to, so collect
    // them first; a kanji in two families wants a word that works for both where it can.
    const want = new Map();
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

    const RANK = { plain: 0, clipped: 1, voiced: 2 };
    const out = {};
    const stats = { plain: 0, clipped: 0, voiced: 0, other: 0, glossed: 0, none: 0, manual: 0, wanted: want.size };

    for (const [kanji, w] of want) {
        const cands = byKanji.get(kanji) || [];
        const ranked = [...w.first.entries()].sort((a, b) => b[1] - a[1]).map(e => e[0]);

        const pick = (sounds) => {
            for (const sound of sounds) {
                const hits = [];
                for (const c of cands) {
                    const got = demonstrates(c, kanji, sound);
                    if (got) hits.push({ c, kind: got.kind, form: got.form, sound, mn: gloss.get(c.jp) || null });
                }
                if (!hits.length) continue;
                // A compound comes first, ahead even of a translated word. The node already
                // prints this kanji and its meaning; repeating it as its own example (性 → 性)
                // demonstrates nothing, while 甲虫 shows the reading doing its job. Then a gloss,
                // then the least sound change, then the shortest -- a two-kanji compound you can
                // also read the meaning of is the clearest thing this panel can show.
                const compound = h => ([...h.c.jp].filter(c => KANJI.test(c)).length > 1 ? 0 : 1);
                hits.sort((a, b) => compound(a) - compound(b)
                    || (a.mn ? 0 : 1) - (b.mn ? 0 : 1)
                    || RANK[a.kind] - RANK[b.kind]
                    || a.c.jp.length - b.c.jp.length);
                return hits[0];
            }
            return null;
        };

        // A hand-written row wins outright: it was chosen by someone who could read both
        // languages, which no amount of pooling matches. It is still checked like everything
        // else below, so a typo in it fails the build rather than reaching the page.
        const hand = MANUAL[kanji];
        if (hand && hand.w && hand.r) {
            const sound = ranked.find(s2 => demonstrates({ jp: hand.w, reading: toHira(hand.r) }, kanji, s2))
                || [...w.all].find(s2 => demonstrates({ jp: hand.w, reading: toHira(hand.r) }, kanji, s2));
            if (!sound) {
                throw new Error(`phonetics-words-manual.json: ${kanji} → ${hand.w} (${hand.r}) `
                    + `does not read ${kanji} as any of ${[...w.all].join('/')} where the kanji sits`);
            }
            const got = demonstrates({ jp: hand.w, reading: toHira(hand.r) }, kanji, sound);
            stats.manual++;
            if (ranked.indexOf(sound) === 0) stats[got.kind]++; else stats.other++;
            if (hand.mn) stats.glossed++;
            const row = { w: hand.w, r: toHira(hand.r), s: sound };
            if (got.kind !== 'plain') { row.k = got.kind; row.f = got.form; }
            if (hand.mn) row.mn = hand.mn;
            out[kanji] = row;
            continue;
        }

        const best = pick(ranked) || pick([...w.all].filter(s => ranked.indexOf(s) < 0));
        if (!best) { stats.none++; continue; }

        const isMain = ranked.indexOf(best.sound) === 0;
        isMain ? stats[best.kind]++ : stats.other++;
        if (best.mn) stats.glossed++;

        const row = { w: best.c.jp, r: best.c.reading, s: best.sound };
        if (best.kind !== 'plain') {
            row.k = best.kind;              // only when there is something to say about it
            row.f = best.form;              // and then the page needs the changed form too
        }
        if (best.mn) row.mn = best.mn;
        out[kanji] = row;
    }
    return { out, stats, pool: pool.length };
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

const ex = buildWords(quiz);
const covered = ex.stats.wanted - ex.stats.none;
const pct = n => (100 * n / ex.stats.wanted).toFixed(1) + '%';

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
// PHONETICS_EX — one example WORD per kanji:
//   w   the word
//   r   its reading, in hiragana
//   s   the sound this word shows the kanji taking
//   f   the exact run of kana this kanji contributes, for highlighting inside r
//   k   "voiced" or "clipped" when the compound changed that sound (塩分 ぶん for ふん,
//       発表 はっ for はつ); absent when it is the plain sound
//   mn  a Mongolian gloss, where one exists for this exact word
//
// Every word here has been CHECKED to show its kanji taking one of its family's sounds, by
// position inside the word -- a kanji's reading sits where the kanji sits, so a sound that merely
// appears somewhere in the reading does not count. That check is the whole job: the shapes'
// own example sentences demonstrate the predicted reading barely half the time, the rest showing
// a kun'yomi (虫 as むし, 寺 as てら) and arguing against the pattern the page teaches.
//
// Candidates come from mnjp-data.js, game-words.js, dictionary-data.js and the Dokkai Reader's
// tokenised passages, plus every compound mined out of the site's furigana (${ex.pool} distinct
// word forms in all). A word with a gloss always beats one without.
//
// ${covered} of ${ex.stats.wanted} kanji have a word (${pct(covered)}), ${ex.stats.glossed} of
// them with a Mongolian gloss (${pct(ex.stats.glossed)}). The other ${ex.stats.none} have none:
// nothing in the pool reads them with any of their family's sounds, and a wrong example would
// argue against the very thing the board is claiming.
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
console.log(`  phonetics-quiz-data.js  ${kb(Buffer.byteLength(file))}`);
console.log(`    words: ${covered}/${ex.stats.wanted} kanji (${pct(covered)}), `
    + `${ex.stats.glossed} glossed (${pct(ex.stats.glossed)})`
    + (ex.stats.manual ? `, ${ex.stats.manual} hand-written` : ''));
console.log(`      plain ${ex.stats.plain} · clipped ${ex.stats.clipped} · voiced ${ex.stats.voiced}`
    + ` · other family sound ${ex.stats.other} · none ${ex.stats.none}`);
for (const lv of LEVELS) {
    const n = quiz[lv].length, c = CHECKPOINTS[lv];
    console.log(`    ${lv}: ${String(n).padStart(3)} families, ${c} checkpoint(s) of ~${Math.ceil(n / c)}`);
}
