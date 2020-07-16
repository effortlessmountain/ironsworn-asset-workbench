import React from 'react'
import { UnspecifiedAssetDocument } from './models/assetModels'
import AssetChoice from './AssetChoice'
import AssetCardButton from './AssetCardButton'

export default function AssetSelection(props: {
    chooseAsset: (asset, index) => void,
    showNewScreen(),
    assets: UnspecifiedAssetDocument[]
}) {
    return (
        <div className="asset-selection">
            <h3>Choose asset to edit</h3>
            <div className="asset-selection-controls">
                {props.assets.map((asset, index) => {
                    return (<AssetChoice
                        asset={asset}
                        key={asset.name + index}
                        handleClick={() => props.chooseAsset(asset, index)}></AssetChoice>)
                })}

                <AssetCardButton
                    text="Add New Asset"
                    handleClick={props.showNewScreen}></AssetCardButton>
            </div>
        </div >
    )
}