"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";

import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { primaryNavigation, utilityNavigation, type NavigationChild } from "@/content/navigation";
import { getServiceBySlug } from "@/content/services";
import { getServiceSlugFromHref } from "@/lib/nav-service-sprite";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const topLevelNavClass = "h-auto px-3 py-2 text-sm font-bold text-brand-blue-dark hover:bg-secondary hover:text-primary data-open:bg-secondary data-popup-open:bg-secondary";
const desktopNavigation = [...primaryNavigation, ...utilityNavigation.filter((item) => item.children?.length)];

export function DesktopNav() {
  return (
    <NavigationMenu align="center" className="hidden flex-none lg:flex">
      <NavigationMenuList className="gap-1">
        {desktopNavigation.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.children?.length ? (
              <>
                <NavigationMenuTrigger className={topLevelNavClass}>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className={cn("grid gap-2 p-2", item.children.length > 4 ? "w-[620px] grid-cols-2" : "w-[380px]")}>
                    <li className={item.children.length > 4 ? "col-span-2" : undefined}>
                      <NavigationMenuLink render={<Link href={item.href} />} className="bg-secondary/70 p-3 hover:bg-secondary">
                        <div className="flex items-start gap-3">
                          {item.href === routes.services ? (
                            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                              <LayoutGrid className="size-6" aria-hidden="true" />
                            </span>
                          ) : null}
                          <div className="flex min-w-0 flex-col gap-1">
                            <span className="text-sm font-black text-brand-blue-dark">{item.label} Overview</span>
                            <span className="text-xs leading-relaxed text-muted-foreground">
                              See all {item.label.toLowerCase()} options from Ayres Mechanical.
                            </span>
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    {item.children.map((child) => (
                      <DesktopNavChild key={child.href} child={child} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink render={<Link href={item.href} />} className={cn(navigationMenuTriggerStyle(), topLevelNavClass)}>
                {item.label}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function DesktopNavChild({ child }: { child: NavigationChild }) {
  const slug = getServiceSlugFromHref(child.href);
  const service = slug ? getServiceBySlug(slug) : undefined;

  return (
    <li>
      <NavigationMenuLink render={<Link href={child.href} />} className="p-3">
        <div className={cn(service ? "flex items-start gap-3" : "flex flex-col gap-1")}>
          {service ? (
            <ServiceIcon icon={service.icon} className={service.accent === "red" ? "bg-accent text-brand-red" : ""} />
          ) : null}
          <div className={cn("flex flex-col gap-1", service && "min-w-0")}>
            <span className="text-sm font-bold text-brand-blue-dark">{child.label}</span>
            {child.description ? <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{child.description}</span> : null}
          </div>
        </div>
      </NavigationMenuLink>
    </li>
  );
}
