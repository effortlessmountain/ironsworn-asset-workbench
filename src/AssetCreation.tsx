import React from 'react'
import { createBlankAsset, UnspecifiedAssetDocument } from './models/assetModels'
import { ironclad, lightbearer, caveLion } from './exampleAssets'
import AssetChoice from './AssetChoice'
import AssetCardButton from './AssetCardButton'
import { cloneDeep } from 'lodash'

export default function AssetCreation(props: {
    chooseAsset(asset: UnspecifiedAssetDocument),
    showChooseScreen()
}) {
    return (
        <div className="asset-selection">
            <h3>Create a blank asset or copy an example:</h3>
            <div className="asset-selection-controls">
                {[ironclad, lightbearer, caveLion].map((example, index) => {
                    return (<AssetChoice
                        key={index}
                        asset={example as UnspecifiedAssetDocument}
                        handleClick={() => props.chooseAsset(cloneDeep(example) as UnspecifiedAssetDocument)}></AssetChoice>)
                })}
                <AssetCardButton
                    text="Blank Asset"
                    handleClick={() => props.chooseAsset(createBlankAsset() as UnspecifiedAssetDocument)}></AssetCardButton>
            </div>
            <button onClick={props.showChooseScreen}>CANCEL</button>
        </div>
    )
}