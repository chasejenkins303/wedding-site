import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { toggleOvernightAccess, toggleAdmin } from "./actions";

const COLORS = {
  stone: "#EAE5D8",
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  const { data: myProfile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!myProfile?.is_admin) redirect("/rsvp");

  // From here down, use the service-role client — bypasses RLS so we can
  // see every household/account in one dashboard.
  const admin = createAdminClient();

  const [{ data: invites }, { data: profiles }, { data: rsvps }, { data: usersData }] =
    await Promise.all([
      admin.from("invites").select("*").order("household_name"),
      admin.from("profiles").select("*"),
      admin.from("rsvps").select("*"),
      admin.auth.admin.listUsers(),
    ]);

  const emailById = new Map(usersData?.users.map((u) => [u.id, u.email]));
  const rsvpByInvite = new Map(rsvps?.map((r) => [r.invite_id, r]));
  const profileByInvite = new Map(profiles?.filter((p) => p.invite_id)?.map((p) => [p.invite_id, p]));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.stone,
        color: COLORS.ink,
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        padding: "48px 24px 80px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
        .display { font-family: 'Fraunces', serif; font-weight: 500; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { text-align: left; font-weight: 500; color: ${COLORS.brass}; font-size: 12px; letter-spacing: 0.02em; padding: 10px 12px; border-bottom: 1px solid ${COLORS.line}; }
        td { padding: 12px; border-bottom: 1px solid ${COLORS.line}; vertical-align: top; }
        .pill-btn { font-family: 'Jost', sans-serif; font-size: 12px; padding: 5px 10px; border-radius: 12px; border: 1px solid ${COLORS.line}; background: #fff; cursor: pointer; }
        .pill-btn.on { background: ${COLORS.green}; color: #fff; border-color: ${COLORS.green}; }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.02em", color: COLORS.brass, margin: "0 0 6px" }}>Admin</p>
        <h1 className="display" style={{ fontSize: 32, margin: "0 0 40px" }}>
          Guest overview
        </h1>

        <div style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 4, overflow: "hidden" }}>
          <table>
            <thead>
              <tr>
                <th>Household</th>
                <th>Phone</th>
                <th>Account</th>
                <th>RSVP</th>
                <th>Guests</th>
                <th>Meal notes</th>
                <th>Overnight access</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {invites?.map((invite) => {
                const rsvp = rsvpByInvite.get(invite.id);
                const profile = profileByInvite.get(invite.id);
                const email = profile ? emailById.get(profile.id) : null;

                return (
                  <tr key={invite.id}>
                    <td>
                      <strong>{invite.household_name}</strong>
                    </td>
                    <td style={{ color: COLORS.ink60 }}>{invite.phone_number}</td>
                    <td style={{ color: email ? COLORS.ink : COLORS.ink60 }}>{email ?? "No account yet"}</td>
                    <td>
                      {!rsvp ? (
                        <span style={{ color: COLORS.ink60 }}>Not yet</span>
                      ) : rsvp.attending ? (
                        <span style={{ color: COLORS.green }}>Attending</span>
                      ) : (
                        <span style={{ color: "#7A2E22" }}>Declined</span>
                      )}
                    </td>
                    <td>{rsvp?.attending ? `${rsvp.guest_count} / ${invite.max_guests}` : "—"}</td>
                    <td style={{ color: COLORS.ink60, maxWidth: 220 }}>{rsvp?.meal_choice || "—"}</td>
                    <td>
                      <form action={toggleOvernightAccess}>
                        <input type="hidden" name="invite_id" value={invite.id} />
                        <input type="hidden" name="next" value={(!invite.overnight_access).toString()} />
                        <button type="submit" className={`pill-btn ${invite.overnight_access ? "on" : ""}`}>
                          {invite.overnight_access ? "Enabled" : "Disabled"}
                        </button>
                      </form>
                    </td>
                    <td>
                      {profile ? (
                        <form action={toggleAdmin}>
                          <input type="hidden" name="profile_id" value={profile.id} />
                          <input type="hidden" name="next" value={(!profile.is_admin).toString()} />
                          <button type="submit" className={`pill-btn ${profile.is_admin ? "on" : ""}`}>
                            {profile.is_admin ? "Admin" : "Guest"}
                          </button>
                        </form>
                      ) : (
                        <span style={{ color: COLORS.ink60 }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: 13, color: COLORS.ink60, marginTop: 20 }}>
          {invites?.length ?? 0} households ·{" "}
          {rsvps?.filter((r) => r.attending).length ?? 0} attending ·{" "}
          {rsvps?.filter((r) => r.attending === false).length ?? 0} declined ·{" "}
          {(invites?.length ?? 0) - (rsvps?.length ?? 0)} awaiting response
        </p>
      </div>
    </div>
  );
}