import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/logout/actions";

const COLORS = {
  ink60: "#6B6759",
  green: "#3F5240",
};

const linkStyle = {
  fontFamily: "'Jost', sans-serif",
  fontSize: 13,
  letterSpacing: "0.02em",
  color: COLORS.green,
  textDecoration: "none",
};

export default async function HomeNav() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  let hasOvernightAccess = false;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin, invite_id")
      .eq("id", user.id)
      .single();

    isAdmin = profile?.is_admin ?? false;

    if (profile?.invite_id) {
      const { data: invite } = await supabase
        .from("invites")
        .select("overnight_access")
        .eq("id", profile.invite_id)
        .single();
      hasOvernightAccess = invite?.overnight_access ?? false;
    }
  }

  return (
    <nav
      style={{
        position: "absolute",
        top: 24,
        right: 32,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      {user ? (
        <>
          <Link href="/" style={linkStyle}>
            Home
          </Link>
          {hasOvernightAccess && (
            <Link href="/overnight" style={linkStyle}>
              Overnight info
            </Link>
          )}
          {isAdmin && (
            <Link href="/admin" style={linkStyle}>
              Admin
            </Link>
          )}
          <Link href="/rsvp" style={linkStyle}>
            RSVP
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              style={{
                ...linkStyle,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </form>
        </>
      ) : (
        <Link href="/login" style={linkStyle}>
          Login
        </Link>
      )}
    </nav>
  );
}