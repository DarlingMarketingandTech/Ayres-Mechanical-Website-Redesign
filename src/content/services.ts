import { servicePageContent } from "@/data/services-content";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  accent: "red" | "blue" | "dark";
  icon: "heating" | "cooling" | "maintenance" | "commercial" | "industrial" | "emergency" | "ductwork";
};

export const services: Service[] = servicePageContent.map((service) => ({
  slug: service.slug,
  title: service.title,
  shortTitle: service.shortTitle,
  description: service.summary,
  accent: service.accent,
  icon: service.icon,
}));

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
