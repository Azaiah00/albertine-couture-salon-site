import type { Metadata } from "next";
import Link from "next/link";
import { CalendarHeart, Check } from "lucide-react";
import { Accent, PageHero, PhotoSlot } from "@/components/ui/Kit";
import { TEAM, REVIEWS } from "@/lib/content";
import { STAFF_CATEGORIES, CATEGORY_BY_KEY } from "@/lib/services";
import { BOOK_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Stylists — Albertine & the Couture Team",
  description: "Meet Albertine, owner with 15+ years of experience, and the braiders and stylists behind the chair at Albertine Couture in Gaithersburg, MD and Dumfries, VA.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="The team"
        art="/media/art/braids.svg"
        title={
          <>
            The hands behind your <Accent>crown.</Accent>
          </>
        }
        intro="More than 30 stylists work across our two salons. Here are six of them — clients ask for their braider by name, so each one has their own booking calendar."
      />
      <section className="bg-ink py-20 lg:py-28">
        <div className="wrap space-y-24">
          {TEAM.map((t, i) => {
            const quotes = REVIEWS.filter((r) => r.stylist === t.name || (t.key === "magui" && r.stylist === "Maggie")).slice(0, 1);
            return (
              <article key={t.key} id={t.key} className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={`${i ? "reveal" : ""} ${i % 2 ? "lg:order-2" : ""}`}>
                  <PhotoSlot className="aspect-[4/5] max-h-[30rem]" label={`${t.name} — professional portrait`} art={["/media/art/braids.svg", "/media/art/locs.svg", "/media/art/weave.svg"][i % 3]} />
                </div>
                <div className={i ? "reveal" : ""} data-delay="100">
                  <p className="eyebrow text-silver">{t.role}</p>
                  <p className="mt-1 text-sm text-champagne">{t.location === "md" ? "Gaithersburg, MD" : "Dumfries, VA"}</p>
                  <h2 className="display mt-3 text-5xl text-bone sm:text-6xl">{t.name}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-mist/90">{t.bio}</p>
                  {t.bioNote?.startsWith("NEEDS") && <p className="needs-tag mt-4">{t.bioNote}</p>}
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {t.specialties.map((s) => (
                      <li key={s} className="flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 text-sm text-mist">
                        <Check className="size-3.5 text-champagne" aria-hidden /> {s}
                      </li>
                    ))}
                  </ul>
                  {quotes.map((q) => (
                    <blockquote key={q.text} className="mt-8 border-l-2 border-gold pl-5">
                      <p className="text-mist/90">“{q.text}”</p>
                      <footer className="mt-2 text-sm text-silver">Google review · {q.location}</footer>
                    </blockquote>
                  ))}
                  <p className="mt-6 text-sm text-silver">
                    Books: {STAFF_CATEGORIES[t.key].filter((c) => c !== "extras").map((c) => CATEGORY_BY_KEY[c].short).join(" · ")} <span className="needs-tag ml-1 align-middle">demo — to confirm</span>
                  </p>
                  <Link href={`${BOOK_HREF}${BOOK_HREF.startsWith("/") ? `?stylist=${t.key}` : ""}`} className="btn btn-primary mt-6">
                    <CalendarHeart className="size-4" aria-hidden /> Book with {t.name.split(" ")[0]}
                  </Link>
                </div>
              </article>
            );
          })}
          <p className="text-center text-sm text-silver">
            Also on the team: Victoria, Angelina, Lulu, Odile, Georgina, Madeleine, Mariame, Dede Precilia, Celine, Grace, Arlette, Valentine, Sylvie, Herbert, Rachelle, Ornella, Ami, Tina, Vicky and Bella M in Gaithersburg; Zeynab, Amara, Tracey, Ashley and Sandra in Dumfries.
          </p>
        </div>
      </section>
    </>
  );
}
