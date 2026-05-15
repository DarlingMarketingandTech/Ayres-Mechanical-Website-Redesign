import rough from "roughjs";

import { ayresPalette } from "../ayres-palette";
import { appendRoughElement } from "../svg-helpers";
import type { SvgAsset } from "../types";

export const maintenanceChecklistAsset: SvgAsset = {
  filename: "ayres-maintenance-checklist.svg",
  title: "HVAC maintenance checklist illustration",
  desc: "A friendly sketch-style maintenance checklist for local Ayres Mechanical service content.",
  width: 640,
  height: 640,
  draw(svg) {
    svg.rect(640, 640).fill(ayresPalette.ice);

    const roughSvg = rough.svg(svg.node);
    const sketchOptions = {
      roughness: 1.4,
      bowing: 1.2,
      seed: 12,
      strokeWidth: 4,
      stroke: ayresPalette.navy,
      fillStyle: "hachure",
      fillWeight: 1.2,
      hachureGap: 12,
    };

    appendRoughElement(
      svg,
      roughSvg.rectangle(132, 84, 376, 468, {
        ...sketchOptions,
        fill: ayresPalette.white,
      }),
    );
    appendRoughElement(
      svg,
      roughSvg.rectangle(220, 54, 200, 72, {
        ...sketchOptions,
        fill: ayresPalette.ice,
      }),
    );

    const checklistItems = [
      ["Change filter", 170],
      ["Check airflow", 250],
      ["Test thermostat", 330],
      ["Inspect unit", 410],
    ] as const;

    for (const [label, y] of checklistItems) {
      appendRoughElement(
        svg,
        roughSvg.rectangle(174, y - 20, 34, 34, {
          ...sketchOptions,
          fill: ayresPalette.ice,
        }),
      );
      svg
        .path(`M180 ${y - 4} 190 ${y + 8} 210 ${y - 14}`)
        .fill("none")
        .stroke({ color: ayresPalette.red, width: 6, linecap: "round", linejoin: "round" });
      svg
        .text(label)
        .font({ family: "Arial, sans-serif", size: 24, weight: 700 })
        .fill(ayresPalette.navy)
        .move(236, y - 22);
    }

    appendRoughElement(
      svg,
      roughSvg.circle(486, 498, 82, {
        roughness: 1.5,
        seed: 28,
        stroke: ayresPalette.red,
        strokeWidth: 5,
        fill: ayresPalette.white,
        fillStyle: "dots",
      }),
    );
    svg
      .text("24/7")
      .font({ family: "Arial, sans-serif", size: 24, weight: 900 })
      .fill(ayresPalette.red)
      .center(486, 504);
  },
};
