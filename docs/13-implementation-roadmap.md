# Implementation Roadmap

Phase 1 — Understanding: read all docs, review current WordPress site content, confirm open questions (brand colors, blog in/out of scope, form embed decision) with the business owner.
Phase 2 — Foundation: Next.js scaffold (already done), Supabase setup, global CSS, fonts, layout primitives.
Phase 3 — Design System: tokens, typography, spacing, buttons, reusable primitives (provisional palette until brand input confirmed).
Phase 4 — Global Layout: header, nav, footer, Book a Strategy Call CTA treatment.
Phase 5 — Core Components: ServiceCard, ProcessStep, IndustryCard, FAQAccordion, CTASection, TestimonialCard (with permission gate).
Phase 6 — Key Frontend Pages: Home first, then service pages.
Phase 7 — Dynamic Content: services, process steps, industry categories, testimonials, FAQs wired to Supabase.
Phase 8 — Admin: CMS per `10-admin-panel.md`.
Phase 9 — Secondary Pages: About, Work, Contact, Privacy Policy, Terms (carry forward real legal text).
Phase 10 — Responsive Refinement.
Phase 11 — SEO: metadata, schema, sitemap, 301 redirects for any changed URLs.
Phase 12 — Performance + Accessibility.
Phase 13 — Final QA + launch (includes DNS cutover from WordPress to new site — plan for zero-downtime switch and redirect verification).

## Do not skip ahead
Same rule as Mian Tayyab Steel: Claude Code should produce a Project Readiness Report after Phase 1 before writing implementation code, and flag any of the open questions listed in this roadmap and elsewhere in `/docs` before proceeding.
