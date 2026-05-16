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
  companyNavigation,
  primaryNavigation,
  serviceNavigationGroups,
  serviceOverviewLink,
  type NavigationChild,
} from "@/content/navigation";
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
  const companyActive = companyNavigation.some((item) => isRouteActive(pathname, item.href));

  return (
    <NavigationMenu align="center" className="flex-none">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(topLevelClass, servicesActive && "border-brand-blue-dark/10 bg-white/85 text-primary shadow-sm")}>
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[720px] p-4">
              <div className="rounded-2xl border border-border/70 bg-white/90 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">Rule of Three</p>
                    <h3 className="mt-2 text-lg font-black text-brand-blue-dark">Service paths for every property type</h3>
                  </div>
                  <NavigationMenuLink
                    render={<Link href={serviceOverviewLink.href} />}
                    className={cn(
                      "rounded-full border border-border bg-secondary px-4 py-2 text-sm font-black text-brand-blue-dark hover:bg-secondary/80",
                      isRouteActive(pathname, serviceOverviewLink.href) && "border-primary/15 bg-brand-ice text-primary",
                    )}
                  >
                    {serviceOverviewLink.label}
                  </NavigationMenuLink>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {serviceNavigationGroups.map((group) => (
                    <div key={group.label} className="rounded-2xl border border-border/70 bg-white p-4 shadow-sm">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">{group.label}</p>
                      <ul className="mt-3 grid gap-2">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <DesktopNavChild child={item} active={isRouteActive(pathname, item.href)} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
            <div className="w-[380px] p-4">
              <div className="rounded-2xl border border-border/70 bg-white/90 p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">Company</p>
                <ul className="mt-3 grid gap-2">
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
        "items-start rounded-xl border border-transparent bg-transparent px-3 py-3 text-left hover:border-brand-blue-dark/10 hover:bg-secondary/70",
        active && "border-primary/15 bg-brand-ice text-primary",
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-black text-brand-blue-dark">{child.label}</span>
        {child.description ? <span className="text-xs leading-relaxed text-muted-foreground">{child.description}</span> : null}
      </div>
    </NavigationMenuLink>
  );
}
