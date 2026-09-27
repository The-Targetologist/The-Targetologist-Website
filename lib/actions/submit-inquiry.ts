"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export interface InquiryFormState {
  status: "idle" | "success" | "error";
  error?: string;
}

/**
 * Always stores the submission first (source of truth, RLS-bypassing
 * service-role insert) — then best-effort forwards to a webhook if
 * INQUIRY_WEBHOOK_URL is configured. Webhook failure never fails the
 * user's submission; it's already saved by that point. Not yet
 * configured — this is the "prepare for a webhook" piece the business
 * owner asked for, ready to wire to Zapier -> GHL once they provide a URL.
 */
export async function submitInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const company = String(formData.get("company") ?? "").trim() || null;
  const website = String(formData.get("website") ?? "").trim() || null;
  const challenge = String(formData.get("challenge") ?? "").trim() || null;

  if (!name || !email) {
    return { status: "error", error: "Name and work email are required." };
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("inquiries")
    .insert({ name, email, phone, company, website, challenge })
    .select("id")
    .single();

  if (error) {
    return { status: "error", error: "Something went wrong. Please try again." };
  }

  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, website, challenge }),
      });
      if (res.ok) {
        await supabase
          .from("inquiries")
          .update({ webhook_sent_at: new Date().toISOString() })
          .eq("id", data.id);
      }
    } catch {
      // Swallow — the submission is already saved above.
    }
  }

  return { status: "success" };
}
