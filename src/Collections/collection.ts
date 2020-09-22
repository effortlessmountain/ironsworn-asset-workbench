import { AssetDocument } from "../Asset/asset";

export type CollectionDocument = {
  name: string;
  assets: AssetDocument[];
};

export function createCollection(
  name = "Default Collection"
): CollectionDocument {
  return {
    name: name,
    assets: [],
  };
}
