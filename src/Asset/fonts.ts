export interface FontConfig {
    assetTypeFontSize?: string;
    assetTypeFont?: string;
    assetNameFontSize?: string;
    assetNameFont?: string;
    detailsFontSize?: string;
    detailsFont?: string;
    trackFontSize?: string;
    trackFont?: string;
}

export const createGoogleFontString = (...fonts) => {
    let urlifiedFonts = Array.from(new Set(fonts))
        .filter(font => font)
        .map(font => font.replace(/ /g, "+"))
        .map(font => `family=${font}`)
        .join("&");
    return urlifiedFonts ? `https://fonts.googleapis.com/css2?${urlifiedFonts}&display=swap` : "";
};

export const defaultFontConfig = {
    assetTypeFontSize: "1.03em",
    assetTypeFont: "Simonetta",
    assetNameFontSize: "1.26em",
    assetNameFont: "Simonetta",
    detailsFontSize: "0.97em",
    detailsFont: "PT Serif",
    trackFontSize: "1.42em",
    trackFont: "Simonetta"
};

export const makeMergedConfig = (config = {}): FontConfig => {
    let merged = Object.assign({}, defaultFontConfig)
    for (let key in merged) {
        merged[key] = config[key] || merged[key]
    }
    return merged
};

export const makeFontStyles = (unmergedFonts: FontConfig) => {
    let fonts: FontConfig = makeMergedConfig(unmergedFonts)
    let googleFontUrl = createGoogleFontString(fonts.assetTypeFont, fonts.assetNameFont, fonts.detailsFont, fonts.trackFont)

    function toFontFamily(font) {
        const fontName = font.split(':')[0].replace(/\+/g, " ")
        return `"${fontName}"`
    }

    return {
        googleFontUrl,
        type: {
            fontFamily: toFontFamily(fonts.assetTypeFont),
            fontSize: fonts.assetTypeFontSize
        },
        assetName: {
            fontFamily: toFontFamily(fonts.assetNameFont),
            fontSize: fonts.assetNameFontSize
        },
        details: {
            fontFamily: toFontFamily(fonts.detailsFont),
            fontSize: fonts.detailsFontSize
        },
        track: {
            fontFamily: toFontFamily(fonts.trackFont),
            fontSize: fonts.trackFontSize
        }
    }
}