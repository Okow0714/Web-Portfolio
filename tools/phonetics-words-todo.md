# Example words still needed

7 of the 684 kanji on the Phonetics board have no example word. Every word in
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
| 1 | 涼 | N2 | сэргээгч | きょう / けい | りょう / ろう | 京 | [jisho](https://jisho.org/search/%E6%B6%BC%20%23kanji) |
| 2 | 砂 | N2 | элс | しょう | さ / しゃ / じゃ | 少 | [jisho](https://jisho.org/search/%E7%A0%82%20%23kanji) |
| 3 | 貿 | N2 | худалдаа | りゅう / る | ぼう / む / も | 卯 | [jisho](https://jisho.org/search/%E8%B2%BF%20%23kanji) |
| 4 | 廉 | N1 | хямдхан | けん | れん | 兼 | [jisho](https://jisho.org/search/%E5%BB%89%20%23kanji) |
| 5 | 笛 | N1 | лимбэ | ゆ / ゆう / ちゅう | てき / じゃく | 由 | [jisho](https://jisho.org/search/%E7%AC%9B%20%23kanji) |
| 6 | 腸 | N1 | гэдэс | よう | ちょう / じょう | 昜 | [jisho](https://jisho.org/search/%E8%85%B8%20%23kanji) |
| 7 | 訳 | N1 | орчуулах | たく / じゃく / しゃく / せき | やく / えき | 尺 | [jisho](https://jisho.org/search/%E8%A8%B3%20%23kanji) |
