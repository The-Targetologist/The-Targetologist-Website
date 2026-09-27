import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

/**
 * Being an authenticated Supabase user is NOT enough — membership in
 * `admin_users` is the actual gate. See docs/10-admin-panel.md. Call at
 * the top of every /admin page and Server Action.
 */
export async function requireAdmin(): Promise<User> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!adminRow) redirect("/admin/login?error=not_admin");

  return user;
}
