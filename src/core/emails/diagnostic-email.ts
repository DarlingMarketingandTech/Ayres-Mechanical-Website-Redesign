import type { DiagnosticSubmissionPayload } from "@/lib/validators";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatPhoneTel(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  return digits ? `+${digits}` : phone;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 12px;border-bottom:1px solid #e8edf8;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 12px;border-bottom:1px solid #e8edf8;font-size:15px;font-weight:600;color:#0a1a44;vertical-align:top;">${value}</td>
  </tr>`;
}

export function buildDiagnosticEmailSubject(payload: DiagnosticSubmissionPayload) {
  const propertyLabel =
    payload.metaData.propertyTypeLabel ||
    (payload.metaData.propertyType === "commercial" ? "Commercial" : "Residential");
  const city = payload.contactInfo.city.trim();
  return `[New Lead] ${propertyLabel} Triage — ${city}`;
}

export function buildDiagnosticEmailHtml(payload: DiagnosticSubmissionPayload) {
  const { metaData, userAnswers, contactInfo, pathSummary = [] } = payload;
  const telHref = `tel:${formatPhoneTel(contactInfo.phone)}`;
  const phoneLink = `<a href="${telHref}" style="color:#0d3fb8;font-size:20px;font-weight:800;text-decoration:none;">${escapeHtml(contactInfo.phone)}</a>`;

  const answerRows = Object.entries(userAnswers)
    .map(([stepId, answer]) => row(stepId, escapeHtml(answer)))
    .join("");

  const pathList =
    pathSummary.length > 0
      ? `<ul style="margin:8px 0 0;padding-left:18px;color:#0a1a44;">${pathSummary.map((item) => `<li style="margin-bottom:6px;font-size:14px;line-height:1.5;">${escapeHtml(item)}</li>`).join("")}</ul>`
      : "<p style=\"margin:8px 0 0;font-size:14px;color:#6b7280;\">No path summary recorded.</p>";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New diagnostic lead</title>
</head>
<body style="margin:0;padding:0;background:#f3f7ff;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f7ff;padding:16px 8px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #d9e4ff;">
          <tr>
            <td style="background:#0d3fb8;padding:18px 20px;">
              <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#f3f7ff;">Ayres Virtual Triage</p>
              <h1 style="margin:6px 0 0;font-size:22px;line-height:1.2;color:#ffffff;">New HVAC diagnostic lead</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 20px 8px;">
              <p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#0a1a44;"><strong>Tap to call customer:</strong><br />${phoneLink}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8edf8;border-radius:12px;overflow:hidden;">
                ${row("Name", escapeHtml(contactInfo.name))}
                ${row("City", escapeHtml(contactInfo.city))}
                ${row("Property", escapeHtml(metaData.propertyTypeLabel || metaData.propertyType || "—"))}
                ${row("System age", escapeHtml(metaData.systemAgeLabel || metaData.systemAge || "—"))}
                ${row("Existing customer", escapeHtml(metaData.existingCustomerLabel || metaData.existingCustomer || "—"))}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 20px 18px;">
              <h2 style="margin:0 0 8px;font-size:13px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#d71920;">Triage path</h2>
              ${pathList}
              ${
                answerRows
                  ? `<h2 style="margin:18px 0 8px;font-size:13px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#d71920;">Answers</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8edf8;border-radius:12px;overflow:hidden;">${answerRows}</table>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="background:#0a1a44;padding:14px 20px;">
              <p style="margin:0;font-size:12px;color:#f3f7ff;">Ayres Mechanical Inc. · Central Indiana · 317-538-9837</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
