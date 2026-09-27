import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { DotGridBackground } from "@/components/layout/dot-grid-background";
import { pageMetadata } from "@/lib/seo";

// Real legal text carried forward verbatim from thetargetologist.com
// (pulled 2026-09-23), per docs/12-seo-and-url-strategy.md — not
// regenerated.
export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "The terms that apply when you access thetargetologist.com or work with Targetologist.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <main id="main-content" className="relative overflow-hidden flex-1 py-16 md:py-24">
      <DotGridBackground />
      <Container className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl">Terms &amp; Conditions</h1>
        <p className="mt-6 text-[var(--color-muted-foreground)]">
          By accessing this website or working with Targetologist, you agree to the following
          terms.
        </p>

        <h2 className="mt-10 text-xl">Eligibility and Age Requirement</h2>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          You must be at least 18 years of age to enroll in, use, or consent to receive messages
          through targetologist&rsquo;s text messaging program. By providing your mobile phone
          number and opting in to receive text messages from us, you represent and warrant that
          you are 18 years of age or older, that the mobile number you have provided belongs to
          you or that you are the authorized account holder or user of that number, and that you
          have the authority to consent to receive messages at that number and to incur any
          message or data charges your carrier may apply.
        </p>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Our text messaging program is not directed to, and we do not knowingly collect mobile
          numbers or other personal information from, individuals under 18 years of age. If we
          learn that we have collected a mobile number from someone under 18, we will delete that
          number and any associated information from our messaging systems and remove the number
          from future messaging. If you believe a minor has provided us with a mobile number,
          please contact us at{" "}
          <a href="mailto:contact@thetargetologist.com" className="text-[var(--color-accent)]">
            contact@thetargetologist.com
          </a>{" "}
          and we will remove it promptly.
        </p>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          We reserve the right to terminate or refuse messaging service to any person who does not
          meet these eligibility requirements, and to request verification of age or authorization
          to use a mobile number at any time.
        </p>
      </Container>
    </main>
  );
}
