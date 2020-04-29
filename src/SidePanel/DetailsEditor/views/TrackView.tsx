import React from 'react'
import { AssetDocument } from '../../../models/models'

type TrackViewProps = {
    currentAsset: AssetDocument, //todo: not require passing in the entire asset to every view
    setCurrentAsset(asset): void
}
export default class TrackView extends React.Component<TrackViewProps> {
    render() {
        return (<div></div>)
    }
}