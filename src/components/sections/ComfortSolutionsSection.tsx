import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { media } from "@/content/media";

const rheemAsset = media.partners.rheemDealer;
const mitsubishiAsset = media.partners.mitsubishi;

export function ComfortSolutionsSection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Comfort &amp; efficiency</p>
            <h2 className="mt-3 text-4xl font-black text-brand-blue-dark">
              Expert Comfort Solutions Tailored to Your Home and Budget
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              At Ayres Mechanical, we specialize in designing the perfect climate control systems for your home or
              business. A properly designed system doesn&apos;t just keep you comfortable—it maximizes energy efficiency,
              putting money back in your pocket.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              We are proud to be a Mitsubishi Diamond Contractor, specializing in high-efficiency ductless options, and a
              registered Rheem dealer. Because both brands offer a wide range of equipment, we can customize a solution
              that meets your efficiency goals without breaking your budget.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center justify-start gap-8 rounded-2xl bg-brand-ice px-6 py-8 ring-1 ring-border lg:flex-col lg:justify-center lg:px-8"
            aria-label="Authorized equipment partners"
          >
            <CloudinaryImage
              asset={rheemAsset}
              disableLqip
              width={rheemAsset.width}
              height={rheemAsset.height}
              sizes="(min-width: 1024px) 280px, 45vw"
              className="h-auto max-h-[72px] w-[min(100%,240px)] object-contain object-left lg:object-center"
            />
            <CloudinaryImage
              asset={mitsubishiAsset}
              disableLqip
              width={mitsubishiAsset.width}
              height={mitsubishiAsset.height}
              sizes="(min-width: 1024px) 280px, 45vw"
              className="h-auto max-h-[80px] w-[min(100%,260px)] object-contain object-left lg:object-center"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
