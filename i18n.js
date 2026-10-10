// Shared language toggle engine for every page carrying the site masthead. Each page defines
// its own `I18N_STRINGS = { key: { en: "...", mn: "..." } }` object (in a <page>-i18n.js file
// loaded before this script) and marks translatable elements with data-i18n="key" (swaps
// textContent), data-i18n-html="key" (swaps innerHTML, for strings containing inline markup
// like <a> tags), or data-i18n-placeholder="key" (swaps an input's placeholder). Selection
// persists in localStorage so it carries across page loads and matches the pattern already
// used elsewhere on this site (e.g. reading progress, sound toggle state).
(function () {
    // Drawn flags for the masthead language switch. Emoji flags are not an option: the
    // regional-indicator pairs render as bare letters ("GB", "MN") on Windows.
    const FLAG_GB = '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#012169"/><path d="M0 0 L20 14 M20 0 L0 14" stroke="#fff" stroke-width="2.8"/><path d="M0 0 L20 14 M20 0 L0 14" stroke="#C8102E" stroke-width="1.5"/><path d="M10 0 V14 M0 7 H20" stroke="#fff" stroke-width="4.4"/><path d="M10 0 V14 M0 7 H20" stroke="#C8102E" stroke-width="2.4"/></svg>';
    const FLAG_MN = '<svg viewBox="0 0 20 14"><rect width="20" height="14" fill="#C4272F"/><rect x="6.67" width="6.66" height="14" fill="#015197"/><g fill="#F9CF02" transform="translate(3.35,1.5) scale(0.072)"><path d="M0 0 h10 v18 h-10z M-14 24 h38 v6 h-38z M-14 92 h38 v6 h-38z"/><path d="M5 34 l16 26 h-32z M5 86 l16 -26 h-32z"/><circle cx="5" cy="-14" r="8"/></g></svg>';

    const STORAGE_KEY = 'site-lang';

    // First-time visitors (nothing in localStorage yet) get the page's <html data-default-lang>,
    // which is "mn" on every page since 2026-09-13 -- the site is for Mongolian speakers, and a
    // shared link should not open in English. A page without the attribute falls back to English.
    // Once a visitor picks a language explicitly, that choice is sitewide and overrides any default.
    function currentLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'mn' || stored === 'en') return stored;
        return document.documentElement.dataset.defaultLang === 'mn' ? 'mn' : 'en';
    }

    function applyLang(lang) {
        const strings = window.I18N_STRINGS || {};
        document.documentElement.lang = lang === 'mn' ? 'mn' : 'en';

        // The static <title> is the page's default language (Mongolian); data-en holds the English.
        // Cache the Mongolian before the first swap, since setting document.title rewrites the element.
        const titleEl = document.querySelector('title[data-en]');
        if (titleEl) {
            if (!titleEl.dataset.mn) titleEl.dataset.mn = titleEl.textContent;
            document.title = lang === 'mn' ? titleEl.dataset.mn : titleEl.dataset.en;
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const entry = strings[el.getAttribute('data-i18n')];
            if (entry) el.textContent = entry[lang] || entry.en;
        });
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const entry = strings[el.getAttribute('data-i18n-html')];
            if (entry) el.innerHTML = entry[lang] || entry.en;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const entry = strings[el.getAttribute('data-i18n-placeholder')];
            if (entry) el.placeholder = entry[lang] || entry.en;
        });
        document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // The masthead switch names the language it would take you to, not the one you are in:
        // a control that shows the current state leaves you guessing what pressing it does.
        const other = lang === 'mn' ? 'en' : 'mn';
        document.querySelectorAll('[data-lang-switch]').forEach(btn => {
            const code = btn.querySelector('.lang-switch-code');
            if (code) code.textContent = other === 'mn' ? 'МН' : 'EN';
            // The flag names the same language the code does. Drawn, not an emoji flag: the
            // regional-indicator pairs render as bare letters on Windows.
            const flag = btn.querySelector('.lang-switch-flag');
            if (flag) flag.innerHTML = other === 'mn' ? FLAG_MN : FLAG_GB;
            const label = other === 'mn' ? 'Монгол хэл рүү шилжих' : 'Switch to English';
            btn.setAttribute('aria-label', label);
            btn.setAttribute('title', label);
        });

        document.dispatchEvent(new CustomEvent('sitelangchange', { detail: { lang } }));
    }

    // Exposed for page-specific scripts (e.g. game.js) that render dynamic text -- e.g.
    // `${window.t('board.pairsLabel')}` or reading window.siteLang() to pick a template string.
    window.siteLang = currentLang;
    window.t = function (key) {
        const strings = window.I18N_STRINGS || {};
        const entry = strings[key];
        if (!entry) return key;
        return entry[currentLang()] || entry.en;
    };
    // For strings with dynamic values, e.g. I18N_STRINGS['game.pairsCount'] = { en: '{n} / {total} pairs', mn: '...' }
    // then window.tf('game.pairsCount', { n: 3, total: 10 }).
    window.tf = function (key, vars) {
        let str = window.t(key);
        Object.keys(vars || {}).forEach(k => { str = str.split('{' + k + '}').join(vars[k]); });
        return str;
    };
    window.setSiteLang = function (lang) {
        localStorage.setItem(STORAGE_KEY, lang === 'mn' ? 'mn' : 'en');
        applyLang(currentLang());
    };

    document.addEventListener('DOMContentLoaded', () => {
        applyLang(currentLang());
        document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => window.setSiteLang(btn.dataset.lang));
        });

        document.querySelectorAll('[data-lang-switch]').forEach(btn => {
            btn.addEventListener('click', () => window.setSiteLang(window.siteLang() === 'mn' ? 'en' : 'mn'));
        });
    });
})();
