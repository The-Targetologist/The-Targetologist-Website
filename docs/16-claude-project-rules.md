# Claude Project Rules

1. Read all `/docs` files before making implementation decisions. Treat `PROJECT_STATE.md` as current status.
2. Only two services exist: Automation and Advertisement. Never expand to match Lab41's 6-service structure.
3. Never copy Lab41's specific facts/numbers/claims (client counts, revenue figures, named founder, named platform logos beyond what's confirmed real) — see `02-reference-site-audit.md`.
4. Never publish a named client/company testimonial unless `testimonials.permission_confirmed = true` in the database — see `09-content-and-database-model.md`.
5. This is a live site migration, not a greenfield build — preserve real content (contact info, legal text, existing URL paths) from the current WordPress site rather than regenerating it. See `02-reference-site-audit.md` and `12-seo-and-url-strategy.md`.
6. Do not fabricate business stats, testimonials, or client claims. Where real data doesn't exist yet, use qualitative industry-category framing instead, or clearly flag as draft/placeholder.
7. Do not silently change the existing lead-routing system (GHL embed / Calendly) — flag any proposed change to the business owner before implementing, since this is a live operational pipeline, not a placeholder.
8. Follow the phased roadmap in `13-implementation-roadmap.md`. Produce a Project Readiness Report after Phase 1 before writing implementation code.
9. Keep `PROJECT_STATE.md` updated as work progresses.
10. Avoid generic AI/SaaS visual patterns (gradient blobs, glassmorphism, floating cards, fake stat counters) — see `05-design-direction.md`.
