"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");
  const phoneNumber = String(formData.get("phone_number") || "").trim();
  const next = String(formData.get("next") || "/rsvp");

  const fail = (message: string) =>
    redirect(
      `/login?mode=signup&next=${encodeURIComponent(next)}&error=${encodeURIComponent(message)}`
    );

  if (password !== confirmPassword) fail("Passwords don't match.");
  if (!phoneNumber) fail("Enter the phone number your invite was sent to.");

  // Check the invite BEFORE creating any account. Uses the service-role
  // client since there's no session yet to check this under RLS — this is
  // the all-or-nothing gate: no match, no auth user, no profile.
  const admin = createAdminClient();
  const { data: invite } = await admin
    .from("invites")
    .select("id")
    .eq("phone_number", phoneNumber)
    .maybeSingle();

  if (!invite) {
    fail("We couldn't find an invite for that phone number. Double check it, or reach out to us directly.");
    return;
  }

  const supabase = await createClient();
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

  if (signUpError || !signUpData.user) {
    fail(signUpError?.message ?? "Something went wrong creating your account.");
    return;
  }

  // Link the newly created profile to the matched invite right away —
  // "Confirm email" must be off in Supabase for the session (and therefore
  // this write) to be active immediately after signUp.
  const { error: linkError } = await supabase
    .from("profiles")
    .update({ phone_number: phoneNumber, invite_id: invite.id })
    .eq("id", signUpData.user.id);

  if (linkError) {
    // Account + phone match both succeeded; only the profile write failed
    // (e.g. session not active yet). Send them to the manual fallback
    // rather than leaving them stuck.
    redirect(`/link-phone?next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?next=${encodeURIComponent(next)}&error=${encodeURIComponent(error.message)}`);
  }

  redirect(next);
}