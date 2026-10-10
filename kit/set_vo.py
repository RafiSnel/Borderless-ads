"""python3 set_vo.py <v> <main_url> [clipUrl ...] [--gaps '{"3":0.3}']  -> writes v/<v>/vo.json"""
import json, sys
sys.path.insert(0, '/home/claude/kit')
from vo_texts import V
args = sys.argv[1:]; gaps = {}
if '--gaps' in args: i = args.index('--gaps'); gaps = json.loads(args[i + 1]); args = args[:i] + args[i + 2:]
v, main, clips = args[0], args[1], args[2:]
lines = []; ci = 0
for l in V[v]:
    if isinstance(l, str): lines.append({'text': l})
    else: lines.append({'text': l[0], 'url': clips[ci]}); ci += 1
json.dump({'main': main, 'lines': lines, 'gaps': gaps}, open(f'/home/claude/kit/v/{v}/vo.json', 'w'), indent=1, ensure_ascii=False)
print(v, len(lines), 'lines,', ci, 'clips')
