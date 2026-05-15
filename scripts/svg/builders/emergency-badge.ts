import { ayresPalette } from "../ayres-palette";
import type { SvgAsset } from "../types";

export const emergencyBadgeAsset: SvgAsset = {
  filename: "ayres-emergency-badge.svg",
  title: "Emergency HVAC service badge",
  desc: "A bold red and blue emergency service badge for urgent Ayres Mechanical calls.",
  width: 520,
  height: 520,
  draw(svg) {
    svg.rect(520, 520).fill(ayresPalette.white);
    svg.circle(390).center(260, 260).fill(ayresPalette.ice);
    svg.circle(292).center(260, 260).fill(ayresPalette.white).stroke({ color: ayresPalette.navy, width: 16 });

    svg
      .circle(340)
      .center(260, 260)
      .fill("none")
      .stroke({ color: ayresPalette.red, width: 28, linecap: "round" })
      .attr({ "stroke-dasharray": "760 320" })
      .rotate(-132, 260, 260);

    svg.path("M210 236 260 150l50 86h-34v88h-32v-88Z").fill(ayresPalette.red);
    svg.path("M190 348h140").stroke({ color: ayresPalette.blue, width: 16, linecap: "round" });

    svg
      .text("EMERGENCY")
      .font({ family: "Arial, sans-serif", size: 34, weight: 900 })
      .fill(ayresPalette.navy)
      .center(260, 384);
    svg
      .text("SERVICE")
      .font({ family: "Arial, sans-serif", size: 34, weight: 900 })
      .fill(ayresPalette.red)
      .center(260, 426);
  },
};
