import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { COLORS, SPRING_GENTLE } from "../constants";

// Simplified world map SVG path (continents outline)
const WORLD_PATH =
  "M120,120 L140,100 L180,95 L210,100 L240,110 L260,95 L300,90 L340,100 L380,95 L420,100 L460,110 L500,100 L540,95 L560,100 L580,110 L600,120 " +
  "M140,140 L160,160 L170,200 L150,240 L140,260 " +
  "M280,110 L290,130 L310,160 L330,180 L350,200 L340,240 L320,270 L300,280 " +
  "M380,100 L400,120 L420,140 L440,160 L460,180 L480,170 L500,160 L520,170 L540,180 L520,200 L500,220 L480,240 " +
  "M560,120 L580,140 L600,160 L620,200 L640,240 L660,260 " +
  "M680,200 L720,190 L760,200 L780,220 L760,250 L720,260 L680,250" ;

type WorldMapProps = {
  width?: number;
  height?: number;
};

export const WorldMap: React.FC<WorldMapProps> = ({
  width = 800,
  height = 400,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Map draws in
  const mapOpacity = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  // Vietnam dot — approximate position
  const vnX = 555;
  const vnY = 175;
  // Russia dot
  const ruX = 440;
  const ruY = 100;

  // Vietnam dot pulse
  const vnPulse = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: SPRING_GENTLE,
  });
  const vnPulseR = interpolate(
    (frame - 10) % 45,
    [0, 44],
    [6, 22],
    { extrapolateRight: "clamp" }
  );
  const vnPulseOpacity = interpolate(
    (frame - 10) % 45,
    [0, 44],
    [0.6, 0],
    { extrapolateRight: "clamp" }
  );

  // Russia dot pulse
  const ruPulse = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: SPRING_GENTLE,
  });
  const ruPulseR = interpolate(
    (frame - 20) % 45,
    [0, 44],
    [6, 22],
    { extrapolateRight: "clamp" }
  );
  const ruPulseOpacity = interpolate(
    (frame - 20) % 45,
    [0, 44],
    [0.6, 0],
    { extrapolateRight: "clamp" }
  );

  // Dashed path from VN to Russia
  const pathD = `M ${vnX} ${vnY} Q ${(vnX + ruX) / 2} ${Math.min(vnY, ruY) - 60} ${ruX} ${ruY}`;
  const pathLength = 400;
  const dashProgress = interpolate(
    frame,
    [25, 65],
    [pathLength, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 800 400"
      style={{ opacity: mapOpacity }}
    >
      {/* World outline */}
      <path
        d={WORLD_PATH}
        fill="none"
        stroke="#C7D2FE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
      />

      {/* Continental fill blobs */}
      <ellipse cx="300" cy="180" rx="100" ry="80" fill="#EDE9FE" opacity={0.3} />
      <ellipse cx="500" cy="170" rx="120" ry="70" fill="#EDE9FE" opacity={0.3} />
      <ellipse cx="160" cy="170" rx="50" ry="60" fill="#EDE9FE" opacity={0.3} />
      <ellipse cx="720" cy="230" rx="50" ry="30" fill="#EDE9FE" opacity={0.3} />

      {/* Dashed path VN → Russia */}
      <path
        d={pathD}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={2}
        strokeDasharray="6 4"
        strokeDashoffset={dashProgress}
      />

      {/* Vietnam dot */}
      <circle cx={vnX} cy={vnY} r={vnPulseR} fill={COLORS.primary} opacity={frame > 10 ? vnPulseOpacity : 0} />
      <circle cx={vnX} cy={vnY} r={6} fill={COLORS.primary} opacity={vnPulse} />

      {/* Russia dot */}
      <circle cx={ruX} cy={ruY} r={ruPulseR} fill={COLORS.accent} opacity={frame > 20 ? ruPulseOpacity : 0} />
      <circle cx={ruX} cy={ruY} r={6} fill={COLORS.accent} opacity={ruPulse} />

      {/* Labels */}
      <text x={vnX + 12} y={vnY + 5} fontSize={11} fill={COLORS.primary} fontWeight={600}>
        Vietnam 🇻🇳
      </text>
      <text x={ruX + 12} y={ruY - 8} fontSize={11} fill={COLORS.accent} fontWeight={600}>
        Russia 🇷🇺
      </text>
    </svg>
  );
};
