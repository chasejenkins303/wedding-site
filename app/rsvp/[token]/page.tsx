import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import RsvpForm from "./rsvp-form";

const COLORS = {
  stone: "#EAE5D8",
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

export default async function RsvpTokenPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { token } = await params;
  const { error, saved } = await searchParams;

  const supabase = await createClient();

  const { data: inviteRows } = await supabase.rpc("get_invite_by_token", { p_token: token });
  const invite = inviteRows?.[0];

  if (!invite) notFound();

  const { data: rsvpRows } = await supabase.rpc("get_rsvp_by_token", { p_token: token });
  const rsvp = rsvpRows?.[0];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.stone,
        color: COLORS.ink,
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        padding: "64px 24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
        .display { font-family: 'Fraunces', serif; font-weight: 500; }
      `}</style>

      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.02em", color: COLORS.brass, margin: "0 0 10px", textAlign: "center" }}>
          {invite.household_name}
        </p>
        <h1 className="display" style={{ fontSize: 34, margin: "0 0 12px", textAlign: "center" }}>
          You're invited
        </h1>
        <p style={{ fontSize: 15, color: COLORS.ink60, textAlign: "center", lineHeight: 1.6, margin: "0 0 36px" }}>
          Let us know if you'll be joining us — and how many from your household.
        </p>

        {saved && (
          <p
            style={{
              background: "#E4EDE5",
              border: "1px solid #A9C4AC",
              color: COLORS.green,
              fontSize: 14,
              padding: "10px 14px",
              borderRadius: 2,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Your RSVP has been saved.
          </p>
        )}        {error && (
          <p
            style={{
              background: "#F4E4E0",
              border: "1px solid #D9A8A0",
              color: "#7A2E22",
              fontSize: 14,
              padding: "10px 14px",
              borderRadius: 2,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <RsvpForm
          token={token}
          maxGuests={invite.max_guests}
          initialAttending={rsvp?.attending ?? null}
          initialGuestCount={rsvp?.guest_count ?? 1}
          initialMealChoice={rsvp?.meal_choice ?? ""}
        />
      </div>
    </div>
  );
}