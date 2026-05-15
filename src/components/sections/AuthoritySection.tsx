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
              <p className="mt-4 leading-8 text-muted-foreground">
                We don&apos;t believe in high-pressure sales. We believe in finding the most efficient,
                cost-effective path to get your system running again. For over 20 years, Brian and Sabra
                Ayres have served Central Indiana homes and businesses with honest diagnostics and
                dependable follow-through.
              </p>
              <p className="mt-4 leading-8 text-muted-foreground">
                Our 4.9-star rating across six counties reflects the trust our neighbors have placed in
                us—and the standard we hold ourselves to on every call.
              </p>
            </div>

            {/* Partner logos */}
            <div
              className="flex flex-wrap items-center gap-8 border-t border-border pt-6"
              aria-label="Authorized equipment partners"
            >
              <CloudinaryImage
                asset={rheemAsset}
                disableLqip
                width={rheemAsset.width}
                height={rheemAsset.height}
                sizes="200px"
                className="h-auto max-h-[56px] w-[min(100%,180px)] object-contain object-left"
              />
              <CloudinaryImage
                asset={mitsubishiAsset}
                disableLqip
                width={mitsubishiAsset.width}
                height={mitsubishiAsset.height}
                sizes="200px"
                className="h-auto max-h-[64px] w-[min(100%,200px)] object-contain object-left"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
