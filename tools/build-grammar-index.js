// Generates grammar-index.js -- the dictionary's third tab, one entry per grammar point taught
// in Grammar Connect.
//
// Run: node tools/build-grammar-index.js
// Re-run whenever grammar-data.js changes. tests/grammar-index.spec.js fails CI if the committed
// output no longer matches the source, which is the guard an index like this needs: the crosslink
// index drifted silently twice before it had one.
//
// WHY THIS NEEDED NO TRANSLATION WORK. Every field shipped here was already written and reviewed
// by the site's author inside grammar-data.js -- `explanationMn` on the sentence and
// `translationMn` under it. The tab shows Mongolian that already existed; nothing here is machine
// translated and nothing was written fresh for it. That is the whole reason this was cheap, and
// it is also the constraint: if a future grammar point ships without `explanationMn`, it must be
// LEFT OUT rather than filled in from the English, or the tab starts carrying prose of a quality
// the rest of the site's Mongolian does not have. The build fails loudly on that case.
//
// WHICH POINTS GET AN ENTRY. THE POOL IS NOT THE CATALOGUE, and reading it as one cost this
// index roughly half its material. GRAMMAR_POOLS exists to supply DISTRACTOR TILES, which is a
// different job: it holds 132 citation forms, 19 of them never tested at all, while the sentences
// test 436 distinct strings. Filing only pool members meant 131 of the 400 sentences had BOTH
// options outside it, so their explanation and their translation reached no entry -- ほかない,
// つつある, づらい, たびに, にしたがって, を余儀なくされる and a hundred more, all real N4-N1 grammar
// and all invisible.
//
// A string is now resolved through tools/grammar-extra.json, which files every one of the 174
// candidates by hand as a grammar point (with the HEADWORD it belongs under, so a politeness or
// orthographic variant merges rather than sitting beside its own citation form) or as not
// grammar, with the reason. The build FAILS on a string in neither list, so a new sentence
// introducing a new form has to be classified deliberately -- the pool filter was dropping them
// in silence, which is how this went unnoticed in the first place.
//
// A conjugated form carrying <ruby> and no *Core field is skipped before that, because it has no
// citation form to file it under. The build prints how many; they are the visible face of the 37
// sentences that want oldCore/newCore adding to grammar-data.js.
//
// THE KEY IS `newCore || oldCore`, NEVER `new`. 41 of the 400 sentences have no `newCore`,
// because in those the answer IS the plain form and the grammar point under test is the one on
// the other side. Falling through to `s.new` files the entry under a conjugated, furigana-laden
// fragment -- which is exactly the bug that put `<ruby>目<rt>め</rt></ruby>を...` on the
// dashboard's weak-points list, and it is the same helper shape grammar.js uses so the two
// cannot disagree.
//
// Shape:
//   { g:"らしい", t:"foundation", l:1, j:"N3",
//     e:"<explanation EN>", m:"<explanation MN>",
//     v:[{ j:"<sentence with furigana>", e:"<EN>", m:"<MN>" }],
//     a:["そう"] }                      // the near-synonyms it is contrasted with
//
//   t/l are the track and level the point is FIRST taught at, and are what the link into
//   grammar.html points to. They are facts about this repo, not a difficulty claim.
//
//   j  is the point's own JLPT level, from tools/grammar-jlpt.json, and is ABSENT for the 17
//      points that file does not classify -- a missing badge, never a guessed one, exactly as
//      kanji-index.js leaves `lv` absent for a kanji this repo does not file.
//
//      IT IS DELIBERATELY NOT GRAMMAR CONNECT'S BAND LABEL, which was tried first and is a
//      category error: a band is HALF A TRACK, labelled with what it is mostly, and the levels
//      are not ordered by difficulty inside a track -- so the band says nothing about any one
//      point in it. Worse, as a per-point badge it is measurably wrong: every advanced point
//      appears somewhere in advanced levels 1-10, so first-appearance banding labelled all 64 of
//      them "~N2" and produced ZERO ~N1 points, かたわら and てやまない among them.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..');
const OUT = path.join(REPO, 'grammar-index.js');

const JLPT = JSON.parse(fs.readFileSync(path.join(__dirname, 'grammar-jlpt.json'), 'utf8'));
const EXTRA = JSON.parse(fs.readFileSync(path.join(__dirname, 'grammar-extra.json'), 'utf8'));
// Hand-authored points that are NOT in the drill and so cannot be derived -- the core particles
// and the N5 floor. See that file's header for why they had to be written rather than mined.
const FOUNDATION = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'grammar-foundation.json'), 'utf8'));

// The foundation file writes furigana as 漢字[かんじ]; the derived entries carry full <ruby>
// markup, and the tab's two search strings (grPlain, grReadings) read that markup. So expand
// here rather than asking an author to hand-write <rp> tags two hundred times.
function rubify(text) {
    return String(text).replace(
        /([\u4e00-\u9fff\u3005]+)\[([\u3040-\u309f\u30a0-\u30ff]+)\]/g,
        (m, kanji, reading) =>
            `<ruby>${kanji}<rp>(</rp><rt>${reading}</rt><rp>)</rp></ruby>`);
}

const ctx = { out: {} };
vm.createContext(ctx);
vm.runInContext(
    fs.readFileSync(path.join(REPO, 'grammar-data.js'), 'utf8') +
    ';out.POOLS = GRAMMAR_POOLS; out.LEVELS = GRAMMAR_LEVELS;',
    ctx
);
const { POOLS, LEVELS } = ctx.out;
const pool = new Set(Object.values(POOLS).flat());

// The same key grammar.js files an attempt under. Kept identical on purpose.
const grammarKey = (s) => s.newCore || s.oldCore || s.new;

// A conjugated option with furigana in it and no citation form of its own: nothing to file.
const hasRuby = (v) => /<ruby|<rt>|[(（]/.test(v);

// A Set, not a counter: headword() is called four times per sentence (each side's own core and
// its partner's), so counting calls reports every form two to four times over.
const noCitationForm = new Set();
const unclassified = new Set();

// A pool member keeps its own string as the headword; anything else is looked up. Returns null
// when the string is deliberately not grammar, and records the string when it is not filed at
// all -- which fails the build below rather than vanishing.
function headword(core, raw) {
    const key = core || raw;
    if (pool.has(key)) return key;
    if (!core && hasRuby(raw)) { noCitationForm.add(raw); return null; }
    if (Object.prototype.hasOwnProperty.call(EXTRA.points, key)) return EXTRA.points[key];
    if (Object.prototype.hasOwnProperty.call(EXTRA.notGrammar, key)) return null;
    unclassified.add(key);
    return null;
}

const entries = new Map();
const problems = [];

for (const track of Object.keys(LEVELS)) {
    for (const lv of LEVELS[track]) {
        for (const s of lv.sentences) {
            // Both sides of a swap are real sentences; each side is an example OF its own point.
            const sides = [
                {
                    core: headword(s.newCore, s.new),
                    text: s.prefix + s.new + s.suffix,
                    mate: headword(s.oldCore, s.old),
                },
                {
                    core: headword(s.oldCore, s.old),
                    text: s.prefix + s.old + s.suffix,
                    mate: headword(s.newCore, s.new),
                },
            ];
            // The point the sentence is really ABOUT -- what the explanation explains.
            const key = grammarKey(s);   // kept: the tested point, used for the level link below

            for (const side of sides) {
                if (!side.core) continue;

                if (!entries.has(side.core)) {
                    entries.set(side.core, {
                        g: side.core,
                        t: track,
                        l: lv.level,
                        e: '',
                        m: '',
                        v: [],
                        a: new Set(),
                    });
                }
                const en = entries.get(side.core);

                // THE EXPLANATION BELONGS TO THE PAIR, NOT TO THE TESTED OPTION. It names both
                // by hand and explains what separates them -- "そう (hearsay) and らしい both
                // relay something you heard" -- so it is the right text under either one. Taking
                // it for the `key` side alone left 43 points with nothing to show, every one of
                // them a point that only ever appears as the OLD option: けど, でしょう, つもり,
                // にもかかわらず, かたわら... all real N4-N1 grammar, and all invisible.
                // Keep the first -- a point taught twice is explained twice, and the first
                // teaching is the level the link points at.
                if (!en.e) {
                    if (!s.explanation || !s.explanationMn) {
                        problems.push(
                            `${track} L${lv.level}: "${side.core}" has no ` +
                            (!s.explanationMn ? 'explanationMn' : 'explanation')
                        );
                    }
                    en.e = s.explanation || '';
                    en.m = s.explanationMn || '';
                    en.t = track;
                    en.l = lv.level;
                }

                // Already a headword, and never the point itself -- the two sides of a swap
                // can resolve to the same entry (つづける / つづけている both file under つづける),
                // and a point listed as its own near-synonym reads as a rendering fault.
                if (side.mate && side.mate !== side.core) en.a.add(side.mate);

                // translationMn is shared by both sides by construction: the two options mean the
                // same, which is what makes the drill a drill. That is correct here too -- the
                // sentence really does mean that whichever option is in it.
                if (!en.v.some((v) => v.j === side.text) && en.v.length < 3) {
                    en.v.push({ j: side.text, e: s.translation || '', m: s.translationMn || '' });
                }
            }
        }
    }
}

// An option tested on a real sentence that nobody has classified. Failing here is the whole
// point of tools/grammar-extra.json: the previous build dropped these without a word, which is
// how 131 sentences' worth of material stayed invisible.
if (unclassified.size) {
    problems.push(...[...unclassified].map((k) =>
        `"${k}" is tested on a sentence but is in neither list in tools/grammar-extra.json `
        + '-- file it under `points` with the headword it belongs to, or under `notGrammar` '
        + 'with the reason'));
}

// A point with no explanation has nothing to show. Fail rather than ship an empty card, and fail
// rather than quietly fill it from the English -- see the header.
const empty = [...entries.values()].filter((e) => !e.m);
if (empty.length) {
    problems.push(...empty.map((e) => `"${e.g}" would ship with no Mongolian explanation`));
}
if (problems.length) {
    console.error('grammar-index: ' + problems.length + ' problem(s), nothing written:');
    for (const p of problems.slice(0, 20)) console.error('  - ' + p);
    process.exit(1);
}

const derived = [...entries.values()]
    .sort((a, b) => (a.t === b.t ? a.l - b.l : a.t < b.t ? -1 : 1))
    .map((e) => {
        const o = { g: e.g, t: e.t, l: e.l };
        // absent, not guessed, for the points grammar-jlpt.json does not classify
        if (JLPT[e.g]) o.j = JLPT[e.g];
        return Object.assign(o, { e: e.e, m: e.m, v: e.v, a: [...e.a].sort() });
    });

// A foundation point carries NO t/l: it is not taught at any level of the drill, so there is no
// level to link to and the panel leaves the practise link out rather than pointing somewhere
// that does not teach it. Its JLPT level comes from the file itself, not grammar-jlpt.json,
// because these were classified as they were written.
const derivedNames = new Set(derived.map((e) => e.g));
const foundation = FOUNDATION.points.map((p) => {
    if (derivedNames.has(p.g)) {
        problems.push(`"${p.g}" is in grammar-foundation.json AND derived from grammar-data.js `
            + '-- it would ship as two rows for one point');
    }
    return {
        g: p.g,
        j: p.j,
        e: p.e,
        m: p.m,
        v: p.v.map((v) => ({ j: rubify(v.j), e: v.e, m: v.m })),
        a: [],
    };
});

if (problems.length) {
    console.error('grammar-index: ' + problems.length + ' problem(s), nothing written:');
    for (const p of problems.slice(0, 20)) console.error('  - ' + p);
    process.exit(1);
}

// Foundation first: these are the floor, and on an N5 filter they are what a beginner wants at
// the top rather than below forty drill points.
const list = foundation.concat(derived);

const header = `// GENERATED by tools/build-grammar-index.js -- do not edit by hand.
//
// One entry per grammar point taught in Grammar Connect, for dictionary.html's grammar tab.
// Every English and Mongolian string in here was written by the site's author in grammar-data.js;
// nothing is machine translated. Re-run the generator after editing grammar-data.js.
//
// ${list.length} points: ${foundation.length} hand-authored (tools/grammar-foundation.json, the
// core particles and the N5 floor -- these carry NO t/l, since the drill does not teach them)
// and ${derived.length} derived from grammar-data.js.
//
// Fields: g point, t track, l level (derived only), j JLPT level where filed, e/m explanation
// EN/MN, v up to 3 example sentences {j JP with furigana, e EN, m MN}, a the near-synonyms it
// contrasts with.
`;

fs.writeFileSync(OUT, header + 'const GRAMMAR_INDEX = ' + JSON.stringify(list, null, 1) + ';\n');

const withAlt = list.filter((e) => e.a.length).length;
const unfiled = list.filter((e) => !e.j);
const levels = {};
for (const e of list) if (e.j) levels[e.j] = (levels[e.j] || 0) + 1;
// The worklist. The draft flag is not read by any page -- it marks Mongolian that the site's
// author has not confirmed yet, exactly as tools/kanji-gloss-manual.json's 873 drafts do.
const drafts = FOUNDATION.points.filter((p) => p.draft);
fs.writeFileSync(path.join(__dirname, 'grammar-foundation-todo.md'),
    '# Foundation grammar: Mongolian awaiting review\n\n'
    + 'Generated by tools/build-grammar-index.js -- do not edit by hand.\n\n'
    + 'These are the only Mongolian strings on the site that the author did not write. Confirm '
    + 'one by deleting its `"draft": true` in tools/grammar-foundation.json and re-running the '
    + 'build; the count below drops.\n\n'
    + `${drafts.length} of ${FOUNDATION.points.length} still unconfirmed.\n\n`
    + drafts.map((p) => `- [ ] **${p.g}** (${p.j}) --- ${p.m.split('.')[0]}.`).join('\n')
    + '\n');

console.log(`grammar-index.js: ${list.length} points, ${(fs.statSync(OUT).size / 1024).toFixed(0)}KB`);
console.log(`  ${foundation.length} hand-authored (${drafts.length} with Mongolian still `
            + 'awaiting review -- see tools/grammar-foundation-todo.md), '
            + `${derived.length} derived`);
console.log(`  ${withAlt} contrasted with a near-synonym, ${list.length - withAlt} standalone`);
console.log(`  examples: ${list.reduce((n, e) => n + e.v.length, 0)} sentences, all with EN+MN`);
console.log(`  ${Object.keys(EXTRA.points).length} strings filed beyond the pool `
            + `(${new Set(Object.values(EXTRA.points)).size} headwords), `
            + `${Object.keys(EXTRA.notGrammar).length} rejected as not grammar`);
console.log(`  ${noCitationForm.size} distinct option(s) skipped for having furigana and no `
            + 'oldCore/newCore');
console.log('  JLPT: ' + ['N5', 'N4', 'N3', 'N2', 'N1'].map((n) => `${n} ${levels[n] || 0}`).join(', '));
if (unfiled.length) {
    // These show no badge. Classify one by adding it to tools/grammar-jlpt.json.
    console.log(`  ${unfiled.length} not in tools/grammar-jlpt.json, so no badge: ` +
                unfiled.map((e) => e.g).join(' '));
}
