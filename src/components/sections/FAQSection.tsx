import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs.length) return null;
  return (
    <Accordion className="rounded-2xl border bg-white p-2 shadow-sm">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} value={String(index)} className="px-4">
          <AccordionTrigger className="text-base font-black text-brand-blue-dark">{faq.question}</AccordionTrigger>
          <AccordionContent className="leading-7 text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
