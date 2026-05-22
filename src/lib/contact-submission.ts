import { Resend } from "resend";

import { escapeAttribute, escapeHtml } from "@/lib/email-utils";
import { getResendDeliveryConfig, ResendNotConfiguredError } from "@/lib/resend-config";
import type { ContactFormValues } from "@/lib/validators";

type ContactSubmissionResult = {
  message: string;
};

export class ContactSubmissionUnavailableError extends Error {}

export async function submitContactRequest(values: ContactFormValues): Promise<ContactSubmissionResult> {
  let config;

  try {
    config = getResendDeliveryConfig();
  } catch (error) {
    if (error instanceof ResendNotConfiguredError) {
      if (process.env.NODE_ENV !== "production") {
        throw new ContactSubmissionUnavailableError(error.message);
      }

      throw new ContactSubmissionUnavailableError(
        "Online request delivery is temporarily unavailable. Please call Ayres Mechanical for immediate service.",
      );
    }

    throw error;
  }

  const resend = new Resend(config.apiKey);
  const subject = `[Website Contact] ${values.name} — ${values.serviceType}`;

  const response = await resend.emails.send({
    from: config.fromEmail,
    to: config.toEmail,
    subject,
    html: buildContactEmailHtml(values),
    text: buildContactEmailText(values),
  });

  if (response.error) {
    throw new Error(`Resend contact request failed: ${response.error.message}`);
  }

  return {
    message: "Thanks. Your request has been sent to Ayres Mechanical.",
  };
}

function buildContactEmailHtml(values: ContactFormValues) {
  const emailRow = values.email
    ? `<a href="mailto:${escapeAttribute(values.email)}">${escapeHtml(values.email)}</a>`
    : "Not provided";

  return `
    <div style="font-family: Arial, sans-serif; color: #0A1A44; line-height: 1.5;">
      <h1 style="margin: 0 0 16px;">New website contact request</h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          ${contactRow("Name", values.name)}
          ${contactRow("Phone", `<a href="tel:${escapeAttribute(values.phone)}">${escapeHtml(values.phone)}</a>`, true)}
          ${contactRow("Email", emailRow, true)}
          ${contactRow("Service type", values.serviceType)}
          ${contactRow("Customer type", values.customerType)}
          ${contactRow("Urgency", values.urgency)}
          ${contactRow("Preferred contact", values.preferredContact)}
          ${contactRow("Message", escapeHtml(values.message))}
        </tbody>
      </table>
    </div>
  `;
}

function contactRow(label: string, value: string, isSafeHtml = false) {
  const safeValue = isSafeHtml ? value : escapeHtml(value);
  return `
    <tr>
      <th style="width: 200px; text-align: left; border: 1px solid #D7DEEA; padding: 10px; background: #F2F6FF;">${escapeHtml(label)}</th>
      <td style="border: 1px solid #D7DEEA; padding: 10px;">${safeValue}</td>
    </tr>
  `;
}

function buildContactEmailText(values: ContactFormValues) {
  return [
    "New website contact request",
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email || "Not provided"}`,
    `Service type: ${values.serviceType}`,
    `Customer type: ${values.customerType}`,
    `Urgency: ${values.urgency}`,
    `Preferred contact: ${values.preferredContact}`,
    "",
    "Message",
    values.message,
  ].join("\n");
}
