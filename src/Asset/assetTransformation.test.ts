import {
  AssetDocumentV1,
  AssetDocument,
  SvgIcon,
  SvgIconV1,
  AssetDocumentV2,
} from "./asset";
import {
  transformToLatest,
  transformToV2,
  transformToV3,
} from "./assetTransformation";

export const createV1Asset: () => AssetDocumentV1 = () => {
  return {
    fonts: {
      assetTypeFontSize: "1.03em",
      assetTypeFont: "Noto Sans JP",
      assetNameFontSize: "1.76em",
      assetNameFont: "Russo One",
      detailsFontSize: "0.97em",
      detailsFont: "Quicksand",
      trackFontSize: "1.12em",
      trackFont: "Krona One",
    },
    type: "companion",
    name: "Cave Lion",
    writeIn: "Name",
    track: ["cool", "even cooler"],
    description: "Your cat takes down its prey.",
    abilities: [
      {
        filled: false,
        name: "Eager",
        text:
          "When your cat chases down big game, you may <em>Resupply</em> with +edge (instead of +wits). If you do, take +1 supply or +1 momentum on a strong hit.",
      },
      {
        filled: false,
        name: "Inescapable",
        text:
          "When you <em>Enter the Fray</em> or <em>Strike</em> by sending your cat to attack, roll +edge. On a hit, take +2 momentum.",
      },
      {
        filled: false,
        name: "Protective",
        text:
          "When you <em>Make Camp</em>, your cat is alert to trouble. If you or an ally choose to relax, take +1 spirit. If you focus, take +1 momentum.",
      },
    ],
    icon: {
      type: "svg",
      author: "Delapouite",
      name: "Feline icon",
      svg:
        '<svg class="Icon" style="height: 512px; width: 512px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" style="touch-action: none;" transform="translate(0,0)"><path d="M110.056 64.815c-4.234.027-8.355.587-12.337 85.242-102.867-5.621-6.799-11.396-13.455-17.4-19.909z" fill="#fff" fill-opacity="1"></path></g></svg>',
    },
  };
};

const createV2Asset: () => AssetDocumentV2 = () => {
  return {
    fonts: {
      assetTypeFontSize: "1.03em",
      assetTypeFont: "Noto Sans JP",
      assetNameFontSize: "1.76em",
      assetNameFont: "Russo One",
      detailsFontSize: "0.97em",
      detailsFont: "Quicksand",
      trackFontSize: "1.12em",
      trackFont: "Krona One",
    },
    documentFormatVersion: 2,
    type: "companion",
    name: "Cave Lion",
    writeIn: "Name",
    track: ["cool", "even cooler"],
    description: "Your cat takes down its prey.",
    abilities: [
      {
        filled: false,
        name: "Eager",
        text:
          "When your cat chases down big game, you may <em>Resupply</em> with +edge (instead of +wits). If you do, take +1 supply or +1 momentum on a strong hit.",
      },
      {
        filled: false,
        name: "Inescapable",
        text:
          "When you <em>Enter the Fray</em> or <em>Strike</em> by sending your cat to attack, roll +edge. On a hit, take +2 momentum.",
      },
      {
        filled: false,
        name: "Protective",
        text:
          "When you <em>Make Camp</em>, your cat is alert to trouble. If you or an ally choose to relax, take +1 spirit. If you focus, take +1 momentum.",
      },
    ],
    icon: {
      type: "svg",
      author: "Delapouite",
      name: "Feline icon",
      svg: {
        d:
          "M110.056 64.815c-4.234.027-8.355.587-12.337 85.242-102.867-5.621-6.799-11.396-13.455-17.4-19.909z",
        fill: "#fff",
        fillOpacity: "1",
        viewBox: "0 0 512 512",
      },
    },
  };
};

const createLatestAsset: () => AssetDocument = () => {
  return {
    fonts: {
      assetTypeFontSize: "1.03em",
      assetTypeFont: "Noto Sans JP",
      assetNameFontSize: "1.76em",
      assetNameFont: "Russo One",
      detailsFontSize: "0.97em",
      detailsFont: "Quicksand",
      trackFontSize: "1.12em",
      trackFont: "Krona One",
    },
    documentFormatVersion: 3,
    type: "companion",
    name: "Cave Lion",
    writeIn: "Name",
    track: ["cool", "even cooler"],
    description: "Your cat takes down its prey.",
    abilities: [
      {
        filled: false,
        name: "Eager",
        text:
          "When your cat chases down big game, you may <em>Resupply</em> with +edge (instead of +wits). If you do, take +1 supply or +1 momentum on a strong hit.",
      },
      {
        filled: false,
        name: "Inescapable",
        text:
          "When you <em>Enter the Fray</em> or <em>Strike</em> by sending your cat to attack, roll +edge. On a hit, take +2 momentum.",
      },
      {
        filled: false,
        name: "Protective",
        text:
          "When you <em>Make Camp</em>, your cat is alert to trouble. If you or an ally choose to relax, take +1 spirit. If you focus, take +1 momentum.",
      },
    ],
    icon: {
      author: "Delapouite",
      name: "Feline icon",
      dataUri:
        "data:image/svg+xml;base64,PHN2ZyBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PGc+PHBhdGggZD0iTTExMC4wNTYgNjQuODE1Yy00LjIzNC4wMjctOC4zNTUuNTg3LTEyLjMzNyA4NS4yNDItMTAyLjg2Ny01LjYyMS02Ljc5OS0xMS4zOTYtMTMuNDU1LTE3LjQtMTkuOTA5eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiA+PC9wYXRoPjwvZz48L3N2Zz4=",
    },
  };
};

describe("transforming from schema v1 to v2", () => {
  test("documentFormatVersion is set to 2", () => {
    const result = transformToV2(createV1Asset());

    expect(result.documentFormatVersion).toBe(2);
  });
  test("straightforward, unchanged properties are mapped", () => {
    const v2Asset = createV2Asset();
    const result = transformToV2(createV1Asset());

    expect(result).toEqual(v2Asset);
  });
  test("does not asplode when optional properties are missing", () => {
    const asset = createV1Asset();
    asset.fonts = undefined;
    asset.writeIn = undefined;
    asset.track = undefined;

    const result = transformToV2(asset);

    expect(result.fonts).toBeUndefined();
  });
  describe("icon mapping", () => {
    test("string icon works", () => {
      const stringIcon = "/\\";
      const asset = createV1Asset();
      asset.icon = stringIcon;

      const result = transformToV2(asset);

      expect(result.icon).toBe(stringIcon);
    });
    test("undefined icon doesn't explode", () => {
      const asset = createV1Asset();
      asset.icon = undefined;

      const result = transformToV2(asset);

      expect(result.icon).toBeUndefined();
    });

    describe("mapping SVGs", () => {
      const v2Svg = {
        d:
          "M110.056 64.815c-4.234.027-8.355.587-12.337 85.242-102.867-5.621-6.799-11.396-13.455-17.4-19.909z",
        fill: "#fff",
        fillOpacity: "1",
        viewBox: "0 0 512 512",
      };

      test("name gets copied over", () => {
        const v2Asset = createV2Asset();
        const result = transformToV2(createV1Asset());

        expect((result.icon as SvgIcon).name).toBe(
          (v2Asset.icon as SvgIcon).name
        );
      });

      test("author gets copied over", () => {
        const v2Asset = createV2Asset();
        const result = transformToV2(createV1Asset());

        expect((result.icon as SvgIcon).author).toBe(
          (v2Asset.icon as SvgIcon).author
        );
      });

      const svgProperties = ["d", "fill", "fillOpacity", "viewBox"];

      svgProperties.forEach((prop) => {
        test(`maps the ${prop} property`, () => {
          const result = transformToV2(createV1Asset());

          expect((result.icon as SvgIcon).svg[prop]).toBe(v2Svg[prop]);
        });
      });
      svgProperties.forEach((prop) => {
        test(`maps ${prop} when single quotes are used instead of escaped double quotes in v1.icon.svg`, () => {
          const asset = createV1Asset();
          (asset.icon as SvgIconV1).svg = (asset.icon as SvgIconV1).svg.replace(
            /\"/g,
            "'"
          );
          const result = transformToV2(asset);

          expect((result.icon as SvgIcon).svg[prop]).toBe(v2Svg[prop]);
        });
      });
    });
  });
});

describe("mapping from v2 to v3", () => {
  describe("svg mapping", () => {
    it("transforms the svg fields into a data uri string", () => {
      const v2Asset = createV2Asset();
      const result = transformToV3(v2Asset);
      expect(result.icon.author).toBe((v2Asset.icon as SvgIcon).author);
      expect(result.icon.name).toBe((v2Asset.icon as SvgIcon).name);
      expect(result.icon.dataUri).toBe(
        "data:image/svg+xml;base64,PHN2ZyBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PGc+PHBhdGggZD0iTTExMC4wNTYgNjQuODE1Yy00LjIzNC4wMjctOC4zNTUuNTg3LTEyLjMzNyA4NS4yNDItMTAyLjg2Ny01LjYyMS02Ljc5OS0xMS4zOTYtMTMuNDU1LTE3LjQtMTkuOTA5eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiA+PC9wYXRoPjwvZz48L3N2Zz4="
      );
    });
  });
  it("maps the properties as expected", () => {
    const v2Asset = createV2Asset();
    const result = transformToV3(v2Asset);
    expect(result).toEqual(createLatestAsset());
  });
  it("doesn't explode when there is no icon", () => {
    const v2Asset = createV2Asset();
    delete v2Asset.icon;
    const result = transformToV3(v2Asset);
    expect(result.icon).toBeUndefined();
  });
});

describe("transformToLatest", () => {
  it("gives back the same object when passed in a document of the latest version", () => {
    const asset = createLatestAsset();
    expect(transformToLatest(asset)).toBe(asset);
  });
  it("maps a v1 document to the latest document properly", () => {
    const result = transformToLatest(createV1Asset());
    expect(result).toEqual(createLatestAsset());
  });
});
