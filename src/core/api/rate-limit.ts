const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const requestLog = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const userAgent = request.headers.get("user-agent")?.trim() || "unknown";
  return `${forwardedFor || realIp || "unknown"}:${userAgent.slice(0, 120)}`;
}

export function getRateLimitState(request: Request) {
  const key = getClientKey(request);
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
