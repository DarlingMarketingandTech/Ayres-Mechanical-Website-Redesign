export type CloudinaryAssetFormat = "jpg" | "png" | "webp" | "svg";

export type CloudinaryAssetCategory =
  | "brand"
  | "teamFleet"
  | "commercialIndustrial"
  | "residentialProducts"
  | "partnerCred"
  | "stockSupport"
  | "uiIcon";

/** Central registry row — use semantic keys via `CLOUDINARY_ASSETS` / `getCloudinaryAsset`. */
export type CloudinaryRegistryEntry = {
  publicId: string;
  alt: string;
  category: CloudinaryAssetCategory;
  suggestedUsage: string;
  width: number;
  height: number;
  format: CloudinaryAssetFormat;
  version?: number;
  assetFolder: `ayres-mechanical-website/${string}`;
  /** Ayres-owned photography or marks approved for primary trust surfaces */
  ownerApproved?: boolean;
  /** Stock or placeholder; replace with Ayres proof when available */
  temporary?: boolean;
  usageNotes?: string;
};

/** Contract for `next/image`, `ProofMediaBlock`, and URL helpers (subset of registry fields). */
export type CloudinaryMediaAsset = {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  format: CloudinaryAssetFormat;
  version?: number;
  assetFolder: `ayres-mechanical-website/${string}`;
  usageNotes?: string;
};

export function registryToMediaAsset(entry: CloudinaryRegistryEntry): CloudinaryMediaAsset {
  return {
    publicId: entry.publicId,
    alt: entry.alt,
    width: entry.width,
    height: entry.height,
    format: entry.format,
    version: entry.version,
    assetFolder: entry.assetFolder,
    usageNotes: entry.usageNotes,
  };
}

/**
 * Canonical Cloudinary public IDs and metadata for Ayres Mechanical web delivery.
 * Prefer referencing these keys from UI instead of raw publicId strings.
 */
export const CLOUDINARY_ASSETS = {
  workVan: {
    publicId: "work-van",
    alt: "Ayres Mechanical branded work van parked outdoors.",
    category: "teamFleet",
    suggestedUsage: "Homepage local proof, service-area trust, fleet credibility.",
    width: 960,
    height: 720,
    format: "jpg",
    version: 1778784902,
    assetFolder: "ayres-mechanical-website/07-team-trucks-office",
    ownerApproved: true,
    usageNotes: "Primary operational proof asset.",
  },
  ownerBrianAndOfficeManagerSabra: {
    publicId: "owner_brian-and-_offivce_manager_Sabra",
    alt: "Ayres Mechanical team members standing with HVAC equipment.",
    category: "teamFleet",
    suggestedUsage: "About page, owner-operated trust band, team story.",
    width: 1255,
    height: 1263,
    format: "png",
    version: 1778784964,
    assetFolder: "ayres-mechanical-website/07-team-trucks-office",
    ownerApproved: true,
  },
  heloAndVan: {
    publicId: "helo-and-van",
    alt: "Helicopter near Ayres Mechanical service vehicle during an industrial project.",
    category: "commercialIndustrial",
    suggestedUsage: "Commercial / industrial capability storytelling.",
    width: 1600,
    height: 1000,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/08-commercial-industrial",
    ownerApproved: true,
  },
  helicopterIndustrialRoofInstall: {
    publicId: "helecoptor-industrial-roof-install",
    alt: "Helicopter delivering equipment for an industrial rooftop HVAC installation.",
    category: "commercialIndustrial",
    suggestedUsage: "Industrial HVAC hero or supporting panel (heavy-lift capability).",
    width: 1800,
    height: 1200,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/08-commercial-industrial",
    ownerApproved: true,
  },
  roofIndustrialWithCrane: {
    publicId: "roof-industrial-with-crane",
    alt: "Industrial rooftop HVAC work with crane support.",
    category: "commercialIndustrial",
    suggestedUsage: "Commercial capability section, industrial case studies.",
    width: 1800,
    height: 1200,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/08-commercial-industrial",
    ownerApproved: true,
  },
  pexelsKatterinaaa61454609: {
    publicId: "pexels-katterinaaa-61454609-8065903",
    alt: "Decorative interior environment (stock imagery).",
    category: "stockSupport",
    suggestedUsage: "Temporary filler only — prefer Ayres van, team, or project photography.",
    width: 1920,
    height: 1080,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/99-stock-support",
    temporary: true,
    ownerApproved: false,
  },
  rheemCentralAirOutdoorUnit: {
    publicId: "rheem-central-air-conditioner-outdoor-unit-installed",
    alt: "Rheem central air outdoor condensing unit installed at a residence.",
    category: "residentialProducts",
    suggestedUsage: "Residential cooling / AC repair supporting imagery.",
    width: 1200,
    height: 800,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/06-products-installations",
    temporary: true,
  },
  socialPhoto530213279: {
    publicId: "530213279_1514536439917419_4649766519054996389_n",
    alt: "Ayres Mechanical field or project photo from social channels.",
    category: "teamFleet",
    suggestedUsage: "Optional social proof carousel — confirm caption rights before primary placement.",
    width: 1080,
    height: 1080,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/07-team-trucks-office",
    ownerApproved: false,
  },
  ductlessSmallMhk2Wall: {
    publicId: "small_MHK_2_wall_b9fcc3fbf9",
    alt: "Mitsubishi-style wall-mounted ductless indoor unit.",
    category: "residentialProducts",
    suggestedUsage: "Ductless / mini-split service cards and education content.",
    width: 800,
    height: 800,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/06-products-installations",
    temporary: true,
  },
  ductlessMedium3W7: {
    publicId: "medium_3_W7_A2757_copy_08a7b10f64",
    alt: "Wall-mounted ductless indoor unit installation detail.",
    category: "residentialProducts",
    suggestedUsage: "Ductless comfort solutions section.",
    width: 900,
    height: 900,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/06-products-installations",
    temporary: true,
  },
  ductlessMediumGxMancave: {
    publicId: "medium_GX_Mancaveuse_f788e2fca3",
    alt: "Ductless indoor unit in a finished space.",
    category: "residentialProducts",
    suggestedUsage: "Residential ductless gallery or service page accent.",
    width: 900,
    height: 900,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/06-products-installations",
    temporary: true,
  },
  heatPumpEducationalSmall: {
    publicId: "small_what_is_a_heat_pump_nav_db7501ff0d",
    alt: "Illustration explaining what a heat pump is.",
    category: "residentialProducts",
    suggestedUsage: "Heating / heat pump education callouts.",
    width: 640,
    height: 640,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/06-products-installations",
    temporary: true,
  },
  mitsubishiDiamondContractor: {
    publicId: "mitsubishi-diamond-contractor.2107070651536",
    alt: "Mitsubishi Diamond Contractor logo.",
    category: "partnerCred",
    suggestedUsage: "Controlled partner strip — hide until owner-approved.",
    width: 500,
    height: 200,
    format: "png",
    assetFolder: "ayres-mechanical-website/09-service-partners",
    ownerApproved: false,
  },
  rheemRegisteredDealerGreyCheck: {
    publicId: "Pro_Plumbing_Grey_Check",
    alt: "Rheem registered dealer credential mark.",
    category: "partnerCred",
    suggestedUsage: "Controlled partner strip — hide until owner-approved.",
    width: 512,
    height: 173,
    format: "png",
    assetFolder: "ayres-mechanical-website/09-service-partners",
    ownerApproved: false,
  },
  rheemHvacWaterHeaterProductLineup: {
    publicId: "rheem-hvac-and-water-heater-product-lineup",
    alt: "Rheem HVAC and water heater product lineup graphic.",
    category: "partnerCred",
    suggestedUsage: "Equipment lineup strip — secondary to Ayres-owned proof.",
    width: 1200,
    height: 400,
    format: "png",
    assetFolder: "ayres-mechanical-website/09-service-partners",
    ownerApproved: false,
  },
  ftlFinanceLogo1024: {
    publicId: "FTL-Logo-1024x314",
    alt: "FTL Finance logo.",
    category: "partnerCred",
    suggestedUsage: "Financing strip, financing page hero partner mark.",
    width: 1024,
    height: 314,
    format: "png",
    assetFolder: "ayres-mechanical-website/10-financing",
    ownerApproved: false,
  },
  ayresMechPrimaryLogo: {
    publicId: "ayres-mech-primary-logo",
    alt: "Ayres Mechanical primary logo mark.",
    category: "brand",
    suggestedUsage: "Alternate header / print-style lockup when needed.",
    width: 2172,
    height: 724,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/logos",
    ownerApproved: true,
  },
  ayresMechWebsiteLogo: {
    publicId: "ayres-mech-website-logo",
    alt: "Ayres Mechanical website logo lockup.",
    category: "brand",
    suggestedUsage: "Web-specific logo variant for marketing surfaces.",
    width: 2172,
    height: 724,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/logos",
    ownerApproved: true,
  },
  amPrimaryLogo: {
    publicId: "am-primary-logo",
    alt: "Ayres Mechanical logo.",
    category: "brand",
    suggestedUsage: "Site header, footer, structured data surfaces.",
    width: 2172,
    height: 724,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/logos",
    ownerApproved: true,
  },
  amSecondaryLogoLight: {
    publicId: "am-secondary-logo-light",
    alt: "Ayres Mechanical secondary mark (light).",
    category: "brand",
    suggestedUsage: "Dark backgrounds — prefer transparent delivery helper for UI chrome.",
    width: 1254,
    height: 1254,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/logos",
    ownerApproved: true,
  },
  amSecondaryLogoDark: {
    publicId: "am-secondary-logo-dark",
    alt: "Ayres Mechanical secondary mark (dark).",
    category: "brand",
    suggestedUsage: "Light backgrounds and mobile nav — often paired with background removal.",
    width: 1254,
    height: 1254,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/logos",
    ownerApproved: true,
  },
  iconNumber1: {
    publicId: "icon-number_1",
    alt: "Step one.",
    category: "uiIcon",
    suggestedUsage: "Numbered process steps, ordered lists in marketing sections.",
    width: 128,
    height: 128,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/icons",
    ownerApproved: true,
  },
  iconNumber2: {
    publicId: "icon-number_2",
    alt: "Step two.",
    category: "uiIcon",
    suggestedUsage: "Numbered process steps.",
    width: 128,
    height: 128,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/icons",
    ownerApproved: true,
  },
  iconNumber3: {
    publicId: "icon-number_3",
    alt: "Step three.",
    category: "uiIcon",
    suggestedUsage: "Numbered process steps.",
    width: 128,
    height: 128,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/icons",
    ownerApproved: true,
  },
  iconNumber4: {
    publicId: "icon-number_4",
    alt: "Step four.",
    category: "uiIcon",
    suggestedUsage: "Extended process diagrams.",
    width: 128,
    height: 128,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/icons",
    ownerApproved: true,
  },
  iconNumber5: {
    publicId: "icon-number_5",
    alt: "Step five.",
    category: "uiIcon",
    suggestedUsage: "Extended process diagrams.",
    width: 128,
    height: 128,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/icons",
    ownerApproved: true,
  },
  residentialIcon: {
    publicId: "residential-icon",
    alt: "Residential HVAC icon.",
    category: "uiIcon",
    suggestedUsage: "Service segmentation, residential industry cards.",
    width: 256,
    height: 256,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/icons",
    ownerApproved: true,
  },
  service247Icon: {
    publicId: "247-service-icon",
    alt: "Twenty-four hour service icon.",
    category: "uiIcon",
    suggestedUsage: "Emergency and after-hours callouts.",
    width: 256,
    height: 256,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/icons",
    ownerApproved: true,
  },
  airflowIcon: {
    publicId: "airflow-icon",
    alt: "Airflow icon.",
    category: "uiIcon",
    suggestedUsage: "Ductwork, airflow, and IAQ-adjacent UI.",
    width: 256,
    height: 256,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/icons",
    ownerApproved: true,
  },
  serviceIcon: {
    publicId: "service-icon",
    alt: "General HVAC service icon.",
    category: "uiIcon",
    suggestedUsage: "Generic service bullets and cards.",
    width: 256,
    height: 256,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/icons",
    ownerApproved: true,
  },
  amIcon: {
    publicId: "am-icon",
    alt: "Ayres Mechanical monogram icon.",
    category: "brand",
    suggestedUsage: "Favicon-scale accents, app-style buttons, pattern anchors.",
    width: 512,
    height: 512,
    format: "png",
    assetFolder: "ayres-mechanical-website/00-brand-system/icons",
    ownerApproved: true,
  },
} as const satisfies Record<string, CloudinaryRegistryEntry>;

export type CloudinaryAssetId = keyof typeof CLOUDINARY_ASSETS;

export function getCloudinaryAsset(id: CloudinaryAssetId): CloudinaryRegistryEntry {
  return CLOUDINARY_ASSETS[id];
}
