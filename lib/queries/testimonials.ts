import { createPublicClient } from "@/lib/supabase/public";
import type { Testimonial } from "@/lib/types/content";

// Selects all columns (including permission_confirmed/client_name/
// client_company) — the render-layer gate in TestimonialCard is what
// decides whether name/company ever reach the page, not this query.

/**
 * One query for every industry's testimonial, not one query per industry.
 * The homepage and /work page both render a grid of IndustryCards that
 * each want "the" testimonial for their industry — looping
 * getTestimonialForIndustry per card was a real N+1 (1 + N queries per
 * page load). Returns a Map so callers can still look up by industry id.
 */
export async function getTestimonialsByIndustryIds(
  industryIds: string[]
): Promise<Map<string, Testimonial>> {
  if (industryIds.length === 0) return new Map();

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .in("industry_category_id", industryIds)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const byIndustry = new Map<string, Testimonial>();
  for (const testimonial of data ?? []) {
    // First (most recent) testimonial per industry wins — matches the old
    // per-industry query's .limit(1) behavior.
    if (testimonial.industry_category_id && !byIndustry.has(testimonial.industry_category_id)) {
      byIndustry.set(testimonial.industry_category_id, testimonial);
    }
  }
  return byIndustry;
}
