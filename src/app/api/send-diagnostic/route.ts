import { handleValidatedPost } from "@/core/api/post-route";
import { submitDiagnosticRequest } from "@/core/services/diagnostic-submission";
import { diagnosticSubmissionSchema } from "@/lib/validators";

export async function POST(request: Request) {
  return handleValidatedPost(request, {
    schema: diagnosticSubmissionSchema,
    invalidBodyMessage: "Please submit the form using valid fields.",
    honeypot: (values) => Boolean(values.contactInfo.website),
    execute: submitDiagnosticRequest,
    logLabel: "Diagnostic request delivery failed.",
  });
}
