import { Resend } from "resend";

import { escapeAttribute, escapeHtml } from "@/lib/email-utils";
import { getResendDeliveryConfig, ResendNotConfiguredError } from "@/lib/resend-config";
import type { CommercialLeadValues } from "@/lib/validators";

type CommercialLeadSubmissionResult = {
  message: string;
};

export class CommercialLeadUnavailableError extends Error {}

export async function submitCommercialLead(values: CommercialLeadValues): Promise<CommercialLeadSubmissionResult> {
  let baseConfig;

  try {
    baseConfig = getResendDeliveryConfig();
  } catch (error) {
    if (error instanceof ResendNotConfiguredError) {
      if (process.env.NODE_ENV !== "production") {
        throw new CommercialLeadUnavailableError(error.message);
      }

      throw new CommercialLeadUnavailableError(
        "Commercial lead delivery is temporarily unavailable. Please call Ayres Mechanical for immediate service.",
      );
    }

    throw error;
  }

  const fromEmail = process.env.COMMERCIAL_LEAD_FROM_EMAIL?.trim() || baseConfig.fromEmail;
  const toEmail = process.env.COMMERCIAL_LEAD_TO_EMAIL?.trim() || baseConfig.toEmail;

  const resend = new Resend(baseConfig.apiKey);
  const subject = `[B2B Enterprise Lead] ${values.companyName} - ${values.principalCity}`;

  const response = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject,
    html: buildCommercialLeadHtml(values),
    text: buildCommercialLeadText(values),
  });

  if (response.error) {
    throw new Error(`Resend commercial lead failed: ${response.error.message}`);
  }

  return {
    message: "Thanks. Ayres Mechanical will review your facility details and follow up.",
  };
}

function buildCommercialLeadHtml(values: CommercialLeadValues) {
  const rawSnapshot = escapeHtml(JSON.stringify(values, null, 2));

  return `
    <div style="font-family: Arial, sans-serif; color: #0A1A44; line-height: 1.5;">
      <h1 style="margin: 0 0 16px;">New Commercial HVAC Lead</h1>
      ${section("Lead Summary", [
        ["Lead Type", values.leadType],
        ["Submitted From", values.submittedFrom],
        ["Estimated Complexity", values.estimatedComplexity],
        ["Recommended Follow-Up", values.recommendedFollowUpAngle],
      ])}
      ${section("Facility Scope", [
        ["Portfolio Type", values.portfolioType],
        ["Scope", values.scope],
        ["Square Footage", values.squareFootage],
        ["Locations", values.locations],
      ])}
      ${section("Equipment Footprint", [["Equipment", values.equipment.join(", ")]])}
      ${section("Contact Details", [
        ["Company", values.companyName],
        ["Contact", values.contactName],
        ["Email", `<a href="mailto:${escapeAttribute(values.email)}">${escapeHtml(values.email)}</a>`, true],
        ["Phone", `<a href="tel:${escapeAttribute(values.phone)}">${escapeHtml(values.phone)}</a>`, true],
        ["Principal City", values.principalCity],
        ["Preferred Follow-Up", values.preferredFollowUp],
        ["Notes", values.notes || "None provided"],
      ])}
      <h2 style="margin-top: 24px;">Raw Payload Snapshot</h2>
      <pre style="white-space: pre-wrap; background: #F2F6FF; padding: 16px; border-radius: 12px;">${rawSnapshot}</pre>
    </div>
  `;
}

function section(title: string, rows: Array<[string, string, boolean?]>) {
  return `
    <h2 style="margin: 24px 0 8px;">${escapeHtml(title)}</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tbody>
        ${rows
          .map(([label, value, isSafeHtml]) => {
            const safeValue = isSafeHtml ? value : escapeHtml(value);
            return `
              <tr>
                <th style="width: 220px; text-align: left; border: 1px solid #D7DEEA; padding: 10px; background: #F2F6FF;">${escapeHtml(label)}</th>
                <td style="border: 1px solid #D7DEEA; padding: 10px;">${safeValue}</td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function buildCommercialLeadText(values: CommercialLeadValues) {
  return [
    "New Commercial HVAC Lead",
    "",
    "Lead Summary",
    `Lead Type: ${values.leadType}`,
    `Submitted From: ${values.submittedFrom}`,
    `Estimated Complexity: ${values.estimatedComplexity}`,
    `Recommended Follow-Up: ${values.recommendedFollowUpAngle}`,
    "",
    "Facility Scope",
    `Portfolio Type: ${values.portfolioType}`,
    `Scope: ${values.scope}`,
    `Square Footage: ${values.squareFootage}`,
    `Locations: ${values.locations}`,
    "",
    "Equipment Footprint",
    values.equipment.join(", "),
    "",
    "Contact Details",
    `Company: ${values.companyName}`,
    `Contact: ${values.contactName}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Principal City: ${values.principalCity}`,
    `Preferred Follow-Up: ${values.preferredFollowUp}`,
    `Notes: ${values.notes || "None provided"}`,
    "",
    "Raw Payload Snapshot",
    JSON.stringify(values, null, 2),
  ].join("\n");
}

