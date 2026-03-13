import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const DATA = [
  { value: 53.3, color: "#ef4444" }, // Real Estate (Red)
  { value: 21.3, color: "#6366f1" }, // Stocks (Indigo)
  { value: 13.3, color: "#00e5a0" }, // Cash (Green)
  { value: 8.0, color: "#f59e0b" },  // Gold (Orange)
  { value: 4.1, color: "#8b5cf6" },  // Other (Purple)
];

export const DonutChart: React.FC<{ size?: number }> = ({ size = 260 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const anim = spring({ frame, fps, config: { damping: 200 } });
  
  // Calculate stroke dasharray for multiple donut segments
  const pathRadius = size / 2 - 20;
  const pathLength = 2 * Math.PI * pathRadius;

  let currentOffset = 0;

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {/* Background Track */}
      <svg width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={pathRadius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={size * 0.15}
        />
      </svg>

      {/* Segments */}
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        {DATA.map((item, i) => {
          const segmentLength = (item.value / 100) * pathLength;
          const strokeDasharray = `${segmentLength} ${pathLength}`;
          const renderLength = interpolate(anim, [0, 1], [0, segmentLength]);
          const animatedDasharray = `${renderLength} ${pathLength}`;
          
          const offsetAmount = -currentOffset;
          currentOffset += segmentLength;

          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={pathRadius}
              fill="none"
              stroke={item.color}
              strokeWidth={size * 0.15}
              strokeDasharray={animatedDasharray}
              strokeDashoffset={offsetAmount}
              strokeLinecap={anim > 0.99 ? "butt" : "round"} // prevent overlap gap at ends
              style={{ transition: "all 0.1s linear" }}
            />
          );
        })}
      </svg>
      
      {/* Inner Hole text */}
      <div
        style={{
          position: "absolute",
          inset: size * 0.25,
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#111827",
        }}
      >
         <div style={{ fontSize: size * 0.05, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>
           Total Assets
         </div>
         <div style={{ fontSize: size * 0.1, fontWeight: 800, color: "#f0f4f8", marginTop: 4 }}>
           375M₫
         </div>
      </div>
    </div>
  );
};
