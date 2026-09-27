import Link from "next/link";

const SECTIONS = [
  { href: "/admin/services", label: "Services", description: "Automation and Advertisement page content." },
  { href: "/admin/process-steps", label: "Process Steps", description: "Homepage and per-service process flows." },
  { href: "/admin/industries", label: "Industries", description: "Industry categories shown site-wide." },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    description: "Client quotes — permission-gated before any name/company can show.",
  },
  { href: "/admin/faqs", label: "FAQs", description: "Service-specific frequently asked questions." },
  {
    href: "/admin/inquiries",
    label: "Inquiries",
    description: "Submissions from the lead form on Home and Contact.",
  },
  {
    href: "/admin/settings",
    label: "Site Settings",
    description: "Real contact info, Calendly link, and GHL form embed — a live operational pipeline.",
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border border-[var(--color-border)] p-5 hover:bg-[var(--color-muted)]"
          >
            <p className="font-semibold">{section.label}</p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
