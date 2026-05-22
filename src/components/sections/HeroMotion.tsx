"use client";

import { motion, useReducedMotion } from "motion/react";

export const heroStaggerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

export const heroFadeUpVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 28, mass: 0.85 },
  },
};

export function HeroStagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={heroStaggerVariants} initial="hidden" animate="show" className={className}>
      {children}
    </motion.div>
  );
}

export function HeroFadeP({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.p variants={heroFadeUpVariants} className={className}>
      {children}
    </motion.p>
  );
}

export function HeroFadeH1({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h1 variants={heroFadeUpVariants} className={className}>
      {children}
    </motion.h1>
  );
}

export function HeroFadeDiv({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={heroFadeUpVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function HomeHeroPatternMotion({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? undefined : { opacity: [0.45, 0.72, 0.45], scale: [1, 1.04, 1] }}
      transition={reduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

export function HomeHeroMediaMotion({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.96 }}
      animate={reduceMotion ? false : { opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 32, delay: 0.22 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HomeHeroGlowOrbs() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-10 z-2 h-40 w-40 rounded-full bg-brand-red/25 blur-3xl max-sm:opacity-60"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-10 bottom-8 z-2 h-44 w-44 rounded-full bg-primary/30 blur-3xl max-sm:opacity-55"
        animate={{ opacity: [0.25, 0.45, 0.25], y: [0, -6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
    </>
  );
}
