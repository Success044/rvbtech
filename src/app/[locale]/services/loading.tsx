import { useTranslations } from "next-intl";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/layout";

export default function ServicesLoading() {
  const t = useTranslations("servicesPage");

  return (
    <section
      className="min-h-[65svh] bg-white pb-16 text-graphite"
      aria-busy="true"
    >
      <Container>
        <Breadcrumb currentPage={t("pageTitle")} />
        <output className="block py-12 text-sm text-muted">
          {t("loading")}
        </output>
      </Container>
    </section>
  );
}
