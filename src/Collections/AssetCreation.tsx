import React from "react";
import { createBlankAsset, UnspecifiedAssetDocument } from "../Asset/asset";
import { ironclad, lightbearer, caveLion } from "../Asset/exampleAssets";
import AssetChoice from "./AssetChoice";
import AssetCardButton from "./AssetCardButton";
import { cloneDeep } from "lodash";

export default function AssetCreation(props: {
  createAsset(asset: UnspecifiedAssetDocument);
  showChooseScreen();
}) {
  return (
    <div className="asset-selection">
      <h3>Create a blank asset or copy an example:</h3>
      <div className="asset-selection-controls">
        <AssetCardButton
          text="Blank Asset"
          handleClick={() => props.createAsset(createBlankAsset())}
        ></AssetCardButton>
        {[ironclad, lightbearer, caveLion].map((example, index) => {
          return (
            <AssetChoice
              key={index}
              asset={example}
              handleClick={() => props.createAsset(cloneDeep(example))}
            ></AssetChoice>
          );
        })}
      </div>
      <button onClick={props.showChooseScreen}>CANCEL</button>
    </div>
  );
}
