import { caveLion, lightbearer, berserker, ironclad } from './src/exampleAssets.js'
import { createAssetHtml } from './src/asset.js'


const calculateScale = () => {
    if (window.innerHeight > 1070) {
        return "full"
    } else if (window.innerHeight > 750) {
        return "two-thirds"
    } else {
        return "one-half"
    }
}

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
    assetContainer.innerHTML = createAssetHtml(asset, window.IAW_scale)
    setSvgDimensions()
}

const showScreen = (screen) => {
    if (screen === "download") {
        document.body.className = "download-screen"
    } else if (screen === "main") {
        document.body.className = "main-screen"
    } else if (screen === "render") {
        document.body.className = "render"
    } else if (screen === "help") {
        document.body.className = "help-screen"
    }
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
        assetContainer.innerHTML = createAssetHtml(data, window.IAW_scale)
    }
    setSvgDimensions()
}


showLightbearerAssetButton.onclick = () => showSingleAssetExample(lightbearer)
showIroncladAssetButton.onclick = () => showSingleAssetExample(ironclad)
showCaveLionAssetButton.onclick = () => showSingleAssetExample(caveLion)
downloadButton.onclick = screenshot
closeDownloadbutton.onclick = closeDownload



const scaleSelect = document.querySelector("#scale-select")

const changeSize = (size) => {
    document.querySelector(".asset").classList = `asset ${size}`
    window.IAW_scale = size
}

scaleSelect.addEventListener('change', (evemt) => {
    changeSize(event.target.value)
})

const setScale = (size) => scaleSelect.value = size

// initialize
window.IAW_scale = calculateScale()
setScale(window.IAW_scale)
showSingleAssetExample(ironclad)
