import { HomeSectionHeading } from "@/components/home/SectionEyebrow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function ComfortSolutionsSection() {
  return (
    <Section className="border-y border-brand-blue-dark/8 bg-white">
      <Container>
        <div className="max-w-3xl">
          <HomeSectionHeading eyebrow="COMFORT SYSTEMS" title="Expert comfort solutions tailored to your home and budget." />
          <p className="mt-5 leading-8 text-muted-foreground">
            At Ayres Mechanical, we specialize in designing the perfect climate control systems for your home or
            business. A properly designed system doesn&apos;t just keep you comfortable—it maximizes energy efficiency,
            putting money back in your pocket.
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            We work with Mitsubishi ductless and Rheem equipment lines—partner marks appear in the credentials strip when
            owner-approved, so brand usage stays intentional and accurate.
          </p>
        </div>
      </Container>
    </Section>
  );
}
