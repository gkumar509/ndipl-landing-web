import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { publicEnv } from "@/lib/env";

const builder = createImageUrlBuilder({
  projectId: publicEnv.sanityProjectId,
  dataset: publicEnv.sanityDataset,
});

export function urlFor(source: Image) {
  return builder.image(source).auto("format").fit("max");
}
