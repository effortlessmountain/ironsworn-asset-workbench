import { setSvgDimensions } from './asset.js'
import { showScreen } from './router.js'

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

const screenshot = () => {
    const render = document.querySelector('.render')
    const asset = document.querySelector('.asset')
    render.appendChild(asset)
    showScreen('render')
    window.scrollTo(0, 0)
    setSvgDimensions()
    html2canvas(asset,
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
downloadButton.onclick = screenshot


const closeDownload = () => {
    downloadContainer.innerHTML = ""
    showScreen('main')
}

const closeDownloadbutton = document.querySelector("#done-downloading")
closeDownloadbutton.onclick = closeDownload