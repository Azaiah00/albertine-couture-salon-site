import type { StaffKey } from "@/lib/services";
import type { LocationKey } from "@/lib/site";

/**
 * REAL reviews only — excerpts copied from the salon's Google Business Profiles on 2026-11-09
 * (reviewer names withheld until the salon approves quoting them — ASSETS-OWED.md).
 * Third-party reviews are shown as quotes; they are NOT marked up as the business's own Review schema.
 */
export const REVIEWS = [
  {
    name: "Google reviewer",
    source: "Google",
    location: "Gaithersburg",
    service: "Braids",
    stylist: "Albertine’s team",
    text: "The salon presents a welcoming environment and maintains a well-organized layout, comparable to an upscale establishment in Washington, D.C. I appreciated the work of Albertine and was grateful that she selected experienced professionals …",
  },
  {
    name: "Google reviewer",
    source: "Google",
    location: "Gaithersburg",
    service: "Engagement-shoot style",
    stylist: "Maggie",
    text: "Ask for Maggie! She always does an amazing job. I asked her for this intricate style for my engagement photoshoot and she did it in exactly 3 hours. This is 10 days after she did it and it still looks fresh. Albertine is good old reliable. I love it here.",
  },
  {
    name: "Google reviewer",
    source: "Google",
    location: "Gaithersburg",
    service: "Kids’ braids",
    stylist: "Emefa",
    text: "I will highly recommend Emefa for your braids. She is very polite, great customer service. She did my daughter’s hair with so much love, very gentle hands. Overall I loved her work! Definitely coming back!",
  },
  {
    name: "Google reviewer",
    source: "Google",
    location: "Gaithersburg",
    service: "French curls",
    stylist: "Mary B",
    text: "I had the best experience in your salon two weeks ago. The way the staff handles the customers is just amazing. My daughter loved the girls who made her hair French curls …",
  },
  {
    name: "Google reviewer",
    source: "Google",
    location: "Gaithersburg",
    service: "Early-morning appointment",
    stylist: "Albertine Couture",
    text: "Albertine Couture Hair Salon is the only place I know that is open at 6AM.",
  },
  {
    name: "Google reviewer",
    source: "Google",
    location: "Dumfries",
    service: "Braids",
    stylist: "Albertine Couture",
    text: "The braids were the exact style and color I wanted and reasonably priced.",
  },
] as const;

export type Stylist = {
  key: StaffKey;
  name: string;
  role: string;
  location: LocationKey;
  photo?: string;
  specialties: string[];
  bio: string;
  bioNote?: string;
};

/**
 * Demo team: the owner plus five stylists listed on their Vagaro pages (23 stylists in
 * Gaithersburg, 8 in Dumfries). Specialties are only what Vagaro or Google reviews say;
 * everything else is marked for the salon to confirm.
 */
export const TEAM: Stylist[] = [
  {
    key: "albertine",
    name: "Albertine",
    role: "Owner · Master Stylist",
    location: "md",
    specialties: ["Every braid style", "Sew-ins & wig installs", "K-tip & I-tip extensions", "Locs & micro locs", "Color"],
    bio: "As the owner of Albertine Couture Hair Salon, I bring over 15 years of experience in the hair industry. My expertise encompasses all styles, allowing me to cater to a diverse clientele and their unique preferences. I am passionate about creating stunning looks that enhance individuality and confidence.",
    bioNote: "Her own words, from her Vagaro profile. Portrait NEEDS REAL PHOTO.",
  },
  {
    key: "nicole",
    name: "Nicole",
    role: "Stylist · Gaithersburg",
    location: "md",
    specialties: ["Knotless & boho braids", "Twists", "Kids"],
    bio: "Named by a Google reviewer as one of the experienced professionals Albertine chose for her appointment.",
    bioNote: "NEEDS CLIENT CONFIRMATION — bio, photo and specialties.",
  },
  {
    key: "magui",
    name: "Magui",
    role: "Stylist · Gaithersburg",
    location: "md",
    specialties: ["Intricate braid styles", "Knotless", "Locs"],
    bio: "“Ask for Maggie! She always does an amazing job … she did it in exactly 3 hours. This is 10 days after she did it and it still looks fresh.” — Google review",
    bioNote: "NEEDS CLIENT CONFIRMATION — is “Maggie” in the review the same stylist as Magui on Vagaro? Bio and photo.",
  },
  {
    key: "victoria",
    name: "Victoria",
    role: "Stylist · Gaithersburg",
    location: "md",
    specialties: ["Sew-ins & wigs", "Extensions", "Silk press"],
    bio: "Victoria takes appointments at the Gaithersburg salon.",
    bioNote: "NEEDS CLIENT CONFIRMATION — bio, photo and specialties.",
  },
  {
    key: "dami",
    name: "Dami",
    role: "Stylist · Dumfries",
    location: "va",
    specialties: ["Cornrows", "Braiding", "Twists", "Locs"],
    bio: "I specialize in cornrows, braiding, twists, and locs, providing exceptional hair styling services tailored to each client's needs.",
    bioNote: "Her own words, from Vagaro (Dumfries). Photo NEEDS REAL PHOTO.",
  },
  {
    key: "yolande",
    name: "Yolande",
    role: "Stylist · Dumfries",
    location: "va",
    specialties: ["Knotless braids", "Sew-ins", "Silk press"],
    bio: "Yolande specializes in various hair techniques at the Dumfries salon.",
    bioNote: "NEEDS CLIENT CONFIRMATION — full bio, photo and specialties.",
  },
];

export const TEAM_BY_KEY = Object.fromEntries(TEAM.map((t) => [t.key, t])) as Record<StaffKey, Stylist>;

/** Real client work from their website and Instagram (labels are the salon's own). */
export const WORK = [
  { src: "/media/work-ac/peekaboo-boho", alt: "Smiling client with long peekaboo bohemian knotless braids, curly pieces through the lengths", label: "Peekaboo boho knotless", cat: "knotless", w: 1080, h: 1350 },
  { src: "/media/work-ac/bora-bora", alt: "Client with full, curly Bora Bora braids past the shoulders", label: "Bora Bora braids", cat: "knotless", w: 1080, h: 1350 },
  { src: "/media/work-ac/gypsy-knotless", alt: "Back view of long gypsy knotless braids with curls through every braid", label: "Gypsy knotless", cat: "knotless", w: 1080, h: 1350 },
  { src: "/media/work-ac/flip-over-fulani", alt: "Side view of flip-over Fulani bohemian braids with cornrows over the top", label: "Flip-over Fulani boho", cat: "knotless", w: 1080, h: 1350 },
  { src: "/media/work-ac/stitch-cornrows", alt: "Top view of neat stitch cornrows with clean curved parts", label: "Stitch cornrows", cat: "braids", w: 1080, h: 1350 },
  { src: "/media/work-ac/braided-baldie", alt: "Braided baldie: cornrows in a swirling design around the head", label: "Braided baldie", cat: "braids", w: 1080, h: 1350 },
  { src: "/media/work-ac/lemonade-braids", alt: "Client with long side-swept lemonade braids", label: "Lemonade braids", cat: "braids", w: 1080, h: 1350 },
  { src: "/media/work-ac/individual-braids", alt: "Client smiling with medium individual braids with curly ends", label: "Individual braids", cat: "braids", w: 1018, h: 1440 },
  { src: "/media/work-ac/freestyle-cornrows", alt: "Client with freestyle Alicia Keys-inspired cornrows in honey blonde", label: "Freestyle cornrows", cat: "braids", w: 1080, h: 1350 },
  { src: "/media/work-ac/micro-braids", alt: "Client with burgundy curly micro braids", label: "Micro braiding", cat: "braids", w: 1080, h: 1350 },
  { src: "/media/work-ac/passion-twist", alt: "Client with small passion twists, soft and curly", label: "Small passion twist", cat: "twists", w: 1080, h: 1350 },
  { src: "/media/work-ac/senegalese-twist", alt: "Back view of long honey-brown Senegalese twists", label: "Senegalese twist", cat: "twists", w: 1080, h: 1350 },
  { src: "/media/work-ac/marley-twist", alt: "Short Marley twists with clean square parts, Gaithersburg salon", label: "Marley twist", cat: "twists", w: 1080, h: 1350 },
  { src: "/media/work-ac/interlocking-locs", alt: "Before and after interlocking locs retwist", label: "Interlocking locs", cat: "locs", w: 1080, h: 1350 },
  { src: "/media/work-ac/faux-locs", alt: "Copper faux locs with neat parts", label: "Faux locs", cat: "locs", w: 1080, h: 1350 },
  { src: "/media/work-ac/locs-retwist", alt: "Locs retwist with long styled locs", label: "Locs retwist", cat: "locs", w: 1080, h: 1350 },
  { src: "/media/work-ac/closure-sewin", alt: "Client with a long, wavy closure sew-in weave", label: "Closure sew-in", cat: "weaves", w: 1080, h: 1350 },
  { src: "/media/work-ac/versatile-sewin", alt: "Client with a versatile sew-in, soft layered curls, minimal leave-out", label: "Versatile sew-in", cat: "weaves", w: 960, h: 1440 },
  { src: "/media/work-ac/sewin-bangs", alt: "Before and after full sew-in with bangs", label: "Full sew-in with bangs", cat: "weaves", w: 1080, h: 1350 },
  { src: "/media/work-ac/i-tip-extensions", alt: "Client with long, soft, layered I-tip extensions", label: "I-tip extensions", cat: "extensions", w: 1080, h: 1350 },
  { src: "/media/work-ac/silk-press", alt: "Before and after silk press with a bouncy bob", label: "Silk press", cat: "natural", w: 1080, h: 1350 },
  { src: "/media/work-ac/hair-color", alt: "Short tapered cut with copper color", label: "Hair coloring", cat: "natural", w: 1080, h: 1350 },
  { src: "/media/work-ac/bantu-knots", alt: "Back of the head with defined Bantu knots", label: "Bantu knots", cat: "natural", w: 819, h: 1024 },
  { src: "/media/work-ac/kids-lemonade", alt: "Young client with kids’ lemonade braids, front and back", label: "Kids’ lemonade braids", cat: "kids", w: 1080, h: 1350 },
  { src: "/media/work-ac/kids-braids", alt: "Young client with long blue and black knotless braids", label: "Kids’ braids with color", cat: "kids", w: 487, h: 491 },
  { src: "/media/work-ac/mens-stitch-braids", alt: "Men’s stitch braids from the front and back", label: "Men’s stitch braids", cat: "men", w: 1080, h: 1350 },
  { src: "/media/work-ac/butterfly-braid", alt: "Butterfly braids from several angles", label: "Butterfly braid", cat: "braids", w: 1080, h: 1350 },
  { src: "/media/work-ac/salon-floor", alt: "Inside Albertine Couture: a long row of styling stations under a crystal chandelier", label: "Inside the salon", cat: "salon", w: 1080, h: 1440 },
  { src: "/media/work-ac/salon-chairs", alt: "Black styling chairs and mirrors inside Albertine Couture", label: "Inside the salon", cat: "salon", w: 1080, h: 810 },
  { src: "/media/work-ac/salon-suite", alt: "A styling suite at Albertine Couture with lavender walls and black chairs", label: "Inside the salon", cat: "salon", w: 1024, h: 768 },
] as const;

export const FAQ = [
  {
    q: "Are you really open 24 hours?",
    a: "Yes. Both locations are open 24 hours, 7 days a week. Walk-ins are welcome daily from 5:00 AM to 7:30 PM (Dumfries from 5:30 AM). Appointments outside walk-in hours carry a $30 after-hours fee. We close on Thanksgiving, Christmas Day, New Year’s Day and Easter.",
  },
  {
    q: "Is braiding hair included in the price?",
    a: "Usually not — braiding and weave hair is extra unless the service says “hair included” (like our sew-in with 2 bundles or bundle deals). Ask when you book and we’ll tell you exactly what to bring.",
  },
  {
    q: "How do I get my exact price?",
    a: "Use the Price Finder: pick your style, size and length and you’ll see the real price from our menu in three taps. Longer and smaller styles take more time, so they cost more.",
  },
  {
    q: "Do I need a deposit?",
    a: "Yes — a $20 deposit holds your appointment and comes off your final balance. The balance is paid at the salon. No-shows are charged the full service price; you can move your deposit to a new time by phone or email.",
  },
  {
    q: "How should I come to my appointment?",
    a: "Washed and blow-dried straight, with no oils or heavy products. Want us to do it? Add a wash & blow-dry for $15. Natural hair should be at least 4 inches; 1–3 inches is +$50.",
  },
  {
    q: "Do you do kids and men?",
    a: "Yes. Kids’ knotless, box braids, butterfly locs and twists (11 and younger), and men’s box braids, barrel twists, cornrows and comb twists.",
  },
  {
    q: "Which location should I book?",
    a: "Whichever is closer — both offer the full braid menu. Gaithersburg is at 305 Muddy Branch Rd in the Festival at Muddy Branch center; Dumfries is at 17457 Jefferson Davis Hwy.",
  },
  {
    q: "What forms of payment do you accept?",
    a: "Cash, Cash App, Zelle and cards (Visa, Mastercard, American Express, Discover). A 3% processing fee applies to card and Cash App. Pay-later is available on eligible services.",
  },
] as const;
