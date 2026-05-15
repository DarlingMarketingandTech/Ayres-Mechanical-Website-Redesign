import { HomeSectionHeading } from "@/components/home/SectionEyebrow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { getVisiblePartnerBadges, PARTNER_TRUST_STRIP_ENABLED } from "@/content/partners";

type PartnerTrustStripProps = {
  /** Preview marks awaiting owner approval — never enable in production. */
  includePendingReview?: boolean;
};

/**
 * Controlled partner credential strip.
 * Badges render only when `ownerApproved` is true in `src/content/partners.ts`
 * unless `includePendingReview` is used for internal review builds.
 */
export function PartnerTrustStrip({ includePendingReview = false }: PartnerTrustStripProps) {
  if (!PARTNER_TRUST_STRIP_ENABLED) {
    return null;
  }

  const badges = getVisiblePartnerBadges({ includePendingReview });
  if (badges.length === 0) {
    return null;
  }

  return (
    <Section className="border-t border-brand-blue-dark/8 bg-muted/25 py-12 lg:py-14">
      <Container>
        {/* owner-approval: confirm partner logo usage and placement before launch */}
        <HomeSectionHeading
          eyebrow="PARTNERS & CREDENTIALS"
          title="Equipment and financing partners."
          description="Displayed only after owner approval—toggle visibility in src/content/partners.ts."
          className="mb-8 max-w-xl"
        />
        <ul
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 rounded-2xl border border-border/80 bg-white/80 px-6 py-8 shadow-sm ring-1 ring-brand-blue-dark/5 sm:gap-x-12 sm:px-10"
          aria-label="Partner and credential marks"
        >
          {badges.map((badge) => (
            <li key={badge.id} className="flex shrink-0 items-center justify-center">
              <CloudinaryImage
                assetKey={badge.assetId}
                preset="badge"
                sizes="(min-width: 1024px) 200px, 40vw"
                className="h-auto max-h-[56px] w-auto max-w-[min(100%,220px)] object-contain opacity-90 grayscale-[0.15] transition-opacity hover:opacity-100 sm:max-h-[64px]"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
