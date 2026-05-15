import { BookingRequestForm } from "./BookingRequestForm";
import type { BookingRequestFormInput } from "@/lib/validators";

export function RequestServiceForm({ prefill }: { prefill?: Partial<BookingRequestFormInput> }) {
  return <BookingRequestForm prefill={prefill} formId="request-service-form" />;
}
