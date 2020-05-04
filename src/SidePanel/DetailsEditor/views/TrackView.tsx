import React from 'react'
import { cloneDeep } from 'lodash'
import { AssetDocument } from '../../../models/models'
import { LabeledTextAreaInput } from '../../LabeledTextInput'

type TrackViewProps = {
    currentAsset: AssetDocument, //todo: not require passing in the entire asset to every view
    setCurrentAsset(asset): void
}
export default class TrackView extends React.Component<TrackViewProps> {
    handleTrackTypeChange(e) {
        if (e.currentTarget.value === "none") {
            this.props.currentAsset.track = null
            this.props.setCurrentAsset(this.props.currentAsset)
        } else if (e.currentTarget.value === "numerical") {
            this.props.currentAsset.track = 5
            this.props.setCurrentAsset(this.props.currentAsset)
        } else if (e.currentTarget.value === "text") {
            this.props.currentAsset.track = ["Value 1", "Value 2"]
            this.props.setCurrentAsset(this.props.currentAsset)
        }
    }

    handleNumericalTrackChange(e) {
        let clone = cloneDeep(this.props.currentAsset)
        clone.track = +e.currentTarget.value
        this.props.setCurrentAsset(clone)
    }

    render() {
        return (<div className="editor-view">
            <label>Type of Track</label>
            <div>
                <input type="radio"
                    value="none"
                    checked={this.props.currentAsset.track == null}
                    onChange={(e) => this.handleTrackTypeChange(e)} />
                <label>No track</label>
            </div>
            <div>
                <input
                    type="radio"
                    value="numerical"
                    checked={(typeof (this.props.currentAsset.track) === "number")}
                    onChange={(e) => this.handleTrackTypeChange(e)} />
                <label>Numerical</label>
            </div>
            <div>
                <input
                    type="radio"
                    value="text"
                    checked={Array.isArray(this.props.currentAsset.track)}
                    onChange={(e) => this.handleTrackTypeChange(e)} />
                <label>Text Values</label>
            </div>

            {(typeof (this.props.currentAsset.track) === "number") &&
                <div>
                    <label>Number of Values</label>
                    <input type="number" value={this.props.currentAsset.track} onChange={(e) => this.handleNumericalTrackChange(e)} />
                </div>}

            {Array.isArray(this.props.currentAsset.track) &&
                <LabeledTextAreaInput label="Options (comma-delimited)"
                    value={this.props.currentAsset.track.join(',')}
                    handleChange={(e) => {
                        let values = e.currentTarget.value.split(",")//.map(option => option.trim())
                        this.props.currentAsset.track = values //todo: not mutate at every turn
                        this.props.setCurrentAsset(this.props.currentAsset)
                    }}></LabeledTextAreaInput>}
        </div>)
    }
}