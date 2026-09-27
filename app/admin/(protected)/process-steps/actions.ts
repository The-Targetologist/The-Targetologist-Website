"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

function readProcessStepForm(formData: FormData) {
  const serviceId = String(formData.get("service_id") ?? "");
  const subTagsRaw = String(formData.get("sub_tags") ?? "").trim();

  return {
    service_id: serviceId === "" ? null : serviceId,
    step_number: Number(formData.get("step_number") ?? 0),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    sub_tags: subTagsRaw
      ? subTagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : null,
  };
}

function revalidateAffected() {
  revalidatePath("/admin/process-steps");
  revalidatePath("/");
  revalidatePath("/services/automation");
  revalidatePath("/services/advertisement");
}

export async function createProcessStep(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("process_steps").insert(readProcessStepForm(formData));
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/process-steps");
}

export async function updateProcessStep(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("process_steps")
    .update(readProcessStepForm(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/process-steps");
}

export async function deleteProcessStep(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("process_steps").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/process-steps");
}
