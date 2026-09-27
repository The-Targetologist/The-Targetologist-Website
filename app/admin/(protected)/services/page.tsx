import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminServicesPage() {
  const supabase = createAdminClient();
  const { data: services } = await supabase.from("services").select("*").order("name");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Services</h1>
        <Link href="/admin/services/new" className="text-sm font-medium text-[var(--color-accent)]">
          + New Service
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left">
            <th className="py-2">Name</th>
            <th className="py-2">Slug</th>
            <th className="py-2">Status</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {(services ?? []).map((service) => (
            <tr key={service.id} className="border-b border-[var(--color-border)]">
              <td className="py-2">{service.name}</td>
              <td className="py-2 text-[var(--color-muted-foreground)]">{service.slug}</td>
              <td className="py-2">{service.status}</td>
              <td className="py-2 text-right">
                <Link href={`/admin/services/${service.id}`} className="text-[var(--color-accent)]">
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
