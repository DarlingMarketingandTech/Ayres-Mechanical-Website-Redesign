import Link from "next/link";
import { ArrowRight, ClipboardList, FileCheck2, ShieldCheck } from "lucide-react";

import { CommercialIntakeWizard } from "@/components/forms/CommercialIntakeWizard";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CommercialAssetCalculator } from "@/components/sections/CommercialAssetCalculator";
import { CommercialSlaMatrix } from "@/components/sections/CommercialSlaMatrix";
import { PageHero } from "@/components/sections/Hero";
import { RegionalDispatchMatrix } from "@/components/sections/RegionalDispatchMatrix";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/content/media";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Commercial HVAC Partnerships | Ayres Mechanical",
  description:
    "Planned commercial HVAC service agreements, facility maintenance planning, RTU lifecycle support, and portfolio service coordination in Central Indiana.",
  path: routes.commercialPartnerships,
});

const priorityCards = [
  {
    title: "Business Continuity",
    description: "Reduce downtime, comfort complaints, and unplanned service interruptions.",
    icon: ShieldCheck,
  },
  {
    title: "CapEx Prediction",
    description: "Turn aging RTUs and maintenance history into clearer replacement planning.",
    icon: ClipboardList,
  },
  {
    title: "Liability & Compliance Readiness",
    description: "Keep documentation, maintenance cadence, and service records easier to manage.",
    icon: FileCheck2,
  },
];

const anchors = [
  { label: "SLA Planning", href: "#sla" },
  { label: "Asset Planning", href: "#asset-planning" },
  { label: "Dispatch Coverage", href: "#dispatch-coverage" },
  { label: "Commercial Intake", href: "#commercial-intake" },
];

export default function CommercialPartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Plans & Partnerships"
        title="Enterprise HVAC Fleet Operations & Operational Risk Mitigation for Central Indiana"
        description="Planned HVAC support for facility managers, property managers, procurement teams, and multi-site operators who need fewer surprises, clearer budgets, and faster response planning."
        backgroundImage={media.commercialPortal.hero}
        backgroundPriority
        backgroundDeliveryWidth={1600}
        backgroundImageClassName="object-[center_36%]"
        photoOverlay="navy-strong"
        heroActions={{
          primary: { href: "#commercial-intake", label: "Build Your Commercial Service Plan" },
          secondary: { href: routes.requestService, label: "Request Commercial Service", external: false },
        }}
      />

      <Section className="bg-brand-ice py-6 sm:py-8">
        <Container>
          <nav aria-label="Commercial partnerships page sections" className="overflow-x-auto">
            <ul className="flex min-w-max gap-3">
              {anchors.map((anchor) => (
                <li key={anchor.href}>
                  <a
                    href={anchor.href}
                    className="inline-flex rounded-full border border-brand-blue-dark/10 bg-white px-4 py-2 text-sm font-black text-brand-blue-dark shadow-sm transition-colors hover:bg-secondary"
                  >
                    {anchor.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Commercial planning priorities</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
              A commercial service plan should help you prevent surprises.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The portal is built for practical local service planning: equipment visibility, maintenance cadence, priority response conversations, and clearer follow-up for the facilities that matter most.
            </p>
          </div>
          <figure className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-sm">
            <CloudinaryImage
              asset={media.commercialPortal.rooftopProof}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              aspectRatio="4:3"
              className="object-cover object-center"
              crop="fill"
              gravity="auto"
            />
            <figcaption className="sr-only">{media.commercialPortal.rooftopProof.alt}</figcaption>
          </figure>
        </Container>
        <Container className="mt-8 grid gap-5 md:grid-cols-3">
          {priorityCards.map((card) => (
            <div key={card.title} className="rounded-3xl border border-border/70 bg-white p-6 shadow-sm">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-ice text-primary">
                <card.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-2xl font-black text-brand-blue-dark">{card.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </Container>
      </Section>

      <CommercialSlaMatrix />
      <CommercialAssetCalculator interactiveToolId="commercial-asset-calculator" />
      <RegionalDispatchMatrix />

      <Section id="commercial-intake" className="scroll-mt-28 bg-brand-carbon text-white">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/55">RFP Lite</p>
            <h2 className="mt-3 text-3xl font-black text-balance sm:text-4xl">
              Build Your Commercial Service Plan
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              Share your facility footprint, equipment mix, and preferred follow-up path. Ayres Mechanical will review the details and respond with the right commercial service conversation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href={routes.commercial} className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "justify-center")}>
                Commercial HVAC Services
              </Link>
              <Link href={routes.requestService} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "justify-center border-white/25 bg-white/5 text-white hover:bg-white/10")}>
                Request Commercial Service
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <CommercialIntakeWizard />
        </Container>
      </Section>
    </>
  );
}
