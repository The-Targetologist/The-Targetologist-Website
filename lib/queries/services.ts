import { createPublicClient } from "@/lib/supabase/public";
import type { Service } from "@/lib/types/content";

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Only two services ever exist (docs/01-project-brief.md hard rule) — fetch
// by slug in a fixed, known order rather than "all published services".
export async function getHomeServices(): Promise<Service[]> {
  const [automation, advertisement] = await Promise.all([
    getServiceBySlug("automation"),
    getServiceBySlug("advertisement"),
  ]);
  return [automation, advertisement].filter((s): s is Service => s !== null);
}
