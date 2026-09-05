// Credits & Sources (credits.html)-specific translation strings. Extends window.I18N_STRINGS,
// which i18n-strings-shared.js must have already created (loaded first in credits.html).
Object.assign(window.I18N_STRINGS, {
    'credits.title': { en: 'Credits & Sources', mn: 'Эх сурвалж ба зохиогчийн эрх' },
    'credits.licensing.h': { en: 'Licensing', mn: 'Лицензүүд' },
    'credits.licensing.p': {
        en: "This site's code is MIT licensed. Three of its data files — <code>game-words.js</code>, <code>phonetics-data.js</code> and <code>phonetics-kanji-index.js</code> — carry kanji phonetic-component data derived from Kanjium and are therefore offered under <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" target=\"_blank\" rel=\"noopener\">CC BY-SA 4.0</a>, the same licence Kanjium uses. The full terms, including the third-party notices, are in the <a href=\"https://github.com/Okow0714/Web-Portfolio/blob/main/LICENSE\" target=\"_blank\" rel=\"noopener\">LICENSE file</a>.",
        mn: "Энэ сайтын код MIT лицензтэй. Гурван өгөгдлийн файл — <code>game-words.js</code>, <code>phonetics-data.js</code>, <code>phonetics-kanji-index.js</code> — Kanjium-аас гаралтай ханзны дуудлагын язгуурын мэдээлэл агуулдаг тул Kanjium-тай ижил <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" target=\"_blank\" rel=\"noopener\">CC BY-SA 4.0</a> лицензээр тархаана. Бүрэн нөхцөл, гуравдагч талын мэдэгдлүүдийг <a href=\"https://github.com/Okow0714/Web-Portfolio/blob/main/LICENSE\" target=\"_blank\" rel=\"noopener\">LICENSE файлаас</a> үзнэ үү.",
    },
    'credits.intro': {
        en: "Every dataset, photo, and music track used across this site's tools, credited in one place — the short version lives in every page's footer, this is the full version.",
        mn: 'Энэ сайтын хэрэгслүүдэд ашигласан өгөгдөл, гэрэл зураг, хөгжмийн эх сурвалж бүрийг нэг дор жагсаав — товч хувилбар нь хуудас бүрийн хөл хэсэгт байдаг, энэ бол бүрэн хувилбар юм.',
    },

    'credits.dataSources.h': { en: 'Dictionary & language data', mn: 'Толь бичиг ба хэлний өгөгдөл' },
    'credits.kanjiumMeta': { en: 'kanji & phonetic-family data', mn: 'ханз ба дуудлагын бүлгийн өгөгдөл' },
    'credits.tatoebaMeta': { en: 'example sentences', mn: 'жишээ өгүүлбэрүүд' },
    'credits.kanjiFreqMeta': { en: 'usage ranking', mn: 'хэрэглээний зэрэглэл' },

    'credits.origins.h': { en: 'Kana Origins — historical photography', mn: 'Канагийн үүсэл — түүхэн гэрэл зураг' },
    'credits.origins.note': {
        en: 'All sourced from Wikimedia Commons, resized and re-compressed for use here; no other changes made. The read-order diagram in the same section is drawn in HTML rather than reproduced from any source.',
        mn: 'Бүгд Wikimedia Commons-оос авсан бөгөөд энд ашиглахын тулд хэмжээг өөрчилж, дахин шахсанаас өөр өөрчлөлт ороогүй. Уг хэсэгт байгаа уншлагын дарааллын зургийг эх сурвалжаас хуулаагүй, HTML-ээр шинээр зуржээ.'
    },

    'credits.wgPhotos.h': { en: 'Word Game — background photography', mn: 'Үг холбох тоглоом — дэвсгэр гэрэл зураг' },
    'credits.wgPhotos.note': {
        en: 'All sourced from Wikimedia Commons, resized and re-compressed for use here; no other changes made. Each level uses one of the ten photos above, cycling every 10 levels, shown faded behind the board.',
        mn: 'Бүгд Wikimedia Commons-оос авсан бөгөөд энд ашиглахын тулд хэмжээг өөрчилж, дахин шахсанаас өөр өөрчлөлт ороогүй. Шат бүр дээрх арван зургийн нэгийг ашигладаг бөгөөд 10 шат тутамд солигдож, самбарын ард бүдэгхэн харагдана.',
    },
    'credits.wgMusic.h': { en: 'Word Game — background music', mn: 'Үг холбох тоглоом — дэвсгэр хөгжим' },
    'credits.wgMusic.note': {
        en: 'All 31 tracks via Pixabay Music, used under the Pixabay Content License (free for commercial use, no attribution required — credited here anyway). Re-encoded to 112kbps for file size; no other changes made. Soul jazz plays on N1, jazz-study on N2, smooth jazz on N3, and lofi jazz on N4 & N5 (shared pool), cycling by level within each tier; the 30 tier tracks are by Alex-Beats (Alex Morgan), except Jazzy Pop Piano / Japan City by WELC0MEИ0, which plays on the level-select screen while browsing between levels.',
        mn: 'Бүх 31 хөгжмийн бичлэг Pixabay Music-аас, Pixabay-ийн контентийн зөвшөөрлийн дагуу (арилжааны зориулалтаар үнэгүй ашиглаж болно, эх сурвалж заавал дурдах шаардлагагүй ч энд заасан болно). Файлын хэмжээг багасгахын тулд 112kbps болгож дахин кодлосноос өөр өөрчлөлт ороогүй. N1 дээр soul jazz, N2 дээр jazz-study, N3 дээр smooth jazz, N4 ба N5 дээр (нэг сан хуваалцдаг) lofi jazz ээлжлэн тоглоно; дээрх 30 бичлэгийг Alex-Beats (Alex Morgan) хийсэн бол Jazzy Pop Piano / Japan City-г WELC0MEИ0 хийсэн бөгөөд энэ нь шат сонгох дэлгэц дээр тоглоно.',
    },

    'credits.gcPhotos.h': { en: 'Grammar Connect — background photography', mn: 'Дүрэм холбох — дэвсгэр гэрэл зураг' },
    'credits.gcPhotos.note': {
        en: 'Sourced from Wikimedia Commons, resized and re-compressed for use here; no other changes made.',
        mn: 'Wikimedia Commons-оос авсан бөгөөд энд ашиглахын тулд хэмжээг өөрчилж, дахин шахсанаас өөр өөрчлөлт ороогүй.',
    },
    'credits.gcMusic.h': { en: 'Grammar Connect — background music', mn: 'Дүрэм холбох — дэвсгэр хөгжим' },
    'credits.gcMusic.note': {
        en: 'All 16 tracks via Pixabay Music, used under the Pixabay Content License (free for commercial use, no attribution required — credited here anyway). Three tracks cycle per JLPT tier (N5 through N1); Zen Garden Beats by eggshy plays on the level-select screen while browsing between levels.',
        mn: 'Бүх 16 хөгжмийн бичлэг Pixabay Music-аас, Pixabay-ийн контентийн зөвшөөрлийн дагуу (арилжааны зориулалтаар үнэгүй ашиглаж болно, эх сурвалж заавал дурдах шаардлагагүй ч энд заасан болно). JLPT түвшин (N5-аас N1 хүртэл) тутамд гурван бичлэг ээлжлэн тоглоно; eggshy хийсэн Zen Garden Beats нь шат сонгох дэлгэц дээр тоглоно.',
    },
});
