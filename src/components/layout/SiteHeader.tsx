"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { requestServiceCtaClassNames } from "@/lib/cta-interactions";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";
import { TopBar } from "./TopBar";

const SCROLL_TOP_REVEAL = 56;
const SCROLL_DELTA = 10;

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const mainRowRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [navVisible, setNavVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  /** Auto-hide main row on scroll only at lg+ so phones always keep the menu control in reach. */
  const [scrollCollapseDesktopOnly, setScrollCollapseDesktopOnly] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      setScrollCollapseDesktopOnly(mq.matches);
      if (!mq.matches) {
        setNavVisible(true);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const updateHeaderOffset = useCallback(() => {
    const topH = topBarRef.current?.offsetHeight ?? 40;
    const mainH = mainRowRef.current?.offsetHeight ?? 72;
    const visible = reduceMotion ? true : navVisible;
    const offset = visible ? topH + mainH : topH;
    document.documentElement.style.setProperty("--site-header-h", `${offset}px`);
  }, [navVisible, reduceMotion]);

  useLayoutEffect(() => {
    updateHeaderOffset();
    const root = headerRef.current;
    if (!root || typeof ResizeObserver === "undefined") {
      return;
    }
    const ro = new ResizeObserver(() => updateHeaderOffset());
    ro.observe(root);
    return () => ro.disconnect();
  }, [updateHeaderOffset]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      if (reduceMotion || !scrollCollapseDesktopOnly) {
        setNavVisible(true);
        return;
      }

      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (y < SCROLL_TOP_REVEAL) {
        setNavVisible(true);
        return;
      }
      if (delta > SCROLL_DELTA) {
        setNavVisible(false);
      } else if (delta < -SCROLL_DELTA) {
        setNavVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduceMotion, scrollCollapseDesktopOnly]);

  const barHidden = !reduceMotion && !navVisible && scrollCollapseDesktopOnly;

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-40 flex w-full flex-col overflow-hidden shadow-sm">
      <div ref={topBarRef}>
        <TopBar />
      </div>
      <div
        ref={mainRowRef}
        className={cn(
          "border-b border-border bg-white/95 backdrop-blur transition-[max-height,opacity,padding,border-width] duration-300 ease-out motion-reduce:transition-none",
          barHidden
            ? "max-h-0 min-h-0 overflow-hidden border-b-0 py-0 opacity-0 pointer-events-none"
            : "max-h-48 opacity-100",
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between gap-6 py-3",
            barHidden ? "hidden" : "min-h-20 sm:min-h-21 lg:min-h-24",
          )}
        >
          <Logo
            priority
            linkClassName="max-w-[50%]"
            sizes="(max-width: 1024px) 50vw, 640px"
            className="h-auto w-full max-h-14 object-contain object-left sm:max-h-16 lg:max-h-19"
          />
          <DesktopNav />
          <div className="hidden items-center gap-3 lg:flex">
            <a href={phoneHref} className="text-sm font-black text-brand-blue-dark hover:text-primary">
              {siteConfig.phone}
            </a>
            <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }), requestServiceCtaClassNames())}>
              Request Service
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
