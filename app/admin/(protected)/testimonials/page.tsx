import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminTestimonialsPage() {
  const supabase = createAdminClient();
  const [{ data: testimonials }, { data: industries }] = await Promise.all([
    supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    supabase.from("industry_categories").select("id, name"),
  ]);

  const industryNameById = new Map((industries ?? []).map((i) => [i.id, i.name]));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="text-sm font-medium text-[var(--color-accent)]">
          + New Testimonial
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left">
            <th className="py-2">Quote</th>
            <th className="py-2">Industry</th>
            <th className="py-2">Attribution</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {(testimonials ?? []).map((t) => (
            <tr key={t.id} className="border-b border-[var(--color-border)]">
              <td className="max-w-xs truncate py-2">{t.quote}</td>
              <td className="py-2 text-[var(--color-muted-foreground)]">
                {t.industry_category_id ? (industryNameById.get(t.industry_category_id) ?? "—") : "—"}
              </td>
              <td className="py-2">
                {t.permission_confirmed ? (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    Named: {t.client_name || "(no name set)"}
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                    Anonymized (industry only)
                  </span>
                )}
              </td>
              <td className="py-2 text-right">
                <Link href={`/admin/testimonials/${t.id}`} className="text-[var(--color-accent)]">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {(testimonials ?? []).length === 0 && (
        <p className="mt-6 text-sm text-[var(--color-muted-foreground)]">
          No testimonials yet. None will be fabricated — only add real client quotes here.
        </p>
      )}
    </div>
  );
}
