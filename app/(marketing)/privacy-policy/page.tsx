import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { DotGridBackground } from "@/components/layout/dot-grid-background";
import { pageMetadata } from "@/lib/seo";

// Real legal text carried forward verbatim from thetargetologist.com
// (pulled 2026-09-23), per docs/12-seo-and-url-strategy.md — not
// regenerated. Last updated on the live site: August 12, 2026.
export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How The Targetologist collects, uses, and protects your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="relative overflow-hidden flex-1 py-16 md:py-24">
      <DotGridBackground />
      <Container className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl">Privacy Policy</h1>
        <p className="mt-6 text-[var(--color-muted-foreground)]">
          At Targetologist, your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you visit our website or use our
          services.
        </p>

        <h2 className="mt-10 text-xl">SMS / Text Messaging Privacy</h2>

        <h3 className="mt-6 text-lg">Information We Collect</h3>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          When you opt in to receive text messages from targetologist, we collect your mobile
          phone number, your name (if provided), the date and time of your consent, the method by
          which consent was given (such as a web form, in-store signup, or text keyword), and a
          record of messages sent to and received from you.
        </p>

        <h3 className="mt-6 text-lg">How We Use It</h3>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          We use this information solely to send you the categories of messages you consented to
          receive — promotional offers and updates — to respond to your replies, to honor opt-out
          requests, and to maintain records demonstrating compliance with applicable law.
        </p>

        <h3 className="mt-6 text-lg">Sharing and Disclosure</h3>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          No mobile information will be shared with third parties or affiliates for marketing or
          promotional purposes. All of the categories of information described elsewhere in this
          policy exclude text messaging originator opt-in data and consent; this information will
          not be shared with any third parties.
        </p>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          We may share mobile information with service providers who help us operate our
          messaging program — including our messaging platform provider, telecommunications
          carriers, and similar vendors — solely to the extent necessary to deliver messages on
          our behalf. These providers are contractually obligated to keep the information
          confidential and may not use it for their own purposes. We may also disclose information
          where required by law, subpoena, or governmental request, or to protect our legal
          rights.
        </p>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          We do not sell your mobile information or your SMS consent to any third party.
        </p>

        <h3 className="mt-6 text-lg">How We Protect It</h3>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          We maintain administrative, technical, and physical safeguards designed to protect your
          information against unauthorized access, disclosure, alteration, and destruction. These
          include encryption of data in transit and at rest, access controls limiting mobile and
          message data to personnel with a business need, authentication requirements for systems
          that store this data, and periodic review of our security practices. No method of
          transmission over the internet or a mobile network is completely secure, and we cannot
          guarantee absolute security.
        </p>

        <h3 className="mt-6 text-lg">How Long We Keep It</h3>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          We retain your mobile number and message history for as long as you remain opted in and
          for 5 years afterward, or longer where required by law. Records of your consent and any
          opt-out request are retained for 5 years to document compliance and to ensure we do not
          contact you after you have opted out.
        </p>

        <h3 className="mt-6 text-lg">Your Choices and Rights</h3>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          You may opt out of text messages at any time by replying STOP to any message from us;
          you will receive a single confirmation message and no further texts. Reply HELP for
          assistance. You may also request access to, correction of, or deletion of your personal
          information by contacting us at{" "}
          <a href="mailto:contact@thetargetologist.com" className="text-[var(--color-accent)]">
            contact@thetargetologist.com
          </a>
          . Note that if you request deletion, we will retain a minimal suppression record of your
          phone number for the sole purpose of not contacting you again.
        </p>

        <h3 className="mt-6 text-lg">Contact</h3>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Questions about this policy: targetologist,{" "}
          <a href="mailto:contact@thetargetologist.com" className="text-[var(--color-accent)]">
            contact@thetargetologist.com
          </a>
          .
        </p>
        <p className="mt-6 text-sm text-[var(--color-muted-foreground)]">
          Last updated: August 12, 2026.
        </p>
      </Container>
    </main>
  );
}
