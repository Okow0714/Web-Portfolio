// Phonetics drill — the flash-card half of the Phonetics section, on its own page.
//
// It is a separate page rather than a panel because it is a different activity: the board is for
// reading and the drill is for being tested, and the two want different amounts of screen and
// different states to come back to. Being a real page also means a round is linkable
// (phonetics-drill.html?level=N3&cp=2) and the browser's Back button does the obvious thing.
//
// It runs on phonetics-quiz-data.js (~100KB), never phonetics-data.js (~2.8MB): the only things
// a question needs are a component, the sounds it gives and its members.
//
// Answers are shared with the board through one localStorage key, so a shape answered here is
// coloured there. Reading that key is the board's business; writing it is this file's.
(function () {
    'use strict';

    var KEY = 'khanjp-phon-quiz-v1';
    var ROUND = 10;
    var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

    var root = document.getElementById('drill-root');
    if (!root || typeof PHONETICS_QUIZ === 'undefined') return;

    var params = new URLSearchParams(location.search);
    var level = params.get('level');
    if (LEVELS.indexOf(level) < 0) level = 'N5';
    var chunks = splitLevel(level);
    var cp = parseInt(params.get('cp'), 10);
    if (!(cp >= 1 && cp <= chunks.length)) cp = 1;

    var list = chunks[cp - 1];
    var kind = 'new';
    var queue = [], at = 0, ok = 0, no = 0, answered = false, mode = 'pick';

    function splitLevel(lv) {
        var all = (PHONETICS_QUIZ[lv] || []).slice();
        var n = (typeof PHONETICS_CHECKPOINTS !== 'undefined' && PHONETICS_CHECKPOINTS[lv]) || 1;
        var per = Math.ceil(all.length / n), out = [];
        for (var i = 0; i < n; i++) out.push(all.slice(i * per, (i + 1) * per));
        return out;
    }

    // ---- shared history -------------------------------------------------------------------
    function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
    function status(c) { var e = (load()[level] || {})[c]; return e ? e.last : 'new'; }
    function record(c, good) {
        try {
            var s = load();
            s[level] = s[level] || {};
            var e = s[level][c] || { hit: 0, miss: 0 };
            good ? e.hit++ : e.miss++;
            e.last = good ? 'hit' : 'miss';
            e.at = Date.now();
            s[level][c] = e;
            localStorage.setItem(KEY, JSON.stringify(s));
        } catch (e) { /* a private window can throw; the round still works, it just forgets */ }
    }
    function buckets() {
        var o = { 'new': [], miss: [], hit: [] };
        list.forEach(function (c) { o[status(c.c)].push(c); });
        return o;
    }
    function pool(k) { return k === 'all' ? list.slice() : buckets()[k].slice(); }

    function t(key, fallback) {
        return (window.t && window.t(key) !== key) ? window.t(key) : fallback;
    }
    function el(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    }

    // ---- chrome at the top of the page ----------------------------------------------------
    function drawHead() {
        var head = document.getElementById('drill-head');
        if (!head) return;
        head.textContent = '';

        var back = el('a', 'pd-back');
        back.href = 'phonetics.html?level=' + level + '&cp=' + cp;
        back.appendChild(el('span', null, '←'));
        back.appendChild(el('span', null, t('drill.back', 'Самбар руу буцах')));
        head.appendChild(back);

        var title = el('h1', 'pd-title');
        title.appendChild(el('span', 'pd-lv', level));
        var sub = chunks.length > 1
            ? t('drill.checkpoint', 'шат') + ' ' + cp + '/' + chunks.length
            : t('drill.allShapes', 'бүх хэлбэр');
        title.appendChild(el('span', 'pd-sub', sub + ' · ' + list.length + ' '
            + t('drill.shapes', 'хэлбэр')));
        head.appendChild(title);
    }

    // ---- deck picker ----------------------------------------------------------------------
    var DECKS = [
        ['new', 'drill.deckNew', 'Шинэ'],
        ['miss', 'drill.deckMiss', 'Алдсан'],
        ['hit', 'drill.deckHit', 'Мэдсэн'],
        ['all', 'drill.deckAll', 'Бүгд']
    ];

    function drawPick() {
        root.textContent = '';
        var b = buckets();

        var lead = el('p', 'pd-lead', t('drill.lead',
            'Нэг удаад 10 хэлбэр. Хэлбэрийг хараад дуудлагыг нь бичнэ — хирагана, катакана, ромажи аль нь ч болно.'));
        root.appendChild(lead);

        var grid = el('div', 'pd-decks');
        DECKS.forEach(function (d) {
            var n = d[0] === 'all' ? list.length : b[d[0]].length;
            var btn = el('button', 'pd-deck');
            btn.type = 'button';
            btn.disabled = n === 0;
            btn.setAttribute('aria-pressed', String(d[0] === kind));
            btn.appendChild(el('span', 'pd-deck-n', String(n)));
            btn.appendChild(el('span', 'pd-deck-l', t(d[1], d[2])));
            btn.addEventListener('click', function () { kind = d[0]; drawPick(); });
            grid.appendChild(btn);
        });
        root.appendChild(grid);

        var n = pool(kind).length;
        var go = el('button', 'pd-go', n >= ROUND
            ? ROUND + ' ' + t('drill.questions', 'асуулт')
            : (n ? n + ' ' + t('drill.questions', 'асуулт') : t('drill.empty', 'Багц хоосон')));
        go.type = 'button';
        go.disabled = n === 0;
        go.addEventListener('click', start);
        root.appendChild(go);

        if (chunks.length > 1) {
            var rail = el('div', 'pd-rail');
            rail.appendChild(el('span', 'pd-rail-cap', t('drill.otherCp', 'Өөр шат:')));
            chunks.forEach(function (ch, i) {
                if (i === cp - 1) return;
                var a = el('a', 'pd-rail-a', String(i + 1));
                a.href = 'phonetics-drill.html?level=' + level + '&cp=' + (i + 1);
                a.title = t('drill.checkpoint', 'шат') + ' ' + (i + 1) + ' · ' + ch.length;
                rail.appendChild(a);
            });
            root.appendChild(rail);
        }
    }

    // ---- a round --------------------------------------------------------------------------
    function start() {
        var p = pool(kind);
        for (var i = p.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1)), tmp = p[i];
            p[i] = p[j]; p[j] = tmp;
        }
        queue = p.slice(0, ROUND);
        at = 0; ok = 0; no = 0; answered = false; mode = 'quiz';
        drawCard();
    }

    function drawCard() {
        root.textContent = '';
        var c = queue[at];

        var top = el('div', 'pd-qtop');
        top.appendChild(el('span', null, (at + 1) + ' / ' + queue.length));
        var tally = el('span');
        var bOk = el('b', null, String(ok));
        var bNo = el('i', null, String(no));
        tally.appendChild(bOk);
        tally.appendChild(document.createTextNode(' · '));
        tally.appendChild(bNo);
        top.appendChild(tally);
        root.appendChild(top);

        var meter = el('div', 'pd-meter');
        var bar = el('i');
        bar.style.width = (100 * at / queue.length) + '%';
        meter.appendChild(bar);
        root.appendChild(meter);

        root.appendChild(el('p', 'pd-ask', t('drill.ask', 'Энэ хэлбэр ямар дуудлага өгдөг вэ?')));
        root.appendChild(el('p', 'pd-glyph', c.c));

        var form = el('form', 'pd-form');
        var input = el('input', 'pd-in');
        input.type = 'text';
        input.autocomplete = 'off';
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('autocapitalize', 'off');
        input.placeholder = 'せい / セイ / sei';
        input.setAttribute('aria-label', t('drill.inputLabel', 'Дуудлагыг бичнэ үү'));
        var submit = el('button', 'pd-check', t('drill.check', 'Шалгах'));
        submit.type = 'submit';
        form.appendChild(input);
        form.appendChild(submit);
        root.appendChild(form);

        var hint = el('p', 'pd-hint', t('drill.hint', 'Хирагана, катакана, ромажи — аль нь ч болно.'));
        root.appendChild(hint);
        input.focus();

        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            if (answered) {
                at++;
                answered = false;
                if (at < queue.length) drawCard(); else finish();
                return;
            }
            var hit = KANA.matches(input.value, c.s);
            answered = true;
            input.readOnly = true;
            input.className = 'pd-in ' + (hit ? 'is-ok' : 'is-no');
            hit ? ok++ : no++;
            record(c.c, !!hit);
            bOk.textContent = ok;
            bNo.textContent = no;
            bar.style.width = (100 * (at + 1) / queue.length) + '%';
            hint.textContent = (at + 1 < queue.length)
                ? t('drill.nextHint', 'Enter — дараагийх')
                : t('drill.doneHint', 'Enter — дүн');
            submit.textContent = (at + 1 < queue.length)
                ? t('drill.next', 'Дараагийх') : t('drill.result', 'Дүн');

            var v = el('div', 'pd-verdict ' + (hit ? 'is-ok' : 'is-no'));
            v.appendChild(el('p', 'pd-v-head', hit ? t('drill.right', 'Зөв') : t('drill.wrong', 'Буруу')));
            v.appendChild(el('p', 'pd-v-ans', c.s.join('、')));
            // the evidence: these are the kanji that carry the shape
            var mem = el('p', 'pd-v-mem');
            c.m.forEach(function (m) {
                var k = el('span', 'pd-v-k', m.k);
                k.style.setProperty('--pd-lv', 'var(--jlpt-' + m.lv.toLowerCase() + ')');
                k.title = m.k + ' · ' + m.lv + ' · ' + m.on.join('/') + (m.mn ? ' · ' + m.mn : '');
                mem.appendChild(k);
            });
            v.appendChild(mem);
            root.appendChild(v);
            submit.focus();
        });
    }

    function finish() {
        mode = 'done';
        root.textContent = '';
        var b = buckets();
        var s = el('p', 'pd-score');
        s.appendChild(document.createTextNode(String(ok)));
        s.appendChild(el('small', null, '/' + queue.length));
        root.appendChild(s);
        root.appendChild(el('p', 'pd-done', b.hit.length + ' ' + t('drill.deckHit', 'Мэдсэн')
            + ' · ' + b.miss.length + ' ' + t('drill.deckMiss', 'Алдсан')
            + ' · ' + b['new'].length + ' ' + t('drill.deckNew', 'Шинэ')));

        var again = el('button', 'pd-go', t('drill.again', 'Дахин 10'));
        again.type = 'button';
        again.addEventListener('click', start);
        root.appendChild(again);

        var back = el('a', 'pd-go pd-go-ghost', t('drill.toBoard', 'Самбар руу буцах'));
        back.href = 'phonetics.html?level=' + level + '&cp=' + cp;
        root.appendChild(back);

        var change = el('button', 'pd-go pd-go-ghost', t('drill.changeDeck', 'Багц солих'));
        change.type = 'button';
        change.addEventListener('click', function () { mode = 'pick'; drawPick(); });
        root.appendChild(change);
    }

    drawHead();
    drawPick();
    document.addEventListener('sitelangchange', function () {
        drawHead();
        if (mode === 'pick') drawPick();
    });
})();
