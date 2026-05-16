"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { useLayoutEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { phoneOutlineCtaClassNames, requestServiceOnDarkCtaClassNames } from "@/lib/cta-interactions";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const MOBILE_MQ = "(max-width: 767px)";

function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches;
}

function isSentinelInView(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

function syncBottomChrome(showBar: boolean) {
  if (!isMobileViewport()) {
    document.documentElement.removeAttribute("data-mobile-cta-suppressed");
    return;
  }

  if (showBar) {
    document.documentElement.removeAttribute("data-mobile-cta-suppressed");
  } else {
    document.documentElement.setAttribute("data-mobile-cta-suppressed", "true");
  }
}

/**
 * Fixed bottom actions on small viewports so Request / Call stay reachable while scrolling.
 * Hidden while a `[data-mobile-cta-sentinel]` hero is in view to avoid stacking CTAs on first load.
 * Keep `--mobile-bottom-chrome-active` in globals aligned with this block’s height + safe area.
 */
export function MobileStickyCtaBar() {
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const sentinel = document.querySelector("[data-mobile-cta-sentinel]");

    const update = () => {
      if (!isMobileViewport()) {
        setRevealed(false);
        syncBottomChrome(false);
        return;
      }

      if (!sentinel) {
        setRevealed(true);
        syncBottomChrome(true);
        return;
      }

      const showBar = !isSentinelInView(sentinel);
      setRevealed(showBar);
      syncBottomChrome(showBar);
    };

    update();

    if (!sentinel) {
      const mq = window.matchMedia(MOBILE_MQ);
      mq.addEventListener("change", update);
      return () => {
        mq.removeEventListener("change", update);
        document.documentElement.removeAttribute("data-mobile-cta-suppressed");
      };
    }

    const observer = new IntersectionObserver(() => update(), {
      threshold: [0, 0.05, 0.15],
      rootMargin: "0px 0px -8% 0px",
    });
    observer.observe(sentinel);

    const mq = window.matchMedia(MOBILE_MQ);
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      document.documentElement.removeAttribute("data-mobile-cta-suppressed");
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-brand-blue-dark/95 shadow-[0_-12px_40px_rgb(0_0_0/35%)] backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden",
        revealed ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      role="region"
      aria-label="Request service or call Ayres Mechanical"
      aria-hidden={!revealed}
    >
      <div className="mx-auto flex max-w-lg flex-col gap-2 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link
          href={routes.requestService}
          className={cn(buttonVariants({ variant: "emergency", size: "lg" }), requestServiceOnDarkCtaClassNames(), "min-h-12 w-full justify-center")}
          tabIndex={revealed ? undefined : -1}
        >
          Request Service
        </Link>
        <a
          href={phoneHref}
          className={cn(buttonVariants({ variant: "inverse", size: "lg" }), phoneOutlineCtaClassNames(), "min-h-12 w-full justify-center")}
          aria-label={`Call now at ${siteConfig.phone}`}
          tabIndex={revealed ? undefined : -1}
        >
          <Phone data-icon="inline-start" className="size-4 shrink-0" aria-hidden="true" />
          Call Now
        </a>
      </div>
    </div>
  );
}
