import Link from "next/link";

import { Eyebrow, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

/**
 * Closing band on the home page: volunteering on one side, open roles on the
 * other.
 */
export function JoinSection() {
  return (
    <Section
      className="bg-sand border-t border-[rgba(20,32,26,.07)]"
      containerClassName="grid grid-cols-1 items-stretch gap-10 py-[70px] md:grid-cols-2"
    >
      {/* `Eyebrow` is a span, so it needs block + col-span-full to sit on its
          own row above both cards. */}
      <Eyebrow className="col-span-full -mb-4 block">Work with us</Eyebrow>
      <div className="bg-cream flex flex-col items-start rounded-[18px] border border-[rgba(20,32,26,.09)] p-7">
        <span className="text-green text-[11.5px] font-medium tracking-[0.14em] uppercase">
          Volunteer
        </span>
        <p className="font-display mt-3 mb-2.5 text-[30px] leading-[1.15]">
          Give time to soil, water and safe-food programmes
        </p>
        <p className="text-body mb-6 max-w-[46ch] text-[14.5px] leading-[1.65]">
          Field days with farmer groups, watershed and plantation drives,
          food-safety awareness sessions in schools and mandis.
        </p>
        <Button asChild variant="brand" size="pill" className="mt-auto">
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

      <div className="bg-cream flex flex-col items-start rounded-[18px] border border-[rgba(20,32,26,.09)] p-7">
        <span className="text-green text-[11.5px] font-medium tracking-[0.14em] uppercase">
          Careers
        </span>
        <p className="font-display mt-3 mb-2.5 text-[30px] leading-[1.15]">
          Work on food that people can trust
        </p>
        <p className="text-body mb-6 max-w-[46ch] text-[14.5px] leading-[1.65]">
          Roles across quality, agronomy, plant operations and export
          documentation — plus a volunteering track for anyone who wants to
          contribute to our farm and conservation programmes.
        </p>
        <Button asChild variant="brandOutline" size="pill" className="mt-auto">
          <Link href="/careers">See open roles</Link>
        </Button>
      </div>
    </Section>
  );
}
