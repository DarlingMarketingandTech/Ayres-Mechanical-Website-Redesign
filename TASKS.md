# Ayres Mechanical Website — Task List

_Last updated: 2026-05-17_

---

## ✅ Completed

- [x] Customize Cloudinary plugin for Ayres Mechanical project (cloud: djhqowk67, next-cloudinary stack, brand colors, named transform patterns)
- [x] Customize voltagent `frontend-developer` agent for Ayres Mechanical stack (Next.js 16, React 19, Tailwind v4, motion, shadcn/ui)
- [x] Fix About page — replace `PlaceholderPanel` in "What Our Customers Say" with real `Testimonials` component

---

## 🔴 Active

### Owner info needed from client (Brian Ayres / Sabra Evanoff)

- [ ] **Confirm public email address** — `siteConfig.email` is currently `null`; Contact page shows "Pending owner confirmation." Decide whether to display an email or omit.
- [ ] **Confirm production domain** — `NEXT_PUBLIC_SITE_URL` not set; canonical URLs and OG tags fall back to `localhost`. Must be set before launch.
- [ ] **Confirm public mailing/office address** — `siteConfig.address` is `null`; needed for LocalBusiness schema and footer.
- [ ] **Confirm standard office hours** — `siteConfig.hours.standard` is `null`; needed for schema and contact page.
- [ ] **Confirm license / certification wording** — `siteConfig.credentials` is empty array; credential copy needs owner approval before adding claims.
- [ ] **Confirm Mitsubishi Diamond Contractor badge** — `temporaryDemo: true` on ductless partner badge; confirm credential status before removing flag.

### Image assets — awaiting client photos

- [ ] **Replace `cold-bg` (AC hero)** — currently a demo stock photo. Upload real asset to `ayres-mechanical-website/01-global-ui/hero-backgrounds` as `cold-bg.jpg`, remove `temporaryDemo: true`.
- [ ] **Replace `hot-bg` (Heating hero)** — currently a demo stock photo. Same folder, public ID `hot-bg.jpg`.
- [ ] **Replace `fresh-air-bg` (Indoor Air Quality hero)** — demo stock photo. Same folder, public ID `fresh-air-bg.jpg`.
- [ ] **Upload / rename commercial rooftop photo** — intended public ID `commercial-rooftop-hvac-stock-photo` doesn't exist in Cloudinary yet; currently pointing at a pexels stock photo. Upload real asset or rename in Cloudinary, then update `media.ts`.

### Development

- [ ] **Wire up social links** — `siteConfig.socials` is an empty array. Add Facebook / Google Business Profile URLs once confirmed with client.
- [x] **Google / Facebook review badges on Reviews page** — `ReviewPlatformBadges` component added; placeholder URLs in `src/content/testimonials.ts` → replace `REPLACE_WITH_PLACE_ID` with the real Google Place ID and update both `profileUrl` / `writeReviewUrl` for Facebook once client confirms their page URL.
- [ ] **SEO: set `NEXT_PUBLIC_SITE_URL` in production env** — canonical URLs are currently `http://localhost:3000/*` in all generated metadata. Must be set at Cloudflare Pages / Vercel before launch.

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
