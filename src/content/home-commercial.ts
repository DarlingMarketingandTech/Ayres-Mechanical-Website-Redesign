import type { CloudinaryAssetId } from "@/lib/cloudinary-assets";

export type CommercialCapabilityCard = {
  title: string;
  description: string;
  assetId: CloudinaryAssetId;
};

/** Homepage commercial capability panels — imagery from Ayres project photography. */
export const commercialCapabilityCards: CommercialCapabilityCard[] = [
  {
    title: "Commercial Rooftop Units",
    description:
      "Rooftop replacements and repairs for offices, retail, and multi-tenant buildings—with crane coordination when the job demands it.",
    assetId: "roofIndustrialWithCrane",
  },
  {
    title: "Light Industrial HVAC",
    description:
      "Mechanical support for warehouses, production floors, and facilities where uptime and airflow matter as much as comfort.",
    assetId: "heloAndVan",
  },
  {
    title: "Maintenance and Replacement Planning",
    description:
      "Condition reviews, preventive maintenance, and phased replacement guidance so equipment decisions are planned—not reactive.",
    assetId: "helicopterIndustrialRoofInstall",
  },
];
