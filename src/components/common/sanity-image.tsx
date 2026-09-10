import NextImage from "next/image";
import type { Image as SanityImageSource } from "sanity";

import { ImagePlaceholder } from "@/components/common/section";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

export type SanityImageValue = SanityImageSource & {
  alt?: string | null;
  lqip?: string | null;
};

type SanityImageProps = {
  value: SanityImageValue | null | undefined;
  /** Rendered when the document has no image yet — mirrors the design's hatch. */
  fallbackLabel?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Largest rendered width, used to size the asset request. */
  width?: number;
};

/**
 * Single place where Sanity assets become `next/image`: keeps hotspot cropping,
 * LQIP placeholders and alt text consistent, and degrades to the design's
 * placeholder hatch while the CMS is still empty.
 */
export function SanityImage({
  value,
  fallbackLabel,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  width = 1200,
}: SanityImageProps) {
  if (!value?.asset) {
    return <ImagePlaceholder label={fallbackLabel} className={className} />;
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <NextImage
        src={urlFor(value).width(width).url()}
        alt={value.alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={value.lqip ? "blur" : "empty"}
        blurDataURL={value.lqip ?? undefined}
        className="object-cover"
      />
    </div>
  );
}
