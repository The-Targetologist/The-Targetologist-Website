import { createBrowserClient } from "@supabase/ssr";

/** Browser client for the admin login form — the only client-side Supabase usage in the app. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
