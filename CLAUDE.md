# CLAUDE.md — working in this repo

Albertine Couture Hair Salon (Gaithersburg, MD + Dumfries, VA) — one marketing site for both salons + demo booking portal (client side, owner studio, stylist studio). Built by Couture House Co.

## Stack
Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS v4 (CSS-first `@theme` in `src/app/globals.css`) · GSAP + ScrollTrigger · Lenis · Framer Motion (portal only) · Lucide icons. Fonts self-hosted via `next/font/local` (Cormorant Garamond, Jost, Pinyon Script).

## Commands
```
npm install
npm run dev            # http://localhost:3000
npm run build          # must pass with zero errors
npm run lint           # ESLint 9 flat config — must be clean
npm run typecheck
npm run audit:contrast # token contrast pairs (WCAG AA)
npm run audit:flow     # run AFTER build: titles, descriptions, one H1, alts, both phones + address, emoji, placeholders, links, every services.ts price visible on /services, no leftover details from other clients
npm run audit          # lint + typecheck + contrast + flow
```

## Map
- `src/app/(site)/*` — public site: home, services, services/[slug] (9 landing pages), style-finder, team, gallery, about, visit, careers, journal, journal/[slug].
- `src/app/(portal)/book` — 5-step booker (salon → service → extras → stylist → time → details). `/portal` demo sign-in → `/portal/client` or `/portal/studio/*` (owner sees both salons; stylists see only their own book).
- `src/lib/site.ts` — verified facts for both `LOCATIONS` ("md" | "va"), hours, policies (`GOOD_TO_KNOW`), `BOOKING_MODE` switch ("portal" | "vagaro").
- `src/lib/services.ts` — headline menu (125 items; `vagaro` = exact Vagaro name, regular price). `src/lib/finder.ts` — the full size × length price grids behind the Price Finder.
- `src/lib/content.ts` — real Google review excerpts, team, real work photos, FAQ. `landing.ts` — landing copy. `journal.ts` — article drafts.
- `src/lib/portal/db.ts` — **the only data layer for the portal** (in-memory demo store, fictional clients).
- `public/media/work-ac/` — real salon photos (webp + -640 variants). `public/media/brand/badge.png` — their logo (low-res until the HD file arrives). `public/media/hero/lines.json` — hero line art. `public/media/art/*.svg` — category line art.
- `scripts/make-share-cards.py` — regenerates every 1200×630 link-preview card (`public/og.jpg`, `public/og/*.jpg`).

## Rules
- Follow DESIGN.md: only `@theme` tokens; `.display` headings; one `<Accent>` script word per heading; `champagne` for gold text on dark, `rouge` for crimson text on light, `crimson` for buttons, `gold` never for small text. No pink.
- Never invent business facts. Prices/hours change only in `src/lib/*.ts`. Anything unconfirmed goes in ASSETS-OWED.md with a visible `needs-tag` on the page.
- Portal UI goes through `lib/portal/db.ts`. `useDB(selector)` must return existing state slices (derive with `useMemo`). No `Date.now()` in render — use `useNow()`.
- Keep the demo honest: "Demo" labels on sign-in, payments, rewards, offers. No real card fields.
- Every animation honors `prefers-reduced-motion`.
- Never install node_modules inside a OneDrive-synced folder (npm hangs). Copy the repo to a local folder first.
- Going live: replace `db.ts` internals with Supabase (`// TODO: Supabase`), `demoCharge()` with Stripe (`// TODO: Stripe`), add real auth. The UI does not change.
