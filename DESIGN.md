# DESIGN.md — Albertine Couture Hair Salon

**Direction: "Gold Hour."** Their badge is a gold couture frame with a handwritten crimson script name and a pair of scissors between "Albertine" and "Couture". Their biggest difference is time: both salons are open 24 hours, walk-ins from 5 AM. The site is built from those two ideas — **gold craft** and **the clock that never stops**. Near-black, warm gold, one crimson action color. Restraint, big serif type, one script accent per heading. No pink.

## Color tokens (`src/app/globals.css` → `@theme`)
Sampled from the badge: gold #C9A24D, champagne highlight #E3C77D, crimson script #B5121B.

| Token | Hex | Use |
|---|---|---|
| `ink` | #0B0A08 | page background |
| `onyx` | #14110D | alternate dark sections, footer |
| `graphite` | #1D1913 | cards |
| `smoke` | #2C261C | hairlines |
| `gold` | #C9A24D | line art, large display, chips, decoration |
| `champagne` | #E3C77D | gold **text** on dark, icons |
| `bronze` | #8A6420 | gold text on light |
| `crimson` | #B5121B | primary button fill (white text) |
| `ember` | #CC1A22 | button hover |
| `rouge` | #A50F18 | crimson text on light |
| `silver` | #B5AB97 | muted text on dark |
| `mist` | #E8E1D2 | body text on dark |
| `bone` | #F6F0DE | headings on dark, light sections |
| `paper` | #FFFDF8 | white cards |
| `char` | #1B1712 | text on light |
| `stone` | #5F584C | muted text on light |

Every pair is measured by `npm run audit:contrast` (all pass WCAG AA).

## Type
- **Cormorant Garamond** (variable, self-hosted) — `.display` headings, weight 500. Couture serif to match the badge frame.
- **Jost** — body and UI. Eyebrows: 0.74rem, 0.34em tracking, uppercase.
- **Pinyon Script** — echoes the badge's handwritten name. **One accent word per heading** via `<Accent>` (gold on dark, crimson on light). `display: optional` so a late font never re-wraps a heading.
- Fonts live in `src/app/fonts/` and load through `next/font/local`.

## Layout
`.wrap` max 1240px, 20px gutter (32px ≥768). Sections 96–144px vertical. Cards radius 20px; buttons pill. Tap targets ≥44px. Mobile first; a thumb-zone Book bar appears on phones after the hero.

## Signature motion (all honor `prefers-reduced-motion`)
1. **Hero — "Your dream hair awaits — any hour."** A gold line-art woman whose hair redraws through locs → knotless → silk press → pixie & color, inside a **24-hour gold clock ring**: the whole dial is lit (open 24 hours), a gold light with a fading tail orbits it nonstop every 14 s, a dotted inner track turns slowly the other way, and a hand points at the live Eastern time (green dot during walk-in hours). Visitors can tap a style chip. Autoplay pauses off-screen.
2. **Gold Thread** — a three-strand braid draws itself down the "never closes" timeline as you scroll (GSAP ScrollTrigger scrub).
3. **Gold foil** — the Price Finder price and the final "Albertine Couture" script shimmer with a slow animated gold gradient.
4. **Duotone photos** — real client photos sit in a warm gold duotone and bloom to full color on hover, so mismatched phone photos read as one set.
5. **Reflection** — the final script name has a mirrored reflection.
6. Lenis smooth scroll synced to GSAP; fade/rise reveals; marquee proof bar.

## Photography
Real client work only (`public/media/work-ac`) — from their website and Instagram, never retouched; images with obvious stock origin were removed. Missing items (team portraits, storefronts, Albertine portrait) show a branded **owed** tag.

## Scrollbars
Gold gradient thumb on an onyx track. Never default grey.

## Gamified capture
**Spin for gold** — the agency spin-the-wheel mechanic, re-skinned with the scissors badge at the hub. Exit intent on desktop, 55% scroll on phones, or 35 s. Once per visit. Prizes are proposals (ASSETS-OWED.md).
