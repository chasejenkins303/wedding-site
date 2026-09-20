"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function findInvite(formData: FormData) {
  const name = String(formData.get("household_name") || "").trim();

  const supabase = await createClient();
  const { data: token } = await supabase.rpc("find_invite_by_name", { p_name: name });

  if (!token) {
    redirect(
      `/rsvp?error=${encodeURIComponent(
        "We couldn't find an invite under that name — try the name on your invitation exactly, or reach out to us directly."
      )}`
    );
  }

  redirect(`/rsvp/${token}`);
}