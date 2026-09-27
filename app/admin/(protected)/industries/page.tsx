import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminIndustriesPage() {
  const supabase = createAdminClient();
  const { data: industries } = await supabase.from("industry_categories").select("*").order("name");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Industries</h1>
        <Link href="/admin/industries/new" className="text-sm font-medium text-[var(--color-accent)]">
          + New Industry
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left">
            <th className="py-2">Name</th>
            <th className="py-2">Slug</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {(industries ?? []).map((industry) => (
            <tr key={industry.id} className="border-b border-[var(--color-border)]">
              <td className="py-2">{industry.name}</td>
              <td className="py-2 text-[var(--color-muted-foreground)]">{industry.slug}</td>
              <td className="py-2 text-right">
                <Link href={`/admin/industries/${industry.id}`} className="text-[var(--color-accent)]">
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
