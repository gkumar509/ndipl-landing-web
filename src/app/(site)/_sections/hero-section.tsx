import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    title: "Safe food",
    short: "Residue-tested lots, hygienic handling end to end.",
    logo: "/safe_food_logo.png",
  },
  {
    title: "Sustainable farming",
    short: "Long-term farmer partnerships & fair, clear pricing.",
    logo: "/sustainable_farming_logo.png",
  },
  {
    title: "Soil & water conservation",
    short: "Watershed, rotation and irrigation programmes.",
    logo: "/soil_water_conservation_logo.png",
  },
];

const heroImages = ["/hero_1.jpg", "/hero_2.jpg", "/hero_3.jpg"];

// Must match `.hero-slide` in globals.css: 3 slides × 6s = 18s cycle, 1.5s fade.
const HERO_SLIDE_SECONDS = 6;
const HERO_FADE_SECONDS = 1.5;

export function HeroSection() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden md:min-h-[calc(100svh-72px)]">
      <div aria-hidden className="absolute inset-0 -z-20 hidden md:block">
        {heroImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="(max-width: 767px) 1px, 100vw"
            className="hero-slide translate-x-[5%] translate-y-[4%] scale-115 object-cover"
            style={{
              animationDelay: `${i * HERO_SLIDE_SECONDS - HERO_FADE_SECONDS}s`,
            }}
          />
        ))}
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden backdrop-blur-sm mask-[linear-gradient(to_right,black_0%,black_45%,transparent_72%)] rtl:mask-[linear-gradient(to_left,black_0%,black_45%,transparent_72%)] md:block"
      />

      <Container className="flex flex-1 items-center py-[64px] md:py-[80px]">
        <div className="max-w-[640px] md:text-on-ink md:[text-shadow:0_1px_16px_rgba(20,32,26,.7)]">
          <div className="text-green inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(10,107,61,.22)] px-[13px] py-1.5 text-[11.5px] font-medium tracking-[0.06em] uppercase md:border-[rgba(245,242,234,.34)] md:text-inherit">
            Safe Food · Sustainable Farming · Soil & Water conservation
          </div>

          <h1 className="font-display mt-[22px] text-[clamp(40px,5vw,66px)] leading-[1.06] text-pretty">
            Premium agro products, sourced and processed with a conscience.
          </h1>
          <p className="text-body mt-5 max-w-[47ch] text-[17.5px] leading-[1.65] text-pretty md:text-[rgba(245,242,234,.92)]">
            Sourced from selected Indian farming belts, then cleaned, graded,
            destoned, colour-sorted and packed for export-grade purity.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="pillLg">
              <Link href="/products">Explore products</Link>
            </Button>
            <Button
              asChild
              variant="brandOutline"
              size="pillLg"
              className="md:text-on-ink md:hover:text-on-ink md:border-[rgba(245,242,234,.34)] md:hover:border-[rgba(245,242,234,.9)]"
            >
              <Link href="/contact">Talk to sourcing team</Link>
            </Button>
          </div>
        </div>
      </Container>

      <Container className="pb-[26px] md:pb-[34px]">
        {/* Snap-scroller below md, 3-up grid from md. The negative margins
            cancel Container's padding so the row runs edge to edge on a phone
            while the first card still lines up with the copy above. */}
        <ul className="-mx-[18px] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[18px] pb-1 sm:-mx-7 sm:px-7 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
          {pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="w-[76vw] shrink-0 snap-start sm:w-[330px] md:w-auto"
            >
              <Link
                href="/about"
                className="bg-cream flex h-full cursor-pointer items-center gap-2 rounded-2xl border border-[rgba(20,32,26,.08)] p-[18px] shadow-[0_18px_40px_-24px_rgba(20,32,26,.45)] transition-colors hover:border-[rgba(10,107,61,.35)] md:p-5"
              >
                {/* The PNG has a white ground; multiply blends it into the card,
                    which is why the card stays opaque rather than glass. */}
                <Image
                  src={pillar.logo}
                  alt=""
                  width={1408}
                  height={768}
                  className="h-[38px] w-auto mix-blend-multiply"
                />
                <div>
                  <h2 className="font-display mt-3 text-[19px] leading-[1.2]">
                    {pillar.title}
                  </h2>
                  <p className="text-body mt-1.5 text-[13.5px] leading-[1.55]">
                    {pillar.short}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
