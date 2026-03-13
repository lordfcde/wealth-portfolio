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
import { PhoneMockup } from "../components/PhoneMockup";
import { ChatBubble } from "../components/ChatBubble";
import { FeaturePill } from "../components/FeaturePill";
import { COLORS, SPRING_SNAPPY } from "../constants";
import { rainbowStyle } from "../utils/rainbow";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "800"],
  subsets: ["latin"],
});

export const S2_NavbarHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Browser zooms in
  const browserZoom = spring({ frame, fps, config: { damping: 16, mass: 0.8, stiffness: 100 } });
  const scale = interpolate(browserZoom, [0, 1], [0.9, 1]);
  const opacity = interpolate(browserZoom, [0, 1], [0, 1]);

  // Phone slides up more smoothly
  const phoneEntrance = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 16, mass: 1, stiffness: 120 } });
  const phoneY = interpolate(phoneEntrance, [0, 1], [400, 0]);

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
          <BrowserChrome url="yourfin.app" width={1400} height={800}>
             {/* Sub-background matching web app surface */}
             <div style={{ position: "absolute", inset: 0, background: COLORS.bg }} />
             <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 75% 50%, rgba(0,229,160,0.08), transparent 50%)" }} />

            <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", zIndex: 1 }}>
              
              {/* Left side: Hero Text */}
              <div style={{ flex: 1.1, padding: "100px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Sequence from={15}>
                  <div style={{ 
                    display: "inline-flex", padding: "10px 20px", borderRadius: 100, 
                    background: "rgba(255,255,255,0.05)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.08)", color: COLORS.text2,
                    fontSize: 14, fontWeight: 500, marginBottom: 30, width: "fit-content"
                  }}>
                    <span style={{ marginRight: 8 }}>✨</span> IFY 2026 · Ekaterinburg, Russia
                  </div>
                </Sequence>
                
                <h1 style={{ fontSize: 72, fontWeight: 800, color: COLORS.text1, lineHeight: 1.15, marginBottom: 24, letterSpacing: -2 }}>
                  Your money deserves<br/>
                  <span style={rainbowStyle(frame)}>a better teacher.</span>
                </h1>

                <Sequence from={40}>
                  <div style={{ fontSize: 18, color: COLORS.text2, lineHeight: 1.7, maxWidth: 520 }}>
                    YourFin is an AI companion that teaches young people to think clearly about money — without the jargon, the judgment, or the $300/hour advisor.
                  </div>
                </Sequence>

                <Sequence from={55}>
                  <div
                    style={{
                      marginTop: 40,
                      padding: "18px 36px",
                      background: COLORS.primary,
                      color: "#0a0f1e",
                      borderRadius: 14,
                      fontSize: 18,
                      fontWeight: 700,
                      width: "fit-content",
                      boxShadow: "0 10px 30px rgba(0,229,160,0.3)",
                      transition: "transform 0.2s",
                    }}
                  >
                    Try YourFin Free →
                  </div>
                </Sequence>
              </div>

              {/* Right side: Phone Mockup & Floating Cards */}
              <div style={{ flex: 0.9, display: "flex", justifyContent: "center", alignItems: "flex-end", paddingBottom: 40, position: "relative" }}>
                
                <div style={{ transform: `translateY(${phoneY}px)`, opacity: phoneEntrance, position: "relative", zIndex: 2 }}>
                  <PhoneMockup>
                       <Sequence from={25}>
                         <ChatBubble text="How should I allocate my 10M salary?" sender="user" />
                       </Sequence>
                       <Sequence from={60}>
                         <ChatBubble text="Let's use the 50/30/20 rule! 50% for needs, 30% for wants, 20% for savings." sender="ai" useTypewriter typeSpeed={1.5} />
                       </Sequence>
                  </PhoneMockup>
                </div>

                {/* Floating Pills */}
                <Sequence from={45}>
                  <div style={{ position: "absolute", top: 120, right: 20, zIndex: 3 }}>
                    <FeaturePill text="50/30/20 Rule ✓" delay={0} />
                  </div>
                </Sequence>
                <Sequence from={55}>
                  <div style={{ position: "absolute", bottom: 180, left: -20, zIndex: 3 }}>
                    <FeaturePill text="Emergency Fund 🏦" delay={0} />
                  </div>
                </Sequence>

              </div>
            </div>
          </BrowserChrome>
        </div>
      </AbsoluteFill>
    </AnimatedMeshBg>
  );
};
