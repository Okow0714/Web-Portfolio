// Kana Origins (origins.html) — the beginners' section.
//
// Everything on this page is rendered from the data below rather than written into the HTML,
// for the same reason the tool pages do it: each string has to exist in both languages, and a
// `sitelangchange` event has to be able to rebuild the whole page. The chronology, the kana
// grid, the pronunciation notes and the katakana chain are therefore all data + one render
// pass, with only the section headings living as data-i18n in the markup.
//
// Depends on i18n.js (window.t / window.tf / window.siteLang) and auth-shared.js for the
// shared masthead, both loaded first.

// ---------------------------------------------------------------------------
// The three scripts
// ---------------------------------------------------------------------------
// The opening section: what the three scripts are, before any history explains why. The
// colour language is established here and the kana table below reuses it -- kanji is ink
// (the base text colour), hiragana vermilion, katakana grey. Indigo stays reserved for the
// Mongolian side everywhere on this page, so it is deliberately not one of the three.
const SCRIPTS = [
    { id: 'kanji', jp: '漢字' },
    { id: 'hira', jp: 'ひらがな' },
    { id: 'kata', jp: 'カタカナ' },
];

// One sentence doing all three jobs at once. モンゴル is the katakana example on purpose: a
// foreign place name is the commonest katakana a Mongolian beginner actually meets, and it
// makes the point about loanwords before the page has argued it.
const DEMO = [
    ['私', 'kanji'], ['は', 'hira'], ['モンゴル', 'kata'], ['で', 'hira'],
    ['日本語', 'kanji'], ['を', 'hira'], ['勉強', 'kanji'], ['します', 'hira'], ['。', 'plain'],
];

// ---------------------------------------------------------------------------
// Chronology
// ---------------------------------------------------------------------------
// Each era is one datable moment that adds exactly one piece of the modern writing system.
// `img` is null where a photograph would say less than the text does; the mismatch era draws
// its own diagram instead (see kaeriten below).
const ERAS = [
    { id: 'prewriting', when: 'origins.era1.when', sub: 'origins.era1.sub', title: 'origins.era1.title', body: ['origins.era1.p1'], img: 'prewriting', cap: 'origins.era1.cap' },
    { id: 'kanji', when: 'origins.era2.when', sub: 'origins.era2.sub', title: 'origins.era2.title', body: ['origins.era2.p1'], pull: 'origins.era2.pull', img: 'kanji-arrive', cap: 'origins.era2.cap' },
    { id: 'mismatch', when: 'origins.era3.when', sub: 'origins.era3.sub', title: 'origins.era3.title', body: ['origins.era3.p1', 'origins.era3.p2'], pull: 'origins.era3.pull', kaeriten: true, cap: 'origins.era3.cap' },
    { id: 'manyogana', when: 'origins.era4.when', sub: 'origins.era4.sub', title: 'origins.era4.title', body: ['origins.era4.p1'], img: 'manyogana', cap: 'origins.era4.cap' },
    { id: 'hiragana', when: 'origins.era5.when', sub: 'origins.era5.sub', title: 'origins.era5.title', body: ['origins.era5.p1'], pull: 'origins.era5.pull', img: 'hiragana', cap: 'origins.era5.cap' },
    { id: 'katakana', when: 'origins.era6.when', sub: 'origins.era6.sub', title: 'origins.era6.title', body: ['origins.era6.p1'], pull: 'origins.era6.pull', img: 'katakana', cap: 'origins.era6.cap' },
    { id: 'thousand', when: 'origins.era7.when', sub: 'origins.era7.sub', title: 'origins.era7.title', body: ['origins.era7.p1', 'origins.era7.p2'] },
    { id: 'meiji', when: 'origins.era8.when', sub: 'origins.era8.sub', title: 'origins.era8.title', body: ['origins.era8.p1'], img: 'meiji', cap: 'origins.era8.cap' },
    { id: 'postwar', when: 'origins.era9.when', sub: 'origins.era9.sub', title: 'origins.era9.title', body: ['origins.era9.p1', 'origins.era9.p2'], img: 'postwar', cap: 'origins.era9.cap' },
];

// A line from the Han Feizi, written in Chinese order, numbered in the order a Japanese reader
// has to take it. Drawn rather than scanned: the Commons diagram is a 200x1000 vertical strip
// with an alpha channel, which neither fits a text column nor survives conversion to JPEG.
const KAERITEN = [['楚', 1], ['人', 2], ['有', 8], ['鬻', 6], ['盾', 3], ['與', 5], ['矛', 4], ['者', 7]];

// ---------------------------------------------------------------------------
// The gojūon
// ---------------------------------------------------------------------------
// [hiragana, katakana, Mongolian reading, romaji, hiragana's source kanji, katakana's source]
// Hiragana is a whole man'yōgana character worn smooth by cursive; katakana is a fragment
// snapped off one. Same sound, different source — which is exactly why the pair looks nothing
// alike, and why each tile shows both.
const KANA_ROWS = [
    ['∅', [['あ', 'ア', 'а', 'a', '安', '阿'], ['い', 'イ', 'и', 'i', '以', '伊'], ['う', 'ウ', 'у', 'u', '宇', '宇'], ['え', 'エ', 'э', 'e', '衣', '江'], ['お', 'オ', 'о', 'o', '於', '於']]],
    ['か', [['か', 'カ', 'ка', 'ka', '加', '加'], ['き', 'キ', 'ки', 'ki', '幾', '幾'], ['く', 'ク', 'ку', 'ku', '久', '久'], ['け', 'ケ', 'кэ', 'ke', '計', '介'], ['こ', 'コ', 'ко', 'ko', '己', '己']]],
    ['さ', [['さ', 'サ', 'са', 'sa', '左', '散'], ['し', 'シ', 'ши', 'shi', '之', '之'], ['す', 'ス', 'су', 'su', '寸', '須'], ['せ', 'セ', 'сэ', 'se', '世', '世'], ['そ', 'ソ', 'со', 'so', '曽', '曽']]],
    ['た', [['た', 'タ', 'та', 'ta', '太', '多'], ['ち', 'チ', 'чи', 'chi', '知', '千'], ['つ', 'ツ', 'цу', 'tsu', '川', '川'], ['て', 'テ', 'тэ', 'te', '天', '天'], ['と', 'ト', 'то', 'to', '止', '止']]],
    ['な', [['な', 'ナ', 'на', 'na', '奈', '奈'], ['に', 'ニ', 'ни', 'ni', '仁', '二'], ['ぬ', 'ヌ', 'ну', 'nu', '奴', '奴'], ['ね', 'ネ', 'нэ', 'ne', '祢', '祢'], ['の', 'ノ', 'но', 'no', '乃', '乃']]],
    ['は', [['は', 'ハ', 'ха', 'ha', '波', '八'], ['ひ', 'ヒ', 'хи', 'hi', '比', '比'], ['ふ', 'フ', 'фу', 'fu', '不', '不'], ['へ', 'ヘ', 'хэ', 'he', '部', '部'], ['ほ', 'ホ', 'хо', 'ho', '保', '保']]],
    ['ま', [['ま', 'マ', 'ма', 'ma', '末', '末'], ['み', 'ミ', 'ми', 'mi', '美', '三'], ['む', 'ム', 'му', 'mu', '武', '牟'], ['め', 'メ', 'мэ', 'me', '女', '女'], ['も', 'モ', 'мо', 'mo', '毛', '毛']]],
    ['や', [['や', 'ヤ', 'я', 'ya', '也', '也'], null, ['ゆ', 'ユ', 'ю', 'yu', '由', '由'], null, ['よ', 'ヨ', 'ё', 'yo', '与', '与']]],
    ['ら', [['ら', 'ラ', 'ра', 'ra', '良', '良'], ['り', 'リ', 'ри', 'ri', '利', '利'], ['る', 'ル', 'ру', 'ru', '留', '流'], ['れ', 'レ', 'рэ', 're', '礼', '礼'], ['ろ', 'ロ', 'ро', 'ro', '呂', '呂']]],
    ['わ', [['わ', 'ワ', 'ва', 'wa', '和', '和'], null, null, null, ['を', 'ヲ', 'о', 'wo', '遠', '乎']]],
    ['ん', [['ん', 'ン', 'н', 'n', '无', '尔'], null, null, null, null]],
];

const SOUND_NOTES = [
    { kana: 'つ', mn: 'цу', body: 'origins.note.tsu', easy: true },
    { kana: 'ち', mn: 'чи', body: 'origins.note.chi', easy: true },
    { kana: 'ん', mn: 'н', body: 'origins.note.n', easy: true },
    { kana: 'し', mn: 'ши', body: 'origins.note.shi' },
    { kana: 'ふ', mn: 'фу', body: 'origins.note.fu' },
    { kana: 'ら り る れ ろ', mn: 'р', body: 'origins.note.ra' },
    { kana: 'う', mn: 'у', body: 'origins.note.u' },
    { kana: 'を', mn: 'о', body: 'origins.note.wo' },
];

const WHY_LINKS = [
    { n: '一', title: 'origins.why1.h', body: 'origins.why1.p' },
    { n: '二', title: 'origins.why2.h', body: 'origins.why2.p' },
    { n: '三', title: 'origins.why3.h', body: 'origins.why3.p' },
    { n: '四', title: 'origins.why4.h', body: 'origins.why4.p' },
];

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
function esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function renderEras() {
    const host = document.getElementById('origins-eras');
    host.innerHTML = '';
    ERAS.forEach(era => {
        const d = document.createElement('details');
        d.className = 'era';
        // Native one-at-a-time where it is supported; openOneAtATime() below covers the rest.
        d.name = 'origins-chronology';

        const summary = document.createElement('summary');
        summary.setAttribute('data-when', window.t(era.when));
        // One wrapper, not a bare text node plus a block span: the summary is a grid, and a
        // display:block child breaks the anonymous inline item in two, which put the sub-line
        // in the chevron's column and pushed the chevron onto a row of its own.
        summary.innerHTML = '<span class="era-head">' + esc(window.t(era.title)) +
            '<span class="era-when-sub">' + esc(window.t(era.sub)) + '</span></span>';

        let inner = era.body.map(k => '<p>' + window.t(k) + '</p>').join('');
        if (era.pull) inner += '<p class="era-pull">' + window.t(era.pull) + '</p>';
        if (era.kaeriten) {
            inner += '<figure class="era-figure"><div class="kaeriten-row">' +
                KAERITEN.map(([c, n]) => '<div class="kaeriten-col"><span class="kaeriten-char">' + c +
                    '</span><span class="kaeriten-num">' + n + '</span></div>').join('') +
                '</div><figcaption>' + window.t(era.cap) + '</figcaption></figure>';
        } else if (era.img) {
            inner += '<figure class="era-figure"><img src="images/origins/' + era.img + '.jpg" alt="' +
                esc(window.t(era.cap).replace(/<[^>]*>/g, '')) + '" loading="lazy" decoding="async">' +
                '<figcaption>' + window.t(era.cap) + '</figcaption></figure>';
        }

        const reveal = document.createElement('div');
        reveal.className = 'era-reveal';
        reveal.innerHTML = '<div><div class="era-body">' + inner + '</div></div>';

        d.appendChild(summary);
        d.appendChild(reveal);
        host.appendChild(d);
    });
    wireEras();
}

function renderScripts() {
    document.getElementById('scripts-trio').innerHTML = SCRIPTS.map(sc =>
        '<div class="script-card is-' + sc.id + '">' +
            '<div class="sc-head">' +
                '<span class="sc-jp" lang="ja">' + sc.jp + '</span>' +
                '<span class="sc-name">' + esc(window.t('origins.scripts.' + sc.id + '.name')) + '</span>' +
            '</div>' +
            '<p class="sc-what">' + window.t('origins.scripts.' + sc.id + '.what') + '</p>' +
            '<p class="sc-job"><b>' + esc(window.t('origins.scripts.jobLabel')) + '</b> ' +
                window.t('origins.scripts.' + sc.id + '.job') + '</p>' +
            '<span class="sc-count">' + esc(window.t('origins.scripts.' + sc.id + '.count')) + '</span>' +
        '</div>'
    ).join('');

    document.getElementById('script-demo').innerHTML =
        '<p class="demo-sentence" lang="ja">' +
            DEMO.map(([txt, kind]) => '<span class="ss-' + kind + '">' + txt + '</span>').join('') +
        '</p>' +
        '<p class="demo-reading">' + esc(window.t('origins.demo.reading')) + '</p>' +
        '<p class="demo-gloss">' + esc(window.t('origins.demo.gloss')) + '</p>' +
        '<p class="demo-read">' + window.t('origins.demo.read') + '</p>';
}

// ---------------------------------------------------------------------------
// The wall
// ---------------------------------------------------------------------------
// KANA_ROWS above is the printed gojuon: eleven consonant rows of five vowels. The wall is its
// TRANSPOSE -- five vowel rows of eleven -- so the whole syllabary is one screen deep and
// nothing has to be scrolled before two kana can be compared. The vowel is what carries the
// shape (see the .v-* rules in origins.css), which is why the vowel is the row.
const VOWEL_KEYS = ['a', 'i', 'u', 'e', 'o'];
const VOWEL_MN = ['а', 'и', 'у', 'э', 'о'];

// Which face the whole wall shows: the hiragana, the katakana, or the kanji each was cut from.
// Three faces of the same 46 positions is the page's argument in one control -- the shapes stay
// put while the glyphs change, so a tile's hiragana and its source kanji are the same tile.
const KANA_MODES = [
    { id: 'hira', sym: 'あ', label: 'origins.legend.hiragana' },
    { id: 'kata', sym: 'ア', label: 'origins.legend.katakana' },
    { id: 'kanji', sym: '安', label: 'origins.legend.kanji' },
];
let kanaMode = 'hira';
// [vowel row, consonant column] of the picked tile, or null before anything is picked.
let kanaPick = null;

function cellAt(v, c) {
    const row = KANA_ROWS[c];
    return row ? row[1][v] : null;
}

function faceFor(cell) {
    if (kanaMode === 'kata') return cell[1];
    if (kanaMode === 'kanji') return cell[4];
    return cell[0];
}

function renderSwitch() {
    const host = document.getElementById('kana-switch');
    host.setAttribute('aria-label', window.t('origins.kana.show'));
    host.innerHTML = KANA_MODES.map(m =>
        '<button type="button" data-mode="' + m.id + '" aria-pressed="' + (m.id === kanaMode) + '">' +
        '<span class="ks-sym" lang="ja" aria-hidden="true">' + m.sym + '</span>' +
        esc(window.t(m.label)) + '</button>'
    ).join('');
}

function renderKana() {
    const wall = document.getElementById('kana-wall');
    // window.siteLang is a function, not a string (see i18n.js).
    const mn = window.siteLang() !== 'en';
    let html = '';
    for (let v = 0; v < 5; v++) {
        html += '<div class="kana-course v-' + VOWEL_KEYS[v] + '">' +
            '<span class="kana-vowel" aria-hidden="true">' + (mn ? VOWEL_MN[v] : VOWEL_KEYS[v]) + '</span>';
        for (let c = 0; c < KANA_ROWS.length; c++) {
            const cell = cellAt(v, c);
            if (!cell) {
                // Still occupies its column: the gaps (yi, ye, wu...) are part of the shape of
                // the syllabary, and closing them up would misalign every row below.
                html += '<span class="kana-stone is-blank" aria-hidden="true"></span>';
                continue;
            }
            html += '<button type="button" class="kana-stone m-' + kanaMode + '"' +
                ' data-v="' + v + '" data-c="' + c + '"' +
                ' aria-label="' + esc(cell[0] + ' ' + cell[1] + ' — ' + cell[3]) + '"' +
                ' lang="ja">' + faceFor(cell) + '</button>';
        }
        html += '</div>';
    }
    wall.innerHTML = html;
    paintPick();
}

// The picked tile is set DOWN rather than lifted, and its own row and column are warmed, so a
// tile can be read against the others that share its vowel or its consonant -- which is the
// only comparison the table is for.
function paintPick() {
    const wall = document.getElementById('kana-wall');
    wall.querySelectorAll('.kana-stone').forEach(s => s.classList.remove('is-on', 'is-lit'));
    if (!kanaPick) return;
    const [v, c] = kanaPick;
    wall.querySelectorAll('.kana-stone[data-v="' + v + '"], .kana-stone[data-c="' + c + '"]')
        .forEach(s => s.classList.add('is-lit'));
    const on = wall.querySelector('.kana-stone[data-v="' + v + '"][data-c="' + c + '"]');
    if (on) { on.classList.remove('is-lit'); on.classList.add('is-on'); }
}

function renderDesk() {
    const desk = document.getElementById('kana-desk');
    if (!kanaPick) {
        desk.innerHTML = '<p class="kd-note">' + esc(window.t('origins.desk.empty')) + '</p>' +
            '<p class="kd-hint">' + esc(window.t('origins.desk.keys')) + '</p>';
        return;
    }
    const cell = cellAt(kanaPick[0], kanaPick[1]);
    const [h, k, m, romaji, oh, ok] = cell;
    const deriv = (cls, from, to, label, how) =>
        '<div class="kd-deriv ' + cls + '">' +
            '<span class="kd-from" lang="ja">' + from + '</span>' +
            '<span class="kd-arrow" aria-hidden="true">&rarr;</span>' +
            '<span class="kd-to" lang="ja">' + to + '</span>' +
            '<span class="kd-label"><b>' + esc(window.t(label)) + '</b>' + esc(window.t(how)) + '</span>' +
        '</div>';
    desk.innerHTML =
        '<p class="kd-pair" lang="ja">' + h + ' ' + k + '</p>' +
        '<p class="kd-rom">' + esc(romaji) + '</p>' +
        '<p class="kd-mn">' + esc(m) + '</p>' +
        deriv('is-hira', oh, h, 'origins.desk.hira', 'origins.desk.hiraHow') +
        deriv('is-kata', ok, k, 'origins.desk.kata', 'origins.desk.kataHow') +
        '<p class="kd-note">' + esc(window.t('origins.desk.note')) + '</p>';
}

function renderNotes() {
    const host = document.getElementById('sound-notes');
    host.innerHTML = SOUND_NOTES.map(n =>
        '<div class="sound-note ' + (n.easy ? 'is-easy' : 'is-watch') + '">' +
        '<h3><span class="sn-k">' + n.kana + '</span> <span class="sn-m">' + n.mn + '</span></h3>' +
        '<p>' + window.t(n.body) + '</p></div>'
    ).join('');
}

function renderWhy() {
    const host = document.getElementById('why-chain');
    host.innerHTML = WHY_LINKS.map(l =>
        '<div class="why-link"><span class="why-num" aria-hidden="true">' + l.n + '</span>' +
        '<div><h3>' + window.t(l.title) + '</h3><p>' + window.t(l.body) + '</p></div></div>'
    ).join('');
}

// ---------------------------------------------------------------------------
// Chronology behaviour
// ---------------------------------------------------------------------------
// <details> snaps open and shut, so the animation is done on an inner grid whose row goes
// 0fr -> 1fr. Opening is easy: set open, then add the class on the next frame so the
// transition has a start value. Closing is the awkward half — the element has to STAY open
// until the collapse has finished playing, or the content vanishes instantly and only the
// summary animates.
function wireEras() {
    const eras = [...document.querySelectorAll('.era')];
    const CLOSE_MS = 380; // must match the grid-template-rows transition in origins.css

    const collapse = (d) => {
        d.classList.remove('is-open');
        clearTimeout(d._closeTimer);
        d._closeTimer = setTimeout(() => { d.open = false; }, CLOSE_MS);
    };

    eras.forEach(d => {
        const summary = d.querySelector('summary');
        summary.addEventListener('click', (e) => {
            e.preventDefault(); // we drive `open` ourselves so the close can be animated
            if (d.open && d.classList.contains('is-open')) { collapse(d); return; }

            eras.forEach(o => { if (o !== d && o.open) collapse(o); });

            clearTimeout(d._closeTimer);
            d.open = true;
            requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add('is-open')));
        });
    });
}

function wireKana() {
    const wall = document.getElementById('kana-wall');

    wall.addEventListener('click', (e) => {
        const stone = e.target.closest('.kana-stone');
        if (!stone || stone.classList.contains('is-blank')) return;
        const at = [+stone.dataset.v, +stone.dataset.c];
        // Clicking the picked tile again clears it, so the wall can be put back to rest.
        kanaPick = (kanaPick && kanaPick[0] === at[0] && kanaPick[1] === at[1]) ? null : at;
        paintPick();
        renderDesk();
    });

    // The wall is a grid, so the arrow keys have to walk it. Blanks are skipped rather than
    // stopped on -- a gap in the syllabary is not a tile.
    wall.addEventListener('keydown', (e) => {
        const step = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[e.key];
        const stone = e.target.closest && e.target.closest('.kana-stone');
        if (!step || !stone) return;
        e.preventDefault();
        let v = +stone.dataset.v, c = +stone.dataset.c;
        for (let i = 0; i < KANA_ROWS.length; i++) {
            v += step[0]; c += step[1];
            if (v < 0 || v > 4 || c < 0 || c >= KANA_ROWS.length) return;
            const next = wall.querySelector('.kana-stone[data-v="' + v + '"][data-c="' + c + '"]');
            if (next) { next.focus(); next.click(); return; }
            if (step[0]) return;   // a vertical move has only one candidate
        }
    });

    document.getElementById('kana-switch').addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-mode]');
        if (!btn || btn.dataset.mode === kanaMode) return;
        kanaMode = btn.dataset.mode;
        renderSwitch();
        renderKana();
    });
}

// ---------------------------------------------------------------------------
// Section bar
// ---------------------------------------------------------------------------
// It both navigates and reports: aria-current follows whichever section the reader is in, so
// the bar doubles as the page's position indicator. rootMargin's top offset is the masthead
// plus the bar itself, or a section would read as "in view" while sitting behind them.
function wireBar() {
    const bar = document.getElementById('origins-bar');
    const buttons = [...bar.querySelectorAll('.ob')];
    const sections = buttons.map(b => document.getElementById(b.dataset.go));

    bar.addEventListener('click', (e) => {
        const btn = e.target.closest('.ob');
        if (!btn) return;
        const target = document.getElementById(btn.dataset.go);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    const mark = (id) => buttons.forEach(b => {
        if (b.dataset.go === id) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
    });

    if (!('IntersectionObserver' in window)) return;
    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => en.isIntersecting ? seen.add(en.target.id) : seen.delete(en.target.id));
        // The topmost section still on screen, so scrolling down hands over rather than flicking
        // between two that both intersect.
        const first = sections.find(s => s && seen.has(s.id));
        mark(first ? first.id : null);
    }, { rootMargin: '-136px 0px -55% 0px' });
    sections.forEach(s => { if (s) io.observe(s); });
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
function renderAll() {
    document.getElementById('origins-bar').setAttribute('aria-label', window.t('origins.bar.label'));
    renderScripts();
    renderEras();
    renderSwitch();
    renderKana();
    renderDesk();
    renderNotes();
    renderWhy();
}

renderAll();
wireKana();
wireBar();

// Same reason every other page re-renders here: data-i18n only covers text set once at parse
// time, and everything above is built from strings at render time.
document.addEventListener('sitelangchange', renderAll);
