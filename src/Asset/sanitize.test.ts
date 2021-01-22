import sanitize, { sanitizeSvg } from "./sanitize";

describe("sanitizing html input", () => {
  it("sanitizes html input", () => {
    const text = `<img src="dangerous place">some text here`;

    const result = sanitize(text);

    expect(result).toBe("some text here");
  });
  it("allows em, u, b, ul, and li", () => {
    const text =
      "<ul><li>The <em>best</em> ability <u>underlined</u> and <b>bold</b></li></ul>";

    const result = sanitize(text);

    expect(result).toBe(text);
  });
  it("does not allow attributes", () => {
    const text = `<em style="color:red;">best</em>`;

    const result = sanitize(text);

    expect(result).toBe(`<em>best</em>`);
  });
});

describe("sanitizing svg tags", () => {
  it("give an SVG back with attributes intact", () => {
    const svg = `<svg style="height:512px;width:512px" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512"><g><path d="M246.488 29.5l-13.244 39.725 14.381 86.275h16.75l14.38-86.275L265.515 29.5h-19.026zM195 61.5l-40 30h63.709l-3.953-23.725 2.092-6.275H195zm100.152 0l2.092 6.275-3.953 23.725H357l-40-30h-21.848zM69.42 90.727L41.639 257.41 71 286.773V162.375l20.863-41.725L69.42 90.727zm373.16 0l-22.443 29.923L441 162.375v124.398l29.361-29.363-27.78-166.683zM117.563 109.5L89 166.625V400l110 82.5v-87.906l-80-32V211.576l35.393-72.076h72.316l-5-30H117.562zm172.728 0l-5 30h72.272L393 210.375v152.219l-80 32V482.5L423 400V166.625L394.437 109.5H290.291zm-124.684 48L137 215.758v3.742h238v-4.875L346.437 157.5h-64.146l-2.666 16h-47.25l-2.666-16h-64.102zM137 237.5v46h30v-46h-30zm96 0v46h46v-46h-46zm112 0v46h30v-46h-30zm-208 64v48.906l46.678 18.67 27.029-67.576H137zm93.092 0l-29.705 74.262L217 382.406v51.067l39 9.75 39-9.75v-51.067l16.613-6.644-29.705-74.262h-51.816zm71.201 0l27.03 67.576L375 350.406V301.5h-73.707z" fill="#fff" fill-opacity="1"></path></g></svg>`;

    const result = sanitizeSvg(svg);

    expect(result).toBe(svg);
  });
  it("doesn't allow funny business to sneak in", () => {
    const svg = `<svg><script>console.log("baaad")</script><a href="some.website"><img src="some.place"/></a></svg>`;

    const result = sanitizeSvg(svg);

    expect(result).toBe(`<svg></svg>`);
  });
});
