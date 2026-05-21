export type CloudinaryMediaAsset = {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  format: "jpg" | "png" | "webp" | "svg";
  version?: number;
  assetFolder: `ayres-mechanical-website/${string}`;
  usageNotes?: string;
  temporaryDemo?: boolean;
};

/** Canonical delivery records (single source of truth for public IDs). */
const assets = {
  workVan: {
    publicId: "work-van",
    alt: "Ayres Mechanical branded work van parked outdoors.",
    width: 960,
    height: 720,
    format: "jpg",
    version: 1778784902,
    assetFolder: "ayres-mechanical-website/07-team-trucks-office",
    usageNotes: "Registry: `home.localProof`. Operational proof for home hero, services hub, about, and request forms.",
  },
  ownerTeamBrianSabra: {
    publicId: "brian-ayres-sabra-office-team",
    alt: "Brian Ayres and Sabra Evanoff with Ayres Mechanical office and HVAC equipment.",
    width: 1255,
    height: 1263,
    format: "png",
    assetFolder: "ayres-mechanical-website/07-team-trucks-office",
    usageNotes: "Registry: `about.ownerTeam`.",
  },
  serviceLocationsMap: {
    publicId: "service_locations",
    alt: "Map of Central Indiana counties served by Ayres Mechanical.",
    width: 2754,
    height: 1536,
    format: "png",
    assetFolder: "ayres-mechanical-website/05-locations",
    usageNotes: "Registry: `serviceArea.map`. Cap delivery width (≤2000px) for performance.",
  },
  coldBg: {
    publicId: "cold-bg",
    alt: "Cool blue abstract background suggesting reliable air conditioning.",
    width: 7087,
    height: 4724,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/01-global-ui/hero-backgrounds",
    temporaryDemo: true,
    usageNotes: "Registry: `pages.airConditioning.hero`. Large original — cap width (≤2400px); `f_auto,q_auto` via CldImage.",
  },
  hotBg: {
    publicId: "hot-bg",
    alt: "Warm amber abstract background suggesting dependable winter heating.",
    width: 1920,
    height: 1280,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/01-global-ui/hero-backgrounds",
    temporaryDemo: true,
    usageNotes: "Registry: `pages.heating.hero`.",
  },
  freshAirBg: {
    publicId: "fresh-air-bg",
    alt: "Bright sky and fresh air over treetops, suggesting cleaner indoor air.",
    width: 1920,
    height: 1283,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/01-global-ui/hero-backgrounds",
    temporaryDemo: true,
    usageNotes: "Registry: `pages.indoorAirQuality.hero`.",
  },
  fanFreshAir: {
    publicId: "fan-fresh-air",
    alt: "Ceiling fan in a bright room, illustrating airflow and circulation.",
    width: 1920,
    height: 1280,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/01-global-ui/hero-backgrounds",
    usageNotes: "Registry: `pages.indoorAirQuality.supporting`.",
  },
  rheemCentralAcInstalled: {
    publicId: "rheem-central-ac-unit-installed",
    alt: "Rheem central air conditioning condenser installed at a residential site.",
    width: 500,
    height: 334,
    format: "png",
    assetFolder: "ayres-mechanical-website/03-services/air-conditioning",
    usageNotes: "Registry: `pages.airConditioning.supporting`.",
  },
  helicopterIndustrialRoof: {
    publicId: "helicopter-industrial-roof-install",
    alt: "Helicopter lift delivering HVAC equipment during a commercial rooftop installation.",
    width: 1536,
    height: 2048,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/03-services/commercial-hvac",
    usageNotes: "Registry: `pages.commercial.hero`.",
  },
  /**
   * Cloudinary search (2026-05): no asset at `commercial-rooftop-hvac-stock-photo` yet.
   * Delivering verified folder stock under this slot; rename/upload to the requested public_id when ready.
   */
  commercialRooftopHvacStockPhoto: {
    publicId: "pexels-katterinaaa-61454609-8065903",
    alt: "Commercial building rooftop mechanical equipment (temporary demo stock photo).",
    width: 4000,
    height: 6000,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/90-temporary-stock/approved-for-demo",
    temporaryDemo: true,
    usageNotes:
      "Registry: `pages.commercial.supporting` — temporary approved-for-demo stock; moved from 03-services/commercial-hvac to 90-temporary-stock/approved-for-demo in Cloudinary cleanup. Intended final public_id `commercial-rooftop-hvac-stock-photo` (not in account yet). Re-point after upload/rename.",
  },
  systemsExplainer: {
    publicId: "systems-explainer",
    alt: "Diagram explaining how coordinated HVAC components work together in a building.",
    width: 1376,
    height: 768,
    format: "png",
    assetFolder: "ayres-mechanical-website/03-services/maintenance",
    usageNotes: "Registry: `pages.maintenance.supporting`.",
  },
  ductlessSupportingGx: {
    publicId: "medium_GX_Mancaveuse_f788e2fca3",
    alt: "Ductless mini-split system conditioning a finished living space.",
    width: 750,
    height: 579,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/03-services/air-conditioning",
    usageNotes: "Registry: `pages.ductless.supporting`.",
  },
  amServicesHvac: {
    publicId: "ac-service-outdoor-hvac-system",
    alt: "Outdoor HVAC system for Ayres Mechanical air conditioning service.",
    width: 1536,
    height: 1028,
    format: "webp",
    assetFolder: "ayres-mechanical-website/03-services/air-conditioning",
    usageNotes: "Registry: `pages.airConditioning.hero`. Real AC service image from Cloudinary cleanup; replaces cold-bg placeholder.",
  },
  amHeatingService: {
    publicId: "am-heating-service",
    alt: "Ayres Mechanical technician servicing a residential heating system.",
    width: 960,
    height: 960,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/03-services/heating",
    usageNotes: "Registry: `pages.heating.hero`. Real heating job photo — replaces hot-bg placeholder.",
  },
  heatAmService: {
    publicId: "heat-am-service",
    alt: "Ayres Mechanical technician on a heating service call.",
    width: 720,
    height: 960,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/03-services/heating",
    usageNotes: "Registry: `pages.maintenance.hero`. Gives preventive maintenance card its first image.",
  },
  amRooftopUnitServices: {
    publicId: "am-rooftopunit-services",
    alt: "Commercial rooftop HVAC unit serviced by Ayres Mechanical.",
    width: 831,
    height: 500,
    format: "png",
    assetFolder: "ayres-mechanical-website/03-services/commercial-hvac",
    usageNotes: "Registry: `pages.commercial.hero`. Real Ayres rooftop photo — replaces helicopter placeholder.",
  },
  industrialAm: {
    publicId: "industrial-am",
    alt: "Ayres Mechanical industrial HVAC job site.",
    width: 960,
    height: 540,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/03-services/industrial-hvac",
    usageNotes: "Registry: `pages.industrial.hero`. First image for the industrial service card.",
  },
  emergencyServicePhoto: {
    publicId: "hvac-repair-redding-ca",
    alt: "HVAC emergency repair service call.",
    width: 600,
    height: 800,
    format: "jpg",
    assetFolder: "ayres-mechanical-website/90-temporary-stock/license-or-source-review",
    temporaryDemo: true,
    usageNotes:
      "NOT in active use. Moved to 90-temporary-stock/license-or-source-review in Cloudinary cleanup — filename references Redding, CA and must not appear as a polished live Ayres asset. Replace with an approved real emergency/service-call photo before launch. Emergency hero currently uses `pages.airConditioning.hero` (ac-service-outdoor-hvac-system) as a temporary fallback.",
  },
} satisfies Record<string, CloudinaryMediaAsset>;

export const media = {
  brand: {
    primaryLogo: {
      publicId: "AMI-logo-full",
      alt: "Ayres Mechanical logo.",
      width: 2048,
      height: 381,
      format: "svg",
      assetFolder: "ayres-mechanical-website/00-brand-system/logos",
      usageNotes: "Full wordmark SVG (2048×381); preferred for header and footer.",
    },
    secondaryLogoLight: {
      publicId: "am-secondary-logo-light",
      alt: "Ayres Mechanical secondary mark (light).",
      width: 1254,
      height: 1254,
      format: "png",
      assetFolder: "ayres-mechanical-website/00-brand-system/logos",
    },
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
    /** `work-van` — local operational proof for home and marketing surfaces. */
    localProof: assets.workVan,
  },
  about: {
    /** `brian-ayres-sabra-office-team` */
    ownerTeam: assets.ownerTeamBrianSabra,
  },
  serviceArea: {
    /** `service_locations` */
    map: assets.serviceLocationsMap,
  },
  financing: {
    ftlLogo: {
      publicId: "FTL-Logo-1024x314",
      alt: "FTL Finance logo.",
      width: 1024,
      height: 314,
      format: "png",
      assetFolder: "ayres-mechanical-website/02-pages/financing",
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
      temporaryDemo: true,
      usageNotes: "Ductless partner badge; confirm credential status with ownership before removing demo flag.",
    },
    rheemDealer: {
      publicId: "Pro_Plumbing_Grey_Check",
      alt: "Rheem registered dealer credential mark.",
      width: 512,
      height: 173,
      format: "png",
      assetFolder: "ayres-mechanical-website/09-service-partners",
    },
    rheemProductLineup: {
      publicId: "rheem-hvac-product-lineup",
      alt: "Rheem residential HVAC equipment lineup.",
      width: 400,
      height: 228,
      format: "png",
      assetFolder: "ayres-mechanical-website/09-service-partners",
    },
  },
  ui: {
    coldBg: assets.coldBg,
    hotBg: assets.hotBg,
    freshAirBg: assets.freshAirBg,
    fanFreshAir: assets.fanFreshAir,
  },
  /** Page-level slots (heroes, supporting figures) — prefer these in service content. */
  pages: {
    airConditioning: {
      hero: assets.amServicesHvac,
      supporting: assets.rheemCentralAcInstalled,
    },
    heating: {
      hero: assets.amHeatingService,
    },
    commercial: {
      hero: assets.amRooftopUnitServices,
      supporting: assets.commercialRooftopHvacStockPhoto,
    },
    maintenance: {
      hero: assets.heatAmService,
      supporting: assets.systemsExplainer,
    },
    indoorAirQuality: {
      hero: assets.freshAirBg,
      supporting: assets.fanFreshAir,
    },
    ductless: {
      supporting: assets.ductlessSupportingGx,
    },
    industrial: {
      hero: assets.industrialAm,
    },
    emergency: {
      /** Temporary fallback: real emergency photo pending license review of `hvac-repair-redding-ca`. Replace with approved photo before launch. */
      hero: assets.amServicesHvac,
    },
  },
  services: {
    airConditioningRheemInstalled: assets.rheemCentralAcInstalled,
    commercialHelicopterRoof: assets.helicopterIndustrialRoof,
    commercialRooftopHvacStockPhoto: assets.commercialRooftopHvacStockPhoto,
    maintenanceSystemsExplainer: assets.systemsExplainer,
    ductlessSupportingGx: assets.ductlessSupportingGx,
    commercialHeloAndVan: {
      publicId: "helo-and-van",
      alt: "Ayres Mechanical service van on site near helicopter heavy-lift HVAC work.",
      width: 960,
      height: 720,
      format: "jpg",
      assetFolder: "ayres-mechanical-website/03-services/commercial-hvac",
      usageNotes: "Optional extra commercial proof — not in the current slot map.",
    },
    ductlessWallHead: {
      publicId: "small_MHK_2_wall_b9fcc3fbf9",
      alt: "Wall-mounted Mitsubishi-style ductless indoor head unit.",
      width: 500,
      height: 441,
      format: "jpg",
      assetFolder: "ayres-mechanical-website/03-services/air-conditioning",
      usageNotes: "Optional ductless detail — not in the current slot map.",
    },
    commercialRoofIndustrial: {
      publicId: "roof-industrial-with-crane",
      alt: "Industrial roofline with crane activity during mechanical installation.",
      width: 1256,
      height: 1251,
      format: "png",
      assetFolder: "ayres-mechanical-website/03-services/commercial-hvac",
    },
  },
  locations: {
    /** Alias of `serviceArea.map` for older imports. */
    serviceLocationsMap: assets.serviceLocationsMap,
  },
} satisfies {
  brand: Record<string, CloudinaryMediaAsset>;
  home: Record<string, CloudinaryMediaAsset>;
  about: Record<string, CloudinaryMediaAsset>;
  serviceArea: Record<string, CloudinaryMediaAsset>;
  financing: Record<string, CloudinaryMediaAsset>;
  partners: Record<string, CloudinaryMediaAsset>;
  ui: Record<string, CloudinaryMediaAsset>;
  pages: {
    airConditioning: { hero: CloudinaryMediaAsset; supporting: CloudinaryMediaAsset };
    heating: { hero: CloudinaryMediaAsset };
    commercial: { hero: CloudinaryMediaAsset; supporting: CloudinaryMediaAsset };
    maintenance: { hero: CloudinaryMediaAsset; supporting: CloudinaryMediaAsset };
    indoorAirQuality: { hero: CloudinaryMediaAsset; supporting: CloudinaryMediaAsset };
    ductless: { supporting: CloudinaryMediaAsset };
    industrial: { hero: CloudinaryMediaAsset };
    emergency: { hero: CloudinaryMediaAsset };
  };
  services: Record<string, CloudinaryMediaAsset>;
  locations: Record<string, CloudinaryMediaAsset>;
};
