import Link from "next/link";
import { ArrowRight, Building2, ClipboardCheck, MapPinned } from "lucide-react";

import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/Hero";
import { buttonVariants } from "@/components/ui/button";
import { media, type CloudinaryMediaAsset } from "@/content/media";
import { serviceSlugs } from "@/data/services-content";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Commercial HVAC Services | Ayres Mechanical",
  description:
    "Commercial HVAC diagnostics, rooftop unit service, maintenance planning, and facility support for Central Indiana businesses.",
  path: routes.commercial,
});

const serviceLanes = [
  {
    title: "Commercial HVAC Service",
    description: "Diagnostics, rooftop unit service, and building comfort support for active business spaces.",
    href: routes.commercialService,
  },
  {
    title: "Rooftop Units & Packaged Systems",
    description: "Practical RTU troubleshooting, repair planning, and condition review for facility teams.",
    href: routes.commercialService,
  },
  {
    title: "Industrial / Facility Support",
    description: "Support for operational spaces where comfort, airflow, and downtime risk matter.",
    href: routes.industrialFacilities,
  },
  {
    title: "Planned Maintenance",
    description: "Move from reactive calls to documented service cadence and equipment visibility.",
    href: routes.commercialPartnerships,
  },
  {
    title: "Emergency Commercial Response",
    description: "A clear service path when commercial HVAC problems disrupt operations.",
    href: routes.service(serviceSlugs.twentyFourHourEmergency),
  },
];

const priorities = [
  "Business continuity",
  "Maintenance planning",
  "Asset condition awareness",
  "Multi-site coordination",
  "Budget predictability",
];

const portalFit = [
  "Multiple facilities",
  "Multiple RTUs",
  "Recurring maintenance needs",
  "Property management portfolios",
  "Institutional or light industrial facilities",
  "Procurement or RFP-style review",
];

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial HVAC"
        title="Facility HVAC Support for Central Indiana Businesses"
        description="Commercial diagnostics, rooftop unit service, planned maintenance, and facility support for offices, retail, light industrial spaces, and multi-site properties."
        backgroundImage={media.pages.commercial.hero}
        backgroundPriority
        backgroundDeliveryWidth={1600}
        backgroundImageClassName="object-[center_36%]"
        photoOverlay="navy-strong"
        heroActions={{
          primary: { href: routes.commercialPartnerships, label: "Explore Commercial Partnerships" },
          secondary: { href: routes.requestService, label: "Request Commercial Service", external: false },
        }}
      />

      <Section>
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Commercial service lanes</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
              Support for the systems that keep your facility usable.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceLanes.map((lane) => (
              <Link
                key={lane.title}
                href={lane.href}
                className="group flex h-full flex-col rounded-3xl border border-border/70 bg-white p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-blue-dark/55">Commercial HVAC</p>
                <h3 className="mt-3 text-2xl font-black text-brand-blue-dark transition-colors group-hover:text-brand-red">{lane.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-muted-foreground">{lane.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand-blue-dark group-hover:text-brand-red">
                  {lane.title}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-ice">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
          <div className="rounded-[2rem] border border-border/70 bg-white p-7 shadow-sm sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Operational priorities</p>
            <h2 className="mt-3 text-3xl font-black text-balance text-brand-blue-dark sm:text-4xl">
              Commercial HVAC decisions affect more than comfort.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {priorities.map((priority) => (
                <div key={priority} className="rounded-2xl bg-secondary p-4 font-black text-brand-blue-dark">
                  {priority}
                </div>
              ))}
            </div>
          </div>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white bg-white shadow-sm">
            <CloudinaryImage
              asset={media.pages.commercial.supporting}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              aspectRatio="4:3"
              className="object-cover object-center"
              crop="fill"
              gravity="auto"
            />
            <figcaption className="sr-only">{media.pages.commercial.supporting.alt}</figcaption>
          </figure>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">When to use the portal</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
              Commercial Partnerships is for planned facility support.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Use the portal when your HVAC needs involve portfolios, recurring maintenance, procurement review, or lifecycle planning rather than a single repair call.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {portalFit.map((item) => (
                <div key={item} className="rounded-2xl border border-border/70 bg-white p-4 font-bold text-brand-blue-dark shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <CommercialProofCard icon={Building2} title="Office, retail, and multi-tenant buildings" image={media.pages.commercial.hero} />
            <CommercialProofCard icon={ClipboardCheck} title="Maintenance documentation and asset planning" image={media.pages.maintenance.supporting} />
            <CommercialProofCard icon={MapPinned} title="Central Indiana service coordination" image={media.serviceArea.map} />
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-carbon text-white">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/55">Commercial HVAC Partnerships</p>
            <h2 className="mt-3 text-3xl font-black text-balance sm:text-4xl">
              Managing a facility or portfolio? Build a commercial service plan.
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">
              Outline your footprint, equipment mix, and service priorities so Ayres Mechanical can prepare the right commercial follow-up.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href={routes.commercialPartnerships} className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "justify-center")}>
              Build a Commercial Service Plan
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href={routes.commercialService} className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "justify-center")}>
              Commercial HVAC Service
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

function CommercialProofCard({
  icon: Icon,
  title,
  image,
}: {
  icon: typeof Building2;
  title: string;
  image: CloudinaryMediaAsset;
}) {
  return (
    <div className="grid grid-cols-[92px_1fr] overflow-hidden rounded-3xl border border-border/70 bg-white shadow-sm">
      <div className="relative min-h-24">
        <CloudinaryImage asset={image} fill sizes="92px" aspectRatio="1:1" className="object-cover object-center" crop="fill" gravity="auto" />
      </div>
      <div className="flex items-center gap-3 p-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-ice text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <p className="font-black leading-6 text-brand-blue-dark">{title}</p>
      </div>
    </div>
  );
}
