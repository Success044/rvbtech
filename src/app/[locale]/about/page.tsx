import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutPage } from "@/components/sections/about-page";
import { localizedMetadata } from "@/lib/seo/localized-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("aboutTitle");
  const description = (await getTranslations({ locale, namespace: "about" }))(
    "metadataDescription",
  );

  return localizedMetadata({
    title,
    description,
    path: "/about",
    locale,
  });
}

export default function About() {
  return <AboutPage />;
}
