import Link from "next/link";
import { Container } from "./container";
import { FOOTER_LINKS } from "./nav-links";
import { SITE } from "@/lib/constants/site";
import { PhoneIcon, MailIcon, MapPinIcon } from "@/components/ui/icons";
import type { SiteSettings } from "@/lib/queries/site-settings";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-muted)]">
      <Container className="grid gap-10 py-16 md:grid-cols-4">
        <div>
          <p className="font-heading text-lg font-semibold">The Targetologist</p>
          <p className="mt-3 max-w-xs text-sm text-[var(--color-muted-foreground)]">{SITE.tagline}</p>
          <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">{SITE.serviceArea}</p>
        </div>

        <FooterColumn title="Services" links={FOOTER_LINKS.services} />
        <FooterColumn title="Company" links={FOOTER_LINKS.company} />

        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted-foreground)]">
            <li>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <MailIcon className="h-4 w-4 shrink-0" />
                {settings.contactEmail}
              </a>
            </li>
            <li>
              <a
                href={`tel:${settings.contactPhone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-2 hover:text-[var(--color-accent)]"
              >
                <PhoneIcon className="h-4 w-4 shrink-0" />
                {settings.contactPhone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {settings.addressLine1}
                <br />
                {settings.addressCity}, {settings.addressState} {settings.addressZip}{" "}
                {settings.addressCountry}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-[var(--color-border)]">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 text-sm text-[var(--color-muted-foreground)] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} The Targetologist. All rights reserved.</p>
          <div className="flex gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[var(--color-accent)]">
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted-foreground)]">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-[var(--color-accent)]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
