import { createClient } from "next-sanity";

import { publicEnv } from "@/lib/env";

export const client = createClient({
  projectId: publicEnv.sanityProjectId,
  dataset: publicEnv.sanityDataset,
  apiVersion: publicEnv.sanityApiVersion,
  useCdn: true,
  perspective: "published",
  stega: { studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "/studio" },
});
