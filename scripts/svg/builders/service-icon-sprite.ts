import { ayresPalette } from "../ayres-palette";
import { makeSvgElement } from "../svg-helpers";
import type { SvgAsset } from "../types";

type IconSymbol = {
  id: string;
  title: string;
  desc: string;
  paths: Array<{ d: string; fill?: string; stroke?: string; width?: number }>;
};

const iconSymbols: IconSymbol[] = [
  {
    id: "service-icon-ac",
    title: "Air conditioning service icon",
    desc: "A simplified outdoor condenser with cooling airflow.",
    paths: [
      { d: "M14 22h36v26H14Z", fill: ayresPalette.ice, stroke: ayresPalette.navy, width: 4 },
      { d: "M22 30h20M22 38h20", stroke: ayresPalette.blue, width: 4 },
      { d: "M19 16c8-6 18-6 26 0", stroke: ayresPalette.red, width: 4 },
    ],
  },
  {
    id: "service-icon-furnace",
    title: "Furnace service icon",
    desc: "A simplified furnace cabinet with warm airflow.",
    paths: [
      { d: "M18 10h28v44H18Z", fill: ayresPalette.white, stroke: ayresPalette.navy, width: 4 },
      { d: "M24 18h16M24 28h16M24 38h16", stroke: ayresPalette.blue, width: 3 },
      { d: "M27 51c0-8 10-8 10-18 6 8 8 13 0 18", fill: ayresPalette.red },
    ],
  },
  {
    id: "service-icon-thermostat",
    title: "Thermostat service icon",
    desc: "A round thermostat set for indoor comfort.",
    paths: [
      { d: "M16 16a22 22 0 1 0 32 0 22 22 0 0 0-32 0", fill: ayresPalette.white, stroke: ayresPalette.navy, width: 4 },
      { d: "M25 32h14", stroke: ayresPalette.red, width: 4 },
      { d: "M32 25v14", stroke: ayresPalette.blue, width: 4 },
    ],
  },
  {
    id: "service-icon-ductwork",
    title: "Ductwork service icon",
    desc: "Ductwork with directional airflow arrows.",
    paths: [
      { d: "M10 25h32l12 7-12 7H10Z", fill: ayresPalette.ice, stroke: ayresPalette.navy, width: 4 },
      { d: "M18 32h20", stroke: ayresPalette.blue, width: 4 },
      { d: "m38 24 10 8-10 8", stroke: ayresPalette.red, width: 4 },
    ],
  },
  {
    id: "service-icon-emergency",
    title: "Emergency service icon",
    desc: "A warning badge for urgent HVAC service.",
    paths: [
      { d: "M32 8 56 52H8Z", fill: ayresPalette.red, stroke: ayresPalette.navy, width: 4 },
      { d: "M32 22v14", stroke: ayresPalette.white, width: 5 },
      { d: "M32 44h.1", stroke: ayresPalette.white, width: 6 },
    ],
  },
  {
    id: "service-icon-maintenance",
    title: "Maintenance plan icon",
    desc: "A checklist badge for routine HVAC maintenance.",
    paths: [
      { d: "M17 10h30v44H17Z", fill: ayresPalette.white, stroke: ayresPalette.navy, width: 4 },
      { d: "m23 24 4 4 8-10M23 39l4 4 8-10", stroke: ayresPalette.red, width: 4 },
      { d: "M39 25h8M39 40h8", stroke: ayresPalette.blue, width: 4 },
    ],
  },
];

export const serviceIconSpriteAsset: SvgAsset = {
  filename: "service-icon-sprite.svg",
  title: "Ayres Mechanical service icon sprite",
  desc: "Reusable SVG symbols for HVAC services including cooling, heating, thermostats, ductwork, emergency service, and maintenance.",
  width: 64,
  height: 64,
  draw(svg) {
    const defs = makeSvgElement(svg, "defs");
    svg.node.appendChild(defs);

    for (const icon of iconSymbols) {
      const symbol = makeSvgElement(svg, "symbol");
      symbol.setAttribute("id", icon.id);
      symbol.setAttribute("viewBox", "0 0 64 64");

      const title = makeSvgElement(svg, "title");
      title.textContent = icon.title;
      symbol.appendChild(title);

      const desc = makeSvgElement(svg, "desc");
      desc.textContent = icon.desc;
      symbol.appendChild(desc);

      for (const pathConfig of icon.paths) {
        const path = makeSvgElement(svg, "path");
        path.setAttribute("d", pathConfig.d);
        path.setAttribute("fill", pathConfig.fill ?? "none");
        path.setAttribute("stroke", pathConfig.stroke ?? "none");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");

        if (pathConfig.width) {
          path.setAttribute("stroke-width", String(pathConfig.width));
        }

        symbol.appendChild(path);
      }

      defs.appendChild(symbol);
    }
  },
};
