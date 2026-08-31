// Kango <-> Wago dictionary data. Each entry pairs a Sino-Japanese (kango, 漢語) term with
// its native-Japanese (wago, 和語) equivalent -- both are stored as plain {text, reading}
// pairs (the FULL word, including any trailing okurigana kana), not pre-built <ruby> HTML.
// dictionary.js generates furigana at render time by matching trailing kana shared between
// `text` and `reading` and only wrapping the leading kanji stem in <ruby> -- e.g.
// {text:"使用する", reading:"しようする"} renders as 使用(しよう)する, not the whole word
// re-spelled in kana. This sidesteps hand-typing repetitive ruby markup entirely (a real
// source of transcription errors in this project's other data files), at the cost of only
// working for the common "kanji stem + shared trailing kana" shape -- true for every entry
// here since they're all single dictionary words/verbs, not full sentences.
//
// `honorific` (verbs only, and only where a genuinely irregular/suppletive form exists --
// not the regular お/ご+stem+になる/する pattern every verb can take): sonkeigo (尊敬語,
// respectful -- used for a social superior's action) and/or kenjougo (謙譲語, humble --
// used for the speaker's own action toward a superior). Omitted entirely for verbs that only
// take the regular pattern, to keep the irregular forms the ones that actually stand out.

const DICTIONARY_ENTRIES = [
    {
        "kango": {
            "text": "使用する",
            "reading": "しようする"
        },
        "wago": {
            "text": "使う",
            "reading": "つかう"
        },
        "meaning": "to use",
        "pos": "verb",
        "meaningMn": "хэрэглэх"
    },
    {
        "kango": {
            "text": "利用する",
            "reading": "りようする"
        },
        "wago": {
            "text": "使う",
            "reading": "つかう"
        },
        "meaning": "to utilize",
        "pos": "verb",
        "meaningMn": "ашиглах"
    },
    {
        "kango": {
            "text": "購入する",
            "reading": "こうにゅうする"
        },
        "wago": {
            "text": "買う",
            "reading": "かう"
        },
        "meaning": "to purchase",
        "pos": "verb",
        "meaningMn": "худалдаж авах"
    },
    {
        "kango": {
            "text": "開始する",
            "reading": "かいしする"
        },
        "wago": {
            "text": "始める",
            "reading": "はじめる"
        },
        "meaning": "to start",
        "pos": "verb",
        "meaningMn": "эхлэх"
    },
    {
        "kango": {
            "text": "終了する",
            "reading": "しゅうりょうする"
        },
        "wago": {
            "text": "終わる",
            "reading": "おわる"
        },
        "meaning": "to end",
        "pos": "verb",
        "meaningMn": "дуусах"
    },
    {
        "kango": {
            "text": "到着する",
            "reading": "とうちゃくする"
        },
        "wago": {
            "text": "着く",
            "reading": "つく"
        },
        "meaning": "to arrive",
        "pos": "verb",
        "meaningMn": "ирэх"
    },
    {
        "kango": {
            "text": "出発する",
            "reading": "しゅっぱつする"
        },
        "wago": {
            "text": "発つ",
            "reading": "たつ"
        },
        "meaning": "to depart",
        "pos": "verb",
        "meaningMn": "хөдлөх"
    },
    {
        "kango": {
            "text": "帰宅する",
            "reading": "きたくする"
        },
        "wago": {
            "text": "帰る",
            "reading": "かえる"
        },
        "meaning": "to go home",
        "pos": "verb",
        "meaningMn": "гэр лүүгээ харих"
    },
    {
        "kango": {
            "text": "訪問する",
            "reading": "ほうもんする"
        },
        "wago": {
            "text": "訪れる",
            "reading": "おとずれる"
        },
        "meaning": "to visit",
        "pos": "verb",
        "meaningMn": "зочлох"
    },
    {
        "kango": {
            "text": "移動する",
            "reading": "いどうする"
        },
        "wago": {
            "text": "動く",
            "reading": "うごく"
        },
        "meaning": "to move",
        "pos": "verb",
        "meaningMn": "хөдлөх, зөөх"
    },
    {
        "kango": {
            "text": "停止する",
            "reading": "ていしする"
        },
        "wago": {
            "text": "止まる",
            "reading": "とまる"
        },
        "meaning": "to stop",
        "pos": "verb",
        "meaningMn": "зогсох"
    },
    {
        "kango": {
            "text": "増加する",
            "reading": "ぞうかする"
        },
        "wago": {
            "text": "増える",
            "reading": "ふえる"
        },
        "meaning": "to increase",
        "pos": "verb",
        "meaningMn": "нэмэгдэх"
    },
    {
        "kango": {
            "text": "減少する",
            "reading": "げんしょうする"
        },
        "wago": {
            "text": "減る",
            "reading": "へる"
        },
        "meaning": "to decrease",
        "pos": "verb",
        "meaningMn": "буурах"
    },
    {
        "kango": {
            "text": "発生する",
            "reading": "はっせいする"
        },
        "wago": {
            "text": "起こる",
            "reading": "おこる"
        },
        "meaning": "to occur",
        "pos": "verb",
        "meaningMn": "тохиолдох"
    },
    {
        "kango": {
            "text": "消滅する",
            "reading": "しょうめつする"
        },
        "wago": {
            "text": "消える",
            "reading": "きえる"
        },
        "meaning": "to disappear",
        "pos": "verb",
        "meaningMn": "алга болох"
    },
    {
        "kango": {
            "text": "完成する",
            "reading": "かんせいする"
        },
        "wago": {
            "text": "仕上がる",
            "reading": "しあがる"
        },
        "meaning": "to be completed",
        "pos": "verb",
        "meaningMn": "дуусах, биелэх"
    },
    {
        "kango": {
            "text": "決定する",
            "reading": "けっていする"
        },
        "wago": {
            "text": "決める",
            "reading": "きめる"
        },
        "meaning": "to decide",
        "pos": "verb",
        "meaningMn": "шийдэх"
    },
    {
        "kango": {
            "text": "想像する",
            "reading": "そうぞうする"
        },
        "wago": {
            "text": "思い描く",
            "reading": "おもいえがく"
        },
        "meaning": "to imagine",
        "pos": "verb",
        "meaningMn": "төсөөлөх"
    },
    {
        "kango": {
            "text": "理解する",
            "reading": "りかいする"
        },
        "wago": {
            "text": "分かる",
            "reading": "わかる"
        },
        "meaning": "to understand",
        "pos": "verb",
        "meaningMn": "ойлгох"
    },
    {
        "kango": {
            "text": "発言する",
            "reading": "はつげんする"
        },
        "wago": {
            "text": "言う",
            "reading": "いう"
        },
        "meaning": "to say",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "おっしゃる",
                "reading": "おっしゃる"
            },
            "kenjougo": {
                "text": "申し上げる",
                "reading": "もうしあげる"
            }
        },
        "meaningMn": "хэлэх"
    },
    {
        "kango": {
            "text": "見物する",
            "reading": "けんぶつする"
        },
        "wago": {
            "text": "見る",
            "reading": "みる"
        },
        "meaning": "to see, watch",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "ご覧になる",
                "reading": "ごらんになる"
            },
            "kenjougo": {
                "text": "拝見する",
                "reading": "はいけんする"
            }
        },
        "meaningMn": "харах, үзэх"
    },
    {
        "kango": {
            "text": "食事する",
            "reading": "しょくじする"
        },
        "wago": {
            "text": "食べる",
            "reading": "たべる"
        },
        "meaning": "to eat",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "召し上がる",
                "reading": "めしあがる"
            },
            "kenjougo": {
                "text": "いただく",
                "reading": "いただく"
            }
        },
        "meaningMn": "идэх"
    },
    {
        "kango": {
            "text": "飲用する",
            "reading": "いんようする"
        },
        "wago": {
            "text": "飲む",
            "reading": "のむ"
        },
        "meaning": "to drink",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "召し上がる",
                "reading": "めしあがる"
            },
            "kenjougo": {
                "text": "いただく",
                "reading": "いただく"
            }
        },
        "meaningMn": "уух"
    },
    {
        "kango": {
            "text": "就寝する",
            "reading": "しゅうしんする"
        },
        "wago": {
            "text": "寝る",
            "reading": "ねる"
        },
        "meaning": "to sleep",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "お休みになる",
                "reading": "おやすみになる"
            }
        },
        "meaningMn": "унтах"
    },
    {
        "kango": {
            "text": "起床する",
            "reading": "きしょうする"
        },
        "wago": {
            "text": "起きる",
            "reading": "おきる"
        },
        "meaning": "to get up",
        "pos": "verb",
        "meaningMn": "босох"
    },
    {
        "kango": {
            "text": "存在する",
            "reading": "そんざいする"
        },
        "wago": {
            "text": "いる",
            "reading": "いる"
        },
        "meaning": "to exist, be (animate)",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "いらっしゃる",
                "reading": "いらっしゃる"
            },
            "kenjougo": {
                "text": "おる",
                "reading": "おる"
            }
        },
        "meaningMn": "байх (амьд биет)"
    },
    {
        "kango": {
            "text": "実行する",
            "reading": "じっこうする"
        },
        "wago": {
            "text": "する",
            "reading": "する"
        },
        "meaning": "to do",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "なさる",
                "reading": "なさる"
            },
            "kenjougo": {
                "text": "いたす",
                "reading": "いたす"
            }
        },
        "meaningMn": "хийх"
    },
    {
        "kango": {
            "text": "来訪する",
            "reading": "らいほうする"
        },
        "wago": {
            "text": "来る",
            "reading": "くる"
        },
        "meaning": "to come",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "いらっしゃる",
                "reading": "いらっしゃる"
            },
            "kenjougo": {
                "text": "参る",
                "reading": "まいる"
            }
        },
        "meaningMn": "ирэх"
    },
    {
        "kango": {
            "text": "認識する",
            "reading": "にんしきする"
        },
        "wago": {
            "text": "知る",
            "reading": "しる"
        },
        "meaning": "to know",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "ご存知だ",
                "reading": "ごぞんじだ"
            },
            "kenjougo": {
                "text": "存じる",
                "reading": "ぞんじる"
            }
        },
        "meaningMn": "мэдэх"
    },
    {
        "kango": {
            "text": "受領する",
            "reading": "じゅりょうする"
        },
        "wago": {
            "text": "もらう",
            "reading": "もらう"
        },
        "meaning": "to receive",
        "pos": "verb",
        "honorific": {
            "kenjougo": {
                "text": "いただく",
                "reading": "いただく"
            }
        },
        "meaningMn": "хүлээн авах"
    },
    {
        "kango": {
            "text": "贈呈する",
            "reading": "ぞうていする"
        },
        "wago": {
            "text": "くれる",
            "reading": "くれる"
        },
        "meaning": "to give (to me)",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "くださる",
                "reading": "くださる"
            }
        },
        "meaningMn": "надад өгөх"
    },
    {
        "kango": {
            "text": "贈与する",
            "reading": "ぞうよする"
        },
        "wago": {
            "text": "あげる",
            "reading": "あげる"
        },
        "meaning": "to give",
        "pos": "verb",
        "honorific": {
            "kenjougo": {
                "text": "差し上げる",
                "reading": "さしあげる"
            }
        },
        "meaningMn": "өгөх"
    },
    {
        "kango": {
            "text": "面会する",
            "reading": "めんかいする"
        },
        "wago": {
            "text": "会う",
            "reading": "あう"
        },
        "meaning": "to meet",
        "pos": "verb",
        "honorific": {
            "kenjougo": {
                "text": "お目にかかる",
                "reading": "おめにかかる"
            }
        },
        "meaningMn": "уулзах"
    },
    {
        "kango": {
            "text": "死去する",
            "reading": "しきょする"
        },
        "wago": {
            "text": "死ぬ",
            "reading": "しぬ"
        },
        "meaning": "to die",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "お亡くなりになる",
                "reading": "おなくなりになる"
            }
        },
        "meaningMn": "нас барах"
    },
    {
        "kango": {
            "text": "着用する",
            "reading": "ちゃくようする"
        },
        "wago": {
            "text": "着る",
            "reading": "きる"
        },
        "meaning": "to wear",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "お召しになる",
                "reading": "おめしになる"
            }
        },
        "meaningMn": "өмсөх"
    },
    {
        "kango": {
            "text": "拝借する",
            "reading": "はいしゃくする"
        },
        "wago": {
            "text": "借りる",
            "reading": "かりる"
        },
        "meaning": "to borrow",
        "pos": "verb",
        "honorific": {
            "kenjougo": {
                "text": "拝借する",
                "reading": "はいしゃくする"
            }
        },
        "meaningMn": "зээлэх"
    },
    {
        "kango": {
            "text": "拝読する",
            "reading": "はいどくする"
        },
        "wago": {
            "text": "読む",
            "reading": "よむ"
        },
        "meaning": "to read",
        "pos": "verb",
        "honorific": {
            "kenjougo": {
                "text": "拝読する",
                "reading": "はいどくする"
            }
        },
        "meaningMn": "унших"
    },
    {
        "kango": {
            "text": "着席する",
            "reading": "ちゃくせきする"
        },
        "wago": {
            "text": "座る",
            "reading": "すわる"
        },
        "meaning": "to sit",
        "pos": "verb",
        "honorific": {
            "sonkeigo": {
                "text": "おかけになる",
                "reading": "おかけになる"
            }
        },
        "meaningMn": "суух"
    },
    {
        "kango": {
            "text": "起立する",
            "reading": "きりつする"
        },
        "wago": {
            "text": "立つ",
            "reading": "たつ"
        },
        "meaning": "to stand",
        "pos": "verb",
        "meaningMn": "зогсох"
    },
    {
        "kango": {
            "text": "誕生する",
            "reading": "たんじょうする"
        },
        "wago": {
            "text": "生まれる",
            "reading": "うまれる"
        },
        "meaning": "to be born",
        "pos": "verb",
        "meaningMn": "төрөх"
    },
    {
        "kango": {
            "text": "購読する",
            "reading": "こうどくする"
        },
        "wago": {
            "text": "読む",
            "reading": "よむ"
        },
        "meaning": "to subscribe (and read)",
        "pos": "verb",
        "meaningMn": "захиалж унших"
    },
    {
        "kango": {
            "text": "所有する",
            "reading": "しょゆうする"
        },
        "wago": {
            "text": "持つ",
            "reading": "もつ"
        },
        "meaning": "to own, hold",
        "pos": "verb",
        "meaningMn": "эзэмших, барих"
    },
    {
        "kango": {
            "text": "携帯する",
            "reading": "けいたいする"
        },
        "wago": {
            "text": "持つ",
            "reading": "もつ"
        },
        "meaning": "to carry",
        "pos": "verb",
        "meaningMn": "зөөх, авч явах"
    },
    {
        "kango": {
            "text": "確認する",
            "reading": "かくにんする"
        },
        "wago": {
            "text": "確かめる",
            "reading": "たしかめる"
        },
        "meaning": "to confirm",
        "pos": "verb",
        "meaningMn": "баталгаажуулах"
    },
    {
        "kango": {
            "text": "調査する",
            "reading": "ちょうさする"
        },
        "wago": {
            "text": "調べる",
            "reading": "しらべる"
        },
        "meaning": "to investigate",
        "pos": "verb",
        "meaningMn": "судлах, шалгах"
    },
    {
        "kango": {
            "text": "選択する",
            "reading": "せんたくする"
        },
        "wago": {
            "text": "選ぶ",
            "reading": "えらぶ"
        },
        "meaning": "to choose",
        "pos": "verb",
        "meaningMn": "сонгох"
    },
    {
        "kango": {
            "text": "変更する",
            "reading": "へんこうする"
        },
        "wago": {
            "text": "変える",
            "reading": "かえる"
        },
        "meaning": "to change",
        "pos": "verb",
        "meaningMn": "өөрчлөх"
    },
    {
        "kango": {
            "text": "継続する",
            "reading": "けいぞくする"
        },
        "wago": {
            "text": "続ける",
            "reading": "つづける"
        },
        "meaning": "to continue",
        "pos": "verb",
        "meaningMn": "үргэлжлүүлэх"
    },
    {
        "kango": {
            "text": "中断する",
            "reading": "ちゅうだんする"
        },
        "wago": {
            "text": "止める",
            "reading": "やめる"
        },
        "meaning": "to interrupt, halt",
        "pos": "verb",
        "meaningMn": "тасалдуулах, зогсоох"
    },
    {
        "kango": {
            "text": "禁止する",
            "reading": "きんしする"
        },
        "wago": {
            "text": "止める",
            "reading": "とめる"
        },
        "meaning": "to forbid",
        "pos": "verb",
        "meaningMn": "хориглох"
    },
    {
        "kango": {
            "text": "許可する",
            "reading": "きょかする"
        },
        "wago": {
            "text": "許す",
            "reading": "ゆるす"
        },
        "meaning": "to permit",
        "pos": "verb",
        "meaningMn": "зөвшөөрөх"
    },
    {
        "kango": {
            "text": "拒否する",
            "reading": "きょひする"
        },
        "wago": {
            "text": "断る",
            "reading": "ことわる"
        },
        "meaning": "to refuse",
        "pos": "verb",
        "meaningMn": "татгалзах"
    },
    {
        "kango": {
            "text": "承諾する",
            "reading": "しょうだくする"
        },
        "wago": {
            "text": "引き受ける",
            "reading": "ひきうける"
        },
        "meaning": "to accept, consent",
        "pos": "verb",
        "meaningMn": "зөвшөөрч хүлээх"
    },
    {
        "kango": {
            "text": "希望する",
            "reading": "きぼうする"
        },
        "wago": {
            "text": "望む",
            "reading": "のぞむ"
        },
        "meaning": "to hope, wish",
        "pos": "verb",
        "meaningMn": "хүсэх, найдах"
    },
    {
        "kango": {
            "text": "期待する",
            "reading": "きたいする"
        },
        "wago": {
            "text": "待ち望む",
            "reading": "まちのぞむ"
        },
        "meaning": "to expect, look forward to",
        "pos": "verb",
        "meaningMn": "тэсэн ядан хүлээх"
    },
    {
        "kango": {
            "text": "後悔する",
            "reading": "こうかいする"
        },
        "wago": {
            "text": "悔やむ",
            "reading": "くやむ"
        },
        "meaning": "to regret",
        "pos": "verb",
        "meaningMn": "харамсах"
    },
    {
        "kango": {
            "text": "心配する",
            "reading": "しんぱいする"
        },
        "wago": {
            "text": "案じる",
            "reading": "あんじる"
        },
        "meaning": "to worry",
        "pos": "verb",
        "meaningMn": "санаа зовох"
    },
    {
        "kango": {
            "text": "感謝する",
            "reading": "かんしゃする"
        },
        "wago": {
            "text": "礼を言う",
            "reading": "れいをいう"
        },
        "meaning": "to thank",
        "pos": "verb",
        "meaningMn": "талархах"
    },
    {
        "kango": {
            "text": "謝罪する",
            "reading": "しゃざいする"
        },
        "wago": {
            "text": "詫びる",
            "reading": "わびる"
        },
        "meaning": "to apologize",
        "pos": "verb",
        "meaningMn": "уучлал гуйх"
    },
    {
        "kango": {
            "text": "叱責する",
            "reading": "しっせきする"
        },
        "wago": {
            "text": "叱る",
            "reading": "しかる"
        },
        "meaning": "to scold",
        "pos": "verb",
        "meaningMn": "загнах"
    },
    {
        "kango": {
            "text": "称賛する",
            "reading": "しょうさんする"
        },
        "wago": {
            "text": "ほめる",
            "reading": "ほめる"
        },
        "meaning": "to praise",
        "pos": "verb",
        "meaningMn": "магтах"
    },
    {
        "kango": {
            "text": "教育する",
            "reading": "きょういくする"
        },
        "wago": {
            "text": "教える",
            "reading": "おしえる"
        },
        "meaning": "to teach",
        "pos": "verb",
        "meaningMn": "заах"
    },
    {
        "kango": {
            "text": "学習する",
            "reading": "がくしゅうする"
        },
        "wago": {
            "text": "学ぶ",
            "reading": "まなぶ"
        },
        "meaning": "to learn, study",
        "pos": "verb",
        "meaningMn": "суралцах"
    },
    {
        "kango": {
            "text": "記憶する",
            "reading": "きおくする"
        },
        "wago": {
            "text": "覚える",
            "reading": "おぼえる"
        },
        "meaning": "to memorize",
        "pos": "verb",
        "meaningMn": "цээжлэх"
    },
    {
        "kango": {
            "text": "忘却する",
            "reading": "ぼうきゃくする"
        },
        "wago": {
            "text": "忘れる",
            "reading": "わすれる"
        },
        "meaning": "to forget",
        "pos": "verb",
        "meaningMn": "мартах"
    },
    {
        "kango": {
            "text": "捜索する",
            "reading": "そうさくする"
        },
        "wago": {
            "text": "捜す",
            "reading": "さがす"
        },
        "meaning": "to search for",
        "pos": "verb",
        "meaningMn": "хайх"
    },
    {
        "kango": {
            "text": "発見する",
            "reading": "はっけんする"
        },
        "wago": {
            "text": "見つける",
            "reading": "みつける"
        },
        "meaning": "to discover",
        "pos": "verb",
        "meaningMn": "нээх, олж мэдэх"
    },
    {
        "kango": {
            "text": "紛失する",
            "reading": "ふんしつする"
        },
        "wago": {
            "text": "なくす",
            "reading": "なくす"
        },
        "meaning": "to lose (an object)",
        "pos": "verb",
        "meaningMn": "гээх, алдах"
    },
    {
        "kango": {
            "text": "破損する",
            "reading": "はそんする"
        },
        "wago": {
            "text": "壊れる",
            "reading": "こわれる"
        },
        "meaning": "to break, be damaged",
        "pos": "verb",
        "meaningMn": "эвдрэх"
    },
    {
        "kango": {
            "text": "修理する",
            "reading": "しゅうりする"
        },
        "wago": {
            "text": "直す",
            "reading": "なおす"
        },
        "meaning": "to repair",
        "pos": "verb",
        "meaningMn": "засварлах"
    },
    {
        "kango": {
            "text": "製造する",
            "reading": "せいぞうする"
        },
        "wago": {
            "text": "作る",
            "reading": "つくる"
        },
        "meaning": "to manufacture",
        "pos": "verb",
        "meaningMn": "үйлдвэрлэх"
    },
    {
        "kango": {
            "text": "建築する",
            "reading": "けんちくする"
        },
        "wago": {
            "text": "建てる",
            "reading": "たてる"
        },
        "meaning": "to build",
        "pos": "verb",
        "meaningMn": "барих"
    },
    {
        "kango": {
            "text": "破壊する",
            "reading": "はかいする"
        },
        "wago": {
            "text": "壊す",
            "reading": "こわす"
        },
        "meaning": "to destroy",
        "pos": "verb",
        "meaningMn": "сүйтгэх"
    },
    {
        "kango": {
            "text": "焼却する",
            "reading": "しょうきゃくする"
        },
        "wago": {
            "text": "焼く",
            "reading": "やく"
        },
        "meaning": "to incinerate",
        "pos": "verb",
        "meaningMn": "шатаах"
    },
    {
        "kango": {
            "text": "洗浄する",
            "reading": "せんじょうする"
        },
        "wago": {
            "text": "洗う",
            "reading": "あらう"
        },
        "meaning": "to wash, cleanse",
        "pos": "verb",
        "meaningMn": "угаах"
    },
    {
        "kango": {
            "text": "掃除する",
            "reading": "そうじする"
        },
        "wago": {
            "text": "掃く",
            "reading": "はく"
        },
        "meaning": "to clean, sweep",
        "pos": "verb",
        "meaningMn": "цэвэрлэх"
    },
    {
        "kango": {
            "text": "整理する",
            "reading": "せいりする"
        },
        "wago": {
            "text": "片付ける",
            "reading": "かたづける"
        },
        "meaning": "to tidy up, organize",
        "pos": "verb",
        "meaningMn": "цэгцлэх"
    },
    {
        "kango": {
            "text": "収集する",
            "reading": "しゅうしゅうする"
        },
        "wago": {
            "text": "集める",
            "reading": "あつめる"
        },
        "meaning": "to collect",
        "pos": "verb",
        "meaningMn": "цуглуулах"
    },
    {
        "kango": {
            "text": "分配する",
            "reading": "ぶんぱいする"
        },
        "wago": {
            "text": "分ける",
            "reading": "わける"
        },
        "meaning": "to distribute, divide",
        "pos": "verb",
        "meaningMn": "хуваарилах"
    },
    {
        "kango": {
            "text": "結合する",
            "reading": "けつごうする"
        },
        "wago": {
            "text": "つなぐ",
            "reading": "つなぐ"
        },
        "meaning": "to join, connect",
        "pos": "verb",
        "meaningMn": "холбох"
    },
    {
        "kango": {
            "text": "分離する",
            "reading": "ぶんりする"
        },
        "wago": {
            "text": "離す",
            "reading": "はなす"
        },
        "meaning": "to separate",
        "pos": "verb",
        "meaningMn": "салгах"
    },
    {
        "kango": {
            "text": "混合する",
            "reading": "こんごうする"
        },
        "wago": {
            "text": "混ぜる",
            "reading": "まぜる"
        },
        "meaning": "to mix",
        "pos": "verb",
        "meaningMn": "хутгах, холих"
    },
    {
        "kango": {
            "text": "沸騰する",
            "reading": "ふっとうする"
        },
        "wago": {
            "text": "沸く",
            "reading": "わく"
        },
        "meaning": "to boil",
        "pos": "verb",
        "meaningMn": "буцалгах"
    },
    {
        "kango": {
            "text": "冷却する",
            "reading": "れいきゃくする"
        },
        "wago": {
            "text": "冷やす",
            "reading": "ひやす"
        },
        "meaning": "to cool, chill",
        "pos": "verb",
        "meaningMn": "хөргөх"
    },
    {
        "kango": {
            "text": "乾燥する",
            "reading": "かんそうする"
        },
        "wago": {
            "text": "乾く",
            "reading": "かわく"
        },
        "meaning": "to dry",
        "pos": "verb",
        "meaningMn": "хатаах"
    },
    {
        "kango": {
            "text": "湿潤する",
            "reading": "しつじゅんする"
        },
        "wago": {
            "text": "湿る",
            "reading": "しめる"
        },
        "meaning": "to become damp",
        "pos": "verb",
        "meaningMn": "норох, чийглэх"
    },
    {
        "kango": {
            "text": "上昇する",
            "reading": "じょうしょうする"
        },
        "wago": {
            "text": "上がる",
            "reading": "あがる"
        },
        "meaning": "to rise",
        "pos": "verb",
        "meaningMn": "өсөх, дээшлэх"
    },
    {
        "kango": {
            "text": "下降する",
            "reading": "かこうする"
        },
        "wago": {
            "text": "下がる",
            "reading": "さがる"
        },
        "meaning": "to descend, fall",
        "pos": "verb",
        "meaningMn": "буух, унах"
    },
    {
        "kango": {
            "text": "回転する",
            "reading": "かいてんする"
        },
        "wago": {
            "text": "回る",
            "reading": "まわる"
        },
        "meaning": "to rotate",
        "pos": "verb",
        "meaningMn": "эргэх"
    },
    {
        "kango": {
            "text": "落下する",
            "reading": "らっかする"
        },
        "wago": {
            "text": "落ちる",
            "reading": "おちる"
        },
        "meaning": "to fall",
        "pos": "verb",
        "meaningMn": "унах"
    },
    {
        "kango": {
            "text": "浮上する",
            "reading": "ふじょうする"
        },
        "wago": {
            "text": "浮く",
            "reading": "うく"
        },
        "meaning": "to float up, surface",
        "pos": "verb",
        "meaningMn": "усан дээр гарч ирэх"
    },
    {
        "kango": {
            "text": "沈下する",
            "reading": "ちんかする"
        },
        "wago": {
            "text": "沈む",
            "reading": "しずむ"
        },
        "meaning": "to sink",
        "pos": "verb",
        "meaningMn": "живэх"
    },
    {
        "kango": {
            "text": "出現する",
            "reading": "しゅつげんする"
        },
        "wago": {
            "text": "現れる",
            "reading": "あらわれる"
        },
        "meaning": "to appear",
        "pos": "verb",
        "meaningMn": "гарч ирэх"
    },
    {
        "kango": {
            "text": "隠蔽する",
            "reading": "いんぺいする"
        },
        "wago": {
            "text": "隠す",
            "reading": "かくす"
        },
        "meaning": "to conceal",
        "pos": "verb",
        "meaningMn": "нуух"
    },
    {
        "kango": {
            "text": "開放する",
            "reading": "かいほうする"
        },
        "wago": {
            "text": "開ける",
            "reading": "あける"
        },
        "meaning": "to open (up)",
        "pos": "verb",
        "meaningMn": "нээх"
    },
    {
        "kango": {
            "text": "閉鎖する",
            "reading": "へいさする"
        },
        "wago": {
            "text": "閉める",
            "reading": "しめる"
        },
        "meaning": "to close",
        "pos": "verb",
        "meaningMn": "хаах"
    },
    {
        "kango": {
            "text": "接触する",
            "reading": "せっしょくする"
        },
        "wago": {
            "text": "触れる",
            "reading": "ふれる"
        },
        "meaning": "to touch, contact",
        "pos": "verb",
        "meaningMn": "хүрэх, холбоо барих"
    },
    {
        "kango": {
            "text": "衝突する",
            "reading": "しょうとつする"
        },
        "wago": {
            "text": "ぶつかる",
            "reading": "ぶつかる"
        },
        "meaning": "to collide",
        "pos": "verb",
        "meaningMn": "мөргөлдөх"
    },
    {
        "kango": {
            "text": "回避する",
            "reading": "かいひする"
        },
        "wago": {
            "text": "避ける",
            "reading": "さける"
        },
        "meaning": "to avoid",
        "pos": "verb",
        "meaningMn": "зайлсхийх"
    },
    {
        "kango": {
            "text": "追跡する",
            "reading": "ついせきする"
        },
        "wago": {
            "text": "追う",
            "reading": "おう"
        },
        "meaning": "to chase, pursue",
        "pos": "verb",
        "meaningMn": "хөөх"
    },
    {
        "kango": {
            "text": "逃走する",
            "reading": "とうそうする"
        },
        "wago": {
            "text": "逃げる",
            "reading": "にげる"
        },
        "meaning": "to flee",
        "pos": "verb",
        "meaningMn": "зугтах"
    },
    {
        "kango": {
            "text": "捕獲する",
            "reading": "ほかくする"
        },
        "wago": {
            "text": "捕まえる",
            "reading": "つかまえる"
        },
        "meaning": "to capture",
        "pos": "verb",
        "meaningMn": "барих, эзлэх"
    },
    {
        "kango": {
            "text": "解放する",
            "reading": "かいほうする"
        },
        "wago": {
            "text": "放す",
            "reading": "はなす"
        },
        "meaning": "to release, let go",
        "pos": "verb",
        "meaningMn": "суллах"
    },
    {
        "kango": {
            "text": "貸与する",
            "reading": "たいよする"
        },
        "wago": {
            "text": "貸す",
            "reading": "かす"
        },
        "meaning": "to lend",
        "pos": "verb",
        "meaningMn": "зээлдүүлэх"
    },
    {
        "kango": {
            "text": "返却する",
            "reading": "へんきゃくする"
        },
        "wago": {
            "text": "返す",
            "reading": "かえす"
        },
        "meaning": "to return (something)",
        "pos": "verb",
        "meaningMn": "буцаах"
    },
    {
        "kango": {
            "text": "支払う",
            "reading": "しはらう"
        },
        "wago": {
            "text": "払う",
            "reading": "はらう"
        },
        "meaning": "to pay",
        "pos": "verb",
        "meaningMn": "төлөх"
    },
    {
        "kango": {
            "text": "売却する",
            "reading": "ばいきゃくする"
        },
        "wago": {
            "text": "売る",
            "reading": "うる"
        },
        "meaning": "to sell",
        "pos": "verb",
        "meaningMn": "зарах"
    },
    {
        "kango": {
            "text": "設置する",
            "reading": "せっちする"
        },
        "wago": {
            "text": "置く",
            "reading": "おく"
        },
        "meaning": "to install, set up",
        "pos": "verb",
        "meaningMn": "суурилуулах"
    },
    {
        "kango": {
            "text": "撤去する",
            "reading": "てっきょする"
        },
        "wago": {
            "text": "取り除く",
            "reading": "とりのぞく"
        },
        "meaning": "to remove",
        "pos": "verb",
        "meaningMn": "зайлуулах"
    },
    {
        "kango": {
            "text": "追加する",
            "reading": "ついかする"
        },
        "wago": {
            "text": "加える",
            "reading": "くわえる"
        },
        "meaning": "to add",
        "pos": "verb",
        "meaningMn": "нэмэх"
    },
    {
        "kango": {
            "text": "削除する",
            "reading": "さくじょする"
        },
        "wago": {
            "text": "消す",
            "reading": "けす"
        },
        "meaning": "to delete",
        "pos": "verb",
        "meaningMn": "устгах"
    },
    {
        "kango": {
            "text": "訂正する",
            "reading": "ていせいする"
        },
        "wago": {
            "text": "直す",
            "reading": "なおす"
        },
        "meaning": "to correct",
        "pos": "verb",
        "meaningMn": "засах, залруулах"
    },
    {
        "kango": {
            "text": "作成する",
            "reading": "さくせいする"
        },
        "wago": {
            "text": "作る",
            "reading": "つくる"
        },
        "meaning": "to create (a document etc.)",
        "pos": "verb",
        "meaningMn": "үүсгэх, зохиох"
    },
    {
        "kango": {
            "text": "提出する",
            "reading": "ていしゅつする"
        },
        "wago": {
            "text": "出す",
            "reading": "だす"
        },
        "meaning": "to submit",
        "pos": "verb",
        "meaningMn": "хүргүүлэх"
    },
    {
        "kango": {
            "text": "配布する",
            "reading": "はいふする"
        },
        "wago": {
            "text": "配る",
            "reading": "くばる"
        },
        "meaning": "to distribute, hand out",
        "pos": "verb",
        "meaningMn": "тараах"
    },
    {
        "kango": {
            "text": "記入する",
            "reading": "きにゅうする"
        },
        "wago": {
            "text": "書き込む",
            "reading": "かきこむ"
        },
        "meaning": "to fill in, write in",
        "pos": "verb",
        "meaningMn": "бөглөх"
    },
    {
        "kango": {
            "text": "署名する",
            "reading": "しょめいする"
        },
        "wago": {
            "text": "サインする",
            "reading": "さいんする"
        },
        "meaning": "to sign",
        "pos": "verb",
        "meaningMn": "гарын үсэг зурах"
    },
    {
        "kango": {
            "text": "捺印する",
            "reading": "なついんする"
        },
        "wago": {
            "text": "判を押す",
            "reading": "はんをおす"
        },
        "meaning": "to stamp a seal",
        "pos": "verb",
        "meaningMn": "тамга дарах"
    },
    {
        "kango": {
            "text": "検討する",
            "reading": "けんとうする"
        },
        "wago": {
            "text": "考える",
            "reading": "かんがえる"
        },
        "meaning": "to consider, examine",
        "pos": "verb",
        "meaningMn": "авч үзэх, эргэцүүлэх"
    },
    {
        "kango": {
            "text": "実現する",
            "reading": "じつげんする"
        },
        "wago": {
            "text": "叶える",
            "reading": "かなえる"
        },
        "meaning": "to realize, bring about",
        "pos": "verb",
        "meaningMn": "биелүүлэх"
    },
    {
        "kango": {
            "text": "成功する",
            "reading": "せいこうする"
        },
        "wago": {
            "text": "成し遂げる",
            "reading": "なしとげる"
        },
        "meaning": "to succeed",
        "pos": "verb",
        "meaningMn": "амжилтад хүрэх"
    },
    {
        "kango": {
            "text": "失敗する",
            "reading": "しっぱいする"
        },
        "wago": {
            "text": "しくじる",
            "reading": "しくじる"
        },
        "meaning": "to fail",
        "pos": "verb",
        "meaningMn": "бүтэлгүйтэх"
    },
    {
        "kango": {
            "text": "努力する",
            "reading": "どりょくする"
        },
        "wago": {
            "text": "励む",
            "reading": "はげむ"
        },
        "meaning": "to make an effort",
        "pos": "verb",
        "meaningMn": "хичээх"
    },
    {
        "kango": {
            "text": "断念する",
            "reading": "だんねんする"
        },
        "wago": {
            "text": "諦める",
            "reading": "あきらめる"
        },
        "meaning": "to give up",
        "pos": "verb",
        "meaningMn": "орхих"
    },
    {
        "kango": {
            "text": "解決する",
            "reading": "かいけつする"
        },
        "wago": {
            "text": "解く",
            "reading": "とく"
        },
        "meaning": "to resolve, solve",
        "pos": "verb",
        "meaningMn": "шийдвэрлэх"
    },
    {
        "kango": {
            "text": "説得する",
            "reading": "せっとくする"
        },
        "wago": {
            "text": "説き伏せる",
            "reading": "ときふせる"
        },
        "meaning": "to persuade",
        "pos": "verb",
        "meaningMn": "ятгах"
    },
    {
        "kango": {
            "text": "相談する",
            "reading": "そうだんする"
        },
        "wago": {
            "text": "話し合う",
            "reading": "はなしあう"
        },
        "meaning": "to consult, discuss",
        "pos": "verb",
        "meaningMn": "зөвлөлдөх"
    },
    {
        "kango": {
            "text": "命令する",
            "reading": "めいれいする"
        },
        "wago": {
            "text": "言いつける",
            "reading": "いいつける"
        },
        "meaning": "to order, command",
        "pos": "verb",
        "meaningMn": "тушаах, захирах"
    },
    {
        "kango": {
            "text": "依頼する",
            "reading": "いらいする"
        },
        "wago": {
            "text": "頼む",
            "reading": "たのむ"
        },
        "meaning": "to request",
        "pos": "verb",
        "meaningMn": "хүсэлт гаргах"
    },
    {
        "kango": {
            "text": "招待する",
            "reading": "しょうたいする"
        },
        "wago": {
            "text": "招く",
            "reading": "まねく"
        },
        "meaning": "to invite",
        "pos": "verb",
        "meaningMn": "урих"
    },
    {
        "kango": {
            "text": "参加する",
            "reading": "さんかする"
        },
        "wago": {
            "text": "加わる",
            "reading": "くわわる"
        },
        "meaning": "to participate",
        "pos": "verb",
        "meaningMn": "оролцох"
    },
    {
        "kango": {
            "text": "退出する",
            "reading": "たいしゅつする"
        },
        "wago": {
            "text": "退く",
            "reading": "しりぞく"
        },
        "meaning": "to leave, withdraw",
        "pos": "verb",
        "meaningMn": "гарах"
    },
    {
        "kango": {
            "text": "帰属する",
            "reading": "きぞくする"
        },
        "wago": {
            "text": "属する",
            "reading": "ぞくする"
        },
        "meaning": "to belong to",
        "pos": "verb",
        "meaningMn": "харьяалагдах"
    },
    {
        "kango": {
            "text": "所属する",
            "reading": "しょぞくする"
        },
        "wago": {
            "text": "属する",
            "reading": "ぞくする"
        },
        "meaning": "to be affiliated with",
        "pos": "verb",
        "meaningMn": "нэгдмэл байх"
    },
    {
        "kango": {
            "text": "家屋",
            "reading": "かおく"
        },
        "wago": {
            "text": "家",
            "reading": "いえ"
        },
        "meaning": "house",
        "pos": "noun",
        "meaningMn": "байшин"
    },
    {
        "kango": {
            "text": "河川",
            "reading": "かせん"
        },
        "wago": {
            "text": "川",
            "reading": "かわ"
        },
        "meaning": "river",
        "pos": "noun",
        "meaningMn": "гол"
    },
    {
        "kango": {
            "text": "山岳",
            "reading": "さんがく"
        },
        "wago": {
            "text": "山",
            "reading": "やま"
        },
        "meaning": "mountain",
        "pos": "noun",
        "meaningMn": "уул"
    },
    {
        "kango": {
            "text": "海洋",
            "reading": "かいよう"
        },
        "wago": {
            "text": "海",
            "reading": "うみ"
        },
        "meaning": "ocean",
        "pos": "noun",
        "meaningMn": "далай"
    },
    {
        "kango": {
            "text": "森林",
            "reading": "しんりん"
        },
        "wago": {
            "text": "森",
            "reading": "もり"
        },
        "meaning": "forest",
        "pos": "noun",
        "meaningMn": "ой"
    },
    {
        "kango": {
            "text": "太陽",
            "reading": "たいよう"
        },
        "wago": {
            "text": "日",
            "reading": "ひ"
        },
        "meaning": "sun",
        "pos": "noun",
        "meaningMn": "нар"
    },
    {
        "kango": {
            "text": "月光",
            "reading": "げっこう"
        },
        "wago": {
            "text": "月明かり",
            "reading": "つきあかり"
        },
        "meaning": "moonlight",
        "pos": "noun",
        "meaningMn": "сарны гэрэл"
    },
    {
        "kango": {
            "text": "降雨",
            "reading": "こうう"
        },
        "wago": {
            "text": "雨",
            "reading": "あめ"
        },
        "meaning": "rainfall",
        "pos": "noun",
        "meaningMn": "бороо"
    },
    {
        "kango": {
            "text": "降雪",
            "reading": "こうせつ"
        },
        "wago": {
            "text": "雪",
            "reading": "ゆき"
        },
        "meaning": "snowfall",
        "pos": "noun",
        "meaningMn": "цас"
    },
    {
        "kango": {
            "text": "強風",
            "reading": "きょうふう"
        },
        "wago": {
            "text": "強い風",
            "reading": "つよいかぜ"
        },
        "meaning": "strong wind",
        "pos": "noun",
        "meaningMn": "хүчтэй салхи"
    },
    {
        "kango": {
            "text": "父親",
            "reading": "ちちおや"
        },
        "wago": {
            "text": "お父さん",
            "reading": "おとうさん"
        },
        "meaning": "father",
        "pos": "noun",
        "meaningMn": "аав"
    },
    {
        "kango": {
            "text": "母親",
            "reading": "ははおや"
        },
        "wago": {
            "text": "お母さん",
            "reading": "おかあさん"
        },
        "meaning": "mother",
        "pos": "noun",
        "meaningMn": "ээж"
    },
    {
        "kango": {
            "text": "友人",
            "reading": "ゆうじん"
        },
        "wago": {
            "text": "友だち",
            "reading": "ともだち"
        },
        "meaning": "friend",
        "pos": "noun",
        "meaningMn": "найз"
    },
    {
        "kango": {
            "text": "夫婦",
            "reading": "ふうふ"
        },
        "wago": {
            "text": "めおと",
            "reading": "めおと"
        },
        "meaning": "married couple",
        "pos": "noun",
        "meaningMn": "хос (эхнэр нөхөр)"
    },
    {
        "kango": {
            "text": "子女",
            "reading": "しじょ"
        },
        "wago": {
            "text": "子ども",
            "reading": "こども"
        },
        "meaning": "children",
        "pos": "noun",
        "meaningMn": "хүүхдүүд"
    },
    {
        "kango": {
            "text": "職業",
            "reading": "しょくぎょう"
        },
        "wago": {
            "text": "仕事",
            "reading": "しごと"
        },
        "meaning": "occupation, work",
        "pos": "noun",
        "meaningMn": "ажил, мэргэжил"
    },
    {
        "kango": {
            "text": "住居",
            "reading": "じゅうきょ"
        },
        "wago": {
            "text": "住まい",
            "reading": "すまい"
        },
        "meaning": "residence",
        "pos": "noun",
        "meaningMn": "оршин суух газар"
    },
    {
        "kango": {
            "text": "食物",
            "reading": "しょくもつ"
        },
        "wago": {
            "text": "食べ物",
            "reading": "たべもの"
        },
        "meaning": "food",
        "pos": "noun",
        "meaningMn": "хоол"
    },
    {
        "kango": {
            "text": "飲料",
            "reading": "いんりょう"
        },
        "wago": {
            "text": "飲み物",
            "reading": "のみもの"
        },
        "meaning": "beverage",
        "pos": "noun",
        "meaningMn": "ундаа"
    },
    {
        "kango": {
            "text": "衣服",
            "reading": "いふく"
        },
        "wago": {
            "text": "着物",
            "reading": "きもの"
        },
        "meaning": "clothing",
        "pos": "noun",
        "meaningMn": "хувцас"
    },
    {
        "kango": {
            "text": "書物",
            "reading": "しょもつ"
        },
        "wago": {
            "text": "本",
            "reading": "ほん"
        },
        "meaning": "book",
        "pos": "noun",
        "meaningMn": "ном"
    },
    {
        "kango": {
            "text": "手紙",
            "reading": "てがみ"
        },
        "wago": {
            "text": "文",
            "reading": "ふみ"
        },
        "meaning": "letter",
        "pos": "noun",
        "meaningMn": "захидал"
    },
    {
        "kango": {
            "text": "言語",
            "reading": "げんご"
        },
        "wago": {
            "text": "言葉",
            "reading": "ことば"
        },
        "meaning": "language",
        "pos": "noun",
        "meaningMn": "хэл"
    },
    {
        "kango": {
            "text": "音声",
            "reading": "おんせい"
        },
        "wago": {
            "text": "声",
            "reading": "こえ"
        },
        "meaning": "voice, sound",
        "pos": "noun",
        "meaningMn": "дуу хоолой, чимээ"
    },
    {
        "kango": {
            "text": "笑顔",
            "reading": "えがお"
        },
        "wago": {
            "text": "笑い顔",
            "reading": "わらいがお"
        },
        "meaning": "smiling face",
        "pos": "noun",
        "meaningMn": "инээмсэглэсэн царай"
    },
    {
        "kango": {
            "text": "睡眠",
            "reading": "すいみん"
        },
        "wago": {
            "text": "眠り",
            "reading": "ねむり"
        },
        "meaning": "sleep",
        "pos": "noun",
        "meaningMn": "нойр"
    },
    {
        "kango": {
            "text": "夢想",
            "reading": "むそう"
        },
        "wago": {
            "text": "夢",
            "reading": "ゆめ"
        },
        "meaning": "dream, reverie",
        "pos": "noun",
        "meaningMn": "зүүд, мөрөөдөл"
    },
    {
        "kango": {
            "text": "希望",
            "reading": "きぼう"
        },
        "wago": {
            "text": "望み",
            "reading": "のぞみ"
        },
        "meaning": "hope",
        "pos": "noun",
        "meaningMn": "найдвар"
    },
    {
        "kango": {
            "text": "喜悦",
            "reading": "きえつ"
        },
        "wago": {
            "text": "喜び",
            "reading": "よろこび"
        },
        "meaning": "joy",
        "pos": "noun",
        "meaningMn": "баяр баясгалан"
    },
    {
        "kango": {
            "text": "悲哀",
            "reading": "ひあい"
        },
        "wago": {
            "text": "悲しみ",
            "reading": "かなしみ"
        },
        "meaning": "sorrow",
        "pos": "noun",
        "meaningMn": "уй гашуу"
    },
    {
        "kango": {
            "text": "怒気",
            "reading": "どき"
        },
        "wago": {
            "text": "怒り",
            "reading": "いかり"
        },
        "meaning": "anger",
        "pos": "noun",
        "meaningMn": "уур"
    },
    {
        "kango": {
            "text": "恐怖",
            "reading": "きょうふ"
        },
        "wago": {
            "text": "恐れ",
            "reading": "おそれ"
        },
        "meaning": "fear",
        "pos": "noun",
        "meaningMn": "айдас"
    },
    {
        "kango": {
            "text": "驚愕",
            "reading": "きょうがく"
        },
        "wago": {
            "text": "驚き",
            "reading": "おどろき"
        },
        "meaning": "astonishment",
        "pos": "noun",
        "meaningMn": "гайхшрал"
    },
    {
        "kango": {
            "text": "疲労",
            "reading": "ひろう"
        },
        "wago": {
            "text": "疲れ",
            "reading": "つかれ"
        },
        "meaning": "fatigue",
        "pos": "noun",
        "meaningMn": "ядрал"
    },
    {
        "kango": {
            "text": "空腹",
            "reading": "くうふく"
        },
        "wago": {
            "text": "腹減り",
            "reading": "はらへり"
        },
        "meaning": "hunger",
        "pos": "noun",
        "meaningMn": "өлсгөлөн"
    },
    {
        "kango": {
            "text": "渇望",
            "reading": "かつぼう"
        },
        "wago": {
            "text": "喉の渇き",
            "reading": "のどのかわき"
        },
        "meaning": "thirst",
        "pos": "noun",
        "meaningMn": "цангалт"
    },
    {
        "kango": {
            "text": "疾病",
            "reading": "しっぺい"
        },
        "wago": {
            "text": "病気",
            "reading": "びょうき"
        },
        "meaning": "illness",
        "pos": "noun",
        "meaningMn": "өвчин"
    },
    {
        "kango": {
            "text": "傷害",
            "reading": "しょうがい"
        },
        "wago": {
            "text": "けが",
            "reading": "けが"
        },
        "meaning": "injury",
        "pos": "noun",
        "meaningMn": "гэмтэл"
    },
    {
        "kango": {
            "text": "価格",
            "reading": "かかく"
        },
        "wago": {
            "text": "値段",
            "reading": "ねだん"
        },
        "meaning": "price",
        "pos": "noun",
        "meaningMn": "үнэ"
    },
    {
        "kango": {
            "text": "金銭",
            "reading": "きんせん"
        },
        "wago": {
            "text": "お金",
            "reading": "おかね"
        },
        "meaning": "money",
        "pos": "noun",
        "meaningMn": "мөнгө"
    },
    {
        "kango": {
            "text": "商店",
            "reading": "しょうてん"
        },
        "wago": {
            "text": "店",
            "reading": "みせ"
        },
        "meaning": "shop",
        "pos": "noun",
        "meaningMn": "дэлгүүр"
    },
    {
        "kango": {
            "text": "道路",
            "reading": "どうろ"
        },
        "wago": {
            "text": "道",
            "reading": "みち"
        },
        "meaning": "road",
        "pos": "noun",
        "meaningMn": "зам"
    },
    {
        "kango": {
            "text": "橋梁",
            "reading": "きょうりょう"
        },
        "wago": {
            "text": "橋",
            "reading": "はし"
        },
        "meaning": "bridge",
        "pos": "noun",
        "meaningMn": "гүүр"
    },
    {
        "kango": {
            "text": "境界",
            "reading": "きょうかい"
        },
        "wago": {
            "text": "境",
            "reading": "さかい"
        },
        "meaning": "boundary",
        "pos": "noun",
        "meaningMn": "хил, зааг"
    },
    {
        "kango": {
            "text": "始点",
            "reading": "してん"
        },
        "wago": {
            "text": "始まり",
            "reading": "はじまり"
        },
        "meaning": "starting point",
        "pos": "noun",
        "meaningMn": "эхлэл цэг"
    },
    {
        "kango": {
            "text": "終点",
            "reading": "しゅうてん"
        },
        "wago": {
            "text": "終わり",
            "reading": "おわり"
        },
        "meaning": "end point, terminus",
        "pos": "noun",
        "meaningMn": "төгсгөлийн цэг"
    },
    {
        "kango": {
            "text": "過去",
            "reading": "かこ"
        },
        "wago": {
            "text": "昔",
            "reading": "むかし"
        },
        "meaning": "the past",
        "pos": "noun",
        "meaningMn": "өнгөрсөн үе"
    },
    {
        "kango": {
            "text": "未来",
            "reading": "みらい"
        },
        "wago": {
            "text": "行く末",
            "reading": "ゆくすえ"
        },
        "meaning": "the future",
        "pos": "noun",
        "meaningMn": "ирээдүй"
    },
    {
        "kango": {
            "text": "現在",
            "reading": "げんざい"
        },
        "wago": {
            "text": "今",
            "reading": "いま"
        },
        "meaning": "the present",
        "pos": "noun",
        "meaningMn": "одоо, өнөө үе"
    },
    {
        "kango": {
            "text": "翌日",
            "reading": "よくじつ"
        },
        "wago": {
            "text": "明くる日",
            "reading": "あくるひ"
        },
        "meaning": "the next day",
        "pos": "noun",
        "meaningMn": "дараа өдөр"
    },
    {
        "kango": {
            "text": "早朝",
            "reading": "そうちょう"
        },
        "wago": {
            "text": "朝早く",
            "reading": "あさはやく"
        },
        "meaning": "early morning",
        "pos": "noun",
        "meaningMn": "өглөөний эрт"
    },
    {
        "kango": {
            "text": "深夜",
            "reading": "しんや"
        },
        "wago": {
            "text": "夜更け",
            "reading": "よふけ"
        },
        "meaning": "late at night",
        "pos": "noun",
        "meaningMn": "шөнө орой"
    },
    {
        "kango": {
            "text": "終生",
            "reading": "しゅうせい"
        },
        "wago": {
            "text": "一生",
            "reading": "いっしょう"
        },
        "meaning": "one's whole life",
        "pos": "noun",
        "meaningMn": "насан туршдаа"
    },
    {
        "kango": {
            "text": "永遠",
            "reading": "えいえん"
        },
        "wago": {
            "text": "とこしえ",
            "reading": "とこしえ"
        },
        "meaning": "eternity",
        "pos": "noun",
        "meaningMn": "мөнхийн"
    },
    {
        "kango": {
            "text": "理由",
            "reading": "りゆう"
        },
        "wago": {
            "text": "わけ",
            "reading": "わけ"
        },
        "meaning": "reason",
        "pos": "noun",
        "meaningMn": "шалтгаан"
    },
    {
        "kango": {
            "text": "方法",
            "reading": "ほうほう"
        },
        "wago": {
            "text": "やり方",
            "reading": "やりかた"
        },
        "meaning": "method",
        "pos": "noun",
        "meaningMn": "арга"
    },
    {
        "kango": {
            "text": "目的",
            "reading": "もくてき"
        },
        "wago": {
            "text": "目当て",
            "reading": "めあて"
        },
        "meaning": "purpose, goal",
        "pos": "noun",
        "meaningMn": "зорилго"
    },
    {
        "kango": {
            "text": "結果",
            "reading": "けっか"
        },
        "wago": {
            "text": "成り行き",
            "reading": "なりゆき"
        },
        "meaning": "result, outcome",
        "pos": "noun",
        "meaningMn": "үр дүн"
    },
    {
        "kango": {
            "text": "習慣",
            "reading": "しゅうかん"
        },
        "wago": {
            "text": "しきたり",
            "reading": "しきたり"
        },
        "meaning": "custom, habit",
        "pos": "noun",
        "meaningMn": "зан заншил, дадал"
    },
    {
        "kango": {
            "text": "規則",
            "reading": "きそく"
        },
        "wago": {
            "text": "決まり",
            "reading": "きまり"
        },
        "meaning": "rule",
        "pos": "noun",
        "meaningMn": "дүрэм"
    },
    {
        "kango": {
            "text": "秘密",
            "reading": "ひみつ"
        },
        "wago": {
            "text": "隠し事",
            "reading": "かくしごと"
        },
        "meaning": "secret",
        "pos": "noun",
        "meaningMn": "нууц"
    },
    {
        "kango": {
            "text": "真実",
            "reading": "しんじつ"
        },
        "wago": {
            "text": "まこと",
            "reading": "まこと"
        },
        "meaning": "truth",
        "pos": "noun",
        "meaningMn": "үнэн"
    },
    {
        "kango": {
            "text": "偽物",
            "reading": "にせもの"
        },
        "wago": {
            "text": "まがい物",
            "reading": "まがいもの"
        },
        "meaning": "fake, imitation",
        "pos": "noun",
        "meaningMn": "хуурамч, дуурайлга"
    },
    {
        "kango": {
            "text": "巨大な",
            "reading": "きょだいな"
        },
        "wago": {
            "text": "大きい",
            "reading": "おおきい"
        },
        "meaning": "huge",
        "pos": "adjective",
        "meaningMn": "асар том"
    },
    {
        "kango": {
            "text": "微小な",
            "reading": "びしょうな"
        },
        "wago": {
            "text": "小さい",
            "reading": "ちいさい"
        },
        "meaning": "tiny",
        "pos": "adjective",
        "meaningMn": "жижигхэн"
    },
    {
        "kango": {
            "text": "美麗な",
            "reading": "びれいな"
        },
        "wago": {
            "text": "美しい",
            "reading": "うつくしい"
        },
        "meaning": "beautiful",
        "pos": "adjective",
        "meaningMn": "үзэсгэлэнтэй"
    },
    {
        "kango": {
            "text": "醜悪な",
            "reading": "しゅうあくな"
        },
        "wago": {
            "text": "醜い",
            "reading": "みにくい"
        },
        "meaning": "ugly",
        "pos": "adjective",
        "meaningMn": "муухай"
    },
    {
        "kango": {
            "text": "高価な",
            "reading": "こうかな"
        },
        "wago": {
            "text": "値段が高い",
            "reading": "ねだんがたかい"
        },
        "meaning": "expensive",
        "pos": "adjective",
        "meaningMn": "үнэтэй"
    },
    {
        "kango": {
            "text": "廉価な",
            "reading": "れんかな"
        },
        "wago": {
            "text": "安い",
            "reading": "やすい"
        },
        "meaning": "cheap",
        "pos": "adjective",
        "meaningMn": "хямд"
    },
    {
        "kango": {
            "text": "重要な",
            "reading": "じゅうような"
        },
        "wago": {
            "text": "大事な",
            "reading": "だいじな"
        },
        "meaning": "important",
        "pos": "adjective",
        "meaningMn": "чухал"
    },
    {
        "kango": {
            "text": "困難な",
            "reading": "こんなんな"
        },
        "wago": {
            "text": "難しい",
            "reading": "むずかしい"
        },
        "meaning": "difficult",
        "pos": "adjective",
        "meaningMn": "хэцүү"
    },
    {
        "kango": {
            "text": "容易な",
            "reading": "よういな"
        },
        "wago": {
            "text": "易しい",
            "reading": "やさしい"
        },
        "meaning": "easy",
        "pos": "adjective",
        "meaningMn": "амархан"
    },
    {
        "kango": {
            "text": "危険な",
            "reading": "きけんな"
        },
        "wago": {
            "text": "危ない",
            "reading": "あぶない"
        },
        "meaning": "dangerous",
        "pos": "adjective",
        "meaningMn": "аюултай"
    },
    {
        "kango": {
            "text": "安全な",
            "reading": "あんぜんな"
        },
        "wago": {
            "text": "危なくない",
            "reading": "あぶなくない"
        },
        "meaning": "safe",
        "pos": "adjective",
        "meaningMn": "аюулгүй"
    },
    {
        "kango": {
            "text": "新鮮な",
            "reading": "しんせんな"
        },
        "wago": {
            "text": "新しい",
            "reading": "あたらしい"
        },
        "meaning": "fresh",
        "pos": "adjective",
        "meaningMn": "шинэхэн"
    },
    {
        "kango": {
            "text": "陳腐な",
            "reading": "ちんぷな"
        },
        "wago": {
            "text": "古臭い",
            "reading": "ふるくさい"
        },
        "meaning": "stale, trite",
        "pos": "adjective",
        "meaningMn": "хуучин, сонирхолгүй болсон"
    },
    {
        "kango": {
            "text": "迅速な",
            "reading": "じんそくな"
        },
        "wago": {
            "text": "素早い",
            "reading": "すばやい"
        },
        "meaning": "swift",
        "pos": "adjective",
        "meaningMn": "хурдан"
    },
    {
        "kango": {
            "text": "緩慢な",
            "reading": "かんまんな"
        },
        "wago": {
            "text": "遅い",
            "reading": "おそい"
        },
        "meaning": "slow, sluggish",
        "pos": "adjective",
        "meaningMn": "удаан"
    },
    {
        "kango": {
            "text": "強靭な",
            "reading": "きょうじんな"
        },
        "wago": {
            "text": "強い",
            "reading": "つよい"
        },
        "meaning": "tough, resilient",
        "pos": "adjective",
        "meaningMn": "бат бөх, тэсвэртэй"
    },
    {
        "kango": {
            "text": "脆弱な",
            "reading": "ぜいじゃくな"
        },
        "wago": {
            "text": "弱い",
            "reading": "よわい"
        },
        "meaning": "fragile, weak",
        "pos": "adjective",
        "meaningMn": "сул, эмзэг"
    },
    {
        "kango": {
            "text": "静粛な",
            "reading": "せいしゅくな"
        },
        "wago": {
            "text": "静かな",
            "reading": "しずかな"
        },
        "meaning": "quiet, hushed",
        "pos": "adjective",
        "meaningMn": "нам гүм"
    },
    {
        "kango": {
            "text": "喧噪な",
            "reading": "けんそうな"
        },
        "wago": {
            "text": "騒がしい",
            "reading": "さわがしい"
        },
        "meaning": "noisy",
        "pos": "adjective",
        "meaningMn": "чимээ шуугиантай"
    },
    {
        "kango": {
            "text": "豊富な",
            "reading": "ほうふな"
        },
        "wago": {
            "text": "多い",
            "reading": "おおい"
        },
        "meaning": "abundant",
        "pos": "adjective",
        "meaningMn": "элбэг"
    },
    {
        "kango": {
            "text": "希少な",
            "reading": "きしょうな"
        },
        "wago": {
            "text": "少ない",
            "reading": "すくない"
        },
        "meaning": "scarce, rare",
        "pos": "adjective",
        "meaningMn": "ховор"
    },
    {
        "kango": {
            "text": "多忙な",
            "reading": "たぼうな"
        },
        "wago": {
            "text": "忙しい",
            "reading": "いそがしい"
        },
        "meaning": "busy",
        "pos": "adjective",
        "meaningMn": "завгүй"
    },
    {
        "kango": {
            "text": "愉快な",
            "reading": "ゆかいな"
        },
        "wago": {
            "text": "楽しい",
            "reading": "たのしい"
        },
        "meaning": "pleasant, delightful",
        "pos": "adjective",
        "meaningMn": "тааламжтай"
    },
    {
        "kango": {
            "text": "陰鬱な",
            "reading": "いんうつな"
        },
        "wago": {
            "text": "暗い",
            "reading": "くらい"
        },
        "meaning": "gloomy",
        "pos": "adjective",
        "meaningMn": "гунигтай"
    },
    {
        "kango": {
            "text": "出席する",
            "reading": "しゅっせきする"
        },
        "wago": {
            "text": "出る",
            "reading": "でる"
        },
        "meaning": "to attend",
        "pos": "verb",
        "meaningMn": "ирэх, хүрэлцэн ирэх"
    },
    {
        "kango": {
            "text": "欠席する",
            "reading": "けっせきする"
        },
        "wago": {
            "text": "休む",
            "reading": "やすむ"
        },
        "meaning": "to be absent",
        "pos": "verb",
        "meaningMn": "тасалах"
    },
    {
        "kango": {
            "text": "発売する",
            "reading": "はつばいする"
        },
        "wago": {
            "text": "売り出す",
            "reading": "うりだす"
        },
        "meaning": "to release for sale",
        "pos": "verb",
        "meaningMn": "худалдаанд гаргах"
    },
    {
        "kango": {
            "text": "出版する",
            "reading": "しゅっぱんする"
        },
        "wago": {
            "text": "出す",
            "reading": "だす"
        },
        "meaning": "to publish",
        "pos": "verb",
        "meaningMn": "хэвлүүлэх"
    },
    {
        "kango": {
            "text": "印刷する",
            "reading": "いんさつする"
        },
        "wago": {
            "text": "刷る",
            "reading": "する"
        },
        "meaning": "to print",
        "pos": "verb",
        "meaningMn": "хэвлэх"
    },
    {
        "kango": {
            "text": "撮影する",
            "reading": "さつえいする"
        },
        "wago": {
            "text": "撮る",
            "reading": "とる"
        },
        "meaning": "to photograph",
        "pos": "verb",
        "meaningMn": "зураг авах"
    },
    {
        "kango": {
            "text": "演奏する",
            "reading": "えんそうする"
        },
        "wago": {
            "text": "奏でる",
            "reading": "かなでる"
        },
        "meaning": "to perform music",
        "pos": "verb",
        "meaningMn": "хөгжим тоглох"
    },
    {
        "kango": {
            "text": "歌唱する",
            "reading": "かしょうする"
        },
        "wago": {
            "text": "歌う",
            "reading": "うたう"
        },
        "meaning": "to sing",
        "pos": "verb",
        "meaningMn": "дуулах"
    },
    {
        "kango": {
            "text": "討論する",
            "reading": "とうろんする"
        },
        "wago": {
            "text": "言い争う",
            "reading": "いいあらそう"
        },
        "meaning": "to argue, debate",
        "pos": "verb",
        "meaningMn": "маргах"
    },
    {
        "kango": {
            "text": "反対する",
            "reading": "はんたいする"
        },
        "wago": {
            "text": "逆らう",
            "reading": "さからう"
        },
        "meaning": "to oppose",
        "pos": "verb",
        "meaningMn": "эсэргүүцэх"
    },
    {
        "kango": {
            "text": "服従する",
            "reading": "ふくじゅうする"
        },
        "wago": {
            "text": "従う",
            "reading": "したがう"
        },
        "meaning": "to obey",
        "pos": "verb",
        "meaningMn": "дуулгавартай байх"
    },
    {
        "kango": {
            "text": "支配する",
            "reading": "しはいする"
        },
        "wago": {
            "text": "治める",
            "reading": "おさめる"
        },
        "meaning": "to govern, rule",
        "pos": "verb",
        "meaningMn": "захирах, удирдах"
    },
    {
        "kango": {
            "text": "征服する",
            "reading": "せいふくする"
        },
        "wago": {
            "text": "従える",
            "reading": "したがえる"
        },
        "meaning": "to conquer",
        "pos": "verb",
        "meaningMn": "байлдан дагуулах"
    },
    {
        "kango": {
            "text": "勝利する",
            "reading": "しょうりする"
        },
        "wago": {
            "text": "勝つ",
            "reading": "かつ"
        },
        "meaning": "to win",
        "pos": "verb",
        "meaningMn": "ялах"
    },
    {
        "kango": {
            "text": "敗北する",
            "reading": "はいぼくする"
        },
        "wago": {
            "text": "負ける",
            "reading": "まける"
        },
        "meaning": "to lose",
        "pos": "verb",
        "meaningMn": "хожигдох"
    },
    {
        "kango": {
            "text": "突撃する",
            "reading": "とつげきする"
        },
        "wago": {
            "text": "攻める",
            "reading": "せめる"
        },
        "meaning": "to attack",
        "pos": "verb",
        "meaningMn": "дайрах"
    },
    {
        "kango": {
            "text": "防御する",
            "reading": "ぼうぎょする"
        },
        "wago": {
            "text": "防ぐ",
            "reading": "ふせぐ"
        },
        "meaning": "to defend",
        "pos": "verb",
        "meaningMn": "хамгаалж тэмцэх"
    },
    {
        "kango": {
            "text": "保護する",
            "reading": "ほごする"
        },
        "wago": {
            "text": "守る",
            "reading": "まもる"
        },
        "meaning": "to protect",
        "pos": "verb",
        "meaningMn": "хамгаалах"
    },
    {
        "kango": {
            "text": "損傷する",
            "reading": "そんしょうする"
        },
        "wago": {
            "text": "傷つける",
            "reading": "きずつける"
        },
        "meaning": "to damage, harm",
        "pos": "verb",
        "meaningMn": "хохироох"
    },
    {
        "kango": {
            "text": "治療する",
            "reading": "ちりょうする"
        },
        "wago": {
            "text": "治す",
            "reading": "なおす"
        },
        "meaning": "to treat, cure",
        "pos": "verb",
        "meaningMn": "эмчлэх"
    },
    {
        "kango": {
            "text": "回復する",
            "reading": "かいふくする"
        },
        "wago": {
            "text": "治る",
            "reading": "なおる"
        },
        "meaning": "to recover",
        "pos": "verb",
        "meaningMn": "сэргэх, эдгэрэх"
    },
    {
        "kango": {
            "text": "悪化する",
            "reading": "あっかする"
        },
        "wago": {
            "text": "ひどくなる",
            "reading": "ひどくなる"
        },
        "meaning": "to worsen",
        "pos": "verb",
        "meaningMn": "дордох"
    },
    {
        "kango": {
            "text": "改善する",
            "reading": "かいぜんする"
        },
        "wago": {
            "text": "良くする",
            "reading": "よくする"
        },
        "meaning": "to improve",
        "pos": "verb",
        "meaningMn": "сайжрах"
    },
    {
        "kango": {
            "text": "向上する",
            "reading": "こうじょうする"
        },
        "wago": {
            "text": "上がる",
            "reading": "あがる"
        },
        "meaning": "to improve, rise (skill)",
        "pos": "verb",
        "meaningMn": "дэвших, ур чадвар нэмэгдэх"
    },
    {
        "kango": {
            "text": "増大する",
            "reading": "ぞうだいする"
        },
        "wago": {
            "text": "増す",
            "reading": "ます"
        },
        "meaning": "to grow, increase",
        "pos": "verb",
        "meaningMn": "өсөх"
    },
    {
        "kango": {
            "text": "縮小する",
            "reading": "しゅくしょうする"
        },
        "wago": {
            "text": "縮む",
            "reading": "ちぢむ"
        },
        "meaning": "to shrink",
        "pos": "verb",
        "meaningMn": "агших, буурах"
    },
    {
        "kango": {
            "text": "拡大する",
            "reading": "かくだいする"
        },
        "wago": {
            "text": "広がる",
            "reading": "ひろがる"
        },
        "meaning": "to expand",
        "pos": "verb",
        "meaningMn": "тэлэх"
    },
    {
        "kango": {
            "text": "拡張する",
            "reading": "かくちょうする"
        },
        "wago": {
            "text": "広げる",
            "reading": "ひろげる"
        },
        "meaning": "to extend, broaden",
        "pos": "verb",
        "meaningMn": "өргөжүүлэх"
    },
    {
        "kango": {
            "text": "短縮する",
            "reading": "たんしゅくする"
        },
        "wago": {
            "text": "縮める",
            "reading": "ちぢめる"
        },
        "meaning": "to shorten",
        "pos": "verb",
        "meaningMn": "богиносгох"
    },
    {
        "kango": {
            "text": "延長する",
            "reading": "えんちょうする"
        },
        "wago": {
            "text": "伸ばす",
            "reading": "のばす"
        },
        "meaning": "to extend, lengthen",
        "pos": "verb",
        "meaningMn": "уртасгах"
    },
    {
        "kango": {
            "text": "到達する",
            "reading": "とうたつする"
        },
        "wago": {
            "text": "たどり着く",
            "reading": "たどりつく"
        },
        "meaning": "to reach, arrive at",
        "pos": "verb",
        "meaningMn": "хүрэх"
    },
    {
        "kango": {
            "text": "通過する",
            "reading": "つうかする"
        },
        "wago": {
            "text": "通る",
            "reading": "とおる"
        },
        "meaning": "to pass through",
        "pos": "verb",
        "meaningMn": "дамжин өнгөрөх"
    },
    {
        "kango": {
            "text": "横断する",
            "reading": "おうだんする"
        },
        "wago": {
            "text": "渡る",
            "reading": "わたる"
        },
        "meaning": "to cross",
        "pos": "verb",
        "meaningMn": "гаталах"
    },
    {
        "kango": {
            "text": "乗車する",
            "reading": "じょうしゃする"
        },
        "wago": {
            "text": "乗る",
            "reading": "のる"
        },
        "meaning": "to board, ride",
        "pos": "verb",
        "meaningMn": "суух (унаанд)"
    },
    {
        "kango": {
            "text": "下車する",
            "reading": "げしゃする"
        },
        "wago": {
            "text": "降りる",
            "reading": "おりる"
        },
        "meaning": "to get off",
        "pos": "verb",
        "meaningMn": "буух"
    },
    {
        "kango": {
            "text": "操縦する",
            "reading": "そうじゅうする"
        },
        "wago": {
            "text": "操る",
            "reading": "あやつる"
        },
        "meaning": "to pilot, operate",
        "pos": "verb",
        "meaningMn": "жолоодох, ажиллуулах"
    },
    {
        "kango": {
            "text": "運搬する",
            "reading": "うんぱんする"
        },
        "wago": {
            "text": "運ぶ",
            "reading": "はこぶ"
        },
        "meaning": "to carry, transport",
        "pos": "verb",
        "meaningMn": "тээвэрлэх"
    },
    {
        "kango": {
            "text": "出産する",
            "reading": "しゅっさんする"
        },
        "wago": {
            "text": "産む",
            "reading": "うむ"
        },
        "meaning": "to give birth",
        "pos": "verb",
        "meaningMn": "төрүүлэх"
    },
    {
        "kango": {
            "text": "育成する",
            "reading": "いくせいする"
        },
        "wago": {
            "text": "育てる",
            "reading": "そだてる"
        },
        "meaning": "to raise, nurture",
        "pos": "verb",
        "meaningMn": "өсгөх"
    },
    {
        "kango": {
            "text": "成長する",
            "reading": "せいちょうする"
        },
        "wago": {
            "text": "育つ",
            "reading": "そだつ"
        },
        "meaning": "to grow up",
        "pos": "verb",
        "meaningMn": "өсч том болох"
    },
    {
        "kango": {
            "text": "老化する",
            "reading": "ろうかする"
        },
        "wago": {
            "text": "老いる",
            "reading": "おいる"
        },
        "meaning": "to age",
        "pos": "verb",
        "meaningMn": "хөгших"
    },
    {
        "kango": {
            "text": "埋葬する",
            "reading": "まいそうする"
        },
        "wago": {
            "text": "葬る",
            "reading": "ほうむる"
        },
        "meaning": "to bury",
        "pos": "verb",
        "meaningMn": "оршуулах"
    },
    {
        "kango": {
            "text": "料理する",
            "reading": "りょうりする"
        },
        "wago": {
            "text": "作る",
            "reading": "つくる"
        },
        "meaning": "to cook",
        "pos": "verb",
        "meaningMn": "хоол хийх"
    },
    {
        "kango": {
            "text": "収穫する",
            "reading": "しゅうかくする"
        },
        "wago": {
            "text": "取り入れる",
            "reading": "とりいれる"
        },
        "meaning": "to harvest",
        "pos": "verb",
        "meaningMn": "хураах"
    },
    {
        "kango": {
            "text": "栽培する",
            "reading": "さいばいする"
        },
        "wago": {
            "text": "育てる",
            "reading": "そだてる"
        },
        "meaning": "to cultivate (plants)",
        "pos": "verb",
        "meaningMn": "тарималжуулах"
    },
    {
        "kango": {
            "text": "耕作する",
            "reading": "こうさくする"
        },
        "wago": {
            "text": "耕す",
            "reading": "たがやす"
        },
        "meaning": "to till, cultivate",
        "pos": "verb",
        "meaningMn": "тариалах, хагалах"
    },
    {
        "kango": {
            "text": "収納する",
            "reading": "しゅうのうする"
        },
        "wago": {
            "text": "しまう",
            "reading": "しまう"
        },
        "meaning": "to put away, store",
        "pos": "verb",
        "meaningMn": "хадгалах"
    },
    {
        "kango": {
            "text": "貯蔵する",
            "reading": "ちょぞうする"
        },
        "wago": {
            "text": "蓄える",
            "reading": "たくわえる"
        },
        "meaning": "to store up",
        "pos": "verb",
        "meaningMn": "хуримтлуулах"
    },
    {
        "kango": {
            "text": "浪費する",
            "reading": "ろうひする"
        },
        "wago": {
            "text": "使い果たす",
            "reading": "つかいはたす"
        },
        "meaning": "to squander",
        "pos": "verb",
        "meaningMn": "үрэх, дэмий үрэгдүүлэх"
    },
    {
        "kango": {
            "text": "貯金する",
            "reading": "ちょきんする"
        },
        "wago": {
            "text": "たくわえる",
            "reading": "たくわえる"
        },
        "meaning": "to save money",
        "pos": "verb",
        "meaningMn": "мөнгө хуримтлуулах"
    },
    {
        "kango": {
            "text": "帰国する",
            "reading": "きこくする"
        },
        "wago": {
            "text": "帰る",
            "reading": "かえる"
        },
        "meaning": "to return to one's country",
        "pos": "verb",
        "meaningMn": "эх орондоо буцах"
    },
    {
        "kango": {
            "text": "凝視する",
            "reading": "ぎょうしする"
        },
        "wago": {
            "text": "見つめる",
            "reading": "みつめる"
        },
        "meaning": "to stare at",
        "pos": "verb",
        "meaningMn": "ширтэх"
    },
    {
        "kango": {
            "text": "反省する",
            "reading": "はんせいする"
        },
        "wago": {
            "text": "振り返る",
            "reading": "ふりかえる"
        },
        "meaning": "to reflect on, reconsider",
        "pos": "verb",
        "meaningMn": "эргэцүүлэх"
    },
    {
        "kango": {
            "text": "懐疑する",
            "reading": "かいぎする"
        },
        "wago": {
            "text": "疑う",
            "reading": "うたがう"
        },
        "meaning": "to doubt",
        "pos": "verb",
        "meaningMn": "эргэлзэх"
    },
    {
        "kango": {
            "text": "信用する",
            "reading": "しんようする"
        },
        "wago": {
            "text": "信じる",
            "reading": "しんじる"
        },
        "meaning": "to trust, believe",
        "pos": "verb",
        "meaningMn": "итгэх"
    },
    {
        "kango": {
            "text": "尊敬する",
            "reading": "そんけいする"
        },
        "wago": {
            "text": "敬う",
            "reading": "うやまう"
        },
        "meaning": "to respect",
        "pos": "verb",
        "meaningMn": "хүндэтгэх"
    },
    {
        "kango": {
            "text": "軽蔑する",
            "reading": "けいべつする"
        },
        "wago": {
            "text": "見下す",
            "reading": "みくだす"
        },
        "meaning": "to despise, look down on",
        "pos": "verb",
        "meaningMn": "басамжлах"
    },
    {
        "kango": {
            "text": "愛好する",
            "reading": "あいこうする"
        },
        "wago": {
            "text": "好む",
            "reading": "このむ"
        },
        "meaning": "to like, be fond of",
        "pos": "verb",
        "meaningMn": "дуртай байх"
    },
    {
        "kango": {
            "text": "嫌悪する",
            "reading": "けんおする"
        },
        "wago": {
            "text": "嫌う",
            "reading": "きらう"
        },
        "meaning": "to hate, dislike",
        "pos": "verb",
        "meaningMn": "үзэн ядах, дургүй байх"
    },
    {
        "kango": {
            "text": "満足する",
            "reading": "まんぞくする"
        },
        "wago": {
            "text": "満ち足りる",
            "reading": "みちたりる"
        },
        "meaning": "to be satisfied",
        "pos": "verb",
        "meaningMn": "сэтгэл ханах"
    },
    {
        "kango": {
            "text": "落胆する",
            "reading": "らくたんする"
        },
        "wago": {
            "text": "がっかりする",
            "reading": "がっかりする"
        },
        "meaning": "to be discouraged",
        "pos": "verb",
        "meaningMn": "урам хугарах"
    },
    {
        "kango": {
            "text": "尊重する",
            "reading": "そんちょうする"
        },
        "wago": {
            "text": "重んじる",
            "reading": "おもんじる"
        },
        "meaning": "to value, respect",
        "pos": "verb",
        "meaningMn": "үнэлэх, эрхэмлэх"
    },
    {
        "kango": {
            "text": "軽視する",
            "reading": "けいしする"
        },
        "wago": {
            "text": "侮る",
            "reading": "あなどる"
        },
        "meaning": "to make light of",
        "pos": "verb",
        "meaningMn": "үл тоомсорлох"
    },
    {
        "kango": {
            "text": "応答する",
            "reading": "おうとうする"
        },
        "wago": {
            "text": "答える",
            "reading": "こたえる"
        },
        "meaning": "to answer, respond",
        "pos": "verb",
        "meaningMn": "хариулах"
    },
    {
        "kango": {
            "text": "質問する",
            "reading": "しつもんする"
        },
        "wago": {
            "text": "尋ねる",
            "reading": "たずねる"
        },
        "meaning": "to ask a question",
        "pos": "verb",
        "meaningMn": "асуулт асуух"
    },
    {
        "kango": {
            "text": "承認する",
            "reading": "しょうにんする"
        },
        "wago": {
            "text": "認める",
            "reading": "みとめる"
        },
        "meaning": "to approve, acknowledge",
        "pos": "verb",
        "meaningMn": "хүлээн зөвшөөрөх"
    },
    {
        "kango": {
            "text": "主張する",
            "reading": "しゅちょうする"
        },
        "wago": {
            "text": "言い張る",
            "reading": "いいはる"
        },
        "meaning": "to assert, insist",
        "pos": "verb",
        "meaningMn": "шаардах, батлан хэлэх"
    },
    {
        "kango": {
            "text": "断言する",
            "reading": "だんげんする"
        },
        "wago": {
            "text": "言い切る",
            "reading": "いいきる"
        },
        "meaning": "to declare firmly",
        "pos": "verb",
        "meaningMn": "тодорхой мэдэгдэх"
    },
    {
        "kango": {
            "text": "否定する",
            "reading": "ひていする"
        },
        "wago": {
            "text": "打ち消す",
            "reading": "うちけす"
        },
        "meaning": "to deny",
        "pos": "verb",
        "meaningMn": "үгүйсгэх"
    },
    {
        "kango": {
            "text": "妥協する",
            "reading": "だきょうする"
        },
        "wago": {
            "text": "譲る",
            "reading": "ゆずる"
        },
        "meaning": "to compromise, yield",
        "pos": "verb",
        "meaningMn": "буулт хийх"
    },
    {
        "kango": {
            "text": "交渉する",
            "reading": "こうしょうする"
        },
        "wago": {
            "text": "掛け合う",
            "reading": "かけあう"
        },
        "meaning": "to negotiate",
        "pos": "verb",
        "meaningMn": "хэлэлцээр хийх"
    },
    {
        "kango": {
            "text": "提示する",
            "reading": "ていじする"
        },
        "wago": {
            "text": "見せる",
            "reading": "みせる"
        },
        "meaning": "to show, present",
        "pos": "verb",
        "honorific": {
            "kenjougo": {
                "text": "ご覧に入れる",
                "reading": "ごらんにいれる"
            }
        },
        "meaningMn": "үзүүлэх"
    },
    {
        "kango": {
            "text": "祖父",
            "reading": "そふ"
        },
        "wago": {
            "text": "おじいさん",
            "reading": "おじいさん"
        },
        "meaning": "grandfather",
        "pos": "noun",
        "meaningMn": "өвөө"
    },
    {
        "kango": {
            "text": "祖母",
            "reading": "そぼ"
        },
        "wago": {
            "text": "おばあさん",
            "reading": "おばあさん"
        },
        "meaning": "grandmother",
        "pos": "noun",
        "meaningMn": "эмээ"
    },
    {
        "kango": {
            "text": "親戚",
            "reading": "しんせき"
        },
        "wago": {
            "text": "身内",
            "reading": "みうち"
        },
        "meaning": "relatives",
        "pos": "noun",
        "meaningMn": "төрөл садан"
    },
    {
        "kango": {
            "text": "隣人",
            "reading": "りんじん"
        },
        "wago": {
            "text": "隣の人",
            "reading": "となりのひと"
        },
        "meaning": "neighbor",
        "pos": "noun",
        "meaningMn": "хөрш"
    },
    {
        "kango": {
            "text": "主人",
            "reading": "しゅじん"
        },
        "wago": {
            "text": "あるじ",
            "reading": "あるじ"
        },
        "meaning": "master, husband",
        "pos": "noun",
        "meaningMn": "эзэн, нөхөр"
    },
    {
        "kango": {
            "text": "従業員",
            "reading": "じゅうぎょういん"
        },
        "wago": {
            "text": "働き手",
            "reading": "はたらきて"
        },
        "meaning": "employee",
        "pos": "noun",
        "meaningMn": "ажилтан"
    },
    {
        "kango": {
            "text": "天候",
            "reading": "てんこう"
        },
        "wago": {
            "text": "空模様",
            "reading": "そらもよう"
        },
        "meaning": "weather",
        "pos": "noun",
        "meaningMn": "цаг агаар"
    },
    {
        "kango": {
            "text": "朝食",
            "reading": "ちょうしょく"
        },
        "wago": {
            "text": "朝ご飯",
            "reading": "あさごはん"
        },
        "meaning": "breakfast",
        "pos": "noun",
        "meaningMn": "өглөөний хоол"
    },
    {
        "kango": {
            "text": "昼食",
            "reading": "ちゅうしょく"
        },
        "wago": {
            "text": "昼ご飯",
            "reading": "ひるごはん"
        },
        "meaning": "lunch",
        "pos": "noun",
        "meaningMn": "өдрийн хоол"
    },
    {
        "kango": {
            "text": "夕食",
            "reading": "ゆうしょく"
        },
        "wago": {
            "text": "晩ご飯",
            "reading": "ばんごはん"
        },
        "meaning": "dinner",
        "pos": "noun",
        "meaningMn": "оройн хоол"
    },
    {
        "kango": {
            "text": "塩分",
            "reading": "えんぶん"
        },
        "wago": {
            "text": "塩気",
            "reading": "しおけ"
        },
        "meaning": "saltiness",
        "pos": "noun",
        "meaningMn": "давслаг"
    },
    {
        "kango": {
            "text": "甘味",
            "reading": "かんみ"
        },
        "wago": {
            "text": "甘さ",
            "reading": "あまさ"
        },
        "meaning": "sweetness",
        "pos": "noun",
        "meaningMn": "амттан, чихэрлэг"
    },
    {
        "kango": {
            "text": "苦味",
            "reading": "くみ"
        },
        "wago": {
            "text": "苦さ",
            "reading": "にがさ"
        },
        "meaning": "bitterness",
        "pos": "noun",
        "meaningMn": "гашуун"
    },
    {
        "kango": {
            "text": "酸味",
            "reading": "さんみ"
        },
        "wago": {
            "text": "酸っぱさ",
            "reading": "すっぱさ"
        },
        "meaning": "sourness",
        "pos": "noun",
        "meaningMn": "хүчиллэг"
    },
    {
        "kango": {
            "text": "香気",
            "reading": "こうき"
        },
        "wago": {
            "text": "香り",
            "reading": "かおり"
        },
        "meaning": "fragrance",
        "pos": "noun",
        "meaningMn": "сайхан үнэр"
    },
    {
        "kango": {
            "text": "臭気",
            "reading": "しゅうき"
        },
        "wago": {
            "text": "におい",
            "reading": "におい"
        },
        "meaning": "odor, smell",
        "pos": "noun",
        "meaningMn": "үнэр"
    },
    {
        "kango": {
            "text": "色彩",
            "reading": "しきさい"
        },
        "wago": {
            "text": "色",
            "reading": "いろ"
        },
        "meaning": "color",
        "pos": "noun",
        "meaningMn": "өнгө"
    },
    {
        "kango": {
            "text": "形状",
            "reading": "けいじょう"
        },
        "wago": {
            "text": "形",
            "reading": "かたち"
        },
        "meaning": "shape",
        "pos": "noun",
        "meaningMn": "хэлбэр"
    },
    {
        "kango": {
            "text": "寸法",
            "reading": "すんぽう"
        },
        "wago": {
            "text": "大きさ",
            "reading": "おおきさ"
        },
        "meaning": "measurements, dimensions",
        "pos": "noun",
        "meaningMn": "хэмжээ"
    },
    {
        "kango": {
            "text": "重量",
            "reading": "じゅうりょう"
        },
        "wago": {
            "text": "重さ",
            "reading": "おもさ"
        },
        "meaning": "weight",
        "pos": "noun",
        "meaningMn": "жин"
    },
    {
        "kango": {
            "text": "速度",
            "reading": "そくど"
        },
        "wago": {
            "text": "速さ",
            "reading": "はやさ"
        },
        "meaning": "speed",
        "pos": "noun",
        "meaningMn": "хурд"
    },
    {
        "kango": {
            "text": "面積",
            "reading": "めんせき"
        },
        "wago": {
            "text": "広さ",
            "reading": "ひろさ"
        },
        "meaning": "area",
        "pos": "noun",
        "meaningMn": "талбай"
    },
    {
        "kango": {
            "text": "経過",
            "reading": "けいか"
        },
        "wago": {
            "text": "成り行き",
            "reading": "なりゆき"
        },
        "meaning": "course of events, progress",
        "pos": "noun",
        "meaningMn": "явц"
    },
    {
        "kango": {
            "text": "状況",
            "reading": "じょうきょう"
        },
        "wago": {
            "text": "様子",
            "reading": "ようす"
        },
        "meaning": "situation, circumstances",
        "pos": "noun",
        "meaningMn": "нөхцөл байдал"
    },
    {
        "kango": {
            "text": "状態",
            "reading": "じょうたい"
        },
        "wago": {
            "text": "有様",
            "reading": "ありさま"
        },
        "meaning": "state, condition",
        "pos": "noun",
        "meaningMn": "байдал"
    },
    {
        "kango": {
            "text": "性質",
            "reading": "せいしつ"
        },
        "wago": {
            "text": "たち",
            "reading": "たち"
        },
        "meaning": "nature, disposition",
        "pos": "noun",
        "meaningMn": "зан чанар"
    },
    {
        "kango": {
            "text": "性格",
            "reading": "せいかく"
        },
        "wago": {
            "text": "人柄",
            "reading": "ひとがら"
        },
        "meaning": "personality",
        "pos": "noun",
        "meaningMn": "зан төлөв"
    },
    {
        "kango": {
            "text": "容貌",
            "reading": "ようぼう"
        },
        "wago": {
            "text": "顔立ち",
            "reading": "かおだち"
        },
        "meaning": "appearance, looks",
        "pos": "noun",
        "meaningMn": "төрх байдал"
    },
    {
        "kango": {
            "text": "体格",
            "reading": "たいかく"
        },
        "wago": {
            "text": "体つき",
            "reading": "からだつき"
        },
        "meaning": "physique",
        "pos": "noun",
        "meaningMn": "биеийн бүтэц"
    },
    {
        "kango": {
            "text": "天分",
            "reading": "てんぶん"
        },
        "wago": {
            "text": "生まれつき",
            "reading": "うまれつき"
        },
        "meaning": "natural gift",
        "pos": "noun",
        "meaningMn": "байгалиас заяасан авьяас"
    },
    {
        "kango": {
            "text": "感情",
            "reading": "かんじょう"
        },
        "wago": {
            "text": "気持ち",
            "reading": "きもち"
        },
        "meaning": "emotion, feeling",
        "pos": "noun",
        "meaningMn": "сэтгэл хөдлөл"
    },
    {
        "kango": {
            "text": "感覚",
            "reading": "かんかく"
        },
        "wago": {
            "text": "心地",
            "reading": "ここち"
        },
        "meaning": "sensation, feeling",
        "pos": "noun",
        "meaningMn": "мэдрэмж"
    },
    {
        "kango": {
            "text": "始業",
            "reading": "しぎょう"
        },
        "wago": {
            "text": "仕事始め",
            "reading": "しごとはじめ"
        },
        "meaning": "start of work/business",
        "pos": "noun",
        "meaningMn": "ажил/бизнес эхлэх"
    },
    {
        "kango": {
            "text": "余暇",
            "reading": "よか"
        },
        "wago": {
            "text": "暇な時間",
            "reading": "ひまなじかん"
        },
        "meaning": "leisure time",
        "pos": "noun",
        "meaningMn": "амралтын цаг"
    },
    {
        "kango": {
            "text": "収入",
            "reading": "しゅうにゅう"
        },
        "wago": {
            "text": "実入り",
            "reading": "みいり"
        },
        "meaning": "income",
        "pos": "noun",
        "meaningMn": "орлого"
    },
    {
        "kango": {
            "text": "利益",
            "reading": "りえき"
        },
        "wago": {
            "text": "もうけ",
            "reading": "もうけ"
        },
        "meaning": "profit",
        "pos": "noun",
        "meaningMn": "ашиг"
    },
    {
        "kango": {
            "text": "損失",
            "reading": "そんしつ"
        },
        "wago": {
            "text": "損",
            "reading": "そん"
        },
        "meaning": "loss",
        "pos": "noun",
        "meaningMn": "алдагдал"
    },
    {
        "kango": {
            "text": "負債",
            "reading": "ふさい"
        },
        "wago": {
            "text": "借り",
            "reading": "かり"
        },
        "meaning": "debt",
        "pos": "noun",
        "meaningMn": "өр"
    },
    {
        "kango": {
            "text": "温暖な",
            "reading": "おんだんな"
        },
        "wago": {
            "text": "暖かい",
            "reading": "あたたかい"
        },
        "meaning": "warm (climate)",
        "pos": "adjective",
        "meaningMn": "дулаан"
    },
    {
        "kango": {
            "text": "寒冷な",
            "reading": "かんれいな"
        },
        "wago": {
            "text": "寒い",
            "reading": "さむい"
        },
        "meaning": "cold",
        "pos": "adjective",
        "meaningMn": "хүйтэн"
    },
    {
        "kango": {
            "text": "清潔な",
            "reading": "せいけつな"
        },
        "wago": {
            "text": "きれいな",
            "reading": "きれいな"
        },
        "meaning": "clean",
        "pos": "adjective",
        "meaningMn": "цэвэр"
    },
    {
        "kango": {
            "text": "不潔な",
            "reading": "ふけつな"
        },
        "wago": {
            "text": "汚い",
            "reading": "きたない"
        },
        "meaning": "dirty, unclean",
        "pos": "adjective",
        "meaningMn": "бохир"
    },
    {
        "kango": {
            "text": "明瞭な",
            "reading": "めいりょうな"
        },
        "wago": {
            "text": "はっきりした",
            "reading": "はっきりした"
        },
        "meaning": "clear, distinct",
        "pos": "adjective",
        "meaningMn": "тодорхой"
    },
    {
        "kango": {
            "text": "曖昧な",
            "reading": "あいまいな"
        },
        "wago": {
            "text": "あやふやな",
            "reading": "あやふやな"
        },
        "meaning": "vague, ambiguous",
        "pos": "adjective",
        "meaningMn": "тодорхой бус"
    },
    {
        "kango": {
            "text": "複雑な",
            "reading": "ふくざつな"
        },
        "wago": {
            "text": "込み入った",
            "reading": "こみいった"
        },
        "meaning": "complicated",
        "pos": "adjective",
        "meaningMn": "нарийн төвөгтэй"
    },
    {
        "kango": {
            "text": "正確な",
            "reading": "せいかくな"
        },
        "wago": {
            "text": "正しい",
            "reading": "ただしい"
        },
        "meaning": "accurate, correct",
        "pos": "adjective",
        "meaningMn": "зөв, нарийвчлалтай"
    },
    {
        "kango": {
            "text": "不正確な",
            "reading": "ふせいかくな"
        },
        "wago": {
            "text": "間違った",
            "reading": "まちがった"
        },
        "meaning": "inaccurate",
        "pos": "adjective",
        "meaningMn": "буруу, нарийвчлалгүй"
    },
    {
        "kango": {
            "text": "完全な",
            "reading": "かんぜんな"
        },
        "wago": {
            "text": "申し分ない",
            "reading": "もうしぶんない"
        },
        "meaning": "perfect, flawless",
        "pos": "adjective",
        "meaningMn": "төгс"
    },
    {
        "kango": {
            "text": "不完全な",
            "reading": "ふかんぜんな"
        },
        "wago": {
            "text": "足りない",
            "reading": "たりない"
        },
        "meaning": "incomplete",
        "pos": "adjective",
        "meaningMn": "төгс бус, дутуу"
    },
    {
        "kango": {
            "text": "十分な",
            "reading": "じゅうぶんな"
        },
        "wago": {
            "text": "たっぷりな",
            "reading": "たっぷりな"
        },
        "meaning": "sufficient, ample",
        "pos": "adjective",
        "meaningMn": "хангалттай"
    },
    {
        "kango": {
            "text": "適切な",
            "reading": "てきせつな"
        },
        "wago": {
            "text": "ふさわしい",
            "reading": "ふさわしい"
        },
        "meaning": "appropriate, fitting",
        "pos": "adjective",
        "meaningMn": "тохиромжтой"
    },
    {
        "kango": {
            "text": "不適切な",
            "reading": "ふてきせつな"
        },
        "wago": {
            "text": "ふさわしくない",
            "reading": "ふさわしくない"
        },
        "meaning": "inappropriate",
        "pos": "adjective",
        "meaningMn": "тохиромжгүй"
    },
    {
        "kango": {
            "text": "正常な",
            "reading": "せいじょうな"
        },
        "wago": {
            "text": "普通の",
            "reading": "ふつうの"
        },
        "meaning": "normal",
        "pos": "adjective",
        "meaningMn": "хэвийн"
    },
    {
        "kango": {
            "text": "異常な",
            "reading": "いじょうな"
        },
        "wago": {
            "text": "おかしな",
            "reading": "おかしな"
        },
        "meaning": "abnormal, strange",
        "pos": "adjective",
        "meaningMn": "хэвийн бус"
    },
    {
        "kango": {
            "text": "特殊な",
            "reading": "とくしゅな"
        },
        "wago": {
            "text": "変わった",
            "reading": "かわった"
        },
        "meaning": "unusual, peculiar",
        "pos": "adjective",
        "meaningMn": "ер бусын"
    },
    {
        "kango": {
            "text": "個別の",
            "reading": "こべつの"
        },
        "wago": {
            "text": "それぞれの",
            "reading": "それぞれの"
        },
        "meaning": "individual, respective",
        "pos": "adjective",
        "meaningMn": "тус тусын"
    },
    {
        "kango": {
            "text": "平凡な",
            "reading": "へいぼんな"
        },
        "wago": {
            "text": "ありふれた",
            "reading": "ありふれた"
        },
        "meaning": "mundane, ordinary",
        "pos": "adjective",
        "meaningMn": "энгийн"
    },
    {
        "kango": {
            "text": "非凡な",
            "reading": "ひぼんな"
        },
        "wago": {
            "text": "並外れた",
            "reading": "なみはずれた"
        },
        "meaning": "extraordinary",
        "pos": "adjective",
        "meaningMn": "онцгой"
    },
    {
        "kango": {
            "text": "優秀な",
            "reading": "ゆうしゅうな"
        },
        "wago": {
            "text": "優れた",
            "reading": "すぐれた"
        },
        "meaning": "excellent, superior",
        "pos": "adjective",
        "meaningMn": "шилдэг"
    },
    {
        "kango": {
            "text": "劣悪な",
            "reading": "れつあくな"
        },
        "wago": {
            "text": "ひどい",
            "reading": "ひどい"
        },
        "meaning": "terrible, poor quality",
        "pos": "adjective",
        "meaningMn": "муу чанартай"
    },
    {
        "kango": {
            "text": "有益な",
            "reading": "ゆうえきな"
        },
        "wago": {
            "text": "ためになる",
            "reading": "ためになる"
        },
        "meaning": "beneficial, useful",
        "pos": "adjective",
        "meaningMn": "ашигтай"
    },
    {
        "kango": {
            "text": "無益な",
            "reading": "むえきな"
        },
        "wago": {
            "text": "無駄な",
            "reading": "むだな"
        },
        "meaning": "useless, futile",
        "pos": "adjective",
        "meaningMn": "дэмий, ашиггүй"
    },
    {
        "kango": {
            "text": "温和な",
            "reading": "おんわな"
        },
        "wago": {
            "text": "穏やかな",
            "reading": "おだやかな"
        },
        "meaning": "gentle, mild-mannered",
        "pos": "adjective",
        "meaningMn": "дөлгөөн"
    },
    {
        "kango": {
            "text": "乱暴な",
            "reading": "らんぼうな"
        },
        "wago": {
            "text": "荒っぽい",
            "reading": "あらっぽい"
        },
        "meaning": "rough, violent",
        "pos": "adjective",
        "meaningMn": "ширүүн"
    },
    {
        "kango": {
            "text": "勇敢な",
            "reading": "ゆうかんな"
        },
        "wago": {
            "text": "勇ましい",
            "reading": "いさましい"
        },
        "meaning": "brave",
        "pos": "adjective",
        "meaningMn": "зоригтой"
    },
    {
        "kango": {
            "text": "臆病な",
            "reading": "おくびょうな"
        },
        "wago": {
            "text": "気が小さい",
            "reading": "きがちいさい"
        },
        "meaning": "faint-hearted, cowardly",
        "pos": "adjective",
        "meaningMn": "цайрдаг, зоригүй"
    },
    {
        "kango": {
            "text": "誠実な",
            "reading": "せいじつな"
        },
        "wago": {
            "text": "まじめな",
            "reading": "まじめな"
        },
        "meaning": "sincere, earnest",
        "pos": "adjective",
        "meaningMn": "чин сэтгэлтэй"
    },
    {
        "kango": {
            "text": "不誠実な",
            "reading": "ふせいじつな"
        },
        "wago": {
            "text": "ずるい",
            "reading": "ずるい"
        },
        "meaning": "insincere, sly",
        "pos": "adjective",
        "meaningMn": "хуурамч, зальтай"
    },
    {
        "kango": {
            "text": "頑固な",
            "reading": "がんこな"
        },
        "wago": {
            "text": "かたくなな",
            "reading": "かたくなな"
        },
        "meaning": "stubborn",
        "pos": "adjective",
        "meaningMn": "зөрүүд"
    },
    {
        "kango": {
            "text": "柔軟な",
            "reading": "じゅうなんな"
        },
        "wago": {
            "text": "しなやかな",
            "reading": "しなやかな"
        },
        "meaning": "flexible, supple",
        "pos": "adjective",
        "meaningMn": "уян хатан"
    },
    {
        "kango": {
            "text": "冷静な",
            "reading": "れいせいな"
        },
        "wago": {
            "text": "落ち着いた",
            "reading": "おちついた"
        },
        "meaning": "calm, composed",
        "pos": "adjective",
        "meaningMn": "тайван"
    },
    {
        "kango": {
            "text": "開放する",
            "reading": "かいほうする"
        },
        "wago": {
            "text": "開く",
            "reading": "ひらく"
        },
        "meaning": "to open",
        "pos": "verb",
        "meaningMn": "нээх"
    },
    {
        "kango": {
            "text": "抱擁する",
            "reading": "ほうようする"
        },
        "wago": {
            "text": "抱く",
            "reading": "いだく"
        },
        "meaning": "to hold in one's arms",
        "pos": "verb",
        "meaningMn": "тэвэрч авах"
    },
    {
        "kango": {
            "text": "打撲する",
            "reading": "だぼくする"
        },
        "wago": {
            "text": "打つ",
            "reading": "うつ"
        },
        "meaning": "to hit",
        "pos": "verb",
        "meaningMn": "цохих"
    },
    {
        "kango": {
            "text": "飛躍する",
            "reading": "ひやくする"
        },
        "wago": {
            "text": "飛ぶ",
            "reading": "とぶ"
        },
        "meaning": "to jump",
        "pos": "verb",
        "meaningMn": "үсрэх"
    },
    {
        "kango": {
            "text": "貼付する",
            "reading": "ちょうふする"
        },
        "wago": {
            "text": "付ける",
            "reading": "つける"
        },
        "meaning": "to attach",
        "pos": "verb",
        "meaningMn": "наах, хавсаргах"
    },
    {
        "kango": {
            "text": "滑走する",
            "reading": "かっそうする"
        },
        "wago": {
            "text": "滑る",
            "reading": "すべる"
        },
        "meaning": "to slide",
        "pos": "verb",
        "meaningMn": "гулгах"
    },
    {
        "kango": {
            "text": "号泣する",
            "reading": "ごうきゅうする"
        },
        "wago": {
            "text": "泣く",
            "reading": "なく"
        },
        "meaning": "to cry",
        "pos": "verb",
        "meaningMn": "уйлах"
    },
    {
        "kango": {
            "text": "吃驚する",
            "reading": "びっくりする"
        },
        "wago": {
            "text": "驚く",
            "reading": "おどろく"
        },
        "meaning": "to be surprised",
        "pos": "verb",
        "meaningMn": "гайхах"
    },
    {
        "kango": {
            "text": "湾曲する",
            "reading": "わんきょくする"
        },
        "wago": {
            "text": "曲げる",
            "reading": "まげる"
        },
        "meaning": "to bend",
        "pos": "verb",
        "meaningMn": "нугалах"
    },
    {
        "kango": {
            "text": "傾斜する",
            "reading": "けいしゃする"
        },
        "wago": {
            "text": "傾ける",
            "reading": "かたむける"
        },
        "meaning": "to lean",
        "pos": "verb",
        "meaningMn": "хазайлгах"
    },
    {
        "kango": {
            "text": "表示する",
            "reading": "ひょうじする"
        },
        "wago": {
            "text": "表す",
            "reading": "あらわす"
        },
        "meaning": "to show",
        "pos": "verb",
        "meaningMn": "үзүүлэх"
    },
    {
        "kango": {
            "text": "表示する",
            "reading": "ひょうじする"
        },
        "wago": {
            "text": "示す",
            "reading": "しめす"
        },
        "meaning": "to (take out and) show",
        "pos": "verb",
        "meaningMn": "харуулах"
    },
    {
        "kango": {
            "text": "拾得する",
            "reading": "しゅうとくする"
        },
        "wago": {
            "text": "拾う",
            "reading": "ひろう"
        },
        "meaning": "to pick up",
        "pos": "verb",
        "meaningMn": "түүж авах"
    },
    {
        "kango": {
            "text": "進出する",
            "reading": "しんしゅつする"
        },
        "wago": {
            "text": "進める",
            "reading": "すすめる"
        },
        "meaning": "to advance",
        "pos": "verb",
        "meaningMn": "урагшлуулах"
    },
    {
        "kango": {
            "text": "捻挫する",
            "reading": "ねんざする"
        },
        "wago": {
            "text": "捻る",
            "reading": "ひねる"
        },
        "meaning": "to twist",
        "pos": "verb",
        "meaningMn": "мушгих"
    },
    {
        "kango": {
            "text": "遊戯する",
            "reading": "ゆうぎする"
        },
        "wago": {
            "text": "遊ぶ",
            "reading": "あそぶ"
        },
        "meaning": "to play",
        "pos": "verb",
        "meaningMn": "тоглох"
    },
    {
        "kango": {
            "text": "合戦する",
            "reading": "かっせんする"
        },
        "wago": {
            "text": "戦う",
            "reading": "たたかう"
        },
        "meaning": "to fight",
        "pos": "verb",
        "meaningMn": "тулалдах"
    },
    {
        "kango": {
            "text": "尊敬する",
            "reading": "そんけいする"
        },
        "wago": {
            "text": "尊ぶ",
            "reading": "とうとぶ"
        },
        "meaning": "to esteem",
        "pos": "verb",
        "meaningMn": "хүндэтгэх"
    },
    {
        "kango": {
            "text": "入門する",
            "reading": "にゅうもんする"
        },
        "wago": {
            "text": "入る",
            "reading": "いる"
        },
        "meaning": "to enter",
        "pos": "verb",
        "meaningMn": "орох"
    },
    {
        "kango": {
            "text": "競走する",
            "reading": "きょうそうする"
        },
        "wago": {
            "text": "走る",
            "reading": "はしる"
        },
        "meaning": "to run",
        "pos": "verb",
        "meaningMn": "гүйх"
    },
    {
        "kango": {
            "text": "転移する",
            "reading": "てんいする"
        },
        "wago": {
            "text": "移る",
            "reading": "うつる"
        },
        "meaning": "to change",
        "pos": "verb",
        "meaningMn": "шилжих"
    },
    {
        "kango": {
            "text": "急行する",
            "reading": "きゅうこうする"
        },
        "wago": {
            "text": "急ぐ",
            "reading": "いそぐ"
        },
        "meaning": "to hurry",
        "pos": "verb",
        "meaningMn": "яарах"
    },
    {
        "kango": {
            "text": "絶叫する",
            "reading": "ぜっきょうする"
        },
        "wago": {
            "text": "叫ぶ",
            "reading": "さけぶ"
        },
        "meaning": "to shout",
        "pos": "verb",
        "meaningMn": "хашгирах"
    },
    {
        "kango": {
            "text": "掲揚する",
            "reading": "けいようする"
        },
        "wago": {
            "text": "掲げる",
            "reading": "かかげる"
        },
        "meaning": "to put up",
        "pos": "verb",
        "meaningMn": "мандуулах, өргөх"
    },
    {
        "kango": {
            "text": "彩色する",
            "reading": "さいしきする"
        },
        "wago": {
            "text": "彩る",
            "reading": "いろどる"
        },
        "meaning": "to colour",
        "pos": "verb",
        "meaningMn": "будах, өнгөлөх"
    },
    {
        "kango": {
            "text": "粉砕する",
            "reading": "ふんさいする"
        },
        "wago": {
            "text": "砕く",
            "reading": "くだく"
        },
        "meaning": "to smash",
        "pos": "verb",
        "meaningMn": "хэмхлэх"
    },
    {
        "kango": {
            "text": "取材する",
            "reading": "しゅざいする"
        },
        "wago": {
            "text": "取り上げる",
            "reading": "とりあげる"
        },
        "meaning": "to report",
        "pos": "verb",
        "meaningMn": "сурвалжлах"
    },
    {
        "kango": {
            "text": "買取する",
            "reading": "かいとりする"
        },
        "wago": {
            "text": "取る",
            "reading": "とる"
        },
        "meaning": "to buy",
        "pos": "verb",
        "meaningMn": "худалдан авах"
    },
    {
        "kango": {
            "text": "上昇する",
            "reading": "じょうしょうする"
        },
        "wago": {
            "text": "上る",
            "reading": "のぼる"
        },
        "meaning": "to ascend",
        "pos": "verb",
        "meaningMn": "өгсөх"
    },
    {
        "kango": {
            "text": "移植する",
            "reading": "いしょくする"
        },
        "wago": {
            "text": "植える",
            "reading": "うえる"
        },
        "meaning": "to transplant",
        "pos": "verb",
        "meaningMn": "шилжүүлэн суулгах"
    },
    {
        "kango": {
            "text": "矯正する",
            "reading": "きょうせいする"
        },
        "wago": {
            "text": "正す",
            "reading": "ただす"
        },
        "meaning": "to reform",
        "pos": "verb",
        "meaningMn": "засах, залруулах"
    },
    {
        "kango": {
            "text": "待望する",
            "reading": "たいぼうする"
        },
        "wago": {
            "text": "待つ",
            "reading": "まつ"
        },
        "meaning": "to wait",
        "pos": "verb",
        "meaningMn": "хүлээх"
    },
    {
        "kango": {
            "text": "跳躍する",
            "reading": "ちょうやくする"
        },
        "wago": {
            "text": "跳ねる",
            "reading": "はねる"
        },
        "meaning": "to jump",
        "pos": "verb",
        "meaningMn": "үсрэх"
    },
    {
        "kango": {
            "text": "打倒する",
            "reading": "だとうする"
        },
        "wago": {
            "text": "倒す",
            "reading": "たおす"
        },
        "meaning": "to bring down",
        "pos": "verb",
        "meaningMn": "унагах"
    },
    {
        "kango": {
            "text": "逃亡する",
            "reading": "とうぼうする"
        },
        "wago": {
            "text": "逃げ出す",
            "reading": "にげだす"
        },
        "meaning": "to run away",
        "pos": "verb",
        "meaningMn": "зугтах"
    },
    {
        "kango": {
            "text": "破綻する",
            "reading": "はたんする"
        },
        "wago": {
            "text": "破れる",
            "reading": "やぶれる"
        },
        "meaning": "to tear",
        "pos": "verb",
        "meaningMn": "урагдах"
    },
    {
        "kango": {
            "text": "負荷する",
            "reading": "ふかする"
        },
        "wago": {
            "text": "負う",
            "reading": "おう"
        },
        "meaning": "to bear",
        "pos": "verb",
        "meaningMn": "үүрэх"
    },
    {
        "kango": {
            "text": "軽蔑する",
            "reading": "けいべつする"
        },
        "wago": {
            "text": "蔑む",
            "reading": "さげすむ"
        },
        "meaning": "to scorn",
        "pos": "verb",
        "meaningMn": "басамжлах"
    },
    {
        "kango": {
            "text": "研磨する",
            "reading": "けんまする"
        },
        "wago": {
            "text": "磨く",
            "reading": "みがく"
        },
        "meaning": "to polish",
        "pos": "verb",
        "meaningMn": "өнгөлөх"
    },
    {
        "kango": {
            "text": "向上する",
            "reading": "こうじょうする"
        },
        "wago": {
            "text": "立ち上がる",
            "reading": "たちあがる"
        },
        "meaning": "to rise",
        "pos": "verb",
        "meaningMn": "босох"
    },
    {
        "kango": {
            "text": "傾斜する",
            "reading": "けいしゃする"
        },
        "wago": {
            "text": "傾げる",
            "reading": "かしげる"
        },
        "meaning": "to tilt",
        "pos": "verb",
        "meaningMn": "хазайлгах"
    },
    {
        "kango": {
            "text": "聴聞する",
            "reading": "ちょうもんする"
        },
        "wago": {
            "text": "聞く",
            "reading": "きく"
        },
        "meaning": "to hear",
        "pos": "verb",
        "meaningMn": "сонсох"
    },
    {
        "kango": {
            "text": "負担する",
            "reading": "ふたんする"
        },
        "wago": {
            "text": "担う",
            "reading": "になう"
        },
        "meaning": "to carry on one's shoulder",
        "pos": "verb",
        "meaningMn": "үүрэх"
    },
    {
        "kango": {
            "text": "把握する",
            "reading": "はあくする"
        },
        "wago": {
            "text": "握る",
            "reading": "にぎる"
        },
        "meaning": "to grasp",
        "pos": "verb",
        "meaningMn": "барих, ойлгох"
    },
    {
        "kango": {
            "text": "叫喚する",
            "reading": "きょうかんする"
        },
        "wago": {
            "text": "喚く",
            "reading": "わめく"
        },
        "meaning": "to shout",
        "pos": "verb",
        "meaningMn": "хашгирах"
    },
    {
        "kango": {
            "text": "受検する",
            "reading": "じゅけんする"
        },
        "wago": {
            "text": "受ける",
            "reading": "うける"
        },
        "meaning": "to undergo",
        "pos": "verb",
        "meaningMn": "шалгуулах"
    },
    {
        "kango": {
            "text": "吹奏する",
            "reading": "すいそうする"
        },
        "wago": {
            "text": "吹く",
            "reading": "ふく"
        },
        "meaning": "to blow",
        "pos": "verb",
        "meaningMn": "үлээх"
    },
    {
        "kango": {
            "text": "被覆する",
            "reading": "ひふくする"
        },
        "wago": {
            "text": "被せる",
            "reading": "かぶせる"
        },
        "meaning": "to cover",
        "pos": "verb",
        "meaningMn": "бүрхэх"
    },
    {
        "kango": {
            "text": "玩味する",
            "reading": "がんみする"
        },
        "wago": {
            "text": "味わう",
            "reading": "あじわう"
        },
        "meaning": "to savor",
        "pos": "verb",
        "meaningMn": "амтлах"
    },
    {
        "kango": {
            "text": "昇温する",
            "reading": "しょうおんする"
        },
        "wago": {
            "text": "温める",
            "reading": "あたためる"
        },
        "meaning": "to warm",
        "pos": "verb",
        "meaningMn": "дулаацуулах"
    },
    {
        "kango": {
            "text": "始動する",
            "reading": "しどうする"
        },
        "wago": {
            "text": "始まる",
            "reading": "はじまる"
        },
        "meaning": "to begin",
        "pos": "verb",
        "meaningMn": "эхлэх"
    },
    {
        "kango": {
            "text": "支持する",
            "reading": "しじする"
        },
        "wago": {
            "text": "支える",
            "reading": "ささえる"
        },
        "meaning": "to support",
        "pos": "verb",
        "meaningMn": "дэмжих"
    },
    {
        "kango": {
            "text": "労働する",
            "reading": "ろうどうする"
        },
        "wago": {
            "text": "働く",
            "reading": "はたらく"
        },
        "meaning": "to work",
        "pos": "verb",
        "meaningMn": "ажиллах"
    },
    {
        "kango": {
            "text": "頂戴する",
            "reading": "ちょうだいする"
        },
        "wago": {
            "text": "頂く",
            "reading": "いただく"
        },
        "meaning": "to get",
        "pos": "verb",
        "meaningMn": "хүлээн авах"
    },
    {
        "kango": {
            "text": "取得する",
            "reading": "しゅとくする"
        },
        "wago": {
            "text": "得る",
            "reading": "える"
        },
        "meaning": "to get",
        "pos": "verb",
        "meaningMn": "олж авах"
    },
    {
        "kango": {
            "text": "抑制する",
            "reading": "よくせいする"
        },
        "wago": {
            "text": "抑える",
            "reading": "おさえる"
        },
        "meaning": "to control",
        "pos": "verb",
        "meaningMn": "дарах, хязгаарлах"
    },
    {
        "kango": {
            "text": "転移する",
            "reading": "てんいする"
        },
        "wago": {
            "text": "移す",
            "reading": "うつす"
        },
        "meaning": "to transfer",
        "pos": "verb",
        "meaningMn": "шилжүүлэх"
    },
    {
        "kango": {
            "text": "共演する",
            "reading": "きょうえんする"
        },
        "wago": {
            "text": "演じる",
            "reading": "えんじる"
        },
        "meaning": "to act",
        "pos": "verb",
        "meaningMn": "тоглох"
    },
    {
        "kango": {
            "text": "共演する",
            "reading": "きょうえんする"
        },
        "wago": {
            "text": "演ずる",
            "reading": "えんずる"
        },
        "meaning": "to act",
        "pos": "verb",
        "meaningMn": "тоглох"
    },
    {
        "kango": {
            "text": "準拠する",
            "reading": "じゅんきょする"
        },
        "wago": {
            "text": "準じる",
            "reading": "じゅんじる"
        },
        "meaning": "to follow",
        "pos": "verb",
        "meaningMn": "дагах, баримтлах"
    },
    {
        "kango": {
            "text": "準拠する",
            "reading": "じゅんきょする"
        },
        "wago": {
            "text": "準ずる",
            "reading": "じゅんずる"
        },
        "meaning": "to follow",
        "pos": "verb",
        "meaningMn": "дагах, баримтлах"
    },
    {
        "kango": {
            "text": "送付する",
            "reading": "そうふする"
        },
        "wago": {
            "text": "送る",
            "reading": "おくる"
        },
        "meaning": "to send",
        "pos": "verb",
        "meaningMn": "илгээх"
    },
    {
        "kango": {
            "text": "貫通する",
            "reading": "かんつうする"
        },
        "wago": {
            "text": "通じる",
            "reading": "つうじる"
        },
        "meaning": "to go",
        "pos": "verb",
        "meaningMn": "нэвтрэх"
    },
    {
        "kango": {
            "text": "練習する",
            "reading": "れんしゅうする"
        },
        "wago": {
            "text": "練る",
            "reading": "ねる"
        },
        "meaning": "to train",
        "pos": "verb",
        "meaningMn": "дасгал хийх"
    },
    {
        "kango": {
            "text": "破棄する",
            "reading": "はきする"
        },
        "wago": {
            "text": "破る",
            "reading": "やぶる"
        },
        "meaning": "to tear",
        "pos": "verb",
        "meaningMn": "цуцлах, устгах"
    },
    {
        "kango": {
            "text": "付着する",
            "reading": "ふちゃくする"
        },
        "wago": {
            "text": "くっ付く",
            "reading": "くっつく"
        },
        "meaning": "to stick to",
        "pos": "verb",
        "meaningMn": "наалдах"
    },
    {
        "kango": {
            "text": "派遣する",
            "reading": "はけんする"
        },
        "wago": {
            "text": "遣る",
            "reading": "やる"
        },
        "meaning": "to dispatch",
        "pos": "verb",
        "meaningMn": "томилон явуулах"
    },
    {
        "kango": {
            "text": "押捺する",
            "reading": "おうなつする"
        },
        "wago": {
            "text": "押す",
            "reading": "おす"
        },
        "meaning": "to stamp",
        "pos": "verb",
        "meaningMn": "тамга дарах"
    },
    {
        "kango": {
            "text": "覚醒する",
            "reading": "かくせいする"
        },
        "wago": {
            "text": "覚ます",
            "reading": "さます"
        },
        "meaning": "to awaken",
        "pos": "verb",
        "meaningMn": "сэрээх"
    },
    {
        "kango": {
            "text": "分割する",
            "reading": "ぶんかつする"
        },
        "wago": {
            "text": "割れる",
            "reading": "われる"
        },
        "meaning": "to split",
        "pos": "verb",
        "meaningMn": "хуваагдах"
    },
    {
        "kango": {
            "text": "感覚する",
            "reading": "かんかくする"
        },
        "wago": {
            "text": "感じる",
            "reading": "かんじる"
        },
        "meaning": "to feel",
        "pos": "verb",
        "meaningMn": "мэдрэх"
    },
    {
        "kango": {
            "text": "感覚する",
            "reading": "かんかくする"
        },
        "wago": {
            "text": "感じ取る",
            "reading": "かんじとる"
        },
        "meaning": "to sense",
        "pos": "verb",
        "meaningMn": "мэдрэх"
    },
    {
        "kango": {
            "text": "願望する",
            "reading": "がんぼうする"
        },
        "wago": {
            "text": "願う",
            "reading": "ねがう"
        },
        "meaning": "to desire",
        "pos": "verb",
        "meaningMn": "хүсэх"
    },
    {
        "kango": {
            "text": "企画する",
            "reading": "きかくする"
        },
        "wago": {
            "text": "企てる",
            "reading": "くわだてる"
        },
        "meaning": "to plan",
        "pos": "verb",
        "meaningMn": "төлөвлөх"
    },
    {
        "kango": {
            "text": "企図する",
            "reading": "きとする"
        },
        "wago": {
            "text": "企む",
            "reading": "たくらむ"
        },
        "meaning": "to scheme",
        "pos": "verb",
        "meaningMn": "заваардах, санаархах"
    },
    {
        "kango": {
            "text": "遊戯する",
            "reading": "ゆうぎする"
        },
        "wago": {
            "text": "戯れる",
            "reading": "たわむれる"
        },
        "meaning": "to be playful",
        "pos": "verb",
        "meaningMn": "хөгжилдөх"
    },
    {
        "kango": {
            "text": "急行する",
            "reading": "きゅうこうする"
        },
        "wago": {
            "text": "急かす",
            "reading": "せかす"
        },
        "meaning": "to hurry",
        "pos": "verb",
        "meaningMn": "яаруулах"
    },
    {
        "kango": {
            "text": "救済する",
            "reading": "きゅうさいする"
        },
        "wago": {
            "text": "救う",
            "reading": "すくう"
        },
        "meaning": "to rescue",
        "pos": "verb",
        "meaningMn": "аврах"
    },
    {
        "kango": {
            "text": "請求する",
            "reading": "せいきゅうする"
        },
        "wago": {
            "text": "求める",
            "reading": "もとめる"
        },
        "meaning": "to request",
        "pos": "verb",
        "meaningMn": "шаардах, хүсэх"
    },
    {
        "kango": {
            "text": "曲折する",
            "reading": "きょくせつする"
        },
        "wago": {
            "text": "曲がる",
            "reading": "まがる"
        },
        "meaning": "to bend",
        "pos": "verb",
        "meaningMn": "муруйх"
    },
    {
        "kango": {
            "text": "努力する",
            "reading": "どりょくする"
        },
        "wago": {
            "text": "努める",
            "reading": "つとめる"
        },
        "meaning": "to endeavor",
        "pos": "verb",
        "meaningMn": "хичээх"
    },
    {
        "kango": {
            "text": "苦渋する",
            "reading": "くじゅうする"
        },
        "wago": {
            "text": "苦しめる",
            "reading": "くるしめる"
        },
        "meaning": "to pain",
        "pos": "verb",
        "meaningMn": "зовоох"
    },
    {
        "kango": {
            "text": "発掘する",
            "reading": "はっくつする"
        },
        "wago": {
            "text": "掘る",
            "reading": "ほる"
        },
        "meaning": "to dig",
        "pos": "verb",
        "meaningMn": "ухах"
    },
    {
        "kango": {
            "text": "経由する",
            "reading": "けいゆする"
        },
        "wago": {
            "text": "経る",
            "reading": "へる"
        },
        "meaning": "to go through",
        "pos": "verb",
        "meaningMn": "дамжих"
    },
    {
        "kango": {
            "text": "射撃する",
            "reading": "しゃげきする"
        },
        "wago": {
            "text": "撃つ",
            "reading": "うつ"
        },
        "meaning": "to shoot",
        "pos": "verb",
        "meaningMn": "буудах"
    },
    {
        "kango": {
            "text": "交流する",
            "reading": "こうりゅうする"
        },
        "wago": {
            "text": "交える",
            "reading": "まじえる"
        },
        "meaning": "to mix",
        "pos": "verb",
        "meaningMn": "холих, солилцох"
    },
    {
        "kango": {
            "text": "構想する",
            "reading": "こうそうする"
        },
        "wago": {
            "text": "構える",
            "reading": "かまえる"
        },
        "meaning": "to plan",
        "pos": "verb",
        "meaningMn": "төлөвлөх"
    },
    {
        "kango": {
            "text": "合戦する",
            "reading": "かっせんする"
        },
        "wago": {
            "text": "合わす",
            "reading": "あわす"
        },
        "meaning": "to fight",
        "pos": "verb",
        "meaningMn": "тулалдах"
    },
    {
        "kango": {
            "text": "合戦する",
            "reading": "かっせんする"
        },
        "wago": {
            "text": "合わせる",
            "reading": "あわせる"
        },
        "meaning": "to fight",
        "pos": "verb",
        "meaningMn": "тулалдах"
    },
    {
        "kango": {
            "text": "現有する",
            "reading": "げんゆうする"
        },
        "wago": {
            "text": "有る",
            "reading": "ある"
        },
        "meaning": "to exist",
        "pos": "verb",
        "meaningMn": "байх"
    },
    {
        "kango": {
            "text": "摩擦する",
            "reading": "まさつする"
        },
        "wago": {
            "text": "擦る",
            "reading": "こする"
        },
        "meaning": "to rub",
        "pos": "verb",
        "meaningMn": "үрэх"
    },
    {
        "kango": {
            "text": "残存する",
            "reading": "ざんぞんする"
        },
        "wago": {
            "text": "残る",
            "reading": "のこる"
        },
        "meaning": "to remain",
        "pos": "verb",
        "meaningMn": "үлдэх"
    },
    {
        "kango": {
            "text": "購入する",
            "reading": "こうにゅうする"
        },
        "wago": {
            "text": "仕入れる",
            "reading": "しいれる"
        },
        "meaning": "to buy",
        "pos": "verb",
        "meaningMn": "худалдан авах"
    },
    {
        "kango": {
            "text": "指摘する",
            "reading": "してきする"
        },
        "wago": {
            "text": "指す",
            "reading": "さす"
        },
        "meaning": "to point",
        "pos": "verb",
        "meaningMn": "заах"
    },
    {
        "kango": {
            "text": "試験する",
            "reading": "しけんする"
        },
        "wago": {
            "text": "試す",
            "reading": "ためす"
        },
        "meaning": "to test",
        "pos": "verb",
        "meaningMn": "сорих, шалгах"
    },
    {
        "kango": {
            "text": "授与する",
            "reading": "じゅよする"
        },
        "wago": {
            "text": "授ける",
            "reading": "さずける"
        },
        "meaning": "to grant",
        "pos": "verb",
        "meaningMn": "олгох, шагнах"
    },
    {
        "kango": {
            "text": "就労する",
            "reading": "しゅうろうする"
        },
        "wago": {
            "text": "就く",
            "reading": "つく"
        },
        "meaning": "to be hired",
        "pos": "verb",
        "meaningMn": "ажилд орох"
    },
    {
        "kango": {
            "text": "尊重する",
            "reading": "そんちょうする"
        },
        "wago": {
            "text": "重んずる",
            "reading": "おもんずる"
        },
        "meaning": "to respect",
        "pos": "verb",
        "meaningMn": "хүндэтгэх"
    },
    {
        "kango": {
            "text": "向上する",
            "reading": "こうじょうする"
        },
        "wago": {
            "text": "上げる",
            "reading": "あげる"
        },
        "meaning": "to rise",
        "pos": "verb",
        "meaningMn": "дээшлэх"
    },
    {
        "kango": {
            "text": "乗車する",
            "reading": "じょうしゃする"
        },
        "wago": {
            "text": "乗り込む",
            "reading": "のりこむ"
        },
        "meaning": "to board",
        "pos": "verb",
        "meaningMn": "суух"
    },
    {
        "kango": {
            "text": "接触する",
            "reading": "せっしょくする"
        },
        "wago": {
            "text": "触る",
            "reading": "さわる"
        },
        "meaning": "to touch",
        "pos": "verb",
        "meaningMn": "хүрэх"
    },
    {
        "kango": {
            "text": "接触する",
            "reading": "せっしょくする"
        },
        "wago": {
            "text": "触れ合う",
            "reading": "ふれあう"
        },
        "meaning": "to touch",
        "pos": "verb",
        "meaningMn": "хүрэлцэх"
    },
    {
        "kango": {
            "text": "侵入する",
            "reading": "しんにゅうする"
        },
        "wago": {
            "text": "侵す",
            "reading": "おかす"
        },
        "meaning": "to raid",
        "pos": "verb",
        "meaningMn": "түрэмгийлэх, довтлох"
    },
    {
        "kango": {
            "text": "振動する",
            "reading": "しんどうする"
        },
        "wago": {
            "text": "振り回す",
            "reading": "ふりまわす"
        },
        "meaning": "to swing",
        "pos": "verb",
        "meaningMn": "савлуулах"
    },
    {
        "kango": {
            "text": "振動する",
            "reading": "しんどうする"
        },
        "wago": {
            "text": "振る",
            "reading": "ふる"
        },
        "meaning": "to swing",
        "pos": "verb",
        "meaningMn": "савлах"
    },
    {
        "kango": {
            "text": "進出する",
            "reading": "しんしゅつする"
        },
        "wago": {
            "text": "進む",
            "reading": "すすむ"
        },
        "meaning": "to advance",
        "pos": "verb",
        "meaningMn": "урагшлах"
    },
    {
        "kango": {
            "text": "衰退する",
            "reading": "すいたいする"
        },
        "wago": {
            "text": "衰える",
            "reading": "おとろえる"
        },
        "meaning": "to decline",
        "pos": "verb",
        "meaningMn": "суларах"
    },
    {
        "kango": {
            "text": "成人する",
            "reading": "せいじんする"
        },
        "wago": {
            "text": "成る",
            "reading": "なる"
        },
        "meaning": "to grow",
        "pos": "verb",
        "meaningMn": "болох, өсөх"
    },
    {
        "kango": {
            "text": "整頓する",
            "reading": "せいとんする"
        },
        "wago": {
            "text": "整える",
            "reading": "ととのえる"
        },
        "meaning": "to put in order",
        "pos": "verb",
        "meaningMn": "цэгцлэх"
    },
    {
        "kango": {
            "text": "誓約する",
            "reading": "せいやくする"
        },
        "wago": {
            "text": "誓う",
            "reading": "ちかう"
        },
        "meaning": "to vow",
        "pos": "verb",
        "meaningMn": "тангараглах"
    },
    {
        "kango": {
            "text": "新設する",
            "reading": "しんせつする"
        },
        "wago": {
            "text": "設ける",
            "reading": "もうける"
        },
        "meaning": "to set up",
        "pos": "verb",
        "meaningMn": "байгуулах"
    },
    {
        "kango": {
            "text": "占領する",
            "reading": "せんりょうする"
        },
        "wago": {
            "text": "占める",
            "reading": "しめる"
        },
        "meaning": "to occupy",
        "pos": "verb",
        "meaningMn": "эзлэх"
    },
    {
        "kango": {
            "text": "感染する",
            "reading": "かんせんする"
        },
        "wago": {
            "text": "染みる",
            "reading": "しみる"
        },
        "meaning": "to be infected",
        "pos": "verb",
        "meaningMn": "халдвар авах"
    },
    {
        "kango": {
            "text": "修繕する",
            "reading": "しゅうぜんする"
        },
        "wago": {
            "text": "繕う",
            "reading": "つくろう"
        },
        "meaning": "to mend",
        "pos": "verb",
        "meaningMn": "засах"
    },
    {
        "kango": {
            "text": "待望する",
            "reading": "たいぼうする"
        },
        "wago": {
            "text": "待ち構える",
            "reading": "まちかまえる"
        },
        "meaning": "to lie in wait",
        "pos": "verb",
        "meaningMn": "хүлээх"
    },
    {
        "kango": {
            "text": "貸借する",
            "reading": "たいしゃくする"
        },
        "wago": {
            "text": "貸し出す",
            "reading": "かしだす"
        },
        "meaning": "to lend",
        "pos": "verb",
        "meaningMn": "зээлдүүлэх"
    },
    {
        "kango": {
            "text": "換算する",
            "reading": "かんさんする"
        },
        "wago": {
            "text": "置き換える",
            "reading": "おきかえる"
        },
        "meaning": "to exchange",
        "pos": "verb",
        "meaningMn": "сольж тавих, хөрвүүлэх"
    },
    {
        "kango": {
            "text": "構築する",
            "reading": "こうちくする"
        },
        "wago": {
            "text": "築き上げる",
            "reading": "きずきあげる"
        },
        "meaning": "to build",
        "pos": "verb",
        "meaningMn": "байгуулах"
    },
    {
        "kango": {
            "text": "構築する",
            "reading": "こうちくする"
        },
        "wago": {
            "text": "築く",
            "reading": "きずく"
        },
        "meaning": "to build",
        "pos": "verb",
        "meaningMn": "барих, байгуулах"
    },
    {
        "kango": {
            "text": "萎縮する",
            "reading": "いしゅくする"
        },
        "wago": {
            "text": "萎む",
            "reading": "しぼむ"
        },
        "meaning": "to wither",
        "pos": "verb",
        "meaningMn": "хатах, хумигдах"
    },
    {
        "kango": {
            "text": "通用する",
            "reading": "つうようする"
        },
        "wago": {
            "text": "通す",
            "reading": "とおす"
        },
        "meaning": "to let pass",
        "pos": "verb",
        "meaningMn": "нэвтрүүлэх"
    },
    {
        "kango": {
            "text": "摘出する",
            "reading": "てきしゅつする"
        },
        "wago": {
            "text": "摘む",
            "reading": "つむ"
        },
        "meaning": "to pick",
        "pos": "verb",
        "meaningMn": "түүх, авах"
    },
    {
        "kango": {
            "text": "転向する",
            "reading": "てんこうする"
        },
        "wago": {
            "text": "転じる",
            "reading": "てんじる"
        },
        "meaning": "to shift",
        "pos": "verb",
        "meaningMn": "хандлагаа өөрчлөх"
    },
    {
        "kango": {
            "text": "嘔吐する",
            "reading": "おうとする"
        },
        "wago": {
            "text": "吐く",
            "reading": "つく"
        },
        "meaning": "to vomit",
        "pos": "verb",
        "meaningMn": "бөөлжих"
    },
    {
        "kango": {
            "text": "転倒する",
            "reading": "てんとうする"
        },
        "wago": {
            "text": "倒れる",
            "reading": "たおれる"
        },
        "meaning": "to fall",
        "pos": "verb",
        "meaningMn": "унах"
    },
    {
        "kango": {
            "text": "投棄する",
            "reading": "とうきする"
        },
        "wago": {
            "text": "投げる",
            "reading": "なげる"
        },
        "meaning": "to throw",
        "pos": "verb",
        "meaningMn": "шидэх"
    },
    {
        "kango": {
            "text": "窃盗する",
            "reading": "せっとうする"
        },
        "wago": {
            "text": "盗む",
            "reading": "ぬすむ"
        },
        "meaning": "to steal",
        "pos": "verb",
        "meaningMn": "хулгайлах"
    },
    {
        "kango": {
            "text": "当選する",
            "reading": "とうせんする"
        },
        "wago": {
            "text": "当たる",
            "reading": "あたる"
        },
        "meaning": "to be selected",
        "pos": "verb",
        "meaningMn": "сонгогдох"
    },
    {
        "kango": {
            "text": "衝突する",
            "reading": "しょうとつする"
        },
        "wago": {
            "text": "突き当たる",
            "reading": "つきあたる"
        },
        "meaning": "to run into",
        "pos": "verb",
        "meaningMn": "мөргөлдөх"
    },
    {
        "kango": {
            "text": "抜粋する",
            "reading": "ばっすいする"
        },
        "wago": {
            "text": "抜く",
            "reading": "ぬく"
        },
        "meaning": "to extract",
        "pos": "verb",
        "meaningMn": "сугалж авах"
    },
    {
        "kango": {
            "text": "同伴する",
            "reading": "どうはんする"
        },
        "wago": {
            "text": "伴う",
            "reading": "ともなう"
        },
        "meaning": "to accompany",
        "pos": "verb",
        "meaningMn": "дагалдах"
    },
    {
        "kango": {
            "text": "出没する",
            "reading": "しゅつぼつする"
        },
        "wago": {
            "text": "飛び出す",
            "reading": "とびだす"
        },
        "meaning": "to appear",
        "pos": "verb",
        "meaningMn": "гарч ирэх"
    },
    {
        "kango": {
            "text": "漂流する",
            "reading": "ひょうりゅうする"
        },
        "wago": {
            "text": "漂う",
            "reading": "ただよう"
        },
        "meaning": "to drift",
        "pos": "verb",
        "meaningMn": "хөвөх"
    },
    {
        "kango": {
            "text": "付着する",
            "reading": "ふちゃくする"
        },
        "wago": {
            "text": "付く",
            "reading": "つく"
        },
        "meaning": "to stick",
        "pos": "verb",
        "meaningMn": "наалдах"
    },
    {
        "kango": {
            "text": "腐食する",
            "reading": "ふしょくする"
        },
        "wago": {
            "text": "腐る",
            "reading": "くさる"
        },
        "meaning": "to rot",
        "pos": "verb",
        "meaningMn": "ялзрах"
    },
    {
        "kango": {
            "text": "転覆する",
            "reading": "てんぷくする"
        },
        "wago": {
            "text": "覆す",
            "reading": "くつがえす"
        },
        "meaning": "to overturn",
        "pos": "verb",
        "meaningMn": "хөмрөх, эргүүлэх"
    },
    {
        "kango": {
            "text": "歩行する",
            "reading": "ほこうする"
        },
        "wago": {
            "text": "歩く",
            "reading": "あるく"
        },
        "meaning": "to walk",
        "pos": "verb",
        "meaningMn": "алхах"
    },
    {
        "kango": {
            "text": "歩行する",
            "reading": "ほこうする"
        },
        "wago": {
            "text": "歩む",
            "reading": "あゆむ"
        },
        "meaning": "to walk",
        "pos": "verb",
        "meaningMn": "алхах"
    },
    {
        "kango": {
            "text": "報道する",
            "reading": "ほうどうする"
        },
        "wago": {
            "text": "報じる",
            "reading": "ほうじる"
        },
        "meaning": "to report",
        "pos": "verb",
        "meaningMn": "мэдээлэх"
    },
    {
        "kango": {
            "text": "崩壊する",
            "reading": "ほうかいする"
        },
        "wago": {
            "text": "崩れる",
            "reading": "くずれる"
        },
        "meaning": "to collapse",
        "pos": "verb",
        "meaningMn": "нурах"
    },
    {
        "kango": {
            "text": "解放する",
            "reading": "かいほうする"
        },
        "wago": {
            "text": "放つ",
            "reading": "はなつ"
        },
        "meaning": "to set free",
        "pos": "verb",
        "meaningMn": "суллах"
    },
    {
        "kango": {
            "text": "放置する",
            "reading": "ほうちする"
        },
        "wago": {
            "text": "放る",
            "reading": "ほうる"
        },
        "meaning": "to neglect",
        "pos": "verb",
        "meaningMn": "орхигдуулах, тоохгүй орхих"
    },
    {
        "kango": {
            "text": "冒険する",
            "reading": "ぼうけんする"
        },
        "wago": {
            "text": "冒す",
            "reading": "おかす"
        },
        "meaning": "to risk",
        "pos": "verb",
        "meaningMn": "эрсдэлд орох"
    },
    {
        "kango": {
            "text": "埋蔵する",
            "reading": "まいぞうする"
        },
        "wago": {
            "text": "埋める",
            "reading": "うずめる"
        },
        "meaning": "to bury",
        "pos": "verb",
        "meaningMn": "оршуулах, булах"
    },
    {
        "kango": {
            "text": "命令する",
            "reading": "めいれいする"
        },
        "wago": {
            "text": "命じる",
            "reading": "めいじる"
        },
        "meaning": "to order",
        "pos": "verb",
        "meaningMn": "тушаах"
    },
    {
        "kango": {
            "text": "命令する",
            "reading": "めいれいする"
        },
        "wago": {
            "text": "命ずる",
            "reading": "めいずる"
        },
        "meaning": "to order",
        "pos": "verb",
        "meaningMn": "тушаах"
    },
    {
        "kango": {
            "text": "給与する",
            "reading": "きゅうよする"
        },
        "wago": {
            "text": "与える",
            "reading": "あたえる"
        },
        "meaning": "to grant",
        "pos": "verb",
        "meaningMn": "олгох"
    },
    {
        "kango": {
            "text": "溶解する",
            "reading": "ようかいする"
        },
        "wago": {
            "text": "溶かす",
            "reading": "とかす"
        },
        "meaning": "to melt",
        "pos": "verb",
        "meaningMn": "хайлуулах"
    },
    {
        "kango": {
            "text": "溶解する",
            "reading": "ようかいする"
        },
        "wago": {
            "text": "溶く",
            "reading": "とく"
        },
        "meaning": "to melt",
        "pos": "verb",
        "meaningMn": "хайлуулах, уусгах"
    },
    {
        "kango": {
            "text": "溶解する",
            "reading": "ようかいする"
        },
        "wago": {
            "text": "溶ける",
            "reading": "とける"
        },
        "meaning": "to melt",
        "pos": "verb",
        "meaningMn": "хайлах"
    },
    {
        "kango": {
            "text": "養育する",
            "reading": "よういくする"
        },
        "wago": {
            "text": "養う",
            "reading": "やしなう"
        },
        "meaning": "to bring up",
        "pos": "verb",
        "meaningMn": "тэжээн өсгөх"
    },
    {
        "kango": {
            "text": "流出する",
            "reading": "りゅうしゅつする"
        },
        "wago": {
            "text": "流す",
            "reading": "ながす"
        },
        "meaning": "to drain",
        "pos": "verb",
        "meaningMn": "урсгах"
    },
    {
        "kango": {
            "text": "漂流する",
            "reading": "ひょうりゅうする"
        },
        "wago": {
            "text": "流れる",
            "reading": "ながれる"
        },
        "meaning": "to drift",
        "pos": "verb",
        "meaningMn": "хөвөх, урсах"
    },
    {
        "kango": {
            "text": "連係する",
            "reading": "れんけいする"
        },
        "wago": {
            "text": "連ねる",
            "reading": "つらねる"
        },
        "meaning": "to link",
        "pos": "verb",
        "meaningMn": "холбох"
    },
    {
        "kango": {
            "text": "翻弄する",
            "reading": "ほんろうする"
        },
        "wago": {
            "text": "弄る",
            "reading": "いじる"
        },
        "meaning": "to play with",
        "pos": "verb",
        "meaningMn": "тоглох (хэн нэгнийг)"
    },
    {
        "kango": {
            "text": "漏洩する",
            "reading": "ろうえいする"
        },
        "wago": {
            "text": "漏る",
            "reading": "もる"
        },
        "meaning": "to leak",
        "pos": "verb",
        "meaningMn": "алдагдах, гоожих"
    },
    {
        "kango": {
            "text": "会話する",
            "reading": "かいわする"
        },
        "wago": {
            "text": "話す",
            "reading": "はなす"
        },
        "meaning": "to talk",
        "pos": "verb",
        "meaningMn": "ярих"
    },
    {
        "kango": {
            "text": "注入する",
            "reading": "ちゅうにゅうする"
        },
        "wago": {
            "text": "注ぐ",
            "reading": "そそぐ"
        },
        "meaning": "to pour",
        "pos": "verb",
        "meaningMn": "цутгах"
    },
    {
        "kango": {
            "text": "位置する",
            "reading": "いちする"
        },
        "wago": {
            "text": "位置付ける",
            "reading": "いちづける"
        },
        "meaning": "to place",
        "pos": "verb",
        "meaningMn": "байрлуулах"
    },
    {
        "kango": {
            "text": "鋳造する",
            "reading": "ちゅうぞうする"
        },
        "wago": {
            "text": "鋳る",
            "reading": "いる"
        },
        "meaning": "to cast",
        "pos": "verb",
        "meaningMn": "цутгах (металл)"
    },
    {
        "kango": {
            "text": "複写する",
            "reading": "ふくしゃする"
        },
        "wago": {
            "text": "写す",
            "reading": "うつす"
        },
        "meaning": "to copy",
        "pos": "verb",
        "meaningMn": "хуулах"
    },
    {
        "kango": {
            "text": "脱落する",
            "reading": "だつらくする"
        },
        "wago": {
            "text": "落とす",
            "reading": "おとす"
        },
        "meaning": "to drop",
        "pos": "verb",
        "meaningMn": "унагах"
    },
    {
        "kango": {
            "text": "思考する",
            "reading": "しこうする"
        },
        "wago": {
            "text": "思う",
            "reading": "おもう"
        },
        "meaning": "to think",
        "pos": "verb",
        "meaningMn": "бодох"
    },
    {
        "kango": {
            "text": "下降する",
            "reading": "かこうする"
        },
        "wago": {
            "text": "下ろす",
            "reading": "おろす"
        },
        "meaning": "to drop",
        "pos": "verb",
        "meaningMn": "буулгах"
    },
    {
        "kango": {
            "text": "関係する",
            "reading": "かんけいする"
        },
        "wago": {
            "text": "関わる",
            "reading": "かかわる"
        },
        "meaning": "to concern oneself",
        "pos": "verb",
        "meaningMn": "холбогдох"
    },
    {
        "kango": {
            "text": "鎮静する",
            "reading": "ちんせいする"
        },
        "wago": {
            "text": "静まる",
            "reading": "しずまる"
        },
        "meaning": "to quiet down",
        "pos": "verb",
        "meaningMn": "тайвшрах"
    },
    {
        "kango": {
            "text": "鎮静する",
            "reading": "ちんせいする"
        },
        "wago": {
            "text": "静める",
            "reading": "しずめる"
        },
        "meaning": "to quiet",
        "pos": "verb",
        "meaningMn": "тайвшруулах"
    },
    {
        "kango": {
            "text": "添乗する",
            "reading": "てんじょうする"
        },
        "wago": {
            "text": "添える",
            "reading": "そえる"
        },
        "meaning": "to accompany",
        "pos": "verb",
        "meaningMn": "дагалдах"
    },
    {
        "kango": {
            "text": "毀損する",
            "reading": "きそんする"
        },
        "wago": {
            "text": "損なう",
            "reading": "そこなう"
        },
        "meaning": "to harm",
        "pos": "verb",
        "meaningMn": "гэмтээх"
    },
    {
        "kango": {
            "text": "自炊する",
            "reading": "じすいする"
        },
        "wago": {
            "text": "炊く",
            "reading": "たく"
        },
        "meaning": "to cook",
        "pos": "verb",
        "meaningMn": "хоол хийх"
    },
    {
        "kango": {
            "text": "研磨する",
            "reading": "けんまする"
        },
        "wago": {
            "text": "研ぐ",
            "reading": "とぐ"
        },
        "meaning": "to grind",
        "pos": "verb",
        "meaningMn": "хурцлах, өнгөлөх"
    },
    {
        "kango": {
            "text": "捕捉する",
            "reading": "ほそくする"
        },
        "wago": {
            "text": "捉える",
            "reading": "とらえる"
        },
        "meaning": "to capture",
        "pos": "verb",
        "meaningMn": "барих, олж харах"
    },
    {
        "kango": {
            "text": "換算する",
            "reading": "かんさんする"
        },
        "wago": {
            "text": "乗り換える",
            "reading": "のりかえる"
        },
        "meaning": "to change",
        "pos": "verb",
        "meaningMn": "шилжих, хөрвүүлэх"
    },
    {
        "kango": {
            "text": "企図する",
            "reading": "きとする"
        },
        "wago": {
            "text": "図る",
            "reading": "はかる"
        },
        "meaning": "to plan",
        "pos": "verb",
        "meaningMn": "төлөвлөх"
    },
    {
        "kango": {
            "text": "養育する",
            "reading": "よういくする"
        },
        "wago": {
            "text": "育む",
            "reading": "はぐくむ"
        },
        "meaning": "to bring up",
        "pos": "verb",
        "meaningMn": "тэжээн өсгөх"
    },
    {
        "kango": {
            "text": "貼付する",
            "reading": "ちょうふする"
        },
        "wago": {
            "text": "貼り付ける",
            "reading": "はりつける"
        },
        "meaning": "to stick",
        "pos": "verb",
        "meaningMn": "наах"
    },
    {
        "kango": {
            "text": "漏洩する",
            "reading": "ろうえいする"
        },
        "wago": {
            "text": "漏らす",
            "reading": "もらす"
        },
        "meaning": "to let leak",
        "pos": "verb",
        "meaningMn": "алдах, гоожуулах"
    },
    {
        "kango": {
            "text": "雇用する",
            "reading": "こようする"
        },
        "wago": {
            "text": "雇う",
            "reading": "やとう"
        },
        "meaning": "to hire",
        "pos": "verb",
        "meaningMn": "ажилд авах"
    },
    {
        "kango": {
            "text": "感覚する",
            "reading": "かんかくする"
        },
        "wago": {
            "text": "感ずる",
            "reading": "かんずる"
        },
        "meaning": "to feel",
        "pos": "verb",
        "meaningMn": "мэдрэх"
    },
    {
        "kango": {
            "text": "付着する",
            "reading": "ふちゃくする"
        },
        "wago": {
            "text": "引っ付く",
            "reading": "ひっつく"
        },
        "meaning": "to stick to",
        "pos": "verb",
        "meaningMn": "наалдах"
    },
    {
        "kango": {
            "text": "人選する",
            "reading": "じんせんする"
        },
        "wago": {
            "text": "選る",
            "reading": "よる"
        },
        "meaning": "to select",
        "pos": "verb",
        "meaningMn": "сонгох"
    },
    {
        "kango": {
            "text": "封鎖する",
            "reading": "ふうさする"
        },
        "wago": {
            "text": "封じる",
            "reading": "ふうじる"
        },
        "meaning": "to seal",
        "pos": "verb",
        "meaningMn": "хаах, бөглөх"
    },
    {
        "kango": {
            "text": "利用する",
            "reading": "りようする"
        },
        "wago": {
            "text": "利かせる",
            "reading": "きかせる"
        },
        "meaning": "to put to good use",
        "pos": "verb",
        "meaningMn": "ашиглах"
    },
    {
        "kango": {
            "text": "覚醒する",
            "reading": "かくせいする"
        },
        "wago": {
            "text": "目が覚める",
            "reading": "めがさめる"
        },
        "meaning": "to awaken",
        "pos": "verb",
        "meaningMn": "сэрэх"
    },
    {
        "kango": {
            "text": "回転する",
            "reading": "かいてんする"
        },
        "wago": {
            "text": "回す",
            "reading": "まわす"
        },
        "meaning": "to turn",
        "pos": "verb",
        "meaningMn": "эргүүлэх"
    },
    {
        "kango": {
            "text": "合流する",
            "reading": "ごうりゅうする"
        },
        "wago": {
            "text": "落ち合う",
            "reading": "おちあう"
        },
        "meaning": "to join",
        "pos": "verb",
        "meaningMn": "уулзах, нийлэх"
    },
    {
        "kango": {
            "text": "牽引する",
            "reading": "けんいんする"
        },
        "wago": {
            "text": "引っ張る",
            "reading": "ひっぱる"
        },
        "meaning": "to draw",
        "pos": "verb",
        "meaningMn": "татах"
    },
    {
        "kango": {
            "text": "惹起する",
            "reading": "じゃっきする"
        },
        "wago": {
            "text": "引き起こす",
            "reading": "ひきおこす"
        },
        "meaning": "to cause",
        "pos": "verb",
        "meaningMn": "үүсгэх"
    },
    {
        "kango": {
            "text": "経営する",
            "reading": "けいえいする"
        },
        "wago": {
            "text": "営む",
            "reading": "いとなむ"
        },
        "meaning": "to run",
        "pos": "verb",
        "meaningMn": "удирдах, эрхлэх"
    },
    {
        "kango": {
            "text": "独泳する",
            "reading": "どくえいする"
        },
        "wago": {
            "text": "泳ぐ",
            "reading": "およぐ"
        },
        "meaning": "to swim",
        "pos": "verb",
        "meaningMn": "сэлэх"
    },
    {
        "kango": {
            "text": "汚損する",
            "reading": "おそんする"
        },
        "wago": {
            "text": "汚す",
            "reading": "よごす"
        },
        "meaning": "to soil",
        "pos": "verb",
        "meaningMn": "бохирдуулах"
    },
    {
        "kango": {
            "text": "改心する",
            "reading": "かいしんする"
        },
        "wago": {
            "text": "改める",
            "reading": "あらためる"
        },
        "meaning": "to reform",
        "pos": "verb",
        "meaningMn": "засрах, өөрчлөгдөх"
    },
    {
        "kango": {
            "text": "標記する",
            "reading": "ひょうきする"
        },
        "wago": {
            "text": "記す",
            "reading": "しるす"
        },
        "meaning": "to mark",
        "pos": "verb",
        "meaningMn": "тэмдэглэх"
    },
    {
        "kango": {
            "text": "惹起する",
            "reading": "じゃっきする"
        },
        "wago": {
            "text": "起こす",
            "reading": "おこす"
        },
        "meaning": "to cause",
        "pos": "verb",
        "meaningMn": "үүсгэх"
    },
    {
        "kango": {
            "text": "仰望する",
            "reading": "ぎょうぼうする"
        },
        "wago": {
            "text": "仰ぐ",
            "reading": "あおぐ"
        },
        "meaning": "to look up",
        "pos": "verb",
        "meaningMn": "дээш харах, хүндэтгэх"
    },
    {
        "kango": {
            "text": "近接する",
            "reading": "きんせつする"
        },
        "wago": {
            "text": "近づく",
            "reading": "ちかづく"
        },
        "meaning": "to approach",
        "pos": "verb",
        "meaningMn": "ойртох"
    },
    {
        "kango": {
            "text": "循環する",
            "reading": "じゅんかんする"
        },
        "wago": {
            "text": "巡る",
            "reading": "めぐる"
        },
        "meaning": "to circulate",
        "pos": "verb",
        "meaningMn": "эргэлдэх"
    },
    {
        "kango": {
            "text": "製作する",
            "reading": "せいさくする"
        },
        "wago": {
            "text": "こしらえる",
            "reading": "こしらえる"
        },
        "meaning": "to make, create",
        "pos": "verb",
        "meaningMn": "бүтээх"
    },
    {
        "kango": {
            "text": "申請する",
            "reading": "しんせいする"
        },
        "wago": {
            "text": "申し込む",
            "reading": "もうしこむ"
        },
        "meaning": "to apply for",
        "pos": "verb",
        "meaningMn": "өргөдөл гаргах"
    },
    {
        "kango": {
            "text": "告白する",
            "reading": "こくはくする"
        },
        "wago": {
            "text": "打ち明ける",
            "reading": "うちあける"
        },
        "meaning": "to confess",
        "pos": "verb",
        "meaningMn": "нээлттэй хэлэх"
    },
    {
        "kango": {
            "text": "災害",
            "reading": "さいがい"
        },
        "wago": {
            "text": "災い",
            "reading": "わざわい"
        },
        "meaning": "disaster",
        "pos": "noun",
        "meaningMn": "гамшиг"
    },
    {
        "kango": {
            "text": "苦痛な",
            "reading": "くつうな"
        },
        "wago": {
            "text": "痛い",
            "reading": "いたい"
        },
        "meaning": "painful",
        "pos": "adjective",
        "meaningMn": "өвдөлттэй"
    },
    {
        "kango": {
            "text": "消費する",
            "reading": "しょうひする"
        },
        "wago": {
            "text": "使い切る",
            "reading": "つかいきる"
        },
        "meaning": "to use up",
        "pos": "verb",
        "meaningMn": "хэрэглэж дуусгах"
    },
    {
        "kango": {
            "text": "先頭",
            "reading": "せんとう"
        },
        "wago": {
            "text": "先",
            "reading": "さき"
        },
        "meaning": "front, head",
        "pos": "noun",
        "meaningMn": "тэргүүн"
    },
    {
        "kango": {
            "text": "補充する",
            "reading": "ほじゅうする"
        },
        "wago": {
            "text": "補う",
            "reading": "おぎなう"
        },
        "meaning": "to supplement, replenish",
        "pos": "verb",
        "meaningMn": "нөхөн дүүргэх"
    },
    {
        "kango": {
            "text": "誇張する",
            "reading": "こちょうする"
        },
        "wago": {
            "text": "言い過ぎる",
            "reading": "いいすぎる"
        },
        "meaning": "to exaggerate",
        "pos": "verb",
        "meaningMn": "хэтрүүлэх"
    },
    {
        "kango": {
            "text": "採掘する",
            "reading": "さいくつする"
        },
        "wago": {
            "text": "掘り出す",
            "reading": "ほりだす"
        },
        "meaning": "to mine, dig out",
        "pos": "verb",
        "meaningMn": "малтан гаргах"
    },
    {
        "kango": {
            "text": "限定する",
            "reading": "げんていする"
        },
        "wago": {
            "text": "限る",
            "reading": "かぎる"
        },
        "meaning": "to limit",
        "pos": "verb",
        "meaningMn": "хязгаарлах"
    },
    {
        "kango": {
            "text": "決意する",
            "reading": "けついする"
        },
        "wago": {
            "text": "心に決める",
            "reading": "こころにきめる"
        },
        "meaning": "to resolve",
        "pos": "verb",
        "meaningMn": "эрс шийдэх"
    }
];
