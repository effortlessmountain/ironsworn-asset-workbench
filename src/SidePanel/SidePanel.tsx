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

export function SidePanel(props: SidePanelProps) {
    return (<div className="interface">
        <h2>Ironsworn Asset Workbench v0.8.0</h2>
        <div className="top-row-controls">
            <div>
                <label>Scale (also affects Download size)</label>
                <select
                    id="scale-select"
                    onChange={(e) => props.handleAssetScaleChange(e.target.value)}
                    value={props.assetScale}
                >
                    <option value="one-third">250px by 350px</option>
                    <option value="one-half">375px by 525px</option>
                    <option value="two-thirds">500px by 700px</option>
                    <option value="full">750px by 1050px</option>
                </select>
            </div>
        </div>

        <Examples setCurrentAsset={props.setCurrentAsset}></Examples>

        <DetailsEditor
            currentAsset={props.currentAsset}
            setCurrentAsset={props.setCurrentAsset}
            previewAssetImage={props.previewAssetImage}
            downloadAssetImage={props.downloadAssetImage}></DetailsEditor>
        <div>
            <p className="credits">
                Ironsworn and the official Ironsworn assets Copyright ©2019 Shawn Tomkin and used under
                the Creative Commons Attribution-NonCommercial-
                ShareAlike 4.0 International license.
                </p>
        </div>
    </div>)
}