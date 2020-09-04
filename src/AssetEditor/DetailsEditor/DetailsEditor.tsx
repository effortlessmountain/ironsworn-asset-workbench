import React from "react";
import { AssetDocument, transformSvgString } from "../../Asset/asset";
import { AbilitiesEdit } from "./AbilitiesEdit";
import { TopEdit } from "./TopEdit";
import TrackEdit from "./TrackEdit";
import FontsEdit from "./FontsEdit";

type EditorView = "JSON" | "top" | "abilities" | "track" | "fonts" | "export";

function ViewSwitchButton(props: {
  view: EditorView;
  activeView: EditorView;
  children: string;
  handleClick: (view: EditorView) => void;
}) {
  const classes =
    props.view === props.activeView ? "change-view selected" : "change-view";
  return (
    <button
      id={"show-" + props.view + "-view"}
      className={classes}
      onClick={() => props.handleClick(props.view)}
    >
      {props.children}
    </button>
  );
}

function ViewSwitcher(props: {
  activeView: EditorView;
  switchView: (view: EditorView) => void;
}) {
  return (
    <div className="view-switcher">
      <ViewSwitchButton
        view="top"
        activeView={props.activeView}
        handleClick={(view) => props.switchView(view)}
      >
        TOP
      </ViewSwitchButton>
      <ViewSwitchButton
        view="abilities"
        activeView={props.activeView}
        handleClick={(view) => props.switchView(view)}
      >
        Abilities
      </ViewSwitchButton>
      <ViewSwitchButton
        view="track"
        activeView={props.activeView}
        handleClick={(view) => props.switchView(view)}
      >
        Track
      </ViewSwitchButton>
      <ViewSwitchButton
        view="fonts"
        activeView={props.activeView}
        handleClick={(view) => props.switchView(view)}
      >
        Fonts
      </ViewSwitchButton>
      <ViewSwitchButton
        view="JSON"
        activeView={props.activeView}
        handleClick={(view) => props.switchView(view)}
      >
        JSON
      </ViewSwitchButton>
      <ViewSwitchButton
        view="export"
        activeView={props.activeView}
        handleClick={(view) => props.switchView(view)}
      >
        export
      </ViewSwitchButton>
    </div>
  );
}

type DetailsEditorProps = {
  currentAsset: AssetDocument;
  updateAsset(asset): void;
  askToDelete(): void;
  previewAssetImage(): void;
  downloadAssetImage(): void;
};

type DetailsEditorState = {
  activeView: EditorView;
  editorJSON: string;
  errorText: string;
};

function asJSON(val) {
  return JSON.stringify(val, null, 2);
}

export default class DetailsEditor extends React.Component<
  DetailsEditorProps,
  DetailsEditorState
> {
  constructor(props) {
    super(props);
    this.state = {
      editorJSON: "",
      activeView: "top",
      errorText: "",
    };
  }

  switchView(view: EditorView) {
    this.setState({
      activeView: view,
    });
  }

  handleJSONChange(json) {
    try {
      this.props.updateAsset(JSON.parse(json));
      this.setState({
        editorJSON: "",
        errorText: "",
      });
    } catch (error) {
      this.setState({
        editorJSON: json,
        errorText: "Error parsing JSON: " + error.toString(),
      });
    }
  }

  resetEditorJson() {
    this.setState({
      editorJSON: "",
      errorText: "",
    });
  }

  handleIconImport() {
    //todo: move away from queryselecting and use React
    const iconFileInput = document.querySelector(
      "#icon-fileselect"
    ) as HTMLInputElement;
    const iconAuthorInput = document.querySelector(
      "#icon-author"
    ) as HTMLInputElement;

    const file = iconFileInput.files[0];
    if (file) {
      var fileReader = new FileReader();
      fileReader.onload = (e) => {
        var svg = e.target.result as string;
        this.props.currentAsset.icon = {
          type: "svg",
          name: file.name.split(".").slice(0, -1).join("."),
          author: iconAuthorInput.value,
          svg: transformSvgString(svg),
        };
        this.props.updateAsset(this.props.currentAsset);
      };
      fileReader.readAsText(file);
    } else {
      alert("missing file");
    }
  }

  render() {
    return (
      <div className="editor">
        <ViewSwitcher
          activeView={this.state.activeView}
          switchView={(view) => this.switchView(view)}
        ></ViewSwitcher>
        {this.state.activeView === "top" && (
          <TopEdit
            currentAsset={this.props.currentAsset}
            updateAsset={(asset) => this.props.updateAsset(asset)}
            askToDelete={() => this.props.askToDelete()}
            handleIconImport={() => this.handleIconImport()}
          ></TopEdit>
        )}

        {this.state.activeView === "abilities" && (
          <AbilitiesEdit
            currentAsset={this.props.currentAsset}
            updateAsset={(asset) => this.props.updateAsset(asset)}
          ></AbilitiesEdit>
        )}

        {this.state.activeView === "track" && (
          <TrackEdit
            currentAsset={this.props.currentAsset}
            updateAsset={(asset) => this.props.updateAsset(asset)}
          ></TrackEdit>
        )}

        {this.state.activeView === "fonts" && (
          <FontsEdit
            currentAsset={this.props.currentAsset}
            updateAsset={(asset) => this.props.updateAsset(asset)}
          ></FontsEdit>
        )}

        {this.state.activeView === "JSON" && (
          <div className="editor-view">
            <div>
              <textarea
                className="interface-input thin-box-border"
                spellCheck="false"
                value={this.state.editorJSON || asJSON(this.props.currentAsset)}
                onChange={(e) => this.handleJSONChange(e.currentTarget.value)}
              ></textarea>
            </div>
            <div className="json-error-container">
              {this.state.errorText && (
                <div className="json-error">
                  {this.state.errorText}
                  <button onClick={() => this.resetEditorJson()}>
                    Reset to valid state
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {this.state.activeView === "export" && (
          <div className="editor-view">
            <div className=" export vertical">
              <p>
                Use the buttons below to get your asset in PNG format. Preview
                will show you the generated image in the browser, while Download
                will bring up your browser's save dialog.
              </p>
              <button
                id="preview-download"
                onClick={() => this.props.previewAssetImage()}
              >
                {" "}
                preview as image{" "}
              </button>
              <button
                id="download"
                onClick={() => this.props.downloadAssetImage()}
              >
                {" "}
                download as image{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
