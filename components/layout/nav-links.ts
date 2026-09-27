// Shared nav structure per docs/04-information-architecture.md — used by
// both the header nav and the footer's Services/Company columns.
// "Work" intentionally dropped from both (2026-09-27, business owner
// request) — exactly 4 header nav items. The /work route itself still
// exists (not deleted), just unlinked from primary/footer nav.
export const NAV_LINKS = [
  { href: "/services/automation", label: "Automation" },
  { href: "/services/advertisement", label: "Advertisement" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { href: "/services/automation", label: "Automation" },
    { href: "/services/advertisement", label: "Advertisement" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms and Conditions" },
  ],
} as const;
