"use client";

/**
 * Canonical mobile navigation: fixed bottom bar plus full-site menu sheet.
 * The header stays desktop-only (`DesktopNav`); do not add a separate header `MobileNav`.
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Home, LayoutGrid, Menu } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { media } from "@/content/media";
import { primaryNavigation, utilityNavigation } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { cloudinaryTransparentLogoUrl } from "@/lib/cloudinary";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const SCROLL_IDLE_MS = 1100;
const LOGO_BAR_PX = 64;
const SHEET_LOGO_MAX = 220;

const secondaryDark = media.brand.secondaryLogoDark;

function barItemClass(active: boolean) {
  return cn(
    "flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-0.5 py-1 text-[0.625rem] font-black uppercase tracking-wide text-brand-blue-dark transition-colors",
    active ? "text-primary" : "hover:bg-secondary/80",
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hiddenByScrollIdle, setHiddenByScrollIdle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setHiddenByScrollIdle(false);
  }

  const barVisible = reduceMotion || menuOpen || !hiddenByScrollIdle;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const onScrollActivity = useCallback(() => {
    if (reduceMotion || menuOpen) {
      return;
    }
    setHiddenByScrollIdle(false);
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }
    idleTimer.current = setTimeout(() => {
      setHiddenByScrollIdle(true);
    }, SCROLL_IDLE_MS);
  }, [reduceMotion, menuOpen]);

  useEffect(() => {
    if (reduceMotion || menuOpen) {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
      return;
    }
    window.addEventListener("scroll", onScrollActivity, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollActivity);
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
    };
  }, [menuOpen, onScrollActivity, reduceMotion]);

  const logoBarSrc = cloudinaryTransparentLogoUrl(secondaryDark.publicId, LOGO_BAR_PX * 2);
  const logoSheetSrc = cloudinaryTransparentLogoUrl(secondaryDark.publicId, SHEET_LOGO_MAX);

  return (
    <>
      <nav
        aria-label="Mobile primary navigation"
        className={cn(
          "fixed inset-x-0 bottom-0 z-45 border-t border-border bg-white/95 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-8px_30px_rgb(0_0_0_/0.06)] backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transform-none lg:hidden",
          barVisible ? "translate-y-0" : "translate-y-[calc(100%+0.5rem)]",
        )}
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 items-stretch gap-0.5 px-1.5">
          <Link href={routes.home} className={barItemClass(pathname === routes.home)} aria-current={pathname === routes.home ? "page" : undefined}>
            <Home className="size-6 shrink-0" aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link href={routes.services} className={barItemClass(pathname.startsWith("/services"))} aria-current={pathname.startsWith("/services") ? "page" : undefined}>
            <LayoutGrid className="size-6 shrink-0" aria-hidden="true" />
            <span>Services</span>
          </Link>
          <Link
            href={routes.home}
            className="flex min-h-11 flex-col items-center justify-center self-center rounded-2xl bg-secondary px-1 py-0.5 shadow-sm ring-1 ring-border/60"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src={logoBarSrc}
              alt=""
              width={LOGO_BAR_PX}
              height={LOGO_BAR_PX}
              className="size-8 object-contain"
              sizes="64px"
              aria-hidden
            />
          </Link>
          <Link
            href={routes.requestService}
            className={barItemClass(pathname.startsWith(routes.requestService))}
            aria-current={pathname.startsWith(routes.requestService) ? "page" : undefined}
          >
            <ClipboardList className="size-6 shrink-0" aria-hidden="true" />
            <span>Request</span>
          </Link>
          <Button type="button" variant="ghost" className={cn(barItemClass(false), "h-auto font-black")} aria-label="Open full site menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Menu className="size-6 shrink-0" aria-hidden="true" />
            <span>Menu</span>
          </Button>
        </div>
      </nav>

      <Sheet
        open={menuOpen}
        onOpenChange={(open) => {
          setMenuOpen(open);
          if (!open) {
            setHiddenByScrollIdle(false);
          }
        }}
      >
        <SheetContent side="right" className="w-full gap-0 overflow-y-auto p-0 sm:max-w-md" showCloseButton>
          <SheetHeader className="border-b border-border bg-brand-ice px-4 py-6">
            <div className="flex flex-col items-center gap-3">
              <Image
                src={logoSheetSrc}
                alt={secondaryDark.alt}
                width={Math.round((secondaryDark.width / secondaryDark.height) * 120)}
                height={120}
                className="h-18 w-auto max-w-[220px] object-contain"
                sizes="220px"
              />
              <SheetTitle className="text-center font-heading text-lg font-black text-brand-blue-dark">Browse the site</SheetTitle>
              <p className="text-center text-sm text-muted-foreground">Residential, commercial, and industrial HVAC across Central Indiana.</p>
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-6 px-4 py-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">Main</p>
              <ul className="mt-3 grid gap-1">
                {primaryNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block min-h-11 rounded-lg px-3 py-3 text-base font-bold text-brand-blue-dark hover:bg-secondary"
                    >
                      {item.label}
                    </Link>
                    {item.children?.length ? (
                      <ul className="ml-2 border-l border-border pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setMenuOpen(false)}
                              className="block min-h-10 rounded-md py-2 pr-2 text-sm font-semibold text-muted-foreground hover:text-brand-blue-dark"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">More</p>
              <ul className="mt-3 grid gap-1">
                {utilityNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block min-h-11 rounded-lg px-3 py-3 text-base font-bold text-brand-blue-dark hover:bg-secondary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3 border-t border-border pt-4">
              <Link
                href={routes.requestService}
                onClick={() => setMenuOpen(false)}
                className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "justify-center text-center")}
              >
                Request Service
              </Link>
              <a
                href={phoneHref}
                className="flex min-h-12 items-center justify-center rounded-lg border border-border px-4 py-3 text-center text-base font-bold text-brand-blue-dark hover:bg-secondary"
              >
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
