// Word Match (game.html)-specific translation strings. Extends window.I18N_STRINGS, which
// i18n-strings-shared.js must have already created (loaded first in game.html).
// Note: generic game-shell keys (game.levels, game.time, game.levelComplete, etc.) that both
// this page AND grammar.html reference live in i18n-strings-shared.js, not here -- a page-scoped
// strings file is only ever loaded on its own page, so a key referenced from grammar.html/js
// must be shared or it silently falls back to the untranslated HTML (found the hard way: grammar
// reused several game.* keys before this split existed, and they rendered as English-only since
// this file was never loaded there).
Object.assign(window.I18N_STRINGS, {
    'game.titleSub': { en: 'Japanese Word Match', mn: 'Япон үг холбох' },
    'game.subtitle': {
        en: 'Connect each Japanese word to its English meaning. Every level has 50 tiles (25 pairs), a 12.5-minute clock (+20s per pair matched), and 10 levels per JLPT tier — N5 is beginner vocabulary, N1 is advanced. Kanji sharing a phonetic component can also be chained together for a lightning-fast multi-clear. Two mistakes bring a cleared pair back as a penalty, so slow down and look before you click.',
        mn: 'Япон үг бүрийг тохирох утгатай нь холбоно уу. Шат болгонд 50 хавтан (25 хос), 12.5 минутын цаг (хос бүр таарах тутам +20 секунд), JLPT түвшин тус бүрт 10 дэд шат байна — N5 нь анхан шатны үг хэллэг, N1 нь гүнзгийрүүлсэн түвшин. Ижил дуудлагын язгуур бүхий ханзыг хооронд нь холбовол богино хугацаанд олон хосыг нэгэн зэрэг арилгаж болно. Хоёр удаа буруу дарвал арилсан хос торгуулийн байдлаар буцаж ирэх тул яарахгүй, сайн ажиглаад дарна уу.'
    },
    'game.guestHint': { en: 'Log in to save your best times and completions across visits.', mn: 'Шилдэг цаг болон дуусгасан шатуудаа хадгалахын тулд нэвтэрнэ үү.' },
    'game.creditsSummary': { en: 'Photo & music credits — background art and soundtrack', mn: 'Гэрэл зураг ба хөгжмийн эх сурвалж — дэвсгэр зураг, хөгжим' },
    'game.score': { en: 'Score', mn: 'Оноо' },
    'game.streak': { en: 'Streak', mn: 'Дараалал' },
    'game.shuffle': { en: 'Shuffle', mn: 'Холих' },
    'game.progress': { en: 'Progress', mn: 'Явц' },
    'game.familiesFound': { en: 'Families Found', mn: 'Олдсон бүлгүүд' },
    'game.familiesEmptyHint': { en: 'Chain 2+ words sharing a phonetic component for a lightning-fast clear.', mn: 'Ижил дуудлагын язгуур бүхий 2+ үгийг холбовол богино хугацаанд олноор нь арилгана.' },
    'game.lastMatch': { en: 'Last Match', mn: 'Сүүлийн тохирол' },
    'game.exampleEmptyHint': { en: 'Connect a pair to see an example sentence here.', mn: 'Жишээ өгүүлбэр харахын тулд нэг хосыг холбоно уу.' },
    'game.exampleNoneHint': { en: 'No example sentence found for this word in the source data.', mn: 'Энэ үгийн жишээ өгүүлбэр эх өгөгдөлд олдсонгүй.' },
    'game.startModalDesc': { en: 'Connect each Japanese word to its English meaning. 25 pairs, 50 tiles. The timer starts when you hit Start.', mn: 'Япон үг бүрийг тохирох утгатай нь холбоно уу. 25 хос, 50 хавтан. Эхлүүлэх товч дарахад цаг эхэлнэ.' },
    'game.moves': { en: 'Moves', mn: 'Хөдөлгөөн' },

    'game.pairsCount': { en: '{n} / {total} pairs', mn: '{n} / {total} хос' },
    'game.movesCount': { en: '{n} moves', mn: '{n} хөдөлгөөн' },
    'game.notPlayedYet': { en: 'Not played yet', mn: 'Тоглоогүй байна' },
    'game.completed': { en: 'Completed', mn: 'Дууссан' },
    'game.bestTimeMoves': { en: 'Best: {time} · {moves} moves', mn: 'Шилдэг: {time} · {moves} хөдөлгөөн' },
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
    'game.foundChipLabel': { en: 'found', mn: 'олдсон' },
    'game.soundOff': { en: 'Turn sound off', mn: 'Дууг унтраах' },
    'game.soundOn': { en: 'Turn sound on', mn: 'Дууг асаах' },
    'game.secAbbr': { en: 's', mn: 'сек' },
});
