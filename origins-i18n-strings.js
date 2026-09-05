// Kana Origins (origins.html)-specific translation strings. Extends window.I18N_STRINGS, which
// i18n-strings-shared.js must have already created (loaded first in origins.html).
//
// The Mongolian here is written to read as Mongolian rather than as translated English -- the
// owner's standing correction on this site. Where a Japanese or linguistic term has no settled
// Mongolian form, the plain description is used instead of a coined one.
Object.assign(window.I18N_STRINGS, {

    'origins.eyebrow': { en: 'Start here · for absolute beginners', mn: 'Эндээс эхэл · шинэ суралцагчдад' },
    'origins.title': { en: 'Where kana came from', mn: 'Кана бичиг хаанаас гарсан бэ' },
    'origins.standfirst': {
        en: "Japanese uses three scripts at once, and every beginner is told to just accept that. You don't have to. Each one arrived for a reason, at a datable moment, and once you know the reasons the rules stop needing to be memorised — <em>including why English words are written in katakana</em>.",
        mn: 'Япон хэл гурван төрлийн бичгийг зэрэг хэрэглэдэг бөгөөд эхлэгч бүрд «ийм л юм» гэж хэлдэг. Тэгэх шаардлагагүй. Бичиг бүр тодорхой шалтгаанаар, тодорхой цагт бий болсон. Шалтгааныг нь мэдвэл дүрмийг цээжлэх хэрэггүй болно — <em>яагаад англи үгсийг катаканагаар бичдэг вэ гэдэг ч бас</em>.'
    },

    'origins.chronology.h': { en: '1 · The chronology', mn: '1 · Он цагийн дараалал' },
    'origins.chronology.sub': {
        en: 'Nine moments, each adding exactly one piece of the modern writing system. Click a title to open it.',
        mn: 'Есөн үе. Тус бүр нь өнөөгийн бичгийн системд яг нэг хэсгийг нэмсэн. Гарчиг дээр дарж дэлгэрэнгүйг үзнэ үү.'
    },

    // --- eras -----------------------------------------------------------------
    'origins.era1.when': { en: 'before 400', mn: '400-аас өмнө' },
    'origins.era1.sub': { en: 'Yayoi–Kofun', mn: 'Яёи–Кофун' },
    'origins.era1.title': { en: 'Japanese had no writing at all', mn: 'Япон хэлэнд огт бичиг байгаагүй' },
    'origins.era1.p1': {
        en: 'Spoken Japanese existed for centuries with nothing to write it in. This matters more than it sounds: the script was never designed for the language. Everything that follows is an adaptation of somebody else\'s system.',
        mn: 'Ярианы япон хэл олон зууны турш бичиггүй оршиж байсан. Энэ нь сонсогдохоос илүү чухал: бичиг нь энэ хэлэнд зориулж зохиогдоогүй юм. Цаашид болох бүх зүйл бол бусдын системийг өөрчилж тохируулсан түүх.'
    },
    'origins.era1.cap': {
        en: 'Haniwa figure, Kofun period. Grave goods like these are most of what survives from a Japan that kept no written records. <em>Wikimedia Commons, CC0.</em>',
        mn: 'Ханива дүрс, Кофун үе. Бичгийн баримт үлдээгээгүй тэр үеийн Японоос ийм булшны эдлэл л голдуу үлдсэн. <em>Wikimedia Commons, CC0.</em>'
    },

    'origins.era2.when': { en: 'c. 400s', mn: '400-аад он' },
    'origins.era2.sub': { en: 'via Baekje', mn: 'Пэкжэгээр дамжин' },
    'origins.era2.title': { en: 'Chinese characters arrive', mn: 'Хятад ханз ирлээ' },
    'origins.era2.p1': {
        en: 'Kanji came with Buddhism and Chinese statecraft, carried through the Korean kingdom of Baekje. Educated Japanese learned to read and write <em>Chinese</em> — not Japanese written down, but a foreign language on the page.',
        mn: 'Ханз нь буддын шашин, хятад төрийн ёсны хамт Солонгосын Пэкжэ улсаар дамжин ирсэн. Боловсролтой япончууд <em>хятад хэл</em> уншиж бичиж сурсан — япон хэлээ бичсэн биш, харин цаасан дээрх өөр хэл байв.'
    },
    'origins.era2.pull': {
        en: 'The inscription on this sword spells a Japanese name, 獲加多支鹵 — <b>ва-ка-та-кэ-ру</b> — using Chinese characters purely for their sound. The trick that becomes man\'yōgana is already here, in 471.',
        mn: 'Энэ сэлмэн дээрх бичээс нь япон нэрийг 獲加多支鹵 — <b>ва-ка-та-кэ-ру</b> — гэж, ханзыг зөвхөн дуудлагаар нь ашиглаж бичсэн байна. Манъёгана болох арга 471 онд аль хэдийн энд байна.'
    },
    'origins.era2.cap': {
        en: 'Inariyama sword, inscribed 471 CE — among the oldest writing found in Japan. <em>Wikimedia Commons, CC0.</em>',
        mn: 'Инариямагийн сэлэм, 471 онд сийлсэн — Японоос олдсон хамгийн эртний бичээсийн нэг. <em>Wikimedia Commons, CC0.</em>'
    },

    'origins.era3.when': { en: 'c. 600s', mn: '600-аад он' },
    'origins.era3.sub': { en: 'the mismatch', mn: 'тохирохгүй нь' },
    'origins.era3.title': { en: "The system doesn't fit the language", mn: 'Систем нь хэлэндээ тохирохгүй байв' },
    'origins.era3.p1': {
        en: 'Chinese barely inflects: characters sit in order and the order carries the grammar. Japanese glues endings onto stems — 書く, 書いた, 書かない, 書かせられる. Chinese characters have no way to write が, を, ました.',
        mn: 'Хятад хэл бараг хувирдаггүй: ханзууд дараалан зогсох бөгөөд дараалал нь дүрмийг илэрхийлнэ. Япон хэл бол үндэс дээрээ нөхцөл залгадаг — 書く, 書いた, 書かない, 書かせられる. Ханзаар が, を, ました гэдгийг бичих ямар ч арга байхгүй.'
    },
    'origins.era3.p2': {
        en: 'Japanese readers coped by inventing <em>kaeriten</em> — little marks telling you to jump backwards and read the characters out of order, in Japanese sequence. An entire notation, just to make somebody else\'s writing system survivable.',
        mn: 'Япон уншигчид <em>каэритэн</em> буюу «буцах тэмдэг» зохиосон — ханзыг бичсэн дарааллаар нь биш, япон дарааллаар нь ухарч уншихыг заасан жижиг тэмдэглэгээ. Бусдын бичгийн системийг тэсвэрлэхийн тулд бүтэн нэг тэмдэглэгээний арга бий болгосон хэрэг.'
    },
    'origins.era3.pull': {
        en: 'Mongolian has exactly this shape too — endings stacked on a stem, particles doing the grammatical work. The problem Japanese hit in the 600s is one Mongolian would have hit with the same borrowed system.',
        mn: 'Монгол хэл ч яг ийм бүтэцтэй — үндэс дээрээ нөхцөл дараалан залгаж, дүрмийн үүргийг нөхцөл, сул үг гүйцэтгэнэ. 600-аад онд япончуудын тулгарсан асуудал монгол хэлэнд ч ижилхэн тулгарах байсан.'
    },
    'origins.era3.cap': {
        en: 'A line from the Han Feizi, written in Chinese order. The numbers are the order a Japanese reader has to take the characters in — <strong>1 2 8 6 3 5 4 7</strong>. Redrawn after the diagram on Wikimedia Commons, public domain.',
        mn: '«Хан Фэйзи»-гээс авсан өгүүлбэр, хятад дарааллаар бичсэн. Тоонууд нь япон уншигч ханзыг ямар дарааллаар унших ёстойг заана — <strong>1 2 8 6 3 5 4 7</strong>. Wikimedia Commons дээрх зургийг үндэслэн дахин зурав, нийтийн эзэмшил.'
    },

    'origins.era4.when': { en: 'c. 700s', mn: '700-аад он' },
    'origins.era4.sub': { en: 'Kojiki · Man\'yōshū', mn: 'Кожики · Манъёшю' },
    'origins.era4.title': { en: "Man'yōgana: kanji used only for sound", mn: 'Манъёгана: ханзыг зөвхөн дуудлагаар нь' },
    'origins.era4.p1': {
        en: 'Scribes started ignoring what a character <em>meant</em> and using it purely for its sound — 阿 for <b>а</b>, 伊 for <b>и</b>. It worked, but it was heavy: every syllable needed a full character, and different writers picked different ones.',
        mn: 'Бичээчид ханзны <em>утгыг</em> нь орхиж, зөвхөн дуудлагаар нь хэрэглэж эхэлсэн — 阿 нь <b>а</b>, 伊 нь <b>и</b>. Ажилласан ч хүнд байв: үе бүрд бүтэн ханз хэрэгтэй, бичээч бүр өөр ханз сонгодог байлаа.'
    },
    'origins.era4.cap': {
        en: 'The Kojiki, 712 — Japan\'s oldest surviving book, and a text you cannot read as Chinese: much of it is characters standing in for Japanese sounds. <em>Wikimedia Commons, public domain.</em>',
        mn: '«Кожики», 712 он — Японы хамгийн эртний хадгалагдан үлдсэн ном. Үүнийг хятадаар уншиж болохгүй: ихэнх нь япон дуудлагыг орлож буй ханзууд юм. <em>Wikimedia Commons, нийтийн эзэмшил.</em>'
    },

    'origins.era5.when': { en: 'c. 800s', mn: '800-аад он' },
    'origins.era5.sub': { en: 'Heian court', mn: 'Хэйаны ордон' },
    'origins.era5.title': { en: 'Hiragana: the cursive hand', mn: 'Хирагана: гүйлгэн бичсэн гар' },
    'origins.era5.p1': {
        en: 'Write 安 fast enough, in flowing brush cursive, and it collapses into あ. That is literally what hiragana is — man\'yōgana worn smooth by handwriting. It became the script of court literature and of women\'s writing; <em>The Tale of Genji</em> is written in it.',
        mn: '安 гэдгийг бийрээр хурдан, гүйлгэж бичвэл あ болж хураагдана. Хирагана яг ийм л юм — гараар бичсээр гөлгөр болсон манъёгана. Энэ нь ордны уран зохиол, эмэгтэйчүүдийн бичгийн үсэг болсон; <em>«Гэнжийн үлгэр»</em> үүгээр бичигдсэн.'
    },
    'origins.era5.pull': {
        en: '安 → あ · 以 → い · 宇 → う · 加 → か · 奈 → な — the curve of each kana is the ghost of the character it came from.',
        mn: '安 → あ · 以 → い · 宇 → う · 加 → か · 奈 → な — кана бүрийн муруй нь гарал үүслийн ханзныхаа сүүдэр юм.'
    },
    'origins.era5.cap': {
        en: 'Genji monogatari emaki. The novel that made the case that serious literature could be written in kana. <em>Wikimedia Commons, public domain.</em>',
        mn: '«Гэнжи моногатари эмаки». Кана бичгээр ч жинхэнэ утга зохиол бүтээж болохыг харуулсан роман. <em>Wikimedia Commons, нийтийн эзэмшил.</em>'
    },

    'origins.era6.when': { en: 'c. 800s', mn: '800-аад он' },
    'origins.era6.sub': { en: 'temple margins', mn: 'сүмийн тэмдэглэл' },
    'origins.era6.title': { en: "Katakana: the monks' shorthand", mn: 'Катакана: лам нарын товчлол' },
    'origins.era6.p1': {
        en: 'At the same time and for the opposite purpose. Buddhist monks reading Chinese scripture needed to scribble pronunciation and grammar cues in the margins. No room for full characters, so they used a <em>fragment</em> of one: the left side of 加 became カ, the top of 宇 became ウ.',
        mn: 'Яг тэр үед, гэхдээ эсрэг зорилгоор. Хятад судар уншиж байсан буддын лам нар дуудлага, дүрмийн тэмдэглэлийг захад нь шивнэх хэрэгтэй болсон. Бүтэн ханз багтахгүй тул зөвхөн <em>хэсгийг</em> нь авсан: 加-гийн зүүн тал カ, 宇-гийн дээд хэсэг ウ болсон.'
    },
    'origins.era6.pull': {
        en: 'Hiragana is a whole character softened. Katakana is a piece of one, snapped off. That is why hiragana curves and katakana is all straight lines — the difference is a thousand years old and entirely practical.',
        mn: 'Хирагана бол бүтэн ханзыг зөөлрүүлсэн нь. Катакана бол ханзнаас хугалж авсан хэсэг. Тиймээс хирагана муруй, катакана шулуун шугамтай — энэ ялгаа мянган жилийн настай бөгөөд бүхэлдээ практик шалтгаантай.'
    },
    'origins.era6.cap': {
        en: 'Lotus Sutra manuscript. Scripture like this, in dense Chinese, is what katakana was invented to annotate. <em>Wikimedia Commons, CC0.</em>',
        mn: '«Лотус судар»-ын гар бичмэл. Ийм нягт хятад бичвэрт тэмдэглэл хийхийн тулд катакана зохиогдсон юм. <em>Wikimedia Commons, CC0.</em>'
    },

    'origins.era7.when': { en: '800s–1868', mn: '800-аад–1868' },
    'origins.era7.sub': { en: 'a thousand years', mn: 'мянган жил' },
    'origins.era7.title': { en: 'The two scripts keep their jobs', mn: 'Хоёр бичиг үүргээ хадгалсаар' },
    'origins.era7.p1': {
        en: 'Katakana stayed the annotating, official, technical script — glosses, legal documents, later telegrams. Hiragana stayed the literary and everyday one. Neither was for foreign words yet, because there were barely any.',
        mn: 'Катакана нь тэмдэглэл, албан ёсны, техникийн бичиг хэвээр үлдсэн — тайлбар, хуулийн бичиг, сүүлдээ цахилгаан мэдээ. Хирагана нь утга зохиол, өдөр тутмынх байв. Аль нь ч гадаад үгэнд зориулагдаагүй, учир нь гадаад үг бараг байгаагүй.'
    },
    'origins.era7.p2': {
        en: 'A thousand years is a long time for a habit to set. By the time Japan needed a script for foreign words, katakana had been the "not ordinary text" script for forty generations.',
        mn: 'Мянган жил бол зуршил тогтоход хангалттай урт хугацаа. Япон улсад гадаад үгэнд зориулсан бичиг хэрэгтэй болоход катакана нь дөчин үеийн турш «энгийн бичвэр биш» гэсэн үүрэгтэй байсан.'
    },

    'origins.era8.when': { en: '1868–1945', mn: '1868–1945' },
    'origins.era8.sub': { en: 'Meiji onward', mn: 'Мэйжигээс хойш' },
    'origins.era8.title': { en: 'Foreign words arrive in bulk', mn: 'Гадаад үгс бөөнөөрөө ирлээ' },
    'origins.era8.p1': {
        en: 'Japan opens to the West and needs thousands of new words at once. They land in katakana — not by decree, but because katakana was already the script that meant <em>this is annotation, this is not ordinary Japanese</em>. The habit forms here.',
        mn: 'Япон улс өрнөд рүү нээгдэж, нэг дор мянга мянган шинэ үг хэрэгтэй болсон. Тэдгээр нь катаканад буусан — тушаалаар биш, харин катакана нь аль хэдийн <em>«энэ бол тэмдэглэл, энгийн япон үг биш»</em> гэсэн утгатай байсан учраас. Зуршил эндээс тогтсон.'
    },
    'origins.era8.cap': {
        en: 'Yokohama-e, later 19th century. Prints of the treaty ports sold the West to a curious public — and brought its vocabulary with it. <em>Wikimedia Commons, CC0.</em>',
        mn: 'Ёокохама-э, 19-р зууны сүүл. Гэрээт боомтуудын сийлбэр зураг өрнөдийг сониуч олонд танилцуулж, үгсийг нь ч бас авчирсан. <em>Wikimedia Commons, CC0.</em>'
    },

    'origins.era9.when': { en: '1946', mn: '1946' },
    'origins.era9.sub': { en: 'post-war reform', mn: 'дайны дараах шинэчлэл' },
    'origins.era9.title': { en: 'The rules are written down', mn: 'Дүрмүүд бичигдэв' },
    'origins.era9.p1': {
        en: 'In the year after the war, Japan reformed its writing: the 1,850 tōyō kanji capped how many characters schooling required, and <em>gendai kanazukai</em> respelled kana to match how people actually spoke rather than how the Heian court had. The division of labour became official — kanji for meaning, hiragana for grammar, katakana for the foreign.',
        mn: 'Дайны дараа жил Япон бичгээ шинэчилсэн: 1,850 «тоё ханз» нь сургуульд шаардагдах ханзны тоог хязгаарлаж, <em>«гэндай канадзукай»</em> нь Хэйаны ордных биш, бодит ярианы дуудлагад тааруулж кана бичлэгийг өөрчилсөн. Үүрэг хуваарилалт албан ёсны болов — ханз утгад, хирагана дүрэмд, катакана гадаадад.'
    },
    'origins.era9.p2': {
        en: 'Then occupation and post-war trade poured English in, and the katakana convention that had been a habit became the flood you see today: コンピューター, テレビ, アルバイト.',
        mn: 'Дараа нь эзлэлт, дайны дараах худалдаа англи хэлийг урсган оруулж, зуршил байсан катакана хэрэглээ өнөөгийн үерт хувирсан: コンピューター, テレビ, アルバイト.'
    },
    'origins.era9.cap': {
        en: 'Ginza in the post-war decades. Shopfronts are where the new katakana vocabulary became visible to everyone. <em>Wikimedia Commons, public domain.</em>',
        mn: 'Дайны дараах жилүүдийн Гинза. Дэлгүүрийн хаяг дээр л шинэ катакана үгс олон нийтэд харагдаж эхэлсэн. <em>Wikimedia Commons, нийтийн эзэмшил.</em>'
    },

    // --- kana section ---------------------------------------------------------
    'origins.kana.h': { en: '2 · Every kana, in Mongolian', mn: '2 · Кана бүр, монголоор' },
    'origins.kana.sub': {
        en: 'Tap any tile to see its romaji and the character it was cut down from. Hiragana and katakana share a sound, so they share a tile — but they were carved out of different kanji, which is why they look nothing alike.',
        mn: 'Аль ч нүд дээр дарвал латин бичлэг, мөн гарал үүслийн ханз нь харагдана. Хирагана, катакана хоёр нэг дуудлагатай тул нэг нүдэнд багтсан — гэхдээ өөр өөр ханзнаас гаралтай учир огт төстэй биш харагддаг.'
    },
    'origins.legend.hiragana': { en: 'hiragana', mn: 'хирагана' },
    'origins.legend.katakana': { en: 'katakana', mn: 'катакана' },
    'origins.legend.mongolian': { en: 'Mongolian', mn: 'монгол' },

    'origins.notes.h': { en: 'The eight that need a note', mn: 'Тайлбар шаардах найм' },
    'origins.notes.sub': {
        en: 'Most of the table is a clean swap. These are where the Mongolian letter is close but not exact — and three are places you have an advantage over English speakers.',
        mn: 'Хүснэгтийн ихэнх нь шууд солигдоно. Эдгээр нь монгол үсэг ойролцоо ч яг тохирохгүй тохиолдлууд — гурав нь та англи хэлтнээс давуу байх газрууд.'
    },
    'origins.note.tsu': {
        en: 'English has no ts- at the start of a word, so learners from English struggle badly here. You already have ц. This one is free.',
        mn: 'Англи хэлэнд үгийн эхэнд ts- гэж байдаггүй тул англи хэлтнүүд эндээс их гацдаг. Танд ц аль хэдийн бий. Энэ үнэгүй ирнэ.'
    },
    'origins.note.chi': {
        en: 'Your ч is very close. Japanese is slightly softer, but nobody will mishear you.',
        mn: 'Таны ч маш ойрхон. Япон нь арай зөөлөн ч хэн ч буруу сонсохгүй.'
    },
    'origins.note.n': {
        en: 'A syllable on its own, held a full beat — にほん is ни-хо-н, three beats. Mongolian\'s final н behaves much the same.',
        mn: 'Бие даасан үе бөгөөд бүтэн цохилт эзэлнэ — にほん бол ни-хо-н, гурван цохилт. Монгол үгийн адагийн н ч ижилхэн авирладаг.'
    },
    'origins.note.shi': {
        en: 'Softer than Mongolian ш, closer to щ. The tongue sits flatter and further forward.',
        mn: 'Монгол ш-ээс зөөлөн, щ-д ойр. Хэл нь илүү хавтгай, урагшаа байрлана.'
    },
    'origins.note.fu': {
        en: 'Not really ф. Both lips come close and blow, teeth never touching the lip — between ф and х.',
        mn: 'Яг ф биш. Хоёр уруул ойртож үлээнэ, шүд уруулд огт хүрэхгүй — ф, х хоёрын хооронд.'
    },
    'origins.note.ra': {
        en: 'Not the rolled Mongolian р. The tongue taps once — closer to a quick л than to a trill.',
        mn: 'Монгол хэлний чичиргээт р биш. Хэл нэг л удаа хөнгөн цохино — чичиргээнээс илүү хурдан л-д ойр.'
    },
    'origins.note.u': {
        en: 'Lips stay flat, not pushed forward. Between у and ү, without the rounding.',
        mn: 'Уруул хавтгай хэвээр, урагш цүлхийхгүй. У, ү хоёрын хооронд, дугуйруулахгүйгээр.'
    },
    'origins.note.wo': {
        en: 'Written differently, pronounced exactly like お. It only ever appears as a grammatical particle.',
        mn: 'Өөрөөр бичигддэг ч яг お гэж дуудна. Зөвхөн дүрмийн нөхцөл болж л тааралдана.'
    },

    // --- why katakana ---------------------------------------------------------
    'origins.why.h': { en: '3 · So why are English words in katakana?', mn: '3 · Тэгвэл яагаад англи үгс катаканагаар бичигддэг вэ?' },
    'origins.why.sub': {
        en: 'The usual answer is "that\'s the rule". The real answer is four steps, and once you\'ve seen them the rule is obvious.',
        mn: 'Ихэвчлэн «дүрэм нь тийм» гэж хариулдаг. Жинхэнэ хариулт нь дөрвөн алхам бөгөөд үүнийг харсны дараа дүрэм нь өөрөө ойлгомжтой болно.'
    },
    'origins.why1.h': { en: 'Katakana was born as annotation', mn: 'Катакана тэмдэглэл болж төрсөн' },
    'origins.why1.p': {
        en: 'Monks writing beside somebody else\'s text. From its first day it meant <em>this is a note about the real writing, not the real writing</em>.',
        mn: 'Лам нар бусдын бичвэрийн хажууд бичиж байсан. Анхны өдрөөсөө <em>«энэ бол жинхэнэ бичвэрийн тухай тэмдэглэл, жинхэнэ бичвэр биш»</em> гэсэн утгатай байв.'
    },
    'origins.why2.h': { en: 'That meaning stuck for a thousand years', mn: 'Тэр утга мянган жил хадгалагдсан' },
    'origins.why2.p': {
        en: 'Glosses, official forms, telegrams, technical terms. Always the marked script — the one flagging something as set apart from ordinary running text.',
        mn: 'Тайлбар, албан маягт, цахилгаан мэдээ, техникийн нэр томьёо. Үргэлж тэмдэглэгдсэн бичиг — энгийн бичвэрээс тусад нь ялгаж заадаг нь.'
    },
    'origins.why3.h': { en: 'Then foreign words arrived in bulk', mn: 'Дараа нь гадаад үгс бөөнөөрөө ирсэн' },
    'origins.why3.p': {
        en: 'Meiji Japan needed words for everything Western, and the post-war years brought English by the shipload. These words were, by definition, not ordinary Japanese.',
        mn: 'Мэйжигийн Японд өрнөдийн бүхий л зүйлд үг хэрэгтэй болсон, дайны дараах жилүүд англи үгсийг усан онгоцоор зөөж авчирсан. Эдгээр үг нь тодорхойлолтоороо энгийн япон үг байгаагүй.'
    },
    'origins.why4.h': { en: 'They went into the script that already meant "not ordinary"', mn: 'Тэд «энгийн биш» гэсэн утгатай байсан бичигт орсон' },
    'origins.why4.p': {
        en: 'No committee decided this. The words needed somewhere to go, and katakana was already doing that job.',
        mn: 'Үүнийг ямар ч хороо шийдээгүй. Үгсэд байх газар хэрэгтэй байсан бөгөөд катакана тэр ажлыг аль хэдийн хийж байсан.'
    },
    'origins.why.verdict': {
        en: '<strong>So katakana doesn\'t mean "English".</strong> It means "this word is set apart" — which is also why it takes animal and plant names in biology, onomatopoeia like ドキドキ, company names, and emphasis, the way italics work in Mongolian or English. Foreign words are the biggest group in that category, not the definition of it.',
        mn: '<strong>Тэгэхээр катакана нь «англи» гэсэн утгатай биш.</strong> «Энэ үг тусдаа» гэсэн утгатай — тиймээс биологийн амьтан, ургамлын нэр, ドキドキ мэтийн дуу дүрслэх үг, компанийн нэр, мөн онцлох үед ч хэрэглэгддэг. Гадаад үгс бол энэ ангиллын хамгийн том хэсэг нь болохоос тодорхойлолт нь биш.'
    },

    // --- next steps -----------------------------------------------------------
    'origins.next.h': { en: 'Where to go next', mn: 'Дараа нь хаашаа' },
    'origins.next.sub': {
        en: 'You now know what the three scripts are for. These are the tools that build on it.',
        mn: 'Одоо та гурван бичиг юунд зориулагдсаныг мэдлээ. Эдгээр хэрэгсэл түүн дээр тулгуурлана.'
    },
    'origins.next.game': {
        en: 'Connect Japanese words to their Mongolian meanings. Start at N5.',
        mn: 'Япон үгсийг монгол утгатай нь холбоно. N5-аас эхэл.'
    },
    'origins.next.phonetics': {
        en: 'Kanji that share a component usually share a reading. Learn them in groups.',
        mn: 'Ижил язгууртай ханзууд ихэвчлэн ижил уншлагатай байдаг. Бүлгээр нь сур.'
    },
    'origins.next.reading': {
        en: 'Read passages aloud and watch the highlight follow your voice.',
        mn: 'Текстийг чангаар уншихад тодотгол дуу хоолойг чинь дагана.'
    },
});
