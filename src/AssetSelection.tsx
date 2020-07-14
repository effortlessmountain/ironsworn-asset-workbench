import React from 'react'

import { ironclad, lightbearer, caveLion } from './exampleAssets'
import { Asset } from './Asset/Asset'
import { UnspecifiedAssetDocument, createBlankAsset } from './models/assetModels'
import { transformToLatest } from "./models/assetTransformation"

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
                <div className="asset-choice"
                    onClick={() => alert('congrats!')}>
                    <div className="add-new-asset asset one-third">
                        <div className="add-new-asset-text">Add New Asset</div>
                    </div>
                </div>
            </div>
            {/* <h3>Examples</h3>
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
            </div> */}
        </div >
    )
}