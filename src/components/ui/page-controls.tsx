"use client";

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/lib/classes";
import { actionClasses } from "./action-link";

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
}

export function SkipToContent() {
  return (
    <button
      className="fixed top-2.5 left-2.5 z-50 -translate-y-[150%] bg-mineral px-6 py-4 text-graphite focus:translate-y-0"
      type="button"
      onClick={() => {
        const main = document.getElementById("main-content");
        main?.focus({ preventScroll: true });
        main?.scrollIntoView({ block: "start", behavior: "instant" });
      }}
    >
      Skip to content
    </button>
  );
}

export function BackToTop() {
  return (
    <button
      className="inline-flex min-h-11 items-center gap-4 text-xs hover:text-copper-light"
      type="button"
      onClick={() => {
        document.getElementById("site-logo")?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
      }}
    >
      Back to top <ArrowUpRight size={16} aria-hidden="true" />
    </button>
  );
}

export function ScrollToSection({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      className={cx(actionClasses({ variant: "text" }), className)}
      type="button"
      onClick={() => {
        const target = document.getElementById(targetId);
        target?.focus({ preventScroll: true });
        target?.scrollIntoView({ block: "start", behavior: scrollBehavior() });
      }}
    >
      {children}
    </button>
  );
}
