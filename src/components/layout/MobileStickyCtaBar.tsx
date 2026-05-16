"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { phoneOutlineCtaClassNames, requestServiceOnDarkCtaClassNames } from "@/lib/cta-interactions";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * Fixed bottom actions on small viewports so Request / Call stay reachable while scrolling.
 * Keep `--mobile-bottom-chrome-h` in globals aligned with this block’s height + safe area.
 */
export function MobileStickyCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-brand-blue-dark/95 shadow-[0_-12px_40px_rgb(0_0_0/35%)] backdrop-blur-md md:hidden"
      role="region"
      aria-label="Request service or call Ayres Mechanical"
    >
      <div className="mx-auto flex max-w-lg flex-col gap-2 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link
          href={routes.requestService}
          className={cn(buttonVariants({ variant: "emergency", size: "lg" }), requestServiceOnDarkCtaClassNames(), "min-h-12 w-full justify-center")}
        >
          Request Service
        </Link>
        <a
          href={phoneHref}
          className={cn(buttonVariants({ variant: "inverse", size: "lg" }), phoneOutlineCtaClassNames(), "min-h-12 w-full justify-center")}
          aria-label={`Call now at ${siteConfig.phone}`}
        >
          <Phone data-icon="inline-start" className="size-4 shrink-0" aria-hidden="true" />
          Call Now
        </a>
      </div>
    </div>
  );
}
