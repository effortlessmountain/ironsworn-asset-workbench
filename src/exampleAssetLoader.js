import { createAssetHtml, setSvgDimensions } from './asset.js'
import { ironclad, lightbearer, caveLion, berserker } from './exampleAssets.js'
import { assetScale } from './assetScaling.js'

//TODO: move assetInput into an editor module and encapsulate better.
// also consolidate mucking with the assetContainer in one place
const assetInput = document.querySelector('.interface-input')
const assetContainer = document.querySelector(".assets")

const showSingleAssetExample = (asset) => {
    assetInput.value = JSON.stringify(asset, null, 2)
    assetContainer.innerHTML = createAssetHtml(asset, assetScale)
    setSvgDimensions()
}

export const loadDefaultExampleAsset = () => showSingleAssetExample(ironclad)

const showLightbearerAssetButton = document.querySelector("#lightbearer-example")
showLightbearerAssetButton.onclick = () => showSingleAssetExample(lightbearer)

const showIroncladAssetButton = document.querySelector("#ironclad-example")
showIroncladAssetButton.onclick = () => showSingleAssetExample(ironclad)

const showCaveLionAssetButton = document.querySelector("#cave-lion-example")
showCaveLionAssetButton.onclick = () => showSingleAssetExample(caveLion)