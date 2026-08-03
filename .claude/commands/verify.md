---
description: Independently verify recent changes across all six pages with a real browser, not self-reports
---

Verify the site's current state with Playwright against a real local server. Do not report
success from reading code or trusting a prior self-report (yours or an agent's) — actually
render the pages. If `$ARGUMENTS` names specific pages or a specific feature, focus there but
still run the baseline checks below on all six pages; otherwise cover everything.

## Setup

Check whether a local server is already up before starting a new one:

```
curl -s -o /dev/null -w "%{http_code}" http://localhost:8123/index.html
```

If that doesn't return `200`, start one from the repo root: `python -m http.server 8123` in
the background. Write fresh Playwright scripts for this run rather than reusing old ones from
the scratchpad uncritically — stale scripts have previously produced false positives here.

**Use the Write tool for scratch `.js` files, not a Bash heredoc.** Windows path strings
(`C:\Users\...`) inside a `cat > file.js << 'EOF'` heredoc have repeatedly broken with
"Invalid Unicode escape sequence" on this machine. Write the file directly instead.

## Baseline, every round (index.html, game.html, phonetics.html, reading.html, privacy.html, terms.html)

At 1400×900 and 390×844:

1. **Zero console/page errors** on every page.
2. **Real horizontal overflow check**: after `window.scrollX`, do a mouse move + `page.mouse.wheel(400, 0)`, then re-read `window.scrollX`. It must stay `0`. Do **not** rely on
   `document.documentElement.scrollWidth` alone — `index.html` has a long-standing harmless
   quirk (~127px) from the header's dropdown menus that isn't real, user-facing scroll.
3. **Header**: one row, brand seal + wordmark + nav + account menu present, no leftover
   placeholder items, `.nav-current` marks the right page.
4. **Footer**: styled (not default-blue links / zero padding), full-bleed at desktop width
   (`x === 0` and `width === viewport width`), collapses sensibly at ~860px and ~560px.
5. **Auth flow**: click `#account-menu-trigger` *first* — `#auth-login-btn` lives inside the
   closed dropdown panel, and clicking it directly without opening the trigger first will
   time out on an intercepted pointer event. Then confirm `#auth-modal` opens.

## Page-specific, when touched

- **Phonetics Family**: explainer modal auto-opens on load and is triggered *only* by the
  title button / info button, never by picking an individual phonetic. JLPT hues
  (`--jlpt-n5`…`--jlpt-n1`) stay visually distinct. Switching levels from the sidebar works
  from both the family-list view and with a family tree open (the tricky case: switching
  levels while a tree is open must tear the tree down and show the new level's list, not
  leave stale state). Radial tree spokes are visible — check their `stroke` (it's an SVG
  `<line>`), not `background-color`, or you'll get a false "invisible" reading.
- **Word Match**: level select → start → 40 tiles render → matching a pair fills the example
  panel, including its furigana `<ruby>` markup.
- **Dokkai Reader**: track → level → text → reader; the floating bottom control bar must not
  overlap the passage or skipped-words panel.

## Screenshotting gotchas

- `element.screenshot()` clips exactly to that element's own bounding box. Content that
  visually renders *outside* it — like `<rt>` furigana, which sits above its parent's box —
  will look clipped in the screenshot even though nothing is actually cut off on the real
  page. If something looks clipped, re-check with a wider screenshot (the element's parent, or
  the full viewport) and the ancestor `overflow` chain before reporting it as a bug.
- Reveal-on-scroll animations (opacity/transform triggered by `IntersectionObserver`) won't
  have fired if you jump straight to `scrollIntoView()`. Scroll in a few steps with short
  waits between them if you need a screenshot of below-the-fold content.

## Reporting

List what passed and failed plainly. If something looked wrong, say whether you confirmed it's
a real bug (with a measurement or a wider screenshot) or ruled it out as a test artifact — both
are useful to say out loud, not just the failures. Don't commit or push as part of this command.
