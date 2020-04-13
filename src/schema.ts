export type SvgIconV1 = {
    type: "svg",
    author: string,
    name: string,
    svg: string
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

export type SvgIcon = {
    type: "svg",
    author: string,
    name: string,
    svg: {
        d: string,
        fill: string,
        fillOpacity: string,
        viewBox: string
    }
}

export type AssetDocumentV2 = {
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
    abilities: Array<{ filled: boolean, name?: string, text: string }>,
    icon?: string | SvgIcon
}

type AssetDocument = AssetDocumentV1 | AssetDocumentV2

function transformToV2(v1: AssetDocumentV1): AssetDocumentV2 {
    const v2: AssetDocumentV2 = {
        documentFormatVersion: 2,
        type: v1.type,
        name: v1.name,
        writeIn: v1.writeIn,
        track: v1.track,
        description: v1.description,
        abilities: v1.abilities,
    }
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
        }
    }
    if (typeof v1.icon === "string") {
        v2.icon = v1.icon
    } else if (typeof v1.icon === "object") {
        const extractPropertyValue = (key) => {
            const regexp = new RegExp(`${key}=(?:"|')(.*?)(?:"|')`)
            return ((v1.icon as SvgIconV1).svg.match(regexp) || [])[1]
            //TODO: intelligent error here?
        }
        v2.icon = {
            type: "svg",
            author: "",
            name: "",
            svg: {
                d: extractPropertyValue("d"),
                fill: extractPropertyValue("fill"),
                fillOpacity: extractPropertyValue("opacity"),
                viewBox: extractPropertyValue("viewBox")
            }
        }

    }
    return v2
}

export function transformToLatest(schema: AssetDocument): AssetDocumentV2 {
    if (!schema.documentFormatVersion) {
        return transformToV2(schema as AssetDocumentV1)
    }
    else if (schema.documentFormatVersion === 2) {
        return schema as AssetDocumentV2
    }
}
