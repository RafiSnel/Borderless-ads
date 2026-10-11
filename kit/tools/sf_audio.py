# builds v/sf/vo.wav (dialogue + bar/sad music beds) and v/sf/mont_bed.wav (montage music, automated)
import numpy as np, subprocess, sys
SR=44100; DUR=38.4; A='/home/claude/kit/v/sf/a/'
def load(n):
    d=subprocess.run(['ffmpeg','-v','error','-i',A+n,'-ac','1','-ar',str(SR),'-f','f32le','-'],capture_output=True).stdout
    return np.frombuffer(d,np.float32).copy()
N=int(SR*DUR); vo=np.zeros(N,np.float32)
def put(buf,x,t,g=1.0):
    i=int(t*SR); x=x[:max(0,N-i)]; buf[i:i+len(x)]+=x*g
def echo(x,g=0.45):
    # low, distant, with a few slap repeats: a voice in his head
    k=np.zeros(int(SR*1.2),np.float32)
    for j,d in enumerate([0,0.18,0.37,0.6,0.85]): k[int(d*SR)]=0.8**j
    y=np.convolve(x,k)[:len(x)+int(SR*1.2)]
    # simple lowpass
    y=np.convolve(y,np.ones(9)/9,'same')
    return y*g
db=lambda d:10**(d/20)
D=[('gem1',0.4),('flame1',1.5),('fail',3.3),('laughflame',7.4),('laughgem',7.65),('card1',9.5),('again',19.5),('tomorrow',24.0),('flame3',29.6),('win',30.8),('vale',36.6)]
for n,t in D: put(vo,load(n+'.wav'),t, 1.0)
for n,t,g in [('laughgem',12.6,0.4),('card1',13.2,0.5),('card1',21.0,0.55),('laughflame',22.5,0.5),('flame2',25.2,0.0)]:
    if g: put(vo,echo(load(n+'.wav'),g),t)
def env(pts):
    ts=np.arange(N)/SR; return np.interp(ts,[p[0] for p in pts],[db(p[1]) for p in pts]).astype(np.float32)
bar=load('bar.wav'); sad=load('sad.wav')
b=np.zeros(N,np.float32); put(b,bar,0)
b2=np.zeros(N,np.float32); put(b2,bar[int(SR*8):],28.5)   # bar ambience back after the door
music = b*env([(0,-16),(7.3,-16),(7.4,-30),(9.4,-24),(10.8,-22),(11.4,-80),(38.4,-80)])
s=np.zeros(N,np.float32); put(s,sad[int(SR*0.0):],11.2)
music+= s*env([(0,-80),(11.2,-40),(11.7,-12),(15.7,-11),(15.85,-80),(38.4,-80)])
open_=vo+music
def save(x,p): subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','1','-i','-',p],input=np.clip(x,-1,1).astype(np.float32).tobytes())
save(open_,'/home/claude/kit/v/sf/vo.wav')
m=load('mont.wav'); mb=np.zeros(N,np.float32); put(mb,m,16.0)
mb*=env([(0,-80),(15.98,-80),(16.0,-6),(28.3,-6),(28.5,-20),(29.4,-22),(35.0,-22),(35.4,-9),(37.6,-9),(38.4,-60)])
save(mb,'/home/claude/kit/v/sf/mont_bed.wav')
save(b2*env([(0,-80),(28.4,-80),(28.6,-22),(38.4,-22)]),'/home/claude/kit/v/sf/bar2_bed.wav')
print('ok')
