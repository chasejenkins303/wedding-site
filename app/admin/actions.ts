"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/rsvp");
}

export async function toggleOvernightAccess(formData: FormData) {
  await assertAdmin();
  const inviteId = String(formData.get("invite_id"));
  const next = formData.get("next") === "true";

  const admin = createAdminClient();
  await admin.from("invites").update({ overnight_access: next }).eq("id", inviteId);

  revalidatePath("/admin");
}

export async function toggleAdmin(formData: FormData) {
  await assertAdmin();
  const profileId = String(formData.get("profile_id"));
  const next = formData.get("next") === "true";

  const admin = createAdminClient();
  await admin.from("profiles").update({ is_admin: next }).eq("id", profileId);

  revalidatePath("/admin");
}