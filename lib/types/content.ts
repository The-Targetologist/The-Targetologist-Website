// Mirrors supabase/migrations/0001_init.sql. Kept independent of any
// generated Supabase types so Phase 5 components can be built and typed
// against the documented schema before Phase 7 wires up real queries.

export type ContentStatus = "draft" | "published" | "archived";

export interface Service {
  id: string;
  name: string;
  slug: string;
  /** Punchy hero headline, distinct from `name` (short label used in nav/ServiceCard). Added in 0004_service_page_enhancements.sql. */
  tagline: string | null;
  one_line_value_prop: string | null;
  problem_statement: string | null;
  how_we_do_it: string | null;
  whats_included: string | null;
  /** Benefit-bullet list, same shape as whats_included. Added in 0004_service_page_enhancements.sql. */
  why_it_works: string | null;
  status: ContentStatus;
}

export interface ProcessStep {
  id: string;
  service_id: string | null;
  step_number: number;
  title: string;
  description: string | null;
  sub_tags: string[] | null;
}

export interface IndustryCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Testimonial {
  id: string;
  industry_category_id: string | null;
  quote: string;
  client_name: string | null;
  client_company: string | null;
  /** Hard gate — see docs/09-content-and-database-model.md. */
  permission_confirmed: boolean;
}

export interface Faq {
  id: string;
  service_id: string | null;
  question: string;
  answer: string;
  sort_order: number;
}
