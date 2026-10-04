// Runtime error reporting. Loaded in <head> on every page, before anything else that can throw,
// because an error in a page script is exactly what this exists to catch.
//
// WHY THIS FILE EXISTS. Nothing on this site reported a JavaScript error until now. A visitor
// whose board fails to build does not file a bug -- they close the tab, and the only trace is a
// session that did nothing. Twelve closed-test devices with no visibility into them would have
// taught very little.
//
// WHY IT IS NOT SENTRY. An error-monitoring vendor learns every visitor's IP on every page load,
// which is the same cost that got the fonts and the Supabase client vendored instead of fetched
// from a CDN. The reports go to this project's own `client_errors` table instead (migration 010),
// which stores no user_id and no IP -- see that file's header for what is deliberately left out.
//
// WHY PLAIN fetch AND NOT THE SUPABASE CLIENT. This has to run before everything, and the client
// is a megabyte loaded near the end of the body. A single POST to the REST endpoint needs neither
// it nor any of auth-shared.js, so an error thrown while the page is still loading is still
// reported. The config's two constants are read lazily, at send time, for the same reason.
(function () {
    'use strict';

    var ENDPOINT = '/rest/v1/client_errors';
    // One broken selector in a render loop can throw on every frame. The cap is per page load, and
    // the seen-set stops the same error being sent twice at all.
    var MAX_PER_PAGE = 5;
    var sent = 0;
    var seen = Object.create(null);
    var version = null;

    function clip(s, n) {
        if (s === null || s === undefined) return null;
        s = String(s);
        return s.length > n ? s.slice(0, n) : s;
    }

    // The hash is the one part of a URL a visitor could have typed something into; on this site it
    // is only ever an in-page anchor, so dropping it costs nothing and guarantees it.
    function page() {
        return clip(location.pathname + location.search, 200);
    }

    // sw.js's CACHE_VERSION, taken from the cache's own name rather than copied into a constant
    // here -- a second copy of a version number is a second thing to forget to bump. A returning
    // PWA user can be one build behind (fetch is stale-while-revalidate), which is when it counts.
    function readVersion() {
        if (version !== null || !window.caches || !caches.keys) return;
        caches.keys().then(function (names) {
            for (var i = 0; i < names.length; i++) {
                if (names[i].indexOf('khan-japanese-') === 0) { version = names[i]; return; }
            }
        }).catch(function () { /* Cache Storage is unavailable in some private modes */ });
    }

    function report(message, source, stack) {
        if (sent >= MAX_PER_PAGE) return;
        var key = message + '|' + source;
        if (seen[key]) return;
        seen[key] = true;
        sent++;

        // Read at send time: supabase-config.js is a later classic script, so these are global
        // lexical bindings that may not exist yet. They are never in their temporal dead zone from
        // here -- the script either ran and initialised them, or did not run and left them
        // undeclared, which is the case `typeof` answers safely.
        if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') return;

        var body = JSON.stringify({
            page: page(),
            message: clip(message, 500) || 'unknown',
            source: clip(source, 300),
            stack: clip(stack, 4000),
            user_agent: clip(navigator.userAgent, 300),
            app_version: clip(version, 40)
        });

        try {
            fetch(SUPABASE_URL + ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
                    // The table has no select policy, so there is nothing to return anyway; this
                    // keeps PostgREST from trying.
                    'Prefer': 'return=minimal'
                },
                body: body,
                // The error may be the last thing that happens before the tab closes.
                keepalive: true
            }).catch(function () { /* a failed report must never become a second error */ });
        } catch (e) { /* likewise */ }
    }

    // Reporting from localhost would fill the table with this machine. The flag is how the send
    // path itself gets tested without deploying.
    var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    var forced = false;
    try { forced = !!localStorage.getItem('khanjp-error-report-debug'); } catch (e) { /* blocked */ }
    if (isLocal && !forced) {
        // Still expose the shape so the handlers below can be exercised in a test.
        window.__khanjpErrorReport = function (m, s, st) { console.warn('[error-report, not sent]', m, s, st); };
        return;
    }

    readVersion();
    window.__khanjpErrorReport = report;

    window.addEventListener('error', function (e) {
        // Resource load failures (a missing image) fire this too, with no `error` object. They are
        // a different kind of problem and would drown out the real ones.
        if (!e || !e.message) return;
        report(e.message, (e.filename || '') + ':' + (e.lineno || 0) + ':' + (e.colno || 0),
            e.error && e.error.stack ? e.error.stack : null);
    });

    window.addEventListener('unhandledrejection', function (e) {
        var r = e ? e.reason : null;
        var msg = r instanceof Error ? (r.name + ': ' + r.message) : ('Unhandled rejection: ' + String(r));
        report(msg, 'unhandledrejection', r instanceof Error ? r.stack : null);
    });
})();
