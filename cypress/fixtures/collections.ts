import { makeAssetFixture } from "./assets";
import {
  CollectionDocument,
  createCollection,
} from "../../src/Collections/collection";
import { AssetDocument } from "../../src/Asset/asset";

export function makeCollectionFixture(
  assets: AssetDocument[]
): CollectionDocument {
  if (!assets || assets.length === 0) {
    assets = [makeAssetFixture()];
  }
  const collection = createCollection();
  collection.assets = assets;
  return collection;
}
