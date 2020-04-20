import { makeMergedConfig } from './assetStyles'

describe("font styles", () => {
    test("merged font config handles specified sizes but unspecified fonts", () => {
        let config = {
            "assetTypeFontSize": "1.03em",
            "assetTypeFont": undefined,
            "assetNameFontSize": "1.26em",
            "assetNameFont": undefined,
            "detailsFontSize": "0.97em",
            "detailsFont": undefined,
            "trackFontSize": "1.42em",
            "trackFont": undefined
        }

        let result = makeMergedConfig(config)

        expect(result.assetNameFont).toBe("Simonetta")
    })
})