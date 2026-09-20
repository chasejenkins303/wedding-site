import Link from "next/link";

const COLORS = {
  stone: "#EAE5D8",
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

export default function DressCodePage() {
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
          Dress code
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <section>
            <h2 className="display" style={{ fontSize: 20, margin: "0 0 10px", color: COLORS.green }}>
              Garden formal
            </h2>
            <p style={{ color: COLORS.ink60, lineHeight: 1.7, fontSize: 15, margin: 0 }}>
              Think elevated but comfortable outdoors — soft, natural colors
              work best against the orchard setting. Suits or sport coats for
              men, cocktail or midi dresses for women. Avoid all-white
              (reserved for the bride) and heavy dark suits that will be warm
              in the evening sun.
            </p>
          </section>

          <section>
            <h2 className="display" style={{ fontSize: 20, margin: "0 0 10px", color: COLORS.green }}>
              A few examples
            </h2>
            <ul style={{ margin: 0, paddingLeft: 20, color: COLORS.ink60, lineHeight: 1.9, fontSize: 15 }}>
              <li>Linen or lightweight suit, tie optional</li>
              <li>Sage, dusty blue, terracotta, or cream tones</li>
              <li>Floral or solid midi/maxi dresses</li>
              <li>Dressy sandals, block heels, or loafers</li>
            </ul>
          </section>

          <section>
            <h2 className="display" style={{ fontSize: 20, margin: "0 0 10px", color: COLORS.green }}>
              About the hill
            </h2>
            <p style={{ color: COLORS.ink60, lineHeight: 1.7, fontSize: 15, margin: 0 }}>
              There's a shuttle running guests up and down the drive all
              evening, so you don't need walking shoes for the hill unless you
              want the stroll — heels and dress shoes are completely fine.
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