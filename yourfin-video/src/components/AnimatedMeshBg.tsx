import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const AnimatedMeshBg: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();

  // Mesh opacity pulses slightly over time (simulating 20s ease-in-out infinite alternate)
  const pulse = Math.sin(frame / 60) * 0.1 + 0.9; // varies between 0.8 and 1.0

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0f1e" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(99,102,241,0.12), transparent),
            radial-gradient(ellipse 60% 80% at 80% 70%, rgba(0,229,160,0.08), transparent)
          `,
          opacity: pulse,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
