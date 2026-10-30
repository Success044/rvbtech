"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ActionLink } from "@/components/ui/action-link";
import { NavigationLinks } from "./navigation-links";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }
    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-2 z-30 mx-auto max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-[82.5rem] overflow-y-auto rounded-2xl border border-white/70 bg-mineral/95 p-2 text-graphite shadow-[0_8px_32px_-8px_#171c1b30,inset_0_1px_0_#ffffff80] backdrop-blur-xl supports-[backdrop-filter:blur(1px)]:bg-mineral/80"
    >
      <div className="flex items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-5">
        <Link
          id="site-logo"
          className="inline-flex w-fit shrink-0 items-center gap-3 rounded-lg"
          href="/"
          aria-label="rvbtech home"
          onClick={() => setIsOpen(false)}
        >
          <Wordmark />
          <span className="hidden flex-col gap-1 sm:flex">
            <span className="text-base leading-none font-semibold tracking-tight">
              R.V.B Tech
            </span>
            <span className="text-[0.6875rem] text-graphite/75">
              Plumbing & electrical
            </span>
          </span>
        </Link>
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          <NavigationLinks
            activePath={pathname}
            tone="surface"
            className="text-[0.8125rem]"
            onNavigate={() => setIsOpen(false)}
          />
        </nav>
        <div className="flex items-center justify-end gap-2">
          <ActionLink
            href="/contact"
            variant="dark"
            compact
            className="rounded-lg"
            onClick={() => setIsOpen(false)}
            icon={
              <ArrowUpRight
                size={16}
                className="hidden md:block"
                aria-hidden="true"
              />
            }
          >
            <span className="sm:hidden">Let’s talk</span>
            <span className="hidden sm:inline">Discuss your project</span>
          </ActionLink>
          <button
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-graphite/10 bg-white/50 transition-colors hover:bg-graphite/5 aria-expanded:bg-sage/12 motion-reduce:transition-none lg:hidden"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsOpen(!isOpen)}
            ref={toggleRef}
          >
            {isOpen ? (
              <X size={23} aria-hidden="true" />
            ) : (
              <Menu size={23} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mt-2 border-t border-graphite/10 pt-2 lg:hidden"
        aria-label="Mobile navigation"
        hidden={!isOpen}
      >
        <div className="flex flex-col gap-1">
          <NavigationLinks
            activePath={pathname}
            tone="surface"
            className="justify-between py-3 text-base"
            showArrows
            onNavigate={() => setIsOpen(false)}
          />
          <p className="px-4 pt-3 pb-2 text-xs text-graphite/75">
            Plumbing & electrical. Planned together.
          </p>
        </div>
      </nav>
    </header>
  );
}
