import { AssetDocumentV1, AssetDocument, transformSvgString, UnspecifiedAssetDocument } from "./asset";
function transformToV2(v1: AssetDocumentV1): AssetDocument {
    const v2: AssetDocument = {
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
    }
    else if (typeof v1.icon === "object") {
        v2.icon = {
            type: "svg",
            author: v1.icon.author,
            name: v1.icon.name,
            svg: transformSvgString(v1.icon.svg)
        };

    }
    return v2;
}

export function transformToLatest(schema: UnspecifiedAssetDocument): AssetDocument {
    if (!schema.documentFormatVersion) {
        return transformToV2(schema as AssetDocumentV1);
    }
    else if (schema.documentFormatVersion === 2) {
        return schema as AssetDocument;
    }
}
