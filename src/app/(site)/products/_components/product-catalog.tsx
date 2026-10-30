"use client";

import { XIcon } from "lucide-react";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { Dialog } from "radix-ui";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/common/container";
import { SanityImage } from "@/components/common/sanity-image";
import { Button } from "@/components/ui/button";
import type { CategoryWithProducts, Product } from "@/sanity/content-types";
import { cn } from "@/lib/utils";

const ALL = "__all__";

// The spec overlay sits off-card until hover/focus. Devices without hover get
// it shown outright, otherwise it would be unreachable on touch.
const REVEAL =
  "bg-black/55 text-white backdrop-blur-[2px] transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:translate-0 group-focus-visible:translate-0 [@media(hover:none)]:translate-0";

function ProductCard({ product }: { product: Product }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[14px] text-start outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-green)]">
        <SanityImage
          value={product.image}
          fallbackLabel={product.title ?? undefined}
          className="size-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          sizes="(min-width: 1240px) 280px, (min-width: 640px) 50vw, 100vw"
        />
        <h3 className="absolute top-0 left-0 max-w-[85%] rounded-br-[14px] bg-black/55 px-4 py-2.5 text-[17px] font-semibold text-white backdrop-blur-[2px]">
          {product.title}
        </h3>
        {product.spec ? (
          <p
            className={cn(
              "absolute inset-x-0 bottom-0 translate-y-full p-3.5 text-[12.5px] leading-[1.5]",
              REVEAL,
            )}
          >
            {product.spec}
          </p>
        ) : null}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[880px] -translate-1/2 overflow-y-auto rounded-[20px] bg-white shadow-[0_24px_60px_-28px_rgba(20,32,26,.75)] md:grid-cols-2">
          <SanityImage
            value={product.image}
            fallbackLabel={product.title ?? undefined}
            className="aspect-[4/3] md:aspect-auto md:min-h-[420px]"
            sizes="(min-width: 768px) 440px, 100vw"
          />
          <div className="flex flex-col p-6 md:p-8">
            <Dialog.Title className="font-display pe-8 text-[30px] leading-[1.1]">
              {product.title}
            </Dialog.Title>
            <Dialog.Description className="text-stone mt-2 text-[14px] leading-[1.5]">
              {product.spec}
            </Dialog.Description>
            {product.details?.length ? (
              <div className="text-body mt-5 text-[14.5px] leading-[1.65] [&_a]:underline [&_h2]:mt-5 [&_h2]:text-[18px] [&_h2]:font-semibold [&_h3]:mt-4 [&_h3]:font-semibold [&_li]:mt-1 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:ps-5 [&_p+p]:mt-3 [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:ps-5">
                <PortableText value={product.details} />
              </div>
            ) : null}
            <Button asChild variant="brand" size="pill" className="mt-6 self-start">
              <Link
                href={{
                  pathname: "/contact",
                  query: { subject: product.title ?? "" },
                }}
              >
                Enquire
              </Link>
            </Button>
          </div>
          <Dialog.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 rounded-full bg-white/85"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ProductCatalog({
  categories,
}: {
  categories: CategoryWithProducts[];
}) {
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
    { id: ALL, label: "All" },
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
                <li key={product._id}>
                  <ProductCard product={product} />
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
                  Need a private-label or custom pack size?
                </p>
                <div
                  className={cn(
                    "grid grid-rows-[1fr] overflow-hidden pt-2.5 transition-[grid-template-rows,padding] duration-300 motion-reduce:transition-none",
                    stuck && "grid-rows-[0fr] pt-0",
                  )}
                >
                  <p className="min-h-0 text-[14.5px] text-[rgba(245,242,234,.62)]">
                    From 1 kg retail pouches to 50 kg PP bags and bulk containers.
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
                  Request samples
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
                    <Link href="/contact">Download catalogue</Link>
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
