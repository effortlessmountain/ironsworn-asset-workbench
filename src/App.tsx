import React from "react";
import { SidePanel } from "./SidePanel/SidePanel";
import { AssetDocument, UnspecifiedAssetDocument } from "./models/assetModels";
import { transformToLatest } from "./models/assetTransformation";
import { calculateScale, AssetScale } from "./assetScaling";
import { Asset } from "./Asset/Asset";
import Download from "./SidePanel/Download"
import AssetSelection from './AssetSelection'
import AssetCreation from "./AssetCreation";
import { Collection, createCollection } from "./models/collection";
import { putLoneAssetIntoCollection } from "./models/collectionTransformation";



type Screen = "choose" | "new" | "edit" | "preview-download"

type AppState = {
    currentAsset: AssetDocument,
    currentCollection: Collection,
    currentAssetIndex: number,
    assetScale: AssetScale,
    currentScreen: Screen
    previewDownload: boolean
}

export function sussCurrentCollection(maybeCollections, maybeAsset) {
    let startingCollection = null
    if (maybeCollections && maybeCollections.length > 0) {
        startingCollection = maybeCollections[0]
    } else {
        if (maybeAsset) {
            startingCollection = putLoneAssetIntoCollection(maybeAsset)
        } else {
            startingCollection = createCollection()
        }
    }
    return startingCollection
}

export default class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props)

        let maybeCollections = this.maybeGetLocalCollections()
        let maybeAsset = this.maybeGetLocalAsset()
        let startingCollection = sussCurrentCollection(maybeCollections, maybeAsset)

        let startingScale = calculateScale()

        this.state = {
            currentAsset: null,
            currentAssetIndex: null,
            currentCollection: startingCollection,
            assetScale: startingScale,
            currentScreen: "choose",
            previewDownload: true
        }
    }

    maybeGetLocalCollections(): Collection[] {
        const maybeCollections = window.localStorage.getItem("collections")
        if (maybeCollections) {
            try {
                return JSON.parse(maybeCollections)
            } catch (error) {
                window.alert("Error parsing local collections: " + error.toString())
            }
        }
        return null
    }

    maybeGetLocalAsset(): UnspecifiedAssetDocument {
        const maybeAsset = window.localStorage.getItem("currentAsset")
        if (maybeAsset) {
            try {
                return JSON.parse(maybeAsset)
            } catch (error) {
                window.alert("Error parsing local asset: " + error.toString())
            }
        }
        return null
    }

    handleAssetScaleChange(newScale) {
        this.setState({ assetScale: newScale })
    }

    setCurrentAsset(asset) {
        this.setState((state) => {
            state.currentCollection.assets[state.currentAssetIndex] = asset
            window.localStorage.setItem("collections", JSON.stringify([state.currentCollection]))
            return {
                currentAsset: transformToLatest(asset)
            }
        })
    }

    createAsset(asset) {
        this.setState((state) => {
            let index = (state.currentCollection.assets.push(asset)) - 1
            window.localStorage.setItem("collections", JSON.stringify([state.currentCollection]))
            return {
                currentAsset: transformToLatest(asset),
                currentAssetIndex: index,
                currentCollection: state.currentCollection,
                currentScreen: "edit"
            }
        })
    }

    chooseAsset(asset, index) {
        this.setState({
            currentAsset: transformToLatest(asset),
            currentAssetIndex: index,
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
                    <h2> Ironsworn Asset Workbench v0.8.2</h2>
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
                        chooseAsset={(asset, index) => this.chooseAsset(asset, index)}
                        showNewScreen={() => this.showScreen("new")}
                        assets={this.state.currentCollection.assets}></AssetSelection>
                }

                {this.state.currentScreen === "new" &&
                    <AssetCreation
                        createAsset={(asset) => this.createAsset(asset)}
                        showChooseScreen={() => this.showScreen("choose")}></AssetCreation>
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