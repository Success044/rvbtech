import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesPage } from "@/components/sections/services-page";
import { localizedMetadata } from "@/lib/seo/localized-metadata";
import { getServicesMedia } from "@/sanity/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const title = t("pageTitle");
  const description = t("metadataDescription");

  return localizedMetadata({
    title,
    description,
    path: "/services",
    locale,
  });
}

export default async function Services() {
  const media = await getServicesMedia();
  return <ServicesPage images={media.images} videos={media.videos} />;
}
