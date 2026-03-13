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
import { WorldMap } from "../components/WorldMap";
import { COLORS, SPRING_SNAPPY } from "../constants";
import { rainbowStyle } from "../utils/rainbow";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const S5_IFY2026: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animations
  const contentEntrance = spring({ frame: Math.max(0, frame - 10), fps, config: SPRING_SNAPPY });
  const contentY = interpolate(contentEntrance, [0, 1], [40, 0]);
  const contentOp = interpolate(contentEntrance, [0, 1], [0, 1]);

  return (
    <AnimatedMeshBg>
      <AbsoluteFill style={{ fontFamily }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "80px 120px",
          }}
        >
          <div style={{ textAlign: "center", transform: `translateY(${contentY}px)`, opacity: contentOp, marginBottom: 60 }}>
            <div style={{ display: "inline-flex", padding: "8px 16px", borderRadius: 100, background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)", color: COLORS.primary, fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
               🌐 International Festival of Youth 2026
            </div>
            
            <h2 style={{ fontSize: 64, fontWeight: 800, color: COLORS.text1, letterSpacing: -1, marginBottom: 24, lineHeight: 1.1 }}>
              Taking YourFin <span style={rainbowStyle(frame)}>to the world.</span>
            </h2>

            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
               <div style={{ padding: "8px 20px", background: "rgba(236,72,153,0.12)", color: "#ec4899", border: "1px solid rgba(236,72,153,0.2)", borderRadius: 100, fontSize: 14, fontWeight: 600 }}>
                 September 11–17
               </div>
               <div style={{ padding: "8px 20px", background: "rgba(0,229,160,0.1)", color: COLORS.primary, border: "1px solid rgba(0,229,160,0.2)", borderRadius: 100, fontSize: 14, fontWeight: 600 }}>
                 Ekaterinburg, Russia
               </div>
            </div>
          </div>

          <div style={{ display: "flex", width: "100%", gap: 60, alignItems: "center" }}>
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20, fontSize: 16, color: COLORS.text2, lineHeight: 1.8 }}>
               <Sequence from={20}>
                 <p>The gap between financial stability and struggle is almost never about intelligence. <strong>It is almost always about access.</strong> YourFin is our answer to that gap.</p>
               </Sequence>
               <Sequence from={40}>
                 <div style={{ marginTop: 20, padding: 32, borderRadius: 16, background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${COLORS.accent}` }}>
                    <div style={{ fontSize: 18, fontStyle: "italic", color: COLORS.text1, marginBottom: 12 }}>
                      "The financial questions I had to find on my own should be the questions every young person finds on day one."
                    </div>
                    <div style={{ fontSize: 14, color: COLORS.text2 }}>
                       — Nguyen Tuan Vinh<br/>
                       Founder, YourFin | FPT University HCMC
                    </div>
                 </div>
               </Sequence>
            </div>

            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
               <Sequence from={30}>
                 <WorldMap width={800} height={400} />
               </Sequence>
            </div>

          </div>

        </div>
      </AbsoluteFill>
    </AnimatedMeshBg>
  );
};
