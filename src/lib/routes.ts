export type RequestServiceIntent = "ac-repair" | "heating" | "maintenance" | "commercial" | "emergency";

export const routes = {
  home: "/",
  services: "/services",
  service: (slug: string) => "/services/" + slug,
  industries: "/industries",
  industry: (slug: string) => "/industries/" + slug,
  serviceArea: "/service-area",
  location: (slug: string) => "/service-area/" + slug,
  about: "/about",
  reviews: "/reviews",
  contact: "/contact",
  requestService: "/request-service",
  requestServiceIntent: (intent: RequestServiceIntent) =>
    "/request-service?intent=" + encodeURIComponent(intent),
  financing: "/financing",
  privacy: "/privacy-policy",
  terms: "/terms",
} as const;
