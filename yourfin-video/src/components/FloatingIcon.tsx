import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, SPRING_BOUNCE } from "../constants";

type FloatingIconProps = {
  children: React.ReactNode;
  color?: string;
  index?: number;
  fromX?: number;
  fromY?: number;
};

export const FloatingIcon: React.FC<FloatingIconProps> = ({
  children,
  color = COLORS.primary,
  index = 0,
  fromX = 0,
  fromY = 30,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: SPRING_BOUNCE });
  const opacity = interpolate(entrance, [0, 1], [0, 0.6]);
  const translateX = interpolate(entrance, [0, 1], [fromX, 0]);
  const translateY = interpolate(entrance, [0, 1], [fromY, 0]);

  // Floating sin wave after entrance
  const floatY = Math.sin((frame + index * 20) / fps * Math.PI) * 8;

  return (
    <div
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY + floatY}px)`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
