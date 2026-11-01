import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactPage } from "@/components/sections/contact-page";
import { getTurnstileSiteKey } from "@/lib/contact/turnstile-config";
import { localizedMetadata } from "@/lib/seo/localized-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const title = t("pageTitle");
  const description = t("metadataDescription");

  return localizedMetadata({
    title,
    description,
    path: "/contact",
    locale,
  });
}

export default function Contact() {
  return <ContactPage siteKey={getTurnstileSiteKey(process.env) ?? ""} />;
}
