// reading-style.js — lets a learner read the furigana in whichever script helps them most.
//
// Every tool renders readings as kana inside <ruby><rt>…</rt></ruby>, which is what a Japanese
// text does and is the right default. But a beginner who has not finished learning kana yet is
// reading one unknown script to decode another, and the site's own Kana Origins page exists
// precisely because that is a real barrier. So the same rt can be shown as kana, as romaji, or
// in the Cyrillic the rest of the site already uses for Japanese sounds.
//
// It rewrites the rendered text and keeps the kana on the element, so switching back is exact
// and nothing is lost. The underlying data is never touched.
//
// The Cyrillic column follows the table on origins.html for the plain kana. The voiced and
// combination rows are derived from it by the obvious rules; they have not had a native
// reader's eye on them, the same caveat that page already carries.

(function () {
    'use strict';

    const KEY = 'khanjp-reading-style';
    const MODES = ['kana', 'romaji', 'cyrillic'];

    // [kana, romaji, cyrillic] — combinations first, since they must match before their parts.
    const TABLE = [
        ['きゃ', 'kya', 'кя'], ['きゅ', 'kyu', 'кю'], ['きょ', 'kyo', 'кё'],
        ['しゃ', 'sha', 'ша'], ['しゅ', 'shu', 'шу'], ['しょ', 'sho', 'шо'],
        ['ちゃ', 'cha', 'ча'], ['ちゅ', 'chu', 'чу'], ['ちょ', 'cho', 'чо'],
        ['にゃ', 'nya', 'ня'], ['にゅ', 'nyu', 'ню'], ['にょ', 'nyo', 'нё'],
        ['ひゃ', 'hya', 'хя'], ['ひゅ', 'hyu', 'хю'], ['ひょ', 'hyo', 'хё'],
        ['みゃ', 'mya', 'мя'], ['みゅ', 'myu', 'мю'], ['みょ', 'myo', 'мё'],
        ['りゃ', 'rya', 'ря'], ['りゅ', 'ryu', 'рю'], ['りょ', 'ryo', 'рё'],
        ['ぎゃ', 'gya', 'гя'], ['ぎゅ', 'gyu', 'гю'], ['ぎょ', 'gyo', 'гё'],
        ['じゃ', 'ja', 'жа'], ['じゅ', 'ju', 'жу'], ['じょ', 'jo', 'жо'],
        ['びゃ', 'bya', 'бя'], ['びゅ', 'byu', 'бю'], ['びょ', 'byo', 'бё'],
        ['ぴゃ', 'pya', 'пя'], ['ぴゅ', 'pyu', 'пю'], ['ぴょ', 'pyo', 'пё'],

        ['あ', 'a', 'а'], ['い', 'i', 'и'], ['う', 'u', 'у'], ['え', 'e', 'э'], ['お', 'o', 'о'],
        ['か', 'ka', 'ка'], ['き', 'ki', 'ки'], ['く', 'ku', 'ку'], ['け', 'ke', 'кэ'], ['こ', 'ko', 'ко'],
        ['さ', 'sa', 'са'], ['し', 'shi', 'ши'], ['す', 'su', 'су'], ['せ', 'se', 'сэ'], ['そ', 'so', 'со'],
        ['た', 'ta', 'та'], ['ち', 'chi', 'чи'], ['つ', 'tsu', 'цу'], ['て', 'te', 'тэ'], ['と', 'to', 'то'],
        ['な', 'na', 'на'], ['に', 'ni', 'ни'], ['ぬ', 'nu', 'ну'], ['ね', 'ne', 'нэ'], ['の', 'no', 'но'],
        ['は', 'ha', 'ха'], ['ひ', 'hi', 'хи'], ['ふ', 'fu', 'фу'], ['へ', 'he', 'хэ'], ['ほ', 'ho', 'хо'],
        ['ま', 'ma', 'ма'], ['み', 'mi', 'ми'], ['む', 'mu', 'му'], ['め', 'me', 'мэ'], ['も', 'mo', 'мо'],
        ['や', 'ya', 'я'], ['ゆ', 'yu', 'ю'], ['よ', 'yo', 'ё'],
        ['ら', 'ra', 'ра'], ['り', 'ri', 'ри'], ['る', 'ru', 'ру'], ['れ', 're', 'рэ'], ['ろ', 'ro', 'ро'],
        ['わ', 'wa', 'ва'], ['を', 'o', 'о'], ['ん', 'n', 'н'],
        ['が', 'ga', 'га'], ['ぎ', 'gi', 'ги'], ['ぐ', 'gu', 'гу'], ['げ', 'ge', 'гэ'], ['ご', 'go', 'го'],
        ['ざ', 'za', 'за'], ['じ', 'ji', 'жи'], ['ず', 'zu', 'зу'], ['ぜ', 'ze', 'зэ'], ['ぞ', 'zo', 'зо'],
        ['だ', 'da', 'да'], ['ぢ', 'ji', 'жи'], ['づ', 'zu', 'зу'], ['で', 'de', 'дэ'], ['ど', 'do', 'до'],
        ['ば', 'ba', 'ба'], ['び', 'bi', 'би'], ['ぶ', 'bu', 'бу'], ['べ', 'be', 'бэ'], ['ぼ', 'bo', 'бо'],
        ['ぱ', 'pa', 'па'], ['ぴ', 'pi', 'пи'], ['ぷ', 'pu', 'пу'], ['ぺ', 'pe', 'пэ'], ['ぽ', 'po', 'по'],
        ['ぁ', 'a', 'а'], ['ぃ', 'i', 'и'], ['ぅ', 'u', 'у'], ['ぇ', 'e', 'э'], ['ぉ', 'o', 'о'],
    ];

    // Katakana readings appear in the phonetics data (on'yomi are conventionally katakana), so
    // the same table serves both scripts: katakana is one Unicode block above hiragana.
    const KATA = TABLE.map(([k, r, c]) => [
        k.replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60)), r, c,
    ]);

    // Combinations that exist only in katakana, for sounds Japanese borrowed rather than
    // inherited. They cannot come from the hiragana table above because they have no hiragana
    // form, and the dictionary is full of them: without these ファックス transliterates as
    // "fuakkusu" instead of "fakkusu".
    const FOREIGN = [
        ['ファ', 'fa', 'фа'], ['フィ', 'fi', 'фи'], ['フェ', 'fe', 'фэ'], ['フォ', 'fo', 'фо'],
        ['ティ', 'ti', 'ти'], ['ディ', 'di', 'ди'], ['トゥ', 'tu', 'ту'], ['ドゥ', 'du', 'ду'],
        ['ウィ', 'wi', 'ви'], ['ウェ', 'we', 'вэ'], ['ウォ', 'wo', 'во'],
        ['シェ', 'she', 'шэ'], ['ジェ', 'je', 'жэ'], ['チェ', 'che', 'чэ'],
        ['ツァ', 'tsa', 'ца'], ['ツィ', 'tsi', 'ци'], ['ツェ', 'tse', 'цэ'], ['ツォ', 'tso', 'цо'],
        ['ヴァ', 'va', 'ва'], ['ヴィ', 'vi', 'ви'], ['ヴェ', 've', 'вэ'], ['ヴォ', 'vo', 'во'], ['ヴ', 'vu', 'ву'],
        ['キェ', 'kye', 'кэ'], ['ニェ', 'nye', 'нэ'], ['ヒェ', 'hye', 'хэ'],
    ];

    const ALL = FOREIGN.concat(KATA, TABLE).sort((a, b) => b[0].length - a[0].length);

    const LONG_ROMAJI = { a: 'ā', i: 'ī', u: 'ū', e: 'ē', o: 'ō' };

    function convert(kana, mode) {
        const idx = mode === 'romaji' ? 1 : 2;
        let out = '';
        let i = 0;
        while (i < kana.length) {
            const ch = kana[i];

            // small tsu doubles the consonant that follows it
            if (ch === 'っ' || ch === 'ッ') {
                const next = ALL.find(e => kana.startsWith(e[0], i + 1));
                const sound = next ? next[idx] : '';
                const first = sound.match(/^(ch|sh|ts|[a-zа-яё])/i);
                out += first ? first[0][0] : '';
                i += 1;
                continue;
            }

            // the katakana長音 mark lengthens whatever vowel it follows
            if (ch === 'ー') {
                const last = out.slice(-1);
                if (mode === 'romaji' && LONG_ROMAJI[last]) out = out.slice(0, -1) + LONG_ROMAJI[last];
                else if (last) out += last;
                i += 1;
                continue;
            }

            const hit = ALL.find(e => kana.startsWith(e[0], i));
            if (hit) {
                out += hit[idx];
                i += hit[0].length;
            } else {
                out += ch;   // kanji, punctuation, anything not kana: left exactly as it is
                i += 1;
            }
        }

        // おう / うう are long vowels, not two syllables. Only in romaji: the Cyrillic on this
        // site writes them out, the way the kana table on origins.html does.
        if (mode === 'romaji') {
            out = out.replace(/ou/g, 'ō').replace(/uu/g, 'ū');
        }
        return out;
    }

    function read() {
        try {
            const v = localStorage.getItem(KEY);
            return MODES.includes(v) ? v : 'kana';
        } catch (e) { return 'kana'; }
    }

    let observer = null;

    function apply(root) {
        const mode = read();
        const scope = root && root.querySelectorAll ? root : document;
        scope.querySelectorAll('rt').forEach(rt => {
            if (rt.dataset.kana === undefined) rt.dataset.kana = rt.textContent;
            const want = mode === 'kana' ? rt.dataset.kana : convert(rt.dataset.kana, mode);
            if (rt.textContent !== want) rt.textContent = want;
        });
    }

    // Every tool renders its ruby at run time, and re-renders it on a language change, so this
    // watches rather than running once. Disconnected while applying: writing to an rt is itself
    // a mutation, and re-entering here would be an infinite loop.
    let queued = false;
    function refresh() {
        if (observer) observer.disconnect();
        apply(document);
        if (observer) observer.observe(document.body, { childList: true, subtree: true });
        queued = false;
    }

    function start() {
        refresh();
        observer = new MutationObserver(() => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(refresh);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.getReadingStyle = read;
    window.setReadingStyle = function (mode) {
        try { localStorage.setItem(KEY, MODES.includes(mode) ? mode : 'kana'); } catch (e) { /* private mode */ }
        refresh();
        document.dispatchEvent(new CustomEvent('readingstylechange', { detail: { mode: read() } }));
    };
    // Exposed so a page can convert a reading it renders outside a <ruby> if it ever needs to.
    window.convertKana = convert;

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
