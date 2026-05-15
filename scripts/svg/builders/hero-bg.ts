import { curveBasis, line } from "d3-shape";

import { ayresPalette } from "../ayres-palette";
import type { SvgAsset } from "../types";

const waveLine = line<[number, number]>()
  .x(([x]) => x)
  .y(([, y]) => y)
  .curve(curveBasis);

export const heroBackgroundAsset: SvgAsset = {
  filename: "ayres-hero-airflow-bg.svg",
  title: "Ayres Mechanical airflow hero background",
  desc: "Abstract blue HVAC airflow ribbons with a red Ayres accent for use behind hero content.",
  width: 1440,
  height: 720,
  draw(svg) {
    svg.rect(1440, 720).fill(ayresPalette.navy);
    svg.circle(620).center(1160, 120).fill(ayresPalette.blue).opacity(0.35);
    svg.circle(360).center(260, 620).fill(ayresPalette.ice).opacity(0.08);

    const ribbons: Array<{ points: Array<[number, number]>; color: string; width: number; opacity: number }> = [
      {
        points: [
          [-80, 210],
          [240, 145],
          [520, 205],
          [820, 120],
          [1140, 180],
          [1510, 90],
        ],
        color: ayresPalette.ice,
        width: 28,
        opacity: 0.42,
      },
      {
        points: [
          [-100, 390],
          [180, 305],
          [430, 360],
          [760, 285],
          [1030, 345],
          [1510, 260],
        ],
        color: ayresPalette.blue,
        width: 36,
        opacity: 0.66,
      },
      {
        points: [
          [-60, 535],
          [220, 475],
          [500, 535],
          [805, 455],
          [1080, 500],
          [1500, 430],
        ],
        color: ayresPalette.white,
        width: 18,
        opacity: 0.24,
      },
    ];

    for (const ribbon of ribbons) {
      const d = waveLine(ribbon.points);

      if (!d) {
        continue;
      }

      svg
        .path(d)
        .fill("none")
        .stroke({ color: ribbon.color, width: ribbon.width, linecap: "round" })
        .opacity(ribbon.opacity);
    }

    svg
      .path("M1040 560 1132 420 1224 560Z")
      .fill(ayresPalette.red)
      .opacity(0.88);
    svg
      .path("M1040 584h184l-92 136Z")
      .fill(ayresPalette.ice)
      .opacity(0.16);
  },
};
