"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/common/container";
import { SanityImage } from "@/components/common/sanity-image";
import { Button } from "@/components/ui/button";
import type { CategoryWithProducts } from "@/sanity/content-types";
import { cn } from "@/lib/utils";

const ALL = "__all__";

export function ProductCatalog({
  categories,
}: {
  categories: CategoryWithProducts[];
}) {
  const t = useTranslations("products");
  const [active, setActive] = useState<string>(ALL);

  const tabs = [
    { id: ALL, label: t("all") },
    ...categories.map((category) => ({
      id: category._id,
      label: category.title ?? "",
    })),
  ];

  const shown =
    active === ALL
      ? categories
      : categories.filter((category) => category._id === active);

  return (
    <>
      <Container className="pt-[26px]">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              aria-pressed={active === tab.id}
              className={cn(
                "rounded-full border px-4 py-[9px] text-[13px] font-medium transition-colors",
                active === tab.id
                  ? "bg-green border-green text-white"
                  : "text-ink border-[rgba(20,32,26,.18)] hover:border-[var(--color-green)]",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Container>

      <Container className="pt-[34px] pb-[70px]">
        {shown.map((category) => (
          <section key={category._id} className="mb-[52px]">
            <div className="flex flex-wrap items-baseline justify-between gap-3.5 border-b border-[rgba(20,32,26,.12)] pb-3.5">
              <h2 className="font-display text-[34px] leading-[1.1]">
                {category.title}
              </h2>
              {category.note ? (
                <span className="text-stone text-[13.5px]">{category.note}</span>
              ) : null}
            </div>

            <ul className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
              {category.products.map((product) => (
                <li
                  key={product._id}
                  className="overflow-hidden rounded-[14px] border border-[rgba(20,32,26,.09)] bg-white transition-colors hover:border-[var(--color-green)]"
                >
                  <SanityImage
                    value={product.image}
                    className="h-[130px]"
                    sizes="(min-width: 1240px) 280px, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="p-[15px]">
                    <h3 className="text-[15px] font-semibold">
                      {product.title}
                    </h3>
                    <p className="text-stone mt-[5px] text-[12.5px] leading-[1.5]">
                      {product.spec}
                    </p>
                    <Button
                      asChild
                      variant="soft"
                      size="blockSm"
                      className="mt-3"
                    >
                      <Link
                        href={{
                          pathname: "/contact",
                          query: { subject: product.title ?? "" },
                        }}
                      >
                        {t("enquire")}
                      </Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="bg-ink text-on-ink grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-center gap-[26px] rounded-[20px] p-[38px]">
          <div>
            <p className="font-display text-[30px] leading-[1.15]">
              {t("customHeading")}
            </p>
            <p className="mt-2.5 text-[14.5px] leading-[1.65] text-[rgba(245,242,234,.62)]">
              {t("customBody")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 sm:justify-self-end">
            <Button asChild variant="gold" size="pill">
              <Link
                href={{
                  pathname: "/contact",
                  query: { interest: "sample" },
                }}
              >
                {t("requestSamples")}
              </Link>
            </Button>
            <Button asChild variant="inkOutline" size="pill">
              <Link href="/contact">{t("downloadCatalogue")}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
