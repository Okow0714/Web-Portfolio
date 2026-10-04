// Measure the Japanese in a show's subtitles, for freetime.html's "Measured" block.
//
//   node tools/freetime-metrics/measure.js <dir> [<dir> ...]
//
// Each <dir> holds one show's Japanese subtitles (.srt or .ass, nested directories are fine).
// Prints characters, kanji density, rough speech and keigo, plus the dot positions the page uses.
//
// WHY THIS FILE EXISTS. The original measurement was done once, by a script that was not kept, and
// its subtitle files are gone too. When the N1 pick was swapped in October 2026 the numbers could
// not be regenerated, and extending them with a sixth show proved impossible -- see the README.
// So the whole table was re-measured with this, and this is now the only source of those figures.
// Change the method and every number on the page has to be regenerated together, or the five dots
// on each track stop being comparable, which is the entire point of them.
'use strict';
const fs = require('fs');
const path = require('path');

// Characters counted as dialogue: kana, kanji, and the long-vowel mark.
const SPOKEN = /[぀-ゟ゠-ヿ一-龯㐀-䶿ー]/g;
// Kanji density is measured against a denominator that also includes Japanese punctuation.
const WIDE = /[぀-ゟ゠-ヿ一-龯㐀-䶿ー　-〿！-～]/g;
const KANJI = /[一-龯㐀-䶿]/g;

// Vulgar and aggressive address -- NOT grammatical casualness. じゃねえ and んだよ are how most
// anime characters speak normally; counting them would measure register rather than roughness.
const ROUGH = [/てめえ|てめー|てめぇ/g, /貴様/g, /くそ|クソ|糞/g, /ちくしょう|畜生/g,
    /ばか|バカ|馬鹿/g, /あほ|アホ|阿呆/g, /死ね/g, /野郎/g, /ふざけんな|ふざけるな/g,
    /うるせ|黙れ/g];

// 尊敬語 and 謙譲語 only. です/ます is 丁寧語 and would swamp the count by an order of magnitude.
const KEIGO = [/ございま|ございませ/g, /いらっしゃ/g, /おっしゃ/g, /なさい(?!な)|なさる|なさっ/g,
    /召し上が/g, /ご覧/g, /伺(う|い|っ|わ)/g, /申し上げ|申しま/g, /存じ/g,
    /いたしま|致しま/g, /拝見/g, /承知/g, /かしこまり/g];

function fromSrt(text) {
    const out = [];
    for (const block of text.replace(/\r\n/g, '\n').split(/\n\s*\n/)) {
        const lines = block.split('\n').filter(l => l.trim());
        const ts = lines.find(l => /\d{2}:\d{2}:\d{2}[,.]\d{3}\s*-->/.test(l));
        if (!ts) continue;
        const body = lines.slice(lines.indexOf(ts) + 1).join('\n')
            .replace(/<[^>]*>/g, '').replace(/\{[^}]*\}/g, '').replace(/♪/g, '');
        if (body.trim()) out.push(body);
    }
    return out;
}

// "Dialogue: 0,0:00:12.34,0:00:14.56,Style,Name,0,0,0,,the text"
function fromAss(text) {
    const out = [];
    for (const line of text.replace(/\r\n/g, '\n').split('\n')) {
        if (!line.startsWith('Dialogue:')) continue;
        const p = line.slice(9).split(',');
        if (p.length < 10) continue;
        const body = p.slice(9).join(',')
            .replace(/\{[^}]*\}/g, '').replace(/\\N|\\n/g, '\n').replace(/♪/g, '');
        if (body.trim()) out.push(body);
    }
    return out;
}

function read(file) {
    const raw = fs.readFileSync(file);
    if (raw[0] === 0xFF && raw[1] === 0xFE) return raw.toString('utf16le');
    return raw.toString('utf8').replace(/^﻿/, '');
}

function measure(dir) {
    const files = [];
    (function walk(d) {
        for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
            const full = path.join(d, entry.name);
            if (entry.isDirectory()) walk(full);
            else if (/\.(srt|ass)$/i.test(entry.name)) files.push(full);
        }
    })(dir);
    if (!files.length) throw new Error('no .srt or .ass files under ' + dir);

    let spoken = 0, wide = 0, kanji = 0, all = '';
    for (const file of files.sort()) {
        const parse = /\.ass$/i.test(file) ? fromAss : fromSrt;
        for (const line of parse(read(file))) {
            const n = (line.match(SPOKEN) || []).length;
            if (!n) continue;
            spoken += n;
            wide += (line.match(WIDE) || []).length;
            kanji += (line.match(KANJI) || []).length;
            all += line + '\n';
        }
    }
    const per10k = list => {
        let hits = 0;
        for (const re of list) hits += (all.match(re) || []).length;
        return hits / spoken * 10000;
    };
    return {
        episodes: files.length,
        chars: spoken,
        kanji: kanji / wide * 100,
        rough: per10k(ROUGH),
        keigo: per10k(KEIGO),
    };
}

// The page maps each metric linearly onto the track, lowest value at 9.7% and highest at 90.3%.
const LO = 9.7, HI = 90.3;
function positions(values) {
    const min = Math.min(...values), max = Math.max(...values);
    return values.map(v => (max === min ? (LO + HI) / 2 : LO + (v - min) / (max - min) * (HI - LO)));
}

const dirs = process.argv.slice(2);
if (!dirs.length) {
    console.error('usage: node tools/freetime-metrics/measure.js <subtitle-dir> [...]');
    console.error('give the five picks in N5..N1 order to get the dot positions too');
    process.exit(1);
}

const results = dirs.map(d => ({ dir: path.basename(d), ...measure(d) }));

console.log('  show                      eps    chars    kanji   rough   keigo');
for (const r of results) {
    console.log('  ' + r.dir.slice(0, 24).padEnd(25) + String(r.episodes).padStart(4)
        + (Math.round(r.chars / 1000) + 'k').padStart(9)
        + (r.kanji.toFixed(1) + '%').padStart(8)
        + r.rough.toFixed(1).padStart(8) + r.keigo.toFixed(1).padStart(8));
}

if (results.length === 5) {
    console.log('\n  dot positions (left:%, in the order given)');
    for (const key of ['kanji', 'rough', 'keigo']) {
        console.log('    ' + key.padEnd(6) + positions(results.map(r => r[key])).map(p => p.toFixed(1) + '%').join('  '));
    }
}
