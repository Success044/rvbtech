import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { cx } from "@/lib/classes";

export function NavigationLinks({
  activePath,
  tone = "inverse",
  className,
  showArrows = false,
  onNavigate,
}: {
  activePath?: string | null;
  tone?: "inverse" | "surface";
  className?: string;
  showArrows?: boolean;
  onNavigate?: () => void;
}) {
  const t = useTranslations("navigation");

  return site.navigation.map((item) => (
    <Link
      key={item.label}
      href={item.href}
      aria-current={item.href === activePath ? "page" : undefined}
      onClick={onNavigate}
      className={cx(
        "inline-flex min-h-11 items-center font-medium transition-colors motion-reduce:transition-none",
        tone === "surface"
          ? "rounded-lg px-4 text-graphite/75 hover:bg-graphite/5 hover:text-graphite aria-[current=page]:bg-sage/12 aria-[current=page]:text-graphite"
          : "hover:text-copper-light aria-[current=page]:text-copper-light",
        className,
      )}
    >
      {t(item.href === "/" ? "home" : item.href.slice(1))}
      {showArrows && <ArrowUpRight size={18} aria-hidden="true" />}
    </Link>
  ));
}
