"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarHeart, Info, Ruler } from "lucide-react";
import { FINDER, FINDER_GROUPS, LENGTHS, type LengthKey } from "@/lib/finder";
import { bookHref } from "@/lib/site";
import { fmtMoney } from "@/lib/services";
import { Img } from "@/components/ui/Kit";
import { cn } from "@/lib/cn";

/**
 * PRICE FINDER — the conversion engine. Albertine's Vagaro menu lists ~1,350 separate items
 * (style × size × length). Here it is three taps: style → size → length, with the exact
 * regular price, the $20 deposit and a Book button. Length chart shows where each length falls.
 */
export function StyleFinder({ compact = false, initialStyle }: { compact?: boolean; initialStyle?: string }) {
  const [group, setGroup] = useState<(typeof FINDER_GROUPS)[number]>(() => FINDER.find((f) => f.key === initialStyle)?.group ?? "Knotless & Boho");
  const [styleKey, setStyleKey] = useState(initialStyle ?? "knotless");
  const style = FINDER.find((f) => f.key === styleKey) ?? FINDER[0];
  const [sizeKey, setSizeKey] = useState(style.sizes[0].key);
  const size = style.sizes.find((s) => s.key === sizeKey) ?? style.sizes[0];
  const avail = LENGTHS.filter((l) => size.prices[l.key] != null);
  const [len, setLen] = useState<LengthKey>(avail[0]?.key ?? "shoulder");
  const lengthKey = size.prices[len] != null ? len : avail[0].key;
  const price = size.prices[lengthKey] ?? 0;

  // Deep link: /style-finder?style=boho
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("style");
    const f = p && FINDER.find((x) => x.key === p);
    if (f) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setGroup(f.group);
      setStyleKey(f.key);
      setSizeKey(f.sizes[0].key);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, []);

  const styles = useMemo(() => FINDER.filter((f) => f.group === group), [group]);
  const pick = (k: string) => {
    const f = FINDER.find((x) => x.key === k)!;
    setStyleKey(k);
    setSizeKey(f.sizes[0].key);
  };
  const lenIndex = LENGTHS.findIndex((l) => l.key === lengthKey);

  return (
    <div className={cn("grid gap-6 lg:gap-10", compact ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[1.2fr_0.8fr]")}>
      <div className="min-w-0">
        {/* 1 · style */}
        <p className="eyebrow flex items-center gap-3 text-silver">
          <span className="grid size-6 place-items-center rounded-full border border-gold/60 text-[0.7rem] tracking-normal text-champagne">1</span> Pick your style
        </p>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Style family">
          {FINDER_GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => {
                setGroup(g);
                pick(FINDER.find((f) => f.group === g)!.key);
              }}
              aria-pressed={group === g}
              className={cn("min-h-11 shrink-0 rounded-full border px-4 text-sm transition", group === g ? "border-gold bg-gold text-ink" : "border-white/12 text-mist/85 hover:border-white/30 hover:text-paper")}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Style">
          {styles.map((f) => (
            <button
              key={f.key}
              type="button"
              role="radio"
              aria-checked={f.key === style.key}
              onClick={() => pick(f.key)}
              className={cn("min-h-12 rounded-2xl border px-3 py-2 text-left text-sm transition", f.key === style.key ? "border-gold/80 bg-gold/10 text-paper" : "border-white/[0.08] bg-onyx text-mist/85 hover:border-white/25")}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 2 · size */}
        <p className="eyebrow mt-7 flex items-center gap-3 text-silver">
          <span className="grid size-6 place-items-center rounded-full border border-gold/60 text-[0.7rem] tracking-normal text-champagne">2</span> Size
        </p>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
          {style.sizes.map((s) => (
            <button
              key={s.key}
              type="button"
              role="radio"
              aria-checked={s.key === size.key}
              onClick={() => setSizeKey(s.key)}
              className={cn("min-h-11 rounded-full border px-4 text-sm transition", s.key === size.key ? "border-gold/80 bg-gold/10 text-paper" : "border-white/12 text-mist/85 hover:border-white/30")}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* 3 · length */}
        <p className="eyebrow mt-7 flex items-center gap-3 text-silver">
          <span className="grid size-6 place-items-center rounded-full border border-gold/60 text-[0.7rem] tracking-normal text-champagne">3</span> Length
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5" role="radiogroup" aria-label="Length">
          {LENGTHS.map((l) => {
            const p = size.prices[l.key];
            const on = l.key === lengthKey;
            return (
              <button
                key={l.key}
                type="button"
                role="radio"
                aria-checked={on}
                disabled={p == null}
                onClick={() => setLen(l.key)}
                className={cn(
                  "flex min-h-14 flex-col items-start justify-center rounded-xl border px-3 text-left transition disabled:cursor-not-allowed",
                  on ? "border-gold bg-gold text-ink" : p == null ? "border-white/[0.05] text-silver/40" : "border-white/12 bg-onyx text-bone hover:border-white/30",
                )}
              >
                <span className="text-[0.78rem] leading-tight">{l.label}</span>
                <span className={cn("text-sm tabular-nums", on ? "font-semibold" : "text-champagne")}>{p == null ? "—" : fmtMoney(p)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RESULT */}
      <div className="relative">
        <div className="sticky top-24 overflow-hidden rounded-[var(--radius-card)] border border-gold/30 bg-onyx">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Img key={style.photo} src={style.photo} alt={`${style.label} at Albertine Couture`} w={1080} h={1350} sizes="(max-width: 1024px) 90vw, 30rem" className="size-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
            {/* length ruler */}
            <div aria-hidden className="absolute right-4 top-4 bottom-4 flex w-8 flex-col items-center">
              <Ruler className="size-4 text-champagne" />
              <div className="relative mt-2 w-px flex-1 bg-white/20">
                <span className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-champagne transition-all duration-700 ease-[var(--ease-lux)]" style={{ height: `${((lenIndex + 1) / LENGTHS.length) * 100}%` }} />
                <span className="absolute left-1/2 size-3 -translate-x-1/2 rounded-full border-2 border-champagne bg-ink transition-all duration-700 ease-[var(--ease-lux)]" style={{ top: `calc(${((lenIndex + 1) / LENGTHS.length) * 100}% - 6px)` }} />
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-silver">
              {size.label} {style.label} · {LENGTHS[lenIndex].label}
            </p>
            <p className="display mt-1 text-[3.6rem] leading-none text-bone" aria-live="polite">
              {size.from && <span className="mr-2 align-top text-base text-silver">from</span>}
              <span className="gold-foil">{fmtMoney(price)}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist/80">{style.blurb}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-silver">
              <li className="flex gap-2">
                <Info className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden /> $20 deposit holds your spot — it comes off this price.
              </li>
              <li className="flex gap-2">
                <Info className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden /> Braiding hair is {style.hairIncluded ? "included" : "not included — ask what to bring"}.
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={bookHref(style.bookId)} className="btn btn-primary">
                <CalendarHeart className="size-4" aria-hidden /> Book this style
              </Link>
              {compact && (
                <Link href="/style-finder" className="btn btn-ghost">
                  All styles <ArrowRight className="size-4" aria-hidden />
                </Link>
              )}
            </div>
            <p className="mt-4 text-[0.72rem] text-silver/80">
              Regular price from the salon’s Vagaro menu (Nov 2026) — Vagaro often shows 10% off. <span className="needs-tag align-middle">to confirm</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
