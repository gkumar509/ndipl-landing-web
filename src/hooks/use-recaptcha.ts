"use client";

import { useCallback, useEffect } from "react";

import { publicEnv } from "@/lib/env";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const SCRIPT_ID = "recaptcha-v3";

/** Shared across every mount so the script is fetched at most once per page. */
let loader: Promise<void> | null = null;

function loadRecaptcha(siteKey: string): Promise<void> {
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(resolve);
      return;
    }

    const existing = document.getElementById(
      SCRIPT_ID,
    ) as HTMLScriptElement | null;
    const script = existing ?? document.createElement("script");

    script.addEventListener("load", () =>
      window.grecaptcha
        ? window.grecaptcha.ready(resolve)
        : reject(new Error("reCAPTCHA failed to initialise")),
    );
    script.addEventListener("error", () =>
      reject(new Error("reCAPTCHA script failed to load")),
    );

    if (!existing) {
      script.id = SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      document.head.appendChild(script);
    }
  }).catch((error) => {
    // Let a later submit retry instead of caching the failure forever.
    loader = null;
    throw error;
  });

  return loader;
}

/**
 * Loads the reCAPTCHA v3 script on demand and returns `execute`, which mints a
 * token for a given action. Mount this only where a protected form renders —
 * it keeps the script and badge off every other page.
 */
export function useRecaptcha() {
  const siteKey = publicEnv.recaptchaSiteKey;

  // Warm the script up front so the first submit isn't waiting on a download.
  useEffect(() => {
    if (siteKey) void loadRecaptcha(siteKey).catch(() => {});
  }, [siteKey]);

  const execute = useCallback(
    async (action: string): Promise<string> => {
      if (!siteKey) throw new Error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set");
      await loadRecaptcha(siteKey);
      return window.grecaptcha!.execute(siteKey, { action });
    },
    [siteKey],
  );

  return { execute };
}
