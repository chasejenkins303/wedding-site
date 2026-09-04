import LoginForm from "./login-form";

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
  searchParams: Promise<{ error?: string; next?: string; mode?: string }>;
}) {
  const { error, next, mode } = await searchParams;
  const initialMode = mode === "signup" ? "signup" : "signin";

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
      `}</style>

      <div style={{ width: "100%", maxWidth: 380 }}>
        <p style={{ fontSize: 13, letterSpacing: "0.02em", color: COLORS.ink60, margin: "0 0 10px", textAlign: "center" }}>
          Alex &amp; Jordan
        </p>
        <h1 className="display" style={{ fontSize: 32, margin: "0 0 32px", textAlign: "center" }}>
          Sign in
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

        <LoginForm next={next ?? "/"} initialMode={initialMode} />

        <p style={{ fontSize: 13, color: COLORS.ink60, textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
          First time here? You'll need the phone number your invite was
          sent to — we use it to find your household.
        </p>
      </div>
    </div>
  );
}