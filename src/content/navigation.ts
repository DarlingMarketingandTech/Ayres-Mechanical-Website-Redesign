import { serviceSlugs } from "@/data/services-content";
import { routes } from "@/lib/routes";
import { services, type Service } from "./services";

export type NavigationChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavigationGroup = {
  label: string;
  items: NavigationChild[];
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

export const serviceOverviewLink: NavigationChild = {
  label: "All Services",
  href: routes.services,
  description: "Browse residential, commercial, industrial, and emergency HVAC support.",
};

export const serviceNavigationGroups: NavigationGroup[] = [
  {
    label: "Residential",
    items: [
      serviceLink(serviceSlugs.heating),
      serviceLink(serviceSlugs.airConditioning),
      serviceLink(serviceSlugs.ductless),
      serviceLink(serviceSlugs.indoorAirQuality),
      serviceLink(serviceSlugs.preventiveMaintenance),
    ],
  },
  {
    label: "Commercial",
    items: [serviceLink(serviceSlugs.commercial)],
  },
  {
    label: "Industrial",
    items: [serviceLink(serviceSlugs.industrial)],
  },
];

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

export const emergencyNavigation: NavigationChild = {
  label: "Emergency 24/7",
  href: routes.service(serviceSlugs.twentyFourHourEmergency),
  description: "Fast help for heating and cooling issues that cannot wait.",
};

export const footerServiceLinks: NavigationChild[] = [
  serviceLink(serviceSlugs.heating),
  serviceLink(serviceSlugs.airConditioning),
  serviceLink(serviceSlugs.ductless),
  serviceLink(serviceSlugs.indoorAirQuality),
  serviceLink(serviceSlugs.preventiveMaintenance),
  serviceLink(serviceSlugs.commercial),
  serviceLink(serviceSlugs.industrial),
  serviceLink(serviceSlugs.twentyFourHourEmergency),
];
