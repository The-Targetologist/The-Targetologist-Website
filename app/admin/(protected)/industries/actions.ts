"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

function readIndustryForm(formData: FormData) {
  const relatedServiceIds = formData.getAll("related_service_ids").map(String);

  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    related_service_ids: relatedServiceIds.length > 0 ? relatedServiceIds : null,
  };
}

function revalidateAffected() {
  revalidatePath("/admin/industries");
  revalidatePath("/");
  revalidatePath("/services/automation");
  revalidatePath("/services/advertisement");
  revalidatePath("/work");
}

export async function createIndustry(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("industry_categories").insert(readIndustryForm(formData));
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/industries");
}

export async function updateIndustry(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("industry_categories")
    .update(readIndustryForm(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/industries");
}

export async function deleteIndustry(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("industry_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/industries");
}
