import type { Service } from "@/content/services";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * LocalBusiness / HVACBusiness JSON-LD.
 * Only includes owner-confirmed facts. See pendingOwnerConfirmation in site.ts for gated fields.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "LocalBusiness"],
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.serviceArea,
    },
  // owner-confirmation: add foundingDate when approved
  // owner-confirmation: add openingHoursSpecification for 24-hour service when approved
  // owner-confirmation: add brand / partner (Rheem, Mitsubishi) when authorized-dealer status is confirmed
  // owner-confirmation: expand areaServed with county list (Marion, Johnson, Hamilton, etc.) when approved
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            addressRegion: siteConfig.address.state,
            postalCode: siteConfig.address.postalCode,
            addressCountry: "US",
          },
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Heating and Air Conditioning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "HVAC Maintenance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial HVAC" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency HVAC Service" } },
      ],
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "HVACBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
    areaServed: siteConfig.serviceArea,
    url: absoluteUrl("/services/" + service.slug),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
