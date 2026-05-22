import { Resend } from "resend";

import { DiagnosticSubmissionUnavailableError, UpstreamDeliveryError } from "@/core/api/errors";
import { buildDiagnosticEmailHtml, buildDiagnosticEmailSubject } from "@/core/emails/diagnostic-email";
import { getResendDeliveryConfig, ResendNotConfiguredError } from "@/core/integrations/resend-config";
import type { DiagnosticSubmissionPayload } from "@/lib/validators";

type DiagnosticSubmissionResult = {
  message: string;
};

export async function submitDiagnosticRequest(
  payload: DiagnosticSubmissionPayload,
): Promise<DiagnosticSubmissionResult> {
  let config;

  try {
    config = getResendDeliveryConfig();
  } catch (error) {
    if (error instanceof ResendNotConfiguredError) {
      throw new DiagnosticSubmissionUnavailableError(
        "Diagnostic email is not configured yet. Please call 317-538-9837 for immediate service.",
      );
    }

    throw error;
  }

  const resend = new Resend(config.apiKey);

  const result = await resend.emails.send({
    from: config.fromEmail,
    to: [config.toEmail],
    subject: buildDiagnosticEmailSubject(payload),
    html: buildDiagnosticEmailHtml(payload),
  });

  if (result.error) {
    throw new UpstreamDeliveryError(
      "Unable to send this request right now. Please call 317-538-9837 for immediate service.",
    );
  }

  return {
    message: "Thanks. A technician will follow up shortly.",
  };
}
