"use client";

import { usePathname } from "next/navigation";

/** Shows the URL that failed to resolve, always left-to-right. */
export function RequestedPath() {
  const pathname = usePathname();

  return (
    <code dir="ltr" className="font-mono text-[13px] break-all text-on-ink">
      {pathname}
    </code>
  );
}
