export type RequestServiceIntent = "ac-repair" | "heating" | "maintenance" | "commercial" | "emergency";

export type RequestServiceQuery = {
  service?: string;
  emergency?: boolean;
  intent?: RequestServiceIntent;
};

function buildRequestServiceSearch(params: RequestServiceQuery) {
  const search = new URLSearchParams();
  if (params.intent) search.set("intent", params.intent);
  if (params.service) search.set("service", params.service);
  if (params.emergency) search.set("emergency", "true");
  const query = search.toString();
  return query ? "?" + query : "";
}

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
  requestServiceQuery: (params: RequestServiceQuery) => "/request-service" + buildRequestServiceSearch(params),
  financing: "/financing",
  privacy: "/privacy-policy",
  terms: "/terms",
} as const;
