import type { Metadata } from "next";
import {
  Instrument_Serif,
  Karla,
  Noto_Sans_Arabic,
  Noto_Sans_Devanagari,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import { Toaster } from "@/components/ui/sonner";
import { isRtl } from "@/i18n/routing";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Karla and Instrument Serif carry no Devanagari or Arabic glyphs.
const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

const arabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  const brand = await getTranslations("brand");

  return {
    title: {
      default: `${brand("shortName")} — ${brand("legalName")}`,
      template: `%s | ${brand("shortName")}`,
    },
    description: t("metaDescription"),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className={`${karla.variable} ${instrumentSerif.variable} ${devanagari.variable} ${arabic.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          {children}
          <Toaster richColors position="top-center" />
        </NextIntlClientProvider>
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
