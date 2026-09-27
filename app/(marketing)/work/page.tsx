import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { DotGridBackground } from "@/components/layout/dot-grid-background";
import { IndustryCard } from "@/components/content/industry-card";
import { CTASection } from "@/components/content/cta-section";
import { getIndustryCategories } from "@/lib/queries/industries";
import { getTestimonialsByIndustryIds } from "@/lib/queries/testimonials";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Ongoing client work across healthcare, recruitment, retail, home services, and B2B agencies. CRM automation, lead nurture, and retargeting campaigns.",
  path: "/work",
});

// Per docs/01-project-brief.md's real client-work industries and the
// privacy note: no client names or logos without explicit permission —
// see TestimonialCard's enforced gate.
export default async function WorkPage() {
  const industries = await getIndustryCategories();
  const testimonialsByIndustry = await getTestimonialsByIndustryIds(industries.map((i) => i.id));
  const industriesWithTestimonials = industries.map((industry) => ({
    industry,
    testimonial: testimonialsByIndustry.get(industry.id) ?? null,
  }));

  return (
    <main id="main-content" className="flex-1">
      <Section className="relative overflow-hidden pt-20">
        <DotGridBackground />
        <Container>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
            Work
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl md:text-5xl">Who We Work With</h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted-foreground)]">
            Ongoing client work across healthcare, recruitment, retail, home services, and B2B
            agencies. CRM automation, lead nurture campaigns, and retargeting and re-engagement
            campaigns. We don&rsquo;t name clients without their explicit permission, so proof of
            work here is organized by industry rather than logo wall.
          </p>
        </Container>
      </Section>

      {industriesWithTestimonials.length > 0 && (
        <Section>
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industriesWithTestimonials.map(({ industry, testimonial }) => (
                <IndustryCard key={industry.id} industry={industry} testimonial={testimonial} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTASection
        headline="Think Your Industry Fits This System?"
        subhead="Book a strategy call and we'll tell you honestly whether it's a fit."
      />
    </main>
  );
}
