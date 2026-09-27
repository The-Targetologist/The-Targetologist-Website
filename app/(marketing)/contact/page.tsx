import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { DotGridBackground } from "@/components/layout/dot-grid-background";
import { PhoneIcon, MailIcon, MapPinIcon } from "@/components/ui/icons";
import { LeadForm } from "@/components/content/lead-form";
import { CTASection } from "@/components/content/cta-section";
import { getSiteSettings } from "@/lib/queries/site-settings";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Have a question or ready to build your revenue system? Get in touch.",
  path: "/contact",
});

// GHL iframe embed replaced with a native form (business owner request,
// 2026-09-27) — see lib/actions/submit-inquiry.ts and
// components/content/lead-form.tsx.
export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <main id="main-content" className="flex-1">
      <Section className="relative overflow-hidden pt-20">
        <DotGridBackground />
        <Container>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
            Contact
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted-foreground)]">
            Have a question or ready to build your revenue system? Fill out the form below and
            we&rsquo;ll get back to you.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href={`mailto:${settings.contactEmail}`}
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-5 text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)]"
            >
              <MailIcon className="h-5 w-5 shrink-0" />
              {settings.contactEmail}
            </a>
            <a
              href={`tel:${settings.contactPhone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-5 text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)]"
            >
              <PhoneIcon className="h-5 w-5 shrink-0" />
              {settings.contactPhone}
            </a>
            <div className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-5 text-[var(--color-muted-foreground)]">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                {settings.addressLine1}, {settings.addressCity}, {settings.addressState}{" "}
                {settings.addressZip} {settings.addressCountry}
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--color-muted)]">
        <Container className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl">Send Us a Message</h2>
          <p className="mt-3 text-[var(--color-muted-foreground)]">
            Tell us a bit about your business and what you&rsquo;re looking to fix. We&rsquo;ll
            follow up personally.
          </p>
          <div className="mt-8">
            <LeadForm />
          </div>
        </Container>
      </Section>

      <CTASection
        headline="Prefer to Talk It Through Live?"
        subhead="Skip the form and book a strategy call directly."
      />
    </main>
  );
}
