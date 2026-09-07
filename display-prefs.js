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

    applyDarker(read(DARKER_KEY) === '1');

    window.getDarkerTheme = () => read(DARKER_KEY) === '1';
    window.setDarkerTheme = function (on) {
        write(DARKER_KEY, on ? '1' : null);
        applyDarker(on);
        document.dispatchEvent(new CustomEvent('displayprefchange', { detail: { darker: on } }));
    };
})();
