# Web-Portfolio

Site brand: **Khan Japanese**. Personal "About Me" page + Japanese-learning tools, built by
Sarantsatsral Ganzorig. The nav item and browser tab titles say "Khan Japanese" / "About Me" —
the person's real name only still appears where it's a factual credit (photo alt text, the
privacy policy's legal disclosure of who operates the site), not as site branding.
Static site — plain HTML/CSS/JS, no bundler, no build step, no `package.json`. Backed by
Supabase (Postgres + Auth). Hosted on GitHub Pages. Git repo on `main`.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | The "entrance hall" / hub — site home, nav-brand target. **Rebuilt 2026-10-11 as one screen of six square "seals"** (`.hub-seal`), each a tool: icon and one-line stat at rest, the tool's own screenshot ghosted in behind a short description on hover. A large watermark of the brand mark bleeds off the left edge behind them. `<main class="hub-main">` / `hub.css`. **Everything else is below the fold** — `.hub-stage` is `min-height:100dvh`, so the Study Path band and the footer are reached only by scrolling. The old tool cards, the home dictionary search bar, the Dashboard progress widget and the Study Path banner are all gone, and `hub-home.js` went with them (it existed only to drive the last two). Mongolian by default, like every i18n page (see Mongolian first below). |
| `about.html` | Sarantsatsral's personal "About Me" resume/portfolio page — reached via the footer's "About Me" column or the hub's developer card, not the top nav. Fully standalone: its own `about.css` (forest-teal "Field Dossier" theme), no shared `style.css`, no masthead/footer, a sticky left index-rail layout instead. English only, no i18n. Has its own compact account popover (`.about-account*` classes) rather than the shared masthead's side drawer, but wired through the same `auth-shared.js` and load-bearing IDs (see Account menu below). |
| `path.html` | Study Path (学びの道) — a six-stage route from no Japanese at all to N1, mapping each stage onto specific tools and level ranges. `<main class="path-main">` / `path.css` (warm paper, sumi ink, one saffron marker). **Rebuilt 2026-10-12 as a map plus six pages.** `path.html` is now only the map: a Dunning-Kruger confidence curve with the six stages as points on it (lowest before JLPT, peak at N3, trough at N2, N1 recovering), plus a folded `<details>` explaining that the famous curve is not in Kruger & Dunning 1999 and is largely a statistical artefact. Each point links to its own page -- `path-kana.html`, `path-n5.html` ... `path-n1.html`, `<main class="path-stage-main">` -- which carries that stage's full text, a minimap showing where it sits on the curve, and prev/next links. **The whole thing is static**: the curve's path data, every point's left/top and each minimap are generated from one list of six anchor points and written into the HTML, so there is no script on any of these pages, the route is crawlable and the road can never disagree with the points. The six stage pages share path.html's nav entry via a rule in `build-chrome.js`'s `withCurrent`. The old spine layout (`.path-route`/`.path-stage`/`.path-marker`) is gone. **Not in the masthead nav on purpose** — it is a route through the tools rather than a tool, and it is reached from the hub's `.hub-startpath` banner and the footer's Study tools column. (The row had no space either, until the 2026-09-16 regrouping; now it has, and this stays out by choice.) The per-stage hour ranges are external rules of thumb, labelled as such on the page; every level range in the copy is real and will drift if the tools change. |
| `game.html` | Word Match ("言葉合わせ") — hexagonal-card **memory** game, JLPT N5–N1. `<main class="game-main">` / `game.css`. **Rebuilt 2026-10-21** (see Word Match below): the honeycomb-matching board, the 4-minute clock, streaks, powerups, the lightning chain and the Wakan flyer are all gone, and `game-board.js`, `game-play.js` and `game-wakan.js` went with them. Palette is now "hanafuda in daylight" — tatami straw, violet card backs, one gold, every surface a flat colour — with the old lacquer board kept as the dark theme. |
| `phonetics.html` | Phonetics Family — kanji grouped by shared phonetic component, ranked by usage. `<main class="phonetics-main">` / `phonetics.css` (light jade/copper). **Rebuilt 2026-10-15 as one surface with four views** — gate → board → tree → round — and it no longer loads `phonetics-data.js` at all (see Phonetics below). `phonetics-drill.html` was retired with that rebuild: the round is a view on this page now. |
| `grammar.html` | Grammar Connect — sentence-swap grammar drill. `<main class="grammar-main">` / `grammar.css`. The data is still two tracks of twenty, but the **level select is four bands of ten** as of 2026-10-24 (see Grammar Connect below): a triangle gate and ten right-facing play-button tiles in a row. |
| `reading.html` | Dokkai Reader — speech-recognition-driven reading practice. `<main class="reading-main">` / `reading.css` (plum on linen, light). **Rebuilt 2026-10-29** (see Dokkai Reader below): a persistent side info bar beside a stage that swaps between three views, and a level select of twelve regular pentagons. `#text-list-section` is gone — the texts open in a panel beside the pentagons. |
| `dictionary.html` | Mongol-Japan Dictionary — two tabs: primary Монгол⇄日本語 (`mnjp-data.js`), secondary 漢語⇄和語 Kango/Wago (`dictionary-data.js`, lazy-loaded only when that tab opens). Reads a `?q=` URL param on load to pre-fill/filter the primary tab — the target of the home page's search bar. `<main class="dictionary-main">` / `dictionary.css`. **A picked word opens in a panel beside the list as of 2026-11-01** (see The kanji breakdown below), not in a strip under its own row, and the page has no display title or description. |
| `origins.html` | Kana Origins — where hiragana and katakana came from, for a beginner who knows no kanji. `<main class="origins-main">` / `origins.css`. **Rebuilt 2026-10-23** (see Kana Origins below): four sections behind a sticky section bar, and the gojuon laid out as a wall of five vowel rows of eleven rather than the printed eleven of five. |
| `dashboard.html` | Signed-in-only progress page — profile (avatar, editable display name), score vs. site average, per-tool level/text completion, and a link into the Settings modal for account management. `<main class="dash-main">` / `dashboard.css` (**"seal and wine" as of 2026-11-01** — the brand mark's own gold and wine on warm parchment, replacing a cool slate/blue scheme; see The dashboard wears the mark below). This is now the **only** page showing those bars — `index.html` carried a condensed copy until the 2026-10-11 hub rebuild removed it, along with `hub-home.js`, and `tests/progress-totals.spec.js` lost its three index.html placeholder rows at the same time. |
| `privacy.html`, `terms.html` | Legal pages, plain styling via `legal.css`. |
| `credits.html` | Full data/photo/music credits for every tool, one page, `legal.css` styling like the pages above — the destination for every page's footer "Data & licensing" link. Sectioned with anchor ids (`#word-game-photos`, `#word-game-music`, `#grammar-connect-photos`, `#grammar-connect-music`) in case a page ever wants to deep-link to one part instead of the whole page. |
| `reset-password.html` | Standalone, no shared header/footer. |

## Architecture

**Shared `style.css`**: `:root` holds the light "Burgundy Editorial" tokens (used directly by
the legal pages) plus the JLPT color spectrum (`--jlpt-n5`…`--jlpt-n1`, green→wine, used
wherever a level badge or dropdown link appears — do not touch without checking all five hues
stay visually distinct). It also owns the shared masthead (`.site-header-wrap`, single-row:
K brand mark (`icons/brand-mark.png`; it replaced the old 言 seal on 2026-08-18) + wordmark + nav + account menu, "lifted wine" `#4a2c3a`) and the shared footer
(`.site-footer`, same `--header-*` tokens as the masthead so they bookend the page): a 3-column
grid (brand, study tools, About Me), then a footer-bar whose links row includes "Data &
licensing" pointing to `credits.html` — a real page, not an inline disclosure (an earlier
version tucked the credits behind a `<details>` right in the footer; the user asked for a proper
separate page instead, both because Word Game's and Grammar Connect's full photo/music lists
made that disclosure huge, and because those two tools were *also* independently duplicating
their own credits in-page, under their level-select grids, which is what prompted consolidating
everything onto one dedicated page). The masthead and footer are the same *markup* on the twelve
pages that carry them (every page above except `about.html`, which has no shared header/footer
at all, and `reset-password.html`); `credits.html` itself carries the masthead+footer too.
**Their colour is per-tool, though** (2026-10-24): each of the six tool pages puts
`--header-bg` on `.site-header-wrap`/`.site-footer` set to **exactly the `--seal` that
`index.html` gives that page** -- origins `#a8431f`, game `#5a55b0`, phonetics `#1f6b52`,
grammar `#b0432f`, reading `#6b1f52`, dictionary `#23405f` -- so the button pressed on the home
page and the page it opens are the same colour. The seal and the page's own `--header-bg` are
two separate literals: change one without the other and they drift apart silently. Four of them already did this but with the seal
*deepened to 68%*, which is what made them not match, and game/origins had no block at all.
**The ground is now fixed, so the text on it had to move**: `--header-accent` is TEXT in nine
places in `style.css` (footer links and headings, nav hover, the account panel's items) and the
shared gold `#e8bd6d` manages only 3.2-3.6:1 on five of these grounds, so each page lifts it to
a pale warm gold that clears 4.5; `--header-text-muted` likewise. `--header-accent-dark` stays
**below** accent on purpose -- it is the far stop of the brand seal's gradient and a border
colour, never text, so 3:1 is its bar, and lifting it independently inverts that gradient.
Dictionary is the one seal dark enough to keep the shared gold untouched.
**The BRAND MARK takes none of that** (2026-10-31). Those lifts are solved for accent as TEXT,
but on the mark accent is a FILL, so every one of them washed the seal out -- reading's brand
seal was `#f6dcea -> #cfa7bd`, a **pink** one; grammar's and origins' near-cream. The logo is
the one thing on the masthead that must not be per-page, so it reads `--brand-gold` /
`--brand-gold-dark` / `--brand-gold-tint` and no page overrides them. The drift had been
announcing itself and nobody heard it: `.khanjp-loader-seal` was hard-coded to those two
values, so the loading screen printed the real gold mark and the masthead underneath printed a
pink one, on the same page, half a second apart.
**Those three tokens are on `:root`, unlike every other chrome token**, which sit on
`.site-header-wrap, .site-footer` together so the two can never drift. The mark is worn in
THREE subtrees -- masthead, footer, and `.khanjp-loader`, which is a child of `.container` and
in neither -- so scoping it to the chrome left the loader's gradient naming an undeclared
custom property: invalid at computed-value time, which paints **`none`**, not an error. That
shipped for one build inside this very change, and only a probe reading the loader BEFORE it is
removed from the DOM caught it -- a screenshot of a finished page never can.
`.account-menu-profile-avatar` is pinned the same way, for the reason `.auth-btn` in that panel
already was. `about.css` keeps its own literal copy, since that page loads no `style.css` and
the token would resolve to nothing there. Each page needs a
**second block under `html[data-contrast="darker"]`**, because `style.css` re-declares
`--header-bg` there at higher specificity and without it the darker setting snaps back to wine.
**`index.html` is the one exception, and it reduces the masthead rather than removing it.** The hub
prints its own large wordmark, so `hub.css` hides `.site-brand` and `.header-nav` and makes
`.site-header-wrap` absolute and transparent, leaving just the language, theme and account controls
in the top-right. The chrome block stays in the page because it also carries the loader and all
three account modals, and `auth-shared.js` wires those by id — deleting it would take the account
menu down, and `build-chrome.js` throws on a page missing its markers anyway. Those three controls
are drawn light-on-wine for the masthead, so the hub re-colours them: measured at **1.62:1** against
the light ground before that override.

**The masthead nav is two groups** (2026-09-16, replacing seven flat items; it was two groups and
a link until Freetime was removed on 2026-10-12): **Practice** (Word Match, Dokkai Reader, Grammar
Connect) and **Dictionary** (Vocabulary, Kana Origins, Phonetics
Family). Dashboard was the third item until 2026-09-22 and is now only in the account
panel: the bar is for sections anyone can open, and the dashboard is the one page that does nothing
without an account. `dashboard.html` therefore has no nav entry to mark, like `index.html` and the
legal pages. A group heading is a `<button class="nav-trigger" data-group-pages="a.html
b.html">` — a heading names a group, not a page, and `.nav-trigger` already resets background,
border and font so a button styles identically to the anchors. `build-chrome.js` reads
`data-group-pages` to put `nav-current` on the *group* whose member is open. Because a heading is
not a link and touch has no hover, the chrome carries a small inline script that toggles
`.nav-item.open` on tap (guarded by `window.__khanjpNavGroups`, since the chrome is copied into
twelve pages); `style.css` matches `.nav-item.open .nav-dropdown` alongside `:hover` and
`:focus-within`. **The per-level dropdowns are gone** — Word Match and Grammar Connect both open on
their own level select, so the nav listed twelve links to states the page offers anyway. The
`?level=` and `?track=` URLs still work; `nav.allLevels` and the JLPT/track strings are now unused
but kept. **The `@media (max-width: 1280px)` block went with them**: it existed only because seven
Mongolian labels overflowed a 1280px bar, and made every dropdown a full-width fixed sheet at
laptop widths. Measured after the change: zero overflow down to 861px in both languages, where the
860px block (which re-declares the scrolling strip and the sheet itself) takes over. **"Vocabulary"
is a menu label only** — `dictionary.html` keeps "Монгол-Япон толь бичиг" in its title, description
and share card, because that is the phrase Mongolians search for; the menu says Vocabulary /
`Үгсийн сан` only because the heading above it already says Dictionary.

**Below 860px the nav is a drawer, not a bar** (2026-09-17). Measured on a 390px phone: the bar could
give .header-nav 157px for 343px of items, so the third one sat under the account button. The same nav
markup becomes an off-canvas panel (fixed, top 56px so the brand mark stays visible and tapping it
closes again), the groups stop being dropdowns and render as always-open sections, and the drawer adds
two links the bar has no room for: Home (since the brand no longer navigates on a phone) and Study Path.
They carry `.nav-drawer-only`, display:none above 860. The scrim is a child of `.site-header-wrap`,
which is already fixed with z-index 1000, so none of the `.container` stacking games apply. The script
in `_chrome.html` runs both behaviours and checks `matchMedia(`(max-width: 860px)`)` to tell them apart.

**Mobile fixes shipped with it, each measured first:** `origins.html` had no viewport tag, so phones laid
it out at ~980px and shrank it (that is why it alone measured a 64px header and 18 targets under 40px);
the dictionary's result count is `position:absolute` inside the search field, which collided with the
placeholder at 390px and now sits below the field; `.lang-switch` was 33x29 and is now 44x44. Re-measure
with a real 390x844 context before claiming any of this again -- `isMobile: true, hasTouch: true`.
**Shared chrome is generated, not copy-pasted** (`_chrome.html` + `build-chrome.js`). The
masthead, account panel, all three account modals (auth, account details, **and settings** — the
settings modal is deliberately inside the block, since it is the exact region the eleven-page
regex edit corrupted) and the footer — ~205 lines — live **once** in `_chrome.html`, and
`node build-chrome.js` writes them into the twelve pages between
`<!-- chrome:header -->…<!-- /chrome:header -->` and `<!-- chrome:footer -->…<!-- /chrome:footer -->`
markers. **Edit `_chrome.html` and re-run the script; edits made to the chrome inside a page are
overwritten on the next run.** The only per-page difference is `nav-current`, applied from the
filename, so the canonical copy carries none (`index.html` and the three legal pages have no nav
entry of their own and correctly get none). Committed output is plain static HTML exactly as
before — GitHub Pages, `sw.js` and the PWA are unaffected, and neither file belongs in
`APP_SHELL`. The leading underscore is load-bearing: Pages runs Jekyll (still no `.nojekyll`) and
Jekyll does not publish underscore-prefixed files. `_config.yml` exists as of 2026-09-24 but does
not change that — it adds one `include`, for `.well-known`, which Jekyll would otherwise skip for
starting with a dot, and which must be served for the Play Store app's Digital Asset Links check.
Disabling Jekyll with `.nojekyll` would have published `_chrome.html`, which is why it is an
include and not that. The script is
newline-aware — the pages are CRLF and `_chrome.html` is LF, and assembling in the wrong one
rewrites every line of every page as a one-character diff, which is how a real change would hide.
Its guard is that writing the chrome must not *change* a page's `<div>` balance; an absolute
zero-balance test would let one page's unrelated quirk block the whole build. This exists because
the 2026-09-08 outage was one bad find-and-replace applied eleven times at once.

**Motion lives in `style.css`, applied by the page files** (2026-09-18). `--dur-1/2/3`
(0.12s / 0.22s / 0.42s) sit beside the two easing curves that were already there. The shared
file owns the keyframes and the three things no page had motion for at all: `@view-transition`
for cross-document navigation, an entrance on `.modal-overlay:not(.hidden) .modal-card` (modals
are switched with `display: none`, so an entrance animation costs no JS change -- an *exit*
would mean every show/hide call in six files waiting for it, which is why there isn't one), and
`khanjpRiseIn`, which each page's own stylesheet applies to its own cards. Two rules for that
last one: **never put it on an ancestor of a fixed element** -- a transform makes that ancestor
the containing block, and the masthead would stop being fixed while it runs -- and never on a
list a page re-renders as you type, which is why the dictionary's rows are left out.

**NOTHING IS SHOWN THAT WAS NOT ASKED FOR** (2026-10-31). This was shipped three times in one
shape: the dictionary answering a search nobody had performed with the first 150 of 3,537 words
(the Kango tab with ALL of its 573, since that one has no render cap), and Dokkai Reader opening
level 01's three texts beside an untouched pentagon pack. The reasoning each time was that an
empty area looks unfinished -- it does not. **An empty panel is information**: it says nothing
is picked yet, and filling it destroys the parent-child relation the layout was built to show.
Each of these now rests on a prompt that names what will appear and where it comes from.
Two things that ARE asked for stay: the dictionary's "recently searched" strip, which is this
reader's own past queries, and `dictionary.html?q=` from the home page's search bar, which is a
search -- `tests/dictionary.spec.js` and the scratchpad's `disclose-check.js` pin both
directions, empty at rest AND populated after the click or keystroke that should populate it,
because an empty panel is also exactly what a broken fill looks like. A part-of-speech filter
counts as asking, so the Kango tab lists on a filter alone.
**Grammar Connect is deliberately NOT changed.** Its four bands are `role="tab"` with
`aria-selected`, and a tablist has exactly one selected tab by definition -- it is a tab strip,
not a drill-down, and its whole select row is measured against the fold besides. Phonetics
already gates this way, its gate bursting into a view swap.
**The rest of the site was then swept for both faults and is clean** (2026-10-31), by two
detectors kept in the scratchpad:
`drift-audit.js` walks every element of the masthead and footer on all fifteen chrome pages,
keys each by a stable DOM path and reports every FILL that is not identical everywhere. Fills
only -- the first run reported 136 rows because inherited `color` and `borderColor` differ on
every container by design, which buried the one real row. Narrowed to gradients, masks and
backgrounds on childless elements it returns 8, of which 7 are `--header-bg` /
`--header-bg-elevated` / the `nav-current` tint. The eighth was `.auth-btn`.
`idle-audit.js` + `idle-deep.js` look at every page's detail panels at rest AND one click in,
since the reader's fault was on its SECOND view and an arrival-only check misses it. Result:
Kana Origins already prints a prompt and marks its source (`.is-on` on the stone, `.is-lit`
across its row and column -- it is the model for this); Phonetics keeps `#phonetics-node-detail`
`hidden` through gate, board and tree; Word Match renders no level until a tier is picked and
no board until a level is. Nothing else to fix.
**A guessed selector that matches nothing reads exactly like a real finding** -- the first run
reported Kana Origins as filling its desk with "source marked: 0" because it looked for
`.is-active` / `.selected` / `[aria-pressed]`, none of which that page uses.
**`khanjpFadeIn` and `khanjpRiseSm` joined it on 2026-10-31**, and all six tool pages use that
pair: a view arriving fades, nothing already on screen moves, nothing repeats. The split between
them is the rule above stated the other way round -- `khanjpFadeIn` is opacity ONLY, which is
what makes it safe on a whole view, and the 6px rise only ever goes on leaves. It matters on
more than the masthead: a transform would also un-stick Kana Origins' `#origins-bar` and
`#kana-desk` and the dictionary's `.dict-aside`, and un-fix Dokkai Reader's `.reader-controls`.
Two pages also MEASURE layout in JS -- phonetics sizes its field from the height left over,
Grammar Connect measures its row against the fold -- and opacity changes no layout, which is the
second reason a view fade may not carry a transform.
Per page: **game** fades only its level select (the board already deals its own hand in, and two
entrances for one event is one too many); **phonetics** fades each of its four views plus
`#phonetics-node-detail`; **grammar** fades its sections, staggers the ten `.gc-tri-slot`s at
26ms and fades the record panel; **dictionary** fades the two tabs and *nothing else* -- its
rows re-render on every keystroke, which is the page that warning was written for; **origins**
has no view swap, so it cross-fades `.kana-stone` on the three-way script switch (0.16s, no
stagger -- the wall holding still is the page's argument) and `#kana-desk`'s contents on a pick.
**`scratchpad/motion-audit.js` exists because a dead selector is SILENT.** A rule naming a class
that does not exist throws nothing and looks exactly as restrained as a rule left out on purpose
-- the same shape as `var(--header-text-dim, ...)`. It resolves every selector against the
running page at the moment it should apply and fails on a match count of zero. It caught two on
its first run: `.kana-face`, which is really `.kana-stone`, and `#phonetics-member`, which was
invented outright -- the real one is `#phonetics-node-detail`. It also walks every fixed and
sticky element on all six pages, scrolls, and checks none changed `position` or moved. Word
Match's own two dozen animations are deliberately untouched. The masthead and footer carry a
`view-transition-name` so they are *excluded* from the page cross-fade: identical on every page,
they would otherwise shimmer against themselves. `about.html` loads neither `style.css` nor the
chrome, so it carries its own copy of the whole layer -- keep the two in step.

**The loading screen holds itself back 0.6s** (`.khanjp-loader`, markup and script in
`_chrome.html`). Measured: every page is ready in 170-460ms on a desktop and 1.0-2.5s on a
phone-speed CPU, because the word data is a megabyte of plain `<script src>` at the end of the
body -- the shell paints, then nothing answers until it is parsed. The delay is what separates
those two cases, and it is a measured number, not a taste: the first draft used 0.18s and the
heavy pages flashed the cover for a quarter-second on a desktop before taking it away.
It is removed from the DOM two frames after `DOMContentLoaded` (this listener is registered
first, so it runs first; the page's own listeners build the content in between) with an 8s
backstop, and it is `pointer-events: none` so it can never trap a tap. Being a child of
`.container` it needs the same z-index lift the modals get -- see the stacking note below.
The brand mark is dark ink drawn for the masthead's **gold seal**; on a wine ground it all but
disappears, so the loader repeats that seal rather than using the bare image.
**Page-scoped theme files** (`hub.css`, `phonetics.css`, `reading.css`, `grammar.css`,
`dictionary.css`, `dashboard.css`, `game.css`, `about.css`, `origins.css`, `path.css`): each defines its own
token block on that page's own wrapper class (see the Pages table). **They do not agree on token
names** — `phonetics.css`, `reading.css` and `origins.css` reuse `style.css`'s names
(`--bg-page`, `--bg-surface`, `--accent`…), but `game.css` calls its surface `--panel` and its
accent `--gold`, `grammar.css` uses `--card`/`--shu-light`, `dictionary.css` `--card`/
`--terracotta`, `dashboard.css` `--surface`/`--accent`. Anything that has to theme itself against
an arbitrary page therefore needs an explicit per-page map, not a copy of the shared names —
see `tutorial.js`'s `THEME_MAP`, which exists for exactly this reason. CSS custom-property inheritance
means every `var(--x)` in that file picks up the page-local value automatically. `about.css` is
the one exception — it doesn't load `style.css` at all, so its tokens live on a real `:root`
instead of being scoped to its wrapper class. Current palette: hub deep wine/gold (dark),
phonetics light jade/copper, reading plum-on-linen (light), grammar its own accent, dictionary
its own accent, dashboard the brand's own gold-and-wine, game dark hanafuda violet/gold, about forest-teal,
origins warm paper with this page's own hub-seal colour (see Kana Origins below).
**Each page's colors and layout are deliberately distinct — don't reintroduce a shared template
between them.**
**Every page now carries both themes**, `about.html` included. Each token keeps its original
declaration and gains a `light-dark(light, dark)` one directly beneath, so there is one palette to
maintain rather than two. `display-prefs.js` sets
`data-theme` on `<html>` before the first paint and `style.css` turns it into `color-scheme`, which
is what those tokens resolve against; the masthead switch cycles follow-the-device / Light / Dark.
`light-dark()` is a **`<color>` function, not a value switch** -- it may only wrap the colour
itself. Gradients and `url()` therefore cannot go through it (Grammar Connect's daytime sky is a
scoped rule, Word Match's night board photos a JS path swap), and neither can a whole `box-shadow`:
wrapping one is invalid at computed-value time, which resolves the property to `none` **in both
themes**, so the light page silently loses its shadows too. That shipped on three pages and went
unnoticed for a day; write `0 14px 32px light-dark(rgba(...), rgba(...))`, geometry outside. The
plain declaration above each `light-dark()` one is a real fallback only for properties, not for
custom properties -- a token's second declaration always wins, so an old browser gets the invalid
value either way; keep it for consistency, not as protection. Before inverting a token, check how
it is *used*: `--sumi` (dictionary), `--bg-surface` (phonetics) and `--bg-page` (about) are each
both ink AND a fill, so the text sitting on them needs its own paired token.
`about.html` is themed too, and is the awkward one: it loads no `style.css`, so it declares the
three `color-scheme` rules itself and carries its own `#theme-switch` in the index rail --
`auth-shared.js` wires any element with that id, so it needed no new JS.

**Mongolian first, one URL per language pair.** Every i18n page (all but `about.html`) carries
`<html lang="mn" data-default-lang="mn">`, so a first-time visitor sees Mongolian and a choice of English
is remembered sitewide. Only the hub and Kana Origins used to; a link shared into a Mongolian Facebook group
opened the dictionary in English. The static `<title>` is Mongolian and carries the English in `data-en`,
which `i18n.js` swaps in -- it translated nothing in <head> before. **Share previews are raw HTML**:
Facebook's scraper never runs `i18n.js`, so `og:title`/`og:description` are written in Mongolian, with
`og:locale` `mn_MN` and 1200x630 cards from `images/share/` (regenerate with `tools/share-cards/` when a
tool's name or stat line changes -- they read `hub-i18n-strings.js`, but the images do not update
themselves). After deploying a change to them, re-scrape in Facebook's Sharing Debugger; it caches
previews. **Search results are built from the RAW HTML.** Google wrote its snippet for the brand query from the
page body, not the description, so on 2026-09-16 the `<main>` of **every i18n page** had its inline text
flipped to **Mongolian** -- the reverse of the convention below that the inline fallback is the English.
The English now lives only in each page's `*-i18n-strings.js`, and `i18n.js` swaps it in when a visitor
picks English (verified on all eight pages: no Cyrillic survives in English mode). Only `<main>` was
flipped -- the chrome is generated from `_chrome.html`. Two things make a re-run of that edit fiddly:
an element can repeat (path.html names Word Match once per stage, so all occurrences are replaced), and
a `data-i18n-html` block can *contain* other translatable elements, whose own edits then find nothing
left to replace -- that is correct, since the outer Mongolian string carries them, exactly as `i18n.js`
does at runtime. **`about.html` is
`noindex, follow`** and is out of `sitemap.xml`: it is the one deliberately English page, and brand
searches should land on the Mongolian home page. It stays linked from every footer.
**No `hreflang`**: it requires a distinct URL per language and both languages share one URL
here. That is also why this only partly helps Google -- the inline fallback text is English until JS runs,
and real Mongolian search ranking would need separate language URLs. **Fraunces has no Cyrillic subset**, so
Mongolian set in `--font-display` falls back to a system serif; the share cards use IBM Plex Sans.
**Prata is the way out where it matters** (vendored 2026-10-11, `fonts/prata-*.woff2`, three subsets):
a Cyreal face that ships `cyrillic` *and* `cyrillic-ext` — ext is the one carrying Mongolian's `ү`
(U+04AF) and `ө` (U+04E9), which sit outside the Russian range, and it was checked per glyph against
the live font rather than assumed. The hub's opening line uses it (`--hub-lede-font`); anywhere else
still setting Mongolian in `--font-display` has the old problem. **IBM Plex Mono is not vendored** —
don't reach for a mono stack in page CSS, a system fallback renders Cyrillic inconsistently; the hub's
small uppercase labels use the body face with letter-spacing instead.

**Full-bleed pattern**: the same token block is defined on both `body:has(.wrapper-class)` and
`.wrapper-class` (body is an ancestor and can't read a descendant's custom properties), then
`body:has(.wrapper) { background: var(--bg-page); }`. Without this, the shared light `:root
--bg-page` shows as margins outside `.container`'s 1200px cap on wide viewports.

**Account menu**: a full-height side panel (`.account-menu-panel`, fixed to the viewport's right
edge, not a small dropdown), sliding in over a `.account-menu-scrim` backdrop. `auth-shared.js`
wires up `#account-menu` / `#account-menu-trigger` / `#account-menu-scrim` /
`#account-menu-panel` / `#auth-anon` / `#auth-authed` / `#account-menu-profile-avatar` /
`#auth-login-btn` / `#auth-logout-btn` / `#auth-user-email` (a plain, non-interactive `<p>` now,
not a button) / `#account-details-btn` / `#account-settings-btn`, plus `#auth-modal`,
`#account-details-modal`, and `#account-settings-modal`. These IDs and their nesting
(`#auth-anon`/`#auth-authed` inside `#account-menu-panel`) are load-bearing — don't rename or
re-nest without updating `auth-shared.js`. The panel's signed-in state is a profile header
(avatar + email) then real navigation: a `Dashboard` link, `Account details` (opens
`#account-details-modal` — just the email), and `Settings` (opens `#account-settings-modal` —
the language toggle, now with flag emoji, plus the delete-account danger zone), with Log Out
pinned to the bottom via `margin-top: auto`. The **language switch lives in the masthead** (`.lang-switch`, `[data-lang-switch]`, wired in
`i18n.js`) and is reachable without an account — it is the one setting a visitor needs before
deciding whether to sign up. It names the language it would switch *to*. The Settings modal's
copy of it is gone; Settings now holds the page-tutorial reset and the delete-account danger
zone, and is offered signed out as well as signed in — its default rule uses the masthead's `--header-*` tokens, and `.settings-lang-row
.lang-toggle-btn` overrides with page-level tokens since a modal is a sibling of
`.site-header-wrap`, not a descendant, so `--header-*` doesn't cascade there. `.auth-btn` is
shared across the account panel and every modal; the panel's copy is pinned to masthead gold via
`.site-header-wrap .account-menu-panel .auth-btn` (see `style.css`), the modals keep the page
accent. **That pin named `--header-accent` and so came undone on 2026-10-24** without anyone
touching it: the rule exists to stop this exact drift -- its own comment says the button "came
out blue on the portfolio and copper on Phonetics Family" -- and the per-page accent lifts
turned the token it was pinned TO into a per-page one. Measured 2026-10-31: a **pink** button
on the reader (`#f6dcea -> #cfa7bd`) and a near-white one on Grammar Connect. **A fix pinned to
a token is only as fixed as that token's scope**, which is the lesson, and the same one the
brand seal taught an hour earlier. It reads `--brand-gold` now.
**Putting the real gold back re-opened every ratio measured against the washed one.** The label
and the account avatar's initial were `var(--header-bg)` -- each page's own seal -- which passed
only because the gold under them was being bleached by that page's own accent lift. On real gold
the six seals measure **2.22-4.22:1** (grammar 2.22, origins 2.35, game 2.44, phonetics 2.50).
Both are `--brand-ink` (`#4a2c3a`, the brand's own wine) now, 4.78:1 on the gradient's dark
stop, which is the stop that has to clear. This also closes the `#auth-login-btn` ~3.28:1 that
was on the open list. `about.html`'s `.auth-btn` is NOT part of this -- it is that page's own
forest-teal design, not a copy of the shared one, and measures 5.35 / 7.01.
**`.account-menu-note` was the same shape and is fixed with it**: it is the ONE piece of muted
chrome text sitting on `--header-bg-elevated` instead of `--header-bg`, and the elevated ground
is the lighter of the two -- so the token that clears on the masthead failed inside the panel,
at **2.84:1** on dictionary, the one page whose seal is dark enough that it never lifted the
muted token at all. It takes `--header-text` now (4.54:1 at worst, on origins), which is also
the right weight: it is the sentence explaining why the Log in button under it exists.
**That probe only sees the SIGNED-OUT panel.** The signed-in items -- the profile header, the
email line, the Dashboard/Account/Settings rows -- need a real session and are not covered. `about.html` mirrors this same ID contract (it shares `auth-shared.js`) but with its own
compact `.about-account*` markup/CSS sized for its sidebar rail rather than a full drawer.

**Page tours** (`tutorial.js` + `tutorial.css` + `tutorial-i18n-strings.js`, on the five tools
and `dashboard.html`): first-visit coach marks that spotlight a page's real controls one at a
time. A tour is a list of *scenes*; a scene runs the first time its `when` element is visible, so
a page can teach its level grid on arrival and its board later, when a board exists.
`localStorage` remembers each scene (`khanjp-tour-<page>-<scene>`), and the shared notation key
(furigana, the Cyrillic readings, JLPT badges) is shown once for the whole site
(`khanjp-tour-key`). **Every selector in `TOURS` is a real element on that page and nothing
checks them but the tour itself** — a step whose element is missing is silently dropped, so
renaming an id in a tool quietly removes a step rather than breaking anything visibly; the
scratchpad's `verify-tour.js` walks all six and reports the step count. The overlay is appended
to `<body>`, never inside the page, to stay clear of `.container`'s stacking context. The tour
never starts on top of an open `.modal-overlay`. Adding a tool means adding its scenes here.
**Phonetics is one surface, four views** (2026-10-15): the **gate** (a dial of five JLPT discs;
picking one sends its disc to the centre, swells it for a measured 1s and bursts it into that
level's stages — a one-stage level has nothing to burst into and goes straight through), the
**board** (title `Дуудлагын бүлэг N3-1`, a Quick Test bar, and a near-square field of solid tiles
coloured by what the drill last asked), the **tree** (one family, radial, with a member panel
carrying the example sentence), and the **round**. All four live in `phonetics.html`; the round is
not a separate page, because the field beside a question is the answer key.
**The field's tile size is measured, not chosen** — whatever height is left of the window after
the title, the bar and the legend, divided by the row count, against the same for width, smaller
wins; the Quick Test bar is then set to exactly the field's width. `columnsFor()` is
`floor(sqrt(n))`, so 44 shapes become 6×8. `.phonetics-main` is `min-height: 100dvh` and a flex
column so the field has something to measure against; the footer is below the fold, as on the hub.
**Every view that sets `display` must also answer `[hidden]`** — a display rule outranks the UA
stylesheet, and without `.phon-app[hidden]` the board stayed on screen behind the round.

**`phonetics.html` does not load `phonetics-data.js`** (~2.8MB) any more. Everything that reaches
the screen is in `phonetics-quiz-data.js` (~210KB, generated): shapes, their shared sounds,
members with readings and glosses, and `PHONETICS_EX`, **one checked example word per kanji**
(`w` word, `r` reading, `s` the sound it shows, `f`/`k` when a compound changed that sound, `mn` a
gloss where one exists). It shows under the member you click and again beside the answer in a
round.

The checking is the point, and it has two traps. **A sound that merely appears in the reading
proves nothing** — it could belong to another kanji in the word, so position decides: a kanji's
reading sits where the kanji sits (甲虫 does not show 虫 reading こう). And **a compound regularly
voices or clips what it borrows** (塩分 ぶん for ふん, 発表 はっ for はつ); those count, and are
labelled rather than hidden. Candidates come from `mnjp-data.js`, `game-words.js`,
`dictionary-data.js` and the Dokkai Reader's tokenised passages (whose every token carries a
reading *and* a Mongolian gloss), plus every compound mined out of the site's furigana — 5,790
word forms, because the vocabulary lists alone reach only half the kanji. **A real compound always beats the
headword repeated** (性 → 個性, not 性), then a gloss, then the least sound change.
**677 of 684 kanji get a word (99.0%), 491 of them with a Mongolian gloss (72%)** — 548/362 of
those derived, plus **129 written by hand** by the site's author in one pass (2026-10-15), which
is what took it from four fifths to all but seven. An ungloss word is still shown — 忠実(ちゅうじつ)
under 忠 demonstrates the reading, which is the lesson, and the node already prints the kanji's
own meaning. Example *sentences* were tried first and reached 74.4%; words beat that and are a
quarter of the bytes.
`tests/phonetics-quiz.spec.js` re-checks every stored word by position, so a bad one cannot ship.

**The 7 still without a word are the genuine exceptions, not a gap**, and the tree draws them
**adrift**: 砂 涼 笛 腸 貿 訳 廉 take none of their family's shared sounds at all (1.0% of the 684),
so no word can demonstrate what the component predicts for them. `isApart()` is the test, and a
member that fails it gets a spoke that sets out from the core and **stops short**, sits a ring
further out, and carries a dashed copper face; the header says so and the panel explains it.
**The spoke has three states, not two** — it used to key only on the family's first sound, so
尺 and 釈 (which read シャク, a sound the 尺 family does share) were drawn exactly like a member
taking none. Now: solid jade for the headline sound, dashed jade for another shared sound,
severed copper for adrift.
**Checked against the full series before writing that copy**: for all 7, no sibling takes their
reading either, so they are adrift from the series and not merely from its commonest sound. The
page therefore explains the *general* reason (a shared component records a Chinese sound class
whose branches had already split before Japanese borrowed them) and names a specific history for
only one. **訳 is the single documented case**: it was 譯, whose phonetic was 睪, and the postwar
reform swapped 睪 for the simpler 尺 — here and in 沢←澤, 択←擇, 釈←釋, which is four of this
family's five members. Do not add per-kanji etymologies for the other six without a source; the
data supports "its reading is unique in this series" and nothing more.
(The 136 missing before the hand pass split 131 vocabulary gaps — the kanji *does* take the
sound, the repo just had no word using it — and these 7.)
`tools/build-phonetics-wordlist.js` writes `tools/phonetics-words-todo.md` (the worklist, one
jisho link per kanji) and keeps `tools/phonetics-words-manual.json` in step; the generator reads
that file back and a hand-written row wins outright, but is checked like every other, so a typo
fails the build. Build-time only, like `tools/jlpt-levels-manual.json` — keeping it separate from
the derived data is the provenance record.

Related: `phonetics.html` used to auto-open its "what's a phonetic component?" modal on *every*
load; that is gone — the tour points at the button instead.

**Kana Origins is four sections and a wall** (rebuilt 2026-10-23). A sticky `.origins-bar`
starts under the opening and takes the top of the screen once it is scrolled past; its four
marks are the shapes of the sections they open, and `origins.js` keeps `aria-current` on
whichever section is in view, so the bar is also the position indicator. Section 1 (the three
scripts and the demo sentence) and section 2 (nine eras with their photographs) keep the content
and the class names they always had -- the renderers were not touched.

**An era opens into the frame, and its photograph goes beside the text** (2026-10-24). The body
is a two-column grid -- prose left, figure right in the space the 1040px column was wasting --
and opening one scrolls its own summary up to just under the sticky chrome (`revealEra()`,
offset measured from the masthead plus the bar rather than hard-coded, since both change height
at 760px). It only ever scrolls *down* to an era: one already above that line needs no help, and
moving the page would be worse. Measured after: all nine open entirely inside a 900px window.
The seven photographs run from **4.58:1 to 0.67:1** and two are narrower than their column, so
the image is capped on both axes and scaled on neither -- `width/height: auto` with both maxima
set, which keeps a replaced element's own ratio and leaves a small one at natural size.
`width: 100%` + `object-fit: cover` shipped here for an hour and was wrong for every one: it blew
the 246px-wide Kojiki scan up to 420px and cropped it square. Below 860px it stacks again.

**The gojuon is laid on its side.** `KANA_ROWS` is the printed table, eleven consonant rows of
five vowels; `renderKana()` draws its TRANSPOSE, five vowel rows of eleven, so the whole
syllabary is one screen deep and nothing has to be scrolled before two kana can be compared.
**The vowel carries the shape**: a-row triangles, i-row rectangles, u-row pentagons, e-row
hexagons, o-row circles -- sides ascending towards the circle the sequence is heading for, so a
tile says which vowel it is before it is read. Four of those five are cut with `clip-path`, and
**a clip-path takes the element's `box-shadow` with it**, so every tile is lifted with
`filter: drop-shadow()` instead; mixing the two would have shadowed the circle row alone.
The nine gaps (yi, ye, wu...) are rendered as invisible tiles rather than closed up, because
they are part of the shape of the syllabary and removing them misaligns every row below.
A three-way switch re-cuts all 46 faces between hiragana, katakana and the source kanji -- the
shapes stay put while the glyphs change, which is the page's argument in one control.
**The column indicators lead with the kana, not the Cyrillic** (`CONSONANTS` in `origins.js`):
a single Cyrillic consonant is exactly true for only four of the eleven columns -- `са ши су сэ со`
is not an с series, `та чи цу тэ то` not a т series, `ха хи фу хэ хо` not an х series, and
я/ю/ё share no consonant letter at all -- so the kana leads and the Cyrillic sits under it as the
series' usual sound, set in `--text-faint` on the five columns where that usual sound has an
exception. Those five are the same ones the eight notes below the wall cover.
**Opacity is not how you de-emphasise text here**: marking them with `opacity: .45` measured
**2.01:1** in light and 2.67:1 in dark. `--text-faint` is also now checked against **both**
grounds, not just the card -- it passed on `--bg-surface` while reaching only 4.36:1 on
`--bg-page`, which is where the column header actually sits.
The detail opens in a **desk beside the wall**, not under it: the right of that section was
empty, and a panel underneath means scrolling back on every pick.

**The page wears its own button.** `index.html` gives every tool a `--seal`; this page's is
`#a8431f`, and that colour runs through its accents so the button pressed on the home page and
the page it opens match. **The masthead and footer carry it too** as of 2026-10-24 -- see the
per-tool masthead note under Shared `style.css`; the markup is still generated once from
`_chrome.html` and only the colour tokens are per-page.
One trap that measurement caught and a screenshot did not: `--seal` *lightens* in dark mode
(`#a8431f` -> `#d2663c`), so white on the section bar's current chip fell to **3.68:1**. It holds
the light seal in dark mode instead, where white sits at 6.02:1.
Two things the rebuild had to fix that are easy to reintroduce: `<main>`'s own blocks carry the
phone gutter (`.container` has no inline padding at 390px, so without it every card ran into
both edges), and `window.siteLang` is a **function**, not a string.
**Count a grid's children before its columns.** This page shipped the same bug twice. A two-column
grid with three children puts the third in column 1 of row 2: on the era summary that threw the
sub-line into the chevron's column, and on `.next-card` it dropped the description into the 30px
seal column, which wrapped it to **one word per line**. A block-level child also breaks the
anonymous inline item in two, which is how the summary got three children in the first place.
Either wrap the text in one element or pin it with `grid-column`.

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
**The hedge is now a tilde, not a word** (2026-10-24): the notes read `~N4`, `~N4-N3`, `~N2`,
`~N1` where they used to read "mostly N4" / "ихэвчлэн N4". The hedge itself cannot be dropped --
these are halves of a track, not JLPT tiers -- but one character says it in both languages.
**Each band wears its JLPT colour**, taken from the same `--jlpt-n4..--jlpt-n1` hues Word
Match's gate uses: band 1 n4, band 2 n3, band 3 n2, band 4 n1. N5 is absent because no band is
mostly N5 (one level of the forty). `grammar.js` only adds a `gc-band-n4` class -- a custom
property name cannot be built from a variable, so `grammar.css` holds the four-rule mapping onto
one `--bt-*` set that the gate piece and the ten tiles then share.
**The hue is never the resting fill.** Word Match puts white on the solid hue, which measures
**2.40:1** on the N4 gold; here each hue is mixed towards white (light) or the page ground (dark)
and the ink is solved against the *harder* of the two gradient stops -- the darker one in light,
the lighter one in dark. The mix is pushed as far as that solve allows rather than to a round
number: the first attempt used a flat 16% tint for all four and the bands were not tellable apart
on paper, which defeats the point. The cleared/picked state IS the hue, the same in both themes,
and **N3 is the one that has to be lightened 18%** -- at its own lightness no ink, dark or pale,
clears 4.5 on both stops of a gradient around it. The ink direction is per band too (N4/N3 dark,
N2/N1 pale), so `on-solid` is four values rather than one. Worst measured label: **4.77:1**.
**The gate pieces are vivid; the level tiles are not** (2026-10-24). Four JLPT buttons should
read as their colour the way Word Match's dial does, and ten tiles under a heading should not,
so a closed piece wears `--band-*-dim-*` -- the hue only **6% lighter**, which is the least that
lets an ink clear 4.5 on both its stops. An earlier pass washed it 46% toward the page ground to
make the open piece obvious and drained the other three of the colour they exist to show. The
open band is marked **structurally instead**, by `--gate-open-halo`, so colour stays identity and
the halo carries state. `dim` needs no `light-dark()`: the solve returned the same answer for
both themes, which is also why Word Match's nodes are one colour per tier and not two.
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
**A transform is not a layout change**: the picked tile carries `scale(1.07)`, so anything
asserting that the ten tiles are one size must read `offsetWidth`/`offsetHeight`, not
`getBoundingClientRect`, or the lift reads as a differently sized tile.
**The label is rebased, the level underneath is not.** A tile shows its place in its own band
(01-10) while `data-level` and `openLevel()` keep the real 1-20 level, so `grammar_progress` keys
and `progress-shared.js`'s `grammarLevels: 40` never move. Band 2's "01" must not start
foundation level 1.
**The gate is one triangle halved on each side** -- three standing, one inverted between them,
each sharing a whole edge; the apex is the last band so it reads as a climb.
**The level tiles face right, like a play button, and sit next to each other in a wrapping row**
(2026-10-24). They went through two arrangements before that, both abandoned on sight rather than
on measurement: an interlocking chain joined along shared sides (`L`/`R`/`D` walks through a
triangular lattice, one per band, each searched and checked for no cell visited twice and no tile
touching a non-consecutive one), and before that a tessellated patch. Joining them by their sides
simply did not look good. The row needs no path walk, no corner matching and no SVG, so all of
that is gone -- CSS owns the size and the flex container owns the layout. Keep the grid's
`max-width` at four tiles across (`4 x 78 + 3 x 9 = 339`): wider and the row cannot hold the gate,
the tiles and the 250px record panel abreast in the 1024px column, and the panel drops below the
fold.
Traps this cost: a **`clip-path` takes the element's `box-shadow`**, so a tile lifts with
`filter: drop-shadow()` -- which is also why the shadow works as separation, since a filter
follows the clipped silhouette. The drawn lattice and the link lines are **gone** as of
2026-10-24: every tile carries its own gradient and shadow instead, which is what tells one from
the next. **A gradient cannot go through `light-dark()`** (a `<color>` function, not a value
switch), so the STOPS are the tokens and the gradient is written once from them. Order matters:
hover and the picked states must come **after** the base or `done` beats `:hover` and a finished
tile gives no feedback at all.
**The ground is a plain wash, not a photograph**, so the light ground had to drop a step
(`#d9cdb0`) for near-white tiles to sit *on* it rather than in it -- and `body:has(.grammar-main)`
must match `.gc-night-sky`'s end stop or a seam shows.
**Deleting the photographs was not the end of the night sky.** A decorative `.gc-moon` -- a 40px
cream disc with a 36px glow at `top:28px right:56px`, directly behind the volume toggle -- and a
JS-generated 40-star field survived it, and still read as a sun over the new wash. They were
DRAWN, not fetched, so checking that no photo request was made said nothing about them: that
check was reported as "the background is clean" and was not. Both are gone now.
**The whole select fits one frame above 980px** (2026-10-24): gate, tiles and record sit in one
`.gc-select-row`, and the gate is measured against what is left of the window the way
`phonetics.html` sizes its field. **Measure the ROW's top, never the element being sized** -- an
element's own top moves the moment the row wraps, which is a feedback loop that settles on the
wrong answer. Anything in that row claiming more width than it can have is what pushes the panel
underneath and the select below the fold; it happened twice, once when the old trail measured the
row instead of the room left over, and once when the new tile grid's `max-width` was 420.
`RECORD_MIN` in `grammar.js` and `.gc-level-record`'s flex-basis are the same number and must stay
that way.
**Below 981px it scrolls on purpose.** Stacked, the row is 260 + 424 + 293 = 977px of content
before a single heading; chasing a fit that is not available only makes the tiles too small to
read or tap, so the `100dvh` rule and the height bound are both scoped to wide screens.
`#gc-diff-tabs` and `#gc-level-grid` keep their ids because `tutorial.js` points tour steps at
them, and a step whose selector is missing is dropped silently.
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
**The panel does not shrink, so it sets the row's floor.** The gate and trail size themselves to
what is left, but the panel's height is its content: at 1440x720 it put the row 10px past the
fold, which a `max-height: 820px` block gives back in spacing.
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
**The question and the answers are set bigger and at 600** (2026-10-25): the sentence is
`clamp(1.55rem, 3vw, 1.95rem)` (was 1.25-1.55) and a tile 1.22rem (was 1.06), both semibold.
Measured: question 31.2px desktop / 24.8px phone, answers 19.5px.
**The furigana is `0.42em`, not a rem.** It was 0.5rem -- 8px measured, small even beside this
card's kanji -- and a fixed rem would shrink against the sentence again at the top of its clamp,
so the reading now scales with the kanji it sits over: 13.1px desktop, 10.4px phone. The gap
above the glyph was checked at 3x zoom, not from a page screenshot, which at normal scale made
`ね` look like it was touching `寝` when it is clear of it.
**Bigger type is only safe if the longest real content still fits.** `scratchpad/gc-type.js`
plays five sentences of each track at three viewports -- 30 real sentences -- and fails on a
sentence wider than its card, a tile clipping its own answer, a tile outside the bank, or the
board ending below the fold. Advanced band 4 is the worst case, since its grammar phrases are
the longest.
**`.gc-fx-canvas` needed `width`/`height`, not just `inset: 0`** (pre-existing, found here). A
`<canvas>` is a REPLACED element, so `width: auto` resolves to its intrinsic size -- the width
and height ATTRIBUTES, which `GcParticleField.resize()` sets in DEVICE pixels -- and `inset: 0`
does not stretch it the way it stretches a div. On a 390px phone at dpr 2 that left a 708px
canvas in a 390px viewport and the whole play screen scrolled sideways. Verified against the
previous commit before blaming the tile change: 726/708 on both, so it was never a regression.
**The hover lift is 2px, and a Playwright pointer parks where it last clicked** -- after the
start modal closes that can be over a tile, and the lift then reads as two tiles of one row
sitting on different rows. `page.mouse.move(2, 2)` before measuring, or a layout assertion
reports a grid bug that is really the mouse.

**The start and result modals were never rebuilt with the page** (2026-10-25). Every value in
that block was a hard-coded dark hex -- a `#241f38 -> #1a1730` card, `#e0705a` heading,
cream-at-0.6 text -- with no `light-dark()` anywhere, so on the light page the "level complete"
pop-up was still the pre-rebuild violet panel. Three things make this block awkward, and all
three bit in turn:
**These two modals are SIBLINGS of `<main class="grammar-main">`**, children of `.container`, so
not one of the page's tokens reaches them -- the old block worked only because it was all literal
hex. `var(--rec-surface)` there resolved to nothing, which is **invalid at computed-value time
and renders as transparent, not as an error**: the card shipped see-through with the board
showing straight through it. The fix is NOT to move the tokens to `body:has(.grammar-main)` --
this file's header keeps them off `:root` and off body on purpose so they cannot collide with the
shared header, footer and auth modals -- so the eight they use are re-declared on
`#gc-start-modal, #gc-result-modal`. `scratchpad/gc-modal.js` compares every copy against what
the record panel resolves, because nothing else would catch a drift.
**`style.css` pins `color-scheme: light` on EVERY `.modal-card`** (so the UA paints the shared
auth modals' inputs on the same side as their card), and `color-scheme` is also what
`light-dark()` resolves against -- so under that pin every token here came back light and the
dark pop-up painted itself cream. These two carry no inputs, so they override it. It must be
**`color-scheme: inherit`, not `light dark`**: the latter means "use whichever the USER AGENT
prefers", which follows the OS and ignores the site's own switch, and the card stayed cream under
`data-theme="dark"`. Test all three states -- explicit light, explicit dark, and the un-stamped
follow-the-device one, which is where most visitors actually are.
**No stylesheet in the repo lays the result stats out.** `.result-stats`, `.result-stat`,
`.result-label`, `.result-value`, `.result-best` and `.result-actions` are defined *only* by this
block, so the label and the value sat inline in a thin strip; they now get the record panel's
treatment. `.result-actions` is also used by the START modal's markup, so a rule scoped to
`#gc-result-modal` leaves the other one's buttons at their content widths.

**The clock is 2:00 and a correct answer adds 10s** (2026-10-25, was 180s and +30s). A level
now offers 120 + 10x10 against the unchanged 10s mistake penalty, where it used to offer
180 + 10x30 -- a real difficulty change, not a cosmetic one. `MATCH_DURATION` and
`TIME_BONUS_PER_SENTENCE` in `grammar.js` are the only places the numbers live, except the
static `02:00` the timer shows before its first tick, which would otherwise flash the old clock
for a frame. `LOW_TIME_THRESHOLD` stays 30, which is now a quarter of the clock rather than a
sixth.
**The cleared list prepends.** The newest answer goes on top, where the eye already is, and the
panel scrolls to the TOP; appending put each new row off-screen under everything before it.
**The explanation is folded behind the sentence it explains.** The translation is a real
`<button>` with `aria-expanded`, not a `<p>` -- it does something now, so it has to be reachable
by keyboard and announce its state -- and `.why` is `hidden` until it is pressed. Nothing gives
`.why` a `display`, so plain `hidden` closes it; adding one means answering `[hidden]` too,
which is the rule this project has learned twice. The sentence is also the largest thing in the
row (0.92rem, 600, full `--ink`), since it is the line the panel exists to show.
**A walk that clicks tiles until one lands cannot measure the bonus.** A wrong tile costs 10s,
so the raw before/after difference is +10 only when the first tile tried happened to be right --
one theme passed and the other reported +0s for exactly that reason, which read as a
theme-dependent bug and was the test. Net the penalties out with `#gc-mistake-count`.

**A cleared level sprouts; a flawless one flowers** (2026-10-27). The 済 stamp is gone. Clearing
a level draws a green leaf sprout at the tile's top-right; clearing one with NO mistakes draws a
short ink branch with an open blossom and a bud. Both grow from the same point, so one replaces
the other with nothing moving.
**The mark cannot be a child of the tile.** A `clip-path` clips its own descendants, and this
one grows past the top-right edge -- so every tile is wrapped in a `.gc-tri-slot` and the mark
is its SIBLING. (Word Match needed this in both directions: its gate sparks are children so the
hexnode clips them, its bonus sparks siblings so they spill.) The wrapper is the flex item now,
which means **`#gc-level-grid .gc-tri:nth-child(n)` matches nothing** -- the index belongs on
the slot. `tutorial.js` was unaffected only because its two grammar steps point at the
containers, `#gc-diff-tabs` and `#gc-level-grid`, not at a tile.
**`best_mistakes` could not carry "flawless", which is the whole reason for migration 012.**
`saveProgress()` keeps whichever run was FASTER, so a flawless slow clear is overwritten by a
quicker sloppy one -- the flower would un-bloom, and taking back a mark someone earned is worse
than never giving it. `grammar_progress.flawless` is only ever written **true**, the same rule
migration 011 gives Word Match's mode marks, with the same drop-the-column-and-retry dance for
a project where 012 has not been applied.
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
**It is a TRACK with two stations, not two chips.** The first version put each drawing in a
rounded box with a chevron between them and read as a pair of form fields: a box around a mark
says "input" and a chevron says "next". Each state is now a SEAL -- a 54px struck circle, which
is what a mark of award looks like in this page's world -- and the rule between the two seals
carries the progress, dashed until the second is struck and solid ink after. Cleared is struck
in the sprout's green, flawless in the page's shu, because red is what an award is struck in
here.
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
**This block sets the select's floor, so its height is a budget.** The panel does not shrink,
so at 14px of padding and a 58px seal the whole select ended 14px past a 900px fold -- a real
regression, caught by `scratchpad/gc-steps.js` and not by any screenshot. Trimming to 10px
padding and a 54px seal bought it back with 1px to spare. Check that spec before growing
anything in here.

**The ICON dims for a state not reached; the LABEL never does.** Opacity on text is how this
project twice produced a 2:1 ratio, so an unreached label stays on `--ink-soft` (solved against
the panel's own surface, which the spec measures) and only the drawing goes quiet -- at 0.46,
not 0.30, because at 0.30 the flower dissolved into a smudge and the comparison stopped making
its point.
**The art is written once and worn twice.** `SPROUT_ART`/`BLOOM_ART` plus `markSvg(kind, cls)`
feed both the tile mark and the panel icon; two copies of those paths would drift the moment one
is redrawn. The blossom's bitten-out centre is the ground it sits on, so in the panel it has to
be re-pointed at `--rec-surface` or it punches a page-coloured hole.
**The tile mark keeps `pointer-events: none`** -- its square overlaps the NEXT tile in the row,
and a box that took a pointer there would swallow that tile's click. It is also `aria-hidden`,
because the tile's own label already names the state.
**A thin shape cannot carry a centred stroke.** The marks are haloed in the page ground so one
fill reads on the tile AND on the ground it grows onto, but a stroke is centred on the outline,
so `stroke-width: 2.2` covers 1.1 of fill on EVERY side -- and the sprout's stalk was about
three units across. The halo ate it: the leaves read and the stem did not, reported as "the
stalk is the same colour as the background". Two fixes together: `paint-order: stroke fill`,
which lays the stroke down first and the fill on top so the halo only ever grows outwards, and a
stem drawn half again as wide so the stroke has something left to surround.

**A spec must never start by clicking level 1**: it is the focused tile on arrival, and clicking
the focused tile OPENS the level -- the select goes away and every later click times out on an
invisible tile, which reads as a layout bug and is not one.
**A local row carries no times, and the record panel had to answer for that**: `done` alone used
to be enough to print the stats, which rendered a literal **"null"** under Mistakes and 00:00
under Best time. Both cells fall back to the dash now.

**`var(--name, fallback)` fails silently when `--name` does not exist** (2026-10-27).
`.lang-switch` read `--header-text-dim`, which was declared NOWHERE in the repo, so all twelve
pages fell through to the literal `#d6c3cd` and not one of the per-page `--header-text-muted`
lifts ever reached the language and theme switches: 3.4:1 on grammar, 3.6 origins, 3.73 game,
3.82 phonetics, against a 4.5 floor at 12px. A one-word mismatch in a token name looks
deliberate, costs no error and no warning, and the fallback makes it *render plausibly*. Grep
for a token's declaration before trusting a `var()` that names it. The two
`opacity: 0.85` rules on `.theme-switch-icon` went at the same time -- dimming text with opacity
is the rule this project keeps relearning, and here it multiplied an already-failing colour.
**Word Match's `--text-muted` was solved against the wrong surface**: `#6f6554` measured 4.19:1
on six labels of the PLAY screen (stat keys, hand counter, preview hint, tour button), whose
ground is the board's straw `rgb(228,220,199)` and not the paper the token was picked against.
Solving it by hand from an assumed ground returned 4.78:1 -- a pass for a colour that fails --
so the solver now reads the composited ground off the running board. `#675e4e`, 4.69:1.

**DARKER IS A THIRD AXIS, and half a palette on it cannot work** (2026-10-27). `html[data-contrast="darker"]`
sits at higher specificity than a page's own token block, so a flat hex there BEATS the
`light-dark()` pair above it -- in both themes. `grammar.css` set `--card: #171327` and a
`#0b0f1a` ground that way and restated nothing else, so a visitor in **Light** with Darker
switched on got a night ground while `--ink`, `--ink-soft` and `--card-edge` stayed on their
light values, because those still resolve against `color-scheme: light`. Dark ground, dark ink.
It reached the tour card too, since `tutorial.js` copies `--card` onto it: measured **1.17:1**
on the card's own body text. Every value in that block is a `light-dark()` pair now, the light
halves being the page's ordinary light values -- so Darker leaves this page's body alone in
light mode, which is already what reading, phonetics, origins and dictionary do (none of them
override anything below the masthead). `path.css` is the one page that deliberately goes to
night on Darker, and it works only because it restates the WHOLE palette, ink included.
**Neither theme on its own shows this, and neither does a light/dark switch** -- the fault needs
the Darker axis to appear at all, which is why it survived every contrast pass and my own
light-vs-dark audit. `scratchpad/theme-audit.js` runs five passes now (light, dark,
switched-in-place, light+darker, dark+darker) and `--tour` additionally leaves the page tour
running, because the tour's card is the one surface here whose colours are COPIED by JS from the
page's tokens rather than written in CSS -- suppressing tours is what hid this. Proved both
ways: 1.17:1 on the old build, silent on the new. Checked on the other seven pages at the same
time; nothing else is broken on this axis.

**`light-dark()` resolves where it is USED, so a token must never be handed to another
subtree unresolved.** `tutorial.js` copies the page's tokens onto the tour's card, and the card
is a child of `<body>` while the tokens are declared on `<main>`. Passing the raw
`light-dark(#fbf7ec, #241f38)` string across looks tidier and is a trap: the receiving subtree
re-resolves it against ITS `color-scheme`, which can land on the other half of the pair -- a dark
card explaining a light page, which is what the tour was reported for. Every role is now resolved
against `<main>` with a probe placed INSIDE it (`resolveColourStr(value, wrap)`; the probe used to
go on `document.body`, answering for the wrong subtree) and handed over as a concrete colour, so
the card cannot disagree with the page whatever context it lands in. It returns the browser's own
string rather than three channels, because `--ink-soft` is `rgba(..., 0.82)` and flattening it
would quietly darken every secondary line.
(Not reproducible in current Chromium from any of the five theme paths -- light, dark,
follow-the-device, and a live switch in either direction -- which is the point: the dependency
was wrong whether or not this engine happened to exercise it.)

**A value resolved in JS and written inline is a SNAPSHOT, and no amount of `light-dark()`
saves it.** `tutorial.js`'s `applyTheme()` copies seven tokens across as the page wrote them --
`light-dark()` strings, which re-resolve themselves -- but three it has to resolve to rgb numbers,
because `toward()` walks a colour towards an ink until it clears 4.5. Those three went on as
inline styles, which beat every stylesheet, so the help button's `?` disc kept whichever theme was
on screen when it was built: switch to dark and it stayed the light page's plum, a dark maroon
coin on a dark ground. That was the reported "weird dark visual" on `Хэрхэн ажилладаг вэ?`. Every
themed node is now remembered in a `Set` and re-themed on `themechange` / `displayprefchange`,
the events `display-prefs.js` already fires -- `themechange` rather than a MutationObserver on
`data-theme`, because the follow-the-device state stamps **nothing** on `<html>`, so an attribute
watcher would miss the OS flipping under the state most visitors are in.
**Two fresh loads cannot see this**, which is why it survived every contrast pass: loaded in light
it is right, loaded in dark it is right, and only a live flip is wrong.
`scratchpad/theme-audit.js` is the finder for the whole class. It renders a page three ways --
light, dark, and **light switched to dark in place** -- and reports four things: FROZEN (an own
fill/ink/edge byte-identical in both themes while the ground moved: the hard-coded wash), STALE
(the switch disagrees with a dark load: the snapshot), CONTRAST (text under its floor, every
translucent layer composited), and FLAT (an unbordered, unshadowed fill within 1.12:1 of what is
behind it: the hole-in-the-page). Two things it had to learn: set `khanjp-theme` in localStorage,
never `data-theme` on `<html>` -- `display-prefs.js` reads the former in `<head>` and stamps the
latter, so a planted attribute is wiped and the whole report comes back inverted; and FLAT must
skip anything with an edge or a lift, or it flags every bordered card on the site. It reports
CANDIDATES, not failures -- the per-tool masthead, the footer and `.modal-card` are fixed on
purpose and are excluded by name. Proved on two builds: silent after the fix, two STALE rows
before it.
It found one more of its own on this page: `.sound-toggle` was four literal `rgba(224, 112, 90, ...)`
washes, the dark board's salmon, still being painted on the cream page.

**The empty space below the board is not a bug.** The board is short -- a card, a hint, five
tiles -- and on a tall window the page background fills the rest, which is correct. Centring the
play column in a `100dvh` frame was tried and is worse: it splits the dead space to both ends and
detaches the board from its own toolbar, while the side panel floats alone at the top. Don't.

**The record panel's start button is pinned to fixed dye** (`#b3412e` -> `#8f3122`), not to
`--shu-light`: that token *lightens* to a salmon in dark mode, and the shared `.auth-btn`
gradient lightens further to a pale pink while its label stays white -- measured **2.13:1**. The
lightest stop of a gradient is the one the floor has to clear, which is why the top stop is
`#b3412e` and not `--shu`'s `#bc4430` (4.17:1 against the cream label, just under).

**Word Match is five classic scripts, not one** (`game-core.js` → `game-fx.js` → `game-gate.js`
→ `game-memory.js` → `game.js`, after `game-particles.js`/`game-audio.js`). They share one
global scope: a top-level `let`, `const` or `function` in one classic script can be read,
assigned and called from any other on the page. It is just not a `window.` property, which is
why `window.GameAudio` was undefined while bare `GameAudio` worked. That was misread once as
"state cannot be shared across `<script>` tags" and nearly sent this toward ES modules. The only
rule is **load order**: code that runs while a file is loading may use only what an *earlier*
file defined; listeners and animation-frame callbacks run later and may reach forward. So all
mutable state lives in `game-core.js`, and start-up plus most wiring live in `game.js`, the last
one loaded. Two things break it: declaring the same name in two of these files (a SyntaxError
that stops the later file loading), and adding a load-time call into a later file. A new file
goes in `game.html` in order *and* in `sw.js`'s `APP_SHELL`. That shared scope is also what
makes the board testable: `tests/word-match.spec.js` reads `tiles` by name from
`page.evaluate`, which is the only way to play a memory game deterministically.

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
appear in two hands of the same playthrough. Clearing a hand opens a **four-second bonus**: four
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
**The Time Attack mark is a welding arc, not a night sky**: sixteen 4px specks, each a white core
with an orange halo, alive for about a tenth of a second and thrown a short way in its own
direction. The randomised *duration* matters as much as the delay — sparks sharing one period
read as a blinking pattern.
**Three bugs the rebuild shipped and the spec now pins**, each invisible in a screenshot:
`.gate-tiers` sets `display: flex`, which outranks the UA stylesheet, so the chosen tier node
stayed on screen over its own levels (**every view that sets `display` must also answer
`[hidden]`** — the same rule phonetics.html learned); a face-down tile kept the `aria-label`
naming its word, handing the whole board to the one player who cannot see the faces; and
`opacity: light-dark(0.08, 0.16)` is **invalid**, because `light-dark()` is a `<color>` function
— the declaration dropped and opacity fell back to its initial **1**, putting the board
photograph at full strength over everything. A non-colour value needs the three-state theme
pattern instead.
**The sound is cards, not notes.** Every cue in `CardSfx` is a handling sound — a card turned,
two lifted off the table, a deck riffled before the bonus — built from filtered noise rather than
loaded, because a card snap *is* a shaped burst of noise and a library of recordings would be
another megabyte in `APP_SHELL`. Three details keep it from sounding synthetic: the noise buffer
is read from a random offset at a randomised rate so no two snaps are identical, the riffle's
gaps are random inside a decaying span, and every burst is 20–40ms. It has no volume control of
its own — it reads `GameAudio.getLevel()`, so the one speaker button in the toolbar governs
music and cards alike, and level 0 is silence. The `AudioContext` is built on the first click and
never at load, or every browser that enforces autoplay hands back a suspended one.
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
**The hand lands from the middle outwards**: each tile's `animation-delay` comes from its
distance to the board's centre, not its row. The honeycomb is 3/4/3/2, so "the next row" and
"the next ring" are different shapes and only the ring reads as the board opening up. The
keyframe needs `backwards` or the whole hand appears first and animates afterwards.
**Two optional modes, offered on a pop-up before the level is dealt** (`#mode-modal`): **Time
Attack** (three minutes for the whole level, +10s per pair, clock only runs while a hand is
being played) and **Perfectionist** (three lives; only main-round misses cost one, because
bonus clicks are free by design and the reward round should not be what ends a run). They are
independent toggles, not a three-way choice, because each earns its own mark and a run that
survived both deserves both. Taking neither is the plain game. Both introduce something the old
board never had — a way to lose — so `failLevel()` and `levelOver` exist, and nothing on the
board responds once a run is over.
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

**Large data files — never `Read` whole**: `phonetics-data.js` (~2.8MB), `game-words.js`
(~1.4MB), `mnjp-data.js` (~1.4MB, `MNJP_ENTRIES` — dictionary.html's primary tab, 3,537 words
merged from five sources, see its own header comment), `reading-texts.js` (~1.1MB),
`dictionary-data.js` (~185KB, `DICTIONARY_ENTRIES` — dictionary.html's secondary Kango⇄Wago tab,
lazy-loaded) are JS files assigning one `const` to a JSON-shaped literal. Query them with
`grep`/`node -e`, not the Read tool. To bulk-edit, parse with `JSON.parse(text after "const
NAME = ", trailing ";" stripped)`, edit, `JSON.stringify(data, null, 4)` back — this round-trips
cleanly since the files are strict JSON. (Sizes drift as content grows — treat them as
ballpark, not exact; the point is these are all too big to `Read` in one shot.)
`phonetics-quiz-data.js` (~210KB) is generated from these by
`tools/build-phonetics-quiz.js` and is the only one `phonetics.html` loads. `phonetics-
kanji-index.js` (~65KB, `PHONETICS_KANJI_INDEX`, a `{kanji: {phonetic, reading, count}}`
derivative of `phonetics-data.js` — see its own header) is small enough to `Read` directly if
needed; it's listed here mainly so a future edit to `phonetics-data.js`'s kanji membership
remembers to regenerate it too, or the dictionary's phonetic-family links go stale.
`kanji-index.js` (~167KB, `KANJI_INDEX`, generated) is the newest and is loaded by
`dictionary.html` alone — see The kanji breakdown below.

**The kanji breakdown, and why the repo could not supply it** (2026-11-01). A dictionary result
used to expand into a strip under its own row holding, for most of the 3,537 entries, a single
line of grey capitals naming the source; the characters a word is written with were not shown
anywhere on the page. They are now a row of cards in a panel BESIDE the list, each with the
kanji's meaning, its on and kun readings, its stroke count, its JLPT level where this repo files
one, and a link into Phonetics Family where it has a family — a route between two tools that did
not exist before.
**The repo could not answer "what does this kanji mean".** Its per-kanji data covers only kanji
sitting in a phonetic family of three or more: `phonetics-data.js` 1,128, the generated
`phonetics-quiz-data.js` 684. Measured against the words `dictionary.html` actually lists that is
**60.3% of the 1,550 distinct kanji and 47.9% of kanji-bearing entries** — and the misses are the
COMMONEST characters (出 大 学 合 入 食 行 見 言 書 人), because a frequent kanji is no likelier to
have phonetic siblings than a rare one. A breakdown absent on 人 and 学 is worse than none, so
readings, English meanings and stroke counts come from **KANJIDIC2** (EDRDG), which covers all
1,550. `tools/build-kanji-index.js` writes the file; it needs `kanjidic2.xml` downloaded
(`http://www.edrdg.org/kanjidic/kanjidic2.xml.gz`, ~15.6MB unpacked, deliberately NOT committed)
and takes its path as the first argument.
**KANJIDIC2 is CC BY-SA 4.0**, so `kanji-index.js` joins `game-words.js`, `phonetics-data.js` and
`phonetics-kanji-index.js` in LICENSE section 2 — four files now, not three — and has its own
row on `credits.html`. The Mongolian glosses in it are this project's own and are not EDRDG
material; everything else in it is.
**KANJIDIC2's `jlpt` field is NOT used.** It is the pre-2010 four-level scale, the same trap
`elzup/jlpt-word-list` sets, so `lv` comes from this repo's own N5..N1 filing (740 of 1,550) and
is simply absent for a kanji the repo does not file.
**873 of the 1,550 Mongolian glosses are DRAFTS and are live anyway.** The repo's two reviewed
sources — `phonetics-quiz-data.js`'s member glosses and any single-kanji MN-JP headword, which
wins because it was reviewed as dictionary copy — reach 677 kanji between them, which made only
**32.5% of entries** able to show an all-Mongolian breakdown. The curve is close to linear (300
more buys 76%, 500 buys 88.5%), so there was no cheap subset: the other 873 were drafted in one
pass into `tools/kanji-gloss-manual.json`, each marked `"draft": true`, and coverage is 100%.
The flag is a WORKLIST, not a switch — nothing on the page reads it. `tools/kanji-gloss-todo.md`
is regenerated on every build and lists each one still unconfirmed, ordered by how many entries
the character appears in, so reviewing the top of the list is worth more than the bottom. Drop
the `, "draft": true` to confirm one; the build prints the remaining count.
**A one-word gloss cannot separate 1,550 kanji, and that is fine** — 82 drafts share a gloss with
an already-reviewed kanji (引/召 татах, 言/申 хэлэх, 家/屋 байшин). Each card shows its own
character and readings, so a shared gloss is not ambiguous on screen. **Ten were sharpened
anyway**, the ones whose Mongolian word ALSO means something else entirely: 主 was гол, which is
what 川 is glossed (river); 枢 was нугас, which is what 鴨 is (duck); 跡 was мөр, which is 肩
(shoulder); 賃 was хөлс, which is 汗 (sweat). Check a new gloss against the existing set before
adding it, not just against the English.
**The panel has three states and the rule is the 2026-10-31 one.** Hidden with no search at all
(no word for it to be the detail OF), a prompt naming its own source once there are results, and
the word once a row is picked. A row PICKS now — `aria-current`, not `aria-expanded`, and the
chevron is gone. Typing one more letter keeps the panel if the word is still in the results and
falls back to the prompt if it is not. `tests/dictionary.spec.js` pins all of it.
**Two grid traps this cost.** Two elements given the same `grid-area` **overlap**, they do not
stack — the panel and the recent strip need a wrapper, `.dict-aside`, which is the grid item and
the sticky column. And on a phone the wrapper's two halves belong at OPPOSITE ends: stacked above
the list, the panel pushed the first result **865px** down, so you tapped a row and what you asked
for appeared off-screen above your finger — the fault Dokkai Reader's rail had, in the same shape.
`display: contents` on `.dict-aside` under 900px dissolves the wrapper so each half takes its own
grid area, recent above the list and the panel below, and the sticky positioning goes with it.

**The dashboard wears the mark** (2026-11-01). It was cool slate/blue on the reasoning that an
account page should read as a utility rather than a themed room; it is now built from the two
colours the brand mark is actually struck in — the gold `#e8bd6d` → `#c99a45` and the wine
`#4a2c3a` — on warm parchment. This is the one page where matching the masthead is right rather
than repetitive: it is the account's own page, not a sixth tool. **It needs no `--header-bg`
block** for the same reason the six tool pages each need one — the shared masthead's wine already
IS `#4a2c3a`, so the chrome matches without an override, and `dashboard.html`'s `theme-color`
meta was already that value.
**Every value is solved, by `scratchpad/solve-dash.js`, because the brand gold is a FILL.**
`#e8bd6d` measures 1.72:1 on white, so it can carry a bar and never a word: each role that is
TEXT gets its own step of the hue walked towards the ink until it clears 4.5 on BOTH the page
and the surface (light `--accent` is the gold 32.5% towards black, `#88682f`, 4.50/5.08; dark
needs no darkening and uses the brand gold as struck, 10.69/9.85). Worst text ratio on the
page: **4.50**.
**`--average` had to move off gold.** It was gold only because the accent was blue; with a gold
accent the "you" and "site average" bars would be one colour and the comparison would stop
comparing. It is the mark's other half now, the wine — 149 rgb from the gold in light, 81 in dark.
**The two bars cannot both read on one track, and that is arithmetic.** The gold fill measures
**1.27:1** against the warm cream track — a bar you cannot see — and a track dark enough for the
gold (`#7c6568`) drops the wine bar to 1.21. So the gold bar is separated by an EDGE
(`--bar-edge`, 3.71:1 on the track) rather than by its fill, which is the same answer the rest
of the site gives a flat fill, and the reason `theme-audit.js`'s FLAT check skips anything with
an edge or a lift.
**This closed the 2.13:1 login button** that had been on the open list. Shared `.auth-btn` paints
`var(--accent-gradient)` with a hard-coded white label, and on a gold accent white is hopeless;
it is pinned to fixed dye like Grammar Connect's start button and the reader's, and the dye is
the mark's own gold with `--brand-ink` on it — identical in both themes, because the mark is the
one thing on this site that is not per-theme. A dark label on a gradient is solved against the
DARKEST stop: 4.78:1 on `#c99a45`.
**The signed-in half had never been measured** — CLAUDE.md said so outright, because it needs a
real session. `scratchpad/dash-check.js` fakes one at the DOM level, filling the panels through
the page's own markup, and measures 12 roles plus both bars in both themes. It proves the CSS,
not the queries, and says so.

**Grammar Connect was filing sentence fragments, not grammar points** (2026-11-01). "Grammar you
keep missing" printed rows reading `<ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby>を…` — the tags
literally, as text. The markup was the visible half; the key was the real fault.
`word_stats.word` was written as `s.newCore || s.new`, and **41 of the 400 sentences have no
`newCore` — not because the data is missing, but because in those the answer IS the plain form**:
話せます against ことができる, 読んでください against てみる, とても重いです against すぎる. The
grammar point under test is the one on the OTHER side, `oldCore`. Falling through to `s.new`
filed a row under a conjugated, furigana-laden fragment, and `sentencesByCore()` indexes citation
forms — so **none of those 49 keys could ever be matched** and every one of them was a row the
weak-point review could write and then never find again. They also broke the panel's own subtitle,
which promises counting per grammar point rather than per sentence.
Three changes: `grammarKey(s)` is `newCore || oldCore || new` and is used BOTH to file the
attempt and to build the index, so the two can never disagree; `recordWordAttempt` strips
furigana at the single choke point in `word-stats.js`, because the column means the same thing
for every tool and a second tool passing markup would reintroduce it silently; and the dashboard
strips on the way out too, since rows written before the fix still carry it and there is no
migration. 32 sentences still have neither core and fall through to plain sentence text — legible
now, but they want cores adding to `grammar-data.js`.
**`grammar-data.js`'s own header is wrong about this** and has been for a while: it says `old`
and `new` "deliberately do NOT get furigana since JLPT grammar points are essentially always
kana". 220 of 400 `new` values and 180 `old` values carry `<ruby>`.
**A spy on `recordWordAttempt` cannot test this.** `scratchpad/grammar-key.js` first installed
one before `word-stats.js` could, which captured the CALL SITE's raw arguments and reported
furigana in `confused_with` that would never have shipped. Signed out, the real path buffers to
`localStorage['khanjp-word-buffer']`, which is exactly what is flushed to the database on first
sign-in — so the script plays four sentences and reads that buffer instead, sanitiser included.
It also starts from `.gc-rec-cta`, since picking a tile only SELECTS a level.

**Four pages lost their display title and their description** (2026-11-01: `game.html`,
`grammar.html`, `reading.html`, `dictionary.html`). Each opened with a decorative wordmark
(言葉合わせ / 文法つなぎ / 蒙日辞典) and a 44-to-91-word paragraph, which on a 950px window cost the
dictionary 268px before its search field — room for two results. They now follow
`phonetics.html`, which has never had either: **the h1 is the page's own instruction**
("Түвшингээ сонгоно уу", "Хаанаас эхлэхээ сонгоно уу", "Замаа сонгоно уу", "Үг хайх"), promoted
from a heading the page already had further down, and the explanation lives behind the `?`
button. Nothing was lost in the move — each page's tour is longer and more specific than the
paragraph it replaces. **`origins.html` is deliberately excluded** and keeps its opening, at the
site owner's request.
**The `?` button's anchor is the trap.** `tutorial.js`'s `HELP_ANCHOR` names `.game-title`,
`.gc-title`, `.reading-title` and `.dict-title`, and **a missing anchor is skipped in silence** —
delete the element and the button simply never appears, with no error. So the new h1 on each page
CARRIES THE OLD CLASS, even where that class no longer has a CSS rule of its own (game's h1 is
styled by `.gate-head h1`); the class is a JS hook now and the markup says so.
**`.tour-help-btn` had to learn `align-self: flex-start`.** It is `inline-flex`, but a flex item
is blockified — and `.gc-select-content` is a flex column, so the pill stretched the full width of
the page the moment Grammar Connect's title block went. The rule is in `tutorial.css` and is inert
wherever the parent is not a flex or grid container.
Two checkers in the scratchpad cover this pass: `header-pass-check.js` walks the four pages in
BOTH languages and fails on an h1 count that is not one, a missing `?` button, a `?` stretched
past half the main column, or any of the removed phrases still printed; `kanji-panel-check.js`
measures every line the new panel prints against its COMPOSITED ground in light, dark and both
Darker settings (9 samples, worst 4.61:1). Three findings on `game.html` that looked like
regressions -- the guest hint at 3.97:1, the gate sublabel at 4.04:1 and a FROZEN ink on the `?`
disc -- were proved pre-existing by serving HEAD on :8124 beside the working tree on :8123 and
measuring both: identical to two decimal places, so none of them belongs to this change.
**This is the one change that hurts SEO**, and knowingly: Google built its snippet for the brand
query from the page BODY, which is why 2026-09-16 flipped every `<main>` to Mongolian. Each page's
`<title>`, `<meta name="description">` and `og:*` are untouched and still carry the Mongolian —
`dictionary.html` still has "Монгол-Япон толь бичиг" in all three — but the body text those
snippets were drawn from is gone. Watch Search Console rather than assuming it is fine.
Seven i18n keys went with the copy (`game.subtitle`, `game.titleSub`, `grammar.subtitle`,
`grammar.titleSub`, `dict.subtitle`, `dict.titleSub`, `reading.subtitle`); `reading.title` stays,
since the rail, the crumbs and `<head>` all still name the tool.

**TWO OF THESE ARE LOADED BY NO PAGE AND ARE KEPT ANYWAY** (2026-10-31 dead-code audit).
`phonetics-data.js` has not been loaded by anything since the 2026-10-15 rebuild moved
`phonetics.html` onto `phonetics-quiz-data.js`; it stays because it is the build input for
`tools/build-phonetics-quiz.js` and the CC BY-SA provenance for the Kanjium-derived data.
`mnjp-reviewed-data.js` (~195KB, `MNJP_REVIEWED`) is loaded by no page and referenced by no
script, and deleting it would be the one genuinely destructive removal on this list: it holds
the site owner's own `good`/`awkward`/`bad` marks on 1,005 hand-reviewed MN-JP pairs, and only
the 691 `good` ones were carried into `mnjp-data.js`. The REJECTIONS exist nowhere else, so
dropping it would silently discard the review work and invite re-reviewing the same bad pairs.
It is build-time provenance, like `tools/jlpt-levels-manual.json` and
`tools/phonetics-words-manual.json`, and only its location at the repo root suggests otherwise.
A dead-code audit will flag both every time; this paragraph is the answer.

**Data licensing** (all attributed on `credits.html`, linked from every page's footer): Kanjium
(CC BY-SA 4.0) for kanji & phonetic-family data, KANJIDIC2 / EDRDG (CC BY-SA 4.0) for the
dictionary's per-kanji readings, English meanings and stroke counts, Tatoeba (CC BY / CC0) for example sentences,
scriptin/kanji-frequency (CC BY 4.0) for usage ranking, elzup/jlpt-word-list for vocabulary
curation, Pixabay Music (Content License) and Wikimedia Commons (CC0/CC BY/CC BY-SA) for Word
Game's background photos and both tools' soundtracks. **Grammar Connect no longer ships any
photographs** (2026-10-24): its ground is a plain wash, the two Tokyo images were deleted, and
`credits.html`'s `#grammar-connect-photos` section went with them -- an attribution is owed for
what is distributed, and those files no longer are. `#grammar-connect-music` is untouched. Adding a new photo or music
track to either tool means adding its credit to `credits.html` too — nothing else attributes
them anymore now that the old page-local disclosures are gone. Never republish curated
third-party content beyond what these licenses allow — only derive from raw data.
The repo's own `LICENSE` splits this in two: code is MIT, but **`game-words.js`,
`phonetics-data.js`, `phonetics-kanji-index.js` and `kanji-index.js` are CC BY-SA 4.0** —
the first three carry Kanjium-derived phonetic-component data and the fourth KANJIDIC2
readings and meanings; ShareAlike is inherited by adaptations, so they cannot be
relicensed and anyone redistributing them must keep those terms. The other
data files (`mnjp-data.js`, `reading-texts.js`, `dictionary-data.js`) carry no Kanjium
material and stay MIT — verified by grepping for the `phonetic` field, which is the marker.
Adding Kanjium-derived data to a fourth file moves that file into CC BY-SA too, so check
before merging phonetic data anywhere new. `credits.html#licensing` links the LICENSE, and
elzup/jlpt-word-list is MIT, whose text must stay reproduced in LICENSE section 3.
All of these permit commercial use, so ads or donations change none of these obligations.

**Supabase**: `supabase-config.js` holds the project URL and anon/publishable key (safe to
expose — access is enforced by RLS policies in `supabase-schema.sql`, not key secrecy).
**`profiles` is world-readable on purpose** (the comment list embeds author names), which
makes anything stored in it public to anonymous callers. That is why `handle_new_user()`
must never derive `display_name` from the email address: it used to use
`split_part(new.email, '@', 1)`, which published every user's email local-part — a trivial
guess away from the full address for the common providers. The default is now a neutral
`Reader NNNN`. Column grants restrict the table to `(id, display_name)`, so adding a
column to `profiles` does not automatically expose it, but adding personal data there
still needs thought. Every free-text column is length-bounded, since an insert policy
proves who you are and not how much you may write. `supabase-migration-001-profile-privacy.sql`
applies all of this to a project created before these fixes; a project set up fresh from
`supabase-schema.sql` already has them.
**The Supabase library and the webfonts are vendored, not fetched from a CDN** (`vendor/supabase.min.js`,
`fonts/`), and both are in `sw.js`'s `APP_SHELL`. They used to come from jsDelivr and
fonts.gstatic.com, which made the typography and the auth client depend on someone else's uptime
and told those companies a visitor's IP on every page load — a data transfer `privacy.html` then
had to disclose and could not control. Updating Supabase now means re-downloading that file
deliberately (pinned at 2.115.0); nothing arrives on its own any more, which is the trade.
Noto Serif JP is deliberately **not** vendored: Google serves it as 124 unicode-range subsets per
weight, ~20MB for the three weights used, so the pages that want it fall back to the system stack
already declared in `--font-jp`. `auth-shared.js` still checks for the library and falls back to a
stub client rather than calling `supabase.createClient` unguarded — that call used to throw on
the file's first statement and take `showEl`/`hideEl`, `onAuthChange` and the account menu down
with it on every page. None of the five tools need an account, so the rule is: lose the
account, keep the tools. `window.supabaseReady` says which mode you are in.
`auth-shared.js` = auth/session plumbing used sitewide; `supabase-app.js` = bookmarks and the
account-linked contact form on about.html (depends on `auth-shared.js` having run first).
**The comments feature was removed** (`supabase-migration-002-drop-comments.sql`): it was the
site's only user-generated content, and Google Play's UGC policy would have required reporting
and moderation for something nobody had ever posted to. Its removal is what let `profiles` stop
being world-readable — that policy existed solely so the comment list could embed author names,
and every remaining query reads or writes the caller's own row. Don't reintroduce public reads
on `profiles` without re-checking what would become enumerable.
**Settings follow the account** (`user_settings`, migration 009, synced from the block at the end of
`auth-shared.js` since that is the one script every page loads): site language, darker theme, reading
style and which tours have been seen. First sync on a device adopts what the account holds; after
that the device's own choices win and are pushed. Tours are a union, never subtracted. Deliberately
not on `profiles`, which is reachable by others in places. `reset_own_progress` does not clear them --
resetting progress should not change your language.

**"Continue with ..." is one flow for both sign in and sign up** (2026-10-26). Coming back from
a provider for the first time creates the account, so the row is shown in both modes and the
terms line under it is a STATEMENT, not the checkbox the email form uses -- a checkbox there
would block an existing user from signing in to an account they already agreed on.
**Which providers appear is data**, `OAUTH_PROVIDERS` in `supabase-config.js`. It holds
`['google']` as of 2026-10-27 -- Google is configured in the Supabase dashboard and verified
working end to end. A provider listed there but not enabled in the dashboard is a dead control
in front of every visitor, so the list is only extended after the dashboard side is done, and
`privacy.html` is updated in the SAME commit: the policy names exactly the providers that have
buttons, no more (it named all three while the code was being built, which described transfers
that could not happen).
The client secret lives in Supabase and never in this repo. **A spec cannot verify that secret**
-- it is used only in the token exchange on Supabase's side, after the visitor authenticates, so
everything reachable from a test (button renders, click leaves for the provider with the right
`client_id` and callback) passes just as well with a wrong secret. Only a real sign-in proves it.
**Google's consent screen says `upjcknjkzfhvejpdkaez.supabase.co`, not "Khan Japanese"**, because
the app is In production but not brand-verified. It is cosmetic -- no interstitial, no access
block, anyone can sign in -- but it is the screen where a visitor decides whether to trust the
site. Fixing it means brand verification (domain verified in Search Console first, then a few
business days) or Supabase's paid custom-domain add-on, which would make the callback
`auth.khan-japanese.org` and need the URL changed in both Google and Supabase.
**The row is BUILT BY JS into an empty `#auth-oauth`**, not written into the markup, because the
auth modal exists twice and the two are maintained differently: `_chrome.html` (generated into
eighteen pages) and `about.html` (hand-written, no chrome markers). Markup duplicated across
those two drifts; one empty container in each cannot.
**`signInWithOAuth` does not come back.** It builds the URL and sends the browser to the
provider, so a misconfigured provider does NOT surface an error at the call site -- it fails
after the round trip and lands back on the page with `?error=`/`#error=` and nothing on screen,
which reads as "the button did nothing". `showOAuthReturnError()` reads both the query and the
hash (PKCE uses one, the implicit flow the other), opens the modal with the message and strips
it off the URL.
**LINE is not a Supabase built-in provider.** Google and Facebook are. The brand definition for
LINE is in `OAUTH_BRANDS` so the button exists the moment it becomes possible, but enabling it
needs the Supabase dashboard to actually offer it; otherwise it wants a custom OIDC route, which
is a different and much larger job than adding a string to the list.
**Adding a provider means naming it in `privacy.html`.** The policy's "Who it's shared with"
section now says that pressing one of those buttons hands the visitor to that company, which
receives their IP and browser details and returns an email address and name. That sentence had
to be written carefully against the one above it, which claims no page announces an IP to anyone
beyond Supabase and GitHub -- still true, because this one is the visitor's own deliberate act
rather than something a page does on load.

**`grant execute ... to authenticated` is not a whitelist**: Postgres also grants EXECUTE to
PUBLIC on every newly created function, so all five RPCs were callable by anyone holding the
publishable key until `supabase-migration-007-lock-function-grants.sql` revoked it. Probed live:
`get_dashboard_stats` answered an unauthenticated caller with the site's user count and average
score. Every `create function` needs a matching `revoke execute ... from public, anon`, and a
SECURITY DEFINER function should still check `auth.uid() is null` itself rather than relying on
`id = auth.uid()` matching no rows.

**Errors report themselves** (`error-report.js` + `client_errors`, migration 010, 2026-10-04). Until
this there was no `window.onerror` anywhere on the site, so a page that threw on a visitor’s phone
left no trace but a session that did nothing. The script is loaded in `<head>` on all fifteen pages,
**second, straight after `display-prefs.js`** (which stays first because it sets the ground colour
before the first paint) -- an error in a page script is the thing it exists to catch, so it cannot
wait for the body. It POSTs to PostgREST with plain `fetch`, not through the Supabase client: that
client loads near the end of the body, and the config’s two constants are read lazily at send
time behind a `typeof` guard (they are global *lexical* bindings, so they are either initialised or
undeclared -- never in their dead zone from here). **It is not Sentry on purpose**: a monitoring
vendor would learn every visitor’s IP on every page load, which is the exact cost that got the
fonts and the Supabase library vendored. **The payload holds no `user_id` and no IP**, and the hash
is stripped from the URL; `privacy.html` discloses precisely those six fields, and
`tests/error-report.spec.js` asserts the key set so adding a seventh fails CI before it ships.
`client_errors` has an insert policy for `anon` (most visitors never sign in, and the tools work
without an account) and **no select policy at all**, so a public insert target is not also a public
log of every broken page -- it is read in the SQL editor. Reports are capped at 5 per page load and
deduped by message, since one bad selector in a render loop throws every frame. Nothing is sent
from `localhost` unless `khanjp-error-report-debug` is set in `localStorage`, which is how the spec
exercises the send path. Retention is a `delete` line in the migration’s header, run by hand (no
pg_cron). **A new page must carry the tag**, or it silently reports nothing while looking fine --
the spec walks all fifteen and checks the position, which is the same guard `APP_SHELL` needed.

**PWA / `sw.js`**: precaches an `APP_SHELL` list (every page, its CSS, and its non-data JS —
large per-tool data files are deliberately excluded, see the file's own header) via
`cache.addAll()`, which is atomic — one 404 anywhere in the list fails the *entire* install
silently (`pwa-register.js` swallows the rejection), so the PWA just never installs rather than
installing-but-slightly-stale. Found this the hard way: `portfolio.css` lingered in the list
long after that file was renamed to `hub.css`, and `dashboard.html`/`about.html`/`credits.html`
plus their CSS/JS were simply never added when those pages shipped. **Adding a new page means
adding it (and its CSS/JS/i18n-strings file) to `APP_SHELL` and bumping `CACHE_VERSION`** — the
version bump forces every client through a fresh install with the corrected list rather than
silently keeping whatever (possibly broken) cache they already had. Bump it for a significant
*content* change as well: `fetch` is stale-while-revalidate (serve cached, refresh behind it),
so without a bump a returning PWA user runs the old copy of a fixed file for one more visit.

**A modal opened from another modal has to win the tie** (2026-10-25). Word Match's and Grammar
Connect's result pop-ups both offer "log in to save", and `#auth-modal` is a `.modal-overlay`
SIBLING of those pop-ups at the same `z-index: 2000`. An exact tie is broken by DOM order, and
the chrome that carries `#auth-modal` is written in near the TOP of every page -- so the pop-up
painted over the login form, and the button looked like it did nothing. `#auth-modal` is now
2010 in `style.css`. The pop-up is *meant* to stay open behind it: `onAuthChange` saves the
pending result and hides the login button, so the player comes back to the same pop-up with the
score already kept -- which is why the fix is to raise auth, not to close the pop-up.
Proved both ways with the same spec, per the two-builds rule: on the old build Playwright's
real `.click()` on the email field times out, on the new one it types. A z-index comparison
alone would not have shown it, and neither would a screenshot of the dialog on its own.

**Dokkai Reader went from warm gold to "plum cloth"** (2026-10-27). The old scheme -- olive
seal `#5f6b1f`, amber accent on a `#f7ecd2` ground -- was called piss yellow, and the hue that
replaced it was chosen by where the gap WAS rather than by taste: the six seals ran orange 20,
red 9, teal 162, blue 210 and violet 243, leaving 280-340 empty. Plum also suits the tool, being
what a bound book is covered in.
**Half the yellow was the GROUND, not the accent.** Swapping only `--accent` would have left a
plum sitting on a custard page, so `--bg-page` came off `#f7ecd2` to a near-neutral linen and
the ink, borders and shadows went plum-tinted with it.
**Three files carry this colour and all three had to move together**: `reading.css`'s token
block, its `--header-bg` block (plus the `data-contrast="darker"` one), and the `--seal` literal
on `index.html`'s Reading tile.
**`images/hub/reading-enter.jpg` is a SCREENSHOT of this page**, ghosted in behind the seal on
hover -- so a palette change makes the home page show a gold screenshot behind a plum seal. It
was re-shot, by the route `tools/share-cards/capture-shots.js` uses to reach the passage.
**`images/share/reading.jpg` is still the old palette.** Regenerating it is
`node tools/share-cards/capture-shots.js` then `node tools/share-cards/make-cards.js`, but both
rebuild EVERY tool's shot and card, and Facebook caches previews -- so it wants doing
deliberately, with a re-scrape in the Sharing Debugger after.

**Dokkai Reader is a rail and a stage** (rebuilt 2026-10-29). `.reading-rail` is the same on
all three views and only `.reading-stage` beside it swaps -- the same "one surface, several
views" shape phonetics.html has, and what makes the four screens read as one tool. The rail
carries the brand mark, overall progress (N / 72), a context block `renderRail()` refills per
view (the track on the select, the text in the reader), and **the skipped-word list**, which
used to live inside the reader and so vanished the moment you left the passage -- exactly when
you would want to look at it.
**`#text-list-section` is gone.** A level's three texts open in `.text-panel` BESIDE the
pentagons; a panel underneath means scrolling back on every pick, which is the lesson Kana
Origins' kana desk already paid for.
**The panel is EMPTY until a pentagon is picked** (2026-10-31), and that is the point. It used
to open the next level's texts on arrival, under a comment reading "so the panel is never empty
on arrival" -- which had it backwards. A filled panel reads as a SIBLING of the pentagon pack
rather than as the contents of one pentagon, so level 01's three texts looked like another part
of the level select instead of what level 01 holds: the parent-child relation the two-column
layout exists to show was the one thing it hid. An empty panel is information. The rail still
NAMES the level to come back to, which is a signpost rather than an opened door, and
`showTextPrompt()` states the derivation outright -- pick a level and its three texts appear
here. The `quiet` argument is gone with it.
**Returning from the reader is the exception**: `showLevelSelect()` re-opens `currentLevel`
when it belongs to this track, so finishing one text does not cost you the list it came from.
Switching tracks lands on the prompt, because `indexOf` fails against the other track's levels.
The resting title must not be `reading.pickLevel` -- that is the `<h1>` directly above it, and
the panel repeating it word for word reads as a rendering fault.
**The level select is twelve REGULAR pentagons** -- every interior angle 108 degrees, every
side equal. **No such pentagon can tile the plane**, and that is arithmetic, not difficulty:
around a point the angles must sum to 360 and along an edge to 180, every angle one can
contribute is 108 or 180, and `108a + 180b = 360` has no whole-number solution. Side lengths do
not enter into it. So this is a PACKING: an up pentagon and a down one share a whole edge, the
pair repeats along a row, and the next row's apexes drop into this row's notches. Both contacts
resolve to the same number -- `R + |v2.y| = 1.538842` -- so the rows seat exactly with nothing
left to guess at. 85.4% of the area is pentagon; the 14.6% left over is the page showing through
as an even channel, which is the design rather than a defect. Verified at 400,000 sample points:
zero overlap.
**Derived, not searched.** A numeric hunt for a denser lattice returned one 0.5% better that
overlapped at **14 sample points in 200,000** -- a hairline no screenshot would ever show. The
Cairo pentagon drawn first DID tessellate, and could only because it gives up equal angles
(90/90/120/120/120, which sums to 360 two ways); it was rejected for looking squat.
**`pentPlace()` pairs by COLUMN, not by direction.** Up and down tiles interleave horizontally,
so laying both ups first and then both downs numbers them `01 03 02 04` across a band. That
shipped for one build.
**One state class, never two.** A tile carrying `is-next is-open` was painted merely open,
because `is-open` is declared after `is-next` -- the same order trap as grammar.css's `done`
beating `:hover`. `pentState()` returns the state and `next` overrides it, so exactly one class
is applied.
**Every state is measured, including ones a guest never reaches.** `scratchpad/pent-contrast.js`
forces all four onto real tiles across light, dark and both Darker settings. Two traps it hit
first: it set a tile's class and read `getComputedStyle` **in the same tick**, so every tile
reported its PREVIOUS state's fill and the report was nonsense; and SVG text takes `fill`, not
`color`, while a `<path>` has no `background-color` at all.
**Two contrast bugs it surfaced were PRE-EXISTING** (zero lines of either in the rebuild's
diff), and are fixed here: the current word's highlight used `--accent-light` and, because that
fill RISES from the bottom of the glyph as you speak, one ink had to read both on the fill and
on the surface above it -- 2.61:1 light, 1.85:1 dark. `--word-hl` is a highlighter instead
(pale in light, deep in dark) so the page's own ink clears 4.5 either way. And `.auth-btn` on
this page answered the shared white label by darkening the LABEL; the old comment admitted it
"isn't a perfect ratio" and it measured **1.91:1**, making Start Reading the least legible
control on the page. It is pinned to fixed dye now, as Grammar Connect's start button is and for
the same reason: `--accent` lightens in dark mode.
**The motion is opacity and six pixels** (2026-10-29). A view arriving fades; nothing already
on screen moves; nothing repeats. The pack develops in reading order at 24ms a tile -- small
enough that the eye reads one gesture rather than twelve events -- and `both` holds each tile
at zero through its own delay, or they all flash in first and animate afterwards. The only
motion that carries meaning rather than polish is the rail's progress bar, which grows instead
of teleporting when a text is finished. A pulse on the next level was considered and dropped:
it would be the one thing on the page demanding to be looked at.
**NO TRANSFORM MAY TOUCH AN ANCESTOR OF `.reader-controls`**, which is `position: fixed`. A
transform makes its ancestor the containing block, so the bar would stop being fixed for as
long as the animation ran -- the same rule that keeps `khanjpRiseIn` off the masthead's
ancestors, and this page has already shipped one fixed-bar bug. The view fade is therefore
opacity ONLY; the pieces that do move (`.track-card`, `.text-item`) are all in sections holding
no fixed element. `scratchpad/reading-motion.js` proves it rather than reading the stylesheet:
it checks `position` and the bar's offset DURING the fade, again after a 400px scroll, and then
clicks Skip Word for real.
**No `prefers-reduced-motion` guard is written here** -- `style.css` already cuts every
animation and transition sitewide with `!important`. What that cannot fix is a base rule
starting at `opacity: 0`, so every keyframe declares only `from` and lets the element's resting
state be the destination; the spec checks the card still ends at opacity 1 under reduce.
(The one looping animation on the page is `.floating-shape`, the sitewide decorative
background from `style.css`. It is older than this work and excluded from that check by name.)

**On a phone the rail goes UNDER the stage**, by `order`, not by source position. Stacked above,
its five blocks ran about 1150px and pushed the pentagons clean off the first screen -- the page
opened on a sidebar. Its blocks then wrap into a row rather than one per line.
**`images/hub/reading-enter.jpg` is a screenshot of this page**, so the LAYOUT changing stales it
exactly as the palette change did; it was re-shot, and the scratchpad's route lost a click
because `.level-card` no longer exists.

**Stacking contexts, not z-index, decide what's on top.** `.container` (`style.css`) and
`.site-footer` are both `position: relative; z-index: 2` — an exact tie broken by DOM order, so
the footer wins. Any page wrapper that also creates a stacking context (`.reading-main` sets
`isolation: isolate`) seals its children's z-index inside `.container`'s level 2, so a big
number on a descendant buys nothing against the footer. This shipped: Dokkai Reader's fixed
`.reader-controls` bar (`z-index: 40`) was painted under the footer and the footer swallowed
every click on Start Reading and Skip Word. Fixed page-scoped via
`body:has(.reading-main) .container { z-index: 3 }`. Before trusting a z-index on a fixed
overlay, check it with `document.elementFromPoint` at the element's own centre — Playwright
reports this as "…subtree intercepts pointer events", which is easy to dismiss as a test bug.

## Working conventions

- **Standing authorization to `git commit` and `git push` to `main`.** No need to ask first —
  regular commits/pushes are pre-approved (changed 2026-09-01, was previously "ask every time").
  Still never force-push, rewrite history, or skip hooks without being asked explicitly for that.
- **Verify with a real browser, not self-reports.** `python -m http.server 8123` from the repo
  root, then Playwright against it. This has caught real bugs almost every round (a hex-tile
  tessellation gap, invisible tree spokes after a theme flip, a malformed CSS comment eating
  the rule after it, unstyled footers on five of six pages). Screenshot key states, don't just
  assert.
- **Distrust your own test scripts too, not just the product.** Several "bugs" this project
  turned out to be my own script's fault — clicking the wrong element, checking
  `background-color` on an SVG that uses `stroke`, a fixed delay racing an animation,
  `element.screenshot()` clipping content that renders slightly outside that element's own box.
  When something looks broken, get a wider screenshot or re-measure before reporting it.
- **Design distinctiveness is judged structurally, not just by color.** Past feedback: giving
  each page a different accent hue on the same card-grid-plus-top-toolbar template still reads
  as "the same design" — real distinctiveness needs different *layout* too (e.g. Phonetics
  Family's sidebar nav vs. Reader's linear-list-plus-floating-bar vs. Word Match's unchanged
  top-toolbar-and-hex-board).
- **Show a preview before a large rebuild.** An Artifact mockup (comparison of options, or a
  before/after toggle) before touching real files has repeatedly caught direction problems
  early and is the expected step before a multi-page change, not an optional extra.
- **Never edit HTML or CSS structure with a regex.** Both failures on 2026-09-08 came from
  this. A non-greedy `<div class="settings-lang-row">.*?</div>` stopped at the *nested*
  `.lang-toggle` close and left the outer `</div>` behind, on eleven pages; the extra tag closed
  `.modal-card` early and every close after it landed one level too high, until `.container`
  closed before `<main>` — which cost the content its `z-index: 2` and left the fixed
  `.background-animation` swallowing every click on four pages. The same batch started another
  pattern *inside a comment*, leaving a dangling `/*` that ate the `.auth-btn` rule and the
  `.modal-label` I then "found missing" and wrote a false commit message about. Instead: replace
  an exact literal block, `assert` it was present, and for anything nested match balanced tags or
  parse. After any structural edit, check `main` is still inside `.container` on every page — one
  line in the browser, and it would have caught both instantly.
- **A "regression" is only proven by comparing two builds.** My hit-test blamed
  `.background-animation` on the pre-change stylesheet too, which nearly had me call the outage
  pre-existing. What settled it was `git worktree add --detach <old-commit>` served on a second
  port next to the current one: same page, one clicks and one does not. A check that fails
  identically before and after is not evidence.
- **Click things; do not just measure them.** `document.elementFromPoint` said the same thing on
  the working and broken builds. Playwright's real `.click()` timed out only on the broken one,
  and named the intercepting element in its error. Assert the *consequence* — the board opened,
  the tree expanded — not that a hit-test looked plausible.
- **Render images through the local server, never from `file://`.** A page opened as `file://` is a
  different origin from `http://localhost:8123`, so Chromium refuses the vendored webfonts with a CORS error
  and the text silently renders in a fallback face -- the screenshot still looks plausible. This shipped: the
  2026-09-13 share cards and Facebook cover set their Mongolian in a fallback, not IBM Plex Sans. Write the
  template inside the repo and `page.goto('http://localhost:8123/...')`, and assert the face actually loaded
  (`[...document.fonts].some(f => f.family.includes('IBM Plex Sans') && f.status === 'loaded')`) --
  `document.fonts.ready` resolves on failure too.
- **Windows/PowerShell path escaping breaks Node heredocs.** `cat > file.js << 'EOF'` via Bash
  on this machine has mangled backslash-heavy Windows paths (`C:\Users\...`) more than once.
  Prefer the `Write` tool for scratch Playwright scripts over shell heredocs.
- **Dead code is found by a script and then verified by hand, never the other way round.** The
  2026-10-31 audit lives in the scratchpad (`dead-files.js`, `dead-i18n.js`, `dead-js.js`,
  `dead-css.js`, `dead-supabase.js`) and every one of them over-reported badly on its first
  run: the i18n audit claimed 241 dead keys because Kana Origins stores keys as DATA
  (`title: 'origins.era1.title'`), invisible to call-site matching; after that it still called
  `game.tier.N5` dead, which is live via `window.t('game.tier.' + jlpt)` -- **and a hand-grep
  for the whole key agrees it is dead, because the whole key never appears anywhere**. The CSS
  audit's 72 included 18 assembled the same way (`'gc-band-' + band.hue`). So: a key or class
  built by concatenation needs the PREFIX grepped, not the name.
- **Deleting dead code is proved, not argued.** `scratchpad/snap.js` renders every page in both
  languages with `reducedMotion: 'reduce'` and `cmp.js` compares the sets byte for byte. Run it
  against two captures of the SAME build first: that self-test is what found Word Match and one
  hub render to be nondeterministic (randomised sparks, a shuffled deck), and without excluding
  those five views every later "nothing changed" would have been a lie. 45 of 50 views are
  stable; `tests/word-match.spec.js` covers the game instead.
- **Removing dead code reveals more dead code.** Deleting `trackLabel` orphaned
  `TRACK_LABEL_KEY`, which orphaned the `grammar.foundation` / `grammar.advanced` strings. Re-run
  the audits after a removal and keep going until they are quiet, or the next audit finds what
  this one created.
- **User-facing copy makes numeric claims that silently drift from the code.** A 2026-09-02
  audit of every description/stat against the actual constants and data files found six wrong:
  Word Match's hub card said "3 minutes" (clock is 240s), Phonetics' stat counted families and
  kanji *with* the repeats phonetics-data.js has across levels (775/2,429 vs. the real
  424/1,128) and promised "a dozen" per family (median is 2), the dictionary claimed "most
  words are confirmed by more than one source" (5.5% are) and an example sentence on every
  click (36% have one), the privacy policy's data list omitted `grammar_progress` entirely,
  and the dashboard advertised password/session management that has never existed. **Changing
  a mechanic means grepping the i18n files AND the inline HTML fallbacks for the old number** —
  each string lives in both places, and MN as well as EN.
  (Exception: every i18n page's `<main>` carries the Mongolian inline and the English only in the
  strings file -- see Search results above.)
  **Deleting a page means grepping the privacy policy too.** Freetime went on 2026-10-12 and
  `privacy.html` kept disclosing it until 2026-10-25 -- it still named YouTube as a recipient
  and Google as receiving an IP address, for a page that no longer existed. That is the one
  document where a stale claim is a real problem rather than a cosmetic one. And **grep the
  Mongolian name as well**: the MN string called it `Чөлөөт цаг`, so a repo-wide search for
  "Freetime" found two files and missed the translation sitting in the third.
  **Content totals are the exception that is now enforced:** how many levels/texts each tool has is
  written once, in `progress-shared.js`, which the dashboard, home page and the score SQL (via
  `get_dashboard_stats`'s arguments) all read, and `tests/progress-totals.spec.js` fails CI if it
  disagrees with the data files or the "0 / N" placeholders. They had drifted twice before that
  (Word Match shown as 50 levels long after it had 60; Dokkai scored out of 60 texts after it had 72). Where a claim is measurable, measure
  it with `node -e` against the data file rather than trusting the existing wording.
