import { area, curveCatmullRom, line } from "d3-shape";

import { ayresPalette } from "../ayres-palette";
import type { SvgAsset } from "../types";

const smoothLine = line<[number, number]>()
  .x(([x]) => x)
  .y(([, y]) => y)
  .curve(curveCatmullRom.alpha(0.5));

const smoothArea = area<[number, number]>()
  .x(([x]) => x)
  .y0(320)
  .y1(([, y]) => y)
  .curve(curveCatmullRom.alpha(0.5));

export const airflowWavesAsset: SvgAsset = {
  filename: "ayres-airflow-waves.svg",
  title: "Ayres Mechanical heating and cooling airflow waves",
  desc: "Layered red and blue wave paths representing heating, cooling, and steady indoor airflow.",
  width: 960,
  height: 360,
  draw(svg) {
    svg.rect(960, 360).fill(ayresPalette.ice);

    const coolPoints: Array<[number, number]> = [
      [0, 210],
      [130, 155],
      [265, 210],
      [405, 142],
      [555, 205],
      [710, 150],
      [960, 190],
    ];
    const heatPoints: Array<[number, number]> = [
      [0, 265],
      [120, 305],
      [280, 250],
      [430, 294],
      [585, 238],
      [735, 280],
      [960, 230],
    ];
    const comfortArea = smoothArea([
      [0, 145],
      [125, 120],
      [270, 140],
      [430, 92],
      [610, 130],
      [760, 88],
      [960, 120],
    ]);

    if (comfortArea) {
      svg.path(comfortArea).fill(ayresPalette.white).opacity(0.78);
    }

    for (let index = 0; index < 4; index += 1) {
      const offset = index * 28;
      const coolPath = smoothLine(coolPoints.map(([x, y]) => [x, y - offset] as [number, number]));
      const heatPath = smoothLine(heatPoints.map(([x, y]) => [x, y + offset / 2] as [number, number]));

      if (coolPath) {
        svg
          .path(coolPath)
          .fill("none")
          .stroke({ color: ayresPalette.blue, width: 10 - index, linecap: "round" })
          .opacity(0.62 - index * 0.11);
      }

      if (heatPath) {
        svg
          .path(heatPath)
          .fill("none")
          .stroke({ color: ayresPalette.red, width: 8 - index, linecap: "round" })
          .opacity(0.48 - index * 0.09);
      }
    }

    svg
      .text("comfort airflow")
      .font({ family: "Arial, sans-serif", size: 28, weight: 700 })
      .fill(ayresPalette.navy)
      .move(56, 52);
  },
};
