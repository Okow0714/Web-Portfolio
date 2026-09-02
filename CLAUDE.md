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
| `index.html` | The "entrance hall" / hub — site home, nav-brand target. Five tool cards (screenshot + description) plus a developer card linking to `about.html` and a home-page dictionary search bar + Dashboard progress widget for signed-in visitors. `<main class="hub-main">`, themed via `hub.css` (deep wine/gold, matches the masthead). Mongolian by default (`<html data-default-lang="mn">`). |
| `about.html` | Sarantsatsral's personal "About Me" resume/portfolio page — reached via the footer's "About Me" column or the hub's developer card, not the top nav. Fully standalone: its own `about.css` (forest-teal "Field Dossier" theme), no shared `style.css`, no masthead/footer, a sticky left index-rail layout instead. English only, no i18n. Has its own compact account popover (`.about-account*` classes) rather than the shared masthead's side drawer, but wired through the same `auth-shared.js` and load-bearing IDs (see Account menu below). |
| `game.html` | Word Match ("言葉合わせ") — hex-tile vocabulary matching game, JLPT N5–N1. `<main class="game-main">` / `game.css` (dark hanafuda violet/gold). |
| `phonetics.html` | Phonetics Family — kanji grouped by shared phonetic component, ranked by usage. `<main class="phonetics-main">` / `phonetics.css` (light jade/copper). |
| `grammar.html` | Grammar Connect — sentence-swap grammar drill, two tracks (foundation/advanced). `<main class="grammar-main">` / `grammar.css`. |
| `reading.html` | Dokkai Reader — speech-recognition-driven reading practice. `<main class="reading-main">` / `reading.css` (warm gold, light). |
| `dictionary.html` | Mongol-Japan Dictionary — two tabs: primary Монгол⇄日本語 (`mnjp-data.js`), secondary 漢語⇄和語 Kango/Wago (`dictionary-data.js`, lazy-loaded only when that tab opens). Reads a `?q=` URL param on load to pre-fill/filter the primary tab — the target of the home page's search bar. `<main class="dictionary-main">` / `dictionary.css`. |
| `dashboard.html` | Signed-in-only progress page — profile (avatar, editable display name), score vs. site average, per-tool level/text completion, and a link into the Settings modal for account management. `<main class="dash-main">` / `dashboard.css` (cool slate/blue utility theme). A condensed version of the score + per-tool bars also appears on `index.html`, sourced with the same Supabase queries (`hub-home.js`). |
| `privacy.html`, `terms.html` | Legal pages, plain styling via `legal.css`. |
| `credits.html` | Full data/photo/music credits for every tool, one page, `legal.css` styling like the pages above — the destination for every page's footer "Data & licensing" link. Sectioned with anchor ids (`#word-game-photos`, `#word-game-music`, `#grammar-connect-photos`, `#grammar-connect-music`) in case a page ever wants to deep-link to one part instead of the whole page. |
| `reset-password.html` | Standalone, no shared header/footer. |

## Architecture

**Shared `style.css`**: `:root` holds the light "Burgundy Editorial" tokens (used directly by
the legal pages) plus the JLPT color spectrum (`--jlpt-n5`…`--jlpt-n1`, green→wine, used
wherever a level badge or dropdown link appears — do not touch without checking all five hues
stay visually distinct). It also owns the shared masthead (`.site-header-wrap`, single-row:
言 seal + wordmark + nav + account menu, "lifted wine" `#4a2c3a`) and the shared footer
(`.site-footer`, same `--header-*` tokens as the masthead so they bookend the page): a 3-column
grid (brand, study tools, About Me), then a footer-bar whose links row includes "Data &
licensing" pointing to `credits.html` — a real page, not an inline disclosure (an earlier
version tucked the credits behind a `<details>` right in the footer; the user asked for a proper
separate page instead, both because Word Game's and Grammar Connect's full photo/music lists
made that disclosure huge, and because those two tools were *also* independently duplicating
their own credits in-page, under their level-select grids, which is what prompted consolidating
everything onto one dedicated page). Both the masthead and footer are identical across the nine
pages that carry them (every page above except `about.html`, which has no shared header/footer
at all, and `reset-password.html`); `credits.html` itself carries the masthead+footer too.

**Page-scoped theme files** (`hub.css`, `phonetics.css`, `reading.css`, `grammar.css`,
`dictionary.css`, `dashboard.css`, `game.css`, `about.css`): each defines its own token block
(same variable *names* as `style.css`'s `:root` — `--bg-page`, `--accent`, etc. — different
values) on that page's own wrapper class (see the Pages table). CSS custom-property inheritance
means every `var(--x)` in that file picks up the page-local value automatically. `about.css` is
the one exception — it doesn't load `style.css` at all, so its tokens live on a real `:root`
instead of being scoped to its wrapper class. Current palette: hub deep wine/gold (dark),
phonetics light jade/copper, reading warm gold (light), grammar its own accent, dictionary its
own accent, dashboard cool slate/blue, game dark hanafuda violet/gold, about forest-teal.
**Each page's colors and layout are deliberately distinct — don't reintroduce a shared template
between them.**

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
pinned to the bottom via `margin-top: auto`. `.lang-toggle-btn` is shared between the two
contexts it appears in (the old always-visible panel row is gone; it only lives in the Settings
modal now) — its default rule uses the masthead's `--header-*` tokens, and `.settings-lang-row
.lang-toggle-btn` overrides with page-level tokens since a modal is a sibling of
`.site-header-wrap`, not a descendant, so `--header-*` doesn't cascade there. `.auth-btn` is
shared across the account panel and every modal; the panel's copy is pinned to masthead gold via
`.site-header-wrap .account-menu-panel .auth-btn` (see `style.css`), the modals keep the page
accent. `about.html` mirrors this same ID contract (it shares `auth-shared.js`) but with its own
compact `.about-account*` markup/CSS sized for its sidebar rail rather than a full drawer.

**Large data files — never `Read` whole**: `phonetics-data.js` (~2.8MB), `game-words.js`
(~1.4MB), `mnjp-data.js` (~1.4MB, `MNJP_ENTRIES` — dictionary.html's primary tab, 3,427 words
merged from four sources, see its own header comment), `reading-texts.js` (~1.1MB),
`dictionary-data.js` (~185KB, `DICTIONARY_ENTRIES` — dictionary.html's secondary Kango⇄Wago tab,
lazy-loaded) are JS files assigning one `const` to a JSON-shaped literal. Query them with
`grep`/`node -e`, not the Read tool. To bulk-edit, parse with `JSON.parse(text after "const
NAME = ", trailing ";" stripped)`, edit, `JSON.stringify(data, null, 4)` back — this round-trips
cleanly since the files are strict JSON. (Sizes drift as content grows — treat them as
ballpark, not exact; the point is these are all too big to `Read` in one shot.) `phonetics-
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

**Supabase**: `supabase-config.js` holds the project URL and anon/publishable key (safe to
expose — access is enforced by RLS policies in `supabase-schema.sql`, not key secrecy).
`auth-shared.js` = auth/session plumbing used sitewide; `supabase-app.js` = comments,
bookmarks, account-linked contact form (depends on `auth-shared.js` having run first).

**PWA / `sw.js`**: precaches an `APP_SHELL` list (every page, its CSS, and its non-data JS —
large per-tool data files are deliberately excluded, see the file's own header) via
`cache.addAll()`, which is atomic — one 404 anywhere in the list fails the *entire* install
silently (`pwa-register.js` swallows the rejection), so the PWA just never installs rather than
installing-but-slightly-stale. Found this the hard way: `portfolio.css` lingered in the list
long after that file was renamed to `hub.css`, and `dashboard.html`/`about.html`/`credits.html`
plus their CSS/JS were simply never added when those pages shipped. **Adding a new page means
adding it (and its CSS/JS/i18n-strings file) to `APP_SHELL` and bumping `CACHE_VERSION`** — the
version bump forces every client through a fresh install with the corrected list rather than
silently keeping whatever (possibly broken) cache they already had.

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
  each string lives in both places, and MN as well as EN. Where a claim is measurable, measure
  it with `node -e` against the data file rather than trusting the existing wording.
