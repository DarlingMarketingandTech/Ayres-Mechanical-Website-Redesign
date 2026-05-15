import type { Svg } from "@svgdotjs/svg.js";

export type SvgAsset = {
  filename: `${string}.svg`;
  title: string;
  desc: string;
  width: number;
  height: number;
  draw: (svg: Svg) => void;
};
