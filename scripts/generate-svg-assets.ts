import { readdir, mkdir, unlink, writeFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

import { SVG, registerWindow, type Svg } from "@svgdotjs/svg.js";
import { createSVGWindow } from "svgdom";

import { airflowWavesAsset } from "./svg/builders/airflow-waves";
import { commercialRooftopAsset } from "./svg/builders/commercial-rooftop";
import { emergencyBadgeAsset } from "./svg/builders/emergency-badge";
import { heroBackgroundAsset } from "./svg/builders/hero-bg";
import { industrialMechanicalAsset } from "./svg/builders/industrial-mechanical";
import { maintenanceChecklistAsset } from "./svg/builders/maintenance-checklist";
import { residentialComfortAsset } from "./svg/builders/residential-comfort";
import { serviceIconSpriteAsset } from "./svg/builders/service-icon-sprite";
import { prepareSvg, setCanvas } from "./svg/svg-helpers";
import type { SvgAsset } from "./svg/types";

const outputDirectory = resolve(process.cwd(), "public/generated-assets");

const assets: SvgAsset[] = [
  heroBackgroundAsset,
  residentialComfortAsset,
  commercialRooftopAsset,
  industrialMechanicalAsset,
  maintenanceChecklistAsset,
  emergencyBadgeAsset,
  airflowWavesAsset,
  serviceIconSpriteAsset,
];

async function cleanGeneratedSvgs() {
  await mkdir(outputDirectory, { recursive: true });

  const entries = await readdir(outputDirectory, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".svg"))
      .map((entry) => unlink(resolve(outputDirectory, entry.name))),
  );
}

function renderAsset(asset: SvgAsset) {
  const window = createSVGWindow();
  const document = window.document;

  registerWindow(window, document);

  const svg = SVG(document.documentElement) as Svg;

  setCanvas(svg, asset.width, asset.height);
  prepareSvg(svg, asset.filename, asset.title, asset.desc);
  asset.draw(svg);

  return `${svg.svg()}\n`;
}

async function writeAsset(asset: SvgAsset) {
  const outputPath = resolve(outputDirectory, asset.filename);
  const expectedPrefix = `${outputDirectory}${sep}`;

  if (!outputPath.startsWith(expectedPrefix)) {
    throw new Error(`Refusing to write SVG outside generated assets: ${asset.filename}`);
  }

  await writeFile(outputPath, renderAsset(asset), "utf8");
  return outputPath;
}

async function main() {
  await cleanGeneratedSvgs();
  const outputPaths = await Promise.all(assets.map((asset) => writeAsset(asset)));

  for (const outputPath of outputPaths) {
    console.log(`Generated ${outputPath}`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
