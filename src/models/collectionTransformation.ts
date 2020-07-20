import { Collection } from "./collection";
import { transformToLatest } from "./assetTransformation";
import { UnspecifiedAssetDocument } from "./assetModels";

export function putLoneAssetIntoCollection(asset: UnspecifiedAssetDocument): Collection {
    return {
        name: "Default Collection",
        assets: [transformToLatest(asset)]
    }
}