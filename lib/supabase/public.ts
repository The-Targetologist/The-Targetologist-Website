import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Public content-read client — no cookies, no session. Reading cookies()
 * (as lib/supabase/server.ts does) forces Next.js to opt every route using
 * it out of static generation/ISR, which is wasted cost for RLS-scoped
 * published-content reads that never depend on who's viewing. Use this for
 * services/process_steps/industry_categories/faqs/testimonials queries;
 * reserve lib/supabase/server.ts for auth-aware work (Phase 8 admin).
 */
export function createPublicClient() {
  return createSupabaseClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false },
  });
}
