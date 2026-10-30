import type { ReactNode } from "react";
import { ActionLink } from "@/components/ui/action-link";
import { Container, Section } from "@/components/ui/layout";
import { BodyCopy, Eyebrow, Heading } from "@/components/ui/typography";
import { site } from "@/content/site";

export function ProjectInvitation({
  id,
  title,
  description,
}: {
  id: string;
  title: ReactNode;
  description: ReactNode;
}) {
  return (
    <Section tone="copper" id={id} aria-labelledby={`${id}-heading`}>
      <Container>
        <div className="mb-8 flex items-center justify-between gap-6 border-b border-mineral/30 pb-5">
          <Eyebrow>Start with a conversation</Eyebrow>
          <span className="hidden text-xs md:block">
            Plumbing & electrical contracting
          </span>
        </div>
        <div className="grid gap-8 md:grid-cols-[1.5fr_0.8fr] md:items-center md:gap-12">
          <div>
            <Heading size="feature" id={`${id}-heading`} className="mb-6">
              {title}
            </Heading>
            <BodyCopy className="max-w-[55ch]">{description}</BodyCopy>
          </div>
          <div className="flex flex-col items-start gap-4">
            {site.contact.email && (
              <a
                className="inline-flex min-h-11 items-center text-sm font-semibold break-all"
                href={`mailto:${site.contact.email}`}
              >
                {site.contact.email}
              </a>
            )}
            {site.contact.phone && (
              <a
                className="inline-flex min-h-11 items-center text-sm font-semibold"
                href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
              >
                {site.contact.phone}
              </a>
            )}
            <ActionLink href="/contact" variant="dark">
              Discuss your project
            </ActionLink>
            <ActionLink href="/services" variant="accent">
              Explore plumbing & electrical
            </ActionLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
