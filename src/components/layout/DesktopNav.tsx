"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  commercialMegaMenu,
  companyNavigation,
  primaryNavigation,
  residentialMegaMenu,
} from "@/content/navigation";
import { isCommercialPath, isResidentialPath } from "@/lib/site-policy";
import { cn } from "@/lib/utils";
import { MegaMenuLinkCard } from "./MegaMenuLinkCard";
import { MegaMenuPanel } from "./MegaMenuPanel";

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const topLevelClass =
  "h-auto rounded-full border border-transparent bg-transparent px-4 py-2.5 text-sm font-black text-brand-blue-dark transition-colors hover:border-brand-blue-dark/10 hover:bg-white/70 hover:text-primary data-open:border-brand-blue-dark/10 data-open:bg-white/80 data-open:text-primary data-popup-open:border-brand-blue-dark/10 data-popup-open:bg-white/80 data-popup-open:text-primary";

const panelClass =
  "w-[min(820px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_4px_32px_rgb(10_26_68_/0.12)]";

function MegaMenuHeader({
  eyebrow,
  title,
  overviewHref,
  overviewLabel,
  pathname,
}: {
  eyebrow: string;
  title: string;
  overviewHref: string;
  overviewLabel: string;
  pathname: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3.5">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">{eyebrow}</p>
        <h3 className="mt-0.5 text-base font-black text-brand-blue-dark">{title}</h3>
      </div>
      <NavigationMenuLink
        render={<Link href={overviewHref} />}
        className={cn(
          "rounded-full border border-border bg-secondary px-4 py-2 text-sm font-black text-brand-blue-dark transition-colors hover:bg-secondary/80",
          isRouteActive(pathname, overviewHref) && "border-primary/15 bg-brand-ice text-primary",
        )}
      >
        {overviewLabel}
      </NavigationMenuLink>
    </div>
  );
}

export function DesktopNav() {
  const pathname = usePathname();
  const residentialActive = isResidentialPath(pathname);
  const commercialActive = isCommercialPath(pathname);
  const companyActive = companyNavigation.some((item) => isRouteActive(pathname, item.href));

  return (
    <NavigationMenu align="center" className="flex-none">
      <NavigationMenuList className="gap-2">
        {/* ── Residential ── */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(topLevelClass, residentialActive && "border-brand-blue-dark/10 bg-white/85 text-primary shadow-sm")}
          >
            {residentialMegaMenu.label}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className={panelClass}>
              <MegaMenuHeader
                eyebrow="Residential"
                title="Home comfort and repair"
                overviewHref={residentialMegaMenu.href}
                overviewLabel="Residential Overview"
                pathname={pathname}
              />
              <MegaMenuPanel columns={residentialMegaMenu.columns} pathname={pathname} />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* ── Commercial ── */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(topLevelClass, commercialActive && "border-brand-blue-dark/10 bg-white/85 text-primary shadow-sm")}
          >
            {commercialMegaMenu.label}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className={panelClass}>
              <MegaMenuHeader
                eyebrow="Commercial"
                title="Facility, RTU, and planning support"
                overviewHref={commercialMegaMenu.href}
                overviewLabel="Commercial Overview"
                pathname={pathname}
              />
              <MegaMenuPanel columns={commercialMegaMenu.columns} pathname={pathname} />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* ── Company ── */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(topLevelClass, companyActive && "border-brand-blue-dark/10 bg-white/85 text-primary shadow-sm")}
          >
            Company
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-64 overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_4px_32px_rgb(10_26_68_/0.12)]">
              <div className="p-2">
                <p className="mb-1 px-3 pt-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-brand-red/90">
                  Company
                </p>
                <ul className="grid gap-0.5 pb-1">
                  {companyNavigation.map((item) => (
                    <li key={item.href}>
                      <MegaMenuLinkCard item={item} active={isRouteActive(pathname, item.href)} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* ── Reviews / Contact ── */}
        {primaryNavigation.map((item) => {
          const active = isRouteActive(pathname, item.href);

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                render={<Link href={item.href} />}
                className={cn(topLevelClass, active && "border-brand-blue-dark/10 bg-white/85 text-primary shadow-sm")}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
