import { servicePageContent } from "@/data/services-content";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  accent: "red" | "blue" | "dark";
  icon: "heating" | "cooling" | "maintenance" | "commercial" | "industrial" | "emergency" | "ductwork";
};

const preferredOrder = [
  "air-conditioning",
  "heating",
  "ductless-mini-splits",
  "indoor-air-quality",
  "seasonal-tune-ups",
  "commercial",
  "industrial",
  "24-hour-emergency",
];

export const services: Service[] = (() => {
  const mapped = servicePageContent.map((service) => ({
    slug: service.slug,
    title: service.title,
    shortTitle: service.shortTitle,
    description: service.summary,
    accent: service.accent,
    icon: service.icon,
  }));
  const ordered = preferredOrder
    .map((slug) => mapped.find((s) => s.slug === slug))
    .filter((s): s is Service => s !== undefined);
  const remaining = mapped.filter((s) => !preferredOrder.includes(s.slug));
  return [...ordered, ...remaining];
})();

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
