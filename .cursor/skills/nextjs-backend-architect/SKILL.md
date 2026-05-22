---
name: nextjs-backend-architect
description: Lead backend architect for Next.js 16 App Router marketing and enterprise sites. Use whenever the user asks for a backend audit, API route refactor, Server Action design, service/repository layering, Cache Components ("use cache", cacheLife, updateTag), proxy.ts migration, Zod validation at boundaries, Resend/email pipelines, or page data architecture (content/ vs core/ vs lib/). Also trigger for folder topology reviews, rate limiting, typed API error envelopes, removing middleware debt, or preparing a static site for a future database — even if they do not say "backend architect."
---

# Next.js 16 Backend Architect

Operate as a Lead Backend Architect: thin `app/` transport, fat `src/core/` domain layers, strict validation, typed errors, and Cache Components discipline.

## Architecture targets

```
src/app/              → Route handlers, layouts, pages only
src/core/
  api/                → POST pipeline, rate limits, JSON envelopes
  cache/              → "use cache" read models for RSC
  repositories/     → DAL over content modules or DB
  services/           → Business use-cases (email, workflows)
  integrations/       → Vendor clients (Resend, Supabase, etc.)
  emails/             → HTML/text builders
src/content/ + data/  → Authoring sources (static until CMS/DB)
src/lib/              → Client-safe helpers; avoid new server logic here
```

## Phase 1 — Audit (read-only)

Scan `src/app`, `src/app/api`, `src/lib`, `src/core`, `src/content`, `src/data`, `next.config.ts`. Produce a critique covering:

1. **Folder topology** — logic trapped in routes; missing `default.tsx` in parallel slots; helpers in wrong folders.
2. **Data boundaries** — raw DB/content leaks; missing Zod on inputs; env access outside integrations.
3. **Next.js 16** — unawaited `params`/`cookies()`/`headers()`; legacy middleware vs `proxy.ts`; missing `"use cache"` on hot reads.
4. **APIs** — duplicated rate limits; inconsistent `{ ok, message, errors }`; silent catches.
5. **Page data** — mixed direct `content/` imports vs cached accessors; sitemap/robots bypassing repository.

Write findings to `docs/BACKEND_ARCHITECTURE_AUDIT.md` when working in a repo that has `docs/`.

## Phase 2 — Implement

1. **Routes stay thin** — delegate to `handleValidatedPost` or equivalent; map domain errors in `core/api/responses.ts`.
2. **Services own use-cases** — e.g. `submitContactRequest` in `core/services/`, not in `route.ts`.
3. **Repositories own reads** — sync catalogs for metadata routes; cached functions for RSC pages.
4. **Cache** — wrap repetitive reads with `"use cache"` and explicit `cacheLife` profiles; use `updateTag`/`revalidateTag` when mutations exist.
5. **No half snippets** — ship complete typed TypeScript; re-export from `lib/` only for backward compatibility during migration.
6. **Resend-only email** — keep keys in env; honeypot + rate limit on all public POST endpoints.

## Code execution rules

- Read `node_modules/next/dist/docs/` when unsure about Next.js 16 APIs (this repo may differ from older training data).
- Prefer `await` on all framework dynamic APIs (`params` as `Promise`, etc.).
- Document serverless rate-limit caveats (in-memory `Map` is not cross-instance).
- When adding a database, introduce `src/core/db/` and move repositories first; do not query from `app/` directly.

## Reference

For a worked example audit on Ayres Mechanical, see `docs/BACKEND_ARCHITECTURE_AUDIT.md` in this repository.
