# Replace the PeopleLink logo screens with a switched-off display.
# Above `line` the whole screen is replaced; below it only screen-coloured pixels and stray
# wordmark pixels outside the chairs, so chairs and microphone arms in front stay as rendered.
import cv2, numpy as np
cfg={
 2:dict(quad=[[1187,348],[1185,580],[855,569],[855,353]],line=544,chairs=[(906,549,1000,600),(1047,544,1127,600)]),
 4:dict(quad=[[32,417],[228,434],[227,529],[31,558]],line=None,chairs=[]),
 8:dict(quad=[[943,445],[942,582],[701,583],[701,444]],line=None,chairs=[]),
 9:dict(quad=[[969,485],[969,592],[935,614],[772,609],[772,487]],line=594,chairs=[]),
}
tiles=[]
for i,c in cfg.items():
    im=cv2.imread(f"r{i:02d}.png"); H,W=im.shape[:2]; hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV)
    q=np.array(c['quad'],np.int32)
    scr=np.zeros((H,W),np.uint8); cv2.fillPoly(scr,[q],255); scr=cv2.erode(scr,np.ones((3,3),np.uint8))
    teal=cv2.dilate(cv2.inRange(hsv,(75,25,20),(110,255,170)),np.ones((3,3),np.uint8))
    white=cv2.inRange(hsv,(0,0,170),(180,40,255))
    m=scr.copy()
    if c['line']:
        below=np.zeros((H,W),np.uint8); below[c['line']:]=255
        chairs=np.zeros((H,W),np.uint8)
        for x0,y0,x1,y1 in c['chairs']: chairs[y0:y1,x0:x1]=255
        lower=(teal | (white & ~chairs)) & below & scr
        m=(scr & ~below) | lower
    x,y,w,h=cv2.boundingRect(q)
    yy,xx=np.mgrid[0:H,0:W].astype(np.float32)
    s=np.clip((xx-x)/w*0.6+(yy-y)/h*0.4,0,1)
    panel=np.dstack([25+9*(1-s),24+8*(1-s),23+7*(1-s)])
    a=cv2.GaussianBlur(m.astype(np.float32)/255,(3,3),0)[...,None]
    out=(im*(1-a)+panel*a).astype(np.uint8); cv2.imwrite(f"c{i:02d}.png",out)
    cr=out[y-25:y+h+25,x-25:x+w+25]; cr=cv2.resize(cr,(420,int(420*cr.shape[0]/cr.shape[1])))
    tiles.append(cv2.copyMakeBorder(cr,0,max(0,320-cr.shape[0]),0,0,cv2.BORDER_CONSTANT)[:320])
cv2.imwrite("screens-after.jpg",np.hstack(tiles))
