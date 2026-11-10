/**
 * Verified business facts for Albertine Couture Hair Salon (DMV — two locations).
 * Sources checked 2026-11-09:
 *  - albertinecouturehairsalondmv.com (Wix — current site), albertinecouturehairsalon.com (old site)
 *  - Vagaro: Gaithersburg (albertinecouturehairsalondmv) + Dumfries (httpsalbertincouturehairsalonasme)
 *  - Google Business Profiles: Gaithersburg 3.7 · 403 reviews, Dumfries 3.5 · 81 reviews (both "Open 24 hours")
 *  - Instagram @albertinecouturehairsalon (38.8K, verified) + @albertinecouture_hairsalon (Dumfries), TikTok
 * Anything that disagrees between sources is listed in ASSETS-OWED.md.
 * The Columbia, MD Vagaro page (every day "Closed") is NOT shown — see ASSETS-OWED.md.
 */
export type LocationKey = "md" | "va";

export type Location = {
  key: LocationKey;
  name: string;
  short: string;
  state: string;
  street: string;
  building?: string;
  city: string;
  region: string;
  zip: string;
  phone: string;
  phoneHref: string;
  /** Text-friendly line (the Dumfries account publishes "Call | text"). */
  textOk: boolean;
  geo: { lat: number; lng: number };
  mapsUrl: string;
  googleUrl: string;
  vagaroUrl: string;
  rating: { value: number; count: number };
  /** Walk-in window published on their site. Appointments outside it are "after-hours". */
  walkIn: { open: string; close: string };
  instagram: string;
  photo: string;
};

export const LOCATIONS: Location[] = [
  {
    key: "md",
    name: "Gaithersburg, Maryland",
    short: "Gaithersburg",
    state: "MD",
    street: "305 Muddy Branch Rd",
    building: "Festival at Muddy Branch",
    city: "Gaithersburg",
    region: "MD",
    zip: "20878",
    phone: "(301) 765-4915",
    phoneHref: "tel:+13017654915",
    textOk: false,
    geo: { lat: 39.1272523, lng: -77.2083905 },
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Albertine+Couture+Hair+Salon+305+Muddy+Branch+Rd+Gaithersburg+MD+20878",
    googleUrl: "https://www.google.com/maps/search/?api=1&query=Albertine+Couture+Hair+Salon+LLC+305+Muddy+Branch+Rd+Gaithersburg+MD",
    vagaroUrl: "https://www.vagaro.com/albertinecouturehairsalondmv",
    rating: { value: 3.7, count: 403 },
    walkIn: { open: "05:00", close: "19:30" },
    instagram: "https://www.instagram.com/albertinecouturehairsalon",
    photo: "/media/work-ac/salon-floor",
  },
  {
    key: "va",
    name: "Dumfries, Virginia",
    short: "Dumfries",
    state: "VA",
    street: "17457 Jefferson Davis Hwy",
    city: "Dumfries",
    region: "VA",
    zip: "22026",
    phone: "(571) 409-8230",
    phoneHref: "tel:+15714098230",
    textOk: true,
    geo: { lat: 38.5725958, lng: -77.3159348 },
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Albertine+Couture+Hair+Salon+17457+Jefferson+Davis+Hwy+Dumfries+VA+22026",
    googleUrl: "https://www.google.com/maps/search/?api=1&query=Albertine+Couture+Hair+Salon+17457+Jefferson+Davis+Hwy+Dumfries+VA",
    vagaroUrl: "https://www.vagaro.com/httpsalbertincouturehairsalonasme",
    rating: { value: 3.5, count: 81 },
    walkIn: { open: "05:30", close: "19:30" },
    instagram: "https://www.instagram.com/albertinecouture_hairsalon",
    photo: "/media/work-ac/salon-suite",
  },
];
export const LOCATION_BY_KEY = Object.fromEntries(LOCATIONS.map((l) => [l.key, l])) as Record<LocationKey, Location>;
export const fullAddress = (l: Location) => `${l.street}, ${l.city}, ${l.region} ${l.zip}`;

const MD = LOCATIONS[0];

export const SITE = {
  name: "Albertine Couture Hair Salon",
  shortName: "Albertine Couture",
  owner: "Albertine",
  tagline: "We’ll style, you’ll smile.",
  /**
   * Address used by share previews, canonical tags and the sitemap. On Netlify this is
   * picked up from NEXT_PUBLIC_SITE_URL (netlify.toml). At launch set it to the real domain.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://albertine-couture-salon-site.netlify.app").replace(/\/$/, ""),
  /** Flagship (Gaithersburg) — used where one number/address is needed. */
  phone: MD.phone,
  phoneHref: MD.phoneHref,
  email: "gaithersburg@albertinecouturehairsalondmv.com",
  address: { street: MD.street, building: MD.building ?? "", city: MD.city, region: MD.region, zip: MD.zip, neighborhood: "Festival at Muddy Branch" },
  geo: MD.geo,
  mapsUrl: MD.mapsUrl,
  googleUrl: MD.googleUrl,
  googleReviewsUrl: MD.googleUrl,
  /** Combined Google reviews across both profiles (Nov 9 2026). */
  rating: { value: 3.7, count: MD.rating.count + LOCATIONS[1].rating.count },
  /** Her live booking today (Vagaro) — flagship page. */
  bookingUrl: MD.vagaroUrl,
  socials: {
    instagram: "https://www.instagram.com/albertinecouturehairsalon",
    instagramVa: "https://www.instagram.com/albertinecouture_hairsalon",
    tiktok: "https://www.tiktok.com/@albertinecoutuhairsalon",
    facebook: "https://www.facebook.com/AlbertineCoutureHairSalonVA",
    youtube: "https://www.youtube.com/@Albertinecouturehairsalons",
  },
  instagramHandle: "@albertinecouturehairsalon",
  followers: { instagram: "38.8K", tiktok: "64.5K" },
  /**
   * Hours: both Google profiles say "Open 24 hours". Walk-ins 5:00 AM–7:30 PM (Gaithersburg)
   * and 5:30 AM–7:30 PM (Dumfries); after-hours by appointment only (+$30). Index 0 = Sunday.
   * The booking demo uses the walk-in window for open times. Conflicts → ASSETS-OWED.md.
   */
  hours: Array.from({ length: 7 }, (_, i) => ({
    day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i],
    open: "05:00",
    close: "19:30",
  })) as { day: string; open: string | null; close: string | null }[],
  afterHours: { from: "7:35 PM", to: "4:59 AM", fee: 30 },
  closedHolidays: ["Thanksgiving Day", "Christmas Day", "New Year’s Day", "Easter"],
  /** Her own words (Vagaro owner bio). */
  story:
    "As the owner of Albertine Couture Hair Salon, I bring over 15 years of experience in the hair industry. My expertise encompasses all styles, allowing me to cater to a diverse clientele and their unique preferences. I am passionate about creating stunning looks that enhance individuality and confidence.",
  /** Their own description (Vagaro, Dumfries). */
  bio: "Our full-service salon specializes in a wide range of hair and beauty services — expert braiding including lemonade, Fulani and tribal braids, fusion and micro bead extensions, color, keratin and Olaplex treatments, natural and protective styles, and children's hair.",
  payments: ["Cash", "Cash App", "Zelle", "Visa", "Mastercard", "American Express", "Discover", "Pay later (Affirm)"],
  identities: ["Black-owned", "Woman-owned"],
  languages: ["English", "French", "Spanish"],
  experience: "15+ years",
} as const;

/** True while the site runs on the Netlify demo address (kept out of Google so it never competes with the real domain). */
export const IS_DEMO_HOST = SITE.url.includes("netlify.app");

/**
 * Which booking experience every "Book" button opens.
 * - "portal": the new Albertine Couture booking portal (/book) — demo mode until launch.
 * - "vagaro": their current live Vagaro pages.
 */
export const BOOKING_MODE: "portal" | "vagaro" = "portal";
export const BOOK_HREF = BOOKING_MODE === "portal" ? "/book" : SITE.bookingUrl;
export const PORTAL_DEMO = true;
export const SHOW_PORTAL_LINK = BOOKING_MODE === "portal";
export const bookHref = (serviceId?: string) => (BOOKING_MODE === "portal" ? (serviceId ? `/book?service=${serviceId}` : "/book") : SITE.bookingUrl);

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/style-finder", label: "Price Finder" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Stylists" },
  { href: "/visit", label: "Locations" },
] as const;

/** 12-hour display for an "HH:MM" string. */
export function hm(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 || 12;
  return m ? `${hh}:${String(m).padStart(2, "0")} ${ap}` : `${hh} ${ap}`;
}

/** Policies as published on their DMV website (Booking Policies), lightly tidied. */
export const GOOD_TO_KNOW = [
  {
    title: "$20 deposit holds your spot",
    body: "A $20 deposit secures your appointment and comes off your final balance. The balance is paid at the salon.",
  },
  {
    title: "Come ready",
    body: "Hair washed and blow-dried straight, with no oils or heavy products. Need it done here? Add a wash & blow-dry (+$15).",
  },
  {
    title: "Natural hair length",
    body: "Natural hair should be at least 4 inches for most braid styles. Hair 1–3 inches long is +$50.",
  },
  {
    title: "Braiding hair",
    body: "Braiding and weave hair usually isn’t included in the price — ask when you book. Bundle deals are on the menu.",
  },
  {
    title: "After-hours appointments",
    body: "Walk-ins daily from 5 AM. Appointments outside walk-in hours (about 7:35 PM–4:59 AM) carry a $30 after-hours fee.",
  },
  {
    title: "Ways to pay",
    body: "Cash, Cash App, Zelle and cards. A 3% processing fee applies to card and Cash App payments. Pay-later is available on eligible services.",
  },
] as const;
