import { createPublicClient } from "@/lib/supabase/public";
import { SITE } from "@/lib/constants/site";

export interface SiteSettings {
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  calendlyUrl: string;
  ghlFormEmbedSrc: string;
}

const FALLBACK: SiteSettings = {
  contactEmail: SITE.email,
  contactPhone: SITE.phone,
  addressLine1: SITE.address.line1,
  addressCity: SITE.address.city,
  addressState: SITE.address.state,
  addressZip: SITE.address.zip,
  addressCountry: SITE.address.country,
  calendlyUrl: SITE.calendlyUrl,
  ghlFormEmbedSrc: SITE.ghlFormEmbedSrc,
};

// Falls back to the known-real hardcoded values (never broken contact
// info) if the table is empty/unreachable — e.g. before
// 0003_site_settings.sql has been applied.
export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("site_settings").select("*").maybeSingle();

  if (error || !data) return FALLBACK;

  return {
    contactEmail: data.contact_email ?? FALLBACK.contactEmail,
    contactPhone: data.contact_phone ?? FALLBACK.contactPhone,
    addressLine1: data.address_line1 ?? FALLBACK.addressLine1,
    addressCity: data.address_city ?? FALLBACK.addressCity,
    addressState: data.address_state ?? FALLBACK.addressState,
    addressZip: data.address_zip ?? FALLBACK.addressZip,
    addressCountry: data.address_country ?? FALLBACK.addressCountry,
    calendlyUrl: data.calendly_url ?? FALLBACK.calendlyUrl,
    ghlFormEmbedSrc: data.ghl_form_embed_src ?? FALLBACK.ghlFormEmbedSrc,
  };
}
