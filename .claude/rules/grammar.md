---
paths:
  - "grammar.html"
  - "grammar.css"
  - "grammar.js"
  - "grammar-data.js"
---

# Grammar Connect (文法つなぎ)

<!-- Moved out of CLAUDE.md by scratchpad/split2.py so it loads only when
     one of the files above is opened. Every paragraph is the original text,
     unchanged: the move is checked by reassembly against the original, and each
     block was kept only when every identifier it names resolves to a file these
     globs match. -->

**Grammar Connect is deliberately NOT changed.** Its four bands are `role="tab"` with
`aria-selected`, and a tablist has exactly one selected tab by definition -- it is a tab strip,
not a drill-down, and its whole select row is measured against the fold besides. Phonetics
already gates this way, its gate bursting into a view swap.
**The dark halves are raised in HSL LIGHTNESS, not mixed toward white.** Mixing hit 4.5 at 32-36%
white and turned the wine and the plum into dusty pinks -- the exact drain `grammar.css` records
from its own 46% wash. Solved instead for 4.5 on BOTH dark grounds (`#1e1b15` and the darker
block's `#24211a`), with every hue held within 6 degrees of its original: worst 4.64:1, minimum
pairwise dE 33.7. **The light halves are byte-identical to what shipped** and were not touched.
**Grammar Connect's level select is four bands of ten, and the band count is a measurement**
(2026-10-24). It was going to be a five-point JLPT gate until every grammar point in
`grammar-data.js` was classified against standard JLPT lists -- 226 distinct points, 500 of 521
slots; the other 21 are paraphrase fragments (`状態が続いている`), not grammar. Two findings killed it:
**banding by content is lopsided** (N5 would hold ONE level and N4 fourteen, against N3 7, N2 10,
N1 8), and **the levels are not ordered by difficulty inside a track**, so no contiguous cut means
what it claims -- advanced runs `N2 N2 N1 N2 N2 N1 N1 N3 N2 N3 ...`, level 3 harder than level 19.
Halving each track is the one cut that is both equal and climbing: foundation 1-10 (N4 57%),
11-20 (N4 46%/N2 31%), advanced 1-10 (N2 39%), 11-20 (N1 57%). Each band's label therefore says
what it is **mostly**; none claims a single JLPT level. Redo the audit with
`scratchpad/jlpt-bands.js` before changing the bands.
**Each band wears its JLPT colour**, taken from the same `--jlpt-n4..--jlpt-n1` hues Word
Match's gate uses: band 1 n4, band 2 n3, band 3 n2, band 4 n1. N5 is absent because no band is
mostly N5 (one level of the forty). `grammar.js` only adds a `gc-band-n4` class -- a custom
property name cannot be built from a variable, so `grammar.css` holds the four-rule mapping onto
one `--bt-*` set that the gate piece and the ten tiles then share.
**Nothing clipped may carry an `outline`.** An outline follows the border box; `clip-path` then
keeps only the part of it inside the silhouette, so a ring becomes a bracket -- a stray angle
floating in the triangle, which is exactly what shipped for one commit as the "picked" mark.
Every mark on these shapes is a **filter**: the lift, the open-band halo and the keyboard ring
(`--focus-halo`) are all stacked `drop-shadow()`s, which have no spread parameter, so a ring is
two or three of them at the same offset. `tests/`-adjacent `scratchpad/gc-bandcheck.js` now fails
on any clipped element with a non-zero outline, in any state.
(An earlier note here said the `:focus-visible` ring "stays `--shu-light`". It never did -- that
edit was in a script that exited before writing -- and the question is moot now that no outline
survives anywhere on these shapes.)
**The ground is a plain wash, not a photograph**, so the light ground had to drop a step
(`#d9cdb0`) for near-white tiles to sit *on* it rather than in it -- and `body:has(.grammar-main)`
must match `.gc-night-sky`'s end stop or a seam shows.
**Deleting the photographs was not the end of the night sky.** A decorative `.gc-moon` -- a 40px
cream disc with a 36px glow at `top:28px right:56px`, directly behind the volume toggle -- and a
JS-generated 40-star field survived it, and still read as a sun over the new wash. They were
DRAWN, not fetched, so checking that no photo request was made said nothing about them: that
check was reported as "the background is clean" and was not. Both are gone now.
**The record panel is a surface, not a hole.** It used `--card` (`#241f38`) against a `#12192b`
page -- nearly the same value -- so it read as a hole punched in the page and every line on it
looked sunk whatever its contrast measured. `--rec-surface` sits a clear step above the ground,
with an edge and a shadow; the stat cells share that token so only the 1px rule between them
shows (left transparent, the divider washes through as a grey slab across the strip). Its type
also went up: the stat labels were **9px** of letter-spaced uppercase Cyrillic, which no contrast
ratio rescues. **Measure alpha properly before trusting a number** -- two probes here reported
13.5:1 for text that was actually 6.6:1, because they dropped the alpha channel instead of
compositing `rgba(...)` over the card; a probe worth believing self-tests against white-on-black
(21), black-on-white (21) and 50%-white-on-black (~5.3) first.
**The in-level screen had three rules that were never themed at all** (2026-10-25), each a flat
wash with a hard-coded colour, written for the dark board and doing the opposite on the light
page. `.gc-match-side` was `rgba(0, 0, 0, 0.18)` -- a black wash, which over cream is a grey slab
carrying dark text at **3.74:1**, and that is the dark-text-on-a-dark-block this screen was
reported for. `.gc-progress-dots span` was `rgba(241, 237, 224, 0.22)`, cream on cream: **nine of
the ten dots were invisible in light** and the row read as a single red speck, so the progress
indicator did not indicate. `.gc-cleared-item`'s divider was the same wash, as were the record
panel's three non-top borders and the tour button's border -- the edge that makes those read as
sheets existed in dark only. **Grep for `rgba(241, 237, 224,` and `rgba(0, 0, 0, 0.` before
assuming this class of bug is gone**; a hard-coded wash is invisible to a contrast probe that
only reads text.
In dark, the sentence card and the five answer tiles were `--card` (`#241f38`) on a `#12192b`
page, the identical hole-in-the-page the record panel was fixed for, so they take `--rec-surface`
now too (ink measures 14.57 light / 11.29 dark on it). One regression came with that: the cleared
list's `->` was `--shu-light` and measured 5.19:1 while it sat on the black-washed card, then
4.18:1 once the surface was lifted -- **moving a ground re-opens every ratio measured against the
old one**. It is `--ink-soft` now; the accent belongs on `.new`, which already has it.
**The answer tiles are FOUR, two per row** (2026-10-25). Five across a 640px card gave each one
120px, which is why they were small; two per row gives 312px and a grammar phrase sits on one
line at a readable size. Four also divides evenly, so nothing spans -- the
`last-child:nth-child(odd)` rule stays anyway, because the option count is built from the data.
Below 620px it is one per row. **`buildTileOptions()` takes THREE distractors, not four**, and
that is a change to the game as well as the layout: a guess is 1 in 4 now. The copy says so in
four places -- `grammar.subtitle`, `grammar.startModalDesc`, `grammar.recNew` and the inline
Mongolian in `grammar.html` -- which is the "numeric claims drift from the code" rule in action;
grep `таван` and `five` before changing this count again.
**The tiles went lozenge and back to rectangle.** The Millionaire hexagon was cut with a
`clip-path`, which takes the BORDER and the `box-shadow` with it exactly as it took the picked
tile's outline -- so while it was clipped, all three states had to be fills and every edge and
ring a stacked `drop-shadow()`. The plain rectangle gives both back, and the border, lift and
focus ring are ordinary CSS again. **The right/wrong fills stayed**: `--tile-good`/`--tile-bad`
and their inks are solved like everything else here (4.94 light / 4.90 dark for correct, 4.88 /
4.94 for wrong, each also clear of the resting tile), and they read better than a coloured
outline did.
The A-D key is **`currentColor`**, not a token -- the tile's ink changes with its state, and a
token would have to be re-solved against both state fills. It is `aria-hidden`, so the button's
accessible name stays the answer alone.
**`.gc-fx-canvas` needed `width`/`height`, not just `inset: 0`** (pre-existing, found here). A
`<canvas>` is a REPLACED element, so `width: auto` resolves to its intrinsic size -- the width
and height ATTRIBUTES, which `GcParticleField.resize()` sets in DEVICE pixels -- and `inset: 0`
does not stretch it the way it stretches a div. On a 390px phone at dpr 2 that left a 708px
canvas in a 390px viewport and the whole play screen scrolled sideways. Verified against the
previous commit before blaming the tile change: 726/708 on both, so it was never a regression.
**These two modals are SIBLINGS of `<main class="grammar-main">`**, children of `.container`, so
not one of the page's tokens reaches them -- the old block worked only because it was all literal
hex. `var(--rec-surface)` there resolved to nothing, which is **invalid at computed-value time
and renders as transparent, not as an error**: the card shipped see-through with the board
showing straight through it. The fix is NOT to move the tokens to `body:has(.grammar-main)` --
this file's header keeps them off `:root` and off body on purpose so they cannot collide with the
shared header, footer and auth modals -- so the eight they use are re-declared on
`#gc-start-modal, #gc-result-modal`. `scratchpad/gc-modal.js` compares every copy against what
the record panel resolves, because nothing else would catch a drift.
**Completion is in `localStorage` too now** (`khanjp-gc-cleared`, beside `khanjp-gc-flawless`).
It had to be: completion lived only in `grammar_progress`, so for a signed-out player no tile
was ever `done` and the flawless flag would have been a mark with nothing to sit on. The
account's rows still win where both exist; the local rows are a union on top.
**The two marks are explained in the RECORD PANEL, not in a tooltip on the tile** (2026-10-27).
A tooltip could only be found by hovering a tile that already carried a mark, so the player who
has earned nothing -- the one who most needs to know the flower exists -- had nothing to hover
and no way to learn it was there. `markSteps()` prints both states for whichever level is
picked, side by side: an earned one chipped and named, an unearned one left plain, which on an
uncleared level reads as what is on offer. `scratchpad/gc-steps.js` checks the is-got flags
follow the picked level, both labels clear 4.5:1 on the panel, and the panel has not grown
enough to push the select below the fold.
It started as a SENTENCE explaining the mechanic -- "Алдаагүй дуусгавал цэцэглэнэ" -- which the
site's author called unnatural Mongolian, and he was right twice over: a drawing of the next
state says "this is what you would get" without any prose, and it sidesteps having to phrase a
conditional in a language the copy is translated into rather than written in. The labels are two
nouns already in the glossary, `Дуусгасан` and `Алдаагүй`.
**The petals are sakura; the branch and the leaf are sumi ink.** Every shape used to be one ink
colour, which on the tile passes as a brush painting and in the seal read as a grey smudge. The
petal and bud circles carry `.gc-petal` so they can take their own fill: `.gc-mark g` sets fill
on the GROUP, so a class on the circles outranks it (0,2,0 against 0,1,1) and the ground-coloured
halo still comes from the group's stroke. An unearned seal mutes the petals with the rest of the
drawing -- otherwise the one shape allowed to be loud is the one not yet won.

**A mark drawn for the TILE is cropped wrong for a seal.** Both grow from the lower left towards
the upper right, so inside `0 0 64 64` each sits in a corner with most of the square empty --
which is exactly right on the tile, where the empty corner is the tile and the mark reaches out
of it, and wrong in a circle, where it reads as small and off-centre. `MARK_CROP` holds each
one's real ink bounds and `markSvg(kind, cls, cropped)` takes the third argument only for the
panel.
**The art is written once and worn twice.** `SPROUT_ART`/`BLOOM_ART` plus `markSvg(kind, cls)`
feed both the tile mark and the panel icon; two copies of those paths would drift the moment one
is redrawn. The blossom's bitten-out centre is the ground it sits on, so in the panel it has to
be re-pointed at `--rec-surface` or it punches a page-coloured hole.
**The record panel's start button is pinned to fixed dye** (`#b3412e` -> `#8f3122`), not to
`--shu-light`: that token *lightens* to a salmon in dark mode, and the shared `.auth-btn`
gradient lightens further to a pale pink while its label stays white -- measured **2.13:1**. The
lightest stop of a gradient is the one the floor has to clear, which is why the top stop is
`#b3412e` and not `--shu`'s `#bc4430` (4.17:1 against the cream label, just under).

**THE DRILL CANNOT PRODUCE を, AND NO AMOUNT OF MINING IT EVER WILL** (2026-11-03, the third
pass of the same day). Reported as "why isn't there even を grammar in the dictionary? That must
mean it's just useless as a dictionary" — and the diagnosis was right. `grammar-data.js` is a
sentence-swap drill, so a point is in it only if it has a NEAR-SYNONYM you can swap it for.
ので↔から works; **nothing swaps for を**. Measured at the time: thirteen of the sixteen core
particles absent (を は に で も へ の や か ね よ まで より), along with です, ます, ている, てください,
たい, ましょう, たり, しか — **14 N5 entries in total**. The tab was an index of confusable pairs
while its name promised a grammar dictionary, and the name was the fault, not the 218 entries.
**NOT ONE WORD OF IT WAS TRANSLATED FOR THIS.** Every string shown is the site author's own,
already written and reviewed inside `grammar-data.js` — `explanationMn` on the sentence and
`translationMn` under it. That is what made the feature cheap, and it is also the constraint:
`tests/grammar-index.spec.js` fails on any entry with an empty `m`, so a future point shipping
without `explanationMn` must be left out rather than filled in from the English. That held for
the expansion below too: it added 105 points and not one word of new Mongolian.

**THE POOL IS NOT THE CATALOGUE, and reading it as one cost this index half its material**
(2026-11-03, the same day; it shipped at 113 and was doubled hours later). `GRAMMAR_POOLS` was
the only list of citation forms to hand, so the generator filed its members and skipped
everything else — but the pool's job is to supply DISTRACTOR TILES, which is a different job
from being a catalogue. It holds 132 strings, 19 of them never tested at all, while the
sentences test **436**. Measured: **131 of the 400 sentences had BOTH options outside it**, so
their explanation and their translation reached no entry — ほかない, つつある, づらい, たびに,
にしたがって, を余儀なくされる, たるもの, ごとき, にかたくない, all real N4–N1 grammar and all invisible.
**The build now FAILS on a string in neither list**, so a new sentence introducing a new form
has to be classified deliberately. Proved both ways: deleting つつある's filing names it and
writes nothing. A conjugated form carrying `<ruby>` and no `*Core` is skipped before that and
counted (149 distinct) — it has no citation form to file it under, and those are the visible
face of the 37 sentences wanting `oldCore`/`newCore` added to `grammar-data.js`.
**The partner list is headwords now, not pool members.** The old `pool.has(side.mate)` test
would have thrown most partners away, and two sides of one swap can resolve to the SAME entry
(つづける / つづけている both file under つづける), so a point would list ITSELF as the thing it is
confused with — a rendering fault the spec now pins. Worst case is 5 partners, on ざるをえない.

The 19 distractor-only pool strings were a separate matter: a distractor is never tested, so no
sentence explains it. **9 of them now have a hand-authored entry** (see the foundation layer
above) and がち and まえに came in by merge, leaving 8 without one — てから and たあとで are covered
by foundation entries of their own, and ことになる, ようになる and てある likewise, so what is left
is the long tail. CLAUDE.md used to claim they "stay
findable because the explanations name them by hand" — **that was a substring artifact**. げ
matched おかげで, わけ matched ないわけにはいかない, つつ matched つつある, かけ matched かけ離れている;
only がち and まえに were genuinely named, and both now have an entry by merge. Giving the other
17 (っぽい, ぎみ, きり, だらけ, まみれ, たて, てから, たあとで, ことになる, ようになる, てある, ないものの,
なりに…) an entry means adding a sentence pair to `grammar-data.js`, which is Grammar Connect
content work rather than dictionary work.
**THE EXPLANATION BELONGS TO THE PAIR, NOT TO THE TESTED OPTION**, and reading it the other way
silently drops a third of the corpus. Keyed on `newCore || oldCore` alone — the same
`grammarKey` shape `grammar.js` files an attempt under — 43 points came out with nothing to
show, every one a point that only ever appears as the OLD option: けど, でしょう, つもり,
にもかかわらず, かたわら. All real N4–N1 grammar, all invisible. The text names both points and
explains what separates them, so it is the right text under either one.
**`grammar-data.js`'s own header is wrong about this** and has been for a while: it says `old`
and `new` "deliberately do NOT get furigana since JLPT grammar points are essentially always
kana". 220 of 400 `new` values and 180 `old` values carry `<ruby>`.
