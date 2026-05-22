"use client";

import { MobileStickyCtaBar } from "@/components/layout/MobileStickyCtaBar";
import { SiteHeader } from "@/components/layout/SiteHeader";

/** Client navigation chrome — header, scroll behavior, and mobile sticky CTAs. */
export function SiteChrome() {
  return (
    <>
      <SiteHeader />
      <MobileStickyCtaBar />
    </>
  );
}
