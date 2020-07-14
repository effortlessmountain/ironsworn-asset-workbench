import { merge } from "lodash"

export type SvgIconV1 = {
    type: "svg",
    author: string,
    name: string,
    svg: string
}

export type SvgProperties = {
    d: string,
    fill: string,
    fillOpacity: string,
    viewBox: string
}

export type SvgIcon = {
    type: "svg",
    author: string,
    name: string,
    svg: SvgProperties
}

export type Ability = {
    filled: boolean,
    name?: string,
    text: string
}

export type AssetDocumentV1 = {
    documentFormatVersion?: number,
    fonts?: {
        assetTypeFontSize?: string,
        assetTypeFont?: string,
        assetNameFontSize?: string,
        assetNameFont?: string,
        detailsFontSize?: string,
        detailsFont?: string,
        trackFontSize?: string,
        trackFont?: string,
    },
    type: string,
    name: string,
    writeIn?: string,
    track?: number | string[],
    description: string,
    abilities: Array<{ filled: boolean, name?: string, text: string }>,
    icon?: string | SvgIconV1
}


export interface AssetDocument {
    documentFormatVersion: number,
    fonts?: {
        assetTypeFontSize?: string,
        assetTypeFont?: string,
        assetNameFontSize?: string,
        assetNameFont?: string,
        detailsFontSize?: string,
        detailsFont?: string,
        trackFontSize?: string,
        trackFont?: string,
    },
    type: string,
    name: string,
    writeIn?: string,
    track?: number | string[],
    description: string,
    abilities: Array<Ability>,
    icon?: string | SvgIcon
}

export type UnspecifiedAssetDocument = AssetDocumentV1 | AssetDocument

export function createBlankAsset(properties = {}): AssetDocument {
    return {
        documentFormatVersion: 2,
        abilities: [],
        description: "",
        name: "Your Asset",
        type: "",
        fonts: {},
        icon: "",
        track: null,
        writeIn: ""
    }
}

const extractPropertyValue = (key, svgString) => {
    const regexp = new RegExp(`${key}=(?:"|')(.*?)(?:"|')`)
    return (svgString.match(regexp) || [])[1]
    //TODO: intelligent error here?
}

export function transformSvgString(svgString: string): SvgProperties {
    return {
        d: extractPropertyValue("d", svgString),
        fill: extractPropertyValue("fill", svgString),
        fillOpacity: extractPropertyValue("opacity", svgString),
        viewBox: extractPropertyValue("viewBox", svgString)
    }
}


