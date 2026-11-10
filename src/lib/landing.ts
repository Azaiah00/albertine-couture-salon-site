import type { CategoryKey } from "@/lib/services";

/** Copy for each service landing page (/services/[slug]). Prices come from their Vagaro menu (placeholders until confirmed). */
export const LANDING: Record<
  string,
  {
    key: CategoryKey;
    metaTitle: string;
    metaDesc: string;
    eyebrow: string;
    h1: [string, string, string?];
    intro: string;
    problem: string;
    points: string[];
    reviewIndex?: number;
    quote?: { text: string; by: string };
    photos: string[];
    stylists: string[];
    featured: string[];
    finder?: string;
  }
> = {
  "knotless-braids": {
    key: "knotless",
    metaTitle: "Knotless, Boho & Bora Bora Braids · MD & VA",
    metaDesc: "Knotless braids from $140, boho knotless from $200, Bora Bora from $220, gypsy, mermaid and French curl braids. Open 24/7 in Gaithersburg, MD & Dumfries, VA.",
    eyebrow: "Knotless & boho · MD & VA",
    h1: ["Knotless,", "boho", "& Bora Bora."],
    intro: "Knotless, triangle, bohemian, gypsy, mermaid, flip-over Fulani, Bora Bora and French curl braids — in every size from jumbo to small, and every length from shoulder to under-butt.",
    problem: "Tension bumps, heavy roots and braids that frizz in a week usually come from rushed parting and too much pull. Knotless starts flat at the scalp, so it’s lighter from day one — and you know your exact price before you sit down.",
    points: ["Jumbo knotless from $150 · large from $140", "Medium knotless $180 (shoulder) – $400 (under butt)", "Boho knotless from $200 · gypsy from $250", "Bora Bora braids from $220", "Walk-ins from 5 AM, open 24/7"],
    reviewIndex: 1,
    photos: ["/media/work-ac/peekaboo-boho", "/media/work-ac/gypsy-knotless"],
    stylists: ["nicole", "magui", "yolande", "albertine"],
    featured: ["knotless-medium-shoulder", "boho-knotless-shoulder", "bora-bora-jumbo-shoulder", "gypsy-knotless-shoulder"],
    finder: "knotless",
  },
  "box-braids-cornrows": {
    key: "braids",
    metaTitle: "Box Braids, Cornrows & Micro Braids · MD & VA",
    metaDesc: "Box braids from $180, miracle knot braids $200, stitch, lemonade, tribal & freestyle cornrows, tree braids and micro braids. Open 24/7 in MD & VA.",
    eyebrow: "Braids & cornrows · MD & VA",
    h1: ["Clean parts.", "Crisp", "cornrows."],
    intro: "Box and individual braids, miracle knot braids, stitch, lemonade, tribal, freestyle and design cornrows, halo braids, cornrow mohawks, tree braids and micro braids.",
    problem: "A great braid style lives or dies on the parting. Our braiders map your parts before the first braid — so stitch lines stay straight, lemonade sweeps stay even and box parts stay square.",
    points: ["Medium box braids $180 – $250", "Medium miracle knot braids $200", "Freestyle cornrows $250", "Halo braids $60", "Micro braids from $350"],
    reviewIndex: 5,
    photos: ["/media/work-ac/stitch-cornrows", "/media/work-ac/braided-baldie"],
    stylists: ["dami", "nicole", "magui", "albertine"],
    featured: ["box-medium-shoulder", "miracle-braids-medium", "freestyle-cornrow", "micro-braiding-shoulder"],
    finder: "box",
  },
  twists: {
    key: "twists",
    metaTitle: "Passion, Senegalese & Marley Twists · MD & VA",
    metaDesc: "Jumbo passion, Senegalese and Marley twists from $120, Havana, yarn, rope, island and spring twists, plus crochet styles. Open 24/7 in MD & VA.",
    eyebrow: "Twists & crochet · MD & VA",
    h1: ["Twists with", "bounce", "— in any length."],
    intro: "Passion, Senegalese, Marley, Havana, yarn, rope, island, spring and African twists — plus crochet box braids, crochet locs and 100% Brazilian human-hair crochet.",
    problem: "Twists should feel soft, not stiff — and they should hold their shape for weeks. We size them evenly, seal the ends properly and tell you how to keep them fresh.",
    points: ["Jumbo passion / Senegalese / Marley from $120", "Havana from $160 · yarn from $180", "Rope twist from $200", "Crochet from $135", "Brazilian human-hair crochet from $180"],
    photos: ["/media/work-ac/passion-twist", "/media/work-ac/senegalese-twist"],
    stylists: ["dami", "nicole", "magui"],
    featured: ["passion-jumbo-shoulder", "senegalese-jumbo-shoulder", "marley-jumbo-shoulder", "crochet-box"],
    finder: "passion",
  },
  locs: {
    key: "locs",
    metaTitle: "Locs, Micro Locs & Faux Locs · MD & VA",
    metaDesc: "Loc retwists $80, starter locs from $100, instant locs from $350, micro locs from $550, Sisterlocks maintenance, soft & butterfly locs $250. Open 24/7.",
    eyebrow: "Locs · MD & VA",
    h1: ["Your loc", "journey,", "start to finish."],
    intro: "Retwists and styles, starter and instant locs, micro locs with your natural hair, Sisterlocks maintenance, loc extensions and repair — plus soft, butterfly and custom faux locs.",
    problem: "Locs are a long game. Whether you’re starting, maintaining or rescuing, we plan the size, the routine and the next appointment with you — so your locs mature the way you want.",
    points: ["Locs re-twist $80", "Starter locs from $100", "Instant locs from $350", "Micro locs from $550", "Soft & butterfly locs $250"],
    photos: ["/media/work-ac/interlocking-locs", "/media/work-ac/faux-locs"],
    stylists: ["dami", "magui", "albertine"],
    featured: ["locs-retwist", "starter-locs-comb", "micro-locs-shoulder", "butterfly-locs"],
    finder: "micro-locs",
  },
  "sew-ins-wigs": {
    key: "weaves",
    metaTitle: "Sew-Ins, Wig Installs & Ponytails · MD & VA",
    metaDesc: "Versatile sew-in $150, closure sew-in $200, sew-in with 2 bundles $225, glueless lace wig installs $170, wig making and sleek ponytails. Open 24/7.",
    eyebrow: "Sew-ins & wigs · MD & VA",
    h1: ["Installs so", "seamless", "they’re yours."],
    intro: "Versatile, 2-part, leave-out, full and closure sew-ins, bundle deals, glueless lace wig installs, frontal wigs with bleached knots, wig making and styling, half-ups and sleek ponytails.",
    problem: "Visible tracks and leave-out that won’t blend are what people notice. Premium weaving, minimal leave-out and flat installs are what Albertine Couture is known for.",
    points: ["Versatile full sew-in $150", "Closure sew-in $200", "Sew-in with 2 bundles $225 (hair included)", "Glueless lace wig install $170", "Sleek ponytail with braid $100"],
    reviewIndex: 0,
    photos: ["/media/work-ac/versatile-sewin", "/media/work-ac/closure-sewin"],
    stylists: ["victoria", "yolande", "albertine"],
    featured: ["versatile-sewin", "closure-sewin", "sewin-2-bundles", "lace-wig-closure-sewin"],
  },
  "k-tip-i-tip-extensions": {
    key: "extensions",
    metaTitle: "K-Tip & I-Tip Hair Extensions · MD & VA",
    metaDesc: "I-tip extensions from $650 (2 bundles), K-tip from $850, 3 and 4 bundle installs and I-tip maintenance $350. Natural-moving length and volume, open 24/7.",
    eyebrow: "K-tip & I-tip · MD & VA",
    h1: ["Length that", "moves", "like yours."],
    intro: "Fusion K-tip and strand-by-strand I-tip extensions by the bundle — 150, 225 or 300 pieces — plus maintenance, for length and volume with no braids and no leave-out.",
    problem: "Extensions should never cost you your own hair. We place every piece to your density, keep weight off fragile areas and book your maintenance before you leave.",
    points: ["I-tip · 2 bundles (150 pieces) $650", "I-tip · 3 bundles (225 pieces) $850", "K-tip · 2 bundles $850", "K-tip · 4 bundles (300 pieces) $1,100", "I-tip maintenance $350"],
    photos: ["/media/work-ac/i-tip-extensions"],
    stylists: ["victoria", "albertine"],
    featured: ["i-tip-2", "i-tip-3", "k-tip-2", "i-tip-maintenance"],
  },
  "silk-press-color": {
    key: "natural",
    metaTitle: "Silk Press, Color & Cuts · Gaithersburg & Dumfries",
    metaDesc: "Olaplex silk press package from $150, ultimate silk press from $105, blowouts, Bantu knots, full color from $300, highlights, relaxers, keratin and cuts.",
    eyebrow: "Silk press & color · MD & VA",
    h1: ["Silk that", "swings.", "Color that pops."],
    intro: "Olaplex and Ultimate silk press packages, shampoo & blowouts, press & curls, Bantu knots, full-head and highlight color, relaxers, keratin and precision cuts.",
    problem: "A press should never cost you your curls, and color should never cost you your ends. We build Olaplex into the press, book a consultation before first-time color, and cut to keep your shape.",
    points: ["Olaplex silk press package from $150", "Ultimate silk press from $105", "Shampoo & blowout from $45", "Full-head color + styling from $300", "Keratin treatment $250"],
    photos: ["/media/work-ac/silk-press", "/media/work-ac/hair-color"],
    stylists: ["victoria", "yolande", "albertine"],
    featured: ["silk-press-olaplex", "silk-press-ultimate", "color-full", "keratin"],
  },
  "kids-braids": {
    key: "kids",
    metaTitle: "Kids’ Braids & Butterfly Locs · MD & VA",
    metaDesc: "Kids’ box and knotless braids from $180, butterfly locs $220, micro braids and Senegalese twists for children 11 and younger. Gentle hands, open early.",
    eyebrow: "Kids · MD & VA",
    h1: ["Little crowns,", "gentle", "hands."],
    intro: "Kids’ box and knotless braids, butterfly locs, micro braids and Senegalese twists for children 11 and younger — with gentle tension and plenty of encouragement.",
    problem: "Long sits are hard for little ones. Book an early-morning walk-in before school — we open at 5 AM — and our braiders keep the tension gentle and the parts clean.",
    points: ["Kids box / knotless (medium) $180", "Kids box / knotless (small) $250", "Kids butterfly locs $220", "Kids Senegalese twist $140", "Walk-ins from 5 AM"],
    reviewIndex: 2,
    photos: ["/media/work-ac/kids-lemonade", "/media/work-ac/kids-braids"],
    stylists: ["nicole", "dami", "yolande"],
    featured: ["kids-knotless-medium", "kids-butterfly-locs", "kids-senegalese", "kids-knotless-small"],
  },
  "mens-braids": {
    key: "men",
    metaTitle: "Men’s Braids, Twists & Cornrows · MD & VA",
    metaDesc: "Men’s barrel twists $150, men’s box braids from $120, straight cornrows $70, design cornrows from $80, comb twists $80 and men’s haircuts. Open 24/7 in MD & VA.",
    eyebrow: "Men · MD & VA",
    h1: ["Sharp braids.", "Clean", "lines."],
    intro: "Barrel twists, men’s box braids, straight and design cornrows, men’s stitch braids, comb twists and haircuts — with walk-ins from 5 AM, before work.",
    problem: "Busy schedule? We’re open 24/7. Walk in from 5 AM or book after hours, and leave with braids that stay neat until your next visit.",
    points: ["Barrel twists $150", "Men’s box braids from $120", "Straight cornrows (10–12) $70", "Design cornrows from $80", "Comb twists $80"],
    photos: ["/media/work-ac/mens-stitch-braids"],
    stylists: ["dami", "albertine"],
    featured: ["barrel-twist", "man-box-braids", "mens-straight-cornrows", "mens-design-cornrows"],
  },
};
