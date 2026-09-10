import "server-only";

import { JWT } from "google-auth-library";

import { serverEnv } from "@/lib/env";
import { RetryableHttpError, withRetry } from "@/server/retry";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

let jwt: JWT | null = null;

function authClient(): JWT {
  if (jwt) return jwt;
  const env = serverEnv();
  jwt = new JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: env.GOOGLE_PRIVATE_KEY,
    scopes: SCOPES,
  });
  return jwt;
}

/**
 * Appends one row to the configured sheet. Uses the REST endpoint directly
 * rather than the `googleapis` mega-package — this is the only call we make.
 *
 * Both the token exchange and the append are retried on transient network
 * failures: losing an enquiry to a single dropped TLS handshake is worse than
 * making the visitor wait an extra second.
 */
export async function appendSheetRow(values: (string | number)[]) {
  const env = serverEnv();

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.GOOGLE_SHEETS_SPREADSHEET_ID)}` +
    `/values/${encodeURIComponent(env.GOOGLE_SHEETS_RANGE)}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  await withRetry(async () => {
    const { token } = await authClient().getAccessToken();
    if (!token) throw new Error("Could not obtain Google access token");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [values] }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      const detail = `Google Sheets append failed (${res.status}): ${await res.text()}`;
      // 429/5xx are worth another attempt; 4xx means the request itself is wrong.
      if (res.status === 429 || res.status >= 500) {
        throw new RetryableHttpError(detail);
      }
      throw new Error(detail);
    }
  });
}
