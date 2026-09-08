// Word Match (game.html)-specific translation strings. Extends window.I18N_STRINGS, which
// i18n-strings-shared.js must have already created (loaded first in game.html).
// Note: generic game-shell keys (game.levels, game.time, game.levelComplete, etc.) that both
// this page AND grammar.html reference live in i18n-strings-shared.js, not here -- a page-scoped
// strings file is only ever loaded on its own page, so a key referenced from grammar.html/js
// must be shared or it silently falls back to the untranslated HTML (found the hard way: grammar
// reused several game.* keys before this split existed, and they rendered as English-only since
// this file was never loaded there).
Object.assign(window.I18N_STRINGS, {
    'game.reviewTitle': { en: 'Review · words you missed', mn: 'Давтлага · алдсан үгс' },
    'game.chainCombo': { en: 'CHAIN ×{n}', mn: 'ГИНЖ ×{n}' },
    'game.titleSub': { en: 'Japanese Word Match', mn: 'Япон үг холбох тоглоом' },
    'game.subtitle': {
        en: 'Connect each Japanese word to its English meaning. Every level puts 20 pairs in play on a flat 4-minute clock (+20s per pair matched), and there are 12 levels per JLPT tier — N5 is beginner vocabulary, N1 is advanced. Kanji sharing a phonetic component can be chained together for a lightning-fast multi-clear, and 4 correct pairs in a row banks a powerup you can spend on a free clear or swapping in new words. Two mistakes bring a cleared pair back as a penalty, so slow down and look before you click.',
        mn: 'Япон үг бүрийг утга нь тохирох үгтэй холбоно уу. Шат бүрт 20 хос, 4 минутын цаг байна (хос таарах бүрд +20 секунд). JLPT түвшин бүрт 12 шат — N5 нь анхан шат, N1 нь хамгийн гүнзгий. Ижил дуудлагын язгууртай ханзуудыг хооронд нь холбовол хэд хэдэн хос нэг дор арилна. Алдаагүй дараалан 4 хос холбовол бонус авах бөгөөд үүгээр нэг хос хасах, эсвэл шинэ үгээр солиж болно. Хоёр удаа буруу дарвал арилсан хос торгууль болж эргэж ирнэ — тиймээс яаралгүй, сайн хараад дараарай.'
    },
    'game.guestHint': { en: 'Log in to save your best times and completions across visits.', mn: 'Шилдэг цаг болон дуусгасан шатуудаа хадгалахын тулд нэвтэрнэ үү.' },
    'game.score': { en: 'Score', mn: 'Оноо' },
    'game.streak': { en: 'Streak', mn: 'Дараалал' },
    'game.shuffle': { en: 'Shuffle', mn: 'Холих' },
    'game.familiesFound': { en: 'Families Found', mn: 'Олдсон бүлгүүд' },
    'game.familiesEmptyHint': { en: 'Chain 2+ words sharing a phonetic component for a lightning-fast clear.', mn: 'Ижил дуудлагын язгууртай 2 буюу түүнээс дээш үг холбовол олон үг нэг дор арилна.' },
    'game.lastMatch': { en: 'Last Match', mn: 'Сүүлийн тохирол' },
    'game.exampleEmptyHint': { en: 'Connect a pair to see an example sentence here.', mn: 'Жишээ өгүүлбэр харахын тулд нэг хосыг холбоно уу.' },
    'game.exampleNoneHint': { en: 'No example sentence found for this word in the source data.', mn: 'Энэ үгийн жишээ өгүүлбэр эх өгөгдөлд олдсонгүй.' },
    'game.startModalDesc': { en: 'Connect each Japanese word to its English meaning. 20 pairs, 4 minutes. The timer starts when you hit Start.', mn: 'Япон үг бүрийг тохирох утгатай нь холбоно уу. 20 хос, 4 минут. Эхлүүлэх товч дарахад цаг эхэлнэ.' },
    'game.moves': { en: 'Moves', mn: 'Хөдөлгөөн' },

    'game.pairsCount': { en: '{n} / {total} pairs', mn: '{n} / {total} хос' },
    'game.movesCount': { en: '{n} moves', mn: '{n} хөдөлгөөн' },
    // Level themes. Each level holds one topic instead of an arbitrary slice of the tier, and the
    // theme name replaces "Level N" on the card. Keys are referenced by `themeKey` in
    // game-words.js; a level without one falls back to the plain numbered title.
    'theme.n5.1': { en: 'Days and dates', mn: 'Өдөр, сар, жил' },
    'theme.n5.2': { en: 'People and family', mn: 'Хүмүүс ба гэр бүл' },
    'theme.n5.3': { en: 'Eating and drinking', mn: 'Идэх, уух' },
    'theme.n5.4': { en: 'Looking after yourself', mn: 'Биеэ арчлах' },
    'theme.n5.5': { en: 'At home', mn: 'Гэртээ' },
    'theme.n5.6': { en: 'School and learning', mn: 'Сургууль ба хичээл' },
    'theme.n5.7': { en: 'Out and about', mn: 'Гадуур явах' },
    'theme.n5.8': { en: 'Outdoors and weather', mn: 'Байгаль ба цаг агаар' },
    'theme.n5.9': { en: 'Colours and describing things', mn: 'Өнгө ба дүрслэх үг' },
    'theme.n5.10': { en: 'Doing things and having fun', mn: 'Хийх, зугаацах' },
    'theme.n5.11': { en: 'This, that, yes and no', mn: 'Энэ, тэр, тийм, үгүй' },
    'theme.n5.12': { en: 'Counting and money', mn: 'Тоолох ба мөнгө' },

    // 'Completed' is now the tick's tooltip on a level card rather than a line of card text.
    // game.notPlayedYet and game.bestTimeMoves went with the old prose meta line: the rail shows
    // an em dash for an unplayed level and labels its own figures.
    'game.completed': { en: 'Completed', mn: 'Дууссан' },
    'game.saveResultFailed': { en: "Couldn't save your result — try again later.", mn: 'Үр дүнг хадгалж чадсангүй — дараа дахин оролдоно уу.' },
    'game.previousBest': { en: 'Previous best: {time} · {moves} moves', mn: 'Өмнөх шилдэг: {time} · {moves} хөдөлгөөн' },
    'game.matchedBeforeTimeOut': { en: 'Matched {n} / {total} pairs before time ran out.', mn: 'Цаг дуусахаас өмнө {n} / {total} хосыг тохируулсан.' },

    // Floating combat-text and other small dynamic strings set via direct DOM assignment
    // rather than data-i18n (so a missing key here fails silently, not loudly -- checked with
    // the key-coverage script same as everywhere else).
    'game.streakFloat': { en: 'STREAK x{n}', mn: 'ДАРААЛАЛ x{n}' },
    'game.lightningFloat': { en: 'LIGHTNING x{n}', mn: 'АЯНГА x{n}' },
    'game.wakanFloat': { en: 'WAKAN LINK x{n}', mn: 'ХОЛБОЛТ x{n}' },
    'game.penaltyFloat': { en: 'PENALTY — pair returned', mn: 'ТОРГУУЛЬ — хос буцаж ирэв' },
    'game.powerupFreeFloat': { en: 'BONUS CLEAR', mn: 'БОНУС ХАСАЛТ' },
    'game.powerupSwapFloat': { en: 'WORDS SWAPPED x3', mn: 'ҮГ СОЛИГДЛОО x3' },
    'game.powerupReadyFloat': { en: 'POWERUP READY!', mn: 'БОНУС БЭЛЭН БОЛЛОО!' },
    'game.powerupClearBtn': { en: 'Clear', mn: 'Хасах' },
    'game.powerupSwapBtn': { en: 'Swap', mn: 'Солих' },
    'game.powerupClearTitle': { en: 'Use powerup: clear one random pair', mn: 'Бонус ашиглах: санамсаргүй нэг хосыг хасна' },
    'game.powerupSwapTitle': { en: 'Use powerup: swap 3 random pairs for new ones', mn: 'Бонус ашиглах: 3 санамсаргүй хосыг шинэ үгээр солино' },
    'game.powerupSwapNoFuelTitle': { en: 'No spare words left to swap in this level', mn: 'Энэ шатанд солих нэмэлт үг үлдээгүй байна' },
    'game.powerupNoChargeTitle': { en: 'Clear 4 pairs in a row (no mistakes) to earn a powerup', mn: 'Алдаагүй дараалан 4 хос холбовол бонус авна' },
    'game.foundChipLabel': { en: 'found', mn: 'олдсон' },
    'game.soundOff': { en: 'Turn sound off', mn: 'Дууг унтраах' },
    'game.soundOn': { en: 'Turn sound on', mn: 'Дууг асаах' },
    'game.secAbbr': { en: 's', mn: 'сек' },
});
