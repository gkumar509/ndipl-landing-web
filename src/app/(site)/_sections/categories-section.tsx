import Link from "next/link";

import { SanityImage } from "@/components/common/sanity-image";
import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { CategoriesCarousel } from "./categories-carousel";
import type { ProductCategory } from "@/sanity/content-types";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCT_CATEGORIES_QUERY } from "@/sanity/queries";

export async function CategoriesSection() {
  const { data } = await sanityFetch({ query: PRODUCT_CATEGORIES_QUERY });
  const categories = (data ?? []) as ProductCategory[];

  if (categories.length === 0) return null;

  return (
    <Section containerClassName="py-[76px]">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <Eyebrow>Product range</Eyebrow>
          <DisplayHeading className="mt-3">
            {categories.length} categories, one standard of purity
          </DisplayHeading>
        </div>
        <Button asChild variant="brandOutline" size="pill">
          <Link href="/products">All products →</Link>
        </Button>
      </div>

      <div className="mt-[34px]">
        <CategoriesCarousel prevLabel="Previous categories"
          nextLabel="Next categories"
        >
          {categories.map((category) => (
            <li
              key={category._id}
              className="w-[260px] shrink-0 snap-start sm:w-[290px]"
            >
              <Link
                href="/products"
                className="block h-full overflow-hidden rounded-2xl border border-[rgba(20,32,26,.09)] bg-white transition-colors hover:border-[var(--color-green)]"
              >
                <SanityImage
                  value={category.image}
                  fallbackLabel={`${category.title ?? ""} shot`}
                  className="h-[150px]"
                  sizes="290px"
                />
                <div className="p-[18px]">
                  <h3 className="font-display mb-1.5 text-[22px] leading-[1.2]">
                    {category.title}
                  </h3>
                  <p className="text-body text-[13.5px] leading-[1.55]">
                    {category.summary}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </CategoriesCarousel>
      </div>
    </Section>
  );
}
