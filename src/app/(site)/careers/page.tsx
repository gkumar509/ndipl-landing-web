import type { Metadata } from "next";
import Link from "next/link";

import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Roles across quality, agronomy, plant operations and export documentation at NDIPL, plus a volunteering track for our farm and conservation programmes.",
};

const filters = [
  "All departments",
  "Quality",
  "Operations",
  "Agronomy",
  "Export & sales"
];

const jobs = [
  {
    title: "Quality Assurance Officer",
    meta: "Quality · Nagpur plant · 2-5 years",
    type: "Full-time"
  },
  {
    title: "Export Documentation Executive",
    meta: "Export & sales · Nagpur · 1-3 years",
    type: "Full-time"
  },
  {
    title: "Procurement Manager — Pulses",
    meta: "Sourcing · Madhya Pradesh & Maharashtra · 5+ years",
    type: "Full-time"
  },
  {
    title: "Agronomist — Farmer Outreach",
    meta: "Agronomy · Field-based · 3+ years",
    type: "Full-time"
  },
  {
    title: "Plant Operations Supervisor",
    meta: "Operations · Nagpur plant · Shift role",
    type: "Full-time"
  },
  {
    title: "Sales Executive — Middle East",
    meta: "Export & sales · Remote with travel",
    type: "Contract"
  }
];

const tracks = [
  {
    title: "Field days",
    description: "Support farmer training sessions and demo plots."
  },
  {
    title: "Watershed & plantation drives",
    description: "Weekend programmes in sourcing belts."
  },
  {
    title: "Safe-food awareness",
    description: "Sessions in schools, mandis and community centres."
  }
];

export default function CareersPage() {
  return (
    <>
      <Section containerClassName="pt-[70px]">
        <Eyebrow>Careers</Eyebrow>
        <DisplayHeading
          as="h1"
          className="mt-3.5 max-w-[22ch] text-[clamp(38px,4.6vw,56px)] leading-[1.08]"
        >
          Work on food that people can trust
        </DisplayHeading>
        <p className="text-body mt-[18px] max-w-[56ch] text-[16.5px] leading-[1.65]">
          {"Roles across quality, agronomy, plant operations and export documentation \u2014 plus a volunteering track for anyone who wants to contribute to our farm and conservation programmes."}
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
                        subject: `Application — ${job.title}`,
                      },
                    }}
                  >
                    Apply
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
              Volunteer
            </span>
            <p className="font-display mt-3 mb-2.5 text-[32px] leading-[1.15]">
              Give time to soil, water and safe-food programmes
            </p>
            <p className="text-body mb-5 max-w-[46ch] text-[14.5px] leading-[1.65]">
              {"Field days with farmer groups, watershed and plantation drives, food-safety awareness sessions in schools and mandis."}
            </p>
            <Button asChild variant="brand" size="pill">
              <Link
                href={{
                  pathname: "/contact",
                  query: {
                    interest: "volunteering",
                    subject: "Volunteering",
                  },
                }}
              >
                Join as a volunteer
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
