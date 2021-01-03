import sanitizer from "sanitize-html";

export default function sanitize(text) {
  return sanitizer(text, {
    allowedTags: ["em", "ul", "li"],
    allowedAttributes: {},
  });
}

export function sanitizeSvg(svg: string) {
  return sanitizer(svg, {
    allowedTags: ["svg", "path", "g"],
    allowedAttributes: false, //false allows ALL attributes
  });
}
