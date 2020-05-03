import React from "react";
import { SidePanel } from "./SidePanel/SidePanel";
import { AssetDocument, transformToLatest } from "./models/models";
import { caveLion } from "./exampleAssets";
import { calculateScale } from "./assetScaling";
import { Asset } from "./Asset/Asset";
import Download from "./SidePanel/Download"


type Screen = "main" | "preview-download"

type AppState = {
    currentAsset: AssetDocument,
    assetScale: string,
    currentScreen: Screen
    previewDownload: boolean
}

export default class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props)
        let startingAsset = transformToLatest(caveLion as AssetDocument) //This is where I learn the tragic extent of the failings of TypeScript's type inference.
        let startingScale = calculateScale()
        this.state = {
            currentAsset: startingAsset,
            assetScale: startingScale,
            currentScreen: "main",
            previewDownload: true
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

    showScreen(screen) {
        this.setState({ currentScreen: screen })
    }

    previewAssetImage() {
        this.setState({ currentScreen: 'preview-download', previewDownload: true })
    }

    downloadAssetImage() {
        this.setState({ currentScreen: 'preview-download', previewDownload: false })
    }

    render() {
        return (
            <div className="app">
                {this.state.currentScreen === "preview-download" &&
                    <Download
                        asset={this.state.currentAsset}
                        scale={this.state.assetScale}
                        goBackToMain={() => this.showScreen("main")}
                        preview={this.state.previewDownload}></Download>
                }

                {this.state.currentScreen === "main" &&
                    <div className="container">
                        <div className="assets">
                            <Asset
                                asset={this.state.currentAsset}
                                scale={this.state.assetScale}
                            ></Asset>
                        </div>
                        <SidePanel
                            currentAsset={this.state.currentAsset}
                            setCurrentAsset={(asset) => this.setCurrentAsset(asset)}
                            assetScale={this.state.assetScale}
                            handleAssetScaleChange={(e) => this.handleAssetScaleChange(e)}
                            showScreen={(screen) => this.showScreen(screen)}
                            previewAssetImage={() => this.previewAssetImage()}
                            downloadAssetImage={() => this.downloadAssetImage()}
                        ></SidePanel>
                    </div>}
            </div>)
    }
}