import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomePage } from "@/components/sections/home-page";
import { localizedMetadata } from "@/lib/seo/localized-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return localizedMetadata({
    title: t("homeTitle"),
    description: t("homeDescription"),
    path: "",
    locale,
  });
}

export default function Home() {
  return <HomePage />;
}
