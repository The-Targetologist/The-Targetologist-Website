# SEO & URL Strategy

## Existing SEO to preserve
The current WordPress site has real, already-indexed metadata:
- Title: "Home - The Targetologist – Precision Marketing that Delivers"
- Meta description: "Targetologist helps operators turn scattered lead generation, manual follow-ups, and disconnected tools into a structured system that produces consistent..."
- OG tags, Twitter card tags already configured

**Important:** since this is a live, presumably-indexed site being migrated (not a brand-new business like Mian Tayyab Steel), preserve existing URL structure where possible (e.g. `/about`, `/contact` should keep the same paths) to avoid breaking inbound links/rankings. Set up 301 redirects for any URL that must change (e.g. `/automation` → `/services/automation` if the IA changes the path).

## URL structure
- `/` , `/about`, `/contact`, `/work`
- `/services/automation`, `/services/advertisement`
- `/privacy-policy`, `/terms-and-conditions` (match existing paths from WordPress site exactly)
- `/blog`, `/blog/[slug]` (if in scope)

## Metadata
Canonical URLs, per-page unique titles/descriptions, OG/Twitter tags on every page, sitemap.xml, robots.txt — same discipline as the Mian Tayyab Steel project.

## Structured data
Organization schema (real name, address, phone — these are real and known), Service schema for Automation/Advertisement pages once content is finalized.
