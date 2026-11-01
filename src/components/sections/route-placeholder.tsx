import { useTranslations } from "next-intl";
import { ConnectionFaultDrawing } from "@/components/illustrations/connection-fault-drawing";
import { ActionLink } from "@/components/ui/action-link";
import { Container, Section } from "@/components/ui/layout";

export function RoutePlaceholder({ label }: { label?: string }) {
  const t = useTranslations("controls");

  return (
    <Section
      spacing="none"
      className="flex min-h-[calc(100svh_-_5.75rem)] items-center py-12 md:py-16"
      aria-labelledby="unavailable-page-heading"
    >
      <Container className="flex flex-col items-center gap-8">
        <h1 id="unavailable-page-heading" className="sr-only">
          {label ?? t("notFound")}
        </h1>
        <div className="w-full max-w-2xl border border-line-dark bg-graphite p-2 md:p-4">
          <ConnectionFaultDrawing />
        </div>
        <ActionLink href="/">{t("backHome")}</ActionLink>
      </Container>
    </Section>
  );
}
