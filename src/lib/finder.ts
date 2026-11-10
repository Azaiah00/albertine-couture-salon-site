/**
 * PRICE FINDER data — Albertine Couture's real Vagaro price grids (Gaithersburg, 2026-11-09).
 * Vagaro lists every style as a separate item per size × length (e.g. "Medium Knotless
 * Braids Lower Back $235"). This file rebuilds those grids so a visitor can find their exact
 * price in three taps. Regular prices (before the 10% Daily Deal). `from` = "Starting at".
 * Prices are placeholders until the salon confirms them.
 */
export const LENGTHS = [
  { key: "shoulder", label: "Shoulder" },
  { key: "upper", label: "Upper back" },
  { key: "bra", label: "Bra strap" },
  { key: "midback", label: "Mid-back" },
  { key: "lower", label: "Lower back" },
  { key: "waist", label: "Waist" },
  { key: "topbutt", label: "Top of butt" },
  { key: "butt", label: "Butt length" },
  { key: "underbutt", label: "Under butt" },
] as const;
export type LengthKey = (typeof LENGTHS)[number]["key"];

export type Size = { key: string; label: string; prices: Partial<Record<LengthKey, number>>; from?: boolean };
export type FinderStyle = {
  key: string;
  label: string;
  group: "Knotless & Boho" | "Braids" | "Twists" | "Locs";
  photo: string;
  blurb: string;
  sizes: Size[];
  /** Service to open in the booker. */
  bookId: string;
  hairIncluded?: boolean;
};

const L = (shoulder?: number, upper?: number, bra?: number, midback?: number, lower?: number, waist?: number, topbutt?: number, butt?: number, underbutt?: number) =>
  Object.fromEntries(Object.entries({ shoulder, upper, bra, midback, lower, waist, topbutt, butt, underbutt }).filter(([, v]) => v != null)) as Partial<Record<LengthKey, number>>;

export const FINDER: FinderStyle[] = [
  {
    key: "knotless",
    label: "Knotless Braids",
    group: "Knotless & Boho",
    photo: "/media/work-ac/peekaboo-boho",
    blurb: "Lightweight, flat at the root, no tension knot — the everyday favorite.",
    bookId: "knotless-medium-shoulder",
    sizes: [
      { key: "jumbo", label: "Jumbo", prices: L(150, 160, 160, 180, 200, 220, 230, 250, 270) },
      { key: "large", label: "Large", prices: L(140, 160, 180, 200, 220, 240, 270, 300, 320) },
      { key: "medium", label: "Medium", prices: L(180, undefined, 200, 220, 235, 250, 320, 350, 400) },
      { key: "small-medium", label: "Small-medium", prices: L(220, undefined, 235, 250, 270, 280) },
    ],
  },
  {
    key: "boho",
    label: "Boho Knotless",
    group: "Knotless & Boho",
    photo: "/media/work-ac/peekaboo-boho",
    blurb: "Knotless braids with curly human-hair or synthetic pieces left out for a soft, lived-in finish.",
    bookId: "boho-knotless-shoulder",
    sizes: [{ key: "medium", label: "Medium", prices: L(200, 220, 220, 235, 250, 270) }],
  },
  {
    key: "gypsy",
    label: "Gypsy Knotless",
    group: "Knotless & Boho",
    photo: "/media/work-ac/gypsy-knotless",
    blurb: "Fuller, curlier boho — more curls through every braid.",
    bookId: "gypsy-knotless-shoulder",
    sizes: [{ key: "medium", label: "Medium", prices: L(250, 270, 300, 325, 350, 380) }],
  },
  {
    key: "bora",
    label: "Bora Bora Braids",
    group: "Knotless & Boho",
    photo: "/media/work-ac/bora-bora",
    blurb: "Big, bouncy, beachy — braided ends with a full curly body.",
    bookId: "bora-bora-jumbo-shoulder",
    sizes: [{ key: "jumbo", label: "Jumbo", prices: L(220, 235, 250, 270, 300, 350) }],
  },
  {
    key: "fulani-boho",
    label: "Flip-Over Fulani Boho",
    group: "Knotless & Boho",
    photo: "/media/work-ac/flip-over-fulani",
    blurb: "Fulani cornrows up front flipped over boho knotless in the back.",
    bookId: "flip-over-fulani-shoulder",
    sizes: [{ key: "medium", label: "Medium", prices: L(250, 270, 300, 320, 350, 380) }],
  },
  {
    key: "mermaid",
    label: "Mermaid Braids",
    group: "Knotless & Boho",
    photo: "/media/work-ac/bora-bora",
    blurb: "Long, flowing, wavy pieces through jumbo braids.",
    bookId: "mermaid-jumbo-bra",
    sizes: [
      { key: "jumbo", label: "Jumbo", prices: L(undefined, undefined, 250, 270, 300, 350, undefined, 410) },
      { key: "large", label: "Large", prices: L(235) },
    ],
  },
  {
    key: "french-curl",
    label: "French Curl Braids",
    group: "Knotless & Boho",
    photo: "/media/work-ac/gypsy-knotless",
    blurb: "Box braids finished in loose French curls.",
    bookId: "french-curl-box-bra",
    sizes: [
      { key: "box", label: "Box (medium)", prices: L(undefined, undefined, 300, 350, undefined, 400) },
      { key: "jumbo", label: "Jumbo", prices: L(180) },
    ],
  },
  {
    key: "box",
    label: "Box Braids",
    group: "Braids",
    photo: "/media/work-ac/individual-braids",
    blurb: "The classic — square parts, braided to the ends.",
    bookId: "box-medium-shoulder",
    sizes: [{ key: "medium", label: "Medium", prices: L(180, undefined, 180, 200, 235, 250) }],
  },
  {
    key: "individual",
    label: "Individual Braids",
    group: "Braids",
    photo: "/media/work-ac/individual-braids",
    blurb: "Single braids, full length, any part pattern.",
    bookId: "individual-medium-shoulder",
    sizes: [{ key: "medium", label: "Medium", prices: L(160, 180, 200, 220, 235, 250) }],
  },
  {
    key: "micro",
    label: "Micro Braids",
    group: "Braids",
    photo: "/media/work-ac/micro-braids",
    blurb: "Tiny braids with braiding hair — maximum versatility, long wear.",
    bookId: "micro-braiding-shoulder",
    sizes: [{ key: "micro", label: "Micro", prices: L(350, 400, 450, 500, 550, 600) }],
  },
  {
    key: "passion",
    label: "Passion Twist",
    group: "Twists",
    photo: "/media/work-ac/passion-twist",
    blurb: "Soft, bohemian, curly twists.",
    bookId: "passion-jumbo-shoulder",
    sizes: [{ key: "jumbo", label: "Jumbo", prices: L(120, 140, 160, 180, 200, 220) }],
  },
  {
    key: "senegalese",
    label: "Senegalese Twist",
    group: "Twists",
    photo: "/media/work-ac/senegalese-twist",
    blurb: "Sleek rope-like twists with a silky finish.",
    bookId: "senegalese-jumbo-shoulder",
    sizes: [{ key: "jumbo", label: "Jumbo", prices: L(120, 140, 160, 180, 180, 220) }],
  },
  {
    key: "marley",
    label: "Marley Twist",
    group: "Twists",
    photo: "/media/work-ac/marley-twist",
    blurb: "Textured, natural-looking twists with Marley hair.",
    bookId: "marley-jumbo-shoulder",
    sizes: [{ key: "jumbo", label: "Jumbo", prices: L(120, 140, 160, 180, 200, 220) }],
  },
  {
    key: "island",
    label: "Island Twist",
    group: "Twists",
    photo: "/media/work-ac/passion-twist",
    blurb: "Twists with curly ends and a carefree, beachy feel.",
    bookId: "island-jumbo-shoulder",
    sizes: [{ key: "jumbo", label: "Jumbo", prices: L(140, 160, 180, 200, 220, 235) }],
  },
  {
    key: "havana",
    label: "Havana Twist",
    group: "Twists",
    photo: "/media/work-ac/marley-twist",
    blurb: "Chunky, fluffy twists with kinky hair.",
    bookId: "havana-medium-shoulder",
    sizes: [{ key: "medium", label: "Medium", from: true, prices: L(160, 180, 200, 220, 250, 270) }],
  },
  {
    key: "rope",
    label: "Rope Twist",
    group: "Twists",
    photo: "/media/work-ac/senegalese-twist",
    blurb: "Tight, defined two-strand rope twists.",
    bookId: "rope-medium-shoulder",
    sizes: [{ key: "medium", label: "Medium", from: true, prices: L(200, 220, 240, 255, 270, 290) }],
  },
  {
    key: "yarn",
    label: "Yarn Twist",
    group: "Twists",
    photo: "/media/work-ac/senegalese-twist",
    blurb: "Soft, light yarn twists — gentle on edges.",
    bookId: "yarn-medium-shoulder",
    sizes: [{ key: "medium", label: "Medium", from: true, prices: L(180, 200, 220, 235, 250, 270) }],
  },
  {
    key: "micro-locs",
    label: "Micro Locs",
    group: "Locs",
    photo: "/media/work-ac/interlocking-locs",
    blurb: "Start micro locs with your own natural hair.",
    bookId: "micro-locs-shoulder",
    sizes: [{ key: "micro", label: "Micro (natural hair)", prices: L(550, 700, 900, 1200) }],
  },
  {
    key: "faux-locs",
    label: "Custom Faux Locs",
    group: "Locs",
    photo: "/media/work-ac/faux-locs",
    blurb: "Soft locs, fake locs and butterfly locs, custom-wrapped.",
    bookId: "custom-faux-locs-shoulder",
    sizes: [{ key: "custom", label: "Custom", prices: L(250, 300, 350) }],
  },
];

export const FINDER_GROUPS = ["Knotless & Boho", "Braids", "Twists", "Locs"] as const;
