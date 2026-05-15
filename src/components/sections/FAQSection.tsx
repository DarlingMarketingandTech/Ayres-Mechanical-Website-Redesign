import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type FAQSectionProps = {
  faqs: { question: string; answer: string }[];
  /** Use on dark section backgrounds (e.g. homepage FAQ). */
  variant?: "light" | "dark";
};

export function FAQSection({ faqs, variant = "light" }: FAQSectionProps) {
  if (!faqs.length) return null;

  const dark = variant === "dark";

  return (
    <div className={cn("rounded-2xl border p-2 shadow-sm", dark ? "border-white/15 bg-white/10" : "border-border bg-white")}>
      <div className={cn("divide-y", dark ? "divide-white/10" : "divide-border/80")}>
        {faqs.map((faq) => (
          <details key={faq.question} className="group px-3 sm:px-4">
            <summary
              className={cn(
                "flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 pr-1 text-left outline-none",
                "marker:content-none [&::-webkit-details-marker]:hidden",
                "focus-visible:rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50",
                dark ? "text-white" : "text-brand-blue-dark",
              )}
            >
              <h3 className="text-base font-black leading-snug">{faq.question}</h3>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none",
                  dark ? "text-white/70" : "text-muted-foreground",
                )}
                aria-hidden
              />
            </summary>
            <div className={cn("pb-5 pr-2 text-sm leading-7 sm:text-base", dark ? "text-white/80" : "text-muted-foreground")}>
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}