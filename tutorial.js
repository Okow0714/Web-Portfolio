// Page tours — the first-visit walkthrough that spotlights a page's real controls one at a
// time and explains them.
//
// Why coach marks rather than a modal or an inline panel: the thing a beginner needs pointed
// at is usually a control, and half of them do not exist until you are inside a level (the
// clock, the board, the mic button). A card of prose can only describe those; a spotlight can
// say "this number is your clock" while the clock is on screen. That is also the awkward part
// of the design, and most of the code below exists to handle it — see SCENES.
//
// Depends on i18n.js (window.t / sitelangchange) and tutorial-i18n-strings.js, both loaded
// first. Nothing here needs an account, so it works signed-out like the tools do.

(function () {
    'use strict';

    // ----------------------------------------------------------------------
    // Tours
    // ----------------------------------------------------------------------
    // One entry per page, each a list of *scenes*. A scene runs when its `when` element is on
    // screen for the first time, so a page can teach its level-select screen on arrival and
    // its board later, when the board finally exists. `sel: null` is a step with no target:
    // it centres itself and skips the spotlight.
    //
    // Every selector here is checked before use and a step whose element is missing is
    // dropped, so a tour never points at nothing — an ordinary consequence of shipping a
    // change to one of these pages without remembering this file.
    const TOURS = {
        'game.html': [
            { id: 'levels', when: '#level-select-section', steps: [
                { sel: '#jlpt-tabs', k: 'tour.game.tiers' },
                { sel: '#level-grid', k: 'tour.game.levels' },
                { sel: '#sound-toggle', k: 'tour.game.sound' },
            ] },
            { id: 'board', when: '#board-section', steps: [
                { sel: '#tile-grid', k: 'tour.game.board' },
                { sel: '#board-timer', k: 'tour.game.timer' },
                { sel: '.board-stats', k: 'tour.game.stats' },
                { sel: '#powerup-controls', k: 'tour.game.powerup' },
                { sel: '#board-shuffle-btn', k: 'tour.game.shuffle' },
                // The two side panels are .panel-wide-only, so these two steps drop
                // themselves on a narrow screen the same way any missing target does.
                { sel: '#panel-families', k: 'tour.game.families' },
                { sel: '#example-panel', k: 'tour.game.example' },
            ] },
        ],
        'reading.html': [
            { id: 'tracks', when: '#track-select-section', steps: [
                { sel: '#track-grid', k: 'tour.reading.tracks' },
                { sel: '.reading-mic-hint', k: 'tour.reading.mic' },
            ] },
            { id: 'reader', when: '#reader-section', steps: [
                { sel: '#reader-passage', k: 'tour.reading.passage' },
                { sel: '#reader-mic-btn', k: 'tour.reading.start' },
                { sel: '#reader-skip-btn', k: 'tour.reading.skip' },
                { sel: '#reader-progress', k: 'tour.reading.progress' },
            ] },
        ],
        'phonetics.html': [
            { id: 'families', when: '#family-list-section', steps: [
                { sel: '#phonetics-level-nav', k: 'tour.phonetics.levels' },
                { sel: '.family-item', k: 'tour.phonetics.families' },
                { sel: '#phonetics-info-btn', k: 'tour.phonetics.info' },
            ] },
            { id: 'tree', when: '#family-tree-section', steps: [
                { sel: '.tree-wrap', k: 'tour.phonetics.tree' },
                { sel: null, k: 'tour.phonetics.readings' },
            ] },
        ],
        'grammar.html': [
            { id: 'levels', when: '#gc-select-section', steps: [
                { sel: '#gc-diff-tabs', k: 'tour.grammar.tracks' },
                { sel: '#gc-level-grid', k: 'tour.grammar.levels' },
            ] },
            { id: 'match', when: '#gc-match-section', steps: [
                { sel: '#gc-progress-dots', k: 'tour.grammar.dots' },
                { sel: '#gc-sentence-jp', k: 'tour.grammar.sentence' },
                { sel: '#gc-tile-bank', k: 'tour.grammar.tiles' },
                { sel: '#gc-timer', k: 'tour.grammar.timer' },
                { sel: '.gc-topbar-stats', k: 'tour.grammar.stats' },
                { sel: '#gc-cleared-list', k: 'tour.grammar.cleared' },
                { sel: '#gc-board-sound-toggle', k: 'tour.grammar.sound' },
            ] },
        ],
        'dictionary.html': [
            { id: 'search', when: '.mnjp-entry', steps: [
                { sel: '#mnjp-search', k: 'tour.dict.search' },
                { sel: '.mnjp-entry', k: 'tour.dict.results' },
                { sel: '#dict-tab-wakan', k: 'tour.dict.wakan' },
            ] },
        ],
        'dashboard.html': [
            { id: 'overview', when: '#dash-content', steps: [
                { sel: '.dash-profile', k: 'tour.dash.profile' },
                { sel: '.dash-score-card', k: 'tour.dash.score' },
                { sel: '.dash-tool-card', k: 'tour.dash.tools' },
            ] },
        ],
    };

    // Where the "?" button is injected on each page. The masthead is byte-identical across
    // every page that carries it (see CLAUDE.md) and stays that way: the button is created
    // here and hung off the page's own title instead.
    const HELP_ANCHOR = {
        'game.html': '.game-title',
        'reading.html': '.reading-title',
        // Not .phonetics-title: that sits inside #phonetics-title-trigger, which opens the
        // info modal on click, and a button injected inside it inherits that click.
        'phonetics.html': '#phonetics-title-trigger',
        'grammar.html': '.gc-title',
        'dictionary.html': '.dict-title',
        'dashboard.html': '.dash-profile-name-row',
    };

    // The notation key: one step, shown once for the whole site rather than once per page,
    // since furigana means the same thing on all of them. It is appended to whichever tour
    // the visitor happens to meet first.
    const KEY_ROWS = [
        { sample: '<ruby>漢字<rp>(</rp><rt>かんじ</rt><rp>)</rp></ruby>', k: 'tour.key.furigana', jp: true },
        { sample: 'し = ши', k: 'tour.key.cyrillic', jp: false },
        { sample: '<span class="tour-badge" data-jlpt="N5">N5</span>', k: 'tour.key.jlpt', jp: false },
    ];

    // Each page's palette lives on its own wrapper (.game-main, .phonetics-main …), and tour
    // elements are appended to <body> to stay clear of .container's stacking context, so they
    // do not inherit it — they would render in style.css's shared light burgundy on every
    // page, which on the two dark pages is a white card floating on a black board.
    //
    // Copying the tokens across is not enough either: only phonetics.css and reading.css reuse
    // the shared *names*. game.css calls its surface --panel, grammar.css calls it --card,
    // dashboard.css --surface. So each page says which of its own tokens fill which role.
    // A page missing from this map keeps the shared names, which is what the two that reuse
    // them want anyway.
    const THEME_MAP = {
        'game.html': { '--bg-surface': '--panel', '--border': '--panel-edge', '--border-strong': '--panel-edge',
            '--text-primary': '--paper', '--text-secondary': '--paper-muted', '--text-muted': '--paper-muted',
            '--accent': '--gold' },
        'grammar.html': { '--bg-surface': '--card', '--border': '--card-edge', '--border-strong': '--card-edge',
            '--text-primary': '--ink', '--text-secondary': '--ink-soft', '--text-muted': '--ink-faint',
            '--accent': '--shu-light' },
        'dictionary.html': { '--bg-surface': '--card', '--border': '--card-edge', '--border-strong': '--card-edge',
            '--text-primary': '--ink', '--text-secondary': '--ink-soft', '--text-muted': '--ink-faint',
            '--accent': '--terracotta' },
        'dashboard.html': { '--bg-surface': '--surface', '--border': '--rule', '--border-strong': '--surface-edge',
            '--text-primary': '--ink', '--text-secondary': '--ink-soft', '--text-muted': '--ink-faint',
            '--accent': '--accent' },
    };
    const SHARED_ROLES = ['--bg-surface', '--border', '--border-strong', '--text-primary',
        '--text-secondary', '--text-muted', '--accent'];

    // Six accents ranging from a gold to a navy have to carry white or dark text and clear
    // WCAG AA either way, and simply picking the lighter of the two does not: half of them
    // land between 2:1 and 4:1 against both. So the contrast is measured and the colour is
    // walked toward black or white until it passes, which keeps each page's hue and its
    // legibility at the same time.
    const rgbOf = (str) => (str.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
    const lumOf = (c) => {
        const [r, g, b] = c.map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a, b) => {
        const x = lumOf(a), y = lumOf(b);
        return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    const css = (c) => 'rgb(' + c.map(v => Math.round(Math.min(255, Math.max(0, v)))).join(', ') + ')';

    function toward(colour, against, min) {
        if (colour.length < 3 || against.length < 3) return colour;
        const darken = lumOf(against) > lumOf(colour);
        let c = colour.slice();
        for (let i = 0; i < 30 && ratio(c, against) < min; i++) {
            c = c.map(v => (darken ? v * 0.9 : v + (255 - v) * 0.1));
        }
        return c;
    }

    // Turn a colour keyword or token value into real rgb numbers via the browser.
    function resolveColour(colour) {
        const probe = document.createElement('span');
        probe.style.color = colour;
        document.body.appendChild(probe);
        const out = rgbOf(getComputedStyle(probe).color);
        probe.remove();
        return out;
    }

    function applyTheme(nodes) {
        const wrap = document.querySelector('main[class$="-main"]') || document.querySelector('main');
        if (!wrap) return;
        const cs = getComputedStyle(wrap);
        const map = THEME_MAP[page] || {};
        let accent = '';
        SHARED_ROLES.forEach(role => {
            const v = cs.getPropertyValue(map[role] || role).trim();
            if (!v) return;
            if (role === '--accent') accent = v;
            nodes.forEach(n => n.style.setProperty(role, v));
        });
        const surface = resolveColour(cs.getPropertyValue(map['--bg-surface'] || '--bg-surface').trim() || '#fff');
        if (accent) {
            const a = resolveColour(accent);
            // Button: keep the accent as the fill and pick the ink that suits it, moving the
            // fill only if neither ink clears AA on it.
            const ink = ratio([255, 255, 255], a) >= ratio([23, 20, 15], a) ? [255, 255, 255] : [23, 20, 15];
            nodes.forEach(n => {
                n.style.setProperty('--tour-on-accent', css(ink));
                n.style.setProperty('--tour-btn-bg', css(toward(a, ink, 4.5)));
                // The accent as small text on the card is a separate problem from the accent
                // as a fill, so it gets its own adjusted value.
                n.style.setProperty('--tour-accent-text', css(toward(a, surface, 4.5)));
            });
        }
    }

    const page = (location.pathname.split('/').pop() || 'index.html');
    const scenes = TOURS[page];
    if (!scenes) return;

    const seen = (id) => { try { return localStorage.getItem('khanjp-tour-' + id) === '1'; } catch (e) { return true; } };
    const markSeen = (id) => { try { localStorage.setItem('khanjp-tour-' + id, '1'); } catch (e) { /* private mode */ } };

    // ----------------------------------------------------------------------
    // Running a scene
    // ----------------------------------------------------------------------
    let live = null;   // { steps, i, nodes } while a tour is on screen

    const visible = (el) => !!el && !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);

    function resolve(steps) {
        // A step with no selector always survives; one with a selector needs its element to
        // exist AND be visible right now.
        return steps.filter(s => !s.sel || visible(document.querySelector(s.sel)));
    }

    function buildKeyStep() {
        const rows = KEY_ROWS.map(r =>
            '<div class="tour-key-row"><span class="tour-key-sample' + (r.jp ? ' is-jp' : '') + '">' + r.sample + '</span>' +
            '<span class="tour-key-text">' + window.t(r.k) + '</span></div>').join('');
        return { sel: null, html: '<span class="tour-key-h">' + window.t('tour.key.h') + '</span>' + rows };
    }

    function start(sceneId, steps, opts) {
        if (live) end(false);
        const resolved = resolve(steps);
        if (!resolved.length) return;
        if ((opts && opts.withKey) || (!seen('key') && !(opts && opts.replay))) resolved.push(buildKeyStep());

        const scrim = document.createElement('div');
        scrim.className = 'tour-scrim';
        const ring = document.createElement('div');
        ring.className = 'tour-ring';
        const tip = document.createElement('div');
        tip.className = 'tour-tip';
        tip.setAttribute('role', 'dialog');
        tip.setAttribute('aria-modal', 'true');
        tip.setAttribute('aria-live', 'polite');
        tip.tabIndex = -1;
        applyTheme([scrim, ring, tip]);
        document.body.append(scrim, ring, tip);
        document.body.classList.add('tour-open');

        live = { sceneId, steps: resolved, i: 0, nodes: { scrim, ring, tip }, prevFocus: document.activeElement };
        paint();
        tip.focus();

        window.addEventListener('resize', reposition);
        window.addEventListener('scroll', reposition, true);
        document.addEventListener('keydown', onKey, true);
        scrim.addEventListener('click', () => end(true));
    }

    function paint() {
        if (!live) return;
        const step = live.steps[live.i];
        const { tip } = live.nodes;
        const last = live.i === live.steps.length - 1;
        const dots = live.steps.map((_, i) => '<i' + (i === live.i ? ' class="on"' : '') + '></i>').join('');

        tip.innerHTML =
            '<span class="tour-count">' + window.tf('tour.stepOf', { n: live.i + 1, total: live.steps.length }) + '</span>' +
            '<div class="tour-text">' + (step.html || window.t(step.k)) + '</div>' +
            '<div class="tour-nav"><span class="tour-dots" aria-hidden="true">' + dots + '</span>' +
            '<button type="button" class="tour-btn tour-btn-ghost" data-act="skip">' + window.t(last ? 'tour.close' : 'tour.skip') + '</button>' +
            (last ? '' : '<button type="button" class="tour-btn" data-act="next">' + window.t('tour.next') + '</button>') +
            '</div>';

        tip.querySelectorAll('[data-act]').forEach(b => {
            b.addEventListener('click', () => (b.dataset.act === 'next' ? next() : end(true)));
        });

        scrollTo(step, () => reposition());
    }

    // The masthead is fixed at 64px, so scrolling a target to the top of the viewport hides it
    // underneath. 89px is the clearance every page already reserves for that bar.
    function scrollTo(step, done) {
        if (!step.sel) { done(); return; }
        const el = document.querySelector(step.sel);
        if (!el) { done(); return; }
        const r = paintedRect(el);
        const guard = topGuard();
        const top = window.scrollY + r.top - guard - 56;
        // Only scroll when the target is actually out of sight. Reserving room for the tip
        // here meant a grid that was fully visible still scrolled, and on a short page that
        // threw the reader down to the footer for no reason.
        if (r.top < guard || r.bottom > window.innerHeight - 8) {
            window.scrollTo({ top: Math.max(0, top), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            setTimeout(done, 380);
        } else {
            done();
        }
    }

    // A ring drawn on the element's own box is wrong whenever that box is a full-width
    // container holding a short row of controls: #jlpt-tabs is 1132px wide around five tabs
    // that occupy 350 of them, so the spotlight lands on mostly empty background. Measure what
    // is actually painted instead — the union of the element's children, or of its text runs
    // when it has none — and only prefer that when it is meaningfully tighter than the box.
    // How much of the top of the viewport is covered by the fixed masthead right now. It is
    // NOT always 64px: Word Match and Grammar Connect hide the site header entirely once you
    // are inside a level, and their board toolbars then sit at y=36 — inside the reserve a
    // hardcoded 89 would keep, which pushed the ring off its target and left it floating in
    // empty space below the toolbar.
    function topGuard() {
        const h = document.querySelector('.site-header-wrap');
        if (!h) return 8;
        const cs = getComputedStyle(h);
        if (cs.display === 'none' || cs.visibility === 'hidden') return 8;
        const r = h.getBoundingClientRect();
        if (r.height === 0) return 8;
        // A static header that has scrolled away covers nothing.
        return (cs.position === 'fixed' || r.bottom > 0) ? Math.max(r.bottom + 8, 8) : 8;
    }

    const INTERACTIVE = 'button, a, input, select, textarea, summary, [role="button"]';

    function paintedRect(el) {
        const box = el.getBoundingClientRect();
        // A control's own box IS the thing you press, so never shrink one to its label: the
        // ring should sit on the button, not on the word inside it. Same for anything that
        // draws its own box -- a bordered hint, a tinted card -- where a tighter ring would
        // read as a box drawn inside a box.
        if (el.matches(INTERACTIVE)) return box;
        const cs = getComputedStyle(el);
        const painted = (cs.backgroundColor && !/^rgba\(0, 0, 0, 0\)$|^transparent$/.test(cs.backgroundColor)) ||
            parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0 ||
            (cs.backgroundImage && cs.backgroundImage !== 'none');
        if (painted) return box;
        const kids = [...el.children].filter(c => {
            const r = c.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && getComputedStyle(c).position !== 'fixed';
        });

        let rects = kids.map(c => c.getBoundingClientRect());
        if (!rects.length && el.textContent.trim()) {
            const range = document.createRange();
            range.selectNodeContents(el);
            rects = [...range.getClientRects()].filter(r => r.width > 0 && r.height > 0);
        }
        if (!rects.length) return box;

        const union = {
            left: Math.min(...rects.map(r => r.left)),
            top: Math.min(...rects.map(r => r.top)),
            right: Math.max(...rects.map(r => r.right)),
            bottom: Math.max(...rects.map(r => r.bottom)),
        };
        union.width = union.right - union.left;
        union.height = union.bottom - union.top;
        if (union.width <= 0 || union.height <= 0) return box;
        // Only take the tighter rect when it is a real improvement, so a normal block element
        // whose children fill it keeps its own box.
        const tighter = union.width < box.width * 0.82 || union.height < box.height * 0.82;
        return tighter ? union : box;
    }

    function reposition() {
        if (!live) return;
        const step = live.steps[live.i];
        const { ring, tip } = live.nodes;
        const el = step.sel ? document.querySelector(step.sel) : null;

        if (!el || !visible(el)) {
            // No target (the key card, or an element that vanished mid-tour): centre the tip
            // and hide the cutout rather than ringing the top-left corner.
            ring.classList.add('is-hidden');
            tip.classList.add('is-centred');
            tip.style.top = tip.style.left = '';
            return;
        }
        ring.classList.remove('is-hidden');
        tip.classList.remove('is-centred');

        // Clamp to what is actually on screen: a list can be thousands of pixels tall, and a
        // ring running off the bottom of the page highlights nothing.
        const raw = paintedRect(el);
        const pad = 6;
        const lit = Math.max(raw.top - pad, topGuard());
        const litEnd = Math.min(raw.bottom + pad, window.innerHeight - 12);
        // Clamp sideways as well as vertically: a panel that runs the full width of a phone
        // is wider than the viewport once padded, and the ring then hangs off both edges.
        const litL = Math.max(raw.left - pad, 2);
        const litR = Math.min(raw.right + pad, window.innerWidth - 2);
        const r = { top: lit, left: litL, width: Math.max(litR - litL, 24),
                    height: Math.max(litEnd - lit, 24), bottom: Math.max(litEnd, lit + 24) };
        ring.style.top = r.top + 'px';
        ring.style.left = r.left + 'px';
        ring.style.width = r.width + 'px';
        ring.style.height = r.height + 'px';

        // Prefer under the target; flip above when that would run off the bottom, and clamp
        // sideways so a tip never leaves the viewport on a phone.
        const tw = tip.offsetWidth, th = tip.offsetHeight, gap = 14;
        let top = r.bottom + gap;
        if (top + th > window.innerHeight - 12) {
            const above = r.top - th - gap;
            const guard = topGuard();
            top = above > guard ? above : Math.max(guard, window.innerHeight - th - 12);
        }
        let left = r.left + r.width / 2 - tw / 2;
        left = Math.max(12, Math.min(left, window.innerWidth - tw - 12));
        tip.style.top = Math.round(top) + 'px';
        tip.style.left = Math.round(left) + 'px';
    }

    function next() {
        if (!live) return;
        if (live.i >= live.steps.length - 1) { end(true); return; }
        live.i++;
        paint();
    }

    function onKey(e) {
        if (!live) return;
        if (e.key === 'Escape') { e.preventDefault(); end(true); }
        else if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
        else if (e.key === 'ArrowLeft' && live.i > 0) { e.preventDefault(); live.i--; paint(); }
        else if (e.key === 'Tab') { e.preventDefault(); live.nodes.tip.focus(); }
    }

    function end(remember) {
        if (!live) return;
        const { scrim, ring, tip } = live.nodes;
        const prev = live.prevFocus, sceneId = live.sceneId;
        window.removeEventListener('resize', reposition);
        window.removeEventListener('scroll', reposition, true);
        document.removeEventListener('keydown', onKey, true);
        [scrim, ring, tip].forEach(n => n.remove());
        document.body.classList.remove('tour-open');
        live = null;
        if (remember) { markSeen(sceneId); markSeen('key'); }
        if (prev && prev.focus) prev.focus();
    }

    // ----------------------------------------------------------------------
    // Deciding when to run
    // ----------------------------------------------------------------------
    // A scene's trigger can appear long after load — the board only exists once a level is
    // picked — so this watches the page rather than checking once. Everything is debounced to
    // one check per frame, and a scene that has run is never considered again.
    let checkQueued = false;
    function checkScenes() {
        checkQueued = false;
        injectHelp();
        if (live) return;
        // Never start on top of one of the page's own modals -- grammar's start card, the
        // auth prompt. The observer will call back when it closes.
        if ([...document.querySelectorAll('.modal-overlay')].some(visible)) return;
        for (const scene of scenes) {
            const id = page.replace('.html', '') + '-' + scene.id;
            if (seen(id)) continue;
            if (!visible(document.querySelector(scene.when))) continue;
            const steps = resolve(scene.steps);
            if (!steps.length) continue;   // trigger is up but its contents have not rendered yet
            start(id, scene.steps, {});
            return;
        }
    }
    function queueCheck() {
        if (checkQueued) return;
        checkQueued = true;
        requestAnimationFrame(checkScenes);
    }

    function injectHelp() {
        if (document.getElementById('tour-help-btn')) return;
        const anchor = document.querySelector(HELP_ANCHOR[page] || '');
        if (!anchor || document.getElementById('tour-help-btn')) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'tour-help-btn';
        btn.className = 'tour-help-btn';
        btn.innerHTML = '<span aria-hidden="true">?</span><span class="tour-help-label">' + window.t('tour.help') + '</span>';
        btn.setAttribute('aria-label', window.t('tour.help'));
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const scene = scenes.find(s => visible(document.querySelector(s.when))) || scenes[0];
            start(page.replace('.html', '') + '-' + scene.id, scene.steps, { replay: true, withKey: true });
        });
        anchor.insertAdjacentElement('afterend', btn);
        applyTheme([btn]);
    }

    function init() {
        injectHelp();
        queueCheck();
        new MutationObserver(queueCheck).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
        // Re-label the button and any live tour when the language flips.
        document.addEventListener('sitelangchange', () => {
            const btn = document.getElementById('tour-help-btn');
            if (btn) {
                btn.querySelector('.tour-help-label').textContent = window.t('tour.help');
                btn.setAttribute('aria-label', window.t('tour.help'));
            }
            if (live) paint();
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
