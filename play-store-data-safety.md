# Play Console — Data Safety answers

Working notes for the Data Safety form, kept in the repo because the form has to match
`privacy.html` and the actual schema, and all three drift apart silently otherwise. Google
cross-checks the declaration against observed behaviour; **under-declaring is what causes
enforcement, over-declaring costs nothing.**

Google's category names and definitions change. Treat this as the factual account of what the
app does, and read it against the wording the Console shows you on the day.

## Account deletion URL

    https://khan-japanese.org/privacy.html#delete-account

Required because the app allows account creation. The page is reachable without installing
anything, states both routes (in-app, and by email for people who never install), lists exactly
what is deleted, and names what is outside my control. The `id` on that section is load-bearing.

In-app deletion is real, not a sign-out: `delete_own_account()` in `supabase-schema.sql` deletes
the `auth.users` row, which cascades to `profiles`, `bookmarks`, `contact_messages`,
`game_progress`, `reading_progress`, `grammar_progress` and `word_stats`.

## What the app actually collects

| Data | Google category | Linked to user | Required | Purpose |
|---|---|---|---|---|
| Email address | Personal info → Email address | yes | yes, for an account | Account management |
| Display name | Personal info → Name | yes | no (defaults to `Reader NNNN`) | App functionality |
| Contact-form messages | Messages → Other in-app messages | yes | no | App functionality (they reach me by email) |
| Level completion, best times, texts finished | App activity → App interactions | yes | no | App functionality |
| Per-word attempt counts and what was picked instead (`word_stats`) | App activity → App interactions | yes | no | App functionality, Analytics |

None of it is shared with anyone, sold, or used for ads or tracking. There is no ad SDK and no
third-party analytics SDK in the project — check `sw.js`'s `APP_SHELL` if you ever doubt it.

Nothing leaves the site on a page load any more. The typefaces and the Supabase library used to
come from fonts.gstatic.com and jsDelivr, which handed those companies every visitor's IP before
the visitor had done anything; both are now served from this origin (`fonts/`, `vendor/`). The
only outbound connection a signed-in session makes is to Supabase itself.

## The microphone — the answer to get right

This is the one worth care, because a mic permission draws far more scrutiny than app activity.

**What actually happens:** Dokkai Reader uses the browser's Web Speech API. The mic is live only
between pressing Start Reading and stopping. Chrome does not recognise speech on-device — it
streams the audio to Google's own speech service and returns a transcript. The site never
receives the audio, never records it and never stores it. The recognition step is the browser
vendor's, under the vendor's privacy policy, and is outside my control.

**Two defensible readings of the form:**

- *Not collected.* The developer never receives or stores the audio, and Google does not count
  data processed ephemerally as collected.
- *Collected, ephemeral.* The audio does leave the device because the app called an API that
  sends it, even though a third party is the one receiving it.

**Declare the second.** Tick audio as collected, mark it ephemeral/not stored, purpose App
functionality, and say in the description that recognition is performed by the browser's speech
service. It costs nothing and it cannot be read as hiding a mic. The first reading is arguable,
and "arguable" is the wrong place to be with a microphone.

**Why that does not contradict the privacy policy.** `privacy.html` lists the voice under *what
I don't collect*, because that is the literal truth: nothing reaches this site and I never
receive, record or store it. The Console form asks a different question — whether using the app
causes the data to leave the device — and there the answer is yes, because calling the Web Speech
API is what sends it. The policy describes who holds the data; the form describes what the app
sets in motion. Both are true at once, and the policy names the browser-vendor step explicitly in
two places so the two documents can be read side by side without looking evasive.

The prominent-disclosure requirement is already met in the UI: the mic hint sits above the track
list before anything starts listening, and `privacy.html` explains the vendor-streaming step in
full under "What I don't collect" and again under "Who it's shared with".

## Security practices to tick

- **Encrypted in transit** — yes. Supabase is HTTPS-only, the site is served over HTTPS.
- **Users can request data deletion** — yes, URL above.
- **Committed to Play Families policy** — only if you target children; the app doesn't, and
  `privacy.html` has a children's-privacy section saying it isn't aimed at under-13s.

## Keep in sync

Adding a table means updating **three** things, and the last audit found the policy had silently
omitted `grammar_progress` entirely:

1. `privacy.html` — the "What I collect" list, in EN and MN, in both the i18n file and the
   inline fallback.
2. This file's table.
3. The Console form.
