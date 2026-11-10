import Link from "next/link";
import { CalendarHeart, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BOOK_HREF, LOCATIONS, NAV, SITE, hm } from "@/lib/site";
import { CATEGORIES } from "@/lib/services";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./BrandIcons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-onyx pb-28 pt-20 sm:pb-12">
      <div aria-hidden className="absolute -left-40 bottom-0 size-[30rem] rounded-full bg-gold/[0.07] blur-3xl" />
      <div className="wrap relative grid gap-12 lg:grid-cols-[1.1fr_1fr_0.8fr_1.3fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/brand/badge.png" alt="Albertine Couture Hair Salon gold badge logo" width={232} height={184} className="h-28 w-auto" loading="lazy" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-silver">
            We’ll style, you’ll smile. Braids, twists, locs, sew-ins, extensions and silk presses in Gaithersburg, MD and Dumfries, VA — open 24/7.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { href: SITE.socials.instagram, label: "Instagram", Icon: InstagramIcon },
              { href: SITE.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
              { href: SITE.socials.facebook, label: "Facebook", Icon: FacebookIcon },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={`Albertine Couture on ${label}`} className="grid size-11 place-items-center rounded-full border border-white/12 text-mist transition hover:border-champagne hover:text-paper">
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="eyebrow text-silver">Services</h2>
          <ul className="mt-5 space-y-1">
            {CATEGORIES.filter((c) => c.slug).map((c) => (
              <li key={c.key}>
                <Link href={`/services/${c.slug}`} className="inline-flex min-h-10 items-center text-mist/85 hover:text-paper">
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="inline-flex min-h-10 items-center text-champagne hover:text-paper">
                Full menu & prices
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-silver">Salon</h2>
          <ul className="mt-5 space-y-1">
            {[...NAV, { href: "/about", label: "About Albertine" }, { href: "/journal", label: "Hair Journal" }, { href: "/careers", label: "Join our team" }, { href: "/portal", label: "Client & staff portal" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-10 items-center text-mist/85 hover:text-paper">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-silver">Two locations · open 24/7</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {LOCATIONS.map((l) => (
              <address key={l.key} className="space-y-2 not-italic text-mist/90">
                <p className="text-sm font-medium tracking-[0.08em] text-champagne">{l.name}</p>
                <a href={l.mapsUrl} target="_blank" rel="noopener" className="flex gap-3 text-sm hover:text-paper">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden />
                  <span>
                    {l.street}
                    <br />
                    {l.city}, {l.region} {l.zip}
                  </span>
                </a>
                <a href={l.phoneHref} className="flex min-h-10 items-center gap-3 text-sm hover:text-paper">
                  {l.textOk ? <MessageCircle className="size-4 shrink-0 text-champagne" aria-hidden /> : <Phone className="size-4 shrink-0 text-champagne" aria-hidden />} {l.phone}
                  {l.textOk && <span className="text-xs text-silver">call or text</span>}
                </a>
              </address>
            ))}
          </div>
          <a href={`mailto:${SITE.email}`} className="mt-3 flex min-h-10 items-center gap-3 break-all text-sm text-mist/90 hover:text-paper">
            <Mail className="size-4 shrink-0 text-champagne" aria-hidden /> {SITE.email}
          </a>
          <div className="mt-4 flex gap-3 text-sm">
            <Clock className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden />
            <p className="text-mist/90">
              Open 24 hours, 7 days · walk-ins daily {hm(LOCATIONS[0].walkIn.open)}–{hm(LOCATIONS[0].walkIn.close)}
              <span className="block text-silver">After-hours by appointment (+${SITE.afterHours.fee}) · closed {SITE.closedHolidays.join(", ")}</span>
            </p>
          </div>
          <Link href={BOOK_HREF} className="btn btn-primary mt-7">
            <CalendarHeart className="size-4" aria-hidden /> Book now
          </Link>
        </div>
      </div>

      <div className="wrap relative mt-16 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-silver sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Albertine Couture Hair Salon LLC · Black-owned & woman-owned · Gaithersburg, MD · Dumfries, VA</p>
        <p>
          Website by{" "}
          <a href="https://couturehouse.co" target="_blank" rel="noopener" className="text-mist hover:text-paper">
            Couture House Co.
          </a>
        </p>
      </div>
    </footer>
  );
}
