import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/classes";

const headingSizes = {
  hero: "text-display-hero leading-[0.92] md:text-display-hero-wide",
  page: "text-display-page leading-[0.94] md:text-display-page-wide",
  section: "text-display-section leading-none md:text-display-section-wide",
  feature: "text-display-feature leading-[0.95] md:text-display-feature-wide",
  service: "text-display-service leading-none md:text-display-service-wide",
};

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof headingSizes;
};

export function Heading({
  as: Tag = "h2",
  size = "section",
  className,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cx(
        "font-extrabold uppercase tracking-[-0.05em]",
        headingSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cx("text-xs font-medium leading-relaxed", className)}
      {...props}
    />
  );
}

export function BodyCopy({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return <p className={cx("text-sm leading-[1.85]", className)} {...props} />;
}

export function SectionRail({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-t-3 border-graphite pt-4">
      <Eyebrow>{label}</Eyebrow>
      {children}
    </div>
  );
}

type SectionHeaderProps = {
  id: string;
  label: string;
  children: ReactNode;
  description?: ReactNode;
  inverse?: boolean;
};

export function SectionHeader({
  id,
  label,
  children,
  description,
  inverse = false,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-6 md:mb-11 md:flex-row md:items-end md:gap-10">
      <div>
        <Eyebrow className={inverse ? "text-copper-light" : undefined}>
          {label}
        </Eyebrow>
        <Heading id={id} className="mt-5">
          {children}
        </Heading>
      </div>
      {description && (
        <BodyCopy
          className={cx("max-w-72", inverse ? "text-mineral/75" : "text-muted")}
        >
          {description}
        </BodyCopy>
      )}
    </div>
  );
}
