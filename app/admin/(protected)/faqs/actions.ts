"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

function readFaqForm(formData: FormData) {
  const serviceId = String(formData.get("service_id") ?? "");

  return {
    service_id: serviceId === "" ? null : serviceId,
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

function revalidateAffected() {
  revalidatePath("/admin/faqs");
  revalidatePath("/services/automation");
  revalidatePath("/services/advertisement");
}

export async function createFaq(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("faqs").insert(readFaqForm(formData));
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("faqs").update(readFaqForm(formData)).eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/faqs");
}
