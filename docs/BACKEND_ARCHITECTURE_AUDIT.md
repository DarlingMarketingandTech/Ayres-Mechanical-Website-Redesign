# Backend & Page Data Architecture Audit

**Project:** Ayres Mechanical Website Redesign  
**Stack:** Next.js 16.2.6, React 19, Zod 4, Resend (no database)  
**Date:** 2026-05-22

## Executive summary

This site is a **marketing RSC app** with static content modules and three POST Route Handlers (contact, diagnostic, commercial lead). There is no ORM or external datastore yet. The main backend risks were **inconsistent API pipelines**, **duplicated rate limiting**, and **split page-data access** (some pages cached, many components importing `content/` directly).

Phase 2 introduced `src/core/` with service, repository, cache, and API layers while keeping `src/content/` and `src/data/` as authoring sources.

---

## 1. Folder topology

### Before

| Layer | Location | Issue |
|-------|----------|-------|
| Routes | `src/app/(site)/*`, `src/app/api/*` | Appropriate thin pages; APIs mixed transport + delivery |
| Business logic | `src/lib/*-submission.ts` | Named like utilities, not services |
| Content sources | `src/content/`, `src/data/` | Correct as static “source of truth” |
| Cached reads | `src/lib/static-content-cache.ts` | Cache boundary lived under `lib/` |
| Shared infra | `src/lib/rate-limit`, `validators`, `resend-config` | OK but not grouped |

### After (target layout)

```
src/
├── app/                    # Transport only (pages + route handlers)
├── core/
│   ├── api/                # Rate limit, JSON responses, POST pipeline
│   ├── cache/              # "use cache" accessors for RSC
│   ├── repositories/       # Sync read boundary over content/data
│   ├── services/           # Resend submission use-cases
│   ├── integrations/       # Resend config
│   └── emails/             # HTML builders
├── content/                # Authoring modules (keep)
├── data/                   # Heavy structured page copy (keep)
├── lib/                    # Client-safe + deprecated re-exports
└── components/             # UI (may import content types/media)
```

### Gaps (future)

- No `proxy.ts` — add when edge auth, geo, or bot filtering is required.
- No Server Actions — acceptable while forms use Route Handlers.
- No `src/core/db/` — add when Supabase/Postgres lands; repositories become real DAL.

---

## 2. Data leakage & boundaries

| Surface | Assessment |
|---------|------------|
| APIs | Zod validation on all POST bodies; honeypot fields return benign 200 |
| Errors | Typed `*UnavailableError` → 503; upstream Resend failures → 502 |
| Content | No secrets in `content/`; env only in `core/integrations/resend-config` |
| Client components | Import presentation data from `content/` — acceptable for static marketing |

**Recommendation:** New server pages should use `@/core/cache/static-content` (or repository for sync metadata). Client components can keep type-only imports from `content/`.

---

## 3. Framework modernization

| Check | Status |
|-------|--------|
| `cacheComponents: true` in `next.config.ts` | ✅ |
| `"use cache"` + `cacheLife` for static catalogs | ✅ (`core/cache/static-content.ts`) |
| `await params` on dynamic routes | ✅ `[slug]`, `[city]` |
| Legacy `middleware.ts` | None (not needed today) |
| In-memory rate limit on serverless | ⚠️ Documented limitation; upgrade to KV/Redis when traffic grows |

---

## 4. API route findings (resolved)

1. **Duplicated rate limiter** in `send-diagnostic/route.ts` — removed; all routes use `core/api/rate-limit`.
2. **Inconsistent error envelopes** — unified via `handleValidatedPost` + `jsonFromSubmissionError`.
3. **Diagnostic route owned Resend** — moved to `core/services/diagnostic-submission`.

---

## 5. Page data architecture

### Patterns

| Consumer | Pattern |
|----------|---------|
| Dynamic RSC pages (`services/[slug]`, `service-area/[city]`, industries) | Cached getters |
| `sitemap.ts`, `robots.ts` | Repository sync reads |
| Layout chrome, marketing sections | Direct `content/` imports (static, bundled) |

### `content/` vs `data/`

- **`content/`** — site config, navigation, media registry, locations, industries, FAQs.
- **`data/services-content.ts`** — large per-service page payloads; keep separate for bundle splitting.

### Follow-ups (optional)

- Migrate `app/(site)/page.tsx` to `getCachedHomeFaqs()` / `getCachedMedia()`.
- Add `getCachedFinancingCopy()` if financing page becomes hot path.
- When adding CMS/DB, repositories swap implementation; cache layer adds `cacheTag` invalidation.

---

## 6. Security & Resend

- Env: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`.
- Commercial overrides: `COMMERCIAL_LEAD_FROM_EMAIL`, `COMMERCIAL_LEAD_TO_EMAIL`.
- Honeypot field `website` on all public forms.
- Rate limit: 5 requests / 5 minutes / client key (IP + UA prefix).

---

## 7. Performance notes

- Static content cached with `cacheLife("max")` minimizes RSC repeat work.
- No connection pooling concerns until a database is added.
- Consider Vercel Runtime Cache or Upstash for distributed rate limits pre-launch if expecting burst traffic.
