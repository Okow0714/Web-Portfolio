// Phonetics Family (phonetics.html)-specific translation strings. Extends window.I18N_STRINGS,
// which i18n-strings-shared.js must have already created (loaded first in phonetics.html).
Object.assign(window.I18N_STRINGS, {
    'phonetics.titleMain': { en: 'Phonetics Family', mn: 'Дуудлагын бүлэг' },
    'phonetics.subtitle': {
        en: "Kanji that share a phonetic component often share an on'yomi reading too — learn one, and you get a running start on the rest of its family. Pick a JLPT level to see its phonetic families, ranked by how often their most common member actually shows up in real Japanese text.",
        mn: 'Ижил дуудлагын язгууртай ханзууд ихэвчлэн онёми дуудлага нь ч ижил байдаг — нэгийг нь сурвал бусад нь амар болно. JLPT түвшингээ сонгоод тэр түвшний дуудлагын бүлгүүдийг үзээрэй. Бүлгүүдийг хамгийн түгээмэл гишүүн нь япон бичвэрт хэр олон тааралддагаар эрэмбэлсэн.'
    },
    'phonetics.whatIsPhoneticComponent': { en: "What's a phonetic component?", mn: 'Дуудлагын язгуур гэж юу вэ?' },
    'phonetics.families': { en: 'Families', mn: 'Бүлгүүд' },
    'phonetics.modalTitle': { en: "What's a Phonetic Component?", mn: 'Дуудлагын язгуур гэж юу вэ?' },
    'phonetics.stageComponent': { en: 'component', mn: 'язгуур' },
    'phonetics.stagePhonetic': { en: 'phonetic (相 &middot; ソウ)', mn: 'дуудлага (相 &middot; ソウ)' },
    'phonetics.stageKanji': { en: 'kanji (想 &middot; そう &middot; to think/imagine)', mn: 'ханз (想 &middot; そう &middot; бодох/төсөөлөх)' },
    'phonetics.stageCombination': { en: 'combination (想像 &middot; そうぞう &middot; imagination)', mn: 'нийлбэр үг (想像 &middot; そうぞう &middot; төсөөлөл)' },
    'phonetics.explainerText': {
        en: 'A "phonetic component" is a recurring part inside a kanji that hints at its Chinese-derived on\'yomi reading, rather than its meaning. Kanji sharing the same phonetic component — like 相, 想, and 霜 above — often sound alike even though they mean very different things, because the component was originally chosen for its sound. A separate "meaning radical" (like 心, heart, tucked into 想) is what actually carries the sense.',
        mn: '«Дуудлагын язгуур» гэдэг нь ханзны дотор давтагдан орох хэсэг бөгөөд утгыг нь бус, Хятадаас гаралтай онёми дуудлагыг нь заадаг. Ижил язгууртай ханзууд — дээрх 相, 想, 霜 шиг — утгаараа эрс өөр байсан ч дуудлага нь ойролцоо байдаг, учир нь язгуурыг нь анхнаасаа дуудлагаар нь сонгосон юм. Утгыг нь харин тусдаа «утгын радикал» илэрхийлдэг — жишээ нь 想 дотор багтсан 心, зүрх.'
    },
    'phonetics.levelFamiliesTitle': { en: '{level} — Phonetic Families', mn: '{level} — Дуудлагын бүлгүүд' },
    'phonetics.familiesRankedHint': {
        en: '{n} families, ranked by how often their most-used {level} member appears in real Japanese text.',
        mn: '{n} бүлэг. {level} түвшний хамгийн түгээмэл гишүүн нь япон бичвэрт хэр их тааралддагаар эрэмбэлэв.'
    },
    'phonetics.noPhoneticKanjiHint': { en: 'No phonetic-bearing kanji are tagged at this level in the source data.', mn: 'Энэ түвшинд дуудлагын язгууртай ханз эх өгөгдөлд тэмдэглэгдээгүй байна.' },
    'phonetics.seenFamily': { en: 'seen', mn: 'үзсэн' },
    'phonetics.metInFamily': { en: '{n}/{total} met', mn: '{total}-аас {n}-г нь үзсэн' },
    'phonetics.kanjiInFamily': { en: '{n} kanji in this family', mn: 'энэ бүлэгт {n} ханз' },
    'phonetics.noExampleForKanji': { en: 'No example sentence found for this kanji in the source data.', mn: 'Энэ ханзны жишээ өгүүлбэр эх өгөгдөлд олдсонгүй.' },
    'phonetics.familyForLevelHint': { en: 'Phonetic family for {level} · {n} kanji share this component dictionary-wide. Tap a kanji to see its details.', mn: '{level} түвшний дуудлагын бүлэг · толь бичигт энэ язгууртай нийт {n} ханз байна. Дэлгэрэнгүйг харахын тулд ханз дээр дарна уу.' },
    'phonetics.shared': { en: 'shared', mn: 'нийтлэг' },
});

// ---- Phonetics drill (phonetics-drill.html) ----
Object.assign(window.I18N_STRINGS, {
    "drill.back": { en: "Back to the board", mn: "Самбар руу буцах" },
    "drill.toBoard": { en: "Back to the board", mn: "Самбар руу буцах" },
    "drill.checkpoint": { en: "stage", mn: "шат" },
    "drill.allShapes": { en: "all shapes", mn: "бүх хэлбэр" },
    "drill.shapes": { en: "shapes", mn: "хэлбэр" },
    "drill.lead": {
        en: "Ten shapes a round. Look at the shape and type the sound it gives — hiragana, katakana or romaji, whichever you like.",
        mn: "Нэг удаад 10 хэлбэр. Хэлбэрийг хараад дуудлагыг нь бичнэ — хирагана, катакана, ромажи аль нь ч болно."
    },
    "drill.deckNew": { en: "New", mn: "Шинэ" },
    "drill.deckMiss": { en: "Missed", mn: "Алдсан" },
    "drill.deckHit": { en: "Known", mn: "Мэдсэн" },
    "drill.deckAll": { en: "All", mn: "Бүгд" },
    "drill.questions": { en: "questions", mn: "асуулт" },
    "drill.empty": { en: "This deck is empty", mn: "Багц хоосон" },
    "drill.otherCp": { en: "Other stage:", mn: "Өөр шат:" },
    "drill.ask": { en: "What sound does this shape give?", mn: "Энэ хэлбэр ямар дуудлага өгдөг вэ?" },
    "drill.inputLabel": { en: "Type the reading", mn: "Дуудлагыг бичнэ үү" },
    "drill.check": { en: "Check", mn: "Шалгах" },
    "drill.hint": { en: "Hiragana, katakana or romaji — any of them.", mn: "Хирагана, катакана, ромажи — аль нь ч болно." },
    "drill.nextHint": { en: "Enter — next", mn: "Enter — дараагийх" },
    "drill.doneHint": { en: "Enter — result", mn: "Enter — дүн" },
    "drill.next": { en: "Next", mn: "Дараагийх" },
    "drill.result": { en: "Result", mn: "Дүн" },
    "drill.right": { en: "Right", mn: "Зөв" },
    "drill.wrong": { en: "Wrong", mn: "Буруу" },
    "drill.again": { en: "Another 10", mn: "Дахин 10" },
    "drill.changeDeck": { en: "Change deck", mn: "Багц солих" },
    "phon.drillCta": { en: "Flash-card drill", mn: "Флаш карт дасгал" },

    // The arrival gate. The pane used to default to N5, which answered this question for the
    // visitor; now it is asked once and the sidebar handles every change after that.
    'phonetics.gateTitle': { en: 'Pick your level', mn: 'Түвшингээ сонгоно уу' },
    'phonetics.gateHint': {
        en: 'Phonetic families are different at every level. Once you have picked, the menu on the left changes it whenever you like.',
        mn: 'Дуудлагын бүлгүүд түвшин бүрт өөр. Сонгосны дараа зүүн талын цэснээс хэдийд ч солиж болно.'
    },
    'phonetics.gateCount': { en: '{n} families', mn: '{n} бүлэг' },
    // Stages, for the levels too big to meet whole: N1 alone carries 332 families. Only the
    // screen-reader label is a sentence -- the visible label is the bare "12/82" the meter draws.
    'phonetics.cpAria': {
        en: 'Stage {n} of {total} — {done} of {count} families answered correctly',
        mn: '{total} шатны {n} дахь — {count} бүлгээс {done}-г нь зөв хариулсан'
    }
});
