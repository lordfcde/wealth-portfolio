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
import { typewriter, cursorVisible } from "../utils/text";
import { COLORS } from "../constants";
import { rainbowStyle } from "../utils/rainbow";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

export const S1_HeroReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagline = "Your money deserves";
  const taglineRainbow = "a better teacher.";
  
  const typedTagline = typewriter(tagline, Math.max(0, frame - 40), 1.5);
  const isTypingTagline = typedTagline.length < tagline.length;
  
  const startFrameRainbow = 40 + (tagline.length / 1.5);
  const typedRainbow = typewriter(taglineRainbow, Math.max(0, frame - startFrameRainbow), 1.5);
  const isTypingRainbow = typedRainbow.length < taglineRainbow.length;
  
  const showCursor = frame >= 40 && cursorVisible(frame);

  // Logo floats up
  const logoEntrance = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14 } });
  const logoY = interpolate(logoEntrance, [0, 1], [30, 0]);
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, 1]);

  return (
    <AnimatedMeshBg>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontFamily,
        }}
      >
        <Sequence from={10}>
          <div
            style={{
              transform: `translateY(${logoY}px)`,
              opacity: logoOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Logo size={180} />
          </div>
        </Sequence>

        <Sequence from={40}>
          <div
            style={{
              position: "absolute",
              top: "62%",
              width: "100%",
              textAlign: "center",
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.text1,
              letterSpacing: "-0.02em",
              display: "flex",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {typedTagline}
            <span style={{ ...rainbowStyle(frame) }}>
              {typedRainbow}
            </span>
            {showCursor && (
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: 36,
                  backgroundColor: isTypingRainbow ? "#6bcb77" : COLORS.text1,
                  verticalAlign: "text-bottom",
                  opacity: (isTypingTagline || isTypingRainbow) ? 1 : 0.5,
                }}
              />
            )}
          </div>
        </Sequence>
      </AbsoluteFill>
    </AnimatedMeshBg>
  );
};
