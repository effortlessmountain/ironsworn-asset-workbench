import React from "react";
import { SidePanel } from "./SidePanel/SidePanel";
import { AssetDocument, transformToLatest, UnspecifiedAssetDocument } from "./models/models";
import { caveLion } from "./exampleAssets";
import { calculateScale, AssetScale } from "./assetScaling";
import { Asset } from "./Asset/Asset";
import Download from "./SidePanel/Download"
import AssetSelection from './AssetSelection'



type Screen = "choose" | "edit" | "preview-download"

type AppState = {
    currentAsset: AssetDocument,
    assetScale: AssetScale,
    currentScreen: Screen
    previewDownload: boolean
}

export default class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props)
        let startingAsset = transformToLatest(caveLion as UnspecifiedAssetDocument) //This is where I learn the tragic extent of the failings of TypeScript's type inference.
        let startingScale = calculateScale()
        this.state = {
            currentAsset: startingAsset,
            assetScale: startingScale,
            currentScreen: "choose",
            previewDownload: true
        }
    }

    getLocalAsset(): UnspecifiedAssetDocument {
        const maybeAsset = window.localStorage.getItem("currentAsset")
        if (maybeAsset) {
            try {
                return JSON.parse(maybeAsset)
            } catch (error) {
                window.alert("Error parsing local asset: " + error.toString())
            }
        }
        return {
            documentFormatVersion: 2,
            abilities: [],
            description: "",
            name: "Your Asset",
            type: "",
            fonts: {},
            icon: "",
            track: null,
            writeIn: ""
        }
    }

    handleAssetScaleChange(newScale) {
        this.setState({ assetScale: newScale })
    }

    setCurrentAsset(asset) {
        this.setState({
            currentAsset: transformToLatest(asset)
        })
        window.localStorage.setItem("currentAsset", JSON.stringify(asset))
    }

    chooseAsset(asset) {
        this.setState({
            currentAsset: transformToLatest(asset),
            currentScreen: "edit"
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
                <header className="app-header">
                    <h2> Ironsworn Asset Workbench v0.8.0</h2>
                </header>
                {this.state.currentScreen === "preview-download" &&
                    <Download
                        asset={this.state.currentAsset}
                        scale={this.state.assetScale}
                        goBackToMain={() => this.showScreen("edit")}
                        preview={this.state.previewDownload}></Download>
                }

                {this.state.currentScreen === "choose" &&
                    <AssetSelection
                        chooseAsset={(asset) => this.chooseAsset(asset)}
                        localAsset={this.getLocalAsset()}></AssetSelection>
                }

                {this.state.currentScreen === "edit" &&
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