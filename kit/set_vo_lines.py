"""python3 set_vo_lines.py <v> [gaps-json]  -> v/<v>/vo.json from urls/v<v>.txt (one URL per line, in line order)"""
import json, sys
sys.path.insert(0, '/home/claude/kit')
from vo_texts import V
v = sys.argv[1]; gaps = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}
urls = [u.strip() for u in open(f'/home/claude/kit/urls/v{v}.txt') if u.strip()]
L = V[v]; assert len(urls) == len(L), (len(urls), len(L))
lines = [{'text': l if isinstance(l, str) else l[0], 'url': u} for l, u in zip(L, urls)]
json.dump({'lines': lines, 'gaps': gaps}, open(f'/home/claude/kit/v/{v}/vo.json', 'w'), indent=1, ensure_ascii=False)
print(v, len(lines), 'lines')
