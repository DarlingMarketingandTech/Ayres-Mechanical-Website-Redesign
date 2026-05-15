import { cn } from "@/lib/utils";

type SectionDividerProps = {
  className?: string;
  /** Softer on dark backgrounds */
  variant?: "default" | "onDark";
};

/**
 * Lightweight blueprint-style rule — brand-aligned geometry, no raster assets.
 */
export function SectionDivider({ className, variant = "default" }: SectionDividerProps) {
  const stroke = variant === "onDark" ? "rgb(255 255 255 / 0.22)" : "rgb(13 63 184 / 0.2)";
  const faint = variant === "onDark" ? "rgb(255 255 255 / 0.08)" : "rgb(10 26 68 / 0.06)";

  return (
    <div className={cn("pointer-events-none h-8 w-full select-none", className)} aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 800 32" preserveAspectRatio="none" fill="none">
        <path d="M0 16h800" stroke={stroke} strokeWidth="1" strokeDasharray="5 7" vectorEffect="non-scaling-stroke" />
        <path d="M0 8h800M0 24h800" stroke={faint} strokeWidth="0.75" strokeDasharray="2 10" vectorEffect="non-scaling-stroke" />
        <path d="M32 4v24M768 4v24" stroke={stroke} strokeWidth="0.75" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
