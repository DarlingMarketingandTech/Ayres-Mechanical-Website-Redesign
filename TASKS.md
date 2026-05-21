# Ayres Mechanical Website — Task List

_Last updated: 2026-05-21 (session 3)_

---

## ✅ Completed

- [x] Customize Cloudinary plugin for Ayres Mechanical project (cloud: djhqowk67, next-cloudinary stack, brand colors, named transform patterns)
- [x] Customize voltagent `frontend-developer` agent for Ayres Mechanical stack (Next.js 16, React 19, Tailwind v4, motion, shadcn/ui)
- [x] Fix About page — replace `PlaceholderPanel` in "What Our Customers Say" with real `Testimonials` component
- [x] **Design critique** — full near-final review of live Vercel site at 390px mobile + 1440px desktop; findings saved to `memory/design-critique-2026-05-21.md`
- [x] **Cloudinary audit** — catalogued all 53 assets in `ayres-mechanical-website/` folder; identified 7 real Ayres photos to replace placeholder images
- [x] **Wire up real Cloudinary images in `media.ts`** — added 6 new asset entries (`amServicesHvac`, `amHeatingService`, `heatAmService`, `amRooftopUnitServices`, `industrialAm`, `emergencyServicePhoto`); updated `pages` mapping to use real photos; extended `satisfies` type to include `industrial` and `emergency` page slots
- [x] **Wire up `heroBackground` in `services-content.ts`** — added `heroBackground` to `preventive-maintenance`, `industrial`, and `24-hour-emergency` service entries (all 7 service cards now have real images)
- [x] **Cloudinary asset cleanup (session 3)** — applied renamed/moved assets to `media.ts`:
  - `am-services-HVAC-` → renamed in Cloudinary to `ac-service-outdoor-hvac-system` (AC hero, 1536×1028 webp); `media.ts` `amServicesHvac` publicId, alt, and usageNotes updated.
  - `FTL-Logo-1024x314` moved from `10-financing` → `ayres-mechanical-website/02-pages/financing`; `assetFolder` updated in `media.ts`.
  - `pexels-katterinaaa-61454609-8065903` moved from `03-services/commercial-hvac` → `ayres-mechanical-website/90-temporary-stock/approved-for-demo`; `assetFolder` updated in `media.ts`.
  - `hvac-repair-redding-ca` moved to `90-temporary-stock/license-or-source-review` in Cloudinary; marked `temporaryDemo: true` in `media.ts`, removed from `pages.emergency.hero`.
  - Emergency card hero now uses `ac-service-outdoor-hvac-system` as a temporary fallback (same real Ayres image as AC hero). `heroImageClassName` updated to `object-[center_30%]` for landscape crop. Replace with an approved emergency photo before launch.

---

## 🔴 Active

### Owner info needed from client (Brian Ayres / Sabra Evanoff)

- [ ] **Confirm public email address** — `siteConfig.email` is currently `null`; Contact page shows "Pending owner confirmation." Decide whether to display an email or omit.
- [ ] **Confirm production domain** — `NEXT_PUBLIC_SITE_URL` not set; canonical URLs and OG tags fall back to `localhost`. Must be set before launch.
- [ ] **Confirm public mailing/office address** — `siteConfig.address` is `null`; needed for LocalBusiness schema and footer.
- [ ] **Confirm standard office hours** — `siteConfig.hours.standard` is `null`; needed for schema and contact page.
- [ ] **Confirm license / certification wording** — `siteConfig.credentials` is empty array; credential copy needs owner approval before adding claims.
- [ ] **Confirm Mitsubishi Diamond Contractor badge** — `temporaryDemo: true` on ductless partner badge; confirm credential status before removing flag.

### Image assets

> Design critique (2026-05-21): Service card image fixes completed in code — real Ayres photos now wired up in `media.ts` and `services-content.ts`. Deploy to Vercel to go live.

- [x] **AC hero** — replaced `cold-bg` (icebergs) with `ac-service-outdoor-hvac-system` (real Ayres outdoor HVAC photo; renamed from `am-services-HVAC-` in Cloudinary cleanup). `temporaryDemo` flag removed from slot.
- [x] **Heating hero** — replaced `hot-bg` (sand dunes) with `am-heating-service` (real heating service photo).
- [x] **Commercial hero** — replaced `helicopter-industrial-roof-install` with `am-rooftopunit-services` (real Ayres rooftop unit photo).
- [x] **Preventive Maintenance card** — added first-ever image: `heat-am-service` (technician on service call). `object-top` crop bias set to favor face/hands.
- [x] **Industrial card** — added first-ever image: `industrial-am`.
- [x] **24-Hour Emergency card** — ~~`hvac-repair-redding-ca`~~ removed (license/source review — references Redding, CA). Now uses `ac-service-outdoor-hvac-system` as a temporary fallback. `object-[center_30%]` crop set for landscape.
- [ ] **Replace `fresh-air-bg` (Indoor Air Quality hero)** — still a stock photo (`temporaryDemo: true`). Upload a real IAQ photo to Cloudinary and re-point `pages.indoorAirQuality.hero` in `media.ts`.
- [ ] **Replace emergency card hero** — `hvac-repair-redding-ca` is in license/source review (Redding, CA reference). Currently showing `ac-service-outdoor-hvac-system` as temp fallback. Upload a real Ayres emergency/service-call photo to `ayres-mechanical-website/03-services/emergency-service`, register in `media.ts`, and re-point `media.pages.emergency.hero`.
- [ ] **Improve hero card image resolution** — dark forest image on right side of homepage hero is visibly blurry at card size. Re-upload higher-res source or verify `q_auto,f_auto` is being applied.

### Development

- [ ] **Wire up social links** — `siteConfig.socials` is an empty array. Add Facebook / Google Business Profile URLs once confirmed with client.
- [x] **Google / Facebook review badges on Reviews page** — `ReviewPlatformBadges` component added; placeholder URLs in `src/content/testimonials.ts` → replace `REPLACE_WITH_PLACE_ID` with the real Google Place ID and update both `profileUrl` / `writeReviewUrl` for Facebook once client confirms their page URL.
- [ ] **SEO: set `NEXT_PUBLIC_SITE_URL` in production env** — canonical URLs are currently `http://localhost:3000/*` in all generated metadata. Must be set at Cloudflare Pages / Vercel before launch.

### UX / Conversion — from design critique 2026-05-21

- [ ] **Mobile: make Call Now button full-width or dominant primary** — currently same size as Request Service on mobile. Click-to-call is the #1 conversion action for local HVAC on mobile.
- [ ] **Mobile: make phone number in hero subhead a `tel:` link** — `317-538-9837` in paragraph text is plain text, not a clickable link on mobile.
- [ ] **Hero: add 4.9★ trust signal above the fold** — star rating is buried below fold; add a badge ("Rated 4.9 by 13 Central Indiana customers") near the hero subhead.
- [ ] **Hero: add trust bar below CTAs** — large whitespace gap between CTAs and emergency banner; fill with Rheem/Mitsubishi partner badges and certifications.
- [ ] **Hamburger menu: increase tap target to 44×44px** — current tap area is ~24px, below WCAG 2.1 minimum.
- [ ] **Service card icons: add `aria-label` attributes** — snowflake, flame, wrench icons are icon-only with no accessible label.
- [ ] **Verify contrast on red eyebrow label** — "HEATING & AIR CONDITIONING SPECIALISTS" in spaced caps; light reds at small size may fail WCAG AA contrast ratio.
- [ ] **Review card scroll affordance on mobile** — cards overflow slightly but swipeability is not obvious; add scroll indicator or stronger peek treatment.

---

## 🟡 Someday / Stretch

- [ ] **Increase testimonial count** — `reviewSummary.count` is hardcoded at 13. If more reviews come in, update `testimonials.ts` and the count.
- [ ] **Named Cloudinary transformations** — No named transforms in use yet. `t_ayres_hero`, `t_ayres_card`, and `bl_ayres_logo_transparent` (baseline for background removal) would reduce delivery costs on high-traffic pages.
- [ ] **Add social media profile links** — Once socials confirmed, add Open Graph author tags and footer links.

---

## 📋 Project Context

- **Repo:** `C:\dev\Ayres-Mechanical-Website-Redesign`
- **Stack:** Next.js 16 / React 19 / Tailwind CSS v4 / motion v12 / next-cloudinary v6
- **Cloud:** Cloudinary cloud name `djhqowk67`
- **Client:** Brian Ayres + Sabra Evanoff (Ayres Mechanical Inc., Central Indiana)
- **Built by:** Darling Marketing & Technology LLC (Jacob Darling)
- **Hosting target:** Cloudflare Pages (preview active)
- **Status:** Pre-launch — core pages built, awaiting client info + real photo assets
