export type SvgIconV1 = {
  type: "svg";
  author: string;
  name: string;
  svg: string;
};

export type SvgProperties = {
  d: string;
  fill: string;
  fillOpacity: string;
  viewBox: string;
};

export type SvgIcon = {
  type: "svg";
  author: string;
  name: string;
  svg: SvgProperties;
};

export type Icon = {
  name: string;
  author: string;
  dataUri: string;
};

export type Ability = {
  filled: boolean;
  name?: string;
  text: string;
};

export interface AssetDocumentV1 {
  documentFormatVersion?: number;
  fonts?: {
    assetTypeFontSize?: string;
    assetTypeFont?: string;
    assetNameFontSize?: string;
    assetNameFont?: string;
    detailsFontSize?: string;
    detailsFont?: string;
    trackFontSize?: string;
    trackFont?: string;
  };
  type: string;
  name: string;
  writeIn?: string;
  track?: number | string[];
  description: string;
  abilities: Array<{ filled: boolean; name?: string; text: string }>;
  icon?: string | SvgIconV1;
}

export interface AssetDocumentV2 {
  documentFormatVersion: 2;
  fonts?: {
    assetTypeFontSize?: string;
    assetTypeFont?: string;
    assetNameFontSize?: string;
    assetNameFont?: string;
    detailsFontSize?: string;
    detailsFont?: string;
    trackFontSize?: string;
    trackFont?: string;
  };
  type: string;
  name: string;
  writeIn?: string;
  writeIn2?: string;
  track?: number | string[];
  description: string;
  abilities: Array<Ability>;
  icon?: string | SvgIcon;
}

export interface AssetDocument {
  documentFormatVersion: 3;
  fonts?: {
    assetTypeFontSize?: string;
    assetTypeFont?: string;
    assetNameFontSize?: string;
    assetNameFont?: string;
    detailsFontSize?: string;
    detailsFont?: string;
    trackFontSize?: string;
    trackFont?: string;
  };
  type: string;
  name: string;
  writeIn?: string;
  writeIn2?: string;
  track?: number | string[];
  description: string;
  abilities: Array<Ability>;
  icon?: Icon;
}

export interface UnspecifiedAssetDocument {
  documentFormatVersion?: number;
  type: string;
  name: string;
}

export function createBlankAsset(properties = {}): AssetDocument {
  return {
    documentFormatVersion: 3,
    abilities: [],
    description: "",
    name: "",
    type: "",
    fonts: {},
    icon: null,
    track: null,
    writeIn: "",
    writeIn2: "",
  };
}

export function createDataUri(data) {
  return "data:image/svg+xml;base64," + btoa(data);
}
