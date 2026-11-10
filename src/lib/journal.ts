/**
 * "The Couture Hair Journal" — education hub (an upsell surface: blog + newsletter).
 * DRAFTS written by Couture House for Albertine's review before launch
 * (ASSETS-OWED.md). General hair-care guidance only — no medical claims.
 */
export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  art: string;
  minutes: number;
  serviceIds: string[];
  body: { h?: string; p?: string; list?: string[] }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "knotless-vs-box-braids",
    title: "Knotless vs. box braids: which one is right for you?",
    dek: "Same family, different feel. How to choose between the two most-booked braid styles — and how to make either one last.",
    category: "Braids",
    art: "/media/art/braids.svg",
    minutes: 4,
    serviceIds: ["knotless-medium-shoulder", "box-medium-shoulder", "boho-knotless-shoulder", "wash-blowdry"],
    body: [
      { p: "Knotless braids and box braids look alike from across the room — and at Albertine Couture a medium, shoulder-length set of either one is $180. The difference is how each braid begins at your scalp, and that changes how they feel, how they grow out and who they suit best." },
      { h: "How they start" },
      { p: "Box braids begin with a small knot of braiding hair looped at the root, which gives a crisp, uniform start. Knotless braids begin with your own hair and feed the braiding hair in gradually, so the root lies flat and blends into your natural hair." },
      { h: "Choose knotless if…" },
      { list: ["You want less tension at the scalp and a lighter feel from day one", "You love a natural-looking root and parts you can style up right away", "You want to add boho curls later — boho, gypsy and Bora Bora styles all start from knotless"] },
      { h: "Choose box braids if…" },
      { list: ["You love the bold, defined, classic look at the root", "You want a slightly fuller braid with crisp structure", "You prefer a style that has held its shape for generations"] },
      { h: "Make them last" },
      { list: ["Come with hair washed and blow-dried straight, no oils or heavy products — or add a wash & blow-dry ($15)", "Sleep in a satin bonnet or on a satin pillowcase", "Keep your scalp clean and lightly moisturized between washes", "Book your take-down on time — leaving any protective style in too long stresses your hair"] },
      { p: "Still deciding? Open the Price Finder, compare both side by side at your length, and walk in from 5 AM to talk it through with a braider." },
    ],
  },
  {
    slug: "braid-length-and-price",
    title: "Shoulder to under-butt: how braid length changes your price (and your time)",
    dek: "Why a mid-back set costs more than shoulder length, how to measure before you book, and what to bring.",
    category: "Booking",
    art: "/media/art/locs.svg",
    minutes: 3,
    serviceIds: ["knotless-medium-midback", "knotless-medium-waist", "bora-bora-jumbo-shoulder"],
    body: [
      { p: "Every braid style on our menu is priced by size and length. A medium knotless set runs from $180 at shoulder length to $400 at under-butt — because longer braids take more hair, more time and more hands." },
      { h: "Find your length" },
      { list: ["Shoulder — braids rest on your shoulders", "Bra strap — the most-booked length, just below the shoulder blades", "Mid-back — halfway down your back", "Waist — at your natural waist", "Top of butt, butt and under butt — statement lengths for photoshoots and big events"] },
      { h: "Size matters too" },
      { p: "Jumbo braids go fastest; small and small-medium take the longest and cost the most. If you’re booking around work or school, a jumbo or large size at bra length is a great balance of time, budget and wear." },
      { h: "Before you book" },
      { list: ["Use the Price Finder to see your exact regular price", "Ask what braiding hair to bring — it usually isn’t included", "Natural hair should be at least 4 inches (1–3 inches is +$50)", "A $20 deposit holds your spot and comes off your total"] },
    ],
  },
  {
    slug: "k-tip-vs-i-tip-extensions",
    title: "K-tip or I-tip extensions? What to expect from your first install",
    dek: "Strand-by-strand extensions move like your own hair. Here’s how the two methods differ, how long they take, and how to care for them.",
    category: "Extensions",
    art: "/media/art/silkpress.svg",
    minutes: 4,
    serviceIds: ["i-tip-2", "k-tip-2", "i-tip-maintenance"],
    body: [
      { p: "K-tip and I-tip extensions add length and volume strand by strand — no braids underneath and no leave-out to blend. At Albertine Couture they’re priced by the bundle: 2 bundles is about 150 pieces, 3 bundles about 225, and 4 bundles about 300." },
      { h: "K-tip (keratin fusion)" },
      { p: "Each small strand is bonded to your own hair with a keratin tip. It’s a long-wear method with a very flat, discreet result — K-tip installs start at $850 for 2 bundles." },
      { h: "I-tip (micro link)" },
      { p: "Each strand is attached with a tiny bead — no heat, and easy to move up during maintenance. I-tip installs start at $650 for 2 bundles, and I-tip maintenance is $350." },
      { h: "Caring for them" },
      { list: ["Brush gently from ends to roots with a loop or soft-bristle brush", "Wash with sulfate-free products and keep conditioner off the bonds", "Sleep with hair loosely braided or in a satin bonnet", "Book maintenance before you leave the chair"] },
      { p: "Not sure how many bundles you need? Book a consultation — your stylist will match pieces to your density and the look you want." },
    ],
  },
];

export const ARTICLE_BY_SLUG = Object.fromEntries(ARTICLES.map((a) => [a.slug, a])) as Record<string, Article>;
