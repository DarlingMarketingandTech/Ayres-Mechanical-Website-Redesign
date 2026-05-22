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
  companyNavigation,
  primaryNavigation,
  serviceNavigationGroups,
  serviceOverviewLink,
  type NavigationChild,
} from "@/content/navigation";
import { routes } from "@/lib/routes";
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
  const servicesActive = pathname.startsWith("/services");
  const commercialActive =
    isRouteActive(pathname, routes.commercial) ||
    isRouteActive(pathname, routes.commercialPartnerships) ||
    isRouteActive(pathname, routes.commercialService) ||
    isRouteActive(pathname, routes.industrialFacilities);
  const companyActive = companyNavigation.some((item) => isRouteActive(pathname, item.href));

  return (
    <NavigationMenu align="center" className="flex-none">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(topLevelClass, servicesActive && "border-brand-blue-dark/10 bg-white/85 text-primary shadow-sm")}>
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[760px] p-3">
              <div className="rounded-2xl border border-border/70 bg-white/90 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">Rule of Three</p>
                    <h3 className="mt-1 text-lg font-black text-brand-blue-dark">Service paths for every property type</h3>
                  </div>
                  <NavigationMenuLink
                    render={<Link href={serviceOverviewLink.href} />}
                    className={cn(
                      "rounded-full border border-border bg-secondary px-4 py-2 text-sm font-black text-brand-blue-dark transition-colors hover:bg-secondary/80",
                      isRouteActive(pathname, serviceOverviewLink.href) && "border-primary/15 bg-brand-ice text-primary",
                    )}
                  >
                    {serviceOverviewLink.label}
                  </NavigationMenuLink>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {serviceNavigationGroups.map((group) => (
                    <div key={group.label} className="rounded-xl border border-border/50 bg-white p-3 shadow-sm">
                      <p className="mb-2 px-2 text-xs font-black uppercase tracking-[0.18em] text-brand-red">{group.label}</p>
                      <ul className="grid gap-1">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <DesktopNavChild child={item} active={isRouteActive(pathname, item.href)} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="rounded-xl border border-brand-blue-dark/10 bg-brand-ice p-4 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue-dark/60">Commercial portal</p>
                    <h3 className="mt-2 text-lg font-black text-brand-blue-dark">Managing a facility or portfolio?</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Outline equipment, service priorities, and follow-up needs in the commercial partnerships portal.
                    </p>
                    <NavigationMenuLink
                      render={<Link href={routes.commercialPartnerships} />}
                      className={cn(
                        "mt-4 inline-flex rounded-full bg-brand-blue-dark px-4 py-2 text-sm font-black text-white transition-colors hover:bg-primary",
                        isRouteActive(pathname, routes.commercialPartnerships) && "bg-primary",
                      )}
                    >
                      Commercial Partnerships
                    </NavigationMenuLink>
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href={commercialNavigation.href} />}
            className={cn(topLevelClass, commercialActive && "border-brand-blue-dark/10 bg-white/85 text-primary shadow-sm")}
          >
            {commercialNavigation.label}
          </NavigationMenuLink>
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
