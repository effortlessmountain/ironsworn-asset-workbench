import { loadDefaultExampleAsset } from './src/exampleAssetLoader.js'
import { createAssetHtml, setSvgDimensions } from './src/asset.js'
import { showScreen } from './src/router.js'
import { assetScale } from './src/assetScaling.js'
import './src/download.js'

const assetInput = document.querySelector('.interface-input')
const assetContainer = document.querySelector(".assets")
const updateButton = document.querySelector(".update")

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

loadDefaultExampleAsset()