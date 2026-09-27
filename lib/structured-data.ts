import type { Service } from "@/lib/types/content";
import { SITE_NAME } from "@/lib/seo";

// Same fallback pattern as metadataBase in app/layout.tsx.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thetargetologist.com";

/**
 * Organization + WebSite JSON-LD — adapted from the real schema already
 * present on the live WordPress site (Rank Math plugin), not invented.
 * Deliberately excludes the live site's Person/Article schema entries:
 * those were WordPress/Rank Math boilerplate (a generic "Admin" author
 * with a gravatar), not real business content, and Article schema is for
 * blog posts — out of scope per docs/03-sitemap-and-page-goals.md.
 */
export function organizationJsonLd({
  email,
  phone,
  address,
}: {
  email: string;
  phone: string;
  address: { line1: string; city: string; state: string; zip: string; country: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Targetologist",
    url: BASE_URL,
    logo: `${BASE_URL}/Targetologist-Logo.svg`,
    email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.line1,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: address.country,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_NAME,
    alternateName: "Targetologist",
  };
}

export function serviceJsonLd(
  service: Pick<Service, "name" | "one_line_value_prop">,
  path: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.one_line_value_prop ?? undefined,
    url: `${BASE_URL}${path}`,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: "US",
  };
}
