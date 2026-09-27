import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { DotGridBackground } from "@/components/layout/dot-grid-background";
import { ButtonLink } from "@/components/ui/button";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { ServiceCard } from "@/components/content/service-card";
import { ProcessStep } from "@/components/content/process-step";
import { IndustryCard } from "@/components/content/industry-card";
import { LeadForm } from "@/components/content/lead-form";
import { SITE } from "@/lib/constants/site";
import { getHomeServices } from "@/lib/queries/services";
import { getHomeProcessSteps } from "@/lib/queries/process-steps";
import { getIndustryCategories } from "@/lib/queries/industries";
import { getTestimonialsByIndustryIds } from "@/lib/queries/testimonials";
import { getSiteSettings } from "@/lib/queries/site-settings";
import { pageMetadata, SITE_NAME } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: SITE_NAME,
  description:
    "Targetologist helps operators turn scattered lead generation, manual follow-ups, and disconnected tools into a structured system that produces consistent client acquisition.",
  path: "/",
  isHome: true,
});

// Real platforms confirmed with the business owner during Phase 1 — plain
// text, not fabricated logo marks we don't have rights to use.
const PLATFORMS = ["Meta", "Google", "LinkedIn", "GoHighLevel", "Zapier", "Skylead"];

// Plain list, not a comparison layout of any kind (business owner was
// explicit: no "us vs. them" style section in any form, 2026-09-27).
const PROBLEMS = [
  "Leads arrive from multiple sources and land in different places",
  "Follow-up depends on someone remembering to do it",
  "The CRM is only half set up, so nobody trusts it",
  "Ad spend goes up, but booked calls don't",
];

// Copied directly from the reference landing page per explicit business
// owner instruction (2026-09-27) — the one exception to "reword, don't
// copy" elsewhere on this site.
const ENGAGEMENT_STEPS = [
  {
    number: "01",
    title: "Book a Free Strategy Call",
    description:
      "In 30 minutes we look at where your leads come from, how they're followed up and where they're being lost.",
  },
  {
    number: "02",
    title: "We Build Your System",
    description:
      "Campaigns, CRM pipeline, nurture sequences and booking, set up and connected so nothing falls through.",
  },
  {
    number: "03",
    title: "You Get a Consistent Pipeline",
    description:
      "Leads are captured, followed up and booked automatically, while we keep managing and improving performance.",
  },
];

// Real differentiators adapted from the live About page's "Key
// Differentiators", not fabricated, not borrowed from a reference site.
// Page copy, not a Supabase-backed entity, so kept as a local constant.
const DIFFERENTIATORS = [
  {
    title: "Built for B2B service businesses",
    description:
      "Systems designed specifically for B2B service companies, not a repurposed e-commerce playbook.",
  },
  {
    title: "One partner, not two vendors",
    description: "Advertisement and Automation work as a unified partnership, not disconnected hires.",
  },
  {
    title: "Reporting you can actually read",
    description: "Clear performance reporting, not vanity metrics dressed up as results.",
  },
  {
    title: "Fits your existing workflow",
    description: "Integrates with the sales process and tools your team already uses.",
  },
];

export default async function Home() {
  const [services, processSteps, industries, settings] = await Promise.all([
    getHomeServices(),
    getHomeProcessSteps(),
    getIndustryCategories(),
    getSiteSettings(),
  ]);

  const testimonialsByIndustry = await getTestimonialsByIndustryIds(industries.map((i) => i.id));
  const industriesWithTestimonials = industries.map((industry) => ({
    industry,
    testimonial: testimonialsByIndustry.get(industry.id) ?? null,
  }));

  return (
    <main id="main-content" className="flex-1">
      <Section className="relative overflow-hidden pb-8 pt-20 md:pb-12">
        <DotGridBackground />
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
              The Targetologist
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl">{SITE.tagline}</h1>
            <p className="mt-6 max-w-xl text-lg text-[var(--color-muted-foreground)]">
              Targetologist helps operators turn scattered lead generation, manual follow-ups, and
              disconnected tools into a structured system that produces consistent client
              acquisition.
            </p>
            <p className="mt-2 max-w-xl text-lg font-medium">
              No hacks. No random outreach. Just systems that convert conversations into revenue.
            </p>
            <div className="mt-8">
              <ButtonLink href={settings.calendlyUrl} target="_blank" rel="noopener noreferrer" size="lg">
                Book a Strategy Call
              </ButtonLink>
            </div>
          </div>
          <div className="relative hidden aspect-square overflow-hidden rounded-2xl border border-[var(--color-border)] lg:block">
            <Image
              src="/hero-photo.jpg"
              alt="An analytics dashboard showing lead and traffic trends"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </Section>

      <Section className="py-8 md:py-10">
        <Container>
          <p className="text-center text-xs font-medium uppercase tracking-wide text-[var(--color-muted-foreground)]">
            Platforms and Tools We Work With
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {PLATFORMS.map((name) => (
              <span
                key={name}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-1.5 text-sm font-semibold text-[var(--color-muted-foreground)]"
              >
                {name}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--color-muted)]">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
            The Real Problem
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl">
            Most Businesses Don&rsquo;t Have a Lead Problem. They Have a System Problem.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PROBLEMS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-5"
              >
                <span aria-hidden className="text-[var(--color-accent)]">
                  →
                </span>
                {item}
              </div>
            ))}
          </div>
          <p className="mt-8 text-lg font-medium">
            The result? Lost opportunities and unpredictable revenue.
          </p>
        </Container>
      </Section>

      {services.length > 0 && (
        <Section>
          <Container>
            <h2 className="text-3xl md:text-4xl">Our Core Services</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i + 1} />
              ))}
            </div>

            {/* Real partner card from the live site's "Our Partners"
                section, rebuilt per the business owner's review. */}
            <div className="mt-12 border-t border-[var(--color-border)] pt-10">
              <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-muted-foreground)]">
                Our Partners
              </p>
              <div className="mt-4 flex flex-col items-start gap-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="/skylead-logo.svg"
                    alt="Skylead"
                    width={72}
                    height={60}
                    className="h-12 w-auto sm:h-14"
                  />
                  <div>
                    <p className="font-heading text-lg font-semibold">{SITE.skylead.label}</p>
                    <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                      {SITE.skylead.description}
                    </p>
                  </div>
                </div>
                <ButtonLink
                  href={SITE.skylead.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="shrink-0"
                >
                  Try {SITE.skylead.label}
                  <ExternalLinkIcon className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {processSteps.length > 0 && (
        <Section className="bg-[var(--color-muted)]">
          <Container>
            <h2 className="text-3xl md:text-4xl">How Your Revenue System Works</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <ProcessStep key={step.id} step={step} />
              ))}
            </div>
            <p className="mt-10 text-sm font-medium text-[var(--color-muted-foreground)]">
              Every step is connected. Nothing is lost.
            </p>
          </Container>
        </Section>
      )}

      {industries.length > 0 && (
        <Section>
          <Container>
            <h2 className="text-3xl md:text-4xl">Who We Work With</h2>
            <p className="mt-3 max-w-xl text-[var(--color-muted-foreground)]">
              Ongoing client work across the following industries.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industriesWithTestimonials.map(({ industry, testimonial }) => (
                <IndustryCard key={industry.id} industry={industry} testimonial={testimonial} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="bg-[var(--color-muted)]">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
            How It Works
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl">Three Steps to a Pipeline That Runs Itself</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {ENGAGEMENT_STEPS.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6"
              >
                <span className="text-4xl font-bold text-[var(--color-accent)]">{step.number}</span>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-3xl md:text-4xl">Why The Targetologist</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6"
              >
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-2 text-[var(--color-muted-foreground)]">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--color-muted)]">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
              Free Strategy Call
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl">Build a System That Actually Works</h2>
            <p className="mt-4 max-w-md text-[var(--color-muted-foreground)]">
              Tell us about your business. In 30 minutes on a call, we&rsquo;ll map out where your
              leads are being lost and what to fix first.
            </p>
            <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-5">
              <ul className="flex flex-col gap-3">
                {[
                  "A review of your lead sources, follow-up, and ad spend",
                  "The gaps costing you booked calls",
                  "A clear outline of the system we'd build",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1 text-[var(--color-accent)]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-sm text-[var(--color-muted-foreground)]">
              No obligation and no hard sell.
            </p>
          </div>
          <LeadForm />
        </Container>
      </Section>
    </main>
  );
}
