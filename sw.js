// Service worker for the Khan Japanese PWA. Precaches the app shell (pages, styles, non-data
// JS) so the site opens instantly and works offline; the large per-tool data files
// (phonetics-data.js ~2.8MB, game-words.js ~1.4MB, mnjp-data.js ~1.4MB, reading-texts.js
// ~1.1MB, grammar-data.js ~545KB, dictionary-data.js ~185KB) are deliberately left out of the
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
// Bump it for a meaningful *content* change too, not just a list change: fetch() below is
// stale-while-revalidate, so it serves the cached copy first and only refreshes behind it --
// without a bump, a returning PWA user runs the previous version of a fixed file for one more
// visit. Whether that matters is a judgement call; for a correctness fix it generally does.
const CACHE_VERSION = 'khan-japanese-v4';

const APP_SHELL = [
    './',
    './index.html',
    './about.html',
    './game.html',
    './phonetics.html',
    './reading.html',
    './grammar.html',
    './dictionary.html',
    './dashboard.html',
    './credits.html',
    './privacy.html',
    './terms.html',
    './style.css',
    './hub.css',
    './about.css',
    './game.css',
    './phonetics.css',
    './reading.css',
    './grammar.css',
    './dictionary.css',
    './dashboard.css',
    './legal.css',
    './manifest.json',
    './favicon.svg',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-512-maskable.png',
    './script.js',
    './i18n.js',
    './i18n-strings-shared.js',
    './auth-shared.js',
    './supabase-config.js',
    './supabase-app.js',
    './hub-home.js',
    './about.js',
    './game.js',
    './phonetics.js',
    './reading.js',
    './grammar.js',
    './dictionary.js',
    './dashboard.js',
    './hub-i18n-strings.js',
    './game-i18n-strings.js',
    './phonetics-i18n-strings.js',
    './reading-i18n-strings.js',
    './grammar-i18n-strings.js',
    './dictionary-i18n-strings.js',
    './dashboard-i18n-strings.js',
    './credits-i18n-strings.js',
    './privacy-i18n-strings.js',
    './terms-i18n-strings.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((names) => Promise.all(
                names.filter((n) => n !== CACHE_VERSION).map((n) => caches.delete(n))
            ))
            .then(() => self.clients.claim())
    );
});

// Stale-while-revalidate: serve from cache immediately if we have it (fast, works offline),
// then quietly re-fetch in the background to keep the cache fresh for next time. Falls through
// to network-only for anything not GET (Supabase auth/API calls) or cross-origin.
self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.open(CACHE_VERSION).then(async (cache) => {
            const cached = await cache.match(request);
            const network = fetch(request).then((response) => {
                if (response && response.ok) cache.put(request, response.clone());
                return response;
            }).catch(() => cached);
            return cached || network;
        })
    );
});
