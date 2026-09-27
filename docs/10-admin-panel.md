# Admin Panel

## Scope
Smaller than the Mian Tayyab Steel admin panel, matching this site's smaller content surface. Needed capabilities:
- Manage Services (2 records, but should still go through the CMS rather than being hardcoded, for future flexibility)
- Manage Process Steps
- Manage Industry Categories
- Manage Testimonials (with a clear, prominent `permission_confirmed` toggle in the UI — this should be impossible to miss when adding a testimonial)
- Manage FAQs
- View Inquiries (if native form is built)
- Manage Blog Posts (only if blog is in scope)
- Site settings (contact info, social links)

## Auth
Supabase Auth + an `admin_users` table gate, same pattern as Mian Tayyab Steel — being an authenticated Supabase user does not automatically grant admin access.

## Testimonial UI safeguard
When `permission_confirmed` is unchecked, the admin UI should visibly show the testimonial will render anonymized (industry-only) on the live site — so the person managing content can't accidentally publish a named client quote without realizing the checkbox state matters.
