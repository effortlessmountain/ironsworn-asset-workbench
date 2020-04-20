import { transformToLatest, AssetDocumentV1, AssetDocument, SvgIcon, SvgIconV1 } from './schema'


const createV1Asset: () => AssetDocumentV1 = () => {
    return {
        fonts: {
            assetTypeFontSize: "1.03em",
            assetTypeFont: "Noto Sans JP",
            assetNameFontSize: "1.76em",
            assetNameFont: "Russo One",
            detailsFontSize: "0.97em",
            detailsFont: "Quicksand",
            trackFontSize: "1.12em",
            trackFont: "Krona One"
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
                text: "When your cat chases down big game, you may <em>Resupply</em> with +edge (instead of +wits). If you do, take +1 supply or +1 momentum on a strong hit."
            },
            {
                filled: false,
                name: "Inescapable",
                text: "When you <em>Enter the Fray</em> or <em>Strike</em> by sending your cat to attack, roll +edge. On a hit, take +2 momentum."
            },
            {
                filled: false,
                name: "Protective",
                text: "When you <em>Make Camp</em>, your cat is alert to trouble. If you or an ally choose to relax, take +1 spirit. If you focus, take +1 momentum."
            }
        ],
        icon: {
            "type": "svg",
            "author": "Delapouite",
            "name": "Feline icon",
            "svg": '<svg class="Icon" style="height: 512px; width: 512px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" style="touch-action: none;" transform="translate(0,0)"><path d="M110.056 64.815c-4.234.027-8.355.587-12.337 85.242-102.867-5.621-6.799-11.396-13.455-17.4-19.909z" fill="#fff" fill-opacity="1"></path></g></svg>',
        }
    }
}

const v2Asset: AssetDocument = {
    fonts: {
        assetTypeFontSize: "1.03em",
        assetTypeFont: "Noto Sans JP",
        assetNameFontSize: "1.76em",
        assetNameFont: "Russo One",
        detailsFontSize: "0.97em",
        detailsFont: "Quicksand",
        trackFontSize: "1.12em",
        trackFont: "Krona One"
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
            text: "When your cat chases down big game, you may <em>Resupply</em> with +edge (instead of +wits). If you do, take +1 supply or +1 momentum on a strong hit."
        },
        {
            filled: false,
            name: "Inescapable",
            text: "When you <em>Enter the Fray</em> or <em>Strike</em> by sending your cat to attack, roll +edge. On a hit, take +2 momentum."
        },
        {
            filled: false,
            name: "Protective",
            text: "When you <em>Make Camp</em>, your cat is alert to trouble. If you or an ally choose to relax, take +1 spirit. If you focus, take +1 momentum."
        }
    ],
    icon: {
        "type": "svg",
        "author": "Delapouite",
        "name": "Feline icon",
        "svg": {
            d: "M110.056 64.815c-4.234.027-8.355.587-12.337 85.242-102.867-5.621-6.799-11.396-13.455-17.4-19.909z",
            fill: "#fff",
            fillOpacity: "1",
            viewBox: "0 0 512 512"
        }
    }
}

test("passing in a v2 gives back the same object", () => {
    expect(transformToLatest(v2Asset)).toBe(v2Asset)
})

describe("transforming from schema v1 to v2", () => {
    test("documentFormatVersion is set to 2", () => {
        const result = transformToLatest(createV1Asset())

        expect(result.documentFormatVersion).toBe(2)
    })
    test("straightforward, unchanged properties are mapped", () => {
        const result = transformToLatest(createV1Asset())

        expect(result.fonts).toBeDefined()
        expect(result.fonts.assetTypeFont).toBe(v2Asset.fonts.assetTypeFont)
        expect(result.fonts.assetTypeFontSize).toBe(v2Asset.fonts.assetTypeFontSize)
        expect(result.fonts.assetNameFont).toBe(v2Asset.fonts.assetNameFont)
        expect(result.fonts.assetNameFontSize).toBe(v2Asset.fonts.assetNameFontSize)
        expect(result.fonts.detailsFont).toBe(v2Asset.fonts.detailsFont)
        expect(result.fonts.detailsFontSize).toBe(v2Asset.fonts.detailsFontSize)
        expect(result.fonts.trackFont).toBe(v2Asset.fonts.trackFont)
        expect(result.fonts.trackFontSize).toBe(v2Asset.fonts.trackFontSize)
        expect(result.type).toBe(v2Asset.type)
        expect(result.name).toBe(v2Asset.name)
        expect(result.writeIn).toBe(v2Asset.writeIn)
        expect(result.track).toEqual(v2Asset.track)
        expect(result.description).toEqual(v2Asset.description)
        expect(result.abilities).toEqual(v2Asset.abilities)
    })
    test("does not asplode when optional properties are missing", () => {
        const asset = createV1Asset()
        asset.fonts = undefined;
        asset.writeIn = undefined;
        asset.track = undefined;

        const result = transformToLatest(asset)

        expect(result.fonts).toBeUndefined()
    })
    describe("icon mapping", () => {
        test("string icon works", () => {
            const stringIcon = "/\\"
            const asset = createV1Asset()
            asset.icon = stringIcon

            const result = transformToLatest(asset)

            expect(result.icon).toBe(stringIcon)
        })
        test("undefined icon doesn't explode", () => {
            const asset = createV1Asset()
            asset.icon = undefined

            const result = transformToLatest(asset)

            expect(result.icon).toBeUndefined
        })

        describe("mapping SVGs", () => {
            const v2Svg = {
                d: "M110.056 64.815c-4.234.027-8.355.587-12.337 85.242-102.867-5.621-6.799-11.396-13.455-17.4-19.909z",
                fill: "#fff",
                fillOpacity: "1",
                viewBox: "0 0 512 512"
            }

            test("name gets copied over", () => {
                const result = transformToLatest(createV1Asset())

                expect((result.icon as SvgIcon).name).toBe((v2Asset.icon as SvgIcon).name)
            })

            test("author gets copied over", () => {
                const result = transformToLatest(createV1Asset())

                expect((result.icon as SvgIcon).author).toBe((v2Asset.icon as SvgIcon).author)
            })

            const svgProperties = ["d", "fill", "fillOpacity", "viewBox"]

            svgProperties.forEach((prop) => {
                test(`maps the ${prop} property`, () => {
                    const result = transformToLatest(createV1Asset())

                    expect((result.icon as SvgIcon).svg[prop]).toBe(v2Svg[prop])
                })
            })
            svgProperties.forEach(prop => {
                test(`maps ${prop} when single quotes are used instead of escaped double quotes in v1.icon.svg`, () => {
                    const asset = createV1Asset();
                    (asset.icon as SvgIconV1).svg = (asset.icon as SvgIconV1).svg.replace(/\"/g, "'")
                    const result = transformToLatest(asset)

                    expect((result.icon as SvgIcon).svg[prop]).toBe(v2Svg[prop])
                })
            })
        })
    })
})
