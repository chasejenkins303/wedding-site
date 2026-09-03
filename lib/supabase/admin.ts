import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// SERVER-ONLY. Bypasses RLS entirely — only call this after you've already
// verified the current user is an admin (check profiles.is_admin using the
// normal server client first). Never import this into a Client Component.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}