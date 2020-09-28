import React from "react";
import { useHistory } from "react-router-dom";
import { UnspecifiedAssetDocument } from "../Asset/asset";
import { transformToLatest } from "../Asset/assetTransformation";
import AssetChoice from "./AssetChoice";

export default function AssetSelection(props: {
  setCurrentAsset(asset);
  setCurrentAssetIndex(index);
  assets: UnspecifiedAssetDocument[];
}) {
  const history = useHistory();

  if (props.assets.length === 0) {
    history.push("/assets/new");
    return null;
  }

  function chooseAsset(asset, index) {
    props.setCurrentAsset(transformToLatest(asset));
    props.setCurrentAssetIndex(index);
    history.push(`/assets/${index}/edit`);
  }

  return (
    <div className="horizontal">
      <div className="asset-selection">
        <div className="asset-selection-controls">
          {props.assets.map((asset, index) => {
            return (
              <AssetChoice
                asset={asset}
                key={asset.name + index}
                handleClick={() => chooseAsset(asset, index)}
              ></AssetChoice>
            );
          })}
        </div>
      </div>
      <div className="sidebar">
        <button onClick={() => history.push("/assets/new")}>
          ADD NEW ASSET
        </button>
        <button onClick={() => history.push("/assets/import")}>
          IMPORT ASSET
        </button>
        <button onClick={() => history.push("/collections/print")}>
          PRINT
        </button>
        {/* <button>FONTS</button> */}
        {/* <button>EXPORT</button> */}
      </div>
    </div>
  );
}
