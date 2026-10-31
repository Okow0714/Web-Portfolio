// Grammar Connect (grammar.html)-specific translation strings. Extends window.I18N_STRINGS,
// which i18n-strings-shared.js must have already created (loaded first in grammar.html).
Object.assign(window.I18N_STRINGS, {
    'grammar.cleared': { en: 'Cleared', mn: 'Дуусгасан' },
    'grammar.mistakes': { en: 'Mistakes', mn: 'Алдаа' },
    'grammar.startModalDesc': { en: "Ten sentences, four grammar tiles each. Tap the tile that keeps the sentence's meaning unchanged. The timer starts when you hit Start.", mn: 'Арван өгүүлбэр, тус бүрт дөрвөн дүрмийн хавтан. Өгүүлбэрийн утгыг өөрчлөхгүй хавтанг дарна уу. Эхлүүлэх товч дарахад цаг эхэлнэ.' },
    'grammar.tileHint': { en: 'Tap the tile that replaces the underlined part without changing the meaning', mn: 'Утгыг өөрчлөхгүйгээр доогуур зураастай хэсгийг орлуулах хавтанг дарна уу' },
    'grammar.volMute': { en: 'Sound off', mn: 'Дуу унтраалттай' },
    'grammar.volLow': { en: 'Volume: low', mn: 'Дуу: намхан' },
    'grammar.volMedium': { en: 'Volume: medium', mn: 'Дуу: дунд' },
    'grammar.volFull': { en: 'Volume: full', mn: 'Дуу: чанга' },
    'grammar.previousBestMistakes': { en: 'Previous best: {time} · {mistakes} mistakes', mn: 'Өмнөх шилдэг: {time} · {mistakes} алдаа' },
    'grammar.clearedBeforeTimeOut': { en: 'Cleared {n} / {total} sentences before time ran out.', mn: 'Цаг дуусахаас өмнө {n} / {total} өгүүлбэрийг дуусгасан.' },
    'grammar.levelsCount': { en: '{n} levels', mn: '{n} шат' },
    'grammar.reviewTitle': { en: 'Review · your weak points', mn: 'Давталт · сул талууд' },
    'grammar.clearedEmptyHint': { en: 'Solved sentences (with their translation) will appear here as you go.', mn: 'Шийдсэн өгүүлбэрүүд орчуулгынхаа хамт ажиллах тусам энд нэмэгдэнэ.' },

    // The four bands of the level select. `note` says what a band is MOSTLY -- measured by
    // classifying every grammar point in grammar-data.js, not by what the track is called. No
    // band is purely one JLPT level, so none of these claims one. The hedge used to be the word
    // "mostly" / "ихэвчлэн" and is now the tilde: shorter, and the same in both languages. It
    // cannot be dropped altogether -- the bands are halves of a track, not JLPT tiers.
    'grammar.band1': { en: 'Opening', mn: 'Эхлэл' },
    'grammar.band1n': { en: '~N4', mn: '~N4' },
    'grammar.band2': { en: 'Footing', mn: 'Суурь' },
    'grammar.band2n': { en: '~N4–N3', mn: '~N4–N3' },
    'grammar.band3': { en: 'Middle', mn: 'Дунд' },
    'grammar.band3n': { en: '~N2', mn: '~N2' },
    'grammar.band4': { en: 'Deep', mn: 'Гүнзгий' },
    'grammar.band4n': { en: '~N1', mn: '~N1' },
    'grammar.markFlawless': { en: 'No mistakes', mn: 'Алдаагүй' },
    'grammar.clearedFlawless': { en: 'Cleared with no mistakes', mn: 'Алдаагүй дуусгасан' },
    'grammar.bandLevel': { en: '{band} · Level {n}', mn: '{band} · {n}-р шат' },
    // Split in two on 2026-11-01: the first half is the page's h1 now that the 文法つなぎ
    // wordmark and its description are gone, and the second is the line under it.
    'grammar.pickBandTitle': { en: 'Pick where to start', mn: 'Хаанаас эхлэхээ сонгоно уу' },
    'grammar.pickBand': { en: 'Four sets of ten levels.', mn: 'Арван шаттай дөрвөн багц.' },
    'grammar.recDone': { en: 'Cleared. Replaying only updates your best.', mn: 'Дуусгасан. Дахин тоглоход шилдэг дүн л шинэчлэгдэнэ.' },
    'grammar.recNew': { en: 'Not played yet. Ten sentences, four tiles each.', mn: 'Хараахан тоглоогүй. Арван өгүүлбэр, тус бүрт дөрвөн хавтан.' },
});
