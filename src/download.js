import { showAssetIn } from './asset.js'
import { assetScale } from './assetScaling.js'
import { showScreen } from './router.js'
import { currentAsset } from './editor.js'

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
    showAssetIn(render, asset, assetScale)
    window.scrollTo(0, 0)
    html2canvas(render,
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
            document.querySelector('.assets').appendChild(asset)
        })
}

const downloadButton = document.querySelector("#download")
downloadButton.onclick = () => screenshot(currentAsset)


const closeDownload = () => {
    downloadContainer.innerHTML = ""
    showScreen('main')
}

const closeDownloadbutton = document.querySelector("#done-downloading")
closeDownloadbutton.onclick = closeDownload