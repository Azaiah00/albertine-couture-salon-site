import type { Metadata } from "next";
import { sharePreview } from "@/lib/og";
import Link from "next/link";
import { Info } from "lucide-react";
import { MenuBrowser } from "@/components/ui/MenuBrowser";
import { Accent, PageHero } from "@/components/ui/Kit";
import { BOOK_HREF, GOOD_TO_KNOW } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services & Prices — Full Salon Menu",
  description: `${SERVICES.length} Albertine Couture services with real prices: knotless, boho, Bora Bora, twists, locs, sew-ins, K-tip, silk press and kids’ styles in MD & VA.`,
  alternates: { canonical: "/services" },
  ...sharePreview({
    title: "The full menu · Albertine Couture Hair Salon",
    description: "Knotless, boho, Bora Bora, twists, locs, sew-ins, K-tip & I-tip, silk press and kids' styles — prices up front. Open 24/7 in Gaithersburg & Dumfries.",
    path: "/services",
    image: "/og/menu.jpg",
    alt: "Albertine Couture full menu: knotless and boho braids, cornrows, twists, locs, sew-ins and wigs, extensions, silk press and kids.",
  }),
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Menu & prices"
        art="/media/art/braids.svg"
        title={
          <>
            Every <Accent>style</Accent>, priced.
          </>
        }
        intro={`${SERVICES.length} headline services for women, men and kids, with the same regular prices as our Vagaro menu. Braids come in every size and length — use the Price Finder for your exact price.`}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/style-finder" className="btn btn-primary">
            Find my exact price
          </Link>
          <span className="needs-tag self-center">Prices to confirm with the salon</span>
        </div>
      </PageHero>
      <section className="bg-ink pb-24">
        <div className="wrap">
          <MenuBrowser />

          <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {GOOD_TO_KNOW.map((g) => (
              <div key={g.title} className="card-night p-6">
                <p className="flex items-center gap-2 text-bone">
                  <Info className="size-4 text-champagne" aria-hidden /> {g.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mist/80">{g.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-silver">Menu copied from the salon’s Vagaro booking page (Gaithersburg), November 9, 2026. Names lightly tidied for reading; prices are regular prices (Vagaro often shows a 10% daily deal). Times are estimates until the salon confirms them. Braiding / weave hair is not included unless the service says so.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={BOOK_HREF} className="btn btn-primary">
              Book an appointment
            </Link>
            <Link href="/style-finder" className="btn btn-ghost">
              Not sure? Use the Price Finder
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
