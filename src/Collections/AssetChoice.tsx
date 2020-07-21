import React from 'react';
import { AssetDisplay } from '../Asset/AssetDisplay';
import { UnspecifiedAssetDocument } from '../Asset/asset';
import { transformToLatest } from "../Asset/assetTransformation";

export default function AssetChoice(props: {
    handleClick();
    asset: UnspecifiedAssetDocument;
}) {
    let transformedAsset = transformToLatest(props.asset);
    return (
        <div className="asset-choice" onClick={props.handleClick}>
            <AssetDisplay asset={transformedAsset} scale={"one-third"}></AssetDisplay>
        </div>
    );
}
