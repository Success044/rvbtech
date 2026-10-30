import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function Breadcrumb({ currentPage }: { currentPage: string }) {
  return (
    <nav className="pt-6 md:pt-8" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <li>
          <Link
            className="inline-flex min-h-8 items-center hover:text-copper"
            href="/"
          >
            Home
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
