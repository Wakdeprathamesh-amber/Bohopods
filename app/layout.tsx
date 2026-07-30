import type { Metadata, Viewport } from "next";
import { Jost, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";

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
    default:
      "Boho Pods | Prefab Luxury Cabins & Glamping Pods in India (30–45 Day Install)",
    template: "%s · Boho Pods",
  },
  description:
    "Factory-built prefab cabins & glamping pods with Scandinavian design. Own a nature escape on your land in Lonavala, Alibaug, Goa & beyond — installed in 30–45 days, built for 30+ years. From ₹5L.",
  keywords: [
    "Boho Pods",
    "prefab cabins India",
    "glamping pods India",
    "modular homes Mumbai",
    "prefab villa Lonavala",
    "prefab cabin Alibaug",
    "glamping pod Goa",
    "Airbnb pod investment India",
    "Scandinavian prefab cabin",
    "Gatsby pod",
    "plug and play cabin",
    "temporary structure FSI",
  ],
  authors: [{ name: "Boho Pods" }],
  creator: "Boho Pods",
  publisher: "Boho Pods",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Boho Pods",
    title: "Boho Pods | Prefab Luxury Cabins & Glamping Pods in India",
    description:
      "Own a beautiful nature escape on your land — factory-built, plug-and-play, installed in 30–45 days. Select · Install · Stay.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "A Boho Pod glowing at golden hour in nature",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boho Pods | Prefab Luxury Cabins & Glamping Pods in India",
    description:
      "Factory-built prefab cabins installed on your land in 30–45 days. From ₹5L.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "real estate",
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
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
