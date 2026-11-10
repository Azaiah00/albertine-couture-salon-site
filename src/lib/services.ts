/**
 * Albertine Couture — service menu.
 * Copied from their live Vagaro page (Gaithersburg, the flagship) on 2026-11-09: 45 categories,
 * ~1,350 bookable variants (every style × size × length). This file carries the headline
 * services; the full size × length price grids live in `src/lib/finder.ts` (Price Finder).
 * `vagaro` keeps their exact Vagaro wording so the audit can compare. Prices are their
 * REGULAR Vagaro prices (most items also show a 10% "Daily Deal"). "from" = Vagaro "Starting at".
 * DURATIONS ARE ESTIMATES — Vagaro did not publish times (ASSETS-OWED.md).
 * Every price is a placeholder until the salon confirms it.
 */
export type CategoryKey = "knotless" | "braids" | "twists" | "locs" | "weaves" | "extensions" | "natural" | "kids" | "men" | "extras";
export type PriceType = "fixed" | "from" | "varies" | "consult" | "per";
export type StaffKey = "albertine" | "nicole" | "magui" | "victoria" | "dami" | "yolande";

export type Service = {
  id: string;
  vagaro: string;
  name: string;
  category: CategoryKey;
  price: number | null;
  priceType: PriceType;
  unit?: string;
  minutes: number;
  desc?: string;
  addOn?: boolean;
  deposit?: number;
  popular?: boolean;
  /** Braiding / weave hair is not included unless the name says so (their policy). */
  hairExtra?: boolean;
};

export const CATEGORIES: {
  key: CategoryKey;
  label: string;
  short: string;
  slug?: string;
  art: string;
  photo: string;
  blurb: string;
}[] = [
  { key: "knotless", label: "Knotless, Boho & Bora Bora", short: "Knotless & Boho", slug: "knotless-braids", art: "/media/art/braids.svg", photo: "/media/work-ac/gypsy-knotless", blurb: "Knotless, triangle, bohemian, gypsy, mermaid, flip-over Fulani, Bora Bora and French curl braids — every size, every length." },
  { key: "braids", label: "Box Braids, Cornrows & Micro", short: "Braids & Cornrows", slug: "box-braids-cornrows", art: "/media/art/braids.svg", photo: "/media/work-ac/stitch-cornrows", blurb: "Box and individual braids, miracle knot braids, stitch, lemonade, tribal and freestyle cornrows, tree braids and micro braids." },
  { key: "twists", label: "Twists & Crochet", short: "Twists", slug: "twists", art: "/media/art/locs.svg", photo: "/media/work-ac/passion-twist", blurb: "Senegalese, passion, Havana, Marley, yarn, rope, island and spring twists — plus crochet styles with human or synthetic hair." },
  { key: "locs", label: "Locs, Micro Locs & Faux Locs", short: "Locs", slug: "locs", art: "/media/art/locs.svg", photo: "/media/work-ac/interlocking-locs", blurb: "Retwists and styles, starter and instant locs, micro locs, Sisterlocks maintenance, loc extensions, soft and butterfly locs." },
  { key: "weaves", label: "Sew-Ins, Wigs & Ponytails", short: "Sew-Ins & Wigs", slug: "sew-ins-wigs", art: "/media/art/weave.svg", photo: "/media/work-ac/closure-sewin", blurb: "Versatile, closure and leave-out sew-ins, bundle deals, glueless wig installs, wig making and sleek ponytails." },
  { key: "extensions", label: "K-Tip & I-Tip Extensions", short: "K-Tip & I-Tip", slug: "k-tip-i-tip-extensions", art: "/media/art/silkpress.svg", photo: "/media/work-ac/i-tip-extensions", blurb: "Fusion K-tip and I-tip extensions by the bundle, plus maintenance — the most natural-moving length and volume." },
  { key: "natural", label: "Silk Press, Color & Cuts", short: "Silk Press & Color", slug: "silk-press-color", art: "/media/art/pixie.svg", photo: "/media/work-ac/silk-press", blurb: "Olaplex silk press packages, blowouts, Bantu knots, color and highlights, relaxers, keratin and precision cuts." },
  { key: "kids", label: "Kids (11 & younger)", short: "Kids", slug: "kids-braids", art: "/media/art/kids.svg", photo: "/media/work-ac/kids-lemonade", blurb: "Kids knotless and box braids, butterfly locs, micro braids and twists — gentle hands, clean parts." },
  { key: "men", label: "Men’s Styles", short: "Men", slug: "mens-braids", art: "/media/art/barber.svg", photo: "/media/work-ac/mens-stitch-braids", blurb: "Barrel twists, men’s box braids, straight and design cornrows, comb twists and haircuts." },
  { key: "extras", label: "Take-Downs, Touch-Ups & Bridal", short: "Extras", art: "/media/art/weave.svg", photo: "/media/work-ac/salon-chairs", blurb: "Take-downs, touch-ups on our work, wash & blow-dry prep, bridal trials and the after-hours appointment fee." },
];

export const CATEGORY_BY_KEY = Object.fromEntries(CATEGORIES.map((c) => [c.key, c])) as Record<CategoryKey, (typeof CATEGORIES)[number]>;

const H = (h: number) => Math.round(h * 60);

export const SERVICES: Service[] = [
  // ---------------------------------------------------------------- Knotless, boho & Bora Bora
  { id: "knotless-medium-shoulder", vagaro: "Medium Knotless Braids Shoulder Length", name: "Medium Knotless Braids · Shoulder Length", category: "knotless", price: 180, priceType: "fixed", minutes: H(5.5), popular: true, hairExtra: true },
  { id: "knotless-medium-midback", vagaro: "Medium Knotless Braid Midback", name: "Medium Knotless Braids · Mid-Back", category: "knotless", price: 220, priceType: "fixed", minutes: H(6.5), hairExtra: true },
  { id: "knotless-medium-waist", vagaro: "Medium Knotless Braids Waist Back", name: "Medium Knotless Braids · Waist Length", category: "knotless", price: 250, priceType: "fixed", minutes: H(7.5), hairExtra: true },
  { id: "knotless-large-shoulder", vagaro: "Large Knotless Braids Shoulder Length", name: "Large Knotless Braids · Shoulder Length", category: "knotless", price: 140, priceType: "fixed", minutes: H(4), hairExtra: true },
  { id: "knotless-jumbo-shoulder", vagaro: "Jumbo Knotless Braids Shoulder Length", name: "Jumbo Knotless Braids · Shoulder Length", category: "knotless", price: 150, priceType: "fixed", minutes: H(3), hairExtra: true },
  { id: "knotless-small-medium-shoulder", vagaro: "Small Medium Knotless Braid Shoulder Length", name: "Small-Medium Knotless Braids · Shoulder Length", category: "knotless", price: 220, priceType: "fixed", minutes: H(7), hairExtra: true },
  { id: "triangle-knotless-shoulder", vagaro: "Medium Triangle Knotless Braids Shoulder Length", name: "Medium Triangle Knotless · Shoulder Length", category: "knotless", price: 180, priceType: "fixed", minutes: H(6), hairExtra: true },
  { id: "boho-knotless-shoulder", vagaro: "Medium Knotless Bohemian Braids Shoulder Length", name: "Medium Boho Knotless · Shoulder Length", category: "knotless", price: 200, priceType: "fixed", minutes: H(6), popular: true, hairExtra: true },
  { id: "boho-knotless-midback", vagaro: "Medium Knotless Bohemian Braids Mid Back", name: "Medium Boho Knotless · Mid-Back", category: "knotless", price: 235, priceType: "fixed", minutes: H(7), hairExtra: true },
  { id: "boho-knotless-waist", vagaro: "Medium Knotless Bohemian Braids Waist Back", name: "Medium Boho Knotless · Waist Length", category: "knotless", price: 270, priceType: "fixed", minutes: H(8), hairExtra: true },
  { id: "gypsy-knotless-shoulder", vagaro: "Medium Knotless Gypsy Braids Shoulder Length", name: "Medium Gypsy Knotless · Shoulder Length", category: "knotless", price: 250, priceType: "fixed", minutes: H(6.5), hairExtra: true },
  { id: "mermaid-jumbo-bra", vagaro: "JUMBO MERMAID BRAIDS (BRA LENGTH )", name: "Jumbo Mermaid Braids · Bra Length", category: "knotless", price: 250, priceType: "fixed", minutes: H(5), hairExtra: true },
  { id: "flip-over-fulani-shoulder", vagaro: "Medium flip-over fulani bohemian knotless braid Shoulder Length", name: "Flip-Over Fulani Boho Knotless · Shoulder Length", category: "knotless", price: 250, priceType: "fixed", minutes: H(6), hairExtra: true },
  { id: "bora-bora-jumbo-shoulder", vagaro: "JUMBO BORA BRAIDS (SHOULDER LENGTH)", name: "Jumbo Bora Bora Braids · Shoulder Length", category: "knotless", price: 220, priceType: "fixed", minutes: H(4.5), popular: true, hairExtra: true },
  { id: "bora-bora-jumbo-midback", vagaro: "JUMBO BORA BRAIDS (MID BACK )", name: "Jumbo Bora Bora Braids · Mid-Back", category: "knotless", price: 270, priceType: "fixed", minutes: H(5.5), hairExtra: true },
  { id: "french-curl-box-bra", vagaro: "FRENCH CURLY _BOX BRAIDS (BRA LENGTH)", name: "French Curl Box Braids · Bra Length", category: "knotless", price: 300, priceType: "fixed", minutes: H(7), hairExtra: true },
  { id: "jumbo-french-curl", vagaro: "JUMBO FRENCH CURL (SHOULDER LENGTH)", name: "Jumbo French Curl · Shoulder Length", category: "knotless", price: 180, priceType: "fixed", minutes: H(4), hairExtra: true },

  // ---------------------------------------------------------------- Box braids, cornrows & micro
  { id: "box-medium-shoulder", vagaro: "Medium Box Braid Shoulder Length", name: "Medium Box Braids · Shoulder Length", category: "braids", price: 180, priceType: "fixed", minutes: H(5.5), popular: true, hairExtra: true },
  { id: "box-medium-midback", vagaro: "Medium Box Braids Mid Back", name: "Medium Box Braids · Mid-Back", category: "braids", price: 200, priceType: "from", minutes: H(6.5), hairExtra: true },
  { id: "box-medium-waist", vagaro: "Medium Box Braid Waist Length", name: "Medium Box Braids · Waist Length", category: "braids", price: 250, priceType: "fixed", minutes: H(7.5), hairExtra: true },
  { id: "box-maintenance", vagaro: "Box Braid Maintenance (Touch Up)", name: "Box Braid Maintenance (Touch-Up)", category: "braids", price: 80, priceType: "fixed", minutes: H(2) },
  { id: "individual-medium-shoulder", vagaro: "Medium Individual Braids Shoulder Length", name: "Medium Individual Braids · Shoulder Length", category: "braids", price: 160, priceType: "fixed", minutes: H(5), hairExtra: true },
  { id: "miracle-braids-medium", vagaro: "MEDIUM MIRACLE BRAIDS", name: "Medium Miracle Knot Braids", category: "braids", price: 200, priceType: "fixed", minutes: H(5), popular: true, desc: "Their featured style this season.", hairExtra: true },
  { id: "miracle-braids-small-medium", vagaro: "SMALL MEDIUM MIRACLES BRAIDS", name: "Small-Medium Miracle Knot Braids", category: "braids", price: 220, priceType: "fixed", minutes: H(6), hairExtra: true },
  { id: "halo-braids", vagaro: "Halo Braids", name: "Halo Braids", category: "braids", price: 60, priceType: "fixed", minutes: H(1.5) },
  { id: "freestyle-cornrow", vagaro: "FREESYLE CORNROW", name: "Freestyle Cornrows", category: "braids", price: 250, priceType: "fixed", minutes: H(4), hairExtra: true },
  { id: "cornrow-mohawk-weave", vagaro: "CORNROW MOHAWK WITH WEAVE", name: "Cornrow Mohawk with Weave", category: "braids", price: 220, priceType: "fixed", minutes: H(3.5), hairExtra: true },
  { id: "half-cornrow-half-sewin", vagaro: "HALF DESIGN CORNROW/HALF SEWIN", name: "Half Design Cornrows / Half Sew-In", category: "braids", price: 220, priceType: "fixed", minutes: H(4), hairExtra: true },
  { id: "tree-braids-cornrow", vagaro: "CORNROWS TREE BRAIDS", name: "Cornrow Tree Braids", category: "braids", price: 250, priceType: "from", minutes: H(5), hairExtra: true },
  { id: "tree-braids-individual", vagaro: "INDIVIDUAL TREE BRAIDS", name: "Individual Tree Braids", category: "braids", price: 350, priceType: "from", minutes: H(7), hairExtra: true },
  { id: "micro-braiding-shoulder", vagaro: "MICRO WITH BRAIDING HAIR (SHOULDER LENGTH)", name: "Micro Braids with Braiding Hair · Shoulder Length", category: "braids", price: 350, priceType: "fixed", minutes: H(9), hairExtra: true },

  // ---------------------------------------------------------------- Twists & crochet
  { id: "passion-jumbo-shoulder", vagaro: "JUMBO PASSION TWIST (SHOULDER LENGTH)", name: "Jumbo Passion Twist · Shoulder Length", category: "twists", price: 120, priceType: "fixed", minutes: H(3), popular: true, hairExtra: true },
  { id: "senegalese-jumbo-shoulder", vagaro: "JUMBO SENEGALESE TWIST (SHOULDER LENGTH)", name: "Jumbo Senegalese Twist · Shoulder Length", category: "twists", price: 120, priceType: "fixed", minutes: H(3), hairExtra: true },
  { id: "marley-jumbo-shoulder", vagaro: "JUMBO MARLEY TWIST (SHOULDER LENGTH)", name: "Jumbo Marley Twist · Shoulder Length", category: "twists", price: 120, priceType: "fixed", minutes: H(3), hairExtra: true },
  { id: "havana-medium-shoulder", vagaro: "Medium Havana Twist Shoulder Length", name: "Medium Havana Twist · Shoulder Length", category: "twists", price: 160, priceType: "from", minutes: H(4.5), hairExtra: true },
  { id: "yarn-medium-shoulder", vagaro: "Medium Yarn Twist Shoulder Length", name: "Medium Yarn Twist · Shoulder Length", category: "twists", price: 180, priceType: "from", minutes: H(5), hairExtra: true },
  { id: "rope-medium-shoulder", vagaro: "Medium Rope Twist Shoulder Length", name: "Medium Rope Twist · Shoulder Length", category: "twists", price: 200, priceType: "from", minutes: H(5), hairExtra: true },
  { id: "island-jumbo-shoulder", vagaro: "JUMBO ISLAND TWIST (SHOULDER LENGTH)", name: "Jumbo Island Twist · Shoulder Length", category: "twists", price: 140, priceType: "fixed", minutes: H(3.5), hairExtra: true },
  { id: "spring-twist-shoulder", vagaro: "SPRING TWIST SHOULDER LENGTH", name: "Spring Twist · Shoulder Length", category: "twists", price: 200, priceType: "from", minutes: H(4), hairExtra: true },
  { id: "african-twist", vagaro: "AFRICAN TWIST", name: "African Twist", category: "twists", price: 180, priceType: "from", minutes: H(5), hairExtra: true },
  { id: "crochet-box", vagaro: "Crochet Box Braid", name: "Crochet Box Braids", category: "twists", price: 135, priceType: "from", minutes: H(3), hairExtra: true },
  { id: "crochet-locs", vagaro: "Crochet Locs", name: "Crochet Locs", category: "twists", price: 135, priceType: "from", minutes: H(3), hairExtra: true },
  { id: "brazilian-crochet", vagaro: "100 % BRAZILIAN HUMAN CROCHET BRAID", name: "100% Brazilian Human Hair Crochet", category: "twists", price: 180, priceType: "from", minutes: H(3.5), hairExtra: true },
  { id: "fulani-crochet", vagaro: "Fulani Human Hair Crochet / Cornrow And Half Human Crochet", name: "Fulani Cornrows + Human Hair Crochet", category: "twists", price: 220, priceType: "from", minutes: H(4), hairExtra: true },

  // ---------------------------------------------------------------- Locs
  { id: "locs-retwist", vagaro: "Locs - Re-Twist", name: "Locs Re-Twist", category: "locs", price: 80, priceType: "fixed", minutes: H(2), popular: true },
  { id: "loc-retwist-two-strand", vagaro: "Loc Retwists and style (two-strand-twist)", name: "Loc Retwist & Style (Two-Strand Twist)", category: "locs", price: 160, priceType: "from", minutes: H(3) },
  { id: "loc-retwist-updo", vagaro: "Loc Retwists and style (updo or ponytails)", name: "Loc Retwist & Style (Updo or Ponytail)", category: "locs", price: 120, priceType: "from", minutes: H(2.5) },
  { id: "locs-repair", vagaro: "Locs - Repair", name: "Loc Repair", category: "locs", price: 25, priceType: "fixed", minutes: H(1) },
  { id: "starter-locs-comb", vagaro: "Starter Locs with comb twists", name: "Starter Locs · Comb Twists", category: "locs", price: 100, priceType: "from", minutes: H(2.5) },
  { id: "starter-locs-two-strand", vagaro: "Starter Locs two strand twists", name: "Starter Locs · Two-Strand Twists", category: "locs", price: 150, priceType: "from", minutes: H(3) },
  { id: "instant-locs", vagaro: "INSTANT LOCS", name: "Instant Locs", category: "locs", price: 350, priceType: "from", minutes: H(8) },
  { id: "micro-locs-shoulder", vagaro: "START MICRO LOCS WITH YOUR NATURAL HAIR (SHOULDER LENGTH)", name: "Start Micro Locs · Shoulder Length", category: "locs", price: 550, priceType: "fixed", minutes: H(12), desc: "Micro locs with your natural hair. Longer lengths up to $3,000 — see the Price Finder." },
  { id: "sisterlocks-maintenance", vagaro: "Sister locs maintenance", name: "Sisterlocks Maintenance", category: "locs", price: 250, priceType: "from", minutes: H(6) },
  { id: "loc-extensions", vagaro: "LOCS EXTENSION", name: "Loc Extensions", category: "locs", price: 700, priceType: "from", minutes: H(10) },
  { id: "soft-locs", vagaro: "SOFT LOCS (PRE-MADE/ROOT)", name: "Soft Locs (pre-made / root)", category: "locs", price: 250, priceType: "fixed", minutes: H(4), hairExtra: true },
  { id: "butterfly-locs", vagaro: "BUTTERFLY LOCS (PRE-MADE/ROOT)", name: "Butterfly Locs (pre-made / root)", category: "locs", price: 250, priceType: "fixed", minutes: H(4), popular: true, hairExtra: true },
  { id: "custom-faux-locs-shoulder", vagaro: "CUSTOM FAUX LOCS (SOFT LOC, FAKE LOCS & BUTTERFLY) SHOULDER LENGTH", name: "Custom Faux Locs · Shoulder Length", category: "locs", price: 250, priceType: "fixed", minutes: H(5), hairExtra: true },
  { id: "crochet-soft-locs", vagaro: "Crochet Soft Locs", name: "Crochet Soft Locs", category: "locs", price: 135, priceType: "fixed", minutes: H(3), hairExtra: true },

  // ---------------------------------------------------------------- Sew-ins, wigs & ponytails
  { id: "versatile-sewin", vagaro: "Versatile Full Sew-In", name: "Versatile Full Sew-In", category: "weaves", price: 150, priceType: "fixed", minutes: H(3), popular: true, hairExtra: true },
  { id: "two-part-versatile", vagaro: "2 part versatile sewin", name: "2-Part Versatile Sew-In", category: "weaves", price: 150, priceType: "fixed", minutes: H(3), hairExtra: true },
  { id: "leave-out-sewin", vagaro: "Leave Out Sewin / Traditional Sewin (middle part or side part)", name: "Leave-Out / Traditional Sew-In", category: "weaves", price: 170, priceType: "fixed", minutes: H(3), hairExtra: true },
  { id: "full-sewin", vagaro: "Full Sew In Weave (No hair Out)", name: "Full Sew-In (No Hair Out)", category: "weaves", price: 180, priceType: "fixed", minutes: H(3), hairExtra: true },
  { id: "closure-sewin", vagaro: "Closure Sew In", name: "Closure Sew-In", category: "weaves", price: 200, priceType: "fixed", minutes: H(3.5), popular: true, hairExtra: true },
  { id: "sewin-2-bundles", vagaro: "VERSATILE SEWIN / TRADITIONNAL SEWIN WITH 2 BUNDLES", name: "Sew-In with 2 Bundles (hair included)", category: "weaves", price: 225, priceType: "fixed", minutes: H(3.5) },
  { id: "bundle-deal", vagaro: "12,14,16 BUNDLE DEALS", name: "12″ · 14″ · 16″ Bundle Deal", category: "weaves", price: 500, priceType: "fixed", minutes: H(3.5), desc: "Bundles from their own “Best Hair Extension” line." },
  { id: "lace-wig-closure-sewin", vagaro: "LACE WIG CLOSURE SEW-IN (NO GLUE)", name: "Lace Closure Wig Sew-In (No Glue)", category: "weaves", price: 170, priceType: "fixed", minutes: H(2.5) },
  { id: "sewin-wig-no-lace", vagaro: "SEW-IN WIG WITHOUT LACE", name: "Sew-In Wig (No Lace)", category: "weaves", price: 150, priceType: "fixed", minutes: H(2) },
  { id: "lace-frontal-wig", vagaro: "Lace frontal Wig (Bleach knot Included)", name: "Lace Frontal Wig Install (bleached knots included)", category: "weaves", price: 170, priceType: "from", minutes: H(3) },
  { id: "wig-making", vagaro: "WIG MAKING/BRING YOUR BUNDLES", name: "Wig Making (bring your bundles)", category: "weaves", price: 200, priceType: "fixed", minutes: H(4) },
  { id: "wig-style", vagaro: "WIG STYLE", name: "Wig Style", category: "weaves", price: 75, priceType: "fixed", minutes: H(1) },
  { id: "half-up-partial-sewin", vagaro: "HALF UP PARTIAL SEWIN", name: "Half-Up Partial Sew-In", category: "weaves", price: 220, priceType: "fixed", minutes: H(3), hairExtra: true },
  { id: "sleek-ponytail-braid", vagaro: "SLEEK PONYTAIL WITH BRAID", name: "Sleek Ponytail with Braid", category: "weaves", price: 100, priceType: "fixed", minutes: H(1.5), hairExtra: true },
  { id: "extended-ponytail", vagaro: "EXTENDED PONYTAIL WEAVE", name: "Extended Ponytail", category: "weaves", price: 150, priceType: "fixed", minutes: H(2), hairExtra: true },
  { id: "lace-frontal-ponytail", vagaro: "LACE FRONTAL EXTENDED PONYTAIL", name: "Lace Frontal Extended Ponytail", category: "weaves", price: 180, priceType: "fixed", minutes: H(2.5), hairExtra: true },
  { id: "top-knot-bun", vagaro: "TOP KNOT BUN", name: "Top Knot Bun", category: "weaves", price: 120, priceType: "fixed", minutes: H(1.5), hairExtra: true },
  { id: "bleach-knots", vagaro: "Bleach closure Knot (ONLY)", name: "Bleach Closure Knots", category: "weaves", price: 40, priceType: "from", minutes: 30, addOn: true },

  // ---------------------------------------------------------------- K-tip & I-tip
  { id: "i-tip-2", vagaro: "I-TIP EXTENSION (2 Bundles or 150 pieces)", name: "I-Tip Extensions · 2 bundles (150 pieces)", category: "extensions", price: 650, priceType: "fixed", minutes: H(4), popular: true },
  { id: "i-tip-3", vagaro: "I TIP EXTENSION (3 bundles or 225 pieces)", name: "I-Tip Extensions · 3 bundles (225 pieces)", category: "extensions", price: 850, priceType: "fixed", minutes: H(5) },
  { id: "i-tip-maintenance", vagaro: "I TIP Maintenance", name: "I-Tip Maintenance", category: "extensions", price: 350, priceType: "fixed", minutes: H(3) },
  { id: "k-tip-2", vagaro: "K-TIP EXTENSION (2 bundles or 150 pieces)", name: "K-Tip Extensions · 2 bundles (150 pieces)", category: "extensions", price: 850, priceType: "fixed", minutes: H(5) },
  { id: "k-tip-3", vagaro: "K TIP EXTENSION (3 bundles or 225 pieces)", name: "K-Tip Extensions · 3 bundles (225 pieces)", category: "extensions", price: 1000, priceType: "fixed", minutes: H(6) },
  { id: "k-tip-4", vagaro: "K TIP EXTENSION (4 bundles or 300 pieces)", name: "K-Tip Extensions · 4 bundles (300 pieces)", category: "extensions", price: 1100, priceType: "fixed", minutes: H(7) },

  // ---------------------------------------------------------------- Silk press, color & cuts
  { id: "silk-press-olaplex", vagaro: "OLAPLEX SILK PRESS PACKAGE", name: "Olaplex Silk Press Package", category: "natural", price: 150, priceType: "from", minutes: H(2.5), popular: true },
  { id: "silk-press-ultimate", vagaro: "ULTIMATE SILK PRESS PACKAGE", name: "Ultimate Silk Press Package", category: "natural", price: 105, priceType: "from", minutes: H(2) },
  { id: "shampoo-blowout", vagaro: "SHAMPOO AND BLOWOUT", name: "Shampoo & Blowout", category: "natural", price: 45, priceType: "from", minutes: H(1.25) },
  { id: "press-n-curl", vagaro: "Press N Curl", name: "Press & Curl", category: "natural", price: 60, priceType: "from", minutes: H(1.5) },
  { id: "bantu-extension", vagaro: "BANTU KNOT WITH EXTENSION", name: "Bantu Knots with Extensions", category: "natural", price: 140, priceType: "from", minutes: H(3), hairExtra: true },
  { id: "bantu-natural", vagaro: "BANTU KNOT WITHOUT EXTENSION", name: "Bantu Knots (natural hair)", category: "natural", price: 100, priceType: "from", minutes: H(2) },
  { id: "combo-twist-half", vagaro: "COMBO TWIST (HALF HEAD)", name: "Combo Twist (half head)", category: "natural", price: 80, priceType: "from", minutes: H(2) },
  { id: "color-consult", vagaro: "CONSULTATION (MUST BOOK FOR ANY FIRST TIME COLOR SERVICE)", name: "Color Consultation (required for first-time color)", category: "natural", price: 0, priceType: "fixed", minutes: 30 },
  { id: "color-full", vagaro: "COLOR - FULL HEAD + STYLING", name: "Full-Head Color + Styling", category: "natural", price: 300, priceType: "from", minutes: H(4), popular: true },
  { id: "color-tips", vagaro: "COLOR (TIPS/HIGHLIGHTS) + STYLING", name: "Color (Tips / Highlights) + Styling", category: "natural", price: 200, priceType: "from", minutes: H(3.5) },
  { id: "color-extensions", vagaro: "HAIR COLOR JET BLACK OR BROWN (HAIR EXTENSIONS, WIGS", name: "Jet Black or Brown Color for Extensions & Wigs", category: "natural", price: 80, priceType: "from", minutes: H(1.5) },
  { id: "full-highlight", vagaro: "Full Highlight", name: "Full Highlight", category: "natural", price: 75, priceType: "from", minutes: H(2.5) },
  { id: "partial-highlight", vagaro: "Partial Highlight", name: "Partial Highlight", category: "natural", price: 45, priceType: "fixed", minutes: H(1.5) },
  { id: "relaxer-touch-up", vagaro: "RELAXER TOUCH UP", name: "Relaxer Touch-Up", category: "natural", price: 85, priceType: "fixed", minutes: H(2) },
  { id: "virgin-relaxer", vagaro: "VIRGIN RELAXER", name: "Virgin Relaxer", category: "natural", price: 120, priceType: "fixed", minutes: H(2.5) },
  { id: "keratin", vagaro: "KERATIN TREATMENT", name: "Keratin Treatment", category: "natural", price: 250, priceType: "fixed", minutes: H(3) },
  { id: "relaxer-updo", vagaro: "RELAXER AND UPDO", name: "Relaxer & Updo", category: "natural", price: 180, priceType: "fixed", minutes: H(3) },
  { id: "womens-haircut", vagaro: "Women's Haircut", name: "Women’s Haircut", category: "natural", price: 40, priceType: "fixed", minutes: 45 },
  { id: "haircut-blowdry", vagaro: "Women's Haircut & Blow-Dry", name: "Women’s Haircut & Blow-Dry", category: "natural", price: 60, priceType: "fixed", minutes: H(1.25) },
  { id: "trim", vagaro: "Women's Hair Trim", name: "Trim", category: "natural", price: 25, priceType: "from", minutes: 30 },

  // ---------------------------------------------------------------- Kids
  { id: "kids-knotless-medium", vagaro: "Kids Box Brais/Knotless (Medium) (11 & Younger)", name: "Kids Box / Knotless Braids · Medium", category: "kids", price: 180, priceType: "fixed", minutes: H(5), popular: true, hairExtra: true },
  { id: "kids-knotless-small", vagaro: "Kids Box Braid/Knotless (Small) (11 & Younger)", name: "Kids Box / Knotless Braids · Small", category: "kids", price: 250, priceType: "fixed", minutes: H(6.5), hairExtra: true },
  { id: "kids-butterfly-locs", vagaro: "Kid Butterfly Locs (11 & Younger)", name: "Kids Butterfly Locs", category: "kids", price: 220, priceType: "fixed", minutes: H(4.5), hairExtra: true },
  { id: "kids-micro", vagaro: "Micro Braids", name: "Kids Micro Braids", category: "kids", price: 250, priceType: "fixed", minutes: H(7), hairExtra: true },
  { id: "kids-senegalese", vagaro: "Senegalese Twist", name: "Kids Senegalese Twist", category: "kids", price: 140, priceType: "fixed", minutes: H(4), hairExtra: true },

  // ---------------------------------------------------------------- Men
  { id: "barrel-twist", vagaro: "BARREL TWIST (with natural hair)", name: "Barrel Twists (natural hair)", category: "men", price: 150, priceType: "fixed", minutes: H(2.5), popular: true },
  { id: "man-box-braids", vagaro: "MAN BOX BRAIDS", name: "Men’s Box Braids", category: "men", price: 120, priceType: "from", minutes: H(3) },
  { id: "mens-straight-cornrows", vagaro: "10-12 Straight Cornrows", name: "Straight Cornrows (10–12)", category: "men", price: 70, priceType: "fixed", minutes: H(1.25) },
  { id: "mens-design-cornrows", vagaro: "Cornrows Design", name: "Design Cornrows", category: "men", price: 80, priceType: "from", minutes: H(1.5) },
  { id: "comb-twists", vagaro: "Dred Locks Comb twists", name: "Comb Twists", category: "men", price: 80, priceType: "fixed", minutes: H(1.5) },
  { id: "mens-haircut", vagaro: "Men's Haircut", name: "Men’s Haircut", category: "men", price: 30, priceType: "fixed", minutes: 30 },

  // ---------------------------------------------------------------- Extras
  { id: "wash-blowdry", vagaro: "Wash & blow-dry (site policy)", name: "Wash & Blow-Dry (braid prep)", category: "extras", price: 15, priceType: "fixed", minutes: 45, addOn: true, desc: "Come in ready — or add this and we prep your hair here." },
  { id: "short-hair", vagaro: "Natural hair 1–3 inches (site policy)", name: "Short Natural Hair (1–3 in)", category: "extras", price: 50, priceType: "fixed", minutes: 30, addOn: true },
  { id: "after-hours", vagaro: "After-hours fee (site policy)", name: "After-Hours Appointment", category: "extras", price: 30, priceType: "fixed", minutes: 0, addOn: true, desc: "For appointments outside walk-in hours (about 7:35 PM – 4:59 AM)." },
  { id: "take-out-braids", vagaro: "HALF BRAIDS HALF CORNROWS", name: "Take-Down · Braids / Cornrows", category: "extras", price: 50, priceType: "fixed", minutes: H(1.5) },
  { id: "take-out-weave", vagaro: "TAKE OUT @WEAVE", name: "Take-Down · Sew-In", category: "extras", price: 50, priceType: "fixed", minutes: H(1) },
  { id: "take-out-soft-locs", vagaro: "TAKE OUT@SOFT LOCS", name: "Take-Down · Soft Locs", category: "extras", price: 100, priceType: "fixed", minutes: H(2) },
  { id: "take-out-crochet", vagaro: "TAKE OUT@CROCHET", name: "Take-Down · Crochet", category: "extras", price: 50, priceType: "fixed", minutes: H(1) },
  { id: "touch-up", vagaro: "Touch-up", name: "Touch-Up (our work only)", category: "extras", price: 65, priceType: "from", minutes: H(1.5) },
  { id: "knotless-touch-up", vagaro: "KNOTLESS TOUCH UP (FRONT ONLY)", name: "Knotless Touch-Up (front only)", category: "extras", price: 120, priceType: "from", minutes: H(2) },
  { id: "faux-locs-touch-up", vagaro: "FAUX LOCS TOUCH UP (PERIMETER )", name: "Faux Locs Touch-Up (perimeter)", category: "extras", price: 100, priceType: "from", minutes: H(2) },
  { id: "wedding-consult", vagaro: "WEDDING CONSULTATION", name: "Wedding Consultation", category: "extras", price: 25, priceType: "fixed", minutes: 30 },
  { id: "bridal-trial", vagaro: "HAIR BRIDAL TRIAL", name: "Bridal Hair Trial", category: "extras", price: 80, priceType: "fixed", minutes: H(1.5) },
];

export const SERVICE_BY_ID = Object.fromEntries(SERVICES.map((s) => [s.id, s])) as Record<string, Service>;

/** Which categories each stylist takes in the DEMO portal (to confirm with Albertine — ASSETS-OWED.md). */
export const STAFF_CATEGORIES: Record<StaffKey, CategoryKey[]> = {
  albertine: ["knotless", "braids", "twists", "locs", "weaves", "extensions", "natural", "kids", "men", "extras"],
  nicole: ["knotless", "braids", "twists", "kids", "extras"],
  magui: ["knotless", "braids", "twists", "locs", "extras"],
  victoria: ["weaves", "extensions", "natural", "extras"],
  dami: ["braids", "twists", "locs", "men", "kids", "extras"],
  yolande: ["knotless", "weaves", "natural", "kids", "extras"],
};

export function servicesIn(cat: CategoryKey) {
  return SERVICES.filter((s) => s.category === cat);
}

export function fmtMoney(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
}

export function fmtPrice(s: Pick<Service, "price" | "priceType" | "unit">) {
  if (s.priceType === "consult") return "After consultation";
  if (s.priceType === "varies" || s.price == null) return "Price varies";
  if (s.price === 0) return "Free";
  if (s.priceType === "per") return `${fmtMoney(s.price)} per ${s.unit ?? "item"}`;
  return s.priceType === "from" ? `From ${fmtMoney(s.price)}` : fmtMoney(s.price);
}

export function fmtDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!min) return "—";
  if (!h) return `${m} min`;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

/** Lowest published price in a category (for "from" labels on tiles). */
export function fromPrice(cat: CategoryKey) {
  const p = servicesIn(cat)
    .filter((s) => !s.addOn && s.price != null && s.price > 0 && s.priceType !== "per" && s.minutes >= 30)
    .map((s) => s.price as number);
  return p.length ? Math.min(...p) : null;
}
