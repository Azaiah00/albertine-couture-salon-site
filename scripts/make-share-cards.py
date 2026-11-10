"""
Regenerates the link-preview cards (what shows when a link is texted, DM'd or posted).
  pip install playwright && python -m playwright install chromium
  python scripts/make-share-cards.py
Writes public/og.jpg and public/og/*.jpg (1200x630). Edit the CARDS list below, then rerun.
Design: badge + script name, serif headline with one gold-foil script word, crimson CTA,
three arched real photos in front of a 24-hour gold clock ring, "24/7 OPEN" seal.
"""
import math, os
from playwright.sync_api import sync_playwright

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = f"{R}/public"; F = f"{R}/src/app/fonts"
os.makedirs(f"{P}/og", exist_ok=True)

def ring():
    t=[]
    for i in range(96):
        a=math.radians(i*3.75-90); r1=300; r2=300-(16 if i%4==0 else 7)
        t.append(f'<line x1="{320+r1*math.cos(a):.1f}" y1="{320+r1*math.sin(a):.1f}" x2="{320+r2*math.cos(a):.1f}" y2="{320+r2*math.sin(a):.1f}" stroke="#c9a24d" stroke-opacity="{.75 if i%4==0 else .35}" stroke-width="{1.6 if i%4==0 else 1}"/>')
    return f'''<svg width="640" height="640" viewBox="0 0 640 640"><circle cx="320" cy="320" r="300" fill="none" stroke="#c9a24d" stroke-opacity=".45"/><circle cx="320" cy="320" r="262" fill="none" stroke="#c9a24d" stroke-opacity=".18" stroke-dasharray="2 6"/>{"".join(t)}</svg>'''

CSS = f"""
@font-face{{font-family:Jost;src:url(file://{F}/jost-var.woff2);font-weight:100 900}}
@font-face{{font-family:Cormorant;src:url(file://{F}/cormorant-var.woff2);font-weight:300 700}}
@font-face{{font-family:CormorantI;src:url(file://{F}/cormorant-var-italic.woff2);font-weight:300 700}}
@font-face{{font-family:Pinyon;src:url(file://{F}/pinyon.woff2)}}
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{width:1200px;height:630px;overflow:hidden}}
body{{background:radial-gradient(120% 90% at 78% 40%,#211a10 0%,#0e0c09 55%,#090806 100%);color:#f6f0de;font-family:Jost;position:relative;-webkit-font-smoothing:antialiased}}
.grain{{position:absolute;inset:0;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")}}
.frame{{position:absolute;inset:16px;border:1px solid rgba(201,162,77,.32);border-radius:22px}}
.frame2{{position:absolute;inset:22px;border:1px solid rgba(201,162,77,.12);border-radius:18px}}
.ring{{position:absolute;left:600px;top:-5px}}
.left{{position:absolute;left:66px;top:54px;bottom:54px;width:560px;display:flex;flex-direction:column}}
.brand{{display:flex;align-items:center;gap:14px}}
.brand img{{height:66px;filter:drop-shadow(0 4px 14px rgba(0,0,0,.6))}}
.brand .n{{font-family:Pinyon;font-size:38px;color:#e3c77d;line-height:1}}
.brand .s{{font-size:12px;letter-spacing:.44em;color:#cfc6b2;margin-top:7px}}
.eyebrow{{margin-top:auto;display:flex;align-items:center;gap:14px;font-size:14px;letter-spacing:.34em;text-transform:uppercase;color:#e3c77d}}
.eyebrow i{{display:block;width:44px;height:1px;background:#c9a24d}}
h1{{font-family:Cormorant;font-weight:500;font-size:72px;line-height:.98;letter-spacing:-.015em;margin-top:16px}}
h1 em{{font-family:Pinyon;font-style:normal;font-weight:400;font-size:.92em;letter-spacing:0;background:linear-gradient(100deg,#b8892f 0%,#f3dc9a 38%,#c9a24d 62%,#f7e6b0 100%);-webkit-background-clip:text;color:transparent;padding-right:8px}}
.sub{{margin-top:20px;font-size:21px;color:#e8e1d2;line-height:1.4;opacity:.92}}
.row{{margin-top:26px;display:flex;align-items:center;gap:14px}}
.cta{{background:linear-gradient(180deg,#c4161f,#a50f18);color:#fff;border-radius:999px;padding:13px 26px;font-size:18px;font-weight:500;box-shadow:0 10px 30px rgba(181,18,27,.35)}}
.meta{{font-size:16px;color:#cfc6b2;letter-spacing:.02em}}
.meta b{{color:#e3c77d;font-weight:500}}
.arch{{position:absolute;overflow:hidden;border-radius:999px 999px 18px 18px;border:1.5px solid rgba(227,199,125,.75);box-shadow:0 24px 60px rgba(0,0,0,.65)}}
.arch img{{width:100%;height:142%;object-fit:cover;object-position:top}}
.arch:after{{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(9,8,6,.45),transparent 40%)}}
.a1{{left:668px;top:118px;width:178px;height:330px}}
.a2{{left:812px;top:66px;width:224px;height:420px;z-index:2;border-color:#e3c77d}}
.a3{{left:1002px;top:142px;width:150px;height:300px}}
.badge24{{position:absolute;z-index:3;left:640px;top:392px;width:118px;height:118px;border-radius:50%;background:#0b0a08;border:1.5px solid #e3c77d;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 12px 34px rgba(0,0,0,.6)}}
.badge24 .b{{font-family:Cormorant;font-size:46px;line-height:.9;color:#f3dc9a;font-weight:600}}
.badge24 .t{{font-size:10.5px;letter-spacing:.3em;color:#e8e1d2;margin-top:4px}}
.locs{{position:absolute;z-index:3;right:58px;bottom:56px;text-align:right;font-size:13px;letter-spacing:.3em;color:#cfc6b2}}
"""

def card(eyebrow, h1, sub, cta, meta, photos):
    """photos: three (file, object-position-y %, height %) — left, centre, right.
    Height "Q" zooms into the top-left quadrant of a 2x2 collage (skips the text labels)."""
    def style(y, h):
        if h == "Q":
            return "position:absolute;left:0;top:0;height:218%;width:auto;max-width:none"
        return f"height:{h}%;object-position:50% {y}%"
    arches = "".join(
        f'<div class="arch a{i+1}"><img src="file://{P}/media/work-ac/{f}.webp" style="{style(y, h)}"></div>'
        for i, (f, y, h) in enumerate(photos)
    )
    return f"""<html><head><style>{CSS}</style></head><body>
<div class="grain"></div><div class="frame"></div><div class="frame2"></div>
<div class="ring">{ring()}</div>
<div class="left">
 <div class="brand"><img src="file://{P}/media/brand/badge.png"><div><div class="n">Albertine Couture</div><div class="s">HAIR SALON · DMV</div></div></div>
 <div class="eyebrow"><i></i>{eyebrow}</div>
 <h1>{h1}</h1>
 <div class="sub">{sub}</div>
 <div class="row"><span class="cta">{cta}</span><span class="meta">{meta}</span></div>
</div>
{arches}
<div class="badge24"><div class="b">24/7</div><div class="t">OPEN</div></div>
<div class="locs">GAITHERSBURG, MD &nbsp;·&nbsp; DUMFRIES, VA</div>
</body></html>"""

OPEN = "<b>Open 24/7</b> · 2 salons"
CARDS = [
    ("og.jpg", card("The salon that never closes", "Your dream hair<br>awaits — <em>any hour.</em>", "Knotless, boho, twists, locs, sew-ins & K-tip —<br>by a team of 30+ stylists. Walk-ins from 5 AM.", "Book your appointment", OPEN,
        [("gypsy-knotless", 0, 142), ("peekaboo-boho", 6, 165), ("bora-bora", 4, 170)])),
    ("og/book.jpg", card("Book online", "Book your next <em>look.</em>", "Pick your salon, style, stylist and time —<br>your price is shown before you pay.", "Book now", "<b>$20</b> deposit holds your spot",
        [("faux-locs", 0, 142), ("bora-bora", 4, 170), ("passion-twist", 0, 150)])),
    ("og/portal.jpg", card("Booking portal demo", "One portal. <em>Three</em> views.", "Client, owner and stylist —<br>try every view with a guided walkthrough.", "Try the demo", "<b>Demo</b> · sample data",
        [("salon-chairs", 50, 100), ("salon-floor", 30, 100), ("salon-suite", 50, 100)])),
    ("og/menu.jpg", card("The full menu", "Every style, <em>priced.</em>", "Knotless & boho · cornrows · twists · locs ·<br>sew-ins & wigs · K-tip & I-tip · silk press · kids · men", "See the menu", OPEN,
        [("stitch-cornrows", 0, 150), ("gypsy-knotless", 0, 142), ("faux-locs", 0, 142)])),
    ("og/finder.jpg", card("Price Finder", "Your exact price in <em>three</em> taps.", "Style, then size, then length —<br>real prices from shoulder to under-butt.", "Find my price", OPEN,
        [("gypsy-knotless", 0, 142), ("flip-over-fulani", 0, 150), ("senegalese-twist", 0, 150)])),
    ("og/knotless-braids.jpg", card("Knotless · boho · Bora Bora", "Knotless, <em>boho</em><br>& Bora Bora.", "Medium knotless from $180 · boho from $200 ·<br>Bora Bora from $220", "Book knotless", OPEN,
        [("gypsy-knotless", 0, 142), ("peekaboo-boho", 6, 165), ("bora-bora", 4, 170)])),
    ("og/box-braids-cornrows.jpg", card("Braids & cornrows", "Clean parts.<br><em>Crisp</em> cornrows.", "Box braids from $180 · miracle knot braids $200 ·<br>freestyle & stitch cornrows", "Book braids", OPEN,
        [("braided-baldie", 0, 140), ("stitch-cornrows", 0, 150), ("lemonade-braids", 0, 150)])),
    ("og/twists.jpg", card("Twists & crochet", "Twists with <em>bounce.</em>", "Passion, Senegalese & Marley from $120 ·<br>Havana · rope · island · crochet", "Book twists", OPEN,
        [("senegalese-twist", 0, 150), ("passion-twist", 0, 150), ("micro-braids", 0, 150)])),
    ("og/locs.jpg", card("Locs · micro locs · faux locs", "Your loc <em>journey.</em>", "Retwist $80 · starter locs from $100 ·<br>micro locs from $550 · butterfly locs $250", "Book locs", OPEN,
        [("locs-retwist", 0, "Q"), ("faux-locs", 0, 142), ("interlocking-locs", 0, "Q")])),
    ("og/sew-ins-wigs.jpg", card("Sew-ins & wigs", "Installs so <em>seamless.</em>", "Versatile sew-in $150 · closure $200 ·<br>glueless lace wig $170 · ponytails", "Book an install", OPEN,
        [("sewin-bangs", 0, "Q"), ("closure-sewin", 6, 150), ("versatile-sewin", 0, 150)])),
    ("og/k-tip-i-tip-extensions.jpg", card("K-tip & I-tip", "Length that <em>moves.</em>", "I-tip from $650 · K-tip from $850 ·<br>maintenance $350", "Book extensions", OPEN,
        [("hair-color", 0, 150), ("i-tip-extensions", 4, 150), ("versatile-sewin", 0, 150)])),
    ("og/silk-press-color.jpg", card("Silk press · color · cuts", "Silk that <em>swings.</em>", "Olaplex silk press from $150 · color from $300 ·<br>keratin · cuts", "Book a press", OPEN,
        [("bantu-knots", 0, 140), ("silk-press", 0, "Q"), ("hair-color", 0, 150)])),
    ("og/kids-braids.jpg", card("Kids · 11 & younger", "Little crowns,<br><em>gentle</em> hands.", "Kids knotless from $180 · butterfly locs $220 ·<br>twists $140", "Book for your child", OPEN,
        [("butterfly-braid", 0, "Q"), ("kids-braids", 0, 150), ("kids-lemonade", 0, "Q")])),
    ("og/mens-braids.jpg", card("Men", "Sharp braids.<br><em>Clean</em> lines.", "Barrel twists $150 · box braids from $120 ·<br>cornrows from $70", "Book now", OPEN,
        [("stitch-cornrows", 0, 150), ("mens-stitch-braids", 0, "Q"), ("braided-baldie", 0, 140)])),
]

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 630})
    tmp = f"{R}/scripts/.card.html"
    for name, html in CARDS:
        open(tmp, "w", encoding="utf-8").write(html)
        pg.goto(f"file://{tmp}")
        pg.wait_for_timeout(400)
        pg.screenshot(path=f"{P}/{name}", type="jpeg", quality=88)
        print("wrote", name)
    b.close()
    os.remove(tmp)
