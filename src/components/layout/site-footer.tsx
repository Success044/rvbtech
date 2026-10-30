import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { BackToTop } from "@/components/ui/page-controls";
import { BodyCopy } from "@/components/ui/typography";
import { site } from "@/content/site";
import { NavigationLinks } from "./navigation-links";
import { Wordmark } from "./wordmark";

export async function SiteFooter() {
  "use cache";

  return (
    <footer className="bg-graphite text-mineral [--focus-color:var(--color-copper-light)]">
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-6 py-10 md:gap-9 md:py-12">
          <div className="w-full md:w-auto">
            <Link
              className="inline-flex shrink-0 items-center"
              href="/"
              aria-label="rvbtech home"
            >
              <Wordmark />
            </Link>
            <BodyCopy className="mt-5 text-mineral/65">
              Plumbing & electrical contracting.
              <br />
              Built from the inside out.
            </BodyCopy>
          </div>
          <nav
            className="flex flex-wrap gap-6 md:gap-8"
            aria-label="Footer navigation"
          >
            <NavigationLinks className="text-xs md:text-[0.8125rem]" />
          </nav>
          <BackToTop />
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-line-dark py-6 text-[0.6875rem] text-mineral/65 md:flex-row md:items-center md:gap-6">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            <Link
              className="min-h-8 inline-flex items-center hover:text-copper-light"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              className="min-h-8 inline-flex items-center hover:text-copper-light"
              href="/terms-and-conditions"
            >
              Terms and Conditions
            </Link>
          </nav>
          <p>Thoughtfully planned. Carefully connected.</p>
        </div>
      </Container>
    </footer>
  );
}
