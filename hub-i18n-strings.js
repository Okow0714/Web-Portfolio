// Page-specific translation strings for the entrance-hall hub (index.html). Extends
// window.I18N_STRINGS from i18n-strings-shared.js (loaded first) with hub-only keys.
Object.assign(window.I18N_STRINGS, {
    'hub.eyebrow': { en: 'Curious. Creative. Diligent.', mn: 'Сониуч. Бүтээлч. Шаргуу.' },
    'hub.heroTitle': { en: "Let's Make Friends with Japanese", mn: 'Япон хэлтэй найзалцгаая' },
    'hub.heroBody': {
        en: 'This site is made up of five distinct sections built to learn Japanese from the fundamentals — not the easy way.',
        mn: 'Уг цахим хуудас нь япон хэлийг амархнаас нь биш үндсээс нь эхэлж суралцахад чиглэсэн таван төрлийн өвөрмөц хэсгүүдээс бүрдэнэ.'
    },

    'hub.game.name': { en: 'Word Match', mn: 'Үгийн Холбоос' },
    'hub.game.desc': {
        en: 'An online exercise that connects each kanji to the Mongolian word with the matching meaning. Connect several kanji that share a phonetic reading at once and multiple words clear together. Each level is timed at 3 minutes, and two wrong guesses bring an already-cleared pair back.',
        mn: 'Ханзыг ижил утгатай монгол үгтэй холбох онлайн дасгал. Ижил дуудлагын язгуур бүхий хэд хэдэн ханзыг зэрэг холбосноор олон үгийг нэгэн зэрэг арилгах боломжтой. Үе болгон 3 минутын хугацаатай, хоёр удаа буруу дарвал өмнө нь арилсан хос буцаж гарч ирнэ.'
    },
    'hub.game.stat': { en: '50 LEVELS · 5 JLPT TIERS · ~1,250 WORDS', mn: '50 ШАТ · 5 JLPT ЗЭРЭГЛЭЛ · ОЙРОЛЦООГООР 1,250 ҮГ' },
    'hub.game.cta': { en: 'Play →', mn: 'Тоглох →' },

    'hub.phonetics.name': { en: 'Phonetics Family', mn: 'Ханз Дуудлагын Бүлгүүд' },
    'hub.phonetics.desc': {
        en: "Memorizing kanji readings one by one is a huge undertaking, so this is a rule-based list built around phonetics — the pattern behind kanji readings — to help you understand them instead. Learn one phonetic component and you can start guessing the readings of a dozen other kanji at once.",
        mn: 'Ханзын дуудлагыг үг бүрчлэн цээжлэх нь ихээхэн хүндрэлтэй тул Phonetics буюу Дуудлагын Ханзын дүрмээр дамжуулан ойлгоход чиглэсэн дүрмийн жагсаалт. Нэг дуудлагын ханзыг сурснаар хэд хэдэн өөр өөр ханзны дуудлагыг нэгэн зэрэг таамаглах чадвартай болох боломжтой юм.'
    },
    'hub.phonetics.stat': { en: '775 FAMILIES · 2,429 KANJI · 5 JLPT TIERS', mn: '775 БҮЛЭГ · 2,429 ХАНЗ · 5 JLPT ЗЭРЭГЛЭЛ' },
    'hub.phonetics.cta': { en: 'Browse →', mn: 'Үзэх →' },

    'hub.grammar.name': { en: 'Grammar Connect', mn: 'Дүрэм Орлуулалт' },
    'hub.grammar.desc': {
        en: "An exercise where you pick, from a set of choices, the word that swaps in for the sentence's underlined word without changing its meaning. Time is short, but every correct pick extends it.",
        mn: 'Өгүүлбэр дэх доогуур зураастай үгийг өгөгдсөн үгүүд дундаас сонгон утгыг нь өөрчлөлгүйгээр солих дасгал юм. Өгөгдсөн хугацаа нь богино хэдий ч зөв сонгосон үг болгонд тухайн хугацаа сунгагдана.'
    },
    'hub.grammar.stat': { en: '400 SENTENCES · 2 TRACKS · 40 LEVELS', mn: '400 ӨГҮҮЛБЭР · 2 ЗАМ · 40 ШАТ' },
    'hub.grammar.cta': { en: 'Play →', mn: 'Тоглох →' },

    'hub.reading.name': { en: 'Dokkai Reader', mn: 'Уншлагын дадлага' },
    'hub.reading.desc': {
        en: "Read the passage out loud and it recognizes your voice, automatically highlighting along word by word. It's still in development, so you can skip any word it doesn't recognize.",
        mn: 'Текстийг чангаар уншихад, таны дуу хоолойг таньж, унших мөрийг үг үгээр нь автоматаар тодотгож дагана. Одоогоор хөгжүүлэлтийн шатандаа явж байгаа тул ямар нэгэн үг танигдаагүй тохиолдолд алгасах боломжтой.'
    },
    'hub.reading.stat': { en: '60 TEXTS · 2 TRACKS', mn: '60 ТЕКСТ · 2 ЗАМ' },
    'hub.reading.cta': { en: 'Read →', mn: 'Унших →' },

    'hub.dictionary.name': { en: 'Wa-kan Dictionary', mn: 'Ва-кан толь бичиг' },
    'hub.dictionary.desc': {
        en: "Speaking Japanese, writing letters, and writing reports all require knowing both the formal Sino-Japanese (kango, 漢語) and native-Japanese (wago, 和語) forms, so this is a small dictionary that gives you both forms for whatever kanji you search. It also shows the respectful (尊敬語) and humble (謙譲語) verb forms used in sentences, alongside the plain word.",
        mn: 'Япон хэлээр харилцах, захидал болон тайлан бичвэр бичихэд хүндэтгэлийн буюу канго (漢語), уламжлалт буюу ваго (和語) хэлбэрүүдийг мэдэх зайлсгүй шаардлагатай тул таны хайсан ханзны дараах хоёр хэлбэрийг олж өгөх бяцхан толь бичиг юм. Дээрээс нь өгүүлбэрт хэрэглэгдэх хүндэтгэлийн (尊敬語) болон даруу (謙譲語) хэлбэртэй үйл үгсийг ч мөн хамт харуулна.'
    },
    'hub.dictionary.stat': { en: '560 WORD PAIRS', mn: '560 ҮГИЙН ХОС' },
    'hub.dictionary.cta': { en: 'Search →', mn: 'Хайх →' },

    'hub.foot.developer': { en: 'Developer', mn: 'Хөгжүүлэгч' },
    'hub.foot.devRole': { en: 'System engineering student, living in Japan', mn: 'Систем инженерийн оюутан, Японд амьдардаг' },
    'hub.foot.devLink': { en: 'Portfolio, skills, and projects →', mn: 'Хувийн хуудас, ур чадвар, төслүүд →' },
    'hub.foot.sources': { en: 'Data & Sources', mn: 'Өгөгдлийн эх сурвалж' },
    'hub.foot.vocabCuration': { en: 'vocab curation', mn: 'сургалтад' },
    'hub.foot.contentLicense': { en: 'Content License', mn: 'контентийн зөвшөөрөл' },
});
