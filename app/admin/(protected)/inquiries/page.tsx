import { createAdminClient } from "@/lib/supabase/admin";

// Read-only — inquiries come from the public lead form
// (lib/actions/submit-inquiry.ts), not created/edited here. Lets the
// business owner see submissions today, even before INQUIRY_WEBHOOK_URL
// is configured, so nothing submitted goes unseen in the meantime.
export default async function AdminInquiriesPage() {
  const supabase = createAdminClient();
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl">Inquiries</h1>
      <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
        Submissions from the lead form on Home and Contact.{" "}
        {process.env.INQUIRY_WEBHOOK_URL
          ? "Forwarded to the configured webhook automatically."
          : "No webhook configured yet, so these are only stored here for now."}
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-left">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Company</th>
              <th className="py-2">Challenge</th>
              <th className="py-2">Submitted</th>
              <th className="py-2">Webhook</th>
            </tr>
          </thead>
          <tbody>
            {(inquiries ?? []).map((inquiry) => (
              <tr key={inquiry.id} className="border-b border-[var(--color-border)]">
                <td className="py-2">{inquiry.name}</td>
                <td className="py-2 text-[var(--color-muted-foreground)]">{inquiry.email}</td>
                <td className="py-2 text-[var(--color-muted-foreground)]">{inquiry.phone || "—"}</td>
                <td className="py-2 text-[var(--color-muted-foreground)]">{inquiry.company || "—"}</td>
                <td className="py-2 text-[var(--color-muted-foreground)]">{inquiry.challenge || "—"}</td>
                <td className="py-2 text-[var(--color-muted-foreground)]">
                  {new Date(inquiry.created_at).toLocaleString()}
                </td>
                <td className="py-2">
                  {inquiry.webhook_sent_at ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Sent
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      Not sent
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(inquiries ?? []).length === 0 && (
        <p className="mt-6 text-sm text-[var(--color-muted-foreground)]">No inquiries yet.</p>
      )}
    </div>
  );
}
