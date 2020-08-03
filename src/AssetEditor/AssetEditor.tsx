import { AssetDocument } from '../Asset/asset'
import React from 'react'
import DetailsEditor from './DetailsEditor/DetailsEditor'


type SidePanelProps = {
    currentAsset: AssetDocument,
    updateAsset(asset: AssetDocument): void,
    askToDelete(): void,
    assetScale: string,
    handleAssetScaleChange(newScale: string): void
    showScreen(screen): void,
    previewAssetImage(): void,
    downloadAssetImage(): void
}

export function SidePanel(props: SidePanelProps) {
    return (<div className="interface">
        <DetailsEditor
            currentAsset={props.currentAsset}
            updateAsset={props.updateAsset}
            askToDelete={props.askToDelete}
            previewAssetImage={props.previewAssetImage}
            downloadAssetImage={props.downloadAssetImage}></DetailsEditor>

        <div className="bottom-controls">
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
            <button className="asset-back-button" onClick={() => props.showScreen("choose")}>Back</button>
        </div>
    </div>)
}