export const rainbowStyle = (frame: number) => {
  const position = (frame * 1.5) % 200;
  return {
    background:
      "linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c77dff, #ff6b6b)",
    backgroundSize: "300% 300%",
    backgroundPositionY: "50%",
    backgroundPositionX: `${position}%`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
  };
};
