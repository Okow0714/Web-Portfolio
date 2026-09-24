# Putting Khan Japanese on Google Play

The site ships as a Trusted Web Activity: a thin Android wrapper that opens
`https://khan-japanese.org` full screen, with no address bar. There is no second codebase — the
app is this site, so a `git push` updates it.

## What is already in place

| Piece | State |
|---|---|
| HTTPS on a custom domain | `khan-japanese.org`, via GitHub Pages |
| `manifest.json` | name, `display: standalone`, scope, `lang: mn`, categories |
| Icons | 192, 512, and a 512 maskable (the maskable one is what Android actually uses) |
| Screenshots | 4 phone (1080x1920) + 4 desktop (1920x1080), in `images/screenshots/` |
| Service worker | `sw.js`, precaches the shell so the app opens offline |
| `.well-known/assetlinks.json` | **present, with a placeholder fingerprint — see below** |
| `_config.yml` | makes Jekyll publish `.well-known` (it skips dot-paths by default) |

## Tomorrow, in order

**1. Create the Play Console account** (one-off $25). Developer name and an address that can
receive post; Google verifies identity before the first app goes live, and that can take days, so
start it first.

**2. Generate the app** with Bubblewrap:

```
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://khan-japanese.org/manifest.json
```

When it asks for the **application ID**, use `org.khan_japanese.twa` — it must match
`package_name` in `.well-known/assetlinks.json`. Package IDs cannot contain hyphens, which is why
it is `khan_japanese` and not `khan-japanese`. It can never be changed once published.

```
bubblewrap build
```

This creates a signing key (`android.keystore`). **Back it up somewhere permanent.** Lose it and
you cannot ship an update to that listing, ever.

**3. The step that decides whether the app looks like an app.** Get the fingerprint:

```
bubblewrap fingerprint list
```

Put the SHA-256 value into `.well-known/assetlinks.json`, replacing
`REPLACE_WITH_SHA256_FINGERPRINT_OF_YOUR_UPLOAD_AND_SIGNING_KEYS`, then commit and push.

If you let Google sign the app (Play App Signing, the default and worth using), the Play Console
shows a **second** fingerprint once you upload. Both belong in the array:

```json
"sha256_cert_fingerprints": [
  "AA:BB:...  <- from bubblewrap, your upload key",
  "CC:DD:...  <- from Play Console > Setup > App signing"
]
```

Get this wrong and the app still runs — it just opens with a browser address bar across the top,
which is the thing a TWA exists to avoid. It fails silently, so verify:

```
curl https://khan-japanese.org/.well-known/assetlinks.json
```

That must return the JSON, not a 404. If it 404s, `_config.yml` did not take effect — check the
Pages build in the repo's Actions tab.

**4. Upload** the `.aab` to Play Console, fill the listing (the screenshots above are the right
sizes), and submit.

## Listing content you will be asked for

- **Privacy policy URL**: `https://khan-japanese.org/privacy.html` — required, already live.
- **Data safety form**: the site collects an email address and study progress for signed-in users,
  via Supabase. Accounts are optional; every tool works signed out. There is no advertising ID, no
  analytics SDK, no third-party tracking — the fonts and the Supabase client are self-hosted for
  exactly this reason.
- **Content rating**: an education questionnaire, no user-generated content. The comments feature
  was removed, which is what keeps the UGC answers simple — do not reintroduce it without
  re-taking the rating.
- **Target audience**: if you mark it as appealing to children, Families Policy applies and the
  bar rises a lot. "13+" is the honest and much simpler answer.

## Things that will bite

- **Updates are not automatic in the way you might expect.** Pushing to `main` updates the site,
  and the app shows it — but a returning user runs the *cached* copy for one more launch, because
  `sw.js` serves stale-while-revalidate. Bump `CACHE_VERSION` in `sw.js` for anything you need
  people to see immediately. You only need a new `.aab` when the wrapper itself changes.
- **`orientation` is `portrait-primary`** in the manifest. Word Match's board is the one thing
  that would benefit from landscape on a phone; change it there if you want it.
- **Offline is the shell, not the content.** The big word-data files are deliberately out of
  `APP_SHELL`, so a cold offline launch opens the app but the tools have no words. Worth knowing
  before someone reports it as a bug.
