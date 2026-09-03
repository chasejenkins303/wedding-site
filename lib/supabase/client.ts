import { createBrowserClient } from "@supabase/ssr";

// Use this inside Client Components ("use client") only.
// Safe to call repeatedly — createBrowserClient reuses the underlying client.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}