import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { LOCALES } from "./routing.ts";

const load = (locale: string) =>
  JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"));

/** Flattened key paths, including array indices, so shapes must match exactly. */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return [
      `${prefix}[length]=${value.length}`,
      ...value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`)),
    ];
  }
  if (value && typeof value === "object") {
    return Object.keys(value as object)
      .sort()
      .flatMap((key) =>
        keyPaths(
          (value as Record<string, unknown>)[key],
          prefix ? `${prefix}.${key}` : key,
        ),
      );
  }
  return [prefix];
}

test("every locale has the same message keys as English", () => {
  const english = keyPaths(load("en"));
  assert.ok(english.length > 200, "English catalogue looks truncated");

  for (const locale of LOCALES.filter((l) => l !== "en")) {
    const actual = keyPaths(load(locale));
    const missing = english.filter((key) => !actual.includes(key));
    const extra = actual.filter((key) => !english.includes(key));

    assert.deepEqual(missing, [], `${locale} is missing keys`);
    assert.deepEqual(extra, [], `${locale} has keys English does not`);
  }
});

test("no locale left an English string untranslated in a translated field", () => {
  // Spot-check headings that must differ from English in every locale.
  const probes = ["nav.home", "form.submit", "about.valuesHeading"];
  const read = (obj: unknown, path: string) =>
    path.split(".").reduce<unknown>((acc, k) => (acc as never)?.[k], obj);

  const english = load("en");
  for (const locale of LOCALES.filter((l) => l !== "en")) {
    const catalogue = load(locale);
    for (const probe of probes) {
      assert.notEqual(
        read(catalogue, probe),
        read(english, probe),
        `${locale}.${probe} is still the English string`,
      );
    }
  }
});
