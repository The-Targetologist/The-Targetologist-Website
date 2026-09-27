import { createPublicClient } from "@/lib/supabase/public";
import type { IndustryCategory } from "@/lib/types/content";

export async function getIndustryCategories(): Promise<IndustryCategory[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("industry_categories").select("*").order("name");

  if (error) throw error;
  return data ?? [];
}
