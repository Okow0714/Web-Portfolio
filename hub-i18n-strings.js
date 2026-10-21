// Page-specific translation strings for the entrance-hall hub (index.html). Extends
// window.I18N_STRINGS from i18n-strings-shared.js (loaded first) with hub-only keys.
//
// The hub is a sheet of six seals now, so each tool needs two SHORT strings rather than the long
// card copy it used to carry: `.tag`, the one-line stat shown at rest, and `.short`, the
// description that replaces it on hover. A seal is a square roughly 260px across, so neither can
// run long -- the old `.desc` strings were written for a card three times the width and are gone
// along with the cards, as are the search-bar, progress-widget and per-card CTA keys.
//
// Every number below is the real one and will drift if a tool changes: 46 kana and 9 eras in
// origins.html, 60 levels and ~1,500 words in Word Match (the tilde is load-bearing -- the set is
// approximate), 1,128 kanji in phonetics-data.js, 400 sentences, 72 texts, 3,537 entries in
// MNJP_ENTRIES. Level and text totals are owned by progress-shared.js and checked by
// tests/progress-totals.spec.js; re-grep here when one of them moves.
Object.assign(window.I18N_STRINGS, {
    'hub.tagline': { en: 'Tools for learning Japanese', mn: 'Япон хэл сурах хэрэгсэл' },
    'hub.heroTitle': { en: "Let's make friends with Japanese.", mn: 'Япон хэлтэй найзалцгаая.' },
    'hub.heroBody': {
        en: 'Six sections for learning Japanese from the fundamentals.',
        mn: 'Япон хэлийг үндсээс нь сурахад зориулсан зургаан хэсгээс бүрдэнэ.'
    },

    'hub.path.kicker': { en: 'New here?', mn: 'Шинэ хэрэглэгч үү?' },
    'hub.path.name': { en: 'The path from zero to N1', mn: 'Тэгээс N1 хүртэлх зам' },
    'hub.path.desc': { en: 'Six stages, from not knowing a single character to N1 — which tool to open at each one, exactly which levels to do, and how you know you are ready for the next.', mn: 'Нэг ч үсэг танихгүй байхаас N1 хүртэлх зургаан үе шат — үе шат бүрт ямар хэрэгсэл нээх, аль шатыг хийх, дараагийнх руу шилжихэд юу чадсан байвал зохихыг бичсэн.' },
    'hub.path.cta': { en: 'See the path →', mn: 'Замыг үзэх →' },

    'hub.origins.name': { en: 'Kana Origins', mn: 'Канагийн үүсэл' },
    'hub.origins.tag': { en: '46 KANA · 9 ERAS', mn: '46 КАНА · 9 ҮЕ ШАТ' },
    'hub.origins.short': {
        en: 'Start here if Japanese writing still looks like three unrelated alphabets.',
        mn: 'Япон бичиг гурван хоорондоо хамааралгүй цагаан толгой мэт харагдсаар байвал эндээс эхэлнэ үү.'
    },

    'hub.game.name': { en: 'Word Match', mn: 'Үг холбох дасгал' },
    'hub.game.tag': { en: '~1,500 WORDS · 60 LEVELS', mn: '~1,500 ҮГ · 60 ШАТ' },
    'hub.game.short': {
        en: 'Twelve cards, six pairs, turned face down. Find them from memory, four hands to a level.',
        mn: 'Арван хоёр хөзөр, зургаан хос, нүүрээрээ хаагдана. Цээжээрээ ол — шат бүр дөрвөн гар.'
    },

    'hub.phonetics.name': { en: 'Phonetics Family', mn: 'Дуудлагын бүлэг' },
    'hub.phonetics.tag': { en: '1,128 KANJI', mn: '1,128 ХАНЗ' },
    'hub.phonetics.short': {
        en: 'Kanji grouped by the phonetic component they share. Learn one and you can guess the rest.',
        mn: 'Ханзуудыг дуудлагын язгуураар нь бүлэглэсэн. Нэг язгуурыг сурвал бусад ханзыг нь таамаглана.'
    },

    'hub.grammar.name': { en: 'Grammar Connect', mn: 'Дүрэм холбох' },
    'hub.grammar.tag': { en: '400 SENTENCES', mn: '400 ӨГҮҮЛБЭР' },
    'hub.grammar.short': {
        en: "Swap the sentence's underlined part for another word without changing what it means.",
        mn: 'Өгүүлбэрийн доогуур зураастай хэсгийг утгыг нь өөрчлөхгүйгээр өөр үгээр солино.'
    },

    'hub.reading.name': { en: 'Dokkai Reader', mn: 'Уншлагын дадлага' },
    'hub.reading.tag': { en: '72 TEXTS', mn: '72 ТЕКСТ' },
    'hub.reading.short': {
        en: 'Read aloud and it follows your voice, highlighting the word you are on.',
        mn: 'Чангаар уншихад дуу хоолойг чинь таньж, уншиж яваа үгийг дагаад тодруулна.'
    },

    'hub.dictionary.name': { en: 'Mongol-Japan Dictionary', mn: 'Монгол-Япон толь бичиг' },
    'hub.dictionary.tag': { en: '3,537 WORDS', mn: '3,537 ҮГ' },
    'hub.dictionary.short': {
        en: 'Search in Mongolian or Japanese and the counterpart comes back. It merges five sources.',
        mn: 'Монгол эсвэл япон үг хайхад нөгөө талын хос нь гарч ирнэ. Таван эх сурвалжийг нэгтгэсэн.'
    },

});
