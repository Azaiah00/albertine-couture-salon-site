import type { Metadata } from "next";
import Link from "next/link";
import { sharePreview } from "@/lib/og";
import { ArrowRight, CalendarHeart, Clock, Globe2, MapPin, MessageCircle, Moon, Phone, Quote, Sun, Sunrise } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { StyleTiles } from "@/components/ui/StyleTiles";
import { StyleFinder } from "@/components/ui/StyleFinder";
import { FaqList } from "@/components/ui/FaqList";
import { Accent, Eyebrow, Img, SectionTitle } from "@/components/ui/Kit";
import { GoldThread } from "@/components/home/GoldThread";
import { InstagramIcon } from "@/components/site/BrandIcons";
import { BOOK_HREF, LOCATIONS, SITE, hm } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { FAQ, REVIEWS, TEAM, WORK } from "@/lib/content";
import { ARTICLES } from "@/lib/journal";

export const metadata: Metadata = {
  description: "Knotless, boho & Bora Bora braids, twists, locs, sew-ins and K-tip. Open 24/7 in Gaithersburg, MD & Dumfries, VA — walk-ins from 5 AM.",
  alternates: { canonical: "/" },
  ...sharePreview({
    title: "Albertine Couture Hair Salon · Your dream hair awaits — any hour",
    description: "Knotless, boho & Bora Bora braids, twists, locs, sew-ins and K-tip extensions. Open 24/7 in Gaithersburg, MD & Dumfries, VA. Walk-ins from 5 AM.",
    path: "/",
    image: "/og.jpg",
    alt: "Albertine Couture Hair Salon — open 24/7 in Gaithersburg, MD and Dumfries, VA",
  }),
};

const PROOF = [
  "Open 24 hours · 7 days",
  "Walk-ins daily from 5 AM",
  "Gaithersburg, MD · Dumfries, VA",
  "30+ stylists on the team",
  "Black-owned & woman-owned",
  `${SITE.followers.instagram} on Instagram · ${SITE.followers.tiktok} on TikTok`,
  "Knotless · Boho · Bora Bora · Twists · Locs · Sew-ins · K-tip",
];

const DAY = [
  { icon: Sunrise, time: "5:00 AM", title: "Before work", body: "Walk in at 5 AM and leave with fresh braids before your day starts. Clients tell us we’re the only salon they know that’s open at 6." },
  { icon: Sun, title: "Through the day", time: "Until 7:30 PM", body: "Walk-ins all day at both salons — or book your stylist online and skip the wait." },
  { icon: Moon, title: "After hours", time: "7:35 PM – 4:59 AM", body: `Long style, tight schedule? Book overnight. After-hours appointments carry a $${SITE.afterHours.fee} fee — the chair is still yours.` },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* PROOF MARQUEE */}
      <section aria-label="Highlights" className="relative overflow-hidden border-y border-gold/15 bg-onyx py-5">
        <div className="flex w-max animate-[marquee_46s_linear_infinite] gap-10 whitespace-nowrap pr-10 motion-reduce:animate-none">
          {[0, 1].map((k) => (
            <ul key={k} className="flex gap-10" aria-hidden={k === 1}>
              {PROOF.map((t) => (
                <li key={t} className="eyebrow flex items-center gap-10 text-mist/80">
                  {t}
                  <span className="size-1.5 rotate-45 bg-gold" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* PROBLEM → SOLUTION: THE SALON THAT NEVER CLOSES */}
      <section aria-labelledby="never-title" className="relative overflow-hidden bg-ink py-24 lg:py-36">
        <div aria-hidden className="absolute -left-40 top-20 size-[36rem] rounded-full bg-gold/[0.06] blur-3xl" />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionTitle
              id="never-title"
              eyebrow="The salon that never closes"
              title={
                <>
                  Your schedule doesn’t stop at six. <Accent>Neither</Accent> do we.
                </>
              }
              intro="Long braid styles take hours — and most salons close before you’re off work. Albertine Couture is open 24 hours a day, 7 days a week, at both locations. Walk in at dawn, come after the kids are asleep, or book the overnight chair."
            />
            <div className="reveal mt-8 flex flex-wrap gap-3" data-delay="120">
              <Link href={BOOK_HREF} className="btn btn-primary">
                <CalendarHeart className="size-4" aria-hidden /> Book any hour
              </Link>
              <Link href="/visit" className="btn btn-ghost">
                Hours & locations <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <ol className="relative grid gap-3">
            <GoldThread className="absolute -left-6 top-0 hidden h-full w-8 lg:block" />
            {DAY.map((d, i) => (
              <li key={d.title} className="reveal card-night flex gap-5 p-6" data-delay={i * 90}>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-champagne">
                  <d.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="eyebrow text-[0.68rem] text-champagne">{d.time}</p>
                  <h3 className="display mt-1 text-2xl text-bone">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist/80">{d.body}</p>
                </div>
              </li>
            ))}
            <li className="reveal text-xs text-silver" data-delay="300">
              Closed {SITE.closedHolidays.join(", ")}. <span className="needs-tag ml-1 align-middle">hours to confirm</span>
            </li>
          </ol>
        </div>
      </section>

      {/* CATEGORIES */}
      <section aria-labelledby="styles-title" className="relative border-t border-white/[0.05] bg-ink pb-24 lg:pb-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 pt-24 lg:flex-row lg:items-end lg:pt-28">
            <SectionTitle
              id="styles-title"
              eyebrow="Every style, one house"
              title={
                <>
                  The hair <Accent>rescue</Accent> squad.
                </>
              }
              intro="Braids, weaves, wigs, K-tip, I-tip, micro locs and natural styling — for women, men and kids. Pick a category to see real prices."
            />
            <Link href="/services" className="btn btn-ghost reveal self-start lg:self-end">
              Full menu & prices <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12">
            <StyleTiles />
          </div>
        </div>
      </section>

      {/* PRICE FINDER */}
      <section aria-labelledby="finder-title" className="relative overflow-hidden border-y border-gold/15 bg-graphite py-24 lg:py-32">
        <div aria-hidden className="absolute right-[-10rem] top-10 size-[34rem] rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="wrap relative">
          <SectionTitle
            id="finder-title"
            eyebrow="Price Finder"
            title={
              <>
                Your exact price in <Accent>three</Accent> taps.
              </>
            }
            intro="Style, size, length — done. No more scrolling through hundreds of menu items or messaging for a quote. These are the real prices from our booking menu."
          />
          <div className="reveal mt-12" data-delay="100">
            <StyleFinder compact />
          </div>
        </div>
      </section>

      {/* REAL WORK */}
      <section aria-labelledby="work-title" className="relative overflow-hidden bg-ink py-24 lg:py-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle
              id="work-title"
              eyebrow="Real clients · straight from the chair"
              title={
                <>
                  We’ll style. You’ll <Accent>smile.</Accent>
                </>
              }
              intro="Every photo here is real Albertine Couture work from our website and Instagram."
            />
            <div className="reveal flex flex-wrap gap-3">
              <Link href="/gallery" className="btn btn-ghost">
                View the gallery <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a href={SITE.socials.instagram} target="_blank" rel="noopener" className="btn btn-ghost">
                <InstagramIcon className="size-4" /> {SITE.instagramHandle}
              </a>
            </div>
          </div>
        </div>
        <ul tabIndex={0} aria-label="Real client work — scroll sideways" className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:px-8 lg:px-[max(2rem,calc((100vw-1240px)/2+2rem))]">
          {WORK.filter((w) => w.cat !== "salon")
            .slice(0, 12)
            .map((w, i) => (
              <li key={w.src} className="reveal w-[68vw] shrink-0 snap-start sm:w-[20rem]" data-delay={(i % 6) * 70}>
                <figure className="group relative overflow-hidden rounded-[var(--radius-card)] bg-onyx">
                  <Img src={w.src} alt={w.alt} w={w.w} h={w.h} sizes="(max-width: 640px) 68vw, 20rem" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-14 text-sm text-bone">{w.label}</figcaption>
                </figure>
              </li>
            ))}
        </ul>
      </section>

      {/* TWO LOCATIONS */}
      <section aria-labelledby="loc-title" className="relative overflow-hidden border-t border-white/[0.05] bg-onyx py-24 lg:py-32">
        <div className="wrap">
          <SectionTitle
            id="loc-title"
            eyebrow="Two salons · Maryland & Virginia"
            title={
              <>
                Find your <Accent>chair.</Accent>
              </>
            }
            intro="Same team standards, same full braid menu, same 24/7 hours — pick the salon that’s closest to you."
          />
          <ul className="mt-12 grid gap-5 lg:grid-cols-2">
            {LOCATIONS.map((l, i) => (
              <li key={l.key} className="reveal" data-delay={i * 100}>
                <article className="group card-night overflow-hidden">
                  <div className="relative h-60 overflow-hidden sm:h-72">
                    <Img src={l.photo} alt={`Inside Albertine Couture ${l.short}`} w={1080} h={1080} sizes="(max-width: 1024px) 100vw, 50vw" className="duotone size-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
                    <p className="absolute left-6 top-5 rounded-full border border-gold/40 bg-ink/70 px-3 py-1 text-xs tracking-[0.2em] text-champagne backdrop-blur">{l.state}</p>
                    <span className="needs-tag absolute right-5 top-5 bg-ink/70">storefront photo owed</span>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="display text-4xl text-bone">{l.short}</h3>
                    <div className="mt-5 grid gap-3 text-mist/90 sm:grid-cols-2">
                      <a href={l.mapsUrl} target="_blank" rel="noopener" className="flex gap-3 hover:text-paper">
                        <MapPin className="mt-1 size-4 shrink-0 text-champagne" aria-hidden />
                        <span>
                          {l.street}
                          <br />
                          {l.city}, {l.region} {l.zip}
                          {l.building && <span className="block text-sm text-silver">In {l.building}</span>}
                        </span>
                      </a>
                      <div className="space-y-2">
                        <a href={l.phoneHref} className="flex min-h-11 items-center gap-3 hover:text-paper">
                          {l.textOk ? <MessageCircle className="size-4 shrink-0 text-champagne" aria-hidden /> : <Phone className="size-4 shrink-0 text-champagne" aria-hidden />}
                          {l.phone} {l.textOk && <span className="text-xs text-silver">call or text</span>}
                        </a>
                        <p className="flex gap-3 text-sm">
                          <Clock className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden />
                          <span>
                            Open 24/7
                            <span className="block text-silver">
                              Walk-ins {hm(l.walkIn.open)} – {hm(l.walkIn.close)}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href={`/book?location=${l.key}`} className="btn btn-primary">
                        <CalendarHeart className="size-4" aria-hidden /> Book in {l.short}
                      </Link>
                      <a href={l.mapsUrl} target="_blank" rel="noopener" className="btn btn-ghost">
                        Directions
                      </a>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* REVIEWS */}
      <section aria-labelledby="reviews-title" className="relative overflow-hidden bg-ink py-24 lg:py-32">
        <div aria-hidden className="absolute right-[-12rem] top-0 size-[36rem] rounded-full bg-crimson/[0.07] blur-3xl" />
        <div className="wrap relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>From our Google reviews</Eyebrow>
            <h2 id="reviews-title" className="display mt-4 text-[clamp(4.5rem,13vw,8rem)] leading-none text-bone">
              <span className="gold-foil">{SITE.rating.count}</span>
              <span className="sr-only"> Google reviews</span>
            </h2>
            <p className="mt-2 max-w-xs text-mist/85">Google reviews across our Gaithersburg and Dumfries salons — here’s what clients say about their stylists.</p>
            <a href={SITE.googleReviewsUrl} target="_blank" rel="noopener" className="btn btn-ghost mt-6">
              Read them on Google <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {REVIEWS.slice(0, 4).map((r, i) => (
              <li key={r.text} className={`reveal card-night flex flex-col p-6 ${i % 2 ? "sm:translate-y-8" : ""}`} data-delay={(i % 4) * 70}>
                <Quote className="size-6 text-gold" aria-hidden />
                <p className="mt-4 flex-1 leading-relaxed text-mist/90">“{r.text}”</p>
                <p className="mt-5 text-sm text-bone">
                  {r.service} <span className="text-silver">· {r.location}</span>
                </p>
                <p className="text-xs text-silver">Google review · with {r.stylist}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STORY (light) */}
      <section aria-labelledby="story-title" className="light-scroll relative overflow-hidden bg-bone py-24 text-char lg:py-32">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionTitle
              tone="light"
              id="story-title"
              eyebrow="Meet Albertine"
              title={
                <>
                  Fifteen years. Every style. One <Accent tone="light">house.</Accent>
                </>
              }
              intro="“My expertise encompasses all styles, allowing me to cater to a diverse clientele and their unique preferences. I am passionate about creating stunning looks that enhance individuality and confidence.” — Albertine, owner"
            />
            <div className="reveal mt-8 grid gap-3 sm:grid-cols-3" data-delay="120">
              {[
                { k: "15+", v: "Years behind the chair" },
                { k: "24/7", v: "Open every day, both salons" },
                { k: String(SERVICES.length), v: "Headline services + 1,300 size & length options" },
              ].map((s) => (
                <div key={s.k} className="card-light p-5">
                  <p className="display text-4xl text-rouge">{s.k}</p>
                  <p className="mt-1 text-sm text-stone">{s.v}</p>
                </div>
              ))}
            </div>
            <p className="reveal mt-6 flex items-center gap-2 text-sm text-stone" data-delay="160">
              <Globe2 className="size-4 text-bronze" aria-hidden /> Black-owned · woman-owned · we speak English, French & Spanish
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3" data-delay="180">
              <Link href="/about" className="btn btn-dark">
                Our story <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/book?stylist=albertine" className="btn btn-outline-dark">
                <CalendarHeart className="size-4" aria-hidden /> Book with Albertine
              </Link>
            </div>
          </div>
          <div className="reveal relative" data-delay="100">
            <div className="relative overflow-hidden rounded-[var(--radius-card)]">
              <Img src="/media/work-ac/salon-floor" alt="Inside Albertine Couture: rows of styling stations under a crystal chandelier" w={1080} h={1440} sizes="(max-width: 1024px) 100vw, 40vw" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-char/90 to-transparent p-6 pt-20">
                <p className="text-sm text-paper">“…comparable to an upscale establishment in Washington, D.C.” — Google review</p>
              </div>
            </div>
            <span className="needs-tag absolute -top-3 left-4 bg-bone">Albertine portrait owed</span>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section aria-labelledby="team-title" className="relative border-t border-white/[0.05] bg-onyx py-24 lg:py-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle
              id="team-title"
              eyebrow="30+ stylists across two salons"
              title={
                <>
                  Ask for your <Accent>favorite.</Accent>
                </>
              }
              intro="Clients ask for their braider by name — so every stylist has their own booking calendar."
            />
            <Link href="/team" className="btn btn-ghost reveal self-start lg:self-end">
              Meet the team <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {TEAM.map((t, i) => (
              <li key={t.key} className="reveal" data-delay={i * 60}>
                <Link href={`/team#${t.key}`} className="group block rounded-[var(--radius-card)] border border-white/[0.08] bg-ink p-5 text-center transition hover:border-gold/50">
                  <span className="display mx-auto grid size-20 place-items-center rounded-full border border-gold/50 bg-gold/[0.06] text-4xl text-champagne transition group-hover:bg-gold/15">{t.name[0]}</span>
                  <p className="mt-4 text-lg text-bone">{t.name}</p>
                  <p className="text-xs text-silver">{t.role}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-silver">
            <span className="needs-tag mr-2 align-middle">Team photos owed</span> Demo shows six of the stylists listed on the salon’s Vagaro pages.
          </p>
        </div>
      </section>

      {/* JOURNAL */}
      <section aria-labelledby="journal-title" className="relative bg-ink py-24 lg:py-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle
              id="journal-title"
              eyebrow="The Couture Hair Journal"
              title={
                <>
                  Hair care, <Accent>explained.</Accent>
                </>
              }
              intro="Straight answers from the chair — so your style lasts longer and your hair stays healthy between visits."
            />
            <Link href="/journal" className="btn btn-ghost reveal self-start lg:self-end">
              All articles <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {ARTICLES.map((a, i) => (
              <li key={a.slug} className="reveal" data-delay={i * 80}>
                <Link href={`/journal/${a.slug}`} className="group card-night flex h-full flex-col overflow-hidden transition hover:border-gold/40">
                  <div className="relative h-56 overflow-hidden border-b border-white/[0.06] bg-onyx">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img width={600} height={800} src={a.art} alt="" aria-hidden loading="lazy" className="absolute inset-0 m-auto h-[88%] w-auto transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-[0.66rem] text-silver">
                      {a.category} · {a.minutes} min read
                    </p>
                    <h3 className="display mt-3 text-2xl leading-snug text-bone">{a.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-mist/75">{a.dek}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-champagne">
                      Read <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-white/[0.05] bg-onyx py-24 lg:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle
            id="faq-title"
            eyebrow="Good to know"
            title={
              <>
                Questions, <Accent>answered.</Accent>
              </>
            }
          />
          <div className="reveal" data-delay="100">
            <FaqList items={FAQ} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-gold/15 bg-ink pb-28 pt-24 text-center lg:pb-36">
        <div aria-hidden className="absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.1] blur-[120px]" />
        <div className="wrap relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/brand/badge.png" alt="" aria-hidden width={232} height={184} loading="lazy" className="mx-auto h-24 w-auto" />
          <p className="eyebrow mt-6 text-silver">Your chair is waiting — day or night</p>
          <h2 id="cta-title" className="mt-4 font-[family-name:var(--font-script)] text-[clamp(3.4rem,12vw,9rem)] font-normal leading-[1.15]">
            <span className="mirror" data-reflect="Albertine Couture">
              <span className="gold-foil">Albertine Couture</span>
            </span>
          </h2>
          <p className="mx-auto mt-[clamp(1.5rem,5vw,3.5rem)] max-w-lg text-lg text-mist/90">Book online in under a minute — pick your style, your stylist, your salon and your time.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={BOOK_HREF} className="btn btn-primary">
              <CalendarHeart className="size-4" aria-hidden /> Book your appointment
            </Link>
            {LOCATIONS.map((l) => (
              <a key={l.key} href={l.phoneHref} className="btn btn-ghost">
                <Phone className="size-4" aria-hidden /> {l.state} {l.phone}
              </a>
            ))}
          </div>
          <p className="mt-10 text-sm text-silver">
            Braiders & stylists:{" "}
            <Link href="/careers" className="text-mist underline-offset-4 hover:text-paper hover:underline">
              we’re hiring at both salons — join the team
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
