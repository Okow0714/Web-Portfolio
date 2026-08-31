// Dictionary (dictionary.html)-specific translation strings. Extends window.I18N_STRINGS, which
// i18n-strings-shared.js must have already created (loaded first in dictionary.html). Covers
// both tabs: the primary Mongol<->Japan lookup (dict.mnjp*) and the original Kango<->Wago
// dictionary (dict.kango/dict.wago/dict.pos*), now nested as the page's second tab.
Object.assign(window.I18N_STRINGS, {
    'dict.titleSub': { en: 'Mongol-Japan Dictionary', mn: 'Монгол-Япон толь бичиг' },
    'dict.subtitle': {
        en: "Search a Mongolian or Japanese word and see its counterpart on the other side — merged from Word Match's translated vocabulary, a human-reviewed bridge dictionary, and the Kango ⇄ Wago pairs below, so most words are confirmed by more than one source. Click a result to see its example sentence. The Kango ⇄ Wago tab holds the original Sino-Japanese/native-Japanese dictionary, honorific forms included.",
        mn: 'Монгол эсвэл Япон үг хайж, нөгөө талын нь хос үгийг олж хараарай — Үг холбох тоглоомын орчуулгатай толь бичиг, гараар хянасан гүүр толь бичиг, доорх Канго ⇄ Ваго хосуудыг нэгтгэсэн тул ихэнх үг хоёр буюу түүнээс дээш эх сурвалжаас баталгаажсан. Жишээ өгүүлбэрийг харахын тулд үр дүн дээр дарна уу. Канго ⇄ Ваго таб нь Хятад-Япон гаралтай (канго) ба уугуул Япон (ваго) толь бичгийг, хүндэтгэлийн хэлбэрийн хамт агуулдаг.'
    },
    'dict.mnjpSearchPlaceholder': { en: 'Search by Mongolian, kanji, kana, or English…', mn: 'Монгол, ханз, кана, эсвэл англи үгээр хайх…' },
    'dict.mnjpTruncated': { en: '{shown} of {total} shown — refine your search', mn: '{total}-с {shown} харуулж байна — хайлтаа тодруулна уу' },
    'dict.searchPlaceholder': { en: 'Search by kanji, kana, or English…', mn: 'Ханз, кана, эсвэл англи үгээр хайх…' },
    'dict.noMatches': { en: 'No entries match your search.', mn: 'Таны хайлттай тохирох бичлэг олдсонгүй.' },
    'dict.kango': { en: 'Kango', mn: 'Канго' },
    'dict.wago': { en: 'Wago', mn: 'Ваго' },
    'dict.posAll': { en: 'All', mn: 'Бүгд' },
    'dict.posVerb': { en: 'Verbs', mn: 'Үйл үг' },
    'dict.posNoun': { en: 'Nouns', mn: 'Нэр үг' },
    'dict.posAdjective': { en: 'Adjectives', mn: 'Тэмдэг нэр' },
    'dict.posHonorific': { en: 'Has honorific form', mn: 'Хүндэтгэлийн хэлбэртэй' },

    // MN<->JP tab: source-tag labels (which of the three merged sources confirms this word),
    // and the cross-link over to a word's Kango<->Wago partner when it has one.
    'dict.sourceGamewords': { en: 'Word Match', mn: 'Үг холбох' },
    'dict.sourceBridge': { en: 'Bridge review', mn: 'Гүүр толь бичиг' },
    'dict.sourceKangowago': { en: 'Kango ⇄ Wago', mn: 'Канго ⇄ Ваго' },
    'dict.alsoInKangowago': { en: 'Also in Kango ⇄ Wago, paired with {word}', mn: 'Канго ⇄ Ваго-д {word}-тай хослон орсон байдаг' },
});
