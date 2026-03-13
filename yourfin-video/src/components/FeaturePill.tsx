import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, SPRING_SNAPPY } from "../constants";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["500"] });

export const FeaturePill: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: SPRING_SNAPPY,
  });

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        padding: "12px 20px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: COLORS.text1,
        fontFamily,
        fontSize: 15,
        fontWeight: 500,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        transform: `translateY(${translateY}px)`,
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};
