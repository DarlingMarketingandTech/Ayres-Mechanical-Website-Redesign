import type { CloudinaryAssetId } from "@/lib/cloudinary-assets";
import { routes } from "@/lib/routes";

export type ServiceCardIcon =
  | "heating"
  | "cooling"
  | "maintenance"
  | "ductwork"
  | "commercial"
  | "industrial"
  | "emergency";

export type ServiceCardLine = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  accent: "red" | "blue" | "dark";
  icon: ServiceCardIcon;
  imageKey?: CloudinaryAssetId;
};

/** Conversion-focused service lines for grids — routes into pillar pages or request flow. */
export const serviceCardLines: ServiceCardLine[] = [
  {
    id: "ac-repair",
    title: "AC Repair",
    description: "Fast cooling diagnostics and repair when your AC is blowing warm air, short cycling, or not keeping up.",
    ctaLabel: "View AC Repair",
    href: routes.service("air-conditioning"),
    accent: "blue",
    icon: "cooling",
    imageKey: "rheemCentralAirOutdoorUnit",
  },
  {
    id: "ac-installation",
    title: "Air Conditioning Installation",
    description: "Replacement guidance and installation support for dependable central air and cooling upgrades.",
    ctaLabel: "Explore AC Installation",
    href: routes.service("air-conditioning"),
    accent: "blue",
    icon: "cooling",
    imageKey: "rheemCentralAirOutdoorUnit",
  },
  {
    id: "heating",
    title: "Heating Service",
    description: "Furnace and heat pump service for no-heat calls, uneven comfort, and winter reliability across Central Indiana.",
    ctaLabel: "Schedule Heating Service",
    href: routes.service("heating"),
    accent: "red",
    icon: "heating",
    imageKey: "heatPumpEducationalSmall",
  },
  {
    id: "maintenance",
    title: "Maintenance Plans",
    description: "Seasonal tune-ups and planned care to reduce breakdown risk and keep heating and cooling running efficiently.",
    ctaLabel: "Explore Maintenance Plans",
    href: routes.service("maintenance"),
    accent: "blue",
    icon: "maintenance",
  },
  {
    id: "ductwork",
    title: "Ductwork / Airflow",
    description: "Airflow evaluation and duct support when rooms never feel right or your system works harder than it should.",
    ctaLabel: "View Ductwork Service",
    href: routes.service("ductwork"),
    accent: "blue",
    icon: "ductwork",
    imageKey: "ductlessMedium3W7",
  },
  {
    id: "ductless",
    title: "Ductless HVAC",
    description: "Mini-split and ductless comfort solutions for room additions, garages, and spaces without traditional ductwork.",
    ctaLabel: "Request Ductless Service",
    href: routes.requestServiceQuery({ service: "ductless" }) + "#request-service-form",
    accent: "blue",
    icon: "cooling",
    imageKey: "ductlessSmallMhk2Wall",
  },
  {
    id: "commercial",
    title: "Commercial HVAC",
    description: "Business heating and cooling service built around comfort, uptime, and practical maintenance scheduling.",
    ctaLabel: "Request Commercial HVAC Service",
    href: routes.service("commercial-hvac"),
    accent: "dark",
    icon: "commercial",
    imageKey: "ductlessMediumGxMancave",
  },
  {
    id: "industrial",
    title: "Industrial HVAC",
    description: "Facility HVAC support for demanding environments that need reliable climate systems and responsive service.",
    ctaLabel: "Request Industrial HVAC Service",
    href: routes.service("industrial-hvac"),
    accent: "dark",
    icon: "industrial",
  },
  {
    id: "emergency",
    title: "Emergency Service",
    description: "24-hour heating and cooling response when comfort, safety, or operations cannot wait.",
    ctaLabel: "Get Emergency Help",
    href: routes.service("emergency-service"),
    accent: "red",
    icon: "emergency",
  },
];
