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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        }
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
        }
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
        }
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
        }
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
        }
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
        "pos": "verb"
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        "pos": "verb"
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
        }
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "noun"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
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
        "pos": "adjective"
    }
];
