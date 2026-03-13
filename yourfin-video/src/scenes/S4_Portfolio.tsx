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
import { BrowserChrome } from "../components/BrowserChrome";
import { DonutChart } from "../components/DonutChart";
import { InsightCard } from "../components/InsightCard";
import { COLORS } from "../constants";
import { rainbowStyle } from "../utils/rainbow";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const S4_Portfolio: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 16, mass: 0.8, stiffness: 100 } });
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <AnimatedMeshBg>
      <AbsoluteFill style={{ padding: 60, fontFamily }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `scale(${scale})`,
            opacity,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BrowserChrome url="app.yourfin.ai/portfolio" width={1400} height={800}>
            <div style={{ padding: "50px 80px", width: "100%", height: "100%", background: COLORS.bg, display: "flex", flexDirection: "column" }}>
              
              <Sequence from={10}>
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                  <h2 style={{ fontSize: 52, fontWeight: 800, color: COLORS.text1, letterSpacing: -1 }}>
                    Know exactly where <span style={rainbowStyle(frame)}>your wealth stands.</span>
                  </h2>
                </div>
              </Sequence>

              <div style={{ display: "flex", gap: 80, flex: 1, alignItems: "center" }}>
                {/* Left: Interactive Inputs */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                  <Sequence from={20}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                       <div style={{ padding: "8px 16px", borderRadius: 8, background: COLORS.primary, color: "#0a0f1e", fontWeight: 700, fontSize: 14 }}>🇻🇳 VND</div>
                       <div style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${COLORS.border}`, color: COLORS.text2, fontWeight: 600, fontSize: 14 }}>🇺🇸 USD</div>
                    </div>
                  </Sequence>

                  {[
                    { icon: "💰", label: "Cash & Savings", val: "50,000,000₫", delay: 25 },
                    { icon: "✨", label: "Gold (Vàng)", val: "30,000,000₫", delay: 35 },
                    { icon: "📈", label: "Stocks & Funds", val: "80,000,000₫", delay: 45 },
                    { icon: "🏠", label: "Real Estate", val: "200,000,000₫", delay: 55 },
                  ].map((item, idx) => {
                    const itemEntrance = spring({ frame: Math.max(0, frame - item.delay), fps, config: { damping: 14 } });
                    const itemY = interpolate(itemEntrance, [0, 1], [20, 0]);
                    const itemOpacity = interpolate(itemEntrance, [0, 1], [0, 1]);

                    return (
                      <div
                        key={item.label}
                        style={{
                          padding: 16,
                          borderRadius: 16,
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${idx === 2 ? COLORS.primary : COLORS.border}`,
                          boxShadow: idx === 2 ? "0 0 20px rgba(0,229,160,0.15)" : "none",
                          transform: `translateY(${itemY}px)`,
                          opacity: itemOpacity,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <span style={{ fontSize: 24 }}>{item.icon}</span>
                          <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.text1 }}>{item.label}</span>
                        </div>
                        <div
                          style={{
                            padding: "10px 16px",
                            borderRadius: 10,
                            border: `1px solid ${idx === 2 ? COLORS.primary : COLORS.border}`,
                            background: "rgba(255,255,255,0.04)",
                            color: COLORS.text1,
                            fontSize: 16,
                            fontWeight: 700,
                          }}
                        >
                          {item.val}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right: Analytics & Donut */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <Sequence from={35}>
                    <div
                      style={{
                        padding: 40,
                        borderRadius: 24,
                        background: "rgba(255,255,255,0.02)",
                        border: `1px solid ${COLORS.border}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <DonutChart size={280} />

                      {/* AI Insight pop at frame 80 */}
                      <div style={{ width: "100%", marginTop: 40 }}>
                        <Sequence from={80}>
                          <InsightCard
                            title="🤖 YourFin AI Insight"
                            text="Based on your portfolio, your risk level is Balanced. Great diversification! Keep monitoring your allocation quarterly."
                          />
                        </Sequence>
                      </div>
                    </div>
                  </Sequence>
                </div>
              </div>
            </div>
          </BrowserChrome>
        </div>
      </AbsoluteFill>
    </AnimatedMeshBg>
  );
};
