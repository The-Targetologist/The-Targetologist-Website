/**
 * Real, live business facts pulled directly from thetargetologist.com
 * (WordPress) on 2026-09-23. Do not fabricate or "improve" these — see
 * docs/02-reference-site-audit.md and docs/16-claude-project-rules.md.
 *
 * These are operational config (contact info, live embeds), not CMS
 * content — they'll move into an admin-managed `site_settings` table in
 * Phase 8 per docs/10-admin-panel.md; hardcoded here for now is
 * intentional, not a shortcut to leave unaddressed.
 */
export const SITE = {
  name: "The Targetologist",
  tagline: "We Build Revenue Systems for B2B Service Businesses",
  email: "contact@thetargetologist.com",
  phone: "+1 (561) 872-8812",
  phoneHref: "tel:+15618728812",
  address: {
    line1: "1489 W. Palmetto Park Rd Suite 500",
    city: "Boca Raton",
    state: "FL",
    zip: "33486",
    country: "USA",
  },
  serviceArea: "Serving US-based Businesses",
  calendlyUrl: "https://calendly.com/hamza-thetargetologist/30min",
  /** LeadConnector/GHL hosted form — keep-the-embed decision, docs/PROJECT_STATE.md (2026-09-23). */
  ghlFormEmbedSrc: "https://api.leadconnectorhq.com/widget/form/eKPuw8kt9cepL7XDQCLt",
  skylead: {
    label: "Skylead",
    description:
      "LinkedIn and email outreach automation we use to run outbound campaigns for clients.",
    url: "https://dash.skylead.io?fpr=hamza52",
  },
} as const;
