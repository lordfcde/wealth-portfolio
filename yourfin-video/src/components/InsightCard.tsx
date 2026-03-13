import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Sparkles } from "lucide-react";
import { COLORS, SPRING_SNAPPY } from "../constants";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["500", "700"], subsets: ["latin"] });

export const InsightCard: React.FC<{ title: string; text: string }> = ({ title, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: SPRING_SNAPPY });
  const scale = interpolate(entrance, [0, 1], [0.95, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        padding: 24,
        borderRadius: 20,
        background: "rgba(99,102,241,0.06)",
        border: "1px solid rgba(99,102,241,0.15)",
        transform: `scale(${scale})`,
        opacity,
        fontFamily,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.accent, marginBottom: 12 }}>
        <Sparkles size={18} />
        <span style={{ fontSize: 15, fontWeight: 700 }}>{title}</span>
      </div>
      <div style={{ fontSize: 14, color: COLORS.text2, lineHeight: 1.6 }}>
        {text}
      </div>
    </div>
  );
};
