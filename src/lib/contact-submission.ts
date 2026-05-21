import type { ContactFormValues } from "@/lib/validators";

type ContactSubmissionResult = {
  message: string;
};

const contactWebhookUrl = process.env.CONTACT_REQUEST_WEBHOOK_URL?.trim();

export class ContactSubmissionUnavailableError extends Error {}

export async function submitContactRequest(values: ContactFormValues): Promise<ContactSubmissionResult> {
  if (!contactWebhookUrl) {
    throw new ContactSubmissionUnavailableError(
      "Online request delivery is temporarily unavailable. Please call Ayres Mechanical for immediate service.",
    );
  }

  const response = await fetch(contactWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({
      source: "ayres-mechanical-website",
      submittedAt: new Date().toISOString(),
      values,
    }),
  });

  if (!response.ok) {
    throw new Error(`Contact webhook failed with status ${response.status}`);
  }
  return {
    message: "Thanks. Your request has been sent to Ayres Mechanical.",
  };
}
