import type { Metadata } from "next";
import { site } from "@/content/site";
import { localeAlternates } from "./locale-alternates";

export function localizedMetadata({
  title,
  description,
  path,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
}): Metadata {
  return {
    title,
    description,
    alternates: localeAlternates(path, locale),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: site.name,
      locale: locale === "ne" ? "ne_NP" : "en_US",
    },
    twitter: { card: "summary", title, description },
  };
}
