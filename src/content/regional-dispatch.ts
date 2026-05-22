export type RegionalDispatchCounty = {
  name: string;
  hubs: string;
  classes: string;
  relevance: string;
};

export const regionalDispatchCounties: RegionalDispatchCounty[] = [
  {
    name: "Marion",
    hubs: "Indianapolis-area offices, retail, restaurants, light commercial, multi-tenant buildings",
    classes: "Office, retail, restaurant, and multi-tenant comfort systems",
    relevance: "Dense commercial routes and business-continuity service planning.",
  },
  {
    name: "Hendricks",
    hubs: "Plainfield, Avon, Brownsburg, logistics, retail, property management sites",
    classes: "Logistics, retail, and managed property portfolios",
    relevance: "Strong fit for multi-site scheduling and planned maintenance cadence.",
  },
  {
    name: "Hamilton",
    hubs: "Carmel, Noblesville, Westfield, offices, medical/professional spaces, retail",
    classes: "Professional, medical, office, and retail facilities",
    relevance: "Comfort accountability for customer-facing and staff-heavy spaces.",
  },
  {
    name: "Montgomery",
    hubs: "Crawfordsville, local businesses, schools, light industrial, core service base",
    classes: "Local business, education, and light industrial facilities",
    relevance: "Core Central Indiana base for practical commercial HVAC support.",
  },
  {
    name: "Putnam",
    hubs: "Greencastle-area businesses, small institutional sites, light commercial",
    classes: "Small institutional, local business, and light commercial systems",
    relevance: "Good fit for documented maintenance and repair-versus-replacement planning.",
  },
  {
    name: "Boone",
    hubs: "Lebanon, Zionsville, growing commercial corridors, office/retail portfolios",
    classes: "Office, retail, and growing commercial corridors",
    relevance: "Portfolio readiness for expanding commercial and property management needs.",
  },
];
