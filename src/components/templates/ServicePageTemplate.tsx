import Link from "next/link";

import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/components/seo/schema";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/sections/MotionReveal";
import { AnimatedCardGrid } from "@/components/sections/AnimatedCardGrid";
import { ServiceHero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/content/media";
import type { ServiceContent } from "@/data/services-content";
import { getServiceContentBySlug } from "@/data/services-content";
import { siteConfig } from "@/content/site";
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

function renderProofGallery({
  service,
}: {
  service: ServiceContent;
}) {
  if (!service.media?.heroGallery?.length && !service.media?.showMitsubishiDemoBadge) return null;

  return (
    <Section className="border-b border-border/60 bg-brand-ice py-8 sm:py-10">
      <Container>
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-blue-dark/60">Supporting image &amp; proof</p>
            <h2 className="mt-2 max-w-2xl text-2xl font-black text-balance text-brand-blue-dark sm:text-3xl">What this service looks like on real Central Indiana jobs.</h2>
          </div>
          {service.media?.showMitsubishiDemoBadge ? (
            <div className="flex max-w-sm flex-col gap-2 rounded-2xl border border-border/70 bg-white p-4 shadow-sm">
              <CloudinaryImage
                asset={media.partners.mitsubishi}
                disableLqip
                width={media.partners.mitsubishi.width}
                height={media.partners.mitsubishi.height}
                sizes="200px"
                className="h-auto max-h-14 w-[min(100%,220px)] object-contain object-left"
              />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Mitsubishi badge shown for demo layout only — confirm final credential usage with Ayres ownership before publishing compliance claims.
              </p>
            </div>
          ) : null}
        </div>
        {service.media?.heroGallery?.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {service.media.heroGallery.map((asset) => (
              <figure
                key={asset.publicId}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm sm:aspect-[16/10]"
              >
                <CloudinaryImage
                  asset={asset}
                  fill
                  sizes="(min-width: 640px) 45vw, 100vw"
                  aspectRatio="16:10"
                  className="object-cover object-center"
                  crop="fill"
                  gravity="auto"
                />
                <figcaption className="sr-only">{asset.alt}</figcaption>
              </figure>
            ))}
          </div>
        ) : service.media?.showMitsubishiDemoBadge ? (
          <div className="flex max-w-2xl flex-col gap-3 rounded-2xl border border-border/70 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:gap-6">
            <CloudinaryImage
              asset={media.partners.mitsubishi}
              disableLqip
              width={media.partners.mitsubishi.width}
              height={media.partners.mitsubishi.height}
              sizes="200px"
              className="h-auto max-h-16 w-[min(100%,240px)] object-contain object-left"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Mitsubishi badge shown for demo layout only — confirm final credential usage with Ayres ownership before publishing compliance claims.
            </p>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

export function ServicePageTemplate({ service }: { service: ServiceContent }) {
  const related = service.relatedServices.map(getServiceContentBySlug).filter(Boolean) as ServiceContent[];

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: routes.home }, { name: "Services", url: routes.services }, { name: service.title, url: routes.service(service.slug) }])} />
      <ServiceHero
        eyebrow={service.eyebrow}
        title={service.heroTitle}
        description={service.summary}
        accent={service.accent}
        backgroundImage={service.media?.heroBackground}
        photoOverlay={service.media?.heroPhotoOverlay}
        backgroundPriority
        backgroundDeliveryWidth={service.media?.heroDeliveryWidth}
        backgroundImageClassName={service.media?.heroImageClassName}
      />
      <TrustBar />

      <Section>
        <Container>
          <MotionReveal>
            <div className="rounded-[2rem] border border-border/70 bg-white p-7 shadow-sm sm:p-8">
              <ServiceIcon icon={service.icon} className={iconAccentClasses[service.accent]} />
              <p className="mt-6 text-sm font-black uppercase tracking-[0.24em] text-brand-blue-dark/60">What we help with</p>
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
          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-blue-dark/60">How we support you</p>
            <h3 className="mt-3 text-2xl font-black text-balance text-brand-blue-dark sm:text-3xl">Direct support for the parts of the system that matter most.</h3>
          </div>
          <div className="mt-8">
            <AnimatedCardGrid items={service.whatWeHelpWith} />
          </div>
        </Container>
      </Section>

      {renderProofGallery({ service })}

      {service.media?.contentIllustration ? (
        <Section className="py-8 sm:py-10">
          <Container>
            <figure className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-sm">
              <div className="relative aspect-[16/10] w-full sm:aspect-[4/3]">
                <CloudinaryImage
                  asset={service.media.contentIllustration}
                  fill
                  sizes="(min-width: 1024px) 900px, 100vw"
                  aspectRatio="16:10"
                  className="object-cover object-center"
                  crop="fill"
                  gravity="auto"
                />
              </div>
              <figcaption className="border-t border-border/60 px-5 py-4 text-sm text-muted-foreground">{service.media.contentIllustration.alt}</figcaption>
            </figure>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-blue-dark/60">Common problems</p>
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

      <Section className="bg-brand-carbon text-white">
        <Container className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-white/60">Need service now?</p>
          <h2 className="mt-3 text-3xl font-black text-balance sm:text-4xl">{service.closingCTA.title}</h2>
          <p className="mt-5 text-(length:--text-lead) leading-relaxed text-white/85">{service.closingCTA.description}</p>
          {service.closingCTA.subtext ? <p className="mt-4 text-sm font-bold text-brand-ice/90">{service.closingCTA.subtext}</p> : null}
          <div className="mt-8 hidden w-full flex-col gap-3 lg:flex lg:flex-row lg:flex-wrap">
            {renderServiceAction({
              href: service.closingCTA.primaryHref,
              label: service.closingCTA.primaryLabel,
              variant: "emergency",
            })}
            {renderServiceAction({
              href: service.closingCTA.secondaryHref,
              label: service.closingCTA.secondaryLabel,
              variant: "inverse",
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-ice">
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-blue-dark/60">Related services</p>
            <h2 className="mt-3 text-3xl font-black text-balance text-brand-blue-dark sm:text-4xl">Keep exploring the right next step.</h2>
            <p className="mt-3 text-muted-foreground">Prefer answers first? See common questions on the homepage FAQ, or jump to a related service below.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={routes.service(item.slug)}
                className="rounded-[1.5rem] border border-border/70 bg-white p-5 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-blue-dark/60">Related service</p>
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
  variant: "emergency" | "inverse";
}) {
  const className = cn(buttonVariants({ variant, size: "lg" }), "min-h-12 w-full justify-center sm:w-auto");

  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {label}
      <ArrowRight aria-hidden="true" />
    </Link>
  ) : (
    <a href={href} className={className} aria-label={label === "Call Now" ? `Call now at ${siteConfig.phone}` : undefined}>
      <Phone aria-hidden="true" />
      {label}
    </a>
  );
}
