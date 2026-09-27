# Technical Architecture

## Stack
Next.js (App Router, TypeScript), Tailwind CSS, Supabase (Postgres, Auth, Storage), deployed on Vercel, GitHub for version control/CI — identical stack and workflow to the Mian Tayyab Steel project.

## Booking/contact system — decision needed
The current WordPress site embeds a LeadConnector/GHL-hosted form (`api.leadconnectorhq.com/widget/form/...`) directly. Options for this rebuild:
1. **Keep the same embed** — simplest, zero migration risk, keeps using the existing GHL pipeline the business already operates in.
2. **Build a native form** — better design control/consistency, but requires wiring to GHL via API/webhook to land in the same pipeline, and must not silently break the existing lead-routing setup.

Recommendation: start with option 1 (keep the embed) for launch, revisit option 2 as a later enhancement once the core site is live — avoids risking the business's actual live lead pipeline during the rebuild.

## Booking (Calendly)
Current site uses Calendly (`calendly.com/hamza-thetargetologist/30min`) for the primary CTA. Keep this integration unless told otherwise — it's a real, working booking system already in use.

## Environment variables
Same naming convention as Mian Tayyab Steel:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY (or PUBLISHABLE_KEY, confirm Supabase project's key naming)
SUPABASE_SERVICE_ROLE_KEY (or SECRET_KEY)
NEXT_PUBLIC_SITE_URL
```
