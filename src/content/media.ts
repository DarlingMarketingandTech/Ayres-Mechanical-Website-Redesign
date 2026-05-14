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
  partners: {
    mitsubishi: {
      publicId: "mitsubishi-diamond-contractor.2107070651536",
      alt: "Mitsubishi Diamond Contractor logo.",
      width: 500,
      height: 200,
      format: "png",
      version: 1778787306,
      assetFolder: "ayres-mechanical-website/09-service-partners",
      usageNotes:
        "Verified asset. Do not render publicly until current credential wording is owner-approved.",
    },
    proPlumbing: {
      publicId: "Pro_Plumbing_Grey_Check",
      alt: "Pro Plumbing logo.",
      width: 512,
      height: 173,
      format: "png",
      version: 1778787307,
      assetFolder: "ayres-mechanical-website/09-service-partners",
      usageNotes:
        "Verified asset. Do not render publicly until partner display is explicitly approved.",
    },
  },
  services: {},
  locations: {},
} satisfies {
  home: Record<string, CloudinaryMediaAsset>;
  about: Record<string, CloudinaryMediaAsset>;
  partners: Record<string, CloudinaryMediaAsset>;
  services: Record<string, CloudinaryMediaAsset>;
  locations: Record<string, CloudinaryMediaAsset>;
};
