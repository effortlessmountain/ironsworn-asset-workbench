import React from "react";
import { Editor } from "./Editor/Editor";
import { closeDownload, renderOnCanvas } from "./download";
import { AssetDocument, transformToLatest } from "./models/models";
import { caveLion } from "./exampleAssets";
import { calculateScale } from "./assetScaling";
import { Asset } from "./Asset/Asset";

type AppState = {
    currentAsset: AssetDocument,
    assetScale: string
}

export default class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props)
        let startingAsset = transformToLatest(caveLion as AssetDocument) //This is where I learn the tragic extent of the failings of TypeScript's type inference.
        let startingScale = calculateScale()
        this.state = {
            currentAsset: startingAsset,
            assetScale: startingScale
        }
    }

    handleAssetScaleChange(newScale) {
        this.setState({ assetScale: newScale })
    }

    setCurrentAsset(asset) {
        this.setState({
            currentAsset: transformToLatest(asset)
        })
    }

    render() {
        return (
            <div className="app">
                <div className="render"></div>
                <div className="preview-download">
                    <div className="image-container"></div>
                    <div className="preview-download-help">
                        <p>Right click and 'Save image as...' to save. If the image is truncated,
                    try making your browser window bigger before pressing 'preview' or 'download as image'.</p>
                        <button id="done-downloading">close</button>
                    </div>
                </div>
                <div className="help">
                    <div className="help-content">
                        <h1>Help</h1>
                        <h3>What fonts can I use?</h3>
                        <p>The fonts from <a href="https://fonts.google.com/">Google Fonts</a> are supported. Put in the name of the
                    font into the corresponding property and you're all set!</p>
                        <h3>How do I add an icon to my asset?</h3>
                        <p>If you want a unicode character, just set the value of the 'icon' attribute to that character in quotes:</p>
                        <pre>"icon": "▿"</pre>
                        <p>If you want a fancier icon, the Asset Workbench supports importing SVG icons with no background.</p>
                        <ol>
                            <li>Head over to <a href="https://game-icons.net/">GameIcons.net</a>, a wonderful resource of Creative
                        Commons-licensed icons</li>
                            <li>On the left hand side, with "Studio" set to background, set "Type" to "none" (for a transparent
                        background)</li>
                            <li>Download the icon.</li>
                            <li>Click "browse..." next to "Icon to import:" in the Asset Workbench and select the icon you just
                            downloaded.</li>
                            <li>Fill in the artist's name and click "IMPORT".</li>
                        </ol>
                        <button id="close-help">Close</button>
                    </div>
                </div>
                <div className="container">
                    <div className="assets">
                        <Asset
                            asset={this.state.currentAsset}
                            scale={this.state.assetScale}
                        ></Asset>
                    </div>
                    <Editor
                        currentAsset={this.state.currentAsset}
                        setCurrentAsset={(asset) => this.setCurrentAsset(asset)}
                        assetScale={this.state.assetScale}
                        handleAssetScaleChange={(e) => this.handleAssetScaleChange(e)}
                        closeDownload={closeDownload}
                        renderOnCanvas={renderOnCanvas}
                    ></Editor>
                </div>
            </div>)
    }
}