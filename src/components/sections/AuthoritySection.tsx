import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { media } from "@/content/media";

const teamAsset = media.about.ownerTeam;
const rheemAsset = media.partners.rheemDealer;
const mitsubishiAsset = media.partners.mitsubishi;

export function AuthoritySection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-brand-ice ring-1 ring-border lg:grid lg:grid-cols-2">
          {/* Team photo */}
          <div className="relative min-h-[260px] bg-muted sm:min-h-[320px] lg:min-h-[480px]">
            <CloudinaryImage
              asset={teamAsset}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>

          {/* Copy + logos */}
          <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">
                Family-Owned &amp; Operated
              </p>
              <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
                A Family-Run Business Built on Practical Diagnostics.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                Since 2007, Brian and Sabra Ayres have served Central Indiana with honest diagnostics,
                practical repairs, and dependable follow-through—not high-pressure sales.
              </p>
              <p className="mt-3 text-sm font-bold text-brand-blue-dark">
                4.9 stars across six counties—the standard we hold on every call.
              </p>
            </div>

            {/* Elite certifications */}
            <div className="border-t border-border pt-6" aria-label="Elite partner certifications">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-red">
                Elite Certifications
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                As a Rheem Dealer and a Mitsubishi Diamond Contractor, we are factory-trained to provide the highest level of installation and service available today.
              </p>
              <div className="mt-5 grid max-w-sm grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border sm:p-5">
                  <CloudinaryImage
                    asset={rheemAsset}
                    disableLqip
                    width={rheemAsset.width}
                    height={rheemAsset.height}
                    sizes="150px"
                    className="h-auto max-h-[48px] w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border sm:p-5">
                  <CloudinaryImage
                    asset={mitsubishiAsset}
                    disableLqip
                    width={mitsubishiAsset.width}
                    height={mitsubishiAsset.height}
                    sizes="150px"
                    className="h-auto max-h-[48px] w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
