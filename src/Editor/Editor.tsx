import { showAsset } from '../Asset/Asset'
import { transformToLatest, transformSvgString, AssetDocument } from '../models/models'
import { calculateScale } from '../assetScaling'
import React from 'react'
import { ironclad, lightbearer, caveLion } from '../exampleAssets'
import { showScreen } from '../router'

export let currentAsset: AssetDocument

function asJSON(val) {
    return JSON.stringify(val, null, 2)
}

type EditorState = {
    currentAsset: AssetDocument,
    editorJSON: string,
    assetScale: string
}

type EditorProps = {
    closeDownload(): void,
    renderOnCanvas(
        asset: AssetDocument,
        scale: string,
        callback: (canvas) => void): void
}

export class Editor extends React.Component<EditorProps, EditorState> {
    constructor(props) {
        super(props)
        let startingAsset = transformToLatest(caveLion as AssetDocument) //This is where I learn the tragic extent of the failings of TypeScript's type inference.
        let startingScale = calculateScale()
        this.state = {
            currentAsset: startingAsset,
            editorJSON: asJSON(startingAsset),
            assetScale: startingScale
        }
        currentAsset = transformToLatest(caveLion as AssetDocument)
        showAsset(currentAsset, startingScale)
    }

    setCurrentAsset(asset) {
        this.setState((state, props) => {
            const latest = transformToLatest(asset)
            currentAsset = latest
            showAsset(latest, state.assetScale)
            return {
                currentAsset: latest,
                editorJSON: asJSON(asset)
            }
        })
    }

    handleScaleChange(event) {
        const newScale = event.target.value
        this.setState((state) => {
            showAsset(state.currentAsset, newScale)
            return { assetScale: newScale }
        })
    }

    handleTextAreaChange(event) {
        this.setState({ editorJSON: event.target.value })
    }

    updateOnClick() {
        try {
            this.setCurrentAsset(JSON.parse(this.state.editorJSON))
        }
        catch (error) {
            window.alert(error)
        }
    }

    downloadButtonOnclick(scale) {
        function saveImage(uri, filename) {
            const link = document.createElement('a')
            link.href = uri
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }

        this.props.renderOnCanvas(currentAsset,
            scale,
            canvas => {
                saveImage(canvas.toDataURL(), currentAsset.name + ".png")

                this.props.closeDownload()
            })
    }

    previewDownloadButtonOnclick(scale) {
        this.props.renderOnCanvas(currentAsset, scale, () => showScreen('preview-download'))
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
                currentAsset.icon = {
                    type: "svg",
                    name: file.name.split('.').slice(0, -1).join('.'),
                    author: iconAuthorInput.value,
                    svg: transformSvgString(svg)
                }
                this.setCurrentAsset(currentAsset)
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
                        onChange={(event) => this.handleScaleChange(event)}
                        value={this.state.assetScale}
                    >
                        <option value="one-third">250px by 350px</option>
                        <option value="one-half">375px by 525px</option>
                        <option value="two-thirds">500px by 700px</option>
                        <option value="full">750px by 1050px</option>
                    </select>
                </div>
                <div>
                    <button id="show-help" onClick={() => showScreen('help')}>How do I...?</button>
                </div>
            </div>
            <div className="example-controls">
                <label>Load Example Asset:</label>
                <button
                    className="show-example"
                    id="lightbearer-example"
                    onClick={() => this.setCurrentAsset(lightbearer)}
                >
                    Lightbearer
                </button>
                <button
                    className="show-example"
                    id="ironclad-example"
                    onClick={() => this.setCurrentAsset(ironclad)}
                >
                    Ironclad
                </button>
                <button
                    className="show-example"
                    id="cave-lion-example"
                    onClick={() => this.setCurrentAsset(caveLion)}
                >
                    Cave Lion
                </button>
            </div>

            <div className="editor">
                <textarea
                    className="interface-input"
                    spellCheck="false"
                    value={this.state.editorJSON}
                    onChange={(event) => this.handleTextAreaChange(event)}
                >
                </textarea>
                <button
                    className="update"
                    onClick={() => this.updateOnClick()}
                >
                    update
                    </button>
                <div className="icon-import">
                    <label htmlFor="icon-fileselect">Icon to import: </label>
                    <input type="file" id="icon-fileselect" />
                    <label htmlFor="icon-author">Icon Author: </label>
                    <input type="text" id="icon-author" />
                    <button
                        id="icon-import-button"
                        onClick={() => this.handleIconImport()}
                    >
                        Import
                        </button>
                </div>
                <div className=" export">
                    <button
                        id="preview-download"
                        onClick={() => this.previewDownloadButtonOnclick(this.state.assetScale)}
                    >
                        preview
                    </button>
                    <button
                        id="download"
                        onClick={() => this.downloadButtonOnclick(this.state.assetScale)}
                    >
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