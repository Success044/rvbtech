import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/layout";
import type { LegalDocument } from "@/content/legal";

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <section
      className="bg-white py-10 text-graphite md:py-14 xl:py-16"
      aria-labelledby="legal-page-heading"
    >
      <Container>
        <Breadcrumb currentPage={document.title} />
        <header className="max-w-3xl pt-8 md:pt-12">
          <h1
            id="legal-page-heading"
            className="text-display-page leading-[1.08] font-semibold tracking-[-0.045em]"
          >
            {document.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            Effective date: {document.effectiveDate}
          </p>
          <p className="mt-7 max-w-[72ch] text-base leading-relaxed text-muted">
            {document.introduction}
          </p>
        </header>

        <div className="mt-10 max-w-3xl divide-y divide-line/70 border-t border-line/70">
          {document.sections.map((section) => (
            <section key={section.heading} className="py-7">
              <h2 className="text-lg font-medium tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul className="list-disc space-y-2 pl-5 marker:text-sage">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.closing?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
