import { ogImg } from "@/lib/og";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { IS_DEMO_HOST, LOCATIONS, SITE } from "@/lib/site";
import { CATEGORIES, SERVICES } from "@/lib/services";

// Script accent: "optional" so a late-arriving script font never re-wraps a heading (no layout shift).
const jost = localFont({
  src: [{ path: "./fonts/jost-var.woff2", weight: "300 700", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
});
const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-var.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-var-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});
const pinyon = localFont({ src: "./fonts/pinyon.woff2", variable: "--font-pinyon", display: "optional", weight: "400" });

const TITLE = "Albertine Couture Hair Salon | Braids & Hair Salon Open 24/7 · MD & VA";
const DESC =
  "Knotless & boho braids, twists, locs, sew-ins, K-tip and silk presses. Open 24/7 in Gaithersburg, MD & Dumfries, VA — walk-ins from 5 AM.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s | Albertine Couture" },
  description: DESC,
  applicationName: SITE.name,
  keywords: [
    "24 hour hair salon DMV",
    "braiding salon Gaithersburg MD",
    "knotless braids Gaithersburg",
    "braiding salon Dumfries VA",
    "knotless braids Dumfries",
    "boho knotless braids Maryland",
    "Bora Bora braids Virginia",
    "K-tip extensions Maryland",
    "micro locs DMV",
    "sew-in weave Gaithersburg",
    "Black-owned hair salon Gaithersburg",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: "Albertine Couture Hair Salon — Your dream hair awaits, any hour",
    description: "Braids, twists, locs, sew-ins & K-tip. Open 24/7 in Gaithersburg, MD & Dumfries, VA. Walk-ins from 5 AM.",
    images: [{ url: ogImg("/og.jpg"), width: 1200, height: 630, type: "image/jpeg", alt: "Albertine Couture Hair Salon — open 24/7 in Gaithersburg, MD and Dumfries, VA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Albertine Couture Hair Salon — Your dream hair awaits, any hour",
    description: "Braids, twists, locs, sew-ins & K-tip · open 24/7 · Gaithersburg, MD & Dumfries, VA.",
    images: [ogImg("/og.jpg")],
  },
  ...(IS_DEMO_HOST ? { robots: { index: false, follow: false } } : {}),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  width: "device-width",
  initialScale: 1,
};

const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => `https://schema.org/${d}`);

const catalog = {
  "@type": "OfferCatalog",
  name: "Hair services",
  itemListElement: CATEGORIES.map((c) => ({
    "@type": "OfferCatalog",
    name: c.label,
    itemListElement: SERVICES.filter((s) => s.category === c.key && s.price && !s.addOn).map((s) => ({
      "@type": "Offer",
      price: s.price,
      priceCurrency: "USD",
      ...(s.priceType === "from" ? { priceSpecification: { "@type": "PriceSpecification", minPrice: s.price, priceCurrency: "USD" } } : {}),
      itemOffered: { "@type": "Service", name: s.name },
    })),
  })),
};

/** One Organization + one HairSalon per location (real NAP, geo, 24/7 hours). */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon-512.png`,
      email: SITE.email,
      founder: { "@type": "Person", name: SITE.owner, jobTitle: "Owner & Master Stylist" },
      sameAs: [SITE.socials.instagram, SITE.socials.instagramVa, SITE.socials.tiktok, SITE.socials.facebook, SITE.socials.youtube],
      subOrganization: LOCATIONS.map((l) => ({ "@id": `${SITE.url}/#salon-${l.key}` })),
    },
    ...LOCATIONS.map((l) => ({
      "@type": "HairSalon",
      "@id": `${SITE.url}/#salon-${l.key}`,
      name: `${SITE.name} — ${l.short}`,
      parentOrganization: { "@id": `${SITE.url}/#business` },
      description: SITE.bio,
      slogan: SITE.tagline,
      url: `${SITE.url}/visit#${l.key}`,
      telephone: l.phone,
      image: [`${SITE.url}/og.jpg`],
      logo: `${SITE.url}/icon-512.png`,
      priceRange: "$$",
      address: { "@type": "PostalAddress", streetAddress: l.street, addressLocality: l.city, addressRegion: l.region, postalCode: l.zip, addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng },
      hasMap: l.googleUrl,
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ALL_DAYS, opens: "00:00", closes: "23:59" }],
      paymentAccepted: SITE.payments.join(", "),
      knowsLanguage: ["en", "fr", "es"],
      hasOfferCatalog: catalog,
    })),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable} ${pinyon.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-char">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
