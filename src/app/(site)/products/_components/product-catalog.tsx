"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

  // The CTA panel is sticky-bottom; it compacts while it rides the viewport.
  // No CSS selector for "currently stuck", so watch a sentinel at its resting
  // position — out of view means stuck.
  const restRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [restHeight, setRestHeight] = useState<number>();

  useEffect(() => {
    const el = restRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      // Matches the panel's md:bottom-4 offset, so it expands exactly as it lands.
      { rootMargin: "0px 0px -16px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The panel's slot keeps its expanded height, so compacting doesn't shorten
  // the page. Without it the sentinel rises back into view the moment the
  // panel shrinks and the two states flicker against each other.
  useEffect(() => {
    const el = panelRef.current;
    if (!el || stuck) return; // only the expanded height is worth recording
    const observer = new ResizeObserver(() => setRestHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, [stuck]);

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
            <div className="flex flex-col items-baseline justify-between gap-3.5 border-b border-[rgba(20,32,26,.12)] pb-3.5">
              <h2 className="font-display text-[34px] leading-[1.1]">
                {category.title}
              </h2>
              {category.note ? (
                <span className="text-stone text-[13.5px]">
                  {category.note}
                </span>
              ) : null}
            </div>

            <ul className="mt-[22px] grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
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

        <div
          style={{ minHeight: restHeight }}
          className="pointer-events-none sticky bottom-4 z-30 flex items-end"
        >
          <div
            ref={panelRef}
            className={cn(
              "bg-ink text-on-ink pointer-events-auto mx-auto flex flex-col md:flex-row w-full max-w-full items-center justify-center gap-4 rounded-[20px] p-4 text-center shadow-[0_24px_60px_-28px_rgba(20,32,26,.75)] transition-all duration-300 motion-reduce:transition-none sm:gap-y-6.5 sm:p-5.5 sm:text-start",
              stuck &&
                "w-max gap-x-2 rounded-[44px] p-2 text-center sm:gap-x-4 sm:px-5 sm:text-center",
            )}
          >
            <div
              className={cn(
                "grid min-w-0 flex-auto items-center justify-center grid-cols-[1fr] overflow-hidden transition-all duration-300 motion-reduce:transition-none",
                // grow 1 → 0 is what pulls the two halves together; unlike
                // justify-content, it interpolates.
                stuck &&
                  "",
              )}
            >
              <div className="min-w-0">
                <p
                  className={cn(
                    "font-display text-[24px] transition-[font-size] duration-300 motion-reduce:transition-none sm:text-[30px]",
                    stuck && "sm:text-[21px]",
                  )}
                >
                  {t("customHeading")}
                </p>
                <div
                  className={cn(
                    "grid grid-rows-[1fr] overflow-hidden pt-2.5 transition-[grid-template-rows,padding] duration-300 motion-reduce:transition-none",
                    stuck && "grid-rows-[0fr] pt-0",
                  )}
                >
                  <p className="min-h-0 text-[14.5px] text-[rgba(245,242,234,.62)]">
                    {t("customBody")}
                  </p>
                </div>
              </div>
            </div>
            {/* Wraps its own two buttons at ~320px rather than overflowing. */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-center gap-3">
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
              <div
                className={cn(
                  // Collapses on both axes so it vanishes whether the row above
                  // is flex-row or flex-col; the negative margin eats the
                  // parent's gap-3, which survives a zero-sized item.
                  "grid grid-cols-[1fr] grid-rows-[1fr] overflow-hidden transition-[grid-template-columns,grid-template-rows,margin] duration-300 motion-reduce:transition-none",
                  stuck && "-m-1.5 grid-cols-[0fr] grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 min-w-0">
                  <Button asChild variant="inkOutline" size="pill">
                    <Link href="/contact">{t("downloadCatalogue")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={restRef} aria-hidden className="h-px" />
      </Container>
    </>
  );
}
