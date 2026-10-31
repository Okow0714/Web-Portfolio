// Study Path (path.html)-specific translation strings. Extends window.I18N_STRINGS, which
// i18n-strings-shared.js must have already created (loaded first in path.html).
//
// Level ranges named in this copy are real: Word Match has 12 levels per JLPT tier, Grammar
// Connect 20 per track (Foundation N5-N3, Advanced N2-N1), Dokkai Reader 12 per track. If any of
// those change, the numbers here change with them -- see the note in CLAUDE.md about user-facing
// copy drifting away from the constants.
Object.assign(window.I18N_STRINGS, {
    'path.titleSub': { en: 'Study Path', mn: 'Сурах зам' },
    'path.lede': {
        en: 'Six stages, from not knowing a single character to N1. Click any point to open that stage in full. Why the curve has this shape is explained below it.',
        mn: 'Зургаан үе шат — нэг ч үсэг танихгүй байхаас N1 хүртэл. Цэг бүр дээр дарвал тухайн шатны бүрэн хуудас нээгдэнэ. Муруй яагаад ийм хэлбэртэйг доор тайлбарласан.',
    },
    // The map's stop labels and axis captions.
    'path.stop0': { en: 'Stage 0', mn: '0-р шат' },
    'path.stop1': { en: 'Stage 1', mn: '1-р шат' },
    'path.stop2': { en: 'Stage 2', mn: '2-р шат' },
    'path.stop3': { en: 'Stage 3', mn: '3-р шат' },
    'path.stop4': { en: 'Stage 4', mn: '4-р шат' },
    'path.stop5': { en: 'Stage 5', mn: '5-р шат' },
    'path.axisY': { en: 'Confidence', mn: 'Өөртөө итгэх итгэл' },
    'path.axisX': { en: 'Time studied →', mn: 'Сурсан хугацаа →' },

    // The Dunning-Kruger note, folded under the curve. The claim that the familiar graph is not
    // in the 1999 paper, and that the effect is largely a statistical artefact, is sourced in
    // the last line -- do not soften it to "some researchers think" without checking those.
    'path.essayTitle': { en: 'The Dunning-Kruger curve', mn: 'Даннинг–Крюгерийн муруй' },
    'path.essayHint': { en: 'why it has this shape', mn: 'яагаад ийм хэлбэртэй вэ?' },
    'path.essay1': {
        en: 'You have seen this shape somewhere. Confidence climbs fast to a peak, falls off a cliff, then recovers slowly on ground that is actually solid.',
        mn: 'Энэ хэлбэрийг та хаа нэгтээ үзсэн байх. Эхлээд өөртөө итгэх итгэл хурдан өсч оргилд хүрнэ, дараа нь огцом унана, эцэст нь бодит мэдлэг дээр тогтож аажмаар сэргэнэ.',
    },
    'path.essayH1': { en: 'First, one thing', mn: 'Эхлээд нэг зүйлийг хэлье' },
    'path.essay2': {
        en: '<b>This graph is not in the original study.</b> Kruger and Dunning’s 1999 paper has no peak and no valley. The curve everyone knows was drawn later, by other people, on the internet.',
        mn: '<b>Энэ график анхны судалгаанд байхгүй.</b> Крюгер, Даннинг хоёрын 1999 оны өгүүлэлд оргил ч, хөндий ч алга. Олны мэдэх энэ муруйг хожим интернэтэд өөр хүмүүс зуржээ.',
    },
    'path.essay3': {
        en: 'The effect itself is disputed too. Researchers running the same analysis on <b>random numbers</b> get the same shape out. Much of the picture may be a shadow cast by the statistics rather than by human psychology.',
        mn: 'Үр нөлөө нь өөрөө ч маргаантай. Судлаачид <b>санамсаргүй тоон дээр</b> яг тэр аргаар тооцоолоход ижил хэлбэр гарч ирэхийг харуулсан. Өөрөөр хэлбэл зургийн ихэнх нь хүний сэтгэл зүй биш, статистикийн сүүдэр байж болох юм.',
    },
    'path.essayH2': { en: 'So why put it here?', mn: 'Тэгвэл яагаад энд тавив?' },
    'path.essay4': {
        en: 'Because it is not a law, it is an <b>expectation</b>. A map rather than a measurement.',
        mn: 'Учир нь энэ бол хууль биш, <b>хүлээлт</b>. Хэмжилт гэхээсээ илүү зураглал.',
    },
    'path.essay5': {
        en: 'Around N3 Japanese suddenly feels hard. The vocabulary shifts from concrete things to abstract ideas, and what worked before stops working. At N2 you meet newspaper Japanese and formal written style. Thinking “I cannot do this” at exactly that point is completely normal.',
        mn: 'N3 орчимд япон хэл гэнэт хэцүү санагддаг. Үгсийн сан бодит зүйлээс хийсвэр ойлголт руу шилжиж, өмнө нь ажилласан арга ажиллахаа болино. N2 дээр сонины хэл, албан бичгийн хэв маяг тулгарна. Яг тэр үед «би чадахгүй юм байна» гэж бодох нь маш хэвийн.',
    },
    'path.essayPull': {
        en: 'The curve is not telling you how clever you are. It is telling you <i>where</i> that feeling arrives — so that it does not take you by surprise.',
        mn: 'Муруй танд хэр ухаантайг чинь хэлж байгаа юм биш. Тэр мэдрэмж <i>хаана</i> ирэхийг урьдчилж хэлж байгаа юм — ирэхээр нь гайхахгүйн тулд.',
    },
    'path.essay6': {
        en: 'The hour ranges on each point do the same job. They are not promises, they are rough numbers from other people’s experience. If you are behind them, that is not a problem with you — it is that they are rough.',
        mn: 'Цэг бүр дээрх цагийн тоо ч мөн адил үүрэгтэй. Эдгээр нь амлалт биш, бусдын туршлагаас гарсан ойролцоо тоо. Хэрэв та хуваариасаа хоцорч байвал энэ нь таны асуудал биш — тоонууд ойролцоо учраас тэр.',
    },

    // The six stage pages.
    'pstage.back': { en: 'Back to the map', mn: 'Замын зураг руу' },
    'pstage.prev': { en: '← Previous', mn: '← Өмнөх' },
    'pstage.next': { en: 'Next →', mn: 'Дараах →' },
    'pstage.onCurve': { en: 'where this sits on the curve', mn: 'муруй дээрх байршил' },
    'path.startHere': { en: 'Start here', mn: 'Эхлэх цэг' },
    'path.settings': { en: 'Settings', mn: 'Тохиргоо' },

    // ---- Stage 0 ----
    'path.s0.title': { en: 'Stage 0 · Before any JLPT level', mn: '0-р шат · JLPT-ийн өмнө' },
    'path.s0.hours': { en: '15–30 hours', mn: '15–30 цаг' },
    'path.s0.goal': {
        en: 'Read both kana alphabets without help. Nothing else on this site works until this one does.',
        mn: 'Хоёр кана цагаан толгойг тусламжгүйгээр уншиж сурна. Үүнийг сурч авах хүртэл энэ сайтын бусад хэрэгсэл нэмэр болохгүй.',
    },
    'path.s0.w1': { en: 'Opener, then both tables', mn: 'Эхний тайлбар, дараа нь хүснэгтүүд' },
    'path.s0.d1': {
        en: 'Read the opener on <b>what kanji, hiragana and katakana each do</b> — most beginners lose weeks to not knowing why there are three. Then work through both kana tables. Every kana shows the Chinese character it was drawn from, which gives you something to hang the shape on.',
        mn: '<b>Ханз, хирагана, катакана тус бүр ямар үүрэгтэйг</b> тайлбарласан эхний хэсгийг уншаарай — яагаад гурван бичиг байдгийг мэдэхгүйгээс болж эхлэгчид олон долоо хоногийг дэмий өнгөрөөдөг. Дараа нь хоёр хүснэгтийг судлаарай. Кана бүрийн хажууд түүнийг үүсгэсэн хятад ханз харагдах тул хэлбэрийг нь тогтооход хялбар.',
    },
    'path.s0.w2': { en: 'Furigana', mn: 'Фуригана' },
    'path.s0.d2': {
        en: 'Furigana starts as kana. If you truly cannot read it yet, switch to <b>romaji</b> for a week or two — then switch back. Romaji left on is the single most common reason people still cannot read after a year.',
        mn: 'Фуригана анхнаасаа кана хэлбэрээр гарна. Хэрэв уншиж чадахгүй бол нэг хоёр долоо хоног <b>ромажи</b> болгож болно — гэхдээ заавал буцааж кана болгоорой. Ромажиг байнга асаалттай орхих нь жил сурсан хэрнээ уншиж чаддаггүйн хамгийн түгээмэл шалтгаан.',
    },
    'path.s0.w3': { en: 'N5 · any level', mn: 'N5 · дурын шат' },
    'path.s0.d3': {
        en: 'Use it purely as kana drill at this point. Do not worry about remembering the words yet; you are training your eye to read the shapes at speed.',
        mn: 'Одоохондоо зөвхөн кана унших дасгал болгон ашиглаарай. Үг цээжлэх талаар одоохондоо санаа зовох хэрэггүй — энэ үед та үсгийн хэлбэрийг хурдан таних нүдээ дасгаж байгаа юм.',
    },
    'path.s0.ready': {
        en: '<b>Ready when:</b> you can read a kana word aloud without checking the table, both hiragana and katakana.',
        mn: '<b>Дараагийн шат руу:</b> хирагана, катакана хоёуланг нь хүснэгт харалгүй чангаар уншиж чаддаг болсон үед.',
    },

    // ---- Stage 1 ----
    'path.s1.title': { en: 'Stage 1 · N5', mn: '1-р шат · N5' },
    'path.s1.hours': { en: '250–450 hours', mn: '250–450 цаг' },
    'path.s1.goal': {
        en: 'Everyday words, the shape of a basic sentence, and your first hundred-odd kanji.',
        mn: 'Өдөр тутмын үгс, энгийн өгүүлбэрийн бүтэц, анхны зуу орчим ханз.',
    },
    'path.s1.w1': { en: 'N5 · levels 1–12', mn: 'N5 · 1–12-р шат' },
    'path.s1.d1': {
        en: '300 words in twelve themed levels — <b>Days and dates</b>, <b>Eating and drinking</b>, <b>At home</b>. Do them in order: each level is one topic, so the words reinforce each other instead of arriving at random.',
        mn: 'Сэдэвчилсэн арван хоёр шатанд 300 үг — <b>Өдөр, сар, жил</b>, <b>Идэх, уух</b>, <b>Гэртээ</b>. Дараалан хийгээрэй: шат бүр нэг сэдэвтэй тул үгс тус тусдаа бус, бие биенээ бататгаж тогтоно.',
    },
    'path.s1.w2': { en: 'Foundation · 1–7', mn: 'Суурь · 1–7' },
    'path.s1.d2': {
        en: 'Ten sentences a level. You swap the underlined grammar point for one that means the same thing, which teaches you the forms by contrast rather than by list.',
        mn: 'Шат бүрт арван өгүүлбэр. Доогуур зураастай дүрмийн хэсгийг утга нь өөрчлөгдөхгүйгээр өөр хэлбэрээр солино. Ингэснээр дүрмийг жагсаалтаар бус, харьцуулж сурна.',
    },
    'path.s1.w3': { en: 'Foundation · 1–3', mn: 'Суурь · 1–3' },
    'path.s1.d3': {
        en: 'Read short texts aloud and the page listens. Reading out loud at this stage is worth more than reading silently — it catches the words you only think you know.',
        mn: 'Богино бичвэрийг чангаар уншихад хуудас чагнаж байдаг. Энэ шатанд чангаар унших нь дуугүй уншихаас илүү үр дүнтэй — мэддэг гэж бодож байсан үгсээ ингэж илрүүлнэ.',
    },
    'path.s1.w4': { en: 'N5 tier', mn: 'N5 түвшин' },
    'path.s1.d4': {
        en: 'Browse, do not memorise. The point is to notice early that kanji sharing a part often share a sound — <b class="jp">生・性・姓</b> all read セイ. That noticing is what makes the next thousand kanji cheaper.',
        mn: 'Цээжлэх шаардлагагүй, зүгээр л сөхөж үзээрэй. Ижил хэсэгтэй ханзууд ихэвчлэн ижил дуудлагатай байдгийг эрт анзаарах нь чухал — <b class="jp">生・性・姓</b> бүгд セイ гэж уншигдана. Энэ анзаарал дараагийн мянган ханзыг сурахад хөнгөвчилнө.',
    },
    'path.s1.ready': {
        en: '<b>Ready when:</b> all twelve N5 Word Match levels are cleared and Grammar Connect Foundation 7 goes through without mistakes.',
        mn: '<b>Дараагийн шат руу:</b> Үг холбохын N5-ын арван хоёр шатыг бүгдийг дуусгаж, Дүрэм холбохын Суурь 7-г алдаагүй давсан үед.',
    },

    // ---- Stage 2 ----
    'path.s2.title': { en: 'Stage 2 · N4', mn: '2-р шат · N4' },
    'path.s2.hours': { en: '400–700 hours', mn: '400–700 цаг' },
    'path.s2.goal': {
        en: 'Polite speech, the forms that look alike, and reading a paragraph instead of a line.',
        mn: 'Эелдэг ярианы хэлбэр, бие биетэйгээ төстэй дүрмүүд, нэг мөр биш бүтэн догол мөр унших.',
    },
    'path.s2.w1': { en: 'N4 · levels 1–12', mn: 'N4 · 1–12-р шат' },
    'path.s2.d1': {
        en: 'One whole level is <b>Saying it politely</b> — <span class="jp">いらっしゃる, 申し上げる, なさる, いただく</span>. Keigo starts here, and it is easier as a set than met one word at a time.',
        mn: 'Бүтэн нэг шат нь <b>Эелдэг ярих</b> — <span class="jp">いらっしゃる, 申し上げる, なさる, いただく</span>. Хүндэтгэлийн хэл эндээс эхэлнэ. Эдгээрийг нэг нэгээр нь тааралдаж сурахаас багцаар нь үзсэн нь хялбар.',
    },
    'path.s2.w2': { en: 'Foundation · 8–14', mn: 'Суурь · 8–14' },
    'path.s2.d2': {
        en: 'Longer sentences, and forms that differ by one syllable. Slow down here — the mistakes you make in this range are the ones that persist.',
        mn: 'Урт өгүүлбэрүүд, ганц үеэрээ ялгаатай хэлбэрүүд. Энд яарах хэрэггүй — яг энэ хэсэгт гаргасан алдаа хамгийн удаан үлддэг.',
    },
    'path.s2.w3': { en: 'Foundation · 4–7', mn: 'Суурь · 4–7' },
    'path.s2.d3': {
        en: 'Texts long enough that you have to hold a thought across sentences.',
        mn: 'Хэд хэдэн өгүүлбэрийн туршид утгыг нь санаж явахаар урт бичвэрүүд.',
    },
    'path.s2.w4': { en: 'Look things up', mn: 'Үг хайж сурах' },
    'path.s2.d4': {
        en: 'Start looking words up instead of waiting to be taught them. This is the habit that separates people who keep going from people who stall at N4.',
        mn: 'Хэн нэгэн зааж өгөхийг хүлээхийн оронд өөрөө үг хайж эхлээрэй. Урагшаа явсаар байдаг хүн, N4 дээр зогсдог хүн хоёрын ялгаа яг энэ зуршилд байдаг.',
    },
    'path.s2.ready': {
        en: '<b>Ready when:</b> a Dokkai Reader Foundation level 7 text reads through without stopping, and you can tell the polite forms apart on sight.',
        mn: '<b>Дараагийн шат руу:</b> Уншлагын дадлагын Суурь 7-р шатны бичвэрийг зогсолтгүй уншиж, эелдэг хэлбэрүүдийг хараад ялгаж чаддаг болсон үед.',
    },

    // ---- Stage 3 ----
    'path.s3.title': { en: 'Stage 3 · N3', mn: '3-р шат · N3' },
    'path.s3.hours': { en: '700–1,100 hours', mn: '700–1,100 цаг' },
    'path.s3.goal': {
        en: 'The wall. Vocabulary stops being concrete and starts being abstract, and there is no way through but volume.',
        mn: 'Хамгийн хэцүү хэсэг. Үгсийн сан бодит зүйлээс хийсвэр ойлголт руу шилжих тул их давтахаас өөр арга байхгүй.',
    },
    'path.s3.w1': { en: 'N3 · levels 1–12', mn: 'N3 · 1–12-р шат' },
    'path.s3.d1': {
        en: 'The themes change character here: <b>Money and paying</b>, <b>Rules and society</b>, <b>How much, how sure</b>. That is not a design choice, it is what N3 vocabulary is.',
        mn: 'Эндээс сэдвүүдийн шинж чанар өөрчлөгдөнө: <b>Мөнгө ба төлбөр</b>, <b>Дүрэм ба нийгэм</b>, <b>Хэр их, хэр олон, хэр итгэлтэй</b>. Энэ нь зохиомжийн шийдэл биш, N3-ын үгсийн сан яг ийм байдаг.',
    },
    'path.s3.w2': { en: 'Foundation · 15–20', mn: 'Суурь · 15–20' },
    'path.s3.d2': {
        en: 'Finish the Foundation track. Do not start Advanced until this one is clean.',
        mn: 'Суурь замыг бүрэн дуусгаарай. Түүнийг цэвэр давах хүртэл Гүнзгий рүү орох хэрэггүй.',
    },
    'path.s3.w3': { en: 'Foundation 8–12, then Advanced 1–3', mn: 'Суурь 8–12, дараа нь Гүнзгий 1–3' },
    'path.s3.d3': {
        en: 'The two tracks overlap at N3 on purpose, so you can cross over when the Foundation texts stop being hard rather than on a fixed date.',
        mn: 'Хоёр зам N3 дээр зориуд давхцдаг. Ингэснээр тогтсон өдрөөр биш, Суурь бичвэрүүд хэцүү байхаа болих үед нөгөө рүү нь шилжиж болно.',
    },
    'path.s3.w4': { en: 'N5–N3, seriously now', mn: 'N5–N3, одоо нухацтай' },
    'path.s3.d4': {
        en: 'Stop browsing and start using it. Guessing an unknown kanji\'s reading from its parts is a real N3-level skill and it saves you thousands of individual lookups.',
        mn: 'Сөхөж үзэхээ больж, ажил хэрэг болгон ашиглаарай. Танихгүй ханзны дуудлагыг хэсгүүдээс нь таах бол жинхэнэ N3 түвшний ур чадвар бөгөөд мянга мянган удаа толь харахаас хэмнэнэ.',
    },
    'path.s3.ready': {
        en: '<b>Ready when:</b> you can guess the reading of a kanji you have never seen, from its phonetic component, and be right more often than not.',
        mn: '<b>Дараагийн шат руу:</b> урьд өмнө хараагүй ханзны дуудлагыг авианы хэсгээс нь таамаглахад ихэвчлэн зөв гарч эхэлсэн үед.',
    },

    // ---- Stage 4 ----
    'path.s4.title': { en: 'Stage 4 · N2', mn: '4-р шат · N2' },
    'path.s4.hours': { en: '1,150–1,800 hours', mn: '1,150–1,800 цаг' },
    'path.s4.goal': {
        en: 'Newspaper Japanese: technical words, formal writing, and grammar that only appears in print.',
        mn: 'Сонины япон хэл: мэргэжлийн нэр томьёо, албан бичгийн хэв маяг, зөвхөн бичгийн хэлэнд гардаг дүрмүүд.',
    },
    'path.s4.w1': { en: 'N2 · levels 1–12', mn: 'N2 · 1–12-р шат' },
    'path.s4.d1': {
        en: 'Includes <b>Measuring and shapes</b> and <b>School, books and words</b> — the vocabulary you need to read <em>about</em> Japanese in Japanese (<span class="jp">主語, 述語, 形容詞, 敬語</span>).',
        mn: '<b>Хэмжих ба хэлбэр</b>, <b>Сургууль, ном, үг</b> зэрэг шат багтана — япон хэлний тухай япон хэл дээр унших үгсийн сан (<span class="jp">主語, 述語, 形容詞, 敬語</span>).',
    },
    'path.s4.w2': { en: 'Advanced · 1–10', mn: 'Гүнзгий · 1–10' },
    'path.s4.d2': {
        en: 'Written-register grammar. Much of it you will never say out loud, and all of it appears in the exam.',
        mn: 'Бичгийн хэлний дүрэм. Ихэнхийг нь та аман яриандаа хэзээ ч хэрэглэхгүй ч шалгалтад бүгд гарна.',
    },
    'path.s4.w3': { en: 'Advanced · 4–7', mn: 'Гүнзгий · 4–7' },
    'path.s4.d3': {
        en: 'Read for speed now, not just accuracy. N2 and N1 are as much a reading-speed exam as a knowledge one.',
        mn: 'Одоо зөв уншихаас гадна хурдан унших талаа анхаарна уу. N2, N1 бол мэдлэгийн шалгалт төдийгүй унших хурдны шалгалт юм.',
    },
    'path.s4.w4': { en: 'Most-missed words', mn: 'Хамгийн их алдсан үгс' },
    'path.s4.d4': {
        en: 'At this level your weak spots are specific rather than general. Let the dashboard tell you which words you keep getting wrong instead of guessing.',
        mn: 'Энэ түвшинд таны сул тал ерөнхий биш, тодорхой болдог. Аль үгэнд байнга алддагаа таамаглахын оронд хяналтын самбараас хараарай.',
    },
    'path.s4.ready': {
        en: '<b>Ready when:</b> all twelve N2 Word Match levels are cleared and Advanced 10 goes through with two mistakes or fewer.',
        mn: '<b>Дараагийн шат руу:</b> Үг холбохын N2-ын арван хоёр шатыг дуусгаж, Гүнзгий 10-ыг хоёроос илүүгүй алдаатай давсан үед.',
    },

    // ---- Stage 5 ----
    'path.s5.title': { en: 'Stage 5 · N1', mn: '5-р шат · N1' },
    'path.s5.hours': { en: '2,150–3,900 hours', mn: '2,150–3,900 цаг' },
    'path.s5.goal': {
        en: 'Abstract Sino-Japanese, the register of official writing, and words that have no everyday equivalent.',
        mn: 'Хийсвэр утгатай хятад гаралтай үгс, албан бичгийн хэв маяг, өдөр тутмын ярианд орлуулах үггүй нэр томьёо.',
    },
    'path.s5.w1': { en: 'N1 · levels 1–12', mn: 'N1 · 1–12-р шат' },
    'path.s5.d1': {
        en: 'The themes read like a newspaper\'s sections — <b>Money and finance</b>, <b>Government and power</b>, <b>Thinking and deciding</b> — because that is honestly what N1 vocabulary is. There is no everyday level here to hide in.',
        mn: 'Сэдвүүд нь сонины булан шиг сонсогдоно — <b>Мөнгө ба санхүү</b>, <b>Засаг ба эрх мэдэл</b>, <b>Бодох ба шийдэх</b> — учир нь N1-ийн үгсийн сан үнэхээр ийм. Энд нуугдах өдөр тутмын шат байхгүй.',
    },
    'path.s5.w2': { en: 'Advanced · 11–20', mn: 'Гүнзгий · 11–20' },
    'path.s5.d2': {
        en: 'The last forms, most of them written-only and several of them near-synonyms you have to separate by feel.',
        mn: 'Хамгийн сүүлийн хэлбэрүүд. Ихэнх нь зөвхөн бичгийн хэлэнд гардаг бөгөөд зарим нь бараг ижил утгатай тул мэдрэмжээрээ ялгах хэрэгтэй болно.',
    },
    'path.s5.w3': { en: 'Advanced · 8–12', mn: 'Гүнзгий · 8–12' },
    'path.s5.d3': {
        en: 'The longest texts here. If these are comfortable, the exam\'s reading section will be too.',
        mn: 'Энд байгаа хамгийн урт бичвэрүүд. Эдгээрийг тухтай уншиж чадвал шалгалтын уншлагын хэсэг ч мөн адил байх болно.',
    },
    'path.s5.beyond': { en: 'Beyond this site', mn: 'Энэ сайтаас цааш' },
    'path.s5.w4': { en: 'Real material', mn: 'Жинхэнэ материал' },
    'path.s5.d4': {
        en: 'At N1 no study tool can carry you further than real Japanese can. Read the news, read novels, watch things without subtitles. Use this site to plug the specific gaps that leaves.',
        mn: 'N1 дээр ямар ч сургалтын хэрэгсэл жинхэнэ япон хэлээс илүү хол хүргэж чадахгүй. Мэдээ, роман уншиж, хадмал орчуулгагүйгээр үзээрэй. Түүнээс үлдэх цоорхойг нөхөхөд энэ сайтыг ашиглаарай.',
    },
    'path.s5.ready': {
        en: '<b>Ready when:</b> you would rather read something real than practise. That is the whole point of the path.',
        mn: '<b>Төгсгөл нь:</b> дасгал хийхээс илүү жинхэнэ япон бичвэр унших дуртай болсон үе. Энэ замын гол зорилго ч яг тэр.',
    },

    // ---- outro ----
});
