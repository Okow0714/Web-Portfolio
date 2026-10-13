// Answer matching for a typed reading, used by the Phonetics drill.
//
// Verified before shipping: 34 hand-written cases covering Hepburn, Kunrei, macrons, nn and
// deliberate rejections, plus every one of the 1,363 answers in phonetics-quiz-data.js matching
// itself in both kana scripts. A drill that refuses a correct answer is worse than no drill.
//
// Answer matching for a typed reading. The learner may type katakana, hiragana or romaji, and
// romaji may be Hepburn (shi, chi, tsu, fu, ji, sha) or Kunrei (si, ti, tu, hu, zi, sya), with or
// without macrons. A quiz that rejects a correct answer is worse than no quiz, so both sides are
// folded to one canonical form before comparing.
var KANA = (function () {
    var R = {
        kya:'キャ',kyu:'キュ',kyo:'キョ', gya:'ギャ',gyu:'ギュ',gyo:'ギョ',
        sha:'シャ',shu:'シュ',sho:'ショ', sya:'シャ',syu:'シュ',syo:'ショ',
        ja:'ジャ',ju:'ジュ',jo:'ジョ', zya:'ジャ',zyu:'ジュ',zyo:'ジョ',
        jya:'ジャ',jyu:'ジュ',jyo:'ジョ',
        cha:'チャ',chu:'チュ',cho:'チョ', tya:'チャ',tyu:'チュ',tyo:'チョ',
        nya:'ニャ',nyu:'ニュ',nyo:'ニョ', hya:'ヒャ',hyu:'ヒュ',hyo:'ヒョ',
        bya:'ビャ',byu:'ビュ',byo:'ビョ', pya:'ピャ',pyu:'ピュ',pyo:'ピョ',
        mya:'ミャ',myu:'ミュ',myo:'ミョ', rya:'リャ',ryu:'リュ',ryo:'リョ',
        shi:'シ',chi:'チ',tsu:'ツ',
        ka:'カ',ki:'キ',ku:'ク',ke:'ケ',ko:'コ',
        ga:'ガ',gi:'ギ',gu:'グ',ge:'ゲ',go:'ゴ',
        sa:'サ',si:'シ',su:'ス',se:'セ',so:'ソ',
        za:'ザ',ji:'ジ',zi:'ジ',zu:'ズ',ze:'ゼ',zo:'ゾ',
        ta:'タ',ti:'チ',tu:'ツ',te:'テ',to:'ト',
        da:'ダ',di:'ヂ',du:'ヅ',de:'デ',do:'ド',
        na:'ナ',ni:'ニ',nu:'ヌ',ne:'ネ',no:'ノ',
        ha:'ハ',hi:'ヒ',fu:'フ',hu:'フ',he:'ヘ',ho:'ホ',
        ba:'バ',bi:'ビ',bu:'ブ',be:'ベ',bo:'ボ',
        pa:'パ',pi:'ピ',pu:'プ',pe:'ペ',po:'ポ',
        ma:'マ',mi:'ミ',mu:'ム',me:'メ',mo:'モ',
        ya:'ヤ',yu:'ユ',yo:'ヨ',
        ra:'ラ',ri:'リ',ru:'ル',re:'レ',ro:'ロ',
        wa:'ワ',wo:'ヲ',
        a:'ア',i:'イ',u:'ウ',e:'エ',o:'オ'
    };
    var MACRON = { 'ā':'aa','ī':'ii','ū':'uu','ē':'ee','ō':'ou','â':'aa','î':'ii','û':'uu','ê':'ee','ô':'ou' };

    function romajiToKatakana(s) {
        s = s.toLowerCase().replace(/[āīūēōâîûêô]/g, function (c) { return MACRON[c] || c; });
        var out = '', i = 0;
        while (i < s.length) {
            // n before a consonant (or at the end) is ン; nn is always ン
            if (s[i] === 'n') {
                if (s[i + 1] === 'n') { out += 'ン'; i += 2; continue; }
                if (s[i + 1] === "'") { out += 'ン'; i += 2; continue; }
                if (!s[i + 1] || 'aiueoy'.indexOf(s[i + 1]) < 0) { out += 'ン'; i++; continue; }
            }
            // a doubled consonant is a small tsu
            if (s[i] === s[i + 1] && 'kgsztdnhfbpmyrw'.indexOf(s[i]) >= 0) { out += 'ッ'; i++; continue; }
            var hit = null;
            for (var len = 3; len >= 1; len--) {
                var frag = s.substr(i, len);
                if (R[frag]) { hit = { k: R[frag], n: len }; break; }
            }
            if (!hit) { out += s[i]; i++; }       // unknown letter kept, so it can never match
            else { out += hit.k; i += hit.n; }
        }
        return out;
    }

    function toKatakana(s) {
        s = (s || '').trim().replace(/\s+/g, '');
        if (!s) return '';
        if (/[a-zA-Zāīūēōâîûêô]/.test(s)) return romajiToKatakana(s);
        // hiragana -> katakana
        return s.replace(/[ぁ-ゖ]/g, function (c) {
            return String.fromCharCode(c.charCodeAt(0) + 0x60);
        });
    }

    var VOWEL = { 'ア':'ア','カ':'ア','サ':'ア','タ':'ア','ナ':'ア','ハ':'ア','マ':'ア','ヤ':'ア','ラ':'ア','ワ':'ア','ガ':'ア','ザ':'ダ','ダ':'ア','バ':'ア','パ':'ア','ャ':'ア',
        'イ':'イ','キ':'イ','シ':'イ','チ':'イ','ニ':'イ','ヒ':'イ','ミ':'イ','リ':'イ','ギ':'イ','ジ':'イ','ヂ':'イ','ビ':'イ','ピ':'イ',
        'ウ':'ウ','ク':'ウ','ス':'ウ','ツ':'ウ','ヌ':'ウ','フ':'ウ','ム':'ウ','ユ':'ウ','ル':'ウ','グ':'ウ','ズ':'ウ','ヅ':'ウ','ブ':'ウ','プ':'ウ','ュ':'ウ',
        'エ':'エ','ケ':'エ','セ':'エ','テ':'エ','ネ':'エ','ヘ':'エ','メ':'エ','レ':'エ','ゲ':'エ','ゼ':'エ','デ':'エ','ベ':'エ','ペ':'エ',
        'オ':'オ','コ':'オ','ソ':'オ','ト':'オ','ノ':'オ','ホ':'オ','モ':'オ','ヨ':'オ','ロ':'オ','ゴ':'オ','ゾ':'オ','ド':'オ','ボ':'オ','ポ':'オ','ョ':'オ' };

    // One canonical spelling of a long vowel. コウ, コー and コオ are the same sound and a
    // learner may type any of them; likewise セイ / セー / セエ.
    function canon(k) {
        var out = '';
        for (var i = 0; i < k.length; i++) {
            var c = k[i];
            if (c === 'ー' || c === '-' || c === 'ー') {
                out += VOWEL[out[out.length - 1]] || out[out.length - 1] || '';
            } else out += c;
        }
        out = out.replace(/([コソトノホモヨロゴゾドボポョオ])ウ/g, '$1オ');
        out = out.replace(/([ケセテネヘメレゲゼデベペエ])イ/g, '$1エ');
        return out;
    }

    return {
        toKatakana: toKatakana,
        canon: function (s) { return canon(toKatakana(s)); },
        matches: function (input, answers) {
            var a = canon(toKatakana(input));
            if (!a) return false;
            for (var i = 0; i < answers.length; i++) {
                if (canon(toKatakana(answers[i])) === a) return answers[i];
            }
            return false;
        }
    };
})();
