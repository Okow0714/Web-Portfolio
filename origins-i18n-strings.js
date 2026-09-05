// Kana Origins (origins.html)-specific translation strings. Extends window.I18N_STRINGS, which
// i18n-strings-shared.js must have already created (loaded first in origins.html).
//
// The Mongolian here is written to read as Mongolian rather than as translated English -- the
// owner's standing correction on this site. In practice that means: finish the clause with the
// verb instead of trailing an English-style aside, drop the `нь` that is only there because the
// English had a "the", and reach for a real Mongolian idiom (аргагүй эрхэнд, нүдэнд тусах, тоо
// томшгүй) where a literal rendering would sound translated. Single Cyrillic letters are set in
// guillemets: a bare `ч` collides with the concessive particle and reads as "even/too".
// Where a Japanese or linguistic term has no settled Mongolian form, the plain description is
// used instead of a coined one.
Object.assign(window.I18N_STRINGS, {

    'origins.eyebrow': { en: 'Start here · for absolute beginners', mn: 'Эндээс эхэлнэ үү · шинэ суралцагчдад' },
    'origins.title': { en: 'Where kana came from', mn: 'Кана бичиг хаанаас үүссэн бэ' },
    'origins.standfirst': {
        en: "Japanese uses three scripts at once, and every beginner is told to just accept that. You don't have to. Each one arrived for a reason, at a datable moment, and once you know the reasons the rules stop needing to be memorised — <em>including why English words are written in katakana</em>.",
        mn: 'Япон хэл гурван өөр бичгийг зэрэг хэрэглэдэг ба шинэ суралцагч бүрд «ийм л юм, дассан нь дээр» гэж хэлдэг. Гэтэл дасах шаардлагагүй. Бичиг бүр тодорхой шалтгаанаар, тодорхой цагт бий болсон. Тэр шалтгааныг нь мэдвэл дүрмийг нь цээжлэх хэрэггүй болно — <em>англи үгсийг яагаад катаканагаар бичдэг нь ч бас ойлгомжтой болно</em>.'
    },

    // --- the three scripts, up front ------------------------------------------
    'origins.scripts.h': { en: '1 · The three scripts', mn: '1 · Гурван бичиг' },
    'origins.scripts.sub': {
        en: 'Before any history: what the three actually are, and what each one does inside a sentence. This is the whole system in about a minute.',
        mn: 'Түүх рүү орохын өмнө: энэ гурав яг юу вэ, өгүүлбэр дотор ямар үүрэг гүйцэтгэдэг вэ. Бүх систем нь ойролцоогоор нэг минутад багтана.'
    },
    'origins.scripts.jobLabel': { en: 'Carries:', mn: 'Үүрэг:' },

    'origins.scripts.kanji.name': { en: 'kanji', mn: 'ханз' },
    'origins.scripts.kanji.what': {
        en: 'Characters borrowed from Chinese. Each one carries a meaning of its own, and most carry more than one reading.',
        mn: 'Хятадаас зээлж авсан тэмдэгтүүд. Тус бүр нь өөрийн гэсэн утгатай бөгөөд ихэнх нь нэгээс олон уншлагатай.'
    },
    'origins.scripts.kanji.job': {
        en: 'the meaning — nouns, and the stem of verbs and adjectives.',
        mn: 'утгыг — нэр үг, мөн үйл ба тэмдэг нэрийн үндэс.'
    },
    'origins.scripts.kanji.count': { en: '2,136 in daily use', mn: 'Өдөр тутам 2,136' },

    'origins.scripts.hira.name': { en: 'hiragana', mn: 'хирагана' },
    'origins.scripts.hira.what': {
        en: 'Forty-six curved signs, one per sound. They mean nothing on their own — a kana is pure pronunciation.',
        mn: 'Дуудлага тус бүрд нэг, нийт дөчин зургаан муруй тэмдэг. Өөрсдөө ямар ч утгагүй — кана бол цэвэр дуудлага.'
    },
    'origins.scripts.hira.job': {
        en: 'the grammar — particles, endings, and any Japanese word not written in kanji.',
        mn: 'дүрмийг — нөхцөл, сул үг, мөн ханзаар бичдэггүй бүх япон үг.'
    },
    'origins.scripts.hira.count': { en: '46 signs', mn: '46 тэмдэг' },

    'origins.scripts.kata.name': { en: 'katakana', mn: 'катакана' },
    'origins.scripts.kata.what': {
        en: 'The same forty-six sounds again, drawn in straight lines. A second set of signs for sounds hiragana already covers.',
        mn: 'Яг тэр дөчин зургаан дуудлага, гэхдээ шулуун шугамаар. Хирагана аль хэдийн бичдэг дуудлагуудад зориулсан хоёр дахь багц тэмдэг.'
    },
    'origins.scripts.kata.job': {
        en: 'anything set apart — foreign words, names, sound effects, emphasis.',
        mn: 'тусад нь ялгах бүхнийг — гадаад үг, нэр, дуу дуурайх үг, онцлол.'
    },
    'origins.scripts.kata.count': { en: '46 signs', mn: '46 тэмдэг' },

    'origins.demo.reading': {
        en: 'Watashi wa Mongoru de nihongo o benkyō shimasu.',
        mn: 'Ваташи ва Монгору дэ нихонго о бэнкёо шимасу.'
    },
    'origins.demo.gloss': { en: '“I study Japanese in Mongolia.”', mn: '«Би Монголд япон хэл сурдаг.»' },
    'origins.demo.read': {
        en: 'The <b class="ss-kanji">kanji</b> carry the meanings — <em>I</em>, <em>Japanese</em>, <em>study</em>. The <b class="ss-hira">hiragana</b> between them say who is doing what to what. The one <b class="ss-kata">katakana</b> word is the one that came from outside. Every Japanese sentence you will ever read is this same division of labour.',
        mn: '<b class="ss-kanji">Ханз</b> нь утгыг үүрнэ — <em>би</em>, <em>япон хэл</em>, <em>сурах</em>. Хооронд нь орсон <b class="ss-hira">хирагана</b> хэн юуг яаж хийж байгааг заана. Ганц <b class="ss-kata">катакана</b> үг нь гаднаас орж ирсэн үг. Таны цаашид унших бүх япон өгүүлбэр яг ийм үүрэг хуваарилалттай байна.'
    },

    'origins.chronology.h': { en: '2 · The chronology', mn: '2 · Он цагийн дараалал' },
    'origins.chronology.sub': {
        en: 'Nine moments, each adding exactly one piece of the modern writing system. Click a title to open it.',
        mn: 'Есөн үе шат. Тус бүр нь өнөөгийн бичигт яг нэг зүйл нэмж өгсөн. Гарчиг дээр дарж дэлгэрэнгүйг үзнэ үү.'
    },

    // --- eras -----------------------------------------------------------------
    'origins.era1.when': { en: 'before 400', mn: '400-аас өмнө' },
    'origins.era1.sub': { en: 'Yayoi–Kofun', mn: 'Яёи–Кофун' },
    'origins.era1.title': { en: 'Japanese had no writing at all', mn: 'Япон хэлэнд огт бичиг байгаагүй' },
    'origins.era1.p1': {
        en: 'Spoken Japanese existed for centuries with nothing to write it in. This matters more than it sounds: the script was never designed for the language. Everything that follows is an adaptation of somebody else\'s system.',
        mn: 'Япон хэл олон зууны турш зөвхөн амаар яригдаж, бичиг үсэггүй байсан. Энэ нь өнгөц сонсогдож болох ч үнэндээ чухал: япон бичиг гэдэг анхнаасаа энэ хэлэнд зориулж зохиосон зүйл биш. Цаашдын бүх түүх бол өөр хэлний бичгийг япон хэлэндээ тааруулж өөрчилсөн түүх.'
    },
    'origins.era1.cap': {
        en: 'Haniwa figure, Kofun period. Grave goods like these are most of what survives from a Japan that kept no written records. <em>Wikimedia Commons, CC0.</em>',
        mn: 'Ханива хэмээх шавар дүрс, Кофун үе. Бичгийн баримт үлдээгээгүй тэр цагийн Японоос ийм булшны эдлэл л голдуу үлдсэн байдаг. <em>Wikimedia Commons, CC0.</em>'
    },

    'origins.era2.when': { en: 'c. 400s', mn: '400-аад он' },
    'origins.era2.sub': { en: 'via Baekje', mn: 'Пэкжэгээр дамжин' },
    'origins.era2.title': { en: 'Chinese characters arrive', mn: 'Хятад ханз нэвтэрлээ' },
    'origins.era2.p1': {
        en: 'Kanji came with Buddhism and Chinese statecraft, carried through the Korean kingdom of Baekje. Educated Japanese learned to read and write <em>Chinese</em> — not Japanese written down, but a foreign language on the page.',
        mn: 'Ханз буддын шашин, хятад төрийн ёсны хамт Солонгосын Пэкжэ улсаар дамжиж ирсэн. Боловсролтой япончууд <em>хятад хэл</em> уншиж бичиж сурсан юм — өөрсдийн хэлээ бичиж байсан хэрэг биш, цаасан дээр огт өөр хэл байлаа.'
    },
    'origins.era2.pull': {
        en: 'The inscription on this sword spells a Japanese name, 獲加多支鹵 — <b>ва-ка-та-кэ-ру</b> — using Chinese characters purely for their sound. The trick that becomes man\'yōgana is already here, in 471.',
        mn: 'Энэ сэлэм дээрх бичээст 獲加多支鹵 — <b>ва-ка-та-кэ-ру</b> хэмээх япон нэрийг ханзны дуудлагыг нь л ашиглан сийлжээ. Хожим манъёгана болох арга 471 онд аль хэдийн энд байна.'
    },
    'origins.era2.cap': {
        en: 'Inariyama sword, inscribed 471 CE — among the oldest writing found in Japan. <em>Wikimedia Commons, CC0.</em>',
        mn: 'Инариямагийн сэлэм, 471 онд сийлсэн — Японоос олдсон хамгийн эртний бичээсийн нэг. <em>Wikimedia Commons, CC0.</em>'
    },

    'origins.era3.when': { en: 'c. 600s', mn: '600-аад он' },
    'origins.era3.sub': { en: 'the mismatch', mn: 'тохирохгүй нь' },
    'origins.era3.title': { en: "The system doesn't fit the language", mn: 'Бичиг нь хэлэндээ таарсангүй' },
    'origins.era3.p1': {
        en: 'Chinese barely inflects: characters sit in order and the order carries the grammar. Japanese glues endings onto stems — 書く, 書いた, 書かない, 書かせられる. Chinese characters have no way to write が, を, ました.',
        mn: 'Хятад хэлэнд үг бараг хувирдаггүй: ханзууд дараалан жагсах ба тэр дараалал нь өөрөө дүрмийн үүргийг гүйцэтгэдэг. Япон хэл харин үндэс дээрээ нөхцөл залгасаар явдаг — 書く, 書いた, 書かない, 書かせられる. Харин が, を, ました гэх мэтийг ханзаар бичих ямар ч арга байхгүй.'
    },
    'origins.era3.p2': {
        en: 'Japanese readers coped by inventing <em>kaeriten</em> — little marks telling you to jump backwards and read the characters out of order, in Japanese sequence. An entire notation, just to make somebody else\'s writing system survivable.',
        mn: 'Япон уншигчид аргагүй эрхэнд <em>каэритэн</em> буюу «буцах тэмдэг» зохиожээ — ханзыг бичсэн дарааллаар нь биш, япон дарааллаар нь ухраад унших ёстойг заасан жижиг тэмдэг. Өөр хэлний бичгийг ашиглах гэсэн болохоор л бүтэн нэг тэмдэглэгээний тогтолцоо зохиох хэрэг гарсан.'
    },
    'origins.era3.pull': {
        en: 'Mongolian has exactly this shape too — endings stacked on a stem, particles doing the grammatical work. The problem Japanese hit in the 600s is one Mongolian would have hit with the same borrowed system.',
        mn: 'Монгол хэл ч яг ийм бүтэцтэй — үг үндэс дээрээ нөхцөл дараалан залгаж, дүрмийн үүргийг нөхцөл, сул үг гүйцэтгэдэг. 600-аад онд япончуудад тулгарсан асуудал, хэрэв бид монгол хэлээ ханзаар бичих гэсэн бол яг адилхан тулгарах байсан.'
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
        mn: 'Бичээчид ханзны <em>утгыг</em> нь тоохоо больж, зөвхөн дуудлагыг нь авч хэрэглэж эхэлсэн — 阿 гэвэл <b>а</b>, 伊 гэвэл <b>и</b>. Арга нь болсон ч төвөгтэй байлаа: үе тутамд бүтэн ханз хэрэгтэй, дээр нь бичээч бүр өөр өөр ханз сонгоно.'
    },
    'origins.era4.cap': {
        en: 'The Kojiki, 712 — Japan\'s oldest surviving book, and a text you cannot read as Chinese: much of it is characters standing in for Japanese sounds. Shown in the Shinpukuji manuscript, copied 1371–72. <em>Wikimedia Commons, public domain.</em>',
        mn: '«Кожики», 712 он — Японд өнөөг хүртэл хадгалагдан үлдсэн хамгийн эртний ном. Үүнийг хятад бичвэр мэт уншиж болохгүй: ихэнх ханз нь япон дуудлагыг орлож байгаа юм. Зурагт 1371–72 онд хуулсан Шинпүкүжийн гар бичмэл байна. <em>Wikimedia Commons, нийтийн эзэмшил.</em>'
    },

    'origins.era5.when': { en: 'c. 800s', mn: '800-аад он' },
    'origins.era5.sub': { en: 'Heian court', mn: 'Хэйаны ордон' },
    'origins.era5.title': { en: 'Hiragana: the cursive hand', mn: 'Хирагана: бийрийн гүйлгэн бичиг' },
    'origins.era5.p1': {
        en: 'Write 安 fast enough, in flowing brush cursive, and it collapses into あ. That is literally what hiragana is — man\'yōgana worn smooth by handwriting. It became the script of court literature and of women\'s writing; <em>The Tale of Genji</em> is written in it.',
        mn: '安 гэдэг ханзыг бийрээр хурдан гүйлгэж бичвэл あ болж хураагддаг. Хирагана яг ийм л юм — гараар олон дахин бичигдсээр гөлгөрсөн манъёгана. Улмаар ордны уран зохиол, эмэгтэйчүүдийн бичгийн үсэг болсон; <em>«Гэнжийн үлгэр»</em> ч үүгээр бичигджээ.'
    },
    'origins.era5.pull': {
        en: '安 → あ · 以 → い · 宇 → う · 加 → か · 奈 → な — the curve of each kana is the ghost of the character it came from.',
        mn: '安 → あ · 以 → い · 宇 → う · 加 → か · 奈 → な — кана бүрийн муруй нь гарал үүслийн ханзныхаа сүүдэр юм.'
    },
    'origins.era5.cap': {
        en: 'Genji monogatari emaki. The novel that made the case that serious literature could be written in kana. <em>Wikimedia Commons, public domain.</em>',
        mn: '«Гэнжи моногатари эмаки». Кана бичгээр ч жинхэнэ уран зохиол туурвиж болохыг нотолсон роман. <em>Wikimedia Commons, нийтийн эзэмшил.</em>'
    },

    'origins.era6.when': { en: 'c. 800s', mn: '800-аад он' },
    'origins.era6.sub': { en: 'temple margins', mn: 'сүмийн тэмдэглэл' },
    'origins.era6.title': { en: "Katakana: the monks' shorthand", mn: 'Катакана: лам нарын товчлол' },
    'origins.era6.p1': {
        en: 'At the same time and for the opposite purpose. Buddhist monks reading Chinese scripture needed to scribble pronunciation and grammar cues in the margins. No room for full characters, so they used a <em>fragment</em> of one: the left side of 加 became カ, the top of 宇 became ウ.',
        mn: 'Яг тэр үед, гэхдээ эсрэг зорилгоор. Хятад судар уншиж байсан буддын лам нар дуудлага, дүрмийн тайлбарыг судрын захад яаран тэмдэглэх шаардлагатай болжээ. Бүтэн ханз багтахгүй тул зөвхөн нэг <em>хэсгийг</em> нь авдаг болов: 加-гийн зүүн тал カ, 宇-гийн дээд хэсэг ウ болов.'
    },
    'origins.era6.pull': {
        en: 'Hiragana is a whole character softened. Katakana is a piece of one, snapped off. That is why hiragana curves and katakana is all straight lines — the difference is a thousand years old and entirely practical.',
        mn: 'Хирагана бол бүтэн ханзыг зөөлрүүлсэн хэлбэр, катакана бол ханзнаас хугалж авсан хэсэг. Тиймээс хирагана муруй, катакана шулуухан харагддаг — энэ ялгаа мянган жилийн настай бөгөөд цэвэр практик шалтгаантай.'
    },
    'origins.era6.cap': {
        en: 'Lotus Sutra manuscript. Scripture like this, in dense Chinese, is what katakana was invented to annotate. <em>Wikimedia Commons, CC0.</em>',
        mn: 'Лотус судрын гар бичмэл. Ийм нягт хятад бичвэрийн захад тэмдэглэл хийхийн тулд л катакана бий болсон юм. <em>Wikimedia Commons, CC0.</em>'
    },

    'origins.era7.when': { en: '800s–1868', mn: '800-аад–1868' },
    'origins.era7.sub': { en: 'a thousand years', mn: 'мянган жил' },
    'origins.era7.title': { en: 'The two scripts keep their jobs', mn: 'Хоёр бичиг үүргээ хадгалсаар' },
    'origins.era7.p1': {
        en: 'Katakana stayed the annotating, official, technical script — glosses, legal documents, later telegrams. Hiragana stayed the literary and everyday one. Neither was for foreign words yet, because there were barely any.',
        mn: 'Катакана тэмдэглэл, албан бичиг, техникийн бичгийн үүрэгтэй хэвээр үлдэв — тайлбар, хуулийн баримт, хожим цахилгаан мэдээ. Хирагана уран зохиол, өдөр тутмын бичгийнх байлаа. Аль нь ч гадаад үгэнд зориулагдаагүй, учир нь тэр үед гадаад үг гэж бараг байгаагүй.'
    },
    'origins.era7.p2': {
        en: 'A thousand years is a long time for a habit to set. By the time Japan needed a script for foreign words, katakana had been the "not ordinary text" script for forty generations.',
        mn: 'Мянган жил бол зуршил тогтоход хангалттай урт хугацаа. Япончуудад гадаад үг бичих бичиг хэрэгтэй болох үед катакана дөчин үеийн турш «энгийн бичвэр биш» гэдгийг заасаар ирсэн байлаа.'
    },

    'origins.era8.when': { en: '1868–1945', mn: '1868–1945' },
    'origins.era8.sub': { en: 'Meiji onward', mn: 'Мэйжигээс хойш' },
    'origins.era8.title': { en: 'Foreign words arrive in bulk', mn: 'Гадаад үгс бөөнөөрөө ирлээ' },
    'origins.era8.p1': {
        en: 'Japan opens to the West and needs thousands of new words at once. They land in katakana — not by decree, but because katakana was already the script that meant <em>this is annotation, this is not ordinary Japanese</em>. The habit forms here.',
        mn: 'Япон улс өрнөд рүү нээгдэж, нэг дор мянга мянган шинэ үг хэрэгтэй болов. Тэр бүх үг катаканагаар бичигдсэн — дээрээс тушаасандаа биш, харин катакана аль хэдийн <em>«энэ бол тэмдэглэл, энгийн япон үг биш»</em> гэдгийг заадаг бичиг байсан учраас. Зуршил эндээс тогтжээ.'
    },
    'origins.era8.cap': {
        en: 'Yokohama-e, later 19th century. Prints of the treaty ports sold the West to a curious public — and brought its vocabulary with it. <em>Wikimedia Commons, CC0.</em>',
        mn: 'Ёокохама-э, 19-р зууны сүүл. Гэрээт боомтуудыг дүрсэлсэн модон сийлбэрийн зургууд өрнөдийг сониуч олонд танилцуулахын хамт үгсийг нь ч дагуулж иржээ. <em>Wikimedia Commons, CC0.</em>'
    },

    'origins.era9.when': { en: '1946', mn: '1946' },
    'origins.era9.sub': { en: 'post-war reform', mn: 'дайны дараах шинэчлэл' },
    'origins.era9.title': { en: 'The rules are written down', mn: 'Дүрэм нь албан ёсоор тогтов' },
    'origins.era9.p1': {
        en: 'In the year after the war, Japan reformed its writing: the 1,850 tōyō kanji capped how many characters schooling required, and <em>gendai kanazukai</em> respelled kana to match how people actually spoke rather than how the Heian court had. The division of labour became official — kanji for meaning, hiragana for grammar, katakana for the foreign.',
        mn: 'Дайны дараагийн жил Япон улс бичгээ шинэчилсэн: «тоё ханз» хэмээх 1850 ханз сургуульд заавал сурах ханзны тоог хязгаарлаж, <em>«гэндай канадзукай»</em> нь Хэйаны ордныхоор биш, өнөөгийн ярианы дуудлагаар кана бичлэгийг өөрчилсөн. Аль бичиг ямар үүрэгтэйг эндээс албан ёсоор тогтоов — ханз утгыг заана, хирагана дүрмийг барина, катакана гадаад үгийг авна.'
    },
    'origins.era9.p2': {
        en: 'Then occupation and post-war trade poured English in, and the katakana convention that had been a habit became the flood you see today: コンピューター, テレビ, アルバイト.',
        mn: 'Улмаар эзлэлтийн үе, дайны дараах худалдаа англи үгсийг тасралтгүй урсган оруулснаар зүгээр нэг зуршил байсан катакана хэрэглээ өнөөгийн үер болон хувирчээ: コンピューター, テレビ, アルバイト.'
    },
    'origins.era9.cap': {
        en: 'Ginza in the post-war decades. Shopfronts are where the new katakana vocabulary became visible to everyone. <em>Wikimedia Commons, public domain.</em>',
        mn: 'Дайны дараах жилүүдийн Гинза. Шинэ катакана үгс дэлгүүрийн хаяг дээрээс л олны нүдэнд тусч эхэлсэн юм. <em>Wikimedia Commons, нийтийн эзэмшил.</em>'
    },

    // --- kana section ---------------------------------------------------------
    'origins.kana.h': { en: '3 · Every kana, in Mongolian', mn: '3 · Кана бүр, монголоор' },
    'origins.kana.sub': {
        en: 'Tap any tile to see its romaji and the character it was cut down from. Hiragana and katakana share a sound, so they share a tile — but they were carved out of different kanji, which is why they look nothing alike.',
        mn: 'Аль нэг нүд дээр дарвал латин бичлэг, гарал үүслийн ханз нь харагдана. Хирагана, катакана хоёр нэг дуудлагатай учир нэг нүдэнд хамт байна — гэхдээ тус тусдаа өөр ханзнаас гаралтай болохоор хоорондоо огт төстэй биш.'
    },
    'origins.legend.hiragana': { en: 'hiragana', mn: 'хирагана' },
    'origins.legend.katakana': { en: 'katakana', mn: 'катакана' },
    'origins.legend.mongolian': { en: 'Mongolian', mn: 'монгол' },

    'origins.notes.h': { en: 'The eight that need a note', mn: 'Тайлбар хэрэгтэй найман дуудлага' },
    'origins.notes.sub': {
        en: 'Most of the table is a clean swap. These are where the Mongolian letter is close but not exact — and three of them are where you start ahead of English speakers.',
        mn: 'Хүснэгтийн ихэнх нь шууд солигдоно. Эдгээр нь монгол үсэг ойролцоо ч яг таарахгүй тохиолдлууд — гурвыг нь та англи хэлтнээс илүү амархан хэлнэ.'
    },
    'origins.note.tsu': {
        en: 'English has no ts- at the start of a word, so learners from English struggle badly here. You already have ц. This one is free.',
        mn: 'Англи хэлэнд үгийн эхэнд ts- гэж байдаггүй тул англи хэлтнүүд энд ихэд гацдаг. Танд «ц» аль хэдийн байна — энэ дуудлагыг дасах шаардлагагүй.'
    },
    'origins.note.chi': {
        en: 'Your ч is very close. Japanese is slightly softer, but nobody will mishear you.',
        mn: 'Монгол «ч» бараг яг таарна. Япон нь арай зөөлөн боловч хэн ч буруу ойлгохгүй.'
    },
    'origins.note.n': {
        en: 'A syllable on its own, held a full beat — にほん is ни-хо-н, three beats. Mongolian\'s final н behaves much the same.',
        mn: 'Өөрөө бие даасан үе бөгөөд бүтэн цохилт эзэлдэг — にほん гэдэг ни-хо-н, гурван цохилт. Монгол үгийн эцсийн «н» ч яг ийм байдалтай.'
    },
    'origins.note.shi': {
        en: 'Softer than Mongolian ш, closer to щ. The tongue sits flatter and further forward.',
        mn: 'Монгол «ш»-ээс зөөлөн, «щ»-д ойр дуудагдана. Хэл арай хавтгай, урагшаа сууна.'
    },
    'origins.note.fu': {
        en: 'Not really ф. Bring both lips close and blow between them; your teeth never touch your lip. It lands between ф and х.',
        mn: 'Яг «ф» биш. Хоёр уруулаа ойртуулаад хооронд нь үлээхэд гарна, шүд уруулдаа огт хүрэхгүй. «Ф», «х» хоёрын дунд гэсэн үг.'
    },
    'origins.note.ra': {
        en: 'Not the rolled Mongolian р. The tongue taps once — closer to a quick л than to a trill.',
        mn: 'Монгол «р» шиг чичиргэхгүй. Хэл нэг л удаа хөнгөн цохиод буцна — чичиргээт «р»-ээс илүү хурдан «л»-д ойр сонсогдоно.'
    },
    'origins.note.u': {
        en: 'Lips stay flat, not pushed forward. Between у and ү, without the rounding.',
        mn: 'Уруулаа урагш сунгалгүй хавтгай байлгана. «У», «ү» хоёрын дунд, дугуйруулахгүйгээр.'
    },
    'origins.note.wo': {
        en: 'Written differently, pronounced exactly like お. It only ever appears as a grammatical particle.',
        mn: 'Бичлэг нь өөр ч дуудлага нь яг お. Зөвхөн дүрмийн нөхцөл болж л таарна.'
    },

    // --- why katakana ---------------------------------------------------------
    'origins.why.h': { en: '4 · So why are English words in katakana?', mn: '4 · Тэгвэл яагаад англи үгс катаканагаар бичигддэг вэ?' },
    'origins.why.sub': {
        en: 'The usual answer is "that\'s the rule". The real answer is four steps, and once you\'ve seen them the rule is obvious.',
        mn: 'Ихэвчлэн «дүрэм нь тийм» гэж хариулдаг. Жинхэнэ хариулт нь дөрвөн алхамтай бөгөөд эдгээрийг харсны дараа дүрэм нь өөрөө ойлгомжтой болно.'
    },
    'origins.why1.h': { en: 'Katakana was born as annotation', mn: 'Катакана тэмдэглэл болж төрсөн' },
    'origins.why1.p': {
        en: 'Monks writing beside somebody else\'s text. From its first day it meant <em>this is a note about the real writing, not the real writing</em>.',
        mn: 'Лам нар өөр хүний бичвэрийн хажууд тэмдэглэл хийж байсан хэрэг. Анхны өдрөөсөө <em>«энэ бол жинхэнэ бичвэрийн тухай тэмдэглэл, жинхэнэ бичвэр биш»</em> гэсэн утгатай байв.'
    },
    'origins.why2.h': { en: 'That meaning stuck for a thousand years', mn: 'Тэр утга мянган жил хадгалагдсан' },
    'origins.why2.p': {
        en: 'Glosses, official forms, telegrams, technical terms. Always the script that flags something as set apart from ordinary running text.',
        mn: 'Тайлбар, албан маягт, цахилгаан мэдээ, техникийн нэр томьёо. Ямагт л ялгаж тэмдэглэсэн бичиг — энэ хэсэг энгийн бичвэрээс өөр гэдгийг илтгэдэг.'
    },
    'origins.why3.h': { en: 'Then foreign words arrived in bulk', mn: 'Дараа нь гадаад үгс бөөнөөрөө ирсэн' },
    'origins.why3.p': {
        en: 'Meiji Japan needed words for everything Western, and the post-war years brought English by the shipload. These words were, by definition, not ordinary Japanese.',
        mn: 'Мэйжийн үеийн Японд өрнөдийн бүх зүйлийг нэрлэх үг хэрэгтэй болж, дайны дараах жилүүдэд англи үг тоо томшгүй олноор нэвтэрсэн. Эдгээр нь угаасаа энгийн япон үг байгаагүй.'
    },
    'origins.why4.h': { en: 'They went into the script that already meant "not ordinary"', mn: 'Тэр үгс «энгийн биш» гэсэн утгатай бичигтээ очсон' },
    'origins.why4.p': {
        en: 'No committee decided this. The words needed somewhere to go, and katakana was already doing that job.',
        mn: 'Үүнийг ямар ч хороо суугаад шийдээгүй. Тэр үгсийг ямар нэг бичгээр бичих ёстой байсан бөгөөд катакана уг үүргийг аль хэдийн гүйцэтгэж байлаа.'
    },
    'origins.why.verdict': {
        en: '<strong>So katakana doesn\'t mean "English".</strong> It means "this word is set apart" — which is also why it takes animal and plant names in biology, onomatopoeia like ドキドキ, company names, and emphasis, the way italics work in Mongolian or English. Foreign words are the biggest group in that category, not the definition of it.',
        mn: '<strong>Тэгэхээр катакана нь «англи» гэсэн утгатай биш.</strong> «Энэ үг тусдаа» гэсэн утгатай — тиймээс биологид амьтан, ургамлын нэр, ドキドキ мэтийн дуу дуурайх үг, компанийн нэр, мөн онцлон тэмдэглэхэд ч катакана хэрэглэдэг. Монгол, англи хэлэнд налуу үсэг ямар үүрэг гүйцэтгэдэгтэй яг адил. Гадаад үг бол энэ ангиллын хамгийн том хэсэг нь болохоос ангилал нь өөрөө биш.'
    },

    // --- next steps -----------------------------------------------------------
    'origins.next.h': { en: 'Where to go next', mn: 'Цаашид юу хийх вэ' },
    'origins.next.sub': {
        en: 'You now know what the three scripts are for. These tools pick up from here.',
        mn: 'Гурван бичиг тус бүр юунд зориулагдсаныг та одоо мэдлээ. Дараагийн алхам бол эдгээр хэрэгсэл.'
    },
    'origins.next.game': {
        en: 'Connect Japanese words to their Mongolian meanings. Start at N5.',
        mn: 'Япон үгийг утга нь тохирох монгол үгтэй холбоно. N5-аас эхлээрэй.'
    },
    'origins.next.phonetics': {
        en: 'Kanji that share a component usually share a reading. Learn them in groups.',
        mn: 'Ижил язгууртай ханзууд ихэвчлэн ижил уншлагатай байдаг. Бүлгээр нь сурвал хурдан.'
    },
    'origins.next.reading': {
        en: 'Read passages aloud and watch the highlight follow your voice.',
        mn: 'Текстийг чангаар уншихад тодотгол дуу хоолойг чинь дагана.'
    },
});
