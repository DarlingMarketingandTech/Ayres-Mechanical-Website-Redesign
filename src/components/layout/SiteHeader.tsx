"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Clock, Menu, Phone } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  companyNavigation,
  emergencyNavigation,
  primaryNavigation,
  serviceNavigationGroups,
  serviceOverviewLink,
} from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";
import { useMobileChromeHidden } from "./useMobileChromeHidden";

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}


export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileChromeHidden = useMobileChromeHidden({ disabled: menuOpen });
  // Track which service groups are open in the mobile nav.
  // Default: both audience lanes open so residential and commercial paths are visible.
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(serviceNavigationGroups.map((group) => group.label)),
  );

  function toggleGroup(label: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  const updateHeaderOffset = useCallback(() => {
    const height = headerRef.current?.offsetHeight ?? 96;
    document.documentElement.style.setProperty("--site-header-h", `${height}px`);
  }, []);

  useLayoutEffect(() => {
    updateHeaderOffset();

    const root = headerRef.current;
    if (!root || typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(() => updateHeaderOffset());
    resizeObserver.observe(root);
    return () => resizeObserver.disconnect();
  }, [updateHeaderOffset]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-brand-blue-dark/10 bg-white/78 shadow-[0_12px_40px_rgb(10_26_68_/0.08)] backdrop-blur-xl transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none",
          mobileChromeHidden ? "max-lg:-translate-y-full" : "translate-y-0",
        )}
        style={{ top: "var(--system-strain-banner-visible-h, 0px)" }}
      >
        <Container className="py-2.5 lg:py-4">
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            <Logo
              priority
              linkClassName="min-w-0 max-w-[11.75rem] items-center sm:max-w-[13rem] lg:max-w-[20rem]"
              sizes="(max-width: 640px) 188px, (max-width: 1024px) 208px, 320px"
              className="h-auto w-full max-h-[2.65rem] object-contain object-left sm:max-h-12 lg:max-h-14"
            />

            <div className="hidden min-w-0 flex-1 justify-center lg:flex">
              <DesktopNav />
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={phoneHref}
                data-analytics-event="cta_click"
                data-analytics-category="header"
                data-analytics-label="call_now"
                data-analytics-location="mobile_header"
                data-analytics-href={phoneHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-dark/10 bg-white/80 px-3 py-2 text-xs font-black text-brand-blue-dark shadow-sm transition-colors hover:bg-brand-ice"
                aria-label={`Call Ayres Mechanical at ${siteConfig.phone}`}
              >
                <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                Call
              </a>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-11 rounded-full border-brand-blue-dark/10 bg-white/92 text-brand-blue-dark shadow-[0_8px_24px_rgb(10_26_68_/0.12)] hover:border-primary/20 hover:bg-brand-ice"
                aria-label="Open site navigation"
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={phoneHref}
                data-analytics-event="cta_click"
                data-analytics-category="header"
                data-analytics-label="call_now"
                data-analytics-location="desktop_header"
                data-analytics-href={phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-brand-blue-dark/10 bg-white/80 px-4 py-2 text-sm font-black text-brand-blue-dark transition-colors hover:text-primary"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call {siteConfig.phone}
              </a>
              <Link
                href={emergencyNavigation.href}
                data-analytics-event="cta_click"
                data-analytics-category="header"
                data-analytics-label={emergencyNavigation.label}
                data-analytics-location="desktop_header"
                data-analytics-href={emergencyNavigation.href}
                className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "px-5")}
              >
                <Clock className="size-4" aria-hidden="true" />
                {emergencyNavigation.label}
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="flex w-full max-w-sm flex-col gap-0 overflow-hidden p-0 sm:max-w-sm" showCloseButton>
          {/* Compact app-like header */}
          <SheetHeader className="border-b border-border/70 bg-white px-4 py-3 text-left">
            <div className="flex items-center justify-between gap-3">
              <Logo
                linkClassName="min-w-0 max-w-[10rem]"
                sizes="160px"
                className="h-auto w-full max-h-9 object-contain object-left"
              />
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <span className="inline-flex items-center rounded-full bg-brand-red/10 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-brand-red">
                24/7 HVAC
              </span>
            </div>
          </SheetHeader>

          {/* Scrollable nav content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Services — collapsible groups */}
            <div className="border-b border-border/60 px-3 py-3">
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-brand-blue-dark/50">Services</p>
                <Link
                  href={serviceOverviewLink.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-bold text-primary"
                >
                  View all →
                </Link>
              </div>
              <div className="grid gap-1">
                {serviceNavigationGroups.map((group) => {
                  const isOpen = openGroups.has(group.label);
                  return (
                    <div key={group.label} className="overflow-hidden rounded-xl border border-border/60 bg-brand-ice/30">
                      {/* Group toggle button */}
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.label)}
                        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="text-xs font-black uppercase tracking-[0.16em] text-brand-blue-dark">
                          {group.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "size-3.5 shrink-0 text-brand-blue-dark/50 transition-transform duration-200",
                            isOpen && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      {/* Collapsible items */}
                      {isOpen && (
                        <ul className="border-t border-border/50 px-2 pb-2 pt-1">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                  "flex min-h-10 items-center rounded-lg px-2 py-2 text-sm font-bold transition-colors",
                                  isRouteActive(pathname, item.href)
                                    ? "text-primary"
                                    : "text-brand-blue-dark hover:text-primary",
                                )}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Company + More — flat compact list */}
            <div className="px-3 py-3">
              <p className="mb-2 px-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-brand-blue-dark/50">Company</p>
              <ul className="grid gap-0.5">
                {[...companyNavigation, ...primaryNavigation].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-bold transition-colors",
                        isRouteActive(pathname, item.href)
                          ? "bg-brand-ice text-primary"
                          : "text-brand-blue-dark hover:bg-brand-ice/60",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom CTAs — 2-up grid for compact layout */}
          <div className="border-t border-border/70 bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
            <Link
              href={emergencyNavigation.href}
              onClick={() => setMenuOpen(false)}
              data-analytics-event="cta_click"
              data-analytics-category="header"
              data-analytics-label={emergencyNavigation.label}
              data-analytics-location="mobile_menu"
              data-analytics-href={emergencyNavigation.href}
              className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "mb-2 w-full justify-center")}
            >
              <Clock className="size-4" aria-hidden="true" />
              {emergencyNavigation.label}
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={routes.requestService}
                onClick={() => setMenuOpen(false)}
                data-analytics-event="cta_click"
                data-analytics-category="header"
                data-analytics-label="request_service"
                data-analytics-location="mobile_menu"
                data-analytics-href={routes.requestService}
                className={cn(buttonVariants({ variant: "dark", size: "default" }), "justify-center text-xs")}
              >
                Request Service
              </Link>
              <a
                href={phoneHref}
                data-analytics-event="cta_click"
                data-analytics-category="header"
                data-analytics-label="call_now"
                data-analytics-location="mobile_menu"
                data-analytics-href={phoneHref}
                className={cn(buttonVariants({ variant: "outline", size: "default" }), "justify-center text-xs")}
              >
                <Phone className="size-3.5" aria-hidden="true" />
                Call Now
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

