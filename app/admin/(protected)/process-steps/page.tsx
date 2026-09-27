import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminProcessStepsPage() {
  const supabase = createAdminClient();
  const [{ data: steps }, { data: services }] = await Promise.all([
    supabase.from("process_steps").select("*").order("service_id").order("step_number"),
    supabase.from("services").select("id, name"),
  ]);

  const serviceNameById = new Map((services ?? []).map((s) => [s.id, s.name]));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Process Steps</h1>
        <Link href="/admin/process-steps/new" className="text-sm font-medium text-[var(--color-accent)]">
          + New Step
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left">
            <th className="py-2">Belongs to</th>
            <th className="py-2">#</th>
            <th className="py-2">Title</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {(steps ?? []).map((step) => (
            <tr key={step.id} className="border-b border-[var(--color-border)]">
              <td className="py-2 text-[var(--color-muted-foreground)]">
                {step.service_id ? (serviceNameById.get(step.service_id) ?? "Unknown service") : "Homepage (general)"}
              </td>
              <td className="py-2">{step.step_number}</td>
              <td className="py-2">{step.title}</td>
              <td className="py-2 text-right">
                <Link href={`/admin/process-steps/${step.id}`} className="text-[var(--color-accent)]">
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
