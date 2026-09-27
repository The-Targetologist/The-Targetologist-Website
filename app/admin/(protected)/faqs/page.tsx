import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminFaqsPage() {
  const supabase = createAdminClient();
  const [{ data: faqs }, { data: services }] = await Promise.all([
    supabase.from("faqs").select("*").order("service_id").order("sort_order"),
    supabase.from("services").select("id, name"),
  ]);

  const serviceNameById = new Map((services ?? []).map((s) => [s.id, s.name]));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">FAQs</h1>
        <Link href="/admin/faqs/new" className="text-sm font-medium text-[var(--color-accent)]">
          + New FAQ
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left">
            <th className="py-2">Service</th>
            <th className="py-2">Question</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {(faqs ?? []).map((faq) => (
            <tr key={faq.id} className="border-b border-[var(--color-border)]">
              <td className="py-2 text-[var(--color-muted-foreground)]">
                {faq.service_id ? (serviceNameById.get(faq.service_id) ?? "Unknown service") : "General"}
              </td>
              <td className="py-2">{faq.question}</td>
              <td className="py-2 text-right">
                <Link href={`/admin/faqs/${faq.id}`} className="text-[var(--color-accent)]">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
