import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

import { SanityImage } from "@/components/common/sanity-image";
import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import type { ProductCategory } from "@/sanity/content-types";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCT_CATEGORIES_QUERY } from "@/sanity/queries";

export async function CategoriesSection() {
  const locale = await getLocale();
  const t = await getTranslations("home.categories");

  const { data } = await sanityFetch({
    query: PRODUCT_CATEGORIES_QUERY,
    params: { locale },
  });
  const categories = (data ?? []) as ProductCategory[];

  if (categories.length === 0) return null;

  return (
    <Section containerClassName="py-[76px]">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <DisplayHeading className="mt-3">
            {t("heading", { count: categories.length })}
          </DisplayHeading>
        </div>
        <Button asChild variant="brandOutline" size="pill">
          <Link href="/products">{t("allProducts")}</Link>
        </Button>
      </div>

      <ul className="mt-[34px] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[18px]">
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              href="/products"
              className="block h-full overflow-hidden rounded-2xl border border-[rgba(20,32,26,.09)] bg-white transition-colors hover:border-[var(--color-green)]"
            >
              <SanityImage
                value={category.image}
                fallbackLabel={t("imageAlt", { category: category.title ?? "" })}
                className="h-[150px]"
                sizes="(min-width: 1240px) 300px, (min-width: 640px) 50vw, 100vw"
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
      </ul>
    </Section>
  );
}
