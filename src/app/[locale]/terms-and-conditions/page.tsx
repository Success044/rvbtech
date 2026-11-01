import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/sections/legal-page";
import { termsAndConditions } from "@/content/legal";
import { termsAndConditionsNepali } from "@/content/legal-ne";
import { localizedMetadata } from "@/lib/seo/localized-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return localizedMetadata({
    title: t("termsTitle"),
    description: t("termsDescription"),
    path: "/terms-and-conditions",
    locale,
  });
}

export default async function TermsAndConditions() {
  const locale = await getLocale();
  return (
    <LegalPage
      document={locale === "ne" ? termsAndConditionsNepali : termsAndConditions}
    />
  );
}
