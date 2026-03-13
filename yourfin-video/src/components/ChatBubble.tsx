import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, SPRING_SNAPPY } from "../constants";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

type ChatBubbleProps = {
  text: string;
  sender: "user" | "ai";
  icon?: React.ReactNode;
  label?: string;
  useTypewriter?: boolean;
  typeSpeed?: number;
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  text,
  sender,
  icon,
  label,
  useTypewriter = false,
  typeSpeed = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isUser = sender === "user";

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const scale = interpolate(entrance, [0, 1], [0.8, 1]);
  const translateY = interpolate(entrance, [0, 1], [20, 0]);

  // Typing effect logic
  const charsToShow = useTypewriter ? Math.floor(frame * typeSpeed) : text.length;
  const isTyping = charsToShow < text.length;

  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "85%",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: entrance,
        fontFamily,
        transformOrigin: isUser ? "bottom right" : "bottom left",
      }}
    >
      {label && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 4, marginBottom: 2 }}>
          {icon}
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text2 }}>{label}</span>
        </div>
      )}

      <div
        style={{
          padding: "16px 20px",
          borderRadius: 24,
          borderBottomRightRadius: isUser ? 6 : 24,
          borderBottomLeftRadius: !isUser ? 6 : 24,
          background: isUser ? COLORS.primary : "rgba(255,255,255,0.06)",
          color: isUser ? "#0a0f1e" : COLORS.text1,
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
          fontSize: 16,
          lineHeight: 1.5,
          fontWeight: isUser ? 500 : 400,
          position: "relative",
          boxShadow: isUser ? "0 10px 25px rgba(0,229,160,0.2)" : "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        {/* Transparent exact copy to reserve space and prevent jumping */}
        <div style={{ opacity: 0, whiteSpace: "pre-wrap" }}>{text}</div>
        
        {/* Actual visible text overlay */}
        <div style={{ position: "absolute", top: 16, left: 20, right: 20, whiteSpace: "pre-wrap" }}>
          {useTypewriter ? text.slice(0, Math.max(0, charsToShow)) : text}
          {useTypewriter && isTyping && (
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 18,
                marginLeft: 4,
                backgroundColor: isUser ? "#0a0f1e" : COLORS.primary,
                verticalAlign: "text-bottom",
                opacity: (frame % 30 < 15) ? 1 : 0,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
