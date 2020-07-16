import { AssetDocument } from './assetModels'

export type Collection = {
    name: string,
    assets: AssetDocument[]
}

export function createCollection(name = "Default Collection"): Collection {
    return {
        name: name,
        assets: []
    }
}