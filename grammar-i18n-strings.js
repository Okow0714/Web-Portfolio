// Grammar Connect (grammar.html)-specific translation strings. Extends window.I18N_STRINGS,
// which i18n-strings-shared.js must have already created (loaded first in grammar.html).
Object.assign(window.I18N_STRINGS, {
    'grammar.titleSub': { en: 'Grammar Connect', mn: 'Дүрэм холбох' },
    'grammar.subtitle': {
        en: "A sentence appears with one grammar point underlined. Tap the tile that replaces it without changing what the sentence means — the word transforms in place, and the finished sentence (with its translation) drops into the cleared list at the side. Ten sentences a level, five options a sentence, ten levels a set, four sets.",
        mn: 'Өгүүлбэр гарч ирэхэд дүрмийн нэг хэсэг нь доогуур зураастай байна. Утгыг нь өөрчлөхгүйгээр орлуулах хавтанг дарна уу — үг шууд солигдож, гүйцээсэн өгүүлбэр орчуулгынхаа хамт хажуугийн жагсаалтад нэмэгдэнэ. Шат бүрт арван өгүүлбэр, өгүүлбэр бүрт дөрвөн сонголт, багц бүрт арван шат, нийт дөрвөн багц.'
    },
    'grammar.cleared': { en: 'Cleared', mn: 'Дуусгасан' },
    'grammar.mistakes': { en: 'Mistakes', mn: 'Алдаа' },
    'grammar.startModalDesc': { en: "Ten sentences, four grammar tiles each. Tap the tile that keeps the sentence's meaning unchanged. The timer starts when you hit Start.", mn: 'Арван өгүүлбэр, тус бүрт дөрвөн дүрмийн хавтан. Өгүүлбэрийн утгыг өөрчлөхгүй хавтанг дарна уу. Эхлүүлэх товч дарахад цаг эхэлнэ.' },
    'grammar.tileHint': { en: 'Tap the tile that replaces the underlined part without changing the meaning', mn: 'Утгыг өөрчлөхгүйгээр доогуур зураастай хэсгийг орлуулах хавтанг дарна уу' },
    'grammar.volMute': { en: 'Sound off', mn: 'Дуу унтраалттай' },
    'grammar.volLow': { en: 'Volume: low', mn: 'Дуу: намхан' },
    'grammar.volMedium': { en: 'Volume: medium', mn: 'Дуу: дунд' },
    'grammar.volFull': { en: 'Volume: full', mn: 'Дуу: чанга' },
    'grammar.soundOff': { en: 'Turn sound off', mn: 'Дууг унтраах' },
    'grammar.soundOn': { en: 'Turn sound on', mn: 'Дууг асаах' },
    'grammar.previousBestMistakes': { en: 'Previous best: {time} · {mistakes} mistakes', mn: 'Өмнөх шилдэг: {time} · {mistakes} алдаа' },
    'grammar.clearedBeforeTimeOut': { en: 'Cleared {n} / {total} sentences before time ran out.', mn: 'Цаг дуусахаас өмнө {n} / {total} өгүүлбэрийг дуусгасан.' },
    'grammar.foundation': { en: 'Foundation', mn: 'Суурь' },
    'grammar.advanced': { en: 'Advanced', mn: 'Ахисан' },
    'grammar.levelsCount': { en: '{n} levels', mn: '{n} шат' },
    'grammar.reviewTitle': { en: 'Review · your weak points', mn: 'Давталт · сул талууд' },
    'grammar.trackLevel': { en: '{track} · Level {n}', mn: '{track} · {n}-р шат' },
    'grammar.clearedEmptyHint': { en: 'Solved sentences (with their translation) will appear here as you go.', mn: 'Шийдсэн өгүүлбэрүүд орчуулгынхаа хамт ажиллах тусам энд нэмэгдэнэ.' },
    'grammar.comingSoon': { en: 'Coming soon', mn: 'Удахгүй' },

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
    'grammar.clearedFlawless': { en: 'Cleared with no mistakes', mn: 'Алдаагүй дуусгасан' },
    'grammar.bandLevel': { en: '{band} · Level {n}', mn: '{band} · {n}-р шат' },
    'grammar.pickBand': { en: 'Pick where to start — four sets of ten levels.', mn: 'Хаанаас эхлэхээ сонгоно уу — арван шаттай дөрвөн багц.' },
    'grammar.recDone': { en: 'Cleared. Replaying only updates your best.', mn: 'Дуусгасан. Дахин тоглоход шилдэг дүн л шинэчлэгдэнэ.' },
    'grammar.recNew': { en: 'Not played yet. Ten sentences, four tiles each.', mn: 'Хараахан тоглоогүй. Арван өгүүлбэр, тус бүрт дөрвөн хавтан.' },
});
