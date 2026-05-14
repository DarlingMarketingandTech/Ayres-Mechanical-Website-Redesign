import { Container } from "./Container";
import { Section } from "./Section";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <Container>{children}</Container>
    </Section>
  );
}
