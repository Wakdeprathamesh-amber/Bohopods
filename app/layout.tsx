import type { Metadata, Viewport } from "next";
import { Jost, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProgress } from "@/components/ScrollProgress";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL = "https://bohopods.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Boho Pods — Prefab Luxury Cabins & Glamping Pods, Installed in 30 Days",
    template: "%s · Boho Pods",
  },
  description:
    "Plug-n-play prefab cabins with Scandinavian design. Own a beautiful nature escape on your land — installed in 30–45 days, built to last 30+ years. Select · Install · Stay.",
  keywords: [
    "Boho Pods",
    "prefab cabins India",
    "glamping pods",
    "modular homes",
    "prefab villa Lonavala",
    "prefab cabin Alibaug",
    "glamping pod Goa",
    "Airbnb pod investment India",
    "Scandinavian prefab cabin",
    "Gatsby pod",
  ],
  authors: [{ name: "Boho Pods" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Boho Pods",
    title: "Boho Pods — Prefab Luxury Cabins & Glamping Pods",
    description:
      "Own a beautiful nature escape on your land — installed in 30–45 days. Select · Install · Stay.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "A Boho Pod glowing at golden hour in nature" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boho Pods — Prefab Luxury Cabins & Glamping Pods",
    description: "Own a beautiful nature escape on your land — installed in 30–45 days.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#36441f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="grain min-h-dvh bg-paper text-ink antialiased">
        <noscript>
          <style>{`.js-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
