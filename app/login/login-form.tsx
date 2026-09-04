"use client";

import { useState } from "react";
import { signIn, signUp } from "./actions";

const COLORS = {
  ink: "#2C2A24",
  ink60: "#6B6759",
  green: "#3F5240",
  brass: "#A6803F",
  line: "#C9C2AC",
};

export default function LoginForm({
  next,
  initialMode,
}: {
  next: string;
  initialMode: "signin" | "signup";
}) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  return (
    <div>
      <div
        style={{
          display: "flex",
          border: `1px solid ${COLORS.line}`,
          borderRadius: 2,
          overflow: "hidden",
          marginBottom: 24,
        }}
      >
        <button
          type="button"
          onClick={() => setMode("signin")}
          style={{
            flex: 1,
            padding: "11px 14px",
            fontFamily: "'Jost', sans-serif",
            fontSize: 13,
            letterSpacing: "0.02em",
            border: "none",
            cursor: "pointer",
            background: mode === "signin" ? COLORS.green : "transparent",
            color: mode === "signin" ? "#fff" : COLORS.ink60,
          }}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          style={{
            flex: 1,
            padding: "11px 14px",
            fontFamily: "'Jost', sans-serif",
            fontSize: 13,
            letterSpacing: "0.02em",
            border: "none",
            cursor: "pointer",
            background: mode === "signup" ? COLORS.green : "transparent",
            color: mode === "signup" ? "#fff" : COLORS.ink60,
          }}
        >
          Create account
        </button>
      </div>

      <form action={mode === "signin" ? signIn : signUp} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input type="hidden" name="next" value={next} />

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
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
          />
        </div>

        {mode === "signup" && (
          <>
            <div>
              <label htmlFor="confirm_password" style={{ display: "block", fontSize: 13, color: COLORS.ink60, marginBottom: 6 }}>
                Confirm password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="phone_number" style={{ display: "block", fontSize: 13, color: COLORS.ink60, marginBottom: 6 }}>
                Phone number your invite was sent to
              </label>
              <input id="phone_number" name="phone_number" type="tel" required placeholder="(555) 123-4567" autoComplete="tel" />
            </div>
          </>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "13px 14px",
            fontFamily: "'Jost', sans-serif",
            fontSize: 14,
            letterSpacing: "0.02em",
            fontWeight: 500,
            color: "#fff",
            background: COLORS.green,
            border: "none",
            borderRadius: 2,
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          Enter
        </button>
      </form>
    </div>
  );
}