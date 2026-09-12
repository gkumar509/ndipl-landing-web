"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import {
//   LOCALES,
//   LOCALE_LABELS,
//   LOCALE_PARAM,
//   type Locale,
// } from "@/i18n/routing";
import { NAV_ITEMS } from "@/lib/site";
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
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  /** Language lives in the query string, so switching rewrites `?lang=`. */
  // function switchLocale(next: Locale) {
  //   const params = new URLSearchParams(searchParams);
  //   params.set(LOCALE_PARAM, next);
  //   router.replace(`${pathname}?${params}`);
  //   router.refresh();
  // }

  // const active = LOCALE_LABELS[locale] ?? LOCALE_LABELS.en;

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
                {t(item.key)}
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
                        {t(child.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="order-3 ms-auto flex flex-none items-center gap-2">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="text-ink flex items-center gap-[7px] rounded-full border border-[rgba(20,32,26,.16)] px-3 py-[7px] text-[12.5px] font-medium transition-colors hover:border-[var(--color-green)]"
              >
                <span className="bg-green size-1.5 rounded-full" />
                {active.short}
                <span className="text-stone text-[9px]">▼</span>
                <span className="sr-only">{t("changeLanguage")}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[172px]">
              {LOCALES.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onSelect={() => switchLocale(option)}
                  className={cn(
                    "flex justify-between gap-3 text-[13px] font-medium",
                    option === locale ? "text-green" : "text-ink",
                  )}
                >
                  {LOCALE_LABELS[option].name}
                  <span className="text-stone font-mono text-[10px]">
                    {LOCALE_LABELS[option].short}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Button
            asChild
            variant="brand"
            size="pillSm"
            className="max-sm:px-3.75 max-sm:py-2.5 max-sm:text-[12.5px]"
          >
            <Link href="/contact">{t("requestQuote")}</Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={t("openMenu")}
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
                  {t("menu")}
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
                          {t(item.key)}
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
                        {t(item.key)}
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
                              {t(child.key)}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-[rgba(20,32,26,.09)] px-[18px] pt-4 pb-[22px]">
                {/* <div>
                  <div className="text-stone label-mono mb-2 tracking-[0.12em]">
                    {t("language")}
                  </div>
                  <div className="flex flex-wrap gap-[7px]">
                    {LOCALES.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => switchLocale(option)}
                        className={cn(
                          "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors",
                          option === locale
                            ? "bg-green border-green text-white"
                            : "text-ink border-[rgba(20,32,26,.18)]",
                        )}
                      >
                        {LOCALE_LABELS[option].name}
                      </button>
                    ))}
                  </div>
                </div> */}
                <SheetClose asChild>
                  <Button asChild variant="brand" size="block">
                    <Link href="/contact">{t("requestQuote")}</Link>
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
