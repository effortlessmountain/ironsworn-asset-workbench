import { transformToLatest, transformSvgString, AssetDocument } from '../models/models'
import React from 'react'
import { ironclad, lightbearer, caveLion } from '../exampleAssets'

function asJSON(val) {
    return JSON.stringify(val, null, 2)
}

function Examples(props: { setCurrentAsset: (asset) => void }) {
    return (
        <div className="example-controls">
            <label>Load Example Asset:</label>
            <button className="show-example" onClick={() => props.setCurrentAsset(lightbearer)}>
                Lightbearer
            </button>
            <button className="show-example" onClick={() => props.setCurrentAsset(ironclad)}>
                Ironclad
            </button>
            <button className="show-example" onClick={() => props.setCurrentAsset(caveLion)}>
                Cave Lion
            </button>
        </div>
    )
}

type EditorView = "JSON" | "misc" | "abilities" | "track" | "fonts" | "import/export"


function ViewSwitchButton(props: {
    view: EditorView,
    activeView: EditorView,
    children: string,
    handleClick: (view: EditorView) => void
}) {
    const classes = props.view === props.activeView ? "change-view selected" : "change-view"
    return (<button className={classes} onClick={() => props.handleClick(props.view)}>{props.children}</button>)
}

function ViewSwitcher(props: {
    activeView: EditorView,
    switchView: (view: EditorView) => void
}) {
    return (
        <div className="view-switcher">
            <ViewSwitchButton view="JSON" activeView={props.activeView} handleClick={(view) => props.switchView(view)}>JSON</ViewSwitchButton>
            <ViewSwitchButton view="misc" activeView={props.activeView} handleClick={(view) => props.switchView(view)}>MISC</ViewSwitchButton>
        </div>
    )
}


type EditorState = {
    editorJSON: string,
    activeView: EditorView
}

type EditorProps = {
    currentAsset: AssetDocument,
    setCurrentAsset: (asset: AssetDocument) => void
    assetScale: string,
    handleAssetScaleChange: (newScale: string) => void
    showScreen: (screen) => void,
    previewAssetImage: () => void,
    downloadAssetImage: () => void
}

export class Editor extends React.Component<EditorProps, EditorState> {
    constructor(props) {
        super(props)
        this.state = {
            editorJSON: asJSON(this.props.currentAsset),
            activeView: "JSON"
        }
    }

    setCurrentAsset(asset) {
        this.setState((state, props) => {
            const latest = transformToLatest(asset)
            this.props.setCurrentAsset(latest)
            return {
                editorJSON: asJSON(asset)
            }
        })
    }

    switchView(view: EditorView) {
        this.setState({
            activeView: view
        })
    }

    handleJSONChange(event) {
        this.setState({ editorJSON: event.target.value })
    }

    updateOnClick() {
        try {
            this.props.setCurrentAsset(JSON.parse(this.state.editorJSON))
        }
        catch (error) {
            window.alert(error)
        }
    }

    handleIconImport() {
        //todo: move away from queryselecting and use React
        const iconFileInput = document.querySelector("#icon-fileselect") as HTMLInputElement
        const iconAuthorInput = document.querySelector("#icon-author") as HTMLInputElement

        const file = iconFileInput.files[0];
        if (file) {
            var fileReader = new FileReader()
            fileReader.onload = (e) => {
                var svg = e.target.result as string
                this.props.currentAsset.icon = {
                    type: "svg",
                    name: file.name.split('.').slice(0, -1).join('.'),
                    author: iconAuthorInput.value,
                    svg: transformSvgString(svg)
                }
                this.props.setCurrentAsset(this.props.currentAsset)
            }
            fileReader.readAsText(file)
        } else {
            alert("missing file")
        }
    }

    render() {
        return (<div className="interface">
            <h2>Ironsworn Asset Workbench v0.7.1</h2>
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

            <Examples setCurrentAsset={(asset) => this.setCurrentAsset(asset)}></Examples>

            <div className="editor">
                <ViewSwitcher activeView={this.state.activeView} switchView={(view) => this.switchView(view)}></ViewSwitcher>
                {this.state.activeView === "JSON" &&
                    <div className="editor-view">
                        <textarea
                            className="interface-input box-border"
                            spellCheck="false"
                            value={this.state.editorJSON}
                            onChange={(event) => this.handleJSONChange(event)}
                        >
                        </textarea>
                        <button
                            className="update"
                            onClick={() => this.updateOnClick()}
                        >
                            update
                        </button>
                        <div className="icon-import box-border">
                            <div>
                                <label htmlFor="icon-fileselect">Icon to import: </label>
                                <input type="file" id="icon-fileselect" />
                                <label htmlFor="icon-author">Icon Author: </label>
                                <input type="text" id="icon-author" />
                                <button id="icon-import-button" onClick={() => this.handleIconImport()} > Import </button>
                            </div>
                        </div>
                    </div>
                }
                {this.state.activeView === "misc" &&
                    <div className="editor-view misc-editor-view">
                        <div className="box-border vertical">
                            <label>Asset Name:</label>
                            <input type="text" value={this.props.currentAsset.name} onChange={(e) => { this.props.currentAsset.name = e.currentTarget.value; this.setCurrentAsset(this.props.currentAsset) }}></input>
                            <label>Type:</label>
                            <input type="text" value={this.props.currentAsset.type} onChange={(e) => { this.props.currentAsset.type = e.currentTarget.value; this.setCurrentAsset(this.props.currentAsset) }}></input>
                            <label>Write-in:</label>
                            <input type="text" value={this.props.currentAsset.writeIn} onChange={(e) => { this.props.currentAsset.writeIn = e.currentTarget.value; this.setCurrentAsset(this.props.currentAsset) }}></input>
                            <label>Description:</label>
                            <input type="text" value={this.props.currentAsset.description} onChange={(e) => { this.props.currentAsset.description = e.currentTarget.value; this.setCurrentAsset(this.props.currentAsset) }}></input>
                        </div>
                        <div className="icon-import box-border">
                            <div>
                                <label htmlFor="icon-fileselect">Icon to import: </label>
                                <input type="file" id="icon-fileselect" />
                            </div>
                            <label htmlFor="icon-author">Icon Author: </label>
                            <input type="text" id="icon-author" />
                            <button id="icon-import-button" onClick={() => this.handleIconImport()} > Import </button>
                        </div>
                    </div>
                }
                <div className=" export">
                    <button id="preview-download" onClick={() => this.props.previewAssetImage()}>
                        preview as image
                    </button>
                    <button id="download" onClick={() => this.props.downloadAssetImage()}>
                        download as image
                    </button>
                </div>
            </div>
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