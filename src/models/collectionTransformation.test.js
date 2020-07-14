import { putLoneAssetIntoCollection } from './collectionTransformation'
import { createV1Asset } from './assetTransformation.test'

describe("putting an asset into a collection", () => {
    it("returns a Collection with a transformed asset", () => {
        const asset = createV1Asset()

        const collection = putLoneAssetIntoCollection(asset)
        expect(collection.assets[0].documentFormatVersion).toBeGreaterThan(1);
    })
})