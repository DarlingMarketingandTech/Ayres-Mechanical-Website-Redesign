import type { MegaMenuColumn } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { MegaMenuLinkCard } from "./MegaMenuLinkCard";

function isRouteActive(pathname: string, href: string) {
  if (href === "/" || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type MegaMenuPanelProps = {
  columns: MegaMenuColumn[];
  pathname: string;
  className?: string;
};

export function MegaMenuPanel({ columns, pathname, className }: MegaMenuPanelProps) {
  return (
    <div
      className={cn("flex", className)}
      style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
    >
      {columns.map((column, i) => (
        <div
          key={column.heading}
          className={cn(
            "flex flex-1 flex-col gap-0.5 px-3 py-3",
            i > 0 && "border-l border-border/50",
          )}
        >
          <p className="mb-1 px-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-brand-red/90">
            {column.heading}
          </p>
          <ul className="grid gap-0.5">
            {column.items.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <MegaMenuLinkCard item={item} active={isRouteActive(pathname, item.href)} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
