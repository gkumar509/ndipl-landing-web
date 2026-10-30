"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS, WHATSAPP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  // In-page anchors (`/#certifications`) never count as the active page.
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function isBranchActive(
  pathname: string,
  item: (typeof NAV_ITEMS)[number],
): boolean {
  return (
    isActive(pathname, item.href) ||
    ("children" in item &&
      item.children.some((child) => isActive(pathname, child.href)))
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(20,32,26,.09)] bg-[rgba(250,248,243,.92)] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-310 flex-wrap items-center gap-x-5 gap-y-2.5 px-4.5 py-3 sm:px-7">
        <Logo />

        {/* flex-1 lets the nav absorb the space between logo and actions, so
            justify-center centres it between them. */}
        <nav className="order-2 hidden min-w-0 flex-1 flex-wrap justify-center gap-0.5 min-[981px]:flex">
          {NAV_ITEMS.map((item) => {
            const link = (
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors hover:bg-[rgba(10,107,61,.07)]",
                  isBranchActive(pathname, item) ? "text-green" : "text-ink",
                )}
              >
                {item.label}
                {"children" in item && (
                  <span aria-hidden className="text-stone text-[9px]">
                    ▼
                  </span>
                )}
              </Link>
            );

            if (!("children" in item)) {
              return <div key={item.href}>{link}</div>;
            }

            /* Hover/focus-within only — the submenu needs no JS state. The
               wrapper's top padding keeps the pointer inside `group` while it
               travels from the trigger down to the panel. */
            return (
              <div key={item.href} className="group relative">
                {link}
                <div className="invisible absolute top-full left-1/2 z-50 w-52.5 -translate-x-1/2 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="bg-cream flex flex-col gap-0.5 rounded-[13px] border border-[rgba(20,32,26,.09)] p-1.5 shadow-[0_14px_36px_rgba(20,32,26,.12)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        aria-current={
                          isActive(pathname, child.href) ? "page" : undefined
                        }
                        className={cn(
                          "rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-[rgba(10,107,61,.07)]",
                          isActive(pathname, child.href)
                            ? "text-green"
                            : "text-ink",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="order-3 ms-auto flex flex-none items-center gap-2">
          <Button
            asChild
            variant="brand"
            size="pillSm"
            className="max-sm:px-3.75 max-sm:py-2.5 max-sm:text-[12.5px]"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex size-[42px] flex-col items-center justify-center gap-1 rounded-[11px] border border-[rgba(20,32,26,.16)] transition-colors hover:border-[var(--color-green)] min-[981px]:hidden"
              >
                <span className="bg-ink h-[1.6px] w-[17px] rounded-sm" />
                <span className="bg-ink h-[1.6px] w-[17px] rounded-sm" />
                <span className="bg-ink h-[1.6px] w-[17px] rounded-sm" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-cream flex w-[min(320px,86vw)] flex-col p-0"
            >
              <SheetHeader className="flex-row items-center justify-between border-b border-[rgba(20,32,26,.09)] px-5 py-[18px]">
                <SheetTitle className="text-green text-[12.5px] font-semibold tracking-[0.16em]">
                  MENU
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-0.5 overflow-y-auto px-3 py-2.5">
                {NAV_ITEMS.map((item) => {
                  const itemClass = (href: string) =>
                    cn(
                      "rounded-[11px] px-3.5 py-3.5 text-base font-medium transition-colors hover:bg-[rgba(10,107,61,.07)]",
                      isActive(pathname, href)
                        ? "text-green bg-[rgba(10,107,61,.09)]"
                        : "text-ink",
                    );

                  if (!("children" in item)) {
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link href={item.href} className={itemClass(item.href)}>
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  }

                  /* `<details>` gives the accordion open/close for free. */
                  return (
                    <details key={item.href} className="group">
                      <summary
                        className={cn(
                          "flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden",
                          itemClass(item.href),
                          isBranchActive(pathname, item) && "text-green",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className="text-stone text-[9px] transition-transform group-open:rotate-180"
                        >
                          ▼
                        </span>
                      </summary>
                      <div className="ms-3.5 flex flex-col gap-0.5 border-s border-[rgba(20,32,26,.12)] ps-2">
                        {item.children.map((child) => (
                          <SheetClose asChild key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                itemClass(child.href),
                                "py-3 text-[15px]",
                              )}
                            >
                              {child.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-[rgba(20,32,26,.09)] px-[18px] pt-4 pb-[22px]">
                <SheetClose asChild>
                  <Button asChild variant="brand" size="block">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
