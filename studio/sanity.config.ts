import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/schemaTypes";
import { structure } from "./src/structure";

/**
 * Without this check an unset project id reaches `defineConfig` as `undefined`,
 * and the CLI reports the misleading "Invalid studio config format".
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId) {
  throw new Error(
    "Missing SANITY_STUDIO_PROJECT_ID.\n" +
      "Copy studio/.env.example to studio/.env and fill it in.\n" +
      "No Sanity project yet? Run `npx sanity init` from the studio/ directory.",
  );
}

export default defineConfig({
  name: "ndipl",
  title: "NDIPL",
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
