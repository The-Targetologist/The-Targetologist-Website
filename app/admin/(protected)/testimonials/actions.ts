"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

function readTestimonialForm(formData: FormData) {
  const industryId = String(formData.get("industry_category_id") ?? "");

  return {
    industry_category_id: industryId === "" ? null : industryId,
    quote: String(formData.get("quote") ?? "").trim(),
    client_name: String(formData.get("client_name") ?? "").trim() || null,
    client_company: String(formData.get("client_company") ?? "").trim() || null,
    // Checkboxes are absent from FormData entirely when unchecked — this
    // is the actual gate. See docs/09-content-and-database-model.md and
    // docs/16-claude-project-rules.md rule 4.
    permission_confirmed: formData.get("permission_confirmed") === "on",
  };
}

function revalidateAffected() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/work");
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("testimonials").insert(readTestimonialForm(formData));
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("testimonials")
    .update(readTestimonialForm(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAffected();
  redirect("/admin/testimonials");
}
