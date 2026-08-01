// Word pairs for the Japanese Word Match game, grouped by JLPT level (N5 = easiest, N1 = hardest).
// Each level has 5 word sets of 20 pairs (40 tiles); a random set is chosen each time a level
// is played, so replaying gives fresh vocabulary.
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
// with hiragana/katakana). Every one of the 25 sets below is curated so at least 3 distinct
// phonetic families each have >=2 member words present in that same set, guaranteeing the
// "lightning connect" phonetic-chain move is always playable.
const WORD_LEVELS = [
    {
        "level": 1,
        "jlpt": "N5",
        "title": "N5 · Beginner",
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
                        "en": "What have you been getting up to till now?!"
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン"
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
                        "en": "Today is a non-burnable rubbish day."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン"
                },
                {
                    "jp": "朝",
                    "reading": "あさ",
                    "en": "morning",
                    "meanings": [
                        "morning"
                    ],
                    "example": {
                        "jp": "例えば、ロンドンは今は朝７時です。",
                        "en": "For example, it is 7:00 a.m. in London now."
                    },
                    "phonetic": "朝",
                    "phoneticReading": "チョウ"
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
                        "en": "Water the flowers before you eat breakfast."
                    },
                    "phonetic": "朝",
                    "phoneticReading": "チョウ"
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
                        "en": "You should have listened to me."
                    },
                    "phonetic": "門",
                    "phoneticReading": "モン、カン"
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
                        "en": "I took my leave of them at the gate."
                    },
                    "phonetic": "門",
                    "phoneticReading": "モン、カン"
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
                        "en": "He will be here all evening."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン"
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
                        "en": "The company is operating under joint Sino-Japanese management."
                    },
                    "phonetic": "会",
                    "phoneticReading": "カイ、エ"
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
                        "en": "My family comes before my career."
                    },
                    "phonetic": "家",
                    "phoneticReading": "カ"
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
                        "en": "My eyes are an ocean in which my dreams are reflected."
                    },
                    "phonetic": "毎",
                    "phoneticReading": "カイ"
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
                        "en": "My sister and I go to the movies from time to time."
                    },
                    "phonetic": "央",
                    "phoneticReading": "エイ"
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
                        "en": "He saw a horrible face at the top of the stairs."
                    },
                    "phonetic": "皆",
                    "phoneticReading": "カイ"
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
                        "en": "Don't fail to lock the door."
                    },
                    "phonetic": "建",
                    "phoneticReading": "ケン"
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
                        "en": "Can I have a few words with you?"
                    },
                    "phonetic": "代",
                    "phoneticReading": "タイ"
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
                        "en": "I can't live that kind of life."
                    },
                    "phonetic": "風",
                    "phoneticReading": "フウ"
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
                        "en": "You know this textbook is made of recycled paper."
                    },
                    "phonetic": "氏",
                    "phoneticReading": "シ"
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
                        "en": "Can I borrow your Ford for tomorrow?"
                    },
                    "phonetic": "昔",
                    "phoneticReading": "セキ、シャク"
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
                        "en": "I'm short-tempered, and a loose-tongued man."
                    },
                    "phonetic": "圣",
                    "phoneticReading": "ケイ"
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
                        "en": "They painted their house bright yellow."
                    },
                    "phonetic": "黄",
                    "phoneticReading": "オウ、コウ"
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
                        "en": "I met him by accident at the airport yesterday."
                    },
                    "phonetic": "乍",
                    "phoneticReading": "サク"
                }
            ],
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
                        "en": "He breathed his last peacefully this morning."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン"
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
                        "en": "My parents were satisfied with my grades this year."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン"
                },
                {
                    "jp": "明日",
                    "reading": "あした",
                    "en": "tomorrow",
                    "meanings": [
                        "tomorrow"
                    ],
                    "example": {
                        "jp": "明日図書館で勉強するつもりです。",
                        "en": "Tomorrow, I'm going to study at the library."
                    },
                    "phonetic": "明",
                    "phoneticReading": "メイ"
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
                        "en": "It's getting light. Morning is coming."
                    },
                    "phonetic": "明",
                    "phoneticReading": "メイ"
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
                        "en": "Two roundtrip tickets to Osaka, please."
                    },
                    "phonetic": "切",
                    "phoneticReading": "セツ"
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
                        "en": "I snapped the thread on my canine."
                    },
                    "phonetic": "切",
                    "phoneticReading": "セツ"
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
                        "en": "A stitch in time saves nine."
                    },
                    "phonetic": "九",
                    "phoneticReading": "キュウ"
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
                        "en": "Jim tends to go too far."
                    },
                    "phonetic": "兼",
                    "phoneticReading": "ケン、レン"
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
                        "en": "What lovely flowers these are!"
                    },
                    "phonetic": "奇",
                    "phoneticReading": "キ"
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
                        "en": "What's the most delicious fruit in Japan?"
                    },
                    "phonetic": "果",
                    "phoneticReading": "カ"
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
                        "en": "They defied the policeman's order."
                    },
                    "phonetic": "敬",
                    "phoneticReading": "ケイ"
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
                        "en": "The train left at five o'clock to the minute."
                    },
                    "phonetic": "五",
                    "phoneticReading": "ゴ"
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
                        "en": "Although old, he is still very much alive."
                    },
                    "phonetic": "元",
                    "phoneticReading": "ガン"
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
                        "en": "I prefer tea to coffee."
                    },
                    "phonetic": "工",
                    "phoneticReading": "コウ、ク"
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
                        "en": "Let's pool our money and travel as a group."
                    },
                    "phonetic": "才",
                    "phoneticReading": "サイ、ザイ"
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
                        "en": "Japan follows the principle of first-to-file."
                    },
                    "phonetic": "先",
                    "phoneticReading": "セン"
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
                        "en": "The bright colors arrested our eyes."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "When I left the train station, I saw a man."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "When I grow up, I want to be a king."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Yuko has never spoken with a foreigner."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "I've decided to quit my job at the end of this month."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン"
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
                        "en": "He has been busy this week."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン"
                },
                {
                    "jp": "新しい",
                    "reading": "あたらしい",
                    "en": "new",
                    "meanings": [
                        "new"
                    ],
                    "example": {
                        "jp": "あぁ私の白いズボンが！新しいのに。",
                        "en": "Oh, my white pants! And they were new."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン"
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
                        "en": "I just want to glance at the paper."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン"
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
                        "en": "He is junior to my brother by three years."
                    },
                    "phonetic": "兄",
                    "phoneticReading": "キョウ"
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
                        "en": "This is my brother. Handsome, isn't he?"
                    },
                    "phonetic": "兄",
                    "phoneticReading": "キョウ"
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
                        "en": "My mother does her usual shopping on her way home from work."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I have to get a new computer."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "\"Let's head back.\" \"Shall we drop by McDonald's?\""
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Keiko buried her head in the pillow and cried."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Most people write about their daily life."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The clever student finished the test quickly."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "You had better take your umbrella in case."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Rie and I went to the same school."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I gave the bag back to Ken."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He bought his son a camera."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "In that slender body, where does it all go?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I can swim across the river."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "What does this kanji mean?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The wooden pieces are fastened with a peg."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "Please remember to see my father next week."
                    },
                    "phonetic": "会",
                    "phoneticReading": "カイ、エ"
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
                        "en": "That's a picture of a monkey associated with the Year of the Monkey."
                    },
                    "phonetic": "会",
                    "phoneticReading": "カイ、エ"
                },
                {
                    "jp": "忙しい",
                    "reading": "いそがしい",
                    "en": "busy",
                    "meanings": [
                        "busy (people, days)"
                    ],
                    "example": {
                        "jp": "万一彼が忙しいのなら、手伝いなさい。",
                        "en": "If he should be busy, help him."
                    },
                    "phonetic": "亡",
                    "phoneticReading": "ボウ、モウ"
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
                        "en": "Please remember to see my father next week."
                    },
                    "phonetic": "亡",
                    "phoneticReading": "ボウ、モウ"
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
                        "en": "Mother removed mud from his shoes."
                    },
                    "phonetic": "化",
                    "phoneticReading": "カ"
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
                        "en": "Stockings should be of the proper size."
                    },
                    "phonetic": "化",
                    "phoneticReading": "カ"
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
                        "en": "Hokkaido lies in the north of Japan."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "They can play the guitar."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The cellar is ugly, dark, and stinky."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "There used to be a coffee shop near the school."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I prefer mutton to beef."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She has a bottle of milk every morning."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She was standing in the front of the classroom."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Their marriage broke up last year."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She drew out the money from the bank."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Princess, don't drink the potion."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Italy is a very beautiful country."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The weather will be clear, followed by clouds later on."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She came home after dark."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "There was a class reunion after 30 years."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "This house and this land are mine."
                    },
                    "phonetic": "家",
                    "phoneticReading": "カ"
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
                        "en": "Next week a family will move in."
                    },
                    "phonetic": "家",
                    "phoneticReading": "カ"
                },
                {
                    "jp": "歌う",
                    "reading": "うたう",
                    "en": "to sing",
                    "meanings": [
                        "to sing"
                    ],
                    "example": {
                        "jp": "彼は小節を利かして歌っています。",
                        "en": "He is singing with a lot of ornamentation."
                    },
                    "phonetic": "可",
                    "phoneticReading": "カ"
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
                        "en": "That girl has a lovely doll."
                    },
                    "phonetic": "可",
                    "phoneticReading": "カ"
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
                        "en": "The accident happened at that crossing."
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ"
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
                        "en": "Do you know where the police station is?"
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ"
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
                        "en": "I'm glad to see you back."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "\"Car\" is a synonym of \"automobile\"."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She was dressed all in black."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Yumi goes to the park to play tennis."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I was surprised to hear her voice in the next room."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She's die-hard coffee drinker."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Won't you play tennis tomorrow afternoon?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She answered with tears."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Helen's words suddenly filled me with new energy."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I'm expecting a baby in the new year!"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "There's still hours till dinner."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Industrial disputes are still a problem."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She asked how to cook the fish."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Many beautiful flowers bloom in spring."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ]
        ]
    },
    {
        "level": 2,
        "jlpt": "N4",
        "title": "N4 · Elementary",
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
                        "en": "I learned to live without her."
                    },
                    "phonetic": "生",
                    "phoneticReading": "セイ、ショウ"
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
                        "en": "Stars were twinkling in the sky."
                    },
                    "phonetic": "生",
                    "phoneticReading": "セイ、ショウ"
                },
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
                        "en": "I'm short-tempered, and a loose-tongued man."
                    },
                    "phonetic": "气",
                    "phoneticReading": "キ"
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
                        "en": "\"How do you feel?\" he inquired."
                    },
                    "phonetic": "气",
                    "phoneticReading": "キ"
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
                        "en": "I passed by your house about 10 last night."
                    },
                    "phonetic": "甬",
                    "phoneticReading": "ツウ"
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
                        "en": "Rie and I went to the same school."
                    },
                    "phonetic": "甬",
                    "phoneticReading": "ツウ"
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
                        "en": "Typhoons strike Japan every year."
                    },
                    "phonetic": "台",
                    "phoneticReading": "タイ"
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
                        "en": "The food was so good that I ate too much."
                    },
                    "phonetic": "咼",
                    "phoneticReading": "カ"
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
                        "en": "With most things there's both what you see and what's behind it."
                    },
                    "phonetic": "表",
                    "phoneticReading": "ヒョウ"
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
                        "en": "She is a good teacher, as teachers go."
                    },
                    "phonetic": "比",
                    "phoneticReading": "ヒ"
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
                        "en": "You must observe the rules of the dormitory."
                    },
                    "phonetic": "規",
                    "phoneticReading": "キ"
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
                        "en": "She fell into a trap in her turn."
                    },
                    "phonetic": "今",
                    "phoneticReading": "キン"
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
                        "en": "He accepted her gift."
                    },
                    "phonetic": "曽",
                    "phoneticReading": "ソウ、ゾウ"
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
                        "en": "Take care not to break the eggs."
                    },
                    "phonetic": "主",
                    "phoneticReading": "チュウ"
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
                        "en": "He was made to check his papers by the chief."
                    },
                    "phonetic": "果",
                    "phoneticReading": "カ"
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
                        "en": "The bus jolted over the rough road."
                    },
                    "phonetic": "䍃",
                    "phoneticReading": "ヨウ"
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
                        "en": "Japan does a lot of trade with Canada."
                    },
                    "phonetic": "成",
                    "phoneticReading": "ジョウ、セイ"
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
                        "en": "Please wake me up at six tomorrow morning."
                    },
                    "phonetic": "己",
                    "phoneticReading": "キ"
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
                        "en": "He is still green at the job."
                    },
                    "phonetic": "㦮",
                    "phoneticReading": "セン"
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
                        "en": "Soseki was a contemporary of Ohgai."
                    },
                    "phonetic": "寺",
                    "phoneticReading": "ジ"
                }
            ],
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
                        "en": "I'll give it back next Monday without fail."
                    },
                    "phonetic": "必",
                    "phoneticReading": "ヒ、ヒツ"
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
                        "en": "It's too bad that I don't need to lose weight."
                    },
                    "phonetic": "必",
                    "phoneticReading": "ヒ、ヒツ"
                },
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
                        "en": "He lives in the suburbs of London."
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ"
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
                        "en": "They rushed to the scene of the traffic accident."
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ"
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
                        "en": "I can't look after my parents and such either."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン"
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
                        "en": "Helping a blind man is an act of kindness."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン"
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
                        "en": "We really thank you for your patronage."
                    },
                    "phonetic": "申",
                    "phoneticReading": "シン"
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
                        "en": "They captured foxes with snares."
                    },
                    "phonetic": "甫",
                    "phoneticReading": "ホ"
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
                        "en": "He called at the baker's on the way home."
                    },
                    "phonetic": "奇",
                    "phoneticReading": "キ"
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
                        "en": "Are you booked for tomorrow?"
                    },
                    "phonetic": "夬",
                    "phoneticReading": "ケツ"
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
                        "en": "Get out the way ... they'll escape!"
                    },
                    "phonetic": "兆",
                    "phoneticReading": "チョウ、トウ"
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
                        "en": "I will write him a civil answer."
                    },
                    "phonetic": "丁",
                    "phoneticReading": "チョウ、テイ"
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
                        "en": "Could you gift wrap it?"
                    },
                    "phonetic": "包",
                    "phoneticReading": "ホウ"
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
                        "en": "My parents made me go there."
                    },
                    "phonetic": "無",
                    "phoneticReading": "ブ"
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
                        "en": "The club members assembled in the meeting room."
                    },
                    "phonetic": "会",
                    "phoneticReading": "カイ、エ"
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
                        "en": "Make the best of your time."
                    },
                    "phonetic": "利",
                    "phoneticReading": "リ"
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
                        "en": "She is persistent though she doesn't look so."
                    },
                    "phonetic": "元",
                    "phoneticReading": "ガン"
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
                        "en": "I'm sure he mistook me for my sister."
                    },
                    "phonetic": "門",
                    "phoneticReading": "モン、カン"
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
                        "en": "Of these it is the latter one that is important."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "We were shocked by the intensity of our mother's anger."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "She has broken the toaster again."
                    },
                    "phonetic": "褱",
                    "phoneticReading": "カイ"
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
                        "en": "I heard something crashing in the kitchen in the middle of the night."
                    },
                    "phonetic": "褱",
                    "phoneticReading": "カイ"
                },
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
                        "en": "Young and old in Japan celebrate New Year's Day."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ"
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
                        "en": "Courtesy marked his manner."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ"
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
                        "en": "Did you miss me?"
                    },
                    "phonetic": "思",
                    "phoneticReading": "シ"
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
                        "en": "I must remind you of your promise."
                    },
                    "phonetic": "思",
                    "phoneticReading": "シ"
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
                        "en": "The fields lay covered with deep snow."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "A new serial will begin in next month's issue."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "It is necessary to do some exercise every day."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I don't know whether he's a college student or not."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Their father is a taxi driver."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Could you suggest an alternative date?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She practiced her English pronunciation yesterday."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "My mother bakes bread and cookies on weekends."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I resent their rude attitude."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I awoke to find a burglar in my room."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Happy birthday, Miss Aiba!"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Then you will be happy."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "It's hard for my father to give up drinking."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She cut her finger on the broken glass."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "She stays calm through earthquakes."
                    },
                    "phonetic": "也",
                    "phoneticReading": "チ"
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
                        "en": "He is at home with the geography of Tokyo."
                    },
                    "phonetic": "也",
                    "phoneticReading": "チ"
                },
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
                        "en": "Maybe it will be exactly the same for him."
                    },
                    "phonetic": "皮",
                    "phoneticReading": "ハ、ヒ"
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
                        "en": "They live together in unity."
                    },
                    "phonetic": "皮",
                    "phoneticReading": "ハ、ヒ"
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
                        "en": "They went to the zoo by bus yesterday."
                    },
                    "phonetic": "動",
                    "phoneticReading": "ドウ"
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
                        "en": "Trains are running on schedule."
                    },
                    "phonetic": "動",
                    "phoneticReading": "ドウ"
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
                        "en": "Where's the up-escalator?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "What is the population of Hyogo prefecture?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "My sister never fails to write home once a month."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "You cannot make a silk purse out of a sow's ear."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "They congratulated us on our victory."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Do you have a part-time job?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I snapped the thread on my canine."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She caressed her baby lovingly."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He gave me some bread, also some milk."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Individuality is stressed in the Western world."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She missed the morning service."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I will have my sister pick you up at the station."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Don't touch it. Leave it as it is."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "They demanded that the president resign."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "When I'm sad, my friends encourage me."
                    },
                    "phonetic": "非",
                    "phoneticReading": "ハイ、ヒ"
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
                        "en": "Hospitals are very expensive."
                    },
                    "phonetic": "非",
                    "phoneticReading": "ハイ、ヒ"
                },
                {
                    "jp": "布団",
                    "reading": "ふとん",
                    "en": "futon",
                    "meanings": [
                        "futon"
                    ],
                    "example": {
                        "jp": "あっ。布団取り込むの忘れてた。",
                        "en": "Oh, I forgot to bring in the futons."
                    },
                    "phonetic": "布",
                    "phoneticReading": "フ"
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
                        "en": "She frowned him into silence."
                    },
                    "phonetic": "布",
                    "phoneticReading": "フ"
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
                        "en": "He failed due to lack of effort."
                    },
                    "phonetic": "足",
                    "phoneticReading": "ソク"
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
                        "en": "This was an additional fund for buying books."
                    },
                    "phonetic": "足",
                    "phoneticReading": "ソク"
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
                        "en": "Until what time does your pharmacy stay open?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He's an odd man; so we'll have him referee."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I'm sorry to hear that you got a divorce."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "It's hard to believe it was so clear and sunny up to just now."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He was born to be a technician."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "How many sandwiches are there left?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The article will be sent cash on delivery."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She spends her leisure time making dolls."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She decorated her room with roses."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She blushed with shame."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She committed suicide by jumping off the bridge."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I immediately lost my concentration."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "It is sometimes acceptable to resort to violence."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She finally reached the hotel."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ]
        ]
    },
    {
        "level": 3,
        "jlpt": "N3",
        "title": "N3 · Intermediate",
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
                        "en": "He'll be here until noon."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ"
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
                        "en": "She was satisfied that he was honest."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ"
                },
                {
                    "jp": "参加",
                    "reading": "さんか",
                    "en": "participation",
                    "meanings": [
                        "participation"
                    ],
                    "example": {
                        "jp": "彼女は美人コンテストに参加した。",
                        "en": "She participated in the beauty contest."
                    },
                    "phonetic": "参",
                    "phoneticReading": "サン"
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
                        "en": "I read the book in the light of criticism."
                    },
                    "phonetic": "参",
                    "phoneticReading": "サン"
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
                        "en": "He called a hotel for accommodations."
                    },
                    "phonetic": "宿",
                    "phoneticReading": "シュク"
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
                        "en": "We put up at an inn at the foot of the mountain."
                    },
                    "phonetic": "宿",
                    "phoneticReading": "シュク"
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
                        "en": "She was jolly well made to pay."
                    },
                    "phonetic": "支",
                    "phoneticReading": "シ、キ"
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
                        "en": "She found employment as a typist."
                    },
                    "phonetic": "就",
                    "phoneticReading": "シュウ"
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
                        "en": "I admire his aristocratic manners."
                    },
                    "phonetic": "乍",
                    "phoneticReading": "サク"
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
                        "en": "My mother finally approved of our plan."
                    },
                    "phonetic": "賛",
                    "phoneticReading": "サン"
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
                        "en": "We three sisters opened a coffee shop."
                    },
                    "phonetic": "市",
                    "phoneticReading": "シ"
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
                        "en": "Around the time you go to college, you start having to pay contributions to the National Pension."
                    },
                    "phonetic": "也",
                    "phoneticReading": "チ"
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
                        "en": "She guaranteed his debts."
                    },
                    "phonetic": "昔",
                    "phoneticReading": "セキ、シャク"
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
                        "en": "The governor set the prisoners free."
                    },
                    "phonetic": "州",
                    "phoneticReading": "シュウ"
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
                        "en": "The hunters aimed at the elephant."
                    },
                    "phonetic": "充",
                    "phoneticReading": "ジュウ"
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
                        "en": "The demand was brought down by increases in imports."
                    },
                    "phonetic": "需",
                    "phoneticReading": "ジュ"
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
                        "en": "Poverty is not a bar to happiness."
                    },
                    "phonetic": "章",
                    "phoneticReading": "ショウ"
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
                        "en": "The scholarship enabled her to study abroad."
                    },
                    "phonetic": "将",
                    "phoneticReading": "ショウ"
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
                        "en": "Japan's consumption of rice is decreasing."
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ"
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
                        "en": "I'd like to see some dancing. Do you have any information?"
                    },
                    "phonetic": "青",
                    "phoneticReading": "セイ、ショウ、ジョウ"
                }
            ],
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
                        "en": "High fever is a prominent symptom of this disease."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ"
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
                        "en": "May I see two pieces of identification?"
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ"
                },
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
                        "en": "His answer depends on his mood."
                    },
                    "phonetic": "左",
                    "phoneticReading": "サ"
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
                        "en": "He missed the train by one minute."
                    },
                    "phonetic": "左",
                    "phoneticReading": "サ"
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
                        "en": "She carried off all the prizes."
                    },
                    "phonetic": "尚",
                    "phoneticReading": "ショウ"
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
                        "en": "The teacher gave John a prize."
                    },
                    "phonetic": "尚",
                    "phoneticReading": "ショウ"
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
                        "en": "Animals and plants live on this planet."
                    },
                    "phonetic": "直",
                    "phoneticReading": "ショク、チ"
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
                        "en": "I immediately lost my concentration."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I live above my means."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "This is an important thing for all of you."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The lawyer insisted on his innocence."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She published the book at her own expense."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "A housewife has many domestic duties."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I'll hear all of you in turn."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She set the tray down on the table."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "No living things could live without oxygen."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Memorize the poem by next week."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I like summer best of the four seasons."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She committed suicide by jumping off the bridge."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "My sister saw it with her own eyes."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "A new branch will be opened in Chicago next month."
                    },
                    "phonetic": "支",
                    "phoneticReading": "シ、キ"
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
                        "en": "Our brains control our activities."
                    },
                    "phonetic": "支",
                    "phoneticReading": "シ、キ"
                },
                {
                    "jp": "資源",
                    "reading": "しげん",
                    "en": "resources",
                    "meanings": [
                        "resources"
                    ],
                    "example": {
                        "jp": "日本は天然資源に富んでいない。",
                        "en": "Japan is not abundant in natural resources."
                    },
                    "phonetic": "次",
                    "phoneticReading": "シ"
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
                        "en": "The company bought shares in the venture."
                    },
                    "phonetic": "次",
                    "phoneticReading": "シ"
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
                        "en": "The train was full of passengers."
                    },
                    "phonetic": "乗",
                    "phoneticReading": "ジョウ"
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
                        "en": "He gave me a lift in his cart."
                    },
                    "phonetic": "乗",
                    "phoneticReading": "ジョウ"
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
                        "en": "The sun sank below the horizon before I knew it."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He picked up a mirror and examined his tongue."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Quantity rather than quality is important."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "In the discussion the accent was on unemployment."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Her dream will one day come true."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Actually this will be my fourth question."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "They are disappointed with each other."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "This vending machine is out of order."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "We have a lot of children's books in the library."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He adores going to the theater."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Many people were killed in the plane accident."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "My father is proud of being handsome."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She showed great skill on the piano."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The government got their majority at the last election."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "She is happy to have conceived a baby by him."
                    },
                    "phonetic": "幸",
                    "phoneticReading": "コウ"
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
                        "en": "She was jealous of her neighbor's good fortune."
                    },
                    "phonetic": "幸",
                    "phoneticReading": "コウ"
                },
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
                        "en": "He makes friends with everybody he meets."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン"
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
                        "en": "He is distantly related to her."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン"
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
                        "en": "The girl reading a book is Kate."
                    },
                    "phonetic": "少",
                    "phoneticReading": "ショウ、サ"
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
                        "en": "I find her manner a little hard to take."
                    },
                    "phonetic": "少",
                    "phoneticReading": "ショウ、サ"
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
                        "en": "We all helped with the harvest."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "They didn't take much account of my opinion."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "・ Corrected mistaken/missing characters in the text data."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "You are now among the elite."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The people protested against the low altitude flight training."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "My father is good with tools and does almost all the repairs."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Democracy is one form of government."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Father is going to undergo an operation."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He was forced to resign as prime minister."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Does the end justify the means?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She comes from California."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He went to Paris, which is the capital of France."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Rice is one of those staple commodities."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "At that instant it exploded with a great noise."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "He comes into contact with all kinds of people."
                    },
                    "phonetic": "重",
                    "phoneticReading": "シュ"
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
                        "en": "He raised tomato plants from seed."
                    },
                    "phonetic": "重",
                    "phoneticReading": "シュ"
                },
                {
                    "jp": "週",
                    "reading": "しゅう",
                    "en": "week",
                    "meanings": [
                        "week"
                    ],
                    "example": {
                        "jp": "彼女は週に１度両親に手紙を出す。",
                        "en": "She writes to her parents once a week."
                    },
                    "phonetic": "周",
                    "phoneticReading": "シュウ、チョウ"
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
                        "en": "The water was dead around us."
                    },
                    "phonetic": "周",
                    "phoneticReading": "シュウ、チョウ"
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
                        "en": "There are many careers open to women."
                    },
                    "phonetic": "戠",
                    "phoneticReading": "シキ、ショク"
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
                        "en": "This is an important thing for all of you."
                    },
                    "phonetic": "戠",
                    "phoneticReading": "シキ、ショク"
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
                        "en": "We made good time until we ran into a blizzard."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "For circumstantial evidence, that's plenty."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She will have it that the conditions are unfair."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He must be lacking in common sense."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "To my side, my wife, who I'm presently at odds with, lies sleeping."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "His English will improve in the course of time."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She was amused at the joke."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Two passenger trains crashed in Shanghai."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He took over the business from his father."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Half her goods were sold cheap."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Thanks to you I've lost my appetite."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She aimed to become an actress."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He'll cope with difficult problems."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He folded his paper, consulting his watch."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ]
        ]
    },
    {
        "level": 4,
        "jlpt": "N2",
        "title": "N2 · Upper Intermediate",
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
                        "en": "A natural diet is suitable for human digestion."
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ"
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
                        "en": "The police are reluctant to pursue criminal charges in medical cases."
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ"
                },
                {
                    "jp": "受験",
                    "reading": "じゅけん",
                    "en": "taking an exam",
                    "meanings": [
                        "taking an examination"
                    ],
                    "example": {
                        "jp": "受験地獄での戦いが終わりました。",
                        "en": "My fight in our examination hell is over!"
                    },
                    "phonetic": "受",
                    "phoneticReading": "ジュ"
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
                        "en": "As soon as he sat down, he picked up the telephone."
                    },
                    "phonetic": "受",
                    "phoneticReading": "ジュ"
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
                        "en": "I bought a book and he a ruler."
                    },
                    "phonetic": "定",
                    "phoneticReading": "ジョウ、テイ"
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
                        "en": "This elevator's capacity is ten people."
                    },
                    "phonetic": "定",
                    "phoneticReading": "ジョウ、テイ"
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
                        "en": "Are printers a non-durable good?"
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ"
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
                        "en": "The performance of electric cars has improved."
                    },
                    "phonetic": "生",
                    "phoneticReading": "セイ、ショウ"
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
                        "en": "You'll get a reward for your cooperation."
                    },
                    "phonetic": "尚",
                    "phoneticReading": "ショウ"
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
                        "en": "In the absence of sufficient data, the survey was given up."
                    },
                    "phonetic": "次",
                    "phoneticReading": "シ"
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
                        "en": "The next Shinkansen train leaves at just nine o'clock."
                    },
                    "phonetic": "亲",
                    "phoneticReading": "シン"
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
                        "en": "They installed him as chairman of the committee."
                    },
                    "phonetic": "就",
                    "phoneticReading": "シュウ"
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
                        "en": "He explored the region around the South Pole."
                    },
                    "phonetic": "周",
                    "phoneticReading": "シュウ、チョウ"
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
                        "en": "There are lots of four-character compound words in Japanese, huh?"
                    },
                    "phonetic": "孰",
                    "phoneticReading": "ジュク"
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
                        "en": "The economy is at peak of a business cycle at present."
                    },
                    "phonetic": "盾",
                    "phoneticReading": "ジュン"
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
                        "en": "Japanese shogi corresponds to chess."
                    },
                    "phonetic": "将",
                    "phoneticReading": "ショウ"
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
                        "en": "Walls have ears, shoji have eyes."
                    },
                    "phonetic": "章",
                    "phoneticReading": "ショウ"
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
                        "en": "This ticket is valid for three months."
                    },
                    "phonetic": "乗",
                    "phoneticReading": "ジョウ"
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
                        "en": "It is not white hair that engenders wisdom."
                    },
                    "phonetic": "白",
                    "phoneticReading": "ハク"
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
                        "en": "That pole is not quite vertical."
                    },
                    "phonetic": "垂",
                    "phoneticReading": "スイ"
                }
            ],
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
                        "en": "Boil the milk bottles."
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ"
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
                        "en": "The fire department is located right next to the airport."
                    },
                    "phonetic": "肖",
                    "phoneticReading": "ショウ"
                },
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
                        "en": "The focus of the talk is put on the content."
                    },
                    "phonetic": "焦",
                    "phoneticReading": "ショウ"
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
                        "en": "What should I do? I burned the pot!"
                    },
                    "phonetic": "焦",
                    "phoneticReading": "ショウ"
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
                        "en": "The tube was shattered by the explosion."
                    },
                    "phonetic": "真",
                    "phoneticReading": "シン、テン"
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
                        "en": "Everything went black."
                    },
                    "phonetic": "真",
                    "phoneticReading": "シン、テン"
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
                        "en": "She set about writing the essay."
                    },
                    "phonetic": "迶",
                    "phoneticReading": "ズイ"
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
                        "en": "He is one of the best brains in our country."
                    },
                    "phonetic": "豆",
                    "phoneticReading": "トウ、ト、ズ"
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
                        "en": "Who can put a bell on the cat?"
                    },
                    "phonetic": "令",
                    "phoneticReading": "レイ"
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
                        "en": "It's well-ventilated and an ideal place to cool down."
                    },
                    "phonetic": "京",
                    "phoneticReading": "ケイ、リョウ"
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
                        "en": "Please fill out the Customs Declaration Form."
                    },
                    "phonetic": "兑",
                    "phoneticReading": "エツ、ゼイ"
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
                        "en": "Today's pure mathematics is tomorrow's applied mathematics."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Osaka is the center of commerce in Japan."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The defendant will appeal to a higher court."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The shop did not want him."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Avian medicine - diagnosis and treatment of illnesses."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The public is requested not to litter in these woods."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I see some fishing boats on the horizon."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The top execs are gathering for a power breakfast."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The floor gave in under the weight of the heavy safe."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "I'd like to sit near the front."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ"
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
                        "en": "The net weight of this jam is 200 grams."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ"
                },
                {
                    "jp": "職場",
                    "reading": "しょくば",
                    "en": "workplace",
                    "meanings": [
                        "workplace"
                    ],
                    "example": {
                        "jp": "私は職場から１時間の所に住んでいる。",
                        "en": "I live an hour away from work."
                    },
                    "phonetic": "戠",
                    "phoneticReading": "シキ、ショク"
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
                        "en": "A bad workman blames his tools."
                    },
                    "phonetic": "戠",
                    "phoneticReading": "シキ、ショク"
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
                        "en": "I'd like to reserve a sleeping berth."
                    },
                    "phonetic": "𠬶",
                    "phoneticReading": "シン"
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
                        "en": "They yielded their land to the invaders."
                    },
                    "phonetic": "𠬶",
                    "phoneticReading": "シン"
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
                        "en": "The gravity of the moon is one-sixth of that of the earth."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "We put up the flags on national holidays."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "A sentence normally has a subject and a verb."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The average life span of the Japanese has lengthened to a great extent."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Bob will play the leading role for the first time in the next school festival."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He rose to the rank of sergeant."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "All the boys spoke each in turn."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I'm surprised that you're so naïve."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Don't hold it upside down."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "My uncle manages a firm."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Tom has been here since early October."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Convert the following fractions to decimals."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Whether you win or lose the fight is not determined by your physical strength."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She has an elegant manner."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                    "phoneticReading": "ショウ、セイ"
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
                        "en": "He maintains his car well."
                    },
                    "phonetic": "正",
                    "phoneticReading": "ショウ、セイ"
                },
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
                        "en": "Have you applied for a passport yet?"
                    },
                    "phonetic": "申",
                    "phoneticReading": "シン"
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
                        "en": "He wrote a novel based on ancient myths."
                    },
                    "phonetic": "申",
                    "phoneticReading": "シン"
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
                        "en": "This film is based on a novel."
                    },
                    "phonetic": "制",
                    "phoneticReading": "セイ"
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
                        "en": "Who made the doll?"
                    },
                    "phonetic": "制",
                    "phoneticReading": "セイ"
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
                        "en": "This is a beginner's textbook."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I'm a professor, or rather an associate professor, to be exact."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "May I trouble you for the salt?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Nature and books belong to the eyes that see them."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Tom put some food into the dog's dish."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I bought this book at the bookstore in front of the station."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I know a bit about calligraphy."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Much legal language is obscure to a layman."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I'm chilled to the bone."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Man proposes, God disposes."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Moral and physical development are remarkable in the youth."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Artificial leather can't compare with the real thing."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "History is a branch of the humanities."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Even a large sum of money cannot take the place of a man's life."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "Benefits accrue to the community from reconstruction."
                    },
                    "phonetic": "生",
                    "phoneticReading": "セイ、ショウ"
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
                        "en": "Only two people survived the earthquake."
                    },
                    "phonetic": "生",
                    "phoneticReading": "セイ、ショウ"
                },
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
                        "en": "He succeeded in applying steam to navigation."
                    },
                    "phonetic": "丞",
                    "phoneticReading": "ジョウ"
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
                        "en": "Water evaporates when it is heated."
                    },
                    "phonetic": "丞",
                    "phoneticReading": "ジョウ"
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
                        "en": "You don't have to write out a clean copy of your composition."
                    },
                    "phonetic": "青",
                    "phoneticReading": "セイ、ショウ、ジョウ"
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
                        "en": "Clean up after you have finished using the bathroom."
                    },
                    "phonetic": "青",
                    "phoneticReading": "セイ、ショウ、ジョウ"
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
                        "en": "Have you ever taken a shower in the middle of the night?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                    "phoneticReading": null
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
                    "phoneticReading": null
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
                        "en": "I'm all thumbs in the kitchen."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Water turns into steam when it is boiled."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Water consists of hydrogen and oxygen."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I guess that she is over thirty."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "There is little water left in the canteen."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "You should drink a lot of liquid."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I see some fishing boats on the horizon."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "A fallen leaf floated on the surface of the water."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Light flows in through a gap in the curtain."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Frankly speaking, you made a mistake."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "These measurements conform to the blueprints."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ]
        ]
    },
    {
        "level": 5,
        "jlpt": "N1",
        "title": "N1 · Advanced",
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
                        "en": "She had an individual style of speaking."
                    },
                    "phonetic": "古",
                    "phoneticReading": "コ"
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
                        "en": "The hierarchy of rank has long been fixed."
                    },
                    "phonetic": "古",
                    "phoneticReading": "コ"
                },
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
                        "en": "Basic to the argument is the assumption that the rules in question are present in the language."
                    },
                    "phonetic": "艮",
                    "phoneticReading": "コン"
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
                        "en": "Majority rule is a basic principle of democracy."
                    },
                    "phonetic": "艮",
                    "phoneticReading": "コン"
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
                        "en": "Reading helps you build up your vocabulary."
                    },
                    "phonetic": "五",
                    "phoneticReading": "ゴ"
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
                        "en": "These words are derived from the same root."
                    },
                    "phonetic": "五",
                    "phoneticReading": "ゴ"
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
                        "en": "His affected manner of speaking seemed very absurd to me."
                    },
                    "phonetic": "骨",
                    "phoneticReading": "コツ"
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
                        "en": "He deals antiques in Osaka."
                    },
                    "phonetic": "骨",
                    "phoneticReading": "コツ"
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
                        "en": "Language is a specifically human characteristic."
                    },
                    "phonetic": "古",
                    "phoneticReading": "コ"
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
                        "en": "The mayor provided me with an identity card."
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ"
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
                        "en": "The cochlea implant is a technically ingenious device."
                    },
                    "phonetic": "工",
                    "phoneticReading": "コウ、ク"
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
                        "en": "Don't confuse \"dare\" and \"dear\"."
                    },
                    "phonetic": "昆",
                    "phoneticReading": "コン"
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
                        "en": "It is sensible of you to follow her advice."
                    },
                    "phonetic": "臤",
                    "phoneticReading": "ケン"
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
                        "en": "He raised a finger in protest."
                    },
                    "phonetic": "亢",
                    "phoneticReading": "コウ"
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
                        "en": "He avowed himself an atheist."
                    },
                    "phonetic": "告",
                    "phoneticReading": "コク、コウ"
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
                        "en": "We left a margin for error in our estimates."
                    },
                    "phonetic": "呉",
                    "phoneticReading": "ゴ"
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
                        "en": "It is no exaggeration to call him a genius."
                    },
                    "phonetic": "夸",
                    "phoneticReading": "コ、ケ"
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
                        "en": "The Supreme Court is located near the Imperial Palace."
                    },
                    "phonetic": "皇",
                    "phoneticReading": "コウ"
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
                        "en": "Archeology is a science that studies the activities of human beings and their changes through the study of the traces left by them."
                    },
                    "phonetic": "耂",
                    "phoneticReading": "コウ"
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
                        "en": "Korean food is noted for its spicy flavor."
                    },
                    "phonetic": "香",
                    "phoneticReading": "キョウ"
                }
            ],
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
                        "en": "Democracy originated in Ancient Greece."
                    },
                    "phonetic": "古",
                    "phoneticReading": "コ"
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
                        "en": "Every situation requires individual analysis."
                    },
                    "phonetic": "古",
                    "phoneticReading": "コ"
                },
                {
                    "jp": "交渉",
                    "reading": "こうしょう",
                    "en": "negotiation",
                    "meanings": [
                        "negotiation"
                    ],
                    "example": {
                        "jp": "労働組合は経営陣と交渉している。",
                        "en": "The labor union is negotiating with the owners."
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ"
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
                        "en": "You should study in an efficient manner."
                    },
                    "phonetic": "交",
                    "phoneticReading": "コウ"
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
                        "en": "For all his wealth and fame, he is a lonely man."
                    },
                    "phonetic": "瓜",
                    "phoneticReading": "コ"
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
                        "en": "He delivered the package to the orphanage."
                    },
                    "phonetic": "瓜",
                    "phoneticReading": "コ"
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
                        "en": "The massive flood paralyzed the local transportation network."
                    },
                    "phonetic": "共",
                    "phoneticReading": "キョウ、コウ"
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
                        "en": "The will is as good as the deed."
                    },
                    "phonetic": "士",
                    "phoneticReading": "シ"
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
                        "en": "Rock music is especially popular among young people."
                    },
                    "phonetic": "朱",
                    "phoneticReading": "シュ"
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
                    "phoneticReading": "キ、ギ、ゴ"
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
                        "en": "The Mayan calendar has 19 months."
                    },
                    "phonetic": "𠩵",
                    "phoneticReading": "レキ"
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
                        "en": "Don't let this discourage you from trying it again."
                    },
                    "phonetic": "徴",
                    "phoneticReading": "チョウ"
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
                        "en": "He exploited his position to build up his fortune."
                    },
                    "phonetic": "才",
                    "phoneticReading": "サイ、ザイ"
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
                        "en": "He sees all life in terms of money."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Strictly speaking, a tomato is a fruit."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He has got both authority and ability."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He besought her to favor him."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The women longed to climb up the social ladder."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "A considerable amount of money was appropriated for the national defense."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He is man of moderate views."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "I purchased the goods for half price."
                    },
                    "phonetic": "冓",
                    "phoneticReading": "コウ"
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
                        "en": "She takes cooking lessons once a week."
                    },
                    "phonetic": "冓",
                    "phoneticReading": "コウ"
                },
                {
                    "jp": "工学",
                    "reading": "こうがく",
                    "en": "engineering",
                    "meanings": [
                        "engineering"
                    ],
                    "example": {
                        "jp": "電子工学の専門用語がわからない。",
                        "en": "I don't understand electronics shoptalk."
                    },
                    "phonetic": "工",
                    "phoneticReading": "コウ、ク"
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
                        "en": "It won't be long before they find out what we're trying to do here."
                    },
                    "phonetic": "工",
                    "phoneticReading": "コウ、ク"
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
                        "en": "Mining is one of the main sources of wealth in Chile."
                    },
                    "phonetic": "広",
                    "phoneticReading": "コウ"
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
                        "en": "I was a miner for two years."
                    },
                    "phonetic": "広",
                    "phoneticReading": "コウ"
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
                        "en": "As soon as the store opened, customers rushed in towards the limited edition."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I stand for freedom of speech for everyone."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Helping a blind man is an act of kindness."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "They will agree on that."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The secretary took dictation from her boss."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The commanding officer marched, with soldiers following behind."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He decided neither to advance nor to retreat."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The corporation invited bids for the construction project."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Growing sales gave support to the idea that all was well."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She had an oral examination in English."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Tom is a CPA, isn't he?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Almost all of the reviews of the play were favorable."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                    "phoneticReading": null
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
                        "en": "Switzerland has several official languages."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "She has constructive ideas."
                    },
                    "phonetic": "冓",
                    "phoneticReading": "コウ"
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
                        "en": "He subscribed to Time magazine."
                    },
                    "phonetic": "冓",
                    "phoneticReading": "コウ"
                },
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
                        "en": "Although Takahashi looks completely Asian, I've heard he's of mixed blood."
                    },
                    "phonetic": "昆",
                    "phoneticReading": "コン"
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
                        "en": "He has an interest in collecting insects."
                    },
                    "phonetic": "昆",
                    "phoneticReading": "コン"
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
                        "en": "It's pleasant to take a walk on the plateau."
                    },
                    "phonetic": "高",
                    "phoneticReading": "コウ"
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
                        "en": "He has elegant tastes."
                    },
                    "phonetic": "高",
                    "phoneticReading": "コウ"
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
                        "en": "The retail sector had a rough quarter."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "This town boasts a large public library."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He traveled with a large escort."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "They described the girl as being small."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "May I pay with a travelers' check?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The government is promoting the use of home products."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                    "phoneticReading": null
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
                        "en": "He is one of the best brains in our country."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Heaven and hell exist in the hearts of man."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Japan stood with the United States at the U. N. Assembly."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The house is anything but comfortable to live in."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Try to live within your means."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Thank you. That's very reassuring."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Without you, I'm very lonely."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ],
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
                        "en": "Anne is patiently knitting."
                    },
                    "phonetic": "艮",
                    "phoneticReading": "コン"
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
                        "en": "That's a completely unfounded rumor."
                    },
                    "phonetic": "艮",
                    "phoneticReading": "コン"
                },
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
                        "en": "This store is operated on a cash basis."
                    },
                    "phonetic": "原",
                    "phoneticReading": "ゲン"
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
                        "en": "The crude oil price is falling further."
                    },
                    "phonetic": "原",
                    "phoneticReading": "ゲン"
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
                        "en": "This ring lost its luster."
                    },
                    "phonetic": "光",
                    "phoneticReading": "コウ"
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
                    "phoneticReading": "コウ"
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
                        "en": "She tried several times but failed."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He readily agreed to my proposal."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "She has not yet had her name entered in her husband's family."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Since then, diplomatic relations between Canada and Iran have been suspended."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "They are inquiring into the matter."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "There was a message for me, wasn't there?"
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The applicant impressed the examiner favorably."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He laughed the matter away."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I appreciate your attention to detail."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "He turned angrily on his accusers."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The room is richly ornamented."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "I am looking forward to seeing you again."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "The storm caused a lot of damage."
                    },
                    "phonetic": null,
                    "phoneticReading": null
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
                        "en": "Germs can cause sickness."
                    },
                    "phonetic": null,
                    "phoneticReading": null
                }
            ]
        ]
    }
];
