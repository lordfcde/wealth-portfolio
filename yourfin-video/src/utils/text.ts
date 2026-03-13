// Text animation helpers per rules/text-animations.md

export const splitWords = (text: string): string[] => text.split(" ");

export const splitChars = (text: string): string[] => text.split("");

// Typewriter: returns visible substring based on frame
export const typewriter = (
  text: string,
  frame: number,
  speed: number = 1.5
): string => {
  const chars = text.split("");
  const visibleCount = Math.min(
    chars.length,
    Math.floor(frame / speed)
  );
  return chars.slice(0, visibleCount).join("");
};

// Cursor blink: returns true if cursor should be visible
export const cursorVisible = (frame: number, interval: number = 15): boolean =>
  Math.floor(frame / interval) % 2 === 0;
