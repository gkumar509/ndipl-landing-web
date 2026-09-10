import "server-only";

import { serverEnv } from "@/lib/env";
import { RetryableHttpError, withRetry } from "@/server/retry";

type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

/**
 * Verifies a reCAPTCHA v3 token with Google. Returns false for any failure —
 * the caller only needs to know whether to accept the submission.
 */
export async function verifyRecaptcha(
  token: string,
  expectedAction: string,
  remoteIp?: string,
): Promise<{ ok: boolean; reason?: string }> {
  const env = serverEnv();

  const body = new URLSearchParams({
    secret: env.RECAPTCHA_SECRET_KEY,
    response: token,
  });
  if (remoteIp) body.set("remoteip", remoteIp);

  let data: SiteVerifyResponse;
  try {
    // Retried for the same reason as the Sheets write: a dropped handshake
    // must not read as "this visitor is a bot".
    data = await withRetry(async () => {
      const res = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
          cache: "no-store",
          signal: AbortSignal.timeout(10_000),
        },
      );
      if (!res.ok && (res.status === 429 || res.status >= 500)) {
        throw new RetryableHttpError(`siteverify returned ${res.status}`);
      }
      return (await res.json()) as SiteVerifyResponse;
    });
  } catch {
    return { ok: false, reason: "verification-unavailable" };
  }

  if (!data.success) {
    return { ok: false, reason: data["error-codes"]?.join(",") ?? "rejected" };
  }
  if (data.action && data.action !== expectedAction) {
    return { ok: false, reason: "action-mismatch" };
  }
  if ((data.score ?? 0) < env.RECAPTCHA_MIN_SCORE) {
    return { ok: false, reason: "low-score" };
  }

  return { ok: true };
}
