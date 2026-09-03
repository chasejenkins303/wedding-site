import { linkPhone } from "./actions";

const COLORS = {
  stone: "#EAE5D8",
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

export default async function LinkPhonePage({
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
        input[type="tel"] {
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
      `}</style>

      <div style={{ width: "100%", maxWidth: 380 }}>
        <p style={{ fontSize: 13, letterSpacing: "0.02em", color: COLORS.brass, margin: "0 0 10px", textAlign: "center" }}>
          One more step
        </p>
        <h1 className="display" style={{ fontSize: 30, margin: "0 0 14px", textAlign: "center" }}>
          Find your invite
        </h1>
        <p style={{ fontSize: 15, color: COLORS.ink60, textAlign: "center", lineHeight: 1.6, margin: "0 0 28px" }}>
          Enter the phone number your invitation was sent to, and we'll link
          it to your account.
        </p>

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

        <form action={linkPhone} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label htmlFor="phone_number" style={{ display: "block", fontSize: 13, color: COLORS.ink60, marginBottom: 6 }}>
              Phone number
            </label>
            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              required
              placeholder="(555) 123-4567"
              autoComplete="tel"
            />
          </div>
          <button className="primary" type="submit" style={{ marginTop: 8 }}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}