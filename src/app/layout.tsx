import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { TimeThemeProvider } from "@/components/providers/time-theme-provider";
import { CookieConsentBanner } from "@/components/site/cookie-consent";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { siteMeta } from "@/data/content";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteMeta.title} | Contemporary Agora for Art`,
    template: `%s | ${siteMeta.title}`,
  },
  description: siteMeta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <TimeThemeProvider />
        <SiteHeader />
        <main className="page-wrap">{children}</main>
        <SiteFooter />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
