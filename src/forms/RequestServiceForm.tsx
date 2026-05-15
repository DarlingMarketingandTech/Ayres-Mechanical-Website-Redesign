import { ContactForm } from "./ContactForm";
import type { ContactFormValues } from "@/lib/validators";

export function RequestServiceForm({ prefill }: { prefill?: Partial<ContactFormValues> }) {
  return <ContactForm prefill={prefill} formId="request-service-form" />;
}
