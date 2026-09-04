"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function submitRsvp(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/rsvp");

  const { data: profile } = await supabase
    .from("profiles")
    .select("invite_id")
    .eq("id", user.id)
    .single();

  if (!profile?.invite_id) redirect("/link-phone?next=/rsvp");

  const attending = formData.get("attending") === "yes";
  const guestCount = attending ? Number(formData.get("guest_count") || 1) : 0;
  const mealChoice = attending ? String(formData.get("meal_choice") || "") : null;

  // upsert on invite_id — if a second person in the same household submits
  // later, this simply overwrites the first response rather than erroring.
  const { error } = await supabase
    .from("rsvps")
    .upsert(
      {
        invite_id: profile.invite_id,
        attending,
        guest_count: guestCount,
        meal_choice: mealChoice,
        submitted_at: new Date().toISOString(),
      },
      { onConflict: "invite_id" }
    );

  if (error) {
    redirect(`/rsvp?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/rsvp?saved=1");
}