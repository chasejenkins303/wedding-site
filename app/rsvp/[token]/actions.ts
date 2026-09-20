"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function submitRsvp(formData: FormData) {
  const token = String(formData.get("token") || "");
  const attending = formData.get("attending") === "yes";
  const attendingGuests = attending ? formData.getAll("attending_guest").map(String) : [];
  const mealChoice = attending ? String(formData.get("meal_choice") || "") : null;

  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_rsvp_by_token", {
    p_token: token,
    p_attending: attending,
    p_attending_guests: attendingGuests,
    p_meal_choice: mealChoice,
  });

  if (error) {
    redirect(`/rsvp/${token}?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/rsvp/${token}?saved=1`);
}