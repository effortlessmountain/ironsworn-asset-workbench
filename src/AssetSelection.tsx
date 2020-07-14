import React from 'react'

import { ironclad, lightbearer, caveLion } from './exampleAssets'
import { Asset } from './Asset/Asset'
import { transformToLatest, UnspecifiedAssetDocument } from './models/assetModels'

function AssetChoice(props: {
    handleClick(),
    asset: UnspecifiedAssetDocument
}) {
    let transformedAsset = transformToLatest(props.asset as UnspecifiedAssetDocument)
    return (
        <div className="asset-choice" onClick={props.handleClick}>
            <Asset asset={transformedAsset} scale={"one-third"}></Asset>
        </div>
    )
}

export default function AssetSelection(props: {
    chooseAsset: (asset) => void,
    localAsset: UnspecifiedAssetDocument
}) {
    return (
        <div className="asset-selection">
            <h3>Choose asset to edit</h3>
            <div className="example-controls">
                <AssetChoice
                    asset={props.localAsset}
                    handleClick={() => props.chooseAsset(props.localAsset)}></AssetChoice>
            </div>
            <h3>Examples</h3>
            <div className="example-controls">
                <AssetChoice
                    asset={lightbearer as UnspecifiedAssetDocument}
                    handleClick={() => props.chooseAsset(lightbearer)}></AssetChoice>
                <AssetChoice
                    asset={ironclad as UnspecifiedAssetDocument}
                    handleClick={() => props.chooseAsset(ironclad)}></AssetChoice>
                <AssetChoice
                    asset={caveLion as UnspecifiedAssetDocument}
                    handleClick={() => props.chooseAsset(caveLion)}></AssetChoice>
            </div>
        </div>
    )
}