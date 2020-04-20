import { showAssetIn } from './asset'
import { showScreen } from './router'
import { currentAsset } from './editor'
import html2canvas from 'html2canvas'

const saveImage = (uri, filename) => {
    const link = document.createElement('a')
    link.href = uri
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const downloadContainer = document.querySelector(".image-container")

const renderOnCanvas = (asset, callback) => {
    const render = document.querySelector('.render')
    showScreen('render')
    showAssetIn(render, asset)
    window.scrollTo(0, 0)
    html2canvas(render.firstChild as HTMLElement,
        {
            allowTaint: true
        }).then(canvas => {
            downloadContainer.appendChild(canvas)
            callback(canvas)
        })
}


const closeDownload = () => {
    downloadContainer.innerHTML = ""
    showScreen('main')
}

const previewDownloadButton: HTMLButtonElement = document.querySelector("#preview-download")
previewDownloadButton.onclick =
    () => renderOnCanvas(currentAsset, canvas => showScreen('preview-download'))

const downloadButton: HTMLButtonElement = document.querySelector("#download")
downloadButton.onclick = () => {
    renderOnCanvas(currentAsset,
        canvas => {
            saveImage(canvas.toDataURL(), currentAsset.name + ".png")
            closeDownload()
        })
}


const closeDownloadbutton: HTMLButtonElement = document.querySelector("#done-downloading")
closeDownloadbutton.onclick = closeDownload