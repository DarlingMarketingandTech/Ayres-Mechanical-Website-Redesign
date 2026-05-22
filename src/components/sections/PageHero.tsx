import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { BrandPattern } from "@/components/brand/BrandPattern";
import { Container } from "@/components/layout/Container";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { HeroFadeDiv, HeroFadeH1, HeroFadeP, HeroStagger } from "@/components/sections/HeroMotion";
import { buttonVariants } from "@/components/ui/button";
import type { CloudinaryMediaAsset } from "@/content/media";
import { media } from "@/content/media";
import { siteConfig } from "@/content/site";
import { phoneOutlineCtaClassNames, requestServiceCtaClassNames } from "@/lib/cta-interactions";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const photoScrim = {
  "navy-strong": "bg-gradient-to-br from-brand-blue-dark via-brand-blue-dark/96 to-black/58",
  "navy-soft": "bg-gradient-to-t from-brand-blue-dark/90 via-brand-blue-dark/58 to-brand-blue-dark/40",
  "light-soft": "bg-gradient-to-b from-white/92 via-white/82 to-white/70",
  "light-blend": "bg-gradient-to-b from-white/85 via-white/68 to-white/52",
} as const;

export type PageHeroPhotoOverlay = keyof typeof photoScrim;

const lightPhotoOverlays = new Set<PageHeroPhotoOverlay>(["light-soft", "light-blend"]);

export type PageHeroHeroActions = {
  primary: { href: string; label: string };
  secondary: { href: string; label: string; external?: boolean };
};

export function PageHero({
  eyebrow,
  title,
  description,
  variant = "light",
  backgroundImage,
  backgroundPriority = false,
  photoOverlay = "none",
  backgroundDeliveryWidth,
  backgroundImageClassName,
  heroActions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  variant?: "light" | "dark" | "red";
  backgroundImage?: CloudinaryMediaAsset;
  backgroundPriority?: boolean;
  photoOverlay?: "none" | PageHeroPhotoOverlay;
  backgroundDeliveryWidth?: number;
  backgroundImageClassName?: string;
  heroActions?: PageHeroHeroActions;
}) {
  const dark = variant === "dark";
  const hasPhoto = Boolean(backgroundImage);
  const effectiveOverlay: PageHeroPhotoOverlay | null = !hasPhoto
    ? null
    : photoOverlay === undefined || photoOverlay === "none"
      ? "navy-strong"
      : photoOverlay;
  const forceLightForeground = Boolean(effectiveOverlay && !lightPhotoOverlays.has(effectiveOverlay));
  const patternVariant = hasPhoto && !forceLightForeground ? "blue" : dark ? "dark" : variant === "red" ? "red" : "blue";

  const deliveryW =
    backgroundDeliveryWidth ??
    (backgroundImage?.publicId === "cold-bg"
      ? 2400
      : backgroundImage?.publicId === "service_locations" || backgroundImage?.publicId === "pexels-katterinaaa-61454609-8065903"
        ? 2000
        : 1920);

  const deliveryH =
    backgroundImage && deliveryW ? Math.max(2, Math.round((backgroundImage.height / backgroundImage.width) * deliveryW)) : undefined;

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        hasPhoto ? "min-h-[220px] bg-brand-blue-dark sm:min-h-[260px]" : dark ? "bg-brand-blue-dark text-white" : "bg-white",
        hasPhoto && forceLightForeground ? "text-white" : !hasPhoto && dark ? "text-white" : "",
      )}
      data-mobile-cta-sentinel
    >
      {hasPhoto && backgroundImage ? (
        <>
          <div
            className={cn(
              "absolute inset-0 z-0",
              hasPhoto && effectiveOverlay && !lightPhotoOverlays.has(effectiveOverlay) ? "brightness-[0.58]" : "",
            )}
          >
            <CloudinaryImage
              asset={backgroundImage}
              fill
              priority={backgroundPriority}
              width={deliveryW}
              height={deliveryH ?? backgroundImage.height}
              sizes="100vw"
              className={cn("object-cover object-center", backgroundImageClassName)}
              crop="fill"
              gravity="auto"
            />
          </div>
          {effectiveOverlay ? (
            <div className={cn("absolute inset-0 z-[1]", photoScrim[effectiveOverlay])} aria-hidden />
          ) : null}
        </>
      ) : null}

      <BrandPattern variant={patternVariant} className={cn("relative z-[2]", hasPhoto ? "opacity-25" : "")} />

      <Container className="relative z-[3] py-10 sm:py-14 lg:py-20">
        <HeroStagger>
          <HeroFadeP
            className={cn(
              "text-sm font-black uppercase tracking-[0.24em]",
              forceLightForeground ? "text-white/80" : dark ? "text-white/70" : "text-brand-red",
            )}
          >
            {eyebrow}
          </HeroFadeP>
          <HeroFadeH1
            className={cn(
              "mt-3 max-w-4xl text-(length:--text-hero-sub) font-black leading-[1.02] text-balance max-sm:leading-[1.08] sm:mt-4",
              forceLightForeground ? "text-white drop-shadow-sm" : dark ? "text-white" : "text-brand-blue-dark",
            )}
          >
            {title}
          </HeroFadeH1>
          <HeroFadeP
            className={cn(
              "mt-4 max-w-3xl text-(length:--text-lead) leading-relaxed sm:mt-5 sm:leading-8",
              forceLightForeground ? "text-white/90" : dark ? "text-white/75" : "text-muted-foreground",
            )}
          >
            {description}
          </HeroFadeP>
          {heroActions ? (
            <HeroFadeDiv className="mt-6 flex w-full max-w-xl flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
              <Link
                href={heroActions.primary.href}
                data-analytics-event="cta_click"
                data-analytics-category="hero"
                data-analytics-label={heroActions.primary.label}
                data-analytics-location={eyebrow}
                data-analytics-href={heroActions.primary.href}
                className={cn(
                  buttonVariants({
                    variant: forceLightForeground ? "emergency" : dark ? "emergency" : "default",
                    size: "lg",
                  }),
                  requestServiceCtaClassNames(),
                  "min-h-12 w-full justify-center sm:w-auto",
                )}
              >
                {heroActions.primary.label}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
              {heroActions.secondary.external !== false ? (
                <a
                  href={heroActions.secondary.href}
                  data-analytics-event="cta_click"
                  data-analytics-category="hero"
                  data-analytics-label={heroActions.secondary.label}
                  data-analytics-location={eyebrow}
                  data-analytics-href={heroActions.secondary.href}
                  className={cn(
                    buttonVariants({
                      variant: forceLightForeground ? "inverse" : dark ? "inverse" : "outline",
                      size: "lg",
                    }),
                    phoneOutlineCtaClassNames(),
                    "min-h-12 w-full justify-center sm:w-auto",
                  )}
                  aria-label={heroActions.secondary.label === "Call Now" ? `Call now at ${siteConfig.phone}` : undefined}
                >
                  <Phone data-icon="inline-start" aria-hidden="true" />
                  {heroActions.secondary.label}
                </a>
              ) : (
                <Link
                  href={heroActions.secondary.href}
                  data-analytics-event="cta_click"
                  data-analytics-category="hero"
                  data-analytics-label={heroActions.secondary.label}
                  data-analytics-location={eyebrow}
                  data-analytics-href={heroActions.secondary.href}
                  className={cn(
                    buttonVariants({
                      variant: forceLightForeground ? "inverse" : dark ? "inverse" : "outline",
                      size: "lg",
                    }),
                    phoneOutlineCtaClassNames(),
                    "min-h-12 w-full justify-center sm:w-auto",
                  )}
                >
                  {heroActions.secondary.label}
                </Link>
              )}
            </HeroFadeDiv>
          ) : null}
        </HeroStagger>
      </Container>
    </section>
  );
}

export function ServiceHero(props: {
  eyebrow: string;
  title: string;
  description: string;
  accent: "red" | "blue" | "dark";
  backgroundImage?: CloudinaryMediaAsset;
  photoOverlay?: "none" | PageHeroPhotoOverlay;
  backgroundPriority?: boolean;
  backgroundDeliveryWidth?: number;
  backgroundImageClassName?: string;
  showHeroActions?: boolean;
}) {
  const variant = props.accent === "dark" ? "dark" : props.accent === "red" ? "red" : "light";
  const overlay = props.photoOverlay ?? (props.backgroundImage ? "navy-strong" : "none");
  const showHeroActions = props.showHeroActions !== false;

  return (
    <PageHero
      eyebrow={props.eyebrow}
      title={props.title}
      description={props.description}
      variant={variant}
      backgroundImage={props.backgroundImage}
      photoOverlay={overlay}
      backgroundPriority={props.backgroundPriority}
      backgroundDeliveryWidth={props.backgroundDeliveryWidth}
      backgroundImageClassName={props.backgroundImageClassName}
      heroActions={
        showHeroActions
          ? {
              primary: { href: routes.requestService, label: "Request Service" },
              secondary: { href: phoneHref, label: "Call Now", external: true },
            }
          : undefined
      }
    />
  );
}

export function LocationHero({ city, state, intro }: { city: string; state: string; intro: string }) {
  return (
    <PageHero
      eyebrow="Service Area"
      title={"HVAC Services in " + city + ", " + state}
      description={intro}
      backgroundImage={media.home.localProof}
      photoOverlay="light-blend"
      backgroundPriority
    />
  );
}
