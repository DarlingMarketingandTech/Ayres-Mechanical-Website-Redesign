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
    heloAndVan: registryToMediaAsset(CLOUDINARY_ASSETS.heloAndVan),
    roofIndustrialCrane: registryToMediaAsset(CLOUDINARY_ASSETS.roofIndustrialWithCrane),
    helicopterRoofInstall: registryToMediaAsset(CLOUDINARY_ASSETS.helicopterIndustrialRoofInstall),
  },
  about: {
    ownerTeam: registryToMediaAsset(CLOUDINARY_ASSETS.ownerBrianAndOfficeManagerSabra),
  },
  financing: {
    ftlLogo: registryToMediaAsset(CLOUDINARY_ASSETS.ftlFinanceLogo1024),
  },
  partners: {
    mitsubishi: registryToMediaAsset(CLOUDINARY_ASSETS.mitsubishiDiamondContractor),
    rheemLineup: registryToMediaAsset(CLOUDINARY_ASSETS.rheemHvacWaterHeaterProductLineup),
    proCredential: registryToMediaAsset(CLOUDINARY_ASSETS.rheemRegisteredDealerGreyCheck),
    ftl: registryToMediaAsset(CLOUDINARY_ASSETS.ftlFinanceLogo1024),
  },
  services: {
    acOutdoorUnit: registryToMediaAsset(CLOUDINARY_ASSETS.rheemCentralAirOutdoorUnit),
    ductlessWallUnit: registryToMediaAsset(CLOUDINARY_ASSETS.ductlessSmallMhk2Wall),
    heatPumpEducational: registryToMediaAsset(CLOUDINARY_ASSETS.heatPumpEducationalSmall),
    ductlessInstallDetail: registryToMediaAsset(CLOUDINARY_ASSETS.ductlessMedium3W7),
    ductlessFinishedSpace: registryToMediaAsset(CLOUDINARY_ASSETS.ductlessMediumGxMancave),
  },
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
