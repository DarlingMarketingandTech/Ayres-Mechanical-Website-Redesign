export type CloudinaryMediaAsset = {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  format: "jpg" | "png" | "webp" | "svg";
  version?: number;
  assetFolder: `ayres-mechanical-website/${string}`;
  usageNotes?: string;
};

export const media = {
  brand: {
    primaryLogo: {
      publicId: "ayres-mech-website-logo",
      alt: "Ayres Mechanical logo.",
      width: 2045,
      height: 265,
      format: "png",
      assetFolder: "ayres-mechanical-website/00-brand-system/logos",
      usageNotes: "Wide wordmark with minimal padding; preferred for header and footer.",
    },
    /** For dark UI surfaces; delivered with background removal for transparency (Cloudinary AI credits). */
    secondaryLogoLight: {
      publicId: "am-secondary-logo-light",
      alt: "Ayres Mechanical secondary mark (light).",
      width: 1254,
      height: 1254,
      format: "png",
      assetFolder: "ayres-mechanical-website/00-brand-system/logos",
    },
    /** For light UI surfaces; delivered with background removal for transparency (Cloudinary AI credits). */
    secondaryLogoDark: {
      publicId: "am-secondary-logo-dark",
      alt: "Ayres Mechanical secondary mark (dark).",
      width: 1254,
      height: 1254,
      format: "png",
      assetFolder: "ayres-mechanical-website/00-brand-system/logos",
    },
  },
  home: {
    workVan: {
      publicId: "work-van",
      alt: "Ayres Mechanical branded work van parked outdoors.",
      width: 960,
      height: 720,
      format: "jpg",
      version: 1778784902,
      assetFolder: "ayres-mechanical-website/07-team-trucks-office",
      usageNotes: "Use as restrained operational proof near trust or service-area content.",
    },
  },
  about: {
    ownerTeam: {
      publicId: "owner_brian-and-_offivce_manager_Sabra",
      alt: "Ayres Mechanical team members standing with HVAC equipment.",
      width: 1255,
      height: 1263,
      format: "png",
      version: 1778784964,
      assetFolder: "ayres-mechanical-website/07-team-trucks-office",
      usageNotes: "Use near company story content as authentic team and equipment proof.",
    },
  },
  financing: {
    ftlLogo: {
      publicId: "FTL-Logo-1024x314",
      alt: "FTL Finance logo.",
      width: 1024,
      height: 314,
      format: "png",
      assetFolder: "ayres-mechanical-website/10-financing",
      usageNotes: "Financing partner mark for homepage and financing page.",
    },
  },
  partners: {
    mitsubishi: {
      publicId: "mitsubishi-diamond-contractor.2107070651536",
      alt: "Mitsubishi Diamond Contractor logo.",
      width: 500,
      height: 200,
      format: "png",
      assetFolder: "ayres-mechanical-website/09-service-partners",
    },
    rheemDealer: {
      publicId: "Pro_Plumbing_Grey_Check",
      alt: "Rheem registered dealer credential mark.",
      width: 512,
      height: 173,
      format: "png",
      assetFolder: "ayres-mechanical-website/09-service-partners",
    },
  },
  services: {},
  locations: {},
} satisfies {
  brand: Record<string, CloudinaryMediaAsset>;
  home: Record<string, CloudinaryMediaAsset>;
  about: Record<string, CloudinaryMediaAsset>;
  financing: Record<string, CloudinaryMediaAsset>;
  partners: Record<string, CloudinaryMediaAsset>;
  services: Record<string, CloudinaryMediaAsset>;
  locations: Record<string, CloudinaryMediaAsset>;
};
