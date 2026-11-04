import { Suspense } from "react";

import { DisplayHeading, Section } from "@/components/common/section";
import type { StatGroup } from "@/sanity/content-types";
import { sanityFetch } from "@/sanity/lib/live";
import { STAT_GROUPS_QUERY } from "@/sanity/queries";

// One row per group: label column on the left, stats spread across the rest
// with dividers so the row reads full rather than sparse. Shared with the
// skeleton so nothing shifts when the numbers land.
const ROWS =
  "mt-11 divide-y divide-[rgba(20,32,26,.09)] border-y border-[rgba(20,32,26,.09)]";
const ROW =
  "grid gap-4 py-7 md:grid-cols-[200px_1fr] md:items-center md:gap-8";
const TITLE = "border-green border-s-[3px] ps-3.5";
const STATS =
  "grid auto-cols-fr grid-flow-col divide-x divide-[rgba(20,32,26,.09)]";
const STAT = "flex flex-col-reverse gap-1.5 px-4 first:ps-0 md:px-8";
const BONE =
  "rounded-md bg-[rgba(20,32,26,.08)] animate-pulse motion-reduce:animate-none";

async function StatRows() {
  const { data } = await sanityFetch({ query: STAT_GROUPS_QUERY });
  const groups = (data ?? []) as StatGroup[];

  if (groups.length === 0) return null;

  return (
    <div className={ROWS}>
      {groups.map((group) => (
        <div key={group._id} className={ROW}>
          <h3
            className={`font-display text-ink text-[26px] leading-[1.1] md:text-[30px] ${TITLE}`}
          >
            {group.title}
          </h3>
          {/* Value before label in the markup so screen readers read
              "12 — sourcing belts"; `flex-col-reverse` puts the number on
              top visually. */}
          <dl className={STATS}>
            {group.stats?.map((stat) => (
              <div key={stat._key} className={STAT}>
                <dt className="text-stone text-[11px] leading-[1.35] tracking-[0.06em] uppercase">
                  {stat.label}
                </dt>
                <dd className="font-display text-[34px] leading-none md:text-[44px]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

/** Mirrors `StatRows` (two rows of three) at the same line heights. */
function StatRowsSkeleton() {
  return (
    <div className={ROWS} aria-busy="true">
      <span className="sr-only">Loading figures…</span>
      {[0, 1].map((row) => (
        <div key={row} aria-hidden="true" className={ROW}>
          <div className={TITLE}>
            <div className={`${BONE} h-[29px] w-32 md:h-[33px] md:w-36`} />
          </div>
          <div className={STATS}>
            {[0, 1, 2].map((stat) => (
              <div key={stat} className={STAT}>
                <div className={`${BONE} h-[15px] w-full max-w-24`} />
                <div className={`${BONE} h-[34px] w-14 md:h-[44px] md:w-20`} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PurposeSection() {
  return (
    <Section
      className="border-y border-[rgba(20,32,26,.07)]"
      containerClassName="py-16"
    >
      <DisplayHeading className="mt-3">Our purpose</DisplayHeading>
      <p className="text-body mt-4 text-[15.5px] leading-[1.7] text-pretty">
        Nature&apos;s Delight Industries Private Limited (NDIPL) was established
        by agri-industry professionals to build a reliable, quality-driven
        sourcing platform for safe and sustainably produced food. NDIPL serves
        institutional buyers across India and international markets through an
        integrated network of farmers, rigorous quality testing, digital
        traceability, FSSAI-licensed and HACCP-certified processing
        infrastructure, NPOP and NOP organic certifications, storage facilities,
        and a presence across major Indian ports.
      </p>

      <Suspense fallback={<StatRowsSkeleton />}>
        <StatRows />
      </Suspense>
    </Section>
  );
}
