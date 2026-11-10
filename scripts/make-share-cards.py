"""
Regenerates the link-preview cards (what shows when a link is texted or posted).
  pip install playwright && python -m playwright install chromium
  python scripts/make-share-cards.py
Writes public/og.jpg and public/og/*.jpg (1200x630). Edit the CARDS list below, then rerun.
"""
import os
from playwright.sync_api import sync_playwright

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = f"{R}/public"; F = f"{R}/src/app/fonts"
os.makedirs(f"{P}/og", exist_ok=True)

BASE = f"""
@font-face{{font-family:Jost;src:url(file://{F}/jost-var.woff2) format('woff2');font-weight:100 900}}
@font-face{{font-family:Cormorant;src:url(file://{F}/cormorant-var.woff2) format('woff2');font-weight:300 700}}
@font-face{{font-family:Pinyon;src:url(file://{F}/pinyon.woff2) format('woff2')}}
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{width:1200px;height:630px;overflow:hidden}}
body{{background:#0b0a08;color:#f6f0de;font-family:Jost,sans-serif;position:relative;-webkit-font-smoothing:antialiased}}
.glow{{position:absolute;border-radius:50%;filter:blur(110px);background:rgba(201,162,77,.22)}}
.frame{{position:absolute;inset:18px;border:1px solid rgba(201,162,77,.35);border-radius:26px}}
.left{{position:absolute;left:64px;top:56px;bottom:56px;width:600px;display:flex;flex-direction:column}}
.brand{{display:flex;align-items:center;gap:16px}}
.brand img{{height:74px}}
.brand .n{{font-family:Pinyon;font-size:40px;color:#e3c77d;line-height:1}}
.brand .s{{font-size:13px;letter-spacing:.42em;color:#e8e1d2;margin-top:6px}}
.eyebrow{{margin-top:auto;font-size:16px;letter-spacing:.32em;text-transform:uppercase;color:#e3c77d}}
h1{{font-family:Cormorant;font-weight:500;font-size:74px;line-height:.98;letter-spacing:-.01em;margin-top:14px}}
h1 em{{font-family:Pinyon;font-style:normal;font-weight:400;color:#e3c77d;font-size:1.05em}}
.sub{{margin-top:18px;font-size:22px;color:#e8e1d2;line-height:1.35}}
.pills{{margin-top:22px;display:flex;gap:10px;flex-wrap:wrap}}
.pill{{border:1px solid rgba(201,162,77,.45);border-radius:999px;padding:8px 16px;font-size:16px;color:#e8e1d2}}
.photo{{position:absolute;right:56px;top:56px;bottom:56px;width:420px;border-radius:22px;overflow:hidden;border:1px solid rgba(201,162,77,.5)}}
.photo img{{width:100%;height:150%;object-fit:cover;object-position:top}}
.photo:after{{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(11,10,8,.55),transparent 45%)}}
.tag{{position:absolute;right:76px;bottom:76px;z-index:2;background:#b5121b;color:#fff;border-radius:999px;padding:12px 22px;font-size:19px;font-weight:500}}
"""
def card(eyebrow, h1, sub, pills, photo, tag="Open 24/7 · Book online"):
    pl = "".join(f'<span class="pill">{p}</span>' for p in pills)
    return f"""<html><head><style>{BASE}</style></head><body>
<div class="glow" style="width:620px;height:620px;left:-160px;top:-180px"></div>
<div class="frame"></div>
<div class="left">
  <div class="brand"><img src="file://{P}/media/brand/badge.png"><div><div class="n">Albertine Couture</div><div class="s">HAIR SALON · DMV</div></div></div>
  <div class="eyebrow">{eyebrow}</div>
  <h1>{h1}</h1>
  <div class="sub">{sub}</div>
  <div class="pills">{pl}</div>
</div>
<div class="photo"><img src="file://{P}/media/work-ac/{photo}.webp"></div>
<div class="tag">{tag}</div>
</body></html>"""

LOC = ["Gaithersburg, MD", "Dumfries, VA"]
CARDS = [
    ("og.jpg", card("Gaithersburg, MD · Dumfries, VA", "Your dream hair<br>awaits — <em>any hour.</em>", "Knotless, boho, twists, locs, sew-ins & K-tip.<br>Walk-ins from 5 AM.", ["Open 24/7", "30+ stylists", "Black-owned"], "peekaboo-boho")),
    ("og/book.jpg", card("Book online", "Book your next <em>look.</em>", "Pick your salon, style, stylist and time — with your price shown before you pay.", LOC, "bora-bora", "$20 deposit holds your spot")),
    ("og/portal.jpg", card("Booking portal demo", "One portal. <em>Three</em> views.", "Client, owner and stylist — try every view with a guided walkthrough.", ["Client", "Owner", "Stylist"], "salon-floor", "Try the demo")),
    ("og/menu.jpg", card("The full menu", "Every style, <em>priced.</em>", "Knotless & boho · cornrows · twists · locs · sew-ins & wigs · K-tip & I-tip · silk press · kids · men", LOC, "gypsy-knotless")),
    ("og/finder.jpg", card("Price Finder", "Your exact price in <em>three</em> taps.", "Style → size → length. Real prices from shoulder to under-butt.", ["Knotless", "Boho", "Bora Bora", "Twists"], "flip-over-fulani", "Find my price")),
    ("og/knotless-braids.jpg", card("Knotless · boho · Bora Bora", "Knotless, <em>boho</em> & Bora Bora.", "Medium knotless from $180 · boho from $200 · Bora Bora from $220", LOC, "peekaboo-boho")),
    ("og/box-braids-cornrows.jpg", card("Braids & cornrows", "Clean parts. <em>Crisp</em> cornrows.", "Box braids from $180 · miracle knot braids $200 · freestyle & stitch cornrows", LOC, "stitch-cornrows")),
    ("og/twists.jpg", card("Twists & crochet", "Twists with <em>bounce.</em>", "Passion, Senegalese & Marley from $120 · Havana · rope · island · crochet", LOC, "passion-twist")),
    ("og/locs.jpg", card("Locs · micro locs · faux locs", "Your loc <em>journey.</em>", "Retwist $80 · starter locs from $100 · micro locs from $550 · butterfly locs $250", LOC, "interlocking-locs")),
    ("og/sew-ins-wigs.jpg", card("Sew-ins & wigs", "Installs so <em>seamless.</em>", "Versatile sew-in $150 · closure $200 · glueless lace wig $170 · ponytails", LOC, "closure-sewin")),
    ("og/k-tip-i-tip-extensions.jpg", card("K-tip & I-tip", "Length that <em>moves.</em>", "I-tip from $650 · K-tip from $850 · maintenance $350", LOC, "i-tip-extensions")),
    ("og/silk-press-color.jpg", card("Silk press · color · cuts", "Silk that <em>swings.</em>", "Olaplex silk press from $150 · color from $300 · keratin · cuts", LOC, "silk-press")),
    ("og/kids-braids.jpg", card("Kids · 11 & younger", "Little crowns, <em>gentle</em> hands.", "Kids knotless from $180 · butterfly locs $220 · twists $140", LOC, "kids-lemonade")),
    ("og/mens-braids.jpg", card("Men", "Sharp braids. <em>Clean</em> lines.", "Barrel twists $150 · box braids from $120 · cornrows from $70", LOC, "mens-stitch-braids")),
]

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 630})
    for name, html in CARDS:
        tmp = f"{R}/scripts/.card.html"
        open(tmp, "w").write(html)
        pg.goto(f"file://{tmp}")
        pg.wait_for_timeout(350)
        pg.screenshot(path=f"{P}/{name}", type="jpeg", quality=86)
        print("wrote", name)
    b.close()
    os.remove(f"{R}/scripts/.card.html")
