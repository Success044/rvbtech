import { ArrowUpRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cx } from "@/lib/classes";

const variants = {
  primary: "bg-copper text-mineral hover:bg-copper-strong",
  dark: "bg-graphite text-mineral hover:bg-forest",
  text: "text-graphite hover:text-copper",
  light: "text-mineral hover:text-copper-light",
  accent: "text-mineral hover:underline hover:underline-offset-4",
};

type ActionVariant = keyof typeof variants;

export function actionClasses({
  variant = "primary",
  compact = false,
}: {
  variant?: ActionVariant;
  compact?: boolean;
} = {}) {
  const textOnly = variant !== "primary" && variant !== "dark";
  return cx(
    "inline-flex items-center justify-between gap-5 text-left font-semibold transition-colors duration-150 motion-reduce:transition-none",
    textOnly
      ? "min-h-11 text-[0.8125rem]"
      : compact
        ? "min-h-11 px-3 py-3 text-[0.6875rem] md:px-4 md:text-xs"
        : "min-h-13 px-5 py-4 text-[0.8125rem]",
    variants[variant],
  );
}

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ActionVariant;
  compact?: boolean;
  className?: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function ActionLink({
  href,
  children,
  variant,
  compact,
  className,
  icon,
  onClick,
}: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cx(actionClasses({ variant, compact }), className)}
      onClick={onClick}
    >
      {children}
      {icon === undefined ? (
        <ArrowUpRight size={18} aria-hidden="true" />
      ) : (
        icon
      )}
    </Link>
  );
}
