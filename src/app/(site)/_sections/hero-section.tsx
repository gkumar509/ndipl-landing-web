import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

type Stat = { value: string; label: string };

export function HeroSection() {
  const t = useTranslations("home.hero");
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="relative isolate flex items-center overflow-hidden md:min-h-svh">
      {/* Photo is a md-and-up treatment; on a phone the hero is plain type on
          the page background. `sizes` keeps phones off the large candidates,
          since a hidden image is still fetched. */}
      <Image
        src="/1.jpg"
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
        className="absolute inset-0 -z-10 hidden backdrop-blur-xs mask-[linear-gradient(to_right,black_0%,black_38%,transparent_72%)] rtl:mask-[linear-gradient(to_left,black_0%,black_38%,transparent_72%)] md:block"
      />

      <Container className="py-[70px] md:py-[90px]">
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

          <dl className="mt-11 flex flex-wrap gap-x-[34px] gap-y-6 border-t border-[rgba(20,32,26,.1)] pt-[26px] md:border-[rgba(245,242,234,.22)]">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display text-green md:text-gold block text-[30px] leading-none">
                    {stat.value}
                  </span>
                  <span className="text-stone mt-[7px] block text-[11.5px] leading-[1.4] font-medium tracking-[0.06em] uppercase md:text-[rgba(245,242,234,.85)]">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
