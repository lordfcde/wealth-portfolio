import React from "react";
import { COLORS } from "../constants";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["600", "800", "900"], subsets: ["latin"] });

export const Logo: React.FC<{ size?: number }> = ({ size = 64 }) => {
  const innerSize = size * 0.9;
  
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.25, fontFamily, textDecoration: "none" }}>
      {/* Y Monogram */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "conic-gradient(from 180deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: size * 0.05,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: COLORS.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: size * 0.45,
              background: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Y
          </span>
        </div>
      </div>

      {/* Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontSize: size * 0.22,
            fontWeight: 600,
            color: COLORS.text2,
            letterSpacing: Math.max(1, size * 0.04),
            textTransform: "uppercase",
          }}
        >
          YOUR
        </span>
        <span
          style={{
            fontSize: size * 0.55,
            fontWeight: 900,
            background: "linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c77dff)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginTop: -size * 0.02,
          }}
        >
          Fin
        </span>
      </div>
    </div>
  );
};
