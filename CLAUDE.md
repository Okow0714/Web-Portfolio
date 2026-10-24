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
| `grammar.html` | Grammar Connect — sentence-swap grammar drill, two tracks (foundation/advanced). `<main class="grammar-main">` / `grammar.css`. |
| `reading.html` | Dokkai Reader — speech-recognition-driven reading practice. `<main class="reading-main">` / `reading.css` (warm gold, light). |
| `dictionary.html` | Mongol-Japan Dictionary — two tabs: primary Монгол⇄日本語 (`mnjp-data.js`), secondary 漢語⇄和語 Kango/Wago (`dictionary-data.js`, lazy-loaded only when that tab opens). Reads a `?q=` URL param on load to pre-fill/filter the primary tab — the target of the home page's search bar. `<main class="dictionary-main">` / `dictionary.css`. |
| `origins.html` | Kana Origins — where hiragana and katakana came from, for a beginner who knows no kanji. `<main class="origins-main">` / `origins.css`. **Rebuilt 2026-10-23** (see Kana Origins below): four sections behind a sticky section bar, and the gojuon laid out as a wall of five vowel rows of eleven rather than the printed eleven of five. |
| `dashboard.html` | Signed-in-only progress page — profile (avatar, editable display name), score vs. site average, per-tool level/text completion, and a link into the Settings modal for account management. `<main class="dash-main">` / `dashboard.css` (cool slate/blue utility theme). This is now the **only** page showing those bars — `index.html` carried a condensed copy until the 2026-10-11 hub rebuild removed it, along with `hub-home.js`, and `tests/progress-totals.spec.js` lost its three index.html placeholder rows at the same time. |
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
grammar `#b0432f`, reading `#5f6b1f`, dictionary `#23405f` -- so the button pressed on the home
page and the page it opens are the same colour. Four of them already did this but with the seal
*deepened to 68%*, which is what made them not match, and game/origins had no block at all.
**The ground is now fixed, so the text on it had to move**: `--header-accent` is TEXT in nine
places in `style.css` (footer links and headings, nav hover, the account panel's items) and the
shared gold `#e8bd6d` manages only 3.2-3.6:1 on five of these grounds, so each page lifts it to
a pale warm gold that clears 4.5; `--header-text-muted` likewise. `--header-accent-dark` stays
**below** accent on purpose -- it is the far stop of the brand seal's gradient and a border
colour, never text, so 3:1 is its bar, and lifting it independently inverts that gradient.
Dictionary is the one seal dark enough to keep the shared gold untouched. Each page needs a
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
list a page re-renders as you type, which is why the dictionary's rows are left out. Word
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
phonetics light jade/copper, reading warm gold (light), grammar its own accent, dictionary its
own accent, dashboard cool slate/blue, game dark hanafuda violet/gold, about forest-teal,
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
accent. `about.html` mirrors this same ID contract (it shares `auth-shared.js`) but with its own
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

**Data licensing** (all attributed on `credits.html`, linked from every page's footer): Kanjium
(CC BY-SA 4.0) for kanji & phonetic-family data, Tatoeba (CC BY / CC0) for example sentences,
scriptin/kanji-frequency (CC BY 4.0) for usage ranking, elzup/jlpt-word-list for vocabulary
curation, Pixabay Music (Content License) and Wikimedia Commons (CC0/CC BY/CC BY-SA) for Word
Game's and Grammar Connect's background photos and soundtracks. Adding a new photo or music
track to either tool means adding its credit to `credits.html` too — nothing else attributes
them anymore now that the old page-local disclosures are gone. Never republish curated
third-party content beyond what these licenses allow — only derive from raw data.
The repo's own `LICENSE` splits this in two: code is MIT, but **`game-words.js`,
`phonetics-data.js` and `phonetics-kanji-index.js` are CC BY-SA 4.0** — they carry
Kanjium-derived phonetic-component data and ShareAlike is inherited by adaptations, so
they cannot be relicensed and anyone redistributing them must keep those terms. The other
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
  **Content totals are the exception that is now enforced:** how many levels/texts each tool has is
  written once, in `progress-shared.js`, which the dashboard, home page and the score SQL (via
  `get_dashboard_stats`'s arguments) all read, and `tests/progress-totals.spec.js` fails CI if it
  disagrees with the data files or the "0 / N" placeholders. They had drifted twice before that
  (Word Match shown as 50 levels long after it had 60; Dokkai scored out of 60 texts after it had 72). Where a claim is measurable, measure
  it with `node -e` against the data file rather than trusting the existing wording.
