import type { Metadata } from "next";
import { Instrument_Serif, Karla } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import { Toaster } from "@/components/ui/sonner";
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

export const metadata: Metadata = {
  title: {
    default: "NDIPL — Natures Delight Industries Private Limited",
    template: "%s | NDIPL",
  },
  description:
    "India-based manufacturer, merchant exporter and global sourcing partner for premium-quality agro products — pulses, spices, grains, millets, oil seeds and dehydrated produce.",
  manifest: "/site.webmanifest",
  icons: {
    // favicon.ico is emitted by the app/favicon.ico convention.
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${karla.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster richColors position="top-center" />
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
