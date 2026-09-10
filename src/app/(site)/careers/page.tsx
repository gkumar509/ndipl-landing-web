import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

type Job = { title: string; meta: string; type: string };
type Track = { title: string; description: string };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("careers");
  return { title: t("title"), description: t("metaDescription") };
}

export default function CareersPage() {
  const t = useTranslations("careers");
  const filters = t.raw("filters") as string[];
  const jobs = t.raw("jobs") as Job[];
  const tracks = t.raw("volunteerTracks") as Track[];

  return (
    <>
      <Section containerClassName="pt-[70px]">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <DisplayHeading
          as="h1"
          className="mt-3.5 max-w-[22ch] text-[clamp(38px,4.6vw,56px)] leading-[1.08]"
        >
          {t("heading")}
        </DisplayHeading>
        <p className="text-body mt-[18px] max-w-[56ch] text-[16.5px] leading-[1.65]">
          {t("intro")}
        </p>
      </Section>

      <Section containerClassName="pt-10">
        <ul className="flex flex-wrap gap-2.5">
          {filters.map((filter) => (
            <li
              key={filter}
              className="text-body rounded-full border border-[rgba(20,32,26,.16)] px-3.5 py-2 text-[12.5px] font-medium"
            >
              {filter}
            </li>
          ))}
        </ul>

        <ul className="mt-[22px] overflow-hidden rounded-[18px] border border-[rgba(20,32,26,.09)] bg-white">
          {jobs.map((job) => (
            <li
              key={job.title}
              className="hover:bg-cream flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(20,32,26,.07)] px-6 py-[22px] transition-colors last:border-b-0"
            >
              <div>
                <h2 className="font-display text-[23px] leading-[1.2]">
                  {job.title}
                </h2>
                <p className="text-stone mt-1.5 text-[13px]">{job.meta}</p>
              </div>
              <div className="flex items-center gap-3.5">
                <span className="bg-sand text-body rounded-full px-3 py-1.5 text-[11.5px] font-medium">
                  {job.type}
                </span>
                <Button asChild variant="brandOutline" size="pillSm">
                  <Link
                    href={{
                      pathname: "/contact",
                      query: {
                        interest: "careers",
                        subject: t("applySubject", { role: job.title }),
                      },
                    }}
                  >
                    {t("apply")}
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section containerClassName="py-14 pb-[70px]">
        <div className="bg-sand grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-center gap-[30px] rounded-[20px] p-9">
          <div>
            <span className="text-green text-[11.5px] font-medium tracking-[0.14em] uppercase">
              {t("volunteerEyebrow")}
            </span>
            <p className="font-display mt-3 mb-2.5 text-[32px] leading-[1.15]">
              {t("volunteerHeading")}
            </p>
            <p className="text-body mb-5 max-w-[46ch] text-[14.5px] leading-[1.65]">
              {t("volunteerBody")}
            </p>
            <Button asChild variant="brand" size="pill">
              <Link
                href={{
                  pathname: "/contact",
                  query: {
                    interest: "volunteering",
                    subject: t("volunteerSubject"),
                  },
                }}
              >
                {t("volunteerCta")}
              </Link>
            </Button>
          </div>

          <ul className="grid gap-3">
            {tracks.map((track) => (
              <li
                key={track.title}
                className="bg-cream rounded-[14px] border border-[rgba(20,32,26,.08)] px-[18px] py-4"
              >
                <div className="text-sm font-semibold">{track.title}</div>
                <div className="text-stone mt-1 text-[12.5px] leading-[1.5]">
                  {track.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
