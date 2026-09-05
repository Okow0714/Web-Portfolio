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
        summary.innerHTML = esc(window.t(era.title)) +
            '<span class="era-when-sub">' + esc(window.t(era.sub)) + '</span>';

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

function renderKana() {
    const grid = document.getElementById('kana-grid');
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    frag.appendChild(Object.assign(document.createElement('div'), { className: 'kana-colhead' }));
    ['-а', '-и', '-у', '-э', '-о'].forEach(h => {
        frag.appendChild(Object.assign(document.createElement('div'), { className: 'kana-colhead', textContent: h }));
    });
    KANA_ROWS.forEach(([label, cells]) => {
        frag.appendChild(Object.assign(document.createElement('div'), { className: 'kana-rowhead', textContent: label }));
        cells.forEach(c => {
            if (!c) {
                frag.appendChild(Object.assign(document.createElement('div'), { className: 'kana-tile is-blank' }));
                return;
            }
            const [h, k, mn, romaji, oh, ok] = c;
            const t = document.createElement('button');
            t.type = 'button';
            t.className = 'kana-tile';
            t.setAttribute('aria-expanded', 'false');
            t.setAttribute('aria-label', h + ' ' + k + ' — ' + romaji);
            t.innerHTML =
                '<span class="kana-pair">' + h + '<i>' + k + '</i></span>' +
                '<span class="kana-mn">' + mn + '</span>' +
                '<span class="kana-detail"><span><span class="kana-detail-inner">' +
                    '<span class="kana-romaji">' + romaji + '</span>' +
                    '<span class="kana-from"><b>' + oh + '</b>&rarr;' + h + ' &nbsp; <b>' + ok + '</b>&rarr;' + k + '</span>' +
                '</span></span></span>';
            frag.appendChild(t);
        });
    });
    grid.appendChild(frag);
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
    const grid = document.getElementById('kana-grid');
    grid.addEventListener('click', (e) => {
        const tile = e.target.closest('.kana-tile');
        if (!tile || tile.classList.contains('is-blank')) return;
        tile.setAttribute('aria-expanded', tile.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
function renderAll() {
    renderEras();
    renderKana();
    renderNotes();
    renderWhy();
}

renderAll();
wireKana();

// Same reason every other page re-renders here: data-i18n only covers text set once at parse
// time, and everything above is built from strings at render time.
document.addEventListener('sitelangchange', renderAll);
