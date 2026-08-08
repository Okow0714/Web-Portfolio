// Phonetics Family (phonetics.html)-specific translation strings. Extends window.I18N_STRINGS,
// which i18n-strings-shared.js must have already created (loaded first in phonetics.html).
Object.assign(window.I18N_STRINGS, {
    'phonetics.titleMain': { en: 'Phonetics Family', mn: 'Дуудлагын бүлэг' },
    'phonetics.subtitle': {
        en: "Kanji that share a phonetic component often share an on'yomi reading too — learn one, and you get a running start on the rest of its family. Pick a JLPT level to see its phonetic families, ranked by how often their most common member actually shows up in real Japanese text.",
        mn: 'Ижил дуудлагын язгуур бүхий кандзи ихэвчлэн ижил онёми дуудлагатай байдаг — нэгийг нь сурвал бусад нь суралцахад амархан болно. JLPT түвшин сонгож, тухайн түвшний дуудлагын бүлгүүдийг үзнэ үү, эдгээр нь хамгийн түгээмэл гишүүн нь бодит япон бичвэрт хэр олон удаа гардагаар эрэмбэлэгдсэн.'
    },
    'phonetics.whatIsPhoneticComponent': { en: "What's a phonetic component?", mn: 'Дуудлагын язгуур гэж юу вэ?' },
    'phonetics.families': { en: 'Families', mn: 'Бүлгүүд' },
    'phonetics.modalTitle': { en: "What's a Phonetic Component?", mn: 'Дуудлагын язгуур гэж юу вэ?' },
    'phonetics.stageComponent': { en: 'component', mn: 'язгуур' },
    'phonetics.stagePhonetic': { en: 'phonetic (相 &middot; ソウ)', mn: 'дуудлага (相 &middot; ソウ)' },
    'phonetics.stageKanji': { en: 'kanji (想 &middot; そう &middot; to think/imagine)', mn: 'кандзи (想 &middot; そう &middot; бодох/төсөөлөх)' },
    'phonetics.stageCombination': { en: 'combination (想像 &middot; そうぞう &middot; imagination)', mn: 'нийлбэр үг (想像 &middot; そうぞう &middot; төсөөлөл)' },
    'phonetics.explainerText': {
        en: 'A "phonetic component" is a recurring part inside a kanji that hints at its Chinese-derived on\'yomi reading, rather than its meaning. Kanji sharing the same phonetic component — like 相, 想, and 霜 above — often sound alike even though they mean very different things, because the component was originally chosen for its sound. A separate "meaning radical" (like 心, heart, tucked into 想) is what actually carries the sense.',
        mn: '"Дуудлагын язгуур" гэдэг нь кандзийн доторх давтагддаг хэсэг бөгөөд утгыг нь бус, харин Хятадаас гаралтай онёми дуудлагыг нь ишлэдэг. Ижил дуудлагын язгуур бүхий кандзи — дээрх 相, 想, 霜 шиг — ихэвчлэн утга нь эрс өөр байсан ч дуудлага нь адилхан байдаг, учир нь язгуур нь эхнээсээ дуудлагынхаа төлөө сонгогдсон байдаг. Утгыг нь бодитоор дамжуулдаг зүйл нь тусдаа "утгын радикал" (想-д шингэсэн 心, зүрх, гэх мэт) юм.'
    },
    'phonetics.levelFamiliesTitle': { en: '{level} — Phonetic Families', mn: '{level} — Дуудлагын бүлгүүд' },
    'phonetics.familiesRankedHint': {
        en: '{n} families, ranked by how often their most-used {level} member appears in real Japanese text.',
        mn: '{n} бүлэг, {level} түвшний хамгийн их хэрэглэгддэг гишүүн нь бодит япон бичвэрт хэр олон удаа гардагаар эрэмбэлэгдсэн.'
    },
    'phonetics.noPhoneticKanjiHint': { en: 'No phonetic-bearing kanji are tagged at this level in the source data.', mn: 'Энэ түвшинд дуудлагын язгуур бүхий кандзи эх өгөгдөлд тэмдэглэгдээгүй байна.' },
    'phonetics.kanjiInFamily': { en: '{n} kanji in this family', mn: 'энэ бүлэгт {n} кандзи' },
    'phonetics.noExampleForKanji': { en: 'No example sentence found for this kanji in the source data.', mn: 'Энэ кандзийн жишээ өгүүлбэр эх өгөгдөлд олдсонгүй.' },
    'phonetics.familyForLevelHint': { en: 'Phonetic family for {level} · {n} kanji share this component dictionary-wide. Tap a kanji to see its details.', mn: '{level} түвшний дуудлагын бүлэг · толь бичигт нийт {n} кандзи энэ язгуурыг хуваалцдаг. Дэлгэрэнгүйг үзэхийн тулд кандзи дээр дарна уу.' },
    'phonetics.shared': { en: 'shared', mn: 'нийтлэг' },
});
