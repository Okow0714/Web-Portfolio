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
    'game.titleSub': { en: 'Japanese word memory', mn: 'Япон үг цээжлэх дасгал' },
    'game.subtitle': {
        en: 'Look at twelve cards, then find the six pairs from memory once they turn over. There is no clock in the main round — your score is the number of clicks you spend, and fewer is better. A level is four hands of six pairs, twenty-four words in all, and clearing each hand opens a four-second bonus round where you match what you just learned across two columns. Twelve levels to a JLPT tier — N5 is beginner vocabulary, N1 is advanced.',
        mn: 'Арван хоёр хөзрийг хараад цээжил. Эргэсний дараа зургаан хосыг санаж олно. Цаг хэмжихгүй — оноог чинь дарсан тоо хэмжинэ, цөөн дарсан нь илүү. Шат бүр дөрвөн гараас бүрдэх ба нийт хорин дөрвөн үг. Гар бүрийн төгсгөлд дөрвөн секундын урамшуулал нээгдэж, сая цээжилсэн үгсээ хоёр баганаас холбоно. JLPT түвшин бүрт арван хоёр шат — N5 нь анхан шат, N1 нь хамгийн гүнзгий.'
    },
    'game.guestHint': { en: 'Log in to save your best results across visits.', mn: 'Шилдэг дүнгээ хадгалахын тулд нэвтэрнэ үү.' },
    'game.score': { en: 'Score', mn: 'Оноо' },
    'game.streak': { en: 'Streak', mn: 'Дараалал' },
    'game.shuffle': { en: 'Shuffle', mn: 'Холих' },
    'game.familiesFound': { en: 'Families Found', mn: 'Олдсон бүлгүүд' },
    'game.familiesEmptyHint': { en: 'Chain 2+ words sharing a phonetic component for a lightning-fast clear.', mn: 'Ижил дуудлагын язгууртай 2 буюу түүнээс дээш үг холбовол олон үг нэг дор арилна.' },
    'game.lastMatch': { en: 'Last pair', mn: 'Сүүлийн хос' },
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
    'theme.n3.12': { en: 'How much, how often, how sure', mn: 'Хэр их, хэр олон, хэр итгэлтэй' },
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
    'game.volMute': { en: 'Sound off', mn: 'Дуу унтраалттай' },
    'game.volLow': { en: 'Volume: low', mn: 'Дуу: намхан' },
    'game.volMedium': { en: 'Volume: medium', mn: 'Дуу: дунд' },
    'game.volFull': { en: 'Volume: full', mn: 'Дуу: чанга' },
    'game.soundOff': { en: 'Turn sound off', mn: 'Дууг унтраах' },
    'game.soundOn': { en: 'Turn sound on', mn: 'Дууг асаах' },
    'game.secAbbr': { en: 's', mn: 'сек' },
    // ---- the memory board (2026-10-21 rebuild) ----
    // The keys above this block that describe the old honeycomb -- the streak meter, the
    // powerups, the lightning chain, the Wakan flyer, the 4-minute clock -- are left in place
    // rather than deleted, the same way nav.allLevels was: an unused string costs a line, and
    // a missing one that something still reaches for renders as raw Mongolian in English mode.
    'game.gateTitle': { en: 'Choose your level', mn: 'Түвшингээ сонго' },
    'game.gateHint': {
        en: 'Each hexagon is one JLPT tier. Open one and its twelve levels burst out of it.',
        mn: 'Зургаан өнцөгт бүр нэг JLPT түвшин. Дарвал тухайн түвшний арван хоёр шат задарна.'
    },
    'game.allTiers': { en: 'All tiers', mn: 'Бүх түвшин' },
    'game.tier.N5': { en: 'Beginner', mn: 'Анхан шат' },
    'game.tier.N4': { en: 'Elementary', mn: 'Бага дунд' },
    'game.tier.N3': { en: 'Intermediate', mn: 'Дунд шат' },
    'game.tier.N2': { en: 'Upper', mn: 'Ахисан шат' },
    'game.tier.N1': { en: 'Advanced', mn: 'Гүнзгий' },

    'game.clicks': { en: 'Clicks', mn: 'Даралт' },
    'game.clicksShort': { en: 'clicks', mn: 'даралт' },
    'game.pairs': { en: 'Pairs', mn: 'Хос' },
    'game.misses': { en: 'Misses', mn: 'Алдаа' },
    'game.bonus': { en: 'Bonus', mn: 'Урамшуулал' },
    'game.hint': { en: 'Hint', mn: 'Сануулга' },
    'game.hintCost': { en: 'Turns two cards over · +3 clicks', mn: 'Хоёр хөзөр эргүүлнэ · +3 даралт' },
    'game.previewHint': {
        en: 'Read the twelve cards. When you start, they turn over.',
        mn: 'Арван хоёр хөзрийг уншаарай. Эхлэхэд тэд эргэнэ.'
    },
    'game.startHand': { en: 'Start', mn: 'Эхлэх' },
    'game.bonusRound': { en: 'Bonus', mn: 'Урамшуулал' },
    'game.bonusNote': {
        en: 'Four seconds. Match across the two columns. All of it is extra.',
        mn: 'Дөрвөн секунд. Хоёр баганыг холбоно. Бүгд нэмэлт оноо.'
    },

    'game.ruleScore': {
        en: 'Your score is <b>clicks</b>. Fewer is better.',
        mn: 'Оноог чинь <b>дарсан тоо</b> хэмжинэ. Цөөн дарсан нь дээр.'
    },
    'game.ruleNoClock': {
        en: 'No clock in the main round — <b>take as long as you like</b>.',
        mn: 'Үндсэн тоглолтод <b>цаг хэмжихгүй</b> — яаралгүй бодоорой.'
    },
    'game.ruleHands': {
        en: 'A level is <b>four hands</b> of six pairs each.',
        mn: 'Шат бүр <b>дөрвөн гар</b>, гар бүр зургаан хос.'
    },
    'game.ruleBonus': {
        en: 'Clearing a hand opens a <b>four-second bonus</b> — missing it still finishes the level.',
        mn: 'Гар цэвэрлэхэд <b>дөрвөн секундын урамшуулал</b> нээгдэнэ — алдвал ч шат дуусна.'
    },

    'game.mem.readThem': { en: '{n} cards, six pairs. Read them while you can.', mn: '{n} хөзөр, зургаан хос. Боломж байхад нь уншаарай.' },
    'game.mem.turned': { en: 'Turned over. Find the six pairs.', mn: 'Эргэлээ. Зургаан хосыг ол.' },
    'game.mem.findPartner': { en: 'Now find its partner.', mn: 'Одоо хосыг нь ол.' },
    'game.mem.pairOf': { en: 'Pair {n} of {total}.', mn: '{total}-аас {n} дэх хос.' },
    'game.mem.notAPair': { en: 'Not a pair. {n} so far.', mn: 'Хос биш. Одоогоор {n} алдаа.' },
    'game.mem.handCleared': { en: 'Hand cleared. {n} more pairs, face up, four seconds.', mn: 'Гар цэвэрлэгдлээ. Дахиад {n} хос, нүүрээрээ, дөрвөн секунд.' },
    'game.mem.bonusGo': { en: 'Words on the left, meanings on the right. Clicks here are free.', mn: 'Зүүн талд үг, баруун талд утга. Энд дарсан нь оноонд ороогүй.' },
    'game.mem.bonusPair': { en: 'Bonus pair {n}.', mn: '{n} дэх урамшууллын хос.' },
    'game.mem.handN': { en: 'Hand {n} of {total}', mn: '{total}-аас {n} дэх гар' },
    'game.mem.hintSpent': { en: 'Two cards, for {n} clicks.', mn: 'Хоёр хөзөр, {n} даралтаар.' },
    'game.mem.meaning': { en: 'Meaning', mn: 'Утга' },
    'game.mem.faceDown': { en: 'Face-down card', mn: 'Хаалттай хөзөр' },

    'game.grade.perfect': { en: 'Flawless', mn: 'Алдаагүй' },
    'game.grade.sharp': { en: 'Sharp', mn: 'Хурц' },
    'game.grade.steady': { en: 'Steady', mn: 'Тогтвортой' },
    'game.grade.through': { en: 'Through', mn: 'Давлаа' },
    'game.previousBestClicks': {
        en: 'Previous best: {moves} clicks · {time}',
        mn: 'Өмнөх шилдэг: {moves} даралт · {time}'
    },
    'game.perfectIs': { en: 'A perfect level is {n} clicks.', mn: 'Төгс шат бол {n} даралт.' },
});
