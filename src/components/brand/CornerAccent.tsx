import { cn } from "@/lib/utils";

export function CornerAccent({ color = "blue", className }: { color?: "blue" | "red"; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute right-0 top-0 size-12 [clip-path:polygon(100%_0,0_0,100%_100%)]",
        color === "red" ? "bg-brand-red" : "bg-brand-blue",
        className
      )}
    />
  );
}
