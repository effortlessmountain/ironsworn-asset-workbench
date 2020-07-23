import React from "react";
import { SidePanel } from "./AssetEditor/AssetEditor";
import { AssetDocument, UnspecifiedAssetDocument } from "./Asset/asset";
import { transformToLatest } from "./Asset/assetTransformation";
import { calculateScale, AssetScale } from "./Asset/assetScaling";
import { AssetDisplay } from "./Asset/AssetDisplay";
import Download from "./Export/Download"
import AssetSelection from './Collections/AssetSelection'
import AssetCreation from "./Collections/AssetCreation";
import { Collection, createCollection } from "./Collections/collection";
import { putLoneAssetIntoCollection } from "./Collections/collectionTransformation";



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

    persistCollection(collection) {
        window.localStorage.setItem("collections", JSON.stringify([collection]))
    }

    updateAsset(asset) {
        this.setState((state) => {
            state.currentCollection.assets[state.currentAssetIndex] = asset
            this.persistCollection(state.currentCollection)
            return {
                currentAsset: transformToLatest(asset)
            }
        })
    }

    askToDelete() {
        if (window.confirm("Delete this asset?")) {
            this.setState((state) => {
                state.currentCollection.assets.splice(state.currentAssetIndex, 1)
                this.persistCollection(state.currentCollection)
                return {
                    currentCollection: state.currentCollection,
                    currentScreen: "choose"
                }
            })
        }
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
                    <h2>Asset Workbench <span className="app-version">v0.9.0</span></h2>
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
                            <AssetDisplay
                                asset={this.state.currentAsset}
                                scale={this.state.assetScale}
                            ></AssetDisplay>
                        </div>
                        <SidePanel
                            currentAsset={this.state.currentAsset}
                            updateAsset={(asset) => this.updateAsset(asset)}
                            askToDelete={() => this.askToDelete()}
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