import { AssetDocument } from "../Asset/asset";
import React from "react";
import DetailsEditor from "./DetailsEditor/DetailsEditor";
import { AssetDisplay } from "../Asset/AssetDisplay";
import { AssetScale } from "../Asset/assetScaling";

type SidePanelProps = {
  currentAsset: AssetDocument;
  updateAsset(asset: AssetDocument): void;
  askToDelete(): void;
  assetScale: AssetScale;
  handleAssetScaleChange(newScale: string): void;
  showScreen(screen): void;
  previewAssetImage(): void;
  downloadAssetImage(): void;
};

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

export function AssetEditor(props: SidePanelProps) {
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
        <button
          className="asset-back-button"
          onClick={() => props.showScreen("choose")}
        >
          BACK
        </button>
        <div>
          <label>Scale (also affects Download size)</label>
          <select
            id="scale-select"
            onChange={(e) => props.handleAssetScaleChange(e.target.value)}
            value={props.assetScale}
          >
            <option value="one-third">250px by 350px</option>
            <option value="one-half">375px by 525px</option>
            <option value="two-thirds">500px by 700px</option>
            <option value="full">750px by 1050px</option>
          </select>
        </div>
        <button id="preview-download" onClick={props.previewAssetImage}>
          PREVIEW IMAGE
        </button>
        <button id="download" onClick={props.downloadAssetImage}>
          DOWNLOAD IMAGE
        </button>
        <button onClick={() => downloadJson(props.currentAsset)}>
          DOWNLOAD JSON
        </button>
        <button onClick={props.askToDelete}>DELETE ASSET</button>
      </div>
    </div>
  );
}
