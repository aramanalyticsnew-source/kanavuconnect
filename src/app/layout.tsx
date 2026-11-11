import type { Metadata, Viewport } from "next";
import { Libre_Baskerville, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import "./globals.css";

// Headings: Libre Baskerville (variable, 400–700, with italics).
const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-baskerville",
  display: "swap",
});

// Body, navigation, buttons and labels: Manrope.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    images: [{ url: "/brand/kanavu-connect-logo.png", width: 720, height: 720, alt: "Kanavu Connect logo" }],
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#3D0905",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${baskerville.variable} ${manrope.variable}`}>
      <body>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
