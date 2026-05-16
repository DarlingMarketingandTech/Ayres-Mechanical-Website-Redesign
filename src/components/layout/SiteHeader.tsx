"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Menu, Phone } from "lucide-react";
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
  type NavigationChild,
} from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function mobileLinkClass(active: boolean) {
  return cn(
    "block rounded-2xl border px-4 py-3 transition-colors",
    active
      ? "border-primary/15 bg-brand-ice text-primary"
      : "border-border/70 bg-white text-brand-blue-dark hover:border-brand-blue-dark/10 hover:bg-secondary/70",
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
        className="fixed inset-x-0 top-0 z-50 border-b border-brand-blue-dark/10 bg-white/72 shadow-[0_12px_40px_rgb(10_26_68_/0.08)] backdrop-blur-xl"
      >
        <Container className="py-3 lg:py-4">
          <div className="flex items-center justify-between gap-4 lg:gap-6">
            <Logo
              priority
              linkClassName="min-w-0 max-w-[16rem] lg:max-w-[20rem]"
              sizes="(max-width: 1024px) 220px, 320px"
              className="h-auto w-full max-h-12 object-contain object-left sm:max-h-14"
            />

            <div className="hidden min-w-0 flex-1 justify-center lg:flex">
              <DesktopNav />
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-brand-blue-dark/10 bg-white/80 px-4 py-2 text-sm font-black text-brand-blue-dark transition-colors hover:text-primary"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call {siteConfig.phone}
              </a>
              <Link href={emergencyNavigation.href} className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "px-5")}>
                <Clock className="size-4" aria-hidden="true" />
                {emergencyNavigation.label}
              </Link>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 lg:hidden">
            <a href={phoneHref} className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "min-w-0 flex-1 justify-center gap-2 px-4 text-sm sm:text-base")}>
              <Phone className="size-4" aria-hidden="true" />
              Call {siteConfig.phone}
            </a>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="shrink-0"
              aria-label="Open site navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" aria-hidden="true" />
              Menu
            </Button>
          </div>
        </Container>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="flex w-full max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md" showCloseButton>
          <SheetHeader className="border-b border-border bg-white/95 px-4 py-6 text-left backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <Logo
                linkClassName="min-w-0 max-w-[12rem]"
                sizes="192px"
                className="h-auto w-full max-h-12 object-contain object-left"
              />
              <span className="inline-flex items-center rounded-full bg-brand-red/10 px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.18em] text-brand-red">
                24/7 HVAC
              </span>
            </div>
            <SheetTitle className="mt-4 text-left font-heading text-xl font-black text-brand-blue-dark">
              Enterprise navigation, simplified
            </SheetTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore residential, commercial, and industrial HVAC solutions without losing quick access to call.
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-6">
              <section>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">Services</p>
                  <Link
                    href={serviceOverviewLink.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-bold text-primary underline-offset-4 hover:underline"
                  >
                    {serviceOverviewLink.label}
                  </Link>
                </div>
                <div className="mt-3 grid gap-3">
                  {serviceNavigationGroups.map((group) => (
                    <div key={group.label} className="rounded-2xl border border-border/70 bg-brand-ice/45 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue-dark">{group.label}</p>
                      <ul className="mt-3 grid gap-2">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <MobileMenuLink
                              item={item}
                              active={isRouteActive(pathname, item.href)}
                              onSelect={() => setMenuOpen(false)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">Company</p>
                <ul className="mt-3 grid gap-2">
                  {companyNavigation.map((item) => (
                    <li key={item.href}>
                      <MobileMenuLink
                        item={item}
                        active={isRouteActive(pathname, item.href)}
                        onSelect={() => setMenuOpen(false)}
                      />
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">More</p>
                <ul className="mt-3 grid gap-2">
                  {primaryNavigation.map((item) => (
                    <li key={item.href}>
                      <MobileMenuLink
                        item={item}
                        active={isRouteActive(pathname, item.href)}
                        onSelect={() => setMenuOpen(false)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="border-t border-border bg-white px-4 py-4">
            <div className="grid gap-3">
              <Link
                href={emergencyNavigation.href}
                onClick={() => setMenuOpen(false)}
                className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "justify-center")}
              >
                <Clock className="size-4" aria-hidden="true" />
                {emergencyNavigation.label}
              </Link>
              <Link
                href={routes.requestService}
                onClick={() => setMenuOpen(false)}
                className={cn(buttonVariants({ variant: "dark", size: "lg" }), "justify-center")}
              >
                Request Service Online
              </Link>
              <a
                href={phoneHref}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "justify-center")}
              >
                <Phone className="size-4" aria-hidden="true" />
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function MobileMenuLink({
  item,
  active,
  onSelect,
}: {
  item: NavigationChild;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <Link href={item.href} onClick={onSelect} className={mobileLinkClass(active)}>
      <span className="block text-sm font-black text-brand-blue-dark">{item.label}</span>
      {item.description ? <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.description}</span> : null}
    </Link>
  );
}
