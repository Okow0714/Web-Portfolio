# Regression tests

Plain Node scripts driven by Playwright — deliberately **not** an npm project (no
`package.json` here or anywhere in the repo; this site has no build step and these tests don't
introduce one). Each `tests/*.spec.js` file is a self-contained script: it starts from a running
local server, drives a real browser, asserts with Node's built-in `assert`, and exits non-zero on
failure. `run-all.js` starts the server, runs every spec in turn, and reports a summary.

## Running locally

```
npm install --no-save playwright
./node_modules/.bin/playwright install --with-deps chromium
node tests/run-all.js
```

`--no-save` matters: this repo has no `package.json` and isn't meant to gain one just for
tests -- npm can still install straight into a local `node_modules/` (gitignored) without one.
`npx playwright install` alone isn't enough for this setup: it fetches the CLI into npx's own
cache, which `require('playwright')` from a plain `node tests/run-all.js` can't resolve: the
package itself has to land in a real `node_modules/` for Node's normal resolution to find it.
Same two commands run in CI, see `.github/workflows/tests.yml`.

## Adding a test

Copy the shape of an existing spec: a `run(page, assert)` async function that throws (or lets
an `assert` call throw) on failure, exported as the module's default. `run-all.js` handles
server lifecycle, browser lifecycle, and reporting — a spec only needs to describe what "correct"
looks like for the one thing it's testing.
