// Phonetics Family (phonetics.html)-specific translation strings. Extends window.I18N_STRINGS,
// which i18n-strings-shared.js must have already created (loaded first in phonetics.html).
Object.assign(window.I18N_STRINGS, {
    'phonetics.titleMain': { en: 'Phonetics Family', mn: 'Дуудлагын бүлэг' },
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
        en: 'Phonetic families are different at every level. Once you have picked, this shrinks to a chip in the corner.',
        mn: 'Дуудлагын бүлгүүд түвшин бүрт өөр. Сонгосны дараа буланд багасна.'
    },
    'phonetics.gateAria': { en: '{level} — {n} shapes', mn: '{level} — {n} язгуур' },
    'phonetics.pickStage': { en: 'Which stage do you want to start from?', mn: 'Аль шатнаас эхлэх вэ?' },
    'phonetics.boardSub': { en: '{n} shapes · tap one to open its family', mn: '{n} язгуур · дарж бүлгийг нь нээнэ' },
    'phonetics.allShapes': { en: 'All shapes', mn: 'Бүх язгуур' },

    // The node panel. It says plainly whether the component was right about this kanji, because
    // that is the only thing the whole page is claiming, and about a third of members break it.
    'phonetics.ndHolds': { en: '{c} predicts {sound} — and this kanji takes it.', mn: '{c} нь {sound} гэж заадаг — энэ ханз түүнийг авсан.' },
    'phonetics.ndBreaks': { en: '{c} predicts {sound} — this kanji does not take it.', mn: '{c} нь {sound} гэж заадаг — энэ ханз түүнийг аваагүй.' },
    'phonetics.ndShows': { en: 'Here {kanji} is read {sound}.', mn: 'Энд {kanji} нь {sound} гэж уншигдаж байна.' },
    'phonetics.ndOtherSound': { en: 'That is another of this family\'s sounds, not the one above.', mn: 'Энэ нь дээрхи биш, бүлгийн өөр нэг дуудлага.' },
    'phonetics.ndNoExample': {
        en: 'No sentence in the data reads this kanji with one of its family\'s sounds, so none is shown — a wrong example would argue against the pattern.',
        mn: 'Энэ ханзыг бүлгийнх нь дуудлагаар уншсан өгүүлбэр эх өгөгдөлд алга тул үзүүлээгүй — буруу жишээ нь хэв журмыг нь эвдэх байсан.'
    },
    'phonetics.changeLevel': { en: 'change level', mn: 'түвшин солих' },

    // The board itself. The page's own name stays the eyebrow above this; the h1 is what the
    // screen asks you to do, because that is the lesson and the index was never it.
    'phonetics.boardTitle': { en: 'Guess the reading', mn: 'Дуудлагыг нь таа' },
    'phonetics.boardRule': {
        en: 'The shape in the middle gives you a <b>reading to try</b>. Every kanji around it contains that shape. <b>Guess first, then tap to check.</b>',
        mn: 'Голд байгаа хэлбэр нь <b>дуудлагыг</b> хэлнэ. Эргэн тойрны ханз бүр түүнийг дотроо агуулсан. <b>Эхлээд таа, дараа нь дарж шалга.</b>'
    },
    'phonetics.tryThis': { en: 'try this reading', mn: 'энэ дуудлагыг оролд' },
    'phonetics.tapToCheck': { en: 'tap to check', mn: 'дарж шалга' },
    'phonetics.checked': { en: 'Checked {n}/{total}', mn: 'Шалгасан {n}/{total}' },
    'phonetics.matched': { en: '{n} matched', mn: '{n} таарсан' },
    'phonetics.unmatched': { en: '{n} did not', mn: '{n} таараагүй' },
    'phonetics.revealAll': { en: 'Reveal all', mn: 'Бүгдийг нээх' },
    'phonetics.guessAgain': { en: 'Guess again', mn: 'Дахин таах' },

    'phonetics.legendHit': { en: 'answered right', mn: 'зөв хариулсан' },
    'phonetics.legendMiss': { en: 'missed', mn: 'алдсан' },
    'phonetics.legendNew': { en: 'not asked yet', mn: 'хараахан асуугаагүй' },

    // The drill's entry panel. The round itself runs full screen on phonetics-drill.html.
    'phonetics.drillPanelSub': {
        en: 'Ten shapes a round. Hiragana, katakana or romaji all count. Your answers colour the list above.',
        mn: 'Нэг удаад 10 хэлбэр. Хирагана, катакана, ромажи аль нь ч болно. Хариулт нь дээрх жагсаалтыг өнгөөр тэмдэглэнэ.'
    },
    'phonetics.startRound': { en: 'Start — {n} cards', mn: 'Эхлэх — {n} карт' },
    'phonetics.pickDeck': { en: 'Which shapes should it ask about? {n} at a time.', mn: 'Аль язгуураас асуух вэ? Нэг удаад {n}.' },
    'phonetics.deckNewSub': { en: 'not asked yet', mn: 'хараахан асуугаагүй' },
    'phonetics.deckMissSub': { en: 'last answer was wrong', mn: 'сүүлд буруу хариулсан' },
    'phonetics.deckHitSub': { en: 'last answer was right', mn: 'сүүлд зөв хариулсан' },
    'phonetics.deckAllSub': { en: 'every shape in this stage', mn: 'энэ шатны бүх язгуур' },
    'phonetics.exitRound': { en: 'Exit', mn: 'Гарах' },
    'phonetics.nRight': { en: '{n} right', mn: '{n} зөв' },
    'phonetics.nWrong': { en: '{n} wrong', mn: '{n} буруу' },
    'phonetics.roundTally': { en: '{hit} known · {miss} missed · {new} not asked', mn: '{hit} мэдсэн · {miss} алдсан · {new} асуугаагүй' },
    'phonetics.noShapes': { en: 'No shapes at this stage.', mn: 'Энэ шатанд язгуур алга.' },

    'phonetics.wavesTitle': { en: 'Why does one kanji have two readings?', mn: 'Яагаад нэг ханз хоёр дуудлагатай байдаг вэ?' },
    'phonetics.wavesBody': {
        en: '<p>Japanese borrowed Chinese readings <b>in waves, not once</b>: <span class="jp">呉音</span> (go-on) in the 5th–6th century, <span class="jp">漢音</span> (kan-on) in the 7th–9th.</p><p>So <span class="jp">生</span> is both <span class="jp">セイ</span>(漢) and <span class="jp">ショウ</span>(呉). The component gives you a <b>reading to try</b> — if it turns up anywhere in that kanji\'s set, the pattern held.</p>',
        mn: '<p>Япон хэл хятад дуудлагыг <b>нэг удаа биш, давалгаагаар</b> зээлсэн. 5–6-р зуунд <span class="jp">呉音</span> (го-он), 7–9-р зуунд <span class="jp">漢音</span> (кан-он).</p><p>Тиймээс <span class="jp">生</span> нь <span class="jp">セイ</span>(漢) ба <span class="jp">ショウ</span>(呉) хоёулаа. Язгуур нь танд <b>оролдох дуудлага</b> өгнө — тэр нь ханзны жагсаалтад байвал хэв ажилласан.</p>'
    },
    // Stages, for the levels too big to meet whole: N1 alone carries 155 shapes.
    'phonetics.stagesLabel': { en: 'Stage', mn: 'Шат' },
    'phonetics.cpShapes': { en: '{n} shapes', mn: '{n} язгуур' },
    'phonetics.cpDone': { en: '{n} right', mn: '{n} зөв' },
    'phonetics.cpAria': {
        en: 'Stage {n} of {total} — {count} shapes, {done} answered correctly',
        mn: '{total} шатны {n} дахь — {count} язгуур, {done} нь зөв'
    }
});
