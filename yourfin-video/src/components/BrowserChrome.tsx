import React from "react";
import { COLORS } from "../constants";

type BrowserChromeProps = {
  children: React.ReactNode;
  url?: string;
  width?: number | string;
  height?: number | string;
};

export const BrowserChrome: React.FC<BrowserChromeProps> = ({
  children,
  url = "yourfin.ai",
  width = "100%",
  height = "100%",
}) => {
  return (
    <div
      style={{
        width,
        height,
        background: COLORS.bg,
        borderRadius: 24,
        overflow: "hidden",
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 50,
          background: COLORS.surface,
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 12,
        }}
      >
        {/* Mac Traffic Lights */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
        </div>
        
        {/* URL Bar */}
        <div
          style={{
            flex: 1,
            height: 30,
            background: COLORS.bg,
            borderRadius: 8,
            border: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.text2,
            fontSize: 13,
            fontWeight: 500,
            margin: "0 24px",
          }}
        >
          {url}
        </div>
      </div>
      
      <div style={{ flex: 1, position: "relative" }}>{children}</div>
    </div>
  );
};
