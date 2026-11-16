# Erzeugt gruppenblatt.pdf (A4, Vorderseite Aufgaben, Rueckseite Karte) aus rudow-daten.json.
# Aufruf im Ordner gw/ausflug-rudow:  python3 bau.py
# Braucht: reportlab, qrcode, Schrift DejaVu Sans (Pfad unten, auf Linux Standard).
import json, math, os
HIER=os.path.dirname(os.path.abspath(__file__))
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont('S','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('SB','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('SC','/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed.ttf'))
pdfmetrics.registerFont(TTFont('SCB','/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf'))

D=json.load(open(os.path.join(HIER,'rudow-daten.json')))
lat0=52.4175
MX=lambda lon:(lon-13.4950)*111320*math.cos(math.radians(lat0))
MY=lambda lat:(lat-lat0)*110574
CX,CY=88,30          # Kreismitte (m)
R_MAP=260            # sichtbarer Radius (m)
R_RING=145           # Bewegungsradius (m)
RING_C=(88,45)

def pts(ring): return [(MX(p[1]),MY(p[0])) for p in ring]
def near(ps,r): return any(math.hypot(x-CX,y-CY)<r for x,y in ps)

W,H=595.2756,841.8898
M=12*mm
c=canvas.Canvas(os.path.join(HIER,'gruppenblatt.pdf'),pagesize=(W,H))
c.setTitle('Entdeckungstour Rudower Altstadt – Gruppenblatt')

# ---------- Kopf ----------
top=H-M
c.setFont('SB',13.5); c.drawString(M,top-13,'Entdeckungstour Rudower Altstadt')
c.setFont('S',8.5); c.drawString(M,top-27,'Gruppenblatt · Geschichte')
# Gruppe / Namen
y=top-46
c.setFont('SB',9.5); c.drawString(M,y,'Gruppe:'); c.setLineWidth(.6)
c.line(M+44,y-2,M+92,y-2)
c.drawString(M+98,y,'Namen:'); c.line(M+138,y-2,M+270,y-2)
y-=20; c.line(M,y-2,M+270,y-2)

# ---------- Karte (rechts) ----------
QS=15*mm
MAP_D=78*mm; MR=MAP_D/2
mcx=W-M-MR; mcy=top-QS-4-MR
s=MR/R_MAP
def P(x,y): return (mcx+(x-CX)*s, mcy+(y-CY)*s)

c.saveState()
p=c.beginPath(); p.circle(mcx,mcy,MR); c.clipPath(p,stroke=0,fill=0)
c.setFillGray(1); c.rect(mcx-MR,mcy-MR,2*MR,2*MR,stroke=0,fill=1)
feats=D['features']
# Grün
for f in feats:
    if f['k']=='g':
        for ring in f['r']:
            ps=pts(ring)
            if len(ps)>2 and near(ps,R_MAP+60):
                q=c.beginPath(); q.moveTo(*P(*ps[0]))
                for a in ps[1:]: q.lineTo(*P(*a))
                q.close(); c.setFillGray(.92); c.drawPath(q,stroke=0,fill=1)
# Wasser (schraffiert)
for f in feats:
    if f['k']=='w':
        for ring in f['r']:
            ps=pts(ring)
            if len(ps)>2 and near(ps,R_MAP+60):
                q=c.beginPath(); q.moveTo(*P(*ps[0]))
                for a in ps[1:]: q.lineTo(*P(*a))
                q.close()
                c.saveState(); c.clipPath(q,stroke=0,fill=0)
                c.setLineWidth(.35); c.setStrokeGray(.35)
                for k in range(-300,300,2):
                    yy=mcy+k*1.1
                    c.line(mcx-MR,yy,mcx+MR,yy)
                c.restoreState()
                c.setLineWidth(.5); c.setStrokeGray(.2); c.drawPath(q,stroke=1,fill=0)
# Gebäude
for f in feats:
    if f['k']=='b':
        for ring in f['r']:
            ps=pts(ring)
            if len(ps)>2 and near(ps,R_MAP+30):
                q=c.beginPath(); q.moveTo(*P(*ps[0]))
                for a in ps[1:]: q.lineTo(*P(*a))
                q.close(); c.setFillGray(.82); c.setStrokeGray(.3); c.setLineWidth(.2)
                c.drawPath(q,stroke=1,fill=1)
# Straßen
WID={'secondary':4.0,'secondary_link':3.2,'tertiary':3.4,'residential':2.8,'unclassified':2.8}
roads=[]
for f in feats:
    if f['k']=='h':
        for ring in f['r']:
            ps=pts(ring)
            if near(ps,R_MAP+40): roads.append((f['n'],f['h'],ps))
def line(ps):
    q=c.beginPath(); q.moveTo(*P(*ps[0]))
    for a in ps[1:]: q.lineTo(*P(*a))
    return q
c.setLineCap(1); c.setLineJoin(1)
for n,h,ps in roads:
    if h in WID:
        c.setStrokeGray(.1); c.setLineWidth(WID[h]+.9); c.drawPath(line(ps),stroke=1,fill=0)
for n,h,ps in roads:
    if h in WID:
        c.setStrokeGray(1); c.setLineWidth(WID[h]); c.drawPath(line(ps),stroke=1,fill=0)
# Straßennamen
def inside_len(ps,r):
    L=0
    for a,b in zip(ps,ps[1:]):
        if math.hypot((a[0]+b[0])/2-CX,(a[1]+b[1])/2-CY)<r: L+=math.hypot(b[0]-a[0],b[1]-a[1])
    return L
LAB=['Alt-Rudow','Neuköllner Straße','Köpenicker Straße','Am Hanffgraben','Neudecker Weg','Prierosser Straße','Groß-Ziethener Chaussee','Waltersdorfer Chaussee']
def label(text,x,y,ang):
    X,Y=P(x,y)
    c.saveState(); c.translate(X,Y); c.rotate(ang)
    tw=pdfmetrics.stringWidth(text,'SCB',5.8)
    c.setFillGray(1); c.setStrokeGray(1)
    c.roundRect(-tw/2-1.5,-3.6,tw+3,8,2,stroke=0,fill=1)
    c.setFillGray(0); c.setFont('SCB',5.8)
    c.drawCentredString(0,-1.8,text)
    c.restoreState()
OFF={('Neuköllner Straße',0):0.22}  # (name,index)->fraction
for name in LAB:
    cand=[(inside_len(ps,R_MAP-25),ps) for n,h,ps in roads if n==name and h in WID]
    cand=[t for t in cand if t[0]>60]; cand.sort(key=lambda t:-t[0])
    nlab=2 if (cand and cand[0][0]>260) else 1
    for k,(L,ps) in enumerate(cand[:nlab]):
        seg=[]
        tot=0
        for a,b in zip(ps,ps[1:]):
            m=((a[0]+b[0])/2,(a[1]+b[1])/2)
            if math.hypot(m[0]-CX,m[1]-CY)<R_MAP-25:
                l=math.hypot(b[0]-a[0],b[1]-a[1]); seg.append((a,b,l)); tot+=l
        frac=OFF.get((name,k),0.5)
        tgt=tot*frac; acc=0
        for a,b,l in seg:
            if acc+l>=tgt:
                t=(tgt-acc)/l; x=a[0]+(b[0]-a[0])*t; y=a[1]+(b[1]-a[1])*t
                ang=math.degrees(math.atan2(b[1]-a[1],b[0]-a[0]))
                if ang>90: ang-=180
                if ang<-90: ang+=180
                label(name,x,y,ang); break
            acc+=l
# Bewegungsradius (dünn, gestrichelt, dunkelrot)
c.setStrokeGray(0); c.setLineWidth(.9); c.setDash(4,2.5)
c.circle(*P(*RING_C),R_RING*s,stroke=1,fill=0); c.setDash()
# U-Bahnhof Rudow
sx,sy=P(27,-147)
c.setFillGray(0); c.rect(sx-5,sy-5,10,10,stroke=0,fill=1)
c.setFillGray(1); c.setFont('SB',8); c.drawCentredString(sx,sy-2.9,'U')
c.restoreState()
c.setLineWidth(1.2); c.setStrokeGray(0); c.circle(mcx,mcy,MR,stroke=1,fill=0)
# Start-Beschriftung außerhalb/innen
tw=pdfmetrics.stringWidth('U RUDOW','SB',7)
c.setFillGray(1); c.roundRect(sx+7,sy-5,tw+5,10,2,stroke=0,fill=1)
c.setFont('SB',7); c.setFillGray(0); c.drawString(sx+9.5,sy-2.5,'U RUDOW')
# Nordpfeil
nx,ny=W-M-4,mcy-MR*0.78
c.setLineWidth(1); c.line(nx,ny,nx,ny+14); c.line(nx,ny+14,nx-3,ny+9); c.line(nx,ny+14,nx+3,ny+9)
c.setFont('SB',8); c.drawCentredString(nx,ny-9,'N')
# Maßstab 100 m + Legende in einer Zeile unter der Karte
sb=100*s; by=mcy-MR-11; bx=W-M-sb
c.setStrokeGray(0); c.setFillGray(0)
c.setLineWidth(1.2); c.line(bx,by,bx+sb,by); c.line(bx,by-2,bx,by+2); c.line(bx+sb,by-2,bx+sb,by+2)
c.setFont('S',6.5); c.drawCentredString(bx+sb/2,by+3,'100 m')
c.setLineWidth(.9); c.setDash(4,2.5); c.line(mcx-MR,by+2,mcx-MR+22,by+2); c.setDash()
c.setFont('S',6.8); c.drawString(mcx-MR+26,by,'Bis hierhin dürft ihr gehen.')

# ---------- Linke Spalte: Regeln, Treffpunkt ----------
L=M; Lw=W-M-2*MR-M-12   # Spaltenbreite
y=top-84
c.setFillGray(0); c.setFont('SB',10.5); c.drawString(L,y,'Grundregeln'); y-=15
c.setFont('S',9)
for t in ['Benehmt euch anständig, seid höflich.','Rennt nicht über Straßen, seid vorsichtig.','Die Gruppe bleibt immer zusammen.']:
    c.circle(L+3,y+3,1.4,stroke=0,fill=1); c.drawString(L+10,y,t); y-=14
for _ in range(1):
    c.circle(L+3,y+3,1.4,stroke=0,fill=1); c.setLineWidth(.6); c.line(L+10,y-1.5,L+Lw-6,y-1.5); y-=15
# Treffpunkt
y-=6
bh=78; c.setLineWidth(1.6); c.roundRect(L,y-bh,Lw,bh,5,stroke=1,fill=0)
c.setFont('SB',10.5); c.drawString(L+8,y-15,'Treffpunkt am Ende')
c.setFont('S',9.5)
c.drawString(L+8,y-31,'Uhrzeit:'); c.setLineWidth(.6); c.line(L+52,y-33,L+110,y-33); c.drawString(L+114,y-31,'Uhr')
c.drawString(L+8,y-47,'Ort:'); c.line(L+30,y-49,L+Lw-8,y-49)
c.drawString(L+8,y-65,'Notfallkontakt:'); c.line(L+84,y-67,L+Lw-8,y-67)

# ---------- Aufgaben ----------
y0=mcy-MR-24
c.setFillGray(0); c.setFont('SB',8.8)
c.drawString(M,y0+12,'Findet die 5 Orte, beantwortet die Fragen,')
c.drawString(M,y0+1,'macht Fotos und hakt hier ab:')
TASKS=[
 ('1','Die alte Dorfkirche',
  [('Wann wurde die Kirche zum ersten Mal gebaut? (Suche eine Infotafel oder frage jemanden.)',1),
   ('Woraus sind die alten Wände der Kirche gebaut?',1)],'Mach ein Foto von der Kirche.'),
 ('2','Das Wirtshaus „Zum alten Krug“',
  [('Seit wann gibt es das Wirtshaus?',1),
   ('Wie alt schätzt du das Haus?',1)],'Mach ein Foto vom Wirtshaus.'),
 ('3','Der Dorfteich (Schmiedeteich)',
  [('Wofür könnte man den Teich früher gebraucht haben?',2)],'Mach ein Foto vom Teich, mit der Kirche im Hintergrund.'),
 ('4','Die alte Dorfschule',
  [('Beschreibe das Haus: Was fällt dir auf?',1),
   ('Was ist hier anders als an unserer Schule?',1)],'Mach ein Foto von der alten Dorfschule.'),
 ('5','Der Heimatverein (Heimatmuseum)',
  [('Was macht ein Heimatverein? Schreibe deine Vermutung auf.',1),
   ('Was würdest du dort gern fragen?',1)],'Mach ein Foto vom Heimatverein.'),
]
FOOT=0
avail=y0-8-(M+2+FOOT)
th=avail/5
def box(x,y,w,h):
    c.setLineWidth(.7); c.setStrokeGray(0); c.rect(x,y,w,h,stroke=1,fill=0)
def cb(x,y,sz=8.5):
    c.setLineWidth(.9); c.setStrokeGray(0); c.rect(x,y,sz,sz,stroke=1,fill=0)
ytop=y0-10
for i,(num,title,qs,foto) in enumerate(TASKS):
    ty=ytop-i*th
    c.setFillGray(0); c.circle(M+8,ty-9,8,stroke=0,fill=1)
    c.setFillGray(1); c.setFont('SB',10); c.drawCentredString(M+8,ty-12.4,num)
    c.setFillGray(0); c.setFont('SB',11); c.drawString(M+22,ty-12.5,title)
    # Checkboxen rechts, Breite aus Text
    c.setFont('S',8.5); xx=W-M
    for lab in ['Foto','Antworten','gefunden']:
        wlab=pdfmetrics.stringWidth(lab,'S',8.5)
        xx-=wlab; c.drawString(xx,ty-12.5,lab)
        xx-=12; cb(xx,ty-14.2); xx-=10
    # Foto-Hinweis
    c.setFont('S',7.6); c.setFillGray(.15)
    c.drawString(M+22,ty-23,'Foto-Auftrag: '+foto)
    yy=ty-27
    wsum=sum(h for _,h in qs); nq=len(qs)
    free=th-27-4
    boxh_unit=(free-nq*11)/wsum
    for q,hw in qs:
        c.setFont('S',8.3); c.setFillGray(0)
        c.drawString(M+4,yy-7.5,q)
        bh=boxh_unit*hw
        c.setLineWidth(.8); c.setStrokeGray(0)
        c.line(M+4,yy-10-bh+4,W-M,yy-10-bh+4)
        if hw>1:
            c.line(M+4,yy-10-bh/2+4,W-M,yy-10-bh/2+4)
        yy-=11+bh
    if i<4:
        c.setStrokeGray(.5); c.setLineWidth(.4); c.setDash(2,2); c.line(M,ty-th+2,W-M,ty-th+2); c.setDash()
# ---------- QR oben rechts ----------
import qrcode
URL='https://gunst-at-hvh.github.io/klasse7.3/gw/ausflug-rudow/'
q=qrcode.QRCode(border=0,error_correction=qrcode.constants.ERROR_CORRECT_M); q.add_data(URL); q.make()
mat=q.get_matrix(); n=len(mat); cs=QS/n
qx=W-M-QS; qy=top-QS
c.setFillGray(0)
for r,row in enumerate(mat):
    for k,v in enumerate(row):
        if v: c.rect(qx+k*cs,qy+QS-(r+1)*cs,cs+.15,cs+.15,stroke=0,fill=1)
c.setFont('SB',8.5); c.drawRightString(qx-8,qy+QS-12,'Die Karten-App zum Scannen')
c.setFont('S',6.6); c.drawRightString(qx-8,qy+QS-23,'gunst-at-hvh.github.io/klasse7.3/gw/ausflug-rudow')
c.showPage()

# =================== Seite 2: Karte zum Beschriften und Einzeichnen ===================
PW,PH=H,W
c.setPageSize((PW,PH))
top2=PH-M
c.setFillGray(0); c.setFont('SB',13.5); c.drawString(M,top2-13,'Unser Weg durch Rudow')
c.setFont('SB',9.5); c.drawString(PW-M-215,top2-12,'Gruppe:'); c.setLineWidth(.6); c.line(PW-M-165,top2-14,PW-M,top2-14)
c.setFont('S',10)
c.drawString(M,top2-32,'Beschriftet interessante Orte und zeichnet euren Weg ein. Nutzt verschiedene Farben.')
MW=PW-2*M; MH=top2-48-(M+16)
mx0=M; my0=M+16
CXm,CYm=88,40         # Kartenmitte (m)
S2=MW/340.0           # pt pro m  (340 m Breite)
def P2(x,y): return (mx0+MW/2+(x-CXm)*S2, my0+MH/2+(y-CYm)*S2)
def inrect(x,y,m=0):
    X,Y=P2(x,y); return mx0-m<=X<=mx0+MW+m and my0-m<=Y<=my0+MH+m
c.saveState()
p=c.beginPath(); p.rect(mx0,my0,MW,MH); c.clipPath(p,stroke=0,fill=0)
c.setFillGray(1); c.rect(mx0,my0,MW,MH,stroke=0,fill=1)
def poly(ps):
    q=c.beginPath(); q.moveTo(*P2(*ps[0]))
    for a in ps[1:]: q.lineTo(*P2(*a))
    return q
for f in feats:
    if f['k']=='g':
        for ring in f['r']:
            ps=pts(ring)
            if len(ps)>2 and any(inrect(x,y,60) for x,y in ps):
                q=poly(ps); q.close(); c.setFillGray(.94); c.drawPath(q,stroke=0,fill=1)
for f in feats:
    if f['k']=='w':
        for ring in f['r']:
            ps=pts(ring)
            if len(ps)>2 and any(inrect(x,y,60) for x,y in ps):
                q=poly(ps); q.close()
                c.saveState(); c.clipPath(q,stroke=0,fill=0); c.setLineWidth(.4); c.setStrokeGray(.4)
                for k in range(-400,400,2): c.line(mx0,my0+MH/2+k*1.3,mx0+MW,my0+MH/2+k*1.3)
                c.restoreState()
                c.setLineWidth(.6); c.setStrokeGray(.2); c.drawPath(q,stroke=1,fill=0)
for f in feats:
    if f['k']=='b':
        for ring in f['r']:
            ps=pts(ring)
            if len(ps)>2 and any(inrect(x,y,30) for x,y in ps):
                q=poly(ps); q.close(); c.setFillGray(.9); c.setStrokeGray(.35); c.setLineWidth(.3); c.drawPath(q,stroke=1,fill=1)
WID2={'secondary':7.5,'secondary_link':6,'tertiary':6.2,'residential':5,'unclassified':5,'service':2.4}
roads2=[]
for f in feats:
    if f['k']=='h' and f['h'] in WID2:
        for ring in f['r']:
            ps=pts(ring)
            if any(inrect(x,y,40) for x,y in ps): roads2.append((f['n'],f['h'],ps))
c.setLineCap(1); c.setLineJoin(1)
for n,h,ps in roads2:
    c.setStrokeGray(.15); c.setLineWidth(WID2[h]+1.0); c.drawPath(poly(ps),stroke=1,fill=0)
for n,h,ps in roads2:
    c.setStrokeGray(1); c.setLineWidth(WID2[h]); c.drawPath(poly(ps),stroke=1,fill=0)
def label2(text,x,y,ang,size=9):
    X,Y=P2(x,y)
    c.saveState(); c.translate(X,Y); c.rotate(ang)
    tw=pdfmetrics.stringWidth(text,'SCB',size)
    c.setFillGray(1); c.roundRect(-tw/2-2,-size*.62,tw+4,size*1.35,2,stroke=0,fill=1)
    c.setFillGray(0); c.setFont('SCB',size); c.drawCentredString(0,-size*.3,text)
    c.restoreState()
names={}
for n,h,ps in roads2:
    if n and h!='service': names.setdefault(n,[]).append(ps)
placed=[]
for n,wl in names.items():
    cands=[]
    for ps in wl:
        segs=[(a,b) for a,b in zip(ps,ps[1:]) if inrect((a[0]+b[0])/2,(a[1]+b[1])/2,-25)]
        L=sum(math.hypot(b[0]-a[0],b[1]-a[1]) for a,b in segs)
        if L>40 and segs: cands.append((L,segs))
    cands.sort(key=lambda t:-t[0]); mine=[]
    for L,segs in cands:
        if len(mine)>=3: break
        tot=L/2; acc=0
        for a,b in segs:
            l=math.hypot(b[0]-a[0],b[1]-a[1])
            if acc+l>=tot:
                t=(tot-acc)/l; x=a[0]+(b[0]-a[0])*t; y=a[1]+(b[1]-a[1])*t
                if all(math.hypot(x-px,y-py)>120 for px,py in mine) and all(math.hypot(x-px,y-py)>34 for px,py,_ in placed):
                    ang=math.degrees(math.atan2(b[1]-a[1],b[0]-a[0]))
                    if ang>90: ang-=180
                    if ang<-90: ang+=180
                    label2(n,x,y,ang); mine.append((x,y)); placed.append((x,y,n))
                break
            acc+=l
# Bewegungsradius
c.setStrokeGray(0); c.setLineWidth(1.1); c.setDash(5,3.5)
c.circle(*P2(*RING_C),R_RING*S2,stroke=1,fill=0); c.setDash()
# U RUDOW liegt unterhalb des Ausschnitts: Hinweis am unteren Rand
sx,sy=P2(27,-147)
sx=min(max(sx,mx0+40),mx0+MW-80); sy=my0+22
c.setFillGray(0); c.rect(sx-8,sy-8,16,16,stroke=0,fill=1)
c.setFillGray(1); c.setFont('SB',12); c.drawCentredString(sx,sy-4.2,'U')
tw=pdfmetrics.stringWidth('U RUDOW','SB',10)
c.setFillGray(1); c.roundRect(sx+11,sy-8,tw+8,16,2,stroke=0,fill=1)
c.setFillGray(0); c.setFont('SB',10); c.drawString(sx+15,sy-3.5,'U RUDOW')
q=c.beginPath(); q.moveTo(sx-6,sy-11); q.lineTo(sx+6,sy-11); q.lineTo(sx,sy-20); q.close(); c.setFillGray(0); c.drawPath(q,stroke=0,fill=1)
c.restoreState()
c.setLineWidth(1.2); c.setStrokeGray(0); c.rect(mx0,my0,MW,MH,stroke=1,fill=0)
# Nordpfeil, Maßstab, Legende (unter der Karte)
yb=M+5
c.setFillGray(0); c.setFont('SB',9); c.drawString(M,yb,'N'); c.setLineWidth(1); c.line(M+16,yb-1,M+16,yb+9); c.line(M+16,yb+9,M+13,yb+4); c.line(M+16,yb+9,M+19,yb+4)
c.setLineWidth(.9); c.setDash(5,3.5); c.line(M+50,yb+3,M+76,yb+3); c.setDash()
c.setFont('S',8); c.drawString(M+82,yb,'Bis hierhin dürft ihr gehen.')
sb=100*S2; bx=PW-M-sb-44
c.setLineWidth(1.3); c.line(bx,yb+3,bx+sb,yb+3); c.line(bx,yb+1,bx,yb+5); c.line(bx+sb,yb+1,bx+sb,yb+5)
c.setFont('S',8); c.drawString(bx+sb+6,yb,'100 m')
c.showPage(); c.save()
print('ok th(mm)=',th/mm)
