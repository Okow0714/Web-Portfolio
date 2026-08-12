// Service worker for the Khan Japanese PWA. Precaches the app shell (pages, styles, non-data
// JS) so the site opens instantly and works offline; the large per-tool data files
// (phonetics-data.js 2.8MB, reading-texts.js 1.1MB, game-words.js 589KB, grammar-data.js
// 543KB) are deliberately left out of the precache list -- eagerly downloading ~5MB on first
// install would be a bad experience on mobile data. Those get cached lazily instead, the first
// time each one is actually requested (see the runtime fetch handler below), so only the tools
// someone actually opens end up cached.
const CACHE_VERSION = 'khan-japanese-v1';

const APP_SHELL = [
    './',
    './index.html',
    './game.html',
    './phonetics.html',
    './reading.html',
    './grammar.html',
    './dictionary.html',
    './privacy.html',
    './terms.html',
    './style.css',
    './portfolio.css',
    './game.css',
    './phonetics.css',
    './reading.css',
    './grammar.css',
    './dictionary.css',
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
    './game.js',
    './phonetics.js',
    './reading.js',
    './grammar.js',
    './dictionary.js',
    './game-i18n-strings.js',
    './phonetics-i18n-strings.js',
    './reading-i18n-strings.js',
    './grammar-i18n-strings.js',
    './dictionary-i18n-strings.js',
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
