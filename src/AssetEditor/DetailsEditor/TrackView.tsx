import React from 'react'
import { cloneDeep } from 'lodash'
import { AssetDocument } from '../../Asset/asset'
import { LabeledTextAreaInput, LabeledNumberInput } from '../LabeledInputs'

type TrackType = "none" | "numerical" | "text"

function LabeledRadioInput(props: {
    label: string,
    checked: boolean,
    value: TrackType,
    onChange(e)
}) {
    return (<div>
        <input
            type="radio"
            id={`choose-track-${props.value}`}
            value={props.value}
            checked={props.checked}
            onChange={props.onChange} />
        <label>{props.label}</label>
    </div>);
}


type TrackViewProps = {
    currentAsset: AssetDocument, //todo: not require passing in the entire asset to every view
    updateAsset(asset): void
}

export default class TrackView extends React.Component<TrackViewProps> {
    handleTrackTypeChange(e) {
        if (e.currentTarget.value === "none") {
            this.props.currentAsset.track = null
            this.props.updateAsset(this.props.currentAsset)
        } else if (e.currentTarget.value === "numerical") {
            this.props.currentAsset.track = 5
            this.props.updateAsset(this.props.currentAsset)
        } else if (e.currentTarget.value === "text") {
            this.props.currentAsset.track = ["Value 1", "Value 2"]
            this.props.updateAsset(this.props.currentAsset)
        }
    }

    handleNumericalTrackChange(value: number) {
        let clone = cloneDeep(this.props.currentAsset)
        clone.track = +value
        this.props.updateAsset(clone)
    }

    render() {
        return (<div className="editor-view">
            <label>Type of Track</label>
            <LabeledRadioInput label="No track"
                checked={this.props.currentAsset.track == null}
                onChange={(e) => this.handleTrackTypeChange(e)}
                value="none"></LabeledRadioInput>
            <LabeledRadioInput label="Numerical"
                checked={(typeof (this.props.currentAsset.track) === "number")}
                onChange={(e) => this.handleTrackTypeChange(e)}
                value="numerical"></LabeledRadioInput>
            <LabeledRadioInput label="Text"
                checked={Array.isArray(this.props.currentAsset.track)}
                onChange={(e) => this.handleTrackTypeChange(e)}
                value="text"></LabeledRadioInput>

            {(typeof (this.props.currentAsset.track) === "number") &&
                <LabeledNumberInput
                    label="Number of Values"
                    value={this.props.currentAsset.track}
                    step="1"
                    id="track-number-input"
                    handleChange={(e) => this.handleNumericalTrackChange(e)}></LabeledNumberInput>}

            {Array.isArray(this.props.currentAsset.track) &&
                <LabeledTextAreaInput label="Options (comma-delimited)"
                    className="track-options-input"
                    value={this.props.currentAsset.track.join(', ')}
                    handleChange={(e) => {
                        let values = e.currentTarget.value.split(",").map((val) => val.trim())
                        this.props.currentAsset.track = values //todo: not mutate at every turn
                        this.props.updateAsset(this.props.currentAsset)
                    }}></LabeledTextAreaInput>}
        </div>)
    }
}