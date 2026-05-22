import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, ClipboardList, Wrench } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/components/seo/schema";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/Hero";
import { FAQSection } from "@/components/sections/FAQSection";
import { CommercialAssetCalculator } from "@/components/sections/CommercialAssetCalculator";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/content/media";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Commercial Maintenance Plans | Ayres Mechanical",
  description:
    "Planned HVAC maintenance for offices, retail spaces, restaurants, multi-tenant buildings, and small facilities that need fewer emergency calls, clearer equipment history, and more predictable service planning.",
  path: routes.commercialMaintenancePlans,
});

const audienceCards = [
  "Office buildings and professional spaces",
  "Retail stores and restaurants",
  "Property managers and multi-tenant buildings",
  "Light industrial and warehouse facilities",
];

const visitIncludes = [
  {
    title: "Seasonal service planning",
    description: "Coordinate cooling and heating maintenance before peak demand hits the building.",
    icon: CalendarDays,
  },
  {
    title: "Equipment condition notes",
    description: "Track aging RTUs, split systems, filters, coils, and known wear points more clearly.",
    icon: ClipboardList,
  },
  {
    title: "Practical repair follow-up",
    description: "Prioritize the fixes that affect building comfort, uptime, and repeat service calls first.",
    icon: Wrench,
  },
  {
    title: "Business-hour coordination",
    description: "Plan service around tenant, staff, and customer schedules when the job allows.",
    icon: Building2,
  },
];

const planningBenefits = [
  "Fewer surprise breakdowns during business hours",
  "Clearer equipment history between visits",
  "More consistent filter, coil, and seasonal service cadence",
  "Better visibility into which systems need attention next",
];

const buildingInfo = [
  "How many systems or rooftop units are in the building",
  "Approximate age of the equipment",
  "Any recurring comfort complaints or nuisance breakdowns",
  "Preferred service windows and tenant/business-hour constraints",
];

const faqs = [
  {
    question: "What is included in a commercial maintenance plan?",
    answer:
      "Plans are built around the building and equipment, but they commonly include seasonal service, filter and airflow review, coil and electrical inspections, and equipment condition notes for follow-up planning.",
  },
  {
    question: "Do you work on rooftop units?",
    answer:
      "Yes. Ayres Mechanical services rooftop units along with common commercial split-system equipment used in offices, retail buildings, restaurants, and light industrial spaces.",
  },
  {
    question: "Can planned maintenance reduce emergency calls?",
    answer:
      "It cannot prevent every breakdown, but scheduled maintenance often catches wear, airflow issues, and coil or electrical problems before they turn into a business-disrupting outage.",
  },
  {
    question: "What should I have ready before requesting a plan?",
    answer:
      "It helps to know the building address, number of systems, approximate equipment age, and any recurring comfort or reliability issues you want reviewed first.",
  },
];

export default function CommercialMaintenancePlansPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <PageHero
        eyebrow="Commercial Maintenance Plans"
        title="Commercial Maintenance Plans for HVAC Systems"
        description="Planned HVAC maintenance for offices, retail spaces, restaurants, multi-tenant buildings, and small facilities that need fewer emergency calls, clearer equipment history, and more predictable service planning."
        backgroundImage={media.commercialPortal.hero}
        backgroundPriority
        backgroundDeliveryWidth={1600}
        backgroundImageClassName="object-[center_36%]"
        photoOverlay="navy-strong"
        heroActions={{
          primary: { href: routes.requestService, label: "Request Commercial Service" },
          secondary: { href: routes.commercial, label: "View Commercial HVAC Service" },
        }}
      />

      <Section>
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Who this is for</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
              Planned support for buildings that need steady comfort and fewer emergencies.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Ayres Mechanical helps business owners, property managers, and facility teams keep systems more reliable with seasonal service, RTU support, and clearer follow-up on what needs attention next.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {audienceCards.map((item) => (
              <div key={item} className="rounded-3xl border border-border/70 bg-white p-6 font-black text-brand-blue-dark shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-ice">
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">What a visit can include</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
              Planned service should make the next HVAC decision easier.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {visitIncludes.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border/70 bg-white p-6 shadow-sm">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-black text-brand-blue-dark">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="rounded-[2rem] border border-border/70 bg-white p-7 shadow-sm sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Planned service vs. reactive calls</p>
            <h2 className="mt-3 text-3xl font-black text-balance text-brand-blue-dark sm:text-4xl">
              Planned maintenance gives you clearer building decisions before a breakdown interrupts the workday.
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              Instead of waiting for a system failure, planned service helps you keep up with seasonal visits, identify problem equipment earlier, and document what Ayres sees on the units that matter most.
            </p>
          </div>
          <div className="grid gap-4">
            {planningBenefits.map((item) => (
              <div key={item} className="rounded-3xl border border-border/70 bg-brand-ice p-5 font-bold text-brand-blue-dark shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CommercialAssetCalculator interactiveToolId="equipment-planning-calculator" />

      <Section className="bg-brand-ice">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">What Ayres needs to know</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
              A few building details help us recommend the right maintenance conversation.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              You do not need perfect records. A rough equipment count, building type, and a short description of the comfort or reliability issues are enough to start.
            </p>
          </div>
          <div className="grid gap-4">
            {buildingInfo.map((item) => (
              <div key={item} className="rounded-3xl border border-border/70 bg-white p-5 font-bold text-brand-blue-dark shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">FAQ</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
              Common questions about commercial maintenance plans.
            </h2>
          </div>
          <FAQSection faqs={faqs} />
        </Container>
      </Section>

      <Section className="bg-brand-carbon text-white">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/55">Request commercial maintenance</p>
            <h2 className="mt-3 text-3xl font-black text-balance sm:text-4xl">Request a commercial maintenance plan.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
              If your building needs seasonal service, clearer equipment history, or help reducing repeat HVAC interruptions, request commercial service and tell Ayres what systems need attention first.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "justify-center")}>
              Request Commercial Service
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href={routes.commercial} className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "justify-center")}>
              View Commercial HVAC Service
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
