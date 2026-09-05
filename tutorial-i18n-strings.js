// Strings for the first-visit page tours (tutorial.js). Extends window.I18N_STRINGS, which
// i18n-strings-shared.js must have created first.
//
// One key per coach mark. Each one is read while the thing it describes is lit up on screen,
// so they are written to name what is highlighted rather than to introduce it -- "this row",
// "this number" -- and kept to a sentence or two, because a tooltip beside a control is not
// the place for the full rules.
Object.assign(window.I18N_STRINGS, {

    'tour.stepOf': { en: 'Step {n} of {total}', mn: '{total}-аас {n}-р алхам' },
    'tour.next': { en: 'Next', mn: 'Цааш' },
    'tour.skip': { en: 'Skip', mn: 'Алгасах' },
    'tour.close': { en: 'Done', mn: 'Ойлголоо' },
    'tour.help': { en: 'How this works', mn: 'Хэрхэн ажилладаг вэ' },

    // --- the notation key, shown once for the whole site ----------------------
    'tour.key.h': { en: 'Reading what you see', mn: 'Харагдаж буйг хэрхэн унших вэ' },
    'tour.key.furigana': {
        en: 'Small kana above a kanji is <b>furigana</b> — it tells you how that kanji is read here. Example sentences and dictionary entries use it throughout.',
        mn: 'Ханзны дээр байгаа жижиг кана бол <b>фуригана</b> — тухайн ханзыг энд яаж уншихыг заана. Жишээ өгүүлбэр, толь бичгийн үгсэд бүгдэд нь хэрэглэсэн байгаа.'
    },
    'tour.key.cyrillic': {
        en: 'Japanese sounds are written in Mongolian letters where it helps. They are close but not exact — <a href="origins.html#kana">Kana Origins</a> covers the eight that need a note.',
        mn: 'Япон дуудлагыг тус болохоор нь монгол үсгээр бичсэн байгаа. Ойролцоо ч яг тохирохгүй — тайлбар шаардах наймыг <a href="origins.html">Канагийн үүсэл</a> хуудсаас үзээрэй.'
    },
    'tour.key.jlpt': {
        en: 'A JLPT level badge. N5 is the beginner end and N1 the hardest; the colour runs green to wine across the site.',
        mn: 'JLPT түвшний тэмдэг. N5 нь хамгийн анхан, N1 нь хамгийн гүнзгий; өнгө нь сайтын турш ногооноос дарсан улаан руу шилжинэ.'
    },

    // --- Word Match -----------------------------------------------------------
    'tour.game.tiers': {
        en: 'Five JLPT tiers, twelve levels each. Start at N5 — that is beginner vocabulary.',
        mn: 'JLPT-ийн таван түвшин, тус бүр 12 шаттай. N5-аас эхлээрэй — анхан шатны үгс байгаа.'
    },
    'tour.game.levels': {
        en: 'One level is 20 word pairs. A level you have finished stays marked, and your best time is kept if you are signed in.',
        mn: 'Нэг шатад 20 хос үг байна. Дуусгасан шат тэмдэглэгдэж үлдэх бөгөөд нэвтэрсэн бол хамгийн сайн цаг чинь хадгалагдана.'
    },
    'tour.game.sound': {
        en: 'Music and sound effects. They start on — tap here to mute.',
        mn: 'Хөгжим, дуу чимээ. Асаалттай эхэлдэг — дуугүй болгохыг хүсвэл эндээс дарна уу.'
    },
    'tour.game.timer': {
        en: 'Your clock. It starts at four minutes and every pair you match puts twenty seconds back on it.',
        mn: 'Таны цаг. Дөрвөн минутаас эхлэх бөгөөд хос таарах бүрд 20 секунд нэмэгдэнэ.'
    },
    'tour.game.pairs': {
        en: 'Pairs left, and mistakes made. Two mistakes bring an already-cleared pair back onto the board, so it is worth slowing down.',
        mn: 'Үлдсэн хос, хийсэн алдааны тоо. Хоёр алдаа гаргавал арилсан хос самбар дээр эргэж ирнэ, тиймээс яарах хэрэггүй.'
    },
    'tour.game.powerup': {
        en: 'Four correct pairs in a row bank a powerup here — spend it on a free clear, or swap in new words.',
        mn: 'Дараалан дөрвөн хос зөв холбовол энд бонус хуримтлагдана — нэг хосыг үнэгүй арилгах, эсвэл шинэ үгээр солиход зарцуулж болно.'
    },

    // --- Dokkai Reader --------------------------------------------------------
    'tour.reading.tracks': {
        en: 'Two tracks. Foundation runs N5 to N3, Advanced N3 to N1 — each level is a set of short passages.',
        mn: 'Хоёр зам байна. «Суурь» нь N5-аас N3, «Ахисан» нь N3-аас N1 хүртэл — шат бүр богино текстүүдээс бүрдэнэ.'
    },
    'tour.reading.mic': {
        en: 'This tool listens to you read, so it needs microphone permission and works best in Chrome or Edge.',
        mn: 'Энэ хэрэгсэл таны уншихыг сонсдог тул микрофоны зөвшөөрөл шаардана, мөн Chrome эсвэл Edge дээр хамгийн сайн ажиллана.'
    },
    'tour.reading.passage': {
        en: 'Read this out loud. The highlight moves to the next word as it hears you, so you never have to press anything mid-sentence.',
        mn: 'Үүнийг чангаар уншина уу. Таны яриаг сонсох тусам тодотгол дараагийн үг рүү шилжих тул өгүүлбэрийн дундуур юу ч дарах шаардлагагүй.'
    },
    'tour.reading.start': {
        en: 'Start and stop listening here. Your pronunciation does not have to be perfect — anything close is accepted.',
        mn: 'Сонсохыг эндээс эхлүүлж, зогсооно. Дуудлага чинь төгс байх албагүй — ойролцоо байвал хүлээж авна.'
    },
    'tour.reading.skip': {
        en: 'Stuck on a word? Skip it. You hear it read aloud, and it goes into the skipped list so you can come back to it.',
        mn: 'Нэг үг дээр гацвал алгасаарай. Тэр үгийг чангаар уншиж сонсгох бөгөөд дараа нь эргэж үзэхэд бэлэн, алгассан үгсийн жагсаалтад орно.'
    },
    'tour.reading.progress': {
        en: 'How far through the passage you are. Finish one and the next opens by itself.',
        mn: 'Текстийн хэдэн хувийг уншсаныг харуулна. Нэгийг дуусгамагц дараагийнх нь өөрөө нээгдэнэ.'
    },

    // --- Phonetics Family -----------------------------------------------------
    'tour.phonetics.levels': {
        en: 'Pick a JLPT level here. The families below change to the ones that level actually uses.',
        mn: 'JLPT түвшнээ эндээс сонгоно уу. Доорх бүлгүүд тухайн түвшинд хэрэглэгддэг ханзаар солигдоно.'
    },
    'tour.phonetics.families': {
        en: 'Each row is one phonetic component and the kanji built on it. They are ordered by how often the commonest member turns up in real Japanese, so the useful ones are at the top.',
        mn: 'Мөр бүр нь нэг дуудлагын язгуур, түүн дээр бүтсэн ханзууд. Хамгийн түгээмэл гишүүн нь япон бичвэрт хэр олон тааралддагаар эрэмбэлсэн тул хэрэгтэй нь дээрээ байна.'
    },
    'tour.phonetics.info': {
        en: 'Not sure what a phonetic component is? This explains it in a paragraph.',
        mn: 'Дуудлагын язгуур гэж юу болохыг мэдэхгүй байна уу? Энд нэг догол мөрөөр тайлбарласан байгаа.'
    },
    'tour.phonetics.tree': {
        en: 'The component sits in the middle and its family radiates out. Tap any kanji for its readings, meaning and an example sentence.',
        mn: 'Язгуур нь голдоо, бүлгийнх нь ханзууд эргэн тойрон нь байрлана. Аль нэг ханз дээр дарвал уншлага, утга, жишээ өгүүлбэр нь гарна.'
    },
    'tour.phonetics.readings': {
        en: 'Each kanji shows two kinds of reading. The <b>on\'yomi</b> came from Chinese and is what a phonetic family shares; the <b>kun\'yomi</b> is the native Japanese word the character was matched to, and it does not follow the family at all.',
        mn: 'Ханз бүр хоёр төрлийн уншлагатай. <b>Онёми</b> нь хятадаас гаралтай бөгөөд дуудлагын бүлэг яг үүгээрээ нийтлэг; <b>кунёми</b> нь тэр ханзтай тохируулсан уугуул япон үг бөгөөд бүлгийг огт дагадаггүй.'
    },

    // --- Grammar Connect ------------------------------------------------------
    'tour.grammar.tracks': {
        en: 'Two tracks — Foundation is N5 to N3, Advanced is N2 to N1. Twenty levels each.',
        mn: 'Хоёр зам — «Суурь» нь N5-аас N3, «Ахисан» нь N2-оос N1. Тус бүр 20 шаттай.'
    },
    'tour.grammar.levels': {
        en: 'Ten sentences a level. Finish one and the next unlocks.',
        mn: 'Шат бүрт арван өгүүлбэр. Нэгийг дуусгавал дараагийнх нь нээгдэнэ.'
    },
    'tour.grammar.sentence': {
        en: 'One grammar point in the sentence is underlined. That is the part you are replacing.',
        mn: 'Өгүүлбэрийн дүрмийн нэг хэсэг доогуур зураастай байна. Та яг тэр хэсгийг солино.'
    },
    'tour.grammar.tiles': {
        en: 'Pick the tile that takes its place without changing what the sentence means. Only one does.',
        mn: 'Өгүүлбэрийн утгыг өөрчлөхгүйгээр орлож чадах хавтанг сонгоно уу. Ганцхан нь тохирно.'
    },
    'tour.grammar.cleared': {
        en: 'Sentences you have finished collect here with their translation, so the level doubles as a list to read back.',
        mn: 'Дуусгасан өгүүлбэрүүд орчуулгынхаа хамт энд хуримтлагдах тул шат нь дараа нь эргэж уншиж болох жагсаалт болно.'
    },
    'tour.grammar.timer': {
        en: 'Time is short on purpose, but every correct answer adds to it.',
        mn: 'Цаг зориуд багатай, гэхдээ зөв хариулах бүрд нэмэгдэнэ.'
    },

    // --- Dictionary -----------------------------------------------------------
    'tour.dict.search': {
        en: 'Type in Mongolian or Japanese — kanji, kana or romaji all work, and it searches as you type.',
        mn: 'Монголоор ч, японоор ч бичиж болно — ханз, кана, латин үсэг бүгд ажиллана. Бичих явцад шууд хайна.'
    },
    'tour.dict.results': {
        en: 'Every result says which source it came from, and about a third carry an example sentence. Tap a word to open it.',
        mn: 'Илэрц бүр дээр аль эх сурвалжаас авсныг нь тэмдэглэсэн, гуравны нэг орчимд нь жишээ өгүүлбэр байгаа. Үг дээр дарж дэлгэнэ үү.'
    },
    'tour.dict.wakan': {
        en: 'A second dictionary lives on this tab: the formal Sino-Japanese word and the native Japanese word for the same thing, side by side.',
        mn: 'Энэ таб дээр өөр нэг толь бичиг байна: нэг зүйлийг заасан хятад гаралтай албан ёсны үг, уугуул япон үг хоёр зэрэгцэж харагдана.'
    },

    // --- Dashboard ------------------------------------------------------------
    'tour.dash.profile': {
        en: 'Your display name is public — it shows up wherever your progress does. Change it here; it does not have to be your real name.',
        mn: 'Таны харагдах нэр нийтэд ил байдаг — явц чинь харагдах газар бүрт энэ нэр гарна. Эндээс өөрчилж болно; жинхэнэ нэр байх шаардлагагүй.'
    },
    'tour.dash.score': {
        en: 'One score across all the tools, next to the site average. It moves when you clear a level or finish a text.',
        mn: 'Бүх хэрэгслийн нийлбэр оноо, хажууд нь сайтын дундаж. Шат гүйцээх, текст дуусгах бүрд өөрчлөгдөнө.'
    },
    'tour.dash.tools': {
        en: 'And the same progress broken down per tool, so you can see which one you have been neglecting.',
        mn: 'Мөн ижил явцыг хэрэгсэл тус бүрээр задалж харуулна — алийг нь орхигдуулж байгаагаа шууд харна.'
    },
});
