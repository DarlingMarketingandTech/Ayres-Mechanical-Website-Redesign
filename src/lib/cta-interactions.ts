import { cn } from "@/lib/utils";

/**
 * Extra motion and focus polish for primary “Request service” links that use `buttonVariants({ variant: "emergency" })`.
 * Add `group/rs-cta` scope for child icon motion via `data-icon` attributes.
 */
export function requestServiceCtaClassNames(className?: string) {
  return cn(
    "group/rs-cta shadow-lg shadow-brand-red/15 transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none",
    "hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-red/35",
    "focus-visible:ring-2 focus-visible:ring-brand-red/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:translate-y-0 active:shadow-md",
    "[&_[data-icon='inline-end']]:transition-transform [&_[data-icon='inline-end']]:duration-300 [&_[data-icon='inline-end']]:motion-reduce:transform-none",
    "[&_[data-icon='inline-end']]:group-hover/rs-cta:translate-x-1",
    className,
  );
}

/** Outline / phone-style header CTAs paired with the emergency button. */
export function phoneOutlineCtaClassNames(className?: string) {
  return cn(
    "group/phone-cta transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none",
    "hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-blue-dark/12",
    "focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "[&_[data-icon='inline-start']]:transition-transform [&_[data-icon='inline-start']]:duration-300 [&_[data-icon='inline-start']]:motion-reduce:transform-none",
    "[&_[data-icon='inline-start']]:group-hover/phone-cta:-translate-y-0.5 [&_[data-icon='inline-start']]:group-hover/phone-cta:scale-110",
    className,
  );
}

/** “Request service” on dark surfaces (e.g. emergency strip dark button). */
export function requestServiceOnDarkCtaClassNames(className?: string) {
  return cn(
    "group/rs-cta shadow-lg shadow-black/25 transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none",
    "hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40",
    "focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue-dark",
    "active:translate-y-0 active:shadow-md",
    className,
  );
}

/** Dark variant primary row (e.g. mobile “Book service”). */
export function bookServiceDarkCtaClassNames(className?: string) {
  return cn(
    "group/book-cta shadow-lg shadow-brand-blue-dark/25 transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none",
    "hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-blue-dark/45",
    "focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue-dark",
    className,
  );
}
