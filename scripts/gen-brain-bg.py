"""
Run once: pip install Pillow numpy && python scripts/gen-brain-bg.py
Generates public/neural-brain-bg.png (2048x1152)
"""
import math, random, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 2048, 1152
random.seed(42); np.random.seed(42)

def brain_sdf(x, y, cx, cy, scale):
    lx = (x - cx) / scale; ly = (y - cy) / scale
    def ell(px, py, rx, ry):
        k = math.sqrt((px/rx)**2 + (py/ry)**2); return (k - 1.0) * min(rx, ry)
    def smin(a, b, k):
        h = max(k - abs(a - b), 0) / k; return min(a, b) - h*h*h*k/6
    rh = ell(lx - 0.38, ly, 0.65, 0.80); lhemi = ell(lx + 0.38, ly, 0.65, 0.80)
    d = smin(rh, lhemi, 0.28)
    d = smin(d, ell(lx, ly - 0.52, 0.54, 0.36), 0.32)
    d = smin(d, ell(lx - 0.85, ly + 0.15, 0.34, 0.48), 0.22)
    d = smin(d, ell(lx + 0.85, ly + 0.15, 0.34, 0.48), 0.22)
    d = smin(d, ell(lx, ly + 0.62, 0.44, 0.32), 0.28)
    d = smin(d, ell(lx - 0.24, ly + 0.88, 0.27, 0.17), 0.12)
    d = smin(d, ell(lx + 0.24, ly + 0.88, 0.27, 0.17), 0.12)
    d = smin(d, ell(lx, ly + 1.05, 0.1, 0.15), 0.1)
    fm = max(0, 0.55 - abs(ly + 0.05)) * 2.0
    if abs(lx) < 0.06 and ly < 0.35 and fm > 0:
        d = max(d, (0.06 - abs(lx)) * fm * 0.25)
    return d

BCX, BCY, BS = W * 0.57, H * 0.46, H * 0.46

def gen_nodes(count, sr=(-999, 0)):
    nodes = []; att = 0
    while len(nodes) < count and att < 500000:
        att += 1
        x = BCX + (random.random() - 0.5) * BS * 3.0
        y = BCY + (random.random() - 0.5) * BS * 3.0
        sdf = brain_sdf(x, y, BCX, BCY, BS)
        if sdf < sr[0] or sdf > sr[1]: continue
        sd = abs(sdf)
        if sd > 0.30 and random.random() < 0.6: continue
        layer = random.choices([0, 1, 2], weights=[0.22, 0.35, 0.43])[0]
        nodes.append((x, y, layer, sd))
    return nodes

print("Generating nodes...")
all_nodes = gen_nodes(1200) + gen_nodes(800, sr=(-0.12, 0))
for _ in range(45):
    sx = BCX + (random.random() - 0.5) * BS * 1.6
    sy = BCY + (random.random() - 0.5) * BS * 1.5
    if brain_sdf(sx, sy, BCX, BCY, BS) > -0.03: continue
    a = random.uniform(0, math.pi * 2); c = random.uniform(-0.1, 0.1); s = random.uniform(6, 12)
    for i in range(random.randint(8, 22)):
        a += c + random.uniform(-0.04, 0.04); sx += math.cos(a)*s; sy += math.sin(a)*s
        if brain_sdf(sx, sy, BCX, BCY, BS) > -0.005: break
        all_nodes.append((sx, sy, random.choices([1, 2], weights=[0.35, 0.65])[0], 0.04))
print(f"Nodes: {len(all_nodes)}")

def build_conns(nodes, md, mp=4):
    conns = []; cc = [0]*len(nodes); cs = md; grid = {}
    for i, (x, y, l, sd) in enumerate(nodes):
        grid.setdefault((int(x//cs), int(y//cs)), []).append(i)
    for i in range(len(nodes)):
        if cc[i] >= mp: continue
        x1, y1, l1, _ = nodes[i]; gx, gy = int(x1//cs), int(y1//cs); cands = []
        for dx in range(-1, 2):
            for dy in range(-1, 2):
                for j in grid.get((gx+dx, gy+dy), []):
                    if j <= i or cc[j] >= mp: continue
                    x2, y2, l2, _ = nodes[j]; d = math.sqrt((x1-x2)**2+(y1-y2)**2)
                    if d < md: cands.append((j, d, 0.9 if l1==l2 else 0.2))
        cands.sort(key=lambda c: c[1]); tk = 0
        for j, d, p in cands:
            if tk >= 3: break
            if random.random() < p:
                conns.append((i, j, d, nodes[i][2])); cc[i] += 1; cc[j] += 1; tk += 1
    return conns

print("Building connections...")
conns = build_conns(all_nodes, 65, 4)
print(f"Connections: {len(conns)}")

print("Rendering...")
px = np.zeros((H, W, 3), dtype=np.float64)
ys, xs = np.mgrid[0:H, 0:W]
dx = (xs - BCX)/(W*0.42); dy = (ys - BCY)/(H*0.48)
glow = np.clip(1.0 - np.sqrt(dx**2+dy**2)*0.65, 0, 1)**3.5
px[:,:,0] = 3 + glow*15; px[:,:,1] = 4 + glow*35; px[:,:,2] = 10 + glow*65
img = Image.fromarray(np.clip(px, 0, 255).astype(np.uint8))

LC = {
    0: {'nr':(1.0,2.0),'nc':(18,50,130),'na':0.22,'cc':(35,80,170),'ca':0.15,'lc':(12,45,120),'la':0.08,'lw':1,'gr':7,'gc':(8,35,110),'ga':0.12},
    1: {'nr':(1.8,3.2),'nc':(0,110,215),'na':0.50,'cc':(70,185,255),'ca':0.40,'lc':(0,90,195),'la':0.16,'lw':1,'gr':11,'gc':(0,75,190),'ga':0.20},
    2: {'nr':(2.2,4.5),'nc':(0,195,255),'na':0.85,'cc':(175,238,255),'ca':0.75,'lc':(0,165,255),'la':0.28,'lw':1,'gr':16,'gc':(0,130,250),'ga':0.32},
}

for lid in [0,1,2]:
    c = LC[lid]; layer = Image.new('RGBA',(W,H),(0,0,0,0)); draw = ImageDraw.Draw(layer)
    r,g,b = c['lc']; ba = c['la']
    for ii,jj,dist,ll in conns:
        if ll != lid: continue
        x1,y1 = all_nodes[ii][0],all_nodes[ii][1]; x2,y2 = all_nodes[jj][0],all_nodes[jj][1]
        ppx = -(y2-y1); ppy = (x2-x1); pl = math.sqrt(ppx*ppx+ppy*ppy)+0.001
        ppx /= pl; ppy /= pl; ca = random.uniform(-16,16)
        mx = (x1+x2)/2+ppx*ca; my = (y1+y2)/2+ppy*ca
        pts = [((1-t/12)**2*x1+2*(1-t/12)*(t/12)*mx+(t/12)**2*x2, (1-t/12)**2*y1+2*(1-t/12)*(t/12)*my+(t/12)**2*y2) for t in range(13)]
        df = max(0,1.0-dist/65)**0.5
        for k in range(len(pts)-1):
            st = k/max(1,len(pts)-2); fade = 0.5+0.5*(1.0-2.0*abs(st-0.5))
            a = max(1,min(255,int(ba*255*fade*df)))
            draw.line([pts[k],pts[k+1]], fill=(r,g,b,a), width=c['lw'])
    img.paste(Image.alpha_composite(Image.new('RGBA',(W,H),(0,0,0,255)),layer).convert('RGB'),(0,0),layer)

for lid in [0,1,2]:
    c = LC[lid]; gl = Image.new('RGBA',(W,H),(0,0,0,0)); gd = ImageDraw.Draw(gl)
    nl = Image.new('RGBA',(W,H),(0,0,0,0)); nd = ImageDraw.Draw(nl)
    for x,y,l,sd in all_nodes:
        if l != lid: continue
        sf = 1.0-min(sd/0.25,1.0)*0.25; nr = c['nr'][0]+(c['nr'][1]-c['nr'][0])*sf
        gr_ = c['gr']; ga_ = int(c['ga']*255)
        gd.ellipse([x-gr_,y-gr_,x+gr_,y+gr_], fill=(*c['gc'],ga_))
        na_ = int(c['na']*255); nd.ellipse([x-nr,y-nr,x+nr,y+nr], fill=(*c['nc'],na_))
        cr_ = nr*0.4; ca_ = int(c['ca']*255); nd.ellipse([x-cr_,y-cr_,x+cr_,y+cr_], fill=(*c['cc'],ca_))
    gb = gl.filter(ImageFilter.GaussianBlur(radius=c['gr']*1.3))
    img.paste(Image.alpha_composite(Image.new('RGBA',(W,H),(0,0,0,255)),gb).convert('RGB'),(0,0),gb)
    img.paste(Image.alpha_composite(Image.new('RGBA',(W,H),(0,0,0,255)),nl).convert('RGB'),(0,0),nl)

fl = Image.new('RGBA',(W,H),(0,0,0,0)); fd = ImageDraw.Draw(fl)
fg = [(x,y) for x,y,l,_ in all_nodes if l==2]
for _ in range(80):
    if not fg: break
    x,y = random.choice(fg); x += random.uniform(-4,4); y += random.uniform(-4,4)
    fr = random.uniform(5,18); fa = random.randint(55,160)
    fd.ellipse([x-fr,y-fr,x+fr,y+fr], fill=(130,222,255,fa))
fb = fl.filter(ImageFilter.GaussianBlur(radius=10))
img.paste(Image.alpha_composite(Image.new('RGBA',(W,H),(0,0,0,255)),fb).convert('RGB'),(0,0),fb)

amb = Image.new('RGBA',(W,H),(0,0,0,0)); ad = ImageDraw.Draw(amb)
for rs in range(550,80,-12):
    a = int(2+(550-rs)/550*18); ad.ellipse([BCX-rs*1.3,BCY-rs,BCX+rs*1.3,BCY+rs], fill=(0,55,155,a))
ab = amb.filter(ImageFilter.GaussianBlur(radius=90))
ab_arr = np.array(ab).astype(np.float64); img_arr = np.array(img).astype(np.float64)
img_arr[:,:,:3] += ab_arr[:,:,:3]*(ab_arr[:,:,3:4]/255.0)*0.6
img = Image.fromarray(np.clip(img_arr, 0, 255).astype(np.uint8))

vdx = (xs-W*0.5)/(W*0.55); vdy = (ys-H*0.5)/(H*0.55)
vig = np.clip(1.0-(np.sqrt(vdx**2+vdy**2)-0.55)*1.3, 0.12, 1.0)
img_arr = np.array(img).astype(np.float64)
for ch in range(3): img_arr[:,:,ch] *= vig
img_arr *= 1.15
img = Image.fromarray(np.clip(img_arr, 0, 255).astype(np.uint8))

out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public')
os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, 'neural-brain-bg.png')
img.save(out, 'PNG', optimize=True)
print(f"Saved: {out} ({img.size[0]}x{img.size[1]})")
