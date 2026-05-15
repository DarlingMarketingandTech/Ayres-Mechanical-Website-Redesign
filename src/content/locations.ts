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
    nearby: ["greenwood", "carmel", "fishers"],
    faqs: [
      { question: "Does Ayres Mechanical provide emergency HVAC service in Indianapolis?", answer: "Yes. Ayres Mechanical offers emergency HVAC service for heating and cooling problems that need quick attention." },
      { question: "Do you service both homes and businesses in Indianapolis?", answer: "Yes. Residential, commercial, and industrial HVAC service can be requested in the Indianapolis area." },
    ],
  },
  {
    slug: "greenwood",
    city: "Greenwood",
    state: "IN",
    county: "Johnson County",
    priority: "primary",
    intro: "Ayres Mechanical supports Greenwood homeowners and businesses with heating, air conditioning, maintenance, and emergency HVAC service. The team can help with seasonal tune-ups, urgent comfort issues, airflow concerns, and business HVAC problems that need a reliable local response.",
    services: ["Heating", "Air Conditioning", "Maintenance", "Ductwork", "Emergency Service"],
    nearby: ["indianapolis", "carmel", "fishers"],
    faqs: [
      { question: "Can I schedule preventive HVAC maintenance in Greenwood?", answer: "Yes. Preventive maintenance can help reduce surprise breakdowns and keep heating and cooling equipment ready for peak seasons." },
      { question: "Do you help with ductwork and airflow problems?", answer: "Yes. Ductwork and airflow concerns can be reviewed when rooms are uncomfortable or system performance feels uneven." },
    ],
  },
  {
    slug: "carmel",
    city: "Carmel",
    state: "IN",
    county: "Hamilton County",
    priority: "secondary",
    intro: "Ayres Mechanical provides HVAC service for Carmel homes and businesses that need dependable heating, cooling, and maintenance support. Service recommendations focus on comfort, equipment condition, and the best path to restore reliable performance without unnecessary complexity.",
    services: ["Heating", "Air Conditioning", "Maintenance", "Commercial HVAC"],
    nearby: ["fishers", "noblesville", "indianapolis"],
    faqs: [
      { question: "Does Ayres Mechanical service Carmel commercial properties?", answer: "Yes. Commercial HVAC service and maintenance are available for Carmel businesses and facilities." },
      { question: "Can you help if my home has uneven temperatures?", answer: "Yes. Uneven comfort can come from equipment, airflow, or ductwork issues, and Ayres Mechanical can help diagnose the cause." },
    ],
  },
  {
    slug: "fishers",
    city: "Fishers",
    state: "IN",
    county: "Hamilton County",
    priority: "secondary",
    intro: "Ayres Mechanical serves Fishers with heating and air conditioning service for residential, commercial, and industrial needs. Whether the issue is an urgent breakdown, noisy equipment, weak airflow, or maintenance planning, the goal is to make HVAC decisions clearer and service easier to request.",
    services: ["Heating", "Air Conditioning", "Maintenance", "Emergency Service"],
    nearby: ["carmel", "noblesville", "indianapolis"],
    faqs: [
      { question: "Is 24-hour HVAC service available in Fishers?", answer: "Yes. Urgent heating and cooling problems can be routed through 24-hour service." },
      { question: "Do you offer maintenance before summer and winter?", answer: "Yes. Seasonal maintenance is recommended before heavy cooling and heating demand." },
    ],
  },
  {
    slug: "noblesville",
    city: "Noblesville",
    state: "IN",
    county: "Hamilton County",
    priority: "secondary",
    intro: "Ayres Mechanical provides Noblesville HVAC service for comfort issues, equipment maintenance, and urgent heating or cooling problems. The site foundation includes this service area as a local landing page that can be expanded with owner-confirmed neighborhood and project details before launch.",
    services: ["Heating", "Air Conditioning", "Maintenance", "Commercial HVAC", "Industrial HVAC"],
    nearby: ["fishers", "carmel", "indianapolis"],
    faqs: [
      { question: "Do you service industrial HVAC needs near Noblesville?", answer: "Yes. Industrial HVAC support is part of the Ayres Mechanical service mix." },
      { question: "What information should I provide when requesting service?", answer: "Share the system type, the symptoms, whether the issue is urgent, and the best way to contact you." },
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
