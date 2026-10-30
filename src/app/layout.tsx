import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipToContent } from "@/components/ui/page-controls";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: site.title, template: "%s | rvbtech" },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={archivo.variable} data-scroll-behavior="smooth">
      <body>
        <SkipToContent />
        <SiteHeader />
        <main
          id="main-content"
          tabIndex={-1}
          className="[&>section:first-child]:pt-28 md:[&>section:first-child]:pt-32"
        >
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
