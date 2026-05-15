import { ayresPalette } from "../ayres-palette";
import type { SvgAsset } from "../types";

export const residentialComfortAsset: SvgAsset = {
  filename: "ayres-residential-comfort.svg",
  title: "Residential comfort HVAC illustration",
  desc: "A simple Ayres Mechanical home comfort illustration with a house, thermostat, and airflow marks.",
  width: 720,
  height: 540,
  draw(svg) {
    svg.rect(720, 540).fill(ayresPalette.ice);
    svg.circle(260).center(560, 96).fill(ayresPalette.white).opacity(0.9);

    const house = svg.group().translate(110, 126);
    house.path("M42 188 250 30l208 158").fill("none").stroke({ color: ayresPalette.navy, width: 22, linejoin: "round" });
    house.rect(340, 230).move(80, 178).radius(18).fill(ayresPalette.white).stroke({ color: ayresPalette.blue, width: 10 });
    house.rect(80, 150).move(210, 258).radius(12).fill(ayresPalette.ice).stroke({ color: ayresPalette.navy, width: 8 });
    house.rect(70, 70).move(118, 236).radius(12).fill(ayresPalette.ice).stroke({ color: ayresPalette.blue, width: 8 });
    house.rect(70, 70).move(322, 236).radius(12).fill(ayresPalette.ice).stroke({ color: ayresPalette.blue, width: 8 });

    const thermostat = svg.group().translate(470, 238);
    thermostat.circle(104).fill(ayresPalette.white).stroke({ color: ayresPalette.red, width: 10 });
    thermostat.circle(58).center(52, 52).fill(ayresPalette.ice).stroke({ color: ayresPalette.navy, width: 6 });
    thermostat
      .text("72")
      .font({ family: "Arial, sans-serif", size: 26, weight: 800 })
      .fill(ayresPalette.navy)
      .center(52, 55);

    const vents = [
      "M116 92c62 28 118 28 180 0",
      "M128 126c52 22 100 22 152 0",
      "M140 160c42 16 80 16 122 0",
    ];

    for (const d of vents) {
      svg.path(d).fill("none").stroke({ color: ayresPalette.blue, width: 8, linecap: "round" }).opacity(0.5);
    }
  },
};
