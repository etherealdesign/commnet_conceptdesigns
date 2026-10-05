# Per-frame global motion by phase correlation; "jitter" = median |change in velocity| (px/frame^2)
# measured only on frames where the match is confident (skips cuts and crossfades).
import cv2, numpy as np, sys
def jit(path):
    cap=cv2.VideoCapture(path); prev=None; v=[]; win=None
    while True:
        ok,f=cap.read()
        if not ok: break
        g=cv2.cvtColor(f,cv2.COLOR_BGR2GRAY).astype(np.float32)
        if win is None: win=cv2.createHanningWindow(g.shape[::-1],cv2.CV_32F)
        if prev is not None:
            (dx,dy),r=cv2.phaseCorrelate(prev,g,win)
            v.append((dx,dy,r))
        prev=g
    v=np.array(v); good=v[:,2]>0.3
    d=np.abs(np.diff(v[:,:2],axis=0)); ok=good[1:]&good[:-1]
    d=d[ok]
    if not len(d): return 'n/a'
    j=np.hypot(d[:,0],d[:,1])
    return f"jitter median {np.median(j):.3f}  p90 {np.percentile(j,90):.3f}  ({ok.sum()} pairs, w={int(cap.get(3))})"
for p in sys.argv[1:]: print(f"{p.split('/')[-1]:32s}", jit(p))
