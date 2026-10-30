import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/classes";

export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-[88.5rem] px-5 md:px-8 xl:px-12",
        className,
      )}
      {...props}
    />
  );
}

const surfaces = {
  mineral: "bg-mineral text-graphite",
  paper: "bg-paper text-graphite",
  fog: "bg-fog text-graphite",
  graphite:
    "bg-graphite text-mineral [--focus-color:var(--color-copper-light)]",
  forest: "bg-forest text-mineral [--focus-color:var(--color-copper-light)]",
  sage: "bg-sage text-mineral [--focus-color:var(--color-mineral)]",
  copper: "bg-copper text-mineral [--focus-color:var(--color-mineral)]",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: keyof typeof surfaces;
  spacing?: "section" | "none";
};

export function Section({
  tone = "mineral",
  spacing = "section",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cx(
        surfaces[tone],
        spacing === "section" && "py-14 md:py-16 xl:py-20",
        className,
      )}
      {...props}
    />
  );
}
