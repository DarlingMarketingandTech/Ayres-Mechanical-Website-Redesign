---
name: design-critique-2026-05-21
description: Homepage near-final design critique — hero, mobile layout, Cloudinary service card images. Reviewed on live Vercel preview at 390px (iPhone 14) and 1440px desktop.
metadata:
  type: project
---

# Design Critique — 2026-05-21

Reviewed live site: https://ayres-mechanical-website-redesign.vercel.app/
Viewports tested: 1440px desktop, 390px mobile (iPhone 14 simulation)

## Cloudinary Images — Critical (all wrong)

Every service card in the Services section is using incorrect/placeholder Cloudinary stock photos. These must be replaced before launch.

| Service | Current image | Required |
|---|---|---|
| Air Conditioning (`cold-bg`) | Arctic icebergs | Real AC unit / technician photo |
| Heating (`hot-bg`) | Saharan sand dunes | Real furnace / heat pump photo |
| Commercial HVAC | Construction helicopter | Rooftop unit / commercial install photo |
| Preventive Maintenance | No image (missing) | Technician / maintenance photo |

The hero card right-side image (dark forest at dusk) is acceptable atmospherically but renders blurry at card size — needs a higher-res source asset or `q_auto,f_auto` Cloudinary transformation.

**Why:** These are already tracked in TASKS.md as `cold-bg`, `hot-bg`, `fresh-air-bg`, and `commercial-rooftop-hvac-stock-photo` — but this critique confirmed they are actively wrong/visible on the live site, not just missing placeholders. Priority has been elevated to pre-launch blocker.

**How to apply:** When working on any service page or image-related task, verify the Cloudinary `public_id` mapping in `src/content/media.ts` against actual Cloudinary library contents before marking as done.

## Hero — Desktop

- Structure and hierarchy are strong: eyebrow → headline → subhead → dual CTA
- Large whitespace gap below CTAs before emergency banner — needs a trust bar (Rheem/Mitsubishi badges, certifications)
- 4.9★ rating is buried below the fold — should surface in hero as a trust signal
- Hero card right-side text ("24-hour service with a clear path from call to comfort") is redundant with hero headline — should differentiate with a stat or customer quote

## Mobile — Key Issues

- **Call Now button not full-width on mobile** — it is equal size to Request Service but should be the dominant primary action on mobile. Local HVAC callers are highest-intent visitors.
- **Phone number in subhead paragraph is not a `tel:` link on mobile** — missed click-to-call opportunity
- **Service card images dominate the mobile viewport** — the wrong images appear before service labels, making the bad images even more damaging on mobile than desktop
- **Hamburger tap target is ~24px** — needs 44×44px minimum padding per WCAG 2.1
- **Review card scroll affordance unclear** — cards overflow slightly but are not obviously swipeable; needs scroll indicator or peek treatment

## Accessibility Notes

- Red eyebrow label ("HEATING & AIR CONDITIONING SPECIALISTS") in spaced caps — verify contrast ratio; light reds at small sizes can fail AA
- Emergency banner (white on red) — borderline contrast, may need the red darkened slightly
- Service card icon-only buttons (snowflake, flame, wrench) need `aria-label` attributes

## What Is Working Well

- Sticky nav with always-visible phone number + Emergency 24/7 button is best-in-class for local service
- 4.9★ breakdown card with bar chart is specific and credible
- Service area county grid with "no travel charges" is a strong conversion line
- Emergency CTA red card is well-timed in the scroll flow
- Footer phone number treatment is large and scannable on mobile
