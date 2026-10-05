# Smooth vertical story film from wide stills: sub-pixel Lanczos warps, eased motion, crossfades.
import cv2, numpy as np, subprocess, sys
W,H,FPS=720,1280,30
SHOT,XF,FADE=3.4,0.8,0.5
# (render, centre-x start, centre-x end, zoom start, zoom end); centre as a fraction of width.
# Windows stay clear of the portrait frames on 01 (x>.70), 10 (x>.75), 04 (x>.87) and 03 (x .44-.55).
# Logo screens on 02, 04, 08, 09 are blanked first (c??.png, see blank3.py).
shots=[(1,.24,.38,1.00,1.06),(10,.22,.36,1.00,1.06),(4,.24,.40,1.02,1.08),(3,.16,.26,1.00,1.06),
       (9,.28,.44,1.00,1.06),(2,.50,.64,1.02,1.08),(8,.50,.50,1.00,1.14)]
import os
srcpath=lambda i: f"c{i:02d}.png" if os.path.exists(f"c{i:02d}.png") else f"r{i:02d}.png"
imgs={i:cv2.imread(srcpath(i),cv2.IMREAD_COLOR).astype(np.float32) for i,*_ in shots}
ease=lambda t: t*t*(3-2*t)            # smoothstep: starts and stops gently
def frame(i,cx,z,cy=.5):
    src=imgs[i]; h,w=src.shape[:2]
    wh=h/z; ww=wh*9/16; s=wh/H        # source pixels per output pixel
    x0=cx*w-ww/2; y0=cy*h-wh/2
    x0=min(max(x0,0),w-ww); y0=min(max(y0,0),h-wh)
    M=np.float32([[s,0,x0],[0,s,y0]])
    return cv2.warpAffine(src,M,(W,H),flags=cv2.INTER_LANCZOS4|cv2.WARP_INVERSE_MAP,borderMode=cv2.BORDER_REFLECT)
total=len(shots)*SHOT-(len(shots)-1)*XF
n=round(total*FPS)
out=sys.argv[1]; crf=sys.argv[2]
p=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{W}x{H}','-r',str(FPS),'-i','-',
   '-c:v','libx264','-preset','slow','-crf',crf,'-profile:v','high','-pix_fmt','yuv420p','-movflags','+faststart',out],stdin=subprocess.PIPE)
for f in range(n):
    t=f/FPS; acc=np.zeros((H,W,3),np.float32); wsum=0
    for k,(i,c0,c1,z0,z1) in enumerate(shots):
        a=k*(SHOT-XF); b=a+SHOT
        if t<a or t>b: continue
        u=ease((t-a)/SHOT)
        wgt=1.0
        if k>0 and t<a+XF: wgt=ease((t-a)/XF)
        if k<len(shots)-1 and t>b-XF: wgt=min(wgt,1-ease((t-(b-XF))/XF))
        acc+=wgt*frame(i,c0+(c1-c0)*u,z0+(z1-z0)*u); wsum+=wgt
    img=acc/max(wsum,1e-6)
    g=min(1,t/FADE,(total-t)/FADE)      # fade in/out from black
    p.stdin.write(np.clip(img*max(g,0),0,255).astype(np.uint8).tobytes())
p.stdin.close(); p.wait(); print(out, n, 'frames', round(total,2),'s')
