import { AssetDocument } from '../models/models'
import React from 'react'
import { ironclad, lightbearer, caveLion } from '../exampleAssets'
import DetailsEditor from './DetailsEditor/DetailsEditor'

function Examples(props: { setCurrentAsset: (asset) => void }) {
    return (
        <div className="example-controls">
            <label>Load Example: </label>
            <button className="show-example" onClick={() => props.setCurrentAsset(lightbearer)}>Lightbearer</button>
            <button className="show-example" onClick={() => props.setCurrentAsset(ironclad)}>Ironclad</button>
            <button className="show-example" onClick={() => props.setCurrentAsset(caveLion)}>Cave Lion</button>
        </div>
    )
}

type SidePanelProps = {
    currentAsset: AssetDocument,
    setCurrentAsset(asset: AssetDocument): void
    assetScale: string,
    handleAssetScaleChange(newScale: string): void
    showScreen(screen): void,
    previewAssetImage(): void,
    downloadAssetImage(): void
}

export class SidePanel extends React.Component<SidePanelProps> {
    render() {
        return (<div className="interface">
            <h2>Ironsworn Asset Workbench v0.8.0</h2>
            <div className="top-row-controls">
                <div>
                    <label>Scale (also affects Download size)</label>
                    <select
                        id="scale-select"
                        onChange={(e) => this.props.handleAssetScaleChange(e.target.value)}
                        value={this.props.assetScale}
                    >
                        <option value="one-third">250px by 350px</option>
                        <option value="one-half">375px by 525px</option>
                        <option value="two-thirds">500px by 700px</option>
                        <option value="full">750px by 1050px</option>
                    </select>
                </div>
                <div>
                    <button id="show-help" onClick={() => this.props.showScreen('help')}>How do I...?</button>
                </div>
            </div>

            <Examples setCurrentAsset={(asset) => this.props.setCurrentAsset(asset)}></Examples>

            <DetailsEditor
                currentAsset={this.props.currentAsset}
                setCurrentAsset={(asset) => this.props.setCurrentAsset(asset)}
                previewAssetImage={() => this.props.previewAssetImage()}
                downloadAssetImage={() => this.props.downloadAssetImage()}></DetailsEditor>
            <div>
                <p className="credits">
                    Ironsworn and the official Ironsworn assets Copyright ©2019 Shawn Tomkin and used under
                    the Creative Commons Attribution-NonCommercial-
                    ShareAlike 4.0 International license.
                </p>
            </div>
        </div>)
    }
}