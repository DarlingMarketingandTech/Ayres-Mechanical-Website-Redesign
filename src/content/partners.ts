import { CLOUDINARY_ASSETS, type CloudinaryAssetId } from "@/lib/cloudinary-assets";

/** Master switch for the homepage partner strip — set false to hide the entire band. */
export const PARTNER_TRUST_STRIP_ENABLED = true;

export type PartnerBadgeConfig = {
  id: string;
  assetId: CloudinaryAssetId;
  label: string;
  /** Registry `ownerApproved` — badge renders only when true unless `showWhenPendingReview` is set. */
  ownerApproved: boolean;
  /** Dev/staging preview of marks awaiting owner sign-off. Do not enable in production. */
  showWhenPendingReview?: boolean;
};

/**
 * Partner credential marks for controlled trust surfaces.
 * Toggle visibility per badge before launch; confirm usage rights with the owner.
 */
export const partnerBadges: PartnerBadgeConfig[] = [
  {
    id: "ftl-finance",
    assetId: "ftlFinanceLogo1024",
    label: "FTL Finance",
    ownerApproved: CLOUDINARY_ASSETS.ftlFinanceLogo1024.ownerApproved ?? false,
  },
  {
    id: "mitsubishi-diamond",
    assetId: "mitsubishiDiamondContractor",
    label: "Mitsubishi Diamond Contractor",
    ownerApproved: CLOUDINARY_ASSETS.mitsubishiDiamondContractor.ownerApproved ?? false,
  },
  {
    id: "rheem-lineup",
    assetId: "rheemHvacWaterHeaterProductLineup",
    label: "Rheem HVAC and water heating",
    ownerApproved: CLOUDINARY_ASSETS.rheemHvacWaterHeaterProductLineup.ownerApproved ?? false,
  },
  {
    id: "pro-plumbing-check",
    assetId: "rheemRegisteredDealerGreyCheck",
    label: "Professional credential mark",
    ownerApproved: CLOUDINARY_ASSETS.rheemRegisteredDealerGreyCheck.ownerApproved ?? false,
  },
];

export function getVisiblePartnerBadges(options?: { includePendingReview?: boolean }) {
  const includePending = options?.includePendingReview ?? false;
  return partnerBadges.filter((badge) => badge.ownerApproved || (includePending && badge.showWhenPendingReview));
}
