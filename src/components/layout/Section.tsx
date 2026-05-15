import { cn } from "@/lib/utils";

export function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-[var(--section-y)] lg:py-24", className)} {...props} />
  );
}
