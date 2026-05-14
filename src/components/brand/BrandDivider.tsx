import { cn } from "@/lib/utils";
import { TriangleMark } from "./TriangleMark";

export function BrandDivider({ className, showMark = true }: { className?: string; showMark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden="true">
      <span className="h-1 flex-1 rounded-full bg-brand-red" />
      {showMark ? <TriangleMark variant="horizontal" className="h-4 w-10 shrink-0" /> : null}
      <span className="h-1 flex-1 rounded-full bg-brand-blue" />
    </div>
  );
}
