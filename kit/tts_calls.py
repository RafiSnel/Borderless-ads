"""Print per-line TTS call specs for a video as JSON lines: n, text, prev, next, lang."""
import json, sys
sys.path.insert(0, '/home/claude/kit')
from vo_texts import V
v = sys.argv[1]; L = V[v]
txt = lambda l: l if isinstance(l, str) else l[0]
for i, l in enumerate(L):
    lang = 'en' if isinstance(l, str) else l[1]
    print(json.dumps({'n': i + 1, 'text': txt(l), 'prev': txt(L[i - 1]) if i else None, 'next': txt(L[i + 1]) if i + 1 < len(L) else None, 'lang': lang}, ensure_ascii=False))
