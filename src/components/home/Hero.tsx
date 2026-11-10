"use client";

import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, CalendarHeart } from "lucide-react";
import { BOOK_HREF, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useEasternClock, salonState } from "@/components/site/OpenNow";
import { InstagramIcon, TikTokIcon } from "@/components/site/BrandIcons";

/**
 * SIGNATURE HERO — "Your dream hair awaits — any hour."
 * Reuses Couture House's line-art woman (public/media/hero/lines.json), now drawn in
 * Albertine gold. Her hair redraws through four styles the salon is known for, while a
 * 24-hour gold clock ring behind her shows the salon never closes: the whole dial is lit,
 * a gold light orbits it nonstop, and a hand marks the live Eastern time.
 * Visitors can tap a style to change it.
 * Honors prefers-reduced-motion (static, no autoplay) and pauses off-screen.
 */
const FRAMES = [
  { key: "locs", label: "Locs", caption: "Retwists · starter & micro locs · faux locs", href: "/services/locs" },
  { key: "braids", label: "Knotless", caption: "Knotless · boho · Bora Bora · French curl", href: "/services/knotless-braids" },
  { key: "silkpress", label: "Silk Press", caption: "Olaplex silk press · sew-ins · K-tip", href: "/services/silk-press-color" },
  { key: "pixie", label: "Pixie & Color", caption: "Precision pixie cuts · vibrant color", href: "/services/silk-press-color" },
] as const;

const HOLD = 3.6; // seconds each style is held

/** Strokes are pre-merged into ~10 bucket paths per layer (top → bottom) so only ~54 SVG
 *  elements animate. Each bucket's dash length = its longest strand, so every strand in a
 *  bucket draws at the same pen speed (dash patterns restart per subpath). */
type Part = { d: string; len: number };
type Lines = { w: number; h: number; base: Part[]; frames: { key: string; parts: Part[] }[] };

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [lines, setLines] = useState<Lines | null>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const activeRef = useRef(0);
  const busy = useRef(false);
  const auto = useRef<gsap.core.Tween | null>(null);
  const progress = useRef<HTMLSpanElement[]>([]);
  const reduce = useRef(false);
  const visible = useRef(true);
  const goRef = useRef<(n: number) => void>(() => {});

  useEffect(() => {
    let alive = true;
    // Load the line art after first paint so it never competes with the headline (LCP).
    const go = () =>
      fetch("/media/hero/lines.json")
        .then((r) => r.json())
        .then((d: Lines) => alive && setLines(d))
        .catch(() => {});
    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb, { timeout: 1200 });
      else setTimeout(cb, 300);
    };
    if (document.readyState === "complete") idle(go);
    else window.addEventListener("load", () => idle(go), { once: true });
    return () => {
      alive = false;
    };
  }, []);

  const q = useCallback((sel: string) => Array.from(svgRef.current?.querySelectorAll<SVGPathElement>(sel) ?? []), []);

  /** Restart the auto-advance timer (and the chip's progress bar). */
  const schedule = useCallback(() => {
    auto.current?.kill();
    progress.current.forEach((p) => p && gsap.set(p, { scaleX: 0 }));
    if (reduce.current) return;
    const bar = progress.current[activeRef.current];
    auto.current = gsap.to(bar ?? {}, {
      scaleX: 1,
      duration: HOLD,
      ease: "none",
      onComplete: () => goRef.current((activeRef.current + 1) % FRAMES.length),
    });
    if (!visible.current || document.hidden) auto.current.pause();
  }, []);

  const go = useCallback(
    (next: number) => {
      if (busy.current || next === activeRef.current || !svgRef.current) return;
      busy.current = true;
      auto.current?.kill();
      const prev = activeRef.current;
      activeRef.current = next;
      setActive(next);
      const out = q(`g[data-f="${prev}"] path`);
      const inn = q(`g[data-f="${next}"] path`);
      const tl = gsap.timeline({
        onComplete: () => {
          busy.current = false;
          schedule();
        },
      });
      // the clock ring pulses, like time passing
      tl.to(".hero-ring", { scale: 1.035, duration: 0.9, ease: "power2.inOut", transformOrigin: "50% 50%" }, 0)
        .to(".hero-ring", { scale: 1, duration: 0.9, ease: "power2.out" }, 0.9)
        // mirror glint sweeps across her
        .fromTo(".hero-glint", { xPercent: -120, opacity: 0 }, { xPercent: 120, opacity: 1, duration: 1.5, ease: "power2.inOut" }, 0.1)
        .to(".hero-glint", { opacity: 0, duration: 0.3 }, 1.35)
        // old hair retracts…
        .to(out, { strokeDashoffset: (_i: number, el: SVGPathElement) => Number(el.dataset.len), duration: 0.9, ease: "power2.in", stagger: { amount: 0.35, from: "end" } }, 0)
        // …new hair draws on
        .set(`g[data-f="${next}"]`, { autoAlpha: 1 }, 0.5)
        .to(inn, { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut", stagger: { amount: 0.55, from: "start" } }, 0.55)
        .set(`g[data-f="${prev}"]`, { autoAlpha: 0 }, ">");
    },
    [q, schedule],
  );
  useEffect(() => {
    goRef.current = go;
  }, [go]);

  // Intro: base draws, then the first hairstyle, then autoplay.
  useEffect(() => {
    if (!lines || !svgRef.current) return;
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const base = q("g.base path");
      const first = q('g[data-f="0"] path');
      if (reduce.current) {
        gsap.set([...base, ...first], { strokeDashoffset: 0 });
        gsap.set('g[data-f="0"]', { autoAlpha: 1 });
        gsap.set(".hero-ring .draw", { strokeDashoffset: 0 });
        setReady(true);
        return;
      }
      const tl = gsap.timeline({ delay: 0.15, onComplete: () => (setReady(true), schedule()) });
      tl.to(".hero-ring .draw", { strokeDashoffset: 0, duration: 2.4, ease: "power2.out", stagger: 0.15 }, 0)
        .to(base, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: { amount: 0.8 } }, 0.1)
        .set('g[data-f="0"]', { autoAlpha: 1 }, 0.9)
        .to(first, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: { amount: 0.7 } }, 0.95);
      gsap.to(".hero-stage", { y: -6, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, root.current ?? undefined);
    return () => {
      auto.current?.kill();
      ctx.revert();
    };
  }, [lines, q, schedule]);

  // Pause autoplay while off-screen or the tab is hidden.
  useEffect(() => {
    if (!root.current) return;
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
      if (e.isIntersecting) auto.current?.resume();
      else auto.current?.pause();
    });
    io.observe(root.current);
    const vis = () => (document.hidden ? auto.current?.pause() : visible.current && auto.current?.resume());
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  // Desktop pointer parallax on the stage.
  useEffect(() => {
    const el = root.current?.querySelector<HTMLElement>(".hero-parallax");
    if (!el || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const qx = gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" });
    const on = (e: PointerEvent) => {
      qx((e.clientX / window.innerWidth - 0.5) * -16);
      qy((e.clientY / window.innerHeight - 0.5) * -10);
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, []);

  const f = FRAMES[active];

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative min-h-[100svh] overflow-hidden bg-ink">
      {/* ambient red bloom + floor reflection line */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[6%] size-[26rem] -translate-x-1/2 rounded-full bg-gold/[0.12] blur-[90px] lg:left-[68%] lg:top-[16%] lg:size-[46rem] lg:blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* STAGE */}
      <div className="hero-parallax absolute inset-x-0 top-[4.25rem] flex h-[45svh] justify-center md:h-[40svh] lg:inset-y-0 lg:left-[52%] lg:right-0 lg:top-0 lg:h-auto lg:items-center xl:left-[42%]">
        <div className="hero-stage relative h-full w-full max-w-[min(92vw,640px)] lg:h-[86svh] lg:max-w-none">
          {lines && <Figure lines={lines} svgRef={svgRef} />}
          <div aria-hidden className="hero-glint pointer-events-none absolute inset-y-0 left-1/4 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent opacity-0" />
        </div>
      </div>
      {/* mobile veil so copy reads over the figure */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 top-[34svh] bg-gradient-to-b from-transparent via-ink/90 via-[38%] to-ink lg:hidden" />

      {/* COPY */}
      <div className="wrap relative z-10 flex min-h-[100svh] flex-col justify-end pb-8 pt-[47svh] lg:justify-center lg:pb-10 lg:pt-28">
        <div className="max-w-[38rem]">
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-silver">
            <span className="text-champagne">Gaithersburg, MD</span>
            <span aria-hidden className="h-px w-6 bg-gold/70" />
            <span className="text-champagne">Dumfries, VA</span>
            <span aria-hidden className="h-px w-6 bg-gold/70" />
            <span>Open 24/7</span>
          </p>
          <h1 id="hero-title" className="display mt-4 text-[clamp(2.7rem,7vw,5.3rem)] text-bone lg:mt-5">
            <span className="block">Your dream hair</span>
            <span className="block">
              awaits — <span className="script text-[1.12em] leading-[0.6] text-champagne">any hour.</span>
            </span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-mist/90 sm:text-lg lg:mt-6">
            Knotless, boho and Bora Bora braids, twists, locs, sew-ins and K-tip extensions by a team of 30+ stylists. Walk in from 5 AM — or book any hour of the night.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-8">
            <Link href={BOOK_HREF} className="btn btn-primary">
              <CalendarHeart className="size-4" aria-hidden /> Book your appointment
            </Link>
            <Link href="/style-finder" className="btn btn-ghost">
              Find my exact price <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-mist/90">
            <a href={SITE.socials.instagram} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 hover:text-paper">
              <InstagramIcon className="size-4 text-champagne" /> <strong className="font-semibold text-paper">{SITE.followers.instagram}</strong> on Instagram
            </a>
            <a href={SITE.socials.tiktok} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 hover:text-paper">
              <TikTokIcon className="size-4 text-champagne" /> <strong className="font-semibold text-paper">{SITE.followers.tiktok}</strong> on TikTok
            </a>
          </div>

          {/* Style switcher — tap to change her hair */}
          <div className="mt-5 border-t border-white/[0.08] pt-5">
            <p className="eyebrow text-[0.66rem] text-silver" id="style-switch-label">
              One chair. Every style. <span className="sr-only">Choose a hairstyle to see it drawn.</span>
            </p>
            <div role="group" aria-labelledby="style-switch-label" className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
              {FRAMES.map((fr, i) => (
                <button
                  key={fr.key}
                  type="button"
                  onClick={() => go(i)}
                  aria-pressed={i === active}
                  disabled={!ready}
                  className={cn(
                    "relative min-h-11 overflow-hidden rounded-full border px-2 text-[0.8rem] tracking-[0.04em] transition-colors disabled:cursor-default sm:text-sm",
                    i === active ? "border-gold/70 bg-gold/10 text-paper" : "border-white/12 text-mist/80 hover:border-white/30 hover:text-paper",
                  )}
                >
                  {fr.label}
                  <span
                    ref={(el) => {
                      if (el) progress.current[i] = el;
                    }}
                    aria-hidden
                    className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gold"
                  />
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-silver" aria-live="polite">
              <Link href={f.href} className="inline-flex min-h-11 items-center gap-2 hover:text-paper">
                {f.caption} <ArrowRight className="size-3.5 text-champagne" aria-hidden />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const Figure = memo(function Figure({ lines, svgRef }: { lines: Lines; svgRef: React.RefObject<SVGSVGElement | null> }) {
  // 24-hour clock ring behind her head: the salon never closes.
  const cx = lines.w * 0.5;
  const cy = lines.h * 0.36;
  const R = lines.w * 0.5;
  return (
    <svg
      ref={svgRef}
      viewBox={`-80 -110 ${lines.w + 160} ${lines.h + 120}`}
      preserveAspectRatio="xMidYMid meet"
      className="hero-svg absolute inset-0 size-full"
      role="img"
      aria-label="Gold line drawing of a woman whose hairstyle changes between locs, knotless braids, a silk press and a pixie cut, framed by a 24-hour clock"
    >
      <ClockRing cx={cx} cy={cy} r={R} />
      <g className="base" fill="none" stroke="#f6f0de" strokeOpacity={0.9} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {lines.base.map((p, i) => (
          <path key={i} d={p.d} strokeDasharray={`${p.len} ${p.len}`} strokeDashoffset={p.len} data-len={p.len} />
        ))}
      </g>
      {lines.frames.map((fr, fi) => (
        <g key={fr.key} data-f={fi} className="hair" fill="none" stroke="#c9a24d" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ visibility: "hidden" }}>
          {fr.parts.map((p, i) => (
            <path key={i} d={p.d} strokeDasharray={`${p.len} ${p.len}`} strokeDashoffset={p.len} data-len={p.len} />
          ))}
        </g>
      ))}
      <style>{`
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          .hero-svg .hair { filter: drop-shadow(0 0 6px rgba(201,162,77,.55)); }
        }
      `}</style>
    </svg>
  );
});

/** Point on a 24-hour dial (0:00 at the top, clockwise). */
const at = (cx: number, cy: number, r: number, minutes: number) => {
  const a = (minutes / 1440) * Math.PI * 2 - Math.PI / 2;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
};
const arc = (cx: number, cy: number, r: number, m0: number, m1: number) => {
  const [x0, y0] = at(cx, cy, r, m0);
  const [x1, y1] = at(cx, cy, r, m1);
  const large = (m1 - m0) % 1440 > 720 ? 1 : 0;
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

function ClockRing({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const now = useEasternClock();
  const mins = now ? now.getHours() * 60 + now.getMinutes() : 10 * 60;
  const [hx, hy] = at(cx, cy, r - 26, mins);
  const circ = 2 * Math.PI * r;
  // Full circle = open all 24 hours (two half arcs so it can draw on).
  const full = `${arc(cx, cy, r, 0, 720)} ${arc(cx, cy, r, 720, 1440).replace("M", "L")}`;
  const st = now ? salonState(now) : null;
  const origin = { transformBox: "view-box", transformOrigin: `${cx}px ${cy}px` } as const;
  // Comet tail: short arcs behind the head, fading out (minutes before 12 o'clock).
  const TAIL = 16;
  return (
    <g className="hero-ring" aria-hidden>
      <defs>
        <filter id="ring-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={r + 16} fill="none" stroke="#c9a24d" strokeOpacity={0.18} strokeWidth={1} className="draw" strokeDasharray={2 * Math.PI * (r + 16)} strokeDashoffset={2 * Math.PI * (r + 16)} />
      {/* the whole dial is lit: open 24 hours, 7 days */}
      <path d={full} fill="none" stroke="#c9a24d" strokeOpacity={0.55} strokeWidth={3} strokeLinecap="round" className="draw" strokeDasharray={circ} strokeDashoffset={circ} />
      {/* slow counter-turning inner track — the clock never stops */}
      <circle cx={cx} cy={cy} r={r - 34} fill="none" stroke="#e3c77d" strokeOpacity={0.22} strokeWidth={1} strokeDasharray="1 9" strokeLinecap="round" className="ring-spin-rev" style={origin} />
      {/* gold light that orbits the full dial, around the clock */}
      <g className="ring-orbit" style={origin}>
        {Array.from({ length: TAIL }).map((_, i) => (
          <path key={i} d={arc(cx, cy, r, 1440 - (i + 1) * 14, 1440 - i * 14 + 0.5)} fill="none" stroke="#f3dc9a" strokeOpacity={(1 - i / TAIL) * 0.9} strokeWidth={4.5 - (i / TAIL) * 2.5} strokeLinecap="round" />
        ))}
        <circle cx={cx} cy={cy - r} r={10} fill="#f3dc9a" opacity={0.55} filter="url(#ring-glow)" />
        <circle cx={cx} cy={cy - r} r={4.5} fill="#fff6dc" />
      </g>
      {Array.from({ length: 24 }).map((_, h) => {
        const [x0, y0] = at(cx, cy, r - 10, h * 60);
        const [x1, y1] = at(cx, cy, r - (h % 6 === 0 ? 26 : 16), h * 60);
        return <line key={h} x1={x0} y1={y0} x2={x1} y2={y1} stroke="#e3c77d" strokeOpacity={h % 6 === 0 ? 0.8 : 0.35} strokeWidth={h % 6 === 0 ? 2.4 : 1.3} strokeLinecap="round" />;
      })}
      {[
        [0, "12 AM"],
        [6 * 60, "6 AM"],
        [12 * 60, "NOON"],
        [18 * 60, "6 PM"],
      ].map(([m, l]) => {
        const [x, y] = at(cx, cy, r + 42, m as number);
        return (
          <text key={l as string} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#b5ab97" fontSize={17} letterSpacing={3} fontFamily="var(--font-jost), sans-serif">
            {l}
          </text>
        );
      })}
      {now && (
        <g className="hero-hand">
          <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="#e3c77d" strokeOpacity={0.35} strokeWidth={1.4} strokeDasharray="3 7" />
          <circle cx={hx} cy={hy} r={9} fill="#0b0a08" stroke="#e3c77d" strokeWidth={2.4} />
          <circle cx={hx} cy={hy} r={3.5} fill={st?.walkIn ? "#3fae7a" : "#e3c77d"} />
        </g>
      )}
    </g>
  );
}
