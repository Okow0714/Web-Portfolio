// Phonetics Family (phonetics.html)-specific translation strings. Extends window.I18N_STRINGS,
// which i18n-strings-shared.js must have already created (loaded first in phonetics.html).
Object.assign(window.I18N_STRINGS, {
    'phonetics.titleMain': { en: 'Phonetics Family', mn: 'Дуудлагын бүлэг' },
    // The speaker reads out its own step, since the icon's four states are only
    // distinguishable to someone who can see them.
    'phonetics.volumeAria': { en: 'Volume {n} of 3', mn: 'Дууны түвшин: 3-аас {n}' },
    'phonetics.whatIsPhoneticComponent': { en: "What's a phonetic component?", mn: 'Дуудлагын язгуур гэж юу вэ?' },
    'phonetics.modalTitle': { en: "What's a Phonetic Component?", mn: 'Дуудлагын язгуур гэж юу вэ?' },
    'phonetics.stageComponent': { en: 'component', mn: 'язгуур' },
    'phonetics.stagePhonetic': { en: 'phonetic (相 &middot; ソウ)', mn: 'дуудлага (相 &middot; ソウ)' },
    'phonetics.stageKanji': { en: 'kanji (想 &middot; そう &middot; to think/imagine)', mn: 'ханз (想 &middot; そう &middot; бодох/төсөөлөх)' },
    'phonetics.stageCombination': { en: 'combination (想像 &middot; そうぞう &middot; imagination)', mn: 'нийлбэр үг (想像 &middot; そうぞう &middot; төсөөлөл)' },
    'phonetics.explainerText': {
        en: 'A "phonetic component" is a recurring part inside a kanji that hints at its Chinese-derived on\'yomi reading, rather than its meaning. Kanji sharing the same phonetic component — like 相, 想, and 霜 above — often sound alike even though they mean very different things, because the component was originally chosen for its sound. A separate "meaning radical" (like 心, heart, tucked into 想) is what actually carries the sense.',
        mn: '«Дуудлагын язгуур» гэдэг нь ханзны дотор давтагдан орох хэсэг бөгөөд утгыг нь бус, хятад хэлнээс гаралтай онёми дуудлагыг нь заадаг. Ижил язгууртай ханзууд — дээрх 相, 想, 霜 шиг — утгаараа эрс өөр байсан ч дуудлага нь ойролцоо байдаг, учир нь язгуурыг нь анхнаасаа дуудлагаар нь сонгосон юм. Утгыг нь харин тусдаа «утгын радикал» илэрхийлдэг — жишээ нь 想 дотор багтсан 心, зүрх.'
    },
    'phonetics.kanjiInFamily': { en: '{n} kanji in this family', mn: 'энэ бүлэгт {n} ханз' },
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
        mn: "Нэг удаад 10 хэлбэр. Хэлбэрийг хараад дуудлагыг нь бичнэ үү. Хирагана, катакана, ромажи аль нь ч болно."
    },
    "drill.deckNew": { en: "New", mn: "Шинэ" },
    "drill.deckMiss": { en: "Missed", mn: "Алдсан" },
    "drill.deckHit": { en: "Known", mn: "Мэдсэн" },
    "drill.deckAll": { en: "All", mn: "Бүгд" },
    "drill.questions": { en: "questions", mn: "асуулт" },
    "drill.empty": { en: "This deck is empty", mn: "Багц хоосон байна" },
    "drill.otherCp": { en: "Other stage:", mn: "Өөр шат:" },
    "drill.ask": { en: "What sound does this shape give?", mn: "Энэ хэлбэр ямар дуудлага өгдөг вэ?" },
    "drill.inputLabel": { en: "Type the reading", mn: "Дуудлагыг бичнэ үү" },
    "drill.check": { en: "Check", mn: "Шалгах" },
    "drill.hint": { en: "Hiragana, katakana or romaji — any of them.", mn: "Хирагана, катакана, ромажи — аль нь ч болно." },
    "drill.nextHint": { en: "Enter — next", mn: "Enter — дараагийх" },
    "drill.doneHint": { en: "Enter — result", mn: "Enter — дүн" },
    "drill.next": { en: "Next", mn: "Дараах" },
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
        en: 'Phonetic families are different at every level. Once you have picked, this shrinks to a chip in the corner.',
        mn: 'Дуудлагын бүлгүүд түвшин бүрт өөр өөр байна. Сонгосны дараа энэ хэсэг буланд багасна.'
    },
    'phonetics.gateAria': { en: '{level} — {n} shapes', mn: '{level} — {n} язгуур' },
    'phonetics.pickStage': { en: 'Which stage do you want to start from?', mn: 'Аль шатнаас эхлэх вэ?' },
    'phonetics.boardSub': { en: '{n} shapes · tap one to open its family', mn: '{n} язгуур · дарж бүлгийг нь нээнэ' },
    'phonetics.allShapes': { en: 'All shapes', mn: 'Бүх язгуур' },

    // The node panel. It says plainly whether the component was right about this kanji, because
    // that is the only thing the whole page is claiming, and about a third of members break it.
    'phonetics.ndHolds': { en: '{c} predicts {sound} — and this kanji takes it.', mn: '{c} нь {sound} гэж заадаг бөгөөд энэ ханз түүнийг авсан байна.' },
    'phonetics.ndBreaks': { en: '{c} predicts {sound} — this kanji does not take it.', mn: '{c} нь {sound} гэж заадаг ч энэ ханз түүнийг аваагүй.' },
    'phonetics.ndShows': { en: 'Here {kanji} is read {sound}.', mn: 'Энд {kanji} нь {sound} гэж уншигддаг.' },

    // Seven kanji on the whole board take none of the sounds their shape shares, and the tree now
    // draws them adrift rather than on a dashed line. The copy is deliberately about what is
    // measurable -- no sibling takes that reading either -- and the general reason, because the
    // specific history is only documented for 訳.
    'phonetics.adriftCaption': { en: '{kanji} is adrift', mn: '{kanji} тасарсан' },
    'phonetics.adriftTitle': {
        en: '{kanji} reads {on} — a sound no other kanji in this family takes.',
        mn: '{kanji} нь {on} гэж уншигддаг — энэ бүлгийн өөр ямар ч ханз тэр дуудлагыг авдаггүй.'
    },
    'phonetics.adriftWhy': {
        en: 'A shared component records how these characters sounded in Chinese, long before Japanese borrowed them. Some of those sound families had already split apart by then, so a character can belong to the group by shape and history and still arrive in Japanese with a reading of its own.',
        mn: 'Нийтлэг язгуур нь эдгээр ханз хятад хэлэнд хэрхэн дуудагддаг байсныг тэмдэглэж үлдээсэн байдаг. Япончууд тэднийг зээлэн авахаас нэлээд өмнө зарим дуудлагын бүлэг аль хэдийн салчихсан байжээ. Тиймээс ханз хэлбэр, түүхээрээ нэг бүлэгт багтсан ч япон хэлэнд өөрийн гэсэн тусдаа уншлагатай орж ирж болно.'
    },
    'phonetics.adriftShape': {
        en: '{kanji} also changed shape: it was written {old}, whose sound part was {phonetic}, not {shape}. The postwar reform replaced {phonetic} with the simpler {shape} here and in {also}. The shape groups them; the reading came from the older part.',
        mn: '{kanji} нь хэлбэрээ ч сольсон: урьд нь {old} гэж бичигддэг байсан бөгөөд дуудлагын хэсэг нь {shape} биш, {phonetic} байжээ. Дайны дараах шинэчлэлээр {phonetic} хэсгийг энд болон {also} дотор илүү энгийн {shape} хэлбэрээр сольсон юм. Хэлбэр нь тэднийг нэгтгэдэг ч уншлага нь хуучин хэсгээсээ гаралтай хэвээр.'
    },
    // A compound regularly voices or clips the sound it borrows. That is not an exception to the
    // pattern, it is part of it, so the page names the change instead of hiding it.
    'phonetics.ndChanged': { en: 'A compound voices {from} to {to}.', mn: 'Нийлмэл үгэнд {from} нь {to} болж хувирдаг.' },
    'phonetics.ndOtherSound': { en: 'That is another of this family\'s sounds, not the one above.', mn: 'Энэ нь дээрх дуудлага биш, бүлгийн өөр нэг дуудлага.' },
    'phonetics.ndNoExample': {
        en: 'No word in the data reads this kanji with one of its family\'s sounds, so none is shown — a wrong example would argue against the pattern.',
        mn: 'Энэ ханзыг бүлгийнх нь дуудлагаар уншсан үг эх өгөгдөлд алга тул үзүүлсэнгүй. Буруу жишээ нь зүй тогтлыг нь үгүйсгэх байсан.'
    },
    'phonetics.changeLevel': { en: 'change level', mn: 'түвшин солих' },

    // The board itself. The page's own name stays the eyebrow above this; the h1 is what the
    // screen asks you to do, because that is the lesson and the index was never it.

    'phonetics.legendHit': { en: 'answered right', mn: 'зөв хариулсан' },
    'phonetics.legendMiss': { en: 'missed', mn: 'алдсан' },
    'phonetics.legendNew': { en: 'not asked yet', mn: 'хараахан асуугаагүй' },

    // The drill's entry panel. The round itself runs full screen on phonetics-drill.html.
    'phonetics.pickDeck': { en: 'Which shapes should it ask about? {n} at a time.', mn: 'Аль язгуураас асуух вэ? Нэг удаад {n}.' },
    'phonetics.deckNewSub': { en: 'not asked yet', mn: 'хараахан асуугаагүй' },
    'phonetics.deckMissSub': { en: 'last answer was wrong', mn: 'сүүлд буруу хариулсан' },
    'phonetics.deckHitSub': { en: 'last answer was right', mn: 'сүүлд зөв хариулсан' },
    'phonetics.deckAllSub': { en: 'every shape in this stage', mn: 'энэ шатны бүх язгуур' },
    'phonetics.exitRound': { en: 'Exit', mn: 'Гарах' },
    'phonetics.nRight': { en: '{n} right', mn: '{n} зөв' },
    'phonetics.nWrong': { en: '{n} wrong', mn: '{n} буруу' },
    'phonetics.roundTally': { en: '{hit} known · {miss} missed · {new} not asked', mn: '{hit} мэдсэн · {miss} алдсан · {new} асуугаагүй' },

    // Stages, for the levels too big to meet whole: N1 alone carries 155 shapes.
    'phonetics.cpShapes': { en: '{n} shapes', mn: '{n} язгуур' },
    'phonetics.cpAria': {
        en: 'Stage {n} of {total} — {count} shapes, {done} answered correctly',
        mn: '{total} шатны {n} дахь — {count} язгуур, {done} нь зөв'
    }
});
