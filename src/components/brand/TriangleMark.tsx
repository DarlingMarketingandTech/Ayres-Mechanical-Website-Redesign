import { cn } from "@/lib/utils";

type TriangleMarkProps = {
  variant?: "stacked" | "horizontal" | "icon";
  className?: string;
  tone?: "default" | "light";
};

export function TriangleMark({ variant = "stacked", className, tone = "default" }: TriangleMarkProps) {
  const red = tone === "light" ? "#FF6B70" : "#D71920";
  const blue = tone === "light" ? "#8FB0FF" : "#0D3FB8";
  const viewBox = variant === "horizontal" ? "0 0 92 44" : "0 0 48 72";

  if (variant === "horizontal") {
    return (
      <svg viewBox={viewBox} aria-hidden="true" className={cn("h-8 w-16", className)}>
        <polygon points="5,39 25,5 45,39" fill={red} />
        <polygon points="50,5 70,39 90,5" fill={blue} />
      </svg>
    );
  }

  return (
    <svg viewBox={viewBox} aria-hidden="true" className={cn("h-12 w-8", className)}>
      <polygon points="4,34 24,2 44,34" fill={red} />
      <polygon points="4,38 24,70 44,38" fill={blue} />
    </svg>
  );
}
