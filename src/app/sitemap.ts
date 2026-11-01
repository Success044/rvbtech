import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const pagePaths = [
  "",
  "/about",
  "/services",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.flatMap((path) => {
    const englishPath = path || "/";
    const nepaliPath = path ? `/ne${path}` : "/ne";
    const languages = {
      en: new URL(englishPath, site.url).toString(),
      ne: new URL(nepaliPath, site.url).toString(),
      "x-default": new URL(englishPath, site.url).toString(),
    };

    return [
      {
        url: new URL(englishPath, site.url).toString(),
        alternates: { languages },
      },
      {
        url: new URL(nepaliPath, site.url).toString(),
        alternates: { languages },
      },
    ];
  });
}
