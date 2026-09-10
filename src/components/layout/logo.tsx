import { useTranslations } from "next-intl";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** The NDIPL mark: a rounded green silo with two gradient "seeds". */
export function BrandMark({
  className,
  size = 34,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "bg-green relative flex-none rounded-t-[9px] rounded-b-[3px]",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="absolute rounded-full bg-linear-135 from-[#fcd34a] to-[#f0951a]"
        style={{
          left: size * 0.176,
          bottom: size * 0.118,
          width: size * 0.441,
          height: size * 0.441,
        }}
      />
      <span
        className="absolute rounded-full bg-linear-135 from-[#fcd34a] to-[#f0951a]"
        style={{
          right: size * 0.118,
          top: size * 0.118,
          width: size * 0.265,
          height: size * 0.265,
        }}
      />
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  const t = useTranslations("brand");

  return (
    <Link
      href="/"
      className={cn("flex flex-none items-center gap-[11px]", className)}
      aria-label={t("homeAria")}
    >
      <BrandMark />
      <span className="hidden flex-col gap-px sm:flex">
        <span className="text-green text-[13.5px] leading-none font-semibold tracking-[0.16em]">
          {t("shortName")}
        </span>
        <span className="text-stone font-mono text-[8.5px] leading-none tracking-[0.12em]">
          {t("fullName")}
        </span>
      </span>
    </Link>
  );
}
