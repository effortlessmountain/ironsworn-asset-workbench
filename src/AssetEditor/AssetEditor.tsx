import React from "react";
import { useHistory } from "react-router-dom";
import { AssetDocument } from "../Asset/asset";
import { DetailsEditor } from "./DetailsEditor/DetailsEditor";
import { AssetDisplay } from "../Asset/AssetDisplay";
import { AssetScale } from "../Asset/assetScaling";
import { UpdateAsset } from "../App";

function downloadJson(asset) {
  var assetJson =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(asset, null, 2));
  const link = document.createElement("a");
  link.href = assetJson;
  link.download = asset.name + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export type HandleAssetScaleChange = (newScale: AssetScale) => void;

type AssetEditorProps = {
  currentAsset: AssetDocument;
  currentAssetId: number;
  updateAsset: UpdateAsset;
  askToDelete(history): void;
  assetScale: AssetScale;
  handleAssetScaleChange: HandleAssetScaleChange;
};

export function AssetEditor(props: AssetEditorProps) {
  const history = useHistory();

  return (
    <div className="asset-editor">
      <div className="asset-being-edited">
        <div className="asset-wrapper">
          <AssetDisplay
            asset={props.currentAsset}
            scale={props.assetScale}
          ></AssetDisplay>
        </div>
      </div>
      <DetailsEditor
        currentAsset={props.currentAsset}
        updateAsset={props.updateAsset}
      ></DetailsEditor>
      <div className="sidebar">
        <button className="asset-back-button" onClick={() => history.push("/")}>
          BACK
        </button>
        <div className="scale-control">
          <label>Scale (also affects Download size)</label>
          <select
            id="scale-select"
            onChange={(e) =>
              props.handleAssetScaleChange(e.target.value as AssetScale)
            }
            value={props.assetScale}
          >
            <option value="one-third">250px by 350px</option>
            <option value="one-half">375px by 525px</option>
            <option value="two-thirds">500px by 700px</option>
            <option value="full">750px by 1050px</option>
          </select>
        </div>
        <button
          id="preview-download"
          onClick={() =>
            history.push(`/assets/${props.currentAssetId}/preview`)
          }
        >
          PREVIEW IMAGE
        </button>
        <button
          id="download"
          onClick={() =>
            history.push(`/assets/${props.currentAssetId}/download`)
          }
        >
          DOWNLOAD IMAGE
        </button>
        <button onClick={() => downloadJson(props.currentAsset)}>
          DOWNLOAD JSON
        </button>
        <button
          onClick={() => props.askToDelete(history)}
          className="delete-asset-button"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
