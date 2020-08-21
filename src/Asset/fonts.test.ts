import { makeMergedConfig, makeFontStyles } from "./fonts";

describe("font styles", () => {
  test("merged font config handles specified sizes but unspecified fonts", () => {
    let config = {
      assetTypeFontSize: "1.03em",
      assetTypeFont: undefined,
      assetNameFontSize: "1.26em",
      assetNameFont: undefined,
      detailsFontSize: "0.97em",
      detailsFont: undefined,
      trackFontSize: "1.42em",
      trackFont: undefined,
    };

    let result = makeMergedConfig(config);

    expect(result.assetNameFont).toBe("Simonetta");
  });

  describe("fontFamily", () => {
    it("returns a well-formed google font URL", () => {
      const config = {
        assetTypeFont: "Indie Flower",
        assetNameFont: "Open+Sans+Condensed:ital,wght@1,300",
        detailsFont: "Red+Rose:wght@700",
      };

      const result = makeFontStyles(config).googleFontUrl;

      const expected =
        "https://fonts.googleapis.com/css2?family=Indie+Flower&family=Open+Sans+Condensed:ital,wght@1,300&family=Red+Rose:wght@700&family=Simonetta&display=swap";

      expect(result).toBe(expected);
    });

    it("returns proper font families for non-Regular fonts", () => {
      const config = {
        assetTypeFont: "Indie Flower",
        assetNameFont: "Open+Sans+Condensed:ital,wght@1,300",
        detailsFont: "Red+Rose:wght@700",
      };

      const result = makeFontStyles(config);

      expect(result.type.fontFamily).toBe('"Indie Flower"');
      expect(result.assetName.fontFamily).toBe('"Open Sans Condensed"');
      expect(result.details.fontFamily).toBe('"Red Rose"');
      expect(result.track.fontFamily).toBe('"Simonetta"');
    });
  });
});
