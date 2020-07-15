import React from 'react';
import { Asset } from './Asset/Asset';
import { UnspecifiedAssetDocument } from './models/assetModels';
import { transformToLatest } from "./models/assetTransformation";

export default function AssetChoice(props: {
    handleClick();
    asset: UnspecifiedAssetDocument;
}) {
    let transformedAsset = transformToLatest(props.asset as UnspecifiedAssetDocument);
    return (
        <div className="asset-choice" onClick={props.handleClick}>
            <Asset asset={transformedAsset} scale={"one-third"}></Asset>
        </div>
    );
}
