"use client";

import { useEffect, useState } from "react";

const NAMES = {
  first: "Claire",
  second: "Chase",
};

const WEDDING_DATE = new Date(2027, 7, 14, 17, 0);

const DETAILS = [
  {
    label: "Date",
    value: "Saturday, August 14, 2027",
    note: "Ceremony begins promptly at 5:00 PM",
  },
  {
    label: "Reception",
    value: "Cocktails & dinner to follow",
    note: "6:00 PM until midnight",
  },
  {
    label: "Venue",
    value: "Twickenham House",
    note: "1329 Phoenix Colvard Rd, Jefferson, NC 28640",
  },
  {
    label: "Dress code",
    value: "Gym shorts and stained shirts",
    note: "Don't know yet",
  },
];

const COLORS = {
  stone: "#EAE5D8",
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(
    target.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const id = setInterval(() => {
      setDiff(target.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  const done = diff <= 0;

  const days = Math.max(0, Math.floor(diff / 86400000));
  const hours = Math.max(
    0,
    Math.floor((diff % 86400000) / 3600000)
  );
  const mins = Math.max(
    0,
    Math.floor((diff % 3600000) / 60000)
  );
  const secs = Math.max(
    0,
    Math.floor((diff % 60000) / 1000)
  );

  return {
    done,
    days,
    hours,
    mins,
    secs,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function BotanicalLine() {
  return (
    <svg
      viewBox="0 0 220 320"
      fill="none"
      style={{
        width: "100%",
        height: "auto",
      }}
      aria-hidden="true"
    >
      <path
        d="M110 300 C108 220 112 140 110 30"
        stroke={COLORS.green}
        strokeWidth="1.4"
      />

      <path
        d="M110 260 C90 250 65 252 48 235 C65 240 90 240 110 246"
        stroke={COLORS.green}
        strokeWidth="1.4"
      />

      <path
        d="M110 210 C130 198 155 200 172 182 C155 190 130 192 110 198"
        stroke={COLORS.green}
        strokeWidth="1.4"
      />

      <path
        d="M110 160 C92 150 70 152 55 136 C70 142 92 142 110 148"
        stroke={COLORS.green}
        strokeWidth="1.4"
      />

      <path
        d="M110 110 C128 100 150 102 165 86 C150 94 128 96 110 100"
        stroke={COLORS.green}
        strokeWidth="1.4"
      />

      <circle
        cx="110"
        cy="30"
        r="5"
        stroke={COLORS.brass}
        strokeWidth="1.4"
      />
    </svg>
  );
}

type CountdownItem = {
  label: string;
  value: number;
};

export default function WeddingSite() {
  const { done, days, hours, mins, secs } =
    useCountdown(WEDDING_DATE);

  const countdownItems: CountdownItem[] = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: mins },
    { label: "Seconds", value: secs },
  ];

  return (
    <main
      style={{
        background: COLORS.stone,
        color: COLORS.ink,
        minHeight: "100vh",
        fontFamily: "var(--font-jost), sans-serif",
        fontWeight: 300,
      }}
    >
      {/* HERO */}
      <section
        style={{
          position: "relative",
        }}
      >
        <div
          className="wrap hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            alignItems: "center",
            gap: 40,
            minHeight: "100vh",
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 13,
                letterSpacing: "0.02em",
                color: COLORS.ink60,
                margin: "0 0 18px",
              }}
            >
              Together with their families
            </p>

            <h1
              className="display"
              style={{
                fontSize: "clamp(48px, 8vw, 108px)",
                lineHeight: 0.98,
                margin: 0,
                fontWeight: 500,
              }}
            >
              {NAMES.first}

              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: COLORS.green,
                  display: "block",
                  fontSize: "0.5em",
                  margin: "6px 0",
                }}
              >
                &amp; {NAMES.second}
              </em>
            </h1>

            <p
              style={{
                margin: "26px 0 0",
                maxWidth: "30ch",
                fontSize: 17,
                color: COLORS.ink60,
                lineHeight: 1.6,
              }}
            >
              We&apos;re getting married, and we&apos;d love for you
              to be there when we do. More details below.
            </p>
          </div>

          <div className="hero-figure">
            <BotanicalLine />
          </div>
        </div>

        <div className="scroll-cue">
          <span />
          Scroll
        </div>
      </section>

      <hr className="rule" />

      {/* COUNTDOWN */}
      <section>
        <div className="wrap section-padding">
          <p className="section-label">Counting down</p>

          <h2 className="display section-heading">
            Until we say &quot;I do&quot;
          </h2>

          {done ? (
            <p
              className="display"
              style={{
                fontStyle: "italic",
                fontSize: "clamp(28px, 5vw, 44px)",
                color: COLORS.green,
              }}
            >
              Today&apos;s the day.
            </p>
          ) : (
            <div className="countdown-grid">
              {countdownItems.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    textAlign: "left",
                    paddingRight: 24,
                    borderRight:
                      i < countdownItems.length - 1
                        ? `1px solid ${COLORS.line}`
                        : "none",
                  }}
                >
                  <span
                    className="display"
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      fontSize: "clamp(40px, 7vw, 84px)",
                      fontWeight: 300,
                      lineHeight: 1,
                      display: "block",
                    }}
                  >
                    {pad(item.value)}
                  </span>

                  <span
                    style={{
                      display: "block",
                      marginTop: 14,
                      fontSize: 13,
                      color: COLORS.ink60,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <hr className="rule" />

      {/* DETAILS */}
      <section>
        <div className="wrap section-padding">
          <p className="section-label">The details</p>

          <h2 className="display section-heading">
            When &amp; where
          </h2>

          <div className="details-grid">
            {DETAILS.map((detail) => (
              <div
                key={detail.label}
                style={{
                  paddingBottom: 28,
                  borderBottom: `1px solid ${COLORS.line}`,
                }}
              >
                <dt
                  style={{
                    fontSize: 13,
                    color: COLORS.brass,
                    marginBottom: 8,
                  }}
                >
                  {detail.label}
                </dt>

                <dd
                  className="display"
                  style={{
                    margin: 0,
                    fontSize: 21,
                    fontWeight: 400,
                    lineHeight: 1.4,
                  }}
                >
                  {detail.value}

                  <small
                    style={{
                      display: "block",
                      fontFamily:
                        "var(--font-jost), sans-serif",
                      fontSize: 15,
                      color: COLORS.ink60,
                      marginTop: 4,
                      fontWeight: 300,
                    }}
                  >
                    {detail.note}
                  </small>
                </dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "56px 0 48px",
          textAlign: "center",
        }}
      >
        <p
          className="display"
          style={{
            fontSize: 22,
            fontStyle: "italic",
            color: COLORS.green,
          }}
        >
          With love, {NAMES.first} &amp; {NAMES.second}
        </p>

        <p
          style={{
            color: COLORS.ink60,
            fontSize: 14,
            marginTop: 10,
          }}
        >
          We can&apos;t wait to celebrate with you.
        </p>
      </footer>
    </main>
  );
}
