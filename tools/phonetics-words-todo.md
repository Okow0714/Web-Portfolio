# Example words still needed

136 of the 684 kanji on the Phonetics board have no example word. Every word in
`phonetics-quiz-data.js` is derived from data already in this repo, and the repo has run out of
vocabulary for these: most of them appear in no word in any file here.

**What each row needs:** one word that contains the kanji and reads it as the sound in the
"needs" column, plus that word's reading in hiragana and a Mongolian translation. A two-kanji
compound is ideal. The Japanese is quick to look up; the Mongolian is the part no file here has.

**Where to look:** the jisho.org link opens that kanji's page, which lists its readings and, under
each one, the compounds that use it. Pick one from the row for the reading you need.

**Where to put it:** `tools/phonetics-words-manual.json`, which has a blank row waiting for each
of these. Fill in `w` (the word), `r` (its reading in hiragana) and `mn` (the Mongolian). Rows
left blank are ignored, so it can be done a handful at a time. Then run
`node tools/build-phonetics-quiz.js` and the board picks them up.

A row is checked the same way every other word is: the reading has to show the kanji's sound
*where the kanji sits*, so 甲虫 does not count as 虫 reading こう. A row that fails that check
fails the build rather than reaching the page.

| # | kanji | JLPT | meaning | needs | its readings | shape | look up |
|---|---|---|---|---|---|---|---|
| 1 | 立 | N5 | босох | りゅう | りつ / りゅう | 立 | [jisho](https://jisho.org/search/%E7%AB%8B%20%23kanji) |
| 2 | 暑 | N4 | халуун чийглэг | しょ / しゃ / と / つ / ちょ / じょ | しょ | 者 | [jisho](https://jisho.org/search/%E6%9A%91%20%23kanji) |
| 3 | 町 | N4 | тосгон | ちょう / てい | ちょう / てい | 丁 | [jisho](https://jisho.org/search/%E7%94%BA%20%23kanji) |
| 4 | 説 | N4 | цуу яриа | えつ / えち / ぜい / せい | せつ / せち / ぜい / せい / えつ / えち | 兑 | [jisho](https://jisho.org/search/%E8%AA%AC%20%23kanji) |
| 5 | 仲 | N3 | зуучлагч | ちゅう / じゅう | ちゅう / じゅう | 中 | [jisho](https://jisho.org/search/%E4%BB%B2%20%23kanji) |
| 6 | 側 | N3 | тал | そく / しき | そく / しき | 則 | [jisho](https://jisho.org/search/%E5%81%B4%20%23kanji) |
| 7 | 僅 | N3 | өчүүхэн | きん / ごん | きん / ごん | 𦰌 | [jisho](https://jisho.org/search/%E5%83%85%20%23kanji) |
| 8 | 喉 | N3 | хоолой | こう / ぐ | こう / ぐ | 侯 | [jisho](https://jisho.org/search/%E5%96%89%20%23kanji) |
| 9 | 坂 | N3 | налуу | はん / ほん / ばん / へん / べん | はん / ほん / ばん / べん | 反 | [jisho](https://jisho.org/search/%E5%9D%82%20%23kanji) |
| 10 | 昔 | N3 | эрт урьд цагт | せき / しゃく | せき / しゃく | 昔 | [jisho](https://jisho.org/search/%E6%98%94%20%23kanji) |
| 11 | 柱 | N3 | багана | ちゅう | ちゅう / じゅう | 主 | [jisho](https://jisho.org/search/%E6%9F%B1%20%23kanji) |
| 12 | 浅 | N3 | гүехэн | せん / ぜん | せん | 㦮 | [jisho](https://jisho.org/search/%E6%B5%85%20%23kanji) |
| 13 | 編 | N3 | эмхэтгэл | へん | へん | 扁 | [jisho](https://jisho.org/search/%E7%B7%A8%20%23kanji) |
| 14 | 諦 | N3 | орхих | てい / たい | てい / たい | 帝 | [jisho](https://jisho.org/search/%E8%AB%A6%20%23kanji) |
| 15 | 鍵 | N3 | түлхүүр | けん / ごん | けん / ごん / げん | 建 | [jisho](https://jisho.org/search/%E9%8D%B5%20%23kanji) |
| 16 | 伸 | N2 | тэлэх | しん | しん | 申 | [jisho](https://jisho.org/search/%E4%BC%B8%20%23kanji) |
| 17 | 伺 | N2 | хүндэтгэл үзүүлэх | し / じ | し | 司 | [jisho](https://jisho.org/search/%E4%BC%BA%20%23kanji) |
| 18 | 城 | N2 | цайз | せい / じょう | じょう / せい | 成 | [jisho](https://jisho.org/search/%E5%9F%8E%20%23kanji) |
| 19 | 塗 | N2 | будах | じょ / と / ず / ど / しょ | と / ず / ど | 余 | [jisho](https://jisho.org/search/%E5%A1%97%20%23kanji) |
| 20 | 壁 | N2 | хана | へき / ひゃく | へき / ひゃく | 辟 | [jisho](https://jisho.org/search/%E5%A3%81%20%23kanji) |
| 21 | 幅 | N2 | өлгөгдсөн зураг | ふく | ふく | 畐 | [jisho](https://jisho.org/search/%E5%B9%85%20%23kanji) |
| 22 | 干 | N2 | хатаах | かん | かん | 干 | [jisho](https://jisho.org/search/%E5%B9%B2%20%23kanji) |
| 23 | 彼 | N2 | тэр | ひ / び / は | ひ | 皮 | [jisho](https://jisho.org/search/%E5%BD%BC%20%23kanji) |
| 24 | 憎 | N2 | үзэн ядах | そう / ぞう | ぞう / そう | 曽 | [jisho](https://jisho.org/search/%E6%86%8E%20%23kanji) |
| 25 | 挟 | N2 | хавчуулсан | きょう / ぎょう / こう | きょう / ぎょう | 夹 | [jisho](https://jisho.org/search/%E6%8C%9F%20%23kanji) |
| 26 | 暮 | N2 | амьжиргаа | ぼ / も / まく / ばく | ぼ / も / む | 莫 | [jisho](https://jisho.org/search/%E6%9A%AE%20%23kanji) |
| 27 | 机 | N2 | ширээ | き | き | 几 | [jisho](https://jisho.org/search/%E6%9C%BA%20%23kanji) |
| 28 | 枝 | N2 | мөчир | し / き / ぎ | し / き / ぎ | 支 | [jisho](https://jisho.org/search/%E6%9E%9D%20%23kanji) |
| 29 | 枯 | N2 | хатах | こ / く | こ / く | 古 | [jisho](https://jisho.org/search/%E6%9E%AF%20%23kanji) |
| 30 | 汗 | N2 | хөлс | かん | かん / がん | 干 | [jisho](https://jisho.org/search/%E6%B1%97%20%23kanji) |
| 31 | 涼 | N2 | сэргээгч | きょう / けい | りょう / ろう | 京 | [jisho](https://jisho.org/search/%E6%B6%BC%20%23kanji) |
| 32 | 狙 | N2 | чиглэх | そ / す / しょ | そ / しょ | 且 | [jisho](https://jisho.org/search/%E7%8B%99%20%23kanji) |
| 33 | 猫 | N2 | муур | びょう / みょう | びょう / ぼう / みょう | 苗 | [jisho](https://jisho.org/search/%E7%8C%AB%20%23kanji) |
| 34 | 皆 | N2 | бүгд | かい / け | かい / け | 皆 | [jisho](https://jisho.org/search/%E7%9A%86%20%23kanji) |
| 35 | 砂 | N2 | элс | しょう | さ / しゃ / じゃ | 少 | [jisho](https://jisho.org/search/%E7%A0%82%20%23kanji) |
| 36 | 粒 | N2 | ширхэг | りゅう | りゅう | 立 | [jisho](https://jisho.org/search/%E7%B2%92%20%23kanji) |
| 37 | 薄 | N2 | шингэлэх | はく / ばく | はく / ばく | 尃 | [jisho](https://jisho.org/search/%E8%96%84%20%23kanji) |
| 38 | 袋 | N2 | уут | たい / だい | たい / だい | 代 | [jisho](https://jisho.org/search/%E8%A2%8B%20%23kanji) |
| 39 | 貿 | N2 | худалдаа | りゅう / る | ぼう / む / も | 卯 | [jisho](https://jisho.org/search/%E8%B2%BF%20%23kanji) |
| 40 | 隅 | N2 | булан | ぐう / ぐ | ぐう / ぐ | 禺 | [jisho](https://jisho.org/search/%E9%9A%85%20%23kanji) |
| 41 | 靴 | N2 | гутал | か / け | か / け | 化 | [jisho](https://jisho.org/search/%E9%9D%B4%20%23kanji) |
| 42 | 餅 | N2 | мочи | へい / ひょう | へい / ひょう | 并 | [jisho](https://jisho.org/search/%E9%A4%85%20%23kanji) |
| 43 | 丙 | N1 | гуравдугаар зэрэг | へい / ひょう | へい / ひょう | 丙 | [jisho](https://jisho.org/search/%E4%B8%99%20%23kanji) |
| 44 | 伯 | N1 | тэргүүн | はく / ひゃく / びゃく | はく / ひゃく / は / へ | 白 | [jisho](https://jisho.org/search/%E4%BC%AF%20%23kanji) |
| 45 | 侍 | N1 | үйлчлэгч | じ / し | じ / し | 寺 | [jisho](https://jisho.org/search/%E4%BE%8D%20%23kanji) |
| 46 | 侯 | N1 | маркиз | こう / ぐ | こう / ぐ | 侯 | [jisho](https://jisho.org/search/%E4%BE%AF%20%23kanji) |
| 47 | 劾 | N1 | зэмлэх | がい / かい | がい / かい | 亥 | [jisho](https://jisho.org/search/%E5%8A%BE%20%23kanji) |
| 48 | 咽 | N1 | дуу хоолой | いん | いん / えん / えつ / えち | 因 | [jisho](https://jisho.org/search/%E5%92%BD%20%23kanji) |
| 49 | 唇 | N1 | уруул | しん | しん / じゅん / しゅん | 辰 | [jisho](https://jisho.org/search/%E5%94%87%20%23kanji) |
| 50 | 嗣 | N1 | өв залгамжлагч | し / じ | し / じ | 司 | [jisho](https://jisho.org/search/%E5%97%A3%20%23kanji) |
| 51 | 坑 | N1 | нүх | こう / ごう | こう / きょう | 亢 | [jisho](https://jisho.org/search/%E5%9D%91%20%23kanji) |
| 52 | 妨 | N1 | саад учруулах | ほう / ぼう | ぼう / ほう | 方 | [jisho](https://jisho.org/search/%E5%A6%A8%20%23kanji) |
| 53 | 嫁 | N1 | хадам гэрт очих | か / け | か / け | 家 | [jisho](https://jisho.org/search/%E5%AB%81%20%23kanji) |
| 54 | 宵 | N1 | бүрий цаг | しょう | しょう | 肖 | [jisho](https://jisho.org/search/%E5%AE%B5%20%23kanji) |
| 55 | 岡 | N1 | толгод | こう | こう | 岡 | [jisho](https://jisho.org/search/%E5%B2%A1%20%23kanji) |
| 56 | 峰 | N1 | оргил | ほう / ふ / ぶ | ほう / ふ / ぶ | 夆 | [jisho](https://jisho.org/search/%E5%B3%B0%20%23kanji) |
| 57 | 崖 | N1 | хад цохио | がい / げ | がい / げ | 圭 | [jisho](https://jisho.org/search/%E5%B4%96%20%23kanji) |
| 58 | 帆 | N1 | дарвуул | はん / ぼん | はん / ぼん | 凡 | [jisho](https://jisho.org/search/%E5%B8%86%20%23kanji) |
| 59 | 幾 | N1 | хэдэн | き / け | き / け | 幾 | [jisho](https://jisho.org/search/%E5%B9%BE%20%23kanji) |
| 60 | 廉 | N1 | хямдхан | けん | れん | 兼 | [jisho](https://jisho.org/search/%E5%BB%89%20%23kanji) |
| 61 | 弐 | N1 | хоёр | に / じ | に / じ | 二 | [jisho](https://jisho.org/search/%E5%BC%90%20%23kanji) |
| 62 | 彰 | N1 | ил тод | しょう | しょう | 章 | [jisho](https://jisho.org/search/%E5%BD%B0%20%23kanji) |
| 63 | 忌 | N1 | гашуудал | き / こ | き / ご | 己 | [jisho](https://jisho.org/search/%E5%BF%8C%20%23kanji) |
| 64 | 恣 | N1 | дур зоргоороо | し | し | 次 | [jisho](https://jisho.org/search/%E6%81%A3%20%23kanji) |
| 65 | 恨 | N1 | харамсах | こん / ごん | こん / ごん | 艮 | [jisho](https://jisho.org/search/%E6%81%A8%20%23kanji) |
| 66 | 悟 | N1 | гэгээрэл | ご | ご / ぐ | 五 | [jisho](https://jisho.org/search/%E6%82%9F%20%23kanji) |
| 67 | 惜 | N1 | өрөвдөх | せき / しゃく | せき / しゃく | 昔 | [jisho](https://jisho.org/search/%E6%83%9C%20%23kanji) |
| 68 | 慕 | N1 | санаж зовох | ぼ / も / まく / ばく | ぼ / も | 莫 | [jisho](https://jisho.org/search/%E6%85%95%20%23kanji) |
| 69 | 憬 | N1 | хүсэл | きょう / けい | けい / きょう | 京 | [jisho](https://jisho.org/search/%E6%86%AC%20%23kanji) |
| 70 | 扉 | N1 | гол хаалга | ひ / はい / べ | ひ | 非 | [jisho](https://jisho.org/search/%E6%89%89%20%23kanji) |
| 71 | 拳 | N1 | нүдэн атга | けん | けん / げん | 龹 | [jisho](https://jisho.org/search/%E6%8B%B3%20%23kanji) |
| 72 | 描 | N1 | зурах | びょう / みょう | びょう / みょう | 苗 | [jisho](https://jisho.org/search/%E6%8F%8F%20%23kanji) |
| 73 | 旨 | N1 | амттай | し / けい | し | 旨 | [jisho](https://jisho.org/search/%E6%97%A8%20%23kanji) |
| 74 | 曽 | N1 | урьд нь | そう / ぞう | ぞ / ぞう / そ / そう | 曽 | [jisho](https://jisho.org/search/%E6%9B%BD%20%23kanji) |
| 75 | 柄 | N1 | хээ | へい / ひょう | へい / ひょう | 丙 | [jisho](https://jisho.org/search/%E6%9F%84%20%23kanji) |
| 76 | 柳 | N1 | бургас | りゅう / る | りゅう / る | 卯 | [jisho](https://jisho.org/search/%E6%9F%B3%20%23kanji) |
| 77 | 桃 | N1 | шаргал алимны мод | ちょう / とう / どう / じょう | とう / どう | 兆 | [jisho](https://jisho.org/search/%E6%A1%83%20%23kanji) |
| 78 | 梗 | N1 | сүрэлт | こう / きょう | こう / きょう | 更 | [jisho](https://jisho.org/search/%E6%A2%97%20%23kanji) |
| 79 | 楷 | N1 | дөрвөлжин хэв | かい / け | かい / け | 皆 | [jisho](https://jisho.org/search/%E6%A5%B7%20%23kanji) |
| 80 | 殴 | N1 | зодох | おう / う / く | おう / う | 区 | [jisho](https://jisho.org/search/%E6%AE%B4%20%23kanji) |
| 81 | 江 | N1 | горхи | こう / く | こう | 工 | [jisho](https://jisho.org/search/%E6%B1%9F%20%23kanji) |
| 82 | 沖 | N1 | задгай тэнгис | ちゅう / じゅう | ちゅう / じゅう | 中 | [jisho](https://jisho.org/search/%E6%B2%96%20%23kanji) |
| 83 | 沼 | N1 | намаг | しょう | しょう | 召 | [jisho](https://jisho.org/search/%E6%B2%BC%20%23kanji) |
| 84 | 泡 | N1 | хөөс | ほう / ひょう | ほう / ひょう | 包 | [jisho](https://jisho.org/search/%E6%B3%A1%20%23kanji) |
| 85 | 浸 | N1 | норсон | しん | しん | 𠬶 | [jisho](https://jisho.org/search/%E6%B5%B8%20%23kanji) |
| 86 | 渦 | N1 | хуй салхи | か / わ | か / わ | 咼 | [jisho](https://jisho.org/search/%E6%B8%A6%20%23kanji) |
| 87 | 溝 | N1 | шүүр | こう / く | こう / く | 冓 | [jisho](https://jisho.org/search/%E6%BA%9D%20%23kanji) |
| 88 | 牙 | N1 | соёо | が / げ | が / げ | 牙 | [jisho](https://jisho.org/search/%E7%89%99%20%23kanji) |
| 89 | 猿 | N1 | сармагчин | えん / おん | えん / おん | 袁 | [jisho](https://jisho.org/search/%E7%8C%BF%20%23kanji) |
| 90 | 癒 | N1 | эдгэрэлт | ゆ | ゆ | 俞 | [jisho](https://jisho.org/search/%E7%99%92%20%23kanji) |
| 91 | 眺 | N1 | ширтэх | ちょう / とう / どう / じょう | ちょう | 兆 | [jisho](https://jisho.org/search/%E7%9C%BA%20%23kanji) |
| 92 | 硝 | N1 | нитрат | しょう | しょう | 肖 | [jisho](https://jisho.org/search/%E7%A1%9D%20%23kanji) |
| 93 | 租 | N1 | гаалийн татвар | そ / す / しょ | そ / す | 且 | [jisho](https://jisho.org/search/%E7%A7%9F%20%23kanji) |
| 94 | 窯 | N1 | зуух | よう / しょう / せん / ぞう | よう | 羊 | [jisho](https://jisho.org/search/%E7%AA%AF%20%23kanji) |
| 95 | 笛 | N1 | лимбэ | ゆ / ゆう / ちゅう | てき / じゃく | 由 | [jisho](https://jisho.org/search/%E7%AC%9B%20%23kanji) |
| 96 | 紡 | N1 | ээрэх | ほう / ぼう | ぼう / ほう | 方 | [jisho](https://jisho.org/search/%E7%B4%A1%20%23kanji) |
| 97 | 綱 | N1 | зузаан татлага | こう | こう | 岡 | [jisho](https://jisho.org/search/%E7%B6%B1%20%23kanji) |
| 98 | 締 | N1 | чангалах | てい / たい | てい / だい | 帝 | [jisho](https://jisho.org/search/%E7%B7%A0%20%23kanji) |
| 99 | 縫 | N1 | оёх | ほう / ふ / ぶ | ほう / ぶ | 夆 | [jisho](https://jisho.org/search/%E7%B8%AB%20%23kanji) |
| 100 | 肝 | N1 | элэг | かん | かん | 干 | [jisho](https://jisho.org/search/%E8%82%9D%20%23kanji) |
| 101 | 胴 | N1 | их бие | ずう / とう / どう | どう / とう / ずう | 同 | [jisho](https://jisho.org/search/%E8%83%B4%20%23kanji) |
| 102 | 腸 | N1 | гэдэс | よう | ちょう / じょう | 昜 | [jisho](https://jisho.org/search/%E8%85%B8%20%23kanji) |
| 103 | 舷 | N1 | хөлгийн ирмэг | げん / けん | げん / けん | 玄 | [jisho](https://jisho.org/search/%E8%88%B7%20%23kanji) |
| 104 | 芳 | N1 | үнэр | ほう / ぼう | ほう | 方 | [jisho](https://jisho.org/search/%E8%8A%B3%20%23kanji) |
| 105 | 苛 | N1 | дээрэлхэх | か / が | か / が | 可 | [jisho](https://jisho.org/search/%E8%8B%9B%20%23kanji) |
| 106 | 茎 | N1 | иш | けい / きょう / きん | けい / こう / ぎょう | 圣 | [jisho](https://jisho.org/search/%E8%8C%8E%20%23kanji) |
| 107 | 葛 | N1 | кудзу | かつ / かち | かつ / かち | 曷 | [jisho](https://jisho.org/search/%E8%91%9B%20%23kanji) |
| 108 | 薪 | N1 | түлш | しん | しん | 亲 | [jisho](https://jisho.org/search/%E8%96%AA%20%23kanji) |
| 109 | 藍 | N1 | индиго | かん / らん / けん | らん | 監 | [jisho](https://jisho.org/search/%E8%97%8D%20%23kanji) |
| 110 | 蜂 | N1 | зөгий | ほう / ふ / ぶ | ほう / ふ / ふう | 夆 | [jisho](https://jisho.org/search/%E8%9C%82%20%23kanji) |
| 111 | 訳 | N1 | орчуулах | たく / じゃく / しゃく / せき | やく / えき | 尺 | [jisho](https://jisho.org/search/%E8%A8%B3%20%23kanji) |
| 112 | 詔 | N1 | эзэн хааны зарлиг | しょう | しょう | 召 | [jisho](https://jisho.org/search/%E8%A9%94%20%23kanji) |
| 113 | 詠 | N1 | уншлага | えい / よう | えい / よう | 永 | [jisho](https://jisho.org/search/%E8%A9%A0%20%23kanji) |
| 114 | 詣 | N1 | сүмд зочлох | し / けい | けい / げ / げい | 旨 | [jisho](https://jisho.org/search/%E8%A9%A3%20%23kanji) |
| 115 | 詳 | N1 | дэлгэрэнгүй | よう / しょう / せん / ぞう | しょう / ぞう | 羊 | [jisho](https://jisho.org/search/%E8%A9%B3%20%23kanji) |
| 116 | 諧 | N1 | хошин шог | かい / け | かい / げ | 皆 | [jisho](https://jisho.org/search/%E8%AB%A7%20%23kanji) |
| 117 | 謄 | N1 | хуулбарлах машин | とう / どう | とう / どう | 朕 | [jisho](https://jisho.org/search/%E8%AC%84%20%23kanji) |
| 118 | 謹 | N1 | болгоомжтой | きん / ごん | きん / こん | 𦰌 | [jisho](https://jisho.org/search/%E8%AC%B9%20%23kanji) |
| 119 | 譲 | N1 | хойшлуулах | じょう / にょう | じょう / にょう | 㐮 | [jisho](https://jisho.org/search/%E8%AD%B2%20%23kanji) |
| 120 | 賭 | N1 | мөрийтэй тоглох | しょ / しゃ / と / つ / ちょ / じょ | と / つ | 者 | [jisho](https://jisho.org/search/%E8%B3%AD%20%23kanji) |
| 121 | 遭 | N1 | таарах | そう / ぞう | そう | 曹 | [jisho](https://jisho.org/search/%E9%81%AD%20%23kanji) |
| 122 | 酢 | N1 | цуу | さく / ざく | そ / す / さく / ざく | 乍 | [jisho](https://jisho.org/search/%E9%85%A2%20%23kanji) |
| 123 | 酪 | N1 | сүүн бүтээгдэхүүн | かく / らく / きゃく | らく | 各 | [jisho](https://jisho.org/search/%E9%85%AA%20%23kanji) |
| 124 | 鈴 | N1 | жижиг хонх | れい / りょう | れい / りん / りょう | 令 | [jisho](https://jisho.org/search/%E9%88%B4%20%23kanji) |
| 125 | 鋼 | N1 | ган | こう | こう | 岡 | [jisho](https://jisho.org/search/%E9%8B%BC%20%23kanji) |
| 126 | 錬 | N1 | хатууруулах | とう / つう / れん | れん | 東 | [jisho](https://jisho.org/search/%E9%8C%AC%20%23kanji) |
| 127 | 錮 | N1 | хорих | こ / く | こ / く | 古 | [jisho](https://jisho.org/search/%E9%8C%AE%20%23kanji) |
| 128 | 阪 | N1 | өндөрлөг | はん / ほん / ばん / へん / べん | はん / ほん / ばん / べん | 反 | [jisho](https://jisho.org/search/%E9%98%AA%20%23kanji) |
| 129 | 阻 | N1 | хойргоор нь боох | そ / す / しょ | そ / しょ | 且 | [jisho](https://jisho.org/search/%E9%98%BB%20%23kanji) |
| 130 | 附 | N1 | хавсаргасан | ふ / ぶ | ふ / ぶ | 付 | [jisho](https://jisho.org/search/%E9%99%84%20%23kanji) |
| 131 | 雅 | N1 | дэгжин | が / げ | が / げ / え / あ | 牙 | [jisho](https://jisho.org/search/%E9%9B%85%20%23kanji) |
| 132 | 霜 | N1 | хяруу | そう / しょう | そう / しょう | 相 | [jisho](https://jisho.org/search/%E9%9C%9C%20%23kanji) |
| 133 | 霧 | N1 | манан | む / ぶ | む / ぶ | 矛 | [jisho](https://jisho.org/search/%E9%9C%A7%20%23kanji) |
| 134 | 飢 | N1 | өлссөн | き | き | 几 | [jisho](https://jisho.org/search/%E9%A3%A2%20%23kanji) |
| 135 | 飽 | N1 | цатгалан | ほう / ひょう | ほう / ひょう | 包 | [jisho](https://jisho.org/search/%E9%A3%BD%20%23kanji) |
| 136 | 駆 | N1 | туух | おう / う / く | く | 区 | [jisho](https://jisho.org/search/%E9%A7%86%20%23kanji) |
