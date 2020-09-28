import React from "react";
import { LabeledTextInput, LabeledTextAreaInput } from "../LabeledInputs";
import { AssetDocument } from "../../Asset/asset";
import { UpdateAsset } from "../../App";

type TopEditProps = {
  currentAsset: AssetDocument;
  updateAsset: UpdateAsset;
  handleIconImport(): void; //todo: move fully inte here
};

export function TopEdit(props: TopEditProps) {
  return (
    <div className="editor-view misc-editor-view">
      <div className="horizontal">
        <div className="vertical">
          <LabeledTextInput
            label="Type"
            id="asset-type-input"
            value={props.currentAsset.type}
            handleChange={(e) => {
              props.currentAsset.type = e.currentTarget.value;
              props.updateAsset(props.currentAsset);
            }}
          ></LabeledTextInput>
          <LabeledTextInput
            label="Asset Name"
            id="asset-name-input"
            value={props.currentAsset.name}
            handleChange={(e) => {
              props.currentAsset.name = e.currentTarget.value;
              props.updateAsset(props.currentAsset);
            }}
          ></LabeledTextInput>
          <LabeledTextInput
            label="Write-in (optional)"
            id="asset-write-in-input"
            value={props.currentAsset.writeIn || ""}
            handleChange={(e) => {
              props.currentAsset.writeIn = e.currentTarget.value;
              props.updateAsset(props.currentAsset);
            }}
          ></LabeledTextInput>
          <LabeledTextInput
            label="Second Write-in (optional)"
            id="asset-second-write-in-input"
            value={props.currentAsset.writeIn2 || ""}
            handleChange={(e) => {
              props.currentAsset.writeIn2 = e.currentTarget.value;
              props.updateAsset(props.currentAsset);
            }}
          ></LabeledTextInput>
        </div>
      </div>
      <LabeledTextAreaInput
        label="Description (optional)"
        className="asset-description-input"
        value={props.currentAsset.description}
        handleChange={(e) => {
          props.currentAsset.description = e.currentTarget.value;
          props.updateAsset(props.currentAsset);
        }}
      ></LabeledTextAreaInput>
      <div className="icon-import">
        <div className="icon-import-helptext">
          <p>
            SVG icons are supported. Use a transparent background for best
            results.
          </p>
          <ol>
            <li>
              Head over to{" "}
              <a
                href="https://game-icons.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                GameIcons.net
              </a>
              , a wonderful resource of Creative Commons-licensed icons.
            </li>
            <li>
              On the left hand side, with "Studio" set to background, set "Type"
              to "none" (for a transparent background).
            </li>
            <li>Download the icon.</li>
            <li>
              Click "browse..." under "Icon to import" below here and select the
              just-downloaded icon.
            </li>
            <li>Fill in the artist's name and click "IMPORT".</li>
          </ol>
        </div>

        <div className="icon-import-controls">
          <div className="icon-import-fileselect">
            <label htmlFor="icon-fileselect">Icon to import</label>
            <input type="file" id="icon-fileselect" />
          </div>
          <div className="icon-import-author">
            <label htmlFor="icon-author">Icon Artist</label>
            <input
              type="text"
              id="icon-author"
              defaultValue={(props.currentAsset.icon || {})["author"] || ""}
            />
            {/* todo: standardize icon schema across types */}
          </div>
          <button
            id="icon-import-button"
            onClick={() => props.handleIconImport()}
          >
            {" "}
            Import{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
