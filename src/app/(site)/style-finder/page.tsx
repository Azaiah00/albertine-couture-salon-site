import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { sharePreview } from "@/lib/og";
import { Accent, PageHero } from "@/components/ui/Kit";
import { StyleFinder } from "@/components/ui/StyleFinder";
import { FINDER } from "@/lib/finder";

export const metadata: Metadata = {
  title: "Braid Price Finder — By Style, Size & Length",
  description: "Your exact price for knotless, boho, Bora Bora, box and micro braids, twists and micro locs — by size and length, shoulder to under-butt.",
  alternates: { canonical: "/style-finder" },
  ...sharePreview({
    title: "Braid Price Finder · Albertine Couture",
    description: "Pick your style, size and length — see your exact price in three taps. Knotless, boho, Bora Bora, twists, micro braids and micro locs.",
    path: "/style-finder",
    image: "/og/finder.jpg",
    alt: "Albertine Couture Price Finder: style, size and length to exact price",
  }),
};

export default function FinderPage() {
  return (
    <>
      <PageHero
        eyebrow="Price Finder"
        art="/media/art/braids.svg"
        title={
          <>
            Know your price <Accent>before</Accent> you sit down.
          </>
        }
        intro={`${FINDER.length} braid, twist and loc styles, every size and every length on our menu — from shoulder to under-butt. Pick yours and see the real price, the deposit and what to bring.`}
      />
      <section className="bg-ink pb-24 pt-4">
        <div className="wrap">
          <Suspense>
            <StyleFinder />
          </Suspense>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[
              { t: "Bigger = faster", b: "Jumbo and large sizes take the least time. Small and small-medium take the longest — and cost the most." },
              { t: "Bring your hair", b: "Braiding hair usually isn’t included. Ask what to bring when you book, or choose a service marked “hair included”." },
              { t: "Come ready", b: "Washed and blow-dried straight, no oils. Or add a wash & blow-dry for $15. Natural hair under 4 inches is +$50." },
            ].map((x) => (
              <div key={x.t} className="card-night p-6">
                <p className="display text-2xl text-bone">{x.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist/80">{x.b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-silver">
            Don’t see your style? See the{" "}
            <Link href="/services" className="text-champagne hover:text-paper">
              full menu
            </Link>{" "}
            or walk in from 5 AM and ask a braider.
          </p>
        </div>
      </section>
    </>
  );
}
