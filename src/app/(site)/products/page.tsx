import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import type { CategoryWithProducts } from "@/sanity/content-types";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCTS_BY_CATEGORY_QUERY } from "@/sanity/queries";

import { ProductCatalog } from "./_components/product-catalog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("products");
  return { title: t("title"), description: t("metaDescription") };
}

export default async function ProductsPage() {
  const locale = await getLocale();
  const t = await getTranslations("products");

  const { data } = await sanityFetch({
    query: PRODUCTS_BY_CATEGORY_QUERY,
    params: { locale },
  });
  const categories = (data ?? []) as CategoryWithProducts[];

  return (
    <>
      <Section containerClassName="pt-[70px]">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <DisplayHeading
          as="h1"
          className="mt-3.5 max-w-[24ch] text-[clamp(38px,4.6vw,56px)] leading-[1.08]"
        >
          {t("heading")}
        </DisplayHeading>
      </Section>

      <ProductCatalog categories={categories} />
    </>
  );
}
