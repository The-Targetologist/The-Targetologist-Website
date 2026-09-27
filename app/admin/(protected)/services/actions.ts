"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

function readServiceForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    tagline: String(formData.get("tagline") ?? "").trim() || null,
    one_line_value_prop: String(formData.get("one_line_value_prop") ?? "").trim() || null,
    problem_statement: String(formData.get("problem_statement") ?? "").trim() || null,
    how_we_do_it: String(formData.get("how_we_do_it") ?? "").trim() || null,
    whats_included: String(formData.get("whats_included") ?? "").trim() || null,
    why_it_works: String(formData.get("why_it_works") ?? "").trim() || null,
    status: String(formData.get("status") ?? "draft"),
  };
}

function revalidateAffected() {
  revalidatePath("/admin/services");
  revalidatePath("/");
  revalidatePath("/services/automation");
  revalidatePath("/services/advertisement");
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("services").insert(readServiceForm(formData));
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("services").update(readServiceForm(formData)).eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/services");
}
