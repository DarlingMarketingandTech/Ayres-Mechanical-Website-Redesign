import { ProofMediaBlock } from "@/components/sections/ProofMediaBlock";
import { media } from "@/content/media";

const LOCAL_TRUST_POINTS = [
  "Local Central Indiana service",
  "Residential, commercial, and industrial HVAC",
  "Emergency service available if owner-approved",
  "Clear communication before work begins",
];

export function LocalPresenceSection() {
  return (
    <ProofMediaBlock
      asset={media.home.workVan}
      eyebrow="LOCAL PRESENCE"
      title="Recognizable service across Central Indiana."
      description="Ayres Mechanical operates where homeowners and facility managers already know the roads—dispatching from a local footprint with branded fleet presence, not generic stock imagery."
      proofPoints={LOCAL_TRUST_POINTS}
      caption="Ayres Mechanical service van"
    />
  );
}
