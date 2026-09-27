import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { SignOutButton } from "@/components/admin/sign-out-button";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/process-steps", label: "Process Steps" },
  { href: "/admin/industries", label: "Industries" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Site Settings" },
] as const;

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-full flex-1">
      <aside className="w-56 shrink-0 border-r border-[var(--color-border)] p-4">
        <p className="text-sm font-semibold">The Targetologist Admin</p>
        <nav className="mt-6 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm hover:bg-[var(--color-muted)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-[var(--color-border)] pt-4">
          <p className="truncate text-xs text-[var(--color-muted-foreground)]">{user.email}</p>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
