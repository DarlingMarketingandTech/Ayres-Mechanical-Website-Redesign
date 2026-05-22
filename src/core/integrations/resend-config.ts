export class ResendNotConfiguredError extends Error {
  constructor(featureLabel = "Email delivery") {
    super(
      `${featureLabel} is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and RESEND_TO_EMAIL in .env.local.`,
    );
    this.name = "ResendNotConfiguredError";
  }
}

export type ResendDeliveryConfig = {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
};

export function getResendDeliveryConfig(featureLabel?: string): ResendDeliveryConfig {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  const toEmail = process.env.RESEND_TO_EMAIL?.trim();

  if (!apiKey || !fromEmail || !toEmail) {
    throw new ResendNotConfiguredError(featureLabel);
  }

  return { apiKey, fromEmail, toEmail };
}

export function getResendDeliveryConfigOrNull(): ResendDeliveryConfig | null {
  try {
    return getResendDeliveryConfig();
  } catch {
    return null;
  }
}

export function getCommercialLeadDeliveryConfig(): ResendDeliveryConfig {
  const base = getResendDeliveryConfig("Commercial lead delivery");
  const fromEmail = process.env.COMMERCIAL_LEAD_FROM_EMAIL?.trim() || base.fromEmail;
  const toEmail = process.env.COMMERCIAL_LEAD_TO_EMAIL?.trim() || base.toEmail;
  return { ...base, fromEmail, toEmail };
}
