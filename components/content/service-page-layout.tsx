import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { DotGridBackground } from "@/components/layout/dot-grid-background";
import { ProcessStep } from "./process-step";
import { FAQAccordion } from "./faq-accordion";
import { CTASection } from "./cta-section";
import { CheckIcon, SparkleIcon } from "@/components/ui/icons";
import { IndustryCard } from "./industry-card";
import { getIndustryCategories } from "@/lib/queries/industries";
import type { Service, ProcessStep as ProcessStepType, Faq } from "@/lib/types/content";

// Splits on \n or \r\n — DB values pasted through the Supabase SQL editor
// sometimes carry Windows line endings.
function splitLines(value: string | null): string[] {
  return value?.split(/\r?\n/).filter(Boolean) ?? [];
}

// Card content is "Title: description" (see supabase/migrations/0004) —
// split on the first colon only, description is optional.
function splitFeature(line: string): { title: string; description: string | null } {
  const idx = line.indexOf(":");
  if (idx === -1) return { title: line, description: null };
  return { title: line.slice(0, idx).trim(), description: line.slice(idx + 1).trim() };
}

// Shared template for both service pages — section order per
// docs/06-wireframe-spec.md ("Service page (Automation / Advertisement)
// section order"), rebuilt as card-based layouts with a supporting
// illustration per the business owner's request (2026-09-27) rather than
// plain paragraph/checklist text. All content sections degrade
// gracefully when empty (e.g. before seed data is run).
export async function ServicePageLayout({
  service,
  processSteps,
  faqs,
  platforms,
  graphic,
  ctaHeadline,
  ctaSubhead,
}: {
  service: Service;
  processSteps: ProcessStepType[];
  faqs: Faq[];
  platforms: string[];
  graphic: ReactNode;
  ctaHeadline: string;
  ctaSubhead: string;
}) {
  const whatsIncluded = splitLines(service.whats_included);
  const whyItWorks = splitLines(service.why_it_works);
  const industries = await getIndustryCategories();

  return (
    <main id="main-content" className="flex-1">
      {/* Problem statement merged into the hero itself (business owner
          request, 2026-09-27) — no separate "The problem this solves"
          section anymore. Image column widened (lg:1.15fr vs 1fr) and
          given a fixed aspect box so it reads as a real visual anchor,
          not a small afterthought — same treatment on the homepage hero. */}
      <Section className="relative overflow-hidden pt-20">
        <DotGridBackground />
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
              {service.name}
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl">{service.tagline ?? service.name}</h1>
            {service.one_line_value_prop && (
              <p className="mt-4 max-w-xl text-lg text-[var(--color-muted-foreground)]">
                {service.one_line_value_prop}
              </p>
            )}
            {service.problem_statement && (
              <div className="mt-6 flex max-w-xl flex-col gap-4 text-[var(--color-muted-foreground)]">
                {service.problem_statement.split(/\r?\n\r?\n/).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
          <div className="relative hidden aspect-square overflow-hidden rounded-2xl border border-[var(--color-border)] lg:block">
            {graphic}
          </div>
        </Container>
      </Section>

      {processSteps.length > 0 && (
        <Section>
          <Container>
            <h2 className="text-2xl md:text-3xl">How We Do It</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <ProcessStep key={step.id} step={step} variant="compact" />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {whatsIncluded.length > 0 && (
        <Section className="bg-[var(--color-muted)]">
          <Container>
            <h2 className="text-2xl md:text-3xl">What&rsquo;s Included</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {whatsIncluded.map((line) => {
                const { title, description } = splitFeature(line);
                return (
                  <div
                    key={line}
                    className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 transition-colors hover:border-[var(--color-accent)]/40"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold">{title}</h3>
                    {description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                        {description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {platforms.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
                  Built with:
                </span>
                {platforms.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1 text-sm font-medium"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}
          </Container>
        </Section>
      )}

      {whyItWorks.length > 0 && (
        <Section>
          <Container>
            <h2 className="text-2xl md:text-3xl">Why It Works</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {whyItWorks.map((line) => (
                <div
                  key={line}
                  className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 transition-colors hover:border-[var(--color-accent)]/40"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <SparkleIcon className="h-5 w-5" />
                  </div>
                  <p className="pt-1.5 font-medium">{line}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {industries.length > 0 && (
        <Section className="bg-[var(--color-muted)]">
          <Container>
            <h2 className="text-2xl md:text-3xl">Who This Is For</h2>
            <p className="mt-3 max-w-xl text-[var(--color-muted-foreground)]">
              If your revenue depends on turning enquiries into booked calls, this is for you.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <IndustryCard key={industry.id} industry={industry} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section>
          <Container>
            <h2 className="text-2xl md:text-3xl">Frequently Asked Questions</h2>
            <div className="mt-8">
              <FAQAccordion faqs={faqs} />
            </div>
          </Container>
        </Section>
      )}

      <CTASection headline={ctaHeadline} subhead={ctaSubhead} />
    </main>
  );
}
