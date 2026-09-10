import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

import { RequestedPath } from "./_components/requested-path";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return { title: t("title") };
}

const SUGGESTIONS = [
  { key: "products", href: "/products" },
  { key: "team", href: "/team" },
  { key: "contact", href: "/contact" },
] as const;

/** Row in the trace readout: a mono label above its value. */
function TraceRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[rgba(245,242,234,.14)] pt-3.5">
      <div className="label-mono text-gold">{label}</div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

/**
 * The root not-found renders outside the (site) layout, so it brings its own
 * header and footer to stay consistent with the rest of the pages.
 */
export default async function NotFound() {
  const t = await getTranslations("notFound");
  const nav = await getTranslations("nav");

  return (
    <>
      <Suspense fallback={null}>
        <SiteHeader />
      </Suspense>

      <main className="flex-1">
        <Section containerClassName="grid grid-cols-1 items-center gap-14 py-[90px] lg:grid-cols-2">
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <DisplayHeading
              as="h1"
              className="mt-3.5 max-w-[18ch] text-[clamp(38px,4.6vw,58px)] leading-[1.08] text-pretty"
            >
              {t("heading")}
            </DisplayHeading>
            <p className="text-body mt-5 max-w-[46ch] text-[17px] leading-[1.65] text-pretty">
              {t("body")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="pillLg">
                <Link href="/">{t("home")}</Link>
              </Button>
              <Button asChild variant="brandOutline" size="pillLg">
                <Link href="/contact">{t("contact")}</Link>
              </Button>
            </div>
          </div>

          {/* Trace readout — the site's own traceability language, applied to a
              URL that cannot be traced. */}
          <div className="bg-ink text-on-ink relative overflow-hidden rounded-[20px] p-[30px]">
            <div className="flex items-center justify-between gap-4">
              <span className="label-mono text-gold">{t("traceLabel")}</span>
              <span className="flex items-center gap-2">
                <span className="bg-gold size-1.5 animate-pulse rounded-full" />
                <span className="label-mono text-[rgba(245,242,234,.62)]">
                  404
                </span>
              </span>
            </div>

            <div
              aria-hidden="true"
              className="font-display mt-2 bg-linear-135 from-[#fcd34a] to-[#f0951a] bg-clip-text text-[clamp(76px,11vw,128px)] leading-[0.95] text-transparent"
            >
              404
            </div>

            <div className="mt-6 flex flex-col gap-3.5">
              <TraceRow label={t("pathLabel")}>
                <RequestedPath />
              </TraceRow>

              <TraceRow label={t("statusLabel")}>
                <span className="bg-gold text-ink inline-block rounded-full px-3 py-1 text-[11.5px] font-semibold tracking-[0.06em] uppercase">
                  {t("status")}
                </span>
              </TraceRow>

              <TraceRow label={t("stagesLabel")}>
                <span className="text-[13px] leading-[1.55] text-[rgba(245,242,234,.62)]">
                  {t("stages")}
                </span>
              </TraceRow>
            </div>
          </div>
        </Section>

        <Section
          className="bg-sand border-t border-[rgba(20,32,26,.07)]"
          containerClassName="py-[66px]"
        >
          <Eyebrow>{t("suggestionsEyebrow")}</Eyebrow>
          <ul className="mt-[26px] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {SUGGESTIONS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="bg-cream group flex h-full flex-col rounded-2xl border border-[rgba(20,32,26,.08)] p-[26px] transition-colors hover:border-[rgba(10,107,61,.4)]"
                >
                  <span className="font-display flex items-center gap-2 text-2xl leading-[1.2]">
                    {nav(item.key)}
                    <span
                      aria-hidden="true"
                      className="text-green transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                    >
                      →
                    </span>
                  </span>
                  <span className="text-body mt-2 text-[14.5px] leading-[1.65]">
                    {t(`suggestions.${item.key}`)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
