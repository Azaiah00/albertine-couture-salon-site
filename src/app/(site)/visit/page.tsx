import type { Metadata } from "next";
import { Clock, CreditCard, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import Link from "next/link";
import { CalendarHeart } from "lucide-react";
import { Accent, PageHero } from "@/components/ui/Kit";
import { ContactForm } from "@/components/site/Forms";
import { MapEmbed } from "@/components/site/MapEmbed";
import { FaqList } from "@/components/ui/FaqList";
import { GOOD_TO_KNOW, LOCATIONS, SITE, hm } from "@/lib/site";
import { FAQ } from "@/lib/content";

export const metadata: Metadata = {
  title: "Locations & Hours — Gaithersburg & Dumfries",
  description: "Albertine Couture: 305 Muddy Branch Rd, Gaithersburg, MD (301) 765-4915 and 17457 Jefferson Davis Hwy, Dumfries, VA (571) 409-8230. Open 24/7, walk-ins from 5 AM.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations & hours"
        art="/media/art/silkpress.svg"
        title={
          <>
            Two salons. <Accent>Always</Accent> open.
          </>
        }
        intro="Gaithersburg, Maryland and Dumfries, Virginia — both open 24 hours a day, 7 days a week. Walk-ins daily from 5 AM; after-hours by appointment."
      />
      <section className="bg-ink py-16 lg:py-24">
        <div className="wrap space-y-16">
          {LOCATIONS.map((l) => (
            <article key={l.key} id={l.key} className="scroll-mt-28 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
              <div className="card-night p-6 sm:p-8">
                <p className="eyebrow text-champagne">{l.state} location</p>
                <h2 className="display mt-2 text-5xl text-bone">{l.short}</h2>
                <ul className="mt-6 space-y-5">
                  <li>
                    <a href={l.mapsUrl} target="_blank" rel="noopener" className="flex gap-4 text-lg text-bone hover:text-paper">
                      <MapPin className="mt-1 size-5 shrink-0 text-champagne" aria-hidden />
                      <span>
                        {l.street}
                        <br />
                        {l.city}, {l.region} {l.zip}
                        {l.building && <span className="block text-sm text-silver">In the {l.building} shopping center</span>}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={l.phoneHref} className="flex min-h-11 items-center gap-4 text-lg text-bone hover:text-paper">
                      {l.textOk ? <MessageCircle className="size-5 shrink-0 text-champagne" aria-hidden /> : <Phone className="size-5 shrink-0 text-champagne" aria-hidden />} {l.phone}
                      {l.textOk && <span className="text-sm text-silver">call or text</span>}
                    </a>
                  </li>
                  <li className="flex gap-4 text-mist/90">
                    <Clock className="mt-1 size-5 shrink-0 text-champagne" aria-hidden />
                    <span>
                      <span className="text-bone">Open 24 hours · 7 days</span>
                      <span className="block">
                        Walk-ins {hm(l.walkIn.open)} – {hm(l.walkIn.close)} daily
                      </span>
                      <span className="block text-sm text-silver">After-hours by appointment (+${SITE.afterHours.fee}) · closed {SITE.closedHolidays.join(", ")}</span>
                    </span>
                  </li>
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={`/book?location=${l.key}`} className="btn btn-primary">
                    <CalendarHeart className="size-4" aria-hidden /> Book in {l.short}
                  </Link>
                  <a href={l.mapsUrl} target="_blank" rel="noopener" className="btn btn-ghost">
                    <Navigation className="size-4" aria-hidden /> Directions
                  </a>
                </div>
              </div>
              <MapEmbed loc={l} />
            </article>
          ))}
          <p className="text-sm text-silver">
            <span className="needs-tag mr-2 align-middle">Needs client confirmation</span>
            Published hours differ between Google (24 hours), the website (walk-ins 5:00 / 5:30 AM – 7:30 PM, appointments 8 PM – 4:59 AM) and Instagram (after-hours 7:35 PM – 4:51 AM). The salon’s old site also lists a Columbia, MD location — not shown until confirmed.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card-night p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-xl text-bone">
                <CreditCard className="size-5 text-champagne" aria-hidden /> Ways to pay
              </h2>
              <p className="mt-3 text-mist/85">{SITE.payments.join(" · ")}</p>
              <p className="mt-2 text-sm text-silver">3% processing fee on card and Cash App payments.</p>
              <a href={`mailto:${SITE.email}`} className="mt-5 flex min-h-11 items-center gap-3 break-all text-mist hover:text-paper">
                <Mail className="size-5 shrink-0 text-champagne" aria-hidden /> {SITE.email}
              </a>
            </div>
            <div className="card-night p-6 sm:p-8">
              <h2 className="display text-3xl text-bone">Send a message</h2>
              <p className="mt-2 text-sm text-silver">For bookings, the fastest way is online or by phone.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-white/[0.06] bg-onyx py-16 lg:py-24">
        <div className="wrap">
          <h2 className="display text-4xl text-bone sm:text-5xl">Booking policies</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {GOOD_TO_KNOW.map((g) => (
              <li key={g.title} className="card-night p-6">
                <p className="text-bone">{g.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist/80">{g.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-silver">From the Booking Policies on the salon’s website. No-shows are charged the full service price; concerns must be raised within 24 hours. The salon may photograph your style for social media — tell your stylist before your service to opt out.</p>
          <div className="mt-14 max-w-3xl">
            <FaqList items={FAQ} />
          </div>
        </div>
      </section>
    </>
  );
}
