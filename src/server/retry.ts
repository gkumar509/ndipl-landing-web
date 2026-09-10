/** Network-level failures worth retrying; the request never reached Google. */
const TRANSIENT_CODES = new Set([
  "EPROTO", // TLS handshake mangled — seen with VPNs and TLS-inspecting proxies
  "ECONNRESET",
  "ECONNREFUSED",
  "ETIMEDOUT",
  "EAI_AGAIN",
  "ENOTFOUND",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_SOCKET",
  "ERR_SSL_WRONG_VERSION_NUMBER",
]);

/** Marks an HTTP status the caller wants retried (429 and 5xx). */
export class RetryableHttpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RetryableHttpError";
  }
}

function isTransient(error: unknown): boolean {
  if (error instanceof RetryableHttpError) return true;
  if (error instanceof DOMException && error.name === "TimeoutError") return true;

  // fetch wraps the real cause; walk the chain looking for a known code.
  for (let e: unknown = error, depth = 0; e && depth < 5; depth++) {
    const code = (e as { code?: string }).code;
    if (code && TRANSIENT_CODES.has(code)) return true;
    e = (e as { cause?: unknown }).cause;
  }
  return false;
}

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retries `operation` on transient network failures with exponential backoff.
 * Permanent errors (bad credentials, 4xx) throw immediately — retrying those
 * only delays the response.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  { attempts = 3, baseDelayMs = 300 } = {},
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (!isTransient(error) || attempt === attempts) throw error;

      // 300ms, 600ms, 1200ms… plus jitter so retries don't align.
      const delay = baseDelayMs * 2 ** (attempt - 1) * (1 + Math.random() * 0.3);
      console.warn(
        `Transient network failure (attempt ${attempt}/${attempts}), retrying in ${Math.round(delay)}ms`,
      );
      await wait(delay);
    }
  }

  throw lastError;
}

export const __test = { isTransient };
