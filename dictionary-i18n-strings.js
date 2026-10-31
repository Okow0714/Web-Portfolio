// Dictionary (dictionary.html)-specific translation strings. Extends window.I18N_STRINGS, which
// i18n-strings-shared.js must have already created (loaded first in dictionary.html). Covers
// both tabs: the primary Mongol<->Japan lookup (dict.mnjp*) and the original Kango<->Wago
// dictionary (dict.kango/dict.wago/dict.pos*), now nested as the page's second tab.
Object.assign(window.I18N_STRINGS, {
    // Cross-tool badges on the МН-ЯП rows. The tool names themselves come from the shared
    // nav.* keys, so they stay in step with the masthead.
    'xlink.level': { en: 'Level {n}', mn: '{n}-р шат' },
    'xlink.familyKanji': { en: '{n} kanji', mn: '{n} ханз' },
    // A tooltip, because the chip itself is just "N5" -- the code is the same in both
    // languages and needs no translation, but what it measures does.
    'dict.recentTitle': { en: 'Recent searches', mn: 'Сүүлд хайсан' },
    'dict.recentEmpty': { en: 'Words you search will show up here.', mn: 'Хайсан үгс чинь энд харагдана.' },
    'dict.recentClear': { en: 'Clear', mn: 'Цэвэрлэх' },
    'a11y.searchBtn': { en: 'Search', mn: 'Хайх' },
    'xlink.jlptLevel': { en: 'JLPT level {lv}', mn: 'JLPT {lv} түвшин' },
    'xlink.readerWhere': { en: '{track} · level {n}', mn: '{track} · {n}-р шат' },
    // Short track names, matching the wording reading.html's own level select uses.
    'xlink.trackFoundation': { en: 'Foundation', mn: 'Суурь' },
    'xlink.trackAdvanced': { en: 'Advanced', mn: 'Ахисан' },

    'dict.mnjpSearchPlaceholder': { en: 'Search by Mongolian, kanji, kana, or English…', mn: 'Монгол, ханз, кана, эсвэл англи үгээр хайх…' },
    'dict.mnjpTruncated': { en: '{shown} of {total} shown — refine your search', mn: '{total}-с {shown} харуулж байна — хайлтаа тодруулна уу' },
    'dict.searchPlaceholder': { en: 'Search by kanji, kana, or English…', mn: 'Ханз, кана, эсвэл англи үгээр хайх…' },
    'dict.idle': { en: 'Type a word to search — Mongolian, Japanese, kana or kanji.', mn: 'Хайх үгээ бичнэ үү — монгол, япон, кана, эсвэл ханзаар.' },
    'dict.idleKango': { en: 'Type a word, or pick a group below.', mn: 'Хайх үгээ бичих эсвэл доорх бүлгээс сонгоно уу.' },
    'dict.wordCount': { en: '{n} words', mn: '{n} үг' },
    'dict.noMatches': { en: 'No entries match your search.', mn: 'Таны хайлттай тохирох бичлэг олдсонгүй.' },
    'dict.loadingWakan': { en: 'Loading…', mn: 'Ачааллаж байна…' },
    'dict.kango': { en: 'Kango', mn: 'Канго' },
    'dict.wago': { en: 'Wago', mn: 'Ваго' },
    'dict.posAll': { en: 'All', mn: 'Бүгд' },
    'dict.posVerb': { en: 'Verbs', mn: 'Үйл үг' },
    'dict.posNoun': { en: 'Nouns', mn: 'Нэр үг' },
    'dict.posAdjective': { en: 'Adjectives', mn: 'Тэмдэг нэр' },
    'dict.posHonorific': { en: 'Has honorific form', mn: 'Хүндэтгэлийн хэлбэртэй' },

    // MN<->JP tab: source-tag labels (which of the three merged sources confirms this word),
    // and the cross-link over to a word's Kango<->Wago partner when it has one.
    'dict.sourceGamewords': { en: 'Word Match', mn: 'Үг холбох дасгал' },
    'dict.sourceBridge': { en: 'Bridge review', mn: 'Гүүр толь бичиг' },
    'dict.sourceKangowago': { en: 'Kango ⇄ Wago', mn: 'Канго ⇄ Ваго' },
    'dict.sourceCore': { en: 'Core N5', mn: 'N5 үндсэн' },
    // Modern everyday vocabulary the JLPT word lists do not carry -- phone, shop, office.
    'dict.sourceEveryday': { en: 'Everyday', mn: 'Өдөр тутмын' },
    'dict.alsoInKangowago': { en: 'Also in Kango ⇄ Wago, paired with {word}', mn: 'Канго ⇄ Ваго-д {word}-тай хослон орсон байдаг' },
    'dict.phoneticFamily': { en: 'Phonetic family', mn: 'Дуудлагын бүлэг' },

    // The detail panel beside the list. The page has no display title any more -- the h1 is
    // this, naming what the field under it does.
    'dict.lookup': { en: 'Look up a word', mn: 'Үг хайх' },
    'dict.detailPrompt': {
        en: 'Pick a word from the list and its readings, the characters it is written with and its example sentence appear here.',
        mn: 'Жагсаалтаас үг сонгоход түүний дуудлага, бичигддэг ханзууд, жишээ өгүүлбэр нь энд гарч ирнэ.'
    },
    // "{n} kanji in this word" -- the label over the breakdown. It names the count because a
    // one-kanji word and a four-kanji word look very different in that space.
    'dict.kanjiIn': { en: 'Written with {n} kanji', mn: '{n} ханзаар бичигдэнэ' },
    // Not 'он' / 'кун': 'он' on its own is the Mongolian word for "year", and set in small
    // uppercase beside a kanji it reads as one. The full transliteration is unambiguous.
    'dict.onyomi': { en: 'on', mn: 'онёми' },
    'dict.kunyomi': { en: 'kun', mn: 'кунёми' },
    'dict.strokes': { en: '{n} strokes', mn: '{n} зураас' },
    'dict.kanjiFamily': { en: '{c} family', mn: '{c} бүлэг' },
    'dict.example': { en: 'Example', mn: 'Жишээ' },
    'dict.source': { en: 'Source', mn: 'Эх сурвалж' },
});
