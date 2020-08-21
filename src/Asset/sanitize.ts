import sanitizer from "sanitize-html";

export default function sanitize(text) {
  return sanitizer(text, {
    allowedTags: ["em", "ul", "li"],
    allowedAttributes: {},
  });
}
