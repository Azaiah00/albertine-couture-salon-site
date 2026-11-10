"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarHeart, KeyRound, Menu, Phone, X } from "lucide-react";
import { BOOK_HREF, NAV, PORTAL_DEMO, SHOW_PORTAL_LINK, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import { OpenNowPill } from "./OpenNow";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "./BrandIcons";

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      {/* Their real gold badge logo (only a 232px file exists — HD rebuild owed, see ASSETS-OWED.md) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/brand/badge.png" alt="" aria-hidden width={232} height={184} className={cn("w-auto drop-shadow-[0_4px_14px_rgba(201,162,77,0.25)] transition-all duration-500", compact ? "h-10" : "h-12 sm:h-14")} />
      <span className="leading-none">
        <span className="script block text-[1.55rem] leading-[0.95] text-champagne sm:text-[1.75rem]">Albertine Couture</span>
        <span className="mt-1 block text-[0.62rem] font-medium tracking-[0.42em] text-mist/80">HAIR SALON · DMV</span>
      </span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  // Close the menu on navigation (state update during render on route change).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-white/[0.06] bg-ink/85 py-2 backdrop-blur-xl" : "bg-gradient-to-b from-ink/80 to-transparent py-4",
        )}
      >
        <div className="wrap flex items-center justify-between gap-4">
          <Link href="/" aria-label={`${SITE.name} — home`} className="shrink-0">
            <Wordmark compact={scrolled} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => {
              const active = pathname === n.href || pathname.startsWith(`${n.href}/`);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative whitespace-nowrap px-2.5 py-2 text-[0.9rem] tracking-[0.04em] xl:px-3.5 transition-colors hover:text-paper",
                    active ? "text-paper after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-px after:bg-gold" : "text-mist/80",
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <OpenNowPill className="hidden 2xl:inline-flex" />
            {SHOW_PORTAL_LINK && (
              <Link
                href="/portal"
                aria-label={PORTAL_DEMO ? "Demo sign-in: try the booking portal as a client, owner or stylist" : "Sign in"}
                className="group relative inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-champagne/60 bg-ink/40 px-3 text-sm text-bone transition hover:border-champagne hover:bg-crimson/20 sm:px-4"
              >
                <KeyRound className="size-4 text-champagne" aria-hidden />
                <span className="hidden whitespace-nowrap sm:inline lg:hidden xl:inline">{PORTAL_DEMO ? "Demo sign-in" : "Sign in"}</span>
                {PORTAL_DEMO && <span aria-hidden className="absolute -right-1 -top-1.5 rounded-full bg-crimson px-1.5 py-px text-[9px] font-semibold tracking-[0.12em] text-paper sm:hidden">DEMO</span>}
              </Link>
            )}
            <Link href={BOOK_HREF} className="btn btn-primary hidden !min-h-11 whitespace-nowrap !px-5 sm:inline-flex">
              <CalendarHeart className="size-4" aria-hidden /> Book now
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-white/15 text-bone lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-[90] flex flex-col overflow-y-auto overscroll-contain bg-ink lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div aria-hidden className="absolute -right-24 top-24 size-80 rounded-full bg-crimson/20 blur-3xl" />
          <div className="wrap relative flex items-center justify-between py-4">
            <Wordmark compact />
            <button onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full border border-white/15 text-bone" aria-label="Close menu" autoFocus>
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="wrap relative mt-6 flex flex-col">
            {[{ href: "/", label: "Home" }, ...NAV, { href: "/journal", label: "Journal" }, { href: "/careers", label: "Join our team" }].map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="display flex min-h-14 items-center justify-between border-b border-white/[0.07] text-[2.1rem] text-bone"
                style={{ animation: `menuIn .5s ${i * 0.04}s both var(--ease-lux)` }}
              >
                {n.label}
                <span className="text-xs tracking-[0.3em] text-silver">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="wrap relative mt-auto space-y-4 pb-8 pt-10">
            <Link href={BOOK_HREF} onClick={() => setOpen(false)} className="btn btn-primary w-full">
              <CalendarHeart className="size-4" aria-hidden /> Book your appointment
            </Link>
            {SHOW_PORTAL_LINK && (
              <Link href="/portal" onClick={() => setOpen(false)} className="btn btn-ghost w-full">
                <KeyRound className="size-4 text-champagne" aria-hidden /> {PORTAL_DEMO ? "Demo sign-in · client, owner or stylist" : "Sign in"}
              </Link>
            )}
            <div className="flex items-center justify-between text-sm text-mist">
              <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center gap-2">
                <Phone className="size-4 text-champagne" aria-hidden /> MD {SITE.phone}
              </a>
              <span className="flex gap-1">
                <a href={SITE.socials.tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="grid size-11 place-items-center">
                  <TikTokIcon className="size-5" />
                </a>
                <a href={SITE.socials.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-11 place-items-center">
                  <InstagramIcon className="size-5" />
                </a>
                <a href={SITE.socials.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid size-11 place-items-center">
                  <FacebookIcon className="size-5" />
                </a>
              </span>
            </div>
          </div>
          <style>{`@keyframes menuIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>
        </div>
      )}
    </>
  );
}
