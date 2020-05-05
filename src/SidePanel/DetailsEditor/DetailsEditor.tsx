import React from 'react'
import { AssetDocument, transformSvgString } from '../../models/models'
import { AbilitiesView } from './views/AbilitiesView'
import { TopView } from './views/TopView'
import TrackView from './views/TrackView'
import FontsView from './views/FontsView'

type EditorView = "JSON" | "top" | "abilities" | "track" | "fonts" | "export"

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
            <ViewSwitchButton view="top" activeView={props.activeView} handleClick={(view) => props.switchView(view)}>TOP</ViewSwitchButton>
            <ViewSwitchButton view="abilities" activeView={props.activeView} handleClick={(view) => props.switchView(view)}>Abilities</ViewSwitchButton>
            <ViewSwitchButton view="track" activeView={props.activeView} handleClick={(view) => props.switchView(view)}>Track</ViewSwitchButton>
            <ViewSwitchButton view="fonts" activeView={props.activeView} handleClick={(view) => props.switchView(view)}>Fonts</ViewSwitchButton>
            <ViewSwitchButton view="JSON" activeView={props.activeView} handleClick={(view) => props.switchView(view)}>JSON</ViewSwitchButton>
            <ViewSwitchButton view="export" activeView={props.activeView} handleClick={(view) => props.switchView(view)}>export</ViewSwitchButton>
        </div>
    )
}

type DetailsEditorProps = {
    currentAsset: AssetDocument,
    setCurrentAsset(asset): void,
    previewAssetImage(): void,
    downloadAssetImage(): void
}

type DetailsEditorState = {
    activeView: EditorView,
    editorJSON: string,
    errorText: string
}

function asJSON(val) {
    return JSON.stringify(val, null, 2)
}

export default class DetailsEditor extends React.Component<DetailsEditorProps, DetailsEditorState> {
    constructor(props) {
        super(props)
        this.state = {
            editorJSON: "",
            activeView: "top",
            errorText: ""
        }
    }


    switchView(view: EditorView) {
        this.setState({
            activeView: view
        })
    }

    handleJSONChange(json) {
        try {
            this.props.setCurrentAsset(JSON.parse(json))
            this.setState({
                editorJSON: "",
                errorText: ""
            })
        } catch (error) {
            this.setState({
                editorJSON: json,
                errorText: "Error parsing JSON: " + error.toString()
            })
        }
    }

    resetEditorJson() {
        this.setState({
            editorJSON: "",
            errorText: ""
        })
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
        return (
            <div className="editor">
                <ViewSwitcher activeView={this.state.activeView} switchView={(view) => this.switchView(view)}></ViewSwitcher>
                {this.state.activeView === "top" &&
                    <TopView
                        currentAsset={this.props.currentAsset}
                        setCurrentAsset={(asset) => this.props.setCurrentAsset(asset)}
                        handleIconImport={() => this.handleIconImport()}></TopView>
                }

                {this.state.activeView === "abilities" &&
                    <AbilitiesView
                        currentAsset={this.props.currentAsset}
                        setCurrentAsset={(asset) => this.props.setCurrentAsset(asset)}></AbilitiesView>
                }

                {this.state.activeView === "track" &&
                    <TrackView
                        currentAsset={this.props.currentAsset}
                        setCurrentAsset={(asset) => this.props.setCurrentAsset(asset)}></TrackView>
                }

                {this.state.activeView === "fonts" &&
                    <FontsView
                        currentAsset={this.props.currentAsset}
                        setCurrentAsset={(asset) => this.props.setCurrentAsset(asset)}></FontsView>

                }

                {this.state.activeView === "JSON" &&
                    <div className="editor-view">
                        <div>
                            <textarea
                                className="interface-input thin-box-border"
                                spellCheck="false"
                                value={this.state.editorJSON || asJSON(this.props.currentAsset)}
                                onChange={(e) => this.handleJSONChange(e.currentTarget.value)}
                            >
                            </textarea>
                        </div>
                        <div className="json-error-container">
                            {this.state.errorText &&
                                <div className="json-error">
                                    {this.state.errorText}
                                    <button onClick={() => this.resetEditorJson()}>Reset to valid state</button>
                                </div>
                            }
                        </div>
                    </div>
                }

                {this.state.activeView === "export" &&
                    <div className="editor-view">
                        <div className=" export vertical">
                            <p>Use the buttons below to get your asset in PNG format. Preview will show you the generated image in the browser, while Download will bring up your browser's save dialog.</p>
                            <button id="preview-download" onClick={() => this.props.previewAssetImage()}> preview as image </button>
                            <button id="download" onClick={() => this.props.downloadAssetImage()}> download as image </button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}