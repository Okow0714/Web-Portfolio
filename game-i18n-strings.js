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
    'theme.n4.1': { en: 'Time, sky and seasons', mn: 'Цаг, тэнгэр, улирал' },
    'theme.n4.2': { en: 'People and family', mn: 'Хүмүүс ба гэр бүл' },
    'theme.n4.3': { en: 'Eating and shopping', mn: 'Идэх, худалдан авах' },
    'theme.n4.4': { en: 'How you feel', mn: 'Сэтгэлийн байдал' },
    'theme.n4.5': { en: 'Trouble and accidents', mn: 'Осол ба бэрхшээл' },
    'theme.n4.6': { en: 'At home', mn: 'Гэртээ' },
    'theme.n4.7': { en: 'School and exams', mn: 'Сургууль ба шалгалт' },
    'theme.n4.8': { en: 'Work and plans', mn: 'Ажил ба төлөвлөгөө' },
    'theme.n4.9': { en: 'Getting around', mn: 'Замд гарах' },
    'theme.n4.10': { en: 'Outdoors and free time', mn: 'Гадаа ба чөлөөт цаг' },
    'theme.n4.11': { en: 'Saying it politely', mn: 'Эелдэг ярих' },
    'theme.n4.12': { en: 'Maybe, always, never', mn: 'Магадгүй, үргэлж, үгүй' },
    'theme.n3.1': { en: 'Money and paying', mn: 'Мөнгө ба төлбөр' },
    'theme.n3.2': { en: 'Work and getting things done', mn: 'Ажил ба гүйцэтгэл' },
    'theme.n3.3': { en: 'Time and order', mn: 'Цаг ба дараалал' },
    'theme.n3.4': { en: 'The body and health', mn: 'Бие ба эрүүл мэнд' },
    'theme.n3.5': { en: 'Feelings and trust', mn: 'Сэтгэл ба итгэл' },
    'theme.n3.6': { en: 'Nature and science', mn: 'Байгаль ба шинжлэх ухаан' },
    'theme.n3.7': { en: 'Books, ideas and shows', mn: 'Ном, санаа, тоглолт' },
    'theme.n3.8': { en: 'Rules and society', mn: 'Дүрэм ба нийгэм' },
    'theme.n3.9': { en: 'Food, clothes and things', mn: 'Хоол, хувцас, эд зүйл' },
    'theme.n3.10': { en: 'Trouble and danger', mn: 'Аюул ба бэрхшээл' },
    'theme.n3.11': { en: 'Places and going', mn: 'Газар ба зорчих' },
    'theme.n3.12': { en: 'How much, how sure', mn: 'Хэр их, хэр итгэлтэй' },
    'theme.n2.1': { en: 'Measuring and shapes', mn: 'Хэмжих ба хэлбэр' },
    'theme.n2.2': { en: 'Science and the natural world', mn: 'Шинжлэх ухаан ба байгаль' },
    'theme.n2.3': { en: 'School, books and words', mn: 'Сургууль, ном, үг' },
    'theme.n2.4': { en: 'Shows, sport and games', mn: 'Тоглолт, спорт, тоглоом' },
    'theme.n2.5': { en: 'Business and money', mn: 'Бизнес ба мөнгө' },
    'theme.n2.6': { en: 'Around the house', mn: 'Гэрийн эргэн тойрон' },
    'theme.n2.7': { en: 'The body and the senses', mn: 'Бие ба мэдрэхүй' },
    'theme.n2.8': { en: 'Character and feelings', mn: 'Зан чанар ба сэтгэл' },
    'theme.n2.9': { en: 'Trains and travelling', mn: 'Галт тэрэг ба аялал' },
    'theme.n2.10': { en: 'Time and order', mn: 'Цаг ба дараалал' },
    'theme.n2.11': { en: 'People, family and duty', mn: 'Хүн, гэр бүл, үүрэг' },
    'theme.n2.12': { en: 'Doing, making and breaking', mn: 'Хийх, засах, эвдэх' },
    'theme.n1.1': { en: 'Money and finance', mn: 'Мөнгө ба санхүү' },
    'theme.n1.2': { en: 'Government and power', mn: 'Засаг ба эрх мэдэл' },
    'theme.n1.3': { en: 'The earth and what it yields', mn: 'Дэлхий ба түүний өгөөж' },
    'theme.n1.4': { en: 'Words and saying things', mn: 'Үг ба хэлэх нь' },
    'theme.n1.5': { en: 'Thinking and deciding', mn: 'Бодох ба шийдэх' },
    'theme.n1.6': { en: 'Feelings and character', mn: 'Сэтгэл ба зан чанар' },
    'theme.n1.7': { en: 'Health, birth and harm', mn: 'Эрүүл мэнд, төрөлт, хор хөнөөл' },
    'theme.n1.8': { en: 'Work and industry', mn: 'Ажил ба үйлдвэрлэл' },
    'theme.n1.9': { en: 'Craft, custom and old Japan', mn: 'Урлал, зан заншил, эртний Япон' },
    'theme.n1.10': { en: 'Sameness, difference and degree', mn: 'Ижил, ялгаа, хэмжээ' },
    'theme.n1.11': { en: 'Doing, going and changing', mn: 'Хийх, явах, өөрчлөгдөх' },
    'theme.n1.12': { en: 'Loanwords and modern life', mn: 'Зээл үг ба орчин үе' },

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
