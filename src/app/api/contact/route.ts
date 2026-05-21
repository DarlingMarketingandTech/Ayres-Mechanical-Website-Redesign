import { NextResponse } from "next/server";

import { ContactSubmissionUnavailableError, submitContactRequest } from "@/lib/contact-submission";
import { contactFormSchema } from "@/lib/validators";

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

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Please submit the contact form using valid form fields." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true, message: "Thanks. Your request has been received." }, { status: 200 });
  }

  try {
    const result = await submitContactRequest(parsed.data);
    return NextResponse.json({ ok: true, ...result }, { status: 200 });
  } catch (error) {
    if (error instanceof ContactSubmissionUnavailableError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 503 });
    }

    return NextResponse.json({ ok: false, message: "Unable to send this request right now. Please call for immediate service." }, { status: 502 });
  }
}
