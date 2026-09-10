import assert from "node:assert/strict";
import { test } from "node:test";

import { RetryableHttpError, withRetry, __test } from "./retry.ts";

const { isTransient } = __test;

const eproto = () => Object.assign(new Error("tls"), { code: "EPROTO" });

test("recognises transient failures, including nested causes", () => {
  assert.equal(isTransient(eproto()), true);
  assert.equal(
    isTransient(new Error("fetch failed", { cause: eproto() })),
    true,
  );
  assert.equal(isTransient(new RetryableHttpError("503")), true);
});

test("treats real failures as permanent", () => {
  assert.equal(isTransient(new Error("invalid_grant")), false);
  assert.equal(
    isTransient(Object.assign(new Error("nope"), { code: "EACCES" })),
    false,
  );
});

test("retries a transient failure and returns the eventual result", async () => {
  let calls = 0;
  const result = await withRetry(
    async () => {
      calls += 1;
      if (calls < 3) throw eproto();
      return "written";
    },
    { attempts: 3, baseDelayMs: 1 },
  );

  assert.equal(result, "written");
  assert.equal(calls, 3);
});

test("gives up after the attempt budget and rethrows the last error", async () => {
  let calls = 0;
  await assert.rejects(
    withRetry(
      async () => {
        calls += 1;
        throw eproto();
      },
      { attempts: 3, baseDelayMs: 1 },
    ),
    /tls/,
  );
  assert.equal(calls, 3);
});

test("does not retry a permanent failure", async () => {
  let calls = 0;
  await assert.rejects(
    withRetry(
      async () => {
        calls += 1;
        throw new Error("invalid_grant");
      },
      { attempts: 3, baseDelayMs: 1 },
    ),
    /invalid_grant/,
  );
  assert.equal(calls, 1, "a permanent error must not be retried");
});
