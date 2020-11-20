import { cloneDeep } from "lodash";
import {
  AssetDocumentV1,
  AssetDocumentV2,
  AssetDocument,
  UnspecifiedAssetDocument,
  SvgProperties,
  SvgIcon,
  createDataUri,
} from "./asset";

const extractPropertyValue = (key, svgString) => {
  const regexp = new RegExp(`${key}=(?:"|')(.*?)(?:"|')`);
  return (svgString.match(regexp) || [])[1];
  //TODO: intelligent error here?
};

export function transformSvgString(svgString: string): SvgProperties {
  return {
    d: extractPropertyValue("d", svgString),
    fill: extractPropertyValue("fill", svgString),
    fillOpacity: extractPropertyValue("opacity", svgString),
    viewBox: extractPropertyValue("viewBox", svgString),
  };
}

export function transformToV2(v1: AssetDocumentV1): AssetDocumentV2 {
  const v2: AssetDocumentV2 = {
    documentFormatVersion: 2,
    type: v1.type,
    name: v1.name,
    writeIn: v1.writeIn,
    track: v1.track,
    description: v1.description,
    abilities: v1.abilities,
  };
  if (typeof v1.fonts === "object") {
    v2.fonts = {
      assetTypeFontSize: v1.fonts.assetTypeFontSize,
      assetTypeFont: v1.fonts.assetTypeFont,
      assetNameFontSize: v1.fonts.assetNameFontSize,
      assetNameFont: v1.fonts.assetNameFont,
      detailsFontSize: v1.fonts.detailsFontSize,
      detailsFont: v1.fonts.detailsFont,
      trackFontSize: v1.fonts.trackFontSize,
      trackFont: v1.fonts.trackFont,
    };
  }
  if (typeof v1.icon === "string") {
    v2.icon = v1.icon;
  } else if (typeof v1.icon === "object") {
    v2.icon = {
      type: "svg",
      author: v1.icon.author,
      name: v1.icon.name,
      svg: transformSvgString(v1.icon.svg),
    };
  }
  return v2;
}

function transformSvgPropertiesToDataUri(
  properties: SvgProperties = { d: "", fill: "", fillOpacity: "", viewBox: "" }
): string {
  const svg = `<svg style="height: 512px; width: 512px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="${properties.d}" fill="${properties.fill}" fill-opacity="${properties.fillOpacity}" ></path></g></svg>`;
  return createDataUri(svg);
}

export function transformToV3(v2: AssetDocumentV2): AssetDocument {
  let v3 = (cloneDeep(v2) as unknown) as AssetDocument;
  v3.documentFormatVersion = 3;

  if (v2.icon) {
    const v2Icon = v2.icon as SvgIcon;
    v3.icon = {
      name: v2Icon.name,
      author: v2Icon.author,
      dataUri: transformSvgPropertiesToDataUri(v2Icon.svg),
    };
  }

  return v3;
}

export function transformToLatest(
  asset: UnspecifiedAssetDocument
): AssetDocument {
  if (!asset.documentFormatVersion) {
    return transformToLatest(transformToV2(asset as AssetDocumentV1));
  } else if (asset.documentFormatVersion === 2) {
    return transformToV3(asset as AssetDocumentV2);
  } else {
    return asset as AssetDocument;
  }
}
