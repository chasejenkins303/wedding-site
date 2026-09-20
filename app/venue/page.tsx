import Link from "next/link";

const COLORS = {
  stone: "#EAE5D8",
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

export default function VenuePage() {
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
          Venue
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <section>
            <h2 className="display" style={{ fontSize: 20, margin: "0 0 10px", color: COLORS.green }}>
              The Orchard House
            </h2>
            <p style={{ color: COLORS.ink60, lineHeight: 1.7, fontSize: 15, margin: 0 }}>
              1420 Hollow Creek Road, Asheville, NC
            </p>
          </section>

          <section>
            <h2 className="display" style={{ fontSize: 20, margin: "0 0 10px", color: COLORS.green }}>
              Directions
            </h2>
            <p style={{ color: COLORS.ink60, lineHeight: 1.7, fontSize: 15, margin: 0 }}>
              From downtown Asheville, take Hollow Creek Road up the ridge —
              the entrance is on your right about a quarter mile past the
              orchard sign, roughly 25 minutes from downtown. GPS sometimes
              routes around the last turn; watch for our directional signs
              near the top.
            </p>
          </section>

          <section>
            <h2 className="display" style={{ fontSize: 20, margin: "0 0 10px", color: COLORS.green }}>
              Parking &amp; shuttle
            </h2>
            <p style={{ color: COLORS.ink60, lineHeight: 1.7, fontSize: 15, margin: 0 }}>
              Parking is available at the base of the property. A shuttle will
              run guests up and down the hill throughout the evening — no need
              to walk the drive or worry about parking closer to the top.
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