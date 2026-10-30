import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/layout";

export default function ServicesLoading() {
  return (
    <section
      className="min-h-[65svh] bg-white pb-16 text-graphite"
      aria-busy="true"
    >
      <Container>
        <Breadcrumb currentPage="Services" />
        <output className="block py-12 text-sm text-muted">
          Loading our work…
        </output>
      </Container>
    </section>
  );
}
