import { signIn, signUp } from "./actions";

const COLORS = {
  stone: "#EAE5D8",
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.stone,
        color: COLORS.ink,
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
        .display { font-family: 'Fraunces', serif; font-weight: 500; }
        input[type="email"], input[type="password"] {
          width: 100%;
          padding: 12px 14px;
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: ${COLORS.ink};
          background: #fff;
          border: 1px solid ${COLORS.line};
          border-radius: 2px;
          box-sizing: border-box;
        }
        input:focus { outline: 2px solid ${COLORS.green}; outline-offset: 1px; }
        button.primary {
          width: 100%;
          padding: 13px 14px;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          letter-spacing: 0.02em;
          font-weight: 500;
          color: #fff;
          background: ${COLORS.green};
          border: none;
          border-radius: 2px;
          cursor: pointer;
        }
        button.secondary {
          width: 100%;
          padding: 13px 14px;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          letter-spacing: 0.02em;
          color: ${COLORS.green};
          background: transparent;
          border: 1px solid ${COLORS.green};
          border-radius: 2px;
          cursor: pointer;
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: 380 }}>
        <p style={{ fontSize: 13, letterSpacing: "0.02em", color: COLORS.ink60, margin: "0 0 10px", textAlign: "center" }}>
          Alex &amp; Jordan
        </p>
        <h1 className="display" style={{ fontSize: 32, margin: "0 0 32px", textAlign: "center" }}>
          Sign in to RSVP
        </h1>

        {error && (
          <p
            style={{
              background: "#F4E4E0",
              border: "1px solid #D9A8A0",
              color: "#7A2E22",
              fontSize: 14,
              padding: "10px 14px",
              borderRadius: 2,
              marginBottom: 20,
            }}
          >
            {error}
          </p>
        )}

        <form style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label htmlFor="email" style={{ display: "block", fontSize: 13, color: COLORS.ink60, marginBottom: 6 }}>
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="password" style={{ display: "block", fontSize: 13, color: COLORS.ink60, marginBottom: 6 }}>
              Password
            </label>
            <input id="password" name="password" type="password" required minLength={6} autoComplete="current-password" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            <button className="primary" formAction={signIn}>
              Sign in
            </button>
            <button className="secondary" formAction={signUp}>
              Create account
            </button>
          </div>
        </form>

        <p style={{ fontSize: 13, color: COLORS.ink60, textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
          First time here? Create an account, then you'll be asked for the
          phone number your invite was sent to.
        </p>
      </div>
    </div>
  );
}