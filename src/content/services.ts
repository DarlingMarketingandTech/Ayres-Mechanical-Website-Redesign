export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  heroTitle: string;
  heroEyebrow: string;
  accent: "red" | "blue" | "dark";
  icon: "heating" | "cooling" | "maintenance" | "ductwork" | "commercial" | "industrial" | "emergency";
  highlights: string[];
  problemsSolved: string[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
};

export const services: Service[] = [
  {
    slug: "heating",
    title: "Heating Services",
    shortTitle: "Heating",
    description: "Heating repair, replacement guidance, and maintenance for homes and facilities throughout Central Indiana.",
    heroTitle: "Reliable Heating Service When Indiana Weather Turns Cold",
    heroEyebrow: "Heating Service",
    accent: "red",
    icon: "heating",
    highlights: ["Furnace and heat pump service", "No-heat troubleshooting", "Preventive heating maintenance", "System performance checks"],
    problemsSolved: ["Uneven rooms and cold spots", "Unexpected shutdowns", "Rising utility bills", "Aging equipment that needs expert evaluation"],
    faqs: [
      { question: "Do you service both furnaces and heat pumps?", answer: "Yes. Ayres Mechanical supports common residential and light commercial heating systems, including furnaces and heat pumps." },
      { question: "Can I request heating service after hours?", answer: "Yes. Ayres Mechanical offers 24-hour service for heating problems that need quick attention." },
    ],
    relatedServices: ["maintenance", "emergency-service", "air-conditioning"],
  },
  {
    slug: "air-conditioning",
    title: "Air Conditioning Services",
    shortTitle: "Air Conditioning",
    description: "Cooling service, repair, and maintenance built around dependable comfort during hot Central Indiana summers.",
    heroTitle: "Air Conditioning Service That Keeps Comfort Moving",
    heroEyebrow: "Cooling Service",
    accent: "blue",
    icon: "cooling",
    highlights: ["AC diagnostics and repair", "Cooling tune-ups", "Indoor comfort checks", "System replacement guidance"],
    problemsSolved: ["Warm air from vents", "Short cycling", "Weak airflow", "High humidity and inconsistent cooling"],
    faqs: [
      { question: "Do you handle emergency air conditioning service?", answer: "Yes. Cooling issues that create urgent comfort or operational problems can be requested through 24-hour service." },
      { question: "How often should AC maintenance be scheduled?", answer: "Most systems benefit from annual cooling maintenance before peak summer demand." },
    ],
    relatedServices: ["maintenance", "ductwork", "emergency-service"],
  },
  {
    slug: "maintenance",
    title: "HVAC Maintenance",
    shortTitle: "Maintenance",
    description: "Planned heating and cooling maintenance to help reduce breakdowns, improve comfort, and extend equipment life.",
    heroTitle: "Preventive HVAC Maintenance for Fewer Surprises",
    heroEyebrow: "Maintenance",
    accent: "blue",
    icon: "maintenance",
    highlights: ["Seasonal performance checks", "Filter and airflow review", "Equipment condition reporting", "Residential and business plans"],
    problemsSolved: ["Emergency breakdown risk", "Neglected system wear", "Poor airflow", "Unclear equipment condition"],
    faqs: [
      { question: "Is maintenance useful for newer systems?", answer: "Yes. Regular maintenance helps newer systems run efficiently and can identify small issues before they become larger repairs." },
      { question: "Do you maintain commercial HVAC systems?", answer: "Yes. Maintenance support is available for residential, commercial, and industrial HVAC needs." },
    ],
    relatedServices: ["heating", "air-conditioning", "commercial-hvac"],
  },
  {
    slug: "ductwork",
    title: "Ductwork Services",
    shortTitle: "Ductwork",
    description: "Ductwork evaluation and service for airflow, comfort balance, and HVAC system performance.",
    heroTitle: "Ductwork Support for Better Airflow and Comfort",
    heroEyebrow: "Ductwork",
    accent: "blue",
    icon: "ductwork",
    highlights: ["Airflow evaluation", "Duct repair guidance", "Comfort balancing support", "System performance troubleshooting"],
    problemsSolved: ["Rooms that never feel right", "Restricted airflow", "Comfort imbalance", "HVAC equipment working harder than necessary"],
    faqs: [
      { question: "Can ductwork cause comfort problems?", answer: "Yes. Airflow restrictions, leaks, and layout issues can make otherwise good HVAC equipment feel ineffective." },
      { question: "Do you evaluate ductwork with service calls?", answer: "When airflow symptoms are part of the issue, Ayres Mechanical can review ductwork as part of the diagnostic process." },
    ],
    relatedServices: ["air-conditioning", "heating", "maintenance"],
  },
  {
    slug: "commercial-hvac",
    title: "Commercial HVAC Services",
    shortTitle: "Commercial HVAC",
    description: "Commercial HVAC service and maintenance for offices, retail spaces, small facilities, and operational buildings.",
    heroTitle: "Commercial HVAC Service Built Around Business Continuity",
    heroEyebrow: "Commercial HVAC",
    accent: "dark",
    icon: "commercial",
    highlights: ["Business HVAC diagnostics", "Preventive maintenance", "Comfort and airflow support", "Responsive service scheduling"],
    problemsSolved: ["Tenant or employee comfort issues", "Equipment downtime", "Inconsistent zones", "Maintenance uncertainty across multiple units"],
    faqs: [
      { question: "Do you service commercial buildings?", answer: "Yes. Ayres Mechanical provides commercial heating, cooling, maintenance, and emergency support." },
      { question: "Can service be scheduled around business hours?", answer: "Service scheduling can be coordinated around operational needs whenever possible." },
    ],
    relatedServices: ["maintenance", "industrial-hvac", "emergency-service"],
  },
  {
    slug: "industrial-hvac",
    title: "Industrial HVAC Services",
    shortTitle: "Industrial HVAC",
    description: "Industrial HVAC support for facilities that need reliable climate systems, technical service, and operational awareness.",
    heroTitle: "Industrial HVAC Support for Demanding Environments",
    heroEyebrow: "Industrial HVAC",
    accent: "dark",
    icon: "industrial",
    highlights: ["Facility HVAC service", "Operational comfort support", "Equipment condition review", "Maintenance coordination"],
    problemsSolved: ["Operational downtime risk", "Large-area comfort control", "Aging mechanical systems", "Specialized service coordination"],
    faqs: [
      { question: "Do you support industrial HVAC needs?", answer: "Yes. Ayres Mechanical serves industrial customers with HVAC service, maintenance, and responsive support." },
      { question: "Can you help prioritize urgent facility issues?", answer: "Yes. Urgent operational comfort and equipment issues can be routed through 24-hour service." },
    ],
    relatedServices: ["commercial-hvac", "maintenance", "emergency-service"],
  },
  {
    slug: "emergency-service",
    title: "Emergency HVAC Service",
    shortTitle: "Emergency Service",
    description: "24-hour heating and air conditioning service for urgent comfort, safety, and operational needs.",
    heroTitle: "24-Hour HVAC Service When Comfort Cannot Wait",
    heroEyebrow: "Emergency Service",
    accent: "red",
    icon: "emergency",
    highlights: ["24-hour service availability", "Heating and cooling emergencies", "Residential, commercial, and industrial response", "Direct call-to-service path"],
    problemsSolved: ["No heat in cold weather", "No cooling during peak heat", "Critical comfort failures", "Business-disrupting HVAC issues"],
    faqs: [
      { question: "What counts as an HVAC emergency?", answer: "No heat, no cooling during extreme weather, system failures affecting safety, and business-critical comfort issues may require emergency service." },
      { question: "What is the fastest way to request emergency service?", answer: "Call Ayres Mechanical directly at 317-538-9837 for urgent service needs." },
    ],
    relatedServices: ["heating", "air-conditioning", "maintenance"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
