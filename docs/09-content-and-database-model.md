# Content & Database Model

## Supabase tables

```
services
├── id (uuid, pk)
├── name (text)                 -- "Automation" | "Advertisement"
├── slug (text, unique)
├── one_line_value_prop (text)
├── problem_statement (text)
├── how_we_do_it (text)
├── whats_included (text)       -- or a separate service_features table if list-structured
├── status (enum: draft, published, archived)
└── created_at (timestamptz)

process_steps
├── id (uuid, pk)
├── service_id (fk, nullable)   -- null = applies to homepage general process
├── step_number (int)
├── title (text)
├── description (text)
└── sub_tags (text[], nullable)

industry_categories
├── id (uuid, pk)
├── name (text)                 -- "Healthcare & Medical Services", etc.
├── slug (text, unique)
├── description (text)
└── related_service_ids (uuid[], nullable)

testimonials
├── id (uuid, pk)
├── industry_category_id (fk, nullable)
├── quote (text)
├── client_name (text, nullable)        -- NULL unless permission_confirmed = true
├── client_company (text, nullable)     -- NULL unless permission_confirmed = true
├── permission_confirmed (boolean, default false)  -- gate: if false, render anonymized/industry-only
└── created_at (timestamptz)

faqs
├── id (uuid, pk)
├── service_id (fk, nullable)
├── question (text)
├── answer (text)
└── sort_order (int)

inquiries  -- if a native contact form is built instead of/alongside the GHL embed
├── id (uuid, pk)
├── name (text)
├── email (text)
├── phone (text)
├── company (text, nullable)
├── message (text)
├── service_interest (text, nullable)
├── status (text, default 'new')
└── created_at (timestamptz)

blog_posts   -- only if blog is confirmed in scope
├── id (uuid, pk)
├── title (text)
├── slug (text, unique)
├── excerpt (text)
├── content (text)
├── cover_image_url (text)
├── status (enum: draft, published, archived)
├── published_at (timestamptz)
└── created_at (timestamptz)
```

## Row Level Security
Public SELECT scoped to `status = 'published'` content only, same pattern as the Mian Tayyab Steel project. Writes are service-role only until admin auth exists (Phase per `10-admin-panel.md`).

## Testimonials — permission gate (critical)
`testimonials.permission_confirmed` must default to `false`. The frontend must never render `client_name` or `client_company` unless `permission_confirmed = true`. If false, render the testimonial (if at all) attributed only to its `industry_category`, with no identifying name. This is a hard rule, not a style preference — see `01-project-brief.md` privacy note.
