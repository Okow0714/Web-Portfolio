// Reading passages for the Dokkai Reader, organized into two overlapping difficulty
// tracks (Foundation: N5->N3, Advanced: N3->N1) with N3 as the shared bridge level. Rather
// than 3 coarse JLPT-labeled tiers, each track's ~30 passages are ranked by a continuous
// weighted-difficulty score (average JLPT level of their vocabulary, computed against the
// sourced JLPT dataset) and split into 10 roughly-equal levels, easiest to hardest — a
// smoother progression than strict N5/N4/N3 buckets allow. Each level's "hint" is just the
// most common original authoring target among its 3 texts, shown for orientation only; it's
// not authoritative — actual difficulty is the computed score. See passages.js in the
// authoring toolchain for how each passage was written (real Tatoeba anchor sentence(s)
// embedded verbatim + original connecting prose) and verify-passages.js for how anchors and
// grading were checked. Word-level data (reading, English gloss) is auto-generated via
// kuromoji tokenization, not hand-typed.
const READING_TRACKS = [
    {
        "id": "foundation",
        "title": "Foundation · N5 → N3",
        "levels": [
            {
                "levelNum": 1,
                "hint": "N5",
                "texts": [
                    {
                        "id": "foundation-l1-1",
                        "title": "週末の予定",
                        "words": [
                            {
                                "surface": "今週",
                                "reading": "こんしゅう",
                                "en": "this week"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "忙しかっ",
                                "reading": "いそがしかっ",
                                "en": "busy (people, days)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "たくさん",
                                "reading": "たくさん",
                                "en": "many"
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "週末",
                                "reading": "しゅうまつ",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "休み",
                                "reading": "やすみ",
                                "en": "holiday"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "公園",
                                "reading": "こうえん",
                                "en": "a park"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "散歩",
                                "reading": "さんぽ",
                                "en": "walk"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "日曜日",
                                "reading": "にちようび",
                                "en": "Sunday"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "会お",
                                "reading": "あお",
                                "en": "to meet"
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一緒",
                                "reading": "いっしょ",
                                "en": "together"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "映画",
                                "reading": "えいが",
                                "en": "movie"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見",
                                "reading": "み",
                                "en": "to see"
                            },
                            {
                                "surface": "ましょ",
                                "reading": "ましょ",
                                "en": null
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "楽しみ",
                                "reading": "たのしみ",
                                "en": "pleasure"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l1-2",
                        "title": "公園の散歩",
                        "words": [
                            {
                                "surface": "天気",
                                "reading": "てんき",
                                "en": "weather"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "日",
                                "reading": "ひ",
                                "en": "day"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "「",
                                "reading": "「",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "散歩",
                                "reading": "さんぽ",
                                "en": "walk"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "ましょ",
                                "reading": "ましょ",
                                "en": null
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "」",
                                "reading": "」",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "言い",
                                "reading": "いい",
                                "en": "to say"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "たち",
                                "reading": "たち",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "近く",
                                "reading": "ちかく",
                                "en": "nearby"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "公園",
                                "reading": "こうえん",
                                "en": "a park"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "花",
                                "reading": "はな",
                                "en": "flower"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "たくさん",
                                "reading": "たくさん",
                                "en": "many"
                            },
                            {
                                "surface": "咲い",
                                "reading": "さい",
                                "en": "to bloom"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "写真",
                                "reading": "しゃしん",
                                "en": "a picture"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "たくさん",
                                "reading": "たくさん",
                                "en": "many"
                            },
                            {
                                "surface": "撮り",
                                "reading": "とり",
                                "en": "to take (a photo)"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "楽しい",
                                "reading": "たのしい",
                                "en": "enjoyable"
                            },
                            {
                                "surface": "散歩",
                                "reading": "さんぽ",
                                "en": "walk"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "また",
                                "reading": "また",
                                "en": null
                            },
                            {
                                "surface": "今度",
                                "reading": "こんど",
                                "en": "now"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l1-3",
                        "title": "犬と猫",
                        "words": [
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "家",
                                "reading": "いえ",
                                "en": "house"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "犬",
                                "reading": "いぬ",
                                "en": "dog"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "猫",
                                "reading": "ねこ",
                                "en": "cat"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "犬",
                                "reading": "いぬ",
                                "en": "dog"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "元気",
                                "reading": "げんき",
                                "en": "health(y)"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "走り",
                                "reading": "はしり",
                                "en": "to run"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "猫",
                                "reading": "ねこ",
                                "en": "cat"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "静か",
                                "reading": "しずか",
                                "en": "quiet"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつも",
                                "reading": "いつも",
                                "en": "always"
                            },
                            {
                                "surface": "寝",
                                "reading": "ね",
                                "en": "to sleep"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "猫",
                                "reading": "ねこ",
                                "en": "cat"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "好き",
                                "reading": "すき",
                                "en": "liking"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "犬",
                                "reading": "いぬ",
                                "en": "dog"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "大切",
                                "reading": "たいせつ",
                                "en": "important"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "家族",
                                "reading": "かぞく",
                                "en": "family"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "二",
                                "reading": "に",
                                "en": "two"
                            },
                            {
                                "surface": "匹",
                                "reading": "ひき",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "世話",
                                "reading": "せわ",
                                "en": "looking after"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "楽しい",
                                "reading": "たのしい",
                                "en": "enjoyable"
                            },
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 2,
                "hint": "N5",
                "texts": [
                    {
                        "id": "foundation-l2-1",
                        "title": "今年の冬",
                        "words": [
                            {
                                "surface": "今年",
                                "reading": "ことし",
                                "en": "this year"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "冬",
                                "reading": "ふゆ",
                                "en": "winter"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "寒い",
                                "reading": "さむい",
                                "en": "cold (in reference to weather)"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "去年",
                                "reading": "きょねん",
                                "en": "last year"
                            },
                            {
                                "surface": "より",
                                "reading": "より",
                                "en": null
                            },
                            {
                                "surface": "雪",
                                "reading": "ゆき",
                                "en": "snow"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "多い",
                                "reading": "おおい",
                                "en": "many"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "毎朝",
                                "reading": "まいあさ",
                                "en": "every morning"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "外",
                                "reading": "そと",
                                "en": "other"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "出る",
                                "reading": "でる",
                                "en": "to appear"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "大変",
                                "reading": "たいへん",
                                "en": "very"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "雪景色",
                                "reading": "ゆきげしき",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "きれい",
                                "reading": "きれい",
                                "en": "pretty"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "子供",
                                "reading": "こども",
                                "en": "child(ren)"
                            },
                            {
                                "surface": "たち",
                                "reading": "たち",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "雪だるま",
                                "reading": "ゆきだるま",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "作っ",
                                "reading": "つくっ",
                                "en": "to make"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "遊ん",
                                "reading": "あそん",
                                "en": "to play"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "昔",
                                "reading": "むかし",
                                "en": "old days"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "遊び",
                                "reading": "あそび",
                                "en": "to play"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "冬",
                                "reading": "ふゆ",
                                "en": "winter"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "好き",
                                "reading": "すき",
                                "en": "liking"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "季節",
                                "reading": "きせつ",
                                "en": "season (in reference to weather)"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l2-2",
                        "title": "今日の天気",
                        "words": [
                            {
                                "surface": "今日",
                                "reading": "きょう",
                                "en": "today"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "寒い",
                                "reading": "さむい",
                                "en": "cold (in reference to weather)"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "朝",
                                "reading": "あさ",
                                "en": "morning"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "雪",
                                "reading": "ゆき",
                                "en": "snow"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "降っ",
                                "reading": "ふっ",
                                "en": "to precipitate"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "風",
                                "reading": "かぜ",
                                "en": "wind"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "強く",
                                "reading": "つよく",
                                "en": "strong"
                            },
                            {
                                "surface": "なっ",
                                "reading": "なっ",
                                "en": "to become"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "学校",
                                "reading": "がっこう",
                                "en": "a school"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行く",
                                "reading": "いく",
                                "en": "to go"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "大変",
                                "reading": "たいへん",
                                "en": "very"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "雪",
                                "reading": "ゆき",
                                "en": "snow"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "きれい",
                                "reading": "きれい",
                                "en": "pretty"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "雪だるま",
                                "reading": "ゆきだるま",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "作り",
                                "reading": "つくり",
                                "en": "to make"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "楽しかっ",
                                "reading": "たのしかっ",
                                "en": "enjoyable"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "また",
                                "reading": "また",
                                "en": null
                            },
                            {
                                "surface": "雪",
                                "reading": "ゆき",
                                "en": "snow"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "降る",
                                "reading": "ふる",
                                "en": "to precipitate"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l2-3",
                        "title": "寝る時間",
                        "words": [
                            {
                                "surface": "子供",
                                "reading": "こども",
                                "en": "child(ren)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "まだ",
                                "reading": "まだ",
                                "en": "yet"
                            },
                            {
                                "surface": "テレビ",
                                "reading": "てれび",
                                "en": "television"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見",
                                "reading": "み",
                                "en": "to see"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "もう",
                                "reading": "もう",
                                "en": "already"
                            },
                            {
                                "surface": "九",
                                "reading": "きゅう",
                                "en": "nine"
                            },
                            {
                                "surface": "時",
                                "reading": "じ",
                                "en": "letter"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "「",
                                "reading": "「",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "寝る",
                                "reading": "ねる",
                                "en": "to sleep"
                            },
                            {
                                "surface": "時間",
                                "reading": "じかん",
                                "en": "time"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "よ",
                                "reading": "よ",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "」",
                                "reading": "」",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "言い",
                                "reading": "いい",
                                "en": "to say"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "子供",
                                "reading": "こども",
                                "en": "child(ren)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "嫌",
                                "reading": "いや",
                                "en": "disagreeable"
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "部屋",
                                "reading": "へや",
                                "en": "a room"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "歯",
                                "reading": "は",
                                "en": "tooth"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "磨い",
                                "reading": "みがい",
                                "en": "to brush (teeth)"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "ベッド",
                                "reading": "べっど",
                                "en": "bed"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "入り",
                                "reading": "はいり",
                                "en": "to enter"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "すぐ",
                                "reading": "すぐ",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "眠っ",
                                "reading": "ねむっ",
                                "en": "to sleep"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "しまい",
                                "reading": "しまい",
                                "en": "sisters"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "かわいい",
                                "reading": "かわいい",
                                "en": "cute"
                            },
                            {
                                "surface": "寝顔",
                                "reading": "ねがお",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 3,
                "hint": "N5",
                "texts": [
                    {
                        "id": "foundation-l3-1",
                        "title": "駅で待ち合わせ",
                        "words": [
                            {
                                "surface": "今朝",
                                "reading": "けさ",
                                "en": "this morning"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "電車",
                                "reading": "でんしゃ",
                                "en": "electric train"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "出かけ",
                                "reading": "でかけ",
                                "en": "to go out"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "駅",
                                "reading": "えき",
                                "en": "station"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "行っ",
                                "reading": "いっ",
                                "en": "to go"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "駅",
                                "reading": "えき",
                                "en": "station"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "待っ",
                                "reading": "まっ",
                                "en": "to wait"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "電車",
                                "reading": "でんしゃ",
                                "en": "electric train"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "遅れ",
                                "reading": "おくれ",
                                "en": "to (be) become late"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "二",
                                "reading": "に",
                                "en": "two"
                            },
                            {
                                "surface": "人",
                                "reading": "にん",
                                "en": "man"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "話し",
                                "reading": "はなし",
                                "en": "to speak"
                            },
                            {
                                "surface": "ながら",
                                "reading": "ながら",
                                "en": null
                            },
                            {
                                "surface": "待ち",
                                "reading": "まち",
                                "en": "to wait"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "楽しい",
                                "reading": "たのしい",
                                "en": "enjoyable"
                            },
                            {
                                "surface": "時間",
                                "reading": "じかん",
                                "en": "time"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "電車",
                                "reading": "でんしゃ",
                                "en": "electric train"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "来",
                                "reading": "き",
                                "en": "to come"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一緒",
                                "reading": "いっしょ",
                                "en": "together"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "乗り",
                                "reading": "のり",
                                "en": "to get on"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l3-2",
                        "title": "学校生活",
                        "words": [
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "学校",
                                "reading": "がっこう",
                                "en": "a school"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "勉強",
                                "reading": "べんきょう",
                                "en": "study"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "昨日",
                                "reading": "きのう",
                                "en": "yesterday"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "テスト",
                                "reading": "てすと",
                                "en": "test"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "難しかっ",
                                "reading": "むずかしかっ",
                                "en": "difficult"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "自分",
                                "reading": "じぶん",
                                "en": "myself"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "負け",
                                "reading": "まけ",
                                "en": "to lose (a game) (v.i.)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "先生",
                                "reading": "せんせい",
                                "en": "teacher"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "優しく",
                                "reading": "やさしく",
                                "en": "kind (person)"
                            },
                            {
                                "surface": "教え",
                                "reading": "おしえ",
                                "en": "to teach"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "次",
                                "reading": "つぎ",
                                "en": "next"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "もっと",
                                "reading": "もっと",
                                "en": "more"
                            },
                            {
                                "surface": "頑張り",
                                "reading": "がんばり",
                                "en": "to try one's best"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "応援",
                                "reading": "おうえん",
                                "en": "aid"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l3-3",
                        "title": "自己紹介",
                        "words": [
                            {
                                "surface": "はじめまして",
                                "reading": "はじめまして",
                                "en": "How do you do"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "マリア",
                                "reading": "まりあ",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "学生",
                                "reading": "がくせい",
                                "en": "student"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "あなた",
                                "reading": "あなた",
                                "en": "you"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "名前",
                                "reading": "なまえ",
                                "en": "name"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "？",
                                "reading": "？",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "よろしく",
                                "reading": "よろしく",
                                "en": null
                            },
                            {
                                "surface": "お願い",
                                "reading": "おねがい",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "日本語",
                                "reading": "にほんご",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "勉強",
                                "reading": "べんきょう",
                                "en": "study"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "まだ",
                                "reading": "まだ",
                                "en": "yet"
                            },
                            {
                                "surface": "難しい",
                                "reading": "むずかしい",
                                "en": "difficult"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "頑張り",
                                "reading": "がんばり",
                                "en": "to try one's best"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "ましょ",
                                "reading": "ましょ",
                                "en": null
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 4,
                "hint": "N3",
                "texts": [
                    {
                        "id": "foundation-l4-1",
                        "title": "料理と私",
                        "words": [
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "小さい",
                                "reading": "ちいさい",
                                "en": "small"
                            },
                            {
                                "surface": "ころ",
                                "reading": "ころ",
                                "en": null
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "料理",
                                "reading": "りょうり",
                                "en": "cooking"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "好き",
                                "reading": "すき",
                                "en": "liking"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "母",
                                "reading": "はは",
                                "en": "(my) mother"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "台所",
                                "reading": "だいどころ",
                                "en": "kitchen"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "料理",
                                "reading": "りょうり",
                                "en": "cooking"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "教え",
                                "reading": "おしえ",
                                "en": "to teach"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "最初",
                                "reading": "さいしょ",
                                "en": "beginning"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "簡単",
                                "reading": "かんたん",
                                "en": "simple"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "卵焼き",
                                "reading": "たまごやき",
                                "en": null
                            },
                            {
                                "surface": "しか",
                                "reading": "しか",
                                "en": null
                            },
                            {
                                "surface": "作れ",
                                "reading": "つくれ",
                                "en": null
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "ずつ",
                                "reading": "ずつ",
                                "en": null
                            },
                            {
                                "surface": "上手",
                                "reading": "じょうず",
                                "en": "be good at"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今",
                                "reading": "いま",
                                "en": "now"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "色々",
                                "reading": "いろいろ",
                                "en": "various"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "料理",
                                "reading": "りょうり",
                                "en": "cooking"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "作る",
                                "reading": "つくる",
                                "en": "to make"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "でき",
                                "reading": "でき",
                                "en": "to be able to (to accomplish)"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "料理",
                                "reading": "りょうり",
                                "en": "cooking"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "得意",
                                "reading": "とくい",
                                "en": "pride"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "特に",
                                "reading": "とくに",
                                "en": "particularly"
                            },
                            {
                                "surface": "和食",
                                "reading": "わしょく",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "好き",
                                "reading": "すき",
                                "en": "liking"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "家",
                                "reading": "いえ",
                                "en": "house"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "呼ん",
                                "reading": "よん",
                                "en": "to call (one's name)"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "手作り",
                                "reading": "てづくり",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "料理",
                                "reading": "りょうり",
                                "en": "cooking"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "出す",
                                "reading": "だす",
                                "en": "to take (something) out"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "楽しみ",
                                "reading": "たのしみ",
                                "en": "pleasure"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつか",
                                "reading": "いつか",
                                "en": "sometime"
                            },
                            {
                                "surface": "自分",
                                "reading": "じぶん",
                                "en": "myself"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "レストラン",
                                "reading": "れすとらん",
                                "en": "restaurant"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "持つ",
                                "reading": "もつ",
                                "en": "to hold"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l4-2",
                        "title": "寒い日",
                        "words": [
                            {
                                "surface": "今日",
                                "reading": "きょう",
                                "en": "today"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "朝",
                                "reading": "あさ",
                                "en": "morning"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "寒かっ",
                                "reading": "さむかっ",
                                "en": "cold (in reference to weather)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "大変",
                                "reading": "たいへん",
                                "en": "very"
                            },
                            {
                                "surface": "寒く",
                                "reading": "さむく",
                                "en": "cold (in reference to weather)"
                            },
                            {
                                "surface": "なっ",
                                "reading": "なっ",
                                "en": "to become"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "コート",
                                "reading": "こーと",
                                "en": "coat"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "着",
                                "reading": "き",
                                "en": "to put on (clothes above your waist)"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "マフラー",
                                "reading": "まふらー",
                                "en": "a winter scarf"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "巻き",
                                "reading": "まき",
                                "en": "to wind"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "手",
                                "reading": "て",
                                "en": "hand"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "冷たかっ",
                                "reading": "つめたかっ",
                                "en": "cold (things, people)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "早く",
                                "reading": "はやく",
                                "en": "early"
                            },
                            {
                                "surface": "家",
                                "reading": "いえ",
                                "en": "house"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "帰り",
                                "reading": "かえり",
                                "en": "to go back"
                            },
                            {
                                "surface": "たかっ",
                                "reading": "たかっ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家",
                                "reading": "いえ",
                                "en": "house"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "着い",
                                "reading": "つい",
                                "en": "to arrive at"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "温かい",
                                "reading": "あたたかい",
                                "en": "warm"
                            },
                            {
                                "surface": "お茶",
                                "reading": "おちゃ",
                                "en": "(green) tea"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "飲み",
                                "reading": "のみ",
                                "en": "to drink"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "気持ち",
                                "reading": "きもち",
                                "en": "feeling"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "よかっ",
                                "reading": "よかっ",
                                "en": "good"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l4-3",
                        "title": "買い物",
                        "words": [
                            {
                                "surface": "週末",
                                "reading": "しゅうまつ",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "デパート",
                                "reading": "でぱーと",
                                "en": "(abbr.) department store"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "新しい",
                                "reading": "あたらしい",
                                "en": "new"
                            },
                            {
                                "surface": "靴",
                                "reading": "くつ",
                                "en": "shoes"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "欲しかっ",
                                "reading": "ほしかっ",
                                "en": "to want"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "素敵",
                                "reading": "すてき",
                                "en": "lovely"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "靴",
                                "reading": "くつ",
                                "en": "shoes"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見つけ",
                                "reading": "みつけ",
                                "en": "to discover"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "値段",
                                "reading": "ねだん",
                                "en": "price"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "高",
                                "reading": "たか",
                                "en": "tall"
                            },
                            {
                                "surface": "すぎる",
                                "reading": "すぎる",
                                "en": "to exceed"
                            },
                            {
                                "surface": "！",
                                "reading": "！",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "結局",
                                "reading": "けっきょく",
                                "en": "after all"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "買い",
                                "reading": "かい",
                                "en": "to buy"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "代わり",
                                "reading": "かわり",
                                "en": "substitute"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "安い",
                                "reading": "やすい",
                                "en": "inexpensive"
                            },
                            {
                                "surface": "店",
                                "reading": "みせ",
                                "en": "store"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "靴下",
                                "reading": "くつした",
                                "en": "socks"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "買い",
                                "reading": "かい",
                                "en": "to buy"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "残念",
                                "reading": "ざんねん",
                                "en": "regret"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 5,
                "hint": "N4",
                "texts": [
                    {
                        "id": "foundation-l5-1",
                        "title": "一日のスケジュール",
                        "words": [
                            {
                                "surface": "今日",
                                "reading": "きょう",
                                "en": "today"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "早く",
                                "reading": "はやく",
                                "en": "early"
                            },
                            {
                                "surface": "起き",
                                "reading": "おき",
                                "en": "to get up (e.g., from sleeping)"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "朝",
                                "reading": "あさ",
                                "en": "morning"
                            },
                            {
                                "surface": "ご飯",
                                "reading": "ごはん",
                                "en": "rice (cooked)"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "食べ",
                                "reading": "たべ",
                                "en": "to eat"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "会社",
                                "reading": "かいしゃ",
                                "en": "company"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "忙しかっ",
                                "reading": "いそがしかっ",
                                "en": "busy (people, days)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "会議",
                                "reading": "かいぎ",
                                "en": "business meeting"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "たくさん",
                                "reading": "たくさん",
                                "en": "many"
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "夕方",
                                "reading": "ゆうがた",
                                "en": "late afternoon (typically just before dinner time)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "五",
                                "reading": "ご",
                                "en": "five"
                            },
                            {
                                "surface": "時",
                                "reading": "じ",
                                "en": "letter"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "もうすぐ",
                                "reading": "もうすぐ",
                                "en": "very soon"
                            },
                            {
                                "surface": "家",
                                "reading": "いえ",
                                "en": "house"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "帰れ",
                                "reading": "かえれ",
                                "en": null
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今日",
                                "reading": "きょう",
                                "en": "today"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "一",
                                "reading": "いち",
                                "en": "one"
                            },
                            {
                                "surface": "日",
                                "reading": "にち",
                                "en": "day"
                            },
                            {
                                "surface": "頑張り",
                                "reading": "がんばり",
                                "en": "to try one's best"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l5-2",
                        "title": "姉の仕事",
                        "words": [
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "姉",
                                "reading": "あね",
                                "en": "(my) older sister (humble)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "学校",
                                "reading": "がっこう",
                                "en": "a school"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "働い",
                                "reading": "はたらい",
                                "en": "to work"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼女",
                                "reading": "かのじょ",
                                "en": "girlfriend"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "先生",
                                "reading": "せんせい",
                                "en": "teacher"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "朝",
                                "reading": "あさ",
                                "en": "morning"
                            },
                            {
                                "surface": "早く",
                                "reading": "はやく",
                                "en": "early"
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "生徒",
                                "reading": "せいと",
                                "en": "student"
                            },
                            {
                                "surface": "たち",
                                "reading": "たち",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "人気",
                                "reading": "にんき",
                                "en": "sign of life"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "休み",
                                "reading": "やすみ",
                                "en": "holiday"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "日",
                                "reading": "ひ",
                                "en": "day"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "授業",
                                "reading": "じゅぎょう",
                                "en": "a class (of school)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "準備",
                                "reading": "じゅんび",
                                "en": "prepare"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "大変",
                                "reading": "たいへん",
                                "en": "very"
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "楽し",
                                "reading": "たのし",
                                "en": "enjoyable"
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "見え",
                                "reading": "みえ",
                                "en": "to be visible"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "姉",
                                "reading": "あね",
                                "en": "(my) older sister (humble)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l5-3",
                        "title": "空の飛行機",
                        "words": [
                            {
                                "surface": "公園",
                                "reading": "こうえん",
                                "en": "a park"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "空",
                                "reading": "そら",
                                "en": "empty"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見",
                                "reading": "み",
                                "en": "to see"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "飛行機",
                                "reading": "ひこうき",
                                "en": "airplane"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "見え",
                                "reading": "みえ",
                                "en": "to be visible"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "高い",
                                "reading": "たかい",
                                "en": "tall"
                            },
                            {
                                "surface": "ところ",
                                "reading": "ところ",
                                "en": "place"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "飛ん",
                                "reading": "とん",
                                "en": "to fly"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "子供",
                                "reading": "こども",
                                "en": "child(ren)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "ころ",
                                "reading": "ころ",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "パイロット",
                                "reading": "ぱいろっと",
                                "en": "pilot"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思っ",
                                "reading": "おもっ",
                                "en": "to think"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今",
                                "reading": "いま",
                                "en": "now"
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "空",
                                "reading": "そら",
                                "en": "empty"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見る",
                                "reading": "みる",
                                "en": "to see"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "わくわく",
                                "reading": "わくわく",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつか",
                                "reading": "いつか",
                                "en": "sometime"
                            },
                            {
                                "surface": "飛行機",
                                "reading": "ひこうき",
                                "en": "airplane"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "乗っ",
                                "reading": "のっ",
                                "en": "to get on"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "旅行",
                                "reading": "りょこう",
                                "en": "travel"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 6,
                "hint": "N5",
                "texts": [
                    {
                        "id": "foundation-l6-1",
                        "title": "本屋にて",
                        "words": [
                            {
                                "surface": "週末",
                                "reading": "しゅうまつ",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "本屋",
                                "reading": "ほんや",
                                "en": null
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "新しい",
                                "reading": "あたらしい",
                                "en": "new"
                            },
                            {
                                "surface": "小説",
                                "reading": "しょうせつ",
                                "en": "novel"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "探し",
                                "reading": "さがし",
                                "en": "to search"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "「",
                                "reading": "「",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "本",
                                "reading": "ほん",
                                "en": "book"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "欲しい",
                                "reading": "ほしい",
                                "en": "to want"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "」",
                                "reading": "」",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "ずっと",
                                "reading": "ずっと",
                                "en": "for a long time"
                            },
                            {
                                "surface": "思っ",
                                "reading": "おもっ",
                                "en": "to think"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "店員",
                                "reading": "てんいん",
                                "en": "clerk"
                            },
                            {
                                "surface": "さん",
                                "reading": "さん",
                                "en": "acid"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "聞い",
                                "reading": "きい",
                                "en": "to hear"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "本",
                                "reading": "ほん",
                                "en": "book"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見つけ",
                                "reading": "みつけ",
                                "en": "to discover"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家",
                                "reading": "いえ",
                                "en": "house"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "帰っ",
                                "reading": "かえっ",
                                "en": "to go back"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "すぐ",
                                "reading": "すぐ",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "読み",
                                "reading": "よみ",
                                "en": "to read"
                            },
                            {
                                "surface": "始め",
                                "reading": "はじめ",
                                "en": "to start"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "面白い",
                                "reading": "おもしろい",
                                "en": "interesting"
                            },
                            {
                                "surface": "話",
                                "reading": "はなし",
                                "en": "talk (chat)"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l6-2",
                        "title": "祖父の毎日",
                        "words": [
                            {
                                "surface": "祖父",
                                "reading": "そふ",
                                "en": "grandfather"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "昔",
                                "reading": "むかし",
                                "en": "old days"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "会社",
                                "reading": "かいしゃ",
                                "en": "company"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "忙しく",
                                "reading": "いそがしく",
                                "en": "busy (people, days)"
                            },
                            {
                                "surface": "働い",
                                "reading": "はたらい",
                                "en": "to work"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "年",
                                "reading": "とし",
                                "en": "year"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "取っ",
                                "reading": "とっ",
                                "en": "to take (a class)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今",
                                "reading": "いま",
                                "en": "now"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "辞め",
                                "reading": "やめ",
                                "en": "to retire"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家",
                                "reading": "いえ",
                                "en": "house"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "ゆっくり",
                                "reading": "ゆっくり",
                                "en": null
                            },
                            {
                                "surface": "過ごし",
                                "reading": "すごし",
                                "en": "to pass"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "庭",
                                "reading": "にわ",
                                "en": "garden"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "花",
                                "reading": "はな",
                                "en": "flower"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "水",
                                "reading": "みず",
                                "en": "water"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "やっ",
                                "reading": "やっ",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "穏やか",
                                "reading": "おだやか",
                                "en": "calm"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "顔",
                                "reading": "かお",
                                "en": "face (body part)"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "あんな",
                                "reading": "あんな",
                                "en": "such"
                            },
                            {
                                "surface": "年寄り",
                                "reading": "としより",
                                "en": "old people"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l6-3",
                        "title": "遅刻した朝",
                        "words": [
                            {
                                "surface": "今朝",
                                "reading": "けさ",
                                "en": "this morning"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "目覚まし",
                                "reading": "めざまし",
                                "en": "alarm-clock"
                            },
                            {
                                "surface": "時計",
                                "reading": "とけい",
                                "en": "a watch"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "鳴り",
                                "reading": "なり",
                                "en": "to sound"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "目",
                                "reading": "め",
                                "en": "eye(s)"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "覚め",
                                "reading": "さめ",
                                "en": "to wake"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "とき",
                                "reading": "とき",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "もう",
                                "reading": "もう",
                                "en": "already"
                            },
                            {
                                "surface": "七",
                                "reading": "なな",
                                "en": "seven"
                            },
                            {
                                "surface": "時半",
                                "reading": "じはん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "急い",
                                "reading": "いそい",
                                "en": "to hurry"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "準備",
                                "reading": "じゅんび",
                                "en": "prepare"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "間に合い",
                                "reading": "まにあい",
                                "en": "to be in time for"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "学校",
                                "reading": "がっこう",
                                "en": "a school"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "遅刻",
                                "reading": "ちこく",
                                "en": "lateness"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "先生",
                                "reading": "せんせい",
                                "en": "teacher"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "理由",
                                "reading": "りゆう",
                                "en": "reason"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "説明",
                                "reading": "せつめい",
                                "en": "explanation"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "先生",
                                "reading": "せんせい",
                                "en": "teacher"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "怒り",
                                "reading": "おこり",
                                "en": "to get angry"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "許し",
                                "reading": "ゆるし",
                                "en": "to permit"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "明日",
                                "reading": "あした",
                                "en": "tomorrow"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "もっと",
                                "reading": "もっと",
                                "en": "more"
                            },
                            {
                                "surface": "早く",
                                "reading": "はやく",
                                "en": "early"
                            },
                            {
                                "surface": "寝よ",
                                "reading": "ねよ",
                                "en": "to sleep"
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "同じ",
                                "reading": "おなじ",
                                "en": "same"
                            },
                            {
                                "surface": "失敗",
                                "reading": "しっぱい",
                                "en": "failure"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "繰り返し",
                                "reading": "くりかえし",
                                "en": "to repeat"
                            },
                            {
                                "surface": "たく",
                                "reading": "たく",
                                "en": null
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 7,
                "hint": "N4",
                "texts": [
                    {
                        "id": "foundation-l7-1",
                        "title": "友達への応援",
                        "words": [
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "新しい",
                                "reading": "あたらしい",
                                "en": "new"
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "挑戦",
                                "reading": "ちょうせん",
                                "en": "challenge"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "不安",
                                "reading": "ふあん",
                                "en": "anxiety"
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "「",
                                "reading": "「",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "大丈夫",
                                "reading": "だいじょうぶ",
                                "en": "It's ok (all right)"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "かない",
                                "reading": "かない",
                                "en": "(one's own) wife"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "」",
                                "reading": "」",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "言い",
                                "reading": "いい",
                                "en": "to say"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "笑顔",
                                "reading": "えがお",
                                "en": "smile (on one's face)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "努力",
                                "reading": "どりょく",
                                "en": "great effort"
                            },
                            {
                                "surface": "すれ",
                                "reading": "すれ",
                                "en": "to do"
                            },
                            {
                                "surface": "ば",
                                "reading": "ば",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "きっと",
                                "reading": "きっと",
                                "en": "surely"
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "結果",
                                "reading": "けっか",
                                "en": "result"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "出る",
                                "reading": "でる",
                                "en": "to appear"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "応援",
                                "reading": "おうえん",
                                "en": "aid"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "続け",
                                "reading": "つづけ",
                                "en": "to continue"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l7-2",
                        "title": "冒険好きな友人",
                        "words": [
                            {
                                "surface": "大学",
                                "reading": "だいがく",
                                "en": "college"
                            },
                            {
                                "surface": "時代",
                                "reading": "じだい",
                                "en": "age"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつも",
                                "reading": "いつも",
                                "en": "always"
                            },
                            {
                                "surface": "珍しい",
                                "reading": "めずらしい",
                                "en": "unusual"
                            },
                            {
                                "surface": "場所",
                                "reading": "ばしょ",
                                "en": "place"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "旅",
                                "reading": "たび",
                                "en": "travel"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "冒険",
                                "reading": "ぼうけん",
                                "en": "risk"
                            },
                            {
                                "surface": "好き",
                                "reading": "すき",
                                "en": "liking"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一",
                                "reading": "いち",
                                "en": "one"
                            },
                            {
                                "surface": "人",
                                "reading": "にん",
                                "en": "man"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "山",
                                "reading": "やま",
                                "en": "mountain"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "登っ",
                                "reading": "のぼっ",
                                "en": "to climb"
                            },
                            {
                                "surface": "たり",
                                "reading": "たり",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "知ら",
                                "reading": "しら",
                                "en": "to know"
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "国",
                                "reading": "くに",
                                "en": "country"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "訪れ",
                                "reading": "おとずれ",
                                "en": "to visit"
                            },
                            {
                                "surface": "たり",
                                "reading": "たり",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "話",
                                "reading": "はなし",
                                "en": "talk (chat)"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "聞く",
                                "reading": "きく",
                                "en": "to hear"
                            },
                            {
                                "surface": "たび",
                                "reading": "たび",
                                "en": "travel"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "遠く",
                                "reading": "とおく",
                                "en": "far away"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "行っ",
                                "reading": "いっ",
                                "en": "to go"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "み",
                                "reading": "み",
                                "en": "fruit"
                            },
                            {
                                "surface": "たく",
                                "reading": "たく",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつか",
                                "reading": "いつか",
                                "en": "sometime"
                            },
                            {
                                "surface": "一緒",
                                "reading": "いっしょ",
                                "en": "together"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "旅行",
                                "reading": "りょこう",
                                "en": "travel"
                            },
                            {
                                "surface": "でき",
                                "reading": "でき",
                                "en": "to be able to (to accomplish)"
                            },
                            {
                                "surface": "たら",
                                "reading": "たら",
                                "en": null
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l7-3",
                        "title": "新しい同僚",
                        "words": [
                            {
                                "surface": "先月",
                                "reading": "せんげつ",
                                "en": "last month"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "新しい",
                                "reading": "あたらしい",
                                "en": "new"
                            },
                            {
                                "surface": "同僚",
                                "reading": "どうりょう",
                                "en": "colleague"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "来",
                                "reading": "き",
                                "en": "to come"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつも",
                                "reading": "いつも",
                                "en": "always"
                            },
                            {
                                "surface": "笑顔",
                                "reading": "えがお",
                                "en": "smile (on one's face)"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "丁寧",
                                "reading": "ていねい",
                                "en": "polite"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "分から",
                                "reading": "わから",
                                "en": "to understand"
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": "a certain..."
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "すぐ",
                                "reading": "すぐ",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "教え",
                                "reading": "おしえ",
                                "en": "to teach"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "おかげ",
                                "reading": "おかげ",
                                "en": "thanks or owing to"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "楽しく",
                                "reading": "たのしく",
                                "en": "enjoyable"
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "これから",
                                "reading": "これから",
                                "en": "from now on"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "一緒",
                                "reading": "いっしょ",
                                "en": "together"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "頑張り",
                                "reading": "がんばり",
                                "en": "to try one's best"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 8,
                "hint": "N3",
                "texts": [
                    {
                        "id": "foundation-l8-1",
                        "title": "郵便局にて",
                        "words": [
                            {
                                "surface": "郵便",
                                "reading": "ゆうびん",
                                "en": "mail"
                            },
                            {
                                "surface": "局",
                                "reading": "きょく",
                                "en": "office"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "手紙",
                                "reading": "てがみ",
                                "en": "letter"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "出し",
                                "reading": "だし",
                                "en": "to take (something) out"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "「",
                                "reading": "「",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "封筒",
                                "reading": "ふうとう",
                                "en": "envelope"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "ください",
                                "reading": "ください",
                                "en": "(hon.) to give"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "」",
                                "reading": "」",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "店員",
                                "reading": "てんいん",
                                "en": "clerk"
                            },
                            {
                                "surface": "さん",
                                "reading": "さん",
                                "en": "acid"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "言い",
                                "reading": "いい",
                                "en": "to say"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "店員",
                                "reading": "てんいん",
                                "en": "clerk"
                            },
                            {
                                "surface": "さん",
                                "reading": "さん",
                                "en": "acid"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "親切",
                                "reading": "しんせつ",
                                "en": "kindness"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "手伝っ",
                                "reading": "てつだっ",
                                "en": "to help"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "切手",
                                "reading": "きって",
                                "en": "postal (postage) stamps"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "買っ",
                                "reading": "かっ",
                                "en": "to buy"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "手紙",
                                "reading": "てがみ",
                                "en": "letter"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "出し",
                                "reading": "だし",
                                "en": "to take (something) out"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "早く",
                                "reading": "はやく",
                                "en": "early"
                            },
                            {
                                "surface": "届く",
                                "reading": "とどく",
                                "en": "to reach"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l8-2",
                        "title": "私の夢",
                        "words": [
                            {
                                "surface": "子供",
                                "reading": "こども",
                                "en": "child(ren)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "とき",
                                "reading": "とき",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "宇宙",
                                "reading": "うちゅう",
                                "en": "universe"
                            },
                            {
                                "surface": "飛行",
                                "reading": "ひこう",
                                "en": "aviation"
                            },
                            {
                                "surface": "士",
                                "reading": "し",
                                "en": "death"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思っ",
                                "reading": "おもっ",
                                "en": "to think"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今",
                                "reading": "いま",
                                "en": "now"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "違う",
                                "reading": "ちがう",
                                "en": "to be different"
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "まだ",
                                "reading": "まだ",
                                "en": "yet"
                            },
                            {
                                "surface": "心",
                                "reading": "こころ",
                                "en": "heart"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "中",
                                "reading": "なか",
                                "en": "inside"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": "a certain..."
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつか",
                                "reading": "いつか",
                                "en": "sometime"
                            },
                            {
                                "surface": "宇宙",
                                "reading": "うちゅう",
                                "en": "universe"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行く",
                                "reading": "いく",
                                "en": "to go"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "簡単",
                                "reading": "かんたん",
                                "en": "simple"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": "there isn't"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "分かっ",
                                "reading": "わかっ",
                                "en": "to understand"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "諦め",
                                "reading": "あきらめ",
                                "en": "to give up"
                            },
                            {
                                "surface": "たく",
                                "reading": "たく",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "ずつ",
                                "reading": "ずつ",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "近づく",
                                "reading": "ちかづく",
                                "en": null
                            },
                            {
                                "surface": "努力",
                                "reading": "どりょく",
                                "en": "great effort"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家族",
                                "reading": "かぞく",
                                "en": "family"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "応援",
                                "reading": "おうえん",
                                "en": "aid"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "笑わ",
                                "reading": "わらわ",
                                "en": "to laugh"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "気",
                                "reading": "き",
                                "en": "spirit"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "それぞれ",
                                "reading": "それぞれ",
                                "en": "each"
                            },
                            {
                                "surface": "違う",
                                "reading": "ちがう",
                                "en": "to be different"
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "持っ",
                                "reading": "もっ",
                                "en": "to hold"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "自分",
                                "reading": "じぶん",
                                "en": "myself"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "信じる",
                                "reading": "しんじる",
                                "en": "to believe"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "一番",
                                "reading": "いちばん",
                                "en": "best (most)"
                            },
                            {
                                "surface": "大切",
                                "reading": "たいせつ",
                                "en": "important"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l8-3",
                        "title": "母の禁煙",
                        "words": [
                            {
                                "surface": "母",
                                "reading": "はは",
                                "en": "(my) mother"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "長い",
                                "reading": "ながい",
                                "en": "long"
                            },
                            {
                                "surface": "間",
                                "reading": "ま",
                                "en": "space"
                            },
                            {
                                "surface": "タバコ",
                                "reading": "たばこ",
                                "en": "tobacco"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "吸っ",
                                "reading": "すっ",
                                "en": "to breathe in"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "しかし",
                                "reading": "しかし",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "健康",
                                "reading": "けんこう",
                                "en": "health(y)"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "考え",
                                "reading": "かんがえ",
                                "en": "to think (about)"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼女",
                                "reading": "かのじょ",
                                "en": "girlfriend"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "禁煙",
                                "reading": "きんえん",
                                "en": "No Smoking"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "最初",
                                "reading": "さいしょ",
                                "en": "beginning"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "苦し",
                                "reading": "くるし",
                                "en": "tough"
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "ずつ",
                                "reading": "ずつ",
                                "en": null
                            },
                            {
                                "surface": "体調",
                                "reading": "たいちょう",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "なっ",
                                "reading": "なっ",
                                "en": "to become"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いき",
                                "reading": "いき",
                                "en": "chic"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今",
                                "reading": "いま",
                                "en": "now"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "以前",
                                "reading": "いぜん",
                                "en": "in the past"
                            },
                            {
                                "surface": "より",
                                "reading": "より",
                                "en": null
                            },
                            {
                                "surface": "ずっと",
                                "reading": "ずっと",
                                "en": "for a long time"
                            },
                            {
                                "surface": "元気",
                                "reading": "げんき",
                                "en": "health(y)"
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "強い",
                                "reading": "つよい",
                                "en": "strong"
                            },
                            {
                                "surface": "意志",
                                "reading": "いし",
                                "en": "will"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "感心",
                                "reading": "かんしん",
                                "en": "admiration"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 9,
                "hint": "N3",
                "texts": [
                    {
                        "id": "foundation-l9-1",
                        "title": "真面目な同僚",
                        "words": [
                            {
                                "surface": "同じ",
                                "reading": "おなじ",
                                "en": "same"
                            },
                            {
                                "surface": "部署",
                                "reading": "ぶしょ",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "真面目",
                                "reading": "まじめ",
                                "en": "diligent"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼女",
                                "reading": "かのじょ",
                                "en": "girlfriend"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "働く",
                                "reading": "はたらく",
                                "en": "to work"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "残業",
                                "reading": "ざんぎょう",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "嫌がら",
                                "reading": "いやがら",
                                "en": "reluctant"
                            },
                            {
                                "surface": "ず",
                                "reading": "ず",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつも",
                                "reading": "いつも",
                                "en": "always"
                            },
                            {
                                "surface": "笑顔",
                                "reading": "えがお",
                                "en": "smile (on one's face)"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "周り",
                                "reading": "まわり",
                                "en": "surroundings"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "信頼",
                                "reading": "しんらい",
                                "en": "reliance"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "彼女",
                                "reading": "かのじょ",
                                "en": "girlfriend"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見習い",
                                "reading": "みならい",
                                "en": "to follow another's example"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思っ",
                                "reading": "おもっ",
                                "en": "to think"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一緒",
                                "reading": "いっしょ",
                                "en": "together"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "働け",
                                "reading": "はたらけ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "嬉しい",
                                "reading": "うれしい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l9-2",
                        "title": "定時に帰る同僚",
                        "words": [
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "遅く",
                                "reading": "おそく",
                                "en": "slow"
                            },
                            {
                                "surface": "まで",
                                "reading": "まで",
                                "en": null
                            },
                            {
                                "surface": "働い",
                                "reading": "はたらい",
                                "en": "to work"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "同僚",
                                "reading": "どうりょう",
                                "en": "colleague"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "最近",
                                "reading": "さいきん",
                                "en": "recently"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "定時",
                                "reading": "ていじ",
                                "en": "presentation"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "帰る",
                                "reading": "かえる",
                                "en": "to go back"
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今日",
                                "reading": "きょう",
                                "en": "today"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼女",
                                "reading": "かのじょ",
                                "en": "girlfriend"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "帰宅",
                                "reading": "きたく",
                                "en": "returning home"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "理由",
                                "reading": "りゆう",
                                "en": "reason"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "聞く",
                                "reading": "きく",
                                "en": "to hear"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家族",
                                "reading": "かぞく",
                                "en": "family"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "時間",
                                "reading": "じかん",
                                "en": "time"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "大切",
                                "reading": "たいせつ",
                                "en": "important"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "話し",
                                "reading": "はなし",
                                "en": "to speak"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "だけ",
                                "reading": "だけ",
                                "en": null
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "なく",
                                "reading": "なく",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "生活",
                                "reading": "せいかつ",
                                "en": "living"
                            },
                            {
                                "surface": "全体",
                                "reading": "ぜんたい",
                                "en": "whole"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "バランス",
                                "reading": "ばらんす",
                                "en": "balance"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "考える",
                                "reading": "かんがえる",
                                "en": "to think (about)"
                            },
                            {
                                "surface": "姿勢",
                                "reading": "しせい",
                                "en": "attitude"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "感心",
                                "reading": "かんしん",
                                "en": "admiration"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "見習い",
                                "reading": "みならい",
                                "en": "to follow another's example"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l9-3",
                        "title": "親友の結婚",
                        "words": [
                            {
                                "surface": "去年",
                                "reading": "きょねん",
                                "en": "last year"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "親友",
                                "reading": "しんゆう",
                                "en": "close friend"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "結婚",
                                "reading": "けっこん",
                                "en": "marriage (get married)"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "新しい",
                                "reading": "あたらしい",
                                "en": "new"
                            },
                            {
                                "surface": "生活",
                                "reading": "せいかつ",
                                "en": "living"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "大変",
                                "reading": "たいへん",
                                "en": "very"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": "a certain..."
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼女",
                                "reading": "かのじょ",
                                "en": "girlfriend"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "幸せ",
                                "reading": "しあわせ",
                                "en": "happiness"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "会う",
                                "reading": "あう",
                                "en": "to meet"
                            },
                            {
                                "surface": "たび",
                                "reading": "たび",
                                "en": "travel"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "明るい",
                                "reading": "あかるい",
                                "en": "bright (in reference to personality or weather)"
                            },
                            {
                                "surface": "表情",
                                "reading": "ひょうじょう",
                                "en": "facial expression"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見せ",
                                "reading": "みせ",
                                "en": "to show"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "夫婦",
                                "reading": "ふうふ",
                                "en": "married couple"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "協力",
                                "reading": "きょうりょく",
                                "en": "cooperation"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "ながら",
                                "reading": "ながら",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "楽しん",
                                "reading": "たのしん",
                                "en": null
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "そんな",
                                "reading": "そんな",
                                "en": "such"
                            },
                            {
                                "surface": "幸せ",
                                "reading": "しあわせ",
                                "en": "happiness"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "家庭",
                                "reading": "かてい",
                                "en": "home"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "築き",
                                "reading": "きずき",
                                "en": "to build"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 10,
                "hint": "N3",
                "texts": [
                    {
                        "id": "foundation-l10-1",
                        "title": "値上がりする物価",
                        "words": [
                            {
                                "surface": "最近",
                                "reading": "さいきん",
                                "en": "recently"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "スーパー",
                                "reading": "すーぱー",
                                "en": null
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "買い物",
                                "reading": "かいもの",
                                "en": "shopping"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "驚く",
                                "reading": "おどろく",
                                "en": "to be surprised"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "物価",
                                "reading": "ぶっか",
                                "en": "(commodity/consumer) prices"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "上がっ",
                                "reading": "あがっ",
                                "en": "to rise"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "特に",
                                "reading": "とくに",
                                "en": "particularly"
                            },
                            {
                                "surface": "野菜",
                                "reading": "やさい",
                                "en": "vegetable"
                            },
                            {
                                "surface": "や",
                                "reading": "や",
                                "en": null
                            },
                            {
                                "surface": "果物",
                                "reading": "くだもの",
                                "en": "fruit"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "値段",
                                "reading": "ねだん",
                                "en": "price"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "高く",
                                "reading": "たかく",
                                "en": "tall"
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家計",
                                "reading": "かけい",
                                "en": "household economy"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "影響",
                                "reading": "えいきょう",
                                "en": "influence"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "ずつ",
                                "reading": "ずつ",
                                "en": null
                            },
                            {
                                "surface": "出",
                                "reading": "で",
                                "en": "to appear"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "き",
                                "reading": "き",
                                "en": "spirit"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "節約",
                                "reading": "せつやく",
                                "en": "economizing"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "心がけ",
                                "reading": "こころがけ",
                                "en": "readiness"
                            },
                            {
                                "surface": "ながら",
                                "reading": "ながら",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "生活",
                                "reading": "せいかつ",
                                "en": "living"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "工夫",
                                "reading": "くふう",
                                "en": "device"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いく",
                                "reading": "いく",
                                "en": "to go"
                            },
                            {
                                "surface": "必要",
                                "reading": "ひつよう",
                                "en": "necessary"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l10-2",
                        "title": "先輩の忠告",
                        "words": [
                            {
                                "surface": "先輩",
                                "reading": "せんぱい",
                                "en": "senior members of a group"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "急",
                                "reading": "きゅう",
                                "en": "urgent"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "忠告",
                                "reading": "ちゅうこく",
                                "en": "advice"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "受け",
                                "reading": "うけ",
                                "en": "to take (an examination, interview, etc.)"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "「",
                                "reading": "「",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "信用",
                                "reading": "しんよう",
                                "en": "confidence"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "」",
                                "reading": "」",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "真剣",
                                "reading": "しんけん",
                                "en": "seriousness"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "顔",
                                "reading": "かお",
                                "en": "face (body part)"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "言わ",
                                "reading": "いわ",
                                "en": "to say"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "理由",
                                "reading": "りゆう",
                                "en": "reason"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "詳しく",
                                "reading": "くわしく",
                                "en": "detailed"
                            },
                            {
                                "surface": "教え",
                                "reading": "おしえ",
                                "en": "to teach"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "何",
                                "reading": "なに",
                                "en": "what"
                            },
                            {
                                "surface": "か",
                                "reading": "か",
                                "en": null
                            },
                            {
                                "surface": "あっ",
                                "reading": "あっ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "感じ",
                                "reading": "かんじ",
                                "en": "to feel"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "それ",
                                "reading": "それ",
                                "en": "that one"
                            },
                            {
                                "surface": "以来",
                                "reading": "いらい",
                                "en": "since"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "距離",
                                "reading": "きょり",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "置く",
                                "reading": "おく",
                                "en": "to put"
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "真相",
                                "reading": "しんそう",
                                "en": "truth"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "まだ",
                                "reading": "まだ",
                                "en": "yet"
                            },
                            {
                                "surface": "分かり",
                                "reading": "わかり",
                                "en": "to understand"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "foundation-l10-3",
                        "title": "信頼できる友人",
                        "words": [
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "長い",
                                "reading": "ながい",
                                "en": "long"
                            },
                            {
                                "surface": "付き合い",
                                "reading": "つきあい",
                                "en": "socialization"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "約束",
                                "reading": "やくそく",
                                "en": "arrangement"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "守る",
                                "reading": "まもる",
                                "en": "to protect"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "どんなに",
                                "reading": "どんなに",
                                "en": "how"
                            },
                            {
                                "surface": "忙しく",
                                "reading": "いそがしく",
                                "en": "busy (people, days)"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一度",
                                "reading": "いちど",
                                "en": "once"
                            },
                            {
                                "surface": "決め",
                                "reading": "きめ",
                                "en": "to decide (v.t.)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "必ず",
                                "reading": "かならず",
                                "en": "surely"
                            },
                            {
                                "surface": "実行",
                                "reading": "じっこう",
                                "en": "practice"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "だからこそ",
                                "reading": "だからこそ",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "周り",
                                "reading": "まわり",
                                "en": "surroundings"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "深く",
                                "reading": "ふかく",
                                "en": "deep"
                            },
                            {
                                "surface": "信頼",
                                "reading": "しんらい",
                                "en": "reliance"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "誠実",
                                "reading": "せいじつ",
                                "en": "sincere"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "人間",
                                "reading": "にんげん",
                                "en": "human being"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "advanced",
        "title": "Advanced · N3 → N1",
        "levels": [
            {
                "levelNum": 1,
                "hint": "N3",
                "texts": [
                    {
                        "id": "advanced-l1-1",
                        "title": "料理と私",
                        "words": [
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "小さい",
                                "reading": "ちいさい",
                                "en": "small"
                            },
                            {
                                "surface": "ころ",
                                "reading": "ころ",
                                "en": null
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "料理",
                                "reading": "りょうり",
                                "en": "cooking"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "好き",
                                "reading": "すき",
                                "en": "liking"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "母",
                                "reading": "はは",
                                "en": "(my) mother"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "台所",
                                "reading": "だいどころ",
                                "en": "kitchen"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "料理",
                                "reading": "りょうり",
                                "en": "cooking"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "教え",
                                "reading": "おしえ",
                                "en": "to teach"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "最初",
                                "reading": "さいしょ",
                                "en": "beginning"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "簡単",
                                "reading": "かんたん",
                                "en": "simple"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "卵焼き",
                                "reading": "たまごやき",
                                "en": null
                            },
                            {
                                "surface": "しか",
                                "reading": "しか",
                                "en": null
                            },
                            {
                                "surface": "作れ",
                                "reading": "つくれ",
                                "en": null
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "ずつ",
                                "reading": "ずつ",
                                "en": null
                            },
                            {
                                "surface": "上手",
                                "reading": "じょうず",
                                "en": "be good at"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今",
                                "reading": "いま",
                                "en": "now"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "色々",
                                "reading": "いろいろ",
                                "en": "various"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "料理",
                                "reading": "りょうり",
                                "en": "cooking"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "作る",
                                "reading": "つくる",
                                "en": "to make"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "でき",
                                "reading": "でき",
                                "en": "to be able to (to accomplish)"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "料理",
                                "reading": "りょうり",
                                "en": "cooking"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "得意",
                                "reading": "とくい",
                                "en": "pride"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "特に",
                                "reading": "とくに",
                                "en": "particularly"
                            },
                            {
                                "surface": "和食",
                                "reading": "わしょく",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "好き",
                                "reading": "すき",
                                "en": "liking"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "家",
                                "reading": "いえ",
                                "en": "house"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "呼ん",
                                "reading": "よん",
                                "en": "to call (one's name)"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "手作り",
                                "reading": "てづくり",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "料理",
                                "reading": "りょうり",
                                "en": "cooking"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "出す",
                                "reading": "だす",
                                "en": "to take (something) out"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "楽しみ",
                                "reading": "たのしみ",
                                "en": "pleasure"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつか",
                                "reading": "いつか",
                                "en": "sometime"
                            },
                            {
                                "surface": "自分",
                                "reading": "じぶん",
                                "en": "myself"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "レストラン",
                                "reading": "れすとらん",
                                "en": "restaurant"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "持つ",
                                "reading": "もつ",
                                "en": "to hold"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l1-2",
                        "title": "遅刻した朝",
                        "words": [
                            {
                                "surface": "今朝",
                                "reading": "けさ",
                                "en": "this morning"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "目覚まし",
                                "reading": "めざまし",
                                "en": "alarm-clock"
                            },
                            {
                                "surface": "時計",
                                "reading": "とけい",
                                "en": "a watch"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "鳴り",
                                "reading": "なり",
                                "en": "to sound"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "目",
                                "reading": "め",
                                "en": "eye(s)"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "覚め",
                                "reading": "さめ",
                                "en": "to wake"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "とき",
                                "reading": "とき",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "もう",
                                "reading": "もう",
                                "en": "already"
                            },
                            {
                                "surface": "七",
                                "reading": "なな",
                                "en": "seven"
                            },
                            {
                                "surface": "時半",
                                "reading": "じはん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "急い",
                                "reading": "いそい",
                                "en": "to hurry"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "準備",
                                "reading": "じゅんび",
                                "en": "prepare"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "間に合い",
                                "reading": "まにあい",
                                "en": "to be in time for"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "学校",
                                "reading": "がっこう",
                                "en": "a school"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "遅刻",
                                "reading": "ちこく",
                                "en": "lateness"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "先生",
                                "reading": "せんせい",
                                "en": "teacher"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "理由",
                                "reading": "りゆう",
                                "en": "reason"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "説明",
                                "reading": "せつめい",
                                "en": "explanation"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "先生",
                                "reading": "せんせい",
                                "en": "teacher"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "怒り",
                                "reading": "おこり",
                                "en": "to get angry"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "許し",
                                "reading": "ゆるし",
                                "en": "to permit"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "明日",
                                "reading": "あした",
                                "en": "tomorrow"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "もっと",
                                "reading": "もっと",
                                "en": "more"
                            },
                            {
                                "surface": "早く",
                                "reading": "はやく",
                                "en": "early"
                            },
                            {
                                "surface": "寝よ",
                                "reading": "ねよ",
                                "en": "to sleep"
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "同じ",
                                "reading": "おなじ",
                                "en": "same"
                            },
                            {
                                "surface": "失敗",
                                "reading": "しっぱい",
                                "en": "failure"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "繰り返し",
                                "reading": "くりかえし",
                                "en": "to repeat"
                            },
                            {
                                "surface": "たく",
                                "reading": "たく",
                                "en": null
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l1-3",
                        "title": "冒険好きな友人",
                        "words": [
                            {
                                "surface": "大学",
                                "reading": "だいがく",
                                "en": "college"
                            },
                            {
                                "surface": "時代",
                                "reading": "じだい",
                                "en": "age"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつも",
                                "reading": "いつも",
                                "en": "always"
                            },
                            {
                                "surface": "珍しい",
                                "reading": "めずらしい",
                                "en": "unusual"
                            },
                            {
                                "surface": "場所",
                                "reading": "ばしょ",
                                "en": "place"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "旅",
                                "reading": "たび",
                                "en": "travel"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "冒険",
                                "reading": "ぼうけん",
                                "en": "risk"
                            },
                            {
                                "surface": "好き",
                                "reading": "すき",
                                "en": "liking"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一",
                                "reading": "いち",
                                "en": "one"
                            },
                            {
                                "surface": "人",
                                "reading": "にん",
                                "en": "man"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "山",
                                "reading": "やま",
                                "en": "mountain"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "登っ",
                                "reading": "のぼっ",
                                "en": "to climb"
                            },
                            {
                                "surface": "たり",
                                "reading": "たり",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "知ら",
                                "reading": "しら",
                                "en": "to know"
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "国",
                                "reading": "くに",
                                "en": "country"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "訪れ",
                                "reading": "おとずれ",
                                "en": "to visit"
                            },
                            {
                                "surface": "たり",
                                "reading": "たり",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "話",
                                "reading": "はなし",
                                "en": "talk (chat)"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "聞く",
                                "reading": "きく",
                                "en": "to hear"
                            },
                            {
                                "surface": "たび",
                                "reading": "たび",
                                "en": "travel"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "遠く",
                                "reading": "とおく",
                                "en": "far away"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "行っ",
                                "reading": "いっ",
                                "en": "to go"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "み",
                                "reading": "み",
                                "en": "fruit"
                            },
                            {
                                "surface": "たく",
                                "reading": "たく",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつか",
                                "reading": "いつか",
                                "en": "sometime"
                            },
                            {
                                "surface": "一緒",
                                "reading": "いっしょ",
                                "en": "together"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "旅行",
                                "reading": "りょこう",
                                "en": "travel"
                            },
                            {
                                "surface": "でき",
                                "reading": "でき",
                                "en": "to be able to (to accomplish)"
                            },
                            {
                                "surface": "たら",
                                "reading": "たら",
                                "en": null
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 2,
                "hint": "N2",
                "texts": [
                    {
                        "id": "advanced-l2-1",
                        "title": "健康と天気",
                        "words": [
                            {
                                "surface": "今年",
                                "reading": "ことし",
                                "en": "this year"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "冬",
                                "reading": "ふゆ",
                                "en": "winter"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "例年",
                                "reading": "れいねん",
                                "en": null
                            },
                            {
                                "surface": "より",
                                "reading": "より",
                                "en": null
                            },
                            {
                                "surface": "寒く",
                                "reading": "さむく",
                                "en": "cold (in reference to weather)"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "体調",
                                "reading": "たいちょう",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "崩す",
                                "reading": "くずす",
                                "en": "to destroy"
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "増え",
                                "reading": "ふえ",
                                "en": "to increase"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "雨",
                                "reading": "あめ",
                                "en": "rain"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "降っ",
                                "reading": "ふっ",
                                "en": "to precipitate"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "特に",
                                "reading": "とくに",
                                "en": "particularly"
                            },
                            {
                                "surface": "外出",
                                "reading": "がいしゅつ",
                                "en": "outing"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "とき",
                                "reading": "とき",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "注意",
                                "reading": "ちゅうい",
                                "en": "caution"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "必要",
                                "reading": "ひつよう",
                                "en": "necessary"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "風邪",
                                "reading": "かぜ",
                                "en": "cold"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "伝染",
                                "reading": "でんせん",
                                "en": "contagion"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "だから",
                                "reading": "だから",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "出かける",
                                "reading": "でかける",
                                "en": "to go out"
                            },
                            {
                                "surface": "とき",
                                "reading": "とき",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "マスク",
                                "reading": "ますく",
                                "en": "mask"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "つけ",
                                "reading": "つけ",
                                "en": "to turn on (e.g., a light)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "ほう",
                                "reading": "ほう",
                                "en": "Act (law: the X Act)"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "でしょ",
                                "reading": "でしょ",
                                "en": null
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "先週",
                                "reading": "せんしゅう",
                                "en": "last week"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "喉",
                                "reading": "のど",
                                "en": "throat"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "痛く",
                                "reading": "いたく",
                                "en": "hurt"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "あまり",
                                "reading": "あまり",
                                "en": "not very"
                            },
                            {
                                "surface": "体調",
                                "reading": "たいちょう",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "それでも",
                                "reading": "それでも",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "休む",
                                "reading": "やすむ",
                                "en": "to rest"
                            },
                            {
                                "surface": "わけ",
                                "reading": "わけ",
                                "en": "reason"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "いか",
                                "reading": "いか",
                                "en": "less than"
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "ので",
                                "reading": "ので",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "無理",
                                "reading": "むり",
                                "en": "unreasonable"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "ながら",
                                "reading": "ながら",
                                "en": null
                            },
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "出勤",
                                "reading": "しゅっきん",
                                "en": "going to work"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "早く",
                                "reading": "はやく",
                                "en": "early"
                            },
                            {
                                "surface": "元気",
                                "reading": "げんき",
                                "en": "health(y)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l2-2",
                        "title": "船旅の思い出",
                        "words": [
                            {
                                "surface": "先月",
                                "reading": "せんげつ",
                                "en": "last month"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "船",
                                "reading": "ふね",
                                "en": "ship"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "旅行",
                                "reading": "りょこう",
                                "en": "travel"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "出かけ",
                                "reading": "でかけ",
                                "en": "to go out"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "出発",
                                "reading": "しゅっぱつ",
                                "en": "departure"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "日",
                                "reading": "ひ",
                                "en": "day"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "海",
                                "reading": "うみ",
                                "en": "sea"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "荒れ",
                                "reading": "あれ",
                                "en": "to be stormy"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "船",
                                "reading": "ふね",
                                "en": "ship"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "大きく",
                                "reading": "おおきく",
                                "en": "big"
                            },
                            {
                                "surface": "揺れ",
                                "reading": "ゆれ",
                                "en": "to shake"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "怖かっ",
                                "reading": "こわかっ",
                                "en": "scary"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "それでも",
                                "reading": "それでも",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "無事",
                                "reading": "ぶじ",
                                "en": "safety"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "目的",
                                "reading": "もくてき",
                                "en": "purpose"
                            },
                            {
                                "surface": "地",
                                "reading": "ち",
                                "en": "earth"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "着く",
                                "reading": "つく",
                                "en": "to arrive at"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "でき",
                                "reading": "でき",
                                "en": "to be able to (to accomplish)"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今",
                                "reading": "いま",
                                "en": "now"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "思い出",
                                "reading": "おもいで",
                                "en": "memories"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なっ",
                                "reading": "なっ",
                                "en": "to become"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l2-3",
                        "title": "私の夢",
                        "words": [
                            {
                                "surface": "子供",
                                "reading": "こども",
                                "en": "child(ren)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "とき",
                                "reading": "とき",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "宇宙",
                                "reading": "うちゅう",
                                "en": "universe"
                            },
                            {
                                "surface": "飛行",
                                "reading": "ひこう",
                                "en": "aviation"
                            },
                            {
                                "surface": "士",
                                "reading": "し",
                                "en": "death"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思っ",
                                "reading": "おもっ",
                                "en": "to think"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今",
                                "reading": "いま",
                                "en": "now"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "違う",
                                "reading": "ちがう",
                                "en": "to be different"
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "まだ",
                                "reading": "まだ",
                                "en": "yet"
                            },
                            {
                                "surface": "心",
                                "reading": "こころ",
                                "en": "heart"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "中",
                                "reading": "なか",
                                "en": "inside"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": "a certain..."
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いつか",
                                "reading": "いつか",
                                "en": "sometime"
                            },
                            {
                                "surface": "宇宙",
                                "reading": "うちゅう",
                                "en": "universe"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行く",
                                "reading": "いく",
                                "en": "to go"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "簡単",
                                "reading": "かんたん",
                                "en": "simple"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": "there isn't"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "分かっ",
                                "reading": "わかっ",
                                "en": "to understand"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "諦め",
                                "reading": "あきらめ",
                                "en": "to give up"
                            },
                            {
                                "surface": "たく",
                                "reading": "たく",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "ずつ",
                                "reading": "ずつ",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "近づく",
                                "reading": "ちかづく",
                                "en": null
                            },
                            {
                                "surface": "努力",
                                "reading": "どりょく",
                                "en": "great effort"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家族",
                                "reading": "かぞく",
                                "en": "family"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "応援",
                                "reading": "おうえん",
                                "en": "aid"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "笑わ",
                                "reading": "わらわ",
                                "en": "to laugh"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "気",
                                "reading": "き",
                                "en": "spirit"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "それぞれ",
                                "reading": "それぞれ",
                                "en": "each"
                            },
                            {
                                "surface": "違う",
                                "reading": "ちがう",
                                "en": "to be different"
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "持っ",
                                "reading": "もっ",
                                "en": "to hold"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "自分",
                                "reading": "じぶん",
                                "en": "myself"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "夢",
                                "reading": "ゆめ",
                                "en": "a dream"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "信じる",
                                "reading": "しんじる",
                                "en": "to believe"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "一番",
                                "reading": "いちばん",
                                "en": "best (most)"
                            },
                            {
                                "surface": "大切",
                                "reading": "たいせつ",
                                "en": "important"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 3,
                "hint": "N2",
                "texts": [
                    {
                        "id": "advanced-l3-1",
                        "title": "祝日の過ごし方",
                        "words": [
                            {
                                "surface": "今日",
                                "reading": "きょう",
                                "en": "today"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "祝日",
                                "reading": "しゅくじつ",
                                "en": "national holiday"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "だから",
                                "reading": "だから",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "学校",
                                "reading": "がっこう",
                                "en": "a school"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "会社",
                                "reading": "かいしゃ",
                                "en": "company"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "休み",
                                "reading": "やすみ",
                                "en": "to rest"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家族",
                                "reading": "かぞく",
                                "en": "family"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "一緒",
                                "reading": "いっしょ",
                                "en": "together"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "久しぶり",
                                "reading": "ひさしぶり",
                                "en": "it has been a long time"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "ゆっくり",
                                "reading": "ゆっくり",
                                "en": null
                            },
                            {
                                "surface": "過ごす",
                                "reading": "すごす",
                                "en": "to pass"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "近く",
                                "reading": "ちかく",
                                "en": "nearby"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "神社",
                                "reading": "じんじゃ",
                                "en": "Shinto shrine"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "お参り",
                                "reading": "おまいり",
                                "en": "worship"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "その後",
                                "reading": "そのご",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "家",
                                "reading": "いえ",
                                "en": "house"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "食事",
                                "reading": "しょくじ",
                                "en": "meal"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "楽しみ",
                                "reading": "たのしみ",
                                "en": "pleasure"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "穏やか",
                                "reading": "おだやか",
                                "en": "calm"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "一",
                                "reading": "いち",
                                "en": "one"
                            },
                            {
                                "surface": "日",
                                "reading": "にち",
                                "en": "day"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l3-2",
                        "title": "母の禁煙",
                        "words": [
                            {
                                "surface": "母",
                                "reading": "はは",
                                "en": "(my) mother"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "長い",
                                "reading": "ながい",
                                "en": "long"
                            },
                            {
                                "surface": "間",
                                "reading": "ま",
                                "en": "space"
                            },
                            {
                                "surface": "タバコ",
                                "reading": "たばこ",
                                "en": "tobacco"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "吸っ",
                                "reading": "すっ",
                                "en": "to breathe in"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "しかし",
                                "reading": "しかし",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "健康",
                                "reading": "けんこう",
                                "en": "health(y)"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "考え",
                                "reading": "かんがえ",
                                "en": "to think (about)"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼女",
                                "reading": "かのじょ",
                                "en": "girlfriend"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "禁煙",
                                "reading": "きんえん",
                                "en": "No Smoking"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "最初",
                                "reading": "さいしょ",
                                "en": "beginning"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "苦し",
                                "reading": "くるし",
                                "en": "tough"
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "ずつ",
                                "reading": "ずつ",
                                "en": null
                            },
                            {
                                "surface": "体調",
                                "reading": "たいちょう",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "なっ",
                                "reading": "なっ",
                                "en": "to become"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いき",
                                "reading": "いき",
                                "en": "chic"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今",
                                "reading": "いま",
                                "en": "now"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "以前",
                                "reading": "いぜん",
                                "en": "in the past"
                            },
                            {
                                "surface": "より",
                                "reading": "より",
                                "en": null
                            },
                            {
                                "surface": "ずっと",
                                "reading": "ずっと",
                                "en": "for a long time"
                            },
                            {
                                "surface": "元気",
                                "reading": "げんき",
                                "en": "health(y)"
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "強い",
                                "reading": "つよい",
                                "en": "strong"
                            },
                            {
                                "surface": "意志",
                                "reading": "いし",
                                "en": "will"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "感心",
                                "reading": "かんしん",
                                "en": "admiration"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l3-3",
                        "title": "家出をした友人",
                        "words": [
                            {
                                "surface": "かつて",
                                "reading": "かつて",
                                "en": "once"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "思い出す",
                                "reading": "おもいだす",
                                "en": "to recall"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "複雑",
                                "reading": "ふくざつ",
                                "en": "complexity"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "気持ち",
                                "reading": "きもち",
                                "en": "feeling"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なる",
                                "reading": "なる",
                                "en": "to become"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "高校生",
                                "reading": "こうこうせい",
                                "en": "high school student"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "とき",
                                "reading": "とき",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "家出",
                                "reading": "いえで",
                                "en": "running away from home"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "当時",
                                "reading": "とうじ",
                                "en": "at that time"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "誰",
                                "reading": "だれ",
                                "en": "who"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "理由",
                                "reading": "りゆう",
                                "en": "reason"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "理解",
                                "reading": "りかい",
                                "en": "understanding"
                            },
                            {
                                "surface": "でき",
                                "reading": "でき",
                                "en": "to be able to (to accomplish)"
                            },
                            {
                                "surface": "なかっ",
                                "reading": "なかっ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "後",
                                "reading": "ご",
                                "en": "afterwards"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なっ",
                                "reading": "なっ",
                                "en": "to become"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家庭",
                                "reading": "かてい",
                                "en": "home"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "深い",
                                "reading": "ふかい",
                                "en": "deep"
                            },
                            {
                                "surface": "事情",
                                "reading": "じじょう",
                                "en": "circumstances"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あっ",
                                "reading": "あっ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "知っ",
                                "reading": "しっ",
                                "en": "to know"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "あの",
                                "reading": "あの",
                                "en": "that over there"
                            },
                            {
                                "surface": "とき",
                                "reading": "とき",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "もっと",
                                "reading": "もっと",
                                "en": "more"
                            },
                            {
                                "surface": "話",
                                "reading": "はなし",
                                "en": "talk (chat)"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "聞い",
                                "reading": "きい",
                                "en": "to hear"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "あげれ",
                                "reading": "あげれ",
                                "en": "to give"
                            },
                            {
                                "surface": "ば",
                                "reading": "ば",
                                "en": null
                            },
                            {
                                "surface": "よかっ",
                                "reading": "よかっ",
                                "en": "good"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "今",
                                "reading": "いま",
                                "en": "now"
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "思う",
                                "reading": "おもう",
                                "en": "to think"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 4,
                "hint": "N3",
                "texts": [
                    {
                        "id": "advanced-l4-1",
                        "title": "脱線事故のニュース",
                        "words": [
                            {
                                "surface": "今朝",
                                "reading": "けさ",
                                "en": "this morning"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "ニュース",
                                "reading": "にゅーす",
                                "en": "news"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "地方",
                                "reading": "ちほう",
                                "en": "area"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "ローカル",
                                "reading": "ろーかる",
                                "en": null
                            },
                            {
                                "surface": "線",
                                "reading": "せん",
                                "en": "line"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "事故",
                                "reading": "じこ",
                                "en": "accident"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あっ",
                                "reading": "あっ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "知り",
                                "reading": "しり",
                                "en": "to know"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "汽車",
                                "reading": "きしゃ",
                                "en": "train (steam)"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "脱線",
                                "reading": "だっせん",
                                "en": "derailment"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "けが人",
                                "reading": "けがにん",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "出",
                                "reading": "で",
                                "en": "to appear"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "という",
                                "reading": "という",
                                "en": null
                            },
                            {
                                "surface": "情報",
                                "reading": "じょうほう",
                                "en": "information"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "心配",
                                "reading": "しんぱい",
                                "en": "worry"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "原因",
                                "reading": "げんいん",
                                "en": "cause"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "まだ",
                                "reading": "まだ",
                                "en": "yet"
                            },
                            {
                                "surface": "分かっ",
                                "reading": "わかっ",
                                "en": "to understand"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "早い",
                                "reading": "はやい",
                                "en": "early"
                            },
                            {
                                "surface": "復旧",
                                "reading": "ふっきゅう",
                                "en": "restoration"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "願っ",
                                "reading": "ねがっ",
                                "en": "to desire"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "安全",
                                "reading": "あんぜん",
                                "en": "safety"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "鉄道",
                                "reading": "てつどう",
                                "en": "railway"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "あっ",
                                "reading": "あっ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "ほしい",
                                "reading": "ほしい",
                                "en": "to want"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l4-2",
                        "title": "定時に帰る同僚",
                        "words": [
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "遅く",
                                "reading": "おそく",
                                "en": "slow"
                            },
                            {
                                "surface": "まで",
                                "reading": "まで",
                                "en": null
                            },
                            {
                                "surface": "働い",
                                "reading": "はたらい",
                                "en": "to work"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "同僚",
                                "reading": "どうりょう",
                                "en": "colleague"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "最近",
                                "reading": "さいきん",
                                "en": "recently"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "定時",
                                "reading": "ていじ",
                                "en": "presentation"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "帰る",
                                "reading": "かえる",
                                "en": "to go back"
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今日",
                                "reading": "きょう",
                                "en": "today"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼女",
                                "reading": "かのじょ",
                                "en": "girlfriend"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "帰宅",
                                "reading": "きたく",
                                "en": "returning home"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "理由",
                                "reading": "りゆう",
                                "en": "reason"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "聞く",
                                "reading": "きく",
                                "en": "to hear"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家族",
                                "reading": "かぞく",
                                "en": "family"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "時間",
                                "reading": "じかん",
                                "en": "time"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "大切",
                                "reading": "たいせつ",
                                "en": "important"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "話し",
                                "reading": "はなし",
                                "en": "to speak"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "だけ",
                                "reading": "だけ",
                                "en": null
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "なく",
                                "reading": "なく",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "生活",
                                "reading": "せいかつ",
                                "en": "living"
                            },
                            {
                                "surface": "全体",
                                "reading": "ぜんたい",
                                "en": "whole"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "バランス",
                                "reading": "ばらんす",
                                "en": "balance"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "考える",
                                "reading": "かんがえる",
                                "en": "to think (about)"
                            },
                            {
                                "surface": "姿勢",
                                "reading": "しせい",
                                "en": "attitude"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "感心",
                                "reading": "かんしん",
                                "en": "admiration"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "見習い",
                                "reading": "みならい",
                                "en": "to follow another's example"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l4-3",
                        "title": "親友の結婚",
                        "words": [
                            {
                                "surface": "去年",
                                "reading": "きょねん",
                                "en": "last year"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "親友",
                                "reading": "しんゆう",
                                "en": "close friend"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "結婚",
                                "reading": "けっこん",
                                "en": "marriage (get married)"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "新しい",
                                "reading": "あたらしい",
                                "en": "new"
                            },
                            {
                                "surface": "生活",
                                "reading": "せいかつ",
                                "en": "living"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "大変",
                                "reading": "たいへん",
                                "en": "very"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": "a certain..."
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼女",
                                "reading": "かのじょ",
                                "en": "girlfriend"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "幸せ",
                                "reading": "しあわせ",
                                "en": "happiness"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "会う",
                                "reading": "あう",
                                "en": "to meet"
                            },
                            {
                                "surface": "たび",
                                "reading": "たび",
                                "en": "travel"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "明るい",
                                "reading": "あかるい",
                                "en": "bright (in reference to personality or weather)"
                            },
                            {
                                "surface": "表情",
                                "reading": "ひょうじょう",
                                "en": "facial expression"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見せ",
                                "reading": "みせ",
                                "en": "to show"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "夫婦",
                                "reading": "ふうふ",
                                "en": "married couple"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "協力",
                                "reading": "きょうりょく",
                                "en": "cooperation"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "ながら",
                                "reading": "ながら",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "毎日",
                                "reading": "まいにち",
                                "en": "every day"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "楽しん",
                                "reading": "たのしん",
                                "en": null
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "そんな",
                                "reading": "そんな",
                                "en": "such"
                            },
                            {
                                "surface": "幸せ",
                                "reading": "しあわせ",
                                "en": "happiness"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "家庭",
                                "reading": "かてい",
                                "en": "home"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "築き",
                                "reading": "きずき",
                                "en": "to build"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 5,
                "hint": "N2",
                "texts": [
                    {
                        "id": "advanced-l5-1",
                        "title": "先輩の相談",
                        "words": [
                            {
                                "surface": "先輩",
                                "reading": "せんぱい",
                                "en": "senior members of a group"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "突然",
                                "reading": "とつぜん",
                                "en": "abruptly"
                            },
                            {
                                "surface": "連絡",
                                "reading": "れんらく",
                                "en": "communication"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "話",
                                "reading": "はなし",
                                "en": "talk (chat)"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "聞く",
                                "reading": "きく",
                                "en": "to hear"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "困っ",
                                "reading": "こまっ",
                                "en": "to be bothered"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "トラブル",
                                "reading": "とらぶる",
                                "en": "trouble (sometimes used as a verb)"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "起き",
                                "reading": "おき",
                                "en": "to get up (e.g., from sleeping)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "できる",
                                "reading": "できる",
                                "en": "to be able to (to accomplish)"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "限ら",
                                "reading": "かぎら",
                                "en": "to restrict"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "相談",
                                "reading": "そうだん",
                                "en": "consultation"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "乗る",
                                "reading": "のる",
                                "en": "to get on"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "力",
                                "reading": "ちから",
                                "en": "strength"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なれれ",
                                "reading": "なれれ",
                                "en": null
                            },
                            {
                                "surface": "ば",
                                "reading": "ば",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思っ",
                                "reading": "おもっ",
                                "en": "to think"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l5-2",
                        "title": "友人関係について",
                        "words": [
                            {
                                "surface": "最近",
                                "reading": "さいきん",
                                "en": "recently"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "関係",
                                "reading": "かんけい",
                                "en": "relation(ship)"
                            },
                            {
                                "surface": "について",
                                "reading": "について",
                                "en": null
                            },
                            {
                                "surface": "考える",
                                "reading": "かんがえる",
                                "en": "to think (about)"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "多く",
                                "reading": "おおく",
                                "en": "many"
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "学生",
                                "reading": "がくせい",
                                "en": "student"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "ころ",
                                "reading": "ころ",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "たくさん",
                                "reading": "たくさん",
                                "en": "many"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "友達",
                                "reading": "ともだち",
                                "en": "friend"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "囲ま",
                                "reading": "かこま",
                                "en": "to surround"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "社会",
                                "reading": "しゃかい",
                                "en": "society"
                            },
                            {
                                "surface": "人",
                                "reading": "じん",
                                "en": "man"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なっ",
                                "reading": "なっ",
                                "en": "to become"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "状況",
                                "reading": "じょうきょう",
                                "en": "state of affairs"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "変わり",
                                "reading": "かわり",
                                "en": "to change (v.i.)"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "親友",
                                "reading": "しんゆう",
                                "en": "close friend"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "何",
                                "reading": "なん",
                                "en": "what"
                            },
                            {
                                "surface": "人",
                                "reading": "にん",
                                "en": "man"
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "？",
                                "reading": "？",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "聞か",
                                "reading": "きか",
                                "en": "to hear"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "すぐ",
                                "reading": "すぐ",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "答え",
                                "reading": "こたえ",
                                "en": "to answer"
                            },
                            {
                                "surface": "られ",
                                "reading": "られ",
                                "en": null
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "しかし",
                                "reading": "しかし",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "深く",
                                "reading": "ふかく",
                                "en": "deep"
                            },
                            {
                                "surface": "信頼",
                                "reading": "しんらい",
                                "en": "reliance"
                            },
                            {
                                "surface": "できる",
                                "reading": "できる",
                                "en": "to be able to (to accomplish)"
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "限ら",
                                "reading": "かぎら",
                                "en": "to restrict"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "年齢",
                                "reading": "ねんれい",
                                "en": "age"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "重ねる",
                                "reading": "かさねる",
                                "en": "to pile up"
                            },
                            {
                                "surface": "につれて",
                                "reading": "につれて",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "量",
                                "reading": "りょう",
                                "en": "quantity"
                            },
                            {
                                "surface": "より",
                                "reading": "より",
                                "en": null
                            },
                            {
                                "surface": "質",
                                "reading": "しつ",
                                "en": "quality"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "重視",
                                "reading": "じゅうし",
                                "en": "importance"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "本当に",
                                "reading": "ほんとうに",
                                "en": null
                            },
                            {
                                "surface": "困っ",
                                "reading": "こまっ",
                                "en": "to be bothered"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "とき",
                                "reading": "とき",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "助け",
                                "reading": "たすけ",
                                "en": "to help (v.t.)"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれる",
                                "reading": "くれる",
                                "en": "to give"
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "こそ",
                                "reading": "こそ",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一番",
                                "reading": "いちばん",
                                "en": "best (most)"
                            },
                            {
                                "surface": "大切",
                                "reading": "たいせつ",
                                "en": "important"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "存在",
                                "reading": "そんざい",
                                "en": "existence"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l5-3",
                        "title": "値上がりする物価",
                        "words": [
                            {
                                "surface": "最近",
                                "reading": "さいきん",
                                "en": "recently"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "スーパー",
                                "reading": "すーぱー",
                                "en": null
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "買い物",
                                "reading": "かいもの",
                                "en": "shopping"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "驚く",
                                "reading": "おどろく",
                                "en": "to be surprised"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "物価",
                                "reading": "ぶっか",
                                "en": "(commodity/consumer) prices"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "上がっ",
                                "reading": "あがっ",
                                "en": "to rise"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "特に",
                                "reading": "とくに",
                                "en": "particularly"
                            },
                            {
                                "surface": "野菜",
                                "reading": "やさい",
                                "en": "vegetable"
                            },
                            {
                                "surface": "や",
                                "reading": "や",
                                "en": null
                            },
                            {
                                "surface": "果物",
                                "reading": "くだもの",
                                "en": "fruit"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "値段",
                                "reading": "ねだん",
                                "en": "price"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "高く",
                                "reading": "たかく",
                                "en": "tall"
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家計",
                                "reading": "かけい",
                                "en": "household economy"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "影響",
                                "reading": "えいきょう",
                                "en": "influence"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "ずつ",
                                "reading": "ずつ",
                                "en": null
                            },
                            {
                                "surface": "出",
                                "reading": "で",
                                "en": "to appear"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "き",
                                "reading": "き",
                                "en": "spirit"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "節約",
                                "reading": "せつやく",
                                "en": "economizing"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "心がけ",
                                "reading": "こころがけ",
                                "en": "readiness"
                            },
                            {
                                "surface": "ながら",
                                "reading": "ながら",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "生活",
                                "reading": "せいかつ",
                                "en": "living"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "工夫",
                                "reading": "くふう",
                                "en": "device"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いく",
                                "reading": "いく",
                                "en": "to go"
                            },
                            {
                                "surface": "必要",
                                "reading": "ひつよう",
                                "en": "necessary"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 6,
                "hint": "N2",
                "texts": [
                    {
                        "id": "advanced-l6-1",
                        "title": "先輩の忠告",
                        "words": [
                            {
                                "surface": "先輩",
                                "reading": "せんぱい",
                                "en": "senior members of a group"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "急",
                                "reading": "きゅう",
                                "en": "urgent"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "忠告",
                                "reading": "ちゅうこく",
                                "en": "advice"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "受け",
                                "reading": "うけ",
                                "en": "to take (an examination, interview, etc.)"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "「",
                                "reading": "「",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "信用",
                                "reading": "しんよう",
                                "en": "confidence"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "」",
                                "reading": "」",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "真剣",
                                "reading": "しんけん",
                                "en": "seriousness"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "顔",
                                "reading": "かお",
                                "en": "face (body part)"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "言わ",
                                "reading": "いわ",
                                "en": "to say"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "理由",
                                "reading": "りゆう",
                                "en": "reason"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "詳しく",
                                "reading": "くわしく",
                                "en": "detailed"
                            },
                            {
                                "surface": "教え",
                                "reading": "おしえ",
                                "en": "to teach"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "くれ",
                                "reading": "くれ",
                                "en": "to give"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "何",
                                "reading": "なに",
                                "en": "what"
                            },
                            {
                                "surface": "か",
                                "reading": "か",
                                "en": null
                            },
                            {
                                "surface": "あっ",
                                "reading": "あっ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "感じ",
                                "reading": "かんじ",
                                "en": "to feel"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "それ",
                                "reading": "それ",
                                "en": "that one"
                            },
                            {
                                "surface": "以来",
                                "reading": "いらい",
                                "en": "since"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "距離",
                                "reading": "きょり",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "置く",
                                "reading": "おく",
                                "en": "to put"
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "真相",
                                "reading": "しんそう",
                                "en": "truth"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "まだ",
                                "reading": "まだ",
                                "en": "yet"
                            },
                            {
                                "surface": "分かり",
                                "reading": "わかり",
                                "en": "to understand"
                            },
                            {
                                "surface": "ませ",
                                "reading": "ませ",
                                "en": null
                            },
                            {
                                "surface": "ん",
                                "reading": "ん",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l6-2",
                        "title": "働きすぎへの注意",
                        "words": [
                            {
                                "surface": "最近",
                                "reading": "さいきん",
                                "en": "recently"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "残業",
                                "reading": "ざんぎょう",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "続い",
                                "reading": "つづい",
                                "en": "to be continued"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "「",
                                "reading": "「",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "働き",
                                "reading": "はたらき",
                                "en": "to work"
                            },
                            {
                                "surface": "すぎ",
                                "reading": "すぎ",
                                "en": "Japanese cedar"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "よ",
                                "reading": "よ",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "」",
                                "reading": "」",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "心配",
                                "reading": "しんぱい",
                                "en": "worry"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "確か",
                                "reading": "たしか",
                                "en": "if I remember correctly"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "体調",
                                "reading": "たいちょう",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "崩し",
                                "reading": "くずし",
                                "en": "to destroy"
                            },
                            {
                                "surface": "かけ",
                                "reading": "かけ",
                                "en": "to dial/call (e.g., phone)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "ペース",
                                "reading": "ぺーす",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見直し",
                                "reading": "みなおし",
                                "en": "to look over again"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "休む",
                                "reading": "やすむ",
                                "en": "to rest"
                            },
                            {
                                "surface": "時間",
                                "reading": "じかん",
                                "en": "time"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "大切",
                                "reading": "たいせつ",
                                "en": "important"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "しよ",
                                "reading": "しよ",
                                "en": "to do"
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "健康",
                                "reading": "けんこう",
                                "en": "health(y)"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あっ",
                                "reading": "あっ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "こそ",
                                "reading": "こそ",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "改めて",
                                "reading": "あらためて",
                                "en": "another time"
                            },
                            {
                                "surface": "感じ",
                                "reading": "かんじ",
                                "en": "to feel"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l6-3",
                        "title": "部長の出張",
                        "words": [
                            {
                                "surface": "今週",
                                "reading": "こんしゅう",
                                "en": "this week"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "部長",
                                "reading": "ぶちょう",
                                "en": "department (division) manager"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "出張",
                                "reading": "しゅっちょう",
                                "en": "official tour"
                            },
                            {
                                "surface": "中",
                                "reading": "ちゅう",
                                "en": "inside"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "出張",
                                "reading": "しゅっちょう",
                                "en": "official tour"
                            },
                            {
                                "surface": "中",
                                "reading": "ちゅう",
                                "en": "inside"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "だから",
                                "reading": "だから",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "会議",
                                "reading": "かいぎ",
                                "en": "business meeting"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "来週",
                                "reading": "らいしゅう",
                                "en": "next week"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "延期",
                                "reading": "えんき",
                                "en": "postponement"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "その間",
                                "reading": "そのかん",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "資料",
                                "reading": "しりょう",
                                "en": "materials"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "準備",
                                "reading": "じゅんび",
                                "en": "prepare"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "進め",
                                "reading": "すすめ",
                                "en": "to advance"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "おく",
                                "reading": "おく",
                                "en": "interior"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "忙しい",
                                "reading": "いそがしい",
                                "en": "busy (people, days)"
                            },
                            {
                                "surface": "一",
                                "reading": "いち",
                                "en": "one"
                            },
                            {
                                "surface": "週間",
                                "reading": "しゅうかん",
                                "en": "custom (in reference to culture)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "しっかり",
                                "reading": "しっかり",
                                "en": "firmly"
                            },
                            {
                                "surface": "準備",
                                "reading": "じゅんび",
                                "en": "prepare"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 7,
                "hint": "N2",
                "texts": [
                    {
                        "id": "advanced-l7-1",
                        "title": "山の竹林",
                        "words": [
                            {
                                "surface": "週末",
                                "reading": "しゅうまつ",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "近く",
                                "reading": "ちかく",
                                "en": "nearby"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "山",
                                "reading": "やま",
                                "en": "mountain"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "ハイキング",
                                "reading": "はいきんぐ",
                                "en": "hiking"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "天気",
                                "reading": "てんき",
                                "en": "weather"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "good"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "気持ち",
                                "reading": "きもち",
                                "en": "feeling"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "いい",
                                "reading": "いい",
                                "en": "good"
                            },
                            {
                                "surface": "一",
                                "reading": "いち",
                                "en": "one"
                            },
                            {
                                "surface": "日",
                                "reading": "にち",
                                "en": "day"
                            },
                            {
                                "surface": "でし",
                                "reading": "でし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "林",
                                "reading": "はやし",
                                "en": "woods"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "竹",
                                "reading": "たけ",
                                "en": "bamboo"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "目立つ",
                                "reading": "めだつ",
                                "en": "to be conspicuous"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "この",
                                "reading": "この",
                                "en": "this"
                            },
                            {
                                "surface": "地域",
                                "reading": "ちいき",
                                "en": "area"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "昔",
                                "reading": "むかし",
                                "en": "old days"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "竹林",
                                "reading": "ちくりん",
                                "en": null
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "有名",
                                "reading": "ゆうめい",
                                "en": "famous"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "竹",
                                "reading": "たけ",
                                "en": "bamboo"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "成長",
                                "reading": "せいちょう",
                                "en": "growth"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "とても",
                                "reading": "とても",
                                "en": "very (much)"
                            },
                            {
                                "surface": "早く",
                                "reading": "はやく",
                                "en": "early"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一",
                                "reading": "いち",
                                "en": "one"
                            },
                            {
                                "surface": "日",
                                "reading": "にち",
                                "en": "day"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "何",
                                "reading": "なん",
                                "en": "what"
                            },
                            {
                                "surface": "十",
                                "reading": "じゅう",
                                "en": "ten (~)"
                            },
                            {
                                "surface": "センチ",
                                "reading": "せんち",
                                "en": "centimeter"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "伸びる",
                                "reading": "のびる",
                                "en": "to extend"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": "a certain..."
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "聞い",
                                "reading": "きい",
                                "en": "to hear"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "驚き",
                                "reading": "おどろき",
                                "en": "to be surprised"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "自然",
                                "reading": "しぜん",
                                "en": "nature"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "中",
                                "reading": "なか",
                                "en": "inside"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "歩い",
                                "reading": "あるい",
                                "en": "to walk"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "日ごろ",
                                "reading": "ひごろ",
                                "en": "normally"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "ストレス",
                                "reading": "すとれす",
                                "en": "stress"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "忘れる",
                                "reading": "わすれる",
                                "en": "to forget"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "でき",
                                "reading": "でき",
                                "en": "to be able to (to accomplish)"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "また",
                                "reading": "また",
                                "en": null
                            },
                            {
                                "surface": "機会",
                                "reading": "きかい",
                                "en": "chance"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あれ",
                                "reading": "あれ",
                                "en": "that one (over there)"
                            },
                            {
                                "surface": "ば",
                                "reading": "ば",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "家族",
                                "reading": "かぞく",
                                "en": "family"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "連れ",
                                "reading": "つれ",
                                "en": "to lead"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "訪れ",
                                "reading": "おとずれ",
                                "en": "to visit"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思っ",
                                "reading": "おもっ",
                                "en": "to think"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l7-2",
                        "title": "選挙と権利",
                        "words": [
                            {
                                "surface": "選挙",
                                "reading": "せんきょ",
                                "en": "election"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "日",
                                "reading": "ひ",
                                "en": "day"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "近づい",
                                "reading": "ちかづい",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "き",
                                "reading": "き",
                                "en": "spirit"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "多く",
                                "reading": "おおく",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "投票",
                                "reading": "とうひょう",
                                "en": "voting"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行き",
                                "reading": "いき",
                                "en": "to go"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "権利",
                                "reading": "けんり",
                                "en": "right"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "行使",
                                "reading": "こうし",
                                "en": "lecturer"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "この",
                                "reading": "この",
                                "en": "this"
                            },
                            {
                                "surface": "権利",
                                "reading": "けんり",
                                "en": "right"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "長い",
                                "reading": "ながい",
                                "en": "long"
                            },
                            {
                                "surface": "歴史",
                                "reading": "れきし",
                                "en": "history"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "中",
                                "reading": "なか",
                                "en": "inside"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "得",
                                "reading": "え",
                                "en": "to get"
                            },
                            {
                                "surface": "られ",
                                "reading": "られ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "もの",
                                "reading": "もの",
                                "en": "person (same as 人 (ひと))"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "だからこそ",
                                "reading": "だからこそ",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "毎回",
                                "reading": "まいかい",
                                "en": null
                            },
                            {
                                "surface": "必ず",
                                "reading": "かならず",
                                "en": "surely"
                            },
                            {
                                "surface": "投票",
                                "reading": "とうひょう",
                                "en": "voting"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "行く",
                                "reading": "いく",
                                "en": "to go"
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "政治",
                                "reading": "せいじ",
                                "en": "politics"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "関心",
                                "reading": "かんしん",
                                "en": "concern"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "持つ",
                                "reading": "もつ",
                                "en": "to hold"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "社会",
                                "reading": "しゃかい",
                                "en": "society"
                            },
                            {
                                "surface": "人",
                                "reading": "じん",
                                "en": "man"
                            },
                            {
                                "surface": "として",
                                "reading": "として",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "責任",
                                "reading": "せきにん",
                                "en": "duty"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l7-3",
                        "title": "結論の出ない会議",
                        "words": [
                            {
                                "surface": "会議",
                                "reading": "かいぎ",
                                "en": "business meeting"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "意見",
                                "reading": "いけん",
                                "en": "opinion"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "対立",
                                "reading": "たいりつ",
                                "en": "confrontation"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "結論",
                                "reading": "けつろん",
                                "en": "conclusion"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "出",
                                "reading": "で",
                                "en": "to appear"
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "まま",
                                "reading": "まま",
                                "en": null
                            },
                            {
                                "surface": "時間",
                                "reading": "じかん",
                                "en": "time"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "過ぎ",
                                "reading": "すぎ",
                                "en": "to exceed"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いっ",
                                "reading": "いっ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "議長",
                                "reading": "ぎちょう",
                                "en": "chairman"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "「",
                                "reading": "「",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "本日",
                                "reading": "ほんじつ",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "ここ",
                                "reading": "ここ",
                                "en": "here"
                            },
                            {
                                "surface": "まで",
                                "reading": "まで",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "討論",
                                "reading": "とうろん",
                                "en": "discussion"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "継続",
                                "reading": "けいぞく",
                                "en": "continuation"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "」",
                                "reading": "」",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "述べ",
                                "reading": "のべ",
                                "en": "to state"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "会議",
                                "reading": "かいぎ",
                                "en": "business meeting"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "終え",
                                "reading": "おえ",
                                "en": "to finish"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "結局",
                                "reading": "けっきょく",
                                "en": "after all"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "ところ",
                                "reading": "ところ",
                                "en": "place"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "複雑",
                                "reading": "ふくざつ",
                                "en": "complexity"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "問題",
                                "reading": "もんだい",
                                "en": "a problem"
                            },
                            {
                                "surface": "ほど",
                                "reading": "ほど",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一",
                                "reading": "いち",
                                "en": "one"
                            },
                            {
                                "surface": "度",
                                "reading": "ど",
                                "en": "counter for occurrences"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "議論",
                                "reading": "ぎろん",
                                "en": "argument"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "答え",
                                "reading": "こたえ",
                                "en": "answer"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "出す",
                                "reading": "だす",
                                "en": "to take (something) out"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "難しい",
                                "reading": "むずかしい",
                                "en": "difficult"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "痛感",
                                "reading": "つうかん",
                                "en": "feeling keenly"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "せ",
                                "reading": "せ",
                                "en": null
                            },
                            {
                                "surface": "られる",
                                "reading": "られる",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 8,
                "hint": "N3",
                "texts": [
                    {
                        "id": "advanced-l8-1",
                        "title": "信頼できる友人",
                        "words": [
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "長い",
                                "reading": "ながい",
                                "en": "long"
                            },
                            {
                                "surface": "付き合い",
                                "reading": "つきあい",
                                "en": "socialization"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "友人",
                                "reading": "ゆうじん",
                                "en": "friend (formal)"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "約束",
                                "reading": "やくそく",
                                "en": "arrangement"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "守る",
                                "reading": "まもる",
                                "en": "to protect"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "どんなに",
                                "reading": "どんなに",
                                "en": "how"
                            },
                            {
                                "surface": "忙しく",
                                "reading": "いそがしく",
                                "en": "busy (people, days)"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一度",
                                "reading": "いちど",
                                "en": "once"
                            },
                            {
                                "surface": "決め",
                                "reading": "きめ",
                                "en": "to decide (v.t.)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "必ず",
                                "reading": "かならず",
                                "en": "surely"
                            },
                            {
                                "surface": "実行",
                                "reading": "じっこう",
                                "en": "practice"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "だからこそ",
                                "reading": "だからこそ",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "周り",
                                "reading": "まわり",
                                "en": "surroundings"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "深く",
                                "reading": "ふかく",
                                "en": "deep"
                            },
                            {
                                "surface": "信頼",
                                "reading": "しんらい",
                                "en": "reliance"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "誠実",
                                "reading": "せいじつ",
                                "en": "sincere"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "人間",
                                "reading": "にんげん",
                                "en": "human being"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l8-2",
                        "title": "勤勉な同僚",
                        "words": [
                            {
                                "surface": "長年",
                                "reading": "ながねん",
                                "en": null
                            },
                            {
                                "surface": "一緒",
                                "reading": "いっしょ",
                                "en": "together"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "働い",
                                "reading": "はたらい",
                                "en": "to work"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "き",
                                "reading": "き",
                                "en": "spirit"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "同僚",
                                "reading": "どうりょう",
                                "en": "colleague"
                            },
                            {
                                "surface": "について",
                                "reading": "について",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "改めて",
                                "reading": "あらためて",
                                "en": "another time"
                            },
                            {
                                "surface": "考える",
                                "reading": "かんがえる",
                                "en": "to think (about)"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": "a certain..."
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "勤勉",
                                "reading": "きんべん",
                                "en": "industry"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "誰",
                                "reading": "だれ",
                                "en": "who"
                            },
                            {
                                "surface": "より",
                                "reading": "より",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "早く",
                                "reading": "はやく",
                                "en": "early"
                            },
                            {
                                "surface": "出社",
                                "reading": "しゅっしゃ",
                                "en": "come to work"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "誰",
                                "reading": "だれ",
                                "en": "who"
                            },
                            {
                                "surface": "より",
                                "reading": "より",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "遅く",
                                "reading": "おそく",
                                "en": "slow"
                            },
                            {
                                "surface": "まで",
                                "reading": "まで",
                                "en": null
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "取り組む",
                                "reading": "とりくむ",
                                "en": "to tackle"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "姿勢",
                                "reading": "しせい",
                                "en": "attitude"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見る",
                                "reading": "みる",
                                "en": "to see"
                            },
                            {
                                "surface": "たび",
                                "reading": "たび",
                                "en": "travel"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "自分",
                                "reading": "じぶん",
                                "en": "myself"
                            },
                            {
                                "surface": "自身",
                                "reading": "じしん",
                                "en": "oneself"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "甘",
                                "reading": "あま",
                                "en": "generous"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "difference"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "痛感",
                                "reading": "つうかん",
                                "en": "feeling keenly"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "せ",
                                "reading": "せ",
                                "en": null
                            },
                            {
                                "surface": "られる",
                                "reading": "られる",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "生き方",
                                "reading": "いきかた",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "少し",
                                "reading": "すこし",
                                "en": "little"
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "見習い",
                                "reading": "みならい",
                                "en": "to follow another's example"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思う",
                                "reading": "おもう",
                                "en": "to think"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l8-3",
                        "title": "列車事故のニュース",
                        "words": [
                            {
                                "surface": "今朝",
                                "reading": "けさ",
                                "en": "this morning"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "大きな",
                                "reading": "おおきな",
                                "en": "big"
                            },
                            {
                                "surface": "ニュース",
                                "reading": "にゅーす",
                                "en": "news"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "流れ",
                                "reading": "ながれ",
                                "en": "to flow"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "地方",
                                "reading": "ちほう",
                                "en": "area"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "走る",
                                "reading": "はしる",
                                "en": "to run"
                            },
                            {
                                "surface": "列車",
                                "reading": "れっしゃ",
                                "en": "train (ordinary)"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "事故",
                                "reading": "じこ",
                                "en": "accident"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "起き",
                                "reading": "おき",
                                "en": "to get up (e.g., from sleeping)"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "列車",
                                "reading": "れっしゃ",
                                "en": "train (ordinary)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "脱線",
                                "reading": "だっせん",
                                "en": "derailment"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "幸い",
                                "reading": "さいわい",
                                "en": "fortunately"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "大きな",
                                "reading": "おおきな",
                                "en": "big"
                            },
                            {
                                "surface": "怪我",
                                "reading": "けが",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "なかっ",
                                "reading": "なかっ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "報道",
                                "reading": "ほうどう",
                                "en": "coverage"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "原因",
                                "reading": "げんいん",
                                "en": "cause"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "まだ",
                                "reading": "まだ",
                                "en": "yet"
                            },
                            {
                                "surface": "調査",
                                "reading": "ちょうさ",
                                "en": "survey"
                            },
                            {
                                "surface": "中",
                                "reading": "ちゅう",
                                "en": "inside"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "線路",
                                "reading": "せんろ",
                                "en": "line"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "異常",
                                "reading": "いじょう",
                                "en": "strangeness"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "関係",
                                "reading": "かんけい",
                                "en": "relation(ship)"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "可能",
                                "reading": "かのう",
                                "en": "possible"
                            },
                            {
                                "surface": "性",
                                "reading": "せい",
                                "en": "sex"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": "a certain..."
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "です",
                                "reading": "です",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "この",
                                "reading": "この",
                                "en": "this"
                            },
                            {
                                "surface": "事故",
                                "reading": "じこ",
                                "en": "accident"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "影響",
                                "reading": "えいきょう",
                                "en": "influence"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "周辺",
                                "reading": "しゅうへん",
                                "en": "circumference"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "交通",
                                "reading": "こうつう",
                                "en": "traffic"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "大きく",
                                "reading": "おおきく",
                                "en": "big"
                            },
                            {
                                "surface": "乱れ",
                                "reading": "みだれ",
                                "en": "to get confused"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "多く",
                                "reading": "おおく",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "利用",
                                "reading": "りよう",
                                "en": "use"
                            },
                            {
                                "surface": "者",
                                "reading": "しゃ",
                                "en": "person (same as 人 (ひと))"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "困っ",
                                "reading": "こまっ",
                                "en": "to be bothered"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "様子",
                                "reading": "ようす",
                                "en": "aspect"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "駅",
                                "reading": "えき",
                                "en": "station"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "立っ",
                                "reading": "たっ",
                                "en": "to stand up"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "安全",
                                "reading": "あんぜん",
                                "en": "safety"
                            },
                            {
                                "surface": "対策",
                                "reading": "たいさく",
                                "en": "counter-plan"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "見直し",
                                "reading": "みなおし",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "求め",
                                "reading": "もとめ",
                                "en": "to request"
                            },
                            {
                                "surface": "られ",
                                "reading": "られ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 9,
                "hint": "N1",
                "texts": [
                    {
                        "id": "advanced-l9-1",
                        "title": "議会解散のニュース",
                        "words": [
                            {
                                "surface": "先週",
                                "reading": "せんしゅう",
                                "en": "last week"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "大きな",
                                "reading": "おおきな",
                                "en": "big"
                            },
                            {
                                "surface": "ニュース",
                                "reading": "にゅーす",
                                "en": "news"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "あり",
                                "reading": "あり",
                                "en": null
                            },
                            {
                                "surface": "まし",
                                "reading": "まし",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "議会",
                                "reading": "ぎかい",
                                "en": "Diet"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "解散",
                                "reading": "かいさん",
                                "en": "breakup"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "これ",
                                "reading": "これ",
                                "en": "this one"
                            },
                            {
                                "surface": "により",
                                "reading": "により",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "近い",
                                "reading": "ちかい",
                                "en": "near"
                            },
                            {
                                "surface": "うち",
                                "reading": "うち",
                                "en": "home"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "選挙",
                                "reading": "せんきょ",
                                "en": "election"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "行わ",
                                "reading": "おこなわ",
                                "en": "to carry out"
                            },
                            {
                                "surface": "れる",
                                "reading": "れる",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "国民",
                                "reading": "こくみん",
                                "en": "national"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "関心",
                                "reading": "かんしん",
                                "en": "concern"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "高まっ",
                                "reading": "たかまっ",
                                "en": "to rise"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "テレビ",
                                "reading": "てれび",
                                "en": "television"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "連日",
                                "reading": "れんじつ",
                                "en": "every day"
                            },
                            {
                                "surface": "報道",
                                "reading": "ほうどう",
                                "en": "coverage"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今後",
                                "reading": "こんご",
                                "en": "from now on"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "政治",
                                "reading": "せいじ",
                                "en": "politics"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "動き",
                                "reading": "うごき",
                                "en": "movement"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "注目",
                                "reading": "ちゅうもく",
                                "en": "notice"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "たい",
                                "reading": "たい",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "思い",
                                "reading": "おもい",
                                "en": "to think"
                            },
                            {
                                "surface": "ます",
                                "reading": "ます",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l9-2",
                        "title": "体調管理と後悔",
                        "words": [
                            {
                                "surface": "体調",
                                "reading": "たいちょう",
                                "en": null
                            },
                            {
                                "surface": "管理",
                                "reading": "かんり",
                                "en": "control"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "重要",
                                "reading": "じゅうよう",
                                "en": "important"
                            },
                            {
                                "surface": "性",
                                "reading": "せい",
                                "en": "sex"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "誰",
                                "reading": "だれ",
                                "en": "who"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "頭",
                                "reading": "あたま",
                                "en": "head"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "理解",
                                "reading": "りかい",
                                "en": "understanding"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "はず",
                                "reading": "はず",
                                "en": "it should be so"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "しかし",
                                "reading": "しかし",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "実際",
                                "reading": "じっさい",
                                "en": "in fact"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "体",
                                "reading": "からだ",
                                "en": "body"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "壊し",
                                "reading": "こわし",
                                "en": "to break"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "初めて",
                                "reading": "はじめて",
                                "en": "for the first time"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "大切",
                                "reading": "たいせつ",
                                "en": "important"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "difference"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "痛感",
                                "reading": "つうかん",
                                "en": "feeling keenly"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "もの",
                                "reading": "もの",
                                "en": "person (same as 人 (ひと))"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "先日",
                                "reading": "せんじつ",
                                "en": "the other day"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "激しい",
                                "reading": "はげしい",
                                "en": "violent"
                            },
                            {
                                "surface": "頭痛",
                                "reading": "ずつう",
                                "en": "headache"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "見舞わ",
                                "reading": "みまわ",
                                "en": "to ask after (health)"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "風邪",
                                "reading": "かぜ",
                                "en": "cold"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "頭",
                                "reading": "あたま",
                                "en": "head"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "痛い",
                                "reading": "いたい",
                                "en": "hurt"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "気づい",
                                "reading": "きづい",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "とき",
                                "reading": "とき",
                                "en": null
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "すでに",
                                "reading": "すでに",
                                "en": "already (same as もう)"
                            },
                            {
                                "surface": "仕事",
                                "reading": "しごと",
                                "en": "work"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "支障",
                                "reading": "ししょう",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "きたす",
                                "reading": "きたす",
                                "en": null
                            },
                            {
                                "surface": "ほど",
                                "reading": "ほど",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "状態",
                                "reading": "じょうたい",
                                "en": "condition"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なっ",
                                "reading": "なっ",
                                "en": "to become"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "振り返れ",
                                "reading": "ふりかえれ",
                                "en": "to turn head"
                            },
                            {
                                "surface": "ば",
                                "reading": "ば",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "睡眠",
                                "reading": "すいみん",
                                "en": "sleep"
                            },
                            {
                                "surface": "不足",
                                "reading": "ふそく",
                                "en": "insufficiency"
                            },
                            {
                                "surface": "や",
                                "reading": "や",
                                "en": null
                            },
                            {
                                "surface": "不規則",
                                "reading": "ふきそく",
                                "en": "irregularity"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "生活",
                                "reading": "せいかつ",
                                "en": "living"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "原因",
                                "reading": "げんいん",
                                "en": "cause"
                            },
                            {
                                "surface": "だっ",
                                "reading": "だっ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "だろ",
                                "reading": "だろ",
                                "en": null
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "健康",
                                "reading": "けんこう",
                                "en": "health(y)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "失っ",
                                "reading": "うしなっ",
                                "en": "to lose"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "初めて",
                                "reading": "はじめて",
                                "en": "for the first time"
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "価値",
                                "reading": "かち",
                                "en": "value"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "気づく",
                                "reading": "きづく",
                                "en": "to notice"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "よく",
                                "reading": "よく",
                                "en": "frequently"
                            },
                            {
                                "surface": "言わ",
                                "reading": "いわ",
                                "en": "to say"
                            },
                            {
                                "surface": "れる",
                                "reading": "れる",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "まさに",
                                "reading": "まさに",
                                "en": "correctly"
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "通り",
                                "reading": "とおり",
                                "en": "~ Street"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "痛感",
                                "reading": "つうかん",
                                "en": "feeling keenly"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "せ",
                                "reading": "せ",
                                "en": null
                            },
                            {
                                "surface": "られ",
                                "reading": "られ",
                                "en": null
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "これ",
                                "reading": "これ",
                                "en": "this one"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "機",
                                "reading": "き",
                                "en": "spirit"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "生活",
                                "reading": "せいかつ",
                                "en": "living"
                            },
                            {
                                "surface": "習慣",
                                "reading": "しゅうかん",
                                "en": "custom (in reference to culture)"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見直そ",
                                "reading": "みなおそ",
                                "en": "to look over again"
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "決意",
                                "reading": "けつい",
                                "en": "decision"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l9-3",
                        "title": "強い個性",
                        "words": [
                            {
                                "surface": "職場",
                                "reading": "しょくば",
                                "en": "workplace"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "様々",
                                "reading": "さまざま",
                                "en": "varied"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "中",
                                "reading": "なか",
                                "en": "inside"
                            },
                            {
                                "surface": "でも",
                                "reading": "でも",
                                "en": null
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "個性",
                                "reading": "こせい",
                                "en": "individuality"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "強い",
                                "reading": "つよい",
                                "en": "strong"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "自分",
                                "reading": "じぶん",
                                "en": "myself"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "意見",
                                "reading": "いけん",
                                "en": "opinion"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "はっきり",
                                "reading": "はっきり",
                                "en": "clearly"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "述べ",
                                "reading": "のべ",
                                "en": "to state"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "周囲",
                                "reading": "しゅうい",
                                "en": "surroundings"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "流さ",
                                "reading": "ながさ",
                                "en": "to drain"
                            },
                            {
                                "surface": "れる",
                                "reading": "れる",
                                "en": null
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": "there isn't"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "時に",
                                "reading": "ときに",
                                "en": null
                            },
                            {
                                "surface": "ぶつかる",
                                "reading": "ぶつかる",
                                "en": "to strike"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": "a certain..."
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "存在",
                                "reading": "そんざい",
                                "en": "existence"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "こそ",
                                "reading": "こそ",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "議論",
                                "reading": "ぎろん",
                                "en": "argument"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "活発",
                                "reading": "かっぱつ",
                                "en": "vigor"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "組織",
                                "reading": "そしき",
                                "en": "organization"
                            },
                            {
                                "surface": "全体",
                                "reading": "ぜんたい",
                                "en": "whole"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "成長",
                                "reading": "せいちょう",
                                "en": "growth"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "私",
                                "reading": "わたし",
                                "en": "I (formal)"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "考え",
                                "reading": "かんがえ",
                                "en": "to think (about)"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            },
            {
                "levelNum": 10,
                "hint": "N1",
                "texts": [
                    {
                        "id": "advanced-l10-1",
                        "title": "頭が切れる人",
                        "words": [
                            {
                                "surface": "世の中",
                                "reading": "よのなか",
                                "en": "society"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "様々",
                                "reading": "さまざま",
                                "en": "varied"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "才能",
                                "reading": "さいのう",
                                "en": "talent"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "持つ",
                                "reading": "もつ",
                                "en": "to hold"
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "同僚",
                                "reading": "どうりょう",
                                "en": "colleague"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "一",
                                "reading": "いち",
                                "en": "one"
                            },
                            {
                                "surface": "人",
                                "reading": "にん",
                                "en": "man"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "例",
                                "reading": "れい",
                                "en": "instance"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "頭",
                                "reading": "あたま",
                                "en": "head"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "切れる",
                                "reading": "きれる",
                                "en": "to cut well"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "誰",
                                "reading": "だれ",
                                "en": "who"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "認め",
                                "reading": "みとめ",
                                "en": "to recognize"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "それ",
                                "reading": "それ",
                                "en": "that one"
                            },
                            {
                                "surface": "だけ",
                                "reading": "だけ",
                                "en": null
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "人望",
                                "reading": "じんぼう",
                                "en": null
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "得",
                                "reading": "え",
                                "en": "to get"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "わけ",
                                "reading": "わけ",
                                "en": "reason"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "周囲",
                                "reading": "しゅうい",
                                "en": "surroundings"
                            },
                            {
                                "surface": "へ",
                                "reading": "へ",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "配慮",
                                "reading": "はいりょ",
                                "en": "consideration"
                            },
                            {
                                "surface": "や",
                                "reading": "や",
                                "en": null
                            },
                            {
                                "surface": "誠実",
                                "reading": "せいじつ",
                                "en": "sincere"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "difference"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "伴っ",
                                "reading": "ともなっ",
                                "en": "to accompany"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "初めて",
                                "reading": "はじめて",
                                "en": "for the first time"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "真に",
                                "reading": "しんに",
                                "en": null
                            },
                            {
                                "surface": "信頼",
                                "reading": "しんらい",
                                "en": "reliance"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "れる",
                                "reading": "れる",
                                "en": null
                            },
                            {
                                "surface": "人物",
                                "reading": "じんぶつ",
                                "en": "character"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "なれる",
                                "reading": "なれる",
                                "en": "to become domesticated"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "だ",
                                "reading": "だ",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "彼",
                                "reading": "かれ",
                                "en": "he"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "見",
                                "reading": "み",
                                "en": "to see"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "感じる",
                                "reading": "かんじる",
                                "en": "to feel"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l10-2",
                        "title": "幽霊の存在について",
                        "words": [
                            {
                                "surface": "幽霊",
                                "reading": "ゆうれい",
                                "en": "ghost"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "存在",
                                "reading": "そんざい",
                                "en": "existence"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "か",
                                "reading": "か",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "それとも",
                                "reading": "それとも",
                                "en": null
                            },
                            {
                                "surface": "人間",
                                "reading": "にんげん",
                                "en": "human being"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "想像",
                                "reading": "そうぞう",
                                "en": "imagination"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "すぎ",
                                "reading": "すぎ",
                                "en": "Japanese cedar"
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "か",
                                "reading": "か",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "この",
                                "reading": "この",
                                "en": "this"
                            },
                            {
                                "surface": "問い",
                                "reading": "とい",
                                "en": "question"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "古く",
                                "reading": "ふるく",
                                "en": null
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "議論",
                                "reading": "ぎろん",
                                "en": "argument"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "れ",
                                "reading": "れ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "き",
                                "reading": "き",
                                "en": "spirit"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "いまだに",
                                "reading": "いまだに",
                                "en": null
                            },
                            {
                                "surface": "明確",
                                "reading": "めいかく",
                                "en": "clear"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "答え",
                                "reading": "こたえ",
                                "en": "answer"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "出",
                                "reading": "で",
                                "en": "to appear"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "科学",
                                "reading": "かがく",
                                "en": "science"
                            },
                            {
                                "surface": "的",
                                "reading": "てき",
                                "en": "enemy"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "観点",
                                "reading": "かんてん",
                                "en": "point of view"
                            },
                            {
                                "surface": "から",
                                "reading": "から",
                                "en": null
                            },
                            {
                                "surface": "見れ",
                                "reading": "みれ",
                                "en": "to see"
                            },
                            {
                                "surface": "ば",
                                "reading": "ば",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "幽霊",
                                "reading": "ゆうれい",
                                "en": "ghost"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "存在",
                                "reading": "そんざい",
                                "en": "existence"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "証明",
                                "reading": "しょうめい",
                                "en": "proof"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "客観",
                                "reading": "きゃっかん",
                                "en": "objective"
                            },
                            {
                                "surface": "的",
                                "reading": "てき",
                                "en": "enemy"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "証拠",
                                "reading": "しょうこ",
                                "en": "evidence"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "存在",
                                "reading": "そんざい",
                                "en": "existence"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "しかし",
                                "reading": "しかし",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "多く",
                                "reading": "おおく",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "人",
                                "reading": "ひと",
                                "en": "man"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "不思議",
                                "reading": "ふしぎ",
                                "en": "mystery"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "体験",
                                "reading": "たいけん",
                                "en": "personal experience"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "証言",
                                "reading": "しょうげん",
                                "en": "evidence"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "事実",
                                "reading": "じじつ",
                                "en": "fact"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "幽霊",
                                "reading": "ゆうれい",
                                "en": "ghost"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "存在",
                                "reading": "そんざい",
                                "en": "existence"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "そう",
                                "reading": "そう",
                                "en": "really"
                            },
                            {
                                "surface": "断言",
                                "reading": "だんげん",
                                "en": "assertion"
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "人々",
                                "reading": "ひとびと",
                                "en": null
                            },
                            {
                                "surface": "にとって",
                                "reading": "にとって",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "その",
                                "reading": "その",
                                "en": "that"
                            },
                            {
                                "surface": "体験",
                                "reading": "たいけん",
                                "en": "personal experience"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "疑い",
                                "reading": "うたがい",
                                "en": null
                            },
                            {
                                "surface": "よう",
                                "reading": "よう",
                                "en": "to get drunk"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": "there isn't"
                            },
                            {
                                "surface": "現実",
                                "reading": "げんじつ",
                                "en": "reality"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "だろ",
                                "reading": "だろ",
                                "en": null
                            },
                            {
                                "surface": "う",
                                "reading": "う",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "一方",
                                "reading": "いっぽう",
                                "en": null
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "そうした",
                                "reading": "そうした",
                                "en": null
                            },
                            {
                                "surface": "現象",
                                "reading": "げんしょう",
                                "en": "phenomenon"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "脳",
                                "reading": "のう",
                                "en": "brain"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "錯覚",
                                "reading": "さっかく",
                                "en": null
                            },
                            {
                                "surface": "や",
                                "reading": "や",
                                "en": null
                            },
                            {
                                "surface": "心理",
                                "reading": "しんり",
                                "en": "mentality"
                            },
                            {
                                "surface": "的",
                                "reading": "てき",
                                "en": "enemy"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "要因",
                                "reading": "よういん",
                                "en": "primary factor"
                            },
                            {
                                "surface": "によって",
                                "reading": "によって",
                                "en": null
                            },
                            {
                                "surface": "説明",
                                "reading": "せつめい",
                                "en": "explanation"
                            },
                            {
                                "surface": "できる",
                                "reading": "できる",
                                "en": "to be able to (to accomplish)"
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "する",
                                "reading": "する",
                                "en": "to do"
                            },
                            {
                                "surface": "研究",
                                "reading": "けんきゅう",
                                "en": "study"
                            },
                            {
                                "surface": "者",
                                "reading": "しゃ",
                                "en": "person (same as 人 (ひと))"
                            },
                            {
                                "surface": "も",
                                "reading": "も",
                                "en": null
                            },
                            {
                                "surface": "少なく",
                                "reading": "すくなく",
                                "en": "a little"
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "結局",
                                "reading": "けっきょく",
                                "en": "after all"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "ところ",
                                "reading": "ところ",
                                "en": "place"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "この",
                                "reading": "この",
                                "en": "this"
                            },
                            {
                                "surface": "問題",
                                "reading": "もんだい",
                                "en": "a problem"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "唯一",
                                "reading": "ゆいいつ",
                                "en": "only"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "正解",
                                "reading": "せいかい",
                                "en": "correct"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "求める",
                                "reading": "もとめる",
                                "en": "to request"
                            },
                            {
                                "surface": "こと",
                                "reading": "こと",
                                "en": "Japanese harp"
                            },
                            {
                                "surface": "自体",
                                "reading": "じたい",
                                "en": "refusal"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "無意味",
                                "reading": "むいみ",
                                "en": "nonsense"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": "field"
                            },
                            {
                                "surface": "かも",
                                "reading": "かも",
                                "en": null
                            },
                            {
                                "surface": "しれ",
                                "reading": "しれ",
                                "en": null
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    },
                    {
                        "id": "advanced-l10-3",
                        "title": "暴動とその後",
                        "words": [
                            {
                                "surface": "先月",
                                "reading": "せんげつ",
                                "en": "last month"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "隣国",
                                "reading": "りんごく",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "首都",
                                "reading": "しゅと",
                                "en": "capital city"
                            },
                            {
                                "surface": "で",
                                "reading": "で",
                                "en": null
                            },
                            {
                                "surface": "大",
                                "reading": "だい",
                                "en": null
                            },
                            {
                                "surface": "規模",
                                "reading": "きぼ",
                                "en": "scale"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "暴動",
                                "reading": "ぼうどう",
                                "en": "insurrection"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "発生",
                                "reading": "はっせい",
                                "en": "outbreak"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "世界中",
                                "reading": "せかいじゅう",
                                "en": null
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "メディア",
                                "reading": "めでぃあ",
                                "en": "media"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "注目",
                                "reading": "ちゅうもく",
                                "en": "notice"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "政府",
                                "reading": "せいふ",
                                "en": "government"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "政策",
                                "reading": "せいさく",
                                "en": "political measures"
                            },
                            {
                                "surface": "に対する",
                                "reading": "にたいする",
                                "en": null
                            },
                            {
                                "surface": "不満",
                                "reading": "ふまん",
                                "en": "dissatisfaction"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "引き金",
                                "reading": "ひきがね",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "なり",
                                "reading": "なり",
                                "en": "to become"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "数",
                                "reading": "すう",
                                "en": "number"
                            },
                            {
                                "surface": "万",
                                "reading": "まん",
                                "en": "ten thousand"
                            },
                            {
                                "surface": "人",
                                "reading": "にん",
                                "en": "man"
                            },
                            {
                                "surface": "規模",
                                "reading": "きぼ",
                                "en": "scale"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "デモ",
                                "reading": "でも",
                                "en": "demo"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "暴徒",
                                "reading": "ぼうと",
                                "en": null
                            },
                            {
                                "surface": "化",
                                "reading": "か",
                                "en": "department"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "伝え",
                                "reading": "つたえ",
                                "en": "to convey (a message)"
                            },
                            {
                                "surface": "られ",
                                "reading": "られ",
                                "en": null
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "治安",
                                "reading": "ちあん",
                                "en": "public order"
                            },
                            {
                                "surface": "部隊",
                                "reading": "ぶたい",
                                "en": "stage (theater)"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "出動",
                                "reading": "しゅつどう",
                                "en": "mobilization"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "数",
                                "reading": "すう",
                                "en": "number"
                            },
                            {
                                "surface": "日",
                                "reading": "にち",
                                "en": "day"
                            },
                            {
                                "surface": "にわたる",
                                "reading": "にわたる",
                                "en": null
                            },
                            {
                                "surface": "緊張",
                                "reading": "きんちょう",
                                "en": "tension"
                            },
                            {
                                "surface": "状態",
                                "reading": "じょうたい",
                                "en": "condition"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "続い",
                                "reading": "つづい",
                                "en": "to be continued"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "暴動",
                                "reading": "ぼうどう",
                                "en": "insurrection"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "治まっ",
                                "reading": "おさまっ",
                                "en": "to be at peace"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "いえ",
                                "reading": "いえ",
                                "en": "house"
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "事態",
                                "reading": "じたい",
                                "en": "refusal"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "完全",
                                "reading": "かんぜん",
                                "en": "perfection"
                            },
                            {
                                "surface": "に",
                                "reading": "に",
                                "en": null
                            },
                            {
                                "surface": "収束",
                                "reading": "しゅうそく",
                                "en": null
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "た",
                                "reading": "た",
                                "en": null
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "言い",
                                "reading": "いい",
                                "en": "to say"
                            },
                            {
                                "surface": "難く",
                                "reading": "がたく",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "根本",
                                "reading": "こんぽん",
                                "en": "foundation"
                            },
                            {
                                "surface": "的",
                                "reading": "てき",
                                "en": "enemy"
                            },
                            {
                                "surface": "な",
                                "reading": "な",
                                "en": null
                            },
                            {
                                "surface": "問題",
                                "reading": "もんだい",
                                "en": "a problem"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "依然として",
                                "reading": "いぜんとして",
                                "en": null
                            },
                            {
                                "surface": "解決",
                                "reading": "かいけつ",
                                "en": "settlement"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "い",
                                "reading": "い",
                                "en": "will"
                            },
                            {
                                "surface": "ない",
                                "reading": "ない",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "専門",
                                "reading": "せんもん",
                                "en": "major"
                            },
                            {
                                "surface": "家",
                                "reading": "か",
                                "en": "house"
                            },
                            {
                                "surface": "は",
                                "reading": "は",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "対話",
                                "reading": "たいわ",
                                "en": "conversation"
                            },
                            {
                                "surface": "による",
                                "reading": "による",
                                "en": null
                            },
                            {
                                "surface": "解決",
                                "reading": "かいけつ",
                                "en": "settlement"
                            },
                            {
                                "surface": "を",
                                "reading": "を",
                                "en": null
                            },
                            {
                                "surface": "図ら",
                                "reading": "はから",
                                "en": "to plot"
                            },
                            {
                                "surface": "なけれ",
                                "reading": "なけれ",
                                "en": null
                            },
                            {
                                "surface": "ば",
                                "reading": "ば",
                                "en": null
                            },
                            {
                                "surface": "、",
                                "reading": "、",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "同様",
                                "reading": "どうよう",
                                "en": "identical"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "混乱",
                                "reading": "こんらん",
                                "en": "chaos"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "再び",
                                "reading": "ふたたび",
                                "en": "again"
                            },
                            {
                                "surface": "起こる",
                                "reading": "おこる",
                                "en": "to occur"
                            },
                            {
                                "surface": "可能",
                                "reading": "かのう",
                                "en": "possible"
                            },
                            {
                                "surface": "性",
                                "reading": "せい",
                                "en": "sex"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "ある",
                                "reading": "ある",
                                "en": "a certain..."
                            },
                            {
                                "surface": "と",
                                "reading": "と",
                                "en": null
                            },
                            {
                                "surface": "警告",
                                "reading": "けいこく",
                                "en": "warning"
                            },
                            {
                                "surface": "し",
                                "reading": "し",
                                "en": "to do"
                            },
                            {
                                "surface": "て",
                                "reading": "て",
                                "en": null
                            },
                            {
                                "surface": "いる",
                                "reading": "いる",
                                "en": "to parch"
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            },
                            {
                                "surface": "今後",
                                "reading": "こんご",
                                "en": "from now on"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "政府",
                                "reading": "せいふ",
                                "en": "government"
                            },
                            {
                                "surface": "の",
                                "reading": "の",
                                "en": null
                            },
                            {
                                "surface": "対応",
                                "reading": "たいおう",
                                "en": "dealing with"
                            },
                            {
                                "surface": "が",
                                "reading": "が",
                                "en": null
                            },
                            {
                                "surface": "注視",
                                "reading": "ちゅうし",
                                "en": "suspension"
                            },
                            {
                                "surface": "さ",
                                "reading": "さ",
                                "en": "to do"
                            },
                            {
                                "surface": "れる",
                                "reading": "れる",
                                "en": null
                            },
                            {
                                "surface": "。",
                                "reading": "。",
                                "en": null,
                                "sym": true
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
