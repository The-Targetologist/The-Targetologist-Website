# Component System

## Core reusable components
- `Header` — logo, nav links, Book a Strategy Call button (sticky on scroll, per pattern used on Mian Tayyab Steel project)
- `Footer` — services list, company list, legal links, contact block
- `ServiceCard` — used on Home (2 instances) and possibly Work page; icon/image, service name, one-line description, link
- `ProcessStep` — numbered step component (number, title, description, optional sub-tags) — used on Home and each service page, reused but not visually identical across contexts (per the "reuse without visual sameness" principle from the Mian Tayyab Steel project)
- `IndustryCard` — industry category name + short description, optional testimonial slot (permission-gated)
- `FAQAccordion` — reusable across service pages
- `CTASection` — headline + Book a Strategy Call button, reusable but with page-specific headline copy
- `TestimonialCard` — only rendered when a testimonial has explicit client permission on file (see content model)

## Booking/contact integration
Confirm whether to keep the existing LeadConnector/GHL-hosted form embed (as seen on the current WordPress site) or build a native form component that posts to the same GHL backend via API/webhook — this decision belongs in `11-technical-architecture.md`.
