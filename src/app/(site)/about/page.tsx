import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Globe2, HeartHandshake, MapPin, Sparkles, Users } from "lucide-react";
import { CalendarHeart } from "lucide-react";
import { Accent, Img, PageHero, PhotoSlot, SectionTitle } from "@/components/ui/Kit";
import { GoldThread } from "@/components/home/GoldThread";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Albertine — Owner & Master Stylist",
  description: "Black-owned, woman-owned and led by Albertine (15+ years). Two DMV salons — Gaithersburg, MD and Dumfries, VA — open 24/7.",
  alternates: { canonical: "/about" },
};

const PROMISE = [
  { icon: Clock, title: "Open when you are", body: "24 hours a day, 7 days a week. Walk in from 5 AM, or book the overnight chair for long styles." },
  { icon: Sparkles, title: "Every style, done right", body: "Braids of every kind, twists, locs, sew-ins, wigs, K-tip and I-tip, silk presses and color — premium weaving, minimal leave-out, vibrant color sew-ins and precision pixie cuts." },
  { icon: HeartHandshake, title: "Your style, your smile", body: "We’ll style, you’ll smile. Check your hair before you leave the chair — and tell us within 24 hours if anything isn’t right." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        art="/media/art/braids.svg"
        title={
          <>
            The DMV’s hair <Accent>house.</Accent>
          </>
        }
        intro={SITE.bio}
      />

      <section className="bg-ink py-20 lg:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="reveal">
            <PhotoSlot className="aspect-[4/5]" label="Albertine — owner portrait" art="/media/art/pixie.svg" />
          </div>
          <div>
            <SectionTitle
              eyebrow="Meet the owner"
              title={
                <>
                  Hi, I’m <Accent>Albertine.</Accent>
                </>
              }
            />
            <div className="reveal mt-6 space-y-5 text-lg leading-relaxed text-mist/90" data-delay="100">
              <p>{SITE.story}</p>
              <p>My commitment to professional development ensures that I stay updated with the latest trends and techniques. At Albertine Couture, I strive to provide an exceptional experience for every client.</p>
            </div>
            <p className="reveal mt-6 text-sm text-silver" data-delay="160">
              — Albertine, in her own words (Vagaro profile)
            </p>
            <Link href="/book?stylist=albertine" className="btn btn-primary reveal mt-8" data-delay="200">
              <CalendarHeart className="size-4" aria-hidden /> Book with Albertine
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-onyx py-20 lg:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <GoldThread className="absolute -left-8 top-0 hidden h-full w-8 lg:block" />
            <SectionTitle
              eyebrow="The badge"
              title={
                <>
                  Gold frame. Crimson <Accent>script.</Accent> Scissors in the middle.
                </>
              }
              intro="Our badge says it all: couture craft (the gold frame), our name written by hand, and a pair of scissors between “Albertine” and “Couture” — because every look here is made by hand, one braid at a time."
            />
          </div>
          <div className="reveal mx-auto grid w-full max-w-sm place-items-center rounded-[var(--radius-card)] border border-gold/25 bg-ink p-10" data-delay="100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/brand/badge.png" alt="Albertine Couture Hair Salon gold badge logo with scissors" width={232} height={184} loading="lazy" className="h-auto w-full max-w-[14rem]" />
            <span className="needs-tag mt-6">HD logo file owed</span>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 lg:py-28">
        <div className="wrap">
          <SectionTitle
            eyebrow="Our promise"
            title={
              <>
                What you can <Accent>expect</Accent>
              </>
            }
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {PROMISE.map((a, i) => (
              <li key={a.title} className="reveal card-night p-7" data-delay={i * 80}>
                <a.icon className="size-6 text-champagne" aria-hidden />
                <h3 className="display mt-5 text-3xl text-bone">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-mist/80">{a.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <div className="card-night p-7">
              <p className="display text-5xl text-champagne">15+</p>
              <p className="mt-2 text-mist/85">Years of Albertine’s experience behind the chair.</p>
            </div>
            <div className="card-night p-7">
              <MapPin className="size-7 text-champagne" aria-hidden />
              <p className="mt-3 text-mist/85">Two salons: Gaithersburg, Maryland and Dumfries, Virginia — with 30+ stylists between them.</p>
            </div>
            <div className="card-night p-7">
              <Users className="size-7 text-champagne" aria-hidden />
              <p className="mt-3 flex flex-wrap items-center gap-2 text-mist/85">
                Black-owned and woman-owned. <Globe2 className="size-4 text-champagne" aria-hidden /> English, French & Spanish spoken.
              </p>
            </div>
          </div>
          <div className="mt-16 overflow-hidden rounded-[var(--radius-card)]">
            <Img src="/media/work-ac/salon-chairs" alt="Styling chairs and mirrors inside Albertine Couture" w={1080} h={810} sizes="100vw" className="max-h-[28rem] w-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
