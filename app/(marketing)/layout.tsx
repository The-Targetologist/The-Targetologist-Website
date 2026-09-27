import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getSiteSettings } from "@/lib/queries/site-settings";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();

  const orgSchema = organizationJsonLd({
    email: settings.contactEmail,
    phone: settings.contactPhone,
    address: {
      line1: settings.addressLine1,
      city: settings.addressCity,
      state: settings.addressState,
      zip: settings.addressZip,
      country: settings.addressCountry,
    },
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-primary-foreground)]"
      >
        Skip to main content
      </a>
      <Header calendlyUrl={settings.calendlyUrl} />
      {children}
      <Footer settings={settings} />
    </>
  );
}
