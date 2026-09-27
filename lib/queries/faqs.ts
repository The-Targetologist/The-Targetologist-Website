import { createPublicClient } from "@/lib/supabase/public";
import type { Faq } from "@/lib/types/content";

export async function getFaqsForService(serviceId: string): Promise<Faq[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("service_id", serviceId)
    .order("sort_order");

  if (error) throw error;
  return data ?? [];
}
