# Albertine Couture — assets & confirmations still owed by the client

Everything below is missing, conflicting between their own listings, or a **proposal** Couture House made so the demo works. Nothing unconfirmed appears on the site without a visible marker ("to confirm", "owed", "proposed", "Demo").

## 1. Facts to confirm

| Item | What the demo shows | Conflict / question |
|---|---|---|
| Hours | "Open 24/7 · walk-ins 5 AM – 7:30 PM (Dumfries 5:30 AM) · after-hours by appointment +$30" | Google says 24 hours; the website says walk-ins 5:00/5:30 AM–7:30 PM and appointments 8 PM–4:59 AM; Instagram says after-hours 7:35 PM–4:51 AM. One answer for all three, then make Google, Vagaro and Instagram match. |
| Columbia, MD | Not shown | A Vagaro page for Columbia exists with every day "Closed". Open, opening soon, or closed for good? |
| Prices | Regular Vagaro prices (Nov 9 2026) | Vagaro shows a 10% "Daily Deal" on most items. Which price should the site show? Every price is tagged "to confirm". |
| Durations | Estimates | Vagaro doesn't show service times. Confirm per style (the booker and calendar use them). |
| Braiding hair | "Not included unless stated" | Confirm per style, and what clients should bring. |
| Deposit | $20 on paid services, free services no deposit | Confirm amount, refund rule and whether it changes for long styles. |
| Holidays | Closed Thanksgiving, Christmas, New Year's Day, Easter | Confirm for both salons. |
| Stylists per salon | Albertine, Nicole, Magui, Victoria → Gaithersburg · Dami, Yolande → Dumfries | 30+ stylists are listed on Vagaro. Which ones to feature, where each works, and which styles each books (`STAFF_CATEGORIES` in `src/lib/services.ts`). |

## 2. Brand & photos (biggest upgrade available)
- **HD logo** — only a 232 px badge exists online. Send the original file (AI, SVG, PDF or large PNG). If none exists, we can redraw it as a clean vector.
- **Albertine portrait** — for the home "Meet Albertine" block and /about.
- **Team portraits** — the demo shows monogram circles. A short portrait session at each salon fixes this.
- **Storefront / interior** — one exterior and one wide interior photo per salon for the location cards.
- **More work photos** — the gallery has 30 real photos from their site and Instagram. Full-resolution originals (not screenshots with text overlays) would sharpen every page.

## 3. Policies (shown as "to confirm")
- Cancellation, no-show, late arrival and reschedule windows.
- After-hours fee rules (+$30 — per appointment? per hour?).
- Hair-prep requirement (washed, blow-dried, no product — or +$15 wash & blow-dry).
- Kids and guests in the salon.

## 4. Offers & programs (proposals — not agreed yet)
- **Spin for gold** popup prizes: 10% off a braid style, free wash & blow-dry ($15 value), $20 off over $150, after-hours fee waived ($30 value), free take-down, 15% off K-tip / I-tip. Labeled "Demo offers". Albertine picks the real prizes and terms (`src/components/site/SpiralPopup.tsx`).
- **Couture Club** loyalty tiers and perks (`src/lib/portal/db.ts`).
- **Payroll** commission (placeholder 60%) in Studio → Team & payroll.

## 5. Content to approve
- The three **Couture Hair Journal** articles are drafts (`src/lib/journal.ts`).
- Landing-page copy (`src/lib/landing.ts`) — read in Albertine's voice and adjust.
- Review excerpts are real Google reviews, quoted with reviewer names withheld. Confirm she's happy featuring them.

## 6. Accounts & launch
- **Domain** — albertinecouturehairsalondmv.com (Wix). At launch point it to Netlify and set `NEXT_PUBLIC_SITE_URL` in `netlify.toml`.
- **Booking** — demo runs in `BOOKING_MODE = "portal"`. To launch the website before the portal, set `"vagaro"` in `src/lib/site.ts`.
- **Netlify Forms** — contact, careers and spin-to-win. Turn on email notifications after the first deploy.
- **Google Business Profiles** — add the new site URL to both profiles once live.
