import React from "react";
import { useHistory } from "react-router-dom";
import { createBlankAsset, UnspecifiedAssetDocument } from "../Asset/asset";
import { ironclad, lightbearer, caveLion } from "../Asset/exampleAssets";
import AssetChoice from "./AssetChoice";
import AssetCardButton from "./AssetCardButton";
import { cloneDeep } from "lodash";
import { CreateAsset } from "../App";

type Props = {
  createAsset: CreateAsset;
};
export default function AssetCreation(props: Props) {
  const history = useHistory();
  return (
    <div className="asset-selection">
      <h3>Create a blank asset or copy an example:</h3>
      <div className="asset-selection-controls">
        <AssetCardButton
          text="Blank Asset"
          handleClick={() =>
            props.createAsset(createBlankAsset(), (id) => {
              history.push(`/assets/${id}/edit`);
            })
          }
        ></AssetCardButton>
        {[ironclad(), lightbearer(), caveLion()].map((example, index) => {
          return (
            <AssetChoice
              key={index}
              asset={example}
              handleClick={() =>
                props.createAsset(
                  cloneDeep(example) as UnspecifiedAssetDocument,
                  (id) => {
                    history.push(`/assets/${id}/edit`);
                  }
                )
              }
            ></AssetChoice>
          );
        })}
      </div>
      <button onClick={() => history.push("/")}>CANCEL</button>
    </div>
  );
}
