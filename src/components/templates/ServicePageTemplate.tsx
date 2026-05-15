import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/components/seo/schema";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/sections/MotionReveal";
import { AnimatedCardGrid } from "@/components/sections/AnimatedCardGrid";
import { ServiceHero } from "@/components/sections/Hero";
import { buttonVariants } from "@/components/ui/button";
import type { ServiceContent } from "@/data/services-content";
import { getServiceContentBySlug } from "@/data/services-content";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ArrowRight, Phone, Sparkles } from "lucide-react";

const calloutToneClasses = {
  tip: "border-primary/30 bg-primary/[0.08] text-brand-blue-dark",
  safety: "border-brand-red/20 bg-brand-red/[0.08] text-brand-blue-dark",
  business: "border-brand-blue-dark/12 bg-brand-blue-dark text-white",
  assurance: "border-brand-blue-dark/15 bg-brand-ice text-brand-blue-dark",
} as const;

const iconAccentClasses = {
  red: "bg-accent text-brand-red",
  blue: "bg-secondary text-primary",
  dark: "bg-brand-blue-dark text-white",
} as const;

export function ServicePageTemplate({ service }: { service: ServiceContent }) {
  const related = service.relatedServices.map(getServiceContentBySlug).filter(Boolean) as ServiceContent[];

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: routes.home }, { name: "Services", url: routes.services }, { name: service.title, url: routes.service(service.slug) }])} />
      <ServiceHero eyebrow={service.eyebrow} title={service.heroTitle} description={service.summary} accent={service.accent} />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <MotionReveal>
            <div className="rounded-[2rem] border border-border/70 bg-white p-7 shadow-sm sm:p-8">
              <ServiceIcon icon={service.icon} className={iconAccentClasses[service.accent]} />
              <p className="mt-6 text-sm font-black uppercase tracking-[0.24em] text-brand-red">What we help with</p>
              <h2 className="mt-3 text-4xl font-black text-balance text-brand-blue-dark">{service.title}</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{service.intro}</p>
              <div className="mt-6 rounded-2xl bg-brand-ice p-5">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-blue-dark/65">Built for practical diagnostics</p>
                <p className="mt-3 leading-7 text-brand-blue-dark">
                  Every visit is designed to identify the root issue, explain the options clearly, and move you toward a dependable repair or replacement path.
                </p>
              </div>
            </div>
          </MotionReveal>
          <MotionReveal>
            <div className="rounded-[2rem] border border-border/70 bg-brand-blue-dark p-7 text-white shadow-sm sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-white/60">Need service now?</p>
              <h2 className="mt-3 text-3xl font-black text-balance">Get a direct path to answers, scheduling, and support.</h2>
              <p className="mt-4 leading-8 text-white/75">
                Whether you are dealing with comfort loss, rising utility bills, or equipment that seems slightly off, Ayres Mechanical helps you move from uncertainty to a clear next step.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "justify-center")}>
                  Request Service
                  <ArrowRight aria-hidden="true" />
                </Link>
                <a href={phoneHref} className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "justify-center")}>
                  <Phone aria-hidden="true" />
                  Call 317-538-9837
                </a>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </Section>
      <Section className="bg-brand-ice">
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">What We Help With</p>
            <h2 className="mt-3 text-4xl font-black text-balance text-brand-blue-dark">Direct support for the parts of the system that matter most.</h2>
          </div>
          <AnimatedCardGrid items={service.whatWeHelpWith} />
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Common Problems Solved</p>
            <h2 className="mt-3 text-4xl font-black text-balance text-brand-blue-dark">Clear diagnostics for the issues customers notice first.</h2>
          </div>
          <AnimatedCardGrid items={service.commonProblems} />
        </Container>
      </Section>
      {service.specialNote ? (
        <Section className="pt-0">
          <Container>
            <MotionReveal>
              <div className={cn("rounded-[2rem] border p-7 shadow-sm sm:p-8", calloutToneClasses[service.specialNote.tone])}>
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/85 text-brand-red shadow-sm">
                    <Sparkles className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className={cn("text-sm font-black uppercase tracking-[0.22em]", service.specialNote.tone === "business" ? "text-white/60" : "text-brand-red")}>{service.specialNote.label}</p>
                    <p className={cn("mt-3 text-lg leading-8", service.specialNote.tone === "business" ? "text-white/85" : "text-muted-foreground")}>{service.specialNote.text}</p>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </Container>
        </Section>
      ) : null}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Why Ayres Mechanical</p>
            <h2 className="mt-3 text-4xl font-black text-balance text-brand-blue-dark">{service.closingCTA.title}</h2>
            <p className="mt-5 leading-8 text-muted-foreground">{service.closingCTA.description}</p>
            {service.closingCTA.subtext ? <p className="mt-5 text-sm font-bold text-brand-red">{service.closingCTA.subtext}</p> : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {renderServiceAction({
                href: service.closingCTA.primaryHref,
                label: service.closingCTA.primaryLabel,
                variant: "emergency",
              })}
              {renderServiceAction({
                href: service.closingCTA.secondaryHref,
                label: service.closingCTA.secondaryLabel,
                variant: "outline",
              })}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={routes.service(item.slug)}
                className="rounded-[1.5rem] border border-border/70 bg-white p-5 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-red">Related Service</p>
                <h3 className="mt-3 text-xl font-black text-brand-blue-dark">{item.shortTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function renderServiceAction({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "emergency" | "outline";
}) {
  const className = buttonVariants({ variant, size: "lg" });

  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {label}
      <ArrowRight aria-hidden="true" />
    </Link>
  ) : (
    <a href={href} className={className}>
      <Phone aria-hidden="true" />
      {label}
    </a>
  );
}
