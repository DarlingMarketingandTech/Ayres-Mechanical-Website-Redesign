import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

function Skeleton({ className }: { className?: string }) {
  return <div className={className} aria-hidden="true" />;
}

export default function SiteLoading() {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <Container className="grid gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12 lg:py-24">
          <div className="space-y-4 sm:space-y-5">
            <Skeleton className="h-4 w-40 animate-pulse rounded-md bg-muted" />
            <Skeleton className="h-12 w-full max-w-2xl animate-pulse rounded-lg bg-muted sm:h-14" />
            <Skeleton className="h-12 w-full max-w-xl animate-pulse rounded-lg bg-muted/80 sm:h-10" />
            <Skeleton className="h-20 w-full max-w-2xl animate-pulse rounded-lg bg-muted/60" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Skeleton className="h-12 w-full animate-pulse rounded-lg bg-muted sm:w-44" />
              <Skeleton className="h-12 w-full animate-pulse rounded-lg bg-muted/70 sm:w-36" />
            </div>
          </div>
          <Skeleton className="aspect-4/3 min-h-60 w-full animate-pulse rounded-3xl bg-muted sm:min-h-104 lg:min-h-[420px]" />
        </Container>
      </section>

      <Section>
        <Container className="space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-4 w-28 animate-pulse rounded-md bg-muted" />
            <Skeleton className="h-10 w-full max-w-lg animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 animate-pulse rounded-3xl bg-muted/80" />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
