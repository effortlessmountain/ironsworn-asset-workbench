import React from "react";
import { cloneDeep } from "lodash";
import { AssetDocument } from "../../Asset/asset";
import { LabeledTextAreaInput, LabeledNumberInput } from "../LabeledInputs";
import { UpdateAsset } from "../../App";

type TrackType = "none" | "numerical" | "text";

function LabeledRadioInput(props: {
  label: string;
  checked: boolean;
  value: TrackType;
  onChange(e);
}) {
  return (
    <div>
      <input
        type="radio"
        id={`choose-track-${props.value}`}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label>{props.label}</label>
    </div>
  );
}

type TrackEditProps = {
  currentAsset: AssetDocument; //todo: not require passing in the entire asset to every view
  updateAsset: UpdateAsset;
};

export function TrackEdit(props: TrackEditProps) {
  function handleTrackTypeChange(e) {
    if (e.currentTarget.value === "none") {
      props.currentAsset.track = null;
      props.updateAsset(props.currentAsset);
    } else if (e.currentTarget.value === "numerical") {
      props.currentAsset.track = 5;
      props.updateAsset(props.currentAsset);
    } else if (e.currentTarget.value === "text") {
      props.currentAsset.track = ["Value 1", "Value 2"];
      props.updateAsset(props.currentAsset);
    }
  }

  function handleNumericalTrackChange(value: number) {
    let clone = cloneDeep(props.currentAsset);
    clone.track = +value;
    props.updateAsset(clone);
  }

  return (
    <div className="editor-view">
      <label>Type of Track</label>
      <LabeledRadioInput
        label="No track"
        checked={props.currentAsset.track == null}
        onChange={(e) => handleTrackTypeChange(e)}
        value="none"
      ></LabeledRadioInput>
      <LabeledRadioInput
        label="Numerical"
        checked={typeof props.currentAsset.track === "number"}
        onChange={(e) => handleTrackTypeChange(e)}
        value="numerical"
      ></LabeledRadioInput>
      <LabeledRadioInput
        label="Text"
        checked={Array.isArray(props.currentAsset.track)}
        onChange={(e) => handleTrackTypeChange(e)}
        value="text"
      ></LabeledRadioInput>

      {typeof props.currentAsset.track === "number" && (
        <LabeledNumberInput
          label="Number of Values"
          value={props.currentAsset.track}
          step="1"
          id="track-number-input"
          handleChange={(e) => handleNumericalTrackChange(e)}
        ></LabeledNumberInput>
      )}

      {Array.isArray(props.currentAsset.track) && (
        <LabeledTextAreaInput
          label="Options (comma-delimited)"
          className="track-options-input"
          value={props.currentAsset.track.join(", ")}
          handleChange={(e) => {
            let values = e.currentTarget.value
              .split(",")
              .map((val) => val.trim());
            props.currentAsset.track = values; //todo: not mutate at every turn
            props.updateAsset(props.currentAsset);
          }}
        ></LabeledTextAreaInput>
      )}
    </div>
  );
}
