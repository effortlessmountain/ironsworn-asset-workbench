import { caveLion, lightbearer, berserker, ironclad } from './src/exampleAssets.js'
import { createAssetHtml, setSvgDimensions } from './src/asset.js'
import { showScreen } from './src/router.js'
import { assetScale } from './src/assetScaling.js'
import './src/download.js'

const assetInput = document.querySelector('.interface-input')
const assetContainer = document.querySelector(".assets")
const updateButton = document.querySelector(".update")
const showLightbearerAssetButton = document.querySelector("#lightbearer-example")
const showIroncladAssetButton = document.querySelector("#ironclad-example")
const showCaveLionAssetButton = document.querySelector("#cave-lion-example")

const showSingleAssetExample = (asset) => {
    assetInput.value = JSON.stringify(asset, null, 2)
    assetContainer.innerHTML = createAssetHtml(asset, assetScale)
    setSvgDimensions()
}

const showHelpButton = document.querySelector('#show-help')
showHelpButton.onclick = () => showScreen("help")
const closeHelpbutton = document.querySelector("#close-help")
closeHelpbutton.onclick = () => showScreen("main")

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

showSingleAssetExample(ironclad)
