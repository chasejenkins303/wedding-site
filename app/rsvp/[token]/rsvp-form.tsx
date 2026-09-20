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
  token,
  guestNames,
  initialAttending,
  initialAttendingGuests,
  initialMealChoice,
}: {
  token: string;
  guestNames: string[];
  initialAttending: boolean | null;
  initialAttendingGuests: string[];
  initialMealChoice: string;
}) {
  const [attending, setAttending] = useState<boolean | null>(initialAttending);

  // Default: everyone in the household checked, unless they've already
  // submitted before — then reflect exactly who they last checked off.
  const [checked, setChecked] = useState<Set<string>>(
    new Set(initialAttendingGuests.length > 0 ? initialAttendingGuests : guestNames)
  );

  const toggle = (name: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <form action={submitRsvp} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <input type="hidden" name="token" value={token} />

      <div>
        <p style={{ fontSize: 13, color: COLORS.ink60, marginBottom: 10 }}>Will anyone from your household be attending?</p>
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
            <p style={{ fontSize: 13, color: COLORS.ink60, marginBottom: 10 }}>Who's coming?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {guestNames.map((name) => (
                <label
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    border: `1px solid ${checked.has(name) ? COLORS.green : COLORS.line}`,
                    borderRadius: 2,
                    cursor: "pointer",
                    fontSize: 15,
                    background: checked.has(name) ? "rgba(63, 82, 64, 0.06)" : "transparent",
                  }}
                >
                  <input
                    type="checkbox"
                    name="attending_guest"
                    value={name}
                    checked={checked.has(name)}
                    onChange={() => toggle(name)}
                  />
                  {name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="meal_choice" style={{ display: "block", fontSize: 13, color: COLORS.ink60, marginBottom: 6 }}>
              Meal notes (one line per guest is fine — e.g. "Alex: chicken, Sam: vegetarian")
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
        disabled={attending === null || (attending === true && checked.size === 0)}
        style={{
          padding: "13px 14px",
          fontFamily: "'Jost', sans-serif",
          fontSize: 14,
          letterSpacing: "0.02em",
          fontWeight: 500,
          color: "#fff",
          background: attending === null || (attending === true && checked.size === 0) ? COLORS.line : COLORS.green,
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