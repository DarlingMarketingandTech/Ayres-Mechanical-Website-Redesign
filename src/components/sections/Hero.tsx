"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { BrandPattern } from "@/components/brand/BrandPattern";
import { TriangleMark } from "@/components/brand/TriangleMark";
import { buttonVariants } from "@/components/ui/button";
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
          <motion.h1 variants={fadeUp} className="mt-4 max-w-4xl text-(length:--text-hero) font-black leading-[0.98] text-balance sm:mt-5">
            20 Years of Trusted HVAC Service in Central Indiana.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-(length:--text-lead) leading-relaxed text-muted-foreground sm:mt-6 sm:leading-8">
            Practical heating and cooling solutions for your home, business, or facility. 24/7 emergency response in {serviceCountyNames} Counties.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link
              href={routes.requestService}
              className={cn(buttonVariants({ variant: "emergency", size: "lg" }), requestServiceCtaClassNames())}
            >
              Request Service <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            <a
              href={phoneHref}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), phoneOutlineCtaClassNames())}
            >
              <Phone data-icon="inline-start" aria-hidden="true" /> Call {siteConfig.phone}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.96 }}
          animate={reduceMotion ? false : { opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 32, delay: 0.22 }}
          className="relative min-h-[min(22rem,70dvh)] rounded-3xl bg-brand-blue-dark p-4 text-white shadow-2xl sm:min-h-104 sm:rounded-[2rem] sm:p-6 lg:min-h-[420px]"
        >
          {!reduceMotion ? (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-8 top-10 h-40 w-40 rounded-full bg-brand-red/25 blur-3xl"
                animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-10 bottom-8 h-44 w-44 rounded-full bg-primary/30 blur-3xl"
                animate={{ opacity: [0.25, 0.45, 0.25], y: [0, -6, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              />
            </>
          ) : null}
          <BrandPattern variant="dark" />
          <div className="relative flex h-full min-h-64 flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:min-h-80 sm:rounded-[1.5rem] sm:p-6 lg:min-h-[372px] transition-[border-color,box-shadow] duration-500 hover:border-white/35 hover:shadow-[0_0_0_1px_rgb(255_255_255_/0.12),0_24px_48px_-24px_rgb(0_0_0_/0.45)]">
            <TriangleMark className="h-16 w-11 shrink-0 sm:h-24 sm:w-16 drop-shadow-xl" tone="light" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70 sm:text-sm">Residential · Commercial · Industrial</p>
              <h2 className="mt-3 text-(length:--text-section) font-black leading-tight text-balance text-white sm:mt-4">
                24-hour service with a clear path from call to comfort.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold sm:gap-3 sm:text-sm">
              {["Heating", "Cooling", "Maintenance", "Emergency"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/15 bg-white/10 p-3 transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg hover:shadow-black/20 sm:rounded-xl sm:p-4 motion-reduce:transform-none"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export function PageHero({ eyebrow, title, description, variant = "light" }: { eyebrow: string; title: string; description: string; variant?: "light" | "dark" | "red" }) {
  const dark = variant === "dark";
  return (
    <section className={cn("relative overflow-hidden", dark ? "bg-brand-blue-dark text-white" : "bg-white")}>
      <BrandPattern variant={dark ? "dark" : variant === "red" ? "red" : "blue"} />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className={cn("text-sm font-black uppercase tracking-[0.24em]", dark ? "text-white/70" : "text-brand-red")}>{eyebrow}</motion.p>
          <motion.h1
            variants={fadeUp}
            className={cn(
              "mt-3 max-w-4xl text-(length:--text-hero-sub) font-black leading-[1.02] text-balance sm:mt-4",
              dark ? "text-white" : "text-brand-blue-dark",
            )}
          >
            {title}
          </motion.h1>
          <motion.p variants={fadeUp} className={cn("mt-4 max-w-3xl text-(length:--text-lead) leading-relaxed sm:mt-5 sm:leading-8", dark ? "text-white/75" : "text-muted-foreground")}>
            {description}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

export function ServiceHero(props: { eyebrow: string; title: string; description: string; accent: "red" | "blue" | "dark" }) {
  return <PageHero eyebrow={props.eyebrow} title={props.title} description={props.description} variant={props.accent === "dark" ? "dark" : props.accent === "red" ? "red" : "light"} />;
}

export function LocationHero({ city, state, intro }: { city: string; state: string; intro: string }) {
  return <PageHero eyebrow="Service Area" title={"HVAC Services in " + city + ", " + state} description={intro} />;
}
