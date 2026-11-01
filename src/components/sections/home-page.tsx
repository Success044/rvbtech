import {
  ArrowDown,
  ArrowDownRight,
  Droplets,
  MoveRight,
  Plus,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { BuildingSystemsDrawing } from "@/components/illustrations/building-systems-drawing";
import { ServiceDrawing } from "@/components/illustrations/service-drawing";
import { ActionLink } from "@/components/ui/action-link";
import { Container, Section } from "@/components/ui/layout";
import { NumberedSteps } from "@/components/ui/numbered-steps";
import {
  BodyCopy,
  Eyebrow,
  Heading,
  SectionHeader,
  SectionRail,
} from "@/components/ui/typography";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { cx } from "@/lib/classes";
import { ProjectInvitation } from "./project-invitation";

export function HomePage() {
  const t = useTranslations("home");
  const services = [
    {
      id: "plumbing",
      title: t("services.plumbing.title"),
      diagramLabel: t("services.plumbing.diagramLabel"),
      description: t("services.plumbing.description"),
      topics: [
        t("services.plumbing.topics.0"),
        t("services.plumbing.topics.1"),
        t("services.plumbing.topics.2"),
      ],
      link: t("services.plumbing.contact"),
    },
    {
      id: "electrical",
      title: t("services.electrical.title"),
      diagramLabel: t("services.electrical.diagramLabel"),
      description: t("services.electrical.description"),
      topics: [
        t("services.electrical.topics.0"),
        t("services.electrical.topics.1"),
        t("services.electrical.topics.2"),
      ],
      link: t("services.electrical.contact"),
    },
  ] as const;
  const processSteps = [
    {
      title: t("process.steps.0.title"),
      description: t("process.steps.0.description"),
    },
    {
      title: t("process.steps.1.title"),
      description: t("process.steps.1.description"),
    },
    {
      title: t("process.steps.2.title"),
      description: t("process.steps.2.description"),
    },
    {
      title: t("process.steps.3.title"),
      description: t("process.steps.3.description"),
    },
  ];

  return (
    <>
      <Section tone="graphite" spacing="none" aria-labelledby="hero-heading">
        <Container>
          <div className="flex items-center justify-between gap-6 border-b border-line-dark py-5">
            <Eyebrow className="text-mineral/80">
              {t("hero.descriptor")}
            </Eyebrow>
            <Link
              className="hidden min-h-7 items-center gap-5 text-xs text-mineral/70 hover:text-copper-light md:inline-flex"
              href="/services"
            >
              {t("hero.fromPlanning")}
              <ArrowDownRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid md:min-h-140 md:grid-cols-[1.12fr_1fr] xl:min-h-152">
            <div className="py-9 md:pr-7 md:py-11">
              <Heading as="h1" size="hero" id="hero-heading">
                <span className="block">{t("hero.taglineLine1")}</span>
                <span className="block">{t("hero.taglineLine2")}</span>
                <span className="block">{t("hero.taglineLine3")}</span>
              </Heading>
              <BodyCopy className="mt-7 max-w-[25rem] text-mineral/75">
                {t("hero.description")}
              </BodyCopy>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ActionLink href="/contact">
                  {t("hero.discussProject")}
                </ActionLink>
                <ActionLink
                  href="/services"
                  variant="light"
                  icon={<ArrowDown size={17} aria-hidden="true" />}
                >
                  {t("hero.exploreServices")}
                </ActionLink>
              </div>
            </div>
            <figure className="flex min-w-0 flex-col border-t border-line-dark md:border-x md:border-t-0">
              <div className="flex items-center justify-between px-5 pt-5 text-xs text-mineral/70">
                <span>{t("hero.behindTheFinish")}</span>
                <Plus size={18} strokeWidth={1} aria-hidden="true" />
              </div>
              <div className="blueprint-grid relative h-80 overflow-hidden [--grid-color:var(--color-grid-dark)] md:h-auto md:min-h-80 md:flex-1">
                <BuildingSystemsDrawing />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-4 border-b border-line-dark px-5 py-4 text-[0.625rem] text-mineral/70">
                <span className="flex gap-5">
                  <span className="inline-flex items-center gap-2">
                    <i className="h-0.5 w-4 bg-copper-light" />
                    {t("hero.plumbing")}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <i className="h-0.5 w-4 bg-electric" />
                    {t("hero.electrical")}
                  </span>
                </span>
                <span>{t("hero.conceptIllustration")}</span>
              </figcaption>
              <div className="px-5 py-5">
                <p className="mb-2 text-sm font-medium">
                  {t("hero.buildingMore")}
                </p>
                <p className="text-xs leading-relaxed text-mineral/65">
                  {t("hero.lookCloser")}
                </p>
              </div>
            </figure>
          </div>
        </Container>
      </Section>

      <div className="bg-copper text-mineral">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center md:gap-8">
          <p className="text-sm font-semibold tracking-tight">
            {t("audience.heading")}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.6875rem] md:text-xs">
            {[
              t("audience.homeowners"),
              t("audience.architects"),
              t("audience.builders"),
            ].map((audience, index) => (
              <span
                key={audience}
                className={
                  index > 0 ? "border-l border-mineral/30 pl-5" : undefined
                }
              >
                {audience}
              </span>
            ))}
          </div>
        </Container>
      </div>

      <Section id="approach" aria-labelledby="approach-heading">
        <Container>
          <SectionRail label={t("approach.rail")}>
            <ArrowDownRight size={23} strokeWidth={1.5} aria-hidden="true" />
          </SectionRail>
          <div className="mt-8 grid gap-7 md:grid-cols-[1.05fr_1fr] md:gap-10 xl:gap-20">
            <Heading id="approach-heading" className="max-w-[13ch]">
              {t("approach.heading")}
            </Heading>
            <div className="max-w-lg">
              <p className="mb-5 text-lg leading-relaxed font-medium tracking-tight md:text-xl">
                {t("approach.lead")}
              </p>
              <BodyCopy className="text-muted">
                {t("approach.description")}
              </BodyCopy>
              <ActionLink
                href="/about"
                variant="text"
                className="mt-4"
                icon={<MoveRight size={19} aria-hidden="true" />}
              >
                {t("approach.link")}
              </ActionLink>
            </div>
          </div>
          <div className="mt-9 flex flex-col gap-3 border-y border-line py-5 text-xs font-medium md:mt-11 md:flex-row md:items-center md:justify-between md:gap-5">
            <span>{t("approach.planning")}</span>
            <Plus
              className="hidden text-copper md:block"
              size={16}
              aria-hidden="true"
            />
            <span>{t("approach.coordination")}</span>
            <Plus
              className="hidden text-copper md:block"
              size={16}
              aria-hidden="true"
            />
            <span>{t("approach.connections")}</span>
          </div>
        </Container>
      </Section>

      <Section tone="paper" id="services" aria-labelledby="services-heading">
        <Container>
          <SectionHeader
            id="services-heading"
            label={t("services.sectionLabel")}
            description={t("services.sectionDescription")}
          >
            {t("services.headingLine1")}
            <br />
            {t("services.headingLine2")}
          </SectionHeader>
          <div className="border-t-3 border-graphite">
            {services.map((service) => {
              const electrical = service.id === "electrical";
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className={cx(
                    "grid gap-7 border-b border-sage/30 py-7 md:gap-9 xl:gap-14",
                    electrical
                      ? "md:grid-cols-[1.1fr_0.9fr]"
                      : "md:grid-cols-[0.9fr_1.1fr]",
                  )}
                >
                  <figure
                    className={cx(
                      "blueprint-grid flex min-w-0 flex-col justify-between overflow-hidden border border-sage/25",
                      electrical
                        ? "bg-fog text-sage md:order-2"
                        : "bg-line/40 text-copper",
                    )}
                  >
                    <div className="flex items-center justify-between gap-5 px-5 pt-5 text-xs text-graphite">
                      <span>{service.diagramLabel}</span>
                      {electrical ? (
                        <Zap size={21} strokeWidth={1.4} aria-hidden="true" />
                      ) : (
                        <Droplets
                          size={21}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <ServiceDrawing service={service.id} />
                    <figcaption className="px-5 pb-5 text-[0.625rem] text-muted">
                      {t("services.conceptIllustration")}
                    </figcaption>
                  </figure>
                  <div
                    className={cx(
                      "min-w-0 self-center",
                      electrical && "md:order-1",
                    )}
                  >
                    <Heading as="h3" size="service" className="mb-5">
                      {service.title}
                    </Heading>
                    <BodyCopy className="max-w-lg text-muted">
                      {service.description}
                    </BodyCopy>
                    <ul className="mt-5 mb-4 divide-y divide-sage/20 border-b border-sage/20">
                      {service.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-center gap-3 py-2.5 text-xs"
                        >
                          <Plus
                            size={12}
                            className={electrical ? "text-sage" : "text-copper"}
                            aria-hidden="true"
                          />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    <ActionLink
                      className="w-full"
                      href="/contact"
                      variant="text"
                    >
                      {service.link}
                    </ActionLink>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="forest" id="process" aria-labelledby="process-heading">
        <Container>
          <SectionHeader
            id="process-heading"
            label={t("process.sectionLabel")}
            inverse
            description={t("process.sectionDescription")}
          >
            {t("process.headingLine1")}
            <br />
            {t("process.headingLine2")}
          </SectionHeader>
          <NumberedSteps steps={processSteps} inverse />
        </Container>
      </Section>

      <Section id="about" aria-labelledby="about-heading">
        <Container className="grid items-center gap-9 md:grid-cols-2 md:gap-12 xl:gap-20">
          <div
            className="relative flex h-76 min-w-0 flex-col overflow-hidden border border-line-dark bg-graphite text-mineral md:h-88"
            aria-hidden="true"
          >
            <div className="flex items-center justify-between border-b border-line-dark px-6 py-5 text-xs text-mineral/70">
              <span>{t("about.diagramLabel")}</span>
              <Plus size={18} strokeWidth={1} />
            </div>
            <div className="relative z-10 p-6 text-[clamp(4rem,19vw,7.25rem)] leading-tight font-extrabold tracking-[-0.075em] md:text-[clamp(4rem,8.2vw,7.25rem)]">
              {site.name}
              <span className="text-copper-light">.</span>
            </div>
            <svg
              className="absolute bottom-4 left-0 h-[45%] w-full text-copper-light/60"
              viewBox="0 0 560 250"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M-20 220h130V95h130V-20M110 220h200V95h270M-20 196h106V71h130V-20M86 196h200V71h294M-20 172h82V47h130V-20M62 172h200V47h318"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="110" cy="220" r="8" fill="currentColor" />
              <circle cx="310" cy="95" r="8" fill="currentColor" />
            </svg>
            <p className="absolute bottom-6 left-6 z-10 bg-graphite pr-3 text-xs text-mineral/75">
              {t("about.caption")}
            </p>
          </div>
          <div className="max-w-lg">
            <Eyebrow>{t("about.eyebrow")}</Eyebrow>
            <Heading id="about-heading" className="mt-5 mb-6">
              {t("about.heading")}
            </Heading>
            <BodyCopy className="mb-4 text-muted">
              {t("about.paragraph1")}
            </BodyCopy>
            <BodyCopy className="text-muted">{t("about.paragraph2")}</BodyCopy>
            <ActionLink className="mt-4" href="/about" variant="text">
              {t("about.link")}
            </ActionLink>
          </div>
        </Container>
      </Section>

      <ProjectInvitation
        id="contact"
        title={
          <>
            {t("invitation.titleLine1")}
            <br />
            {t("invitation.titleLine2")}
          </>
        }
        description={t("invitation.description")}
      />
    </>
  );
}
