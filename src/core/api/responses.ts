import { NextResponse } from "next/server";
import type { ZodError } from "zod";

import {
  CommercialLeadUnavailableError,
  ContactSubmissionUnavailableError,
  DiagnosticSubmissionUnavailableError,
  ServiceUnavailableError,
  UpstreamDeliveryError,
} from "@/core/api/errors";

type JsonRecord = Record<string, unknown>;

export function jsonOk(body: JsonRecord, status = 200) {
  return NextResponse.json({ ok: true, ...body }, { status });
}

export function jsonError(message: string, status: number, extra?: JsonRecord) {
  return NextResponse.json({ ok: false, message, ...extra }, { status });
}

export function jsonValidationErrors(error: ZodError) {
  return NextResponse.json(
    { ok: false, errors: error.flatten().fieldErrors },
    { status: 400 },
  );
}

export function jsonInvalidBody(message = "Please submit the form using valid fields.") {
  return jsonError(message, 400);
}

export function jsonRateLimited(retryAfterSeconds: number) {
  return NextResponse.json(
    {
      ok: false,
      message: "Too many requests submitted in a short period. Please wait a few minutes and try again.",
    },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
}

export function jsonHoneypotSuccess(message = "Thanks. Your request has been received.") {
  return jsonOk({ message }, 200);
}

function logSubmissionError(error: unknown, options?: { logLabel?: string }) {
  if (!options?.logLabel) return;

  if (process.env.NODE_ENV !== "production") {
    console.error(options.logLabel, error);
    return;
  }

  // Avoid dumping provider payloads in production logs by default.
  console.error(options.logLabel);
}

/** Maps known submission errors to stable client responses. */
export function jsonFromSubmissionError(error: unknown, options?: { logLabel?: string }) {
  if (error instanceof ContactSubmissionUnavailableError || error instanceof CommercialLeadUnavailableError || error instanceof DiagnosticSubmissionUnavailableError || error instanceof ServiceUnavailableError) {
    return jsonError(error.message, 503);
  }

  if (error instanceof UpstreamDeliveryError) {
    logSubmissionError(error, options);
    return jsonError(error.message, 502);
  }

  logSubmissionError(error, options);

  return jsonError(
    "Unable to send this request right now. Please call for immediate service.",
    502,
  );
}
