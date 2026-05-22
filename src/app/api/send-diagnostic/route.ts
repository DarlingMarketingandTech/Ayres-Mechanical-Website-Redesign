import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getResendDeliveryConfigOrNull } from "@/lib/resend-config";
import { buildDiagnosticEmailHtml, buildDiagnosticEmailSubject } from "@/lib/send-diagnostic-email";
import { diagnosticSubmissionSchema } from "@/lib/validators";

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const requestLog = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const userAgent = request.headers.get("user-agent")?.trim() || "unknown";
  return `${forwardedFor || realIp || "unknown"}:${userAgent.slice(0, 120)}`;
}

function getRateLimitState(key: string) {
  const now = Date.now();

  for (const [entryKey, entry] of requestLog) {
    if (entry.resetAt <= now) {
      requestLog.delete(entryKey);
    }
  }

  const current = requestLog.get(key);

  if (!current || current.resetAt <= now) {
    const next = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    requestLog.set(key, next);
    return { limited: false, retryAfterSeconds: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) };
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return { limited: true, retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }

  current.count += 1;
  requestLog.set(key, current);
  return { limited: false, retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
}

export async function POST(request: Request) {
  const { limited, retryAfterSeconds } = getRateLimitState(getClientKey(request));

  if (limited) {
    return NextResponse.json(
      { ok: false, message: "Too many requests submitted in a short period. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  const resendConfig = getResendDeliveryConfigOrNull();

  if (!resendConfig) {
    return NextResponse.json(
      { ok: false, message: "Diagnostic email is not configured yet. Please call 317-538-9837 for immediate service." },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Please submit the form using valid fields." }, { status: 400 });
  }

  const parsed = diagnosticSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.contactInfo.website) {
    return NextResponse.json({ ok: true, message: "Thanks. Your request has been received." }, { status: 200 });
  }

  const resend = new Resend(resendConfig.apiKey);
  const subject = buildDiagnosticEmailSubject(parsed.data);
  const html = buildDiagnosticEmailHtml(parsed.data);

  try {
    const result = await resend.emails.send({
      from: resendConfig.fromEmail,
      to: [resendConfig.toEmail],
      subject,
      html,
    });

    if (result.error) {
      return NextResponse.json(
        { ok: false, message: "Unable to send this request right now. Please call 317-538-9837 for immediate service." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, message: "Thanks. A technician will follow up shortly." }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to send this request right now. Please call 317-538-9837 for immediate service." },
      { status: 502 },
    );
  }
}
