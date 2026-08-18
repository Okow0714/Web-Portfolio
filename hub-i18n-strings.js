// Page-specific translation strings for the entrance-hall hub (index.html). Extends
// window.I18N_STRINGS from i18n-strings-shared.js (loaded first) with hub-only keys.
Object.assign(window.I18N_STRINGS, {
    'hub.eyebrow': { en: 'Free, in Mongolian', mn: 'Үнэгүй, монгол хэл дээрх' },
    'hub.heroTitle': { en: 'Learn Japanese, in Mongolian', mn: 'Монгол хэлээр Япон хэл сурцгаая' },
    'hub.heroBody': {
        en: 'Each of the five tools below has its own little world — a game, a phonetics browser, a grammar drill, a reading coach, a dictionary. See exactly what each one does, in a real screenshot.',
        mn: 'Доорх таван хэрэгсэл бүр өөр өөрийн ертөнцтэй — тоглоом, дуудлага, дүрэм, унших дадлага, толь бичиг. Юу хийдгийг нь бодит дэлгэцийн зургаар шууд харна уу.'
    },

    'hub.game.name': { en: 'Word Match', mn: 'Үг холбох тоглоом' },
    'hub.game.desc': {
        en: 'Connect each Japanese word tile to its matching meaning. Chain several kanji that share a phonetic reading and they clear together in an instant “lightning connect.” Timed, and two wrong guesses bring a cleared pair back.',
        mn: 'Ханз үгийг тохирох утгатай нь холбоно. Ижил дуудлагын язгуур бүхий хэд хэдэн ханзыг зэрэг холбовол «аянга холболт» болж, тэднийг нэгэн зэрэг арилгана. Цаг хугацаатай, хоёр удаа буруу дарвал арилсан хос буцаж ирнэ.'
    },
    'hub.game.stat': { en: '50 LEVELS · 5 JLPT TIERS · ~500 WORDS', mn: '50 ШАТ · 5 JLPT ЗЭРЭГЛЭЛ · ОЙРОЛЦООГООР 500 ҮГ' },
    'hub.game.cta': { en: 'Play →', mn: 'Тоглох →' },

    'hub.phonetics.name': { en: 'Phonetics Family', mn: 'Дуудлагын бүлэг' },
    'hub.phonetics.desc': {
        en: 'Tap a kanji and every other kanji sharing its phonetic component radiates out around it. Learn one component, and you can start guessing the pronunciation of a dozen others.',
        mn: 'Ханз сонгоход, ижил дуудлагын язгууртай бусад ханз түүнийг тойрон цацрагаар гарч ирнэ. Нэг язгуурыг сурснаар хэд хэдэн ханзны дуудлагыг нэгэн зэрэг таамаглах чадвартай болно.'
    },
    'hub.phonetics.stat': { en: '775 FAMILIES · 2,429 KANJI · 5 JLPT TIERS', mn: '775 БҮЛЭГ · 2,429 ХАНЗ · 5 JLPT ЗЭРЭГЛЭЛ' },
    'hub.phonetics.cta': { en: 'Browse →', mn: 'Үзэх →' },

    'hub.grammar.name': { en: 'Grammar Connect', mn: 'Дүрэм холбох' },
    'hub.grammar.desc': {
        en: 'One grammar point in the sentence is underlined. Find the tile that swaps in without changing what the sentence means, and watch it transform in place.',
        mn: 'Өгүүлбэр дэх нэг дүрмийн хэсэг доогуур зураастай байна. Утгыг өөрчлөхгүйгээр орлуулах зөв хавтанг олоход, тухайн хэсэг шинэ дүрмээр шууд солигдоно.'
    },
    'hub.grammar.stat': { en: '400 SENTENCES · 2 TRACKS · 40 LEVELS', mn: '400 ӨГҮҮЛБЭР · 2 ЗАМ · 40 ШАТ' },
    'hub.grammar.cta': { en: 'Play →', mn: 'Тоглох →' },

    'hub.reading.name': { en: 'Dokkai Reader', mn: 'Уншлагын дадлага' },
    'hub.reading.desc': {
        en: 'Read the passage out loud and the highlight follows your voice automatically, word by word. Any word you skip gets tracked so you can review it afterward.',
        mn: 'Текстийг чангаар уншихад, таны дуу хоолойг таньж, унших мөрийг үг үгээр нь автоматаар тодотгож дагана. Алгассан үгсийг бүртгэж, дараа нь дахин үзэх боломжтой.'
    },
    'hub.reading.stat': { en: '60 TEXTS · 2 TRACKS', mn: '60 ТЕКСТ · 2 ЗАМ' },
    'hub.reading.cta': { en: 'Read →', mn: 'Унших →' },

    'hub.dictionary.name': { en: 'Wakan Dictionary', mn: 'Вакан толь бичиг' },
    'hub.dictionary.desc': {
        en: 'Type in kanji, kana, or English and Sino-Japanese (kango) and native-Japanese (wago) word pairs filter live. Verbs with an irregular respectful or humble form show that alongside the plain word.',
        mn: 'Ханз, кана, эсвэл англи үгээр бичихэд, канго (漢語) ба ваго (和語) хос үгс шууд шүүгдэнэ. Хүндэтгэлийн (尊敬語) болон даруу (謙譲語) хэлбэртэй үйл үгсийг ч мөн хамт харуулна.'
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
