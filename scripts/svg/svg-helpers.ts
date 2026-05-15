import type { Element, Svg } from "@svgdotjs/svg.js";

const svgNamespace = "http://www.w3.org/2000/svg";

export function cloudinaryReadyId(filename: string) {
  return filename.replace(/\.svg$/u, "").replace(/[^a-z0-9-]/giu, "-").toLowerCase();
}

export function prepareSvg(svg: Svg, filename: string, title: string, desc: string) {
  const idBase = cloudinaryReadyId(filename);
  const titleId = `${idBase}-title`;
  const descId = `${idBase}-desc`;

  svg.node.setAttribute("xmlns", svgNamespace);
  svg.node.setAttribute("role", "img");
  svg.node.setAttribute("aria-labelledby", `${titleId} ${descId}`);

  const titleNode = svg.node.ownerDocument.createElementNS(svgNamespace, "title");
  titleNode.setAttribute("id", titleId);
  titleNode.textContent = title;

  const descNode = svg.node.ownerDocument.createElementNS(svgNamespace, "desc");
  descNode.setAttribute("id", descId);
  descNode.textContent = desc;

  const firstChild = svg.node.firstChild;
  svg.node.insertBefore(descNode, firstChild);
  svg.node.insertBefore(titleNode, descNode);
}

export function setCanvas(svg: Svg, width: number, height: number) {
  svg.size(width, height).viewbox(0, 0, width, height);
}

export function roundedPanel(svg: Svg, width: number, height: number, fill: string) {
  return svg.rect(width, height).radius(32).fill(fill);
}

export function appendRoughElement(svg: Svg, element: SVGGElement) {
  svg.node.appendChild(element);
}

export function setShapeAttributes(
  element: Element,
  attributes: Record<string, string | number>,
) {
  element.attr(attributes);
  return element;
}

export function makeSvgElement<T extends keyof SVGElementTagNameMap>(
  svg: Svg,
  tagName: T,
) {
  return svg.node.ownerDocument.createElementNS(svgNamespace, tagName);
}
