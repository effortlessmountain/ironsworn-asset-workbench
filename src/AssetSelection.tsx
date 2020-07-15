import React from 'react'
import { UnspecifiedAssetDocument } from './models/assetModels'
import AssetChoice from './AssetChoice'
import AssetCardButton from './AssetCardButton'

export default function AssetSelection(props: {
    chooseAsset: (asset) => void,
    showNewScreen(),
    localAsset: UnspecifiedAssetDocument
}) {
    return (
        <div className="asset-selection">
            <h3>Choose asset to edit</h3>
            <div className="asset-selection-controls">
                <AssetChoice
                    asset={props.localAsset}
                    handleClick={() => props.chooseAsset(props.localAsset)}></AssetChoice>
                <AssetCardButton
                    text="Add New Asset"
                    handleClick={props.showNewScreen}></AssetCardButton>
            </div>
        </div >
    )
}