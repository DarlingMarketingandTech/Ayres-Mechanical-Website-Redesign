import { PageHero } from "@/components/sections/Hero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function BasicPageTemplate({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <Section>
        <Container>{children}</Container>
      </Section>
    </>
  );
}
