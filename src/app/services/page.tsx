import type { Metadata } from "next";
import { ServicesPage } from "@/components/sections/services-page";
import { getServicesMedia } from "@/sanity/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore rvbtech's plumbing and electrical services, installation photos, and site videos.",
};

export default async function Services() {
  const media = await getServicesMedia();
  return <ServicesPage images={media.images} videos={media.videos} />;
}
