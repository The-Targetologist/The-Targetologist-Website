import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { DotGridBackground } from "@/components/layout/dot-grid-background";
import { ServiceCard } from "@/components/content/service-card";
import { CTASection } from "@/components/content/cta-section";
import { getHomeServices } from "@/lib/queries/services";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "The Targetologist is a growth partner for B2B service businesses, pairing targeted advertisement with automation to build a structured revenue system.",
  path: "/about",
});

// Recent Work — structural idea from the reference landing page (business
// owner request, 2026-09-27), reworded and scoped to only the industries
// already confirmed as real ongoing client work (docs/01-project-brief.md)
// and the confirmed real tool list. No client names, no invented numbers.
const RECENT_WORK = [
  {
    industry: "Healthcare & Medical Services",
    title: "Lead Automation for a Medical Services Provider",
    description:
      "CRM setup and automated nurture sequences to catch every patient enquiry, with a retargeting campaign for a specific service line.",
    tags: ["GoHighLevel", "Zapier", "Nurture"],
  },
  {
    industry: "Recruitment & Staffing",
    title: "Full Pipeline System for a Staffing Agency",
    description:
      "GoHighLevel automations feeding a segmented outreach workflow, plus ongoing performance reporting for the team.",
    tags: ["GoHighLevel", "Zapier", "Reporting"],
  },
  {
    industry: "Apparel & Retail",
    title: "Win-Back Campaigns for a Retail Network",
    description:
      "Segmented email and SMS win-back sequences to re-engage lapsed customers, run as both a seasonal push and an ongoing program.",
    tags: ["GoHighLevel", "Email and SMS"],
  },
  {
    industry: "B2B Agencies",
    title: "Ads and Automation for a B2B Service Group",
    description:
      "Paid campaigns and CRM automation covering lead capture and follow-up across multiple service lines.",
    tags: ["Paid Ads", "GoHighLevel"],
  },
];

// Company-level framing, not an individual founder bio — no founder name
// is confirmed for public use yet (business owner's call, 2026-09-23).
// Copy adapted from the real live About page, not fabricated.
export default async function AboutPage() {
  const services = await getHomeServices();

  return (
    <main id="main-content" className="flex-1">
      {/* No hero photo on this page (business owner's call — no founder photo
          confirmed yet), so the text takes the full container width via a
          two-column split instead of a single narrow max-w column, which
          otherwise leaves the right half of the row empty on large screens. */}
      <Section className="relative overflow-hidden pt-20">
        <DotGridBackground />
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
              About
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl">Who We Are</h1>
          </div>
          <div>
            <p className="text-lg text-[var(--color-muted-foreground)]">
              The Targetologist is a growth partner for B2B service businesses. We pair targeted
              advertisement with automation to turn scattered lead generation and manual
              follow-ups into a structured system, not a grab-bag of tactics.
            </p>
            <p className="mt-4 text-[var(--color-muted-foreground)]">
              Most agencies sell tactics: a few ads here, a CRM cleanup there. We build systems
              instead. Advertisement and Automation work together as one partnership, not two
              disconnected vendors.
            </p>
            <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-5">
              <p className="text-lg font-medium">
                No hacks. No random outreach. Just systems that convert conversations into
                revenue.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {services.length > 0 && (
        <Section className="bg-[var(--color-muted)]">
          <Container>
            <h2 className="text-2xl md:text-3xl">How We Work</h2>
            <p className="mt-3 max-w-xl text-[var(--color-muted-foreground)]">
              Two disciplines, one system. See how each one works in practice.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i + 1} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
            Recent Work
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl">Systems We&rsquo;ve Built for Businesses Like Yours</h2>
          <p className="mt-3 max-w-xl text-[var(--color-muted-foreground)]">
            Every business comes to us with a different problem. Here&rsquo;s a look at the kind
            of work we do, by industry, not by name.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {RECENT_WORK.map((project) => (
              <div
                key={project.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">
                  {project.industry}
                </p>
                <h3 className="mt-2 text-lg">{project.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-muted)] px-3 py-1 text-xs font-medium text-[var(--color-muted-foreground)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        headline="Want to See How a System Like This Works for You?"
        subhead="Book a strategy call and we'll walk through what it would look like for your business."
      />
    </main>
  );
}
