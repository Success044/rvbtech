import { ArrowDown, ArrowDownRight, Check, Plus } from "lucide-react";
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
import {
  consultationPrinciples,
  founderExperienceYears,
  qualityQuestions,
  storyChapters,
} from "@/content/about";
import { ProjectInvitation } from "./project-invitation";

export function AboutPage() {
  return (
    <>
      <Section spacing="none" aria-labelledby="about-page-heading">
        <Container>
          <Breadcrumb currentPage="About" />
          <div className="grid items-center gap-8 pt-8 pb-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:py-12 xl:gap-20">
            <Heading
              as="h1"
              size="page"
              id="about-page-heading"
              className="max-w-[13ch] lg:max-w-[11ch]"
            >
              A company you can come back to.
            </Heading>
            <div className="max-w-xl">
              <Eyebrow className="mb-5 text-sage">About rvbtech</Eyebrow>
              <p className="mb-5 text-2xl leading-snug font-medium tracking-tight">
                Good work should come with clear advice and someone to turn to
                afterwards.
              </p>
              <BodyCopy className="text-muted">
                We’re a plumbing and electrical contracting company in Nepal,
                shaped by our founder’s {founderExperienceYears} years of
                hands-on field experience and a desire for a more thoughtful way
                of working.
              </BodyCopy>
              <ScrollToSection className="mt-4" targetId="journey-heading">
                The story behind the company
                <ArrowDown size={18} aria-hidden="true" />
              </ScrollToSection>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 border-t border-line py-5 text-xs text-muted md:flex-row md:gap-7">
            <span>Plumbing & electrical contracting</span>
            <span>Experience. Understanding. Responsibility.</span>
          </div>
        </Container>
      </Section>

      <Section tone="graphite" id="our-story" aria-labelledby="journey-heading">
        <Container className="grid items-start gap-9 md:grid-cols-[0.8fr_1.2fr] md:gap-10 xl:gap-24">
          <div className="md:sticky md:top-28">
            <Eyebrow className="text-copper-light">
              The story behind the work
            </Eyebrow>
            <Heading
              id="journey-heading"
              tabIndex={-1}
              className="my-6 max-w-[14ch] md:max-w-[11ch]"
            >
              From experience to purpose.
            </Heading>
            <BodyCopy className="max-w-[40ch] text-mineral/70">
              The idea for rvbtech grew from lessons in the field: the work
              itself, the conversations around it, and what happens after
              handover.
            </BodyCopy>
            <div className="mt-8 flex items-center gap-6 border-t border-line-dark pt-6 md:mt-10 md:block md:pt-7">
              <span className="flex shrink-0 items-baseline gap-3 text-6xl leading-none font-semibold tracking-[-0.06em] text-copper-light">
                {founderExperienceYears}
                <span className="text-xl font-medium tracking-tight">
                  years
                </span>
              </span>
              <p className="text-xs leading-relaxed text-mineral/70 md:mt-4">
                Our founder’s hands-on field experience.
                <br />
                The foundation of our approach.
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
            {storyChapters.map((chapter, index) => (
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
          <SectionRail label="What quality means to us">
            <Plus size={21} strokeWidth={1.3} aria-hidden="true" />
          </SectionRail>
          <div className="my-8 grid gap-7 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-12 xl:gap-20">
            <Heading id="quality-heading" className="max-w-[17ch]">
              A working connection is only the beginning.
            </Heading>
            <BodyCopy className="max-w-lg text-muted">
              Material selection, space, layout, workmanship, and access for
              maintenance all shape an installation. We believe clients deserve
              to understand those decisions.
            </BodyCopy>
          </div>
          <div className="grid md:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col items-start bg-line/50 p-7 lg:p-9">
              <Eyebrow className="text-sage">The first question</Eyebrow>
              <h3 className="mt-6 mb-5 text-4xl leading-tight font-semibold tracking-tight">
                Does it work?
              </h3>
              <BodyCopy className="max-w-[34ch] text-muted">
                The tap runs. The light turns on. The immediate need is met.
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
                The questions behind it
              </Eyebrow>
              <h3 className="mt-6 mb-7 max-w-[20ch] text-3xl leading-tight font-semibold tracking-tight lg:text-4xl">
                Has it been thought through?
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
            Price alone does not explain quality. A suitable solution depends on
            the space, scope, materials, and work involved. Clear advice helps
            clients understand the trade-offs and decide what matters for their
            project.
          </BodyCopy>
        </Container>
      </Section>

      <Section tone="fog" aria-labelledby="consultation-heading">
        <Container>
          <SectionHeader
            id="consultation-heading"
            label="Good work begins before installation"
            description="Understanding the work together, before it becomes part of the building."
          >
            Clear plans.
            <br />
            Clear expectations.
          </SectionHeader>
          <NumberedSteps steps={consultationPrinciples} />
        </Container>
      </Section>

      <Section tone="sage" aria-labelledby="vision-heading">
        <Container className="grid items-start gap-6 lg:grid-cols-[0.45fr_1.55fr] lg:gap-12">
          <Eyebrow className="lg:pt-2">The longer view</Eyebrow>
          <div>
            <Heading id="vision-heading" className="max-w-[22ch]">
              Raising expectations for the work behind the walls.
            </Heading>
            <div className="mt-8 grid gap-5 text-mineral/90 md:grid-cols-2 md:gap-9">
              <BodyCopy>
                We want to help people value the advice, planning, and
                craftsmanship that make a difference long before a room is
                finished.
              </BodyCopy>
              <BodyCopy>
                Our aim is to build a company known for explaining its
                recommendations, taking care with the work, and giving clients a
                clear understanding of what comes next. That is the
                responsibility we want rvbtech to stand for.
              </BodyCopy>
            </div>
          </div>
        </Container>
      </Section>

      <ProjectInvitation
        id="about-invitation"
        title="Let’s plan it right."
        description="A new home, a renovation, or a space that needs a better solution. Start with the questions that matter to your project."
      />
    </>
  );
}
