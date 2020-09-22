import { CollectionDocument } from "./collection";
import { transformToLatest } from "../Asset/assetTransformation";
import { UnspecifiedAssetDocument } from "../Asset/asset";

export function putLoneAssetIntoCollection(
  asset: UnspecifiedAssetDocument
): CollectionDocument {
  return {
    name: "Default Collection",
    assets: [transformToLatest(asset)],
  };
}
