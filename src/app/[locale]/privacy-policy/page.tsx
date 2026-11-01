import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/sections/legal-page";
import { privacyPolicy } from "@/content/legal";
import { privacyPolicyNepali } from "@/content/legal-ne";
import { localizedMetadata } from "@/lib/seo/localized-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return localizedMetadata({
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    path: "/privacy-policy",
    locale,
  });
}

export default async function PrivacyPolicy() {
  const locale = await getLocale();
  return (
    <LegalPage
      document={locale === "ne" ? privacyPolicyNepali : privacyPolicy}
    />
  );
}
