import Link from "next/link";

const COLORS = {
  stone: "#EAE5D8",
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

export default function ReceptionPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.stone,
        color: COLORS.ink,
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        padding: "64px 24px 96px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=Jost:wght@300;400;500&display=swap');
        .display { font-family: 'Fraunces', serif; font-weight: 500; }
      `}</style>

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <p style={{ fontSize: 13, color: COLORS.brass, margin: "0 0 10px" }}>The details</p>
        <h1 className="display" style={{ fontSize: "clamp(32px, 5vw, 44px)", margin: "0 0 40px" }}>
          Reception
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <section>
            <h2 className="display" style={{ fontSize: 20, margin: "0 0 10px", color: COLORS.green }}>
              Timeline
            </h2>
            <ul style={{ margin: 0, paddingLeft: 20, color: COLORS.ink60, lineHeight: 1.9, fontSize: 15 }}>
              <li>5:00 PM — Cocktail hour</li>
              <li>6:00 PM — Guests seated, welcome toast</li>
              <li>6:15 PM — Dinner service</li>
              <li>7:30 PM — Speeches</li>
              <li>8:00 PM — First dance, dancing continues</li>
              <li>12:00 AM — Send-off</li>
            </ul>
          </section>

          <section>
            <h2 className="display" style={{ fontSize: 20, margin: "0 0 10px", color: COLORS.green }}>
              Food &amp; drink
            </h2>
            <p style={{ color: COLORS.ink60, lineHeight: 1.7, fontSize: 15, margin: 0 }}>
              Plated dinner with a choice of entrée (noted on your RSVP), passed
              hors d'oeuvres during cocktail hour, and an open bar all evening.
              Vegetarian and gluten-free options are available — just note it in
              your RSVP's meal comments.
            </p>
          </section>

          <section>
            <h2 className="display" style={{ fontSize: 20, margin: "0 0 10px", color: COLORS.green }}>
              Other notes
            </h2>
            <p style={{ color: COLORS.ink60, lineHeight: 1.7, fontSize: 15, margin: 0 }}>
              The reception is at the same venue as the ceremony, so no need to
              travel in between — cocktail hour starts right after photos.
            </p>
          </section>
        </div>

        <p style={{ marginTop: 48 }}>
          <Link href="/" style={{ color: COLORS.green, fontSize: 14 }}>
            ← Back home
          </Link>
        </p>
      </div>
    </div>
  );
}