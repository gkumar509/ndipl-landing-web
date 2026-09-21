import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

type Pillar = { title: string; short: string };

const logoSrc = [
  "/safe_food_logo.png",
  "/sustainable_farming_logo.png",
  "/soil_water_conservation_logo.png",
];

export function HeroSection() {
  const t = useTranslations("home.hero");
  const pillars = t.raw("pillars") as Pillar[];

  return (
    // The header is sticky but in flow, so a full-svh hero would push the
    // pillar cards below the fold. 72px is the header's measured height.
    // ponytail: hardcoded header height, swap for a CSS var if the header grows
    // a second row.
    <section className="relative isolate flex flex-col overflow-hidden md:min-h-[calc(100svh-72px)]">
      {/* Photo is a md-and-up treatment; on a phone the hero is plain type on
          the page background. `sizes` keeps phones off the large candidates,
          since a hidden image is still fetched. */}
      <Image
        src="/1.jpeg"
        alt=""
        fill
        priority
        sizes="(max-width: 767px) 1px, 100vw"
        className="-z-20 hidden object-cover md:block"
      />

      {/* Blur only — no tint. Fades out across the container so the right of
          the photo stays sharp. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden backdrop-blur-sm mask-[linear-gradient(to_right,black_0%,black_45%,transparent_72%)] rtl:mask-[linear-gradient(to_left,black_0%,black_45%,transparent_72%)] md:block"
      />

      <Container className="flex flex-1 items-center py-[64px] md:py-[80px]">
        <div className="max-w-[640px] md:text-on-ink md:[text-shadow:0_1px_16px_rgba(20,32,26,.7)]">
          <div className="text-green inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(10,107,61,.22)] px-[13px] py-1.5 text-[11.5px] font-medium tracking-[0.06em] uppercase md:border-[rgba(245,242,234,.34)] md:text-inherit">
            {t("badge")}
          </div>

          <h1 className="font-display mt-[22px] text-[clamp(40px,5vw,66px)] leading-[1.06] text-pretty">
            {t("title")}
          </h1>
          <p className="text-body mt-5 max-w-[47ch] text-[17.5px] leading-[1.65] text-pretty md:text-[rgba(245,242,234,.92)]">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="pillLg">
              <Link href="/products">{t("exploreProducts")}</Link>
            </Button>
            <Button
              asChild
              variant="brandOutline"
              size="pillLg"
              className="md:text-on-ink md:hover:text-on-ink md:border-[rgba(245,242,234,.34)] md:hover:border-[rgba(245,242,234,.9)]"
            >
              <Link href="/contact">{t("talkToTeam")}</Link>
            </Button>
          </div>
        </div>
      </Container>

      <Container className="pb-[26px] md:pb-[34px]">
        {/* Snap-scroller below md, 3-up grid from md. The negative margins
            cancel Container's padding so the row runs edge to edge on a phone
            while the first card still lines up with the copy above. */}
        <ul className="-mx-[18px] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[18px] pb-1 sm:-mx-7 sm:px-7 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
          {pillars.map((pillar, i) => (
            <li
              key={pillar.title}
              className="bg-cream flex items-center gap-2 w-[76vw] shrink-0 snap-start rounded-2xl border border-[rgba(20,32,26,.08)] p-[18px] shadow-[0_18px_40px_-24px_rgba(20,32,26,.45)] sm:w-[330px] md:w-auto md:p-5"
            >
              {/* The PNG has a white ground; multiply blends it into the card,
                  which is why the card stays opaque rather than glass. */}
              <Image
                src={logoSrc[i] || ""}
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
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
