"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";

function readSettingsForm(formData: FormData) {
  return {
    contact_email: String(formData.get("contact_email") ?? "").trim(),
    contact_phone: String(formData.get("contact_phone") ?? "").trim(),
    address_line1: String(formData.get("address_line1") ?? "").trim(),
    address_city: String(formData.get("address_city") ?? "").trim(),
    address_state: String(formData.get("address_state") ?? "").trim(),
    address_zip: String(formData.get("address_zip") ?? "").trim(),
    address_country: String(formData.get("address_country") ?? "").trim(),
    calendly_url: String(formData.get("calendly_url") ?? "").trim(),
    ghl_form_embed_src: String(formData.get("ghl_form_embed_src") ?? "").trim(),
    updated_at: new Date().toISOString(),
  };
}

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("site_settings")
    .update(readSettingsForm(formData))
    .eq("id", true);
  if (error) throw new Error(error.message);

  // Settings feed the Header/Footer on every page — revalidate the whole tree.
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
