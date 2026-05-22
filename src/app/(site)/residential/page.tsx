import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { FinancingPromoSection } from "@/components/sections/FinancingPromoSection";
import { PageHero } from "@/components/sections/Hero";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/content/media";
import { getServiceBySlug, type Service } from "@/content/services";
import { serviceSlugs } from "@/data/services-content";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Residential HVAC Services | Ayres Mechanical",
  description:
    "Heating, cooling, maintenance, ductless, indoor air quality, and emergency HVAC service for Central Indiana homes.",
  path: routes.residential,
});

const residentialServices = [
  serviceSlugs.heating,
  serviceSlugs.airConditioning,
  serviceSlugs.ductless,
  serviceSlugs.indoorAirQuality,
  serviceSlugs.preventiveMaintenance,
  serviceSlugs.twentyFourHourEmergency,
]
  .map(getServiceBySlug)
  .filter((service): service is Service => Boolean(service));

const decisionSupport = [
  "Repair when repair makes sense.",
  "Replace when replacement protects comfort and budget.",
  "Maintain before the season gets extreme.",
  "Improve airflow and indoor air quality.",
];

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="Residential HVAC"
        title="Heating & Cooling Service for Central Indiana Homes"
        description="Practical repair, replacement, maintenance, and indoor comfort help from a local HVAC team that explains the work clearly."
        backgroundImage={media.home.localProof}
        backgroundPriority
        photoOverlay="navy-strong"
        heroActions={{
          primary: { href: routes.requestService, label: "Request Residential Service" },
          secondary: { href: phoneHref, label: "Call Now" },
        }}
      />

      <Section>
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Homeowner service paths</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
              Choose the comfort problem you want to solve first.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Residential service stays warm, practical, and focused on helping homeowners make confident decisions.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {residentialServices.map((service) => (
              <Link
                key={service.slug}
                href={routes.service(service.slug)}
                className="group flex h-full flex-col rounded-3xl border border-border/70 bg-white p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-blue-dark/55">Residential HVAC</p>
                <h3 className="mt-3 text-2xl font-black text-brand-blue-dark transition-colors group-hover:text-brand-red">
                  {service.shortTitle}
                </h3>
                <p className="mt-3 flex-1 leading-7 text-muted-foreground">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand-blue-dark group-hover:text-brand-red">
                  View {service.shortTitle}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-ice">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white bg-white shadow-sm">
            <CloudinaryImage
              asset={media.about.familyTeam}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              aspectRatio="4:3"
              className="object-cover object-center"
              crop="fill"
              gravity="auto"
            />
            <figcaption className="sr-only">{media.about.familyTeam.alt}</figcaption>
          </figure>
          <div className="rounded-[2rem] border border-border/70 bg-white p-7 shadow-sm sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">How Ayres helps homeowners decide</p>
            <h2 className="mt-3 text-3xl font-black text-balance text-brand-blue-dark sm:text-4xl">
              Clear options before the work starts.
            </h2>
            <div className="mt-6 grid gap-4">
              {decisionSupport.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-secondary p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="font-semibold leading-7 text-brand-blue-dark">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <FinancingPromoSection variant="service" />

      <Section className="pt-0">
        <Container>
          <div className="rounded-3xl border border-brand-blue-dark/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-blue-dark/55">Need help choosing?</p>
            <h2 className="mt-3 text-3xl font-black text-brand-blue-dark">Start with residential HVAC service.</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              Tell the team what is happening, when you need help, and whether this is repair, replacement, maintenance, or comfort planning.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "justify-center")}>
                Request Residential Service
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a href={phoneHref} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "justify-center")}>
                Call Now
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Ready to schedule residential HVAC service?"
        description="Request practical heating, cooling, maintenance, ductless, indoor air quality, or emergency help for your Central Indiana home."
      />
    </>
  );
}
