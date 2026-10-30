import { site } from "@/content/site";

export function localeAlternates(path: string, locale: string) {
  const englishPath = path || "/";
  const nepaliPath = path ? `/ne${path}` : "/ne";
  const origin = site.url;

  return {
    canonical: new URL(
      locale === "ne" ? nepaliPath : englishPath,
      origin,
    ).toString(),
    languages: {
      en: new URL(englishPath, origin).toString(),
      ne: new URL(nepaliPath, origin).toString(),
      "x-default": new URL(englishPath, origin).toString(),
    },
  };
}
