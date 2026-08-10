// Sentence data for Grammar Connect. Two difficulty tracks -- foundation (N5-N3 grammar,
// pooled together since true same-meaning grammar pairs are too sparse within N5 alone to
// fill 20 levels on its own) and advanced (N2-N1, which has much richer near-synonym
// material since comparing similar advanced patterns is a normal part of studying at that
// level) -- 20 levels each, 10 sentences per level.
//
// Each sentence is a template: prefix + swappable grammar segment + suffix, where prefix
// and suffix are IDENTICAL text regardless of which grammar is chosen, so the sentence
// renders correctly whether `old` (the grammar the player starts with) or `new` (the
// verified same-meaning replacement) is in the slot. Both prefix and suffix may contain
// <ruby> furigana markup (matching game-words.js's example-sentence convention); `old` and
// `new` deliberately do NOT get furigana since JLPT grammar points are essentially always
// kana. Where old/new share a conjugated tail (e.g. そう/らしい both just take です), that
// shared part lives in the suffix instead of being repeated in both options, per the "keep
// tiles as short as possible" brief -- but where the two forms genuinely conjugate
// differently (e.g. a たら vs ば conditional, or an i-adjective vs a negative verb ending),
// the differing tail stays inside old/new rather than forcing an inaccurate shared suffix.
//
// `translation` and `explanation` are ONLY ever shown after a sentence is solved (in the
// match screen's "cleared" side rail) -- never during the puzzle itself, which is
// Japanese-only by design.
//
// Every sentence pairs two grammar points that are widely documented as close-to-
// interchangeable in standard JLPT study material (Genki, Minna no Nihongo, Bunpro,
// JLPTsensei, Tae Kim's Guide), not invented pairings -- see each sentence's `explanation`
// for the specific relationship. Distractor tiles are NOT hand-authored per sentence; the
// game engine draws them at render time from the track's shared GRAMMAR_POOLS entry below,
// so the same sentence can show a different, shuffled set of wrong tiles on replay.
//
// `oldCore`/`newCore` (optional): GRAMMAR_POOLS entries are citation-form grammar (e.g.
// てもかまわない), but `old`/`new` are conjugated to fit the actual sentence (e.g.
// かまいません) and so won't always string-match their own pool entry. Without these, the
// pool's citation-form version of the very grammar being tested could slip into the tile
// bank as a second, confusingly-similar-looking option. When old/new differ from their pool
// form, oldCore/newCore name the exact pool strings to exclude; omit either when old/new
// already matches the pool exactly (e.g. そう/らしい need no override).

const GRAMMAR_POOLS = {
    "foundation": [
        "そう",
        "よう",
        "みたい",
        "らしい",
        "っぽい",
        "はず",
        "べき",
        "わけ",
        "つもり",
        "ばかり",
        "ところ",
        "がち",
        "ぎみ",
        "きり",
        "だらけ",
        "まみれ",
        "げ",
        "つつ",
        "ながら",
        "たて",
        "かけ",
        "から",
        "ので",
        "けど",
        "が",
        "し",
        "たら",
        "なら",
        "と",
        "ば",
        "ても",
        "でも",
        "まま",
        "うちに",
        "あいだに",
        "てから",
        "たあとで",
        "まえに",
        "ために",
        "ように",
        "ことになる",
        "ことにする",
        "ようにする",
        "ようになる",
        "ことがある",
        "てみる",
        "ておく",
        "てしまう",
        "てある",
        "ていく",
        "てくる",
        "かもしれない",
        "にちがいない",
        "でしょう",
        "とおもう",
        "なければならない",
        "ないといけない",
        "てもいい",
        "てもかまわない",
        "てはいけない",
        "ないでください",
        "ことができる",
        "やすい",
        "にくい",
        "すぎる",
        "たほうがいい"
    ],
    "advanced": [
        "にもかかわらず",
        "ものの",
        "とはいえ",
        "くせに",
        "つつも",
        "というのに",
        "にしては",
        "わりに",
        "だけあって",
        "だけに",
        "とあって",
        "ばかりに",
        "せいで",
        "おかげで",
        "ことから",
        "にもかまわず",
        "をよそに",
        "ぬきで",
        "かたわら",
        "いっぽうで",
        "にひきかえ",
        "にくらべて",
        "にもまして",
        "にとどまらず",
        "のみならず",
        "ばかりでなく",
        "どころか",
        "はおろか",
        "にかぎらず",
        "どころではない",
        "ないまでも",
        "ないものの",
        "ないともかぎらない",
        "ないではいられない",
        "ずにはいられない",
        "ざるをえない",
        "てやまない",
        "てはばからない",
        "にたえない",
        "きらいがある",
        "にほかならない",
        "にすぎない",
        "までもない",
        "なくして",
        "なしに",
        "いかんで",
        "をものともせず",
        "をふまえて",
        "をめぐって",
        "にそくして",
        "にさきだち",
        "とあいまって",
        "てからというもの",
        "たところで",
        "たとたん",
        "かとおもうと",
        "なり",
        "そばから",
        "につけ",
        "にあって",
        "なりに",
        "ならでは",
        "てまで",
        "までして",
        "たりとも",
        "ずじまい"
    ]
};

const GRAMMAR_LEVELS = {
    "foundation": [
        {
            "level": 1,
            "title": "Foundation · Level 1",
            "sentences": [
                {
                    "prefix": "<ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby>は<ruby>雨<rp>(</rp><rt>あめ</rt><rp>)</rp></ruby>が<ruby>降<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>る",
                    "old": "そう",
                    "new": "らしい",
                    "suffix": "です。",
                    "translation": "I heard it's going to rain tomorrow.",
                    "explanation": "そう (hearsay) and らしい both relay something you heard about the forecast — よう/みたい look similar but are based on your own impression, not hearsay, so they change the meaning here.",
                    "oldCore": "そう",
                    "newCore": "らしい",
                    "translationMn": "Маргааш бороо орно гэж сонссон.",
                    "explanationMn": "そう (сонсоод мэдсэн) болон らしい хоёулаа цаг агаарын урьдчилсан мэдээгээр сонссон зүйлийг дамжуулдаг — よう/みたい ижил төстэй харагдах ч сонссон зүйл дээр биш өөрийн сэтгэгдэл дээр суурилдаг тул энд утга нь өөрчлөгддөг."
                },
                {
                    "prefix": "<ruby>時間<rp>(</rp><rt>じかん</rt><rp>)</rp></ruby>がない",
                    "old": "から",
                    "new": "ので",
                    "suffix": "<ruby>急<rp>(</rp><rt>いそ</rt><rp>)</rp></ruby>ぎましょう。",
                    "translation": "Since we don't have time, let's hurry.",
                    "explanation": "から and ので both give a reason — ので just sounds a little more formal and objective than から.",
                    "oldCore": "から",
                    "newCore": "ので",
                    "translationMn": "Цаг байхгүй болохоор яарцгаая.",
                    "explanationMn": "から болон ので хоёулаа шалтгаан заадаг — ので нь から-гаас арай илүү албан ёсны, бодит сонстог."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>は<ruby>安<rp>(</rp><rt>やす</rt><rp>)</rp></ruby>い",
                    "old": "けど",
                    "new": "が",
                    "suffix": "、おいしいです。",
                    "translation": "This restaurant is cheap, but it's delicious.",
                    "explanation": "けど and が both connect two contrasting ideas — が is just the more formal, written version of the same but.",
                    "oldCore": "けど",
                    "newCore": "が",
                    "translationMn": "Энэ ресторан хямд ч амттай.",
                    "explanationMn": "けど болон が хоёулаа эсрэг санааг холбодог — が нь ижил \"гэхдээ\"-гийн албан ёсны, бичгийн хэлбэр юм."
                },
                {
                    "prefix": "<ruby>今日中<rp>(</rp><rt>きょうじゅう</rt><rp>)</rp></ruby>にこの<ruby>仕事<rp>(</rp><rt>しごと</rt><rp>)</rp></ruby>を<ruby>終<rp>(</rp><rt>お</rt><rp>)</rp></ruby>え",
                    "old": "なければなりません",
                    "new": "ないといけません",
                    "suffix": "。",
                    "translation": "I have to finish this work by the end of today.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation — ないといけない is just how it sounds in everyday conversation.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Энэ ажлыг өнөөдрийн дотор дуусгах ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа хатуу үүргийг илэрхийлдэг — ないといけない нь ердийн ярианы хэллэг юм."
                },
                {
                    "prefix": "ここに<ruby>座<rp>(</rp><rt>すわ</rt><rp>)</rp></ruby>っても",
                    "old": "いいです",
                    "new": "かまいません",
                    "suffix": "か。",
                    "translation": "Is it all right if I sit here?",
                    "explanation": "てもいい and てもかまわない both ask for permission — かまわない just reads as a little more polite.",
                    "oldCore": "てもいい",
                    "newCore": "てもかまわない",
                    "translationMn": "Энд суувал болох уу?",
                    "explanationMn": "てもいい болон てもかまわない хоёулаа зөвшөөрөл асуудаг — かまわない арай илүү эелдэг сонстог."
                },
                {
                    "prefix": "<ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby><ruby>晴<rp>(</rp><rt>は</rt><rp>)</rp></ruby>",
                    "old": "れたら",
                    "new": "れれば",
                    "suffix": "、<ruby>公園<rp>(</rp><rt>こうえん</rt><rp>)</rp></ruby>へ<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>きます。",
                    "translation": "If it's sunny tomorrow, I'll go to the park.",
                    "explanation": "たら and ば both set up a simple 'if' — for a one-time future condition like this, they're interchangeable.",
                    "oldCore": "たら",
                    "newCore": "ば",
                    "translationMn": "Маргааш нар гарвал би цэцэрлэгт хүрээлэнд явна.",
                    "explanationMn": "たら болон ば хоёулаа энгийн \"хэрэв\" нөхцөл тавьдаг — ирээдүйн нэг удаагийн нөхцөлийн хувьд эдгээрийг сольж хэрэглэж болно."
                },
                {
                    "prefix": "<ruby>日本語<rp>(</rp><rt>にほんご</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>話<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>すことができます",
                    "new": "<ruby>話<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>せます",
                    "suffix": "。",
                    "translation": "I can speak Japanese.",
                    "explanation": "〜ことができる and the plain potential form (話せる) both mean \"can do\" — the potential form is just the shorter, more natural way to say it.",
                    "oldCore": "ことができる",
                    "translationMn": "Би япон хэлээр ярьж чадна.",
                    "explanationMn": "〜ことができる болон энгийн боломжит хэлбэр (話せる) хоёулаа \"чадах\" гэсэн утгатай — боломжит хэлбэр нь илүү товч, байгалиар сонсогддог хэлбэр юм."
                },
                {
                    "prefix": "ここでたばこを",
                    "old": "<ruby>吸<rp>(</rp><rt>す</rt><rp>)</rp></ruby>ってはいけません",
                    "new": "<ruby>吸<rp>(</rp><rt>す</rt><rp>)</rp></ruby>わないでください",
                    "suffix": "。",
                    "translation": "You must not smoke here.",
                    "explanation": "てはいけない and ないでください both forbid something — ないでください phrases it as a request instead of a flat rule.",
                    "oldCore": "てはいけない",
                    "newCore": "ないでください",
                    "translationMn": "Энд тамхи татаж болохгүй.",
                    "explanationMn": "てはいけない болон ないでください хоёулаа хориглодог — ないでください нь тодорхой дүрэм биш хүсэлт хэлбэрээр илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>来<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>ない",
                    "old": "でしょう",
                    "new": "と<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>います",
                    "suffix": "。",
                    "translation": "He probably won't come.",
                    "explanation": "でしょう and と思います both soften a guess about the future — と思います frames it a bit more as the speaker’s own opinion.",
                    "oldCore": "でしょう",
                    "newCore": "とおもう",
                    "translationMn": "Тэр магадгүй ирэхгүй байх.",
                    "explanationMn": "でしょう болон と思います хоёулаа ирээдүйн таамаглалыг зөөлрүүлдэг — と思います нь илэрхийлэгчийн өөрийн санал бодол мэт арай илүү сонсогддог."
                },
                {
                    "prefix": "もっと<ruby>野菜<rp>(</rp><rt>やさい</rt><rp>)</rp></ruby>を<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べ",
                    "old": "たほうがいいです",
                    "new": "るべきです",
                    "suffix": "。",
                    "translation": "You should eat more vegetables.",
                    "explanation": "たほうがいい and べきだ both give advice — べきだ sounds a bit stronger, closer to an obligation than a suggestion.",
                    "oldCore": "たほうがいい",
                    "newCore": "べき",
                    "translationMn": "Та ногоо илүү идэх хэрэгтэй.",
                    "explanationMn": "たほうがいい болон べきだ хоёулаа зөвлөгөө өгдөг — べきだ нь санал бодлоос илүү үүрэгт ойрхон, арай хатуу сонсогддог."
                }
            ]
        },
        {
            "level": 2,
            "title": "Foundation · Level 2",
            "sentences": [
                {
                    "prefix": "<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>は<ruby>疲<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>れた",
                    "old": "し",
                    "new": "から",
                    "suffix": "、もう<ruby>寝<rp>(</rp><rt>ね</rt><rp>)</rp></ruby>ます。",
                    "translation": "I'm tired today, so I'm going to bed now.",
                    "explanation": "し and から can both introduce a reason for what follows — し just hints there could be more reasons left unsaid.",
                    "oldCore": "し",
                    "newCore": "から",
                    "translationMn": "Өнөөдөр ядарсан болохоор би одоо унтахаар явж байна.",
                    "explanationMn": "し болон から хоёулаа дараа орох шалтгааныг танилцуулдаг — し нь хэлээгүй өөр шалтгаанууд байж болзошгүйг л илэрхийлдэг."
                },
                {
                    "prefix": "この<ruby>漢字<rp>(</rp><rt>かんじ</rt><rp>)</rp></ruby>の<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>み<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>が",
                    "old": "わからないんです",
                    "new": "わかりません",
                    "suffix": "。",
                    "translation": "I don't know how to read this kanji.",
                    "explanation": "んです and plain ません both simply state the fact — んです just frames it as an explanation for something, which ません doesn't add.",
                    "oldCore": null,
                    "translationMn": "Энэ ханзыг хэрхэн уншихыг би мэдэхгүй байна.",
                    "explanationMn": "んです болон энгийн ません хоёулаа зүгээр л баримтыг илэрхийлдэг — んです нь тухайн зүйлийн тайлбар мэт өнгө оруулдаг бол ません үүнийг нэмэхгүй."
                },
                {
                    "prefix": "<ruby>宿題<rp>(</rp><rt>しゅくだい</rt><rp>)</rp></ruby>を",
                    "old": "やらなければなりません",
                    "new": "やらないといけません",
                    "suffix": "。",
                    "translation": "I have to do my homework.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation — ないといけない is just the more everyday, spoken version.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Би гэрийн даалгавраа хийх ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа хатуу үүргийг илэрхийлдэг — ないといけない нь өдөр тутмын ярианы хувилбар юм."
                },
                {
                    "prefix": "この<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>使<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>ってもいいです",
                    "new": "<ruby>使<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>ってもかまいません",
                    "suffix": "か。",
                    "translation": "Is it all right if I use this room?",
                    "explanation": "てもいい and てもかまわない both ask for permission — かまわない just reads as a touch more polite.",
                    "oldCore": "てもいい",
                    "newCore": "てもかまわない",
                    "translationMn": "Энэ өрөөг ашиглавал болох уу?",
                    "explanationMn": "てもいい болон てもかまわない хоёулаа зөвшөөрөл асуудаг — かまわない арай илүү эелдэг сонстог."
                },
                {
                    "prefix": "<ruby>安<rp>(</rp><rt>やす</rt><rp>)</rp></ruby>い",
                    "old": "けど",
                    "new": "が",
                    "suffix": "、あまり<ruby>丈夫<rp>(</rp><rt>じょうぶ</rt><rp>)</rp></ruby>じゃないです。",
                    "translation": "It's cheap, but it's not very sturdy.",
                    "explanation": "けど and が both connect two contrasting ideas — が is just the more formal, written version of the same but.",
                    "oldCore": "けど",
                    "newCore": "が",
                    "translationMn": "Хямд ч тийм бат биш.",
                    "explanationMn": "けど болон が хоёулаа эсрэг санааг холбодог — が нь ижил \"гэхдээ\"-гийн албан ёсны, бичгийн хэлбэр юм."
                },
                {
                    "prefix": "<ruby>電車<rp>(</rp><rt>でんしゃ</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>乗<rp>(</rp><rt>の</rt><rp>)</rp></ruby>っている<ruby>間<rp>(</rp><rt>あいだ</rt><rp>)</rp></ruby>",
                    "new": "<ruby>乗<rp>(</rp><rt>の</rt><rp>)</rp></ruby>っている<ruby>時<rp>(</rp><rt>とき</rt><rp>)</rp></ruby>",
                    "suffix": "、ずっと<ruby>音楽<rp>(</rp><rt>おんがく</rt><rp>)</rp></ruby>を<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>いていた。",
                    "translation": "While I was on the train, I listened to music the whole time.",
                    "explanation": "間 (あいだ) and 時 (とき) can both mark 'while/when' for an ongoing action — 間 just puts a bit more focus on the whole stretch of time.",
                    "oldCore": null,
                    "translationMn": "Галт тэрэгт сууж явахдаа би байнга хөгжим сонссон.",
                    "explanationMn": "間 (あいだ) болон 時 (とき) хоёулаа үргэлжилж буй үйлдлийн \"хэзээ/явцад\"-ыг заадаг — 間 нь цаг хугацааны бүхэл үргэлжлэл дээр арай илүү анхаарал хандуулдаг."
                },
                {
                    "prefix": "<ruby>危<rp>(</rp><rt>あぶ</rt><rp>)</rp></ruby>ないから、そこに<ruby>入<rp>(</rp><rt>はい</rt><rp>)</rp></ruby>っ",
                    "old": "てはいけません",
                    "new": "ないでください",
                    "suffix": "。",
                    "translation": "It's dangerous, so please don't go in there.",
                    "explanation": "てはいけない and ないでください both forbid something — ないでください phrases it as a request instead of a flat rule.",
                    "oldCore": "てはいけない",
                    "newCore": "ないでください",
                    "translationMn": "Аюултай тул тийшээ бүү ор.",
                    "explanationMn": "てはいけない болон ないでください хоёулаа хориглодог — ないでください нь тодорхой дүрэм биш хүсэлт хэлбэрээр илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby>までにレポートを",
                    "old": "<ruby>出<rp>(</rp><rt>だ</rt><rp>)</rp></ruby>さなければなりません",
                    "new": "<ruby>出<rp>(</rp><rt>だ</rt><rp>)</rp></ruby>さなくてはなりません",
                    "suffix": "。",
                    "translation": "I have to turn in the report by tomorrow.",
                    "explanation": "なければならない and なくてはならない are both strict-obligation forms of the same construction, just built on slightly different negative bases.",
                    "oldCore": "なければならない",
                    "newCore": null,
                    "translationMn": "Тайланг маргаашийн дотор өгөх ёстой.",
                    "explanationMn": "なければならない болон なくてはならない хоёулаа адилхан хатуу үүргийн хэлбэр бөгөөд зөвхөн бага зэрэг өөр үгүйсгэх суурин дээр бүтдэг."
                },
                {
                    "prefix": "この<ruby>薬<rp>(</rp><rt>くすり</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>飲<rp>(</rp><rt>の</rt><rp>)</rp></ruby>んだほうがいいです",
                    "new": "<ruby>飲<rp>(</rp><rt>の</rt><rp>)</rp></ruby>むべきです",
                    "suffix": "。",
                    "translation": "You should take this medicine.",
                    "explanation": "たほうがいい and べきだ both give advice — べきだ sounds a bit stronger, closer to an obligation than a suggestion.",
                    "oldCore": "たほうがいい",
                    "newCore": "べき",
                    "translationMn": "Та энэ эмийг уух хэрэгтэй.",
                    "explanationMn": "たほうがいい болон べきだ хоёулаа зөвлөгөө өгдөг — べきだ нь санал бодлоос илүү үүрэгт ойрхон, арай хатуу сонсогддог."
                },
                {
                    "prefix": "テストが<ruby>終<rp>(</rp><rt>お</rt><rp>)</rp></ruby>わっ",
                    "old": "たら",
                    "new": "たとき",
                    "suffix": "、<ruby>遊<rp>(</rp><rt>あそ</rt><rp>)</rp></ruby>びに<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>きましょう。",
                    "translation": "Once the test is over, let's go out and have some fun.",
                    "explanation": "たら and たとき can both mark 'once/when X finishes' for a one-time future event — たとき just states it a little more plainly, without たら's built-in 'if/once' framing.",
                    "oldCore": "たら",
                    "newCore": null,
                    "translationMn": "Шалгалт дуусмагц гарч зугаацъя.",
                    "explanationMn": "たら болон たとき хоёулаа ирээдүйн нэг удаагийн үйл явдлын \"X дуусмагц\"-ыг заадаг — たとき нь たら-гийн шингэсэн \"хэрэв/удалгүй\" гэсэн өнгөгүйгээр илүү энгийнээр илэрхийлдэг."
                }
            ]
        },
        {
            "level": 3,
            "title": "Foundation · Level 3",
            "sentences": [
                {
                    "prefix": "その<ruby>話<rp>(</rp><rt>はなし</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>本当<rp>(</rp><rt>ほんとう</rt><rp>)</rp></ruby>らしい",
                    "new": "<ruby>本当<rp>(</rp><rt>ほんとう</rt><rp>)</rp></ruby>だそうだ",
                    "suffix": "。",
                    "translation": "I heard that story is true.",
                    "explanation": "らしい and そうだ (hearsay) both relay something you heard secondhand — らしい can also add a light sense of the speaker's own guess.",
                    "oldCore": "らしい",
                    "newCore": "そう",
                    "translationMn": "Тэр түүх үнэн гэж сонссон.",
                    "explanationMn": "らしい болон そうだ (сонсоод мэдсэн) хоёулаа хоёрдогч эх сурвалжаас сонссон зүйлийг дамжуулдаг — らしい нь мөн илэрхийлэгчийн өөрийн таамаглалын өнгийг бага зэрэг нэмдэг."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>は<ruby>難<rp>(</rp><rt>むずか</rt><rp>)</rp></ruby>しい",
                    "old": "ので",
                    "new": "から",
                    "suffix": "、よく<ruby>考<rp>(</rp><rt>かんが</rt><rp>)</rp></ruby>えてください。",
                    "translation": "This problem is hard, so please think it through carefully.",
                    "explanation": "ので and から both give a reason — から is just the more casual, everyday version of the same connector.",
                    "oldCore": "ので",
                    "newCore": "から",
                    "translationMn": "Энэ бодлого хэцүү тул сайтар бодож үзээрэй.",
                    "explanationMn": "ので болон から хоёулаа шалтгаан заадаг — から нь илүү энгийн, өдөр тутмын хэрэглээний холбогч юм."
                },
                {
                    "prefix": "<ruby>週末<rp>(</rp><rt>しゅうまつ</rt><rp>)</rp></ruby>に<ruby>京都<rp>(</rp><rt>きょうと</rt><rp>)</rp></ruby>へ<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>く",
                    "old": "つもりです",
                    "new": "<ruby>予定<rp>(</rp><rt>よてい</rt><rp>)</rp></ruby>です",
                    "suffix": "。",
                    "translation": "I'm planning to go to Kyoto this weekend.",
                    "explanation": "つもりだ and 予定だ both describe a plan — 予定だ leans a bit more toward something already fixed on a schedule, while つもりだ is more of a personal intention.",
                    "oldCore": "つもり",
                    "newCore": null,
                    "translationMn": "Би энэ амралтын өдрүүдээр Киото руу явах төлөвтэй байна.",
                    "explanationMn": "つもりだ болон 予定だ хоёулаа төлөвлөгөөг илэрхийлдэг — 予定だ нь хуваарьт аль хэдийн тогтоогдсон зүйлд арай илүү дөхдөг бол つもりだ нь илүү хувийн зорилго юм."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>の<ruby>ラーメンは<rp>(</rp><rt></rt><rp>)</rp></ruby>とても",
                    "old": "<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べやすいです",
                    "new": "<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べにくくないです",
                    "suffix": "。",
                    "translation": "This shop's ramen is very easy to eat.",
                    "explanation": "食べやすい (easy to eat) and 食べにくくない (not hard to eat) end up describing the same thing from opposite directions, so in a plain statement like this they land on the same meaning.",
                    "oldCore": "やすい",
                    "newCore": null,
                    "translationMn": "Энэ дэлгүүрийн рамен идэхэд маш амархан.",
                    "explanationMn": "食べやすい (идэхэд амархан) болон 食べにくくない (идэхэд хэцүү биш) хоёулаа эсрэг талаас нь ижил зүйлийг тодорхойлдог тул ийм энгийн өгүүлбэрт ижил утгатай болдог."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>で<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>い",
                    "old": "<ruby>物<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>をしたことがあります",
                    "new": "<ruby>物<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>をした<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have shopped at this store before.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience' instead of the grammar pattern alone.",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ дэлгүүрт өмнө нь худалдаа хийж байсан.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь дүрмийн загвар дангаараа биш \"туршлага\" гэдэг үгээр санааг илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>会議<rp>(</rp><rt>かいぎ</rt><rp>)</rp></ruby>の<ruby>前<rp>(</rp><rt>まえ</rt><rp>)</rp></ruby>に、この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んでおいてください",
                    "new": "<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んでいてください",
                    "suffix": "。",
                    "translation": "Please have read this document before the meeting.",
                    "explanation": "ておく and casual spoken ている can both point at finishing a preparatory action ahead of time, though ておく is the clearer, more standard way to say it.",
                    "oldCore": "ておく",
                    "newCore": null,
                    "translationMn": "Хурлын өмнө энэ баримт бичгийг уншиж байгаарай.",
                    "explanationMn": "ておく болон ярианы ている хоёулаа урьдчилан бэлтгэх үйлдлийг дуусгасныг заах боломжтой ч ておく нь илүү тодорхой, стандарт хэллэг юм."
                },
                {
                    "prefix": "この<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んでみてください",
                    "new": "<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んでください",
                    "suffix": "。",
                    "translation": "Please try reading this book.",
                    "explanation": "てみる adds the nuance of 'try doing X' on top of a plain request — in a simple recommendation like this, dropping it still leaves basically the same request.",
                    "oldCore": "てみる",
                    "newCore": null,
                    "translationMn": "Энэ номыг уншиж үзээрэй.",
                    "explanationMn": "てみる нь энгийн хүсэлт дээр \"X-ийг оролдож үзэх\" гэсэн нюансыг нэмдэг — ийм энгийн зөвлөмжид үүнийг хассан ч бараг ижил хүсэлт хэвээр үлддэг."
                },
                {
                    "prefix": "<ruby>財布<rp>(</rp><rt>さいふ</rt><rp>)</rp></ruby>を",
                    "old": "なくしてしまいました",
                    "new": "なくしちゃいました",
                    "suffix": "。",
                    "translation": "I ended up losing my wallet.",
                    "explanation": "てしまう and its contracted spoken form ちゃう both add a sense of regret to a completed action — ちゃう is just the casual way people actually say it out loud.",
                    "oldCore": "てしまう",
                    "newCore": null,
                    "translationMn": "Би түрийвчээ гээчихлээ.",
                    "explanationMn": "てしまう болон түүний ярианы товчилсон хэлбэр ちゃう хоёулаа дууссан үйлдэлд харамсах өнгө нэмдэг — ちゃう нь хүмүүсийн жинхэнэ ярианд хэрэглэдэг энгийн хэллэг юм."
                },
                {
                    "prefix": "この<ruby>荷物<rp>(</rp><rt>にもつ</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>重<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>すぎます",
                    "new": "とても<ruby>重<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>いです",
                    "suffix": "。",
                    "translation": "This luggage is too heavy.",
                    "explanation": "すぎる marks something as excessive, and とても+adjective can land on nearly the same reading when the degree is clearly over the top, as it is here.",
                    "oldCore": "すぎる",
                    "newCore": null,
                    "translationMn": "Энэ ачаа хэтэрхий хүнд байна.",
                    "explanationMn": "すぎる нь хэт хэмжээг заадаг бол とても+тэмдэг нэр нь хэмжээ маш тод хэтэрхий байх үед бараг ижил утгад хүрдэг, энэ тохиолдолд яг тэгж байна."
                },
                {
                    "prefix": "<ruby>雨<rp>(</rp><rt>あめ</rt><rp>)</rp></ruby>が<ruby>降<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>っている",
                    "old": "ようだ",
                    "new": "みたいだ",
                    "suffix": "。",
                    "translation": "It seems to be raining.",
                    "explanation": "ようだ and みたいだ both mark an impression based on what you can see or hear — みたいだ is just the more casual, spoken version of ようだ.",
                    "oldCore": "よう",
                    "newCore": "みたい",
                    "translationMn": "Бороо орж байгаа юм шиг байна.",
                    "explanationMn": "ようだ болон みたいだ хоёулаа харсан, сонссон зүйл дээр суурилсан сэтгэгдлийг заадаг — みたいだ нь ようだ-ийн ярианы энгийн хувилбар юм."
                }
            ]
        },
        {
            "level": 4,
            "title": "Foundation · Level 4",
            "sentences": [
                {
                    "prefix": "<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>を<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>る",
                    "old": "まえに",
                    "new": "<ruby>前<rp>(</rp><rt>まえ</rt><rp>)</rp></ruby>に<ruby>必<rp>(</rp><rt>かなら</rt><rp>)</rp></ruby>ず<ruby>電気<rp>(</rp><rt>でんき</rt><rp>)</rp></ruby>を<ruby>消<rp>(</rp><rt>け</rt><rp>)</rp></ruby>して",
                    "suffix": "ください。",
                    "translation": "Before leaving the room, please always turn off the lights.",
                    "explanation": "This keeps the same まえに ('before doing X') pattern, just spelling 前 out in kanji with its reading instead of plain kana — same grammar, same meaning.",
                    "oldCore": null,
                    "translationMn": "Өрөөнөөс гарахын өмнө гэрлийг үргэлж унтраагаарай.",
                    "explanationMn": "Энэ нь ижил まえに (\"X хийхийн өмнө\") загварыг хадгалж, зөвхөн 前-ийг кана биш канжигаар уншлагатай нь бичсэн — ижил дүрэм, ижил утга."
                },
                {
                    "prefix": "<ruby>火事<rp>(</rp><rt>かじ</rt><rp>)</rp></ruby>にならない",
                    "old": "ために",
                    "new": "ように",
                    "suffix": "、ストーブを<ruby>消<rp>(</rp><rt>け</rt><rp>)</rp></ruby>してから<ruby>寝<rp>(</rp><rt>ね</rt><rp>)</rp></ruby>ます。",
                    "translation": "So that there isn't a fire, I turn off the heater before going to bed.",
                    "explanation": "ために and ように both express a goal or purpose — ように is the one that's used with a state you don't directly control, like 'not becoming a fire,' which is exactly this sentence's case.",
                    "oldCore": "ために",
                    "newCore": "ように",
                    "translationMn": "Гал гарахгүйн тулд би унтахынхаа өмнө халаагуурыг унтраадаг.",
                    "explanationMn": "ために болон ように хоёулаа зорилго, зорилгыг илэрхийлдэг — ように нь \"гал болохгүй байх\" гэх мэт чиглэлээ шууд удирдаж чадахгүй байдалтай хэрэглэгддэг ба энэ өгүүлбэрт яг тийм тохиолдол юм."
                },
                {
                    "prefix": "<ruby>来月<rp>(</rp><rt>らいげつ</rt><rp>)</rp></ruby>から、<ruby>毎朝<rp>(</rp><rt>まいあさ</rt><rp>)</rp></ruby><ruby>散歩<rp>(</rp><rt>さんぽ</rt><rp>)</rp></ruby>する",
                    "old": "ことにします",
                    "new": "ようにします",
                    "suffix": "。",
                    "translation": "Starting next month, I've decided to go for a walk every morning.",
                    "explanation": "ことにする and ようにする both describe a decision you're committing to — ようにする leans a little more toward an ongoing habit you're trying to keep up, which fits 'every morning' well here.",
                    "oldCore": "ことにする",
                    "newCore": "ようにする",
                    "translationMn": "Ирэх сараас эхлэн би өглөө бүр алхахаар шийдлээ.",
                    "explanationMn": "ことにする болон ようにする хоёулаа таны хийж буй шийдвэрийг илэрхийлдэг — ようにする нь тогтмол хадгалахыг оролдож буй зуршилд арай илүү дөхдөг бөгөөд энэ нь \"өглөө болгон\"-той сайн тохирч байна."
                },
                {
                    "prefix": "<ruby>毎日<rp>(</rp><rt>まいにち</rt><rp>)</rp></ruby><ruby>練習<rp>(</rp><rt>れんしゅう</rt><rp>)</rp></ruby>していたら、だんだん<ruby>上手<rp>(</rp><rt>じょうず</rt><rp>)</rp></ruby>に",
                    "old": "なってきた",
                    "new": "なっていった",
                    "suffix": "。",
                    "translation": "As I practiced every day, I gradually got better at it.",
                    "explanation": "てくる and ていく can both trace a gradual change over time — てくる frames it as leading up to now, ていく as continuing on, but for a change already described as 'gradual,' either reads naturally here.",
                    "oldCore": "てくる",
                    "newCore": "ていく",
                    "translationMn": "Өдөр бүр дасгал хийсээр аажмаар сайжирсан.",
                    "explanationMn": "てくる болон ていく хоёулаа цаг хугацааны дагуу аажим өөрчлөлтийг заадаг — てくる нь одоог хүртэл ирсэн, ていく нь үргэлжлэн явж буй байдлаар харуулдаг ч \"аажим\" гэж тодорхойлогдсон өөрчлөлтийн хувьд аль нь ч байгалиар сонсогдоно."
                },
                {
                    "prefix": "この<ruby>財布<rp>(</rp><rt>さいふ</rt><rp>)</rp></ruby>は",
                    "old": "たかいはずです",
                    "new": "たかいに<ruby>違<rp>(</rp><rt>ちが</rt><rp>)</rp></ruby>いありません",
                    "suffix": "。",
                    "translation": "This wallet must be expensive.",
                    "explanation": "はずだ and にちがいない both express strong confidence in a conclusion — にちがいない pushes that certainty even further, but both land as 'this has to be true' here.",
                    "oldCore": "はず",
                    "newCore": "にちがいない",
                    "translationMn": "Энэ түрийвч үнэтэй байх ёстой.",
                    "explanationMn": "はずだ болон にちがいない хоёулаа дүгнэлтэд итгэлтэй байдлыг илэрхийлдэг — にちがいない нь тэр итгэлийг улам чангатгадаг ч энд хоёул \"энэ үнэн байх ёстой\" гэсэн утгатай."
                },
                {
                    "prefix": "この<ruby>魚<rp>(</rp><rt>さかな</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>骨<rp>(</rp><rt>ほね</rt><rp>)</rp></ruby>が<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>くて<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べにくいです",
                    "new": "<ruby>骨<rp>(</rp><rt>ほね</rt><rp>)</rp></ruby>が<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>くて<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べづらいです",
                    "suffix": "。",
                    "translation": "This fish has a lot of bones, so it's hard to eat.",
                    "explanation": "にくい and づらい both mark something as physically or practically hard to do — づらい just leans slightly more toward personal difficulty than にくい's more general 'hard to do.'",
                    "oldCore": "にくい",
                    "newCore": null,
                    "translationMn": "Энэ загас яс ихтэй тул идэхэд хэцүү.",
                    "explanationMn": "にくい болон づらい хоёулаа биет буюу практикт хийхэд хэцүү зүйлийг заадаг — づらい нь にくい-ийн ерөнхий \"хийхэд хэцүү\"-гээс арай илүү хувийн бэрхшээлд дөхдөг."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>は<ruby>簡単<rp>(</rp><rt>かんたん</rt><rp>)</rp></ruby>",
                    "old": "すぎます",
                    "new": "すぎて<ruby>逆<rp>(</rp><rt>ぎゃく</rt><rp>)</rp></ruby>に<ruby>怪<rp>(</rp><rt>あや</rt><rp>)</rp></ruby>しいです",
                    "suffix": "。",
                    "translation": "This problem is too easy, which is exactly what makes it suspicious.",
                    "explanation": "Both use すぎる to mark 'too much' — the second version just continues the sentence with a result clause, but the underlined すぎる itself carries the identical meaning either way.",
                    "oldCore": "すぎる",
                    "newCore": null,
                    "translationMn": "Энэ бодлого хэтэрхий амархан, яг үүнд нь сэжиг төрж байна.",
                    "explanationMn": "Хоёул すぎる-ийг ашиглан \"хэт их\"-ийг заадаг — хоёр дахь хувилбар нь зөвхөн үр дагаврын өгүүлбэрээр үргэлжилдэг ч онцолсон すぎる өөрөө хоёуланд ижил утгатай хэвээр байна."
                },
                {
                    "prefix": "<ruby>宿題<rp>(</rp><rt>しゅくだい</rt><rp>)</rp></ruby>が<ruby>終<rp>(</rp><rt>お</rt><rp>)</rp></ruby>わる",
                    "old": "まで",
                    "new": "うちは",
                    "suffix": "、テレビを<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>てはいけません。",
                    "translation": "Until your homework is finished, you're not allowed to watch TV.",
                    "explanation": "まで and うちは can both mark 'for as long as this state continues' — うちは just puts a bit more focus on the ongoing state itself.",
                    "oldCore": null,
                    "translationMn": "Гэрийн даалгавраа дуустал телевиз үзэж болохгүй.",
                    "explanationMn": "まで болон うちは хоёулаа \"энэ байдал үргэлжилж байх хугацаанд\"-ыг заадаг — うちは нь үргэлжилж буй байдал дээр арай илүү анхаарал хандуулдаг."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>は",
                    "old": "たかいだけです",
                    "new": "たかいだけであって、おいしくないです",
                    "suffix": "。",
                    "translation": "This restaurant is just expensive — nothing more.",
                    "explanation": "だけ (just/only) and だけであって both narrow a statement down to a single fact — だけであって just adds a formal-sounding clause connector on top of the same 'only' meaning.",
                    "oldCore": null,
                    "translationMn": "Энэ ресторан зүгээр л үнэтэй, өөр юу ч биш.",
                    "explanationMn": "だけ (зөвхөн) болон だけであって хоёулаа мэдэгдлийг нэг баримт дээр төвлөрүүлдэг — だけであって нь ижил \"зөвхөн\"-гийн утга дээр албан ёсны сонстох холбогч нэмдэг."
                },
                {
                    "prefix": "この<ruby>説明書<rp>(</rp><rt>せつめいしょ</rt><rp>)</rp></ruby>に<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>いてある",
                    "old": "とおりに",
                    "new": "ように",
                    "suffix": "、<ruby>組<rp>(</rp><rt>く</rt><rp>)</rp></ruby>み<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>ててください。",
                    "translation": "Please assemble it just as written in the instructions.",
                    "explanation": "とおりに and ように can both mean 'in the way that X shows' when following an existing model to copy — とおりに sticks a little closer to 'exactly as' than ように's more general 'so as to.'",
                    "oldCore": null,
                    "translationMn": "Заавар дээр бичсэн шиг яг тэгж угсраарай.",
                    "explanationMn": "とおりに болон ように хоёулаа одоо байгаа загварыг дуурайлган дагахдаа \"X-ийн заасан хэлбэрээр\" гэсэн утгыг илэрхийлж болно — とおりに нь ように-ийн ерөнхий \"тийнхүү\"-гээс арай илүү \"яг л\"-д дөхдөг."
                }
            ]
        },
        {
            "level": 5,
            "title": "Foundation · Level 5",
            "sentences": [
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>は<ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby>までに<ruby>準備<rp>(</rp><rt>じゅんび</rt><rp>)</rp></ruby>して",
                    "old": "おかなければなりません",
                    "new": "おかないといけません",
                    "suffix": "。",
                    "translation": "I have to get this document ready by tomorrow.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation on top of ておく (getting something ready in advance) — ないといけない is just the everyday spoken version.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Энэ баримт бичгийг маргаашийн дотор бэлдэх ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа ておく (урьдчилан бэлтгэх) дээр хатуу үүргийг илэрхийлдэг — ないといけない нь өдөр тутмын ярианы хэлбэр юм."
                },
                {
                    "prefix": "<ruby>電車<rp>(</rp><rt>でんしゃ</rt><rp>)</rp></ruby>が<ruby>遅<rp>(</rp><rt>おく</rt><rp>)</rp></ruby>れた",
                    "old": "ので",
                    "new": "せいで",
                    "suffix": "、<ruby>会議<rp>(</rp><rt>かいぎ</rt><rp>)</rp></ruby>に<ruby>遅刻<rp>(</rp><rt>ちこく</rt><rp>)</rp></ruby>しました。",
                    "translation": "Because the train was late, I was late for the meeting.",
                    "explanation": "ので and せいで can both point to a cause — せいで adds the extra sense that the cause is to blame for something bad, which fits an unwanted delay like this one.",
                    "oldCore": "ので",
                    "newCore": null,
                    "translationMn": "Галт тэрэг оройтсон учир хуралд оройтлоо.",
                    "explanationMn": "ので болон せいで хоёулаа шалтгааныг заадаг — せいで нь тухайн шалтгааныг ямар нэг муу зүйлд буруутгах нэмэлт утга оруулдаг бөгөөд энэ нь хүсээгүй хоцролттой сайн тохирдог."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>で<ruby>働<rp>(</rp><rt>はたら</rt><rp>)</rp></ruby>いた",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have worked at this shop before.",
                    "explanation": "たことがある and 経験がある both point to a past experience — 経験がある just states it directly with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ дэлгүүрт өмнө нь ажиллаж байсан.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг заадаг — 経験がある нь \"туршлага\" гэдэг үгээр шууд илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>とても<ruby>忙<rp>(</rp><rt>いそが</rt><rp>)</rp></ruby>しい",
                    "old": "らしい",
                    "new": "ようだ",
                    "suffix": "。",
                    "translation": "He seems to be very busy right now.",
                    "explanation": "らしい and ようだ can both mark an inference — here らしい is based on something the speaker heard or noticed indirectly, and ようだ reads the same way once the sentence itself doesn't specify hearsay versus direct evidence.",
                    "oldCore": "らしい",
                    "newCore": "よう",
                    "translationMn": "Тэр яг одоо маш завгүй байгаа бололтой.",
                    "explanationMn": "らしい болон ようだ хоёулаа таамаглалыг заадаг — энд らしい нь илэрхийлэгчийн шууд бус сонссон эсвэл анзаарсан зүйл дээр суурилдаг бол ようだ нь өгүүлбэр сонсоод мэдсэн эсвэл шууд нотолгоог тодорхойлохгүй үед ижил утгатай болдог."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>は<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>には",
                    "old": "<ruby>難<rp>(</rp><rt>むずか</rt><rp>)</rp></ruby>しすぎます",
                    "new": "とても<ruby>難<rp>(</rp><rt>むずか</rt><rp>)</rp></ruby>しいです",
                    "suffix": "。",
                    "translation": "This problem is too difficult for me.",
                    "explanation": "すぎる marks something as over the top, and とても+adjective can read the same way once the degree is already clearly excessive, as 'too difficult for me' implies.",
                    "oldCore": "すぎる",
                    "newCore": null,
                    "translationMn": "Энэ бодлого надад хэтэрхий хэцүү байна.",
                    "explanationMn": "すぎる нь хэтэрхий их хэмжээг заадаг бол とても+тэмдэг нэр нь хэмжээ аль хэдийн тодорхой хэтэрсэн үед ижил утгатай уншигдана, \"надад хэтэрхий хэцүү\" гэдэг шиг."
                },
                {
                    "prefix": "<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>を<ruby>辞<rp>(</rp><rt>や</rt><rp>)</rp></ruby>める",
                    "old": "つもりです",
                    "new": "<ruby>予定<rp>(</rp><rt>よてい</rt><rp>)</rp></ruby>です",
                    "suffix": "。",
                    "translation": "I'm planning to quit my job.",
                    "explanation": "つもりだ and 予定だ both describe a plan — 予定だ leans toward something already set on a schedule, while つもりだ is more of a personal intention, close enough here that either reads naturally.",
                    "oldCore": "つもり",
                    "newCore": null,
                    "translationMn": "Би ажлаасаа гарах төлөвтэй байна.",
                    "explanationMn": "つもりだ болон 予定だ хоёулаа төлөвлөгөөг илэрхийлдэг — 予定だ нь хуваарьт аль хэдийн тогтсон зүйлд дөхдөг бол つもりだ нь илүү хувийн зорилго бөгөөд энд хоёул байгалиар уншигдахуйц ойролцоо байна."
                },
                {
                    "prefix": "パスポートを",
                    "old": "<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>っていかなければなりません",
                    "new": "<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>っていかなくてはなりません",
                    "suffix": "。",
                    "translation": "I have to bring my passport.",
                    "explanation": "なければならない and なくてはならない are both strict-obligation forms of the same construction, just built on slightly different negative bases.",
                    "oldCore": "なければならない",
                    "newCore": null,
                    "translationMn": "Би паспортоо авч ирэх ёстой.",
                    "explanationMn": "なければならない болон なくてはならない хоёулаа адилхан хатуу үүргийн хэлбэр бөгөөд зөвхөн бага зэрэг өөр үгүйсгэх суурин дээр бүтдэг."
                },
                {
                    "prefix": "<ruby>先生<rp>(</rp><rt>せんせい</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>いてみます",
                    "new": "<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>きます",
                    "suffix": "。",
                    "translation": "I'll try asking the teacher.",
                    "explanation": "てみる adds the nuance of 'try doing X' on top of a plain statement — dropping it here still leaves basically the same simple action, just without that exploratory feel.",
                    "oldCore": "てみる",
                    "newCore": null,
                    "translationMn": "Багшаас асууж үзье.",
                    "explanationMn": "てみる нь энгийн мэдэгдэл дээр \"X-ийг оролдож үзэх\" гэсэн нюансыг нэмдэг — үүнийг хассан ч бараг ижил энгийн үйлдэл хэвээр үлддэг, зөвхөн туршин үзэх мэдрэмжгүй."
                },
                {
                    "prefix": "この<ruby>ケーキは<rp>(</rp><rt></rt><rp>)</rp></ruby>とても",
                    "old": "<ruby>甘<rp>(</rp><rt>あま</rt><rp>)</rp></ruby>すぎます",
                    "new": "<ruby>甘<rp>(</rp><rt>あま</rt><rp>)</rp></ruby>ったるいです",
                    "suffix": "。",
                    "translation": "This cake is too sweet.",
                    "explanation": "すぎる marks something as excessive in general, while 甘ったるい is a set expression for cloyingly, sickly-sweet — in describing an overly sweet cake, both land on the same complaint.",
                    "oldCore": "すぎる",
                    "newCore": null,
                    "translationMn": "Энэ бялуу хэтэрхий чихэрлэг байна.",
                    "explanationMn": "すぎる нь ерөнхийдөө хэт ихийг заадаг бол 甘ったるい нь зэвүүн, дэндүү чихэрлэгийн тогтмол хэллэг юм — хэтэрхий чихэрлэг бялуу тайлбарлахад хоёул ижил гомдол болдог."
                },
                {
                    "prefix": "エレベーターが",
                    "old": "こわれているみたいです",
                    "new": "こわれているようです",
                    "suffix": "。",
                    "translation": "It seems like the elevator is broken.",
                    "explanation": "みたいだ and ようだ both mark an impression based on what you can see — みたいだ is just the more casual, spoken version of ようだ.",
                    "oldCore": "みたい",
                    "newCore": "よう",
                    "translationMn": "Лифт эвдэрсэн бололтой.",
                    "explanationMn": "みたいだ болон ようだ хоёулаа харсан зүйл дээр суурилсан сэтгэгдлийг заадаг — みたいだ нь ようだ-ийн ярианы энгийн хэлбэр юм."
                }
            ]
        },
        {
            "level": 6,
            "title": "Foundation · Level 6",
            "sentences": [
                {
                    "prefix": "<ruby>台風<rp>(</rp><rt>たいふう</rt><rp>)</rp></ruby>が<ruby>来<rp>(</rp><rt>く</rt><rp>)</rp></ruby>る",
                    "old": "らしい",
                    "new": "そうだ",
                    "suffix": "。",
                    "translation": "I heard a typhoon is coming.",
                    "explanation": "らしい and そうだ (hearsay) both relay something heard secondhand — らしい can also carry a bit of the speaker's own inference mixed in.",
                    "oldCore": "らしい",
                    "newCore": "そう",
                    "translationMn": "Тайфун ирж байгаа гэж сонссон.",
                    "explanationMn": "らしい болон そうだ (сонсоод мэдсэн) хоёулаа хоёрдогч эх сурвалжаас сонссон зүйлийг дамжуулдаг — らしい нь мөн илэрхийлэгчийн өөрийн таамаглалыг бага зэрэг холино."
                },
                {
                    "prefix": "<ruby>締<rp>(</rp><rt>し</rt><rp>)</rp></ruby>め<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>りが<ruby>近<rp>(</rp><rt>ちか</rt><rp>)</rp></ruby>い",
                    "old": "ので",
                    "new": "から",
                    "suffix": "、<ruby>急<rp>(</rp><rt>いそ</rt><rp>)</rp></ruby>いだほうがいいです。",
                    "translation": "The deadline is close, so it'd be better to hurry.",
                    "explanation": "ので and から both give a reason — から is just the more casual, everyday version of the same connector.",
                    "oldCore": "ので",
                    "newCore": "から",
                    "translationMn": "Эцсийн хугацаа ойртож байгаа тул яарсан нь дээр.",
                    "explanationMn": "ので болон から хоёулаа шалтгаан заадаг — から нь илүү энгийн, өдөр тутмын хэрэглээний холбогч юм."
                },
                {
                    "prefix": "この<ruby>紙<rp>(</rp><rt>かみ</rt><rp>)</rp></ruby>に<ruby>名前<rp>(</rp><rt>なまえ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>いておいてください",
                    "new": "<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>いておいてもらえますか",
                    "suffix": "。",
                    "translation": "Please write your name on this paper in advance.",
                    "explanation": "てください and てもらえますか are both ways to make a request — てもらえますか just softens it into a question, which reads more polite than a direct てください.",
                    "oldCore": null,
                    "translationMn": "Энэ цаасан дээр нэрээ урьдчилан бичээрэй.",
                    "explanationMn": "てください болон てもらえますか хоёулаа хүсэлт гаргах арга юм — てもらえますか нь асуулт болгон зөөлрүүлж, шууд てください-ээс илүү эелдэг сонстог."
                },
                {
                    "prefix": "<ruby>子供<rp>(</rp><rt>こども</rt><rp>)</rp></ruby>だけで<ruby>川<rp>(</rp><rt>かわ</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>ってはいけません",
                    "new": "<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>かないでください",
                    "suffix": "。",
                    "translation": "Please don't go to the river with just the kids.",
                    "explanation": "てはいけない and ないでください both forbid something — ないでください phrases it as a request instead of a flat rule.",
                    "oldCore": "てはいけない",
                    "newCore": "ないでください",
                    "translationMn": "Зөвхөн хүүхдүүдээ дагуулаад голд бүү яв.",
                    "explanationMn": "てはいけない болон ないでください хоёулаа хориглодог — ないでください нь тодорхой дүрэм биш хүсэлт хэлбэрээр илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>今夜<rp>(</rp><rt>こんや</rt><rp>)</rp></ruby>は<ruby>星<rp>(</rp><rt>ほし</rt><rp>)</rp></ruby>が<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>られる",
                    "old": "でしょう",
                    "new": "と<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>います",
                    "suffix": "。",
                    "translation": "I think we'll be able to see stars tonight.",
                    "explanation": "でしょう and と思います both soften a guess about the future — と思います frames it a bit more as the speaker's own opinion.",
                    "oldCore": "でしょう",
                    "newCore": "とおもう",
                    "translationMn": "Өнөө орой од харагдана гэж бодож байна.",
                    "explanationMn": "でしょう болон と思います хоёулаа ирээдүйн таамаглалыг зөөлрүүлдэг — と思います нь илэрхийлэгчийн өөрийн санал бодол мэт арай илүү сонсогддог."
                },
                {
                    "prefix": "この<ruby>肉<rp>(</rp><rt>にく</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>硬<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>すぎて<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べにくいです",
                    "new": "<ruby>硬<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>すぎて<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べづらいです",
                    "suffix": "。",
                    "translation": "This meat is too tough, so it's hard to eat.",
                    "explanation": "にくい and づらい both mark something as hard to do — づらい just leans slightly more toward personal difficulty than にくい's more general 'hard to do.'",
                    "oldCore": "にくい",
                    "newCore": null,
                    "translationMn": "Энэ мах хэтэрхий хатуу тул идэхэд хэцүү.",
                    "explanationMn": "にくい болон づらい хоёулаа хийхэд хэцүү зүйлийг заадаг — づらい нь にくい-ийн ерөнхий \"хийхэд хэцүү\"-гээс арай илүү хувийн бэрхшээлд дөхдөг."
                },
                {
                    "prefix": "<ruby>電気<rp>(</rp><rt>でんき</rt><rp>)</rp></ruby>を<ruby>消<rp>(</rp><rt>け</rt><rp>)</rp></ruby>し",
                    "old": "たまま",
                    "new": "た<ruby>状態<rp>(</rp><rt>じょうたい</rt><rp>)</rp></ruby>で",
                    "suffix": "<ruby>寝<rp>(</rp><rt>ね</rt><rp>)</rp></ruby>てしまった。",
                    "translation": "I ended up falling asleep with the light left off.",
                    "explanation": "まま and 状態で both describe an unchanged state carried into the next action — 状態で just says 'state' outright instead of relying on まま's grammar alone.",
                    "oldCore": "まま",
                    "newCore": null,
                    "translationMn": "Гэрлээ унтраасан хэвээр нойрсчихлоо.",
                    "explanationMn": "まま болон 状態で хоёулаа дараагийн үйлдэл рүү дамжсан өөрчлөгдөөгүй байдлыг заадаг — 状態で нь まま-ийн дүрмээс дангаараа биш \"байдал\" гэдгийг шууд хэлдэг."
                },
                {
                    "prefix": "この<ruby>スープは<rp>(</rp><rt></rt><rp>)</rp></ruby>",
                    "old": "<ruby>熱<rp>(</rp><rt>あつ</rt><rp>)</rp></ruby>すぎます",
                    "new": "とても<ruby>熱<rp>(</rp><rt>あつ</rt><rp>)</rp></ruby>いです",
                    "suffix": "。",
                    "translation": "This soup is too hot.",
                    "explanation": "すぎる marks something as excessive, and とても+adjective reads the same way once the degree described is already clearly over the top.",
                    "oldCore": "すぎる",
                    "newCore": null,
                    "translationMn": "Энэ шөл хэтэрхий халуун байна.",
                    "explanationMn": "すぎる нь хэт хэмжээг заадаг бол とても+тэмдэг нэр нь тодорхойлсон хэмжээ аль хэдийн тод хэтэрсэн үед ижил утгатай уншигдана."
                },
                {
                    "prefix": "<ruby>財布<rp>(</rp><rt>さいふ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>忘<rp>(</rp><rt>わす</rt><rp>)</rp></ruby>れないように<ruby>気<rp>(</rp><rt>き</rt><rp>)</rp></ruby>をつけてください",
                    "new": "<ruby>忘<rp>(</rp><rt>わす</rt><rp>)</rp></ruby>れないでください",
                    "suffix": "。",
                    "translation": "Please be careful not to forget your wallet.",
                    "explanation": "ように気をつける and plain ないでください both end up telling someone to avoid forgetting something — ように気をつける frames it as a caution to keep in mind rather than a flat instruction.",
                    "oldCore": null,
                    "translationMn": "Түрийвчээ мартахгүй байхыг анхаараарай.",
                    "explanationMn": "ように気をつける болон энгийн ないでください хоёулаа мартахгүй байхыг сануулдаг — ように気をつける нь тодорхой заавар биш анхаарах сэрэмжлүүлэг хэлбэрээр илэрхийлдэг."
                },
                {
                    "prefix": "その<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>は<ruby>先月<rp>(</rp><rt>せんげつ</rt><rp>)</rp></ruby><ruby>閉<rp>(</rp><rt>し</rt><rp>)</rp></ruby>まった",
                    "old": "ばかりです",
                    "new": "ところです",
                    "suffix": "。",
                    "translation": "That shop only just closed last month.",
                    "explanation": "たばかり and たところ both mark an action as having just finished — they're close enough here to swap freely for 'only just happened.'",
                    "oldCore": "ばかり",
                    "newCore": "ところ",
                    "translationMn": "Тэр дэлгүүр дөнгөж сүүлийн сард хаагдсан.",
                    "explanationMn": "たばかり болон たところ хоёулаа саяхан дуусгасан үйлдлийг заадаг — эдгээрийг \"дөнгөж болсон\" гэсэн утгаар чөлөөтэй солиж хэрэглэж болно."
                }
            ]
        },
        {
            "level": 7,
            "title": "Foundation · Level 7",
            "sentences": [
                {
                    "prefix": "<ruby>駅<rp>(</rp><rt>えき</rt><rp>)</rp></ruby>に<ruby>着<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>い",
                    "old": "たら",
                    "new": "た<ruby>時<rp>(</rp><rt>とき</rt><rp>)</rp></ruby>は",
                    "suffix": "、<ruby>電話<rp>(</rp><rt>でんわ</rt><rp>)</rp></ruby>してください。",
                    "translation": "Once you arrive at the station, please call me.",
                    "explanation": "たら and た時は can both mark 'once/when X happens' for a one-time future event — た時は just states it more plainly, without たら's built-in conditional framing.",
                    "oldCore": "たら",
                    "newCore": null,
                    "translationMn": "Буудалд ирмэгц надад залгаарай.",
                    "explanationMn": "たら болон た時は хоёулаа ирээдүйн нэг удаагийн үйл явдлын \"X болмогц\"-ыг заадаг — た時は нь たら-ийн шингэсэн нөхцлийн өнгөгүйгээр илүү энгийнээр илэрхийлдэг."
                },
                {
                    "prefix": "この<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>で<ruby>働<rp>(</rp><rt>はたら</rt><rp>)</rp></ruby>き",
                    "old": "はじめて<ruby>三年<rp>(</rp><rt>さんねん</rt><rp>)</rp></ruby>になります",
                    "new": "だして<ruby>三年<rp>(</rp><rt>さんねん</rt><rp>)</rp></ruby>になります",
                    "suffix": "。",
                    "translation": "It's been three years since I started working at this company.",
                    "explanation": "はじめる and だす can both attach to a verb stem to mean 'start doing X' — だす leans a bit more toward a sudden or noticeable start, but for stating how long you've worked somewhere, either reads naturally.",
                    "oldCore": null,
                    "translationMn": "Энэ компанид ажиллаж эхэлснээс хойш гурван жил боллоо.",
                    "explanationMn": "はじめる болон だす хоёулаа үйл үгийн язгуурт залгаж \"X хийж эхлэх\"-ийг заадаг — だす нь гэнэтийн буюу анзаарагдам эхлэлд арай илүү дөхдөг ч хэдэн жил ажилласнаа хэлэхэд аль нь ч байгалиар сонсогдоно."
                },
                {
                    "prefix": "<ruby>今度<rp>(</rp><rt>こんど</rt><rp>)</rp></ruby>の<ruby>試験<rp>(</rp><rt>しけん</rt><rp>)</rp></ruby>は<ruby>難<rp>(</rp><rt>むずか</rt><rp>)</rp></ruby>しい",
                    "old": "はずです",
                    "new": "に<ruby>違<rp>(</rp><rt>ちが</rt><rp>)</rp></ruby>いありません",
                    "suffix": "。",
                    "translation": "The next exam is bound to be difficult.",
                    "explanation": "はずだ and にちがいない both express strong confidence in a conclusion — にちがいない pushes that certainty a bit further, but both land as 'this has to be true' here.",
                    "oldCore": "はず",
                    "newCore": "にちがいない",
                    "translationMn": "Дараагийн шалгалт хэцүү байх нь гарцаагүй.",
                    "explanationMn": "はずだ болон にちがいない хоёулаа дүгнэлтэд итгэлтэй байдлыг илэрхийлдэг — にちがいない нь тэр итгэлийг бага зэрэг илүү чангатгадаг ч энд хоёул \"энэ үнэн байх ёстой\" гэсэн утгатай."
                },
                {
                    "prefix": "この<ruby>説明<rp>(</rp><rt>せつめい</rt><rp>)</rp></ruby>だけでは",
                    "old": "<ruby>分<rp>(</rp><rt>わ</rt><rp>)</rp></ruby>かりにくいです",
                    "new": "<ruby>分<rp>(</rp><rt>わ</rt><rp>)</rp></ruby>かりづらいです",
                    "suffix": "。",
                    "translation": "This explanation alone is hard to understand.",
                    "explanation": "にくい and づらい both mark something as hard to do — づらい just leans slightly more toward the listener's personal difficulty grasping it.",
                    "oldCore": "にくい",
                    "newCore": null,
                    "translationMn": "Зөвхөн энэ тайлбараар ойлгоход хэцүү.",
                    "explanationMn": "にくい болон づらい хоёулаа хийхэд хэцүү зүйлийг заадаг — づらい нь сонсогчийн ойлгоход учирсан хувийн бэрхшээлд арай илүү дөхдөг."
                },
                {
                    "prefix": "<ruby>雪<rp>(</rp><rt>ゆき</rt><rp>)</rp></ruby>が<ruby>降<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>っている",
                    "old": "みたいです",
                    "new": "ようです",
                    "suffix": "。",
                    "translation": "It looks like it's snowing.",
                    "explanation": "みたいだ and ようだ both mark an impression based on what you can see — みたいだ is just the more casual, spoken version of ようだ.",
                    "oldCore": "みたい",
                    "newCore": "よう",
                    "translationMn": "Цас орж байгаа бололтой.",
                    "explanationMn": "みたいだ болон ようだ хоёулаа харсан зүйл дээр суурилсан сэтгэгдлийг заадаг — みたいだ нь ようだ-ийн ярианы энгийн хэлбэр юм."
                },
                {
                    "prefix": "<ruby>朝<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby><ruby>早<rp>(</rp><rt>はや</rt><rp>)</rp></ruby>く<ruby>起<rp>(</rp><rt>お</rt><rp>)</rp></ruby>きる",
                    "old": "ようにしています",
                    "new": "ことにしています",
                    "suffix": "。",
                    "translation": "I make it a habit to wake up early.",
                    "explanation": "ようにする and ことにする both describe a habit or decision you're keeping up — ようにする usually leans toward an ongoing effort, but stated as a standing habit like this, ことにする reads the same way.",
                    "oldCore": "ようにする",
                    "newCore": "ことにする",
                    "translationMn": "Би эрт босохыг зуршил болгосон.",
                    "explanationMn": "ようにする болон ことにする хоёулаа хадгалж буй зуршил, шийдвэрийг заадаг — ようにする нь ихэвчлэн үргэлжилж буй хичээл зүтгэлд дөхдөг ч тогтмол зуршил хэлбэрээр илэрхийлэгдвэл ことにする ижил утгатай болдог."
                },
                {
                    "prefix": "<ruby>荷物<rp>(</rp><rt>にもつ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>運<rp>(</rp><rt>はこ</rt><rp>)</rp></ruby>んでもらえますか",
                    "new": "<ruby>運<rp>(</rp><rt>はこ</rt><rp>)</rp></ruby>んでいただけますか",
                    "suffix": "。",
                    "translation": "Could you carry this luggage for me?",
                    "explanation": "てもらえますか and ていただけますか both politely ask someone to do something — ていただけますか is just the more formal, humble version of the same request.",
                    "oldCore": null,
                    "translationMn": "Энэ ачааг надад зөөж өгөх боломжтой юу?",
                    "explanationMn": "てもらえますか болон ていただけますか хоёулаа хэн нэгнээс эелдэгээр хийхийг хүсдэг — ていただけますか нь ижил хүсэлтийн илүү албан ёсны, даруу хэлбэр юм."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>は<ruby>複雑<rp>(</rp><rt>ふくざつ</rt><rp>)</rp></ruby>",
                    "old": "すぎます",
                    "new": "すぎて、<ruby>誰<rp>(</rp><rt>だれ</rt><rp>)</rp></ruby>も<ruby>説明<rp>(</rp><rt>せつめい</rt><rp>)</rp></ruby>できません",
                    "suffix": "。",
                    "translation": "This problem is too complicated for anyone to explain.",
                    "explanation": "Both use すぎる to mark 'too much' — the second version just continues on with a result clause, but the underlined すぎる itself carries the identical meaning either way.",
                    "oldCore": "すぎる",
                    "newCore": null,
                    "translationMn": "Энэ асуудал хэтэрхий төвөгтэй тул хэн ч тайлбарлаж чадахгүй.",
                    "explanationMn": "Хоёул すぎる-ийг ашиглан \"хэт их\"-ийг заадаг — хоёр дахь хувилбар зөвхөн үр дагаврын өгүүлбэрээр үргэлжилдэг ч онцолсон すぎる өөрөө хоёуланд ижил утгатай."
                },
                {
                    "prefix": "<ruby>旅行<rp>(</rp><rt>りょこう</rt><rp>)</rp></ruby>の<ruby>間<rp>(</rp><rt>あいだ</rt><rp>)</rp></ruby>に、たくさん<ruby>写真<rp>(</rp><rt>しゃしん</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>撮<rp>(</rp><rt>と</rt><rp>)</rp></ruby>っておきました",
                    "new": "<ruby>撮<rp>(</rp><rt>と</rt><rp>)</rp></ruby>りました",
                    "suffix": "。",
                    "translation": "During the trip, I took a lot of photos.",
                    "explanation": "ておく adds the nuance of doing something in advance for later use, and dropping it here still leaves basically the same simple report of what happened.",
                    "oldCore": "ておく",
                    "newCore": null,
                    "translationMn": "Аялалын үеэр би маш олон зураг авсан.",
                    "explanationMn": "ておく нь дараа ашиглах зорилгоор урьдчилан хийх нюансыг нэмдэг, үүнийг хассан ч болсон явдлын бараг ижил энгийн мэдээлэл хэвээр үлддэг."
                },
                {
                    "prefix": "この<ruby>公園<rp>(</rp><rt>こうえん</rt><rp>)</rp></ruby>で<ruby>花見<rp>(</rp><rt>はなみ</rt><rp>)</rp></ruby>をした",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have done flower-viewing at this park before.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ цэцэрлэгт хүрээлэнд өмнө нь цэцэг үзэж байсан.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                }
            ]
        },
        {
            "level": 8,
            "title": "Foundation · Level 8",
            "sentences": [
                {
                    "prefix": "この<ruby>道<rp>(</rp><rt>みち</rt><rp>)</rp></ruby>は<ruby>夜<rp>(</rp><rt>よる</rt><rp>)</rp></ruby><ruby>危<rp>(</rp><rt>あぶ</rt><rp>)</rp></ruby>ない",
                    "old": "らしい",
                    "new": "そうだ",
                    "suffix": "。",
                    "translation": "I heard this road is dangerous at night.",
                    "explanation": "らしい and そうだ (hearsay) both relay something heard secondhand about this road — らしい can also carry a bit of the speaker's own inference.",
                    "oldCore": "らしい",
                    "newCore": "そう",
                    "translationMn": "Энэ зам шөнөөр аюултай гэж сонссон.",
                    "explanationMn": "らしい болон そうだ (сонсоод мэдсэн) хоёулаа энэ замын тухай хоёрдогчоор сонссон зүйлийг дамжуулдаг — らしい нь мөн илэрхийлэгчийн бага зэргийн таамаглалыг агуулж болно."
                },
                {
                    "prefix": "<ruby>体調<rp>(</rp><rt>たいちょう</rt><rp>)</rp></ruby>が<ruby>悪<rp>(</rp><rt>わる</rt><rp>)</rp></ruby>い",
                    "old": "ので",
                    "new": "せいで",
                    "suffix": "、<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>は<ruby>休<rp>(</rp><rt>やす</rt><rp>)</rp></ruby>みます。",
                    "translation": "Because I'm feeling unwell, I'm taking today off.",
                    "explanation": "ので and せいで can both point to a cause — せいで adds the extra sense that the cause is to blame for something unwanted, which fits feeling sick and missing work.",
                    "oldCore": "ので",
                    "newCore": null,
                    "translationMn": "Бие эвгүй байгаа тул би өнөөдөр амарч байна.",
                    "explanationMn": "ので болон せいで хоёулаа шалтгааныг заадаг — せいで нь тухайн шалтгааныг хүсээгүй зүйлд буруутгах нэмэлт утга оруулдаг бөгөөд энэ нь өвдөж ажилдаа ирээгүйтэй сайн тохирдог."
                },
                {
                    "prefix": "<ruby>今度<rp>(</rp><rt>こんど</rt><rp>)</rp></ruby>の<ruby>プロジェクトは<rp>(</rp><rt></rt><rp>)</rp></ruby><ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きく<ruby>変<rp>(</rp><rt>か</rt><rp>)</rp></ruby>わる",
                    "old": "はずです",
                    "new": "に<ruby>違<rp>(</rp><rt>ちが</rt><rp>)</rp></ruby>いありません",
                    "suffix": "。",
                    "translation": "The next project is bound to change significantly.",
                    "explanation": "はずだ and にちがいない both express strong confidence in a conclusion — にちがいない pushes that certainty a bit further, but both land as 'this has to be true' here.",
                    "oldCore": "はず",
                    "newCore": "にちがいない",
                    "translationMn": "Дараагийн төсөл ихээхэн өөрчлөгдөх нь гарцаагүй.",
                    "explanationMn": "はずだ болон にちがいない хоёулаа дүгнэлтэд итгэлтэй байдлыг илэрхийлдэг — にちがいない нь тэр итгэлийг бага зэрэг илүү чангатгадаг ч энд хоёул \"энэ үнэн байх ёстой\" гэсэн утгатай."
                },
                {
                    "prefix": "この<ruby>機械<rp>(</rp><rt>きかい</rt><rp>)</rp></ruby>の<ruby>使<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>い<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>は",
                    "old": "わかりにくいです",
                    "new": "わかりづらいです",
                    "suffix": "。",
                    "translation": "This machine's operation is hard to understand.",
                    "explanation": "にくい and づらい both mark something as hard to do — づらい just leans slightly more toward personal difficulty grasping it.",
                    "oldCore": "にくい",
                    "newCore": null,
                    "translationMn": "Энэ машины ажиллагааг ойлгоход хэцүү.",
                    "explanationMn": "にくい болон づらい хоёулаа хийхэд хэцүү зүйлийг заадаг — づらい нь ойлгоход учирсан хувийн бэрхшээлд арай илүү дөхдөг."
                },
                {
                    "prefix": "<ruby>友達<rp>(</rp><rt>ともだち</rt><rp>)</rp></ruby>が<ruby>来<rp>(</rp><rt>く</rt><rp>)</rp></ruby>る",
                    "old": "まえに",
                    "new": "<ruby>前<rp>(</rp><rt>まえ</rt><rp>)</rp></ruby>に<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>を<ruby>片付<rp>(</rp><rt>かたづ</rt><rp>)</rp></ruby>けて",
                    "suffix": "おきます。",
                    "translation": "Before my friend comes, I'll tidy up the room.",
                    "explanation": "This keeps the same まえに ('before doing X') pattern, just spelling 前 in kanji with its reading — same grammar, same meaning either way.",
                    "oldCore": null,
                    "translationMn": "Найз маань ирэхээс өмнө би өрөөгөө цэгцлэнэ.",
                    "explanationMn": "Энэ нь ижил まえに (\"X хийхийн өмнө\") загварыг хадгалж, зөвхөн 前-ийг канжигаар уншлагатай нь бичсэн — ижил дүрэм, ямар ч тохиолдолд ижил утга."
                },
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>を<ruby>今日中<rp>(</rp><rt>きょうじゅう</rt><rp>)</rp></ruby>に<ruby>仕上<rp>(</rp><rt>しあ</rt><rp>)</rp></ruby>げなく",
                    "old": "てはなりません",
                    "new": "てはいけません",
                    "suffix": "。",
                    "translation": "I have to finish this document today.",
                    "explanation": "なくてはならない and なくてはいけない are both strict-obligation forms built the same way — they're used interchangeably in everyday speech.",
                    "oldCore": null,
                    "translationMn": "Энэ баримт бичгийг өнөөдөр дуусгах ёстой.",
                    "explanationMn": "なくてはならない болон なくてはいけない хоёулаа ижил бүтэцтэй хатуу үүргийн хэлбэр юм — өдөр тутмын ярианд сольж хэрэглэгддэг."
                },
                {
                    "prefix": "<ruby>朝<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby>ご<ruby>飯<rp>(</rp><rt>はん</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べないで<ruby>学校<rp>(</rp><rt>がっこう</rt><rp>)</rp></ruby>に<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>ってしまいました",
                    "new": "<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べないで<ruby>学校<rp>(</rp><rt>がっこう</rt><rp>)</rp></ruby>に<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>っちゃいました",
                    "suffix": "。",
                    "translation": "I ended up going to school without eating breakfast.",
                    "explanation": "てしまう and its contracted spoken form ちゃう both add a sense of regret to a completed action — ちゃう is just the casual way people actually say it out loud.",
                    "oldCore": "てしまう",
                    "newCore": null,
                    "translationMn": "Өглөөний хоол идэлгүйгээр сургуульдаа явчихлаа.",
                    "explanationMn": "てしまう болон түүний ярианы товчилсон хэлбэр ちゃう хоёулаа дууссан үйлдэлд харамсах өнгө нэмдэг — ちゃう нь хүмүүсийн жинхэнэ ярианд хэрэглэдэг энгийн хэллэг юм."
                },
                {
                    "prefix": "この<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>は<ruby>子供<rp>(</rp><rt>こども</rt><rp>)</rp></ruby>には",
                    "old": "むずかしすぎます",
                    "new": "とてもむずかしいです",
                    "suffix": "。",
                    "translation": "This book is too difficult for children.",
                    "explanation": "すぎる marks something as excessive, and とても+adjective reads the same way once the degree described is already clearly over the top.",
                    "oldCore": "すぎる",
                    "newCore": null,
                    "translationMn": "Энэ ном хүүхдүүдэд хэтэрхий хэцүү байна.",
                    "explanationMn": "すぎる нь хэт хэмжээг заадаг бол とても+тэмдэг нэр нь тодорхойлсон хэмжээ аль хэдийн тод хэтэрсэн үед ижил утгатай уншигдана."
                },
                {
                    "prefix": "<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>、<ruby>駅<rp>(</rp><rt>えき</rt><rp>)</rp></ruby>に<ruby>着<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>いた",
                    "old": "ばかりです",
                    "new": "ところです",
                    "suffix": "。",
                    "translation": "I just arrived at the station.",
                    "explanation": "たばかり and たところ both mark an action as having just finished — they're close enough here to swap freely for 'only just happened.'",
                    "oldCore": "ばかり",
                    "newCore": "ところ",
                    "translationMn": "Би дөнгөж буудалд ирлээ.",
                    "explanationMn": "たばかり болон たところ хоёулаа саяхан дуусгасан үйлдлийг заадаг — эдгээрийг \"дөнгөж болсон\" гэсэн утгаар чөлөөтэй солиж хэрэглэж болно."
                },
                {
                    "prefix": "<ruby>来週<rp>(</rp><rt>らいしゅう</rt><rp>)</rp></ruby>から<ruby>毎日<rp>(</rp><rt>まいにち</rt><rp>)</rp></ruby><ruby>野菜<rp>(</rp><rt>やさい</rt><rp>)</rp></ruby>を<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べる",
                    "old": "ようにします",
                    "new": "ことにします",
                    "suffix": "。",
                    "translation": "Starting next week, I'll make it a point to eat vegetables every day.",
                    "explanation": "ようにする and ことにする both describe a habit or decision you're committing to — ようにする usually leans toward ongoing effort, but for a standing daily habit like this, ことにする reads the same way.",
                    "oldCore": "ようにする",
                    "newCore": "ことにする",
                    "translationMn": "Ирэх долоо хоногоос эхлэн би өдөр бүр ногоо идэхийг зуршил болгоно.",
                    "explanationMn": "ようにする болон ことにする хоёулаа баримталж буй зуршил, шийдвэрийг заадаг — ようにする ихэвчлэн үргэлжилж буй хичээл зүтгэлд дөхдөг ч ийм өдөр тутмын тогтмол зуршилд ことにする ижил утгатай болдог."
                }
            ]
        },
        {
            "level": 9,
            "title": "Foundation · Level 9",
            "sentences": [
                {
                    "prefix": "<ruby>隣<rp>(</rp><rt>となり</rt><rp>)</rp></ruby>の<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>から<ruby>音<rp>(</rp><rt>おと</rt><rp>)</rp></ruby>がする",
                    "old": "ので",
                    "new": "から",
                    "suffix": "、<ruby>誰<rp>(</rp><rt>だれ</rt><rp>)</rp></ruby>かいるはずです。",
                    "translation": "Since there's a sound coming from the next room, someone must be there.",
                    "explanation": "ので and から both give a reason — から is just the more casual, everyday version of the same connector.",
                    "oldCore": "ので",
                    "newCore": "から",
                    "translationMn": "Хажуу өрөөнөөс чимээ гарч байгаа тул тэнд хэн нэгэн байх нь гарцаагүй.",
                    "explanationMn": "ので болон から хоёулаа шалтгаан заадаг — から нь илүү энгийн, өдөр тутмын хэрэглээний холбогч юм."
                },
                {
                    "prefix": "この<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んでみたら、とても<ruby>面白<rp>(</rp><rt>おもしろ</rt><rp>)</rp></ruby>かったです",
                    "new": "<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んだら、とても<ruby>面白<rp>(</rp><rt>おもしろ</rt><rp>)</rp></ruby>かったです",
                    "suffix": "。",
                    "translation": "When I read this book, it was very interesting.",
                    "explanation": "てみる adds the nuance of 'try doing X' on top of a plain action — once you're reporting the result, dropping it still leaves basically the same statement.",
                    "oldCore": "てみる",
                    "newCore": null,
                    "translationMn": "Энэ номыг уншихад маш сонирхолтой байсан.",
                    "explanationMn": "てみる нь энгийн үйлдэл дээр \"X-ийг оролдож үзэх\" гэсэн нюансыг нэмдэг — үр дүнг мэдээлж байгаа тохиолдолд үүнийг хассан ч бараг ижил өгүүлбэр хэвээр үлддэг."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>の<ruby>答<rp>(</rp><rt>こた</rt><rp>)</rp></ruby>え<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>が",
                    "old": "わかりにくいです",
                    "new": "わかりづらいです",
                    "suffix": "。",
                    "translation": "How to answer this question is hard to understand.",
                    "explanation": "にくい and づらい both mark something as hard to do — づらい just leans slightly more toward personal difficulty.",
                    "oldCore": "にくい",
                    "newCore": null,
                    "translationMn": "Энэ асуултад хэрхэн хариулахыг ойлгоход хэцүү.",
                    "explanationMn": "にくい болон づらい хоёулаа хийхэд хэцүү зүйлийг заадаг — づらい нь хувийн бэрхшээлд арай илүү дөхдөг."
                },
                {
                    "prefix": "<ruby>今夜<rp>(</rp><rt>こんや</rt><rp>)</rp></ruby>は<ruby>雨<rp>(</rp><rt>あめ</rt><rp>)</rp></ruby>が<ruby>降<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>る",
                    "old": "でしょう",
                    "new": "と<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>います",
                    "suffix": "。",
                    "translation": "I think it will rain tonight.",
                    "explanation": "でしょう and と思います both soften a guess about the future — と思います frames it a bit more as the speaker's own opinion.",
                    "oldCore": "でしょう",
                    "newCore": "とおもう",
                    "translationMn": "Өнөө орой бороо орно гэж бодож байна.",
                    "explanationMn": "でしょう болон と思います хоёулаа ирээдүйн таамаглалыг зөөлрүүлдэг — と思います нь илэрхийлэгчийн өөрийн санал бодол мэт арай илүү сонсогддог."
                },
                {
                    "prefix": "<ruby>今度<rp>(</rp><rt>こんど</rt><rp>)</rp></ruby>のテストは、あの<ruby>先生<rp>(</rp><rt>せんせい</rt><rp>)</rp></ruby>が<ruby>作<rp>(</rp><rt>つく</rt><rp>)</rp></ruby>った",
                    "old": "だけあって",
                    "new": "だけに",
                    "suffix": "、とても<ruby>難<rp>(</rp><rt>むずか</rt><rp>)</rp></ruby>しかった。",
                    "translation": "Since it's a test made by that teacher, it was very difficult, as you'd expect.",
                    "explanation": "だけあって and だけに both draw a natural conclusion from a known fact — だけに just leans a little more toward a written or formal register than the more conversational だけあって.",
                    "oldCore": null,
                    "translationMn": "Тэр багшийн зохиосон шалгалт учраас, төсөөлж байсанчлан маш хэцүү байсан.",
                    "explanationMn": "だけあって болон だけに хоёулаа мэдэгдэж буй баримтаас байгалийн дүгнэлт гаргадаг — だけに нь харилцан ярианы だけあって-гээс арай илүү бичгийн, албан ёсны хэв маягт дөхдөг."
                },
                {
                    "prefix": "この<ruby>会議室<rp>(</rp><rt>かいぎしつ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>使<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>ってはいけません",
                    "new": "<ruby>使<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>わないでください",
                    "suffix": "。",
                    "translation": "Please don't use this meeting room.",
                    "explanation": "てはいけない and ないでください both forbid something — ないでください phrases it as a request instead of a flat rule.",
                    "oldCore": "てはいけない",
                    "newCore": "ないでください",
                    "translationMn": "Энэ хурлын өрөөг бүү ашигла.",
                    "explanationMn": "てはいけない болон ないでください хоёулаа хориглодог — ないでください нь тодорхой дүрэм биш хүсэлт хэлбэрээр илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>掃除<rp>(</rp><rt>そうじ</rt><rp>)</rp></ruby>をし",
                    "old": "<ruby>終<rp>(</rp><rt>お</rt><rp>)</rp></ruby>わったところです",
                    "new": "<ruby>終<rp>(</rp><rt>お</rt><rp>)</rp></ruby>わったばかりです",
                    "suffix": "。",
                    "translation": "I just finished cleaning.",
                    "explanation": "たところ and たばかり both mark an action as having just finished — they're close enough here to swap freely.",
                    "oldCore": "ところ",
                    "newCore": "ばかり",
                    "translationMn": "Би дөнгөж цэвэрлэгээгээ дуусгалаа.",
                    "explanationMn": "たところ болон たばかり хоёулаа саяхан дуусгасан үйлдлийг заадаг — эдгээрийг чөлөөтэй солиж хэрэглэж болохоор ойролцоо юм."
                },
                {
                    "prefix": "この<ruby>荷物<rp>(</rp><rt>にもつ</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>重<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>すぎて<ruby>一人<rp>(</rp><rt>ひとり</rt><rp>)</rp></ruby>では<ruby>運<rp>(</rp><rt>はこ</rt><rp>)</rp></ruby>べません",
                    "new": "とても<ruby>重<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>くて<ruby>一人<rp>(</rp><rt>ひとり</rt><rp>)</rp></ruby>では<ruby>運<rp>(</rp><rt>はこ</rt><rp>)</rp></ruby>べません",
                    "suffix": "。",
                    "translation": "This luggage is too heavy for one person to carry.",
                    "explanation": "すぎる marks something as excessive, and とても+adjective reads the same way once the degree described is already clearly over the top.",
                    "oldCore": "すぎる",
                    "newCore": null,
                    "translationMn": "Энэ ачаа нэг хүн зөөхөд хэтэрхий хүнд байна.",
                    "explanationMn": "すぎる нь хэт хэмжээг заадаг бол とても+тэмдэг нэр нь тодорхойлсон хэмжээ аль хэдийн тод хэтэрсэн үед ижил утгатай уншигдана."
                },
                {
                    "prefix": "この<ruby>公園<rp>(</rp><rt>こうえん</rt><rp>)</rp></ruby>に<ruby>来<rp>(</rp><rt>き</rt><rp>)</rp></ruby>た",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have come to this park before.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ цэцэрлэгт хүрээлэнд өмнө нь ирж байсан.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>空<rp>(</rp><rt>そら</rt><rp>)</rp></ruby>が<ruby>暗<rp>(</rp><rt>くら</rt><rp>)</rp></ruby>くなってきた。もうすぐ<ruby>雨<rp>(</rp><rt>あめ</rt><rp>)</rp></ruby>が<ruby>降<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>り",
                    "old": "そうです",
                    "new": "そうな<ruby>天気<rp>(</rp><rt>てんき</rt><rp>)</rp></ruby>です",
                    "suffix": "。",
                    "translation": "The sky has gotten dark. It looks like it's about to rain soon.",
                    "explanation": "This keeps the same appearance-そう pattern (based on how the sky looks right now) either way — the second version just names it as 'weather that looks like rain' instead of stopping at そうです.",
                    "oldCore": "そう",
                    "newCore": null,
                    "translationMn": "Тэнгэр харанхуйлж эхэллээ. Удахгүй бороо орох бололтой.",
                    "explanationMn": "Энэ нь ижил харагдах байдлын そう загварыг (одоо тэнгэрийн харагдах байдал дээр суурилсан) хадгалж байна — хоёр дахь хувилбар зөвхөн そうです дээр зогсохгүй \"бороо орох мэт цаг агаар\" гэж нэрлэдэг."
                }
            ]
        },
        {
            "level": 10,
            "title": "Foundation · Level 10",
            "sentences": [
                {
                    "prefix": "その<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>は<ruby>来年<rp>(</rp><rt>らいねん</rt><rp>)</rp></ruby><ruby>倒産<rp>(</rp><rt>とうさん</rt><rp>)</rp></ruby>する",
                    "old": "らしい",
                    "new": "という<ruby>話<rp>(</rp><rt>はなし</rt><rp>)</rp></ruby>だ",
                    "suffix": "。",
                    "translation": "I heard that company is going to go bankrupt next year.",
                    "explanation": "らしい and という話だ both relay something heard secondhand — という話だ just spells out 'that's the story I heard' more explicitly than らしい's single suffix.",
                    "oldCore": "らしい",
                    "newCore": null,
                    "translationMn": "Тэр компани ирэх жил дампуурна гэж сонссон.",
                    "explanationMn": "らしい болон という話だ хоёулаа хоёрдогчоор сонссон зүйлийг дамжуулдаг — という話だ нь らしい-ийн дан дагаваргаас илүү тодорхой \"тэр бол миний сонссон түүх\" гэж хэлдэг."
                },
                {
                    "prefix": "<ruby>今回<rp>(</rp><rt>こんかい</rt><rp>)</rp></ruby>の<ruby>失敗<rp>(</rp><rt>しっぱい</rt><rp>)</rp></ruby>は<ruby>準備<rp>(</rp><rt>じゅんび</rt><rp>)</rp></ruby>が<ruby>足<rp>(</rp><rt>た</rt><rp>)</rp></ruby>りなかった",
                    "old": "せいです",
                    "new": "からです",
                    "suffix": "。",
                    "translation": "This time's failure was because preparation wasn't enough.",
                    "explanation": "せいで(す) and からです can both point to a cause — せいで adds the extra sense that the cause is to blame for something bad, which fits a failure like this.",
                    "oldCore": null,
                    "translationMn": "Энэ удаагийн бүтэлгүйтэл нь бэлтгэл хангалтгүй байсны улмаас юм.",
                    "explanationMn": "せいで(す) болон からです хоёулаа шалтгааныг заадаг — せいで нь тухайн шалтгааныг муу зүйлд буруутгах нэмэлт утга оруулдаг бөгөөд энэ нь ийм бүтэлгүйтэлтэй сайн тохирдог."
                },
                {
                    "prefix": "<ruby>今度<rp>(</rp><rt>こんど</rt><rp>)</rp></ruby>のコンサートは<ruby>人気歌手<rp>(</rp><rt>にんきかしゅ</rt><rp>)</rp></ruby>が<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>る",
                    "old": "だけあって",
                    "new": "だけに",
                    "suffix": "、チケットがすぐ<ruby>売<rp>(</rp><rt>う</rt><rp>)</rp></ruby>り<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>れた。",
                    "translation": "Since a popular singer is performing at this concert, the tickets sold out right away, as you'd expect.",
                    "explanation": "だけあって and だけに both draw a natural conclusion from a known fact — だけに just leans a little more toward a written or formal register.",
                    "oldCore": null,
                    "translationMn": "Энэ концертод алдартай дуучин тоглох учраас тасалбар шууд дуусахад, төсөөлж байсанчлан гайхах зүйлгүй.",
                    "explanationMn": "だけあって болон だけに хоёулаа мэдэгдэж буй баримтаас байгалийн дүгнэлт гаргадаг — だけに нь бичгийн, албан ёсны хэв маягт арай илүү дөхдөг."
                },
                {
                    "prefix": "この<ruby>説明<rp>(</rp><rt>せつめい</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>いたら、すぐわかりました",
                    "new": "<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>くと、すぐわかりました",
                    "suffix": "。",
                    "translation": "When I heard this explanation, I understood right away.",
                    "explanation": "たら and と can both mark 'when X happened, Y followed' for a single completed event — と is just the plainer, more matter-of-fact way to connect the two.",
                    "oldCore": "たら",
                    "newCore": "と",
                    "translationMn": "Энэ тайлбарыг сонсоод шууд ойлголоо.",
                    "explanationMn": "たら болон と хоёулаа нэг удаагийн дууссан үйл явдлын \"X болоход Y дагав\"-ыг заадаг — と нь хоёрыг холбох илүү энгийн, бодит холбогч юм."
                },
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>は<ruby>会議<rp>(</rp><rt>かいぎ</rt><rp>)</rp></ruby>までに",
                    "old": "<ruby>準備<rp>(</rp><rt>じゅんび</rt><rp>)</rp></ruby>しておかなければなりません",
                    "new": "<ruby>準備<rp>(</rp><rt>じゅんび</rt><rp>)</rp></ruby>しておかないといけません",
                    "suffix": "。",
                    "translation": "This document has to be ready before the meeting.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation — ないといけない is just the everyday spoken version.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Энэ баримт бичиг хурлын өмнө бэлэн байх ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа хатуу үүргийг илэрхийлдэг — ないといけない нь өдөр тутмын ярианы хэлбэр юм."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>の<ruby>ラーメンは<rp>(</rp><rt></rt><rp>)</rp></ruby>",
                    "old": "からすぎます",
                    "new": "とても<ruby>辛<rp>(</rp><rt>から</rt><rp>)</rp></ruby>いです",
                    "suffix": "。",
                    "translation": "This shop's ramen is too spicy.",
                    "explanation": "すぎる marks something as excessive, and とても+adjective reads the same way once the degree is already clearly over the top.",
                    "oldCore": "すぎる",
                    "newCore": null,
                    "translationMn": "Энэ дэлгүүрийн рамен хэтэрхий халуун ногоотой байна.",
                    "explanationMn": "すぎる нь хэт хэмжээг заадаг бол とても+тэмдэг нэр нь хэмжээ аль хэдийн тод хэтэрсэн үед ижил утгатай уншигдана."
                },
                {
                    "prefix": "<ruby>忙<rp>(</rp><rt>いそが</rt><rp>)</rp></ruby>しいから、その<ruby>会議<rp>(</rp><rt>かいぎ</rt><rp>)</rp></ruby>には",
                    "old": "<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>られそうにありません",
                    "new": "<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>られそうもありません",
                    "suffix": "。",
                    "translation": "I'm busy, so it doesn't look like I'll be able to attend that meeting.",
                    "explanation": "そうにない and そうもない are both ways to say 'it doesn't look like X will happen' — they're used interchangeably with no real difference in meaning.",
                    "oldCore": null,
                    "translationMn": "Би завгүй тул тэр хуралд оролцож чадахгүй бололтой.",
                    "explanationMn": "そうにない болон そうもない хоёулаа \"X болохгүй бололтой\" гэж хэлэх арга юм — утгын хувьд ялгаагүй сольж хэрэглэгддэг."
                },
                {
                    "prefix": "この<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>で<ruby>三年間<rp>(</rp><rt>さんねんかん</rt><rp>)</rp></ruby><ruby>働<rp>(</rp><rt>はたら</rt><rp>)</rp></ruby>いた",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have three years of experience working at this company.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ компанид гурван жил ажилласан туршлагатай.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>電車<rp>(</rp><rt>でんしゃ</rt><rp>)</rp></ruby>が<ruby>止<rp>(</rp><rt>と</rt><rp>)</rp></ruby>まっている",
                    "old": "みたいだ",
                    "new": "ようだ",
                    "suffix": "。",
                    "translation": "It looks like the train has stopped.",
                    "explanation": "みたいだ and ようだ both mark an impression based on what you can see — みたいだ is just the more casual, spoken version of ようだ.",
                    "oldCore": "みたい",
                    "newCore": "よう",
                    "translationMn": "Галт тэрэг зогссон бололтой.",
                    "explanationMn": "みたいだ болон ようだ хоёулаа харсан зүйл дээр суурилсан сэтгэгдлийг заадаг — みたいだ нь ようだ-ийн ярианы энгийн хэлбэр юм."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>を<ruby>解<rp>(</rp><rt>と</rt><rp>)</rp></ruby>くには、まず<ruby>公式<rp>(</rp><rt>こうしき</rt><rp>)</rp></ruby>を<ruby>覚<rp>(</rp><rt>おぼ</rt><rp>)</rp></ruby>え",
                    "old": "なければなりません",
                    "new": "なくてはなりません",
                    "suffix": "。",
                    "translation": "To solve this problem, you first have to memorize the formula.",
                    "explanation": "なければならない and なくてはならない are both strict-obligation forms of the same construction, just built on slightly different negative bases.",
                    "oldCore": "なければならない",
                    "newCore": null,
                    "translationMn": "Энэ бодлогыг бодохын тулд эхлээд томьёог цээжлэх ёстой.",
                    "explanationMn": "なければならない болон なくてはならない хоёулаа адилхан хатуу үүргийн хэлбэр бөгөөд зөвхөн бага зэрэг өөр үгүйсгэх суурин дээр бүтдэг."
                }
            ]
        },
        {
            "level": 11,
            "title": "Foundation · Level 11",
            "sentences": [
                {
                    "prefix": "この<ruby>地域<rp>(</rp><rt>ちいき</rt><rp>)</rp></ruby>は<ruby>昔<rp>(</rp><rt>むかし</rt><rp>)</rp></ruby>、<ruby>海<rp>(</rp><rt>うみ</rt><rp>)</rp></ruby>だった",
                    "old": "らしい",
                    "new": "そうだ",
                    "suffix": "。",
                    "translation": "I heard this area used to be the sea long ago.",
                    "explanation": "らしい and そうだ (hearsay) both relay something heard secondhand — らしい can also carry a bit of the speaker's own inference from evidence like fossils or old maps.",
                    "oldCore": "らしい",
                    "newCore": "そう",
                    "translationMn": "Энэ газар эрт дээр үед тэнгис байсан гэж сонссон.",
                    "explanationMn": "らしい болон そうだ (сонсоод мэдсэн) хоёулаа хоёрдогчоор сонссон зүйлийг дамжуулдаг — らしい нь чулуужсан үлдэгдэл, хуучин газрын зураг зэрэг нотолгооноос гаргасан илэрхийлэгчийн таамаглалыг бага зэрэг агуулж болно."
                },
                {
                    "prefix": "<ruby>台風<rp>(</rp><rt>たいふう</rt><rp>)</rp></ruby>の<ruby>影響<rp>(</rp><rt>えいきょう</rt><rp>)</rp></ruby>で<ruby>電車<rp>(</rp><rt>でんしゃ</rt><rp>)</rp></ruby>が<ruby>止<rp>(</rp><rt>と</rt><rp>)</rp></ruby>まった",
                    "old": "せいで",
                    "new": "ため",
                    "suffix": "、<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>に<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>けなかった。",
                    "translation": "Because the trains stopped due to the typhoon, I couldn't get to work.",
                    "explanation": "せいで and ため can both mark a cause behind an unwanted result — ため is a more neutral way to state the same cause-and-effect that せいで states with a hint of blame.",
                    "oldCore": null,
                    "translationMn": "Тайфуны улмаас галт тэрэг зогссон тул ажилдаа очиж чадсангүй.",
                    "explanationMn": "せいで болон ため хоёулаа хүсээгүй үр дүнгийн ард буй шалтгааныг заадаг — ため нь せいで-ийн буруутгах өнгөтэй ижил шалтгаан-үр дагаврыг илүү төвийг сахисан байдлаар илэрхийлдэг."
                },
                {
                    "prefix": "この<ruby>作家<rp>(</rp><rt>さっか</rt><rp>)</rp></ruby>の<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>は<ruby>難<rp>(</rp><rt>むずか</rt><rp>)</rp></ruby>しいことで<ruby>有名<rp>(</rp><rt>ゆうめい</rt><rp>)</rp></ruby>な",
                    "old": "だけあって",
                    "new": "だけに",
                    "suffix": "、なかなか<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>み<ruby>終<rp>(</rp><rt>お</rt><rp>)</rp></ruby>わらなかった。",
                    "translation": "Since this author's books are famously difficult, it took a long time to finish reading, as you'd expect.",
                    "explanation": "だけあって and だけに both draw a natural conclusion from a known fact — だけに just leans a little more toward a written or formal register.",
                    "oldCore": null,
                    "translationMn": "Энэ зохиолчийн номууд хэцүүгээрээ алдартай учраас, төсөөлж байсанчлан уншиж дуусгахад удаж билээ.",
                    "explanationMn": "だけあって болон だけに хоёулаа мэдэгдэж буй баримтаас байгалийн дүгнэлт гаргадаг — だけに нь бичгийн, албан ёсны хэв маягт арай илүү дөхдөг."
                },
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>を<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>る",
                    "old": "<ruby>限<rp>(</rp><rt>かぎ</rt><rp>)</rp></ruby>り",
                    "new": "<ruby>範囲<rp>(</rp><rt>はんい</rt><rp>)</rp></ruby>では",
                    "suffix": "、<ruby>売上<rp>(</rp><rt>うりあげ</rt><rp>)</rp></ruby>は<ruby>順調<rp>(</rp><rt>じゅんちょう</rt><rp>)</rp></ruby>です。",
                    "translation": "As far as this document shows, sales are going smoothly.",
                    "explanation": "限り and 範囲では both limit a claim to what's actually known or visible — 範囲では spells out 'within this range' more plainly than 限り's single grammar word.",
                    "oldCore": null,
                    "translationMn": "Энэ баримт бичгээс харахад борлуулалт сайн явж байна.",
                    "explanationMn": "限り болон 範囲では хоёулаа мэдэгдлийг бодитоор мэдэгдэж буй, харагдаж буй зүйлээр хязгаарладаг — 範囲では нь 限り-ийн дан дүрмийн үгээс илүү тодорхой \"энэ хүрээнд\" гэж хэлдэг."
                },
                {
                    "prefix": "<ruby>今回<rp>(</rp><rt>こんかい</rt><rp>)</rp></ruby>のプロジェクトが<ruby>成功<rp>(</rp><rt>せいこう</rt><rp>)</rp></ruby>した",
                    "old": "のは、チーム<ruby>全員<rp>(</rp><rt>ぜんいん</rt><rp>)</rp></ruby>の<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>のおかげです",
                    "new": "のは、チーム<ruby>全員<rp>(</rp><rt>ぜんいん</rt><rp>)</rp></ruby>が<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>したからです",
                    "suffix": "。",
                    "translation": "The reason this project succeeded is thanks to the whole team's effort.",
                    "explanation": "おかげで and からです can both credit a cause behind a good outcome — おかげで leans specifically toward gratitude for that cause, which still comes through in this praise-filled sentence.",
                    "oldCore": null,
                    "translationMn": "Энэ төсөл амжилттай болсны шалтгаан нь бүхэл бүтэн багийн хүчин чармайлтын ачаар юм.",
                    "explanationMn": "おかげで болон からです хоёулаа сайн үр дүнгийн ард буй шалтгаанд талархал илэрхийлж болно — おかげで нь тухайлбал тэр шалтгаанд талархахад дөхдөг бөгөөд энэ нь магтаал дүүрэн энэ өгүүлбэрт мэдрэгдэж байна."
                },
                {
                    "prefix": "<ruby>締<rp>(</rp><rt>し</rt><rp>)</rp></ruby>め<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>りに<ruby>間<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>に<ruby>合<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>わせるため、<ruby>徹夜<rp>(</rp><rt>てつや</rt><rp>)</rp></ruby>し",
                    "old": "なければなりませんでした",
                    "new": "ないわけにはいきませんでした",
                    "suffix": "。",
                    "translation": "To make the deadline, I had no choice but to stay up all night.",
                    "explanation": "なければならない and ないわけにはいかない both express that there was no way around doing something — ないわけにはいかない adds a stronger sense that circumstances left no real choice.",
                    "oldCore": "なければならない",
                    "newCore": null,
                    "translationMn": "Эцсийн хугацаанд багтахын тулд бүтэн шөнөжин сэрүүн байхаас өөр аргагүй байлаа.",
                    "explanationMn": "なければならない болон ないわけにはいかない хоёулаа ямар нэг зүйлийг хийхээс өөр аргагүй байсныг илэрхийлдэг — ないわけにはいかない нь нөхцөл байдал жинхэнэ сонголтгүй үлдээсэн гэдгийг илүү хүчтэй мэдрэмжээр илэрхийлдэг."
                },
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>は<ruby>専門用語<rp>(</rp><rt>せんもんようご</rt><rp>)</rp></ruby>が<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>くて",
                    "old": "わかりにくいです",
                    "new": "わかりづらいです",
                    "suffix": "。",
                    "translation": "This document has a lot of technical terms, so it's hard to understand.",
                    "explanation": "にくい and づらい both mark something as hard to do — づらい just leans slightly more toward personal difficulty grasping it.",
                    "oldCore": "にくい",
                    "newCore": null,
                    "translationMn": "Энэ баримт бичигт техникийн нэр томьёо их байгаа тул ойлгоход хэцүү.",
                    "explanationMn": "にくい болон づらい хоёулаа хийхэд хэцүү зүйлийг заадаг — づらい нь ойлгоход учирсан хувийн бэрхшээлд арай илүү дөхдөг."
                },
                {
                    "prefix": "この<ruby>予算<rp>(</rp><rt>よさん</rt><rp>)</rp></ruby>では、<ruby>新<rp>(</rp><rt>あたら</rt><rp>)</rp></ruby>しい<ruby>機械<rp>(</rp><rt>きかい</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>うことができません",
                    "new": "<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>えません",
                    "suffix": "。",
                    "translation": "With this budget, we can't buy new machinery.",
                    "explanation": "〜ことができる and the plain potential form (買える) both mean 'can do' — the potential form is just the shorter, more natural way to say it.",
                    "oldCore": "ことができる",
                    "newCore": null,
                    "translationMn": "Энэ төсвөөр шинэ тоног төхөөрөмж худалдаж авах боломжгүй.",
                    "explanationMn": "〜ことができる болон энгийн боломжит хэлбэр (買える) хоёулаа \"чадах\" гэсэн утгатай — боломжит хэлбэр нь илүү товч, байгалиар сонсогддог хэлбэр юм."
                },
                {
                    "prefix": "この<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>を<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>る",
                    "old": "かぎり",
                    "new": "と",
                    "suffix": "、<ruby>今回<rp>(</rp><rt>こんかい</rt><rp>)</rp></ruby>の<ruby>実験<rp>(</rp><rt>じっけん</rt><rp>)</rp></ruby>は<ruby>成功<rp>(</rp><rt>せいこう</rt><rp>)</rp></ruby>だと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>えます。",
                    "translation": "Looking at these results, this experiment can be called a success.",
                    "explanation": "かぎり and plain と can both introduce 'based on/when you look at X' before a conclusion — と is the more neutral, everyday way to make the same kind of connection.",
                    "oldCore": null,
                    "translationMn": "Эдгээр үр дүнг харахад энэ туршилтыг амжилттай гэж хэлж болно.",
                    "explanationMn": "かぎり болон энгийн と хоёулаа дүгнэлтийн өмнө \"X-ийг харахад/дэнд суурилан\"-ыг танилцуулж болно — と нь ижил төрлийн холболтыг хийх илүү төвийг сахисан, өдөр тутмын арга юм."
                },
                {
                    "prefix": "この<ruby>取引先<rp>(</rp><rt>とりひきさき</rt><rp>)</rp></ruby>とは<ruby>長<rp>(</rp><rt>なが</rt><rp>)</rp></ruby>く<ruby>仕事<rp>(</rp><rt>しごと</rt><rp>)</rp></ruby>をしてきた",
                    "old": "だけに",
                    "new": "だけあって",
                    "suffix": "、お<ruby>互<rp>(</rp><rt>たが</rt><rp>)</rp></ruby>いによく<ruby>理解<rp>(</rp><rt>りかい</rt><rp>)</rp></ruby>し<ruby>合<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>っています。",
                    "translation": "Since we've worked with this client for a long time, we understand each other well, as you'd expect.",
                    "explanation": "だけに and だけあって both draw a natural conclusion from a known fact — だけあって is just the more conversational register of the same connector.",
                    "oldCore": null,
                    "translationMn": "Энэ үйлчлүүлэгчтэй удаан хугацаанд хамтран ажилласан учраас, төсөөлж байсанчлан бие биенээ сайн ойлгодог.",
                    "explanationMn": "だけに болон だけあって хоёулаа мэдэгдэж буй баримтаас байгалийн дүгнэлт гаргадаг — だけあって нь ижил холбогчийн илүү харилцан ярианы хэв маяг юм."
                }
            ]
        },
        {
            "level": 12,
            "title": "Foundation · Level 12",
            "sentences": [
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>最近<rp>(</rp><rt>さいきん</rt><rp>)</rp></ruby>、<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>を<ruby>辞<rp>(</rp><rt>や</rt><rp>)</rp></ruby>める",
                    "old": "らしい",
                    "new": "そうだ",
                    "suffix": "。",
                    "translation": "I heard he's going to quit the company soon.",
                    "explanation": "らしい and そうだ (hearsay) both relay something heard secondhand — らしい can also carry a bit of the speaker's own inference mixed in.",
                    "oldCore": "らしい",
                    "newCore": "そう",
                    "translationMn": "Тэр удахгүй компаниасаа гарна гэж сонссон.",
                    "explanationMn": "らしい болон そうだ (сонсоод мэдсэн) хоёулаа хоёрдогч эх сурвалжаас сонссон зүйлийг дамжуулдаг — らしい нь мөн илэрхийлэгчийн өөрийн таамаглалыг бага зэрэг холино."
                },
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>を<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んだ",
                    "old": "<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>、<ruby>問題点<rp>(</rp><rt>もんだいてん</rt><rp>)</rp></ruby>がわかった",
                    "new": "ところ、<ruby>問題点<rp>(</rp><rt>もんだいてん</rt><rp>)</rp></ruby>がわかった",
                    "suffix": "。",
                    "translation": "As a result of reading this document, I found the problem.",
                    "explanation": "結果 and ところ can both mark 'as a result of doing X, Y happened' — ところ just states the discovery a little more plainly, without 結果's explicit 'as a result' framing.",
                    "oldCore": null,
                    "translationMn": "Энэ баримт бичгийг уншсаны үр дүнд асуудлыг олж мэдлээ.",
                    "explanationMn": "結果 болон ところ хоёулаа \"X хийсний үр дүнд Y болов\"-ыг заадаг — ところ нь 結果-ийн тодорхой \"үр дүнд\" гэсэн өнгөгүйгээр нээлтийг илүү энгийнээр илэрхийлдэг."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>は<ruby>値段<rp>(</rp><rt>ねだん</rt><rp>)</rp></ruby>が<ruby>高<rp>(</rp><rt>たか</rt><rp>)</rp></ruby>い",
                    "old": "だけに",
                    "new": "だけあって",
                    "suffix": "、サービスも<ruby>素晴<rp>(</rp><rt>すば</rt><rp>)</rp></ruby>らしい。",
                    "translation": "Since this shop is expensive, the service is wonderful too, as you'd expect.",
                    "explanation": "だけに and だけあって both draw a natural conclusion from a known fact — だけあって is the more conversational register of the same connector.",
                    "oldCore": null,
                    "translationMn": "Энэ дэлгүүр үнэтэй учраас, төсөөлж байсанчлан үйлчилгээ нь ч гайхалтай.",
                    "explanationMn": "だけに болон だけあって хоёулаа мэдэгдэж буй баримтаас байгалийн дүгнэлт гаргадаг — だけあって нь ижил холбогчийн харилцан ярианы хэв маяг юм."
                },
                {
                    "prefix": "<ruby>周<rp>(</rp><rt>まわ</rt><rp>)</rp></ruby>りの<ruby>意見<rp>(</rp><rt>いけん</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>関係<rp>(</rp><rt>かんけい</rt><rp>)</rp></ruby>なく、<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby>のやり<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>を<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>けた",
                    "new": "<ruby>左右<rp>(</rp><rt>さゆう</rt><rp>)</rp></ruby>されず、<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby>のやり<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>を<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>けた",
                    "suffix": "。",
                    "translation": "Without being swayed by the opinions around him, he kept doing things his own way.",
                    "explanation": "に関係なく and に左右されず both express 'regardless of X' — 左右されず leans specifically on 'not being influenced,' which fits opinions swaying someone's choices.",
                    "oldCore": null,
                    "translationMn": "Тэр эргэн тойрных нь санал бодолд автахгүйгээр өөрийн замаар үргэлжлүүлсээр байв.",
                    "explanationMn": "に関係なく болон に左右されず хоёулаа \"X-ээс үл хамааран\"-ыг илэрхийлдэг — 左右されず нь тодорхойлбол \"нөлөөлөгдөхгүй\"-д дөхдөг бөгөөд энэ нь хэн нэгний сонголтыг хазайлгах саналтай сайн тохирдог."
                },
                {
                    "prefix": "<ruby>台風<rp>(</rp><rt>たいふう</rt><rp>)</rp></ruby>が<ruby>近<rp>(</rp><rt>ちか</rt><rp>)</rp></ruby>づいている",
                    "old": "ので",
                    "new": "ため",
                    "suffix": "、イベントは<ruby>中止<rp>(</rp><rt>ちゅうし</rt><rp>)</rp></ruby>になった。",
                    "translation": "Because a typhoon is approaching, the event was canceled.",
                    "explanation": "ので and ため can both give a reason — ため is a slightly more formal, written way to state the same cause.",
                    "oldCore": "ので",
                    "newCore": null,
                    "translationMn": "Тайфун ойртож байгаа учир арга хэмжээг цуцаллаа.",
                    "explanationMn": "ので болон ため хоёулаа шалтгаан заадаг — ため нь ижил шалтгааныг илэрхийлэх арай илүү албан ёсны, бичгийн арга юм."
                },
                {
                    "prefix": "この<ruby>薬<rp>(</rp><rt>くすり</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>飲<rp>(</rp><rt>の</rt><rp>)</rp></ruby>まなければなりません",
                    "new": "<ruby>飲<rp>(</rp><rt>の</rt><rp>)</rp></ruby>まないといけません",
                    "suffix": "。",
                    "translation": "You have to take this medicine.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation — ないといけない is just the everyday spoken version.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Та энэ эмийг уух ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа хатуу үүргийг илэрхийлдэг — ないといけない нь өдөр тутмын ярианы хэлбэр юм."
                },
                {
                    "prefix": "<ruby>子供<rp>(</rp><rt>こども</rt><rp>)</rp></ruby>の",
                    "old": "<ruby>成長<rp>(</rp><rt>せいちょう</rt><rp>)</rp></ruby>にしたがって、<ruby>親<rp>(</rp><rt>おや</rt><rp>)</rp></ruby>との<ruby>会話<rp>(</rp><rt>かいわ</rt><rp>)</rp></ruby>が<ruby>減<rp>(</rp><rt>へ</rt><rp>)</rp></ruby>っていった",
                    "new": "<ruby>成長<rp>(</rp><rt>せいちょう</rt><rp>)</rp></ruby>につれて、<ruby>親<rp>(</rp><rt>おや</rt><rp>)</rp></ruby>との<ruby>会話<rp>(</rp><rt>かいわ</rt><rp>)</rp></ruby>が<ruby>減<rp>(</rp><rt>へ</rt><rp>)</rp></ruby>っていった",
                    "suffix": "。",
                    "translation": "As the child grew up, conversation with the parents decreased.",
                    "explanation": "にしたがって and につれて both mark 'as X changes, Y changes along with it' — they're standard, interchangeable partners for describing two things progressing together.",
                    "oldCore": null,
                    "translationMn": "Хүүхэд өсөх тусам эцэг эхтэйгээ ярилцах нь цөөрчээ.",
                    "explanationMn": "にしたがって болон につれて хоёулаа \"X өөрчлөгдөхөд Y ч хамт өөрчлөгддөг\"-ийг заадаг — эдгээр нь хоёр зүйл хамт хөгжиж буйг тодорхойлох стандарт, сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "この<ruby>橋<rp>(</rp><rt>はし</rt><rp>)</rp></ruby>は<ruby>古<rp>(</rp><rt>ふる</rt><rp>)</rp></ruby>くて",
                    "old": "<ruby>渡<rp>(</rp><rt>わた</rt><rp>)</rp></ruby>るのが<ruby>危険<rp>(</rp><rt>きけん</rt><rp>)</rp></ruby>そうです",
                    "new": "<ruby>渡<rp>(</rp><rt>わた</rt><rp>)</rp></ruby>るのが<ruby>危険<rp>(</rp><rt>きけん</rt><rp>)</rp></ruby>らしいです",
                    "suffix": "。",
                    "translation": "This bridge is old, and it looks dangerous to cross.",
                    "explanation": "appearance-そう and らしい can both express an impression here, though そう leans on visible signs (like the bridge's condition) while らしい leans a bit more toward something heard — in a plain observation like this, either lands close to the same meaning.",
                    "oldCore": "そう",
                    "newCore": "らしい",
                    "translationMn": "Энэ гүүр хуучин бөгөөд гатлахад аюултай харагдаж байна.",
                    "explanationMn": "харагдах байдлын そう болон らしい хоёулаа энд сэтгэгдлийг илэрхийлж болно, гэхдээ そう нь харагдах шинж тэмдэг дээр (гүүрний байдал шиг) дөхдөг бол らしい нь сонссон зүйлд арай илүү дөхдөг — ийм энгийн ажиглалтад аль нь ч бараг ижил утгад хүрдэг."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>は<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>には",
                    "old": "<ruby>解<rp>(</rp><rt>と</rt><rp>)</rp></ruby>けそうにありません",
                    "new": "<ruby>解<rp>(</rp><rt>と</rt><rp>)</rp></ruby>けそうもありません",
                    "suffix": "。",
                    "translation": "It doesn't look like I'll be able to solve this problem.",
                    "explanation": "そうにない and そうもない are both ways to say 'it doesn't look like X will happen' — they're used interchangeably with no real difference in meaning.",
                    "oldCore": null,
                    "translationMn": "Энэ бодлогыг бодож чадахгүй бололтой.",
                    "explanationMn": "そうにない болон そうもない хоёулаа \"X болохгүй бололтой\" гэж хэлэх арга юм — утгын хувьд ялгаагүй сольж хэрэглэгддэг."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>で<ruby>働<rp>(</rp><rt>はたら</rt><rp>)</rp></ruby>いた",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have work experience at this shop.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ дэлгүүрт ажилласан туршлагатай.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                }
            ]
        },
        {
            "level": 13,
            "title": "Foundation · Level 13",
            "sentences": [
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>の<ruby>料理<rp>(</rp><rt>りょうり</rt><rp>)</rp></ruby>は",
                    "old": "おいしいと<ruby>評判<rp>(</rp><rt>ひょうばん</rt><rp>)</rp></ruby>だ",
                    "new": "おいしいという<ruby>話<rp>(</rp><rt>はなし</rt><rp>)</rp></ruby>だ",
                    "suffix": "。",
                    "translation": "This restaurant's food has a reputation for being delicious.",
                    "explanation": "と評判だ and という話だ both relay a reputation or thing people say — という話だ states it a bit more plainly as 'that's what I've heard,' but the meaning lands the same.",
                    "oldCore": null,
                    "translationMn": "Энэ рестораны хоол амттай гэдгээрээ алдартай.",
                    "explanationMn": "と評判だ болон という話だ хоёулаа нэр хүнд буюу хүмүүсийн ярьдаг зүйлийг дамжуулдаг — という話だ нь \"тэр бол миний сонссон зүйл\" гэж арай илүү энгийнээр хэлдэг ч утга нь ижил байдаг."
                },
                {
                    "prefix": "この<ruby>説明書<rp>(</rp><rt>せつめいしょ</rt><rp>)</rp></ruby>に<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>いてある",
                    "old": "とおりに",
                    "new": "ように",
                    "suffix": "<ruby>操作<rp>(</rp><rt>そうさ</rt><rp>)</rp></ruby>してください。",
                    "translation": "Please operate it exactly as written in the instructions.",
                    "explanation": "とおりに and ように can both mean 'in the way that X shows' when following an existing model — とおりに sticks a little closer to 'exactly as' than ように's broader 'so as to.'",
                    "oldCore": null,
                    "translationMn": "Зааварт бичсэн шиг яг тэгж ажиллуулаарай.",
                    "explanationMn": "とおりに болон ように хоёулаа одоо байгаа загварыг дагахдаа \"X-ийн заасан хэлбэрээр\" гэсэн утгыг илэрхийлж болно — とおりに нь ように-ийн өргөн \"тийнхүү\"-гээс арай илүү \"яг л\"-д дөхдөг."
                },
                {
                    "prefix": "<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>から<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>けば、まだ<ruby>間<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>に<ruby>合<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>う",
                    "old": "はずです",
                    "new": "に<ruby>違<rp>(</rp><rt>ちが</rt><rp>)</rp></ruby>いありません",
                    "suffix": "。",
                    "translation": "If we leave now, we should still be able to make it in time.",
                    "explanation": "はずだ and にちがいない both express strong confidence in a conclusion — にちがいない pushes that certainty a bit further, but both land as 'this has to be true' here.",
                    "oldCore": "はず",
                    "newCore": "にちがいない",
                    "translationMn": "Одоо гарвал бид цаг барих ёстой.",
                    "explanationMn": "はずだ болон にちがいない хоёулаа дүгнэлтэд итгэлтэй байдлыг илэрхийлдэг — にちがいない нь тэр итгэлийг бага зэрэг илүү чангатгадаг ч энд хоёул \"энэ үнэн байх ёстой\" гэсэн утгатай."
                },
                {
                    "prefix": "<ruby>子供<rp>(</rp><rt>こども</rt><rp>)</rp></ruby>が",
                    "old": "<ruby>寝<rp>(</rp><rt>ね</rt><rp>)</rp></ruby>ているうちに、<ruby>掃除<rp>(</rp><rt>そうじ</rt><rp>)</rp></ruby>をすませた",
                    "new": "<ruby>寝<rp>(</rp><rt>ね</rt><rp>)</rp></ruby>ている<ruby>間<rp>(</rp><rt>あいだ</rt><rp>)</rp></ruby>に、<ruby>掃除<rp>(</rp><rt>そうじ</rt><rp>)</rp></ruby>をすませた",
                    "suffix": "。",
                    "translation": "While the child was asleep, I finished the cleaning.",
                    "explanation": "うちに and 間に both mark 'while this temporary state lasts' before it ends — here, with a clear start-and-end nap, either reads as the same window of time.",
                    "oldCore": "うちに",
                    "newCore": "あいだに",
                    "translationMn": "Хүүхэд унтаж байх зуур би цэвэрлэгээгээ дуусгасан.",
                    "explanationMn": "うちに болон 間に хоёулаа энэ түр зуурын байдал дуусахаас өмнөх \"явцад\"-ыг заадаг — энд тодорхой эхлэл, төгсгөлтэй нойрны хувьд аль нь ч ижил цаг хугацааны цонх мэт уншигдана."
                },
                {
                    "prefix": "この<ruby>地域<rp>(</rp><rt>ちいき</rt><rp>)</rp></ruby>では、<ruby>年々<rp>(</rp><rt>ねんねん</rt><rp>)</rp></ruby><ruby>人口<rp>(</rp><rt>じんこう</rt><rp>)</rp></ruby>が",
                    "old": "<ruby>減<rp>(</rp><rt>へ</rt><rp>)</rp></ruby>ってきている",
                    "new": "<ruby>減<rp>(</rp><rt>へ</rt><rp>)</rp></ruby>りつつある",
                    "suffix": "。",
                    "translation": "In this area, the population has been decreasing year by year.",
                    "explanation": "てくる and つつある can both describe a change already in progress — つつある is the more formal, written way of saying the same ongoing shift.",
                    "oldCore": "てくる",
                    "newCore": null,
                    "translationMn": "Энэ бүс нутагт хүн ам жил ирэх тусам буурч байна.",
                    "explanationMn": "てくる болон つつある хоёулаа аль хэдийн явагдаж буй өөрчлөлтийг тодорхойлж болно — つつある нь ижил үргэлжилж буй өөрчлөлтийг илэрхийлэх илүү албан ёсны, бичгийн арга юм."
                },
                {
                    "prefix": "この<ruby>仕事<rp>(</rp><rt>しごと</rt><rp>)</rp></ruby>を<ruby>今日中<rp>(</rp><rt>きょうじゅう</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>終<rp>(</rp><rt>お</rt><rp>)</rp></ruby>わらせなければなりません",
                    "new": "<ruby>終<rp>(</rp><rt>お</rt><rp>)</rp></ruby>わらせないといけません",
                    "suffix": "。",
                    "translation": "I have to finish this work today.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation — ないといけない is just the everyday spoken version.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Энэ ажлыг өнөөдөр дуусгах ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа хатуу үүргийг илэрхийлдэг — ないといけない нь өдөр тутмын ярианы хэлбэр юм."
                },
                {
                    "prefix": "この<ruby>状況<rp>(</rp><rt>じょうきょう</rt><rp>)</rp></ruby>では、<ruby>計画<rp>(</rp><rt>けいかく</rt><rp>)</rp></ruby>を<ruby>変更<rp>(</rp><rt>へんこう</rt><rp>)</rp></ruby>し",
                    "old": "ないわけにはいきません",
                    "new": "なければなりません",
                    "suffix": "。",
                    "translation": "Given the situation, we have no choice but to change the plan.",
                    "explanation": "ないわけにはいかない and なければならない both express that there's no way around doing something — ないわけにはいかない just adds a stronger sense that the circumstances leave no real choice.",
                    "oldCore": null,
                    "newCore": "なければならない",
                    "translationMn": "Нөхцөл байдлыг харгалзан төлөвлөгөөг өөрчлөхөөс өөр аргагүй.",
                    "explanationMn": "ないわけにはいかない болон なければならない хоёулаа ямар нэг зүйлийг хийхээс өөр аргагүй байсныг илэрхийлдэг — ないわけにはいかない нь нөхцөл байдал жинхэнэ сонголт үлдээгээгүйг илүү хүчтэй мэдрэмжээр илэрхийлдэг."
                },
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>は<ruby>難<rp>(</rp><rt>むずか</rt><rp>)</rp></ruby>しい<ruby>言葉<rp>(</rp><rt>ことば</rt><rp>)</rp></ruby>が<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>くて",
                    "old": "わかりにくいです",
                    "new": "わかりづらいです",
                    "suffix": "。",
                    "translation": "This document has a lot of difficult words, so it's hard to understand.",
                    "explanation": "にくい and づらい both mark something as hard to do — づらい just leans slightly more toward personal difficulty.",
                    "oldCore": "にくい",
                    "newCore": null,
                    "translationMn": "Энэ баримт бичигт хэцүү үг их байгаа тул ойлгоход хэцүү.",
                    "explanationMn": "にくい болон づらい хоёулаа хийхэд хэцүү зүйлийг заадаг — づらい нь хувийн бэрхшээлд арай илүү дөхдөг."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>は<ruby>安<rp>(</rp><rt>やす</rt><rp>)</rp></ruby>い",
                    "old": "わりに",
                    "new": "にしては",
                    "suffix": "、とても<ruby>おいしいです<rp>(</rp><rt></rt><rp>)</rp></ruby>。",
                    "translation": "For how cheap it is, this shop is very delicious.",
                    "explanation": "わりに and にしては both compare an outcome against what you'd expect from a given fact — here, being surprisingly good despite the low price, either connector reads the same way.",
                    "oldCore": null,
                    "translationMn": "Хямд байгаагаас нь харахад энэ дэлгүүр маш амттай.",
                    "explanationMn": "わりに болон にしては хоёулаа өгөгдсөн баримтаас хүлээгдэж буй зүйлтэй үр дүнг харьцуулдаг — энд хямд үнэтэй ч гэсэн гайхмаар сайн байгаа тохиолдолд аль холбогч ч ижилхэн уншигдана."
                },
                {
                    "prefix": "この<ruby>公園<rp>(</rp><rt>こうえん</rt><rp>)</rp></ruby>を<ruby>訪<rp>(</rp><rt>おとず</rt><rp>)</rp></ruby>れた",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have visited this park before.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ цэцэрлэгт хүрээлэнд өмнө нь очиж байсан.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                }
            ]
        },
        {
            "level": 14,
            "title": "Foundation · Level 14",
            "sentences": [
                {
                    "prefix": "<ruby>今度<rp>(</rp><rt>こんど</rt><rp>)</rp></ruby>の<ruby>新製品<rp>(</rp><rt>しんせいひん</rt><rp>)</rp></ruby>はとても<ruby>人気<rp>(</rp><rt>にんき</rt><rp>)</rp></ruby>がある",
                    "old": "そうだ",
                    "new": "らしい",
                    "suffix": "。",
                    "translation": "I heard the new product is very popular.",
                    "explanation": "そうだ (hearsay) and らしい both relay something you heard secondhand — らしい can also carry a bit of the speaker's own inference.",
                    "oldCore": "そう",
                    "newCore": "らしい",
                    "translationMn": "Шинэ бүтээгдэхүүн маш их алдартай гэж сонссон.",
                    "explanationMn": "そうだ (сонсоод мэдсэн) болон らしい хоёулаа хоёрдогчоор сонссон зүйлийг дамжуулдаг — らしい нь мөн илэрхийлэгчийн бага зэргийн таамаглалыг агуулж болно."
                },
                {
                    "prefix": "<ruby>年<rp>(</rp><rt>とし</rt><rp>)</rp></ruby>を<ruby>取<rp>(</rp><rt>と</rt><rp>)</rp></ruby>る",
                    "old": "にしたがって",
                    "new": "につれて",
                    "suffix": "、<ruby>体力<rp>(</rp><rt>たいりょく</rt><rp>)</rp></ruby>が<ruby>落<rp>(</rp><rt>お</rt><rp>)</rp></ruby>ちていく。",
                    "translation": "As you get older, your physical strength declines.",
                    "explanation": "にしたがって and につれて both mark 'as X changes, Y changes along with it' — they're standard, interchangeable partners here.",
                    "oldCore": null,
                    "translationMn": "Насаа ахих тусам биеийн хүч буурдаг.",
                    "explanationMn": "にしたがって болон につれて хоёулаа \"X өөрчлөгдөхөд Y ч хамт өөрчлөгддөг\"-ийг заадаг — эдгээр нь энд стандарт, сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "この<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>は、<ruby>必<rp>(</rp><rt>かなら</rt><rp>)</rp></ruby>ずしも<ruby>成功<rp>(</rp><rt>せいこう</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>意味<rp>(</rp><rt>いみ</rt><rp>)</rp></ruby>するわけではありません",
                    "new": "<ruby>意味<rp>(</rp><rt>いみ</rt><rp>)</rp></ruby>するとはかぎりません",
                    "suffix": "。",
                    "translation": "This result doesn't necessarily mean success.",
                    "explanation": "わけではない and とはかぎらない both soften a statement into a partial, not-absolute negation — they're standard interchangeable partners for 'that's not always the case.'",
                    "oldCore": null,
                    "translationMn": "Энэ үр дүн заавал амжилт гэсэн үг биш.",
                    "explanationMn": "わけではない болон とはかぎらない хоёулаа мэдэгдлийг хэсэгчилсэн, үнэмлэхүй бус үгүйсгэл болгон зөөлрүүлдэг — эдгээр нь \"үргэлж тийм биш\" гэсэн стандарт, сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "<ruby>大雪<rp>(</rp><rt>おおゆき</rt><rp>)</rp></ruby>の",
                    "old": "ため",
                    "new": "せいで",
                    "suffix": "、<ruby>飛行機<rp>(</rp><rt>ひこうき</rt><rp>)</rp></ruby>が<ruby>欠航<rp>(</rp><rt>けっこう</rt><rp>)</rp></ruby>になった。",
                    "translation": "Because of the heavy snow, the flight was canceled.",
                    "explanation": "ため and せいで can both mark a cause behind an unwanted result — せいで adds a stronger sense that the cause is to blame, which fits a canceled flight.",
                    "oldCore": null,
                    "translationMn": "Их цасны улмаас нислэг цуцлагдсан.",
                    "explanationMn": "ため болон せいで хоёулаа хүсээгүй үр дүнгийн ард буй шалтгааныг заадаг — せいで нь шалтгааныг буруутгах илүү хүчтэй мэдрэмжийг нэмдэг бөгөөд энэ нь цуцлагдсан нислэгтэй сайн тохирдог."
                },
                {
                    "prefix": "この<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>で<ruby>働<rp>(</rp><rt>はたら</rt><rp>)</rp></ruby>く",
                    "old": "からには",
                    "new": "<ruby>以上<rp>(</rp><rt>いじょう</rt><rp>)</rp></ruby>",
                    "suffix": "、しっかり<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>を<ruby>出<rp>(</rp><rt>だ</rt><rp>)</rp></ruby>したい。",
                    "translation": "Since I'm working at this company, I want to produce solid results.",
                    "explanation": "からには and 以上 both mean 'given that X is the case' as a strong basis for what follows — they're standard, well-documented interchangeable partners.",
                    "oldCore": null,
                    "translationMn": "Энэ компанид ажилладаг учраас би бат бөх үр дүн гаргахыг хүсдэг.",
                    "explanationMn": "からには болон 以上 хоёулаа \"X нь тийм учраас\" гэдгийг дараагийн зүйлийн хүчтэй үндэслэл болгон илэрхийлдэг — эдгээр нь стандарт, сайн баримтжуулагдсан сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "この<ruby>会場<rp>(</rp><rt>かいじょう</rt><rp>)</rp></ruby>には<ruby>飲食物<rp>(</rp><rt>いんしょくぶつ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>ちこんではいけません",
                    "new": "<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>ちこまないでください",
                    "suffix": "。",
                    "translation": "Please don't bring food or drinks into this venue.",
                    "explanation": "てはいけない and ないでください both forbid something — ないでください phrases it as a request instead of a flat rule.",
                    "oldCore": "てはいけない",
                    "newCore": "ないでください",
                    "translationMn": "Энэ байранд хоол хүнс, ундаа бүү авчир.",
                    "explanationMn": "てはいけない болон ないでください хоёулаа хориглодог — ないでください нь тодорхой дүрэм биш хүсэлт хэлбэрээр илэрхийлдэг."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>について、もう<ruby>少<rp>(</rp><rt>すこ</rt><rp>)</rp></ruby>し",
                    "old": "<ruby>考<rp>(</rp><rt>かんが</rt><rp>)</rp></ruby>えたほうがいいです",
                    "new": "<ruby>考<rp>(</rp><rt>かんが</rt><rp>)</rp></ruby>えるべきです",
                    "suffix": "。",
                    "translation": "You should think about this problem a bit more.",
                    "explanation": "たほうがいい and べきだ both give advice — べきだ sounds a bit stronger, closer to an obligation than a suggestion.",
                    "oldCore": "たほうがいい",
                    "newCore": "べき",
                    "translationMn": "Та энэ асуудлыг бага зэрэг илүү бодох хэрэгтэй.",
                    "explanationMn": "たほうがいい болон べきだ хоёулаа зөвлөгөө өгдөг — べきだ нь санал бодлоос илүү үүрэгт ойрхон, арай хатуу сонсогддог."
                },
                {
                    "prefix": "<ruby>初心者<rp>(</rp><rt>しょしんしゃ</rt><rp>)</rp></ruby>の",
                    "old": "わりに",
                    "new": "にしては",
                    "suffix": "、とても<ruby>上手<rp>(</rp><rt>じょうず</rt><rp>)</rp></ruby>に<ruby>弾<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>けている。",
                    "translation": "For a beginner, they're playing very skillfully.",
                    "explanation": "わりに and にしては both compare an outcome against what you'd expect from a given fact — being unexpectedly good for a beginner reads the same either way.",
                    "oldCore": null,
                    "translationMn": "Анхан шатны хүнд харьцуулбал тэр маш чадварлаг тоглож байна.",
                    "explanationMn": "わりに болон にしては хоёулаа өгөгдсөн баримтаас хүлээгдэж буй зүйлтэй үр дүнг харьцуулдаг — эхлэгчийн хувьд санамсаргүй сайн байгаа нь аль ч тохиолдолд ижил уншигдана."
                },
                {
                    "prefix": "この<ruby>絵<rp>(</rp><rt>え</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>れば<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>るほど、<ruby>味<rp>(</rp><rt>あじ</rt><rp>)</rp></ruby>わいが<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>てくる",
                    "new": "<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>れば<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>るほど、<ruby>味<rp>(</rp><rt>あじ</rt><rp>)</rp></ruby>わいが<ruby>増<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>していく",
                    "suffix": "。",
                    "translation": "The more you look at this painting, the more its depth comes through.",
                    "explanation": "てくる and ていく can both trace a gradual change over time from different angles — for a change that keeps building the longer you look, either reads naturally.",
                    "oldCore": "てくる",
                    "newCore": "ていく",
                    "translationMn": "Энэ зургийг харах тусам гүн утга нь илэрч ирдэг.",
                    "explanationMn": "てくる болон ていく хоёулаа цаг хугацааны дагуу аажим өөрчлөлтийг өөр өөр өнцгөөс заадаг — удаан харах тусам нэмэгдэж буй өөрчлөлтийн хувьд аль нь ч байгалиар сонсогдоно."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>で<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>い<ruby>物<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>をした",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have shopping experience at this store.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ дэлгүүрт худалдаа хийсэн туршлагатай.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                }
            ]
        },
        {
            "level": 15,
            "title": "Foundation · Level 15",
            "sentences": [
                {
                    "prefix": "この<ruby>島<rp>(</rp><rt>しま</rt><rp>)</rp></ruby>には<ruby>昔<rp>(</rp><rt>むかし</rt><rp>)</rp></ruby>、<ruby>宝物<rp>(</rp><rt>たからもの</rt><rp>)</rp></ruby>が<ruby>隠<rp>(</rp><rt>かく</rt><rp>)</rp></ruby>されていた",
                    "old": "という<ruby>伝説<rp>(</rp><rt>でんせつ</rt><rp>)</rp></ruby>がある",
                    "new": "らしい",
                    "suffix": "。",
                    "translation": "There's supposedly a legend that treasure was once hidden on this island.",
                    "explanation": "という伝説がある and らしい both relay something passed down or heard about — らしい just states the same secondhand information more compactly.",
                    "oldCore": null,
                    "translationMn": "Энэ арал дээр эрдэнэс нуугдсан гэсэн домог байдаг гэнэ.",
                    "explanationMn": "という伝説がある болон らしい хоёулаа уламжлагдсан буюу сонссон зүйлийг дамжуулдаг — らしい нь ижил хоёрдогч мэдээллийг илүү товч илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>物価<rp>(</rp><rt>ぶっか</rt><rp>)</rp></ruby>の<ruby>上昇<rp>(</rp><rt>じょうしょう</rt><rp>)</rp></ruby>に",
                    "old": "したがって",
                    "new": "つれて",
                    "suffix": "、<ruby>生活<rp>(</rp><rt>せいかつ</rt><rp>)</rp></ruby>は<ruby>厳<rp>(</rp><rt>きび</rt><rp>)</rp></ruby>しくなっていった。",
                    "translation": "As prices rose, life became harder.",
                    "explanation": "にしたがって and につれて both mark 'as X changes, Y changes along with it' — they're standard, interchangeable partners here.",
                    "oldCore": null,
                    "translationMn": "Үнэ өсөх тусам амьдрал хүндэрсэн.",
                    "explanationMn": "にしたがって болон につれて хоёулаа \"X өөрчлөгдөхөд Y ч хамт өөрчлөгддөг\"-ийг заадаг — эдгээр нь энд стандарт, сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "この<ruby>薬<rp>(</rp><rt>くすり</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>飲<rp>(</rp><rt>の</rt><rp>)</rp></ruby>んだからといって、すぐ<ruby>治<rp>(</rp><rt>なお</rt><rp>)</rp></ruby>るわけではない",
                    "new": "<ruby>飲<rp>(</rp><rt>の</rt><rp>)</rp></ruby>んだとしても、すぐ<ruby>治<rp>(</rp><rt>なお</rt><rp>)</rp></ruby>るわけではない",
                    "suffix": "。",
                    "translation": "Even taking this medicine, that doesn't mean you'll get better right away.",
                    "explanation": "からといって and としても can both reject a conclusion someone might jump to from a given fact — としても leans on 'even if,' which lines up with からといって's 'just because' reading here.",
                    "oldCore": null,
                    "translationMn": "Энэ эмийг уусан ч гэсэн шууд эдгэрнэ гэсэн үг биш.",
                    "explanationMn": "からといって болон としても хоёулаа өгөгдсөн баримтаас хэн нэгний гарган авч болох дүгнэлтийг үгүйсгэдэг — としても нь \"хэдийгээр...ч гэсэн\"-д дөхдөг бөгөөд энэ нь からといって-ийн \"зөвхөн...учир\" гэсэн утгатай энд нийцдэг."
                },
                {
                    "prefix": "<ruby>年<rp>(</rp><rt>とし</rt><rp>)</rp></ruby>を<ruby>取<rp>(</rp><rt>と</rt><rp>)</rp></ruby>っても、あの<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>の<ruby>元気<rp>(</rp><rt>げんき</rt><rp>)</rp></ruby>さは",
                    "old": "<ruby>変<rp>(</rp><rt>か</rt><rp>)</rp></ruby>わらないままだ",
                    "new": "<ruby>変<rp>(</rp><rt>か</rt><rp>)</rp></ruby>わらない<ruby>状態<rp>(</rp><rt>じょうたい</rt><rp>)</rp></ruby>が<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>いている",
                    "suffix": "。",
                    "translation": "Even growing older, that person's energy remains unchanged.",
                    "explanation": "ままだ and 状態が続いている both describe an unchanged state continuing over time — 状態が続いている just names 'state' outright instead of relying on まま's grammar alone.",
                    "oldCore": "まま",
                    "newCore": null,
                    "translationMn": "Насаа ахисан ч гэсэн тэр хүний эрч хүч өөрчлөгдөөгүй хэвээр байна.",
                    "explanationMn": "ままだ болон 状態が続いている хоёулаа цаг хугацааны туршид үргэлжилж буй өөрчлөгдөөгүй байдлыг заадаг — 状態が続いている нь まま-ийн дүрмээс дангаараа биш \"байдал\"-ыг шууд нэрлэдэг."
                },
                {
                    "prefix": "この<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>で<ruby>働<rp>(</rp><rt>はたら</rt><rp>)</rp></ruby>く",
                    "old": "<ruby>以上<rp>(</rp><rt>いじょう</rt><rp>)</rp></ruby>",
                    "new": "からには",
                    "suffix": "、ルールを<ruby>守<rp>(</rp><rt>まも</rt><rp>)</rp></ruby>らなければならない。",
                    "translation": "Since you're working at this company, you must follow the rules.",
                    "explanation": "以上 and からには both mean 'given that X is the case' as a strong basis for what follows — they're standard, well-documented interchangeable partners.",
                    "oldCore": null,
                    "translationMn": "Энэ компанид ажилладаг учраас дүрмийг дагаж мөрдөх ёстой.",
                    "explanationMn": "以上 болон からには хоёулаа \"X нь тийм учраас\" гэдгийг дараагийн зүйлийн хүчтэй үндэслэл болгон илэрхийлдэг — эдгээр нь стандарт, сайн баримтжуулагдсан сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "この<ruby>制度<rp>(</rp><rt>せいど</rt><rp>)</rp></ruby>を<ruby>今年中<rp>(</rp><rt>ことしじゅう</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>見直<rp>(</rp><rt>みなお</rt><rp>)</rp></ruby>さなければなりません",
                    "new": "<ruby>見直<rp>(</rp><rt>みなお</rt><rp>)</rp></ruby>さないといけません",
                    "suffix": "。",
                    "translation": "This system has to be reviewed this year.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation — ないといけない is just the everyday spoken version.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Энэ системийг энэ жил хянан үзэх ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа хатуу үүргийг илэрхийлдэг — ないといけない нь өдөр тутмын ярианы хэлбэр юм."
                },
                {
                    "prefix": "この<ruby>説明<rp>(</rp><rt>せつめい</rt><rp>)</rp></ruby>は<ruby>専門的<rp>(</rp><rt>せんもんてき</rt><rp>)</rp></ruby>すぎて",
                    "old": "わかりにくいです",
                    "new": "わかりづらいです",
                    "suffix": "。",
                    "translation": "This explanation is too technical, so it's hard to understand.",
                    "explanation": "にくい and づらい both mark something as hard to do — づらい just leans slightly more toward personal difficulty grasping it.",
                    "oldCore": "にくい",
                    "newCore": null,
                    "translationMn": "Энэ тайлбар хэтэрхий техникийн шинжтэй тул ойлгоход хэцүү.",
                    "explanationMn": "にくい болон づらい хоёулаа хийхэд хэцүү зүйлийг заадаг — づらい нь ойлгоход учирсан хувийн бэрхшээлд арай илүү дөхдөг."
                },
                {
                    "prefix": "この<ruby>選手<rp>(</rp><rt>せんしゅ</rt><rp>)</rp></ruby>は<ruby>若<rp>(</rp><rt>わか</rt><rp>)</rp></ruby>い",
                    "old": "わりに",
                    "new": "にしては",
                    "suffix": "、<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>が<ruby>豊富<rp>(</rp><rt>ほうふ</rt><rp>)</rp></ruby>だ。",
                    "translation": "For how young this player is, they're very experienced.",
                    "explanation": "わりに and にしては both compare an outcome against what you'd expect from a given fact — either reads the same way here.",
                    "oldCore": null,
                    "translationMn": "Залуу байгаагаас нь харахад энэ тоглогч маш их туршлагатай.",
                    "explanationMn": "わりに болон にしては хоёулаа өгөгдсөн баримтаас хүлээгдэж буй зүйлтэй үр дүнг харьцуулдаг — энд аль нь ч ижил уншигдана."
                },
                {
                    "prefix": "この<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>が<ruby>全<rp>(</rp><rt>すべ</rt><rp>)</rp></ruby>てを",
                    "old": "<ruby>物語<rp>(</rp><rt>ものがた</rt><rp>)</rp></ruby>っているに<ruby>違<rp>(</rp><rt>ちが</rt><rp>)</rp></ruby>いない",
                    "new": "<ruby>物語<rp>(</rp><rt>ものがた</rt><rp>)</rp></ruby>っているはずだ",
                    "suffix": "。",
                    "translation": "This result must be telling the whole story.",
                    "explanation": "にちがいない and はずだ both express strong confidence in a conclusion — にちがいない just carries a slightly stronger sense of certainty.",
                    "oldCore": "にちがいない",
                    "newCore": "はず",
                    "translationMn": "Энэ үр дүн бүх зүйлийг харуулж байгаа нь гарцаагүй.",
                    "explanationMn": "にちがいない болон はずだ хоёулаа дүгнэлтэд итгэлтэй байдлыг илэрхийлдэг — にちがいない нь итгэлийн бага зэрэг илүү хүчтэй мэдрэмжийг агуулдаг."
                },
                {
                    "prefix": "この<ruby>会場<rp>(</rp><rt>かいじょう</rt><rp>)</rp></ruby>を<ruby>利用<rp>(</rp><rt>りよう</rt><rp>)</rp></ruby>した",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have experience using this venue.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ байрыг ашигласан туршлагатай.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                }
            ]
        },
        {
            "level": 16,
            "title": "Foundation · Level 16",
            "sentences": [
                {
                    "prefix": "この<ruby>薬<rp>(</rp><rt>くすり</rt><rp>)</rp></ruby>は<ruby>副作用<rp>(</rp><rt>ふくさよう</rt><rp>)</rp></ruby>が<ruby>強<rp>(</rp><rt>つよ</rt><rp>)</rp></ruby>い",
                    "old": "そうだ",
                    "new": "という<ruby>話<rp>(</rp><rt>はなし</rt><rp>)</rp></ruby>だ",
                    "suffix": "。",
                    "translation": "I heard this medicine has strong side effects.",
                    "explanation": "そうだ (hearsay) and という話だ both relay something heard secondhand — という話だ just spells out 'that's the story I heard' a bit more explicitly.",
                    "oldCore": "そう",
                    "newCore": null,
                    "translationMn": "Энэ эм хүчтэй гаж нөлөөтэй гэж сонссон.",
                    "explanationMn": "そうだ (сонсоод мэдсэн) болон という話だ хоёулаа хоёрдогчоор сонссон зүйлийг дамжуулдаг — という話だ нь \"тэр бол миний сонссон түүх\" гэдгийг арай илүү тодорхой хэлдэг."
                },
                {
                    "prefix": "<ruby>景気<rp>(</rp><rt>けいき</rt><rp>)</rp></ruby>の<ruby>回復<rp>(</rp><rt>かいふく</rt><rp>)</rp></ruby>に",
                    "old": "ともなって",
                    "new": "つれて",
                    "suffix": "、<ruby>求人<rp>(</rp><rt>きゅうじん</rt><rp>)</rp></ruby>も<ruby>増<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>えてきた。",
                    "translation": "Along with the economic recovery, job openings have also increased.",
                    "explanation": "にともなって and につれて both mark 'as X happens, Y happens along with it' — they're close, standard partners for describing two things changing together.",
                    "oldCore": null,
                    "translationMn": "Эдийн засаг сэргэхийн хэрээр ажлын байрны хэрэгцээ ч нэмэгдсэн.",
                    "explanationMn": "にともなって болон につれて хоёулаа \"X болоход Y ч хамт болдог\"-ийг заадаг — эдгээр нь хоёр зүйл хамт өөрчлөгдөж буйг тодорхойлох ойролцоо, стандарт хос юм."
                },
                {
                    "prefix": "この<ruby>成績<rp>(</rp><rt>せいせき</rt><rp>)</rp></ruby>で<ruby>合格<rp>(</rp><rt>ごうかく</rt><rp>)</rp></ruby>できる",
                    "old": "とはかぎりません",
                    "new": "わけではありません",
                    "suffix": "。",
                    "translation": "This grade doesn't necessarily mean you'll pass.",
                    "explanation": "とはかぎらない and わけではない both soften a statement into a partial, not-absolute negation — they're standard interchangeable partners for 'that's not always true.'",
                    "oldCore": null,
                    "translationMn": "Энэ дүн заавал тэнцэнэ гэсэн үг биш.",
                    "explanationMn": "とはかぎらない болон わけではない хоёулаа мэдэгдлийг хэсэгчилсэн, үнэмлэхүй бус үгүйсгэл болгон зөөлрүүлдэг — эдгээр нь \"үргэлж үнэн биш\" гэсэн стандарт, сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>を<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>る",
                    "old": "かぎり、この<ruby>計画<rp>(</rp><rt>けいかく</rt><rp>)</rp></ruby>には<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>がなさそうだ",
                    "new": "と、この<ruby>計画<rp>(</rp><rt>けいかく</rt><rp>)</rp></ruby>には<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>がなさそうだ",
                    "suffix": "。",
                    "translation": "Looking at this document, this plan doesn't seem to have any problems.",
                    "explanation": "かぎり and plain と can both introduce 'based on/when you look at X' before a conclusion — と is the more neutral, everyday way to make the same kind of connection.",
                    "oldCore": null,
                    "translationMn": "Энэ баримт бичгийг харахад энэ төлөвлөгөөнд асуудал байхгүй бололтой.",
                    "explanationMn": "かぎり болон энгийн と хоёулаа дүгнэлтийн өмнө \"X-ийг харахад/дэнд суурилан\"-ыг танилцуулж болно — と нь ижил төрлийн холболтыг хийх илүү төвийг сахисан, өдөр тутмын арга юм."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>で<ruby>働<rp>(</rp><rt>はたら</rt><rp>)</rp></ruby>く",
                    "old": "からには",
                    "new": "<ruby>以上<rp>(</rp><rt>いじょう</rt><rp>)</rp></ruby>",
                    "suffix": "、お<ruby>客様<rp>(</rp><rt>きゃくさま</rt><rp>)</rp></ruby>を<ruby>大切<rp>(</rp><rt>たいせつ</rt><rp>)</rp></ruby>にしたい。",
                    "translation": "Since I'm working at this shop, I want to treat customers with care.",
                    "explanation": "からには and 以上 both mean 'given that X is the case' as a strong basis for what follows — they're standard, well-documented interchangeable partners.",
                    "oldCore": null,
                    "translationMn": "Энэ дэлгүүрт ажилладаг учраас би үйлчлүүлэгчидтэй анхааралтай харьцахыг хүсдэг.",
                    "explanationMn": "からには болон 以上 хоёулаа \"X нь тийм учраас\" гэдгийг дараагийн зүйлийн хүчтэй үндэслэл болгон илэрхийлдэг — эдгээр нь стандарт, сайн баримтжуулагдсан сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "この<ruby>会議室<rp>(</rp><rt>かいぎしつ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>予約<rp>(</rp><rt>よやく</rt><rp>)</rp></ruby>せずに<ruby>使<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>ってはいけません",
                    "new": "<ruby>予約<rp>(</rp><rt>よやく</rt><rp>)</rp></ruby>せずに<ruby>使<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>わないでください",
                    "suffix": "。",
                    "translation": "Please don't use this meeting room without a reservation.",
                    "explanation": "てはいけない and ないでください both forbid something — ないでください phrases it as a request instead of a flat rule.",
                    "oldCore": "てはいけない",
                    "newCore": "ないでください",
                    "translationMn": "Захиалгагүйгээр энэ хурлын өрөөг бүү ашигла.",
                    "explanationMn": "てはいけない болон ないでください хоёулаа хориглодог — ないでください нь тодорхой дүрэм биш хүсэлт хэлбэрээр илэрхийлдэг."
                },
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>には<ruby>正確<rp>(</rp><rt>せいかく</rt><rp>)</rp></ruby>な<ruby>数字<rp>(</rp><rt>すうじ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>載<rp>(</rp><rt>の</rt><rp>)</rp></ruby>せるべきです",
                    "new": "<ruby>載<rp>(</rp><rt>の</rt><rp>)</rp></ruby>せたほうがいいです",
                    "suffix": "。",
                    "translation": "You should put accurate figures in this document.",
                    "explanation": "べきだ and たほうがいい both give advice — べきだ sounds a bit stronger, closer to an obligation, than たほうがいい's softer suggestion.",
                    "oldCore": "べき",
                    "newCore": "たほうがいい",
                    "translationMn": "Энэ баримт бичигт зөв тоо баримт оруулах хэрэгтэй.",
                    "explanationMn": "べきだ болон たほうがいい хоёулаа зөвлөгөө өгдөг — べきだ нь たほうがいい-ийн зөөлөн зөвлөмжөөс арай хатуу, үүрэгт ойрхон сонстог."
                },
                {
                    "prefix": "この<ruby>選手<rp>(</rp><rt>せんしゅ</rt><rp>)</rp></ruby>は<ruby>体<rp>(</rp><rt>からだ</rt><rp>)</rp></ruby>が<ruby>小<rp>(</rp><rt>ちい</rt><rp>)</rp></ruby>さい",
                    "old": "わりに",
                    "new": "にしては",
                    "suffix": "、<ruby>驚<rp>(</rp><rt>おどろ</rt><rp>)</rp></ruby>くほどパワーがある。",
                    "translation": "For how small this athlete's build is, they have surprising power.",
                    "explanation": "わりに and にしては both compare an outcome against what you'd expect from a given fact — either reads the same way here.",
                    "oldCore": null,
                    "translationMn": "Бие бүтэц нь жижигхэн атлаа энэ тамирчин гайхалтай хүчтэй байна.",
                    "explanationMn": "わりに болон にしては хоёулаа өгөгдсөн баримтаас хүлээгдэж буй зүйлтэй үр дүнг харьцуулдаг — энд аль нь ч ижил уншигдана."
                },
                {
                    "prefix": "<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>を<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>ければ、いつか<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>が<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>る",
                    "old": "はずです",
                    "new": "に<ruby>違<rp>(</rp><rt>ちが</rt><rp>)</rp></ruby>いありません",
                    "suffix": "。",
                    "translation": "If you keep up the effort, results are bound to show eventually.",
                    "explanation": "はずだ and にちがいない both express strong confidence in a conclusion — にちがいない pushes that certainty a bit further, but both land as 'this has to happen' here.",
                    "oldCore": "はず",
                    "newCore": "にちがいない",
                    "translationMn": "Чармайлт тасралтгүй үргэлжлүүлбэл эцэст нь үр дүн гарах нь гарцаагүй.",
                    "explanationMn": "はずだ болон にちがいない хоёулаа дүгнэлтэд итгэлтэй байдлыг илэрхийлдэг — にちがいない нь тэр итгэлийг бага зэрэг илүү чангатгадаг ч энд хоёул \"энэ болох ёстой\" гэсэн утгатай."
                },
                {
                    "prefix": "この<ruby>大学<rp>(</rp><rt>だいがく</rt><rp>)</rp></ruby>で<ruby>学<rp>(</rp><rt>まな</rt><rp>)</rp></ruby>んだ",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have the experience of having studied at this university.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ их сургуульд сурч байсан туршлагатай.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                }
            ]
        },
        {
            "level": 17,
            "title": "Foundation · Level 17",
            "sentences": [
                {
                    "prefix": "この<ruby>地方<rp>(</rp><rt>ちほう</rt><rp>)</rp></ruby>では<ruby>昔<rp>(</rp><rt>むかし</rt><rp>)</rp></ruby>から、<ruby>山<rp>(</rp><rt>やま</rt><rp>)</rp></ruby>に<ruby>神様<rp>(</rp><rt>かみさま</rt><rp>)</rp></ruby>が<ruby>住<rp>(</rp><rt>す</rt><rp>)</rp></ruby>んでいる",
                    "old": "と<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>い<ruby>伝<rp>(</rp><rt>つた</rt><rp>)</rp></ruby>えられている",
                    "new": "らしい",
                    "suffix": "。",
                    "translation": "In this region, it's said that a god has lived in the mountain since long ago.",
                    "explanation": "と言い伝えられている and らしい both relay something passed down or heard about — らしい just states the same secondhand information more compactly.",
                    "oldCore": null,
                    "translationMn": "Энэ бүс нутагт эртнээс нэгэн бурхан уулан дотор амьдардаг гэж ярьдаг.",
                    "explanationMn": "と言い伝えられている болон らしい хоёулаа уламжлагдсан буюу сонссон зүйлийг дамжуулдаг — らしい нь ижил хоёрдогч мэдээллийг илүү товч илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>技術<rp>(</rp><rt>ぎじゅつ</rt><rp>)</rp></ruby>の<ruby>進歩<rp>(</rp><rt>しんぽ</rt><rp>)</rp></ruby>に",
                    "old": "ともなって",
                    "new": "したがって",
                    "suffix": "、わたしたちの<ruby>暮<rp>(</rp><rt>く</rt><rp>)</rp></ruby>らしも<ruby>変<rp>(</rp><rt>か</rt><rp>)</rp></ruby>わってきた。",
                    "translation": "Along with advances in technology, our way of life has also changed.",
                    "explanation": "にともなって and にしたがって both mark 'as X happens, Y happens along with it' — they're close, standard partners for two things changing together.",
                    "oldCore": null,
                    "translationMn": "Технологийн дэвшлийн хэрээр бидний амьдралын хэв маяг ч өөрчлөгдсөн.",
                    "explanationMn": "にともなって болон にしたがって хоёулаа \"X болоход Y ч хамт болдог\"-ийг заадаг — эдгээр нь хоёр зүйл хамт өөрчлөгдөж буйг тодорхойлох ойролцоо, стандарт хос юм."
                },
                {
                    "prefix": "<ruby>値段<rp>(</rp><rt>ねだん</rt><rp>)</rp></ruby>が<ruby>高<rp>(</rp><rt>たか</rt><rp>)</rp></ruby>いから",
                    "old": "といって",
                    "new": "としても",
                    "suffix": "、<ruby>質<rp>(</rp><rt>しつ</rt><rp>)</rp></ruby>がいいとはかぎらない。",
                    "translation": "Even if it's expensive, that doesn't necessarily mean the quality is good.",
                    "explanation": "からといって and としても can both reject a conclusion someone might jump to from a given fact — としても leans on 'even if,' which fits からといって's 'just because' framing here.",
                    "oldCore": null,
                    "translationMn": "Үнэтэй байсан ч чанар нь сайн гэсэн үг заавал биш.",
                    "explanationMn": "からといって болон としても хоёулаа өгөгдсөн баримтаас гарган авч болох дүгнэлтийг үгүйсгэдэг — としても нь \"хэдийгээр...ч гэсэн\"-д дөхдөг бөгөөд энэ нь からといって-ийн \"зөвхөн...учир\" гэсэн утгад энд нийцдэг."
                },
                {
                    "prefix": "この<ruby>制度<rp>(</rp><rt>せいど</rt><rp>)</rp></ruby>を<ruby>導入<rp>(</rp><rt>どうにゅう</rt><rp>)</rp></ruby>する",
                    "old": "<ruby>以上<rp>(</rp><rt>いじょう</rt><rp>)</rp></ruby>",
                    "new": "からには",
                    "suffix": "、<ruby>社員全員<rp>(</rp><rt>しゃいんぜんいん</rt><rp>)</rp></ruby>に<ruby>説明<rp>(</rp><rt>せつめい</rt><rp>)</rp></ruby>しなければならない。",
                    "translation": "Since we're introducing this system, we have to explain it to all the staff.",
                    "explanation": "以上 and からには both mean 'given that X is the case' as a strong basis for what follows — they're standard, well-documented interchangeable partners.",
                    "oldCore": null,
                    "translationMn": "Энэ системийг нэвтрүүлж байгаа учраас бүх ажилтанд тайлбарлах ёстой.",
                    "explanationMn": "以上 болон からには хоёулаа \"X нь тийм учраас\" гэдгийг дараагийн зүйлийн хүчтэй үндэслэл болгон илэрхийлдэг — эдгээр нь стандарт, сайн баримтжуулагдсан сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "その<ruby>意見<rp>(</rp><rt>いけん</rt><rp>)</rp></ruby>には",
                    "old": "<ruby>賛成<rp>(</rp><rt>さんせい</rt><rp>)</rp></ruby>しかねます",
                    "new": "<ruby>賛成<rp>(</rp><rt>さんせい</rt><rp>)</rp></ruby>できません",
                    "suffix": "。",
                    "translation": "I'm afraid I can't agree with that opinion.",
                    "explanation": "かねる and plain できない both mean 'unable to do X' — かねる is just the more formal, hedged way of refusing that businesspeople use.",
                    "oldCore": null,
                    "translationMn": "Уучлаарай, тэр саналтай санал нийлж чадахгүй байна.",
                    "explanationMn": "かねる болон энгийн できない хоёулаа \"X хийж чадахгүй\" гэсэн утгатай — かねる нь бизнесийн хүмүүсийн ашигладаг илүү албан ёсны, зөөлрүүлсэн татгалзах арга юм."
                },
                {
                    "prefix": "この<ruby>制度<rp>(</rp><rt>せいど</rt><rp>)</rp></ruby>は<ruby>来年<rp>(</rp><rt>らいねん</rt><rp>)</rp></ruby>までに",
                    "old": "<ruby>整<rp>(</rp><rt>ととの</rt><rp>)</rp></ruby>えなければなりません",
                    "new": "<ruby>整<rp>(</rp><rt>ととの</rt><rp>)</rp></ruby>えないといけません",
                    "suffix": "。",
                    "translation": "This system has to be put in order by next year.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation — ないといけない is just the everyday spoken version.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Энэ системийг ирэх жилийн дотор эмхэлж цэгцлэх ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа хатуу үүргийг илэрхийлдэг — ないといけない нь өдөр тутмын ярианы хэлбэр юм."
                },
                {
                    "prefix": "この<ruby>報告書<rp>(</rp><rt>ほうこくしょ</rt><rp>)</rp></ruby>は<ruby>専門用語<rp>(</rp><rt>せんもんようご</rt><rp>)</rp></ruby>が<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>くて",
                    "old": "わかりづらいです",
                    "new": "わかりにくいです",
                    "suffix": "。",
                    "translation": "This report has a lot of technical terms, so it's hard to understand.",
                    "explanation": "づらい and にくい both mark something as hard to do — づらい just leans slightly more toward personal difficulty than にくい's more general 'hard to do.'",
                    "oldCore": null,
                    "translationMn": "Энэ тайланд техникийн нэр томьёо их байгаа тул ойлгоход хэцүү.",
                    "explanationMn": "づらい болон にくい хоёулаа хийхэд хэцүү зүйлийг заадаг — づらい нь にくい-ийн ерөнхий \"хийхэд хэцүү\"-гээс арай илүү хувийн бэрхшээлд дөхдөг."
                },
                {
                    "prefix": "この<ruby>建物<rp>(</rp><rt>たてもの</rt><rp>)</rp></ruby>は<ruby>古<rp>(</rp><rt>ふる</rt><rp>)</rp></ruby>い",
                    "old": "わりに",
                    "new": "にしては",
                    "suffix": "、しっかりしている。",
                    "translation": "For how old this building is, it's very sturdy.",
                    "explanation": "わりに and にしては both compare an outcome against what you'd expect from a given fact — either reads the same way here.",
                    "oldCore": null,
                    "translationMn": "Хуучин байгаагаас нь харахад энэ байшин маш бат бөх байна.",
                    "explanationMn": "わりに болон にしては хоёулаа өгөгдсөн баримтаас хүлээгдэж буй зүйлтэй үр дүнг харьцуулдаг — энд аль нь ч ижил уншигдана."
                },
                {
                    "prefix": "この<ruby>湖<rp>(</rp><rt>みずうみ</rt><rp>)</rp></ruby>の<ruby>水<rp>(</rp><rt>みず</rt><rp>)</rp></ruby>は<ruby>年<rp>(</rp><rt>とし</rt><rp>)</rp></ruby>ごとに<ruby>減<rp>(</rp><rt>へ</rt><rp>)</rp></ruby>り",
                    "old": "つつある",
                    "new": "つづけている",
                    "suffix": "。",
                    "translation": "This lake's water level is continuing to decrease year by year.",
                    "explanation": "つつある and つづけている both describe a change still in progress — つつある is the more formal, written version of the same ongoing shift.",
                    "oldCore": null,
                    "translationMn": "Энэ нуурын усны түвшин жил ирэх тусам буурсаар байна.",
                    "explanationMn": "つつある болон つづけている хоёулаа одоо ч явагдаж буй өөрчлөлтийг тодорхойлдог — つつある нь ижил үргэлжилж буй өөрчлөлтийн илүү албан ёсны, бичгийн хувилбар юм."
                },
                {
                    "prefix": "この<ruby>大学<rp>(</rp><rt>だいがく</rt><rp>)</rp></ruby>で<ruby>研究<rp>(</rp><rt>けんきゅう</rt><rp>)</rp></ruby>をした",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have research experience at this university.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ их сургуульд судалгааны туршлагатай.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                }
            ]
        },
        {
            "level": 18,
            "title": "Foundation · Level 18",
            "sentences": [
                {
                    "prefix": "その<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>は<ruby>海外<rp>(</rp><rt>かいがい</rt><rp>)</rp></ruby>に<ruby>進出<rp>(</rp><rt>しんしゅつ</rt><rp>)</rp></ruby>する",
                    "old": "という<ruby>話<rp>(</rp><rt>はなし</rt><rp>)</rp></ruby>だ",
                    "new": "そうだ",
                    "suffix": "。",
                    "translation": "I heard that company is going to expand overseas.",
                    "explanation": "という話だ and そうだ (hearsay) both relay something heard secondhand — そうだ just attaches the same hearsay meaning more compactly.",
                    "oldCore": null,
                    "newCore": "そう",
                    "translationMn": "Тэр компани гадаадад тэлэх төлөвтэй гэж сонссон.",
                    "explanationMn": "という話だ болон そうだ (сонсоод мэдсэн) хоёулаа хоёрдогчоор сонссон зүйлийг дамжуулдаг — そうだ нь ижил сонссон утгыг илүү товч залгадаг."
                },
                {
                    "prefix": "<ruby>経済<rp>(</rp><rt>けいざい</rt><rp>)</rp></ruby>の<ruby>発展<rp>(</rp><rt>はってん</rt><rp>)</rp></ruby>に",
                    "old": "つれて",
                    "new": "ともなって",
                    "suffix": "、<ruby>環境問題<rp>(</rp><rt>かんきょうもんだい</rt><rp>)</rp></ruby>も<ruby>深刻化<rp>(</rp><rt>しんこくか</rt><rp>)</rp></ruby>してきた。",
                    "translation": "Along with economic development, environmental problems have also grown more serious.",
                    "explanation": "につれて and にともなって both mark 'as X happens, Y happens along with it' — they're close, standard partners for two things changing together.",
                    "oldCore": null,
                    "translationMn": "Эдийн засгийн хөгжлийн хэрээр байгаль орчны асуудал ч улам хурцадсан.",
                    "explanationMn": "につれて болон にともなって хоёулаа \"X болоход Y ч хамт болдог\"-ийг заадаг — эдгээр нь хоёр зүйл хамт өөрчлөгдөж буйг тодорхойлох ойролцоо, стандарт хос юм."
                },
                {
                    "prefix": "この<ruby>薬<rp>(</rp><rt>くすり</rt><rp>)</rp></ruby>は<ruby>効果<rp>(</rp><rt>こうか</rt><rp>)</rp></ruby>がある",
                    "old": "といっても",
                    "new": "としても",
                    "suffix": "、<ruby>飲<rp>(</rp><rt>の</rt><rp>)</rp></ruby>みすぎるのはよくない。",
                    "translation": "Even though this medicine is effective, taking too much isn't good.",
                    "explanation": "といっても and としても both concede a fact before qualifying it — they're close, standard interchangeable ways to say 'even granting that.'",
                    "oldCore": null,
                    "translationMn": "Энэ эм үр дүнтэй ч, хэт их уух нь сайн биш.",
                    "explanationMn": "といっても болон としても хоёулаа баримтыг хүлээн зөвшөөрсний дараа нөхцөлжүүлдэг — эдгээр нь \"тэгсэн ч гэсэн\" гэсэн ойролцоо, стандарт сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "この<ruby>チームに<rp>(</rp><rt></rt><rp>)</rp></ruby><ruby>入<rp>(</rp><rt>はい</rt><rp>)</rp></ruby>った",
                    "old": "からには",
                    "new": "<ruby>以上<rp>(</rp><rt>いじょう</rt><rp>)</rp></ruby>",
                    "suffix": "、<ruby>最後<rp>(</rp><rt>さいご</rt><rp>)</rp></ruby>まで<ruby>頑張<rp>(</rp><rt>がんば</rt><rp>)</rp></ruby>りたい。",
                    "translation": "Since I've joined this team, I want to give it my all until the end.",
                    "explanation": "からには and 以上 both mean 'given that X is the case' as a strong basis for what follows — they're standard, well-documented interchangeable partners.",
                    "oldCore": null,
                    "translationMn": "Энэ багт нэгдсэн учраас эцсээ хүртэл бүх хүчээ дайчлахыг хүсдэг.",
                    "explanationMn": "からには болон 以上 хоёулаа \"X нь тийм учраас\" гэдгийг дараагийн зүйлийн хүчтэй үндэслэл болгон илэрхийлдэг — эдгээр нь стандарт, сайн баримтжуулагдсан сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "その<ruby>要求<rp>(</rp><rt>ようきゅう</rt><rp>)</rp></ruby>には",
                    "old": "<ruby>応<rp>(</rp><rt>おう</rt><rp>)</rp></ruby>じかねます",
                    "new": "<ruby>応<rp>(</rp><rt>おう</rt><rp>)</rp></ruby>じることができません",
                    "suffix": "。",
                    "translation": "I'm afraid we can't accommodate that request.",
                    "explanation": "かねる and ことができない both mean 'unable to do X' — かねる is just the more formal, hedged way businesspeople use to refuse.",
                    "oldCore": null,
                    "newCore": "ことができる",
                    "translationMn": "Уучлаарай, тэр хүсэлтийг биелүүлж чадахгүй байна.",
                    "explanationMn": "かねる болон ことができない хоёулаа \"X хийж чадахгүй\" гэсэн утгатай — かねる нь бизнесийн хүмүүсийн ашигладаг илүү албан ёсны, зөөлрүүлсэн татгалзах арга юм."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>を<ruby>今週中<rp>(</rp><rt>こんしゅうじゅう</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>解決<rp>(</rp><rt>かいけつ</rt><rp>)</rp></ruby>しなければなりません",
                    "new": "<ruby>解決<rp>(</rp><rt>かいけつ</rt><rp>)</rp></ruby>しないといけません",
                    "suffix": "。",
                    "translation": "This problem has to be resolved this week.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation — ないといけない is just the everyday spoken version.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Энэ асуудлыг энэ долоо хоногт шийдвэрлэх ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа хатуу үүргийг илэрхийлдэг — ないといけない нь өдөр тутмын ярианы хэлбэр юм."
                },
                {
                    "prefix": "その<ruby>行動<rp>(</rp><rt>こうどう</rt><rp>)</rp></ruby>は<ruby>常識<rp>(</rp><rt>じょうしき</rt><rp>)</rp></ruby>から",
                    "old": "はずれている",
                    "new": "かけ<ruby>離<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>れている",
                    "suffix": "。",
                    "translation": "That behavior is far removed from common sense.",
                    "explanation": "はずれている and かけ離れている both describe something well outside the norm — かけ離れている just puts extra emphasis on the distance involved.",
                    "oldCore": null,
                    "translationMn": "Тэр үйлдэл энгийн ойлголтоос хэтэрхий хол байна.",
                    "explanationMn": "はずれている болон かけ離れている хоёулаа ердийн хэмжээнээс хол зүйлийг тодорхойлдог — かけ離れている нь холын зайг илүү онцлон тэмдэглэдэг."
                },
                {
                    "prefix": "この<ruby>選手<rp>(</rp><rt>せんしゅ</rt><rp>)</rp></ruby>は<ruby>年齢<rp>(</rp><rt>ねんれい</rt><rp>)</rp></ruby>が<ruby>高<rp>(</rp><rt>たか</rt><rp>)</rp></ruby>い",
                    "old": "にしては",
                    "new": "わりに",
                    "suffix": "、まだ<ruby>体<rp>(</rp><rt>からだ</rt><rp>)</rp></ruby>が<ruby>動<rp>(</rp><rt>うご</rt><rp>)</rp></ruby>く。",
                    "translation": "For their age, this athlete can still move quite well.",
                    "explanation": "にしては and わりに both compare an outcome against what you'd expect from a given fact — either reads the same way here.",
                    "oldCore": null,
                    "translationMn": "Насных нь хувьд энэ тамирчин нэлээд сайн хөдөлж чадаж байна.",
                    "explanationMn": "にしては болон わりに хоёулаа өгөгдсөн баримтаас хүлээгдэж буй зүйлтэй үр дүнг харьцуулдаг — энд аль нь ч ижил уншигдана."
                },
                {
                    "prefix": "この<ruby>森<rp>(</rp><rt>もり</rt><rp>)</rp></ruby>の<ruby>木<rp>(</rp><rt>き</rt><rp>)</rp></ruby>は<ruby>年々<rp>(</rp><rt>ねんねん</rt><rp>)</rp></ruby><ruby>減<rp>(</rp><rt>へ</rt><rp>)</rp></ruby>り",
                    "old": "つづけている",
                    "new": "つつある",
                    "suffix": "。",
                    "translation": "This forest's trees continue to decrease year by year.",
                    "explanation": "つづけている and つつある both describe a change still in progress — つつある is the more formal, written version of the same ongoing shift.",
                    "oldCore": null,
                    "translationMn": "Энэ ойн мод жил ирэх тусам цөөрсөөр байна.",
                    "explanationMn": "つづけている болон つつある хоёулаа одоо ч явагдаж буй өөрчлөлтийг тодорхойлдог — つつある нь ижил үргэлжилж буй өөрчлөлтийн илүү албан ёсны, бичгийн хувилбар юм."
                },
                {
                    "prefix": "この<ruby>研究所<rp>(</rp><rt>けんきゅうじょ</rt><rp>)</rp></ruby>で<ruby>実験<rp>(</rp><rt>じっけん</rt><rp>)</rp></ruby>をした",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have experience running experiments at this research institute.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ судалгааны хүрээлэнд туршилт хийсэн туршлагатай.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                }
            ]
        },
        {
            "level": 19,
            "title": "Foundation · Level 19",
            "sentences": [
                {
                    "prefix": "この<ruby>湖<rp>(</rp><rt>みずうみ</rt><rp>)</rp></ruby>には<ruby>巨大<rp>(</rp><rt>きょだい</rt><rp>)</rp></ruby>な<ruby>魚<rp>(</rp><rt>さかな</rt><rp>)</rp></ruby>が<ruby>住<rp>(</rp><rt>す</rt><rp>)</rp></ruby>んでいる",
                    "old": "らしい",
                    "new": "という<ruby>噂<rp>(</rp><rt>うわさ</rt><rp>)</rp></ruby>だ",
                    "suffix": "。",
                    "translation": "There's a rumor that a huge fish lives in this lake.",
                    "explanation": "らしい and という噂だ both relay something heard secondhand — という噂だ just spells out 'that's the rumor' more explicitly than らしい's single suffix.",
                    "oldCore": "らしい",
                    "newCore": null,
                    "translationMn": "Энэ нуурт асар том загас амьдардаг гэсэн цуу яриа байдаг.",
                    "explanationMn": "らしい болон という噂だ хоёулаа хоёрдогчоор сонссон зүйлийг дамжуулдаг — という噂だ нь らしい-ийн дан дагаваргаас илүү тодорхой \"тэр бол цуу яриа\" гэж хэлдэг."
                },
                {
                    "prefix": "インターネットの<ruby>普及<rp>(</rp><rt>ふきゅう</rt><rp>)</rp></ruby>に",
                    "old": "ともなって",
                    "new": "したがって",
                    "suffix": "、<ruby>情報<rp>(</rp><rt>じょうほう</rt><rp>)</rp></ruby>の<ruby>広<rp>(</rp><rt>ひろ</rt><rp>)</rp></ruby>まり<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>も<ruby>変<rp>(</rp><rt>か</rt><rp>)</rp></ruby>わった。",
                    "translation": "Along with the spread of the internet, the way information spreads has also changed.",
                    "explanation": "にともなって and にしたがって both mark 'as X happens, Y happens along with it' — they're close, standard partners for two things changing together.",
                    "oldCore": null,
                    "translationMn": "Интернэтийн тархалтын хэрээр мэдээлэл тархах хэлбэр ч өөрчлөгдсөн.",
                    "explanationMn": "にともなって болон にしたがって хоёулаа \"X болоход Y ч хамт болдог\"-ийг заадаг — эдгээр нь хоёр зүйл хамт өөрчлөгдөж буйг тодорхойлох ойролцоо, стандарт хос юм."
                },
                {
                    "prefix": "<ruby>資格<rp>(</rp><rt>しかく</rt><rp>)</rp></ruby>を<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>っている",
                    "old": "からといって",
                    "new": "としても",
                    "suffix": "、<ruby>実力<rp>(</rp><rt>じつりょく</rt><rp>)</rp></ruby>があるとはかぎらない。",
                    "translation": "Even if you hold a certification, that doesn't necessarily mean you have real skill.",
                    "explanation": "からといって and としても can both reject a conclusion someone might jump to from a given fact — としても leans on 'even if,' which fits からといって's 'just because' framing here.",
                    "oldCore": null,
                    "translationMn": "Гэрчилгээтэй байсан ч бодит ур чадвартай гэсэн үг заавал биш.",
                    "explanationMn": "からといって болон としても хоёулаа өгөгдсөн баримтаас гарган авч болох дүгнэлтийг үгүйсгэдэг — としても нь \"хэдийгээр...ч гэсэн\"-д дөхдөг бөгөөд энэ нь からといって-ийн \"зөвхөн...учир\" гэсэн утгад энд нийцдэг."
                },
                {
                    "prefix": "この<ruby>職業<rp>(</rp><rt>しょくぎょう</rt><rp>)</rp></ruby>を<ruby>選<rp>(</rp><rt>えら</rt><rp>)</rp></ruby>んだ",
                    "old": "<ruby>以上<rp>(</rp><rt>いじょう</rt><rp>)</rp></ruby>",
                    "new": "からには",
                    "suffix": "、プロとしての<ruby>責任<rp>(</rp><rt>せきにん</rt><rp>)</rp></ruby>を<ruby>果<rp>(</rp><rt>は</rt><rp>)</rp></ruby>たしたい。",
                    "translation": "Since I've chosen this profession, I want to fulfill my responsibility as a professional.",
                    "explanation": "以上 and からには both mean 'given that X is the case' as a strong basis for what follows — they're standard, well-documented interchangeable partners.",
                    "oldCore": null,
                    "translationMn": "Энэ мэргэжлийг сонгосон учраас мэргэжилтний хариуцлагаа биелүүлэхийг хүсдэг.",
                    "explanationMn": "以上 болон からには хоёулаа \"X нь тийм учраас\" гэдгийг дараагийн зүйлийн хүчтэй үндэслэл болгон илэрхийлдэг — эдгээр нь стандарт, сайн баримтжуулагдсан сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "その<ruby>案<rp>(</rp><rt>あん</rt><rp>)</rp></ruby>には",
                    "old": "<ruby>賛成<rp>(</rp><rt>さんせい</rt><rp>)</rp></ruby>しかねます",
                    "new": "<ruby>賛成<rp>(</rp><rt>さんせい</rt><rp>)</rp></ruby>することができません",
                    "suffix": "。",
                    "translation": "I'm afraid I can't support that proposal.",
                    "explanation": "かねる and ことができない both mean 'unable to do X' — かねる is just the more formal, hedged way businesspeople use to refuse.",
                    "oldCore": null,
                    "newCore": "ことができる",
                    "translationMn": "Уучлаарай, тэр саналыг дэмжиж чадахгүй байна.",
                    "explanationMn": "かねる болон ことができない хоёулаа \"X хийж чадахгүй\" гэсэн утгатай — かねる нь бизнесийн хүмүүсийн ашигладаг илүү албан ёсны, зөөлрүүлсэн татгалзах арга юм."
                },
                {
                    "prefix": "その<ruby>発言<rp>(</rp><rt>はつげん</rt><rp>)</rp></ruby>は<ruby>事実<rp>(</rp><rt>じじつ</rt><rp>)</rp></ruby>から",
                    "old": "かけ<ruby>離<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>れている",
                    "new": "はずれている",
                    "suffix": "。",
                    "translation": "That remark is far removed from the facts.",
                    "explanation": "かけ離れている and はずれている both describe something well outside the norm — かけ離れている just puts extra emphasis on the distance involved.",
                    "oldCore": null,
                    "translationMn": "Тэр мэдэгдэл үнэн баримтаас хэтэрхий хол байна.",
                    "explanationMn": "かけ離れている болон はずれている хоёулаа ердийн хэмжээнээс хол зүйлийг тодорхойлдог — かけ離れている нь холын зайг илүү онцлон тэмдэглэдэг."
                },
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>を<ruby>金曜日<rp>(</rp><rt>きんようび</rt><rp>)</rp></ruby>までに",
                    "old": "<ruby>提出<rp>(</rp><rt>ていしゅつ</rt><rp>)</rp></ruby>しなければなりません",
                    "new": "<ruby>提出<rp>(</rp><rt>ていしゅつ</rt><rp>)</rp></ruby>しないといけません",
                    "suffix": "。",
                    "translation": "This document has to be submitted by Friday.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation — ないといけない is just the everyday spoken version.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Энэ баримт бичгийг баасан гарагийн дотор өгөх ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа хатуу үүргийг илэрхийлдэг — ないといけない нь өдөр тутмын ярианы хэлбэр юм."
                },
                {
                    "prefix": "この<ruby>俳優<rp>(</rp><rt>はいゆう</rt><rp>)</rp></ruby>は<ruby>年<rp>(</rp><rt>とし</rt><rp>)</rp></ruby>が",
                    "old": "わりに",
                    "new": "にしては",
                    "suffix": "、<ruby>若々<rp>(</rp><rt>わかわか</rt><rp>)</rp></ruby>しく<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>える。",
                    "translation": "For their age, this actor looks very youthful.",
                    "explanation": "わりに and にしては both compare an outcome against what you'd expect from a given fact — either reads the same way here.",
                    "oldCore": null,
                    "translationMn": "Насных нь хувьд энэ жүжигчин маш залуухан харагдаж байна.",
                    "explanationMn": "わりに болон にしては хоёулаа өгөгдсөн баримтаас хүлээгдэж буй зүйлтэй үр дүнг харьцуулдаг — энд аль нь ч ижил уншигдана."
                },
                {
                    "prefix": "この<ruby>地域<rp>(</rp><rt>ちいき</rt><rp>)</rp></ruby>の<ruby>伝統技術<rp>(</rp><rt>でんとうぎじゅつ</rt><rp>)</rp></ruby>は<ruby>失<rp>(</rp><rt>うしな</rt><rp>)</rp></ruby>われ",
                    "old": "つつある",
                    "new": "はじめている",
                    "suffix": "。",
                    "translation": "This region's traditional craft is beginning to be lost.",
                    "explanation": "つつある and はじめている can both describe a change already underway — はじめている just frames the same shift as something that's recently started.",
                    "oldCore": null,
                    "translationMn": "Энэ бүс нутгийн уламжлалт урлаг алга болж эхэлж байна.",
                    "explanationMn": "つつある болон はじめている хоёулаа аль хэдийн эхэлсэн өөрчлөлтийг тодорхойлж болно — はじめている нь ижил өөрчлөлтийг саяхан эхэлсэн зүйл мэт харуулдаг."
                },
                {
                    "prefix": "この<ruby>病院<rp>(</rp><rt>びょういん</rt><rp>)</rp></ruby>で<ruby>治療<rp>(</rp><rt>ちりょう</rt><rp>)</rp></ruby>を<ruby>受<rp>(</rp><rt>う</rt><rp>)</rp></ruby>けた",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have experience receiving treatment at this hospital.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ эмнэлэгт эмчилгээ авсан туршлагатай.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                }
            ]
        },
        {
            "level": 20,
            "title": "Foundation · Level 20",
            "sentences": [
                {
                    "prefix": "この<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>は<ruby>近<rp>(</rp><rt>ちか</rt><rp>)</rp></ruby>いうちに<ruby>合併<rp>(</rp><rt>がっぺい</rt><rp>)</rp></ruby>する",
                    "old": "という<ruby>噂<rp>(</rp><rt>うわさ</rt><rp>)</rp></ruby>だ",
                    "new": "らしい",
                    "suffix": "。",
                    "translation": "There's a rumor this company will merge with another soon.",
                    "explanation": "という噂だ and らしい both relay something heard secondhand — らしい just states the same secondhand information more compactly.",
                    "oldCore": null,
                    "newCore": "らしい",
                    "translationMn": "Энэ компани удахгүй өөр компанитай нэгдэнэ гэсэн цуу яриа байна.",
                    "explanationMn": "という噂だ болон らしい хоёулаа хоёрдогчоор сонссон зүйлийг дамжуулдаг — らしい нь ижил хоёрдогч мэдээллийг илүү товч илэрхийлдэг."
                },
                {
                    "prefix": "デジタル<ruby>化<rp>(</rp><rt>か</rt><rp>)</rp></ruby>の<ruby>進展<rp>(</rp><rt>しんてん</rt><rp>)</rp></ruby>に",
                    "old": "したがって",
                    "new": "ともなって",
                    "suffix": "、<ruby>働<rp>(</rp><rt>はたら</rt><rp>)</rp></ruby>き<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>も<ruby>多様化<rp>(</rp><rt>たようか</rt><rp>)</rp></ruby>してきた。",
                    "translation": "Along with the progress of digitalization, ways of working have also diversified.",
                    "explanation": "にしたがって and にともなって both mark 'as X happens, Y happens along with it' — they're close, standard partners for two things changing together.",
                    "oldCore": null,
                    "translationMn": "Дижитал шилжилтийн хэрээр ажиллах хэлбэр ч олон янз болсон.",
                    "explanationMn": "にしたがって болон にともなって хоёулаа \"X болоход Y ч хамт болдог\"-ийг заадаг — эдгээр нь хоёр зүйл хамт өөрчлөгдөж буйг тодорхойлох ойролцоо, стандарт хос юм."
                },
                {
                    "prefix": "この<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>だけを<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>た",
                    "old": "からといって、すべてがうまくいっているとはかぎらない",
                    "new": "としても、すべてがうまくいっているとはかぎらない",
                    "suffix": "。",
                    "translation": "Even looking only at this result, that doesn't necessarily mean everything is going well.",
                    "explanation": "からといって and としても can both reject a conclusion someone might jump to from a given fact — としても leans on 'even if,' which fits からといって's 'just because' framing here.",
                    "oldCore": null,
                    "translationMn": "Зөвхөн энэ үр дүнг харсан ч бүх зүйл сайн явж байна гэсэн үг заавал биш.",
                    "explanationMn": "からといって болон としても хоёулаа өгөгдсөн баримтаас гарган авч болох дүгнэлтийг үгүйсгэдэг — としても нь \"хэдийгээр...ч гэсэн\"-д дөхдөг бөгөөд энэ нь からといって-ийн \"зөвхөн...учир\" гэсэн утгад энд нийцдэг."
                },
                {
                    "prefix": "この<ruby>役職<rp>(</rp><rt>やくしょく</rt><rp>)</rp></ruby>を<ruby>引<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>き<ruby>受<rp>(</rp><rt>う</rt><rp>)</rp></ruby>けた",
                    "old": "からには",
                    "new": "<ruby>以上<rp>(</rp><rt>いじょう</rt><rp>)</rp></ruby>",
                    "suffix": "、<ruby>全力<rp>(</rp><rt>ぜんりょく</rt><rp>)</rp></ruby>を<ruby>尽<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>くしたい。",
                    "translation": "Since I've taken on this position, I want to give it everything I've got.",
                    "explanation": "からには and 以上 both mean 'given that X is the case' as a strong basis for what follows — they're standard, well-documented interchangeable partners.",
                    "oldCore": null,
                    "translationMn": "Энэ албан тушаалыг хүлээн авсан учраас бүх хүчээ дайчлахыг хүсдэг.",
                    "explanationMn": "からには болон 以上 хоёулаа \"X нь тийм учраас\" гэдгийг дараагийн зүйлийн хүчтэй үндэслэл болгон илэрхийлдэг — эдгээр нь стандарт, сайн баримтжуулагдсан сольж хэрэглэгддэг хос юм."
                },
                {
                    "prefix": "その<ruby>ご要望<rp>(</rp><rt>ごようぼう</rt><rp>)</rp></ruby>には",
                    "old": "お<ruby>応<rp>(</rp><rt>こた</rt><rp>)</rp></ruby>えしかねます",
                    "new": "お<ruby>応<rp>(</rp><rt>こた</rt><rp>)</rp></ruby>えすることができません",
                    "suffix": "。",
                    "translation": "I'm afraid we're unable to meet that request.",
                    "explanation": "かねる and ことができない both mean 'unable to do X' — かねる is just the more formal, hedged way businesspeople use to refuse.",
                    "oldCore": null,
                    "newCore": "ことができる",
                    "translationMn": "Уучлаарай, тэр хүсэлтийг биелүүлж чадахгүй байна.",
                    "explanationMn": "かねる болон ことができない хоёулаа \"X хийж чадахгүй\" гэсэн утгатай — かねる нь бизнесийн хүмүүсийн ашигладаг илүү албан ёсны, зөөлрүүлсэн татгалзах арга юм."
                },
                {
                    "prefix": "この<ruby>予算案<rp>(</rp><rt>よさんあん</rt><rp>)</rp></ruby>は<ruby>今週中<rp>(</rp><rt>こんしゅうじゅう</rt><rp>)</rp></ruby>に",
                    "old": "まとめなければなりません",
                    "new": "まとめないといけません",
                    "suffix": "。",
                    "translation": "This budget proposal has to be finalized this week.",
                    "explanation": "Both なければならない and ないといけない state a strict obligation — ないといけない is just the everyday spoken version.",
                    "oldCore": "なければならない",
                    "newCore": "ないといけない",
                    "translationMn": "Энэ төсвийн саналыг энэ долоо хоногт эцэслэх ёстой.",
                    "explanationMn": "なければならない болон ないといけない хоёулаа хатуу үүргийг илэрхийлдэг — ないといけない нь өдөр тутмын ярианы хэлбэр юм."
                },
                {
                    "prefix": "その<ruby>説明<rp>(</rp><rt>せつめい</rt><rp>)</rp></ruby>は<ruby>事実<rp>(</rp><rt>じじつ</rt><rp>)</rp></ruby>から",
                    "old": "はずれている",
                    "new": "かけ<ruby>離<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>れている",
                    "suffix": "。",
                    "translation": "That explanation is far removed from the facts.",
                    "explanation": "はずれている and かけ離れている both describe something well outside the norm — かけ離れている just puts extra emphasis on the distance involved.",
                    "oldCore": null,
                    "translationMn": "Тэр тайлбар үнэн баримтаас хэтэрхий хол байна.",
                    "explanationMn": "はずれている болон かけ離れている хоёулаа ердийн хэмжээнээс хол зүйлийг тодорхойлдог — かけ離れている нь холын зайг илүү онцлон тэмдэглэдэг."
                },
                {
                    "prefix": "この<ruby>建築家<rp>(</rp><rt>けんちくか</rt><rp>)</rp></ruby>は<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>が",
                    "old": "<ruby>浅<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby>いわりに",
                    "new": "<ruby>浅<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby>いにしては",
                    "suffix": "、とても<ruby>優<rp>(</rp><rt>すぐ</rt><rp>)</rp></ruby>れた<ruby>作品<rp>(</rp><rt>さくひん</rt><rp>)</rp></ruby>を<ruby>作<rp>(</rp><rt>つく</rt><rp>)</rp></ruby>る。",
                    "translation": "For how little experience this architect has, they create excellent work.",
                    "explanation": "わりに and にしては both compare an outcome against what you'd expect from a given fact — either reads the same way here.",
                    "oldCore": null,
                    "translationMn": "Туршлага бага атлаа энэ архитектор гайхалтай бүтээл туурвидаг.",
                    "explanationMn": "わりに болон にしては хоёулаа өгөгдсөн баримтаас хүлээгдэж буй зүйлтэй үр дүнг харьцуулдаг — энд аль нь ч ижил уншигдана."
                },
                {
                    "prefix": "この<ruby>言語<rp>(</rp><rt>げんご</rt><rp>)</rp></ruby>を<ruby>話<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>せる<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>は<ruby>年<rp>(</rp><rt>とし</rt><rp>)</rp></ruby>ごとに<ruby>減<rp>(</rp><rt>へ</rt><rp>)</rp></ruby>り",
                    "old": "はじめている",
                    "new": "つつある",
                    "suffix": "。",
                    "translation": "The number of people who can speak this language is beginning to decrease.",
                    "explanation": "はじめている and つつある can both describe a change already underway — つつある is the more formal, written way of framing the same shift.",
                    "oldCore": null,
                    "translationMn": "Энэ хэлээр ярьж чадах хүмүүсийн тоо цөөрч эхэлж байна.",
                    "explanationMn": "はじめている болон つつある хоёулаа аль хэдийн эхэлсэн өөрчлөлтийг тодорхойлж болно — つつある нь ижил өөрчлөлтийг илэрхийлэх илүү албан ёсны, бичгийн арга юм."
                },
                {
                    "prefix": "この<ruby>大学院<rp>(</rp><rt>だいがくいん</rt><rp>)</rp></ruby>で<ruby>指導<rp>(</rp><rt>しどう</rt><rp>)</rp></ruby>を<ruby>受<rp>(</rp><rt>う</rt><rp>)</rp></ruby>けた",
                    "old": "ことがあります",
                    "new": "<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>があります",
                    "suffix": "。",
                    "translation": "I have the experience of having received guidance at this graduate school.",
                    "explanation": "たことがある and 経験がある both report a past experience — 経験がある just spells the idea out with the word 'experience.'",
                    "oldCore": "ことがある",
                    "newCore": null,
                    "translationMn": "Би энэ дээд сургуульд удирдамж авсан туршлагатай.",
                    "explanationMn": "たことがある болон 経験がある хоёулаа өнгөрсөн туршлагыг мэдээлдэг — 経験がある нь санааг \"туршлага\" гэдэг үгээр илэрхийлдэг."
                }
            ]
        }
    ],
    "advanced": [
        {
            "level": 1,
            "title": "Advanced · Level 1",
            "sentences": [
                {
                    "prefix": "<ruby>天候<rp>(</rp><rt>てんこう</rt><rp>)</rp></ruby>が<ruby>悪<rp>(</rp><rt>わる</rt><rp>)</rp></ruby>かった",
                    "old": "にもかかわらず",
                    "new": "のに",
                    "suffix": "、<ruby>試合<rp>(</rp><rt>しあい</rt><rp>)</rp></ruby>は<ruby>予定通<rp>(</rp><rt>よていどお</rt><rp>)</rp></ruby>り<ruby>行<rp>(</rp><rt>おこな</rt><rp>)</rp></ruby>われた。",
                    "translation": "Even though the weather was bad, the match was held as scheduled.",
                    "explanation": "にもかかわらず and のに both mark an unexpected concession; にもかかわらず is the more formal, written-register choice while のに is common in everyday speech.",
                    "translationMn": "Цаг агаар муу байсан ч тэмцээн төлөвлөсний дагуу болсон.",
                    "explanationMn": "にもかかわらず болон のに хоёулаа гэнэтийн зөвшилцлийг заадаг; にもかかわらず нь илүү албан ёсны, бичгийн сонголт бол のに нь өдөр тутмын ярианд түгээмэл."
                },
                {
                    "prefix": "<ruby>給料<rp>(</rp><rt>きゅうりょう</rt><rp>)</rp></ruby>は<ruby>上<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>がった",
                    "old": "ものの",
                    "new": "けれども",
                    "suffix": "、<ruby>生活<rp>(</rp><rt>せいかつ</rt><rp>)</rp></ruby>は<ruby>楽<rp>(</rp><rt>らく</rt><rp>)</rp></ruby>にならなかった。",
                    "translation": "Although my salary went up, life didn't get any easier.",
                    "explanation": "ものの and けれども both concede a fact before contrasting it with reality; ものの reads as slightly more formal and written than the conversational けれども.",
                    "translationMn": "Цалин нэмэгдсэн ч амьдрал амаргүй хэвээр байна.",
                    "explanationMn": "ものの болон けれども хоёулаа баримтыг хүлээн зөвшөөрсний дараа бодит байдалтай харьцуулдаг; ものの нь харилцан ярианы けれども-гээс арай илүү албан ёсны, бичгийн шинжтэй сонстог."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>らない",
                    "old": "くせに",
                    "new": "のに",
                    "suffix": "、<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>ったふりをする。",
                    "translation": "Even though he doesn't know, he acts like he does.",
                    "explanation": "くせに and のに both mark concession, but くせに adds a critical, almost mocking tone that plain のに lacks.",
                    "translationMn": "Мэдэхгүй атлаа мэддэг мэт дүр эсгэдэг.",
                    "explanationMn": "くせに болон のに хоёулаа зөвшилцлийг заадаг ч くせに нь энгийн のに-д байхгүй шүүмжлэлтэй, басамжлах өнгийг нэмдэг."
                },
                {
                    "prefix": "もう<ruby>春<rp>(</rp><rt>はる</rt><rp>)</rp></ruby>",
                    "old": "だというのに",
                    "new": "なのに",
                    "suffix": "、まだ<ruby>雪<rp>(</rp><rt>ゆき</rt><rp>)</rp></ruby>が<ruby>降<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>っている。",
                    "translation": "Even though it's already spring, it's still snowing.",
                    "explanation": "というのに and のに both express surprised concession, but というのに carries extra emphasis on how unexpected the fact is.",
                    "oldCore": "というのに",
                    "translationMn": "Хавар болсон ч гэсэн цас орсоор байна.",
                    "explanationMn": "というのに болон のに хоёулаа гайхамшигтай зөвшилцлийг илэрхийлдэг ч というのに нь баримт хэр гэнэтийн болохыг нэмж онцолдог."
                },
                {
                    "prefix": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>は<ruby>値段<rp>(</rp><rt>ねだん</rt><rp>)</rp></ruby>が<ruby>安<rp>(</rp><rt>やす</rt><rp>)</rp></ruby>い",
                    "old": "わりに",
                    "new": "にしては",
                    "suffix": "、<ruby>味<rp>(</rp><rt>あじ</rt><rp>)</rp></ruby>がいい。",
                    "translation": "This restaurant's food is good, considering how cheap it is.",
                    "explanation": "わりに and にしては both compare a result against what the stated standard would lead you to expect; にしては leans slightly more toward voicing surprise at the gap.",
                    "translationMn": "Хямд байгаагаас нь харахад энэ рестораны хоол сайн байна.",
                    "explanationMn": "わりに болон にしては хоёулаа өгөгдсөн стандартаас хүлээгдэх зүйлтэй үр дүнг харьцуулдаг; にしては нь ялгааг гайхах өнгийг арай илүү илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>電車<rp>(</rp><rt>でんしゃ</rt><rp>)</rp></ruby>が<ruby>遅<rp>(</rp><rt>おく</rt><rp>)</rp></ruby>れた",
                    "old": "せいで",
                    "new": "ばかりに",
                    "suffix": "、<ruby>会議<rp>(</rp><rt>かいぎ</rt><rp>)</rp></ruby>に<ruby>間<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>に<ruby>合<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>わなかった。",
                    "translation": "Because the train was delayed, I didn't make it to the meeting in time.",
                    "explanation": "せいで and ばかりに both blame an unwanted result on a cause, but ばかりに adds a stronger sense of regret, as if that single factor alone ruined everything.",
                    "translationMn": "Галт тэрэг хойшилсны улмаас хуралд цагтаа хүрч чадаагүй.",
                    "explanationMn": "せいで болон ばかりに хоёулаа хүсээгүй үр дүнг шалтгаанд буруутгадаг ч ばかりに нь тэр цорын ганц хүчин зүйл л бүгдийг сүйтгэсэн мэт харамслын мэдрэмжийг илүү хүчтэй нэмдэг."
                },
                {
                    "prefix": "<ruby>先生<rp>(</rp><rt>せんせい</rt><rp>)</rp></ruby>が<ruby>丁寧<rp>(</rp><rt>ていねい</rt><rp>)</rp></ruby>に<ruby>教<rp>(</rp><rt>おし</rt><rp>)</rp></ruby>えてくれた",
                    "old": "おかげで",
                    "new": "ために",
                    "suffix": "、<ruby>試験<rp>(</rp><rt>しけん</rt><rp>)</rp></ruby>に<ruby>合格<rp>(</rp><rt>ごうかく</rt><rp>)</rp></ruby>できた。",
                    "translation": "Thanks to the teacher's careful instruction, I was able to pass the exam.",
                    "explanation": "おかげで and ために can both state the reason for a good result, but おかげで specifically conveys gratitude toward the cause, while ために is the neutral, plain way to say the same thing.",
                    "translationMn": "Багшийн нямбай зааврын ачаар шалгалтанд тэнцэж чадсан.",
                    "explanationMn": "おかげで болон ために хоёулаа сайн үр дүнгийн шалтгааныг илэрхийлж болно, гэхдээ おかげで нь тухайлбал шалтгаанд талархал илэрхийлдэг бол ために нь ижил зүйлийг хэлэх төвийг сахисан, энгийн арга юм."
                },
                {
                    "prefix": "<ruby>山<rp>(</rp><rt>やま</rt><rp>)</rp></ruby>の<ruby>形<rp>(</rp><rt>かたち</rt><rp>)</rp></ruby>が<ruby>富士山<rp>(</rp><rt>ふじさん</rt><rp>)</rp></ruby>に<ruby>似<rp>(</rp><rt>に</rt><rp>)</rp></ruby>ている",
                    "old": "ことから",
                    "new": "ので",
                    "suffix": "、「<ruby>小富士<rp>(</rp><rt>こふじ</rt><rp>)</rp></ruby>」と<ruby>呼<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>ばれている。",
                    "translation": "Because its shape resembles Mt. Fuji, it is called \"Little Fuji.\"",
                    "explanation": "ことから and ので both give the reason behind a conclusion or a name, but ことから is the more literary choice, often used when a fact serves as the basis for an inference or label.",
                    "translationMn": "Хэлбэр нь Фүжи ууланд төстэй тул \"Бяцхан Фүжи\" гэж нэрлэдэг.",
                    "explanationMn": "ことから болон ので хоёулаа дүгнэлт буюу нэрийн ард буй шалтгааныг заадаг ч ことから нь баримт таамаглал буюу нэрийн үндэслэл болж байгаа үед ихэвчлэн ашиглагддаг илүү утга зохиолын сонголт юм."
                },
                {
                    "prefix": "<ruby>新人<rp>(</rp><rt>しんじん</rt><rp>)</rp></ruby>",
                    "old": "だとはいえ",
                    "new": "であるものの",
                    "suffix": "、もう<ruby>少<rp>(</rp><rt>すこ</rt><rp>)</rp></ruby>ししっかりしてほしい。",
                    "translation": "Even though he's a newcomer, I'd like him to be a bit more reliable.",
                    "explanation": "とはいえ and ものの both concede a fact while pointing out it doesn't fully excuse what follows; とはいえ is a touch more formal and often introduces a mild rebuttal.",
                    "oldCore": "とはいえ",
                    "newCore": "ものの",
                    "translationMn": "Шинэ ажилтан ч гэсэн бага зэрэг илүү найдвартай байгаасай гэж хүсдэг.",
                    "explanationMn": "とはいえ болон ものの хоёулаа баримтыг хүлээн зөвшөөрөх зэрэгцээ дараах зүйлийг бүрэн зөвтгөхгүй гэдгийг заадаг; とはいえ нь бага зэрэг илүү албан ёсны бөгөөд ихэвчлэн зөөлөн эсэргүүцлийг танилцуулдаг."
                },
                {
                    "prefix": "<ruby>体<rp>(</rp><rt>からだ</rt><rp>)</rp></ruby>に<ruby>悪<rp>(</rp><rt>わる</rt><rp>)</rp></ruby>いと<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>り",
                    "old": "つつも",
                    "new": "ながら",
                    "suffix": "、たばこがやめられない。",
                    "translation": "Even though I know it's bad for my health, I can't quit smoking.",
                    "explanation": "つつも and ながら both mean \"while/even though doing X, Y happens in contradiction,\" with つつも being the more literary, written-register form.",
                    "translationMn": "Эрүүл мэндэд муу гэдгийг мэддэг ч тамхинаас гарч чадахгүй байна.",
                    "explanationMn": "つつも болон ながら хоёулаа \"X хийж байхад/хийсэн ч гэсэн Y эсрэгээрээ болдог\" гэсэн утгатай бөгөөд つつも нь илүү утга зохиолын, бичгийн хэв маягийн хэлбэр юм."
                }
            ]
        },
        {
            "level": 2,
            "title": "Advanced · Level 2",
            "sentences": [
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>が<ruby>豊富<rp>(</rp><rt>ほうふ</rt><rp>)</rp></ruby>な",
                    "old": "だけあって",
                    "new": "だけに",
                    "suffix": "、<ruby>判断<rp>(</rp><rt>はんだん</rt><rp>)</rp></ruby>が<ruby>的確<rp>(</rp><rt>てきかく</rt><rp>)</rp></ruby>だ。",
                    "translation": "Since he's very experienced, his judgment is spot-on.",
                    "explanation": "だけあって and だけに both link a fitting result to the reason that explains it, but だけあって is used only for positive, expectation-matching outcomes, while だけに can also introduce a negative or ironic twist.",
                    "translationMn": "Их туршлагатай учраас түүний шийдвэр үнэн зөв байдаг.",
                    "explanationMn": "だけあって болон だけに хоёулаа тохирсон үр дүнг тайлбарлах шалтгаантай холбодог ч だけあって нь зөвхөн эерэг, хүлээлттэй нийцсэн үр дүнд хэрэглэгддэг бол だけに нь сөрөг буюу инээдтэй эргэлтийг ч танилцуулж болно."
                },
                {
                    "prefix": "<ruby>人気<rp>(</rp><rt>にんき</rt><rp>)</rp></ruby>アイドルのコンサート",
                    "old": "とあって",
                    "new": "なので",
                    "suffix": "、<ruby>会場<rp>(</rp><rt>かいじょう</rt><rp>)</rp></ruby>は<ruby>朝<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby>から<ruby>長<rp>(</rp><rt>なが</rt><rp>)</rp></ruby>い<ruby>列<rp>(</rp><rt>れつ</rt><rp>)</rp></ruby>ができた。",
                    "translation": "Since it was a concert by a popular idol, a long line had formed at the venue since morning.",
                    "explanation": "とあって and なので both give the reason for what follows, but とあって is the reporting/news-style form used specifically for special, noteworthy occasions.",
                    "oldCore": "とあって",
                    "translationMn": "Алдартай дуучны концерт байсан учраас өглөөнөөс л урт дараалал үүссэн байлаа.",
                    "explanationMn": "とあって болон なので хоёулаа дараагийн зүйлийн шалтгааныг заадаг ч とあって нь тухайлбал онцгой, дурсагдам үйл явдалд ашиглагддаг мэдээллийн, сэтгүүлзүйн хэлбэр юм."
                },
                {
                    "prefix": "<ruby>周<rp>(</rp><rt>まわ</rt><rp>)</rp></ruby>りの<ruby>反対<rp>(</rp><rt>はんたい</rt><rp>)</rp></ruby>",
                    "old": "にもかまわず",
                    "new": "をよそに",
                    "suffix": "、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>留学<rp>(</rp><rt>りゅうがく</rt><rp>)</rp></ruby>を<ruby>決<rp>(</rp><rt>き</rt><rp>)</rp></ruby>めた。",
                    "translation": "Ignoring the objections of those around him, he decided to study abroad.",
                    "explanation": "にもかまわず and をよそに both describe acting without regard for something around you, though をよそに carries a slightly colder nuance of turning one's back on it entirely.",
                    "translationMn": "Эргэн тойрных нь эсэргүүцлийг тоохгүйгээр гадаадад суралцахаар шийдсэн.",
                    "explanationMn": "にもかまわず болон をよそに хоёулаа эргэн тойрны зүйлийг тоохгүй үйлдэл хийхийг тодорхойлдог ч をよそに нь бүрмөсөн нуруугаа харуулах бага зэрэг хүйтэн нюансыг агуулдаг."
                },
                {
                    "prefix": "<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>は<ruby>前置<rp>(</rp><rt>まえお</rt><rp>)</rp></ruby>き",
                    "old": "ぬきで",
                    "new": "なしで",
                    "suffix": "、<ruby>本題<rp>(</rp><rt>ほんだい</rt><rp>)</rp></ruby>に<ruby>入<rp>(</rp><rt>はい</rt><rp>)</rp></ruby>りましょう。",
                    "translation": "Let's skip the preamble today and get straight to the main topic.",
                    "explanation": "ぬきで and なしで both mean \"without X,\" but ぬきで is more idiomatic for deliberately omitting a customary step, while なしで is the plain, general way to say \"without.\"",
                    "translationMn": "Өнөөдөр оршил хэсгийг алгасаад шууд гол сэдэвлүү орцгооё.",
                    "explanationMn": "ぬきで болон なしで хоёулаа \"X-гүйгээр\" гэсэн утгатай ч ぬきで нь заншсан алхмыг зориудаар алгасахад илүү хэлц үгийн шинжтэй бол なしで нь \"-гүйгээр\" гэдгийг хэлэх энгийн, ерөнхий арга юм."
                },
                {
                    "prefix": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>会社員<rp>(</rp><rt>かいしゃいん</rt><rp>)</rp></ruby>として<ruby>働<rp>(</rp><rt>はたら</rt><rp>)</rp></ruby>く",
                    "old": "かたわら",
                    "new": "いっぽうで",
                    "suffix": "、<ruby>小説<rp>(</rp><rt>しょうせつ</rt><rp>)</rp></ruby>を<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>いている。",
                    "translation": "While working as an office employee, she also writes novels.",
                    "explanation": "かたわら and いっぽうで both describe a second activity carried on alongside a main one, but かたわら is the more literary phrase for a routinely balanced side pursuit.",
                    "translationMn": "Тэр оффисын ажилтнаар ажиллахын зэрэгцээ роман бичдэг.",
                    "explanationMn": "かたわら болон いっぽうで хоёулаа гол үйл ажиллагааны хажуугаар явуулж буй хоёр дахь үйл ажиллагааг тодорхойлдог ч かたわら нь тогтмол тэнцвэржүүлсэн хажуугийн зорилтод зориулсан илүү утга зохиолын хэллэг юм."
                },
                {
                    "prefix": "<ruby>兄<rp>(</rp><rt>あに</rt><rp>)</rp></ruby>が<ruby>無口<rp>(</rp><rt>むくち</rt><rp>)</rp></ruby>なの",
                    "old": "にひきかえ",
                    "new": "にくらべて",
                    "suffix": "、<ruby>弟<rp>(</rp><rt>おとうと</rt><rp>)</rp></ruby>はよく<ruby>話<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>す。",
                    "translation": "In contrast to my quiet older brother, my younger brother talks a lot.",
                    "explanation": "にひきかえ and にくらべて both set up a contrast between two things, but にひきかえ emphasizes a sharper, more surprising opposite, while にくらべて is a neutral comparison.",
                    "translationMn": "Дуугүй ах маань бол, дүү маань харин их ярьдаг.",
                    "explanationMn": "にひきかえ болон にくらべて хоёулаа хоёр зүйлийн хооронд эсрэг байдлыг тавьдаг ч にひきかえ нь илүү хурц, гайхмаар эсрэг байдлыг онцолдог бол にくらべて нь төвийг сахисан харьцуулалт юм."
                },
                {
                    "prefix": "<ruby>今年<rp>(</rp><rt>ことし</rt><rp>)</rp></ruby>は<ruby>例年<rp>(</rp><rt>れいねん</rt><rp>)</rp></ruby>",
                    "old": "にもまして",
                    "new": "よりも",
                    "suffix": "、<ruby>暑<rp>(</rp><rt>あつ</rt><rp>)</rp></ruby>さが<ruby>厳<rp>(</rp><rt>きび</rt><rp>)</rp></ruby>しい。",
                    "translation": "This year the heat is even more severe than in a typical year.",
                    "explanation": "にもまして and よりも both mark something as exceeding a standard for comparison, but にもまして is the more formal, literary way to say \"even more than.\"",
                    "translationMn": "Энэ жил ердийн жилээс ч илүү халуун байна.",
                    "explanationMn": "にもまして болон よりも хоёулаа харьцуулах стандартаас давсан зүйлийг заадаг ч にもまして нь \"хүртэл ч илүү\" гэдгийг хэлэх илүү албан ёсны, утга зохиолын арга юм."
                },
                {
                    "prefix": "この<ruby>薬<rp>(</rp><rt>くすり</rt><rp>)</rp></ruby>は<ruby>効果<rp>(</rp><rt>こうか</rt><rp>)</rp></ruby>がある",
                    "old": "のみならず",
                    "new": "ばかりでなく",
                    "suffix": "、<ruby>副作用<rp>(</rp><rt>ふくさよう</rt><rp>)</rp></ruby>もほとんどない。",
                    "translation": "This medicine is not only effective, it also has almost no side effects.",
                    "explanation": "のみならず and ばかりでなく both add a further point beyond what was already said, with のみならず sounding a bit more formal and written.",
                    "translationMn": "Энэ эм зөвхөн үр дүнтэй төдийгүй гаж нөлөө бараг байдаггүй.",
                    "explanationMn": "のみならず болон ばかりでなく хоёулаа өмнө хэлэгдсэн зүйлээс цааш нэмэлт санааг оруулдаг бөгөөд のみならず нь бага зэрэг илүү албан ёсны, бичгийн сонстог."
                },
                {
                    "prefix": "<ruby>被害<rp>(</rp><rt>ひがい</rt><rp>)</rp></ruby>は<ruby>国内<rp>(</rp><rt>こくない</rt><rp>)</rp></ruby>",
                    "old": "にとどまらず",
                    "new": "のみならず",
                    "suffix": "、<ruby>海外<rp>(</rp><rt>かいがい</rt><rp>)</rp></ruby>にも<ruby>広<rp>(</rp><rt>ひろ</rt><rp>)</rp></ruby>がった。",
                    "translation": "The damage was not limited to Japan and spread overseas as well.",
                    "explanation": "にとどまらず and のみならず both signal that something goes beyond a stated scope, and are close to interchangeable in this \"not limited to X\" pattern.",
                    "translationMn": "Хохирол зөвхөн Японоор хязгаарлагдаагүй гадаад руу ч тархсан.",
                    "explanationMn": "にとどまらず болон のみならず хоёулаа тодорхойлсон хүрээнээс давсныг заадаг бөгөөд энэ \"X-д хязгаарлагдахгүй\" загварт бараг сольж хэрэглэгддэг."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>英語<rp>(</rp><rt>えいご</rt><rp>)</rp></ruby>",
                    "old": "どころか",
                    "new": "はおろか",
                    "suffix": "、<ruby>日本語<rp>(</rp><rt>にほんご</rt><rp>)</rp></ruby>もまともに<ruby>話<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>せない。",
                    "translation": "Far from English, he can't even speak Japanese properly.",
                    "explanation": "どころか and はおろか both dismiss a lesser possibility to emphasize an even more extreme one, with はおろか being the more formal, literary choice.",
                    "translationMn": "Англи хэл битгий хэл тэр япон хэлээр ч зүгээр ярьж чаддаггүй.",
                    "explanationMn": "どころか болон はおろか хоёулаа бага боломжийг үгүйсгэн улам туйлширсан зүйлийг онцолдог бөгөөд はおろか нь илүү албан ёсны, утга зохиолын сонголт юм."
                }
            ]
        },
        {
            "level": 3,
            "title": "Advanced · Level 3",
            "sentences": [
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>は<ruby>日本<rp>(</rp><rt>にほん</rt><rp>)</rp></ruby>",
                    "old": "にかぎらず",
                    "new": "だけでなく",
                    "suffix": "、<ruby>世界中<rp>(</rp><rt>せかいじゅう</rt><rp>)</rp></ruby>で<ruby>起<rp>(</rp><rt>お</rt><rp>)</rp></ruby>きている。",
                    "translation": "This problem is occurring not just in Japan but around the world.",
                    "explanation": "にかぎらず and だけでなく both extend a statement beyond a single case to a broader group, and are freely interchangeable in this \"not limited to X\" pattern.",
                    "translationMn": "Энэ асуудал зөвхөн Японд бус дэлхий даяар тохиолдож байна.",
                    "explanationMn": "にかぎらず болон だけでなく хоёулаа мэдэгдлийг нэг тохиолдлоос өргөн бүлэг рүү тэлдэг бөгөөд энэ \"X-д хязгаарлагдахгүй\" загварт чөлөөтэй сольж хэрэглэгддэг."
                },
                {
                    "prefix": "<ruby>締<rp>(</rp><rt>し</rt><rp>)</rp></ruby>め<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>りが<ruby>迫<rp>(</rp><rt>せま</rt><rp>)</rp></ruby>っていて、<ruby>旅行<rp>(</rp><rt>りょこう</rt><rp>)</rp></ruby>",
                    "old": "どころではない",
                    "new": "している<ruby>場合<rp>(</rp><rt>ばあい</rt><rp>)</rp></ruby>ではない",
                    "suffix": "。",
                    "translation": "With the deadline closing in, this is no time to be traveling.",
                    "explanation": "どころではない and 場合ではない both reject an activity as impossible given the current situation, but どころではない attaches directly to a noun while 場合ではない needs a verb clause describing the activity.",
                    "translationMn": "Эцсийн хугацаа ойртож байгаа энэ үед аялах цаг биш.",
                    "explanationMn": "どころではない болон 場合ではない хоёулаа одоогийн нөхцөл байдлыг харгалзан үйл ажиллагааг боломжгүй гэж үгүйсгэдэг ч どころではない нь нэр үгэнд шууд залгагддаг бол 場合ではない нь үйл ажиллагааг тодорхойлсон үйл үгийн өгүүлбэр шаарддаг."
                },
                {
                    "prefix": "<ruby>毎日<rp>(</rp><rt>まいにち</rt><rp>)</rp></ruby>",
                    "old": "とは<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わないまでも",
                    "new": "とはいかなくても",
                    "suffix": "、<ruby>週<rp>(</rp><rt>しゅう</rt><rp>)</rp></ruby>に<ruby>三回<rp>(</rp><rt>さんかい</rt><rp>)</rp></ruby>は<ruby>運動<rp>(</rp><rt>うんどう</rt><rp>)</rp></ruby>したほうがいい。",
                    "translation": "Even if not every day, you should exercise at least three times a week.",
                    "explanation": "言わないまでも and とはいかなくても both concede that the ideal level isn't required and settle for a lesser but still meaningful degree; ないまでも is the underlying grammar point, shown here in its common とは言わないまでも form.",
                    "oldCore": "ないまでも",
                    "translationMn": "Өдөр бүр биш ч гэсэн долоо хоногт наад зах нь гурван удаа дасгал хийх хэрэгтэй.",
                    "explanationMn": "言わないまでも болон とはいかなくても хоёулаа хамгийн тохиромжтой түвшин шаардлагагүй гэдгийг хүлээн зөвшөөрч, бага боловч мэдээж утга учиртай хэмжээнд сэтгэл ханадаг; ないまでも нь суурь дүрмийн цэг бөгөөд энд ердийн とは言わないまでも хэлбэрээр харуулсан."
                },
                {
                    "prefix": "<ruby>完璧<rp>(</rp><rt>かんぺき</rt><rp>)</rp></ruby>ではない",
                    "old": "ものの",
                    "new": "にせよ",
                    "suffix": "、この<ruby>案<rp>(</rp><rt>あん</rt><rp>)</rp></ruby>は<ruby>十分<rp>(</rp><rt>じゅうぶん</rt><rp>)</rp></ruby><ruby>実用的<rp>(</rp><rt>じつようてき</rt><rp>)</rp></ruby>だ。",
                    "translation": "While it's not perfect, this proposal is quite practical.",
                    "explanation": "ものの and にせよ both concede a shortcoming before making a redeeming point, but にせよ frames it more like \"granting that X is true,\" a slightly stronger concession.",
                    "translationMn": "Төгс биш ч энэ санал нэлээд практик ач холбогдолтой.",
                    "explanationMn": "ものの болон にせよ хоёулаа дутагдлыг хүлээн зөвшөөрсний дараа нөхөх санаа хэлдэг ч にせよ нь \"X үнэн гэдгийг зөвшөөрвөл ч гэсэн\" мэт бага зэрэг илүү хүчтэй зөвшилцлийг илэрхийлдэг."
                },
                {
                    "prefix": "この<ruby>計画<rp>(</rp><rt>けいかく</rt><rp>)</rp></ruby>が",
                    "old": "<ruby>失敗<rp>(</rp><rt>しっぱい</rt><rp>)</rp></ruby>しないともかぎらない",
                    "new": "<ruby>失敗<rp>(</rp><rt>しっぱい</rt><rp>)</rp></ruby>するかもしれない",
                    "suffix": "。",
                    "translation": "This plan might fail.",
                    "explanation": "ないともかぎらない and かもしれない both hedge that an outcome is possible though not certain, but ないともかぎらない is a double-negative construction specifically used to flag a risk that shouldn't be dismissed.",
                    "oldCore": "ないともかぎらない",
                    "translationMn": "Энэ төлөвлөгөө бүтэлгүйтэж магадгүй.",
                    "explanationMn": "ないともかぎらない болон かもしれない хоёулаа үр дүн боломжтой ч гэсэн баттай биш гэдгийг зөөлрүүлдэг ч ないともかぎらない нь үл тоомсорлож болохгүй эрсдэлийг тэмдэглэхэд зориулсан давхар үгүйсгэлийн бүтэц юм."
                },
                {
                    "prefix": "あの<ruby>映画<rp>(</rp><rt>えいが</rt><rp>)</rp></ruby>を<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>ると、いつも<ruby>泣<rp>(</rp><rt>な</rt><rp>)</rp></ruby>か",
                    "old": "ないではいられない",
                    "new": "ずにはいられない",
                    "suffix": "。",
                    "translation": "Whenever I watch that movie, I can't help but cry.",
                    "explanation": "ないではいられない and ずにはいられない both express an impulse too strong to resist, and are fully interchangeable, with ずにはいられない being the slightly more common written form.",
                    "translationMn": "Тэр киног үзэх бүрдээ уйлахгүй байж чадахгүй.",
                    "explanationMn": "ないではいられない болон ずにはいられない хоёулаа эсэргүүцэхэд хэтэрхий хүчтэй түлхэц илэрхийлдэг бөгөөд бүрэн сольж хэрэглэгддэг, ずにはいられない нь бага зэрэг илүү түгээмэл бичгийн хэлбэр юм."
                },
                {
                    "prefix": "この<ruby>状況<rp>(</rp><rt>じょうきょう</rt><rp>)</rp></ruby>では、<ruby>値上<rp>(</rp><rt>ねあ</rt><rp>)</rp></ruby>げを",
                    "old": "せざるをえない",
                    "new": "しないわけにはいかない",
                    "suffix": "。",
                    "translation": "Given the situation, we have no choice but to raise prices.",
                    "explanation": "ざるをえない and ないわけにはいかない both describe an action forced by circumstance despite reluctance, and are close to interchangeable in this sense.",
                    "oldCore": "ざるをえない",
                    "translationMn": "Нөхцөл байдлыг харгалзан үнийг нэмэхээс өөр аргагүй.",
                    "explanationMn": "ざるをえない болон ないわけにはいかない хоёулаа дургүй боловч нөхцөл байдлаас болж хийхээс өөр аргагүй болсон үйлдлийг тодорхойлдог бөгөөд энэ утгаараа бараг сольж хэрэглэгддэг."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>今後<rp>(</rp><rt>こんご</rt><rp>)</rp></ruby>の<ruby>活躍<rp>(</rp><rt>かつやく</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>願<rp>(</rp><rt>ねが</rt><rp>)</rp></ruby>ってやまない",
                    "new": "<ruby>心<rp>(</rp><rt>こころ</rt><rp>)</rp></ruby>から<ruby>願<rp>(</rp><rt>ねが</rt><rp>)</rp></ruby>っている",
                    "suffix": "。",
                    "translation": "I sincerely hope for his continued success.",
                    "explanation": "〜てやまない and 心から〜ている both express a deep, unwavering feeling, but てやまない is a literary, somewhat formal fixed expression mainly used with verbs like 願う and 祈る.",
                    "oldCore": "てやまない",
                    "translationMn": "Түүний цаашдын амжилтыг чин сэтгэлээсээ хүсэн ерөөж байна.",
                    "explanationMn": "〜てやまない болон 心から〜ている хоёулаа гүн, тогтвортой мэдрэмжийг илэрхийлдэг ч てやまない нь ихэвчлэн 願う, 祈る гэх мэт үйл үгтэй хэрэглэгддэг утга зохиолын, бага зэрэг албан ёсны тогтмол хэллэг юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby>が<ruby>正<rp>(</rp><rt>ただ</rt><rp>)</rp></ruby>しいと",
                    "old": "<ruby>公言<rp>(</rp><rt>こうげん</rt><rp>)</rp></ruby>してはばからない",
                    "new": "<ruby>堂々<rp>(</rp><rt>どうどう</rt><rp>)</rp></ruby>と<ruby>公言<rp>(</rp><rt>こうげん</rt><rp>)</rp></ruby>する",
                    "suffix": "。",
                    "translation": "He boldly declares, without hesitation, that he is right.",
                    "explanation": "てはばからない and 堂々と〜する both describe saying something openly without hesitation, but てはばからない is a fixed literary phrase that often carries a hint of criticism toward the speaker's boldness.",
                    "oldCore": "てはばからない",
                    "translationMn": "Тэр эргэлзэлгүйгээр өөрийгөө зөв гэдгээ зоригтойгоор мэдэгддэг.",
                    "explanationMn": "てはばからない болон 堂々と〜する хоёулаа эргэлзэлгүйгээр ил тод хэлэхийг тодорхойлдог ч てはばからない нь ихэвчлэн илэрхийлэгчийн зоригт хандсан шүүмжлэлийн нэвчилтэй тогтмол утга зохиолын хэллэг юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>惨<rp>(</rp><rt>みじ</rt><rp>)</rp></ruby>めな<ruby>姿<rp>(</rp><rt>すがた</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>るにたえない",
                    "new": "<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>ていられない",
                    "suffix": "。",
                    "translation": "His pitiful state is unbearable to watch.",
                    "explanation": "にたえない and 見ていられない both say that something is too distressing to endure watching, with にたえない being the more formal, literary way to express it.",
                    "oldCore": "にたえない",
                    "translationMn": "Түүний өрөвдмөөр байдлыг харах нь тэвчихийн аргагүй байна.",
                    "explanationMn": "にたえない болон 見ていられない хоёулаа ямар нэг зүйл харахад хэтэрхий шаналгаатай гэдгийг хэлдэг бөгөөд にたえない нь илэрхийлэх илүү албан ёсны, утга зохиолын арга юм."
                }
            ]
        },
        {
            "level": 4,
            "title": "Advanced · Level 4",
            "sentences": [
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>物事<rp>(</rp><rt>ものごと</rt><rp>)</rp></ruby>を<ruby>悲観的<rp>(</rp><rt>ひかんてき</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>考<rp>(</rp><rt>かんが</rt><rp>)</rp></ruby>えるきらいがある",
                    "new": "<ruby>考<rp>(</rp><rt>かんが</rt><rp>)</rp></ruby>えがちだ",
                    "suffix": "。",
                    "translation": "He tends to think about things pessimistically.",
                    "explanation": "きらいがある and がちだ both point out a recurring negative tendency, but きらいがある is a more formal, written expression often used for character traits.",
                    "oldCore": "きらいがある",
                    "translationMn": "Тэр зүйлийг сөрөг талаас нь бодох хандлагатай.",
                    "explanationMn": "きらいがある болон がちだ хоёулаа давтагдах сөрөг хандлагыг тэмдэглэдэг ч きらいがある нь ихэвчлэн зан чанарын шинжид ашиглагддаг илүү албан ёсны, бичгийн илэрхийлэл юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>が<ruby>成功<rp>(</rp><rt>せいこう</rt><rp>)</rp></ruby>したのは、<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>を<ruby>惜<rp>(</rp><rt>お</rt><rp>)</rp></ruby>しまなかったから",
                    "old": "にほかならない",
                    "new": "だ",
                    "suffix": "。",
                    "translation": "The reason he succeeded is simply that he spared no effort.",
                    "explanation": "にほかならない and plain だ both assert a reason as the definite, sole explanation, but にほかならない adds emphatic force meaning \"nothing other than this.\"",
                    "translationMn": "Түүний амжилтын шалтгаан бол хичээл зүтгэлээ харамгүй гаргасанд л оршино.",
                    "explanationMn": "にほかならない болон энгийн だ хоёулаа шалтгааныг тодорхой, цорын ганц тайлбар гэж баталдаг ч にほかならない нь \"үүнээс өөр юу ч биш\" гэсэн онцолсон хүчийг нэмдэг."
                },
                {
                    "prefix": "これはほんの<ruby>一例<rp>(</rp><rt>いちれい</rt><rp>)</rp></ruby>",
                    "old": "にすぎない",
                    "new": "だけだ",
                    "suffix": "。",
                    "translation": "This is merely one example.",
                    "explanation": "にすぎない and だけだ both downplay something as being no more than a small, limited amount, and are interchangeable here, with にすぎない sounding slightly more formal.",
                    "translationMn": "Энэ бол зөвхөн нэг жишээ л юм.",
                    "explanationMn": "にすぎない болон だけだ хоёулаа ямар нэг зүйлийг зөвхөн бага, хязгаарлагдмал хэмжээ гэж бууруулдаг бөгөөд энд сольж хэрэглэгдэх боломжтой, にすぎない нь бага зэрэг илүү албан ёсны сонстог."
                },
                {
                    "prefix": "そんなことはわざわざ<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>う",
                    "old": "までもない",
                    "new": "<ruby>必要<rp>(</rp><rt>ひつよう</rt><rp>)</rp></ruby>はない",
                    "suffix": "。",
                    "translation": "There's no need to even mention such a thing.",
                    "explanation": "までもない and 必要はない both say an action isn't necessary given how obvious or minor it is, but までもない specifically implies the action would be excessive, not just optional.",
                    "translationMn": "Ийм зүйлийг дурдах ч хэрэггүй.",
                    "explanationMn": "までもない болон 必要はない хоёулаа үйлдэл хэр тодорхой буюу бага ач холбогдолтойг харгалзан шаардлагагүй гэдгийг хэлдэг ч までもない нь тухайлбал үйлдэл нь заавал сонголт биш, хэтрүүлэг байх болно гэдгийг илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>周囲<rp>(</rp><rt>しゅうい</rt><rp>)</rp></ruby>の<ruby>協力<rp>(</rp><rt>きょうりょく</rt><rp>)</rp></ruby>",
                    "old": "なくして",
                    "new": "がなければ",
                    "suffix": "、このプロジェクトの<ruby>成功<rp>(</rp><rt>せいこう</rt><rp>)</rp></ruby>はなかった。",
                    "translation": "Without everyone's cooperation, this project would not have succeeded.",
                    "explanation": "なくして and がなければ both state that without a crucial factor an outcome would be impossible, but なくして is a formal, literary way to say \"without.\"",
                    "translationMn": "Бүгдийн хамтын хүчингүйгээр энэ төсөл амжилттай болохгүй байсан.",
                    "explanationMn": "なくして болон がなければ хоёулаа гол хүчин зүйлгүйгээр үр дүн боломжгүй байх болно гэдгийг мэдэгддэг ч なくして нь \"-гүйгээр\" гэдгийг хэлэх албан ёсны, утга зохиолын арга юм."
                },
                {
                    "prefix": "<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>は<ruby>本人<rp>(</rp><rt>ほんにん</rt><rp>)</rp></ruby>の<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>",
                    "old": "いかんで",
                    "new": "<ruby>次第<rp>(</rp><rt>しだい</rt><rp>)</rp></ruby>で",
                    "suffix": "<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きく<ruby>変<rp>(</rp><rt>か</rt><rp>)</rp></ruby>わる。",
                    "translation": "The outcome can change greatly depending on the person's own effort.",
                    "explanation": "いかんで and 次第で both say a result depends on a preceding factor, with いかんで being the more formal, written equivalent of 次第で.",
                    "translationMn": "Үр дүн нь хүн бүрийн хичээл зүтгэлээс шалтгаалан ихээхэн өөрчлөгдөж болно.",
                    "explanationMn": "いかんで болон 次第で хоёулаа үр дүн нь өмнөх хүчин зүйлээс хамаарна гэдгийг хэлдэг бөгөөд いかんで нь 次第で-ийн илүү албан ёсны, бичгийн тэнцвэр юм."
                },
                {
                    "prefix": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>周囲<rp>(</rp><rt>しゅうい</rt><rp>)</rp></ruby>の<ruby>批判<rp>(</rp><rt>ひはん</rt><rp>)</rp></ruby>",
                    "old": "をものともせず",
                    "new": "にもまけず",
                    "suffix": "、<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby>の<ruby>信<rp>(</rp><rt>しん</rt><rp>)</rp></ruby>じる<ruby>道<rp>(</rp><rt>みち</rt><rp>)</rp></ruby>を<ruby>進<rp>(</rp><rt>すす</rt><rp>)</rp></ruby>んだ。",
                    "translation": "Undaunted by the criticism around her, she pursued the path she believed in.",
                    "explanation": "をものともせず and にもまけず both describe pushing forward despite a hardship, but をものともせず is the more literary, emphatic phrase praising someone's resilience.",
                    "translationMn": "Эргэн тойрны шүүмжлэлд сэтгэл эмзэглэлгүйгээр тэр өөрийн итгэсэн замаар явсан.",
                    "explanationMn": "をものともせず болон にもまけず хоёулаа бэрхшээлийг үл харгалзан урагшлахыг тодорхойлдог ч をものともせず нь хэн нэгний тэсвэрлэх чадварыг магтдаг илүү утга зохиолын, онцолсон хэллэг юм."
                },
                {
                    "prefix": "これまでの<ruby>調査<rp>(</rp><rt>ちょうさ</rt><rp>)</rp></ruby><ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>",
                    "old": "をふまえて",
                    "new": "を<ruby>考慮<rp>(</rp><rt>こうりょ</rt><rp>)</rp></ruby>して",
                    "suffix": "、<ruby>新<rp>(</rp><rt>あたら</rt><rp>)</rp></ruby>しい<ruby>方針<rp>(</rp><rt>ほうしん</rt><rp>)</rp></ruby>を<ruby>決定<rp>(</rp><rt>けってい</rt><rp>)</rp></ruby>した。",
                    "translation": "Taking the survey results so far into account, we decided on a new policy.",
                    "explanation": "をふまえて and を考慮して both mean \"taking X into account,\" and are close to interchangeable, with をふまえて slightly favored in formal reports and speeches.",
                    "translationMn": "Одоог хүртэлх судалгааны үр дүнг харгалзан шинэ бодлого гаргахаар шийдсэн.",
                    "explanationMn": "をふまえて болон を考慮して хоёулаа \"X-ийг харгалзан үзэх\" гэсэн утгатай бөгөөд бараг сольж хэрэглэгддэг, をふまえて нь албан ёсны тайлан, илтгэлд бага зэрэг илүү давуу тал эзэлдэг."
                },
                {
                    "prefix": "<ruby>新<rp>(</rp><rt>あたら</rt><rp>)</rp></ruby>しい<ruby>税制<rp>(</rp><rt>ぜいせい</rt><rp>)</rp></ruby>",
                    "old": "をめぐって",
                    "new": "について",
                    "suffix": "、<ruby>国会<rp>(</rp><rt>こっかい</rt><rp>)</rp></ruby>で<ruby>激<rp>(</rp><rt>はげ</rt><rp>)</rp></ruby>しい<ruby>議論<rp>(</rp><rt>ぎろん</rt><rp>)</rp></ruby>が<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>いている。",
                    "translation": "Fierce debate continues in the Diet over the new tax system.",
                    "explanation": "をめぐって and について both mark the topic under discussion, but をめぐって specifically highlights that opinions are clashing around it, matching the \"debate\" context here.",
                    "translationMn": "Шинэ татварын систем эргэн тойронд парламентад ширүүн маргаан үргэлжилж байна.",
                    "explanationMn": "をめぐって болон について хоёулаа хэлэлцэж буй сэдвийг заадаг ч をめぐって нь тухайлбал үзэл бодол мөргөлдөж буйг онцолдог бөгөөд энэ нь \"маргаан\"-ы контекстэд энд тохирдог."
                },
                {
                    "prefix": "<ruby>事実<rp>(</rp><rt>じじつ</rt><rp>)</rp></ruby>",
                    "old": "にそくして",
                    "new": "に<ruby>基<rp>(</rp><rt>もと</rt><rp>)</rp></ruby>づいて",
                    "suffix": "、<ruby>報告書<rp>(</rp><rt>ほうこくしょ</rt><rp>)</rp></ruby>を<ruby>作成<rp>(</rp><rt>さくせい</rt><rp>)</rp></ruby>してください。",
                    "translation": "Please prepare the report based on the facts.",
                    "explanation": "にそくして and に基づいて both mean \"in line with / based on X,\" but にそくして stresses staying faithful to a standard or reality, while に基づいて is the more general \"based on.\"",
                    "translationMn": "Баримт нотолгоонд үндэслэн тайланг бэлдэнэ үү.",
                    "explanationMn": "にそくして болон に基づいて хоёулаа \"X-тэй нийцүүлэн / үндэслэн\" гэсэн утгатай ч にそくして нь стандарт буюу бодит байдалд үнэнч байхыг онцолдог бол に基づいて нь илүү ерөнхий \"үндэслэн\" гэсэн утга юм."
                }
            ]
        },
        {
            "level": 5,
            "title": "Advanced · Level 5",
            "sentences": [
                {
                    "prefix": "<ruby>開会式<rp>(</rp><rt>かいかいしき</rt><rp>)</rp></ruby>",
                    "old": "にさきだち",
                    "new": "の<ruby>前<rp>(</rp><rt>まえ</rt><rp>)</rp></ruby>に",
                    "suffix": "、<ruby>選手<rp>(</rp><rt>せんしゅ</rt><rp>)</rp></ruby>たちが<ruby>入場<rp>(</rp><rt>にゅうじょう</rt><rp>)</rp></ruby>した。",
                    "translation": "Prior to the opening ceremony, the athletes entered.",
                    "explanation": "にさきだち and の前に both mean \"before X,\" but にさきだち is a formal, written phrase typically used for official events and ceremonies.",
                    "translationMn": "Нээлтийн ёслолын өмнө тамирчид орж ирсэн.",
                    "explanationMn": "にさきだち болон の前に хоёулаа \"X-ийн өмнө\" гэсэн утгатай ч にさきだち нь ихэвчлэн албан ёсны арга хэмжээ, ёслолд ашиглагддаг албан ёсны, бичгийн хэллэг юм."
                },
                {
                    "prefix": "<ruby>好調<rp>(</rp><rt>こうちょう</rt><rp>)</rp></ruby>な<ruby>天候<rp>(</rp><rt>てんこう</rt><rp>)</rp></ruby>が<ruby>観光客<rp>(</rp><rt>かんこうきゃく</rt><rp>)</rp></ruby>の<ruby>増加<rp>(</rp><rt>ぞうか</rt><rp>)</rp></ruby>",
                    "old": "とあいまって",
                    "new": "と<ruby>重<rp>(</rp><rt>かさ</rt><rp>)</rp></ruby>なって",
                    "suffix": "、<ruby>町<rp>(</rp><rt>まち</rt><rp>)</rp></ruby>は<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>いに<ruby>賑<rp>(</rp><rt>にぎ</rt><rp>)</rp></ruby>わった。",
                    "translation": "The good weather, combined with the rise in tourists, made the town bustle greatly.",
                    "explanation": "とあいまって and と重なって both describe two factors combining to amplify an effect, with とあいまって being the more formal, written phrasing.",
                    "translationMn": "Сайхан цаг агаар аялагчдын өсөлттэй хослон хотыг ихэд амьд болгосон.",
                    "explanationMn": "とあいまって болон と重なって хоёулаа хоёр хүчин зүйл нийлж нөлөөг өсгөхийг тодорхойлдог бөгөөд とあいまって нь илүү албан ёсны, бичгийн хэллэг юм."
                },
                {
                    "prefix": "<ruby>子供<rp>(</rp><rt>こども</rt><rp>)</rp></ruby>が<ruby>生<rp>(</rp><rt>う</rt><rp>)</rp></ruby>まれて",
                    "old": "からというもの",
                    "new": "<ruby>以来<rp>(</rp><rt>いらい</rt><rp>)</rp></ruby>",
                    "suffix": "、<ruby>生活<rp>(</rp><rt>せいかつ</rt><rp>)</rp></ruby>が<ruby>一変<rp>(</rp><rt>いっぺん</rt><rp>)</rp></ruby>した。",
                    "translation": "Ever since our child was born, our life has completely changed.",
                    "explanation": "てからというもの and て以来 both mark a lasting change starting from a point in time, but てからというもの emphasizes the continuing impact more emotively.",
                    "oldCore": "てからというもの",
                    "translationMn": "Хүүхэдтэй болсноос хойш бидний амьдрал бүрмөсөн өөрчлөгдсөн.",
                    "explanationMn": "てからというもの болон て以来 хоёулаа тодорхой цаг мөчөөс эхэлсэн урт хугацааны өөрчлөлтийг заадаг ч てからというもの нь үргэлжилж буй нөлөөллийг илүү сэтгэл хөдлөлтэйгээр онцолдог."
                },
                {
                    "prefix": "<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>さら<ruby>後悔<rp>(</rp><rt>こうかい</rt><rp>)</rp></ruby>し",
                    "old": "たところで",
                    "new": "ても",
                    "suffix": "、<ruby>時間<rp>(</rp><rt>じかん</rt><rp>)</rp></ruby>は<ruby>戻<rp>(</rp><rt>もど</rt><rp>)</rp></ruby>らない。",
                    "translation": "Even if you regret it now, time won't turn back.",
                    "explanation": "たところで and ても both mean \"even if,\" but たところで adds the nuance that doing so would be futile and change nothing.",
                    "translationMn": "Одоо харамссан ч цаг хугацаа ухарч эргэхгүй.",
                    "explanationMn": "たところで болон ても хоёулаа \"хэдийгээр...ч\" гэсэн утгатай ч たところで нь тэгсэн ч дэмий, юу ч өөрчлөгдөхгүй гэсэн нюансыг нэмдэг."
                },
                {
                    "prefix": "<ruby>家<rp>(</rp><rt>いえ</rt><rp>)</rp></ruby>を<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>た",
                    "old": "とたんに",
                    "new": "かとおもうと",
                    "suffix": "、<ruby>雨<rp>(</rp><rt>あめ</rt><rp>)</rp></ruby>が<ruby>降<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>り<ruby>出<rp>(</rp><rt>だ</rt><rp>)</rp></ruby>した。",
                    "translation": "The moment I stepped out of the house, it started to rain.",
                    "explanation": "たとたんに and かとおもうと both describe two events happening in near-immediate succession, with かとおもうと adding a touch of surprise at the abruptness.",
                    "oldCore": "たとたん",
                    "translationMn": "Гэрээсээ гарсан даруйдаа бороо орж эхэлсэн.",
                    "explanationMn": "たとたんに болон かとおもうと хоёулаа бараг зэрэг дараалан болсон хоёр үйл явдлыг тодорхойлдог ч かとおもうと нь гэнэтийн байдалд бага зэрэг гайхшралыг нэмдэг."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>入<rp>(</rp><rt>はい</rt><rp>)</rp></ruby>るなり",
                    "new": "<ruby>入<rp>(</rp><rt>はい</rt><rp>)</rp></ruby>ったとたんに",
                    "suffix": "、<ruby>大声<rp>(</rp><rt>おおごえ</rt><rp>)</rp></ruby>で<ruby>叫<rp>(</rp><rt>さけ</rt><rp>)</rp></ruby>んだ。",
                    "translation": "The moment he entered the room, he shouted loudly.",
                    "explanation": "なり and たとたんに both mark an action immediately followed by another, but なり is a literary form that attaches to the dictionary form of the verb.",
                    "oldCore": "なり",
                    "newCore": "たとたん",
                    "translationMn": "Тэр өрөөнд орсон даруйдаа чанга орилсон.",
                    "explanationMn": "なり болон たとたんに хоёулаа нэг үйлдлийг нөгөө нь шууд дагасныг заадаг ч なり нь үйл үгийн толь бичгийн хэлбэрт залгагддаг утга зохиолын хэлбэр юм."
                },
                {
                    "prefix": "<ruby>片付<rp>(</rp><rt>かたづ</rt><rp>)</rp></ruby>ける",
                    "old": "そばから",
                    "new": "たびに",
                    "suffix": "、<ruby>子供<rp>(</rp><rt>こども</rt><rp>)</rp></ruby>がまた<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>を<ruby>散<rp>(</rp><rt>ち</rt><rp>)</rp></ruby>らかす。",
                    "translation": "Every time I tidy up, the kids mess up the room again right after.",
                    "explanation": "そばから and たびに both describe an action that immediately repeats every time another finishes, but そばから specifically stresses how frustratingly quick the repetition is.",
                    "translationMn": "Би цэвэрлэх бүрдээ хүүхдүүд өрөөг дахин эмх замбараагүй болгодог.",
                    "explanationMn": "そばから болон たびに хоёулаа нэг үйлдэл дуусах бүрд шууд давтагддаг өөр үйлдлийг тодорхойлдог ч そばから нь давталт хэр хурдан, бухимдуулам болохыг онцлон тэмдэглэдэг."
                },
                {
                    "prefix": "この<ruby>曲<rp>(</rp><rt>きょく</rt><rp>)</rp></ruby>を<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>く",
                    "old": "につけ",
                    "new": "たびに",
                    "suffix": "、<ruby>学生時代<rp>(</rp><rt>がくせいじだい</rt><rp>)</rp></ruby>を<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>い<ruby>出<rp>(</rp><rt>だ</rt><rp>)</rp></ruby>す。",
                    "translation": "Every time I hear this song, I remember my school days.",
                    "explanation": "につけ and たびに both mean \"every time X happens, Y follows,\" and are largely interchangeable, with につけ favored in slightly more reflective, literary contexts.",
                    "translationMn": "Энэ дууг сонсох бүрдээ сургуулийн үеэ санадаг.",
                    "explanationMn": "につけ болон たびに хоёулаа \"X болох бүрд Y дагадаг\" гэсэн утгатай бөгөөд ихэвчлэн сольж хэрэглэгддэг, につけ нь бага зэрэг илүү эргэцүүлэлт, утга зохиолын контекстэд давуу тал эзэлдэг."
                },
                {
                    "prefix": "この<ruby>厳<rp>(</rp><rt>きび</rt><rp>)</rp></ruby>しい<ruby>経済<rp>(</rp><rt>けいざい</rt><rp>)</rp></ruby><ruby>状況<rp>(</rp><rt>じょうきょう</rt><rp>)</rp></ruby>",
                    "old": "にあって",
                    "new": "において",
                    "suffix": "、<ruby>企業<rp>(</rp><rt>きぎょう</rt><rp>)</rp></ruby>は<ruby>生<rp>(</rp><rt>い</rt><rp>)</rp></ruby>き<ruby>残<rp>(</rp><rt>のこ</rt><rp>)</rp></ruby>りをかけている。",
                    "translation": "Amid these harsh economic conditions, companies are fighting to survive.",
                    "explanation": "にあって and において both mark the circumstance or setting something takes place in, but にあって specifically stresses being situated within a difficult or special condition.",
                    "translationMn": "Энэ хатуу ширүүн эдийн засгийн нөхцөлд компаниуд амьд үлдэхийн төлөө тэмцэж байна.",
                    "explanationMn": "にあって болон において хоёулаа ямар нэг зүйл болж буй нөхцөл байдал буюу орчныг заадаг ч にあって нь тухайлбал хүнд буюу онцгой нөхцөлд байрлаж буйг онцолдог."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>借金<rp>(</rp><rt>しゃっきん</rt><rp>)</rp></ruby>を",
                    "old": "してまで",
                    "new": "するまでして",
                    "suffix": "、<ruby>新<rp>(</rp><rt>あたら</rt><rp>)</rp></ruby>しい<ruby>事業<rp>(</rp><rt>じぎょう</rt><rp>)</rp></ruby>を<ruby>始<rp>(</rp><rt>はじ</rt><rp>)</rp></ruby>めた。",
                    "translation": "He started a new business, even going so far as to take on debt.",
                    "explanation": "てまで and までして both stress that someone went to an extreme, often distasteful, length to achieve something, and are interchangeable in this pattern.",
                    "oldCore": "てまで",
                    "translationMn": "Тэр өртэй болохоос ч буцахгүйгээр шинэ бизнес эхлүүлсэн.",
                    "explanationMn": "てまで болон までして хоёулаа хэн нэгэн туйлширсан, ихэвчлэн тааламжгүй хэмжээнд хүрч ямар нэг зүйлд хүрсэнийг онцолдог бөгөөд энэ загварт сольж хэрэглэгддэг."
                }
            ]
        },
        {
            "level": 6,
            "title": "Advanced · Level 6",
            "sentences": [
                {
                    "prefix": "これはベテラン<ruby>職人<rp>(</rp><rt>しょくにん</rt><rp>)</rp></ruby>",
                    "old": "ならではの",
                    "new": "にしかできない",
                    "suffix": "<ruby>技<rp>(</rp><rt>わざ</rt><rp>)</rp></ruby>だ。",
                    "translation": "This is a skill only a veteran craftsman can pull off.",
                    "explanation": "ならでは and にしかできない both credit an ability as uniquely possible because of who or what it belongs to, but ならでは is the more compact, idiomatic way of praising that uniqueness.",
                    "oldCore": "ならでは",
                    "translationMn": "Энэ бол зөвхөн туршлагатай гар урчин л хийж чадах ур чадвар юм.",
                    "explanationMn": "ならでは болон にしかできない хоёулаа чадварыг зөвхөн эзэмшигчид нь боломжтой гэж баталдаг ч ならでは нь тэр өвөрмөц байдлыг магтах илүү товч, хэлц үгийн арга юм."
                },
                {
                    "prefix": "この<ruby>試合<rp>(</rp><rt>しあい</rt><rp>)</rp></ruby>、<ruby>一瞬<rp>(</rp><rt>いっしゅん</rt><rp>)</rp></ruby>",
                    "old": "たりとも",
                    "new": "も",
                    "suffix": "<ruby>気<rp>(</rp><rt>き</rt><rp>)</rp></ruby>を<ruby>抜<rp>(</rp><rt>ぬ</rt><rp>)</rp></ruby>けない。",
                    "translation": "In this match, I can't let my guard down even for a moment.",
                    "explanation": "たりとも and も both emphasize \"not even a single, tiny amount\" in a negative sentence, but たりとも is a stronger, more literary intensifier.",
                    "translationMn": "Энэ тэмцээнд агшин зуур ч гэсэн болгоомжоо алдаж болохгүй.",
                    "explanationMn": "たりとも болон も хоёулаа сөрөг өгүүлбэрт \"нэг ч бага зэрэг хэмжээ хүртэл\" гэдгийг онцолдог ч たりとも нь илүү хүчтэй, утга зохиолын хүчлэгч юм."
                },
                {
                    "prefix": "<ruby>結局<rp>(</rp><rt>けっきょく</rt><rp>)</rp></ruby>、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>にお<ruby>礼<rp>(</rp><rt>れい</rt><rp>)</rp></ruby>を<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>え",
                    "old": "ずじまいだった",
                    "new": "ないままだった",
                    "suffix": "。",
                    "translation": "In the end, I never got the chance to thank him.",
                    "explanation": "ずじまい and ないまま both mark that an intended action was never carried out, but ずじまい specifically conveys a lingering sense of regret at the missed opportunity.",
                    "oldCore": "ずじまい",
                    "translationMn": "Эцэст нь түүнд талархал илэрхийлэх боломж гарсангүй.",
                    "explanationMn": "ずじまい болон ないまま хоёулаа зорьсон үйлдэл хэзээ ч хийгдээгүйг тэмдэглэдэг ч ずじまい нь алдагдсан боломжид тодорхой удаан үргэлжлэх харамслыг илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>事前<rp>(</rp><rt>じぜん</rt><rp>)</rp></ruby>の<ruby>連絡<rp>(</rp><rt>れんらく</rt><rp>)</rp></ruby>",
                    "old": "なしに",
                    "new": "なくして",
                    "suffix": "、<ruby>訪問<rp>(</rp><rt>ほうもん</rt><rp>)</rp></ruby>するのは<ruby>失礼<rp>(</rp><rt>しつれい</rt><rp>)</rp></ruby>だ。",
                    "translation": "It's rude to visit without contacting someone beforehand.",
                    "explanation": "なしに and なくして both mean \"without doing X,\" and are near-interchangeable in written Japanese, with なくして sounding slightly more formal and literary.",
                    "translationMn": "Урьдчилан мэдэгдэлгүйгээр очих нь эелдэг бус хэрэг.",
                    "explanationMn": "なしに болон なくして хоёулаа \"X хийхгүйгээр\" гэсэн утгатай бөгөөд бичгийн япон хэлэнд бараг сольж хэрэглэгддэг, なくして нь бага зэрэг илүү албан ёсны, утга зохиолын сонстог."
                },
                {
                    "prefix": "<ruby>完全<rp>(</rp><rt>かんぜん</rt><rp>)</rp></ruby>に<ruby>解決<rp>(</rp><rt>かいけつ</rt><rp>)</rp></ruby>していない",
                    "old": "ものの",
                    "new": "とはいえ",
                    "suffix": "、<ruby>状況<rp>(</rp><rt>じょうきょう</rt><rp>)</rp></ruby>は<ruby>改善<rp>(</rp><rt>かいぜん</rt><rp>)</rp></ruby>しつつある。",
                    "translation": "Although it hasn't been fully resolved, the situation is improving.",
                    "explanation": "ものの and とはいえ both concede a negative fact before pivoting to a positive point, with とはいえ reading as slightly more formal and often introducing a firmer follow-up.",
                    "translationMn": "Бүрэн шийдэгдээгүй ч байдал сайжирч байна.",
                    "explanationMn": "ものの болон とはいえ хоёулаа сөрөг баримтыг хүлээн зөвшөөрсний дараа эерэг санаа руу шилждэг бөгөөд とはいえ нь бага зэрэг илүү албан ёсны сонсогдож, ихэвчлэн илүү хатуу дараагийн санааг танилцуулдаг."
                },
                {
                    "prefix": "<ruby>十分<rp>(</rp><rt>じゅうぶん</rt><rp>)</rp></ruby>な<ruby>証拠<rp>(</rp><rt>しょうこ</rt><rp>)</rp></ruby>がある",
                    "old": "にもかかわらず",
                    "new": "のに",
                    "suffix": "、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>容疑<rp>(</rp><rt>ようぎ</rt><rp>)</rp></ruby>を<ruby>否認<rp>(</rp><rt>ひにん</rt><rp>)</rp></ruby>し<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>けている。",
                    "translation": "Even though there is sufficient evidence, he continues to deny the allegations.",
                    "explanation": "にもかかわらず and のに again mark this same unexpected concession, but here the formal register of にもかかわらず suits the news-report tone of the sentence.",
                    "translationMn": "Хангалттай нотолгоо байгаа ч тэр буруутгалыг үргэлжлүүлэн үгүйсгэсээр байна.",
                    "explanationMn": "にもかかわらず болон のに дахин ижил гэнэтийн зөвшилцлийг заадаг ч энд にもかかわらず-ийн албан ёсны хэв маяг өгүүлбэрийн мэдээллийн өнгөтэй сайн тохирдог."
                },
                {
                    "prefix": "<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby>では<ruby>何<rp>(</rp><rt>なに</rt><rp>)</rp></ruby>もしない",
                    "old": "くせに",
                    "new": "のに",
                    "suffix": "、<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>には<ruby>文句<rp>(</rp><rt>もんく</rt><rp>)</rp></ruby>ばかり<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>う。",
                    "translation": "Even though he doesn't do anything himself, he's always complaining about others.",
                    "explanation": "くせに and のに both mark concession, but くせに keeps its pointed, critical edge here, underscoring the speaker's irritation at the hypocrisy.",
                    "translationMn": "Өөрөө юу ч хийдэггүй атлаа тэр байнга бусдыг шүүмжилдэг.",
                    "explanationMn": "くせに болон のに хоёулаа зөвшилцлийг заадаг ч くせに нь энд өнөр шүүмжлэлийн ирмэгээ хадгалж, илэрхийлэгчийн хоёр нүүрч байдалд бухимдсаныг онцолдог."
                },
                {
                    "prefix": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>一流<rp>(</rp><rt>いちりゅう</rt><rp>)</rp></ruby><ruby>大学<rp>(</rp><rt>だいがく</rt><rp>)</rp></ruby><ruby>出身<rp>(</rp><rt>しゅっしん</rt><rp>)</rp></ruby>な",
                    "old": "だけあって",
                    "new": "だけに",
                    "suffix": "、<ruby>知識<rp>(</rp><rt>ちしき</rt><rp>)</rp></ruby>が<ruby>豊富<rp>(</rp><rt>ほうふ</rt><rp>)</rp></ruby>だ。",
                    "translation": "Since she's from a top university, she's very knowledgeable.",
                    "explanation": "だけあって and だけに again link a fitting result to its reason; restated here to reinforce that だけあって needs a positive, expectation-matching result while だけに also tolerates a negative or ironic one.",
                    "translationMn": "Тэргүүлэх их сургуулийг төгссөн учраас тэр их мэдлэгтэй.",
                    "explanationMn": "だけあって болон だけに дахин тохирсон үр дүнг шалтгаантай нь холбодог; энд だけあって нь эерэг, хүлээлттэй нийцсэн үр дүн шаарддаг бол だけに нь сөрөг буюу инээдтэй үр дүнг ч тэвчдэгийг бататгахын тулд дахин хэлэв."
                },
                {
                    "prefix": "この<ruby>計画<rp>(</rp><rt>けいかく</rt><rp>)</rp></ruby>は<ruby>成功<rp>(</rp><rt>せいこう</rt><rp>)</rp></ruby>する",
                    "old": "どころか",
                    "new": "はおろか",
                    "suffix": "、<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きな<ruby>損失<rp>(</rp><rt>そんしつ</rt><rp>)</rp></ruby>を<ruby>生<rp>(</rp><rt>う</rt><rp>)</rp></ruby>んだ。",
                    "translation": "Far from succeeding, this plan produced a huge loss.",
                    "explanation": "どころか and はおろか both reject a modest possibility to emphasize a far more extreme reality, restated here in a business context to show the pattern's range.",
                    "translationMn": "Амжилт олохгүй байтугай энэ төлөвлөгөө асар их алдагдал үүсгэсэн.",
                    "explanationMn": "どころか болон はおろか хоёулаа бага боломжийг үгүйсгэн илүү туйлширсан бодит байдлыг онцолдог бөгөөд энд бизнесийн контекстэд загварын хамрах хүрээг харуулахын тулд дахин хэлэв."
                },
                {
                    "prefix": "<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>の<ruby>経営<rp>(</rp><rt>けいえい</rt><rp>)</rp></ruby>が<ruby>悪化<rp>(</rp><rt>あっか</rt><rp>)</rp></ruby>し、リストラを<ruby>進<rp>(</rp><rt>すす</rt><rp>)</rp></ruby>め",
                    "old": "ざるをえない",
                    "new": "ないわけにはいかない",
                    "suffix": "。",
                    "translation": "Since business is deteriorating, we have no choice but to proceed with restructuring.",
                    "explanation": "ざるをえない and ないわけにはいかない again describe an action forced by circumstances, restated in a corporate context to reinforce that either can head a formal statement of necessity.",
                    "translationMn": "Бизнес доройтож байгаа тул бүтцийн өөрчлөлт хийхээс өөр аргагүй.",
                    "explanationMn": "ざるをえない болон ないわけにはいかない дахин нөхцөл байдлаас болж хийхээс өөр аргагүй болсон үйлдлийг тодорхойлдог бөгөөд аль нь ч албан ёсны шаардлагын мэдэгдлийг эхлүүлж болохыг бататгахын тулд корпорацийн контекстэд дахин хэлэв."
                }
            ]
        },
        {
            "level": 7,
            "title": "Advanced · Level 7",
            "sentences": [
                {
                    "prefix": "この<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>は<ruby>社員<rp>(</rp><rt>しゃいん</rt><rp>)</rp></ruby>",
                    "old": "あっての<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>だ",
                    "new": "のおかげで<ruby>成<rp>(</rp><rt>な</rt><rp>)</rp></ruby>り<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>っている",
                    "suffix": "。",
                    "translation": "This company exists only because of its employees.",
                    "explanation": "あっての and のおかげで both credit something's very existence or success to an essential factor, but あっての is a more compact, emphatic noun-modifying pattern meaning \"only possible thanks to.\"",
                    "oldCore": "あっての",
                    "translationMn": "Энэ компани зөвхөн ажилтнуудынхаа ачаар оршин тогтнож байна.",
                    "explanationMn": "あっての болон のおかげで хоёулаа ямар нэг зүйлийн оршин тогтнол буюу амжилтыг чухал хүчин зүйлд тооцдог ч あっての нь \"зөвхөн ...-ийн ачаар л боломжтой\" гэсэн илүү товч, онцолсон нэр үг өөрчлөгч загвар юм."
                },
                {
                    "prefix": "<ruby>散歩<rp>(</rp><rt>さんぽ</rt><rp>)</rp></ruby>",
                    "old": "がてら",
                    "new": "のついでに",
                    "suffix": "、<ruby>郵便局<rp>(</rp><rt>ゆうびんきょく</rt><rp>)</rp></ruby>に<ruby>寄<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>った。",
                    "translation": "I stopped by the post office while out on a walk.",
                    "explanation": "がてら and ついでに both describe doing one thing while taking the opportunity to also do another, and are close to interchangeable, with がてら sounding slightly more literary.",
                    "translationMn": "Алхаж яваад шуудангийн газраар орж гарлаа.",
                    "explanationMn": "がてら болон ついでに хоёулаа нэг зүйл хийхдээ өөр нэг зүйлийг хийх боломжийг ашиглахыг тодорхойлдог бөгөөд бараг сольж хэрэглэгддэг, がてら нь бага зэрэг илүү утга зохиолын сонстог."
                },
                {
                    "prefix": "<ruby>忙<rp>(</rp><rt>いそが</rt><rp>)</rp></ruby>しいが、<ruby>手伝<rp>(</rp><rt>てつだ</rt><rp>)</rp></ruby>う<ruby>時間<rp>(</rp><rt>じかん</rt><rp>)</rp></ruby>が",
                    "old": "なくはない",
                    "new": "ないこともない",
                    "suffix": "。",
                    "translation": "I'm busy, but it's not that I have no time to help at all.",
                    "explanation": "なくはない and ないこともない both use a double negative to hedge a weak possibility, and are essentially interchangeable ways of saying \"it's not entirely impossible.\"",
                    "translationMn": "Би завгүй ч тусалж чадахгүй гэсэн үг огт биш.",
                    "explanationMn": "なくはない болон ないこともない хоёулаа сул боломжийг зөөлрүүлэхийн тулд давхар үгүйсгэл ашигладаг бөгөөд \"бүрмөсөн боломжгүй биш\" гэдгийг хэлэх үндсэндээ сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "<ruby>台風<rp>(</rp><rt>たいふう</rt><rp>)</rp></ruby>の<ruby>影響<rp>(</rp><rt>えいきょう</rt><rp>)</rp></ruby>で、イベントは",
                    "old": "<ruby>中止<rp>(</rp><rt>ちゅうし</rt><rp>)</rp></ruby>を<ruby>余儀<rp>(</rp><rt>よぎ</rt><rp>)</rp></ruby>なくされた",
                    "new": "<ruby>中止<rp>(</rp><rt>ちゅうし</rt><rp>)</rp></ruby>せざるをえなかった",
                    "suffix": "。",
                    "translation": "Due to the typhoon, the event was forced to be cancelled.",
                    "explanation": "を余儀なくされる and ざるをえない both express being forced into an unwanted action by circumstances, but を余儀なくされる frames it more objectively as something imposed from outside, while ざるをえない reads more like the subject's own reluctant judgment.",
                    "oldCore": "を余儀なくされる",
                    "translationMn": "Тайфуны улмаас арга хэмжээг албадан цуцаллаа.",
                    "explanationMn": "を余儀なくされる болон ざるをえない хоёулаа нөхцөл байдлаас болж хүсээгүй үйлдэлд хүчээр татагдсаныг илэрхийлдэг ч を余儀なくされる нь гадны хүчээр тулгагдсан зүйл мэт илүү бодитоор харуулдаг бол ざるをえない нь өгүүлэгчийн өөрийн дурамжхан дүгнэлт мэт сонсогддог."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は「もう<ruby>帰<rp>(</rp><rt>かえ</rt><rp>)</rp></ruby>れ」",
                    "old": "とばかりに",
                    "new": "というように",
                    "suffix": "、ドアを<ruby>指<rp>(</rp><rt>ゆび</rt><rp>)</rp></ruby>さした。",
                    "translation": "As if to say \"just leave already,\" he pointed at the door.",
                    "explanation": "とばかりに and というように both describe a wordless action that strongly implies an unspoken message, with とばかりに carrying a more vivid, almost theatrical nuance.",
                    "translationMn": "\"Гарчих\" гэж хэлэх мэт тэр хаалга руу заасан.",
                    "explanationMn": "とばかりに болон というように хоёулаа хэлээгүй мэдээллийг хүчтэй агуулсан үггүй үйлдлийг тодорхойлдог бөгөөд とばかりに нь илүү тод, театрлаг нюансыг агуулдаг."
                },
                {
                    "prefix": "<ruby>天気<rp>(</rp><rt>てんき</rt><rp>)</rp></ruby>が<ruby>良<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>かった",
                    "old": "こともあって",
                    "new": "からか",
                    "suffix": "、<ruby>公園<rp>(</rp><rt>こうえん</rt><rp>)</rp></ruby>は<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>くの<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>で<ruby>賑<rp>(</rp><rt>にぎ</rt><rp>)</rp></ruby>わった。",
                    "translation": "Perhaps because the weather was nice, the park was bustling with lots of people.",
                    "explanation": "こともあって and からか both suggest a plausible contributing reason without claiming it's the sole cause, though こともあって is more matter-of-fact while からか adds a note of the speaker's own guesswork.",
                    "translationMn": "Цаг агаар сайхан байсантай холбоотой байх, цэцэрлэгт хүрээлэн олон хүнээр дүүрэн байлаа.",
                    "explanationMn": "こともあって болон からか хоёулаа цорын ганц шалтгаан гэж мэдэгдэлгүйгээр итгэл төрүүлэм хувь нэмэр оруулсан шалтгааныг заадаг ч こともあって нь илүү бодит бол からか нь илэрхийлэгчийн өөрийн таамаглалын өнгийг нэмдэг."
                },
                {
                    "prefix": "<ruby>昨年<rp>(</rp><rt>さくねん</rt><rp>)</rp></ruby>の<ruby>赤字<rp>(</rp><rt>あかじ</rt><rp>)</rp></ruby>",
                    "old": "にひきかえ",
                    "new": "にくらべて",
                    "suffix": "、<ruby>今年<rp>(</rp><rt>ことし</rt><rp>)</rp></ruby>は<ruby>大幅<rp>(</rp><rt>おおはば</rt><rp>)</rp></ruby>な<ruby>黒字<rp>(</rp><rt>くろじ</rt><rp>)</rp></ruby>を<ruby>記録<rp>(</rp><rt>きろく</rt><rp>)</rp></ruby>した。",
                    "translation": "In contrast to last year's deficit, this year recorded a large surplus.",
                    "explanation": "にひきかえ and にくらべて again mark a contrast between two states, restated here in a financial context where にひきかえ underlines just how stark the reversal is.",
                    "translationMn": "Өнгөрсөн жилийн алдагдалтай харьцуулахад энэ жил их хэмжээний илүүдэл бүртгэгдсэн.",
                    "explanationMn": "にひきかえ болон にくらべて дахин хоёр байдлын хоорондох эсрэг байдлыг заадаг бөгөөд энд санхүүгийн контекстэд にひきかえ нь эргэлт хэр огцом болохыг онцлон харуулдаг."
                },
                {
                    "prefix": "この<ruby>統計<rp>(</rp><rt>とうけい</rt><rp>)</rp></ruby>は、<ruby>実態<rp>(</rp><rt>じったい</rt><rp>)</rp></ruby>を<ruby>過小評価<rp>(</rp><rt>かしょうひょうか</rt><rp>)</rp></ruby>",
                    "old": "するきらいがある",
                    "new": "しがちだ",
                    "suffix": "。",
                    "translation": "This statistic tends to underestimate the actual situation.",
                    "explanation": "きらいがある and がちだ both point out a recurring negative tendency, restated here for statistical bias rather than personal character, showing がちだ's broader everyday applicability.",
                    "oldCore": "きらいがある",
                    "translationMn": "Энэ статистик бодит байдлыг бага үнэлэх хандлагатай.",
                    "explanationMn": "きらいがある болон がちだ хоёулаа давтагдах сөрөг хандлагыг тэмдэглэдэг бөгөөд энд хувийн зан чанар биш статистикийн хазайлтад зориулж дахин хэлэгдсэн нь がちだ-ийн өдөр тутмын өргөн хэрэглээг харуулж байна."
                },
                {
                    "prefix": "この<ruby>改革<rp>(</rp><rt>かいかく</rt><rp>)</rp></ruby>が<ruby>実現<rp>(</rp><rt>じつげん</rt><rp>)</rp></ruby>したのは、<ruby>市民<rp>(</rp><rt>しみん</rt><rp>)</rp></ruby>の<ruby>後押<rp>(</rp><rt>あとお</rt><rp>)</rp></ruby>しがあったから",
                    "old": "にほかならない",
                    "new": "だ",
                    "suffix": "。",
                    "translation": "The reason this reform came about is simply that the citizens pushed for it.",
                    "explanation": "にほかならない and plain だ again assert a definitive, sole reason, restated here in a civic context to show the pattern applies just as well to social and political explanations.",
                    "translationMn": "Энэ шинэчлэл гарсны шалтгаан бол иргэдийн шаардлагад л оршино.",
                    "explanationMn": "にほかならない болон энгийн だ дахин тодорхой, цорын ганц шалтгааныг батладаг бөгөөд иргэний контекстэд дахин хэлэгдсэн нь энэ загвар нийгэм, улс төрийн тайлбарт ч сайн тохирдогийг харуулж байна."
                },
                {
                    "prefix": "<ruby>治療<rp>(</rp><rt>ちりょう</rt><rp>)</rp></ruby>の<ruby>効果<rp>(</rp><rt>こうか</rt><rp>)</rp></ruby>は<ruby>患者<rp>(</rp><rt>かんじゃ</rt><rp>)</rp></ruby>の<ruby>体質<rp>(</rp><rt>たいしつ</rt><rp>)</rp></ruby>",
                    "old": "いかんで",
                    "new": "<ruby>次第<rp>(</rp><rt>しだい</rt><rp>)</rp></ruby>で",
                    "suffix": "<ruby>異<rp>(</rp><rt>こと</rt><rp>)</rp></ruby>なる。",
                    "translation": "The effectiveness of the treatment differs depending on the patient's constitution.",
                    "explanation": "いかんで and 次第で again describe a result depending on a preceding factor, restated in a medical context where いかんで keeps the sentence at a suitably formal register.",
                    "translationMn": "Эмчилгээний үр нөлөө өвчтөний биеийн байдлаас шалтгаалан ялгаатай байдаг.",
                    "explanationMn": "いかんで болон 次第で дахин өмнөх хүчин зүйлээс хамаарсан үр дүнг тодорхойлдог бөгөөд эмнэлгийн контекстэд いかんで нь өгүүлбэрийг зохих албан ёсны хэв маягт байлгадаг."
                }
            ]
        },
        {
            "level": 8,
            "title": "Advanced · Level 8",
            "sentences": [
                {
                    "prefix": "<ruby>課長<rp>(</rp><rt>かちょう</rt><rp>)</rp></ruby>",
                    "old": "ともなると",
                    "new": "になると",
                    "suffix": "、<ruby>責任<rp>(</rp><rt>せきにん</rt><rp>)</rp></ruby>の<ruby>重<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>さが<ruby>違<rp>(</rp><rt>ちが</rt><rp>)</rp></ruby>う。",
                    "translation": "Once you become a section chief, the weight of your responsibilities is different.",
                    "explanation": "ともなると and になると both mark reaching a certain stage or status as a turning point for what follows, but ともなると carries extra emphasis on just how significant that stage is.",
                    "translationMn": "Тасгийн дарга болмогц хариуцлагын жин өөр болдог.",
                    "explanationMn": "ともなると болон になると хоёулаа тодорхой шат буюу байдалд хүрснийг дараагийн зүйлийн эргэлтийн цэг болгон заадаг ч ともなると нь тэр шат хэр чухал болохыг нэмж онцолдог."
                },
                {
                    "prefix": "<ruby>若<rp>(</rp><rt>わか</rt><rp>)</rp></ruby>い",
                    "old": "がゆえに",
                    "new": "から",
                    "suffix": "、<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きな<ruby>失敗<rp>(</rp><rt>しっぱい</rt><rp>)</rp></ruby>もした。",
                    "translation": "Because he was young, he also made some big mistakes.",
                    "explanation": "がゆえに and から both state a reason, but がゆえに is a literary, formal construction that lends the reasoning a more solemn, almost philosophical tone.",
                    "translationMn": "Залуу байсан учраас том алдаа ч гаргаж байсан.",
                    "explanationMn": "がゆえに болон から хоёулаа шалтгааныг заадаг ч がゆえに нь шалтгаанд илүү сүрлэг, гүн ухаанлаг өнгө нэмдэг утга зохиолын, албан ёсны бүтэц юм."
                },
                {
                    "prefix": "この<ruby>役目<rp>(</rp><rt>やくめ</rt><rp>)</rp></ruby>を<ruby>任<rp>(</rp><rt>まか</rt><rp>)</rp></ruby>せられるのは、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>",
                    "old": "をおいてほかにいない",
                    "new": "しかいない",
                    "suffix": "。",
                    "translation": "When it comes to who can be entrusted with this role, there's no one but him.",
                    "explanation": "をおいて(ほかに)ない and しかない both single out one option as the only real possibility, but をおいてほかにない is a more formal, emphatic way of praising someone as irreplaceable.",
                    "translationMn": "Энэ үүргийг хэнд итгэж болох гэвэл түүнээс өөр хэн ч байхгүй.",
                    "explanationMn": "をおいて(ほかに)ない болон しかない хоёулаа нэг сонголтыг цорын ганц бодит боломж гэж тодруулдаг ч をおいてほかにない нь хэн нэгнийг орлуулшгүй гэж магтах илүү албан ёсны, онцолсон арга юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>実力<rp>(</rp><rt>じつりょく</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わずもがなだ",
                    "new": "<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>うまでもない",
                    "suffix": "。",
                    "translation": "His skill goes without saying.",
                    "explanation": "言わずもがな and 言うまでもない both mean something is so obvious it need not be stated, with 言わずもがな being the more old-fashioned, literary phrasing.",
                    "newCore": "までもない",
                    "translationMn": "Түүний ур чадварын тухай дурдах ч хэрэггүй.",
                    "explanationMn": "言わずもがな болон 言うまでもない хоёулаа ямар нэг зүйл хэлэх шаардлагагүй тийм тодорхой гэдгийг илэрхийлдэг бөгөөд 言わずもがな нь илүү хуучинсаг, утга зохиолын хэллэг юм."
                },
                {
                    "prefix": "<ruby>子供<rp>(</rp><rt>こども</rt><rp>)</rp></ruby>のため",
                    "old": "とあれば",
                    "new": "なら",
                    "suffix": "、どんな<ruby>苦労<rp>(</rp><rt>くろう</rt><rp>)</rp></ruby>もいとわない。",
                    "translation": "If it's for my child, I won't shy away from any hardship.",
                    "explanation": "とあれば and なら both introduce a hypothetical condition that justifies going to great lengths, but とあれば is the more formal, written way of saying \"if it comes to X.\"",
                    "translationMn": "Хүүхдийнхээ төлөө бол ямар ч бэрхшээлээс би зайлсхийхгүй.",
                    "explanationMn": "とあれば болон なら хоёулаа туйлширсан хэмжээнд хүрэхийг зөвтгөх таамагласан нөхцлийг танилцуулдаг ч とあれば нь \"хэрэв X-д хүрвэл\" гэдгийг хэлэх илүү албан ёсны, бичгийн арга юм."
                },
                {
                    "prefix": "<ruby>少<rp>(</rp><rt>すこ</rt><rp>)</rp></ruby>し",
                    "old": "なりとも",
                    "new": "でも",
                    "suffix": "、お<ruby>役<rp>(</rp><rt>やく</rt><rp>)</rp></ruby>に<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>てれば<ruby>幸<rp>(</rp><rt>さいわ</rt><rp>)</rp></ruby>いです。",
                    "translation": "I would be glad if I could be of even a little help.",
                    "explanation": "なりとも and でも both mean \"even just a small amount,\" but なりとも is an old-fashioned, formal intensifier now mostly found in set humble phrases.",
                    "translationMn": "Бага ч атлаа тусалж чадвал баяртай байх болно.",
                    "explanationMn": "なりとも болон でも хоёулаа \"багахан хэмжээгээр ч гэсэн\" гэсэн утгатай ч なりとも нь одоо ихэвчлэн тогтмол даруу хэллэгт олддог хуучинсаг, албан ёсны хүчлэгч юм."
                },
                {
                    "prefix": "<ruby>日頃<rp>(</rp><rt>ひごろ</rt><rp>)</rp></ruby>のお<ruby>礼<rp>(</rp><rt>れい</rt><rp>)</rp></ruby>",
                    "old": "かたがた",
                    "new": "を<ruby>兼<rp>(</rp><rt>か</rt><rp>)</rp></ruby>ねて",
                    "suffix": "、ご<ruby>挨拶<rp>(</rp><rt>あいさつ</rt><rp>)</rp></ruby>に<ruby>伺<rp>(</rp><rt>うかが</rt><rp>)</rp></ruby>いました。",
                    "translation": "I came to pay my respects, also as a way of thanking you for your continued kindness.",
                    "explanation": "かたがた and を兼ねて both indicate that one action also serves a second purpose, but かたがた is a very formal, epistolary phrase mostly reserved for greetings and courtesy visits.",
                    "translationMn": "Байнгын анхаарал халамжид тань талархал илэрхийлэх зорилгоор ч мөргөж ирлээ.",
                    "explanationMn": "かたがた болон を兼ねて хоёулаа нэг үйлдэл хоёр дахь зорилгыг мөн гүйцэтгэдэгийг заадаг ч かたがた нь ихэвчлэн мэндчилгээ, ёслолын зочлолд зориулагдсан маш албан ёсны захидлын хэллэг юм."
                },
                {
                    "prefix": "<ruby>今回<rp>(</rp><rt>こんかい</rt><rp>)</rp></ruby>の<ruby>被害<rp>(</rp><rt>ひがい</rt><rp>)</rp></ruby>は、せいぜい<ruby>軽<rp>(</rp><rt>かる</rt><rp>)</rp></ruby>い<ruby>擦<rp>(</rp><rt>す</rt><rp>)</rp></ruby>り<ruby>傷<rp>(</rp><rt>きず</rt><rp>)</rp></ruby>",
                    "old": "というところだ",
                    "new": "<ruby>程度<rp>(</rp><rt>ていど</rt><rp>)</rp></ruby>だ",
                    "suffix": "。",
                    "translation": "The damage this time amounts to, at most, a minor scrape.",
                    "explanation": "というところだ and 程度だ both cap an estimate at a modest upper limit, and are close to interchangeable when giving a rough, unimpressive assessment.",
                    "translationMn": "Энэ удаагийн хохирол дээд тал нь бага зэргийн зурвас шарх төдий юм.",
                    "explanationMn": "というところだ болон 程度だ хоёулаа тооцоог даруухан дээд хязгаарт хязгаарлаж, ойролцоо, тийм ч гайхалтай биш үнэлгээ өгөхөд бараг сольж хэрэглэгддэг."
                },
                {
                    "prefix": "<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>は<ruby>明日<rp>(</rp><rt>あす</rt><rp>)</rp></ruby><ruby>提出<rp>(</rp><rt>ていしゅつ</rt><rp>)</rp></ruby>し",
                    "old": "てもさしつかえない",
                    "new": "てもいい",
                    "suffix": "。",
                    "translation": "It's fine even if you submit the materials tomorrow.",
                    "explanation": "てもさしつかえない and てもいい both grant permission, but てもさしつかえない is a more formal way of saying that something won't cause any problem.",
                    "translationMn": "Материалыг маргааш өгсөн ч болно.",
                    "explanationMn": "てもさしつかえない болон てもいい хоёулаа зөвшөөрөл өгдөг ч てもさしつかえない нь ямар нэг зүйл асуудал үүсгэхгүй гэдгийг илэрхийлэх илүү албан ёсны арга юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>提案<rp>(</rp><rt>ていあん</rt><rp>)</rp></ruby>には、<ruby>感謝<rp>(</rp><rt>かんしゃ</rt><rp>)</rp></ruby>",
                    "old": "こそすれ",
                    "new": "はしても",
                    "suffix": "、<ruby>不満<rp>(</rp><rt>ふまん</rt><rp>)</rp></ruby>はない。",
                    "translation": "I only feel grateful for his proposal, not dissatisfied in the least.",
                    "explanation": "〜こそすれ〜ない and 〜はしても〜ない both flatly deny a negative reaction while admitting only its positive opposite, but こそすれ is a fixed literary pattern reserved for firmly emphatic denials.",
                    "translationMn": "Түүний саналд би талархах л сэтгэлтэй байна, огт сэтгэл дундуур байхгүй.",
                    "explanationMn": "〜こそすれ〜ない болон 〜はしても〜ない хоёулаа сөрөг урвалыг тэс үгүйсгэж, зөвхөн эсрэг эерэг талыг хүлээн зөвшөөрдөг ч こそすれ нь хатуу, онцолсон үгүйсгэлд зориулсан тогтмол утга зохиолын загвар юм."
                }
            ]
        },
        {
            "level": 9,
            "title": "Advanced · Level 9",
            "sentences": [
                {
                    "prefix": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>にも",
                    "old": "<ruby>泣<rp>(</rp><rt>な</rt><rp>)</rp></ruby>かんばかりに",
                    "new": "<ruby>泣<rp>(</rp><rt>な</rt><rp>)</rp></ruby>きそうなほど",
                    "suffix": "、<ruby>深<rp>(</rp><rt>ふか</rt><rp>)</rp></ruby>く<ruby>頭<rp>(</rp><rt>あたま</rt><rp>)</rp></ruby>を<ruby>下<rp>(</rp><rt>さ</rt><rp>)</rp></ruby>げた。",
                    "translation": "She bowed deeply, as if about to burst into tears at any moment.",
                    "explanation": "んばかりに and そうなほど both describe an action performed so intensely it looks like another extreme state is about to happen, with んばかりに being the more literary, vivid choice.",
                    "translationMn": "Тэр яг л уйлах гэж байгаа мэт гүнзгий бөхийж мэхийв.",
                    "explanationMn": "んばかりに болон そうなほど хоёулаа өөр туйлширсан байдал болох гэж буй мэт хийгдсэн маш эрчимтэй үйлдлийг тодорхойлдог бөгөөд んばかりに нь илүү утга зохиолын, тод сонголт юм."
                },
                {
                    "prefix": "リーダー",
                    "old": "たるもの",
                    "new": "であるからには",
                    "suffix": "、<ruby>部下<rp>(</rp><rt>ぶか</rt><rp>)</rp></ruby>の<ruby>意見<rp>(</rp><rt>いけん</rt><rp>)</rp></ruby>にも<ruby>耳<rp>(</rp><rt>みみ</rt><rp>)</rp></ruby>を<ruby>傾<rp>(</rp><rt>かたむ</rt><rp>)</rp></ruby>けるべきだ。",
                    "translation": "As someone who is a leader, one should listen to the opinions of subordinates too.",
                    "explanation": "たるもの and であるからには both frame a duty as following naturally from one's status, but たるもの is a formal, old-fashioned noun-modifying pattern meaning \"as a true X should.\"",
                    "translationMn": "Удирдагч хүн бол харьяа ажилтнуудынхаа саналыг ч сонсох ёстой.",
                    "explanationMn": "たるもの болон であるからには хоёулаа үүргийг өөрийн байдлаас байгалиар гарч ирж буй мэт харуулдаг ч たるもの нь \"жинхэнэ X хэрхэн байх ёстой\" гэсэн утгатай албан ёсны, хуучинсаг нэр үг өөрчлөгч загвар юм."
                },
                {
                    "prefix": "この<ruby>川<rp>(</rp><rt>かわ</rt><rp>)</rp></ruby>で",
                    "old": "<ruby>泳<rp>(</rp><rt>およ</rt><rp>)</rp></ruby>ぐべからず",
                    "new": "<ruby>泳<rp>(</rp><rt>およ</rt><rp>)</rp></ruby>いではいけない",
                    "suffix": "。",
                    "translation": "You must not swim in this river.",
                    "explanation": "べからず and てはいけない both prohibit an action, but べからず is a stiff, archaic written form typically seen on official signs and notices.",
                    "translationMn": "Энэ голд сэлж болохгүй.",
                    "explanationMn": "べからず болон てはいけない хоёулаа үйлдлийг хориглодог ч べからず нь ихэвчлэн албан ёсны тэмдэг, зарлал дээр харагддаг хатуу, эртний бичгийн хэлбэр юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>約束<rp>(</rp><rt>やくそく</rt><rp>)</rp></ruby>を<ruby>何度<rp>(</rp><rt>なんど</rt><rp>)</rp></ruby>も<ruby>破<rp>(</rp><rt>やぶ</rt><rp>)</rp></ruby>り、ついには<ruby>誰<rp>(</rp><rt>だれ</rt><rp>)</rp></ruby>にも<ruby>信用<rp>(</rp><rt>しんよう</rt><rp>)</rp></ruby>されない",
                    "old": "<ruby>始末<rp>(</rp><rt>しまつ</rt><rp>)</rp></ruby>だ",
                    "new": "<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>になった",
                    "suffix": "。",
                    "translation": "He broke his promises so many times that, in the end, no one trusts him anymore.",
                    "explanation": "しまつだ and 結果になった both wrap up a story with an unfortunate final outcome, but しまつだ carries a stronger tone of exasperation at how things degenerated.",
                    "translationMn": "Тэр амлалтаа хэдэн ч удаа зөрчсөнөөс эцэст нь хэн ч түүнд итгэхээ больжээ.",
                    "explanationMn": "しまつだ болон 結果になった хоёулаа түүхийг харамсалтай эцсийн үр дүнгээр төгсгөдөг ч しまつだ нь зүйлс хэрхэн доройтсонд бухимдах илүү хүчтэй өнгийг агуулдаг."
                },
                {
                    "prefix": "この<ruby>機械<rp>(</rp><rt>きかい</rt><rp>)</rp></ruby>は<ruby>一度<rp>(</rp><rt>いちど</rt><rp>)</rp></ruby><ruby>止<rp>(</rp><rt>と</rt><rp>)</rp></ruby>まった",
                    "old": "が<ruby>最後<rp>(</rp><rt>さいご</rt><rp>)</rp></ruby>",
                    "new": "ら",
                    "suffix": "、<ruby>二度<rp>(</rp><rt>にど</rt><rp>)</rp></ruby>と<ruby>動<rp>(</rp><rt>うご</rt><rp>)</rp></ruby>かない。",
                    "translation": "Once this machine stops even once, it never runs again.",
                    "explanation": "たが最後 and たら both set up a condition, but たが最後 adds the strong nuance that once that condition happens, an irreversible, often negative result inevitably follows.",
                    "translationMn": "Энэ машин нэг л удаа зогсвол дахиж хэзээ ч ажиллахгүй.",
                    "explanationMn": "たが最後 болон たら хоёулаа нөхцөл тавьдаг ч たが最後 нь тэр нөхцөл болмогц эргэлт буцалтгүй, ихэвчлэн сөрөг үр дүн заавал дагана гэсэн хүчтэй нюансыг нэмдэг."
                },
                {
                    "prefix": "<ruby>若<rp>(</rp><rt>わか</rt><rp>)</rp></ruby>い",
                    "old": "からとて",
                    "new": "からといって",
                    "suffix": "、<ruby>無理<rp>(</rp><rt>むり</rt><rp>)</rp></ruby>をしていいわけではない。",
                    "translation": "Just because you're young doesn't mean it's fine to push yourself too hard.",
                    "explanation": "からとて and からといって both reject a conclusion someone might jump to based on a stated reason, with からとて being an old-fashioned, literary variant of the everyday からといって.",
                    "translationMn": "Залуу гэдэг чинь өөрийгөө хэт шахаж болно гэсэн үг биш.",
                    "explanationMn": "からとて болон からといって хоёулаа мэдэгдсэн шалтгаан дээр үндэслэн хэн нэгний гарган авч болох дүгнэлтийг үгүйсгэдэг бөгөөд からとて нь өдөр тутмын からといって-ийн хуучинсаг, утга зохиолын хувилбар юм."
                },
                {
                    "prefix": "<ruby>昔<rp>(</rp><rt>むかし</rt><rp>)</rp></ruby>",
                    "old": "はいざしらず",
                    "new": "は<ruby>別<rp>(</rp><rt>べつ</rt><rp>)</rp></ruby>として",
                    "suffix": "、<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>の<ruby>時代<rp>(</rp><rt>じだい</rt><rp>)</rp></ruby>にその<ruby>考<rp>(</rp><rt>かんが</rt><rp>)</rp></ruby>え<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>は<ruby>通用<rp>(</rp><rt>つうよう</rt><rp>)</rp></ruby>しない。",
                    "translation": "Whatever the case may have been in the past, that way of thinking doesn't work in today's era.",
                    "explanation": "いざしらず and は別として both set one case aside as a separate issue before focusing on the case that really matters, with いざしらず being a more literary, old-fashioned choice.",
                    "translationMn": "Өнгөрсөнд ямар байсан нь хамаагүй, тэр төрлийн сэтгэлгээ өнөөгийн эринд тохирохгүй.",
                    "explanationMn": "いざしらず болон は別として хоёулаа жинхэнэ чухал тохиолдол руу анхаарлаа хандуулахын өмнө нэг тохиолдлыг тусдаа асуудал болгон хойш тавьдаг бөгөөд いざしらず нь илүү утга зохиолын, хуучинсаг сонголт юм."
                },
                {
                    "prefix": "これだけ<ruby>迷惑<rp>(</rp><rt>めいわく</rt><rp>)</rp></ruby>をかけたのだから、<ruby>謝<rp>(</rp><rt>あやま</rt><rp>)</rp></ruby>ら",
                    "old": "ずには<ruby>済<rp>(</rp><rt>す</rt><rp>)</rp></ruby>まない",
                    "new": "なければならない",
                    "suffix": "。",
                    "translation": "Since I've caused this much trouble, I simply have to apologize.",
                    "explanation": "ずには済まない and なければならない both insist that an action absolutely must happen, but ずには済まない stresses that circumstances alone won't let the matter rest until it's done.",
                    "translationMn": "Ийм их төвөг учруулсан учраас уучлалт гуйхаас өөр аргагүй.",
                    "explanationMn": "ずには済まない болон なければならない хоёулаа үйлдэл заавал болох ёстойг шаарддаг ч ずには済まない нь нөхцөл байдал дангаараа энэ асуудлыг дуустал амраахгүй гэдгийг онцолдог."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>生<rp>(</rp><rt>う</rt><rp>)</rp></ruby>まれながらにして",
                    "new": "<ruby>生<rp>(</rp><rt>う</rt><rp>)</rp></ruby>まれつき",
                    "suffix": "、<ruby>絶対音感<rp>(</rp><rt>ぜったいおんかん</rt><rp>)</rp></ruby>を<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>っていた。",
                    "translation": "He had perfect pitch from birth.",
                    "explanation": "ながらにして and 生まれつき both describe a trait someone has had since birth, but ながらにして is a formal, literary construction while 生まれつき is the everyday word for \"innately.\"",
                    "translationMn": "Тэр төрөлхийн төгс дуу авиатай байсан.",
                    "explanationMn": "ながらにして болон 生まれつき хоёулаа хэн нэгний төрөлхийн шинжийг тодорхойлдог ч ながらにして нь албан ёсны, утга зохиолын бүтэц бол 生まれつき нь \"төрөлхийн\" гэсэн өдөр тутмын үг юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>信頼<rp>(</rp><rt>しんらい</rt><rp>)</rp></ruby>する",
                    "old": "にたる",
                    "new": "にふさわしい",
                    "suffix": "<ruby>人物<rp>(</rp><rt>じんぶつ</rt><rp>)</rp></ruby>だ。",
                    "translation": "He is a person worthy of trust.",
                    "explanation": "にたる and にふさわしい both say someone or something meets the bar for a stated quality, but にたる is a formal, literary verb meaning \"to be sufficient/worthy of,\" while にふさわしい is the everyday word for \"fitting.\"",
                    "translationMn": "Тэр итгэл хүлээхэд зохистой хүн юм.",
                    "explanationMn": "にたる болон にふさわしい хоёулаа хэн нэгэн буюу ямар нэг зүйл мэдэгдсэн чанарын түвшинд хүрснийг хэлдэг ч にたる нь \"хангалттай/зохистой байх\" гэсэн албан ёсны, утга зохиолын үйл үг бол にふさわしい нь \"тохирсон\" гэсэн өдөр тутмын үг юм."
                }
            ]
        },
        {
            "level": 10,
            "title": "Advanced · Level 10",
            "sentences": [
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>態度<rp>(</rp><rt>たいど</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>失礼<rp>(</rp><rt>しつれい</rt><rp>)</rp></ruby><ruby>極<rp>(</rp><rt>きわ</rt><rp>)</rp></ruby>まりない",
                    "new": "<ruby>非常<rp>(</rp><rt>ひじょう</rt><rp>)</rp></ruby>に<ruby>失礼<rp>(</rp><rt>しつれい</rt><rp>)</rp></ruby>だ",
                    "suffix": "。",
                    "translation": "His attitude is extremely rude.",
                    "explanation": "極まりない and 非常に both intensify a description to its extreme, but 極まりない is a formal literary suffix attached directly to a na-adjective stem, while 非常に is the everyday adverb placed before it.",
                    "translationMn": "Түүний хандлага туйлын эелдэг бус байна.",
                    "explanationMn": "極まりない болон 非常に хоёулаа тодорхойлолтыг туйлд нь хүргэдэг ч 極まりない нь na-тэмдэг нэрийн язгуурт шууд залгагддаг албан ёсны утга зохиолын дагавар бол 非常に нь түүний өмнө байрлах өдөр тутмын үйл үг юм."
                },
                {
                    "prefix": "この<ruby>功績<rp>(</rp><rt>こうせき</rt><rp>)</rp></ruby>は、もっと<ruby>評価<rp>(</rp><rt>ひょうか</rt><rp>)</rp></ruby>され",
                    "old": "てしかるべきだ",
                    "new": "るべきだ",
                    "suffix": "。",
                    "translation": "This achievement rightfully ought to be recognized more.",
                    "explanation": "てしかるべきだ and べきだ both say something ought to be the case, but てしかるべきだ adds a stronger sense that the current situation is unjust and demands correction.",
                    "translationMn": "Энэ амжилтыг илүү өргөнөөр хүлээн зөвшөөрөх учиртай.",
                    "explanationMn": "てしかるべきだ болон べきだ хоёулаа ямар нэг зүйл тийм байх ёстойг хэлдэг ч てしかるべきだ нь одоогийн байдал шударга бус бөгөөд засах шаардлагатай гэсэн илүү хүчтэй мэдрэмжийг нэмдэг."
                },
                {
                    "prefix": "この<ruby>映画<rp>(</rp><rt>えいが</rt><rp>)</rp></ruby>は<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>る<ruby>者<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>感動<rp>(</rp><rt>かんどう</rt><rp>)</rp></ruby>させないではおかない",
                    "new": "<ruby>必<rp>(</rp><rt>かなら</rt><rp>)</rp></ruby>ず<ruby>感動<rp>(</rp><rt>かんどう</rt><rp>)</rp></ruby>させる",
                    "suffix": "。",
                    "translation": "This movie is bound to move everyone who watches it.",
                    "explanation": "ないではおかない and 必ず〜する both insist an effect will inevitably occur, but ないではおかない is a forceful double-negative literary construction implying the cause is simply too powerful to resist.",
                    "translationMn": "Энэ кино үзсэн хүн бүрийг сэтгэл хөдлүүлэх нь гарцаагүй.",
                    "explanationMn": "ないではおかない болон 必ず〜する хоёулаа нөлөө заавал болно гэдгийг шаарддаг ч ないではおかない нь шалтгаан эсэргүүцэшгүй хэтэрхий хүчтэй гэдгийг илэрхийлдэг хүчтэй давхар үгүйсгэлийн утга зохиолын бүтэц юм."
                },
                {
                    "prefix": "<ruby>東京<rp>(</rp><rt>とうきょう</rt><rp>)</rp></ruby><ruby>公演<rp>(</rp><rt>こうえん</rt><rp>)</rp></ruby>",
                    "old": "を<ruby>皮切<rp>(</rp><rt>かわき</rt><rp>)</rp></ruby>りに",
                    "new": "をきっかけに",
                    "suffix": "、<ruby>全国<rp>(</rp><rt>ぜんこく</rt><rp>)</rp></ruby>ツアーが<ruby>始<rp>(</rp><rt>はじ</rt><rp>)</rp></ruby>まった。",
                    "translation": "Starting with the Tokyo performance, the nationwide tour began.",
                    "explanation": "を皮切りに and をきっかけに both mark the starting point that sets a series of events in motion, but を皮切りに specifically implies a sequence of similar events following one after another.",
                    "translationMn": "Токиогийн тоглолтоос эхлэн улс даяарх аялан тоглолт эхэллээ.",
                    "explanationMn": "を皮切りに болон をきっかけに хоёулаа хэд хэдэн үйл явдлыг хөдөлгөж эхлүүлэх эхлэлийн цэгийг заадаг ч を皮切りに нь тухайлбал ижил төстэй үйл явдлууд дараалан дагаж байгааг илэрхийлдэг."
                },
                {
                    "prefix": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>がどれほど<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>したか、",
                    "old": "<ruby>察<rp>(</rp><rt>さっ</rt><rp>)</rp></ruby>するに<ruby>難<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>くない",
                    "new": "<ruby>容易<rp>(</rp><rt>ようい</rt><rp>)</rp></ruby>に<ruby>想像<rp>(</rp><rt>そうぞう</rt><rp>)</rp></ruby>できる",
                    "suffix": "。",
                    "translation": "It's not hard to imagine how much effort she put in.",
                    "explanation": "にかたくない and 容易に想像できる both say that something is easy to infer or picture, but にかたくない is a fixed, formal literary phrase used almost exclusively with verbs like 察する and 想像する.",
                    "translationMn": "Тэр хэчнээн их хүчин чармайлт гаргасныг төсөөлөхөд хэцүү биш.",
                    "explanationMn": "にかたくない болон 容易に想像できる хоёулаа ямар нэг зүйлийг таамаглах буюу төсөөлөхөд амархан гэдгийг хэлдэг ч にかたくない нь бараг зөвхөн 察する, 想像する гэх мэт үйл үгтэй ашиглагддаг тогтмол, албан ёсны утга зохиолын хэллэг юм."
                },
                {
                    "prefix": "さんざん<ruby>悩<rp>(</rp><rt>なや</rt><rp>)</rp></ruby>",
                    "old": "んだあげくの<ruby>果<rp>(</rp><rt>は</rt><rp>)</rp></ruby>てに",
                    "new": "んで、<ruby>結局<rp>(</rp><rt>けっきょく</rt><rp>)</rp></ruby>",
                    "suffix": "、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>転職<rp>(</rp><rt>てんしょく</rt><rp>)</rp></ruby>を<ruby>決意<rp>(</rp><rt>けつい</rt><rp>)</rp></ruby>した。",
                    "translation": "After agonizing over it for a long time, he finally decided to change jobs.",
                    "explanation": "あげくの果てに and 結局 both mark the final outcome after a long, often trying process, but あげくの果てに adds a stronger sense of exhaustion from all that came before.",
                    "translationMn": "Удаан хугацаанд шаналсны эцэст тэр эцэст нь ажлаа солихоор шийдсэн.",
                    "explanationMn": "あげくの果てに болон 結局 хоёулаа урт, ихэвчлэн хэцүү явцын дараах эцсийн үр дүнг тэмдэглэдэг ч あげくの果てに нь өмнө болсон бүхнээс ядрах илүү хүчтэй мэдрэмжийг нэмдэг."
                },
                {
                    "prefix": "よほど<ruby>疲<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>れている",
                    "old": "とみえて",
                    "new": "らしく",
                    "suffix": "、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>はずっとあくびをしている。",
                    "translation": "He seems really tired, as he's been yawning the whole time.",
                    "explanation": "とみえて and らしく both draw an inference from visible evidence, but とみえて frames the inference as something the speaker is visually observing right now.",
                    "translationMn": "Тэр байнга эсгэрч байгаагаас харахад маш их ядарсан бололтой.",
                    "explanationMn": "とみえて болон らしく хоёулаа харагдах нотолгооноос таамаглал гаргадаг ч とみえて нь таамаглалыг илэрхийлэгч яг одоо нүдээр ажиглаж буй зүйл мэт харуулдаг."
                },
                {
                    "prefix": "<ruby>話<rp>(</rp><rt>はなし</rt><rp>)</rp></ruby>は<ruby>二転三転<rp>(</rp><rt>にてんさんてん</rt><rp>)</rp></ruby>し、",
                    "old": "しまいには",
                    "new": "<ruby>最後<rp>(</rp><rt>さいご</rt><rp>)</rp></ruby>には",
                    "suffix": "<ruby>誰<rp>(</rp><rt>だれ</rt><rp>)</rp></ruby>も<ruby>本題<rp>(</rp><rt>ほんだい</rt><rp>)</rp></ruby>を<ruby>覚<rp>(</rp><rt>おぼ</rt><rp>)</rp></ruby>えていなかった。",
                    "translation": "The discussion twisted and turned so much that, in the end, no one remembered the main topic.",
                    "explanation": "しまいには and 最後には both introduce the eventual, often unexpected, outcome of a drawn-out process, and are close to interchangeable in casual and neutral narration alike.",
                    "translationMn": "Ярилцлага олон эргэлт бууралттай болж, эцэст нь хэн ч гол сэдвийг санахаа больсон.",
                    "explanationMn": "しまいには болон 最後には хоёулаа удаан үргэлжилсэн явцын эцсийн, ихэвчлэн гэнэтийн үр дүнг танилцуулдаг бөгөөд энгийн болон төвийг сахисан өгүүлэмжид аль алинд нь бараг сольж хэрэглэгддэг."
                },
                {
                    "prefix": "<ruby>初心者<rp>(</rp><rt>しょしんしゃ</rt><rp>)</rp></ruby>",
                    "old": "ならいざしらず",
                    "new": "はともかく",
                    "suffix": "、プロがこんなミスをするとは<ruby>信<rp>(</rp><rt>しん</rt><rp>)</rp></ruby>じがたい。",
                    "translation": "If it were a beginner, that would be one thing, but it's hard to believe a professional would make a mistake like this.",
                    "explanation": "ならいざしらず and はともかく both set aside a lesser, more forgivable case in order to sharpen the contrast with the surprising case actually at hand, with ならいざしらず carrying a more literary, dismissive edge.",
                    "translationMn": "Шинэхэн байсан бол ойлгомжтой байх байсан, гэвч мэргэжлийн хүн ийм алдаа гаргана гэдэгт итгэхэд хэцүү.",
                    "explanationMn": "ならいざしらず болон はともかく хоёулаа гайхмаар бодит тохиолдолтой эсрэг байдлыг хурцлахын тулд бага, уучлагдахуйц тохиолдлыг хойш тавьдаг бөгөөд ならいざしらず нь илүү утга зохиолын, үл тоомсорлосон ирмэгтэй."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>",
                    "old": "ごとき",
                    "new": "のような",
                    "suffix": "<ruby>人間<rp>(</rp><rt>にんげん</rt><rp>)</rp></ruby>に、<ruby>負<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>けるわけにはいかない。",
                    "translation": "I can't afford to lose to someone like him.",
                    "explanation": "ごとき and のような both compare something to a stated example, but ごとき is an old literary form that here carries a distinctly belittling, dismissive tone toward the person being compared.",
                    "translationMn": "Түүн шиг хүнд ялагдаж болохгүй.",
                    "explanationMn": "ごとき болон のような хоёулаа ямар нэг зүйлийг мэдэгдсэн жишээтэй харьцуулдаг ч ごとき нь эртний утга зохиолын хэлбэр бөгөөд энд харьцуулж буй хүнд туйлын басамжилсан, үл тоомсорлосон өнгийг агуулдаг."
                }
            ]
        },
        {
            "level": 11,
            "title": "Advanced · Level 11",
            "sentences": [
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>態度<rp>(</rp><rt>たいど</rt><rp>)</rp></ruby>には",
                    "old": "あきれるほかない",
                    "new": "あきれるしかない",
                    "suffix": "。",
                    "translation": "There's nothing to do but be exasperated by his attitude.",
                    "explanation": "ほかない and しかない both mean 'there's no choice but to' — they're genuinely interchangeable, with ほかない reading as slightly more formal or written.",
                    "oldCore": null,
                    "translationMn": "Түүний хандлагад цочирдохоос өөр аргагүй.",
                    "explanationMn": "ほかない болон しかない хоёулаа \"...хийхээс өөр аргагүй\" гэсэн утгатай — эдгээрийг жинхэнэ сольж хэрэглэж болно, ほかない нь бага зэрэг илүү албан ёсны, бичгийн сонстог."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>には",
                    "old": "<ruby>頭<rp>(</rp><rt>あたま</rt><rp>)</rp></ruby>が<ruby>下<rp>(</rp><rt>さ</rt><rp>)</rp></ruby>がる<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>いだ",
                    "new": "<ruby>感服<rp>(</rp><rt>かんぷく</rt><rp>)</rp></ruby>せざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "suffix": "。",
                    "translation": "I can't help but be deeply impressed by his effort.",
                    "explanation": "頭が下がる思いだ and 感服せざるを得ない both express being moved to deep admiration by someone's effort — 感服せざるを得ない is the more formal, written way of saying it.",
                    "oldCore": null,
                    "translationMn": "Түүний хичээл зүтгэлд гүнээ бахархахгүй байж чадахгүй байна.",
                    "explanationMn": "頭が下がる思いだ болон 感服せざるを得ない хоёулаа хэн нэгний хичээл зүтгэлд гүн бишрэл төрснийг илэрхийлдэг — 感服せざるを得ない нь илэрхийлэх илүү албан ёсны, бичгийн арга юм."
                },
                {
                    "prefix": "<ruby>不況<rp>(</rp><rt>ふきょう</rt><rp>)</rp></ruby>が<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>く",
                    "old": "なか、<ruby>賃金<rp>(</rp><rt>ちんぎん</rt><rp>)</rp></ruby>を<ruby>上<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>げざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>なかった",
                    "new": "なか、<ruby>賃金<rp>(</rp><rt>ちんぎん</rt><rp>)</rp></ruby>を<ruby>上<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>げないわけにはいかなかった",
                    "suffix": "。",
                    "translation": "Amid the ongoing recession, they had no choice but to raise wages.",
                    "explanation": "ざるを得ない and ないわけにはいかない both express having no real choice but to act — they're standard, well-documented interchangeable forms.",
                    "oldCore": "ざるをえない",
                    "newCore": null,
                    "translationMn": "Тасралтгүй хямралын үед цалин нэмэхээс өөр аргагүй байлаа.",
                    "explanationMn": "ざるを得ない болон ないわけにはいかない хоёулаа хийхээс өөр жинхэнэ сонголтгүй байгааг илэрхийлдэг — эдгээр нь стандарт, сайн баримтжуулагдсан сольж хэрэглэгддэг хэлбэрүүд юм."
                },
                {
                    "prefix": "<ruby>被災地<rp>(</rp><rt>ひさいち</rt><rp>)</rp></ruby>の<ruby>惨状<rp>(</rp><rt>さんじょう</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>を<ruby>覆<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>うばかりだった",
                    "new": "<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>るにたえないものだった",
                    "suffix": "。",
                    "translation": "The devastation in the disaster area was too much to bear looking at.",
                    "explanation": "目を覆うばかりだ and 見るにたえない both express that something is too awful to look at directly — they're close, commonly paired ways of describing an unbearable sight.",
                    "oldCore": null,
                    "translationMn": "Гамшгийн бүсийн сүйрлийг харах нь үнэхээр тэвчихийн аргагүй байлаа.",
                    "explanationMn": "目を覆うばかりだ болон 見るにたえない хоёулаа ямар нэг зүйл шууд харахад хэтэрхий аймшигтай гэдгийг илэрхийлдэг — эдгээр нь тэвчихийн аргагүй үзэгдлийг тодорхойлох ойролцоо, түгээмэл хосолдог арга юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>合格<rp>(</rp><rt>ごうかく</rt><rp>)</rp></ruby>の<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>らせを<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>いて、<ruby>喜<rp>(</rp><rt>よろこ</rt><rp>)</rp></ruby>ばずには",
                    "old": "いられなかった",
                    "new": "おれなかった",
                    "suffix": "。",
                    "translation": "On hearing the news of his acceptance, he couldn't help but rejoice.",
                    "explanation": "ずにはいられない and ずにはおれない both mean 'can't help but do X' — おれない is simply the more literary, formal-sounding version of いられない.",
                    "oldCore": "ないではいられない",
                    "newCore": null,
                    "translationMn": "Элсэлтийн мэдээг сонсоод тэр баярлахгүй байж чадсангүй.",
                    "explanationMn": "ずにはいられない болон ずにはおれない хоёулаа \"X хийхгүй байж чадахгүй\" гэсэн утгатай — おれない нь зөвхөн いられない-ийн илүү утга зохиолын, албан ёсны сонсогдох хувилбар юм."
                },
                {
                    "prefix": "<ruby>今回<rp>(</rp><rt>こんかい</rt><rp>)</rp></ruby>の<ruby>不祥事<rp>(</rp><rt>ふしょうじ</rt><rp>)</rp></ruby>は<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>の<ruby>管理体制<rp>(</rp><rt>かんりたいせい</rt><rp>)</rp></ruby>の<ruby>甘<rp>(</rp><rt>あま</rt><rp>)</rp></ruby>さに",
                    "old": "ほかならない",
                    "new": "<ruby>起因<rp>(</rp><rt>きいん</rt><rp>)</rp></ruby>する",
                    "suffix": "。",
                    "translation": "This scandal is nothing other than a result of the company's lax management.",
                    "explanation": "にほかならない and に起因する both point to a single, unambiguous cause — にほかならない emphasizes 'this and nothing else,' while 起因する states the causal link more plainly, but both land on the same claim here.",
                    "oldCore": "にほかならない",
                    "newCore": null,
                    "translationMn": "Энэ будлиан бол компанийн сул удирдлагын үр дагавар л юм.",
                    "explanationMn": "にほかならない болон に起因する хоёулаа нэг тодорхой, эргэлзээгүй шалтгаан руу заадаг — にほかならない нь \"энэ бөгөөд өөр юу ч биш\" гэдгийг онцолдог бол 起因する нь шалтгаант холбоог илүү энгийнээр хэлдэг, гэхдээ хоёул энд ижил мэдэгдэлд хүрдэг."
                },
                {
                    "prefix": "その<ruby>批判<rp>(</rp><rt>ひはん</rt><rp>)</rp></ruby>は<ruby>的外<rp>(</rp><rt>まとはず</rt><rp>)</rp></ruby>れという",
                    "old": "ほかない",
                    "new": "しかない",
                    "suffix": "。",
                    "translation": "That criticism can only be called off the mark.",
                    "explanation": "ほかない and しかない both mean 'there's no choice but to conclude X' — they're genuinely interchangeable, with ほかない reading as slightly more formal.",
                    "oldCore": null,
                    "translationMn": "Тэр шүүмжлэлийг зорилгогүй гэж л хэлж болно.",
                    "explanationMn": "ほかない болон しかない хоёулаа \"X гэж дүгнэхээс өөр аргагүй\" гэсэн утгатай — эдгээрийг жинхэнэ сольж хэрэглэж болно, ほかない нь бага зэрэг илүү албан ёсны сонстог."
                },
                {
                    "prefix": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>の<ruby>作品<rp>(</rp><rt>さくひん</rt><rp>)</rp></ruby>は<ruby>技術<rp>(</rp><rt>ぎじゅつ</rt><rp>)</rp></ruby>の<ruby>高<rp>(</rp><rt>たか</rt><rp>)</rp></ruby>さもさることながら、その<ruby>独創性<rp>(</rp><rt>どくそうせい</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>驚<rp>(</rp><rt>おどろ</rt><rp>)</rp></ruby>かされる",
                    "new": "<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>を<ruby>見張<rp>(</rp><rt>みは</rt><rp>)</rp></ruby>らされる",
                    "suffix": "。",
                    "translation": "Her work's technical skill aside, its originality is what really takes you by surprise.",
                    "explanation": "驚かされる and 目を見張らされる both describe being struck with astonishment — 目を見張らされる is simply the more vivid, literary way of expressing the same reaction.",
                    "oldCore": null,
                    "translationMn": "Түүний бүтээлийн техникийн ур чадвар бол хойно тавиад, өвөрмөц байдал нь үнэхээр гайхшруулдаг.",
                    "explanationMn": "驚かされる болон 目を見張らされる хоёулаа гайхшралд автсаныг тодорхойлдог — 目を見張らされる нь зөвхөн ижил урвалыг илэрхийлэх илүү тод, утга зохиолын арга юм."
                },
                {
                    "prefix": "<ruby>連日<rp>(</rp><rt>れんじつ</rt><rp>)</rp></ruby>の<ruby>残業<rp>(</rp><rt>ざんぎょう</rt><rp>)</rp></ruby>で、もはや<ruby>働<rp>(</rp><rt>はたら</rt><rp>)</rp></ruby>き<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>けられそう",
                    "old": "にない",
                    "new": "もない",
                    "suffix": "。",
                    "translation": "After days of overtime, it doesn't look like I can keep working like this any longer.",
                    "explanation": "そうにない and そうもない are both ways to say 'it doesn't look like X will happen' — they're used interchangeably with no real difference in meaning.",
                    "oldCore": null,
                    "translationMn": "Хэдэн өдөр илүү цагаар ажилласны эцэст ийм байдлаар цааш ажиллаж чадахгүй бололтой.",
                    "explanationMn": "そうにない болон そうもない хоёулаа \"X болохгүй бололтой\" гэж хэлэх арга юм — утгын хувьд ялгаагүй сольж хэрэглэгддэг."
                },
                {
                    "prefix": "<ruby>調査<rp>(</rp><rt>ちょうさ</rt><rp>)</rp></ruby>の<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>は、<ruby>予想<rp>(</rp><rt>よそう</rt><rp>)</rp></ruby>を",
                    "old": "はるかに<ruby>上回<rp>(</rp><rt>うわまわ</rt><rp>)</rp></ruby>るものだった",
                    "new": "はるかに<ruby>超<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>えるものだった",
                    "suffix": "。",
                    "translation": "The survey results were far beyond what had been predicted.",
                    "explanation": "上回る and 超える both mean 'to exceed' a given figure or expectation — they're standard, interchangeable choices in this kind of report.",
                    "oldCore": null,
                    "translationMn": "Судалгааны үр дүн урьдчилан таамагласнаас хавьгүй давсан байлаа.",
                    "explanationMn": "上回る болон 超える хоёулаа өгөгдсөн тоо буюу хүлээлтийг \"давах\" гэсэн утгатай — эдгээр нь ийм төрлийн тайланд стандарт, сольж хэрэглэгддэг сонголтууд юм."
                }
            ]
        },
        {
            "level": 12,
            "title": "Advanced · Level 12",
            "sentences": [
                {
                    "prefix": "この<ruby>事件<rp>(</rp><rt>じけん</rt><rp>)</rp></ruby>の<ruby>背後<rp>(</rp><rt>はいご</rt><rp>)</rp></ruby>には、<ruby>組織的<rp>(</rp><rt>そしきてき</rt><rp>)</rp></ruby>な<ruby>犯罪<rp>(</rp><rt>はんざい</rt><rp>)</rp></ruby>が<ruby>存在<rp>(</rp><rt>そんざい</rt><rp>)</rp></ruby>する",
                    "old": "とみられる",
                    "new": "と<ruby>考<rp>(</rp><rt>かんが</rt><rp>)</rp></ruby>えられる",
                    "suffix": "。",
                    "translation": "Behind this incident, organized crime is believed to be involved.",
                    "explanation": "とみられる and と考えられる both present something as a widely-held view rather than a confirmed fact — they're standard interchangeable ways news reporting frames a likely conclusion.",
                    "oldCore": null,
                    "translationMn": "Энэ хэргийн ард зохион байгуулалттай гэмт хэрэг оролцсон гэж үзэж байна.",
                    "explanationMn": "とみられる болон と考えられる хоёулаа ямар нэг зүйлийг батлагдсан баримт биш өргөн тархсан үзэл бодол мэт танилцуулдаг — эдгээр нь мэдээллийн репортаж магадлалтай дүгнэлтийг илэрхийлэх стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>周囲<rp>(</rp><rt>しゅうい</rt><rp>)</rp></ruby>の<ruby>反対<rp>(</rp><rt>はんたい</rt><rp>)</rp></ruby>を",
                    "old": "ものともせず",
                    "new": "<ruby>気<rp>(</rp><rt>き</rt><rp>)</rp></ruby>にすることなく",
                    "suffix": "、<ruby>計画<rp>(</rp><rt>けいかく</rt><rp>)</rp></ruby>を<ruby>実行<rp>(</rp><rt>じっこう</rt><rp>)</rp></ruby>した。",
                    "translation": "Ignoring the opposition around him, he carried out the plan.",
                    "explanation": "をものともせず and を気にすることなく both describe pushing forward despite an obstacle — をものともせず carries the extra sense of actively overcoming that obstacle, but in describing this outcome, both read the same way.",
                    "oldCore": "をものともせず",
                    "newCore": null,
                    "translationMn": "Эргэн тойрны эсэргүүцлийг тоохгүйгээр тэр төлөвлөгөөгөө хэрэгжүүлсэн.",
                    "explanationMn": "をものともせず болон を気にすることなく хоёулаа саадыг үл харгалзан урагшлахыг тодорхойлдог — をものともせず нь тэр саадыг идэвхтэй даван туулах нэмэлт утгыг агуулдаг ч энэ үр дүнг тодорхойлоход хоёул ижилхэн уншигдана."
                },
                {
                    "prefix": "この<ruby>報告書<rp>(</rp><rt>ほうこくしょ</rt><rp>)</rp></ruby>は<ruby>事実<rp>(</rp><rt>じじつ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>踏<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>まえて<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>かれている",
                    "new": "<ruby>基<rp>(</rp><rt>もと</rt><rp>)</rp></ruby>づいて<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>かれている",
                    "suffix": "。",
                    "translation": "This report is written based on the facts.",
                    "explanation": "をふまえて and に基づいて both mean 'based on/taking into account X' — they're standard, interchangeable ways to say a piece of writing rests on given evidence.",
                    "oldCore": "をふまえて",
                    "newCore": null,
                    "translationMn": "Энэ тайланг баримт нотолгоонд үндэслэн бичсэн байна.",
                    "explanationMn": "をふまえて болон に基づいて хоёулаа \"X-д үндэслэн/харгалзан\" гэсэн утгатай — эдгээр нь бичвэр өгөгдсөн нотолгоон дээр тулгуурладаг гэдгийг хэлэх стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>を",
                    "old": "めぐって",
                    "new": "については",
                    "suffix": "、<ruby>専門家<rp>(</rp><rt>せんもんか</rt><rp>)</rp></ruby>の<ruby>間<rp>(</rp><rt>あいだ</rt><rp>)</rp></ruby>でも<ruby>意見<rp>(</rp><rt>いけん</rt><rp>)</rp></ruby>が<ruby>分<rp>(</rp><rt>わ</rt><rp>)</rp></ruby>かれている。",
                    "translation": "Regarding this issue, opinions are divided even among experts.",
                    "explanation": "をめぐって and については both introduce the topic a discussion centers on — をめぐって leans a little more toward an active dispute swirling around the topic, but both work the same way here.",
                    "oldCore": "をめぐって",
                    "newCore": null,
                    "translationMn": "Энэ асуудлын талаар мэргэжилтнүүдийн дунд ч санал зөрж байна.",
                    "explanationMn": "をめぐって болон については хоёулаа хэлэлцүүлгийн төвлөрсөн сэдвийг танилцуулдаг — をめぐって нь сэдвийн эргэн тойронд идэвхтэй маргаанд арай илүү дөхдөг ч энд хоёул ижилхэн ажилладаг."
                },
                {
                    "prefix": "<ruby>新<rp>(</rp><rt>あたら</rt><rp>)</rp></ruby>しい<ruby>法律<rp>(</rp><rt>ほうりつ</rt><rp>)</rp></ruby>の<ruby>施行<rp>(</rp><rt>しこう</rt><rp>)</rp></ruby>に",
                    "old": "さきだち",
                    "new": "<ruby>先<rp>(</rp><rt>さき</rt><rp>)</rp></ruby>んじて",
                    "suffix": "、<ruby>説明会<rp>(</rp><rt>せつめいかい</rt><rp>)</rp></ruby>が<ruby>開<rp>(</rp><rt>ひら</rt><rp>)</rp></ruby>かれた。",
                    "translation": "Ahead of the new law taking effect, an explanatory session was held.",
                    "explanation": "にさきだち and に先んじて both mean 'ahead of/prior to X' — they're standard, interchangeable ways to mark something happening before a scheduled event.",
                    "oldCore": "にさきだち",
                    "newCore": null,
                    "translationMn": "Шинэ хуулийн хэрэгжихээс өмнө танилцуулах уулзалт зохион байгуулагдсан.",
                    "explanationMn": "にさきだち болон に先んじて хоёулаа \"X-ээс өмнө/урьд\" гэсэн утгатай — эдгээр нь хуваарьт үйл явдлын өмнө болж буй зүйлийг тэмдэглэх стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "<ruby>今回<rp>(</rp><rt>こんかい</rt><rp>)</rp></ruby>の<ruby>成功<rp>(</rp><rt>せいこう</rt><rp>)</rp></ruby>は、チーム<ruby>全員<rp>(</rp><rt>ぜんいん</rt><rp>)</rp></ruby>の<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>",
                    "old": "とあいまって",
                    "new": "が<ruby>合<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>わさって",
                    "suffix": "もたらされたものだ。",
                    "translation": "This success was brought about by the combined effort of the whole team.",
                    "explanation": "とあいまって and が合わさって both describe multiple factors combining to produce a result — とあいまって is simply the more formal, written way of expressing the same combination.",
                    "oldCore": "とあいまって",
                    "newCore": null,
                    "translationMn": "Энэ амжилт нь бүхэл бүтэн багийн хамтын хүчний үр дүн юм.",
                    "explanationMn": "とあいまって болон が合わさって хоёулаа хэд хэдэн хүчин зүйл нийлж үр дүн гаргахыг тодорхойлдог — とあいまって нь зөвхөн ижил нийлбэрийг илэрхийлэх илүү албан ёсны, бичгийн арга юм."
                },
                {
                    "prefix": "その<ruby>新製品<rp>(</rp><rt>しんせいひん</rt><rp>)</rp></ruby>が<ruby>発売<rp>(</rp><rt>はつばい</rt><rp>)</rp></ruby>され",
                    "old": "てからというもの",
                    "new": "て<ruby>以来<rp>(</rp><rt>いらい</rt><rp>)</rp></ruby>",
                    "suffix": "、<ruby>売上<rp>(</rp><rt>うりあげ</rt><rp>)</rp></ruby>は<ruby>右肩上<rp>(</rp><rt>みぎかたあ</rt><rp>)</rp></ruby>がりだ。",
                    "translation": "Ever since that new product was released, sales have been steadily climbing.",
                    "explanation": "てからというもの and て以来 both mark 'ever since X happened' as the start of a continuing trend — they're standard, interchangeable ways to frame that starting point.",
                    "oldCore": "てからというもの",
                    "newCore": null,
                    "translationMn": "Тэр шинэ бүтээгдэхүүн гарсанаас хойш борлуулалт тогтмол өсч байна.",
                    "explanationMn": "てからというもの болон て以来 хоёулаа \"X болсноос хойш\" гэдгийг үргэлжилж буй хандлагын эхлэл болгон заадаг — эдгээр нь тэр эхлэлийн цэгийг харуулах стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "その<ruby>提案<rp>(</rp><rt>ていあん</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>いたとたん",
                    "new": "<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>くなり",
                    "suffix": "、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>反対<rp>(</rp><rt>はんたい</rt><rp>)</rp></ruby>を<ruby>唱<rp>(</rp><rt>とな</rt><rp>)</rp></ruby>えた。",
                    "translation": "The moment he heard that proposal, he voiced his opposition.",
                    "explanation": "たとたん and なり both mark 'the instant X happened, Y followed' — they're close, standard partners for near-simultaneous action, though なり requires the plain dictionary form rather than the past tense.",
                    "oldCore": "たとたん",
                    "newCore": "なり",
                    "translationMn": "Тэр саналыг сонсмогцоо эсэргүүцлээ илэрхийлсэн.",
                    "explanationMn": "たとたん болон なり хоёулаа \"X болмогц Y дагав\" гэдгийг заадаг — эдгээр нь бараг зэрэг үйлдлийн ойролцоо, стандарт хос боловч なり нь өнгөрсөн цаг биш толь бичгийн энгийн хэлбэрийг шаарддаг."
                },
                {
                    "prefix": "この<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>の<ruby>業績<rp>(</rp><rt>ぎょうせき</rt><rp>)</rp></ruby>は<ruby>好調<rp>(</rp><rt>こうちょう</rt><rp>)</rp></ruby>な",
                    "old": "ばかりでなく",
                    "new": "のみならず",
                    "suffix": "、<ruby>従業員<rp>(</rp><rt>じゅうぎょういん</rt><rp>)</rp></ruby>の<ruby>満足度<rp>(</rp><rt>まんぞくど</rt><rp>)</rp></ruby>も<ruby>高<rp>(</rp><rt>たか</rt><rp>)</rp></ruby>い。",
                    "translation": "This company's performance is not only strong — employee satisfaction is high too.",
                    "explanation": "ばかりでなく and のみならず both mean 'not only X, but also Y' — they're standard, well-documented interchangeable forms of the same emphatic addition.",
                    "oldCore": "ばかりでなく",
                    "newCore": "のみならず",
                    "translationMn": "Энэ компанийн гүйцэтгэл сайн төдийгүй ажилтнуудын сэтгэл ханамж ч өндөр байна.",
                    "explanationMn": "ばかりでなく болон のみならず хоёулаа \"зөвхөн X төдийгүй Y ч гэсэн\" гэсэн утгатай — эдгээр нь ижил онцолсон нэмэлтийн стандарт, сайн баримтжуулагдсан сольж хэрэглэгддэг хэлбэрүүд юм."
                },
                {
                    "prefix": "この<ruby>結果<rp>(</rp><rt>けっか</rt><rp>)</rp></ruby>は<ruby>予想<rp>(</rp><rt>よそう</rt><rp>)</rp></ruby>",
                    "old": "にすぎない",
                    "new": "でしかない",
                    "suffix": "。",
                    "translation": "This result is nothing more than a prediction.",
                    "explanation": "にすぎない and でしかない both mean 'is nothing more than X' — they're standard interchangeable ways to downplay something as merely a small or limited case.",
                    "oldCore": "にすぎない",
                    "newCore": null,
                    "translationMn": "Энэ үр дүн зөвхөн таамаглал төдий юм.",
                    "explanationMn": "にすぎない болон でしかない хоёулаа \"X-ээс өөр юу ч биш\" гэсэн утгатай — эдгээр нь ямар нэг зүйлийг зөвхөн бага буюу хязгаарлагдмал тохиолдол гэж бууруулах стандарт, сольж хэрэглэгддэг арга юм."
                }
            ]
        },
        {
            "level": 13,
            "title": "Advanced · Level 13",
            "sentences": [
                {
                    "prefix": "この<ruby>製品<rp>(</rp><rt>せいひん</rt><rp>)</rp></ruby>の<ruby>品質<rp>(</rp><rt>ひんしつ</rt><rp>)</rp></ruby>の<ruby>高<rp>(</rp><rt>たか</rt><rp>)</rp></ruby>さは",
                    "old": "<ruby>想像<rp>(</rp><rt>そうぞう</rt><rp>)</rp></ruby>にかたくない",
                    "new": "<ruby>容易<rp>(</rp><rt>ようい</rt><rp>)</rp></ruby>に<ruby>想像<rp>(</rp><rt>そうぞう</rt><rp>)</rp></ruby>できる",
                    "suffix": "。",
                    "translation": "This product's high quality is easy enough to imagine.",
                    "explanation": "想像にかたくない and 容易に想像できる both mean 'easy to imagine' — にかたくない is simply the more literary, formal way of saying the same thing.",
                    "oldCore": null,
                    "translationMn": "Энэ бүтээгдэхүүний өндөр чанарыг төсөөлөхөд амархан.",
                    "explanationMn": "想像にかたくない болон 容易に想像できる хоёулаа \"төсөөлөхөд амархан\" гэсэн утгатай — にかたくない нь зөвхөн ижил зүйлийг илэрхийлэх илүү утга зохиолын, албан ёсны арга юм."
                },
                {
                    "prefix": "その<ruby>惨事<rp>(</rp><rt>さんじ</rt><rp>)</rp></ruby>の<ruby>光景<rp>(</rp><rt>こうけい</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>るにたえないものだった",
                    "new": "<ruby>直視<rp>(</rp><rt>ちょくし</rt><rp>)</rp></ruby>できないものだった",
                    "suffix": "。",
                    "translation": "The scene of that disaster was too awful to look at directly.",
                    "explanation": "見るにたえない and 直視できない both express that a sight is too awful to bear looking at — they're close, commonly paired ways of describing an unbearable scene.",
                    "oldCore": null,
                    "translationMn": "Тэр гамшгийн дүр зургийг шууд харах нь үнэхээр аймшигтай байлаа.",
                    "explanationMn": "見るにたえない болон 直視できない хоёулаа үзэгдэл харахад хэтэрхий аймшигтай гэдгийг илэрхийлдэг — эдгээр нь тэвчихийн аргагүй сцен тодорхойлох ойролцоо, түгээмэл хосолдог арга юм."
                },
                {
                    "prefix": "この<ruby>惨状<rp>(</rp><rt>さんじょう</rt><rp>)</rp></ruby>を<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>の<ruby>当<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>たりにして、<ruby>涙<rp>(</rp><rt>なみだ</rt><rp>)</rp></ruby>",
                    "old": "せずにはいられなかった",
                    "new": "せずにはおれなかった",
                    "suffix": "。",
                    "translation": "Witnessing this devastation firsthand, I couldn't help but shed tears.",
                    "explanation": "ずにはいられない and ずにはおれない both mean 'can't help but do X' — おれない is simply the more literary, formal-sounding version of いられない.",
                    "oldCore": "ないではいられない",
                    "newCore": null,
                    "translationMn": "Энэ сүйрлийг өөрийн нүдээр харснаа нулимс дуслуулахгүй байж чадсангүй.",
                    "explanationMn": "ずにはいられない болон ずにはおれない хоёулаа \"X хийхгүй байж чадахгүй\" гэсэн утгатай — おれない нь зөвхөн いられない-ийн илүү утга зохиолын, албан ёсны сонсогдох хувилбар юм."
                },
                {
                    "prefix": "その<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>い<ruby>訳<rp>(</rp><rt>わけ</rt><rp>)</rp></ruby>は<ruby>苦<rp>(</rp><rt>くる</rt><rp>)</rp></ruby>しい",
                    "old": "としか<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>いようがない",
                    "new": "としか<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>えない",
                    "suffix": "。",
                    "translation": "That excuse can only be called weak.",
                    "explanation": "としか言いようがない and としか思えない both mean 'there's no way to see it other than X' — they're close, standard ways to state an unavoidable conclusion.",
                    "oldCore": null,
                    "translationMn": "Тэр шалтгааныг сул гэж л нэрлэж болно.",
                    "explanationMn": "としか言いようがない болон としか思えない хоёулаа \"X-ээс өөрөөр харах арга байхгүй\" гэсэн утгатай — эдгээр нь зайлшгүй дүгнэлтийг илэрхийлэх ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "この<ruby>地域<rp>(</rp><rt>ちいき</rt><rp>)</rp></ruby>の<ruby>経済<rp>(</rp><rt>けいざい</rt><rp>)</rp></ruby>は<ruby>観光業<rp>(</rp><rt>かんこうぎょう</rt><rp>)</rp></ruby>",
                    "old": "なくしては<ruby>成<rp>(</rp><rt>な</rt><rp>)</rp></ruby>り<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>たない",
                    "new": "なしには<ruby>成<rp>(</rp><rt>な</rt><rp>)</rp></ruby>り<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>たない",
                    "suffix": "。",
                    "translation": "This region's economy can't stand on its own without the tourism industry.",
                    "explanation": "なくして and なしに both mean 'without X' in a formal, written register — they're standard, interchangeable forms of the same construction.",
                    "oldCore": "なくして",
                    "newCore": "なしに",
                    "translationMn": "Энэ бүс нутгийн эдийн засаг аялал жуулчлалын салбаргүйгээр бие даан оршин тогтнож чадахгүй.",
                    "explanationMn": "なくして болон なしに хоёулаа албан ёсны, бичгийн хэв маягт \"X-гүйгээр\" гэсэн утгатай — эдгээр нь ижил бүтцийн стандарт, сольж хэрэглэгддэг хэлбэрүүд юм."
                },
                {
                    "prefix": "その<ruby>成果<rp>(</rp><rt>せいか</rt><rp>)</rp></ruby>は<ruby>並大抵<rp>(</rp><rt>なみたいてい</rt><rp>)</rp></ruby>の<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>で",
                    "old": "<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>られるものではない",
                    "new": "<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>られるはずがない",
                    "suffix": "。",
                    "translation": "That achievement isn't something ordinary effort could produce.",
                    "explanation": "ものではない and はずがない both firmly reject a possibility — they're close, standard interchangeable ways to state that something couldn't have happened the easy way.",
                    "oldCore": null,
                    "translationMn": "Тэр амжилт нь энгийн хичээл зүтгэлээр гарах зүйл биш.",
                    "explanationMn": "ものではない болон はずがない хоёулаа боломжийг тэс үгүйсгэдэг — эдгээр нь ямар нэг зүйл амархан аргаар болоогүй байх ёстойг илэрхийлэх ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>は<ruby>個人<rp>(</rp><rt>こじん</rt><rp>)</rp></ruby>の<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>に",
                    "old": "とどまらず",
                    "new": "かぎらず",
                    "suffix": "、<ruby>社会全体<rp>(</rp><rt>しゃかいぜんたい</rt><rp>)</rp></ruby>の<ruby>課題<rp>(</rp><rt>かだい</rt><rp>)</rp></ruby>だ。",
                    "translation": "This issue isn't limited to individual effort — it's a challenge for society as a whole.",
                    "explanation": "にとどまらず and にかぎらず both mean 'not limited to X' when expanding a claim beyond its first scope — they're standard, interchangeable ways to broaden the point.",
                    "oldCore": "にとどまらず",
                    "newCore": "にかぎらず",
                    "translationMn": "Энэ асуудал зөвхөн хувь хүний хичээл зүтгэлээр хязгаарлагдахгүй, нийт нийгмийн сорилт юм.",
                    "explanationMn": "にとどまらず болон にかぎらず хоёулаа мэдэгдлийг анхны хүрээнээс тэлэхдээ \"X-д хязгаарлагдахгүй\" гэсэн утгатай — эдгээр нь санааг өргөжүүлэх стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "その<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>の<ruby>味<rp>(</rp><rt>あじ</rt><rp>)</rp></ruby>は<ruby>一度<rp>(</rp><rt>いちど</rt><rp>)</rp></ruby>",
                    "old": "<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べたら<ruby>忘<rp>(</rp><rt>わす</rt><rp>)</rp></ruby>れられない",
                    "new": "<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べたが<ruby>最後<rp>(</rp><rt>さいご</rt><rp>)</rp></ruby>、<ruby>忘<rp>(</rp><rt>わす</rt><rp>)</rp></ruby>れられない",
                    "suffix": "。",
                    "translation": "Once you've tasted that shop's food, you'll never forget it.",
                    "explanation": "たら and たが最後 can both mark 'once X happens, an irreversible result follows' — たが最後 adds extra emphasis on there being no going back, but here both land on the same 'you're hooked for good' meaning.",
                    "oldCore": null,
                    "translationMn": "Тэр дэлгүүрийн хоолыг нэг амталсан бол хэзээ ч мартахгүй.",
                    "explanationMn": "たら болон たが最後 хоёулаа \"X болмогц эргэлт буцалтгүй үр дүн дагана\"-ыг заадаг — たが最後 нь буцах боломжгүйг нэмж онцолдог ч энд хоёул ижил \"мөнхөд татагдсан\" гэсэн утгад хүрдэг."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>失敗<rp>(</rp><rt>しっぱい</rt><rp>)</rp></ruby>を<ruby>重<rp>(</rp><rt>かさ</rt><rp>)</rp></ruby>ね",
                    "old": "つつも",
                    "new": "ながらも",
                    "suffix": "、<ruby>最後<rp>(</rp><rt>さいご</rt><rp>)</rp></ruby>まで<ruby>挑戦<rp>(</rp><rt>ちょうせん</rt><rp>)</rp></ruby>をやめなかった。",
                    "translation": "Even while repeatedly failing, he never stopped challenging himself until the end.",
                    "explanation": "つつも and ながらも both mean 'while also/even though X' when two contrasting things happen at once — they're standard, interchangeable forms of the same concessive link.",
                    "oldCore": "つつも",
                    "newCore": null,
                    "translationMn": "Давтан бүтэлгүйтсэн ч тэр эцсээ хүртэл өөрийгөө сорихоо больсонгүй.",
                    "explanationMn": "つつも болон ながらも хоёулаа хоёр эсрэг зүйл зэрэг болох үед \"X хийж байхад/хийсэн ч гэсэн\" гэсэн утгатай — эдгээр нь ижил зөвшилцлийн холбогчийн стандарт, сольж хэрэглэгддэг хэлбэрүүд юм."
                },
                {
                    "prefix": "その<ruby>案<rp>(</rp><rt>あん</rt><rp>)</rp></ruby>に<ruby>賛成<rp>(</rp><rt>さんせい</rt><rp>)</rp></ruby>する<ruby>者<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>は",
                    "old": "<ruby>皆無<rp>(</rp><rt>かいむ</rt><rp>)</rp></ruby>に<ruby>近<rp>(</rp><rt>ちか</rt><rp>)</rp></ruby>かった",
                    "new": "ほとんどいなかった",
                    "suffix": "。",
                    "translation": "There was almost no one who agreed with that proposal.",
                    "explanation": "皆無に近い and ほとんどいない both describe an amount as essentially zero — 皆無に近い is simply the more formal, written way of making the same claim.",
                    "oldCore": null,
                    "translationMn": "Тэр саналыг дэмжсэн хүн бараг байсангүй.",
                    "explanationMn": "皆無に近い болон ほとんどいない хоёулаа хэмжээг үндсэндээ тэг гэж тодорхойлдог — 皆無に近い нь зөвхөн ижил мэдэгдлийг хийх илүү албан ёсны, бичгийн арга юм."
                }
            ]
        },
        {
            "level": 14,
            "title": "Advanced · Level 14",
            "sentences": [
                {
                    "prefix": "この<ruby>地域<rp>(</rp><rt>ちいき</rt><rp>)</rp></ruby>で<ruby>大地震<rp>(</rp><rt>だいじしん</rt><rp>)</rp></ruby>が<ruby>発生<rp>(</rp><rt>はっせい</rt><rp>)</rp></ruby>する",
                    "old": "おそれがある",
                    "new": "<ruby>可能性<rp>(</rp><rt>かのうせい</rt><rp>)</rp></ruby>がある",
                    "suffix": "。",
                    "translation": "There's a risk of a major earthquake occurring in this region.",
                    "explanation": "おそれがある and 可能性がある both point to a possibility, though おそれがある leans specifically toward a bad or dangerous outcome — for a disaster risk like this, both read the same way.",
                    "oldCore": null,
                    "translationMn": "Энэ бүс нутагт хүчтэй газар хөдлөлт болох эрсдэл бий.",
                    "explanationMn": "おそれがある болон 可能性がある хоёулаа боломжийг заадаг, гэхдээ おそれがある нь тухайлбал муу буюу аюултай үр дүнд дөхдөг — ийм гамшгийн эрсдэлийн хувьд хоёул ижилхэн уншигдана."
                },
                {
                    "prefix": "<ruby>政府<rp>(</rp><rt>せいふ</rt><rp>)</rp></ruby>の<ruby>対応<rp>(</rp><rt>たいおう</rt><rp>)</rp></ruby>の<ruby>遅<rp>(</rp><rt>おそ</rt><rp>)</rp></ruby>さは",
                    "old": "<ruby>批判<rp>(</rp><rt>ひはん</rt><rp>)</rp></ruby>を<ruby>免<rp>(</rp><rt>まぬが</rt><rp>)</rp></ruby>れない",
                    "new": "<ruby>非難<rp>(</rp><rt>ひなん</rt><rp>)</rp></ruby>を<ruby>免<rp>(</rp><rt>まぬが</rt><rp>)</rp></ruby>れない",
                    "suffix": "。",
                    "translation": "The government's slow response cannot escape criticism.",
                    "explanation": "批判を免れない and 非難を免れない both mean 'cannot avoid criticism' — 批判 and 非難 are close-enough synonyms for 'criticism' that the two phrases read the same way here.",
                    "oldCore": null,
                    "translationMn": "Засгийн газрын удаан хариу арга хэмжээ шүүмжлэлээс зайлсхийж чадахгүй.",
                    "explanationMn": "批判を免れない болон 非難を免れない хоёулаа \"шүүмжлэлээс зайлсхийж чадахгүй\" гэсэн утгатай — 批判 болон 非難 нь \"шүүмжлэл\"-ийн ойролцоо ижил утгатай үг тул энд хоёр хэллэг ижилхэн уншигдана."
                },
                {
                    "prefix": "<ruby>優勝<rp>(</rp><rt>ゆうしょう</rt><rp>)</rp></ruby>を<ruby>目前<rp>(</rp><rt>もくぜん</rt><rp>)</rp></ruby>にして<ruby>敗<rp>(</rp><rt>やぶ</rt><rp>)</rp></ruby>れる",
                    "old": "とは、<ruby>無念<rp>(</rp><rt>むねん</rt><rp>)</rp></ruby>というほかない",
                    "new": "とは、<ruby>無念<rp>(</rp><rt>むねん</rt><rp>)</rp></ruby>というしかない",
                    "suffix": "。",
                    "translation": "To lose with the championship in sight — there's no word for it but regret.",
                    "explanation": "というほかない and というしかない both mean 'there's no choice but to call it X' — they're genuinely interchangeable, with ほかない reading as slightly more formal.",
                    "oldCore": null,
                    "translationMn": "Аваргалах шатанд ялагдах нь харамсал гэдгээс өөр үг олдохгүй байна.",
                    "explanationMn": "というほかない болон というしかない хоёулаа \"X гэж нэрлэхээс өөр аргагүй\" гэсэн утгатай — эдгээрийг жинхэнэ сольж хэрэглэж болно, ほかない нь бага зэрэг илүү албан ёсны сонстог."
                },
                {
                    "prefix": "この<ruby>方針<rp>(</rp><rt>ほうしん</rt><rp>)</rp></ruby>は<ruby>現場<rp>(</rp><rt>げんば</rt><rp>)</rp></ruby>の<ruby>実情<rp>(</rp><rt>じつじょう</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>無視<rp>(</rp><rt>むし</rt><rp>)</rp></ruby>した",
                    "new": "<ruby>踏<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>まえていない",
                    "suffix": "ものだ。",
                    "translation": "This policy is something that ignores the realities on the ground.",
                    "explanation": "を無視した and をふまえていない both describe a policy as disconnected from the actual situation — 無視した is a more direct 'ignored,' while ふまえていない frames it as 'not taking into account,' but both land on the same criticism here.",
                    "oldCore": null,
                    "translationMn": "Энэ бодлого бодит нөхцөл байдлыг үл тоомсорлосон зүйл юм.",
                    "explanationMn": "を無視した болон をふまえていない хоёулаа бодлогыг бодит нөхцөл байдалтай тасарсан гэж тодорхойлдог — 無視した нь илүү шууд \"тоохгүй байсан\" бол ふまえていない нь \"харгалзаагүй\" мэт харуулдаг, гэхдээ хоёул энд ижил шүүмжлэлд хүрдэг."
                },
                {
                    "prefix": "この<ruby>制度<rp>(</rp><rt>せいど</rt><rp>)</rp></ruby>の<ruby>導入<rp>(</rp><rt>どうにゅう</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>皮切<rp>(</rp><rt>かわき</rt><rp>)</rp></ruby>りに、さまざまな<ruby>改革<rp>(</rp><rt>かいかく</rt><rp>)</rp></ruby>が<ruby>進<rp>(</rp><rt>すす</rt><rp>)</rp></ruby>められた",
                    "new": "きっかけに、さまざまな<ruby>改革<rp>(</rp><rt>かいかく</rt><rp>)</rp></ruby>が<ruby>進<rp>(</rp><rt>すす</rt><rp>)</rp></ruby>められた",
                    "suffix": "。",
                    "translation": "Starting with the introduction of this system, various reforms were carried out.",
                    "explanation": "を皮切りに and をきっかけに both mark 'starting from X, a series of things followed' — 皮切りに is the more formal, written version of the everyday きっかけに.",
                    "oldCore": null,
                    "translationMn": "Энэ системийг нэвтрүүлснээс эхлэн олон төрлийн шинэчлэл хийгдсэн.",
                    "explanationMn": "を皮切りに болон をきっかけに хоёулаа \"X-ээс эхлэн, хэд хэдэн зүйл дараалав\"-ыг заадаг — 皮切りに нь өдөр тутмын きっかけに-ийн илүү албан ёсны, бичгийн хувилбар юм."
                },
                {
                    "prefix": "その<ruby>証言<rp>(</rp><rt>しょうげん</rt><rp>)</rp></ruby>の<ruby>信憑性<rp>(</rp><rt>しんぴょうせい</rt><rp>)</rp></ruby>には",
                    "old": "<ruby>疑問<rp>(</rp><rt>ぎもん</rt><rp>)</rp></ruby>の<ruby>余地<rp>(</rp><rt>よち</rt><rp>)</rp></ruby>がある",
                    "new": "<ruby>疑<rp>(</rp><rt>うたが</rt><rp>)</rp></ruby>わしい<ruby>点<rp>(</rp><rt>てん</rt><rp>)</rp></ruby>がある",
                    "suffix": "。",
                    "translation": "There are grounds for doubt regarding that testimony's credibility.",
                    "explanation": "疑問の余地がある and 疑わしい点がある both point to reasonable doubt about something — they're close, standard ways to raise the same kind of skepticism.",
                    "oldCore": null,
                    "translationMn": "Тэр гэрчлэлийн итгэл үнэмшилд эргэлзэх үндэслэл бий.",
                    "explanationMn": "疑問の余地がある болон 疑わしい点がある хоёулаа ямар нэг зүйлийн тухай үндэслэлтэй эргэлзээг заадаг — эдгээр нь ижил төрлийн сэжиглэлийг гаргах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "この<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>の<ruby>製品<rp>(</rp><rt>せいひん</rt><rp>)</rp></ruby>は<ruby>安全性<rp>(</rp><rt>あんぜんせい</rt><rp>)</rp></ruby>のみならず、デザインの<ruby>美<rp>(</rp><rt>うつく</rt><rp>)</rp></ruby>しさに",
                    "old": "おいても<ruby>高<rp>(</rp><rt>たか</rt><rp>)</rp></ruby>く<ruby>評価<rp>(</rp><rt>ひょうか</rt><rp>)</rp></ruby>されている",
                    "new": "しても<ruby>高<rp>(</rp><rt>たか</rt><rp>)</rp></ruby>く<ruby>評価<rp>(</rp><rt>ひょうか</rt><rp>)</rp></ruby>されている",
                    "suffix": "。",
                    "translation": "This company's products are highly rated not only for safety but also for design beauty.",
                    "explanation": "においても and にしても can both mean 'even in terms of X' when adding another point of praise — they're close, standard partners for extending an evaluation to a second dimension.",
                    "oldCore": null,
                    "translationMn": "Энэ компанийн бүтээгдэхүүн аюулгүй байдлаараа төдийгүй загварын гоо үзэсгэлэнгээрээ ч өндөр үнэлэгддэг.",
                    "explanationMn": "においても болон にしても хоёулаа өөр нэг магтаалын санааг нэмэхдээ \"X-ийн хувьд ч гэсэн\" гэсэн утгатай байж болно — эдгээр нь үнэлгээг хоёр дахь хэмжээст өргөжүүлэх ойролцоо, стандарт хос юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>周囲<rp>(</rp><rt>しゅうい</rt><rp>)</rp></ruby>の<ruby>心配<rp>(</rp><rt>しんぱい</rt><rp>)</rp></ruby>を",
                    "old": "よそに",
                    "new": "<ruby>気<rp>(</rp><rt>き</rt><rp>)</rp></ruby>にせず",
                    "suffix": "、<ruby>単独<rp>(</rp><rt>たんどく</rt><rp>)</rp></ruby>で<ruby>登山<rp>(</rp><rt>とざん</rt><rp>)</rp></ruby>に<ruby>向<rp>(</rp><rt>む</rt><rp>)</rp></ruby>かった。",
                    "translation": "Paying no mind to the concern around him, he headed off to climb the mountain alone.",
                    "explanation": "をよそに and を気にせず both describe disregarding something others care about — をよそに carries a slightly more literary, pointed tone, but both land on the same 'ignoring the worry' meaning here.",
                    "oldCore": "をよそに",
                    "newCore": null,
                    "translationMn": "Эргэн тойрны түгшүүрийг тоохгүйгээр тэр ганцаараа уул авахаар явсан.",
                    "explanationMn": "をよそに болон を気にせず хоёулаа бусад санаа зовдог зүйлийг үл тоомсорлохыг тодорхойлдог — をよそに нь бага зэрэг илүү утга зохиолын, ирмэгтэй өнгийг агуулдаг ч энд хоёул ижил \"санаа зовнилыг үл тоомсорлох\" гэсэн утгад хүрдэг."
                },
                {
                    "prefix": "この<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby>だけでは、<ruby>事故<rp>(</rp><rt>じこ</rt><rp>)</rp></ruby>の<ruby>原因<rp>(</rp><rt>げんいん</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>特定<rp>(</rp><rt>とくてい</rt><rp>)</rp></ruby>するに<ruby>至<rp>(</rp><rt>いた</rt><rp>)</rp></ruby>らない",
                    "new": "<ruby>特定<rp>(</rp><rt>とくてい</rt><rp>)</rp></ruby>することはできない",
                    "suffix": "。",
                    "translation": "This document alone isn't enough to pinpoint the cause of the accident.",
                    "explanation": "に至らない and することはできない both conclude that something falls short of being achieved — に至らない is the more formal, written way of stating the same shortfall.",
                    "oldCore": null,
                    "translationMn": "Зөвхөн энэ баримт бичгээр ослын шалтгааныг тодорхойлоход хангалтгүй.",
                    "explanationMn": "に至らない болон することはできない хоёулаа ямар нэг зүйл хүрч чадаагүй гэдгийг дүгнэдэг — に至らない нь ижил дутагдлыг илэрхийлэх илүү албан ёсны, бичгийн арга юм."
                },
                {
                    "prefix": "この<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>の<ruby>根<rp>(</rp><rt>ね</rt><rp>)</rp></ruby>は<ruby>深<rp>(</rp><rt>ふか</rt><rp>)</rp></ruby>く、<ruby>一朝一夕<rp>(</rp><rt>いっちょういっせき</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>解決<rp>(</rp><rt>かいけつ</rt><rp>)</rp></ruby>できるものではない",
                    "new": "<ruby>解決<rp>(</rp><rt>かいけつ</rt><rp>)</rp></ruby>できるはずがない",
                    "suffix": "。",
                    "translation": "This problem runs deep, and there's no way it can be solved overnight.",
                    "explanation": "ものではない and はずがない both firmly reject a possibility — they're close, standard interchangeable ways to state that a quick fix couldn't work.",
                    "oldCore": null,
                    "translationMn": "Энэ асуудал гүнзгий бөгөөд нэг шөнийн дотор шийдэгдэх боломжгүй.",
                    "explanationMn": "ものではない болон はずがない хоёулаа боломжийг тэс үгүйсгэдэг — эдгээр нь хурдан шийдэл ажиллаагүй байх ёстойг илэрхийлэх ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                }
            ]
        },
        {
            "level": 15,
            "title": "Advanced · Level 15",
            "sentences": [
                {
                    "prefix": "その<ruby>選手<rp>(</rp><rt>せんしゅ</rt><rp>)</rp></ruby>の<ruby>活躍<rp>(</rp><rt>かつやく</rt><rp>)</rp></ruby>ぶりは、まさに<ruby>驚異<rp>(</rp><rt>きょうい</rt><rp>)</rp></ruby>という",
                    "old": "ほかない",
                    "new": "しかない",
                    "suffix": "。",
                    "translation": "That player's performance can only be called astonishing.",
                    "explanation": "というほかない and というしかない both mean 'there's no choice but to call it X' — they're genuinely interchangeable, with ほかない reading as slightly more formal.",
                    "oldCore": null,
                    "translationMn": "Тэр тоглогчийн гүйцэтгэлийг гайхалтай гэж л хэлж болно.",
                    "explanationMn": "というほかない болон というしかない хоёулаа \"X гэж нэрлэхээс өөр аргагүй\" гэсэн утгатай — эдгээрийг жинхэнэ сольж хэрэглэж болно, ほかない нь бага зэрэг илүү албан ёсны сонстог."
                },
                {
                    "prefix": "この<ruby>状況<rp>(</rp><rt>じょうきょう</rt><rp>)</rp></ruby>で<ruby>撤退<rp>(</rp><rt>てったい</rt><rp>)</rp></ruby>を<ruby>決断<rp>(</rp><rt>けつだん</rt><rp>)</rp></ruby>する",
                    "old": "とは、<ruby>勇気<rp>(</rp><rt>ゆうき</rt><rp>)</rp></ruby>ある<ruby>判断<rp>(</rp><rt>はんだん</rt><rp>)</rp></ruby>だったと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "new": "とは、<ruby>勇気<rp>(</rp><rt>ゆうき</rt><rp>)</rp></ruby>ある<ruby>判断<rp>(</rp><rt>はんだん</rt><rp>)</rp></ruby>だったと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わないわけにはいかない",
                    "suffix": "。",
                    "translation": "To decide to withdraw under these circumstances — you have to call that a courageous decision.",
                    "explanation": "ざるを得ない and ないわけにはいかない both express having no real choice but to concede a point — they're standard, well-documented interchangeable forms.",
                    "oldCore": "ざるをえない",
                    "newCore": null,
                    "translationMn": "Ийм нөхцөлд гарахаар шийдэх нь зоригтой шийдвэр гэдгийг хүлээн зөвшөөрөх ёстой.",
                    "explanationMn": "ざるを得ない болон ないわけにはいかない хоёулаа санааг хүлээн зөвшөөрөхөөс өөр жинхэнэ сонголтгүй байгааг илэрхийлдэг — эдгээр нь стандарт, сайн баримтжуулагдсан сольж хэрэглэгддэг хэлбэрүүд юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>言動<rp>(</rp><rt>げんどう</rt><rp>)</rp></ruby>は<ruby>指導者<rp>(</rp><rt>しどうしゃ</rt><rp>)</rp></ruby>と",
                    "old": "して<ruby>恥<rp>(</rp><rt>は</rt><rp>)</rp></ruby>ずべきものだ",
                    "new": "してふさわしくないものだ",
                    "suffix": "。",
                    "translation": "His words and conduct are shameful for someone in a leadership position.",
                    "explanation": "恥ずべきものだ and ふさわしくないものだ both criticize behavior as unbecoming of a role — 恥ずべき carries a stronger sense of disgrace, but both land on the same disapproval here.",
                    "oldCore": null,
                    "translationMn": "Түүний үг үйлдэл удирдах албан тушаалтай хүнд зохисгүй, ичгүүртэй байна.",
                    "explanationMn": "恥ずべきものだ болон ふさわしくないものだ хоёулаа зан төлвийг ролид тохирохгүй гэж шүүмжилдэг — 恥ずべき нь ичгүүрийн илүү хүчтэй мэдрэмжийг агуулдаг ч энд хоёул ижил үл зөвшөөрөлд хүрдэг."
                },
                {
                    "prefix": "この<ruby>論文<rp>(</rp><rt>ろんぶん</rt><rp>)</rp></ruby>は<ruby>独創的<rp>(</rp><rt>どくそうてき</rt><rp>)</rp></ruby>な<ruby>視点<rp>(</rp><rt>してん</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>富<rp>(</rp><rt>と</rt><rp>)</rp></ruby>んでいる",
                    "new": "あふれている",
                    "suffix": "。",
                    "translation": "This paper is full of original perspectives.",
                    "explanation": "富んでいる and あふれている both describe something as abundant in a quality — they're close, standard interchangeable ways to praise a work's richness.",
                    "oldCore": null,
                    "translationMn": "Энэ өгүүлэл өвөрмөц үзэл бодлоор дүүрэн байна.",
                    "explanationMn": "富んでいる болон あふれている хоёулаа ямар нэг зүйлийг чанараараа элбэг гэж тодорхойлдог — эдгээр нь бүтээлийн баялгийг магтах ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>発見<rp>(</rp><rt>はっけん</rt><rp>)</rp></ruby>は<ruby>科学界<rp>(</rp><rt>かがくかい</rt><rp>)</rp></ruby>に<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きな",
                    "old": "<ruby>衝撃<rp>(</rp><rt>しょうげき</rt><rp>)</rp></ruby>をもたらした",
                    "new": "インパクトを<ruby>与<rp>(</rp><rt>あた</rt><rp>)</rp></ruby>えた",
                    "suffix": "。",
                    "translation": "This discovery brought a great shock to the scientific community.",
                    "explanation": "衝撃をもたらした and インパクトを与えた both describe causing a strong impact — they're close, standard interchangeable ways to say something shook up a field.",
                    "oldCore": null,
                    "translationMn": "Энэ нээлт эрдэм шинжилгээний нийгэмлэгт асар их цочролыг авчирсан.",
                    "explanationMn": "衝撃をもたらした болон インパクトを与えた хоёулаа хүчтэй нөлөө үзүүлснийг тодорхойлдог — эдгээр нь ямар нэг зүйл салбарыг донсолгосныг хэлэх ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "その<ruby>政治家<rp>(</rp><rt>せいじか</rt><rp>)</rp></ruby>の<ruby>発言<rp>(</rp><rt>はつげん</rt><rp>)</rp></ruby>は、<ruby>国民<rp>(</rp><rt>こくみん</rt><rp>)</rp></ruby>の<ruby>信頼<rp>(</rp><rt>しんらい</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>損<rp>(</rp><rt>そこ</rt><rp>)</rp></ruby>なうものと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "new": "<ruby>損<rp>(</rp><rt>そこ</rt><rp>)</rp></ruby>なうものだと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>うほかない",
                    "suffix": "。",
                    "translation": "That politician's remark can only be described as undermining public trust.",
                    "explanation": "ざるを得ない and ほかない both express there being no way around a conclusion — they're close, standard ways to state that a criticism is simply unavoidable.",
                    "oldCore": "ざるをえない",
                    "newCore": null,
                    "translationMn": "Тэр улс төрчийн мэдэгдэл олон нийтийн итгэлийг сулруулсан гэж л хэлж болно.",
                    "explanationMn": "ざるを得ない болон ほかない хоёулаа дүгнэлтийг тойрч гарах аргагүйг илэрхийлдэг — эдгээр нь шүүмжлэл зайлшгүй болохыг заах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "<ruby>被害者<rp>(</rp><rt>ひがいしゃ</rt><rp>)</rp></ruby>の<ruby>苦痛<rp>(</rp><rt>くつう</rt><rp>)</rp></ruby>は、<ruby>想像する<rp>(</rp><rt>そうぞうする</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>余<rp>(</rp><rt>あま</rt><rp>)</rp></ruby>りある",
                    "new": "かたくない",
                    "suffix": "。",
                    "translation": "The victim's suffering is more than one can imagine.",
                    "explanation": "想像するに余りある and 想像するにかたくない both mean the pain is easy or overwhelming to imagine — 余りある leans toward 'beyond imagining,' while かたくない leans toward 'not hard to imagine,' but both land on 'clearly immense' in this kind of sentence.",
                    "oldCore": null,
                    "translationMn": "Хохирогчийн зовлон төсөөлж баршгүй их байна.",
                    "explanationMn": "想像するに余りある болон 想像するにかたくない хоёулаа өвдөлт төсөөлөхөд амархан буюу дийлдэшгүй гэдгийг илэрхийлдэг — 余りある нь \"төсөөлөхөөс давсан\"-д дөхдөг бол かたくない нь \"төсөөлөхөд хэцүү биш\"-д дөхдөг, гэхдээ ийм өгүүлбэрт хоёул \"мэдээж асар их\" гэдэгт хүрдэг."
                },
                {
                    "prefix": "この<ruby>方針<rp>(</rp><rt>ほうしん</rt><rp>)</rp></ruby>を<ruby>転換<rp>(</rp><rt>てんかん</rt><rp>)</rp></ruby>する",
                    "old": "に<ruby>至<rp>(</rp><rt>いた</rt><rp>)</rp></ruby>った<ruby>経緯<rp>(</rp><rt>けいい</rt><rp>)</rp></ruby>には、いくつかの<ruby>要因<rp>(</rp><rt>よういん</rt><rp>)</rp></ruby>がある",
                    "new": "ことになった<ruby>背景<rp>(</rp><rt>はいけい</rt><rp>)</rp></ruby>には、いくつかの<ruby>要因<rp>(</rp><rt>よういん</rt><rp>)</rp></ruby>がある",
                    "suffix": "。",
                    "translation": "There are several factors behind the circumstances that led to this shift in policy.",
                    "explanation": "に至った経緯 and ことになった背景 both describe the chain of events leading up to a change — they're close, standard ways to frame 'how we got here.'",
                    "oldCore": null,
                    "translationMn": "Энэ бодлогын өөрчлөлтөд хүргэсэн нөхцөл байдлын ард хэд хэдэн хүчин зүйл байдаг.",
                    "explanationMn": "に至った経緯 болон ことになった背景 хоёулаа өөрчлөлт рүү хүргэсэн үйл явдлын гинжин холбоог тодорхойлдог — эдгээр нь \"бид энд хэрхэн ирсэн бэ\" гэдгийг харуулах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "その<ruby>結論<rp>(</rp><rt>けつろん</rt><rp>)</rp></ruby>は、データに",
                    "old": "<ruby>基<rp>(</rp><rt>もと</rt><rp>)</rp></ruby>づいたものというより、<ruby>憶測<rp>(</rp><rt>おくそく</rt><rp>)</rp></ruby>の<ruby>域<rp>(</rp><rt>いき</rt><rp>)</rp></ruby>を<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>ない",
                    "new": "<ruby>基<rp>(</rp><rt>もと</rt><rp>)</rp></ruby>づいたものというより、<ruby>推測<rp>(</rp><rt>すいそく</rt><rp>)</rp></ruby>にすぎない",
                    "suffix": "。",
                    "translation": "That conclusion, rather than being based on data, doesn't go beyond speculation.",
                    "explanation": "憶測の域を出ない and 推測にすぎない both dismiss a claim as mere guesswork — they're close, standard ways to downgrade a conclusion to 'just speculation.'",
                    "oldCore": null,
                    "newCore": "にすぎない",
                    "translationMn": "Тэр дүгнэлт нь өгөгдөлд үндэслэсэн гэхээсээ илүү таамаглалаас хэтрэхгүй байна.",
                    "explanationMn": "憶測の域を出ない болон 推測にすぎない хоёулаа мэдэгдлийг зөвхөн таамаглал гэж үгүйсгэдэг — эдгээр нь дүгнэлтийг \"зөвхөн таамаглал\" болгон бууруулах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "<ruby>長年<rp>(</rp><rt>ながねん</rt><rp>)</rp></ruby>の<ruby>研究<rp>(</rp><rt>けんきゅう</rt><rp>)</rp></ruby>の",
                    "old": "たまものと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>えるだろう",
                    "new": "<ruby>成果<rp>(</rp><rt>せいか</rt><rp>)</rp></ruby>にほかならないだろう",
                    "suffix": "。",
                    "translation": "It could be called the fruit of years of research.",
                    "explanation": "たまものと言える and にほかならない both credit a result entirely to its source — たまもの frames it as a 'fruit/reward,' while にほかならない frames it as 'nothing other than,' but both land on the same attribution here.",
                    "oldCore": null,
                    "newCore": "にほかならない",
                    "translationMn": "Үүнийг олон жилийн судалгааны үр шимд гэж хэлж болно.",
                    "explanationMn": "たまものと言える болон にほかならない хоёулаа үр дүнг бүрэн эх сурвалждаа тооцдог — たまもの нь \"үр жимс/шагнал\" мэт харуулдаг бол にほかならない нь \"өөр юу ч биш\" мэт харуулдаг, гэхдээ хоёул энд ижил хамаарлыг заадаг."
                }
            ]
        },
        {
            "level": 16,
            "title": "Advanced · Level 16",
            "sentences": [
                {
                    "prefix": "この<ruby>惨劇<rp>(</rp><rt>さんげき</rt><rp>)</rp></ruby>は<ruby>言葉<rp>(</rp><rt>ことば</rt><rp>)</rp></ruby>にする",
                    "old": "だに<ruby>恐<rp>(</rp><rt>おそ</rt><rp>)</rp></ruby>ろしい",
                    "new": "のもはばかられるほど<ruby>恐<rp>(</rp><rt>おそ</rt><rp>)</rp></ruby>ろしい",
                    "suffix": "。",
                    "translation": "This tragedy is terrifying even to put into words.",
                    "explanation": "だに恐ろしい and 言葉にするのもはばかられるほど恐ろしい both express that something is too dreadful to even mention — they're close, standard ways to convey the same horror.",
                    "oldCore": null,
                    "translationMn": "Энэ эмгэнэлт явдал үгээр илэрхийлэхэд ч аймшигтай.",
                    "explanationMn": "だに恐ろしい болон 言葉にするのもはばかられるほど恐ろしい хоёулаа ямар нэг зүйл дурдахад ч хэтэрхий аймшигтай гэдгийг илэрхийлдэг — эдгээр нь ижил аймшгийг илэрхийлэх ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "その<ruby>発言<rp>(</rp><rt>はつげん</rt><rp>)</rp></ruby>は<ruby>責任<rp>(</rp><rt>せきにん</rt><rp>)</rp></ruby>ある<ruby>立場<rp>(</rp><rt>たちば</rt><rp>)</rp></ruby>の<ruby>人間<rp>(</rp><rt>にんげん</rt><rp>)</rp></ruby>として",
                    "old": "<ruby>慎重<rp>(</rp><rt>しんちょう</rt><rp>)</rp></ruby>さに<ruby>欠<rp>(</rp><rt>か</rt><rp>)</rp></ruby>けると<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "new": "<ruby>軽率<rp>(</rp><rt>けいそつ</rt><rp>)</rp></ruby>のそしりを<ruby>免<rp>(</rp><rt>まぬが</rt><rp>)</rp></ruby>れない",
                    "suffix": "。",
                    "translation": "That remark cannot escape criticism for lacking the discretion expected of someone in a position of responsibility.",
                    "explanation": "ざるを得ない and そしりを免れない both express that a harsh judgment is unavoidable — they're close, standard ways of saying a criticism is warranted and inescapable.",
                    "oldCore": "ざるをえない",
                    "newCore": null,
                    "translationMn": "Тэр мэдэгдэл хариуцлагатай хүнээс шаардагдах болгоомжгүй байдлаас болж шүүмжлэлээс зайлсхийж чадахгүй.",
                    "explanationMn": "ざるを得ない болон そしりを免れない хоёулаа хатуу шүүлт зайлшгүй болохыг илэрхийлдэг — эдгээр нь шүүмжлэл зохистой бөгөөд зайлсхийх аргагүй гэдгийг хэлэх ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "この<ruby>条約<rp>(</rp><rt>じょうやく</rt><rp>)</rp></ruby>が<ruby>締結<rp>(</rp><rt>ていけつ</rt><rp>)</rp></ruby>された",
                    "old": "ことで、<ruby>両国<rp>(</rp><rt>りょうこく</rt><rp>)</rp></ruby>の<ruby>関係<rp>(</rp><rt>かんけい</rt><rp>)</rp></ruby>は<ruby>新<rp>(</rp><rt>あら</rt><rp>)</rp></ruby>たな<ruby>段階<rp>(</rp><rt>だんかい</rt><rp>)</rp></ruby>を<ruby>迎<rp>(</rp><rt>むか</rt><rp>)</rp></ruby>えた",
                    "new": "ことにより、<ruby>両国<rp>(</rp><rt>りょうこく</rt><rp>)</rp></ruby>の<ruby>関係<rp>(</rp><rt>かんけい</rt><rp>)</rp></ruby>は<ruby>新<rp>(</rp><rt>あら</rt><rp>)</rp></ruby>たな<ruby>段階<rp>(</rp><rt>だんかい</rt><rp>)</rp></ruby>を<ruby>迎<rp>(</rp><rt>むか</rt><rp>)</rp></ruby>えた",
                    "suffix": "。",
                    "translation": "With this treaty concluded, relations between the two countries entered a new stage.",
                    "explanation": "ことで and ことにより both mark 'as a result of X happening' — ことにより is simply the more formal, written version of the same causal link.",
                    "oldCore": null,
                    "translationMn": "Энэ гэрээ байгуулагдсанаар хоёр орны харилцаа шинэ шатанд орлоо.",
                    "explanationMn": "ことで болон ことにより хоёулаа \"X болсны үр дүнд\"-ийг заадаг — ことにより нь зөвхөн ижил учир шалтгааны холбоог илэрхийлэх илүү албан ёсны, бичгийн хувилбар юм."
                },
                {
                    "prefix": "この<ruby>一連<rp>(</rp><rt>いちれん</rt><rp>)</rp></ruby>の<ruby>騒動<rp>(</rp><rt>そうどう</rt><rp>)</rp></ruby>は、<ruby>企業<rp>(</rp><rt>きぎょう</rt><rp>)</rp></ruby>の<ruby>危機管理体制<rp>(</rp><rt>ききかんりたいせい</rt><rp>)</rp></ruby>の<ruby>甘<rp>(</rp><rt>あま</rt><rp>)</rp></ruby>さを",
                    "old": "<ruby>露呈<rp>(</rp><rt>ろてい</rt><rp>)</rp></ruby>したと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "new": "<ruby>浮<rp>(</rp><rt>う</rt><rp>)</rp></ruby>き<ruby>彫<rp>(</rp><rt>ぼ</rt><rp>)</rp></ruby>りにしたと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>うほかない",
                    "suffix": "。",
                    "translation": "This whole affair can only be said to have exposed the weakness of the company's crisis management.",
                    "explanation": "ざるを得ない and ほかない both express there being no way around a conclusion — they're close, standard ways to state that a criticism is unavoidable.",
                    "oldCore": "ざるをえない",
                    "newCore": null,
                    "translationMn": "Энэ бүхэл явдал компанийн хямралын үеийн удирдлагын сул талыг илчилсэн гэж л хэлж болно.",
                    "explanationMn": "ざるを得ない болон ほかない хоёулаа дүгнэлтийг тойрч гарах аргагүйг илэрхийлдэг — эдгээр нь шүүмжлэл зайлшгүй болохыг заах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "<ruby>現地<rp>(</rp><rt>げんち</rt><rp>)</rp></ruby>の<ruby>状況<rp>(</rp><rt>じょうきょう</rt><rp>)</rp></ruby>は、<ruby>報道<rp>(</rp><rt>ほうどう</rt><rp>)</rp></ruby>されている",
                    "old": "<ruby>以上<rp>(</rp><rt>いじょう</rt><rp>)</rp></ruby>に<ruby>深刻<rp>(</rp><rt>しんこく</rt><rp>)</rp></ruby>だ",
                    "new": "よりもはるかに<ruby>深刻<rp>(</rp><rt>しんこく</rt><rp>)</rp></ruby>だ",
                    "suffix": "。",
                    "translation": "The situation on the ground is far more serious than what's being reported.",
                    "explanation": "以上に and よりもはるかに both mean 'beyond X' when comparing the real severity to what's stated — either reads as the same emphatic comparison here.",
                    "oldCore": null,
                    "translationMn": "Бодит байдал мэдээлж байгаагаас хавьгүй ноцтой байна.",
                    "explanationMn": "以上に болон よりもはるかに хоёулаа жинхэнэ хүнд байдлыг мэдэгдсэн зүйлтэй харьцуулахдаа \"X-ээс давсан\" гэсэн утгатай — энд аль нь ч ижил онцолсон харьцуулалт мэт уншигдана."
                },
                {
                    "prefix": "この<ruby>制度<rp>(</rp><rt>せいど</rt><rp>)</rp></ruby>の<ruby>見直<rp>(</rp><rt>みなお</rt><rp>)</rp></ruby>しは",
                    "old": "<ruby>急務<rp>(</rp><rt>きゅうむ</rt><rp>)</rp></ruby>と<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "new": "<ruby>急務<rp>(</rp><rt>きゅうむ</rt><rp>)</rp></ruby>であるとしか<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>いようがない",
                    "suffix": "。",
                    "translation": "Reviewing this system can only be called an urgent priority.",
                    "explanation": "ざるを得ない and としか言いようがない both express there being no way around a conclusion — they're close, standard ways to state an assessment as unavoidable.",
                    "oldCore": "ざるをえない",
                    "newCore": null,
                    "translationMn": "Энэ системийг хянан үзэх нь яаралтай тэргүүлэх зорилт гэж л хэлж болно.",
                    "explanationMn": "ざるを得ない болон としか言いようがない хоёулаа дүгнэлтийг тойрч гарах аргагүйг илэрхийлдэг — эдгээр нь үнэлгээг зайлшгүй гэж заах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>提案<rp>(</rp><rt>ていあん</rt><rp>)</rp></ruby>は、コストの<ruby>面<rp>(</rp><rt>めん</rt><rp>)</rp></ruby>",
                    "old": "はさておき、アイデア<ruby>自体<rp>(</rp><rt>じたい</rt><rp>)</rp></ruby>は<ruby>評価<rp>(</rp><rt>ひょうか</rt><rp>)</rp></ruby>できる",
                    "new": "はともかく、アイデア<ruby>自体<rp>(</rp><rt>じたい</rt><rp>)</rp></ruby>は<ruby>評価<rp>(</rp><rt>ひょうか</rt><rp>)</rp></ruby>できる",
                    "suffix": "。",
                    "translation": "Setting aside the cost aspect, the idea itself is worth praising.",
                    "explanation": "はさておき and はともかく both mean 'setting X aside' before making the main point — they're standard, interchangeable ways to bracket off one factor.",
                    "oldCore": null,
                    "translationMn": "Өртгийн асуудлыг хойш тавихад, санаа нь өөрөө магтаал хүртэхүйц.",
                    "explanationMn": "はさておき болон はともかく хоёулаа гол санааг хэлэхийн өмнө \"X-ийг хойш тавьж\"-ийг заадаг — эдгээр нь нэг хүчин зүйлийг хааж тавих стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>取材<rp>(</rp><rt>しゅざい</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>通<rp>(</rp><rt>つう</rt><rp>)</rp></ruby>じて、<ruby>業界<rp>(</rp><rt>ぎょうかい</rt><rp>)</rp></ruby>の<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>られざる<ruby>一面<rp>(</rp><rt>いちめん</rt><rp>)</rp></ruby>が<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>えてきた",
                    "new": "<ruby>通<rp>(</rp><rt>とお</rt><rp>)</rp></ruby>して、<ruby>業界<rp>(</rp><rt>ぎょうかい</rt><rp>)</rp></ruby>の<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>られざる<ruby>一面<rp>(</rp><rt>いちめん</rt><rp>)</rp></ruby>が<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>えてきた",
                    "suffix": "。",
                    "translation": "Through this reporting, an unknown side of the industry came into view.",
                    "explanation": "を通じて and を通して both mean 'through/by means of X' — they're standard, interchangeable ways to frame the channel through which something was learned.",
                    "oldCore": null,
                    "translationMn": "Энэ мэдээллээр дамжуулан салбарын үл мэдэгдэх тал ил болсон.",
                    "explanationMn": "を通じて болон を通して хоёулаа \"X-ээр дамжуулан/аргаар\" гэсэн утгатай — эдгээр нь ямар нэг зүйлийг сурсан суваг руу заах стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>功績<rp>(</rp><rt>こうせき</rt><rp>)</rp></ruby>は、いくら",
                    "old": "<ruby>称賛<rp>(</rp><rt>しょうさん</rt><rp>)</rp></ruby>してもしきれない",
                    "new": "<ruby>称賛<rp>(</rp><rt>しょうさん</rt><rp>)</rp></ruby>しても<ruby>称賛<rp>(</rp><rt>しょうさん</rt><rp>)</rp></ruby>し<ruby>足<rp>(</rp><rt>た</rt><rp>)</rp></ruby>りない",
                    "suffix": "。",
                    "translation": "No matter how much you praise his achievements, it's never enough.",
                    "explanation": "てもしきれない and ても〜足りない both mean 'no amount of X is enough' — they're close, standard ways to express boundless praise.",
                    "oldCore": null,
                    "translationMn": "Түүний амжилтыг хэчнээн магтсан ч хангалттай биш.",
                    "explanationMn": "てもしきれない болон ても〜足りない хоёулаа \"X ямар ч хэмжээгээр хангалттай биш\" гэсэн утгатай — эдгээр нь хязгааргүй магтаалыг илэрхийлэх ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "この<ruby>論文<rp>(</rp><rt>ろんぶん</rt><rp>)</rp></ruby>の<ruby>結論<rp>(</rp><rt>けつろん</rt><rp>)</rp></ruby>は、これまでの<ruby>通説<rp>(</rp><rt>つうせつ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>覆<rp>(</rp><rt>くつがえ</rt><rp>)</rp></ruby>すものと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>っても<ruby>過言<rp>(</rp><rt>かごん</rt><rp>)</rp></ruby>ではない",
                    "new": "<ruby>覆<rp>(</rp><rt>くつがえ</rt><rp>)</rp></ruby>すものだと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>っても<ruby>差<rp>(</rp><rt>さ</rt><rp>)</rp></ruby>し<ruby>支<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>えない",
                    "suffix": "。",
                    "translation": "It's not an exaggeration to say this paper's conclusion overturns the conventional wisdom.",
                    "explanation": "と言っても過言ではない and と言っても差し支えない both soften a strong claim into 'it's fair to say' — they're standard, interchangeable ways to frame a bold statement as reasonable.",
                    "oldCore": null,
                    "translationMn": "Энэ өгүүллийн дүгнэлт уламжлалт ойлголтыг эргүүлдэг гэж хэлэхэд хэтрүүлэг биш.",
                    "explanationMn": "と言っても過言ではない болон と言っても差し支えない хоёулаа хүчтэй мэдэгдлийг \"гэж хэлэхэд шударга\" болгон зөөлрүүлдэг — эдгээр нь зоригтой мэдэгдлийг үндэслэлтэй мэт харуулах стандарт, сольж хэрэглэгддэг арга юм."
                }
            ]
        },
        {
            "level": 17,
            "title": "Advanced · Level 17",
            "sentences": [
                {
                    "prefix": "その<ruby>惨状<rp>(</rp><rt>さんじょう</rt><rp>)</rp></ruby>は、まさに",
                    "old": "<ruby>地獄絵図<rp>(</rp><rt>じごくえず</rt><rp>)</rp></ruby>さながらだった",
                    "new": "<ruby>地獄<rp>(</rp><rt>じごく</rt><rp>)</rp></ruby>そのものだった",
                    "suffix": "。",
                    "translation": "That devastation was truly like a scene straight out of hell.",
                    "explanation": "さながら and そのもの both mean 'just like/nothing other than X' when comparing something to an extreme image — they're close, standard ways to drive home the same vivid comparison.",
                    "oldCore": null,
                    "translationMn": "Тэр сүйрэл үнэхээр там шиг харагдаж байлаа.",
                    "explanationMn": "さながら болон そのもの хоёулаа туйлширсан дүр төрхтэй харьцуулахдаа \"яг л/X-ээс өөр юу ч биш\" гэсэн утгатай — эдгээр нь ижил тод харьцуулалтыг бататгах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "この<ruby>裏切<rp>(</rp><rt>うらぎ</rt><rp>)</rp></ruby>り<ruby>行為<rp>(</rp><rt>こうい</rt><rp>)</rp></ruby>は、<ruby>到底<rp>(</rp><rt>とうてい</rt><rp>)</rp></ruby>",
                    "old": "<ruby>許<rp>(</rp><rt>ゆる</rt><rp>)</rp></ruby>されるべきものではない",
                    "new": "<ruby>許<rp>(</rp><rt>ゆる</rt><rp>)</rp></ruby>し<ruby>難<rp>(</rp><rt>がた</rt><rp>)</rp></ruby>いものだ",
                    "suffix": "。",
                    "translation": "This act of betrayal is by no means something that can be forgiven.",
                    "explanation": "許されるべきものではない and 許し難いものだ both firmly reject the idea of forgiving something — they're close, standard ways to condemn an act as unforgivable.",
                    "oldCore": null,
                    "translationMn": "Энэ урвалтын үйлдлийг ямар ч тохиолдолд уучилж болохгүй.",
                    "explanationMn": "許されるべきものではない болон 許し難いものだ хоёулаа ямар нэг зүйлийг уучлах санааг тэс үгүйсгэдэг — эдгээр нь үйлдлийг уучлашгүй гэж буруутгах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "この<ruby>惨事<rp>(</rp><rt>さんじ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>教訓<rp>(</rp><rt>きょうくん</rt><rp>)</rp></ruby>として、<ruby>再発防止<rp>(</rp><rt>さいはつぼうし</rt><rp>)</rp></ruby>に<ruby>努<rp>(</rp><rt>つと</rt><rp>)</rp></ruby>めるべきだ",
                    "new": "<ruby>糧<rp>(</rp><rt>かて</rt><rp>)</rp></ruby>として、<ruby>再発防止<rp>(</rp><rt>さいはつぼうし</rt><rp>)</rp></ruby>に<ruby>努<rp>(</rp><rt>つと</rt><rp>)</rp></ruby>めるべきだ",
                    "suffix": "。",
                    "translation": "We should take this disaster as a lesson and work to prevent it from happening again.",
                    "explanation": "教訓として and 糧として both frame a painful event as something to learn and grow from — they're close, standard ways to turn a setback into future resolve.",
                    "oldCore": null,
                    "translationMn": "Энэ гамшгийг сургамж болгон дахин давтагдахгүй байхын тулд ажиллах ёстой.",
                    "explanationMn": "教訓として болон 糧として хоёулаа өвдөлттэй үйл явдлыг сурч, өсөх зүйл мэт харуулдаг — эдгээр нь бэрхшээлийг ирээдүйн шийдвэр рүү хувиргах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "この<ruby>一件<rp>(</rp><rt>いっけん</rt><rp>)</rp></ruby>は、<ruby>組織<rp>(</rp><rt>そしき</rt><rp>)</rp></ruby>の<ruby>構造的<rp>(</rp><rt>こうぞうてき</rt><rp>)</rp></ruby>な<ruby>欠陥<rp>(</rp><rt>けっかん</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>象徴<rp>(</rp><rt>しょうちょう</rt><rp>)</rp></ruby>するものと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>えよう",
                    "new": "<ruby>物語<rp>(</rp><rt>ものがた</rt><rp>)</rp></ruby>るものと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>えよう",
                    "suffix": "。",
                    "translation": "This incident could be said to symbolize a structural flaw in the organization.",
                    "explanation": "象徴する and 物語る both mean 'to represent/speak to' an underlying issue — they're close, standard ways a writer frames a single event as revealing something larger.",
                    "oldCore": null,
                    "translationMn": "Энэ явдал байгууллагын бүтцийн согогийг илэрхийлж байна гэж хэлж болно.",
                    "explanationMn": "象徴する болон 物語る хоёулаа далд асуудлыг \"төлөөлөх/илэрхийлэх\" гэсэн утгатай — эдгээр нь зохиолч нэг үйл явдлыг илүү том зүйлийг илчилж буй мэт харуулах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "<ruby>当局<rp>(</rp><rt>とうきょく</rt><rp>)</rp></ruby>の<ruby>発表<rp>(</rp><rt>はっぴょう</rt><rp>)</rp></ruby>には、いささか",
                    "old": "<ruby>疑問<rp>(</rp><rt>ぎもん</rt><rp>)</rp></ruby>を<ruby>禁<rp>(</rp><rt>きん</rt><rp>)</rp></ruby>じ<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "new": "<ruby>疑問<rp>(</rp><rt>ぎもん</rt><rp>)</rp></ruby>を<ruby>抱<rp>(</rp><rt>いだ</rt><rp>)</rp></ruby>かざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "suffix": "。",
                    "translation": "One can't help but feel a degree of doubt about the authorities' announcement.",
                    "explanation": "禁じ得ない and 抱かざるを得ない both mean 'can't help feeling X' about something suspicious — they're close, standard ways to express involuntary doubt.",
                    "oldCore": null,
                    "newCore": "ざるをえない",
                    "translationMn": "Эрх баригчдын мэдэгдэлд эргэлзэхгүй байж чадахгүй байна.",
                    "explanationMn": "禁じ得ない болон 抱かざるを得ない хоёулаа сэжигтэй зүйлийн талаар \"X мэдрэхгүй байж чадахгүй\" гэсэн утгатай — эдгээр нь өөрийн эрхгүй эргэлзээг илэрхийлэх ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>勇気<rp>(</rp><rt>ゆうき</rt><rp>)</rp></ruby>ある<ruby>行動<rp>(</rp><rt>こうどう</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>賞賛<rp>(</rp><rt>しょうさん</rt><rp>)</rp></ruby>に<ruby>値<rp>(</rp><rt>あたい</rt><rp>)</rp></ruby>する",
                    "new": "<ruby>称賛<rp>(</rp><rt>しょうさん</rt><rp>)</rp></ruby>されてしかるべきだ",
                    "suffix": "。",
                    "translation": "His courageous act deserves praise.",
                    "explanation": "に値する and されてしかるべきだ both mean 'deserves X' — they're close, standard ways to say something has earned a positive response.",
                    "oldCore": null,
                    "translationMn": "Түүний зоригтой үйлдэл магтаал хүртэхүйц юм.",
                    "explanationMn": "に値する болон されてしかるべきだ хоёулаа \"X-ийг хүртэх ёстой\" гэсэн утгатай — эдгээр нь ямар нэг зүйл эерэг хариу үйлдэл хүртэх ёстойг хэлэх ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "この<ruby>政策<rp>(</rp><rt>せいさく</rt><rp>)</rp></ruby>の<ruby>失敗<rp>(</rp><rt>しっぱい</rt><rp>)</rp></ruby>は、<ruby>国民<rp>(</rp><rt>こくみん</rt><rp>)</rp></ruby>の<ruby>生活<rp>(</rp><rt>せいかつ</rt><rp>)</rp></ruby>に",
                    "old": "<ruby>甚大<rp>(</rp><rt>じんだい</rt><rp>)</rp></ruby>な<ruby>影響<rp>(</rp><rt>えいきょう</rt><rp>)</rp></ruby>を<ruby>及<rp>(</rp><rt>およ</rt><rp>)</rp></ruby>ぼさずにはおかない",
                    "new": "<ruby>甚大<rp>(</rp><rt>じんだい</rt><rp>)</rp></ruby>な<ruby>影響<rp>(</rp><rt>えいきょう</rt><rp>)</rp></ruby>を<ruby>及<rp>(</rp><rt>およ</rt><rp>)</rp></ruby>ぼさずにはすまない",
                    "suffix": "。",
                    "translation": "This policy failure is bound to have a serious impact on people's lives.",
                    "explanation": "ないではおかない and ずにはすまない both mean 'is bound to inevitably cause X' — they're close, standard interchangeable forms for an unavoidable consequence.",
                    "oldCore": null,
                    "translationMn": "Энэ бодлогын алдаа хүмүүсийн амьдралд ноцтой нөлөө үзүүлэх нь гарцаагүй.",
                    "explanationMn": "ないではおかない болон ずにはすまない хоёулаа \"заавал X-ийг үүсгэнэ\" гэсэн утгатай — эдгээр нь зайлшгүй үр дагаврыг илэрхийлэх ойролцоо, стандарт сольж хэрэглэгддэг хэлбэрүүд юм."
                },
                {
                    "prefix": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>の<ruby>演技<rp>(</rp><rt>えんぎ</rt><rp>)</rp></ruby>は、<ruby>観客<rp>(</rp><rt>かんきゃく</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>魅了<rp>(</rp><rt>みりょう</rt><rp>)</rp></ruby>してやまなかった",
                    "new": "<ruby>魅了<rp>(</rp><rt>みりょう</rt><rp>)</rp></ruby>しつづけた",
                    "suffix": "。",
                    "translation": "Her performance kept captivating the audience without end.",
                    "explanation": "てやまない and つづけた both describe an effect continuing without stopping — てやまない is the more literary way of emphasizing that same unending pull.",
                    "oldCore": "てやまない",
                    "newCore": null,
                    "translationMn": "Түүний тоглолт үзэгчдийг эцэс төгсгөлгүй сэтгэл татсаар байв.",
                    "explanationMn": "てやまない болон つづけた хоёулаа зогсолтгүй үргэлжилж буй нөлөөг тодорхойлдог — てやまない нь ижил зогсолтгүй татагдалтыг онцлон илэрхийлэх илүү утга зохиолын арга юм."
                },
                {
                    "prefix": "この<ruby>発表<rp>(</rp><rt>はっぴょう</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>機<rp>(</rp><rt>き</rt><rp>)</rp></ruby>に、<ruby>市場<rp>(</rp><rt>しじょう</rt><rp>)</rp></ruby>は<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きく<ruby>動<rp>(</rp><rt>うご</rt><rp>)</rp></ruby>いた",
                    "new": "きっかけに、<ruby>市場<rp>(</rp><rt>しじょう</rt><rp>)</rp></ruby>は<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きく<ruby>動<rp>(</rp><rt>うご</rt><rp>)</rp></ruby>いた",
                    "suffix": "。",
                    "translation": "Prompted by this announcement, the market moved significantly.",
                    "explanation": "を機に and をきっかけに both mean 'triggered by X' — 機に is the more formal, written version of the everyday きっかけに.",
                    "oldCore": null,
                    "translationMn": "Энэ мэдэгдлийн улмаас зах зээл ихээхэн хөдөлсөн.",
                    "explanationMn": "を機に болон をきっかけに хоёулаа \"X-ээс өдөөгдсөн\" гэсэн утгатай — 機に нь өдөр тутмын きっかけに-ийн илүү албан ёсны, бичгийн хувилбар юм."
                },
                {
                    "prefix": "その<ruby>証拠<rp>(</rp><rt>しょうこ</rt><rp>)</rp></ruby>は、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>無実<rp>(</rp><rt>むじつ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>裏付<rp>(</rp><rt>うらづ</rt><rp>)</rp></ruby>けるものにほかならない",
                    "new": "<ruby>裏付<rp>(</rp><rt>うらづ</rt><rp>)</rp></ruby>けるものだと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "suffix": "。",
                    "translation": "That evidence is nothing other than proof of his innocence.",
                    "explanation": "にほかならない and と言わざるを得ない both express there being no way to see something other than one specific way — they're close, standard ways to make a firm, singular conclusion.",
                    "oldCore": "にほかならない",
                    "newCore": "ざるをえない",
                    "translationMn": "Тэр нотолгоо бол түүний гэм буруугүйн баталгаа л юм.",
                    "explanationMn": "にほかならない болон と言わざるを得ない хоёулаа ямар нэг зүйлийг зөвхөн нэг тодорхой байдлаар л харах аргатай гэдгийг илэрхийлдэг — эдгээр нь хатуу, ганц дүгнэлт гаргах ойролцоо, стандарт арга юм."
                }
            ]
        },
        {
            "level": 18,
            "title": "Advanced · Level 18",
            "sentences": [
                {
                    "prefix": "この<ruby>惨状<rp>(</rp><rt>さんじょう</rt><rp>)</rp></ruby>を<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>にして、<ruby>言葉<rp>(</rp><rt>ことば</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>失<rp>(</rp><rt>うしな</rt><rp>)</rp></ruby>わずには{いられなかった}",
                    "new": "<ruby>失<rp>(</rp><rt>うしな</rt><rp>)</rp></ruby>わずには{おれなかった}",
                    "suffix": "。",
                    "translation": "Faced with this devastation, I couldn't help but be left speechless.",
                    "explanation": "ずにはいられない and ずにはおれない both mean 'can't help but do X' — おれない is simply the more literary, formal-sounding version of いられない.",
                    "oldCore": "ないではいられない",
                    "newCore": null,
                    "translationMn": "Энэ сүйрлийн өмнө хэлэх үггүй болохгүй байж чадсангүй.",
                    "explanationMn": "ずにはいられない болон ずにはおれない хоёулаа \"X хийхгүй байж чадахгүй\" гэсэн утгатай — おれない нь зөвхөн いられない-ийн илүү утга зохиолын, албан ёсны сонсогдох хувилбар юм."
                },
                {
                    "prefix": "この<ruby>発言<rp>(</rp><rt>はつげん</rt><rp>)</rp></ruby>は、<ruby>差別的<rp>(</rp><rt>さべつてき</rt><rp>)</rp></ruby>な<ruby>意図<rp>(</rp><rt>いと</rt><rp>)</rp></ruby>があったと",
                    "old": "<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>なされても{いたしかたない}",
                    "new": "<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>なされてもやむを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "suffix": "。",
                    "translation": "This remark can hardly avoid being seen as having discriminatory intent.",
                    "explanation": "いたしかたない and やむを得ない both mean 'unavoidable/nothing can be done about it' — they're close, standard interchangeable ways to say a harsh reading of a remark is fair.",
                    "oldCore": null,
                    "translationMn": "Энэ мэдэгдлийг ялгаварлан гадуурхах санаатай гэж үзэхээс өөр аргагүй.",
                    "explanationMn": "いたしかたない болон やむを得ない хоёулаа \"зайлшгүй/юу ч хийж болохгүй\" гэсэн утгатай — эдгээр нь ямар нэг үгийн хатуу тайлбар шударга гэдгийг хэлэх ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "<ruby>歴史<rp>(</rp><rt>れきし</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>振<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>り<ruby>返<rp>(</rp><rt>かえ</rt><rp>)</rp></ruby>るに、この<ruby>決断<rp>(</rp><rt>けつだん</rt><rp>)</rp></ruby>が<ruby>転機<rp>(</rp><rt>てんき</rt><rp>)</rp></ruby>となったことは",
                    "new": "<ruby>振<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>り<ruby>返<rp>(</rp><rt>かえ</rt><rp>)</rp></ruby>ってみると、この<ruby>決断<rp>(</rp><rt>けつだん</rt><rp>)</rp></ruby>が<ruby>転機<rp>(</rp><rt>てんき</rt><rp>)</rp></ruby>となったことは",
                    "suffix": "<ruby>疑<rp>(</rp><rt>うたが</rt><rp>)</rp></ruby>いようがない。",
                    "translation": "Looking back on history, there's no denying that this decision became a turning point.",
                    "explanation": "に振り返るに and 振り返ってみると both mean 'looking back on X' when introducing a retrospective judgment — 振り返るに is simply the more formal, literary phrasing of the same idea.",
                    "oldCore": null,
                    "translationMn": "Түүхийг эргэн харахад энэ шийдвэр эргэлтийн цэг болсныг үгүйсгэх аргагүй.",
                    "explanationMn": "に振り返るに болон 振り返ってみると хоёулаа эргэн харах дүгнэлтийг танилцуулахдаа \"X-ийг эргэн харахад\" гэсэн утгатай — 振り返るに нь зөвхөн ижил санааг илэрхийлэх илүү албан ёсны, утга зохиолын хэллэг юм."
                },
                {
                    "prefix": "この<ruby>組織<rp>(</rp><rt>そしき</rt><rp>)</rp></ruby>の<ruby>体質<rp>(</rp><rt>たいしつ</rt><rp>)</rp></ruby>は、いまだに<ruby>改<rp>(</rp><rt>あらた</rt><rp>)</rp></ruby>まっていないと",
                    "old": "<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "new": "<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>うほかない",
                    "suffix": "。",
                    "translation": "This organization's culture, it must be said, still hasn't changed.",
                    "explanation": "ざるを得ない and ほかない both express there being no way around a conclusion — they're close, standard ways to state a criticism as unavoidable.",
                    "oldCore": "ざるをえない",
                    "newCore": null,
                    "translationMn": "Энэ байгууллагын соёл өөрчлөгдөөгүй хэвээр байна гэдгийг хэлэх ёстой.",
                    "explanationMn": "ざるを得ない болон ほかない хоёулаа дүгнэлтийг тойрч гарах аргагүйг илэрхийлдэг — эдгээр нь шүүмжлэлийг зайлшгүй гэж заах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "その<ruby>提案<rp>(</rp><rt>ていあん</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>一蹴<rp>(</rp><rt>いっしゅう</rt><rp>)</rp></ruby>したのは、あまりにも<ruby>性急<rp>(</rp><rt>せいきゅう</rt><rp>)</rp></ruby>な<ruby>対応<rp>(</rp><rt>たいおう</rt><rp>)</rp></ruby>だった",
                    "new": "<ruby>却下<rp>(</rp><rt>きゃっか</rt><rp>)</rp></ruby>したのは、あまりにも<ruby>性急<rp>(</rp><rt>せいきゅう</rt><rp>)</rp></ruby>な<ruby>対応<rp>(</rp><rt>たいおう</rt><rp>)</rp></ruby>だった",
                    "suffix": "と<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない。",
                    "translation": "It must be said that dismissing that proposal outright was far too hasty a response.",
                    "explanation": "一蹴した and 却下した both mean 'flatly rejected' a proposal — they're close, standard interchangeable ways to describe an outright dismissal.",
                    "oldCore": null,
                    "translationMn": "Тэр саналыг шууд няцаасан нь хэтэрхий яаралтай хариу үйлдэл байсныг хэлэх ёстой.",
                    "explanationMn": "一蹴した болон 却下した хоёулаа саналыг \"тэс татгалзсан\" гэсэн утгатай — эдгээр нь тэс үгүйсгэлийг тодорхойлох ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>発見<rp>(</rp><rt>はっけん</rt><rp>)</rp></ruby>が{もたらす}<ruby>恩恵<rp>(</rp><rt>おんけい</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>計<rp>(</rp><rt>はか</rt><rp>)</rp></ruby>り<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>れない",
                    "new": "<ruby>計<rp>(</rp><rt>はか</rt><rp>)</rp></ruby>り<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>れないほど<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きい",
                    "suffix": "。",
                    "translation": "The benefits this discovery brings are immeasurable.",
                    "explanation": "計り知れない alone and 計り知れないほど大きい both describe something as beyond measure — the second just spells out 'huge' more explicitly, but the core claim is identical.",
                    "oldCore": null,
                    "translationMn": "Энэ нээлтийн авчрах ашиг тус хэмжээлшгүй их юм.",
                    "explanationMn": "計り知れない дангаараа болон 計り知れないほど大きい хоёулаа ямар нэг зүйлийг хэмжээст даасан гэж тодорхойлдог — хоёр дахь нь зөвхөн \"асар том\" гэдгийг илүү тодорхой хэлдэг ч гол мэдэгдэл нь ижилхэн."
                },
                {
                    "prefix": "その<ruby>態度<rp>(</rp><rt>たいど</rt><rp>)</rp></ruby>は、あまりにも",
                    "old": "<ruby>身勝手<rp>(</rp><rt>みがって</rt><rp>)</rp></ruby>と<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない",
                    "new": "<ruby>自己中心的<rp>(</rp><rt>じこちゅうしんてき</rt><rp>)</rp></ruby>としか<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>いようがない",
                    "suffix": "。",
                    "translation": "That attitude can only be described as far too selfish.",
                    "explanation": "ざるを得ない and としか言いようがない both express there being no way around a conclusion — they're close, standard ways to state a judgment as unavoidable.",
                    "oldCore": "ざるをえない",
                    "newCore": null,
                    "translationMn": "Тэр хандлагыг хэтэрхий бардам гэж л дүгнэж болно.",
                    "explanationMn": "ざるを得ない болон としか言いようがない хоёулаа дүгнэлтийг тойрч гарах аргагүйг илэрхийлдэг — эдгээр нь шүүлтийг зайлшгүй гэж заах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>周囲<rp>(</rp><rt>しゅうい</rt><rp>)</rp></ruby>の<ruby>反対<rp>(</rp><rt>はんたい</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>押<rp>(</rp><rt>お</rt><rp>)</rp></ruby>し<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>って、",
                    "new": "<ruby>押<rp>(</rp><rt>お</rt><rp>)</rp></ruby>し<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>る<ruby>形<rp>(</rp><rt>かたち</rt><rp>)</rp></ruby>で",
                    "suffix": "<ruby>独自<rp>(</rp><rt>どくじ</rt><rp>)</rp></ruby>の<ruby>路線<rp>(</rp><rt>ろせん</rt><rp>)</rp></ruby>を<ruby>貫<rp>(</rp><rt>つらぬ</rt><rp>)</rp></ruby>いた。",
                    "translation": "Pushing past the opposition around him, he stuck to his own independent path.",
                    "explanation": "て and 形で can both connect a manner of action to what follows — 形で just states 'in the form of' a bit more explicitly, but either reads the same way here.",
                    "oldCore": null,
                    "translationMn": "Эргэн тойрны эсэргүүцлийг даван туулж тэр өөрийн бие даасан замыг баримталсан.",
                    "explanationMn": "て болон 形で хоёулаа үйлдлийн байдлыг дараагийн зүйлтэй холбож болно — 形で нь \"...хэлбэрээр\" гэдгийг арай илүү тодорхой хэлдэг ч энд аль нь ч ижилхэн уншигдана."
                },
                {
                    "prefix": "この<ruby>報告書<rp>(</rp><rt>ほうこくしょ</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>事実誤認<rp>(</rp><rt>じじつごにん</rt><rp>)</rp></ruby>が<ruby>散見<rp>(</rp><rt>さんけん</rt><rp>)</rp></ruby>されると",
                    "new": "<ruby>事実誤認<rp>(</rp><rt>じじつごにん</rt><rp>)</rp></ruby>が<ruby>目立<rp>(</rp><rt>めだ</rt><rp>)</rp></ruby>つと",
                    "suffix": "の<ruby>指摘<rp>(</rp><rt>してき</rt><rp>)</rp></ruby>を<ruby>受<rp>(</rp><rt>う</rt><rp>)</rp></ruby>けている。",
                    "translation": "This report has received criticism that factual errors stand out throughout it.",
                    "explanation": "散見される and 目立つ both mean 'noticeably scattered throughout' — 散見される is simply the more formal, written way of saying errors 'crop up here and there.'",
                    "oldCore": null,
                    "translationMn": "Энэ тайлан баримтын алдаа их байгаа гэсэн шүүмжлэлд өртсөн.",
                    "explanationMn": "散見される болон 目立つ хоёулаа \"мэдэгдэхүйц тархсан\" гэсэн утгатай — 散見される нь зөвхөн алдаа \"хааяа гарч ирдэг\" гэдгийг хэлэх илүү албан ёсны, бичгийн арга юм."
                },
                {
                    "prefix": "その<ruby>判決<rp>(</rp><rt>はんけつ</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>世論<rp>(</rp><rt>よろん</rt><rp>)</rp></ruby>の<ruby>反発<rp>(</rp><rt>はんぱつ</rt><rp>)</rp></ruby>を<ruby>招<rp>(</rp><rt>まね</rt><rp>)</rp></ruby>かずには{おかなかった}",
                    "new": "<ruby>世論<rp>(</rp><rt>よろん</rt><rp>)</rp></ruby>の<ruby>反発<rp>(</rp><rt>はんぱつ</rt><rp>)</rp></ruby>を<ruby>招<rp>(</rp><rt>まね</rt><rp>)</rp></ruby>かずには{すまなかった}",
                    "suffix": "。",
                    "translation": "That ruling was bound to provoke public backlash.",
                    "explanation": "ないではおかない and ずにはすまない both mean 'is bound to inevitably cause X' — they're close, standard interchangeable forms for an unavoidable consequence.",
                    "oldCore": null,
                    "translationMn": "Тэр шийдвэр олон нийтийн эсэргүүцлийг өдөөх нь гарцаагүй байсан.",
                    "explanationMn": "ないではおかない болон ずにはすまない хоёулаа \"заавал X-ийг үүсгэнэ\" гэсэн утгатай — эдгээр нь зайлшгүй үр дагаврыг илэрхийлэх ойролцоо, стандарт сольж хэрэглэгддэг хэлбэрүүд юм."
                }
            ]
        },
        {
            "level": 19,
            "title": "Advanced · Level 19",
            "sentences": [
                {
                    "prefix": "その<ruby>美術品<rp>(</rp><rt>びじゅつひん</rt><rp>)</rp></ruby>の<ruby>価値<rp>(</rp><rt>かち</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>金銭<rp>(</rp><rt>きんせん</rt><rp>)</rp></ruby>に<ruby>換算<rp>(</rp><rt>かんさん</rt><rp>)</rp></ruby>できるようなものではない",
                    "new": "<ruby>金銭<rp>(</rp><rt>きんせん</rt><rp>)</rp></ruby>で<ruby>測<rp>(</rp><rt>はか</rt><rp>)</rp></ruby>れるようなものではない",
                    "suffix": "。",
                    "translation": "That artwork's value isn't something that can be reduced to money.",
                    "explanation": "金銭に換算できない and 金銭で測れない both mean 'can't be measured in monetary terms' — they're close, standard interchangeable ways to say something's worth transcends price.",
                    "oldCore": null,
                    "translationMn": "Тэр урлагийн бүтээлийн үнэ цэнийг мөнгөөр хэмжих боломжгүй.",
                    "explanationMn": "金銭に換算できない болон 金銭で測れない хоёулаа \"мөнгөн дүнгээр хэмжигдэхгүй\" гэсэн утгатай — эдгээр нь ямар нэг зүйлийн үнэ цэнэ үнэлгээнээс давсныг хэлэх ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>惨事<rp>(</rp><rt>さんじ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>の<ruby>当<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>たりにした<ruby>者<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>なら、その<ruby>恐怖<rp>(</rp><rt>きょうふ</rt><rp>)</rp></ruby>は<ruby>想像<rp>(</rp><rt>そうぞう</rt><rp>)</rp></ruby>に<ruby>難<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>くない",
                    "new": "<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>の<ruby>当<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>たりにした<ruby>者<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>なら、その<ruby>恐怖<rp>(</rp><rt>きょうふ</rt><rp>)</rp></ruby>は<ruby>容易<rp>(</rp><rt>ようい</rt><rp>)</rp></ruby>に<ruby>想像<rp>(</rp><rt>そうぞう</rt><rp>)</rp></ruby>できる",
                    "suffix": "だろう。",
                    "translation": "Anyone who witnessed this disaster firsthand could easily imagine the terror of it.",
                    "explanation": "想像に難くない and 容易に想像できる both mean 'easy to imagine' — にかたくない is simply the more literary, formal way of saying the same thing.",
                    "oldCore": null,
                    "translationMn": "Энэ гамшгийг өөрийн нүдээр харсан хэн боловч түүний аймшгийг амархан төсөөлж чадна.",
                    "explanationMn": "想像に難くない болон 容易に想像できる хоёулаа \"төсөөлөхөд амархан\" гэсэн утгатай — にかたくない нь зөвхөн ижил зүйлийг илэрхийлэх илүү утга зохиолын, албан ёсны арга юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>い<ruby>分<rp>(</rp><rt>ぶん</rt><rp>)</rp></ruby>は、<ruby>一応<rp>(</rp><rt>いちおう</rt><rp>)</rp></ruby>",
                    "old": "<ruby>理<rp>(</rp><rt>り</rt><rp>)</rp></ruby>にかなっているといえなくもない",
                    "new": "<ruby>筋<rp>(</rp><rt>すじ</rt><rp>)</rp></ruby>が<ruby>通<rp>(</rp><rt>とお</rt><rp>)</rp></ruby>っているといえなくもない",
                    "suffix": "。",
                    "translation": "His argument, at least, isn't entirely without logic.",
                    "explanation": "理にかなっている and 筋が通っている both mean 'makes logical sense' — they're close, standard interchangeable ways to grudgingly concede a point has some validity.",
                    "oldCore": null,
                    "translationMn": "Түүний аргумент наад зах нь бүрэн логикгүй гэж хэлэхгүй.",
                    "explanationMn": "理にかなっている болон 筋が通っている хоёулаа \"логикт нийцдэг\" гэсэн утгатай — эдгээр нь ямар нэг санаанд бага зэрэг үндэслэл байгааг дурамжхан хүлээн зөвшөөрөх ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "その<ruby>企業<rp>(</rp><rt>きぎょう</rt><rp>)</rp></ruby>の<ruby>急成長<rp>(</rp><rt>きゅうせいちょう</rt><rp>)</rp></ruby>ぶりは、",
                    "old": "<ruby>目覚<rp>(</rp><rt>めざ</rt><rp>)</rp></ruby>ましいのひとことに<ruby>尽<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>きる",
                    "new": "<ruby>目覚<rp>(</rp><rt>めざ</rt><rp>)</rp></ruby>ましいと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>うよりほかない",
                    "suffix": "。",
                    "translation": "That company's rapid growth can only be described as remarkable.",
                    "explanation": "のひとことに尽きる and と言うよりほかない both mean 'there's no better way to sum it up than X' — they're close, standard ways to close off a description with a single fitting word.",
                    "oldCore": null,
                    "translationMn": "Тэр компанийн хурдацтай өсөлтийг гайхалтай гэж л хэлж болно.",
                    "explanationMn": "のひとことに尽きる болон と言うよりほかない хоёулаа \"X-ээс өөр илүү сайн нэгтгэн дүгнэх арга байхгүй\" гэсэн утгатай — эдгээр нь тодорхойлолтыг нэг тохирсон үгээр хаах ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "<ruby>再三<rp>(</rp><rt>さいさん</rt><rp>)</rp></ruby>の<ruby>警告<rp>(</rp><rt>けいこく</rt><rp>)</rp></ruby>があった",
                    "old": "にもかかわらず",
                    "new": "のに",
                    "suffix": "、<ruby>対策<rp>(</rp><rt>たいさく</rt><rp>)</rp></ruby>を<ruby>怠<rp>(</rp><rt>おこた</rt><rp>)</rp></ruby>ったことの<ruby>責任<rp>(</rp><rt>せきにん</rt><rp>)</rp></ruby>は<ruby>免<rp>(</rp><rt>まぬが</rt><rp>)</rp></ruby>れ<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない。",
                    "translation": "Despite there having been repeated warnings, the responsibility for neglecting countermeasures cannot be escaped.",
                    "explanation": "にもかかわらず and のに both mark an unexpected concession — にもかかわらず is just the more formal, written-register version of のに.",
                    "oldCore": "にもかかわらず",
                    "translationMn": "Давтан анхааруулга өгсөн ч арга хэмжээ авахгүй байсан хариуцлагаас зайлсхийж чадахгүй.",
                    "explanationMn": "にもかかわらず болон のに хоёулаа гэнэтийн зөвшилцлийг заадаг — にもかかわらず нь зөвхөн のに-ийн илүү албан ёсны, бичгийн хэв маягийн хувилбар юм."
                },
                {
                    "prefix": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>の<ruby>才能<rp>(</rp><rt>さいのう</rt><rp>)</rp></ruby>は、まだ",
                    "old": "<ruby>開花<rp>(</rp><rt>かいか</rt><rp>)</rp></ruby>していないだけであって、その<ruby>可能性<rp>(</rp><rt>かのうせい</rt><rp>)</rp></ruby>は<ruby>計<rp>(</rp><rt>はか</rt><rp>)</rp></ruby>り<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>れない",
                    "new": "<ruby>開花<rp>(</rp><rt>かいか</rt><rp>)</rp></ruby>していないだけで、そのポテンシャルは<ruby>計<rp>(</rp><rt>はか</rt><rp>)</rp></ruby>り<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>れない",
                    "suffix": "。",
                    "translation": "Her talent simply hasn't bloomed yet, but its potential is immeasurable.",
                    "explanation": "であって and で both connect a reason clause to what follows — であって is just the slightly more formal, written way of making the same connection.",
                    "oldCore": null,
                    "translationMn": "Түүний авьяас хараахан дэлгэрээгүй байгаа ч чадавхи нь хэмжээлшгүй.",
                    "explanationMn": "であって болон で хоёулаа шалтгааны өгүүлбэрийг дараагийн зүйлтэй холбодог — であって нь зөвхөн ижил холболтыг хийх бага зэрэг илүү албан ёсны, бичгийн арга юм."
                },
                {
                    "prefix": "その<ruby>理論<rp>(</rp><rt>りろん</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>学界<rp>(</rp><rt>がっかい</rt><rp>)</rp></ruby>において<ruby>異端<rp>(</rp><rt>いたん</rt><rp>)</rp></ruby><ruby>扱<rp>(</rp><rt>あつか</rt><rp>)</rp></ruby>いされてきた{きらいがある}",
                    "new": "<ruby>学界<rp>(</rp><rt>がっかい</rt><rp>)</rp></ruby>において<ruby>異端<rp>(</rp><rt>いたん</rt><rp>)</rp></ruby><ruby>扱<rp>(</rp><rt>あつか</rt><rp>)</rp></ruby>いされる<ruby>傾向<rp>(</rp><rt>けいこう</rt><rp>)</rp></ruby>がある",
                    "suffix": "。",
                    "translation": "That theory has tended to be treated as heretical within academia.",
                    "explanation": "きらいがある and 傾向がある both mean 'has a tendency toward X,' usually an undesirable one — they're standard, interchangeable ways to note a recurring pattern.",
                    "oldCore": "きらいがある",
                    "newCore": null,
                    "translationMn": "Тэр онолыг эрдэм шинжилгээний хүрээнд тэрс үзэл гэж үзэх хандлагатай байсан.",
                    "explanationMn": "きらいがある болон 傾向がある хоёулаа ихэвчлэн хүсээгүй \"X руу хандлагатай\" гэсэн утгатай — эдгээр нь давтагдах загварыг тэмдэглэх стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>政策<rp>(</rp><rt>せいさく</rt><rp>)</rp></ruby>が<ruby>国民生活<rp>(</rp><rt>こくみんせいかつ</rt><rp>)</rp></ruby>に<ruby>与<rp>(</rp><rt>あた</rt><rp>)</rp></ruby>える<ruby>影響<rp>(</rp><rt>えいきょう</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>計<rp>(</rp><rt>はか</rt><rp>)</rp></ruby>り<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>れないものがある",
                    "new": "はかりしれないものがある",
                    "suffix": "。",
                    "translation": "The impact this policy will have on people's daily lives is beyond measure.",
                    "explanation": "This keeps the same 計り知れない ('immeasurable') meaning either way, just written with or without kanji — same grammar, same meaning.",
                    "oldCore": null,
                    "translationMn": "Энэ бодлого хүмүүсийн өдөр тутмын амьдралд үзүүлэх нөлөө хэмжээлшгүй их юм.",
                    "explanationMn": "Энэ нь ямар ч тохиолдолд ижил 計り知れない (\"хэмжээст даасан\") утгыг хадгалж, зөвхөн канжитай эсвэл кана бичигдсэн — ижил дүрэм, ижил утга."
                },
                {
                    "prefix": "この<ruby>一件<rp>(</rp><rt>いっけん</rt><rp>)</rp></ruby>に<ruby>関<rp>(</rp><rt>かん</rt><rp>)</rp></ruby>する<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>釈明<rp>(</rp><rt>しゃくめい</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>到底<rp>(</rp><rt>とうてい</rt><rp>)</rp></ruby><ruby>納得<rp>(</rp><rt>なっとく</rt><rp>)</rp></ruby>のいくものではなかった",
                    "new": "<ruby>到底<rp>(</rp><rt>とうてい</rt><rp>)</rp></ruby><ruby>納得<rp>(</rp><rt>なっとく</rt><rp>)</rp></ruby>できるものではなかった",
                    "suffix": "。",
                    "translation": "His explanation regarding this matter was by no means convincing.",
                    "explanation": "納得のいく and 納得できる both mean 'able to be accepted/satisfying' — they're standard, interchangeable ways to express whether an explanation holds up.",
                    "oldCore": null,
                    "translationMn": "Түүний энэ асуудлын талаарх тайлбар огт итгэл үнэмшил төрүүлсэнгүй.",
                    "explanationMn": "納得のいく болон 納得できる хоёулаа \"хүлээн зөвшөөрөгдөх/сэтгэл ханамжтай\" гэсэн утгатай — эдгээр нь тайлбар үндэслэлтэй эсэхийг илэрхийлэх стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>製品<rp>(</rp><rt>せいひん</rt><rp>)</rp></ruby>の<ruby>欠陥<rp>(</rp><rt>けっかん</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>発売前<rp>(</rp><rt>はつばいまえ</rt><rp>)</rp></ruby>に<ruby>気付<rp>(</rp><rt>きづ</rt><rp>)</rp></ruby>くべくして<ruby>気付<rp>(</rp><rt>きづ</rt><rp>)</rp></ruby>かれなかった",
                    "new": "<ruby>発売前<rp>(</rp><rt>はつばいまえ</rt><rp>)</rp></ruby>に<ruby>当然<rp>(</rp><rt>とうぜん</rt><rp>)</rp></ruby><ruby>気付<rp>(</rp><rt>きづ</rt><rp>)</rp></ruby>かれるべきだったが<ruby>気付<rp>(</rp><rt>きづ</rt><rp>)</rp></ruby>かれなかった",
                    "suffix": "。",
                    "translation": "This product's flaw should have been caught before release, as it naturally should have been, but it wasn't.",
                    "explanation": "べくして and 当然〜べきだったが both frame an outcome as something that should have naturally been caught — べくして is the terser, more literary way of making the same point.",
                    "oldCore": null,
                    "translationMn": "Энэ бүтээгдэхүүний согогийг гарахаас өмнө байгалиас нь илрүүлэх ёстой байсан ч тэгээгүй.",
                    "explanationMn": "べくして болон 当然〜べきだったが хоёулаа үр дүнг байгалиар олж мэдэх ёстой байсан зүйл мэт харуулдаг — べくして нь ижил санааг илэрхийлэх илүү товч, утга зохиолын арга юм."
                }
            ]
        },
        {
            "level": 20,
            "title": "Advanced · Level 20",
            "sentences": [
                {
                    "prefix": "この<ruby>惨劇<rp>(</rp><rt>さんげき</rt><rp>)</rp></ruby>を<ruby>招<rp>(</rp><rt>まね</rt><rp>)</rp></ruby>いた<ruby>責任者<rp>(</rp><rt>せきにんしゃ</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>断罪<rp>(</rp><rt>だんざい</rt><rp>)</rp></ruby>せずしては<ruby>事態<rp>(</rp><rt>じたい</rt><rp>)</rp></ruby>の<ruby>収拾<rp>(</rp><rt>しゅうしゅう</rt><rp>)</rp></ruby>はつかない",
                    "new": "<ruby>断罪<rp>(</rp><rt>だんざい</rt><rp>)</rp></ruby>することなくして<ruby>事態<rp>(</rp><rt>じたい</rt><rp>)</rp></ruby>の<ruby>収拾<rp>(</rp><rt>しゅうしゅう</rt><rp>)</rp></ruby>はつかない",
                    "suffix": "。",
                    "translation": "Without holding those responsible for this tragedy to account, there's no bringing the situation under control.",
                    "explanation": "ずしては and ことなくして both mean 'without doing X' in a formal, literary register — they're standard, interchangeable ways to state a necessary precondition.",
                    "oldCore": null,
                    "translationMn": "Энэ эмгэнэлт явдлын хариуцлагатнуудыг тооцохгүйгээр нөхцөл байдлыг хяналтандаа авах боломжгүй.",
                    "explanationMn": "ずしては болон ことなくして хоёулаа албан ёсны, утга зохиолын хэв маягт \"X хийхгүйгээр\" гэсэн утгатай — эдгээр нь шаардлагатай урьдчилсан нөхцлийг заах стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "その<ruby>論客<rp>(</rp><rt>ろんきゃく</rt><rp>)</rp></ruby>は、<ruby>反対派<rp>(</rp><rt>はんたいは</rt><rp>)</rp></ruby>の<ruby>批判<rp>(</rp><rt>ひはん</rt><rp>)</rp></ruby>を",
                    "old": "ものともせず、<ruby>持論<rp>(</rp><rt>じろん</rt><rp>)</rp></ruby>を<ruby>展開<rp>(</rp><rt>てんかい</rt><rp>)</rp></ruby>し<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>けた",
                    "new": "<ruby>意<rp>(</rp><rt>い</rt><rp>)</rp></ruby>に<ruby>介<rp>(</rp><rt>かい</rt><rp>)</rp></ruby>さず、<ruby>持論<rp>(</rp><rt>じろん</rt><rp>)</rp></ruby>を<ruby>展開<rp>(</rp><rt>てんかい</rt><rp>)</rp></ruby>し<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>けた",
                    "suffix": "。",
                    "translation": "That commentator, undeterred by criticism from opponents, kept advancing their own argument.",
                    "explanation": "をものともせず and を意に介さず both describe pushing forward without letting an obstacle affect you — をものともせず leans a bit more toward actively overcoming it, but both describe the same unshaken persistence here.",
                    "oldCore": "をものともせず",
                    "newCore": null,
                    "translationMn": "Тэр тайлбарлагч эсэргүүцэгчдийн шүүмжлэлд гуйвалгүй өөрийн аргументаа үргэлжлүүлэн хөгжүүлсээр байв.",
                    "explanationMn": "をものともせず болон を意に介さず хоёулаа саадад нөлөөлүүлэлгүйгээр урагшлахыг тодорхойлдог — をものともせず нь идэвхтэй даван туулахад арай илүү дөхдөг ч энд хоёул ижил тэсвэртэй байдлыг тодорхойлдог."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>功績<rp>(</rp><rt>こうせき</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>抜<rp>(</rp><rt>ぬ</rt><rp>)</rp></ruby>きにして、この<ruby>分野<rp>(</rp><rt>ぶんや</rt><rp>)</rp></ruby>の<ruby>発展<rp>(</rp><rt>はってん</rt><rp>)</rp></ruby>は<ruby>語<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>れない",
                    "new": "<ruby>抜<rp>(</rp><rt>ぬ</rt><rp>)</rp></ruby>きにしては、この<ruby>分野<rp>(</rp><rt>ぶんや</rt><rp>)</rp></ruby>の<ruby>発展<rp>(</rp><rt>はってん</rt><rp>)</rp></ruby>は<ruby>語<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>れない",
                    "suffix": "。",
                    "translation": "Setting his achievements aside, one cannot speak of this field's progress.",
                    "explanation": "This keeps the same ぬきにして ('leaving X aside') pattern, just with or without the extra emphatic は — same grammar, same meaning.",
                    "oldCore": "ぬきで",
                    "newCore": null,
                    "translationMn": "Түүний амжилтыг хойш тавиад энэ салбарын хөгжлийн тухай ярих боломжгүй.",
                    "explanationMn": "Энэ нь ижил ぬきにして (\"X-ийг хойш тавих\") загварыг хадгалж, зөвхөн нэмэлт онцолсон は-тэй эсвэл үгүй — ижил дүрэм, ижил утга."
                },
                {
                    "prefix": "この<ruby>改革案<rp>(</rp><rt>かいかくあん</rt><rp>)</rp></ruby>は、<ruby>一部<rp>(</rp><rt>いちぶ</rt><rp>)</rp></ruby>の<ruby>反対<rp>(</rp><rt>はんたい</rt><rp>)</rp></ruby>を",
                    "old": "<ruby>押<rp>(</rp><rt>お</rt><rp>)</rp></ruby>し<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>ってでも、<ruby>断行<rp>(</rp><rt>だんこう</rt><rp>)</rp></ruby>すべきだ",
                    "new": "<ruby>押<rp>(</rp><rt>お</rt><rp>)</rp></ruby>し<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>ってでも、<ruby>実行<rp>(</rp><rt>じっこう</rt><rp>)</rp></ruby>に<ruby>移<rp>(</rp><rt>うつ</rt><rp>)</rp></ruby>すべきだ",
                    "suffix": "。",
                    "translation": "This reform proposal should be carried out even if it means overriding some opposition.",
                    "explanation": "断行すべきだ and 実行に移すべきだ both urge that something be firmly carried through — they're close, standard interchangeable ways to press for resolute action.",
                    "oldCore": null,
                    "translationMn": "Энэ шинэчлэлийн саналыг зарим эсэргүүцлийг даван туулсан ч хэрэгжүүлэх ёстой.",
                    "explanationMn": "断行すべきだ болон 実行に移すべきだ хоёулаа ямар нэг зүйлийг бат тууштай гүйцэтгэхийг шаарддаг — эдгээр нь эрс шийдэмгий үйлдэлд түлхэц өгөх ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>惨状<rp>(</rp><rt>さんじょう</rt><rp>)</rp></ruby>を<ruby>招<rp>(</rp><rt>まね</rt><rp>)</rp></ruby>いた<ruby>要因<rp>(</rp><rt>よういん</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>一言<rp>(</rp><rt>ひとこと</rt><rp>)</rp></ruby>で<ruby>片付<rp>(</rp><rt>かたづ</rt><rp>)</rp></ruby>けられるほど<ruby>単純<rp>(</rp><rt>たんじゅん</rt><rp>)</rp></ruby>ではない",
                    "new": "<ruby>一言<rp>(</rp><rt>ひとこと</rt><rp>)</rp></ruby>で<ruby>説明<rp>(</rp><rt>せつめい</rt><rp>)</rp></ruby>できるほど<ruby>単純<rp>(</rp><rt>たんじゅん</rt><rp>)</rp></ruby>ではない",
                    "suffix": "。",
                    "translation": "The factors behind this catastrophe aren't simple enough to be summed up in a single word.",
                    "explanation": "片付けられる and 説明できる both mean 'can be wrapped up/accounted for' when dismissing an oversimplified explanation — they're close, standard interchangeable ways to make the same point.",
                    "oldCore": null,
                    "translationMn": "Энэ гамшгийн шалтгаанууд нэг үгээр илэрхийлэхэд хэтэрхий энгийн биш.",
                    "explanationMn": "片付けられる болон 説明できる хоёулаа хэт хялбарчилсан тайлбарыг үгүйсгэхдээ \"дуусгаж болно/тайлбарлаж болно\" гэсэн утгатай — эдгээр нь ижил санааг хэлэх ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>一連<rp>(</rp><rt>いちれん</rt><rp>)</rp></ruby>の<ruby>不祥事<rp>(</rp><rt>ふしょうじ</rt><rp>)</rp></ruby>は、<ruby>経営陣<rp>(</rp><rt>けいえいじん</rt><rp>)</rp></ruby>の",
                    "old": "<ruby>驕<rp>(</rp><rt>おご</rt><rp>)</rp></ruby>りに{ほかならない}",
                    "new": "<ruby>慢心<rp>(</rp><rt>まんしん</rt><rp>)</rp></ruby>に<ruby>起因<rp>(</rp><rt>きいん</rt><rp>)</rp></ruby>する",
                    "suffix": "と<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>わざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ない。",
                    "translation": "This series of scandals must be said to stem from the arrogance of the management.",
                    "explanation": "にほかならない and に起因する both point to a single, unambiguous cause — にほかならない emphasizes 'this and nothing else,' while 起因する states the causal link more plainly, but both land on the same claim here.",
                    "oldCore": "にほかならない",
                    "newCore": null,
                    "translationMn": "Энэ цуврал будлианууд удирдлагын биеэ тоомгой байдлаас үүдэлтэй гэдгийг хэлэх ёстой.",
                    "explanationMn": "にほかならない болон に起因する хоёулаа нэг тодорхой, эргэлзээгүй шалтгаан руу заадаг — にほかならない нь \"энэ бөгөөд өөр юу ч биш\" гэдгийг онцолдог бол 起因する нь шалтгаант холбоог илүү энгийнээр хэлдэг, гэхдээ хоёул энд ижил мэдэгдэлд хүрдэг."
                },
                {
                    "prefix": "その<ruby>儀式<rp>(</rp><rt>ぎしき</rt><rp>)</rp></ruby>は、",
                    "old": "<ruby>古式<rp>(</rp><rt>こしき</rt><rp>)</rp></ruby>ゆかしいしきたりに<ruby>則<rp>(</rp><rt>のっと</rt><rp>)</rp></ruby>って<ruby>執<rp>(</rp><rt>と</rt><rp>)</rp></ruby>り<ruby>行<rp>(</rp><rt>おこな</rt><rp>)</rp></ruby>われた",
                    "new": "<ruby>伝統的<rp>(</rp><rt>でんとうてき</rt><rp>)</rp></ruby>なしきたりに<ruby>従<rp>(</rp><rt>したが</rt><rp>)</rp></ruby>って<ruby>執<rp>(</rp><rt>と</rt><rp>)</rp></ruby>り<ruby>行<rp>(</rp><rt>おこな</rt><rp>)</rp></ruby>われた",
                    "suffix": "。",
                    "translation": "That ceremony was carried out in accordance with a time-honored tradition.",
                    "explanation": "古式ゆかしいしきたりに則って and 伝統的なしきたりに従って both mean 'in keeping with a long-established custom' — 則って is simply the more formal, literary way of saying 従って.",
                    "oldCore": null,
                    "translationMn": "Тэр ёслол эрт дээр үеэс уламжлагдан ирсэн зан үйлийн дагуу явагдсан.",
                    "explanationMn": "古式ゆかしいしきたりに則って болон 伝統的なしきたりに従って хоёулаа \"эртнээс тогтсон заншилтай нийцүүлэн\" гэсэн утгатай — 則って нь зөвхөн 従って-ийг хэлэх илүү албан ёсны, утга зохиолын арга юм."
                },
                {
                    "prefix": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の{そばから}<ruby>離<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>れようとしない<ruby>様子<rp>(</rp><rt>ようす</rt><rp>)</rp></ruby>",
                    "old": "を<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>るにつけ、その<ruby>絆<rp>(</rp><rt>きずな</rt><rp>)</rp></ruby>の<ruby>深<rp>(</rp><rt>ふか</rt><rp>)</rp></ruby>さがうかがえる",
                    "new": "を<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>るたびに、その<ruby>絆<rp>(</rp><rt>きずな</rt><rp>)</rp></ruby>の<ruby>深<rp>(</rp><rt>ふか</rt><rp>)</rp></ruby>さがうかがえる",
                    "suffix": "。",
                    "translation": "Seeing them stick close by his side every time, one can sense the depth of that bond.",
                    "explanation": "につけ and たびに both mean 'every time X happens, Y comes to mind' — they're standard, interchangeable ways to link a recurring observation to a recurring realization.",
                    "oldCore": "につけ",
                    "newCore": null,
                    "translationMn": "Тэднийг үргэлж хажууд нь байхыг харахад тэр холбооны гүн гүнзгий байдлыг мэдэрч болно.",
                    "explanationMn": "につけ болон たびに хоёулаа \"X болох бүрд Y санаанд орж ирдэг\" гэсэн утгатай — эдгээр нь давтагдах ажиглалтыг давтагдах ухаарлатай холбох стандарт, сольж хэрэглэгддэг арга юм."
                },
                {
                    "prefix": "この<ruby>条約<rp>(</rp><rt>じょうやく</rt><rp>)</rp></ruby>の<ruby>締結<rp>(</rp><rt>ていけつ</rt><rp>)</rp></ruby>は、<ruby>両国関係<rp>(</rp><rt>りょうこくかんけい</rt><rp>)</rp></ruby>にとって",
                    "old": "<ruby>画期的<rp>(</rp><rt>かっきてき</rt><rp>)</rp></ruby>な<ruby>一歩<rp>(</rp><rt>いっぽ</rt><rp>)</rp></ruby>と<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>っても<ruby>過言<rp>(</rp><rt>かごん</rt><rp>)</rp></ruby>ではない",
                    "new": "<ruby>画期的<rp>(</rp><rt>かっきてき</rt><rp>)</rp></ruby>な<ruby>一歩<rp>(</rp><rt>いっぽ</rt><rp>)</rp></ruby>と<ruby>評<rp>(</rp><rt>ひょう</rt><rp>)</rp></ruby>するにたる",
                    "suffix": "。",
                    "translation": "This treaty's conclusion can fairly be called, without exaggeration, a groundbreaking step for relations between the two countries.",
                    "explanation": "と言っても過言ではない and と評するにたる both mean 'it's fair/warranted to describe it as X' — they're close, standard ways to justify a strong positive assessment.",
                    "oldCore": null,
                    "translationMn": "Энэ гэрээ байгуулагдсныг хоёр орны харилцаанд түүхэн ач холбогдолтой алхам гэж хэтрүүлэлгүй хэлж болно.",
                    "explanationMn": "と言っても過言ではない болон と評するにたる хоёулаа \"X гэж тодорхойлоход шударга/зохистой\" гэсэн утгатай — эдгээр нь хүчтэй эерэг үнэлгээг зөвтгөх ойролцоо, стандарт арга юм."
                },
                {
                    "prefix": "<ruby>国家財政<rp>(</rp><rt>こっかざいせい</rt><rp>)</rp></ruby>の<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>て<ruby>直<rp>(</rp><rt>なお</rt><rp>)</rp></ruby>しは、",
                    "old": "もはや<ruby>待<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>ったなしの<ruby>状況<rp>(</rp><rt>じょうきょう</rt><rp>)</rp></ruby>にある",
                    "new": "もはや<ruby>猶予<rp>(</rp><rt>ゆうよ</rt><rp>)</rp></ruby>のならない<ruby>状況<rp>(</rp><rt>じょうきょう</rt><rp>)</rp></ruby>にある",
                    "suffix": "。",
                    "translation": "Rebuilding the national finances is now a matter that admits of no delay.",
                    "explanation": "待ったなし and 猶予のならない both mean 'allowing for no further delay' — they're close, standard interchangeable ways to stress that a situation has become urgent.",
                    "oldCore": null,
                    "translationMn": "Улсын санхүүг сэргээх нь одоо хойшлуулшгүй асуудал болжээ.",
                    "explanationMn": "待ったなし болон 猶予のならない хоёулаа \"цаашид хойшлуулах боломжгүй\" гэсэн утгатай — эдгээр нь нөхцөл байдал яаралтай болсныг онцлох ойролцоо, стандарт сольж хэрэглэгддэг арга юм."
                }
            ]
        }
    ]
};
