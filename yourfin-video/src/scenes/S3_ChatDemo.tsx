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
import { ChatBubble } from "../components/ChatBubble";
import { COLORS, SPRING_SNAPPY } from "../constants";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

export const S3_ChatDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Full screen, slightly zoomed in look
  const zoom = spring({ frame, fps, config: { damping: 16, mass: 0.8, stiffness: 100 } });
  const scale = interpolate(zoom, [0, 1], [0.9, 1]);
  const opacity = interpolate(zoom, [0, 1], [0, 1]);

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
          <BrowserChrome url="app.yourfin.ai/chat" width={1400} height={800}>
            <div style={{ width: "100%", height: "100%", background: COLORS.bg, display: "flex", flexDirection: "column" }}>
              
              {/* Header */}
              <div style={{ padding: "24px 40px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.02)" }}>
                 <div style={{ width: 36, height: 36, borderRadius: "50%", background: "conic-gradient(from 180deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>Y</div>
                 <div>
                   <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text1 }}>YourFin AI Assistant</div>
                   <div style={{ fontSize: 13, color: COLORS.primary, display: "flex", alignItems: "center", gap: 6 }}>
                     <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.primary, boxShadow: `0 0 10px ${COLORS.primary}` }} />
                     Online
                   </div>
                 </div>
              </div>

              {/* Chat Area */}
              <div style={{ flex: 1, padding: "50px 80px", display: "flex", flexDirection: "column", gap: 40, background: "rgba(255,255,255,0.01)" }}>
                 
                 {/* User ask - Frame 15 */}
                 <Sequence from={15}>
                   <div style={{ alignSelf: "flex-end", width: "60%" }}>
                     <ChatBubble 
                       text="What's the difference between saving and investing?" 
                       sender="user" 
                     />
                   </div>
                 </Sequence>

                 {/* AI reply - Frame 50 */}
                 <Sequence from={50}>
                   <div style={{ alignSelf: "flex-start", width: "70%" }}>
                     <ChatBubble 
                       text="Simple:\n\n💰 Saving = protect money (0–3 yrs)\n📈 Investing = grow money (5+ yrs)" 
                       sender="ai" 
                       useTypewriter
                       typeSpeed={1.5}
                     />
                   </div>
                 </Sequence>

                 {/* AI detailed reply - Frame 110 */}
                 <Sequence from={110}>
                    <div style={{ alignSelf: "flex-start", width: "70%" }}>
                       <ChatBubble 
                         text="Savings: safe, ~4–6%/yr\nInvesting: higher risk, higher potential\n\nBoth matter. Most people only do one. Which one do you want to focus on today?" 
                         sender="ai" 
                         useTypewriter
                         typeSpeed={1.5}
                       />
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
