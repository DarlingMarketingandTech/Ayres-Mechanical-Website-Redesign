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
  commercialNavigation,
  commercialNavigationGroup,
  companyNavigation,
  primaryNavigation,
  residentialNavigation,
  residentialNavigationGroup,
  type NavigationChild,
} from "@/content/navigation";
import { isCommercialPath, isResidentialPath } from "@/lib/site-policy";
import { cn } from "@/lib/utils";

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

const topLevelClass =
  "h-auto rounded-full border border-transparent bg-transparent px-4 py-2.5 text-sm font-black text-brand-blue-dark transition-colors hover:border-brand-blue-dark/10 hover:bg-white/70 hover:text-primary data-open:border-brand-blue-dark/10 data-open:bg-white/80 data-open:text-primary data-popup-open:border-brand-blue-dark/10 data-popup-open:bg-white/80 data-popup-open:text-primary";

export function DesktopNav() {
  const pathname = usePathname();
  const residentialActive = isResidentialPath(pathname);
  const commercialActive = isCommercialPath(pathname);
  const companyActive = companyNavigation.some((item) => isRouteActive(pathname, item.href));

  return (
    <NavigationMenu align="center" className="flex-none">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(topLevelClass, residentialActive && "border-brand-blue-dark/10 bg-white/85 text-primary shadow-sm")}>
            {residentialNavigation.label}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[380px] p-3">
              <div className="rounded-2xl border border-border/70 bg-white/90 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">Residential</p>
                    <h3 className="mt-1 text-lg font-black text-brand-blue-dark">Home comfort and repair paths</h3>
                  </div>
                  <NavigationMenuLink
                    render={<Link href={residentialNavigation.href} />}
                    className={cn(
                      "rounded-full border border-border bg-secondary px-4 py-2 text-sm font-black text-brand-blue-dark transition-colors hover:bg-secondary/80",
                      isRouteActive(pathname, residentialNavigation.href) && "border-primary/15 bg-brand-ice text-primary",
                    )}
                  >
                    {residentialNavigation.label}
                  </NavigationMenuLink>
                </div>
                <div className="mt-3 rounded-xl border border-border/50 bg-white p-3 shadow-sm">
                  <ul className="grid gap-1">
                    {residentialNavigationGroup.items.map((item) => (
                      <li key={item.href}>
                        <DesktopNavChild child={item} active={isRouteActive(pathname, item.href)} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(topLevelClass, commercialActive && "border-brand-blue-dark/10 bg-white/85 text-primary shadow-sm")}>
            {commercialNavigation.label}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[430px] p-3">
              <div className="rounded-2xl border border-border/70 bg-white/90 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">Commercial</p>
                    <h3 className="mt-1 text-lg font-black text-brand-blue-dark">Facility, RTU, and planning support</h3>
                  </div>
                  <NavigationMenuLink
                    render={<Link href={commercialNavigation.href} />}
                    className={cn(
                      "rounded-full border border-border bg-secondary px-4 py-2 text-sm font-black text-brand-blue-dark transition-colors hover:bg-secondary/80",
                      isRouteActive(pathname, commercialNavigation.href) && "border-primary/15 bg-brand-ice text-primary",
                    )}
                  >
                    {commercialNavigation.label}
                  </NavigationMenuLink>
                </div>
                <div className="mt-3 rounded-xl border border-border/50 bg-white p-3 shadow-sm">
                  <ul className="grid gap-1">
                    {commercialNavigationGroup.items.map((item) => (
                      <li key={item.href}>
                        <DesktopNavChild child={item} active={isRouteActive(pathname, item.href)} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(topLevelClass, companyActive && "border-brand-blue-dark/10 bg-white/85 text-primary shadow-sm")}>
            Company
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[380px] p-3">
              <div className="rounded-2xl border border-border/70 bg-white/90 p-4 shadow-sm">
                <p className="mb-2 px-2 text-xs font-black uppercase tracking-[0.18em] text-brand-red">Company</p>
                <ul className="grid gap-1">
                  {companyNavigation.map((item) => (
                    <li key={item.href}>
                      <DesktopNavChild child={item} active={isRouteActive(pathname, item.href)} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

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

function DesktopNavChild({ child, active }: { child: NavigationChild; active: boolean }) {
  return (
    <NavigationMenuLink
      render={<Link href={child.href} />}
      className={cn(
        "flex flex-col gap-1 rounded-lg border border-transparent bg-transparent px-3 py-2.5 text-left transition-colors hover:border-brand-blue-dark/10 hover:bg-secondary/70",
        active && "border-primary/15 bg-brand-ice text-primary",
      )}
    >
      <span className="text-sm font-black text-brand-blue-dark">{child.label}</span>
      {child.description ? <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{child.description}</span> : null}
    </NavigationMenuLink>
  );
}
