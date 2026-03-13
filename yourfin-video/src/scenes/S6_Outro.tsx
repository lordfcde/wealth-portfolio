import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { AnimatedMeshBg } from "../components/AnimatedMeshBg";
import { Logo } from "../components/Logo";
import { COLORS, SPRING_SNAPPY } from "../constants";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const S6_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const entrance = spring({ frame: Math.max(0, frame - 10), fps, config: SPRING_SNAPPY });
  const y = interpolate(entrance, [0, 1], [40, 0]);
  const op = interpolate(entrance, [0, 1], [0, 1]);

  // Glow pulse for button
  const pulse = Math.sin(frame / 10) * 0.15 + 0.85; // oscillates 0.7 to 1.0
  const shadowSpread = Math.sin(frame / 10) * 10 + 20;

  return (
    <AnimatedMeshBg>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 60,
          fontFamily,
          padding: 80,
        }}
      >
        <Sequence from={10}>
          <div style={{ opacity: op, transform: `translateY(${y}px)`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
             <h2 style={{ fontSize: 64, fontWeight: 800, color: COLORS.text1, letterSpacing: -1, marginBottom: 16 }}>
                Start your financial education <br/>
                <span style={{ 
                  background: "linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c77dff, #ff6b6b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  today.
                </span>
             </h2>
             <div style={{ fontSize: 24, color: COLORS.text2 }}>
               Free. No sign-up. No judgment. Just ask.
             </div>
          </div>
        </Sequence>

        <Sequence from={30}>
          <div
            style={{
              padding: "20px 60px",
              background: COLORS.primary,
              color: "#0a0f1e",
              fontSize: 24,
              fontWeight: 700,
              borderRadius: 999,
              textAlign: "center",
              transform: `scale(${pulse})`,
              boxShadow: `0 0 ${shadowSpread}px rgba(0,229,160,0.6)`,
            }}
          >
            Try YourFin Free →
          </div>
        </Sequence>

        <Sequence from={50}>
           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, marginTop: 40 }}>
             <Logo size={100} />
             <div style={{ height: 2, width: 400, borderRadius: 2, background: "linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c77dff)" }} />
           </div>
        </Sequence>

      </AbsoluteFill>
    </AnimatedMeshBg>
  );
};
