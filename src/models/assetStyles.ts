export const createGoogleFontString = (...fonts) => {
    let urlifiedFonts = Array.from(new Set(fonts))
        .filter(font => font)
        .map(font => font.replace(/ /g, "+"))
        .join("|");
    return urlifiedFonts ? `https://fonts.googleapis.com/css?family=${urlifiedFonts}&display=swap` : "";
};

const defaultFontConfig = {
    assetTypeFontSize: "1.03em",
    assetTypeFont: "Simonetta",
    assetNameFontSize: "1.26em",
    assetNameFont: "Simonetta",
    detailsFontSize: "0.97em",
    detailsFont: "PT Serif",
    trackFontSize: "1.42em",
    trackFont: "Simonetta"
};

export const makeMergedConfig = (config): FontConfig => {
    let merged = Object.assign({}, defaultFontConfig)
    for (let key in merged) {
        merged[key] = config[key] || merged[key]
    }
    return merged
};

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
