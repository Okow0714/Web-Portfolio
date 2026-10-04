# Freetime "Measured" metrics

`freetime.html` shows three measured figures per JLPT level, each plotted against the other four
picks. `measure.js` is what produces them. **It is the only source of those numbers** — if the
method changes, every level has to be regenerated together, or the five dots on each track stop
being comparable, which is the whole point of them.

## Running it

Put each show's Japanese subtitles (`.srt` or `.ass`) in its own directory and pass all five in
N5→N1 order:

```
node tools/freetime-metrics/measure.js subs/shirokuma subs/nichijou subs/danshi subs/agg subs/chihaya
```

With exactly five directories it also prints the `left:%` dot positions for each track.

Subtitles come from kitsunekko.net, filed under **romanised** names — `3-gatsu no Lion`,
`Shirokuma_Cafe`, `Ghost_In_The_Shell_Stand_Alone_Complex`. Searching the Japanese title finds
nothing, which is the first thing to know when regenerating these.

## What is measured, and what is not

| Metric | Status |
|---|---|
| Kanji density | kanji ÷ (kana + kanji + Japanese punctuation) |
| Rough speech | vulgar and aggressive address per 10k characters |
| Keigo | 尊敬語 and 謙譲語 per 10k characters |
| ~~Speech rate~~ | **dropped** — see below |
| ~~Vocabulary by level~~ | **dropped** — needs morphological tokenisation |

**Speech rate was dropped because it is a property of the subtitle rip, not the show.** Netflix
subs are timed tightly to speech, fansub `.ass` files hold text on screen longer, and closed
captions carry sound annotations. Measured as characters ÷ cue duration, Shirokuma Cafe came to
3.54 ch/s against a previously published 4.85, and Danshi 4.72 against 5.49 — while Ghost in the
Shell matched to within 1.4%, because that one happened to use the same rip. A number that moves
9–14% depending on which copy you downloaded cannot sit on a shared scale.

Rough speech counts vulgarity and aggressive address only, never grammatical casualness. `じゃねえ`
and `んだよ` are how most anime characters speak normally; counting them measures register, not
roughness. Keigo likewise excludes `です/ます`, which is 丁寧語 and would outnumber real honorifics
by an order of magnitude.

## Why the table was rebuilt (2026-10-04)

The N1 pick changed from 攻殻機動隊 S.A.C. to ちはやふる. The original figures could not be extended
to a new show: the script that made them was never committed and its subtitle files were gone, so
there was no way to measure a sixth show on the same footing. Reconstructing the method got within
~2% on Ghost in the Shell and nowhere near on the others, which is how the subtitle-rip problem
above was found.

Rebuilding all five from one method sidesteps it. The absolute values differ slightly from the old
ones; they are internally comparable, which is what a comparison chart needs. One incidental sign
the rebuild is sound: kanji density now rises monotonically with level (14.0% → 17.7% → 23.3% →
23.4% → 27.1%), where the previous table had N4 below N5.

## The "speech forms to expect" list

That list is measured too, by the same standard: an entry belongs there when it is frequent in
that show **and** rare in the other four. The ten N1 entries were checked against all five picks —
`詠み手` appears 24.7 times per 10k in ちはやふる and never in the others; `お手つき` 55× more often
than anywhere else.

This matters because the previous list was ten N1 grammar patterns true of Ghost in the Shell, and
**zero of the nine countable ones survive in ちはやふる**. Carrying it over unchanged would have
made ten false claims that nothing on the site would have caught. If the pick changes again, that
list has to be re-measured, not edited.
