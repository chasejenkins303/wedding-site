"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// This is now only ever used for the admin account — guests RSVP via
// token links (/rsvp/[token]) and never sign in at all.
export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?next=${encodeURIComponent(next)}&error=${encodeURIComponent(error.message)}`);
  }

  redirect(next);
}