"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("language");

  return (
    <nav
      aria-label={t("label")}
      className="inline-flex h-11 shrink-0 items-center rounded-lg border border-graphite/10 bg-white/50 p-1 text-[0.6875rem] font-semibold"
    >
      {routing.locales.map((nextLocale) => {
        const label = t(nextLocale === "en" ? "english" : "nepali");
        const isCurrent = locale === nextLocale;

        return (
          <button
            key={nextLocale}
            type="button"
            lang={nextLocale}
            aria-label={t("switchTo", { language: label })}
            aria-pressed={isCurrent}
            className="inline-flex h-full min-w-9 items-center justify-center rounded-md px-2 transition-colors hover:bg-graphite/5 aria-pressed:bg-sage/12 motion-reduce:transition-none"
            onClick={() => {
              if (isCurrent) return;

              const targetPath =
                nextLocale === routing.defaultLocale
                  ? pathname
                  : `/${nextLocale}${pathname === "/" ? "" : pathname}`;
              window.location.assign(
                `${targetPath}${window.location.search}${window.location.hash}`,
              );
            }}
          >
            {nextLocale === "en" ? "EN" : label}
          </button>
        );
      })}
    </nav>
  );
}
