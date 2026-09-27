import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/queries/site-settings";

// Reusable but with page-specific headline copy — see
// docs/08-component-system.md. Fetches its own Calendly link so every
// instance (homepage, both service pages) stays in sync with
// admin-managed site settings rather than a hardcoded constant.
export async function CTASection({
  headline,
  subhead,
  className = "",
}: {
  headline: string;
  subhead?: string;
  className?: string;
}) {
  const { calendlyUrl } = await getSiteSettings();

  return (
    <section className={`bg-[var(--color-primary)] py-16 md:py-24 ${className}`}>
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl text-[var(--color-primary-foreground)] md:text-3xl">{headline}</h2>
          {subhead && (
            <p className="mt-2 max-w-xl text-[var(--color-primary-foreground)]/80">{subhead}</p>
          )}
        </div>
        <ButtonLink href={calendlyUrl} target="_blank" rel="noopener noreferrer" size="lg">
          Book a Strategy Call
        </ButtonLink>
      </Container>
    </section>
  );
}
