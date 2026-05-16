export type ServiceLocation = {
  slug: string;
  city: string;
  state: "IN";
  county?: string;
  priority: "primary" | "secondary";
  intro: string;
  services: string[];
  nearby: string[];
  faqs: { question: string; answer: string }[];
};

export const serviceLocations: ServiceLocation[] = [
  {
    slug: "indianapolis",
    city: "Indianapolis",
    state: "IN",
    county: "Marion County",
    priority: "primary",
    intro: "Ayres Mechanical provides heating, cooling, maintenance, and commercial HVAC support for homes and businesses throughout Indianapolis. From older homes with uneven comfort to busy commercial spaces that need dependable climate control, the service approach is built around clear diagnostics, fast communication, and practical next steps.",
    services: ["Heating", "Air Conditioning", "Maintenance", "Commercial HVAC", "Emergency Service"],
    nearby: ["plainfield", "carmel", "lebanon"],
    faqs: [
      { question: "Does Ayres Mechanical provide emergency HVAC service in Indianapolis?", answer: "Yes. Ayres Mechanical offers emergency HVAC service for heating and cooling problems that need quick attention." },
      { question: "Do you service both homes and businesses in Indianapolis?", answer: "Yes. Residential, commercial, and industrial HVAC service can be requested in the Indianapolis area." },
    ],
  },
  {
    slug: "plainfield",
    city: "Plainfield",
    state: "IN",
    county: "Hendricks County",
    priority: "primary",
    intro: "Ayres Mechanical serves Plainfield and the surrounding Hendricks County area with residential and commercial heating and cooling service. Whether you need a diagnostic on an underperforming system, seasonal maintenance, or emergency support, the team provides clear answers and dependable follow-through without high-pressure recommendations.",
    services: ["Heating", "Air Conditioning", "Maintenance", "Commercial HVAC", "Emergency Service"],
    nearby: ["indianapolis", "crawfordsville", "greencastle"],
    faqs: [
      { question: "Does Ayres Mechanical serve the Plainfield and Hendricks County area?", answer: "Yes. Plainfield is within the primary Ayres Mechanical service area, with no travel charges." },
      { question: "Can I get emergency HVAC service in Plainfield?", answer: "Yes. 24-hour emergency service is available for urgent heating and cooling problems in Hendricks County." },
    ],
  },
  {
    slug: "carmel",
    city: "Carmel",
    state: "IN",
    county: "Hamilton County",
    priority: "primary",
    intro: "Ayres Mechanical provides HVAC service for Carmel and Fishers homes and businesses that need dependable heating, cooling, and maintenance support. Service recommendations focus on comfort, equipment condition, and the best path to restore reliable performance without unnecessary complexity.",
    services: ["Heating", "Air Conditioning", "Maintenance", "Commercial HVAC", "Emergency Service"],
    nearby: ["indianapolis", "lebanon", "plainfield"],
    faqs: [
      { question: "Does Ayres Mechanical service Carmel and Fishers commercial properties?", answer: "Yes. Commercial HVAC service and maintenance are available for Hamilton County businesses and facilities." },
      { question: "Can you help if my home has uneven temperatures?", answer: "Yes. Uneven comfort can come from equipment, airflow, or ductwork issues, and Ayres Mechanical can help diagnose the cause." },
    ],
  },
  {
    slug: "crawfordsville",
    city: "Crawfordsville",
    state: "IN",
    county: "Montgomery County",
    priority: "primary",
    intro: "Ayres Mechanical provides heating, air conditioning, and HVAC maintenance for homes and businesses in Crawfordsville and throughout Montgomery County. Whether it's a seasonal tune-up, an unexpected breakdown, or a commercial system that needs attention, the focus is on practical diagnostics and honest service.",
    services: ["Heating", "Air Conditioning", "Maintenance", "Commercial HVAC", "Emergency Service"],
    nearby: ["plainfield", "greencastle", "indianapolis"],
    faqs: [
      { question: "Does Ayres Mechanical service Montgomery County?", answer: "Yes. Crawfordsville and the surrounding Montgomery County area are within the primary Ayres Mechanical service area." },
      { question: "Is emergency HVAC service available in Crawfordsville?", answer: "Yes. Urgent heating and cooling problems in Montgomery County can be routed through 24-hour emergency service." },
    ],
  },
  {
    slug: "greencastle",
    city: "Greencastle",
    state: "IN",
    county: "Putnam County",
    priority: "primary",
    intro: "Ayres Mechanical provides HVAC service for Greencastle and Putnam County residents and businesses. From routine maintenance to urgent heating or cooling failures, the team brings the same honest approach to every call—clear diagnostics, practical options, and follow-through you can count on.",
    services: ["Heating", "Air Conditioning", "Maintenance", "Commercial HVAC", "Emergency Service"],
    nearby: ["plainfield", "crawfordsville", "indianapolis"],
    faqs: [
      { question: "Do you serve Greencastle and Putnam County?", answer: "Yes. Greencastle is within the Ayres Mechanical service area, and there are no travel charges within the six-county region." },
      { question: "Can Ayres Mechanical help with commercial HVAC in Putnam County?", answer: "Yes. Commercial heating and cooling service and maintenance are available throughout the service area." },
    ],
  },
  {
    slug: "lebanon",
    city: "Lebanon",
    state: "IN",
    county: "Boone County",
    priority: "primary",
    intro: "Ayres Mechanical serves Lebanon and Boone County with residential and commercial HVAC service. Whether you're dealing with a system that stopped working, a comfort issue that's been building, or a business facility that needs reliable climate control, the team provides honest answers and practical next steps.",
    services: ["Heating", "Air Conditioning", "Maintenance", "Commercial HVAC", "Emergency Service"],
    nearby: ["indianapolis", "carmel", "crawfordsville"],
    faqs: [
      { question: "Does Ayres Mechanical serve Lebanon and Boone County?", answer: "Yes. Lebanon is within the primary service area, and no travel charges apply within the six-county region." },
      { question: "Is 24-hour HVAC service available in Boone County?", answer: "Yes. Emergency heating and cooling service is available around the clock for Lebanon and the surrounding area." },
    ],
  },
];

export function getLocationBySlug(slug: string) {
  return serviceLocations.find((location) => location.slug === slug);
}

/** The six Indiana counties that make up the primary Ayres Mechanical service area. */
export const serviceCounties = [
  { name: "Marion County", representative: "Indianapolis" },
  { name: "Hendricks County", representative: "Plainfield" },
  { name: "Hamilton County", representative: "Carmel / Fishers" },
  { name: "Montgomery County", representative: "Crawfordsville" },
  { name: "Putnam County", representative: "Greencastle" },
  { name: "Boone County", representative: "Lebanon" },
] as const;

/** Comma-separated county name list for use in prose copy. */
export const serviceCountyNames = serviceCounties.map((c) => c.name.replace(" County", "")).join(", ");
