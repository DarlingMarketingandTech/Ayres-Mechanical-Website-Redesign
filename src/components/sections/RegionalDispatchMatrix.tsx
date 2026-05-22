import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { RegionalDispatchCountyPicker } from "@/components/sections/RegionalDispatchCountyPicker";
import { media } from "@/content/media";
import { regionalDispatchCounties } from "@/content/regional-dispatch";

export function RegionalDispatchMatrix() {
  return (
    <Section id="dispatch-coverage" className="scroll-mt-28 bg-brand-ice">
      <Container>
        <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Regional dispatch matrix</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
              Commercial coverage for Central Indiana facility teams.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Select a county to see the commercial hubs, facility classes, and service relevance for multi-site readiness.
            </p>
          </div>
          <figure className="relative aspect-video overflow-hidden rounded-[2rem] border border-white bg-white shadow-sm">
            <CloudinaryImage
              asset={media.commercialPortal.dispatchMap}
              fill
              width={1600}
              height={893}
              sizes="(min-width: 1024px) 38vw, 100vw"
              aspectRatio="16:9"
              className="object-cover object-center"
              crop="fill"
              gravity="auto"
            />
            <div className="absolute inset-0 bg-white/25" aria-hidden="true" />
            <figcaption className="sr-only">{media.commercialPortal.dispatchMap.alt}</figcaption>
          </figure>
        </div>

        <RegionalDispatchCountyPicker counties={regionalDispatchCounties} />
      </Container>
    </Section>
  );
}
