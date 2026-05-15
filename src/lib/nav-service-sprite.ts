import { routes } from "@/lib/routes";

const servicesBase = routes.services;

/** Service listing href → slug (e.g. `/services/heating` → `heating`). */
export function getServiceSlugFromHref(href: string): string | null {
  if (!href.startsWith(`${servicesBase}/`)) {
    return null;
  }
  const slug = href.slice(servicesBase.length + 1);
  return slug.length > 0 ? slug : null;
}
