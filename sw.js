// Service worker for the Khan Japanese PWA. Precaches the app shell (pages, styles, non-data
// JS) so the site opens instantly and works offline; the large per-tool data files
// (phonetics-data.js ~2.8MB, game-words.js ~1.4MB, mnjp-data.js ~1.4MB, reading-texts.js
// ~1.1MB, grammar-data.js ~545KB, dictionary-data.js ~185KB, kanji-index.js ~167KB,
// grammar-index.js ~381KB,
// dictionary-crosslink.js ~111KB)
// are deliberately left out of the
// precache list -- eagerly downloading several MB on first install would be a bad experience on
// mobile data. Those get cached lazily instead, the first time each one is actually requested
// (see the runtime fetch handler below), so only the tools someone actually opens end up cached.
//
// Bump CACHE_VERSION whenever APP_SHELL's file list changes (new page added, a file renamed) --
// install() below uses cache.addAll(), which is atomic: one 404 in the list (this happened for
// real -- portfolio.css lingered here well after that file was renamed to hub.css) fails the
// whole install silently (pwa-register.js swallows the rejection), leaving the PWA never
// actually installed rather than installed-but-slightly-stale. A version bump forces every
// client through a fresh install with the corrected list; activate() then deletes the old,
// possibly-broken cache.
// NETWORK FIRST (2026-11-20). fetch() below used to be stale-while-revalidate: the cached copy
// was served first and refreshed behind it, so every page showed its OLD version once after
// each deploy and needed its own manual refresh. Now an online visitor always gets the current
// file (revalidated with `cache: 'no-cache'`, which also skips GitHub Pages' 10-minute
// max-age -- an unchanged file costs one 304), and the cache is only the offline fallback, or
// what is shown if the network has not answered within NET_TIMEOUT. activate() reloads open
// pages once when a new worker replaces an old one, so a visitor still on the old worker is
// moved across without touching anything. Bumping CACHE_VERSION is no longer needed for content
// changes, only for APP_SHELL list changes.
const CACHE_VERSION = 'khan-japanese-v244';
const NET_TIMEOUT = 4000;

const APP_SHELL = [
    './',
    './index.html',
    './path.html',
    './path-kana.html',
    './path-n5.html',
    './path-n4.html',
    './path-n3.html',
    './path-n2.html',
    './path-n1.html',
    './origins.html',
    './about.html',
    './game.html',
    './phonetics.html',
    './reading.html',
    './grammar.html',
    './dictionary.html',
    './dashboard.html',
    './settings.html',
    './credits.html',
    './privacy.html',
    './terms.html',
    './reset-password.html',
    './style.css',

    // Vendored third-party assets. These used to come from fonts.gstatic.com and jsDelivr,
    // which meant the typography and the auth client both depended on someone else's CDN --
    // and told that CDN a visitor's IP on every page load. Precached like any other shell file.
    './fonts/fonts.css',
    './fonts/fraunces-6NUu8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib14c0qv86Rg.woff2',
    './fonts/fraunces-6NUu8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib14c1qv86Rg.woff2',
    './fonts/fraunces-6NUu8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib14c7qv8.woff2',
    './fonts/prata-6xKhdSpbNNCT-sWCCm7JLQ.woff2',
    './fonts/prata-6xKhdSpbNNCT-sWLCm7JLQ.woff2',
    './fonts/prata-6xKhdSpbNNCT-sWPCm4.woff2',
    './fonts/ibmplexsans-zYXzKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1syxQKYbABA.woff2',
    './fonts/ibmplexsans-zYXzKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1syxRKYbABA.woff2',
    './fonts/ibmplexsans-zYXzKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1syxTKYbABA.woff2',
    './fonts/ibmplexsans-zYXzKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1syxaKYbABA.woff2',
    './fonts/ibmplexsans-zYXzKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1syxdKYbABA.woff2',
    './fonts/ibmplexsans-zYXzKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1syxeKYY.woff2',
    './vendor/supabase.min.js',
    './hub.css',
    './path.css',
    './origins.css',
    './tutorial.css',
    './about.css',
    './game.css',
    './phonetics.css',
    './reading.css',
    './grammar.css',
    './dictionary.css',
    './dashboard.css',
    './settings.css',
    './legal.css',
    './manifest.json',
    './favicon.svg',
    './icons/brand-mark.svg',
    './icons/marks.svg',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-512-maskable.png',
    './origins.js',
    './tutorial.js',
    './tutorial-i18n-strings.js',
    './path-i18n-strings.js',
    './origins-i18n-strings.js',
    './pwa-register.js',
    './i18n.js',
    './i18n-strings-shared.js',
    './display-prefs.js',
    './error-report.js',
    './reading-style.js',
    './shared-utils.js',
    './auth-shared.js',
    './word-stats.js',
    './supabase-config.js',
    './supabase-app.js',
    './progress-shared.js',
    './about.js',
    './particles.js',
    './music-player.js',
    './audio-prefs.js',
    './game-audio.js',
    './game-core.js',
    './game-fx.js',
    './game-gate.js',
    './game-memory.js',
    './game.js',
    './phonetics.js',
    './kana-match.js',
    './phonetics-quiz-data.js',
    './reading.js',
    './desk-sfx.js',
    './grammar.js',
    './dictionary.js',
    './dashboard.js',
    './settings.js',
    './hub-i18n-strings.js',
    './game-i18n-strings.js',
    './phonetics-i18n-strings.js',
    './reading-i18n-strings.js',
    './grammar-i18n-strings.js',
    './dictionary-i18n-strings.js',
    './dashboard-i18n-strings.js',
    './settings-i18n-strings.js',
    './credits-i18n-strings.js',
    './privacy-i18n-strings.js',
    './terms-i18n-strings.js',
    './reset-password-i18n-strings.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll(APP_SHELL.map((u) => new Request(u, { cache: 'reload' }))))
            .then(() => self.skipWaiting())
    );
});

// Replacing an OLDER worker (an old cache exists) reloads every open page once, so a visitor
// moves to the new version without refreshing. It has to happen here, not in pwa-register.js:
// the first page after a deploy is still the old worker's, carrying the old copy of that file.
// A first-ever install finds no old cache and reloads nothing.
self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const old = (await caches.keys()).filter((n) => n !== CACHE_VERSION);
        await Promise.all(old.map((n) => caches.delete(n)));
        await self.clients.claim();
        if (!old.length) return;
        // Not awaited: a reload's own request waits for this activation to finish, so waiting
        // for the reload here would deadlock (it did, in testing).
        const pages = await self.clients.matchAll({ type: 'window' });
        pages.forEach((c) => c.navigate(c.url).catch(() => {}));
    })());
});

// Network first, cache as the fallback. Non-GET (Supabase auth/API calls) and cross-origin
// requests are left to the browser.
self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.open(CACHE_VERSION).then(async (cache) => {
            const cached = await cache.match(request);
            const network = fetch(new Request(request, { cache: 'no-cache' })).then((response) => {
                if (response && response.ok) cache.put(request, response.clone());
                return response;
            });
            if (!cached) return network;
            // A slow connection still gets the page: whichever comes first, the network or the
            // timeout. A network failure falls back to the cached copy.
            const timeout = new Promise((resolve) => setTimeout(() => resolve(cached), NET_TIMEOUT));
            return Promise.race([network.catch(() => cached), timeout]);
        })
    );
});
