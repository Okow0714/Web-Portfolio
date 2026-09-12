// display-prefs.js — visual preferences that have to be applied before the first paint.
//
// Loaded from <head>, deliberately, and kept tiny. A preference that changes the page's ground
// colour has to be on the html element before anything is painted, or every visit starts with a
// flash of the theme the visitor already said they did not want.
//
// Preferences live in localStorage rather than the database: they are per-device (the same
// person may want the darker ground on a phone at night and not on a laptop), and they must work
// signed out, like everything else on this site.

(function () {
    'use strict';

    const DARKER_KEY = 'khanjp-darker';

    function read(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }

    function write(key, value) {
        try {
            if (value === null) localStorage.removeItem(key);
            else localStorage.setItem(key, value);
        } catch (e) { /* private mode */ }
    }

    function applyDarker(on) {
        // An attribute rather than a class: the pages' own token blocks sit on `body:has(...)`,
        // and an html-level attribute can outrank them from each theme file without any of them
        // having to know about the others.
        if (on) document.documentElement.setAttribute('data-contrast', 'darker');
        else document.documentElement.removeAttribute('data-contrast');
    }

    // ---- light / dark -----------------------------------------------------
    // Three states, not two: 'light' and 'dark' are the visitor's explicit choice, and no value at
    // all means follow the device. The attribute drives `color-scheme` in style.css, which is what
    // every page's light-dark() tokens resolve against -- so a page flips theme without any of the
    // theme files knowing the switch exists.
    //
    // Set here, in <head>, for the same reason as the contrast preference: on the element before
    // the first paint, or a visitor whose phone is in night mode gets a white flash on every load.
    const THEME_KEY = 'khanjp-theme';

    function applyTheme(mode) {
        if (mode === 'light' || mode === 'dark') document.documentElement.setAttribute('data-theme', mode);
        else document.documentElement.removeAttribute('data-theme');
    }

    applyTheme(read(THEME_KEY));
    applyDarker(read(DARKER_KEY) === '1');

    // null = follow the device
    window.getTheme = () => {
        const v = read(THEME_KEY);
        return v === 'light' || v === 'dark' ? v : null;
    };
    // What the visitor is actually looking at right now, chosen or inherited.
    window.getEffectiveTheme = function () {
        const chosen = window.getTheme();
        if (chosen) return chosen;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    window.setTheme = function (mode) {
        const next = (mode === 'light' || mode === 'dark') ? mode : null;
        write(THEME_KEY, next);
        applyTheme(next);
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next, effective: window.getEffectiveTheme() } }));
    };
    // Following the device means reacting when the device changes, mid-visit.
    if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onSystem = () => { if (!window.getTheme()) document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: null, effective: window.getEffectiveTheme() } })); };
        if (mq.addEventListener) mq.addEventListener('change', onSystem);
    }

    window.getDarkerTheme = () => read(DARKER_KEY) === '1';
    window.setDarkerTheme = function (on) {
        write(DARKER_KEY, on ? '1' : null);
        applyDarker(on);
        document.dispatchEvent(new CustomEvent('displayprefchange', { detail: { darker: on } }));
    };
})();
