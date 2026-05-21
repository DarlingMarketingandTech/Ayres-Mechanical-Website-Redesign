---
name: cloudinary-image-fixes-2026-05-21
description: Cloudinary audit and image fix implementation — all 7 service cards now use real Ayres photos. Documents what was changed in media.ts and services-content.ts.
metadata:
  type: project
---

# Cloudinary Image Fixes — 2026-05-21

## What Was Done

Audited all 53 assets in the `ayres-mechanical-website/` Cloudinary folder (cloud: `djhqowk67`). Identified 7 real Ayres Mechanical photos to replace placeholder/wrong images. Implemented changes across two files — TypeScript passes clean with zero errors.

**Why:** Design critique confirmed all service card images were wrong/placeholder (icebergs for AC, sand dunes for heating, helicopter for commercial, nothing for maintenance/industrial/emergency). These were visible on the live Vercel site and blocking launch.

**How to apply:** When working on any service page or image slot, verify against `src/content/media.ts` → `pages` object. The `pages.*.hero` slots are the canonical source consumed by `ServiceCards.tsx` via `getServiceContentBySlug()`.

---

## Slot Mapping (before → after)

| Service card | Old `publicId` | New `publicId` | Notes |
|---|---|---|---|
| Air Conditioning | `cold-bg` (icebergs, `temporaryDemo`) | `am-services-HVAC-` | Real Ayres tech photo, 1536×1028 webp |
| Heating | `hot-bg` (sand dunes, `temporaryDemo`) | `am-heating-service` | Real heating job, 960×960 jpg |
| Commercial | `helicopter-industrial-roof-install` | `am-rooftopunit-services` | Real Ayres rooftop unit, 831×500 png |
| Preventive Maintenance | *(no image)* | `heat-am-service` | First image; portrait 720×960, `object-top` crop |
| Industrial | *(no image)* | `industrial-am` | First image; 960×540 jpg |
| 24-Hour Emergency | *(no image)* | `hvac-repair-redding-ca` | First image; portrait 600×800, `object-top` crop |
| Indoor Air Quality | `fresh-air-bg` | `fresh-air-bg` | Unchanged — still `temporaryDemo: true`, needs real photo |

---

## Files Changed

### `src/content/media.ts`
- Added 6 new entries to `assets` const: `amServicesHvac`, `amHeatingService`, `heatAmService`, `amRooftopUnitServices`, `industrialAm`, `emergencyServicePhoto`
- Updated `pages` mapping: AC, heating, commercial now point to real assets; maintenance gets first `hero`; `industrial` and `emergency` are new page slots
- Extended `satisfies` type to include `industrial: { hero }` and `emergency: { hero }`, and updated `maintenance` type from `{ supporting }` to `{ hero; supporting }`

### `src/data/services-content.ts`
- `preventive-maintenance`: added `heroBackground: media.pages.maintenance.hero` + `heroImageClassName: "object-top"`
- `industrial`: added `media: { heroBackground: media.pages.industrial.hero }`
- `24-hour-emergency`: added `media: { heroBackground: media.pages.emergency.hero }` + `heroImageClassName: "object-top"`

---

## Remaining Image Work

- `fresh-air-bg` (Indoor Air Quality) — still a stock photo. Upload real IAQ photo and re-point `pages.indoorAirQuality.hero` in `media.ts`
- Homepage hero card right-side image (dark forest) — blurry at card size, needs higher-res source

## Key Architecture Notes

- `ServiceCards.tsx` reads `page?.media?.heroBackground` via `getServiceContentBySlug(slug)` — so `services-content.ts` is the gatekeeper for which image appears on each card
- `media.ts` is the single source of truth for all Cloudinary `publicId` values — never hardcode public IDs elsewhere
- Portrait images (< 1:1 aspect) in 16:10 card slots need `heroImageClassName: "object-top"` to bias crop toward subject's face/hands rather than feet
