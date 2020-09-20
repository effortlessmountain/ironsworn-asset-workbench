import React from "react";
import { LabeledTextInput, LabeledTextAreaInput } from "../LabeledInputs";
import { AssetDocument } from "../../Asset/asset";

type TopEditProps = {
  currentAsset: AssetDocument;
  updateAsset(asset): void;
  handleIconImport(): void; //todo: move fully inte here
};

export class TopEdit extends React.Component<TopEditProps> {
  render() {
    return (
      <div className="editor-view misc-editor-view">
        <div className="horizontal">
          <div className="vertical">
            <LabeledTextInput
              label="Type"
              id="asset-type-input"
              value={this.props.currentAsset.type}
              handleChange={(e) => {
                this.props.currentAsset.type = e.currentTarget.value;
                this.props.updateAsset(this.props.currentAsset);
              }}
            ></LabeledTextInput>
            <LabeledTextInput
              label="Asset Name"
              id="asset-name-input"
              value={this.props.currentAsset.name}
              handleChange={(e) => {
                this.props.currentAsset.name = e.currentTarget.value;
                this.props.updateAsset(this.props.currentAsset);
              }}
            ></LabeledTextInput>
            <LabeledTextInput
              label="Write-in (optional)"
              id="asset-write-in-input"
              value={this.props.currentAsset.writeIn || ""}
              handleChange={(e) => {
                this.props.currentAsset.writeIn = e.currentTarget.value;
                this.props.updateAsset(this.props.currentAsset);
              }}
            ></LabeledTextInput>
            <LabeledTextInput
              label="Second Write-in (optional)"
              id="asset-second-write-in-input"
              value={this.props.currentAsset.writeIn2 || ""}
              handleChange={(e) => {
                this.props.currentAsset.writeIn2 = e.currentTarget.value;
                this.props.updateAsset(this.props.currentAsset);
              }}
            ></LabeledTextInput>
          </div>
        </div>
        <LabeledTextAreaInput
          label="Description (optional)"
          className="asset-description-input"
          value={this.props.currentAsset.description}
          handleChange={(e) => {
            this.props.currentAsset.description = e.currentTarget.value;
            this.props.updateAsset(this.props.currentAsset);
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
                On the left hand side, with "Studio" set to background, set
                "Type" to "none" (for a transparent background).
              </li>
              <li>Download the icon.</li>
              <li>
                Click "browse..." under "Icon to import" below here and select
                the just-downloaded icon.
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
                defaultValue={
                  (this.props.currentAsset.icon || {})["author"] || ""
                }
              />
              {/* todo: standardize icon schema across types */}
            </div>
            <button
              id="icon-import-button"
              onClick={() => this.props.handleIconImport()}
            >
              {" "}
              Import{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
