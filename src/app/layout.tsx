import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono, Source_Sans_3 } from "next/font/google";

import { siteConfig } from "@/content/site";
import { resolveMetadataBaseUrl } from "@/lib/resolve-metadata-base";
import "./globals.css";

const heading = Archivo({
  variable: "--font-ayres-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-ayres-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const base = await resolveMetadataBaseUrl();
  const metadataBase = new URL(base.endsWith("/") ? base : `${base}/`);
  const canonical = new URL("/", metadataBase).href;

  return {
    metadataBase,
    title: {
      default: "Ayres Mechanical Inc. | Heating & Air Conditioning Specialists",
      template: "%s | Ayres Mechanical Inc.",
    },
    description:
      "Ayres Mechanical provides residential, commercial, and industrial heating and air conditioning services throughout Central Indiana. Call 317-538-9837 for service.",
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: siteConfig.name,
      title: "Ayres Mechanical Inc. | Heating & Air Conditioning Specialists",
      description: siteConfig.description,
    },
    twitter: {
      card: "summary_large_image",
      title: "Ayres Mechanical Inc. | Heating & Air Conditioning Specialists",
      description: siteConfig.description,
    },
    icons: {
      icon: "/brand/favicon.svg",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D3FB8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClassName = heading.variable + " " + body.variable + " " + mono.variable;

  return (
    <html lang="en" className={fontClassName}>
      <body className="min-h-screen bg-background antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
