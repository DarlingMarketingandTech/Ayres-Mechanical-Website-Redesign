"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { BrandPattern } from "@/components/brand/BrandPattern";
import { TriangleMark } from "@/components/brand/TriangleMark";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { buttonVariants } from "@/components/ui/button";
import type { CloudinaryMediaAsset } from "@/content/media";
import { media } from "@/content/media";
import { siteConfig } from "@/content/site";
import { serviceCountyNames } from "@/content/locations";
import { phoneOutlineCtaClassNames, requestServiceCtaClassNames } from "@/lib/cta-interactions";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 28, mass: 0.85 },
  },
};

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const vanAsset = media.home.localProof;

  return (
    <section className="relative overflow-hidden bg-white section-pattern">
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.45, 0.72, 0.45], scale: [1, 1.04, 1] }}
        transition={reduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <BrandPattern variant="blue" />
      </motion.div>

      <Container className="relative grid gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12 lg:py-24">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">
            {siteConfig.tagline}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 max-w-4xl text-(length:--text-hero) font-black leading-[0.98] text-balance max-sm:leading-[1.06] sm:mt-5"
          >
            20 Years of Trusted HVAC Service in Central Indiana.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-(length:--text-lead) leading-relaxed text-muted-foreground sm:mt-6 sm:leading-8">
            Practical heating and cooling solutions for your home, business, or facility. 24/7 emergency response in {serviceCountyNames} Counties.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href={routes.requestService}
              className={cn(
                buttonVariants({ variant: "emergency", size: "lg" }),
                requestServiceCtaClassNames(),
                "w-full min-h-12 justify-center sm:w-auto",
              )}
            >
              Request Service <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            <a
              href={phoneHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                phoneOutlineCtaClassNames(),
                "w-full min-h-12 justify-center sm:w-auto",
              )}
              aria-label={`Call now at ${siteConfig.phone}`}
            >
              <Phone data-icon="inline-start" aria-hidden="true" /> Call Now
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.96 }}
          animate={reduceMotion ? false : { opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 32, delay: 0.22 }}
          className="relative aspect-[4/3] w-full max-h-[min(52dvh,26rem)] min-h-[15rem] overflow-hidden rounded-3xl shadow-2xl sm:aspect-[960/720] sm:max-h-none sm:min-h-104 sm:rounded-[2rem] lg:min-h-[420px]"
        >
          <div className="absolute inset-0 z-0">
            <CloudinaryImage
              asset={vanAsset}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-center"
              crop="fill"
              gravity="auto"
            />
          </div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/88 to-brand-blue-dark/55" aria-hidden />
          {!reduceMotion ? (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-8 top-10 z-[2] h-40 w-40 rounded-full bg-brand-red/25 blur-3xl"
                animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-10 bottom-8 z-[2] h-44 w-44 rounded-full bg-primary/30 blur-3xl"
                animate={{ opacity: [0.25, 0.45, 0.25], y: [0, -6, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              />
            </>
          ) : null}
          <div className="relative z-[3] flex h-full min-h-[inherit] flex-col justify-between gap-5 p-4 text-white sm:gap-6 sm:p-6">
            <BrandPattern variant="dark" className="opacity-40" />
            <div className="relative flex flex-1 flex-col justify-between gap-6">
              <div className="rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-md sm:rounded-[1.5rem] sm:p-6">
                <TriangleMark className="h-14 w-10 shrink-0 drop-shadow-xl sm:h-24 sm:w-16" tone="light" />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/75 sm:text-sm">Residential · Commercial · Industrial</p>
                <h2 className="mt-3 text-(length:--text-section) font-black leading-tight text-balance text-white sm:mt-4">
                  24-hour service with a clear path from call to comfort.
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold sm:gap-3 sm:text-sm">
                {["Heating", "Cooling", "Maintenance", "Emergency"].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur-sm transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg hover:shadow-black/25 sm:rounded-xl sm:p-4 motion-reduce:transform-none"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

const photoScrim = {
  "navy-strong": "bg-gradient-to-br from-brand-blue-dark via-brand-blue-dark/96 to-black/58",
  "navy-soft": "bg-gradient-to-t from-brand-blue-dark/90 via-brand-blue-dark/58 to-brand-blue-dark/40",
  "light-soft": "bg-gradient-to-b from-white/92 via-white/82 to-white/70",
} as const;

export type PageHeroPhotoOverlay = keyof typeof photoScrim;

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
  /** Max logical width for Cloudinary delivery (large originals). */
  backgroundDeliveryWidth?: number;
  /** Extra classes on the hero photo (e.g. object-position). */
  backgroundImageClassName?: string;
  /** Optional primary/secondary actions (stacked on small screens). */
  heroActions?: PageHeroHeroActions;
}) {
  const dark = variant === "dark";
  const hasPhoto = Boolean(backgroundImage);
  const effectiveOverlay: PageHeroPhotoOverlay | null = !hasPhoto
    ? null
    : photoOverlay === undefined || photoOverlay === "none"
      ? "navy-strong"
      : photoOverlay;
  const forceLightForeground = Boolean(effectiveOverlay && effectiveOverlay !== "light-soft");
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
    >
      {hasPhoto && backgroundImage ? (
        <>
          <div
            className={cn(
              "absolute inset-0 z-0",
              hasPhoto && effectiveOverlay && effectiveOverlay !== "light-soft" ? "brightness-[0.58]" : "",
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
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className={cn(
              "text-sm font-black uppercase tracking-[0.24em]",
              forceLightForeground ? "text-white/80" : dark ? "text-white/70" : "text-brand-red",
            )}
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className={cn(
              "mt-3 max-w-4xl text-(length:--text-hero-sub) font-black leading-[1.02] text-balance max-sm:leading-[1.08] sm:mt-4",
              forceLightForeground ? "text-white drop-shadow-sm" : dark ? "text-white" : "text-brand-blue-dark",
            )}
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className={cn(
              "mt-4 max-w-3xl text-(length:--text-lead) leading-relaxed sm:mt-5 sm:leading-8",
              forceLightForeground ? "text-white/90" : dark ? "text-white/75" : "text-muted-foreground",
            )}
          >
            {description}
          </motion.p>
          {heroActions ? (
            <motion.div
              variants={fadeUp}
              className="mt-6 flex w-full max-w-xl flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap"
            >
              <Link
                href={heroActions.primary.href}
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
            </motion.div>
          ) : null}
        </motion.div>
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
  /** When false, hero shows headline only (no duplicate CTAs above the fold). Default true. */
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
  return <PageHero eyebrow="Service Area" title={"HVAC Services in " + city + ", " + state} description={intro} />;
}
