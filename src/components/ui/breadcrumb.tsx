import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Breadcrumb({ currentPage }: { currentPage: string }) {
  const t = useTranslations("navigation");
  const controls = useTranslations("controls");

  return (
    <nav className="pt-6 md:pt-8" aria-label={controls("breadcrumb")}>
      <ol className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <li>
          <Link
            className="inline-flex min-h-8 items-center hover:text-copper"
            href="/"
          >
            {t("home")}
          </Link>
        </li>
        <li className="flex min-h-8 items-center gap-3">
          <ChevronRight size={14} aria-hidden="true" />
          <span className="text-graphite" aria-current="page">
            {currentPage}
          </span>
        </li>
      </ol>
    </nav>
  );
}
