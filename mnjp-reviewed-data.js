// Mongolian <-> Japanese word-pair candidates from the MN-JP bridge pipeline (pivot-bridged
// through shared English glosses, Mongolian Wiktionary via kaikki.org + JMdict), human-reviewed
// by the site owner (Batch A + Batch B, 1,005 total). Each entry: { mongolian, japanese,
// confidence, matchedVia, mark }. mark is 'good' (semantically correct), 'awkward' (phonetic/
// loose match, narrower or off sense -- usable with caution, not a confident dictionary entry),
// or 'bad' (wrong, discard).
//
// NOT currently wired into any page. Two uses so far:
// 1. Cross-matched by japanese against game-words.js entries missing a Mongolian translation
//    (filled 33 of 750 new Word Match words added in the August 2026 25-pairs-per-level
//    expansion -- the two pools only coincidentally overlap, most new words still lack enMn).
// 2. Reserved for a possible future standalone Mongolian<->Japanese dictionary page (not
//    dictionary-data.js/Wakan Dictionary -- that file pairs kango<->wago, both Japanese, and
//    doesn't fit this shape at all).
const MNJP_REVIEWED =
[
    {
        "mongolian": "гайхах",
        "japanese": "吃驚",
        "confidence": "medium",
        "matchedVia": [
            "to be surprised"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өгөгдөл",
        "japanese": "ねた",
        "confidence": "medium",
        "matchedVia": [
            "information"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тахих",
        "japanese": "供える",
        "confidence": "medium",
        "matchedVia": [
            "to sacrifice"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бэлчээр",
        "japanese": "牧草",
        "confidence": "medium",
        "matchedVia": [
            "pasture"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өд",
        "japanese": "羽",
        "confidence": "medium",
        "matchedVia": [
            "feather"
        ],
        "mark": "good"
    },
    {
        "mongolian": "уях",
        "japanese": "結ぶ",
        "confidence": "medium",
        "matchedVia": [
            "to tie"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цуу",
        "japanese": "酢",
        "confidence": "medium",
        "matchedVia": [
            "vinegar"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тайтгарал",
        "japanese": "楽",
        "confidence": "medium",
        "matchedVia": [
            "comfort"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "зуурах",
        "japanese": "こね回す",
        "confidence": "medium",
        "matchedVia": [
            "to knead",
            "to mix"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дуу",
        "japanese": "声",
        "confidence": "medium",
        "matchedVia": [
            "voice"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эзэн хаан",
        "japanese": "皇帝",
        "confidence": "medium",
        "matchedVia": [
            "emperor"
        ],
        "mark": "good"
    },
    {
        "mongolian": "будах",
        "japanese": "彩る",
        "confidence": "medium",
        "matchedVia": [
            "to paint"
        ],
        "mark": "good"
    },
    {
        "mongolian": "даваа",
        "japanese": "支障",
        "confidence": "medium",
        "matchedVia": [
            "difficulty",
            "obstacle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сурвалж",
        "japanese": "元",
        "confidence": "low",
        "matchedVia": [
            "root"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "зүйр",
        "japanese": "比べ",
        "confidence": "medium",
        "matchedVia": [
            "comparison"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хооллох",
        "japanese": "飼う",
        "confidence": "medium",
        "matchedVia": [
            "to feed"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мэдрэл",
        "japanese": "神経",
        "confidence": "medium",
        "matchedVia": [
            "nerve"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тоосго",
        "japanese": "煉瓦",
        "confidence": "medium",
        "matchedVia": [
            "brick"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бөс",
        "japanese": "生地",
        "confidence": "medium",
        "matchedVia": [
            "cloth"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "тэсрэх бодис",
        "japanese": "危険物",
        "confidence": "medium",
        "matchedVia": [
            "explosives"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "шийтгэл",
        "japanese": "刑",
        "confidence": "medium",
        "matchedVia": [
            "punishment"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "солгой",
        "japanese": "すまた",
        "confidence": "medium",
        "matchedVia": [
            "out of tune"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "өв",
        "japanese": "遺産",
        "confidence": "medium",
        "matchedVia": [
            "inheritance",
            "heritage"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бодисадва",
        "japanese": "菩薩",
        "confidence": "medium",
        "matchedVia": [
            "bodhisattva"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үнс",
        "japanese": "灰",
        "confidence": "medium",
        "matchedVia": [
            "ash"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шүд",
        "japanese": "歯",
        "confidence": "medium",
        "matchedVia": [
            "tooth"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зурах",
        "japanese": "詠む",
        "confidence": "medium",
        "matchedVia": [
            "to write"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "химийн зэвсэг",
        "japanese": "化学兵器",
        "confidence": "medium",
        "matchedVia": [
            "chemical weapon"
        ],
        "mark": "good"
    },
    {
        "mongolian": "булшлах",
        "japanese": "葬る",
        "confidence": "low",
        "matchedVia": [
            "to bury"
        ],
        "mark": "good"
    },
    {
        "mongolian": "олон",
        "japanese": "公衆",
        "confidence": "medium",
        "matchedVia": [
            "the public"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "тийн ялгал",
        "japanese": "案件",
        "confidence": "medium",
        "matchedVia": [
            "case"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "Нэгдсэн Үндэстний Байгууллага",
        "japanese": "国連",
        "confidence": "low",
        "matchedVia": [
            "united nations"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тив",
        "japanese": "大陸",
        "confidence": "medium",
        "matchedVia": [
            "continent"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эзэмдэх",
        "japanese": "乗り越える",
        "confidence": "low",
        "matchedVia": [
            "to overtake"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "улаан суулга",
        "japanese": "赤痢",
        "confidence": "medium",
        "matchedVia": [
            "dysentery"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "бослого",
        "japanese": "事変",
        "confidence": "medium",
        "matchedVia": [
            "uprising"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "урвагч",
        "japanese": "裏切り者",
        "confidence": "medium",
        "matchedVia": [
            "traitor"
        ],
        "mark": "good"
    },
    {
        "mongolian": "түм",
        "japanese": "万",
        "confidence": "low",
        "matchedVia": [
            "ten thousand"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үс",
        "japanese": "皮",
        "confidence": "medium",
        "matchedVia": [
            "fur"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сонгох",
        "japanese": "決める",
        "confidence": "medium",
        "matchedVia": [
            "to choose"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зүгээр зүгээр",
        "japanese": "問題ない",
        "confidence": "low",
        "matchedVia": [
            "no problem"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "батга",
        "japanese": "面皰",
        "confidence": "medium",
        "matchedVia": [
            "pimple"
        ],
        "mark": "good"
    },
    {
        "mongolian": "богино долгионы зуух",
        "japanese": "電子レンジ",
        "confidence": "medium",
        "matchedVia": [
            "microwave oven"
        ],
        "mark": "good"
    },
    {
        "mongolian": "алга",
        "japanese": "手のひら",
        "confidence": "medium",
        "matchedVia": [
            "palm of the hand"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үнэрлэх",
        "japanese": "嗅ぐ",
        "confidence": "medium",
        "matchedVia": [
            "to sniff"
        ],
        "mark": "good"
    },
    {
        "mongolian": "боть",
        "japanese": "大著",
        "confidence": "medium",
        "matchedVia": [
            "tome"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хиймэл",
        "japanese": "人為的",
        "confidence": "medium",
        "matchedVia": [
            "artificial"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дотор",
        "japanese": "国内",
        "confidence": "medium",
        "matchedVia": [
            "internal"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "луйвар",
        "japanese": "詐欺",
        "confidence": "medium",
        "matchedVia": [
            "scam"
        ],
        "mark": "good"
    },
    {
        "mongolian": "модоч",
        "japanese": "匠",
        "confidence": "medium",
        "matchedVia": [
            "carpenter"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шалтгаан",
        "japanese": "胎児",
        "confidence": "medium",
        "matchedVia": [
            "fetus"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "аюул занал",
        "japanese": "威嚇",
        "confidence": "medium",
        "matchedVia": [
            "threat"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "ялах",
        "japanese": "取る",
        "confidence": "low",
        "matchedVia": [
            "to win"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "бөднө",
        "japanese": "鶉",
        "confidence": "medium",
        "matchedVia": [
            "quail"
        ],
        "mark": "good"
    },
    {
        "mongolian": "арбитраж",
        "japanese": "仲裁",
        "confidence": "medium",
        "matchedVia": [
            "arbitration"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "эцэг",
        "japanese": "お父さん",
        "confidence": "medium",
        "matchedVia": [
            "father"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шагай",
        "japanese": "足首",
        "confidence": "medium",
        "matchedVia": [
            "ankle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "олон тоо",
        "japanese": "多元的",
        "confidence": "low",
        "matchedVia": [
            "plural"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мөсөн гол",
        "japanese": "氷河",
        "confidence": "medium",
        "matchedVia": [
            "glacier"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "нар",
        "japanese": "太陽",
        "confidence": "medium",
        "matchedVia": [
            "sun"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дуулах",
        "japanese": "承る",
        "confidence": "medium",
        "matchedVia": [
            "to hear"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дэл",
        "japanese": "堤",
        "confidence": "medium",
        "matchedVia": [
            "dike"
        ],
        "mark": "good"
    },
    {
        "mongolian": "канжи",
        "japanese": "漢字",
        "confidence": "medium",
        "matchedVia": [
            "kanji"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "гийгэх",
        "japanese": "明る",
        "confidence": "medium",
        "matchedVia": [
            "to become bright"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тэмдэг нэр",
        "japanese": "形容詞",
        "confidence": "medium",
        "matchedVia": [
            "adjective"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зарлалын самбар",
        "japanese": "掲示板",
        "confidence": "medium",
        "matchedVia": [
            "notice board"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эзлэх",
        "japanese": "乗っ取る",
        "confidence": "medium",
        "matchedVia": [
            "to occupy"
        ],
        "mark": "good"
    },
    {
        "mongolian": "аж үйлдвэр",
        "japanese": "産業",
        "confidence": "medium",
        "matchedVia": [
            "industry"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нялх",
        "japanese": "稚拙",
        "confidence": "medium",
        "matchedVia": [
            "childish"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "гийгүүлэгч",
        "japanese": "子音",
        "confidence": "medium",
        "matchedVia": [
            "consonant"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "булшны чулуу",
        "japanese": "墓標",
        "confidence": "medium",
        "matchedVia": [
            "headstone"
        ],
        "mark": "good"
    },
    {
        "mongolian": "баярлах",
        "japanese": "祝う",
        "confidence": "medium",
        "matchedVia": [
            "to celebrate"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өсгий",
        "japanese": "卑劣漢",
        "confidence": "medium",
        "matchedVia": [
            "heel"
        ],
        "mark": "good"
    },
    {
        "mongolian": "маргах",
        "japanese": "弁じる",
        "confidence": "medium",
        "matchedVia": [
            "to argue"
        ],
        "mark": "good"
    },
    {
        "mongolian": "морины тоног",
        "japanese": "装具",
        "confidence": "medium",
        "matchedVia": [
            "harness"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хобби",
        "japanese": "楽しみ",
        "confidence": "medium",
        "matchedVia": [
            "hobby"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "туурай",
        "japanese": "爪",
        "confidence": "medium",
        "matchedVia": [
            "hoof"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үзэх",
        "japanese": "御覧じゃる",
        "confidence": "medium",
        "matchedVia": [
            "to see"
        ],
        "mark": "good"
    },
    {
        "mongolian": "пид",
        "japanese": "がな",
        "confidence": "low",
        "matchedVia": [
            "emphatic particle"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "Күнз",
        "japanese": "孔子",
        "confidence": "low",
        "matchedVia": [
            "confucius"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хөрш",
        "japanese": "隣人",
        "confidence": "medium",
        "matchedVia": [
            "neighbour"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нулимс",
        "japanese": "涙",
        "confidence": "medium",
        "matchedVia": [
            "tear"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ханхай",
        "japanese": "飛車",
        "confidence": "medium",
        "matchedVia": [
            "rook"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "үргэлж",
        "japanese": "頻りに",
        "confidence": "medium",
        "matchedVia": [
            "often"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тор",
        "japanese": "網",
        "confidence": "medium",
        "matchedVia": [
            "net"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нэрлэхийн тийн ялгал",
        "japanese": "主格",
        "confidence": "medium",
        "matchedVia": [
            "nominative case"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хүрэх",
        "japanese": "触る",
        "confidence": "medium",
        "matchedVia": [
            "to touch"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ганжин",
        "japanese": "麺棒",
        "confidence": "medium",
        "matchedVia": [
            "rolling pin"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бүгд найрамдах улс",
        "japanese": "共和国",
        "confidence": "medium",
        "matchedVia": [
            "republic"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гурамсан",
        "japanese": "三重",
        "confidence": "medium",
        "matchedVia": [
            "triple"
        ],
        "mark": "good"
    },
    {
        "mongolian": "харандаа үзүүрлэгч",
        "japanese": "鉛筆削り",
        "confidence": "medium",
        "matchedVia": [
            "pencil sharpener"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сонирхол",
        "japanese": "楽しみ",
        "confidence": "medium",
        "matchedVia": [
            "hobby"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хайрлах",
        "japanese": "愛する",
        "confidence": "medium",
        "matchedVia": [
            "to love"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тойрог",
        "japanese": "軌道",
        "confidence": "medium",
        "matchedVia": [
            "orbit"
        ],
        "mark": "good"
    },
    {
        "mongolian": "булш",
        "japanese": "墳墓",
        "confidence": "medium",
        "matchedVia": [
            "grave"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бумба",
        "japanese": "御霊屋",
        "confidence": "medium",
        "matchedVia": [
            "mausoleum"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "нэр үг",
        "japanese": "実名詞",
        "confidence": "medium",
        "matchedVia": [
            "noun substantive"
        ],
        "mark": "good"
    },
    {
        "mongolian": "толгой",
        "japanese": "頭",
        "confidence": "medium",
        "matchedVia": [
            "head"
        ],
        "mark": "good"
    },
    {
        "mongolian": "огурцы",
        "japanese": "河童",
        "confidence": "medium",
        "matchedVia": [
            "cucumber"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хялгасан судас",
        "japanese": "毛細血管",
        "confidence": "medium",
        "matchedVia": [
            "capillary"
        ],
        "mark": "good"
    },
    {
        "mongolian": "боошиг",
        "japanese": "樽",
        "confidence": "medium",
        "matchedVia": [
            "barrel"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "эвэрлэг бүрхэвч",
        "japanese": "角膜",
        "confidence": "medium",
        "matchedVia": [
            "cornea"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хаана",
        "japanese": "何処だって",
        "confidence": "medium",
        "matchedVia": [
            "where"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "өрөм",
        "japanese": "演習",
        "confidence": "medium",
        "matchedVia": [
            "drill"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "тогоруу",
        "japanese": "起重機",
        "confidence": "medium",
        "matchedVia": [
            "crane"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "төгрөг",
        "japanese": "丸い",
        "confidence": "medium",
        "matchedVia": [
            "round"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "уулзалт",
        "japanese": "会見",
        "confidence": "medium",
        "matchedVia": [
            "meeting",
            "interview"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ал",
        "japanese": "赤い",
        "confidence": "medium",
        "matchedVia": [
            "red"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "халдварлах",
        "japanese": "伝染る",
        "confidence": "medium",
        "matchedVia": [
            "to be infected"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хүлээх",
        "japanese": "入れる",
        "confidence": "medium",
        "matchedVia": [
            "to accept"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "гурил",
        "japanese": "粉",
        "confidence": "medium",
        "matchedVia": [
            "flour"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бийр",
        "japanese": "筆",
        "confidence": "medium",
        "matchedVia": [
            "paintbrush"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эм бэлэг эрхтэн",
        "japanese": "おまんこ",
        "confidence": "medium",
        "matchedVia": [
            "vagina"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цус",
        "japanese": "血",
        "confidence": "medium",
        "matchedVia": [
            "blood"
        ],
        "mark": "good"
    },
    {
        "mongolian": "унгар",
        "japanese": "マジャール語",
        "confidence": "medium",
        "matchedVia": [
            "hungarian"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "унтаахай",
        "japanese": "寝ぼすけ",
        "confidence": "medium",
        "matchedVia": [
            "sleepyhead"
        ],
        "mark": "good"
    },
    {
        "mongolian": "редакторлах",
        "japanese": "編む",
        "confidence": "medium",
        "matchedVia": [
            "to edit"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "ёстой",
        "japanese": "正当",
        "confidence": "medium",
        "matchedVia": [
            "proper",
            "just"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "тариа",
        "japanese": "注射",
        "confidence": "medium",
        "matchedVia": [
            "injection"
        ],
        "mark": "good"
    },
    {
        "mongolian": "архины шар",
        "japanese": "二日酔い",
        "confidence": "medium",
        "matchedVia": [
            "hangover"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өмнөх",
        "japanese": "慣例",
        "confidence": "medium",
        "matchedVia": [
            "precedent"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "тогтоох",
        "japanese": "味わう",
        "confidence": "low",
        "matchedVia": [
            "to digest"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "суулгах",
        "japanese": "備える",
        "confidence": "medium",
        "matchedVia": [
            "to install"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "аймаг",
        "japanese": "種族",
        "confidence": "medium",
        "matchedVia": [
            "tribe"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "томсох",
        "japanese": "肩肘張る",
        "confidence": "medium",
        "matchedVia": [
            "to act big"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "бол",
        "japanese": "なら",
        "confidence": "low",
        "matchedVia": [
            "if",
            "as for"
        ],
        "mark": "good"
    },
    {
        "mongolian": "чиглэх",
        "japanese": "行く",
        "confidence": "medium",
        "matchedVia": [
            "to move towards"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "Тэнгэрийн заадас",
        "japanese": "銀河系",
        "confidence": "low",
        "matchedVia": [
            "milky way galaxy"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "булчирхай",
        "japanese": "腺",
        "confidence": "medium",
        "matchedVia": [
            "gland"
        ],
        "mark": "good"
    },
    {
        "mongolian": "буудай",
        "japanese": "小麦",
        "confidence": "medium",
        "matchedVia": [
            "wheat"
        ],
        "mark": "good"
    },
    {
        "mongolian": "улай",
        "japanese": "腐肉",
        "confidence": "medium",
        "matchedVia": [
            "carrion"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "саах",
        "japanese": "擦る",
        "confidence": "medium",
        "matchedVia": [
            "to milk"
        ],
        "mark": "good"
    },
    {
        "mongolian": "оо",
        "japanese": "糊",
        "confidence": "medium",
        "matchedVia": [
            "paste"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "занах",
        "japanese": "嫌う",
        "confidence": "medium",
        "matchedVia": [
            "to hate"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "үнэн",
        "japanese": "真",
        "confidence": "medium",
        "matchedVia": [
            "truth"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эгч",
        "japanese": "修道女",
        "confidence": "medium",
        "matchedVia": [
            "sister"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "нурууны үе",
        "japanese": "椎骨",
        "confidence": "medium",
        "matchedVia": [
            "vertebra"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хана",
        "japanese": "囲い",
        "confidence": "medium",
        "matchedVia": [
            "wall"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дутах",
        "japanese": "事欠く",
        "confidence": "medium",
        "matchedVia": [
            "to lack"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нугалам",
        "japanese": "椎骨",
        "confidence": "medium",
        "matchedVia": [
            "vertebra"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мэдэх",
        "japanese": "含む",
        "confidence": "low",
        "matchedVia": [
            "to understand"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "ирц",
        "japanese": "参列",
        "confidence": "medium",
        "matchedVia": [
            "attendance"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өнөөдөр",
        "japanese": "現代",
        "confidence": "medium",
        "matchedVia": [
            "today"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "аврах",
        "japanese": "救う",
        "confidence": "medium",
        "matchedVia": [
            "to save"
        ],
        "mark": "good"
    },
    {
        "mongolian": "арзгар",
        "japanese": "峨々",
        "confidence": "medium",
        "matchedVia": [
            "jagged"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "тутарга",
        "japanese": "米穀",
        "confidence": "medium",
        "matchedVia": [
            "rice"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "дампуу",
        "japanese": "質屋",
        "confidence": "medium",
        "matchedVia": [
            "pawnshop"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "нугас",
        "japanese": "鴨",
        "confidence": "medium",
        "matchedVia": [
            "duck"
        ],
        "mark": "good"
    },
    {
        "mongolian": "живэр",
        "japanese": "髭",
        "confidence": "medium",
        "matchedVia": [
            "moustache"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "дэр",
        "japanese": "枕",
        "confidence": "medium",
        "matchedVia": [
            "pillow"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өгүүлэхүүн",
        "japanese": "述語",
        "confidence": "medium",
        "matchedVia": [
            "predicate"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сэтгүүл",
        "japanese": "雑誌",
        "confidence": "medium",
        "matchedVia": [
            "magazine"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэзээ ч үгүй",
        "japanese": "終ぞ",
        "confidence": "medium",
        "matchedVia": [
            "never"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хамар",
        "japanese": "鼻",
        "confidence": "medium",
        "matchedVia": [
            "nose"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нүүдэлчин",
        "japanese": "流浪者",
        "confidence": "medium",
        "matchedVia": [
            "nomad"
        ],
        "mark": "good"
    },
    {
        "mongolian": "худалдах",
        "japanese": "取り替える",
        "confidence": "medium",
        "matchedVia": [
            "to trade"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мөлхөх",
        "japanese": "這う",
        "confidence": "medium",
        "matchedVia": [
            "to crawl"
        ],
        "mark": "good"
    },
    {
        "mongolian": "лал",
        "japanese": "異端者",
        "confidence": "medium",
        "matchedVia": [
            "heretic"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "өвчин",
        "japanese": "労き",
        "confidence": "medium",
        "matchedVia": [
            "illness",
            "pain"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өөд",
        "japanese": "迄",
        "confidence": "low",
        "matchedVia": [
            "up to"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "тоос сорогч",
        "japanese": "掃除機",
        "confidence": "medium",
        "matchedVia": [
            "vacuum cleaner"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бүс",
        "japanese": "地帯",
        "confidence": "medium",
        "matchedVia": [
            "belt",
            "zone"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зүг",
        "japanese": "監督",
        "confidence": "medium",
        "matchedVia": [
            "direction"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "морилох",
        "japanese": "死ぬ",
        "confidence": "medium",
        "matchedVia": [
            "to pass away"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "чихрийн манжин",
        "japanese": "砂糖大根",
        "confidence": "medium",
        "matchedVia": [
            "sugar beet"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хүндэтгэлийн үг",
        "japanese": "敬語",
        "confidence": "medium",
        "matchedVia": [
            "honorific"
        ],
        "mark": "good"
    },
    {
        "mongolian": "туршлага",
        "japanese": "覚え",
        "confidence": "medium",
        "matchedVia": [
            "experience"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "тариачин",
        "japanese": "農民",
        "confidence": "medium",
        "matchedVia": [
            "peasant"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "бал",
        "japanese": "蜂蜜",
        "confidence": "medium",
        "matchedVia": [
            "honey"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нэрлэх",
        "japanese": "称する",
        "confidence": "medium",
        "matchedVia": [
            "to name"
        ],
        "mark": "good"
    },
    {
        "mongolian": "аз жаргал",
        "japanese": "幸",
        "confidence": "medium",
        "matchedVia": [
            "happiness"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нислэгийн хөдөлгөөний удирдлага",
        "japanese": "航空管理",
        "confidence": "medium",
        "matchedVia": [
            "air traffic control"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "дутуу",
        "japanese": "少ない",
        "confidence": "medium",
        "matchedVia": [
            "insufficient"
        ],
        "mark": "good"
    },
    {
        "mongolian": "баримал",
        "japanese": "彫刻",
        "confidence": "medium",
        "matchedVia": [
            "sculpture"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "төрөх",
        "japanese": "乗り越える",
        "confidence": "low",
        "matchedVia": [
            "to overtake"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "Англи улс",
        "japanese": "英蘭",
        "confidence": "low",
        "matchedVia": [
            "england"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гаа",
        "japanese": "鋳造所",
        "confidence": "medium",
        "matchedVia": [
            "mint"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "ашиглах",
        "japanese": "取り扱う",
        "confidence": "medium",
        "matchedVia": [
            "to use"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хаях",
        "japanese": "落とす",
        "confidence": "medium",
        "matchedVia": [
            "to lose"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бугуй",
        "japanese": "手首",
        "confidence": "medium",
        "matchedVia": [
            "wrist"
        ],
        "mark": "good"
    },
    {
        "mongolian": "кофе",
        "japanese": "珈琲",
        "confidence": "medium",
        "matchedVia": [
            "coffee"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сурах",
        "japanese": "招く",
        "confidence": "medium",
        "matchedVia": [
            "to ask"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хариуцлага",
        "japanese": "義務",
        "confidence": "medium",
        "matchedVia": [
            "responsibility"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шийдвэр",
        "japanese": "確定",
        "confidence": "medium",
        "matchedVia": [
            "decision"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зорьсон газар",
        "japanese": "行き先",
        "confidence": "medium",
        "matchedVia": [
            "destination"
        ],
        "mark": "good"
    },
    {
        "mongolian": "баяртай",
        "japanese": "左様なら",
        "confidence": "low",
        "matchedVia": [
            "goodbye"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэдэрлэх",
        "japanese": "意地を張る",
        "confidence": "medium",
        "matchedVia": [
            "to be stubborn"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эндометриоз",
        "japanese": "子宮内膜症",
        "confidence": "medium",
        "matchedVia": [
            "endometriosis"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үнэтэй",
        "japanese": "こよなく",
        "confidence": "medium",
        "matchedVia": [
            "dearly"
        ],
        "mark": "good"
    },
    {
        "mongolian": "юу",
        "japanese": "何",
        "confidence": "low",
        "matchedVia": [
            "what"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нударга",
        "japanese": "拳",
        "confidence": "medium",
        "matchedVia": [
            "fist"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цэнэглэх",
        "japanese": "込める",
        "confidence": "medium",
        "matchedVia": [
            "to charge"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цуур",
        "japanese": "笛",
        "confidence": "medium",
        "matchedVia": [
            "fife"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зэрэг",
        "japanese": "どちらからとも無く",
        "confidence": "medium",
        "matchedVia": [
            "simultaneously",
            "together"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үндсэн хууль",
        "japanese": "会則",
        "confidence": "medium",
        "matchedVia": [
            "constitution"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөвчтөн",
        "japanese": "脊索動物",
        "confidence": "medium",
        "matchedVia": [
            "chordate"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шүүдэр",
        "japanese": "露",
        "confidence": "medium",
        "matchedVia": [
            "dew"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ярих",
        "japanese": "仰る",
        "confidence": "medium",
        "matchedVia": [
            "to speak"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөших",
        "japanese": "強張る",
        "confidence": "medium",
        "matchedVia": [
            "to become stiff"
        ],
        "mark": "good"
    },
    {
        "mongolian": "амь",
        "japanese": "息",
        "confidence": "medium",
        "matchedVia": [
            "breath"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "тэнд",
        "japanese": "彼処",
        "confidence": "low",
        "matchedVia": [
            "there"
        ],
        "mark": "good"
    },
    {
        "mongolian": "солих",
        "japanese": "取り替える",
        "confidence": "medium",
        "matchedVia": [
            "to exchange"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дампуурал",
        "japanese": "破産",
        "confidence": "medium",
        "matchedVia": [
            "bankruptcy"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сам хорхой",
        "japanese": "海老",
        "confidence": "medium",
        "matchedVia": [
            "shrimp"
        ],
        "mark": "good"
    },
    {
        "mongolian": "авга",
        "japanese": "内戚",
        "confidence": "medium",
        "matchedVia": [
            "paternal relative"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "шаардлага тавих",
        "japanese": "追い上げる",
        "confidence": "medium",
        "matchedVia": [
            "to put pressure on"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "тавтай морилогтун",
        "japanese": "いらっしゃいませ",
        "confidence": "low",
        "matchedVia": [
            "welcome"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "эр",
        "japanese": "雄",
        "confidence": "medium",
        "matchedVia": [
            "male",
            "husband"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөзөр",
        "japanese": "札",
        "confidence": "medium",
        "matchedVia": [
            "playing card"
        ],
        "mark": "good"
    },
    {
        "mongolian": "засаг",
        "japanese": "行政",
        "confidence": "medium",
        "matchedVia": [
            "government"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хайч",
        "japanese": "鋏",
        "confidence": "medium",
        "matchedVia": [
            "scissors"
        ],
        "mark": "good"
    },
    {
        "mongolian": "жирэмсэн",
        "japanese": "身重",
        "confidence": "medium",
        "matchedVia": [
            "pregnant"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өрсөлдөх",
        "japanese": "競う",
        "confidence": "medium",
        "matchedVia": [
            "to compete"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дарангуйлагч",
        "japanese": "独裁者",
        "confidence": "medium",
        "matchedVia": [
            "dictator"
        ],
        "mark": "good"
    },
    {
        "mongolian": "доргиот алх",
        "japanese": "削岩機",
        "confidence": "medium",
        "matchedVia": [
            "jackhammer"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хорсох",
        "japanese": "嫌う",
        "confidence": "medium",
        "matchedVia": [
            "to hate"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "эвсэх",
        "japanese": "合う",
        "confidence": "medium",
        "matchedVia": [
            "to unite"
        ],
        "mark": "good"
    },
    {
        "mongolian": "булган",
        "japanese": "銀だら",
        "confidence": "medium",
        "matchedVia": [
            "sable"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "унтраах",
        "japanese": "消し止める",
        "confidence": "medium",
        "matchedVia": [
            "to extinguish"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гүйх",
        "japanese": "駆ける",
        "confidence": "medium",
        "matchedVia": [
            "to run"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "анар",
        "japanese": "柘榴",
        "confidence": "medium",
        "matchedVia": [
            "pomegranate punica granatum"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эд",
        "japanese": "呉服",
        "confidence": "medium",
        "matchedVia": [
            "textile"
        ],
        "mark": "good"
    },
    {
        "mongolian": "урт оймс",
        "japanese": "靴下",
        "confidence": "medium",
        "matchedVia": [
            "stocking"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "шоо",
        "japanese": "角",
        "confidence": "low",
        "matchedVia": [
            "cube"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "тамхи",
        "japanese": "煙草",
        "confidence": "medium",
        "matchedVia": [
            "tobacco",
            "cigarette"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ачаа",
        "japanese": "荷物",
        "confidence": "medium",
        "matchedVia": [
            "luggage"
        ],
        "mark": "good"
    },
    {
        "mongolian": "найрах",
        "japanese": "釣り合う",
        "confidence": "medium",
        "matchedVia": [
            "to be in harmony"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "далайн эрэг",
        "japanese": "海岸",
        "confidence": "medium",
        "matchedVia": [
            "coast",
            "beach"
        ],
        "mark": "good"
    },
    {
        "mongolian": "золгох",
        "japanese": "迎える",
        "confidence": "medium",
        "matchedVia": [
            "to greet"
        ],
        "mark": "good"
    },
    {
        "mongolian": "галт уул",
        "japanese": "火山",
        "confidence": "medium",
        "matchedVia": [
            "volcano"
        ],
        "mark": "good"
    },
    {
        "mongolian": "их тархи",
        "japanese": "大脳",
        "confidence": "medium",
        "matchedVia": [
            "cerebrum"
        ],
        "mark": "good"
    },
    {
        "mongolian": "жонш",
        "japanese": "桁",
        "confidence": "medium",
        "matchedVia": [
            "spar"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сарьсан багваахай",
        "japanese": "天鼠",
        "confidence": "medium",
        "matchedVia": [
            "bat animal"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гургалдай",
        "japanese": "ケツの穴",
        "confidence": "medium",
        "matchedVia": [
            "anus"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "зөвлөл",
        "japanese": "蘇維埃",
        "confidence": "medium",
        "matchedVia": [
            "soviet"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ялгал",
        "japanese": "違い",
        "confidence": "medium",
        "matchedVia": [
            "distinction",
            "difference"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мэдээ",
        "japanese": "沙汰",
        "confidence": "medium",
        "matchedVia": [
            "message",
            "information",
            "news"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дэнслэх",
        "japanese": "計る",
        "confidence": "medium",
        "matchedVia": [
            "to weigh"
        ],
        "mark": "good"
    },
    {
        "mongolian": "харандааны сав",
        "japanese": "筆箱",
        "confidence": "medium",
        "matchedVia": [
            "pencil case"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зүү",
        "japanese": "針",
        "confidence": "medium",
        "matchedVia": [
            "needle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "саад",
        "japanese": "支障",
        "confidence": "medium",
        "matchedVia": [
            "obstacle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөвгүүн",
        "japanese": "坊や",
        "confidence": "medium",
        "matchedVia": [
            "child",
            "son"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гуравдугаар",
        "japanese": "三次",
        "confidence": "medium",
        "matchedVia": [
            "third"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шар үс",
        "japanese": "産毛",
        "confidence": "medium",
        "matchedVia": [
            "vellus hair"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөдөө",
        "japanese": "地方",
        "confidence": "low",
        "matchedVia": [
            "countryside"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "шаахай",
        "japanese": "靴",
        "confidence": "medium",
        "matchedVia": [
            "shoe"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "овог",
        "japanese": "氏",
        "confidence": "medium",
        "matchedVia": [
            "clan",
            "family name"
        ],
        "mark": "good"
    },
    {
        "mongolian": "залбирах",
        "japanese": "祈る",
        "confidence": "low",
        "matchedVia": [
            "to pray"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ач",
        "japanese": "孫息子",
        "confidence": "medium",
        "matchedVia": [
            "grandson"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цүүц",
        "japanese": "彫刻刀",
        "confidence": "medium",
        "matchedVia": [
            "chisel"
        ],
        "mark": "good"
    },
    {
        "mongolian": "маажих",
        "japanese": "掻く",
        "confidence": "medium",
        "matchedVia": [
            "to scratch"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өөш",
        "japanese": "裏金",
        "confidence": "medium",
        "matchedVia": [
            "bribe"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "нотариат",
        "japanese": "公証人役場",
        "confidence": "medium",
        "matchedVia": [
            "notary office"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "маргааш",
        "japanese": "明日",
        "confidence": "low",
        "matchedVia": [
            "tomorrow"
        ],
        "mark": "good"
    },
    {
        "mongolian": "яам",
        "japanese": "政府",
        "confidence": "medium",
        "matchedVia": [
            "ministry"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэл шинжлэл",
        "japanese": "言語学",
        "confidence": "medium",
        "matchedVia": [
            "linguistics"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гүйлгэх",
        "japanese": "瀉する",
        "confidence": "medium",
        "matchedVia": [
            "to have diarrhea"
        ],
        "mark": "good"
    },
    {
        "mongolian": "яаж",
        "japanese": "如何",
        "confidence": "medium",
        "matchedVia": [
            "how"
        ],
        "mark": "good"
    },
    {
        "mongolian": "байц",
        "japanese": "参列",
        "confidence": "medium",
        "matchedVia": [
            "attendance"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "батраш",
        "japanese": "鋳造所",
        "confidence": "medium",
        "matchedVia": [
            "mint"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "иргэн",
        "japanese": "臣民",
        "confidence": "medium",
        "matchedVia": [
            "citizen",
            "subject"
        ],
        "mark": "good"
    },
    {
        "mongolian": "муж",
        "japanese": "ちぐはぐ",
        "confidence": "medium",
        "matchedVia": [
            "odd"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "ором",
        "japanese": "奥付",
        "confidence": "medium",
        "matchedVia": [
            "imprint"
        ],
        "mark": "good"
    },
    {
        "mongolian": "озох",
        "japanese": "口付ける",
        "confidence": "medium",
        "matchedVia": [
            "to kiss"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хөдөө аж ахуй",
        "japanese": "農",
        "confidence": "medium",
        "matchedVia": [
            "agriculture"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хар",
        "japanese": "黒み",
        "confidence": "low",
        "matchedVia": [
            "black color"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хяргах",
        "japanese": "髪を切る",
        "confidence": "medium",
        "matchedVia": [
            "to cut hair"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "мэрэгч амьтан",
        "japanese": "齧歯",
        "confidence": "medium",
        "matchedVia": [
            "rodent"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөрөнгө хогшил",
        "japanese": "財産",
        "confidence": "medium",
        "matchedVia": [
            "property"
        ],
        "mark": "good"
    },
    {
        "mongolian": "төлөх",
        "japanese": "支払う",
        "confidence": "medium",
        "matchedVia": [
            "to pay"
        ],
        "mark": "good"
    },
    {
        "mongolian": "навч",
        "japanese": "葉",
        "confidence": "medium",
        "matchedVia": [
            "leaf"
        ],
        "mark": "good"
    },
    {
        "mongolian": "луус",
        "japanese": "騾馬",
        "confidence": "medium",
        "matchedVia": [
            "mule"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сантехникч",
        "japanese": "水道屋",
        "confidence": "medium",
        "matchedVia": [
            "plumber"
        ],
        "mark": "good"
    },
    {
        "mongolian": "найдах",
        "japanese": "願う",
        "confidence": "medium",
        "matchedVia": [
            "to hope"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "утаа",
        "japanese": "煙",
        "confidence": "medium",
        "matchedVia": [
            "smoke"
        ],
        "mark": "good"
    },
    {
        "mongolian": "биеэр",
        "japanese": "直に",
        "confidence": "medium",
        "matchedVia": [
            "in person"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "харьяалахын тийн ялгал",
        "japanese": "属格",
        "confidence": "medium",
        "matchedVia": [
            "genitive case"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "бэрх",
        "japanese": "多才",
        "confidence": "medium",
        "matchedVia": [
            "talented"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "экзистенциализм",
        "japanese": "実存主義",
        "confidence": "medium",
        "matchedVia": [
            "existentialism"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "холбоос",
        "japanese": "摩擦",
        "confidence": "medium",
        "matchedVia": [
            "friction"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "алхам",
        "japanese": "音程",
        "confidence": "medium",
        "matchedVia": [
            "step"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "чулуу",
        "japanese": "結石",
        "confidence": "medium",
        "matchedVia": [
            "calculus"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "сонгууль",
        "japanese": "選挙",
        "confidence": "medium",
        "matchedVia": [
            "election"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ээрэх",
        "japanese": "繰る",
        "confidence": "medium",
        "matchedVia": [
            "to spin thread"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үүлтэй",
        "japanese": "朦朧",
        "confidence": "medium",
        "matchedVia": [
            "cloudy"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "гялайлаа",
        "japanese": "どうも",
        "confidence": "low",
        "matchedVia": [
            "thank you"
        ],
        "mark": "good"
    },
    {
        "mongolian": "минажуулсан газар",
        "japanese": "機雷原",
        "confidence": "medium",
        "matchedVia": [
            "minefield"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "бэр",
        "japanese": "嫁",
        "confidence": "medium",
        "matchedVia": [
            "bride"
        ],
        "mark": "good"
    },
    {
        "mongolian": "чих",
        "japanese": "耳",
        "confidence": "medium",
        "matchedVia": [
            "ear"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хуй",
        "japanese": "旋風",
        "confidence": "medium",
        "matchedVia": [
            "whirlwind"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тархалтын функц",
        "japanese": "累積分布関数",
        "confidence": "medium",
        "matchedVia": [
            "cumulative distribution function"
        ],
        "mark": "good"
    },
    {
        "mongolian": "грек",
        "japanese": "ギリシャ人",
        "confidence": "medium",
        "matchedVia": [
            "greek person"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гэнэт",
        "japanese": "パッと",
        "confidence": "medium",
        "matchedVia": [
            "suddenly"
        ],
        "mark": "good"
    },
    {
        "mongolian": "амьдрал",
        "japanese": "生存",
        "confidence": "medium",
        "matchedVia": [
            "life",
            "existence"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бэлэн",
        "japanese": "良い",
        "confidence": "low",
        "matchedVia": [
            "prepared"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "дээрэмчин",
        "japanese": "山賊",
        "confidence": "medium",
        "matchedVia": [
            "bandit"
        ],
        "mark": "good"
    },
    {
        "mongolian": "латин цагаан толгой",
        "japanese": "ローマ字",
        "confidence": "medium",
        "matchedVia": [
            "latin alphabet"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тайга",
        "japanese": "原始林",
        "confidence": "medium",
        "matchedVia": [
            "primeval forest"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "олон нийт",
        "japanese": "社会",
        "confidence": "medium",
        "matchedVia": [
            "public"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "өршөөх",
        "japanese": "闇",
        "confidence": "medium",
        "matchedVia": [
            "oblivion"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "сүүмэг",
        "japanese": "明けの明星",
        "confidence": "medium",
        "matchedVia": [
            "phosphorus"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өнгөрсөн цаг",
        "japanese": "過去形",
        "confidence": "medium",
        "matchedVia": [
            "past tense"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тугал",
        "japanese": "牛",
        "confidence": "medium",
        "matchedVia": [
            "calf"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "ав",
        "japanese": "狩り",
        "confidence": "medium",
        "matchedVia": [
            "hunt"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "диктатур",
        "japanese": "独裁",
        "confidence": "medium",
        "matchedVia": [
            "dictatorship"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "орчуулах",
        "japanese": "訳す",
        "confidence": "medium",
        "matchedVia": [
            "to translate"
        ],
        "mark": "good"
    },
    {
        "mongolian": "наяд",
        "japanese": "千億",
        "confidence": "low",
        "matchedVia": [
            "hundred billion"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "шумуул",
        "japanese": "蚊",
        "confidence": "medium",
        "matchedVia": [
            "mosquito"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гүрвэл",
        "japanese": "蜥蜴",
        "confidence": "medium",
        "matchedVia": [
            "lizard"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дорго",
        "japanese": "狢",
        "confidence": "medium",
        "matchedVia": [
            "badger"
        ],
        "mark": "good"
    },
    {
        "mongolian": "төлөөний үг",
        "japanese": "代名詞",
        "confidence": "medium",
        "matchedVia": [
            "pronoun"
        ],
        "mark": "good"
    },
    {
        "mongolian": "далайн хөвөө",
        "japanese": "沿岸",
        "confidence": "medium",
        "matchedVia": [
            "coast"
        ],
        "mark": "good"
    },
    {
        "mongolian": "төлгө",
        "japanese": "占術",
        "confidence": "medium",
        "matchedVia": [
            "mantic"
        ],
        "mark": "good"
    },
    {
        "mongolian": "морин зөгий",
        "japanese": "蜂",
        "confidence": "medium",
        "matchedVia": [
            "wasp"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ноднин",
        "japanese": "去年",
        "confidence": "medium",
        "matchedVia": [
            "last year"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хялгасан хоолой",
        "japanese": "毛細血管",
        "confidence": "medium",
        "matchedVia": [
            "capillary"
        ],
        "mark": "good"
    },
    {
        "mongolian": "онигоо",
        "japanese": "ひとくち話",
        "confidence": "medium",
        "matchedVia": [
            "joke",
            "anecdote"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "баруун",
        "japanese": "西",
        "confidence": "low",
        "matchedVia": [
            "west"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тогтоомж",
        "japanese": "公示",
        "confidence": "medium",
        "matchedVia": [
            "edict"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хомофоби",
        "japanese": "同性愛嫌悪",
        "confidence": "medium",
        "matchedVia": [
            "homophobia"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "нус",
        "japanese": "鼻水",
        "confidence": "medium",
        "matchedVia": [
            "snot"
        ],
        "mark": "good"
    },
    {
        "mongolian": "багш",
        "japanese": "教員",
        "confidence": "medium",
        "matchedVia": [
            "teacher"
        ],
        "mark": "good"
    },
    {
        "mongolian": "лантуу",
        "japanese": "玄能",
        "confidence": "medium",
        "matchedVia": [
            "sledgehammer"
        ],
        "mark": "good"
    },
    {
        "mongolian": "жад",
        "japanese": "外来",
        "confidence": "medium",
        "matchedVia": [
            "foreign"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "цаг агаар",
        "japanese": "お天気",
        "confidence": "medium",
        "matchedVia": [
            "weather"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эзэн",
        "japanese": "司会",
        "confidence": "low",
        "matchedVia": [
            "host"
        ],
        "mark": "good"
    },
    {
        "mongolian": "академич",
        "japanese": "学者",
        "confidence": "medium",
        "matchedVia": [
            "academic"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "өвөө",
        "japanese": "お祖父さん",
        "confidence": "medium",
        "matchedVia": [
            "grandfather"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бүрээ",
        "japanese": "角",
        "confidence": "medium",
        "matchedVia": [
            "horn"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "сүүлт од",
        "japanese": "彗星",
        "confidence": "medium",
        "matchedVia": [
            "comet"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөвч",
        "japanese": "弦",
        "confidence": "medium",
        "matchedVia": [
            "bowstring",
            "chord"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зөрүүдлэх",
        "japanese": "意地を張る",
        "confidence": "medium",
        "matchedVia": [
            "to be stubborn"
        ],
        "mark": "good"
    },
    {
        "mongolian": "салах",
        "japanese": "引き離す",
        "confidence": "medium",
        "matchedVia": [
            "to separate"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ба",
        "japanese": "すると",
        "confidence": "low",
        "matchedVia": [
            "and"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "жор",
        "japanese": "薬方",
        "confidence": "medium",
        "matchedVia": [
            "prescription",
            "recipe"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гайхал",
        "japanese": "感心",
        "confidence": "medium",
        "matchedVia": [
            "admiration"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тэшүүрийн спорт",
        "japanese": "氷滑り",
        "confidence": "medium",
        "matchedVia": [
            "ice skating"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тоо",
        "japanese": "内",
        "confidence": "low",
        "matchedVia": [
            "between"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "гаргах",
        "japanese": "逃がす",
        "confidence": "medium",
        "matchedVia": [
            "to release"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үнээ",
        "japanese": "牛",
        "confidence": "medium",
        "matchedVia": [
            "cow"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хаг",
        "japanese": "胎盤",
        "confidence": "medium",
        "matchedVia": [
            "placenta"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "олох",
        "japanese": "取る",
        "confidence": "low",
        "matchedVia": [
            "to earn"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "сампин",
        "japanese": "算盤",
        "confidence": "medium",
        "matchedVia": [
            "abacus"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мэс",
        "japanese": "刀剣",
        "confidence": "medium",
        "matchedVia": [
            "knife",
            "sword"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "цэрэг",
        "japanese": "軍人",
        "confidence": "medium",
        "matchedVia": [
            "soldier"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гэрэл зураг",
        "japanese": "写真",
        "confidence": "medium",
        "matchedVia": [
            "photograph"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэвтэх",
        "japanese": "横たわる",
        "confidence": "medium",
        "matchedVia": [
            "to lie down"
        ],
        "mark": "good"
    },
    {
        "mongolian": "харваач",
        "japanese": "射手",
        "confidence": "medium",
        "matchedVia": [
            "archer"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нүүрс",
        "japanese": "石炭",
        "confidence": "medium",
        "matchedVia": [
            "coal"
        ],
        "mark": "good"
    },
    {
        "mongolian": "суйтгэх",
        "japanese": "壊す",
        "confidence": "medium",
        "matchedVia": [
            "to destroy"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мэлхий",
        "japanese": "癌",
        "confidence": "medium",
        "matchedVia": [
            "cancer"
        ],
        "mark": "good"
    },
    {
        "mongolian": "авах",
        "japanese": "求める",
        "confidence": "low",
        "matchedVia": [
            "to buy"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "албадлага",
        "japanese": "強制",
        "confidence": "medium",
        "matchedVia": [
            "coercion"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хясаа",
        "japanese": "牡蠣",
        "confidence": "medium",
        "matchedVia": [
            "oyster"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үндэстэн",
        "japanese": "国家",
        "confidence": "medium",
        "matchedVia": [
            "nation"
        ],
        "mark": "good"
    },
    {
        "mongolian": "аж ахуй",
        "japanese": "経済",
        "confidence": "medium",
        "matchedVia": [
            "economy"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "далайн гахай",
        "japanese": "鱰",
        "confidence": "medium",
        "matchedVia": [
            "dolphin"
        ],
        "mark": "good"
    },
    {
        "mongolian": "удган",
        "japanese": "巫女",
        "confidence": "medium",
        "matchedVia": [
            "shamaness"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шалбархай",
        "japanese": "怪我",
        "confidence": "medium",
        "matchedVia": [
            "wound"
        ],
        "mark": "good"
    },
    {
        "mongolian": "соёо мөс",
        "japanese": "氷柱",
        "confidence": "medium",
        "matchedVia": [
            "icicle"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "сам",
        "japanese": "櫛",
        "confidence": "medium",
        "matchedVia": [
            "comb"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бид нар",
        "japanese": "私たち",
        "confidence": "low",
        "matchedVia": [
            "we"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зангуу",
        "japanese": "錨",
        "confidence": "medium",
        "matchedVia": [
            "anchor"
        ],
        "mark": "good"
    },
    {
        "mongolian": "подвоолк",
        "japanese": "Ｔシャツ",
        "confidence": "medium",
        "matchedVia": [
            "t-shirt"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "заах",
        "japanese": "教える",
        "confidence": "medium",
        "matchedVia": [
            "to teach"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гааль",
        "japanese": "税関",
        "confidence": "medium",
        "matchedVia": [
            "customs"
        ],
        "mark": "good"
    },
    {
        "mongolian": "долгион",
        "japanese": "振り",
        "confidence": "medium",
        "matchedVia": [
            "wave"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өндөг",
        "japanese": "卵",
        "confidence": "medium",
        "matchedVia": [
            "egg"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ханш",
        "japanese": "引用",
        "confidence": "medium",
        "matchedVia": [
            "quotation"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "тахал",
        "japanese": "疫病",
        "confidence": "medium",
        "matchedVia": [
            "plague",
            "epidemic"
        ],
        "mark": "good"
    },
    {
        "mongolian": "адрах",
        "japanese": "意地を張る",
        "confidence": "medium",
        "matchedVia": [
            "to be stubborn"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "Олон Улсын Холбоот Байгуулага",
        "japanese": "国連",
        "confidence": "low",
        "matchedVia": [
            "united nations"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "үйлдвэр",
        "japanese": "仕事",
        "confidence": "medium",
        "matchedVia": [
            "work"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "шөнө",
        "japanese": "晩",
        "confidence": "medium",
        "matchedVia": [
            "night"
        ],
        "mark": "good"
    },
    {
        "mongolian": "загасны дэгээ",
        "japanese": "釣り針",
        "confidence": "medium",
        "matchedVia": [
            "fish hook"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэл зүй",
        "japanese": "文法",
        "confidence": "medium",
        "matchedVia": [
            "grammar"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "-дах",
        "japanese": "属する",
        "confidence": "low",
        "matchedVia": [
            "to be subject to"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "ялагдал",
        "japanese": "打倒",
        "confidence": "medium",
        "matchedVia": [
            "defeat"
        ],
        "mark": "good"
    },
    {
        "mongolian": "катакана",
        "japanese": "片仮名",
        "confidence": "medium",
        "matchedVia": [
            "katakana"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ханиах",
        "japanese": "咳く",
        "confidence": "medium",
        "matchedVia": [
            "to cough"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тухай",
        "japanese": "に就いて",
        "confidence": "low",
        "matchedVia": [
            "about"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өндөр уул",
        "japanese": "高山",
        "confidence": "medium",
        "matchedVia": [
            "alpine mountain",
            "high mountain"
        ],
        "mark": "good"
    },
    {
        "mongolian": "янз",
        "japanese": "相",
        "confidence": "medium",
        "matchedVia": [
            "aspect"
        ],
        "mark": "good"
    },
    {
        "mongolian": "засгийн газар",
        "japanese": "行政",
        "confidence": "medium",
        "matchedVia": [
            "government"
        ],
        "mark": "good"
    },
    {
        "mongolian": "унах",
        "japanese": "落ちる",
        "confidence": "medium",
        "matchedVia": [
            "to fall"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ухамсар",
        "japanese": "良心",
        "confidence": "medium",
        "matchedVia": [
            "conscience"
        ],
        "mark": "good"
    },
    {
        "mongolian": "их тэрбум",
        "japanese": "１００億",
        "confidence": "low",
        "matchedVia": [
            "ten billion"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "томьёо",
        "japanese": "処方",
        "confidence": "medium",
        "matchedVia": [
            "formula"
        ],
        "mark": "good"
    },
    {
        "mongolian": "магнай",
        "japanese": "お凸",
        "confidence": "medium",
        "matchedVia": [
            "forehead"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тооны нэр",
        "japanese": "数字",
        "confidence": "medium",
        "matchedVia": [
            "numeral"
        ],
        "mark": "good"
    },
    {
        "mongolian": "одоо",
        "japanese": "この頃",
        "confidence": "medium",
        "matchedVia": [
            "now"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эрвээхэй",
        "japanese": "蝶",
        "confidence": "medium",
        "matchedVia": [
            "butterfly"
        ],
        "mark": "good"
    },
    {
        "mongolian": "номхон",
        "japanese": "閑散",
        "confidence": "medium",
        "matchedVia": [
            "quiet"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "баялаг",
        "japanese": "潤い",
        "confidence": "low",
        "matchedVia": [
            "richness"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "тайлбарлах",
        "japanese": "説く",
        "confidence": "medium",
        "matchedVia": [
            "to explain"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үйл үг",
        "japanese": "動詞",
        "confidence": "medium",
        "matchedVia": [
            "verb"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сэнжтэй аяга",
        "japanese": "面",
        "confidence": "medium",
        "matchedVia": [
            "mug"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хучмал",
        "japanese": "蓋付き",
        "confidence": "medium",
        "matchedVia": [
            "covered"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "байх",
        "japanese": "掛かる",
        "confidence": "low",
        "matchedVia": [
            "to attend"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "шар",
        "japanese": "黄色い",
        "confidence": "medium",
        "matchedVia": [
            "yellow"
        ],
        "mark": "good"
    },
    {
        "mongolian": "идэх",
        "japanese": "喫する",
        "confidence": "medium",
        "matchedVia": [
            "to eat"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "манх",
        "japanese": "砂丘",
        "confidence": "medium",
        "matchedVia": [
            "sand dune"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "судас",
        "japanese": "血管",
        "confidence": "medium",
        "matchedVia": [
            "vein"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бал чулуу",
        "japanese": "黒鉛",
        "confidence": "medium",
        "matchedVia": [
            "graphite"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мэргэн",
        "japanese": "狙撃兵",
        "confidence": "low",
        "matchedVia": [
            "sharpshooter"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "оршихын тийн ялгал",
        "japanese": "所格",
        "confidence": "medium",
        "matchedVia": [
            "locative case"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ул",
        "japanese": "遺物",
        "confidence": "medium",
        "matchedVia": [
            "relic"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "говь",
        "japanese": "荒野",
        "confidence": "low",
        "matchedVia": [
            "desert"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "сүүдэр",
        "japanese": "一代",
        "confidence": "medium",
        "matchedVia": [
            "age"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хүрд",
        "japanese": "車",
        "confidence": "medium",
        "matchedVia": [
            "wheel"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "мянган",
        "japanese": "千",
        "confidence": "low",
        "matchedVia": [
            "thousand"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дохих",
        "japanese": "鼓す",
        "confidence": "medium",
        "matchedVia": [
            "to beat a drum"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "татах",
        "japanese": "括る",
        "confidence": "low",
        "matchedVia": [
            "to restrain"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "агаар",
        "japanese": "空気",
        "confidence": "medium",
        "matchedVia": [
            "air",
            "atmosphere"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөвд",
        "japanese": "苔",
        "confidence": "medium",
        "matchedVia": [
            "moss"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ямаа",
        "japanese": "山羊",
        "confidence": "medium",
        "matchedVia": [
            "goat"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шанаган хорхой",
        "japanese": "蝌蚪",
        "confidence": "medium",
        "matchedVia": [
            "tadpole"
        ],
        "mark": "good"
    },
    {
        "mongolian": "угаах",
        "japanese": "洗う",
        "confidence": "medium",
        "matchedVia": [
            "to wash"
        ],
        "mark": "good"
    },
    {
        "mongolian": "арвай",
        "japanese": "麦",
        "confidence": "medium",
        "matchedVia": [
            "barley"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цох",
        "japanese": "甲虫",
        "confidence": "medium",
        "matchedVia": [
            "beetle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "амьтны хүрээлэн",
        "japanese": "動物園",
        "confidence": "medium",
        "matchedVia": [
            "zoo"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хаялга",
        "japanese": "沿岸",
        "confidence": "medium",
        "matchedVia": [
            "coast"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "эгэх",
        "japanese": "引き返す",
        "confidence": "medium",
        "matchedVia": [
            "to return"
        ],
        "mark": "good"
    },
    {
        "mongolian": "орвон",
        "japanese": "根幹",
        "confidence": "medium",
        "matchedVia": [
            "root"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "оноосон нэр",
        "japanese": "固有名詞",
        "confidence": "medium",
        "matchedVia": [
            "proper noun"
        ],
        "mark": "good"
    },
    {
        "mongolian": "оюутан",
        "japanese": "学究",
        "confidence": "medium",
        "matchedVia": [
            "student"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нохой",
        "japanese": "ワン子",
        "confidence": "medium",
        "matchedVia": [
            "dog"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хахууль",
        "japanese": "裏金",
        "confidence": "medium",
        "matchedVia": [
            "bribe"
        ],
        "mark": "good"
    },
    {
        "mongolian": "амьтан",
        "japanese": "生物",
        "confidence": "medium",
        "matchedVia": [
            "creature"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сорох",
        "japanese": "舐める",
        "confidence": "medium",
        "matchedVia": [
            "to suck"
        ],
        "mark": "good"
    },
    {
        "mongolian": "элчин сайдын яам",
        "japanese": "大使館",
        "confidence": "medium",
        "matchedVia": [
            "embassy"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сүнс",
        "japanese": "気迫",
        "confidence": "medium",
        "matchedVia": [
            "soul"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хулгайч",
        "japanese": "盗賊",
        "confidence": "medium",
        "matchedVia": [
            "thief"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бямба",
        "japanese": "土曜",
        "confidence": "medium",
        "matchedVia": [
            "saturday"
        ],
        "mark": "good"
    },
    {
        "mongolian": "инээх",
        "japanese": "笑う",
        "confidence": "medium",
        "matchedVia": [
            "to laugh"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зорих",
        "japanese": "努める",
        "confidence": "medium",
        "matchedVia": [
            "to strive"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "бэйкери",
        "japanese": "パン屋",
        "confidence": "medium",
        "matchedVia": [
            "bakery"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хазаар",
        "japanese": "手綱",
        "confidence": "medium",
        "matchedVia": [
            "bridle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "жавтий",
        "japanese": "罪",
        "confidence": "medium",
        "matchedVia": [
            "sin"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "зовхи",
        "japanese": "瞼",
        "confidence": "medium",
        "matchedVia": [
            "eyelid"
        ],
        "mark": "good"
    },
    {
        "mongolian": "аюултай",
        "japanese": "やばい",
        "confidence": "medium",
        "matchedVia": [
            "dangerous"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бүлэг",
        "japanese": "群",
        "confidence": "medium",
        "matchedVia": [
            "group"
        ],
        "mark": "good"
    },
    {
        "mongolian": "жижиг",
        "japanese": "分",
        "confidence": "medium",
        "matchedVia": [
            "minute unit of time"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "өөрчлөлт",
        "japanese": "乗り換え",
        "confidence": "medium",
        "matchedVia": [
            "change"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "уул",
        "japanese": "山",
        "confidence": "medium",
        "matchedVia": [
            "mountain"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хоол хийх",
        "japanese": "火を通す",
        "confidence": "medium",
        "matchedVia": [
            "to cook"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ах",
        "japanese": "お兄さん",
        "confidence": "medium",
        "matchedVia": [
            "older brother"
        ],
        "mark": "good"
    },
    {
        "mongolian": "уламжлалт",
        "japanese": "旧来",
        "confidence": "medium",
        "matchedVia": [
            "traditional"
        ],
        "mark": "good"
    },
    {
        "mongolian": "алсыг харагч",
        "japanese": "観覧車",
        "confidence": "medium",
        "matchedVia": [
            "ferris wheel"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сул задгай",
        "japanese": "だらし無い",
        "confidence": "medium",
        "matchedVia": [
            "loose"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зузаан",
        "japanese": "太い",
        "confidence": "medium",
        "matchedVia": [
            "thick"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өргөст хэмх",
        "japanese": "河童",
        "confidence": "medium",
        "matchedVia": [
            "cucumber"
        ],
        "mark": "good"
    },
    {
        "mongolian": "автийрак",
        "japanese": "ねじ回し",
        "confidence": "medium",
        "matchedVia": [
            "screwdriver"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "гэмшил",
        "japanese": "哀悼",
        "confidence": "medium",
        "matchedVia": [
            "regret"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "гэх мэт",
        "japanese": "等",
        "confidence": "low",
        "matchedVia": [
            "etc"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мөрдөх",
        "japanese": "尋ねる",
        "confidence": "low",
        "matchedVia": [
            "to investigate"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "мужаан",
        "japanese": "建具屋",
        "confidence": "medium",
        "matchedVia": [
            "joiner"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хурим",
        "japanese": "結婚式",
        "confidence": "medium",
        "matchedVia": [
            "wedding"
        ],
        "mark": "good"
    },
    {
        "mongolian": "овоо",
        "japanese": "礼儀正しい",
        "confidence": "medium",
        "matchedVia": [
            "decorous"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "сээр",
        "japanese": "椎骨",
        "confidence": "medium",
        "matchedVia": [
            "vertebra"
        ],
        "mark": "good"
    },
    {
        "mongolian": "авд",
        "japanese": "即席",
        "confidence": "medium",
        "matchedVia": [
            "improvised"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "би чамд хайртай",
        "japanese": "愛羅武勇",
        "confidence": "low",
        "matchedVia": [
            "i love you"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тунгалаг",
        "japanese": "透明",
        "confidence": "medium",
        "matchedVia": [
            "transparent"
        ],
        "mark": "good"
    },
    {
        "mongolian": "аугаа",
        "japanese": "強さ",
        "confidence": "medium",
        "matchedVia": [
            "strength"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "айлчлах",
        "japanese": "訪ねる",
        "confidence": "medium",
        "matchedVia": [
            "to visit"
        ],
        "mark": "good"
    },
    {
        "mongolian": "малтах",
        "japanese": "掘る",
        "confidence": "medium",
        "matchedVia": [
            "to dig"
        ],
        "mark": "good"
    },
    {
        "mongolian": "голох",
        "japanese": "拒む",
        "confidence": "medium",
        "matchedVia": [
            "to reject"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "шүүх",
        "japanese": "御殿",
        "confidence": "medium",
        "matchedVia": [
            "court"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гэргий",
        "japanese": "奥さん",
        "confidence": "medium",
        "matchedVia": [
            "wife"
        ],
        "mark": "good"
    },
    {
        "mongolian": "оршуулга",
        "japanese": "葬儀",
        "confidence": "medium",
        "matchedVia": [
            "funeral"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хувин",
        "japanese": "馬穴",
        "confidence": "medium",
        "matchedVia": [
            "bucket"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нэр",
        "japanese": "称号",
        "confidence": "medium",
        "matchedVia": [
            "name",
            "title"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөмүүн",
        "japanese": "上唇",
        "confidence": "medium",
        "matchedVia": [
            "upper lip"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бүгд",
        "japanese": "加減",
        "confidence": "medium",
        "matchedVia": [
            "amount"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хайчлах",
        "japanese": "ハサミを入れる",
        "confidence": "medium",
        "matchedVia": [
            "to cut with scissors"
        ],
        "mark": "good"
    },
    {
        "mongolian": "амлах",
        "japanese": "契る",
        "confidence": "medium",
        "matchedVia": [
            "to promise"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хагарах",
        "japanese": "切れる",
        "confidence": "medium",
        "matchedVia": [
            "to break"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хошуу",
        "japanese": "嘴",
        "confidence": "medium",
        "matchedVia": [
            "beak"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зүүдлэх",
        "japanese": "思う",
        "confidence": "medium",
        "matchedVia": [
            "to dream"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хотын зах",
        "japanese": "郊外",
        "confidence": "medium",
        "matchedVia": [
            "suburb"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сияан",
        "japanese": "郡",
        "confidence": "medium",
        "matchedVia": [
            "county"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "чүдэнз",
        "japanese": "一致",
        "confidence": "medium",
        "matchedVia": [
            "match"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хязгаар",
        "japanese": "国境",
        "confidence": "medium",
        "matchedVia": [
            "border between countries"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хуучин",
        "japanese": "古参",
        "confidence": "medium",
        "matchedVia": [
            "veteran"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "үтрэм",
        "japanese": "打麦場",
        "confidence": "medium",
        "matchedVia": [
            "threshing floor"
        ],
        "mark": "good"
    },
    {
        "mongolian": "огтлох",
        "japanese": "切る",
        "confidence": "medium",
        "matchedVia": [
            "to cut"
        ],
        "mark": "good"
    },
    {
        "mongolian": "завгүй",
        "japanese": "慌ただしい",
        "confidence": "medium",
        "matchedVia": [
            "busy"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сансрын хөлөг",
        "japanese": "宇宙船",
        "confidence": "medium",
        "matchedVia": [
            "spaceship"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шүлс",
        "japanese": "唾",
        "confidence": "medium",
        "matchedVia": [
            "saliva"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хүлээн авах",
        "japanese": "引き取る",
        "confidence": "medium",
        "matchedVia": [
            "to receive"
        ],
        "mark": "good"
    },
    {
        "mongolian": "араа",
        "japanese": "奥歯",
        "confidence": "medium",
        "matchedVia": [
            "molar"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хуанли",
        "japanese": "暦",
        "confidence": "medium",
        "matchedVia": [
            "calendar",
            "almanac"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "барих",
        "japanese": "扱う",
        "confidence": "medium",
        "matchedVia": [
            "to handle"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "дараа",
        "japanese": "後続",
        "confidence": "low",
        "matchedVia": [
            "following"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "сохор",
        "japanese": "闇雲",
        "confidence": "medium",
        "matchedVia": [
            "blind"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зэрлэг",
        "japanese": "獅子奮迅",
        "confidence": "medium",
        "matchedVia": [
            "ferocious"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэвлээр явагч",
        "japanese": "爬虫",
        "confidence": "medium",
        "matchedVia": [
            "reptile"
        ],
        "mark": "good"
    },
    {
        "mongolian": "илд",
        "japanese": "刀剣",
        "confidence": "medium",
        "matchedVia": [
            "sword"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өдрийн",
        "japanese": "蜉蝣",
        "confidence": "medium",
        "matchedVia": [
            "mayfly"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "давхар",
        "japanese": "二連",
        "confidence": "medium",
        "matchedVia": [
            "double"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хар хэрээ",
        "japanese": "烏",
        "confidence": "medium",
        "matchedVia": [
            "raven"
        ],
        "mark": "good"
    },
    {
        "mongolian": "охин",
        "japanese": "女の子",
        "confidence": "medium",
        "matchedVia": [
            "girl",
            "daughter"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зүүн",
        "japanese": "東",
        "confidence": "medium",
        "matchedVia": [
            "east"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөргүүр",
        "japanese": "冷蔵庫",
        "confidence": "medium",
        "matchedVia": [
            "refrigerator"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "буу",
        "japanese": "銃",
        "confidence": "medium",
        "matchedVia": [
            "firearm"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зургаадугаар",
        "japanese": "第六",
        "confidence": "low",
        "matchedVia": [
            "sixth"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "ухах",
        "japanese": "心得る",
        "confidence": "medium",
        "matchedVia": [
            "to understand"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "асах",
        "japanese": "上る",
        "confidence": "medium",
        "matchedVia": [
            "to climb"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "сэжиг",
        "japanese": "懐疑",
        "confidence": "medium",
        "matchedVia": [
            "doubt"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бөөс",
        "japanese": "ちいちい",
        "confidence": "medium",
        "matchedVia": [
            "louse"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шүдэнз",
        "japanese": "一致",
        "confidence": "medium",
        "matchedVia": [
            "match"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "элчин",
        "japanese": "使者",
        "confidence": "medium",
        "matchedVia": [
            "messenger"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "би ойлгохгүй байна",
        "japanese": "分からん",
        "confidence": "low",
        "matchedVia": [
            "i don't know"
        ],
        "mark": "good"
    },
    {
        "mongolian": "жүдо",
        "japanese": "柔道",
        "confidence": "medium",
        "matchedVia": [
            "judo"
        ],
        "mark": "good"
    },
    {
        "mongolian": "аав",
        "japanese": "お父さん",
        "confidence": "medium",
        "matchedVia": [
            "dad"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дараа уулзъя",
        "japanese": "行ってきます",
        "confidence": "low",
        "matchedVia": [
            "see you later"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "ч",
        "japanese": "も",
        "confidence": "low",
        "matchedVia": [
            "even",
            "although"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зүрх",
        "japanese": "心",
        "confidence": "medium",
        "matchedVia": [
            "heart"
        ],
        "mark": "good"
    },
    {
        "mongolian": "наймалж",
        "japanese": "蛸",
        "confidence": "medium",
        "matchedVia": [
            "octopus"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өглөөний цай",
        "japanese": "朝食",
        "confidence": "medium",
        "matchedVia": [
            "breakfast"
        ],
        "mark": "good"
    },
    {
        "mongolian": "халдварт",
        "japanese": "伝染性",
        "confidence": "medium",
        "matchedVia": [
            "infectious"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өртөг",
        "japanese": "代価",
        "confidence": "medium",
        "matchedVia": [
            "cost"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үнсэх",
        "japanese": "口付ける",
        "confidence": "medium",
        "matchedVia": [
            "to kiss"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зорчих",
        "japanese": "伝わる",
        "confidence": "medium",
        "matchedVia": [
            "to travel"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "үйлдвэрлэлийн хэрэгсэл",
        "japanese": "生産手段",
        "confidence": "medium",
        "matchedVia": [
            "means of production"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шивээс",
        "japanese": "箚青",
        "confidence": "medium",
        "matchedVia": [
            "tattoo"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мэндчилгээ",
        "japanese": "挨拶",
        "confidence": "medium",
        "matchedVia": [
            "greeting"
        ],
        "mark": "good"
    },
    {
        "mongolian": "орчуулагч",
        "japanese": "訳者",
        "confidence": "medium",
        "matchedVia": [
            "translator"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөнөг",
        "japanese": "桶",
        "confidence": "medium",
        "matchedVia": [
            "bucket",
            "tub"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "далай",
        "japanese": "青い",
        "confidence": "medium",
        "matchedVia": [
            "blue"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "жижиглэн",
        "japanese": "小売",
        "confidence": "medium",
        "matchedVia": [
            "retail"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "алба",
        "japanese": "恩",
        "confidence": "medium",
        "matchedVia": [
            "obligation"
        ],
        "mark": "good"
    },
    {
        "mongolian": "загасны тор",
        "japanese": "漁網",
        "confidence": "medium",
        "matchedVia": [
            "fishing net"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үер",
        "japanese": "洪水",
        "confidence": "medium",
        "matchedVia": [
            "flood"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үе",
        "japanese": "世",
        "confidence": "medium",
        "matchedVia": [
            "generation",
            "period"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "резин",
        "japanese": "護謨",
        "confidence": "medium",
        "matchedVia": [
            "rubber"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тэд нар",
        "japanese": "それ等",
        "confidence": "low",
        "matchedVia": [
            "they"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ууртай",
        "japanese": "憤然",
        "confidence": "medium",
        "matchedVia": [
            "angry"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үнэрлэх чадвар",
        "japanese": "香り",
        "confidence": "medium",
        "matchedVia": [
            "smell"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөхний товч",
        "japanese": "乳首",
        "confidence": "medium",
        "matchedVia": [
            "nipple"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гэмт хэрэг",
        "japanese": "悪事",
        "confidence": "medium",
        "matchedVia": [
            "crime"
        ],
        "mark": "good"
    },
    {
        "mongolian": "самбар",
        "japanese": "掲示板",
        "confidence": "medium",
        "matchedVia": [
            "notice board"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дунд",
        "japanese": "中",
        "confidence": "medium",
        "matchedVia": [
            "middle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "унтрах",
        "japanese": "絶え果てる",
        "confidence": "medium",
        "matchedVia": [
            "to be extinguished"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "улс",
        "japanese": "隣人",
        "confidence": "medium",
        "matchedVia": [
            "neighbour"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "долоодугаар",
        "japanese": "第七",
        "confidence": "low",
        "matchedVia": [
            "seventh"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эмээх",
        "japanese": "危ぶむ",
        "confidence": "medium",
        "matchedVia": [
            "to fear"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хаант улс",
        "japanese": "王国",
        "confidence": "medium",
        "matchedVia": [
            "kingdom"
        ],
        "mark": "good"
    },
    {
        "mongolian": "түүх",
        "japanese": "群がる",
        "confidence": "medium",
        "matchedVia": [
            "to gather"
        ],
        "mark": "good"
    },
    {
        "mongolian": "буюу",
        "japanese": "其れとも",
        "confidence": "low",
        "matchedVia": [
            "or"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "байгаль",
        "japanese": "気質",
        "confidence": "medium",
        "matchedVia": [
            "nature"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "чихүүр хорхой",
        "japanese": "鋏虫",
        "confidence": "medium",
        "matchedVia": [
            "earwig"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэрэглүүр",
        "japanese": "やり方",
        "confidence": "medium",
        "matchedVia": [
            "method"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "квадрат",
        "japanese": "広場",
        "confidence": "medium",
        "matchedVia": [
            "square"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "гатлах",
        "japanese": "耐える",
        "confidence": "low",
        "matchedVia": [
            "to withstand"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "эрэгдэх",
        "japanese": "ねじ込む",
        "confidence": "medium",
        "matchedVia": [
            "to screw in"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "галзуу",
        "japanese": "狂犬病",
        "confidence": "medium",
        "matchedVia": [
            "rabies"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хүрхрээ",
        "japanese": "滝",
        "confidence": "medium",
        "matchedVia": [
            "waterfall"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хувь",
        "japanese": "継承",
        "confidence": "medium",
        "matchedVia": [
            "inheritance"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "цуглуулах",
        "japanese": "引き取る",
        "confidence": "medium",
        "matchedVia": [
            "to collect"
        ],
        "mark": "good"
    },
    {
        "mongolian": "борной",
        "japanese": "馬鍬",
        "confidence": "medium",
        "matchedVia": [
            "harrow"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "үржүүлэх",
        "japanese": "乗じる",
        "confidence": "low",
        "matchedVia": [
            "to multiply"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тогтвор",
        "japanese": "安定",
        "confidence": "medium",
        "matchedVia": [
            "stability"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөндий",
        "japanese": "沢",
        "confidence": "medium",
        "matchedVia": [
            "valley"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зууч",
        "japanese": "妓夫",
        "confidence": "medium",
        "matchedVia": [
            "pimp"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зочлох",
        "japanese": "訪ねる",
        "confidence": "medium",
        "matchedVia": [
            "to visit"
        ],
        "mark": "good"
    },
    {
        "mongolian": "агтнэ",
        "japanese": "馬群",
        "confidence": "medium",
        "matchedVia": [
            "herd of horses"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "найрамдал",
        "japanese": "交際",
        "confidence": "medium",
        "matchedVia": [
            "friendship"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өгүүлэгдэхүүн",
        "japanese": "課題",
        "confidence": "medium",
        "matchedVia": [
            "subject"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "дайр",
        "japanese": "擦り傷",
        "confidence": "medium",
        "matchedVia": [
            "abrasion"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "эрх",
        "japanese": "驕児",
        "confidence": "low",
        "matchedVia": [
            "spoiled child"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "цангаа",
        "japanese": "渇き",
        "confidence": "medium",
        "matchedVia": [
            "thirst"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дайн",
        "japanese": "交戦",
        "confidence": "medium",
        "matchedVia": [
            "war"
        ],
        "mark": "good"
    },
    {
        "mongolian": "амаараа шороо үмхэх",
        "japanese": "弱り衰える",
        "confidence": "medium",
        "matchedVia": [
            "to languish"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "бээлий",
        "japanese": "手袋",
        "confidence": "medium",
        "matchedVia": [
            "glove"
        ],
        "mark": "good"
    },
    {
        "mongolian": "төстэй",
        "japanese": "みたい",
        "confidence": "low",
        "matchedVia": [
            "resembling"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "Христос",
        "japanese": "基督",
        "confidence": "low",
        "matchedVia": [
            "christ"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хадуур",
        "japanese": "鎌",
        "confidence": "medium",
        "matchedVia": [
            "sickle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ерөнхий",
        "japanese": "一般",
        "confidence": "medium",
        "matchedVia": [
            "general"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шартах",
        "japanese": "陶酔",
        "confidence": "medium",
        "matchedVia": [
            "intoxication"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цэцэрлэгч",
        "japanese": "植木屋",
        "confidence": "medium",
        "matchedVia": [
            "gardener"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хошууч",
        "japanese": "少佐",
        "confidence": "medium",
        "matchedVia": [
            "major"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "нисэх буудал",
        "japanese": "空港",
        "confidence": "medium",
        "matchedVia": [
            "airport"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шорлог",
        "japanese": "ＢＢＱ",
        "confidence": "medium",
        "matchedVia": [
            "barbecue"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шээх",
        "japanese": "小便をする",
        "confidence": "medium",
        "matchedVia": [
            "to urinate"
        ],
        "mark": "good"
    },
    {
        "mongolian": "итгүүлэх",
        "japanese": "噛む",
        "confidence": "low",
        "matchedVia": [
            "to convince"
        ],
        "mark": "good"
    },
    {
        "mongolian": "солонго",
        "japanese": "虹",
        "confidence": "medium",
        "matchedVia": [
            "rainbow"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өрөө",
        "japanese": "ゆとり",
        "confidence": "medium",
        "matchedVia": [
            "room"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "минийх",
        "japanese": "鉱坑",
        "confidence": "low",
        "matchedVia": [
            "mine"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "нээх",
        "japanese": "開く",
        "confidence": "medium",
        "matchedVia": [
            "to open"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шүдний сойз",
        "japanese": "歯ブラシ",
        "confidence": "medium",
        "matchedVia": [
            "toothbrush"
        ],
        "mark": "good"
    },
    {
        "mongolian": "там",
        "japanese": "地獄",
        "confidence": "medium",
        "matchedVia": [
            "hell"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үйлдэх",
        "japanese": "遊ばす",
        "confidence": "medium",
        "matchedVia": [
            "to do"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "журнал",
        "japanese": "日記",
        "confidence": "medium",
        "matchedVia": [
            "diary"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хүчиндэх",
        "japanese": "犯る",
        "confidence": "medium",
        "matchedVia": [
            "to rape"
        ],
        "mark": "good"
    },
    {
        "mongolian": "будаа агшаагч",
        "japanese": "炊飯器",
        "confidence": "medium",
        "matchedVia": [
            "rice cooker"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөрөг",
        "japanese": "画像",
        "confidence": "medium",
        "matchedVia": [
            "portrait"
        ],
        "mark": "good"
    },
    {
        "mongolian": "Цагаан сар",
        "japanese": "春節",
        "confidence": "low",
        "matchedVia": [
            "lunar new year"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тэг",
        "japanese": "零",
        "confidence": "low",
        "matchedVia": [
            "zero"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хирс",
        "japanese": "犀",
        "confidence": "medium",
        "matchedVia": [
            "rhinoceros"
        ],
        "mark": "good"
    },
    {
        "mongolian": "энэ",
        "japanese": "此の",
        "confidence": "low",
        "matchedVia": [
            "this"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сүлд",
        "japanese": "紋章",
        "confidence": "medium",
        "matchedVia": [
            "coat of arms"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үсрэх",
        "japanese": "吃驚",
        "confidence": "medium",
        "matchedVia": [
            "to jump"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "жижүүр",
        "japanese": "当番",
        "confidence": "medium",
        "matchedVia": [
            "person on duty"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "эмнэлэг",
        "japanese": "持て成し",
        "confidence": "medium",
        "matchedVia": [
            "treatment"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "асуудал",
        "japanese": "疑い",
        "confidence": "medium",
        "matchedVia": [
            "question"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "бүйлс",
        "japanese": "巴旦杏",
        "confidence": "medium",
        "matchedVia": [
            "almond"
        ],
        "mark": "good"
    },
    {
        "mongolian": "уур амьсгал",
        "japanese": "気候",
        "confidence": "medium",
        "matchedVia": [
            "climate"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нуруу",
        "japanese": "山脈",
        "confidence": "medium",
        "matchedVia": [
            "mountain range"
        ],
        "mark": "good"
    },
    {
        "mongolian": "туурга",
        "japanese": "囲い",
        "confidence": "medium",
        "matchedVia": [
            "wall"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "өлөн",
        "japanese": "饑い",
        "confidence": "medium",
        "matchedVia": [
            "hungry"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "номтон",
        "japanese": "教徒",
        "confidence": "medium",
        "matchedVia": [
            "believer"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "тунадас",
        "japanese": "土砂",
        "confidence": "medium",
        "matchedVia": [
            "sediment"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хөрөө",
        "japanese": "鋸",
        "confidence": "medium",
        "matchedVia": [
            "saw"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шалтгаа",
        "japanese": "胎児",
        "confidence": "medium",
        "matchedVia": [
            "fetus"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "заарь",
        "japanese": "麝香腺",
        "confidence": "medium",
        "matchedVia": [
            "musk gland"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бодис",
        "japanese": "実質",
        "confidence": "medium",
        "matchedVia": [
            "substance"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үзүүр",
        "japanese": "極み",
        "confidence": "medium",
        "matchedVia": [
            "extremity",
            "peak"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үзэм",
        "japanese": "葡萄",
        "confidence": "medium",
        "matchedVia": [
            "grape"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эрхүүд",
        "japanese": "切支丹",
        "confidence": "medium",
        "matchedVia": [
            "christian"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "гараг",
        "japanese": "惑星",
        "confidence": "medium",
        "matchedVia": [
            "planet"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хоног",
        "japanese": "日",
        "confidence": "medium",
        "matchedVia": [
            "day"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сарвуу",
        "japanese": "呎",
        "confidence": "medium",
        "matchedVia": [
            "foot"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "жигүүр",
        "japanese": "翼",
        "confidence": "medium",
        "matchedVia": [
            "wing"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тэрэг",
        "japanese": "台車",
        "confidence": "medium",
        "matchedVia": [
            "cart"
        ],
        "mark": "good"
    },
    {
        "mongolian": "савар",
        "japanese": "手",
        "confidence": "medium",
        "matchedVia": [
            "hand"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөмсөг",
        "japanese": "軒",
        "confidence": "medium",
        "matchedVia": [
            "eaves"
        ],
        "mark": "good"
    },
    {
        "mongolian": "онгоц",
        "japanese": "風呂",
        "confidence": "medium",
        "matchedVia": [
            "bathtub"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "шахах",
        "japanese": "圧する",
        "confidence": "medium",
        "matchedVia": [
            "to press",
            "to oppress"
        ],
        "mark": "good"
    },
    {
        "mongolian": "лалар",
        "japanese": "異端者",
        "confidence": "medium",
        "matchedVia": [
            "heathen"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "зэврэх",
        "japanese": "錆びる",
        "confidence": "medium",
        "matchedVia": [
            "to rust"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мэндлэх",
        "japanese": "迎える",
        "confidence": "medium",
        "matchedVia": [
            "to greet"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тэд",
        "japanese": "それ等",
        "confidence": "low",
        "matchedVia": [
            "they"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шавхай",
        "japanese": "水たまり",
        "confidence": "medium",
        "matchedVia": [
            "puddle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тавдугаар",
        "japanese": "第五",
        "confidence": "low",
        "matchedVia": [
            "fifth"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бөөлжих",
        "japanese": "吐き出す",
        "confidence": "medium",
        "matchedVia": [
            "to vomit"
        ],
        "mark": "good"
    },
    {
        "mongolian": "баллуур",
        "japanese": "消しゴム",
        "confidence": "medium",
        "matchedVia": [
            "eraser"
        ],
        "mark": "good"
    },
    {
        "mongolian": "уламжлал",
        "japanese": "伝承",
        "confidence": "medium",
        "matchedVia": [
            "tradition"
        ],
        "mark": "good"
    },
    {
        "mongolian": "муж улс",
        "japanese": "合衆国",
        "confidence": "medium",
        "matchedVia": [
            "federal state"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зочин",
        "japanese": "お客様",
        "confidence": "low",
        "matchedVia": [
            "client"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тав",
        "japanese": "釘",
        "confidence": "medium",
        "matchedVia": [
            "rivet"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хөргөгч",
        "japanese": "冷蔵庫",
        "confidence": "medium",
        "matchedVia": [
            "refrigerator"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зөгий",
        "japanese": "蜂",
        "confidence": "medium",
        "matchedVia": [
            "bee"
        ],
        "mark": "good"
    },
    {
        "mongolian": "инээмсэглэх",
        "japanese": "微笑む",
        "confidence": "medium",
        "matchedVia": [
            "to smile"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хими",
        "japanese": "化学",
        "confidence": "medium",
        "matchedVia": [
            "chemistry"
        ],
        "mark": "good"
    },
    {
        "mongolian": "авайлах",
        "japanese": "丸め込む",
        "confidence": "medium",
        "matchedVia": [
            "to seduce"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цагаан",
        "japanese": "白い",
        "confidence": "medium",
        "matchedVia": [
            "white"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үхсэн",
        "japanese": "亡い",
        "confidence": "medium",
        "matchedVia": [
            "dead"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мөргөлдөх",
        "japanese": "かち合う",
        "confidence": "medium",
        "matchedVia": [
            "to collide"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шохой",
        "japanese": "石灰",
        "confidence": "medium",
        "matchedVia": [
            "lime"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дорно",
        "japanese": "東",
        "confidence": "low",
        "matchedVia": [
            "east",
            "eastern"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үндсэн дээр",
        "japanese": "に因って",
        "confidence": "low",
        "matchedVia": [
            "on the basis of"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үйлдэхийн тийн ялгал",
        "japanese": "具格",
        "confidence": "medium",
        "matchedVia": [
            "instrumental case"
        ],
        "mark": "good"
    },
    {
        "mongolian": "худалдаж авах",
        "japanese": "買う",
        "confidence": "medium",
        "matchedVia": [
            "to buy"
        ],
        "mark": "good"
    },
    {
        "mongolian": "янжуур",
        "japanese": "煙草",
        "confidence": "medium",
        "matchedVia": [
            "cigarette"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "математик",
        "japanese": "数学",
        "confidence": "medium",
        "matchedVia": [
            "mathematics"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ац",
        "japanese": "あやふや",
        "confidence": "medium",
        "matchedVia": [
            "ambiguous"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "бодох",
        "japanese": "思う",
        "confidence": "medium",
        "matchedVia": [
            "to think"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хоньчин",
        "japanese": "牧人",
        "confidence": "medium",
        "matchedVia": [
            "shepherd"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үсний хаг",
        "japanese": "頭垢",
        "confidence": "medium",
        "matchedVia": [
            "dandruff"
        ],
        "mark": "good"
    },
    {
        "mongolian": "загасны уурга",
        "japanese": "釣竿",
        "confidence": "medium",
        "matchedVia": [
            "fishing rod"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мөндөрлөх",
        "japanese": "迎える",
        "confidence": "medium",
        "matchedVia": [
            "to hail"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "ам өгөх",
        "japanese": "取り結ぶ",
        "confidence": "medium",
        "matchedVia": [
            "to make a promise"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нар хиртэлт",
        "japanese": "日食",
        "confidence": "medium",
        "matchedVia": [
            "solar eclipse"
        ],
        "mark": "good"
    },
    {
        "mongolian": "найтаах",
        "japanese": "嚏る",
        "confidence": "medium",
        "matchedVia": [
            "to sneeze"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хураангуй",
        "japanese": "簡潔",
        "confidence": "medium",
        "matchedVia": [
            "succinct"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мөн чанар",
        "japanese": "越幾斯",
        "confidence": "medium",
        "matchedVia": [
            "essence"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "ханиад",
        "japanese": "咳",
        "confidence": "medium",
        "matchedVia": [
            "cough"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үед",
        "japanese": "沿って",
        "confidence": "low",
        "matchedVia": [
            "along"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "социалист реализм",
        "japanese": "社会主義リアリズム",
        "confidence": "medium",
        "matchedVia": [
            "socialist realism"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "булга",
        "japanese": "銀だら",
        "confidence": "medium",
        "matchedVia": [
            "sable"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бүрхэвч",
        "japanese": "膜",
        "confidence": "medium",
        "matchedVia": [
            "membrane"
        ],
        "mark": "good"
    },
    {
        "mongolian": "натрийн хлорид",
        "japanese": "塩",
        "confidence": "medium",
        "matchedVia": [
            "sodium chloride",
            "table salt"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дөш",
        "japanese": "金敷き",
        "confidence": "medium",
        "matchedVia": [
            "anvil"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цогцос",
        "japanese": "遺骸",
        "confidence": "medium",
        "matchedVia": [
            "body",
            "corpse"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хордох",
        "japanese": "威張る",
        "confidence": "medium",
        "matchedVia": [
            "to act arrogantly"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хөлбөмбөг",
        "japanese": "玉蹴り",
        "confidence": "medium",
        "matchedVia": [
            "football soccer"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хамба лам",
        "japanese": "住職",
        "confidence": "medium",
        "matchedVia": [
            "abbot"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэрүүл",
        "japanese": "いざこざ",
        "confidence": "medium",
        "matchedVia": [
            "quarrel"
        ],
        "mark": "good"
    },
    {
        "mongolian": "уруул",
        "japanese": "唇",
        "confidence": "medium",
        "matchedVia": [
            "lip"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өвс",
        "japanese": "草",
        "confidence": "medium",
        "matchedVia": [
            "grass",
            "herb"
        ],
        "mark": "good"
    },
    {
        "mongolian": "аялах",
        "japanese": "伝わる",
        "confidence": "medium",
        "matchedVia": [
            "to travel"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "гуя",
        "japanese": "股",
        "confidence": "medium",
        "matchedVia": [
            "thigh"
        ],
        "mark": "good"
    },
    {
        "mongolian": "агуй",
        "japanese": "岩屋",
        "confidence": "medium",
        "matchedVia": [
            "cave"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хаалга",
        "japanese": "扉",
        "confidence": "medium",
        "matchedVia": [
            "door",
            "gate"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ард олон",
        "japanese": "社会",
        "confidence": "medium",
        "matchedVia": [
            "public"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "шивнэх",
        "japanese": "囁く",
        "confidence": "medium",
        "matchedVia": [
            "to whisper"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нүх",
        "japanese": "穴",
        "confidence": "medium",
        "matchedVia": [
            "hole"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хазах",
        "japanese": "噛む",
        "confidence": "medium",
        "matchedVia": [
            "to bite"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мянга",
        "japanese": "千",
        "confidence": "low",
        "matchedVia": [
            "thousand"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тэнгэр",
        "japanese": "お天気",
        "confidence": "medium",
        "matchedVia": [
            "weather"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тайлбар",
        "japanese": "弁明",
        "confidence": "medium",
        "matchedVia": [
            "explanation",
            "excuse"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бүжиглэх",
        "japanese": "舞い躍る",
        "confidence": "medium",
        "matchedVia": [
            "to dance"
        ],
        "mark": "good"
    },
    {
        "mongolian": "жийнс",
        "japanese": "Ｇパン",
        "confidence": "medium",
        "matchedVia": [
            "jeans"
        ],
        "mark": "good"
    },
    {
        "mongolian": "анхилга",
        "japanese": "香気",
        "confidence": "medium",
        "matchedVia": [
            "fragrance"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бид",
        "japanese": "私たち",
        "confidence": "low",
        "matchedVia": [
            "we"
        ],
        "mark": "good"
    },
    {
        "mongolian": "чагнах",
        "japanese": "聞き置く",
        "confidence": "medium",
        "matchedVia": [
            "to listen"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хамгаалах",
        "japanese": "支える",
        "confidence": "medium",
        "matchedVia": [
            "to defend"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хоймсон",
        "japanese": "二連",
        "confidence": "medium",
        "matchedVia": [
            "double"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "сар",
        "japanese": "月間",
        "confidence": "medium",
        "matchedVia": [
            "month"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ялгац гишүүн",
        "japanese": "一品",
        "confidence": "medium",
        "matchedVia": [
            "article"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "таах",
        "japanese": "察する",
        "confidence": "medium",
        "matchedVia": [
            "to guess"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "долоох",
        "japanese": "舐める",
        "confidence": "medium",
        "matchedVia": [
            "to lick"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эрхэм",
        "japanese": "目抜き",
        "confidence": "medium",
        "matchedVia": [
            "important"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "цайны газар",
        "japanese": "茶室",
        "confidence": "medium",
        "matchedVia": [
            "tea house"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зөөлөн",
        "japanese": "柔らかい",
        "confidence": "medium",
        "matchedVia": [
            "soft"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дарс",
        "japanese": "九献",
        "confidence": "medium",
        "matchedVia": [
            "rice wine"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "жил",
        "japanese": "年",
        "confidence": "medium",
        "matchedVia": [
            "year"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зовлон",
        "japanese": "苦しみ",
        "confidence": "medium",
        "matchedVia": [
            "suffering"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хол",
        "japanese": "遠い",
        "confidence": "medium",
        "matchedVia": [
            "far"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бороо",
        "japanese": "雨",
        "confidence": "medium",
        "matchedVia": [
            "rain"
        ],
        "mark": "good"
    },
    {
        "mongolian": "франц",
        "japanese": "仏文",
        "confidence": "medium",
        "matchedVia": [
            "french"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хайлш",
        "japanese": "合金",
        "confidence": "medium",
        "matchedVia": [
            "alloy"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зоогой",
        "japanese": "飲食店",
        "confidence": "medium",
        "matchedVia": [
            "restaurant"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "өөртөө засах орон",
        "japanese": "自治区",
        "confidence": "medium",
        "matchedVia": [
            "autonomous region"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мантуу",
        "japanese": "蒸しパン",
        "confidence": "medium",
        "matchedVia": [
            "steamed bread"
        ],
        "mark": "good"
    },
    {
        "mongolian": "далавч",
        "japanese": "翼",
        "confidence": "medium",
        "matchedVia": [
            "wing"
        ],
        "mark": "good"
    },
    {
        "mongolian": "чирэх",
        "japanese": "引きずる",
        "confidence": "medium",
        "matchedVia": [
            "to drag"
        ],
        "mark": "good"
    },
    {
        "mongolian": "догшин",
        "japanese": "喧しい",
        "confidence": "low",
        "matchedVia": [
            "stern"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "холтос",
        "japanese": "木肌",
        "confidence": "medium",
        "matchedVia": [
            "bark of a tree"
        ],
        "mark": "good"
    },
    {
        "mongolian": "арал",
        "japanese": "島",
        "confidence": "medium",
        "matchedVia": [
            "island"
        ],
        "mark": "good"
    },
    {
        "mongolian": "арван дөрөв",
        "japanese": "十四",
        "confidence": "low",
        "matchedVia": [
            "fourteen"
        ],
        "mark": "good"
    },
    {
        "mongolian": "магадгүй",
        "japanese": "ひょっとすると",
        "confidence": "medium",
        "matchedVia": [
            "maybe"
        ],
        "mark": "good"
    },
    {
        "mongolian": "миний",
        "japanese": "おや",
        "confidence": "low",
        "matchedVia": [
            "my"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "бетон",
        "japanese": "混凝土",
        "confidence": "medium",
        "matchedVia": [
            "concrete"
        ],
        "mark": "good"
    },
    {
        "mongolian": "та",
        "japanese": "お前",
        "confidence": "low",
        "matchedVia": [
            "you"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "нийтгэх",
        "japanese": "織る",
        "confidence": "medium",
        "matchedVia": [
            "to weave"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "шүхэр",
        "japanese": "傘",
        "confidence": "medium",
        "matchedVia": [
            "umbrella"
        ],
        "mark": "good"
    },
    {
        "mongolian": "түших",
        "japanese": "寄りかかる",
        "confidence": "medium",
        "matchedVia": [
            "to lean on",
            "to depend on"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөхний толгой",
        "japanese": "乳首",
        "confidence": "medium",
        "matchedVia": [
            "nipple"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хувьсгал",
        "japanese": "維新",
        "confidence": "medium",
        "matchedVia": [
            "revolution"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тэвчээр",
        "japanese": "堪忍",
        "confidence": "medium",
        "matchedVia": [
            "patience",
            "tolerance"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дийлэх",
        "japanese": "乗り切る",
        "confidence": "low",
        "matchedVia": [
            "to overcome"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "булаг өвчин",
        "japanese": "瘰癧",
        "confidence": "medium",
        "matchedVia": [
            "scrofula"
        ],
        "mark": "good"
    },
    {
        "mongolian": "боол",
        "japanese": "奴隷",
        "confidence": "medium",
        "matchedVia": [
            "slave"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ойлгох",
        "japanese": "映す",
        "confidence": "medium",
        "matchedVia": [
            "to reflect"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дуудахын тийн ялгал",
        "japanese": "呼格",
        "confidence": "medium",
        "matchedVia": [
            "vocative case"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нүдүүр",
        "japanese": "乳棒",
        "confidence": "medium",
        "matchedVia": [
            "pestle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эрэх",
        "japanese": "調べる",
        "confidence": "medium",
        "matchedVia": [
            "to search"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "асуултын тэмдэг",
        "japanese": "疑問符",
        "confidence": "medium",
        "matchedVia": [
            "question mark"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шөвөг",
        "japanese": "錐",
        "confidence": "medium",
        "matchedVia": [
            "awl"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "судар",
        "japanese": "経",
        "confidence": "medium",
        "matchedVia": [
            "scripture",
            "sutra"
        ],
        "mark": "good"
    },
    {
        "mongolian": "элэг",
        "japanese": "血続き",
        "confidence": "medium",
        "matchedVia": [
            "blood relation"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "шороо",
        "japanese": "地",
        "confidence": "medium",
        "matchedVia": [
            "soil"
        ],
        "mark": "good"
    },
    {
        "mongolian": "угтвар үг",
        "japanese": "前置詞",
        "confidence": "medium",
        "matchedVia": [
            "preposition"
        ],
        "mark": "good"
    },
    {
        "mongolian": "баах",
        "japanese": "放る",
        "confidence": "medium",
        "matchedVia": [
            "to defecate"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "арван тав",
        "japanese": "十五",
        "confidence": "low",
        "matchedVia": [
            "fifteen"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мусульман",
        "japanese": "イスラム教徒",
        "confidence": "medium",
        "matchedVia": [
            "muslim"
        ],
        "mark": "good"
    },
    {
        "mongolian": "орчим",
        "japanese": "近々",
        "confidence": "low",
        "matchedVia": [
            "nearby",
            "near"
        ],
        "mark": "good"
    },
    {
        "mongolian": "математик дундаж",
        "japanese": "期待値",
        "confidence": "medium",
        "matchedVia": [
            "expected value"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "нээлттэй",
        "japanese": "公然",
        "confidence": "medium",
        "matchedVia": [
            "open"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өгөхийн тийн ялгал",
        "japanese": "与格",
        "confidence": "medium",
        "matchedVia": [
            "dative case"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дөрөвдүгээр",
        "japanese": "第四",
        "confidence": "low",
        "matchedVia": [
            "fourth"
        ],
        "mark": "good"
    },
    {
        "mongolian": "давс",
        "japanese": "塩分",
        "confidence": "medium",
        "matchedVia": [
            "salt"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөдлөх",
        "japanese": "扱う",
        "confidence": "low",
        "matchedVia": [
            "to work"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "баяр ёслол",
        "japanese": "祭典",
        "confidence": "medium",
        "matchedVia": [
            "festival"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "бин",
        "japanese": "錠剤",
        "confidence": "medium",
        "matchedVia": [
            "lozenge"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хошного",
        "japanese": "直腸",
        "confidence": "medium",
        "matchedVia": [
            "rectum"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "боох",
        "japanese": "繋ぐ",
        "confidence": "low",
        "matchedVia": [
            "to tie"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "ил",
        "japanese": "味方",
        "confidence": "medium",
        "matchedVia": [
            "ally"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хандгай",
        "japanese": "ヘラ鹿",
        "confidence": "medium",
        "matchedVia": [
            "elk"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэрэгтэй",
        "japanese": "必要",
        "confidence": "medium",
        "matchedVia": [
            "needed"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөлс",
        "japanese": "汗",
        "confidence": "medium",
        "matchedVia": [
            "perspiration"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үйлчлэх",
        "japanese": "忠誠を尽くす",
        "confidence": "medium",
        "matchedVia": [
            "to be loyal to"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "орших",
        "japanese": "実体",
        "confidence": "medium",
        "matchedVia": [
            "entity"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хулс",
        "japanese": "殺到",
        "confidence": "medium",
        "matchedVia": [
            "rush"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "урлаг",
        "japanese": "熟練",
        "confidence": "medium",
        "matchedVia": [
            "proficiency"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "зарц",
        "japanese": "使用人",
        "confidence": "medium",
        "matchedVia": [
            "servant"
        ],
        "mark": "good"
    },
    {
        "mongolian": "есдүгээр",
        "japanese": "第九",
        "confidence": "low",
        "matchedVia": [
            "ninth"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөрөөдөх",
        "japanese": "挽く",
        "confidence": "medium",
        "matchedVia": [
            "to saw"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нил",
        "japanese": "紫",
        "confidence": "medium",
        "matchedVia": [
            "violet"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "саяхан",
        "japanese": "新しい",
        "confidence": "medium",
        "matchedVia": [
            "recent"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "зураг",
        "japanese": "絵",
        "confidence": "medium",
        "matchedVia": [
            "picture"
        ],
        "mark": "good"
    },
    {
        "mongolian": "итгэх",
        "japanese": "信じる",
        "confidence": "medium",
        "matchedVia": [
            "to believe"
        ],
        "mark": "good"
    },
    {
        "mongolian": "залгах",
        "japanese": "引き継ぐ",
        "confidence": "medium",
        "matchedVia": [
            "to continue"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хуруувч",
        "japanese": "猫額大",
        "confidence": "medium",
        "matchedVia": [
            "tiny"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "цухал",
        "japanese": "窮屈",
        "confidence": "medium",
        "matchedVia": [
            "narrow"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "дайвар үг",
        "japanese": "副詞",
        "confidence": "medium",
        "matchedVia": [
            "adverb"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сөгдөх",
        "japanese": "膝を折る",
        "confidence": "medium",
        "matchedVia": [
            "to kneel"
        ],
        "mark": "good"
    },
    {
        "mongolian": "салхи",
        "japanese": "おなら",
        "confidence": "medium",
        "matchedVia": [
            "wind"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эс",
        "japanese": "細胞生物学",
        "confidence": "medium",
        "matchedVia": [
            "cell biology"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сайн яваарай",
        "japanese": "良い旅を",
        "confidence": "low",
        "matchedVia": [
            "bon voyage"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бичих",
        "japanese": "執筆",
        "confidence": "medium",
        "matchedVia": [
            "writing"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гуйлгачин",
        "japanese": "乞食",
        "confidence": "medium",
        "matchedVia": [
            "beggar"
        ],
        "mark": "good"
    },
    {
        "mongolian": "довжоо",
        "japanese": "営団",
        "confidence": "medium",
        "matchedVia": [
            "foundation"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "довтлох",
        "japanese": "込める",
        "confidence": "medium",
        "matchedVia": [
            "to charge"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "файл",
        "japanese": "列",
        "confidence": "medium",
        "matchedVia": [
            "file"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хүндлэх",
        "japanese": "思いやり",
        "confidence": "medium",
        "matchedVia": [
            "regard"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хулчгар",
        "japanese": "臆病",
        "confidence": "medium",
        "matchedVia": [
            "cowardly"
        ],
        "mark": "good"
    },
    {
        "mongolian": "агзайх",
        "japanese": "震える",
        "confidence": "medium",
        "matchedVia": [
            "to shiver"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хойтон",
        "japanese": "来年",
        "confidence": "medium",
        "matchedVia": [
            "next year"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сонсох",
        "japanese": "承る",
        "confidence": "medium",
        "matchedVia": [
            "to hear"
        ],
        "mark": "good"
    },
    {
        "mongolian": "адуу",
        "japanese": "馬",
        "confidence": "medium",
        "matchedVia": [
            "horse"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тээрэм",
        "japanese": "工場",
        "confidence": "medium",
        "matchedVia": [
            "mill"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "яргачин",
        "japanese": "肉屋",
        "confidence": "medium",
        "matchedVia": [
            "butcher"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дарах",
        "japanese": "押さえる",
        "confidence": "medium",
        "matchedVia": [
            "to repress"
        ],
        "mark": "good"
    },
    {
        "mongolian": "пүрэв",
        "japanese": "木曜",
        "confidence": "medium",
        "matchedVia": [
            "thursday"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өндөрийн харайлт",
        "japanese": "高跳び",
        "confidence": "medium",
        "matchedVia": [
            "high jump"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үндэсний",
        "japanese": "国民",
        "confidence": "medium",
        "matchedVia": [
            "national"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөнжил",
        "japanese": "毛布",
        "confidence": "medium",
        "matchedVia": [
            "blanket"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бясалгах",
        "japanese": "凝らす",
        "confidence": "low",
        "matchedVia": [
            "to meditate"
        ],
        "mark": "good"
    },
    {
        "mongolian": "төв",
        "japanese": "中枢",
        "confidence": "medium",
        "matchedVia": [
            "nucleus",
            "pivot"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зориуд",
        "japanese": "敢えて",
        "confidence": "medium",
        "matchedVia": [
            "intentionally"
        ],
        "mark": "good"
    },
    {
        "mongolian": "босох",
        "japanese": "起き上がる",
        "confidence": "medium",
        "matchedVia": [
            "to stand up",
            "to rise"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тээрэмчин",
        "japanese": "粉屋",
        "confidence": "medium",
        "matchedVia": [
            "miller"
        ],
        "mark": "good"
    },
    {
        "mongolian": "байлдаан",
        "japanese": "一戦",
        "confidence": "medium",
        "matchedVia": [
            "battle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бараг",
        "japanese": "大体",
        "confidence": "medium",
        "matchedVia": [
            "almost"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "сэлэм",
        "japanese": "刀剣",
        "confidence": "medium",
        "matchedVia": [
            "sword"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цана",
        "japanese": "スキーの板",
        "confidence": "medium",
        "matchedVia": [
            "ski"
        ],
        "mark": "good"
    },
    {
        "mongolian": "байн байн",
        "japanese": "頻りに",
        "confidence": "medium",
        "matchedVia": [
            "often"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "оноо",
        "japanese": "敵",
        "confidence": "medium",
        "matchedVia": [
            "opponent"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "өөр",
        "japanese": "自己",
        "confidence": "low",
        "matchedVia": [
            "self"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "ойлголт",
        "japanese": "観点",
        "confidence": "medium",
        "matchedVia": [
            "point of view"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "уучлах",
        "japanese": "差し許す",
        "confidence": "medium",
        "matchedVia": [
            "to forgive"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нэгдэх",
        "japanese": "合う",
        "confidence": "medium",
        "matchedVia": [
            "to unite"
        ],
        "mark": "good"
    },
    {
        "mongolian": "булаах",
        "japanese": "捕まえる",
        "confidence": "medium",
        "matchedVia": [
            "to seize"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "гурав",
        "japanese": "三つ",
        "confidence": "low",
        "matchedVia": [
            "three"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цээжлэх",
        "japanese": "覚える",
        "confidence": "medium",
        "matchedVia": [
            "to memorize"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үгсийн аймаг",
        "japanese": "品詞",
        "confidence": "medium",
        "matchedVia": [
            "part of speech"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "шил",
        "japanese": "硝子",
        "confidence": "medium",
        "matchedVia": [
            "glass"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бага нас",
        "japanese": "幼少",
        "confidence": "medium",
        "matchedVia": [
            "childhood"
        ],
        "mark": "good"
    },
    {
        "mongolian": "жинсэн өмд",
        "japanese": "Ｇパン",
        "confidence": "medium",
        "matchedVia": [
            "jeans"
        ],
        "mark": "good"
    },
    {
        "mongolian": "жолооч",
        "japanese": "運転手",
        "confidence": "medium",
        "matchedVia": [
            "driver"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эрчлэх",
        "japanese": "回す",
        "confidence": "medium",
        "matchedVia": [
            "to twist"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ижилхэн",
        "japanese": "ので",
        "confidence": "low",
        "matchedVia": [
            "as"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хөлийн булчин",
        "japanese": "腓腹",
        "confidence": "medium",
        "matchedVia": [
            "calf muscle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эм",
        "japanese": "女らしい",
        "confidence": "medium",
        "matchedVia": [
            "feminine"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "бойжих",
        "japanese": "生い立つ",
        "confidence": "medium",
        "matchedVia": [
            "to grow",
            "to develop"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "гүн ухаан",
        "japanese": "哲学",
        "confidence": "medium",
        "matchedVia": [
            "philosophy"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дутмаг үйл үг",
        "japanese": "欠如動詞",
        "confidence": "medium",
        "matchedVia": [
            "defective verb"
        ],
        "mark": "good"
    },
    {
        "mongolian": "аравдугаар",
        "japanese": "十分の一",
        "confidence": "low",
        "matchedVia": [
            "tenth"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "мөгөөрс",
        "japanese": "軟骨",
        "confidence": "medium",
        "matchedVia": [
            "cartilage"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цэврүү",
        "japanese": "肉刺",
        "confidence": "medium",
        "matchedVia": [
            "blister"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нам гүм",
        "japanese": "静けさ",
        "confidence": "medium",
        "matchedVia": [
            "silence"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шүлэгч",
        "japanese": "詩人",
        "confidence": "medium",
        "matchedVia": [
            "poet"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хасах",
        "japanese": "引く",
        "confidence": "medium",
        "matchedVia": [
            "to subtract"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сул цалин",
        "japanese": "年金",
        "confidence": "medium",
        "matchedVia": [
            "pension"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "журамлах",
        "japanese": "正則",
        "confidence": "medium",
        "matchedVia": [
            "systematic"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гэж",
        "japanese": "諺",
        "confidence": "low",
        "matchedVia": [
            "saying"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "адил",
        "japanese": "同様",
        "confidence": "medium",
        "matchedVia": [
            "same",
            "equal",
            "similar"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эр зориг",
        "japanese": "度胸",
        "confidence": "medium",
        "matchedVia": [
            "courage"
        ],
        "mark": "good"
    },
    {
        "mongolian": "худалч",
        "japanese": "嘘つき",
        "confidence": "medium",
        "matchedVia": [
            "liar"
        ],
        "mark": "good"
    },
    {
        "mongolian": "лхагва",
        "japanese": "水曜",
        "confidence": "medium",
        "matchedVia": [
            "wednesday"
        ],
        "mark": "good"
    },
    {
        "mongolian": "енчин",
        "japanese": "遺児",
        "confidence": "medium",
        "matchedVia": [
            "orphan"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "зовлон зүдүүр",
        "japanese": "苦しみ",
        "confidence": "medium",
        "matchedVia": [
            "hardship"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "үхэл",
        "japanese": "死",
        "confidence": "medium",
        "matchedVia": [
            "death"
        ],
        "mark": "good"
    },
    {
        "mongolian": "манан",
        "japanese": "戸惑い",
        "confidence": "medium",
        "matchedVia": [
            "confusion"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "эрлийзжих",
        "japanese": "掛け合わせる",
        "confidence": "medium",
        "matchedVia": [
            "to crossbreed"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "гэдэг",
        "japanese": "と言う",
        "confidence": "low",
        "matchedVia": [
            "called"
        ],
        "mark": "good"
    },
    {
        "mongolian": "омог",
        "japanese": "激怒",
        "confidence": "medium",
        "matchedVia": [
            "rage"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шалгуур",
        "japanese": "尺度",
        "confidence": "medium",
        "matchedVia": [
            "criterion"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гүүр тавих",
        "japanese": "架かる",
        "confidence": "medium",
        "matchedVia": [
            "to bridge"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "шөл",
        "japanese": "汁物",
        "confidence": "medium",
        "matchedVia": [
            "soup"
        ],
        "mark": "good"
    },
    {
        "mongolian": "улаан үнэг",
        "japanese": "赤狐",
        "confidence": "medium",
        "matchedVia": [
            "red fox vulpes vulpes"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бичгийн цаас",
        "japanese": "便箋",
        "confidence": "medium",
        "matchedVia": [
            "writing paper"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гудамж",
        "japanese": "横丁",
        "confidence": "medium",
        "matchedVia": [
            "side street",
            "alley"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ресторан",
        "japanese": "飲食店",
        "confidence": "medium",
        "matchedVia": [
            "restaurant"
        ],
        "mark": "good"
    },
    {
        "mongolian": "чанарлаг",
        "japanese": "高級",
        "confidence": "medium",
        "matchedVia": [
            "high-quality"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "лав",
        "japanese": "蝋",
        "confidence": "medium",
        "matchedVia": [
            "wax"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хуваах",
        "japanese": "隔てる",
        "confidence": "medium",
        "matchedVia": [
            "to divide"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өдгөө",
        "japanese": "この頃",
        "confidence": "medium",
        "matchedVia": [
            "nowadays"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гулууз",
        "japanese": "麺棒",
        "confidence": "medium",
        "matchedVia": [
            "rolling pin"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "царцаа",
        "japanese": "飛蝗",
        "confidence": "medium",
        "matchedVia": [
            "grasshopper"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дамжуулагч",
        "japanese": "伝導体",
        "confidence": "medium",
        "matchedVia": [
            "transmitter",
            "conductor"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ээж",
        "japanese": "お母さん",
        "confidence": "medium",
        "matchedVia": [
            "mom"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дэвшигч",
        "japanese": "候補",
        "confidence": "medium",
        "matchedVia": [
            "candidate"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "тахийх",
        "japanese": "曲がる",
        "confidence": "medium",
        "matchedVia": [
            "to warp"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "зөвшөөрөл",
        "japanese": "許し",
        "confidence": "medium",
        "matchedVia": [
            "permission"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хулхи",
        "japanese": "耳垢",
        "confidence": "medium",
        "matchedVia": [
            "earwax"
        ],
        "mark": "good"
    },
    {
        "mongolian": "Эзэн",
        "japanese": "卿",
        "confidence": "low",
        "matchedVia": [
            "lord"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "бакалавр",
        "japanese": "学士号",
        "confidence": "medium",
        "matchedVia": [
            "bachelor's degree"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дов",
        "japanese": "丘陵",
        "confidence": "medium",
        "matchedVia": [
            "hill"
        ],
        "mark": "good"
    },
    {
        "mongolian": "од",
        "japanese": "恒星",
        "confidence": "medium",
        "matchedVia": [
            "star"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөлдөх",
        "japanese": "固める",
        "confidence": "medium",
        "matchedVia": [
            "to freeze"
        ],
        "mark": "good"
    },
    {
        "mongolian": "балт",
        "japanese": "鉞",
        "confidence": "medium",
        "matchedVia": [
            "battle axe"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "улаан",
        "japanese": "赤い",
        "confidence": "medium",
        "matchedVia": [
            "red"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дэлэн",
        "japanese": "乳房",
        "confidence": "medium",
        "matchedVia": [
            "udder"
        ],
        "mark": "good"
    },
    {
        "mongolian": "наймдугаар",
        "japanese": "第八",
        "confidence": "low",
        "matchedVia": [
            "eighth"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мөр",
        "japanese": "肩",
        "confidence": "medium",
        "matchedVia": [
            "shoulder"
        ],
        "mark": "good"
    },
    {
        "mongolian": "юу байна",
        "japanese": "えっ",
        "confidence": "low",
        "matchedVia": [
            "what's up"
        ],
        "mark": "good"
    },
    {
        "mongolian": "харуул",
        "japanese": "遠見",
        "confidence": "medium",
        "matchedVia": [
            "watchtower"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "галт",
        "japanese": "爛々",
        "confidence": "medium",
        "matchedVia": [
            "fiery"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "шоргоолж",
        "japanese": "蟻",
        "confidence": "medium",
        "matchedVia": [
            "ant"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хүйтэн",
        "japanese": "無性",
        "confidence": "medium",
        "matchedVia": [
            "asexual"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "тусгаарлагч",
        "japanese": "分離主義者",
        "confidence": "medium",
        "matchedVia": [
            "separatist"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "имрэх",
        "japanese": "繰る",
        "confidence": "medium",
        "matchedVia": [
            "to spin thread"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эмээ",
        "japanese": "お祖母さん",
        "confidence": "medium",
        "matchedVia": [
            "grandmother"
        ],
        "mark": "good"
    },
    {
        "mongolian": "анхаарлын тэмдэг",
        "japanese": "感嘆符",
        "confidence": "medium",
        "matchedVia": [
            "exclamation mark"
        ],
        "mark": "good"
    },
    {
        "mongolian": "суух",
        "japanese": "座する",
        "confidence": "medium",
        "matchedVia": [
            "to sit"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өнчин тархи",
        "japanese": "脳下垂体",
        "confidence": "medium",
        "matchedVia": [
            "pituitary gland"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өөрчлөн байгуулалт",
        "japanese": "再配置",
        "confidence": "medium",
        "matchedVia": [
            "rearrangement"
        ],
        "mark": "good"
    },
    {
        "mongolian": "анх",
        "japanese": "最初",
        "confidence": "medium",
        "matchedVia": [
            "beginning",
            "first"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мойл",
        "japanese": "蝦夷上溝桜",
        "confidence": "medium",
        "matchedVia": [
            "bird cherry prunus padus"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нураах алх",
        "japanese": "削岩機",
        "confidence": "medium",
        "matchedVia": [
            "jackhammer"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хавч",
        "japanese": "蟹",
        "confidence": "medium",
        "matchedVia": [
            "crab"
        ],
        "mark": "good"
    },
    {
        "mongolian": "галиг",
        "japanese": "音写",
        "confidence": "medium",
        "matchedVia": [
            "transcription",
            "transliteration"
        ],
        "mark": "good"
    },
    {
        "mongolian": "явган явах",
        "japanese": "歩く",
        "confidence": "medium",
        "matchedVia": [
            "to walk"
        ],
        "mark": "good"
    },
    {
        "mongolian": "чөмөг",
        "japanese": "骨髄",
        "confidence": "medium",
        "matchedVia": [
            "bone marrow"
        ],
        "mark": "good"
    },
    {
        "mongolian": "аврагч",
        "japanese": "保護者",
        "confidence": "medium",
        "matchedVia": [
            "protector"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дүпү",
        "japanese": "豆腐",
        "confidence": "medium",
        "matchedVia": [
            "tofu"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ёотон",
        "japanese": "角砂糖",
        "confidence": "medium",
        "matchedVia": [
            "sugar cube"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цэнхэр",
        "japanese": "淡青色",
        "confidence": "medium",
        "matchedVia": [
            "light blue"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бэхийн сав",
        "japanese": "墨入れ",
        "confidence": "medium",
        "matchedVia": [
            "inkpot"
        ],
        "mark": "good"
    },
    {
        "mongolian": "халдваргүйжүүлэгч",
        "japanese": "消毒剤",
        "confidence": "medium",
        "matchedVia": [
            "disinfectant"
        ],
        "mark": "good"
    },
    {
        "mongolian": "унадаг дугуй",
        "japanese": "自転車",
        "confidence": "medium",
        "matchedVia": [
            "bicycle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "чухаг",
        "japanese": "奇絶",
        "confidence": "medium",
        "matchedVia": [
            "very rare"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "арван гурав",
        "japanese": "十三",
        "confidence": "low",
        "matchedVia": [
            "thirteen"
        ],
        "mark": "good"
    },
    {
        "mongolian": "болох",
        "japanese": "となる",
        "confidence": "medium",
        "matchedVia": [
            "to become",
            "to be"
        ],
        "mark": "good"
    },
    {
        "mongolian": "баймж",
        "japanese": "叙法性",
        "confidence": "medium",
        "matchedVia": [
            "modality"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "математикч",
        "japanese": "数学者",
        "confidence": "medium",
        "matchedVia": [
            "mathematician"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тийм",
        "japanese": "や",
        "confidence": "low",
        "matchedVia": [
            "yes"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "автокран",
        "japanese": "クレーン車",
        "confidence": "medium",
        "matchedVia": [
            "mobile crane"
        ],
        "mark": "good"
    },
    {
        "mongolian": "начин",
        "japanese": "鷹",
        "confidence": "medium",
        "matchedVia": [
            "falcon"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "төлөөний нэр",
        "japanese": "代名詞",
        "confidence": "medium",
        "matchedVia": [
            "pronoun"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шийтгэх",
        "japanese": "罰する",
        "confidence": "medium",
        "matchedVia": [
            "to punish"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тоолох",
        "japanese": "数える",
        "confidence": "medium",
        "matchedVia": [
            "to count"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тагтаа",
        "japanese": "鳩",
        "confidence": "medium",
        "matchedVia": [
            "pigeon"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөлдөөгч",
        "japanese": "冷凍庫",
        "confidence": "medium",
        "matchedVia": [
            "freezer"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шүүрс",
        "japanese": "ため息",
        "confidence": "medium",
        "matchedVia": [
            "sigh"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "үхжил",
        "japanese": "壊疽",
        "confidence": "medium",
        "matchedVia": [
            "gangrene"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хулгана",
        "japanese": "鼠",
        "confidence": "medium",
        "matchedVia": [
            "mouse",
            "rat"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хуульч",
        "japanese": "弁護士",
        "confidence": "medium",
        "matchedVia": [
            "lawyer"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хусах",
        "japanese": "擦る",
        "confidence": "medium",
        "matchedVia": [
            "to scrape"
        ],
        "mark": "good"
    },
    {
        "mongolian": "үтрээ",
        "japanese": "おまんこ",
        "confidence": "medium",
        "matchedVia": [
            "vagina"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хув",
        "japanese": "琥珀",
        "confidence": "medium",
        "matchedVia": [
            "amber"
        ],
        "mark": "good"
    },
    {
        "mongolian": "арван ес",
        "japanese": "十九",
        "confidence": "low",
        "matchedVia": [
            "nineteen"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шаазгай",
        "japanese": "鵲",
        "confidence": "medium",
        "matchedVia": [
            "eurasian magpie pica pica"
        ],
        "mark": "good"
    },
    {
        "mongolian": "утас",
        "japanese": "糸",
        "confidence": "medium",
        "matchedVia": [
            "thread"
        ],
        "mark": "good"
    },
    {
        "mongolian": "бурхан",
        "japanese": "神様",
        "confidence": "medium",
        "matchedVia": [
            "god"
        ],
        "mark": "good"
    },
    {
        "mongolian": "алс",
        "japanese": "距離",
        "confidence": "medium",
        "matchedVia": [
            "distance"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "их наяд",
        "japanese": "兆",
        "confidence": "low",
        "matchedVia": [
            "trillion"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мартах",
        "japanese": "忘れる",
        "confidence": "medium",
        "matchedVia": [
            "to forget"
        ],
        "mark": "good"
    },
    {
        "mongolian": "паспорт",
        "japanese": "ＩＤカード",
        "confidence": "medium",
        "matchedVia": [
            "id card"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "ням",
        "japanese": "日曜",
        "confidence": "medium",
        "matchedVia": [
            "sunday"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нойтон",
        "japanese": "湿気",
        "confidence": "medium",
        "matchedVia": [
            "dampness"
        ],
        "mark": "good"
    },
    {
        "mongolian": "худалч хүн",
        "japanese": "嘘つき",
        "confidence": "medium",
        "matchedVia": [
            "liar"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тавилга",
        "japanese": "家具",
        "confidence": "medium",
        "matchedVia": [
            "furniture"
        ],
        "mark": "good"
    },
    {
        "mongolian": "суга",
        "japanese": "脇",
        "confidence": "medium",
        "matchedVia": [
            "armpit"
        ],
        "mark": "good"
    },
    {
        "mongolian": "гинж",
        "japanese": "一連",
        "confidence": "medium",
        "matchedVia": [
            "chain"
        ],
        "mark": "good"
    },
    {
        "mongolian": "шуугиан",
        "japanese": "世間の口",
        "confidence": "medium",
        "matchedVia": [
            "rumors"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "амрах",
        "japanese": "休める",
        "confidence": "medium",
        "matchedVia": [
            "to rest"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хуцах",
        "japanese": "剥ぐ",
        "confidence": "medium",
        "matchedVia": [
            "to bark"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нөхөр",
        "japanese": "仲間",
        "confidence": "medium",
        "matchedVia": [
            "companion",
            "comrade"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "ил захидал",
        "japanese": "葉書",
        "confidence": "medium",
        "matchedVia": [
            "postcard"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "өвгөн",
        "japanese": "老夫",
        "confidence": "medium",
        "matchedVia": [
            "elderly man"
        ],
        "mark": "good"
    },
    {
        "mongolian": "агт",
        "japanese": "馬群",
        "confidence": "medium",
        "matchedVia": [
            "herd of horses"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "дугаар",
        "japanese": "数",
        "confidence": "medium",
        "matchedVia": [
            "number"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "дэргэд",
        "japanese": "脇",
        "confidence": "low",
        "matchedVia": [
            "near",
            "beside"
        ],
        "mark": "good"
    },
    {
        "mongolian": "унтах",
        "japanese": "眠る",
        "confidence": "medium",
        "matchedVia": [
            "to sleep"
        ],
        "mark": "good"
    },
    {
        "mongolian": "арслан",
        "japanese": "獅子",
        "confidence": "medium",
        "matchedVia": [
            "lion"
        ],
        "mark": "good"
    },
    {
        "mongolian": "нэгдсэн улс",
        "japanese": "亜米利加",
        "confidence": "medium",
        "matchedVia": [
            "united states"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "ооль",
        "japanese": "手斧",
        "confidence": "medium",
        "matchedVia": [
            "adze"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хоёр",
        "japanese": "二",
        "confidence": "low",
        "matchedVia": [
            "two"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мэдээлэл зүй",
        "japanese": "情報学",
        "confidence": "medium",
        "matchedVia": [
            "informatics"
        ],
        "mark": "good"
    },
    {
        "mongolian": "банди",
        "japanese": "１年生",
        "confidence": "low",
        "matchedVia": [
            "novice"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "мад хийх",
        "japanese": "詰ます",
        "confidence": "medium",
        "matchedVia": [
            "to checkmate"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "эрүү",
        "japanese": "顎",
        "confidence": "medium",
        "matchedVia": [
            "chin",
            "jaw"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ер",
        "japanese": "苟も",
        "confidence": "medium",
        "matchedVia": [
            "at all"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хатаасан",
        "japanese": "干し",
        "confidence": "low",
        "matchedVia": [
            "dried"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэтэвч",
        "japanese": "火口箱",
        "confidence": "medium",
        "matchedVia": [
            "tinderbox"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "буддизм",
        "japanese": "仏教",
        "confidence": "medium",
        "matchedVia": [
            "buddhism"
        ],
        "mark": "good"
    },
    {
        "mongolian": "элс",
        "japanese": "砂",
        "confidence": "medium",
        "matchedVia": [
            "sand"
        ],
        "mark": "good"
    },
    {
        "mongolian": "морь",
        "japanese": "馬",
        "confidence": "medium",
        "matchedVia": [
            "horse"
        ],
        "mark": "good"
    },
    {
        "mongolian": "сэвх",
        "japanese": "雀斑",
        "confidence": "medium",
        "matchedVia": [
            "freckle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "агнах",
        "japanese": "獲る",
        "confidence": "medium",
        "matchedVia": [
            "to hunt"
        ],
        "mark": "good"
    },
    {
        "mongolian": "футболк",
        "japanese": "Ｔシャツ",
        "confidence": "medium",
        "matchedVia": [
            "t-shirt"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "шүдний оо",
        "japanese": "歯磨き粉",
        "confidence": "medium",
        "matchedVia": [
            "toothpaste"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дүнчүүр",
        "japanese": "一億",
        "confidence": "low",
        "matchedVia": [
            "one hundred million"
        ],
        "mark": "good"
    },
    {
        "mongolian": "чүнчигноров",
        "japanese": "苔瑪瑙",
        "confidence": "medium",
        "matchedVia": [
            "moss agate"
        ],
        "mark": "good"
    },
    {
        "mongolian": "дарсан",
        "japanese": "有塩",
        "confidence": "medium",
        "matchedVia": [
            "salted"
        ],
        "mark": "good"
    },
    {
        "mongolian": "уушги",
        "japanese": "肺臓",
        "confidence": "medium",
        "matchedVia": [
            "lungs"
        ],
        "mark": "good"
    },
    {
        "mongolian": "эрт",
        "japanese": "早め",
        "confidence": "medium",
        "matchedVia": [
            "early"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хүйтэн дайн",
        "japanese": "冷戦",
        "confidence": "medium",
        "matchedVia": [
            "cold war"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тас",
        "japanese": "禿鷹",
        "confidence": "medium",
        "matchedVia": [
            "vulture"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хэд",
        "japanese": "何れでも",
        "confidence": "low",
        "matchedVia": [
            "any"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "өр",
        "japanese": "債",
        "confidence": "medium",
        "matchedVia": [
            "debt"
        ],
        "mark": "good"
    },
    {
        "mongolian": "өгүүлбэр",
        "japanese": "句",
        "confidence": "medium",
        "matchedVia": [
            "sentence"
        ],
        "mark": "good"
    },
    {
        "mongolian": "динозавр",
        "japanese": "恐竜",
        "confidence": "medium",
        "matchedVia": [
            "dinosaur"
        ],
        "mark": "good"
    },
    {
        "mongolian": "амьдрах",
        "japanese": "過ごす",
        "confidence": "medium",
        "matchedVia": [
            "to live"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "эрхтэн",
        "japanese": "ちんちん",
        "confidence": "medium",
        "matchedVia": [
            "penis"
        ],
        "mark": "good"
    },
    {
        "mongolian": "факс",
        "japanese": "ＦＡＸ",
        "confidence": "medium",
        "matchedVia": [
            "fax"
        ],
        "mark": "good"
    },
    {
        "mongolian": "элбэг",
        "japanese": "豊か",
        "confidence": "medium",
        "matchedVia": [
            "rich"
        ],
        "mark": "good"
    },
    {
        "mongolian": "аяга",
        "japanese": "原発不明がん",
        "confidence": "medium",
        "matchedVia": [
            "cup"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "функц",
        "japanese": "機能",
        "confidence": "medium",
        "matchedVia": [
            "function",
            "feature"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "хөхөх",
        "japanese": "含ます",
        "confidence": "medium",
        "matchedVia": [
            "to suckle"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зутан",
        "japanese": "泥々",
        "confidence": "medium",
        "matchedVia": [
            "mushy"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "зэвтэх",
        "japanese": "錆びる",
        "confidence": "medium",
        "matchedVia": [
            "to rust"
        ],
        "mark": "good"
    },
    {
        "mongolian": "он",
        "japanese": "年",
        "confidence": "medium",
        "matchedVia": [
            "year"
        ],
        "mark": "good"
    },
    {
        "mongolian": "ногоон",
        "japanese": "未熟",
        "confidence": "medium",
        "matchedVia": [
            "green"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "байгуулалт",
        "japanese": "曲",
        "confidence": "medium",
        "matchedVia": [
            "composition"
        ],
        "mark": "bad"
    },
    {
        "mongolian": "нисэх",
        "japanese": "飛ぶ",
        "confidence": "medium",
        "matchedVia": [
            "to fly"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мягмар",
        "japanese": "火曜",
        "confidence": "medium",
        "matchedVia": [
            "tuesday"
        ],
        "mark": "good"
    },
    {
        "mongolian": "адал",
        "japanese": "我が",
        "confidence": "medium",
        "matchedVia": [
            "one's own"
        ],
        "mark": "good"
    },
    {
        "mongolian": "заалдлага",
        "japanese": "訴え",
        "confidence": "medium",
        "matchedVia": [
            "lawsuit"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "очих",
        "japanese": "上がる",
        "confidence": "low",
        "matchedVia": [
            "to visit"
        ],
        "mark": "awkward"
    },
    {
        "mongolian": "хямд төсөр",
        "japanese": "安い",
        "confidence": "medium",
        "matchedVia": [
            "cheap"
        ],
        "mark": "good"
    },
    {
        "mongolian": "авлигач",
        "japanese": "汚吏",
        "confidence": "medium",
        "matchedVia": [
            "corrupt official"
        ],
        "mark": "good"
    },
    {
        "mongolian": "данс",
        "japanese": "台帳",
        "confidence": "medium",
        "matchedVia": [
            "account book"
        ],
        "mark": "good"
    },
    {
        "mongolian": "мөргөлийн хүрд",
        "japanese": "マニ車",
        "confidence": "medium",
        "matchedVia": [
            "prayer wheel"
        ],
        "mark": "good"
    },
    {
        "mongolian": "зоогийн газар",
        "japanese": "飲食店",
        "confidence": "medium",
        "matchedVia": [
            "restaurant"
        ],
        "mark": "good"
    },
    {
        "mongolian": "хөх",
        "japanese": "濃青色",
        "confidence": "medium",
        "matchedVia": [
            "dark blue"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цахилгаан соронзон",
        "japanese": "電磁気",
        "confidence": "medium",
        "matchedVia": [
            "electromagnetism"
        ],
        "mark": "good"
    },
    {
        "mongolian": "тархи",
        "japanese": "脳",
        "confidence": "medium",
        "matchedVia": [
            "brain",
            "head"
        ],
        "mark": "good"
    },
    {
        "mongolian": "доголон",
        "japanese": "ダサい",
        "confidence": "medium",
        "matchedVia": [
            "lame"
        ],
        "mark": "good"
    },
    {
        "mongolian": "цасан ширхэг",
        "japanese": "雪花",
        "confidence": "medium",
        "matchedVia": [
            "snowflake"
        ],
        "mark": "good"
    }
];
