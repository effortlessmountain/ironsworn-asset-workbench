import { Collection } from "./collection";
import { transformToLatest } from "../Asset/assetTransformation";
import { UnspecifiedAssetDocument } from "../Asset/asset";

export function putLoneAssetIntoCollection(
  asset: UnspecifiedAssetDocument
): Collection {
  return {
    name: "Default Collection",
    assets: [transformToLatest(asset)],
  };
}
