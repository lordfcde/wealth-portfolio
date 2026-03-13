import React from "react";
import { COLORS } from "../constants";

type PhoneMockupProps = {
  children: React.ReactNode;
};

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ children }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Phone Glow */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 600,
          borderRadius: 48,
          background: "radial-gradient(ellipse at center, rgba(0,229,160,0.3), transparent 70%)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />
      
      {/* Phone Body */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: 320,
          height: 640,
          borderRadius: 48,
          background: "#12141c",
          padding: 12,
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            height: 30,
            background: "#12141c",
            borderRadius: "0 0 16px 16px",
            zIndex: 10,
          }}
        />

        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 36,
            background: COLORS.bg,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Inner content wrapper with padding-top to avoid notch overlap */}
          <div style={{ flex: 1, paddingTop: 50, paddingBottom: 20, paddingLeft: 16, paddingRight: 16, display: "flex", flexDirection: "column", gap: 16 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
