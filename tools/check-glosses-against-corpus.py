# -*- coding: utf-8 -*-
# Build-time only, like tools/build-kanji-index.js -- it reads a corpus that is deliberately
# NOT committed and writes tools/gloss-corpus-review.md.
#
#   1. fetch the human-translated en-mn corpora from OPUS into their own empty directory:
#        TED2020  https://object.pouta.csc.fi/OPUS-TED2020/v1/moses/en-mn.txt.zip
#        QED      https://object.pouta.csc.fi/OPUS-QED/v2.0a/moses/en-mn.txt.zip
#        NeuLab   https://object.pouta.csc.fi/OPUS-NeuLab-TedTalks/v1/moses/en-mn.txt.zip
#        wikimedia https://object.pouta.csc.fi/OPUS-wikimedia/v20260327/moses/en-mn.txt.zip
#        Tatoeba  https://object.pouta.csc.fi/OPUS-Tatoeba/v2026-07-08/moses/en-mn.txt.zip
#   2. python -I tools/check-glosses-against-corpus.py <that dir> .
#
# NOTHING FROM THE CORPUS IS EVER WRITTEN INTO THE REPO, which is the whole licensing point:
# TED's subtitles are CC BY-NC-ND and this site must stay commercially usable. Reading a corpus
# to check a word is not redistributing it. Do not change this script to copy text out.
# Check every Mongolian kanji gloss against what human translators actually produce.
#
# THE PIVOT. There is almost no Japanese-Mongolian parallel data (296k pairs, ~62k human), but
# English-Mongolian has 17.3M, of which 119k are human-translated. kanji-index.js already holds
# both edges: "me" is KANJIDIC2's English meanings, "mn" is this project's gloss. So for a kanji
# glossed нэг with English "one", the question becomes answerable: in 115,148 human-translated
# en-mn lines, when an English sentence says "one", do translators write something starting
# with нэг- ?
#
# STEMS ARE WORD-INITIAL PREFIXES, not exact tokens. Mongolian is agglutinative and an exact
# match misses every inflected form, which is nearly all of them -- the same method the eduge
# frequency checks used.
#
# This SHIPS NOTHING. The corpus is read and discarded, so TED's NC clause and every other
# licence here is irrelevant: none of this text enters the repo.
import io, json, os, re, sys, zipfile
from collections import Counter, defaultdict

DATA, REPO = sys.argv[1], sys.argv[2]
# 4, not 5. At 5 the checker rejected үлдэх while suggesting үлдэг- for the same kanji, and
# did the same to ахих/ахиц and орлогч/орлох: Mongolian inflection reaches further into the
# word than an English suffix does, so a 5-char stem splits forms of one verb.
STEM = 4
MIN_HITS = 3      # a gloss needs at least this many corpus hits to count as supported
MIN_LIFT = 2.0    # ...and must beat its own background rate by this much

# ---------------------------------------------------------------- corpus
lines = []
# OpenSubtitles is EXCLUDED. Its 48k lines are the largest single source here and also the
# dirtiest: the first run's suggestions were full of strings like инпн-, гншй- and збюцн-,
# which are not Mongolian words at all but artefacts of misaligned subtitle pairs. TED2020,
# QED and NeuLab are volunteer-subtitled with review, wikimedia and Tatoeba are curated.
# 67k clean lines beat 115k with a noise floor that invents vocabulary.
SKIP = {'OpenSubtitles'}
for d in sorted(os.listdir(DATA)):
    p = os.path.join(DATA, d)
    if not os.path.isdir(p) or d in SKIP:
        continue
    en = mn = None
    for root, _, files in os.walk(p):
        for fn in files:
            if fn.endswith('.en'):
                en = os.path.join(root, fn)
            elif fn.endswith('.mn'):
                mn = os.path.join(root, fn)
    if not (en and mn):
        continue
    e = io.open(en, encoding='utf-8', errors='ignore').read().splitlines()
    m = io.open(mn, encoding='utf-8', errors='ignore').read().splitlines()
    for a, b in zip(e, m):
        if a.strip() and b.strip():
            lines.append((a.lower(), b.lower()))
print('  corpus: %s human-translated en-mn lines' % format(len(lines), ','))

# ---------------------------------------------------------------- the glosses
src = io.open(os.path.join(REPO, 'kanji-index.js'), encoding='utf-8').read()
data = json.loads(src[src.index('{'):src.rindex('}') + 1])
drafts = set()
mp = os.path.join(REPO, 'tools', 'kanji-gloss-manual.json')
if os.path.exists(mp):
    raw = json.load(io.open(mp, encoding='utf-8'))
    for k, v in (raw.items() if isinstance(raw, dict) else []):
        if isinstance(v, dict) and v.get('draft'):
            drafts.add(k)
print('  glosses: %d kanji, %d flagged draft' % (len(data), len(drafts)))

# how often each kanji appears in what the site actually shows -- the impact weight
weight = Counter()
for f in ('mnjp-data.js', 'game-words.js', 'reading-texts.js'):
    fp = os.path.join(REPO, f)
    if not os.path.exists(fp):
        continue
    txt = io.open(fp, encoding='utf-8', errors='ignore').read()
    for ch in data:
        if ch in txt:
            weight[ch] += txt.count(ch)

# ---------------------------------------------------------------- index
WORD = re.compile(r"[a-z][a-z'-]+")
MWORD = re.compile(r'[Ѐ-ӿ]+')

targets = set()
for ch, v in data.items():
    for meaning in (v.get('me') or []):
        for w in WORD.findall(meaning.lower()):
            if len(w) > 2:
                targets.add(w)
print('  English meaning words to look up: %s' % format(len(targets), ','))

en_mn = defaultdict(Counter)   # english word -> Counter(mongolian stem)
en_n = Counter()               # english word -> lines containing it
bg = Counter()                 # mongolian stem -> lines containing it
for a, b in lines:
    mstems = set(t[:STEM] for t in MWORD.findall(b) if len(t) >= 3)
    for s in mstems:
        bg[s] += 1
    hits = targets.intersection(WORD.findall(a))
    for w in hits:
        en_n[w] += 1
        c = en_mn[w]
        for s in mstems:
            c[s] += 1
N = len(lines)

# ---------------------------------------------------------------- the check
unsupported, supported, nodata = [], 0, []
for ch, v in data.items():
    gloss = (v.get('mn') or '').strip()
    means = v.get('me') or []
    if not gloss or not means:
        continue
    gstems = [w[:STEM] for w in MWORD.findall(gloss.lower()) if len(w) >= 3]
    if not gstems:
        continue
    best = 0.0
    looked = False
    for meaning in means:
        for w in WORD.findall(meaning.lower()):
            if w not in en_n or en_n[w] < 5:
                continue
            looked = True
            for s in gstems:
                a = en_mn[w][s]
                if a < MIN_HITS:
                    continue
                lift = (a / en_n[w]) / max(bg[s] / N, 1e-9)
                best = max(best, lift)
    # WHAT DO TRANSLATORS WRITE INSTEAD? "No evidence" is a weak signal on its own -- KANJIDIC
    # meanings are lexicographic abstractions ("severance; decline") that rarely appear in
    # subtitle English, so a correct gloss can easily go unconfirmed. The finding with teeth is
    # a gloss with no support WHERE the corpus strongly supports a different word: that is how
    # 手 glossed савар (a paw) shows up against гар.
    alt = []
    seen = set()
    for meaning in means:
        for w in WORD.findall(meaning.lower()):
            if w not in en_n or en_n[w] < 8:
                continue
            for s, a in en_mn[w].most_common(400):
                if a < 4 or s in seen or s in gstems or bg[s] < 25:
                    continue
                lift_s = (a / en_n[w]) / max(bg[s] / N, 1e-9)
                if lift_s >= 4.0:
                    seen.add(s)
                    alt.append((lift_s, s, w))
    alt.sort(reverse=True)
    suggest = ', '.join('%s- (%.0fx via "%s")' % (s, l, w) for l, s, w in alt[:3])

    if not looked:
        nodata.append(ch)
    elif best >= MIN_LIFT:
        supported += 1
    else:
        unsupported.append((len(alt) > 0, weight[ch], ch, gloss, '; '.join(means[:2]), best,
                            ch in drafts, suggest))

unsupported.sort(reverse=True)
print()
print('  supported by the corpus : %d' % supported)
print('  NOT supported           : %d' % len(unsupported))
print('  no corpus evidence      : %d  (English too rare in 115k lines)' % len(nodata))
print()
withalt = [u for u in unsupported if u[0]]
print('  of those, %d have a DIFFERENT word strongly supported by the corpus -- read these' % len(withalt))
print('  first; the rest are simply unconfirmed, which is not the same as wrong.')
print()
print('  %-5s %-15s %-24s %s' % ('kanji', 'your gloss', 'KANJIDIC english', 'what translators write'))
for has, wgt, ch, gloss, means, lift, isdraft, sug in withalt[:28]:
    print('  %-6s %-15s %-24s %s' % (ch, gloss[:15], means[:24], sug[:58]))

out = os.path.join(REPO, 'tools', 'gloss-corpus-review.md')
with io.open(out, 'w', encoding='utf-8') as f:
    f.write('# Glosses the en-mn corpus does not support\n\n')
    f.write('Generated by scratchpad/gloss-check.py against %s human-translated en-mn lines\n' % format(N, ','))
    f.write('(OPUS: OpenSubtitles, TED2020, QED, NeuLab-TedTalks, wikimedia, Tatoeba).\n\n')
    f.write('A gloss counts as supported when, in lines whose English carries one of the\n')
    f.write('kanji\'s KANJIDIC meanings, a Mongolian word sharing the gloss\'s first %d characters\n' % STEM)
    f.write('appears at least %d times and at %.1fx its own background rate. Stems are matched as\n' % (MIN_HITS, MIN_LIFT))
    f.write('word-initial prefixes because Mongolian is agglutinative.\n\n')
    f.write('NOT a list of errors -- it is a list of glosses with no corpus evidence either way.\n')
    f.write('Ranked by how often the kanji appears in the dictionary, game and reader data.\n\n')
    f.write('| kanji | your gloss | KANJIDIC english | what translators write instead | draft |\n')
    f.write('|---|---|---|---|---|\n')
    for has, wgt, ch, gloss, means, lift, isdraft, sug in unsupported:
        f.write('| %s | %s | %s | %s | %s |\n' % (ch, gloss, means.replace('|', '/'),
                sug.replace('|', '/') or '-', 'yes' if isdraft else ''))
print('\n  written: tools/gloss-corpus-review.md  (%d rows)' % len(unsupported))
