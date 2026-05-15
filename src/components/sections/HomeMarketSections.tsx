import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { BrandPattern } from "@/components/brand/BrandPattern";
import { HomeSectionHeading } from "@/components/home/SectionEyebrow";
import { SectionDivider } from "@/components/home/SectionDivider";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { buttonVariants } from "@/components/ui/button";
import { commercialCapabilityCards } from "@/content/home-commercial";
import { industries } from "@/content/industries";
import { media } from "@/content/media";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

function industryBySlug(slug: string) {
  const found = industries.find((i) => i.slug === slug);
  if (!found) {
    throw new Error("Missing industry: " + slug);
  }
  return found;
}

const OWNER_ACCOUNTABILITY_POINTS = [
  "Direct accountability from ownership—not a distant call center.",
  "Residential, commercial, and industrial paths stay clearly separated.",
  "Emergency availability when approved and appropriate for the job.",
  "Options explained before work proceeds so you can decide with confidence.",
];

export function OwnerOperatedHomeSection() {
  const residential = industryBySlug("residential");
  const commercial = industryBySlug("commercial");

  return (
    <Section className="relative overflow-hidden bg-brand-blue-dark text-white">
      <BrandPattern variant="dark" />
      <Container className="relative">
        <SectionDivider variant="onDark" className="mb-8 max-w-2xl opacity-90" />
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="order-2 lg:order-1">
            <HomeSectionHeading
              light
              eyebrow="OWNER OPERATED"
              title="Owner-operated service with real accountability."
              description="Ayres Mechanical is led by people who stand behind the work—clear communication, practical recommendations, and service paths that match whether you are at home, on a job site, or running a facility."
            />
            <ul className="mt-8 space-y-3">
              {OWNER_ACCOUNTABILITY_POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-sm font-bold leading-6 text-white/88">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs leading-relaxed text-white/55">
              {/* owner-approval: confirm founding year, tenure claims, and emergency availability copy before launch */}
              Any founding year, tenure, or emergency-service claims on this site should be owner-confirmed before
              publication.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={routes.industry(residential.slug)}
                className={cn(buttonVariants({ variant: "inverse", size: "sm" }), "font-black")}
              >
                Residential services
              </Link>
              <Link
                href={routes.industry(commercial.slug)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "border-white/35 bg-transparent text-white hover:bg-white/10",
                )}
              >
                Commercial HVAC
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-3xl shadow-[0_20px_50px_rgb(0_0_0_/0.35)] ring-1 ring-white/15">
              <CloudinaryImage
                asset={media.about.ownerTeam}
                preset="team"
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="aspect-4/5 w-full object-cover object-[center_20%] sm:aspect-square lg:aspect-5/6"
              />
              <p className="border-t border-white/10 bg-brand-blue-dark/80 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                Ayres Mechanical leadership team
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function CommercialHvacHomeSection() {
  const commercial = industryBySlug("commercial");

  return (
    <Section className="bg-linear-to-br from-white via-brand-ice/90 to-background">
      <Container>
        <SectionDivider className="mb-6 max-w-2xl" />
        <HomeSectionHeading
          eyebrow="COMMERCIAL & INDUSTRIAL"
          title="Serious HVAC capability for buildings that cannot afford downtime."
          description={commercial.description}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {commercialCapabilityCards.map((card) => (
            <article
              key={card.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-brand-blue-dark/10 bg-white shadow-sm ring-1 ring-brand-blue-dark/5"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-muted">
                <CloudinaryImage
                  assetKey={card.assetId}
                  preset="commercial"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-black leading-snug text-brand-blue-dark">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{card.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-brand-blue-dark/20 bg-brand-ice/50 p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-red">For businesses & facilities</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
              {commercial.painPoints.slice(0, 2).map((pt) => (
                <li key={pt} className="border-l-2 border-primary/35 pl-3">
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <Link href={routes.industry("commercial")} className={cn(buttonVariants({ variant: "default", size: "lg" }), "shrink-0")}>
            Commercial HVAC details
          </Link>
        </div>
      </Container>
    </Section>
  );
}
