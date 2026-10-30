import type { Metadata } from "next";
import { AboutPage } from "@/components/sections/about-page";

const title = "Our story & approach";
const description =
  "Meet rvbtech, a plumbing and electrical contracting company in Nepal. Discover the founder's field experience and the belief in better advice, careful work, and lasting accountability.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | rvbtech`,
    description,
    type: "website",
    siteName: "rvbtech",
    locale: "en_US",
  },
  twitter: { card: "summary", title: `${title} | rvbtech`, description },
};

export default function About() {
  return <AboutPage />;
}
