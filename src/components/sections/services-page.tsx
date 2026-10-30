import { ArrowDown } from "lucide-react";
import { ServiceDetailDrawing } from "@/components/illustrations/service-detail-drawing";
import { ActionLink } from "@/components/ui/action-link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/layout";
import { ServiceGallery } from "@/components/ui/service-gallery";
import type { ServicesMedia } from "@/content/media";
import { serviceSummaries } from "@/content/services";
import { cx } from "@/lib/classes";
import { WorkVideos } from "./work-videos";

export function ServicesPage({ images, videos }: ServicesMedia) {
  return (
    <>
      <section
        className="text-graphite bg-white pb-12 md:pb-16"
        aria-labelledby="services-page-heading"
      >
        <Container>
          <Breadcrumb currentPage="Services" />
          <div className="grid items-center gap-8 pt-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:pt-12 xl:gap-20">
            <header>
              <h1
                id="services-page-heading"
                className="text-display-page md:text-display-page-wide leading-[1.02] font-semibold tracking-[-0.055em]"
              >
                <span className="block">Plumbing &</span>
                <span className="block">electrical.</span>
              </h1>
              <p className="text-muted mt-6 max-w-[42ch] text-base leading-relaxed">
                Water supply, bathroom fittings, lighting and wiring. See what
                we install and take a closer look at our work.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ActionLink href="/contact" className="rounded-lg">
                  Discuss your project
                </ActionLink>
                {images.length > 0 && (
                  <ActionLink
                    href="#selected-work-heading"
                    variant="text"
                    icon={<ArrowDown size={16} aria-hidden="true" />}
                  >
                    View our work
                  </ActionLink>
                )}
              </div>
            </header>
            <figure className="mx-auto w-full max-w-lg md:mx-0 md:justify-self-end">
              <ServiceDetailDrawing />
              <figcaption className="text-muted mt-1 text-center text-[0.6875rem]">
                A closer look at the connections. Concept illustration.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section
        className="text-graphite bg-white pb-12 md:pb-16"
        aria-label="Services we offer"
      >
        <Container>
          <div className="border-line/70 grid gap-8 border-t pt-8 md:grid-cols-2 md:gap-12 md:pt-10 xl:gap-20">
            {serviceSummaries.map((service) => (
              <article
                key={service.id}
                aria-labelledby={`${service.id}-service-heading`}
                className={cx(
                  "min-w-0",
                  service.id === "electrical" &&
                    "border-line/70 border-t pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-12 xl:pl-20",
                )}
              >
                <h2
                  id={`${service.id}-service-heading`}
                  className="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  {service.title}
                </h2>
                <p className="text-muted mt-3 max-w-[42ch] text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul
                  className={cx(
                    "mt-5 grid list-disc gap-x-6 gap-y-3 pl-4 text-sm leading-relaxed sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2",
                    service.id === "plumbing"
                      ? "marker:text-copper"
                      : "marker:text-sage",
                  )}
                >
                  {service.topics.map((topic) => (
                    <li className="pl-1" key={topic}>
                      {topic}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {images.length > 0 && (
        <section
          className="text-graphite bg-white pb-14 md:pb-20"
          aria-labelledby="selected-work-heading"
        >
          <Container>
            <ServiceGallery images={images} />
          </Container>
        </section>
      )}

      <WorkVideos videos={videos} />

      <section
        className="bg-mineral text-graphite py-10 md:py-12"
        aria-labelledby="services-enquiry-heading"
      >
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-10">
          <div>
            <h2
              id="services-enquiry-heading"
              className="text-2xl font-semibold tracking-tight md:text-3xl"
            >
              Have a project in mind?
            </h2>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              Tell us about your space and the work you need.
            </p>
          </div>
          <ActionLink href="/contact" className="shrink-0 rounded-lg">
            Discuss your project
          </ActionLink>
        </Container>
      </section>
    </>
  );
}
