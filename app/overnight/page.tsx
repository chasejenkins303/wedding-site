import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const COLORS = {
  stone: "#EAE5D8",
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

export default async function OvernightPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("invite_id")
    .eq("id", user.id)
    .single();

  if (!profile?.invite_id) redirect("/link-phone");

  const { data: invite } = await supabase
    .from("invites")
    .select("overnight_access")
    .eq("id", profile.invite_id)
    .single();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.stone,
        color: COLORS.ink,
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        padding: "64px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
        .display { font-family: 'Fraunces', serif; font-weight: 500; }
      `}</style>

      <div style={{ maxWidth: 480, textAlign: "center" }}>
        {invite?.overnight_access ? (
          <>
            <p style={{ fontSize: 13, letterSpacing: "0.02em", color: COLORS.brass, margin: "0 0 10px" }}>
              For those staying the night
            </p>
            <h1 className="display" style={{ fontSize: 32, margin: "0 0 16px" }}>
              Overnight details
            </h1>
            {/* STUB — replace with real lodging info once finalized */}
            <p style={{ fontSize: 15, color: COLORS.ink60, lineHeight: 1.7 }}>
              Details on where to stay, room blocks, and check-in are coming
              soon — check back closer to the date.
            </p>
          </>
        ) : (
          <>
            <h1 className="display" style={{ fontSize: 28, margin: "0 0 16px" }}>
              Not applicable to your invite
            </h1>
            <p style={{ fontSize: 15, color: COLORS.ink60, lineHeight: 1.7 }}>
              This section is for guests staying overnight. If you think
              that's you, reach out to us directly.
            </p>
          </>
        )}

        <p style={{ marginTop: 32 }}>
          <Link href="/rsvp" style={{ color: COLORS.green, fontSize: 14 }}>
            ← Back to RSVP
          </Link>
        </p>
      </div>
    </div>
  );
}