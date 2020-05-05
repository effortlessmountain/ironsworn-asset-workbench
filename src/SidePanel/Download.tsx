import React from 'react'
import { AssetDocument } from '../models/models'
import { Asset } from '../Asset/Asset'
import html2canvas from 'html2canvas'
import { AssetScale } from '../assetScaling'

type DownloadProps = {
    asset: AssetDocument,
    scale: AssetScale,
    goBackToMain: () => void,
    preview: boolean
}

type DownloadState = {
    canvas: HTMLCanvasElement
}

export default class Download extends React.Component<DownloadProps, DownloadState> {
    constructor(props) {
        super(props)
        this.state = {
            canvas: null
        }
    }

    saveImage() {
        const link = document.createElement('a')
        link.href = this.state.canvas.toDataURL()
        link.download = this.props.asset.name + ".png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    componentDidMount() {
        if (!this.state.canvas) {
            window.scrollTo(0, 0)
            const render = document.querySelector('.render')
            html2canvas(render.firstChild as HTMLElement,
                {
                    allowTaint: true
                }).then(canvas => {
                    this.setState({ canvas: canvas })
                })
        }
    }

    render() {
        if (!this.state.canvas) {
            return (
                <div className="render">
                    <Asset asset={this.props.asset} scale={this.props.scale}></Asset>
                </div>
            )
        } else if (!this.props.preview) {
            this.saveImage()
            this.props.goBackToMain()
            return null
        } else {
            return (
                <div className="preview-download">
                    <div className="image-container">
                        <img src={this.state.canvas.toDataURL()} alt={`${this.props.asset.name} asset`} />
                    </div>
                    <div className="preview-download-help">
                        <p>Right click and 'Save image as...' to save. If the image is truncated,
                    try making your browser window bigger before pressing 'preview' or 'download as image'.</p>
                        <button id="done-downloading" onClick={() => this.props.goBackToMain()} > close </button>
                    </div>
                </div>
            )
        }

    }
}