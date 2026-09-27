import { createPublicClient } from "@/lib/supabase/public";
import type { ProcessStep } from "@/lib/types/content";

export async function getHomeProcessSteps(): Promise<ProcessStep[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("process_steps")
    .select("*")
    .is("service_id", null)
    .order("step_number");

  if (error) throw error;
  return data ?? [];
}

export async function getProcessStepsForService(serviceId: string): Promise<ProcessStep[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("process_steps")
    .select("*")
    .eq("service_id", serviceId)
    .order("step_number");

  if (error) throw error;
  return data ?? [];
}
