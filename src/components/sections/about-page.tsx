import { ArrowDown, ArrowDownRight, Check, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container, Section } from "@/components/ui/layout";
import { NumberedSteps } from "@/components/ui/numbered-steps";
import { ScrollToSection } from "@/components/ui/page-controls";
import {
  BodyCopy,
  Eyebrow,
  Heading,
  SectionHeader,
  SectionRail,
} from "@/components/ui/typography";
import { founderExperienceYears } from "@/content/about";
import { ProjectInvitation } from "./project-invitation";

export function AboutPage() {
  const t = useTranslations("about");
  const chapters = [
    { title: t("chapters.0.title"), description: t("chapters.0.description") },
    { title: t("chapters.1.title"), description: t("chapters.1.description") },
    { title: t("chapters.2.title"), description: t("chapters.2.description") },
    { title: t("chapters.3.title"), description: t("chapters.3.description") },
    { title: t("chapters.4.title"), description: t("chapters.4.description") },
  ];
  const qualityQuestions = [
    t("qualityQuestions.0"),
    t("qualityQuestions.1"),
    t("qualityQuestions.2"),
    t("qualityQuestions.3"),
  ];
  const consultationPrinciples = [
    {
      title: t("consultationSteps.0.title"),
      description: t("consultationSteps.0.description"),
    },
    {
      title: t("consultationSteps.1.title"),
      description: t("consultationSteps.1.description"),
    },
    {
      title: t("consultationSteps.2.title"),
      description: t("consultationSteps.2.description"),
    },
    {
      title: t("consultationSteps.3.title"),
      description: t("consultationSteps.3.description"),
    },
  ];

  return (
    <>
      <Section spacing="none" aria-labelledby="about-page-heading">
        <Container>
          <Breadcrumb currentPage={t("pageTitle")} />
          <div className="grid items-center gap-8 pt-8 pb-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:py-12 xl:gap-20">
            <Heading
              as="h1"
              size="page"
              id="about-page-heading"
              className="max-w-[13ch] lg:max-w-[11ch]"
            >
              {t("heroHeading")}
            </Heading>
            <div className="max-w-xl">
              <Eyebrow className="mb-5 text-sage">{t("eyebrow")}</Eyebrow>
              <p className="mb-5 text-2xl leading-snug font-medium tracking-tight">
                {t("lead")}
              </p>
              <BodyCopy className="text-muted">
                {t("intro", { years: founderExperienceYears })}
              </BodyCopy>
              <ScrollToSection className="mt-4" targetId="journey-heading">
                {t("storyLink")}
                <ArrowDown size={18} aria-hidden="true" />
              </ScrollToSection>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 border-t border-line py-5 text-xs text-muted md:flex-row md:gap-7">
            <span>{t("businessType")}</span>
            <span>{t("values")}</span>
          </div>
        </Container>
      </Section>

      <Section tone="graphite" id="our-story" aria-labelledby="journey-heading">
        <Container className="grid items-start gap-9 md:grid-cols-[0.8fr_1.2fr] md:gap-10 xl:gap-24">
          <div className="md:sticky md:top-28">
            <Eyebrow className="text-copper-light">{t("storyEyebrow")}</Eyebrow>
            <Heading
              id="journey-heading"
              tabIndex={-1}
              className="my-6 max-w-[14ch] md:max-w-[11ch]"
            >
              {t("storyHeading")}
            </Heading>
            <BodyCopy className="max-w-[40ch] text-mineral/70">
              {t("storyDescription")}
            </BodyCopy>
            <div className="mt-8 flex items-center gap-6 border-t border-line-dark pt-6 md:mt-10 md:block md:pt-7">
              <span className="flex shrink-0 items-baseline gap-3 text-6xl leading-none font-semibold tracking-[-0.06em] text-copper-light">
                {founderExperienceYears}
                <span className="text-xl font-medium tracking-tight">
                  {t("years")}
                </span>
              </span>
              <p className="text-xs leading-relaxed text-mineral/70 md:mt-4">
                {t("founderExperience")}
                <br />
                {t("foundation")}
              </p>
            </div>
            <ArrowDownRight
              className="mt-8 hidden text-electric/60 md:block"
              size={52}
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
          <ol>
            {chapters.map((chapter, index) => (
              <li
                key={chapter.title}
                className="grid grid-cols-[1.5rem_1fr] gap-4 border-t border-line-dark py-7 last:pb-0 xl:grid-cols-[2.25rem_1fr] xl:gap-6"
              >
                <span
                  className="pt-1 text-xs text-copper-light"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-4 text-xl leading-snug font-semibold tracking-tight xl:text-2xl">
                    {chapter.title}
                  </h3>
                  <BodyCopy className="max-w-[62ch] text-mineral/75">
                    {chapter.description}
                  </BodyCopy>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="quality-heading">
        <Container>
          <SectionRail label={t("qualityRail")}>
            <Plus size={21} strokeWidth={1.3} aria-hidden="true" />
          </SectionRail>
          <div className="my-8 grid gap-7 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-12 xl:gap-20">
            <Heading id="quality-heading" className="max-w-[17ch]">
              {t("qualityHeading")}
            </Heading>
            <BodyCopy className="max-w-lg text-muted">
              {t("qualityIntro")}
            </BodyCopy>
          </div>
          <div className="grid md:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col items-start bg-line/50 p-7 lg:p-9">
              <Eyebrow className="text-sage">{t("firstQuestion")}</Eyebrow>
              <h3 className="mt-6 mb-5 text-4xl leading-tight font-semibold tracking-tight">
                {t("doesItWork")}
              </h3>
              <BodyCopy className="max-w-[34ch] text-muted">
                {t("simpleResult")}
              </BodyCopy>
              <ArrowDownRight
                className="mt-7 text-sage md:mt-auto"
                size={41}
                strokeWidth={1.2}
                aria-hidden="true"
              />
            </div>
            <div className="bg-forest p-7 text-mineral lg:p-9">
              <Eyebrow className="text-copper-light">
                {t("questionsEyebrow")}
              </Eyebrow>
              <h3 className="mt-6 mb-7 max-w-[20ch] text-3xl leading-tight font-semibold tracking-tight lg:text-4xl">
                {t("consideredQuestion")}
              </h3>
              <ul className="space-y-4">
                {qualityQuestions.map((question) => (
                  <li
                    key={question}
                    className="flex items-start gap-3 text-sm leading-relaxed text-mineral/80"
                  >
                    <Check
                      className="mt-0.5 text-copper-light"
                      size={17}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <BodyCopy className="mt-7 max-w-[80ch] text-muted">
            {t("qualityTradeoffs")}
          </BodyCopy>
        </Container>
      </Section>

      <Section tone="fog" aria-labelledby="consultation-heading">
        <Container>
          <SectionHeader
            id="consultation-heading"
            label={t("consultationLabel")}
            description={t("consultationDescription")}
          >
            {t("consultationHeadingLine1")}
            <br />
            {t("consultationHeadingLine2")}
          </SectionHeader>
          <NumberedSteps steps={consultationPrinciples} />
        </Container>
      </Section>

      <Section tone="sage" aria-labelledby="vision-heading">
        <Container className="grid items-start gap-6 lg:grid-cols-[0.45fr_1.55fr] lg:gap-12">
          <Eyebrow className="lg:pt-2">{t("visionEyebrow")}</Eyebrow>
          <div>
            <Heading id="vision-heading" className="max-w-[22ch]">
              {t("visionHeading")}
            </Heading>
            <div className="mt-8 grid gap-5 text-mineral/90 md:grid-cols-2 md:gap-9">
              <BodyCopy>{t("visionParagraph1")}</BodyCopy>
              <BodyCopy>{t("visionParagraph2")}</BodyCopy>
            </div>
          </div>
        </Container>
      </Section>

      <ProjectInvitation
        id="about-invitation"
        title={t("invitationTitle")}
        description={t("invitationDescription")}
      />
    </>
  );
}
