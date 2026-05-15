import { ayresPalette } from "../ayres-palette";
import type { SvgAsset } from "../types";

export const commercialRooftopAsset: SvgAsset = {
  filename: "ayres-commercial-rooftop.svg",
  title: "Commercial rooftop HVAC unit illustration",
  desc: "A clean commercial building with rooftop HVAC equipment and Ayres Mechanical airflow accents.",
  width: 720,
  height: 520,
  draw(svg) {
    svg.rect(720, 520).fill(ayresPalette.white);
    svg.rect(720, 160).move(0, 360).fill(ayresPalette.ice);

    const building = svg.group().translate(86, 178);
    building.rect(548, 232).radius(18).fill(ayresPalette.ice).stroke({ color: ayresPalette.navy, width: 10 });
    building.rect(548, 44).fill(ayresPalette.blue).move(0, 0);

    for (let row = 0; row < 2; row += 1) {
      for (let column = 0; column < 6; column += 1) {
        building
          .rect(54, 42)
          .radius(8)
          .fill(ayresPalette.white)
          .move(46 + column * 78, 78 + row * 72)
          .opacity(0.92);
      }
    }

    const unit = svg.group().translate(240, 96);
    unit.rect(242, 104).radius(16).fill(ayresPalette.white).stroke({ color: ayresPalette.navy, width: 10 });
    unit.rect(86, 58).radius(10).fill(ayresPalette.ice).move(22, 22).stroke({ color: ayresPalette.blue, width: 6 });
    unit.rect(86, 58).radius(10).fill(ayresPalette.ice).move(134, 22).stroke({ color: ayresPalette.blue, width: 6 });
    unit.line(44, 51, 86, 51).stroke({ color: ayresPalette.blue, width: 6, linecap: "round" });
    unit.line(156, 51, 198, 51).stroke({ color: ayresPalette.blue, width: 6, linecap: "round" });

    const airflow = [
      "M180 100c-58-34-96-34-154 0",
      "M532 100c58-34 96-34 154 0",
      "M240 70c70-54 168-54 238 0",
    ];

    for (const d of airflow) {
      svg.path(d).fill("none").stroke({ color: ayresPalette.red, width: 8, linecap: "round" }).opacity(0.62);
    }
  },
};
