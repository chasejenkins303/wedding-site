"use client";

import { useState } from "react";
import { submitRsvp } from "./actions";

const COLORS = {
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

export default function RsvpForm({
  maxGuests,
  initialAttending,
  initialGuestCount,
  initialMealChoice,
}: {
  maxGuests: number;
  initialAttending: boolean | null;
  initialGuestCount: number;
  initialMealChoice: string;
}) {
  const [attending, setAttending] = useState<boolean | null>(initialAttending);

  return (
    <form action={submitRsvp} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <p style={{ fontSize: 13, color: COLORS.ink60, marginBottom: 10 }}>Will you be attending?</p>
        <div style={{ display: "flex", gap: 12 }}>
          <label
            style={{
              flex: 1,
              textAlign: "center",
              padding: "13px 14px",
              border: `1px solid ${attending === true ? COLORS.green : COLORS.line}`,
              background: attending === true ? COLORS.green : "transparent",
              color: attending === true ? "#fff" : COLORS.ink,
              borderRadius: 2,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={attending === true}
              onChange={() => setAttending(true)}
              style={{ display: "none" }}
            />
            Joyfully accept
          </label>
          <label
            style={{
              flex: 1,
              textAlign: "center",
              padding: "13px 14px",
              border: `1px solid ${attending === false ? COLORS.green : COLORS.line}`,
              background: attending === false ? COLORS.green : "transparent",
              color: attending === false ? "#fff" : COLORS.ink,
              borderRadius: 2,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <input
              type="radio"
              name="attending"
              value="no"
              checked={attending === false}
              onChange={() => setAttending(false)}
              style={{ display: "none" }}
            />
            Regretfully decline
          </label>
        </div>
      </div>

      {attending === true && (
        <>
          <div>
            <label htmlFor="guest_count" style={{ display: "block", fontSize: 13, color: COLORS.ink60, marginBottom: 6 }}>
              Number attending (up to {maxGuests})
            </label>
            <select
              id="guest_count"
              name="guest_count"
              defaultValue={initialGuestCount || 1}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontFamily: "'Jost', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: COLORS.ink,
                background: "#fff",
                border: `1px solid ${COLORS.line}`,
                borderRadius: 2,
              }}
            >
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="meal_choice" style={{ display: "block", fontSize: 13, color: COLORS.ink60, marginBottom: 6 }}>
              Meal notes (one line per guest is fine — e.g. "2 chicken, 1 vegetarian")
            </label>
            <textarea
              id="meal_choice"
              name="meal_choice"
              defaultValue={initialMealChoice}
              rows={3}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontFamily: "'Jost', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: COLORS.ink,
                background: "#fff",
                border: `1px solid ${COLORS.line}`,
                borderRadius: 2,
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={attending === null}
        style={{
          padding: "13px 14px",
          fontFamily: "'Jost', sans-serif",
          fontSize: 14,
          letterSpacing: "0.02em",
          fontWeight: 500,
          color: "#fff",
          background: attending === null ? COLORS.line : COLORS.green,
          border: "none",
          borderRadius: 2,
          cursor: attending === null ? "not-allowed" : "pointer",
        }}
      >
        Save RSVP
      </button>
    </form>
  );
}