import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { media } from "@/content/media";

const credentials = [
  {
    asset: media.partners.rheemDealer,
    title: "Rheem Pro Partner",
    description: "Factory-authorized dealer with priority support and warranty backing.",
  },
  {
    asset: media.partners.mitsubishi,
    title: "Mitsubishi Diamond Contractor",
    description: "Elite ductless certification for precision installation and dedicated service.",
  },
] as const;

export function EliteCertificationsBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-blue-dark py-12 sm:py-16" aria-labelledby="elite-cert-heading">
      <Container>
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Credential logo cards — white background so logos display in full brand color */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch lg:flex-shrink-0">
            {credentials.map((cred) => (
              <div
                key={cred.title}
                className="group relative flex flex-col items-center gap-3 rounded-2xl bg-white px-8 py-6 shadow-lg ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl sm:min-w-[200px]"
              >
                <div className="flex h-16 w-full items-center justify-center">
                  <CloudinaryImage
                    asset={cred.asset}
                    disableLqip
                    width={cred.asset.width}
                    height={cred.asset.height}
                    sizes="180px"
                    className="h-auto max-h-[44px] w-full object-contain"
                  />
                </div>
                <p className="text-center text-xs font-black uppercase tracking-[0.16em] text-brand-blue-dark">
                  {cred.title}
                </p>
                <p className="hidden text-center text-xs leading-relaxed text-muted-foreground sm:block">
                  {cred.description}
                </p>
              </div>
            ))}
          </div>

          {/* Copy block */}
          <div className="text-white">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/60">Elite Certifications</p>
            <h2
              id="elite-cert-heading"
              className="mt-3 text-(length:--text-section) font-black text-balance text-white"
            >
              Factory-trained to deliver the highest level of service.
            </h2>
            <p className="mt-4 text-(length:--text-lead) leading-relaxed text-white/75">
              As a Rheem Pro Partner and Mitsubishi Diamond Contractor, Ayres Mechanical is certified at the highest
              level — trained directly by the manufacturers for precision installation, warranty backing, and dedicated
              technical support.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
