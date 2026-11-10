import { Camera, Star } from "lucide-react";
import { cn } from "@/lib/cn";

/** The logo's scissors (between "Albertine" and "Couture"), as a small inline glyph. */
export function SpiralGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="7.5" cy="17" r="2.6" />
      <circle cx="16.5" cy="17" r="2.6" />
      <path d="M9.4 15.2 16.8 3.8M14.6 15.2 7.2 3.8" />
    </svg>
  );
}

export function Eyebrow({ children, className, tone = "dark" }: { children: React.ReactNode; className?: string; tone?: "dark" | "light" }) {
  return (
    <p className={cn("eyebrow flex items-center gap-2", tone === "dark" ? "text-silver" : "text-stone", className)}>
      <SpiralGlyph className={cn("size-4 shrink-0", tone === "dark" ? "text-gold" : "text-rouge")} />
      {children}
    </p>
  );
}

/** One accent word per heading, in a script echoing the logo's "Albertine Couture", champagne gold. */
export function Accent({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return <em className={cn("script not-italic pr-1 text-[1.18em] leading-[0.7]", tone === "dark" ? "text-champagne" : "text-rouge")}>{children}</em>;
}

export function SectionTitle({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  id,
  as: As = "h2",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("reveal max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow tone={tone} className={cn(align === "center" && "justify-center")}>
        {eyebrow}
      </Eyebrow>
      <As id={id} className={cn("display mt-4 text-[clamp(2.3rem,5.6vw,4.3rem)]", tone === "dark" ? "text-bone" : "text-char")}>
        {title}
      </As>
      {intro && <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-mist/85" : "text-stone")}>{intro}</p>}
    </div>
  );
}

/** Responsive real photo: `src` is the path without extension; -640 variant for small screens. */
export function Img({
  src,
  alt,
  w,
  h,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  small = 640,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  small?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${src}.webp`}
      srcSet={`${src}-${small}.webp ${small}w, ${src}.webp ${w}w`}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}

/** Branded stand-in where the salon still owes a real photo. Never ships silently. */
export function PhotoSlot({ label, className, art }: { label: string; className?: string; art?: string }) {
  return (
    <div className={cn("relative grid place-items-center overflow-hidden rounded-[var(--radius-card)] border border-dashed border-champagne/50 bg-onyx", className)}>
      {art && (
        // eslint-disable-next-line @next/next/no-img-element
        <img width={600} height={800} src={art} alt="" aria-hidden className="absolute inset-0 m-auto h-[82%] w-auto opacity-35" loading="lazy" />
      )}
      <div className="relative flex flex-col items-center gap-2 p-4 text-center">
        <Camera className="size-5 text-champagne" aria-hidden />
        <span className="needs-tag">Needs real photo</span>
        <span className="text-xs text-silver">{label}</span>
      </div>
    </div>
  );
}

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex text-champagne", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  art,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  art?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-ink pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div aria-hidden className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-gold/10 blur-3xl" />
      {art && (
        // eslint-disable-next-line @next/next/no-img-element
        <img width={600} height={800} src={art} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute -bottom-6 right-[-6%] hidden h-[115%] w-auto opacity-55 md:block lg:right-[4%]" />
      )}
      <div className="wrap relative">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display mt-4 text-[clamp(2.7rem,7vw,5.2rem)] text-bone">{title}</h1>
          {intro && <p className="mt-5 max-w-xl text-base leading-relaxed text-mist/85 sm:text-lg">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
