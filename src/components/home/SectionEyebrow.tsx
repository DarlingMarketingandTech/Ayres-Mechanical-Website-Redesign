import { cn } from "@/lib/utils";

export function SectionEyebrow({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={cn("text-sm font-black uppercase tracking-[0.28em]", light ? "text-white/80" : "text-brand-red", className)}>{children}</p>
  );
}

export function HomeSectionHeading({
  eyebrow,
  title,
  description,
  light,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      <SectionEyebrow light={light}>{eyebrow}</SectionEyebrow>
      <h2 className={cn("mt-3 text-(length:--text-section) font-black text-balance", light ? "text-white" : "text-brand-blue-dark")}>{title}</h2>
      {description ? (
        <p className={cn("mt-4 text-(length:--text-lead) leading-relaxed", light ? "text-white/75" : "text-muted-foreground")}>{description}</p>
      ) : null}
    </div>
  );
}
