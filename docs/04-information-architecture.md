# Information Architecture

## Primary navigation
Home · Automation · Advertisement · About · Work · Contact · [Book a Strategy Call — button, visually distinct from nav links]

## Content relationships
- **Service** (Automation, Advertisement) → has: process steps, platforms/tools used, FAQs, related industry categories
- **Industry category** (Healthcare, Recruitment, Retail, Home Services, B2B Agencies) → has: description, which service(s) apply, optional real testimonial (only with permission, otherwise omitted)
- **Testimonial** (optional, permission-gated) → linked to an industry category, never to a named company unless permission is on file
- **Blog post** (if in scope) → belongs to a category, may reference a service

## Content that must NOT be hardcoded into page components
Same principle as the Mian Tayyab Steel project: services, industry categories, and testimonials should be data-driven (Supabase tables), not hardcoded JSX, so they can be managed without a code change once the admin panel exists.

## Footer structure
- Services: Automation, Advertisement
- Company: About, Work, Contact
- Legal: Privacy Policy, Terms and Conditions
- Contact block: real phone, email, address (Boca Raton, FL — confirm still current)
