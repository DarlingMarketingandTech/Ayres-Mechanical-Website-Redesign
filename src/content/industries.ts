export type Industry = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  tone: "residential" | "commercial" | "industrial";
  painPoints: string[];
  capabilities: string[];
  proofPoints: string[];
};

export const industries: Industry[] = [
  {
    slug: "residential",
    title: "Residential HVAC Services",
    eyebrow: "For Homeowners",
    description: "Heating, cooling, maintenance, and emergency service for Central Indiana homes.",
    tone: "residential",
    painPoints: ["Comfort problems that disrupt family routines", "Unexpected repairs during extreme weather", "Confusing advice about aging equipment"],
    capabilities: ["Heating service", "Air conditioning service", "Seasonal maintenance", "Emergency HVAC support", "Ductwork and airflow review"],
    proofPoints: ["Clear communication", "Local service focus", "Practical comfort recommendations"],
  },
  {
    slug: "commercial",
    title: "Commercial HVAC Services",
    eyebrow: "For Businesses",
    description: "Commercial HVAC support for offices, retail, service businesses, and multi-unit properties.",
    tone: "commercial",
    painPoints: ["Employee or customer comfort complaints", "Service interruptions that affect revenue", "Multiple systems without a clear maintenance plan"],
    capabilities: ["Commercial diagnostics", "Preventive maintenance", "Emergency response", "Airflow and zone support", "Replacement planning guidance"],
    proofPoints: ["Business-aware scheduling", "Responsive service", "Straightforward reporting"],
  },
  {
    slug: "industrial",
    title: "Industrial HVAC Services",
    eyebrow: "For Facilities",
    description: "Industrial HVAC service for operational environments where uptime and reliability matter.",
    tone: "industrial",
    painPoints: ["Downtime risk from mechanical failures", "Large spaces with uneven comfort", "Equipment that needs coordinated service planning"],
    capabilities: ["Facility HVAC support", "Equipment condition review", "Maintenance coordination", "Emergency service", "Commercial and industrial system support"],
    proofPoints: ["Operational awareness", "Technical service mindset", "Dependable follow-through"],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
