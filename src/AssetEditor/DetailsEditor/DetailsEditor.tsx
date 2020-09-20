import React from "react";
import { AssetDocument, transformSvgString } from "../../Asset/asset";
import { AbilitiesEdit } from "./AbilitiesEdit";
import { TopEdit } from "./TopEdit";
import TrackEdit from "./TrackEdit";
import FontsEdit from "./FontsEdit";

type EditorView = "top" | "abilities" | "track" | "fonts";

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
    </div>
  );
}

type DetailsEditorProps = {
  currentAsset: AssetDocument;
  updateAsset(asset): void;
};

type DetailsEditorState = {
  activeView: EditorView;
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
      activeView: "top",
    };
  }

  switchView(view: EditorView) {
    this.setState({
      activeView: view,
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
      <div className="details-editor">
        <ViewSwitcher
          activeView={this.state.activeView}
          switchView={(view) => this.switchView(view)}
        ></ViewSwitcher>
        {this.state.activeView === "top" && (
          <TopEdit
            currentAsset={this.props.currentAsset}
            updateAsset={(asset) => this.props.updateAsset(asset)}
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
      </div>
    );
  }
}
