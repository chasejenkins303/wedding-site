"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function linkPhone(formData: FormData) {
  const phoneNumber = String(formData.get("phone_number") || "").trim();
  const next = String(formData.get("next") || "/rsvp");

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  // RLS on `invites` only allows reading a row once profiles.invite_id
  // already points at it — so this lookup has to go through a
  // security-definer RPC that checks the phone number, not a direct select.
  const { data: inviteId, error: lookupError } = await supabase.rpc(
    "find_invite_by_phone",
    { p_phone_number: phoneNumber }
  );

  if (lookupError || !inviteId) {
    redirect(
      `/link-phone?next=${encodeURIComponent(next)}&error=${encodeURIComponent(
        "We couldn't find an invite for that phone number. Double check it, or reach out to us directly."
      )}`
    );
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ phone_number: phoneNumber, invite_id: inviteId })
    .eq("id", user.id);

  if (updateError) {
    redirect(
      `/link-phone?next=${encodeURIComponent(next)}&error=${encodeURIComponent(updateError.message)}`
    );
  }

  redirect(next);
}