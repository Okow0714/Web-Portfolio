// Small helpers that more than one tool needs, written once.
//
// Before this file each of these lived as a private copy in every script that wanted it:
// escapeHtml in six files, formatTime and shuffleArray in two each, the furigana stripper in two.
// The copies had already drifted -- Word Match's shuffleArray shuffled the array it was handed
// and Grammar Connect's shuffled a copy, under the same name -- which is the kind of difference
// nobody notices until a caller is moved from one page to the other.
//
// Classic script, loaded before auth-shared.js on the pages that use it. These are function
// declarations, so each is a global that the page scripts loaded after it can call by bare name.
// A page script must not declare a function of the same name again: a second declaration
// silently replaces this one for the whole page.

// Text into something safe to put inside element content. NOT sufficient inside an attribute
// value: it leaves quotes alone. Every current caller writes element content, or an attribute
// built from this repo's own data files.
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
}

// 125 -> "02:05"
function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// Fisher-Yates, IN PLACE, and returns the same array so a call can be chained. Word Match
// relies on the in-place half (it shuffles a deck and ignores the return value); pass a copy
// when the original order still matters.
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Furigana markup down to the written form: <ruby>目<rp>(</rp><rt>め</rt><rp>)</rp></ruby> -> 目.
// <rp> goes first: its content is the fallback parenthesis, which must leave WITH the reading
// rather than stay behind as a stray "()" once <rt> is removed. Any other tag is dropped too.
function stripFurigana(str) {
    return String(str == null ? '' : str)
        .replace(/<rp>[\s\S]*?<\/rp>/gi, '')
        .replace(/<rt>[\s\S]*?<\/rt>/gi, '')
        .replace(/<\/?ruby>/gi, '')
        .replace(/<[^>]*>/g, '')
        .trim();
}
