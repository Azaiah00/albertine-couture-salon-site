# QA report — Albertine Couture (2026-11-09)

Post-build audit (website-build-playbook). Production build (`next build`) served with `next start`.

| Check | Result |
|---|---|
| `npm run build` | Pass — 0 errors, 35 static pages |
| `npm run lint` | Pass — clean |
| `npm run typecheck` | Pass — clean |
| `npm run audit:contrast` | Pass — every token pair meets WCAG AA |
| `npm run audit:flow` | Pass — 31 pages: title, description 70–165 chars, exactly one H1, every `<img>` has alt, both phones + Gaithersburg address on every public page, canonical, no emoji, no lorem/TODO/undefined/NaN, no broken internal links, all 125 menu prices visible on /services, no leftover details from another client. One warning: a journal title is 75 chars. |
| Console errors / page errors (11 key pages × 375 and 1440 px) | None |
| Horizontal overflow at 375 and 1440 px | None |
| Images | All load (none broken) after scroll at 375 and 1440 px |
| Header at 375 / 768 / 1024 / 1280 / 1440 px | Fits on one line at every width (nav labels no longer wrap) |
| Link-preview cards | 14 cards regenerated and reviewed |
| `prefers-reduced-motion` | Hero renders static; animations off |

Not run this pass (run after deploy): Lighthouse on the live Netlify URL, axe-core sweep, full Playwright booking click-through on the deployed site.

## Still needs the client's real assets
See ASSETS-OWED.md: confirmed prices and hours, HD logo, Albertine and team portraits, storefront photos, policies, real offers.
