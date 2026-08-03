# Web-Portfolio

Personal portfolio + three Japanese-learning tools, built by Sarantsatsral Ganzorig.
Static site — plain HTML/CSS/JS, no bundler, no build step, no `package.json`. Backed by
Supabase (Postgres + Auth). Hosted on GitHub Pages. Git repo on `main`.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Portfolio home. Content wrapped in `<main class="portfolio-main">`. |
| `game.html` | Word Match ("言葉合わせ") — hex-tile vocabulary matching game, JLPT N5–N1. |
| `phonetics.html` | Phonetics Family — kanji grouped by shared phonetic component, ranked by usage. |
| `reading.html` | Dokkai Reader — speech-recognition-driven reading practice. |
| `privacy.html`, `terms.html` | Legal pages, plain styling via `legal.css`. |
| `reset-password.html` | Standalone, no shared header/footer. |

## Architecture

**Shared `style.css`**: `:root` holds the light "Burgundy Editorial" tokens (used directly by
the legal pages) plus the JLPT color spectrum (`--jlpt-n5`…`--jlpt-n1`, green→wine, used
wherever a level badge or dropdown link appears — do not touch without checking all five hues
stay visually distinct). It also owns the shared masthead (`.site-header-wrap`, single-row:
言 seal + wordmark + nav + account menu, "lifted wine" `#4a2c3a`) and the shared 4-column
footer (`.site-footer`, same `--header-*` tokens as the masthead so they bookend the page).
Both are identical across all six pages.

**Page-scoped theme files** (`portfolio.css`, `phonetics.css`, `reading.css`, `game.css`):
each defines its own token block (same variable *names* as `style.css`'s `:root` — `--bg-page`,
`--accent`, etc. — different values) on that page's own wrapper class (`.portfolio-main`,
`.phonetics-main`, `.reading-main`, `.game-main`). CSS custom-property inheritance means every
`var(--x)` in that file picks up the page-local value automatically. Current palette: portfolio
cool blue-gray (light), phonetics light jade/copper, reading warm gold (light), game dark
hanafuda violet/gold. **Each page's colors and layout are deliberately distinct — don't
reintroduce a shared template between them.**

**Full-bleed pattern**: the same token block is defined on both `body:has(.wrapper-class)` and
`.wrapper-class` (body is an ancestor and can't read a descendant's custom properties), then
`body:has(.wrapper) { background: var(--bg-page); }`. Without this, the shared light `:root
--bg-page` shows as margins outside `.container`'s 1200px cap on wide viewports.

**Account menu**: `auth-shared.js` wires up `#account-menu` / `#account-menu-trigger` /
`#account-menu-panel` / `#auth-anon` / `#auth-authed` / `#auth-login-btn` /
`#auth-logout-btn` / `#auth-user-email`, plus `#auth-modal` and `#account-modal`. These IDs
and their nesting (`#auth-anon`/`#auth-authed` inside `#account-menu-panel`) are load-bearing —
don't rename or re-nest without updating `auth-shared.js`. `.auth-btn` is shared across the
account panel and both modals; the panel's copy is pinned to masthead gold via
`.site-header-wrap .account-menu-panel .auth-btn` (see `style.css`), the modals keep the page
accent.

**Large data files — never `Read` whole**: `phonetics-data.js` (2.2MB), `reading-texts.js`
(980KB), `game-words.js` (424KB) are JS files assigning one `const` to a JSON-shaped literal.
Query them with `grep`/`node -e`, not the Read tool. To bulk-edit, parse with
`JSON.parse(text after "const NAME = ", trailing ";" stripped)`, edit, `JSON.stringify(data,
null, 4)` back — this round-trips cleanly since the files are strict JSON.

**Data licensing** (attributed in the shared footer): Kanjium (CC BY-SA 4.0) for kanji &
phonetic-family data, Tatoeba (CC BY / CC0) for example sentences, scriptin/kanji-frequency
(CC BY 4.0) for usage ranking, elzup/jlpt-word-list for vocabulary curation. Never republish
curated third-party content beyond what these licenses allow — only derive from raw data.

**Supabase**: `supabase-config.js` holds the project URL and anon/publishable key (safe to
expose — access is enforced by RLS policies in `supabase-schema.sql`, not key secrecy).
`auth-shared.js` = auth/session plumbing used sitewide; `supabase-app.js` = comments,
bookmarks, account-linked contact form (depends on `auth-shared.js` having run first).

## Working conventions

- **Never `git commit` or `git push` without an explicit "yes" first.** Not implied by
  approving the plan — a separate ask each time.
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
