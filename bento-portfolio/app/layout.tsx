import { Nav } from "@/components/layout/nav";
import { PageBackdrop } from "@/components/layout/page-backdrop";
import { Providers } from "@/components/layout/providers";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { SiteControls } from "@/components/portfolio/site-controls";
import type { ReactNode } from "react";
import "./globals.css";

const introFlag = `(() => {
  const params = new URLSearchParams(location.search);
  if (location.pathname !== "/" || location.hash || params.get("skip") === "1" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let seen = false;
  try { seen = sessionStorage.getItem("eswar-oled-intro-seen") === "1"; } catch {}
  if (!seen || params.get("intro") === "1") document.documentElement.dataset.introPending = "1";
})();`;

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Redaction+10:ital,wght@0,400;0,700;1,400&display=swap" />
        <script dangerouslySetInnerHTML={{ __html: introFlag }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>
          <div className="site-frame site-frame--top" aria-hidden="true" />
          <div className="site-frame site-frame--left" aria-hidden="true" />
          <div className="site-frame site-frame--right" aria-hidden="true" />
          <svg className="site-corner site-corner--top-left" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z" fill="currentColor"/>
          </svg>
          <svg className="site-corner site-corner--top-right" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z" fill="currentColor"/>
          </svg>
          <SkipToContent />
          <PageBackdrop />
          <Nav />
          <SiteControls />
          {children}
          <footer className="portfolio-credit">MADE BY I⚡️H</footer>
        </Providers>
      </body>
    </html>
  );
}
