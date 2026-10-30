import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** The NDIPL mark: a green "n" with two gradient "seeds". */
export function BrandMark({
  className,
  size = 40,
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
  return (
    <Link
      href="/"
      className={cn("flex flex-none items-center gap-3", className)}
      aria-label="NDIPL — home"
    >
      <BrandMark />
      <span className="hidden flex-col gap-px sm:flex">
        <span className="text-green text-[25px] leading-none font-semibold tracking-[0.16em]">
          NDIPL
        </span>
        <span className="text-gray-900 font-mono text-[8.5px] leading-none tracking-[0.12em]">
          NATURES DELIGHT INDUSTRIES PVT LTD
        </span>
      </span>
    </Link>
  );
}
