export const ayresPalette = {
  blue: "#064B8A",
  navy: "#082B49",
  red: "#D51F2A",
  ice: "#F3F8FC",
  white: "#FFFFFF",
} as const;

export type AyresColor = (typeof ayresPalette)[keyof typeof ayresPalette];
