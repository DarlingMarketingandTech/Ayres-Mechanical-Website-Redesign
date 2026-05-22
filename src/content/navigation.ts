import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Building,
  Building2,
  Calendar,
  CalendarCheck,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  Factory,
  Flame,
  Home,
  Leaf,
  Phone,
  Scale,
  TrendingUp,
  Wind,
  Zap,
} from "lucide-react";

import { serviceSlugs } from "@/data/services-content";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { navigationLaneDefinitions } from "@/lib/site-policy";
import { services, type Service } from "./services";

export type NavigationChild = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  /** "cta" renders with a highlighted brand-ice background to draw attention. */
  variant?: "default" | "cta";
};

export type MegaMenuColumn = {
  heading: string;
  items: NavigationChild[];
};

export type MegaMenuGroup = {
  label: string;
  href: string;
  description: string;
  columns: MegaMenuColumn[];
};

function serviceLink(slug: Service["slug"]): NavigationChild {
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    throw new Error(`serviceLink() could not find a service navigation entry for slug "${slug}".`);
  }

  return {
    label: service.shortTitle,
    href: routes.service(service.slug),
    description: service.description,
  };
}

const residentialOverviewLink: NavigationChild = {
  label: navigationLaneDefinitions.residential.overviewLabel,
  href: navigationLaneDefinitions.residential.href,
  description: navigationLaneDefinitions.residential.description,
  icon: Home,
};

const commercialOverviewLink: NavigationChild = {
  label: navigationLaneDefinitions.commercial.overviewLabel,
  href: navigationLaneDefinitions.commercial.href,
  description: navigationLaneDefinitions.commercial.description,
  icon: Building2,
};

export const residentialNavigation: NavigationChild = {
  label: navigationLaneDefinitions.residential.label,
  href: navigationLaneDefinitions.residential.href,
  description: navigationLaneDefinitions.residential.description,
};

export const commercialNavigation: NavigationChild = {
  label: navigationLaneDefinitions.commercial.label,
  href: navigationLaneDefinitions.commercial.href,
  description: navigationLaneDefinitions.commercial.description,
};

export const commercialPartnershipNavigation: NavigationChild = {
  label: "Service Plans & Partnerships",
  href: routes.commercialPartnerships,
  description: "Planned HVAC support, service agreements, and facility maintenance coordination.",
  icon: ClipboardList,
};

export const emergencyNavigation: NavigationChild = {
  label: "Emergency 24/7",
  href: routes.service(serviceSlugs.twentyFourHourEmergency),
  description: "Fast help for heating and cooling issues that cannot wait.",
};

// ─── Residential Mega Menu ──────────────────────────────────────────────────

export const residentialMegaMenu: MegaMenuGroup = {
  label: navigationLaneDefinitions.residential.label,
  href: navigationLaneDefinitions.residential.href,
  description: navigationLaneDefinitions.residential.description,
  columns: [
    {
      heading: "Home Comfort",
      items: [
        residentialOverviewLink,
        { ...serviceLink(serviceSlugs.heating), icon: Flame },
        { ...serviceLink(serviceSlugs.airConditioning), icon: Wind },
        {
          label: "Emergency HVAC Repair",
          href: routes.service(serviceSlugs.twentyFourHourEmergency),
          description: "Fast response for heating and cooling failures that cannot wait.",
          icon: AlertTriangle,
        },
      ],
    },
    {
      heading: "Comfort Upgrades",
      items: [
        { ...serviceLink(serviceSlugs.ductless), icon: Zap },
        { ...serviceLink(serviceSlugs.indoorAirQuality), icon: Leaf },
        { ...serviceLink(serviceSlugs.preventiveMaintenance), icon: CalendarCheck },
        {
          label: "SEER2 Savings Calculator",
          href: routes.financing,
          description: "Estimate efficiency savings when upgrading to a high-SEER2 system.",
          icon: Calculator,
        },
      ],
    },
    {
      heading: "Helpful Tools & Plans",
      items: [
        {
          label: "Request Residential Service",
          href: routes.requestService,
          description:
            "Need help deciding whether to repair or replace? Schedule a service visit — our technician will evaluate your system and provide honest recommendations.",
          icon: ClipboardCheck,
          variant: "cta",
        },
        {
          label: "Repair vs Replace?",
          href: routes.requestService,
          description: "A service visit gives you the clearest picture of your system's condition and the practical next step.",
          icon: Scale,
        },
        {
          label: "Financing Options",
          href: routes.financing,
          description: "Flexible financing through FTL Finance for major repairs or replacements.",
          icon: CreditCard,
        },
        {
          label: "Spring & Fall Tune-Up Specials",
          href: routes.service(serviceSlugs.preventiveMaintenance),
          description: "Seasonal promotions — pre-season tune-ups help you save on energy and avoid surprise breakdowns.",
          icon: CalendarCheck,
        },
      ],
    },
  ],
};

// ─── Commercial Mega Menu ────────────────────────────────────────────────────

export const commercialMegaMenu: MegaMenuGroup = {
  label: navigationLaneDefinitions.commercial.label,
  href: navigationLaneDefinitions.commercial.href,
  description: navigationLaneDefinitions.commercial.description,
  columns: [
    {
      heading: "Facility HVAC",
      items: [
        commercialOverviewLink,
        { ...serviceLink(serviceSlugs.commercial), icon: Building },
        {
          label: "Rooftop Units",
          href: routes.commercialService,
          description: "RTU service, maintenance, and lifecycle support for commercial facilities.",
          icon: Building2,
        },
        {
          label: "Facility & Industrial HVAC",
          href: routes.industrialFacilities,
          description: "Industrial-scale HVAC service, maintenance coordination, and equipment reviews.",
          icon: Factory,
        },
      ],
    },
    {
      heading: "Planning & Support",
      items: [
        commercialPartnershipNavigation,
        {
          label: "Replacement Planning",
          href: routes.commercialPartnerships,
          description: "Turn aging RTU and equipment history into clearer CapEx planning.",
          icon: TrendingUp,
        },
        {
          label: "Commercial Service Coordination",
          href: routes.requestService,
          description: "Coordinate scheduled maintenance across single or multi-site locations.",
          icon: Calendar,
        },
      ],
    },
    {
      heading: "Need Business Service?",
      items: [
        {
          label: "Request Commercial Service",
          href: routes.requestService,
          description: "HVAC support built around access, scheduling, and business continuity.",
          icon: ClipboardCheck,
          variant: "cta",
        },
        {
          label: "Schedule a Site Visit",
          href: routes.requestService,
          description: "Book a site visit for facility assessment and service planning.",
          icon: CalendarCheck,
        },
        {
          label: "Emergency Commercial HVAC",
          href: routes.service(serviceSlugs.twentyFourHourEmergency),
          description: "24/7 emergency response for facilities, RTUs, and business properties.",
          icon: AlertTriangle,
        },
        {
          label: "Call Ayres",
          href: phoneHref,
          description: "317-538-9837 — speak directly with our team.",
          icon: Phone,
        },
      ],
    },
  ],
};

// ─── Company & Primary Navigation ───────────────────────────────────────────

export const companyNavigation: NavigationChild[] = [
  {
    label: "About Us",
    href: routes.about,
    description: "Learn more about the Ayres Mechanical team and service approach.",
  },
  {
    label: "Financing",
    href: routes.financing,
    description: "Explore financing options for major HVAC repairs and replacements.",
  },
  {
    label: "Service Area",
    href: routes.serviceArea,
    description: "See where Ayres Mechanical provides local HVAC support across Central Indiana.",
  },
];

export const primaryNavigation: NavigationChild[] = [
  {
    label: "Reviews",
    href: routes.reviews,
    description: "Read what homeowners and businesses say about Ayres Mechanical.",
  },
  {
    label: "Contact",
    href: routes.contact,
    description: "Get in touch with Ayres Mechanical for questions and support.",
  },
];

// ─── Footer Links ────────────────────────────────────────────────────────────

export const footerServiceLinks: NavigationChild[] = [
  residentialOverviewLink,
  serviceLink(serviceSlugs.heating),
  serviceLink(serviceSlugs.airConditioning),
  serviceLink(serviceSlugs.ductless),
  serviceLink(serviceSlugs.indoorAirQuality),
  serviceLink(serviceSlugs.preventiveMaintenance),
  serviceLink(serviceSlugs.twentyFourHourEmergency),
];

export const footerCommercialLinks: NavigationChild[] = [
  commercialOverviewLink,
  commercialPartnershipNavigation,
  serviceLink(serviceSlugs.commercial),
  {
    ...serviceLink(serviceSlugs.industrial),
    label: "Facility & Industrial HVAC",
  },
];
