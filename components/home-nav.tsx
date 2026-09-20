import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/logout/actions";

const COLORS = {
  stone: "#EAE5D8",
  ink60: "#6B6759",
  green: "#3F5240",
  line: "#C9C2AC",
};

const linkStyle = {
  fontFamily: "'Jost', sans-serif",
  fontSize: 13,
  letterSpacing: "0.02em",
  color: COLORS.green,
  textDecoration: "none",
};

// The single site-wide nav — rendered once in app/layout.tsx, present on
// every page. Guest links (RSVP/Overnight) come from the guest_token
// cookie, set by middleware the moment a token shows up anywhere. Admin
// links come from the real Supabase session. Both, either, or neither can
// be true at once; the nav just reflects whatever's actually the case, so
// the whole site is freely navigable regardless of which page someone
// lands on first.
export default async function HomeNav() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const token = cookieStore.get("guest_token")?.value;

  const [
    {
      data: { user },
    },
    inviteResult,
  ] = await Promise.all([
    supabase.auth.getUser(),
    token ? supabase.rpc("get_invite_by_token", { p_token: token }) : Promise.resolve({ data: null }),
  ]);

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    isAdmin = profile?.is_admin ?? false;
  }

  const invite = inviteResult?.data?.[0] ?? null;

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: `1px solid ${COLORS.line}`,
        background: COLORS.stone,
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <Link href="/" style={{ ...linkStyle, color: COLORS.ink60 }}>
        Home
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link href={token ? `/rsvp/${token}` : "/rsvp"} style={linkStyle}>
          RSVP
        </Link>

        {token && invite?.overnight_access && (
          <Link href={`/overnight/${token}`} style={linkStyle}>
            Overnight
          </Link>
        )}

        {isAdmin && (
          <>
            <Link href="/admin" style={linkStyle}>
              Admin
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                style={{ ...linkStyle, background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                Logout
              </button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
}