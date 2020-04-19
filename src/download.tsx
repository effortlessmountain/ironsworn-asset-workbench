import { showAssetIn } from './asset'
import { assetScale } from './assetScaling'
import { showScreen } from './router'
import { currentAsset } from './editor'
import html2canvas from 'html2canvas'


// TODO: implement as 'Download' and make current 'Download' into 'Preview'
const saveImage = (uri, filename) => {
    const link = document.createElement('a')
    link.href = uri
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const downloadContainer = document.querySelector(".image-container")

const screenshot = (asset) => {
    const render = document.querySelector('.render')
    showScreen('render')
    showAssetIn(render, asset)
    window.scrollTo(0, 0)
    //TODO: fix probably hacky casting
    html2canvas(render.firstChild as HTMLElement,
        {
            allowTaint: true
            // width: "750",
            // height: "1050",
            // scale: 2
            // windowHeight: "1080px",
            // windowWidth: "1920px"
        }).then(canvas => {
            downloadContainer.appendChild(canvas)
            // saveImage(canvas.toDataURL(), 'asset.png') //TODO name after asset's name
            showScreen('download')
        })
}

const downloadButton: HTMLButtonElement = document.querySelector("#download")
downloadButton.onclick = () => screenshot(currentAsset)


const closeDownload = () => {
    downloadContainer.innerHTML = ""
    showScreen('main')
}

const closeDownloadbutton: HTMLButtonElement = document.querySelector("#done-downloading")
closeDownloadbutton.onclick = closeDownload