import { cn } from "@/lib/utils";

const variants = {
  light: "text-brand-blue/10",
  dark: "text-white/10",
  blue: "text-brand-blue/15",
  red: "text-brand-red/15",
};

export function BrandPattern({ variant = "light", className }: { variant?: keyof typeof variants; className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", variants[variant], className)} aria-hidden="true">
      <svg className="absolute -right-12 -top-16 h-80 w-80 opacity-80" viewBox="0 0 200 200" fill="none">
        <path d="M100 12 188 166H12L100 12Z" stroke="currentColor" strokeWidth="3" />
        <path d="M28 34h144L100 160 28 34Z" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg className="absolute -bottom-16 left-0 h-72 w-72 opacity-70" viewBox="0 0 200 200" fill="none">
        <path d="M100 188 12 34h176L100 188Z" stroke="currentColor" strokeWidth="3" />
        <path d="M36 166 100 54l64 112H36Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}
