import { caveLion, lightbearer, berserker, ironclad } from './src/exampleAssets.js'
import { createAssetHtml } from './src/asset.js'
import { showScreen } from './src/router.js'
import { assetScale } from './src/assetScaling.js'

const assetInput = document.querySelector('.interface-input')
const assetContainer = document.querySelector(".assets")
const updateButton = document.querySelector(".update")
const showLightbearerAssetButton = document.querySelector("#lightbearer-example")
const showIroncladAssetButton = document.querySelector("#ironclad-example")
const showCaveLionAssetButton = document.querySelector("#cave-lion-example")
const downloadButton = document.querySelector("#download")
const closeDownloadbutton = document.querySelector("#done-downloading")
const downloadContainer = document.querySelector(".image-container")

const showSingleAssetExample = (asset) => {
    assetInput.value = JSON.stringify(asset, null, 2)
    assetContainer.innerHTML = createAssetHtml(asset, assetScale)
    setSvgDimensions()
}

const showHelpButton = document.querySelector('#show-help')
showHelpButton.onclick = () => showScreen("help")
const closeHelpbutton = document.querySelector("#close-help")
closeHelpbutton.onclick = () => showScreen("main")


const saveImage = (uri, filename) => {
    const link = document.createElement('a')
    link.href = uri
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const setSvgDimensions = () => {
    const svgs = document.querySelectorAll('svg')
    svgs.forEach(svg => {
        svg.setAttribute('height', svg.parentNode.offsetHeight)
        svg.setAttribute('width', svg.parentNode.offsetWidth)
    })
}

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

const closeDownload = () => {
    downloadContainer.innerHTML = ""
    showScreen('main')
}

updateButton.onclick = () => {
    let data = JSON.parse(assetInput.value)
    if (Array.isArray(data)) {
        assetContainer.innerHTML = data.map(createAssetHtml).join('')
    } else {
        assetContainer.innerHTML = createAssetHtml(data, assetScale)
    }
    setSvgDimensions()
}


showLightbearerAssetButton.onclick = () => showSingleAssetExample(lightbearer)
showIroncladAssetButton.onclick = () => showSingleAssetExample(ironclad)
showCaveLionAssetButton.onclick = () => showSingleAssetExample(caveLion)
downloadButton.onclick = screenshot
closeDownloadbutton.onclick = closeDownload




showSingleAssetExample(ironclad)
