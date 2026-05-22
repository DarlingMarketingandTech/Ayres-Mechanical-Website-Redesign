import type { ZodType } from "zod";

import { getRateLimitState } from "@/core/api/rate-limit";
import {
  jsonFromSubmissionError,
  jsonHoneypotSuccess,
  jsonInvalidBody,
  jsonOk,
  jsonRateLimited,
  jsonValidationErrors,
} from "@/core/api/responses";

type PostRouteOptions<T> = {
  schema: ZodType<T>;
  invalidBodyMessage?: string;
  honeypot?: (values: T) => boolean;
  execute: (values: T) => Promise<{ message: string } & Record<string, unknown>>;
  logLabel?: string;
};

export async function handleValidatedPost<T>(request: Request, options: PostRouteOptions<T>) {
  const { limited, retryAfterSeconds } = getRateLimitState(request);

  if (limited) {
    return jsonRateLimited(retryAfterSeconds);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonInvalidBody(options.invalidBodyMessage);
  }

  const parsed = options.schema.safeParse(body);

  if (!parsed.success) {
    return jsonValidationErrors(parsed.error);
  }

  if (options.honeypot?.(parsed.data)) {
    return jsonHoneypotSuccess();
  }

  try {
    const result = await options.execute(parsed.data);
    return jsonOk(result);
  } catch (error) {
    return jsonFromSubmissionError(error, { logLabel: options.logLabel });
  }
}
