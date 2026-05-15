import { ayresPalette } from "../ayres-palette";
import type { SvgAsset } from "../types";

export const industrialMechanicalAsset: SvgAsset = {
  filename: "ayres-industrial-mechanical.svg",
  title: "Industrial mechanical systems illustration",
  desc: "An industrial mechanical room illustration with pipes, gauges, and Ayres Mechanical brand accents.",
  width: 720,
  height: 520,
  draw(svg) {
    svg.rect(720, 520).fill(ayresPalette.navy);
    svg.rect(612, 404).move(54, 58).radius(32).fill(ayresPalette.ice).opacity(0.96);

    const pipeGroup = svg.group().translate(110, 112);
    pipeGroup
      .path("M0 78h176c44 0 44 72 88 72h190")
      .fill("none")
      .stroke({ color: ayresPalette.blue, width: 28, linecap: "round", linejoin: "round" });
    pipeGroup
      .path("M24 238h162c52 0 52-62 104-62h190")
      .fill("none")
      .stroke({ color: ayresPalette.navy, width: 24, linecap: "round", linejoin: "round" });
    pipeGroup
      .path("M360 30v260")
      .fill("none")
      .stroke({ color: ayresPalette.red, width: 16, linecap: "round" });

    for (const [x, y, label] of [
      [184, 78, "P"],
      [360, 176, "T"],
      [486, 238, "F"],
    ] as const) {
      const gauge = pipeGroup.group().translate(x - 42, y - 42);
      gauge.circle(84).fill(ayresPalette.white).stroke({ color: ayresPalette.navy, width: 8 });
      gauge.line(42, 42, 68, 25).stroke({ color: ayresPalette.red, width: 6, linecap: "round" });
      gauge
        .text(label)
        .font({ family: "Arial, sans-serif", size: 20, weight: 800 })
        .fill(ayresPalette.blue)
        .center(42, 62);
    }

    svg
      .text("mechanical systems")
      .font({ family: "Arial, sans-serif", size: 30, weight: 800 })
      .fill(ayresPalette.navy)
      .move(126, 406);
  },
};
