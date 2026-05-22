import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { media } from "@/content/media";

const rheemAsset = media.partners.rheemDealer;
const mitsubishiAsset = media.partners.mitsubishi;

export function EliteCertificationsBanner() {
  return (
    <Section className="relative overflow-hidden bg-brand-blue-dark py-12 sm:py-16">
      {/* Subtle background texture — diagonal rules */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(120deg, #fff 0px, #fff 1px, transparent 1px, transparent 48px)",
        }}
      />

      <Container>
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: label + statement */}
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-red">
                Elite Certifications
              </p>
            </div>
            <h2 className="mt-4 text-2xl font-black text-white leading-snug sm:text-3xl">
              Factory-Trained.<br />
              <span className="text-white/60">Built to the highest standard.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70 max-w-md">
              As a Rheem Dealer and a Mitsubishi Diamond Contractor, we are factory-trained to provide the highest level of installation and service available today.
            </p>
          </div>

          {/* Right: certification badges */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch lg:flex-shrink-0">
            {/* Rheem badge */}
            <div className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.09] sm:min-w-[200px]">
              <div className="flex h-16 w-full items-center justify-center">
                <CloudinaryImage
                  asset={rheemAsset}
                  disableLqip
                  width={rheemAsset.width}
                  height={rheemAsset.height}
                  sizes="180px"
                  className="h-auto max-h-[44px] w-full object-contain brightness-0 invert"
                />
              </div>
              <div className="mt-1 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                  Rheem
                </p>
                <p className="text-[11px] font-semibold text-white/30">Pro Partner Dealer</p>
              </div>
              {/* Accent bar */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl bg-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Divider */}
            <div className="hidden items-center sm:flex">
              <div className="h-full w-px bg-white/10" />
            </div>

            {/* Mitsubishi badge */}
            <div className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.09] sm:min-w-[200px]">
              <div className="flex h-16 w-full items-center justify-center">
                <CloudinaryImage
                  asset={mitsubishiAsset}
                  disableLqip
                  width={mitsubishiAsset.width}
                  height={mitsubishiAsset.height}
                  sizes="180px"
                  className="h-auto max-h-[44px] w-full object-contain brightness-0 invert"
                />
              </div>
              <div className="mt-1 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                  Mitsubishi Electric
                </p>
                <p className="text-[11px] font-semibold text-white/30">Diamond Contractor</p>
              </div>
              {/* Accent bar */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl bg-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
