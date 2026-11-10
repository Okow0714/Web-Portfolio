---
paths:
  - "game.html"
  - "game.css"
  - "game*.js"
---

# Word Match (言葉合わせ)

<!-- Moved out of CLAUDE.md by scratchpad/split2.py so it loads only when
     one of the files above is opened. Every paragraph is the original text,
     unchanged: the move is checked by reassembly against the original, and each
     block was kept only when every identifier it names resolves to a file these
     globs match. -->

**The hue is never the resting fill.** Word Match puts white on the solid hue, which measures
**2.40:1** on the N4 gold; here each hue is mixed towards white (light) or the page ground (dark)
and the ink is solved against the *harder* of the two gradient stops -- the darker one in light,
the lighter one in dark. The mix is pushed as far as that solve allows rather than to a round
number: the first attempt used a flat 16% tint for all four and the bands were not tellable apart
on paper, which defeats the point. The cleared/picked state IS the hue, the same in both themes,
and **N3 is the one that has to be lightened 18%** -- at its own lightness no ink, dark or pale,
clears 4.5 on both stops of a gradient around it. The ink direction is per band too (N4/N3 dark,
N2/N1 pale), so `on-solid` is four values rather than one. Worst measured label: **4.77:1**.
**Word Match's `--text-muted` was solved against the wrong surface**: `#6f6554` measured 4.19:1
on six labels of the PLAY screen (stat keys, hand counter, preview hint, tour button), whose
ground is the board's straw `rgb(228,220,199)` and not the paper the token was picked against.
Solving it by hand from an assumed ground returned 4.78:1 -- a pass for a colour that fails --
so the solver now reads the composited ground off the running board. `#675e4e`, 4.69:1.

**A MASK, not an `<img>`**: the mark is gold on the daylight board and wisteria at night, and
an `<img>` paints the file's own ink. Masked, the element's `background` shows through and the
existing `light-dark()` rule does all the work. `sizeTile()` therefore sets a WIDTH, not a
font size — **0.45 of the tile** since 2026-11-02, asked for half again as big. It has the
room: the mark is taller than it is wide and `mask-size: contain` fits it to the box's
height, so a 52px box on a 116px tile carries a ~40px K and still spans only 30.5% to 69.5%
of the tile's height — inside the band where a hexagon is full width, with 32px of side
clearance. Growing it much past this starts to meet the shoulders.
**The twelve level tiles have to fit one screen** (2026-11-02). They ran **62px past the fold**
at 1400x732. Two things were wrong and both are fixed:
`.game-hud-row` held nothing but the speaker and was charged a whole row for it — 42px plus
its margin off the top of the page. It is `position: absolute` in the corner now, against
`#level-select-section`, which had to become `position: relative` to be its containing block
or the control would have positioned against the viewport and stayed put as the page scrolled.
That alone gave back 48px.
The rest is `fitField()` in `game-gate.js`. The honeycomb's height IS its width times
`totalH/100` — that is what its `aspect-ratio` says — so the only way to make a too-tall field
fit is to make it narrower. **Measured, not a `calc()`**: the chrome above it is not a
constant, since the heading is one line in English and wraps to two in Mongolian and the guest
hint only exists signed out. The field's own top is safe to measure here, unlike Grammar
Connect's row — nothing above it depends on its width, so narrowing it moves its height and
nothing else; if that ever stops being true this becomes a feedback loop. It only ever takes
width away (capped at the stylesheet's 560) and stops at a 320px floor, below which the
hexagons stop being tappable and scrolling is the better answer. A `resize` listener re-fits,
because the gate is not re-rendered on one.
Measured after: 403/453/513/560/560px wide at 640/682/732/844/950px tall, all twelve inside
the fold at every one, and the field back at its full width the moment there is room.
`scratchpad/wm-three.js` checks all of it, and **times the bonus** rather than reading the
constant — 5022ms measured — since the constant proves what the source says and only a clock
proves what the player gets.

**A tile's type is a fraction of the tile, never a rem** (2026-09-17, carried through the
2026-10-21 rebuild). A hex tile is only full width across the middle half of its height, so
whether text fits is a question about fractions of the tile, and a rem size cannot answer it.
Both of the old clamps had come loose in opposite directions: past a 148px tile `--hex-w`
stopped growing while `100cqw` did not, so desktop type sat at its rem cap; and on a 390px phone
the *floor* held a headword at 16px inside a 49px tile — text several times wider than the
hexagon around it, which `white-space: nowrap` hid behind an ellipsis. That was the reported
"long words are cut off". `sizeTile()` in `game-memory.js` now sets every label from the tile's
own width — the board's width times the tile's width in percent — so the arithmetic is
scale-invariant and one answer per word is right at every viewport, with no resize handler
measuring live DOM. A tile carries its own `cw` (its width as a percentage of the board) because
the bonus round's tiles are a different size from the main field's, and a single constant would
undersize one of the two.

**Two tiles can read the same thing, and either one matches** (2026-09-17, re-implemented for
the memory board). A hand can hold two words that mean exactly the same thing — 辞書 and 字引 are
both "толь бичиг", 飛行場 and 空港 both "нисэх буудал" — so a player picking "the wrong one" has
not made a mistake; the two tiles are identical on screen. `sameAnswer`/`relinkSameAnswer`
(`game-memory.js`) accept the crossed pick: the two pairs trade meaning tiles, so the two chosen
become a real pair and the two left over are paired with each other. It is done by trading
rather than by clearing one tile of each pair because the bonus round, the hand counter and the
deal all assume a pair owns exactly two tiles — a half-matched pair would have to be taught to
all three. **The sharper fix comes first**: where the twins are not really the same word, the
gloss should say which is which, and 43 identical-gloss groups became 13 that way. 赤 and 赤い
are "улаан өнгө" and "улаан өнгөтэй"; 支給 is an allowance and 支払 a payment, which their own
`meanings` arrays already said and only the tile did not; the last four came from the user's own
Mongolian (午前 "үдээс өмнө", 信用 "итгэл" — it had said найдвар, which is 希望 — 有る/居る "байх
(эд зүйл)" against "байх (амьд)", 広さ "талбайн хэмжээ"). Sharpening one gloss has to respect the
rest of the set: 食物 moved to "foodstuff" and collided with 食品 two tiles away, so any such edit
re-checks against the previous build that no set gained a clash it did not have.

**Word Match is a memory game** (rebuilt 2026-10-21). Twelve hexagonal cards, six pairs, dealt
face up until the player presses Start and then turned over. The score is **clicks**, and a
level's perfect score is derived (`MAIN_PAIRS * HANDS_PER_LEVEL * 2`), never written down. There
is no clock in the main round; the only clock in the game is the bonus.
**A level is four hands, not one board.** A level's entry in `game-words.js` holds 25 words, and
50 face-down tiles is a punishment rather than a memory test — so a level deals 24 of them as
four consecutive hands of 6 pairs. The deck is shuffled once per level and sliced, so no word can
appear in two hands of the same playthrough. Clearing a hand opens a **five-second bonus** (2026-11-02,
was four): four
of the pairs just cleared, face up, in two interlocking zig-zag columns, Japanese down one and
the meanings down the other, each column shuffled on its own and reshuffled until no row holds a
word beside its own translation. It reuses the hand's words rather than new ones because four
hands already spend 24 of the level's 25 — and a recall sprint over what was just learned is the
better round anyway. Bonus tiles rock, glow, radiate a gold halo of their own hexagon and throw
sparks, because the round has to read as a reward and not as stage two.
**The gate is five hexagonal JLPT nodes** (`game-gate.js`), like Phonetics Family's dial but
hexagons, because this game is played on hexagons: the chosen node flies to the centre and bursts
into that tier's twelve levels, laid out in the board's own 3/4/3/2 silhouette. `honeycomb()`
there and `memLayout()` in `game-memory.js` are the same function, which is the point — the level
select is a picture of the board it opens.
**`vStep` is `0.75 * h`, not 0.76.** For a hexagon with vertices top and bottom and shoulders at
25%/75% of its height, rows interlock only when they step down exactly three quarters of it —
then `hypot(w/2, 0.75h)` is exactly `w`, so all six of a tile's neighbours are equidistant.
Measured at 0.76: horizontal neighbours 124.44px apart, diagonal ones ~125.7px, and the field
read as unevenly spaced. `honeycomb()` and `memLayout()` have to agree on this, and so does the
bonus zig-zag.
**`game_progress` was not migrated and did not need to be**: `best_moves` now holds clicks and
`best_time_seconds` a stopwatch rather than a countdown. Both still mean "lower is better",
which is all the dashboard and the score SQL ever assumed.
**The four hands are a difficulty ramp, not four of the same board** (`VISIBLE_MEANINGS_BY_HAND`
= `[6, 4, 2, 0]`). The Japanese side always turns over; how many MEANING tiles stay face up is
what changes, so the first hand is a find-the-word puzzle and the fourth is memory outright. A
level therefore teaches its 24 words four times over with less help each time, which is the
reason for dealing it as four hands at all. A meaning left showing is still a playable tile —
it has to be, or a pair containing one could never be completed — so it carries `revealed` and
`onTile()` lets it past the "already looking at it" guard that face-up tiles otherwise hit; a
miss must also not turn it back over.
**A finished mode marks the level on the gate**: Perfectionist repaints the node in a gold
gradient, Time Attack sets sparks going inside it, and they stack. Those sparks are **children**
of the node, the opposite of the bonus board's: a hexnode is clipped to its own hexagon so a
child is clipped with it, which is exactly what an *inner* sparkle needs, while the bonus tile
wanted sparks spilling past its edge and had to use siblings.
**The marks live in `localStorage` and, where migration 011 has been applied, in two new
`game_progress` columns.** `supabase-migration-011-game-modes.sql` adds `time_attack` and
`perfectionist`; until it is run, the first save attempt drops those two keys and retries, then
stops trying for the session. That dance is not optional: **an upsert naming a column PostgREST
does not know fails the whole row**, so without it a cosmetic badge would take every player's
progress down with it. A mark is only ever written `true` — a later plain run never removes one.
**`DEMO_MARKS_ON_LEVEL` in `game-gate.js` fakes both marks on N5-1** so the two treatments can
be seen without playing a level under each mode. It is a demo, not a feature: delete the
constant and the two lines reading it (grep `DEMO_MARKS`) to stop it.

**A separate file, not a reuse of `CardSfx`.** Word Match's five scripts share one global scope
and a load order that breaks if a name is declared twice; reaching into it from two other pages
to borrow ~25 lines of buffer-and-envelope would risk the game's startup for nothing a listener
can hear. The shaping genuinely differs too — a card snap and a pencil scrape want opposite
filters.
