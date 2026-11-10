# START HERE — Albertine Couture

## 1. Copy the repo out of OneDrive before installing
This folder lives in OneDrive. npm hangs inside OneDrive-synced folders, so **do not run `npm install` here**. Copy the whole folder to a local, non-synced folder first, for example:
`C:\dev\albertine-couture-site`

(You only need this to run it on your laptop. Pushing to GitHub and deploying on Netlify does not need `npm install` at all — Netlify installs and builds it.)

## 2. Run it locally (optional)
```
cd C:\dev\albertine-couture-site
npm install
npm run dev        # http://localhost:3000
```
Demo tour: `/` → tap the style chips under the hero → **Find my exact price** → `/services` → `/book` (pick a salon) → `/portal`.

### Portal demo (for showing the salon)
`/portal` (the **Demo sign-in** button in the header and mobile menu) is a perspective picker + demo sign-in: choose **Client**, **Owner** (Albertine) or **Stylist** (Nicole, Magui, Victoria in Gaithersburg; Dami, Yolande in Dumfries). The demo email and password fill in and the **Guided walkthrough** is on by default — step-by-step cards spotlight each feature and explain what it does now and **what it does when it goes live**.
- The red demo bar has a **Guide** on/off switch and **Switch view**.
- Tour copy: `src/lib/portal/tour.ts`. Spotlight targets are `data-tour="…"` attributes.

## 3. Push to GitHub and deploy on Netlify
From the folder (OneDrive or local — git is fine in either):
```
git init -b main
git add .
git commit -m "Albertine Couture site + booking portal demo"
git remote add origin https://github.com/Azaiah00/albertine-couture-demo.git
git push -u origin main
```
(Create the empty repo `albertine-couture-demo` on GitHub first — no README, no .gitignore; the repo already has one.)

Netlify → **Add new site → Import an existing project** → GitHub → pick the repo → Deploy. `netlify.toml` already pins Node 20 and lets `@netlify/plugin-nextjs` handle output — **do not set a publish directory**.

Then in Netlify → **Site configuration → Change site name** → `albertine-couture-demo`, so the address is **https://albertine-couture-demo.netlify.app** — the same address pinned in `netlify.toml` (`NEXT_PUBLIC_SITE_URL`) that every share preview, canonical tag and the sitemap use. If that name is taken, pick another and change that one line in `netlify.toml` to match, then push again.

After the first deploy: Netlify → **Forms** → turn on email notifications (contact, careers, spin-to-win).

### Link previews (texting the link)
Every page has its own 1200×630 card, so a texted or DM'd link shows a branded image:
| Link | Card |
|---|---|
| `/` and most pages | `public/og.jpg` — Your dream hair awaits — any hour. |
| `/book` | `public/og/book.jpg` |
| `/portal` and portal pages | `public/og/portal.jpg` — One portal. Three views. |
| `/services` | `public/og/menu.jpg` — Every style, priced. |
| `/style-finder` | `public/og/finder.jpg` — Your exact price in three taps. |
| `/services/<slug>` (9 pages) | `public/og/<slug>.jpg` |

To change a card: edit `scripts/make-share-cards.py`, run `python scripts/make-share-cards.py`. iMessage caches a preview the first time a link is sent — text it to yourself once after each deploy.

The demo stays out of Google (noindex) until it's on their real domain.

## 4. Launch on their domain
1. Point their domain (today albertinecouturehairsalondmv.com, on Wix) to Netlify.
2. In `netlify.toml` change `NEXT_PUBLIC_SITE_URL` to the real domain (this also switches Google indexing on).
3. Website before portal? In `src/lib/site.ts` set `BOOKING_MODE = "vagaro"` — every Book button then opens their live Vagaro booking page.
4. Work through **ASSETS-OWED.md** (prices, hours, photos, HD logo, policies, offers).

## 5. Before any handoff
```
npm run build && npm run audit
```
