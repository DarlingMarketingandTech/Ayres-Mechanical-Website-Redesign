import { CLOUDINARY_ASSETS, type CloudinaryMediaAsset, registryToMediaAsset } from "@/lib/cloudinary-assets";

export type { CloudinaryMediaAsset } from "@/lib/cloudinary-assets";

/** Curated media picks for existing pages — each maps to a row in `@/lib/cloudinary-assets`. */
export const media = {
  brand: {
    primaryLogo: registryToMediaAsset(CLOUDINARY_ASSETS.amPrimaryLogo),
    secondaryLogoLight: registryToMediaAsset(CLOUDINARY_ASSETS.amSecondaryLogoLight),
    secondaryLogoDark: registryToMediaAsset(CLOUDINARY_ASSETS.amSecondaryLogoDark),
  },
  home: {
    workVan: registryToMediaAsset(CLOUDINARY_ASSETS.workVan),
  },
  about: {
    ownerTeam: registryToMediaAsset(CLOUDINARY_ASSETS.ownerBrianAndOfficeManagerSabra),
  },
  financing: {
    ftlLogo: registryToMediaAsset(CLOUDINARY_ASSETS.ftlFinanceLogo1024),
  },
  partners: {
    mitsubishi: registryToMediaAsset(CLOUDINARY_ASSETS.mitsubishiDiamondContractor),
    rheemDealer: registryToMediaAsset(CLOUDINARY_ASSETS.rheemRegisteredDealerGreyCheck),
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
