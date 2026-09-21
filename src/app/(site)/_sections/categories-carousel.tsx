"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  prevLabel: string;
  nextLabel: string;
  children: React.ReactNode;
};

/** One row of cards, paged a viewport at a time. Scroll-snap does the moving;
 *  the arrows are only an affordance for pointers that can't swipe. */
export function CategoriesCarousel({ prevLabel, nextLabel, children }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  // Both true until measured — a track that doesn't overflow hides the arrows.
  const [edge, setEdge] = useState({ start: true, end: true });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      // RTL reports scrollLeft as negative, so compare on the absolute value.
      const offset = Math.abs(el.scrollLeft);
      const max = el.scrollWidth - el.clientWidth;
      setEdge({ start: offset <= 1, end: offset >= max - 1 });
    };

    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, []);

  // One click pages by a full view — the set of cards currently on screen.
  const page = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl" ? -1 : 1;
    el.scrollBy({ left: direction * rtl * el.clientWidth, behavior: "smooth" });
  };

  const fits = edge.start && edge.end;

  return (
    <div className="relative">
      {/* Negative margins cancel Container's padding so the row runs edge to
          edge on a phone while the first card stays aligned with the heading. */}
      <ul
        ref={trackRef}
        className="-mx-[18px] flex snap-x snap-mandatory gap-[18px] overflow-x-auto px-[18px] pb-1 sm:-mx-7 sm:px-7 lg:mx-0 lg:px-0"
      >
        {children}
      </ul>

      {!fits && (
        <div className="pointer-events-none hidden sm:block">
          <CarouselArrow
            label={prevLabel}
            disabled={edge.start}
            onClick={() => page(-1)}
            className="start-2 rtl:rotate-180"
          >
            <ChevronLeft />
          </CarouselArrow>
          <CarouselArrow
            label={nextLabel}
            disabled={edge.end}
            onClick={() => page(1)}
            className="end-2 rtl:rotate-180"
          >
            <ChevronRight />
          </CarouselArrow>
        </div>
      )}
    </div>
  );
}

function CarouselArrow({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { label: string }) {
  return (
    <Button
      type="button"
      variant="brandOutline"
      size="icon-lg"
      aria-label={label}
      className={`bg-cream pointer-events-auto absolute top-[75px] -translate-y-1/2 rounded-full shadow-[0_8px_20px_-10px_rgba(20,32,26,.5)] disabled:invisible ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
