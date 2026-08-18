// Shared language toggle engine for every page carrying the site masthead. Each page defines
// its own `I18N_STRINGS = { key: { en: "...", mn: "..." } }` object (in a <page>-i18n.js file
// loaded before this script) and marks translatable elements with data-i18n="key" (swaps
// textContent), data-i18n-html="key" (swaps innerHTML, for strings containing inline markup
// like <a> tags), or data-i18n-placeholder="key" (swaps an input's placeholder). Selection
// persists in localStorage so it carries across page loads and matches the pattern already
// used elsewhere on this site (e.g. reading progress, sound toggle state).
(function () {
    const STORAGE_KEY = 'site-lang';

    // First-time visitors (nothing in localStorage yet) get English everywhere except where a
    // page opts into a different default via <html data-default-lang="mn">, e.g. index.html's
    // Mongolian-first entrance hall. Once a visitor picks a language explicitly, that choice
    // is sitewide and overrides any page's default.
    function currentLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'mn' || stored === 'en') return stored;
        return document.documentElement.dataset.defaultLang === 'mn' ? 'mn' : 'en';
    }

    function applyLang(lang) {
        const strings = window.I18N_STRINGS || {};
        document.documentElement.lang = lang === 'mn' ? 'mn' : 'en';

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
    });
})();
