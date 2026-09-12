import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** The NDIPL mark: a green "n" with two gradient "seeds". */
export function BrandMark({
  className,
  size = 34,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/ndipl_logo.png"
      alt=""
      aria-hidden="true"
      width={527}
      height={473}
      priority
      className={cn("flex-none", className)}
      style={{ height: size, width: "auto" }}
    />
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
