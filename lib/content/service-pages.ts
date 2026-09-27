/**
 * Page-specific CTA microcopy — the only service-page content NOT modeled
 * in the `services` table schema (docs/09-content-and-database-model.md).
 * Everything else (tagline, problem_statement, how_we_do_it,
 * whats_included, why_it_works, process_steps, faqs) now comes from
 * Supabase; see lib/queries/.
 *
 * Headlines below are the real copy pulled from the live
 * thetargetologist.com/automation/ and /advertisement/ pages (Phase 13
 * QA, 2026-09-23) — not invented.
 */
export const SERVICE_PAGE_CTA: Record<"automation" | "advertisement", { headline: string; subhead: string }> = {
  automation: {
    headline: "Ready to Automate Your Growth?",
    subhead: "Let's connect your systems so every lead gets followed up on, automatically.",
  },
  advertisement: {
    headline: "Ready to Get Qualified Leads?",
    subhead: "Let's build campaigns that bring in the right leads, not just more clicks.",
  },
};
