// Word pairs for the Japanese Word Match game, grouped by JLPT level (N5 = easiest, N1 = hardest).
// Each JLPT tier has 10 discrete levels of 10 pairs (20 tiles) each, numbered globally 1-50
// (N5 1-10, N4 11-20, N3 21-30, N2 31-40, N1 41-50). Each level's `sets` array holds exactly
// one fixed 10-pair set (kept as a 1-element array, not flattened, so buildTiles()'s existing
// `sets[Math.floor(Math.random() * sets.length)]` still works unchanged) -- replaying a level
// now always shows the same 10 words rather than a random pick from several, a deliberate
// trade for having 10x as many distinct, individually-selectable levels out of the same
// ~100-word-per-tier pool the original 5-sets-of-20 design already curated. Derived from that
// original data by splitting each 20-pair set into two 10-pair halves, keeping every phonetic
// family's members together in one half rather than split across both, so lightning-connect
// stays playable in every one of the 50 levels (verified: every level has >=1 qualifying
// family, 26 have 2).
//
// Sourced from the elzup/jlpt-word-list dataset (github.com/elzup/jlpt-word-list), itself
// compiled from tanos.co.uk's community JLPT vocabulary lists. Note the JLPT organization
// (Japan Foundation / JEES) has never published an official vocabulary list for any level —
// tanos.co.uk is one of the most widely cited community references, but level placement here
// still reflects that dataset's tagging, not an official source. The ~100 words featured per
// level (out of hundreds tagged) are a curated subset picked for gameplay variety, unambiguous
// single-gloss English meanings, and (after a follow-up pass) guaranteed phonetic-family
// coverage for the lightning-connect mechanic below.
//
// `meanings` lists every gloss the source dataset gives for the word (not just the one shown
// on the tile) for words with more than one sense. `example` is a real sentence pulled from
// the Tatoeba corpus (tatoeba.org, CC-licensed) that actually uses the word, with its
// translation — found by tokenizing the corpus and matching on dictionary form, not hand-
// written. Some rarer words have no matching sentence in the corpus and get `example: null`.
//
// `phonetic` is the shared phonetic component of the word's representative kanji (the first
// CJK ideograph in `jp`), sourced from Kanjium's kanjidict table (mifunetoshiro/kanjium,
// CC-BY-SA-4.0) — the same dataset backing the Phonetics Family page. `phoneticReading` is
// that component's shared on'yomi reading from Kanjium's phonetics table, when known. Both are
// null when the representative kanji has no recorded phonetic component (or the word starts
// with hiragana/katakana). Every one of the 50 levels below has at least one phonetic family
// with >=2 member words present in that same level (see the note above on how that survived
// the 20-pair -> 10-pair split), guaranteeing the "lightning connect" phonetic-chain move is
// always playable.
const WORD_LEVELS = [
    {
        "level": 1,
        "jlpt": "N5",
        "title": "N5 · Level 1",
        "sets": [
            [
                {
                    "jp": "今",
                    "reading": "いま",
                    "en": "now",
                    "meanings": [
                        "now"
                    ],
                    "example": {
                        "jp": "今までいったい何をしていたんだ！",
                        "en": "What have you been getting up to till now?!",
                        "furigana": "<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>までいったい<ruby>何<rp>(</rp><rt>なに</rt><rp>)</rp></ruby>をしていたんだ！",
                        "enMn": "Чи одоог хүртэл юу хийж байсан бэ?!"
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン",
                    "enMn": "одоо"
                },
                {
                    "jp": "今日",
                    "reading": "きょう",
                    "en": "today",
                    "meanings": [
                        "today",
                        "this day"
                    ],
                    "example": {
                        "jp": "今日は不燃物のゴミの日です。",
                        "en": "Today is a non-burnable rubbish day.",
                        "furigana": "<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>は<ruby>不燃<rp>(</rp><rt>ふねん</rt><rp>)</rp></ruby><ruby>物<rp>(</rp><rt>ぶつ</rt><rp>)</rp></ruby>のゴミの<ruby>日<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>です。",
                        "enMn": "Өнөөдөр шатдаггүй хогийн өдөр юм."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン",
                    "enMn": "өнөөдөр"
                },
                {
                    "jp": "今晩",
                    "reading": "こんばん",
                    "en": "tonight",
                    "meanings": [
                        "tonight",
                        "this evening"
                    ],
                    "example": {
                        "jp": "彼は今晩ずっとここにいるだろう。",
                        "en": "He will be here all evening.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>今晩<rp>(</rp><rt>こんばん</rt><rp>)</rp></ruby>ずっとここにいるだろう。",
                        "enMn": "Тэр орой бүхэлдээ энд байх болно."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン",
                    "enMn": "өнөө орой"
                },
                {
                    "jp": "家庭",
                    "reading": "かてい",
                    "en": "home",
                    "meanings": [
                        "home",
                        "family"
                    ],
                    "example": {
                        "jp": "僕は仕事より家庭の方が大事だ。",
                        "en": "My family comes before my career.",
                        "furigana": "<ruby>僕<rp>(</rp><rt>ぼく</rt><rp>)</rp></ruby>は<ruby>仕事<rp>(</rp><rt>しごと</rt><rp>)</rp></ruby>より<ruby>家庭<rp>(</rp><rt>かてい</rt><rp>)</rp></ruby>の<ruby>方<rp>(</rp><rt>ほう</rt><rp>)</rp></ruby>が<ruby>大事<rp>(</rp><rt>だいじ</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Миний хувьд гэр бүл минь ажил мэргэжлээсээ илүү чухал."
                    },
                    "phonetic": "家",
                    "phoneticReading": "カ",
                    "enMn": "гэр"
                },
                {
                    "jp": "紙",
                    "reading": "かみ",
                    "en": "paper",
                    "meanings": [
                        "paper"
                    ],
                    "example": {
                        "jp": "この教科書って再生紙でできてんだ。",
                        "en": "You know this textbook is made of recycled paper.",
                        "furigana": "この<ruby>教科書<rp>(</rp><rt>きょうかしょ</rt><rp>)</rp></ruby>って<ruby>再生<rp>(</rp><rt>さいせい</rt><rp>)</rp></ruby><ruby>紙<rp>(</rp><rt>し</rt><rp>)</rp></ruby>でできてんだ。",
                        "enMn": "Энэ сурах бичиг дахин боловсруулсан цаасаар хийгдсэн шүү дээ."
                    },
                    "phonetic": "氏",
                    "phoneticReading": "シ",
                    "enMn": "цаас"
                },
                {
                    "jp": "昨日",
                    "reading": "きのう",
                    "en": "yesterday",
                    "meanings": [
                        "yesterday"
                    ],
                    "example": {
                        "jp": "僕は昨日空港で偶然彼に会った。",
                        "en": "I met him by accident at the airport yesterday.",
                        "furigana": "<ruby>僕<rp>(</rp><rt>ぼく</rt><rp>)</rp></ruby>は<ruby>昨日<rp>(</rp><rt>きのう</rt><rp>)</rp></ruby><ruby>空港<rp>(</rp><rt>くうこう</rt><rp>)</rp></ruby>で<ruby>偶然<rp>(</rp><rt>ぐうぜん</rt><rp>)</rp></ruby><ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>に<ruby>会<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>った。",
                        "enMn": "Би түүнтэй өчигдөр онгоцны буудал дээр санамсаргүй тааралдсан."
                    },
                    "phonetic": "乍",
                    "phoneticReading": "サク",
                    "enMn": "өчигдөр"
                },
                {
                    "jp": "黄色",
                    "reading": "きいろ",
                    "en": "yellow",
                    "meanings": [
                        "yellow"
                    ],
                    "example": {
                        "jp": "彼等は自宅を明るい黄色に塗った。",
                        "en": "They painted their house bright yellow.",
                        "furigana": "<ruby>彼等<rp>(</rp><rt>かれら</rt><rp>)</rp></ruby>は<ruby>自宅<rp>(</rp><rt>じたく</rt><rp>)</rp></ruby>を<ruby>明<rp>(</rp><rt>あか</rt><rp>)</rp></ruby>るい<ruby>黄色<rp>(</rp><rt>きいろ</rt><rp>)</rp></ruby>に<ruby>塗<rp>(</rp><rt>ぬ</rt><rp>)</rp></ruby>った。",
                        "enMn": "Тэд гэрээ тод шар өнгөөр будсан."
                    },
                    "phonetic": "黄",
                    "phoneticReading": "オウ、コウ",
                    "enMn": "шар"
                },
                {
                    "jp": "借りる",
                    "reading": "かりる",
                    "en": "to borrow",
                    "meanings": [
                        "to borrow",
                        "to owe"
                    ],
                    "example": {
                        "jp": "明日、フォードを借りられますか。",
                        "en": "Can I borrow your Ford for tomorrow?",
                        "furigana": "<ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby>、フォードを<ruby>借<rp>(</rp><rt>か</rt><rp>)</rp></ruby>りられますか。",
                        "enMn": "Би маргааш чиний Форд машиныг зээлж болох уу?"
                    },
                    "phonetic": "昔",
                    "phoneticReading": "セキ、シャク",
                    "enMn": "зээлэх"
                },
                {
                    "jp": "会社",
                    "reading": "かいしゃ",
                    "en": "company",
                    "meanings": [
                        "company",
                        "corporation"
                    ],
                    "example": {
                        "jp": "会社が日中合弁で経営しています。",
                        "en": "The company is operating under joint Sino-Japanese management.",
                        "furigana": "<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>が<ruby>日<rp>(</rp><rt>にち</rt><rp>)</rp></ruby><ruby>中<rp>(</rp><rt>ちゅう</rt><rp>)</rp></ruby><ruby>合弁<rp>(</rp><rt>ごうべん</rt><rp>)</rp></ruby>で<ruby>経営<rp>(</rp><rt>けいえい</rt><rp>)</rp></ruby>しています。",
                        "enMn": "Тэр компани Хятад-Японы хамтарсан удирдлагаар ажилладаг."
                    },
                    "phonetic": "会",
                    "phoneticReading": "カイ、エ",
                    "enMn": "компани"
                },
                {
                    "jp": "映画",
                    "reading": "えいが",
                    "en": "movie",
                    "meanings": [
                        "movie",
                        "film"
                    ],
                    "example": {
                        "jp": "妹と私はときどき映画に行きます。",
                        "en": "My sister and I go to the movies from time to time.",
                        "furigana": "<ruby>妹<rp>(</rp><rt>いもうと</rt><rp>)</rp></ruby>と<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>はときどき<ruby>映画<rp>(</rp><rt>えいが</rt><rp>)</rp></ruby>に<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>きます。",
                        "enMn": "Дүү охин бид хааяа кино үздэг."
                    },
                    "phonetic": "央",
                    "phoneticReading": "エイ",
                    "enMn": "кино"
                }
            ]
        ]
    },
    {
        "level": 2,
        "jlpt": "N5",
        "title": "N5 · Level 2",
        "sets": [
            [
                {
                    "jp": "朝",
                    "reading": "あさ",
                    "en": "morning",
                    "meanings": [
                        "morning"
                    ],
                    "example": {
                        "jp": "例えば、ロンドンは今は朝７時です。",
                        "en": "For example, it is 7:00 a.m. in London now.",
                        "furigana": "<ruby>例<rp>(</rp><rt>たと</rt><rp>)</rp></ruby>えば、ロンドンは<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>は<ruby>朝<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby>７<ruby>時<rp>(</rp><rt>じ</rt><rp>)</rp></ruby>です。",
                        "enMn": "Жишээ нь, одоо Лондонд өглөөний 7 цаг байна."
                    },
                    "phonetic": "朝",
                    "phoneticReading": "チョウ",
                    "enMn": "өглөө"
                },
                {
                    "jp": "朝御飯",
                    "reading": "あさごはん",
                    "en": "breakfast",
                    "meanings": [
                        "breakfast"
                    ],
                    "example": {
                        "jp": "朝御飯を食べる前に花に水をやりなさい。",
                        "en": "Water the flowers before you eat breakfast.",
                        "furigana": "<ruby>朝<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby><ruby>御飯<rp>(</rp><rt>ごはん</rt><rp>)</rp></ruby>を<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べる<ruby>前<rp>(</rp><rt>まえ</rt><rp>)</rp></ruby>に<ruby>花<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>に<ruby>水<rp>(</rp><rt>みず</rt><rp>)</rp></ruby>をやりなさい。",
                        "enMn": "Өглөөний цай уухынхаа өмнө цэцгэндээ ус өг."
                    },
                    "phonetic": "朝",
                    "phoneticReading": "チョウ",
                    "enMn": "өглөөний хоол"
                },
                {
                    "jp": "聞く",
                    "reading": "きく",
                    "en": "to hear",
                    "meanings": [
                        "to hear",
                        "to listen",
                        "to ask"
                    ],
                    "example": {
                        "jp": "私の言う事を聞くべきだったのに。",
                        "en": "You should have listened to me.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>の<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>う<ruby>事<rp>(</rp><rt>こと</rt><rp>)</rp></ruby>を<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>くべきだったのに。",
                        "enMn": "Чи миний үгийг сонсох ёстой байсан."
                    },
                    "phonetic": "門",
                    "phoneticReading": "モン、カン",
                    "enMn": "сонсох"
                },
                {
                    "jp": "門",
                    "reading": "もん",
                    "en": "gate",
                    "meanings": [
                        "gate"
                    ],
                    "example": {
                        "jp": "門のところで彼らに別れを告げた。",
                        "en": "I took my leave of them at the gate.",
                        "furigana": "<ruby>門<rp>(</rp><rt>もん</rt><rp>)</rp></ruby>のところで<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らに<ruby>別<rp>(</rp><rt>わか</rt><rp>)</rp></ruby>れを<ruby>告<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>げた。",
                        "enMn": "Би тэдэнтэй хаалганы дэргэд салах ёс гүйцэтгэсэн."
                    },
                    "phonetic": "門",
                    "phoneticReading": "モン、カン",
                    "enMn": "хаалга"
                },
                {
                    "jp": "鍵",
                    "reading": "かぎ",
                    "en": "key",
                    "meanings": [
                        "a lock",
                        "a key"
                    ],
                    "example": {
                        "jp": "忘れずにドアに鍵をかけて下さい。",
                        "en": "Don't fail to lock the door.",
                        "furigana": "<ruby>忘<rp>(</rp><rt>わす</rt><rp>)</rp></ruby>れずにドアに<ruby>鍵<rp>(</rp><rt>かぎ</rt><rp>)</rp></ruby>をかけて<ruby>下<rp>(</rp><rt>くだ</rt><rp>)</rp></ruby>さい。",
                        "enMn": "Хаалгаа түгжихээ бүү мартаарай."
                    },
                    "phonetic": "建",
                    "phoneticReading": "ケン",
                    "enMn": "түлхүүр"
                },
                {
                    "jp": "階段",
                    "reading": "かいだん",
                    "en": "stairs",
                    "meanings": [
                        "stairs"
                    ],
                    "example": {
                        "jp": "彼は階段の上に恐ろしい顔を見た。",
                        "en": "He saw a horrible face at the top of the stairs.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>階段<rp>(</rp><rt>かいだん</rt><rp>)</rp></ruby>の<ruby>上<rp>(</rp><rt>うえ</rt><rp>)</rp></ruby>に<ruby>恐<rp>(</rp><rt>おそ</rt><rp>)</rp></ruby>ろしい<ruby>顔<rp>(</rp><rt>かお</rt><rp>)</rp></ruby>を<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>た。",
                        "enMn": "Тэр шатны орой дээр аймшигтай нүүр харсан."
                    },
                    "phonetic": "皆",
                    "phoneticReading": "カイ",
                    "enMn": "шат"
                },
                {
                    "jp": "風",
                    "reading": "かぜ",
                    "en": "wind",
                    "meanings": [
                        "wind",
                        "breeze"
                    ],
                    "example": {
                        "jp": "私はそんな風には生きられない。",
                        "en": "I can't live that kind of life.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>はそんな<ruby>風<rp>(</rp><rt>かぜ</rt><rp>)</rp></ruby>には<ruby>生<rp>(</rp><rt>い</rt><rp>)</rp></ruby>きられない。",
                        "enMn": "Би ийм амьдралаар амьдарч чадахгүй."
                    },
                    "phonetic": "風",
                    "phoneticReading": "フウ",
                    "enMn": "салхи"
                },
                {
                    "jp": "貸す",
                    "reading": "かす",
                    "en": "to lend",
                    "meanings": [
                        "to lend"
                    ],
                    "example": {
                        "jp": "ちょっと顔を貸してくれませんか。",
                        "en": "Can I have a few words with you?",
                        "furigana": "ちょっと<ruby>顔<rp>(</rp><rt>かお</rt><rp>)</rp></ruby>を<ruby>貸<rp>(</rp><rt>か</rt><rp>)</rp></ruby>してくれませんか。",
                        "enMn": "Чамтай хэдэн үг ярьж болох уу?"
                    },
                    "phonetic": "代",
                    "phoneticReading": "タイ",
                    "enMn": "зээлдүүлэх"
                },
                {
                    "jp": "軽い",
                    "reading": "かるい",
                    "en": "light",
                    "meanings": [
                        "light",
                        "non-serious",
                        "minor"
                    ],
                    "example": {
                        "jp": "私は気が短いし、口も軽い男だ。",
                        "en": "I'm short-tempered, and a loose-tongued man.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>気<rp>(</rp><rt>き</rt><rp>)</rp></ruby>が<ruby>短<rp>(</rp><rt>みじか</rt><rp>)</rp></ruby>いし、<ruby>口<rp>(</rp><rt>くち</rt><rp>)</rp></ruby>も<ruby>軽<rp>(</rp><rt>かる</rt><rp>)</rp></ruby>い<ruby>男<rp>(</rp><rt>おとこ</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Би уур бухимдалтай, амаа барьдаггүй хүн юм."
                    },
                    "phonetic": "圣",
                    "phoneticReading": "ケイ",
                    "enMn": "хөнгөн"
                },
                {
                    "jp": "海",
                    "reading": "うみ",
                    "en": "sea",
                    "meanings": [
                        "sea",
                        "beach"
                    ],
                    "example": {
                        "jp": "私の目は夢を反映する海である。",
                        "en": "My eyes are an ocean in which my dreams are reflected.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>の<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>は<ruby>夢<rp>(</rp><rt>ゆめ</rt><rp>)</rp></ruby>を<ruby>反映<rp>(</rp><rt>はんえい</rt><rp>)</rp></ruby>する<ruby>海<rp>(</rp><rt>うみ</rt><rp>)</rp></ruby>である。",
                        "enMn": "Миний нүд бол мөрөөдлөө тусгасан далай юм."
                    },
                    "phonetic": "毎",
                    "phoneticReading": "カイ",
                    "enMn": "тэнгис"
                }
            ]
        ]
    },
    {
        "level": 3,
        "jlpt": "N5",
        "title": "N5 · Level 3",
        "sets": [
            [
                {
                    "jp": "今朝",
                    "reading": "けさ",
                    "en": "this morning",
                    "meanings": [
                        "this morning"
                    ],
                    "example": {
                        "jp": "彼は今朝安らかに息を引き取った。",
                        "en": "He breathed his last peacefully this morning.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>今朝<rp>(</rp><rt>けさ</rt><rp>)</rp></ruby><ruby>安<rp>(</rp><rt>やす</rt><rp>)</rp></ruby>らかに<ruby>息<rp>(</rp><rt>いき</rt><rp>)</rp></ruby>を<ruby>引<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>き<ruby>取<rp>(</rp><rt>と</rt><rp>)</rp></ruby>った。",
                        "enMn": "Тэр өнөө өглөө тайван амиа тавьсан."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン",
                    "enMn": "өнөө өглөө"
                },
                {
                    "jp": "今年",
                    "reading": "ことし",
                    "en": "this year",
                    "meanings": [
                        "this year"
                    ],
                    "example": {
                        "jp": "両親は私の今年の成績に満足した。",
                        "en": "My parents were satisfied with my grades this year.",
                        "furigana": "<ruby>両親<rp>(</rp><rt>りょうしん</rt><rp>)</rp></ruby>は<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>の<ruby>今年<rp>(</rp><rt>ことし</rt><rp>)</rp></ruby>の<ruby>成績<rp>(</rp><rt>せいせき</rt><rp>)</rp></ruby>に<ruby>満足<rp>(</rp><rt>まんぞく</rt><rp>)</rp></ruby>した。",
                        "enMn": "Эцэг эх минь энэ жилийн дүн миний хувьд сэтгэл хангалуун байсан."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン",
                    "enMn": "энэ жил"
                },
                {
                    "jp": "切符",
                    "reading": "きっぷ",
                    "en": "ticket",
                    "meanings": [
                        "a ticket"
                    ],
                    "example": {
                        "jp": "大阪までの往復切符を二枚下さい。",
                        "en": "Two roundtrip tickets to Osaka, please.",
                        "furigana": "<ruby>大阪<rp>(</rp><rt>おおさか</rt><rp>)</rp></ruby>までの<ruby>往復<rp>(</rp><rt>おうふく</rt><rp>)</rp></ruby><ruby>切符<rp>(</rp><rt>きっぷ</rt><rp>)</rp></ruby>を<ruby>二<rp>(</rp><rt>に</rt><rp>)</rp></ruby><ruby>枚<rp>(</rp><rt>まい</rt><rp>)</rp></ruby><ruby>下<rp>(</rp><rt>くだ</rt><rp>)</rp></ruby>さい。",
                        "enMn": "Осака хүртэл хоёр очиж ирэх тасалбар өгнө үү."
                    },
                    "phonetic": "切",
                    "phoneticReading": "セツ",
                    "enMn": "тасалбар"
                },
                {
                    "jp": "切る",
                    "reading": "きる",
                    "en": "to cut",
                    "meanings": [
                        "to cut",
                        "to hang up (a phone)"
                    ],
                    "example": {
                        "jp": "プチッ、と糸を犬歯で噛み切った。",
                        "en": "I snapped the thread on my canine.",
                        "furigana": "プチッ、と<ruby>糸<rp>(</rp><rt>いと</rt><rp>)</rp></ruby>を<ruby>犬歯<rp>(</rp><rt>けんし</rt><rp>)</rp></ruby>で<ruby>噛<rp>(</rp><rt>か</rt><rp>)</rp></ruby>み<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>った。",
                        "enMn": "Би утсыг соёогоороо тас цавчив."
                    },
                    "phonetic": "切",
                    "phoneticReading": "セツ",
                    "enMn": "огтлох"
                },
                {
                    "jp": "警官",
                    "reading": "けいかん",
                    "en": "police officer",
                    "meanings": [
                        "police officer"
                    ],
                    "example": {
                        "jp": "彼らはその警官の命令を無視した。",
                        "en": "They defied the policeman's order.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らはその<ruby>警官<rp>(</rp><rt>けいかん</rt><rp>)</rp></ruby>の<ruby>命令<rp>(</rp><rt>めいれい</rt><rp>)</rp></ruby>を<ruby>無視<rp>(</rp><rt>むし</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэд цагдаагийн тушаалыг үл тоомсорлов."
                    },
                    "phonetic": "敬",
                    "phoneticReading": "ケイ",
                    "enMn": "цагдаа"
                },
                {
                    "jp": "紅茶",
                    "reading": "こうちゃ",
                    "en": "black tea",
                    "meanings": [
                        "black tea"
                    ],
                    "example": {
                        "jp": "私はコーヒーより紅茶の方を好む。",
                        "en": "I prefer tea to coffee.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>はコーヒーより<ruby>紅茶<rp>(</rp><rt>こうちゃ</rt><rp>)</rp></ruby>の<ruby>方<rp>(</rp><rt>ほう</rt><rp>)</rp></ruby>を<ruby>好<rp>(</rp><rt>この</rt><rp>)</rp></ruby>む。",
                        "enMn": "Би кофеноос цайд илүү дуртай."
                    },
                    "phonetic": "工",
                    "phoneticReading": "コウ、ク",
                    "enMn": "хар цай"
                },
                {
                    "jp": "綺麗",
                    "reading": "きれい",
                    "en": "pretty",
                    "meanings": [
                        "pretty",
                        "clean",
                        "tidy"
                    ],
                    "example": {
                        "jp": "これらはなんて綺麗な花でしょう。",
                        "en": "What lovely flowers these are!",
                        "furigana": "これらはなんて<ruby>綺麗<rp>(</rp><rt>きれい</rt><rp>)</rp></ruby>な<ruby>花<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>でしょう。",
                        "enMn": "Ямар сайхан цэцэгс вэ!"
                    },
                    "phonetic": "奇",
                    "phoneticReading": "キ",
                    "enMn": "үзэсгэлэнтэй"
                },
                {
                    "jp": "嫌い",
                    "reading": "きらい",
                    "en": "dislike",
                    "meanings": [
                        "dislike"
                    ],
                    "example": {
                        "jp": "ジムくんは行き過ぎの嫌いがある。",
                        "en": "Jim tends to go too far.",
                        "furigana": "ジムくんは<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>き<ruby>過<rp>(</rp><rt>す</rt><rp>)</rp></ruby>ぎの<ruby>嫌<rp>(</rp><rt>きら</rt><rp>)</rp></ruby>いがある。",
                        "enMn": "Жим хэтрүүлэх хандлагатай."
                    },
                    "phonetic": "兼",
                    "phoneticReading": "ケン、レン",
                    "enMn": "дургүй"
                },
                {
                    "jp": "果物",
                    "reading": "くだもの",
                    "en": "fruit",
                    "meanings": [
                        "fruit"
                    ],
                    "example": {
                        "jp": "日本でいちばんおいしい果物は何？",
                        "en": "What's the most delicious fruit in Japan?",
                        "furigana": "<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>でいちばんおいしい<ruby>果物<rp>(</rp><rt>くだもの</rt><rp>)</rp></ruby>は<ruby>何<rp>(</rp><rt>なに</rt><rp>)</rp></ruby>？",
                        "enMn": "Японд хамгийн амттай жимс юу вэ?"
                    },
                    "phonetic": "果",
                    "phoneticReading": "カ",
                    "enMn": "жимс"
                },
                {
                    "jp": "九",
                    "reading": "く",
                    "en": "nine",
                    "meanings": [
                        "nine"
                    ],
                    "example": {
                        "jp": "時を得た一針は九針の手間を省く。",
                        "en": "A stitch in time saves nine.",
                        "furigana": "<ruby>時<rp>(</rp><rt>とき</rt><rp>)</rp></ruby>を<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>た<ruby>一<rp>(</rp><rt>いち</rt><rp>)</rp></ruby><ruby>針<rp>(</rp><rt>はり</rt><rp>)</rp></ruby>は<ruby>九<rp>(</rp><rt>きゅう</rt><rp>)</rp></ruby><ruby>針<rp>(</rp><rt>はり</rt><rp>)</rp></ruby>の<ruby>手間<rp>(</rp><rt>てま</rt><rp>)</rp></ruby>を<ruby>省<rp>(</rp><rt>はぶ</rt><rp>)</rp></ruby>く。",
                        "enMn": "Цагтаа хийсэн нэг оёдол есийг аварна."
                    },
                    "phonetic": "九",
                    "phoneticReading": "キュウ",
                    "enMn": "ес"
                }
            ]
        ]
    },
    {
        "level": 4,
        "jlpt": "N5",
        "title": "N5 · Level 4",
        "sets": [
            [
                {
                    "jp": "明日",
                    "reading": "あした",
                    "en": "tomorrow",
                    "meanings": [
                        "tomorrow"
                    ],
                    "example": {
                        "jp": "明日図書館で勉強するつもりです。",
                        "en": "Tomorrow, I'm going to study at the library.",
                        "furigana": "<ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby><ruby>図書館<rp>(</rp><rt>としょかん</rt><rp>)</rp></ruby>で<ruby>勉強<rp>(</rp><rt>べんきょう</rt><rp>)</rp></ruby>するつもりです。",
                        "enMn": "Маргааш би номын санд хичээллэх гэж байна."
                    },
                    "phonetic": "明",
                    "phoneticReading": "メイ",
                    "enMn": "маргааш"
                },
                {
                    "jp": "明るい",
                    "reading": "あかるい",
                    "en": "bright (in reference to personality or weather)",
                    "meanings": [
                        "bright (in reference to personality or weather)",
                        "cheerful"
                    ],
                    "example": {
                        "jp": "明るくなってきた。もうすぐ朝だ。",
                        "en": "It's getting light. Morning is coming.",
                        "furigana": "<ruby>明<rp>(</rp><rt>あか</rt><rp>)</rp></ruby>るくなってきた。もうすぐ<ruby>朝<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Гэрэлтэж эхэллээ. Өглөө болж байна."
                    },
                    "phonetic": "明",
                    "phoneticReading": "メイ",
                    "enMn": "цовоо"
                },
                {
                    "jp": "五",
                    "reading": "ご",
                    "en": "five",
                    "meanings": [
                        "five"
                    ],
                    "example": {
                        "jp": "列車は五時ちょうどに発車した。",
                        "en": "The train left at five o'clock to the minute.",
                        "furigana": "<ruby>列車<rp>(</rp><rt>れっしゃ</rt><rp>)</rp></ruby>は<ruby>五<rp>(</rp><rt>ご</rt><rp>)</rp></ruby><ruby>時<rp>(</rp><rt>じ</rt><rp>)</rp></ruby>ちょうどに<ruby>発車<rp>(</rp><rt>はっしゃ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Галт тэрэг яг таван цагт хөдөлсөн."
                    },
                    "phonetic": "五",
                    "phoneticReading": "ゴ",
                    "enMn": "тав"
                },
                {
                    "jp": "外国",
                    "reading": "がいこく",
                    "en": "foreign country",
                    "meanings": [
                        "foreign country",
                        "abroad"
                    ],
                    "example": {
                        "jp": "裕子は外国人と話したことがない。",
                        "en": "Yuko has never spoken with a foreigner.",
                        "furigana": "<ruby>裕子<rp>(</rp><rt>ゆうこ</rt><rp>)</rp></ruby>は<ruby>外国<rp>(</rp><rt>がいこく</rt><rp>)</rp></ruby><ruby>人<rp>(</rp><rt>じん</rt><rp>)</rp></ruby>と<ruby>話<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>したことがない。",
                        "enMn": "Юко хэзээ ч гадаадынхантай ярилцаж байгаагүй."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "гадаад улс"
                },
                {
                    "jp": "色",
                    "reading": "いろ",
                    "en": "color",
                    "meanings": [
                        "color"
                    ],
                    "example": {
                        "jp": "明るい色が私たちの目を引いた。",
                        "en": "The bright colors arrested our eyes.",
                        "furigana": "<ruby>明<rp>(</rp><rt>あか</rt><rp>)</rp></ruby>るい<ruby>色<rp>(</rp><rt>いろ</rt><rp>)</rp></ruby>が<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>たちの<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>を<ruby>引<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>いた。",
                        "enMn": "Тод өнгө биднийг нүдийг татав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "өнгө"
                },
                {
                    "jp": "財布",
                    "reading": "さいふ",
                    "en": "wallet",
                    "meanings": [
                        "wallet"
                    ],
                    "example": {
                        "jp": "旅の間の共通のお財布をつくろう。",
                        "en": "Let's pool our money and travel as a group.",
                        "furigana": "<ruby>旅<rp>(</rp><rt>たび</rt><rp>)</rp></ruby>の<ruby>間<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>の<ruby>共通<rp>(</rp><rt>きょうつう</rt><rp>)</rp></ruby>のお<ruby>財布<rp>(</rp><rt>さいふ</rt><rp>)</rp></ruby>をつくろう。",
                        "enMn": "Аяллын хамтын мөнгийг нэгтгэцгээе."
                    },
                    "phonetic": "才",
                    "phoneticReading": "サイ、ザイ",
                    "enMn": "түрийвч"
                },
                {
                    "jp": "元気",
                    "reading": "げんき",
                    "en": "healthy",
                    "meanings": [
                        "health(y)",
                        "energetic"
                    ],
                    "example": {
                        "jp": "老人だが、彼はまだたいそう元気だ。",
                        "en": "Although old, he is still very much alive.",
                        "furigana": "<ruby>老人<rp>(</rp><rt>ろうじん</rt><rp>)</rp></ruby>だが、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>はまだたいそう<ruby>元気<rp>(</rp><rt>げんき</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Хөгширсөн ч тэр одоо ч эрч хүчтэй байна."
                    },
                    "phonetic": "元",
                    "phoneticReading": "ガン",
                    "enMn": "эрүүл"
                },
                {
                    "jp": "先",
                    "reading": "さき",
                    "en": "future",
                    "meanings": [
                        "future",
                        "recent",
                        "previous"
                    ],
                    "example": {
                        "jp": "日本は先願主義を採用している。",
                        "en": "Japan follows the principle of first-to-file.",
                        "furigana": "<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>は<ruby>先<rp>(</rp><rt>さき</rt><rp>)</rp></ruby><ruby>願<rp>(</rp><rt>ねがい</rt><rp>)</rp></ruby><ruby>主義<rp>(</rp><rt>しゅぎ</rt><rp>)</rp></ruby>を<ruby>採用<rp>(</rp><rt>さいよう</rt><rp>)</rp></ruby>している。",
                        "enMn": "Япон хамгийн түрүүнд бүртгүүлсний зарчмыг баримталдаг."
                    },
                    "phonetic": "先",
                    "phoneticReading": "セン",
                    "enMn": "ирээдүй"
                },
                {
                    "jp": "駅",
                    "reading": "えき",
                    "en": "station",
                    "meanings": [
                        "station"
                    ],
                    "example": {
                        "jp": "私が駅を出た時、男の人を見た。",
                        "en": "When I left the train station, I saw a man.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>が<ruby>駅<rp>(</rp><rt>えき</rt><rp>)</rp></ruby>を<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>た<ruby>時<rp>(</rp><rt>とき</rt><rp>)</rp></ruby>、<ruby>男<rp>(</rp><rt>おとこ</rt><rp>)</rp></ruby>の<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>を<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>た。",
                        "enMn": "Галт тэрэгний буудлаас гарахад би нэг эрэгтэйг харсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "буудал"
                },
                {
                    "jp": "大きい",
                    "reading": "おおきい",
                    "en": "big",
                    "meanings": [
                        "big",
                        "large"
                    ],
                    "example": {
                        "jp": "大きくなったら王様になりたい。",
                        "en": "When I grow up, I want to be a king.",
                        "furigana": "<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きくなったら<ruby>王様<rp>(</rp><rt>おうさま</rt><rp>)</rp></ruby>になりたい。",
                        "enMn": "Би том болохоороо хаан болохыг хүсдэг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "том"
                }
            ]
        ]
    },
    {
        "level": 5,
        "jlpt": "N5",
        "title": "N5 · Level 5",
        "sets": [
            [
                {
                    "jp": "今月",
                    "reading": "こんげつ",
                    "en": "this month",
                    "meanings": [
                        "this month"
                    ],
                    "example": {
                        "jp": "今月末で会社をやめることにした。",
                        "en": "I've decided to quit my job at the end of this month.",
                        "furigana": "<ruby>今月<rp>(</rp><rt>こんげつ</rt><rp>)</rp></ruby><ruby>末<rp>(</rp><rt>まつ</rt><rp>)</rp></ruby>で<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>をやめることにした。",
                        "enMn": "Би энэ сарын сүүлээр ажлаасаа гарахаар шийдсэн."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン",
                    "enMn": "энэ сар"
                },
                {
                    "jp": "今週",
                    "reading": "こんしゅう",
                    "en": "this week",
                    "meanings": [
                        "this week"
                    ],
                    "example": {
                        "jp": "彼は今週ずっと忙しくしています。",
                        "en": "He has been busy this week.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>今週<rp>(</rp><rt>こんしゅう</rt><rp>)</rp></ruby>ずっと<ruby>忙<rp>(</rp><rt>いそが</rt><rp>)</rp></ruby>しくしています。",
                        "enMn": "Тэр энэ долоо хоногт завгүй байсан."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン",
                    "enMn": "энэ долоо хоног"
                },
                {
                    "jp": "兄弟",
                    "reading": "きょうだい",
                    "en": "siblings",
                    "meanings": [
                        "siblings (humble)",
                        "brothers and sisters"
                    ],
                    "example": {
                        "jp": "彼は私の兄弟より３才年下です。",
                        "en": "He is junior to my brother by three years.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>の<ruby>兄弟<rp>(</rp><rt>きょうだい</rt><rp>)</rp></ruby>より３<ruby>才<rp>(</rp><rt>さい</rt><rp>)</rp></ruby><ruby>年下<rp>(</rp><rt>としした</rt><rp>)</rp></ruby>です。",
                        "enMn": "Тэр миний ахаас гурван настай бага."
                    },
                    "phonetic": "兄",
                    "phoneticReading": "キョウ",
                    "enMn": "ах дүү"
                },
                {
                    "jp": "兄",
                    "reading": "あに",
                    "en": "(my) older brother (humble)",
                    "meanings": [
                        "(my) older brother (humble)"
                    ],
                    "example": {
                        "jp": "これは兄です。かっこいいですね。",
                        "en": "This is my brother. Handsome, isn't he?",
                        "furigana": "これは<ruby>兄<rp>(</rp><rt>あに</rt><rp>)</rp></ruby>です。かっこいいですね。",
                        "enMn": "Энэ бол миний ах. Царайлаг биз дээ?"
                    },
                    "phonetic": "兄",
                    "phoneticReading": "キョウ",
                    "enMn": "ах (даруу)"
                },
                {
                    "jp": "学生",
                    "reading": "がくせい",
                    "en": "student",
                    "meanings": [
                        "student"
                    ],
                    "example": {
                        "jp": "利口な学生達は早くテストを終えた。",
                        "en": "The clever student finished the test quickly.",
                        "furigana": "<ruby>利口<rp>(</rp><rt>りこう</rt><rp>)</rp></ruby>な<ruby>学生<rp>(</rp><rt>がくせい</rt><rp>)</rp></ruby><ruby>達<rp>(</rp><rt>たち</rt><rp>)</rp></ruby>は<ruby>早<rp>(</rp><rt>はや</rt><rp>)</rp></ruby>くテストを<ruby>終<rp>(</rp><rt>お</rt><rp>)</rp></ruby>えた。",
                        "enMn": "Ухаалаг сурагч шалгалтаа хурдан дуусгав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "оюутан"
                },
                {
                    "jp": "かばん",
                    "reading": "かばん",
                    "en": "bag",
                    "meanings": [
                        "bag",
                        "basket"
                    ],
                    "example": {
                        "jp": "僕はケンにそのかばんを返した。",
                        "en": "I gave the bag back to Ken.",
                        "furigana": "<ruby>僕<rp>(</rp><rt>ぼく</rt><rp>)</rp></ruby>はケンにそのかばんを<ruby>返<rp>(</rp><rt>かえ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Би цүнхийг Кэнд буцааж өгсөн."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "цүнх"
                },
                {
                    "jp": "傘",
                    "reading": "かさ",
                    "en": "umbrella",
                    "meanings": [
                        "umbrella",
                        "parasol"
                    ],
                    "example": {
                        "jp": "用心に傘を持っていった方がいい。",
                        "en": "You had better take your umbrella in case.",
                        "furigana": "<ruby>用心<rp>(</rp><rt>ようじん</rt><rp>)</rp></ruby>に<ruby>傘<rp>(</rp><rt>かさ</rt><rp>)</rp></ruby>を<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>っていった<ruby>方<rp>(</rp><rt>ほう</rt><rp>)</rp></ruby>がいい。",
                        "enMn": "Аюулгүйн үүднээс шүхрээ ав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "шүхэр"
                },
                {
                    "jp": "学校",
                    "reading": "がっこう",
                    "en": "school",
                    "meanings": [
                        "a school"
                    ],
                    "example": {
                        "jp": "理恵と私は同じ学校に通いました。",
                        "en": "Rie and I went to the same school.",
                        "furigana": "<ruby>理恵<rp>(</rp><rt>りえ</rt><rp>)</rp></ruby>と<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>同<rp>(</rp><rt>おな</rt><rp>)</rp></ruby>じ<ruby>学校<rp>(</rp><rt>がっこう</rt><rp>)</rp></ruby>に<ruby>通<rp>(</rp><rt>かよ</rt><rp>)</rp></ruby>いました。",
                        "enMn": "Риэ бид хоёр ижил сургуульд сурдаг байсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сургууль"
                },
                {
                    "jp": "書く",
                    "reading": "かく",
                    "en": "to write",
                    "meanings": [
                        "to write"
                    ],
                    "example": {
                        "jp": "多くの人が日常のことについて文を書く。",
                        "en": "Most people write about their daily life.",
                        "furigana": "<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>くの<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>が<ruby>日常<rp>(</rp><rt>にちじょう</rt><rp>)</rp></ruby>のことについて<ruby>文<rp>(</rp><rt>ぶん</rt><rp>)</rp></ruby>を<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>く。",
                        "enMn": "Ихэнх хүн өдөр тутмын амьдралынхаа тухай бичдэг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бичих"
                },
                {
                    "jp": "顔",
                    "reading": "かお",
                    "en": "face",
                    "meanings": [
                        "face (body part)"
                    ],
                    "example": {
                        "jp": "けいこは枕に顔をうずめて泣いた。",
                        "en": "Keiko buried her head in the pillow and cried.",
                        "furigana": "けいこは<ruby>枕<rp>(</rp><rt>まくら</rt><rp>)</rp></ruby>に<ruby>顔<rp>(</rp><rt>かお</rt><rp>)</rp></ruby>をうずめて<ruby>泣<rp>(</rp><rt>な</rt><rp>)</rp></ruby>いた。",
                        "enMn": "Кэйко толгойгоо дэрэндээ шигтгэн уйлав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "царай"
                }
            ]
        ]
    },
    {
        "level": 6,
        "jlpt": "N5",
        "title": "N5 · Level 6",
        "sets": [
            [
                {
                    "jp": "新しい",
                    "reading": "あたらしい",
                    "en": "new",
                    "meanings": [
                        "new"
                    ],
                    "example": {
                        "jp": "あぁ私の白いズボンが！新しいのに。",
                        "en": "Oh, my white pants! And they were new.",
                        "furigana": "あぁ<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>の<ruby>白<rp>(</rp><rt>しろ</rt><rp>)</rp></ruby>いズボンが！<ruby>新<rp>(</rp><rt>あたら</rt><rp>)</rp></ruby>しいのに。",
                        "enMn": "Өө, миний цагаан өмд! Тэр ч бас шинэ байсан."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン",
                    "enMn": "шинэ"
                },
                {
                    "jp": "新聞",
                    "reading": "しんぶん",
                    "en": "newspaper",
                    "meanings": [
                        "newspaper"
                    ],
                    "example": {
                        "jp": "僕はちょっと新聞に目を通したい。",
                        "en": "I just want to glance at the paper.",
                        "furigana": "<ruby>僕<rp>(</rp><rt>ぼく</rt><rp>)</rp></ruby>はちょっと<ruby>新聞<rp>(</rp><rt>しんぶん</rt><rp>)</rp></ruby>に<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>を<ruby>通<rp>(</rp><rt>とお</rt><rp>)</rp></ruby>したい。",
                        "enMn": "Би зөвхөн сониныг нэг үзчихмээр байна."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン",
                    "enMn": "сонин"
                },
                {
                    "jp": "買う",
                    "reading": "かう",
                    "en": "to buy",
                    "meanings": [
                        "to buy"
                    ],
                    "example": {
                        "jp": "新しいパソコンを買わねばなりません。",
                        "en": "I have to get a new computer.",
                        "furigana": "<ruby>新<rp>(</rp><rt>あたら</rt><rp>)</rp></ruby>しいパソコンを<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>わねばなりません。",
                        "enMn": "Надад шинэ компьютер авах шаардлагатай байна."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "худалдаж авах"
                },
                {
                    "jp": "カメラ",
                    "reading": "カメラ",
                    "en": "camera",
                    "meanings": [
                        "camera"
                    ],
                    "example": {
                        "jp": "彼は息子にカメラを買ってやった。",
                        "en": "He bought his son a camera.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>息子<rp>(</rp><rt>むすこ</rt><rp>)</rp></ruby>にカメラを<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>ってやった。",
                        "enMn": "Тэр хүүдээ камер худалдаж авав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "камер"
                },
                {
                    "jp": "木",
                    "reading": "き",
                    "en": "tree",
                    "meanings": [
                        "tree",
                        "wood",
                        "timber"
                    ],
                    "example": {
                        "jp": "木片は１本の留め木で留めてある。",
                        "en": "The wooden pieces are fastened with a peg.",
                        "furigana": "<ruby>木片<rp>(</rp><rt>もくへん</rt><rp>)</rp></ruby>は１<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>の<ruby>留<rp>(</rp><rt>と</rt><rp>)</rp></ruby>め<ruby>木<rp>(</rp><rt>き</rt><rp>)</rp></ruby>で<ruby>留<rp>(</rp><rt>と</rt><rp>)</rp></ruby>めてある。",
                        "enMn": "Модон хэсгүүд ялтсаар бэхлэгдсэн байна."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "мод"
                },
                {
                    "jp": "買い物",
                    "reading": "かいもの",
                    "en": "shopping",
                    "meanings": [
                        "shopping"
                    ],
                    "example": {
                        "jp": "母は勤めの帰りに買い物をします。",
                        "en": "My mother does her usual shopping on her way home from work.",
                        "furigana": "<ruby>母<rp>(</rp><rt>はは</rt><rp>)</rp></ruby>は<ruby>勤<rp>(</rp><rt>つと</rt><rp>)</rp></ruby>めの<ruby>帰<rp>(</rp><rt>かえ</rt><rp>)</rp></ruby>りに<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>い<ruby>物<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>をします。",
                        "enMn": "Ээж минь ажлаасаа гэр рүүгээ явахдаа ердийн дэлгүүр хэсдэг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дэлгүүр хэсэх"
                },
                {
                    "jp": "漢字",
                    "reading": "かんじ",
                    "en": "kanji",
                    "meanings": [
                        "kanji",
                        "Chinese character"
                    ],
                    "example": {
                        "jp": "この漢字はどういう意味ですか。",
                        "en": "What does this kanji mean?",
                        "furigana": "この<ruby>漢字<rp>(</rp><rt>かんじ</rt><rp>)</rp></ruby>はどういう<ruby>意味<rp>(</rp><rt>いみ</rt><rp>)</rp></ruby>ですか。",
                        "enMn": "Энэ ханз ямар утгатай вэ?"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ханз"
                },
                {
                    "jp": "帰る",
                    "reading": "かえる",
                    "en": "to go back",
                    "meanings": [
                        "to go back",
                        "to go home",
                        "to return"
                    ],
                    "example": {
                        "jp": "「帰ろ」「マックよってかない？」",
                        "en": "\"Let's head back.\" \"Shall we drop by McDonald's?\"",
                        "furigana": "「<ruby>帰<rp>(</rp><rt>かえ</rt><rp>)</rp></ruby>ろ」「マックよってかない？」",
                        "enMn": "\"Явцгаая.\" \"Макдональдст орох уу?\""
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "буцах"
                },
                {
                    "jp": "体",
                    "reading": "からだ",
                    "en": "body",
                    "meanings": [
                        "body",
                        "health"
                    ],
                    "example": {
                        "jp": "その細っこい体のどこに入るんだ？",
                        "en": "In that slender body, where does it all go?",
                        "furigana": "その<ruby>細<rp>(</rp><rt>ほそ</rt><rp>)</rp></ruby>っこい<ruby>体<rp>(</rp><rt>からだ</rt><rp>)</rp></ruby>のどこに<ruby>入<rp>(</rp><rt>はい</rt><rp>)</rp></ruby>るんだ？",
                        "enMn": "Тэр нарийн биедээ хаана л ч багтаад байна вэ?"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бие"
                },
                {
                    "jp": "川",
                    "reading": "かわ",
                    "en": "river",
                    "meanings": [
                        "river"
                    ],
                    "example": {
                        "jp": "僕は川を泳いで渡ることが出来る。",
                        "en": "I can swim across the river.",
                        "furigana": "<ruby>僕<rp>(</rp><rt>ぼく</rt><rp>)</rp></ruby>は<ruby>川<rp>(</rp><rt>かわ</rt><rp>)</rp></ruby>を<ruby>泳<rp>(</rp><rt>およ</rt><rp>)</rp></ruby>いで<ruby>渡<rp>(</rp><rt>わた</rt><rp>)</rp></ruby>ることが<ruby>出来<rp>(</rp><rt>でき</rt><rp>)</rp></ruby>る。",
                        "enMn": "Би голыг сэлж гатлаж чадна."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "гол"
                }
            ]
        ]
    },
    {
        "level": 7,
        "jlpt": "N5",
        "title": "N5 · Level 7",
        "sets": [
            [
                {
                    "jp": "会う",
                    "reading": "あう",
                    "en": "to meet",
                    "meanings": [
                        "to meet",
                        "to see"
                    ],
                    "example": {
                        "jp": "来週、忘れずに父に会って下さい。",
                        "en": "Please remember to see my father next week.",
                        "furigana": "<ruby>来週<rp>(</rp><rt>らいしゅう</rt><rp>)</rp></ruby>、<ruby>忘<rp>(</rp><rt>わす</rt><rp>)</rp></ruby>れずに<ruby>父<rp>(</rp><rt>ちち</rt><rp>)</rp></ruby>に<ruby>会<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>って<ruby>下<rp>(</rp><rt>くだ</rt><rp>)</rp></ruby>さい。",
                        "enMn": "Ирэх долоо хоногт аавтай минь уулзахаа бүү мартаарай."
                    },
                    "phonetic": "会",
                    "phoneticReading": "カイ、エ",
                    "enMn": "уулзах"
                },
                {
                    "jp": "絵",
                    "reading": "え",
                    "en": "painting",
                    "meanings": [
                        "a painting",
                        "a picture",
                        "a drawing"
                    ],
                    "example": {
                        "jp": "あれはさる年に因んだ猿の絵です。",
                        "en": "That's a picture of a monkey associated with the Year of the Monkey.",
                        "furigana": "あれはさる<ruby>年<rp>(</rp><rt>とし</rt><rp>)</rp></ruby>に<ruby>因<rp>(</rp><rt>ちな</rt><rp>)</rp></ruby>んだ<ruby>猿<rp>(</rp><rt>さる</rt><rp>)</rp></ruby>の<ruby>絵<rp>(</rp><rt>え</rt><rp>)</rp></ruby>です。",
                        "enMn": "Энэ бол Мэчин жилтэй холбоотой сармагчингийн зураг юм."
                    },
                    "phonetic": "会",
                    "phoneticReading": "カイ、エ",
                    "enMn": "зураг"
                },
                {
                    "jp": "靴",
                    "reading": "くつ",
                    "en": "shoes",
                    "meanings": [
                        "shoes",
                        "footwear"
                    ],
                    "example": {
                        "jp": "母さんは彼の靴から泥を落とした。",
                        "en": "Mother removed mud from his shoes.",
                        "furigana": "<ruby>母<rp>(</rp><rt>かあ</rt><rp>)</rp></ruby>さんは<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>靴<rp>(</rp><rt>くつ</rt><rp>)</rp></ruby>から<ruby>泥<rp>(</rp><rt>どろ</rt><rp>)</rp></ruby>を<ruby>落<rp>(</rp><rt>お</rt><rp>)</rp></ruby>とした。",
                        "enMn": "Ээж түүний гутлаас шавар цэвэрлэв."
                    },
                    "phonetic": "化",
                    "phoneticReading": "カ",
                    "enMn": "гутал"
                },
                {
                    "jp": "靴下",
                    "reading": "くつした",
                    "en": "socks",
                    "meanings": [
                        "socks"
                    ],
                    "example": {
                        "jp": "靴下は適当な大きさのものがよい。",
                        "en": "Stockings should be of the proper size.",
                        "furigana": "<ruby>靴下<rp>(</rp><rt>くつした</rt><rp>)</rp></ruby>は<ruby>適当<rp>(</rp><rt>てきとう</rt><rp>)</rp></ruby>な<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きさのものがよい。",
                        "enMn": "Оймс зохих хэмжээтэй байх ёстой."
                    },
                    "phonetic": "化",
                    "phoneticReading": "カ",
                    "enMn": "оймс"
                },
                {
                    "jp": "北",
                    "reading": "きた",
                    "en": "north",
                    "meanings": [
                        "north"
                    ],
                    "example": {
                        "jp": "北海道は日本の北に位置しています。",
                        "en": "Hokkaido lies in the north of Japan.",
                        "furigana": "<ruby>北海道<rp>(</rp><rt>ほっかいどう</rt><rp>)</rp></ruby>は<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>の<ruby>北<rp>(</rp><rt>きた</rt><rp>)</rp></ruby>に<ruby>位置<rp>(</rp><rt>いち</rt><rp>)</rp></ruby>しています。",
                        "enMn": "Хоккайдо Японы хойд хэсэгт оршдог."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хойд"
                },
                {
                    "jp": "ギター",
                    "reading": "ギター",
                    "en": "guitar",
                    "meanings": [
                        "guitar"
                    ],
                    "example": {
                        "jp": "彼らはギターを弾くことができる。",
                        "en": "They can play the guitar.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らはギターを<ruby>弾<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>くことができる。",
                        "enMn": "Тэд гитар тоглож чаддаг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "гитар"
                },
                {
                    "jp": "曇り",
                    "reading": "くもり",
                    "en": "cloudy",
                    "meanings": [
                        "cloudiness",
                        "cloudy weather"
                    ],
                    "example": {
                        "jp": "天気は晴れのち曇りでしょう。",
                        "en": "The weather will be clear, followed by clouds later on.",
                        "furigana": "<ruby>天気<rp>(</rp><rt>てんき</rt><rp>)</rp></ruby>は<ruby>晴<rp>(</rp><rt>は</rt><rp>)</rp></ruby>れのち<ruby>曇<rp>(</rp><rt>くも</rt><rp>)</rp></ruby>りでしょう。",
                        "enMn": "Цаг агаар цэлмэг байгаад дараа нь үүлэрхэг болно."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "үүлэрхэг"
                },
                {
                    "jp": "喫茶店",
                    "reading": "きっさてん",
                    "en": "cafe",
                    "meanings": [
                        "café"
                    ],
                    "example": {
                        "jp": "昔は学校の近くに喫茶店があった。",
                        "en": "There used to be a coffee shop near the school.",
                        "furigana": "<ruby>昔<rp>(</rp><rt>むかし</rt><rp>)</rp></ruby>は<ruby>学校<rp>(</rp><rt>がっこう</rt><rp>)</rp></ruby>の<ruby>近<rp>(</rp><rt>ちか</rt><rp>)</rp></ruby>くに<ruby>喫茶店<rp>(</rp><rt>きっさてん</rt><rp>)</rp></ruby>があった。",
                        "enMn": "Урьд нь сургуулийн ойролцоо кофе шоп байсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "кафе"
                },
                {
                    "jp": "牛乳",
                    "reading": "ぎゅうにゅう",
                    "en": "milk",
                    "meanings": [
                        "milk"
                    ],
                    "example": {
                        "jp": "彼女は毎朝牛乳を一ビン飲みます。",
                        "en": "She has a bottle of milk every morning.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>毎朝<rp>(</rp><rt>まいあさ</rt><rp>)</rp></ruby><ruby>牛乳<rp>(</rp><rt>ぎゅうにゅう</rt><rp>)</rp></ruby>を<ruby>一<rp>(</rp><rt>いち</rt><rp>)</rp></ruby>ビン<ruby>飲<rp>(</rp><rt>の</rt><rp>)</rp></ruby>みます。",
                        "enMn": "Тэр өглөө бүр нэг лонх сүү уудаг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сүү"
                },
                {
                    "jp": "クラス",
                    "reading": "クラス",
                    "en": "class",
                    "meanings": [
                        "a class"
                    ],
                    "example": {
                        "jp": "３０年ぶりにクラス会があった。",
                        "en": "There was a class reunion after 30 years.",
                        "furigana": "３０<ruby>年<rp>(</rp><rt>ねん</rt><rp>)</rp></ruby>ぶりにクラス<ruby>会<rp>(</rp><rt>かい</rt><rp>)</rp></ruby>があった。",
                        "enMn": "30 жилийн дараа ангийн уулзалт болов."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "анги"
                }
            ]
        ]
    },
    {
        "level": 8,
        "jlpt": "N5",
        "title": "N5 · Level 8",
        "sets": [
            [
                {
                    "jp": "忙しい",
                    "reading": "いそがしい",
                    "en": "busy",
                    "meanings": [
                        "busy (people, days)"
                    ],
                    "example": {
                        "jp": "万一彼が忙しいのなら、手伝いなさい。",
                        "en": "If he should be busy, help him.",
                        "furigana": "<ruby>万一<rp>(</rp><rt>まんいち</rt><rp>)</rp></ruby><ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>が<ruby>忙<rp>(</rp><rt>いそが</rt><rp>)</rp></ruby>しいのなら、<ruby>手伝<rp>(</rp><rt>てつだ</rt><rp>)</rp></ruby>いなさい。",
                        "enMn": "Хэрэв тэр завгүй бол түүнд туслаарай."
                    },
                    "phonetic": "亡",
                    "phoneticReading": "ボウ、モウ",
                    "enMn": "завгүй"
                },
                {
                    "jp": "忘れる",
                    "reading": "わすれる",
                    "en": "to forget",
                    "meanings": [
                        "to forget"
                    ],
                    "example": {
                        "jp": "来週、忘れずに父に会って下さい。",
                        "en": "Please remember to see my father next week.",
                        "furigana": "<ruby>来週<rp>(</rp><rt>らいしゅう</rt><rp>)</rp></ruby>、<ruby>忘<rp>(</rp><rt>わす</rt><rp>)</rp></ruby>れずに<ruby>父<rp>(</rp><rt>ちち</rt><rp>)</rp></ruby>に<ruby>会<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>って<ruby>下<rp>(</rp><rt>くだ</rt><rp>)</rp></ruby>さい。",
                        "enMn": "Ирэх долоо хоногт аавтай минь уулзахаа бүү мартаарай."
                    },
                    "phonetic": "亡",
                    "phoneticReading": "ボウ、モウ",
                    "enMn": "мартах"
                },
                {
                    "jp": "牛肉",
                    "reading": "ぎゅうにく",
                    "en": "beef",
                    "meanings": [
                        "beef"
                    ],
                    "example": {
                        "jp": "私は牛肉より羊肉の方が好きだ。",
                        "en": "I prefer mutton to beef.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>牛肉<rp>(</rp><rt>ぎゅうにく</rt><rp>)</rp></ruby>より<ruby>羊<rp>(</rp><rt>ひつじ</rt><rp>)</rp></ruby><ruby>肉<rp>(</rp><rt>にく</rt><rp>)</rp></ruby>の<ruby>方<rp>(</rp><rt>ほう</rt><rp>)</rp></ruby>が<ruby>好<rp>(</rp><rt>す</rt><rp>)</rp></ruby>きだ。",
                        "enMn": "Би үхрийн махаас хонины махад илүү дуртай."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "үхрийн мах"
                },
                {
                    "jp": "銀行",
                    "reading": "ぎんこう",
                    "en": "bank",
                    "meanings": [
                        "bank"
                    ],
                    "example": {
                        "jp": "彼女は銀行からお金を引き出した。",
                        "en": "She drew out the money from the bank.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>銀行<rp>(</rp><rt>ぎんこう</rt><rp>)</rp></ruby>からお<ruby>金<rp>(</rp><rt>かね</rt><rp>)</rp></ruby>を<ruby>引<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>き<ruby>出<rp>(</rp><rt>だ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр банкнаас мөнгөө авав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "банк"
                },
                {
                    "jp": "汚い",
                    "reading": "きたない",
                    "en": "dirty",
                    "meanings": [
                        "dirty",
                        "unclean",
                        "filthy"
                    ],
                    "example": {
                        "jp": "地下室は汚くて、暗くて、臭いの。",
                        "en": "The cellar is ugly, dark, and stinky.",
                        "furigana": "<ruby>地下<rp>(</rp><rt>ちか</rt><rp>)</rp></ruby><ruby>室<rp>(</rp><rt>しつ</rt><rp>)</rp></ruby>は<ruby>汚<rp>(</rp><rt>きたな</rt><rp>)</rp></ruby>くて、<ruby>暗<rp>(</rp><rt>くら</rt><rp>)</rp></ruby>くて、<ruby>臭<rp>(</rp><rt>くさ</rt><rp>)</rp></ruby>いの。",
                        "enMn": "Зоорь муухай, харанхуй, муу үнэртэй."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бохир"
                },
                {
                    "jp": "暗い",
                    "reading": "くらい",
                    "en": "dark",
                    "meanings": [
                        "dark",
                        "gloomy"
                    ],
                    "example": {
                        "jp": "彼女は暗くなってから家に帰った。",
                        "en": "She came home after dark.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>暗<rp>(</rp><rt>くら</rt><rp>)</rp></ruby>くなってから<ruby>家<rp>(</rp><rt>いえ</rt><rp>)</rp></ruby>に<ruby>帰<rp>(</rp><rt>かえ</rt><rp>)</rp></ruby>った。",
                        "enMn": "Тэр харанхуй болсны дараа гэртээ ирэв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "харанхуй"
                },
                {
                    "jp": "去年",
                    "reading": "きょねん",
                    "en": "last year",
                    "meanings": [
                        "last year"
                    ],
                    "example": {
                        "jp": "彼らの結婚生活は去年破たんした。",
                        "en": "Their marriage broke up last year.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らの<ruby>結婚<rp>(</rp><rt>けっこん</rt><rp>)</rp></ruby><ruby>生活<rp>(</rp><rt>せいかつ</rt><rp>)</rp></ruby>は<ruby>去年<rp>(</rp><rt>きょねん</rt><rp>)</rp></ruby><ruby>破<rp>(</rp><rt>は</rt><rp>)</rp></ruby>たんした。",
                        "enMn": "Тэдний гэрлэлт өнгөрсөн жил цуцлагдсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "өнгөрсөн жил"
                },
                {
                    "jp": "国",
                    "reading": "くに",
                    "en": "country",
                    "meanings": [
                        "country",
                        "place of origin"
                    ],
                    "example": {
                        "jp": "イタリアはとても美しい国です。",
                        "en": "Italy is a very beautiful country.",
                        "furigana": "イタリアはとても<ruby>美<rp>(</rp><rt>うつく</rt><rp>)</rp></ruby>しい<ruby>国<rp>(</rp><rt>くに</rt><rp>)</rp></ruby>です。",
                        "enMn": "Итали бол маш үзэсгэлэнтэй улс юм."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "улс"
                },
                {
                    "jp": "薬",
                    "reading": "くすり",
                    "en": "medicine",
                    "meanings": [
                        "medicine"
                    ],
                    "example": {
                        "jp": "お嬢様、薬を飲まないでください。",
                        "en": "Princess, don't drink the potion.",
                        "furigana": "お<ruby>嬢様<rp>(</rp><rt>じょうさま</rt><rp>)</rp></ruby>、<ruby>薬<rp>(</rp><rt>くすり</rt><rp>)</rp></ruby>を<ruby>飲<rp>(</rp><rt>の</rt><rp>)</rp></ruby>まないでください。",
                        "enMn": "Гүнж ээ, тэр шингэнийг бүү уу."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "эм"
                },
                {
                    "jp": "教室",
                    "reading": "きょうしつ",
                    "en": "classroom",
                    "meanings": [
                        "classroom"
                    ],
                    "example": {
                        "jp": "彼女は教室の前の方に立っていた。",
                        "en": "She was standing in the front of the classroom.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>教室<rp>(</rp><rt>きょうしつ</rt><rp>)</rp></ruby>の<ruby>前<rp>(</rp><rt>まえ</rt><rp>)</rp></ruby>の<ruby>方<rp>(</rp><rt>ほう</rt><rp>)</rp></ruby>に<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>っていた。",
                        "enMn": "Тэр ангийн урд талд зогсож байв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ангийн өрөө"
                }
            ]
        ]
    },
    {
        "level": 9,
        "jlpt": "N5",
        "title": "N5 · Level 9",
        "sets": [
            [
                {
                    "jp": "家",
                    "reading": "いえ",
                    "en": "house",
                    "meanings": [
                        "house",
                        "home"
                    ],
                    "example": {
                        "jp": "この土地とこの家は私の物ですよ。",
                        "en": "This house and this land are mine.",
                        "furigana": "この<ruby>土地<rp>(</rp><rt>とち</rt><rp>)</rp></ruby>とこの<ruby>家<rp>(</rp><rt>いえ</rt><rp>)</rp></ruby>は<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>の<ruby>物<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>ですよ。",
                        "enMn": "Энэ газар, энэ байшин минийх юм."
                    },
                    "phonetic": "家",
                    "phoneticReading": "カ",
                    "enMn": "байшин"
                },
                {
                    "jp": "家族",
                    "reading": "かぞく",
                    "en": "family",
                    "meanings": [
                        "family",
                        "members of a family"
                    ],
                    "example": {
                        "jp": "来週になると一家族が入ってくる。",
                        "en": "Next week a family will move in.",
                        "furigana": "<ruby>来週<rp>(</rp><rt>らいしゅう</rt><rp>)</rp></ruby>になると<ruby>一<rp>(</rp><rt>いち</rt><rp>)</rp></ruby><ruby>家族<rp>(</rp><rt>かぞく</rt><rp>)</rp></ruby>が<ruby>入<rp>(</rp><rt>はい</rt><rp>)</rp></ruby>ってくる。",
                        "enMn": "Ирэх долоо хоногт нэг гэр бүл нүүж ирнэ."
                    },
                    "phonetic": "家",
                    "phoneticReading": "カ",
                    "enMn": "гэр бүл"
                },
                {
                    "jp": "交差点",
                    "reading": "こうさてん",
                    "en": "intersection",
                    "meanings": [
                        "intersection"
                    ],
                    "example": {
                        "jp": "その事故はあの交差点で起こった。",
                        "en": "The accident happened at that crossing.",
                        "furigana": "その<ruby>事故<rp>(</rp><rt>じこ</rt><rp>)</rp></ruby>はあの<ruby>交差点<rp>(</rp><rt>こうさてん</rt><rp>)</rp></ruby>で<ruby>起<rp>(</rp><rt>お</rt><rp>)</rp></ruby>こった。",
                        "enMn": "Осол тэр уулзвар дээр болсон."
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ",
                    "enMn": "уулзвар"
                },
                {
                    "jp": "交番",
                    "reading": "こうばん",
                    "en": "police box",
                    "meanings": [
                        "police box"
                    ],
                    "example": {
                        "jp": "交番はどこにあるかわかりますか。",
                        "en": "Do you know where the police station is?",
                        "furigana": "<ruby>交番<rp>(</rp><rt>こうばん</rt><rp>)</rp></ruby>はどこにあるかわかりますか。",
                        "enMn": "Цагдаагийн газар хаана байдгийг мэдэх үү?"
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ",
                    "enMn": "цагдаагийн харуул"
                },
                {
                    "jp": "車",
                    "reading": "くるま",
                    "en": "car",
                    "meanings": [
                        "car",
                        "vehicle"
                    ],
                    "example": {
                        "jp": "「車」は「自動車」の同意語です。",
                        "en": "\"Car\" is a synonym of \"automobile\".",
                        "furigana": "「<ruby>車<rp>(</rp><rt>くるま</rt><rp>)</rp></ruby>」は「<ruby>自動車<rp>(</rp><rt>じどうしゃ</rt><rp>)</rp></ruby>」の<ruby>同意<rp>(</rp><rt>どうい</rt><rp>)</rp></ruby><ruby>語<rp>(</rp><rt>ご</rt><rp>)</rp></ruby>です。",
                        "enMn": "\"Car\" бол \"automobile\"-ийн ижил утгатай үг юм."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "машин"
                },
                {
                    "jp": "困る",
                    "reading": "こまる",
                    "en": "to be bothered",
                    "meanings": [
                        "to be bothered",
                        "to have difficulty"
                    ],
                    "example": {
                        "jp": "労使紛争はいまだに困った問題だ。",
                        "en": "Industrial disputes are still a problem.",
                        "furigana": "<ruby>労使<rp>(</rp><rt>ろうし</rt><rp>)</rp></ruby><ruby>紛争<rp>(</rp><rt>ふんそう</rt><rp>)</rp></ruby>はいまだに<ruby>困<rp>(</rp><rt>こま</rt><rp>)</rp></ruby>った<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Ажил хэргийн маргаан өнөөг хүртэл асуудал хэвээр байна."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "зовох"
                },
                {
                    "jp": "午後",
                    "reading": "ごご",
                    "en": "afternoon",
                    "meanings": [
                        "afternoon",
                        "P.M."
                    ],
                    "example": {
                        "jp": "明日の午後、テニスをしませんか。",
                        "en": "Won't you play tennis tomorrow afternoon?",
                        "furigana": "<ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby>の<ruby>午後<rp>(</rp><rt>ごご</rt><rp>)</rp></ruby>、テニスをしませんか。",
                        "enMn": "Маргааш өдөр тэннис тоглох уу?"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "өдийн хойно"
                },
                {
                    "jp": "言葉",
                    "reading": "ことば",
                    "en": "language",
                    "meanings": [
                        "language",
                        "word(s)",
                        "expression(s)"
                    ],
                    "example": {
                        "jp": "ヘレンの言葉で私は急に力づいた。",
                        "en": "Helen's words suddenly filled me with new energy.",
                        "furigana": "ヘレンの<ruby>言葉<rp>(</rp><rt>ことば</rt><rp>)</rp></ruby>で<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>急<rp>(</rp><rt>きゅう</rt><rp>)</rp></ruby>に<ruby>力<rp>(</rp><rt>ちから</rt><rp>)</rp></ruby>づいた。",
                        "enMn": "Хэлений үг намайг гэнэт шинэ хүчээр дүүргэв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хэл"
                },
                {
                    "jp": "魚",
                    "reading": "さかな",
                    "en": "fish",
                    "meanings": [
                        "fish"
                    ],
                    "example": {
                        "jp": "彼女はその魚の料理方法を尋ねた。",
                        "en": "She asked how to cook the fish.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はその<ruby>魚<rp>(</rp><rt>さかな</rt><rp>)</rp></ruby>の<ruby>料理<rp>(</rp><rt>りょうり</rt><rp>)</rp></ruby><ruby>方法<rp>(</rp><rt>ほうほう</rt><rp>)</rp></ruby>を<ruby>尋<rp>(</rp><rt>たず</rt><rp>)</rp></ruby>ねた。",
                        "enMn": "Тэр загасыг хэрхэн болгохыг асуув."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "загас"
                },
                {
                    "jp": "御飯",
                    "reading": "ごはん",
                    "en": "rice (cooked)",
                    "meanings": [
                        "rice (cooked)",
                        "meal"
                    ],
                    "example": {
                        "jp": "晩御飯までまだ時間がありますね。",
                        "en": "There's still hours till dinner.",
                        "furigana": "<ruby>晩<rp>(</rp><rt>ばん</rt><rp>)</rp></ruby><ruby>御飯<rp>(</rp><rt>ごはん</rt><rp>)</rp></ruby>までまだ<ruby>時間<rp>(</rp><rt>じかん</rt><rp>)</rp></ruby>がありますね。",
                        "enMn": "Оройн хоол хүртэл хэдэн цаг байна."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "будаа"
                }
            ]
        ]
    },
    {
        "level": 10,
        "jlpt": "N5",
        "title": "N5 · Level 10",
        "sets": [
            [
                {
                    "jp": "歌う",
                    "reading": "うたう",
                    "en": "to sing",
                    "meanings": [
                        "to sing"
                    ],
                    "example": {
                        "jp": "彼は小節を利かして歌っています。",
                        "en": "He is singing with a lot of ornamentation.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>小節<rp>(</rp><rt>しょうせつ</rt><rp>)</rp></ruby>を<ruby>利<rp>(</rp><rt>き</rt><rp>)</rp></ruby>かして<ruby>歌<rp>(</rp><rt>うた</rt><rp>)</rp></ruby>っています。",
                        "enMn": "Тэр их чимэглэлтэйгээр дуулж байна."
                    },
                    "phonetic": "可",
                    "phoneticReading": "カ",
                    "enMn": "дуулах"
                },
                {
                    "jp": "可愛い",
                    "reading": "かわいい",
                    "en": "cute",
                    "meanings": [
                        "cute",
                        "adorable"
                    ],
                    "example": {
                        "jp": "女の子は可愛い人形を持っている。",
                        "en": "That girl has a lovely doll.",
                        "furigana": "<ruby>女<rp>(</rp><rt>おんな</rt><rp>)</rp></ruby>の<ruby>子<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>は<ruby>可愛<rp>(</rp><rt>かわい</rt><rp>)</rp></ruby>い<ruby>人形<rp>(</rp><rt>にんぎょう</rt><rp>)</rp></ruby>を<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>っている。",
                        "enMn": "Тэр охин хөөрхөн хүүхэлдэйтэй."
                    },
                    "phonetic": "可",
                    "phoneticReading": "カ",
                    "enMn": "хөөрхөн"
                },
                {
                    "jp": "答える",
                    "reading": "こたえる",
                    "en": "to answer",
                    "meanings": [
                        "to answer",
                        "to reply"
                    ],
                    "example": {
                        "jp": "彼女は涙を流しながら答えました。",
                        "en": "She answered with tears.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>涙<rp>(</rp><rt>なみだ</rt><rp>)</rp></ruby>を<ruby>流<rp>(</rp><rt>なが</rt><rp>)</rp></ruby>しながら<ruby>答<rp>(</rp><rt>こた</rt><rp>)</rp></ruby>えました。",
                        "enMn": "Тэр нулимс дуслуулан хариулав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хариулах"
                },
                {
                    "jp": "来る",
                    "reading": "くる",
                    "en": "to come",
                    "meanings": [
                        "to come"
                    ],
                    "example": {
                        "jp": "あなたが戻って来てくれて嬉しいです。",
                        "en": "I'm glad to see you back.",
                        "furigana": "あなたが<ruby>戻<rp>(</rp><rt>もど</rt><rp>)</rp></ruby>って<ruby>来<rp>(</rp><rt>き</rt><rp>)</rp></ruby>てくれて<ruby>嬉<rp>(</rp><rt>うれ</rt><rp>)</rp></ruby>しいです。",
                        "enMn": "Чиний буцаж ирснийг харахад баяртай байна."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ирэх"
                },
                {
                    "jp": "声",
                    "reading": "こえ",
                    "en": "voice",
                    "meanings": [
                        "voice"
                    ],
                    "example": {
                        "jp": "隣の部屋に彼女の声を聞いて驚いた。",
                        "en": "I was surprised to hear her voice in the next room.",
                        "furigana": "<ruby>隣<rp>(</rp><rt>となり</rt><rp>)</rp></ruby>の<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>に<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>の<ruby>声<rp>(</rp><rt>こえ</rt><rp>)</rp></ruby>を<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>いて<ruby>驚<rp>(</rp><rt>おどろ</rt><rp>)</rp></ruby>いた。",
                        "enMn": "Хажуу өрөөнөөс түүний дуу хоолойг сонсоод гайхсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дуу хоолой"
                },
                {
                    "jp": "公園",
                    "reading": "こうえん",
                    "en": "park",
                    "meanings": [
                        "a park"
                    ],
                    "example": {
                        "jp": "由美はテニスをしに公園へ行きます。",
                        "en": "Yumi goes to the park to play tennis.",
                        "furigana": "<ruby>由美<rp>(</rp><rt>ゆみ</rt><rp>)</rp></ruby>はテニスをしに<ruby>公園<rp>(</rp><rt>こうえん</rt><rp>)</rp></ruby>へ<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>きます。",
                        "enMn": "Юми тэннис тоглохоор цэцэрлэгт хүрээлэн рүү явдаг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "цэцэрлэгт хүрээлэн"
                },
                {
                    "jp": "黒",
                    "reading": "くろ",
                    "en": "black",
                    "meanings": [
                        "black"
                    ],
                    "example": {
                        "jp": "彼女は黒ずくめの服装をしていた。",
                        "en": "She was dressed all in black.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>黒<rp>(</rp><rt>くろ</rt><rp>)</rp></ruby>ずくめの<ruby>服装<rp>(</rp><rt>ふくそう</rt><rp>)</rp></ruby>をしていた。",
                        "enMn": "Тэр бүхэлдээ хар хувцастай байв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хар"
                },
                {
                    "jp": "コーヒー",
                    "reading": "コーヒー",
                    "en": "coffee",
                    "meanings": [
                        "coffee"
                    ],
                    "example": {
                        "jp": "彼女は根っからのコーヒー党です。",
                        "en": "She's die-hard coffee drinker.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>根<rp>(</rp><rt>ね</rt><rp>)</rp></ruby>っからのコーヒー<ruby>党<rp>(</rp><rt>とう</rt><rp>)</rp></ruby>です。",
                        "enMn": "Тэр жинхэнэ кофены дуртан юм."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "кофе"
                },
                {
                    "jp": "子供",
                    "reading": "こども",
                    "en": "child",
                    "meanings": [
                        "child(ren)"
                    ],
                    "example": {
                        "jp": "年明けに子供が産まれる予定です♪",
                        "en": "I'm expecting a baby in the new year!",
                        "furigana": "<ruby>年明<rp>(</rp><rt>としあ</rt><rp>)</rp></ruby>けに<ruby>子供<rp>(</rp><rt>こども</rt><rp>)</rp></ruby>が<ruby>産<rp>(</rp><rt>う</rt><rp>)</rp></ruby>まれる<ruby>予定<rp>(</rp><rt>よてい</rt><rp>)</rp></ruby>です♪",
                        "enMn": "Би шинэ жилээр хүүхэдтэй болно гэж хүлээж байна!"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүүхэд"
                },
                {
                    "jp": "咲く",
                    "reading": "さく",
                    "en": "to bloom",
                    "meanings": [
                        "to bloom"
                    ],
                    "example": {
                        "jp": "春にはたくさんの美しい花が咲く。",
                        "en": "Many beautiful flowers bloom in spring.",
                        "furigana": "<ruby>春<rp>(</rp><rt>はる</rt><rp>)</rp></ruby>にはたくさんの<ruby>美<rp>(</rp><rt>うつく</rt><rp>)</rp></ruby>しい<ruby>花<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>が<ruby>咲<rp>(</rp><rt>さ</rt><rp>)</rp></ruby>く。",
                        "enMn": "Хавар олон үзэсгэлэнтэй цэцэг цэцэглэдэг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "цэцэглэх"
                }
            ]
        ]
    },
    {
        "level": 11,
        "jlpt": "N4",
        "title": "N4 · Level 1",
        "sets": [
            [
                {
                    "jp": "生きる",
                    "reading": "いきる",
                    "en": "to live",
                    "meanings": [
                        "to live"
                    ],
                    "example": {
                        "jp": "僕は彼女無しに生きる術を学んだ。",
                        "en": "I learned to live without her.",
                        "furigana": "<ruby>僕<rp>(</rp><rt>ぼく</rt><rp>)</rp></ruby>は<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby><ruby>無<rp>(</rp><rt>な</rt><rp>)</rp></ruby>しに<ruby>生<rp>(</rp><rt>い</rt><rp>)</rp></ruby>きる<ruby>術<rp>(</rp><rt>じゅつ</rt><rp>)</rp></ruby>を<ruby>学<rp>(</rp><rt>まな</rt><rp>)</rp></ruby>んだ。",
                        "enMn": "Би түүнгүйгээр амьдрахыг сурсан."
                    },
                    "phonetic": "生",
                    "phoneticReading": "セイ、ショウ",
                    "enMn": "амьдрах"
                },
                {
                    "jp": "星",
                    "reading": "ほし",
                    "en": "star",
                    "meanings": [
                        "star"
                    ],
                    "example": {
                        "jp": "夜空に星がきらきら輝いていた。",
                        "en": "Stars were twinkling in the sky.",
                        "furigana": "<ruby>夜空<rp>(</rp><rt>よぞら</rt><rp>)</rp></ruby>に<ruby>星<rp>(</rp><rt>ほし</rt><rp>)</rp></ruby>がきらきら<ruby>輝<rp>(</rp><rt>かがや</rt><rp>)</rp></ruby>いていた。",
                        "enMn": "Тэнгэрт одод анивчиж байв."
                    },
                    "phonetic": "生",
                    "phoneticReading": "セイ、ショウ",
                    "enMn": "од"
                },
                {
                    "jp": "通る",
                    "reading": "とおる",
                    "en": "to pass by",
                    "meanings": [
                        "to pass (by)",
                        "to go through"
                    ],
                    "example": {
                        "jp": "夕べ１０時頃君の家のそばを通ったよ。",
                        "en": "I passed by your house about 10 last night.",
                        "furigana": "<ruby>夕<rp>(</rp><rt>ゆう</rt><rp>)</rp></ruby>べ１０<ruby>時<rp>(</rp><rt>じ</rt><rp>)</rp></ruby><ruby>頃<rp>(</rp><rt>ごろ</rt><rp>)</rp></ruby><ruby>君<rp>(</rp><rt>くん</rt><rp>)</rp></ruby>の<ruby>家<rp>(</rp><rt>いえ</rt><rp>)</rp></ruby>のそばを<ruby>通<rp>(</rp><rt>とお</rt><rp>)</rp></ruby>ったよ。",
                        "enMn": "Би өчигдөр орой 10 цагийн орчимд чиний гэрийн хажуугаар өнгөрсөн."
                    },
                    "phonetic": "甬",
                    "phoneticReading": "ツウ",
                    "enMn": "өнгөрөх"
                },
                {
                    "jp": "通う",
                    "reading": "かよう",
                    "en": "to go back and forth",
                    "meanings": [
                        "to go back and forth",
                        "to commute"
                    ],
                    "example": {
                        "jp": "理恵と私は同じ学校に通いました。",
                        "en": "Rie and I went to the same school.",
                        "furigana": "<ruby>理恵<rp>(</rp><rt>りえ</rt><rp>)</rp></ruby>と<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>同<rp>(</rp><rt>おな</rt><rp>)</rp></ruby>じ<ruby>学校<rp>(</rp><rt>がっこう</rt><rp>)</rp></ruby>に<ruby>通<rp>(</rp><rt>かよ</rt><rp>)</rp></ruby>いました。",
                        "enMn": "Риэ бид хоёр ижил сургуульд сурдаг байсан."
                    },
                    "phonetic": "甬",
                    "phoneticReading": "ツウ",
                    "enMn": "давтан явж ирэх"
                },
                {
                    "jp": "課長",
                    "reading": "かちょう",
                    "en": "section manager",
                    "meanings": [
                        "section manager"
                    ],
                    "example": {
                        "jp": "彼は課長に書類を点検させられた。",
                        "en": "He was made to check his papers by the chief.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>課長<rp>(</rp><rt>かちょう</rt><rp>)</rp></ruby>に<ruby>書類<rp>(</rp><rt>しょるい</rt><rp>)</rp></ruby>を<ruby>点検<rp>(</rp><rt>てんけん</rt><rp>)</rp></ruby>させられた。",
                        "enMn": "Дарга түүгээр бичиг баримтаа шалгуулав."
                    },
                    "phonetic": "果",
                    "phoneticReading": "カ",
                    "enMn": "тасгийн дарга"
                },
                {
                    "jp": "比べる",
                    "reading": "くらべる",
                    "en": "to compare",
                    "meanings": [
                        "to compare"
                    ],
                    "example": {
                        "jp": "彼女は一般と比べてはいい先生だ。",
                        "en": "She is a good teacher, as teachers go.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>一般<rp>(</rp><rt>いっぱん</rt><rp>)</rp></ruby>と<ruby>比<rp>(</rp><rt>くら</rt><rp>)</rp></ruby>べてはいい<ruby>先生<rp>(</rp><rt>せんせい</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Тэр багш нарын дунджаас илүү сайн багш юм."
                    },
                    "phonetic": "比",
                    "phoneticReading": "ヒ",
                    "enMn": "харьцуулах"
                },
                {
                    "jp": "台風",
                    "reading": "たいふう",
                    "en": "typhoon",
                    "meanings": [
                        "typhoon"
                    ],
                    "example": {
                        "jp": "毎年、日本には台風が上陸します。",
                        "en": "Typhoons strike Japan every year.",
                        "furigana": "<ruby>毎年<rp>(</rp><rt>まいとし</rt><rp>)</rp></ruby>、<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>には<ruby>台風<rp>(</rp><rt>たいふう</rt><rp>)</rp></ruby>が<ruby>上陸<rp>(</rp><rt>じょうりく</rt><rp>)</rp></ruby>します。",
                        "enMn": "Тайфун жил бүр Японд тохиолддог."
                    },
                    "phonetic": "台",
                    "phoneticReading": "タイ",
                    "enMn": "тайфун"
                },
                {
                    "jp": "揺れる",
                    "reading": "ゆれる",
                    "en": "to shake",
                    "meanings": [
                        "to shake",
                        "to sway"
                    ],
                    "example": {
                        "jp": "道が悪くてバスがガタガタ揺れた。",
                        "en": "The bus jolted over the rough road.",
                        "furigana": "<ruby>道<rp>(</rp><rt>みち</rt><rp>)</rp></ruby>が<ruby>悪<rp>(</rp><rt>わる</rt><rp>)</rp></ruby>くてバスがガタガタ<ruby>揺<rp>(</rp><rt>ゆ</rt><rp>)</rp></ruby>れた。",
                        "enMn": "Автобус муу замаар доргилон явав."
                    },
                    "phonetic": "䍃",
                    "phoneticReading": "ヨウ",
                    "enMn": "чичрэх"
                },
                {
                    "jp": "贈り物",
                    "reading": "おくりもの",
                    "en": "gift",
                    "meanings": [
                        "a gift",
                        "a present"
                    ],
                    "example": {
                        "jp": "彼は彼女から贈り物を受け取った。",
                        "en": "He accepted her gift.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>から<ruby>贈<rp>(</rp><rt>おく</rt><rp>)</rp></ruby>り<ruby>物<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>を<ruby>受<rp>(</rp><rt>う</rt><rp>)</rp></ruby>け<ruby>取<rp>(</rp><rt>と</rt><rp>)</rp></ruby>った。",
                        "enMn": "Тэр түүний бэлгийг хүлээж авав."
                    },
                    "phonetic": "曽",
                    "phoneticReading": "ソウ、ゾウ",
                    "enMn": "бэлэг"
                },
                {
                    "jp": "浅い",
                    "reading": "あさい",
                    "en": "shallow",
                    "meanings": [
                        "shallow",
                        "superficial"
                    ],
                    "example": {
                        "jp": "彼はその仕事にはまだ経験が浅い。",
                        "en": "He is still green at the job.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>はその<ruby>仕事<rp>(</rp><rt>しごと</rt><rp>)</rp></ruby>にはまだ<ruby>経験<rp>(</rp><rt>けいけん</rt><rp>)</rp></ruby>が<ruby>浅<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby>い。",
                        "enMn": "Тэр энэ ажилдаа туршлага бага хэвээр байна."
                    },
                    "phonetic": "㦮",
                    "phoneticReading": "セン",
                    "enMn": "гүехэн"
                }
            ]
        ]
    },
    {
        "level": 12,
        "jlpt": "N4",
        "title": "N4 · Level 2",
        "sets": [
            [
                {
                    "jp": "気",
                    "reading": "き",
                    "en": "spirit",
                    "meanings": [
                        "spirit",
                        "mood"
                    ],
                    "example": {
                        "jp": "私は気が短いし、口も軽い男だ。",
                        "en": "I'm short-tempered, and a loose-tongued man.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>気<rp>(</rp><rt>き</rt><rp>)</rp></ruby>が<ruby>短<rp>(</rp><rt>みじか</rt><rp>)</rp></ruby>いし、<ruby>口<rp>(</rp><rt>くち</rt><rp>)</rp></ruby>も<ruby>軽<rp>(</rp><rt>かる</rt><rp>)</rp></ruby>い<ruby>男<rp>(</rp><rt>おとこ</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Би уур бухимдалтай, амаа барьдаггүй хүн юм."
                    },
                    "phonetic": "气",
                    "phoneticReading": "キ",
                    "enMn": "сэтгэл"
                },
                {
                    "jp": "気分",
                    "reading": "きぶん",
                    "en": "feeling",
                    "meanings": [
                        "feeling",
                        "mood"
                    ],
                    "example": {
                        "jp": "「気分はどうですか」と彼は尋ねた。",
                        "en": "\"How do you feel?\" he inquired.",
                        "furigana": "「<ruby>気分<rp>(</rp><rt>きぶん</rt><rp>)</rp></ruby>はどうですか」と<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>尋<rp>(</rp><rt>たず</rt><rp>)</rp></ruby>ねた。",
                        "enMn": "\"Чи ямар байгаа вэ?\" гэж тэр асуув."
                    },
                    "phonetic": "气",
                    "phoneticReading": "キ",
                    "enMn": "сэтгэл санаа"
                },
                {
                    "jp": "時代",
                    "reading": "じだい",
                    "en": "era",
                    "meanings": [
                        "age",
                        "period",
                        "epoch",
                        "era"
                    ],
                    "example": {
                        "jp": "漱石は鴎外と同時代の人であった。",
                        "en": "Soseki was a contemporary of Ohgai.",
                        "furigana": "<ruby>漱石<rp>(</rp><rt>そうせき</rt><rp>)</rp></ruby>は<ruby>鴎外<rp>(</rp><rt>おうがい</rt><rp>)</rp></ruby>と<ruby>同<rp>(</rp><rt>どう</rt><rp>)</rp></ruby><ruby>時代<rp>(</rp><rt>じだい</rt><rp>)</rp></ruby>の<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>であった。",
                        "enMn": "Сосэки бол Огайтай нэг үеийн хүн байсан."
                    },
                    "phonetic": "寺",
                    "phoneticReading": "ジ",
                    "enMn": "эрин үе"
                },
                {
                    "jp": "規則",
                    "reading": "きそく",
                    "en": "rule",
                    "meanings": [
                        "rule",
                        "regulation"
                    ],
                    "example": {
                        "jp": "寮の規則は守らなければならない。",
                        "en": "You must observe the rules of the dormitory.",
                        "furigana": "<ruby>寮<rp>(</rp><rt>りょう</rt><rp>)</rp></ruby>の<ruby>規則<rp>(</rp><rt>きそく</rt><rp>)</rp></ruby>は<ruby>守<rp>(</rp><rt>まも</rt><rp>)</rp></ruby>らなければならない。",
                        "enMn": "Дотуур байрны дүрмийг чи дагаж мөрдөх ёстой."
                    },
                    "phonetic": "規",
                    "phoneticReading": "キ",
                    "enMn": "дүрэм"
                },
                {
                    "jp": "表",
                    "reading": "おもて",
                    "en": "surface",
                    "meanings": [
                        "surface",
                        "front",
                        "outside"
                    ],
                    "example": {
                        "jp": "ものにはたいてい表と裏がある。",
                        "en": "With most things there's both what you see and what's behind it.",
                        "furigana": "ものにはたいてい<ruby>表<rp>(</rp><rt>ひょう</rt><rp>)</rp></ruby>と<ruby>裏<rp>(</rp><rt>うら</rt><rp>)</rp></ruby>がある。",
                        "enMn": "Ихэнх зүйлд харагдах тал болон нуугдмал тал хоёулаа байдаг."
                    },
                    "phonetic": "表",
                    "phoneticReading": "ヒョウ",
                    "enMn": "гадаргуу"
                },
                {
                    "jp": "盛ん",
                    "reading": "さかん",
                    "en": "prosperous",
                    "meanings": [
                        "prosperous",
                        "active",
                        "thriving"
                    ],
                    "example": {
                        "jp": "日本はカナダとの貿易が盛んだ。",
                        "en": "Japan does a lot of trade with Canada.",
                        "furigana": "<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>はカナダとの<ruby>貿易<rp>(</rp><rt>ぼうえき</rt><rp>)</rp></ruby>が<ruby>盛<rp>(</rp><rt>さか</rt><rp>)</rp></ruby>んだ。",
                        "enMn": "Япон Канадтай их хэмжээний худалдаа хийдэг."
                    },
                    "phonetic": "成",
                    "phoneticReading": "ジョウ、セイ",
                    "enMn": "цэцэглэн хөгжсөн"
                },
                {
                    "jp": "注意",
                    "reading": "ちゅうい",
                    "en": "caution",
                    "meanings": [
                        "caution",
                        "attention"
                    ],
                    "example": {
                        "jp": "卵を割らないように注意しなさい。",
                        "en": "Take care not to break the eggs.",
                        "furigana": "<ruby>卵<rp>(</rp><rt>たまご</rt><rp>)</rp></ruby>を<ruby>割<rp>(</rp><rt>わ</rt><rp>)</rp></ruby>らないように<ruby>注意<rp>(</rp><rt>ちゅうい</rt><rp>)</rp></ruby>しなさい。",
                        "enMn": "Өндгийг эвдэхгүй байхыг анхаараарай."
                    },
                    "phonetic": "主",
                    "phoneticReading": "チュウ",
                    "enMn": "болгоомжлол"
                },
                {
                    "jp": "過ぎる",
                    "reading": "すぎる",
                    "en": "to exceed",
                    "meanings": [
                        "to exceed",
                        "to go beyond"
                    ],
                    "example": {
                        "jp": "料理がおいしくてつい食べ過ぎた。",
                        "en": "The food was so good that I ate too much.",
                        "furigana": "<ruby>料理<rp>(</rp><rt>りょうり</rt><rp>)</rp></ruby>がおいしくてつい<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べ<ruby>過<rp>(</rp><rt>す</rt><rp>)</rp></ruby>ぎた。",
                        "enMn": "Хоол маш амттай байсан тул би хэтэрхий их идсэн."
                    },
                    "phonetic": "咼",
                    "phoneticReading": "カ",
                    "enMn": "хэтрэх"
                },
                {
                    "jp": "起こす",
                    "reading": "おこす",
                    "en": "to wake someone",
                    "meanings": [
                        "to wake (someone) up"
                    ],
                    "example": {
                        "jp": "明日の朝6時に起こしてください。",
                        "en": "Please wake me up at six tomorrow morning.",
                        "furigana": "<ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby>の<ruby>朝<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby>6<ruby>時<rp>(</rp><rt>じ</rt><rp>)</rp></ruby>に<ruby>起<rp>(</rp><rt>お</rt><rp>)</rp></ruby>こしてください。",
                        "enMn": "Намайг маргааш өглөө зургаан цагт сэрээнэ үү."
                    },
                    "phonetic": "己",
                    "phoneticReading": "キ",
                    "enMn": "сэрээх"
                },
                {
                    "jp": "今度",
                    "reading": "こんど",
                    "en": "this time",
                    "meanings": [
                        "now",
                        "this time",
                        "near future",
                        "one of these days",
                        "next time"
                    ],
                    "example": {
                        "jp": "彼女は今度は自分が罠にはまった。",
                        "en": "She fell into a trap in her turn.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>今度<rp>(</rp><rt>こんど</rt><rp>)</rp></ruby>は<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby>が<ruby>罠<rp>(</rp><rt>わな</rt><rp>)</rp></ruby>にはまった。",
                        "enMn": "Тэр ээлж нь ирэхэд өөрөө урхинд орсон."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン",
                    "enMn": "энэ удаа"
                }
            ]
        ]
    },
    {
        "level": 13,
        "jlpt": "N4",
        "title": "N4 · Level 3",
        "sets": [
            [
                {
                    "jp": "必ず",
                    "reading": "かならず",
                    "en": "surely",
                    "meanings": [
                        "surely",
                        "certainly"
                    ],
                    "example": {
                        "jp": "来週の月曜日に必ずお返しします。",
                        "en": "I'll give it back next Monday without fail.",
                        "furigana": "<ruby>来週<rp>(</rp><rt>らいしゅう</rt><rp>)</rp></ruby>の<ruby>月曜日<rp>(</rp><rt>げつようび</rt><rp>)</rp></ruby>に<ruby>必<rp>(</rp><rt>かなら</rt><rp>)</rp></ruby>ずお<ruby>返<rp>(</rp><rt>かえ</rt><rp>)</rp></ruby>しします。",
                        "enMn": "Би ирэх даваа гарагт заавал буцааж өгнө."
                    },
                    "phonetic": "必",
                    "phoneticReading": "ヒ、ヒツ",
                    "enMn": "заавал"
                },
                {
                    "jp": "必要",
                    "reading": "ひつよう",
                    "en": "necessary",
                    "meanings": [
                        "necessary"
                    ],
                    "example": {
                        "jp": "痩せる必要がないというのは残念だ。",
                        "en": "It's too bad that I don't need to lose weight.",
                        "furigana": "<ruby>痩<rp>(</rp><rt>や</rt><rp>)</rp></ruby>せる<ruby>必要<rp>(</rp><rt>ひつよう</rt><rp>)</rp></ruby>がないというのは<ruby>残念<rp>(</rp><rt>ざんねん</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Надад жин хасах хэрэггүй нь харамсалтай юм."
                    },
                    "phonetic": "必",
                    "phoneticReading": "ヒ、ヒツ",
                    "enMn": "шаардлагатай"
                },
                {
                    "jp": "親",
                    "reading": "おや",
                    "en": "parent",
                    "meanings": [
                        "a parent"
                    ],
                    "example": {
                        "jp": "私も親の面倒とか見られないですね。",
                        "en": "I can't look after my parents and such either.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>も<ruby>親<rp>(</rp><rt>おや</rt><rp>)</rp></ruby>の<ruby>面倒<rp>(</rp><rt>めんどう</rt><rp>)</rp></ruby>とか<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>られないですね。",
                        "enMn": "Би эцэг эхээ ч гэсэн харж чадахгүй байна."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン",
                    "enMn": "эцэг эх"
                },
                {
                    "jp": "親切",
                    "reading": "しんせつ",
                    "en": "kindness",
                    "meanings": [
                        "kindness"
                    ],
                    "example": {
                        "jp": "盲人に手を貸すのは親切な行為だ。",
                        "en": "Helping a blind man is an act of kindness.",
                        "furigana": "<ruby>盲人<rp>(</rp><rt>もうじん</rt><rp>)</rp></ruby>に<ruby>手<rp>(</rp><rt>て</rt><rp>)</rp></ruby>を<ruby>貸<rp>(</rp><rt>か</rt><rp>)</rp></ruby>すのは<ruby>親切<rp>(</rp><rt>しんせつ</rt><rp>)</rp></ruby>な<ruby>行為<rp>(</rp><rt>こうい</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Сохор хүнд туслах нь эелдэг үйлдэл юм."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン",
                    "enMn": "эелдэг зан"
                },
                {
                    "jp": "決まる",
                    "reading": "きまる",
                    "en": "to be decided",
                    "meanings": [
                        "to be set",
                        "fixed (v.i.)"
                    ],
                    "example": {
                        "jp": "明日は予定が決まっていますか。",
                        "en": "Are you booked for tomorrow?",
                        "furigana": "<ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby>は<ruby>予定<rp>(</rp><rt>よてい</rt><rp>)</rp></ruby>が<ruby>決<rp>(</rp><rt>き</rt><rp>)</rp></ruby>まっていますか。",
                        "enMn": "Чи маргаашийн хувьд төлөвлөгөөтэй юу?"
                    },
                    "phonetic": "夬",
                    "phoneticReading": "ケツ",
                    "enMn": "шийдэгдэх"
                },
                {
                    "jp": "捕まえる",
                    "reading": "つかまえる",
                    "en": "to catch",
                    "meanings": [
                        "to catch",
                        "to arrest"
                    ],
                    "example": {
                        "jp": "彼らはわなでキツネを捕まえた。",
                        "en": "They captured foxes with snares.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らはわなでキツネを<ruby>捕<rp>(</rp><rt>つか</rt><rp>)</rp></ruby>まえた。",
                        "enMn": "Тэд урхиар үнэг барьсан."
                    },
                    "phonetic": "甫",
                    "phoneticReading": "ホ",
                    "enMn": "барих"
                },
                {
                    "jp": "無理",
                    "reading": "むり",
                    "en": "unreasonable",
                    "meanings": [
                        "unreasonable",
                        "impossible"
                    ],
                    "example": {
                        "jp": "両親は無理に私をそこへ行かせた。",
                        "en": "My parents made me go there.",
                        "furigana": "<ruby>両親<rp>(</rp><rt>りょうしん</rt><rp>)</rp></ruby>は<ruby>無理<rp>(</rp><rt>むり</rt><rp>)</rp></ruby>に<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>をそこへ<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>かせた。",
                        "enMn": "Эцэг эх минь намайг хүчээр тэнд явуулсан."
                    },
                    "phonetic": "無",
                    "phoneticReading": "ブ",
                    "enMn": "боломжгүй"
                },
                {
                    "jp": "包む",
                    "reading": "つつむ",
                    "en": "to wrap",
                    "meanings": [
                        "to wrap",
                        "to cover"
                    ],
                    "example": {
                        "jp": "美しい包装紙に包んでもらえますか。",
                        "en": "Could you gift wrap it?",
                        "furigana": "<ruby>美<rp>(</rp><rt>うつく</rt><rp>)</rp></ruby>しい<ruby>包装<rp>(</rp><rt>ほうそう</rt><rp>)</rp></ruby><ruby>紙<rp>(</rp><rt>し</rt><rp>)</rp></ruby>に<ruby>包<rp>(</rp><rt>つつ</rt><rp>)</rp></ruby>んでもらえますか。",
                        "enMn": "Үүнийг бэлгийн цаасаар боож өгч болох уу?"
                    },
                    "phonetic": "包",
                    "phoneticReading": "ホウ",
                    "enMn": "боох"
                },
                {
                    "jp": "逃げる",
                    "reading": "にげる",
                    "en": "to escape",
                    "meanings": [
                        "to escape",
                        "to run away"
                    ],
                    "example": {
                        "jp": "のいて・・・奴らは逃げちゃうよ。",
                        "en": "Get out the way ... they'll escape!",
                        "furigana": "のいて・・・<ruby>奴<rp>(</rp><rt>やつ</rt><rp>)</rp></ruby>らは<ruby>逃<rp>(</rp><rt>に</rt><rp>)</rp></ruby>げちゃうよ。",
                        "enMn": "Замаас зайл... тэд зугтчихно!"
                    },
                    "phonetic": "兆",
                    "phoneticReading": "チョウ、トウ",
                    "enMn": "зугтах"
                },
                {
                    "jp": "厳しい",
                    "reading": "きびしい",
                    "en": "strict",
                    "meanings": [
                        "hard",
                        "rigorous",
                        "strict"
                    ],
                    "example": {
                        "jp": "母親の怒りの厳しさにびっくりした。",
                        "en": "We were shocked by the intensity of our mother's anger.",
                        "furigana": "<ruby>母親<rp>(</rp><rt>ははおや</rt><rp>)</rp></ruby>の<ruby>怒<rp>(</rp><rt>いか</rt><rp>)</rp></ruby>りの<ruby>厳<rp>(</rp><rt>きび</rt><rp>)</rp></ruby>しさにびっくりした。",
                        "enMn": "Бид ээжийнхээ уурын хатуу ширүүнд цочирдсон."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хатуу чанга"
                }
            ]
        ]
    },
    {
        "level": 14,
        "jlpt": "N4",
        "title": "N4 · Level 4",
        "sets": [
            [
                {
                    "jp": "郊外",
                    "reading": "こうがい",
                    "en": "suburb",
                    "meanings": [
                        "suburb",
                        "outskirts"
                    ],
                    "example": {
                        "jp": "彼はロンドンの郊外に住んでいる。",
                        "en": "He lives in the suburbs of London.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>はロンドンの<ruby>郊外<rp>(</rp><rt>こうがい</rt><rp>)</rp></ruby>に<ruby>住<rp>(</rp><rt>す</rt><rp>)</rp></ruby>んでいる。",
                        "enMn": "Тэр Лондоны захад амьдардаг."
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ",
                    "enMn": "хот орчмын бүс"
                },
                {
                    "jp": "交通",
                    "reading": "こうつう",
                    "en": "traffic",
                    "meanings": [
                        "traffic",
                        "transportation"
                    ],
                    "example": {
                        "jp": "彼らは交通事故の現場へ急行した。",
                        "en": "They rushed to the scene of the traffic accident.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らは<ruby>交通<rp>(</rp><rt>こうつう</rt><rp>)</rp></ruby><ruby>事故<rp>(</rp><rt>じこ</rt><rp>)</rp></ruby>の<ruby>現場<rp>(</rp><rt>げんば</rt><rp>)</rp></ruby>へ<ruby>急行<rp>(</rp><rt>きゅうこう</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэд замын ослын газар руу яаравчлав."
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ",
                    "enMn": "тээвэр"
                },
                {
                    "jp": "大事",
                    "reading": "だいじ",
                    "en": "important",
                    "meanings": [
                        "important",
                        "valuable",
                        "serious matter"
                    ],
                    "example": {
                        "jp": "このうち大事なのは後者の方です。",
                        "en": "Of these it is the latter one that is important.",
                        "furigana": "このうち<ruby>大事<rp>(</rp><rt>だいじ</rt><rp>)</rp></ruby>なのは<ruby>後者<rp>(</rp><rt>こうしゃ</rt><rp>)</rp></ruby>の<ruby>方<rp>(</rp><rt>ほう</rt><rp>)</rp></ruby>です。",
                        "enMn": "Эдгээрээс сүүлийнх нь чухал юм."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "чухал"
                },
                {
                    "jp": "会議室",
                    "reading": "かいぎしつ",
                    "en": "conference room",
                    "meanings": [
                        "conference room"
                    ],
                    "example": {
                        "jp": "クラブの会員は会議室に集まった。",
                        "en": "The club members assembled in the meeting room.",
                        "furigana": "クラブの<ruby>会員<rp>(</rp><rt>かいいん</rt><rp>)</rp></ruby>は<ruby>会議<rp>(</rp><rt>かいぎ</rt><rp>)</rp></ruby><ruby>室<rp>(</rp><rt>しつ</rt><rp>)</rp></ruby>に<ruby>集<rp>(</rp><rt>あつ</rt><rp>)</rp></ruby>まった。",
                        "enMn": "Клубын гишүүд хурлын өрөөнд цугларав."
                    },
                    "phonetic": "会",
                    "phoneticReading": "カイ、エ",
                    "enMn": "хурлын танхим"
                },
                {
                    "jp": "間違える",
                    "reading": "まちがえる",
                    "en": "to make a mistake",
                    "meanings": [
                        "to make a mistake"
                    ],
                    "example": {
                        "jp": "彼は私を姉と間違えたに違いない。",
                        "en": "I'm sure he mistook me for my sister.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>を<ruby>姉<rp>(</rp><rt>あね</rt><rp>)</rp></ruby>と<ruby>間違<rp>(</rp><rt>まちが</rt><rp>)</rp></ruby>えたに<ruby>違<rp>(</rp><rt>ちが</rt><rp>)</rp></ruby>いない。",
                        "enMn": "Тэр намайг эгчтэй минь андуурсан нь лавтай."
                    },
                    "phonetic": "門",
                    "phoneticReading": "モン、カン",
                    "enMn": "алдаа гаргах"
                },
                {
                    "jp": "寄る",
                    "reading": "よる",
                    "en": "to stop by",
                    "meanings": [
                        "to stop by"
                    ],
                    "example": {
                        "jp": "彼は家に帰る途中パン屋に寄った。",
                        "en": "He called at the baker's on the way home.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>家<rp>(</rp><rt>いえ</rt><rp>)</rp></ruby>に<ruby>帰<rp>(</rp><rt>かえ</rt><rp>)</rp></ruby>る<ruby>途中<rp>(</rp><rt>とちゅう</rt><rp>)</rp></ruby>パン<ruby>屋<rp>(</rp><rt>や</rt><rp>)</rp></ruby>に<ruby>寄<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>った。",
                        "enMn": "Тэр гэртээ харих замдаа талхны дэлгүүрт орсон."
                    },
                    "phonetic": "奇",
                    "phoneticReading": "キ",
                    "enMn": "дайрч орох"
                },
                {
                    "jp": "利用",
                    "reading": "りよう",
                    "en": "use",
                    "meanings": [
                        "use",
                        "utilization"
                    ],
                    "example": {
                        "jp": "余暇をできるだけ利用しなさい。",
                        "en": "Make the best of your time.",
                        "furigana": "<ruby>余暇<rp>(</rp><rt>よか</rt><rp>)</rp></ruby>をできるだけ<ruby>利用<rp>(</rp><rt>りよう</rt><rp>)</rp></ruby>しなさい。",
                        "enMn": "Цагаа сайн ашигла."
                    },
                    "phonetic": "利",
                    "phoneticReading": "リ",
                    "enMn": "ашиглалт"
                },
                {
                    "jp": "丁寧",
                    "reading": "ていねい",
                    "en": "polite",
                    "meanings": [
                        "polite",
                        "courteous",
                        "careful"
                    ],
                    "example": {
                        "jp": "彼に丁寧な返事を書くつもりです。",
                        "en": "I will write him a civil answer.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>に<ruby>丁寧<rp>(</rp><rt>ていねい</rt><rp>)</rp></ruby>な<ruby>返事<rp>(</rp><rt>へんじ</rt><rp>)</rp></ruby>を<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>くつもりです。",
                        "enMn": "Би түүнд эелдэг хариу бичнэ."
                    },
                    "phonetic": "丁",
                    "phoneticReading": "チョウ、テイ",
                    "enMn": "эелдэг"
                },
                {
                    "jp": "申し上げる",
                    "reading": "もうしあげる",
                    "en": "to say (humble)",
                    "meanings": [
                        "(humble)to say",
                        "to tell"
                    ],
                    "example": {
                        "jp": "日頃のご愛顧にお礼申し上げます。",
                        "en": "We really thank you for your patronage.",
                        "furigana": "<ruby>日頃<rp>(</rp><rt>ひごろ</rt><rp>)</rp></ruby>のご<ruby>愛顧<rp>(</rp><rt>あいこ</rt><rp>)</rp></ruby>にお<ruby>礼<rp>(</rp><rt>れい</rt><rp>)</rp></ruby><ruby>申<rp>(</rp><rt>もう</rt><rp>)</rp></ruby>し<ruby>上<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>げます。",
                        "enMn": "Таны байнгын дэмжлэгт үнэхээр талархаж байна."
                    },
                    "phonetic": "申",
                    "phoneticReading": "シン",
                    "enMn": "хэлэх (даруу)"
                },
                {
                    "jp": "頑張る",
                    "reading": "がんばる",
                    "en": "to try one's best",
                    "meanings": [
                        "to try one's best",
                        "to try hard",
                        "to persist"
                    ],
                    "example": {
                        "jp": "彼女は見かけによらず頑張りやだ。",
                        "en": "She is persistent though she doesn't look so.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>かけによらず<ruby>頑張<rp>(</rp><rt>がんば</rt><rp>)</rp></ruby>りやだ。",
                        "enMn": "Тэр гаднаасаа харагдаж байгаагаас илүү тэвчээртэй."
                    },
                    "phonetic": "元",
                    "phoneticReading": "ガン",
                    "enMn": "чармайх"
                }
            ]
        ]
    },
    {
        "level": 15,
        "jlpt": "N4",
        "title": "N4 · Level 5",
        "sets": [
            [
                {
                    "jp": "壊す",
                    "reading": "こわす",
                    "en": "to break",
                    "meanings": [
                        "to break",
                        "to break down"
                    ],
                    "example": {
                        "jp": "彼女はまたトースターを壊した。",
                        "en": "She has broken the toaster again.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はまたトースターを<ruby>壊<rp>(</rp><rt>こわ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр тостерийг дахин эвдэв."
                    },
                    "phonetic": "褱",
                    "phoneticReading": "カイ",
                    "enMn": "эвдэх"
                },
                {
                    "jp": "壊れる",
                    "reading": "こわれる",
                    "en": "to be broken",
                    "meanings": [
                        "to be broken",
                        "to break"
                    ],
                    "example": {
                        "jp": "夜中に台所で物が壊れる音がした。",
                        "en": "I heard something crashing in the kitchen in the middle of the night.",
                        "furigana": "<ruby>夜中<rp>(</rp><rt>やちゅう</rt><rp>)</rp></ruby>に<ruby>台所<rp>(</rp><rt>だいどころ</rt><rp>)</rp></ruby>で<ruby>物<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>が<ruby>壊<rp>(</rp><rt>こわ</rt><rp>)</rp></ruby>れる<ruby>音<rp>(</rp><rt>おと</rt><rp>)</rp></ruby>がした。",
                        "enMn": "Шөнө дунд гал тогооны өрөөнөөс ямар нэг зүйл унаж хагарах чимээ сонссон."
                    },
                    "phonetic": "褱",
                    "phoneticReading": "カイ",
                    "enMn": "эвдрэх"
                },
                {
                    "jp": "思う",
                    "reading": "おもう",
                    "en": "to think",
                    "meanings": [
                        "to think",
                        "to feel"
                    ],
                    "example": {
                        "jp": "わたしがいなくて淋しいと思った？",
                        "en": "Did you miss me?",
                        "furigana": "わたしがいなくて<ruby>淋<rp>(</rp><rt>さび</rt><rp>)</rp></ruby>しいと<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>った？",
                        "enMn": "Чи намайг санаж байсан уу?"
                    },
                    "phonetic": "思",
                    "phoneticReading": "シ",
                    "enMn": "бодох"
                },
                {
                    "jp": "思い出す",
                    "reading": "おもいだす",
                    "en": "to recall",
                    "meanings": [
                        "to recall",
                        "to remember"
                    ],
                    "example": {
                        "jp": "約束したことを思い出して下さい。",
                        "en": "I must remind you of your promise.",
                        "furigana": "<ruby>約束<rp>(</rp><rt>やくそく</rt><rp>)</rp></ruby>したことを<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>い<ruby>出<rp>(</rp><rt>だ</rt><rp>)</rp></ruby>して<ruby>下<rp>(</rp><rt>くだ</rt><rp>)</rp></ruby>さい。",
                        "enMn": "Би чамд амлалтаа сануулах ёстой."
                    },
                    "phonetic": "思",
                    "phoneticReading": "シ",
                    "enMn": "санах"
                },
                {
                    "jp": "深い",
                    "reading": "ふかい",
                    "en": "deep",
                    "meanings": [
                        "deep",
                        "profound"
                    ],
                    "example": {
                        "jp": "野原は深い雪におおわれていた。",
                        "en": "The fields lay covered with deep snow.",
                        "furigana": "<ruby>野原<rp>(</rp><rt>のはら</rt><rp>)</rp></ruby>は<ruby>深<rp>(</rp><rt>ふか</rt><rp>)</rp></ruby>い<ruby>雪<rp>(</rp><rt>ゆき</rt><rp>)</rp></ruby>におおわれていた。",
                        "enMn": "Тал хээр гүн цасаар хучигдсан байв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "гүн"
                },
                {
                    "jp": "焼く",
                    "reading": "やく",
                    "en": "to bake",
                    "meanings": [
                        "to bake",
                        "to grill"
                    ],
                    "example": {
                        "jp": "母は週末にパンとクッキーを焼く。",
                        "en": "My mother bakes bread and cookies on weekends.",
                        "furigana": "<ruby>母<rp>(</rp><rt>はは</rt><rp>)</rp></ruby>は<ruby>週末<rp>(</rp><rt>しゅうまつ</rt><rp>)</rp></ruby>にパンとクッキーを<ruby>焼<rp>(</rp><rt>や</rt><rp>)</rp></ruby>く。",
                        "enMn": "Ээж минь амралтын өдрүүдэд талх, жигнэмэг жигнэдэг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "жигнэх"
                },
                {
                    "jp": "ガラス",
                    "reading": "ガラス",
                    "en": "glass",
                    "meanings": [
                        "glass",
                        "pane"
                    ],
                    "example": {
                        "jp": "彼女はガラスの破片で指を切った。",
                        "en": "She cut her finger on the broken glass.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はガラスの<ruby>破片<rp>(</rp><rt>はへん</rt><rp>)</rp></ruby>で<ruby>指<rp>(</rp><rt>ゆび</rt><rp>)</rp></ruby>を<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>った。",
                        "enMn": "Тэр хугарсан шилэнд хурууг нь зүссэн."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "шил"
                },
                {
                    "jp": "発音",
                    "reading": "はつおん",
                    "en": "pronunciation",
                    "meanings": [
                        "pronunciation"
                    ],
                    "example": {
                        "jp": "彼女は昨日英語の発音を練習した。",
                        "en": "She practiced her English pronunciation yesterday.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>昨日<rp>(</rp><rt>きのう</rt><rp>)</rp></ruby><ruby>英語<rp>(</rp><rt>えいご</rt><rp>)</rp></ruby>の<ruby>発音<rp>(</rp><rt>はつおん</rt><rp>)</rp></ruby>を<ruby>練習<rp>(</rp><rt>れんしゅう</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр өчигдөр англи хэлний дуудлагаа дасгасан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дуудлага"
                },
                {
                    "jp": "泥棒",
                    "reading": "どろぼう",
                    "en": "thief",
                    "meanings": [
                        "thief",
                        "burglar"
                    ],
                    "example": {
                        "jp": "目が覚めると部屋に泥棒がいた。",
                        "en": "I awoke to find a burglar in my room.",
                        "furigana": "<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>が<ruby>覚<rp>(</rp><rt>さ</rt><rp>)</rp></ruby>めると<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>に<ruby>泥棒<rp>(</rp><rt>どろぼう</rt><rp>)</rp></ruby>がいた。",
                        "enMn": "Би сэрэхэд өрөөндөө хулгайч байхыг олж харав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хулгайч"
                },
                {
                    "jp": "大学生",
                    "reading": "だいがくせい",
                    "en": "college student",
                    "meanings": [
                        "college student",
                        "university student"
                    ],
                    "example": {
                        "jp": "彼が大学生かどうか私は知らない。",
                        "en": "I don't know whether he's a college student or not.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>が<ruby>大学生<rp>(</rp><rt>だいがくせい</rt><rp>)</rp></ruby>かどうか<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>らない。",
                        "enMn": "Тэр их сургуулийн оюутан эсэхийг би мэдэхгүй."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "коллежийн оюутан"
                }
            ]
        ]
    },
    {
        "level": 16,
        "jlpt": "N4",
        "title": "N4 · Level 6",
        "sets": [
            [
                {
                    "jp": "正月",
                    "reading": "しょうがつ",
                    "en": "New Year",
                    "meanings": [
                        "New Year",
                        "New Year's Day"
                    ],
                    "example": {
                        "jp": "日本では老いも若きも正月を祝います。",
                        "en": "Young and old in Japan celebrate New Year's Day.",
                        "furigana": "<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>では<ruby>老<rp>(</rp><rt>お</rt><rp>)</rp></ruby>いも<ruby>若<rp>(</rp><rt>わか</rt><rp>)</rp></ruby>きも<ruby>正月<rp>(</rp><rt>しょうがつ</rt><rp>)</rp></ruby>を<ruby>祝<rp>(</rp><rt>いわ</rt><rp>)</rp></ruby>います。",
                        "enMn": "Японд залуу, хөгшин хүн бүр Шинэ жилийг тэмдэглэдэг."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ",
                    "enMn": "шинэ жил"
                },
                {
                    "jp": "正しい",
                    "reading": "ただしい",
                    "en": "correct",
                    "meanings": [
                        "correct"
                    ],
                    "example": {
                        "jp": "礼儀正しいのが彼の特徴であった。",
                        "en": "Courtesy marked his manner.",
                        "furigana": "<ruby>礼儀<rp>(</rp><rt>れいぎ</rt><rp>)</rp></ruby><ruby>正<rp>(</rp><rt>ただ</rt><rp>)</rp></ruby>しいのが<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>特徴<rp>(</rp><rt>とくちょう</rt><rp>)</rp></ruby>であった。",
                        "enMn": "Түүний зан авирыг эелдэг байдал тодорхойлдог байв."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ",
                    "enMn": "зөв"
                },
                {
                    "jp": "失礼",
                    "reading": "しつれい",
                    "en": "discourtesy",
                    "meanings": [
                        "discourtesy",
                        "impoliteness",
                        "Excuse me"
                    ],
                    "example": {
                        "jp": "彼らの失礼な態度には腹が立つ。",
                        "en": "I resent their rude attitude.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らの<ruby>失礼<rp>(</rp><rt>しつれい</rt><rp>)</rp></ruby>な<ruby>態度<rp>(</rp><rt>たいど</rt><rp>)</rp></ruby>には<ruby>腹<rp>(</rp><rt>はら</rt><rp>)</rp></ruby>が<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>つ。",
                        "enMn": "Тэдний бүдүүлэг хандлагад би дургүйцдэг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "эелдэг бус"
                },
                {
                    "jp": "運転手",
                    "reading": "うんてんしゅ",
                    "en": "driver",
                    "meanings": [
                        "driver (by occupation)"
                    ],
                    "example": {
                        "jp": "彼らの父はタクシーの運転手です。",
                        "en": "Their father is a taxi driver.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らの<ruby>父<rp>(</rp><rt>ちち</rt><rp>)</rp></ruby>はタクシーの<ruby>運転<rp>(</rp><rt>うんてん</rt><rp>)</rp></ruby><ruby>手<rp>(</rp><rt>しゅ</rt><rp>)</rp></ruby>です。",
                        "enMn": "Тэдний аав такси жолоочоор ажилладаг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "жолооч"
                },
                {
                    "jp": "別",
                    "reading": "べつ",
                    "en": "distinction",
                    "meanings": [
                        "distinction",
                        "different"
                    ],
                    "example": {
                        "jp": "別の日をご指定いただけませんか。",
                        "en": "Could you suggest an alternative date?",
                        "furigana": "<ruby>別<rp>(</rp><rt>べつ</rt><rp>)</rp></ruby>の<ruby>日<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>をご<ruby>指定<rp>(</rp><rt>してい</rt><rp>)</rp></ruby>いただけませんか。",
                        "enMn": "Өөр огноо санал болгож болох уу?"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ялгаа"
                },
                {
                    "jp": "小説",
                    "reading": "しょうせつ",
                    "en": "novel",
                    "meanings": [
                        "novel"
                    ],
                    "example": {
                        "jp": "来月号から新連載小説が始まります。",
                        "en": "A new serial will begin in next month's issue.",
                        "furigana": "<ruby>来月<rp>(</rp><rt>らいげつ</rt><rp>)</rp></ruby><ruby>号<rp>(</rp><rt>ごう</rt><rp>)</rp></ruby>から<ruby>新<rp>(</rp><rt>しん</rt><rp>)</rp></ruby><ruby>連載<rp>(</rp><rt>れんさい</rt><rp>)</rp></ruby><ruby>小説<rp>(</rp><rt>しょうせつ</rt><rp>)</rp></ruby>が<ruby>始<rp>(</rp><rt>はじ</rt><rp>)</rp></ruby>まります。",
                        "enMn": "Шинэ цуврал зохиол ирэх сарын дугаараас эхэлнэ."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "роман"
                },
                {
                    "jp": "運動",
                    "reading": "うんどう",
                    "en": "exercise",
                    "meanings": [
                        "exercise"
                    ],
                    "example": {
                        "jp": "毎日ある程度運動する事は必要だ。",
                        "en": "It is necessary to do some exercise every day.",
                        "furigana": "<ruby>毎日<rp>(</rp><rt>まいにち</rt><rp>)</rp></ruby>ある<ruby>程度<rp>(</rp><rt>ていど</rt><rp>)</rp></ruby><ruby>運動<rp>(</rp><rt>うんどう</rt><rp>)</rp></ruby>する<ruby>事<rp>(</rp><rt>こと</rt><rp>)</rp></ruby>は<ruby>必要<rp>(</rp><rt>ひつよう</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Өдөр бүр тодорхой хэмжээний дасгал хийх шаардлагатай."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дасгал"
                },
                {
                    "jp": "止める",
                    "reading": "とめる",
                    "en": "to end",
                    "meanings": [
                        "to end",
                        "to stop"
                    ],
                    "example": {
                        "jp": "父にとって酒を止めるのは難しい。",
                        "en": "It's hard for my father to give up drinking.",
                        "furigana": "<ruby>父<rp>(</rp><rt>ちち</rt><rp>)</rp></ruby>にとって<ruby>酒<rp>(</rp><rt>さけ</rt><rp>)</rp></ruby>を<ruby>止<rp>(</rp><rt>と</rt><rp>)</rp></ruby>めるのは<ruby>難<rp>(</rp><rt>むずか</rt><rp>)</rp></ruby>しい。",
                        "enMn": "Аавад архи хэрэглэхээ болих нь хэцүү."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дуусгах"
                },
                {
                    "jp": "葉",
                    "reading": "は",
                    "en": "leaf",
                    "meanings": [
                        "leaf"
                    ],
                    "example": {
                        "jp": "お誕生日おめでとう相葉ちゃん！",
                        "en": "Happy birthday, Miss Aiba!",
                        "furigana": "お<ruby>誕生<rp>(</rp><rt>たんじょう</rt><rp>)</rp></ruby><ruby>日<rp>(</rp><rt>び</rt><rp>)</rp></ruby>おめでとう<ruby>相<rp>(</rp><rt>あい</rt><rp>)</rp></ruby><ruby>葉<rp>(</rp><rt>は</rt><rp>)</rp></ruby>ちゃん！",
                        "enMn": "Төрсөн өдрийн мэнд хүргэе, Аиба хатагтай!"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "навч"
                },
                {
                    "jp": "すると",
                    "reading": "すると",
                    "en": "then",
                    "meanings": [
                        "and",
                        "then"
                    ],
                    "example": {
                        "jp": "するとあなたは幸せでしょう。",
                        "en": "Then you will be happy.",
                        "furigana": "するとあなたは<ruby>幸<rp>(</rp><rt>しあわ</rt><rp>)</rp></ruby>せでしょう。",
                        "enMn": "Тэгвэл чи аз жаргалтай байх болно."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дараа нь"
                }
            ]
        ]
    },
    {
        "level": 17,
        "jlpt": "N4",
        "title": "N4 · Level 7",
        "sets": [
            [
                {
                    "jp": "地震",
                    "reading": "じしん",
                    "en": "earthquake",
                    "meanings": [
                        "earthquake"
                    ],
                    "example": {
                        "jp": "彼女は地震の時落ち着いています。",
                        "en": "She stays calm through earthquakes.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>地震<rp>(</rp><rt>じしん</rt><rp>)</rp></ruby>の<ruby>時<rp>(</rp><rt>とき</rt><rp>)</rp></ruby><ruby>落<rp>(</rp><rt>お</rt><rp>)</rp></ruby>ち<ruby>着<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>いています。",
                        "enMn": "Тэр газар хөдлөлтийн үед тайван байдаг."
                    },
                    "phonetic": "也",
                    "phoneticReading": "チ",
                    "enMn": "газар хөдлөлт"
                },
                {
                    "jp": "地理",
                    "reading": "ちり",
                    "en": "geography",
                    "meanings": [
                        "geography"
                    ],
                    "example": {
                        "jp": "彼は東京の地理に精通している。",
                        "en": "He is at home with the geography of Tokyo.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>東京<rp>(</rp><rt>とうきょう</rt><rp>)</rp></ruby>の<ruby>地理<rp>(</rp><rt>ちり</rt><rp>)</rp></ruby>に<ruby>精通<rp>(</rp><rt>せいつう</rt><rp>)</rp></ruby>している。",
                        "enMn": "Тэр Токиогийн газарзүйг маш сайн мэддэг."
                    },
                    "phonetic": "也",
                    "phoneticReading": "チ",
                    "enMn": "газарзүй"
                },
                {
                    "jp": "動物園",
                    "reading": "どうぶつえん",
                    "en": "zoo",
                    "meanings": [
                        "zoo"
                    ],
                    "example": {
                        "jp": "彼らは昨日バスで動物園へ行った。",
                        "en": "They went to the zoo by bus yesterday.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らは<ruby>昨日<rp>(</rp><rt>きのう</rt><rp>)</rp></ruby>バスで<ruby>動物<rp>(</rp><rt>どうぶつ</rt><rp>)</rp></ruby><ruby>園<rp>(</rp><rt>えん</rt><rp>)</rp></ruby>へ<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>った。",
                        "enMn": "Тэд өчигдөр автобусаар амьтны хүрээлэнд явсан."
                    },
                    "phonetic": "動",
                    "phoneticReading": "ドウ",
                    "enMn": "амьтны хүрээлэн"
                },
                {
                    "jp": "動く",
                    "reading": "うごく",
                    "en": "to move",
                    "meanings": [
                        "to move"
                    ],
                    "example": {
                        "jp": "列車はダイヤどおりに動いている。",
                        "en": "Trains are running on schedule.",
                        "furigana": "<ruby>列車<rp>(</rp><rt>れっしゃ</rt><rp>)</rp></ruby>はダイヤどおりに<ruby>動<rp>(</rp><rt>うご</rt><rp>)</rp></ruby>いている。",
                        "enMn": "Галт тэрэгнүүд хуваарийн дагуу явж байна."
                    },
                    "phonetic": "動",
                    "phoneticReading": "ドウ",
                    "enMn": "хөдлөх"
                },
                {
                    "jp": "迎える",
                    "reading": "むかえる",
                    "en": "to welcome",
                    "meanings": [
                        "to welcome",
                        "to meet",
                        "to greet"
                    ],
                    "example": {
                        "jp": "妹に車で駅まで迎えに行かせます。",
                        "en": "I will have my sister pick you up at the station.",
                        "furigana": "<ruby>妹<rp>(</rp><rt>いもうと</rt><rp>)</rp></ruby>に<ruby>車<rp>(</rp><rt>くるま</rt><rp>)</rp></ruby>で<ruby>駅<rp>(</rp><rt>えき</rt><rp>)</rp></ruby>まで<ruby>迎<rp>(</rp><rt>むか</rt><rp>)</rp></ruby>えに<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>かせます。",
                        "enMn": "Би дүү охиноороо чамайг буудал дээр авахуулна."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "угтах"
                },
                {
                    "jp": "祈る",
                    "reading": "いのる",
                    "en": "to pray",
                    "meanings": [
                        "to pray",
                        "to wish"
                    ],
                    "example": {
                        "jp": "彼らは私達の勝利を祈ってくれた。",
                        "en": "They congratulated us on our victory.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らは<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby><ruby>達<rp>(</rp><rt>たち</rt><rp>)</rp></ruby>の<ruby>勝利<rp>(</rp><rt>しょうり</rt><rp>)</rp></ruby>を<ruby>祈<rp>(</rp><rt>いの</rt><rp>)</rp></ruby>ってくれた。",
                        "enMn": "Тэд бидний ялалтад баяр хүргэсэн."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "залбирах"
                },
                {
                    "jp": "噛む",
                    "reading": "かむ",
                    "en": "to bite",
                    "meanings": [
                        "to bite",
                        "to chew"
                    ],
                    "example": {
                        "jp": "プチッ、と糸を犬歯で噛み切った。",
                        "en": "I snapped the thread on my canine.",
                        "furigana": "プチッ、と<ruby>糸<rp>(</rp><rt>いと</rt><rp>)</rp></ruby>を<ruby>犬歯<rp>(</rp><rt>けんし</rt><rp>)</rp></ruby>で<ruby>噛<rp>(</rp><rt>か</rt><rp>)</rp></ruby>み<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>った。",
                        "enMn": "Би утсыг соёогоороо тас цавчив."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хазах"
                },
                {
                    "jp": "触る",
                    "reading": "さわる",
                    "en": "to touch",
                    "meanings": [
                        "to touch",
                        "to feel"
                    ],
                    "example": {
                        "jp": "触らずそのままにしておきなさい。",
                        "en": "Don't touch it. Leave it as it is.",
                        "furigana": "<ruby>触<rp>(</rp><rt>さわ</rt><rp>)</rp></ruby>らずそのままにしておきなさい。",
                        "enMn": "Бүү хүр. Байгаагаар нь орхи."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүрэх"
                },
                {
                    "jp": "西洋",
                    "reading": "せいよう",
                    "en": "the West",
                    "meanings": [
                        "the West",
                        "Western countries"
                    ],
                    "example": {
                        "jp": "西洋の世界では個性が強調される。",
                        "en": "Individuality is stressed in the Western world.",
                        "furigana": "<ruby>西洋<rp>(</rp><rt>せいよう</rt><rp>)</rp></ruby>の<ruby>世界<rp>(</rp><rt>せかい</rt><rp>)</rp></ruby>では<ruby>個性<rp>(</rp><rt>こせい</rt><rp>)</rp></ruby>が<ruby>強調<rp>(</rp><rt>きょうちょう</rt><rp>)</rp></ruby>される。",
                        "enMn": "Барууны ертөнцөд хувь хүний онцлогийг онцолдог."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "Барын орнууд"
                },
                {
                    "jp": "社長",
                    "reading": "しゃちょう",
                    "en": "company president",
                    "meanings": [
                        "president of a company"
                    ],
                    "example": {
                        "jp": "彼らは社長に退陣するよう求めた。",
                        "en": "They demanded that the president resign.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らは<ruby>社長<rp>(</rp><rt>しゃちょう</rt><rp>)</rp></ruby>に<ruby>退陣<rp>(</rp><rt>たいじん</rt><rp>)</rp></ruby>するよう<ruby>求<rp>(</rp><rt>もと</rt><rp>)</rp></ruby>めた。",
                        "enMn": "Тэд ерөнхийлөгчийг огцрохыг шаардсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "компанийн ерөнхийлөгч"
                }
            ]
        ]
    },
    {
        "level": 18,
        "jlpt": "N4",
        "title": "N4 · Level 8",
        "sets": [
            [
                {
                    "jp": "彼",
                    "reading": "かれ",
                    "en": "he",
                    "meanings": [
                        "he",
                        "boyfriend"
                    ],
                    "example": {
                        "jp": "たぶん彼にしてみれば同じことよ。",
                        "en": "Maybe it will be exactly the same for him.",
                        "furigana": "たぶん<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>にしてみれば<ruby>同<rp>(</rp><rt>おな</rt><rp>)</rp></ruby>じことよ。",
                        "enMn": "Магадгүй түүний хувьд ч яг адилхан байх байх."
                    },
                    "phonetic": "皮",
                    "phoneticReading": "ハ、ヒ",
                    "enMn": "тэр"
                },
                {
                    "jp": "彼ら",
                    "reading": "かれら",
                    "en": "they (usually male)",
                    "meanings": [
                        "they (usually male)"
                    ],
                    "example": {
                        "jp": "彼らは仲良く一緒に暮らしている。",
                        "en": "They live together in unity.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らは<ruby>仲良<rp>(</rp><rt>なかよ</rt><rp>)</rp></ruby>く<ruby>一緒<rp>(</rp><rt>いっしょ</rt><rp>)</rp></ruby>に<ruby>暮<rp>(</rp><rt>く</rt><rp>)</rp></ruby>らしている。",
                        "enMn": "Тэд эв найртай хамт амьдардаг."
                    },
                    "phonetic": "皮",
                    "phoneticReading": "ハ、ヒ",
                    "enMn": "тэд (ихэвчлэн эрэгтэй)"
                },
                {
                    "jp": "人口",
                    "reading": "じんこう",
                    "en": "population",
                    "meanings": [
                        "population"
                    ],
                    "example": {
                        "jp": "兵庫県の人口はどれぐらいですか。",
                        "en": "What is the population of Hyogo prefecture?",
                        "furigana": "<ruby>兵庫<rp>(</rp><rt>ひょうご</rt><rp>)</rp></ruby><ruby>県<rp>(</rp><rt>けん</rt><rp>)</rp></ruby>の<ruby>人口<rp>(</rp><rt>じんこう</rt><rp>)</rp></ruby>はどれぐらいですか。",
                        "enMn": "Хёго мужийн хүн ам хэд вэ?"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүн ам"
                },
                {
                    "jp": "アルバイト",
                    "reading": "アルバイト",
                    "en": "part-time job",
                    "meanings": [
                        "part-time job"
                    ],
                    "example": {
                        "jp": "何かアルバイトはしていますか。",
                        "en": "Do you have a part-time job?",
                        "furigana": "<ruby>何<rp>(</rp><rt>なに</rt><rp>)</rp></ruby>かアルバイトはしていますか。",
                        "enMn": "Чи хагас цагийн ажилтай юу?"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "цагийн ажил"
                },
                {
                    "jp": "月",
                    "reading": "つき",
                    "en": "moon",
                    "meanings": [
                        "moon"
                    ],
                    "example": {
                        "jp": "妹は、月に１度家に必ず手紙を書く。",
                        "en": "My sister never fails to write home once a month.",
                        "furigana": "<ruby>妹<rp>(</rp><rt>いもうと</rt><rp>)</rp></ruby>は、<ruby>月<rp>(</rp><rt>つき</rt><rp>)</rp></ruby>に１<ruby>度<rp>(</rp><rt>ど</rt><rp>)</rp></ruby><ruby>家<rp>(</rp><rt>か</rt><rp>)</rp></ruby>に<ruby>必<rp>(</rp><rt>かなら</rt><rp>)</rp></ruby>ず<ruby>手紙<rp>(</rp><rt>てがみ</rt><rp>)</rp></ruby>を<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>く。",
                        "enMn": "Дүү охин минь сард нэг удаа гэртээ захидал бичихээ хэзээ ч алддаггүй."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сар"
                },
                {
                    "jp": "出席",
                    "reading": "しゅっせき",
                    "en": "attendance",
                    "meanings": [
                        "attendance"
                    ],
                    "example": {
                        "jp": "彼女は朝の礼拝に出席できなかった。",
                        "en": "She missed the morning service.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>朝<rp>(</rp><rt>あさ</rt><rp>)</rp></ruby>の<ruby>礼拝<rp>(</rp><rt>れいはい</rt><rp>)</rp></ruby>に<ruby>出席<rp>(</rp><rt>しゅっせき</rt><rp>)</rp></ruby>できなかった。",
                        "enMn": "Тэр өглөөний шашны хурлыг алдсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ирц"
                },
                {
                    "jp": "それに",
                    "reading": "それに",
                    "en": "moreover",
                    "meanings": [
                        "moreover",
                        "besides"
                    ],
                    "example": {
                        "jp": "彼は私にパン、それに牛乳もくれた。",
                        "en": "He gave me some bread, also some milk.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>にパン、それに<ruby>牛乳<rp>(</rp><rt>ぎゅうにゅう</rt><rp>)</rp></ruby>もくれた。",
                        "enMn": "Тэр надад талх, мөн сүү өгсөн."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "түүнчлэн"
                },
                {
                    "jp": "赤ちゃん",
                    "reading": "あかちゃん",
                    "en": "baby",
                    "meanings": [
                        "baby",
                        "infant"
                    ],
                    "example": {
                        "jp": "彼女は赤ちゃんを優しく愛撫した。",
                        "en": "She caressed her baby lovingly.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>赤<rp>(</rp><rt>あか</rt><rp>)</rp></ruby>ちゃんを<ruby>優<rp>(</rp><rt>やさ</rt><rp>)</rp></ruby>しく<ruby>愛撫<rp>(</rp><rt>あいぶ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр нярайгаа хайрлан илбэв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "нялх хүүхэд"
                },
                {
                    "jp": "エスカレーター",
                    "reading": "エスカレーター",
                    "en": "escalator",
                    "meanings": [
                        "escalator"
                    ],
                    "example": {
                        "jp": "上りのエスカレーターはどこですか？",
                        "en": "Where's the up-escalator?",
                        "furigana": "<ruby>上<rp>(</rp><rt>のぼ</rt><rp>)</rp></ruby>りのエスカレーターはどこですか？",
                        "enMn": "Дээшлэх эскалатор хаана байна вэ?"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "эскалатор"
                },
                {
                    "jp": "絹",
                    "reading": "きぬ",
                    "en": "silk",
                    "meanings": [
                        "silk"
                    ],
                    "example": {
                        "jp": "雌豚の耳から絹の財布は作れない。",
                        "en": "You cannot make a silk purse out of a sow's ear.",
                        "furigana": "<ruby>雌<rp>(</rp><rt>めす</rt><rp>)</rp></ruby><ruby>豚<rp>(</rp><rt>ぶた</rt><rp>)</rp></ruby>の<ruby>耳<rp>(</rp><rt>みみ</rt><rp>)</rp></ruby>から<ruby>絹<rp>(</rp><rt>きぬ</rt><rp>)</rp></ruby>の<ruby>財布<rp>(</rp><rt>さいふ</rt><rp>)</rp></ruby>は<ruby>作<rp>(</rp><rt>つく</rt><rp>)</rp></ruby>れない。",
                        "enMn": "Гахайн чихнээс торго түрийвч хийж болохгүй."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "торго"
                }
            ]
        ]
    },
    {
        "level": 19,
        "jlpt": "N4",
        "title": "N4 · Level 9",
        "sets": [
            [
                {
                    "jp": "悲しい",
                    "reading": "かなしい",
                    "en": "sad",
                    "meanings": [
                        "sad",
                        "sorrowful"
                    ],
                    "example": {
                        "jp": "悲しい時は友達が励ましてくれる。",
                        "en": "When I'm sad, my friends encourage me.",
                        "furigana": "<ruby>悲<rp>(</rp><rt>かな</rt><rp>)</rp></ruby>しい<ruby>時<rp>(</rp><rt>とき</rt><rp>)</rp></ruby>は<ruby>友達<rp>(</rp><rt>ともだち</rt><rp>)</rp></ruby>が<ruby>励<rp>(</rp><rt>はげ</rt><rp>)</rp></ruby>ましてくれる。",
                        "enMn": "Би гунигтай байхад найзууд минь намайг урамшуулдаг."
                    },
                    "phonetic": "非",
                    "phoneticReading": "ハイ、ヒ",
                    "enMn": "гунигтай"
                },
                {
                    "jp": "非常に",
                    "reading": "ひじょうに",
                    "en": "extremely",
                    "meanings": [
                        "extremely",
                        "very"
                    ],
                    "example": {
                        "jp": "病院は非常にお金がかかります。",
                        "en": "Hospitals are very expensive.",
                        "furigana": "<ruby>病院<rp>(</rp><rt>びょういん</rt><rp>)</rp></ruby>は<ruby>非常<rp>(</rp><rt>ひじょう</rt><rp>)</rp></ruby>にお<ruby>金<rp>(</rp><rt>かね</rt><rp>)</rp></ruby>がかかります。",
                        "enMn": "Эмнэлгийн зардал маш өндөр байдаг."
                    },
                    "phonetic": "非",
                    "phoneticReading": "ハイ、ヒ",
                    "enMn": "маш их"
                },
                {
                    "jp": "足りる",
                    "reading": "たりる",
                    "en": "to be sufficient",
                    "meanings": [
                        "to be sufficient",
                        "to be enough"
                    ],
                    "example": {
                        "jp": "彼は努力が足りないので失敗した。",
                        "en": "He failed due to lack of effort.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>努力<rp>(</rp><rt>どりょく</rt><rp>)</rp></ruby>が<ruby>足<rp>(</rp><rt>た</rt><rp>)</rp></ruby>りないので<ruby>失敗<rp>(</rp><rt>しっぱい</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр хичээл зүтгэл дутсанаас болж бүтэлгүйтсэн."
                    },
                    "phonetic": "足",
                    "phoneticReading": "ソク",
                    "enMn": "хангалттай"
                },
                {
                    "jp": "足す",
                    "reading": "たす",
                    "en": "to add (numbers)",
                    "meanings": [
                        "to add (numbers)"
                    ],
                    "example": {
                        "jp": "これは本を買うための足しになった。",
                        "en": "This was an additional fund for buying books.",
                        "furigana": "これは<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>を<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>うための<ruby>足<rp>(</rp><rt>た</rt><rp>)</rp></ruby>しになった。",
                        "enMn": "Энэ бол ном худалдаж авах нэмэлт хөрөнгө байсан."
                    },
                    "phonetic": "足",
                    "phoneticReading": "ソク",
                    "enMn": "нэмэх"
                },
                {
                    "jp": "人形",
                    "reading": "にんぎょう",
                    "en": "doll",
                    "meanings": [
                        "doll",
                        "figure"
                    ],
                    "example": {
                        "jp": "彼女は余暇を人形を作って過ごす。",
                        "en": "She spends her leisure time making dolls.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>余暇<rp>(</rp><rt>よか</rt><rp>)</rp></ruby>を<ruby>人形<rp>(</rp><rt>にんぎょう</rt><rp>)</rp></ruby>を<ruby>作<rp>(</rp><rt>つく</rt><rp>)</rp></ruby>って<ruby>過<rp>(</rp><rt>す</rt><rp>)</rp></ruby>ごす。",
                        "enMn": "Тэр чөлөөт цагаа хүүхэлдэй хийж өнгөрөөдөг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүүхэлдэй"
                },
                {
                    "jp": "開く",
                    "reading": "ひらく",
                    "en": "to open",
                    "meanings": [
                        "to open",
                        "to become open"
                    ],
                    "example": {
                        "jp": "薬局は何時まで開いていますか。",
                        "en": "Until what time does your pharmacy stay open?",
                        "furigana": "<ruby>薬局<rp>(</rp><rt>やっきょく</rt><rp>)</rp></ruby>は<ruby>何時<rp>(</rp><rt>いつ</rt><rp>)</rp></ruby>まで<ruby>開<rp>(</rp><rt>ひら</rt><rp>)</rp></ruby>いていますか。",
                        "enMn": "Танай эмийн сан хэдэн цаг хүртэл ажилладаг вэ?"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "нээх"
                },
                {
                    "jp": "飾る",
                    "reading": "かざる",
                    "en": "to decorate",
                    "meanings": [
                        "to decorate",
                        "to adorn"
                    ],
                    "example": {
                        "jp": "彼女は自分の部屋をバラで飾った。",
                        "en": "She decorated her room with roses.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby>の<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>をバラで<ruby>飾<rp>(</rp><rt>かざ</rt><rp>)</rp></ruby>った。",
                        "enMn": "Тэр өрөөгөө сарнайгаар чимэглэсэн."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "чимэглэх"
                },
                {
                    "jp": "サンドイッチ",
                    "reading": "サンドイッチ",
                    "en": "sandwich",
                    "meanings": [
                        "sandwich"
                    ],
                    "example": {
                        "jp": "いくつサンドイッチ残ってるの？",
                        "en": "How many sandwiches are there left?",
                        "furigana": "いくつサンドイッチ<ruby>残<rp>(</rp><rt>のこ</rt><rp>)</rp></ruby>ってるの？",
                        "enMn": "Хэдэн сэндвич үлдсэн бэ?"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сэндвич"
                },
                {
                    "jp": "場合",
                    "reading": "ばあい",
                    "en": "case",
                    "meanings": [
                        "case",
                        "situation"
                    ],
                    "example": {
                        "jp": "場合によっては腕力に訴えてもよい。",
                        "en": "It is sometimes acceptable to resort to violence.",
                        "furigana": "<ruby>場合<rp>(</rp><rt>ばあい</rt><rp>)</rp></ruby>によっては<ruby>腕力<rp>(</rp><rt>わんりょく</rt><rp>)</rp></ruby>に<ruby>訴<rp>(</rp><rt>うった</rt><rp>)</rp></ruby>えてもよい。",
                        "enMn": "Заримдаа хүчирхийлэлд хандах нь зөвшөөрөгдөх тохиолдол бий."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "тохиолдол"
                },
                {
                    "jp": "投げる",
                    "reading": "なげる",
                    "en": "to pitch",
                    "meanings": [
                        "to pitch",
                        "to cast away"
                    ],
                    "example": {
                        "jp": "彼女は橋から身を投げて自殺した。",
                        "en": "She committed suicide by jumping off the bridge.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>橋<rp>(</rp><rt>はし</rt><rp>)</rp></ruby>から<ruby>身<rp>(</rp><rt>み</rt><rp>)</rp></ruby>を<ruby>投<rp>(</rp><rt>な</rt><rp>)</rp></ruby>げて<ruby>自殺<rp>(</rp><rt>じさつ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр гүүрнээс үсрэн амиа хорлосон."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "шидэх"
                }
            ]
        ]
    },
    {
        "level": 20,
        "jlpt": "N4",
        "title": "N4 · Level 10",
        "sets": [
            [
                {
                    "jp": "布団",
                    "reading": "ふとん",
                    "en": "futon",
                    "meanings": [
                        "futon"
                    ],
                    "example": {
                        "jp": "あっ。布団取り込むの忘れてた。",
                        "en": "Oh, I forgot to bring in the futons.",
                        "furigana": "あっ。<ruby>布団<rp>(</rp><rt>ふとん</rt><rp>)</rp></ruby><ruby>取<rp>(</rp><rt>と</rt><rp>)</rp></ruby>り<ruby>込<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>むの<ruby>忘<rp>(</rp><rt>わす</rt><rp>)</rp></ruby>れてた。",
                        "enMn": "Өө, би дэвсгэрээ оруулж авахаа мартчихжээ."
                    },
                    "phonetic": "布",
                    "phoneticReading": "フ",
                    "enMn": "ор (футон)"
                },
                {
                    "jp": "怖い",
                    "reading": "こわい",
                    "en": "scary",
                    "meanings": [
                        "scary",
                        "frightening"
                    ],
                    "example": {
                        "jp": "彼女は怖い顔をして彼を黙らせた。",
                        "en": "She frowned him into silence.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>怖<rp>(</rp><rt>こわ</rt><rp>)</rp></ruby>い<ruby>顔<rp>(</rp><rt>かお</rt><rp>)</rp></ruby>をして<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>を<ruby>黙<rp>(</rp><rt>だま</rt><rp>)</rp></ruby>らせた。",
                        "enMn": "Тэр аймшигтай харцаараа түүнийг дуугүй болгов."
                    },
                    "phonetic": "布",
                    "phoneticReading": "フ",
                    "enMn": "аймшигтай"
                },
                {
                    "jp": "残念",
                    "reading": "ざんねん",
                    "en": "regret",
                    "meanings": [
                        "regret",
                        "regrettable"
                    ],
                    "example": {
                        "jp": "離婚されたと聞き残念に思います。",
                        "en": "I'm sorry to hear that you got a divorce.",
                        "furigana": "<ruby>離婚<rp>(</rp><rt>りこん</rt><rp>)</rp></ruby>されたと<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>き<ruby>残念<rp>(</rp><rt>ざんねん</rt><rp>)</rp></ruby>に<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>います。",
                        "enMn": "Чиний салсныг сонсоод харамслаа."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "харамсал"
                },
                {
                    "jp": "品物",
                    "reading": "しなもの",
                    "en": "goods",
                    "meanings": [
                        "goods"
                    ],
                    "example": {
                        "jp": "品物は代金引換でお送りいたします。",
                        "en": "The article will be sent cash on delivery.",
                        "furigana": "<ruby>品物<rp>(</rp><rt>しなもの</rt><rp>)</rp></ruby>は<ruby>代金<rp>(</rp><rt>だいきん</rt><rp>)</rp></ruby><ruby>引換<rp>(</rp><rt>ひきかえ</rt><rp>)</rp></ruby>でお<ruby>送<rp>(</rp><rt>おく</rt><rp>)</rp></ruby>りいたします。",
                        "enMn": "Барааг хүргэлтийн үед мөнгөн төлбөрөөр илгээнэ."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бараа"
                },
                {
                    "jp": "恥ずかしい",
                    "reading": "はずかしい",
                    "en": "ashamed",
                    "meanings": [
                        "ashamed",
                        "embarrassed"
                    ],
                    "example": {
                        "jp": "彼女は恥ずかしさで顔を赤らめた。",
                        "en": "She blushed with shame.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>恥<rp>(</rp><rt>は</rt><rp>)</rp></ruby>ずかしさで<ruby>顔<rp>(</rp><rt>かお</rt><rp>)</rp></ruby>を<ruby>赤<rp>(</rp><rt>あか</rt><rp>)</rp></ruby>らめた。",
                        "enMn": "Тэр ичсэндээ улайв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ичиж буй"
                },
                {
                    "jp": "力",
                    "reading": "ちから",
                    "en": "strength",
                    "meanings": [
                        "strength",
                        "power"
                    ],
                    "example": {
                        "jp": "すぐに集中力を無くしてしまった。",
                        "en": "I immediately lost my concentration.",
                        "furigana": "すぐに<ruby>集中<rp>(</rp><rt>しゅうちゅう</rt><rp>)</rp></ruby><ruby>力<rp>(</rp><rt>りょく</rt><rp>)</rp></ruby>を<ruby>無<rp>(</rp><rt>な</rt><rp>)</rp></ruby>くしてしまった。",
                        "enMn": "Би даруй анхаарлаа алдав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүч"
                },
                {
                    "jp": "なるべく",
                    "reading": "なるべく",
                    "en": "if possible",
                    "meanings": [
                        "if possible",
                        "as much as possible"
                    ],
                    "example": {
                        "jp": "彼は技術者になるべく生まれてきた。",
                        "en": "He was born to be a technician.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>技術<rp>(</rp><rt>ぎじゅつ</rt><rp>)</rp></ruby><ruby>者<rp>(</rp><rt>しゃ</rt><rp>)</rp></ruby>になるべく<ruby>生<rp>(</rp><rt>う</rt><rp>)</rp></ruby>まれてきた。",
                        "enMn": "Тэр инженер болохоор төрсөн юм шиг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "боломжтой бол"
                },
                {
                    "jp": "やっと",
                    "reading": "やっと",
                    "en": "at last",
                    "meanings": [
                        "at last",
                        "finally"
                    ],
                    "example": {
                        "jp": "彼女はやっとそのホテルに着いた。",
                        "en": "She finally reached the hotel.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はやっとそのホテルに<ruby>着<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>いた。",
                        "enMn": "Тэр эцэст нь зочид буудалд хүрч ирэв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "эцэст нь"
                },
                {
                    "jp": "だから",
                    "reading": "だから",
                    "en": "so",
                    "meanings": [
                        "so",
                        "therefore"
                    ],
                    "example": {
                        "jp": "彼一人だけ余る、だから審判させよう。",
                        "en": "He's an odd man; so we'll have him referee.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby><ruby>一<rp>(</rp><rt>いち</rt><rp>)</rp></ruby><ruby>人<rp>(</rp><rt>にん</rt><rp>)</rp></ruby>だけ<ruby>余<rp>(</rp><rt>あま</rt><rp>)</rp></ruby>る、だから<ruby>審判<rp>(</rp><rt>しんぱん</rt><rp>)</rp></ruby>させよう。",
                        "enMn": "Тэр ганц илүү хүн байгаа тул түүгээр шүүгч болгоно."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "тиймээс"
                },
                {
                    "jp": "さっき",
                    "reading": "さっき",
                    "en": "a little while ago",
                    "meanings": [
                        "a little while ago"
                    ],
                    "example": {
                        "jp": "さっきまでの快晴がうそのようだ。",
                        "en": "It's hard to believe it was so clear and sunny up to just now.",
                        "furigana": "さっきまでの<ruby>快晴<rp>(</rp><rt>かいせい</rt><rp>)</rp></ruby>がうそのようだ。",
                        "enMn": "Саяхныг хүртэл цэлмэг наран байсан гэдэгт итгэхэд бэрх."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "саяхан"
                }
            ]
        ]
    },
    {
        "level": 21,
        "jlpt": "N3",
        "title": "N3 · Level 1",
        "sets": [
            [
                {
                    "jp": "正午",
                    "reading": "しょうご",
                    "en": "noon",
                    "meanings": [
                        "noon",
                        "mid-day"
                    ],
                    "example": {
                        "jp": "彼は正午までここにいるでしょう。",
                        "en": "He'll be here until noon.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>正午<rp>(</rp><rt>しょうご</rt><rp>)</rp></ruby>までここにいるでしょう。",
                        "enMn": "Тэр үд хүртэл энд байх болно."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ",
                    "enMn": "үдийн цаг"
                },
                {
                    "jp": "正直",
                    "reading": "しょうじき",
                    "en": "honesty",
                    "meanings": [
                        "honesty",
                        "integrity",
                        "frankness"
                    ],
                    "example": {
                        "jp": "彼女は彼が正直であると納得した。",
                        "en": "She was satisfied that he was honest.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>が<ruby>正直<rp>(</rp><rt>しょうじき</rt><rp>)</rp></ruby>であると<ruby>納得<rp>(</rp><rt>なっとく</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр түүнийг үнэнч гэдэгт итгэж сэтгэл ханав."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ",
                    "enMn": "шударга байдал"
                },
                {
                    "jp": "宿泊",
                    "reading": "しゅくはく",
                    "en": "lodging",
                    "meanings": [
                        "lodging"
                    ],
                    "example": {
                        "jp": "彼はホテルに電話で宿泊を頼んだ。",
                        "en": "He called a hotel for accommodations.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>はホテルに<ruby>電話<rp>(</rp><rt>でんわ</rt><rp>)</rp></ruby>で<ruby>宿泊<rp>(</rp><rt>しゅくはく</rt><rp>)</rp></ruby>を<ruby>頼<rp>(</rp><rt>たの</rt><rp>)</rp></ruby>んだ。",
                        "enMn": "Тэр буудалд байр захиалахаар утасдав."
                    },
                    "phonetic": "宿",
                    "phoneticReading": "シュク",
                    "enMn": "байрлал"
                },
                {
                    "jp": "宿",
                    "reading": "やど",
                    "en": "inn",
                    "meanings": [
                        "inn",
                        "lodging"
                    ],
                    "example": {
                        "jp": "私達は山のふもとの宿に泊まった。",
                        "en": "We put up at an inn at the foot of the mountain.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby><ruby>達<rp>(</rp><rt>たち</rt><rp>)</rp></ruby>は<ruby>山<rp>(</rp><rt>やま</rt><rp>)</rp></ruby>のふもとの<ruby>宿<rp>(</rp><rt>やど</rt><rp>)</rp></ruby>に<ruby>泊<rp>(</rp><rt>と</rt><rp>)</rp></ruby>まった。",
                        "enMn": "Бид уулын бэлд байрлах буудалд байрласан."
                    },
                    "phonetic": "宿",
                    "phoneticReading": "シュク",
                    "enMn": "зочид буудал"
                },
                {
                    "jp": "地味",
                    "reading": "じみ",
                    "en": "plain",
                    "meanings": [
                        "quiet",
                        "plain",
                        "conservative"
                    ],
                    "example": {
                        "jp": "大学生のときに地味に始める年金納付。",
                        "en": "Around the time you go to college, you start having to pay contributions to the National Pension.",
                        "furigana": "<ruby>大学生<rp>(</rp><rt>だいがくせい</rt><rp>)</rp></ruby>のときに<ruby>地味<rp>(</rp><rt>じみ</rt><rp>)</rp></ruby>に<ruby>始<rp>(</rp><rt>はじ</rt><rp>)</rp></ruby>める<ruby>年金<rp>(</rp><rt>ねんきん</rt><rp>)</rp></ruby><ruby>納付<rp>(</rp><rt>のうふ</rt><rp>)</rp></ruby>。",
                        "enMn": "Их сургуульд орох үеэс улсын тэтгэврийн шимтгэл төлж эхлэх шаардлагатай болдог."
                    },
                    "phonetic": "也",
                    "phoneticReading": "チ",
                    "enMn": "энгийн"
                },
                {
                    "jp": "支払う",
                    "reading": "しはらう",
                    "en": "to pay",
                    "meanings": [
                        "to pay"
                    ],
                    "example": {
                        "jp": "彼女はまさしく支払わされたのだ。",
                        "en": "She was jolly well made to pay.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はまさしく<ruby>支払<rp>(</rp><rt>しはら</rt><rp>)</rp></ruby>わされたのだ。",
                        "enMn": "Тэр яг таг төлөхөөр албадагдсан."
                    },
                    "phonetic": "支",
                    "phoneticReading": "シ、キ",
                    "enMn": "төлөх"
                },
                {
                    "jp": "借金",
                    "reading": "しゃっきん",
                    "en": "debt",
                    "meanings": [
                        "debt",
                        "loan",
                        "liabilities"
                    ],
                    "example": {
                        "jp": "彼女は彼の借金の保証人になった。",
                        "en": "She guaranteed his debts.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>借金<rp>(</rp><rt>しゃっきん</rt><rp>)</rp></ruby>の<ruby>保証<rp>(</rp><rt>ほしょう</rt><rp>)</rp></ruby><ruby>人<rp>(</rp><rt>じん</rt><rp>)</rp></ruby>になった。",
                        "enMn": "Тэр түүний өрийн батлан даагч болов."
                    },
                    "phonetic": "昔",
                    "phoneticReading": "セキ、シャク",
                    "enMn": "өр"
                },
                {
                    "jp": "銃",
                    "reading": "じゅう",
                    "en": "gun",
                    "meanings": [
                        "gun"
                    ],
                    "example": {
                        "jp": "猟師たちは銃でその象をねらった。",
                        "en": "The hunters aimed at the elephant.",
                        "furigana": "<ruby>猟師<rp>(</rp><rt>りょうし</rt><rp>)</rp></ruby>たちは<ruby>銃<rp>(</rp><rt>じゅう</rt><rp>)</rp></ruby>でその<ruby>象<rp>(</rp><rt>ぞう</rt><rp>)</rp></ruby>をねらった。",
                        "enMn": "Анчид заанд буугаа чиглүүлэв."
                    },
                    "phonetic": "充",
                    "phoneticReading": "ジュウ",
                    "enMn": "буу"
                },
                {
                    "jp": "賛成",
                    "reading": "さんせい",
                    "en": "approval",
                    "meanings": [
                        "approval",
                        "agreement"
                    ],
                    "example": {
                        "jp": "母はついに私達の計画に賛成した。",
                        "en": "My mother finally approved of our plan.",
                        "furigana": "<ruby>母<rp>(</rp><rt>はは</rt><rp>)</rp></ruby>はついに<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby><ruby>達<rp>(</rp><rt>たち</rt><rp>)</rp></ruby>の<ruby>計画<rp>(</rp><rt>けいかく</rt><rp>)</rp></ruby>に<ruby>賛成<rp>(</rp><rt>さんせい</rt><rp>)</rp></ruby>した。",
                        "enMn": "Ээж минь эцэст нь бидний төлөвлөгөөг зөвшөөрсөн."
                    },
                    "phonetic": "賛",
                    "phoneticReading": "サン",
                    "enMn": "зөвшөөрөл"
                },
                {
                    "jp": "障害",
                    "reading": "しょうがい",
                    "en": "obstacle",
                    "meanings": [
                        "obstacle",
                        "impediment"
                    ],
                    "example": {
                        "jp": "貧困は幸福への障害とはならない。",
                        "en": "Poverty is not a bar to happiness.",
                        "furigana": "<ruby>貧困<rp>(</rp><rt>ひんこん</rt><rp>)</rp></ruby>は<ruby>幸福<rp>(</rp><rt>こうふく</rt><rp>)</rp></ruby>への<ruby>障害<rp>(</rp><rt>しょうがい</rt><rp>)</rp></ruby>とはならない。",
                        "enMn": "Ядуурал бол аз жаргалд саад болохгүй."
                    },
                    "phonetic": "章",
                    "phoneticReading": "ショウ",
                    "enMn": "саад"
                }
            ]
        ]
    },
    {
        "level": 22,
        "jlpt": "N3",
        "title": "N3 · Level 2",
        "sets": [
            [
                {
                    "jp": "参加",
                    "reading": "さんか",
                    "en": "participation",
                    "meanings": [
                        "participation"
                    ],
                    "example": {
                        "jp": "彼女は美人コンテストに参加した。",
                        "en": "She participated in the beauty contest.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>美人<rp>(</rp><rt>びじん</rt><rp>)</rp></ruby>コンテストに<ruby>参加<rp>(</rp><rt>さんか</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр гоо сайхны тэмцээнд оролцов."
                    },
                    "phonetic": "参",
                    "phoneticReading": "サン",
                    "enMn": "оролцоо"
                },
                {
                    "jp": "参考",
                    "reading": "さんこう",
                    "en": "reference",
                    "meanings": [
                        "reference",
                        "consultation"
                    ],
                    "example": {
                        "jp": "私は批評を参考にして本を読んだ。",
                        "en": "I read the book in the light of criticism.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>批評<rp>(</rp><rt>ひひょう</rt><rp>)</rp></ruby>を<ruby>参考<rp>(</rp><rt>さんこう</rt><rp>)</rp></ruby>にして<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>を<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んだ。",
                        "enMn": "Би шүүмжийг харгалзан номыг уншсан."
                    },
                    "phonetic": "参",
                    "phoneticReading": "サン",
                    "enMn": "лавлагаа"
                },
                {
                    "jp": "奨学金",
                    "reading": "しょうがくきん",
                    "en": "scholarship",
                    "meanings": [
                        "scholarship"
                    ],
                    "example": {
                        "jp": "奨学金のおかげで彼女は留学した。",
                        "en": "The scholarship enabled her to study abroad.",
                        "furigana": "<ruby>奨学<rp>(</rp><rt>しょうがく</rt><rp>)</rp></ruby><ruby>金<rp>(</rp><rt>きん</rt><rp>)</rp></ruby>のおかげで<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>留学<rp>(</rp><rt>りゅうがく</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэтгэлэг түүнд гадаадад суралцах боломж олгосон."
                    },
                    "phonetic": "将",
                    "phoneticReading": "ショウ",
                    "enMn": "тэтгэлэг"
                },
                {
                    "jp": "情報",
                    "reading": "じょうほう",
                    "en": "information",
                    "meanings": [
                        "information",
                        "(military) intelligence"
                    ],
                    "example": {
                        "jp": "舞踊がみたいのですが情報をください。",
                        "en": "I'd like to see some dancing. Do you have any information?",
                        "furigana": "<ruby>舞踊<rp>(</rp><rt>ぶよう</rt><rp>)</rp></ruby>がみたいのですが<ruby>情報<rp>(</rp><rt>じょうほう</rt><rp>)</rp></ruby>をください。",
                        "enMn": "Би бүжиг үзмээр байна. Танд ямар нэг мэдээлэл байна уу?"
                    },
                    "phonetic": "青",
                    "phoneticReading": "セイ、ショウ、ジョウ",
                    "enMn": "мэдээлэл"
                },
                {
                    "jp": "姉妹",
                    "reading": "しまい",
                    "en": "sisters",
                    "meanings": [
                        "sisters"
                    ],
                    "example": {
                        "jp": "私たちは姉妹３人で喫茶店を始めた。",
                        "en": "We three sisters opened a coffee shop.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>たちは<ruby>姉妹<rp>(</rp><rt>しまい</rt><rp>)</rp></ruby>３<ruby>人<rp>(</rp><rt>にん</rt><rp>)</rp></ruby>で<ruby>喫茶店<rp>(</rp><rt>きっさてん</rt><rp>)</rp></ruby>を<ruby>始<rp>(</rp><rt>はじ</rt><rp>)</rp></ruby>めた。",
                        "enMn": "Бид гурван эгч дүү кофе шоп нээсэн."
                    },
                    "phonetic": "市",
                    "phoneticReading": "シ",
                    "enMn": "эгч дүү"
                },
                {
                    "jp": "消費",
                    "reading": "しょうひ",
                    "en": "consumption",
                    "meanings": [
                        "consumption",
                        "expenditure"
                    ],
                    "example": {
                        "jp": "日本の米の消費は減少している。",
                        "en": "Japan's consumption of rice is decreasing.",
                        "furigana": "<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>の<ruby>米<rp>(</rp><rt>べい</rt><rp>)</rp></ruby>の<ruby>消費<rp>(</rp><rt>しょうひ</rt><rp>)</rp></ruby>は<ruby>減少<rp>(</rp><rt>げんしょう</rt><rp>)</rp></ruby>している。",
                        "enMn": "Японы цагаан будааны хэрэглээ буурч байна."
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ",
                    "enMn": "хэрэглээ"
                },
                {
                    "jp": "就職",
                    "reading": "しゅうしょく",
                    "en": "employment",
                    "meanings": [
                        "finding employment"
                    ],
                    "example": {
                        "jp": "彼女はタイピストとして就職した。",
                        "en": "She found employment as a typist.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はタイピストとして<ruby>就職<rp>(</rp><rt>しゅうしょく</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр бичээчээр ажилд орсон."
                    },
                    "phonetic": "就",
                    "phoneticReading": "シュウ",
                    "enMn": "ажил эрхлэлт"
                },
                {
                    "jp": "作法",
                    "reading": "さほう",
                    "en": "manners",
                    "meanings": [
                        "manners",
                        "etiquette",
                        "propriety"
                    ],
                    "example": {
                        "jp": "彼の貴族的な作法には感心する。",
                        "en": "I admire his aristocratic manners.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>貴族<rp>(</rp><rt>きぞく</rt><rp>)</rp></ruby><ruby>的<rp>(</rp><rt>てき</rt><rp>)</rp></ruby>な<ruby>作法<rp>(</rp><rt>さほう</rt><rp>)</rp></ruby>には<ruby>感心<rp>(</rp><rt>かんしん</rt><rp>)</rp></ruby>する。",
                        "enMn": "Би түүний язгууртны зан авирыг биширдэг."
                    },
                    "phonetic": "乍",
                    "phoneticReading": "サク",
                    "enMn": "зан төлөв"
                },
                {
                    "jp": "需要",
                    "reading": "じゅよう",
                    "en": "demand",
                    "meanings": [
                        "demand"
                    ],
                    "example": {
                        "jp": "輸入の増加によって需要は下がった。",
                        "en": "The demand was brought down by increases in imports.",
                        "furigana": "<ruby>輸入<rp>(</rp><rt>ゆにゅう</rt><rp>)</rp></ruby>の<ruby>増加<rp>(</rp><rt>ぞうか</rt><rp>)</rp></ruby>によって<ruby>需要<rp>(</rp><rt>じゅよう</rt><rp>)</rp></ruby>は<ruby>下<rp>(</rp><rt>さ</rt><rp>)</rp></ruby>がった。",
                        "enMn": "Импорт өссөнтэй холбоотойгоор эрэлт буурсан."
                    },
                    "phonetic": "需",
                    "phoneticReading": "ジュ",
                    "enMn": "эрэлт"
                },
                {
                    "jp": "州",
                    "reading": "しゅう",
                    "en": "state",
                    "meanings": [
                        "state",
                        "province"
                    ],
                    "example": {
                        "jp": "州知事は囚人達を自由の身にした。",
                        "en": "The governor set the prisoners free.",
                        "furigana": "<ruby>州<rp>(</rp><rt>しゅう</rt><rp>)</rp></ruby><ruby>知事<rp>(</rp><rt>ちじ</rt><rp>)</rp></ruby>は<ruby>囚人<rp>(</rp><rt>しゅうじん</rt><rp>)</rp></ruby><ruby>達<rp>(</rp><rt>たち</rt><rp>)</rp></ruby>を<ruby>自由<rp>(</rp><rt>じゆう</rt><rp>)</rp></ruby>の<ruby>身<rp>(</rp><rt>み</rt><rp>)</rp></ruby>にした。",
                        "enMn": "Мужийн захирагч хоригдлуудыг суллав."
                    },
                    "phonetic": "州",
                    "phoneticReading": "シュウ",
                    "enMn": "муж"
                }
            ]
        ]
    },
    {
        "level": 23,
        "jlpt": "N3",
        "title": "N3 · Level 3",
        "sets": [
            [
                {
                    "jp": "症状",
                    "reading": "しょうじょう",
                    "en": "symptoms",
                    "meanings": [
                        "symptoms",
                        "condition"
                    ],
                    "example": {
                        "jp": "高熱がこの病気の顕著な症状だ。",
                        "en": "High fever is a prominent symptom of this disease.",
                        "furigana": "<ruby>高熱<rp>(</rp><rt>こうねつ</rt><rp>)</rp></ruby>がこの<ruby>病気<rp>(</rp><rt>びょうき</rt><rp>)</rp></ruby>の<ruby>顕著<rp>(</rp><rt>けんちょ</rt><rp>)</rp></ruby>な<ruby>症状<rp>(</rp><rt>しょうじょう</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Өндөр халуурал энэ өвчний тод шинж тэмдэг юм."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ",
                    "enMn": "шинж тэмдэг"
                },
                {
                    "jp": "証明",
                    "reading": "しょうめい",
                    "en": "proof",
                    "meanings": [
                        "proof",
                        "verification"
                    ],
                    "example": {
                        "jp": "身分証明書を二枚拝見できますか。",
                        "en": "May I see two pieces of identification?",
                        "furigana": "<ruby>身分<rp>(</rp><rt>みぶん</rt><rp>)</rp></ruby><ruby>証明<rp>(</rp><rt>しょうめい</rt><rp>)</rp></ruby><ruby>書<rp>(</rp><rt>しょ</rt><rp>)</rp></ruby>を<ruby>二<rp>(</rp><rt>に</rt><rp>)</rp></ruby><ruby>枚<rp>(</rp><rt>まい</rt><rp>)</rp></ruby><ruby>拝見<rp>(</rp><rt>はいけん</rt><rp>)</rp></ruby>できますか。",
                        "enMn": "Хоёр иргэний үнэмлэх харж болох уу?"
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ",
                    "enMn": "нотолгоо"
                },
                {
                    "jp": "賞",
                    "reading": "しょう",
                    "en": "prize",
                    "meanings": [
                        "prize",
                        "award"
                    ],
                    "example": {
                        "jp": "彼女は全部の賞をさらって行った。",
                        "en": "She carried off all the prizes.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>全部<rp>(</rp><rt>ぜんぶ</rt><rp>)</rp></ruby>の<ruby>賞<rp>(</rp><rt>しょう</rt><rp>)</rp></ruby>をさらって<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>った。",
                        "enMn": "Тэр бүх шагналыг авч явсан."
                    },
                    "phonetic": "尚",
                    "phoneticReading": "ショウ",
                    "enMn": "шагнал"
                },
                {
                    "jp": "賞品",
                    "reading": "しょうひん",
                    "en": "trophy",
                    "meanings": [
                        "prize",
                        "trophy"
                    ],
                    "example": {
                        "jp": "先生はジョンに賞品を与えた。",
                        "en": "The teacher gave John a prize.",
                        "furigana": "<ruby>先生<rp>(</rp><rt>せんせい</rt><rp>)</rp></ruby>はジョンに<ruby>賞品<rp>(</rp><rt>しょうひん</rt><rp>)</rp></ruby>を<ruby>与<rp>(</rp><rt>あた</rt><rp>)</rp></ruby>えた。",
                        "enMn": "Багш Жонд шагнал өгсөн."
                    },
                    "phonetic": "尚",
                    "phoneticReading": "ショウ",
                    "enMn": "цом"
                },
                {
                    "jp": "集中",
                    "reading": "しゅうちゅう",
                    "en": "concentration",
                    "meanings": [
                        "concentration",
                        "focusing the mind"
                    ],
                    "example": {
                        "jp": "すぐに集中力を無くしてしまった。",
                        "en": "I immediately lost my concentration.",
                        "furigana": "すぐに<ruby>集中<rp>(</rp><rt>しゅうちゅう</rt><rp>)</rp></ruby><ruby>力<rp>(</rp><rt>りょく</rt><rp>)</rp></ruby>を<ruby>無<rp>(</rp><rt>な</rt><rp>)</rp></ruby>くしてしまった。",
                        "enMn": "Би даруй анхаарлаа алдав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "төвлөрөл"
                },
                {
                    "jp": "収入",
                    "reading": "しゅうにゅう",
                    "en": "income",
                    "meanings": [
                        "income",
                        "revenue"
                    ],
                    "example": {
                        "jp": "僕は収入を越えた生活をしている。",
                        "en": "I live above my means.",
                        "furigana": "<ruby>僕<rp>(</rp><rt>ぼく</rt><rp>)</rp></ruby>は<ruby>収入<rp>(</rp><rt>しゅうにゅう</rt><rp>)</rp></ruby>を<ruby>越<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>えた<ruby>生活<rp>(</rp><rt>せいかつ</rt><rp>)</rp></ruby>をしている。",
                        "enMn": "Би орлогоосоо давсан амьдралаар амьдардаг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "орлого"
                },
                {
                    "jp": "自殺",
                    "reading": "じさつ",
                    "en": "suicide",
                    "meanings": [
                        "suicide"
                    ],
                    "example": {
                        "jp": "彼女は橋から身を投げて自殺した。",
                        "en": "She committed suicide by jumping off the bridge.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>橋<rp>(</rp><rt>はし</rt><rp>)</rp></ruby>から<ruby>身<rp>(</rp><rt>み</rt><rp>)</rp></ruby>を<ruby>投<rp>(</rp><rt>な</rt><rp>)</rp></ruby>げて<ruby>自殺<rp>(</rp><rt>じさつ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр гүүрнээс үсрэн амиа хорлосон."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "амиа хорлолт"
                },
                {
                    "jp": "出版",
                    "reading": "しゅっぱん",
                    "en": "publication",
                    "meanings": [
                        "publication"
                    ],
                    "example": {
                        "jp": "彼女は自分の負担で本を出版した。",
                        "en": "She published the book at her own expense.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby>の<ruby>負担<rp>(</rp><rt>ふたん</rt><rp>)</rp></ruby>で<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>を<ruby>出版<rp>(</rp><rt>しゅっぱん</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр номоо өөрийн зардлаар хэвлүүлсэн."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хэвлэл"
                },
                {
                    "jp": "主婦",
                    "reading": "しゅふ",
                    "en": "housewife",
                    "meanings": [
                        "housewife"
                    ],
                    "example": {
                        "jp": "主婦は家庭の仕事がたくさんある。",
                        "en": "A housewife has many domestic duties.",
                        "furigana": "<ruby>主婦<rp>(</rp><rt>しゅふ</rt><rp>)</rp></ruby>は<ruby>家庭<rp>(</rp><rt>かてい</rt><rp>)</rp></ruby>の<ruby>仕事<rp>(</rp><rt>しごと</rt><rp>)</rp></ruby>がたくさんある。",
                        "enMn": "Гэрийн эзэгтэй олон гэрийн ажилтай."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "гэрийн эзэгтэй"
                },
                {
                    "jp": "自身",
                    "reading": "じしん",
                    "en": "oneself",
                    "meanings": [
                        "oneself"
                    ],
                    "example": {
                        "jp": "妹はそれを自分自身の目で見た。",
                        "en": "My sister saw it with her own eyes.",
                        "furigana": "<ruby>妹<rp>(</rp><rt>いもうと</rt><rp>)</rp></ruby>はそれを<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby><ruby>自身<rp>(</rp><rt>じしん</rt><rp>)</rp></ruby>の<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>で<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>た。",
                        "enMn": "Дүү охин минь үүнийг өөрийн нүдээр харсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "өөрөө"
                }
            ]
        ]
    },
    {
        "level": 24,
        "jlpt": "N3",
        "title": "N3 · Level 4",
        "sets": [
            [
                {
                    "jp": "左右",
                    "reading": "さゆう",
                    "en": "left and right",
                    "meanings": [
                        "left and right",
                        "influence"
                    ],
                    "example": {
                        "jp": "彼の返事は彼の気分に左右される。",
                        "en": "His answer depends on his mood.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>返事<rp>(</rp><rt>へんじ</rt><rp>)</rp></ruby>は<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>気分<rp>(</rp><rt>きぶん</rt><rp>)</rp></ruby>に<ruby>左右<rp>(</rp><rt>さゆう</rt><rp>)</rp></ruby>される。",
                        "enMn": "Түүний хариулт сэтгэл санааны байдлаас хамаардаг."
                    },
                    "phonetic": "左",
                    "phoneticReading": "サ",
                    "enMn": "зүүн баруун"
                },
                {
                    "jp": "差",
                    "reading": "さ",
                    "en": "difference",
                    "meanings": [
                        "difference",
                        "variation"
                    ],
                    "example": {
                        "jp": "彼は一分の差で電車に乗り遅れた。",
                        "en": "He missed the train by one minute.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>一<rp>(</rp><rt>いち</rt><rp>)</rp></ruby><ruby>分<rp>(</rp><rt>ぶん</rt><rp>)</rp></ruby>の<ruby>差<rp>(</rp><rt>さ</rt><rp>)</rp></ruby>で<ruby>電車<rp>(</rp><rt>でんしゃ</rt><rp>)</rp></ruby>に<ruby>乗<rp>(</rp><rt>の</rt><rp>)</rp></ruby>り<ruby>遅<rp>(</rp><rt>おく</rt><rp>)</rp></ruby>れた。",
                        "enMn": "Тэр нэг минутын зөрүүгээр галт тэрэгнээс хоцров."
                    },
                    "phonetic": "左",
                    "phoneticReading": "サ",
                    "enMn": "ялгаа"
                },
                {
                    "jp": "四季",
                    "reading": "しき",
                    "en": "four seasons",
                    "meanings": [
                        "four seasons"
                    ],
                    "example": {
                        "jp": "私は四季の中で夏が一番好きだ。",
                        "en": "I like summer best of the four seasons.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>四季<rp>(</rp><rt>しき</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby>で<ruby>夏<rp>(</rp><rt>なつ</rt><rp>)</rp></ruby>が<ruby>一番<rp>(</rp><rt>いちばん</rt><rp>)</rp></ruby><ruby>好<rp>(</rp><rt>す</rt><rp>)</rp></ruby>きだ。",
                        "enMn": "Дөрвөн улирлаас би зунд хамгийн их дуртай."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дөрвөн улирал"
                },
                {
                    "jp": "皿",
                    "reading": "さら",
                    "en": "plate",
                    "meanings": [
                        "plate",
                        "dish"
                    ],
                    "example": {
                        "jp": "彼女はテーブルの上に皿を置いた。",
                        "en": "She set the tray down on the table.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はテーブルの<ruby>上<rp>(</rp><rt>うえ</rt><rp>)</rp></ruby>に<ruby>皿<rp>(</rp><rt>さら</rt><rp>)</rp></ruby>を<ruby>置<rp>(</rp><rt>お</rt><rp>)</rp></ruby>いた。",
                        "enMn": "Тэр таваг ширээн дээр тавив."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "таваг"
                },
                {
                    "jp": "順番",
                    "reading": "じゅんばん",
                    "en": "turn (in line)",
                    "meanings": [
                        "turn (in line)",
                        "order of things"
                    ],
                    "example": {
                        "jp": "君達全部のいう事を順番に聞こう。",
                        "en": "I'll hear all of you in turn.",
                        "furigana": "<ruby>君<rp>(</rp><rt>きみ</rt><rp>)</rp></ruby><ruby>達<rp>(</rp><rt>たち</rt><rp>)</rp></ruby><ruby>全部<rp>(</rp><rt>ぜんぶ</rt><rp>)</rp></ruby>のいう<ruby>事<rp>(</rp><rt>こと</rt><rp>)</rp></ruby>を<ruby>順番<rp>(</rp><rt>じゅんばん</rt><rp>)</rp></ruby>に<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>こう。",
                        "enMn": "Би та бүгдийн үгийг ээлжлэн сонсоно."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дараалал"
                },
                {
                    "jp": "重要",
                    "reading": "じゅうよう",
                    "en": "important",
                    "meanings": [
                        "important",
                        "essential"
                    ],
                    "example": {
                        "jp": "貴職らにとっては重要なことです。",
                        "en": "This is an important thing for all of you.",
                        "furigana": "<ruby>貴<rp>(</rp><rt>き</rt><rp>)</rp></ruby><ruby>職<rp>(</rp><rt>しょく</rt><rp>)</rp></ruby>らにとっては<ruby>重要<rp>(</rp><rt>じゅうよう</rt><rp>)</rp></ruby>なことです。",
                        "enMn": "Энэ бол та бүхэнд чухал зүйл юм."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "чухал"
                },
                {
                    "jp": "植物",
                    "reading": "しょくぶつ",
                    "en": "plant",
                    "meanings": [
                        "plant",
                        "vegetation"
                    ],
                    "example": {
                        "jp": "動物と植物がこの惑星にはすんでいる。",
                        "en": "Animals and plants live on this planet.",
                        "furigana": "<ruby>動物<rp>(</rp><rt>どうぶつ</rt><rp>)</rp></ruby>と<ruby>植物<rp>(</rp><rt>しょくぶつ</rt><rp>)</rp></ruby>がこの<ruby>惑星<rp>(</rp><rt>わくせい</rt><rp>)</rp></ruby>にはすんでいる。",
                        "enMn": "Амьтан, ургамал энэ гараг дээр амьдардаг."
                    },
                    "phonetic": "直",
                    "phoneticReading": "ショク、チ",
                    "enMn": "ургамал"
                },
                {
                    "jp": "主張",
                    "reading": "しゅちょう",
                    "en": "claim",
                    "meanings": [
                        "claim",
                        "insistence",
                        "assertion"
                    ],
                    "example": {
                        "jp": "弁護士は彼の無罪を強く主張した。",
                        "en": "The lawyer insisted on his innocence.",
                        "furigana": "<ruby>弁護士<rp>(</rp><rt>べんごし</rt><rp>)</rp></ruby>は<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>無罪<rp>(</rp><rt>むざい</rt><rp>)</rp></ruby>を<ruby>強<rp>(</rp><rt>つよ</rt><rp>)</rp></ruby>く<ruby>主張<rp>(</rp><rt>しゅちょう</rt><rp>)</rp></ruby>した。",
                        "enMn": "Хуульч түүний гэм зэмгүйг хатуу баримталсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "шаардлага"
                },
                {
                    "jp": "詩",
                    "reading": "し",
                    "en": "poem",
                    "meanings": [
                        "poem",
                        "poetry"
                    ],
                    "example": {
                        "jp": "来週までにその詩を暗記しなさい。",
                        "en": "Memorize the poem by next week.",
                        "furigana": "<ruby>来週<rp>(</rp><rt>らいしゅう</rt><rp>)</rp></ruby>までにその<ruby>詩<rp>(</rp><rt>し</rt><rp>)</rp></ruby>を<ruby>暗記<rp>(</rp><rt>あんき</rt><rp>)</rp></ruby>しなさい。",
                        "enMn": "Ирэх долоо хоног хүртэл тэр шүлгийг цээжлээрэй."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "шүлэг"
                },
                {
                    "jp": "酸素",
                    "reading": "さんそ",
                    "en": "oxygen",
                    "meanings": [
                        "oxygen"
                    ],
                    "example": {
                        "jp": "生物は酸素なしでは生きられない。",
                        "en": "No living things could live without oxygen.",
                        "furigana": "<ruby>生物<rp>(</rp><rt>せいぶつ</rt><rp>)</rp></ruby>は<ruby>酸素<rp>(</rp><rt>さんそ</rt><rp>)</rp></ruby>なしでは<ruby>生<rp>(</rp><rt>い</rt><rp>)</rp></ruby>きられない。",
                        "enMn": "Ямар ч амьд биет хүчилтөрөгчгүйгээр амьдарч чадахгүй."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүчилтөрөгч"
                }
            ]
        ]
    },
    {
        "level": 25,
        "jlpt": "N3",
        "title": "N3 · Level 5",
        "sets": [
            [
                {
                    "jp": "支店",
                    "reading": "してん",
                    "en": "branch office",
                    "meanings": [
                        "branch store (office)"
                    ],
                    "example": {
                        "jp": "新しい支店が来月シカゴに開店する。",
                        "en": "A new branch will be opened in Chicago next month.",
                        "furigana": "<ruby>新<rp>(</rp><rt>あたら</rt><rp>)</rp></ruby>しい<ruby>支店<rp>(</rp><rt>してん</rt><rp>)</rp></ruby>が<ruby>来月<rp>(</rp><rt>らいげつ</rt><rp>)</rp></ruby>シカゴに<ruby>開店<rp>(</rp><rt>かいてん</rt><rp>)</rp></ruby>する。",
                        "enMn": "Шинэ салбар ирэх сард Чикагод нээгдэнэ."
                    },
                    "phonetic": "支",
                    "phoneticReading": "シ、キ",
                    "enMn": "салбар оффис"
                },
                {
                    "jp": "支配",
                    "reading": "しはい",
                    "en": "rule",
                    "meanings": [
                        "rule",
                        "control",
                        "direction"
                    ],
                    "example": {
                        "jp": "脳が私たちの活動を支配している。",
                        "en": "Our brains control our activities.",
                        "furigana": "<ruby>脳<rp>(</rp><rt>のう</rt><rp>)</rp></ruby>が<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>たちの<ruby>活動<rp>(</rp><rt>かつどう</rt><rp>)</rp></ruby>を<ruby>支配<rp>(</rp><rt>しはい</rt><rp>)</rp></ruby>している。",
                        "enMn": "Тархи бидний үйл ажиллагааг удирддаг."
                    },
                    "phonetic": "支",
                    "phoneticReading": "シ、キ",
                    "enMn": "засаглал"
                },
                {
                    "jp": "乗客",
                    "reading": "じょうきゃく",
                    "en": "passenger",
                    "meanings": [
                        "passenger"
                    ],
                    "example": {
                        "jp": "列車は乗客でいっぱいだった。",
                        "en": "The train was full of passengers.",
                        "furigana": "<ruby>列車<rp>(</rp><rt>れっしゃ</rt><rp>)</rp></ruby>は<ruby>乗客<rp>(</rp><rt>じょうきゃく</rt><rp>)</rp></ruby>でいっぱいだった。",
                        "enMn": "Галт тэрэг зорчигчоор дүүрэн байв."
                    },
                    "phonetic": "乗",
                    "phoneticReading": "ジョウ",
                    "enMn": "зорчигч"
                },
                {
                    "jp": "乗せる",
                    "reading": "のせる",
                    "en": "to place on (something)",
                    "meanings": [
                        "to place on (something)",
                        "to take on board"
                    ],
                    "example": {
                        "jp": "彼は私を彼の荷車に乗せてくれた。",
                        "en": "He gave me a lift in his cart.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>を<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>荷車<rp>(</rp><rt>にぐるま</rt><rp>)</rp></ruby>に<ruby>乗<rp>(</rp><rt>の</rt><rp>)</rp></ruby>せてくれた。",
                        "enMn": "Тэр намайг тэргэндээ авч явсан."
                    },
                    "phonetic": "乗",
                    "phoneticReading": "ジョウ",
                    "enMn": "дээр нь тавих"
                },
                {
                    "jp": "自慢",
                    "reading": "じまん",
                    "en": "pride",
                    "meanings": [
                        "pride",
                        "boast"
                    ],
                    "example": {
                        "jp": "父はハンサムなのを自慢している。",
                        "en": "My father is proud of being handsome.",
                        "furigana": "<ruby>父<rp>(</rp><rt>ちち</rt><rp>)</rp></ruby>はハンサムなのを<ruby>自慢<rp>(</rp><rt>じまん</rt><rp>)</rp></ruby>している。",
                        "enMn": "Аав минь өөрийн царайлаг байдлаараа бахархдаг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бахархал"
                },
                {
                    "jp": "芝居",
                    "reading": "しばい",
                    "en": "drama",
                    "meanings": [
                        "play",
                        "drama"
                    ],
                    "example": {
                        "jp": "彼は芝居を見に行くのが大好きだ。",
                        "en": "He adores going to the theater.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>芝居<rp>(</rp><rt>しばい</rt><rp>)</rp></ruby>を<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>に<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>くのが<ruby>大好<rp>(</rp><rt>だいす</rt><rp>)</rp></ruby>きだ。",
                        "enMn": "Тэр театрт очиход маш дуртай."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "жүжиг"
                },
                {
                    "jp": "質",
                    "reading": "しつ",
                    "en": "quality",
                    "meanings": [
                        "quality",
                        "nature (of person)"
                    ],
                    "example": {
                        "jp": "質より量の方がむしろ重要である。",
                        "en": "Quantity rather than quality is important.",
                        "furigana": "<ruby>質<rp>(</rp><rt>しつ</rt><rp>)</rp></ruby>より<ruby>量<rp>(</rp><rt>りょう</rt><rp>)</rp></ruby>の<ruby>方<rp>(</rp><rt>ほう</rt><rp>)</rp></ruby>がむしろ<ruby>重要<rp>(</rp><rt>じゅうよう</rt><rp>)</rp></ruby>である。",
                        "enMn": "Чанараас илүү тоо хэмжээ чухал юм."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "чанар"
                },
                {
                    "jp": "占める",
                    "reading": "しめる",
                    "en": "to take up",
                    "meanings": [
                        "to take up",
                        "to account for"
                    ],
                    "example": {
                        "jp": "与党は前の選挙で過半数を占めた。",
                        "en": "The government got their majority at the last election.",
                        "furigana": "<ruby>与党<rp>(</rp><rt>よとう</rt><rp>)</rp></ruby>は<ruby>前<rp>(</rp><rt>まえ</rt><rp>)</rp></ruby>の<ruby>選挙<rp>(</rp><rt>せんきょ</rt><rp>)</rp></ruby>で<ruby>過半数<rp>(</rp><rt>かはんすう</rt><rp>)</rp></ruby>を<ruby>占<rp>(</rp><rt>し</rt><rp>)</rp></ruby>めた。",
                        "enMn": "Засгийн эрх барьж буй нам өмнөх сонгуульд олонхийг авсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "эзлэх"
                },
                {
                    "jp": "失望",
                    "reading": "しつぼう",
                    "en": "disappointment",
                    "meanings": [
                        "disappointment",
                        "despair"
                    ],
                    "example": {
                        "jp": "彼らは互いに失望を感じている。",
                        "en": "They are disappointed with each other.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らは<ruby>互<rp>(</rp><rt>たが</rt><rp>)</rp></ruby>いに<ruby>失望<rp>(</rp><rt>しつぼう</rt><rp>)</rp></ruby>を<ruby>感<rp>(</rp><rt>かん</rt><rp>)</rp></ruby>じている。",
                        "enMn": "Тэд бие биедээ урам хугарсан байна."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "гутрал"
                },
                {
                    "jp": "沈む",
                    "reading": "しずむ",
                    "en": "to sink",
                    "meanings": [
                        "to sink",
                        "to feel depressed"
                    ],
                    "example": {
                        "jp": "陽は知らぬ間に地平線下に沈んだ。",
                        "en": "The sun sank below the horizon before I knew it.",
                        "furigana": "<ruby>陽<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>は<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>らぬ<ruby>間<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>に<ruby>地平線<rp>(</rp><rt>ちへいせん</rt><rp>)</rp></ruby><ruby>下<rp>(</rp><rt>か</rt><rp>)</rp></ruby>に<ruby>沈<rp>(</rp><rt>しず</rt><rp>)</rp></ruby>んだ。",
                        "enMn": "Нар мэдэхгүй л байтал тэнгэрийн хаяанаас доош шингэв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "живэх"
                }
            ]
        ]
    },
    {
        "level": 26,
        "jlpt": "N3",
        "title": "N3 · Level 6",
        "sets": [
            [
                {
                    "jp": "資源",
                    "reading": "しげん",
                    "en": "resources",
                    "meanings": [
                        "resources"
                    ],
                    "example": {
                        "jp": "日本は天然資源に富んでいない。",
                        "en": "Japan is not abundant in natural resources.",
                        "furigana": "<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>は<ruby>天然<rp>(</rp><rt>てんねん</rt><rp>)</rp></ruby><ruby>資源<rp>(</rp><rt>しげん</rt><rp>)</rp></ruby>に<ruby>富<rp>(</rp><rt>と</rt><rp>)</rp></ruby>んでいない。",
                        "enMn": "Япон байгалийн баялгаар баян биш."
                    },
                    "phonetic": "次",
                    "phoneticReading": "シ",
                    "enMn": "нөөц баялаг"
                },
                {
                    "jp": "資本",
                    "reading": "しほん",
                    "en": "funds",
                    "meanings": [
                        "funds",
                        "capital"
                    ],
                    "example": {
                        "jp": "会社はその事業に資本参加した。",
                        "en": "The company bought shares in the venture.",
                        "furigana": "<ruby>会社<rp>(</rp><rt>かいしゃ</rt><rp>)</rp></ruby>はその<ruby>事業<rp>(</rp><rt>じぎょう</rt><rp>)</rp></ruby>に<ruby>資本<rp>(</rp><rt>しほん</rt><rp>)</rp></ruby><ruby>参加<rp>(</rp><rt>さんか</rt><rp>)</rp></ruby>した。",
                        "enMn": "Компани тэр бизнест хувьцаа худалдаж авав."
                    },
                    "phonetic": "次",
                    "phoneticReading": "シ",
                    "enMn": "хөрөнгө"
                },
                {
                    "jp": "示す",
                    "reading": "しめす",
                    "en": "to show",
                    "meanings": [
                        "to show",
                        "to indicate"
                    ],
                    "example": {
                        "jp": "彼女はピアノに非凡な腕を示した。",
                        "en": "She showed great skill on the piano.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はピアノに<ruby>非凡<rp>(</rp><rt>ひぼん</rt><rp>)</rp></ruby>な<ruby>腕<rp>(</rp><rt>うで</rt><rp>)</rp></ruby>を<ruby>示<rp>(</rp><rt>しめ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр төгөлдөр хуурт гайхалтай ур чадвар үзүүлэв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "үзүүлэх"
                },
                {
                    "jp": "実現",
                    "reading": "じつげん",
                    "en": "implementation",
                    "meanings": [
                        "implementation",
                        "materialization",
                        "realization"
                    ],
                    "example": {
                        "jp": "彼女の夢はいつか実現するだろう。",
                        "en": "Her dream will one day come true.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>の<ruby>夢<rp>(</rp><rt>ゆめ</rt><rp>)</rp></ruby>はいつか<ruby>実現<rp>(</rp><rt>じつげん</rt><rp>)</rp></ruby>するだろう。",
                        "enMn": "Түүний мөрөөдөл нэг л өдөр биелэх болно."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хэрэгжилт"
                },
                {
                    "jp": "実は",
                    "reading": "じつは",
                    "en": "in fact",
                    "meanings": [
                        "actually",
                        "in fact"
                    ],
                    "example": {
                        "jp": "実はこれで４度目の質問になります。",
                        "en": "Actually this will be my fourth question.",
                        "furigana": "<ruby>実<rp>(</rp><rt>じつ</rt><rp>)</rp></ruby>はこれで４<ruby>度目<rp>(</rp><rt>どめ</rt><rp>)</rp></ruby>の<ruby>質問<rp>(</rp><rt>しつもん</rt><rp>)</rp></ruby>になります。",
                        "enMn": "Үнэндээ энэ бол миний дөрөв дэх асуулт болно."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "үнэндээ"
                },
                {
                    "jp": "自動",
                    "reading": "じどう",
                    "en": "automatic",
                    "meanings": [
                        "automatic",
                        "self-motion"
                    ],
                    "example": {
                        "jp": "この自動販売機は故障しています。",
                        "en": "This vending machine is out of order.",
                        "furigana": "この<ruby>自動<rp>(</rp><rt>じどう</rt><rp>)</rp></ruby><ruby>販売<rp>(</rp><rt>はんばい</rt><rp>)</rp></ruby><ruby>機<rp>(</rp><rt>き</rt><rp>)</rp></ruby>は<ruby>故障<rp>(</rp><rt>こしょう</rt><rp>)</rp></ruby>しています。",
                        "enMn": "Энэ автомат худалдааны машин эвдэрсэн байна."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "автомат"
                },
                {
                    "jp": "舌",
                    "reading": "した",
                    "en": "tongue",
                    "meanings": [
                        "tongue"
                    ],
                    "example": {
                        "jp": "彼は鏡をとって舌をよく観察した。",
                        "en": "He picked up a mirror and examined his tongue.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>鏡<rp>(</rp><rt>かがみ</rt><rp>)</rp></ruby>をとって<ruby>舌<rp>(</rp><rt>した</rt><rp>)</rp></ruby>をよく<ruby>観察<rp>(</rp><rt>かんさつ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр толь авч, хэлээ шалгав."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хэл (амны)"
                },
                {
                    "jp": "児童",
                    "reading": "じどう",
                    "en": "children",
                    "meanings": [
                        "children",
                        "juvenile"
                    ],
                    "example": {
                        "jp": "図書館にはたくさんの児童書がある。",
                        "en": "We have a lot of children's books in the library.",
                        "furigana": "<ruby>図書館<rp>(</rp><rt>としょかん</rt><rp>)</rp></ruby>にはたくさんの<ruby>児童<rp>(</rp><rt>じどう</rt><rp>)</rp></ruby><ruby>書<rp>(</rp><rt>しょ</rt><rp>)</rp></ruby>がある。",
                        "enMn": "Номын санд олон хүүхдийн ном байдаг."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүүхдүүд"
                },
                {
                    "jp": "死亡",
                    "reading": "しぼう",
                    "en": "death",
                    "meanings": [
                        "death"
                    ],
                    "example": {
                        "jp": "飛行機事故で多くの人が死亡した。",
                        "en": "Many people were killed in the plane accident.",
                        "furigana": "<ruby>飛行機<rp>(</rp><rt>ひこうき</rt><rp>)</rp></ruby><ruby>事故<rp>(</rp><rt>じこ</rt><rp>)</rp></ruby>で<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>くの<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>が<ruby>死亡<rp>(</rp><rt>しぼう</rt><rp>)</rp></ruby>した。",
                        "enMn": "Онгоцны ослоор олон хүн нас барсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "нас барах"
                },
                {
                    "jp": "失業",
                    "reading": "しつぎょう",
                    "en": "unemployment",
                    "meanings": [
                        "unemployment"
                    ],
                    "example": {
                        "jp": "討論での重点は失業問題であった。",
                        "en": "In the discussion the accent was on unemployment.",
                        "furigana": "<ruby>討論<rp>(</rp><rt>とうろん</rt><rp>)</rp></ruby>での<ruby>重点<rp>(</rp><rt>じゅうてん</rt><rp>)</rp></ruby>は<ruby>失業<rp>(</rp><rt>しつぎょう</rt><rp>)</rp></ruby><ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>であった。",
                        "enMn": "Хэлэлцүүлэгт ажилгүйдлийн асуудал төвд байсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ажилгүйдэл"
                }
            ]
        ]
    },
    {
        "level": 27,
        "jlpt": "N3",
        "title": "N3 · Level 7",
        "sets": [
            [
                {
                    "jp": "幸せ",
                    "reading": "しあわせ",
                    "en": "happiness",
                    "meanings": [
                        "happiness",
                        "blessing"
                    ],
                    "example": {
                        "jp": "彼女は彼の子を妊娠して幸せです。",
                        "en": "She is happy to have conceived a baby by him.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>子<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>を<ruby>妊娠<rp>(</rp><rt>にんしん</rt><rp>)</rp></ruby>して<ruby>幸<rp>(</rp><rt>しあわ</rt><rp>)</rp></ruby>せです。",
                        "enMn": "Тэр түүнээс жирэмссэндээ баяртай байна."
                    },
                    "phonetic": "幸",
                    "phoneticReading": "コウ",
                    "enMn": "аз жаргал"
                },
                {
                    "jp": "幸運",
                    "reading": "こううん",
                    "en": "good luck",
                    "meanings": [
                        "good luck",
                        "fortune"
                    ],
                    "example": {
                        "jp": "彼女は隣の人の幸運を妬んでいた。",
                        "en": "She was jealous of her neighbor's good fortune.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>隣<rp>(</rp><rt>となり</rt><rp>)</rp></ruby>の<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>の<ruby>幸運<rp>(</rp><rt>こううん</rt><rp>)</rp></ruby>を<ruby>妬<rp>(</rp><rt>ねた</rt><rp>)</rp></ruby>んでいた。",
                        "enMn": "Тэр хөршийнхөө азад атаархаж байв."
                    },
                    "phonetic": "幸",
                    "phoneticReading": "コウ",
                    "enMn": "азтай явдал"
                },
                {
                    "jp": "少女",
                    "reading": "しょうじょ",
                    "en": "young girl",
                    "meanings": [
                        "young girl"
                    ],
                    "example": {
                        "jp": "本を読んでいる少女はケートだ。",
                        "en": "The girl reading a book is Kate.",
                        "furigana": "<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>を<ruby>読<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んでいる<ruby>少女<rp>(</rp><rt>しょうじょ</rt><rp>)</rp></ruby>はケートだ。",
                        "enMn": "Ном уншиж буй охин бол Кэйт юм."
                    },
                    "phonetic": "少",
                    "phoneticReading": "ショウ、サ",
                    "enMn": "залуу охин"
                },
                {
                    "jp": "少々",
                    "reading": "しょうしょう",
                    "en": "a little",
                    "meanings": [
                        "a little",
                        "short (time) (formal for 少し (すこし))"
                    ],
                    "example": {
                        "jp": "彼女の態度は少々腹にすえかねる。",
                        "en": "I find her manner a little hard to take.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>の<ruby>態度<rp>(</rp><rt>たいど</rt><rp>)</rp></ruby>は<ruby>少々<rp>(</rp><rt>しょうしょう</rt><rp>)</rp></ruby><ruby>腹<rp>(</rp><rt>はら</rt><rp>)</rp></ruby>にすえかねる。",
                        "enMn": "Түүний зан авир надад бага зэрэг хүлцэхэд хэцүү санагддаг."
                    },
                    "phonetic": "少",
                    "phoneticReading": "ショウ、サ",
                    "enMn": "бага зэрэг"
                },
                {
                    "jp": "住民",
                    "reading": "じゅうみん",
                    "en": "inhabitants",
                    "meanings": [
                        "inhabitants",
                        "residents"
                    ],
                    "example": {
                        "jp": "住民は低空飛行訓練に抗議を行った。",
                        "en": "The people protested against the low altitude flight training.",
                        "furigana": "<ruby>住民<rp>(</rp><rt>じゅうみん</rt><rp>)</rp></ruby>は<ruby>低空<rp>(</rp><rt>ていくう</rt><rp>)</rp></ruby><ruby>飛行<rp>(</rp><rt>ひこう</rt><rp>)</rp></ruby><ruby>訓練<rp>(</rp><rt>くんれん</rt><rp>)</rp></ruby>に<ruby>抗議<rp>(</rp><rt>こうぎ</rt><rp>)</rp></ruby>を<ruby>行<rp>(</rp><rt>おこな</rt><rp>)</rp></ruby>った。",
                        "enMn": "Хүмүүс намхан өндрийн нислэгийн сургалтын эсрэг эсэргүүцэл илэрхийлэв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "оршин суугчид"
                },
                {
                    "jp": "主義",
                    "reading": "しゅぎ",
                    "en": "doctrine",
                    "meanings": [
                        "doctrine",
                        "cause",
                        "principle"
                    ],
                    "example": {
                        "jp": "民主主義は政治形態の一つである。",
                        "en": "Democracy is one form of government.",
                        "furigana": "<ruby>民主<rp>(</rp><rt>みんしゅ</rt><rp>)</rp></ruby><ruby>主義<rp>(</rp><rt>しゅぎ</rt><rp>)</rp></ruby>は<ruby>政治<rp>(</rp><rt>せいじ</rt><rp>)</rp></ruby><ruby>形態<rp>(</rp><rt>けいたい</rt><rp>)</rp></ruby>の<ruby>一<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>つである。",
                        "enMn": "Ардчилал бол засгийн нэг хэлбэр юм."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сургаал"
                },
                {
                    "jp": "瞬間",
                    "reading": "しゅんかん",
                    "en": "moment",
                    "meanings": [
                        "moment",
                        "second"
                    ],
                    "example": {
                        "jp": "その瞬間、大音響とともに爆発した。",
                        "en": "At that instant it exploded with a great noise.",
                        "furigana": "その<ruby>瞬間<rp>(</rp><rt>しゅんかん</rt><rp>)</rp></ruby>、<ruby>大<rp>(</rp><rt>だい</rt><rp>)</rp></ruby><ruby>音響<rp>(</rp><rt>おんきょう</rt><rp>)</rp></ruby>とともに<ruby>爆発<rp>(</rp><rt>ばくはつ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр агшинд их чимээтэй дэлбэрсэн."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "агшин зуур"
                },
                {
                    "jp": "首都",
                    "reading": "しゅと",
                    "en": "capital city",
                    "meanings": [
                        "capital city"
                    ],
                    "example": {
                        "jp": "彼はフランスの首都パリへ行った。",
                        "en": "He went to Paris, which is the capital of France.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>はフランスの<ruby>首都<rp>(</rp><rt>しゅと</rt><rp>)</rp></ruby>パリへ<ruby>行<rp>(</rp><rt>い</rt><rp>)</rp></ruby>った。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "нийслэл хот"
                },
                {
                    "jp": "重視",
                    "reading": "じゅうし",
                    "en": "importance",
                    "meanings": [
                        "importance",
                        "stress"
                    ],
                    "example": {
                        "jp": "彼らは私の意見を重視しなかった。",
                        "en": "They didn't take much account of my opinion.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らは<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>の<ruby>意見<rp>(</rp><rt>いけん</rt><rp>)</rp></ruby>を<ruby>重視<rp>(</rp><rt>じゅうし</rt><rp>)</rp></ruby>しなかった。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ач холбогдол"
                },
                {
                    "jp": "手術",
                    "reading": "しゅじゅつ",
                    "en": "surgical operation",
                    "meanings": [
                        "surgical operation"
                    ],
                    "example": {
                        "jp": "父は手術を受ける事になっている。",
                        "en": "Father is going to undergo an operation.",
                        "furigana": "<ruby>父<rp>(</rp><rt>ちち</rt><rp>)</rp></ruby>は<ruby>手術<rp>(</rp><rt>しゅじゅつ</rt><rp>)</rp></ruby>を<ruby>受<rp>(</rp><rt>う</rt><rp>)</rp></ruby>ける<ruby>事<rp>(</rp><rt>こと</rt><rp>)</rp></ruby>になっている。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "мэс засал"
                }
            ]
        ]
    },
    {
        "level": 28,
        "jlpt": "N3",
        "title": "N3 · Level 8",
        "sets": [
            [
                {
                    "jp": "親しい",
                    "reading": "したしい",
                    "en": "intimate",
                    "meanings": [
                        "intimate",
                        "close (e.g., friend)"
                    ],
                    "example": {
                        "jp": "彼は会う人とは誰でも親しくなる。",
                        "en": "He makes friends with everybody he meets.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>会<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>う<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>とは<ruby>誰<rp>(</rp><rt>だれ</rt><rp>)</rp></ruby>でも<ruby>親<rp>(</rp><rt>した</rt><rp>)</rp></ruby>しくなる。"
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン",
                    "enMn": "дотно"
                },
                {
                    "jp": "親戚",
                    "reading": "しんせき",
                    "en": "relative(s)",
                    "meanings": [
                        "relative(s)"
                    ],
                    "example": {
                        "jp": "彼は彼女と遠い親戚関係にある。",
                        "en": "He is distantly related to her.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>と<ruby>遠<rp>(</rp><rt>とお</rt><rp>)</rp></ruby>い<ruby>親戚<rp>(</rp><rt>しんせき</rt><rp>)</rp></ruby><ruby>関係<rp>(</rp><rt>かんけい</rt><rp>)</rp></ruby>にある。"
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン",
                    "enMn": "төрөл садан"
                },
                {
                    "jp": "手段",
                    "reading": "しゅだん",
                    "en": "means",
                    "meanings": [
                        "means",
                        "way",
                        "measure"
                    ],
                    "example": {
                        "jp": "目的は手段を正当化するだろうか。",
                        "en": "Does the end justify the means?",
                        "furigana": "<ruby>目的<rp>(</rp><rt>もくてき</rt><rp>)</rp></ruby>は<ruby>手段<rp>(</rp><rt>しゅだん</rt><rp>)</rp></ruby>を<ruby>正当<rp>(</rp><rt>せいとう</rt><rp>)</rp></ruby><ruby>化<rp>(</rp><rt>か</rt><rp>)</rp></ruby>するだろうか。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "арга зам"
                },
                {
                    "jp": "修理",
                    "reading": "しゅうり",
                    "en": "repairing",
                    "meanings": [
                        "repairing",
                        "mending"
                    ],
                    "example": {
                        "jp": "父は器用で何でも修理してしまう。",
                        "en": "My father is good with tools and does almost all the repairs.",
                        "furigana": "<ruby>父<rp>(</rp><rt>ちち</rt><rp>)</rp></ruby>は<ruby>器用<rp>(</rp><rt>きよう</rt><rp>)</rp></ruby>で<ruby>何<rp>(</rp><rt>なに</rt><rp>)</rp></ruby>でも<ruby>修理<rp>(</rp><rt>しゅうり</rt><rp>)</rp></ruby>してしまう。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "засвар"
                },
                {
                    "jp": "出身",
                    "reading": "しゅっしん",
                    "en": "hometown",
                    "meanings": [
                        "come from"
                    ],
                    "example": {
                        "jp": "彼女はカリフォルニアの出身です。",
                        "en": "She comes from California.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はカリフォルニアの<ruby>出身<rp>(</rp><rt>しゅっしん</rt><rp>)</rp></ruby>です。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "төрсөн нутаг"
                },
                {
                    "jp": "収穫",
                    "reading": "しゅうかく",
                    "en": "harvest",
                    "meanings": [
                        "harvest",
                        "crop",
                        "ingathering"
                    ],
                    "example": {
                        "jp": "私たちはみな収穫の手伝いをした。",
                        "en": "We all helped with the harvest.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>たちはみな<ruby>収穫<rp>(</rp><rt>しゅうかく</rt><rp>)</rp></ruby>の<ruby>手伝<rp>(</rp><rt>てつだ</rt><rp>)</rp></ruby>いをした。",
                        "enMn": "Бид бүгд ургац хураахад туслалцсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ургац хураалт"
                },
                {
                    "jp": "集団",
                    "reading": "しゅうだん",
                    "en": "group",
                    "meanings": [
                        "group",
                        "mass"
                    ],
                    "example": {
                        "jp": "君はいまやエリート集団の一員だ。",
                        "en": "You are now among the elite.",
                        "furigana": "<ruby>君<rp>(</rp><rt>きみ</rt><rp>)</rp></ruby>はいまやエリート<ruby>集団<rp>(</rp><rt>しゅうだん</rt><rp>)</rp></ruby>の<ruby>一員<rp>(</rp><rt>いちいん</rt><rp>)</rp></ruby>だ。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бүлэг"
                },
                {
                    "jp": "修正",
                    "reading": "しゅうせい",
                    "en": "amendment",
                    "meanings": [
                        "amendment",
                        "correction"
                    ],
                    "example": {
                        "jp": "・テキストデータの誤字脱字を修正。",
                        "en": "・ Corrected mistaken/missing characters in the text data.",
                        "furigana": "・テキストデータの<ruby>誤字<rp>(</rp><rt>ごじ</rt><rp>)</rp></ruby><ruby>脱字<rp>(</rp><rt>だつじ</rt><rp>)</rp></ruby>を<ruby>修正<rp>(</rp><rt>しゅうせい</rt><rp>)</rp></ruby>。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "залруулга"
                },
                {
                    "jp": "首相",
                    "reading": "しゅしょう",
                    "en": "Prime Minister",
                    "meanings": [
                        "Prime Minister"
                    ],
                    "example": {
                        "jp": "彼は首相を辞めざるを得なかった。",
                        "en": "He was forced to resign as prime minister.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>首相<rp>(</rp><rt>しゅしょう</rt><rp>)</rp></ruby>を<ruby>辞<rp>(</rp><rt>や</rt><rp>)</rp></ruby>めざるを<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>なかった。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ерөнхий сайд"
                },
                {
                    "jp": "主要",
                    "reading": "しゅよう",
                    "en": "main",
                    "meanings": [
                        "chief",
                        "main"
                    ],
                    "example": {
                        "jp": "米はそれら主要商品の一つだ。",
                        "en": "Rice is one of those staple commodities.",
                        "furigana": "<ruby>米<rp>(</rp><rt>べい</rt><rp>)</rp></ruby>はそれら<ruby>主要<rp>(</rp><rt>しゅよう</rt><rp>)</rp></ruby><ruby>商品<rp>(</rp><rt>しょうひん</rt><rp>)</rp></ruby>の<ruby>一<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>つだ。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "гол"
                }
            ]
        ]
    },
    {
        "level": 29,
        "jlpt": "N3",
        "title": "N3 · Level 9",
        "sets": [
            [
                {
                    "jp": "種類",
                    "reading": "しゅるい",
                    "en": "variety",
                    "meanings": [
                        "variety",
                        "kind"
                    ],
                    "example": {
                        "jp": "彼はあらゆる種類の人と接触する。",
                        "en": "He comes into contact with all kinds of people.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>はあらゆる<ruby>種類<rp>(</rp><rt>しゅるい</rt><rp>)</rp></ruby>の<ruby>人<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>と<ruby>接触<rp>(</rp><rt>せっしょく</rt><rp>)</rp></ruby>する。"
                    },
                    "phonetic": "重",
                    "phoneticReading": "シュ",
                    "enMn": "төрөл зүйл"
                },
                {
                    "jp": "種",
                    "reading": "たね",
                    "en": "seed",
                    "meanings": [
                        "seed",
                        "material",
                        "cause"
                    ],
                    "example": {
                        "jp": "彼は種からトマトの苗を育てた。",
                        "en": "He raised tomato plants from seed.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>種<rp>(</rp><rt>たね</rt><rp>)</rp></ruby>からトマトの<ruby>苗<rp>(</rp><rt>なえ</rt><rp>)</rp></ruby>を<ruby>育<rp>(</rp><rt>そだ</rt><rp>)</rp></ruby>てた。"
                    },
                    "phonetic": "重",
                    "phoneticReading": "シュ",
                    "enMn": "үр"
                },
                {
                    "jp": "職業",
                    "reading": "しょくぎょう",
                    "en": "occupation",
                    "meanings": [
                        "occupation",
                        "business"
                    ],
                    "example": {
                        "jp": "婦人に開放されている職業は多い。",
                        "en": "There are many careers open to women.",
                        "furigana": "<ruby>婦人<rp>(</rp><rt>ふじん</rt><rp>)</rp></ruby>に<ruby>開放<rp>(</rp><rt>かいほう</rt><rp>)</rp></ruby>されている<ruby>職業<rp>(</rp><rt>しょくぎょう</rt><rp>)</rp></ruby>は<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>い。"
                    },
                    "phonetic": "戠",
                    "phoneticReading": "シキ、ショク",
                    "enMn": "мэргэжил"
                },
                {
                    "jp": "職",
                    "reading": "しょく",
                    "en": "employment",
                    "meanings": [
                        "employment"
                    ],
                    "example": {
                        "jp": "貴職らにとっては重要なことです。",
                        "en": "This is an important thing for all of you.",
                        "furigana": "<ruby>貴<rp>(</rp><rt>き</rt><rp>)</rp></ruby><ruby>職<rp>(</rp><rt>しょく</rt><rp>)</rp></ruby>らにとっては<ruby>重要<rp>(</rp><rt>じゅうよう</rt><rp>)</rp></ruby>なことです。",
                        "enMn": "Энэ бол та бүхэнд чухал зүйл юм."
                    },
                    "phonetic": "戠",
                    "phoneticReading": "シキ、ショク",
                    "enMn": "ажил эрхлэлт"
                },
                {
                    "jp": "書類",
                    "reading": "しょるい",
                    "en": "documents",
                    "meanings": [
                        "documents",
                        "official papers"
                    ],
                    "example": {
                        "jp": "彼は書類を折り畳んで時計を見た。",
                        "en": "He folded his paper, consulting his watch.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>書類<rp>(</rp><rt>しょるい</rt><rp>)</rp></ruby>を<ruby>折<rp>(</rp><rt>お</rt><rp>)</rp></ruby>り<ruby>畳<rp>(</rp><rt>たた</rt><rp>)</rp></ruby>んで<ruby>時計<rp>(</rp><rt>とけい</rt><rp>)</rp></ruby>を<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>た。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бичиг баримт"
                },
                {
                    "jp": "商売",
                    "reading": "しょうばい",
                    "en": "business",
                    "meanings": [
                        "trade",
                        "business",
                        "commerce"
                    ],
                    "example": {
                        "jp": "彼は父からその商売を引き継いだ。",
                        "en": "He took over the business from his father.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>父<rp>(</rp><rt>ちち</rt><rp>)</rp></ruby>からその<ruby>商売<rp>(</rp><rt>しょうばい</rt><rp>)</rp></ruby>を<ruby>引<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>き<ruby>継<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>いだ。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "худалдаа"
                },
                {
                    "jp": "食欲",
                    "reading": "しょくよく",
                    "en": "appetite",
                    "meanings": [
                        "appetite (for food)"
                    ],
                    "example": {
                        "jp": "あんたのせいで食欲をなくしたよ。",
                        "en": "Thanks to you I've lost my appetite.",
                        "furigana": "あんたのせいで<ruby>食欲<rp>(</rp><rt>しょくよく</rt><rp>)</rp></ruby>をなくしたよ。",
                        "enMn": "Чиний л буруугаас надад хоолны дур хүрэхээ больжээ."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хоолны дуршил"
                },
                {
                    "jp": "上達",
                    "reading": "じょうたつ",
                    "en": "improvement",
                    "meanings": [
                        "improvement",
                        "advance"
                    ],
                    "example": {
                        "jp": "彼もやがて英語が上達するであろう。",
                        "en": "His English will improve in the course of time.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>もやがて<ruby>英語<rp>(</rp><rt>えいご</rt><rp>)</rp></ruby>が<ruby>上達<rp>(</rp><rt>じょうたつ</rt><rp>)</rp></ruby>するであろう。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дэвшил"
                },
                {
                    "jp": "条件",
                    "reading": "じょうけん",
                    "en": "condition",
                    "meanings": [
                        "conditions",
                        "terms"
                    ],
                    "example": {
                        "jp": "彼女は条件が不公平だと言い張る。",
                        "en": "She will have it that the conditions are unfair.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>条件<rp>(</rp><rt>じょうけん</rt><rp>)</rp></ruby>が<ruby>不公平<rp>(</rp><rt>ふこうへい</rt><rp>)</rp></ruby>だと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>い<ruby>張<rp>(</rp><rt>は</rt><rp>)</rp></ruby>る。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "нөхцөл"
                },
                {
                    "jp": "冗談",
                    "reading": "じょうだん",
                    "en": "a joke",
                    "meanings": [
                        "a joke"
                    ],
                    "example": {
                        "jp": "彼女はその冗談をおもしろがった。",
                        "en": "She was amused at the joke.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はその<ruby>冗談<rp>(</rp><rt>じょうだん</rt><rp>)</rp></ruby>をおもしろがった。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "шог үг"
                }
            ]
        ]
    },
    {
        "level": 30,
        "jlpt": "N3",
        "title": "N3 · Level 10",
        "sets": [
            [
                {
                    "jp": "週",
                    "reading": "しゅう",
                    "en": "week",
                    "meanings": [
                        "week"
                    ],
                    "example": {
                        "jp": "彼女は週に１度両親に手紙を出す。",
                        "en": "She writes to her parents once a week.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>週<rp>(</rp><rt>しゅう</rt><rp>)</rp></ruby>に１<ruby>度<rp>(</rp><rt>ど</rt><rp>)</rp></ruby><ruby>両親<rp>(</rp><rt>りょうしん</rt><rp>)</rp></ruby>に<ruby>手紙<rp>(</rp><rt>てがみ</rt><rp>)</rp></ruby>を<ruby>出<rp>(</rp><rt>だ</rt><rp>)</rp></ruby>す。"
                    },
                    "phonetic": "周",
                    "phoneticReading": "シュウ、チョウ",
                    "enMn": "долоо хоног"
                },
                {
                    "jp": "周囲",
                    "reading": "しゅうい",
                    "en": "surroundings",
                    "meanings": [
                        "surroundings",
                        "circumference",
                        "environs"
                    ],
                    "example": {
                        "jp": "僕らの周囲で水はよどんでいた。",
                        "en": "The water was dead around us.",
                        "furigana": "<ruby>僕<rp>(</rp><rt>ぼく</rt><rp>)</rp></ruby>らの<ruby>周囲<rp>(</rp><rt>しゅうい</rt><rp>)</rp></ruby>で<ruby>水<rp>(</rp><rt>みず</rt><rp>)</rp></ruby>はよどんでいた。"
                    },
                    "phonetic": "周",
                    "phoneticReading": "シュウ、チョウ",
                    "enMn": "орчин тойрон"
                },
                {
                    "jp": "処理",
                    "reading": "しょり",
                    "en": "processing",
                    "meanings": [
                        "processing",
                        "treatment",
                        "disposition"
                    ],
                    "example": {
                        "jp": "彼は難問をうまく処理するだろう。",
                        "en": "He'll cope with difficult problems.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>難問<rp>(</rp><rt>なんもん</rt><rp>)</rp></ruby>をうまく<ruby>処理<rp>(</rp><rt>しょり</rt><rp>)</rp></ruby>するだろう。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "боловсруулалт"
                },
                {
                    "jp": "商品",
                    "reading": "しょうひん",
                    "en": "commodity",
                    "meanings": [
                        "commodity",
                        "merchandise"
                    ],
                    "example": {
                        "jp": "彼女の商品の半分は安く売られた。",
                        "en": "Half her goods were sold cheap.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>の<ruby>商品<rp>(</rp><rt>しょうひん</rt><rp>)</rp></ruby>の<ruby>半分<rp>(</rp><rt>はんぶん</rt><rp>)</rp></ruby>は<ruby>安<rp>(</rp><rt>やす</rt><rp>)</rp></ruby>く<ruby>売<rp>(</rp><rt>う</rt><rp>)</rp></ruby>られた。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бараа бүтээгдэхүүн"
                },
                {
                    "jp": "常識",
                    "reading": "じょうしき",
                    "en": "common sense",
                    "meanings": [
                        "common sense"
                    ],
                    "example": {
                        "jp": "彼は常識に欠けているに違いない。",
                        "en": "He must be lacking in common sense.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>常識<rp>(</rp><rt>じょうしき</rt><rp>)</rp></ruby>に<ruby>欠<rp>(</rp><rt>か</rt><rp>)</rp></ruby>けているに<ruby>違<rp>(</rp><rt>ちが</rt><rp>)</rp></ruby>いない。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "эгэл ойлголт"
                },
                {
                    "jp": "衝突",
                    "reading": "しょうとつ",
                    "en": "collision",
                    "meanings": [
                        "collision",
                        "conflict"
                    ],
                    "example": {
                        "jp": "上海で二つの旅客列車が衝突した。",
                        "en": "Two passenger trains crashed in Shanghai.",
                        "furigana": "<ruby>上海<rp>(</rp><rt>しゃんはい</rt><rp>)</rp></ruby>で<ruby>二<rp>(</rp><rt>ふた</rt><rp>)</rp></ruby>つの<ruby>旅客<rp>(</rp><rt>りょかく</rt><rp>)</rp></ruby><ruby>列車<rp>(</rp><rt>れっしゃ</rt><rp>)</rp></ruby>が<ruby>衝突<rp>(</rp><rt>しょうとつ</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "мөргөлдөөн"
                },
                {
                    "jp": "女優",
                    "reading": "じょゆう",
                    "en": "actress",
                    "meanings": [
                        "actress"
                    ],
                    "example": {
                        "jp": "彼女は女優になることを志した。",
                        "en": "She aimed to become an actress.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>女優<rp>(</rp><rt>じょゆう</rt><rp>)</rp></ruby>になることを<ruby>志<rp>(</rp><rt>こころざ</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "жүжигчин эмэгтэй"
                },
                {
                    "jp": "状態",
                    "reading": "じょうたい",
                    "en": "state",
                    "meanings": [
                        "condition",
                        "situation"
                    ],
                    "example": {
                        "jp": "横には喧嘩状態の妻が眠っている。",
                        "en": "To my side, my wife, who I'm presently at odds with, lies sleeping.",
                        "furigana": "<ruby>横<rp>(</rp><rt>よこ</rt><rp>)</rp></ruby>には<ruby>喧嘩<rp>(</rp><rt>けんか</rt><rp>)</rp></ruby><ruby>状態<rp>(</rp><rt>じょうたい</rt><rp>)</rp></ruby>の<ruby>妻<rp>(</rp><rt>つま</rt><rp>)</rp></ruby>が<ruby>眠<rp>(</rp><rt>ねむ</rt><rp>)</rp></ruby>っている。",
                        "enMn": "Миний хажууд одоогоор муудалцаж буй эхнэр минь унтаж хэвтэж байна."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "байдал"
                },
                {
                    "jp": "順調",
                    "reading": "じゅんちょう",
                    "en": "going well",
                    "meanings": [
                        "doing well"
                    ],
                    "example": {
                        "jp": "猛吹雪に遭うまでは順調に進んだ。",
                        "en": "We made good time until we ran into a blizzard.",
                        "furigana": "<ruby>猛<rp>(</rp><rt>もう</rt><rp>)</rp></ruby><ruby>吹雪<rp>(</rp><rt>ふぶき</rt><rp>)</rp></ruby>に<ruby>遭<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>うまでは<ruby>順調<rp>(</rp><rt>じゅんちょう</rt><rp>)</rp></ruby>に<ruby>進<rp>(</rp><rt>すす</rt><rp>)</rp></ruby>んだ。",
                        "enMn": "Бид цасан шуурганд орох хүртлээ сайн явж байсан."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "амжилттай явж буй"
                },
                {
                    "jp": "状況",
                    "reading": "じょうきょう",
                    "en": "situation",
                    "meanings": [
                        "state of affairs",
                        "situation"
                    ],
                    "example": {
                        "jp": "状況証拠としちゃあ、十分だね。",
                        "en": "For circumstantial evidence, that's plenty.",
                        "furigana": "<ruby>状況<rp>(</rp><rt>じょうきょう</rt><rp>)</rp></ruby><ruby>証拠<rp>(</rp><rt>しょうこ</rt><rp>)</rp></ruby>としちゃあ、<ruby>十分<rp>(</rp><rt>じゅうぶん</rt><rp>)</rp></ruby>だね。",
                        "enMn": "Шууд бус нотолгооны хувьд энэ хангалттай."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "нөхцөл байдал"
                }
            ]
        ]
    },
    {
        "level": 31,
        "jlpt": "N2",
        "title": "N2 · Level 1",
        "sets": [
            [
                {
                    "jp": "消化",
                    "reading": "しょうか",
                    "en": "digestion",
                    "meanings": [
                        "digestion"
                    ],
                    "example": {
                        "jp": "自然食は人間の消化に合っている。",
                        "en": "A natural diet is suitable for human digestion.",
                        "furigana": "<ruby>自然<rp>(</rp><rt>しぜん</rt><rp>)</rp></ruby><ruby>食<rp>(</rp><rt>しょく</rt><rp>)</rp></ruby>は<ruby>人間<rp>(</rp><rt>にんげん</rt><rp>)</rp></ruby>の<ruby>消化<rp>(</rp><rt>しょうか</rt><rp>)</rp></ruby>に<ruby>合<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>っている。"
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ",
                    "enMn": "хоол боловсруулалт"
                },
                {
                    "jp": "消極的",
                    "reading": "しょうきょくてき",
                    "en": "passive",
                    "meanings": [
                        "passive"
                    ],
                    "example": {
                        "jp": "警察が医療事故の立件に消極的だ。",
                        "en": "The police are reluctant to pursue criminal charges in medical cases.",
                        "furigana": "<ruby>警察<rp>(</rp><rt>けいさつ</rt><rp>)</rp></ruby>が<ruby>医療<rp>(</rp><rt>いりょう</rt><rp>)</rp></ruby><ruby>事故<rp>(</rp><rt>じこ</rt><rp>)</rp></ruby>の<ruby>立件<rp>(</rp><rt>りっけん</rt><rp>)</rp></ruby>に<ruby>消極<rp>(</rp><rt>しょうきょく</rt><rp>)</rp></ruby><ruby>的<rp>(</rp><rt>てき</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Цагдаа эмнэлгийн хэргүүдэд гэмт хэргийн хэрэг үүсгэхэд дур сонирхолгүй байна."
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ",
                    "enMn": "идэвхгүй"
                },
                {
                    "jp": "消耗",
                    "reading": "しょうもう",
                    "en": "exhaustion",
                    "meanings": [
                        "exhaustion",
                        "consumption"
                    ],
                    "example": {
                        "jp": "プリンターは、消耗品ですか？",
                        "en": "Are printers a non-durable good?",
                        "furigana": "プリンターは、<ruby>消耗<rp>(</rp><rt>しょうもう</rt><rp>)</rp></ruby><ruby>品<rp>(</rp><rt>ひん</rt><rp>)</rp></ruby>ですか？",
                        "enMn": "Принтер удаан эдэлгээгүй бараа мөн үү?"
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ",
                    "enMn": "ядрал"
                },
                {
                    "jp": "将棋",
                    "reading": "しょうぎ",
                    "en": "Japanese chess",
                    "meanings": [
                        "Japanese chess"
                    ],
                    "example": {
                        "jp": "日本の「将棋」は、チェスに相当する。",
                        "en": "Japanese shogi corresponds to chess.",
                        "furigana": "<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>の「<ruby>将棋<rp>(</rp><rt>しょうぎ</rt><rp>)</rp></ruby>」は、チェスに<ruby>相当<rp>(</rp><rt>そうとう</rt><rp>)</rp></ruby>する。",
                        "enMn": "Японы \"шоги\" нь шатартай төстэй юм."
                    },
                    "phonetic": "将",
                    "phoneticReading": "ショウ",
                    "enMn": "шоги"
                },
                {
                    "jp": "乗車",
                    "reading": "じょうしゃ",
                    "en": "boarding a train",
                    "meanings": [
                        "taking a train",
                        "entraining"
                    ],
                    "example": {
                        "jp": "この列車乗車券は３カ月有効だ。",
                        "en": "This ticket is valid for three months.",
                        "furigana": "この<ruby>列車<rp>(</rp><rt>れっしゃ</rt><rp>)</rp></ruby><ruby>乗車<rp>(</rp><rt>じょうしゃ</rt><rp>)</rp></ruby><ruby>券<rp>(</rp><rt>けん</rt><rp>)</rp></ruby>は３カ<ruby>月<rp>(</rp><rt>げつ</rt><rp>)</rp></ruby><ruby>有効<rp>(</rp><rt>ゆうこう</rt><rp>)</rp></ruby>だ。"
                    },
                    "phonetic": "乗",
                    "phoneticReading": "ジョウ",
                    "enMn": "галт тэрэгт суух"
                },
                {
                    "jp": "性能",
                    "reading": "せいのう",
                    "en": "performance",
                    "meanings": [
                        "ability",
                        "capability"
                    ],
                    "example": {
                        "jp": "電気自動車の性能はよくなっている。",
                        "en": "The performance of electric cars has improved.",
                        "furigana": "<ruby>電気<rp>(</rp><rt>でんき</rt><rp>)</rp></ruby><ruby>自動車<rp>(</rp><rt>じどうしゃ</rt><rp>)</rp></ruby>の<ruby>性能<rp>(</rp><rt>せいのう</rt><rp>)</rp></ruby>はよくなっている。"
                    },
                    "phonetic": "生",
                    "phoneticReading": "セイ、ショウ",
                    "enMn": "гүйцэтгэл"
                },
                {
                    "jp": "賞金",
                    "reading": "しょうきん",
                    "en": "prize money",
                    "meanings": [
                        "prize",
                        "monetary award"
                    ],
                    "example": {
                        "jp": "協力者に対しては賞金が出ます。",
                        "en": "You'll get a reward for your cooperation.",
                        "furigana": "<ruby>協力<rp>(</rp><rt>きょうりょく</rt><rp>)</rp></ruby><ruby>者<rp>(</rp><rt>しゃ</rt><rp>)</rp></ruby>に<ruby>対<rp>(</rp><rt>たい</rt><rp>)</rp></ruby>しては<ruby>賞金<rp>(</rp><rt>しょうきん</rt><rp>)</rp></ruby>が<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>ます。"
                    },
                    "phonetic": "尚",
                    "phoneticReading": "ショウ",
                    "enMn": "шагналын мөнгө"
                },
                {
                    "jp": "就任",
                    "reading": "しゅうにん",
                    "en": "inauguration",
                    "meanings": [
                        "inauguration",
                        "assumption of office"
                    ],
                    "example": {
                        "jp": "彼らは彼を委員会の議長に就任させた。",
                        "en": "They installed him as chairman of the committee.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らは<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>を<ruby>委員<rp>(</rp><rt>いいん</rt><rp>)</rp></ruby><ruby>会<rp>(</rp><rt>かい</rt><rp>)</rp></ruby>の<ruby>議長<rp>(</rp><rt>ぎちょう</rt><rp>)</rp></ruby>に<ruby>就任<rp>(</rp><rt>しゅうにん</rt><rp>)</rp></ruby>させた。"
                    },
                    "phonetic": "就",
                    "phoneticReading": "シュウ",
                    "enMn": "албан тушаалд томилогдох"
                },
                {
                    "jp": "熟語",
                    "reading": "じゅくご",
                    "en": "idiom",
                    "meanings": [
                        "idiom",
                        "kanji compound"
                    ],
                    "example": {
                        "jp": "日本語は四字熟語って結構あるね。",
                        "en": "There are lots of four-character compound words in Japanese, huh?",
                        "furigana": "<ruby>日本語<rp>(</rp><rt>にほんご</rt><rp>)</rp></ruby>は<ruby>四<rp>(</rp><rt>よん</rt><rp>)</rp></ruby><ruby>字<rp>(</rp><rt>じ</rt><rp>)</rp></ruby><ruby>熟語<rp>(</rp><rt>じゅくご</rt><rp>)</rp></ruby>って<ruby>結構<rp>(</rp><rt>けっこう</rt><rp>)</rp></ruby>あるね。"
                    },
                    "phonetic": "孰",
                    "phoneticReading": "ジュク",
                    "enMn": "хэлц үг"
                },
                {
                    "jp": "垂直",
                    "reading": "すいちょく",
                    "en": "vertical",
                    "meanings": [
                        "vertical",
                        "perpendicular"
                    ],
                    "example": {
                        "jp": "その柱は垂直になっていない。",
                        "en": "That pole is not quite vertical.",
                        "furigana": "その<ruby>柱<rp>(</rp><rt>はしら</rt><rp>)</rp></ruby>は<ruby>垂直<rp>(</rp><rt>すいちょく</rt><rp>)</rp></ruby>になっていない。"
                    },
                    "phonetic": "垂",
                    "phoneticReading": "スイ",
                    "enMn": "босоо"
                }
            ]
        ]
    },
    {
        "level": 32,
        "jlpt": "N2",
        "title": "N2 · Level 2",
        "sets": [
            [
                {
                    "jp": "受験",
                    "reading": "じゅけん",
                    "en": "taking an exam",
                    "meanings": [
                        "taking an examination"
                    ],
                    "example": {
                        "jp": "受験地獄での戦いが終わりました。",
                        "en": "My fight in our examination hell is over!",
                        "furigana": "<ruby>受験<rp>(</rp><rt>じゅけん</rt><rp>)</rp></ruby><ruby>地獄<rp>(</rp><rt>じごく</rt><rp>)</rp></ruby>での<ruby>戦<rp>(</rp><rt>たたか</rt><rp>)</rp></ruby>いが<ruby>終<rp>(</rp><rt>お</rt><rp>)</rp></ruby>わりました。"
                    },
                    "phonetic": "受",
                    "phoneticReading": "ジュ",
                    "enMn": "шалгалт өгөх"
                },
                {
                    "jp": "受話器",
                    "reading": "じゅわき",
                    "en": "telephone receiver",
                    "meanings": [
                        "(telephone) receiver"
                    ],
                    "example": {
                        "jp": "彼は座るとすぐに受話器をとった。",
                        "en": "As soon as he sat down, he picked up the telephone.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>座<rp>(</rp><rt>すわ</rt><rp>)</rp></ruby>るとすぐに<ruby>受話器<rp>(</rp><rt>じゅわき</rt><rp>)</rp></ruby>をとった。"
                    },
                    "phonetic": "受",
                    "phoneticReading": "ジュ",
                    "enMn": "утасны сонсгуур"
                },
                {
                    "jp": "定規",
                    "reading": "じょうぎ",
                    "en": "ruler",
                    "meanings": [
                        "(measuring) ruler"
                    ],
                    "example": {
                        "jp": "私は本を買い、彼は定規を買った。",
                        "en": "I bought a book and he a ruler.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>を<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>い、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>定規<rp>(</rp><rt>じょうぎ</rt><rp>)</rp></ruby>を<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>った。"
                    },
                    "phonetic": "定",
                    "phoneticReading": "ジョウ、テイ",
                    "enMn": "шугам"
                },
                {
                    "jp": "定員",
                    "reading": "ていいん",
                    "en": "fixed number of regular personnel",
                    "meanings": [
                        "fixed number of regular personnel",
                        "capacity (e.g., of boat)"
                    ],
                    "example": {
                        "jp": "このエレベーターの定員は１０人だ。",
                        "en": "This elevator's capacity is ten people.",
                        "furigana": "このエレベーターの<ruby>定員<rp>(</rp><rt>ていいん</rt><rp>)</rp></ruby>は１０<ruby>人<rp>(</rp><rt>にん</rt><rp>)</rp></ruby>だ。"
                    },
                    "phonetic": "定",
                    "phoneticReading": "ジョウ、テイ",
                    "enMn": "тогтмол ажилтны тоо"
                },
                {
                    "jp": "資料",
                    "reading": "しりょう",
                    "en": "materials",
                    "meanings": [
                        "materials",
                        "data"
                    ],
                    "example": {
                        "jp": "資料不足のため調査は中止された。",
                        "en": "In the absence of sufficient data, the survey was given up.",
                        "furigana": "<ruby>資料<rp>(</rp><rt>しりょう</rt><rp>)</rp></ruby><ruby>不足<rp>(</rp><rt>ふそく</rt><rp>)</rp></ruby>のため<ruby>調査<rp>(</rp><rt>ちょうさ</rt><rp>)</rp></ruby>は<ruby>中止<rp>(</rp><rt>ちゅうし</rt><rp>)</rp></ruby>された。"
                    },
                    "phonetic": "次",
                    "phoneticReading": "シ",
                    "enMn": "материал"
                },
                {
                    "jp": "障子",
                    "reading": "しょうじ",
                    "en": "sliding door",
                    "meanings": [
                        "paper sliding door"
                    ],
                    "example": {
                        "jp": "壁に耳あり、障子に目あり。",
                        "en": "Walls have ears, shoji have eyes.",
                        "furigana": "<ruby>壁<rp>(</rp><rt>かべ</rt><rp>)</rp></ruby>に<ruby>耳<rp>(</rp><rt>みみ</rt><rp>)</rp></ruby>あり、<ruby>障子<rp>(</rp><rt>しょうじ</rt><rp>)</rp></ruby>に<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>あり。"
                    },
                    "phonetic": "章",
                    "phoneticReading": "ショウ",
                    "enMn": "шургуулах хаалга"
                },
                {
                    "jp": "新幹線",
                    "reading": "しんかんせん",
                    "en": "bullet train",
                    "meanings": [
                        "Shinkansen",
                        "\"Bullet Train\""
                    ],
                    "example": {
                        "jp": "次の新幹線は９時ちょうどに出ます。",
                        "en": "The next Shinkansen train leaves at just nine o'clock.",
                        "furigana": "<ruby>次<rp>(</rp><rt>つぎ</rt><rp>)</rp></ruby>の<ruby>新幹線<rp>(</rp><rt>しんかんせん</rt><rp>)</rp></ruby>は９<ruby>時<rp>(</rp><rt>じ</rt><rp>)</rp></ruby>ちょうどに<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>ます。",
                        "enMn": "Дараагийн Шинкансэн галт тэрэг яг есөн цагт хөдөлнө."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン",
                    "enMn": "хурдны галт тэрэг"
                },
                {
                    "jp": "循環",
                    "reading": "じゅんかん",
                    "en": "circulation",
                    "meanings": [
                        "circulation",
                        "rotation",
                        "cycle"
                    ],
                    "example": {
                        "jp": "経済は今景気循環の頂点にある。",
                        "en": "The economy is at peak of a business cycle at present.",
                        "furigana": "<ruby>経済<rp>(</rp><rt>けいざい</rt><rp>)</rp></ruby>は<ruby>今<rp>(</rp><rt>こん</rt><rp>)</rp></ruby><ruby>景気<rp>(</rp><rt>けいき</rt><rp>)</rp></ruby><ruby>循環<rp>(</rp><rt>じゅんかん</rt><rp>)</rp></ruby>の<ruby>頂点<rp>(</rp><rt>ちょうてん</rt><rp>)</rp></ruby>にある。",
                        "enMn": "Эдийн засаг одоо бизнесийн мөчлөгийн оргилд байна."
                    },
                    "phonetic": "盾",
                    "phoneticReading": "ジュン",
                    "enMn": "эргэлт"
                },
                {
                    "jp": "周辺",
                    "reading": "しゅうへん",
                    "en": "vicinity",
                    "meanings": [
                        "circumference",
                        "peripheral"
                    ],
                    "example": {
                        "jp": "彼は南極周辺の地域を探検した。",
                        "en": "He explored the region around the South Pole.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>南極<rp>(</rp><rt>なんきょく</rt><rp>)</rp></ruby><ruby>周辺<rp>(</rp><rt>しゅうへん</rt><rp>)</rp></ruby>の<ruby>地域<rp>(</rp><rt>ちいき</rt><rp>)</rp></ruby>を<ruby>探検<rp>(</rp><rt>たんけん</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": "周",
                    "phoneticReading": "シュウ、チョウ",
                    "enMn": "орчин"
                },
                {
                    "jp": "白髪",
                    "reading": "しらが",
                    "en": "gray hair",
                    "meanings": [
                        "white or grey hair",
                        "trendy hair bleaching"
                    ],
                    "example": {
                        "jp": "白髪が知恵を生み出すわけではない。",
                        "en": "It is not white hair that engenders wisdom.",
                        "furigana": "<ruby>白髪<rp>(</rp><rt>はくはつ</rt><rp>)</rp></ruby>が<ruby>知恵<rp>(</rp><rt>ちえ</rt><rp>)</rp></ruby>を<ruby>生<rp>(</rp><rt>う</rt><rp>)</rp></ruby>み<ruby>出<rp>(</rp><rt>だ</rt><rp>)</rp></ruby>すわけではない。"
                    },
                    "phonetic": "白",
                    "phoneticReading": "ハク",
                    "enMn": "буурал үс"
                }
            ]
        ]
    },
    {
        "level": 33,
        "jlpt": "N2",
        "title": "N2 · Level 3",
        "sets": [
            [
                {
                    "jp": "消毒",
                    "reading": "しょうどく",
                    "en": "disinfection",
                    "meanings": [
                        "disinfection"
                    ],
                    "example": {
                        "jp": "ほ乳瓶を煮沸消毒しなさい。",
                        "en": "Boil the milk bottles.",
                        "furigana": "ほ<ruby>乳<rp>(</rp><rt>にゅう</rt><rp>)</rp></ruby><ruby>瓶<rp>(</rp><rt>びん</rt><rp>)</rp></ruby>を<ruby>煮沸<rp>(</rp><rt>しゃふつ</rt><rp>)</rp></ruby><ruby>消毒<rp>(</rp><rt>しょうどく</rt><rp>)</rp></ruby>しなさい。"
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ",
                    "enMn": "ариутгал"
                },
                {
                    "jp": "消防署",
                    "reading": "しょうぼうしょ",
                    "en": "fire station",
                    "meanings": [
                        "fire station"
                    ],
                    "example": {
                        "jp": "消防署は空港のすぐ隣にあります。",
                        "en": "The fire department is located right next to the airport.",
                        "furigana": "<ruby>消防署<rp>(</rp><rt>しょうぼうしょ</rt><rp>)</rp></ruby>は<ruby>空港<rp>(</rp><rt>くうこう</rt><rp>)</rp></ruby>のすぐ<ruby>隣<rp>(</rp><rt>となり</rt><rp>)</rp></ruby>にあります。"
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ",
                    "enMn": "гал команд"
                },
                {
                    "jp": "真空",
                    "reading": "しんくう",
                    "en": "vacuum",
                    "meanings": [
                        "vacuum"
                    ],
                    "example": {
                        "jp": "その爆発で真空管は粉々になった。",
                        "en": "The tube was shattered by the explosion.",
                        "furigana": "その<ruby>爆発<rp>(</rp><rt>ばくはつ</rt><rp>)</rp></ruby>で<ruby>真空<rp>(</rp><rt>しんくう</rt><rp>)</rp></ruby><ruby>管<rp>(</rp><rt>かん</rt><rp>)</rp></ruby>は<ruby>粉々<rp>(</rp><rt>こなごな</rt><rp>)</rp></ruby>になった。"
                    },
                    "phonetic": "真",
                    "phoneticReading": "シン、テン",
                    "enMn": "хоосон орон зай"
                },
                {
                    "jp": "真っ暗",
                    "reading": "まっくら",
                    "en": "total darkness",
                    "meanings": [
                        "total darkness"
                    ],
                    "example": {
                        "jp": "僕の目の前が、真っ暗になった。",
                        "en": "Everything went black.",
                        "furigana": "<ruby>僕<rp>(</rp><rt>ぼく</rt><rp>)</rp></ruby>の<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>の<ruby>前<rp>(</rp><rt>まえ</rt><rp>)</rp></ruby>が、<ruby>真<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>っ<ruby>暗<rp>(</rp><rt>くら</rt><rp>)</rp></ruby>になった。"
                    },
                    "phonetic": "真",
                    "phoneticReading": "シン、テン",
                    "enMn": "бүрэн харанхуй"
                },
                {
                    "jp": "頭脳",
                    "reading": "ずのう",
                    "en": "brain",
                    "meanings": [
                        "head",
                        "brains",
                        "intellect"
                    ],
                    "example": {
                        "jp": "彼は我が国有数の頭脳の一人だ。",
                        "en": "He is one of the best brains in our country.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>我<rp>(</rp><rt>わ</rt><rp>)</rp></ruby>が<ruby>国有<rp>(</rp><rt>こくゆう</rt><rp>)</rp></ruby><ruby>数<rp>(</rp><rt>すう</rt><rp>)</rp></ruby>の<ruby>頭脳<rp>(</rp><rt>ずのう</rt><rp>)</rp></ruby>の<ruby>一<rp>(</rp><rt>いち</rt><rp>)</rp></ruby><ruby>人<rp>(</rp><rt>にん</rt><rp>)</rp></ruby>だ。"
                    },
                    "phonetic": "豆",
                    "phoneticReading": "トウ、ト、ズ",
                    "enMn": "тархи"
                },
                {
                    "jp": "診断",
                    "reading": "しんだん",
                    "en": "diagnosis",
                    "meanings": [
                        "diagnosis"
                    ],
                    "example": {
                        "jp": "飼鳥の医学―病気の診断とその治療。",
                        "en": "Avian medicine - diagnosis and treatment of illnesses.",
                        "furigana": "<ruby>飼鳥<rp>(</rp><rt>かいどり</rt><rp>)</rp></ruby>の<ruby>医学<rp>(</rp><rt>いがく</rt><rp>)</rp></ruby>―<ruby>病気<rp>(</rp><rt>びょうき</rt><rp>)</rp></ruby>の<ruby>診断<rp>(</rp><rt>しんだん</rt><rp>)</rp></ruby>とその<ruby>治療<rp>(</rp><rt>ちりょう</rt><rp>)</rp></ruby>。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "оношилгоо"
                },
                {
                    "jp": "森林",
                    "reading": "しんりん",
                    "en": "forest",
                    "meanings": [
                        "forest",
                        "woods"
                    ],
                    "example": {
                        "jp": "当森林内でごみを捨てないで下さい。",
                        "en": "The public is requested not to litter in these woods.",
                        "furigana": "<ruby>当<rp>(</rp><rt>とう</rt><rp>)</rp></ruby><ruby>森林<rp>(</rp><rt>しんりん</rt><rp>)</rp></ruby><ruby>内<rp>(</rp><rt>ない</rt><rp>)</rp></ruby>でごみを<ruby>捨<rp>(</rp><rt>す</rt><rp>)</rp></ruby>てないで<ruby>下<rp>(</rp><rt>くだ</rt><rp>)</rp></ruby>さい。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ой"
                },
                {
                    "jp": "純粋",
                    "reading": "じゅんすい",
                    "en": "pure",
                    "meanings": [
                        "pure",
                        "genuine",
                        "unmixed"
                    ],
                    "example": {
                        "jp": "今日の純粋数学は明日の応用数学。",
                        "en": "Today's pure mathematics is tomorrow's applied mathematics.",
                        "furigana": "<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>の<ruby>純粋<rp>(</rp><rt>じゅんすい</rt><rp>)</rp></ruby><ruby>数学<rp>(</rp><rt>すうがく</rt><rp>)</rp></ruby>は<ruby>明日<rp>(</rp><rt>あした</rt><rp>)</rp></ruby>の<ruby>応用<rp>(</rp><rt>おうよう</rt><rp>)</rp></ruby><ruby>数学<rp>(</rp><rt>すうがく</rt><rp>)</rp></ruby>。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "цэвэр"
                },
                {
                    "jp": "商業",
                    "reading": "しょうぎょう",
                    "en": "commerce",
                    "meanings": [
                        "commerce",
                        "trade",
                        "business"
                    ],
                    "example": {
                        "jp": "大阪は日本の商業の中心地です。",
                        "en": "Osaka is the center of commerce in Japan.",
                        "furigana": "<ruby>大阪<rp>(</rp><rt>おおさか</rt><rp>)</rp></ruby>は<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>の<ruby>商業<rp>(</rp><rt>しょうぎょう</rt><rp>)</rp></ruby>の<ruby>中心<rp>(</rp><rt>ちゅうしん</rt><rp>)</rp></ruby><ruby>地<rp>(</rp><rt>ち</rt><rp>)</rp></ruby>です。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "худалдаа"
                },
                {
                    "jp": "重役",
                    "reading": "じゅうやく",
                    "en": "director",
                    "meanings": [
                        "director",
                        "high executive"
                    ],
                    "example": {
                        "jp": "重役たちは朝食会に集まっています。",
                        "en": "The top execs are gathering for a power breakfast.",
                        "furigana": "<ruby>重役<rp>(</rp><rt>じゅうやく</rt><rp>)</rp></ruby>たちは<ruby>朝食<rp>(</rp><rt>ちょうしょく</rt><rp>)</rp></ruby><ruby>会<rp>(</rp><rt>かい</rt><rp>)</rp></ruby>に<ruby>集<rp>(</rp><rt>あつ</rt><rp>)</rp></ruby>まっています。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "захирал"
                }
            ]
        ]
    },
    {
        "level": 34,
        "jlpt": "N2",
        "title": "N2 · Level 4",
        "sets": [
            [
                {
                    "jp": "焦点",
                    "reading": "しょうてん",
                    "en": "focus",
                    "meanings": [
                        "focus",
                        "point"
                    ],
                    "example": {
                        "jp": "話の焦点は内容に置かれている。",
                        "en": "The focus of the talk is put on the content.",
                        "furigana": "<ruby>話<rp>(</rp><rt>はなし</rt><rp>)</rp></ruby>の<ruby>焦点<rp>(</rp><rt>しょうてん</rt><rp>)</rp></ruby>は<ruby>内容<rp>(</rp><rt>ないよう</rt><rp>)</rp></ruby>に<ruby>置<rp>(</rp><rt>お</rt><rp>)</rp></ruby>かれている。",
                        "enMn": "Ярианы гол анхаарал агуулга дээр төвлөрсөн байна."
                    },
                    "phonetic": "焦",
                    "phoneticReading": "ショウ",
                    "enMn": "фокус"
                },
                {
                    "jp": "焦がす",
                    "reading": "こがす",
                    "en": "to burn",
                    "meanings": [
                        "to burn",
                        "to scorch"
                    ],
                    "example": {
                        "jp": "どうしよう、お鍋を焦がしちゃった！",
                        "en": "What should I do? I burned the pot!",
                        "furigana": "どうしよう、お<ruby>鍋<rp>(</rp><rt>なべ</rt><rp>)</rp></ruby>を<ruby>焦<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>がしちゃった！"
                    },
                    "phonetic": "焦",
                    "phoneticReading": "ショウ",
                    "enMn": "шатаах"
                },
                {
                    "jp": "随筆",
                    "reading": "ずいひつ",
                    "en": "essay",
                    "meanings": [
                        "essays",
                        "miscellaneous writings"
                    ],
                    "example": {
                        "jp": "彼女は随筆を書き始めた。",
                        "en": "She set about writing the essay.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>随筆<rp>(</rp><rt>ずいひつ</rt><rp>)</rp></ruby>を<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>き<ruby>始<rp>(</rp><rt>はじ</rt><rp>)</rp></ruby>めた。"
                    },
                    "phonetic": "迶",
                    "phoneticReading": "ズイ",
                    "enMn": "эссэ"
                },
                {
                    "jp": "商店",
                    "reading": "しょうてん",
                    "en": "shop",
                    "meanings": [
                        "shop",
                        "business firm"
                    ],
                    "example": {
                        "jp": "商店も彼を欲しがりませんでした。",
                        "en": "The shop did not want him.",
                        "furigana": "<ruby>商店<rp>(</rp><rt>しょうてん</rt><rp>)</rp></ruby>も<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>を<ruby>欲<rp>(</rp><rt>ほ</rt><rp>)</rp></ruby>しがりませんでした。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дэлгүүр"
                },
                {
                    "jp": "重量",
                    "reading": "じゅうりょう",
                    "en": "weight",
                    "meanings": [
                        "heavyweight"
                    ],
                    "example": {
                        "jp": "重い金庫の重量で床がぬけ落ちた。",
                        "en": "The floor gave in under the weight of the heavy safe.",
                        "furigana": "<ruby>重<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>い<ruby>金庫<rp>(</rp><rt>きんこ</rt><rp>)</rp></ruby>の<ruby>重量<rp>(</rp><rt>じゅうりょう</rt><rp>)</rp></ruby>で<ruby>床<rp>(</rp><rt>ゆか</rt><rp>)</rp></ruby>がぬけ<ruby>落<rp>(</rp><rt>お</rt><rp>)</rp></ruby>ちた。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "жин"
                },
                {
                    "jp": "鈴",
                    "reading": "すず",
                    "en": "bell",
                    "meanings": [
                        "bell"
                    ],
                    "example": {
                        "jp": "だれがその猫に鈴をつけられるか。",
                        "en": "Who can put a bell on the cat?",
                        "furigana": "だれがその<ruby>猫<rp>(</rp><rt>ねこ</rt><rp>)</rp></ruby>に<ruby>鈴<rp>(</rp><rt>すず</rt><rp>)</rp></ruby>をつけられるか。"
                    },
                    "phonetic": "令",
                    "phoneticReading": "レイ",
                    "enMn": "хонх"
                },
                {
                    "jp": "水平線",
                    "reading": "すいへいせん",
                    "en": "horizon",
                    "meanings": [
                        "horizon"
                    ],
                    "example": {
                        "jp": "水平線に漁船がいくつか見えます。",
                        "en": "I see some fishing boats on the horizon.",
                        "furigana": "<ruby>水平<rp>(</rp><rt>すいへい</rt><rp>)</rp></ruby><ruby>線<rp>(</rp><rt>せん</rt><rp>)</rp></ruby>に<ruby>漁船<rp>(</rp><rt>ぎょせん</rt><rp>)</rp></ruby>がいくつか<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>えます。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "тэнгэрийн хаяа"
                },
                {
                    "jp": "涼む",
                    "reading": "すずむ",
                    "en": "to cool oneself",
                    "meanings": [
                        "to cool oneself",
                        "to cool off"
                    ],
                    "example": {
                        "jp": "ここは風通しが良くて、涼むにはもってこいの場所なんだ。",
                        "en": "It's well-ventilated and an ideal place to cool down.",
                        "furigana": "ここは<ruby>風通<rp>(</rp><rt>かぜとお</rt><rp>)</rp></ruby>しが<ruby>良<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>くて、<ruby>涼<rp>(</rp><rt>すず</rt><rp>)</rp></ruby>むにはもってこいの<ruby>場所<rp>(</rp><rt>ばしょ</rt><rp>)</rp></ruby>なんだ。"
                    },
                    "phonetic": "京",
                    "phoneticReading": "ケイ、リョウ",
                    "enMn": "сэрүүцэх"
                },
                {
                    "jp": "上級",
                    "reading": "じょうきゅう",
                    "en": "advanced level",
                    "meanings": [
                        "advanced level",
                        "high grade",
                        "senior"
                    ],
                    "example": {
                        "jp": "被告は上級裁判所に控訴するだろう。",
                        "en": "The defendant will appeal to a higher court.",
                        "furigana": "<ruby>被告<rp>(</rp><rt>ひこく</rt><rp>)</rp></ruby>は<ruby>上級<rp>(</rp><rt>じょうきゅう</rt><rp>)</rp></ruby><ruby>裁判所<rp>(</rp><rt>さいばんしょ</rt><rp>)</rp></ruby>に<ruby>控訴<rp>(</rp><rt>こうそ</rt><rp>)</rp></ruby>するだろう。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ахисан түвшин"
                },
                {
                    "jp": "税関",
                    "reading": "ぜいかん",
                    "en": "customs",
                    "meanings": [
                        "customs"
                    ],
                    "example": {
                        "jp": "税関申告書に記入してください。",
                        "en": "Please fill out the Customs Declaration Form.",
                        "furigana": "<ruby>税関<rp>(</rp><rt>ぜいかん</rt><rp>)</rp></ruby><ruby>申告<rp>(</rp><rt>しんこく</rt><rp>)</rp></ruby><ruby>書<rp>(</rp><rt>しょ</rt><rp>)</rp></ruby>に<ruby>記入<rp>(</rp><rt>きにゅう</rt><rp>)</rp></ruby>してください。"
                    },
                    "phonetic": "兑",
                    "phoneticReading": "エツ、ゼイ",
                    "enMn": "гааль"
                }
            ]
        ]
    },
    {
        "level": 35,
        "jlpt": "N2",
        "title": "N2 · Level 5",
        "sets": [
            [
                {
                    "jp": "正面",
                    "reading": "しょうめん",
                    "en": "front",
                    "meanings": [
                        "front"
                    ],
                    "example": {
                        "jp": "正面近くの席に座りたいのですが。",
                        "en": "I'd like to sit near the front.",
                        "furigana": "<ruby>正面<rp>(</rp><rt>しょうめん</rt><rp>)</rp></ruby><ruby>近<rp>(</rp><rt>ちか</rt><rp>)</rp></ruby>くの<ruby>席<rp>(</rp><rt>せき</rt><rp>)</rp></ruby>に<ruby>座<rp>(</rp><rt>すわ</rt><rp>)</rp></ruby>りたいのですが。"
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ",
                    "enMn": "урд тал"
                },
                {
                    "jp": "正味",
                    "reading": "しょうみ",
                    "en": "net weight",
                    "meanings": [
                        "net (weight)"
                    ],
                    "example": {
                        "jp": "このジャムの正味重量は２００グラムです。",
                        "en": "The net weight of this jam is 200 grams.",
                        "furigana": "このジャムの<ruby>正味<rp>(</rp><rt>しょうみ</rt><rp>)</rp></ruby><ruby>重量<rp>(</rp><rt>じゅうりょう</rt><rp>)</rp></ruby>は２００グラムです。"
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ",
                    "enMn": "цэвэр жин"
                },
                {
                    "jp": "寝台",
                    "reading": "しんだい",
                    "en": "berth",
                    "meanings": [
                        "bed"
                    ],
                    "example": {
                        "jp": "寝台車を予約したいのですが。",
                        "en": "I'd like to reserve a sleeping berth.",
                        "furigana": "<ruby>寝台<rp>(</rp><rt>しんだい</rt><rp>)</rp></ruby><ruby>車<rp>(</rp><rt>しゃ</rt><rp>)</rp></ruby>を<ruby>予約<rp>(</rp><rt>よやく</rt><rp>)</rp></ruby>したいのですが。"
                    },
                    "phonetic": "𠬶",
                    "phoneticReading": "シン",
                    "enMn": "унтлагын ор"
                },
                {
                    "jp": "侵入",
                    "reading": "しんにゅう",
                    "en": "invasion",
                    "meanings": [
                        "invasion",
                        "raid",
                        "trespass"
                    ],
                    "example": {
                        "jp": "彼らは土地を侵入者に明け渡した。",
                        "en": "They yielded their land to the invaders.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らは<ruby>土地<rp>(</rp><rt>とち</rt><rp>)</rp></ruby>を<ruby>侵入<rp>(</rp><rt>しんにゅう</rt><rp>)</rp></ruby><ruby>者<rp>(</rp><rt>しゃ</rt><rp>)</rp></ruby>に<ruby>明<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>け<ruby>渡<rp>(</rp><rt>わた</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэд газраа түрэмгийлэгчдэд өгсөн."
                    },
                    "phonetic": "𠬶",
                    "phoneticReading": "シン",
                    "enMn": "довтолгоо"
                },
                {
                    "jp": "順々",
                    "reading": "じゅんじゅん",
                    "en": "in order",
                    "meanings": [
                        "in order",
                        "in turn"
                    ],
                    "example": {
                        "jp": "少年たちは順々にしゃべった。",
                        "en": "All the boys spoke each in turn.",
                        "furigana": "<ruby>少年<rp>(</rp><rt>しょうねん</rt><rp>)</rp></ruby>たちは<ruby>順々<rp>(</rp><rt>じゅんじゅん</rt><rp>)</rp></ruby>にしゃべった。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дараалан"
                },
                {
                    "jp": "主語",
                    "reading": "しゅご",
                    "en": "subject (grammar)",
                    "meanings": [
                        "(gram) subject"
                    ],
                    "example": {
                        "jp": "文には普通、主語と動詞がある。",
                        "en": "A sentence normally has a subject and a verb.",
                        "furigana": "<ruby>文<rp>(</rp><rt>ぶん</rt><rp>)</rp></ruby>には<ruby>普通<rp>(</rp><rt>ふつう</rt><rp>)</rp></ruby>、<ruby>主語<rp>(</rp><rt>しゅご</rt><rp>)</rp></ruby>と<ruby>動詞<rp>(</rp><rt>どうし</rt><rp>)</rp></ruby>がある。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "өгүүлэгдэхүүн"
                },
                {
                    "jp": "小数",
                    "reading": "しょうすう",
                    "en": "fraction",
                    "meanings": [
                        "fraction (part of)",
                        "decimal"
                    ],
                    "example": {
                        "jp": "次の分数を小数に直しなさい。",
                        "en": "Convert the following fractions to decimals.",
                        "furigana": "<ruby>次<rp>(</rp><rt>つぎ</rt><rp>)</rp></ruby>の<ruby>分数<rp>(</rp><rt>ぶんすう</rt><rp>)</rp></ruby>を<ruby>小数<rp>(</rp><rt>しょうすう</rt><rp>)</rp></ruby>に<ruby>直<rp>(</rp><rt>なお</rt><rp>)</rp></ruby>しなさい。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бутархай"
                },
                {
                    "jp": "巡査",
                    "reading": "じゅんさ",
                    "en": "policeman",
                    "meanings": [
                        "policeman"
                    ],
                    "example": {
                        "jp": "彼は巡査部長の地位に昇った。",
                        "en": "He rose to the rank of sergeant.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>巡査<rp>(</rp><rt>じゅんさ</rt><rp>)</rp></ruby><ruby>部長<rp>(</rp><rt>ぶちょう</rt><rp>)</rp></ruby>の<ruby>地位<rp>(</rp><rt>ちい</rt><rp>)</rp></ruby>に<ruby>昇<rp>(</rp><rt>のぼ</rt><rp>)</rp></ruby>った。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "цагдаа"
                },
                {
                    "jp": "上下",
                    "reading": "じょうげ",
                    "en": "up and down",
                    "meanings": [
                        "high and low",
                        "up and down"
                    ],
                    "example": {
                        "jp": "それ、上下逆に持っちゃ駄目だよ。",
                        "en": "Don't hold it upside down.",
                        "furigana": "それ、<ruby>上下<rp>(</rp><rt>じょうげ</rt><rp>)</rp></ruby><ruby>逆<rp>(</rp><rt>ぎゃく</rt><rp>)</rp></ruby>に<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>っちゃ<ruby>駄目<rp>(</rp><rt>だめ</rt><rp>)</rp></ruby>だよ。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дээш доош"
                },
                {
                    "jp": "寿命",
                    "reading": "じゅみょう",
                    "en": "life span",
                    "meanings": [
                        "life span"
                    ],
                    "example": {
                        "jp": "日本人の平均寿命は大いに伸びた。",
                        "en": "The average life span of the Japanese has lengthened to a great extent.",
                        "furigana": "<ruby>日本人<rp>(</rp><rt>にっぽんじん</rt><rp>)</rp></ruby>の<ruby>平均<rp>(</rp><rt>へいきん</rt><rp>)</rp></ruby><ruby>寿命<rp>(</rp><rt>じゅみょう</rt><rp>)</rp></ruby>は<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>いに<ruby>伸<rp>(</rp><rt>の</rt><rp>)</rp></ruby>びた。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "наслалт"
                }
            ]
        ]
    },
    {
        "level": 36,
        "jlpt": "N2",
        "title": "N2 · Level 6",
        "sets": [
            [
                {
                    "jp": "職場",
                    "reading": "しょくば",
                    "en": "workplace",
                    "meanings": [
                        "workplace"
                    ],
                    "example": {
                        "jp": "私は職場から１時間の所に住んでいる。",
                        "en": "I live an hour away from work.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>職場<rp>(</rp><rt>しょくば</rt><rp>)</rp></ruby>から１<ruby>時間<rp>(</rp><rt>じかん</rt><rp>)</rp></ruby>の<ruby>所<rp>(</rp><rt>ところ</rt><rp>)</rp></ruby>に<ruby>住<rp>(</rp><rt>す</rt><rp>)</rp></ruby>んでいる。"
                    },
                    "phonetic": "戠",
                    "phoneticReading": "シキ、ショク",
                    "enMn": "ажлын байр"
                },
                {
                    "jp": "職人",
                    "reading": "しょくにん",
                    "en": "artisan",
                    "meanings": [
                        "artisan",
                        "craftsman"
                    ],
                    "example": {
                        "jp": "下手な職人は道具にけちをつける。",
                        "en": "A bad workman blames his tools.",
                        "furigana": "<ruby>下手<rp>(</rp><rt>へた</rt><rp>)</rp></ruby>な<ruby>職人<rp>(</rp><rt>しょくにん</rt><rp>)</rp></ruby>は<ruby>道具<rp>(</rp><rt>どうぐ</rt><rp>)</rp></ruby>にけちをつける。"
                    },
                    "phonetic": "戠",
                    "phoneticReading": "シキ、ショク",
                    "enMn": "гар урчин"
                },
                {
                    "jp": "主役",
                    "reading": "しゅやく",
                    "en": "leading role",
                    "meanings": [
                        "leading part"
                    ],
                    "example": {
                        "jp": "ボブは今度の学園祭で初めて主役を演じる。",
                        "en": "Bob will play the leading role for the first time in the next school festival.",
                        "furigana": "ボブは<ruby>今度<rp>(</rp><rt>こんど</rt><rp>)</rp></ruby>の<ruby>学園<rp>(</rp><rt>がくえん</rt><rp>)</rp></ruby><ruby>祭<rp>(</rp><rt>さい</rt><rp>)</rp></ruby>で<ruby>初<rp>(</rp><rt>はじ</rt><rp>)</rp></ruby>めて<ruby>主役<rp>(</rp><rt>しゅやく</rt><rp>)</rp></ruby>を<ruby>演<rp>(</rp><rt>えん</rt><rp>)</rp></ruby>じる。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "гол дүр"
                },
                {
                    "jp": "上旬",
                    "reading": "じょうじゅん",
                    "en": "early part of month",
                    "meanings": [
                        "first 10 days of month"
                    ],
                    "example": {
                        "jp": "トムは１０月上旬からここにいます。",
                        "en": "Tom has been here since early October.",
                        "furigana": "トムは<ruby>１０月<rp>(</rp><rt>じゅうがつ</rt><rp>)</rp></ruby><ruby>上旬<rp>(</rp><rt>じょうじゅん</rt><rp>)</rp></ruby>からここにいます。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сарын эхэн"
                },
                {
                    "jp": "商社",
                    "reading": "しょうしゃ",
                    "en": "trading company",
                    "meanings": [
                        "trading company"
                    ],
                    "example": {
                        "jp": "私のおじは商社を経営しています。",
                        "en": "My uncle manages a firm.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>のおじは<ruby>商社<rp>(</rp><rt>しょうしゃ</rt><rp>)</rp></ruby>を<ruby>経営<rp>(</rp><rt>けいえい</rt><rp>)</rp></ruby>しています。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "худалдааны компани"
                },
                {
                    "jp": "勝敗",
                    "reading": "しょうはい",
                    "en": "win or loss",
                    "meanings": [
                        "victory or defeat",
                        "issue (of battle)"
                    ],
                    "example": {
                        "jp": "喧嘩の勝敗は腕力では決まらない。",
                        "en": "Whether you win or lose the fight is not determined by your physical strength.",
                        "furigana": "<ruby>喧嘩<rp>(</rp><rt>けんか</rt><rp>)</rp></ruby>の<ruby>勝敗<rp>(</rp><rt>しょうはい</rt><rp>)</rp></ruby>は<ruby>腕力<rp>(</rp><rt>わんりょく</rt><rp>)</rp></ruby>では<ruby>決<rp>(</rp><rt>き</rt><rp>)</rp></ruby>まらない。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ялалт эсвэл ялагдал"
                },
                {
                    "jp": "重力",
                    "reading": "じゅうりょく",
                    "en": "gravity",
                    "meanings": [
                        "gravity"
                    ],
                    "example": {
                        "jp": "月の重力は地球の６分の１である。",
                        "en": "The gravity of the moon is one-sixth of that of the earth.",
                        "furigana": "<ruby>月<rp>(</rp><rt>つき</rt><rp>)</rp></ruby>の<ruby>重力<rp>(</rp><rt>じゅうりょく</rt><rp>)</rp></ruby>は<ruby>地球<rp>(</rp><rt>ちきゅう</rt><rp>)</rp></ruby>の６<ruby>分<rp>(</rp><rt>ぶん</rt><rp>)</rp></ruby>の１である。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "таталцал"
                },
                {
                    "jp": "上品",
                    "reading": "じょうひん",
                    "en": "refined",
                    "meanings": [
                        "refined",
                        "elegant",
                        "well-mannered"
                    ],
                    "example": {
                        "jp": "彼女は上品な態度をしています。",
                        "en": "She has an elegant manner.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>上品<rp>(</rp><rt>じょうひん</rt><rp>)</rp></ruby>な<ruby>態度<rp>(</rp><rt>たいど</rt><rp>)</rp></ruby>をしています。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "эрхэмсэг"
                },
                {
                    "jp": "純情",
                    "reading": "じゅんじょう",
                    "en": "pure heart",
                    "meanings": [
                        "pure heart"
                    ],
                    "example": {
                        "jp": "君って、意外に純情だね。",
                        "en": "I'm surprised that you're so naïve.",
                        "furigana": "<ruby>君<rp>(</rp><rt>きみ</rt><rp>)</rp></ruby>って、<ruby>意外<rp>(</rp><rt>いがい</rt><rp>)</rp></ruby>に<ruby>純情<rp>(</rp><rt>じゅんじょう</rt><rp>)</rp></ruby>だね。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "цэвэр сэтгэл"
                },
                {
                    "jp": "祝日",
                    "reading": "しゅくじつ",
                    "en": "national holiday",
                    "meanings": [
                        "national holiday"
                    ],
                    "example": {
                        "jp": "私たちは国民の祝日に旗を立てる。",
                        "en": "We put up the flags on national holidays.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>たちは<ruby>国民<rp>(</rp><rt>こくみん</rt><rp>)</rp></ruby>の<ruby>祝日<rp>(</rp><rt>しゅくじつ</rt><rp>)</rp></ruby>に<ruby>旗<rp>(</rp><rt>はた</rt><rp>)</rp></ruby>を<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>てる。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "улсын баяр"
                }
            ]
        ]
    },
    {
        "level": 37,
        "jlpt": "N2",
        "title": "N2 · Level 7",
        "sets": [
            [
                {
                    "jp": "整数",
                    "reading": "せいすう",
                    "en": "integer",
                    "meanings": [
                        "integer"
                    ],
                    "example": null,
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ",
                    "enMn": "бүхэл тоо"
                },
                {
                    "jp": "整備",
                    "reading": "せいび",
                    "en": "maintenance",
                    "meanings": [
                        "maintenance",
                        "overhaul"
                    ],
                    "example": {
                        "jp": "彼は自分の車をよく整備している。",
                        "en": "He maintains his car well.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby>の<ruby>車<rp>(</rp><rt>くるま</rt><rp>)</rp></ruby>をよく<ruby>整備<rp>(</rp><rt>せいび</rt><rp>)</rp></ruby>している。"
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ",
                    "enMn": "засвар үйлчилгээ"
                },
                {
                    "jp": "製作",
                    "reading": "せいさく",
                    "en": "production",
                    "meanings": [
                        "manufacture",
                        "production"
                    ],
                    "example": {
                        "jp": "小説をもとに製作された映画です。",
                        "en": "This film is based on a novel.",
                        "furigana": "<ruby>小説<rp>(</rp><rt>しょうせつ</rt><rp>)</rp></ruby>をもとに<ruby>製作<rp>(</rp><rt>せいさく</rt><rp>)</rp></ruby>された<ruby>映画<rp>(</rp><rt>えいが</rt><rp>)</rp></ruby>です。"
                    },
                    "phonetic": "制",
                    "phoneticReading": "セイ",
                    "enMn": "үйлдвэрлэл"
                },
                {
                    "jp": "制作",
                    "reading": "せいさく",
                    "en": "work (e.g., film, book)",
                    "meanings": [
                        "work (e.g., film, book)"
                    ],
                    "example": {
                        "jp": "どなたが人形を制作したのですか？",
                        "en": "Who made the doll?",
                        "furigana": "どなたが<ruby>人形<rp>(</rp><rt>にんぎょう</rt><rp>)</rp></ruby>を<ruby>制作<rp>(</rp><rt>せいさく</rt><rp>)</rp></ruby>したのですか？"
                    },
                    "phonetic": "制",
                    "phoneticReading": "セイ",
                    "enMn": "бүтээл"
                },
                {
                    "jp": "食塩",
                    "reading": "しょくえん",
                    "en": "table salt",
                    "meanings": [
                        "table salt"
                    ],
                    "example": {
                        "jp": "めんどうですが食塩をとっていただけませんか。",
                        "en": "May I trouble you for the salt?",
                        "furigana": "めんどうですが<ruby>食塩<rp>(</rp><rt>しょくえん</rt><rp>)</rp></ruby>をとっていただけませんか。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "давс"
                },
                {
                    "jp": "書籍",
                    "reading": "しょせき",
                    "en": "book",
                    "meanings": [
                        "book",
                        "publication"
                    ],
                    "example": {
                        "jp": "自然と書籍はそれを見る眼のものだ。",
                        "en": "Nature and books belong to the eyes that see them.",
                        "furigana": "<ruby>自然<rp>(</rp><rt>しぜん</rt><rp>)</rp></ruby>と<ruby>書籍<rp>(</rp><rt>しょせき</rt><rp>)</rp></ruby>はそれを<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>る<ruby>眼<rp>(</rp><rt>め</rt><rp>)</rp></ruby>のものだ。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ном"
                },
                {
                    "jp": "書道",
                    "reading": "しょどう",
                    "en": "calligraphy",
                    "meanings": [
                        "calligraphy"
                    ],
                    "example": {
                        "jp": "書道は少しかじったことがある。",
                        "en": "I know a bit about calligraphy.",
                        "furigana": "<ruby>書道<rp>(</rp><rt>しょどう</rt><rp>)</rp></ruby>は<ruby>少<rp>(</rp><rt>すこ</rt><rp>)</rp></ruby>しかじったことがある。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "каллиграфи"
                },
                {
                    "jp": "人文科学",
                    "reading": "じんぶんかがく",
                    "en": "humanities",
                    "meanings": [
                        "social sciences",
                        "humanities"
                    ],
                    "example": {
                        "jp": "歴史学は人文科学の一部門である。",
                        "en": "History is a branch of the humanities.",
                        "furigana": "<ruby>歴史<rp>(</rp><rt>れきし</rt><rp>)</rp></ruby><ruby>学<rp>(</rp><rt>がく</rt><rp>)</rp></ruby>は<ruby>人文<rp>(</rp><rt>じんぶん</rt><rp>)</rp></ruby><ruby>科学<rp>(</rp><rt>かがく</rt><rp>)</rp></ruby>の<ruby>一<rp>(</rp><rt>いち</rt><rp>)</rp></ruby><ruby>部門<rp>(</rp><rt>ぶもん</rt><rp>)</rp></ruby>である。",
                        "enMn": "Түүх бол хүмүүнлэгийн ухааны нэг салбар юм."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүмүүнлэгийн ухаан"
                },
                {
                    "jp": "初級",
                    "reading": "しょきゅう",
                    "en": "beginner level",
                    "meanings": [
                        "elementary level"
                    ],
                    "example": {
                        "jp": "これは初級の教科書です。",
                        "en": "This is a beginner's textbook.",
                        "furigana": "これは<ruby>初級<rp>(</rp><rt>しょきゅう</rt><rp>)</rp></ruby>の<ruby>教科書<rp>(</rp><rt>きょうかしょ</rt><rp>)</rp></ruby>です。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "анхан шат"
                },
                {
                    "jp": "書店",
                    "reading": "しょてん",
                    "en": "bookshop",
                    "meanings": [
                        "bookshop"
                    ],
                    "example": {
                        "jp": "この本は駅前の書店で買ったんだ。",
                        "en": "I bought this book at the bookstore in front of the station.",
                        "furigana": "この<ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby>は<ruby>駅前<rp>(</rp><rt>えきまえ</rt><rp>)</rp></ruby>の<ruby>書店<rp>(</rp><rt>しょてん</rt><rp>)</rp></ruby>で<ruby>買<rp>(</rp><rt>か</rt><rp>)</rp></ruby>ったんだ。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "номын дэлгүүр"
                }
            ]
        ]
    },
    {
        "level": 38,
        "jlpt": "N2",
        "title": "N2 · Level 8",
        "sets": [
            [
                {
                    "jp": "申請",
                    "reading": "しんせい",
                    "en": "application",
                    "meanings": [
                        "application",
                        "request",
                        "petition"
                    ],
                    "example": {
                        "jp": "もうパスポートを申請しましたか。",
                        "en": "Have you applied for a passport yet?",
                        "furigana": "もうパスポートを<ruby>申請<rp>(</rp><rt>しんせい</rt><rp>)</rp></ruby>しましたか。"
                    },
                    "phonetic": "申",
                    "phoneticReading": "シン",
                    "enMn": "өргөдөл"
                },
                {
                    "jp": "神話",
                    "reading": "しんわ",
                    "en": "myth",
                    "meanings": [
                        "myth",
                        "legend"
                    ],
                    "example": {
                        "jp": "彼は古代神話に基づく小説を書いた。",
                        "en": "He wrote a novel based on ancient myths.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>古代<rp>(</rp><rt>こだい</rt><rp>)</rp></ruby><ruby>神話<rp>(</rp><rt>しんわ</rt><rp>)</rp></ruby>に<ruby>基<rp>(</rp><rt>もと</rt><rp>)</rp></ruby>づく<ruby>小説<rp>(</rp><rt>しょうせつ</rt><rp>)</rp></ruby>を<ruby>書<rp>(</rp><rt>か</rt><rp>)</rp></ruby>いた。"
                    },
                    "phonetic": "申",
                    "phoneticReading": "シン",
                    "enMn": "домог"
                },
                {
                    "jp": "人造",
                    "reading": "じんぞう",
                    "en": "man-made",
                    "meanings": [
                        "man-made",
                        "synthetic",
                        "artificial"
                    ],
                    "example": {
                        "jp": "人造皮革は本物の皮にかなわない。",
                        "en": "Artificial leather can't compare with the real thing.",
                        "furigana": "<ruby>人造<rp>(</rp><rt>じんぞう</rt><rp>)</rp></ruby><ruby>皮革<rp>(</rp><rt>ひかく</rt><rp>)</rp></ruby>は<ruby>本物<rp>(</rp><rt>ほんもの</rt><rp>)</rp></ruby>の<ruby>皮<rp>(</rp><rt>かわ</rt><rp>)</rp></ruby>にかなわない。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүний гараар хийсэн"
                },
                {
                    "jp": "素人",
                    "reading": "しろうと",
                    "en": "amateur",
                    "meanings": [
                        "layman",
                        "amateur",
                        "novice"
                    ],
                    "example": {
                        "jp": "法律用語の大半は素人にはわかりにくい。",
                        "en": "Much legal language is obscure to a layman.",
                        "furigana": "<ruby>法律<rp>(</rp><rt>ほうりつ</rt><rp>)</rp></ruby><ruby>用語<rp>(</rp><rt>ようご</rt><rp>)</rp></ruby>の<ruby>大半<rp>(</rp><rt>たいはん</rt><rp>)</rp></ruby>は<ruby>素人<rp>(</rp><rt>しろうと</rt><rp>)</rp></ruby>にはわかりにくい。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сонирхогч"
                },
                {
                    "jp": "人事",
                    "reading": "じんじ",
                    "en": "personnel",
                    "meanings": [
                        "human resources",
                        "personnel management"
                    ],
                    "example": {
                        "jp": "人事を尽くして天命を待つ。",
                        "en": "Man proposes, God disposes.",
                        "furigana": "<ruby>人事<rp>(</rp><rt>じんじ</rt><rp>)</rp></ruby>を<ruby>尽<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>くして<ruby>天命<rp>(</rp><rt>てんめい</rt><rp>)</rp></ruby>を<ruby>待<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>つ。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "боловсон хүчин"
                },
                {
                    "jp": "心身",
                    "reading": "しんしん",
                    "en": "mind and body",
                    "meanings": [
                        "mind and body"
                    ],
                    "example": {
                        "jp": "青年時代は心身の発達が著しい。",
                        "en": "Moral and physical development are remarkable in the youth.",
                        "furigana": "<ruby>青年<rp>(</rp><rt>せいねん</rt><rp>)</rp></ruby><ruby>時代<rp>(</rp><rt>じだい</rt><rp>)</rp></ruby>は<ruby>心身<rp>(</rp><rt>しんしん</rt><rp>)</rp></ruby>の<ruby>発達<rp>(</rp><rt>はったつ</rt><rp>)</rp></ruby>が<ruby>著<rp>(</rp><rt>いちじる</rt><rp>)</rp></ruby>しい。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сэтгэл ба бие"
                },
                {
                    "jp": "食器",
                    "reading": "しょっき",
                    "en": "tableware",
                    "meanings": [
                        "tableware"
                    ],
                    "example": {
                        "jp": "トムは犬の食器に食べ物を入れた。",
                        "en": "Tom put some food into the dog's dish.",
                        "furigana": "トムは<ruby>犬<rp>(</rp><rt>いぬ</rt><rp>)</rp></ruby>の<ruby>食器<rp>(</rp><rt>しょっき</rt><rp>)</rp></ruby>に<ruby>食<rp>(</rp><rt>た</rt><rp>)</rp></ruby>べ<ruby>物<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>を<ruby>入<rp>(</rp><rt>い</rt><rp>)</rp></ruby>れた。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сав суулга"
                },
                {
                    "jp": "芯",
                    "reading": "しん",
                    "en": "core",
                    "meanings": [
                        "core",
                        "heart",
                        "wick"
                    ],
                    "example": {
                        "jp": "体の芯まで冷え切ってしまった。",
                        "en": "I'm chilled to the bone.",
                        "furigana": "<ruby>体<rp>(</rp><rt>からだ</rt><rp>)</rp></ruby>の<ruby>芯<rp>(</rp><rt>しん</rt><rp>)</rp></ruby>まで<ruby>冷<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>え<ruby>切<rp>(</rp><rt>き</rt><rp>)</rp></ruby>ってしまった。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "цөм"
                },
                {
                    "jp": "人命",
                    "reading": "じんめい",
                    "en": "human life",
                    "meanings": [
                        "(human) life"
                    ],
                    "example": {
                        "jp": "どんな大金も人命には換えられない。",
                        "en": "Even a large sum of money cannot take the place of a man's life.",
                        "furigana": "どんな<ruby>大金<rp>(</rp><rt>たいきん</rt><rp>)</rp></ruby>も<ruby>人命<rp>(</rp><rt>じんめい</rt><rp>)</rp></ruby>には<ruby>換<rp>(</rp><rt>か</rt><rp>)</rp></ruby>えられない。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүний амь нас"
                },
                {
                    "jp": "助教授",
                    "reading": "じょきょうじゅ",
                    "en": "assistant professor",
                    "meanings": [
                        "assistant professor"
                    ],
                    "example": {
                        "jp": "私は教授です、いやもっと正確に言えば、助教授です。",
                        "en": "I'm a professor, or rather an associate professor, to be exact.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>教授<rp>(</rp><rt>きょうじゅ</rt><rp>)</rp></ruby>です、いやもっと<ruby>正確<rp>(</rp><rt>せいかく</rt><rp>)</rp></ruby>に<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>えば、<ruby>助教授<rp>(</rp><rt>じょきょうじゅ</rt><rp>)</rp></ruby>です。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дэд профессор"
                }
            ]
        ]
    },
    {
        "level": 39,
        "jlpt": "N2",
        "title": "N2 · Level 9",
        "sets": [
            [
                {
                    "jp": "生ずる",
                    "reading": "しょうずる",
                    "en": "to cause",
                    "meanings": [
                        "to cause",
                        "to arise",
                        "to be generated"
                    ],
                    "example": {
                        "jp": "再開発によって地域に便益が生ずる。",
                        "en": "Benefits accrue to the community from reconstruction.",
                        "furigana": "<ruby>再<rp>(</rp><rt>さい</rt><rp>)</rp></ruby><ruby>開発<rp>(</rp><rt>かいはつ</rt><rp>)</rp></ruby>によって<ruby>地域<rp>(</rp><rt>ちいき</rt><rp>)</rp></ruby>に<ruby>便益<rp>(</rp><rt>べんえき</rt><rp>)</rp></ruby>が<ruby>生<rp>(</rp><rt>しょう</rt><rp>)</rp></ruby>ずる。"
                    },
                    "phonetic": "生",
                    "phoneticReading": "セイ、ショウ",
                    "enMn": "учруулах"
                },
                {
                    "jp": "生存",
                    "reading": "せいぞん",
                    "en": "existence",
                    "meanings": [
                        "existence",
                        "being",
                        "survival"
                    ],
                    "example": {
                        "jp": "その地震の生存者は２名だけだった。",
                        "en": "Only two people survived the earthquake.",
                        "furigana": "その<ruby>地震<rp>(</rp><rt>じしん</rt><rp>)</rp></ruby>の<ruby>生存<rp>(</rp><rt>せいぞん</rt><rp>)</rp></ruby><ruby>者<rp>(</rp><rt>しゃ</rt><rp>)</rp></ruby>は２<ruby>名<rp>(</rp><rt>めい</rt><rp>)</rp></ruby>だけだった。"
                    },
                    "phonetic": "生",
                    "phoneticReading": "セイ、ショウ",
                    "enMn": "оршин тогтнол"
                },
                {
                    "jp": "清書",
                    "reading": "せいしょ",
                    "en": "clean copy",
                    "meanings": [
                        "clean copy"
                    ],
                    "example": {
                        "jp": "作文を清書する必要はありません。",
                        "en": "You don't have to write out a clean copy of your composition.",
                        "furigana": "<ruby>作文<rp>(</rp><rt>さくぶん</rt><rp>)</rp></ruby>を<ruby>清書<rp>(</rp><rt>せいしょ</rt><rp>)</rp></ruby>する<ruby>必要<rp>(</rp><rt>ひつよう</rt><rp>)</rp></ruby>はありません。"
                    },
                    "phonetic": "青",
                    "phoneticReading": "セイ、ショウ、ジョウ",
                    "enMn": "цэвэр хувилбар"
                },
                {
                    "jp": "清掃",
                    "reading": "せいそう",
                    "en": "cleaning",
                    "meanings": [
                        "cleaning"
                    ],
                    "example": {
                        "jp": "洗面所をつかった後には、清掃すること。",
                        "en": "Clean up after you have finished using the bathroom.",
                        "furigana": "<ruby>洗面<rp>(</rp><rt>せんめん</rt><rp>)</rp></ruby><ruby>所<rp>(</rp><rt>しょ</rt><rp>)</rp></ruby>をつかった<ruby>後<rp>(</rp><rt>のち</rt><rp>)</rp></ruby>には、<ruby>清掃<rp>(</rp><rt>せいそう</rt><rp>)</rp></ruby>すること。"
                    },
                    "phonetic": "青",
                    "phoneticReading": "セイ、ショウ、ジョウ",
                    "enMn": "цэвэрлэгээ"
                },
                {
                    "jp": "深夜",
                    "reading": "しんや",
                    "en": "late at night",
                    "meanings": [
                        "late at night"
                    ],
                    "example": {
                        "jp": "深夜シャワーを浴びたことあるの？",
                        "en": "Have you ever taken a shower in the middle of the night?",
                        "furigana": "<ruby>深夜<rp>(</rp><rt>しんや</rt><rp>)</rp></ruby>シャワーを<ruby>浴<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>びたことあるの？"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "шөнө орой"
                },
                {
                    "jp": "水筒",
                    "reading": "すいとう",
                    "en": "water bottle",
                    "meanings": [
                        "canteen",
                        "flask",
                        "water bottle"
                    ],
                    "example": {
                        "jp": "水筒にはほとんど水が残っていない。",
                        "en": "There is little water left in the canteen.",
                        "furigana": "<ruby>水筒<rp>(</rp><rt>すいとう</rt><rp>)</rp></ruby>にはほとんど<ruby>水<rp>(</rp><rt>みず</rt><rp>)</rp></ruby>が<ruby>残<rp>(</rp><rt>のこ</rt><rp>)</rp></ruby>っていない。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "усны сав"
                },
                {
                    "jp": "水分",
                    "reading": "すいぶん",
                    "en": "moisture",
                    "meanings": [
                        "moisture"
                    ],
                    "example": {
                        "jp": "水分をたくさん取ってください。",
                        "en": "You should drink a lot of liquid.",
                        "furigana": "<ruby>水分<rp>(</rp><rt>すいぶん</rt><rp>)</rp></ruby>をたくさん<ruby>取<rp>(</rp><rt>と</rt><rp>)</rp></ruby>ってください。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "чийг"
                },
                {
                    "jp": "針路",
                    "reading": "しんろ",
                    "en": "course",
                    "meanings": [
                        "course",
                        "direction"
                    ],
                    "example": null,
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "чиглэл"
                },
                {
                    "jp": "水平",
                    "reading": "すいへい",
                    "en": "horizontal",
                    "meanings": [
                        "level",
                        "horizontal"
                    ],
                    "example": {
                        "jp": "水平線に漁船がいくつか見えます。",
                        "en": "I see some fishing boats on the horizon.",
                        "furigana": "<ruby>水平<rp>(</rp><rt>すいへい</rt><rp>)</rp></ruby><ruby>線<rp>(</rp><rt>せん</rt><rp>)</rp></ruby>に<ruby>漁船<rp>(</rp><rt>ぎょせん</rt><rp>)</rp></ruby>がいくつか<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>えます。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хэвтээ"
                },
                {
                    "jp": "水素",
                    "reading": "すいそ",
                    "en": "hydrogen",
                    "meanings": [
                        "hydrogen"
                    ],
                    "example": {
                        "jp": "水は水素と酸素で構成されている。",
                        "en": "Water consists of hydrogen and oxygen.",
                        "furigana": "<ruby>水<rp>(</rp><rt>みず</rt><rp>)</rp></ruby>は<ruby>水素<rp>(</rp><rt>すいそ</rt><rp>)</rp></ruby>と<ruby>酸素<rp>(</rp><rt>さんそ</rt><rp>)</rp></ruby>で<ruby>構成<rp>(</rp><rt>こうせい</rt><rp>)</rp></ruby>されている。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "устөрөгч"
                }
            ]
        ]
    },
    {
        "level": 40,
        "jlpt": "N2",
        "title": "N2 · Level 10",
        "sets": [
            [
                {
                    "jp": "蒸気",
                    "reading": "じょうき",
                    "en": "steam",
                    "meanings": [
                        "steam",
                        "vapor"
                    ],
                    "example": {
                        "jp": "彼は蒸気で船を動かすのに成功した。",
                        "en": "He succeeded in applying steam to navigation.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>蒸気<rp>(</rp><rt>じょうき</rt><rp>)</rp></ruby>で<ruby>船<rp>(</rp><rt>ふね</rt><rp>)</rp></ruby>を<ruby>動<rp>(</rp><rt>うご</rt><rp>)</rp></ruby>かすのに<ruby>成功<rp>(</rp><rt>せいこう</rt><rp>)</rp></ruby>した。",
                        "enMn": "Тэр хөлгийг уурын хүчээр хөдөлгөхөд амжилтанд хүрсэн."
                    },
                    "phonetic": "丞",
                    "phoneticReading": "ジョウ",
                    "enMn": "уур"
                },
                {
                    "jp": "蒸発",
                    "reading": "じょうはつ",
                    "en": "evaporation",
                    "meanings": [
                        "evaporation",
                        "unexplained disappearance"
                    ],
                    "example": {
                        "jp": "水分は温められると蒸発する。",
                        "en": "Water evaporates when it is heated.",
                        "furigana": "<ruby>水分<rp>(</rp><rt>すいぶん</rt><rp>)</rp></ruby>は<ruby>温<rp>(</rp><rt>あたた</rt><rp>)</rp></ruby>められると<ruby>蒸発<rp>(</rp><rt>じょうはつ</rt><rp>)</rp></ruby>する。"
                    },
                    "phonetic": "丞",
                    "phoneticReading": "ジョウ",
                    "enMn": "ууршилт"
                },
                {
                    "jp": "素直",
                    "reading": "すなお",
                    "en": "obedient",
                    "meanings": [
                        "obedient",
                        "meek",
                        "docile"
                    ],
                    "example": {
                        "jp": "素直に言えば、君は誤りを犯した。",
                        "en": "Frankly speaking, you made a mistake.",
                        "furigana": "<ruby>素直<rp>(</rp><rt>すなお</rt><rp>)</rp></ruby>に<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>えば、<ruby>君<rp>(</rp><rt>きみ</rt><rp>)</rp></ruby>は<ruby>誤<rp>(</rp><rt>あやま</rt><rp>)</rp></ruby>りを<ruby>犯<rp>(</rp><rt>おか</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дуулгавартай"
                },
                {
                    "jp": "炊事",
                    "reading": "すいじ",
                    "en": "cooking",
                    "meanings": [
                        "cooking"
                    ],
                    "example": {
                        "jp": "私は炊事が全然できない。",
                        "en": "I'm all thumbs in the kitchen.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>炊事<rp>(</rp><rt>すいじ</rt><rp>)</rp></ruby>が<ruby>全然<rp>(</rp><rt>ぜんぜん</rt><rp>)</rp></ruby>できない。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хоол хийх"
                },
                {
                    "jp": "水蒸気",
                    "reading": "すいじょうき",
                    "en": "water vapor",
                    "meanings": [
                        "water vapor",
                        "steam"
                    ],
                    "example": {
                        "jp": "水は沸騰すると水蒸気になる。",
                        "en": "Water turns into steam when it is boiled.",
                        "furigana": "<ruby>水<rp>(</rp><rt>みず</rt><rp>)</rp></ruby>は<ruby>沸騰<rp>(</rp><rt>ふっとう</rt><rp>)</rp></ruby>すると<ruby>水蒸気<rp>(</rp><rt>すいじょうき</rt><rp>)</rp></ruby>になる。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "усны уур"
                },
                {
                    "jp": "水面",
                    "reading": "すいめん",
                    "en": "water surface",
                    "meanings": [
                        "water's surface"
                    ],
                    "example": {
                        "jp": "１枚の落ち葉が水面に浮かんでいた。",
                        "en": "A fallen leaf floated on the surface of the water.",
                        "furigana": "１<ruby>枚<rp>(</rp><rt>まい</rt><rp>)</rp></ruby>の<ruby>落<rp>(</rp><rt>お</rt><rp>)</rp></ruby>ち<ruby>葉<rp>(</rp><rt>ば</rt><rp>)</rp></ruby>が<ruby>水面<rp>(</rp><rt>すいめん</rt><rp>)</rp></ruby>に<ruby>浮<rp>(</rp><rt>う</rt><rp>)</rp></ruby>かんでいた。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "усны гадаргуу"
                },
                {
                    "jp": "隙間",
                    "reading": "すきま",
                    "en": "gap",
                    "meanings": [
                        "crack",
                        "gap",
                        "opening"
                    ],
                    "example": {
                        "jp": "カーテンの隙間から光が差し込む。",
                        "en": "Light flows in through a gap in the curtain.",
                        "furigana": "カーテンの<ruby>隙間<rp>(</rp><rt>すきま</rt><rp>)</rp></ruby>から<ruby>光<rp>(</rp><rt>ひかり</rt><rp>)</rp></ruby>が<ruby>差<rp>(</rp><rt>さ</rt><rp>)</rp></ruby>し<ruby>込<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>む。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "зай завсар"
                },
                {
                    "jp": "推定",
                    "reading": "すいてい",
                    "en": "presumption",
                    "meanings": [
                        "presumption",
                        "assumption",
                        "estimation"
                    ],
                    "example": {
                        "jp": "彼女は３０歳過ぎだと推定する。",
                        "en": "I guess that she is over thirty.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は３０<ruby>歳<rp>(</rp><rt>さい</rt><rp>)</rp></ruby><ruby>過<rp>(</rp><rt>す</rt><rp>)</rp></ruby>ぎだと<ruby>推定<rp>(</rp><rt>すいてい</rt><rp>)</rp></ruby>する。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "таамаглал"
                },
                {
                    "jp": "水産",
                    "reading": "すいさん",
                    "en": "marine products",
                    "meanings": [
                        "marine products",
                        "fisheries"
                    ],
                    "example": null,
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "далайн бүтээгдэхүүн"
                },
                {
                    "jp": "寸法",
                    "reading": "すんぽう",
                    "en": "measurement",
                    "meanings": [
                        "measurement",
                        "size",
                        "dimension"
                    ],
                    "example": {
                        "jp": "これらの寸法は設計図に一致する。",
                        "en": "These measurements conform to the blueprints.",
                        "furigana": "これらの<ruby>寸法<rp>(</rp><rt>すんぽう</rt><rp>)</rp></ruby>は<ruby>設計<rp>(</rp><rt>せっけい</rt><rp>)</rp></ruby><ruby>図<rp>(</rp><rt>ず</rt><rp>)</rp></ruby>に<ruby>一致<rp>(</rp><rt>いっち</rt><rp>)</rp></ruby>する。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хэмжилт"
                }
            ]
        ]
    },
    {
        "level": 41,
        "jlpt": "N1",
        "title": "N1 · Level 1",
        "sets": [
            [
                {
                    "jp": "個性",
                    "reading": "こせい",
                    "en": "individuality",
                    "meanings": [
                        "individuality",
                        "personality",
                        "idiosyncrasy"
                    ],
                    "example": {
                        "jp": "彼女は個性的な話し方をしていた。",
                        "en": "She had an individual style of speaking.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>個性<rp>(</rp><rt>こせい</rt><rp>)</rp></ruby><ruby>的<rp>(</rp><rt>てき</rt><rp>)</rp></ruby>な<ruby>話<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>し<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>をしていた。"
                    },
                    "phonetic": "古",
                    "phoneticReading": "コ",
                    "enMn": "онцлог"
                },
                {
                    "jp": "固定",
                    "reading": "こてい",
                    "en": "fixed",
                    "meanings": [
                        "fixation",
                        "fixing (e.g., salary, capital)"
                    ],
                    "example": {
                        "jp": "階級組織は長い間固定されてきた。",
                        "en": "The hierarchy of rank has long been fixed.",
                        "furigana": "<ruby>階級<rp>(</rp><rt>かいきゅう</rt><rp>)</rp></ruby><ruby>組織<rp>(</rp><rt>そしき</rt><rp>)</rp></ruby>は<ruby>長<rp>(</rp><rt>なが</rt><rp>)</rp></ruby>い<ruby>間<rp>(</rp><rt>ま</rt><rp>)</rp></ruby><ruby>固定<rp>(</rp><rt>こてい</rt><rp>)</rp></ruby>されてきた。"
                    },
                    "phonetic": "古",
                    "phoneticReading": "コ",
                    "enMn": "тогтмол"
                },
                {
                    "jp": "固有",
                    "reading": "こゆう",
                    "en": "characteristic",
                    "meanings": [
                        "characteristic",
                        "tradition",
                        "peculiar"
                    ],
                    "example": {
                        "jp": "言語は人間固有の性質である。",
                        "en": "Language is a specifically human characteristic.",
                        "furigana": "<ruby>言語<rp>(</rp><rt>げんご</rt><rp>)</rp></ruby>は<ruby>人間<rp>(</rp><rt>にんげん</rt><rp>)</rp></ruby><ruby>固有<rp>(</rp><rt>こゆう</rt><rp>)</rp></ruby>の<ruby>性質<rp>(</rp><rt>せいしつ</rt><rp>)</rp></ruby>である。"
                    },
                    "phonetic": "古",
                    "phoneticReading": "コ",
                    "enMn": "өвөрмөц шинж"
                },
                {
                    "jp": "滑稽",
                    "reading": "こっけい",
                    "en": "funny",
                    "meanings": [
                        "funny",
                        "humorous",
                        "comical"
                    ],
                    "example": {
                        "jp": "彼の気取った話し方がとても滑稽におもえた。",
                        "en": "His affected manner of speaking seemed very absurd to me.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>の<ruby>気取<rp>(</rp><rt>きど</rt><rp>)</rp></ruby>った<ruby>話<rp>(</rp><rt>はな</rt><rp>)</rp></ruby>し<ruby>方<rp>(</rp><rt>かた</rt><rp>)</rp></ruby>がとても<ruby>滑稽<rp>(</rp><rt>こっけい</rt><rp>)</rp></ruby>におもえた。",
                        "enMn": "Түүний хиймэл ярианы хэв маяг надад маш утгагүй санагдсан."
                    },
                    "phonetic": "骨",
                    "phoneticReading": "コツ",
                    "enMn": "хөгжилтэй"
                },
                {
                    "jp": "骨董品",
                    "reading": "こっとうひん",
                    "en": "antique",
                    "meanings": [
                        "curio"
                    ],
                    "example": {
                        "jp": "彼は大阪で骨董品を扱っている。",
                        "en": "He deals antiques in Osaka.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>大阪<rp>(</rp><rt>おおさか</rt><rp>)</rp></ruby>で<ruby>骨董<rp>(</rp><rt>こっとう</rt><rp>)</rp></ruby><ruby>品<rp>(</rp><rt>ひん</rt><rp>)</rp></ruby>を<ruby>扱<rp>(</rp><rt>あつか</rt><rp>)</rp></ruby>っている。"
                    },
                    "phonetic": "骨",
                    "phoneticReading": "コツ",
                    "enMn": "эртний эдлэл"
                },
                {
                    "jp": "誇張",
                    "reading": "こちょう",
                    "en": "exaggeration",
                    "meanings": [
                        "exaggeration"
                    ],
                    "example": {
                        "jp": "彼を天才と呼んでも誇張ではない。",
                        "en": "It is no exaggeration to call him a genius.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>を<ruby>天才<rp>(</rp><rt>てんさい</rt><rp>)</rp></ruby>と<ruby>呼<rp>(</rp><rt>よ</rt><rp>)</rp></ruby>んでも<ruby>誇張<rp>(</rp><rt>こちょう</rt><rp>)</rp></ruby>ではない。"
                    },
                    "phonetic": "夸",
                    "phoneticReading": "コ、ケ",
                    "enMn": "хэтрүүлэг"
                },
                {
                    "jp": "混同",
                    "reading": "こんどう",
                    "en": "confusion",
                    "meanings": [
                        "confusion",
                        "mixing",
                        "merger"
                    ],
                    "example": {
                        "jp": "ｄａｒｅとｄｅａｒとを混同するな。",
                        "en": "Don't confuse \"dare\" and \"dear\".",
                        "furigana": "ｄａｒｅとｄｅａｒとを<ruby>混同<rp>(</rp><rt>こんどう</rt><rp>)</rp></ruby>するな。"
                    },
                    "phonetic": "昆",
                    "phoneticReading": "コン",
                    "enMn": "будилал"
                },
                {
                    "jp": "抗議",
                    "reading": "こうぎ",
                    "en": "protest",
                    "meanings": [
                        "protest",
                        "objection"
                    ],
                    "example": {
                        "jp": "彼は指を立てて抗議の意を示した。",
                        "en": "He raised a finger in protest.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>指<rp>(</rp><rt>ゆび</rt><rp>)</rp></ruby>を<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>てて<ruby>抗議<rp>(</rp><rt>こうぎ</rt><rp>)</rp></ruby>の<ruby>意<rp>(</rp><rt>い</rt><rp>)</rp></ruby>を<ruby>示<rp>(</rp><rt>しめ</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": "亢",
                    "phoneticReading": "コウ",
                    "enMn": "эсэргүүцэл"
                },
                {
                    "jp": "巧妙",
                    "reading": "こうみょう",
                    "en": "ingenious",
                    "meanings": [
                        "ingenious",
                        "skillful",
                        "clever"
                    ],
                    "example": {
                        "jp": "人工内耳は技術的に巧妙な機器です。",
                        "en": "The cochlea implant is a technically ingenious device.",
                        "furigana": "<ruby>人工<rp>(</rp><rt>じんこう</rt><rp>)</rp></ruby><ruby>内耳<rp>(</rp><rt>ないじ</rt><rp>)</rp></ruby>は<ruby>技術<rp>(</rp><rt>ぎじゅつ</rt><rp>)</rp></ruby><ruby>的<rp>(</rp><rt>てき</rt><rp>)</rp></ruby>に<ruby>巧妙<rp>(</rp><rt>こうみょう</rt><rp>)</rp></ruby>な<ruby>機器<rp>(</rp><rt>きき</rt><rp>)</rp></ruby>です。"
                    },
                    "phonetic": "工",
                    "phoneticReading": "コウ、ク",
                    "enMn": "овсгоотой"
                },
                {
                    "jp": "誤差",
                    "reading": "ごさ",
                    "en": "error",
                    "meanings": [
                        "error"
                    ],
                    "example": {
                        "jp": "我々は誤差を見込んで余裕をとっておいた。",
                        "en": "We left a margin for error in our estimates.",
                        "furigana": "<ruby>我々<rp>(</rp><rt>われわれ</rt><rp>)</rp></ruby>は<ruby>誤差<rp>(</rp><rt>ごさ</rt><rp>)</rp></ruby>を<ruby>見込<rp>(</rp><rt>みこ</rt><rp>)</rp></ruby>んで<ruby>余裕<rp>(</rp><rt>よゆう</rt><rp>)</rp></ruby>をとっておいた。"
                    },
                    "phonetic": "呉",
                    "phoneticReading": "ゴ",
                    "enMn": "алдаа"
                }
            ]
        ]
    },
    {
        "level": 42,
        "jlpt": "N1",
        "title": "N1 · Level 2",
        "sets": [
            [
                {
                    "jp": "根底",
                    "reading": "こんてい",
                    "en": "root",
                    "meanings": [
                        "root",
                        "basis",
                        "foundation"
                    ],
                    "example": {
                        "jp": "この議論の根底には、問題としている規則が言語に存在するという仮説がある。",
                        "en": "Basic to the argument is the assumption that the rules in question are present in the language.",
                        "furigana": "この<ruby>議論<rp>(</rp><rt>ぎろん</rt><rp>)</rp></ruby>の<ruby>根底<rp>(</rp><rt>こんてい</rt><rp>)</rp></ruby>には、<ruby>問題<rp>(</rp><rt>もんだい</rt><rp>)</rp></ruby>としている<ruby>規則<rp>(</rp><rt>きそく</rt><rp>)</rp></ruby>が<ruby>言語<rp>(</rp><rt>げんご</rt><rp>)</rp></ruby>に<ruby>存在<rp>(</rp><rt>そんざい</rt><rp>)</rp></ruby>するという<ruby>仮説<rp>(</rp><rt>かせつ</rt><rp>)</rp></ruby>がある。"
                    },
                    "phonetic": "艮",
                    "phoneticReading": "コン",
                    "enMn": "үндэс"
                },
                {
                    "jp": "根本",
                    "reading": "こんぽん",
                    "en": "fundamental",
                    "meanings": [
                        "foundation",
                        "root",
                        "base"
                    ],
                    "example": {
                        "jp": "多数決原理が民主主義の根本原則だ。",
                        "en": "Majority rule is a basic principle of democracy.",
                        "furigana": "<ruby>多数決<rp>(</rp><rt>たすうけつ</rt><rp>)</rp></ruby><ruby>原理<rp>(</rp><rt>げんり</rt><rp>)</rp></ruby>が<ruby>民主<rp>(</rp><rt>みんしゅ</rt><rp>)</rp></ruby><ruby>主義<rp>(</rp><rt>しゅぎ</rt><rp>)</rp></ruby>の<ruby>根本<rp>(</rp><rt>こんぽん</rt><rp>)</rp></ruby><ruby>原則<rp>(</rp><rt>げんそく</rt><rp>)</rp></ruby>だ。"
                    },
                    "phonetic": "艮",
                    "phoneticReading": "コン",
                    "enMn": "суурь"
                },
                {
                    "jp": "語彙",
                    "reading": "ごい",
                    "en": "vocabulary",
                    "meanings": [
                        "vocabulary",
                        "glossary"
                    ],
                    "example": {
                        "jp": "読書は語彙を増やすのに役に立つ。",
                        "en": "Reading helps you build up your vocabulary.",
                        "furigana": "<ruby>読書<rp>(</rp><rt>どくしょ</rt><rp>)</rp></ruby>は<ruby>語彙<rp>(</rp><rt>ごい</rt><rp>)</rp></ruby>を<ruby>増<rp>(</rp><rt>ふ</rt><rp>)</rp></ruby>やすのに<ruby>役<rp>(</rp><rt>やく</rt><rp>)</rp></ruby>に<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>つ。"
                    },
                    "phonetic": "五",
                    "phoneticReading": "ゴ",
                    "enMn": "үгийн сан"
                },
                {
                    "jp": "語源",
                    "reading": "ごげん",
                    "en": "etymology",
                    "meanings": [
                        "word root",
                        "word derivation",
                        "etymology"
                    ],
                    "example": {
                        "jp": "これらの語は同じ語源から出ている。",
                        "en": "These words are derived from the same root.",
                        "furigana": "これらの<ruby>語<rp>(</rp><rt>かたり</rt><rp>)</rp></ruby>は<ruby>同<rp>(</rp><rt>おな</rt><rp>)</rp></ruby>じ<ruby>語源<rp>(</rp><rt>ごげん</rt><rp>)</rp></ruby>から<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>ている。"
                    },
                    "phonetic": "五",
                    "phoneticReading": "ゴ",
                    "enMn": "үг гарлын судлал"
                },
                {
                    "jp": "告白",
                    "reading": "こくはく",
                    "en": "confession",
                    "meanings": [
                        "confession",
                        "acknowledgment"
                    ],
                    "example": {
                        "jp": "彼は自分が無神論者だと告白した。",
                        "en": "He avowed himself an atheist.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>自分<rp>(</rp><rt>じぶん</rt><rp>)</rp></ruby>が<ruby>無神<rp>(</rp><rt>むしん</rt><rp>)</rp></ruby><ruby>論<rp>(</rp><rt>ろん</rt><rp>)</rp></ruby><ruby>者<rp>(</rp><rt>しゃ</rt><rp>)</rp></ruby>だと<ruby>告白<rp>(</rp><rt>こくはく</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": "告",
                    "phoneticReading": "コク、コウ",
                    "enMn": "наминчлал"
                },
                {
                    "jp": "考古学",
                    "reading": "こうこがく",
                    "en": "archaeology",
                    "meanings": [
                        "archeology"
                    ],
                    "example": {
                        "jp": "考古学は人類が残した痕跡の研究を通し、人類の活動とその変化を研究する学問である。",
                        "en": "Archeology is a science that studies the activities of human beings and their changes through the study of the traces left by them.",
                        "furigana": "<ruby>考古学<rp>(</rp><rt>こうこがく</rt><rp>)</rp></ruby>は<ruby>人類<rp>(</rp><rt>じんるい</rt><rp>)</rp></ruby>が<ruby>残<rp>(</rp><rt>のこ</rt><rp>)</rp></ruby>した<ruby>痕跡<rp>(</rp><rt>こんせき</rt><rp>)</rp></ruby>の<ruby>研究<rp>(</rp><rt>けんきゅう</rt><rp>)</rp></ruby>を<ruby>通<rp>(</rp><rt>とお</rt><rp>)</rp></ruby>し、<ruby>人類<rp>(</rp><rt>じんるい</rt><rp>)</rp></ruby>の<ruby>活動<rp>(</rp><rt>かつどう</rt><rp>)</rp></ruby>とその<ruby>変化<rp>(</rp><rt>へんか</rt><rp>)</rp></ruby>を<ruby>研究<rp>(</rp><rt>けんきゅう</rt><rp>)</rp></ruby>する<ruby>学問<rp>(</rp><rt>がくもん</rt><rp>)</rp></ruby>である。"
                    },
                    "phonetic": "耂",
                    "phoneticReading": "コウ",
                    "enMn": "археологи"
                },
                {
                    "jp": "皇居",
                    "reading": "こうきょ",
                    "en": "Imperial Palace",
                    "meanings": [
                        "Imperial Palace"
                    ],
                    "example": {
                        "jp": "最高裁判所は皇居の近くにある。",
                        "en": "The Supreme Court is located near the Imperial Palace.",
                        "furigana": "<ruby>最高<rp>(</rp><rt>さいこう</rt><rp>)</rp></ruby><ruby>裁判所<rp>(</rp><rt>さいばんしょ</rt><rp>)</rp></ruby>は<ruby>皇居<rp>(</rp><rt>こうきょ</rt><rp>)</rp></ruby>の<ruby>近<rp>(</rp><rt>ちか</rt><rp>)</rp></ruby>くにある。"
                    },
                    "phonetic": "皇",
                    "phoneticReading": "コウ",
                    "enMn": "эзэн хааны ордон"
                },
                {
                    "jp": "香辛料",
                    "reading": "こうしんりょう",
                    "en": "spices",
                    "meanings": [
                        "spices"
                    ],
                    "example": {
                        "jp": "韓国料理は、香辛料のきいた味でよく知られている。",
                        "en": "Korean food is noted for its spicy flavor.",
                        "furigana": "<ruby>韓国<rp>(</rp><rt>かんこく</rt><rp>)</rp></ruby><ruby>料理<rp>(</rp><rt>りょうり</rt><rp>)</rp></ruby>は、<ruby>香辛料<rp>(</rp><rt>こうしんりょう</rt><rp>)</rp></ruby>のきいた<ruby>味<rp>(</rp><rt>あじ</rt><rp>)</rp></ruby>でよく<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>られている。"
                    },
                    "phonetic": "香",
                    "phoneticReading": "キョウ",
                    "enMn": "амтлагч"
                },
                {
                    "jp": "交付",
                    "reading": "こうふ",
                    "en": "issuance",
                    "meanings": [
                        "delivering",
                        "furnishing (with copies)"
                    ],
                    "example": {
                        "jp": "市長は私に身分証明書を交付した。",
                        "en": "The mayor provided me with an identity card.",
                        "furigana": "<ruby>市長<rp>(</rp><rt>しちょう</rt><rp>)</rp></ruby>は<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>に<ruby>身分<rp>(</rp><rt>みぶん</rt><rp>)</rp></ruby><ruby>証明<rp>(</rp><rt>しょうめい</rt><rp>)</rp></ruby><ruby>書<rp>(</rp><rt>しょ</rt><rp>)</rp></ruby>を<ruby>交付<rp>(</rp><rt>こうふ</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ",
                    "enMn": "олголт"
                },
                {
                    "jp": "賢明",
                    "reading": "けんめい",
                    "en": "wise",
                    "meanings": [
                        "wisdom",
                        "intelligence",
                        "prudence"
                    ],
                    "example": {
                        "jp": "彼女の忠告に従うとは賢明ですね。",
                        "en": "It is sensible of you to follow her advice.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>の<ruby>忠告<rp>(</rp><rt>ちゅうこく</rt><rp>)</rp></ruby>に<ruby>従<rp>(</rp><rt>したが</rt><rp>)</rp></ruby>うとは<ruby>賢明<rp>(</rp><rt>けんめい</rt><rp>)</rp></ruby>ですね。"
                    },
                    "phonetic": "臤",
                    "phoneticReading": "ケン",
                    "enMn": "ухаалаг"
                }
            ]
        ]
    },
    {
        "level": 43,
        "jlpt": "N1",
        "title": "N1 · Level 3",
        "sets": [
            [
                {
                    "jp": "古代",
                    "reading": "こだい",
                    "en": "ancient times",
                    "meanings": [
                        "ancient times"
                    ],
                    "example": {
                        "jp": "民主主義は古代ギリシャに始まった。",
                        "en": "Democracy originated in Ancient Greece.",
                        "furigana": "<ruby>民主<rp>(</rp><rt>みんしゅ</rt><rp>)</rp></ruby><ruby>主義<rp>(</rp><rt>しゅぎ</rt><rp>)</rp></ruby>は<ruby>古代<rp>(</rp><rt>こだい</rt><rp>)</rp></ruby>ギリシャに<ruby>始<rp>(</rp><rt>はじ</rt><rp>)</rp></ruby>まった。"
                    },
                    "phonetic": "古",
                    "phoneticReading": "コ",
                    "enMn": "эртний үе"
                },
                {
                    "jp": "個別",
                    "reading": "こべつ",
                    "en": "individual case",
                    "meanings": [
                        "particular case"
                    ],
                    "example": {
                        "jp": "あらゆる事態を個別に分析する必要がある。",
                        "en": "Every situation requires individual analysis.",
                        "furigana": "あらゆる<ruby>事態<rp>(</rp><rt>じたい</rt><rp>)</rp></ruby>を<ruby>個別<rp>(</rp><rt>こべつ</rt><rp>)</rp></ruby>に<ruby>分析<rp>(</rp><rt>ぶんせき</rt><rp>)</rp></ruby>する<ruby>必要<rp>(</rp><rt>ひつよう</rt><rp>)</rp></ruby>がある。"
                    },
                    "phonetic": "古",
                    "phoneticReading": "コ",
                    "enMn": "тухайн тохиолдол"
                },
                {
                    "jp": "孤独",
                    "reading": "こどく",
                    "en": "loneliness",
                    "meanings": [
                        "isolation",
                        "loneliness",
                        "solitude"
                    ],
                    "example": {
                        "jp": "富と名声はあるのに、彼は孤独だ。",
                        "en": "For all his wealth and fame, he is a lonely man.",
                        "furigana": "<ruby>富<rp>(</rp><rt>とみ</rt><rp>)</rp></ruby>と<ruby>名声<rp>(</rp><rt>めいせい</rt><rp>)</rp></ruby>はあるのに、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>孤独<rp>(</rp><rt>こどく</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Тэр баян, алдартай хэдий ч ганцаардмал хүн юм."
                    },
                    "phonetic": "瓜",
                    "phoneticReading": "コ",
                    "enMn": "ганцаардал"
                },
                {
                    "jp": "孤児",
                    "reading": "こじ",
                    "en": "orphan",
                    "meanings": [
                        "orphan"
                    ],
                    "example": {
                        "jp": "彼は孤児院にその包みを配達した。",
                        "en": "He delivered the package to the orphanage.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>孤児<rp>(</rp><rt>こじ</rt><rp>)</rp></ruby><ruby>院<rp>(</rp><rt>いん</rt><rp>)</rp></ruby>にその<ruby>包<rp>(</rp><rt>つつ</rt><rp>)</rp></ruby>みを<ruby>配達<rp>(</rp><rt>はいたつ</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": "瓜",
                    "phoneticReading": "コ",
                    "enMn": "өнчин хүүхэд"
                },
                {
                    "jp": "洪水",
                    "reading": "こうずい",
                    "en": "flood",
                    "meanings": [
                        "flood"
                    ],
                    "example": {
                        "jp": "大洪水で現地の交通網が麻痺した。",
                        "en": "The massive flood paralyzed the local transportation network.",
                        "furigana": "<ruby>大<rp>(</rp><rt>だい</rt><rp>)</rp></ruby><ruby>洪水<rp>(</rp><rt>こうずい</rt><rp>)</rp></ruby>で<ruby>現地<rp>(</rp><rt>げんち</rt><rp>)</rp></ruby>の<ruby>交通<rp>(</rp><rt>こうつう</rt><rp>)</rp></ruby><ruby>網<rp>(</rp><rt>もう</rt><rp>)</rp></ruby>が<ruby>麻痺<rp>(</rp><rt>まひ</rt><rp>)</rp></ruby>した。",
                        "enMn": "Асар их үер орон нутгийн тээврийн сүлжээг зогсоов."
                    },
                    "phonetic": "共",
                    "phoneticReading": "キョウ、コウ",
                    "enMn": "үер"
                },
                {
                    "jp": "向上",
                    "reading": "こうじょう",
                    "en": "improvement",
                    "meanings": [
                        "rise",
                        "improvement",
                        "progress"
                    ],
                    "example": {
                        "jp": "彼女達は社会的地位の向上を願った。",
                        "en": "The women longed to climb up the social ladder.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby><ruby>達<rp>(</rp><rt>たち</rt><rp>)</rp></ruby>は<ruby>社会<rp>(</rp><rt>しゃかい</rt><rp>)</rp></ruby><ruby>的<rp>(</rp><rt>てき</rt><rp>)</rp></ruby><ruby>地位<rp>(</rp><rt>ちい</rt><rp>)</rp></ruby>の<ruby>向上<rp>(</rp><rt>こうじょう</rt><rp>)</rp></ruby>を<ruby>願<rp>(</rp><rt>ねが</rt><rp>)</rp></ruby>った。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сайжруулалт"
                },
                {
                    "jp": "国防",
                    "reading": "こくぼう",
                    "en": "national defense",
                    "meanings": [
                        "national defense"
                    ],
                    "example": {
                        "jp": "国防のため大きな額が計上された。",
                        "en": "A considerable amount of money was appropriated for the national defense.",
                        "furigana": "<ruby>国防<rp>(</rp><rt>こくぼう</rt><rp>)</rp></ruby>のため<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きな<ruby>額<rp>(</rp><rt>がく</rt><rp>)</rp></ruby>が<ruby>計上<rp>(</rp><rt>けいじょう</rt><rp>)</rp></ruby>された。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "батлан хамгаалалт"
                },
                {
                    "jp": "碁盤",
                    "reading": "ごばん",
                    "en": "Go board",
                    "meanings": [
                        "Go board"
                    ],
                    "example": null,
                    "phonetic": "其",
                    "phoneticReading": "キ、ギ、ゴ",
                    "enMn": "го тоглоомын хөлөг"
                },
                {
                    "jp": "懲りる",
                    "reading": "こりる",
                    "en": "to learn a lesson",
                    "meanings": [
                        "to learn by experience",
                        "to be disgusted with"
                    ],
                    "example": {
                        "jp": "これに懲りずにまたやれよ。",
                        "en": "Don't let this discourage you from trying it again.",
                        "furigana": "これに<ruby>懲<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>りずにまたやれよ。"
                    },
                    "phonetic": "徴",
                    "phoneticReading": "チョウ",
                    "enMn": "сургамж авах"
                },
                {
                    "jp": "暦",
                    "reading": "こよみ",
                    "en": "calendar",
                    "meanings": [
                        "calendar",
                        "almanac"
                    ],
                    "example": {
                        "jp": "マヤ暦には、19の月があります。",
                        "en": "The Mayan calendar has 19 months.",
                        "furigana": "マヤ<ruby>暦<rp>(</rp><rt>れき</rt><rp>)</rp></ruby>には、19の<ruby>月<rp>(</rp><rt>つき</rt><rp>)</rp></ruby>があります。"
                    },
                    "phonetic": "𠩵",
                    "phoneticReading": "レキ",
                    "enMn": "хуанли"
                }
            ]
        ]
    },
    {
        "level": 44,
        "jlpt": "N1",
        "title": "N1 · Level 4",
        "sets": [
            [
                {
                    "jp": "交渉",
                    "reading": "こうしょう",
                    "en": "negotiation",
                    "meanings": [
                        "negotiation"
                    ],
                    "example": {
                        "jp": "労働組合は経営陣と交渉している。",
                        "en": "The labor union is negotiating with the owners.",
                        "furigana": "<ruby>労働<rp>(</rp><rt>ろうどう</rt><rp>)</rp></ruby><ruby>組合<rp>(</rp><rt>くみあい</rt><rp>)</rp></ruby>は<ruby>経営<rp>(</rp><rt>けいえい</rt><rp>)</rp></ruby><ruby>陣<rp>(</rp><rt>じん</rt><rp>)</rp></ruby>と<ruby>交渉<rp>(</rp><rt>こうしょう</rt><rp>)</rp></ruby>している。",
                        "enMn": "Хөдөлмөрийн эвлэл эзэдтэй хэлэлцээ хийж байна."
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ",
                    "enMn": "хэлэлцээр"
                },
                {
                    "jp": "効率",
                    "reading": "こうりつ",
                    "en": "efficiency",
                    "meanings": [
                        "efficiency"
                    ],
                    "example": {
                        "jp": "勉強は効率的にしなくてはいけない。",
                        "en": "You should study in an efficient manner.",
                        "furigana": "<ruby>勉強<rp>(</rp><rt>べんきょう</rt><rp>)</rp></ruby>は<ruby>効率<rp>(</rp><rt>こうりつ</rt><rp>)</rp></ruby><ruby>的<rp>(</rp><rt>てき</rt><rp>)</rp></ruby>にしなくてはいけない。"
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ",
                    "enMn": "үр ашиг"
                },
                {
                    "jp": "殊に",
                    "reading": "ことに",
                    "en": "especially",
                    "meanings": [
                        "especially",
                        "above all"
                    ],
                    "example": {
                        "jp": "ロックは殊に若者に人気だ。",
                        "en": "Rock music is especially popular among young people.",
                        "furigana": "ロックは<ruby>殊<rp>(</rp><rt>こと</rt><rp>)</rp></ruby>に<ruby>若者<rp>(</rp><rt>わかもの</rt><rp>)</rp></ruby>に<ruby>人気<rp>(</rp><rt>にんき</rt><rp>)</rp></ruby>だ。"
                    },
                    "phonetic": "朱",
                    "phoneticReading": "シュ",
                    "enMn": "ялангуяа"
                },
                {
                    "jp": "厳密",
                    "reading": "げんみつ",
                    "en": "rigorous",
                    "meanings": [
                        "strict",
                        "close"
                    ],
                    "example": {
                        "jp": "厳密に言うと、トマトは果物です。",
                        "en": "Strictly speaking, a tomato is a fruit.",
                        "furigana": "<ruby>厳密<rp>(</rp><rt>げんみつ</rt><rp>)</rp></ruby>に<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>うと、トマトは<ruby>果物<rp>(</rp><rt>くだもの</rt><rp>)</rp></ruby>です。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "нарийн чанд"
                },
                {
                    "jp": "好意",
                    "reading": "こうい",
                    "en": "goodwill",
                    "meanings": [
                        "good will",
                        "favor",
                        "courtesy"
                    ],
                    "example": {
                        "jp": "彼は彼女の好意を得ようと願った。",
                        "en": "He besought her to favor him.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>の<ruby>好意<rp>(</rp><rt>こうい</rt><rp>)</rp></ruby>を<ruby>得<rp>(</rp><rt>え</rt><rp>)</rp></ruby>ようと<ruby>願<rp>(</rp><rt>ねが</rt><rp>)</rp></ruby>った。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "сайхан санаа"
                },
                {
                    "jp": "権力",
                    "reading": "けんりょく",
                    "en": "power",
                    "meanings": [
                        "(political) power",
                        "authority",
                        "influence"
                    ],
                    "example": {
                        "jp": "彼には権力も能力も備わっている。",
                        "en": "He has got both authority and ability.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>には<ruby>権力<rp>(</rp><rt>けんりょく</rt><rp>)</rp></ruby>も<ruby>能力<rp>(</rp><rt>のうりょく</rt><rp>)</rp></ruby>も<ruby>備<rp>(</rp><rt>そな</rt><rp>)</rp></ruby>わっている。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "эрх мэдэл"
                },
                {
                    "jp": "心得",
                    "reading": "こころえ",
                    "en": "knowledge",
                    "meanings": [
                        "knowledge",
                        "information"
                    ],
                    "example": {
                        "jp": "彼は中庸を心得たじんぶつである。",
                        "en": "He is man of moderate views.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>中庸<rp>(</rp><rt>ちゅうよう</rt><rp>)</rp></ruby>を<ruby>心得<rp>(</rp><rt>こころえ</rt><rp>)</rp></ruby>たじんぶつである。",
                        "enMn": "Тэр дунд зэргийн үзэл бодолтой хүн юм."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "мэдлэг"
                },
                {
                    "jp": "財",
                    "reading": "ざい",
                    "en": "wealth",
                    "meanings": [
                        "fortune",
                        "riches"
                    ],
                    "example": {
                        "jp": "財を成すため、彼は地位を利用した。",
                        "en": "He exploited his position to build up his fortune.",
                        "furigana": "<ruby>財<rp>(</rp><rt>ざい</rt><rp>)</rp></ruby>を<ruby>成<rp>(</rp><rt>な</rt><rp>)</rp></ruby>すため、<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>地位<rp>(</rp><rt>ちい</rt><rp>)</rp></ruby>を<ruby>利用<rp>(</rp><rt>りよう</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": "才",
                    "phoneticReading": "サイ、ザイ",
                    "enMn": "баялаг"
                },
                {
                    "jp": "志",
                    "reading": "こころざし",
                    "en": "ambition",
                    "meanings": [
                        "will",
                        "intention",
                        "motive"
                    ],
                    "example": {
                        "jp": "何事をするにも志が大切。",
                        "en": "The will is as good as the deed.",
                        "furigana": "<ruby>何事<rp>(</rp><rt>なにごと</rt><rp>)</rp></ruby>をするにも<ruby>志<rp>(</rp><rt>こころざし</rt><rp>)</rp></ruby>が<ruby>大切<rp>(</rp><rt>たいせつ</rt><rp>)</rp></ruby>。"
                    },
                    "phonetic": "士",
                    "phoneticReading": "シ",
                    "enMn": "тэмүүлэл"
                },
                {
                    "jp": "見地",
                    "reading": "けんち",
                    "en": "viewpoint",
                    "meanings": [
                        "point of view"
                    ],
                    "example": {
                        "jp": "彼は人生を全て、金銭の見地から見る。",
                        "en": "He sees all life in terms of money.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>人生<rp>(</rp><rt>じんせい</rt><rp>)</rp></ruby>を<ruby>全<rp>(</rp><rt>すべ</rt><rp>)</rp></ruby>て、<ruby>金銭<rp>(</rp><rt>きんせん</rt><rp>)</rp></ruby>の<ruby>見地<rp>(</rp><rt>けんち</rt><rp>)</rp></ruby>から<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>る。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "үзэл бодол"
                }
            ]
        ]
    },
    {
        "level": 45,
        "jlpt": "N1",
        "title": "N1 · Level 5",
        "sets": [
            [
                {
                    "jp": "購入",
                    "reading": "こうにゅう",
                    "en": "purchase",
                    "meanings": [
                        "purchase",
                        "buy"
                    ],
                    "example": {
                        "jp": "私はその品物を半額で購入した。",
                        "en": "I purchased the goods for half price.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>はその<ruby>品物<rp>(</rp><rt>しなもの</rt><rp>)</rp></ruby>を<ruby>半額<rp>(</rp><rt>はんがく</rt><rp>)</rp></ruby>で<ruby>購入<rp>(</rp><rt>こうにゅう</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": "冓",
                    "phoneticReading": "コウ",
                    "enMn": "худалдан авалт"
                },
                {
                    "jp": "講習",
                    "reading": "こうしゅう",
                    "en": "short course",
                    "meanings": [
                        "short course",
                        "training"
                    ],
                    "example": {
                        "jp": "彼女は週に一度料理の講習を受ける。",
                        "en": "She takes cooking lessons once a week.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>週<rp>(</rp><rt>しゅう</rt><rp>)</rp></ruby>に<ruby>一度<rp>(</rp><rt>いちど</rt><rp>)</rp></ruby><ruby>料理<rp>(</rp><rt>りょうり</rt><rp>)</rp></ruby>の<ruby>講習<rp>(</rp><rt>こうしゅう</rt><rp>)</rp></ruby>を<ruby>受<rp>(</rp><rt>う</rt><rp>)</rp></ruby>ける。"
                    },
                    "phonetic": "冓",
                    "phoneticReading": "コウ",
                    "enMn": "богино курс"
                },
                {
                    "jp": "鉱業",
                    "reading": "こうぎょう",
                    "en": "mining industry",
                    "meanings": [
                        "mining industry"
                    ],
                    "example": {
                        "jp": "鉱業はチリの主要な収入源の一つである。",
                        "en": "Mining is one of the main sources of wealth in Chile.",
                        "furigana": "<ruby>鉱業<rp>(</rp><rt>こうぎょう</rt><rp>)</rp></ruby>はチリの<ruby>主要<rp>(</rp><rt>しゅよう</rt><rp>)</rp></ruby>な<ruby>収入<rp>(</rp><rt>しゅうにゅう</rt><rp>)</rp></ruby><ruby>源<rp>(</rp><rt>げん</rt><rp>)</rp></ruby>の<ruby>一<rp>(</rp><rt>ひと</rt><rp>)</rp></ruby>つである。"
                    },
                    "phonetic": "広",
                    "phoneticReading": "コウ",
                    "enMn": "уул уурхайн салбар"
                },
                {
                    "jp": "鉱山",
                    "reading": "こうざん",
                    "en": "mine",
                    "meanings": [
                        "mine"
                    ],
                    "example": {
                        "jp": "２年間、鉱山作業員だったんだ。",
                        "en": "I was a miner for two years.",
                        "furigana": "２<ruby>年間<rp>(</rp><rt>ねんかん</rt><rp>)</rp></ruby>、<ruby>鉱山<rp>(</rp><rt>こうざん</rt><rp>)</rp></ruby><ruby>作業<rp>(</rp><rt>さぎょう</rt><rp>)</rp></ruby><ruby>員<rp>(</rp><rt>いん</rt><rp>)</rp></ruby>だったんだ。"
                    },
                    "phonetic": "広",
                    "phoneticReading": "コウ",
                    "enMn": "уурхай"
                },
                {
                    "jp": "公認",
                    "reading": "こうにん",
                    "en": "official recognition",
                    "meanings": [
                        "official recognition",
                        "authorization"
                    ],
                    "example": {
                        "jp": "トムは公認会計士なんですよね？",
                        "en": "Tom is a CPA, isn't he?",
                        "furigana": "トムは<ruby>公認<rp>(</rp><rt>こうにん</rt><rp>)</rp></ruby><ruby>会計士<rp>(</rp><rt>かいけいし</rt><rp>)</rp></ruby>なんですよね？"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "албан хүлээн зөвшөөрөл"
                },
                {
                    "jp": "公募",
                    "reading": "こうぼ",
                    "en": "public appeal",
                    "meanings": [
                        "public appeal",
                        "public contribution"
                    ],
                    "example": null,
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "олон нийтийн уриалга"
                },
                {
                    "jp": "好調",
                    "reading": "こうちょう",
                    "en": "favorable",
                    "meanings": [
                        "satisfactory",
                        "in good shape"
                    ],
                    "example": {
                        "jp": "売上が右肩上がりで好調を裏づけた。",
                        "en": "Growing sales gave support to the idea that all was well.",
                        "furigana": "<ruby>売上<rp>(</rp><rt>うりあげ</rt><rp>)</rp></ruby>が<ruby>右肩<rp>(</rp><rt>みぎかた</rt><rp>)</rp></ruby><ruby>上<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>がりで<ruby>好調<rp>(</rp><rt>こうちょう</rt><rp>)</rp></ruby>を<ruby>裏<rp>(</rp><rt>うら</rt><rp>)</rp></ruby>づけた。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "таатай"
                },
                {
                    "jp": "後退",
                    "reading": "こうたい",
                    "en": "retreat",
                    "meanings": [
                        "retreat",
                        "backspace"
                    ],
                    "example": {
                        "jp": "彼は前進も後退もすまいと決めた。",
                        "en": "He decided neither to advance nor to retreat.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>前進<rp>(</rp><rt>ぜんしん</rt><rp>)</rp></ruby>も<ruby>後退<rp>(</rp><rt>こうたい</rt><rp>)</rp></ruby>もすまいと<ruby>決<rp>(</rp><rt>き</rt><rp>)</rp></ruby>めた。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "ухрах"
                },
                {
                    "jp": "公団",
                    "reading": "こうだん",
                    "en": "public corporation",
                    "meanings": [
                        "public corporation"
                    ],
                    "example": {
                        "jp": "公団は建設計画の入札を募集した。",
                        "en": "The corporation invited bids for the construction project.",
                        "furigana": "<ruby>公団<rp>(</rp><rt>こうだん</rt><rp>)</rp></ruby>は<ruby>建設<rp>(</rp><rt>けんせつ</rt><rp>)</rp></ruby><ruby>計画<rp>(</rp><rt>けいかく</rt><rp>)</rp></ruby>の<ruby>入札<rp>(</rp><rt>にゅうさつ</rt><rp>)</rp></ruby>を<ruby>募集<rp>(</rp><rt>ぼしゅう</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "төрийн корпораци"
                },
                {
                    "jp": "口頭",
                    "reading": "こうとう",
                    "en": "oral",
                    "meanings": [
                        "oral"
                    ],
                    "example": {
                        "jp": "彼女は英語の口頭試験を受けた。",
                        "en": "She had an oral examination in English.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>英語<rp>(</rp><rt>えいご</rt><rp>)</rp></ruby>の<ruby>口頭<rp>(</rp><rt>こうとう</rt><rp>)</rp></ruby><ruby>試験<rp>(</rp><rt>しけん</rt><rp>)</rp></ruby>を<ruby>受<rp>(</rp><rt>う</rt><rp>)</rp></ruby>けた。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "амаар"
                }
            ]
        ]
    },
    {
        "level": 46,
        "jlpt": "N1",
        "title": "N1 · Level 6",
        "sets": [
            [
                {
                    "jp": "工学",
                    "reading": "こうがく",
                    "en": "engineering",
                    "meanings": [
                        "engineering"
                    ],
                    "example": {
                        "jp": "電子工学の専門用語がわからない。",
                        "en": "I don't understand electronics shoptalk.",
                        "furigana": "<ruby>電子<rp>(</rp><rt>でんし</rt><rp>)</rp></ruby><ruby>工学<rp>(</rp><rt>こうがく</rt><rp>)</rp></ruby>の<ruby>専門<rp>(</rp><rt>せんもん</rt><rp>)</rp></ruby><ruby>用語<rp>(</rp><rt>ようご</rt><rp>)</rp></ruby>がわからない。"
                    },
                    "phonetic": "工",
                    "phoneticReading": "コウ、ク",
                    "enMn": "инженерчлэл"
                },
                {
                    "jp": "工作",
                    "reading": "こうさく",
                    "en": "handicraft",
                    "meanings": [
                        "handicraft",
                        "maneuvering"
                    ],
                    "example": {
                        "jp": "この手の工作はすぐにバレる。",
                        "en": "It won't be long before they find out what we're trying to do here.",
                        "furigana": "この<ruby>手<rp>(</rp><rt>て</rt><rp>)</rp></ruby>の<ruby>工作<rp>(</rp><rt>こうさく</rt><rp>)</rp></ruby>はすぐにバレる。"
                    },
                    "phonetic": "工",
                    "phoneticReading": "コウ、ク",
                    "enMn": "гар урлал"
                },
                {
                    "jp": "行為",
                    "reading": "こうい",
                    "en": "act",
                    "meanings": [
                        "act",
                        "deed",
                        "conduct"
                    ],
                    "example": {
                        "jp": "盲人に手を貸すのは親切な行為だ。",
                        "en": "Helping a blind man is an act of kindness.",
                        "furigana": "<ruby>盲人<rp>(</rp><rt>もうじん</rt><rp>)</rp></ruby>に<ruby>手<rp>(</rp><rt>て</rt><rp>)</rp></ruby>を<ruby>貸<rp>(</rp><rt>か</rt><rp>)</rp></ruby>すのは<ruby>親切<rp>(</rp><rt>しんせつ</rt><rp>)</rp></ruby>な<ruby>行為<rp>(</rp><rt>こうい</rt><rp>)</rp></ruby>だ。",
                        "enMn": "Сохор хүнд туслах нь эелдэг үйлдэл юм."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "үйлдэл"
                },
                {
                    "jp": "公用",
                    "reading": "こうよう",
                    "en": "official use",
                    "meanings": [
                        "government business",
                        "public use",
                        "public expense"
                    ],
                    "example": {
                        "jp": "スイスには幾つかの公用語がある。",
                        "en": "Switzerland has several official languages.",
                        "furigana": "スイスには<ruby>幾<rp>(</rp><rt>いく</rt><rp>)</rp></ruby>つかの<ruby>公用<rp>(</rp><rt>こうよう</rt><rp>)</rp></ruby><ruby>語<rp>(</rp><rt>ご</rt><rp>)</rp></ruby>がある。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "албан хэрэгцээ"
                },
                {
                    "jp": "行進",
                    "reading": "こうしん",
                    "en": "march",
                    "meanings": [
                        "march",
                        "parade"
                    ],
                    "example": {
                        "jp": "隊長は兵士たちを従えて行進した。",
                        "en": "The commanding officer marched, with soldiers following behind.",
                        "furigana": "<ruby>隊長<rp>(</rp><rt>たいちょう</rt><rp>)</rp></ruby>は<ruby>兵士<rp>(</rp><rt>へいし</rt><rp>)</rp></ruby>たちを<ruby>従<rp>(</rp><rt>したが</rt><rp>)</rp></ruby>えて<ruby>行進<rp>(</rp><rt>こうしん</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "жагсаал"
                },
                {
                    "jp": "言論",
                    "reading": "げんろん",
                    "en": "discussion",
                    "meanings": [
                        "discussion",
                        "speech"
                    ],
                    "example": {
                        "jp": "私はあらゆる言論の自由に賛成だ。",
                        "en": "I stand for freedom of speech for everyone.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>はあらゆる<ruby>言論<rp>(</rp><rt>げんろん</rt><rp>)</rp></ruby>の<ruby>自由<rp>(</rp><rt>じゆう</rt><rp>)</rp></ruby>に<ruby>賛成<rp>(</rp><rt>さんせい</rt><rp>)</rp></ruby>だ。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хэлэлцүүлэг"
                },
                {
                    "jp": "合意",
                    "reading": "ごうい",
                    "en": "agreement",
                    "meanings": [
                        "agreement",
                        "consent",
                        "mutual understanding"
                    ],
                    "example": {
                        "jp": "彼らはそれで合意に達するだろう。",
                        "en": "They will agree on that.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らはそれで<ruby>合意<rp>(</rp><rt>ごうい</rt><rp>)</rp></ruby>に<ruby>達<rp>(</rp><rt>たっ</rt><rp>)</rp></ruby>するだろう。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "тохиролцоо"
                },
                {
                    "jp": "好評",
                    "reading": "こうひょう",
                    "en": "popularity",
                    "meanings": [
                        "popularity",
                        "favorable reputation"
                    ],
                    "example": {
                        "jp": "劇の批評はおしなべて好評だった。",
                        "en": "Almost all of the reviews of the play were favorable.",
                        "furigana": "<ruby>劇<rp>(</rp><rt>げき</rt><rp>)</rp></ruby>の<ruby>批評<rp>(</rp><rt>ひひょう</rt><rp>)</rp></ruby>はおしなべて<ruby>好評<rp>(</rp><rt>こうひょう</rt><rp>)</rp></ruby>だった。",
                        "enMn": "Тэр жүжгийн шүүмжийн бараг бүгд эерэг байв."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "алдар нэр"
                },
                {
                    "jp": "口述",
                    "reading": "こうじゅつ",
                    "en": "oral statement",
                    "meanings": [
                        "verbal statement"
                    ],
                    "example": {
                        "jp": "秘書はボスが口述するのを受けた。",
                        "en": "The secretary took dictation from her boss.",
                        "furigana": "<ruby>秘書<rp>(</rp><rt>ひしょ</rt><rp>)</rp></ruby>はボスが<ruby>口述<rp>(</rp><rt>こうじゅつ</rt><rp>)</rp></ruby>するのを<ruby>受<rp>(</rp><rt>う</rt><rp>)</rp></ruby>けた。",
                        "enMn": "Нарийн бичгийн дарга дарга нараас нь захиалгаар бичив."
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "амаар мэдэгдэл"
                },
                {
                    "jp": "限定",
                    "reading": "げんてい",
                    "en": "limit",
                    "meanings": [
                        "limit",
                        "restriction"
                    ],
                    "example": {
                        "jp": "開店と同時に限定品に客が殺到した。",
                        "en": "As soon as the store opened, customers rushed in towards the limited edition.",
                        "furigana": "<ruby>開店<rp>(</rp><rt>かいてん</rt><rp>)</rp></ruby>と<ruby>同時<rp>(</rp><rt>どうじ</rt><rp>)</rp></ruby>に<ruby>限定<rp>(</rp><rt>げんてい</rt><rp>)</rp></ruby><ruby>品<rp>(</rp><rt>ひん</rt><rp>)</rp></ruby>に<ruby>客<rp>(</rp><rt>きゃく</rt><rp>)</rp></ruby>が<ruby>殺到<rp>(</rp><rt>さっとう</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хязгаар"
                }
            ]
        ]
    },
    {
        "level": 47,
        "jlpt": "N1",
        "title": "N1 · Level 7",
        "sets": [
            [
                {
                    "jp": "構想",
                    "reading": "こうそう",
                    "en": "concept",
                    "meanings": [
                        "plan",
                        "plot",
                        "idea",
                        "conception"
                    ],
                    "example": {
                        "jp": "彼女が建設的な構想を持つ。",
                        "en": "She has constructive ideas.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>が<ruby>建設<rp>(</rp><rt>けんせつ</rt><rp>)</rp></ruby><ruby>的<rp>(</rp><rt>てき</rt><rp>)</rp></ruby>な<ruby>構想<rp>(</rp><rt>こうそう</rt><rp>)</rp></ruby>を<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>つ。"
                    },
                    "phonetic": "冓",
                    "phoneticReading": "コウ",
                    "enMn": "үзэл баримтлал"
                },
                {
                    "jp": "購読",
                    "reading": "こうどく",
                    "en": "subscription",
                    "meanings": [
                        "subscription"
                    ],
                    "example": {
                        "jp": "彼はタイム誌を予約購読している。",
                        "en": "He subscribed to Time magazine.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>はタイム<ruby>誌<rp>(</rp><rt>し</rt><rp>)</rp></ruby>を<ruby>予約<rp>(</rp><rt>よやく</rt><rp>)</rp></ruby><ruby>購読<rp>(</rp><rt>こうどく</rt><rp>)</rp></ruby>している。",
                        "enMn": "Тэр Тайм сэтгүүлд захиалга өгсөн."
                    },
                    "phonetic": "冓",
                    "phoneticReading": "コウ",
                    "enMn": "захиалга"
                },
                {
                    "jp": "高原",
                    "reading": "こうげん",
                    "en": "highland",
                    "meanings": [
                        "tableland",
                        "plateau"
                    ],
                    "example": {
                        "jp": "高原を散歩するのは楽しい。",
                        "en": "It's pleasant to take a walk on the plateau.",
                        "furigana": "<ruby>高原<rp>(</rp><rt>こうげん</rt><rp>)</rp></ruby>を<ruby>散歩<rp>(</rp><rt>さんぽ</rt><rp>)</rp></ruby>するのは<ruby>楽<rp>(</rp><rt>たの</rt><rp>)</rp></ruby>しい。"
                    },
                    "phonetic": "高",
                    "phoneticReading": "コウ",
                    "enMn": "өндөрлөг"
                },
                {
                    "jp": "高尚",
                    "reading": "こうしょう",
                    "en": "refined",
                    "meanings": [
                        "high",
                        "noble",
                        "refined"
                    ],
                    "example": {
                        "jp": "彼は趣味が高尚です。",
                        "en": "He has elegant tastes.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>趣味<rp>(</rp><rt>しゅみ</rt><rp>)</rp></ruby>が<ruby>高尚<rp>(</rp><rt>こうしょう</rt><rp>)</rp></ruby>です。"
                    },
                    "phonetic": "高",
                    "phoneticReading": "コウ",
                    "enMn": "эрхэмсэг"
                },
                {
                    "jp": "小切手",
                    "reading": "こぎって",
                    "en": "cheque",
                    "meanings": [
                        "cheque",
                        "check"
                    ],
                    "example": {
                        "jp": "旅行小切手で払ってもいいですか。",
                        "en": "May I pay with a travelers' check?",
                        "furigana": "<ruby>旅行<rp>(</rp><rt>りょこう</rt><rp>)</rp></ruby><ruby>小切手<rp>(</rp><rt>こぎって</rt><rp>)</rp></ruby>で<ruby>払<rp>(</rp><rt>はら</rt><rp>)</rp></ruby>ってもいいですか。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "чек"
                },
                {
                    "jp": "極楽",
                    "reading": "ごくらく",
                    "en": "paradise",
                    "meanings": [
                        "paradise"
                    ],
                    "example": {
                        "jp": "地獄極楽は心にあり。",
                        "en": "Heaven and hell exist in the hearts of man.",
                        "furigana": "<ruby>地獄<rp>(</rp><rt>じごく</rt><rp>)</rp></ruby><ruby>極楽<rp>(</rp><rt>ごくらく</rt><rp>)</rp></ruby>は<ruby>心<rp>(</rp><rt>こころ</rt><rp>)</rp></ruby>にあり。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "диваажин"
                },
                {
                    "jp": "心強い",
                    "reading": "こころづよい",
                    "en": "reassuring",
                    "meanings": [
                        "heartening",
                        "reassuring"
                    ],
                    "example": {
                        "jp": "ありがとう。本当に心強いです。",
                        "en": "Thank you. That's very reassuring.",
                        "furigana": "ありがとう。<ruby>本当<rp>(</rp><rt>ほんとう</rt><rp>)</rp></ruby>に<ruby>心強<rp>(</rp><rt>こころづよ</rt><rp>)</rp></ruby>いです。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "итгэл төрүүлэм"
                },
                {
                    "jp": "護衛",
                    "reading": "ごえい",
                    "en": "escort",
                    "meanings": [
                        "guard",
                        "convoy",
                        "escort"
                    ],
                    "example": {
                        "jp": "彼は多数の護衛を連れて旅行した。",
                        "en": "He traveled with a large escort.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>多数<rp>(</rp><rt>たすう</rt><rp>)</rp></ruby>の<ruby>護衛<rp>(</rp><rt>ごえい</rt><rp>)</rp></ruby>を<ruby>連<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>れて<ruby>旅行<rp>(</rp><rt>りょこう</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "эскорт"
                },
                {
                    "jp": "心掛け",
                    "reading": "こころがけ",
                    "en": "readiness",
                    "meanings": [
                        "readiness",
                        "intention",
                        "aim"
                    ],
                    "example": {
                        "jp": "身の丈に合った生活を心掛けなさい。",
                        "en": "Try to live within your means.",
                        "furigana": "<ruby>身<rp>(</rp><rt>み</rt><rp>)</rp></ruby>の<ruby>丈<rp>(</rp><rt>たけ</rt><rp>)</rp></ruby>に<ruby>合<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>った<ruby>生活<rp>(</rp><rt>せいかつ</rt><rp>)</rp></ruby>を<ruby>心掛<rp>(</rp><rt>こころが</rt><rp>)</rp></ruby>けなさい。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бэлэн байдал"
                },
                {
                    "jp": "国連",
                    "reading": "こくれん",
                    "en": "United Nations",
                    "meanings": [
                        "U.N.",
                        "United Nations"
                    ],
                    "example": {
                        "jp": "日本は国連総会で米国側に立った。",
                        "en": "Japan stood with the United States at the U. N. Assembly.",
                        "furigana": "<ruby>日本<rp>(</rp><rt>にっぽん</rt><rp>)</rp></ruby>は<ruby>国連<rp>(</rp><rt>こくれん</rt><rp>)</rp></ruby><ruby>総会<rp>(</rp><rt>そうかい</rt><rp>)</rp></ruby>で<ruby>米国<rp>(</rp><rt>べいこく</rt><rp>)</rp></ruby><ruby>側<rp>(</rp><rt>がわ</rt><rp>)</rp></ruby>に<ruby>立<rp>(</rp><rt>た</rt><rp>)</rp></ruby>った。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "НҮБ"
                }
            ]
        ]
    },
    {
        "level": 48,
        "jlpt": "N1",
        "title": "N1 · Level 8",
        "sets": [
            [
                {
                    "jp": "混血",
                    "reading": "こんけつ",
                    "en": "mixed race",
                    "meanings": [
                        "mixed race",
                        "mixed parentage"
                    ],
                    "example": {
                        "jp": "高橋君は完全なアジア人に見えても、混血なのだと聞いた。",
                        "en": "Although Takahashi looks completely Asian, I've heard he's of mixed blood.",
                        "furigana": "<ruby>高橋<rp>(</rp><rt>たかはし</rt><rp>)</rp></ruby><ruby>君<rp>(</rp><rt>くん</rt><rp>)</rp></ruby>は<ruby>完全<rp>(</rp><rt>かんぜん</rt><rp>)</rp></ruby>なアジア<ruby>人<rp>(</rp><rt>じん</rt><rp>)</rp></ruby>に<ruby>見<rp>(</rp><rt>み</rt><rp>)</rp></ruby>えても、<ruby>混血<rp>(</rp><rt>こんけつ</rt><rp>)</rp></ruby>なのだと<ruby>聞<rp>(</rp><rt>き</rt><rp>)</rp></ruby>いた。"
                    },
                    "phonetic": "昆",
                    "phoneticReading": "コン",
                    "enMn": "холимог үндэстэн"
                },
                {
                    "jp": "昆虫",
                    "reading": "こんちゅう",
                    "en": "insect",
                    "meanings": [
                        "insect",
                        "bug"
                    ],
                    "example": {
                        "jp": "彼は昆虫採集に興味を持っている。",
                        "en": "He has an interest in collecting insects.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>昆虫<rp>(</rp><rt>こんちゅう</rt><rp>)</rp></ruby><ruby>採集<rp>(</rp><rt>さいしゅう</rt><rp>)</rp></ruby>に<ruby>興味<rp>(</rp><rt>きょうみ</rt><rp>)</rp></ruby>を<ruby>持<rp>(</rp><rt>も</rt><rp>)</rp></ruby>っている。",
                        "enMn": "Тэр шавьж цуглуулахад сонирхолтой."
                    },
                    "phonetic": "昆",
                    "phoneticReading": "コン",
                    "enMn": "шавьж"
                },
                {
                    "jp": "国有",
                    "reading": "こくゆう",
                    "en": "national ownership",
                    "meanings": [
                        "national ownership"
                    ],
                    "example": {
                        "jp": "彼は我が国有数の頭脳の一人だ。",
                        "en": "He is one of the best brains in our country.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>我<rp>(</rp><rt>わ</rt><rp>)</rp></ruby>が<ruby>国有<rp>(</rp><rt>こくゆう</rt><rp>)</rp></ruby><ruby>数<rp>(</rp><rt>すう</rt><rp>)</rp></ruby>の<ruby>頭脳<rp>(</rp><rt>ずのう</rt><rp>)</rp></ruby>の<ruby>一<rp>(</rp><rt>いち</rt><rp>)</rp></ruby><ruby>人<rp>(</rp><rt>にん</rt><rp>)</rp></ruby>だ。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "төрийн өмч"
                },
                {
                    "jp": "小売",
                    "reading": "こうり",
                    "en": "retail",
                    "meanings": [
                        "retail"
                    ],
                    "example": {
                        "jp": "小売部門は厳しい四半期を迎えた。",
                        "en": "The retail sector had a rough quarter.",
                        "furigana": "<ruby>小売<rp>(</rp><rt>こうり</rt><rp>)</rp></ruby><ruby>部門<rp>(</rp><rt>ぶもん</rt><rp>)</rp></ruby>は<ruby>厳<rp>(</rp><rt>きび</rt><rp>)</rp></ruby>しい<ruby>四半期<rp>(</rp><rt>しはんき</rt><rp>)</rp></ruby>を<ruby>迎<rp>(</rp><rt>むか</rt><rp>)</rp></ruby>えた。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "жижиглэн худалдаа"
                },
                {
                    "jp": "国産",
                    "reading": "こくさん",
                    "en": "domestic product",
                    "meanings": [
                        "domestic products"
                    ],
                    "example": {
                        "jp": "政府は国産品の愛用を奨励している。",
                        "en": "The government is promoting the use of home products.",
                        "furigana": "<ruby>政府<rp>(</rp><rt>せいふ</rt><rp>)</rp></ruby>は<ruby>国産<rp>(</rp><rt>こくさん</rt><rp>)</rp></ruby><ruby>品<rp>(</rp><rt>ひん</rt><rp>)</rp></ruby>の<ruby>愛用<rp>(</rp><rt>あいよう</rt><rp>)</rp></ruby>を<ruby>奨励<rp>(</rp><rt>しょうれい</rt><rp>)</rp></ruby>している。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дотоодын бүтээгдэхүүн"
                },
                {
                    "jp": "小柄",
                    "reading": "こがら",
                    "en": "small build",
                    "meanings": [
                        "small",
                        "diminutive"
                    ],
                    "example": {
                        "jp": "彼らはその少女は小柄だと言った。",
                        "en": "They described the girl as being small.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らはその<ruby>少女<rp>(</rp><rt>しょうじょ</rt><rp>)</rp></ruby>は<ruby>小柄<rp>(</rp><rt>こがら</rt><rp>)</rp></ruby>だと<ruby>言<rp>(</rp><rt>い</rt><rp>)</rp></ruby>った。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "жижигхэн бие бүтэц"
                },
                {
                    "jp": "公立",
                    "reading": "こうりつ",
                    "en": "public institution",
                    "meanings": [
                        "public institution"
                    ],
                    "example": {
                        "jp": "この町には大きな公立図書館がある。",
                        "en": "This town boasts a large public library.",
                        "furigana": "この<ruby>町<rp>(</rp><rt>まち</rt><rp>)</rp></ruby>には<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きな<ruby>公立<rp>(</rp><rt>こうりつ</rt><rp>)</rp></ruby><ruby>図書館<rp>(</rp><rt>としょかん</rt><rp>)</rp></ruby>がある。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "төрийн байгууллага"
                },
                {
                    "jp": "心細い",
                    "reading": "こころぼそい",
                    "en": "helpless",
                    "meanings": [
                        "helpless",
                        "hopeless",
                        "discouraging"
                    ],
                    "example": {
                        "jp": "あなたがいなくて、心細い。",
                        "en": "Without you, I'm very lonely.",
                        "furigana": "あなたがいなくて、<ruby>心細<rp>(</rp><rt>こころぼそ</rt><rp>)</rp></ruby>い。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "эрх мэдэлгүй"
                },
                {
                    "jp": "心地",
                    "reading": "ここち",
                    "en": "feeling",
                    "meanings": [
                        "feeling",
                        "sensation",
                        "mood"
                    ],
                    "example": {
                        "jp": "その家は全然住み心地がよくない。",
                        "en": "The house is anything but comfortable to live in.",
                        "furigana": "その<ruby>家<rp>(</rp><rt>いえ</rt><rp>)</rp></ruby>は<ruby>全然<rp>(</rp><rt>ぜんぜん</rt><rp>)</rp></ruby><ruby>住<rp>(</rp><rt>す</rt><rp>)</rp></ruby>み<ruby>心地<rp>(</rp><rt>ごこち</rt><rp>)</rp></ruby>がよくない。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "мэдрэмж"
                },
                {
                    "jp": "国定",
                    "reading": "こくてい",
                    "en": "state-sponsored",
                    "meanings": [
                        "state-sponsored",
                        "national"
                    ],
                    "example": null,
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "төрөөс дэмжсэн"
                }
            ]
        ]
    },
    {
        "level": 49,
        "jlpt": "N1",
        "title": "N1 · Level 9",
        "sets": [
            [
                {
                    "jp": "根気",
                    "reading": "こんき",
                    "en": "patience",
                    "meanings": [
                        "patience",
                        "perseverance",
                        "energy"
                    ],
                    "example": {
                        "jp": "アンは根気よく編み物をしている。",
                        "en": "Anne is patiently knitting.",
                        "furigana": "アンは<ruby>根気<rp>(</rp><rt>こんき</rt><rp>)</rp></ruby>よく<ruby>編<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>み<ruby>物<rp>(</rp><rt>もの</rt><rp>)</rp></ruby>をしている。"
                    },
                    "phonetic": "艮",
                    "phoneticReading": "コン",
                    "enMn": "тэвчээр"
                },
                {
                    "jp": "根拠",
                    "reading": "こんきょ",
                    "en": "basis",
                    "meanings": [
                        "basis",
                        "foundation"
                    ],
                    "example": {
                        "jp": "それは全く根拠のないうわさです。",
                        "en": "That's a completely unfounded rumor.",
                        "furigana": "それは<ruby>全<rp>(</rp><rt>まった</rt><rp>)</rp></ruby>く<ruby>根拠<rp>(</rp><rt>こんきょ</rt><rp>)</rp></ruby>のないうわさです。"
                    },
                    "phonetic": "艮",
                    "phoneticReading": "コン",
                    "enMn": "үндэслэл"
                },
                {
                    "jp": "光沢",
                    "reading": "こうたく",
                    "en": "luster",
                    "meanings": [
                        "luster",
                        "glossy finish (of photographs)"
                    ],
                    "example": {
                        "jp": "この指輪は光沢をうしなった。",
                        "en": "This ring lost its luster.",
                        "furigana": "この<ruby>指輪<rp>(</rp><rt>ゆびわ</rt><rp>)</rp></ruby>は<ruby>光沢<rp>(</rp><rt>こうたく</rt><rp>)</rp></ruby>をうしなった。"
                    },
                    "phonetic": "光",
                    "phoneticReading": "コウ",
                    "enMn": "гялбаа"
                },
                {
                    "jp": "光熱費",
                    "reading": "こうねつひ",
                    "en": "utility costs",
                    "meanings": [
                        "cost of fuel and light"
                    ],
                    "example": null,
                    "phonetic": "光",
                    "phoneticReading": "コウ",
                    "enMn": "коммунал төлбөр"
                },
                {
                    "jp": "国交",
                    "reading": "こっこう",
                    "en": "diplomatic relations",
                    "meanings": [
                        "diplomatic relations"
                    ],
                    "example": {
                        "jp": "それ以来カナダとイランの国交は断絶している。",
                        "en": "Since then, diplomatic relations between Canada and Iran have been suspended.",
                        "furigana": "それ<ruby>以来<rp>(</rp><rt>いらい</rt><rp>)</rp></ruby>カナダとイランの<ruby>国交<rp>(</rp><rt>こっこう</rt><rp>)</rp></ruby>は<ruby>断絶<rp>(</rp><rt>だんぜつ</rt><rp>)</rp></ruby>している。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дипломат харилцаа"
                },
                {
                    "jp": "再会",
                    "reading": "さいかい",
                    "en": "reunion",
                    "meanings": [
                        "meeting again",
                        "reunion"
                    ],
                    "example": {
                        "jp": "私は君との再会を待ち望んでいる。",
                        "en": "I am looking forward to seeing you again.",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>は<ruby>君<rp>(</rp><rt>きみ</rt><rp>)</rp></ruby>との<ruby>再会<rp>(</rp><rt>さいかい</rt><rp>)</rp></ruby>を<ruby>待<rp>(</rp><rt>ま</rt><rp>)</rp></ruby>ち<ruby>望<rp>(</rp><rt>のぞ</rt><rp>)</rp></ruby>んでいる。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "дахин уулзалт"
                },
                {
                    "jp": "戸籍",
                    "reading": "こせき",
                    "en": "family register",
                    "meanings": [
                        "census",
                        "family register"
                    ],
                    "example": {
                        "jp": "彼女はまだ夫の戸籍に入っていない。",
                        "en": "She has not yet had her name entered in her husband's family.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>はまだ<ruby>夫<rp>(</rp><rt>おっと</rt><rp>)</rp></ruby>の<ruby>戸籍<rp>(</rp><rt>こせき</rt><rp>)</rp></ruby>に<ruby>入<rp>(</rp><rt>はい</rt><rp>)</rp></ruby>っていない。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "гэр бүлийн бүртгэл"
                },
                {
                    "jp": "ごまかす",
                    "reading": "ごまかす",
                    "en": "to deceive",
                    "meanings": [
                        "to deceive",
                        "to falsify",
                        "to misrepresent"
                    ],
                    "example": {
                        "jp": "彼はそのことを笑ってごまかした。",
                        "en": "He laughed the matter away.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>はそのことを<ruby>笑<rp>(</rp><rt>わら</rt><rp>)</rp></ruby>ってごまかした。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хуурах"
                },
                {
                    "jp": "好ましい",
                    "reading": "このましい",
                    "en": "desirable",
                    "meanings": [
                        "nice",
                        "likable",
                        "desirable"
                    ],
                    "example": {
                        "jp": "その志望者は試験官に好ましい印象を与えた。",
                        "en": "The applicant impressed the examiner favorably.",
                        "furigana": "その<ruby>志望<rp>(</rp><rt>しぼう</rt><rp>)</rp></ruby><ruby>者<rp>(</rp><rt>しゃ</rt><rp>)</rp></ruby>は<ruby>試験<rp>(</rp><rt>しけん</rt><rp>)</rp></ruby><ruby>官<rp>(</rp><rt>かん</rt><rp>)</rp></ruby>に<ruby>好<rp>(</rp><rt>この</rt><rp>)</rp></ruby>ましい<ruby>印象<rp>(</rp><rt>いんしょう</rt><rp>)</rp></ruby>を<ruby>与<rp>(</rp><rt>あた</rt><rp>)</rp></ruby>えた。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "хүсүүштэй"
                },
                {
                    "jp": "細やか",
                    "reading": "こまやか",
                    "en": "delicate",
                    "meanings": [
                        "meager",
                        "modest"
                    ],
                    "example": {
                        "jp": "細やかなお心遣いに感謝いたします。",
                        "en": "I appreciate your attention to detail.",
                        "furigana": "<ruby>細<rp>(</rp><rt>こま</rt><rp>)</rp></ruby>やかなお<ruby>心遣<rp>(</rp><rt>こころづか</rt><rp>)</rp></ruby>いに<ruby>感謝<rp>(</rp><rt>かんしゃ</rt><rp>)</rp></ruby>いたします。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "нарийн мэдрэмжтэй"
                }
            ]
        ]
    },
    {
        "level": 50,
        "jlpt": "N1",
        "title": "N1 · Level 10",
        "sets": [
            [
                {
                    "jp": "原則",
                    "reading": "げんそく",
                    "en": "principle",
                    "meanings": [
                        "principle",
                        "general rule"
                    ],
                    "example": {
                        "jp": "この店は現金取り引きが原則です。",
                        "en": "This store is operated on a cash basis.",
                        "furigana": "この<ruby>店<rp>(</rp><rt>みせ</rt><rp>)</rp></ruby>は<ruby>現金<rp>(</rp><rt>げんきん</rt><rp>)</rp></ruby><ruby>取<rp>(</rp><rt>と</rt><rp>)</rp></ruby>り<ruby>引<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>きが<ruby>原則<rp>(</rp><rt>げんそく</rt><rp>)</rp></ruby>です。"
                    },
                    "phonetic": "原",
                    "phoneticReading": "ゲン",
                    "enMn": "зарчим"
                },
                {
                    "jp": "原油",
                    "reading": "げんゆ",
                    "en": "crude oil",
                    "meanings": [
                        "crude oil"
                    ],
                    "example": {
                        "jp": "原油価格の値下がりが続いている。",
                        "en": "The crude oil price is falling further.",
                        "furigana": "<ruby>原油<rp>(</rp><rt>げんゆ</rt><rp>)</rp></ruby><ruby>価格<rp>(</rp><rt>かかく</rt><rp>)</rp></ruby>の<ruby>値下<rp>(</rp><rt>ねさ</rt><rp>)</rp></ruby>がりが<ruby>続<rp>(</rp><rt>つづ</rt><rp>)</rp></ruby>いている。"
                    },
                    "phonetic": "原",
                    "phoneticReading": "ゲン",
                    "enMn": "түүхий нефть"
                },
                {
                    "jp": "快い",
                    "reading": "こころよい",
                    "en": "pleasant",
                    "meanings": [
                        "pleasant",
                        "agreeable"
                    ],
                    "example": {
                        "jp": "彼は私の申し込みを快く承諾した。",
                        "en": "He readily agreed to my proposal.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>は<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>の<ruby>申<rp>(</rp><rt>もう</rt><rp>)</rp></ruby>し<ruby>込<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>みを<ruby>快<rp>(</rp><rt>こころよ</rt><rp>)</rp></ruby>く<ruby>承諾<rp>(</rp><rt>しょうだく</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "тааламжтай"
                },
                {
                    "jp": "細菌",
                    "reading": "さいきん",
                    "en": "bacteria",
                    "meanings": [
                        "bacillus",
                        "bacterium",
                        "germ"
                    ],
                    "example": {
                        "jp": "細菌が病気を引き起こすことがある。",
                        "en": "Germs can cause sickness.",
                        "furigana": "<ruby>細菌<rp>(</rp><rt>さいきん</rt><rp>)</rp></ruby>が<ruby>病気<rp>(</rp><rt>びょうき</rt><rp>)</rp></ruby>を<ruby>引<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>き<ruby>起<rp>(</rp><rt>お</rt><rp>)</rp></ruby>こすことがある。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "бактери"
                },
                {
                    "jp": "災害",
                    "reading": "さいがい",
                    "en": "disaster",
                    "meanings": [
                        "calamity",
                        "disaster",
                        "misfortune"
                    ],
                    "example": {
                        "jp": "嵐は、多くの災害を引き起こした。",
                        "en": "The storm caused a lot of damage.",
                        "furigana": "<ruby>嵐<rp>(</rp><rt>あらし</rt><rp>)</rp></ruby>は、<ruby>多<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>くの<ruby>災害<rp>(</rp><rt>さいがい</rt><rp>)</rp></ruby>を<ruby>引<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>き<ruby>起<rp>(</rp><rt>お</rt><rp>)</rp></ruby>こした。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "гамшиг"
                },
                {
                    "jp": "事柄",
                    "reading": "ことがら",
                    "en": "matter",
                    "meanings": [
                        "matter",
                        "thing",
                        "affair",
                        "circumstance"
                    ],
                    "example": {
                        "jp": "彼らはその事柄を調査している。",
                        "en": "They are inquiring into the matter.",
                        "furigana": "<ruby>彼<rp>(</rp><rt>かれ</rt><rp>)</rp></ruby>らはその<ruby>事柄<rp>(</rp><rt>ことがら</rt><rp>)</rp></ruby>を<ruby>調査<rp>(</rp><rt>ちょうさ</rt><rp>)</rp></ruby>している。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "асуудал"
                },
                {
                    "jp": "凝らす",
                    "reading": "こらす",
                    "en": "to concentrate",
                    "meanings": [
                        "to concentrate",
                        "to devote",
                        "to peer into"
                    ],
                    "example": {
                        "jp": "その部屋は装飾を凝らしている。",
                        "en": "The room is richly ornamented.",
                        "furigana": "その<ruby>部屋<rp>(</rp><rt>へや</rt><rp>)</rp></ruby>は<ruby>装飾<rp>(</rp><rt>そうしょく</rt><rp>)</rp></ruby>を<ruby>凝<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>らしている。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "төвлөрөх"
                },
                {
                    "jp": "試み",
                    "reading": "こころみ",
                    "en": "attempt",
                    "meanings": [
                        "trial",
                        "experiment"
                    ],
                    "example": {
                        "jp": "彼女は何度か試みたが、失敗した。",
                        "en": "She tried several times but failed.",
                        "furigana": "<ruby>彼女<rp>(</rp><rt>かのじょ</rt><rp>)</rp></ruby>は<ruby>何<rp>(</rp><rt>なん</rt><rp>)</rp></ruby><ruby>度<rp>(</rp><rt>ど</rt><rp>)</rp></ruby>か<ruby>試<rp>(</rp><rt>こころ</rt><rp>)</rp></ruby>みたが、<ruby>失敗<rp>(</rp><rt>しっぱい</rt><rp>)</rp></ruby>した。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "оролдлого"
                },
                {
                    "jp": "言付け",
                    "reading": "ことづけ",
                    "en": "message",
                    "meanings": [
                        "to leave a message"
                    ],
                    "example": {
                        "jp": "私の言付けがあったでしょうね。",
                        "en": "There was a message for me, wasn't there?",
                        "furigana": "<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>の<ruby>言付<rp>(</rp><rt>ことづ</rt><rp>)</rp></ruby>けがあったでしょうね。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "зурвас"
                },
                {
                    "jp": "込める",
                    "reading": "こめる",
                    "en": "to include",
                    "meanings": [
                        "to include",
                        "to put into"
                    ],
                    "example": {
                        "jp": "怒りを込めて告発人の方に向き直った。",
                        "en": "He turned angrily on his accusers.",
                        "furigana": "<ruby>怒<rp>(</rp><rt>いか</rt><rp>)</rp></ruby>りを<ruby>込<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>めて<ruby>告発<rp>(</rp><rt>こくはつ</rt><rp>)</rp></ruby><ruby>人<rp>(</rp><rt>じん</rt><rp>)</rp></ruby>の<ruby>方<rp>(</rp><rt>ほう</rt><rp>)</rp></ruby>に<ruby>向<rp>(</rp><rt>む</rt><rp>)</rp></ruby>き<ruby>直<rp>(</rp><rt>なお</rt><rp>)</rp></ruby>った。"
                    },
                    "phonetic": null,
                    "phoneticReading": null,
                    "enMn": "оруулах"
                }
            ]
        ]
    }
];
