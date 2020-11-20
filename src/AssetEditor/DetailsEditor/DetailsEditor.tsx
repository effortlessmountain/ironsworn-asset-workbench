import React, { useState } from "react";
import { AssetDocument, createDataUri } from "../../Asset/asset";
import { AbilitiesEdit } from "./AbilitiesEdit";
import { TopEdit } from "./TopEdit";
import { TrackEdit } from "./TrackEdit";
import { FontsEdit } from "./FontsEdit";
import { UpdateAsset } from "../../App";

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
  updateAsset: UpdateAsset;
};

export function DetailsEditor(props: DetailsEditorProps) {
  const [activeView, setActiveView]: [
    EditorView,
    React.Dispatch<EditorView>
  ] = useState("top" as EditorView);

  function switchView(view: EditorView) {
    setActiveView(view);
  }

  function handleIconImport() {
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
        props.currentAsset.icon = {
          name: file.name.split(".").slice(0, -1).join("."),
          author: iconAuthorInput.value,
          dataUri: createDataUri(svg),
        };
        props.updateAsset(props.currentAsset);
      };
      fileReader.readAsText(file);
    } else {
      alert("missing file");
    }
  }

  return (
    <div className="details-editor">
      <ViewSwitcher
        activeView={activeView}
        switchView={(view) => switchView(view)}
      ></ViewSwitcher>
      {activeView === "top" && (
        <TopEdit
          currentAsset={props.currentAsset}
          updateAsset={(asset) => props.updateAsset(asset)}
          handleIconImport={() => handleIconImport()}
        ></TopEdit>
      )}

      {activeView === "abilities" && (
        <AbilitiesEdit
          currentAsset={props.currentAsset}
          updateAsset={(asset) => props.updateAsset(asset)}
        ></AbilitiesEdit>
      )}

      {activeView === "track" && (
        <TrackEdit
          currentAsset={props.currentAsset}
          updateAsset={(asset) => props.updateAsset(asset)}
        ></TrackEdit>
      )}

      {activeView === "fonts" && (
        <FontsEdit
          currentAsset={props.currentAsset}
          updateAsset={(asset) => props.updateAsset(asset)}
        ></FontsEdit>
      )}
    </div>
  );
}
