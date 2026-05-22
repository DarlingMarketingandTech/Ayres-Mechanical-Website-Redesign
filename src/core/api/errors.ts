/** Domain errors surfaced to Route Handlers with stable HTTP mapping. */

export class ServiceUnavailableError extends Error {
  readonly code = "SERVICE_UNAVAILABLE" as const;

  constructor(message: string) {
    super(message);
    this.name = "ServiceUnavailableError";
  }
}

export class ContactSubmissionUnavailableError extends ServiceUnavailableError {
  constructor(message: string) {
    super(message);
    this.name = "ContactSubmissionUnavailableError";
  }
}

export class CommercialLeadUnavailableError extends ServiceUnavailableError {
  constructor(message: string) {
    super(message);
    this.name = "CommercialLeadUnavailableError";
  }
}

export class DiagnosticSubmissionUnavailableError extends ServiceUnavailableError {
  constructor(message: string) {
    super(message);
    this.name = "DiagnosticSubmissionUnavailableError";
  }
}

export class UpstreamDeliveryError extends Error {
  readonly code = "UPSTREAM_DELIVERY_FAILED" as const;

  constructor(message: string) {
    super(message);
    this.name = "UpstreamDeliveryError";
  }
}
