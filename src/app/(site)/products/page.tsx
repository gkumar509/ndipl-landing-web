import type { Metadata } from "next";

import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import type { CategoryWithProducts } from "@/sanity/content-types";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCTS_BY_CATEGORY_QUERY } from "@/sanity/queries";

import { ProductCatalog } from "./_components/product-catalog";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Premium agro products \u2014 pulses, spices, grains, millets, oil seeds and dehydrated produce, cleaned and graded to buyer specification.",
};

export default async function ProductsPage() {
  const { data } = await sanityFetch({ query: PRODUCTS_BY_CATEGORY_QUERY });
  const categories = (data ?? []) as CategoryWithProducts[];

  return (
    <>
      <Section containerClassName="pt-[70px]">
        <Eyebrow>Products</Eyebrow>
        <DisplayHeading
          as="h1"
          className="mt-3.5 max-w-[24ch] text-[clamp(38px,4.6vw,56px)] leading-[1.08]"
        >
          Premium agro products, cleaned and graded to buyer spec
        </DisplayHeading>
      </Section>

      <ProductCatalog categories={categories} />
    </>
  );
}
