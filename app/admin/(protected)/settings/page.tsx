import { createAdminClient } from "@/lib/supabase/admin";
import { updateSiteSettings } from "./actions";
import { FormField, inputClass } from "@/components/admin/form-field";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const supabase = createAdminClient();
  const { data: settings } = await supabase.from("site_settings").select("*").maybeSingle();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl">Site Settings</h1>
      <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
        Real contact info and lead-routing links used across the live site. Changes here go live
        immediately (within the 1-hour revalidation window).
      </p>

      {saved && (
        <p className="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">Saved.</p>
      )}

      <form action={updateSiteSettings} className="mt-6 flex flex-col gap-4">
        <FormField label="Contact email" htmlFor="contact_email">
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            required
            defaultValue={settings?.contact_email}
            className={inputClass}
          />
        </FormField>
        <FormField label="Contact phone" htmlFor="contact_phone">
          <input
            id="contact_phone"
            name="contact_phone"
            required
            defaultValue={settings?.contact_phone}
            className={inputClass}
          />
        </FormField>
        <FormField label="Address line 1" htmlFor="address_line1">
          <input
            id="address_line1"
            name="address_line1"
            required
            defaultValue={settings?.address_line1}
            className={inputClass}
          />
        </FormField>
        <div className="grid grid-cols-3 gap-3">
          <FormField label="City" htmlFor="address_city">
            <input
              id="address_city"
              name="address_city"
              required
              defaultValue={settings?.address_city}
              className={inputClass}
            />
          </FormField>
          <FormField label="State" htmlFor="address_state">
            <input
              id="address_state"
              name="address_state"
              required
              defaultValue={settings?.address_state}
              className={inputClass}
            />
          </FormField>
          <FormField label="ZIP" htmlFor="address_zip">
            <input
              id="address_zip"
              name="address_zip"
              required
              defaultValue={settings?.address_zip}
              className={inputClass}
            />
          </FormField>
        </div>
        <FormField label="Country" htmlFor="address_country">
          <input
            id="address_country"
            name="address_country"
            required
            defaultValue={settings?.address_country}
            className={inputClass}
          />
        </FormField>
        <FormField label="Calendly URL" htmlFor="calendly_url">
          <input
            id="calendly_url"
            name="calendly_url"
            type="url"
            required
            defaultValue={settings?.calendly_url}
            className={inputClass}
          />
        </FormField>
        <FormField label="GHL form embed URL" htmlFor="ghl_form_embed_src">
          <input
            id="ghl_form_embed_src"
            name="ghl_form_embed_src"
            type="url"
            required
            defaultValue={settings?.ghl_form_embed_src}
            className={inputClass}
          />
        </FormField>

        <div className="mt-2 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          Changing the Calendly or GHL form links changes where real leads go. Per
          docs/16-claude-project-rules.md rule 7, confirm with the business owner before changing
          these — this is a live operational pipeline, not a placeholder.
        </div>

        <button
          type="submit"
          className="h-10 w-fit rounded-md bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-primary-foreground)]"
        >
          Save
        </button>
      </form>
    </div>
  );
}
